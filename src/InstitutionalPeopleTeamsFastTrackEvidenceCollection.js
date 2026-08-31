import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, FileCheck2, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const PACKAGES = [
  {
    id: 'COL-EXC-01',
    family: 'EXC-01',
    title: text('Service PostgreSQL et environnements', 'PostgreSQL service and environments', 'PostgreSQL-Dienst und Umgebungen'),
    owner: text('IT & Support', 'IT & Support', 'IT & Support'),
    evidence: [
      text('Compte 2SG autorisé et offre fournisseur retenue', 'Authorised 2SG account and selected provider offer', 'Autorisiertes 2SG-Konto und ausgewähltes Anbieterangebot'),
      text('Région d’hébergement et séparation des environnements', 'Hosting region and environment separation', 'Hosting-Region und Umgebungstrennung'),
      text('Responsable nominatif et mandat d’exécution', 'Named owner and execution mandate', 'Namentliche Verantwortung und Ausführungsmandat')
    ]
  },
  {
    id: 'COL-EXC-02',
    family: 'EXC-02',
    title: text('Continuité, sauvegarde et restauration', 'Continuity, backup and restoration', 'Kontinuität, Sicherung und Wiederherstellung'),
    owner: text('IT & Support · Administration / GED', 'IT & Support · Administration / DMS', 'IT & Support · Verwaltung / DMS'),
    evidence: [
      text('Rapport de sauvegarde chiffrée et règle de conservation', 'Encrypted-backup report and retention rule', 'Bericht zur verschlüsselten Sicherung und Aufbewahrungsregel'),
      text('Journal de restauration synthétique et temps mesuré', 'Synthetic-restore log and measured time', 'Protokoll der synthetischen Wiederherstellung und gemessene Zeit'),
      text('Référence GED gouvernée et résultat du contrôle', 'Governed DMS reference and control result', 'Gesteuerte DMS-Referenz und Kontrollergebnis')
    ]
  },
  {
    id: 'COL-EXC-03',
    family: 'EXC-03',
    title: text('Identité et fenêtre de migration', 'Identity and migration window', 'Identität und Migrationsfenster'),
    owner: text('IT & Support · autorité à deux personnes', 'IT & Support · two-person authority', 'IT & Support · Zwei-Personen-Autorität'),
    evidence: [
      text('Identifiant technique dédié et droits minimaux', 'Dedicated technical identifier and least privilege', 'Eigene technische Kennung und geringste Berechtigung'),
      text('Deux autorisations signées et journal horodaté', 'Two signed approvals and timestamped log', 'Zwei unterzeichnete Freigaben und Zeitprotokoll'),
      text('Assertions, règle d’arrêt et autorité de retour arrière', 'Assertions, stop rule and rollback authority', 'Prüfungen, Stoppregel und Rollback-Befugnis')
    ]
  },
  {
    id: 'COL-EXC-04',
    family: 'EXC-04',
    title: text('Références GED gouvernées', 'Governed DMS references', 'Gesteuerte DMS-Referenzen'),
    owner: text('Administration / GED · IT & Support', 'Administration / DMS · IT & Support', 'Verwaltung / DMS · IT & Support'),
    evidence: [
      text('Deux références GED créées après autorisation', 'Two DMS references created after authorisation', 'Zwei nach Freigabe erstellte DMS-Referenzen'),
      text('Droits d’accès et règle de conservation applicables', 'Applicable access rights and retention rule', 'Anwendbare Zugriffsrechte und Aufbewahrungsregel'),
      text('Identifiants opaques et journal d’audit', 'Opaque identifiers and audit log', 'Opake Kennungen und Auditprotokoll')
    ]
  },
  {
    id: 'COL-EXC-05',
    family: 'EXC-05',
    title: text('Outbox, reprise et supervision', 'Outbox, recovery and monitoring', 'Outbox, Wiederanlauf und Überwachung'),
    owner: text('IT & Support · fonctions destinataires', 'IT & Support · recipient functions', 'IT & Support · Empfängerfunktionen'),
    evidence: [
      text('Contrat d’événement, titulaire et destinataires autorisés', 'Event contract, holder and authorised recipients', 'Ereignisvertrag, Träger und autorisierte Empfänger'),
      text('Test d’idempotence, métriques et seuils d’alerte', 'Idempotency test, metrics and alert thresholds', 'Idempotenztest, Metriken und Alarmschwellen'),
      text('Procédure de quarantaine et de rejeu contrôlé', 'Quarantine and controlled replay procedure', 'Verfahren für Quarantäne und kontrollierte Wiederholung')
    ]
  }
];

