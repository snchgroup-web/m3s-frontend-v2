import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
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
    tabs: { overview: 'Pilotage', intelligence: 'Daily Intelligence', map: 'Carte des fonctions' },
    management: [
      ['Piloter', 'Fixer les objectifs et contrôler les résultats.'],
      ['Organiser', 'Répartir et coordonner le travail.'],
      ['Animer', 'Mobiliser les personnes et faire circuler l’information.'],
      ['Diriger', 'Prendre les décisions nécessaires à la réalisation des objectifs.']
    ],
    intelligenceTitle: '2SG Daily Intelligence Dashboard',
    intelligenceStatus: 'Édition disponible',
    intelligenceUnavailable: 'Aucune édition publiée',
    intelligenceLoading: 'Vérification de la dernière édition...',
    intelligenceError: 'La source Intelligence est momentanément indisponible.',
    intelligenceBody: 'La dernière livraison validée est conservée dans M3S et reste accessible uniquement après connexion.',
    intelligenceEdition: 'Édition',
    openHtml: 'Ouvrir le Daily Intelligence',
    openPdf: 'Ouvrir le PDF',
    openReference: 'Ouvrir le référentiel',
    intelligenceAreas: ['Mémoire stratégique', 'État du système', 'Radar & veille', 'Opportunités', 'Agenda', 'Journal de bord', 'Recommandations'],
    knowledgeAction: 'Ouvrir Veille & KM',
    returnToIntelligence: 'Revenir au Daily Intelligence',
    referenceTitle: 'Référentiel du 2SG Daily Intelligence Dashboard',
    mapTitle: 'Carte mentale globale des fonctions',
    mapBody: 'La carte relie 2SG/M3S à ses familles et fonctions. Sélectionnez une fonction pour afficher sa carte locale dans cette même vue.',
    managementFamily: ['Management & Gouvernance', 'Le Tableau de bord global constitue la couche de pilotage transversal de 2SG/M3S.'],
    functionGroups: {
      support: ['Fonctions support', 'Organiser, sécuriser et mettre les ressources à disposition.'],
      operations: ['Opérations & Développement', 'Développer les relations, produire et gérer les actifs.']
    },
    globalHub: '2SG / M3S',
    globalMap: 'Carte globale',
    localMap: 'Carte locale',
    localMapBody: 'Cette carte locale synthétise les composantes actuellement structurées de la fonction, sans quitter le pilotage global.',
    showLocalMap: 'Afficher la carte locale',
    backToGlobalMap: 'Revenir à la carte globale',
    functions: {
      administration: 'Administration', finance: 'Finances', rh: 'Ressources humaines',
      crm: 'Commercial & CRM', production: 'Production', assets: 'Stock & Actifs', it: 'IT & Support'
    },
    localNodes: {
      administration: ['Vue d’ensemble', 'Institution', 'Architecture & Relations', 'Processus & Procédures', 'Conformité', 'Planification & Projets', 'Communication & Courrier', 'Ressources', 'Assistant administratif', 'Glossaire'],
      finance: ['Vue d’ensemble', 'Architecture & relations', 'Processus & contrôles', 'Recettes', 'Dépenses', 'Social', 'Financement immobilier', 'Historique FX', 'Glossaire'],
      rh: ['Vue d’ensemble', 'Répertoire', 'Employés', 'Bénévoles', 'Glossaire'],
      it: ['Vue d’ensemble', 'Documents', 'Dossiers', 'Archives', 'Outils documents', 'Veille & KM', 'IA & Digital', 'Aide & Support', 'Glossaire'],
      crm: ['Vue d’ensemble', 'Prospects', 'Clients', 'Ventes', 'Dons', 'Bénéficiaires', 'Glossaire'],
      production: ['Vue d’ensemble', 'Commandes', 'Fournisseurs', 'Stocks', 'Glossaire'],
      assets: ['Vue d’ensemble', 'Inventaire', 'Immobilisations', 'Risques', 'Glossaire']
    }
  },
  EN: {
    eyebrow: '2SG / M3S GLOBAL STEERING',
    title: 'Decide from a reliable overall view',
    subtitle: 'The global dashboard connects operational status, strategic intelligence and business functions without replacing their local dashboards.',
    tabs: { overview: 'Steering', intelligence: 'Daily Intelligence', map: 'Function map' },
    management: [
      ['Steer', 'Set objectives and monitor results.'],
      ['Organise', 'Allocate and coordinate work.'],
      ['Mobilise', 'Engage people and circulate information.'],
      ['Direct', 'Make the decisions required to achieve objectives.']
    ],
    intelligenceTitle: '2SG Daily Intelligence Dashboard',
    intelligenceStatus: 'Edition available',
    intelligenceUnavailable: 'No published edition',
    intelligenceLoading: 'Checking the latest edition...',
    intelligenceError: 'The Intelligence source is temporarily unavailable.',
    intelligenceBody: 'The latest validated delivery is retained in M3S and remains accessible only after sign-in.',
    intelligenceEdition: 'Edition',
    openHtml: 'Open Daily Intelligence',
    openPdf: 'Open PDF',
    openReference: 'Open reference',
    intelligenceAreas: ['Strategic memory', 'System status', 'Radar & monitoring', 'Opportunities', 'Agenda', 'Logbook', 'Recommendations'],
    knowledgeAction: 'Open Monitoring & KM',
    returnToIntelligence: 'Return to Daily Intelligence',
    referenceTitle: '2SG Daily Intelligence Dashboard reference',
    mapTitle: 'Global function mind map',
    mapBody: 'The map connects 2SG/M3S to its families and functions. Select a function to display its local map in this same view.',
    managementFamily: ['Management & Governance', 'The global Dashboard forms the cross-functional steering layer of 2SG/M3S.'],
    functionGroups: {
      support: ['Support functions', 'Organise, secure and make resources available.'],
      operations: ['Operations & Development', 'Develop relationships, deliver work and manage assets.']
    },
    globalHub: '2SG / M3S',
    globalMap: 'Global map',
    localMap: 'Local map',
    localMapBody: 'This local map summarises the function components currently structured without leaving global steering.',
    showLocalMap: 'Show local map',
    backToGlobalMap: 'Return to global map',
    functions: {
      administration: 'Administration', finance: 'Finance', rh: 'Human resources',
      crm: 'Commercial & CRM', production: 'Production', assets: 'Stock & Assets', it: 'IT & Support'
    },
    localNodes: {
      administration: ['Overview', 'Institution', 'Architecture & Relationships', 'Processes & Procedures', 'Compliance', 'Planning & Projects', 'Communication & Correspondence', 'Resources', 'Administrative assistant', 'Glossary'],
      finance: ['Overview', 'Architecture & relationships', 'Processes & controls', 'Income', 'Expenses', 'Social', 'Real estate finance', 'FX history', 'Glossary'],
      rh: ['Overview', 'Directory', 'Employees', 'Volunteers', 'Glossary'],
      it: ['Overview', 'Documents', 'Folders', 'Archives', 'Document tools', 'Monitoring & KM', 'AI & Digital', 'Help & Support', 'Glossary'],
      crm: ['Overview', 'Prospects', 'Clients', 'Sales', 'Donations', 'Beneficiaries', 'Glossary'],
      production: ['Overview', 'Orders', 'Suppliers', 'Stock', 'Glossary'],
      assets: ['Overview', 'Inventory', 'Fixed assets', 'Risks', 'Glossary']
    }
  },
  DE: {
    eyebrow: 'GLOBALE 2SG-/M3S-STEUERUNG',
    title: 'Mit einer verlässlichen Gesamtübersicht entscheiden',
    subtitle: 'Das globale Dashboard verbindet operative Lage, strategische Intelligenz und Unternehmensfunktionen, ohne deren lokale Dashboards zu ersetzen.',
    tabs: { overview: 'Steuerung', intelligence: 'Daily Intelligence', map: 'Funktionskarte' },
    management: [
      ['Steuern', 'Ziele festlegen und Ergebnisse kontrollieren.'],
      ['Organisieren', 'Arbeit verteilen und koordinieren.'],
      ['Mobilisieren', 'Menschen einbinden und Informationen weitergeben.'],
      ['Leiten', 'Die für die Zielerreichung nötigen Entscheidungen treffen.']
    ],
    intelligenceTitle: '2SG Daily Intelligence Dashboard',
    intelligenceStatus: 'Ausgabe verfügbar',
    intelligenceUnavailable: 'Keine veröffentlichte Ausgabe',
    intelligenceLoading: 'Letzte Ausgabe wird geprüft...',
    intelligenceError: 'Die Intelligence-Quelle ist vorübergehend nicht verfügbar.',
    intelligenceBody: 'Die letzte validierte Lieferung wird in M3S aufbewahrt und ist nur nach der Anmeldung zugänglich.',
    intelligenceEdition: 'Ausgabe',
    openHtml: 'Daily Intelligence öffnen',
    openPdf: 'PDF öffnen',
    openReference: 'Referenz öffnen',
    intelligenceAreas: ['Strategisches Gedächtnis', 'Systemstatus', 'Radar & Monitoring', 'Chancen', 'Agenda', 'Arbeitsjournal', 'Empfehlungen'],
    knowledgeAction: 'Monitoring & KM öffnen',
    returnToIntelligence: 'Zur Daily Intelligence zurückkehren',
    referenceTitle: 'Referenz des 2SG Daily Intelligence Dashboard',
    mapTitle: 'Globale Mindmap der Funktionen',
    mapBody: 'Die Karte verbindet 2SG/M3S mit seinen Bereichen und Funktionen. Wählen Sie eine Funktion, um ihre lokale Karte in derselben Ansicht anzuzeigen.',
    managementFamily: ['Management & Governance', 'Das globale Dashboard bildet die funktionsübergreifende Steuerungsebene von 2SG/M3S.'],
    functionGroups: {
      support: ['Unterstützungsfunktionen', 'Ressourcen organisieren, absichern und bereitstellen.'],
      operations: ['Betrieb & Entwicklung', 'Beziehungen entwickeln, Leistungen erbringen und Vermögenswerte verwalten.']
    },
    globalHub: '2SG / M3S',
    globalMap: 'Globale Karte',
    localMap: 'Lokale Karte',
    localMapBody: 'Diese lokale Karte fasst die derzeit strukturierten Bestandteile der Funktion zusammen, ohne die globale Steuerung zu verlassen.',
    showLocalMap: 'Lokale Karte anzeigen',
    backToGlobalMap: 'Zur globalen Karte zurückkehren',
    functions: {
      administration: 'Verwaltung', finance: 'Finanzen', rh: 'Personalwesen',
      crm: 'Vertrieb & CRM', production: 'Produktion', assets: 'Bestand & Vermögenswerte', it: 'IT & Support'
    },
    localNodes: {
      administration: ['Übersicht', 'Institution', 'Architektur & Beziehungen', 'Prozesse & Verfahren', 'Compliance', 'Planung & Projekte', 'Kommunikation & Korrespondenz', 'Ressourcen', 'Verwaltungsassistent', 'Glossar'],
      finance: ['Übersicht', 'Architektur & Beziehungen', 'Prozesse & Kontrollen', 'Einnahmen', 'Ausgaben', 'Soziales', 'Immobilienfinanzierung', 'FX-Verlauf', 'Glossar'],
      rh: ['Übersicht', 'Verzeichnis', 'Mitarbeitende', 'Freiwillige', 'Glossar'],
      it: ['Übersicht', 'Dokumente', 'Ordner', 'Archive', 'Dokumentwerkzeuge', 'Monitoring & KM', 'KI & Digital', 'Hilfe & Support', 'Glossar'],
      crm: ['Übersicht', 'Interessenten', 'Kunden', 'Verkäufe', 'Spenden', 'Begünstigte', 'Glossar'],
      production: ['Übersicht', 'Bestellungen', 'Lieferanten', 'Lagerbestand', 'Glossar'],
      assets: ['Übersicht', 'Bestand', 'Anlagevermögen', 'Risiken', 'Glossar']
    }
  }
};

