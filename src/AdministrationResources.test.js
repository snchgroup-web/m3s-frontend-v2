import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationResources from './AdministrationResources';
import api from './api';

let mockAuth;
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getAdministrationResources: jest.fn(),
    createAdministrationResource: jest.fn(),
    updateAdministrationResource: jest.fn(),
    deleteAdministrationResource: jest.fn()
  }
}));

beforeEach(() => {
  mockAuth = { token: 'demo_session_test', user: { email: 'cheikh@seneswiss.sn', tenantId: '2sg' } };
  localStorage.clear();
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  jest.clearAllMocks();
});

afterEach(() => jest.restoreAllMocks());

test('shows the governed resource baseline and adds a local resource with confirmation', () => {
  render(<AdministrationResources language="FR" />);

  expect(screen.getByText('Inventaire documentaire gouverné 2SG/M3S')).toBeInTheDocument();
  expect(screen.getAllByText(/base initiale non exhaustive/i).length).toBeGreaterThanOrEqual(1);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter une ressource' }));
  fireEvent.change(screen.getByLabelText('Titre *'), { target: { value: 'Manuel administratif' } });
  fireEvent.change(screen.getByLabelText('Autorité ou propriétaire *'), { target: { value: 'Administration 2SG' } });
  fireEvent.change(screen.getByLabelText('URL ou emplacement GED *'), { target: { value: 'GED / Administration / Manuel' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));

  expect(window.confirm).toHaveBeenCalled();
  expect(screen.getByText('Manuel administratif')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Ressource enregistrée avec succès.');
});

test('localizes the preloaded resource content without translating user entries', () => {
  render(<AdministrationResources language="EN" />);

  expect(screen.getByText('2SG/M3S governed document inventory')).toBeInTheDocument();
  expect(screen.getByText(/substantive validation, signature and adoption remain distinct/i)).toBeInTheDocument();
  expect(screen.queryByText('Pilote Administration M3S')).not.toBeInTheDocument();
});

test('shows resources returned by the secure backend without importing local entries', async () => {
  mockAuth = { token: 'signed-token', user: { id: 'USR-1', tenantId: '2sg' } };
  api.getAdministrationResources.mockResolvedValue({
    success: true,
    source: 'bigquery',
    data: [{
      id: 'RES-BACKEND', title: 'Ressource backend', family: 'processes_methods',
      authority: 'Administration 2SG', location: 'GED / Administration',
      source_status: 'governed_internal', review_status: 'controlled',
      confidentiality: 'internal', note: 'Métadonnée gouvernée.'
    }]
  });

  render(<AdministrationResources language="FR" />);
  expect(await screen.findByText('Ressource backend')).toBeInTheDocument();
  expect(screen.getAllByText('Source backend sécurisée').length).toBeGreaterThanOrEqual(1);
  expect(api.getAdministrationResources).toHaveBeenCalledTimes(1);
});

test('uses the isolated local pilot when the backend tables are unavailable', async () => {
  mockAuth = { token: 'signed-token', user: { id: 'USR-1', tenantId: '2sg' } };
  localStorage.setItem(
    'm3s-administration-resources-v2:2sg:USR-1',
    JSON.stringify([{
      id: 'RES-LOCAL', title: 'Ressource locale isolée', familyIndex: 2,
      authority: 'Administration 2SG', location: 'GED / Administration',
      statusIndex: 2, reviewIndex: 2, confidentialityIndex: 1, note: ''
    }])
  );
  const unavailable = new Error('Table unavailable');
  unavailable.status = 503;
  unavailable.code = 'ADMIN_REGISTRY_SOURCE_UNAVAILABLE';
  api.getAdministrationResources.mockRejectedValue(unavailable);

  render(<AdministrationResources language="FR" />);
  expect(await screen.findByText('Ressource locale isolée')).toBeInTheDocument();
  expect(screen.getAllByText('Pilote local · backend indisponible').length).toBeGreaterThanOrEqual(1);
});
