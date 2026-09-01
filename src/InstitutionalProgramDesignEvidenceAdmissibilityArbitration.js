import React from 'react';
import { AlertTriangle, FileClock, Frame, Image, LockKeyhole, Scale, ShieldCheck, Workflow } from 'lucide-react';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const LANES = [
  {
    id: 'V1',
    icon: FileClock,
    refs: ['SRC-01', 'SRC-03', 'SRC-05', 'SRC-06', 'SRC-08'],
    title: text('Sous conditions documentaires', 'Under documentary conditions', 'Unter dokumentarischen Bedingungen'),
    rule: text('Chaque référence reste individuelle : fermer ses cinq portes et sa réserve propre avant toute décision d’admissibilité.', 'Each reference remains individual: close its five gates and specific reservation before any admissibility decision.', 'Jede Referenz bleibt einzeln: ihre fünf Tore und ihren eigenen Vorbehalt vor jedem Zulässigkeitsentscheid schließen.')
  },
  {
    id: 'V2',
    icon: Frame,
    refs: ['SRC-02'],
    title: text('Cadrage uniquement', 'Framing only', 'Nur Rahmen'),
    rule: text('Peut soutenir le périmètre ou la structure, jamais prouver une réalisation ou un résultat.', 'May support scope or structure, never prove achievement or an outcome.', 'Kann Umfang oder Struktur stützen, niemals eine Umsetzung oder ein Ergebnis beweisen.')
  },
  {
    id: 'V3',
    icon: Workflow,
    refs: ['SRC-04'],
    title: text('Méthode uniquement', 'Method only', 'Nur Methode'),
    rule: text('Peut documenter la méthode d’inventaire, sans devenir un résultat direct de CON-03.', 'May document the inventory method without becoming a direct CON-03 outcome.', 'Kann die Inventarmethode dokumentieren, ohne direktes Ergebnis von CON-03 zu werden.')
  },
  {
    id: 'V4',
    icon: Image,
    refs: ['SRC-07'],
    title: text('Support visuel uniquement', 'Visual support only', 'Nur visuelle Unterstützung'),
    rule: text('Peut faciliter la lecture et la navigation, sans être promu en registre maître.', 'May support reading and navigation without promotion to a master register.', 'Kann Lesen und Navigation unterstützen, ohne zum Masterregister befördert zu werden.')
  }
];