const functionDefinitions = [
  { id: 'administration', group: 'support', path: '/administration', icon: Building2, color: 'text-cyan-300', background: 'bg-cyan-950/40' },
  { id: 'finance', group: 'support', path: '/finance', icon: WalletCards, color: 'text-emerald-300', background: 'bg-emerald-950/40' },
  { id: 'rh', group: 'support', path: '/rh', icon: UsersRound, color: 'text-violet-300', background: 'bg-violet-950/40' },
  { id: 'it', group: 'support', path: '/ged', icon: FolderCog, color: 'text-teal-300', background: 'bg-teal-950/40' },
  { id: 'crm', group: 'operations', path: '/crm', icon: Handshake, color: 'text-sky-300', background: 'bg-sky-950/40' },
  { id: 'production', group: 'operations', path: '/production', icon: Factory, color: 'text-orange-300', background: 'bg-orange-950/40' },
  { id: 'assets', group: 'operations', path: '/actifs', icon: Warehouse, color: 'text-rose-300', background: 'bg-rose-950/40' }
];

const tabIcons = { overview: LayoutDashboard, intelligence: BrainCircuit, map: Network };

export const resolveDashboardView = (search = '') => {
  const view = new URLSearchParams(search).get('view');
  return ['overview', 'intelligence', 'map'].includes(view) ? view : 'overview';
};

