import React from 'react';
import { AlertTriangle, CheckCircle2, CircleDotDashed, DatabaseBackup, FileWarning, RefreshCcw, RadioTower } from 'lucide-react';

const STATUS_STYLES = {
  qualified: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/20 text-rose-100'
};

const text = (FR, EN, DE) => ({ FR, EN, DE });

const PACKAGES = [
  {
    id: 'AUT-02-01', icon: DatabaseBackup, title: text('PostgreSQL et restauration', 'PostgreSQL and restoration', 'PostgreSQL und Wiederherstellung'),
    rows: [
      ['PG-01', text('Service ou scénario', 'Service or scenario', 'Dienst oder Szenario'), text('Validateur PostgreSQL embarqué PGlite, uniquement comme scénario synthétique local.', 'Embedded PGlite PostgreSQL validator, solely as a local synthetic scenario.', 'Eingebetteter PGlite-PostgreSQL-Validator, nur als lokales synthetisches Szenario.'), 'scripts/validateRef01Migrations.mjs · package @electric-sql/pglite', 'qualified'],
      ['PG-02', text('Environnement isolé', 'Isolated environment', 'Isolierte Umgebung'), text('Processus local isolé, hors démarrage serveur et sans donnée réelle.', 'Isolated local process, outside server startup and without real data.', 'Isolierter lokaler Prozess, ausserhalb des Serverstarts und ohne Realdaten.'), 'migrations/ref01/README.md', 'qualified'],
      ['PG-03', text('Titulaire', 'Holder', 'Träger'), text('IT & Support est la fonction pilote candidate ; aucun exécutant nommé ni délégation n’est prouvé.', 'IT & Support is the candidate lead function; no named executor or delegation is evidenced.', 'IT & Support ist die federführende Kandidatenfunktion; keine namentliche Ausführung oder Delegation ist belegt.'), 'AUT-02-01-001 V1.0 · PKG-03 V1.0', 'partial'],
      ['PG-04', text('RPO / RTO', 'RPO / RTO', 'RPO / RTO'), text('Aucun objectif ni résultat mesuré.', 'No target or measured result.', 'Kein Ziel und kein gemessenes Ergebnis.'), 'REF-01-L1-DATA-FOUNDATIONS.md · décision encore requise', 'open'],
      ['PG-05', text('Sauvegarde', 'Backup', 'Sicherung'), text('Aucune sauvegarde PostgreSQL produite ou vérifiée ; les scripts SQL ne constituent pas une sauvegarde.', 'No PostgreSQL backup produced or verified; SQL scripts are not a backup.', 'Keine PostgreSQL-Sicherung erstellt oder geprüft; SQL-Skripte sind keine Sicherung.'), 'migrations/ref01/001_ref01_foundations.*.sql', 'open'],
      ['PG-06', text('Restauration testée', 'Tested restoration', 'Geprüfte Wiederherstellung'), text('Le retour descendant du schéma synthétique est testé ; aucune restauration depuis sauvegarde n’est démontrée.', 'Synthetic schema down migration is tested; no restore from backup is demonstrated.', 'Die Down-Migration des synthetischen Schemas ist geprüft; keine Wiederherstellung aus Sicherung ist nachgewiesen.'), 'validate:ref01 réussi le 30-08-2026', 'partial']
    ]
  },
  {
    id: 'AUT-02-04', icon: RefreshCcw, title: text('Migration et retour arrière', 'Migration and rollback', 'Migration und Rollback'),
    rows: [
      ['MIG-01', text('Source', 'Source', 'Quelle'), text('Instance PostgreSQL embarquée vide ; aucune source M3S réelle.', 'Empty embedded PostgreSQL instance; no real M3S source.', 'Leere eingebettete PostgreSQL-Instanz; keine reale M3S-Quelle.'), 'scripts/validateRef01Migrations.mjs', 'qualified'],
      ['MIG-02', text('Cible', 'Target', 'Ziel'), text('Schéma isolé ref01 avec cinq tables candidates.', 'Isolated ref01 schema with five candidate tables.', 'Isoliertes Schema ref01 mit fünf Kandidatentabellen.'), '001_ref01_foundations.up.sql', 'qualified'],
      ['MIG-03', text('Identité d’exécution', 'Execution identity', 'Ausführungsidentität'), text('Processus Node local observé ; aucune identité de déploiement autorisée.', 'Local Node process observed; no authorised deployment identity.', 'Lokaler Node-Prozess beobachtet; keine autorisierte Bereitstellungsidentität.'), 'scripts/validateRef01Migrations.mjs', 'partial'],
      ['MIG-04', text('Commande', 'Command', 'Befehl'), text('npm.cmd run validate:ref01, limitée à la validation synthétique locale.', 'npm.cmd run validate:ref01, limited to local synthetic validation.', 'npm.cmd run validate:ref01, auf lokale synthetische Validierung begrenzt.'), 'package.json · migrations/ref01/README.md', 'qualified'],
      ['MIG-05', text('Fenêtre', 'Window', 'Fenster'), text('Aucune fenêtre, durée maximale ou calendrier autorisé.', 'No authorised window, maximum duration or schedule.', 'Kein autorisiertes Fenster, keine Höchstdauer und kein Zeitplan.'), 'AUT-02-04-001 V1.0', 'open'],
      ['MIG-06', text('Seuil d’acceptation', 'Acceptance threshold', 'Abnahmeschwelle'), text('Toutes les assertions d’intégrité doivent réussir ; toute assertion rejetée arrête le contrôle.', 'All integrity assertions must pass; any rejected assertion stops validation.', 'Alle Integritätsprüfungen müssen bestehen; jede abgelehnte Prüfung stoppt die Validierung.'), 'scripts/validateRef01Migrations.mjs', 'qualified'],
      ['MIG-07', text('Preuve GED', 'DMS evidence', 'DMS-Nachweis'), text('Documentation et journaux présents dans Git ; aucune référence GED gouvernée finale.', 'Documentation and logs exist in Git; no final governed DMS reference.', 'Dokumentation und Protokolle liegen in Git; keine endgültige gesteuerte DMS-Referenz.'), 'docs/REF-01-L1-DATA-FOUNDATIONS.md · migrations/ref01', 'partial'],
      ['MIG-08', text('Environnement', 'Environment', 'Umgebung'), text('PGlite local, synthétique, réversible et non raccordé au démarrage M3S.', 'Local, synthetic and reversible PGlite, not wired into M3S startup.', 'Lokales, synthetisches und reversibles PGlite, nicht an den M3S-Start angebunden.'), 'migrations/ref01/README.md', 'qualified']
    ]
  },
  {
    id: 'AUT-02-05', icon: RadioTower, title: text('Outbox, supervision et reprise', 'Outbox, monitoring and recovery', 'Outbox, Überwachung und Wiederanlauf'),
    rows: [
      ['OUT-01', text('Transport', 'Transport', 'Transport'), text('Table candidate ref01.outbox avec topic, payload, statut, tentatives et disponibilité.', 'Candidate ref01.outbox table with topic, payload, status, attempts and availability.', 'Kandidatentabelle ref01.outbox mit Topic, Payload, Status, Versuchen und Verfügbarkeit.'), '001_ref01_foundations.up.sql', 'qualified'],
      ['OUT-02', text('Titulaire', 'Holder', 'Träger'), text('IT & Support est la fonction candidate ; aucun titulaire d’exécution n’est nommé.', 'IT & Support is the candidate function; no execution holder is named.', 'IT & Support ist die Kandidatenfunktion; kein Ausführungsträger ist benannt.'), 'AUT-02-05-001 V1.0 · PKG-05 V1.0', 'partial'],
      ['OUT-03', text('Destinataires', 'Recipients', 'Empfänger'), text('Aucun destinataire réel ; seul le topic synthétique ref01.synthetic.created est testé.', 'No real recipient; only the synthetic ref01.synthetic.created topic is tested.', 'Kein realer Empfänger; nur das synthetische Topic ref01.synthetic.created ist geprüft.'), 'scripts/validateRef01Migrations.mjs', 'partial'],
      ['OUT-04', text('Worker', 'Worker', 'Worker'), text('Aucun worker, ordonnanceur ou hook de démarrage implémenté.', 'No worker, scheduler or startup hook implemented.', 'Kein Worker, Scheduler oder Start-Hook implementiert.'), 'REF-01-L1-DATA-FOUNDATIONS.md', 'open'],
      ['OUT-05', text('Délais et tentatives', 'Delays and attempts', 'Verzögerungen und Versuche'), text('attempts démarre à 0 et available_at à now() ; aucun délai ni plafond de rejeu.', 'attempts starts at 0 and available_at at now(); no retry delay or ceiling.', 'attempts startet bei 0 und available_at bei now(); keine Wiederholungsverzögerung oder Obergrenze.'), '001_ref01_foundations.up.sql', 'partial'],
      ['OUT-06', text('Métriques et seuils', 'Metrics and thresholds', 'Metriken und Schwellen'), text('Aucune métrique de supervision, fenêtre ou seuil d’alerte défini.', 'No monitoring metric, window or alert threshold defined.', 'Keine Überwachungsmetrik, kein Fenster und keine Alarmschwelle definiert.'), 'PKG-05 V1.0 · décision encore requise', 'open'],
      ['OUT-07', text('Dépôt GED', 'DMS repository', 'DMS-Ablage'), text('Preuves techniques dans Git ; aucune référence GED de clôture.', 'Technical evidence in Git; no closing DMS reference.', 'Technische Nachweise in Git; keine abschliessende DMS-Referenz.'), 'docs/REF-01-L1-DATA-FOUNDATIONS.md · migrations/ref01', 'partial'],
      ['OUT-08', text('Environnement', 'Environment', 'Umgebung'), text('Même processus PGlite local et synthétique, sans file ni canal réel.', 'Same local synthetic PGlite process, without a real queue or channel.', 'Derselbe lokale synthetische PGlite-Prozess, ohne reale Queue oder Kanal.'), 'scripts/validateRef01Migrations.mjs', 'qualified']
    ]
  }
];

const COPY = {
  FR: {
    eyebrow: 'QUALIFICATION GROUPÉE PAR PREUVES · REF-01-G1-QLF-001 · V1.0 · 30-08-2026',
    title: 'Vingt-deux valeurs qualifiées en un lot, sans validation fictive',
    intro: 'La décision REF-01-DEC-066 applique le Fast Track aux sources du lot L1 isolé. Les neuf lignes qualifiées décrivent uniquement le scénario synthétique observé ; les huit lignes partielles et cinq lignes ouvertes restent des exceptions explicites.',
    counters: [['Lignes contrôlées', '22/22', 'Trois paquets'], ['Qualifiées', '9', 'Périmètre synthétique uniquement'], ['Partielles', '8', 'Preuve ou autorité incomplète'], ['Ouvertes', '5', 'Décision ou preuve absente']],
    statuses: { qualified: 'QUALIFIÉ · SYNTHÉTIQUE', partial: 'PARTIEL', open: 'OUVERT' },
    labels: { field: 'Valeur', finding: 'Qualification retenue', evidence: 'Preuve contrôlée', status: 'État' },
    exceptionsTitle: 'Cinq familles d’exceptions à traiter, pas treize arbitrages séparés',
    exceptions: ['Service PostgreSQL cible, environnement partagé et titulaire autorisé.', 'RPO/RTO, sauvegarde réelle et restauration depuis sauvegarde.', 'Identité de déploiement et fenêtre de migration.', 'Références GED gouvernées pour migration et outbox.', 'Titulaire, destinataires, worker, reprises et supervision Outbox.'],
    verdict: 'QUALIFICATION CONSOLIDÉE · 9 lignes confirmées dans leur portée synthétique, 8 partielles et 5 ouvertes. G1 reste ouverte, L2 fermé et 0/6 condition G1 clôturable.',
    boundary: 'Aucune qualification synthétique ne désigne une valeur de production. Les secrets, comptes, infrastructures et données réelles restent hors périmètre.'
  },
  EN: {
    eyebrow: 'GROUPED EVIDENCE QUALIFICATION · REF-01-G1-QLF-001 · V1.0 · 30 AUG 2026',
    title: 'Twenty-two values qualified in one package without fictitious validation',
    intro: 'REF-01-DEC-066 applies Fast Track to the isolated L1 package sources. The nine qualified lines describe only the observed synthetic scenario; eight partial and five open lines remain explicit exceptions.',
    counters: [['Checked lines', '22/22', 'Three packages'], ['Qualified', '9', 'Synthetic scope only'], ['Partial', '8', 'Incomplete evidence or authority'], ['Open', '5', 'Missing decision or evidence']],
    statuses: { qualified: 'QUALIFIED · SYNTHETIC', partial: 'PARTIAL', open: 'OPEN' },
    labels: { field: 'Value', finding: 'Retained qualification', evidence: 'Controlled evidence', status: 'Status' },
    exceptionsTitle: 'Five exception families to address, not thirteen separate decisions',
    exceptions: ['Target PostgreSQL service, shared environment and authorised holder.', 'RPO/RTO, real backup and restore from backup.', 'Deployment identity and migration window.', 'Governed DMS references for migration and outbox.', 'Outbox holder, recipients, worker, recovery and monitoring.'],
    verdict: 'CONSOLIDATED QUALIFICATION · 9 lines confirmed within their synthetic scope, 8 partial and 5 open. G1 remains open, L2 closed and 0/6 G1 conditions closable.',
    boundary: 'No synthetic qualification designates a production value. Secrets, accounts, infrastructure and real data remain out of scope.'
  },
  DE: {
    eyebrow: 'GEBÜNDELTE NACHWEISQUALIFIZIERUNG · REF-01-G1-QLF-001 · V1.0 · 30.08.2026',
    title: 'Zweiundzwanzig Werte in einem Paket ohne fiktive Validierung qualifiziert',
    intro: 'REF-01-DEC-066 wendet Fast Track auf die Quellen des isolierten L1-Pakets an. Die neun qualifizierten Zeilen beschreiben nur das beobachtete synthetische Szenario; acht teilweise und fünf offene Zeilen bleiben ausdrückliche Ausnahmen.',
    counters: [['Geprüfte Zeilen', '22/22', 'Drei Pakete'], ['Qualifiziert', '9', 'Nur synthetischer Umfang'], ['Teilweise', '8', 'Unvollständiger Nachweis oder Autorität'], ['Offen', '5', 'Entscheid oder Nachweis fehlt']],
    statuses: { qualified: 'QUALIFIZIERT · SYNTHETISCH', partial: 'TEILWEISE', open: 'OFFEN' },
    labels: { field: 'Wert', finding: 'Übernommene Qualifizierung', evidence: 'Kontrollierter Nachweis', status: 'Stand' },
    exceptionsTitle: 'Fünf Ausnahmefamilien statt dreizehn getrennter Entscheide',
    exceptions: ['Ziel-PostgreSQL-Dienst, geteilte Umgebung und autorisierter Träger.', 'RPO/RTO, reale Sicherung und Wiederherstellung aus Sicherung.', 'Bereitstellungsidentität und Migrationsfenster.', 'Gesteuerte DMS-Referenzen für Migration und Outbox.', 'Outbox-Träger, Empfänger, Worker, Wiederanlauf und Überwachung.'],
    verdict: 'KONSOLIDIERTE QUALIFIZIERUNG · 9 Zeilen in ihrem synthetischen Umfang bestätigt, 8 teilweise und 5 offen. G1 bleibt offen, L2 geschlossen und 0/6 G1-Bedingungen schliessbar.',
    boundary: 'Keine synthetische Qualifizierung bestimmt einen Produktionswert. Geheimnisse, Konten, Infrastruktur und Realdaten bleiben ausserhalb des Umfangs.'
  }
};

