import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
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
  window.history.replaceState({}, '', '/');
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
  expect(screen.getByText('Scope, contributions and allocations to reconcile')).toBeInTheDocument();
  expect(screen.getByText('Institutional scope and minimum inventory to define')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Shared measurement method' })).toHaveLength(16);
  expect(screen.getAllByText('Calculation not authorised')).toHaveLength(16);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Von der Idee zu einer nachhaltigen Institution' })).toBeInTheDocument();
  expect(screen.getByText('Mandate und Delegationen zu bestätigen')).toBeInTheDocument();
  expect(screen.getByText('Zugriffe, Umgebungen und Kontinuität zu konsolidieren')).toBeInTheDocument();
  expect(screen.getByText('Umfang, Beiträge und Zuordnungen abzustimmen')).toBeInTheDocument();
  expect(screen.getByText('Institutionellen Umfang und Mindestinventar definieren')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Gemeinsame Messmethode' })).toHaveLength(16);
  expect(screen.getAllByText('Berechnung nicht autorisiert')).toHaveLength(16);
});

test('keeps the current institutional programme section visible after a language change', () => {
  const previousScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState({}, '', '/?view=program#institutional-quality-lessons-consolidation-pilot');

  const { rerender } = renderDashboardNavigation({ language: 'FR' }, '/?view=program');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start' });
  Element.prototype.scrollIntoView.mockClear();

  rerender(<DashboardPilotageNavigation language="EN" onNavigate={jest.fn()} />);
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start' });

  if (previousScrollIntoView) Element.prototype.scrollIntoView = previousScrollIntoView;
  else delete Element.prototype.scrollIntoView;
});

test('shows the governed MEP-01 LEGAL pilot without inventing progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-01 · LEGAL' })).toBeInTheDocument();
  expect(screen.getByText('Progression non calculable · périmètre cible, tâches et preuves à valider')).toBeInTheDocument();
  expect(screen.getByText('Applicabilité à qualifier')).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Méthode de mesure commune' })).toHaveLength(16);
  expect(screen.getAllByText('Calcul non autorisé')).toHaveLength(16);
  expect(screen.getAllByText(/^1\. Périmètre cible$/)).toHaveLength(16);
  expect(screen.getAllByText(/^4\. Règle de calcul$/)).toHaveLength(16);
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

test('shows the governed MEP-05 initial funding pilot without exposing private finance or inventing progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-05 · Ressources & financement initial' })).toBeInTheDocument();
  expect(screen.getByText('Périmètre, apports et affectations à rapprocher')).toBeInTheDocument();
  expect(screen.getByText(/Montants détaillés, références de transaction, comptes, bénéficiaires/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-05[^%]*\d+\s*%/);
});

test('opens Finance from MEP-05 with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir Finances/ }));
  expect(onNavigate).toHaveBeenCalledWith(
    '/finance?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-initial-funding-pilot#finance-architecture-title'
  );
});

test('shows MEP-03 administrative and material setup without inferring ownership or progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-03 · Installation administrative & matérielle' })).toBeInTheDocument();
  expect(screen.getByText('Périmètre institutionnel et inventaire minimal à définir')).toBeInTheDocument();
  expect(screen.getByText(/Une ligne de stock ne prouve ni propriété, ni disponibilité physique/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-03[^%]*\d+\s*%/);
});

test('opens each MEP-03 master register with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’inventaire/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/actifs?tab=inventory&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-admin-material-installation-pilot#assets-inventory-register'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les moyens numériques/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=overview&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-admin-material-installation-pilot#it-support-overview'
  );
  fireEvent.click(screen.getByRole('button', { name: /^Ouvrir les ressources$/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-admin-material-installation-pilot#administration-resources-title'
  );
});

test('shows MEP-06 identity and communication without promoting exploratory assets', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-06 · Identité & communication' })).toBeInTheDocument();
  expect(screen.getByText('Socle de marque, modèles et canaux officiels à valider')).toBeInTheDocument();
  expect(screen.getByText(/Une planche logo, une palette exploratoire, un prototype/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-06[^%]*\d+\s*%/);
});

test('opens each MEP-06 governed source with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les sources d’identité/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=institution&section=institution-sources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-identity-communication-pilot#institution-sources'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir la communication/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=communication&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-identity-communication-pilot#communication-institutional'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources d’identité/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-identity-communication-pilot#administration-resources-title'
  );
});

test('shows MEP-07 operational launch without declaring the institution launched', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'MEP-07 · Lancement opérationnel' })).toBeInTheDocument();
  expect(screen.getByText('Périmètre et conditions de lancement à définir')).toBeInTheDocument();
  expect(screen.getByText(/Un dossier réel, un outil utilisé ou une opération reçue/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/MEP-07[^%]*\d+\s*%/);
});

test('opens each MEP-07 governed source with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir la planification/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=planning&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-operational-launch-pilot#planning-pilot-project'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les processus Production/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/production?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-operational-launch-pilot#production-module-tabs'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources de pilotage/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-operational-launch-pilot#administration-resources-title'
  );
});

test('shows CNS-01 governance and compliance without declaring consolidation complete', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-01 · Gouvernance et conformité' })).toBeInTheDocument();
  expect(screen.getByText('Liste des exigences et décisions à établir')).toBeInTheDocument();
  expect(screen.getByText(/MEP-01 constitue et qualifie le socle LEGAL/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-01[^%]*\d+\s*%/);
});

