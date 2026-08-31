import React from 'react';
import { AlertTriangle, Database, FileCheck2, FileSearch, Fingerprint, GitCommitHorizontal } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const SOURCES = [
  { id: 'SRC-FE-ARB-002', repo: 'frontend', path: 'src/InstitutionalPeopleTeamsFastTrackExceptionArbitration.js', commit: 'abb1e82', sha: '762DEA649D90' },
  { id: 'SRC-FE-QLF-002', repo: 'frontend', path: 'src/InstitutionalPeopleTeamsGateG1FastTrackQualification.js', commit: 'abb1e82', sha: '029FEBF29A31' },
  { id: 'SRC-FE-AUT-PG', repo: 'frontend', path: 'src/InstitutionalPeopleTeamsGateG1PostgresRestorationAuthorisationConfirmation.js', commit: 'abb1e82', sha: 'C7E1C02AD033' },
  { id: 'SRC-FE-AUT-MIG', repo: 'frontend', path: 'src/InstitutionalPeopleTeamsGateG1MigrationRollbackAuthorisationConfirmation.js', commit: 'abb1e82', sha: '69BEDC879A2A' },
  { id: 'SRC-FE-AUT-OUT', repo: 'frontend', path: 'src/InstitutionalPeopleTeamsGateG1OutboxMonitoringAuthorisationConfirmation.js', commit: 'abb1e82', sha: 'D29FF5133C54' },
  { id: 'SRC-BE-DOC-REF01', repo: 'backend', path: 'docs/REF-01-L1-DATA-FOUNDATIONS.md', commit: '6dbcc28', sha: 'E28F767BAC7F' },
  { id: 'SRC-BE-MIG-README', repo: 'backend', path: 'migrations/ref01/README.md', commit: '6dbcc28', sha: '63B342DECF1A' },
  { id: 'SRC-BE-MIG-UP', repo: 'backend', path: 'migrations/ref01/001_ref01_foundations.up.sql', commit: '6dbcc28', sha: '0B3F9E495915' },
  { id: 'SRC-BE-MIG-DOWN', repo: 'backend', path: 'migrations/ref01/001_ref01_foundations.down.sql', commit: '6dbcc28', sha: '00FB42CC7607' },
  { id: 'SRC-BE-VAL-REF01', repo: 'backend', path: 'scripts/validateRef01Migrations.mjs', commit: '6dbcc28', sha: '325E3F37F892' }
];

