import React from 'react';
import { AlertTriangle, FileCheck2, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';

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
    eyebrow: 'MATRICE D’ADMISSIBILITÉ CANDIDATE · PGM-CON-EVD-002 · V0.1 · 02-09-2026',
    title: 'Préparer huit décisions sans accepter une preuve',
    intro: 'Cette matrice transforme les réserves déjà documentées en cinq portes communes et huit orientations candidates. Toutes les références restent à arbitrer.',
    counters: [['8/8', 'références reprises'], ['5', 'portes documentaires'], ['8', 'orientations candidates'], ['0/8', 'décision d’admissibilité']],
    gates: 'Portes communes obligatoires',
    labels: { scope: 'Périmètre candidat', orientation: 'Orientation candidate', status: 'Statut' },
    pending: 'À ARBITRER',
    next: 'Prochaine confirmation groupée',
    confirmation: 'Je confirme PGM-CON-EVD-002 V0.1 comme matrice candidate d’admissibilité des huit références et ses cinq portes, sans accepter de preuve ni autoriser leur promotion, CON-01, CON-05, REF-02 ou L2.',
    boundary: 'Une orientation candidate n’est ni une décision d’admissibilité, ni une preuve acceptée, ni une validation du résultat métier.'
  },
  EN: {
    eyebrow: 'CANDIDATE ADMISSIBILITY MATRIX · PGM-CON-EVD-002 · V0.1 · 2 SEP 2026',
    title: 'Prepare eight decisions without accepting evidence',
    intro: 'This matrix turns already documented reservations into five common gates and eight candidate orientations. Every reference remains pending decision.',
    counters: [['8/8', 'references included'], ['5', 'documentary gates'], ['8', 'candidate orientations'], ['0/8', 'admissibility decisions']],
    gates: 'Mandatory common gates',
    labels: { scope: 'Candidate scope', orientation: 'Candidate orientation', status: 'Status' },
    pending: 'TO DECIDE',
    next: 'Next grouped confirmation',
    confirmation: 'I confirm PGM-CON-EVD-002 V0.1 as the candidate admissibility matrix for the eight references and its five gates, without accepting evidence or authorising their promotion, CON-01, CON-05, REF-02 or L2.',
    boundary: 'A candidate orientation is neither an admissibility decision, accepted evidence nor validation of a business outcome.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR ZULÄSSIGKEITSMATRIX · PGM-CON-EVD-002 · V0.1 · 02.09.2026',
    title: 'Acht Entscheide vorbereiten, ohne Nachweise anzunehmen',
    intro: 'Diese Matrix überführt bereits dokumentierte Vorbehalte in fünf gemeinsame Tore und acht Kandidatenorientierungen. Jede Referenz bleibt zu entscheiden.',
    counters: [['8/8', 'Referenzen übernommen'], ['5', 'Dokumenten-Tore'], ['8', 'Kandidatenorientierungen'], ['0/8', 'Zulässigkeitsentscheide']],
    gates: 'Verbindliche gemeinsame Tore',
    labels: { scope: 'Kandidatenumfang', orientation: 'Kandidatenorientierung', status: 'Status' },
    pending: 'ZU ENTSCHEIDEN',
    next: 'Nächste gebündelte Bestätigung',
    confirmation: 'Ich bestätige PGM-CON-EVD-002 V0.1 als Kandidatenmatrix zur Zulässigkeit der acht Referenzen und ihre fünf Tore, ohne Nachweise anzunehmen oder deren Beförderung, CON-01, CON-05, REF-02 oder L2 zu erlauben.',
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

      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceAdmissibilityMatrix;
