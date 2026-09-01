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
  expect(screen.getByTestId('institutional-program-design-evidence-inventory')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'PGM-DEC-004 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByTestId('institutional-program-design-evidence-row')).toHaveLength(6);
  expect(screen.getByTestId('institutional-program-design-evidence-search-plan')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'PGM-DEC-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByTestId('institutional-program-design-search-scope')).toHaveLength(6);
  expect(screen.getByText(/Aucun pourcentage n’est affiché/)).toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/\d+\s*%/);
});

test('opens the authorised bounded collection and keeps operational boundaries in the lightweight Fast Track view', () => {
  renderDashboardNavigation({}, '/?view=program&focus=ref01-fasttrack');

  expect(screen.getByRole('heading', { name: 'Collecte probatoire bornée autorisée' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ouvrir le programme complet' })).toHaveAttribute('href', '/?view=program&returnTo=ref01-fasttrack#institutional-ref01-fast-track-governance');
  expect(screen.getByTestId('institutional-fast-track-cockpit')).toBeInTheDocument();
  expect(screen.getByTestId('ref01-fast-track-governance')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-066 · V1.0' })).toBeInTheDocument();
  const qualification = screen.getByTestId('ref01-g1-fast-track-qualification');
  expect(within(qualification).getAllByTestId('ref01-g1-fast-track-package')).toHaveLength(3);
  expect(within(qualification).getAllByTestId('ref01-g1-fast-track-value')).toHaveLength(44);
  expect(within(qualification).getByText('Qualifiées').closest('article')).toHaveTextContent('9');
  expect(within(qualification).getByText('Partielles').closest('article')).toHaveTextContent('8');
  expect(within(qualification).getByText('Ouvertes').closest('article')).toHaveTextContent('5');
  const arbitration = screen.getByTestId('ref01-g1-fast-track-arbitration');
  expect(within(arbitration).getAllByTestId('ref01-g1-fast-track-exception-family')).toHaveLength(5);
  expect(within(arbitration).getByRole('heading', { name: 'REF-01-DEC-067 · V1.0' })).toBeInTheDocument();
  expect(within(arbitration).getByText('Familles confirmées').closest('article')).toHaveTextContent('5');
  expect(within(arbitration).getByText('Valeurs de production actives').closest('article')).toHaveTextContent('0');
  expect(within(arbitration).getByText(/Je confirme REF-01-G1-ARB-002 V0.1 dans son ensemble/)).toBeInTheDocument();
  const collection = screen.getByTestId('ref01-g1-fast-track-evidence-plan');
  expect(within(collection).getAllByTestId('ref01-g1-fast-track-evidence-family')).toHaveLength(5);
  expect(within(collection).getByText('Dossiers autorisés').closest('article')).toHaveTextContent('5/5');
  expect(within(collection).getByText('Décisions enregistrées').closest('article')).toHaveTextContent('2');
  const gapRegister = within(collection).getByTestId('ref01-g1-evidence-gap-register');
  expect(within(gapRegister).getAllByTestId('ref01-g1-evidence-gap')).toHaveLength(13);
  expect(within(gapRegister).getByText('Valeurs partielles').closest('article')).toHaveTextContent('8');
  expect(within(gapRegister).getByText('Valeurs ouvertes').closest('article')).toHaveTextContent('5');
  expect(within(gapRegister).getByText('Pièces reçues').closest('article')).toHaveTextContent('0/13');
  expect(within(gapRegister).getByText('COLLECTE AUTORISÉE')).toBeInTheDocument();
  ['PG-03', 'PG-04', 'PG-05', 'PG-06', 'MIG-03', 'MIG-05', 'MIG-07', 'OUT-02', 'OUT-03', 'OUT-04', 'OUT-05', 'OUT-06', 'OUT-07'].forEach(id => {
    expect(within(gapRegister).getByText(id)).toBeInTheDocument();
  });
  expect(within(collection).getByRole('heading', { name: 'REF-01-DEC-068 · V1.0' })).toBeInTheDocument();
  expect(within(collection).getByText(/Je confirme REF-01-G1-COL-003 V0.1 comme plan documentaire/)).toBeInTheDocument();
  const boundedScope = within(collection).getByTestId('ref01-g1-bounded-collection-scope');
  expect(within(boundedScope).getByRole('heading', { name: 'Périmètre exécutoire de la collecte bornée' })).toBeInTheDocument();
  expect(within(boundedScope).getByRole('heading', { name: 'Arrêt obligatoire et arbitrage distinct' })).toBeInTheDocument();
  expect(within(collection).getByRole('heading', { name: 'REF-01-DEC-078 · V1.0' })).toBeInTheDocument();
  expect(within(collection).getByText(/autorisé la collecte, continue/)).toBeInTheDocument();
  const evidenceInventory = screen.getByTestId('ref01-g1-evidence-inventory');
  expect(within(evidenceInventory).getByRole('heading', { name: 'Inventaire interne des sources probatoires' })).toBeInTheDocument();
  expect(within(evidenceInventory).getAllByTestId('ref01-g1-evidence-inventory-record')).toHaveLength(13);
  expect(within(evidenceInventory).getByText('Sources figées').closest('article')).toHaveTextContent('10/10');
  expect(within(evidenceInventory).getByText('Écarts rapprochés').closest('article')).toHaveTextContent('13/13');
  expect(within(evidenceInventory).getByText('Preuves acceptées').closest('article')).toHaveTextContent('0/13');
  expect(within(evidenceInventory).getByRole('heading', { name: 'REF-01-DEC-079 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText(/Je confirme COL-INV-001 V0.1 comme inventaire interne candidat des sources G1/)).toBeInTheDocument();
  expect(within(evidenceInventory).getByRole('heading', { name: /REF-01-G1-REV-006 V1.0/ })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText('Preuves attendues recevables').closest('div')).toHaveTextContent('0/13');
  expect(within(evidenceInventory).getByRole('heading', { name: 'REF-01-DEC-080 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText(/je confirme REF-01-G1-REV-006 V0.1/)).toBeInTheDocument();
  expect(within(evidenceInventory).getByRole('heading', { name: /REF-01-G1-COL-004 V1.0/ })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText('Nouvelles preuves recevables').closest('div')).toHaveTextContent('0');
  expect(within(evidenceInventory).getByText(/GED-SYNTHETIC-REF-001 reste une fixture synthétique/)).toBeInTheDocument();
  expect(within(evidenceInventory).getByRole('heading', { name: 'REF-01-DEC-081 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText(/Je confirme REF-01-G1-COL-004 V0.1 comme relevé groupé/)).toBeInTheDocument();
  expect(within(evidenceInventory).getByRole('heading', { name: /REF-01-G1-ATT-001 V1.0/ })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText('Déclencheurs de reprise').closest('div')).toHaveTextContent('2');
  expect(within(evidenceInventory).getByRole('heading', { name: 'REF-01-DEC-082 · V1.0' })).toBeInTheDocument();
  expect(within(evidenceInventory).getByText(/Je confirme REF-01-G1-ATT-001 V0.1 comme règle d’attente probatoire gouvernée/)).toBeInTheDocument();
  expect(within(evidenceInventory).getByText(/DEC-082 confirme ATT-001 V1.0/)).toBeInTheDocument();
  ['PG-03', 'PG-04', 'PG-05', 'PG-06', 'MIG-03', 'MIG-05', 'MIG-07', 'OUT-02', 'OUT-03', 'OUT-04', 'OUT-05', 'OUT-06', 'OUT-07'].forEach(id => {
    expect(within(evidenceInventory).getByText(id)).toBeInTheDocument();
  });
  const request = screen.getByTestId('ref01-g1-fast-track-evidence-request');
  expect(within(request).getByText('Dossiers couverts').closest('article')).toHaveTextContent('5/5');
  expect(within(request).getByText('Demandes envoyées').closest('article')).toHaveTextContent('0');
  expect(within(request).getByRole('heading', { name: 'REF-01-DEC-069 · V1.0' })).toBeInTheDocument();
  expect(within(request).getByText(/Je confirme REF-01-G1-REQ-002 V0.1 comme modèle unique/)).toBeInTheDocument();
  const recipientProfiles = screen.getByTestId('ref01-g1-fast-track-recipient-profiles');
  expect(within(recipientProfiles).getAllByTestId('ref01-g1-fast-track-recipient-profile')).toHaveLength(5);
  expect(within(recipientProfiles).getByText('Personnes nommées').closest('article')).toHaveTextContent('0');
  expect(within(recipientProfiles).getByText('Demandes envoyées').closest('article')).toHaveTextContent('0');
  expect(within(recipientProfiles).getByRole('heading', { name: 'REF-01-DEC-070 · V1.0' })).toBeInTheDocument();
  expect(within(recipientProfiles).getByText(/REF-01-G1-REC-002 V0.1 est confirmé sans amendement/)).toBeInTheDocument();
  const namedSlots = screen.getByTestId('ref01-g1-fast-track-named-recipient-slots');
  expect(within(namedSlots).getAllByTestId('ref01-g1-fast-track-named-recipient-slot')).toHaveLength(5);
  expect(within(namedSlots).getByText('Emplacements confirmés').closest('article')).toHaveTextContent('5/5');
  expect(within(namedSlots).getByText('Identités inscrites').closest('article')).toHaveTextContent('0');
  expect(within(namedSlots).getByText('Affectations autorisées').closest('article')).toHaveTextContent('0');
  expect(within(namedSlots).getByRole('heading', { name: 'REF-01-DEC-071 · V1.0' })).toBeInTheDocument();
  expect(within(namedSlots).getByText(/REF-01-G1-NAM-002 V0.1 est confirmé sans amendement/)).toBeInTheDocument();
  const authorisationFiles = screen.getByTestId('ref01-g1-fast-track-authorisation-files');
  expect(within(authorisationFiles).getAllByTestId('ref01-g1-fast-track-authorisation-file')).toHaveLength(5);
  expect(within(authorisationFiles).getByText('Dossiers confirmés').closest('article')).toHaveTextContent('5/5');
  expect(within(authorisationFiles).getByText('Identités inscrites').closest('article')).toHaveTextContent('0');
  expect(within(authorisationFiles).getByText('Autorisations accordées').closest('article')).toHaveTextContent('0');
  expect(within(authorisationFiles).getByText('Contacts ou envois').closest('article')).toHaveTextContent('0');
  expect(within(authorisationFiles).getByRole('heading', { name: 'REF-01-DEC-072 · V1.0' })).toBeInTheDocument();
  expect(within(authorisationFiles).getByText(/REF-01-G1-AUT-003 V0.1 est confirmé sans amendement/)).toBeInTheDocument();
  expect(within(authorisationFiles).getByText(/REF-01-DEC-078 autorise COL-003 V1.1 à collecter en interne/)).toBeInTheDocument();
  const inbox = screen.getByTestId('institutional-m3s-inbox-frame');
  expect(inbox).toBeInTheDocument();
  expect(within(inbox).getByRole('heading', { name: 'REF-01-DEC-077 · V1.0' })).toBeInTheDocument();
  expect(within(inbox).getByText('Entrées réelles').closest('article')).toHaveTextContent('0');
  expect(within(inbox).getByText('Imports actifs').closest('article')).toHaveTextContent('0');
  expect(within(inbox).getByText('Automatisations').closest('article')).toHaveTextContent('0');
  expect(within(inbox).getByText(/M3S-INB-003 V1.1 enregistre le GO limité/)).toBeInTheDocument();
  expect(within(inbox).getByText(/Les résultats des six cas fictifs de M3S-INB-002 V1.0 sont acceptés/)).toBeInTheDocument();
  const pilotSpec = within(inbox).getByTestId('institutional-m3s-inbox-pilot-spec');
  expect(within(pilotSpec).getByText(/PROTOCOLE CONFIRMÉ · M3S-INB-002 · V1.0/)).toBeInTheDocument();
  expect(within(pilotSpec).getByText('Cas fictifs exécutés').closest('article')).toHaveTextContent('6/6');
  expect(within(pilotSpec).getByText('Personnes réelles').closest('article')).toHaveTextContent('0');
  expect(within(pilotSpec).getByText('Sources connectées').closest('article')).toHaveTextContent('0');
  expect(within(pilotSpec).getByText('Automatismes').closest('article')).toHaveTextContent('0');
  expect(within(pilotSpec).getByText(/REF-01-DEC-076 autorise l’exécution fictive ; REF-01-DEC-077 accepte séparément/)).toBeInTheDocument();
  expect(within(pilotSpec).getByText(/6\/6 cas réussis, 5\/5 critères techniques vérifiés/)).toBeInTheDocument();
  expect(within(pilotSpec).getByText(/RELECTURE HUMAINE ACCEPTÉE/)).toBeInTheDocument();
  expect(within(pilotSpec).getByText('Accepté')).toBeInTheDocument();
  const pilotResults = within(inbox).getByTestId('institutional-m3s-inbox-pilot-results');
  expect(within(pilotResults).getAllByTestId('institutional-m3s-inbox-pilot-result')).toHaveLength(6);
  expect(within(pilotResults).getByText('Cas exécutés').closest('article')).toHaveTextContent('6/6');
  expect(within(pilotResults).getByText('Cas réussis').closest('article')).toHaveTextContent('6/6');
  expect(within(pilotResults).getByText('Données réelles').closest('article')).toHaveTextContent('0');
  expect(within(pilotResults).getByText('Éléments persistés').closest('article')).toHaveTextContent('0');
  const goNoGo = within(inbox).getByTestId('institutional-m3s-inbox-go-no-go');
  expect(within(goNoGo).getByText(/FICHE DÉCIDÉE · M3S-INB-003 · V1.1/)).toBeInTheDocument();
  expect(within(goNoGo).getByText('Options sélectionnées').closest('article')).toHaveTextContent('1/2');
  expect(within(goNoGo).getByText('Cas autorisés').closest('article')).toHaveTextContent('6/6');
  expect(within(goNoGo).getByText('Cas acceptés').closest('article')).toHaveTextContent('6/6');
  expect(within(goNoGo).getByText(/L’acceptation du lot fictif ne vaut ni mise en service ni ouverture L2/)).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'MEP-01 · LEGAL' })).not.toBeInTheDocument();
});

test('offers an explicit return to the lightweight Fast Track cockpit from the full programme', () => {
  renderDashboardNavigation({}, '/?view=program&returnTo=ref01-fasttrack');

  expect(screen.getByRole('heading', { name: 'De l’idée à une institution durable' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Retour au cockpit Fast Track' })).toHaveAttribute('href', '/?view=program&focus=ref01-fasttrack');
});

test('opens the institutional programme in all three interface languages', () => {
  const { rerender } = renderDashboardNavigation({ language: 'EN' }, '/?view=program');
  expect(screen.getByRole('heading', { name: 'From an idea to a sustainable institution' })).toBeInTheDocument();
  expect(screen.getByText('Mandates and delegations to confirm')).toBeInTheDocument();
  expect(screen.getByText('Access, environments and continuity to consolidate')).toBeInTheDocument();
  expect(screen.getByText('Scope, contributions and allocations to reconcile')).toBeInTheDocument();
  expect(screen.getByText('Institutional scope and minimum inventory to define')).toBeInTheDocument();
  expect(screen.getByText(/HUMAN REVIEW ACCEPTED · The six synthetic results/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Register of thirteen evidence gaps' })).toBeInTheDocument();
  expect(screen.getByText('COLLECTION AUTHORISED')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Internal evidence-source inventory' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-078 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByRole('region', { name: 'Shared measurement method' })).toHaveLength(16);
  expect(screen.getAllByText('Calculation not authorised')).toHaveLength(16);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Von der Idee zu einer nachhaltigen Institution' })).toBeInTheDocument();
  expect(screen.getByText('Mandate und Delegationen zu bestätigen')).toBeInTheDocument();
  expect(screen.getByText('Zugriffe, Umgebungen und Kontinuität zu konsolidieren')).toBeInTheDocument();
  expect(screen.getByText('Umfang, Beiträge und Zuordnungen abzustimmen')).toBeInTheDocument();
  expect(screen.getByText('Institutionellen Umfang und Mindestinventar definieren')).toBeInTheDocument();
  expect(screen.getByText(/MENSCHLICHE PRÜFUNG ANGENOMMEN · Die sechs synthetischen Ergebnisse/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Register der dreizehn Nachweislücken' })).toBeInTheDocument();
  expect(screen.getByText('SAMMLUNG AUTORISIERT')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Internes Inventar der Nachweisquellen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-078 · V1.0' })).toBeInTheDocument();
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
  expect(control.getByText('CONTROLE DETAILLE 1/11 · REF-01 · V1.85 · 01-09-2026')).toBeInTheDocument();
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
  expect(control.getAllByText('Constat documentaire').length).toBeGreaterThan(0);
  expect(control.getAllByText('Preuve candidate').length).toBeGreaterThan(0);
  expect(control.getAllByText(/aucun identifiant réel n est établi/).length).toBeGreaterThan(0);
  expect(control.queryAllByText('Contrat observé')).toHaveLength(0);
  expect(control.getAllByText('API RH-001 · /members-directory').length).toBeGreaterThan(0);
  expect(control.getAllByText('Annuaire interne sécurisé').length).toBeGreaterThan(0);
  expect(control.getAllByText('Sélecteurs partagés Team/Agent').length).toBeGreaterThan(0);
  expect(control.getAllByText('GED · preuves RH autorisées').length).toBeGreaterThan(0);
  expect(control.getByText('Contrats backend candidats')).toBeInTheDocument();
  expect(control.getByText(/aucun endpoint de production vérifié/)).toBeInTheDocument();
  expect(control.getAllByText('Consommation candidate').length).toBeGreaterThan(0);
  expect(control.queryAllByText('Contrats backend observés')).toHaveLength(0);
  expect(control.queryAllByText(/Endpoint RH-001 protégé/)).toHaveLength(0);
  expect(control.queryAllByText('Support raccordé')).toHaveLength(0);
  expect(control.queryAllByText(/Expose, après autorisation/)).toHaveLength(0);
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
  const resultsConfirmation = screen.getByRole('heading', { name: 'Accepter les preuves préparatoires et rétablir le sens des autorisations' }).closest('section');
  expect(within(resultsConfirmation).getByRole('heading', { name: 'REF-01-DEC-024 · V1.0' })).toBeInTheDocument();
  expect(within(resultsConfirmation).getByText('RES-001 confirmée et correspondance AUT-C/AUT-D rétablie')).toBeInTheDocument();
  const correctedScopes = screen.getByRole('heading', { name: 'Préparer les deux dossiers restants avec leur vrai périmètre' }).closest('section');
  expect(within(correctedScopes).getAllByTestId('ref01-aut-cost-scope')).toHaveLength(1);
  expect(within(correctedScopes).getAllByTestId('ref01-aut-governance-scope')).toHaveLength(1);
  expect(within(correctedScopes).getByText(/douze axes sont préparés, non confirmés et non exécutés/i)).toBeInTheDocument();
  const scopesConfirmation = screen.getByRole('heading', { name: 'Confirmer les deux périmètres avant leur production documentaire' }).closest('section');
  expect(within(scopesConfirmation).getByRole('heading', { name: 'REF-01-DEC-025 · V1.0' })).toBeInTheDocument();
  expect(within(scopesConfirmation).getByText('CD-001 confirmé pour production documentaire bornée')).toBeInTheDocument();
  const documentaryFiles = screen.getByRole('heading', { name: 'Documenter ce qui est établi, candidat ou encore indisponible' }).closest('section');
  expect(within(documentaryFiles).getAllByTestId('ref01-aut-cost-documentary-file')).toHaveLength(1);
  expect(within(documentaryFiles).getAllByTestId('ref01-aut-governance-documentary-file')).toHaveLength(1);
  expect(within(documentaryFiles).getAllByTestId('ref01-aut-cost-axis')).toHaveLength(6);
  expect(within(documentaryFiles).getAllByTestId('ref01-aut-governance-axis')).toHaveLength(6);
  expect(within(documentaryFiles).getByText(/Aucun montant nul n’est utilisé pour remplacer une donnée absente/)).toBeInTheDocument();
  const filesConfirmation = screen.getByRole('heading', { name: 'Confirmer la lecture documentaire sans déclarer les écarts résolus' }).closest('section');
  expect(within(filesConfirmation).getByRole('heading', { name: 'REF-01-DEC-026 · V1.0' })).toBeInTheDocument();
  expect(within(filesConfirmation).getByText('AUT-C et AUT-D confirmés comme dossiers documentaires')).toBeInTheDocument();
  const reassessment = screen.getByRole('heading', { name: 'Réévaluer G1 avec les quatre dossiers AUT désormais instruits' }).closest('section');
  expect(within(reassessment).getAllByTestId('ref01-g1-reassessed-condition')).toHaveLength(6);
  expect(within(reassessment).getByText(/cinq sont partiellement documentées, aucune n’est clôturable/)).toBeInTheDocument();
  expect(within(reassessment).getByText(/confirmer ou amender REF-01-G1-REV-002 V0.1/)).toBeInTheDocument();
  const reassessmentConfirmation = screen.getByRole('heading', { name: 'Confirmer la réévaluation sans fermer G1' }).closest('section');
  expect(within(reassessmentConfirmation).getByRole('heading', { name: 'REF-01-DEC-027 · V1.0' })).toBeInTheDocument();
  expect(within(reassessmentConfirmation).getByText('Réévaluation G1 confirmée comme lecture gouvernée')).toBeInTheDocument();
  const evidencePlan = screen.getByRole('heading', { name: 'Ordonner les preuves sans lancer d’action réelle' }).closest('section');
  expect(within(evidencePlan).getAllByTestId('ref01-g1-evidence-plan-package')).toHaveLength(5);
  expect(within(evidencePlan).getByText(/REF-01-G1-PLN-001 V1.0 est confirmé/)).toBeInTheDocument();
  const planConfirmation = screen.getByRole('heading', { name: 'Confirmer le plan sans lancer les cinq lots' }).closest('section');
  expect(within(planConfirmation).getByRole('heading', { name: 'REF-01-DEC-028 · V1.0' })).toBeInTheDocument();
  expect(within(planConfirmation).getByText('Plan de preuves G1 confirmé')).toBeInTheDocument();
  const packageRegister = screen.getByRole('heading', { name: 'Encadrer les cinq lots sans action réelle' }).closest('section');
  expect(within(packageRegister).getAllByTestId('ref01-g1-package-register-item')).toHaveLength(5);
  expect(within(packageRegister).getByText(/REF-01-DEC-029 confirme REF-01-G1-PKG-001 V1.0/)).toBeInTheDocument();
  const packageRegisterConfirmation = screen.getByRole('heading', { name: 'Confirmer le registre sans démarrer les cinq lots' }).closest('section');
  expect(within(packageRegisterConfirmation).getByRole('heading', { name: 'REF-01-DEC-029 · V1.0' })).toBeInTheDocument();
  expect(within(packageRegisterConfirmation).getByText('Registre des cinq lots confirmé')).toBeInTheDocument();
  const priorityOnePackages = screen.getByRole('heading', { name: 'Deux matrices gouvernées sans accès ni opération sur les pièces' }).closest('section');
  expect(within(priorityOnePackages).getAllByTestId('ref01-g1-priority-one-package')).toHaveLength(2);
  expect(within(priorityOnePackages).getAllByText('CONFIRMÉ')).toHaveLength(2);
  const priorityOneConfirmation = screen.getByRole('heading', { name: 'Confirmer les deux matrices sans attribuer de droits ni agir sur la GED' }).closest('section');
  expect(within(priorityOneConfirmation).getByRole('heading', { name: 'REF-01-DEC-030 · V1.0' })).toBeInTheDocument();
  expect(within(priorityOneConfirmation).getByText('Matrices PKG-01 et PKG-02 confirmées')).toBeInTheDocument();
  const postgresRecoveryPackage = screen.getByRole('heading', { name: 'Grille PostgreSQL et reprise confirmée sans choix de service' }).closest('section');
  expect(within(postgresRecoveryPackage).getAllByTestId('ref01-g1-postgres-recovery-area')).toHaveLength(4);
  expect(within(postgresRecoveryPackage).getByText(/REF-01-DEC-031 confirme REF-01-G1-PKG-03-001 V1.0/)).toBeInTheDocument();
  const postgresRecoveryConfirmation = screen.getByRole('heading', { name: 'Confirmer la grille sans retenir de service ni lancer de test' }).closest('section');
  expect(within(postgresRecoveryConfirmation).getByRole('heading', { name: 'REF-01-DEC-031 · V1.0' })).toBeInTheDocument();
  expect(within(postgresRecoveryConfirmation).getByText('Grille PKG-03 confirmée')).toBeInTheDocument();
  const migrationRollbackPackage = screen.getByRole('heading', { name: 'Procédure migration et retour arrière confirmée sans environnement réel' }).closest('section');
  expect(within(migrationRollbackPackage).getAllByTestId('ref01-g1-migration-rollback-area')).toHaveLength(4);
  expect(within(migrationRollbackPackage).getByText(/REF-01-DEC-032 confirme REF-01-G1-PKG-04-001 V1.0/)).toBeInTheDocument();
  const migrationRollbackConfirmation = screen.getByRole('heading', { name: 'Confirmer la procédure sans ouvrir d’environnement ni exécuter de migration' }).closest('section');
  expect(within(migrationRollbackConfirmation).getByRole('heading', { name: 'REF-01-DEC-032 · V1.0' })).toBeInTheDocument();
  expect(within(migrationRollbackConfirmation).getByText('Procédure PKG-04 confirmée')).toBeInTheDocument();
  const outboxMonitoringPackage = screen.getByRole('heading', { name: 'Spécification outbox, supervision et reprise confirmée sans activation réelle' }).closest('section');
  expect(within(outboxMonitoringPackage).getAllByTestId('ref01-g1-outbox-monitoring-area')).toHaveLength(4);
  expect(within(outboxMonitoringPackage).getByText(/REF-01-DEC-033 confirme PKG-05-001 V1.0/)).toBeInTheDocument();
  const outboxMonitoringConfirmation = screen.getByRole('heading', { name: 'Confirmer la spécification sans activer de worker ni d’alerte' }).closest('section');
  expect(within(outboxMonitoringConfirmation).getByRole('heading', { name: 'REF-01-DEC-033 · V1.0' })).toBeInTheDocument();
  expect(within(outboxMonitoringConfirmation).getByText('Spécification PKG-05 confirmée')).toBeInTheDocument();
  const finalPackageReview = screen.getByRole('heading', { name: 'Réévaluer G1 après confirmation documentaire des cinq lots' }).closest('section');
  expect(within(finalPackageReview).getAllByTestId('ref01-g1-final-reviewed-condition')).toHaveLength(6);
  expect(within(finalPackageReview).getByText(/REF-01-DEC-034 confirme REF-01-G1-REV-003 V1.0/)).toBeInTheDocument();
  const finalReviewConfirmation = screen.getByRole('heading', { name: 'Confirmer la revue sans confondre documentation et preuve' }).closest('section');
  expect(within(finalReviewConfirmation).getByRole('heading', { name: 'REF-01-DEC-034 · V1.0' })).toBeInTheDocument();
  expect(within(finalReviewConfirmation).getByText('Revue finale G1 confirmée')).toBeInTheDocument();
  const exitEvidenceRegister = screen.getByRole('heading', { name: 'Préparer les preuves attendues sans lancer leur collecte' }).closest('section');
  expect(within(exitEvidenceRegister).getAllByTestId('ref01-g1-exit-evidence-condition')).toHaveLength(6);
  expect(within(exitEvidenceRegister).getByText(/REF-01-DEC-035 confirme REF-01-G1-EVD-002 V1.0/)).toBeInTheDocument();
  expect(within(exitEvidenceRegister).getAllByText('0', { selector: 'p.mt-2' })).toHaveLength(2);
  const exitEvidenceConfirmation = screen.getByRole('heading', { name: 'Confirmer les preuves attendues sans autoriser leur collecte' }).closest('section');
  expect(within(exitEvidenceConfirmation).getByRole('heading', { name: 'REF-01-DEC-035 · V1.0' })).toBeInTheDocument();
  expect(within(exitEvidenceConfirmation).getByText('Matrice des preuves de sortie confirmée')).toBeInTheDocument();
  const exitEvidenceCollection = screen.getByRole('heading', { name: 'Organiser la collecte future sans ouvrir les accès ni lancer les tests' }).closest('section');
  expect(within(exitEvidenceCollection).getAllByTestId('ref01-g1-exit-evidence-collection-route')).toHaveLength(6);
  expect(within(exitEvidenceCollection).getByText(/REF-01-DEC-037 confirme ci-dessous AUT-002 V1.0/)).toBeInTheDocument();
  expect(within(exitEvidenceCollection).getAllByText('COLLECTE NON AUTORISÉE')).toHaveLength(6);
  const exitEvidenceCollectionConfirmation = screen.getByRole('heading', { name: 'Confirmer les six circuits sans autoriser leur exécution' }).closest('section');
  expect(within(exitEvidenceCollectionConfirmation).getByRole('heading', { name: 'REF-01-DEC-036 · V1.0' })).toBeInTheDocument();
  expect(within(exitEvidenceCollectionConfirmation).getByText('Protocole des six circuits confirmé')).toBeInTheDocument();
  const executionAuthorisationRegister = screen.getByRole('heading', { name: 'Préparer six décisions unitaires sans ouvrir un circuit' }).closest('section');
  expect(within(executionAuthorisationRegister).getAllByTestId('ref01-g1-execution-authorisation-file')).toHaveLength(6);
  expect(within(executionAuthorisationRegister).getAllByTestId('ref01-g1-execution-authorisation-control')).toHaveLength(6);
  expect(within(executionAuthorisationRegister).getAllByText('NON AUTORISÉ')).toHaveLength(6);
  expect(within(executionAuthorisationRegister).getByText(/REF-01-DEC-037 confirme AUT-002 V1.0/)).toBeInTheDocument();
  const executionAuthorisationConfirmation = screen.getByRole('heading', { name: 'Confirmer le registre sans ouvrir les autorisations' }).closest('section');
  expect(within(executionAuthorisationConfirmation).getByRole('heading', { name: 'REF-01-DEC-037 · V1.0' })).toBeInTheDocument();
  expect(within(executionAuthorisationConfirmation).getByText('Registre AUT-002 confirmé sans autorisation')).toBeInTheDocument();
  const executionAuthorisationPriority = screen.getByRole('heading', { name: 'Commencer par le documentaire, réserver la technique et garder L2 fermée' }).closest('section');
  expect(within(executionAuthorisationPriority).getAllByTestId('ref01-g1-execution-authorisation-wave')).toHaveLength(3);
  expect(within(executionAuthorisationPriority).getAllByTestId('ref01-g1-execution-authorisation-priority-rule')).toHaveLength(4);
  expect(within(executionAuthorisationPriority).getByText('PRÉPARATION DOCUMENTAIRE OUVERTE')).toBeInTheDocument();
  expect(within(executionAuthorisationPriority).getAllByText('NON AUTORISÉE')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'Confirmer les trois vagues sans autoriser leur exécution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-038 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ouvrir deux préparations, sans ouvrir les droits ni les pièces réelles' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-039 · V1.0' })).toBeInTheDocument();
  const documentaryAuthorisationFiles = screen.getByRole('heading', { name: 'Préparer ensemble les deux dossiers sans mélanger leurs décisions' }).closest('section');
  expect(within(documentaryAuthorisationFiles).getAllByTestId('ref01-g1-documentary-authorisation-file')).toHaveLength(2);
  expect(within(documentaryAuthorisationFiles).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-001 · V1.0' })).toBeInTheDocument();
  expect(within(documentaryAuthorisationFiles).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-001 · V1.0' })).toBeInTheDocument();
  expect(within(documentaryAuthorisationFiles).getByText('Champs restant ouverts').closest('article')).toHaveTextContent('11');
  expect(within(documentaryAuthorisationFiles).getByText('Champs restant ouverts').closest('article')).toHaveTextContent('Cinq + six');
  expect(screen.getByRole('heading', { name: 'Confirmer deux cadres distincts sans ouvrir leur exécution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-040 · V1.0' })).toBeInTheDocument();
  const elevenFieldMatrices = screen.getByRole('heading', { name: 'Conserver la revue confirmée et ordonner la qualification sans ouvrir de droit' }).closest('section');
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-eleven-field-candidate-matrix')).toHaveLength(2);
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-eleven-field-candidate-row')).toHaveLength(11);
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-002 · V1.0' }).closest('article')).toContainElement(within(elevenFieldMatrices).getByText('Durées applicables'));
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-002 · V1.0' }).closest('article')).toContainElement(within(elevenFieldMatrices).getByText('Titulaires réels'));
  expect(within(elevenFieldMatrices).getAllByText('SOURCÉ · CONFIRMÉ')).toHaveLength(1);
  expect(within(elevenFieldMatrices).getAllByText('TRAVAIL · CONFIRMÉ')).toHaveLength(5);
  expect(within(elevenFieldMatrices).getAllByText('PARTIEL · À ARBITRER')).toHaveLength(3);
  expect(within(elevenFieldMatrices).getAllByText('LEGAL VALIDÉ · APPLICABILITÉ RETENUE')).toHaveLength(2);
  expect(within(elevenFieldMatrices).getByText('Valeurs non LEGAL relues').closest('article')).toHaveTextContent('9/9');
  expect(within(elevenFieldMatrices).getByText('Champs LEGAL validés').closest('article')).toHaveTextContent('2/2');
  expect(within(elevenFieldMatrices).getByText('Autorisations').closest('article')).toHaveTextContent('0');
  expect(within(elevenFieldMatrices).getByText(/Aucun droit effectif de production n’est établi/)).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByText(/Les six lignes sont des enregistrements de fixture synthétique/)).toBeInTheDocument();
  expect(elevenFieldMatrices.textContent).not.toMatch(/contrôles de production|authentification de production|Périmètre observé : six/);
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-041 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-042 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-043 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-044 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-045 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-046 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-047 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-048 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-049 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-050 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-051 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-052 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-053 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-054 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-055 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-056 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-057 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-058 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-059 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-060 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-061 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-062 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-migration-rollback-authorisation-field')).toHaveLength(11);
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-063 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-outbox-monitoring-authorisation-field')).toHaveLength(11);
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-064 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-technical-wave-condition')).toHaveLength(4);
  expect(within(elevenFieldMatrices).getByRole('heading', { name: 'REF-01-DEC-065 · V1.0' })).toBeInTheDocument();
  expect(within(elevenFieldMatrices).getAllByTestId('ref01-g1-technical-value-package')).toHaveLength(3);
  expect(within(elevenFieldMatrices).getByText('Valeurs proposées').closest('article')).toHaveTextContent('0/22');
  expect(within(elevenFieldMatrices).getByText(/jusqu à 3 mois/)).toBeInTheDocument();
  const legalFramework = within(elevenFieldMatrices).getByTestId('ref01-g1-legal-retention-framework');
  expect(within(legalFramework).getAllByTestId('ref01-g1-legal-retention-row')).toHaveLength(5);
  expect(within(legalFramework).getAllByRole('link', { name: /PFPDT · Associations/ })[0]).toHaveAttribute('href', 'https://www.edoeb.admin.ch/en/data-protection-in-clubs-and-associations');
  expect(within(legalFramework).getByRole('link', { name: /CDP Sénégal · Obligations/ })).toHaveAttribute('href', 'https://www.cdp.sn/obligations-entreprises');
  const categoryDesignation = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-category-designation');
  expect(within(categoryDesignation).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-004 · V1.0' })).toBeInTheDocument();
  expect(within(categoryDesignation).getAllByTestId('ref01-g1-retention-category-row')).toHaveLength(5);
  expect(within(categoryDesignation).getByText('Directes REF-01').closest('article')).toHaveTextContent('2');
  expect(within(categoryDesignation).getByText('Reliées sans copie').closest('article')).toHaveTextContent('2');
  expect(within(categoryDesignation).getByText('Conditionnelles').closest('article')).toHaveTextContent('1');
  const ownersTriggers = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-owners-triggers');
  expect(within(ownersTriggers).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-005 · V1.0' })).toBeInTheDocument();
  expect(within(ownersTriggers).getAllByTestId('ref01-g1-retention-owner-trigger-row')).toHaveLength(5);
  expect(within(ownersTriggers).getByText('Responsables fonctionnels').closest('article')).toHaveTextContent('5/5');
  expect(within(ownersTriggers).getByText('Automatisations ouvertes').closest('article')).toHaveTextContent('0');
  const reviewCases = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-review-cases');
  expect(within(reviewCases).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-006 · V1.0' })).toBeInTheDocument();
  expect(within(reviewCases).getAllByTestId('ref01-g1-retention-review-case-row')).toHaveLength(5);
  expect(within(reviewCases).getByText('Cas de revue couverts').closest('article')).toHaveTextContent('5/5');
  expect(within(reviewCases).getByText('Ordres d exécution').closest('article')).toHaveTextContent('0');
  const reviewRegister = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-review-register');
  expect(within(reviewRegister).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-007 · V1.0' })).toBeInTheDocument();
  expect(within(reviewRegister).getAllByTestId('ref01-g1-retention-review-register-group')).toHaveLength(4);
  expect(within(reviewRegister).getByText('Métadonnées').closest('article')).toHaveTextContent('16');
  expect(within(reviewRegister).getByText('Cas réels').closest('article')).toHaveTextContent('0');
  const openingGates = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-case-opening-gates');
  expect(within(openingGates).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-008 · V1.0' })).toBeInTheDocument();
  expect(within(openingGates).getAllByTestId('ref01-g1-retention-case-opening-gate')).toHaveLength(6);
  expect(within(openingGates).getByText('Portes préparées').closest('article')).toHaveTextContent('6/6');
  expect(within(openingGates).getByText('Cas préremplis').closest('article')).toHaveTextContent('0');
  const openingDecisionSheet = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-case-opening-decision-sheet');
  expect(within(openingDecisionSheet).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-009 · V1.0' })).toBeInTheDocument();
  expect(within(openingDecisionSheet).getAllByTestId('ref01-g1-retention-case-opening-decision-group')).toHaveLength(4);
  expect(within(openingDecisionSheet).getByText('Portes à tracer').closest('article')).toHaveTextContent('6/6');
  expect(within(openingDecisionSheet).getByText('Cas réels').closest('article')).toHaveTextContent('0');
  const firstUseProtocol = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-first-use-authorisation-protocol');
  expect(within(firstUseProtocol).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-010 · V1.0' })).toBeInTheDocument();
  expect(within(firstUseProtocol).getAllByTestId('ref01-g1-retention-first-use-authorisation-group')).toHaveLength(4);
  expect(within(firstUseProtocol).getByText('Préconditions à contrôler').closest('article')).toHaveTextContent('6/6');
  expect(within(firstUseProtocol).getByText('Cas actifs').closest('article')).toHaveTextContent('0');
  const firstUseDecision = within(elevenFieldMatrices).getByTestId('ref01-g1-retention-first-use-decision-sheet');
  expect(within(firstUseDecision).getByRole('heading', { name: 'REF-01-G1-AUT-02-03-011 · V1.0' })).toBeInTheDocument();
  expect(within(firstUseDecision).getAllByTestId('ref01-g1-retention-first-use-decision-group')).toHaveLength(4);
  expect(within(firstUseDecision).getByText('Préconditions à tracer').closest('article')).toHaveTextContent('6/6');
  expect(within(firstUseDecision).getByText('Décisions actives').closest('article')).toHaveTextContent('0');
  const leastPrivilegeModel = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-role-model');
  expect(within(leastPrivilegeModel).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-003 · V1.0' })).toBeInTheDocument();
  expect(within(leastPrivilegeModel).getAllByTestId('ref01-g1-least-privilege-role-model-group')).toHaveLength(4);
  expect(within(leastPrivilegeModel).getByText('Champs rapprochés').closest('article')).toHaveTextContent('6/6');
  expect(within(leastPrivilegeModel).getByText('Titulaires réels établis').closest('article')).toHaveTextContent('0');
  expect(within(leastPrivilegeModel).getByText('Rôle source à qualifier')).toBeInTheDocument();
  expect(within(leastPrivilegeModel).queryByText('Titulaire observé')).not.toBeInTheDocument();
  expect(within(leastPrivilegeModel).getByText('Droits modifiés').closest('article')).toHaveTextContent('0');
  const observedAccessMatrix = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-observed-access-matrix');
  expect(within(observedAccessMatrix).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-004 · V1.0' })).toBeInTheDocument();
  expect(within(observedAccessMatrix).getAllByTestId('ref01-g1-least-privilege-observed-access-group')).toHaveLength(4);
  expect(within(observedAccessMatrix).getByText('Tests synthétiques').closest('article')).toHaveTextContent('3/3');
  expect(within(observedAccessMatrix).getByText('Champs projetés').closest('article')).toHaveTextContent('8');
  expect(within(observedAccessMatrix).getByText('Lignes de fixture').closest('article')).toHaveTextContent('6');
  expect(within(observedAccessMatrix).getByText('Droits modifiés').closest('article')).toHaveTextContent('0');
  expect(within(observedAccessMatrix).getByText('Rôles candidats : Admin et Utilisateur · alias Manager vers Admin')).toBeInTheDocument();
  expect(within(observedAccessMatrix).getByText('Tests : Utilisateur autorisé · Auditeur refusé')).toBeInTheDocument();
  expect(within(observedAccessMatrix).getByText('Tests synthétiques locaux du 31-07-2026')).toBeInTheDocument();
  expect(within(observedAccessMatrix).getByText('Aucun endpoint d’écriture ouvert dans L1')).toBeInTheDocument();
  expect(within(observedAccessMatrix).getByText('Aucune donnée C3/C4/C5 dans le contrat')).toBeInTheDocument();
  expect(within(observedAccessMatrix).queryByText('Tests de production du 31-07-2026')).not.toBeInTheDocument();
  const grantWithdrawalProtocol = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-grant-withdrawal-protocol');
  expect(within(grantWithdrawalProtocol).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-005 · V1.0' })).toBeInTheDocument();
  expect(within(grantWithdrawalProtocol).getAllByTestId('ref01-g1-least-privilege-grant-withdrawal-group')).toHaveLength(4);
  expect(within(grantWithdrawalProtocol).getByText('Préconditions structurées').closest('article')).toHaveTextContent('6/6');
  expect(within(grantWithdrawalProtocol).getByText('Demandes actives').closest('article')).toHaveTextContent('0');
  expect(within(grantWithdrawalProtocol).getByText('Droits attribués').closest('article')).toHaveTextContent('0');
  expect(within(grantWithdrawalProtocol).getByText('Droits retirés').closest('article')).toHaveTextContent('0');
  const accessRegister = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-access-register');
  expect(within(accessRegister).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-006 · V1.0' })).toBeInTheDocument();
  expect(within(accessRegister).getAllByTestId('ref01-g1-least-privilege-access-register-group')).toHaveLength(4);
  expect(within(accessRegister).getByText('Champs structurés').closest('article')).toHaveTextContent('16/16');
  expect(within(accessRegister).getByText('États candidats').closest('article')).toHaveTextContent('6/6');
  expect(within(accessRegister).getByText('Fiches actives').closest('article')).toHaveTextContent('0');
  expect(within(accessRegister).getByText('Droits réels').closest('article')).toHaveTextContent('0');
  const accessOpeningGates = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-access-opening-gates');
  expect(within(accessOpeningGates).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-007 · V1.0' })).toBeInTheDocument();
  expect(within(accessOpeningGates).getAllByTestId('ref01-g1-least-privilege-access-opening-gate')).toHaveLength(6);
  expect(within(accessOpeningGates).getByText('Portes préparées').closest('article')).toHaveTextContent('6/6');
  expect(within(accessOpeningGates).getByText('Verdicts proposés').closest('article')).toHaveTextContent('4');
  expect(within(accessOpeningGates).getByText('Fiches préremplies').closest('article')).toHaveTextContent('0');
  expect(within(accessOpeningGates).getByText('Droits exécutés').closest('article')).toHaveTextContent('0');
  const accessOpeningDecision = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-access-opening-decision-sheet');
  expect(within(accessOpeningDecision).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-008 · V1.0' })).toBeInTheDocument();
  expect(within(accessOpeningDecision).getAllByTestId('ref01-g1-least-privilege-access-opening-decision-group')).toHaveLength(4);
  expect(within(accessOpeningDecision).getByText('Portes à tracer').closest('article')).toHaveTextContent('6/6');
  expect(within(accessOpeningDecision).getByText('Décisions actives').closest('article')).toHaveTextContent('0');
  expect(within(accessOpeningDecision).getByText('Droits exécutés').closest('article')).toHaveTextContent('0');
  const firstUseAuthorisation = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-first-use-authorisation-protocol');
  expect(within(firstUseAuthorisation).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-009 · V1.0' })).toBeInTheDocument();
  expect(within(firstUseAuthorisation).getAllByTestId('ref01-g1-least-privilege-first-use-authorisation-group')).toHaveLength(4);
  expect(within(firstUseAuthorisation).getByText('Préconditions à contrôler').closest('article')).toHaveTextContent('6/6');
  expect(within(firstUseAuthorisation).getByText('Décision séparée').closest('article')).toHaveTextContent('1/1');
  expect(within(firstUseAuthorisation).getByText('Autorisations actives').closest('article')).toHaveTextContent('0');
  expect(within(firstUseAuthorisation).getByText('Droits exécutés').closest('article')).toHaveTextContent('0');
  const firstExecutionDecision = within(elevenFieldMatrices).getByTestId('ref01-g1-least-privilege-first-execution-decision-sheet');
  expect(within(firstExecutionDecision).getByRole('heading', { name: 'REF-01-G1-AUT-02-02-010 · V1.0' })).toBeInTheDocument();
  expect(within(firstExecutionDecision).getAllByTestId('ref01-g1-least-privilege-first-execution-decision-group')).toHaveLength(4);
  expect(within(firstExecutionDecision).getByText('Préconditions à tracer').closest('article')).toHaveTextContent('6/6');
  expect(within(firstExecutionDecision).getByText('Décisions actives').closest('article')).toHaveTextContent('0');
  expect(within(firstExecutionDecision).getByText('Droits exécutés').closest('article')).toHaveTextContent('0');
  const postAuthorisationReview = within(elevenFieldMatrices).getByTestId('ref01-g1-post-authorisation-reassessment');
  expect(postAuthorisationReview).toHaveAttribute('id', 'institutional-ref01-g1-rev-004');
  expect(within(postAuthorisationReview).getByText(/REF-01-G1-REV-004 · V1.0/)).toBeInTheDocument();
  expect(within(postAuthorisationReview).getAllByTestId('ref01-g1-post-authorisation-condition')).toHaveLength(6);
  expect(within(postAuthorisationReview).getByText('Supports confirmés').closest('article')).toHaveTextContent('18/18');
  expect(within(postAuthorisationReview).getByText('Conditions clôturables').closest('article')).toHaveTextContent('0/6');
  const waveCandidate = within(elevenFieldMatrices).getByTestId('ref01-g1-synthetic-wave-candidate');
  expect(within(waveCandidate).getAllByTestId('ref01-g1-synthetic-wave-file')).toHaveLength(3);
  expect(within(waveCandidate).getByText('Dossiers candidats').closest('article')).toHaveTextContent('3/3');
  expect(within(waveCandidate).getByText('Autorisations unitaires').closest('article')).toHaveTextContent('0/3');
  expect(within(waveCandidate).getByText('Environnements désignés').closest('article')).toHaveTextContent('0/3');
  expect(within(waveCandidate).getByText('Tests lancés').closest('article')).toHaveTextContent('0');
  expect(control.getByText(/décisions sur le lot : 79/)).toBeInTheDocument();
  expect(control.getByText(/sources maîtresses désignées : 0/)).toBeInTheDocument();
  expect(control.getAllByText('Responsabilité collective').length).toBeGreaterThan(0);
  expect(control.getByText(/ce lot ne valide ni identité civile/)).toBeInTheDocument();
  expect(section.textContent).not.toMatch(/Chantal|Gnilane|Ibrahima|Papa/);
  expect(section.textContent).not.toMatch(/\d+\s*%/);

  fireEvent.click(control.getByRole('button', { name: /Ouvrir l’annuaire candidat/ }));
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
  expect(screen.getByRole('heading', { name: 'Accept preparatory evidence and restore the meaning of the authorisations' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-024 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare the two remaining files within their true scope' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm both scopes before documentary production' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-025 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Document what is established, candidate or still unavailable' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the documentary reading without declaring gaps resolved' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-026 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Reassess G1 with all four AUT files now documented' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the reassessment without closing G1' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-027 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Order the evidence without starting real action' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the plan without starting the five packages' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-028 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Govern the five packages without real action' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the register without starting the five packages' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-029 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Two governed matrices without access or record operations' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm both matrices without assigning rights or operating on the DMS' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-030 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirmed PostgreSQL and recovery grid without selecting a service' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the grid without selecting a service or starting a test' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-031 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirmed migration and rollback procedure without a real environment' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the procedure without opening an environment or running a migration' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-032 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirmed outbox, monitoring and recovery specification without real activation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the specification without activating a worker or alert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-033 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Reassess G1 after documentary confirmation of all five packages' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the review without confusing documentation with evidence' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-034 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare expected evidence without starting collection' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm expected evidence without authorising collection' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-035 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Organise future collection without opening access or starting tests' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm all six routes without authorising execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-036 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare six individual decisions without opening a route' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm the register without opening authorisations' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-037 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Start with documentary controls, reserve technical work and keep L2 closed' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm all three waves without authorising their execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-038 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Open two preparations without opening real rights or records' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-039 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare both files together without merging their decisions' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Keep the confirmed review and order qualification without opening a right' })).toBeInTheDocument();
  expect(screen.getByText(/No effective production right is established/)).toBeInTheDocument();
  expect(screen.getByText(/The six rows are synthetic fixture records/)).toBeInTheDocument();
  expect(screen.getByText('Established real holders').closest('article')).toHaveTextContent('0');
  expect(screen.queryByText('Observed holder')).not.toBeInTheDocument();
  expect(screen.getByText('Candidate backend contracts')).toBeInTheDocument();
  expect(screen.getByText(/no verified production endpoint/)).toBeInTheDocument();
  expect(screen.getAllByText('SOURCED · CONFIRMED')).toHaveLength(1);
  expect(screen.getAllByText('WORKING VALUE · CONFIRMED')).toHaveLength(5);
  expect(screen.getAllByText('PARTIAL · DECISION REQUIRED')).toHaveLength(3);
  expect(screen.getAllByText('LEGAL VALIDATED · APPLICABILITY RETAINED')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-041 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-042 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-043 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-044 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-045 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-046 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-047 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-048 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-049 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-050 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-051 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-052 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-053 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-054 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-055 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-056 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-057 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-058 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-059 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-060 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-061 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-062 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-063 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-064 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-065 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prepare three isolated technical files without authorising a test' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Frame PostgreSQL and synthetic restoration before any designation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Frame a synthetic migration and rollback before any execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Frame outbox, monitoring and recovery before any activation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Measure documentary preparation without claiming technical readiness' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Confirm REV-005 without turning fields into evidence' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Qualify twenty-two values in three packages without opening execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-004 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-006 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-010 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-011 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-004 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-006 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-010 · V1.0' })).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-access-opening-gates')).getByText('Four proposed documentary outcomes')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-access-opening-decision-sheet')).getByText('Four confirmed completion rules')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-use-authorisation-protocol')).getByText('Six proposed mandatory prerequisites')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-use-authorisation-protocol')).getByText('Four proposed documentary outcomes')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-execution-decision-sheet')).getByText('Five confirmed decision rules')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-post-authorisation-reassessment')).getByText('Confirmed supports').closest('article')).toHaveTextContent('18/18');
  expect(within(screen.getByTestId('ref01-g1-post-authorisation-reassessment')).getAllByTestId('ref01-g1-post-authorisation-condition')).toHaveLength(6);
  expect(screen.getByText('Six candidate register states')).toBeInTheDocument();
  expect(screen.getByText('Six prerequisites before any future execution')).toBeInTheDocument();
  expect(screen.getByText('Local synthetic tests dated 31 Jul 2026')).toBeInTheDocument();
  expect(screen.getByText(/Recorded decisions: 1/)).toBeInTheDocument();
  expect(screen.getByText('Descriptive controls')).toBeInTheDocument();
  expect(screen.getAllByText('Evidence to establish').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Decision criteria validated').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText(/decision required/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText('Transfer')).toHaveLength(4);
  expect(screen.getAllByText('Collective responsibility').length).toBeGreaterThan(0);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'REF-01 · Personen und Teams' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validiertes logisches Vier-Objekt-Modell' })).toBeInTheDocument();
  expect(screen.getByText('REF-01-Arbeitsrahmen validiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validierter Lebenszyklus' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Validierte Mindestspur für jedes Ereignis' })).toBeInTheDocument();
  expect(screen.getByText('REF-01-Lebenszyklus validiert')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigte Prüfung bewahren und Qualifizierung ohne Rechteöffnung ordnen' })).toBeInTheDocument();
  expect(screen.getByText(/Kein wirksames Produktionsrecht ist belegt/)).toBeInTheDocument();
  expect(screen.getByText(/Die sechs Zeilen sind synthetische Fixture-Datensätze/)).toBeInTheDocument();
  expect(screen.getByText('Belegte reale Inhaber').closest('article')).toHaveTextContent('0');
  expect(screen.queryByText('Beobachteter Inhaber')).not.toBeInTheDocument();
  expect(screen.getByText('Backend-Kandidatenverträge')).toBeInTheDocument();
  expect(screen.getByText(/kein verifizierter Produktionsendpunkt/)).toBeInTheDocument();
  expect(screen.getAllByText('BELEGT · BESTÄTIGT')).toHaveLength(1);
  expect(screen.getAllByText('ARBEITSWERT · BESTÄTIGT')).toHaveLength(5);
  expect(screen.getAllByText('TEILWEISE · ENTSCHEID NÖTIG')).toHaveLength(3);
  expect(screen.getAllByText('LEGAL VALIDIERT · ANWENDBARKEIT BESTÄTIGT')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-041 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-042 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-043 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-044 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-045 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-046 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-047 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-048 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-049 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-050 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-051 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-052 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-053 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-054 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-055 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-056 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-057 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-058 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-059 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-060 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-061 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-062 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-063 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-064 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-065 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Drei isolierte technische Akten vorbereiten, ohne Prüfung zu erlauben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'PostgreSQL und synthetische Wiederherstellung vor jeder Bestimmung abgrenzen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Synthetische Migration und Rollback vor jeder Ausführung abgrenzen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Outbox, Überwachung und Wiederanlauf vor jeder Aktivierung abgrenzen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Dokumentvorbereitung messen, ohne technische Einsatzbereitschaft zu behaupten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REV-005 bestätigen, ohne Felder zu Nachweisen zu machen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Zweiundzwanzig Werte in drei Paketen qualifizieren, ohne Ausführung zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-004 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-006 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-010 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-03-011 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-004 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-005 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-006 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-007 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-008 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-009 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-G1-AUT-02-02-010 · V1.0' })).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-access-opening-gates')).getByText('Vier vorgeschlagene Dokumentationsergebnisse')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-access-opening-decision-sheet')).getByText('Vier bestätigte Vollständigkeitsregeln')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-use-authorisation-protocol')).getByText('Sechs vorgeschlagene Pflichtvoraussetzungen')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-use-authorisation-protocol')).getByText('Vier vorgeschlagene Dokumentationsergebnisse')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-least-privilege-first-execution-decision-sheet')).getByText('Fünf bestätigte Entscheidregeln')).toBeInTheDocument();
  expect(within(screen.getByTestId('ref01-g1-post-authorisation-reassessment')).getByText('Bestätigte Träger').closest('article')).toHaveTextContent('18/18');
  expect(within(screen.getByTestId('ref01-g1-post-authorisation-reassessment')).getAllByTestId('ref01-g1-post-authorisation-condition')).toHaveLength(6);
  expect(screen.getByText('Sechs Kandidatenzustände des Registers')).toBeInTheDocument();
  expect(screen.getByText('Sechs Voraussetzungen vor jeder künftigen Ausführung')).toBeInTheDocument();
  expect(screen.getByText('Lokale synthetische Tests vom 31.07.2026')).toBeInTheDocument();
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
  expect(screen.getByRole('heading', { name: 'Vorbereitende Nachweise annehmen und die Bedeutung der Autorisierungen wiederherstellen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-024 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die zwei verbleibenden Akten in ihrem richtigen Umfang vorbereiten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beide Umfänge vor der Dokumentproduktion bestätigen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-025 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Dokumentieren, was belegt, Kandidat oder noch nicht verfügbar ist' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Dokumentlesung bestätigen, ohne Lücken als gelöst darzustellen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-026 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'G1 mit allen vier dokumentierten AUT-Akten neu bewerten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Neubewertung bestätigen, ohne G1 zu schliessen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-027 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Nachweise ordnen, ohne reale Aktionen zu starten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Den Plan bestätigen, ohne die fünf Pakete zu starten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-028 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die fünf Pakete ohne reale Aktion steuern' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Das Register bestätigen, ohne die fünf Pakete zu starten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-029 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Zwei gesteuerte Matrizen ohne Zugriff oder Unterlagenoperation' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beide Matrizen bestätigen, ohne Rechte zuzuweisen oder im DMS zu handeln' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-030 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigtes PostgreSQL- und Wiederanlaufraster ohne Dienstwahl' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Das Raster ohne Dienstwahl oder Teststart bestätigen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-031 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigtes Migration- und Rollback-Verfahren ohne reale Umgebung' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Das Verfahren ohne Umgebungsöffnung oder Migration bestätigen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-032 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bestätigte Outbox-, Überwachungs- und Wiederanlaufspezifikation ohne Realaktivierung' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Spezifikation ohne Worker- oder Alarmaktivierung bestätigen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-033 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'G1 nach dokumentarischer Bestätigung aller fünf Pakete neu bewerten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Die Prüfung bestätigen, ohne Dokumentation mit Nachweis zu verwechseln' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-034 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Erwartete Nachweise vorbereiten, ohne ihre Sammlung zu starten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Erwartete Nachweise bestätigen, ohne ihre Sammlung zu erlauben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-035 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Künftige Sammlung organisieren, ohne Zugriffe oder Tests zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Alle sechs Wege bestätigen, ohne ihre Ausführung zu erlauben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-036 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sechs Einzelentscheide vorbereiten, ohne einen Weg zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Das Register bestätigen, ohne Autorisierungen zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-037 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Mit Dokumentenkontrollen beginnen, Technik zurückstellen und L2 geschlossen halten' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Alle drei Wellen bestätigen, ohne ihre Ausführung zu erlauben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-038 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Zwei Vorbereitungen öffnen, ohne reale Rechte oder Unterlagen zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-039 · V1.0' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beide Akten gemeinsam vorbereiten, ohne ihre Entscheide zu vermischen' })).toBeInTheDocument();
  expect(screen.getByText(/Erfasste Entscheide: 1/)).toBeInTheDocument();
  expect(screen.getByText('Beschreibende Kontrollen')).toBeInTheDocument();
  expect(screen.getAllByText('Nachweis zu erstellen').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Entscheidungskriterien validiert').length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-003 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText(/Entscheid erforderlich/).length).toBeGreaterThan(0);
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
  expect(screen.getByRole('heading', { name: 'Confirm two separate frameworks without opening execution' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-040 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText('Governed decision record')).toHaveLength(85);
  expect(screen.getAllByText('Working framework validated', { selector: 'span' })).toHaveLength(8);
  expect(screen.getAllByText('Human validation recorded')).toHaveLength(3);
  expect(screen.getAllByText('Unavailable')).toHaveLength(9);

  rerender(<DashboardPilotageNavigation language="DE" onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: 'Matrix der validierten Arbeitsrahmen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-01 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-02 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Entscheidungsgrundlage CNS-03 als Arbeitsrahmen validiert' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Zwei getrennte Rahmen bestätigen, ohne ihre Ausführung zu öffnen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'REF-01-DEC-040 · V1.0' })).toBeInTheDocument();
  expect(screen.getAllByText('Governance-konformer Entscheidnachweis')).toHaveLength(85);
  expect(screen.getAllByText('Arbeitsrahmen validiert', { selector: 'span.rounded-full' })).toHaveLength(8);
  expect(screen.getAllByText('Menschliche Validierung dokumentiert')).toHaveLength(3);
  expect(screen.getAllByText('Nicht verfügbar')).toHaveLength(9);
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
