import React from 'react';
import { AlertTriangle, CheckCircle2, FileWarning, Languages, LockKeyhole, Wrench } from 'lucide-react';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const PACKAGES = [
  {
    id: 'COR-01',
    scope: 'CON-03 · Glossaire central 2SG',
    source: 'SRC-06 · empreinte 35053DA5A194',
    icon: Languages,
    gap: text(
      'Le lot annonce « définitions FR validées », tandis que chaque entrée reste « à valider », sans date ; les versions DE/EN restent aussi à valider.',
      'The package states “validated FR definitions”, while each entry remains “to validate” with no date; DE/EN versions also remain to validate.',
      'Das Los nennt „validierte FR-Definitionen“, während jeder Eintrag ohne Datum „zu validieren“ bleibt; auch DE/EN bleiben zu validieren.'
    ),
    actions: text(
      ['Figer une copie de travail distincte.', 'Séparer le statut du lot des statuts par entrée et par langue.', 'Conserver tout statut non prouvé à « à valider ».', 'Tester cohérence, références et encodage FR/EN/DE.'],
      ['Freeze a separate working copy.', 'Separate package status from per-entry and per-language statuses.', 'Keep every unproven status as “to validate”.', 'Test consistency, references and FR/EN/DE encoding.'],
      ['Separate Arbeitskopie fixieren.', 'Losstatus von Status je Eintrag und Sprache trennen.', 'Jeden unbelegten Status als „zu validieren“ behalten.', 'Kohärenz, Referenzen und FR/EN/DE-Kodierung testen.']
    ),
    exit: text(
      'Aucune contradiction de statut ; aucune validation rétroactive ; provenance et date explicites lorsqu’une validation existe.',
      'No status contradiction; no retroactive validation; explicit provenance and date wherever validation exists.',
      'Kein Statuswiderspruch; keine rückwirkende Validierung; klare Herkunft und Datum bei vorhandener Validierung.'
    ),
    stop: text(
      'Arrêt avant toute promotion d’un terme ou d’une traduction sans validation humaine traçable.',
      'Stop before promoting any term or translation without traceable human validation.',
      'Stopp vor jeder Beförderung eines Begriffs oder einer Übersetzung ohne nachvollziehbare menschliche Validierung.'
    )
  },
  {
    id: 'COR-02',
    scope: 'CON-06 · Daily Intelligence',
    source: 'SRC-08 · empreinte E208BF378742',
    icon: FileWarning,
    gap: text(
      'Le contenu dynamique est courant, mais le contenu HTML statique de repli reste ancien et partiellement mal encodé avant exécution JavaScript.',
      'Dynamic content is current, but the static HTML fallback remains old and partly misencoded before JavaScript runs.',
      'Der dynamische Inhalt ist aktuell, aber der statische HTML-Rückfall bleibt vor JavaScript-Ausführung alt und teilweise falsch kodiert.'
    ),
    actions: text(
      ['Produire le repli depuis le même contexte validé que l’interface dynamique.', 'Forcer UTF-8 sur la génération et la lecture.', 'Comparer les marqueurs métier avec et sans JavaScript.', 'Conserver strictement l’état de livraison Telegram.'],
      ['Generate fallback from the same validated context as the dynamic interface.', 'Enforce UTF-8 for generation and reading.', 'Compare business markers with and without JavaScript.', 'Strictly preserve Telegram delivery state.'],
      ['Rückfall aus demselben validierten Kontext wie die dynamische Oberfläche erzeugen.', 'UTF-8 bei Erzeugung und Lektüre erzwingen.', 'Fachmarker mit und ohne JavaScript vergleichen.', 'Telegram-Lieferstatus strikt bewahren.']
    ),
    exit: text(
      'Date, mémoire, journal, agenda, décision et prochain arbitrage lisibles sans JavaScript, sans mojibake ni divergence dynamique.',
      'Date, memory, log, agenda, decision and next gate readable without JavaScript, with no mojibake or dynamic divergence.',
      'Datum, Gedächtnis, Journal, Agenda, Entscheid und nächstes Tor ohne JavaScript lesbar, ohne Mojibake oder dynamische Abweichung.'
    ),
    stop: text(
      'Arrêt avant tout envoi Telegram, changement d’état de livraison ou modification d’une donnée probatoire.',
      'Stop before any Telegram delivery, delivery-state change or evidentiary-data modification.',
      'Stopp vor jeder Telegram-Sendung, Änderung des Lieferstatus oder Änderung beweisbezogener Daten.'
    )
  }
];