test('shows the human validation of the CNS-01 working framework without declaring institutional adoption or a percentage', () => {
  renderDashboardNavigation({}, '/?view=program');

  const section = screen
    .getByRole('heading', { name: 'Base d’arbitrage CNS-01 validée comme cadre de travail' })
    .closest('section');
  const decision = within(section);
  expect(decision.getByText('Validation humaine consignée')).toBeInTheDocument();
  expect(decision.getByText(/Cadre de travail CNS-01 validé par Cheikh le 24-08-2026/)).toBeInTheDocument();
  expect(decision.getByText(/Cette validation autorise la préparation de l’inventaire détaillé/)).toBeInTheDocument();
  expect(decision.getByText(/adoption institutionnelle non déclarée/)).toBeInTheDocument();
  expect(decision.getByRole('heading', { name: 'CNS-01-DEC-001 · V1.0' })).toBeInTheDocument();
  expect(decision.getByText('Cadre de travail validé', { selector: 'span' })).toBeInTheDocument();
  expect(decision.getByText('Cheikh Ndiaye')).toBeInTheDocument();
  expect(decision.getByText(/PR frontend #173/)).toBeInTheDocument();
  expect(decision.getByText(/Toute évolution produit une nouvelle version/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-01[^%]*\d+\s*%/);
});

test('shows the human validation and governed trace of CNS-02 without declaring process maturity or progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  const section = screen
    .getByRole('heading', { name: 'Base d’arbitrage CNS-02 validée comme cadre de travail' })
    .closest('section');
  const decision = within(section);
  expect(decision.getByText('Validation humaine consignée')).toBeInTheDocument();
  expect(decision.getByText(/Cette validation autorise la préparation de l’inventaire détaillé/)).toBeInTheDocument();
  expect(decision.getByText(/Aucun pourcentage à ce stade\. La mesure reste indisponible tant que l’inventaire des processus critiques/)).toBeInTheDocument();
  expect(decision.getByRole('heading', { name: 'CNS-02-DEC-001 · V1.0' })).toBeInTheDocument();
  expect(decision.getByText('Cadre de travail validé', { selector: 'span' })).toBeInTheDocument();
  expect(decision.getByText(/base candidate publiée par la PR frontend #175/)).toBeInTheDocument();
  expect(decision.getByText(/N’approuve aucune procédure, exception sensible ou modification de responsabilité/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-02[^%]*\d+\s*%/);
});

test('opens each CNS-01 governed source with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Contrôler Gouvernance & équipe/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=institution&section=institution-governance&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-governance-compliance-consolidation-pilot#institution-governance'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir le registre Conformité/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=compliance&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-governance-compliance-consolidation-pilot#compliance-register'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir le journal d’audit/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=audit&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-governance-compliance-consolidation-pilot#administration-audit-title'
  );
});

test('shows CNS-02 processes and procedures without claiming they are already applied', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-02 · Processus et procédures' })).toBeInTheDocument();
  expect(screen.getByText('Prioriser les processus critiques et leur contrôle minimal')).toBeInTheDocument();
  expect(screen.getByText(/Un processus décrit n’est pas nécessairement appliqué/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-02[^%]*\d+\s*%/);
});

test('opens each CNS-02 governed source with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir Processus Administration/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-processes-procedures-consolidation-pilot#process-top'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les contrôles globaux/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/?view=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-processes-procedures-consolidation-pilot#minimum-global-controls'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources processus/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-processes-procedures-consolidation-pilot#administration-resources-title'
  );
});

test('shows CNS-03 data and reference systems without claiming a master source or validated model', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-03 · Données et référentiels' })).toBeInTheDocument();
  expect(screen.getByText('Inventorier référentiels, propriétaires, relations et écarts de vocabulaire')).toBeInTheDocument();
  expect(screen.getByText(/Une donnée disponible n’est pas nécessairement fiable/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-03[^%]*\d+\s*%/);
});

test('records the CNS-03 working framework validation without inventing progress or a master source', () => {
  renderDashboardNavigation({}, '/?view=program');

  const section = screen
    .getByRole('heading', { name: 'Base d’arbitrage CNS-03 validée comme cadre de travail' })
    .closest('section');
  const proposal = within(section);
  expect(proposal.getByText('Validation humaine consignée')).toBeInTheDocument();
  expect(proposal.getByRole('heading', { name: 'Périmètre cible retenu' })).toBeInTheDocument();
  expect(proposal.getByRole('heading', { name: 'Preuves recevables retenues' })).toBeInTheDocument();
  expect(proposal.getByRole('heading', { name: 'Responsabilités retenues' })).toBeInTheDocument();
  expect(proposal.getByRole('heading', { name: 'Principe de calcul retenu' })).toBeInTheDocument();
  expect(proposal.getByRole('heading', { name: 'CNS-03-DEC-001 · V1.0' })).toBeInTheDocument();
  expect(proposal.getByText('Cadre de travail validé', { selector: 'span' })).toBeInTheDocument();
  expect(proposal.getByText(/PR frontend #177/)).toBeInTheDocument();
  expect(proposal.getByText(/Ne désigne aucune source maîtresse/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-03[^%]*\d+\s*%/);
});

test('shows the CNS-03 initial inventory with eleven controlled families and no promoted master source', () => {
  renderDashboardNavigation({}, '/?view=program');

  const inventorySection = screen
    .getByRole('heading', { name: 'Onze familles de référentiels à consolider' })
    .closest('section');
  const inventory = within(inventorySection);
  expect(inventory.getByText('INVENTAIRE INITIAL · V0.1 · 25-08-2026')).toBeInTheDocument();
  expect(inventory.getByText('Familles cadrées')).toBeInTheDocument();
  expect(inventory.getByText('Sources maîtresses désignées')).toBeInTheDocument();
  expect(inventory.getByText('Contrôles ouverts')).toBeInTheDocument();
  expect(inventory.getAllByText('REF-01')).toHaveLength(2);
  expect(inventory.getAllByText('REF-11')).toHaveLength(2);
  expect(inventory.getAllByText('Personnes et équipes')).toHaveLength(2);
  expect(inventory.getAllByText('Lieux et actifs')).toHaveLength(2);
  expect(inventory.getAllByText('Support observé').length).toBeGreaterThan(0);
  expect(inventory.getAllByText('Raccordement partiel').length).toBeGreaterThan(0);
  expect(inventory.getAllByText('Sources dispersées').length).toBeGreaterThan(0);
  expect(inventory.getByText(/aucun export complet, schéma sensible/)).toBeInTheDocument();
  expect(inventory.queryByText(/source maîtresse validée/i)).not.toBeInTheDocument();
  expect(inventorySection.textContent).not.toMatch(/\d+\s*%/);
});

test('translates the CNS-03 initial inventory in English and German', () => {
  const { rerender } = renderDashboardNavigation({ language: 'EN' }, '/?view=program');
  expect(screen.getByRole('heading', { name: 'Eleven reference-system families to consolidate' })).toBeInTheDocument();
  expect(screen.getAllByText('Designated master sources').length).toBeGreaterThan(0);
  expect(screen.getAllByText('People and teams')).toHaveLength(2);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Elf zu konsolidierende Referenzsystem-Familien' })).toBeInTheDocument();
  expect(screen.getByText('Bezeichnete Masterquellen')).toBeInTheDocument();
  expect(screen.getAllByText('Personen und Teams')).toHaveLength(2);
});

test('frames REF-01 people and teams without exposing RH-001 records or promoting a master source', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  const section = screen
    .getByRole('heading', { name: 'REF-01 · Personnes et équipes' })
    .closest('section');
  const control = within(section);
  expect(control.getByText('CONTROLE DETAILLE 1/11 · REF-01 · V1.25 · 27-08-2026')).toBeInTheDocument();
  expect(control.getByText('Axes contrôlés')).toBeInTheDocument();
  expect(control.getByText('Événements de cycle validés')).toBeInTheDocument();
  expect(control.getByText('Données personnelles publiées')).toBeInTheDocument();
  expect(control.getByText('Sources maîtresses retenues dans REF-01')).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Modèle logique validé à quatre objets' })).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'REF-01-DEC-001 · V1.0' })).toBeInTheDocument();
  expect(control.getByText('Cadre REF-01 validé')).toBeInTheDocument();
  expect(control.getByText(/Organisation & RH est propriétaire métier/)).toBeInTheDocument();
  expect(control.getByText(/Ses détails sont proposés séparément dans REF-01 V0.3/)).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Cycle de vie validé' })).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'REF-01-DEC-002 · V1.0' })).toBeInTheDocument();
  expect(control.getByText('Cycle REF-01 validé')).toBeInTheDocument();
  expect(control.getByText(/Les six familles d’événements, les douze métadonnées minimales/)).toBeInTheDocument();
  expect(control.getByText(/proposition REF-01 V0.3 publiée par la PR frontend #183/)).toBeInTheDocument();
  expect(control.getAllByText('Enregistrer / créer')).toHaveLength(4);
  expect(control.getAllByText('Transférer')).toHaveLength(4);
  expect(control.getAllByText('Clôturer / archiver')).toHaveLength(4);
  expect(control.getByRole('heading', { name: 'Trace minimale validée pour chaque événement' })).toBeInTheDocument();
  expect(control.getAllByText('Date d’effet').length).toBeGreaterThan(0);
  expect(control.getAllByText('Référence de preuve GED').length).toBeGreaterThan(0);
  expect(control.getByRole('heading', { name: 'Familles de motifs validées' })).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Séparation des responsabilités validée' })).toBeInTheDocument();
  expect(control.getByText(/Aucun événement réel, schéma, source maîtresse, automatisation ou taux de progression/)).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Comparer les supports sans les promouvoir' })).toBeInTheDocument();
  expect(control.getAllByText('API RH-001 · /members-directory').length).toBeGreaterThan(0);
  expect(control.getAllByText('Annuaire interne sécurisé').length).toBeGreaterThan(0);
  expect(control.getAllByText('Sélecteurs partagés Team/Agent').length).toBeGreaterThan(0);
  expect(control.getAllByText('GED · preuves RH autorisées').length).toBeGreaterThan(0);
  expect(control.getByText('Sources maîtresses désignées')).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Sept critères avant toute désignation de source maîtresse' })).toBeInTheDocument();
  expect(control.getAllByText('Critères de décision validés', { selector: 'span' })).toHaveLength(2);
  expect(control.getByRole('heading', { name: 'REF-01-DEC-003 · V1.0' })).toBeInTheDocument();
  expect(control.getByText(/Les sept critères sont retenus comme prérequis obligatoires/)).toBeInTheDocument();
  expect(control.getByText(/comparatif préparatoire REF-01 V0.5 publié par la PR frontend #185/)).toBeInTheDocument();
  expect(control.getByText(/ne désigne ni ne valide aucun support candidat ou source maîtresse/)).toBeInTheDocument();
  const evidenceMatrix = control.getByRole('heading', { name: 'Contrôler chaque support selon les sept critères validés' }).closest('section');
  expect(evidenceMatrix).toHaveAttribute('data-control-count', '28');
  expect(within(evidenceMatrix).getByText('Contrôles descriptifs')).toBeInTheDocument();
  expect(within(evidenceMatrix).getAllByTestId('ref01-evidence-row')).toHaveLength(28);
  expect(within(evidenceMatrix).getAllByText('Identifiant stable').length).toBeGreaterThan(0);
  expect(within(evidenceMatrix).getAllByText('Preuve à établir').length).toBeGreaterThan(0);
  expect(within(evidenceMatrix).getAllByText(/La valeur opérationnelle n’est pas encore fondée sur l’identifiant stable RH-001/).length).toBeGreaterThan(0);
  const evidenceReview = control.getByRole('heading', { name: 'Ouvrir un premier lot de preuves sans promouvoir de source' }).closest('section');
  expect(within(evidenceReview).getByText('Preuves autorisées maintenant')).toBeInTheDocument();
  expect(within(evidenceReview).getByText('Constats différés')).toBeInTheDocument();
  expect(within(evidenceReview).getByText('Décisions enregistrées')).toBeInTheDocument();
  expect(within(evidenceReview).getAllByTestId('ref01-review-row')).toHaveLength(12);
  expect(within(evidenceReview).getByRole('heading', { name: 'Lot candidat A · Preuves structurantes' })).toBeInTheDocument();
  expect(within(evidenceReview).getByRole('heading', { name: 'Seize constats maintenus pour une deuxième lecture' })).toBeInTheDocument();
  expect(within(evidenceReview).getByRole('heading', { name: 'Résultat de l’arbitrage humain' })).toBeInTheDocument();
  expect(within(evidenceReview).getByRole('heading', { name: 'REF-01-DEC-004 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceReview).getByText(/Décisions enregistrées : 1/)).toBeInTheDocument();
  const evidenceResults = control.getByRole('heading', { name: 'Distinguer les preuves observées, partielles et non observées' }).closest('section');
  expect(within(evidenceResults).getByText('Preuve observée')).toBeInTheDocument();
  expect(within(evidenceResults).getByText('Preuves partielles')).toBeInTheDocument();
  expect(within(evidenceResults).getByText('Non observées')).toBeInTheDocument();
  expect(within(evidenceResults).getAllByTestId('ref01-evidence-result-row')).toHaveLength(12);
  expect(within(evidenceResults).getByRole('heading', { name: 'REF-01-DEC-005 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceResults).getByText('Qualifications descriptives confirmées')).toBeInTheDocument();
  expect(within(evidenceResults).getByText(/1 preuve observée ; 5 partielles ; 6 non observées/)).toBeInTheDocument();
  const priorities = control.getByRole('heading', { name: 'Traiter les dépendances avant les raccordements' }).closest('section');
  expect(within(priorities).getByText('Écarts ordonnés')).toBeInTheDocument();
  expect(within(priorities).getAllByTestId('ref01-priority-row')).toHaveLength(4);
  expect(within(priorities).getByRole('heading', { name: 'Spécifier la trace d’événement RH-001' })).toBeInTheDocument();
  expect(within(priorities).getByRole('heading', { name: 'REF-01-DEC-006 · V1.0' })).toBeInTheDocument();
  expect(within(priorities).getByText('Ordre des quatre vagues validé')).toBeInTheDocument();
  expect(within(priorities).getAllByText(/A-01 · A-06 · A-07/)).toHaveLength(2);
  expect(within(priorities).getAllByText(/A-04 · A-09 · A-10 · A-12/)).toHaveLength(2);
  expect(within(priorities).getByText(/prépare son contrat fonctionnel vérifiable avant toute décision d’implémentation/)).toBeInTheDocument();
  const eventContract = control.getByRole('heading', { name: 'Rendre chaque changement daté, explicable et non destructif' }).closest('section');
  expect(within(eventContract).getByText('Convention de référence : ML signifie micro-lot.')).toBeInTheDocument();
  expect(within(eventContract).getAllByTestId('ref01-event-row')).toHaveLength(6);
  expect(within(eventContract).getAllByTestId('ref01-metadata-field')).toHaveLength(12);
  expect(within(eventContract).getAllByTestId('ref01-acceptance-criterion')).toHaveLength(8);
  expect(within(eventContract).getByText('Événements enregistrés')).toBeInTheDocument();
  expect(within(eventContract).getByText('0')).toBeInTheDocument();
  expect(within(eventContract).getByRole('heading', { name: 'REF-01-DEC-007 · V1.0' })).toBeInTheDocument();
  expect(within(eventContract).getByText('Contrat fonctionnel confirmé')).toBeInTheDocument();
  expect(within(eventContract).getByText(/six transitions, douze métadonnées minimales, quatre rôles de contrôle et huit critères d’acceptation/)).toBeInTheDocument();
  const technicalFraming = control.getByRole('heading', { name: 'Traduire la base fonctionnelle sans modifier le système réel' }).closest('section');
  expect(within(technicalFraming).getByRole('heading', { name: 'REF-01-DEC-008 · V1.0' })).toBeInTheDocument();
  expect(within(technicalFraming).getByText('Préparation du cadrage autorisée')).toBeInTheDocument();
  expect(within(technicalFraming).getByRole('heading', { name: 'REF-01-DEC-009 · V1.0' })).toBeInTheDocument();
  expect(within(technicalFraming).getByText('Cadrage candidat confirmé')).toBeInTheDocument();
  expect(within(technicalFraming).getAllByTestId('ref01-technical-layer')).toHaveLength(5);
  expect(within(technicalFraming).getAllByTestId('ref01-technical-mapping-row')).toHaveLength(12);
  expect(within(technicalFraming).getAllByTestId('ref01-technical-interface')).toHaveLength(4);
  expect(within(technicalFraming).getAllByTestId('ref01-technical-control')).toHaveLength(8);
  expect(within(technicalFraming).getAllByTestId('ref01-technical-exit')).toHaveLength(8);
  expect(within(technicalFraming).getByText('Modifications techniques')).toBeInTheDocument();
  expect(within(technicalFraming).getByText('Aucun changement appliqué')).toBeInTheDocument();
  const implementationProposal = within(technicalFraming).getByRole('heading', { name: 'Passer du cadrage confirmé à une exécution contrôlable' }).closest('section');
  expect(within(implementationProposal).getByRole('heading', { name: 'REF-01-DEC-010 · V1.0' })).toBeInTheDocument();
  expect(within(implementationProposal).getByText('Préparation de la proposition autorisée')).toBeInTheDocument();
  expect(within(implementationProposal).getByRole('heading', { name: 'REF-01-DEC-011 · V1.0' })).toBeInTheDocument();
  expect(within(implementationProposal).getByText('Proposition confirmée')).toBeInTheDocument();
  expect(within(implementationProposal).getAllByTestId('ref01-implementation-baseline')).toHaveLength(4);
  expect(within(implementationProposal).getAllByTestId('ref01-implementation-package')).toHaveLength(6);
  expect(within(implementationProposal).getAllByTestId('ref01-implementation-gate')).toHaveLength(4);
  expect(within(implementationProposal).getAllByTestId('ref01-implementation-test')).toHaveLength(10);
  expect(within(implementationProposal).getAllByTestId('ref01-implementation-rollout')).toHaveLength(4);
  expect(within(implementationProposal).getByText('ORIENTATION CONFIRMEE POUR L0')).toBeInTheDocument();
  expect(within(implementationProposal).getByText(/PostgreSQL pour le journal, les versions, les périodes et l’outbox/)).toBeInTheDocument();
  const architectureDecision = within(implementationProposal).getByRole('heading', { name: 'Décider où écrire, lire et conserver avant tout code' }).closest('section');
  expect(within(architectureDecision).getByText('REF-01-ADR-001 · V1.0 · 26-08-2026', { exact: false })).toBeInTheDocument();
  expect(within(architectureDecision).getAllByTestId('ref01-adr-option')).toHaveLength(3);
  expect(within(architectureDecision).getAllByTestId('ref01-adr-driver')).toHaveLength(6);
  expect(within(architectureDecision).getAllByTestId('ref01-adr-role')).toHaveLength(4);
  expect(within(architectureDecision).getAllByTestId('ref01-adr-gate')).toHaveLength(8);
  expect(within(architectureDecision).getByText('CONFIRMEE · G0 CLOTUREE')).toBeInTheDocument();
  expect(within(architectureDecision).getByRole('heading', { name: 'REF-01-DEC-012 · V1.0' })).toBeInTheDocument();
  expect(within(architectureDecision).getByText('Architecture et responsabilités confirmées')).toBeInTheDocument();
  const dataFoundations = screen.getByRole('heading', { name: 'Tester la structure sans toucher aux données réelles' }).closest('section');
  expect(within(dataFoundations).getAllByTestId('ref01-l1-object')).toHaveLength(5);
  expect(within(dataFoundations).getAllByTestId('ref01-l1-check')).toHaveLength(7);
  expect(within(dataFoundations).getAllByTestId('ref01-l1-gate')).toHaveLength(6);
  expect(within(dataFoundations).getByText(/Backend PR #46 fusionnée au commit cf35120/)).toBeInTheDocument();
  expect(within(dataFoundations).getByText(/G1 reste ouverte/)).toBeInTheDocument();
  const gateReview = screen.getByRole('heading', { name: 'Décider G1 sans confondre preuve et recommandation' }).closest('section');
  expect(within(gateReview).getAllByTestId('ref01-g1-condition')).toHaveLength(6);
  expect(within(gateReview).getByText('Partiellement étayées')).toBeInTheDocument();
  expect(within(gateReview).getByText('Décisions enregistrées')).toBeInTheDocument();
  expect(within(gateReview).getByText('ARBITRAGES NECESSAIRES · G1 reste ouverte. Les fondations sont suffisamment documentées pour décider, pas pour déployer.')).toBeInTheDocument();
  const gateArbitration = screen.getByRole('heading', { name: 'Arbitrer les six conditions sans ouvrir L2' }).closest('section');
  expect(within(gateArbitration).getAllByTestId('ref01-g1-arbitration-item')).toHaveLength(6);
  expect(within(gateArbitration).getByText('Garde-fous proposés')).toBeInTheDocument();
  expect(within(gateArbitration).getByText('Ouverture L2 proposée')).toBeInTheDocument();
  expect(within(gateArbitration).getByText('VALIDER LES CINQ GARDE-FOUS COMME PRINCIPES, AMENDER LE PREMIER AVANT CONFIRMATION ET MAINTENIR L2 FERME. Cette recommandation ne ferme pas G1.')).toBeInTheDocument();
  const gateDecision = screen.getByRole('heading', { name: 'Confirmer quatre principes, amender PostgreSQL et maintenir L2 fermé' }).closest('section');
  expect(within(gateDecision).getAllByTestId('ref01-g1-decision-outcome')).toHaveLength(6);
  expect(within(gateDecision).getAllByTestId('ref01-g1-amendment-requirement')).toHaveLength(7);
  expect(within(gateDecision).getByRole('heading', { name: 'REF-01-DEC-013 · V1.0' })).toBeInTheDocument();
  expect(within(gateDecision).getByText('Arbitrage G1 partiel confirmé')).toBeInTheDocument();
  expect(within(gateDecision).getByText('STATUT · Quatre principes confirmés, un point amendé, G1 ouverte et L2 fermé.')).toBeInTheDocument();
  const evidenceSheet = screen.getByRole('heading', { name: 'Encadrer les sept preuves sans choisir de service' }).closest('section');
  expect(within(evidenceSheet).getAllByTestId('ref01-g1-evidence-item')).toHaveLength(7);
  expect(within(evidenceSheet).getAllByTestId('ref01-g1-evidence-metadata')).toHaveLength(10);
  expect(within(evidenceSheet).getByText('FICHE CONFIRMEE · Sept exigences gouvernées, zéro preuve reçue, zéro fournisseur retenu et L2 fermé.')).toBeInTheDocument();
  expect(within(evidenceSheet).getByRole('heading', { name: 'Porte de confirmation du point 1' })).toBeInTheDocument();
  const evidenceConfirmation = screen.getByRole('heading', { name: 'Confirmer la fiche sans inventer un amendement non précisé' }).closest('section');
  expect(within(evidenceConfirmation).getByRole('heading', { name: 'REF-01-DEC-014 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceConfirmation).getByText('Fiche confirmée · amendement non spécifié')).toBeInTheDocument();
  expect(within(evidenceConfirmation).getByText(/Aucun amendement textuel n’est appliqué/)).toBeInTheDocument();
  const collectionPack = screen.getByRole('heading', { name: 'Encadrer la collecte contrôlée sans démarrer la consultation' }).closest('section');
  expect(within(collectionPack).getAllByTestId('ref01-g1-collection-slot')).toHaveLength(7);
  expect(within(collectionPack).getAllByTestId('ref01-g1-collection-step')).toHaveLength(5);
  expect(within(collectionPack).getAllByTestId('ref01-g1-collection-refusal')).toHaveLength(5);
  expect(within(collectionPack).getByText('PAQUET CONFIRMÉ · Sept emplacements gouvernés, zéro collecte, zéro destinataire nommé et zéro fournisseur retenu.')).toBeInTheDocument();
  const collectionConfirmation = screen.getByRole('heading', { name: 'Gouverner le périmètre, les canaux et les responsabilités' }).closest('section');
  expect(within(collectionConfirmation).getByRole('heading', { name: 'REF-01-DEC-015 · V1.0' })).toBeInTheDocument();
  expect(within(collectionConfirmation).getByText('Périmètre, canaux et responsabilités confirmés')).toBeInTheDocument();
  expect(within(collectionConfirmation).getByText(/Aucun amendement textuel n’est déduit/)).toBeInTheDocument();
  const requestCandidate = screen.getByRole('heading', { name: 'Structurer les demandes confirmées sans contacter un destinataire' }).closest('section');
  expect(within(requestCandidate).getAllByTestId('ref01-g1-request-package')).toHaveLength(4);
  expect(within(requestCandidate).getAllByTestId('ref01-g1-request-preflight')).toHaveLength(6);
  expect(within(requestCandidate).getAllByText('CONTENU CONFIRMÉ · ENVOI INTERDIT')).toHaveLength(4);
  const requestConfirmation = screen.getByRole('heading', { name: 'Confirmer le contenu sans autoriser le contact' }).closest('section');
  expect(within(requestConfirmation).getByRole('heading', { name: 'REF-01-DEC-016 · V1.0' })).toBeInTheDocument();
  expect(within(requestConfirmation).getByText('Contenu et contrôles de REQ-001 confirmés')).toBeInTheDocument();
  const recipientCandidate = screen.getByRole('heading', { name: 'Gouverner les profils sans inscrire de nom réel' }).closest('section');
  expect(within(recipientCandidate).getAllByTestId('ref01-g1-recipient-profile')).toHaveLength(4);
  expect(within(recipientCandidate).getAllByTestId('ref01-g1-recipient-check')).toHaveLength(6);
  expect(within(recipientCandidate).getAllByText('PROFIL CONFIRMÉ · AUCUN NOM')).toHaveLength(4);
  const recipientConfirmation = screen.getByRole('heading', { name: 'Confirmer les profils sans autoriser une identité' }).closest('section');
  expect(within(recipientConfirmation).getByRole('heading', { name: 'REF-01-DEC-017 · V1.0' })).toBeInTheDocument();
  expect(within(recipientConfirmation).getByText('Profils et contrôles de REC-001 confirmés')).toBeInTheDocument();
  const namedRecipientCandidate = screen.getByRole('heading', { name: 'Gouverner les emplacements sans enregistrer d’identité' }).closest('section');
  expect(within(namedRecipientCandidate).getAllByTestId('ref01-g1-named-recipient-slot')).toHaveLength(4);
  expect(within(namedRecipientCandidate).getAllByTestId('ref01-g1-named-recipient-check')).toHaveLength(6);
  expect(within(namedRecipientCandidate).getAllByText('EMPLACEMENT CONFIRMÉ · VIDE')).toHaveLength(4);
  const namedRecipientConfirmation = screen.getByRole('heading', { name: 'Confirmer le cadre sans inscrire de nom' }).closest('section');
  expect(within(namedRecipientConfirmation).getByRole('heading', { name: 'REF-01-DEC-018 · V1.0' })).toBeInTheDocument();
  expect(within(namedRecipientConfirmation).getByText('Cadre et contrôles de NAM-001 confirmés')).toBeInTheDocument();
  const namedAuthorisationCandidate = screen.getByRole('heading', { name: 'Gouverner chaque future autorisation séparément' }).closest('section');
  expect(within(namedAuthorisationCandidate).getAllByTestId('ref01-g1-named-authorisation-file')).toHaveLength(4);
  expect(within(namedAuthorisationCandidate).getAllByTestId('ref01-g1-named-authorisation-check')).toHaveLength(6);
  expect(within(namedAuthorisationCandidate).getAllByText('DOSSIER CONFIRMÉ · VIDE')).toHaveLength(4);
  const authorisationConfirmation = screen.getByRole('heading', { name: 'Confirmer le registre sans autoriser une identité' }).closest('section');
  expect(within(authorisationConfirmation).getByRole('heading', { name: 'REF-01-DEC-019 · V1.0' })).toBeInTheDocument();
  expect(within(authorisationConfirmation).getByText('Registre et contrôles de AUT-001 confirmés')).toBeInTheDocument();
  const identityRecord = screen.getByRole('heading', { name: 'Documenter une seule identité sans l’autoriser' }).closest('section');
  expect(within(identityRecord).getAllByTestId('ref01-g1-identity-record-group')).toHaveLength(4);
  expect(within(identityRecord).getAllByTestId('ref01-g1-identity-record-field')).toHaveLength(12);
  expect(within(identityRecord).getByText('GABARIT CONFIRMÉ ET VIDE · AUCUN DOSSIER AUT PRIORISÉ · AUCUNE IDENTITÉ')).toBeInTheDocument();
  const identityConfirmation = screen.getByRole('heading', { name: 'Confirmer le gabarit sans inscrire une identité' }).closest('section');
  expect(within(identityConfirmation).getByRole('heading', { name: 'REF-01-DEC-020 · V1.0' })).toBeInTheDocument();
  expect(within(identityConfirmation).getByText('Gabarit IDN-001 confirmé et maintenu vide')).toBeInTheDocument();
  const priorityCandidate = screen.getByRole('heading', { name: 'Choisir le premier dossier sans choisir une identité' }).closest('section');
  expect(within(priorityCandidate).getAllByTestId('ref01-g1-aut-priority-option')).toHaveLength(4);
  expect(within(priorityCandidate).getByText('0/4')).toBeInTheDocument();
  expect(within(priorityCandidate).getByText(/REF-01-DEC-023 confirme WAV-001 V1.0/)).toBeInTheDocument();
  const priorityConfirmation = screen.getByRole('heading', { name: 'Confirmer la méthode sans choisir un dossier' }).closest('section');
  expect(within(priorityConfirmation).getByRole('heading', { name: 'REF-01-DEC-021 · V1.0' })).toBeInTheDocument();
  expect(within(priorityConfirmation).getByText('Matrice PRI-001 confirmée sans dossier sélectionné')).toBeInTheDocument();
  const selectionCandidate = screen.getByRole('heading', { name: 'Préparer les quatre dossiers dans un lot contrôlé' }).closest('section');
  expect(within(selectionCandidate).getAllByTestId('ref01-g1-aut-selection-option')).toHaveLength(4);
  expect(within(selectionCandidate).getAllByText('INCLUS AU LOT · NON EXÉCUTÉ')).toHaveLength(4);
  expect(within(selectionCandidate).getByText(/4\/4 DOSSIERS INCLUS/)).toBeInTheDocument();
  expect(within(selectionCandidate).getByText(/REF-01-DEC-023 confirme WAV-001 V1.0/)).toBeInTheDocument();
  const batchCandidate = screen.getByRole('heading', { name: 'Accélérer en deux vagues sans fusionner les contrôles' }).closest('section');
  expect(within(batchCandidate).getAllByTestId('ref01-g1-aut-batch-lane')).toHaveLength(4);
  expect(within(batchCandidate).getAllByText('Vague 1')).toHaveLength(3);
  expect(within(batchCandidate).getByText('Vague 2')).toBeInTheDocument();
  expect(within(batchCandidate).getByText(/AUT-D ne peut pas conclure avant la disponibilité des sorties A, B et C/)).toBeInTheDocument();
  const codeLegend = screen.getByRole('heading', { name: 'Comprendre les sigles sans quitter le dossier' }).closest('section');
  expect(within(codeLegend).getAllByTestId('ref01-code-group')).toHaveLength(4);
  expect(within(codeLegend).getByText('Batch ou lot de traitement')).toBeInTheDocument();
  expect(within(codeLegend).getByText(/IDN. IDE n’est pas utilisé/)).toBeInTheDocument();
  const batchConfirmation = screen.getByRole('heading', { name: 'Confirmer ensemble la sélection et les deux vagues' }).closest('section');
  expect(within(batchConfirmation).getByRole('heading', { name: 'REF-01-DEC-022 · V1.0' })).toBeInTheDocument();
  expect(within(batchConfirmation).getByText('SEL-001 et BAT-001 confirmés pour préparation documentaire')).toBeInTheDocument();
  const waveOne = screen.getByRole('heading', { name: 'Préparer trois dossiers en parallèle dans leurs limites confirmées' }).closest('section');
  expect(within(waveOne).getAllByTestId('ref01-g1-aut-wave-one-track')).toHaveLength(3);
  expect(within(waveOne).getByText(/AUTORISÉ · Sources officielles publiques/)).toBeInTheDocument();
  expect(within(waveOne).getByText(/AUTORISÉ · Données synthétiques isolées/)).toBeInTheDocument();
  expect(within(waveOne).getByText(/AUTORISÉ · Profil sans identité réelle/)).toBeInTheDocument();
  const waveOneConfirmation = screen.getByRole('heading', { name: 'Ouvrir trois travaux bornés sans ouvrir les données réelles' }).closest('section');
  expect(within(waveOneConfirmation).getByRole('heading', { name: 'REF-01-DEC-023 · V1.0' })).toBeInTheDocument();
  expect(within(waveOneConfirmation).getByText('WAV-001 confirmée et vague 1 ouverte dans un périmètre borné')).toBeInTheDocument();
  const waveOneResults = screen.getByRole('heading', { name: 'Produire les preuves autorisées et arrêter une incohérence avant qu’elle ne se propage' }).closest('section');
  expect(within(waveOneResults).getAllByTestId('ref01-aut-a-source')).toHaveLength(10);
  expect(within(waveOneResults).getAllByTestId('ref01-aut-b-check')).toHaveLength(7);
  expect(within(waveOneResults).getByText(/restaurer AUT-C « Coûts et capacité » et AUT-D « Gouvernance interne »/)).toBeInTheDocument();
  expect(within(waveOneResults).getByText(/Aucun RPO ou RTO mesuré/)).toBeInTheDocument();
  expect(control.getByText(/décisions sur le lot : 20/)).toBeInTheDocument();
  expect(control.getByText(/sources maîtresses désignées : 0/)).toBeInTheDocument();
  expect(control.getAllByText('Responsabilité collective').length).toBeGreaterThan(0);
  expect(control.getByText(/ce lot ne valide ni identité civile/)).toBeInTheDocument();
  expect(section.textContent).not.toMatch(/Chantal|Gnilane|Ibrahima|Papa/);
  expect(section.textContent).not.toMatch(/\d+\s*%/);

  fireEvent.click(control.getByRole('button', { name: /Ouvrir l’annuaire sécurisé/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=directory&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-ref01-people-teams-control#members-directory-title'
  );
  fireEvent.click(control.getByRole('button', { name: /Examiner l’architecture RH de REF-01/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-ref01-people-teams-control#rh-architecture-title'
  );
});

test('translates the REF-01 people and teams control in English and German', () => {
  const { rerender } = renderDashboardNavigation({ language: 'EN' }, '/?view=program');
  expect(screen.getByRole('heading', { name: 'REF-01 · People and teams' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validated four-object logical model' })).toBeInTheDocument();
  expect(screen.getByText('REF-01 framework validated')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validated lifecycle' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validated minimum trace for each event' })).toBeInTheDocument();
  expect(screen.getByText('REF-01 lifecycle validated')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Compare supports without promoting them' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Seven criteria before any master-source designation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Review each support against the seven validated criteria' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Open an initial evidence package without promoting a source' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Candidate package A · Foundational evidence' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Separate observed, partial and unobserved evidence' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Descriptive qualifications confirmed')).toBeInTheDocument();
  expect(screen.getByText(/1 observed; 5 partial; 6 unobserved/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Address dependencies before connections' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Specify the RH-001 event trace' })).toBeInTheDocument();
  expect(screen.getByText('Four-wave order validated')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Make every change dated, explainable and non-destructive' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirmed functional transitions' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Functional contract confirmed')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Translate the functional baseline without changing the real system' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Framing preparation authorised')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Candidate framing confirmed')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Five candidate technical layers' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Move from confirmed framing to controllable execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-010 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Proposal preparation authorised')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-011 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Proposal confirmed')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Six proposed implementation packages' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Four decision gates' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Decide where to write, read and retain before any code' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Three compared options' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-012 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Architecture and responsibilities confirmed')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Test the structure without touching real data' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'G1 still requires a decision' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Decide G1 without confusing evidence and recommendation' })).toBeInTheDocument();
  expect(screen.getByText('DECISIONS REQUIRED · G1 remains open. Foundations are documented enough to decide, not to deploy.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Decide the six conditions without opening L2' })).toBeInTheDocument();
  expect(screen.getByText('APPROVE THE FIVE SAFEGUARDS AS PRINCIPLES, AMEND THE FIRST BEFORE CONFIRMATION AND KEEP L2 CLOSED. This recommendation does not close G1.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm four principles, amend PostgreSQL and keep L2 closed' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-013 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Partial G1 decision confirmed')).toBeInTheDocument();
  expect(screen.getByText('STATUS · Four principles confirmed, one point amended, G1 open and L2 closed.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern the seven evidence items without selecting a service' })).toBeInTheDocument();
  expect(screen.getByText('SHEET CONFIRMED · Seven governed requirements, zero evidence received, zero selected providers and L2 closed.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the sheet without inventing an unspecified amendment' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-014 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Sheet confirmed · amendment unspecified')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern controlled collection without starting consultation' })).toBeInTheDocument();
  expect(screen.getByText('PACKAGE CONFIRMED · Seven governed slots, zero collection, zero named recipients and zero selected providers.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern scope, channels and responsibilities' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-015 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Scope, channels and responsibilities confirmed')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Structure confirmed requests without contacting a recipient' })).toBeInTheDocument();
  expect(screen.getAllByText('CONTENT CONFIRMED · SEND FORBIDDEN')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Confirm content without authorising contact' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-016 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern recipient profiles without recording a real name' })).toBeInTheDocument();
  expect(screen.getAllByText('CONFIRMED PROFILE · NO NAME')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Confirm profiles without authorising an identity' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-017 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern slots without recording an identity' })).toBeInTheDocument();
  expect(screen.getAllByText('CONFIRMED SLOT · EMPTY')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Confirm the framework without recording a name' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-018 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern every future authorisation separately' })).toBeInTheDocument();
  expect(screen.getAllByText('CONFIRMED FILE · EMPTY')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Confirm the register without authorising an identity' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-019 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Document one identity without authorising it' })).toBeInTheDocument();
  expect(screen.getByText('CONFIRMED EMPTY TEMPLATE · NO AUT FILE PRIORITISED · NO IDENTITY')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the template without recording an identity' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-020 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Choose the first file without choosing an identity' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the method without choosing a file' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-021 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare all four files as one controlled package' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Accelerate in two waves without merging controls' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Understand the codes without leaving the file' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the selection and two waves together' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-022 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare three files in parallel within their confirmed limits' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Open three bounded work tracks without opening real data' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-023 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Produce authorised evidence and stop an inconsistency before it spreads' })).toBeInTheDocument();
  expect(screen.getAllByTestId('ref01-aut-a-source')).toHaveLength(10);
  expect(screen.getAllByTestId('ref01-aut-b-check')).toHaveLength(7);
  expect(screen.getByText(/Recorded decisions: 1/)).toBeInTheDocument();
  expect(screen.getByText('Descriptive controls')).toBeInTheDocument();
  expect(screen.getAllByText('Evidence to establish').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Decision criteria validated').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText(/One decision is required/).length).toBeGreaterThan(0);
  expect(screen.getAllByText('Transfer')).toHaveLength(4);
  expect(screen.getAllByText('Collective responsibility').length).toBeGreaterThan(0);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'REF-01 · Personen und Teams' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validiertes logisches Vier-Objekt-Modell' })).toBeInTheDocument();
  expect(screen.getByText('REF-01-Arbeitsrahmen validiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validierter Lebenszyklus' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validierte Mindestspur für jedes Ereignis' })).toBeInTheDocument();
  expect(screen.getByText('REF-01-Lebenszyklus validiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Träger vergleichen, ohne sie zu fördern' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sieben Kriterien vor jeder Bestimmung einer Masterquelle' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Jeden Träger anhand der sieben validierten Kriterien prüfen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ein erstes Nachweispaket öffnen, ohne eine Quelle zu fördern' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Kandidatenpaket A · Strukturierende Nachweise' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beobachtete, teilweise und nicht beobachtete Nachweise trennen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Beschreibende Qualifizierungen bestätigt')).toBeInTheDocument();
  expect(screen.getByText(/1 beobachtet; 5 teilweise; 6 nicht beobachtet/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Abhängigkeiten vor Verbindungen behandeln' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'RH-001-Ereignisspur spezifizieren' })).toBeInTheDocument();
  expect(screen.getByText('Reihenfolge der vier Wellen validiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Jede Änderung datiert, erklärbar und nicht destruktiv machen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigte funktionale Übergänge' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Funktionaler Vertrag bestätigt')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die funktionale Basis übersetzen, ohne das reale System zu ändern' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Vorbereitung der Ausgestaltung autorisiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Kandidatenausgestaltung bestätigt')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Von der bestätigten Ausgestaltung zu kontrollierbarer Ausführung' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-010 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Vorbereitung des Vorschlags autorisiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-011 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Vorschlag bestätigt')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sechs vorgeschlagene Umsetzungslose' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vier Entscheidpunkte' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vor jedem Code entscheiden, wo geschrieben, gelesen und bewahrt wird' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Drei verglichene Optionen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-012 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Architektur und Verantwortungen bestätigt')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Struktur prüfen, ohne reale Daten zu berühren' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'G1 benötigt weiterhin einen Entscheid' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'G1 entscheiden, ohne Nachweis und Empfehlung zu verwechseln' })).toBeInTheDocument();
  expect(screen.getByText('ENTSCHEIDE ERFORDERLICH · G1 bleibt offen. Die Grundlagen reichen zum Entscheiden, nicht zum Bereitstellen.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die sechs Bedingungen entscheiden, ohne L2 zu öffnen' })).toBeInTheDocument();
  expect(screen.getByText('DIE FÜNF LEITPLANKEN ALS PRINZIPIEN GENEHMIGEN, DIE ERSTE VOR BESTÄTIGUNG ÄNDERN UND L2 GESCHLOSSEN HALTEN. Diese Empfehlung schließt G1 nicht.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vier Prinzipien bestätigen, PostgreSQL ändern und L2 geschlossen halten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-013 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Teilentscheid G1 bestätigt')).toBeInTheDocument();
  expect(screen.getByText('STAND · Vier Prinzipien bestätigt, ein Punkt geändert, G1 offen und L2 geschlossen.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sieben Nachweise steuern, ohne einen Dienst auszuwählen' })).toBeInTheDocument();
  expect(screen.getByText('BLATT BESTÄTIGT · Sieben gesteuerte Anforderungen, null Nachweise, null Anbieter und L2 geschlossen.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Das Blatt bestätigen, ohne eine unbestimmte Änderung zu erfinden' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-014 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Blatt bestätigt · Änderung nicht spezifiziert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Kontrollierte Sammlung steuern, ohne die Konsultation zu starten' })).toBeInTheDocument();
  expect(screen.getByText('PAKET BESTÄTIGT · Sieben gesteuerte Stellen, null Sammlung, null benannte Empfänger und null gewählte Anbieter.')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Umfang, Kanäle und Verantwortung steuern' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-015 · V1.0' })).toBeInTheDocument();
  expect(screen.getByText('Umfang, Kanäle und Verantwortung bestätigt')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigte Anfragen ordnen, ohne Empfänger zu kontaktieren' })).toBeInTheDocument();
  expect(screen.getAllByText('INHALT BESTÄTIGT · VERSAND VERBOTEN')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Inhalt bestätigen, ohne Kontakt zu autorisieren' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-016 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Empfängerprofile steuern, ohne einen realen Namen zu erfassen' })).toBeInTheDocument();
  expect(screen.getAllByText('BESTÄTIGTES PROFIL · KEIN NAME')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Profile bestätigen, ohne eine Identität zu autorisieren' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-017 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Stellen steuern, ohne eine Identität zu erfassen' })).toBeInTheDocument();
  expect(screen.getAllByText('BESTÄTIGTE STELLE · LEER')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Den Rahmen bestätigen, ohne einen Namen zu erfassen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-018 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Jede künftige Autorisierung getrennt steuern' })).toBeInTheDocument();
  expect(screen.getAllByText('BESTÄTIGTE AKTE · LEER')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Das Register bestätigen, ohne eine Identität zu autorisieren' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-019 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Eine Identität dokumentieren, ohne sie zu autorisieren' })).toBeInTheDocument();
  expect(screen.getByText('BESTÄTIGTE LEERE VORLAGE · KEINE AUT-AKTE PRIORISIERT · KEINE IDENTITÄT')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Vorlage bestätigen, ohne eine Identität zu erfassen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-020 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die erste Akte wählen, ohne eine Identität zu wählen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Methode bestätigen, ohne eine Akte zu wählen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-021 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Alle vier Akten als ein kontrolliertes Paket vorbereiten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'In zwei Wellen beschleunigen, ohne Kontrollen zu vermischen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Kürzel verstehen, ohne die Akte zu verlassen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Auswahl und zwei Wellen gemeinsam bestätigen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-022 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Drei Akten parallel innerhalb ihrer bestätigten Grenzen vorbereiten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Drei begrenzte Arbeiten öffnen, ohne Echtdaten zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-023 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Autorisierte Nachweise erstellen und eine Inkonsistenz vor der Weitergabe stoppen' })).toBeInTheDocument();
  expect(screen.getAllByTestId('ref01-aut-a-source')).toHaveLength(10);
  expect(screen.getAllByTestId('ref01-aut-b-check')).toHaveLength(7);
  expect(screen.getByText(/Erfasste Entscheide: 1/)).toBeInTheDocument();
  expect(screen.getByText('Beschreibende Kontrollen')).toBeInTheDocument();
  expect(screen.getAllByText('Nachweis zu erstellen').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Entscheidungskriterien validiert').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText(/Ein gemeinsamer Entscheid ist erforderlich/).length).toBeGreaterThan(0);
  expect(screen.getAllByText('Wechseln')).toHaveLength(4);
  expect(screen.getAllByText('Kollektive Verantwortung').length).toBeGreaterThan(0);
});

test('opens each CNS-03 governed source with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir le modèle de données/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/?view=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-data-reference-systems-consolidation-pilot#global-candidate-data-model'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir le glossaire global/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/?view=glossary&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-data-reference-systems-consolidation-pilot#dashboard-kpi-dictionary-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources données/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-data-reference-systems-consolidation-pilot#administration-resources-title'
  );
});

