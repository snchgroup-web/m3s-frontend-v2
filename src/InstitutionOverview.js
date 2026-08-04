import React, { useLayoutEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle,
  Compass,
  Eye,
  FileText,
  FolderOpen,
  HandCoins,
  HeartHandshake,
  Info,
  Lock,
  Mail,
  Network,
  Presentation,
  Scale,
  Shield,
  Star,
  Target,
  UserCheck,
  Users
} from 'lucide-react';
import InternalSectionNav from './InternalSectionNav';
import GlossaryHelp from './GlossaryHelp';
import BusinessPlanVisual from './BusinessPlanVisual';
import DirectorDocumentVisual from './DirectorDocumentVisual';
import StrategicSummaryVisual from './StrategicSummaryVisual';

const COPY = {
  FR: {
    eyebrow: 'Administration / Institution',
    title: '2SG - Institution hybride et gouvernance',
    subtitle: 'Synthèse de référence en lecture seule. La gouvernance opérationnelle est validée au 02-08-2026 ; les repères stratégiques proviennent de la V4 de travail et restent rattachés à leurs sources maîtresses.',
    readOnly: 'Lecture seule',
    validated: 'Cadre opérationnel validé',
    strategicDraft: 'Repères stratégiques V4 - travail',
    classification: 'Interne C2',
    sectionNavLabel: 'Navigation dans Institution',
    navFundamentals: 'Fondamentaux',
    navSources: 'Sources & visuels',
    navAdministration: 'Administration',
    navGovernance: 'Gouvernance & équipe',
    navAccess: 'Accès & ressources',
    backToTop: 'Revenir en haut',
    profileTitle: 'Carte d’identité institutionnelle',
    profileBody: 'Une synthèse courte des fondamentaux de 2SG. Les documents directeurs et juridiques restent les sources maîtresses.',
    hybridNatureLabel: 'Nature hybride',
    hybridNatureBody: 'Association internationale, structure de social business, plateforme de services et base d’innovation.',
    identityLabel: 'Identité',
    identityBody: 'Initiative institutionnelle et entrepreneuriale à vocation internationale, conçue comme un lien durable entre la Suisse et le Sénégal.',
    visionLabel: 'Vision',
    visionBody: 'Construire une institution social business reconnue, capable de connecter, optimiser et professionnaliser des initiatives économiques et sociales entre la Suisse et le Sénégal.',
    purposeLabel: 'But',
    purposeBody: 'Faire émerger un label 2SG de social business conciliant gouvernance démocratique, utilité sociale et performance économique.',
    missionTitle: 'Mission',
    missionBody: 'Transformer les ressources et les connaissances en projets, services et capacités utiles.',
    mission1: 'Mobiliser des ressources humaines, matérielles, intellectuelles et numériques pour des projets à impact.',
    mission2: 'Rendre des services aux populations tout en développant des activités économiques soutenables.',
    mission3: 'Favoriser la coopération, l’innovation, la formation et le partage de connaissances.',
    valuesTitle: 'Valeurs',
    valueSolidarity: 'Solidarité',
    valueSolidarityBody: 'Coopération entre acteurs locaux et internationaux.',
    valueInnovation: 'Innovation',
    valueInnovationBody: 'Ouverture aux nouvelles idées et technologies.',
    valueAutonomy: 'Autonomie',
    valueAutonomyBody: 'Renforcement des capacités locales.',
    valueEfficiency: 'Efficience',
    valueEfficiencyBody: 'Meilleur rapport entre moyens, qualité et impact.',
    valueResponsibility: 'Responsabilité',
    valueResponsibilityBody: 'Engagement envers l’impact social et environnemental.',
    goldenTitle: 'Règles d’or de travail',
    goldenBody: 'Repères historiques à consolider lors de la prochaine révision des documents directeurs.',
    golden1: 'Distinguer et tracer les réalités juridiques et financières Suisse / Sénégal.',
    golden2: 'Assurer la traçabilité des fonds et des décisions.',
    golden3: 'Documenter systématiquement les actions utiles.',
    golden4: 'Garder une lecture simple pour les organes de gouvernance.',
    golden5: 'Ne pas complexifier un outil avant que le besoin soit démontré.',
    architectureTitle: 'Architecture institutionnelle et sources maîtresses',
    architectureBody: 'Quatre couches reliées, mais non interchangeables, structurent 2SG et son management system.',
    associationTitle: 'Association & gouvernance',
    associationBody: 'Statuts, règlement intérieur, organes, membres, mandats, décisions et conformité institutionnelle.',
    enterpriseTitle: 'Entreprise & social business',
    enterpriseBody: 'Activités, services, revenus compatibles avec la mission sociale, opérations et création de valeur.',
    strategyTitle: 'Stratégie & Business Plan',
    strategyBody: 'Orientations, positionnement, modèle économique, scénarios, financement et trajectoire de développement.',
    m3sTitle: 'M3S - système de management',
    m3sBody: 'Exécution, processus, données, documents, contrôles, tableaux de bord et capitalisation des connaissances.',
    architectureNote: 'Cette vue résume les repères. Elle ne remplace ni les statuts, ni le Document Directeur Global, ni le Business Model ou le Business Plan.',
    libraryTitle: 'Documents directeurs & lectures visuelles',
    libraryBody: 'Les sources maîtresses peuvent être transformées en présentations visuelles et interactives, sans perdre leur version, leur provenance ou leur niveau de confidentialité.',
    businessPlanDoc: 'Business Plan 2SG V8 - travail',
    businessPlanDocBody: 'Source du futur parcours visuel Business Plan : proposition de valeur, modèle économique, scénarios, financement et trajectoire.',
    synthesisDoc: 'Note de synthèse stratégique V2',
    synthesisDocBody: 'Source d’une présentation courte destinée à la compréhension, à la reprise et à la décision.',
    directorDoc: 'Document Directeur Global 2SG V4 - travail',
    directorDocBody: 'Source de la présentation institutionnelle générale et de la navigation entre les référentiels.',
    sourceIdentified: 'Source identifiée',
    visualPlanned: 'Présentation à produire',
    documentStatus: 'Statut documentaire',
    intendedUse: 'Lecture attendue',
    targetOutput: 'Livrable visuel cible',
    openGed: 'Consulter l’espace documentaire',
    openVisual: 'Ouvrir la lecture visuelle',
    businessPlanStatus: 'Base stratégique et financière validée sur le fond · chiffrage et revue visuelle à compléter',
    businessPlanUse: 'Décision économique, scénarios, financement et trajectoire.',
    businessPlanOutput: 'Parcours Business Plan interactif',
    synthesisStatus: 'Pont stratégique · ne remplace pas les sources maîtresses',
    synthesisUse: 'Compréhension rapide, reprise de contexte et aide à la décision.',
    synthesisOutput: 'Présentation exécutive courte',
    directorStatus: 'Travail stratégique · la V3C reste la référence historique',
    directorUse: 'Vue institutionnelle globale et navigation entre les référentiels.',
    directorOutput: 'Présentation institutionnelle générale',
    sourceJourneyTitle: 'De la source maîtresse à la lecture visuelle',
    sourceJourneyBody: 'La présentation facilite la lecture ; elle ne modifie ni le contenu, ni le statut, ni la gouvernance du document d’origine.',
    journeySource: 'Source identifiée',
    journeyReading: 'Lecture visuelle',
    journeyValidation: 'Validation humaine',
    journeyGed: 'Diffusion selon les droits',
    libraryRule: 'Chaque présentation dérivée devra afficher la source, la version, la date et la classification, puis proposer selon les droits : lecture interactive, téléchargement du document maître, export PDF et présentation PPTX. Aucun document interne ne doit être copié dans les ressources publiques du frontend.',
    adminScopeTitle: 'Ce que couvre la gestion administrative dans M3S',
    adminScopeBody: 'La gestion administrative organise, formalise, planifie, trace et communique le fonctionnement transversal de 2SG.',
    institutionAreaTitle: 'Institution',
    institutionAreaBody: 'Identité, fondamentaux, gouvernance, responsabilités, accès et ressources mises à disposition.',
    planningAreaTitle: 'Planification & gestion de projets',
    planningAreaBody: 'Planificateur unique : projets, phases, activités, tâches et actions, complétés par responsables, jalons, dépendances, échéances, chronologie et agenda.',
    communicationAreaTitle: 'Communication & courrier',
    communicationAreaBody: 'Communication interne et externe, courrier entrant/sortant, registre, responsable, échéance et pièces liées dans la GED.',
    complianceAreaTitle: 'Conformité légale & obligations',
    complianceAreaBody: 'Conformité associative, obligations légales et réglementaires, dossiers juridiques ou contentieux, échéances, preuves et alertes, sans déclaration prématurée de conformité.',
    activeArea: 'Écran actif',
    partialArea: 'Opérationnel partiel',
    plannedArea: 'À développer progressivement',
    scopeBoundaryTitle: 'Frontières fonctionnelles',
    scopeBoundaryBody: 'Les pièces sont conservées dans la GED ; la relation client relève du CRM ; les écritures relèvent des Finances ; les dossiers individuels relèvent des RH. Administration assure la coordination et la traçabilité transversales.',
    horizontalTitle: 'Un Bureau horizontal',
    horizontalBody: 'Les membres fondateurs et associés travaillent sur un même plan institutionnel. Chacun porte sa fonction et ses décisions métier ; la coordination se fait par processus, responsabilité et besoin d’arbitrage.',
    foundersTitle: 'Membres fondateurs et porteurs du projet',
    foundersBody: 'Cheikh et Chantal portent, préfinancent et soutiennent le projet global 2SG/M3S.',
    founder: 'Membre fondateur',
    initiator: 'Initiateur et porteur du projet',
    cheikhRole: 'Coordination générale et architecture fonctionnelle M3S',
    chantalRole: 'Référente financière et sociale',
    adminRight: 'Droit Admin M3S',
    associatesTitle: 'Membres associés et responsabilités fonctionnelles',
    associatesBody: 'Ces fonctions sont complémentaires. Elles n’établissent pas de ligne hiérarchique générale entre leurs titulaires.',
    associate: 'Membre associé',
    projectLead: 'Cheffe de projets',
    orgHrLead: 'Cheffe Organisation & RH',
    adminMarketingLead: 'Responsable Administration & Marketing - référent local 2SG au Sénégal',
    operationsLead: 'Chef Opérations',
    userRight: 'Droit Utilisateur M3S',
    functionalRight: 'Droits fonctionnels renforcés dans son périmètre',
    operationsScope: 'Offres, fournisseurs, négociation terrain, ordres d’exécution autorisés, paiements autorisés, livraisons et suivi des travaux.',
    supportTitle: 'Personnels d’appui rattachés aux opérations terrain',
    supportBody: 'La relation verticale s’applique ici : ces personnels relèvent directement d’Ibou pour leurs missions sur site.',
    guardian: 'Gardiennage et jardinage - Villa LR1',
    cleaningVilla: 'Ménage à temps partiel - Villa LR1',
    cleaningBargny: 'Aide-ménagère - maison familiale de Bargny',
    noDefaultAccess: 'Aucun accès M3S par défaut',
    accessTitle: 'Règles d’accès M3S',
    foundersAccess: 'Fondateurs',
    foundersAccessBody: 'Admin sur l’ensemble du système, hors espaces personnels, secrets ou explicitement réservés à un destinataire.',
    associatesAccess: 'Associés',
    associatesAccessBody: 'Utilisateur sur les autres modules ; droits adaptés dans leur propre fonction, selon classification, besoin d’en connaître et validation applicable.',
    delegationAccess: 'Délégations',
    delegationAccessBody: 'Une dérogation ou procuration peut être temporairement accordée pour une tâche précise. Elle doit être autorisée, limitée et traçable.',
    supportAccess: 'Personnels d’appui',
    supportAccessBody: 'Pas de compte ni de droit M3S par défaut. Un accès ne peut être ouvert qu’en cas de besoin validé.',
    resourcesTitle: 'Préfinancement et ressources mises à disposition',
    resourcesBody: 'Les fondateurs soutiennent actuellement 2SG par leur épargne et leurs salaires, ainsi que par des ressources privées utilisées pour le projet.',
    resourceSavings: 'Préfinancement des investissements et du fonctionnement',
    resourceOffice: 'Bureau hébergé au domicile des fondateurs',
    resourceEquipment: 'Ordinateurs et équipements personnels',
    resourceSubscriptions: 'Microsoft 365 / Office et autres abonnements utiles',
    accountingNote: 'Ces apports doivent être documentés progressivement. Leur affichage ici ne vaut ni salaire, ni dette, ni écriture comptable validée.',
    governanceNote: 'Principe de lecture',
    governanceNoteBody: 'Une responsabilité fonctionnelle désigne qui pilote un domaine ou un processus. Elle ne transforme pas cette personne en supérieur hiérarchique général des autres membres du Bureau.'
  },
  EN: {
    eyebrow: 'Administration / Institution',
    title: '2SG - Hybrid institution and governance',
    subtitle: 'Read-only reference summary. Operational governance is validated as of 02-08-2026; strategic references come from the working V4 and remain governed by their master sources.',
    readOnly: 'Read only',
    validated: 'Validated operational framework',
    strategicDraft: 'V4 strategic references - working draft',
    classification: 'Internal C2',
    sectionNavLabel: 'Institution navigation',
    navFundamentals: 'Foundations',
    navSources: 'Sources & visuals',
    navAdministration: 'Administration',
    navGovernance: 'Governance & team',
    navAccess: 'Access & resources',
    backToTop: 'Back to top',
    profileTitle: 'Institutional identity card',
    profileBody: 'A concise summary of 2SG fundamentals. Governing and legal documents remain the master sources.',
    hybridNatureLabel: 'Hybrid nature',
    hybridNatureBody: 'International association, social business structure, service platform and innovation base.',
    identityLabel: 'Identity',
    identityBody: 'An international institutional and entrepreneurial initiative designed as a lasting link between Switzerland and Senegal.',
    visionLabel: 'Vision',
    visionBody: 'Build a recognised social business institution able to connect, optimise and professionalise economic and social initiatives between Switzerland and Senegal.',
    purposeLabel: 'Purpose',
    purposeBody: 'Develop a 2SG social business label combining democratic governance, social utility and economic performance.',
    missionTitle: 'Mission',
    missionBody: 'Turn resources and knowledge into useful projects, services and capabilities.',
    mission1: 'Mobilise human, material, intellectual and digital resources for impact projects.',
    mission2: 'Provide services to communities while developing sustainable economic activities.',
    mission3: 'Foster cooperation, innovation, training and knowledge sharing.',
    valuesTitle: 'Values',
    valueSolidarity: 'Solidarity',
    valueSolidarityBody: 'Cooperation among local and international stakeholders.',
    valueInnovation: 'Innovation',
    valueInnovationBody: 'Openness to new ideas and technologies.',
    valueAutonomy: 'Autonomy',
    valueAutonomyBody: 'Strengthening local capabilities.',
    valueEfficiency: 'Efficiency',
    valueEfficiencyBody: 'Best balance between resources, quality and impact.',
    valueResponsibility: 'Responsibility',
    valueResponsibilityBody: 'Commitment to social and environmental impact.',
    goldenTitle: 'Working golden rules',
    goldenBody: 'Historical principles to consolidate during the next review of governing documents.',
    golden1: 'Distinguish and trace Swiss and Senegalese legal and financial realities.',
    golden2: 'Ensure traceability of funds and decisions.',
    golden3: 'Systematically document useful actions.',
    golden4: 'Keep information simple for governance bodies.',
    golden5: 'Do not make a tool complex before the need is demonstrated.',
    architectureTitle: 'Institutional architecture and master sources',
    architectureBody: 'Four connected but non-interchangeable layers structure 2SG and its management system.',
    associationTitle: 'Association & governance',
    associationBody: 'Statutes, internal rules, bodies, members, mandates, decisions and institutional compliance.',
    enterpriseTitle: 'Enterprise & social business',
    enterpriseBody: 'Activities, services, mission-compatible revenue, operations and value creation.',
    strategyTitle: 'Strategy & Business Plan',
    strategyBody: 'Direction, positioning, business model, scenarios, funding and development path.',
    m3sTitle: 'M3S - management system',
    m3sBody: 'Execution, processes, data, documents, controls, dashboards and knowledge capture.',
    architectureNote: 'This view summarises key references. It does not replace the statutes, Global Governing Document, Business Model or Business Plan.',
    libraryTitle: 'Governing documents & visual readings',
    libraryBody: 'Master sources can be transformed into visual and interactive presentations without losing their version, provenance or confidentiality level.',
    businessPlanDoc: '2SG Business Plan V8 - working draft',
    businessPlanDocBody: 'Source for the future Business Plan visual journey: value proposition, business model, scenarios, funding and trajectory.',
    synthesisDoc: 'Strategic summary note V2',
    synthesisDocBody: 'Source for a concise presentation supporting understanding, resumption and decisions.',
    directorDoc: '2SG Global Governing Document V4 - working draft',
    directorDocBody: 'Source for the overall institutional presentation and navigation across reference documents.',
    sourceIdentified: 'Source identified',
    visualPlanned: 'Presentation to produce',
    documentStatus: 'Document status',
    intendedUse: 'Intended reading',
    targetOutput: 'Target visual deliverable',
    openGed: 'Open document space',
    openVisual: 'Open visual reading',
    businessPlanStatus: 'Strategic and financial baseline validated in substance · figures and visual review pending',
    businessPlanUse: 'Economic decisions, scenarios, funding and trajectory.',
    businessPlanOutput: 'Interactive Business Plan journey',
    synthesisStatus: 'Strategic bridge · does not replace master sources',
    synthesisUse: 'Rapid understanding, context resumption and decision support.',
    synthesisOutput: 'Concise executive presentation',
    directorStatus: 'Strategic working draft · V3C remains the historical reference',
    directorUse: 'Overall institutional view and navigation across reference documents.',
    directorOutput: 'Overall institutional presentation',
    sourceJourneyTitle: 'From master source to visual reading',
    sourceJourneyBody: 'The presentation makes the document easier to read; it does not alter the content, status or governance of the original document.',
    journeySource: 'Source identified',
    journeyReading: 'Visual reading',
    journeyValidation: 'Human validation',
    journeyGed: 'Rights-based distribution',
    libraryRule: 'Each derived presentation must show its source, version, date and classification, then offer according to access rights: interactive reading, master-document download, PDF export and PPTX presentation. No internal document may be copied into public frontend assets.',
    adminScopeTitle: 'What administrative management covers in M3S',
    adminScopeBody: 'Administrative management organises, formalises, plans, traces and communicates 2SG cross-functional operations.',
    institutionAreaTitle: 'Institution',
    institutionAreaBody: 'Identity, fundamentals, governance, responsibilities, access and resources provided.',
    planningAreaTitle: 'Planning & project management',
    planningAreaBody: 'One planner for projects, phases, activities, tasks and actions, supported by owners, milestones, dependencies, deadlines, timelines and agenda.',
    communicationAreaTitle: 'Communication & correspondence',
    communicationAreaBody: 'Internal and external communication, inbound/outbound correspondence, register, owner, deadline and GED-linked files.',
    complianceAreaTitle: 'Legal compliance & obligations',
    complianceAreaBody: 'Association compliance, legal and regulatory obligations, legal matters or disputes, deadlines, evidence and alerts, without a premature compliance claim.',
    activeArea: 'Active screen',
    partialArea: 'Partly operational',
    plannedArea: 'To be developed progressively',
    scopeBoundaryTitle: 'Functional boundaries',
    scopeBoundaryBody: 'Files are stored in the GED; customer relations belong in CRM; entries belong in Finance; individual files belong in HR. Administration provides cross-functional coordination and traceability.',
    horizontalTitle: 'A horizontal Bureau',
    horizontalBody: 'Founding and associate members operate on the same institutional level. Each person owns their function and business decisions; coordination follows processes, responsibilities and arbitration needs.',
    foundersTitle: 'Founding members and project owners',
    foundersBody: 'Cheikh and Chantal carry, prefinance and support the overall 2SG/M3S project.',
    founder: 'Founding member',
    initiator: 'Initiator and project owner',
    cheikhRole: 'General coordination and M3S functional architecture',
    chantalRole: 'Finance and social affairs lead',
    adminRight: 'M3S Admin right',
    associatesTitle: 'Associate members and functional responsibilities',
    associatesBody: 'These functions complement one another. They do not establish a general reporting line among their holders.',
    associate: 'Associate member',
    projectLead: 'Project Manager',
    orgHrLead: 'Head of Organization & HR',
    adminMarketingLead: 'Head of Administration & Marketing - 2SG local representative in Senegal',
    operationsLead: 'Head of Operations',
    userRight: 'M3S User right',
    functionalRight: 'Enhanced functional rights within own scope',
    operationsScope: 'Offers, suppliers, field negotiation, authorized execution orders, authorized payments, deliveries and work monitoring.',
    supportTitle: 'Support staff attached to field operations',
    supportBody: 'The vertical relationship applies here: these staff members report directly to Ibou for their on-site duties.',
    guardian: 'Guarding and gardening - Villa LR1',
    cleaningVilla: 'Part-time housekeeping - Villa LR1',
    cleaningBargny: 'Household support - Bargny family home',
    noDefaultAccess: 'No M3S access by default',
    accessTitle: 'M3S access rules',
    foundersAccess: 'Founders',
    foundersAccessBody: 'Admin across the system, excluding personal, secret or explicitly recipient-only spaces.',
    associatesAccess: 'Associates',
    associatesAccessBody: 'User access in other modules; rights adapted in their own function, subject to classification, need-to-know and applicable approval.',
    delegationAccess: 'Delegations',
    delegationAccessBody: 'A temporary exception or power of attorney may be granted for a specific task. It must be authorized, limited and traceable.',
    supportAccess: 'Support staff',
    supportAccessBody: 'No account or M3S right by default. Access may only be opened for a validated need.',
    resourcesTitle: 'Prefinancing and resources provided',
    resourcesBody: 'The founders currently support 2SG through their savings and salaries, as well as private resources used for the project.',
    resourceSavings: 'Prefinancing of investments and operations',
    resourceOffice: 'Office hosted in the founders’ home',
    resourceEquipment: 'Personal computers and equipment',
    resourceSubscriptions: 'Microsoft 365 / Office and other useful subscriptions',
    accountingNote: 'These contributions must be documented progressively. Their display here is not a validated salary, debt or accounting entry.',
    governanceNote: 'How to read this view',
    governanceNoteBody: 'Functional responsibility identifies who leads a domain or process. It does not make that person the general line manager of other Bureau members.'
  },
  DE: {
    eyebrow: 'Administration / Institution',
    title: '2SG - Hybride Institution und Governance',
    subtitle: 'Schreibgeschützte Referenzübersicht. Die operative Governance ist zum 02.08.2026 validiert; die strategischen Orientierungspunkte stammen aus dem V4-Arbeitsstand und bleiben an ihre maßgeblichen Quellen gebunden.',
    readOnly: 'Nur lesen',
    validated: 'Validierter operativer Rahmen',
    strategicDraft: 'Strategische V4-Referenzen - Arbeitsstand',
    classification: 'Intern C2',
    sectionNavLabel: 'Navigation innerhalb der Institution',
    navFundamentals: 'Grundlagen',
    navSources: 'Quellen & Ansichten',
    navAdministration: 'Verwaltung',
    navGovernance: 'Governance & Team',
    navAccess: 'Zugriff & Ressourcen',
    backToTop: 'Nach oben',
    profileTitle: 'Institutioneller Steckbrief',
    profileBody: 'Eine kompakte Zusammenfassung der 2SG-Grundlagen. Leitende und rechtliche Dokumente bleiben die maßgeblichen Quellen.',
    hybridNatureLabel: 'Hybride Natur',
    hybridNatureBody: 'Internationale Vereinigung, Social-Business-Struktur, Dienstleistungsplattform und Innovationsbasis.',
    identityLabel: 'Identität',
    identityBody: 'Internationale institutionelle und unternehmerische Initiative als dauerhafte Verbindung zwischen der Schweiz und Senegal.',
    visionLabel: 'Vision',
    visionBody: 'Eine anerkannte Social-Business-Institution aufbauen, die wirtschaftliche und soziale Initiativen zwischen der Schweiz und Senegal verbindet, optimiert und professionalisiert.',
    purposeLabel: 'Zweck',
    purposeBody: 'Ein 2SG-Social-Business-Label entwickeln, das demokratische Governance, sozialen Nutzen und wirtschaftliche Leistungsfähigkeit verbindet.',
    missionTitle: 'Mission',
    missionBody: 'Ressourcen und Wissen in nützliche Projekte, Dienstleistungen und Fähigkeiten umwandeln.',
    mission1: 'Menschliche, materielle, intellektuelle und digitale Ressourcen für Wirkungsprojekte mobilisieren.',
    mission2: 'Dienstleistungen für die Bevölkerung erbringen und zugleich tragfähige wirtschaftliche Aktivitäten entwickeln.',
    mission3: 'Zusammenarbeit, Innovation, Weiterbildung und Wissensaustausch fördern.',
    valuesTitle: 'Werte',
    valueSolidarity: 'Solidarität',
    valueSolidarityBody: 'Zusammenarbeit lokaler und internationaler Akteure.',
    valueInnovation: 'Innovation',
    valueInnovationBody: 'Offenheit für neue Ideen und Technologien.',
    valueAutonomy: 'Autonomie',
    valueAutonomyBody: 'Stärkung lokaler Fähigkeiten.',
    valueEfficiency: 'Effizienz',
    valueEfficiencyBody: 'Bestes Verhältnis von Mitteln, Qualität und Wirkung.',
    valueResponsibility: 'Verantwortung',
    valueResponsibilityBody: 'Engagement für soziale und ökologische Wirkung.',
    goldenTitle: 'Goldene Arbeitsregeln',
    goldenBody: 'Historische Leitlinien, die bei der nächsten Überarbeitung der leitenden Dokumente zu konsolidieren sind.',
    golden1: 'Die rechtlichen und finanziellen Realitäten der Schweiz und Senegals unterscheiden und nachvollziehbar halten.',
    golden2: 'Nachvollziehbarkeit von Mitteln und Entscheidungen sichern.',
    golden3: 'Nützliche Maßnahmen systematisch dokumentieren.',
    golden4: 'Informationen für die Governance-Organe einfach lesbar halten.',
    golden5: 'Ein Werkzeug nicht komplexer machen, bevor der Bedarf nachgewiesen ist.',
    architectureTitle: 'Institutionelle Architektur und maßgebliche Quellen',
    architectureBody: 'Vier verbundene, aber nicht austauschbare Ebenen strukturieren 2SG und sein Managementsystem.',
    associationTitle: 'Vereinigung & Governance',
    associationBody: 'Statuten, interne Regeln, Organe, Mitglieder, Mandate, Entscheidungen und institutionelle Compliance.',
    enterpriseTitle: 'Unternehmen & Social Business',
    enterpriseBody: 'Aktivitäten, Dienstleistungen, missionsgerechte Einnahmen, operative Arbeit und Wertschöpfung.',
    strategyTitle: 'Strategie & Businessplan',
    strategyBody: 'Ausrichtung, Positionierung, Geschäftsmodell, Szenarien, Finanzierung und Entwicklungspfad.',
    m3sTitle: 'M3S - Managementsystem',
    m3sBody: 'Ausführung, Prozesse, Daten, Dokumente, Kontrollen, Dashboards und Wissenssicherung.',
    architectureNote: 'Diese Ansicht fasst die Orientierungspunkte zusammen. Sie ersetzt weder Statuten noch Globales Leitdokument, Geschäftsmodell oder Businessplan.',
    libraryTitle: 'Leitdokumente & visuelle Aufbereitung',
    libraryBody: 'Maßgebliche Quellen können in visuelle und interaktive Präsentationen überführt werden, ohne Version, Herkunft oder Vertraulichkeitsstufe zu verlieren.',
    businessPlanDoc: '2SG-Businessplan V8 - Arbeitsstand',
    businessPlanDocBody: 'Quelle für die künftige visuelle Businessplan-Darstellung: Wertangebot, Geschäftsmodell, Szenarien, Finanzierung und Entwicklungspfad.',
    synthesisDoc: 'Strategische Synthesenotiz V2',
    synthesisDocBody: 'Quelle für eine kurze Präsentation zur Orientierung, Wiederaufnahme und Entscheidung.',
    directorDoc: 'Globales 2SG-Leitdokument V4 - Arbeitsstand',
    directorDocBody: 'Quelle für die allgemeine institutionelle Präsentation und die Navigation zwischen Referenzdokumenten.',
    sourceIdentified: 'Quelle identifiziert',
    visualPlanned: 'Präsentation zu erstellen',
    documentStatus: 'Dokumentstatus',
    intendedUse: 'Vorgesehene Lektüre',
    targetOutput: 'Visuelles Zielformat',
    openGed: 'Dokumentenbereich öffnen',
    openVisual: 'Visuelle Aufbereitung öffnen',
    businessPlanStatus: 'Strategische und finanzielle Grundlage inhaltlich validiert · Zahlenprüfung und visuelle Überarbeitung ausstehend',
    businessPlanUse: 'Wirtschaftliche Entscheidungen, Szenarien, Finanzierung und Entwicklungspfad.',
    businessPlanOutput: 'Interaktive Businessplan-Darstellung',
    synthesisStatus: 'Strategische Brücke · ersetzt keine maßgebliche Quelle',
    synthesisUse: 'Schnelle Orientierung, Wiederaufnahme des Kontexts und Entscheidungshilfe.',
    synthesisOutput: 'Kurze Managementpräsentation',
    directorStatus: 'Strategischer Arbeitsstand · V3C bleibt die historische Referenz',
    directorUse: 'Institutionelle Gesamtsicht und Navigation zwischen Referenzdokumenten.',
    directorOutput: 'Allgemeine institutionelle Präsentation',
    sourceJourneyTitle: 'Von der maßgeblichen Quelle zur visuellen Aufbereitung',
    sourceJourneyBody: 'Die Präsentation erleichtert die Lektüre; Inhalt, Status und Governance des Originaldokuments bleiben unverändert.',
    journeySource: 'Quelle identifiziert',
    journeyReading: 'Visuelle Aufbereitung',
    journeyValidation: 'Menschliche Validierung',
    journeyGed: 'Berechtigte Verteilung',
    libraryRule: 'Jede abgeleitete Präsentation muss Quelle, Version, Datum und Klassifizierung anzeigen und je nach Berechtigung interaktive Lektüre, Download des Masterdokuments, PDF-Export und PPTX-Präsentation anbieten. Interne Dokumente dürfen nicht in öffentliche Frontend-Ressourcen kopiert werden.',
    adminScopeTitle: 'Was administrative Verwaltung in M3S umfasst',
    adminScopeBody: 'Administrative Verwaltung organisiert, formalisiert, plant, dokumentiert und kommuniziert die bereichsübergreifende Arbeit von 2SG.',
    institutionAreaTitle: 'Institution',
    institutionAreaBody: 'Identität, Grundlagen, Governance, Verantwortungen, Zugänge und bereitgestellte Ressourcen.',
    planningAreaTitle: 'Planung & Projektmanagement',
    planningAreaBody: 'Ein Planer für Projekte, Phasen, Aktivitäten, Aufgaben und Aktionen, ergänzt um Verantwortung, Meilensteine, Abhängigkeiten, Fristen, Zeitachse und Agenda.',
    communicationAreaTitle: 'Kommunikation & Korrespondenz',
    communicationAreaBody: 'Interne und externe Kommunikation, Posteingang/-ausgang, Register, Verantwortung, Frist und GED-verknüpfte Unterlagen.',
    complianceAreaTitle: 'Rechtliche Compliance & Verpflichtungen',
    complianceAreaBody: 'Vereinskonformität, rechtliche und regulatorische Pflichten, Rechtsfälle oder Streitigkeiten, Fristen, Nachweise und Warnungen, ohne vorzeitige Konformitätserklärung.',
    activeArea: 'Aktive Ansicht',
    partialArea: 'Teilweise operativ',
    plannedArea: 'Schrittweise zu entwickeln',
    scopeBoundaryTitle: 'Funktionale Abgrenzung',
    scopeBoundaryBody: 'Unterlagen werden in der GED abgelegt; Kundenbeziehungen gehören ins CRM; Buchungen in die Finanzen; Personalakten in den Personalbereich. Administration gewährleistet bereichsübergreifende Koordination und Nachvollziehbarkeit.',
    horizontalTitle: 'Ein horizontal organisiertes Büro',
    horizontalBody: 'Gründungsmitglieder und assoziierte Mitglieder arbeiten auf derselben institutionellen Ebene. Jede Person verantwortet ihre Funktion und fachlichen Entscheidungen; die Koordination folgt Prozessen, Verantwortlichkeiten und dem Bedarf an Abstimmung.',
    foundersTitle: 'Gründungsmitglieder und Projektträger',
    foundersBody: 'Cheikh und Chantal tragen, vorfinanzieren und unterstützen das Gesamtprojekt 2SG/M3S.',
    founder: 'Gründungsmitglied',
    initiator: 'Initiator und Projektträger',
    cheikhRole: 'Gesamtkoordination und funktionale M3S-Architektur',
    chantalRole: 'Verantwortliche für Finanzen und Soziales',
    adminRight: 'M3S-Adminrecht',
    associatesTitle: 'Assoziierte Mitglieder und funktionale Verantwortungen',
    associatesBody: 'Diese Funktionen ergänzen einander. Sie begründen keine allgemeine Berichtslinie zwischen ihren Inhabern.',
    associate: 'Assoziiertes Mitglied',
    projectLead: 'Projektleiterin',
    orgHrLead: 'Leiterin Organisation & Personalwesen',
    adminMarketingLead: 'Leiter Administration & Marketing - lokaler 2SG-Ansprechpartner im Senegal',
    operationsLead: 'Leiter Operations',
    userRight: 'M3S-Benutzerrecht',
    functionalRight: 'Erweiterte funktionale Rechte im eigenen Bereich',
    operationsScope: 'Angebote, Lieferanten, Verhandlungen vor Ort, autorisierte Ausführungsaufträge, autorisierte Zahlungen, Lieferungen und Baufortschritt.',
    supportTitle: 'Unterstützungspersonal der operativen Arbeit vor Ort',
    supportBody: 'Hier gilt die vertikale Zuordnung: Dieses Personal berichtet für seine Aufgaben vor Ort direkt an Ibou.',
    guardian: 'Bewachung und Gartenpflege - Villa LR1',
    cleaningVilla: 'Teilzeit-Haushaltshilfe - Villa LR1',
    cleaningBargny: 'Haushaltshilfe - Familienhaus in Bargny',
    noDefaultAccess: 'Standardmäßig kein M3S-Zugang',
    accessTitle: 'M3S-Zugriffsregeln',
    foundersAccess: 'Gründungsmitglieder',
    foundersAccessBody: 'Admin im gesamten System, ausgenommen persönliche, geheime oder ausdrücklich nur für Empfänger bestimmte Bereiche.',
    associatesAccess: 'Assoziierte Mitglieder',
    associatesAccessBody: 'Benutzerzugang in anderen Modulen; angepasste Rechte in der eigenen Funktion nach Klassifizierung, Kenntnisbedarf und erforderlicher Genehmigung.',
    delegationAccess: 'Delegationen',
    delegationAccessBody: 'Für eine bestimmte Aufgabe kann vorübergehend eine Ausnahme oder Vollmacht erteilt werden. Sie muss autorisiert, begrenzt und nachvollziehbar sein.',
    supportAccess: 'Unterstützungspersonal',
    supportAccessBody: 'Standardmäßig kein Konto und kein M3S-Recht. Ein Zugang darf nur bei validiertem Bedarf eröffnet werden.',
    resourcesTitle: 'Vorfinanzierung und bereitgestellte Ressourcen',
    resourcesBody: 'Die Gründungsmitglieder unterstützen 2SG derzeit durch Ersparnisse und Gehälter sowie durch private Ressourcen, die für das Projekt genutzt werden.',
    resourceSavings: 'Vorfinanzierung von Investitionen und Betrieb',
    resourceOffice: 'Büro im Wohnhaus der Gründungsmitglieder',
    resourceEquipment: 'Private Computer und Ausstattung',
    resourceSubscriptions: 'Microsoft 365 / Office und weitere nützliche Abonnements',
    accountingNote: 'Diese Beiträge sind schrittweise zu dokumentieren. Ihre Anzeige hier gilt weder als Lohn noch als Schuld oder validierter Buchungssatz.',
    governanceNote: 'Lesehinweis',
    governanceNoteBody: 'Funktionale Verantwortung zeigt, wer einen Bereich oder Prozess leitet. Sie macht diese Person nicht zur allgemeinen Führungskraft der anderen Büromitglieder.'
  }
};

