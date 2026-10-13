import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CorrespondenceRegister from './CorrespondenceRegister';
import api from './api';
import { ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION } from './accessControl';

let mockCurrentUser;
let mockToken;
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: mockCurrentUser, token: mockToken }) }));
jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getAdministrationCorrespondence: jest.fn(),
    createAdministrationCorrespondence: jest.fn(),
    updateAdministrationCorrespondence: jest.fn(),
    deleteAdministrationCorrespondence: jest.fn()
  }
}));

beforeEach(() => {
  mockCurrentUser = { email: 'manager.demo@m3s.local', tenantId: '2sg', permissions: [ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION] };
  mockToken = 'demo_session_test';
  localStorage.clear();
  jest.clearAllMocks();
});

afterEach(() => jest.restoreAllMocks());

test.each([
  ['FR', 'Sens', 'Expéditeur', 'Destinataire', ['Entrant', 'Sortant', 'Interne'], 'Rechercher dans le registre'],
  ['EN', 'Direction', 'Sender', 'Recipient', ['Incoming', 'Outgoing', 'Internal'], 'Search the register'],
  ['DE', 'Richtung', 'Absender', 'Empfänger', ['Eingang', 'Ausgang', 'Intern'], 'Register durchsuchen']
])('shows and searches existing directions and participants without writing in %s', async (language, directionHeader, senderHeader, recipientHeader, directions, searchLabel) => {
  mockToken = 'signed-token';
  mockCurrentUser.permissions = [];
  const records = ['incoming', 'outgoing', 'internal'].map((direction, i) => ({
    id: `COR-SYNTHETIC-${i}`, direction, receipt_date: '2026-10-13',
    sender: `Sender synthetic ${i}`, recipient: `Recipient synthetic ${i}`,
    subject: `Subject synthetic ${i}`, owner: 'Owner synthetic', status: 'in_progress'
  }));
  const original = JSON.stringify(records);
  api.getAdministrationCorrespondence.mockResolvedValue({ data: records });
  render(<CorrespondenceRegister language={language} />);
  await screen.findByText('Subject synthetic 0');
  const table = within(screen.getByRole('table'));
  for (const name of [directionHeader, senderHeader, recipientHeader]) expect(table.getByRole('columnheader', { name, exact: true })).toBeInTheDocument();
  records.forEach((record, i) => {
    const row = within(table.getByText(record.id).closest('tr'));
    for (const name of [directions[i], record.sender, record.recipient]) expect(row.getByRole('cell', { name, exact: true })).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('textbox', { name: searchLabel }), { target: { value: directions[1] } });
  expect(table.getAllByRole('row')).toHaveLength(2);
  expect(table.getByText('Subject synthetic 1')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox', { name: searchLabel }), { target: { value: records[0].recipient } });
  expect(table.getByText('Subject synthetic 0')).toBeInTheDocument();
  expect(table.getAllByRole('row')).toHaveLength(2);
  expect(screen.queryByRole('button', { name: language === 'FR' ? 'Ajouter un courrier' : language === 'EN' ? 'Add correspondence' : 'Korrespondenz hinzufügen' })).not.toBeInTheDocument();
  expect(api.createAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(api.updateAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(api.deleteAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(JSON.stringify(records)).toBe(original);
  expect(localStorage.length).toBe(0);
});

test.each([undefined, 'unknown'])('does not infer incoming for an unqualified direction (%s)', async direction => {
  mockToken = 'signed-token';
  api.getAdministrationCorrespondence.mockResolvedValue({ data: [{
    id: 'COR-UNKNOWN', direction, receipt_date: '2026-10-13', sender: 'Sender synthetic',
    recipient: 'Recipient synthetic', subject: 'Unqualified synthetic', owner: 'Owner synthetic'
  }] });
  render(<CorrespondenceRegister language="FR" />);
  const subject = await screen.findByText('Unqualified synthetic');
  const row = within(subject.closest('tr'));
  expect(row.getByRole('cell', { name: 'Non renseigné', exact: true })).toBeInTheDocument();
  expect(row.queryByRole('cell', { name: 'Entrant', exact: true })).not.toBeInTheDocument();
  fireEvent.click(subject);
  expect(screen.getByLabelText('Sens *')).toHaveValue('-1');
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Modifier', exact: true })).getByRole('button', { name: 'Modifier', exact: true }));
  expect(screen.queryByRole('dialog', { name: 'Confirmer la modification' })).not.toBeInTheDocument();
  expect(api.updateAdministrationCorrespondence).not.toHaveBeenCalled();
});

test.each([
  ['FR', 'Registre du courrier', 'Registre pilote local du courrier', 'Source backend sécurisée'],
  ['EN', 'Correspondence register', 'Local pilot correspondence register', 'Secure backend source'],
  ['DE', 'Korrespondenzregister', 'Lokales Pilotregister für Korrespondenz', 'Sichere Backend-Quelle']
])('distinguishes connected and local register headings in %s', async (language, connected, local, source) => {
  mockToken = 'signed-token';
  api.getAdministrationCorrespondence.mockResolvedValue({ data: [] });
  const view = render(<CorrespondenceRegister language={language} />);
  expect(await screen.findByText(source)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: connected, exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: local, exact: true })).not.toBeInTheDocument();
  view.unmount();
  mockToken = 'demo_session_test';
  render(<CorrespondenceRegister language={language} />);
  expect(screen.getByRole('heading', { name: local, exact: true })).toBeInTheDocument();
});

test('filters the shared register by the identifier selected in the agenda', async () => {
  mockToken = 'signed-token';
  api.getAdministrationCorrespondence.mockResolvedValue({ success: true, source: 'bigquery', data: [
    { id: 'COR-SELECTED', subject: 'Selected synthetic source' },
    { id: 'COR-OTHER', subject: 'Other synthetic source' }
  ] });
  render(<CorrespondenceRegister correspondenceId="COR-SELECTED" />);
  expect(await screen.findByText('Selected synthetic source')).toBeInTheDocument();
  expect(screen.queryByText('Other synthetic source')).not.toBeInTheDocument();
});

test('opens an agenda source beyond the first page of correspondence', async () => {
  mockToken = 'signed-token';
  api.getAdministrationCorrespondence.mockResolvedValueOnce({ success: true, source: 'bigquery', data: Array.from({ length: 200 }, (_, i) => ({ id: `COR-${i}`, subject: `Synthetic ${i}` })) })
    .mockResolvedValueOnce({ success: true, source: 'bigquery', data: [{ id: 'COR-LATER', subject: 'Later synthetic source' }] });
  render(<CorrespondenceRegister correspondenceId="COR-LATER" />);
  expect(await screen.findByText('Later synthetic source')).toBeInTheDocument();
  expect(api.getAdministrationCorrespondence).toHaveBeenLastCalledWith(200, 200);
});

test('does not substitute local correspondence for an unavailable agenda source', async () => {
  mockToken = 'signed-token';
  api.getAdministrationCorrespondence.mockRejectedValue(new Error('Unavailable'));
  render(<CorrespondenceRegister correspondenceId="COR-SELECTED" />);
  expect(await screen.findByText(/aucun résultat local substitué/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Ajouter un courrier' })).toBeDisabled();
});

test('prepares a restricted WhatsApp CV record without accepting the file itself', () => {
  render(<CorrespondenceRegister language="FR" />);
  expect(screen.getByText(/aucun fichier ni contenu du CV/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Préparer une réception de CV' }));
  expect(screen.getByLabelText('Objet *')).toHaveValue('CV reçu via WhatsApp');
  expect(screen.getByLabelText('Canal')).toHaveValue('0');
  expect(screen.getByLabelText('Confidentialité')).toHaveValue('2');
  expect(screen.getByLabelText('Statut')).toHaveValue('1');
  expect(screen.queryByLabelText(/fichier/i)).not.toBeInTheDocument();
});

test('saves correspondence metadata after M3S confirmation', () => {
  render(<CorrespondenceRegister language="FR" />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter un courrier' }));
  fireEvent.change(screen.getByLabelText('Expéditeur *'), { target: { value: 'Partenaire' } });
  fireEvent.change(screen.getByLabelText('Destinataire *'), { target: { value: 'Administration' } });
  fireEvent.change(screen.getByLabelText('Objet *'), { target: { value: 'Dossier reçu' } });
  fireEvent.change(screen.getByLabelText('Responsable du suivi *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(screen.getByRole('dialog', { name: 'Confirmer l’ajout' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));
  expect(screen.getByText('Dossier reçu')).toBeInTheDocument();
});

test('isolates correspondence metadata between authenticated users', () => {
  const firstSession = render(<CorrespondenceRegister language="FR" />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter un courrier' }));
  fireEvent.change(screen.getByLabelText('Expéditeur *'), { target: { value: 'Partenaire' } });
  fireEvent.change(screen.getByLabelText('Destinataire *'), { target: { value: 'Administration' } });
  fireEvent.change(screen.getByLabelText('Objet *'), { target: { value: 'Dossier privé Cheikh' } });
  fireEvent.change(screen.getByLabelText('Responsable du suivi *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));
  firstSession.unmount();

  mockCurrentUser = { email: 'chantal@seneswiss.sn', tenantId: '2sg' };
  render(<CorrespondenceRegister language="FR" />);
  expect(screen.queryByText('Dossier privé Cheikh')).not.toBeInTheDocument();
  expect(screen.getByText('Aucun courrier enregistré.')).toBeInTheDocument();
});

test('does not reveal local correspondence when backend access is forbidden', async () => {
  mockToken = 'signed-token';
  localStorage.setItem(
    'm3s-administration-correspondence-v1:2sg:cheikh%40seneswiss.sn',
    JSON.stringify([{ id: 'COR-LOCAL', subject: 'Dossier local privé' }])
  );
  const forbidden = new Error('Access denied');
  forbidden.status = 403;
  api.getAdministrationCorrespondence.mockRejectedValue(forbidden);

  render(<CorrespondenceRegister language="FR" />);
  expect(await screen.findByText('Accès au registre non autorisé')).toBeInTheDocument();
  expect(screen.queryByText('Dossier local privé')).not.toBeInTheDocument();
});

test('creates correspondence through the backend without copying it to local storage', async () => {
  mockToken = 'signed-token';
  mockCurrentUser = { id: 'USR-1', email: 'manager.demo@m3s.local', tenantId: '2sg', permissions: [ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION] };
  api.getAdministrationCorrespondence.mockResolvedValue({ success: true, source: 'bigquery', data: [] });
  api.createAdministrationCorrespondence.mockResolvedValue({
    success: true,
    source: 'bigquery',
    data: {
      id: 'COR-BACKEND', receipt_date: '2026-08-14', direction: 'incoming', channel: 'email',
      sender: 'Partenaire', recipient: 'Administration', subject: 'Courrier backend',
      category: 'institutional', confidentiality: 'internal', linked_person_or_case: '',
      ged_reference: 'GED / Administration / COR-BACKEND', receipt_evidence_reference: '',
      owner: 'Cheikh', next_action: '', status: 'to_qualify', deadline: null
    }
  });

  render(<CorrespondenceRegister language="FR" />);
  expect(await screen.findByText('Source backend sécurisée')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter un courrier' }));
  fireEvent.change(screen.getByLabelText('Expéditeur *'), { target: { value: 'Partenaire' } });
  fireEvent.change(screen.getByLabelText('Destinataire *'), { target: { value: 'Administration' } });
  fireEvent.change(screen.getByLabelText('Objet *'), { target: { value: 'Courrier backend' } });
  fireEvent.change(screen.getByLabelText('Responsable du suivi *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  expect(await screen.findByText('Courrier backend')).toBeInTheDocument();
  expect(api.createAdministrationCorrespondence).toHaveBeenCalledTimes(1);
  expect(localStorage.getItem('m3s-administration-correspondence-v1:2sg:USR-1')).toBeNull();
});

test('keeps correspondence readable but removes mutation commands without write permission', async () => {
  mockCurrentUser = { id: 'user-demo', tenantId: '2sg', permissions: [] };
  localStorage.setItem(
    'm3s-administration-correspondence-v1:2sg:user-demo',
    JSON.stringify([{
      id: 'COR-READ', date: '2026-08-14', directionIndex: 0, channelIndex: 1,
      sender: 'Partenaire', recipient: 'Administration', subject: 'Courrier consultable',
      categoryIndex: 1, confidentialityIndex: 1, person: '', ged: '', evidence: '',
      owner: 'Administration', next: '', statusIndex: 0, deadline: ''
    }])
  );

  render(<CorrespondenceRegister language="FR" />);

  const subject = await screen.findByText('Courrier consultable');
  expect(screen.getByText('Lecture seule')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Ajouter un courrier' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Préparer une réception de CV' })).not.toBeInTheDocument();
  expect(screen.queryByTitle('Modifier')).not.toBeInTheDocument();
  expect(screen.queryByTitle('Supprimer')).not.toBeInTheDocument();
  fireEvent.click(subject);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
