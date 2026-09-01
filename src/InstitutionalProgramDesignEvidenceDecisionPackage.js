import React from 'react';
import { AlertTriangle, FileCheck2, LockKeyhole, PauseCircle, Scale, ShieldCheck } from 'lucide-react';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const DECISIONS = [
  ['SRC-01', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre une copie GED datée et la fermeture des portes G1, G2 et G5.', 'Wait for a dated DMS copy and closure of gates G1, G2 and G5.', 'Auf eine datierte GED-Kopie und den Abschluss der Tore G1, G2 und G5 warten.')],
  ['SRC-02', 'V2', 'LIMITED', text('ADMISSION LIMITÉE · CADRAGE', 'LIMITED ADMISSION · FRAMING', 'BEGRENZTE ZULASSUNG · RAHMEN'), text('Limiter l’usage au périmètre et à la structure, jamais à la preuve d’une réalisation.', 'Limit use to scope and structure, never as evidence of achievement.', 'Nutzung auf Umfang und Struktur begrenzen, niemals als Umsetzungsnachweis.')],
  ['SRC-03', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre la traçabilité V0.1 vers la matrice M3S confirmée ainsi que la fermeture des réserves de version et de provenance.', 'Wait for traceability from V0.1 to the confirmed M3S matrix and closure of version and provenance reservations.', 'Auf die Rückverfolgbarkeit von V0.1 zur bestätigten M3S-Matrix und den Abschluss der Versions- und Herkunftsvorbehalte warten.')],
  ['SRC-04', 'V3', 'LIMITED', text('ADMISSION LIMITÉE · MÉTHODE', 'LIMITED ADMISSION · METHOD', 'BEGRENZTE ZULASSUNG · METHODE'), text('Limiter l’usage à la méthode d’inventaire, sans qualifier la pièce comme résultat direct de CON-03.', 'Limit use to the inventory method without qualifying the file as a direct CON-03 outcome.', 'Nutzung auf die Inventarmethode begrenzen, ohne die Datei als direktes CON-03-Ergebnis einzustufen.')],
  ['SRC-05', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre le traitement de la couverture non qualifiée et restreinte, sans présumer la complétude.', 'Wait until unqualified and restricted coverage is addressed, without assuming completeness.', 'Auf die Behandlung der unqualifizierten und eingeschränkten Abdeckung warten, ohne Vollständigkeit anzunehmen.')],
  ['SRC-06', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre la conservation de la filiation et la validation séparée des 7 entrées FR, DE et EN.', 'Wait for lineage preservation and separate validation of the 7 FR, DE and EN entries.', 'Auf die Bewahrung der Herkunftskette und die getrennte Validierung der 7 FR-, DE- und EN-Einträge warten.')],
  ['SRC-07', 'V4', 'LIMITED', text('ADMISSION LIMITÉE · SUPPORT VISUEL', 'LIMITED ADMISSION · VISUAL SUPPORT', 'BEGRENZTE ZULASSUNG · VISUELLE UNTERSTÜTZUNG'), text('Limiter l’usage à la lecture et à la navigation, sans promotion en registre maître.', 'Limit use to reading and navigation, without promotion to a master register.', 'Nutzung auf Lesen und Navigation begrenzen, ohne Beförderung zum Masterregister.')],
  ['SRC-08', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre le gel de l’édition datée et de ses métadonnées de livraison dans la GED.', 'Wait for the dated edition and its delivery metadata to be frozen in the DMS.', 'Auf die Fixierung der datierten Ausgabe und ihrer Liefermetadaten in der GED warten.')]
];

const COPY = {
  FR: {
    eyebrow: 'PAQUET DÉCISIONNEL INDIVIDUEL CANDIDAT · PGM-CON-DEC-001 · V0.1 · 02-09-2026',
    title: 'Huit propositions explicites, zéro décision prononcée',
    intro: 'Ce paquet transforme les quatre voies confirmées en huit propositions documentaires distinctes. Il prépare l’arbitrage humain sans accepter une preuve ni produire un résultat métier.',
    counters: [['8', 'décisions candidates'], ['3', 'admissions limitées proposées'], ['5', 'ajournements proposés'], ['0/8', 'décision prononcée']],
    labels: { lane: 'Voie confirmée', outcome: 'Issue proposée', condition: 'Condition ou limite', status: 'PROPOSITION' },
    guardrails: 'Portée du paquet candidat',
    rules: ['Chaque proposition reste modifiable avant confirmation humaine.', 'Une admission limitée autoriserait seulement l’usage documentaire indiqué.', 'Un ajournement maintiendrait la référence hors preuve tant que sa condition reste ouverte.', 'Aucune proposition ne modifie le taux de progression.'],
    next: 'Prochaine confirmation groupée',
    confirmation: 'Je confirme PGM-CON-DEC-001 V0.1 comme proposition des huit décisions documentaires individuelles, soit trois admissions limitées et cinq ajournements, sans encore les prononcer, accepter de preuve ni autoriser une promotion, CON-01, CON-05, REF-02 ou L2.',
    boundary: 'Une proposition de décision n’est ni une admissibilité prononcée, ni une preuve acceptée, ni un résultat métier, ni une progression.'
  },
  EN: {
    eyebrow: 'CANDIDATE INDIVIDUAL DECISION PACKAGE · PGM-CON-DEC-001 · V0.1 · 2 SEP 2026',
    title: 'Eight explicit proposals, zero decisions pronounced',
    intro: 'This package turns the four confirmed lanes into eight separate documentary proposals. It prepares human arbitration without accepting evidence or producing a business outcome.',
    counters: [['8', 'candidate decisions'], ['3', 'limited admissions proposed'], ['5', 'deferrals proposed'], ['0/8', 'decisions pronounced']],
    labels: { lane: 'Confirmed lane', outcome: 'Proposed outcome', condition: 'Condition or limit', status: 'PROPOSAL' },
    guardrails: 'Scope of the candidate package',
    rules: ['Every proposal remains editable before human confirmation.', 'A limited admission would authorise only the specified documentary use.', 'A deferral would keep the reference outside evidence while its condition remains open.', 'No proposal changes the progress rate.'],
    next: 'Next grouped confirmation',
    confirmation: 'I confirm PGM-CON-DEC-001 V0.1 as the proposal for eight individual documentary decisions, comprising three limited admissions and five deferrals, without yet pronouncing them, accepting evidence or authorising promotion, CON-01, CON-05, REF-02 or L2.',
    boundary: 'A decision proposal is neither pronounced admissibility, accepted evidence, a business outcome nor progress.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR INDIVIDUELLES ENTSCHEIDUNGSPAKET · PGM-CON-DEC-001 · V0.1 · 02.09.2026',
    title: 'Acht ausdrückliche Vorschläge, null ausgesprochene Entscheide',
    intro: 'Dieses Paket überführt die vier bestätigten Wege in acht getrennte Dokumentenvorschläge. Es bereitet den menschlichen Entscheid vor, ohne Nachweise anzunehmen oder ein Geschäftsergebnis zu erzeugen.',
    counters: [['8', 'Entscheidungskandidaten'], ['3', 'begrenzte Zulassungen vorgeschlagen'], ['5', 'Vertagungen vorgeschlagen'], ['0/8', 'Entscheide ausgesprochen']],
    labels: { lane: 'Bestätigter Weg', outcome: 'Vorgeschlagenes Ergebnis', condition: 'Bedingung oder Grenze', status: 'VORSCHLAG' },
    guardrails: 'Umfang des Kandidatenpakets',
    rules: ['Jeder Vorschlag bleibt vor menschlicher Bestätigung änderbar.', 'Eine begrenzte Zulassung würde nur die angegebene Dokumentennutzung erlauben.', 'Eine Vertagung würde die Referenz außerhalb der Nachweise halten, solange ihre Bedingung offen ist.', 'Kein Vorschlag ändert den Fortschrittswert.'],
    next: 'Nächste gebündelte Bestätigung',
    confirmation: 'Ich bestätige PGM-CON-DEC-001 V0.1 als Vorschlag für acht einzelne Dokumentenentscheide, bestehend aus drei begrenzten Zulassungen und fünf Vertagungen, ohne sie bereits auszusprechen, Nachweise anzunehmen oder eine Beförderung, CON-01, CON-05, REF-02 oder L2 zu erlauben.',
    boundary: 'Ein Entscheidungsvorschlag ist weder ausgesprochene Zulässigkeit noch angenommener Nachweis, Geschäftsergebnis oder Fortschritt.'
  }
};

const InstitutionalProgramDesignEvidenceDecisionPackage = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-decision-package" data-testid="institutional-program-design-evidence-decision-package" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Scale className="shrink-0 text-cyan-300" size={28} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 3 ? 'text-slate-200' : index === 1 ? 'text-emerald-300' : index === 2 ? 'text-amber-300' : 'text-cyan-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{DECISIONS.map(([id, lane, type, outcome, condition]) => { const Icon = type === 'LIMITED' ? FileCheck2 : PauseCircle; const accent = type === 'LIMITED' ? 'text-emerald-300' : 'text-amber-300'; return <article key={id} data-testid="institutional-program-design-evidence-decision-row" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950/30 ${accent}`}><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-cyan-300">{id}</p><p className="mt-1 text-xs text-slate-400">{t.labels.lane} · {lane}</p></div></div><span className="shrink-0 rounded-md border border-amber-800 bg-amber-950/30 px-2 py-1 text-xs font-semibold text-amber-200">{t.labels.status}</span></div><div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.outcome}</p><p data-testid={`institutional-program-design-evidence-decision-${type.toLowerCase()}`} className={`mt-1 text-sm font-semibold ${accent}`}>{local(outcome)}</p></div><div className="mt-3"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.condition}</p><p className="mt-1 text-xs leading-5 text-slate-300">{local(condition)}</p></div></article>; })}</div>

      <div className="mt-4 rounded-md border border-cyan-900/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.guardrails}</p><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.rules.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></div>
      <div className="mt-4 rounded-md border border-blue-800/70 bg-blue-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceDecisionPackage;
