import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE OUTBOX ET SUPERVISION · REF-01-DEC-033 · V1.0 · 27-08-2026',
    title: 'Confirmer la spécification sans activer de worker ni d’alerte',
    intro: 'Cheikh confirme REF-01-G1-PKG-05-001 V0.1. Le dossier devient V1.0 comme spécification documentaire ; runtime, seuils, canaux, destinataires, responsabilités et preuves restent à qualifier.',
    counters: [['Spécification confirmée', '1/1', 'PKG-05 V1.0'], ['Workers actifs', '0', 'Aucun traitement'], ['Alertes réelles', '0', 'Aucune surveillance'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-033', version: 'V1.0', status: 'Spécification PKG-05 confirmée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PKG-05-001 V0.1 est confirmée et promue en V1.0 comme spécification documentaire gouvernée du worker, des métriques, des alertes, de la quarantaine, du rejeu et de la preuve.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « woow super, merci et je valide `REF-01-G1-PKG-05-001 V0.1` ».',
      limit: 'Cette décision n’active aucun worker, branchement de file, planification, notification, alerte, métrique, quarantaine, rejeu, rapprochement ou automatisation. Elle ne fixe aucun seuil, canal, destinataire, fréquence ou responsable, ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · PKG-05-001 V1.0 devient la spécification documentaire gouvernée du lot 5.',
    next: 'Étape produite ci-dessous : REF-01-G1-REV-003 V0.1 consolide les cinq lots sans déclarer G1 clôturable.',
    boundary: 'La confirmation documentaire ne constitue ni une preuve d’exploitation, ni une autorisation de production, ni une progression technique.'
  },
  EN: {
    eyebrow: 'HUMAN OUTBOX AND MONITORING CONFIRMATION · REF-01-DEC-033 · V1.0 · 27 AUG 2026',
    title: 'Confirm the specification without activating a worker or alert',
    intro: 'Cheikh confirms REF-01-G1-PKG-05-001 V0.1. The file becomes V1.0 as a documentary specification; runtime, thresholds, channels, recipients, ownership and evidence remain to qualify.',
    counters: [['Confirmed specification', '1/1', 'PKG-05 V1.0'], ['Active workers', '0', 'No processing'], ['Real alerts', '0', 'No monitoring'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-033', version: 'V1.0', status: 'PKG-05 specification confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PKG-05-001 V0.1 is confirmed and promoted to V1.0 as the governed documentary specification for the worker, metrics, alerts, quarantine, replay and evidence.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “woow super, merci et je valide `REF-01-G1-PKG-05-001 V0.1`”.',
      limit: 'This decision activates no worker, queue connection, scheduling, notification, alert, metric, quarantine, replay, reconciliation or automation. It sets no threshold, channel, recipient, frequency or owner, does not close G1 and does not open L2.'
    },
    status: 'CONFIRMED · PKG-05-001 V1.0 becomes the governed documentary specification for package 5.',
    next: 'Produced step below: REF-01-G1-REV-003 V0.1 consolidates the five packages without declaring G1 closable.',
    boundary: 'Documentary confirmation is neither operational evidence, production authorisation nor technical progress.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG OUTBOX UND ÜBERWACHUNG · REF-01-DEC-033 · V1.0 · 27.08.2026',
    title: 'Die Spezifikation ohne Worker- oder Alarmaktivierung bestätigen',
    intro: 'Cheikh bestätigt REF-01-G1-PKG-05-001 V0.1. Die Akte wird als Dokumentspezifikation zu V1.0; Runtime, Schwellen, Kanäle, Empfänger, Verantwortungen und Nachweise bleiben zu qualifizieren.',
    counters: [['Bestätigte Spezifikation', '1/1', 'PKG-05 V1.0'], ['Aktive Worker', '0', 'Keine Verarbeitung'], ['Reale Alarme', '0', 'Keine Überwachung'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-033', version: 'V1.0', status: 'PKG-05-Spezifikation bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PKG-05-001 V0.1 wird bestätigt und als gesteuerte Dokumentspezifikation V1.0 für Worker, Messwerte, Alarme, Quarantäne, Wiederholung und Nachweis geführt.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « woow super, merci et je valide `REF-01-G1-PKG-05-001 V0.1` ».',
      limit: 'Dieser Entscheid aktiviert keinen Worker, keine Queue-Verbindung, Planung, Benachrichtigung, keinen Alarm, Messwert, keine Quarantäne, Wiederholung, Abstimmung oder Automatisierung. Er setzt keine Schwelle, keinen Kanal, Empfänger, Rhythmus oder Verantwortlichen, schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · PKG-05-001 V1.0 wird die gesteuerte Dokumentspezifikation für Paket 5.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-REV-003 V0.1 konsolidiert die fünf Pakete, ohne G1 als schliessbar zu erklären.',
    boundary: 'Die Dokumentbestätigung ist weder Betriebsnachweis noch Produktionsfreigabe oder technischer Fortschritt.'
  }
};

const InstitutionalPeopleTeamsGateG1OutboxMonitoringConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-outbox-monitoring-confirmation" className="m3s-ref01-g1-outbox-monitoring-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-outbox-monitoring-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-outbox-monitoring-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1OutboxMonitoringConfirmation;
