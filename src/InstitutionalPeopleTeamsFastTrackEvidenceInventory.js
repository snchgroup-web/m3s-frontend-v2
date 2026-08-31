import React from 'react';
import { AlertTriangle, Database, FileCheck2, FileSearch, Fingerprint, GitCommitHorizontal } from 'lucide-react';

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
    eyebrow: 'EXÉCUTION DEC-078 · COL-INV-001 · V0.1 · 31-08-2026',
    title: 'Inventaire interne des sources probatoires',
    intro: 'Les sources déjà accessibles sont figées et rapprochées des treize écarts. Cet inventaire prouve la provenance du constat actuel ; il ne remplace aucune des preuves attendues et ne requalifie aucune valeur.',
    counters: [['Sources figées', '10/10', 'Frontend et backend'], ['Écarts rapprochés', '13/13', 'Une fiche par écart'], ['Statuts préservés', '8 + 5', 'Partiels + ouverts'], ['Preuves acceptées', '0/13', 'Contrôle distinct requis']],
    sourceTitle: 'Catalogue des sources figées',
    sourceIntro: 'Références opaques, chemins relatifs et empreintes courtes. Les commits complets restent dans Git.',
    repo: 'Dépôt', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Rapprochement par écart', sources: 'Sources indexées', finding: 'Constat borné',
    statuses: { partial: 'PARTIEL PRÉSERVÉ', open: 'OUVERT PRÉSERVÉ' },
    boundary: 'COL-INV-001 V0.1 est un inventaire candidat produit sous DEC-078. Aucune preuve attendue n’est acceptée, aucune valeur n’est modifiée, G1 reste ouverte et L2 fermé.'
  },
  EN: {
    eyebrow: 'DEC-078 EXECUTION · COL-INV-001 · V0.1 · 31 AUG 2026',
    title: 'Internal evidence-source inventory',
    intro: 'Already accessible sources are pinned and mapped to the thirteen gaps. This inventory evidences provenance of the current finding; it replaces none of the expected proofs and requalifies no value.',
    counters: [['Pinned sources', '10/10', 'Frontend and backend'], ['Mapped gaps', '13/13', 'One record per gap'], ['Preserved statuses', '8 + 5', 'Partial + open'], ['Accepted proofs', '0/13', 'Separate control required']],
    sourceTitle: 'Pinned source catalogue',
    sourceIntro: 'Opaque references, relative paths and short fingerprints. Full commits remain in Git.',
    repo: 'Repository', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Gap-by-gap mapping', sources: 'Indexed sources', finding: 'Bounded finding',
    statuses: { partial: 'PARTIAL PRESERVED', open: 'OPEN PRESERVED' },
    boundary: 'COL-INV-001 V0.1 is a candidate inventory produced under DEC-078. No expected proof is accepted, no value is changed, G1 remains open and L2 closed.'
  },
  DE: {
    eyebrow: 'AUSFÜHRUNG DEC-078 · COL-INV-001 · V0.1 · 31.08.2026',
    title: 'Internes Inventar der Nachweisquellen',
    intro: 'Bereits zugängliche Quellen werden fixiert und den dreizehn Lücken zugeordnet. Dieses Inventar belegt die Herkunft des aktuellen Befunds; es ersetzt keinen erwarteten Nachweis und stuft keinen Wert neu ein.',
    counters: [['Fixierte Quellen', '10/10', 'Frontend und Backend'], ['Zugeordnete Lücken', '13/13', 'Ein Datensatz je Lücke'], ['Bewahrte Status', '8 + 5', 'Teilweise + offen'], ['Akzeptierte Nachweise', '0/13', 'Getrennte Kontrolle nötig']],
    sourceTitle: 'Katalog der fixierten Quellen',
    sourceIntro: 'Opake Referenzen, relative Pfade und kurze Fingerabdrücke. Vollständige Commits bleiben in Git.',
    repo: 'Repository', commit: 'Commit', hash: 'SHA-256', recordsTitle: 'Zuordnung je Lücke', sources: 'Indexierte Quellen', finding: 'Begrenzter Befund',
    statuses: { partial: 'TEILWEISE BEWAHRT', open: 'OFFEN BEWAHRT' },
    boundary: 'COL-INV-001 V0.1 ist ein unter DEC-078 erstelltes Kandidateninventar. Kein erwarteter Nachweis ist akzeptiert, kein Wert geändert, G1 bleibt offen und L2 geschlossen.'
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

      <p className="mt-4 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100"><Fingerprint className="mt-0.5 shrink-0 text-amber-300" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceInventory;
