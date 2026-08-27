import React from 'react';
import { Activity, AlertTriangle, Bell, LockKeyhole, RotateCcw, ShieldCheck, Workflow } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'SUPPORT CONFIRMÉ · LOT 5 · REF-01-G1-PKG-05-001 · V1.0 · 27-08-2026',
    title: 'Spécification outbox, supervision et reprise confirmée sans activation réelle',
    intro: 'Ce dossier confirmé ordonne traitement idempotent, métriques, alertes, quarantaine et reprise. Il reste documentaire : aucun worker ne démarre et aucun système réel n’est surveillé.',
    counters: [['Dossier confirmé', '1/1', 'PKG-05-001 V1.0'], ['Axes contrôlés', '4', 'Spécification documentaire'], ['Workers actifs', '0', 'Aucun traitement'], ['Alertes réelles', '0', 'Aucune surveillance']],
    labels: { purpose: 'Finalité', checks: 'Points à documenter', outputs: 'Livrables candidats', unknowns: 'Valeurs à qualifier' },
    areas: [
      { title: 'Contrat du worker et idempotence', icon: Workflow, purpose: 'Définir le traitement d’un message sans l’exécuter.', checks: ['États, verrouillage et ordre de lecture', 'Clé d’idempotence et refus des doublons', 'Tentatives et temporisation progressive', 'Arrêt propre et reprise sans perte'], outputs: ['Contrat de worker candidat', 'Matrice états et transitions'], unknowns: 'Runtime, fréquence, lots, délais, limite de tentatives, concurrence et responsabilité.' },
      { title: 'Métriques et seuils', icon: Activity, purpose: 'Rendre la santé observable sans produire de faux indicateur.', checks: ['Volume en attente et âge du plus ancien message', 'Taux de succès, échec et rejeu', 'Latence de propagation et rapprochement', 'Fraîcheur, périmètre et provenance'], outputs: ['Dictionnaire de métriques candidat', 'Grille de seuils à valider'], unknowns: 'Métriques retenues, unités, fenêtres, seuils, fréquence et propriétaire.' },
      { title: 'Alertes, escalade et quarantaine', icon: Bell, purpose: 'Préparer la réaction aux écarts sans envoyer de notification.', checks: ['Conditions d’alerte et niveaux de gravité', 'Canaux autorisés et destinataires fonctionnels', 'Quarantaine et examen humain', 'Acquittement, escalade et clôture'], outputs: ['Matrice d’alerte candidate', 'Procédure de quarantaine'], unknowns: 'Seuils, canaux, destinataires, délais, astreinte, escalades et durée de quarantaine.' },
      { title: 'Reprise, rejeu et preuve', icon: RotateCcw, purpose: 'Préparer un rejeu contrôlé avant toute propagation.', checks: ['Préconditions et autorité de rejeu', 'Rejeu idempotent et rapprochement', 'Arrêt, compensation et reprise après échec', 'Journal de décision, résultat et anomalies'], outputs: ['Runbook de reprise candidat', 'Fiche de rapprochement et preuve'], unknowns: 'Périmètre, volume, fenêtre, autorité, contrôles, tolérances et preuve de réussite.' }
    ],
    status: 'CONFIRMÉ · REF-01-DEC-033 confirme PKG-05-001 V1.0 comme spécification documentaire gouvernée.',
    next: 'Étape produite ci-dessous : REF-01-G1-REV-003 V0.1 réévalue les six conditions G1 après confirmation des cinq lots documentaires.',
    boundary: 'Arrêt obligatoire avant worker, connexion à une file, planification, notification, alerte, métrique réelle, quarantaine, rejeu, rapprochement ou automatisation.'
  },
  EN: {
    eyebrow: 'CONFIRMED SUPPORT · PACKAGE 5 · REF-01-G1-PKG-05-001 · V1.0 · 27 AUG 2026',
    title: 'Confirmed outbox, monitoring and recovery specification without real activation',
    intro: 'This confirmed file orders idempotent processing, metrics, alerts, quarantine and recovery. It remains documentary: no worker starts and no real system is monitored.',
    counters: [['Confirmed file', '1/1', 'PKG-05-001 V1.0'], ['Controlled areas', '4', 'Documentary specification'], ['Active workers', '0', 'No processing'], ['Real alerts', '0', 'No monitoring']],
    labels: { purpose: 'Purpose', checks: 'Points to document', outputs: 'Candidate outputs', unknowns: 'Values to qualify' },
    areas: [
      { title: 'Worker contract and idempotence', icon: Workflow, purpose: 'Define message processing without executing it.', checks: ['States, locking and reading order', 'Idempotency key and duplicate refusal', 'Attempts and progressive delay', 'Clean stop and lossless recovery'], outputs: ['Candidate worker contract', 'State and transition matrix'], unknowns: 'Runtime, frequency, batches, delays, attempt ceiling, concurrency and ownership.' },
      { title: 'Metrics and thresholds', icon: Activity, purpose: 'Make health observable without producing a false indicator.', checks: ['Pending volume and oldest-message age', 'Success, failure and replay rates', 'Propagation and reconciliation latency', 'Freshness, scope and provenance'], outputs: ['Candidate metric dictionary', 'Threshold grid to validate'], unknowns: 'Selected metrics, units, windows, thresholds, frequency and owner.' },
      { title: 'Alerts, escalation and quarantine', icon: Bell, purpose: 'Prepare a response to gaps without sending notifications.', checks: ['Alert conditions and severity levels', 'Authorised channels and functional recipients', 'Quarantine and human review', 'Acknowledgement, escalation and closure'], outputs: ['Candidate alert matrix', 'Quarantine procedure'], unknowns: 'Thresholds, channels, recipients, delays, on-call duty, escalations and quarantine duration.' },
      { title: 'Recovery, replay and evidence', icon: RotateCcw, purpose: 'Prepare controlled replay before propagation.', checks: ['Replay prerequisites and authority', 'Idempotent replay and reconciliation', 'Stop, compensation and failure recovery', 'Decision, result and anomaly log'], outputs: ['Candidate recovery runbook', 'Reconciliation and evidence sheet'], unknowns: 'Scope, volume, window, authority, controls, tolerances and success evidence.' }
    ],
    status: 'CONFIRMED · REF-01-DEC-033 confirms PKG-05-001 V1.0 as a governed documentary specification.',
    next: 'Produced step below: REF-01-G1-REV-003 V0.1 reassesses all six G1 conditions after confirmation of the five documentary packages.',
    boundary: 'Mandatory stop before a worker, queue connection, scheduling, notification, alert, real metric, quarantine, replay, reconciliation or automation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER TRÄGER · PAKET 5 · REF-01-G1-PKG-05-001 · V1.0 · 27.08.2026',
    title: 'Bestätigte Outbox-, Überwachungs- und Wiederanlaufspezifikation ohne Realaktivierung',
    intro: 'Diese bestätigte Akte ordnet idempotente Verarbeitung, Messwerte, Alarme, Quarantäne und Wiederanlauf. Sie bleibt dokumentarisch: kein Worker startet und kein reales System wird überwacht.',
    counters: [['Bestätigte Akte', '1/1', 'PKG-05-001 V1.0'], ['Kontrollbereiche', '4', 'Dokumentspezifikation'], ['Aktive Worker', '0', 'Keine Verarbeitung'], ['Reale Alarme', '0', 'Keine Überwachung']],
    labels: { purpose: 'Zweck', checks: 'Zu dokumentierende Punkte', outputs: 'Kandidatenergebnisse', unknowns: 'Zu qualifizierende Werte' },
    areas: [
      { title: 'Worker-Vertrag und Idempotenz', icon: Workflow, purpose: 'Die Nachrichtenverarbeitung ohne Ausführung definieren.', checks: ['Stände, Sperre und Lesereihenfolge', 'Idempotenzschlüssel und Dublettenverweigerung', 'Versuche und progressive Wartezeit', 'Sauberer Stopp und verlustfreier Wiederanlauf'], outputs: ['Kandidaten-Worker-Vertrag', 'Stand- und Übergangsmatrix'], unknowns: 'Runtime, Frequenz, Lose, Verzögerungen, Versuchslimit, Parallelität und Verantwortung.' },
      { title: 'Messwerte und Schwellen', icon: Activity, purpose: 'Gesundheit beobachtbar machen, ohne falsche Kennzahl.', checks: ['Wartendes Volumen und Alter der ältesten Nachricht', 'Erfolgs-, Fehler- und Wiederholungsraten', 'Weitergabe- und Abstimmungslatenz', 'Aktualität, Umfang und Herkunft'], outputs: ['Kandidaten-Messwertwörterbuch', 'Zu validierendes Schwellenraster'], unknowns: 'Gewählte Messwerte, Einheiten, Fenster, Schwellen, Frequenz und Verantwortung.' },
      { title: 'Alarme, Eskalation und Quarantäne', icon: Bell, purpose: 'Die Reaktion auf Abweichungen ohne Hinweisversand vorbereiten.', checks: ['Alarmbedingungen und Schweregrade', 'Autorisierte Kanäle und Funktionsempfänger', 'Quarantäne und menschliche Prüfung', 'Bestätigung, Eskalation und Abschluss'], outputs: ['Kandidaten-Alarmmatrix', 'Quarantäneverfahren'], unknowns: 'Schwellen, Kanäle, Empfänger, Fristen, Bereitschaft, Eskalationen und Quarantänedauer.' },
      { title: 'Wiederanlauf, Wiederholung und Nachweis', icon: RotateCcw, purpose: 'Kontrollierte Wiederholung vor jeder Weitergabe vorbereiten.', checks: ['Voraussetzungen und Autorität der Wiederholung', 'Idempotente Wiederholung und Abstimmung', 'Stopp, Kompensation und Fehlerwiederanlauf', 'Entscheid-, Ergebnis- und Abweichungsjournal'], outputs: ['Kandidaten-Wiederanlauf-Runbook', 'Abstimmungs- und Nachweisblatt'], unknowns: 'Umfang, Volumen, Fenster, Autorität, Kontrollen, Toleranzen und Erfolgsnachweis.' }
    ],
    status: 'BESTÄTIGT · REF-01-DEC-033 bestätigt PKG-05-001 V1.0 als gesteuerte Dokumentspezifikation.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-REV-003 V0.1 bewertet alle sechs G1-Bedingungen nach Bestätigung der fünf Dokumentpakete neu.',
    boundary: 'Pflichtstopp vor Worker, Queue-Verbindung, Planung, Hinweis, Alarm, realem Messwert, Quarantäne, Wiederholung, Abstimmung oder Automatisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1OutboxMonitoringPackage = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-outbox-monitoring-package" className="m3s-ref01-g1-outbox-monitoring-package mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-outbox-monitoring-package-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-outbox-monitoring-package-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ShieldCheck className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <Activity className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.areas.map(area => { const Icon = area.icon; return <article key={area.title} data-testid="ref01-g1-outbox-monitoring-area" className="m3s-raised p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{area.title}</h6></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.purpose}</dt><dd className="mt-1 text-slate-300">{area.purpose}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.checks}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.checks.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.outputs}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.outputs.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-amber-200">{t.labels.unknowns}</dt><dd className="mt-1 text-slate-300">{area.unknowns}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1OutboxMonitoringPackage;
