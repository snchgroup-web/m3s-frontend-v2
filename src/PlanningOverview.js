import React from 'react';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckSquare2,
  Clock3,
  Compass,
  Flag,
  FolderKanban,
  GitBranch,
  Layers3,
  ListChecks,
  Route,
  Target
} from 'lucide-react';
import GlossaryHelp from './GlossaryHelp';
import InternalSectionNav from './InternalSectionNav';
import ProjectMinimumMethod from './ProjectMinimumMethod';

const COPY = {
  FR: {
    eyebrow: 'Administration / Planification',
    title: 'Planification & Gestion de projets',
    body: 'Un planificateur unique pour organiser les projets temporaires et les activités récurrentes de 2SG, sans confondre leurs niveaux.',
    targetModel: 'Modèle fonctionnel cible',
    connectedTasks: 'Registre des tâches existant',
    navLabel: 'Navigation dans Planification & Projets',
    navSteering: 'Pilotage',
    navModel: 'Modèle',
    navBranches: 'Branches',
    navDimensions: 'Dimensions',
    navMethod: 'Contrôle minimal',
    navStatus: 'État',
    navJournal: 'Journal validé',
    navRegister: 'Registre',
    backToTop: 'Revenir en haut',
    steeringTitle: "De la cible à l'exécution",
    steeringBody: "Cette chaîne relie l'architecture cible de 2SG à l'exécution. Elle oriente les projets et les activités sans remplacer leur planification détaillée.",
    blueprint: 'Blueprint institutionnel',
    blueprintBody: "Document vivant qui décrit l'architecture cible et guide la structuration progressive de 2SG.",
    roadmap: 'Feuille de route',
    roadmapBody: 'Vue séquencée des étapes, jalons et priorités nécessaires pour progresser vers une cible.',
    actionPlan: "Plan d'action",
    actionPlanBody: 'Organisation concrète des actions, responsables, échéances, ressources et preuves nécessaires à un résultat.',
    ruleTitle: 'Règle de modélisation',
    ruleBody: 'Une phase appartient toujours à un projet. Une activité récurrente peut relever d’un plan opérationnel sans qu’un projet artificiel soit créé.',
    projectBranch: 'Branche projet',
    projectBranchBody: 'Pour un objectif temporaire produisant un résultat ou un livrable défini.',
    operationsBranch: 'Branche activité récurrente',
    operationsBranchBody: 'Pour le fonctionnement continu, les routines et les obligations périodiques.',
    project: 'Projet',
    projectBody: 'Objectif, périmètre, livrables, responsable, budget et dates de début et de fin.',
    phase: 'Phase',
    phaseBody: 'Séquence cohérente du projet, bornée par des dates et un point de validation.',
    activity: 'Activité',
    activityBody: 'Ensemble de travaux contribuant à une phase ou à un plan opérationnel.',
    task: 'Tâche / Action',
    taskBody: 'Unité exécutable avec responsable, échéance, priorité, statut et progression.',
    operationalPlan: 'Plan opérationnel / Cycle',
    operationalPlanBody: 'Cadre temporel pour planifier les activités récurrentes de la structure.',
    transversalTitle: 'Dimensions transversales du planificateur',
    milestone: 'Jalon',
    milestoneBody: 'Date de contrôle, décision, livraison ou réception sans durée propre.',
    dependency: 'Dépendance',
    dependencyBody: 'Lien indiquant qu’un élément dépend d’un autre avant de commencer ou finir.',
    timeline: 'Chronologie',
    timelineBody: 'Vue des projets, phases, activités et tâches dans le temps.',
    agenda: 'Agenda',
    agendaBody: 'Vue consolidée des échéances, réunions, jalons et rappels.',
    currentTitle: 'État du prototype',
    tasksAvailable: 'Tâches disponibles',
    tasksCompleted: 'Tâches terminées',
    completion: 'Progression documentaire',
    currentBody: 'Le registre des tâches est utilisable localement et la méthode minimale V0.1 est visible en lecture seule. La lecture API doit être rétablie et la persistance des modifications ajoutée. Les projets, phases, dépendances, jalons, chronologies et agendas seront raccordés après validation du modèle de données.',
    registerTitle: 'Registre des tâches et actions'
  },
  EN: {
    eyebrow: 'Administration / Planning',
    title: 'Planning & Project Management',
    body: 'One planner for temporary projects and recurring 2SG activities, without mixing their hierarchy levels.',
    targetModel: 'Target functional model',
    connectedTasks: 'Existing task register',
    navLabel: 'Planning & Projects navigation',
    navSteering: 'Steering',
    navModel: 'Model',
    navBranches: 'Branches',
    navDimensions: 'Dimensions',
    navMethod: 'Minimum control',
    navStatus: 'Status',
    navJournal: 'Validated journal',
    navRegister: 'Register',
    backToTop: 'Back to top',
    steeringTitle: 'From target to execution',
    steeringBody: 'This chain connects the 2SG target architecture to execution. It guides projects and activities without replacing their detailed planning.',
    blueprint: 'Institutional blueprint',
    blueprintBody: 'A living document describing the target architecture and guiding the progressive structuring of 2SG.',
    roadmap: 'Roadmap',
    roadmapBody: 'A sequenced view of the steps, milestones and priorities needed to progress towards a target.',
    actionPlan: 'Action plan',
    actionPlanBody: 'The concrete organisation of actions, owners, deadlines, resources and evidence needed to achieve an outcome.',
    ruleTitle: 'Modelling rule',
    ruleBody: 'A phase always belongs to a project. A recurring activity may belong to an operational plan without creating an artificial project.',
    projectBranch: 'Project branch',
    projectBranchBody: 'For a temporary objective producing a defined result or deliverable.',
    operationsBranch: 'Recurring activity branch',
    operationsBranchBody: 'For continuous operations, routines and periodic obligations.',
    project: 'Project',
    projectBody: 'Objective, scope, deliverables, owner, budget, start date and end date.',
    phase: 'Phase',
    phaseBody: 'A coherent project sequence bounded by dates and a validation gate.',
    activity: 'Activity',
    activityBody: 'A group of work contributing to a phase or an operational plan.',
    task: 'Task / Action',
    taskBody: 'An executable unit with an owner, deadline, priority, status and progress.',
    operationalPlan: 'Operational plan / Cycle',
    operationalPlanBody: 'A time frame for planning the organisation’s recurring activities.',
    transversalTitle: 'Cross-cutting planner dimensions',
    milestone: 'Milestone',
    milestoneBody: 'A review, decision, delivery or acceptance date with no duration of its own.',
    dependency: 'Dependency',
    dependencyBody: 'A link showing that one item depends on another before it can start or finish.',
    timeline: 'Timeline',
    timelineBody: 'A time-based view of projects, phases, activities and tasks.',
    agenda: 'Agenda',
    agendaBody: 'A consolidated view of deadlines, meetings, milestones and reminders.',
    currentTitle: 'Prototype status',
    tasksAvailable: 'Available tasks',
    tasksCompleted: 'Completed tasks',
    completion: 'Documented completion',
    currentBody: 'The task register is usable locally and the minimum V0.1 method is visible in read-only mode. API reading must be restored and change persistence added. Projects, phases, dependencies, milestones, timelines and agendas will be connected after the data model is approved.',
    registerTitle: 'Task and action register'
  },
  DE: {
    eyebrow: 'Verwaltung / Planung',
    title: 'Planung & Projektmanagement',
    body: 'Ein gemeinsamer Planer für befristete Projekte und wiederkehrende 2SG-Aktivitäten, ohne die Hierarchieebenen zu vermischen.',
    targetModel: 'Funktionales Zielmodell',
    connectedTasks: 'Bestehendes Aufgabenregister',
    navLabel: 'Navigation innerhalb Planung & Projekte',
    navSteering: 'Steuerung',
    navModel: 'Modell',
    navBranches: 'Zweige',
    navDimensions: 'Dimensionen',
    navMethod: 'Mindestkontrolle',
    navStatus: 'Stand',
    navJournal: 'Freigegebenes Journal',
    navRegister: 'Register',
    backToTop: 'Nach oben',
    steeringTitle: 'Vom Zielbild zur Umsetzung',
    steeringBody: 'Diese Kette verbindet die Zielarchitektur von 2SG mit der Umsetzung. Sie steuert Projekte und Aktivitäten, ohne deren Detailplanung zu ersetzen.',
    blueprint: 'Institutioneller Blueprint',
    blueprintBody: 'Lebendes Dokument, das die Zielarchitektur beschreibt und die schrittweise Strukturierung von 2SG leitet.',
    roadmap: 'Roadmap',
    roadmapBody: 'Geordnete Übersicht der Schritte, Meilensteine und Prioritäten auf dem Weg zu einem Zielzustand.',
    actionPlan: 'Maßnahmenplan',
    actionPlanBody: 'Konkrete Organisation der Maßnahmen, Verantwortlichen, Fristen, Ressourcen und Nachweise für ein Ergebnis.',
    ruleTitle: 'Modellierungsregel',
    ruleBody: 'Eine Phase gehört immer zu einem Projekt. Eine wiederkehrende Aktivität kann einem operativen Plan zugeordnet werden, ohne ein künstliches Projekt anzulegen.',
    projectBranch: 'Projektzweig',
    projectBranchBody: 'Für ein befristetes Ziel mit einem definierten Ergebnis oder Liefergegenstand.',
    operationsBranch: 'Zweig für wiederkehrende Aktivitäten',
    operationsBranchBody: 'Für laufenden Betrieb, Routinen und periodische Verpflichtungen.',
    project: 'Projekt',
    projectBody: 'Ziel, Umfang, Liefergegenstände, Verantwortung, Budget sowie Start- und Enddatum.',
    phase: 'Phase',
    phaseBody: 'Eine zusammenhängende Projektsequenz mit Terminen und einem Freigabepunkt.',
    activity: 'Aktivität',
    activityBody: 'Eine Gruppe von Arbeiten, die zu einer Phase oder einem operativen Plan beiträgt.',
    task: 'Aufgabe / Aktion',
    taskBody: 'Ausführbare Einheit mit Verantwortung, Frist, Priorität, Status und Fortschritt.',
    operationalPlan: 'Operativer Plan / Zyklus',
    operationalPlanBody: 'Zeitrahmen für die Planung wiederkehrender Aktivitäten der Organisation.',
    transversalTitle: 'Übergreifende Dimensionen des Planers',
    milestone: 'Meilenstein',
    milestoneBody: 'Kontroll-, Entscheidungs-, Liefer- oder Abnahmetermin ohne eigene Dauer.',
    dependency: 'Abhängigkeit',
    dependencyBody: 'Verknüpfung, nach der ein Element vor Beginn oder Abschluss von einem anderen abhängt.',
    timeline: 'Zeitachse',
    timelineBody: 'Zeitliche Ansicht von Projekten, Phasen, Aktivitäten und Aufgaben.',
    agenda: 'Agenda',
    agendaBody: 'Zusammengeführte Ansicht von Fristen, Sitzungen, Meilensteinen und Erinnerungen.',
    currentTitle: 'Stand des Prototyps',
    tasksAvailable: 'Verfügbare Aufgaben',
    tasksCompleted: 'Abgeschlossene Aufgaben',
    completion: 'Dokumentierter Fortschritt',
    currentBody: 'Das Aufgabenregister ist lokal nutzbar und die minimale Methode V0.1 ist im Lesemodus sichtbar. Der API-Lesezugriff muss wiederhergestellt und die Speicherung von Änderungen ergänzt werden. Projekte, Phasen, Abhängigkeiten, Meilensteine, Zeitachsen und Agenden werden nach Freigabe des Datenmodells angebunden.',
    registerTitle: 'Aufgaben- und Aktionsregister'
  }
};