const GAP_STATUS_STYLES = {
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const EVIDENCE_GAPS = [
  {
    id: 'PG-03', family: 'COL-EXC-01', status: 'partial',
    field: text('Titulaire PostgreSQL', 'PostgreSQL holder', 'PostgreSQL-Träger'),
    current: text('IT & Support est la fonction pilote candidate ; aucun exécutant nominatif ni mandat n’est prouvé.', 'IT & Support is the candidate lead function; no named operator or mandate is evidenced.', 'IT & Support ist die federführende Kandidatenfunktion; keine namentliche Ausführung oder kein Mandat ist belegt.'),
    expected: text('Identifiant institutionnel, mandat d’exécution, portée, durée et validation de gouvernance.', 'Institutional identifier, execution mandate, scope, duration and governance approval.', 'Institutionelle Kennung, Ausführungsmandat, Umfang, Dauer und Governance-Freigabe.')
  },
  {
    id: 'PG-04', family: 'COL-EXC-02', status: 'open',
    field: text('RPO / RTO', 'RPO / RTO', 'RPO / RTO'),
    current: text('RPO ≤ 24 h et RTO ≤ 8 h sont retenus comme paramètres documentaires ; aucun résultat n’est mesuré.', 'RPO ≤ 24 h and RTO ≤ 8 h are retained as documentary parameters; no result is measured.', 'RPO ≤ 24 Std. und RTO ≤ 8 Std. sind als Dokumentationsparameter festgehalten; kein Ergebnis ist gemessen.'),
    expected: text('Décision d’applicabilité, protocole de mesure, résultat horodaté et validation IT.', 'Applicability decision, measurement protocol, timestamped result and IT validation.', 'Anwendbarkeitsentscheid, Messprotokoll, datiertes Ergebnis und IT-Validierung.')
  },
  {
    id: 'PG-05', family: 'COL-EXC-02', status: 'open',
    field: text('Sauvegarde', 'Backup', 'Sicherung'),
    current: text('Une sauvegarde quotidienne chiffrée conservée 30 jours est prévue ; aucune sauvegarde PostgreSQL n’est produite.', 'An encrypted daily backup retained for 30 days is planned; no PostgreSQL backup is produced.', 'Eine täglich verschlüsselte, 30 Tage aufbewahrte Sicherung ist vorgesehen; keine PostgreSQL-Sicherung ist erstellt.'),
    expected: text('Rapport de sauvegarde, chiffrement, durée de conservation, horodatage et contrôle d’intégrité.', 'Backup report, encryption, retention period, timestamp and integrity check.', 'Sicherungsbericht, Verschlüsselung, Aufbewahrungsdauer, Zeitstempel und Integritätskontrolle.')
  },
  {
    id: 'PG-06', family: 'COL-EXC-02', status: 'partial',
    field: text('Restauration testée', 'Tested restoration', 'Geprüfte Wiederherstellung'),
    current: text('La migration descendante synthétique est testée ; aucune restauration depuis une sauvegarde n’est démontrée.', 'The synthetic down migration is tested; no restoration from a backup is demonstrated.', 'Die synthetische Down-Migration ist geprüft; keine Wiederherstellung aus einer Sicherung ist nachgewiesen.'),
    expected: text('Journal de restauration synthétique depuis sauvegarde, temps mesuré, assertions et résultat signé.', 'Synthetic restore-from-backup log, measured time, assertions and signed result.', 'Protokoll einer synthetischen Wiederherstellung aus Sicherung, Messzeit, Prüfungen und signiertes Ergebnis.')
  },
  {
    id: 'MIG-03', family: 'COL-EXC-03', status: 'partial',
    field: text('Identité d’exécution', 'Execution identity', 'Ausführungsidentität'),
    current: text('Une identité technique dédiée et limitée est retenue en principe ; aucune identité autorisée n’existe.', 'A dedicated least-privilege technical identity is retained in principle; no authorised identity exists.', 'Eine eigene, minimal berechtigte technische Identität ist grundsätzlich festgehalten; keine autorisierte Identität besteht.'),
    expected: text('Identifiant technique, droits minimaux, deux autorisations, expiration et journal de contrôle.', 'Technical identifier, least privileges, two approvals, expiry and control log.', 'Technische Kennung, Minimalrechte, zwei Freigaben, Ablauf und Kontrollprotokoll.')
  },
  {
    id: 'MIG-05', family: 'COL-EXC-03', status: 'open',
    field: text('Fenêtre de migration', 'Migration window', 'Migrationsfenster'),
    current: text('Une fenêtre documentaire de 60 min avec arrêt à 45 min est retenue ; aucun créneau n’est autorisé.', 'A documentary 60-minute window with a stop at 45 minutes is retained; no slot is authorised.', 'Ein dokumentiertes 60-Minuten-Fenster mit Stopp nach 45 Minuten ist festgehalten; kein Termin ist autorisiert.'),
    expected: text('Créneau daté, période non critique, autorités à deux personnes, règle d’arrêt et retour arrière.', 'Dated slot, off-peak period, two-person authorities, stop rule and rollback.', 'Datierter Termin, unkritische Zeit, Zwei-Personen-Autorität, Stoppregel und Rollback.')
  },
  {
    id: 'MIG-07', family: 'COL-EXC-04', status: 'partial',
    field: text('Preuve GED de migration', 'Migration DMS evidence', 'Migrationsnachweis im DMS'),
    current: text('Les preuves techniques existent dans Git ; aucune référence GED gouvernée finale n’est créée.', 'Technical evidence exists in Git; no final governed DMS reference is created.', 'Technische Nachweise liegen in Git; keine endgültige gesteuerte DMS-Referenz ist erstellt.'),
    expected: text('Référence GED opaque, droits d’accès, règle de conservation, version et journal d’audit.', 'Opaque DMS reference, access rights, retention rule, version and audit log.', 'Opake DMS-Referenz, Zugriffsrechte, Aufbewahrungsregel, Version und Auditprotokoll.')
  },
  {
    id: 'OUT-02', family: 'COL-EXC-05', status: 'partial',
    field: text('Titulaire Outbox', 'Outbox holder', 'Outbox-Träger'),
    current: text('IT & Support est la fonction responsable candidate ; aucun titulaire d’exécution n’est nommé.', 'IT & Support is the candidate responsible function; no execution holder is named.', 'IT & Support ist die verantwortliche Kandidatenfunktion; kein Ausführungsträger ist benannt.'),
    expected: text('Titulaire nommé, mandat, suppléance, périmètre, expiration et validation de gouvernance.', 'Named holder, mandate, deputy, scope, expiry and governance approval.', 'Benannter Träger, Mandat, Stellvertretung, Umfang, Ablauf und Governance-Freigabe.')
  },
  {
    id: 'OUT-03', family: 'COL-EXC-05', status: 'partial',
    field: text('Destinataires', 'Recipients', 'Empfänger'),
    current: text('Seul le topic synthétique ref01.synthetic.created est testé ; aucun destinataire réel n’est désigné.', 'Only the synthetic ref01.synthetic.created topic is tested; no real recipient is designated.', 'Nur das synthetische Topic ref01.synthetic.created ist geprüft; kein realer Empfänger ist bestimmt.'),
    expected: text('Contrat d’événement, liste autorisée, finalité, niveau de sensibilité et accusé de prise en charge.', 'Event contract, allowlist, purpose, sensitivity level and acknowledgement.', 'Ereignisvertrag, Freigabeliste, Zweck, Sensibilitätsstufe und Empfangsbestätigung.')
  },
  {
    id: 'OUT-04', family: 'COL-EXC-05', status: 'open',
    field: text('Worker', 'Worker', 'Worker'),
    current: text('Le worker doit rester désactivé par défaut ; aucun worker, ordonnanceur ou hook n’est implémenté.', 'The worker must remain disabled by default; no worker, scheduler or hook is implemented.', 'Der Worker muss standardmässig deaktiviert bleiben; kein Worker, Scheduler oder Hook ist implementiert.'),
    expected: text('Conception validée, preuve de désactivation, idempotence, quarantaine et test isolé autorisé.', 'Approved design, disabled-state evidence, idempotency, quarantine and authorised isolated test.', 'Validiertes Design, Nachweis der Deaktivierung, Idempotenz, Quarantäne und autorisierter isolierter Test.')
  },
  {
    id: 'OUT-05', family: 'COL-EXC-05', status: 'partial',
    field: text('Délais et tentatives', 'Delays and attempts', 'Verzögerungen und Versuche'),
    current: text('Les reprises 1 / 5 / 15 / 60 min puis quarantaine sont retenues documentairement ; elles ne sont pas testées.', 'Retries at 1 / 5 / 15 / 60 min then quarantine are retained documentarily; they are not tested.', 'Wiederholungen nach 1 / 5 / 15 / 60 Min. mit anschliessender Quarantäne sind dokumentarisch festgehalten; sie sind nicht geprüft.'),
    expected: text('Configuration versionnée, plafond, journal des tentatives, test d’idempotence et résultat de quarantaine.', 'Versioned configuration, ceiling, attempt log, idempotency test and quarantine result.', 'Versionierte Konfiguration, Obergrenze, Versuchsprotokoll, Idempotenztest und Quarantäneergebnis.')
  },
  {
    id: 'OUT-06', family: 'COL-EXC-05', status: 'open',
    field: text('Métriques et seuils', 'Metrics and thresholds', 'Metriken und Schwellen'),
    current: text('Alerte au premier échec ou après 15 min retenue documentairement ; aucune métrique ni alerte n’est configurée.', 'Alert on first failure or after 15 minutes is retained documentarily; no metric or alert is configured.', 'Alarm beim ersten Fehler oder nach 15 Minuten ist dokumentarisch festgehalten; keine Metrik oder Warnung ist konfiguriert.'),
    expected: text('Catalogue de métriques, seuils approuvés, destinataire d’alerte, test et preuve de récupération.', 'Metric catalogue, approved thresholds, alert recipient, test and recovery evidence.', 'Metrikkatalog, genehmigte Schwellen, Alarmempfänger, Test und Wiederherstellungsnachweis.')
  },
  {
    id: 'OUT-07', family: 'COL-EXC-04', status: 'partial',
    field: text('Dépôt GED Outbox', 'Outbox DMS repository', 'Outbox-Ablage im DMS'),
    current: text('Les preuves techniques existent dans Git ; aucune référence GED de clôture n’est créée.', 'Technical evidence exists in Git; no closing DMS reference is created.', 'Technische Nachweise liegen in Git; keine abschliessende DMS-Referenz ist erstellt.'),
    expected: text('Référence GED opaque, droits d’accès, conservation, contrat d’événement et journal d’audit.', 'Opaque DMS reference, access rights, retention, event contract and audit log.', 'Opake DMS-Referenz, Zugriffsrechte, Aufbewahrung, Ereignisvertrag und Auditprotokoll.')
  }
];

const COPY = {
  FR: {
    eyebrow: 'COLLECTE BORNÉE AUTORISÉE · REF-01-G1-COL-003 · V1.1 · 31-08-2026',
    title: 'Cinq dossiers de preuves ouverts à la collecte contrôlée',
    intro: 'DEC-078 autorise la collecte documentaire interne des treize preuves manquantes déjà cadrées par COL-003 V1.0. Le périmètre reste limité à la lecture, l’indexation, le contrôle et la traçabilité ; aucun contact externe, accès réel, test ou L2 n’est ouvert.',
    counters: [['Dossiers autorisés', '5/5', 'COL-EXC-01 à COL-EXC-05'], ['Décisions enregistrées', '2', 'DEC-068 et DEC-078'], ['Pièces reçues', '0/13', 'Contrôle non encore effectué'], ['Autorisations L2', '0', 'G1 reste ouverte']],
    labels: { owner: 'Fonctions responsables candidates', evidence: 'Pièces attendues' },
    gapEyebrow: 'COL-003 · 5 OUVERTES + 8 PARTIELLES',
    gapTitle: 'Registre des treize écarts probatoires',
    gapIntro: 'Les cinq valeurs ouvertes et huit valeurs partielles sont reliées aux dossiers COL-003 sans modifier leur qualification. DEC-078 ouvre leur collecte bornée ; chaque valeur restera inchangée jusqu’au contrôle effectif d’une preuve recevable.',
    gapCounters: [['Écarts suivis', '13', 'Cinq familles'], ['Valeurs partielles', '8', 'Preuve incomplète'], ['Valeurs ouvertes', '5', 'Preuve absente'], ['Pièces reçues', '0/13', 'Collecte autorisée']],
    gapLabels: { family: 'Dossier', current: 'État contrôlé', expected: 'Preuve manquante', owner: 'Fonctions candidates' },
    gapStatuses: { partial: 'PARTIEL', open: 'OUVERT' },
    gapStatus: 'COLLECTE AUTORISÉE',
    status: 'AUTORISÉ · À COLLECTER',
    collectionTitle: 'Périmètre exécutoire de la collecte bornée',
    collectionAllowed: ['Lire les sources internes déjà accessibles dans M3S, Git et les journaux gouvernés.', 'Indexer les pièces par référence opaque, provenance, date et version sans publier leur contenu sensible.', 'Consulter les sources publiques officielles utiles à la qualification, sans compte ni prise de contact.', 'Contrôler séparément recevabilité, portée et fraîcheur avant toute modification d’une valeur.'],
    stopTitle: 'Arrêt obligatoire et arbitrage distinct',
    collectionStops: ['Identité, mandat, coordonnée ou document personnel non déjà autorisé.', 'Envoi de REQ-002, contact d’un destinataire, ouverture de compte ou achat.', 'Secret, identifiant, accès C3/C4/C5, connexion ou opération sur un système réel.', 'Sauvegarde, restauration, migration, worker, alerte ou test hors bac à sable.', 'Publication de preuve sensible, décision de conformité, fermeture G1 ou ouverture L2.'],
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'COL-003 V1.1 ouvre la collecte interne et documentaire des treize écarts. REQ-002 V1.0 reste sans envoi et les profils, noms, canaux, accès, tests réels et L2 restent fermés.',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 confirmé comme plan documentaire', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-COL-003 V0.1 est confirmé sans amendement et promu en V1.0 comme plan documentaire des cinq dossiers de preuves COL-EXC-01 à COL-EXC-05.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « Je confirme REF-01-G1-COL-003 V0.1 comme plan documentaire des cinq dossiers de preuves. »', limit: 'La décision valide uniquement l’organisation documentaire. Elle n’autorise aucun contact, envoi, collecte réelle, transmission sensible, compte, infrastructure, connexion, test, dépense ou action L2 ; G1 reste ouverte.' },
    authorisationRecord: { id: 'REF-01-DEC-078', version: 'V1.0', status: 'Collecte probatoire interne et bornée autorisée', author: 'Cheikh Ndiaye', date: '31-08-2026', decision: 'REF-01-G1-COL-003 V1.0 est amendé et promu en V1.1. La collecte contrôlée des treize preuves manquantes est autorisée dans les cinq dossiers COL-EXC-01 à COL-EXC-05, uniquement dans le périmètre exécutoire affiché.', evidence: 'Autorisation explicite de Cheikh dans la session du 31-08-2026 : « autorisé la collecte, continue » ; registre trilingue des treize écarts publié par la PR frontend nº 276.', limit: 'La décision autorise l’inventaire documentaire interne et la consultation de sources publiques officielles. Elle n’autorise aucun envoi, contact, identité nouvelle, donnée sensible non autorisée, compte, achat, accès réel, connexion, test réel, changement de valeur sans contrôle, fermeture G1 ou ouverture L2.' },
    boundary: 'La collecte est ouverte, mais aucune preuve n’est reçue ou acceptée par défaut. Chaque pièce doit être sourcée, contrôlée et reliée à un seul écart avant toute requalification.'
  },
  EN: {
    eyebrow: 'BOUNDED COLLECTION AUTHORISED · REF-01-G1-COL-003 · V1.1 · 31 AUG 2026',
    title: 'Five evidence files open for controlled collection',
    intro: 'DEC-078 authorises internal documentary collection of the thirteen missing evidence items already framed by COL-003 V1.0. Scope remains limited to reading, indexing, control and traceability; no external contact, real access, test or L2 is opened.',
    counters: [['Authorised files', '5/5', 'COL-EXC-01 through COL-EXC-05'], ['Recorded decisions', '2', 'DEC-068 and DEC-078'], ['Records received', '0/13', 'Control not yet performed'], ['L2 authorisations', '0', 'G1 remains open']],
    labels: { owner: 'Candidate responsible functions', evidence: 'Expected records' },
    gapEyebrow: 'COL-003 · 5 OPEN + 8 PARTIAL',
    gapTitle: 'Register of thirteen evidence gaps',
    gapIntro: 'The five open and eight partial values are linked to the COL-003 files without changing their qualification. DEC-078 opens their bounded collection; each value remains unchanged until admissible evidence is actually controlled.',
    gapCounters: [['Tracked gaps', '13', 'Five families'], ['Partial values', '8', 'Incomplete evidence'], ['Open values', '5', 'Missing evidence'], ['Records received', '0/13', 'Collection authorised']],
    gapLabels: { family: 'File', current: 'Controlled state', expected: 'Missing evidence', owner: 'Candidate functions' },
    gapStatuses: { partial: 'PARTIAL', open: 'OPEN' },
    gapStatus: 'COLLECTION AUTHORISED',
    status: 'AUTHORISED · TO COLLECT',
    collectionTitle: 'Executable scope of the bounded collection',
    collectionAllowed: ['Read internal sources already accessible in M3S, Git and governed logs.', 'Index records by opaque reference, provenance, date and version without publishing sensitive content.', 'Consult official public sources needed for qualification, with no account or contact.', 'Control admissibility, scope and freshness separately before changing any value.'],
    stopTitle: 'Mandatory stop and separate decision',
    collectionStops: ['Identity, mandate, contact detail or personal record not already authorised.', 'Release of REQ-002, recipient contact, account opening or purchase.', 'Secret, credential, C3/C4/C5 access, connection or operation on a real system.', 'Backup, restore, migration, worker, alert or test outside the sandbox.', 'Publication of sensitive evidence, compliance decision, G1 closure or L2 opening.'],
    decisionTitle: 'Fast Track decision outcome',
    decision: 'COL-003 V1.1 opens internal documentary collection for the thirteen gaps. REQ-002 V1.0 remains unreleased and profiles, names, channels, access, real tests and L2 remain closed.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 confirmed as documentary plan', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-COL-003 V0.1 is confirmed without amendment and promoted to V1.0 as the documentary plan for the five COL-EXC-01 through COL-EXC-05 evidence files.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session: “I confirm REF-01-G1-COL-003 V0.1 as the documentary plan for the five evidence files.”', limit: 'The decision validates documentary organisation only. It authorises no contact, release, real collection, sensitive transmission, account, infrastructure, connection, test, expense or L2 action; G1 remains open.' },
    authorisationRecord: { id: 'REF-01-DEC-078', version: 'V1.0', status: 'Internal bounded evidence collection authorised', author: 'Cheikh Ndiaye', date: '31 Aug 2026', decision: 'REF-01-G1-COL-003 V1.0 is amended and promoted to V1.1. Controlled collection of the thirteen missing evidence items is authorised across COL-EXC-01 through COL-EXC-05, only within the displayed executable scope.', evidence: 'Cheikh’s explicit authorisation in the 31 Aug 2026 session, retained in French: “autorisé la collecte, continue”; trilingual register of thirteen gaps published through frontend PR 276.', limit: 'The decision authorises internal documentary inventory and consultation of official public sources. It authorises no release, contact, new identity, unauthorised sensitive data, account, purchase, real access, connection, real test, value change without control, G1 closure or L2 opening.' },
    boundary: 'Collection is open, but no evidence is received or accepted by default. Every record must be sourced, controlled and linked to one gap before any requalification.'
  },
  DE: {
    eyebrow: 'BEGRENZTE SAMMLUNG AUTORISIERT · REF-01-G1-COL-003 · V1.1 · 31.08.2026',
    title: 'Fünf Nachweisakten für kontrollierte Sammlung geöffnet',
    intro: 'DEC-078 autorisiert die interne dokumentarische Sammlung der dreizehn fehlenden Nachweise, die bereits durch COL-003 V1.0 strukturiert sind. Der Umfang bleibt auf Lesen, Indexierung, Kontrolle und Rückverfolgbarkeit beschränkt; kein externer Kontakt, realer Zugriff, Test oder L2 wird geöffnet.',
    counters: [['Autorisierte Akten', '5/5', 'COL-EXC-01 bis COL-EXC-05'], ['Erfasste Entscheide', '2', 'DEC-068 und DEC-078'], ['Erhaltene Unterlagen', '0/13', 'Kontrolle noch nicht durchgeführt'], ['L2-Autorisierungen', '0', 'G1 bleibt offen']],
    labels: { owner: 'Kandidatenfunktionen', evidence: 'Erwartete Unterlagen' },
    gapEyebrow: 'COL-003 · 5 OFFEN + 8 TEILWEISE',
    gapTitle: 'Register der dreizehn Nachweislücken',
    gapIntro: 'Die fünf offenen und acht teilweisen Werte sind mit den COL-003-Akten verknüpft, ohne ihre Qualifizierung zu ändern. DEC-078 öffnet ihre begrenzte Sammlung; jeder Wert bleibt unverändert, bis ein zulässiger Nachweis tatsächlich kontrolliert ist.',
    gapCounters: [['Verfolgte Lücken', '13', 'Fünf Familien'], ['Teilweise Werte', '8', 'Unvollständiger Nachweis'], ['Offene Werte', '5', 'Fehlender Nachweis'], ['Erhaltene Unterlagen', '0/13', 'Sammlung autorisiert']],
    gapLabels: { family: 'Akte', current: 'Kontrollierter Stand', expected: 'Fehlender Nachweis', owner: 'Kandidatenfunktionen' },
    gapStatuses: { partial: 'TEILWEISE', open: 'OFFEN' },
    gapStatus: 'SAMMLUNG AUTORISIERT',
    status: 'AUTORISIERT · ZU SAMMELN',
    collectionTitle: 'Ausführbarer Umfang der begrenzten Sammlung',
    collectionAllowed: ['Bereits zugängliche interne Quellen in M3S, Git und gesteuerten Protokollen lesen.', 'Unterlagen mit opaker Referenz, Herkunft, Datum und Version indexieren, ohne sensible Inhalte zu veröffentlichen.', 'Für die Qualifizierung nötige amtliche öffentliche Quellen ohne Konto oder Kontakt konsultieren.', 'Zulässigkeit, Umfang und Aktualität getrennt kontrollieren, bevor ein Wert geändert wird.'],
    stopTitle: 'Obligatorischer Stopp und getrennter Entscheid',
    collectionStops: ['Nicht bereits autorisierte Identität, Mandat, Kontaktdaten oder Personaldokumente.', 'Versand von REQ-002, Kontakt mit Empfängern, Kontoeröffnung oder Kauf.', 'Geheimnis, Kennung, C3/C4/C5-Zugriff, Verbindung oder Operation auf einem realen System.', 'Sicherung, Wiederherstellung, Migration, Worker, Alarm oder Test ausserhalb der Sandbox.', 'Veröffentlichung sensibler Nachweise, Konformitätsentscheid, G1-Schliessung oder L2-Öffnung.'],
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'COL-003 V1.1 öffnet die interne dokumentarische Sammlung für die dreizehn Lücken. REQ-002 V1.0 bleibt ohne Versand; Profile, Namen, Kanäle, Zugriffe, reale Tests und L2 bleiben geschlossen.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 als Dokumentationsplan bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-COL-003 V0.1 wird ohne Änderung bestätigt und zu V1.0 als Dokumentationsplan für die fünf Nachweisakten COL-EXC-01 bis COL-EXC-05.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026: „Ich bestätige REF-01-G1-COL-003 V0.1 als Dokumentationsplan der fünf Nachweisakten.“', limit: 'Der Entscheid validiert nur die Dokumentationsorganisation. Er erlaubt keinen Kontakt, Versand, reale Sammlung, sensible Übermittlung, kein Konto, keine Infrastruktur, Verbindung, Prüfung, Ausgabe oder L2-Aktion; G1 bleibt offen.' },
    authorisationRecord: { id: 'REF-01-DEC-078', version: 'V1.0', status: 'Interne begrenzte Nachweissammlung autorisiert', author: 'Cheikh Ndiaye', date: '31.08.2026', decision: 'REF-01-G1-COL-003 V1.0 wird geändert und zu V1.1. Die kontrollierte Sammlung der dreizehn fehlenden Nachweise in COL-EXC-01 bis COL-EXC-05 wird nur im angezeigten ausführbaren Umfang autorisiert.', evidence: 'Ausdrückliche Autorisierung von Cheikh in der Sitzung vom 31.08.2026, im französischen Originalwortlaut: „autorisé la collecte, continue“; dreisprachiges Register der dreizehn Lücken mit Frontend-PR Nr. 276 veröffentlicht.', limit: 'Der Entscheid erlaubt interne Dokumentinventur und die Konsultation amtlicher öffentlicher Quellen. Er erlaubt keinen Versand, Kontakt, neue Identität, nicht autorisierte sensible Daten, Konto, Kauf, realen Zugriff, Verbindung, realen Test, Wertänderung ohne Kontrolle, G1-Schliessung oder L2-Öffnung.' },
    boundary: 'Die Sammlung ist geöffnet, aber kein Nachweis wird standardmässig als erhalten oder angenommen betrachtet. Jede Unterlage muss belegt, kontrolliert und einer einzigen Lücke zugeordnet werden, bevor eine Neueinstufung erfolgt.'
  }
};

