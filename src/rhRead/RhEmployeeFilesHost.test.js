import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import RhEmployeeFilesHost from './RhEmployeeFilesHost';
import { rhReadTransport } from '../api';
let mockAuth;
jest.mock('../AuthContext', () => ({ useAuth: () => mockAuth }));
jest.mock('../api', () => ({ rhReadTransport: jest.fn() }));
const marker = { enabled: true, qualified: true, userId: 'synthetic-reader', organizationId: 'synthetic-org', revision: '1' };
const response = (value, status = 200) => ({ status, json: async () => value });
const list = response({ items: [], limit: 25, offset: 0, candidate: true });
beforeEach(() => {
  mockAuth = { ready: true, isAuthenticated: true, provider: 'google',
    user: { id: marker.userId, tenantId: marker.organizationId, authProvider: 'google' } };
  rhReadTransport.mockReset();
  rhReadTransport.mockImplementation(path => Promise.resolve(path === '/access' ? response(marker) : list));
});

test('host reads current metadata before the register without a role-derived permission', async () => {
  mockAuth.user.role = 'Manager';
  render(<RhEmployeeFilesHost/>);
  expect(screen.getByRole('status')).toHaveTextContent('Vérification de l’accès RH');
  await screen.findByText('Aucun dossier sur cette page');
  expect(rhReadTransport.mock.calls.map(([path]) => path)).toEqual(['/access', '/employees?limit=25&offset=0']);
});

test('legacy, signed-out, unready and incomplete identities make no request', () => {
  mockAuth.provider = 'legacy';
  const view = render(<RhEmployeeFilesHost/>);
  for (const patch of [{ ready: false }, { isAuthenticated: false }, { user: null }]) {
    mockAuth = { ...mockAuth, provider: 'google', ...patch }; view.rerender(<RhEmployeeFilesHost/>);
  }
  expect(rhReadTransport).not.toHaveBeenCalled();
});

test('foreign, extra, malformed and revoked markers cannot enable a data request', async () => {
  for (const invalid of [{ ...marker, userId: 'foreign' }, { ...marker, organizationId: 'foreign' },
    { ...marker, enabled: false }, { ...marker, revision: '0' }, { ...marker, salary: 123 }]) {
    rhReadTransport.mockResolvedValue(response(invalid));
    const view = render(<RhEmployeeFilesHost/>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Vérification de l’accès indisponible');
    view.unmount();
  }
  expect(rhReadTransport.mock.calls.every(([path]) => path === '/access')).toBe(true);
});

test('closed metadata is retryable, language changes preserve context, and SQL failures are not called closed', async () => {
  rhReadTransport.mockResolvedValue(response({ code: 'RH_NOT_ENABLED' }, 503));
  const view = render(<RhEmployeeFilesHost/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Lecture RH non activée');
  view.rerender(<RhEmployeeFilesHost language="DE"/>);
  expect(screen.getByRole('alert')).toHaveTextContent('Personalakten nicht freigeschaltet');
  expect(rhReadTransport).toHaveBeenCalledTimes(1);
  rhReadTransport.mockResolvedValue(response({ code: 'RH_SERVICE_UNAVAILABLE' }, 503));
  fireEvent.click(screen.getByRole('button', { name: 'Aktualisieren' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Zugriffsprüfung nicht verfügbar');
});

test('principal change immediately clears the previous context and ignores late metadata', async () => {
  let finish;
  rhReadTransport.mockImplementation(() => new Promise(resolve => { finish = () => resolve(response(marker)); }));
  const view = render(<RhEmployeeFilesHost/>);
  await waitFor(() => expect(rhReadTransport).toHaveBeenCalledTimes(1));
  const firstSignal = rhReadTransport.mock.calls[0][1].signal;
  const firstFinish = finish;
  mockAuth.user = { ...mockAuth.user, id: 'other-reader' };
  view.rerender(<RhEmployeeFilesHost/>);
  expect(firstSignal.aborted).toBe(true);
  await act(async () => { firstFinish(); });
  expect(rhReadTransport.mock.calls.every(([path]) => path === '/access')).toBe(true);
  view.unmount(); expect(rhReadTransport.mock.calls[1][1].signal.aborted).toBe(true);
});

test('denied and failed metadata never reach the records or retain personal data', async () => {
  rhReadTransport.mockResolvedValue(response({ code: 'RH_ACCESS_DENIED' }, 403));
  render(<RhEmployeeFilesHost language="EN"/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('HR access not authorized');
  rhReadTransport.mockRejectedValue(new Error('SYNTHETIC_PROVIDER_DETAIL'));
  fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Access check unavailable');
  expect(screen.queryByText('SYNTHETIC_PROVIDER_DETAIL')).not.toBeInTheDocument();
  expect(rhReadTransport.mock.calls.every(([path]) => path === '/access')).toBe(true);
});
