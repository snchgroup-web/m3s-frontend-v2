import React from 'react';
import {
  ArrowRight,
  Archive,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  FolderCog,
  GitBranch,
  Network,
  Tags
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';
import InstitutionalDataReferenceArbitrationProposal from './InstitutionalDataReferenceArbitrationProposal';
import InstitutionalDataReferenceInventory from './InstitutionalDataReferenceInventory';
import InstitutionalPeopleTeamsReferenceControl from './InstitutionalPeopleTeamsReferenceControl';
import InstitutionalPeopleTeamsDataFoundations from './InstitutionalPeopleTeamsDataFoundations';
import InstitutionalPeopleTeamsGateG1Review from './InstitutionalPeopleTeamsGateG1Review';
import InstitutionalPeopleTeamsGateG1Arbitration from './InstitutionalPeopleTeamsGateG1Arbitration';
import InstitutionalPeopleTeamsGateG1Decision from './InstitutionalPeopleTeamsGateG1Decision';
import InstitutionalPeopleTeamsPostgreSqlEvidenceSheet from './InstitutionalPeopleTeamsPostgreSqlEvidenceSheet';
import InstitutionalPeopleTeamsEvidenceConfirmation from './InstitutionalPeopleTeamsEvidenceConfirmation';
import InstitutionalPeopleTeamsEvidenceCollectionPack from './InstitutionalPeopleTeamsEvidenceCollectionPack';
import InstitutionalPeopleTeamsCollectionConfirmation from './InstitutionalPeopleTeamsCollectionConfirmation';
import InstitutionalPeopleTeamsExternalRequestCandidate from './InstitutionalPeopleTeamsExternalRequestCandidate';
import InstitutionalPeopleTeamsRequestConfirmation from './InstitutionalPeopleTeamsRequestConfirmation';
import InstitutionalPeopleTeamsRecipientAuthorisationCandidate from './InstitutionalPeopleTeamsRecipientAuthorisationCandidate';
import InstitutionalPeopleTeamsRecipientConfirmation from './InstitutionalPeopleTeamsRecipientConfirmation';
import InstitutionalPeopleTeamsNamedRecipientCandidate from './InstitutionalPeopleTeamsNamedRecipientCandidate';
import InstitutionalPeopleTeamsNamedRecipientConfirmation from './InstitutionalPeopleTeamsNamedRecipientConfirmation';
import InstitutionalPeopleTeamsNamedRecordAuthorisationCandidate from './InstitutionalPeopleTeamsNamedRecordAuthorisationCandidate';
import InstitutionalPeopleTeamsAuthorisationRegisterConfirmation from './InstitutionalPeopleTeamsAuthorisationRegisterConfirmation';
import InstitutionalPeopleTeamsIdentityRecordCandidate from './InstitutionalPeopleTeamsIdentityRecordCandidate';
import InstitutionalPeopleTeamsIdentityRecordConfirmation from './InstitutionalPeopleTeamsIdentityRecordConfirmation';
import InstitutionalPeopleTeamsAutFilePriorityCandidate from './InstitutionalPeopleTeamsAutFilePriorityCandidate';
import InstitutionalPeopleTeamsAutFilePriorityConfirmation from './InstitutionalPeopleTeamsAutFilePriorityConfirmation';
import InstitutionalPeopleTeamsAutFileSelectionCandidate from './InstitutionalPeopleTeamsAutFileSelectionCandidate';
import InstitutionalPeopleTeamsAutBatchCandidate from './InstitutionalPeopleTeamsAutBatchCandidate';

const STAGES = ['scope', 'sources', 'owners', 'models', 'vocabulary', 'review'];

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · CONSOLIDATION',
    title: 'CNS-03 · Données et référentiels',
    status: 'Périmètre cible à définir',
    body: 'Identifier et gouverner les référentiels de 2SG, leurs sources maîtresses, propriétaires, modèles de données, relations et vocabulaires afin de réduire les doublons et les interprétations contradictoires. Cette composante ne présume ni qu’une source est maîtresse, ni qu’un modèle observé est validé.',
    noMeasure: 'Progression non calculable · référentiels, propriétaires, relations, écarts de vocabulaire, preuves et règle de revue à inventorier puis valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Inventorier référentiels, propriétaires, relations et écarts de vocabulaire',
    stages: ['Périmètre de données', 'Sources maîtresses', 'Propriétaires', 'Modèles & relations', 'Vocabulaire', 'Qualité & revue'],
    tasksTitle: 'Tâches de consolidation',
    tasks: [
      'Inventorier les référentiels par objet métier, fonction, territoire, système, version et niveau d’autorité.',
      'Distinguer source maîtresse candidate, copie de travail, extrait, preuve, archive et donnée dérivée.',
      'Attribuer propriétaire métier, gestionnaire de données, validateur, droits d’accès et fréquence de revue.',
      'Comparer modèles, relations, identifiants, règles de qualité et vocabulaire afin de documenter doublons et écarts.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Registre versionné des référentiels avec objet, propriétaire, source, statut, périmètre et emplacement.',
      'Dictionnaire de données reliant champ, définition, format, règle, sensibilité et système source.',
      'Cartographie des relations et identifiants avec écarts, doublons, dépendances et arbitrages ouverts.',
      'Historique des validations, corrections, migrations éventuelles, revues et décisions conservé dans la GED.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Une donnée disponible n’est pas nécessairement fiable, actuelle ou maîtresse. Un même libellé peut désigner des concepts différents et deux identifiants similaires ne prouvent pas l’identité d’un objet. Toute harmonisation conserve la provenance, la version, la transformation et la décision humaine.',
    articulationTitle: 'Articulation avec CNS-01 et CNS-02',
    articulation: 'CNS-01 gouverne l’autorité, les décisions et les obligations. CNS-02 structure les chaînes de travail et leurs contrôles. CNS-03 fournit les référentiels, relations et vocabulaires communs nécessaires à leur exécution traçable sans modifier les schémas réels avant validation.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'La fonction propriétaire valide le sens métier ; le gestionnaire de données maintient structure et qualité ; Administration coordonne le registre ; IT & Support documente systèmes et échanges ; Gouvernance arbitre l’autorité ; la GED conserve versions et preuves.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Données personnelles, identifiants techniques, secrets, contrats, pièces juridiques ou financières, exports complets et schémas sensibles restent dans les espaces autorisés. Cette vue publie uniquement la méthode de consolidation.',
    source: 'Sources de cadrage : Modèle du Programme institutionnel global V0.2 et Matrice de cadrage V0.1 du 23.08.2026. Résultat cible : sources maîtresses, modèles de données et vocabulaires harmonisés. Le périmètre détaillé reste à valider.',
    openArchitecture: 'Ouvrir le modèle de données',
    openGlossary: 'Ouvrir le glossaire global',
    openResources: 'Ouvrir les ressources données'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · CONSOLIDATION',
    title: 'CNS-03 · Data and reference systems',
    status: 'Target scope to define',
    body: 'Identify and govern 2SG reference systems, master sources, owners, data models, relationships and vocabularies to reduce duplicates and conflicting interpretations. This component assumes neither that a source is authoritative nor that an observed model is validated.',
    noMeasure: 'Progress cannot be calculated · reference systems, owners, relationships, vocabulary gaps, evidence and review rule must be inventoried and validated',
    currentStage: 'Current work point',
    currentStageName: 'Inventory reference systems, owners, relationships and vocabulary gaps',
    stages: ['Data scope', 'Master sources', 'Owners', 'Models & relations', 'Vocabulary', 'Quality & review'],
    tasksTitle: 'Consolidation tasks',
    tasks: [
      'Inventory reference systems by business object, function, territory, system, version and authority level.',
      'Distinguish candidate master source, working copy, extract, evidence, archive and derived data.',
      'Assign business owner, data steward, validator, access rights and review frequency.',
      'Compare models, relationships, identifiers, quality rules and vocabulary to document duplicates and gaps.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned register of reference systems with object, owner, source, status, scope and location.',
      'Data dictionary connecting field, definition, format, rule, sensitivity and source system.',
      'Relationship and identifier map with gaps, duplicates, dependencies and open decisions.',
      'DMS history of validations, corrections, possible migrations, reviews and decisions.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'Available data is not necessarily reliable, current or authoritative. The same label may represent different concepts, and similar identifiers do not prove object identity. Every harmonisation retains provenance, version, transformation and human decision.',
    articulationTitle: 'Connection with CNS-01 and CNS-02',
    articulation: 'CNS-01 governs authority, decisions and obligations. CNS-02 structures work chains and controls. CNS-03 supplies the shared reference systems, relationships and vocabularies required for traceable execution without changing real schemas before validation.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'The owning function validates business meaning; the data steward maintains structure and quality; Administration coordinates the register; IT & Support documents systems and exchanges; Governance decides authority; the DMS retains versions and evidence.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Personal data, technical identifiers, secrets, contracts, legal or financial records, full exports and sensitive schemas remain in authorised spaces. This view only publishes the consolidation method.',
    source: 'Framing sources: Global Institutional Programme Model V0.2 and Framing Matrix V0.1 dated 23 Aug 2026. Target result: harmonised master sources, data models and vocabularies. The detailed scope remains to be validated.',
    openArchitecture: 'Open the data model',
    openGlossary: 'Open the global glossary',
    openResources: 'Open data resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · KONSOLIDIERUNG',
    title: 'CNS-03 · Daten und Referenzsysteme',
    status: 'Zielumfang zu definieren',
    body: 'Die Referenzsysteme von 2SG sowie Masterquellen, Verantwortungen, Datenmodelle, Beziehungen und Vokabulare identifizieren und steuern, um Dubletten und widersprüchliche Auslegungen zu reduzieren. Diese Komponente setzt weder eine autoritative Quelle noch ein validiertes beobachtetes Modell voraus.',
    noMeasure: 'Fortschritt nicht berechenbar · Referenzsysteme, Verantwortungen, Beziehungen, Begriffsabweichungen, Nachweise und Prüfregel sind zu inventarisieren und zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Referenzsysteme, Verantwortungen, Beziehungen und Begriffsabweichungen inventarisieren',
    stages: ['Datenumfang', 'Masterquellen', 'Verantwortungen', 'Modelle & Beziehungen', 'Vokabular', 'Qualität & Prüfung'],
    tasksTitle: 'Konsolidierungsaufgaben',
    tasks: [
      'Referenzsysteme nach Fachobjekt, Funktion, Gebiet, System, Version und Autoritätsniveau inventarisieren.',
      'Kandidaten für Masterquellen, Arbeitskopien, Auszüge, Nachweise, Archive und abgeleitete Daten unterscheiden.',
      'Fachverantwortung, Datenpflege, Validierung, Zugriffsrechte und Prüffrequenz zuordnen.',
      'Modelle, Beziehungen, Kennungen, Qualitätsregeln und Vokabular vergleichen und Dubletten sowie Abweichungen dokumentieren.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Register der Referenzsysteme mit Objekt, Verantwortung, Quelle, Status, Umfang und Ablageort.',
      'Datenwörterbuch mit Feld, Definition, Format, Regel, Sensibilität und Quellsystem.',
      'Beziehungs- und Kennungsübersicht mit Abweichungen, Dubletten, Abhängigkeiten und offenen Entscheidungen.',
      'GED-Historie der Validierungen, Korrekturen, möglichen Migrationen, Prüfungen und Entscheidungen.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Verfügbare Daten sind nicht zwingend zuverlässig, aktuell oder autoritativ. Derselbe Begriff kann verschiedene Konzepte bezeichnen, und ähnliche Kennungen beweisen keine Objektidentität. Jede Harmonisierung bewahrt Herkunft, Version, Umwandlung und menschliche Entscheidung.',
    articulationTitle: 'Verbindung mit CNS-01 und CNS-02',
    articulation: 'CNS-01 steuert Autorität, Entscheidungen und Pflichten. CNS-02 strukturiert Arbeitsketten und Kontrollen. CNS-03 liefert gemeinsame Referenzsysteme, Beziehungen und Vokabulare für eine nachvollziehbare Ausführung, ohne reale Schemata vor der Validierung zu ändern.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Die Fachfunktion validiert die fachliche Bedeutung; die Datenpflege sichert Struktur und Qualität; Administration koordiniert das Register; IT & Support dokumentiert Systeme und Austausch; Governance entscheidet die Autorität; die GED sichert Versionen und Nachweise.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Personendaten, technische Kennungen, Geheimnisse, Verträge, Rechts- oder Finanzunterlagen, vollständige Exporte und sensible Schemata bleiben in autorisierten Bereichen. Diese Ansicht veröffentlicht nur die Konsolidierungsmethode.',
    source: 'Strukturierungsquellen: Modell des globalen institutionellen Programms V0.2 und Strukturierungsmatrix V0.1 vom 23.08.2026. Zielergebnis: harmonisierte Masterquellen, Datenmodelle und Vokabulare. Der Detailumfang bleibt zu validieren.',
    openArchitecture: 'Datenmodell öffnen',
    openGlossary: 'Globales Glossar öffnen',
    openResources: 'Datenressourcen öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2"><Icon className={accent} size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
    <ul className="mt-3 space-y-2">
      {items.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-violet-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  </article>
);

const InstitutionalDataReferenceSystemsConsolidationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-data-reference-systems-consolidation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-100"><Database size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="violet" />

      <InstitutionalDataReferenceArbitrationProposal language={language} />

      <InstitutionalDataReferenceInventory language={language} />

      <InstitutionalPeopleTeamsReferenceControl language={language} onNavigate={onNavigate} />

      <InstitutionalPeopleTeamsDataFoundations language={language} />

      <InstitutionalPeopleTeamsGateG1Review language={language} />

      <InstitutionalPeopleTeamsGateG1Arbitration language={language} />
      <InstitutionalPeopleTeamsGateG1Decision language={language} />
      <InstitutionalPeopleTeamsPostgreSqlEvidenceSheet language={language} />
      <InstitutionalPeopleTeamsEvidenceConfirmation language={language} />
      <InstitutionalPeopleTeamsEvidenceCollectionPack language={language} />
      <InstitutionalPeopleTeamsCollectionConfirmation language={language} />
      <InstitutionalPeopleTeamsExternalRequestCandidate language={language} />
      <InstitutionalPeopleTeamsRequestConfirmation language={language} />
      <InstitutionalPeopleTeamsRecipientAuthorisationCandidate language={language} />
      <InstitutionalPeopleTeamsRecipientConfirmation language={language} />
      <InstitutionalPeopleTeamsNamedRecipientCandidate language={language} />
      <InstitutionalPeopleTeamsNamedRecipientConfirmation language={language} />
      <InstitutionalPeopleTeamsNamedRecordAuthorisationCandidate language={language} />
      <InstitutionalPeopleTeamsAuthorisationRegisterConfirmation language={language} />
      <InstitutionalPeopleTeamsIdentityRecordCandidate language={language} />
      <InstitutionalPeopleTeamsIdentityRecordConfirmation language={language} />
      <InstitutionalPeopleTeamsAutFilePriorityCandidate language={language} />
      <InstitutionalPeopleTeamsAutFilePriorityConfirmation language={language} />
      <InstitutionalPeopleTeamsAutFileSelectionCandidate language={language} />
      <InstitutionalPeopleTeamsAutBatchCandidate language={language} />

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
        <ListBlock icon={BookOpenCheck} title={t.tasksTitle} items={t.tasks} accent="text-violet-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-blue-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ClipboardCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><GitBranch className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.articulationTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.articulation}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Network className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><Archive className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p></article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/?view=architecture&${returnContext}#global-candidate-data-model`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><Database size={16} aria-hidden="true" />{t.openArchitecture}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/?view=glossary&${returnContext}#dashboard-kpi-dictionary-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><Tags size={16} aria-hidden="true" />{t.openGlossary}</button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=resources&${returnContext}#administration-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"><FolderCog size={16} aria-hidden="true" />{t.openResources}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalDataReferenceSystemsConsolidationPilot;
