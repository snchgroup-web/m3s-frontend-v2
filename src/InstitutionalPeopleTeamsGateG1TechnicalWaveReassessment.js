import React from 'react';
import { AlertTriangle, DatabaseBackup, LockKeyhole, RadioTower, RefreshCcw, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'RÉÉVALUATION CANDIDATE DE LA VAGUE TECHNIQUE · REF-01-G1-REV-005 · V0.1 · 30-08-2026',
    title: 'Mesurer la préparation documentaire sans conclure à une aptitude technique',
    intro: 'Les trois fiches unitaires de WAV-003 sont confirmées comme structures documentaires. Cette revue candidate consolide uniquement leur maturité de cadrage ; aucune valeur ouverte ne devient prouvée et aucune exécution n’est autorisée.',
    counters: [['Structures confirmées', '3/3', 'PostgreSQL · Migration · Outbox'], ['Champs structurés', '33/33', 'Onze champs par fiche'], ['Valeurs à compléter', '22', 'Six · huit · huit'], ['Conditions G1 clôturables', '0/6', 'L2 reste fermé']],
    labels: { state: 'État documentaire', gap: 'Écart restant', next: 'Suite gouvernée' },
    statuses: { prepared: 'STRUCTURE CONFIRMÉE', locked: 'NON EXÉCUTÉ · FERMÉ' },
    items: [
      ['1 · PostgreSQL et restauration', 'AUT-02-01-001 V1.0 structure onze champs ; six désignations restent ouvertes.', 'Service, environnement, titulaire, RPO/RTO, sauvegarde et restauration testée.', 'Qualifier les six valeurs dans un lot séparé.', 'prepared'],
      ['2 · Migration et retour arrière', 'AUT-02-04-001 V1.0 structure onze champs ; huit valeurs restent ouvertes ou à confirmer.', 'Source, cible, identité, commande, fenêtre, seuil, preuve GED et environnement.', 'Qualifier les huit valeurs sans lancer de migration.', 'prepared'],
      ['3 · Outbox, supervision et reprise', 'AUT-02-05-001 V1.0 structure onze champs ; huit valeurs restent ouvertes ou à confirmer.', 'Transport, titulaire, destinataires, worker, délais, seuils, dépôt GED et environnement.', 'Qualifier les huit valeurs sans ouvrir de worker ni alerte.', 'prepared'],
      ['4 · Sortie G1 et ouverture L2', 'Trois structures sont gouvernées, mais aucune preuve technique réelle n’est produite.', 'Environnements autorisés, essais synthétiques exécutés, résultats rapprochés et décisions distinctes.', 'Maintenir G1 ouverte et L2 fermé.', 'locked']
    ],
    verdict: 'CANDIDAT · 3/3 structures et 33/33 champs sont documentés, mais 22 valeurs restent à compléter, 0 test est exécuté et 0/6 condition G1 est clôturable.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-REV-005 V0.1 comme lecture gouvernée de la vague technique.',
    boundary: 'La confirmation de cette revue ne vaudra ni GO, ni autorisation d’environnement, ni preuve d’exécution, ni aptitude à la production, ni ouverture L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE TECHNICAL-WAVE REASSESSMENT · REF-01-G1-REV-005 · V0.1 · 30 AUG 2026',
    title: 'Measure documentary preparation without claiming technical readiness',
    intro: 'All three WAV-003 individual sheets are confirmed as documentary structures. This candidate review consolidates framing maturity only; no open value becomes proven and no execution is authorised.',
    counters: [['Confirmed structures', '3/3', 'PostgreSQL · Migration · Outbox'], ['Structured fields', '33/33', 'Eleven fields per sheet'], ['Values to complete', '22', 'Six · eight · eight'], ['Closable G1 conditions', '0/6', 'L2 remains closed']],
    labels: { state: 'Documentary state', gap: 'Remaining gap', next: 'Governed next step' },
    statuses: { prepared: 'STRUCTURE CONFIRMED', locked: 'NOT EXECUTED · CLOSED' },
    items: [
      ['1 · PostgreSQL and restoration', 'AUT-02-01-001 V1.0 structures eleven fields; six designations remain open.', 'Service, environment, holder, RPO/RTO, backup and tested restoration.', 'Qualify the six values in a separate package.', 'prepared'],
      ['2 · Migration and rollback', 'AUT-02-04-001 V1.0 structures eleven fields; eight values remain open or to confirm.', 'Source, target, identity, command, window, threshold, DMS evidence and environment.', 'Qualify all eight values without starting a migration.', 'prepared'],
      ['3 · Outbox, monitoring and recovery', 'AUT-02-05-001 V1.0 structures eleven fields; eight values remain open or to confirm.', 'Transport, holder, recipients, worker, delays, thresholds, DMS repository and environment.', 'Qualify all eight values without opening a worker or alert.', 'prepared'],
      ['4 · G1 exit and L2 opening', 'Three structures are governed, but no real technical evidence is produced.', 'Authorised environments, executed synthetic tests, reconciled results and separate decisions.', 'Keep G1 open and L2 closed.', 'locked']
    ],
    verdict: 'CANDIDATE · 3/3 structures and 33/33 fields are documented, but 22 values remain to complete, 0 tests are executed and 0/6 G1 conditions are closable.',
    next: 'Next human decision: confirm or amend REF-01-G1-REV-005 V0.1 as the governed reading of the technical wave.',
    boundary: 'Confirming this review will be neither a GO, environment authorisation, execution evidence, production readiness nor an L2 opening.'
  },
  DE: {
    eyebrow: 'KANDIDATEN-NEUBEWERTUNG DER TECHNISCHEN WELLE · REF-01-G1-REV-005 · V0.1 · 30.08.2026',
    title: 'Dokumentvorbereitung messen, ohne technische Einsatzbereitschaft zu behaupten',
    intro: 'Alle drei Einzelblätter von WAV-003 sind als Dokumentstrukturen bestätigt. Diese Kandidatenprüfung konsolidiert nur die Rahmenreife; kein offener Wert wird damit belegt und keine Ausführung ist autorisiert.',
    counters: [['Bestätigte Strukturen', '3/3', 'PostgreSQL · Migration · Outbox'], ['Strukturierte Felder', '33/33', 'Elf Felder je Blatt'], ['Zu ergänzende Werte', '22', 'Sechs · acht · acht'], ['Schliessbare G1-Bedingungen', '0/6', 'L2 bleibt geschlossen']],
    labels: { state: 'Dokumentarischer Stand', gap: 'Verbleibende Lücke', next: 'Gesteuerter Folgeschritt' },
    statuses: { prepared: 'STRUKTUR BESTÄTIGT', locked: 'NICHT AUSGEFÜHRT · GESCHLOSSEN' },
    items: [
      ['1 · PostgreSQL und Wiederherstellung', 'AUT-02-01-001 V1.0 strukturiert elf Felder; sechs Bestimmungen bleiben offen.', 'Dienst, Umgebung, Träger, RPO/RTO, Sicherung und geprüfte Wiederherstellung.', 'Die sechs Werte in einem getrennten Paket qualifizieren.', 'prepared'],
      ['2 · Migration und Rollback', 'AUT-02-04-001 V1.0 strukturiert elf Felder; acht Werte bleiben offen oder zu bestätigen.', 'Quelle, Ziel, Identität, Befehl, Fenster, Schwelle, DMS-Nachweis und Umgebung.', 'Die acht Werte ohne Migrationsstart qualifizieren.', 'prepared'],
      ['3 · Outbox, Überwachung und Wiederanlauf', 'AUT-02-05-001 V1.0 strukturiert elf Felder; acht Werte bleiben offen oder zu bestätigen.', 'Transport, Träger, Empfänger, Worker, Verzögerungen, Schwellen, DMS-Ablage und Umgebung.', 'Die acht Werte ohne Worker- oder Alarmöffnung qualifizieren.', 'prepared'],
      ['4 · G1-Ausgang und L2-Öffnung', 'Drei Strukturen sind gesteuert, aber kein technischer Realnachweis ist erstellt.', 'Autorisierte Umgebungen, ausgeführte synthetische Prüfungen, abgestimmte Ergebnisse und getrennte Entscheide.', 'G1 offen und L2 geschlossen halten.', 'locked']
    ],
    verdict: 'KANDIDAT · 3/3 Strukturen und 33/33 Felder sind dokumentiert, aber 22 Werte bleiben zu ergänzen, 0 Prüfungen sind ausgeführt und 0/6 G1-Bedingungen schliessbar.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-REV-005 V0.1 als gesteuerte Lesung der technischen Welle bestätigen oder ändern.',
    boundary: 'Die Bestätigung dieser Prüfung ist weder GO, Umgebungsautorisierung, Ausführungsnachweis, Produktionsreife noch L2-Öffnung.'
  }
};

const ICONS = [DatabaseBackup, RefreshCcw, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1TechnicalWaveReassessment = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rev-005" data-testid="ref01-g1-technical-wave-reassessment" className="mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-3 sm:p-4">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <ShieldCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, state, gap, next, status], index) => { const Icon = ICONS[index]; const badge = status === 'prepared' ? 'border-sky-700/70 bg-sky-950/25 text-sky-100' : 'border-rose-700/70 bg-rose-950/25 text-rose-100'; return <article key={title} data-testid="ref01-g1-technical-wave-condition" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" /><h6 className="break-words text-sm font-semibold text-slate-100">{title}</h6></div><span className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${badge}`}>{t.statuses[status]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-emerald-300">{t.labels.state}</dt><dd className="mt-1 text-slate-300">{state}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.gap}</dt><dd className="mt-1 text-slate-300">{gap}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.next}</dt><dd className="mt-1 text-slate-300">{next}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-sm font-semibold leading-6 text-amber-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1TechnicalWaveReassessment;