const people = (t) => ({
  founders: [
    { name: 'Cheikh Ndiaye', position: `${t.initiator} - ${t.cheikhRole}`, right: t.adminRight },
    { name: 'Chantal Löffler', position: t.chantalRole, right: t.adminRight }
  ],
  associates: [
    { name: 'Gnilane Diouf', position: t.projectLead },
    { name: 'Gnilane Ndiaye', position: t.orgHrLead },
    { name: 'Papa Amandiogou Ndiaye', position: t.adminMarketingLead },
    { name: 'Ibrahima Ndiaye (Ibou)', position: t.operationsLead, detail: t.operationsScope }
  ],
  support: [
    { name: 'Thierno A. Koné', position: t.guardian },
    { name: 'Mariam Sow (Mme Koné)', position: t.cleaningVilla },
    { name: 'Halimatou', position: t.cleaningBargny }
  ]
});

const StatusPill = ({ icon: Icon, children, tone = 'blue' }) => {
  const colors = {
    blue: 'border-blue-700 bg-blue-950/70 text-blue-200',
    green: 'border-emerald-700 bg-emerald-950/60 text-emerald-200',
    amber: 'border-amber-700 bg-amber-950/60 text-amber-100',
    slate: 'border-slate-600 bg-slate-900 text-slate-300'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${colors[tone]}`}>
      {Icon && <Icon size={14} aria-hidden="true" />}{children}
    </span>
  );
};

const PersonCard = ({ person, type, typeLabel, rightLabel }) => (
  <article className="flex h-full flex-col rounded-lg border border-slate-700 bg-slate-900/45 p-4">
    <span className={`w-fit max-w-full rounded-full border px-2.5 py-1 text-xs font-semibold ${type === 'founder' ? 'border-blue-700 bg-blue-950 text-blue-200' : 'border-slate-600 bg-slate-800 text-slate-300'}`}>
      {typeLabel}
    </span>
    <p className="mt-3 font-bold leading-6 text-white">{person.name}</p>
    <p className="mt-1 text-sm leading-6 text-slate-300">{person.position}</p>
    {person.detail && <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{person.detail}</p>}
    {rightLabel && <p className="mt-auto pt-4 text-xs font-semibold text-emerald-300">{rightLabel}</p>}
  </article>
);

const VISUAL_TARGET_IDS = {
  'business-plan': 'business-plan-visual',
  'strategic-summary': 'strategic-summary-visual',
  'director-document': 'director-document-visual'
};

const readInstitutionQuery = () => {
  if (typeof window === 'undefined') return { visual: null, section: null };
  const params = new URLSearchParams(window.location.search);
  const visual = params.get('visual');
  return {
    visual: VISUAL_TARGET_IDS[visual] ? visual : null,
    section: params.get('section')
  };
};

const replaceInstitutionQuery = ({ visual, section }) => {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  if (visual) params.set('visual', visual); else params.delete('visual');
  if (section) params.set('section', section); else params.delete('section');
  const search = params.toString();
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
};

const InstitutionOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const initialQuery = readInstitutionQuery();
  const [activeVisual, setActiveVisual] = useState(initialQuery.visual);
  const data = people(t);

  useLayoutEffect(() => {
    if (!activeVisual) return;
    const focusVisual = (behavior) => {
      const target = document.getElementById(VISUAL_TARGET_IDS[activeVisual]);
      target?.scrollIntoView?.({ behavior, block: 'start' });
      target?.focus?.({ preventScroll: true });
    };
    focusVisual('smooth');
    const frame = window.requestAnimationFrame(() => focusVisual('auto'));
    return () => window.cancelAnimationFrame(frame);
  }, [activeVisual, language]);

  const openVisual = (visualKey) => {
    replaceInstitutionQuery({ visual: visualKey, section: 'institution-sources' });
    setActiveVisual(visualKey);
  };

  const closeVisual = () => {
    replaceInstitutionQuery({ visual: null, section: 'institution-sources' });
    setActiveVisual(null);
  };
  const accessRules = [
    [t.foundersAccess, t.foundersAccessBody, Shield],
    [t.associatesAccess, t.associatesAccessBody, UserCheck],
    [t.delegationAccess, t.delegationAccessBody, CheckCircle],
    [t.supportAccess, t.supportAccessBody, Lock]
  ];
  const resources = [t.resourceSavings, t.resourceOffice, t.resourceEquipment, t.resourceSubscriptions];
  const identityMarkers = [
    [t.hybridNatureLabel, t.hybridNatureBody, Building2, null],
    [t.identityLabel, t.identityBody, HeartHandshake, null],
    [t.visionLabel, t.visionBody, Compass, 'INST-VISION'],
    [t.purposeLabel, t.purposeBody, Target, 'INST-BUT']
  ];
  const missions = [t.mission1, t.mission2, t.mission3];
  const values = [
    [t.valueSolidarity, t.valueSolidarityBody],
    [t.valueInnovation, t.valueInnovationBody],
    [t.valueAutonomy, t.valueAutonomyBody],
    [t.valueEfficiency, t.valueEfficiencyBody],
    [t.valueResponsibility, t.valueResponsibilityBody]
  ];
  const goldenRules = [t.golden1, t.golden2, t.golden3, t.golden4, t.golden5];
  const architectureLayers = [
    [t.associationTitle, t.associationBody, Scale, []],
    [t.enterpriseTitle, t.enterpriseBody, BriefcaseBusiness, []],
    [t.strategyTitle, t.strategyBody, BookOpen, ['STRAT-STRATEGIE', 'STRAT-BUSINESS-MODEL', 'STRAT-BUSINESS-PLAN']],
    [t.m3sTitle, t.m3sBody, Network, []]
  ];
  const documentViews = [
    {
      title: t.directorDoc,
      body: t.directorDocBody,
      Icon: BookOpen,
      status: t.directorStatus,
      use: t.directorUse,
      output: t.directorOutput,
      visualKey: 'director-document'
    },
    {
      title: t.synthesisDoc,
      body: t.synthesisDocBody,
      Icon: FileText,
      status: t.synthesisStatus,
      use: t.synthesisUse,
      output: t.synthesisOutput,
      visualKey: 'strategic-summary'
    },
    {
      title: t.businessPlanDoc,
      body: t.businessPlanDocBody,
      Icon: BriefcaseBusiness,
      status: t.businessPlanStatus,
      use: t.businessPlanUse,
      output: t.businessPlanOutput,
      glossaryTermId: 'STRAT-BUSINESS-PLAN',
      visualKey: 'business-plan'
    }
  ];
  const sourceJourney = [
    [t.journeySource, FileText],
    [t.journeyReading, Eye],
    [t.journeyValidation, CheckCircle],
    [t.journeyGed, FolderOpen]
  ];
  const adminAreas = [
    [t.institutionAreaTitle, t.institutionAreaBody, Building2, t.activeArea, 'green'],
    [t.planningAreaTitle, t.planningAreaBody, BriefcaseBusiness, t.partialArea, 'blue'],
    [t.communicationAreaTitle, t.communicationAreaBody, Mail, t.plannedArea, 'slate'],
    [t.complianceAreaTitle, t.complianceAreaBody, Shield, t.plannedArea, 'slate']
  ];
  const sectionNavItems = [
    { id: 'institution-fundamentals', label: t.navFundamentals },
    { id: 'institution-sources', label: t.navSources },
    { id: 'institution-administration', label: t.navAdministration },
    { id: 'institution-governance', label: t.navGovernance },
    { id: 'institution-access', label: t.navAccess }
  ];

  return (
    <section id="institution-top" className="administration-overview space-y-6 scroll-mt-24" aria-labelledby="institution-title">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-blue-300">
              <Network size={23} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
              <h2 id="institution-title" className="mt-1 text-2xl font-bold text-white">{t.title}</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill icon={Lock}>{t.readOnly}</StatusPill>
            <StatusPill icon={CheckCircle} tone="green">{t.validated}</StatusPill>
            <StatusPill icon={FileText} tone="amber">{t.strategicDraft}</StatusPill>
            <StatusPill icon={Shield} tone="slate">{t.classification}</StatusPill>
          </div>
        </div>
      </header>

      <InternalSectionNav
        ariaLabel={t.sectionNavLabel}
        items={sectionNavItems}
        topId="institution-top"
        backToTopLabel={t.backToTop}
        refreshKey={activeVisual ? null : language}
        initialSection={sectionNavItems.some(item => item.id === initialQuery.section) ? initialQuery.section : null}
        onSectionChange={(section) => replaceInstitutionQuery({ visual: activeVisual, section })}
      />

      <section id="institution-fundamentals" className="scroll-mt-20 py-1" aria-labelledby="profile-title">
        <div className="mb-4">
          <h3 id="profile-title" className="text-xl font-bold text-white">{t.profileTitle}</h3>
          <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-400">{t.profileBody}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {identityMarkers.map(([title, body, Icon, termId]) => (
            <article key={title} className="rounded-lg border border-slate-700 bg-slate-800 p-5">
              <div className="flex gap-3">
                <Icon className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white">{title}</h4>
                    {termId && <GlossaryHelp termId={termId} language={language} />}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="mission-title">
          <div className="flex items-center gap-3">
            <Target className="text-blue-300" size={22} aria-hidden="true" />
            <h3 id="mission-title" className="text-xl font-bold text-white">{t.missionTitle}</h3>
            <GlossaryHelp termId="INST-MISSION" language={language} />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{t.missionBody}</p>
          <ul className="mt-4 space-y-3">
            {missions.map(mission => (
              <li key={mission} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle className="mt-1 shrink-0 text-emerald-400" size={17} aria-hidden="true" /><span>{mission}</span></li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="values-title">
          <div className="flex items-center gap-3">
            <HeartHandshake className="text-emerald-300" size={22} aria-hidden="true" />
            <h3 id="values-title" className="text-xl font-bold text-white">{t.valuesTitle}</h3>
            <GlossaryHelp termId="INST-VALEURS" language={language} />
          </div>
          <div className="mt-4 divide-y divide-slate-700">
            {values.map(([title, body]) => (
              <div key={title} className="py-3 first:pt-0 last:pb-0">
                <h4 className="text-sm font-bold text-slate-100">{title}</h4>
                <p className="mt-1 text-sm leading-5 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-amber-800/60 bg-amber-950/20 p-5 sm:p-6" aria-labelledby="golden-title">
        <div className="flex gap-3">
          <Star className="mt-0.5 shrink-0 text-amber-300" size={22} aria-hidden="true" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 id="golden-title" className="text-xl font-bold text-white">{t.goldenTitle}</h3>
              <GlossaryHelp termId="GOUV-REGLES-OR" language={language} />
            </div>
            <p className="mt-1 text-sm leading-6 text-amber-100/80">{t.goldenBody}</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {goldenRules.map(rule => (
                <li key={rule} className="flex gap-3 text-sm leading-6 text-slate-200"><CheckCircle className="mt-1 shrink-0 text-amber-300" size={17} aria-hidden="true" /><span>{rule}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="institution-sources" className="scroll-mt-20 py-1" aria-labelledby="architecture-title">
        <div className="mb-4">
          <h3 id="architecture-title" className="text-xl font-bold text-white">{t.architectureTitle}</h3>
          <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-400">{t.architectureBody}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {architectureLayers.map(([title, body, Icon, termIds]) => (
            <article key={title} className="rounded-lg border border-slate-700 bg-slate-800 p-5">
              <Icon className="text-blue-300" size={21} aria-hidden="true" />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <h4 className="font-bold leading-6 text-white">{title}</h4>
                {termIds.map(termId => <GlossaryHelp key={termId} termId={termId} language={language} />)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-lg border border-blue-800/60 bg-blue-950/25 p-4 text-xs leading-5 text-blue-100">{t.architectureNote}</p>
      </section>

      <section className="py-1" aria-labelledby="library-title">
        <div className="mb-4">
          <h3 id="library-title" className="text-xl font-bold text-white">{t.libraryTitle}</h3>
          <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-400">{t.libraryBody}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {documentViews.map(({ title, body, Icon, status, use, output, glossaryTermId, visualKey }) => (
            <article key={title} className="flex h-full flex-col rounded-lg border border-slate-700 bg-slate-800 p-5">
              <div className="flex items-center justify-between gap-3">
                <Icon className="shrink-0 text-blue-300" size={21} aria-hidden="true" />
                <StatusPill tone="green">{t.sourceIdentified}</StatusPill>
              </div>
              <div className="mt-4 flex items-start gap-2">
                <h4 className="font-bold leading-6 text-white">{title}</h4>
                {glossaryTermId && <GlossaryHelp termId={glossaryTermId} language={language} />}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              <dl className="mt-4 divide-y divide-slate-700 border-y border-slate-700">
                <div className="py-3">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.documentStatus}</dt>
                  <dd className="mt-1 text-sm leading-5 text-slate-300">{status}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.intendedUse}</dt>
                  <dd className="mt-1 text-sm leading-5 text-slate-300">{use}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.targetOutput}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-5 text-amber-300">{output}</dd>
                </div>
              </dl>
              <div className="mt-auto space-y-2 pt-4">
                {visualKey && (
                  <button type="button" onClick={() => openVisual(visualKey)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-bold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Presentation size={17} aria-hidden="true" />
                    <span>{t.openVisual}</span>
                  </button>
                )}
                <a href={`/ged?tab=documents&returnVisual=${visualKey}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-950/60 px-4 py-2 text-center text-sm font-bold text-blue-100 transition-colors hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <FolderOpen size={17} aria-hidden="true" />
                  <span>{t.openGed}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        {activeVisual === 'business-plan' && (
          <div className="mt-4">
            <BusinessPlanVisual language={language} onClose={closeVisual} />
          </div>
        )}
        {activeVisual === 'strategic-summary' && (
          <div className="mt-4">
            <StrategicSummaryVisual language={language} onClose={closeVisual} />
          </div>
        )}
        {activeVisual === 'director-document' && (
          <div className="mt-4">
            <DirectorDocumentVisual language={language} onClose={closeVisual} />
          </div>
        )}
        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
          <div className="flex gap-3">
            <Presentation className="mt-0.5 shrink-0 text-blue-300" size={21} aria-hidden="true" />
            <div>
              <h4 className="font-bold text-white">{t.sourceJourneyTitle}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-400">{t.sourceJourneyBody}</p>
            </div>
          </div>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {sourceJourney.map(([label, Icon], index) => (
              <li key={label} className="flex min-h-16 items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/45 p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-blue-200">{index + 1}</span>
                <Icon className="shrink-0 text-slate-400" size={18} aria-hidden="true" />
                <span className="text-sm font-semibold leading-5 text-slate-200">{label}</span>
                {index < sourceJourney.length - 1 && <ArrowRight className="ml-auto hidden shrink-0 text-slate-600 xl:block" size={17} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
        <aside className="mt-4 rounded-lg border border-amber-800/60 bg-amber-950/20 p-4">
          <div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-amber-300" size={19} aria-hidden="true" /><p className="text-sm leading-6 text-amber-100/85">{t.libraryRule}</p></div>
        </aside>
      </section>

      <section id="institution-administration" className="scroll-mt-20 py-1" aria-labelledby="admin-scope-title">
        <div className="mb-4">
          <h3 id="admin-scope-title" className="text-xl font-bold text-white">{t.adminScopeTitle}</h3>
          <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-400">{t.adminScopeBody}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminAreas.map(([title, body, Icon, status, tone]) => (
            <article key={title} className="flex h-full flex-col rounded-lg border border-slate-700 bg-slate-800 p-5">
              <div className="flex items-center justify-between gap-3">
                <Icon className="shrink-0 text-blue-300" size={21} aria-hidden="true" />
                <StatusPill tone={tone}>{status}</StatusPill>
              </div>
              <h4 className="mt-4 font-bold leading-6 text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
        <aside className="mt-4 rounded-lg border border-slate-700 bg-slate-900/60 p-4" aria-label={t.scopeBoundaryTitle}>
          <div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-blue-300" size={19} aria-hidden="true" /><div><h4 className="font-bold text-white">{t.scopeBoundaryTitle}</h4><p className="mt-1 text-sm leading-6 text-slate-400">{t.scopeBoundaryBody}</p></div></div>
        </aside>
      </section>

      <div id="institution-governance" className="scroll-mt-20 rounded-lg border border-blue-800/70 bg-blue-950/35 p-5 sm:p-6">
        <div className="flex gap-3">
          <Users className="mt-0.5 shrink-0 text-blue-300" size={22} aria-hidden="true" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{t.horizontalTitle}</h3>
              <GlossaryHelp termId="GOUV-GOUVERNANCE" language={language} />
            </div>
            <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.horizontalBody}</p>
          </div>
        </div>
      </div>

      <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="founders-title">
        <h3 id="founders-title" className="text-xl font-bold text-white">{t.foundersTitle}</h3>
        <p className="mt-1 text-sm text-slate-400">{t.foundersBody}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {data.founders.map(person => <PersonCard key={person.name} person={person} type="founder" typeLabel={t.founder} rightLabel={person.right} />)}
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="associates-title">
        <h3 id="associates-title" className="text-xl font-bold text-white">{t.associatesTitle}</h3>
        <p className="mt-1 text-sm text-slate-400">{t.associatesBody}</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {data.associates.map(person => <PersonCard key={person.name} person={person} type="associate" typeLabel={t.associate} rightLabel={`${t.userRight} · ${t.functionalRight}`} />)}
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="support-title">
        <h3 id="support-title" className="text-xl font-bold text-white">{t.supportTitle}</h3>
        <p className="mt-1 text-sm text-slate-400">{t.supportBody}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.support.map(person => <PersonCard key={person.name} person={person} type="support" typeLabel={t.noDefaultAccess} />)}
        </div>
      </section>

      <div id="institution-access" className="scroll-mt-20 grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="access-title">
          <div className="flex items-center gap-3">
            <Shield className="text-emerald-300" size={22} aria-hidden="true" />
            <h3 id="access-title" className="text-xl font-bold text-white">{t.accessTitle}</h3>
          </div>
          <div className="mt-5 divide-y divide-slate-700">
            {accessRules.map(([title, body, Icon]) => (
              <div key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                <Icon className="mt-0.5 shrink-0 text-slate-400" size={18} aria-hidden="true" />
                <div><h4 className="font-bold text-slate-100">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-400">{body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="resources-title">
          <div className="flex items-center gap-3">
            <HandCoins className="text-amber-300" size={22} aria-hidden="true" />
            <h3 id="resources-title" className="text-xl font-bold text-white">{t.resourcesTitle}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{t.resourcesBody}</p>
          <ul className="mt-4 space-y-3">
            {resources.map(resource => (
              <li key={resource} className="flex gap-3 text-sm text-slate-300"><CheckCircle className="mt-0.5 shrink-0 text-emerald-400" size={17} aria-hidden="true" /><span>{resource}</span></li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg border border-amber-800/60 bg-amber-950/25 p-4 text-xs leading-5 text-amber-100">{t.accountingNote}</p>
        </section>
      </div>

      <aside className="rounded-lg border border-slate-700 bg-slate-900/60 p-5" aria-label={t.governanceNote}>
        <div className="flex gap-3">
          <Info className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" />
          <div><h3 className="font-bold text-white">{t.governanceNote}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{t.governanceNoteBody}</p></div>
        </div>
      </aside>
    </section>
  );
};

export default InstitutionOverview;