export const resolveFunctionMapSelection = (search = '') => {
  const functionId = new URLSearchParams(search).get('function');
  return functionDefinitions.some(({ id }) => id === functionId) ? functionId : '';
};

const appendInlineReferenceText = (documentRef, node, value) => {
  String(value || '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).forEach((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const strong = documentRef.createElement('strong');
      strong.textContent = part.slice(2, -2);
      node.appendChild(strong);
      return;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = documentRef.createElement('code');
      code.textContent = part.slice(1, -1);
      Object.assign(code.style, { background: '#e2e8f0', borderRadius: '4px', padding: '2px 5px' });
      node.appendChild(code);
      return;
    }
    node.appendChild(documentRef.createTextNode(part));
  });
};

const createArtifactShell = (target, { title, returnUrl, returnLabel }) => {
  if (!target?.document?.body) return null;
  const documentRef = target.document;
  target.opener = null;
  documentRef.title = title;
  Object.assign(documentRef.body.style, {
    margin: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f8fafc',
    color: '#172033',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  });

  const toolbar = documentRef.createElement('header');
  Object.assign(toolbar.style, {
    position: 'sticky',
    top: '0',
    zIndex: '2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    minHeight: '58px',
    padding: '10px 16px',
    boxSizing: 'border-box',
    background: '#0f2d5c',
    color: '#f8fafc',
    boxShadow: '0 2px 8px rgba(15, 23, 42, .18)'
  });
  const heading = documentRef.createElement('strong');
  heading.textContent = title;
  Object.assign(heading.style, { fontSize: '15px', fontWeight: '600', lineHeight: '1.35' });
  const returnLink = documentRef.createElement('a');
  returnLink.href = returnUrl;
  returnLink.textContent = returnLabel;
  Object.assign(returnLink.style, {
    flexShrink: '0',
    border: '1px solid #93c5fd',
    borderRadius: '6px',
    padding: '9px 12px',
    color: '#ffffff',
    background: '#1d4ed8',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none'
  });
  toolbar.append(heading, returnLink);

  const content = documentRef.createElement('main');
  Object.assign(content.style, { flex: '1', minHeight: '0' });
  documentRef.body.replaceChildren(toolbar, content);
  return content;
};

