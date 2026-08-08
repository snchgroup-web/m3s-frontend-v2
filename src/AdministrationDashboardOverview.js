import React from 'react';
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Mail,
  Network,
  ShieldCheck
} from 'lucide-react';
import { getAdministrationGlossaryTerms } from './AdministrationGlossary';

const COPY = {
  FR: {
    eyebrow: 'PILOTAGE LOCAL · INDICATEURS SOURCÉS',
    title: 'Tableau de bord local Administration',
    intro: 'Cette vue distingue les données opérationnelles disponibles, les éléments de cadrage et les sources qui ne sont pas encore raccordées.',
    metrics: {
      tasks: 'Tâches suivies',
      open: 'Ouvertes',
      completed: 'Tâches terminées',
      components: 'Composantes structurées',
      glossary: 'Termes du glossaire',
      compliance: 'Dossier de conformité signalé'
    },
    sources: {
      tasks: 'API M3S · registre des tâches',
      components: 'Architecture Administration',
      glossary: 'Glossaire central 2SG',
      compliance: 'Cadrage Conformité'
    },
    loading: 'Chargement de la source',
    unavailable: 'Source indisponible',
    confirmedZero: 'Zéro confirmé par la source',
    available: 'Source disponible',
    coverageTitle: 'Couverture fonctionnelle',
    coverageBody: 'Sept composantes organisent actuellement la fonction Administration. Leur niveau de maturité reste visible sans transformer un cadrage en donnée opérationnelle.',
    open: 'Ouvrir',
    statuses: { structured: 'Structurée', connected: 'Connectée', framed: 'Cadrée', governed: 'Gouverné' },
    components: {
      institution: ['Institution', 'Identité, vision, gouvernance et ressources.'],
      planning: ['Planification & Projets', 'Tâches raccordées à l’API ; modèle projet encore progressif.'],
      communication: ['Communication & Courrier', 'Périmètre, responsabilités et circuit documentaire cadrés.'],
      compliance: ['Conformité', 'Obligations et dossier juridique signalé, sans conclusion inventée.'],
      processes: ['Processus & Procédures', 'Cycle, manuel cible, dossiers et archives cadrés.'],
      architecture: ['Architecture & Relations', 'Couches, objets, échanges, systèmes et sources maîtresses structurés.'],
      glossary: ['Glossaire', 'Définitions locales réutilisées depuis le Glossaire central 2SG.']
    },
    readingTitle: 'Règle de lecture des indicateurs',
    readingBody: 'La valeur 0 n’est affichée que lorsqu’une source disponible renvoie réellement zéro. Une source absente ou en erreur reste signalée comme indisponible.',
    boundaryTitle: 'Frontières et prochaines connexions',
    boundaryItems: [
      'Les pièces, versions et preuves restent conservées dans la GED.',
      'Les registres Communication, Conformité et Processus restent en lecture seule tant que leurs données ne sont pas raccordées.',
      'Les indicateurs futurs devront afficher définition, source, date de mise à jour et responsable.'
    ]
  },
  EN: {
    eyebrow: 'LOCAL STEERING · SOURCED INDICATORS',
    title: 'Administration local dashboard',
    intro: 'This view separates available operational data, framing elements and sources that are not connected yet.',
    metrics: {
      tasks: 'Tracked tasks',
      open: 'Open',
      completed: 'Completed tasks',
      components: 'Structured components',
      glossary: 'Glossary terms',
      compliance: 'Reported compliance matter'
    },
    sources: {
      tasks: 'M3S API · task register',
      components: 'Administration architecture',
      glossary: '2SG Central Glossary',
      compliance: 'Compliance framing'
    },
    loading: 'Loading source',
    unavailable: 'Source unavailable',
    confirmedZero: 'Zero confirmed by source',
    available: 'Source available',
    coverageTitle: 'Functional coverage',
    coverageBody: 'Seven components currently organise the Administration function. Their maturity remains visible without presenting framing as operational data.',
    open: 'Open',
    statuses: { structured: 'Structured', connected: 'Connected', framed: 'Framed', governed: 'Governed' },
    components: {
      institution: ['Institution', 'Identity, vision, governance and resources.'],
      planning: ['Planning & Projects', 'Tasks connected to the API; project model remains progressive.'],
      communication: ['Communication & Correspondence', 'Scope, responsibilities and document flow are framed.'],
      compliance: ['Compliance', 'Obligations and a reported legal matter, without invented conclusions.'],
      processes: ['Processes & Procedures', 'Cycle, target manual, files and archives are framed.'],
      architecture: ['Architecture & Relationships', 'Layers, objects, exchanges, systems and master sources are structured.'],
      glossary: ['Glossary', 'Local definitions reused from the 2SG Central Glossary.']
    },
    readingTitle: 'Indicator reading rule',
    readingBody: 'A value of 0 is displayed only when an available source actually returns zero. A missing or failing source remains marked as unavailable.',
    boundaryTitle: 'Boundaries and next connections',
    boundaryItems: [
      'Evidence, versions and records remain stored in the DMS.',
      'Communication, Compliance and Process registers remain read-only until their data sources are connected.',
      'Future indicators must display their definition, source, update date and owner.'
    ]
  },
  DE: {
    eyebrow: 'LOKALE STEUERUNG · BELEGTE KENNZAHLEN',
    title: 'Lokales Verwaltungsdashboard',
    intro: 'Diese Ansicht trennt verfügbare operative Daten, Rahmenelemente und noch nicht angebundene Quellen.',
    metrics: {
      tasks: 'Verfolgte Aufgaben',
      open: 'Offen',
      completed: 'Abgeschlossene Aufgaben',
      components: 'Strukturierte Komponenten',
      glossary: 'Glossarbegriffe',
      compliance: 'Gemeldeter Compliance-Fall'
    },
    sources: {
      tasks: 'M3S-API · Aufgabenregister',
      components: 'Architektur Verwaltung',
      glossary: 'Zentrales 2SG-Glossar',
      compliance: 'Compliance-Rahmen'
    },
    loading: 'Quelle wird geladen',
    unavailable: 'Quelle nicht verfügbar',
    confirmedZero: 'Null durch die Quelle bestätigt',
    available: 'Quelle verfügbar',
    coverageTitle: 'Funktionale Abdeckung',
    coverageBody: 'Sieben Komponenten strukturieren derzeit die Verwaltungsfunktion. Ihr Reifegrad bleibt sichtbar, ohne einen Rahmen als operative Daten darzustellen.',
    open: 'Öffnen',
    statuses: { structured: 'Strukturiert', connected: 'Verbunden', framed: 'Gerahmt', governed: 'Gesteuert' },
    components: {
      institution: ['Institution', 'Identität, Vision, Governance und Ressourcen.'],
      planning: ['Planung & Projekte', 'Aufgaben sind an die API angebunden; das Projektmodell wird schrittweise ergänzt.'],
      communication: ['Kommunikation & Korrespondenz', 'Umfang, Verantwortungen und Dokumentenfluss sind gerahmt.'],
      compliance: ['Compliance', 'Pflichten und ein gemeldeter Rechtsfall, ohne erfundene Schlussfolgerung.'],
      processes: ['Prozesse & Verfahren', 'Ablauf, Zielhandbuch, Akten und Archive sind gerahmt.'],
      architecture: ['Architektur & Beziehungen', 'Ebenen, Objekte, Austausch, Systeme und Masterquellen sind strukturiert.'],
      glossary: ['Glossar', 'Lokale Definitionen werden aus dem zentralen 2SG-Glossar übernommen.']
    },
    readingTitle: 'Leseregel für Kennzahlen',
    readingBody: 'Der Wert 0 wird nur angezeigt, wenn eine verfügbare Quelle tatsächlich Null liefert. Eine fehlende oder fehlerhafte Quelle bleibt als nicht verfügbar gekennzeichnet.',
    boundaryTitle: 'Abgrenzungen und nächste Anbindungen',
    boundaryItems: [
      'Nachweise, Versionen und Unterlagen bleiben im DMS gespeichert.',
      'Register für Kommunikation, Compliance und Prozesse bleiben schreibgeschützt, bis ihre Datenquellen angebunden sind.',
      'Künftige Kennzahlen müssen Definition, Quelle, Aktualisierungsdatum und Verantwortung anzeigen.'
    ]
  }
};

