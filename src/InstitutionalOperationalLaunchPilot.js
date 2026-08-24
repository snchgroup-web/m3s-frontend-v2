import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FolderOpen,
  Rocket,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const LAUNCH_STAGES = ['functions', 'processes', 'pilots', 'usage', 'controls', 'decision'];
const CURRENT_STAGE_INDEX = 0;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-07 · Lancement opérationnel',
    status: 'Pilotes et opérations réels disponibles · périmètre institutionnel à délimiter',
    body: 'Préparer les premières opérations institutionnelles de 2SG en retenant uniquement les fonctions, processus et pilotes contrôlables. Un dossier réel, un outil utilisé ou une opération reçue ne prouve pas à lui seul le lancement de l’institution.',
    noMeasure: 'Progression non calculable · fonctions minimales, processus, pilotes, preuves d’usage, critères de réception et décision de lancement à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Périmètre et conditions de lancement à définir',
    stages: ['Fonctions minimales', 'Processus prioritaires', 'Pilotes retenus', 'Usage & preuves', 'Contrôles & réception', 'Décision & revue'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Définir les fonctions minimales réellement disponibles, leur responsable, leurs limites et les dépendances nécessaires au lancement.',
      'Sélectionner les processus prioritaires et les pilotes retenus sans transformer automatiquement tous les dossiers courants en périmètre institutionnel.',
      'Relier chaque usage à un public autorisé, un résultat attendu, une preuve recevable, une réception ou des réserves et une prochaine action.',
      'Préparer la décision humaine de lancer, limiter, reporter ou suspendre avec date, périmètre, conditions, risques et prochaine revue.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Périmètre versionné des fonctions, services, processus et pilotes retenus avec responsables et dépendances.',
      'Registre d’usage distinguant test, pilote, opération réelle, résultat contrôlé, réserve et clôture.',
      'Preuves de disponibilité, d’exécution, de contrôle et de réception conservées dans les registres maîtres et la GED classifiée.',
      'Décision de lancement tracée avec autorité, date, portée, conditions, exclusions, risques acceptés et date de revue.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'La présence de Villa LR1, de M3S, de flux financiers, de fournisseurs ou de tâches réelles constitue une preuve d’activité, pas une décision générale de lancement. Une réception spécifique ne clôture pas les autres réserves. Un Go interne n’autorise ni commercialisation, ni extension territoriale, ni communication publique non validée.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Identités, contrats, montants détaillés, reçus, coordonnées, médias privés, incidents sensibles, dossiers juridiques, accès techniques et décisions restreintes restent dans leurs registres autorisés. Cette vue ne publie que le cadre de pilotage.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'La Gouvernance autorise le périmètre et la décision de lancement ; chaque fonction exécute et valide son résultat métier ; Administration coordonne et tient les statuts ; Finances contrôle les engagements ; IT & Support confirme la disponibilité ; la GED conserve les versions et preuves.',
    source: 'Sources de pilotage : matrice et inventaire gouvernés de la Mise en place, outil Villa LR1 utilisé comme cas et non comme définition générale, registres M3S Administration, Production, Finances et Stock & Actifs, Daily Intelligence et journaux disponibles. Leur existence ne vaut pas lancement institutionnel validé.',
    openPlanning: 'Ouvrir la planification',
    openProduction: 'Ouvrir les processus Production',
    openResources: 'Ouvrir les ressources de pilotage'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-07 · Operational launch',
    status: 'Real pilots and operations available · institutional scope to delimit',
    body: 'Prepare the first institutional operations of 2SG by retaining only controllable functions, processes and pilots. A real file, a tool in use or an accepted operation does not by itself prove that the institution has launched.',
    noMeasure: 'Progress cannot be calculated · minimum functions, processes, pilots, usage evidence, acceptance criteria and launch decision require validation',
    currentStage: 'Current work point',
    currentStageName: 'Launch scope and conditions to define',
    stages: ['Minimum functions', 'Priority processes', 'Selected pilots', 'Usage & evidence', 'Controls & acceptance', 'Decision & review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Define the minimum functions actually available, their owner, limits and dependencies required for launch.',
      'Select priority processes and retained pilots without automatically turning every current file into institutional scope.',
      'Link each use to an authorised audience, expected result, admissible evidence, acceptance or reservations and a next action.',
      'Prepare the human decision to launch, limit, defer or suspend with date, scope, conditions, risks and next review.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned scope of retained functions, services, processes and pilots with owners and dependencies.',
      'Usage register separating test, pilot, real operation, controlled result, reservation and closure.',
      'Availability, execution, control and acceptance evidence retained in governing registers and the classified DMS.',
      'Recorded launch decision with authority, date, reach, conditions, exclusions, accepted risks and review date.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'Villa LR1, M3S, financial flows, suppliers or real tasks provide evidence of activity, not a general launch decision. A specific acceptance does not close other reservations. An internal Go authorises neither commercialisation, territorial expansion nor unapproved public communication.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Identities, contracts, detailed amounts, receipts, contact details, private media, sensitive incidents, legal files, technical access and restricted decisions remain in their authorised registers. This view only publishes the steering frame.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Governance authorises the scope and launch decision; each function executes and validates its business result; Administration coordinates and maintains status; Finance controls commitments; IT & Support confirms availability; the DMS retains versions and evidence.',
    source: 'Steering sources: governed Implementation matrix and inventory, the Villa LR1 tool used as a case rather than a general definition, M3S Administration, Production, Finance and Stock & Assets registers, Daily Intelligence and available logs. Their existence does not constitute a validated institutional launch.',
    openPlanning: 'Open planning',
    openProduction: 'Open Production processes',
    openResources: 'Open steering resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-07 · Operativer Start',
    status: 'Reale Piloten und Vorgänge vorhanden · institutioneller Umfang abzugrenzen',
    body: 'Die ersten institutionellen Vorgänge von 2SG vorbereiten und nur kontrollierbare Funktionen, Prozesse und Piloten übernehmen. Eine reale Akte, ein genutztes Werkzeug oder ein abgenommener Vorgang beweist für sich allein keinen Start der Institution.',
    noMeasure: 'Fortschritt nicht berechenbar · Mindestfunktionen, Prozesse, Piloten, Nutzungsnachweise, Abnahmekriterien und Startentscheid sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Startumfang und Bedingungen definieren',
    stages: ['Mindestfunktionen', 'Prioritäre Prozesse', 'Ausgewählte Piloten', 'Nutzung & Nachweise', 'Kontrollen & Abnahme', 'Entscheid & Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Die tatsächlich verfügbaren Mindestfunktionen, ihre Verantwortung, Grenzen und erforderlichen Abhängigkeiten definieren.',
      'Prioritäre Prozesse und ausgewählte Piloten bestimmen, ohne jede laufende Akte automatisch zum institutionellen Umfang zu machen.',
      'Jede Nutzung mit autorisiertem Publikum, erwartetem Ergebnis, zulässigem Nachweis, Abnahme oder Vorbehalt und nächster Aktion verbinden.',
      'Den menschlichen Entscheid für Start, Begrenzung, Verschiebung oder Aussetzung mit Datum, Umfang, Bedingungen, Risiken und nächster Prüfung vorbereiten.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versionierter Umfang der ausgewählten Funktionen, Leistungen, Prozesse und Piloten mit Verantwortungen und Abhängigkeiten.',
      'Nutzungsregister mit Trennung von Test, Pilot, realem Vorgang, kontrolliertem Ergebnis, Vorbehalt und Abschluss.',
      'Nachweise zu Verfügbarkeit, Ausführung, Kontrolle und Abnahme in den Hauptregistern und der klassifizierten GED.',
      'Dokumentierter Startentscheid mit Autorität, Datum, Reichweite, Bedingungen, Ausschlüssen, akzeptierten Risiken und Prüfdatum.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Villa LR1, M3S, Finanzflüsse, Lieferanten oder reale Aufgaben belegen Aktivität, aber keinen allgemeinen Startentscheid. Eine einzelne Abnahme schliesst andere Vorbehalte nicht. Ein internes Go erlaubt weder Vermarktung, territoriale Ausdehnung noch nicht freigegebene öffentliche Kommunikation.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Identitäten, Verträge, Detailbeträge, Belege, Kontaktdaten, private Medien, sensible Vorfälle, Rechtsakten, technische Zugänge und eingeschränkte Entscheide bleiben in ihren autorisierten Registern. Diese Ansicht veröffentlicht nur den Steuerungsrahmen.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Governance autorisiert Umfang und Startentscheid; jede Funktion führt aus und validiert ihr Fachergebnis; Verwaltung koordiniert und führt Status; Finanzen kontrolliert Verpflichtungen; IT & Support bestätigt Verfügbarkeit; die GED bewahrt Versionen und Nachweise.',
    source: 'Steuerungsquellen: gesteuerte Matrix und Inventar der Umsetzung, Villa LR1 als Fall und nicht als allgemeine Definition, M3S-Register Verwaltung, Produktion, Finanzen und Bestand & Anlagen, Daily Intelligence sowie verfügbare Journale. Ihre Existenz gilt nicht als validierter institutioneller Start.',
    openPlanning: 'Planung öffnen',
    openProduction: 'Produktionsprozesse öffnen',
    openResources: 'Steuerungsressourcen öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2">
      <Icon className={accent} size={18} aria-hidden="true" />
      <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
    </div>
    <ul className="mt-3 space-y-2">
      {items.map(item => (
        <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

const InstitutionalOperationalLaunchPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-operational-launch-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-cyan-700/70 bg-cyan-950/30 px-3 py-2 text-xs font-semibold text-cyan-100">
          <Rocket size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="cyan" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-cyan-700/70 bg-cyan-950/35 px-2.5 py-1 font-semibold text-cyan-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {LAUNCH_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-cyan-500 bg-cyan-950/40 text-cyan-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={BookOpenCheck} title={t.tasksTitle} items={t.tasks} accent="text-cyan-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ClipboardCheck className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><BadgeCheck className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/administration?tab=planning&${returnContext}#planning-pilot-project`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <ClipboardCheck size={16} aria-hidden="true" />{t.openPlanning}<ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onNavigate(`/production?tab=processes&${returnContext}#production-module-tabs`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <Workflow size={16} aria-hidden="true" />{t.openProduction}
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=resources&${returnContext}#administration-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <FolderOpen size={16} aria-hidden="true" />{t.openResources}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalOperationalLaunchPilot;
