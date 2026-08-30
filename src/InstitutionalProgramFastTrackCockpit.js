import React from 'react';
import { AlertTriangle, CheckCircle2, Gauge, Layers3, LockKeyhole, Route } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'COCKPIT GLOBAL CANDIDAT · PGM-CPK-001 · V0.1 · 30-08-2026',
    title: 'Voir le Programme dans son ensemble sans masquer les preuves manquantes',
    intro: 'Cette vue compacte sépare la structure institutionnelle, l’avancement documentaire observé et la décision technique courante. Elle ne calcule aucun pourcentage sans périmètre cible et preuves gouvernées.',
    stages: [
      ['Conception', '6 composantes cadrées', 'Contrôle détaillé à faire remonter'],
      ['Mise en place', '7/7 composantes publiées', 'Mesure opérationnelle indisponible'],
      ['Consolidation', '8/8 cadres confirmés', 'REF-01 est le contrôle détaillé courant'],
      ['Dynamisation', '8 composantes cadrées', 'Revue détaillée non démarrée']
    ],
    current: 'Contrôle courant · REF-01 V1.72 · REQ-002 V1.0 confirmé',
    metrics: [['22/22', 'valeurs examinées'], ['9', 'qualifiées, portée synthétique'], ['5/5', 'familles confirmées documentairement'], ['0/6', 'conditions G1 clôturables']],
    fastTrack: 'Fast Track actif',
    fastTrackBody: 'DEC-069 confirme REQ-002 V1.0 comme modèle unique sans envoi. REC-002 V0.1 prépare maintenant cinq profils fonctionnels, sans identité ni contact.',
    boundary: 'G1 reste ouverte et L2 fermé. Ce cockpit est une lecture de pilotage, pas une validation de conformité ni une autorisation de déploiement.'
  },
  EN: {
    eyebrow: 'CANDIDATE GLOBAL COCKPIT · PGM-CPK-001 · V0.1 · 30 AUG 2026',
    title: 'See the Programme as a whole without hiding missing evidence',
    intro: 'This compact view separates the institutional structure, observed documentary progress and the current technical decision. It calculates no percentage without a target scope and governed evidence.',
    stages: [
      ['Design', '6 framed components', 'Detailed control to surface'],
      ['Implementation', '7/7 components published', 'Operational measurement unavailable'],
      ['Consolidation', '8/8 frameworks confirmed', 'REF-01 is the current detailed control'],
      ['Dynamisation', '8 framed components', 'Detailed review not started']
    ],
    current: 'Current control · REF-01 V1.72 · REQ-002 V1.0 confirmed',
    metrics: [['22/22', 'values reviewed'], ['9', 'qualified, synthetic scope'], ['5/5', 'families documentarily confirmed'], ['0/6', 'closable G1 conditions']],
    fastTrack: 'Fast Track active',
    fastTrackBody: 'DEC-069 confirms REQ-002 V1.0 as one template without release. REC-002 V0.1 now prepares five functional profiles, with no identity or contact.',
    boundary: 'G1 remains open and L2 closed. This cockpit is a steering view, not a compliance validation or deployment authorisation.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR DAS GESAMTCOCKPIT · PGM-CPK-001 · V0.1 · 30.08.2026',
    title: 'Das Programm als Ganzes sehen, ohne fehlende Nachweise zu verbergen',
    intro: 'Diese kompakte Ansicht trennt institutionelle Struktur, beobachteten Dokumentationsstand und aktuellen technischen Entscheid. Ohne Zielumfang und gesteuerte Nachweise wird kein Prozentsatz berechnet.',
    stages: [
      ['Konzeption', '6 strukturierte Komponenten', 'Detailkontrolle sichtbar zu machen'],
      ['Umsetzung', '7/7 Komponenten veröffentlicht', 'Operative Messung nicht verfügbar'],
      ['Konsolidierung', '8/8 Rahmen bestätigt', 'REF-01 ist die aktuelle Detailkontrolle'],
      ['Dynamisierung', '8 strukturierte Komponenten', 'Detailprüfung nicht begonnen']
    ],
    current: 'Aktuelle Kontrolle · REF-01 V1.72 · REQ-002 V1.0 bestätigt',
    metrics: [['22/22', 'Werte geprüft'], ['9', 'qualifiziert, synthetischer Umfang'], ['5/5', 'Familien dokumentarisch bestätigt'], ['0/6', 'schliessbare G1-Bedingungen']],
    fastTrack: 'Fast Track aktiv',
    fastTrackBody: 'DEC-069 bestätigt REQ-002 V1.0 als einheitliche Vorlage ohne Versand. REC-002 V0.1 bereitet nun fünf Funktionsprofile ohne Identität oder Kontakt vor.',
    boundary: 'G1 bleibt offen und L2 geschlossen. Dieses Cockpit ist eine Steuerungsansicht, keine Konformitätsbestätigung oder Bereitstellungsfreigabe.'
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