export const renderSandboxedHtmlArtifact = (target, url, options = {}) => {
  if (!target?.document?.body) return false;
  const content = createArtifactShell(target, {
    title: options.title || '2SG Daily Intelligence Dashboard',
    returnUrl: options.returnUrl || '/',
    returnLabel: options.returnLabel || 'Retour'
  });
  const frame = target.document.createElement('iframe');
  frame.src = url;
  frame.title = options.title || '2SG Daily Intelligence Dashboard';
  frame.referrerPolicy = 'no-referrer';
  frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals allow-popups allow-downloads');
  frame.setAttribute('aria-label', options.title || '2SG Daily Intelligence Dashboard');
  Object.assign(frame.style, { display: 'block', width: '100%', height: '100%', minHeight: 'calc(100vh - 58px)', border: '0' });
  content.appendChild(frame);
  return true;
};

export const renderReferenceArtifact = (target, markdown, options = {}) => {
  if (!target?.document?.body) return false;
  const documentRef = target.document;
  const title = options.title || '2SG Daily Intelligence Dashboard reference';
  const content = createArtifactShell(target, {
    title,
    returnUrl: options.returnUrl || '/',
    returnLabel: options.returnLabel || 'Back'
  });
  Object.assign(content.style, { overflow: 'auto', padding: '20px 16px 48px' });

  const article = documentRef.createElement('article');
  Object.assign(article.style, {
    maxWidth: '980px',
    margin: '0 auto',
    padding: 'clamp(18px, 4vw, 42px)',
    boxSizing: 'border-box',
    border: '1px solid #d7e0eb',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 8px 26px rgba(30, 41, 59, .08)',
    lineHeight: '1.65'
  });

  let currentList = null;
  let currentListType = '';
  const closeList = () => {
    currentList = null;
    currentListType = '';
  };
  String(markdown || '').replace(/^\uFEFF/, '').split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      return;
    }
    if (/^---+$/.test(line)) {
      closeList();
      const rule = documentRef.createElement('hr');
      Object.assign(rule.style, { border: '0', borderTop: '1px solid #d7e0eb', margin: '24px 0' });
      article.appendChild(rule);
      return;
    }
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = Math.min(headingMatch[1].length + 1, 6);
      const headingNode = documentRef.createElement(`h${level}`);
      appendInlineReferenceText(documentRef, headingNode, headingMatch[2]);
      Object.assign(headingNode.style, {
        margin: level <= 2 ? '28px 0 12px' : '22px 0 8px',
        color: '#0f2d5c',
        fontSize: level <= 2 ? 'clamp(22px, 4vw, 30px)' : level === 3 ? '20px' : '17px',
        fontWeight: '600',
        lineHeight: '1.3'
      });
      article.appendChild(headingNode);
      return;
    }
    const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const listType = /\d/.test(listMatch[1]) ? 'ol' : 'ul';
      if (!currentList || currentListType !== listType) {
        currentList = documentRef.createElement(listType);
        currentListType = listType;
        Object.assign(currentList.style, { margin: '10px 0 16px', paddingLeft: '28px' });
        article.appendChild(currentList);
      }
      const item = documentRef.createElement('li');
      appendInlineReferenceText(documentRef, item, listMatch[2]);
      Object.assign(item.style, { margin: '5px 0' });
      currentList.appendChild(item);
      return;
    }
    closeList();
    const paragraph = documentRef.createElement(line.startsWith('>') ? 'blockquote' : 'p');
    appendInlineReferenceText(documentRef, paragraph, line.replace(/^>\s?/, ''));
    Object.assign(paragraph.style, line.startsWith('>')
      ? { margin: '12px 0', padding: '10px 16px', borderLeft: '3px solid #2563eb', background: '#eff6ff' }
      : { margin: '8px 0' });
    article.appendChild(paragraph);
  });
  content.appendChild(article);
  return true;
};

