import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Factory,
  FileDown,
  FileText,
  FolderCog,
  Handshake,
  LayoutDashboard,
  LoaderCircle,
  Network,
  UsersRound,
  WalletCards,
  Warehouse
} from 'lucide-react';
import api from './api';

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
    intelligenceStatus: 'Édition disponible',
    intelligenceUnavailable: 'Aucune édition publiée',
    intelligenceLoading: 'Vérification de la dernière édition...',
    intelligenceError: 'La source Intelligence est momentanément indisponible.',
    intelligenceBody: 'La dernière livraison validée est conservée dans M3S et reste accessible uniquement après connexion.',
    intelligenceEdition: 'Édition',
    openHtml: 'Ouvrir le Dashboard',
    openPdf: 'Ouvrir le PDF',
    openReference: 'Ouvrir le référentiel',
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
    intelligenceStatus: 'Edition available',
    intelligenceUnavailable: 'No published edition',
    intelligenceLoading: 'Checking the latest edition...',
    intelligenceError: 'The Intelligence source is temporarily unavailable.',
    intelligenceBody: 'The latest validated delivery is retained in M3S and remains accessible only after sign-in.',
    intelligenceEdition: 'Edition',
    openHtml: 'Open Dashboard',
    openPdf: 'Open PDF',
    openReference: 'Open reference',
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
    intelligenceStatus: 'Ausgabe verfügbar',
    intelligenceUnavailable: 'Keine veröffentlichte Ausgabe',
    intelligenceLoading: 'Letzte Ausgabe wird geprüft...',
    intelligenceError: 'Die Intelligence-Quelle ist vorübergehend nicht verfügbar.',
    intelligenceBody: 'Die letzte validierte Lieferung wird in M3S aufbewahrt und ist nur nach der Anmeldung zugänglich.',
    intelligenceEdition: 'Ausgabe',
    openHtml: 'Dashboard öffnen',
    openPdf: 'PDF öffnen',
    openReference: 'Referenz öffnen',
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

export const resolveDashboardView = (search = '') => {
  const view = new URLSearchParams(search).get('view');
  return ['overview', 'intelligence', 'map'].includes(view) ? view : 'overview';
};

export const renderSandboxedHtmlArtifact = (target, url) => {
  if (!target?.document?.body) return false;
  target.opener = null;
  target.document.title = '2SG Intelligence Dashboard';
  Object.assign(target.document.body.style, { margin: '0', minHeight: '100vh', background: '#f8fafc' });
  const frame = target.document.createElement('iframe');
  frame.src = url;
  frame.title = '2SG Intelligence Dashboard';
  frame.referrerPolicy = 'no-referrer';
  frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-popups allow-downloads');
  frame.setAttribute('aria-label', '2SG Intelligence Dashboard');
  Object.assign(frame.style, { display: 'block', width: '100%', height: '100vh', border: '0' });
  target.document.body.replaceChildren(frame);
  return true;
};

