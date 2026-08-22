import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DashboardPilotageNavigation, { renderReferenceArtifact, renderSandboxedHtmlArtifact, resolveDashboardView, resolveFunctionMapSelection } from './DashboardPilotageNavigation';
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
  expect(screen.getByRole('tab', { name: "Vue d'ensemble" })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Piloter')).toBeInTheDocument();
  expect(screen.getByText('Organiser')).toBeInTheDocument();
  expect(screen.getByText('Animer')).toBeInTheDocument();
  expect(screen.getByText('Diriger')).toBeInTheDocument();
});

test('keeps Intelligence honest when no edition is published', async () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ language: 'EN', onNavigate });

  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));
  expect(await screen.findByText('No published edition')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Open Monitoring & KM/ }));
  expect(onNavigate).toHaveBeenCalledWith('/ged?tab=knowledge&returnTo=dashboard-daily-intelligence');
});

test('shows the real edition and its three secured artifacts', async () => {
  api.getLatestIntelligence.mockResolvedValue({
    success: true,
    data: { editionDate: '2026-08-07', sourceVersion: 'V4' }
  });
  renderDashboardNavigation();

  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));
  expect(await screen.findByText('Édition disponible')).toBeInTheDocument();
  expect(screen.getByText(/2026-08-07/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ouvrir le Daily Intelligence/ })).toBeInTheDocument();
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

  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));
  expect(api.getLatestIntelligence).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));

  await act(async () => {
    resolveFirstRequest({ success: true, data: null });
  });
  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));

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

  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));
  expect(await screen.findByText('The Intelligence source is temporarily unavailable.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));
  fireEvent.click(screen.getByRole('tab', { name: 'Daily Intelligence' }));

  expect(api.getLatestIntelligence).toHaveBeenCalledTimes(2);
  expect(await screen.findByText('Edition available')).toBeInTheDocument();
});

test('renders HTML artifacts in an opaque sandbox without same-origin access', () => {
  const artifactDocument = document.implementation.createHTMLDocument();
  const target = {
    opener: {},
    document: artifactDocument
  };

  expect(renderSandboxedHtmlArtifact(target, 'blob:m3s-intelligence', {
    title: '2SG Daily Intelligence Dashboard',
    returnUrl: 'https://m3s.local/?view=intelligence',
    returnLabel: 'Revenir au Daily Intelligence'
  })).toBe(true);
  const frame = artifactDocument.querySelector('iframe');
  const sandboxValue = frame.getAttribute('sandbox');
  expect(sandboxValue).toContain('allow-scripts');
  expect(sandboxValue).not.toContain('allow-same-origin');
  expect(artifactDocument.querySelector('a').textContent).toBe('Revenir au Daily Intelligence');
  expect(artifactDocument.querySelector('main').contains(frame)).toBe(true);
  expect(target.opener).toBeNull();
});

test('renders the UTF-8 reference in a readable document with a return action', () => {
  const artifactDocument = document.implementation.createHTMLDocument();
  const target = { opener: {}, document: artifactDocument };

  expect(renderReferenceArtifact(target, '# Référentiel\n\n- Mémoire stratégique\n- État du système', {
    title: 'Référentiel du 2SG Daily Intelligence Dashboard',
    returnUrl: 'https://m3s.local/?view=intelligence',
    returnLabel: 'Revenir au Daily Intelligence'
  })).toBe(true);

  expect(artifactDocument.body.textContent).toContain('Référentiel');
  expect(artifactDocument.body.textContent).toContain('Mémoire stratégique');
  expect(artifactDocument.querySelectorAll('li')).toHaveLength(2);
  expect(artifactDocument.querySelector('a').getAttribute('href')).toBe('https://m3s.local/?view=intelligence');
});

