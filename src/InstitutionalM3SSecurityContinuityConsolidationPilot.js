import React from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  DatabaseBackup,
  FileClock,
  LifeBuoy,
  Network,
  RotateCcw,
  ServerCog,
  ShieldCheck,
  Siren
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const STAGES = ['scope', 'stability', 'protection', 'backup', 'incident', 'review'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-06 · M3S, sécurité et continuité',
    status: 'Périmètre cible à définir',
    body: 'Consolider la stabilité, la sécurité, la continuité et la gestion des incidents de M3S et des services numériques critiques de 2SG. Cette vue ne publie aucun secret et ne présume ni homologation, ni résilience, ni absence de risque.',
    noMeasure: 'Progression non calculable · services critiques, critères, contrôles, preuves, responsabilités et règle de revue à définir et valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Définir les critères de stabilité, sécurité, continuité et gestion d’incident',
    stages: ['Périmètre critique', 'Stabilité & services', 'Identités & protection', 'Sauvegarde & restauration', 'Incident & reprise', 'Revue & continuité'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Inventorier les services critiques, données, dépendances, responsables et effets d’une indisponibilité.',
      'Définir les critères de stabilité, disponibilité, changement autorisé, accès minimal et retrait des droits.',
      'Formaliser sauvegarde, restauration testée, solution de repli, dépendances externes et reprise priorisée.',
      'Définir la qualification, l’alerte, le confinement, la reprise, la clôture et le retour d’expérience d’un incident.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Inventaire versionné des services et dépendances avec criticité candidate, responsable et critères de contrôle.',
      'Revue non secrète des accès et changements, reliée aux autorisations, dates, résultats et traces d’audit.',
      'Preuve de sauvegarde et de restauration testée avec périmètre, date, résultat, écart et décision humaine.',
      'Registre ou exercice d’incident documentant impact, chronologie, actions, reprise, clôture et enseignements.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Un service accessible n’est pas automatiquement stable, sécurisé ou autorisé. Une sauvegarde déclarée ne prouve pas la restauration. L’absence d’incident enregistré ne prouve pas l’absence de risque. Une prévisualisation verte ne démontre pas la continuité de la production.',
    articulationTitle: 'Articulation avec MEP-04 et CNS-01 à CNS-05',
    articulation: 'MEP-04 installe le socle numérique ; CNS-01 autorise risques et droits ; CNS-02 structure les processus ; CNS-03 gouverne données et référentiels ; CNS-04 encadre les preuves financières ; CNS-05 relie rôles et capacités. CNS-06 contrôle la stabilité et la continuité sans déclarer de maturité acquise.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'IT & Support tient l’inventaire technique et exécute les contrôles autorisés ; les fonctions métier qualifient l’impact et valident la reprise fonctionnelle ; Gouvernance accepte les risques et exceptions ; Administration suit revues et échéances ; la GED conserve les preuves non secrètes ; Conformité ou un professionnel compétent intervient selon la nature de l’incident.',
    privacyTitle: 'Éléments conservés hors de cette vue',
    privacy: 'Mots de passe, jetons, clés, secrets, configurations exploitables, topologies détaillées, vulnérabilités, journaux sensibles, sauvegardes, données personnelles et dossiers complets d’incident restent dans des espaces restreints. La vue publique ne contient que la méthode et des statuts non exploitables.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2, Matrice de cadrage V0.1 du 23.08.2026, MEP-04 publié et architecture IT & Support actuelle. Résultat cible : modules stabilisés, accès contrôlés, sauvegardes et incidents suivis. Le périmètre détaillé reste à valider.',
    openArchitecture: 'Ouvrir l’architecture IT',
    openProcesses: 'Ouvrir les processus IT',
    openSupport: 'Ouvrir l’aide & incidents',
    openResources: 'Ouvrir les ressources IT'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-06 · M3S, security and continuity',
    status: 'Target scope to define',
    body: 'Consolidate the stability, security, continuity and incident management of M3S and 2SG critical digital services. This view publishes no secret and assumes neither approval, resilience nor absence of risk.',
    noMeasure: 'Progress cannot be calculated · critical services, criteria, controls, evidence, responsibilities and review rule must be defined and validated',
    currentStage: 'Current work point',
    currentStageName: 'Define stability, security, continuity and incident-management criteria',
    stages: ['Critical scope', 'Stability & services', 'Identities & protection', 'Backup & restoration', 'Incident & recovery', 'Review & continuity'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Inventory critical services, data, dependencies, owners and the effects of unavailability.',
      'Define stability, availability, authorised change, minimum access and entitlement-removal criteria.',
      'Formalise backups, tested restoration, fallback, external dependencies and prioritised recovery.',
      'Define incident qualification, alert, containment, recovery, closure and lessons learned.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned inventory of services and dependencies with candidate criticality, owner and control criteria.',
      'Non-secret review of access and changes linked to authorisations, dates, results and audit records.',
      'Evidence of backup and tested restoration with scope, date, result, deviation and human decision.',
      'Incident register or exercise documenting impact, timeline, actions, recovery, closure and lessons.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'An accessible service is not automatically stable, secure or authorised. A declared backup does not prove restoration. No recorded incident does not prove the absence of risk. A green preview does not demonstrate production continuity.',
    articulationTitle: 'Connection with MEP-04 and CNS-01 through CNS-05',
    articulation: 'MEP-04 establishes the digital foundation; CNS-01 authorises risks and rights; CNS-02 structures processes; CNS-03 governs data and reference systems; CNS-04 frames financial evidence; CNS-05 connects roles and capabilities. CNS-06 controls stability and continuity without claiming maturity.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'IT & Support maintains the technical inventory and performs authorised controls; business functions qualify impact and validate functional recovery; Governance accepts risks and exceptions; Administration tracks reviews and deadlines; the DMS retains non-secret evidence; Compliance or a competent professional intervenes according to the incident.',
    privacyTitle: 'Items retained outside this view',
    privacy: 'Passwords, tokens, keys, secrets, exploitable configurations, detailed topologies, vulnerabilities, sensitive logs, backups, personal data and complete incident files remain in restricted spaces. The public view contains only the method and non-exploitable statuses.',
    source: 'Framing sources: Global Institutional Programme Model V0.2, Framing Matrix V0.1 dated 23 Aug 2026, published MEP-04 and the current IT & Support architecture. Target result: stabilised modules, controlled access, backups and tracked incidents. The detailed scope remains to be validated.',
    openArchitecture: 'Open IT architecture',
    openProcesses: 'Open IT processes',
    openSupport: 'Open help & incidents',
    openResources: 'Open IT resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-06 · M3S, Sicherheit und Kontinuität',
    status: 'Zielumfang zu definieren',
    body: 'Stabilität, Sicherheit, Kontinuität und Störungsmanagement von M3S und kritischen digitalen 2SG-Diensten konsolidieren. Diese Ansicht veröffentlicht keine Geheimnisse und setzt weder Freigabe, Widerstandsfähigkeit noch Risikofreiheit voraus.',
    noMeasure: 'Fortschritt nicht berechenbar · kritische Dienste, Kriterien, Kontrollen, Nachweise, Verantwortungen und Prüfregel sind zu definieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Kriterien für Stabilität, Sicherheit, Kontinuität und Störungsmanagement definieren',
    stages: ['Kritischer Umfang', 'Stabilität & Dienste', 'Identitäten & Schutz', 'Sicherung & Wiederherstellung', 'Störung & Wiederanlauf', 'Prüfung & Kontinuität'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Kritische Dienste, Daten, Abhängigkeiten, Verantwortungen und Folgen einer Nichtverfügbarkeit inventarisieren.',
      'Kriterien für Stabilität, Verfügbarkeit, autorisierte Änderungen, Mindestzugriff und Rechteentzug definieren.',
      'Sicherung, geprüfte Wiederherstellung, Rückfalllösung, externe Abhängigkeiten und priorisierten Wiederanlauf formalisieren.',
      'Qualifikation, Alarmierung, Eindämmung, Wiederanlauf, Abschluss und Erkenntnisse einer Störung definieren.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Inventar der Dienste und Abhängigkeiten mit Kandidatenkritikalität, Verantwortung und Kontrollkriterien.',
      'Nicht geheime Prüfung von Zugriffen und Änderungen mit Autorisierungen, Daten, Ergebnissen und Auditnachweisen.',
      'Nachweis von Sicherung und geprüfter Wiederherstellung mit Umfang, Datum, Ergebnis, Abweichung und menschlichem Entscheid.',
      'Störungsregister oder Übung mit Auswirkung, Chronologie, Maßnahmen, Wiederanlauf, Abschluss und Erkenntnissen.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein erreichbarer Dienst ist nicht automatisch stabil, sicher oder autorisiert. Eine deklarierte Sicherung beweist keine Wiederherstellung. Keine registrierte Störung beweist nicht die Abwesenheit von Risiken. Eine grüne Vorschau belegt keine Produktionskontinuität.',
    articulationTitle: 'Verbindung mit MEP-04 und CNS-01 bis CNS-05',
    articulation: 'MEP-04 schafft die digitale Grundlage; CNS-01 autorisiert Risiken und Rechte; CNS-02 strukturiert Prozesse; CNS-03 steuert Daten und Referenzsysteme; CNS-04 rahmt Finanznachweise; CNS-05 verbindet Rollen und Kapazitäten. CNS-06 kontrolliert Stabilität und Kontinuität, ohne Reife zu behaupten.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'IT & Support führt das technische Inventar und autorisierte Kontrollen; Fachfunktionen qualifizieren Auswirkungen und bestätigen die funktionale Wiederherstellung; Governance akzeptiert Risiken und Ausnahmen; Administration verfolgt Prüfungen und Fristen; die GED bewahrt nicht geheime Nachweise; Compliance oder Fachpersonen wirken je nach Störung mit.',
    privacyTitle: 'Elemente außerhalb dieser Ansicht',
    privacy: 'Passwörter, Token, Schlüssel, Geheimnisse, nutzbare Konfigurationen, detaillierte Topologien, Schwachstellen, sensible Protokolle, Sicherungen, personenbezogene Daten und vollständige Störungsakten bleiben in geschützten Bereichen. Die öffentliche Ansicht enthält nur Methode und nicht nutzbare Status.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2, Strukturierungsmatrix V0.1 vom 23.08.2026, veröffentlichtes MEP-04 und aktuelle IT-&-Support-Architektur. Zielergebnis: stabilisierte Module, kontrollierte Zugriffe, Sicherungen und verfolgte Störungen. Der Detailumfang bleibt zu validieren.',
    openArchitecture: 'IT-Architektur öffnen',
    openProcesses: 'IT-Prozesse öffnen',
    openSupport: 'Hilfe & Störungen öffnen',
    openResources: 'IT-Ressourcen öffnen'
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

const InstitutionalM3SSecurityContinuityConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-m3s-security-continuity-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-cyan-700/70 bg-cyan-950/30 px-3 py-2 text-xs font-semibold text-cyan-100"><ShieldCheck size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="cyan" />

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
        <ListBlock icon={ServerCog} title={t.tasksTitle} items={t.tasks} accent="text-cyan-300" />
        <ListBlock icon={DatabaseBackup} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Siren className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Network className="text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Activity className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><FileClock className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="max-w-5xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={() => onNavigate(`/ged?tab=architecture&${returnContext}#it-support-architecture-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><Network size={16} aria-hidden="true" />{t.openArchitecture}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=processes&${returnContext}#it-support-process-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><RotateCcw size={16} aria-hidden="true" />{t.openProcesses}</button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=help-support&${returnContext}#it-help-support`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><LifeBuoy size={16} aria-hidden="true" />{t.openSupport}</button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=resources&${returnContext}#it-support-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><DatabaseBackup size={16} aria-hidden="true" />{t.openResources}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalM3SSecurityContinuityConsolidationPilot;
