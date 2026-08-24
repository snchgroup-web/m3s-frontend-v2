import React from 'react';
import {
  ArrowRight,
  Archive,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileKey2,
  FolderLock,
  GraduationCap,
  Network,
  ShieldCheck,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';
import InstitutionalConsolidationDecisionRecord from './InstitutionalConsolidationDecisionRecord';

const STAGES = ['scope', 'roles', 'files', 'contracts', 'capabilities', 'review'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-05 · Ressources humaines et capacités',
    status: 'Cadre validé · détail à inventorier',
    body: 'Structurer les rôles, compétences, contrats, dossiers individuels et besoins de capacité de 2SG. Cette composante ne présume ni qu’une personne est engagée, ni qu’un contrat est valide, ni qu’un droit d’accès est accordé.',
    noMeasure: 'Progression non calculable · périmètre RH, rôles, dossiers, contrats, compétences, accès, preuves et règle de revue à définir puis valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Définir le dossier RH minimal, les accès, contrats et plans de capacité',
    stages: ['Périmètre RH', 'Rôles & équipes', 'Dossiers & accès', 'Contrats & mandats', 'Compétences & capacités', 'Revue & protection'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Définir les populations couvertes : membres fondateurs, membres associés, employés, bénévoles, prestataires et personnels d’appui.',
      'Séparer statut institutionnel, fonction, Team, rattachement opérationnel, rôle M3S, droits effectifs et délégations temporaires.',
      'Définir le dossier RH minimal, sa durée de conservation, son niveau de sensibilité, son propriétaire et ses accès autorisés.',
      'Établir les besoins de compétences, disponibilité, remplacement, formation et capacité par fonction sans transformer une estimation en engagement.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Matrice versionnée des rôles, responsabilités, Teams, rattachements, accès et validations humaines.',
      'Index des dossiers individuels indiquant uniquement présence, statut documentaire, emplacement protégé et responsable de contrôle.',
      'Contrat, mandat ou décision identifié par type, version, dates, statut de signature et preuve d’adoption lorsque nécessaire.',
      'Plan de capacité et de formation reliant besoin, compétence attendue, disponibilité, action, échéance et revue.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Une personne dans l’annuaire n’est pas automatiquement employée, membre ou titulaire d’un accès. Un projet de contrat ne vaut ni signature ni engagement. Les droits M3S suivent le besoin réel, l’autorisation et la durée ; ils ne se déduisent ni d’un titre, ni d’une Team. Toute modification sensible conserve provenance, décision et historique.',
    articulationTitle: 'Articulation avec CNS-01 à CNS-04',
    articulation: 'CNS-01 gouverne mandats, décisions et droits ; CNS-02 décrit les cycles RH ; CNS-03 fournit identifiants et référentiels ; CNS-04 encadre rémunérations, frais et preuves financières. CNS-05 consolide personnes, rôles, contrats, compétences et capacités sans créer de relation juridique.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Organisation & RH prépare les dossiers, rôles et plans de capacité ; la fonction métier qualifie le besoin et suit l’activité ; Gouvernance valide mandats, contrats sensibles et exceptions ; Administration suit les échéances ; IT applique les accès autorisés ; la GED conserve les pièces protégées ; un professionnel compétent contrôle les obligations de travail et sociales.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'CV, pièces d’identité, adresses, coordonnées privées, signatures, contrats complets, rémunérations, évaluations, données sociales et justificatifs restent dans des espaces restreints. La vue publique ne contient que la méthode et les statuts non nominatifs.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2 et Matrice de cadrage V0.1 du 23.08.2026. Résultat cible : rôles, compétences, contrats, dossiers et besoins de formation structurés. Le périmètre détaillé reste à valider.',
    openArchitecture: 'Ouvrir l’architecture RH',
    openProcesses: 'Ouvrir les processus RH',
    openDirectory: 'Ouvrir l’annuaire interne',
    openResources: 'Ouvrir les ressources RH'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-05 · Human resources and capabilities',
    status: 'Framework validated · detail to inventory',
    body: 'Structure 2SG roles, skills, contracts, individual files and capacity needs. This component assumes neither that a person is employed, nor that a contract is valid, nor that access has been granted.',
    noMeasure: 'Progress cannot be calculated · HR scope, roles, files, contracts, skills, access, evidence and review rule must be defined and validated',
    currentStage: 'Current work point',
    currentStageName: 'Define the minimum HR file, access, contracts and capacity plans',
    stages: ['HR scope', 'Roles & teams', 'Files & access', 'Contracts & mandates', 'Skills & capacity', 'Review & protection'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Define covered populations: founding members, associate members, employees, volunteers, contractors and support staff.',
      'Separate institutional status, function, Team, operational reporting, M3S role, effective rights and temporary delegations.',
      'Define the minimum HR file, retention period, sensitivity, owner and authorised access.',
      'Establish skills, availability, replacement, training and capacity needs by function without turning an estimate into a commitment.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned matrix of roles, responsibilities, Teams, reporting lines, access and human approvals.',
      'Individual-file index showing only presence, documentary status, protected location and control owner.',
      'Contract, mandate or decision identified by type, version, dates, signature status and adoption evidence when required.',
      'Capacity and training plan connecting need, expected skill, availability, action, deadline and review.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A person in the directory is not automatically an employee, member or access holder. A draft contract is neither a signature nor a commitment. M3S rights follow actual need, authorisation and duration; they are not inferred from a title or Team. Every sensitive change retains provenance, decision and history.',
    articulationTitle: 'Connection with CNS-01 through CNS-04',
    articulation: 'CNS-01 governs mandates, decisions and rights; CNS-02 describes HR cycles; CNS-03 supplies identifiers and reference systems; CNS-04 frames compensation, expenses and financial evidence. CNS-05 consolidates people, roles, contracts, skills and capacity without creating a legal relationship.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Organisation & HR prepares files, roles and capacity plans; the business function qualifies the need and follows activity; Governance validates mandates, sensitive contracts and exceptions; Administration tracks deadlines; IT applies authorised access; the DMS retains protected records; a competent professional checks employment and social obligations.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'CVs, identity documents, addresses, private contact details, signatures, full contracts, compensation, assessments, social data and evidence remain in restricted spaces. The public view contains only the method and non-nominative statuses.',
    source: 'Framing sources: Global Institutional Programme Model V0.2 and Framing Matrix V0.1 dated 23 Aug 2026. Target result: structured roles, skills, contracts, files and training needs. The detailed scope remains to be validated.',
    openArchitecture: 'Open HR architecture',
    openProcesses: 'Open HR processes',
    openDirectory: 'Open internal directory',
    openResources: 'Open HR resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-05 · Personal und Kapazitäten',
    status: 'Arbeitsrahmen validiert · Details zu inventarisieren',
    body: 'Rollen, Kompetenzen, Verträge, Personaldossiers und Kapazitätsbedarfe von 2SG strukturieren. Diese Komponente setzt weder eine Anstellung noch einen gültigen Vertrag oder gewährten Zugriff voraus.',
    noMeasure: 'Fortschritt nicht berechenbar · Personalumfang, Rollen, Dossiers, Verträge, Kompetenzen, Zugriffe, Nachweise und Prüfregel sind zu definieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Minimale Personalakte, Zugriffe, Verträge und Kapazitätspläne definieren',
    stages: ['Personalumfang', 'Rollen & Teams', 'Dossiers & Zugriffe', 'Verträge & Mandate', 'Kompetenzen & Kapazität', 'Prüfung & Schutz'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Erfasste Gruppen definieren: Gründungsmitglieder, assoziierte Mitglieder, Beschäftigte, Freiwillige, Auftragnehmer und Unterstützungspersonal.',
      'Institutionellen Status, Funktion, Team, operative Zuordnung, M3S-Rolle, wirksame Rechte und befristete Delegationen trennen.',
      'Minimale Personalakte, Aufbewahrung, Sensibilität, Verantwortung und zulässige Zugriffe festlegen.',
      'Kompetenz-, Verfügbarkeits-, Vertretungs-, Schulungs- und Kapazitätsbedarf je Funktion bestimmen, ohne eine Schätzung als Verpflichtung darzustellen.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versionierte Matrix der Rollen, Verantwortungen, Teams, Zuordnungen, Zugriffe und menschlichen Freigaben.',
      'Index der Personaldossiers mit ausschließlich Vorhandensein, Dokumentstatus, geschütztem Ablageort und Kontrollverantwortung.',
      'Vertrag, Mandat oder Entscheidung mit Art, Version, Daten, Unterschriftsstatus und Annahmenachweis, soweit erforderlich.',
      'Kapazitäts- und Schulungsplan mit Bedarf, erwarteter Kompetenz, Verfügbarkeit, Maßnahme, Frist und Prüfung.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Eine Person im Verzeichnis ist nicht automatisch beschäftigt, Mitglied oder zugriffsberechtigt. Ein Vertragsentwurf ist weder Unterschrift noch Verpflichtung. M3S-Rechte folgen Bedarf, Autorisierung und Dauer; sie werden weder aus Titel noch Team abgeleitet. Jede sensible Änderung bewahrt Herkunft, Entscheidung und Historie.',
    articulationTitle: 'Verbindung mit CNS-01 bis CNS-04',
    articulation: 'CNS-01 steuert Mandate, Entscheidungen und Rechte; CNS-02 beschreibt Personalprozesse; CNS-03 liefert Kennungen und Referenzsysteme; CNS-04 rahmt Vergütung, Kosten und Finanznachweise. CNS-05 konsolidiert Personen, Rollen, Verträge, Kompetenzen und Kapazitäten, ohne ein Rechtsverhältnis zu begründen.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Organisation & Personal bereitet Dossiers, Rollen und Kapazitätspläne vor; die Fachfunktion qualifiziert den Bedarf und verfolgt die Tätigkeit; Governance validiert Mandate, sensible Verträge und Ausnahmen; Administration verfolgt Fristen; IT setzt autorisierte Zugriffe um; die GED sichert geschützte Unterlagen; Fachpersonen prüfen Arbeits- und Sozialpflichten.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Lebensläufe, Ausweise, Adressen, private Kontaktdaten, Unterschriften, vollständige Verträge, Vergütung, Bewertungen, Sozialdaten und Nachweise bleiben in geschützten Bereichen. Die öffentliche Ansicht enthält nur Methode und nicht personenbezogene Status.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2 und Strukturierungsmatrix V0.1 vom 23.08.2026. Zielergebnis: strukturierte Rollen, Kompetenzen, Verträge, Dossiers und Schulungsbedarfe. Der Detailumfang bleibt zu validieren.',
    openArchitecture: 'Personalarchitektur öffnen',
    openProcesses: 'Personalprozesse öffnen',
    openDirectory: 'Internes Verzeichnis öffnen',
    openResources: 'Personalressourcen öffnen'
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

const InstitutionalHumanResourcesCapabilitiesConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-human-resources-capabilities-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-100"><UsersRound size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="violet" />

      <InstitutionalConsolidationDecisionRecord cnsId="CNS-05" language={language} />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-violet-700/70 bg-violet-950/35 px-2.5 py-1 font-semibold text-violet-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {STAGES.map((stage, index) => <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${index === 0 ? 'border-violet-500 bg-violet-950/40 text-violet-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}><span className="mb-1 block">{index + 1}</span>{t.stages[index]}</li>)}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ClipboardList} title={t.tasksTitle} items={t.tasks} accent="text-violet-300" />
        <ListBlock icon={FolderLock} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Network className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><BriefcaseBusiness className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Archive className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="max-w-5xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={() => onNavigate(`/rh?tab=architecture&${returnContext}#rh-architecture-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><Network size={16} aria-hidden="true" />{t.openArchitecture}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/rh?tab=processes&${returnContext}#rh-process-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><UserRoundCheck size={16} aria-hidden="true" />{t.openProcesses}</button>
          <button type="button" onClick={() => onNavigate(`/rh?tab=directory&${returnContext}#members-directory-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><FileKey2 size={16} aria-hidden="true" />{t.openDirectory}</button>
          <button type="button" onClick={() => onNavigate(`/rh?tab=resources&${returnContext}#rh-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><GraduationCap size={16} aria-hidden="true" />{t.openResources}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalHumanResourcesCapabilitiesConsolidationPilot;
