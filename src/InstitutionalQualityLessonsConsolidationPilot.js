import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  History,
  ListChecks,
  NotebookTabs,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const STAGES = ['scope', 'review', 'reservations', 'correction', 'decision', 'lessons'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-07 · Qualité et retours d’expérience',
    status: 'Périmètre cible à définir',
    body: 'Évaluer les pilotes, livrables et processus, traiter leurs réserves puis capitaliser les enseignements utiles. Cette vue ne présume ni réception, ni qualité acquise, ni clôture et ne remplace pas la validation de la fonction compétente.',
    noMeasure: 'Progression non calculable · périmètre, critères d’acceptation, réserves, preuves, responsabilités et règle de clôture à définir et valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Définir la revue, les réserves, la décision de clôture et la capitalisation',
    stages: ['Périmètre & critères', 'Revue & constats', 'Réserves & criticité', 'Actions correctives', 'Décision & clôture', 'Capitalisation & réemploi'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Définir avant la revue l’objet, sa version, les critères d’acceptation, le responsable, le contrôleur et les preuves attendues.',
      'Consigner les constats et réserves en séparant fait observé, hypothèse et appréciation, avec criticité, responsable et échéance.',
      'Suivre correction, nouveau contrôle, résultat, risque résiduel et décision : accepter, accepter avec réserves, refuser ou différer.',
      'Capitaliser les enseignements réutilisables dans la GED et le Knowledge Management sans écraser la source maîtresse.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Fiche ou checklist de revue indiquant périmètre, version, critères, contrôleur, date et résultat observé.',
      'Registre de réserves avec source, criticité candidate, action, responsable, échéance, statut et preuve de traitement.',
      'Preuve de nouveau contrôle ou de réception avec résultat, réserves restantes, risque accepté et décision humaine.',
      'Retour d’expérience relié aux faits, décisions, améliorations proposées, éléments réutilisables et emplacement de conservation.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Un livrable remis n’est pas automatiquement accepté. L’absence de réserve enregistrée ne prouve pas la qualité. Une preuve visuelle ne démontre pas toujours le résultat fonctionnel. Une correction n’est pas clôturée sans nouveau contrôle et décision. Une acceptation avec réserves n’est pas une réception sans réserve.',
    articulationTitle: 'Articulation avec CNS-01 à CNS-06',
    articulation: 'CNS-01 à CNS-06 cadrent gouvernance, processus, données, finances, ressources humaines, sécurité et continuité. CNS-07 organise leur revue transversale, le traitement des écarts et la capitalisation, sans requalifier leurs preuves ni déclarer leur maturité.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'La fonction responsable définit les critères et traite les écarts ; le contrôleur qualifie les constats sans se substituer au décideur ; Gouvernance arbitre les réserves et risques significatifs ; Administration suit décisions et échéances ; la GED conserve les preuves ; le Knowledge Management capitalise les enseignements validés.',
    privacyTitle: 'Éléments conservés hors de cette vue',
    privacy: 'Données personnelles, détails de vulnérabilité, pièces financières privées, avis juridiques, contrats sensibles, preuves d’incident restreintes et dossiers complets de réserve restent dans leurs espaces autorisés. Cette vue conserve uniquement la méthode et des statuts non sensibles.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2, Matrice de cadrage V0.1 du 23.08.2026, cycle gouverné des rapports d’activité, revue hebdomadaire pilote, méthode minimale de projet et vues Incidents & Risques. Résultat cible : pilotes évalués, réserves traitées et enseignements capitalisés. Le périmètre détaillé reste à valider.',
    openReporting: 'Ouvrir le cycle de reporting',
    openReview: 'Ouvrir la revue hebdomadaire',
    openJournal: 'Ouvrir le journal de planification',
    openKnowledge: 'Ouvrir le Knowledge Management'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-07 · Quality and lessons learned',
    status: 'Target scope to define',
    body: 'Evaluate pilots, deliverables and processes, address their reservations and retain useful lessons. This view assumes neither acceptance, achieved quality nor closure and does not replace validation by the competent function.',
    noMeasure: 'Progress cannot be calculated · scope, acceptance criteria, reservations, evidence, responsibilities and closure rule must be defined and validated',
    currentStage: 'Current work point',
    currentStageName: 'Define review, reservations, closure decision and knowledge retention',
    stages: ['Scope & criteria', 'Review & findings', 'Reservations & criticality', 'Corrective actions', 'Decision & closure', 'Lessons & reuse'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Before review, define the item, version, acceptance criteria, owner, reviewer and expected evidence.',
      'Record findings and reservations by separating observed fact, assumption and assessment, with criticality, owner and deadline.',
      'Track correction, retest, result, residual risk and decision: accept, accept with reservations, reject or defer.',
      'Retain reusable lessons in the DMS and Knowledge Management without overwriting the master source.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Review sheet or checklist stating scope, version, criteria, reviewer, date and observed result.',
      'Reservation register with source, candidate criticality, action, owner, deadline, status and treatment evidence.',
      'Retest or acceptance evidence with result, remaining reservations, accepted risk and human decision.',
      'Lessons-learned note linked to facts, decisions, proposed improvements, reusable elements and retention location.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A delivered item is not automatically accepted. No recorded reservation does not prove quality. Visual evidence does not always demonstrate the functional result. A correction is not closed without retest and decision. Acceptance with reservations is not acceptance without reservations.',
    articulationTitle: 'Connection with CNS-01 through CNS-06',
    articulation: 'CNS-01 through CNS-06 frame governance, processes, data, finance, human resources, security and continuity. CNS-07 organises their cross-functional review, deviation treatment and knowledge retention without reclassifying their evidence or claiming maturity.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'The responsible function defines criteria and addresses deviations; the reviewer qualifies findings without replacing the decision-maker; Governance arbitrates significant reservations and risks; Administration tracks decisions and deadlines; the DMS retains evidence; Knowledge Management retains validated lessons.',
    privacyTitle: 'Items retained outside this view',
    privacy: 'Personal data, vulnerability details, private financial evidence, legal opinions, sensitive contracts, restricted incident evidence and complete reservation files remain in authorised spaces. This view retains only the method and non-sensitive statuses.',
    source: 'Framing sources: Global Institutional Programme Model V0.2, Framing Matrix V0.1 dated 23 Aug 2026, governed activity-reporting cycle, pilot weekly review, minimum project method and Incidents & Risks views. Target result: evaluated pilots, addressed reservations and retained lessons. The detailed scope remains to be validated.',
    openReporting: 'Open reporting cycle',
    openReview: 'Open weekly review',
    openJournal: 'Open planning log',
    openKnowledge: 'Open Knowledge Management'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-07 · Qualität und Erfahrungsrückfluss',
    status: 'Zielumfang zu definieren',
    body: 'Piloten, Lieferobjekte und Prozesse bewerten, Vorbehalte bearbeiten und nützliche Erkenntnisse sichern. Diese Ansicht setzt weder Abnahme, erreichte Qualität noch Abschluss voraus und ersetzt nicht die Validierung durch die zuständige Funktion.',
    noMeasure: 'Fortschritt nicht berechenbar · Umfang, Abnahmekriterien, Vorbehalte, Nachweise, Verantwortungen und Abschlussregel sind zu definieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Prüfung, Vorbehalte, Abschlussentscheid und Wissenssicherung definieren',
    stages: ['Umfang & Kriterien', 'Prüfung & Feststellungen', 'Vorbehalte & Kritikalität', 'Korrekturmaßnahmen', 'Entscheid & Abschluss', 'Erkenntnisse & Wiederverwendung'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Vor der Prüfung Objekt, Version, Abnahmekriterien, Verantwortung, Prüfer und erwartete Nachweise definieren.',
      'Feststellungen und Vorbehalte erfassen und beobachtete Tatsache, Annahme und Bewertung mit Kritikalität, Verantwortung und Frist trennen.',
      'Korrektur, erneute Kontrolle, Ergebnis, Restrisiko und Entscheid verfolgen: annehmen, mit Vorbehalten annehmen, ablehnen oder vertagen.',
      'Wiederverwendbare Erkenntnisse in GED und Knowledge Management sichern, ohne die maßgebliche Quelle zu überschreiben.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Prüfblatt oder Checkliste mit Umfang, Version, Kriterien, Prüfer, Datum und beobachtetem Ergebnis.',
      'Vorbehaltsregister mit Quelle, Kandidatenkritikalität, Maßnahme, Verantwortung, Frist, Status und Bearbeitungsnachweis.',
      'Nachweis der erneuten Kontrolle oder Abnahme mit Ergebnis, verbleibenden Vorbehalten, akzeptiertem Risiko und menschlichem Entscheid.',
      'Erfahrungsbericht mit Fakten, Entscheidungen, Verbesserungsvorschlägen, wiederverwendbaren Elementen und Ablageort.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein geliefertes Element ist nicht automatisch abgenommen. Kein erfasster Vorbehalt beweist keine Qualität. Ein visueller Nachweis belegt nicht immer das funktionale Ergebnis. Eine Korrektur ist ohne erneute Kontrolle und Entscheid nicht abgeschlossen. Eine Annahme mit Vorbehalten ist keine vorbehaltlose Abnahme.',
    articulationTitle: 'Verbindung mit CNS-01 bis CNS-06',
    articulation: 'CNS-01 bis CNS-06 strukturieren Governance, Prozesse, Daten, Finanzen, Personal, Sicherheit und Kontinuität. CNS-07 organisiert deren funktionsübergreifende Prüfung, Abweichungsbearbeitung und Wissenssicherung, ohne Nachweise neu zu qualifizieren oder Reife zu behaupten.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Die verantwortliche Funktion definiert Kriterien und bearbeitet Abweichungen; die prüfende Person qualifiziert Feststellungen, ohne den Entscheider zu ersetzen; Governance entscheidet über wesentliche Vorbehalte und Risiken; Administration verfolgt Entscheidungen und Fristen; die GED bewahrt Nachweise; Knowledge Management sichert validierte Erkenntnisse.',
    privacyTitle: 'Elemente außerhalb dieser Ansicht',
    privacy: 'Personendaten, Schwachstellendetails, private Finanznachweise, Rechtsgutachten, sensible Verträge, geschützte Störungsnachweise und vollständige Vorbehaltsakten bleiben in autorisierten Bereichen. Diese Ansicht enthält nur die Methode und nicht sensible Status.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2, Strukturierungsmatrix V0.1 vom 23.08.2026, gesteuerter Tätigkeitsberichtszyklus, Pilot-Wochenreview, minimale Projektmethode sowie Ansichten Störungen & Risiken. Zielergebnis: bewertete Piloten, bearbeitete Vorbehalte und gesicherte Erkenntnisse. Der Detailumfang bleibt zu validieren.',
    openReporting: 'Berichtszyklus öffnen',
    openReview: 'Wochenreview öffnen',
    openJournal: 'Planungsjournal öffnen',
    openKnowledge: 'Knowledge Management öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2"><Icon className={accent} size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
    <ul className="mt-3 space-y-2">
      {items.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  </article>
);

const InstitutionalQualityLessonsConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-quality-lessons-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-100"><ShieldCheck size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="emerald" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-emerald-700/70 bg-emerald-950/35 px-2.5 py-1 font-semibold text-emerald-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage, index) => <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${index === 0 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}><span className="mb-1 block">{index + 1}</span>{t.stages[index]}</li>)}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ListChecks} title={t.tasksTitle} items={t.tasks} accent="text-emerald-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><AlertTriangle className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><RefreshCcw className="text-emerald-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ClipboardCheck className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><History className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="max-w-5xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={() => onNavigate(`/administration?tab=processes&${returnContext}#process-reports`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><ClipboardCheck size={16} aria-hidden="true" />{t.openReporting}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=processes&${returnContext}#weekly-review-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"><BookOpenCheck size={16} aria-hidden="true" />{t.openReview}</button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=planning&${returnContext}#planning-journal-register`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"><NotebookTabs size={16} aria-hidden="true" />{t.openJournal}</button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=knowledge&${returnContext}`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"><History size={16} aria-hidden="true" />{t.openKnowledge}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalQualityLessonsConsolidationPilot;
