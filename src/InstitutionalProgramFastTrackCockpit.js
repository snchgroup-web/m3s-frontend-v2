import React from 'react';
import { AlertTriangle, CheckCircle2, Gauge, Layers3, LockKeyhole, Route } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'COCKPIT GLOBAL CANDIDAT · PGM-CPK-001 · V0.5 · 02-09-2026',
    title: 'Voir le Programme dans son ensemble sans masquer les preuves manquantes',
    intro: 'Cette vue compacte sépare la structure institutionnelle, l’avancement documentaire observé et la décision technique courante. Elle ne calcule aucun pourcentage sans périmètre cible et preuves gouvernées.',
    stages: [
      ['Conception', 'Relevé confirmé', 'Contrôle post-correction candidat · 0 preuve'],
      ['Mise en place', '7/7 composantes publiées', 'Mesure opérationnelle indisponible'],
      ['Consolidation', '8/8 cadres confirmés', 'REF-01 sous veille probatoire'],
      ['Dynamisation', '8 composantes cadrées', 'Revue détaillée non démarrée']
    ],
    current: 'Conception · relevé confirmé · PGM-DEC-012 V1.0',
    metrics: [['2/2', 'corrections confirmées'], ['2/2', 'écarts techniques levés'], ['0/8', 'référence acceptée comme preuve'], ['0', 'progression calculée']],
    fastTrack: 'Fast Track actif',
    fastTrackBody: 'PGM-DEC-012 confirme PGM-CON-COR-002 V1.0. Le contrôle post-correction PGM-CON-REV-003 V0.1 qualifie les deux écarts comme techniquement levés, tout en maintenant 0/8 référence acceptée comme preuve.',
    boundary: 'CON-01 et CON-05 restent non ouverts ; REF-02 et L2 restent fermés. Zéro preuve acceptée, requalification ou progression.'
  },
  EN: {
    eyebrow: 'CANDIDATE GLOBAL COCKPIT · PGM-CPK-001 · V0.5 · 2 SEP 2026',
    title: 'See the Programme as a whole without hiding missing evidence',
    intro: 'This compact view separates the institutional structure, observed documentary progress and the current technical decision. It calculates no percentage without a target scope and governed evidence.',
    stages: [
      ['Design', 'Execution record confirmed', 'Candidate post-correction review · zero evidence'],
      ['Implementation', '7/7 components published', 'Operational measurement unavailable'],
      ['Consolidation', '8/8 frameworks confirmed', 'REF-01 under evidentiary watch'],
      ['Dynamisation', '8 framed components', 'Detailed review not started']
    ],
    current: 'Design · execution record confirmed · PGM-DEC-012 V1.0',
    metrics: [['2/2', 'corrections confirmed'], ['2/2', 'technical gaps resolved'], ['0/8', 'references accepted as evidence'], ['0', 'calculated progress']],
    fastTrack: 'Fast Track active',
    fastTrackBody: 'PGM-DEC-012 confirms PGM-CON-COR-002 V1.0. Candidate post-correction review PGM-CON-REV-003 V0.1 qualifies both gaps as technically resolved while keeping 0/8 references accepted as evidence.',
    boundary: 'CON-01 and CON-05 remain unopened; REF-02 and L2 remain closed. Zero evidence accepted, requalification or progress.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR DAS GESAMTCOCKPIT · PGM-CPK-001 · V0.5 · 02.09.2026',
    title: 'Das Programm als Ganzes sehen, ohne fehlende Nachweise zu verbergen',
    intro: 'Diese kompakte Ansicht trennt institutionelle Struktur, beobachteten Dokumentationsstand und aktuellen technischen Entscheid. Ohne Zielumfang und gesteuerte Nachweise wird kein Prozentsatz berechnet.',
    stages: [
      ['Konzeption', 'Ausführungsprotokoll bestätigt', 'Kandidat für Nachkorrekturprüfung · null Nachweise'],
      ['Umsetzung', '7/7 Komponenten veröffentlicht', 'Operative Messung nicht verfügbar'],
      ['Konsolidierung', '8/8 Rahmen bestätigt', 'REF-01 unter beweisbezogener Beobachtung'],
      ['Dynamisierung', '8 strukturierte Komponenten', 'Detailprüfung nicht begonnen']
    ],
    current: 'Konzeption · Ausführungsprotokoll bestätigt · PGM-DEC-012 V1.0',
    metrics: [['2/2', 'Korrekturen bestätigt'], ['2/2', 'technische Lücken behoben'], ['0/8', 'Referenzen als Nachweis angenommen'], ['0', 'berechneter Fortschritt']],
    fastTrack: 'Fast Track aktiv',
    fastTrackBody: 'PGM-DEC-012 bestätigt PGM-CON-COR-002 V1.0. Der Kandidat PGM-CON-REV-003 V0.1 qualifiziert beide Lücken als technisch behoben und behält 0/8 als Nachweise angenommene Referenzen bei.',
    boundary: 'CON-01 und CON-05 bleiben ungeöffnet; REF-02 und L2 bleiben geschlossen. Null angenommene Nachweise, Neueinstufung oder Fortschritt.'
  }
};

const InstitutionalProgramFastTrackCockpit = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-fast-track-cockpit" data-testid="institutional-fast-track-cockpit" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-blue-300">{t.eyebrow}</p>
          <h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <Gauge className="shrink-0 text-blue-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.stages.map(([title, value, note], index) => (
          <article key={title} className="m3s-raised min-h-32 p-3">
            <div className="flex items-center justify-between gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-950/45 text-xs font-semibold text-blue-300">{index + 1}</span><Layers3 size={17} className="text-slate-400" aria-hidden="true" /></div>
            <h5 className="mt-3 text-sm font-semibold text-slate-100">{title}</h5>
            <p className="mt-1 text-sm font-semibold text-blue-300">{value}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 sm:p-4">
        <div className="flex items-center gap-2"><Route size={19} className="text-sky-300" aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.current}</h5></div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">{t.metrics.map(([value, label], index) => <div key={label} className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><p className={`text-xl font-semibold ${index === 1 ? 'text-emerald-300' : index === 2 ? 'text-amber-300' : index === 3 ? 'text-rose-300' : 'text-sky-300'}`}>{value}</p><p className="mt-1 text-xs leading-5 text-slate-300">{label}</p></div>)}</div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={19} aria-hidden="true" /><div><h5 className="text-sm font-semibold text-emerald-100">{t.fastTrack}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.fastTrackBody}</p></div></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}<LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" /></p>
    </section>
  );
};

export default InstitutionalProgramFastTrackCockpit;