const StatusBadge = ({ status, label }) => <span className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>{label}</span>;

const InstitutionalPeopleTeamsGateG1FastTrackQualification = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-qlf-001" data-testid="ref01-g1-fast-track-qualification" className="scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><CheckCircle2 className="shrink-0 text-sky-300" size={26} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 1 ? <CheckCircle2 className="text-emerald-300" size={19} aria-hidden="true" /> : index === 2 ? <CircleDotDashed className="text-amber-300" size={19} aria-hidden="true" /> : <FileWarning className={index === 3 ? 'text-rose-300' : 'text-sky-300'} size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 space-y-4">{PACKAGES.map(pkg => { const Icon = pkg.icon; return <article key={pkg.id} data-testid="ref01-g1-fast-track-package" className="m3s-raised p-3 sm:p-4"><div className="flex items-center gap-2"><Icon className="text-sky-300" size={19} aria-hidden="true" /><p className="text-xs font-semibold text-sky-300">{pkg.id}</p><h5 className="text-sm font-semibold text-slate-100">{pkg.title[language] || pkg.title.FR}</h5></div><div className="mt-3 hidden overflow-x-auto rounded-md border border-slate-700 xl:block"><table className="w-full min-w-[1120px] border-collapse text-left text-xs"><thead className="bg-slate-900/70 text-slate-300"><tr><th className="px-3 py-3 font-semibold">ID</th><th className="px-3 py-3 font-semibold">{t.labels.field}</th><th className="px-3 py-3 font-semibold">{t.labels.finding}</th><th className="px-3 py-3 font-semibold">{t.labels.evidence}</th><th className="px-3 py-3 font-semibold">{t.labels.status}</th></tr></thead><tbody className="divide-y divide-slate-700">{pkg.rows.map(([id, field, finding, evidence, status]) => <tr key={id} data-testid="ref01-g1-fast-track-value" className="align-top"><td className="px-3 py-3 font-semibold text-sky-300">{id}</td><th scope="row" className="px-3 py-3 font-semibold text-slate-100">{field[language] || field.FR}</th><td className="px-3 py-3 leading-5 text-slate-300">{finding[language] || finding.FR}</td><td className="px-3 py-3 leading-5 text-slate-400">{evidence}</td><td className="px-3 py-3"><StatusBadge status={status} label={t.statuses[status]} /></td></tr>)}</tbody></table></div><div className="mt-3 grid grid-cols-1 gap-3 xl:hidden">{pkg.rows.map(([id, field, finding, evidence, status]) => <dl key={id} data-testid="ref01-g1-fast-track-value" className="rounded-md border border-slate-700 bg-slate-950/20 p-3 text-xs"><div className="flex flex-wrap items-start justify-between gap-2"><div><dt className="font-semibold text-sky-300">{id}</dt><dd className="mt-1 text-sm font-semibold text-slate-100">{field[language] || field.FR}</dd></div><StatusBadge status={status} label={t.statuses[status]} /></div><div className="mt-3"><dt className="font-semibold text-slate-400">{t.labels.finding}</dt><dd className="mt-1 leading-5 text-slate-300">{finding[language] || finding.FR}</dd></div><div className="mt-2"><dt className="font-semibold text-slate-400">{t.labels.evidence}</dt><dd className="mt-1 break-words leading-5 text-slate-400">{evidence}</dd></div></dl>)}</div></article>; })}</div>
      <div className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3"><h5 className="text-sm font-semibold text-amber-100">{t.exceptionsTitle}</h5><ol className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.exceptions.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-950/50 font-semibold text-amber-200">{index + 1}</span>{item}</li>)}</ol></div>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-sm font-semibold leading-6 text-sky-100">{t.verdict}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1FastTrackQualification;
