import React, { useEffect } from 'react';
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  CheckCircle2,
  Database,
  FileSearch,
  FolderCog,
  History,
  Network,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import DashboardIncidentRiskOverview from './DashboardIncidentRiskOverview';
import { getDashboardKpiDefinitions } from './dashboardKpiDictionary';

const copy = {
  FR: {
    architecture: {
      eyebrow: 'STRUCTURE TRANSVERSALE',
      title: 'Architecture & Relations',
      body: 'Cette vue décrit les couches du pilotage global et leurs échanges. Elle complète la carte mentale des fonctions sans la remplacer.',
      cards: [
        ['Pilotage global', 'Oriente les priorités, consolide les indicateurs et rend visibles les arbitrages.', 'Tableau de bord'],
        ['Fonctions métier', 'Exécutent et contrôlent le travail dans leurs périmètres et tableaux de bord locaux.', 'Fonctions M3S'],
        ['Services & données', 'Fournissent les données autorisées par API, avec état de disponibilité et fraîcheur.', 'Sources connectées'],
        ['GED & preuves', 'Conserve les sources maîtresses, versions, décisions et pièces justificatives.', 'Traçabilité']
      ],
      relationTitle: 'Chaîne de relation',
      relation: ['Décision de pilotage', 'Fonction responsable', 'Action ou transaction', 'Preuve et revue'],
      dataModelTitle: 'Modèle relationnel candidat',
      dataModelStatus: 'Cible à valider',
      dataModelBody: 'Ce schéma prépare les relations transversales attendues. Il ne signifie pas que les tables, identifiants ou raccordements sont déjà disponibles.',
      dataModelGroups: [
        ['Cadre de travail', 'Dossier → Projet → Phase → Tâche'],
        ['Responsabilités', 'Fonction → Team → Personne ou collectif'],
        ['Flux métier', 'Action → Opération → Recette, dépense ou mouvement de stock'],
        ['Traçabilité', 'Source → Document → Contrôle → Décision']
      ],
      dataModelRelations: [
        'Une tâche appartient à une phase, elle-même rattachée à un projet et à un dossier.',
        'Une personne ou un collectif assume une responsabilité dans une fonction et une Team.',
        'Une opération peut exécuter ou financer une tâche sans se confondre avec elle.',
        'Une preuve documente une opération, un contrôle ou une décision avec sa provenance.'
      ],
      pilotTitle: 'Premier domaine pilote · Achat & approvisionnement',
      pilotBody: 'Ce domaine teste les identifiants et relations nécessaires sans modifier les registres actuels.',
      pilotObserved: 'Observé aujourd’hui',
      pilotTarget: 'Cible candidate',
      pilotObservedItems: [
        'Dépense : fournisseur, montants, Team, Agent et phase projet sous forme de valeurs.',
        'Stock : fournisseur, quantités et montants d’achat dans un registre séparé.',
        'Vue Fournisseurs : rapprochement dérivé par nom normalisé, sans clé fournisseur commune.',
        'Justificatif GED : aucune référence homogène dans les écritures génériques.'
      ],
      pilotTargetItems: [
        'purchase_case_id relie le dossier, le projet, la phase et la tâche autorisée.',
        'supplier_id identifie le fournisseur sans remplacer son nom d’affichage.',
        'expense_id et inventory_movement_id restent deux objets distincts reliés à l’achat.',
        'ged_document_id rattache offre, facture, paiement, livraison et réception à leurs preuves.'
      ],
      pilotBoundary: 'Prochaine décision : valider les objets, identifiants, cardinalités et propriétaires de source avant toute évolution de schéma.',
      pilotContractTitle: 'Contrat relationnel candidat à arbitrer',
      pilotContractStatus: 'Proposition · aucune implémentation',
      pilotContractBody: 'Chaque ligne propose une responsabilité de source et une cardinalité. Elle ne crée ni clé, ni table, ni migration.',
      pilotOwner: 'Propriétaire candidat',
      pilotCardinality: 'Cardinalité candidate',
      pilotContracts: [
        ['purchase_case_id', 'Dossier transverse de l’achat', 'Registre Achat & approvisionnement · pilotage métier Production', '1 dossier → 0..n dépenses, 0..n mouvements et 0..n documents ; 0..n fournisseurs candidats puis 0..n retenus par commandes ou lots.'],
        ['supplier_id', 'Identité gouvernée du fournisseur', 'Production · registre Fournisseurs', '1 fournisseur → 0..n dossiers d’achat ; chaque commande ou lot → exactement 1 fournisseur retenu.'],
        ['responsible_party_id', 'Responsabilité interne de l’achat', 'Ressources Humaines · annuaire actif RH-001', '1 dossier → 1 responsable actif, personne ou collectif ; 1 responsable → 0..n dossiers. Les fournisseurs externes restent dans le registre Fournisseurs.'],
        ['expense_id', 'Écriture financière liée à l’achat', 'Finances · registre Dépenses', '1 dossier → 0..n dépenses ; chaque dépense d’achat → 1 dossier. Les historiques non qualifiés peuvent rester sans lien.'],
        ['inventory_movement_id', 'Entrée ou mouvement de stock issu de l’achat', 'Stock & Actifs · registre Inventaire', '1 dossier → 0..n mouvements ; chaque mouvement d’acquisition → 1 dossier. Un service peut n’en produire aucun.'],
        ['ged_document_id', 'Pièce ou preuve documentaire', 'IT & Support · GED', '1 dossier → 0..n documents ; un document peut prouver plusieurs objets par des liens gouvernés.']
      ],
      pilotPeopleBoundary: 'RH-001 gouverne les identités et affectations internes. Il ne transforme pas un fournisseur ou entrepreneur externe en membre du personnel.',
      pilotLifecycleTitle: 'Cycle candidat du dossier d’achat',
      pilotLifecycleBody: 'Ce statut appartient au dossier d’achat. Il ne remplace pas les statuts propres aux dépenses, paiements, mouvements de stock ou documents.',
      pilotLifecycle: ['Brouillon', 'À autoriser', 'Autorisé', 'Commandé', 'Réception partielle', 'Réception sous réserve', 'Réceptionné', 'Clôturé', 'Annulé'],
      pilotControlsTitle: 'Contrôles minimaux candidats',
      pilotControlsBody: 'Ces portes de passage structurent le dossier sans valider une dépense, un paiement ou une réception à la place de leur fonction responsable.',
      pilotControlLabels: ['Prépare', 'Contrôle ou autorise', 'Preuve minimale', 'Condition de passage'],
      pilotControls: [
        ['Créer', 'Responsable interne RH-001 · Production', 'Production', 'Besoin, périmètre, projet ou tâche, Team et responsable', 'Dossier identifié, sans engagement externe.'],
        ['Autoriser', 'Production', 'Gouvernance · Finance pour l’engagement', 'Offres ou options, choix motivé, budget, risques et délégation', 'Décision datée, auteur et plafond explicites.'],
        ['Commander par lot', 'Production', 'Responsable autorisé', 'Commande ou contrat, fournisseur, montant, devise et délai', 'Autorisation active et un fournisseur par commande ou lot.'],
        ['Réceptionner', 'Responsable terrain · Production', 'Stock & Actifs · fonction métier', 'Bon ou PV, quantités, état, photos ou tests et réserves', 'Réserves visibles ; aucun paiement final déduit automatiquement.'],
        ['Clôturer', 'Production', 'Finance · Gouvernance selon le cas', 'Réception, état des paiements, réserves et index GED', 'Obligations revues, décision et date de clôture tracées.']
      ],
      pilotSubmodelTitle: 'Sous-modèle candidat · commande, réception et réserves',
      pilotSubmodelStatus: 'Cible à valider · aucune implémentation',
      pilotSubmodelBody: 'Ces trois objets détaillent le passage de la commande au constat terrain. Ils restent reliés au dossier d’achat sans remplacer les registres Finance, Stock & Actifs ou GED.',
      pilotSubmodelObjects: [
        ['order_or_lot_id', 'Commande ou lot autorisé', 'Production · registre Commandes candidat', '1 dossier d’achat → 0..n commandes ou lots ; chaque commande ou lot → exactement 1 dossier et 1 fournisseur retenu.'],
        ['receipt_id', 'Constat de réception', 'Production · responsable terrain ; Stock & Actifs pour le mouvement lié', '1 commande ou lot → 0..n réceptions ; chaque réception → exactement 1 commande ou lot. Une réception peut être partielle.'],
        ['reservation_id', 'Réserve de réception', 'Production · suivi métier des réserves', '1 réception → 0..n réserves ; chaque réserve → exactement 1 réception et conserve un état explicite jusqu’à sa levée ou son rejet documenté.']
      ],
      pilotGuardrailsTitle: 'Règles de liaison candidates',
      pilotGuardrails: [
        'Une commande ou un lot retient un seul fournisseur ; un dossier d’achat peut en contenir plusieurs.',
        'Une réception partielle ne clôture ni le reliquat à livrer ni les obligations restantes.',
        'Une réserve ouverte empêche une clôture non qualifiée, mais ne détermine ni ne modifie automatiquement le paiement.',
        'Le bon, le PV, les photos, les tests et les preuves de réserve restent dans la GED, reliés à l’objet qu’ils prouvent.'
      ],
      pilotReservationLifecycleTitle: 'Cycle candidat d’une réserve',
      pilotReservationLifecycleBody: 'Production tient l’état métier. La levée ou le maintien exige un contrôle tracé par la personne autorisée selon le dossier et la délégation applicable.',
      pilotReservationLifecycle: [
        ['Ouverte', 'Constat enregistré et action attendue.'],
        ['Action corrective en cours', 'Responsable et échéance connus.'],
        ['À vérifier', 'Correction déclarée, contrôle restant à effectuer.'],
        ['Levée', 'Contrôle concluant et décision tracée.'],
        ['Maintenue', 'Écart encore présent après contrôle.'],
        ['Annulée', 'Doublon ou création erronée, motif conservé.']
      ],
      pilotReservationEvidenceTitle: 'Trace minimale candidate',
      pilotReservationEvidence: [
        'Constat, date et objet concerné',
        'Responsable de l’action et échéance',
        'Action corrective attendue ou réalisée',
        'Preuves avant et après, référencées dans la GED',
        'Résultat du contrôle et reliquat éventuel',
        'Décision, auteur, date et motif du dernier état'
      ]
    },
    processes: {
      eyebrow: 'MÉTHODE COMMUNE',
      title: 'Processus & Contrôles',
      body: 'Le pilotage global harmonise les contrôles transversaux. Les procédures détaillées restent gouvernées dans chaque fonction.',
      steps: [
        ['Observer', 'Identifier la situation et son périmètre.'],
        ['Sourcer', 'Vérifier provenance, date et disponibilité.'],
        ['Qualifier', 'Nommer priorité, risque et responsable.'],
        ['Décider', 'Autoriser l’action au bon niveau.'],
        ['Exécuter', 'Suivre résultat, délai et dépense éventuelle.'],
        ['Tracer', 'Conserver preuve, retour d’expérience et prochaine action.']
      ],
      controlsTitle: 'Contrôles minimaux',
      controls: ['Source identifiable', 'Responsable explicite', 'Droits respectés', 'État et fraîcheur visibles', 'Retour vers le point de départ', 'Aucune valeur inventée']
    },
    resources: {
      eyebrow: 'POINTS D’ACCÈS GOUVERNÉS',
      title: 'Ressources',
      body: 'Les ressources restent conservées dans leurs espaces maîtres. Cette vue fournit des accès transversaux sans créer de copie concurrente.',
      open: 'Ouvrir',
      cards: [
        ['Ressources Administration', 'Documents directeurs, ressources légales, favoris et supports de la fonction pilote.', '/administration?tab=resources&returnTo=dashboard-resources', 'Administration'],
        ['GED & Knowledge Management', 'Documents, dossiers, archives, veille et connaissance institutionnelle.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'],
        ['Daily Intelligence', 'Mémoire stratégique, agenda, journal de bord et dernière édition publiée.', '/?view=intelligence', 'Pilotage'],
        ['Planification & projets', 'Tâches, projets, échéances et journal d’exécution de la fonction Administration.', '/administration?tab=planning&returnTo=dashboard-resources', 'Exécution']
      ]
    },
    glossary: {
      eyebrow: 'VOCABULAIRE DU PILOTAGE',
      title: 'Glossaire',
      body: 'Ces définitions locales facilitent la lecture du Tableau de bord global. Le Glossaire central 2SG reste la source maîtresse.',
      open: 'Ouvrir le Glossaire central',
      kpiTitle: 'Dictionnaire KPI du Tableau de bord',
      kpiBody: 'Chaque fiche sépare la définition, le périmètre, la source, la fraîcheur et l’action. Les règles de conversion CHF/CFA sont explicites sans modifier les valeurs.',
      kpiGroups: { management: 'Management & Gouvernance', finance: 'Fonctions support · Finances', support: 'Fonctions support · RH & IT', operations: 'Opérations & Développement' },
      fields: { definition: 'Définition', scope: 'Périmètre', source: 'Source', freshness: 'Fraîcheur', action: 'Action associée' },
      viewIndicator: 'Revenir à l’indicateur',
      terms: [
        ['Tableau de bord global', 'Vue transversale de pilotage qui consolide des informations sans remplacer les applications métier.'],
        ['Indicateur (KPI)', 'Mesure définie, sourcée et datée qui aide à suivre un objectif, un résultat ou un risque.'],
        ['Source maîtresse', 'Source gouvernée qui fait foi pour une information, une règle ou une version donnée.'],
        ['Fraîcheur', 'Date ou ancienneté de la dernière donnée disponible et contrôlée.'],
        ['Indisponible', 'État explicite utilisé lorsqu’une source réelle ne répond pas ou ne fournit aucune valeur fiable.'],
        ['Carte des fonctions', 'Carte mentale qui montre les familles, fonctions et composantes locales de 2SG/M3S.']
      ]
    }
  },
  EN: {
    architecture: {
      eyebrow: 'CROSS-FUNCTIONAL STRUCTURE', title: 'Architecture & Relationships', body: 'This view describes the global steering layers and their exchanges. It complements the function mind map without replacing it.',
      cards: [['Global steering', 'Sets priorities, consolidates indicators and makes decisions visible.', 'Dashboard'], ['Business functions', 'Execute and control work within their scopes and local dashboards.', 'M3S functions'], ['Services & data', 'Provide authorised data through APIs, with availability and freshness.', 'Connected sources'], ['GED & evidence', 'Retains master sources, versions, decisions and supporting evidence.', 'Traceability']],
      relationTitle: 'Relationship chain', relation: ['Steering decision', 'Responsible function', 'Action or transaction', 'Evidence and review'],
      dataModelTitle: 'Candidate relational model', dataModelStatus: 'Target to validate',
      dataModelBody: 'This diagram prepares the expected cross-functional relationships. It does not mean that the tables, identifiers or connections are already available.',
      dataModelGroups: [['Work frame', 'File → Project → Phase → Task'], ['Responsibilities', 'Function → Team → Person or collective'], ['Business flows', 'Action → Operation → Income, expense or stock movement'], ['Traceability', 'Source → Document → Control → Decision']],
      dataModelRelations: ['A task belongs to a phase, itself linked to a project and a file.', 'A person or collective assumes a responsibility within a function and a Team.', 'An operation may execute or finance a task without being the same object.', 'Evidence documents an operation, control or decision together with its provenance.'],
      pilotTitle: 'First pilot domain · Purchasing & procurement', pilotBody: 'This domain tests the required identifiers and relationships without changing current registers.',
      pilotObserved: 'Observed today', pilotTarget: 'Candidate target',
      pilotObservedItems: ['Expense: supplier, amounts, Team, Agent and project phase as values.', 'Stock: supplier, quantities and purchase amounts in a separate register.', 'Supplier view: matching derived from normalised names, without a shared supplier key.', 'DMS evidence: no consistent reference in generic financial entries.'],
      pilotTargetItems: ['purchase_case_id links the file, project, phase and authorised task.', 'supplier_id identifies the supplier without replacing its display name.', 'expense_id and inventory_movement_id remain two distinct objects linked to the purchase.', 'ged_document_id links offer, invoice, payment, delivery and acceptance to their evidence.'],
      pilotBoundary: 'Next decision: validate objects, identifiers, cardinalities and source owners before any schema change.',
      pilotContractTitle: 'Candidate relationship contract to arbitrate',
      pilotContractStatus: 'Proposal · no implementation',
      pilotContractBody: 'Each row proposes a source owner and a cardinality. It creates no key, table or migration.',
      pilotOwner: 'Candidate owner',
      pilotCardinality: 'Candidate cardinality',
      pilotContracts: [
        ['purchase_case_id', 'Cross-functional purchasing case', 'Purchasing & procurement register · Production business stewardship', '1 case → 0..n expenses, 0..n movements and 0..n documents; 0..n candidate suppliers then 0..n selected through orders or lots.'],
        ['supplier_id', 'Governed supplier identity', 'Production · Supplier register', '1 supplier → 0..n purchase cases; each order or lot → exactly 1 selected supplier.'],
        ['responsible_party_id', 'Internal purchasing responsibility', 'Human Resources · RH-001 active directory', '1 case → 1 active responsible party, person or collective; 1 party → 0..n cases. External suppliers remain in the Supplier register.'],
        ['expense_id', 'Financial entry linked to the purchase', 'Finance · Expense register', '1 case → 0..n expenses; each purchase expense → 1 case. Unqualified legacy entries may remain unlinked.'],
        ['inventory_movement_id', 'Stock entry or movement resulting from the purchase', 'Stock & Assets · Inventory register', '1 case → 0..n movements; each acquisition movement → 1 case. A service may create none.'],
        ['ged_document_id', 'Document or supporting evidence', 'IT & Support · DMS', '1 case → 0..n documents; one document may evidence several objects through governed links.']
      ],
      pilotPeopleBoundary: 'RH-001 governs internal identities and assignments. It does not turn an external supplier or contractor into staff.',
      pilotLifecycleTitle: 'Candidate purchasing-case lifecycle',
      pilotLifecycleBody: 'This status belongs to the purchasing case. It does not replace the statuses of expenses, payments, stock movements or documents.',
      pilotLifecycle: ['Draft', 'Pending authorisation', 'Authorised', 'Ordered', 'Partial receipt', 'Receipt with reservations', 'Received', 'Closed', 'Cancelled'],
      pilotControlsTitle: 'Candidate minimum controls',
      pilotControlsBody: 'These gates structure the case without validating an expense, payment or receipt on behalf of its responsible function.',
      pilotControlLabels: ['Prepares', 'Controls or authorises', 'Minimum evidence', 'Transition condition'],
      pilotControls: [
        ['Create', 'RH-001 internal responsible party · Production', 'Production', 'Need, scope, project or task, Team and responsible party', 'Case identified, with no external commitment.'],
        ['Authorise', 'Production', 'Governance · Finance for the commitment', 'Offers or options, reasoned choice, budget, risks and delegation', 'Dated decision, author and explicit ceiling.'],
        ['Order by lot', 'Production', 'Authorised responsible party', 'Order or contract, supplier, amount, currency and deadline', 'Active authorisation and one supplier per order or lot.'],
        ['Receive', 'Field responsible party · Production', 'Stock & Assets · business function', 'Delivery note or report, quantities, condition, photos or tests and reservations', 'Reservations visible; no final payment inferred automatically.'],
        ['Close', 'Production', 'Finance · Governance as applicable', 'Receipt, payment status, reservations and DMS index', 'Obligations reviewed, closure decision and date recorded.']
      ],
      pilotSubmodelTitle: 'Candidate submodel · order, receipt and reservations',
      pilotSubmodelStatus: 'Target to validate · no implementation',
      pilotSubmodelBody: 'These three objects detail the transition from order to field confirmation. They remain linked to the purchasing case without replacing the Finance, Stock & Assets or DMS registers.',
      pilotSubmodelObjects: [
        ['order_or_lot_id', 'Authorised order or lot', 'Production · candidate Order register', '1 purchasing case → 0..n orders or lots; each order or lot → exactly 1 case and 1 selected supplier.'],
        ['receipt_id', 'Receipt record', 'Production · field responsible party; Stock & Assets for the linked movement', '1 order or lot → 0..n receipts; each receipt → exactly 1 order or lot. A receipt may be partial.'],
        ['reservation_id', 'Receipt reservation', 'Production · business follow-up of reservations', '1 receipt → 0..n reservations; each reservation → exactly 1 receipt and retains an explicit status until documented clearance or rejection.']
      ],
      pilotGuardrailsTitle: 'Candidate linking rules',
      pilotGuardrails: [
        'An order or lot selects one supplier; a purchasing case may contain several orders or lots.',
        'A partial receipt closes neither the outstanding delivery nor the remaining obligations.',
        'An open reservation prevents unqualified closure, but does not automatically determine or modify payment.',
        'The delivery note, report, photos, tests and reservation evidence remain in the DMS, linked to the object they evidence.'
      ],
      pilotReservationLifecycleTitle: 'Candidate reservation lifecycle',
      pilotReservationLifecycleBody: 'Production maintains the business status. Clearance or maintenance requires a recorded control by the authorised person according to the case and applicable delegation.',
      pilotReservationLifecycle: [
        ['Open', 'Finding recorded and action expected.'],
        ['Corrective action in progress', 'Responsible party and deadline known.'],
        ['Pending verification', 'Correction declared, control still to be performed.'],
        ['Cleared', 'Successful control and recorded decision.'],
        ['Maintained', 'Deviation still present after control.'],
        ['Cancelled', 'Duplicate or erroneous creation, with reason retained.']
      ],
      pilotReservationEvidenceTitle: 'Candidate minimum trace',
      pilotReservationEvidence: [
        'Finding, date and affected object',
        'Action owner and deadline',
        'Expected or completed corrective action',
        'Before-and-after evidence referenced in the DMS',
        'Control result and any remaining deviation',
        'Decision, author, date and reason for the latest status'
      ]
    },
    processes: {
      eyebrow: 'COMMON METHOD', title: 'Processes & Controls', body: 'Global steering harmonises cross-functional controls. Detailed procedures remain governed within each function.',
      steps: [['Observe', 'Identify the situation and scope.'], ['Source', 'Check provenance, date and availability.'], ['Qualify', 'Name priority, risk and owner.'], ['Decide', 'Authorise action at the right level.'], ['Execute', 'Track outcome, deadline and any expense.'], ['Trace', 'Retain evidence, lessons and next action.']],
      controlsTitle: 'Minimum controls', controls: ['Identifiable source', 'Explicit owner', 'Permissions respected', 'Status and freshness visible', 'Return to starting point', 'No invented value']
    },
    resources: {
      eyebrow: 'GOVERNED ACCESS POINTS', title: 'Resources', body: 'Resources remain in their master spaces. This view provides cross-functional access without creating a competing copy.', open: 'Open',
      cards: [['Administration resources', 'Governing documents, legal resources, bookmarks and pilot-function support.', '/administration?tab=resources&returnTo=dashboard-resources', 'Administration'], ['GED & Knowledge Management', 'Documents, folders, archives, monitoring and institutional knowledge.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'], ['Daily Intelligence', 'Strategic memory, agenda, logbook and latest published edition.', '/?view=intelligence', 'Steering'], ['Planning & projects', 'Tasks, projects, deadlines and Administration execution log.', '/administration?tab=planning&returnTo=dashboard-resources', 'Execution']]
    },
    glossary: {
      eyebrow: 'STEERING VOCABULARY', title: 'Glossary', body: 'These local definitions support reading of the Global Dashboard. The 2SG Central Glossary remains the master source.', open: 'Open Central Glossary',
      kpiTitle: 'Dashboard KPI dictionary',
      kpiBody: 'Each record separates definition, scope, source, freshness and action. CHF/CFA conversion rules are explicit without changing values.',
      kpiGroups: { management: 'Management & Governance', finance: 'Support functions · Finance', support: 'Support functions · HR & IT', operations: 'Operations & Development' },
      fields: { definition: 'Definition', scope: 'Scope', source: 'Source', freshness: 'Freshness', action: 'Associated action' },
      viewIndicator: 'Return to indicator',
      terms: [['Global Dashboard', 'Cross-functional steering view that consolidates information without replacing business applications.'], ['Indicator (KPI)', 'A defined, sourced and dated measure used to track an objective, result or risk.'], ['Master source', 'Governed source of record for a given item, rule or version.'], ['Freshness', 'Date or age of the latest available and checked data.'], ['Unavailable', 'Explicit state used when a real source does not respond or provides no reliable value.'], ['Function map', 'Mind map showing 2SG/M3S families, functions and local components.']]
    }
  },
  DE: {
    architecture: {
      eyebrow: 'FUNKTIONSÜBERGREIFENDE STRUKTUR', title: 'Architektur & Beziehungen', body: 'Diese Ansicht beschreibt die Ebenen der globalen Steuerung und ihre Austauschbeziehungen. Sie ergänzt die Funktions-Mindmap, ohne sie zu ersetzen.',
      cards: [['Globale Steuerung', 'Richtet Prioritäten aus, konsolidiert Kennzahlen und macht Entscheidungen sichtbar.', 'Dashboard'], ['Fachfunktionen', 'Führen und kontrollieren die Arbeit in ihren Bereichen und lokalen Dashboards.', 'M3S-Funktionen'], ['Dienste & Daten', 'Liefern autorisierte Daten über APIs mit Verfügbarkeit und Aktualität.', 'Verbundene Quellen'], ['GED & Nachweise', 'Bewahrt Hauptquellen, Versionen, Entscheidungen und Belege auf.', 'Nachvollziehbarkeit']],
      relationTitle: 'Beziehungskette', relation: ['Steuerungsentscheidung', 'Verantwortliche Funktion', 'Aktion oder Transaktion', 'Nachweis und Prüfung'],
      dataModelTitle: 'Kandidatenmodell der Beziehungen', dataModelStatus: 'Zielbild zu validieren',
      dataModelBody: 'Dieses Schema bereitet die erwarteten funktionsübergreifenden Beziehungen vor. Es bedeutet nicht, dass Tabellen, Kennungen oder Verbindungen bereits verfügbar sind.',
      dataModelGroups: [['Arbeitsrahmen', 'Dossier → Projekt → Phase → Aufgabe'], ['Verantwortung', 'Funktion → Team → Person oder Kollektiv'], ['Fachliche Flüsse', 'Aktion → Vorgang → Einnahme, Ausgabe oder Lagerbewegung'], ['Nachvollziehbarkeit', 'Quelle → Dokument → Kontrolle → Entscheidung']],
      dataModelRelations: ['Eine Aufgabe gehört zu einer Phase, die einem Projekt und einem Dossier zugeordnet ist.', 'Eine Person oder ein Kollektiv übernimmt Verantwortung innerhalb einer Funktion und eines Teams.', 'Ein Vorgang kann eine Aufgabe ausführen oder finanzieren, ohne mit ihr identisch zu sein.', 'Ein Nachweis dokumentiert einen Vorgang, eine Kontrolle oder eine Entscheidung samt Herkunft.'],
      pilotTitle: 'Erster Pilotbereich · Einkauf & Beschaffung', pilotBody: 'Dieser Bereich prüft die erforderlichen Kennungen und Beziehungen, ohne aktuelle Register zu ändern.',
      pilotObserved: 'Heute beobachtet', pilotTarget: 'Kandidatenziel',
      pilotObservedItems: ['Ausgabe: Lieferant, Beträge, Team, Agent und Projektphase als Werte.', 'Bestand: Lieferant, Mengen und Einkaufsbeträge in einem getrennten Register.', 'Lieferantenansicht: Ableitung über normalisierte Namen ohne gemeinsamen Lieferantenschlüssel.', 'GED-Nachweis: keine einheitliche Referenz in allgemeinen Finanzbuchungen.'],
      pilotTargetItems: ['purchase_case_id verbindet Dossier, Projekt, Phase und autorisierte Aufgabe.', 'supplier_id identifiziert den Lieferanten, ohne seinen Anzeigenamen zu ersetzen.', 'expense_id und inventory_movement_id bleiben zwei getrennte, mit dem Einkauf verbundene Objekte.', 'ged_document_id verbindet Angebot, Rechnung, Zahlung, Lieferung und Abnahme mit ihren Nachweisen.'],
      pilotBoundary: 'Nächste Entscheidung: Objekte, Kennungen, Kardinalitäten und Quellenverantwortliche vor jeder Schemaänderung validieren.',
      pilotContractTitle: 'Zu entscheidender Kandidatenvertrag der Beziehungen',
      pilotContractStatus: 'Vorschlag · keine Implementierung',
      pilotContractBody: 'Jede Zeile schlägt eine Quellenverantwortung und eine Kardinalität vor. Sie erzeugt weder Schlüssel noch Tabelle oder Migration.',
      pilotOwner: 'Vorgeschlagene Verantwortung',
      pilotCardinality: 'Vorgeschlagene Kardinalität',
      pilotContracts: [
        ['purchase_case_id', 'Funktionsübergreifendes Einkaufsdossier', 'Register Einkauf & Beschaffung · fachliche Steuerung Produktion', '1 Dossier → 0..n Ausgaben, 0..n Bewegungen und 0..n Dokumente; 0..n Lieferantenkandidaten, danach 0..n ausgewählte Lieferanten über Bestellungen oder Lose.'],
        ['supplier_id', 'Geregelte Lieferantenidentität', 'Produktion · Lieferantenregister', '1 Lieferant → 0..n Einkaufsdossiers; jede Bestellung oder jedes Los → genau 1 ausgewählter Lieferant.'],
        ['responsible_party_id', 'Interne Einkaufsverantwortung', 'Personalwesen · aktives Verzeichnis RH-001', '1 Dossier → 1 aktive verantwortliche Einheit, Person oder Kollektiv; 1 Einheit → 0..n Dossiers. Externe Lieferanten bleiben im Lieferantenregister.'],
        ['expense_id', 'Mit dem Einkauf verbundene Finanzausgabe', 'Finanzen · Ausgabenregister', '1 Dossier → 0..n Ausgaben; jede Einkaufsausgabe → 1 Dossier. Nicht qualifizierte Altbestände können unverknüpft bleiben.'],
        ['inventory_movement_id', 'Bestandszugang oder -bewegung aus dem Einkauf', 'Bestand & Aktiva · Inventarregister', '1 Dossier → 0..n Bewegungen; jede Beschaffungsbewegung → 1 Dossier. Eine Dienstleistung kann keine erzeugen.'],
        ['ged_document_id', 'Dokument oder Nachweis', 'IT & Support · GED', '1 Dossier → 0..n Dokumente; ein Dokument kann mehrere Objekte über geregelte Verknüpfungen belegen.']
      ],
      pilotPeopleBoundary: 'RH-001 regelt interne Identitäten und Zuweisungen. Externe Lieferanten oder Auftragnehmer werden dadurch nicht zu Personal.',
      pilotLifecycleTitle: 'Kandidatenzyklus des Einkaufsdossiers',
      pilotLifecycleBody: 'Dieser Status gehört zum Einkaufsdossier. Er ersetzt nicht die eigenen Status von Ausgaben, Zahlungen, Bestandsbewegungen oder Dokumenten.',
      pilotLifecycle: ['Entwurf', 'Zur Freigabe', 'Freigegeben', 'Bestellt', 'Teilweise erhalten', 'Annahme mit Vorbehalt', 'Angenommen', 'Abgeschlossen', 'Storniert'],
      pilotControlsTitle: 'Vorgeschlagene Mindestkontrollen',
      pilotControlsBody: 'Diese Übergangstore strukturieren das Dossier, ohne Ausgaben, Zahlungen oder Annahmen anstelle der zuständigen Funktion zu bestätigen.',
      pilotControlLabels: ['Bereitet vor', 'Kontrolliert oder genehmigt', 'Mindestnachweis', 'Übergangsbedingung'],
      pilotControls: [
        ['Anlegen', 'Interne RH-001-Verantwortung · Produktion', 'Produktion', 'Bedarf, Umfang, Projekt oder Aufgabe, Team und Verantwortung', 'Dossier identifiziert, ohne externe Verpflichtung.'],
        ['Genehmigen', 'Produktion', 'Governance · Finanzen für die Verpflichtung', 'Angebote oder Optionen, begründete Wahl, Budget, Risiken und Delegation', 'Datierte Entscheidung, Autor und ausdrückliche Obergrenze.'],
        ['Je Los bestellen', 'Produktion', 'Autorisierte Verantwortung', 'Bestellung oder Vertrag, Lieferant, Betrag, Währung und Frist', 'Aktive Genehmigung und ein Lieferant je Bestellung oder Los.'],
        ['Annehmen', 'Verantwortung vor Ort · Produktion', 'Bestand & Aktiva · Fachfunktion', 'Lieferschein oder Protokoll, Mengen, Zustand, Fotos oder Tests und Vorbehalte', 'Vorbehalte sichtbar; keine automatische Ableitung der Schlusszahlung.'],
        ['Abschließen', 'Produktion', 'Finanzen · Governance je nach Fall', 'Annahme, Zahlungsstatus, Vorbehalte und GED-Index', 'Pflichten geprüft, Abschlussentscheidung und Datum dokumentiert.']
      ],
      pilotSubmodelTitle: 'Kandidaten-Teilmodell · Bestellung, Annahme und Vorbehalte',
      pilotSubmodelStatus: 'Zielbild zu validieren · keine Implementierung',
      pilotSubmodelBody: 'Diese drei Objekte beschreiben den Übergang von der Bestellung zum Befund vor Ort. Sie bleiben mit dem Einkaufsdossier verbunden, ohne die Register Finanzen, Bestand & Aktiva oder GED zu ersetzen.',
      pilotSubmodelObjects: [
        ['order_or_lot_id', 'Autorisierte Bestellung oder Los', 'Produktion · vorgeschlagenes Bestellregister', '1 Einkaufsdossier → 0..n Bestellungen oder Lose; jede Bestellung oder jedes Los → genau 1 Dossier und 1 ausgewählter Lieferant.'],
        ['receipt_id', 'Annahmefeststellung', 'Produktion · Verantwortung vor Ort; Bestand & Aktiva für die verbundene Bewegung', '1 Bestellung oder Los → 0..n Annahmen; jede Annahme → genau 1 Bestellung oder Los. Eine Annahme kann teilweise erfolgen.'],
        ['reservation_id', 'Annahmevorbehalt', 'Produktion · fachliche Nachverfolgung der Vorbehalte', '1 Annahme → 0..n Vorbehalte; jeder Vorbehalt → genau 1 Annahme und behält einen ausdrücklichen Status bis zur dokumentierten Aufhebung oder Ablehnung.']
      ],
      pilotGuardrailsTitle: 'Vorgeschlagene Verknüpfungsregeln',
      pilotGuardrails: [
        'Eine Bestellung oder ein Los wählt einen Lieferanten aus; ein Einkaufsdossier kann mehrere Bestellungen oder Lose enthalten.',
        'Eine Teilannahme schließt weder die Restlieferung noch die verbleibenden Pflichten ab.',
        'Ein offener Vorbehalt verhindert einen unqualifizierten Abschluss, bestimmt oder ändert die Zahlung aber nicht automatisch.',
        'Lieferschein, Protokoll, Fotos, Tests und Vorbehaltsnachweise bleiben in der GED und sind mit dem belegten Objekt verknüpft.'
      ],
      pilotReservationLifecycleTitle: 'Vorgeschlagener Lebenszyklus eines Vorbehalts',
      pilotReservationLifecycleBody: 'Produktion führt den fachlichen Status. Aufhebung oder Aufrechterhaltung erfordern eine dokumentierte Kontrolle durch die je nach Dossier und geltender Delegation autorisierte Person.',
      pilotReservationLifecycle: [
        ['Offen', 'Feststellung erfasst und Maßnahme erwartet.'],
        ['Korrekturmaßnahme läuft', 'Verantwortung und Frist sind bekannt.'],
        ['Zu prüfen', 'Korrektur gemeldet, Kontrolle noch ausstehend.'],
        ['Aufgehoben', 'Erfolgreiche Kontrolle und dokumentierte Entscheidung.'],
        ['Aufrechterhalten', 'Abweichung nach Kontrolle weiterhin vorhanden.'],
        ['Storniert', 'Duplikat oder irrtümliche Anlage, Begründung bleibt erhalten.']
      ],
      pilotReservationEvidenceTitle: 'Vorgeschlagene Mindestspur',
      pilotReservationEvidence: [
        'Feststellung, Datum und betroffenes Objekt',
        'Maßnahmenverantwortung und Frist',
        'Erwartete oder ausgeführte Korrekturmaßnahme',
        'Vorher- und Nachher-Nachweise mit GED-Referenz',
        'Kontrollergebnis und verbleibende Abweichung',
        'Entscheidung, Autor, Datum und Grund des letzten Status'
      ]
    },
    processes: {
      eyebrow: 'GEMEINSAME METHODE', title: 'Prozesse & Kontrollen', body: 'Die globale Steuerung harmonisiert funktionsübergreifende Kontrollen. Detaillierte Verfahren bleiben in jeder Funktion geregelt.',
      steps: [['Beobachten', 'Situation und Umfang bestimmen.'], ['Belegen', 'Herkunft, Datum und Verfügbarkeit prüfen.'], ['Qualifizieren', 'Priorität, Risiko und Verantwortung benennen.'], ['Entscheiden', 'Aktion auf der richtigen Ebene freigeben.'], ['Ausführen', 'Ergebnis, Termin und mögliche Ausgabe verfolgen.'], ['Dokumentieren', 'Nachweis, Erfahrung und nächste Aktion festhalten.']],
      controlsTitle: 'Mindestkontrollen', controls: ['Identifizierbare Quelle', 'Explizite Verantwortung', 'Rechte eingehalten', 'Status und Aktualität sichtbar', 'Rückkehr zum Ausgangspunkt', 'Keine erfundenen Werte']
    },
    resources: {
      eyebrow: 'GEREGELTE ZUGÄNGE', title: 'Ressourcen', body: 'Ressourcen verbleiben in ihren maßgeblichen Bereichen. Diese Ansicht bietet funktionsübergreifende Zugänge ohne konkurrierende Kopien.', open: 'Öffnen',
      cards: [['Ressourcen Verwaltung', 'Leitdokumente, Rechtsquellen, Favoriten und Hilfsmittel der Pilotfunktion.', '/administration?tab=resources&returnTo=dashboard-resources', 'Verwaltung'], ['GED & Knowledge Management', 'Dokumente, Ordner, Archive, Monitoring und institutionelles Wissen.', '/ged?tab=knowledge&returnTo=dashboard-resources', 'GED'], ['Daily Intelligence', 'Strategisches Gedächtnis, Agenda, Arbeitsjournal und letzte Ausgabe.', '/?view=intelligence', 'Steuerung'], ['Planung & Projekte', 'Aufgaben, Projekte, Termine und Ausführungsjournal der Verwaltung.', '/administration?tab=planning&returnTo=dashboard-resources', 'Ausführung']]
    },
    glossary: {
      eyebrow: 'STEUERUNGSVOKABULAR', title: 'Glossar', body: 'Diese lokalen Definitionen erleichtern das Lesen des globalen Dashboards. Das zentrale 2SG-Glossar bleibt die Hauptquelle.', open: 'Zentrales Glossar öffnen',
      kpiTitle: 'KPI-Wörterbuch des Dashboards',
      kpiBody: 'Jeder Eintrag trennt Definition, Umfang, Quelle, Aktualität und Aktion. CHF/CFA-Umrechnungsregeln sind sichtbar, ohne Werte zu verändern.',
      kpiGroups: { management: 'Management & Governance', finance: 'Unterstützungsfunktionen · Finanzen', support: 'Unterstützungsfunktionen · Personal & IT', operations: 'Betrieb & Entwicklung' },
      fields: { definition: 'Definition', scope: 'Umfang', source: 'Quelle', freshness: 'Aktualität', action: 'Zugeordnete Aktion' },
      viewIndicator: 'Zur Kennzahl zurückkehren',
      terms: [['Globales Dashboard', 'Funktionsübergreifende Steuerungsansicht, die Informationen bündelt, ohne Fachanwendungen zu ersetzen.'], ['Kennzahl (KPI)', 'Definierte, belegte und datierte Messgröße zur Verfolgung eines Ziels, Ergebnisses oder Risikos.'], ['Hauptquelle', 'Geregelte maßgebliche Quelle für eine Information, Regel oder Version.'], ['Aktualität', 'Datum oder Alter der letzten verfügbaren und geprüften Daten.'], ['Nicht verfügbar', 'Expliziter Zustand, wenn eine reale Quelle nicht antwortet oder keinen verlässlichen Wert liefert.'], ['Funktionskarte', 'Mindmap der Bereiche, Funktionen und lokalen Komponenten von 2SG/M3S.']]
    }
  }
};

