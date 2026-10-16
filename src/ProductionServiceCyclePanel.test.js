import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import ProductionServiceCycle from './ProductionServiceCyclePanel';
import { appendServiceCycleEvent, createServiceCycle, serviceCycleJson } from './productionServiceCycleModel';

const sourceRows = ['GD-005', 'GD-006', 'GD-008', 'GD-009'].map(dossier_id => ({ dossier_id, status: 'active' }));
const renderPanel = (props = {}) => render(<ProductionServiceCycle language="FR" sourceKind="available" sourceRows={sourceRows} {...props} />);
const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const confirm = () => fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirmer', exact: true }));
const start = () => {
  fill(/Périmètre du livrable/, 'Dossier fictif'); fill(/Responsable de préparation/, 'Fonction fictive'); fill(/Référence du cadrage autorisé/, 'CADRAGE-FICTIF');
  fireEvent.click(screen.getByRole('button', { name: 'Préparer un cycle', exact: true })); confirm();
};
const stage = (values) => {
  for (const [label, value] of values) fill(label, value);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter à la préparation', exact: true })); confirm();
};
const realization = (version = 'V1', date = '2026-10-12') => stage([[/Date du fait/, date], [/Référence de preuve/, 'CONTROLE-FICTIF'], [/Référence du livrable/, 'LIVRABLE-FICTIF'], [/^Version/, version]]);
const delivery = (date = '2026-10-13') => stage([[/Date du fait/, date], [/Référence de preuve/, 'COR-FICTIF'], [/Destinataire de la remise/, 'Interlocuteur fictif']]);
const importFile = (json) => fireEvent.change(document.querySelector('input[type="file"]'), { target: { files: [new File([json], 'preparation.json', { type: 'application/json' })] } });