const DashboardPilotageNavigation = ({ language = 'FR', onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(() => resolveDashboardView(location.search));
  const [intelligenceState, setIntelligenceState] = useState({ status: 'idle', data: null });
  const [artifactError, setArtifactError] = useState('');
  const intelligenceRequested = useRef(false);
  const t = translations[language] || translations.FR;

  useEffect(() => {
    setActiveView(resolveDashboardView(location.search));
  }, [location.search]);

  const selectView = (view) => {
    const nextView = resolveDashboardView(`?view=${view}`);
    const params = new URLSearchParams(location.search);
    params.set('view', nextView);
    setActiveView(nextView);
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  useEffect(() => {
    if (activeView !== 'intelligence' || intelligenceRequested.current) return undefined;
    intelligenceRequested.current = true;
    let current = true;
    let settled = false;
    setIntelligenceState({ status: 'loading', data: null });
    api.getLatestIntelligence()
      .then((payload) => {
        if (current) setIntelligenceState({ status: payload.data ? 'ready' : 'empty', data: payload.data || null });
      })
      .catch(() => {
        if (current) {
          intelligenceRequested.current = false;
          setIntelligenceState({ status: 'error', data: null });
        }
      })
      .finally(() => {
        settled = true;
      });
    return () => {
      current = false;
      if (!settled) intelligenceRequested.current = false;
    };
  }, [activeView]);

  const openArtifact = async (artifactType) => {
    setArtifactError('');
    const target = window.open('about:blank', '_blank');
    if (target) target.opener = null;
    try {
      const { blob } = await api.getLatestIntelligenceArtifact(artifactType);
      const url = URL.createObjectURL(blob);
      if (artifactType === 'html' && target) {
        renderSandboxedHtmlArtifact(target, url);
      } else if (target) {
        target.location.href = url;
      } else {
        const anchor = document.createElement('a');
        anchor.href = url;
        if (artifactType === 'html') anchor.download = '2SG_Intelligence_Dashboard_V4.html';
        else anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      if (target) target.close();
      setArtifactError(t.intelligenceError);
    }
  };

  const intelligenceReady = intelligenceState.status === 'ready';
  const intelligenceLabel = intelligenceState.status === 'loading'
    ? t.intelligenceLoading
    : intelligenceReady
      ? t.intelligenceStatus
      : intelligenceState.status === 'error'
        ? t.intelligenceError
        : t.intelligenceUnavailable;

  return (
    <section className="global-pilotage rounded-lg border border-slate-700 bg-slate-800 p-3 shadow-lg sm:p-5" aria-labelledby="global-pilotage-title">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p>
          <h2 id="global-pilotage-title" className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">{t.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.subtitle}</p>
        </div>
        <div className="grid w-full grid-cols-3 gap-1.5 sm:gap-2 xl:w-auto" role="tablist" aria-label={t.title}>
          {Object.entries(t.tabs).map(([id, label]) => {
            const Icon = tabIcons[id];
            const active = activeView === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectView(id)}
                className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs font-semibold leading-4 transition sm:gap-2 sm:px-3 sm:text-sm ${active ? 'border-blue-500 bg-blue-700 text-white' : 'border-slate-600 bg-slate-700 text-slate-200 hover:border-blue-400 hover:bg-slate-600'}`}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeView === 'overview' && (
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.management.map(([title, body], index) => (
            <article key={title} className="management-principle-card rounded-md border border-slate-700 bg-slate-900/35 p-4">
              <div className="management-principle-index mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-950 text-sm font-bold text-blue-300">{index + 1}</div>
              <h3 className="management-principle-title text-base font-semibold text-slate-100">{title}</h3>
              <p className="management-principle-body mt-1 text-sm leading-5 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      )}

      {activeView === 'intelligence' && (
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <article className="intelligence-card rounded-md border p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-3">
              <BookOpenText className="text-amber-300" size={22} aria-hidden="true" />
              <h3 className="text-lg font-semibold text-slate-100">{t.intelligenceTitle}</h3>
              <span className={`intelligence-status-badge rounded-full border px-2.5 py-1 text-xs font-semibold ${intelligenceReady ? 'intelligence-status-badge--ready border-emerald-700 text-emerald-200' : 'intelligence-status-badge--pending border-amber-700 text-amber-200'}`}>{intelligenceLabel}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.intelligenceBody}</p>
            {intelligenceReady && (
              <p className="intelligence-edition-meta mt-2 text-sm font-semibold text-emerald-200">
                {t.intelligenceEdition} : {intelligenceState.data.editionDate} · {intelligenceState.data.sourceVersion}
              </p>
            )}
            {intelligenceState.status === 'loading' && <LoaderCircle className="mt-3 animate-spin text-blue-300" size={20} aria-hidden="true" />}
            {artifactError && <p role="alert" className="mt-3 text-sm text-rose-300">{artifactError}</p>}
            {intelligenceReady && (
              <div className="intelligence-actions mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => openArtifact('html')} className="intelligence-action intelligence-action--success inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-600">
                  <BookOpenText size={16} aria-hidden="true" />{t.openHtml}
                </button>
                <button type="button" onClick={() => openArtifact('pdf')} className="intelligence-action inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-center text-sm font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-600">
                  <FileDown size={16} aria-hidden="true" />{t.openPdf}
                </button>
                <button type="button" onClick={() => openArtifact('reference')} className="intelligence-action inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-center text-sm font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-600">
                  <FileText size={16} aria-hidden="true" />{t.openReference}
                </button>
                <button type="button" onClick={() => onNavigate('/ged?tab=knowledge')} className="intelligence-action intelligence-action--primary inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-600">
                  {t.knowledgeAction}<ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
            {!intelligenceReady && (
              <button type="button" onClick={() => onNavigate('/ged?tab=knowledge')} className="intelligence-action intelligence-action--primary mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
                {t.knowledgeAction}<ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
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
