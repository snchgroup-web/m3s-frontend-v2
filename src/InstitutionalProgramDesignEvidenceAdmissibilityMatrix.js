import React from 'react';
import { AlertTriangle, FileCheck2, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const GATES = [
  text('Identité et intégrité', 'Identity and integrity', 'Identität und Integrität'),
  text('Provenance et version', 'Provenance and version', 'Herkunft und Version'),
  text('Pertinence du périmètre', 'Scope relevance', 'Relevanz des Umfangs'),
  text('Réserve traitée', 'Reservation addressed', 'Vorbehalt behandelt'),
  text('Gel et archivage GED', 'DMS freeze and archive', 'GED-Fixierung und Archivierung')
];

const REFERENCES = [
  ['SRC-01', 'M3S_JOURNAL_DE_BORD_2026-09-01.md', 'CON-02 · CON-06', text('Conditionnelle : figer une copie GED datée avant tout usage probatoire.', 'Conditional: freeze a dated DMS copy before evidentiary use.', 'Bedingt: Vor beweisbezogener Nutzung eine datierte GED-Kopie fixieren.')],
  ['SRC-02', '2SG_MODELE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_2_2026-08-23.md', 'CON-02 · CON-03 · CON-04 · CON-06', text('Cadrage seulement : distinguer le cadre documentaire de la preuve de réalisation.', 'Framing only: separate the documentary framework from evidence of achievement.', 'Nur Rahmen: Dokumentenrahmen vom Nachweis der Umsetzung trennen.')],
  ['SRC-03', '2SG_MATRICE_CADRAGE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_2026-08-23.md', 'CON-02 · CON-03 · CON-04 · CON-06', text('Conditionnelle : tracer la relation entre V0.1 et la matrice M3S confirmée.', 'Conditional: trace the relationship between V0.1 and the confirmed M3S matrix.', 'Bedingt: Beziehung zwischen V0.1 und bestätigter M3S-Matrix nachweisen.')],
  ['SRC-04', '2SG_INVENTAIRE_SOURCES_MISE_EN_PLACE_V0_1_2026-08-23.md', 'CON-03', text('Méthode seulement : exclure toute qualification comme résultat direct de CON-03.', 'Method only: exclude qualification as a direct CON-03 outcome.', 'Nur Methode: Einstufung als direktes CON-03-Ergebnis ausschließen.')],
  ['SRC-05', '2SG_REGISTRE_VEILLE_KM_V3_1_REVISION_LINGUISTIQUE_2026-07-30_STANDALONE.html', 'CON-03', text('Conditionnelle : traiter la couverture non qualifiée et restreinte sans présumer la complétude.', 'Conditional: address unqualified and restricted coverage without assuming completeness.', 'Bedingt: unqualifizierte und eingeschränkte Abdeckung behandeln, ohne Vollständigkeit anzunehmen.')],
  ['SRC-06', '2SG_CANDIDATS_GLOSSAIRE_P1_VEILLE_KM_2026-07-30.json', 'CON-03', text('Conditionnelle après correction : conserver la filiation et valider séparément les 7 entrées FR/DE/EN.', 'Conditional after correction: preserve lineage and validate the 7 FR/DE/EN entries separately.', 'Bedingt nach Korrektur: Herkunftskette bewahren und 7 FR/DE/EN-Einträge getrennt validieren.')],
  ['SRC-07', '2SG_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_VISUEL_2026-08-23_STANDALONE.html', 'CON-04', text('Support seulement : ne pas promouvoir ce visuel en registre maître.', 'Support only: do not promote this visual to a master register.', 'Nur Unterstützung: Diese Visualisierung nicht zum Masterregister befördern.')],
  ['SRC-08', '2SG_Intelligence_Dashboard_V4_01-09-2026.html', 'CON-06', text('Conditionnelle après correction : figer l’édition datée et ses métadonnées de livraison.', 'Conditional after correction: freeze the dated edition and its delivery metadata.', 'Bedingt nach Korrektur: Datierte Ausgabe und Liefermetadaten fixieren.')]
];

const COPY = {
  FR: {
    eyebrow: 'MATRICE D’ADMISSIBILITÉ CONFIRMÉE · PGM-CON-EVD-002 · V1.0 · 02-09-2026',
    title: 'Huit décisions encadrées, aucune admissibilité prononcée',
    intro: 'PGM-DEC-014 confirme les cinq portes et les huit orientations comme cadre de décision. Toutes les références restent à arbitrer.',
    counters: [['8/8', 'références reprises'], ['5', 'portes documentaires'], ['8', 'orientations candidates'], ['0/8', 'décision d’admissibilité']],
    gates: 'Portes communes obligatoires',
    labels: { scope: 'Périmètre candidat', orientation: 'Orientation candidate', status: 'Statut' },
    pending: 'À ARBITRER',
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-014', version: 'V1.0', status: 'Matrice d’admissibilité confirmée', author: 'Cheikh Ndiaye', date: '02-09-2026', decision: 'PGM-CON-EVD-002 V0.1 est confirmé et promu en V1.0 comme matrice d’admissibilité des huit références et de ses cinq portes.', evidence: 'Confirmation explicite de Cheikh dans la session du 02-09-2026 : « Je confirme PGM-CON-EVD-002 V0.1 comme matrice candidate d’admissibilité des huit références et ses cinq portes, sans accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2. »', limit: 'La décision confirme uniquement la matrice. Elle prononce 0/8 admissibilité, n’accepte aucune preuve et n’autorise aucune promotion, CON-01, CON-05, REF-02 ou L2.' },
    next: 'Proposition groupée de classement',
    confirmation: 'PGM-CON-ARB-001 V0.1 répartit les huit références dans quatre voies candidates, sans prononcer leur admissibilité ni accepter une preuve.',
    boundary: 'Une orientation candidate n’est ni une décision d’admissibilité, ni une preuve acceptée, ni une validation du résultat métier.'
  },
  EN: {
    eyebrow: 'CONFIRMED ADMISSIBILITY MATRIX · PGM-CON-EVD-002 · V1.0 · 2 SEP 2026',
    title: 'Eight decisions governed, no admissibility pronounced',
    intro: 'PGM-DEC-014 confirms the five gates and eight orientations as a decision framework. Every reference remains pending decision.',
    counters: [['8/8', 'references included'], ['5', 'documentary gates'], ['8', 'candidate orientations'], ['0/8', 'admissibility decisions']],
    gates: 'Mandatory common gates',
    labels: { scope: 'Candidate scope', orientation: 'Candidate orientation', status: 'Status' },
    pending: 'TO DECIDE',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-014', version: 'V1.0', status: 'Admissibility matrix confirmed', author: 'Cheikh Ndiaye', date: '2 Sep 2026', decision: 'PGM-CON-EVD-002 V0.1 is confirmed and promoted to V1.0 as the admissibility matrix for the eight references and its five gates.', evidence: 'Cheikh’s explicit confirmation in the 2 Sep 2026 session, retained in French: “Je confirme PGM-CON-EVD-002 V0.1 comme matrice candidate d’admissibilité des huit références et ses cinq portes, sans accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.”', limit: 'The decision confirms only the matrix. It pronounces 0/8 admissibility decisions, accepts no evidence and authorises no promotion, CON-01, CON-05, REF-02 or L2.' },
    next: 'Grouped classification proposal',
    confirmation: 'PGM-CON-ARB-001 V0.1 places the eight references into four candidate lanes, without pronouncing admissibility or accepting evidence.',
    boundary: 'A candidate orientation is neither an admissibility decision, accepted evidence nor validation of a business outcome.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE ZULÄSSIGKEITSMATRIX · PGM-CON-EVD-002 · V1.0 · 02.09.2026',
    title: 'Acht Entscheide gesteuert, keine Zulässigkeit ausgesprochen',
    intro: 'PGM-DEC-014 bestätigt die fünf Tore und acht Orientierungen als Entscheidungsrahmen. Jede Referenz bleibt zu entscheiden.',
    counters: [['8/8', 'Referenzen übernommen'], ['5', 'Dokumenten-Tore'], ['8', 'Kandidatenorientierungen'], ['0/8', 'Zulässigkeitsentscheide']],
    gates: 'Verbindliche gemeinsame Tore',
    labels: { scope: 'Kandidatenumfang', orientation: 'Kandidatenorientierung', status: 'Status' },
    pending: 'ZU ENTSCHEIDEN',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-014', version: 'V1.0', status: 'Zulässigkeitsmatrix bestätigt', author: 'Cheikh Ndiaye', date: '02.09.2026', decision: 'PGM-CON-EVD-002 V0.1 wird als Zulässigkeitsmatrix der acht Referenzen und ihrer fünf Tore bestätigt und zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 02.09.2026, im französischen Originalwortlaut: „Je confirme PGM-CON-EVD-002 V0.1 comme matrice candidate d’admissibilité des huit références et ses cinq portes, sans accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.“', limit: 'Der Entscheid bestätigt nur die Matrix. Er spricht 0/8 Zulässigkeitsentscheide aus, nimmt keine Nachweise an und erlaubt keine Beförderung, CON-01, CON-05, REF-02 oder L2.' },
    next: 'Gebündelter Klassifizierungsvorschlag',
    confirmation: 'PGM-CON-ARB-001 V0.1 ordnet die acht Referenzen vier Kandidatenwegen zu, ohne Zulässigkeit auszusprechen oder Nachweise anzunehmen.',
    boundary: 'Eine Kandidatenorientierung ist weder ein Zulässigkeitsentscheid noch ein angenommener Nachweis oder eine Validierung eines Geschäftsergebnisses.'
  }
};

const InstitutionalProgramDesignEvidenceAdmissibilityMatrix = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-admissibility" data-testid="institutional-program-design-evidence-admissibility" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Scale className="shrink-0 text-violet-300" size={28} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 3 ? 'text-slate-200' : 'text-violet-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}</div>

      <div className="mt-4 rounded-md border border-violet-900/70 bg-violet-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-violet-300"><ShieldCheck size={16} aria-hidden="true" />{t.gates}</p><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">{GATES.map((gate, index) => <div key={gate.FR} data-testid="institutional-program-design-evidence-gate" className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><p className="text-xs font-semibold text-violet-300">G{index + 1}</p><p className="mt-1 text-xs leading-5 text-slate-300">{local(gate)}</p></div>)}</div></div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{REFERENCES.map(([id, name, scope, orientation]) => <article key={id} data-testid="institutional-program-design-evidence-admissibility-row" className="m3s-raised p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-semibold text-violet-300">{id}</p><h5 className="mt-1 break-words text-sm font-semibold text-slate-100">{name}</h5></div><span className="shrink-0 rounded-md border border-amber-800 bg-amber-950/30 px-2 py-1 text-xs font-semibold text-amber-200">{t.pending}</span></div><div className="mt-3"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.scope}</p><p className="mt-1 text-xs text-sky-200">{scope}</p></div><div className="mt-3"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.orientation}</p><p className="mt-1 flex items-start gap-2 text-xs leading-5 text-slate-300"><FileCheck2 className="mt-0.5 shrink-0 text-violet-300" size={15} aria-hidden="true" />{local(orientation)}</p></div></article>)}</div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceAdmissibilityMatrix;