const RECORDS = [
  { id: 'PG-03', family: 'COL-EXC-01', status: 'partial', sources: ['SRC-FE-QLF-002', 'SRC-FE-AUT-PG'], finding: text('Le cadre confirme IT & Support comme fonction candidate, sans titulaire nommé ni mandat actif.', 'The framework confirms IT & Support as the candidate function, with no named holder or active mandate.', 'Der Rahmen bestätigt IT & Support als Kandidatenfunktion, ohne benannten Träger oder aktives Mandat.') },
  { id: 'PG-04', family: 'COL-EXC-02', status: 'open', sources: ['SRC-FE-ARB-002', 'SRC-BE-DOC-REF01'], finding: text('Les seuils 24 h / 8 h sont documentaires ; aucune mesure horodatée n’existe.', 'The 24 h / 8 h targets are documentary; no timestamped measurement exists.', 'Die Ziele 24 Std. / 8 Std. sind dokumentarisch; keine datierte Messung liegt vor.') },
  { id: 'PG-05', family: 'COL-EXC-02', status: 'open', sources: ['SRC-FE-ARB-002', 'SRC-BE-DOC-REF01', 'SRC-BE-MIG-README'], finding: text('La sauvegarde est un prérequis explicite ; aucun rapport de sauvegarde PostgreSQL n’est produit.', 'Backup is an explicit prerequisite; no PostgreSQL backup report is produced.', 'Die Sicherung ist eine ausdrückliche Voraussetzung; kein PostgreSQL-Sicherungsbericht liegt vor.') },
  { id: 'PG-06', family: 'COL-EXC-02', status: 'partial', sources: ['SRC-BE-VAL-REF01', 'SRC-BE-MIG-UP', 'SRC-BE-MIG-DOWN'], finding: text('Le retour descendant du schéma synthétique est vérifiable ; il ne constitue pas une restauration depuis sauvegarde.', 'The synthetic schema rollback is verifiable; it is not a restore from backup.', 'Das synthetische Schema-Rollback ist prüfbar; es ist keine Wiederherstellung aus einer Sicherung.') },
  { id: 'MIG-03', family: 'COL-EXC-03', status: 'partial', sources: ['SRC-FE-QLF-002', 'SRC-BE-VAL-REF01'], finding: text('L’exécution locale synthétique est traçable ; aucune identité de déploiement autorisée n’est établie.', 'Synthetic local execution is traceable; no authorised deployment identity is established.', 'Die synthetische lokale Ausführung ist nachvollziehbar; keine autorisierte Bereitstellungsidentität ist festgelegt.') },
  { id: 'MIG-05', family: 'COL-EXC-03', status: 'open', sources: ['SRC-FE-ARB-002', 'SRC-FE-AUT-MIG'], finding: text('La fenêtre 60 / 45 min est un paramètre documentaire ; aucun créneau réel n’est autorisé.', 'The 60 / 45 min window is a documentary parameter; no real slot is authorised.', 'Das Fenster 60 / 45 Min. ist ein Dokumentationsparameter; kein reales Zeitfenster ist autorisiert.') },
  { id: 'MIG-07', family: 'COL-EXC-04', status: 'partial', sources: ['SRC-BE-DOC-REF01', 'SRC-BE-MIG-UP', 'SRC-BE-MIG-DOWN'], finding: text('Documentation et migrations sont figées dans Git ; aucune référence GED gouvernée n’est créée.', 'Documentation and migrations are pinned in Git; no governed DMS reference is created.', 'Dokumentation und Migrationen sind in Git fixiert; keine gesteuerte DMS-Referenz ist erstellt.') },
  { id: 'OUT-02', family: 'COL-EXC-05', status: 'partial', sources: ['SRC-FE-QLF-002', 'SRC-FE-AUT-OUT'], finding: text('IT & Support est la fonction candidate ; aucun titulaire, suppléant ou mandat actif n’est établi.', 'IT & Support is the candidate function; no holder, deputy or active mandate is established.', 'IT & Support ist die Kandidatenfunktion; kein Träger, Stellvertreter oder aktives Mandat ist festgelegt.') },
  { id: 'OUT-03', family: 'COL-EXC-05', status: 'partial', sources: ['SRC-BE-VAL-REF01', 'SRC-BE-MIG-UP'], finding: text('Le topic synthétique est vérifiable ; aucun destinataire réel ni allowlist n’est désigné.', 'The synthetic topic is verifiable; no real recipient or allowlist is designated.', 'Das synthetische Topic ist prüfbar; kein realer Empfänger und keine Freigabeliste sind bestimmt.') },
  { id: 'OUT-04', family: 'COL-EXC-05', status: 'open', sources: ['SRC-BE-DOC-REF01', 'SRC-BE-MIG-README'], finding: text('Les sources imposent l’absence d’activation automatique ; aucun worker, ordonnanceur ou hook n’existe.', 'The sources require no automatic activation; no worker, scheduler or hook exists.', 'Die Quellen verlangen keine automatische Aktivierung; Worker, Scheduler oder Hook fehlen.') },
  { id: 'OUT-05', family: 'COL-EXC-05', status: 'partial', sources: ['SRC-FE-ARB-002', 'SRC-BE-MIG-UP'], finding: text('Le schéma initialise attempts à 0 et available_at à now() ; la reprise 1 / 5 / 15 / 60 reste non testée.', 'The schema initialises attempts at 0 and available_at at now(); the 1 / 5 / 15 / 60 retry remains untested.', 'Das Schema setzt attempts auf 0 und available_at auf now(); die Wiederholung 1 / 5 / 15 / 60 bleibt ungeprüft.') },
  { id: 'OUT-06', family: 'COL-EXC-05', status: 'open', sources: ['SRC-FE-ARB-002', 'SRC-FE-QLF-002', 'SRC-FE-AUT-OUT'], finding: text('Le seuil documentaire est retrouvé ; aucune métrique, alerte, destination ou preuve de récupération n’est configurée.', 'The documentary threshold is found; no metric, alert, destination or recovery evidence is configured.', 'Der dokumentarische Schwellenwert ist gefunden; Metrik, Alarm, Ziel und Wiederherstellungsnachweis fehlen.') },
  { id: 'OUT-07', family: 'COL-EXC-04', status: 'partial', sources: ['SRC-BE-DOC-REF01', 'SRC-BE-MIG-UP'], finding: text('Le contrat outbox et les contrôles sont figés dans Git ; aucune référence GED de clôture n’existe.', 'The outbox contract and controls are pinned in Git; no closing DMS reference exists.', 'Outbox-Vertrag und Kontrollen sind in Git fixiert; keine abschliessende DMS-Referenz liegt vor.') }
];

