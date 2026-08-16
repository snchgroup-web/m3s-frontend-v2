import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import ExternalMissionRegister, { STORAGE_KEY_PREFIX } from './ExternalMissionRegister';
import { api } from './api';

jest.mock('./api', () => ({
  api: { getMembersDirectory: jest.fn() }
}));

const storageKey = `${STORAGE_KEY_PREFIX}:2sg:USR-1`;

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('user', JSON.stringify({ id: 'USR-1', tenantId: '2sg', name: 'Cheikh' }));
  api.getMembersDirectory.mockReset();
  api.getMembersDirectory.mockReturnValue(new Promise(() => {}));
});

test('records and restores a prepared mission with traceability references', async () => {
  const view = render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'Préparer les documents LEGAL manquants', service: 'work', sensitivity: 'internal' }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la mission préparée' }));
  expect(screen.getByLabelText('Intitulé non sensible *')).toHaveValue('Préparer les documents LEGAL manquants');
  fireEvent.change(screen.getByLabelText('Responsable 2SG *'), { target: { value: 'Cheikh' } });
  fireEvent.change(screen.getByLabelText('Référence tâche M3S'), { target: { value: 'TASK-LEGAL-01' } });
  fireEvent.change(screen.getByLabelText('Référence GED'), { target: { value: 'GED-LEGAL-01' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  expect(screen.getAllByText('Préparer les documents LEGAL manquants').length).toBeGreaterThan(0);
  await waitFor(() => expect(JSON.parse(localStorage.getItem(storageKey))).toEqual(expect.arrayContaining([
    expect.objectContaining({ owner: 'Cheikh', taskRef: 'TASK-LEGAL-01', gedRef: 'GED-LEGAL-01', status: 'prepared' })
  ])));

  view.unmount();
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'Autre mission', service: 'work', sensitivity: 'internal' }} />);
  expect(screen.getAllByText('Préparer les documents LEGAL manquants').length).toBeGreaterThan(0);
});

test('removes sensitive titles and references from restricted local records', async () => {
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'CV nominatif confidentiel', service: 'cowork', sensitivity: 'restricted' }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la mission préparée' }));
  expect(screen.getByText(/seuls le service, l’état, le responsable et les dates/i)).toBeInTheDocument();
  expect(screen.queryByLabelText('Référence GED')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Responsable 2SG *'), { target: { value: 'Cheikh' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  expect(screen.getAllByText('Mission restreinte').length).toBeGreaterThan(0);
  expect(screen.queryByText('CV nominatif confidentiel')).not.toBeInTheDocument();
  await waitFor(() => {
    const [record] = JSON.parse(localStorage.getItem(storageKey));
    expect(record).toMatchObject({ title: '', taskRef: '', gedRef: '', deliverableRef: '', sensitivity: 'restricted' });
  });
});

test('updates the mission lifecycle after confirmation', () => {
  localStorage.setItem(storageKey, JSON.stringify([{
    id: 'EXT-1', title: 'Mission de contrôle', service: 'classic', sensitivity: 'internal', status: 'sent', owner: 'Cheikh', sentDate: '2026-08-16', deadline: '', taskRef: '', gedRef: '', deliverableRef: ''
  }]));
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'Autre mission', service: 'work', sensitivity: 'internal' }} />);
  fireEvent.click(screen.getAllByText('Mission de contrôle')[0]);
  fireEvent.change(screen.getByLabelText('État'), { target: { value: 'received' } });
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Modifier' })).getByRole('button', { name: 'Modifier' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  expect(screen.getAllByText('Reçue').length).toBeGreaterThan(0);
});

test('keeps the register labels trilingual', () => {
  const { rerender } = render(<ExternalMissionRegister language="EN" enabled={false} draft={null} />);
  expect(screen.getByText('Delegated mission tracking')).toBeInTheDocument();
  rerender(<ExternalMissionRegister language="DE" enabled={false} draft={null} />);
  expect(screen.getByText('Nachverfolgung delegierter Aufgaben')).toBeInTheDocument();
});

test('shows required-field errors inside the form', () => {
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: '', service: 'work', sensitivity: 'internal' }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la mission préparée' }));
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));

  expect(screen.getByRole('alert')).toHaveTextContent('Merci de remplir tous les champs obligatoires');
  expect(screen.getByRole('alert')).toHaveTextContent('Intitulé non sensible');
  expect(screen.getByRole('alert')).toHaveTextContent('Responsable 2SG');
  expect(screen.getByLabelText('Intitulé non sensible *')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText('Responsable 2SG *')).toHaveAttribute('aria-invalid', 'true');
});

test('loads active owners from the secured member directory', async () => {
  api.getMembersDirectory.mockResolvedValue({
    data: [
      { person_id: 'PER-1', display_name: 'Cheikh Ndiaye', position: 'Manager et coordinateur général de 2SG - architecte fonctionnel M3S', active: true },
      { person_id: 'PER-3', display_name: 'Gnilane Diouf', position: 'Cheffe de projets', active: true }
    ]
  });
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'Mission annuaire', service: 'work', sensitivity: 'internal' }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la mission préparée' }));

  expect(await screen.findByRole('option', { name: /Gnilane Diouf — Cheffe de projets/i })).toBeInTheDocument();
  expect(api.getMembersDirectory).toHaveBeenCalledWith(100, 0);
});

test('requires a sent date and fills today when the state leaves prepared', () => {
  render(<ExternalMissionRegister language="FR" enabled draft={{ title: 'Mission envoyée', service: 'work', sensitivity: 'internal' }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la mission préparée' }));
  fireEvent.change(screen.getByLabelText('Responsable 2SG *'), { target: { value: 'Cheikh' } });
  fireEvent.change(screen.getByLabelText('État'), { target: { value: 'sent' } });

  expect(screen.getByLabelText('Date d’envoi *')).toHaveValue(new Date().toLocaleDateString('en-CA'));
});
