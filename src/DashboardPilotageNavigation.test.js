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
  expect(screen.getByText('Designated master sources')).toBeInTheDocument();
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
  expect(control.getByText('CONTROLE DETAILLE 1/11 · REF-01 · V0.1 · 25-08-2026')).toBeInTheDocument();
  expect(control.getByText('Axes contrôlés')).toBeInTheDocument();
  expect(control.getByText('Données personnelles publiées')).toBeInTheDocument();
  expect(control.getByText('Sources maîtresses retenues dans REF-01')).toBeInTheDocument();
  expect(control.getByRole('heading', { name: 'Modèle logique candidat à quatre objets' })).toBeInTheDocument();
  expect(control.getAllByText('Responsabilité collective').length).toBeGreaterThan(0);
  expect(control.getByText(/ce lot ne valide ni identité civile/)).toBeInTheDocument();
  expect(section.textContent).not.toMatch(/Cheikh|Chantal|Gnilane|Ibrahima|Papa/);
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
  expect(screen.getByRole('heading', { name: 'Candidate four-object logical model' })).toBeInTheDocument();
  expect(screen.getAllByText('Collective responsibility').length).toBeGreaterThan(0);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'REF-01 · Personen und Teams' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vorgeschlagenes logisches Vier-Objekt-Modell' })).toBeInTheDocument();
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
  expect(screen.getAllByText('Governed decision record')).toHaveLength(8);
  expect(screen.getAllByText('Working framework validated', { selector: 'span' })).toHaveLength(8);
  expect(screen.getAllByText('Human validation recorded')).toHaveLength(3);
  expect(screen.getAllByText('Unavailable')).toHaveLength(8);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Matrix der validierten Arbeitsrahmen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-01 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-02 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-03 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getAllByText('Governance-konformer Entscheidnachweis')).toHaveLength(8);
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
