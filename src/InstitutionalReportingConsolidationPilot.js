import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Files,
  History,
  LineChart,
  ShieldCheck
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';
import InstitutionalConsolidationDecisionRecord from './InstitutionalConsolidationDecisionRecord';

const STAGES = ['calendar', 'sources', 'control', 'indicators', 'decisions', 'retention'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-08 · Reporting institutionnel',
    status: 'Cadre validé · détail à inventorier',
    body: 'Relier les journaux, l’agenda, la mémoire stratégique, les rapports périodiques, les indicateurs et les décisions dans une chaîne traçable. Cette vue ne transforme ni une synthèse en source maîtresse, ni une publication en approbation institutionnelle.',
    noMeasure: 'Progression non calculable · périodes, livrables, sources, responsabilités, preuves et règle de calcul à définir et valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Définir le calendrier, les sources, les contrôles et les décisions du reporting',
    stages: ['Périmètre & calendrier', 'Sources & collecte', 'Contrôle & consolidation', 'Indicateurs & analyse', 'Décisions & diffusion', 'Archivage & réemploi'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Définir les périodes, livrables, responsables, validateurs, destinataires, échéances et niveaux de confidentialité.',
      'Raccorder chaque affirmation, chiffre et décision à une source datée, versionnée et identifiable sans combler les périodes absentes.',
      'Contrôler complétude, cohérence, périmètre et fraîcheur avant toute consolidation ou comparaison d’indicateurs.',
      'Enregistrer validation du fond, approbation, diffusion, décisions, réserves et emplacement d’archivage comme états distincts.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Calendrier de reporting avec période, livrable, responsable, validateur, destinataires, échéance et statut.',
      'Index des sources utilisées et manquantes avec provenance, date, version, périmètre et emplacement gouverné.',
      'Rapport versionné avec indicateurs définis, contrôles effectués, réserves, décisions et preuve de validation humaine.',
      'Preuve de diffusion et d’archivage reliant le rapport, sa version, ses destinataires et les actions décidées.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Un journal n’est pas un rapport validé. Une consolidation ne corrige pas les erreurs de ses sources. Une période absente reste absente. Un indicateur sans définition, source, périmètre et fraîcheur reste indisponible. Une diffusion ne vaut pas approbation. La mémoire stratégique demeure une synthèse gouvernée, pas une source maîtresse concurrente.',
    articulationTitle: 'Articulation avec CNS-01 à CNS-07',
    articulation: 'CNS-01 à CNS-07 structurent décisions, processus, données, finances, ressources humaines, continuité et qualité. CNS-08 assemble leurs résultats datés dans des rapports traçables sans modifier leurs sources, leurs réserves ni leurs autorités de validation.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Chaque fonction produit et valide son fond métier ; Administration tient le calendrier et consolide les statuts ; Gouvernance approuve les rapports institutionnels et les décisions ; Finance contrôle ses chiffres ; la GED conserve versions et preuves ; le Knowledge Management alimente la mémoire stratégique avec les enseignements validés.',
    privacyTitle: 'Éléments conservés hors de cette vue',
    privacy: 'Pièces personnelles, financières ou juridiques détaillées, listes nominatives, destinataires restreints, secrets, preuves d’incident et annexes sensibles restent dans les espaces autorisés. Le reporting partagé ne conserve que les agrégats et statuts permis.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2, Matrice de cadrage V0.1 du 23.08.2026, contexte éditorial du Daily Intelligence V4, cycle gouverné des rapports d’activité, journal de planification et méthode de revue hebdomadaire. Résultat cible : journaux, rapports périodiques, indicateurs et décisions consolidés. Le périmètre détaillé reste à valider.',
    openReporting: 'Ouvrir le cycle de reporting institutionnel',
    openIntelligence: 'Ouvrir le Daily Intelligence',
    openJournal: 'Ouvrir le journal de planification',
    openKnowledge: 'Ouvrir le Knowledge Management'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-08 · Institutional reporting',
    status: 'Framework validated · detail to inventory',
    body: 'Connect journals, agenda, strategic memory, periodic reports, indicators and decisions in a traceable chain. This view turns neither a synthesis into a master source nor a publication into institutional approval.',
    noMeasure: 'Progress cannot be calculated · periods, deliverables, sources, responsibilities, evidence and calculation rule must be defined and validated',
    currentStage: 'Current work point',
    currentStageName: 'Define the reporting calendar, sources, controls and decisions',
    stages: ['Scope & calendar', 'Sources & collection', 'Control & consolidation', 'Indicators & analysis', 'Decisions & distribution', 'Retention & reuse'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Define periods, deliverables, owners, reviewers, recipients, deadlines and confidentiality levels.',
      'Connect every statement, figure and decision to a dated, versioned and identifiable source without filling missing periods.',
      'Check completeness, consistency, scope and freshness before consolidating or comparing indicators.',
      'Record content validation, approval, distribution, decisions, reservations and retention location as separate states.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Reporting calendar with period, deliverable, owner, reviewer, recipients, deadline and status.',
      'Index of used and missing sources with provenance, date, version, scope and governed location.',
      'Versioned report with defined indicators, completed controls, reservations, decisions and human-validation evidence.',
      'Distribution and retention evidence connecting the report, version, recipients and decided actions.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A journal is not a validated report. Consolidation does not correct source errors. A missing period remains missing. An indicator without definition, source, scope and freshness remains unavailable. Distribution is not approval. Strategic memory remains a governed synthesis, not a competing master source.',
    articulationTitle: 'Connection with CNS-01 through CNS-07',
    articulation: 'CNS-01 through CNS-07 structure decisions, processes, data, finance, human resources, continuity and quality. CNS-08 assembles their dated results into traceable reports without changing their sources, reservations or validation authorities.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Each function produces and validates its business content; Administration maintains the calendar and consolidates statuses; Governance approves institutional reports and decisions; Finance checks its figures; the DMS retains versions and evidence; Knowledge Management feeds strategic memory with validated lessons.',
    privacyTitle: 'Items retained outside this view',
    privacy: 'Detailed personal, financial or legal records, named lists, restricted recipients, secrets, incident evidence and sensitive appendices remain in authorised spaces. Shared reporting retains only permitted aggregates and statuses.',
    source: 'Framing sources: Global Institutional Programme Model V0.2, Framing Matrix V0.1 dated 23 Aug 2026, Daily Intelligence V4 editorial context, governed activity-reporting cycle, planning log and weekly-review method. Target result: consolidated journals, periodic reports, indicators and decisions. The detailed scope remains to be validated.',
    openReporting: 'Open institutional reporting cycle',
    openIntelligence: 'Open Daily Intelligence',
    openJournal: 'Open planning log',
    openKnowledge: 'Open Knowledge Management'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-08 · Institutionelles Reporting',
    status: 'Arbeitsrahmen validiert · Details zu inventarisieren',
    body: 'Journale, Agenda, strategisches Gedächtnis, periodische Berichte, Kennzahlen und Entscheidungen in einer nachvollziehbaren Kette verbinden. Diese Ansicht macht weder eine Synthese zur Masterquelle noch eine Veröffentlichung zur institutionellen Genehmigung.',
    noMeasure: 'Fortschritt nicht berechenbar · Zeiträume, Lieferobjekte, Quellen, Verantwortungen, Nachweise und Berechnungsregel sind zu definieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Reportingkalender, Quellen, Kontrollen und Entscheidungen definieren',
    stages: ['Umfang & Kalender', 'Quellen & Sammlung', 'Kontrolle & Konsolidierung', 'Kennzahlen & Analyse', 'Entscheidungen & Verteilung', 'Ablage & Wiederverwendung'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Zeiträume, Lieferobjekte, Verantwortungen, Prüfer, Empfänger, Fristen und Vertraulichkeitsstufen definieren.',
      'Jede Aussage, Zahl und Entscheidung mit einer datierten, versionierten und identifizierbaren Quelle verbinden, ohne fehlende Zeiträume zu füllen.',
      'Vollständigkeit, Kohärenz, Umfang und Aktualität vor jeder Konsolidierung oder Kennzahlenanalyse kontrollieren.',
      'Fachliche Validierung, Genehmigung, Verteilung, Entscheidungen, Vorbehalte und Ablageort als getrennte Status erfassen.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Reportingkalender mit Zeitraum, Lieferobjekt, Verantwortung, Prüfer, Empfängern, Frist und Status.',
      'Index verwendeter und fehlender Quellen mit Herkunft, Datum, Version, Umfang und gesteuertem Ablageort.',
      'Versionierter Bericht mit definierten Kennzahlen, ausgeführten Kontrollen, Vorbehalten, Entscheidungen und menschlichem Validierungsnachweis.',
      'Verteilungs- und Ablagenachweis, der Bericht, Version, Empfänger und beschlossene Maßnahmen verbindet.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein Journal ist kein validierter Bericht. Konsolidierung korrigiert keine Quellenfehler. Ein fehlender Zeitraum bleibt fehlend. Eine Kennzahl ohne Definition, Quelle, Umfang und Aktualität bleibt nicht verfügbar. Verteilung ist keine Genehmigung. Das strategische Gedächtnis bleibt eine gesteuerte Synthese und keine konkurrierende Masterquelle.',
    articulationTitle: 'Verbindung mit CNS-01 bis CNS-07',
    articulation: 'CNS-01 bis CNS-07 strukturieren Entscheidungen, Prozesse, Daten, Finanzen, Personal, Kontinuität und Qualität. CNS-08 führt ihre datierten Ergebnisse in nachvollziehbaren Berichten zusammen, ohne Quellen, Vorbehalte oder Validierungsbefugnisse zu verändern.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Jede Funktion erstellt und validiert ihren Fachinhalt; Administration führt den Kalender und konsolidiert Status; Governance genehmigt institutionelle Berichte und Entscheidungen; Finanzen kontrolliert ihre Zahlen; die GED bewahrt Versionen und Nachweise; Knowledge Management speist das strategische Gedächtnis mit validierten Erkenntnissen.',
    privacyTitle: 'Elemente außerhalb dieser Ansicht',
    privacy: 'Detaillierte persönliche, finanzielle oder rechtliche Unterlagen, Namenslisten, eingeschränkte Empfänger, Geheimnisse, Störungsnachweise und sensible Anhänge bleiben in autorisierten Bereichen. Das geteilte Reporting enthält nur zulässige Aggregate und Status.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2, Strukturierungsmatrix V0.1 vom 23.08.2026, redaktioneller Kontext der Daily Intelligence V4, gesteuerter Tätigkeitsberichtszyklus, Planungsjournal und Methode der Wochenreview. Zielergebnis: konsolidierte Journale, periodische Berichte, Kennzahlen und Entscheidungen. Der Detailumfang bleibt zu validieren.',
    openReporting: 'Institutionellen Berichtszyklus öffnen',
    openIntelligence: 'Daily Intelligence öffnen',
    openJournal: 'Planungsjournal öffnen',
    openKnowledge: 'Knowledge Management öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2"><Icon className={accent} size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
    <ul className="mt-3 space-y-2">
      {items.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-sky-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  </article>
);

const InstitutionalReportingConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-reporting-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-sky-700/70 bg-sky-950/30 px-3 py-2 text-xs font-semibold text-sky-100"><ShieldCheck size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="blue" />

      <InstitutionalConsolidationDecisionRecord cnsId="CNS-08" language={language} />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-sky-700/70 bg-sky-950/35 px-2.5 py-1 font-semibold text-sky-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage, index) => <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${index === 0 ? 'border-sky-500 bg-sky-950/40 text-sky-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}><span className="mb-1 block">{index + 1}</span>{t.stages[index]}</li>)}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ClipboardList} title={t.tasksTitle} items={t.tasks} accent="text-sky-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><AlertTriangle className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><LineChart className="text-sky-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><CalendarClock className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><History className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="max-w-5xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={() => onNavigate(`/administration?tab=processes&${returnContext}#process-reports`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><Files size={16} aria-hidden="true" />{t.openReporting}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/?view=intelligence&returnView=program&returnSection=${sectionId}`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"><BookOpenText size={16} aria-hidden="true" />{t.openIntelligence}</button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=planning&${returnContext}#planning-journal-register`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"><CalendarClock size={16} aria-hidden="true" />{t.openJournal}</button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=knowledge&${returnContext}`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"><History size={16} aria-hidden="true" />{t.openKnowledge}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalReportingConsolidationPilot;
