import React, { useEffect } from 'react';
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  CheckCircle2,
  Database,
  FileSearch,
  FolderCog,
  History,
  Network,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import DashboardIncidentRiskOverview from './DashboardIncidentRiskOverview';
import { getDashboardKpiDefinitions } from './dashboardKpiDictionary';

const copy = {
  FR: {
    architecture: {
      eyebrow: 'STRUCTURE TRANSVERSALE',
      title: 'Architecture & Relations',
      body: 'Cette vue décrit les couches du pilotage global et leurs échanges. Elle complète la carte mentale des fonctions sans la remplacer.',
      cards: [
        ['Pilotage global', 'Oriente les priorités, consolide les indicateurs et rend visibles les arbitrages.', 'Tableau de bord'],
        ['Fonctions métier', 'Exécutent et contrôlent le travail dans leurs périmètres et tableaux de bord locaux.', 'Fonctions M3S'],
        ['Services & données', 'Fournissent les données autorisées par API, avec état de disponibilité et fraîcheur.', 'Sources connectées'],
        ['GED & preuves', 'Conserve les sources maîtresses, versions, décisions et pièces justificatives.', 'Traçabilité']
      ],
      relationTitle: 'Chaîne de relation',
      relation: ['Décision de pilotage', 'Fonction responsable', 'Action ou transaction', 'Preuve et revue']
    },
    processes: {
      eyebrow: 'MÉTHODE COMMUNE',
      title: 'Processus & Contrôles',
      body: 'Le pilotage global harmonise les contrôles transversaux. Les procédures détaillées restent gouvernées dans chaque fonction.',
      steps: [
        ['Observer', 'Identifier la situation et son périmètre.'],
        ['Sourcer', 'Vérifier provenance, date et disponibilité.'],
        ['Qualifier', 'Nommer priorité, risque et responsable.'],
        ['Décider', 'Autoriser l’action au bon niveau.'],
        ['Exécuter', 'Suivre résultat, délai et dépense éventuelle.'],
        ['Tracer', 'Conserver preuve, retour d’expérience et prochaine action.']
      ],
      controlsTitle: 'Contrôles minimaux',
      controls: ['Source identifiable', 'Responsable explicite', 'Droits respectés', 'État et fraîcheur visibles', 'Retour vers le point de départ', 'Aucune valeur inventée']
    },
    resources: {
      eyebrow: 'POINTS D’ACCÈS GOUVERNÉS',
      title: 'Ressources',
      body: 'Les ressources restent conservées dans leurs espaces maîtres. Cette vue fournit des accès transversaux sans créer de copie concurrente.',
      open: 'Ouvrir',
      cards: [
        ['Ressources Administration', 'Documents directeurs, ressources légales, favoris et supports de la fonction pilote.', '/administration?tab=resources&returnTo=dashboard-resources', 'Administration'],
        ['GED & Knowledge Management', 'Documents, dossiers, archives, veille et connaissance institutionnelle.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'],
        ['Daily Intelligence', 'Mémoire stratégique, agenda, journal de bord et dernière édition publiée.', '/?view=intelligence', 'Pilotage'],
        ['Planification & projets', 'Tâches, projets, échéances et journal d’exécution de la fonction Administration.', '/administration?tab=planning&returnTo=dashboard-resources', 'Exécution']
      ]
    },
    glossary: {
      eyebrow: 'VOCABULAIRE DU PILOTAGE',
      title: 'Glossaire',
      body: 'Ces définitions locales facilitent la lecture du Tableau de bord global. Le Glossaire central 2SG reste la source maîtresse.',
      open: 'Ouvrir le Glossaire central',
      kpiTitle: 'Dictionnaire KPI du Tableau de bord',
      kpiBody: 'Chaque fiche sépare la définition, le périmètre, la source, la fraîcheur et l’action. Les règles de conversion CHF/CFA sont explicites sans modifier les valeurs.',
      kpiGroups: { management: 'Management & Gouvernance', finance: 'Fonctions support · Finances', support: 'Fonctions support · RH & IT', operations: 'Opérations & Développement' },
      fields: { definition: 'Définition', scope: 'Périmètre', source: 'Source', freshness: 'Fraîcheur', action: 'Action associée' },
      viewIndicator: 'Revenir à l’indicateur',
      terms: [
        ['Tableau de bord global', 'Vue transversale de pilotage qui consolide des informations sans remplacer les applications métier.'],
        ['Indicateur (KPI)', 'Mesure définie, sourcée et datée qui aide à suivre un objectif, un résultat ou un risque.'],
        ['Source maîtresse', 'Source gouvernée qui fait foi pour une information, une règle ou une version donnée.'],
        ['Fraîcheur', 'Date ou ancienneté de la dernière donnée disponible et contrôlée.'],
        ['Indisponible', 'État explicite utilisé lorsqu’une source réelle ne répond pas ou ne fournit aucune valeur fiable.'],
        ['Carte des fonctions', 'Carte mentale qui montre les familles, fonctions et composantes locales de 2SG/M3S.']
      ]
    }
  },
  EN: {
    architecture: {
      eyebrow: 'CROSS-FUNCTIONAL STRUCTURE', title: 'Architecture & Relationships', body: 'This view describes the global steering layers and their exchanges. It complements the function mind map without replacing it.',
      cards: [['Global steering', 'Sets priorities, consolidates indicators and makes decisions visible.', 'Dashboard'], ['Business functions', 'Execute and control work within their scopes and local dashboards.', 'M3S functions'], ['Services & data', 'Provide authorised data through APIs, with availability and freshness.', 'Connected sources'], ['GED & evidence', 'Retains master sources, versions, decisions and supporting evidence.', 'Traceability']],
      relationTitle: 'Relationship chain', relation: ['Steering decision', 'Responsible function', 'Action or transaction', 'Evidence and review']
    },
    processes: {
      eyebrow: 'COMMON METHOD', title: 'Processes & Controls', body: 'Global steering harmonises cross-functional controls. Detailed procedures remain governed within each function.',
      steps: [['Observe', 'Identify the situation and scope.'], ['Source', 'Check provenance, date and availability.'], ['Qualify', 'Name priority, risk and owner.'], ['Decide', 'Authorise action at the right level.'], ['Execute', 'Track outcome, deadline and any expense.'], ['Trace', 'Retain evidence, lessons and next action.']],
      controlsTitle: 'Minimum controls', controls: ['Identifiable source', 'Explicit owner', 'Permissions respected', 'Status and freshness visible', 'Return to starting point', 'No invented value']
    },
    resources: {
      eyebrow: 'GOVERNED ACCESS POINTS', title: 'Resources', body: 'Resources remain in their master spaces. This view provides cross-functional access without creating a competing copy.', open: 'Open',
      cards: [['Administration resources', 'Governing documents, legal resources, bookmarks and pilot-function support.', '/administration?tab=resources&returnTo=dashboard-resources', 'Administration'], ['GED & Knowledge Management', 'Documents, folders, archives, monitoring and institutional knowledge.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'], ['Daily Intelligence', 'Strategic memory, agenda, logbook and latest published edition.', '/?view=intelligence', 'Steering'], ['Planning & projects', 'Tasks, projects, deadlines and Administration execution log.', '/administration?tab=planning&returnTo=dashboard-resources', 'Execution']]
    },
    glossary: {
      eyebrow: 'STEERING VOCABULARY', title: 'Glossary', body: 'These local definitions support reading of the Global Dashboard. The 2SG Central Glossary remains the master source.', open: 'Open Central Glossary',
      kpiTitle: 'Dashboard KPI dictionary',
      kpiBody: 'Each record separates definition, scope, source, freshness and action. CHF/CFA conversion rules are explicit without changing values.',
      kpiGroups: { management: 'Management & Governance', finance: 'Support functions · Finance', support: 'Support functions · HR & IT', operations: 'Operations & Development' },
      fields: { definition: 'Definition', scope: 'Scope', source: 'Source', freshness: 'Freshness', action: 'Associated action' },
      viewIndicator: 'Return to indicator',
      terms: [['Global Dashboard', 'Cross-functional steering view that consolidates information without replacing business applications.'], ['Indicator (KPI)', 'A defined, sourced and dated measure used to track an objective, result or risk.'], ['Master source', 'Governed source of record for a given item, rule or version.'], ['Freshness', 'Date or age of the latest available and checked data.'], ['Unavailable', 'Explicit state used when a real source does not respond or provides no reliable value.'], ['Function map', 'Mind map showing 2SG/M3S families, functions and local components.']]
    }
  },
  DE: {
    architecture: {
      eyebrow: 'FUNKTIONSÜBERGREIFENDE STRUKTUR', title: 'Architektur & Beziehungen', body: 'Diese Ansicht beschreibt die Ebenen der globalen Steuerung und ihre Austauschbeziehungen. Sie ergänzt die Funktions-Mindmap, ohne sie zu ersetzen.',
      cards: [['Globale Steuerung', 'Richtet Prioritäten aus, konsolidiert Kennzahlen und macht Entscheidungen sichtbar.', 'Dashboard'], ['Fachfunktionen', 'Führen und kontrollieren die Arbeit in ihren Bereichen und lokalen Dashboards.', 'M3S-Funktionen'], ['Dienste & Daten', 'Liefern autorisierte Daten über APIs mit Verfügbarkeit und Aktualität.', 'Verbundene Quellen'], ['GED & Nachweise', 'Bewahrt Hauptquellen, Versionen, Entscheidungen und Belege auf.', 'Nachvollziehbarkeit']],
      relationTitle: 'Beziehungskette', relation: ['Steuerungsentscheidung', 'Verantwortliche Funktion', 'Aktion oder Transaktion', 'Nachweis und Prüfung']
    },
    processes: {
      eyebrow: 'GEMEINSAME METHODE', title: 'Prozesse & Kontrollen', body: 'Die globale Steuerung harmonisiert funktionsübergreifende Kontrollen. Detaillierte Verfahren bleiben in jeder Funktion geregelt.',
      steps: [['Beobachten', 'Situation und Umfang bestimmen.'], ['Belegen', 'Herkunft, Datum und Verfügbarkeit prüfen.'], ['Qualifizieren', 'Priorität, Risiko und Verantwortung benennen.'], ['Entscheiden', 'Aktion auf der richtigen Ebene freigeben.'], ['Ausführen', 'Ergebnis, Termin und mögliche Ausgabe verfolgen.'], ['Dokumentieren', 'Nachweis, Erfahrung und nächste Aktion festhalten.']],
      controlsTitle: 'Mindestkontrollen', controls: ['Identifizierbare Quelle', 'Explizite Verantwortung', 'Rechte eingehalten', 'Status und Aktualität sichtbar', 'Rückkehr zum Ausgangspunkt', 'Keine erfundenen Werte']
    },
    resources: {
      eyebrow: 'GEREGELTE ZUGÄNGE', title: 'Ressourcen', body: 'Ressourcen verbleiben in ihren maßgeblichen Bereichen. Diese Ansicht bietet funktionsübergreifende Zugänge ohne konkurrierende Kopien.', open: 'Öffnen',
      cards: [['Ressourcen Verwaltung', 'Leitdokumente, Rechtsquellen, Favoriten und Hilfsmittel der Pilotfunktion.', '/administration?tab=resources&returnTo=dashboard-resources', 'Verwaltung'], ['GED & Knowledge Management', 'Dokumente, Ordner, Archive, Monitoring und institutionelles Wissen.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'], ['Daily Intelligence', 'Strategisches Gedächtnis, Agenda, Arbeitsjournal und letzte Ausgabe.', '/?view=intelligence', 'Steuerung'], ['Planung & Projekte', 'Aufgaben, Projekte, Termine und Ausführungsjournal der Verwaltung.', '/administration?tab=planning&returnTo=dashboard-resources', 'Ausführung']]
    },
    glossary: {
      eyebrow: 'STEUERUNGSVOKABULAR', title: 'Glossar', body: 'Diese lokalen Definitionen erleichtern das Lesen des globalen Dashboards. Das zentrale 2SG-Glossar bleibt die Hauptquelle.', open: 'Zentrales Glossar öffnen',
      kpiTitle: 'KPI-Wörterbuch des Dashboards',
      kpiBody: 'Jeder Eintrag trennt Definition, Umfang, Quelle, Aktualität und Aktion. CHF/CFA-Umrechnungsregeln sind sichtbar, ohne Werte zu verändern.',
      kpiGroups: { management: 'Management & Governance', finance: 'Unterstützungsfunktionen · Finanzen', support: 'Unterstützungsfunktionen · Personal & IT', operations: 'Betrieb & Entwicklung' },
      fields: { definition: 'Definition', scope: 'Umfang', source: 'Quelle', freshness: 'Aktualität', action: 'Zugeordnete Aktion' },
      viewIndicator: 'Zur Kennzahl zurückkehren',
      terms: [['Globales Dashboard', 'Funktionsübergreifende Steuerungsansicht, die Informationen bündelt, ohne Fachanwendungen zu ersetzen.'], ['Kennzahl (KPI)', 'Definierte, belegte und datierte Messgröße zur Verfolgung eines Ziels, Ergebnisses oder Risikos.'], ['Hauptquelle', 'Geregelte maßgebliche Quelle für eine Information, Regel oder Version.'], ['Aktualität', 'Datum oder Alter der letzten verfügbaren und geprüften Daten.'], ['Nicht verfügbar', 'Expliziter Zustand, wenn eine reale Quelle nicht antwortet oder keinen verlässlichen Wert liefert.'], ['Funktionskarte', 'Mindmap der Bereiche, Funktionen und lokalen Komponenten von 2SG/M3S.']]
    }
  }
};

