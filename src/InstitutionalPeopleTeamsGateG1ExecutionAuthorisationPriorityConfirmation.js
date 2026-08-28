import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE L’ORDONNANCEMENT · REF-01-DEC-038 · V1.0 · 28-08-2026',
    title: 'Confirmer les trois vagues sans autoriser leur exécution',
    intro: 'Cheikh confirme REF-01-G1-PRI-002 V0.1. L’ordonnancement devient V1.0 et fixe l’ordre documentaire, synthétique puis décisionnel sans ouvrir automatiquement un circuit.',
    counters: [['Ordre confirmé', '1/1', 'PRI-002 V1.0'], ['Dossiers ordonnés', '6/6', 'Trois vagues'], ['Exécutions autorisées', '0', 'Aucun système réel'], ['Ouverture L2', '0', 'G1 reste ouverte']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-038', version: 'V1.0', status: 'Ordonnancement PRI-002 confirmé', author: 'Cheikh Ndiaye', date: '28-08-2026',
      decision: 'REF-01-G1-PRI-002 V0.1 est confirmé et promu en V1.0. La conservation et GED précède les rôles et le moindre privilège ; les essais synthétiques techniques restent en vague 2 et la décision L2 en vague 3.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026 : « je confirme REF-01-G1-PRI-002 V0.1 ».',
      limit: 'Cette décision confirme uniquement l’ordre. Elle ne crée aucun compte, accès, droit, environnement, durée de conservation, opération GED, collecte, test, preuve acceptée, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · PRI-002 V1.0 gouverne désormais l’ordre des six dossiers.',
    next: 'Décision consignée ci-dessous : DEC-039 ouvre seulement la préparation documentaire des deux dossiers de la vague 1.',
    boundary: 'Chaque autorisation d’exécution reste unitaire, bornée et soumise à une décision distincte après préparation de sa fiche.'
  },
  EN: {
    eyebrow: 'HUMAN ORDER CONFIRMATION · REF-01-DEC-038 · V1.0 · 28 AUG 2026',
    title: 'Confirm all three waves without authorising their execution',
    intro: 'Cheikh confirms REF-01-G1-PRI-002 V0.1. The order becomes V1.0 and fixes the documentary, synthetic and decision sequence without automatically opening a route.',
    counters: [['Confirmed order', '1/1', 'PRI-002 V1.0'], ['Ordered files', '6/6', 'Three waves'], ['Authorised executions', '0', 'No real system'], ['L2 openings', '0', 'G1 remains open']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-038', version: 'V1.0', status: 'PRI-002 order confirmed', author: 'Cheikh Ndiaye', date: '28 Aug 2026',
      decision: 'REF-01-G1-PRI-002 V0.1 is confirmed and promoted to V1.0. Retention and DMS precedes roles and least privilege; technical synthetic tests remain in Wave 2 and the L2 decision in Wave 3.',
      evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session: “je confirme REF-01-G1-PRI-002 V0.1”.',
      limit: 'This decision confirms only the order. It creates no account, access, right, environment, retention period, DMS operation, collection, test, accepted evidence, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · PRI-002 V1.0 now governs the order of all six files.',
    next: 'Decision recorded below: DEC-039 opens only documentary preparation of the two Wave 1 files.',
    boundary: 'Each execution authorisation remains individual, bounded and subject to a separate decision after its file is prepared.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER REIHENFOLGE · REF-01-DEC-038 · V1.0 · 28.08.2026',
    title: 'Alle drei Wellen bestätigen, ohne ihre Ausführung zu erlauben',
    intro: 'Cheikh bestätigt REF-01-G1-PRI-002 V0.1. Die Reihenfolge wird zu V1.0 und legt Dokumentation, synthetische Prüfung und Entscheid fest, ohne einen Weg automatisch zu öffnen.',
    counters: [['Bestätigte Reihenfolge', '1/1', 'PRI-002 V1.0'], ['Geordnete Akten', '6/6', 'Drei Wellen'], ['Erlaubte Ausführungen', '0', 'Kein Realsystem'], ['L2-Öffnungen', '0', 'G1 bleibt offen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-038', version: 'V1.0', status: 'PRI-002-Reihenfolge bestätigt', author: 'Cheikh Ndiaye', date: '28.08.2026',
      decision: 'REF-01-G1-PRI-002 V0.1 ist bestätigt und wird zu V1.0. Aufbewahrung und DMS kommen vor Rollen und geringster Berechtigung; technische synthetische Prüfungen bleiben in Welle 2 und der L2-Entscheid in Welle 3.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 28.08.2026: « je confirme REF-01-G1-PRI-002 V0.1 ».',
      limit: 'Dieser Entscheid bestätigt nur die Reihenfolge. Er schafft kein Konto, keinen Zugriff, kein Recht, keine Umgebung, Aufbewahrungsfrist, DMS-Operation, Sammlung, Prüfung, Nachweisannahme, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · PRI-002 V1.0 steuert nun die Reihenfolge aller sechs Akten.',
    next: 'Nachfolgend erfasster Entscheid: DEC-039 öffnet nur die dokumentarische Vorbereitung der zwei Akten aus Welle 1.',
    boundary: 'Jede Ausführungsautorisierung bleibt einzeln, begrenzt und benötigt nach Vorbereitung ihrer Akte einen getrennten Entscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1ExecutionAuthorisationPriorityConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-execution-authorisation-priority-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-execution-authorisation-priority-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-execution-authorisation-priority-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExecutionAuthorisationPriorityConfirmation;
