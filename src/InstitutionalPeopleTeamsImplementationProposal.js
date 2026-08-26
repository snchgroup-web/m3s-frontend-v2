import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DatabaseZap,
  Flag,
  FlaskConical,
  GitPullRequestArrow,
  Layers3,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import InstitutionalPeopleTeamsArchitectureDecision from './InstitutionalPeopleTeamsArchitectureDecision';

const COPY = {
  FR: {
    eyebrow: 'PROPOSITION D’IMPLEMENTATION CONFIRMEE · REF-01-IMP-001 · V1.0 · 26-08-2026',
    title: 'Passer du cadrage confirmé à une exécution contrôlable',
    intro: 'Cette proposition transforme REF-01-ML-001 V0.2 en lots, portes de décision, tests et retours arrière. Elle décrit comment une implémentation pourrait être réalisée ; elle ne l’autorise pas et ne modifie aucun système.',
    counters: [['Lots proposés', '6', 'De l’architecture au pilote réversible'], ['Portes de décision', '4', 'Validation humaine avant chaque élargissement'], ['Familles de tests', '10', 'Contrat, sécurité, concurrence et reprise'], ['Changements appliqués', '0', 'Documentation uniquement']],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-010', version: 'V1.0', status: 'Préparation de la proposition autorisée', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'La préparation documentaire d’une proposition d’implémentation pour REF-01-ML-001 est autorisée à partir du cadrage candidat V0.2 confirmé. La proposition doit rester progressive, testable, réversible et séparée de toute exécution.',
      evidence: 'Instruction explicite de Cheikh dans la session du 26-08-2026 ; REF-01-DEC-009 et le cadrage candidat V0.2 publiés par la PR frontend nº 195 au commit e064c3cc.',
      limit: 'Cette décision autorise uniquement la proposition. Elle n’autorise ni infrastructure, table, migration, API, permission, donnée réelle, déploiement, automatisation, activation de fonctionnalité ou progression.'
    },
    confirmationRecord: {
      id: 'REF-01-DEC-011', version: 'V1.0', status: 'Proposition confirmée', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-IMP-001 V0.1 est confirmé comme base V1.0 : l’architecture candidate PostgreSQL–BigQuery, les six lots, les quatre portes, les dix familles de tests, le déploiement progressif et les retours arrière sont retenus pour poursuivre le cadrage. La préparation documentaire du lot L0 est ouverte.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 ; proposition V0.1 publiée par la PR frontend nº 196 au commit 840b01ad.',
      limit: 'La confirmation autorise uniquement la préparation documentaire de L0. Elle ne crée ni infrastructure, table, migration, API, permission, donnée réelle, déploiement, automatisation, activation de fonctionnalité, source maîtresse ou progression.'
    },
    baselineTitle: 'Socle observé et décision d’architecture à prendre',
    baseline: [
      ['Interface', 'React 19 · frontend M3S', 'Conserver les vues existantes ; ajouter les commandes seulement après autorisation.'],
      ['API', 'Node.js 18 · Express', 'Créer un module REF-01 isolé, sans gonfler server.js ni exposer de route avant les tests.'],
      ['Lecture RH-001', 'GET /api/members-directory · assaini · lecture seule', 'Préserver ce contrat comme source de lecture durant toute la transition.'],
      ['Données actuelles', 'BigQuery · usages opérationnels et analytiques observés', 'Ne pas déduire qu’il garantit à lui seul les transactions événement/version/outbox.']
    ],
    optionTitle: 'Option d’architecture candidate recommandée',
    optionBadge: 'ORIENTATION CONFIRMEE POUR L0',
    option: 'Utiliser un stockage transactionnel PostgreSQL pour le journal, les versions, les périodes et l’outbox ; conserver BigQuery comme projection de lecture et de reporting après propagation contrôlée.',
    optionReason: 'Cette séparation répond au besoin de transaction unique, de concurrence et de retour arrière tout en réutilisant BigQuery. Une option BigQuery seule reste possible à étudier, mais elle doit démontrer les mêmes garanties avant d’être retenue.',
    packagesTitle: 'Six lots d’implémentation proposés',
    packageLabels: { scope: 'Périmètre', deliverable: 'Livrable contrôlé', gate: 'Sortie exigée', rollback: 'Retour arrière' },
    packages: [
      ['L0 · Décision d’architecture', 'Choisir persistance, propriétaire des objets, conventions et séparation des responsabilités.', 'ADR REF-01 signé sur le fond et matrice des responsabilités.', 'G0 validée avant tout code de production.', 'Aucun changement technique à annuler.'],
      ['L1 · Fondations de données', 'Préparer migrations versionnées pour événements, versions, périodes, preuves opaques et outbox.', 'Scripts réversibles et schéma isolé, testés uniquement sur données synthétiques.', 'G1 valide schéma, classification et sauvegarde.', 'Down migration ou suppression du schéma de test sans toucher RH-001.'],
      ['L2 · Commandes et validation', 'Implémenter demande et validation derrière un feature flag désactivé.', 'Service métier, idempotence, contrôle de version et refus par défaut.', 'Tests contrat, concurrence et RBAC réussis.', 'Désactiver le flag et revenir au contrat de lecture seule.'],
      ['L3 · Historique et preuves', 'Ajouter lecture assainie, audit et référence GED opaque.', 'Projection d’historique filtrée selon confidentialité et moindre privilège.', 'Revue sécurité et protection des données réussie.', 'Retirer la route candidate ; aucune pièce GED copiée.'],
      ['L4 · Propagation contrôlée', 'Connecter outbox et projection BigQuery en mode dry-run puis idempotent.', 'Worker observable, reprise d’échec et rapprochement sans doublon.', 'G2 valide tests de rejeu, restauration et cohérence.', 'Arrêter le worker et rejouer depuis le journal validé.'],
      ['L5 · Pilote réversible', 'Déployer désactivé, activer pour un périmètre synthétique puis un pilote explicitement autorisé.', 'Rapport Go/No-Go avec métriques, anomalies et preuves de retour arrière.', 'G3 autorise ou refuse toute activation réelle.', 'Feature flag off, restauration contrôlée et maintien de RH-001 en lecture seule.']
    ],
    gatesTitle: 'Quatre portes de décision',
    gates: [
      ['G0 · Architecture', 'Technologie, source maîtresse, propriétaires et ADR confirmés.'],
      ['G1 · Données & sécurité', 'Schéma, classification, conservation, RBAC, sauvegarde et migration approuvés.'],
      ['G2 · Qualité technique', 'Contrats, concurrence, audit, rejeu, restauration et charge satisfaisants.'],
      ['G3 · Go / No-Go', 'Périmètre pilote, responsables, observation et retour arrière autorisés humainement.']
    ],
    testsTitle: 'Dix familles de tests obligatoires',
    tests: ['Contrats API', 'Transitions métier', 'Idempotence', 'Concurrence et versions', 'RBAC et séparation des rôles', 'Confidentialité et masquage', 'Audit et traçabilité', 'Transaction et rollback', 'Outbox, rejeu et rapprochement', 'Migration, sauvegarde et restauration'],
    rolloutTitle: 'Trajectoire de déploiement proposée',
    rollout: [
      ['1', 'Local isolé', 'Tests unitaires et données synthétiques ; aucun secret ni donnée RH réelle.'],
      ['2', 'Prévisualisation', 'Contrats intégrés, sécurité automatisée et feature flag obligatoirement désactivé.'],
      ['3', 'Staging', 'Répétition migration, sauvegarde, restauration et dry-run de propagation.'],
      ['4', 'Production contrôlée', 'Déploiement désactivé ; activation seulement après G3 et suivi renforcé.']
    ],
    rollbackTitle: 'Plan de retour arrière minimal',
    rollback: ['Feature flag global et par périmètre.', 'Sauvegarde vérifiée avant migration.', 'Migrations descendantes ou compensatoires versionnées.', 'Outbox suspendable sans perdre le journal.', 'Projection BigQuery reconstructible depuis les événements validés.', 'RH-001 lecture seule conservé comme service de continuité.'],
    status: 'Statut : proposition V1.0 confirmée ; L0 achevé ; fondations L1 candidates testées de manière isolée.',
    next: 'Étape suivante : examiner le schéma candidat L1 et les conditions G1 avant toute ouverture de L2.',
    boundary: 'Limite : aucune table de production, API, permission, secret, donnée réelle, migration déployée, automatisation, source maîtresse ou progression créée.'
  },
  EN: {
    eyebrow: 'CONFIRMED IMPLEMENTATION PROPOSAL · REF-01-IMP-001 · V1.0 · 26 AUG 2026',
    title: 'Move from confirmed framing to controllable execution',
    intro: 'This proposal turns REF-01-ML-001 V0.2 into packages, decision gates, tests and rollback paths. It describes how implementation could be delivered; it neither authorises it nor changes any system.',
    counters: [['Proposed packages', '6', 'From architecture to reversible pilot'], ['Decision gates', '4', 'Human review before each expansion'], ['Test families', '10', 'Contract, security, concurrency and recovery'], ['Applied changes', '0', 'Documentation only']],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-010', version: 'V1.0', status: 'Proposal preparation authorised', author: 'Cheikh Ndiaye', date: '26 Aug 2026', decision: 'Documentary preparation of an implementation proposal for REF-01-ML-001 is authorised from confirmed candidate framing V0.2. The proposal must remain incremental, testable, reversible and separate from execution.', evidence: 'Explicit instruction by Cheikh during the 26 Aug 2026 session; REF-01-DEC-009 and candidate framing V0.2 published through frontend PR 195 at commit e064c3cc.', limit: 'This decision authorises the proposal only. It authorises no infrastructure, table, migration, API, permission, real data, deployment, automation, feature activation or progress.' },
    confirmationRecord: { id: 'REF-01-DEC-011', version: 'V1.0', status: 'Proposal confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026', decision: 'REF-01-IMP-001 V0.1 is confirmed as baseline V1.0: the candidate PostgreSQL–BigQuery architecture, six packages, four gates, ten test families, progressive rollout and rollback paths are retained for continued framing. Documentary preparation of L0 is opened.', evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session; proposal V0.1 published through frontend PR 196 at commit 840b01ad.', limit: 'Confirmation authorises documentary preparation of L0 only. It creates no infrastructure, table, migration, API, permission, real data, deployment, automation, feature activation, master source or progress.' },
    baselineTitle: 'Observed baseline and architecture decision to make',
    baseline: [['Interface', 'React 19 · M3S frontend', 'Keep current views; add commands only after authorisation.'], ['API', 'Node.js 18 · Express', 'Create an isolated REF-01 module without expanding server.js or exposing routes before tests.'], ['RH-001 read', 'GET /api/members-directory · sanitised · read-only', 'Preserve this contract as the read source throughout transition.'], ['Current data', 'BigQuery · observed operational and analytical uses', 'Do not infer it alone guarantees event/version/outbox transactions.']],
    optionTitle: 'Recommended candidate architecture option', optionBadge: 'DIRECTION CONFIRMED FOR L0', option: 'Use PostgreSQL transactional storage for the journal, versions, periods and outbox; retain BigQuery as a read and reporting projection after controlled propagation.', optionReason: 'This separation addresses atomic transactions, concurrency and rollback while reusing BigQuery. A BigQuery-only option may still be studied, but must demonstrate the same guarantees before selection.',
    packagesTitle: 'Six proposed implementation packages', packageLabels: { scope: 'Scope', deliverable: 'Controlled deliverable', gate: 'Required exit', rollback: 'Rollback' },
    packages: [['L0 · Architecture decision', 'Choose persistence, object owners, conventions and separation of duties.', 'REF-01 ADR and responsibility matrix.', 'G0 before production code.', 'No technical change to undo.'], ['L1 · Data foundations', 'Prepare versioned migrations for events, versions, periods, opaque evidence and outbox.', 'Reversible isolated schema tested with synthetic data only.', 'G1 validates schema, classification and backup.', 'Down migration or removal of test schema without touching RH-001.'], ['L2 · Commands and validation', 'Implement request and validation behind a disabled feature flag.', 'Business service, idempotency, version check and default denial.', 'Contract, concurrency and RBAC tests pass.', 'Disable flag and return to read-only contract.'], ['L3 · History and evidence', 'Add sanitised reading, audit and opaque DMS reference.', 'History projection filtered by confidentiality and least privilege.', 'Security and data-protection review passes.', 'Remove candidate route; no DMS record copied.'], ['L4 · Controlled propagation', 'Connect outbox and BigQuery projection in dry-run then idempotent mode.', 'Observable worker, failure recovery and duplicate-free reconciliation.', 'G2 validates replay, restoration and consistency.', 'Stop worker and replay from validated journal.'], ['L5 · Reversible pilot', 'Deploy disabled, activate synthetic scope then an explicitly authorised pilot.', 'Go/No-Go report with metrics, anomalies and rollback evidence.', 'G3 authorises or rejects real activation.', 'Feature flag off, controlled restore and RH-001 kept read-only.']],
    gatesTitle: 'Four decision gates', gates: [['G0 · Architecture', 'Technology, master source, owners and ADR confirmed.'], ['G1 · Data & security', 'Schema, classification, retention, RBAC, backup and migration approved.'], ['G2 · Technical quality', 'Contracts, concurrency, audit, replay, restore and load are satisfactory.'], ['G3 · Go / No-Go', 'Pilot scope, owners, observation and rollback authorised by a human.']],
    testsTitle: 'Ten mandatory test families', tests: ['API contracts', 'Business transitions', 'Idempotency', 'Concurrency and versions', 'RBAC and separation of duties', 'Confidentiality and masking', 'Audit and traceability', 'Transaction and rollback', 'Outbox, replay and reconciliation', 'Migration, backup and restoration'],
    rolloutTitle: 'Proposed deployment path', rollout: [['1', 'Isolated local', 'Unit tests and synthetic data; no secret or real HR data.'], ['2', 'Preview', 'Integrated contracts, automated security and feature flag forced off.'], ['3', 'Staging', 'Migration, backup, restore and propagation dry-run rehearsal.'], ['4', 'Controlled production', 'Deploy disabled; activate only after G3 with enhanced monitoring.']],
    rollbackTitle: 'Minimum rollback plan', rollback: ['Global and scope feature flags.', 'Verified backup before migration.', 'Versioned down or compensating migrations.', 'Suspendable outbox without losing the journal.', 'BigQuery projection rebuildable from validated events.', 'Read-only RH-001 retained for continuity.'],
    status: 'Status: proposal V1.0 confirmed; L0 completed; candidate L1 foundations tested in isolation.', next: 'Next step: review the candidate L1 schema and G1 conditions before opening L2.', boundary: 'Boundary: no production table, API, permission, secret, real data, deployed migration, automation, master source or progress is created.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER UMSETZUNGSVORSCHLAG · REF-01-IMP-001 · V1.0 · 26.08.2026',
    title: 'Von der bestätigten Ausgestaltung zu kontrollierbarer Ausführung',
    intro: 'Dieser Vorschlag übersetzt REF-01-ML-001 V0.2 in Lose, Entscheidpunkte, Tests und Rückkehrwege. Er beschreibt eine mögliche Umsetzung, autorisiert sie jedoch nicht und ändert kein System.',
    counters: [['Vorgeschlagene Lose', '6', 'Von Architektur bis reversiblem Piloten'], ['Entscheidpunkte', '4', 'Menschliche Prüfung vor jeder Erweiterung'], ['Testfamilien', '10', 'Vertrag, Sicherheit, Konkurrenz und Wiederherstellung'], ['Angewendete Änderungen', '0', 'Nur Dokumentation']],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-010', version: 'V1.0', status: 'Vorbereitung des Vorschlags autorisiert', author: 'Cheikh Ndiaye', date: '26.08.2026', decision: 'Die dokumentarische Vorbereitung eines Umsetzungsvorschlags für REF-01-ML-001 ist auf Grundlage der bestätigten Kandidatenausgestaltung V0.2 autorisiert. Der Vorschlag muss schrittweise, testbar, reversibel und von jeder Ausführung getrennt bleiben.', evidence: 'Ausdrückliche Anweisung durch Cheikh in der Sitzung vom 26.08.2026; REF-01-DEC-009 und Kandidatenausgestaltung V0.2 mit Frontend-PR Nr. 195 am Commit e064c3cc veröffentlicht.', limit: 'Dieser Entscheid autorisiert nur den Vorschlag. Er autorisiert keine Infrastruktur, Tabelle, Migration, API, Berechtigung, realen Daten, Bereitstellung, Automatisierung, Funktionsaktivierung oder Fortschritt.' },
    confirmationRecord: { id: 'REF-01-DEC-011', version: 'V1.0', status: 'Vorschlag bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026', decision: 'REF-01-IMP-001 V0.1 ist als Basis V1.0 bestätigt: PostgreSQL–BigQuery-Kandidatenarchitektur, sechs Lose, vier Tore, zehn Testfamilien, stufenweise Bereitstellung und Rückkehrwege werden für die weitere Ausgestaltung festgehalten. Die dokumentarische Vorbereitung von L0 ist geöffnet.', evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 26.08.2026; Vorschlag V0.1 mit Frontend-PR Nr. 196 am Commit 840b01ad veröffentlicht.', limit: 'Die Bestätigung autorisiert nur die dokumentarische Vorbereitung von L0. Sie erstellt keine Infrastruktur, Tabelle, Migration, API, Berechtigung, realen Daten, Bereitstellung, Automatisierung, Funktionsaktivierung, Masterquelle oder Fortschritt.' },
    baselineTitle: 'Beobachtete Basis und offener Architekturentscheid',
    baseline: [['Oberfläche', 'React 19 · M3S-Frontend', 'Bestehende Ansichten bewahren; Befehle erst nach Autorisierung ergänzen.'], ['API', 'Node.js 18 · Express', 'Isoliertes REF-01-Modul schaffen, ohne server.js aufzublähen oder Routen vor Tests zu öffnen.'], ['RH-001-Lesen', 'GET /api/members-directory · bereinigt · nur Lesen', 'Diesen Vertrag während der Umstellung als Lesequelle bewahren.'], ['Aktuelle Daten', 'BigQuery · beobachtete operative und analytische Nutzung', 'Nicht ableiten, dass es allein Ereignis-/Versions-/Outbox-Transaktionen garantiert.']],
    optionTitle: 'Empfohlene Kandidatenoption für die Architektur', optionBadge: 'AUSRICHTUNG FÜR L0 BESTÄTIGT', option: 'PostgreSQL als Transaktionsspeicher für Journal, Versionen, Perioden und Outbox verwenden; BigQuery nach kontrollierter Weitergabe als Lese- und Reportingprojektion behalten.', optionReason: 'Diese Trennung deckt atomare Transaktionen, Konkurrenz und Rückkehr ab und nutzt BigQuery weiter. Eine reine BigQuery-Option kann untersucht werden, muss aber vor Auswahl dieselben Garantien belegen.',
    packagesTitle: 'Sechs vorgeschlagene Umsetzungslose', packageLabels: { scope: 'Umfang', deliverable: 'Kontrolliertes Ergebnis', gate: 'Erforderlicher Ausgang', rollback: 'Rückkehr' },
    packages: [['L0 · Architekturentscheid', 'Persistenz, Objektverantwortung, Konventionen und Funktionstrennung wählen.', 'REF-01-ADR und Verantwortungsmatrix.', 'G0 vor produktivem Code.', 'Keine technische Änderung rückgängig zu machen.'], ['L1 · Datengrundlagen', 'Versionierte Migrationen für Ereignisse, Versionen, Perioden, opake Nachweise und Outbox vorbereiten.', 'Reversibles isoliertes Schema nur mit synthetischen Daten getestet.', 'G1 validiert Schema, Klassifizierung und Sicherung.', 'Down-Migration oder Entfernen des Testschemas ohne RH-001 zu berühren.'], ['L2 · Befehle und Validierung', 'Antrag und Validierung hinter deaktiviertem Feature Flag umsetzen.', 'Fachdienst, Idempotenz, Versionsprüfung und standardmäßige Ablehnung.', 'Vertrags-, Konkurrenz- und RBAC-Tests erfolgreich.', 'Flag deaktivieren und zum Nur-Lese-Vertrag zurückkehren.'], ['L3 · Historie und Nachweise', 'Bereinigtes Lesen, Audit und opake DMS-Referenz ergänzen.', 'Nach Vertraulichkeit und geringster Berechtigung gefilterte Historie.', 'Sicherheits- und Datenschutzprüfung erfolgreich.', 'Kandidatenroute entfernen; keine DMS-Unterlage kopiert.'], ['L4 · Kontrollierte Weitergabe', 'Outbox und BigQuery-Projektion zuerst im Dry-run, dann idempotent verbinden.', 'Beobachtbarer Worker, Fehlerwiederaufnahme und Abgleich ohne Duplikat.', 'G2 validiert Wiederholung, Wiederherstellung und Konsistenz.', 'Worker stoppen und aus validiertem Journal erneut abspielen.'], ['L5 · Reversibler Pilot', 'Deaktiviert bereitstellen, synthetischen Umfang und dann ausdrücklich autorisierten Pilot aktivieren.', 'Go/No-Go-Bericht mit Kennzahlen, Anomalien und Rückkehrnachweisen.', 'G3 autorisiert oder verweigert reale Aktivierung.', 'Feature Flag aus, kontrollierte Wiederherstellung und RH-001 nur lesend.']],
    gatesTitle: 'Vier Entscheidpunkte', gates: [['G0 · Architektur', 'Technologie, Masterquelle, Verantwortungen und ADR bestätigt.'], ['G1 · Daten & Sicherheit', 'Schema, Klassifizierung, Aufbewahrung, RBAC, Sicherung und Migration genehmigt.'], ['G2 · Technische Qualität', 'Verträge, Konkurrenz, Audit, Wiederholung, Wiederherstellung und Last zufriedenstellend.'], ['G3 · Go / No-Go', 'Pilotumfang, Verantwortungen, Beobachtung und Rückkehr menschlich autorisiert.']],
    testsTitle: 'Zehn verpflichtende Testfamilien', tests: ['API-Verträge', 'Fachübergänge', 'Idempotenz', 'Konkurrenz und Versionen', 'RBAC und Funktionstrennung', 'Vertraulichkeit und Maskierung', 'Audit und Rückverfolgbarkeit', 'Transaktion und Rollback', 'Outbox, Wiederholung und Abgleich', 'Migration, Sicherung und Wiederherstellung'],
    rolloutTitle: 'Vorgeschlagener Bereitstellungsweg', rollout: [['1', 'Isoliert lokal', 'Unit-Tests und synthetische Daten; keine Geheimnisse oder realen Personaldaten.'], ['2', 'Vorschau', 'Integrierte Verträge, automatisierte Sicherheit und Feature Flag zwingend aus.'], ['3', 'Staging', 'Migration, Sicherung, Wiederherstellung und Dry-run der Weitergabe proben.'], ['4', 'Kontrollierte Produktion', 'Deaktiviert bereitstellen; erst nach G3 mit verstärkter Überwachung aktivieren.']],
    rollbackTitle: 'Minimaler Rückkehrplan', rollback: ['Globales und bereichsbezogenes Feature Flag.', 'Geprüfte Sicherung vor Migration.', 'Versionierte Down- oder Ausgleichsmigrationen.', 'Anhaltbare Outbox ohne Verlust des Journals.', 'BigQuery-Projektion aus validierten Ereignissen rekonstruierbar.', 'RH-001 nur lesend für Kontinuität bewahrt.'],
    status: 'Stand: Vorschlag V1.0 bestätigt; L0 abgeschlossen; Kandidatengrundlagen L1 isoliert geprüft.', next: 'Nächster Schritt: Kandidatenschema L1 und G1-Bedingungen vor Öffnung von L2 prüfen.', boundary: 'Grenze: Keine Produktionstabelle, API, Berechtigung, Geheimnisse, realen Daten, bereitgestellte Migration, Automatisierung, Masterquelle oder Fortschrittsquote wird erstellt.'
  }
};

const InstitutionalPeopleTeamsImplementationProposal = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [Layers3, Flag, FlaskConical, ShieldCheck];

  return (
    <section id="institutional-ref01-implementation-proposal" className="mt-5 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-implementation-proposal-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-implementation-proposal-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <GitPullRequestArrow className="shrink-0 text-sky-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 3 ? 'text-amber-300' : 'text-sky-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} className="mt-4" />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.confirmationRecord} className="mt-3" />

      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-implementation-baseline-title">
        <div className="flex items-center gap-2"><DatabaseZap className="text-cyan-300" size={18} aria-hidden="true" /><h6 id="ref01-implementation-baseline-title" className="text-sm font-semibold text-slate-100">{t.baselineTitle}</h6></div>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.baseline.map(([label, value, rule]) => <article key={label} className="m3s-raised p-3" data-testid="ref01-implementation-baseline"><p className="text-xs font-semibold text-cyan-300">{label}</p><p className="mt-2 text-sm font-semibold text-slate-100">{value}</p><p className="mt-2 text-xs leading-5 text-slate-400">{rule}</p></article>)}</div>
        <article className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{t.optionTitle}</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/30 px-2 py-1 text-xs font-semibold text-emerald-200">{t.optionBadge}</span></div><p className="mt-3 text-sm font-semibold leading-6 text-emerald-100">{t.option}</p><p className="mt-2 text-xs leading-5 text-slate-400">{t.optionReason}</p></article>
      </section>

      <section className="mt-4" aria-labelledby="ref01-implementation-packages-title">
        <h6 id="ref01-implementation-packages-title" className="text-sm font-semibold text-slate-100">{t.packagesTitle}</h6>
        <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.packages.map(([title, scope, deliverable, gate, rollback]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-implementation-package"><h6 className="text-sm font-semibold text-sky-200">{title}</h6><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-slate-400">{t.packageLabels.scope}</dt><dd className="mt-1 text-slate-300">{scope}</dd></div><div><dt className="font-semibold text-slate-400">{t.packageLabels.deliverable}</dt><dd className="mt-1 text-slate-300">{deliverable}</dd></div><div><dt className="font-semibold text-emerald-300">{t.packageLabels.gate}</dt><dd className="mt-1 text-slate-300">{gate}</dd></div><div><dt className="font-semibold text-amber-300">{t.packageLabels.rollback}</dt><dd className="mt-1 text-slate-300">{rollback}</dd></div></dl></article>)}</div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-implementation-gates-title"><div className="flex items-center gap-2"><Flag className="text-violet-300" size={18} aria-hidden="true" /><h6 id="ref01-implementation-gates-title" className="text-sm font-semibold text-slate-100">{t.gatesTitle}</h6></div><ol className="mt-3 space-y-3">{t.gates.map(([title, detail]) => <li key={title} className="m3s-raised p-3" data-testid="ref01-implementation-gate"><p className="text-sm font-semibold text-violet-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></li>)}</ol></section>
        <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-implementation-tests-title"><div className="flex items-center gap-2"><FlaskConical className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-implementation-tests-title" className="text-sm font-semibold text-slate-100">{t.testsTitle}</h6></div><ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{t.tests.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-implementation-test"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span><span className="font-semibold">{index + 1}. </span>{item}</span></li>)}</ol></section>
      </div>

      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-implementation-rollout-title"><h6 id="ref01-implementation-rollout-title" className="text-sm font-semibold text-slate-100">{t.rolloutTitle}</h6><ol className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-4">{t.rollout.map(([number, title, detail]) => <li key={number} className="m3s-raised p-3" data-testid="ref01-implementation-rollout"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-sky-900/70 text-xs font-semibold text-sky-100">{number}</span><p className="mt-3 text-sm font-semibold text-slate-100">{title}</p><p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p></li>)}</ol></section>

      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-implementation-rollback-title"><div className="flex items-center gap-2"><RotateCcw className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-implementation-rollback-title" className="text-sm font-semibold text-slate-100">{t.rollbackTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">{t.rollback.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{item}</li>)}</ul></section>

      <p className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p>
      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <InstitutionalPeopleTeamsArchitectureDecision language={language} />
    </section>
  );
};

export default InstitutionalPeopleTeamsImplementationProposal;