const ViewHeader = ({ data }) => (
  <header>
    <p className="text-xs font-semibold uppercase text-blue-300">{data.eyebrow}</p>
    <h3 className="mt-1 text-lg font-semibold text-slate-100">{data.title}</h3>
    <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-400">{data.body}</p>
  </header>
);

const ArchitectureView = ({ data }) => {
  const icons = [Network, Boxes, Database, FolderCog];
  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.cards.map(([title, body, label], index) => {
          const Icon = icons[index];
          return <article key={title} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><Icon className="text-blue-300" size={20} aria-hidden="true" /><h4 className="mt-3 text-sm font-semibold text-slate-100">{title}</h4><p className="mt-1 text-sm leading-5 text-slate-400">{body}</p><p className="mt-3 text-xs font-semibold uppercase text-blue-300">{label}</p></article>;
        })}
      </div>
      <section className="mt-4 rounded-md border border-slate-700 bg-slate-900/25 p-3" aria-labelledby="global-relation-chain">
        <h4 id="global-relation-chain" className="text-sm font-semibold text-slate-100">{data.relationTitle}</h4>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">{data.relation.map((item, index) => <div key={item} className="flex min-h-11 items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-950 text-xs font-semibold text-blue-300">{index + 1}</span>{item}</div>)}</div>
      </section>
    </div>
  );
};