const COPY = {
  FR: {
    eyebrow: 'PROPOSITION GROUPÉE D’ARBITRAGE · PGM-CON-ARB-001 · V0.1 · 02-09-2026',
    title: 'Quatre voies candidates, aucune admissibilité décidée',
    intro: 'Cette proposition applique le cadre confirmé sans rouvrir les huit pièces. Elle prépare un arbitrage groupé tout en conservant une décision distincte pour chaque référence.',
    counters: [['8/8', 'références positionnées'], ['4', 'voies candidates'], ['0/8', 'admissibilité prononcée'], ['0', 'preuve acceptée']],
    labels: { refs: 'Références candidates', rule: 'Règle de traitement', status: 'PROPOSITION' },
    guardrails: 'Règles non négociables',
    rules: ['Une voie ne ferme aucune porte documentaire.', 'Une décision d’admissibilité ne prouve pas le résultat métier.', 'Chaque référence conserve sa provenance, sa version et sa réserve.', 'Aucune promotion collective ou automatique n’est autorisée.'],
    next: 'Prochaine confirmation groupée',
    confirmation: 'Je confirme PGM-CON-ARB-001 V0.1 comme proposition groupée de classement des huit références dans les quatre voies candidates, sans prononcer leur admissibilité, accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.',
    boundary: 'Cette proposition classe des options de décision. Elle ne rend aucune référence admissible et n’autorise aucun calcul de progression.'
  },
  EN: {
    eyebrow: 'GROUPED ARBITRATION PROPOSAL · PGM-CON-ARB-001 · V0.1 · 2 SEP 2026',
    title: 'Four candidate lanes, no admissibility decided',
    intro: 'This proposal applies the confirmed framework without reopening the eight files. It prepares grouped arbitration while preserving a separate decision for every reference.',
    counters: [['8/8', 'references positioned'], ['4', 'candidate lanes'], ['0/8', 'admissibility pronounced'], ['0', 'evidence accepted']],
    labels: { refs: 'Candidate references', rule: 'Treatment rule', status: 'PROPOSAL' },
    guardrails: 'Non-negotiable rules',
    rules: ['A lane closes no documentary gate.', 'An admissibility decision does not prove a business outcome.', 'Every reference keeps its provenance, version and reservation.', 'No collective or automatic promotion is authorised.'],
    next: 'Next grouped confirmation',
    confirmation: 'I confirm PGM-CON-ARB-001 V0.1 as the grouped classification proposal for the eight references in the four candidate lanes, without pronouncing admissibility, accepting evidence or authorising their promotion, CON-01, CON-05, REF-02 or L2.',
    boundary: 'This proposal classifies decision options. It makes no reference admissible and authorises no progress calculation.'
  },
  DE: {
    eyebrow: 'GEBÜNDELTER ARBITRIERUNGSVORSCHLAG · PGM-CON-ARB-001 · V0.1 · 02.09.2026',
    title: 'Vier Kandidatenwege, keine Zulässigkeit entschieden',
    intro: 'Dieser Vorschlag wendet den bestätigten Rahmen an, ohne die acht Dateien erneut zu öffnen. Er bereitet eine gebündelte Arbitrierung vor und bewahrt einen eigenen Entscheid pro Referenz.',
    counters: [['8/8', 'Referenzen eingeordnet'], ['4', 'Kandidatenwege'], ['0/8', 'Zulässigkeit ausgesprochen'], ['0', 'Nachweise angenommen']],
    labels: { refs: 'Kandidatenreferenzen', rule: 'Behandlungsregel', status: 'VORSCHLAG' },
    guardrails: 'Nicht verhandelbare Regeln',
    rules: ['Ein Weg schließt kein Dokumenten-Tor.', 'Ein Zulässigkeitsentscheid beweist kein Geschäftsergebnis.', 'Jede Referenz behält Herkunft, Version und Vorbehalt.', 'Keine kollektive oder automatische Beförderung ist erlaubt.'],
    next: 'Nächste gebündelte Bestätigung',
    confirmation: 'Ich bestätige PGM-CON-ARB-001 V0.1 als gebündelten Klassifizierungsvorschlag der acht Referenzen in die vier Kandidatenwege, ohne Zulässigkeit auszusprechen, Nachweise anzunehmen oder deren Beförderung, CON-01, CON-05, REF-02 oder L2 zu erlauben.',
    boundary: 'Dieser Vorschlag klassifiziert Entscheidungsoptionen. Er macht keine Referenz zulässig und erlaubt keine Fortschrittsberechnung.'
  }
};

const InstitutionalProgramDesignEvidenceAdmissibilityArbitration = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-admissibility-arbitration" data-testid="institutional-program-design-evidence-admissibility-arbitration" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-fuchsia-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Scale className="shrink-0 text-fuchsia-300" size={28} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-fuchsia-300' : 'text-slate-200'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{LANES.map(lane => { const Icon = lane.icon; return <article key={lane.id} data-testid="institutional-program-design-evidence-arbitration-lane" className="m3s-raised p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-fuchsia-950/30 text-fuchsia-300"><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-fuchsia-300">{lane.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(lane.title)}</h5></div></div><span className="shrink-0 rounded-md border border-amber-800 bg-amber-950/30 px-2 py-1 text-xs font-semibold text-amber-200">{t.labels.status}</span></div><div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.refs}</p><div className="mt-2 flex flex-wrap gap-2">{lane.refs.map(ref => <span key={ref} data-testid="institutional-program-design-evidence-arbitration-reference" className="rounded-md border border-slate-700 bg-slate-950/20 px-2 py-1 text-xs font-semibold text-sky-200">{ref}</span>)}</div></div><div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.rule}</p><p className="mt-1 text-xs leading-5 text-slate-300">{local(lane.rule)}</p></div></article>; })}</div>

      <div className="mt-4 rounded-md border border-fuchsia-900/70 bg-fuchsia-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-fuchsia-300"><ShieldCheck size={16} aria-hidden="true" />{t.guardrails}</p><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.rules.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-fuchsia-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></div>
      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceAdmissibilityArbitration;