const DashboardPilotageNavigation = ({ language = 'FR', onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(() => resolveDashboardView(location.search));
  const selectedFunction = resolveFunctionMapSelection(location.search);
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
    if (nextView !== 'map') params.delete('function');
    setActiveView(nextView);
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  const selectFunction = (functionId = '') => {
    const params = new URLSearchParams(location.search);
    params.set('view', 'map');
    if (functionDefinitions.some(({ id }) => id === functionId)) params.set('function', functionId);
    else params.delete('function');
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
      const artifactOptions = {
        title: artifactType === 'reference' ? t.referenceTitle : t.intelligenceTitle,
        returnUrl: `${window.location.origin}/?view=intelligence`,
        returnLabel: t.returnToIntelligence
      };
      if (artifactType === 'html' && target) {
        renderSandboxedHtmlArtifact(target, url, artifactOptions);
      } else if (artifactType === 'reference' && target) {
        renderReferenceArtifact(target, await blob.text(), artifactOptions);
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
          <p className="text-xs font-semibold uppercase text-blue-300">{t.eyebrow}</p>
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
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {t.management.map(([title, body], index) => (
            <article
              key={title}
              tabIndex={0}
              className="management-principle-card rounded-md border border-slate-700 bg-slate-900/35 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            >
              <div className="flex items-center gap-2.5">
                <div className="management-principle-index inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-950 text-sm font-bold text-blue-300">{index + 1}</div>
                <h3 className="management-principle-title text-base font-semibold text-slate-100">{title}</h3>
              </div>
              <p className="management-principle-body mt-2 text-sm leading-5 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      )}

      {activeView === 'intelligence' && (
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <article className="intelligence-card rounded-md border p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-3">
              <BookOpenText className="text-blue-300" size={22} aria-hidden="true" />
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
                <button type="button" onClick={() => onNavigate('/ged?tab=knowledge&returnTo=dashboard-daily-intelligence')} className="intelligence-action intelligence-action--primary inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-600">
                  {t.knowledgeAction}<ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
            {!intelligenceReady && (
              <button type="button" onClick={() => onNavigate('/ged?tab=knowledge&returnTo=dashboard-daily-intelligence')} className="intelligence-action intelligence-action--primary mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-blue-300">{selectedFunction ? t.localMap : t.globalMap}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-100">{selectedFunction ? t.functions[selectedFunction] : t.mapTitle}</h3>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-400">{selectedFunction ? t.localMapBody : t.mapBody}</p>
            </div>
            {selectedFunction && (
              <button type="button" onClick={() => selectFunction()} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-600">
                <ArrowLeft size={17} aria-hidden="true" />{t.backToGlobalMap}
              </button>
            )}
          </div>

          {!selectedFunction && (
            <div className="function-map-canvas mt-5" aria-label={t.mapTitle}>
              <div className="function-map-hub mx-auto flex max-w-sm items-center justify-center rounded-md px-4 py-3 text-center">
                <Network className="mr-2 text-blue-300" size={21} aria-hidden="true" />
                <span className="text-base font-semibold text-slate-100">{t.globalHub}</span>
              </div>
              <div className="function-map-connector mx-auto h-6 w-px" aria-hidden="true" />
              <section className="function-map-management mx-auto max-w-4xl rounded-md p-3 sm:p-4" aria-labelledby="management-family-title">
                <div className="flex items-start gap-3">
                  <span className="function-map-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-blue-300"><LayoutDashboard size={21} aria-hidden="true" /></span>
                  <div>
                    <h4 id="management-family-title" className="text-sm font-semibold uppercase text-blue-300">{t.managementFamily[0]}</h4>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{t.managementFamily[1]}</p>
                  </div>
                </div>
              </section>
              <div className="function-map-connector mx-auto h-6 w-px" aria-hidden="true" />
              <div className="function-map-family-grid grid grid-cols-1 gap-5 xl:grid-cols-2">
                {Object.entries(t.functionGroups).map(([groupId, [groupTitle, groupBody]]) => {
                  const GroupIcon = groupId === 'support' ? FolderCog : Factory;
                  return (
                  <section key={groupId} className={`function-map-family function-map-family--${groupId} rounded-md p-3 sm:p-4`} aria-labelledby={`function-family-${groupId}`}>
                    <div className="function-map-family-header flex items-start gap-3 pb-3">
                      <span className="function-map-icon inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-blue-300"><GroupIcon size={19} aria-hidden="true" /></span>
                      <div>
                        <h4 id={`function-family-${groupId}`} className="text-sm font-semibold uppercase text-blue-300">{groupTitle}</h4>
                        <p className="mt-1 text-sm leading-5 text-slate-400">{groupBody}</p>
                      </div>
                    </div>
                    <div className={`grid grid-cols-1 gap-2 ${groupId === 'support' ? 'sm:grid-cols-2' : ''}`}>
                      {functionDefinitions.filter(({ group }) => group === groupId).map(({ id, icon: Icon, color, background }) => (
                        <button key={id} type="button" onClick={() => selectFunction(id)} aria-label={`${t.showLocalMap} : ${t.functions[id]}`} className="function-map-node group flex min-h-14 items-center justify-between rounded-md p-3 text-left transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/70">
                          <span className="flex min-w-0 items-center gap-3">
                            <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${background} ${color}`}><Icon size={20} aria-hidden="true" /></span>
                            <span className="text-sm font-semibold text-slate-100">{t.functions[id]}</span>
                          </span>
                          <Network className="ml-2 shrink-0 text-slate-500 group-hover:text-blue-300" size={17} aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </section>
                );})}
              </div>
            </div>
          )}

          {selectedFunction && (
            <section className="mt-5" aria-labelledby="local-function-map-title">
              <div className="mx-auto flex max-w-sm items-center justify-center rounded-md border border-blue-500 bg-blue-950/55 px-4 py-3 text-center shadow-lg shadow-blue-950/20">
                <span id="local-function-map-title" className="text-base font-semibold text-slate-100">{t.functions[selectedFunction]}</span>
              </div>
              <div className="mx-auto h-6 w-px bg-blue-500/70" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {t.localNodes[selectedFunction].map((node, index) => (
                  <div key={node} className="flex min-h-12 items-center gap-3 rounded-md border border-slate-700 bg-slate-900/35 px-3 py-2 text-sm font-medium text-slate-200">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-950 text-xs font-semibold text-blue-300">{index + 1}</span>
                    <span>{node}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default DashboardPilotageNavigation;
