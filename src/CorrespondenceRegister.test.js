import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CorrespondenceRegister from './CorrespondenceRegister';

let mockCurrentUser;
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: mockCurrentUser }) }));

beforeEach(() => {
  mockCurrentUser = { email: 'cheikh@seneswiss.sn', tenantId: '2sg' };
  localStorage.clear();
  jest.spyOn(window, 'confirm').mockReturnValue(true);
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

test('saves correspondence metadata after human confirmation', () => {
  render(<CorrespondenceRegister language="FR" />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter un courrier' }));
  fireEvent.change(screen.getByLabelText('Expéditeur *'), { target: { value: 'Partenaire' } });
  fireEvent.change(screen.getByLabelText('Destinataire 2SG *'), { target: { value: 'Administration' } });
  fireEvent.change(screen.getByLabelText('Objet *'), { target: { value: 'Dossier reçu' } });
  fireEvent.change(screen.getByLabelText('Responsable du suivi *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(window.confirm).toHaveBeenCalled();
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
  firstSession.unmount();

  mockCurrentUser = { email: 'chantal@seneswiss.sn', tenantId: '2sg' };
  render(<CorrespondenceRegister language="FR" />);
  expect(screen.queryByText('Dossier privé Cheikh')).not.toBeInTheDocument();
  expect(screen.getByText('Aucun courrier enregistré localement.')).toBeInTheDocument();
});