const InstitutionalPeopleTeamsFastTrackEvidenceCollection = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-col-003" data-testid="ref01-g1-fast-track-evidence-plan" className="scroll-mt-24 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ClipboardList className="shrink-0 text-cyan-300" size={26} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <CheckCircle2 className="text-cyan-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {PACKAGES.map(item => (
          <article key={item.id} data-testid="ref01-g1-fast-track-evidence-family" className="m3s-raised p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold text-cyan-300">{item.id} · {item.family}</p><h5 className="mt-1 text-sm font-semibold text-slate-100">{item.title[language] || item.title.FR}</h5></div><span className="inline-flex self-start rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.status}</span></div>
            <p className="mt-3 text-xs font-semibold text-slate-400">{t.labels.owner}</p>
            <p className="mt-1 text-sm text-slate-200">{item.owner[language] || item.owner.FR}</p>
            <p className="mt-3 text-xs font-semibold text-cyan-300">{t.labels.evidence}</p>
            <ul className="mt-2 space-y-2">{item.evidence.map(entry => <li key={entry.FR} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><FileCheck2 className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" />{entry[language] || entry.FR}</li>)}</ul>
          </article>
        ))}
      </div>

      <section data-testid="ref01-g1-evidence-gap-register" className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-3 sm:p-4" aria-labelledby="ref01-g1-evidence-gap-register-title">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.gapEyebrow}</p><h5 id="ref01-g1-evidence-gap-register-title" className="mt-1 text-base font-semibold text-slate-100">{t.gapTitle}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.gapIntro}</p></div><span className="inline-flex min-h-9 shrink-0 items-center self-start rounded-md border border-emerald-700/70 bg-emerald-950/25 px-3 py-2 text-xs font-semibold text-emerald-100">{t.gapStatus}</span></div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.gapCounters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-24 p-3"><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">{EVIDENCE_GAPS.map(gap => { const family = PACKAGES.find(item => item.id === gap.family); return <article key={gap.id} data-testid="ref01-g1-evidence-gap" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-semibold text-sky-300">{gap.id}</p><h6 className="mt-1 text-sm font-semibold text-slate-100">{gap.field[language] || gap.field.FR}</h6></div><span className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${GAP_STATUS_STYLES[gap.status]}`}>{t.gapStatuses[gap.status]}</span></div><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-slate-400">{t.gapLabels.family}</dt><dd className="mt-1 font-semibold text-slate-200">{gap.family}</dd></div><div><dt className="font-semibold text-slate-400">{t.gapLabels.current}</dt><dd className="mt-1 text-slate-300">{gap.current[language] || gap.current.FR}</dd></div><div><dt className="font-semibold text-amber-300">{t.gapLabels.expected}</dt><dd className="mt-1 text-slate-300">{gap.expected[language] || gap.expected.FR}</dd></div><div><dt className="font-semibold text-slate-400">{t.gapLabels.owner}</dt><dd className="mt-1 text-slate-300">{family.owner[language] || family.owner.FR}</dd></div></dl></article>; })}</div>
      </section>

      <section data-testid="ref01-g1-bounded-collection-scope" className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3 sm:p-4"><h5 className="text-sm font-semibold text-emerald-100">{t.collectionTitle}</h5><ul className="mt-3 space-y-2">{t.collectionAllowed.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></article>
        <article className="rounded-md border border-rose-800/70 bg-rose-950/15 p-3 sm:p-4"><h5 className="text-sm font-semibold text-rose-100">{t.stopTitle}</h5><ul className="mt-3 space-y-2">{t.collectionStops.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-rose-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></article>
      </section>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.authorisationRecord} />
      <div className="mt-4 rounded-md border border-cyan-700/70 bg-cyan-950/20 p-4"><div className="flex items-center gap-2"><ShieldCheck className="text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-cyan-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-cyan-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceCollection;
