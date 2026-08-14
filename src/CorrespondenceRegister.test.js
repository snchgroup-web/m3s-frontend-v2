import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CorrespondenceRegister from './CorrespondenceRegister';
import api from './api';

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
  mockCurrentUser = { email: 'cheikh@seneswiss.sn', tenantId: '2sg' };
  mockToken = 'demo_session_test';
  localStorage.clear();
  jest.clearAllMocks();
});

afterEach(() => jest.restoreAllMocks());

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
  fireEvent.change(screen.getByLabelText('Destinataire 2SG *'), { target: { value: 'Administration' } });
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
  fireEvent.change(screen.getByLabelText('Destinataire 2SG *'), { target: { value: 'Administration' } });
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
  mockCurrentUser = { id: 'USR-1', email: 'cheikh@seneswiss.sn', tenantId: '2sg' };
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
  fireEvent.change(screen.getByLabelText('Destinataire 2SG *'), { target: { value: 'Administration' } });
  fireEvent.change(screen.getByLabelText('Objet *'), { target: { value: 'Courrier backend' } });
  fireEvent.change(screen.getByLabelText('Responsable du suivi *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  expect(await screen.findByText('Courrier backend')).toBeInTheDocument();
  expect(api.createAdministrationCorrespondence).toHaveBeenCalledTimes(1);
  expect(localStorage.getItem('m3s-administration-correspondence-v1:2sg:USR-1')).toBeNull();
});