test('shows CNS-04 finance and controls without claiming reconciliation or accounting validation', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-04 · Finances et contrôles' })).toBeInTheDocument();
  expect(screen.getByText('Définir contrôles, périodicité, pièces attendues et traitement CHF/CFA')).toBeInTheDocument();
  expect(screen.getByText(/Le taux courant ne remplace jamais le taux historique appliqué/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-04[^%]*\d+\s*%/);
});

test('opens each CNS-04 governed Finance view with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les contrôles Finance/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/finance?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-finance-controls-consolidation-pilot#finance-process-controls-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’historique FX/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/finance?tab=fx&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-finance-controls-consolidation-pilot#finance-fx'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources Finance/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/finance?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-finance-controls-consolidation-pilot#finances-resources-title'
  );
});

test('shows CNS-05 human resources and capabilities without claiming employment, contract validity or access', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-05 · Ressources humaines et capacités' })).toBeInTheDocument();
  expect(screen.getByText('Définir le dossier RH minimal, les accès, contrats et plans de capacité')).toBeInTheDocument();
  expect(screen.getByText(/Une personne dans l’annuaire n’est pas automatiquement employée/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-05[^%]*\d+\s*%/);
});

test('opens each CNS-05 governed HR view with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’architecture RH/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-human-resources-capabilities-consolidation-pilot#rh-architecture-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les processus RH/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-human-resources-capabilities-consolidation-pilot#rh-process-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’annuaire interne/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=directory&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-human-resources-capabilities-consolidation-pilot#members-directory-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources RH/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/rh?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-human-resources-capabilities-consolidation-pilot#rh-resources-title'
  );
});

