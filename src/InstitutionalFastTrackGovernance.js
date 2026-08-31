import React from 'react';
import { AlertTriangle, CheckCircle2, FastForward, Filter, Layers3, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'MÉTHODE INDUSTRIALISÉE · FAST TRACK · FTK-001 · V1.0 · 30-08-2026',
    title: 'Décider un lot en une fois et ne remonter que les exceptions',
    intro: 'Cheikh a confirmé PLN-002 et autorisé la qualification groupée des vingt-deux valeurs. La méthode Fast Track est désormais appliquée : Codex prépare et source, la revue humaine porte sur les exceptions, puis une décision consolidée conserve la trace.',
    counters: [['Lot courant', '22', 'Valeurs traitées ensemble'], ['Confirmables', '9', 'Observations suffisamment sourcées'], ['Exceptions', '13', '8 partielles · 5 ouvertes'], ['Décisions Fast Track', '15', 'DEC-067 à DEC-081 enregistrées']],
    steps: [
      ['1 · Préparer', 'Regrouper 10 à 25 éléments homogènes et fixer source, périmètre, responsable, sensibilité et règle d’arrêt.'],
      ['2 · Préqualifier', 'Classer chaque ligne Confirmable, Partielle, Ouverte ou Non applicable sans combler une absence de preuve.'],
      ['3 · Revoir par exception', 'Présenter d’abord les contradictions, manques et choix humains ; les lignes suffisamment sourcées restent visibles mais ne sont pas rediscutées une par une.'],
      ['4 · Décider et propager', 'Enregistrer une décision consolidée, actualiser les références, le journal, le Daily Intelligence et la vue publique.']
    ],
    rulesTitle: 'Règles permanentes du Fast Track',
    rules: ['Un seul objet de décision et un seul périmètre par lot.', 'Une ligne n’est confirmable que si sa valeur, sa source et sa portée concordent.', 'Une preuve synthétique ne devient jamais une preuve de production.', 'Une exception sensible, contradictoire ou sans responsable reste ouverte.', 'Une validation groupée ne conclut ni à une conformité juridique ni à une autorisation d’exécution.'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-066', version: 'V1.0', status: 'PLN-002 et méthode Fast Track confirmés', author: 'Cheikh Ndiaye', date: '30-08-2026',
      decision: 'REF-01-G1-PLN-002 V0.1 est confirmé et promu en V1.0. FTK-001 V1.0 devient la méthode de qualification groupée par preuves et revue par exceptions. QLF-001 V1.0 qualifie les vingt-deux lignes en une décision consolidée.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 ; plan PLN-002 V0.1 ; sources du lot L1 isolé ; validation PostgreSQL synthétique exécutée avec succès le 30-08-2026.',
      limit: 'La décision confirme la méthode et les qualifications documentaires observées. Elle ne désigne aucun service de production, titulaire réel, RPO/RTO, sauvegarde, destinataire, worker, seuil de supervision, référence GED finale ou environnement partagé ; G1 reste ouverte et L2 fermé.'
    },
    verdict: 'CONFIRMÉ · Le Fast Track est industrialisé et appliqué. Les 22 lignes ont été traitées en un lot ; les 13 exceptions ont reçu un arbitrage documentaire consolidé, sans devenir des preuves de production.',
    boundary: 'Cette méthode accélère l’arbitrage, pas le niveau de preuve. Tout fait absent, sensible ou contradictoire reste visible comme exception.'
  },
  EN: {
    eyebrow: 'INDUSTRIALISED METHOD · FAST TRACK · FTK-001 · V1.0 · 30 AUG 2026',
    title: 'Decide one package at once and surface exceptions only',
    intro: 'Cheikh confirmed PLN-002 and authorised grouped qualification of the twenty-two values. Fast Track is now applied: Codex prepares and sources, human review focuses on exceptions, then one consolidated decision retains the audit trail.',
    counters: [['Current package', '22', 'Values handled together'], ['Confirmable', '9', 'Sufficiently sourced observations'], ['Exceptions', '13', '8 partial · 5 open'], ['Fast Track decisions', '15', 'DEC-067 through DEC-081 recorded']],
    steps: [['1 · Prepare', 'Group 10 to 25 homogeneous items and set source, scope, owner, sensitivity and stop rule.'], ['2 · Prequalify', 'Classify every line as Confirmable, Partial, Open or Not applicable without filling an evidence gap.'], ['3 · Review exceptions', 'Show contradictions, gaps and human choices first; sufficiently sourced lines remain visible but are not debated individually.'], ['4 · Decide and propagate', 'Record one consolidated decision, then update references, work log, Daily Intelligence and the public view.']],
    rulesTitle: 'Permanent Fast Track rules',
    rules: ['One decision object and one scope per package.', 'A line is confirmable only when value, source and scope agree.', 'Synthetic evidence never becomes production evidence.', 'A sensitive, contradictory or ownerless exception remains open.', 'Grouped confirmation concludes neither legal compliance nor execution authorisation.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-066', version: 'V1.0', status: 'PLN-002 and Fast Track method confirmed', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-PLN-002 V0.1 is confirmed and promoted to V1.0. FTK-001 V1.0 becomes the grouped evidence qualification and exception-review method. QLF-001 V1.0 qualifies all twenty-two lines through one consolidated decision.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session; PLN-002 V0.1; isolated L1 package sources; successful synthetic PostgreSQL validation run on 30 Aug 2026.', limit: 'The decision confirms the method and observed documentary qualifications. It designates no production service, real holder, RPO/RTO, backup, recipient, worker, monitoring threshold, final DMS reference or shared environment; G1 remains open and L2 closed.' },
    verdict: 'CONFIRMED · Fast Track is industrialised and applied. All 22 lines were handled in one package; the 13 exceptions received one consolidated documentary decision without becoming production evidence.',
    boundary: 'This method accelerates decision-making, not the evidence level. Every absent, sensitive or contradictory fact remains visible as an exception.'
  },
  DE: {
    eyebrow: 'INDUSTRIALISIERTE METHODE · FAST TRACK · FTK-001 · V1.0 · 30.08.2026',
    title: 'Ein Paket auf einmal entscheiden und nur Ausnahmen vorlegen',
    intro: 'Cheikh hat PLN-002 bestätigt und die gebündelte Qualifizierung der zweiundzwanzig Werte autorisiert. Fast Track wird nun angewandt: Codex bereitet vor und belegt, die menschliche Prüfung konzentriert sich auf Ausnahmen, danach erhält ein konsolidierter Entscheid die Spur.',
    counters: [['Aktuelles Paket', '22', 'Gemeinsam behandelte Werte'], ['Bestätigbar', '9', 'Ausreichend belegte Beobachtungen'], ['Ausnahmen', '13', '8 teilweise · 5 offen'], ['Fast-Track-Entscheide', '15', 'DEC-067 bis DEC-081 erfasst']],
    steps: [['1 · Vorbereiten', '10 bis 25 homogene Elemente bündeln und Quelle, Umfang, Verantwortung, Sensibilität sowie Stoppregel festlegen.'], ['2 · Vorqualifizieren', 'Jede Zeile als Bestätigbar, Teilweise, Offen oder Nicht anwendbar einstufen, ohne Nachweislücken zu füllen.'], ['3 · Ausnahmen prüfen', 'Widersprüche, Lücken und menschliche Wahl zuerst zeigen; ausreichend belegte Zeilen bleiben sichtbar, werden aber nicht einzeln neu entschieden.'], ['4 · Entscheiden und übertragen', 'Einen konsolidierten Entscheid erfassen und Referenzen, Arbeitsjournal, Daily Intelligence sowie öffentliche Ansicht aktualisieren.']],
    rulesTitle: 'Dauerhafte Fast-Track-Regeln',
    rules: ['Ein Entscheidobjekt und ein Umfang pro Paket.', 'Eine Zeile ist nur bestätigbar, wenn Wert, Quelle und Umfang übereinstimmen.', 'Synthetischer Nachweis wird nie zum Produktionsnachweis.', 'Eine sensible, widersprüchliche oder verantwortungslose Ausnahme bleibt offen.', 'Gebündelte Bestätigung bedeutet weder Rechtskonformität noch Ausführungsautorisierung.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-066', version: 'V1.0', status: 'PLN-002 und Fast-Track-Methode bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-PLN-002 V0.1 wird bestätigt und zu V1.0. FTK-001 V1.0 wird zur Methode für gebündelte Nachweisqualifizierung und Ausnahmeprüfung. QLF-001 V1.0 qualifiziert alle zweiundzwanzig Zeilen durch einen konsolidierten Entscheid.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026; PLN-002 V0.1; Quellen des isolierten L1-Pakets; erfolgreiche synthetische PostgreSQL-Validierung am 30.08.2026.', limit: 'Der Entscheid bestätigt Methode und beobachtete Dokumentqualifikationen. Er bestimmt keinen Produktionsdienst, realen Träger, RPO/RTO, keine Sicherung, Empfänger, Worker, Überwachungsschwelle, endgültige DMS-Referenz oder geteilte Umgebung; G1 bleibt offen und L2 geschlossen.' },
    verdict: 'BESTÄTIGT · Fast Track ist industrialisiert und angewandt. Alle 22 Zeilen wurden in einem Paket behandelt; die 13 Ausnahmen erhielten einen konsolidierten Dokumentationsentscheid, ohne zu Produktionsnachweisen zu werden.',
    boundary: 'Diese Methode beschleunigt den Entscheid, nicht das Nachweisniveau. Jeder fehlende, sensible oder widersprüchliche Fakt bleibt als Ausnahme sichtbar.'
  }
};

const InstitutionalFastTrackGovernance = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-fast-track-governance" data-testid="ref01-fast-track-governance" className="scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FastForward className="shrink-0 text-emerald-300" size={26} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = [Layers3, CheckCircle2, Filter, ShieldCheck][index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 1 ? 'text-emerald-300' : index === 2 ? 'text-amber-300' : 'text-sky-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <ol className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.steps.map(([title, body]) => <li key={title} className="m3s-raised p-3"><h5 className="text-sm font-semibold text-emerald-200">{title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{body}</p></li>)}</ol>
      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h5 className="text-sm font-semibold text-slate-100">{t.rulesTitle}</h5><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.rules.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-sm font-semibold leading-6 text-emerald-100">{t.verdict}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalFastTrackGovernance;