const ViewHeader = ({ data }) => (
  <header>
    <p className="text-xs font-semibold uppercase text-blue-300">{data.eyebrow}</p>
    <h3 className="mt-1 text-lg font-semibold text-slate-100">{data.title}</h3>
    <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-400">{data.body}</p>
  </header>
);

const ArchitectureView = ({ data }) => {
  const icons = [Network, Boxes, Database, FolderCog];
  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {data.cards.map(([title, body, label], index) => {
          const Icon = icons[index];
          return <article key={title} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><Icon className="text-blue-300" size={20} aria-hidden="true" /><h4 className="mt-3 text-sm font-semibold text-slate-100">{title}</h4><p className="mt-1 text-sm leading-5 text-slate-400">{body}</p><p className="mt-3 text-xs font-semibold uppercase text-blue-300">{label}</p></article>;
        })}
      </div>
      <section className="mt-4 rounded-md border border-slate-700 bg-slate-900/25 p-3" aria-labelledby="global-relation-chain">
        <h4 id="global-relation-chain" className="text-sm font-semibold text-slate-100">{data.relationTitle}</h4>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">{data.relation.map((item, index) => <div key={item} className="flex min-h-11 items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-950 text-xs font-semibold text-blue-300">{index + 1}</span>{item}</div>)}</div>
      </section>
      <section className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3" aria-labelledby="global-candidate-data-model">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 id="global-candidate-data-model" className="text-sm font-semibold text-slate-100">{data.dataModelTitle}</h4>
            <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.dataModelBody}</p>
          </div>
          <span className="rounded-md border border-amber-600/70 bg-amber-950/20 px-2.5 py-1 text-xs font-semibold text-amber-200">{data.dataModelStatus}</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.dataModelGroups.map(([title, path], index) => {
            const Icon = icons[index];
            return (
              <article key={title} className="min-w-0 rounded-md border border-slate-700 bg-slate-900/35 p-3">
                <div className="flex items-center gap-2"><Icon className="shrink-0 text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{title}</h5></div>
                <p className="mt-2 break-words text-sm leading-6 text-slate-300">{path}</p>
              </article>
            );
          })}
        </div>
        <ol className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {data.dataModelRelations.map((relation, index) => (
            <li key={relation} className="flex min-h-11 items-start gap-2 rounded-md border border-slate-700 px-3 py-2 text-sm leading-5 text-slate-300">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-950 text-xs font-semibold text-cyan-300">{index + 1}</span>
              {relation}
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-4 rounded-md border border-slate-700 bg-slate-900/30 p-3" aria-labelledby="global-purchase-pilot">
        <h4 id="global-purchase-pilot" className="text-sm font-semibold text-slate-100">{data.pilotTitle}</h4>
        <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotBody}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {[[data.pilotObserved, data.pilotObservedItems, 'border-blue-800/70'], [data.pilotTarget, data.pilotTargetItems, 'border-emerald-800/70']].map(([title, items, borderClass]) => (
            <article key={title} className={`rounded-md border ${borderClass} bg-slate-900/40 p-3`}>
              <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
              <ul className="mt-3 space-y-2">
                {items.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 rounded-md border border-amber-700/70 bg-amber-950/15 px-3 py-2 text-sm leading-5 text-amber-100">{data.pilotBoundary}</p>
        <section className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3" aria-labelledby="purchase-candidate-contract">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h5 id="purchase-candidate-contract" className="text-sm font-semibold text-slate-100">{data.pilotContractTitle}</h5>
              <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotContractBody}</p>
            </div>
            <span className="rounded-md border border-amber-600/70 bg-amber-950/20 px-2.5 py-1 text-xs font-semibold text-amber-200">{data.pilotContractStatus}</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
            {data.pilotContracts.map(([identifier, role, owner, cardinality]) => (
              <article key={identifier} className="m3s-raised min-w-0 p-3">
                <code className="break-all text-sm font-semibold text-cyan-300">{identifier}</code>
                <p className="mt-2 text-sm font-semibold text-slate-100">{role}</p>
                <dl className="mt-3 space-y-3 text-sm">
                  <div><dt className="text-xs font-semibold uppercase text-slate-500">{data.pilotOwner}</dt><dd className="mt-1 leading-5 text-slate-300">{owner}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase text-slate-500">{data.pilotCardinality}</dt><dd className="mt-1 leading-5 text-slate-300">{cardinality}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="m3s-raised mt-3 px-3 py-2 text-sm leading-5 text-slate-300">{data.pilotPeopleBoundary}</p>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <h6 className="text-sm font-semibold text-slate-100">{data.pilotLifecycleTitle}</h6>
            <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotLifecycleBody}</p>
            <ol className="mt-3 flex flex-wrap gap-2">
              {data.pilotLifecycle.map((status, index) => (
                <li key={status} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-700 px-2.5 py-1.5 text-sm text-slate-300">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-cyan-950 text-xs font-semibold text-cyan-300">{index + 1}</span>
                  {status}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <h6 className="text-sm font-semibold text-slate-100">{data.pilotControlsTitle}</h6>
            <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotControlsBody}</p>
            <div className="mt-3 grid gap-3 xl:grid-cols-2">
              {data.pilotControls.map(([step, preparer, controller, evidence, gate], index) => (
                <article key={step} className="rounded-md border border-slate-700 bg-slate-950/20 p-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-950 text-xs font-semibold text-cyan-300">{index + 1}</span>
                    <h6 className="text-sm font-semibold text-slate-100">{step}</h6>
                  </div>
                  <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                    {[preparer, controller, evidence, gate].map((value, fieldIndex) => (
                      <div key={data.pilotControlLabels[fieldIndex]}>
                        <dt className="text-xs font-semibold uppercase text-slate-500">{data.pilotControlLabels[fieldIndex]}</dt>
                        <dd className="mt-1 text-sm leading-5 text-slate-300">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h6 className="text-sm font-semibold text-slate-100">{data.pilotSubmodelTitle}</h6>
                <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotSubmodelBody}</p>
              </div>
              <span className="rounded-md border border-amber-600/70 bg-amber-950/20 px-2.5 py-1 text-xs font-semibold text-amber-200">{data.pilotSubmodelStatus}</span>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {data.pilotSubmodelObjects.map(([identifier, role, owner, cardinality]) => (
                <article key={identifier} className="rounded-md border border-slate-700 bg-slate-950/20 p-3">
                  <code className="break-all text-sm font-semibold text-cyan-300">{identifier}</code>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{role}</p>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div><dt className="text-xs font-semibold uppercase text-slate-500">{data.pilotOwner}</dt><dd className="mt-1 leading-5 text-slate-300">{owner}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase text-slate-500">{data.pilotCardinality}</dt><dd className="mt-1 leading-5 text-slate-300">{cardinality}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="mt-3 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3">
              <h6 className="text-sm font-semibold text-slate-100">{data.pilotGuardrailsTitle}</h6>
              <ul className="mt-2 grid gap-2 md:grid-cols-2">
                {data.pilotGuardrails.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm leading-5 text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} aria-hidden="true" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t border-slate-700 pt-4">
              <h6 className="text-sm font-semibold text-slate-100">{data.pilotReservationLifecycleTitle}</h6>
              <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-400">{data.pilotReservationLifecycleBody}</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {data.pilotReservationLifecycle.map(([status, meaning], index) => (
                  <li key={status} className="rounded-md border border-slate-700 bg-slate-950/20 p-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-cyan-950 text-xs font-semibold text-cyan-300">{index + 1}</span>
                      <span className="text-sm font-semibold text-slate-100">{status}</span>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-slate-400">{meaning}</p>
                  </li>
                ))}
              </ol>
              <h6 className="mt-4 text-sm font-semibold text-slate-100">{data.pilotReservationEvidenceTitle}</h6>
              <ul className="mt-2 grid gap-2 md:grid-cols-2">
                {data.pilotReservationEvidence.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

const ProcessesView = ({ data }) => (
  <div className="mt-5">
    <ViewHeader data={data} />
    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{data.steps.map(([title, body], index) => <article key={title} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><div className="flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-950 text-xs font-semibold text-blue-300">{index + 1}</span><h4 className="text-sm font-semibold text-slate-100">{title}</h4></div><p className="mt-2 text-sm leading-5 text-slate-400">{body}</p></article>)}</div>
    <section className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3" aria-labelledby="minimum-global-controls"><h4 id="minimum-global-controls" className="flex items-center gap-2 text-sm font-semibold text-slate-100"><ShieldCheck className="text-emerald-300" size={19} aria-hidden="true" />{data.controlsTitle}</h4><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{data.controls.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="shrink-0 text-emerald-300" size={16} aria-hidden="true" />{item}</div>)}</div></section>
  </div>
);

const ResourcesView = ({ data, onNavigate }) => {
  const icons = [FolderCog, FileSearch, History, Workflow];
  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{data.cards.map(([title, body, path, label], index) => { const Icon = icons[index]; return <article key={title} className="flex flex-col rounded-md border border-slate-700 bg-slate-900/35 p-3"><div className="flex items-center gap-2"><Icon className="text-blue-300" size={20} aria-hidden="true" /><h4 className="text-sm font-semibold text-slate-100">{title}</h4></div><p className="mt-2 flex-1 text-sm leading-5 text-slate-400">{body}</p><button type="button" onClick={() => onNavigate(path)} className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">{data.open} {label}<ArrowRight size={16} aria-hidden="true" /></button></article>; })}</div>
    </div>
  );
};

const GlossaryView = ({ data, language, selectedKpi, onNavigate }) => {
  const kpiGroups = getDashboardKpiDefinitions(language);
  const kpis = Object.values(kpiGroups).flat();
  const selectedKpiExists = kpis.some(({ id }) => id === selectedKpi);

  useEffect(() => {
    if (!selectedKpi || !selectedKpiExists) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`dashboard-kpi-definition-${selectedKpi}`)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedKpi, selectedKpiExists]);

  return (
    <div className="mt-5">
      <ViewHeader data={data} />
      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{data.terms.map(([term, definition]) => <div key={term} className="rounded-md border border-slate-700 bg-slate-900/35 p-3"><dt className="flex items-center gap-2 text-sm font-semibold text-slate-100"><BookOpenText className="shrink-0 text-blue-300" size={18} aria-hidden="true" />{term}</dt><dd className="mt-2 text-sm leading-5 text-slate-400">{definition}</dd></div>)}</dl>
      <section className="mt-5 border-t border-slate-700 pt-5" aria-labelledby="dashboard-kpi-dictionary-title">
        <h4 id="dashboard-kpi-dictionary-title" className="text-base font-semibold text-slate-100">{data.kpiTitle}</h4>
        <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-400">{data.kpiBody}</p>
        {Object.entries(kpiGroups).map(([groupId, groupKpis]) => (
          <section key={groupId} className="mt-5" aria-labelledby={`dashboard-kpi-group-${groupId}`}>
            <h5 id={`dashboard-kpi-group-${groupId}`} className="border-l-2 border-blue-500 pl-3 text-sm font-semibold text-slate-100">{data.kpiGroups[groupId]}</h5>
            <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
              {groupKpis.map((kpi) => {
                const selected = selectedKpi === kpi.id;
                return (
                  <article
                    key={kpi.id}
                    id={`dashboard-kpi-definition-${kpi.id}`}
                    className={`scroll-mt-28 rounded-md border p-4 ${selected ? 'border-blue-400 bg-blue-950/25 ring-1 ring-blue-500/40' : 'border-slate-700 bg-slate-900/35'}`}
                  >
                    <h6 className="flex items-center gap-2 text-base font-semibold text-slate-100"><BookOpenText className="shrink-0 text-blue-300" size={19} aria-hidden="true" />{kpi.label}</h6>
                    <dl className="mt-3 space-y-3 text-sm">
                      {['definition', 'scope', 'source', 'freshness', 'action'].map((field) => (
                        <div key={field}>
                          <dt className="font-semibold text-slate-200">{data.fields[field]}</dt>
                          <dd className="mt-0.5 leading-5 text-slate-400">{kpi[field]}</dd>
                        </div>
                      ))}
                    </dl>
                    <button type="button" onClick={() => onNavigate(`/?view=overview&dashboardKpi=${encodeURIComponent(kpi.id)}#dashboard-kpi-${kpi.id}`)} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-blue-400 hover:bg-slate-700">{data.viewIndicator}<ArrowRight size={16} aria-hidden="true" /></button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </section>
      <button type="button" onClick={() => onNavigate('/ged?tab=glossary&returnTo=dashboard-glossary')} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">{data.open}<ArrowRight size={16} aria-hidden="true" /></button>
    </div>
  );
};

const DashboardGovernanceViews = ({ activeView, language = 'FR', selectedKpi = '', onNavigate }) => {
  const t = copy[language] || copy.FR;
  if (activeView === 'architecture') return <ArchitectureView data={t.architecture} />;
  if (activeView === 'processes') return <ProcessesView data={t.processes} />;
  if (activeView === 'incidents') return <DashboardIncidentRiskOverview language={language} onNavigate={onNavigate} />;
  if (activeView === 'resources') return <ResourcesView data={t.resources} onNavigate={onNavigate} />;
  if (activeView === 'glossary') return <GlossaryView data={t.glossary} language={language} selectedKpi={selectedKpi} onNavigate={onNavigate} />;
  return null;
};

export default DashboardGovernanceViews;
