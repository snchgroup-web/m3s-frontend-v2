import React from 'react';
import { Activity, AlertTriangle, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'AUTORISATION UNITAIRE CANDIDATE · REF-01-G1-AUT-02-05-001 · V0.1 · 30-08-2026',
    title: 'Cadrer l’outbox, la supervision et la reprise avant toute activation',
    intro: 'AUT-02-04-001 V1.0 confirme la deuxième structure de la vague. Cette troisième fiche prépare séparément traitement, supervision et reprise sans file réelle, worker actif, alerte ni rejeu.',
    counters: [['Champs structurés', '11/11', 'Valeurs candidates ou ouvertes'], ['Valeurs à compléter', '8', 'Sept ouvertes · une à confirmer'], ['Autorisation d’exécution', '0', 'Décision distincte requise'], ['Workers et alertes', '0', 'Aucun système ouvert']],
    labels: { value: 'Valeur candidate', status: 'Statut', proof: 'Preuve exigée' },
    groups: [
      ['Identité et périmètre', [
        ['Objet', 'Répéter le traitement, la supervision et la reprise de messages strictement synthétiques', 'PROPOSÉ', 'Fiche confirmée et objectif borné'],
        ['Transport isolé', 'À désigner · aucune file réelle', 'OUVERT', 'Identifiant, propriétaire, isolement et extinction'],
        ['Jeu de messages', 'Strictement synthétique · aucune donnée réelle', 'PROPOSÉ', 'Inventaire, schéma et contrôle de non-réalité']
      ]],
      ['Responsabilités et protection', [
        ['Fonction pilote', 'IT & Support · candidat', 'À CONFIRMER', 'Responsable fonctionnel et délégation'],
        ['Titulaire d’exécution', 'À désigner', 'OUVERT', 'Identité autorisée et moindre privilège'],
        ['Destinataires d’alerte', 'À désigner · fonctions uniquement', 'OUVERT', 'Mandat, canal autorisé et règle d’escalade']
      ]],
      ['Traitement et reprise', [
        ['Paquet worker', 'À préparer puis confirmer', 'OUVERT', 'Version, runtime, verrouillage, idempotence et revue'],
        ['Temporisation et tentatives', 'À proposer puis confirmer', 'OUVERT', 'Délais, plafond, concurrence et arrêt automatique'],
        ['Quarantaine et rejeu', 'Isoler, contrôler, autoriser, rejouer puis rapprocher', 'PROPOSÉ', 'Procédure versionnée et journal horodaté']
      ]],
      ['Mesure et preuve', [
        ['Métriques et seuils', 'À proposer puis confirmer', 'OUVERT', 'Définitions, unités, fenêtres, seuils et provenance'],
        ['Dépôt de preuve', 'Emplacement GED à désigner', 'OUVERT', 'Chemin gouverné, inventaire, journaux, résultats et clôture']
      ]]
    ],
    verdict: 'CANDIDAT · La fiche structure onze champs mais ne constitue ni une autorisation de worker ni un dispositif de supervision actif.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-05-001 V0.1.',
    boundary: 'Une confirmation validera uniquement cette structure documentaire. Transport, titulaire, destinataires, worker, délais, seuils, alertes et exécution resteront soumis à des décisions séparées.'
  },
  EN: {
    eyebrow: 'CANDIDATE INDIVIDUAL AUTHORISATION · REF-01-G1-AUT-02-05-001 · V0.1 · 30 AUG 2026',
    title: 'Frame outbox, monitoring and recovery before any activation',
    intro: 'AUT-02-04-001 V1.0 confirms the second wave structure. This third sheet separately prepares processing, monitoring and recovery without a real queue, active worker, alert or replay.',
    counters: [['Structured fields', '11/11', 'Candidate or open values'], ['Values to complete', '8', 'Seven open · one to confirm'], ['Execution authorisation', '0', 'Separate decision required'], ['Workers and alerts', '0', 'No system opened']],
    labels: { value: 'Candidate value', status: 'Status', proof: 'Required evidence' },
    groups: [
      ['Identity and scope', [['Purpose', 'Rehearse processing, monitoring and recovery of strictly synthetic messages', 'PROPOSED', 'Confirmed sheet and bounded objective'], ['Isolated transport', 'To designate · no real queue', 'OPEN', 'Identifier, owner, isolation and shutdown'], ['Message set', 'Strictly synthetic · no real data', 'PROPOSED', 'Inventory, schema and non-reality control']]],
      ['Responsibilities and protection', [['Lead function', 'IT & Support · candidate', 'TO CONFIRM', 'Functional owner and delegation'], ['Execution holder', 'To designate', 'OPEN', 'Authorised identity and least privilege'], ['Alert recipients', 'To designate · functions only', 'OPEN', 'Mandate, authorised channel and escalation rule']]],
      ['Processing and recovery', [['Worker package', 'To prepare and then confirm', 'OPEN', 'Version, runtime, locking, idempotence and review'], ['Delay and attempts', 'To propose and then confirm', 'OPEN', 'Delays, ceiling, concurrency and automatic stop'], ['Quarantine and replay', 'Isolate, control, authorise, replay, then reconcile', 'PROPOSED', 'Versioned procedure and timestamped log']]],
      ['Measurement and evidence', [['Metrics and thresholds', 'To propose and then confirm', 'OPEN', 'Definitions, units, windows, thresholds and provenance'], ['Evidence deposit', 'DMS location to designate', 'OPEN', 'Governed path, inventory, logs, results and closure']]]
    ],
    verdict: 'CANDIDATE · The sheet structures eleven fields but is neither a worker authorisation nor an active monitoring mechanism.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-05-001 V0.1.',
    boundary: 'Confirmation will validate this documentary structure only. Transport, holder, recipients, worker, delays, thresholds, alerts and execution remain subject to separate decisions.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR EINZELAUTORISIERUNG · REF-01-G1-AUT-02-05-001 · V0.1 · 30.08.2026',
    title: 'Outbox, Überwachung und Wiederanlauf vor jeder Aktivierung abgrenzen',
    intro: 'AUT-02-04-001 V1.0 bestätigt die zweite Wellenstruktur. Dieses dritte Blatt bereitet Verarbeitung, Überwachung und Wiederanlauf getrennt vor, ohne reale Queue, aktiven Worker, Alarm oder Wiederholung.',
    counters: [['Strukturierte Felder', '11/11', 'Kandidaten- oder offene Werte'], ['Zu ergänzende Werte', '8', 'Sieben offen · einer zu bestätigen'], ['Ausführungsautorisierung', '0', 'Getrennter Entscheid nötig'], ['Worker und Alarme', '0', 'Kein System geöffnet']],
    labels: { value: 'Kandidatenwert', status: 'Status', proof: 'Erforderlicher Nachweis' },
    groups: [
      ['Identität und Umfang', [['Zweck', 'Verarbeitung, Überwachung und Wiederanlauf strikt synthetischer Nachrichten wiederholen', 'VORGESCHLAGEN', 'Bestätigtes Blatt und begrenztes Ziel'], ['Isolierter Transport', 'Zu bestimmen · keine reale Queue', 'OFFEN', 'Kennung, Eigentümer, Isolation und Abschaltung'], ['Nachrichtensatz', 'Strikt synthetisch · keine realen Daten', 'VORGESCHLAGEN', 'Inventar, Schema und Kontrolle auf Nichtrealität']]],
      ['Verantwortung und Schutz', [['Federführende Funktion', 'IT & Support · Kandidat', 'ZU BESTÄTIGEN', 'Funktionseigentümer und Delegation'], ['Ausführungsträger', 'Zu bestimmen', 'OFFEN', 'Autorisierte Identität und geringste Berechtigung'], ['Alarmempfänger', 'Zu bestimmen · nur Funktionen', 'OFFEN', 'Mandat, autorisierter Kanal und Eskalationsregel']]],
      ['Verarbeitung und Wiederanlauf', [['Worker-Paket', 'Vorzubereiten und danach zu bestätigen', 'OFFEN', 'Version, Runtime, Sperre, Idempotenz und Prüfung'], ['Wartezeit und Versuche', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Verzögerungen, Obergrenze, Parallelität und automatischer Stopp'], ['Quarantäne und Wiederholung', 'Isolieren, prüfen, autorisieren, wiederholen und abstimmen', 'VORGESCHLAGEN', 'Versioniertes Verfahren und Zeitprotokoll']]],
      ['Messung und Nachweis', [['Messwerte und Schwellen', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Definitionen, Einheiten, Fenster, Schwellen und Herkunft'], ['Nachweisablage', 'DMS-Ort zu bestimmen', 'OFFEN', 'Gesteuerter Pfad, Inventar, Journale, Ergebnisse und Abschluss']]]
    ],
    verdict: 'KANDIDAT · Das Blatt strukturiert elf Felder, ist aber weder Worker-Autorisierung noch aktive Überwachung.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-05-001 V0.1 bestätigen oder ändern.',
    boundary: 'Eine Bestätigung validiert nur diese Dokumentstruktur. Transport, Träger, Empfänger, Worker, Verzögerungen, Schwellen, Alarme und Ausführung bleiben getrennten Entscheiden unterstellt.'
  }
};

const InstitutionalPeopleTeamsGateG1OutboxMonitoringAuthorisationCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-02-05-001" data-testid="ref01-g1-outbox-monitoring-authorisation-candidate" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-02-05-001-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-02-05-001-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Activity className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([group, fields]) => <article key={group} className="m3s-raised min-w-0 p-3 sm:p-4"><h6 className="text-sm font-semibold text-violet-100">{group}</h6><div className="mt-3 space-y-3">{fields.map(([field, value, status, proof]) => <dl key={field} data-testid="ref01-g1-outbox-monitoring-authorisation-field" className="rounded-md border border-slate-700/70 bg-slate-950/20 p-3 text-xs leading-5"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><dt className="font-semibold text-slate-100">{field}</dt><dd className="text-xs font-semibold text-amber-200">{status}</dd></div><div className="mt-2"><dt className="font-semibold text-sky-300">{t.labels.value}</dt><dd className="mt-1 break-words text-slate-300">{value}</dd></div><div className="mt-2"><dt className="font-semibold text-emerald-300">{t.labels.proof}</dt><dd className="mt-1 break-words text-slate-300">{proof}</dd></div></dl>)}</div></article>)}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1OutboxMonitoringAuthorisationCandidate;
