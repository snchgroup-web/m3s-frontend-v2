import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DashboardPilotageNavigation, { renderSandboxedHtmlArtifact, resolveDashboardView } from './DashboardPilotageNavigation';
import api from './api';

let mockLocation = { pathname: '/', search: '' };
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => mockLocation,
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getLatestIntelligence: jest.fn(),
    getLatestIntelligenceArtifact: jest.fn()
  }
}));

beforeEach(() => {
  mockLocation = { pathname: '/', search: '' };
  mockNavigate.mockReset();
  api.getLatestIntelligence.mockResolvedValue({ success: true, data: null });
});

const renderDashboardNavigation = (props = {}, initialEntry = '/') => {
  const url = new URL(initialEntry, 'https://m3s.local');
  mockLocation = { pathname: url.pathname, search: url.search };
  return render(<DashboardPilotageNavigation language="FR" onNavigate={jest.fn()} {...props} />);
};

test('shows the four management responsibilities in French', () => {
  renderDashboardNavigation();

  expect(screen.getByRole('heading', { name: 'Décider avec une vue d’ensemble fiable' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Pilotage' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Piloter')).toBeInTheDocument();
  expect(screen.getByText('Organiser')).toBeInTheDocument();
  expect(screen.getByText('Animer')).toBeInTheDocument();
  expect(screen.getByText('Diriger')).toBeInTheDocument();
});

test('keeps Intelligence honest when no edition is published', async () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ language: 'EN', onNavigate });

  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));
  expect(await screen.findByText('No published edition')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Open Monitoring & KM/ }));
  expect(onNavigate).toHaveBeenCalledWith('/ged?tab=knowledge');
});

test('shows the real edition and its three secured artifacts', async () => {
  api.getLatestIntelligence.mockResolvedValue({
    success: true,
    data: { editionDate: '2026-08-07', sourceVersion: 'V4' }
  });
  renderDashboardNavigation();

  fireEvent.click(screen.getByRole('tab', { name: 'Intelligence 2SG' }));
  expect(await screen.findByText('Édition disponible')).toBeInTheDocument();
  expect(screen.getByText(/2026-08-07/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le Dashboard/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le PDF/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le référentiel/ })).toBeInTheDocument();
});

test('retries metadata loading after leaving the Intelligence tab mid-request', async () => {
  let resolveFirstRequest;
  api.getLatestIntelligence
    .mockImplementationOnce(() => new Promise((resolve) => { resolveFirstRequest = resolve; }))
    .mockResolvedValueOnce({
      success: true,
      data: { editionDate: '2026-08-07', sourceVersion: 'V4' }
    });
  renderDashboardNavigation({ language: 'EN' });

  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));
  expect(api.getLatestIntelligence).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('tab', { name: 'Steering' }));

  await act(async () => {
    resolveFirstRequest({ success: true, data: null });
  });
  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));

  expect(api.getLatestIntelligence).toHaveBeenCalledTimes(2);
  expect(await screen.findByText('Edition available')).toBeInTheDocument();
});

test('allows retrying metadata after a transient request failure', async () => {
  api.getLatestIntelligence
    .mockRejectedValueOnce(new Error('temporary failure'))
    .mockResolvedValueOnce({
      success: true,
      data: { editionDate: '2026-08-07', sourceVersion: 'V4' }
    });
  renderDashboardNavigation({ language: 'EN' });

  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));
  expect(await screen.findByText('The Intelligence source is temporarily unavailable.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Steering' }));
  fireEvent.click(screen.getByRole('tab', { name: '2SG Intelligence' }));

  expect(api.getLatestIntelligence).toHaveBeenCalledTimes(2);
  expect(await screen.findByText('Edition available')).toBeInTheDocument();
});

test('renders HTML artifacts in an opaque sandbox without same-origin access', () => {
  const frame = { style: {}, setAttribute: jest.fn() };
  const target = {
    opener: {},
    document: {
      title: '',
      body: { style: {}, replaceChildren: jest.fn() },
      createElement: jest.fn(() => frame)
    }
  };

  expect(renderSandboxedHtmlArtifact(target, 'blob:m3s-intelligence')).toBe(true);
  const sandboxValue = frame.setAttribute.mock.calls.find(([name]) => name === 'sandbox')[1];
  expect(sandboxValue).toContain('allow-scripts');
  expect(sandboxValue).not.toContain('allow-same-origin');
  expect(target.document.body.replaceChildren).toHaveBeenCalledWith(frame);
  expect(target.opener).toBeNull();
});

test('opens real function routes from the trilingual function map', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ language: 'DE', onNavigate });

  fireEvent.click(screen.getByRole('tab', { name: 'Funktionskarte' }));
  fireEvent.click(screen.getByRole('button', { name: 'Öffnen : Verwaltung' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration');
  expect(screen.getByRole('button', { name: 'Öffnen : IT & Support' })).toBeInTheDocument();
});

test('opens a dashboard view directly from the governed URL', async () => {
  renderDashboardNavigation({}, '/?view=intelligence');

  expect(screen.getByRole('tab', { name: 'Intelligence 2SG' })).toHaveAttribute('aria-selected', 'true');
  expect(await screen.findByText('Aucune édition publiée')).toBeInTheDocument();
});

test('keeps the selected dashboard view in the URL', () => {
  renderDashboardNavigation();

  fireEvent.click(screen.getByRole('tab', { name: 'Carte des fonctions' }));
  expect(mockNavigate).toHaveBeenCalledWith(
    { pathname: '/', search: '?view=map' },
    { replace: true }
  );
});

test('opens the dedicated steering view from another dashboard view', () => {
  renderDashboardNavigation({}, '/?view=intelligence');

  fireEvent.click(screen.getByRole('tab', { name: 'Pilotage' }));
  expect(mockNavigate).toHaveBeenCalledWith(
    { pathname: '/', search: '?view=overview' },
    { replace: true }
  );
});

test.each([
  ['', 'overview'],
  ['?view=overview', 'overview'],
  ['?view=intelligence', 'intelligence'],
  ['?view=map', 'map'],
  ['?view=unknown', 'overview']
])('resolves %p to the safe dashboard view %p', (search, expected) => {
  expect(resolveDashboardView(search)).toBe(expected);
});
