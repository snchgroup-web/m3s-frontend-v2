import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, GitBranch, KeyRound, LockKeyhole, RadioTower } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE GOUVERNÉ DES PREUVES DE SORTIE · REF-01-G1-EVD-002 · V1.0 · 27-08-2026',
    title: 'Préparer les preuves attendues sans lancer leur collecte',
    intro: 'Cette matrice traduit REV-003 V1.0 en six dossiers de preuve contrôlables. Elle nomme des fonctions candidates et des critères d’acceptation, jamais des personnes ni des résultats inexistants.',
    counters: [['Conditions cartographiées', '6/6', 'Cinq preuves et une porte'], ['Lots documentaires', '5/5', 'Cadres réutilisés'], ['Preuves reçues', '0', 'Aucune pièce versée'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { owners: 'Fonctions candidates', evidence: 'Preuves attendues', acceptance: 'Critère d’acceptation', state: 'État actuel' },
    state: 'NON REÇU · NON TESTÉ',
    gateState: 'BLOQUÉ PAR LES CONDITIONS 1 À 5',
    items: [
      ['EVD-02-01 · PostgreSQL et restauration', 'IT & Support · fonction propriétaire des données · Gouvernance', 'Décision de service et d’environnement ; sauvegarde identifiable ; restauration isolée observée ; mesures RPO/RTO et journal de test.', 'Pièces datées, versionnées et rapprochées du périmètre approuvé ; restauration reproductible avec réserves documentées.', 'open'],
      ['EVD-02-02 · Rôles et moindre privilège', 'Organisation & RH · IT & Support · fonctions consommatrices', 'Matrice approuvée des rôles ; titulaires ou collectifs autorisés ; délégations ; tests de visibilité et journal des refus.', 'Chaque droit est relié à une autorité, un périmètre, un test positif et un test de refus sans exposition de donnée personnelle.', 'open'],
      ['EVD-02-03 · Conservation et GED', 'Administration · LEGAL · Organisation & RH · GED', 'Règles approuvées C2/C3/C4 ; durées ; gel ; suppression ; déclassement ; exceptions ; preuves GED et journal de contrôle.', 'Chaque catégorie possède autorité, durée, événement de départ, exception, traitement de fin et preuve conservée.', 'open'],
      ['EVD-02-04 · Migration et retour arrière', 'IT & Support · fonction propriétaire · Gouvernance', 'Source et cible autorisées ; inventaire ; sauvegarde vérifiée ; commandes versionnées ; exécutants ; fenêtre ; répétition isolée et rollback.', 'Scénario synthétique reproductible, contrôles avant/après rapprochés et retour arrière démontré sans donnée réelle.', 'open'],
      ['EVD-02-05 · Outbox, supervision et reprise', 'IT & Support · fonctions consommatrices · Gouvernance', 'Worker et file isolés ; idempotence ; métriques ; seuils ; canaux ; destinataires autorisés ; quarantaine ; rejeu et rapprochement.', 'Test synthétique traçable couvrant succès, doublon, échec, quarantaine, rejeu et arrêt contrôlé sans notification réelle.', 'open'],
      ['EVD-02-06 · Décision éventuelle L2', 'Management & Gouvernance · propriétaires métier · IT & Support', 'Dossiers 01 à 05 acceptés ; écarts résiduels ; risques ; rollback ; responsabilités ; décision explicite, datée et versionnée.', 'Les cinq conditions techniques sont décidées séparément, sans réserve bloquante, puis une autorisation L2 distincte est enregistrée.', 'gate']
    ],
    next: 'Statut : REF-01-DEC-035 confirme REF-01-G1-EVD-002 V1.0. Le protocole candidat COL-002 ci-dessous prépare les circuits sans autoriser leur exécution.',
    boundary: 'Zéro preuve réelle est reçue. Aucun fournisseur, compte, accès, rôle, durée, environnement, sauvegarde, migration, worker, alerte, test, contact, collecte ou source maîtresse n’est créé ou autorisé.'
  },
  EN: {
    eyebrow: 'GOVERNED EXIT-EVIDENCE REGISTER · REF-01-G1-EVD-002 · V1.0 · 27 AUG 2026',
    title: 'Prepare expected evidence without starting collection',
    intro: 'This matrix translates REV-003 V1.0 into six controllable evidence files. It names candidate functions and acceptance criteria, never people or nonexistent results.',
    counters: [['Mapped conditions', '6/6', 'Five evidence files and one gate'], ['Documentary packages', '5/5', 'Frameworks reused'], ['Evidence received', '0', 'No records supplied'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { owners: 'Candidate functions', evidence: 'Expected evidence', acceptance: 'Acceptance criterion', state: 'Current state' },
    state: 'NOT RECEIVED · NOT TESTED',
    gateState: 'BLOCKED BY CONDITIONS 1 TO 5',
    items: [
      ['EVD-02-01 · PostgreSQL and restoration', 'IT & Support · data-owning function · Governance', 'Service and environment decision; identifiable backup; observed isolated restoration; RPO/RTO measurements and test log.', 'Dated and versioned records reconciled to the approved scope; reproducible restoration with documented reservations.', 'open'],
      ['EVD-02-02 · Roles and least privilege', 'Organisation & HR · IT & Support · consuming functions', 'Approved role matrix; authorised owners or collectives; delegations; visibility tests and refusal log.', 'Each right is tied to an authority, scope, positive test and refusal test without exposing personal data.', 'open'],
      ['EVD-02-03 · Retention and DMS', 'Administration · LEGAL · Organisation & HR · DMS', 'Approved C2/C3/C4 rules; periods; hold; deletion; declassification; exceptions; DMS evidence and control log.', 'Each category has an authority, period, starting event, exception, end treatment and retained evidence.', 'open'],
      ['EVD-02-04 · Migration and rollback', 'IT & Support · owning function · Governance', 'Authorised source and target; inventory; verified backup; versioned commands; executors; window; isolated rehearsal and rollback.', 'Reproducible synthetic scenario, reconciled before/after controls and demonstrated rollback without real data.', 'open'],
      ['EVD-02-05 · Outbox, monitoring and recovery', 'IT & Support · consuming functions · Governance', 'Isolated worker and queue; idempotency; metrics; thresholds; channels; authorised recipients; quarantine; replay and reconciliation.', 'Traceable synthetic test covering success, duplicate, failure, quarantine, replay and controlled stop without a real notification.', 'open'],
      ['EVD-02-06 · Possible L2 decision', 'Management & Governance · business owners · IT & Support', 'Accepted files 01 to 05; residual gaps; risks; rollback; responsibilities; explicit dated and versioned decision.', 'All five technical conditions are decided separately without a blocking reservation, then a distinct L2 authorisation is recorded.', 'gate']
    ],
    next: 'Status: REF-01-DEC-035 confirms REF-01-G1-EVD-002 V1.0. Candidate protocol COL-002 below prepares the routes without authorising execution.',
    boundary: 'Zero real evidence is received. No provider, account, access, role, period, environment, backup, migration, worker, alert, test, contact, collection or master source is created or authorised.'
  },
  DE: {
    eyebrow: 'GESTEUERTES REGISTER DER AUSTRITTSNACHWEISE · REF-01-G1-EVD-002 · V1.0 · 27.08.2026',
    title: 'Erwartete Nachweise vorbereiten, ohne ihre Sammlung zu starten',
    intro: 'Diese Matrix überführt REV-003 V1.0 in sechs kontrollierbare Nachweisakten. Sie nennt Kandidatenfunktionen und Abnahmekriterien, niemals Personen oder nicht vorhandene Ergebnisse.',
    counters: [['Abgebildete Bedingungen', '6/6', 'Fünf Nachweise und ein Tor'], ['Dokumentpakete', '5/5', 'Rahmen wiederverwendet'], ['Erhaltene Nachweise', '0', 'Keine Unterlage eingereicht'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { owners: 'Kandidatenfunktionen', evidence: 'Erwartete Nachweise', acceptance: 'Abnahmekriterium', state: 'Aktueller Stand' },
    state: 'NICHT ERHALTEN · NICHT GETESTET',
    gateState: 'DURCH BEDINGUNGEN 1 BIS 5 BLOCKIERT',
    items: [
      ['EVD-02-01 · PostgreSQL und Wiederherstellung', 'IT & Support · datenverantwortliche Funktion · Governance', 'Dienst- und Umgebungsentscheid; identifizierbare Sicherung; beobachtete isolierte Wiederherstellung; RPO/RTO-Messungen und Testjournal.', 'Datierte und versionierte Unterlagen mit genehmigtem Umfang abgeglichen; reproduzierbare Wiederherstellung mit dokumentierten Vorbehalten.', 'open'],
      ['EVD-02-02 · Rollen und geringste Berechtigung', 'Organisation & HR · IT & Support · nutzende Funktionen', 'Genehmigte Rollenmatrix; autorisierte Träger oder Kollektive; Delegationen; Sichtbarkeitstests und Ablehnungsjournal.', 'Jedes Recht ist mit Autorität, Umfang, Positivtest und Ablehnungstest verbunden, ohne Personendaten offenzulegen.', 'open'],
      ['EVD-02-03 · Aufbewahrung und DMS', 'Administration · LEGAL · Organisation & HR · DMS', 'Genehmigte C2/C3/C4-Regeln; Fristen; Sperre; Löschung; Deklassifizierung; Ausnahmen; DMS-Nachweis und Kontrolljournal.', 'Jede Kategorie besitzt Autorität, Frist, Startereignis, Ausnahme, Endbehandlung und aufbewahrten Nachweis.', 'open'],
      ['EVD-02-04 · Migration und Rollback', 'IT & Support · verantwortliche Funktion · Governance', 'Autorisierte Quelle und Ziel; Inventar; geprüfte Sicherung; versionierte Befehle; Ausführende; Fenster; isolierte Probe und Rollback.', 'Reproduzierbares synthetisches Szenario, abgeglichene Vor-/Nachkontrollen und nachgewiesener Rollback ohne Echtdaten.', 'open'],
      ['EVD-02-05 · Outbox, Überwachung und Wiederanlauf', 'IT & Support · nutzende Funktionen · Governance', 'Isolierter Worker und Queue; Idempotenz; Messwerte; Schwellen; Kanäle; autorisierte Empfänger; Quarantäne; Wiederholung und Abstimmung.', 'Nachvollziehbarer synthetischer Test für Erfolg, Duplikat, Fehler, Quarantäne, Wiederholung und kontrollierten Stopp ohne Realbenachrichtigung.', 'open'],
      ['EVD-02-06 · Möglicher L2-Entscheid', 'Management & Governance · Fachverantwortungen · IT & Support', 'Akzeptierte Akten 01 bis 05; Restlücken; Risiken; Rollback; Verantwortungen; ausdrücklicher datierter und versionierter Entscheid.', 'Alle fünf technischen Bedingungen sind einzeln und ohne blockierenden Vorbehalt entschieden; danach wird eine getrennte L2-Autorisierung erfasst.', 'gate']
    ],
    next: 'Stand: REF-01-DEC-035 bestätigt REF-01-G1-EVD-002 V1.0. Das Kandidatenprotokoll COL-002 unten bereitet die Wege vor, ohne die Ausführung zu erlauben.',
    boundary: 'Null Realnachweise sind eingegangen. Kein Anbieter, Konto, Zugriff, Rolle, Frist, Umgebung, Sicherung, Migration, Worker, Alarm, Test, Kontakt, Sammlung oder Masterquelle wird erstellt oder autorisiert.'
  }
};

const ICONS = [DatabaseBackup, KeyRound, Archive, GitBranch, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1ExitEvidenceRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-exit-evidence-register" className="m3s-ref01-g1-exit-evidence-register mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-exit-evidence-register-title">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-exit-evidence-register-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <Archive className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, owners, evidence, acceptance, state], index) => { const Icon = ICONS[index]; return <article key={title} data-testid="ref01-g1-exit-evidence-condition" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-sky-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{title}</h6></div><span className={`w-fit rounded-md border px-2 py-1 text-[10px] font-semibold ${state === 'gate' ? 'border-rose-700/70 bg-rose-950/25 text-rose-100' : 'border-amber-700/70 bg-amber-950/25 text-amber-100'}`}>{state === 'gate' ? t.gateState : t.state}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-300">{t.labels.owners}</dt><dd className="mt-1 text-slate-300">{owners}</dd></div><div><dt className="font-semibold text-sky-300">{t.labels.evidence}</dt><dd className="mt-1 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.acceptance}</dt><dd className="mt-1 text-slate-300">{acceptance}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.state}</dt><dd className="mt-1 text-slate-300">{state === 'gate' ? t.gateState : t.state}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExitEvidenceRegister;