const StepCard = ({ icon: Icon, title, body, tone = 'blue', termId, language }) => {
  const styles = tone === 'green'
    ? 'border-emerald-700/70 bg-emerald-950/25 text-emerald-300'
    : 'border-blue-700/70 bg-blue-950/25 text-blue-300';

  return (
    <article className={`min-w-0 rounded-lg border p-4 ${styles}`}>
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-current/30 bg-slate-950/30">
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="flex items-start gap-2">
        <h4 className="min-w-0 flex-1 text-sm font-semibold text-slate-100">{title}</h4>
        {termId && <GlossaryHelp termId={termId} language={language} />}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
    </article>
  );
};

const SteeringStep = ({ icon: Icon, title, body, termId, language, index }) => (
  <article className="flex min-w-0 flex-col rounded-lg border border-blue-700/70 bg-slate-950/35 p-4">
    <div className="flex items-start justify-between gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-500/40 bg-blue-950 text-blue-200">
        <Icon size={19} aria-hidden="true" />
      </span>
      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-bold text-white">
        {index}
      </span>
    </div>
    <div className="mt-4 flex items-start gap-2">
      <h4 className="min-w-0 flex-1 text-base font-bold leading-6 text-white">{title}</h4>
      <GlossaryHelp termId={termId} language={language} />
    </div>
    <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
  </article>
);

