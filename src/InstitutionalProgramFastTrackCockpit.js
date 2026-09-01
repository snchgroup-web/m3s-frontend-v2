import React from 'react';
import { AlertTriangle, CheckCircle2, Gauge, Layers3, LockKeyhole, Route } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'COCKPIT GLOBAL CANDIDAT · PGM-CPK-001 · V0.2 · 01-09-2026',
    title: 'Voir le Programme dans son ensemble sans masquer les preuves manquantes',
    intro: 'Cette vue compacte sépare la structure institutionnelle, l’avancement documentaire observé et la décision technique courante. Elle ne calcule aucun pourcentage sans périmètre cible et preuves gouvernées.',
    stages: [
      ['Conception', '8 références ouvertes', 'Revue candidate · 0 preuve acceptée'],
      ['Mise en place', '7/7 composantes publiées', 'Mesure opérationnelle indisponible'],
      ['Consolidation', '8/8 cadres confirmés', 'REF-01 sous veille probatoire'],
      ['Dynamisation', '8 composantes cadrées', 'Revue détaillée non démarrée']
    ],
    current: 'Conception · ouverture contrôlée · PGM-DEC-009 V1.0',
    metrics: [['8/8', 'références ouvertes'], ['7', 'apports directs candidats'], ['2', 'écarts isolés'], ['0', 'preuves acceptées']],
    fastTrack: 'Fast Track actif',
    fastTrackBody: 'PGM-DEC-009 consigne l’ouverture et la lecture des huit références uniques autorisées. PGM-CON-REV-002 V0.1 qualifie 7 apports directs et 1 apport méthodologique, sans calculer de progression.',
    boundary: 'CON-01 et CON-05 restent non ouverts ; REF-02 et L2 restent fermés. La revue ne vaut ni acceptation de preuve, ni requalification, ni progression.'
  },
  EN: {
    eyebrow: 'CANDIDATE GLOBAL COCKPIT · PGM-CPK-001 · V0.2 · 1 SEP 2026',
    title: 'See the Programme as a whole without hiding missing evidence',
    intro: 'This compact view separates the institutional structure, observed documentary progress and the current technical decision. It calculates no percentage without a target scope and governed evidence.',
    stages: [
      ['Design', '8 references opened', 'Candidate review · 0 evidence accepted'],
      ['Implementation', '7/7 components published', 'Operational measurement unavailable'],
      ['Consolidation', '8/8 frameworks confirmed', 'REF-01 under evidentiary watch'],
      ['Dynamisation', '8 framed components', 'Detailed review not started']
    ],
    current: 'Design · controlled opening · PGM-DEC-009 V1.0',
    metrics: [['8/8', 'references opened'], ['7', 'candidate direct contributions'], ['2', 'isolated gaps'], ['0', 'evidence accepted']],
    fastTrack: 'Fast Track active',
    fastTrackBody: 'PGM-DEC-009 records the opening and reading of the eight authorised unique references. PGM-CON-REV-002 V0.1 qualifies 7 direct contributions and 1 method contribution without calculating progress.',
    boundary: 'CON-01 and CON-05 remain unopened; REF-02 and L2 remain closed. The review is neither evidence acceptance, requalification nor progress.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR DAS GESAMTCOCKPIT · PGM-CPK-001 · V0.2 · 01.09.2026',
    title: 'Das Programm als Ganzes sehen, ohne fehlende Nachweise zu verbergen',
    intro: 'Diese kompakte Ansicht trennt institutionelle Struktur, beobachteten Dokumentationsstand und aktuellen technischen Entscheid. Ohne Zielumfang und gesteuerte Nachweise wird kein Prozentsatz berechnet.',
    stages: [
      ['Konzeption', '8 Referenzen geöffnet', 'Kandidatenprüfung · 0 Nachweise angenommen'],
      ['Umsetzung', '7/7 Komponenten veröffentlicht', 'Operative Messung nicht verfügbar'],
      ['Konsolidierung', '8/8 Rahmen bestätigt', 'REF-01 unter beweisbezogener Beobachtung'],
      ['Dynamisierung', '8 strukturierte Komponenten', 'Detailprüfung nicht begonnen']
    ],
    current: 'Konzeption · kontrollierte Öffnung · PGM-DEC-009 V1.0',
    metrics: [['8/8', 'Referenzen geöffnet'], ['7', 'direkte Kandidatenbeiträge'], ['2', 'isolierte Lücken'], ['0', 'Nachweise angenommen']],
    fastTrack: 'Fast Track aktiv',
    fastTrackBody: 'PGM-DEC-009 dokumentiert Öffnung und Lektüre der acht autorisierten eindeutigen Referenzen. PGM-CON-REV-002 V0.1 qualifiziert 7 direkte Beiträge und 1 Methodenbeitrag, ohne Fortschritt zu berechnen.',
    boundary: 'CON-01 und CON-05 bleiben ungeöffnet; REF-02 und L2 bleiben geschlossen. Die Prüfung bedeutet weder Nachweisannahme, Neueinstufung noch Fortschritt.'
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