test('shows CNS-06 M3S security and continuity without claiming stability, security or resilience', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-06 · M3S, sécurité et continuité' })).toBeInTheDocument();
  expect(screen.getByText('Définir les critères de stabilité, sécurité, continuité et gestion d’incident')).toBeInTheDocument();
  expect(screen.getByText(/Un service accessible n’est pas automatiquement stable/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-06[^%]*\d+\s*%/);
});

test('opens each CNS-06 governed IT view with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');

  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’architecture IT/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-m3s-security-continuity-consolidation-pilot#it-support-architecture-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les processus IT/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-m3s-security-continuity-consolidation-pilot#it-support-process-title'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir l’aide & incidents/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=help-support&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-m3s-security-continuity-consolidation-pilot#it-help-support'
  );
  fireEvent.click(screen.getByRole('button', { name: /Ouvrir les ressources IT/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=resources&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-m3s-security-continuity-consolidation-pilot#it-support-resources-title'
  );
});

test('shows CNS-07 quality and lessons learned without claiming acceptance, quality or closure', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-07 · Qualité et retours d’expérience' })).toBeInTheDocument();
  expect(screen.getByText('Définir la revue, les réserves, la décision de clôture et la capitalisation')).toBeInTheDocument();
  expect(screen.getByText(/Un livrable remis n’est pas automatiquement accepté/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-07[^%]*\d+\s*%/);
});

