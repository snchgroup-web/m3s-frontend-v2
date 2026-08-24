import React from 'react';
import {
  ArrowRight,
  Archive,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FolderCog,
  ListChecks,
  Network,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';
import InstitutionalProcessesArbitrationProposal from './InstitutionalProcessesArbitrationProposal';

const STAGES = ['scope', 'inputs', 'roles', 'controls', 'evidence', 'review'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-02 · Processus et procédures',
    status: 'Périmètre cible à définir',
    body: 'Structurer les processus essentiels de 2SG, leurs rôles, contrôles, preuves et règles de revue afin de rendre l’exécution répétable et vérifiable. Cette composante ne présume ni que le manuel de procédures est complet, ni que les processus décrits sont déjà appliqués.',
    noMeasure: 'Progression non calculable · processus critiques, propriétaires, contrôles minimaux, preuves et règle de revue à inventorier puis valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Prioriser les processus critiques et leur contrôle minimal',
    stages: ['Périmètre critique', 'Entrées & résultats', 'Rôles & décisions', 'Contrôles minimaux', 'Preuves & archives', 'Revue & amélioration'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Inventorier puis prioriser les processus critiques par famille, fonction, risque, fréquence et dépendance.',
      'Définir pour chaque processus le déclencheur, les entrées, les étapes, le résultat attendu et les limites explicites.',
      'Attribuer propriétaire métier, responsables d’exécution, contrôle, validation, décision et règles d’escalade.',
      'Versionner les procédures et organiser leur revue après incident, écart, changement ou échéance prévue.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Fiche processus versionnée avec périmètre, résultat cible, rôles, étapes et dépendances.',
      'Procédure approuvée lorsque nécessaire, avec date d’effet, exceptions et prochaine revue.',
      'Résultat de contrôle relié à une preuve recevable, un écart éventuel et une action corrective.',
      'Historique GED des versions, décisions, dossiers d’exécution, preuves et archives closes.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Un processus décrit n’est pas nécessairement appliqué. Une procédure présente ne prouve ni son approbation, ni son usage, ni l’efficacité de ses contrôles. Toute clôture doit conserver le résultat, les écarts, les décisions et les preuves attendues.',
    articulationTitle: 'Articulation avec CNS-01',
    articulation: 'CNS-01 gouverne les décisions, obligations, échéances et écarts. CNS-02 traduit les exigences validées en chaînes de travail répétables, contrôlables et documentées, sans modifier les mandats ni les responsabilités légales.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'La fonction propriétaire valide le fond et le résultat ; Administration coordonne le registre, les versions et les revues ; la Gouvernance approuve les règles et exceptions sensibles ; la GED conserve les preuves ; IT & Support opère les contrôles techniques.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Données personnelles, habilitations, secrets techniques, avis juridiques, paiements, pièces contractuelles et preuves détaillées restent dans les espaces autorisés. Cette vue publie uniquement la méthode de consolidation.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2 et Matrice de cadrage V0.1 du 23.08.2026. Résultat cible : processus essentiels décrits, rôles et contrôles appliqués. Le périmètre détaillé reste à valider.',
    openAdmin: 'Ouvrir Processus Administration',
    openControls: 'Ouvrir les contrôles globaux',
    openResources: 'Ouvrir les ressources processus'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-02 · Processes and procedures',
    status: 'Target scope to define',
    body: 'Structure 2SG essential processes, roles, controls, evidence and review rules so execution becomes repeatable and verifiable. This component assumes neither that the procedures manual is complete nor that documented processes are already applied.',
    noMeasure: 'Progress cannot be calculated · critical processes, owners, minimum controls, evidence and review rule must be inventoried and validated',
    currentStage: 'Current work point',
    currentStageName: 'Prioritise critical processes and their minimum control',
    stages: ['Critical scope', 'Inputs & outcomes', 'Roles & decisions', 'Minimum controls', 'Evidence & archives', 'Review & improvement'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Inventory and prioritise critical processes by family, function, risk, frequency and dependency.',
      'Define each process trigger, inputs, steps, expected outcome and explicit boundaries.',
      'Assign the business owner, execution, control, validation and decision roles, and escalation rules.',
      'Version procedures and organise reviews after incidents, deviations, changes or planned deadlines.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned process sheet with scope, target outcome, roles, steps and dependencies.',
      'Approved procedure where required, with effective date, exceptions and next review.',
      'Control result linked to acceptable evidence, any deviation and corrective action.',
      'DMS history of versions, decisions, execution files, evidence and closed archives.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A documented process is not necessarily applied. An available procedure proves neither approval, use nor control effectiveness. Every closure must retain the outcome, deviations, decisions and expected evidence.',
    articulationTitle: 'Connection with CNS-01',
    articulation: 'CNS-01 governs decisions, obligations, deadlines and deviations. CNS-02 translates validated requirements into repeatable, controllable and documented work chains without changing mandates or legal responsibilities.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'The owning function validates substance and outcome; Administration coordinates the register, versions and reviews; Governance approves rules and sensitive exceptions; the DMS retains evidence; IT & Support operates technical controls.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Personal data, permissions, technical secrets, legal opinions, payments, contractual records and detailed evidence remain in authorised spaces. This view only publishes the consolidation method.',
    source: 'Framing sources: Global Institutional Programme Model V0.2 and Framing Matrix V0.1 dated 23 Aug 2026. Target result: essential processes described, roles and controls applied. The detailed scope remains to be validated.',
    openAdmin: 'Open Administration processes',
    openControls: 'Open global controls',
    openResources: 'Open process resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-02 · Prozesse und Verfahren',
    status: 'Zielumfang zu definieren',
    body: 'Die wesentlichen Prozesse von 2SG mit Rollen, Kontrollen, Nachweisen und Prüfregeln strukturieren, damit die Ausführung wiederholbar und überprüfbar wird. Diese Komponente setzt weder ein vollständiges Verfahrenshandbuch noch bereits angewandte Prozesse voraus.',
    noMeasure: 'Fortschritt nicht berechenbar · kritische Prozesse, Verantwortungen, Mindestkontrollen, Nachweise und Prüfregel sind zu inventarisieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Kritische Prozesse und ihre Mindestkontrolle priorisieren',
    stages: ['Kritischer Umfang', 'Eingaben & Ergebnisse', 'Rollen & Entscheidungen', 'Mindestkontrollen', 'Nachweise & Archive', 'Prüfung & Verbesserung'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Kritische Prozesse nach Familie, Funktion, Risiko, Häufigkeit und Abhängigkeit inventarisieren und priorisieren.',
      'Für jeden Prozess Auslöser, Eingaben, Schritte, erwartetes Ergebnis und klare Grenzen festlegen.',
      'Fachverantwortung, Ausführung, Kontrolle, Validierung, Entscheidung und Eskalationsregeln zuordnen.',
      'Verfahren versionieren und Prüfungen nach Vorfällen, Abweichungen, Änderungen oder Fristen organisieren.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Prozessblatt mit Umfang, Zielergebnis, Rollen, Schritten und Abhängigkeiten.',
      'Falls erforderlich genehmigtes Verfahren mit Gültigkeitsdatum, Ausnahmen und nächster Prüfung.',
      'Kontrollergebnis mit zulässigem Nachweis, möglicher Abweichung und Korrekturmaßnahme.',
      'GED-Historie der Versionen, Entscheidungen, Ausführungsakten, Nachweise und geschlossenen Archive.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein beschriebener Prozess wird nicht zwingend angewandt. Ein vorhandenes Verfahren beweist weder Genehmigung, Nutzung noch Kontrollwirksamkeit. Jeder Abschluss muss Ergebnis, Abweichungen, Entscheidungen und erwartete Nachweise sichern.',
    articulationTitle: 'Verbindung mit CNS-01',
    articulation: 'CNS-01 steuert Entscheidungen, Pflichten, Fristen und Abweichungen. CNS-02 übersetzt validierte Anforderungen in wiederholbare, kontrollierbare und dokumentierte Arbeitsketten, ohne Mandate oder rechtliche Verantwortungen zu ändern.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Die verantwortliche Funktion validiert Inhalt und Ergebnis; Administration koordiniert Register, Versionen und Prüfungen; Governance genehmigt Regeln und sensible Ausnahmen; die GED sichert Nachweise; IT & Support betreibt technische Kontrollen.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Personendaten, Berechtigungen, technische Geheimnisse, Rechtsgutachten, Zahlungen, Vertragsunterlagen und Detailnachweise bleiben in autorisierten Bereichen. Diese Ansicht veröffentlicht nur die Konsolidierungsmethode.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2 und Strukturierungsmatrix V0.1 vom 23.08.2026. Zielergebnis: wesentliche Prozesse beschrieben, Rollen und Kontrollen angewandt. Der Detailumfang bleibt zu validieren.',
    openAdmin: 'Verwaltungsprozesse öffnen',
    openControls: 'Globale Kontrollen öffnen',
    openResources: 'Prozessressourcen öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2"><Icon className={accent} size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
    <ul className="mt-3 space-y-2">
      {items.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  </article>
);

const InstitutionalProcessesProceduresConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-processes-procedures-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-cyan-700/70 bg-cyan-950/30 px-3 py-2 text-xs font-semibold text-cyan-100"><Workflow size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="cyan" />

      <InstitutionalProcessesArbitrationProposal language={language} />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-cyan-700/70 bg-cyan-950/35 px-2.5 py-1 font-semibold text-cyan-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage, index) => <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${index === 0 ? 'border-cyan-500 bg-cyan-950/40 text-cyan-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}><span className="mb-1 block">{index + 1}</span>{t.stages[index]}</li>)}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ListChecks} title={t.tasksTitle} items={t.tasks} accent="text-cyan-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Network className="text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ClipboardCheck className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Archive className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/administration?tab=processes&${returnContext}#process-top`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><Workflow size={16} aria-hidden="true" />{t.openAdmin}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/?view=processes&${returnContext}#minimum-global-controls`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><ShieldCheck size={16} aria-hidden="true" />{t.openControls}</button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=resources&${returnContext}#administration-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><FolderCog size={16} aria-hidden="true" />{t.openResources}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalProcessesProceduresConsolidationPilot;
