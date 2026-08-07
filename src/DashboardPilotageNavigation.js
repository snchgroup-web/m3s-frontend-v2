import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Factory,
  FolderCog,
  Handshake,
  LayoutDashboard,
  Network,
  UsersRound,
  WalletCards,
  Warehouse
} from 'lucide-react';

const translations = {
  FR: {
    eyebrow: 'PILOTAGE GLOBAL 2SG / M3S',
    title: 'Décider avec une vue d’ensemble fiable',
    subtitle: 'Le tableau de bord global relie la situation opérationnelle, l’intelligence stratégique et les fonctions métier sans remplacer leurs tableaux de bord locaux.',
    tabs: { overview: 'Pilotage', intelligence: 'Intelligence 2SG', map: 'Carte des fonctions' },
    management: [
      ['Piloter', 'Fixer les objectifs et contrôler les résultats.'],
      ['Organiser', 'Répartir et coordonner le travail.'],
      ['Animer', 'Mobiliser les personnes et faire circuler l’information.'],
      ['Diriger', 'Prendre les décisions nécessaires à la réalisation des objectifs.']
    ],
    intelligenceTitle: '2SG Intelligence Dashboard',
    intelligenceStatus: 'Raccordement applicatif à finaliser',
    intelligenceBody: 'La livraison quotidienne reste actuellement externe au frontend M3S. Aucun contenu ancien ou simulé n’est repris ici.',
    intelligenceAreas: ['Mémoire stratégique', 'État du système', 'Radar & veille', 'Opportunités', 'Agenda', 'Journal de bord', 'Recommandations'],
    knowledgeAction: 'Ouvrir Veille & KM',
    mapTitle: 'Fonctions reliées au pilotage global',
    mapBody: 'Chaque accès ouvre la fonction concernée. Son tableau de bord local conserve le pilotage métier détaillé.',
    open: 'Ouvrir',
    functions: ['Administration', 'Finances', 'Ressources humaines', 'Commercial & CRM', 'Production', 'Stock & Actifs', 'IT & Support']
  },
  EN: {
    eyebrow: '2SG / M3S GLOBAL STEERING',
    title: 'Decide from a reliable overall view',
    subtitle: 'The global dashboard connects operational status, strategic intelligence and business functions without replacing their local dashboards.',
    tabs: { overview: 'Steering', intelligence: '2SG Intelligence', map: 'Function map' },
    management: [
      ['Steer', 'Set objectives and monitor results.'],
      ['Organise', 'Allocate and coordinate work.'],
      ['Mobilise', 'Engage people and circulate information.'],
      ['Direct', 'Make the decisions required to achieve objectives.']
    ],
    intelligenceTitle: '2SG Intelligence Dashboard',
    intelligenceStatus: 'Application connection to be completed',
    intelligenceBody: 'The daily delivery currently remains external to the M3S frontend. No outdated or simulated content is reproduced here.',
    intelligenceAreas: ['Strategic memory', 'System status', 'Radar & monitoring', 'Opportunities', 'Agenda', 'Logbook', 'Recommendations'],
    knowledgeAction: 'Open Monitoring & KM',
    mapTitle: 'Functions connected to global steering',
    mapBody: 'Each access opens the relevant function. Its local dashboard retains detailed business steering.',
    open: 'Open',
    functions: ['Administration', 'Finance', 'Human resources', 'Commercial & CRM', 'Production', 'Stock & Assets', 'IT & Support']
  },
  DE: {
    eyebrow: 'GLOBALE 2SG-/M3S-STEUERUNG',
    title: 'Mit einer verlässlichen Gesamtübersicht entscheiden',
    subtitle: 'Das globale Dashboard verbindet operative Lage, strategische Intelligenz und Unternehmensfunktionen, ohne deren lokale Dashboards zu ersetzen.',
    tabs: { overview: 'Steuerung', intelligence: '2SG Intelligence', map: 'Funktionskarte' },
    management: [
      ['Steuern', 'Ziele festlegen und Ergebnisse kontrollieren.'],
      ['Organisieren', 'Arbeit verteilen und koordinieren.'],
      ['Mobilisieren', 'Menschen einbinden und Informationen weitergeben.'],
      ['Leiten', 'Die für die Zielerreichung nötigen Entscheidungen treffen.']
    ],
    intelligenceTitle: '2SG Intelligence Dashboard',
    intelligenceStatus: 'Anwendungsanbindung noch abzuschließen',
    intelligenceBody: 'Die tägliche Lieferung bleibt derzeit außerhalb des M3S-Frontends. Hier werden keine veralteten oder simulierten Inhalte übernommen.',
    intelligenceAreas: ['Strategisches Gedächtnis', 'Systemstatus', 'Radar & Monitoring', 'Chancen', 'Agenda', 'Arbeitsjournal', 'Empfehlungen'],
    knowledgeAction: 'Monitoring & KM öffnen',
    mapTitle: 'Mit der globalen Steuerung verbundene Funktionen',
    mapBody: 'Jeder Zugang öffnet die betreffende Funktion. Das lokale Dashboard behält die detaillierte Fachsteuerung.',
    open: 'Öffnen',
    functions: ['Verwaltung', 'Finanzen', 'Personalwesen', 'Vertrieb & CRM', 'Produktion', 'Bestand & Vermögenswerte', 'IT & Support']
  }
};

const functionDefinitions = [
  { path: '/administration', icon: Building2, color: 'text-cyan-300', background: 'bg-cyan-950/40' },
  { path: '/finance', icon: WalletCards, color: 'text-emerald-300', background: 'bg-emerald-950/40' },
  { path: '/rh', icon: UsersRound, color: 'text-violet-300', background: 'bg-violet-950/40' },
  { path: '/crm', icon: Handshake, color: 'text-sky-300', background: 'bg-sky-950/40' },
  { path: '/production', icon: Factory, color: 'text-orange-300', background: 'bg-orange-950/40' },
  { path: '/actifs', icon: Warehouse, color: 'text-rose-300', background: 'bg-rose-950/40' },
  { path: '/ged', icon: FolderCog, color: 'text-teal-300', background: 'bg-teal-950/40' }
];

const tabIcons = { overview: LayoutDashboard, intelligence: BrainCircuit, map: Network };

const DashboardPilotageNavigation = ({ language = 'FR', onNavigate }) => {
  const [activeView, setActiveView] = useState('overview');
  const t = translations[language] || translations.FR;

  return (
    <section className="global-pilotage rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-lg sm:p-5" aria-labelledby="global-pilotage-title">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p>
          <h2 id="global-pilotage-title" className="mt-1 text-2xl font-semibold text-slate-100">{t.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.subtitle}</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 xl:w-auto" role="tablist" aria-label={t.title}>
          {Object.entries(t.tabs).map(([id, label]) => {
            const Icon = tabIcons[id];
            const active = activeView === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveView(id)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${active ? 'border-blue-500 bg-blue-700 text-white' : 'border-slate-600 bg-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-600'}`}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {activeView === 'overview' && (
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.management.map(([title, body], index) => (
            <article key={title} className="rounded-md border border-slate-700 bg-slate-900/35 p-4">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-950 text-sm font-bold text-blue-300">{index + 1}</div>
              <h3 className="text-base font-semibold text-slate-100">{title}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      )}

      {activeView === 'intelligence' && (
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <article className="rounded-md border border-amber-700 bg-amber-950/30 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <BookOpenText className="text-amber-300" size={22} aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-100">{t.intelligenceTitle}</h3>
              <span className="rounded-full border border-amber-700 px-2.5 py-1 text-xs font-semibold text-amber-200">{t.intelligenceStatus}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.intelligenceBody}</p>
            <button type="button" onClick={() => onNavigate('/ged?tab=knowledge')} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
              {t.knowledgeAction}<ArrowRight size={16} aria-hidden="true" />
            </button>
          </article>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {t.intelligenceAreas.map((area) => (
              <div key={area} className="flex min-h-11 items-center gap-2 rounded-md border border-slate-700 bg-slate-900/35 px-3 py-2 text-sm text-slate-200">
                <BriefcaseBusiness className="shrink-0 text-blue-300" size={16} aria-hidden="true" />
                {area}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'map' && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold text-slate-100">{t.mapTitle}</h3>
          <p className="mt-1 text-sm text-slate-400">{t.mapBody}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {functionDefinitions.map(({ path, icon: Icon, color, background }, index) => (
              <button key={path} type="button" onClick={() => onNavigate(path)} aria-label={`${t.open} : ${t.functions[index]}`} className="group flex min-h-20 items-center justify-between rounded-md border border-slate-700 bg-slate-900/35 p-4 text-left hover:border-blue-400 hover:bg-slate-700">
                <span className="flex items-center gap-3">
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${background} ${color}`}><Icon size={21} aria-hidden="true" /></span>
                  <span className="text-sm font-semibold text-slate-100">{t.functions[index]}</span>
                </span>
                <ArrowRight className="text-slate-500 group-hover:text-blue-300" size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPilotageNavigation;
