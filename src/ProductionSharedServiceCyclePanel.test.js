import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import ProductionServiceWorkspace from './ProductionSharedServiceCyclePanel';
import { productionServiceTransport } from './api';

jest.mock('./api', () => ({ productionServiceTransport: jest.fn() }));
const id = '12345678-1234-4123-8123-123456789abc';
const sourceRows = ['GD-005', 'GD-006', 'GD-008', 'GD-009'].map(dossier_id => ({ dossier_id }));
const caps = { track: 'documents', can_read: true, can_prepare: true, can_deliver: true, can_accept: true };
let record;
const item = () => ({ storage: 'shared', item: record, replayed: false });
const serve = async (path, body) => {
  if (path === '/access') return { storage: 'shared', acceptance_kind: 'reported_not_signed', items: [caps] };
  if (path === '?track=documents') return { storage: 'shared', items: record ? [{ id, track: record.track, scope: record.scope, owner: record.owner, project_reference: record.project_reference, authorization_reference: record.authorization_reference, revision: record.revision, created_at: '2026-10-12T12:00:00Z' }] : [] };
  if (path === `/${id}`) return item();
  if (path === '') {
    record = { id, ...body.preparation, project_reference: body.preparation.project_reference || null, revision: 0, events: [], audit: [], references_verified: false, acceptance_kind: 'reported_not_signed' };
    return item();
  }
  if (path === `/${id}/events`) {
    record = { ...record, revision: 1, events: [body.event], audit: [{ revision: 1, actor: 'a'.repeat(64), recorded_at: '2026-10-12T13:00:00Z' }] };
    return item();
  }
  throw Error('UNEXPECTED_PATH');
};
beforeEach(() => {
  record = null;
  productionServiceTransport.mockReset().mockImplementation(serve);
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: { randomUUID: () => 'abcdef12-1234-4123-8123-123456789abc' } });
});
const show = props => render(<ProductionServiceWorkspace language="FR" sourceKind="available" sourceRows={sourceRows} {...props} />);
const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const propose = async () => {
  await screen.findByText('Aucun cycle partagé pour ce parcours.');
  fill(/Périmètre du livrable/, 'Préparation fictive'); fill(/Responsable de préparation/, 'Fonction fictive'); fill(/Référence du cadrage autorisé/, 'TEST-SCOPE');
  fireEvent.click(screen.getByRole('button', { name: 'Préparer un cycle', exact: true }));
  await act(async () => fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirmer', exact: true })));
};
test.each([['FR', 'Aucun cycle partagé pour ce parcours.'], ['DE', 'Kein gemeinsamer Zyklus für diesen Weg.'], ['EN', 'No shared cycle for this path.']])('renders the shared state in %s', async (language, text) => {
  show({ language }); expect(await screen.findByText(text)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Reprendre une préparation JSON/ })).not.toBeInTheDocument();
});
test('a disabled backend does not fall back silently to local storage', async () => {
  productionServiceTransport.mockRejectedValue({ status: 503, code: 'SERVICE_NOT_ENABLED' });
  show(); expect(await screen.findByRole('alert')).toHaveTextContent('n’est pas activé');
  expect(screen.queryByLabelText(/Périmètre/)).not.toBeInTheDocument();
  fill(/Stockage du cycle/, 'local');
  expect(screen.getByText('Préparation locale · non enregistrée dans M3S')).toBeInTheDocument();
});
test('creates only after confirmation, then reloads the server ID without importing history', async () => {
  show(); await propose();
  expect(await screen.findByText(/Référence partagée/)).toHaveTextContent(id);
  const body = productionServiceTransport.mock.calls.find(([path]) => path === '')[1];
  expect(Object.keys(body.preparation).sort()).toEqual(['authorization_reference', 'owner', 'project_reference', 'scope', 'track']);
  expect(body.request_id).toMatch(/^[a-f0-9-]{36}$/);
  expect(screen.getByText('Stockage partagé M3S · droits dédiés')).toBeInTheDocument();
});
test('lost create acknowledgement is replayed with exactly the same request, not another creation', async () => {
  let writes = 0;
  productionServiceTransport.mockImplementation(async (path, body) => {
    if (path !== '') return serve(path, body);
    writes++;
    if (writes === 1) { await serve(path, body); throw new TypeError('NETWORK_LOST'); }
    return { ...item(), replayed: true };
  });
  show(); await propose();
  expect(await screen.findByRole('alert')).toHaveTextContent('Résultat non confirmé');
  expect(screen.getByLabelText(/Stockage du cycle/)).toBeDisabled();
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Reprendre la même demande' })));
  expect(await screen.findByText(/Référence partagée/)).toHaveTextContent(id);
  const writesMade = productionServiceTransport.mock.calls.filter(([path]) => path === '');
  expect(writesMade).toHaveLength(2); expect(writesMade[0][1]).toEqual(writesMade[1][1]);
});
test('records one stage with its expected revision and reloads its audited history', async () => {
  show(); await propose(); await screen.findByText(/Référence partagée/);
  fill(/Date du fait/, '2026-10-12'); fill(/Référence de preuve/, 'TEST-PROOF'); fill(/Référence du livrable/, 'TEST-DELIVERABLE'); fill(/^Version/, 'V1');
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer cette étape' }));
  await act(async () => fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirmer', exact: true })));
  await waitFor(() => expect(screen.getByText(/Référence partagée/)).toHaveTextContent('Révision 1'));
  expect(productionServiceTransport.mock.calls.find(([path]) => path.endsWith('/events'))[1].expected_revision).toBe(0);
  expect(screen.getByText('Réalisation documentée', { selector: 'dd' })).toBeInTheDocument();
});
test('revoked or read-only access cannot propose new work', async () => {
  productionServiceTransport.mockImplementation((path, body) => path === '/access' ? Promise.resolve({ storage: 'shared', acceptance_kind: 'reported_not_signed', items: [{ ...caps, can_prepare: false }] }) : serve(path, body));
  show(); expect(await screen.findByText('Votre accès ne permet pas d’enregistrer cette étape.')).toBeInTheDocument();
  expect(screen.queryByLabelText(/Périmètre du livrable/)).not.toBeInTheDocument();
});
test('switching language preserves the unsaved shared form', async () => {
  const view = show(); await screen.findByText('Aucun cycle partagé pour ce parcours.'); fill(/Périmètre du livrable/, 'Brouillon fictif');
  view.rerender(<ProductionServiceWorkspace language="EN" sourceKind="available" sourceRows={sourceRows} />);
  expect(screen.getByLabelText(/Deliverable scope/)).toHaveValue('Brouillon fictif');
});
test('changing to a path without its own decision refuses access', async () => {
  show(); await screen.findByText('Aucun cycle partagé pour ce parcours.'); fill(/Parcours de préparation/, 'rh');
  expect(await screen.findByRole('alert')).toHaveTextContent('Accès partagé non autorisé');
  expect(screen.queryByLabelText(/Périmètre du livrable/)).not.toBeInTheDocument();
});
test('a stale revision is never retried automatically and requires a fresh read', async () => {
  show(); await propose(); await screen.findByText(/Référence partagée/);
  productionServiceTransport.mockImplementation((path, body) => path.endsWith('/events') ? Promise.reject({ status: 409, code: 'SERVICE_CONFLICT' }) : serve(path, body));
  fill(/Date du fait/, '2026-10-12'); fill(/Référence de preuve/, 'TEST-PROOF'); fill(/Référence du livrable/, 'TEST-DELIVERABLE'); fill(/^Version/, 'V1');
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer cette étape' }));
  await act(async () => fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirmer', exact: true })));
  expect(await screen.findByRole('alert')).toHaveTextContent('Le cycle a évolué');
  expect(productionServiceTransport.mock.calls.filter(([path]) => path.endsWith('/events'))).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Reprendre la même demande' })).not.toBeInTheDocument();
});
test('missing secure randomness refuses creation without throwing or posting', async () => {
  Object.defineProperty(globalThis, 'crypto', { configurable: true, value: {} });
  show(); await propose();
  expect(await screen.findByRole('alert')).toHaveTextContent('Demande refusée');
  expect(productionServiceTransport.mock.calls.some(([path]) => path === '')).toBe(false);
});
