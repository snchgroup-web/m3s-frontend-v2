import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RhEmployeeFiles from './RhEmployeeFiles';
import { rhReadTransport } from '../api';

let mockAuth;
jest.mock('../AuthContext', () => ({ useAuth: () => mockAuth }));
jest.mock('../api', () => ({ rhReadTransport: jest.fn() }));
const access = { enabled: true, qualified: true, userId: 'synthetic-reader', organizationId: 'synthetic-org', revision: 'synthetic-v1' };
const row = { employeeId: '11111111-1111-4111-8111-111111111111', revision: 1,
  displayName: 'Synthetic employee', positionRef: null, siteRef: 'SYNTHETIC-SITE',
  employmentStartDate: null, status: 'draft', classification: 'C3' };
const response = (items = [row], limit = 25, offset = 0) => ({ status: 200,
  json: async () => ({ items, limit, offset, candidate: true }) });
beforeEach(() => {
  mockAuth = { ready: true, isAuthenticated: true, provider: 'google',
    user: { id: access.userId, tenantId: access.organizationId, authProvider: 'google' } };
  rhReadTransport.mockReset(); rhReadTransport.mockResolvedValue(response());
});

test('unqualified, missing, foreign and unauthenticated contexts make no request', () => {
  const view = render(<RhEmployeeFiles/>);
  expect(screen.getByText('Lecture RH non activée')).toBeInTheDocument();
  for (const patch of [{ qualified: false }, { enabled: false }, { userId: 'foreign' }, { organizationId: 'foreign' }, { revision: '' }]) {
    view.rerender(<RhEmployeeFiles access={{ ...access, ...patch }}/>);
    expect(screen.getByText('Lecture RH non activée')).toBeInTheDocument();
  }
  mockAuth.isAuthenticated = false;
  view.rerender(<RhEmployeeFiles access={access}/>);
  expect(rhReadTransport).not.toHaveBeenCalled();
});

test('loads read-only records and opens/closes their references without fabricated data', async () => {
  render(<RhEmployeeFiles access={access}/>);
  expect(await screen.findByText('Synthetic employee')).toBeInTheDocument();
  expect(screen.getByText('Non renseigné')).toBeInTheDocument();
  expect(screen.getByText(/Total global non disponible/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Consulter le dossier de Synthetic employee' }));
  expect(screen.getByText('SYNTHETIC-SITE')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Refermer le dossier de Synthetic employee' }));
  expect(screen.queryByText('SYNTHETIC-SITE')).not.toBeInTheDocument();
  expect(rhReadTransport).toHaveBeenCalledTimes(1);
  expect(rhReadTransport.mock.calls[0][1].method).toBe('GET');
});

test('changes language without refetching and clears files immediately when context changes', async () => {
  const view = render(<RhEmployeeFiles access={access}/>);
  await screen.findByText('Synthetic employee');
  view.rerender(<RhEmployeeFiles access={access} language="DE"/>);
  expect(screen.getByRole('heading', { name: 'Personalakten' })).toBeInTheDocument();
  expect(screen.getByText('Nicht angegeben')).toBeInTheDocument();
  expect(rhReadTransport).toHaveBeenCalledTimes(1);
  mockAuth.user = { ...mockAuth.user, id: 'foreign-reader' };
  view.rerender(<RhEmployeeFiles access={access}/>);
  expect(screen.queryByText('Synthetic employee')).not.toBeInTheDocument();
  expect(screen.getByText('Lecture RH non activée')).toBeInTheDocument();
});

test('withdrawal and server failures never retain stale rows', async () => {
  render(<RhEmployeeFiles access={access}/>);
  await screen.findByText('Synthetic employee');
  rhReadTransport.mockResolvedValue({ status: 403, json: async () => ({ code: 'RH_ACCESS_DENIED' }) });
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser' }));
  expect(screen.queryByText('Synthetic employee')).not.toBeInTheDocument();
  expect(await screen.findByRole('alert')).toHaveTextContent('Accès RH non autorisé');
  rhReadTransport.mockResolvedValue({ status: 503, json: async () => ({ code: 'RH_NOT_ENABLED' }) });
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Lecture RH non activée');
});

test('unmount aborts pending work and ignores a late response', async () => {
  let finish;
  rhReadTransport.mockImplementation((_path, options) => new Promise(resolve => { finish = () => resolve(response()); }));
  const view = render(<RhEmployeeFiles access={access}/>);
  await waitFor(() => expect(rhReadTransport).toHaveBeenCalledTimes(1));
  const signal = rhReadTransport.mock.calls[0][1].signal;
  view.unmount(); expect(signal.aborted).toBe(true);
  await act(async () => { finish(); });
  expect(screen.queryByText('Synthetic employee')).not.toBeInTheDocument();
});

test('page-size selection clears the current detail and requests the new bounded page', async () => {
  render(<RhEmployeeFiles access={access}/>);
  await screen.findByText('Synthetic employee');
  fireEvent.click(screen.getByRole('button', { name: 'Consulter le dossier de Synthetic employee' }));
  rhReadTransport.mockResolvedValue(response([], 10));
  fireEvent.change(screen.getByRole('combobox', { name: 'Lignes par page' }), { target: { value: '10' } });
  expect(screen.queryByText('SYNTHETIC-SITE')).not.toBeInTheDocument();
  expect(await screen.findByText('Aucun dossier sur cette page')).toBeInTheDocument();
  expect(rhReadTransport.mock.calls[1][0]).toBe('/employees?limit=10&offset=0');
});

test.each([['FR', 'Lignes par page'], ['EN', 'Rows per page'], ['DE', 'Zeilen pro Seite']])(
  'page-size field retains its theme classes, accessible label and bounded options in %s', async (language, name) => {
    render(<RhEmployeeFiles access={access} language={language}/>);
    await screen.findByText('Synthetic employee');
    const field = screen.getByRole('combobox', { name });
    expect(field).toHaveClass('m3s-field', 'rh-page-size');
    expect(field).toHaveValue('25');
    expect(Array.from(field.options, option => option.value)).toEqual(['10', '25', '50', '100']);
    expect(rhReadTransport).toHaveBeenCalledTimes(1);
  }
);
jest.mock('./ContractDocuments', () => () => null);