test('selects a local function map without leaving the global dashboard', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ language: 'DE', onNavigate });

  fireEvent.click(screen.getByRole('tab', { name: 'Funktionskarte' }));
  const managementHeading = screen.getByRole('heading', { name: 'Management & Governance' });
  const supportHeading = screen.getByRole('heading', { name: 'Unterstützungsfunktionen' });
  const operationsHeading = screen.getByRole('heading', { name: 'Betrieb & Entwicklung' });
  expect(managementHeading.closest('.function-map-canvas')).toBeInTheDocument();
  expect(supportHeading.closest('.function-map-family')).toHaveClass('function-map-family--support');
  expect(operationsHeading.closest('.function-map-family')).toHaveClass('function-map-family--operations');
  expect(managementHeading.compareDocumentPosition(supportHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(managementHeading.compareDocumentPosition(operationsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByText('4 Funktionen')).toBeInTheDocument();
  expect(screen.getByText('3 Funktionen')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Lokale Karte anzeigen : Verwaltung' }));
  expect(onNavigate).not.toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenLastCalledWith(
    { pathname: '/', search: '?view=map&function=administration' },
    { replace: true }
  );
  expect(screen.getByRole('button', { name: 'Lokale Karte anzeigen : IT & Support' })).toBeInTheDocument();
});

test('opens a local function mind map directly from its governed URL', () => {
  renderDashboardNavigation({ language: 'FR' }, '/?view=map&function=administration');

  expect(screen.getByText('Carte locale')).toBeInTheDocument();
  expect(screen.getAllByText('Administration').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Architecture & Relations')).toHaveLength(2);
  expect(screen.getByText('Processus & Procédures')).toBeInTheDocument();
  expect(screen.getByText('Assistant administratif')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Revenir à la carte globale' })).toBeInTheDocument();
});

test('returns from a local function map to the global map', () => {
  renderDashboardNavigation({}, '/?view=map&function=finance');

  fireEvent.click(screen.getByRole('button', { name: 'Revenir à la carte globale' }));
  expect(mockNavigate).toHaveBeenCalledWith(
    { pathname: '/', search: '?view=map' },
    { replace: true }
  );
});

test('opens the selected business function from its local map', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ language: 'FR', onNavigate }, '/?view=map&function=production');

  expect(screen.getByText('2SG / M3S · Opérations & Développement')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir la fonction' }));
  expect(onNavigate).toHaveBeenCalledWith('/production');
});

test.each([
  ['administration', 'Administration', 10, '#06b6d4'],
  ['finance', 'Finances', 9, '#10b981'],
  ['rh', 'Ressources humaines', 5, '#8b5cf6'],
  ['it', 'IT & Support', 9, '#14b8a6'],
  ['crm', 'Commercial & CRM', 7, '#0ea5e9'],
  ['production', 'Production', 5, '#f97316'],
  ['assets', 'Stock & Actifs', 5, '#f43f5e']
])('renders the governed local map for %s', (functionId, label, componentCount, accent) => {
  const { container } = renderDashboardNavigation({ language: 'FR' }, `/?view=map&function=${functionId}`);
  const localMap = container.querySelector('.function-map-local-canvas');

  expect(localMap).toBeInTheDocument();
  expect(localMap).toHaveStyle(`--function-accent: ${accent}`);
  expect(localMap.querySelectorAll('.function-map-local-node')).toHaveLength(componentCount);
  expect(localMap).toHaveTextContent(label);
});

test('opens a dashboard view directly from the governed URL', async () => {
  renderDashboardNavigation({}, '/?view=intelligence');

  expect(screen.getByRole('tab', { name: 'Daily Intelligence' })).toHaveAttribute('aria-selected', 'true');
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

  fireEvent.click(screen.getByRole('tab', { name: "Vue d'ensemble" }));
  expect(mockNavigate).toHaveBeenCalledWith(
    { pathname: '/', search: '?view=overview' },
    { replace: true }
  );
});

test('opens the four governed global views without confusing architecture with the function map', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate });

  fireEvent.click(screen.getByRole('tab', { name: 'Architecture & Relations' }));
  expect(screen.getByRole('heading', { name: 'Architecture & Relations' })).toBeInTheDocument();
  expect(screen.getByText('Chaîne de relation')).toBeInTheDocument();
  expect(screen.queryByText('Carte mentale globale des fonctions')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Processus & Contrôles' }));
  expect(screen.getByRole('heading', { name: 'Processus & Contrôles' })).toBeInTheDocument();
  expect(screen.getByText('Contrôles minimaux')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Ressources' }));
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir Administration' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration?tab=resources&returnTo=dashboard-resources');

  fireEvent.click(screen.getByRole('tab', { name: 'Glossaire' }));
  expect(screen.getByText('Source maîtresse')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dictionnaire KPI du Tableau de bord' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Management & Gouvernance' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Fonctions support · Finances' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Opérations & Développement' })).toBeInTheDocument();
    expect(screen.getByText('Nombre de comptes authentifiés retournés par le service de comptage M3S.')).toBeInTheDocument();
    expect(screen.getByText('Somme CHF des remboursements immobiliers réalisés ; l’équivalent CFA affiché est une conversion au taux de référence courant.')).toBeInTheDocument();
    expect(screen.getByText('Nombre de clients enregistrés dans le registre Commercial & CRM lorsque son compteur global sera raccordé.')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Revenir à l’indicateur' })).toHaveLength(29);
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le Glossaire central' }));
  expect(onNavigate).toHaveBeenCalledWith('/ged?tab=glossary&returnTo=dashboard-glossary');
});

test.each([
  ['', 'overview'],
  ['?view=overview', 'overview'],
  ['?view=intelligence', 'intelligence'],
  ['?view=map', 'map'],
  ['?view=architecture', 'architecture'],
  ['?view=processes', 'processes'],
  ['?view=incidents', 'incidents'],
  ['?view=resources', 'resources'],
  ['?view=glossary', 'glossary'],
  ['?view=unknown', 'overview']
])('resolves %p to the safe dashboard view %p', (search, expected) => {
  expect(resolveDashboardView(search)).toBe(expected);
});

test.each([
  ['', ''],
  ['?view=map&function=administration', 'administration'],
  ['?view=map&function=finance', 'finance'],
  ['?view=map&function=unknown', '']
])('resolves function map selection %p safely', (search, expected) => {
  expect(resolveFunctionMapSelection(search)).toBe(expected);
});
