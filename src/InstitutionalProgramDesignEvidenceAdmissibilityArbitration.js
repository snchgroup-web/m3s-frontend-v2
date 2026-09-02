import React from 'react';
import { AlertTriangle, FileClock, Frame, Image, LockKeyhole, Scale, ShieldCheck, Workflow } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

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
    eyebrow: 'ARBITRAGE GROUPÉ CONFIRMÉ · PGM-CON-ARB-001 · V1.0 · 02-09-2026',
    title: 'Classement confirmé avant les décisions individuelles',
    intro: 'Cette section conserve le classement confirmé par PGM-DEC-015 et son état historique. Les huit décisions ultérieures, prononcées par PGM-DEC-017, sont consignées dans PGM-CON-DEC-001 V1.0 ci-dessous.',
    counters: [['8/8', 'références positionnées'], ['4', 'voies candidates'], ['0/8', 'admissibilité prononcée'], ['0', 'preuve acceptée']],
    labels: { refs: 'Références candidates', rule: 'Règle de traitement', status: 'PROPOSITION' },
    guardrails: 'Règles non négociables',
    rules: ['Une voie ne ferme aucune porte documentaire.', 'Une décision d’admissibilité ne prouve pas le résultat métier.', 'Chaque référence conserve sa provenance, sa version et sa réserve.', 'Aucune promotion collective ou automatique n’est autorisée.'],
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-015', version: 'V1.0', status: 'Arbitrage groupé confirmé', author: 'Cheikh Ndiaye', date: '02-09-2026', decision: 'PGM-CON-ARB-001 V0.1 est confirmé et promu en V1.0 comme classement groupé des huit références dans quatre voies candidates.', evidence: 'Confirmation explicite de Cheikh dans la session du 02-09-2026 : « Je confirme PGM-CON-ARB-001 V0.1 comme proposition groupée de classement des huit références dans les quatre voies candidates, sans prononcer leur admissibilité, accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2. »', limit: 'La décision confirme uniquement le classement. Elle prononce 0/8 admissibilité, n’accepte aucune preuve et n’autorise aucune promotion, CON-01, CON-05, REF-02 ou L2.' },
    next: 'Paquet décisionnel individuel confirmé',
    confirmation: 'PGM-CON-DEC-001 V1.0 : huit décisions prononcées par PGM-DEC-017, soit trois admissions à usage documentaire limité et cinq ajournements. Aucune preuve de réalisation acceptée.',
    boundary: 'Ce classement confirmé organise les options de décision. Il ne rend aucune référence admissible et n’autorise aucun calcul de progression.'
  },
  EN: {
    eyebrow: 'CONFIRMED GROUPED ARBITRATION · PGM-CON-ARB-001 · V1.0 · 2 SEP 2026',
    title: 'Classification confirmed before the individual decisions',
    intro: 'This section preserves the classification confirmed by PGM-DEC-015 and its historical state. The eight subsequent decisions, pronounced by PGM-DEC-017, are recorded in PGM-CON-DEC-001 V1.0 below.',
    counters: [['8/8', 'references positioned'], ['4', 'candidate lanes'], ['0/8', 'admissibility pronounced'], ['0', 'evidence accepted']],
    labels: { refs: 'Candidate references', rule: 'Treatment rule', status: 'PROPOSAL' },
    guardrails: 'Non-negotiable rules',
    rules: ['A lane closes no documentary gate.', 'An admissibility decision does not prove a business outcome.', 'Every reference keeps its provenance, version and reservation.', 'No collective or automatic promotion is authorised.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-015', version: 'V1.0', status: 'Grouped arbitration confirmed', author: 'Cheikh Ndiaye', date: '2 Sep 2026', decision: 'PGM-CON-ARB-001 V0.1 is confirmed and promoted to V1.0 as the grouped classification of the eight references into four candidate lanes.', evidence: 'Cheikh’s explicit confirmation in the 2 Sep 2026 session, retained in French: “Je confirme PGM-CON-ARB-001 V0.1 comme proposition groupée de classement des huit références dans les quatre voies candidates, sans prononcer leur admissibilité, accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.”', limit: 'The decision confirms only the classification. It pronounces 0/8 admissibility decisions, accepts no evidence and authorises no promotion, CON-01, CON-05, REF-02 or L2.' },
    next: 'Confirmed individual decision package',
    confirmation: 'PGM-CON-DEC-001 V1.0: eight decisions pronounced by PGM-DEC-017, comprising three limited documentary-use admissions and five deferrals. No achievement evidence accepted.',
    boundary: 'This confirmed classification organises decision options. It makes no reference admissible and authorises no progress calculation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE GEBÜNDELTE ARBITRIERUNG · PGM-CON-ARB-001 · V1.0 · 02.09.2026',
    title: 'Klassifizierung vor den Einzelentscheiden bestätigt',
    intro: 'Dieser Abschnitt bewahrt die durch PGM-DEC-015 bestätigte Klassifizierung und ihren historischen Stand. Die acht späteren, durch PGM-DEC-017 ausgesprochenen Entscheide sind unten in PGM-CON-DEC-001 V1.0 erfasst.',
    counters: [['8/8', 'Referenzen eingeordnet'], ['4', 'Kandidatenwege'], ['0/8', 'Zulässigkeit ausgesprochen'], ['0', 'Nachweise angenommen']],
    labels: { refs: 'Kandidatenreferenzen', rule: 'Behandlungsregel', status: 'VORSCHLAG' },
    guardrails: 'Nicht verhandelbare Regeln',
    rules: ['Ein Weg schließt kein Dokumenten-Tor.', 'Ein Zulässigkeitsentscheid beweist kein Geschäftsergebnis.', 'Jede Referenz behält Herkunft, Version und Vorbehalt.', 'Keine kollektive oder automatische Beförderung ist erlaubt.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-015', version: 'V1.0', status: 'Gebündelte Arbitrierung bestätigt', author: 'Cheikh Ndiaye', date: '02.09.2026', decision: 'PGM-CON-ARB-001 V0.1 wird als gebündelte Klassifizierung der acht Referenzen in vier Kandidatenwege bestätigt und zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 02.09.2026, im französischen Originalwortlaut: „Je confirme PGM-CON-ARB-001 V0.1 comme proposition groupée de classement des huit références dans les quatre voies candidates, sans prononcer leur admissibilité, accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.“', limit: 'Der Entscheid bestätigt nur die Klassifizierung. Er spricht 0/8 Zulässigkeitsentscheide aus, nimmt keine Nachweise an und erlaubt keine Beförderung, CON-01, CON-05, REF-02 oder L2.' },
    next: 'Bestätigtes individuelles Entscheidungspaket',
    confirmation: 'PGM-CON-DEC-001 V1.0: acht durch PGM-DEC-017 ausgesprochene Entscheide, drei begrenzte Dokumentenzulassungen und fünf Vertagungen. Keine Umsetzungsnachweise angenommen.',
    boundary: 'Diese bestätigte Klassifizierung organisiert Entscheidungsoptionen. Sie macht keine Referenz zulässig und erlaubt keine Fortschrittsberechnung.'
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
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceAdmissibilityArbitration;
