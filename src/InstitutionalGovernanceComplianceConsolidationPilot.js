import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Gavel,
  History,
  ListChecks,
  Scale,
  ShieldCheck
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const CONSOLIDATION_STAGES = ['scope', 'decisions', 'deadlines', 'formalisation', 'deviations', 'review'];
const CURRENT_STAGE_INDEX = 0;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-01 · Gouvernance et conformité',
    status: 'Périmètre cible à définir',
    body: 'Stabiliser dans le temps les décisions, obligations, échéances, signatures et contrôles nécessaires au fonctionnement de 2SG. Cette composante vérifie leur application et le traitement des écarts ; elle ne déclare ni conformité juridique générale ni gouvernance définitivement achevée.',
    noMeasure: 'Progression non calculable · décisions, échéances, signatures, contrôles et critères de traitement des écarts à inventorier puis valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Liste des exigences et décisions à établir',
    stages: ['Périmètre cible', 'Décisions', 'Échéances', 'Signatures & adoption', 'Écarts & corrections', 'Revue périodique'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Établir le périmètre versionné des décisions, obligations, politiques, échéances, signatures et contrôles réellement requis.',
      'Attribuer pour chaque exigence une source, un territoire, une fonction responsable, une autorité de décision et une preuve attendue.',
      'Relier les échéances, relances, validations, réserves et mesures correctives sans transformer une absence de preuve en conformité.',
      'Préparer une revue périodique qui distingue conforme, à régulariser, en retard, non applicable, contesté et non vérifiable.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Registre versionné des décisions et obligations avec source, applicabilité, responsable, échéance et statut contrôlé.',
      'Preuves distinctes de relecture, validation, signature, adoption, publication ou notification selon le besoin réel.',
      'Journal des contrôles, écarts, réserves, actions correctives, décisions d’acceptation et dates de réexamen.',
      'Classement GED des versions applicables et historiques avec sensibilité, accès, date et propriétaire documentaire.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Un document présent n’est pas nécessairement applicable, adopté ou à jour. Une échéance suivie n’est pas une obligation satisfaite. Toute conclusion juridique, acceptation d’un risque résiduel ou déclaration officielle reste soumise à la fonction compétente et à la Gouvernance.',
    articulationTitle: 'Articulation avec la Mise en place',
    articulation: 'MEP-01 constitue et qualifie le socle LEGAL ; MEP-02 structure les organes, rôles, mandats et décisions. CNS-01 ne les remplace pas : il contrôle ensuite leur maintien, leur application, leurs échéances et le traitement documenté des écarts.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Administration tient les registres, échéances et relances ; la fonction ou le conseil compétent qualifie le fond ; la Gouvernance décide, adopte et accepte les risques autorisés ; chaque fonction traite ses écarts ; la GED conserve les versions et preuves.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Avis juridiques, identités, signatures, pièces de procédure, échanges confidentiels, accès, incidents sensibles et contenu détaillé des dossiers restent dans les espaces autorisés. Cette vue ne publie que la méthode de consolidation.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2 et Matrice de cadrage V0.1 du 23.08.2026. Résultat cible : documents adoptés ou signés lorsque nécessaire, échéances suivies et écarts traités. Le périmètre détaillé reste à valider.',
    openGovernance: 'Contrôler Gouvernance & équipe',
    openCompliance: 'Ouvrir le registre Conformité',
    openAudit: 'Ouvrir le journal d’audit'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-01 · Governance and compliance',
    status: 'Target scope to define',
    body: 'Stabilise over time the decisions, obligations, deadlines, signatures and controls required for 2SG operations. This component verifies their application and the handling of deviations; it declares neither general legal compliance nor permanently completed governance.',
    noMeasure: 'Progress cannot be calculated · decisions, deadlines, signatures, controls and deviation-handling criteria must be inventoried and validated',
    currentStage: 'Current work point',
    currentStageName: 'List of requirements and decisions to establish',
    stages: ['Target scope', 'Decisions', 'Deadlines', 'Signatures & adoption', 'Deviations & corrections', 'Periodic review'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Establish the versioned scope of decisions, obligations, policies, deadlines, signatures and controls actually required.',
      'Assign each requirement a source, territory, responsible function, decision authority and expected evidence.',
      'Connect deadlines, reminders, validations, reservations and corrective measures without treating missing evidence as compliance.',
      'Prepare a periodic review that separates compliant, to regularise, overdue, not applicable, disputed and not verifiable.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned register of decisions and obligations with source, applicability, owner, deadline and controlled status.',
      'Separate evidence of review, validation, signature, adoption, publication or notification according to the actual need.',
      'Log of controls, deviations, reservations, corrective actions, acceptance decisions and review dates.',
      'DMS filing of applicable and historical versions with sensitivity, access, date and document owner.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A document being present does not necessarily make it applicable, adopted or current. Tracking a deadline does not mean an obligation is satisfied. Any legal conclusion, residual-risk acceptance or official statement remains subject to the competent function and Governance.',
    articulationTitle: 'Connection with Implementation',
    articulation: 'MEP-01 establishes and qualifies the LEGAL foundation; MEP-02 structures bodies, roles, mandates and decisions. CNS-01 does not replace them: it subsequently controls their maintenance, application, deadlines and documented handling of deviations.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Administration maintains registers, deadlines and reminders; the competent function or adviser qualifies substance; Governance decides, adopts and accepts authorised risks; each function handles its deviations; the DMS retains versions and evidence.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Legal opinions, identities, signatures, procedural records, confidential exchanges, access data, sensitive incidents and detailed case content remain in authorised spaces. This view only publishes the consolidation method.',
    source: 'Framing sources: Global Institutional Programme Model V0.2 and Framing Matrix V0.1 dated 23 Aug 2026. Target result: documents adopted or signed where required, deadlines tracked and deviations handled. The detailed scope remains to be validated.',
    openGovernance: 'Review Governance & team',
    openCompliance: 'Open Compliance register',
    openAudit: 'Open audit log'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-01 · Governance und Compliance',
    status: 'Zielumfang zu definieren',
    body: 'Entscheidungen, Pflichten, Fristen, Unterschriften und Kontrollen, die für den Betrieb von 2SG erforderlich sind, dauerhaft stabilisieren. Diese Komponente prüft ihre Anwendung und die Behandlung von Abweichungen; sie erklärt weder eine allgemeine Rechtskonformität noch eine endgültig abgeschlossene Governance.',
    noMeasure: 'Fortschritt nicht berechenbar · Entscheidungen, Fristen, Unterschriften, Kontrollen und Kriterien zur Abweichungsbehandlung sind zu inventarisieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Liste der Anforderungen und Entscheidungen erstellen',
    stages: ['Zielumfang', 'Entscheidungen', 'Fristen', 'Unterschrift & Verabschiedung', 'Abweichungen & Korrekturen', 'Regelmäßige Prüfung'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Den versionierten Umfang der tatsächlich erforderlichen Entscheidungen, Pflichten, Richtlinien, Fristen, Unterschriften und Kontrollen festlegen.',
      'Jeder Anforderung Quelle, Gebiet, zuständige Funktion, Entscheidungsautorität und erwarteten Nachweis zuordnen.',
      'Fristen, Erinnerungen, Validierungen, Vorbehalte und Korrekturmaßnahmen verknüpfen, ohne fehlende Nachweise als Konformität zu werten.',
      'Eine regelmäßige Prüfung vorbereiten, die konform, zu bereinigen, überfällig, nicht anwendbar, bestritten und nicht überprüfbar trennt.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Register der Entscheidungen und Pflichten mit Quelle, Anwendbarkeit, Verantwortung, Frist und kontrolliertem Status.',
      'Getrennte Nachweise für Prüfung, Validierung, Unterschrift, Verabschiedung, Veröffentlichung oder Mitteilung nach tatsächlichem Bedarf.',
      'Journal der Kontrollen, Abweichungen, Vorbehalte, Korrekturmaßnahmen, Annahmeentscheide und Prüfungsdaten.',
      'GED-Ablage der anwendbaren und historischen Fassungen mit Vertraulichkeit, Zugriff, Datum und Dokumentverantwortung.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Ein vorhandenes Dokument ist nicht zwingend anwendbar, verabschiedet oder aktuell. Eine verfolgte Frist bedeutet nicht, dass eine Pflicht erfüllt ist. Rechtliche Schlussfolgerungen, Annahmen von Restrisiken und offizielle Erklärungen bleiben der zuständigen Funktion und der Governance vorbehalten.',
    articulationTitle: 'Verbindung mit der Umsetzung',
    articulation: 'MEP-01 erstellt und qualifiziert die LEGAL-Grundlage; MEP-02 strukturiert Organe, Rollen, Mandate und Entscheidungen. CNS-01 ersetzt sie nicht: Es kontrolliert anschließend ihre Pflege, Anwendung, Fristen und die dokumentierte Behandlung von Abweichungen.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Administration führt Register, Fristen und Erinnerungen; die zuständige Funktion oder Beratung qualifiziert den Inhalt; Governance entscheidet, verabschiedet und akzeptiert autorisierte Risiken; jede Funktion behandelt ihre Abweichungen; die GED sichert Fassungen und Nachweise.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Rechtsgutachten, Identitäten, Unterschriften, Verfahrensakten, vertrauliche Kommunikation, Zugangsdaten, sensible Vorfälle und detaillierte Fallinhalte bleiben in autorisierten Bereichen. Diese Ansicht veröffentlicht nur die Konsolidierungsmethode.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2 und Strukturierungsmatrix V0.1 vom 23.08.2026. Zielergebnis: Dokumente bei Bedarf verabschiedet oder unterzeichnet, Fristen verfolgt und Abweichungen behandelt. Der Detailumfang bleibt zu validieren.',
    openGovernance: 'Governance & Team prüfen',
    openCompliance: 'Compliance-Register öffnen',
    openAudit: 'Auditprotokoll öffnen'
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

const InstitutionalGovernanceComplianceConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-governance-compliance-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-100">
          <Scale size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="emerald" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-emerald-700/70 bg-emerald-950/35 px-2.5 py-1 font-semibold text-emerald-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {CONSOLIDATION_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ListChecks} title={t.tasksTitle} items={t.tasks} accent="text-emerald-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-cyan-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><Gavel className="text-emerald-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><BadgeCheck className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><History className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/administration?tab=institution&section=institution-governance&${returnContext}#institution-governance`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Gavel size={16} aria-hidden="true" />{t.openGovernance}<ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=compliance&${returnContext}#compliance-register`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <ClipboardCheck size={16} aria-hidden="true" />{t.openCompliance}
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=audit&${returnContext}#administration-audit-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <History size={16} aria-hidden="true" />{t.openAudit}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalGovernanceComplianceConsolidationPilot;
