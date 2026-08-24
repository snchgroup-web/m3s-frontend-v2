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

test('shows the governed institutional programme without inventing progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('tab', { name: 'Programme institutionnel 2SG' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('heading', { name: 'De l’idée à une institution durable' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '2SG · Institution porteuse' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'M3S · Système interne transversal de management' })).toBeInTheDocument();
  expect(screen.getByText('29 composantes', { exact: false })).toBeInTheDocument();
  expect(screen.getByText(/Aucun pourcentage n’est affiché/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/\d+\s*%/);
});

test('opens the institutional programme in all three interface languages', () => {
  const { rerender } = renderDashboardNavigation({ language: 'EN' }, '/?view=program');
  expect(screen.getByRole('heading', { name: 'From an idea to a sustainable institution' })).toBeInTheDocument();
  expect(screen.getByText('Mandates and delegations to confirm')).toBeInTheDocument();
  expect(screen.getByText('Access, environments and continuity to consolidate')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Shared measurement method' })).toHaveLength(3);
  expect(screen.getAllByText('Calculation not authorised')).toHaveLength(3);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Von der Idee zu einer nachhaltigen Institution' })).toBeInTheDocument();
  expect(screen.getByText('Mandate und Delegationen zu bestätigen')).toBeInTheDocument();
  expect(screen.getByText('Zugriffe, Umgebungen und Kontinuität zu konsolidieren')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Gemeinsame Messmethode' })).toHaveLength(3);
  expect(screen.getAllByText('Berechnung nicht autorisiert')).toHaveLength(3);
});

test('shows the governed MEP-01 LEGAL pilot without inventing progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-01 · LEGAL' })).toBeInTheDocument();
  expect(screen.getByText('Progression non calculable · périmètre cible, tâches et preuves à valider')).toBeInTheDocument();
  expect(screen.getByText('Applicabilité à qualifier')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Méthode de mesure commune' })).toHaveLength(3);
  expect(screen.getAllByText('Calcul non autorisé')).toHaveLength(3);
  expect(screen.getAllByText(/Périmètre cible$/)).toHaveLength(3);
  expect(screen.getAllByText(/Règle de calcul$/)).toHaveLength(3);
  expect(document.body.textContent).not.toMatch(/MEP-01[^%]*\d+\s*%/);
});

test('opens the authorised LEGAL progress with an exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’avancement LEGAL/ }));
  expect(onNavigate).toHaveBeenCalledWith(
    '/administration?tab=compliance&returnTo=dashboard&dashboardView=program#compliance-progress'
  );
});

test('shows the governed MEP-02 Governance pilot without inventing progress or authority', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-02 · Gouvernance' })).toBeInTheDocument();
  expect(screen.getByText('Mandats et délégations à confirmer')).toBeInTheDocument();
  expect(screen.getByText(/Statut de membre, fonction, mandat juridique et droit M3S/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-02[^%]*\d+\s*%/);
});

test('opens the governance source with an exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir Gouvernance & équipe/ }));
  expect(onNavigate).toHaveBeenCalledWith(
    '/administration?tab=institution&section=institution-governance&returnTo=dashboard&dashboardView=program#institution-governance'
  );
});

test('shows the governed MEP-04 digital infrastructure pilot without exposing secrets or inventing progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-04 · Infrastructure numérique & M3S' })).toBeInTheDocument();
  expect(screen.getByText('Accès, environnements et continuité à consolider')).toBeInTheDocument();
  expect(screen.getByText(/Aucun secret, mot de passe, jeton, clé ou chemin sensible/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-04[^%]*\d+\s*%/);
});

test('opens IT & Support from MEP-04 with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir IT & Support/ }));
  expect(onNavigate).toHaveBeenCalledWith(
    '/ged?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-digital-infrastructure-pilot#it-support-architecture'
  );
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
  expect(screen.getByRole('heading', { name: 'Modèle relationnel candidat' })).toBeInTheDocument();
  expect(screen.getByText('Cible à valider')).toBeInTheDocument();
  expect(screen.getByText('Dossier → Projet → Phase → Tâche')).toBeInTheDocument();
  expect(screen.getByText('Une opération peut exécuter ou financer une tâche sans se confondre avec elle.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Premier domaine pilote · Achat & approvisionnement' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Observé aujourd’hui' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cible candidate' })).toBeInTheDocument();
  expect(screen.getByText(/expense_id et inventory_movement_id restent deux objets distincts/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contrat relationnel candidat à arbitrer' })).toBeInTheDocument();
  expect(screen.getByText('Proposition · aucune implémentation')).toBeInTheDocument();
  expect(screen.getAllByText('Propriétaire candidat')).toHaveLength(6);
  expect(screen.getAllByText('Cardinalité candidate')).toHaveLength(6);
  expect(screen.getByText('1 fournisseur → 0..n dossiers d’achat ; chaque commande ou lot → exactement 1 fournisseur retenu.')).toBeInTheDocument();
  expect(screen.getByText('responsible_party_id')).toBeInTheDocument();
  expect(screen.getByText(/RH-001 gouverne les identités et affectations internes/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cycle candidat du dossier d’achat' })).toBeInTheDocument();
  expect(screen.getByText('Réception sous réserve')).toBeInTheDocument();
  expect(screen.getByText(/Il ne remplace pas les statuts propres aux dépenses/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contrôles minimaux candidats' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Commander par lot' })).toBeInTheDocument();
  expect(screen.getByText('Autorisation active et un fournisseur par commande ou lot.')).toBeInTheDocument();
  expect(screen.getByText('Réserves visibles ; aucun paiement final déduit automatiquement.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sous-modèle métier validé · commande, réception et réserves' })).toBeInTheDocument();
  expect(screen.getByText('Validé métier · 23.08.2026 · aucune implémentation')).toBeInTheDocument();
  expect(screen.getByText('order_or_lot_id')).toBeInTheDocument();
  expect(screen.getAllByText('Propriétaire métier validé')).toHaveLength(3);
  expect(screen.getAllByText('Cardinalité métier validée')).toHaveLength(3);
  expect(screen.getByText('receipt_id')).toBeInTheDocument();
  expect(screen.getByText('reservation_id')).toBeInTheDocument();
  expect(screen.getByText(/chaque commande ou lot → exactement 1 dossier et 1 fournisseur retenu/)).toBeInTheDocument();
  expect(screen.getByText('Une réception partielle ne clôture ni le reliquat à livrer ni les obligations restantes.')).toBeInTheDocument();
  expect(screen.getByText(/Une réserve ouverte empêche une clôture non qualifiée, mais ne détermine ni ne modifie automatiquement le paiement/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Règles de liaison validées' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cycle métier validé d’une réserve' })).toBeInTheDocument();
  expect(screen.getByText('Action corrective en cours')).toBeInTheDocument();
  expect(screen.getByText('À vérifier')).toBeInTheDocument();
  expect(screen.getByText('Levée')).toBeInTheDocument();
  expect(screen.getByText('Maintenue')).toBeInTheDocument();
  expect(screen.getByText('Annulée')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Trace minimale validée' })).toBeInTheDocument();
  expect(screen.getByText('Preuves avant et après, référencées dans la GED')).toBeInTheDocument();
  expect(screen.getByText('Décision, auteur, date et motif du dernier état')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Préconditions techniques avant formulaire et backend' })).toBeInTheDocument();
  expect(screen.getByText(/Droits RBAC définis pour créer, corriger, contrôler, lever, maintenir et annuler/)).toBeInTheDocument();
  expect(screen.getByText(/sans conversion automatique des anciens libellés/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Deuxième domaine borné · Dossier, projet et exécution' })).toBeInTheDocument();
  expect(screen.getByText('Règle tâche validée · aucune implémentation')).toBeInTheDocument();
  expect(screen.getByText('dossier_id')).toBeInTheDocument();
  expect(screen.getByText('project_id')).toBeInTheDocument();
  expect(screen.getByText('phase_id')).toBeInTheDocument();
  expect(screen.getByText('activity_id')).toBeInTheDocument();
  expect(screen.getByText('task_id')).toBeInTheDocument();
  expect(screen.getByText('action_id')).toBeInTheDocument();
  expect(screen.getByText('milestone_id')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Garde-fous du cadrage' })).toBeInTheDocument();
  expect(screen.getByText(/chaque tâche → exactement 1 phase et 0..1 activité/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Décision métier validée · 23.08.2026' })).toBeInTheDocument();
  expect(screen.getByText(/Chaque tâche porte un `phase_id` obligatoire et un `activity_id` facultatif/)).toBeInTheDocument();
  expect(screen.queryByText('Carte mentale globale des fonctions')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Processus & Contrôles' }));
  expect(screen.getByRole('heading', { name: 'Processus & Contrôles' })).toBeInTheDocument();
  expect(screen.getByText('Contrôles minimaux')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Ressources' }));
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir Administration' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration?tab=resources&returnTo=dashboard&dashboardView=resources');
  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir Exécution' }));
  expect(onNavigate).toHaveBeenCalledWith('/administration?tab=planning&returnTo=dashboard&dashboardView=resources');

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
  ['?view=program', 'program'],
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
