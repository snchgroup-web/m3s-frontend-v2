import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CorrespondenceAgenda from './CorrespondenceAgenda';
import api from './api';
import { ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION } from './accessControl';

let mockSession;
jest.mock('./AuthContext', () => ({ useAuth: () => mockSession }));
jest.mock('./api', () => ({ __esModule: true, default: { getAdministrationCorrespondence: jest.fn() } }));
jest.mock('react-router-dom', () => ({ Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a> }), { virtual: true });

const payload = (subject = 'Synthetic follow-up', status = 'in_progress') => ({ success: true, source: 'bigquery', data: [{ id: 'COR-SYNTHETIC', subject, owner: 'Synthetic owner', deadline: '2026-10-19', status, next_action: 'Check response. No automatic reminder.' }] });
const view = language => <CorrespondenceAgenda language={language} />;
const selectOctober = () => fireEvent.change(screen.getByLabelText('Mois'), { target: { value: '2026-10' } });

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  mockSession = { token: 'signed-synthetic', user: { id: 'SYNTHETIC-1', tenantId: 'synthetic', permissions: [ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION] } };
  api.getAdministrationCorrespondence.mockResolvedValue(payload());
});

test('displays shared deadlines and links to the exact correspondence record', async () => {
  render(view('FR'));
  selectOctober();
  expect(await screen.findByText('Synthetic follow-up')).toBeInTheDocument();
  expect(screen.getByText('Planifié')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ouvrir le courrier' })).toHaveAttribute('href', '/administration?tab=communication&correspondenceId=COR-SYNTHETIC#communication-register');
  expect(localStorage.length).toBe(0);
});

test.each(['demo_session_test', null])('does not use local candidates for session %s', token => {
  mockSession.token = token;
  render(view('FR'));
  expect(screen.getByRole('status')).toHaveTextContent('non autorisé');
  expect(api.getAdministrationCorrespondence).not.toHaveBeenCalled();
});

test('checks existing read permissions without granting access', () => {
  mockSession.user.permissions = [];
  render(view('FR'));
  expect(api.getAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'Actualiser l’agenda' })).toBeDisabled();
});

test('does not confuse a backend failure with an empty agenda', async () => {
  api.getAdministrationCorrespondence.mockRejectedValue(new Error('Unavailable'));
  render(view('FR'));
  expect(await screen.findByText(/Agenda indisponible/)).toBeInTheDocument();
  expect(screen.queryByText(/Aucun suivi programmé/)).not.toBeInTheDocument();
});

test('refreshes from the server and clears stale data after permission refusal', async () => {
  render(view('FR'));
  selectOctober();
  await screen.findByText('Synthetic follow-up');
  api.getAdministrationCorrespondence.mockRejectedValue(Object.assign(new Error('Denied'), { status: 403 }));
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser l’agenda' }));
  expect(await screen.findByText(/non autorisé/)).toBeInTheDocument();
  expect(screen.queryByText('Synthetic follow-up')).not.toBeInTheDocument();
});

test('preserves selected month when changing language and supports closed records', async () => {
  api.getAdministrationCorrespondence.mockResolvedValue(payload('Closed synthetic', 'closed'));
  const { rerender } = render(view('FR'));
  selectOctober();
  await screen.findByText('Aucun suivi programmé pour ce mois.');
  fireEvent.click(screen.getByLabelText('Inclure les courriers clos'));
  expect(screen.getByText('Closed synthetic')).toBeInTheDocument();
  rerender(view('DE'));
  expect(screen.getByLabelText('Monat')).toHaveValue('2026-10');
  expect(screen.getByRole('link', { name: 'Korrespondenz öffnen' })).toBeInTheDocument();
});

test('drops responses belonging to the previous account', async () => {
  let resolveFirst;
  api.getAdministrationCorrespondence.mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve; }));
  const { rerender } = render(view('FR'));
  selectOctober();
  mockSession = { ...mockSession, user: { ...mockSession.user, id: 'SYNTHETIC-2' } };
  api.getAdministrationCorrespondence.mockResolvedValue(payload('New account source'));
  rerender(view('FR'));
  await screen.findByText('New account source');
  await act(async () => resolveFirst(payload('Old account source')));
  expect(screen.queryByText('Old account source')).not.toBeInTheDocument();
});