const Metric = ({ label, value }) => (
  <div className="rounded-lg border border-slate-700 bg-slate-950/30 p-4">
    <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
    <p className="mt-2 text-2xl font-bold text-white">{value}</p>
  </div>
);

const PlanningOverview = ({ language = 'FR', tasksTotal = 0, tasksStatus = 'ready', completedTasks = 0, children }) => {
  const t = COPY[language] || COPY.FR;
  const tasksReady = tasksStatus === 'ready'
    && Number.isFinite(tasksTotal)
    && Number.isFinite(completedTasks);
  const taskTotalValue = tasksReady ? tasksTotal : '—';
  const completedTaskValue = tasksReady ? completedTasks : '—';
  const completion = tasksReady
    ? (tasksTotal > 0 ? `${Math.round((completedTasks / tasksTotal) * 100)} %` : '0 %')
    : '—';
  const navItems = [
    { id: 'planning-steering', label: t.navSteering },
    { id: 'planning-model', label: t.navModel },
    { id: 'planning-branches', label: t.navBranches },
    { id: 'planning-dimensions', label: t.navDimensions },
    { id: 'planning-method', label: t.navMethod },
    { id: 'planning-status', label: t.navStatus },
    { id: 'planning-journal-register', label: t.navJournal },
    { id: 'planning-register', label: t.navRegister }
  ];

  return (
    <section id="planning-top" aria-labelledby="planning-title" className="administration-overview mb-6 space-y-6 scroll-mt-24">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h2 id="planning-title" className="mt-2 text-2xl font-semibold text-slate-100">{t.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.body}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-700 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-200">{t.targetModel}</span>
            <span className="rounded-full border border-blue-700 bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-200">{t.connectedTasks}</span>
          </div>
        </div>
      </header>

      <InternalSectionNav ariaLabel={t.navLabel} items={navItems} topId="planning-top" backToTopLabel={t.backToTop} refreshKey={language} />

      <section id="planning-steering" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="planning-steering-title">
        <div className="max-w-3xl">
          <h3 id="planning-steering-title" className="text-lg font-semibold text-slate-100">{t.steeringTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.steeringBody}</p>
        </div>
        <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-stretch">
          <SteeringStep icon={Compass} title={t.blueprint} body={t.blueprintBody} termId="STRAT-BLUEPRINT" language={language} index="1" />
          <div className="hidden items-center justify-center px-1 text-blue-300 xl:flex" aria-hidden="true">
            <ArrowRight size={24} />
          </div>
          <SteeringStep icon={Route} title={t.roadmap} body={t.roadmapBody} termId="STRAT-FEUILLE-ROUTE" language={language} index="2" />
          <div className="hidden items-center justify-center px-1 text-blue-300 xl:flex" aria-hidden="true">
            <ArrowRight size={24} />
          </div>
          <SteeringStep icon={ListChecks} title={t.actionPlan} body={t.actionPlanBody} termId="OPS-PLAN-ACTION" language={language} index="3" />
        </div>
      </section>

      <aside id="planning-model" className="scroll-mt-20 rounded-lg border border-blue-700/60 bg-blue-950/25 p-5">
        <div className="flex items-start gap-3">
          <Target className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-slate-100">{t.ruleTitle}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{t.ruleBody}</p>
          </div>
        </div>
      </aside>

      <div id="planning-branches" className="scroll-mt-20 grid gap-5 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="project-branch-title">
          <h3 id="project-branch-title" className="text-lg font-semibold text-slate-100">{t.projectBranch}</h3>
          <p className="mt-1 text-sm text-slate-400">{t.projectBranchBody}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <StepCard icon={FolderKanban} title={t.project} body={t.projectBody} />
            <StepCard icon={Layers3} title={t.phase} body={t.phaseBody} />
            <StepCard icon={Activity} title={t.activity} body={t.activityBody} />
            <StepCard icon={CheckSquare2} title={t.task} body={t.taskBody} />
          </div>
        </section>

        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="operations-branch-title">
          <h3 id="operations-branch-title" className="text-lg font-semibold text-slate-100">{t.operationsBranch}</h3>
          <p className="mt-1 text-sm text-slate-400">{t.operationsBranchBody}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StepCard icon={Route} title={t.operationalPlan} body={t.operationalPlanBody} tone="green" />
            <StepCard icon={Activity} title={t.activity} body={t.activityBody} tone="green" />
            <StepCard icon={CheckSquare2} title={t.task} body={t.taskBody} tone="green" />
          </div>
        </section>
      </div>

      <section id="planning-dimensions" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="transversal-title">
        <h3 id="transversal-title" className="text-lg font-semibold text-slate-100">{t.transversalTitle}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StepCard icon={Flag} title={t.milestone} body={t.milestoneBody} termId="PROJ-JALON" language={language} />
          <StepCard icon={GitBranch} title={t.dependency} body={t.dependencyBody} />
          <StepCard icon={Clock3} title={t.timeline} body={t.timelineBody} />
          <StepCard icon={CalendarDays} title={t.agenda} body={t.agendaBody} />
        </div>
      </section>

      <ProjectMinimumMethod language={language} />

      <section id="planning-status" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="current-title">
        <div className="flex items-center gap-3">
          <ListChecks className="text-emerald-300" size={22} aria-hidden="true" />
          <h3 id="current-title" className="text-lg font-semibold text-white">{t.currentTitle}</h3>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label={t.tasksAvailable} value={taskTotalValue} />
          <Metric label={t.tasksCompleted} value={completedTaskValue} />
          <Metric label={t.completion} value={completion} />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">{t.currentBody}</p>
      </section>

      {children}

      <h3 id="planning-register" className="scroll-mt-20 text-xl font-semibold text-slate-100">{t.registerTitle}</h3>
    </section>
  );
};

export default PlanningOverview;
