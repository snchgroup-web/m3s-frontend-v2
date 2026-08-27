import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE MIGRATION ET RETOUR ARRIÈRE · REF-01-DEC-032 · V1.0 · 27-08-2026',
    title: 'Confirmer la procédure sans ouvrir d’environnement ni exécuter de migration',
    intro: 'Cheikh confirme REF-01-G1-PKG-04-001 V0.1. La procédure devient V1.0 comme cadre documentaire ; les environnements, commandes, objets, responsables, seuils et preuves restent à qualifier.',
    counters: [['Procédure confirmée', '1/1', 'PKG-04 V1.0'], ['Environnements ouverts', '0', 'Aucun accès'], ['Migrations exécutées', '0', 'Aucune action'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-032', version: 'V1.0', status: 'Procédure PKG-04 confirmée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PKG-04-001 V0.1 est confirmée et promue en V1.0 comme procédure documentaire gouvernée pour le périmètre, les approbations, une séquence isolée, le retour arrière et les preuves.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « je confirme `REF-01-G1-PKG-04-001 V0.1` , merci de continuer ».',
      limit: 'Cette décision ne sélectionne aucun environnement, outil ou commande, ne nomme aucun exécutant, ne fixe aucun RPO, RTO, seuil ou fenêtre et ne permet aucun accès, sauvegarde réelle, modification de table ou endpoint, migration, rollback ou changement de démarrage. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · PKG-04-001 V1.0 devient la procédure documentaire gouvernée du lot 4.',
    next: 'Étape produite ci-dessous : REF-01-G1-PKG-05-001 V0.1 prépare outbox, supervision, alerte et reprise sans activer de worker.',
    boundary: 'Tout worker, notification, alerte, surveillance, rejeu, quarantaine ou automatisation réelle exige un arbitrage séparé.'
  },
  EN: {
    eyebrow: 'HUMAN MIGRATION AND ROLLBACK CONFIRMATION · REF-01-DEC-032 · V1.0 · 27 AUG 2026',
    title: 'Confirm the procedure without opening an environment or running a migration',
    intro: 'Cheikh confirms REF-01-G1-PKG-04-001 V0.1. The procedure becomes V1.0 as a documentary framework; environments, commands, objects, owners, thresholds and evidence remain to qualify.',
    counters: [['Confirmed procedure', '1/1', 'PKG-04 V1.0'], ['Opened environments', '0', 'No access'], ['Executed migrations', '0', 'No action'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-032', version: 'V1.0', status: 'PKG-04 procedure confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PKG-04-001 V0.1 is confirmed and promoted to V1.0 as the governed documentary procedure for scope, approvals, an isolated sequence, rollback and evidence.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “je confirme `REF-01-G1-PKG-04-001 V0.1` , merci de continuer”.',
      limit: 'This decision selects no environment, tool or command, names no executor, sets no RPO, RTO, threshold or window and permits no access, real backup, table or endpoint change, migration, rollback or startup change. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · PKG-04-001 V1.0 becomes the governed documentary procedure for package 4.',
    next: 'Produced step below: REF-01-G1-PKG-05-001 V0.1 prepares outbox, monitoring, alerts and recovery without activating a worker.',
    boundary: 'Any real worker, notification, alert, monitoring, replay, quarantine or automation requires a separate decision.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG MIGRATION UND ROLLBACK · REF-01-DEC-032 · V1.0 · 27.08.2026',
    title: 'Das Verfahren ohne Umgebungsöffnung oder Migration bestätigen',
    intro: 'Cheikh bestätigt REF-01-G1-PKG-04-001 V0.1. Das Verfahren wird zu V1.0 als Dokumentrahmen; Umgebungen, Befehle, Objekte, Verantwortliche, Schwellen und Nachweise bleiben zu qualifizieren.',
    counters: [['Bestätigtes Verfahren', '1/1', 'PKG-04 V1.0'], ['Geöffnete Umgebungen', '0', 'Kein Zugriff'], ['Ausgeführte Migrationen', '0', 'Keine Aktion'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-032', version: 'V1.0', status: 'PKG-04-Verfahren bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PKG-04-001 V0.1 wird bestätigt und als gesteuertes Dokumentverfahren V1.0 für Umfang, Genehmigungen, eine isolierte Sequenz, Rollback und Nachweise geführt.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « je confirme `REF-01-G1-PKG-04-001 V0.1` , merci de continuer ».',
      limit: 'Dieser Entscheid wählt keine Umgebung, kein Werkzeug oder Befehl, nennt keine ausführende Person, setzt kein RPO, RTO, keine Schwelle oder kein Fenster und erlaubt keinen Zugriff, reale Sicherung, Tabellen- oder Endpoint-Änderung, Migration, Rollback oder Startänderung. G1 bleibt offen und L2 geschlossen.'
    },
    status: 'BESTÄTIGT · PKG-04-001 V1.0 wird das gesteuerte Dokumentverfahren für Paket 4.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PKG-05-001 V0.1 bereitet Outbox, Überwachung, Alarm und Wiederanlauf ohne Worker-Aktivierung vor.',
    boundary: 'Jeder reale Worker, Hinweis, Alarm, jede Überwachung, Wiederholung, Quarantäne oder Automatisierung erfordert einen eigenen Entscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1MigrationRollbackConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-migration-rollback-confirmation" className="m3s-ref01-g1-migration-rollback-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-migration-rollback-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-migration-rollback-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1MigrationRollbackConfirmation;