const ProcessesView = ({ data }) => (
  <div className="mt-5">
    <ViewHeader data={data} />
    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{data.steps.map(([title, body], index) => <article key={title} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><div className="flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-950 text-xs font-semibold text-blue-300">{index + 1}</span><h4 className="text-sm font-semibold text-slate-100">{title}</h4></div><p className="mt-2 text-sm leading-5 text-slate-400">{body}</p></article>)}</div>
    <section className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3" aria-labelledby="minimum-global-controls"><h4 id="minimum-global-controls" className="flex items-center gap-2 text-sm font-semibold text-slate-100"><ShieldCheck className="text-emerald-300" size={19} aria-hidden="true" />{data.controlsTitle}</h4><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{data.controls.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="shrink-0 text-emerald-300" size={16} aria-hidden="true" />{item}</div>)}</div></section>
  </div>
);

const ResourcesView = ({ data, onNavigate }) => {
  const icons = [FolderCog, FileSearch, History, Workflow];
  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{data.cards.map(([title, body, path, label], index) => { const Icon = icons[index]; return <article key={title} className="flex flex-col rounded-md border border-slate-700 bg-slate-900/35 p-3"><div className="flex items-center gap-2"><Icon className="text-blue-300" size={20} aria-hidden="true" /><h4 className="text-sm font-semibold text-slate-100">{title}</h4></div><p className="mt-2 flex-1 text-sm leading-5 text-slate-400">{body}</p><button type="button" onClick={() => onNavigate(path)} className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">{data.open} {label}<ArrowRight size={16} aria-hidden="true" /></button></article>; })}</div>
    </div>
  );
};

const GlossaryView = ({ data, language, selectedKpi, onNavigate }) => {
  const kpiGroups = getDashboardKpiDefinitions(language);
  const kpis = Object.values(kpiGroups).flat();
  const selectedKpiExists = kpis.some(({ id }) => id === selectedKpi);

  useEffect(() => {
    if (!selectedKpi || !selectedKpiExists) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`dashboard-kpi-definition-${selectedKpi}`)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedKpi, selectedKpiExists]);

  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{data.terms.map(([term, definition]) => <div key={term} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><dt className="flex items-center gap-2 text-sm font-semibold text-slate-100"><BookOpenText className="shrink-0 text-blue-300" size={18} aria-hidden="true" />{term}</dt><dd className="mt-2 text-sm leading-5 text-slate-400">{definition}</dd></div>)}</dl>
      <section className="mt-5 border-t border-slate-700 pt-5" aria-labelledby="dashboard-kpi-dictionary-title">
        <h4 id="dashboard-kpi-dictionary-title" className="text-base font-semibold text-slate-100">{data.kpiTitle}</h4>
        <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-400">{data.kpiBody}</p>
        {Object.entries(kpiGroups).map(([groupId, groupKpis]) => (
          <section key={groupId} className="mt-5" aria-labelledby={`dashboard-kpi-group-${groupId}`}>
            <h5 id={`dashboard-kpi-group-${groupId}`} className="border-l-2 border-blue-500 pl-3 text-sm font-semibold text-slate-100">{data.kpiGroups[groupId]}</h5>
            <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
              {groupKpis.map((kpi) => {
                const selected = selectedKpi === kpi.id;
                return (
                  <article
                    key={kpi.id}
                    id={`dashboard-kpi-definition-${kpi.id}`}
                    className={`scroll-mt-28 rounded-md border p-4 ${selected ? 'border-blue-400 bg-blue-950/25 ring-1 ring-blue-500/40' : 'border-slate-700 bg-slate-900/35'}`}
                  >
                    <h6 className="flex items-center gap-2 text-base font-semibold text-slate-100"><BookOpenText className="shrink-0 text-blue-300" size={19} aria-hidden="true" />{kpi.label}</h6>
                    <dl className="mt-3 space-y-3 text-sm">
                      {['definition', 'scope', 'source', 'freshness', 'action'].map((field) => (
                        <div key={field}>
                          <dt className="font-semibold text-slate-200">{data.fields[field]}</dt>
                          <dd className="mt-0.5 leading-5 text-slate-400">{kpi[field]}</dd>
                        </div>
                      ))}
                    </dl>
                    <button type="button" onClick={() => onNavigate(`/?view=overview&dashboardKpi=${encodeURIComponent(kpi.id)}#dashboard-kpi-${kpi.id}`)} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-700">{data.viewIndicator}<ArrowRight size={16} aria-hidden="true" /></button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </section>
      <button type="button" onClick={() => onNavigate('/ged?tab=glossary&returnTo=dashboard-glossary')} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">{data.open}<ArrowRight size={16} aria-hidden="true" /></button>
    </div>
  );
};

const DashboardGovernanceViews = ({ activeView, language = 'FR', selectedKpi = '', onNavigate }) => {
  const t = copy[language] || copy.FR;
  if (activeView === 'architecture') return <ArchitectureView data={t.architecture} />;
  if (activeView === 'processes') return <ProcessesView data={t.processes} />;
  if (activeView === 'incidents') return <DashboardIncidentRiskOverview language={language} onNavigate={onNavigate} />;
  if (activeView === 'resources') return <ResourcesView data={t.resources} onNavigate={onNavigate} />;
  if (activeView === 'glossary') return <GlossaryView data={t.glossary} language={language} selectedKpi={selectedKpi} onNavigate={onNavigate} />;
  return null;
};

export default DashboardGovernanceViews;