const COPY = {
  FR: {
    eyebrow: 'PLAN CORRECTIF CONFIRMÉ · PGM-CON-COR-001 · V1.0 · 01-09-2026',
    title: 'Traiter les deux écarts sans élargir le périmètre',
    intro: 'PGM-DEC-011 confirme le plan et autorise son exécution technique dans l’ordre COR-01 puis COR-02. Les deux corrections ont été exécutées séparément, de manière réversible, sans accepter de preuve.',
    counters: [['2/2', 'écarts cadrés'], ['2', 'micro-lots séparés'], ['2', 'corrections exécutées'], ['0', 'preuve acceptée']],
    labels: { gap: 'Écart confirmé', actions: 'Séquence exécutée et contrôlée', exit: 'Critère de sortie', stop: 'Règle d’arrêt conservée', source: 'Source déjà ouverte' },
    next: 'Relevé d’exécution candidat',
    confirmation: 'Les résultats de COR-01 et COR-02 sont restitués dans PGM-CON-COR-002 V0.1 pour confirmation humaine, sans acceptation de preuve.',
    boundary: 'Exécution technique uniquement : aucune validation rétroactive, livraison Telegram, qualification institutionnelle ou progression n’est déclarée.'
  },
  EN: {
    eyebrow: 'CONFIRMED CORRECTION PLAN · PGM-CON-COR-001 · V1.0 · 1 SEP 2026',
    title: 'Address both gaps without expanding scope',
    intro: 'PGM-DEC-011 confirms the plan and authorises technical execution in the order COR-01 then COR-02. Both corrections were executed separately and reversibly, without accepting evidence.',
    counters: [['2/2', 'gaps framed'], ['2', 'separate micro-packages'], ['2', 'corrections executed'], ['0', 'evidence accepted']],
    labels: { gap: 'Confirmed gap', actions: 'Executed and controlled sequence', exit: 'Exit criterion', stop: 'Preserved stop rule', source: 'Already opened source' },
    next: 'Candidate execution record',
    confirmation: 'COR-01 and COR-02 results are recorded in PGM-CON-COR-002 V0.1 for human confirmation, without evidence acceptance.',
    boundary: 'Technical execution only: no retrospective validation, Telegram delivery, institutional qualification or progress is declared.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER KORREKTURPLAN · PGM-CON-COR-001 · V1.0 · 01.09.2026',
    title: 'Beide Lücken ohne Erweiterung des Umfangs behandeln',
    intro: 'PGM-DEC-011 bestätigt den Plan und autorisiert die technische Ausführung in der Reihenfolge COR-01 und danach COR-02. Beide Korrekturen wurden getrennt und reversibel ausgeführt, ohne Nachweise anzunehmen.',
    counters: [['2/2', 'Lücken strukturiert'], ['2', 'getrennte Mikrolosen'], ['2', 'Korrekturen ausgeführt'], ['0', 'Nachweise angenommen']],
    labels: { gap: 'Bestätigte Lücke', actions: 'Ausgeführte und kontrollierte Sequenz', exit: 'Austrittskriterium', stop: 'Beibehaltene Stoppregel', source: 'Bereits geöffnete Quelle' },
    next: 'Kandidat für Ausführungsprotokoll',
    confirmation: 'Die Ergebnisse von COR-01 und COR-02 sind in PGM-CON-COR-002 V0.1 zur menschlichen Bestätigung dokumentiert, ohne Nachweisannahme.',
    boundary: 'Nur technische Ausführung: Keine rückwirkende Validierung, Telegram-Sendung, institutionelle Einstufung oder Fortschrittsangabe wird erklärt.'
  }
};

const InstitutionalProgramDesignGapCorrectionPlan = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-gap-correction-plan" data-testid="institutional-program-design-gap-correction-plan" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <Wrench className="shrink-0 text-amber-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-amber-300' : 'text-slate-200'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {PACKAGES.map(item => {
          const Icon = item.icon;
          return (
            <article key={item.id} data-testid="institutional-program-design-gap-package" className="m3s-raised p-4">
              <div className="flex items-start gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-950/35 text-amber-300"><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-amber-300">{item.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{item.scope}</h5><p className="mt-1 font-mono text-xs text-slate-400">{t.labels.source} · {item.source}</p></div></div>
              <div className="mt-4 space-y-4">
                <div><p className="text-xs font-semibold uppercase text-rose-300">{t.labels.gap}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(item.gap)}</p></div>
                <div><p className="text-xs font-semibold uppercase text-sky-300">{t.labels.actions}</p><ol className="mt-2 space-y-2">{local(item.actions).map((action, index) => <li key={action} className="flex items-start gap-2 text-sm leading-6 text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-950/35 text-xs font-semibold text-sky-300">{index + 1}</span>{action}</li>)}</ol></div>
                <div><p className="text-xs font-semibold uppercase text-emerald-300">{t.labels.exit}</p><p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 shrink-0 text-emerald-300" size={16} aria-hidden="true" />{local(item.exit)}</p></div>
                <div><p className="text-xs font-semibold uppercase text-amber-300">{t.labels.stop}</p><p className="mt-2 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{local(item.stop)}</p></div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><Wrench size={16} aria-hidden="true" />{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignGapCorrectionPlan;
