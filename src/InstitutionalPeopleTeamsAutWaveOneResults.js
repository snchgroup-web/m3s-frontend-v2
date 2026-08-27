import React from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, FileSearch, FlaskConical, Scale } from 'lucide-react';

const SOURCES = [
  ['PG-BACKUP', 'PostgreSQL · Backup and Restore', 'https://www.postgresql.org/docs/current/backup.html', 'backup'],
  ['PG-RESTORE', 'PostgreSQL · pg_restore', 'https://www.postgresql.org/docs/current/app-pgrestore.html', 'restore'],
  ['PG-PITR', 'PostgreSQL · Continuous Archiving and PITR', 'https://www.postgresql.org/docs/current/continuous-archiving.html', 'continuity'],
  ['PG-TLS', 'PostgreSQL · Secure TCP/IP Connections with SSL', 'https://www.postgresql.org/docs/current/ssl-tcp.html', 'encryption'],
  ['PG-CRYPTO', 'PostgreSQL · pgcrypto', 'https://www.postgresql.org/docs/current/pgcrypto.html', 'encryption'],
  ['PG-ROLES', 'PostgreSQL · Database Roles', 'https://www.postgresql.org/docs/current/user-manag.html', 'access'],
  ['PG-RLS', 'PostgreSQL · Row Security Policies', 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html', 'access'],
  ['BQ-LOCATION', 'Google Cloud · BigQuery locations', 'https://cloud.google.com/bigquery/docs/locations', 'location'],
  ['GCP-ENCRYPTION', 'Google Cloud · Default encryption at rest', 'https://cloud.google.com/docs/security/encryption/default-encryption', 'encryption'],
  ['GCP-SUBPROCESSORS', 'Google Cloud · Subprocessors', 'https://cloud.google.com/terms/subprocessors', 'subprocessors']
];

const COPY = {
  FR: {
    eyebrow: 'RÉSULTATS PRÉPARATOIRES DE LA VAGUE 1 · REF-01-G1-RES-001 · V0.1 · 27-08-2026',
    title: 'Produire les preuves autorisées et arrêter une incohérence avant qu’elle ne se propage',
    intro: 'AUT-A et AUT-B sont produits dans les limites de DEC-023. Le contrôle de provenance révèle toutefois que les libellés AUT-C et AUT-D ont dérivé de la fiche source REQ-001 ; ils restent donc suspendus à un amendement humain unique.',
    counters: [['Sources officielles indexées', '10', 'Pages publiques uniquement'], ['Contrôles synthétiques', '7/7', 'Rejoués localement'], ['Actions externes', '0', 'Aucun compte, contact ou envoi'], ['Écart de cohérence', '1', 'Correspondance C/D à corriger']],
    aTitle: 'AUT-A · Index de documentation officielle',
    aIntro: 'Ces liens prouvent des capacités documentées de PostgreSQL et Google Cloud. Ils ne prouvent ni la configuration M3S, ni la région réelle d’un futur PostgreSQL, ni un contrat fournisseur.',
    sourceLabels: { scope: 'Périmètre', access: 'Accès', state: 'État' },
    sourceScopes: { backup: 'Sauvegarde', restore: 'Restauration logique', continuity: 'PITR et continuité', encryption: 'Chiffrement', access: 'Rôles et accès', location: 'Localisation BigQuery', subprocessors: 'Sous-traitants Google Cloud' },
    publicAccess: 'Source officielle publique · consultée le 27-08-2026',
    sourceState: 'INDEXÉE · NON PROMUE',
    aFinding: 'Conclusion AUT-A : les mécanismes du moteur et de la projection BigQuery sont documentables. Le service PostgreSQL cible n’étant pas choisi, sa région d’hébergement, son chiffrement géré, ses sauvegardes et ses sous-traitants restent non déterminables.',
    bTitle: 'AUT-B · Matrice de preuves techniques synthétiques',
    bIntro: 'Le contrôle a été rejoué le 27-08-2026 avec PGlite, des UUID fictifs et aucune connexion à une base partagée ou de production.',
    checks: [
      ['B-01', 'Migration montante', 'Schéma REF-01 créé dans un moteur isolé.'],
      ['B-02', 'Structure attendue', 'Les cinq tables event, evidence_link, membership_period, object_version et outbox sont retrouvées.'],
      ['B-03', 'Idempotence', 'Une clé d’idempotence dupliquée est refusée.'],
      ['B-04', 'Immutabilité', 'La modification d’un événement append-only est refusée.'],
      ['B-05', 'Appartenance', 'Une période Personne–Équipe chevauchante est refusée.'],
      ['B-06', 'Outbox', 'Un état completed sans horodatage de fin est refusé.'],
      ['B-07', 'Retour arrière', 'La migration descendante supprime uniquement le schéma isolé REF-01.']
    ],
    checkState: 'REPRODUIT · SYNTHÉTIQUE',
    openTitle: 'Ce que ce test ne démontre pas',
    open: ['Aucune sauvegarde PostgreSQL réelle ni restauration pg_restore/PITR.', 'Aucune alerte, supervision ou procédure d’astreinte.', 'Aucun RPO ou RTO mesuré ou accepté par le métier.'],
    cTitle: 'AUT-C/D · Contrôle de cohérence avant exécution',
    cIntro: 'REQ-001 V1.0 et les fiches NAM/AUT confirmées constituent la chaîne amont. La fiche de vague ne doit pas en modifier silencieusement la signification.',
    columns: { code: 'Code', source: 'Chaîne source confirmée', wave: 'Libellé de la vague', verdict: 'Verdict' },
    mapping: [
      ['AUT-A', 'Documentation officielle', 'Documentation officielle', 'Cohérent'],
      ['AUT-B', 'Preuves techniques', 'Preuves techniques', 'Cohérent'],
      ['AUT-C', 'Coûts et capacité', 'Retour indépendant', 'À corriger'],
      ['AUT-D', 'Gouvernance interne', 'Revue croisée', 'À corriger']
    ],
    amendment: 'Amendement candidat : restaurer AUT-C « Coûts et capacité » et AUT-D « Gouvernance interne ». La relecture indépendante et la revue croisée deviennent des contrôles de processus après production des livrables, sans recevoir un code AUT distinct.',
    status: 'STATUT · AUT-A et AUT-B préparés, non acceptés et non promus ; AUT-C et AUT-D suspendus à la correction de correspondance.',
    next: 'Prochain arbitrage humain unique : confirmer ou amender REF-01-G1-RES-001 V0.1 et la correction C/D. Cette décision pourra accepter les résultats préparatoires A/B, sans fermer G1 ni ouvrir L2.',
    boundary: 'Aucun fournisseur, compte, secret, identité réelle, contact, envoi, donnée réelle, accès réel, test de production, tarif contractuel, source maîtresse ou mesure de progression n’est créé.'
  },
  EN: {
    eyebrow: 'WAVE 1 PREPARATORY RESULTS · REF-01-G1-RES-001 · V0.1 · 27 AUG 2026',
    title: 'Produce authorised evidence and stop an inconsistency before it spreads',
    intro: 'AUT-A and AUT-B are produced within DEC-023 limits. Provenance control nevertheless shows that AUT-C and AUT-D labels drifted from the REQ-001 source sheet; they remain suspended pending one human amendment.',
    counters: [['Official sources indexed', '10', 'Public pages only'], ['Synthetic checks', '7/7', 'Replayed locally'], ['External actions', '0', 'No account, contact or send'], ['Consistency gap', '1', 'C/D mapping to correct']],
    aTitle: 'AUT-A · Official-documentation index',
    aIntro: 'These links evidence documented PostgreSQL and Google Cloud capabilities. They prove neither the M3S configuration, the actual region of a future PostgreSQL service nor a provider contract.',
    sourceLabels: { scope: 'Scope', access: 'Access', state: 'State' },
    sourceScopes: { backup: 'Backup', restore: 'Logical restoration', continuity: 'PITR and continuity', encryption: 'Encryption', access: 'Roles and access', location: 'BigQuery location', subprocessors: 'Google Cloud subprocessors' },
    publicAccess: 'Public official source · accessed 27 Aug 2026', sourceState: 'INDEXED · NOT PROMOTED',
    aFinding: 'AUT-A conclusion: engine and BigQuery projection capabilities can be documented. Because the target PostgreSQL service is not selected, its hosting region, managed encryption, backups and subprocessors cannot yet be determined.',
    bTitle: 'AUT-B · Synthetic technical-evidence matrix',
    bIntro: 'The control was replayed on 27 Aug 2026 with PGlite, fictitious UUIDs and no connection to a shared or production database.',
    checks: [['B-01', 'Up migration', 'REF-01 schema created in an isolated engine.'], ['B-02', 'Expected structure', 'The five event, evidence_link, membership_period, object_version and outbox tables are found.'], ['B-03', 'Idempotency', 'A duplicate idempotency key is rejected.'], ['B-04', 'Immutability', 'Updating an append-only event is rejected.'], ['B-05', 'Membership', 'An overlapping Person–Team period is rejected.'], ['B-06', 'Outbox', 'A completed state without completion time is rejected.'], ['B-07', 'Rollback', 'The down migration removes only the isolated REF-01 schema.']],
    checkState: 'REPRODUCED · SYNTHETIC', openTitle: 'What this test does not demonstrate',
    open: ['No real PostgreSQL backup or pg_restore/PITR restoration.', 'No alerting, monitoring or on-call procedure.', 'No measured or business-accepted RPO or RTO.'],
    cTitle: 'AUT-C/D · Consistency control before execution',
    cIntro: 'REQ-001 V1.0 and the confirmed NAM/AUT records form the upstream chain. The wave sheet must not silently alter their meaning.',
    columns: { code: 'Code', source: 'Confirmed source chain', wave: 'Wave label', verdict: 'Verdict' },
    mapping: [['AUT-A', 'Official documentation', 'Official documentation', 'Consistent'], ['AUT-B', 'Technical evidence', 'Technical evidence', 'Consistent'], ['AUT-C', 'Costs and capacity', 'Independent feedback', 'To correct'], ['AUT-D', 'Internal governance', 'Cross-review', 'To correct']],
    amendment: 'Candidate amendment: restore AUT-C “Costs and capacity” and AUT-D “Internal governance”. Independent and cross-review become process controls after output production, without a separate AUT code.',
    status: 'STATUS · AUT-A and AUT-B prepared, not accepted or promoted; AUT-C and AUT-D suspended pending the mapping correction.',
    next: 'Next single human decision: confirm or amend REF-01-G1-RES-001 V0.1 and the C/D correction. It may accept preparatory A/B results without closing G1 or opening L2.',
    boundary: 'No provider, account, secret, real identity, contact, send, real data, real access, production test, contractual price, master source or progress measure is created.'
  },
  DE: {
    eyebrow: 'VORBEREITENDE ERGEBNISSE WELLE 1 · REF-01-G1-RES-001 · V0.1 · 27.08.2026',
    title: 'Autorisierte Nachweise erstellen und eine Inkonsistenz vor der Weitergabe stoppen',
    intro: 'AUT-A und AUT-B werden innerhalb der Grenzen von DEC-023 erstellt. Die Herkunftskontrolle zeigt jedoch eine Abweichung der AUT-C- und AUT-D-Bezeichnungen vom Quellenblatt REQ-001; beide bleiben bis zu einer menschlichen Änderung ausgesetzt.',
    counters: [['Offizielle Quellen indexiert', '10', 'Nur öffentliche Seiten'], ['Synthetische Kontrollen', '7/7', 'Lokal wiederholt'], ['Externe Aktionen', '0', 'Kein Konto, Kontakt oder Versand'], ['Kohärenzabweichung', '1', 'C/D-Zuordnung zu korrigieren']],
    aTitle: 'AUT-A · Index offizieller Dokumentation',
    aIntro: 'Diese Links belegen dokumentierte Fähigkeiten von PostgreSQL und Google Cloud. Sie belegen weder die M3S-Konfiguration noch die reale Region eines künftigen PostgreSQL-Dienstes oder einen Anbietervertrag.',
    sourceLabels: { scope: 'Umfang', access: 'Zugriff', state: 'Stand' },
    sourceScopes: { backup: 'Sicherung', restore: 'Logische Wiederherstellung', continuity: 'PITR und Kontinuität', encryption: 'Verschlüsselung', access: 'Rollen und Zugriff', location: 'BigQuery-Standort', subprocessors: 'Google-Cloud-Unterauftragnehmer' },
    publicAccess: 'Öffentliche offizielle Quelle · abgerufen am 27.08.2026', sourceState: 'INDEXIERT · NICHT GEFÖRDERT',
    aFinding: 'AUT-A-Ergebnis: Fähigkeiten des Motors und der BigQuery-Projektion sind dokumentierbar. Da der PostgreSQL-Zieldienst nicht gewählt ist, bleiben Hostingregion, verwaltete Verschlüsselung, Sicherungen und Unterauftragnehmer unbestimmbar.',
    bTitle: 'AUT-B · Matrix synthetischer technischer Nachweise',
    bIntro: 'Die Kontrolle wurde am 27.08.2026 mit PGlite, fiktiven UUIDs und ohne Verbindung zu einer gemeinsamen oder produktiven Datenbank wiederholt.',
    checks: [['B-01', 'Aufwärtsmigration', 'REF-01-Schema in isolierter Engine erstellt.'], ['B-02', 'Erwartete Struktur', 'Die fünf Tabellen event, evidence_link, membership_period, object_version und outbox sind vorhanden.'], ['B-03', 'Idempotenz', 'Ein doppelter Idempotenzschlüssel wird abgelehnt.'], ['B-04', 'Unveränderlichkeit', 'Die Änderung eines Append-only-Ereignisses wird abgelehnt.'], ['B-05', 'Mitgliedschaft', 'Eine überlappende Person–Team-Periode wird abgelehnt.'], ['B-06', 'Outbox', 'Completed ohne Abschlusszeit wird abgelehnt.'], ['B-07', 'Rückkehr', 'Die Abwärtsmigration entfernt nur das isolierte REF-01-Schema.']],
    checkState: 'WIEDERHOLT · SYNTHETISCH', openTitle: 'Was dieser Test nicht belegt',
    open: ['Keine reale PostgreSQL-Sicherung oder pg_restore-/PITR-Wiederherstellung.', 'Keine Warnung, Überwachung oder Bereitschaftsregel.', 'Kein gemessenes oder fachlich akzeptiertes RPO/RTO.'],
    cTitle: 'AUT-C/D · Kohärenzkontrolle vor Ausführung',
    cIntro: 'REQ-001 V1.0 und die bestätigten NAM-/AUT-Akten bilden die vorgelagerte Kette. Das Wellenblatt darf deren Bedeutung nicht still verändern.',
    columns: { code: 'Code', source: 'Bestätigte Quellenkette', wave: 'Wellenbezeichnung', verdict: 'Urteil' },
    mapping: [['AUT-A', 'Offizielle Dokumentation', 'Offizielle Dokumentation', 'Kohärent'], ['AUT-B', 'Technische Nachweise', 'Technische Nachweise', 'Kohärent'], ['AUT-C', 'Kosten und Kapazität', 'Unabhängige Rückmeldung', 'Korrigieren'], ['AUT-D', 'Interne Governance', 'Gegenprüfung', 'Korrigieren']],
    amendment: 'Kandidatenänderung: AUT-C „Kosten und Kapazität“ und AUT-D „Interne Governance“ wiederherstellen. Unabhängige Prüfung und Gegenprüfung werden Prozesskontrollen nach Erstellung der Ergebnisse, ohne eigenen AUT-Code.',
    status: 'STAND · AUT-A und AUT-B vorbereitet, nicht angenommen oder gefördert; AUT-C und AUT-D bis zur Zuordnungskorrektur ausgesetzt.',
    next: 'Nächster gemeinsamer menschlicher Entscheid: REF-01-G1-RES-001 V0.1 und die C/D-Korrektur bestätigen oder ändern. A/B können angenommen werden, ohne G1 zu schliessen oder L2 zu öffnen.',
    boundary: 'Kein Anbieter, Konto, Geheimnis, reale Identität, Kontakt, Versand, Echtdaten, Realzugriff, Produktionstest, Vertragspreis, Masterquelle oder Fortschrittsmass wird erstellt.'
  }
};

const InstitutionalPeopleTeamsAutWaveOneResults = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-wave-one-results" className="mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-wave-one-results-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-wave-one-results-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileSearch className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <CheckCircle2 className="text-emerald-300" size={19} aria-hidden="true" /> : <AlertTriangle className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>

      <section className="mt-5 rounded-md border border-slate-700 p-3" aria-labelledby="ref01-aut-a-results-title"><div className="flex items-center gap-2"><FileSearch className="text-sky-300" size={18} aria-hidden="true" /><h6 id="ref01-aut-a-results-title" className="text-sm font-semibold text-slate-100">{t.aTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.aIntro}</p><div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">{SOURCES.map(([id, title, url, scope]) => <article key={id} className="m3s-raised p-3" data-testid="ref01-aut-a-source"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-semibold text-sky-300">{id}</p><a className="mt-1 inline-flex items-start gap-1 text-sm font-semibold text-slate-100 underline decoration-slate-600 underline-offset-4 hover:text-sky-200" href={url} target="_blank" rel="noreferrer">{title}<ExternalLink className="mt-0.5 shrink-0" size={13} aria-hidden="true" /></a></div><span className="rounded-md border border-sky-700/70 bg-sky-950/25 px-2 py-1 text-[10px] font-semibold text-sky-100">{t.sourceState}</span></div><dl className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2"><div><dt className="font-semibold text-slate-400">{t.sourceLabels.scope}</dt><dd className="mt-1 text-slate-300">{t.sourceScopes[scope]}</dd></div><div><dt className="font-semibold text-slate-400">{t.sourceLabels.access}</dt><dd className="mt-1 text-slate-300">{t.publicAccess}</dd></div></dl></article>)}</div><p className="mt-3 rounded-md border border-sky-800/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.aFinding}</p></section>

      <section className="mt-5 rounded-md border border-slate-700 p-3" aria-labelledby="ref01-aut-b-results-title"><div className="flex items-center gap-2"><FlaskConical className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-aut-b-results-title" className="text-sm font-semibold text-slate-100">{t.bTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.bIntro}</p><div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.checks.map(([id, title, result]) => <article key={id} className="m3s-raised p-3" data-testid="ref01-aut-b-check"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-semibold text-emerald-300">{id}</p><p className="mt-1 text-sm font-semibold text-slate-100">{title}</p></div><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.checkState}</span></div><p className="mt-3 text-xs leading-5 text-slate-300">{result}</p></article>)}</div><div className="mt-3 rounded-md border border-amber-800/70 bg-amber-950/10 p-3"><p className="text-xs font-semibold text-amber-100">{t.openTitle}</p><ul className="mt-2 space-y-2">{t.open.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></div></section>

      <section className="mt-5 rounded-md border border-amber-800/70 bg-amber-950/10 p-3" aria-labelledby="ref01-aut-cd-results-title"><div className="flex items-center gap-2"><Scale className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-aut-cd-results-title" className="text-sm font-semibold text-amber-100">{t.cTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.cIntro}</p><div className="mt-3 overflow-x-auto rounded-md border border-slate-700"><table className="w-full min-w-[720px] text-left text-xs"><thead className="bg-slate-900/70 text-slate-300"><tr><th className="p-3">{t.columns.code}</th><th className="p-3">{t.columns.source}</th><th className="p-3">{t.columns.wave}</th><th className="p-3">{t.columns.verdict}</th></tr></thead><tbody className="divide-y divide-slate-700">{t.mapping.map(([code, source, wave, verdict], index) => <tr key={code}><th className="p-3 font-semibold text-slate-100">{code}</th><td className="p-3 text-slate-300">{source}</td><td className="p-3 text-slate-300">{wave}</td><td className={`p-3 font-semibold ${index < 2 ? 'text-emerald-300' : 'text-amber-300'}`}>{verdict}</td></tr>)}</tbody></table></div><p className="mt-3 text-xs font-semibold leading-5 text-amber-100">{t.amendment}</p></section>

      <p className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutWaveOneResults;
