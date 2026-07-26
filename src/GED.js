import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BookOpen,
  CalendarClock,
  Download,
  Edit2,
  ExternalLink,
  FileText,
  Folder,
  HelpCircle,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  Wrench,
  X
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';
import { getOfferTaxonomy } from './offerTaxonomy';
import { getDigitalOffersTaxonomyData } from './taxonomyDataProvider';

const GED = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Translations
  const translations = {
    FR: {
      title: 'Gestion Documentaire (GED)',
      subtitle: 'Gestion des Documents et des Dossiers',
      overview: 'Vue d\'ensemble',
      documents: 'Documents',
      dossiers: 'Dossiers',
      archives: 'Archives',
      totalDocuments: 'Total Documents',
      totalDossiers: 'Total Dossiers',
      storageTaille: 'Stockage Total',
      documentsActifs: 'Documents Actifs',
      documentsParType: 'Documents par Type',
      tailleParDossier: 'Taille par Dossier',
      nom: 'Nom',
      type: 'Type',
      dossier: 'Dossier',
      dateCreation: 'Date de Création',
      taille: 'Taille',
      statut: 'Statut',
      actions: 'Actions',
      nombreDocs: 'Nombre de Docs',
      nouvelDocument: 'Nouveau Document',
      nouveauDossier: 'Nouveau Dossier',
      creer: 'Créer',
      annuler: 'Annuler',
      remplirChamps: 'Veuillez remplir les champs obligatoires',
      nonRenseigne: 'Non renseigné',
      nomDocument: 'Nom du document',
      nomDossier: 'Nom du dossier',
      knowledgeTitle: 'Veille & Knowledge Management',
      knowledgeSubtitle: 'Usages internes du DAS Digital pour organiser la GED, la veille et la connaissance 2SG.',
      digitalDas: 'DAS Digital',
      internalUsage: 'Usage interne',
      informationManagement: 'Gestion de l\'information',
      usage: 'Usage',
      offerFamily: 'Famille d\'offre',
      offerSubFamily: 'Sous-famille d\'offre',
      offerType: 'Type d\'offre',
      productService: 'Produit / service',
      activeStatus: 'Actif',
      inProgressStatus: 'En cours',
      toStructureStatus: 'A structurer',
      taxonomyNote: 'KM reste un alias technique : une seule ligne est affichee, Knowledge Management (KM).',
      gedUsage: 'GED',
      veilleUsage: 'Veille',
      knowledgeManagementUsage: 'Knowledge Management (KM)',
      gedProductService: 'Gestion documentaire M3S',
      veilleProductService: 'Veille strategique 2SG',
      knowledgeProductService: 'Base de connaissances interne',
      aiDigitalTitle: 'IA & Digital',
      aiDigitalSubtitle: 'Usages internes du DAS Digital pour suivre l\'IA interne et les automatisations M3S.',
      internalAutomation: 'Automatisation interne',
      aiInternalUsage: 'IA interne',
      automationInternalUsage: 'Automatisation interne',
      aiInternalProductService: 'IA interne M3S',
      automationInternalProductService: 'Automatisations internes M3S',
      documentTools: 'Outils documents',
      documentToolsTitle: 'Outils documents / FluxConvert',
      documentToolsSubtitle: 'Vue pilote locale pour cadrer les outils GED internes avant tout branchement API, CRM ou Administration.',
      internalPilotTool: 'Outil interne pilote',
      notCrmOffer: 'Pas encore une offre CRM',
      availableTools: 'Outils disponibles',
      supportedFormats: 'Formats pris en charge',
      internalUseCases: 'Cas d usage internes',
      fluxConvertTitle: 'FluxConvert',
      fluxConvertDescription: 'Convertisseur documentaire interne pour PDF, images et documents Office.',
      conversionPdf: 'Conversion PDF',
      mergeFiles: 'Fusion',
      splitFiles: 'Decoupe',
      compression: 'Compression',
      officeConversion: 'Conversion Office',
      imageConversion: 'Conversion image',
      toolCapability: 'Capacite',
      toolScope: 'Perimetre',
      toolStatus: 'Statut',
      localPilotNoApi: 'Pilote local sans API',
      pilotScope: 'Pilote local · Lecture seule',
      pilotFreshness: 'Référence mise à jour le 26-07-2026',
      searchTools: 'Rechercher une capacité documentaire',
      searchKnowledge: 'Rechercher dans les connaissances',
      searchPlaceholder: 'Saisir un mot-clé',
      source: 'Source',
      freshness: 'Fraîcheur',
      maturity: 'Maturité',
      responsible: 'Responsable',
      informationType: 'Nature',
      viewDetails: 'Voir le détail',
      detailTitle: 'Détail du pilote GED',
      close: 'Fermer',
      noResult: 'Aucun résultat pour cette recherche.',
      internalReference: 'Référentiel fonctionnel Gestion documentaire V2',
      taxonomyReference: 'Taxonomie des offres digitales M3S',
      designReference: 'Cadrage Design System M3S V2',
      pilotMaturity: 'Pilote local',
      operationalMaturity: 'Usage interne actif',
      structuringMaturity: 'À structurer',
      factType: 'Fait',
      ruleType: 'Règle',
      suggestionType: 'Suggestion',
      humanDecisionType: 'Décision humaine',
      humanDecisionNote: 'La validation reste humaine. Cette vue n’écrit dans aucun document, API ou système externe.',
      sourceNote: 'La source et sa date permettent de distinguer une information traçable d’une simple suggestion.',
      archivesTitle: 'Archives GED',
      archivesSubtitle: 'Vue locale pilote pour suivre l execution documentaire des archives, sans politique de conservation officielle.',
      operationalArchive: 'Archive operationnelle',
      governanceLater: 'Gouvernance Administration plus tard',
      archivedDocuments: 'Documents archives',
      archiveTypes: 'Typologies',
      pendingActions: 'Actions a suivre',
      indicativeDuration: 'Duree indicative',
      owner: 'Responsable',
      nextAction: 'Prochaine action',
      archiveType: 'Typologie',
      archiveGovernanceNote: 'Les durees affichees sont indicatives pour le pilote GED. Les regles de conservation, droits et responsabilites detaillees relevent plus tard d Administration / gouvernance documentaire.'
    },
    EN: {
      title: 'Document Management (GED)',
      subtitle: 'Documents and Folders Management',
      overview: 'Overview',
      documents: 'Documents',
      dossiers: 'Folders',
      archives: 'Archives',
      totalDocuments: 'Total Documents',
      totalDossiers: 'Total Folders',
      storageTaille: 'Total Storage',
      documentsActifs: 'Active Documents',
      documentsParType: 'Documents by Type',
      tailleParDossier: 'Size by Folder',
      nom: 'Name',
      type: 'Type',
      dossier: 'Folder',
      dateCreation: 'Creation Date',
      taille: 'Size',
      statut: 'Status',
      actions: 'Actions',
      nombreDocs: 'Number of Docs',
      nouvelDocument: 'New Document',
      nouveauDossier: 'New Folder',
      creer: 'Create',
      annuler: 'Cancel',
      remplirChamps: 'Please fill in all required fields',
      nonRenseigne: 'Not provided',
      nomDocument: 'Document name',
      nomDossier: 'Folder name',
      knowledgeTitle: 'Monitoring & Knowledge Management',
      knowledgeSubtitle: 'Internal Digital DAS usages for structuring document management, monitoring and 2SG knowledge.',
      digitalDas: 'Digital DAS',
      internalUsage: 'Internal usage',
      informationManagement: 'Information management',
      usage: 'Usage',
      offerFamily: 'Offer family',
      offerSubFamily: 'Offer sub-family',
      offerType: 'Offer type',
      productService: 'Product / service',
      activeStatus: 'Active',
      inProgressStatus: 'In progress',
      toStructureStatus: 'To structure',
      taxonomyNote: 'KM remains a technical alias: the interface displays one Knowledge Management (KM) row only.',
      gedUsage: 'GED',
      veilleUsage: 'Monitoring',
      knowledgeManagementUsage: 'Knowledge Management (KM)',
      gedProductService: 'M3S document management',
      veilleProductService: '2SG strategic monitoring',
      knowledgeProductService: 'Internal knowledge base',
      aiDigitalTitle: 'AI & Digital',
      aiDigitalSubtitle: 'Internal Digital DAS usages for tracking M3S internal AI and automations.',
      internalAutomation: 'Internal automation',
      aiInternalUsage: 'Internal AI',
      automationInternalUsage: 'Internal automation',
      aiInternalProductService: 'M3S internal AI',
      automationInternalProductService: 'M3S internal automations',
      documentTools: 'Document tools',
      documentToolsTitle: 'Document tools / FluxConvert',
      documentToolsSubtitle: 'Local pilot view for framing internal GED tools before any API, CRM or Administration integration.',
      internalPilotTool: 'Internal pilot tool',
      notCrmOffer: 'Not yet a CRM offer',
      availableTools: 'Available tools',
      supportedFormats: 'Supported formats',
      internalUseCases: 'Internal use cases',
      fluxConvertTitle: 'FluxConvert',
      fluxConvertDescription: 'Internal document converter for PDF, images and Office documents.',
      conversionPdf: 'PDF conversion',
      mergeFiles: 'Merge',
      splitFiles: 'Split',
      compression: 'Compression',
      officeConversion: 'Office conversion',
      imageConversion: 'Image conversion',
      toolCapability: 'Capability',
      toolScope: 'Scope',
      toolStatus: 'Status',
      localPilotNoApi: 'Local pilot without API',
      pilotScope: 'Local pilot · Read only',
      pilotFreshness: 'Reference updated on 26-07-2026',
      searchTools: 'Search document capabilities',
      searchKnowledge: 'Search knowledge',
      searchPlaceholder: 'Enter a keyword',
      source: 'Source',
      freshness: 'Freshness',
      maturity: 'Maturity',
      responsible: 'Owner',
      informationType: 'Nature',
      viewDetails: 'View details',
      detailTitle: 'GED pilot details',
      close: 'Close',
      noResult: 'No result for this search.',
      internalReference: 'Document Management functional reference V2',
      taxonomyReference: 'M3S digital offer taxonomy',
      designReference: 'M3S Design System V2 framing',
      pilotMaturity: 'Local pilot',
      operationalMaturity: 'Active internal usage',
      structuringMaturity: 'To structure',
      factType: 'Fact',
      ruleType: 'Rule',
      suggestionType: 'Suggestion',
      humanDecisionType: 'Human decision',
      humanDecisionNote: 'Validation remains human. This view does not write to any document, API or external system.',
      sourceNote: 'The source and its date distinguish traceable information from a simple suggestion.',
      archivesTitle: 'GED archives',
      archivesSubtitle: 'Local pilot view for tracking archive execution, without official retention policy.',
      operationalArchive: 'Operational archive',
      governanceLater: 'Administration governance later',
      archivedDocuments: 'Archived documents',
      archiveTypes: 'Types',
      pendingActions: 'Follow-up actions',
      indicativeDuration: 'Indicative duration',
      owner: 'Owner',
      nextAction: 'Next action',
      archiveType: 'Type',
      archiveGovernanceNote: 'Displayed durations are indicative for the GED pilot. Detailed retention rules, access rights and responsibilities belong later to Administration / document governance.'
    },
    DE: {
      title: 'Dokumentenverwaltung (GED)',
      subtitle: 'Verwaltung von Dokumenten und Ordnern',
      overview: 'Übersicht',
      documents: 'Dokumente',
      dossiers: 'Ordner',
      totalDocuments: 'Gesamtdokumente',
      totalDossiers: 'Gesamtordner',
      storageTaille: 'Gesamtspeicher',
      documentsActifs: 'Aktive Dokumente',
      documentsParType: 'Dokumente nach Typ',
      tailleParDossier: 'Größe nach Ordner',
      nom: 'Name',
      type: 'Typ',
      dossier: 'Ordner',
      dateCreation: 'Erstellungsdatum',
      taille: 'Größe',
      statut: 'Status',
      actions: 'Aktionen',
      nombreDocs: 'Anzahl der Dokumente',
      nouvelDocument: 'Neues Dokument',
      nouveauDossier: 'Neuer Ordner',
      creer: 'Erstellen',
      annuler: 'Abbrechen',
      remplirChamps: 'Bitte füllen Sie alle erforderlichen Felder aus',
      nonRenseigne: 'Nicht angegeben',
      nomDocument: 'Dokumentname',
      nomDossier: 'Ordnername',
      knowledgeTitle: 'Monitoring & Wissensmanagement',
      knowledgeSubtitle: 'Interne Nutzungen des digitalen DAS fuer GED, Monitoring und 2SG-Wissen.',
      digitalDas: 'DAS Digital',
      internalUsage: 'Interne Nutzung',
      informationManagement: 'Informationsmanagement',
      usage: 'Nutzung',
      offerFamily: 'Angebotsfamilie',
      offerSubFamily: 'Angebotsunterfamilie',
      offerType: 'Angebotstyp',
      productService: 'Produkt / Dienstleistung',
      activeStatus: 'Aktiv',
      inProgressStatus: 'In Bearbeitung',
      toStructureStatus: 'Zu strukturieren',
      taxonomyNote: 'KM bleibt ein technischer Alias: die Oberflaeche zeigt nur eine Zeile Knowledge Management (KM).',
      gedUsage: 'GED',
      veilleUsage: 'Monitoring',
      knowledgeManagementUsage: 'Knowledge Management (KM)',
      gedProductService: 'M3S-Dokumentenverwaltung',
      veilleProductService: 'Strategisches Monitoring 2SG',
      knowledgeProductService: 'Interne Wissensbasis',
      aiDigitalTitle: 'KI & Digital',
      aiDigitalSubtitle: 'Interne Nutzungen des DAS Digital fuer interne KI und M3S-Automatisierungen.',
      internalAutomation: 'Interne Automatisierung',
      aiInternalUsage: 'Interne KI',
      automationInternalUsage: 'Interne Automatisierung',
      aiInternalProductService: 'Interne KI M3S',
      automationInternalProductService: 'Interne Automatisierungen M3S',
      documentTools: 'Dokument-Tools',
      documentToolsTitle: 'Dokument-Tools / FluxConvert',
      documentToolsSubtitle: 'Lokale Pilotansicht fuer interne GED-Tools vor API-, CRM- oder Administrationsintegration.',
      internalPilotTool: 'Internes Pilot-Tool',
      notCrmOffer: 'Noch kein CRM-Angebot',
      availableTools: 'Verfuegbare Tools',
      supportedFormats: 'Unterstuetzte Formate',
      internalUseCases: 'Interne Anwendungsfaelle',
      fluxConvertTitle: 'FluxConvert',
      fluxConvertDescription: 'Interner Dokumentkonverter fuer PDF, Bilder und Office-Dokumente.',
      conversionPdf: 'PDF-Konvertierung',
      mergeFiles: 'Zusammenfuehren',
      splitFiles: 'Aufteilen',
      compression: 'Komprimierung',
      officeConversion: 'Office-Konvertierung',
      imageConversion: 'Bildkonvertierung',
      toolCapability: 'Faehigkeit',
      toolScope: 'Umfang',
      toolStatus: 'Status',
      localPilotNoApi: 'Lokaler Pilot ohne API',
      pilotScope: 'Lokaler Pilot · Nur lesen',
      pilotFreshness: 'Referenz aktualisiert am 26.07.2026',
      searchTools: 'Dokumentfunktionen suchen',
      searchKnowledge: 'Wissen durchsuchen',
      searchPlaceholder: 'Suchbegriff eingeben',
      source: 'Quelle',
      freshness: 'Aktualität',
      maturity: 'Reifegrad',
      responsible: 'Verantwortlich',
      informationType: 'Art',
      viewDetails: 'Details anzeigen',
      detailTitle: 'Details zum GED-Piloten',
      close: 'Schließen',
      noResult: 'Kein Ergebnis für diese Suche.',
      internalReference: 'Funktionales Referenzwerk Dokumentenverwaltung V2',
      taxonomyReference: 'M3S-Taxonomie der digitalen Angebote',
      designReference: 'Rahmen des M3S Design Systems V2',
      pilotMaturity: 'Lokaler Pilot',
      operationalMaturity: 'Aktive interne Nutzung',
      structuringMaturity: 'Zu strukturieren',
      factType: 'Fakt',
      ruleType: 'Regel',
      suggestionType: 'Vorschlag',
      humanDecisionType: 'Menschliche Entscheidung',
      humanDecisionNote: 'Die Validierung bleibt menschlich. Diese Ansicht schreibt in kein Dokument, keine API und kein externes System.',
      sourceNote: 'Quelle und Datum unterscheiden nachvollziehbare Informationen von einfachen Vorschlägen.'
    }
  };

  const t = translations[language];

  // Data translations
  const dataTranslations = {
    // Document types
    documentTypes: {
      FR: { 'PDF': 'PDF', 'Word': 'Word', 'Excel': 'Excel', 'XLSX': 'Excel', 'JS': 'JS', 'JSX': 'JSX', 'MD': 'Markdown', 'Document': 'Document' },
      EN: { 'PDF': 'PDF', 'Word': 'Word', 'Excel': 'Excel', 'XLSX': 'Excel', 'JS': 'JS', 'JSX': 'JSX', 'MD': 'Markdown', 'Document': 'Document' },
      DE: { 'PDF': 'PDF', 'Word': 'Word', 'Excel': 'Excel', 'XLSX': 'Excel', 'JS': 'JS', 'JSX': 'JSX', 'MD': 'Markdown', 'Document': 'Dokument' }
    },
    // Folder names
    folderNames: {
      FR: {
        'Contrats': 'Contrats',
        'Factures': 'Factures',
        'Rapports': 'Rapports',
        'Documentation': 'Documentation',
        'Stratégie': 'Stratégie',
        'Ressources': 'Ressources',
        'General': 'Général',
        'Autre': 'Autre',
        'Bases de Données': 'Bases de Données'
      },
      EN: {
        'Contrats': 'Contracts',
        'Factures': 'Invoices',
        'Rapports': 'Reports',
        'Documentation': 'Documentation',
        'Stratégie': 'Strategy',
        'Ressources': 'Resources',
        'General': 'General',
        'Autre': 'Other',
        'Bases de Données': 'Databases'
      },
      DE: {
        'Contrats': 'Verträge',
        'Factures': 'Rechnungen',
        'Rapports': 'Berichte',
        'Documentation': 'Dokumentation',
        'Stratégie': 'Strategie',
        'Ressources': 'Ressourcen',
        'General': 'Allgemein',
        'Autre': 'Andere',
        'Bases de Données': 'Datenbanken'
      }
    },
    // Document names
    documentNames: {
      FR: {
        'Contrat Client SENELEC': 'Contrat Client SENELEC',
        'Facture Janvier 2026': 'Facture Janvier 2026',
        'Rapport Audit Q1': 'Rapport Audit Q1',
        'Manuel Utilisateur': 'Manuel Utilisateur',
        'Plan Stratégique 2026': 'Plan Stratégique 2026',
        'Procédures RH': 'Procédures RH'
      },
      EN: {
        'Contrat Client SENELEC': 'SENELEC Client Contract',
        'Facture Janvier 2026': 'January 2026 Invoice',
        'Rapport Audit Q1': 'Q1 Audit Report',
        'Manuel Utilisateur': 'User Manual',
        'Plan Stratégique 2026': '2026 Strategic Plan',
        'Procédures RH': 'HR Procedures'
      },
      DE: {
        'Contrat Client SENELEC': 'SENELEC-Kundenvertrag',
        'Facture Janvier 2026': 'Rechnung Januar 2026',
        'Rapport Audit Q1': 'Q1-Audit-Bericht',
        'Manuel Utilisateur': 'Benutzerhandbuch',
        'Plan Stratégique 2026': 'Strategischer Plan 2026',
        'Procédures RH': 'Personalverfahren'
      }
    },
    taxonomyLabels: {
      FR: {
        DIGITAL: 'Digital',
        USAGE_INTERNE: 'Usage interne',
        GESTION_INFORMATION: 'Gestion de l\'information',
        GED: 'GED',
        VEILLE: 'Veille',
        KNOWLEDGE_MANAGEMENT: 'Knowledge Management',
        AUTOMATISATION_INTERNE: 'Automatisation interne',
        IA_INTERNE: 'IA interne'
      },
      EN: {
        DIGITAL: 'Digital',
        USAGE_INTERNE: 'Internal usage',
        GESTION_INFORMATION: 'Information management',
        GED: 'GED',
        VEILLE: 'Monitoring',
        KNOWLEDGE_MANAGEMENT: 'Knowledge Management',
        AUTOMATISATION_INTERNE: 'Internal automation',
        IA_INTERNE: 'Internal AI'
      },
      DE: {
        DIGITAL: 'Digital',
        USAGE_INTERNE: 'Interne Nutzung',
        GESTION_INFORMATION: 'Informationsmanagement',
        GED: 'GED',
        VEILLE: 'Monitoring',
        KNOWLEDGE_MANAGEMENT: 'Knowledge Management',
        AUTOMATISATION_INTERNE: 'Interne Automatisierung',
        IA_INTERNE: 'Interne KI'
      }
    }
  };

  // Helper functions
  const translateDocumentType = (type) => dataTranslations.documentTypes[language]?.[type] || type;
  const translateFolderName = (name) => dataTranslations.folderNames[language]?.[name] || name;
  const translateDocumentName = (name) => dataTranslations.documentNames[language]?.[name] || name;
  const translateTaxonomyLabel = (value) => dataTranslations.taxonomyLabels[language]?.[value] || value;
  const formatValue = (value) => {
    const text = String(value || '').trim();
    return text && text !== 'N/A' ? text : t.nonRenseigne;
  };
  const formatSize = (value) => {
    const text = String(value || '').trim();
    return text && text !== '0' ? text : '0 MB';
  };

  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('document');
  const [editingId, setEditingId] = useState(null);
  const [taxonomyItems, setTaxonomyItems] = useState(null);
  const [toolQuery, setToolQuery] = useState('');
  const [knowledgeQuery, setKnowledgeQuery] = useState('');
  const [selectedPilotDetail, setSelectedPilotDetail] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'PDF',
    dossier: '',
    dateCreation: new Date().toISOString().split('T')[0],
    taille: '',
    statut: 'Actif'
  });

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['overview', 'documents', 'dossiers', 'archives', 'outils-documents', 'knowledge', 'ai-digital', 'database', 'user-guide', 'tech-docs', 'help-support', 'manual'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  const selectTab = (tab) => {
    setActiveTab(tab);
    navigate(`/ged?tab=${tab}`);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTaxonomy = async () => {
      const response = await getDigitalOffersTaxonomyData();
      if (!isMounted) return;
      setTaxonomyItems(Array.isArray(response.items) ? response.items : null);
    };

    loadTaxonomy();

    return () => {
      isMounted = false;
    };
  }, []);
 
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await api.getDocuments(250, 0);
        if (!response?.data || !Array.isArray(response.data)) return;

        const mappedDocuments = response.data.map(doc => ({
          id: doc.id,
          nom: doc.name || doc.title || doc.id || '',
          type: doc.type || doc.extension || 'Document',
          dossier: doc.folder || doc.category || 'General',
          dateCreation: doc.created_at ? doc.created_at.split('T')[0] : '',
          taille: doc.size || '0 MB',
          statut: doc.status || 'Actif'
        }));

        const folders = new Map();
        mappedDocuments.forEach(doc => {
          const folderName = doc.dossier || 'General';
          const current = folders.get(folderName) || {
            id: folderName,
            nom: folderName,
            dateCreation: '',
            nombreDocs: 0,
            taille: '0 MB'
          };
          current.nombreDocs += 1;
          folders.set(folderName, current);
        });

        setDocuments(mappedDocuments);
        setDossiers(Array.from(folders.values()));
      } catch (error) {
        console.warn('GED API fallback:', error.message);
      }
    };

    loadDocuments();

    setDocuments([
      { id: 1, nom: 'Contrat Client SENELEC', type: 'PDF', dossier: 'Contrats', dateCreation: '2026-03-15', taille: '2.5 MB', statut: 'Actif' },
      { id: 2, nom: 'Facture Janvier 2026', type: 'Excel', dossier: 'Factures', dateCreation: '2026-02-01', taille: '0.8 MB', statut: 'Actif' },
      { id: 3, nom: 'Rapport Audit Q1', type: 'PDF', dossier: 'Rapports', dateCreation: '2026-04-10', taille: '5.2 MB', statut: 'Actif' },
      { id: 4, nom: 'Manuel Utilisateur', type: 'PDF', dossier: 'Documentation', dateCreation: '2025-11-20', taille: '12.3 MB', statut: 'Actif' },
      { id: 5, nom: 'Plan Stratégique 2026', type: 'Word', dossier: 'Stratégie', dateCreation: '2026-01-05', taille: '3.1 MB', statut: 'Actif' },
      { id: 6, nom: 'Procédures RH', type: 'Word', dossier: 'Ressources', dateCreation: '2026-02-14', taille: '1.9 MB', statut: 'Inactif' },
    ]);
 
    setDossiers([
      { id: 1, nom: 'Contrats', dateCreation: '2025-01-15', nombreDocs: 12, taille: '45 MB' },
      { id: 2, nom: 'Factures', dateCreation: '2025-06-01', nombreDocs: 48, taille: '120 MB' },
      { id: 3, nom: 'Rapports', dateCreation: '2025-03-10', nombreDocs: 8, taille: '65 MB' },
      { id: 4, nom: 'Documentation', dateCreation: '2024-12-01', nombreDocs: 15, taille: '180 MB' },
      { id: 5, nom: 'Stratégie', dateCreation: '2026-01-01', nombreDocs: 5, taille: '25 MB' },
      { id: 6, nom: 'Ressources', dateCreation: '2025-02-15', nombreDocs: 20, taille: '85 MB' },
    ]);
  }, []);
 
  const totalDocuments = documents.length;
  const totalDossiers = dossiers.length;
  const totalTaille = dossiers.reduce((sum, dossier) => sum + (parseInt(dossier.taille, 10) || 0), 0);
  const documentsActifs = documents.filter(d => d.statut === 'Actif').length;
 
  const documentParType = [
    { type: translateDocumentType('PDF'), typeKey: 'PDF', count: documents.filter(d => d.type === 'PDF').length },
    { type: translateDocumentType('Excel'), typeKey: 'Excel', count: documents.filter(d => d.type === 'Excel').length },
    { type: translateDocumentType('Word'), typeKey: 'Word', count: documents.filter(d => d.type === 'Word').length },
  ];

  const dossierStats = dossiers.map(d => ({
    nom: translateFolderName(d.nom),
    nomKey: d.nom,
    docs: d.nombreDocs,
    taille: parseInt(d.taille)
  }));

  const taxonomyByCode = useMemo(() => {
    const items = Array.isArray(taxonomyItems) ? taxonomyItems : [];
    return new Map(items.map((item) => [item.code, item]));
  }, [taxonomyItems]);

  const knowledgeRows = [
    {
      id: 'GED',
      usage: t.gedUsage,
      taxonomy: taxonomyByCode.get('GED') || getOfferTaxonomy('GED'),
      productService: t.gedProductService,
      status: t.activeStatus,
      informationType: t.ruleType,
      source: t.internalReference,
      freshness: '26-07-2026',
      owner: 'Équipe GED'
    },
    {
      id: 'VEILLE',
      usage: t.veilleUsage,
      taxonomy: taxonomyByCode.get('VEILLE') || getOfferTaxonomy('VEILLE'),
      productService: t.veilleProductService,
      status: t.toStructureStatus,
      informationType: t.suggestionType,
      source: t.designReference,
      freshness: '26-07-2026',
      owner: 'Cheikh'
    },
    {
      id: 'KNOWLEDGE_MANAGEMENT',
      usage: t.knowledgeManagementUsage,
      taxonomy: taxonomyByCode.get('KNOWLEDGE_MANAGEMENT') || getOfferTaxonomy('KNOWLEDGE_MANAGEMENT'),
      productService: t.knowledgeProductService,
      status: t.inProgressStatus,
      informationType: t.factType,
      source: t.taxonomyReference,
      freshness: '26-07-2026',
      owner: 'Équipe Digital'
    }
  ];

  const aiDigitalRows = [
    {
      id: 'IA_INTERNE',
      usage: t.aiInternalUsage,
      taxonomy: taxonomyByCode.get('IA_INTERNE') || getOfferTaxonomy('IA_INTERNE'),
      productService: t.aiInternalProductService,
      status: t.inProgressStatus
    },
    {
      id: 'AUTOMATISATION_INTERNE',
      usage: t.automationInternalUsage,
      taxonomy: taxonomyByCode.get('AUTOMATISATION_INTERNE') || getOfferTaxonomy('AUTOMATISATION_INTERNE'),
      productService: t.automationInternalProductService,
      status: t.toStructureStatus
    }
  ];

  const documentToolCapabilities = [
    {
      id: 'pdf-conversion',
      capability: t.conversionPdf,
      scope: 'PDF vers Office / image',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    },
    {
      id: 'merge-files',
      capability: t.mergeFiles,
      scope: 'PDF et documents',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    },
    {
      id: 'split-files',
      capability: t.splitFiles,
      scope: 'PDF multi-pages',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    },
    {
      id: 'compression',
      capability: t.compression,
      scope: 'PDF et images',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    },
    {
      id: 'office-conversion',
      capability: t.officeConversion,
      scope: 'Word, Excel, PowerPoint',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    },
    {
      id: 'image-conversion',
      capability: t.imageConversion,
      scope: 'PNG, JPG, WebP',
      status: t.localPilotNoApi,
      maturity: t.pilotMaturity,
      owner: 'Équipe GED',
      source: t.internalReference
    }
  ];

  const normalizedToolQuery = toolQuery.trim().toLocaleLowerCase();
  const filteredDocumentToolCapabilities = documentToolCapabilities.filter((row) => (
    `${row.capability} ${row.scope} ${row.status} ${row.owner}`
      .toLocaleLowerCase()
      .includes(normalizedToolQuery)
  ));

  const normalizedKnowledgeQuery = knowledgeQuery.trim().toLocaleLowerCase();
  const filteredKnowledgeRows = knowledgeRows.filter((row) => (
    `${row.usage} ${row.productService} ${row.status} ${row.informationType} ${row.source} ${row.owner}`
      .toLocaleLowerCase()
      .includes(normalizedKnowledgeQuery)
  ));

  const documentToolStats = {
    tools: 1,
    formats: 9,
    useCases: documentToolCapabilities.length
  };

  const archiveRows = [
    {
      id: 'archive-contrat-senelec',
      document: 'Contrat Client SENELEC',
      type: 'Contrat',
      status: t.operationalArchive || 'Archive operationnelle',
      duration: '5 ans indicatifs',
      owner: 'Cheikh',
      nextAction: 'Verifier classement final'
    },
    {
      id: 'archive-rapport-audit',
      document: 'Rapport Audit Q1',
      type: 'Rapport',
      status: t.operationalArchive || 'Archive operationnelle',
      duration: '3 ans indicatifs',
      owner: 'Ibou',
      nextAction: 'Controler indexation'
    },
    {
      id: 'archive-procedures-rh',
      document: 'Procedures RH',
      type: 'Procedure interne',
      status: t.operationalArchive || 'Archive operationnelle',
      duration: 'A confirmer',
      owner: 'Gnilane Diouf',
      nextAction: 'Revoir avec Administration'
    }
  ];

  const archiveStats = {
    documents: archiveRows.length,
    types: new Set(archiveRows.map((row) => row.type)).size,
    actions: archiveRows.filter((row) => row.nextAction).length
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (!formData.nom) {
      alert(t.remplirChamps);
      return;
    }
 
    if (modalType === 'document') {
      if (editingId) {
        setDocuments(documents.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
      } else {
        setDocuments([...documents, { ...formData, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setDossiers(dossiers.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
      } else {
        setDossiers([...dossiers, { ...formData, id: Date.now() }]);
      }
    }
 
    setShowModal(false);
    setEditingId(null);
    setFormData({ nom: '', type: 'PDF', dossier: '', dateCreation: new Date().toISOString().split('T')[0], taille: '', statut: 'Actif' });
  };
 
  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
    setShowModal(true);
  };
 
  const handleDelete = (type, id) => {
    if (type === 'document') setDocuments(documents.filter(d => d.id !== id));
    else setDossiers(dossiers.filter(d => d.id !== id));
  };
 
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">
 
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">{t.totalDocuments}</p>
                <p className="text-white text-2xl font-bold">{totalDocuments}</p>
              </div>
              <FileText size={32} className="text-blue-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">{t.totalDossiers}</p>
                <p className="text-white text-2xl font-bold">{totalDossiers}</p>
              </div>
              <Folder size={32} className="text-green-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">{t.storageTaille}</p>
                <p className="text-white text-2xl font-bold">{totalTaille} MB</p>
              </div>
              <Upload size={32} className="text-purple-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">{t.documentsActifs}</p>
                <p className="text-white text-2xl font-bold">{documentsActifs}</p>
              </div>
              <Download size={32} className="text-orange-400" />
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <ModulePageTabs
          moduleId="it-support"
          language={language}
          activeTab={activeTab}
          onSelect={selectTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'documents', label: t.documents },
            { tab: 'dossiers', label: t.dossiers },
            { tab: 'archives', label: t.archives || 'Archives' },
            { tab: 'outils-documents', label: t.documentTools }
          ]}
        />
 
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.documentsParType}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={documentParType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="type" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
 
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.tailleParDossier}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dossierStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="nom" type="category" stroke="#94a3b8" width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Bar dataKey="taille" fill="#10b981" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
 
        {/* Documents */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('document'); setFormData({ nom: '', type: 'PDF', dossier: '', dateCreation: new Date().toISOString().split('T')[0], taille: '', statut: 'Actif' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelDocument}
              </button>
            </div>
            <TableControls rows={documents} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.type}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.dossier}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.taille}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.dateCreation}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(d => (
                    <tr key={d.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{formatValue(translateDocumentName(d.nom))}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(translateDocumentType(d.type))}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(translateFolderName(d.dossier))}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatSize(d.taille)}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(d.dateCreation)}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit('document', d)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('document', d.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}
 
        {/* Dossiers */}
        {activeTab === 'dossiers' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('dossier'); setFormData({ nom: '', type: 'PDF', dossier: '', dateCreation: new Date().toISOString().split('T')[0], taille: '', statut: 'Actif' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouveauDossier}
              </button>
            </div>
            <TableControls rows={dossiers} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nombreDocs}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.taille}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.dateCreation}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(d => (
                    <tr key={d.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{formatValue(translateFolderName(d.nom))}</td>
                      <td className="px-4 py-2 text-slate-400">{d.nombreDocs}</td>
                      <td className="px-4 py-2 text-slate-400">{formatSize(d.taille)}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(d.dateCreation)}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit('dossier', d)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('dossier', d.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}

        {activeTab === 'archives' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                {t.operationalArchive || 'Archive operationnelle'}
              </span>
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                {t.governanceLater || 'Gouvernance Administration plus tard'}
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {t.localPilotNoApi}
              </span>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <h3 className="text-xl font-bold text-white">{t.archivesTitle || 'Archives GED'}</h3>
              <p className="mt-2 max-w-4xl text-sm text-slate-300">
                {t.archivesSubtitle || 'Vue locale pilote pour suivre l execution documentaire des archives, sans politique de conservation officielle.'}
              </p>
              <p className="mt-3 text-xs text-amber-200">
                {t.archiveGovernanceNote || 'Les durees affichees sont indicatives pour le pilote GED. Les regles de conservation, droits et responsabilites detaillees relevent plus tard d Administration / gouvernance documentaire.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.archivedDocuments || 'Documents archives'}</p>
                <p className="mt-2 text-3xl font-bold text-white">{archiveStats.documents}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.archiveTypes || 'Typologies'}</p>
                <p className="mt-2 text-3xl font-bold text-white">{archiveStats.types}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.pendingActions || 'Actions a suivre'}</p>
                <p className="mt-2 text-3xl font-bold text-white">{archiveStats.actions}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.documents}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.archiveType || 'Typologie'}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.statut}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.indicativeDuration || 'Duree indicative'}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.owner || 'Responsable'}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.nextAction || 'Prochaine action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {archiveRows.map((row) => (
                    <tr key={row.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 font-medium text-slate-200">{row.document}</td>
                      <td className="px-4 py-3 text-slate-300">{row.type}</td>
                      <td className="px-4 py-3 text-slate-300">{row.status}</td>
                      <td className="px-4 py-3 text-slate-300">{row.duration}</td>
                      <td className="px-4 py-3 text-slate-300">{row.owner}</td>
                      <td className="px-4 py-3 text-slate-300">{row.nextAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'outils-documents' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-blue-500/30 bg-slate-800 p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                      <Wrench size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase text-blue-300">{t.pilotScope}</p>
                      <h3 className="text-xl font-bold text-white">{t.documentToolsTitle}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{t.documentToolsSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPilotDetail({
                    title: t.documentToolsTitle,
                    description: t.humanDecisionNote,
                    source: t.designReference,
                    freshness: '26-07-2026',
                    type: t.ruleType
                  })}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-blue-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <HelpCircle size={18} aria-hidden="true" />
                  {t.viewDetails}
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                  {t.internalPilotTool}
                </span>
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  {t.notCrmOffer}
                </span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {t.localPilotNoApi}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.availableTools}</p>
                <p className="mt-2 text-3xl font-bold text-white">{documentToolStats.tools}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.supportedFormats}</p>
                <p className="mt-2 text-3xl font-bold text-white">{documentToolStats.formats}</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <p className="text-sm text-slate-400">{t.internalUseCases}</p>
                <p className="mt-2 text-3xl font-bold text-white">{documentToolStats.useCases}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 md:p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">{t.fluxConvertTitle}</h4>
                  <p className="mt-1 max-w-3xl text-sm text-slate-300">{t.fluxConvertDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200">
                    GED
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-xs text-slate-300">
                    <CalendarClock size={15} aria-hidden="true" />
                    {t.pilotFreshness}
                  </span>
                </div>
              </div>

              <label className="mb-5 block max-w-xl text-sm font-semibold text-slate-200">
                {t.searchTools}
                <span className="relative mt-2 block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                  <input
                    type="search"
                    value={toolQuery}
                    onChange={(event) => setToolQuery(event.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="min-h-11 w-full rounded-lg border border-slate-600 bg-slate-900 py-2 pl-10 pr-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                  />
                </span>
              </label>

              <div className="hidden overflow-x-auto rounded-lg border border-slate-700 md:block">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-white">{t.toolCapability}</th>
                      <th className="px-4 py-3 text-left font-bold text-white">{t.toolScope}</th>
                      <th className="px-4 py-3 text-left font-bold text-white">{t.maturity}</th>
                      <th className="px-4 py-3 text-left font-bold text-white">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocumentToolCapabilities.map((row) => (
                      <tr key={row.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="px-4 py-3 font-medium text-slate-200">{row.capability}</td>
                        <td className="px-4 py-3 text-slate-300">{row.scope}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                            {row.maturity}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setSelectedPilotDetail({
                              title: row.capability,
                              description: row.scope,
                              source: row.source,
                              freshness: '26-07-2026',
                              owner: row.owner,
                              type: t.factType
                            })}
                            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            <ExternalLink size={15} aria-hidden="true" />
                            {t.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 md:hidden">
                {filteredDocumentToolCapabilities.map((row) => (
                  <article key={row.id} className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5 className="font-bold text-white">{row.capability}</h5>
                        <p className="mt-1 text-sm text-slate-300">{row.scope}</p>
                      </div>
                      <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-200">
                        {row.maturity}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPilotDetail({
                        title: row.capability,
                        description: row.scope,
                        source: row.source,
                        freshness: '26-07-2026',
                        owner: row.owner,
                        type: t.factType
                      })}
                      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-600 text-sm font-semibold text-slate-200"
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      {t.viewDetails}
                    </button>
                  </article>
                ))}
              </div>

              {filteredDocumentToolCapabilities.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-600 p-5 text-center text-sm text-slate-400">
                  {t.noResult}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-cyan-500/30 bg-slate-800 p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300">
                      <BookOpen size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase text-cyan-300">{t.pilotScope}</p>
                      <h3 className="text-xl font-bold text-white">{t.knowledgeTitle}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{t.knowledgeSubtitle}</p>
                  <p className="mt-3 text-xs text-slate-400">{t.taxonomyNote}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPilotDetail({
                    title: t.knowledgeTitle,
                    description: t.sourceNote,
                    source: t.taxonomyReference,
                    freshness: '26-07-2026',
                    type: t.ruleType
                  })}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <HelpCircle size={18} aria-hidden="true" />
                  {t.viewDetails}
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                  {t.digitalDas}
                </span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {t.internalUsage}
                </span>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {t.informationManagement}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 md:p-6">
              <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <label className="block max-w-xl text-sm font-semibold text-slate-200">
                  {t.searchKnowledge}
                  <span className="relative mt-2 block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                    <input
                      type="search"
                      value={knowledgeQuery}
                      onChange={(event) => setKnowledgeQuery(event.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="min-h-11 w-full rounded-lg border border-slate-600 bg-slate-900 py-2 pl-10 pr-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    />
                  </span>
                </label>
                <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/40 px-4 text-xs text-slate-300">
                  <CalendarClock size={16} aria-hidden="true" />
                  {t.pilotFreshness}
                </span>
              </div>

              <div className="hidden overflow-x-auto rounded-lg border border-slate-700 lg:block">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.usage}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.productService}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.informationType}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.statut}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.source}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKnowledgeRows.map(row => (
                    <tr key={row.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 font-medium text-slate-200">{row.usage}</td>
                      <td className="px-4 py-3 text-slate-300">{row.productService}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                          {row.informationType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{row.status}</td>
                      <td className="px-4 py-3 text-slate-300">
                        <span className="block">{row.source}</span>
                        <span className="mt-1 block text-xs text-slate-500">{row.freshness}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setSelectedPilotDetail({
                            title: row.usage,
                            description: row.productService,
                            source: row.source,
                            freshness: row.freshness,
                            owner: row.owner,
                            type: row.informationType,
                            taxonomy: [
                              translateTaxonomyLabel(row.taxonomy?.famille_offre),
                              translateTaxonomyLabel(row.taxonomy?.sous_famille_offre),
                              translateTaxonomyLabel(row.taxonomy?.type_offre)
                            ].filter(Boolean).join(' · ')
                          })}
                          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                          <ExternalLink size={15} aria-hidden="true" />
                          {t.viewDetails}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              <div className="grid gap-3 lg:hidden">
                {filteredKnowledgeRows.map((row) => (
                  <article key={row.id} className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white">{row.usage}</h4>
                        <p className="mt-1 text-sm text-slate-300">{row.productService}</p>
                      </div>
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                        {row.informationType}
                      </span>
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-bold uppercase text-slate-500">{t.statut}</dt>
                        <dd className="mt-1 text-slate-200">{row.status}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase text-slate-500">{t.responsible}</dt>
                        <dd className="mt-1 text-slate-200">{row.owner}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-bold uppercase text-slate-500">{t.source}</dt>
                        <dd className="mt-1 text-slate-200">{row.source} · {row.freshness}</dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => setSelectedPilotDetail({
                        title: row.usage,
                        description: row.productService,
                        source: row.source,
                        freshness: row.freshness,
                        owner: row.owner,
                        type: row.informationType,
                        taxonomy: [
                          translateTaxonomyLabel(row.taxonomy?.famille_offre),
                          translateTaxonomyLabel(row.taxonomy?.sous_famille_offre),
                          translateTaxonomyLabel(row.taxonomy?.type_offre)
                        ].filter(Boolean).join(' · ')
                      })}
                      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-600 text-sm font-semibold text-slate-200"
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      {t.viewDetails}
                    </button>
                  </article>
                ))}
              </div>

              {filteredKnowledgeRows.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-600 p-5 text-center text-sm text-slate-400">
                  {t.noResult}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ai-digital' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                {t.digitalDas}
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {t.internalUsage}
              </span>
              <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                {t.internalAutomation}
              </span>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
              <h3 className="text-xl font-bold text-white">{t.aiDigitalTitle}</h3>
              <p className="mt-2 max-w-4xl text-sm text-slate-300">{t.aiDigitalSubtitle}</p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.usage}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.offerFamily}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.offerSubFamily}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.offerType}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.productService}</th>
                    <th className="px-4 py-3 text-left font-bold text-white">{t.statut}</th>
                  </tr>
                </thead>
                <tbody>
                  {aiDigitalRows.map(row => (
                    <tr key={row.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 font-medium text-slate-200">{row.usage}</td>
                      <td className="px-4 py-3 text-slate-300">{formatValue(translateTaxonomyLabel(row.taxonomy?.famille_offre))}</td>
                      <td className="px-4 py-3 text-slate-300">{formatValue(translateTaxonomyLabel(row.taxonomy?.sous_famille_offre))}</td>
                      <td className="px-4 py-3 text-slate-300">{formatValue(translateTaxonomyLabel(row.taxonomy?.type_offre))}</td>
                      <td className="px-4 py-3 text-slate-300">{row.productService}</td>
                      <td className="px-4 py-3 text-slate-300">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ChildTabPlaceholder moduleId="it-support" language={language} activeTab={activeTab} handledTabs={['overview', 'documents', 'dossiers', 'archives', 'outils-documents', 'knowledge', 'ai-digital']} />
        </div>
      </div>

      {selectedPilotDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.detailTitle}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPilotDetail(null);
          }}
        >
          <div className="w-full max-w-xl rounded-lg border border-slate-600 bg-slate-800 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-700 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                  <ShieldCheck size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase text-blue-300">{t.detailTitle}</p>
                  <h3 className="mt-1 text-xl font-bold text-white">{selectedPilotDetail.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPilotDetail(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-300 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={t.close}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <p className="leading-6 text-slate-200">{selectedPilotDetail.description}</p>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.informationType}</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedPilotDetail.type || t.factType}</dd>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.responsible}</dt>
                  <dd className="mt-2 font-semibold text-white">{selectedPilotDetail.owner || '2SG / M3S'}</dd>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 sm:col-span-2">
                  <dt className="text-xs font-bold uppercase text-slate-500">{t.source}</dt>
                  <dd className="mt-2 text-slate-200">{selectedPilotDetail.source}</dd>
                  <dd className="mt-1 text-xs text-slate-500">{t.freshness} : {selectedPilotDetail.freshness}</dd>
                </div>
                {selectedPilotDetail.taxonomy && (
                  <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 sm:col-span-2">
                    <dt className="text-xs font-bold uppercase text-slate-500">{t.offerType}</dt>
                    <dd className="mt-2 text-slate-200">{selectedPilotDetail.taxonomy}</dd>
                  </div>
                )}
              </dl>
              <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
                {t.humanDecisionNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {modalType === 'document' ? t.nouvelDocument : t.nouveauDossier}
            </h2>
 
            <div className="space-y-4">
              <input type="text" placeholder={modalType === 'document' ? t.nomDocument : t.nomDossier} value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <select value={formData.type} onChange={(e) => handleFormChange('type', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                <option value="PDF">{translateDocumentType('PDF')}</option>
                <option value="Word">{translateDocumentType('Word')}</option>
                <option value="Excel">{translateDocumentType('Excel')}</option>
              </select>
              <LocalizedDateInput value={formData.dateCreation} onChange={(date) => handleFormChange('dateCreation', date)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
            </div>
 
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{t.creer}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GED;