test('opens each CNS-07 governed review view with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');
  const section = screen.getByRole('heading', { name: 'CNS-07 · Qualité et retours d’expérience' }).closest('section');
  const qualityView = within(section);

  fireEvent.click(qualityView.getByRole('button', { name: /Ouvrir le cycle de reporting/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-quality-lessons-consolidation-pilot#process-reports'
  );
  fireEvent.click(qualityView.getByRole('button', { name: /Ouvrir la revue hebdomadaire/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-quality-lessons-consolidation-pilot#weekly-review-title'
  );
  fireEvent.click(qualityView.getByRole('button', { name: /Ouvrir le journal de planification/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=planning&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-quality-lessons-consolidation-pilot#planning-journal-register'
  );
  fireEvent.click(qualityView.getByRole('button', { name: /Ouvrir le Knowledge Management/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=knowledge&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-quality-lessons-consolidation-pilot'
  );
});

test('shows CNS-08 institutional reporting without inventing progress or approval', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'CNS-08 · Reporting institutionnel' })).toBeInTheDocument();
  expect(screen.getByText('Définir le calendrier, les sources, les contrôles et les décisions du reporting')).toBeInTheDocument();
  expect(screen.getByText(/Un journal n’est pas un rapport validé/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-08[^%]*\d+\s*%/);
});

test('opens each CNS-08 reporting view with the exact programme return context', () => {
  const onNavigate = jest.fn();
  renderDashboardNavigation({ onNavigate }, '/?view=program');
  const section = screen.getByRole('heading', { name: 'CNS-08 · Reporting institutionnel' }).closest('section');
  const reportingView = within(section);

  fireEvent.click(reportingView.getByRole('button', { name: /Ouvrir le cycle de reporting institutionnel/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=processes&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-reporting-consolidation-pilot#process-reports'
  );
  fireEvent.click(reportingView.getByRole('button', { name: /Ouvrir le Daily Intelligence/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/?view=intelligence&returnView=program&returnSection=institutional-reporting-consolidation-pilot'
  );
  fireEvent.click(reportingView.getByRole('button', { name: /Ouvrir le journal de planification/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/administration?tab=planning&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-reporting-consolidation-pilot#planning-journal-register'
  );
  fireEvent.click(reportingView.getByRole('button', { name: /Ouvrir le Knowledge Management/ }));
  expect(onNavigate).toHaveBeenLastCalledWith(
    '/ged?tab=knowledge&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-reporting-consolidation-pilot'
  );
});

test('returns from Daily Intelligence to the CNS-08 programme section', () => {
  renderDashboardNavigation({}, '/?view=intelligence&returnView=program&returnSection=institutional-reporting-consolidation-pilot');

  fireEvent.click(screen.getByRole('button', { name: 'Revenir à CNS-08 · Reporting institutionnel' }));
  expect(mockNavigate).toHaveBeenCalledWith({
    pathname: '/',
    search: '?view=program',
    hash: '#institutional-reporting-consolidation-pilot'
  });
});

test('shows the integrated CNS validation without inventing a ninth domain or global progress', () => {
  renderDashboardNavigation({}, '/?view=program');

  expect(screen.getByRole('heading', { name: 'Validation des CNS-01 à CNS-08 consignée avant toute mesure globale' })).toBeInTheDocument();
  expect(screen.getByText('8 cadres de travail validés')).toBeInTheDocument();
  expect(screen.getByText(/Une absence de preuve reste un écart/)).toBeInTheDocument();
  expect(screen.queryByText(/CNS-09/)).not.toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-01 à CNS-08[^%]*\d+\s*%/);
});

test('opens every CNS section from the integrated review grid', () => {
  const scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  renderDashboardNavigation({}, '/?view=program');

  const review = screen.getByRole('heading', { name: 'Validation des CNS-01 à CNS-08 consignée avant toute mesure globale' }).closest('section');
  const reviewView = within(review);
  const buttons = reviewView.getAllByRole('button', { name: /CNS-0[1-8]/ });
  expect(buttons).toHaveLength(8);

  fireEvent.click(buttons[0]);
  expect(window.location.hash).toBe('#institutional-governance-compliance-consolidation-pilot');
  expect(scrollIntoView).toHaveBeenCalled();

  fireEvent.click(buttons[7]);
  expect(window.location.hash).toBe('#institutional-reporting-consolidation-pilot');
});

test('records the eight validated CNS frameworks without calculating a result', () => {
  renderDashboardNavigation({}, '/?view=program');

  const matrix = screen.getByRole('heading', { name: 'Matrice des cadres validés' }).closest('section');
  const matrixView = within(matrix);
  expect(matrixView.getAllByText('Cadre validé')).toHaveLength(8);
  expect(matrixView.getAllByText('Retenu')).toHaveLength(8);
  expect(matrixView.getAllByText('Retenues')).toHaveLength(8);
  expect(matrixView.getAllByText('Répartition retenue')).toHaveLength(8);
  expect(matrixView.getAllByText('Indisponible')).toHaveLength(8);
  expect(matrixView.getAllByRole('button', { name: /Ouvrir le cadrage CNS-0[1-8]/ })).toHaveLength(8);
  expect(matrix).not.toHaveTextContent(/approuvé|\d+\s*%/i);
});

test('records distinct governed decisions for CNS-04 through CNS-08 with explicit limits', () => {
  renderDashboardNavigation({}, '/?view=program');

  ['04', '05', '06', '07', '08'].forEach(code => {
    expect(screen.getByRole('heading', { name: `CNS-${code}-DEC-001 · V1.0` })).toBeInTheDocument();
  });
  expect(screen.getAllByText('Cadre de travail validé', { selector: 'span' })).toHaveLength(8);
  expect(screen.getByText(/PR frontend #165/)).toBeInTheDocument();
  expect(screen.getByText(/Ne certifie aucune comptabilité/)).toBeInTheDocument();
  expect(screen.getByText(/Ne crée aucune relation de travail/)).toBeInTheDocument();
  expect(screen.getByText(/Ne certifie ni sécurité/)).toBeInTheDocument();
  expect(screen.getByText(/Ne prononce aucune conformité/)).toBeInTheDocument();
  expect(screen.getByText(/N’approuve aucun rapport/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/CNS-0[4-8][^%]*\d+\s*%/);
});

test('translates the CNS decision matrix in English and German', () => {
  const { rerender } = renderDashboardNavigation({ language: 'EN' }, '/?view=program');
  expect(screen.getByRole('heading', { name: 'Validated-framework matrix' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CNS-01 decision baseline validated as a working framework' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CNS-02 decision baseline validated as a working framework' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CNS-03 decision baseline validated as a working framework' })).toBeInTheDocument();
  expect(screen.getAllByText('Governed decision record')).toHaveLength(30);
  expect(screen.getAllByText('Working framework validated', { selector: 'span' })).toHaveLength(8);
  expect(screen.getAllByText('Human validation recorded')).toHaveLength(3);
  expect(screen.getAllByText('Unavailable')).toHaveLength(8);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Matrix der validierten Arbeitsrahmen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-01 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-02 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-03 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getAllByText('Governance-konformer Entscheidnachweis')).toHaveLength(30);
  expect(screen.getAllByText('Arbeitsrahmen validiert', { selector: 'span.rounded-full' })).toHaveLength(8);
  expect(screen.getAllByText('Menschliche Validierung dokumentiert')).toHaveLength(3);
  expect(screen.getAllByText('Nicht verfügbar')).toHaveLength(8);
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