const HOVER_CARD_CLASSES = 'transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-950/20';

const MetricCard = ({ icon: Icon, label, value, detail, source, state, tone }) => (
  <article className={`rounded-lg border border-slate-700 bg-slate-800 p-4 ${HOVER_CARD_CLASSES}`}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
      </div>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
        <Icon size={21} aria-hidden="true" />
      </span>
    </div>
    {detail && <p className="mt-3 text-sm font-semibold text-slate-200">{detail}</p>}
    <p className="mt-4 text-xs font-semibold text-slate-300">{state}</p>
    <p className="mt-1 text-xs text-slate-500">{source}</p>
  </article>
);

const AdministrationDashboardOverview = ({ language = 'FR', tasksTotal = null, tasksStatus = 'loading', openTasks = null, completedTasks = null, onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const glossaryCount = getAdministrationGlossaryTerms(language).length;
  const tasksReady = tasksStatus === 'ready'
    && Number.isFinite(tasksTotal)
    && Number.isFinite(completedTasks);
  const taskState = tasksStatus === 'loading'
    ? t.loading
    : tasksReady
      ? (tasksTotal === 0 ? t.confirmedZero : t.available)
      : t.unavailable;
  const taskValue = tasksReady ? tasksTotal : '—';
  const openDetail = tasksReady && Number.isFinite(openTasks) ? `${t.metrics.open} : ${openTasks}` : null;
  const completedValue = tasksReady ? completedTasks : '—';
  const components = [
    { id: 'institution', icon: Building2, status: t.statuses.structured },
    { id: 'architecture', icon: Boxes, status: t.statuses.structured },
    { id: 'processes', icon: Network, status: t.statuses.framed },
    { id: 'compliance', icon: ShieldCheck, status: t.statuses.framed },
    { id: 'planning', icon: FolderKanban, status: tasksReady ? t.statuses.connected : t.unavailable },
    { id: 'communication', icon: Mail, status: t.statuses.framed },
    { id: 'glossary', icon: BookOpenText, status: `${glossaryCount} ${t.metrics.glossary.toLowerCase()}` }
  ];

  return (
    <section className="administration-overview space-y-6" aria-labelledby="administration-dashboard-title">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
        <h2 id="administration-dashboard-title" className="mt-2 text-2xl font-semibold text-slate-100">{t.title}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-300">{t.intro}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard icon={ClipboardList} label={t.metrics.tasks} value={taskValue} detail={openDetail} source={t.sources.tasks} state={taskState} tone="bg-blue-950 text-blue-300" />
        <MetricCard icon={CheckCircle2} label={t.metrics.completed} value={completedValue} source={t.sources.tasks} state={taskState} tone="bg-emerald-950 text-emerald-300" />
        <MetricCard icon={Network} label={t.metrics.components} value={components.length} source={t.sources.components} state={t.statuses.structured} tone="bg-cyan-950 text-cyan-300" />
        <MetricCard icon={BookOpenText} label={t.metrics.glossary} value={glossaryCount} source={t.sources.glossary} state={t.statuses.governed} tone="bg-violet-950 text-violet-300" />
        <MetricCard icon={ShieldCheck} label={t.metrics.compliance} value={1} source={t.sources.compliance} state={t.statuses.framed} tone="bg-amber-950 text-amber-300" />
      </div>

      <section className="rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="administration-coverage-title">
        <h3 id="administration-coverage-title" className="text-xl font-semibold text-slate-100">{t.coverageTitle}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.coverageBody}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-12">
          {components.map(({ id, icon: Icon, status }, index) => {
            const [title, body] = t.components[id];
            const wideSpan = index < 3 ? 'xl:col-span-4' : 'xl:col-span-3';
            return (
              <article key={id} className={`flex min-h-44 flex-col rounded-lg border border-slate-700 bg-slate-900/45 p-4 ${wideSpan} ${HOVER_CARD_CLASSES}`}>
                <div className="flex items-start justify-between gap-3">
                  <Icon size={21} className="text-blue-300" aria-hidden="true" />
                  <span className="rounded-full border border-slate-600 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-300">{status}</span>
                </div>
                <h4 className="mt-4 font-semibold text-slate-100">{title}</h4>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{body}</p>
                <button type="button" onClick={() => onNavigate?.(id)} className="mt-4 inline-flex min-h-10 items-center gap-2 self-start rounded-md border border-blue-700 bg-blue-950 px-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {t.open}<ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <aside className="rounded-lg border border-blue-800 bg-blue-950/25 p-5">
          <div className="flex items-start gap-3">
            <ClipboardList className="mt-0.5 shrink-0 text-blue-300" size={22} aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-slate-100">{t.readingTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{t.readingBody}</p>
            </div>
          </div>
        </aside>
        <aside className="rounded-lg border border-amber-800 bg-amber-950/20 p-5">
          <h3 className="font-semibold text-slate-100">{t.boundaryTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
            {t.boundaryItems.map(item => <li key={item} className="flex gap-2"><span className="text-amber-300">•</span><span>{item}</span></li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default AdministrationDashboardOverview;