test.each([
  ['FR', 'Réalisation, livraison et réception', 'Préparer un cycle', 'Préparation locale · non enregistrée dans M3S'],
  ['DE', 'Realisierung, Lieferung und Abnahme', 'Zyklus vorbereiten', 'Lokale Vorbereitung · nicht in M3S gespeichert'],
  ['EN', 'Realisation, delivery and acceptance', 'Prepare a cycle', 'Local preparation · not recorded in M3S']
])('renders %s copy without implying an existing delivery', (language, heading, create, local) => {
  renderPanel({ language });
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  expect(screen.getByText(local)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: create })).toBeDisabled();
});
test.each(['loading', 'forbidden', 'unavailable'])('hides local drafts while the source is %s', sourceKind => {
  renderPanel({ sourceKind });
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});
test('partial sources cannot create a preparation', () => {
  renderPanel({ sourceRows: [{ dossier_id: 'GD-005' }] });
  expect(screen.getByRole('status')).toHaveTextContent('Dossiers sources incomplets');
  expect(screen.queryByRole('button', { name: 'Préparer un cycle' })).not.toBeInTheDocument();
});
test('cancelling confirmation creates nothing and preserves the entered scope', () => {
  renderPanel();
  fill(/Périmètre du livrable/, 'Dossier fictif'); fill(/Responsable de préparation/, 'Fonction fictive'); fill(/Référence du cadrage autorisé/, 'CADRAGE-FICTIF');
  fireEvent.click(screen.getByRole('button', { name: 'Préparer un cycle' }));
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Annuler' }));
  expect(screen.queryByText('État de la préparation')).not.toBeInTheDocument();
  expect(screen.getByLabelText(/Périmètre du livrable/)).toHaveValue('Dossier fictif');
});
test('covers all three stages, no automatic acceptance and an immutable closed preparation', () => {
  renderPanel(); start();
  expect(screen.getByRole('button', { name: 'Ajouter à la préparation' })).toBeDisabled();
  realization(); delivery();
  expect(screen.getByText('Remise documentée')).toBeInTheDocument();
  expect(screen.getByLabelText(/Référence de preuve/)).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Ajouter à la préparation' })).toBeDisabled();
  stage([[/Date du fait/, '2026-10-14'], [/Référence de preuve/, 'RETOUR-FICTIF']]);
  expect(screen.getByText('Acceptation rapportée', { selector: 'dd' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Ajouter à la préparation' })).not.toBeInTheDocument();
  expect(screen.getByText('Préparation locale · non enregistrée dans M3S')).toBeInTheDocument();
});
test('reservations require a reason and a new version; old acceptance is not reused for the new version', () => {
  renderPanel(); start(); realization(); delivery();
  fill(/Retour documenté/, 'reserved');
  fill(/Date du fait/, '2026-10-14'); fill(/Référence de preuve/, 'RETOUR-FICTIF');
  expect(screen.getByRole('button', { name: 'Ajouter à la préparation' })).toBeDisabled();
  fill(/Réserves ou motif/, 'Point fictif');
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter à la préparation' })); confirm();
  realization('V2', '2026-10-15');
  expect(screen.getByText('Réalisation documentée', { selector: 'dd' })).toBeInTheDocument();
  expect(screen.getAllByText('Non documentée')).toHaveLength(2);
  expect(screen.getByText('Point fictif')).toBeInTheDocument();
});
test('changing path isolates drafts and changing language preserves the preparation', () => {
  const view = renderPanel(); start();
  fill(/Parcours de préparation/, 'rh');
  expect(screen.getByLabelText(/Périmètre du livrable/)).toHaveValue('');
  fill(/Parcours de préparation/, 'documents');
  expect(screen.getByText('Dossier fictif', { selector: 'dd' })).toBeInTheDocument();
  view.rerender(<ProductionServiceCycle language="EN" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByText('Dossier fictif', { selector: 'dd' })).toBeInTheDocument();
  expect(screen.getByText('To prepare')).toBeInTheDocument();
});

test('existing success notices follow the selected language', () => {
  const view = renderPanel(); start();
  expect(screen.getByRole('status')).toHaveTextContent('Étape ajoutée à la préparation locale.');
  view.rerender(<ProductionServiceCycle language="EN" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByRole('status')).toHaveTextContent('Stage added to the local preparation.');
  view.rerender(<ProductionServiceCycle language="DE" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByRole('status')).toHaveTextContent('Schritt zur lokalen Vorbereitung hinzugefügt.');
});

test('existing error notices follow the selected language', async () => {
  const view = renderPanel();
  importFile('{}');
  expect(await screen.findByRole('alert')).toHaveTextContent('Préparation ou référence non conforme.');
  view.rerender(<ProductionServiceCycle language="DE" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Ungültige Vorbereitung oder Referenz.');
  view.rerender(<ProductionServiceCycle language="EN" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Invalid preparation or reference.');
});
test('unavailable/refused source hides the draft without exposing it and restores it only with sources available again', () => {
  const view = renderPanel(); start();
  view.rerender(<ProductionServiceCycle language="FR" sourceKind="forbidden" sourceRows={[]} />);
  expect(screen.queryByText('Dossier fictif')).not.toBeInTheDocument();
  view.rerender(<ProductionServiceCycle language="FR" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByText('Dossier fictif', { selector: 'dd' })).toBeInTheDocument();
});
test('export is a preparation JSON with only the selected path, never a shared save', async () => {
  const blobUrls = [];
  URL.createObjectURL = jest.fn(blob => { blobUrls.push(blob); return 'blob:test'; });
  URL.revokeObjectURL = jest.fn();
  const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  renderPanel(); start(); realization();
  fireEvent.click(screen.getByRole('button', { name: 'Exporter la préparation JSON' }));
  const text = await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsText(blobUrls[0]); });
  const result = JSON.parse(text);
  expect(result.mode).toBe('local_preparation');
  expect(result.source_ids).toEqual(['GD-005', 'GD-006']);
  expect(result.events).toHaveLength(1);
  expect(result).not.toHaveProperty('salary');
  expect(click).toHaveBeenCalledTimes(1);
  click.mockRestore();
});
test('import requires explicit confirmation and wrong-path files are rejected', async () => {
  renderPanel();
  const draft = createServiceCycle({ id: 'LOCAL-SVC-IMPORT', track: 'documents', source_ids: ['GD-005', 'GD-006'], scope: 'Import fictif', owner: 'Fonction fictive', authorization_reference: 'CADRAGE-FICTIF' });
  const json = serviceCycleJson(appendServiceCycleEvent(draft, { step: 'realization', occurred_on: '2026-10-12', evidence_reference: 'CONTROLE-FICTIF', deliverable_reference: 'LIVRABLE-FICTIF', version: 'V1' }).cycle);
  importFile(json);
  await screen.findByRole('dialog');
  expect(screen.queryByText('Import fictif', { selector: 'dd' })).not.toBeInTheDocument();
  confirm();
  expect(screen.getByText('Import fictif', { selector: 'dd' })).toBeInTheDocument();
  fill(/Parcours de préparation/, 'rh'); importFile(json);
  expect(await screen.findByRole('alert')).toHaveTextContent('Le parcours ou les références sources ne correspondent pas');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
test('new cycle replacement is cancellable and leaves the other path unchanged', () => {
  renderPanel(); start();
  fireEvent.click(screen.getByRole('button', { name: 'Nouveau cycle' }));
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Annuler' }));
  expect(screen.getByText('Dossier fictif', { selector: 'dd' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Nouveau cycle' })); confirm();
  expect(screen.getByRole('button', { name: 'Préparer un cycle' })).toBeDisabled();
});
test('late import after a path switch is ignored', async () => {
  renderPanel();
  let reader;
  const spy = jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function () { reader = this; });
  importFile('{}');
  fill(/Parcours de préparation/, 'rh');
  Object.defineProperty(reader, 'result', { value: '{}' });
  await act(async () => reader.onload());
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByText('Dossier fictif')).not.toBeInTheDocument();
  spy.mockRestore();
});