const COPY = {
  FR: {
    eyebrow: 'INVENTAIRE CONFIRMÉ · DEC-079 · COL-INV-001 · V1.0 · 31-08-2026',
    title: 'Inventaire interne des sources probatoires',
    intro: 'Les sources déjà accessibles sont figées et rapprochées des treize écarts. DEC-079 confirme cet inventaire comme registre interne gouverné ; il prouve la provenance du constat actuel, sans remplacer les preuves attendues ni requalifier une valeur.',
    counters: [['Sources figées', '10/10', 'Frontend et backend'], ['Écarts rapprochés', '13/13', 'Une fiche par écart'], ['Statuts préservés', '8 + 5', 'Partiels + ouverts'], ['Preuves acceptées', '0/13', 'Contrôle distinct requis']],
    sourceTitle: 'Catalogue des sources figées',
    sourceIntro: 'Références opaques, chemins relatifs et empreintes courtes. Les commits complets restent dans Git.',
    repo: 'Dépôt', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Rapprochement par écart', sources: 'Sources indexées', finding: 'Constat borné',
    statuses: { partial: 'PARTIEL PRÉSERVÉ', open: 'OUVERT PRÉSERVÉ' },
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-079', version: 'V1.0', status: 'Inventaire interne candidat confirmé', author: 'Cheikh Ndiaye', date: '31-08-2026', decision: 'COL-INV-001 V0.1 est confirmé et promu en V1.0 comme inventaire interne gouverné des sources G1. Les dix sources restent rapprochées des treize écarts avec leurs statuts existants.', evidence: 'Confirmation explicite de Cheikh dans la session du 31-08-2026 : « Je confirme COL-INV-001 V0.1 comme inventaire interne candidat des sources G1 ». Le candidat avait été publié par la PR frontend nº 278.', limit: 'La décision confirme l’inventaire et sa traçabilité uniquement. Elle n’accepte aucune preuve attendue, ne désigne aucune source maîtresse de production, ne requalifie aucune valeur, ne ferme aucune condition G1 et n’ouvre ni L2 ni contact externe.' },
    reviewTitle: 'Revue groupée de recevabilité confirmée · REF-01-G1-REV-006 V1.0',
    reviewIntro: 'REV signifie « revue ». Les dix sources sont recevables comme contexte interne traçable, mais aucune ne remplit encore la preuve de production attendue pour les treize écarts.',
    reviewCounters: [['Sources examinées', '10/10'], ['Écarts examinés', '13/13'], ['Preuves attendues recevables', '0/13'], ['Requalifications proposées', '0']],
    reviewVerdict: 'VERDICT CONFIRMÉ · Conserver 8 valeurs partielles et 5 ouvertes. Aucune ligne ne doit être rediscutée séparément sauf nouvelle pièce ou contradiction documentée.',
    reviewRecord: { id: 'REF-01-DEC-080', version: 'V1.0', status: 'Revue groupée de recevabilité confirmée', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'REF-01-G1-REV-006 V0.1 est confirmé sans amendement et promu en V1.0 comme revue gouvernée des dix sources internes et des treize écarts G1.', evidence: 'Confirmation explicite de Cheikh dans la session du 01-09-2026 : « je confirme REF-01-G1-REV-006 V0.1 ». La revue candidate avait été publiée par la PR frontend nº 279.', limit: 'La décision confirme la lecture groupée dans son périmètre documenté. Elle n’accepte aucune preuve de production, ne prétend pas couvrir un espace non consulté, ne requalifie aucune valeur, ne ferme aucune condition G1 et n’ouvre ni contact externe, accès réel ou L2.' },
    collectionTitle: 'Relevé candidat de collecte interne bornée · REF-01-G1-COL-004 V0.1',
    collectionIntro: 'La recherche autorisée a contrôlé les sources REF-01 du backend, les documents internes, les sorties Codex et les anciens supports 2SG. Aucun rapport de sauvegarde ou restauration PostgreSQL, mandat actif, créneau autorisé, worker, supervision réelle ou référence GED finale n’a été retrouvé.',
    collectionCounters: [['Périmètres contrôlés', '4/4'], ['Écarts recherchés', '13/13'], ['Nouvelles preuves recevables', '0'], ['Exclusion documentée', '1']],
    collectionResult: 'RÉSULTAT CANDIDAT · GED-SYNTHETIC-REF-001 reste une fixture synthétique et ne constitue pas une référence GED réelle. Conserver 8 partiels, 5 ouverts et 0/13 preuve recevable. Prochain arbitrage groupé : confirmer ou amender COL-004 V0.1.',
    boundary: 'DEC-080 confirme REV-006 V1.0. COL-004 V0.1 documente uniquement une recherche interne bornée : aucune preuve attendue n’est acceptée, aucune valeur n’est modifiée, G1 reste ouverte et L2 fermé.'
  },
  EN: {
    eyebrow: 'CONFIRMED INVENTORY · DEC-079 · COL-INV-001 · V1.0 · 31 AUG 2026',
    title: 'Internal evidence-source inventory',
    intro: 'Already accessible sources are pinned and mapped to the thirteen gaps. DEC-079 confirms this inventory as a governed internal register; it evidences provenance of the current finding without replacing expected proofs or requalifying any value.',
    counters: [['Pinned sources', '10/10', 'Frontend and backend'], ['Mapped gaps', '13/13', 'One record per gap'], ['Preserved statuses', '8 + 5', 'Partial + open'], ['Accepted proofs', '0/13', 'Separate control required']],
    sourceTitle: 'Pinned source catalogue',
    sourceIntro: 'Opaque references, relative paths and short fingerprints. Full commits remain in Git.',
    repo: 'Repository', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Gap-by-gap mapping', sources: 'Indexed sources', finding: 'Bounded finding',
    statuses: { partial: 'PARTIAL PRESERVED', open: 'OPEN PRESERVED' },
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-079', version: 'V1.0', status: 'Candidate internal inventory confirmed', author: 'Cheikh Ndiaye', date: '31 Aug 2026', decision: 'COL-INV-001 V0.1 is confirmed and promoted to V1.0 as the governed internal inventory of G1 sources. The ten sources remain mapped to the thirteen gaps with their existing statuses.', evidence: 'Cheikh’s explicit confirmation in the 31 Aug 2026 session, retained in French: “Je confirme COL-INV-001 V0.1 comme inventaire interne candidat des sources G1”. The candidate had been published through frontend PR 278.', limit: 'The decision confirms only the inventory and its traceability. It accepts no expected proof, designates no production master source, requalifies no value, closes no G1 condition and opens neither L2 nor external contact.' },
    reviewTitle: 'Confirmed grouped admissibility review · REF-01-G1-REV-006 V1.0',
    reviewIntro: 'REV means “review”. The ten sources are admissible as traceable internal context, but none yet fulfils the expected production evidence for the thirteen gaps.',
    reviewCounters: [['Sources reviewed', '10/10'], ['Gaps reviewed', '13/13'], ['Admissible expected proofs', '0/13'], ['Proposed requalifications', '0']],
    reviewVerdict: 'CONFIRMED VERDICT · Preserve 8 partial and 5 open values. No line needs separate debate unless a new record or documented contradiction appears.',
    reviewRecord: { id: 'REF-01-DEC-080', version: 'V1.0', status: 'Grouped admissibility review confirmed', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'REF-01-G1-REV-006 V0.1 is confirmed without amendment and promoted to V1.0 as the governed review of ten internal sources and thirteen G1 gaps.', evidence: 'Cheikh’s explicit confirmation in the 1 Sep 2026 session, retained in French: “je confirme REF-01-G1-REV-006 V0.1”. The candidate review had been published through frontend PR 279.', limit: 'The decision confirms the grouped reading within its documented scope. It accepts no production evidence, claims no coverage of an unreviewed space, requalifies no value, closes no G1 condition and opens no external contact, real access or L2.' },
    collectionTitle: 'Candidate bounded internal-collection report · REF-01-G1-COL-004 V0.1',
    collectionIntro: 'The authorised search reviewed REF-01 backend sources, internal documents, Codex outputs and legacy 2SG materials. It found no PostgreSQL backup or restoration report, active mandate, authorised window, real worker, monitoring evidence or final DMS reference.',
    collectionCounters: [['Reviewed scopes', '4/4'], ['Searched gaps', '13/13'], ['New admissible proofs', '0'], ['Documented exclusion', '1']],
    collectionResult: 'CANDIDATE RESULT · GED-SYNTHETIC-REF-001 remains a synthetic fixture and is not a real DMS reference. Preserve 8 partial, 5 open and 0/13 admissible evidence items. Next grouped decision: confirm or amend COL-004 V0.1.',
    boundary: 'DEC-080 confirms REV-006 V1.0. COL-004 V0.1 documents only a bounded internal search: no expected proof is accepted, no value is changed, G1 remains open and L2 closed.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES INVENTAR · DEC-079 · COL-INV-001 · V1.0 · 31.08.2026',
    title: 'Internes Inventar der Nachweisquellen',
    intro: 'Bereits zugängliche Quellen werden fixiert und den dreizehn Lücken zugeordnet. DEC-079 bestätigt dieses Inventar als gesteuertes internes Register; es belegt die Herkunft des aktuellen Befunds, ohne erwartete Nachweise zu ersetzen oder Werte neu einzustufen.',
    counters: [['Fixierte Quellen', '10/10', 'Frontend und Backend'], ['Zugeordnete Lücken', '13/13', 'Ein Datensatz je Lücke'], ['Bewahrte Status', '8 + 5', 'Teilweise + offen'], ['Akzeptierte Nachweise', '0/13', 'Getrennte Kontrolle nötig']],
    sourceTitle: 'Katalog der fixierten Quellen',
    sourceIntro: 'Opake Referenzen, relative Pfade und kurze Fingerabdrücke. Vollständige Commits bleiben in Git.',
    repo: 'Repository', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Zuordnung je Lücke', sources: 'Indexierte Quellen', finding: 'Begrenzter Befund',
    statuses: { partial: 'TEILWEISE BEWAHRT', open: 'OFFEN BEWAHRT' },
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-079', version: 'V1.0', status: 'Kandidateninventar intern bestätigt', author: 'Cheikh Ndiaye', date: '31.08.2026', decision: 'COL-INV-001 V0.1 ist bestätigt und wird als gesteuertes internes Inventar der G1-Quellen zu V1.0. Die zehn Quellen bleiben den dreizehn Lücken mit ihren bestehenden Status zugeordnet.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 31.08.2026, im französischen Originalwortlaut: „Je confirme COL-INV-001 V0.1 comme inventaire interne candidat des sources G1“. Der Kandidat wurde zuvor mit Frontend-PR Nr. 278 veröffentlicht.', limit: 'Der Entscheid bestätigt nur Inventar und Rückverfolgbarkeit. Er nimmt keinen erwarteten Nachweis an, bestimmt keine produktive Masterquelle, stuft keinen Wert neu ein, schliesst keine G1-Bedingung und öffnet weder L2 noch externen Kontakt.' },
    reviewTitle: 'Bestätigte gebündelte Zulässigkeitsprüfung · REF-01-G1-REV-006 V1.0',
    reviewIntro: 'REV bedeutet „Review/Prüfung“. Die zehn Quellen sind als nachvollziehbarer interner Kontext zulässig, erfüllen aber noch keinen erwarteten Produktivnachweis für die dreizehn Lücken.',
    reviewCounters: [['Geprüfte Quellen', '10/10'], ['Geprüfte Lücken', '13/13'], ['Zulässige erwartete Nachweise', '0/13'], ['Vorgeschlagene Neueinstufungen', '0']],
    reviewVerdict: 'BESTÄTIGTES VERDIKT · 8 teilweise und 5 offene Werte beibehalten. Keine Zeile wird ohne neue Unterlage oder dokumentierten Widerspruch getrennt neu diskutiert.',
    reviewRecord: { id: 'REF-01-DEC-080', version: 'V1.0', status: 'Gebündelte Zulässigkeitsprüfung bestätigt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'REF-01-G1-REV-006 V0.1 wird ohne Änderung bestätigt und als gesteuerte Prüfung der zehn internen Quellen und dreizehn G1-Lücken zu V1.0.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „je confirme REF-01-G1-REV-006 V0.1“. Die Kandidatenprüfung war mit Frontend-PR Nr. 279 veröffentlicht worden.', limit: 'Der Entscheid bestätigt die gebündelte Lesung im dokumentierten Umfang. Er nimmt keinen Produktivnachweis an, beansprucht keine Abdeckung eines ungeprüften Bereichs, stuft keinen Wert neu ein, schliesst keine G1-Bedingung und öffnet weder externen Kontakt, realen Zugriff noch L2.' },
    collectionTitle: 'Kandidatenprotokoll der begrenzten internen Sammlung · REF-01-G1-COL-004 V0.1',
    collectionIntro: 'Die autorisierte Suche prüfte REF-01-Backendquellen, interne Dokumente, Codex-Ausgaben und ältere 2SG-Unterlagen. Kein PostgreSQL-Sicherungs- oder Wiederherstellungsbericht, aktives Mandat, autorisiertes Zeitfenster, realer Worker, Überwachungsnachweis oder endgültige DMS-Referenz wurde gefunden.',
    collectionCounters: [['Geprüfte Bereiche', '4/4'], ['Gesuchte Lücken', '13/13'], ['Neue zulässige Nachweise', '0'], ['Dokumentierter Ausschluss', '1']],
    collectionResult: 'KANDIDATENERGEBNIS · GED-SYNTHETIC-REF-001 bleibt eine synthetische Fixture und ist keine reale DMS-Referenz. 8 teilweise, 5 offene Werte und 0/13 zulässige Nachweise beibehalten. Nächster gebündelter Entscheid: COL-004 V0.1 bestätigen oder ändern.',
    boundary: 'DEC-080 bestätigt REV-006 V1.0. COL-004 V0.1 dokumentiert nur eine begrenzte interne Suche: Kein erwarteter Nachweis ist akzeptiert, kein Wert geändert, G1 bleibt offen und L2 geschlossen.'
  }
};

const statusStyle = {
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const InstitutionalPeopleTeamsFastTrackEvidenceInventory = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-col-inv-001" data-testid="ref01-g1-evidence-inventory" className="mt-4 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <FileSearch className="shrink-0 text-sky-300" size={26} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-24 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <FileCheck2 className="text-emerald-300" size={19} aria-hidden="true" /> : <AlertTriangle className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <details className="mt-4 rounded-md border border-slate-700/70 bg-slate-950/20 p-3 sm:p-4">
        <summary className="cursor-pointer text-sm font-semibold text-sky-100">{t.sourceTitle}</summary>
        <p className="mt-2 text-xs leading-5 text-slate-400">{t.sourceIntro}</p>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {SOURCES.map(source => <article key={source.id} data-testid="ref01-g1-evidence-source" className="m3s-raised min-w-0 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-semibold text-sky-300">{source.id}</p>{source.repo === 'backend' ? <Database className="text-emerald-300" size={17} aria-hidden="true" /> : <GitCommitHorizontal className="text-violet-300" size={17} aria-hidden="true" />}</div><p className="mt-2 break-all text-xs leading-5 text-slate-300">{source.path}</p><dl className="mt-2 grid grid-cols-3 gap-2 text-[11px]"><div><dt className="text-slate-500">{t.repo}</dt><dd className="mt-1 font-semibold text-slate-300">{source.repo}</dd></div><div><dt className="text-slate-500">{t.commit}</dt><dd className="mt-1 font-mono text-slate-300">{source.commit}</dd></div><div><dt className="text-slate-500">{t.hash}</dt><dd className="mt-1 font-mono text-slate-300">{source.sha}</dd></div></dl></article>)}
        </div>
      </details>

      <h5 className="mt-5 text-sm font-semibold text-sky-100">{t.recordsTitle}</h5>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {RECORDS.map(record => <article key={record.id} data-testid="ref01-g1-evidence-inventory-record" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-semibold text-sky-300">{record.id}</p><p className="mt-1 text-xs font-semibold text-slate-300">{record.family}</p></div><span className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${statusStyle[record.status]}`}>{t.statuses[record.status]}</span></div><p className="mt-3 text-xs font-semibold text-slate-400">{t.sources}</p><div className="mt-2 flex flex-wrap gap-1.5">{record.sources.map(source => <span key={source} className="rounded border border-slate-700 bg-slate-950/30 px-2 py-1 font-mono text-[10px] text-slate-300">{source}</span>)}</div><p className="mt-3 text-xs font-semibold text-slate-400">{t.finding}</p><p className="mt-1 text-xs leading-5 text-slate-300">{record.finding[language] || record.finding.FR}</p></article>)}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />

      <section className="mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-rev-006-title">
        <h5 id="institutional-ref01-g1-rev-006-title" className="text-sm font-semibold text-violet-200">{t.reviewTitle}</h5>
        <p className="mt-2 text-xs leading-5 text-slate-300">{t.reviewIntro}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {t.reviewCounters.map(([label, value]) => <div key={label} className="m3s-raised p-3"><dt className="text-[11px] font-semibold text-slate-400">{label}</dt><dd className="mt-1 text-lg font-semibold text-slate-100">{value}</dd></div>)}
        </dl>
        <p className="mt-3 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.reviewVerdict}</p>
      </section>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.reviewRecord} />

      <section id="institutional-ref01-g1-col-004" className="mt-4 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-col-004-title">
        <h5 id="institutional-ref01-g1-col-004-title" className="text-sm font-semibold text-emerald-200">{t.collectionTitle}</h5>
        <p className="mt-2 text-xs leading-5 text-slate-300">{t.collectionIntro}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {t.collectionCounters.map(([label, value]) => <div key={label} className="m3s-raised p-3"><dt className="text-[11px] font-semibold text-slate-400">{label}</dt><dd className="mt-1 text-lg font-semibold text-slate-100">{value}</dd></div>)}
        </dl>
        <p className="mt-3 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.collectionResult}</p>
      </section>

      <p className="mt-4 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100"><Fingerprint className="mt-0.5 shrink-0 text-amber-300" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceInventory;
