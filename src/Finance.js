import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import { Edit2, Trash2, TrendingUp, TrendingDown, ArrowRightLeft, Building2, Calculator, BarChart3, History, SlidersHorizontal, Heart, UsersRound, Database, AlertTriangle, CheckCircle2, LoaderCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api'; // Phase 2: Aide API pour données BigQuery réelles
import { ModulePageTabs, ChildTabPlaceholder, centerTabHorizontally } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';
import { isLegacyBuCode, translateDas } from './strategicMapping';
import FinanceGlossary from './FinanceGlossary';
import { StandardCreateButton } from './StandardUI';
import FinanceFunctionFrame from './FinanceFunctionFrame';
import FinanceOverviewIndicators from './FinanceOverviewIndicators';
import FinanceTransactionCount from './FinanceTransactionCount';
import FinanceAmountPair, { convertFinanceAmount } from './FinanceAmountPair';
import FinanceTransferComparison from './FinanceTransferComparison';
import { createTransferComparison } from './financeTransferQuotes';
import { normalizeFinanceSummary } from './financeSummary';
import { matchesIncomeScope, normalizeIncomeScope } from './financeIncomeScope';
import FinanceArchitecture from './FinanceArchitecture';
import FinanceProcessControls from './FinanceProcessControls';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import FunctionResourcesOverview from './FunctionResourcesOverview';
import FunctionAssistant from './FunctionAssistant';
import {
  buildTeamAgentDirectory,
  findAgentTeam,
  getDirectoryAgentLabel,
  normalizeTeamCode,
  TEAM_CODES
} from './teamDirectory';

const TEAM_OPTIONS = [TEAM_CODES.ZURICH, TEAM_CODES.SENEGAL];
const DEPARTMENT_OPTIONS = [
  'Administration',
  'Finances',
  'Ressources Humaines',
  'Commercial & CRM',
  'Production',
  'Stock & Actifs',
  'IT & Support'
];
const PROJECT_PHASE_OPTIONS = ['Conception', 'Mise en Place', 'Consolidation', 'Dynamisation'];
const COUNTRY_OPTIONS = ['CH', 'SN', 'FR', 'ISR'];
const getFxView = (search) => {
  const view = new URLSearchParams(search).get('fxView');
  return ['converter', 'dashboard', 'history'].includes(view) ? view : 'converter';
};

const parseFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};


const createEmptyFinanceForm = () => ({
  description: '',
  montant: '',
  devise: 'CHF',
  date: new Date().toISOString().split('T')[0],
  categorie: '',
  tauxFxApplique: '',
  agent: '',
  team: '',
  departement: '',
  phaseProjet: '',
  pays: ''
});

const createEmptyImmoForm = () => ({
  date: new Date().toISOString().split('T')[0],
  designation: '',
  montantChf: '',
  montantCfa: '',
  tauxFx: '',
  partCheikhChf: '',
  remboursementCheikhChf: '',
  typeOperation: 'Avance',
  perimetre: 'Immobilier',
  categorie: 'Autre',
  projet: 'Terrain Lac Rose',
  documentRef: '',
  statut: 'En cours',
  agent: '',
  team: '',
  departement: '',
  phaseProjet: ''
});

const Finance = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [financeSummary, setFinanceSummary] = useState(null);
  const [financeSummaryStatus, setFinanceSummaryStatus] = useState('loading');
  const [financeExtractStatus, setFinanceExtractStatus] = useState('loading');
  const [incomeExtractStatus, setIncomeExtractStatus] = useState('loading');
  const incomeScope = normalizeIncomeScope(new URLSearchParams(location.search).get('incomeScope'));
  const [socialRows, setSocialRows] = useState([]);
  const [socialSummary, setSocialSummary] = useState({});
  const [socialError, setSocialError] = useState('');
  const [socialAccessState, setSocialAccessState] = useState('loading');
  const [fxHistory, setFxHistory] = useState([]);
  const [immoTransactions, setImmoTransactions] = useState([]);
  const [immoSummary, setImmoSummary] = useState({});
  const [immoError, setImmoError] = useState('');
  const [immoAccessState, setImmoAccessState] = useState('loading');
  const [showImmoModal, setShowImmoModal] = useState(false);
  const [editingImmoId, setEditingImmoId] = useState(null);
  const [immoFormData, setImmoFormData] = useState(createEmptyImmoForm);
  const [savingImmo, setSavingImmo] = useState(false);
  const [immoFormError, setImmoFormError] = useState(null);
  const immoFormErrorRef = useRef(null);
  const [tauxDuJour, setTauxDuJour] = useState({});
  const [filterDevise, setFilterDevise] = useState('');
  const [fxView, setFxView] = useState(() => getFxView(location.search));
  const fxNavigationRef = useRef(null);
  const activeFxButtonRef = useRef(null);
  const [converterAmount, setConverterAmount] = useState('1000');
  const [converterDirection, setConverterDirection] = useState('CHF_CFA');
  const [converterDate, setConverterDate] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);
  const [transferComparison, setTransferComparison] = useState(createTransferComparison);
  const [showFxModal, setShowFxModal] = useState(false);
  const [editingFxId, setEditingFxId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('recette');
  const [socialModal, setSocialModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [savingFinance, setSavingFinance] = useState(false);
  const [financeFormError, setFinanceFormError] = useState(false);
  const financeFormErrorRef = useRef(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [confirmingAction, setConfirmingAction] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [fxFormData, setFxFormData] = useState({
    devise_from: 'CHF',
    devise_to: 'CFA',
    rate: '',
    date: new Date().toISOString().split('T')[0],
    source: 'Manual'
  });
  const [formData, setFormData] = useState(createEmptyFinanceForm);
  const [directoryMembers, setDirectoryMembers] = useState([]);
  const [agentDirectoryStatus, setAgentDirectoryStatus] = useState('loading');

  // Translations
  const translations = {
    FR: {
      title: 'Finances',
      subtitle: 'Gestion des Recettes, Dépenses et Taux de Change',
      totalRecettes: 'Recettes globales',
      totalDepenses: 'Dépenses globales',
      soldeNet: 'Solde Net',
      tauxFX: 'Taux FX (CFA/CHF)',
      sourceLoading: 'Chargement des totaux globaux...',
      sourceAvailable: 'Totaux globaux disponibles',
      sourceUnavailable: 'Totaux globaux indisponibles',
      missingNotZero: 'Aucune valeur manquante n’est remplacée par zéro.',
      globalSource: 'Source : BigQuery via /finance/dashboard',
      sourceRead: 'Lecture API',
      incomeRecords: 'recettes',
      expenseRecords: 'dépenses',
      loadedExtract: 'extrait chargé pour les tableaux et graphiques',
      extractPartial: 'extrait partiel : une source d’écritures est indisponible',
      extractUnavailable: 'extrait des écritures indisponible',
      maxPerRegister: 'maximum 200 par registre',
      chartScope: 'extrait chargé',
      overview: 'Vue d\'ensemble',
      architecture: 'Architecture & relations',
      processes: 'Processus & procédures',
      recettes: 'Recettes',
      incomeScope: 'Périmètre des recettes',
      allIncome: 'Toutes les recettes',
      incomeDonations: 'Dons',
      incomeFinancing: 'Financements',
      depenses: 'Dépenses',
      fx: 'Historique FX',
      social: 'Social',
      socialTitle: 'SOCIAL - Flux reclassés',
      socialSubtitle: 'Aides sociales et participations ménage séparées des recettes d’exploitation',
      socialHistoricalCfa: 'CFA historiques enregistrés',
      socialCurrentCfa: 'Équivalent CFA au taux du jour',
      socialOperations: 'Opérations reclassées',
      socialPeriod: 'Période couverte',
      socialAnnualChf: 'Flux sociaux par année (CHF)',
      socialAnnualCfa: 'Flux sociaux historiques par année (CFA)',
      socialNotice: 'Ces flux restent traçables dans la source financière, mais sont exclus des recettes d’exploitation.',
      restrictedAccessTitle: 'Accès Finance restreint',
      socialRestrictedAccess: 'Les flux sociaux nécessitent une permission Finance dédiée.',
      immoRestrictedAccess: 'Les données de financement immobilier nécessitent une permission Finance dédiée.',
      restrictedNoSubstitute: 'Aucune valeur n’est affichée ou remplacée par zéro.',
      socialNature: 'Nature',
      beneficiaire: 'Bénéficiaire',
      nouveauFluxSocial: 'Nouveau flux social',
      modifierFluxSocial: 'Modifier le flux social',
      tendance: 'Tendance Recettes vs Dépenses',
      historiqueTaux: 'Historique Taux de Change (CFA/CHF)',
      moyenneAnnuelleFx: 'Taux moyen annuel - 1 CHF en CFA',
      nouvelleRecette: 'Nouvelle Recette',
      nouvelleDepense: 'Nouvelle Dépense',
      description: 'Description',
      montant: 'Montant',
      montantCHF: 'Montant CHF',
      montantCFA: 'Montant CFA',
      tauxFXCol: 'Taux appliqué',
      devise: 'Devise',
      amountPreview: 'Équivalent au taux appliqué',
      enteredAmounts: 'Montants saisis',
      categorie: 'Catégorie',
      choisirCategorie: 'Sélectionner une catégorie',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
      teamZhCollective: 'Team ZH (collectif)',
      teamSnCollective: 'Team SN (collectif)',
      agentSourceLoading: 'Chargement de l’annuaire sécurisé RH-001…',
      agentSourceAvailable: 'Personnes proposées depuis l’annuaire sécurisé RH-001.',
      agentSourceUnavailable: 'Annuaire RH-001 indisponible : seuls les collectifs des équipes sont proposés.',
      agentHistorical: 'valeur historique',
      departement: 'Departement',
      phaseProjet: 'Phase Projet',
      pays: 'Pays',
      date: 'Date',
      actions: 'Actions',
      modifierRecette: 'Modifier recette',
      modifierDepense: 'Modifier dépense',
      creerRecette: 'Nouvelle recette',
      creerDepense: 'Nouvelle dépense',
      creer: 'Créer',
      modifier: 'Modifier',
      supprimer: 'Supprimer',
      annuler: 'Annuler',
      deviseBase: 'Devise Source',
      deviseCible: 'Devise Cible',
      taux: 'Taux',
      source: 'Source',
      nouveauTaux: 'Ajouter Taux',
      modifierTaux: 'Modifier Taux',
      rechercher: 'Rechercher...',
      filtreDevise: 'Filtrer par devise',
      id: 'ID',
      remplirChamps: 'Veuillez remplir les champs obligatoires',
      fxFormRule: 'Choisissez deux devises différentes, un taux strictement positif et une date.',
      fxSessionOnly: 'Modification temporaire dans cette vue, non enregistrée dans la source.',
      financeRequiredError: 'Renseignez une description, une date et un montant numérique. Un zéro explicite est distinct d’un champ vide.',
      convertisseur: 'Convertisseur',
      tableauBordFx: 'Tableau de bord',
      tauxHistorique: 'Taux & Historique',
      parametresConversion: 'Paramètres de conversion',
      direction: 'Direction',
      dateReference: 'Date de référence (vide = taux du jour)',
      tauxApplique: 'Taux appliqué',
      tauxReference: 'Taux de référence',
      tauxReferenceIndisponible: 'Non disponible pour cette date',
      separationTauxInfo: 'Le taux appliqué provient de la transaction ou du fournisseur. Le taux de référence reste un repère distinct.',
      appliedRateError: 'Renseignez un taux appliqué strictement positif, vérifié sur la transaction. Le taux de référence ne le remplace pas.',
      fxQualityTitle: 'Qualité FX à contrôler',
      fxQualityRateWarning: '{count} écriture(s) affichée(s) ont un taux appliqué absent ou nul. Elles restent visibles sans conversion automatique et doivent être qualifiées à partir de la preuve de transaction.',
      fxQualityAmountWarning: '{count} écriture(s) affichée(s) ont un montant CHF ou CFA indisponible. La valeur manquante n’est pas remplacée par zéro.',
      fxRateMissing: 'À qualifier',
      calculer: 'Calculer',
      conversionsRapides: 'Conversions rapides',
      conversionResultat: 'Résultat de la conversion',
      conversionsRecentes: 'Conversions récentes',
      heure: 'Heure',
      resultat: 'Résultat',
      tauxActuel: 'Taux actuel',
      maximum: 'Maximum',
      minimum: 'Minimum',
      moyenne: 'Moyenne',
      aucunTauxDate: 'Aucun taux historique exact pour cette date',
      immoTitle: 'Financement Immo — Terrain Lac Rose',
      immoSubtitle: 'Investissements et remboursements immobiliers depuis 2019',
      totalInvesti: 'Total investi réalisé',
      montantsHistoriques: 'Montants CFA historiques',
      equivalentTauxJour: 'Équivalent au taux du jour',
      remboursementsDirects: 'Remboursements directs',
      remboursementsTotal: 'Total remboursé par Cheikh',
      soldeOuvert: 'Solde ouvert',
      partCheikh: 'Part Cheikh',
      investissementsAnnee: 'Investissements par année',
      historiqueImmo: 'Historique des transactions IMMO',
      typeOperation: 'Type opération',
      perimetre: 'Périmètre',
      projet: 'Projet',
      statut: 'Statut',
      aucuneDonneeImmo: 'Aucune opération immobilière enregistrée.',
      nouvelleOperationImmo: 'Nouvelle opération Immo',
      modifierOperationImmo: 'Modifier l’opération Immo',
      immoAmountsError: 'Montants manquants ou invalides : {fields}. Modification bloquée pour éviter leur remplacement par zéro.',
      immoRateError: 'Le taux saisi doit être strictement positif. Un taux historique inconnu peut rester vide, sans conversion automatique.',
      immoRequiredError: 'Renseignez une désignation et une date.',
      immoSaveError: 'Enregistrement non confirmé. Vos saisies sont conservées. Vérifiez le registre avant de réessayer pour éviter un doublon.',
      designation: 'Désignation',
      documentRef: 'Document / Référence',
      remboursementCheikh: 'Remboursement par Cheikh',
      enregistrer: 'Enregistrer',
      confirmCreateTitle: 'Confirmer l’ajout',
      confirmUpdateTitle: 'Confirmer la modification',
      confirmDeleteTitle: 'Confirmer la suppression',
      confirmCreateBody: 'Ajouter « {label} » ?',
      confirmUpdateBody: 'Enregistrer les modifications de « {label} » ?',
      confirmDeleteBody: 'Supprimer définitivement « {label} » ?',
      confirmCreate: 'Oui, ajouter',
      confirmUpdate: 'Oui, modifier',
      confirmDelete: 'Oui, supprimer',
      decline: 'Non',
      actionUnconfirmed: 'Action non confirmée',
      actionUnconfirmedDetails: 'Vérifiez le registre avant toute nouvelle tentative pour éviter un doublon ou une suppression répétée.',
      closeFeedback: 'Fermer',
      operationLabel: 'Opération financière',
      savedSuccess: '« {label} » a été enregistrée avec succès.',
      updatedSuccess: '« {label} » a été modifiée avec succès.',
      deletedSuccess: '« {label} » a été supprimée avec succès.',
      fxSavedSuccess: 'Le taux « {label} » a été enregistré localement avec succès.',
      fxUpdatedSuccess: 'Le taux « {label} » a été modifié localement avec succès.',
      fxDeletedSuccess: 'Le taux « {label} » a été supprimé localement avec succès.'
    },
    EN: {
      title: 'Finance',
      subtitle: 'Revenue, Expense & Foreign Exchange Management',
      totalRecettes: 'Global revenue',
      totalDepenses: 'Global expenses',
      soldeNet: 'Net Balance',
      tauxFX: 'FX Rate (CFA/CHF)',
      sourceLoading: 'Loading global totals...',
      sourceAvailable: 'Global totals available',
      sourceUnavailable: 'Global totals unavailable',
      missingNotZero: 'No missing value is replaced with zero.',
      globalSource: 'Source: BigQuery via /finance/dashboard',
      sourceRead: 'API read',
      incomeRecords: 'revenue entries',
      expenseRecords: 'expense entries',
      loadedExtract: 'loaded extract for tables and charts',
      extractPartial: 'partial extract: one transaction source is unavailable',
      extractUnavailable: 'transaction extract unavailable',
      maxPerRegister: 'maximum 200 per register',
      chartScope: 'loaded extract',
      overview: 'Overview',
      architecture: 'Architecture & relations',
      processes: 'Processes & procedures',
      recettes: 'Revenue',
      incomeScope: 'Income scope',
      allIncome: 'All income',
      incomeDonations: 'Donations',
      incomeFinancing: 'Financing',
      depenses: 'Expenses',
      fx: 'FX History',
      social: 'Social',
      socialTitle: 'SOCIAL - Reclassified flows',
      socialSubtitle: 'Social aid and household contributions separated from operating revenue',
      socialHistoricalCfa: 'Recorded historical CFA',
      socialCurrentCfa: 'Current-rate CFA equivalent',
      socialOperations: 'Reclassified operations',
      socialPeriod: 'Covered period',
      socialAnnualChf: 'Social flows by year (CHF)',
      socialAnnualCfa: 'Historical social flows by year (CFA)',
      socialNotice: 'These flows remain traceable in the finance source but are excluded from operating revenue.',
      restrictedAccessTitle: 'Restricted Finance access',
      socialRestrictedAccess: 'Social finance flows require a dedicated Finance permission.',
      immoRestrictedAccess: 'Real estate finance data requires a dedicated Finance permission.',
      restrictedNoSubstitute: 'No value is displayed or replaced with zero.',
      socialNature: 'Nature',
      beneficiaire: 'Beneficiary',
      nouveauFluxSocial: 'New social flow',
      modifierFluxSocial: 'Edit social flow',
      tendance: 'Revenue vs Expense Trend',
      historiqueTaux: 'Exchange Rate History (CFA/CHF)',
      moyenneAnnuelleFx: 'Annual average rate - 1 CHF in CFA',
      nouvelleRecette: 'New Revenue',
      nouvelleDepense: 'New Expense',
      description: 'Description',
      montant: 'Amount',
      montantCHF: 'Amount CHF',
      montantCFA: 'Amount CFA',
      tauxFXCol: 'Applied rate',
      devise: 'Currency',
      amountPreview: 'Equivalent at the applied rate',
      enteredAmounts: 'Entered amounts',
      categorie: 'Category',
      choisirCategorie: 'Select a category',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
      teamZhCollective: 'Team ZH (collective)',
      teamSnCollective: 'Team SN (collective)',
      agentSourceLoading: 'Loading the secure RH-001 directory…',
      agentSourceAvailable: 'People are suggested from the secure RH-001 directory.',
      agentSourceUnavailable: 'RH-001 directory unavailable: only team collectives are offered.',
      agentHistorical: 'historical value',
      departement: 'Department',
      phaseProjet: 'Project Phase',
      pays: 'Country',
      date: 'Date',
      actions: 'Actions',
      modifierRecette: 'Edit revenue',
      modifierDepense: 'Edit expense',
      creerRecette: 'New revenue',
      creerDepense: 'New expense',
      creer: 'Create',
      modifier: 'Edit',
      supprimer: 'Delete',
      annuler: 'Cancel',
      deviseBase: 'Base Currency',
      deviseCible: 'Target Currency',
      taux: 'Rate',
      source: 'Source',
      nouveauTaux: 'Add Exchange Rate',
      modifierTaux: 'Edit Rate',
      rechercher: 'Search...',
      filtreDevise: 'Filter by currency',
      id: 'ID',
      remplirChamps: 'Please fill in all required fields',
      fxFormRule: 'Choose two different currencies, a strictly positive rate and a date.',
      fxSessionOnly: 'Temporary change in this view, not saved to the source.',
      financeRequiredError: 'Enter a description, a date and a numeric amount. An explicit zero is different from an empty field.',
      convertisseur: 'Converter',
      tableauBordFx: 'Dashboard',
      tauxHistorique: 'Rates & History',
      parametresConversion: 'Conversion settings',
      direction: 'Direction',
      dateReference: 'Reference date (blank = today’s rate)',
      tauxApplique: 'Applied rate',
      tauxReference: 'Reference rate',
      tauxReferenceIndisponible: 'Unavailable for this date',
      separationTauxInfo: 'The applied rate comes from the transaction or provider. The reference rate remains a separate benchmark.',
      appliedRateError: 'Enter a strictly positive applied rate verified against the transaction. The reference rate does not replace it.',
      fxQualityTitle: 'FX quality check required',
      fxQualityRateWarning: '{count} displayed transaction(s) have a missing or zero applied rate. They remain visible without automatic conversion and must be qualified from the transaction evidence.',
      fxQualityAmountWarning: '{count} displayed transaction(s) have an unavailable CHF or CFA amount. The missing value is not replaced with zero.',
      fxRateMissing: 'To qualify',
      calculer: 'Calculate',
      conversionsRapides: 'Quick conversions',
      conversionResultat: 'Conversion result',
      conversionsRecentes: 'Recent conversions',
      heure: 'Time',
      resultat: 'Result',
      tauxActuel: 'Current rate',
      maximum: 'Maximum',
      minimum: 'Minimum',
      moyenne: 'Average',
      aucunTauxDate: 'No exact historical rate for this date',
      immoTitle: 'Real Estate Financing — Lac Rose Land',
      immoSubtitle: 'Real estate investments and reimbursements since 2019',
      totalInvesti: 'Total invested to date',
      montantsHistoriques: 'Historical CFA amounts',
      equivalentTauxJour: 'Equivalent at today’s rate',
      remboursementsDirects: 'Direct reimbursements',
      remboursementsTotal: 'Total repayments from Cheikh',
      soldeOuvert: 'Outstanding balance',
      partCheikh: 'Cheikh’s share',
      investissementsAnnee: 'Investments by year',
      historiqueImmo: 'IMMO transaction history',
      typeOperation: 'Operation type',
      perimetre: 'Scope',
      projet: 'Project',
      statut: 'Status',
      aucuneDonneeImmo: 'No real estate operations recorded.',
      nouvelleOperationImmo: 'New real estate operation',
      modifierOperationImmo: 'Edit real estate operation',
      immoAmountsError: 'Missing or invalid amounts: {fields}. Update blocked to prevent replacing them with zero.',
      immoRateError: 'The entered rate must be strictly positive. An unknown historical rate can remain empty, without automatic conversion.',
      immoRequiredError: 'Enter a description and a date.',
      immoSaveError: 'Save not confirmed. Your entries are preserved. Check the register before trying again to avoid a duplicate.',
      designation: 'Description',
      documentRef: 'Document / Reference',
      remboursementCheikh: 'Repayment from Cheikh',
      enregistrer: 'Save',
      confirmCreateTitle: 'Confirm addition',
      confirmUpdateTitle: 'Confirm update',
      confirmDeleteTitle: 'Confirm deletion',
      confirmCreateBody: 'Add “{label}”?',
      confirmUpdateBody: 'Save the changes to “{label}”?',
      confirmDeleteBody: 'Permanently delete “{label}”?',
      confirmCreate: 'Yes, add',
      confirmUpdate: 'Yes, update',
      confirmDelete: 'Yes, delete',
      decline: 'No',
      actionUnconfirmed: 'Action not confirmed',
      actionUnconfirmedDetails: 'Check the register before trying again to avoid a duplicate or repeated deletion.',
      closeFeedback: 'Close',
      operationLabel: 'Financial operation',
      savedSuccess: '“{label}” was saved successfully.',
      updatedSuccess: '“{label}” was updated successfully.',
      deletedSuccess: '“{label}” was deleted successfully.',
      fxSavedSuccess: 'The rate “{label}” was saved locally.',
      fxUpdatedSuccess: 'The rate “{label}” was updated locally.',
      fxDeletedSuccess: 'The rate “{label}” was deleted locally.'
    },
    DE: {
      title: 'Finanzen',
      subtitle: 'Verwaltung von Einnahmen, Ausgaben und Wechselkursen',
      totalRecettes: 'Globale Einnahmen',
      totalDepenses: 'Globale Ausgaben',
      soldeNet: 'Nettosaldo',
      tauxFX: 'Wechselkurs (CFA/CHF)',
      sourceLoading: 'Globale Summen werden geladen...',
      sourceAvailable: 'Globale Summen verfügbar',
      sourceUnavailable: 'Globale Summen nicht verfügbar',
      missingNotZero: 'Fehlende Werte werden nicht durch null ersetzt.',
      globalSource: 'Quelle: BigQuery über /finance/dashboard',
      sourceRead: 'API-Abruf',
      incomeRecords: 'Einnahmen',
      expenseRecords: 'Ausgaben',
      loadedExtract: 'geladener Auszug für Tabellen und Diagramme',
      extractPartial: 'Teilauszug: Eine Buchungsquelle ist nicht verfügbar',
      extractUnavailable: 'Buchungsauszug nicht verfügbar',
      maxPerRegister: 'höchstens 200 je Register',
      chartScope: 'geladener Auszug',
      overview: 'Übersicht',
      architecture: 'Architektur & Beziehungen',
      processes: 'Prozesse & Verfahren',
      recettes: 'Einnahmen',
      incomeScope: 'Einnahmenbereich',
      allIncome: 'Alle Einnahmen',
      incomeDonations: 'Spenden',
      incomeFinancing: 'Finanzierungen',
      depenses: 'Ausgaben',
      fx: 'Wechselkurshistorie',
      social: 'Soziales',
      socialTitle: 'SOZIALES - Umklassifizierte Flüsse',
      socialSubtitle: 'Sozialhilfen und Haushaltsbeiträge getrennt von den Betriebseinnahmen',
      socialHistoricalCfa: 'Erfasste historische CFA',
      socialCurrentCfa: 'CFA-Gegenwert zum Tageskurs',
      socialOperations: 'Umklassifizierte Vorgänge',
      socialPeriod: 'Abgedeckter Zeitraum',
      socialAnnualChf: 'Soziale Flüsse pro Jahr (CHF)',
      socialAnnualCfa: 'Historische soziale Flüsse pro Jahr (CFA)',
      socialNotice: 'Diese Flüsse bleiben in der Finanzquelle nachvollziehbar, sind aber von den Betriebseinnahmen ausgeschlossen.',
      restrictedAccessTitle: 'Eingeschränkter Finanzzugriff',
      socialRestrictedAccess: 'Soziale Finanzflüsse erfordern eine eigene Finanzberechtigung.',
      immoRestrictedAccess: 'Immobilienfinanzdaten erfordern eine eigene Finanzberechtigung.',
      restrictedNoSubstitute: 'Es wird kein Wert angezeigt oder durch null ersetzt.',
      socialNature: 'Art',
      beneficiaire: 'Begünstigte',
      nouveauFluxSocial: 'Neuer sozialer Fluss',
      modifierFluxSocial: 'Sozialen Fluss bearbeiten',
      tendance: 'Trend Einnahmen vs. Ausgaben',
      historiqueTaux: 'Wechselkurshistorie (CFA/CHF)',
      moyenneAnnuelleFx: 'Jahresdurchschnitt - 1 CHF in CFA',
      nouvelleRecette: 'Neue Einnahme',
      nouvelleDepense: 'Neue Ausgabe',
      description: 'Beschreibung',
      montant: 'Betrag',
      montantCHF: 'Betrag CHF',
      montantCFA: 'Betrag CFA',
      tauxFXCol: 'Angewandter Kurs',
      devise: 'Währung',
      amountPreview: 'Gegenwert zum angewandten Kurs',
      enteredAmounts: 'Erfasste Beträge',
      categorie: 'Kategorie',
      choisirCategorie: 'Kategorie auswählen',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
      teamZhCollective: 'Team ZH (gemeinsam)',
      teamSnCollective: 'Team SN (gemeinsam)',
      agentSourceLoading: 'Geschütztes Verzeichnis RH-001 wird geladen…',
      agentSourceAvailable: 'Personen werden aus dem geschützten Verzeichnis RH-001 vorgeschlagen.',
      agentSourceUnavailable: 'Verzeichnis RH-001 nicht verfügbar: nur Team-Kollektive werden angeboten.',
      agentHistorical: 'historischer Wert',
      departement: 'Abteilung',
      phaseProjet: 'Projektphase',
      pays: 'Land',
      date: 'Datum',
      actions: 'Aktionen',
      modifierRecette: 'Einnahme bearbeiten',
      modifierDepense: 'Ausgabe bearbeiten',
      creerRecette: 'Neue Einnahme',
      creerDepense: 'Neue Ausgabe',
      creer: 'Erstellen',
      modifier: 'Bearbeiten',
      supprimer: 'Löschen',
      annuler: 'Abbrechen',
      deviseBase: 'Basiswährung',
      deviseCible: 'Zielwährung',
      taux: 'Wechselkurs',
      source: 'Quelle',
      nouveauTaux: 'Wechselkurs hinzufügen',
      modifierTaux: 'Wechselkurs bearbeiten',
      rechercher: 'Suche...',
      filtreDevise: 'Nach Währung filtern',
      id: 'ID',
      remplirChamps: 'Bitte füllen Sie alle erforderlichen Felder aus',
      fxFormRule: 'Wählen Sie zwei unterschiedliche Währungen, einen positiven Kurs und ein Datum.',
      fxSessionOnly: 'Vorübergehende Änderung in dieser Ansicht, nicht in der Quelle gespeichert.',
      financeRequiredError: 'Geben Sie eine Beschreibung, ein Datum und einen numerischen Betrag ein. Eine ausdrückliche Null ist kein leeres Feld.',
      convertisseur: 'Umrechner',
      tableauBordFx: 'Dashboard',
      tauxHistorique: 'Kurse & Verlauf',
      parametresConversion: 'Umrechnungseinstellungen',
      direction: 'Richtung',
      dateReference: 'Referenzdatum (leer = heutiger Kurs)',
      tauxApplique: 'Angewandter Kurs',
      tauxReference: 'Referenzkurs',
      tauxReferenceIndisponible: 'Für dieses Datum nicht verfügbar',
      separationTauxInfo: 'Der angewandte Kurs stammt aus der Transaktion oder vom Anbieter. Der Referenzkurs bleibt ein separater Vergleichswert.',
      appliedRateError: 'Geben Sie einen anhand der Transaktion geprüften, strikt positiven angewandten Kurs ein. Der Referenzkurs ersetzt ihn nicht.',
      fxQualityTitle: 'FX-Datenqualität prüfen',
      fxQualityRateWarning: '{count} angezeigte Buchung(en) haben keinen oder einen null gesetzten angewandten Kurs. Sie bleiben ohne automatische Umrechnung sichtbar und müssen anhand des Transaktionsnachweises qualifiziert werden.',
      fxQualityAmountWarning: 'Bei {count} angezeigten Buchung(en) ist der CHF- oder CFA-Betrag nicht verfügbar. Der fehlende Wert wird nicht durch null ersetzt.',
      fxRateMissing: 'Zu qualifizieren',
      calculer: 'Berechnen',
      conversionsRapides: 'Schnellumrechnungen',
      conversionResultat: 'Umrechnungsergebnis',
      conversionsRecentes: 'Letzte Umrechnungen',
      heure: 'Zeit',
      resultat: 'Ergebnis',
      tauxActuel: 'Aktueller Kurs',
      maximum: 'Maximum',
      minimum: 'Minimum',
      moyenne: 'Durchschnitt',
      aucunTauxDate: 'Kein exakter historischer Kurs für dieses Datum',
      immoTitle: 'Immobilienfinanzierung — Grundstück Lac Rose',
      immoSubtitle: 'Immobilieninvestitionen und Rückzahlungen seit 2019',
      totalInvesti: 'Bisher investiert',
      montantsHistoriques: 'Historische CFA-Beträge',
      equivalentTauxJour: 'Gegenwert zum heutigen Kurs',
      remboursementsDirects: 'Direkte Rückzahlungen',
      remboursementsTotal: 'Gesamtrückzahlungen durch Cheikh',
      soldeOuvert: 'Offener Saldo',
      partCheikh: 'Anteil Cheikh',
      investissementsAnnee: 'Investitionen pro Jahr',
      historiqueImmo: 'IMMO-Transaktionsverlauf',
      typeOperation: 'Vorgangsart',
      perimetre: 'Bereich',
      projet: 'Projekt',
      statut: 'Status',
      aucuneDonneeImmo: 'Keine Immobilienvorgänge erfasst.',
      nouvelleOperationImmo: 'Neuer Immobilienvorgang',
      modifierOperationImmo: 'Immobilienvorgang bearbeiten',
      immoAmountsError: 'Fehlende oder ungültige Beträge: {fields}. Änderung gesperrt, damit sie nicht durch null ersetzt werden.',
      immoRateError: 'Der eingegebene Kurs muss strikt positiv sein. Ein unbekannter historischer Kurs kann ohne automatische Umrechnung leer bleiben.',
      immoRequiredError: 'Geben Sie eine Bezeichnung und ein Datum ein.',
      immoSaveError: 'Speicherung nicht bestätigt. Ihre Eingaben bleiben erhalten. Prüfen Sie das Register vor einem erneuten Versuch, um einen doppelten Eintrag zu vermeiden.',
      designation: 'Bezeichnung',
      documentRef: 'Dokument / Referenz',
      remboursementCheikh: 'Rückzahlung durch Cheikh',
      enregistrer: 'Speichern',
      confirmCreateTitle: 'Hinzufügen bestätigen',
      confirmUpdateTitle: 'Änderung bestätigen',
      confirmDeleteTitle: 'Löschen bestätigen',
      confirmCreateBody: '„{label}“ hinzufügen?',
      confirmUpdateBody: 'Änderungen an „{label}“ speichern?',
      confirmDeleteBody: '„{label}“ dauerhaft löschen?',
      confirmCreate: 'Ja, hinzufügen',
      confirmUpdate: 'Ja, ändern',
      confirmDelete: 'Ja, löschen',
      decline: 'Nein',
      actionUnconfirmed: 'Aktion nicht bestätigt',
      actionUnconfirmedDetails: 'Prüfen Sie das Register vor einem erneuten Versuch, um einen doppelten Eintrag oder wiederholtes Löschen zu vermeiden.',
      closeFeedback: 'Schliessen',
      operationLabel: 'Finanzvorgang',
      savedSuccess: '„{label}“ wurde erfolgreich gespeichert.',
      updatedSuccess: '„{label}“ wurde erfolgreich geändert.',
      deletedSuccess: '„{label}“ wurde erfolgreich gelöscht.',
      fxSavedSuccess: 'Der Kurs „{label}“ wurde lokal gespeichert.',
      fxUpdatedSuccess: 'Der Kurs „{label}“ wurde lokal geändert.',
      fxDeletedSuccess: 'Der Kurs „{label}“ wurde lokal gelöscht.'
    }
  };

  const t = translations[language];
  const appliedFormRate = parseFiniteNumber(formData.tauxFxApplique);
  const fxFormRate = parseFiniteNumber(fxFormData.rate);
  const fxRateInvalid = fxFormRate === null || fxFormRate <= 0;
  const fxPairInvalid = !fxFormData.devise_from || !fxFormData.devise_to || fxFormData.devise_from === fxFormData.devise_to;
  const fxFormInvalid = fxRateInvalid || fxPairInvalid || !fxFormData.date;
  const appliedRateInvalid = appliedFormRate === null || appliedFormRate <= 0;
  const financeDescriptionInvalid = !String(formData.description ?? '').trim();
  const financeAmount = String(formData.montant ?? '').trim() === '' ? null : parseFiniteNumber(formData.montant);
  const financeAmountInvalid = financeAmount === null;
  const financeAmountPair = convertFinanceAmount(formData.montant, formData.devise, appliedFormRate);
  const editingImmo = editingImmoId !== null;
  const immoAmountFields = [
    ['montantChf', t.montantCHF], ['montantCfa', t.montantCFA],
    ['partCheikhChf', t.partCheikh], ['remboursementCheikhChf', t.remboursementCheikh],
  ];
  // The current PUT replaces the whole row and coerces missing amounts to zero.
  const invalidImmoAmounts = editingImmo
    ? immoAmountFields.filter(([field]) => parseFiniteNumber(immoFormData[field]) === null)
    : [];
  const immoRate = parseFiniteNumber(immoFormData.tauxFx);
  // Match new-operation rate inference without changing recorded amount fields.
  const immoPreviewRate = !editingImmo && Number(immoFormData.montantChf) > 0 && Number(immoFormData.montantCfa) > 0
    ? Number(immoFormData.montantCfa) / Number(immoFormData.montantChf)
    : immoRate;
  const immoChfInput = parseFiniteNumber(immoFormData.montantChf);
  const immoCfaInput = parseFiniteNumber(immoFormData.montantCfa);
  const immoPairCalculated = !editingImmo && (immoChfInput === null || immoCfaInput === null);
  const immoAmountPair = immoPairCalculated
    ? convertFinanceAmount(immoChfInput ?? immoCfaInput, immoChfInput !== null ? 'CHF' : 'CFA', immoPreviewRate)
    : { chf: immoChfInput, cfa: immoCfaInput };
  const immoRateInvalid = immoFormData.tauxFx !== '' && (immoRate === null || immoRate <= 0);
  const immoSaveInvalid = invalidImmoAmounts.length > 0 || immoRateInvalid;
  const immoAmountValidation = (field) => {
    const invalid = invalidImmoAmounts.some(([key]) => key === field);
    return { 'aria-invalid': invalid, 'aria-describedby': invalid ? 'immo-amounts-error' : undefined };
  };
  const withLabel = (template, label) => template.replace('{label}', label || t.operationLabel);
  const agentsByTeam = useMemo(() => buildTeamAgentDirectory(directoryMembers, {
    [TEAM_CODES.ZURICH]: t.teamZhCollective,
    [TEAM_CODES.SENEGAL]: t.teamSnCollective
  }), [directoryMembers, t.teamSnCollective, t.teamZhCollective]);

  const agentOptionsFor = useCallback((team, historicalValue) => {
    const options = [...(agentsByTeam[normalizeTeamCode(team)] || [])];
    if (historicalValue && !options.some((option) => option.value === historicalValue)) {
      options.unshift({
        value: historicalValue,
        label: `${getDirectoryAgentLabel(historicalValue, agentsByTeam)} (${t.agentHistorical})`
      });
    }
    return options;
  }, [agentsByTeam, t.agentHistorical]);

  const financeAgentOptions = useMemo(
    () => agentOptionsFor(formData.team, formData.agent),
    [agentOptionsFor, formData.agent, formData.team]
  );
  const immoAgentOptions = useMemo(
    () => agentOptionsFor(immoFormData.team, immoFormData.agent),
    [agentOptionsFor, immoFormData.agent, immoFormData.team]
  );

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    setFxView(getFxView(location.search));
    if (['overview', 'architecture', 'processes', 'recettes', 'depenses', 'fx', 'budget', 'social', 'immobilier', 'assistant', 'resources', 'glossary'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    if (activeTab === 'fx') centerTabHorizontally(fxNavigationRef.current, activeFxButtonRef.current);
  }, [activeTab, fxView, language]);

  const selectFxView = (view) => {
    setFxView(view);
    const params = new URLSearchParams(location.search);
    params.set('tab', 'fx');
    params.set('fxView', view);
    navigate({ pathname: location.pathname, search: `?${params.toString()}`, hash: '#finance-fx-navigation' });
  };

  useEffect(() => {
    let cancelled = false;
    const loadDirectory = async () => {
      if (typeof api.getMembersDirectory !== 'function') {
        setAgentDirectoryStatus('unavailable');
        return;
      }
      try {
        const response = await api.getMembersDirectory(100, 0);
        if (cancelled) return;
        setDirectoryMembers(Array.isArray(response?.data) ? response.data : []);
        setAgentDirectoryStatus('available');
      } catch (error) {
        if (cancelled) return;
        setDirectoryMembers([]);
        setAgentDirectoryStatus('unavailable');
      }
    };
    loadDirectory();
    return () => { cancelled = true; };
  }, []);

  const selectFinanceTab = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);
    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  };

  const cleanDate = (value) => {
    if (!value) return new Date().toISOString().split('T')[0];
    const rawValue = typeof value === 'object' && value.value ? value.value : value;
    const datePart = String(rawValue).trim().match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (datePart) return datePart;
    const parsedDate = new Date(rawValue);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate.toISOString().split('T')[0];
    return String(rawValue).split(/[T\s]/)[0];
  };

  const toNumber = (value, fallback = 0) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const normalizeFinanceRow = useCallback((item, type, fallbackCategory, index = 0) => {
    const deviseOrigine = String(item.devise_origine || item.devise || item.currency || 'CHF').toUpperCase();
    const rawTauxFx = item.taux_fx_applique ?? item.taux_fx ?? item.taux ?? item.fx_rate;
    const rawTauxFxReference = item.taux_fx_reference ?? item.taux_ref_auto;
    const originalAmountValue = item.montant_origine ?? item.amount_original ?? item.montant ?? item.amount;
    const hasValue = (value) => value !== null && value !== undefined && value !== '';
    const rawAmount = hasValue(originalAmountValue)
      ? originalAmountValue
      : item.montant_chf ?? item.amount_chf ?? item.montant_cfa ?? item.amount_cfa ?? 0;
    const montantOrigine = toNumber(rawAmount);
    const explicitMontantChf = item.montant_chf ?? item.amount_chf ?? item.montantChf;
    const explicitMontantCfa = item.montant_cfa ?? item.amount_cfa ?? item.montantCfa;
    const montantChfAvailable = hasValue(explicitMontantChf) || (deviseOrigine === 'CHF' && hasValue(originalAmountValue));
    const montantCfaAvailable = hasValue(explicitMontantCfa) || (deviseOrigine === 'CFA' && hasValue(originalAmountValue));
    const montantChf = toNumber(
      explicitMontantChf,
      deviseOrigine === 'CHF' ? montantOrigine : 0
    );
    const montantCfa = toNumber(
      explicitMontantCfa,
      deviseOrigine === 'CFA' ? montantOrigine : 0
    );
    const tauxBrut = toNumber(rawTauxFx);
    const tauxNormalise = deviseOrigine === 'CFA' && tauxBrut > 0 && tauxBrut < 1 ? 1 / tauxBrut : tauxBrut;
    const tauxFx = tauxNormalise > 0 ? tauxNormalise : null;
    const hasExplicitTauxFx = Boolean(tauxFx);

    return {
      id: item.id || item.source_id || `${type}-${String(index + 1).padStart(4, '0')}`,
      ref: item.ref || item.reference || item.numero_ref || item.source_ref || item.source_id || `${type}-${String(index + 1).padStart(4, '0')}`,
      description: item.description || item.name || 'Transaction',
      montant: montantChf,
      montantOrigine,
      devise: deviseOrigine,
      deviseOrigine,
      montantChf,
      montantCfa,
      montantChfAvailable,
      montantCfaAvailable,
      tauxFx,
      tauxFxReference: toNumber(rawTauxFxReference) || null,
      hasExplicitTauxFx,
      dateTauxFx: cleanDate(item.date_taux_fx || item.date_taux || item.date_updated || item.created_at),
      sourceTauxFx: item.source_taux_fx || item.source_taux || item.source || 'Standard',
      category: item.category,
      categorie: item.category || item.categorie || fallbackCategory,
      date: cleanDate(item.date_document || item.date_created || item.created_at || item.date),
      agent: item.agent || item.agent_name || item.responsable || item.owner || item.created_by || 'Non renseigne',
      team: item.team || item.team_name || item.equipe || item.bu || item.business_unit || 'Non renseigne',
      departement: item.departement || item.department || item.department_name || item.service || 'Non renseigne',
      phaseProjet: item.phase_projet || item.phaseProjet || item.project_phase || item.phase || 'Conception',
      natureSociale: item.nature_sociale || item.natureSociale || 'Aide sociale',
      beneficiaire: item.beneficiaire || '',
      pays: item.pays || item.country || '',
      status: item.status || item.statut || 'completed'
    };
  }, []);

  const formatCell = (value) => value || '-';
  const formatAmount = (value) => toNumber(value).toLocaleString();
  const formatOptionalAmount = (value) => Number.isFinite(value) ? value.toLocaleString() : '—';
  const formatDateForDisplay = (value) => {
    const isoDate = cleanDate(value);
    const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return isoDate;
    const [, year, month, day] = match;
    if (language === 'FR') return `${day}-${month}-${year}`;
    if (language === 'DE') return `${day}.${month}.${year}`;
    return `${month}/${day}/${year}`;
  };

  const getHistoricalCfaPerChf = useCallback((operationDate) => {
    const comparableDate = (value) => {
      if (!value) return '';
      return cleanDate(value);
    };
    const targetDate = comparableDate(operationDate);
    const candidates = fxHistory
      .map((fx) => {
        const from = String(fx.devise_from || '').toUpperCase();
        const to = String(fx.devise_to || '').toUpperCase();
        const rate = toNumber(fx.rate);
        const date = comparableDate(fx.date);

        if (!date || !rate) return null;
        if (from === 'CHF' && to === 'CFA') return { ...fx, date, cfaPerChf: rate };
        if (from === 'CFA' && to === 'CHF') return { ...fx, date, cfaPerChf: 1 / rate };
        return null;
      })
      .filter(Boolean)
      .filter((fx) => targetDate && fx.date === targetDate)
      .sort((a, b) => b.date.localeCompare(a.date));

    return candidates[0] || null;
  }, [fxHistory]);

  // Phase 2: Load real data from BigQuery via API
  const loadFinanceData = useCallback(async () => {
    setFinanceSummary(null);
    setFinanceSummaryStatus('loading');
    setFinanceExtractStatus('loading');
    setIncomeExtractStatus('loading');

    const [dashboardResult, expensesResult, incomeResult] = await Promise.allSettled([
      api.getFinanceDashboard(),
      api.getExpenses(200, 0),
      api.getIncome(200, 0)
    ]);

    const summary = dashboardResult.status === 'fulfilled'
      ? normalizeFinanceSummary(dashboardResult.value)
      : null;
    setFinanceSummary(summary);
    setFinanceSummaryStatus(summary ? 'available' : 'unavailable');

    const expensesData = expensesResult.status === 'fulfilled' && expensesResult.value?.success !== false && Array.isArray(expensesResult.value?.data)
      ? expensesResult.value.data
      : null;
    const incomeData = incomeResult.status === 'fulfilled' && incomeResult.value?.success !== false && Array.isArray(incomeResult.value?.data)
      ? incomeResult.value.data
      : null;

    const normalizedExpenses = (expensesData || []).map((item, index) =>
      normalizeFinanceRow(item, 'DEP', 'Operationnel', index)
    );
    const normalizedIncome = (incomeData || []).map((item, index) =>
      normalizeFinanceRow(item, 'REC', 'Ventes', index)
    );

    setDepenses(normalizedExpenses);
    setRecettes(normalizedIncome);
    setIncomeExtractStatus(incomeData ? 'available' : 'unavailable');
    setFinanceExtractStatus(
      expensesData && incomeData ? 'available' : (expensesData || incomeData ? 'partial' : 'unavailable')
    );
  }, [normalizeFinanceRow]);

  useEffect(() => {
    loadFinanceData();
  }, [loadFinanceData]);

  const loadSocialData = useCallback(async () => {
    setSocialAccessState('loading');
    try {
      const response = await api.getSocialFinance(200, 0);
      if (response?.success === false || !Array.isArray(response?.data)) {
        throw Object.assign(new Error('Invalid social register response'), { code: 'INVALID_SOCIAL_RESPONSE' });
      }
      const rows = response.data;
      setSocialRows(rows.map((item, index) => normalizeFinanceRow(item, 'SOC', 'Aide Sociale Ménage', index)));
      setSocialSummary(response?.summary || {});
      setSocialError('');
      setSocialAccessState('available');
    } catch (error) {
      console.error('Social finance error:', error);
      setSocialRows([]);
      setSocialSummary({});
      setSocialError(error.status === 403 || error.code === 'INVALID_SOCIAL_RESPONSE' ? '' : error.message);
      setSocialAccessState(error.status === 403 ? 'forbidden' : 'unavailable');
    }
  }, [normalizeFinanceRow]);

  useEffect(() => {
    loadSocialData();
  }, [loadSocialData]);

  // Data translations for categories and descriptions
  const dataTranslations = {
    descriptions: {
      FR: { 'Vente produits': 'Vente produits', 'Donation': 'Donation', 'Services': 'Services', 'Loyer bureau': 'Loyer bureau', 'Salaires': 'Salaires', 'Fournitures': 'Fournitures' },
      EN: { 'Vente produits': 'Product Sales', 'Donation': 'Donation', 'Services': 'Services', 'Loyer bureau': 'Office Rent', 'Salaires': 'Salaries', 'Fournitures': 'Supplies' },
      DE: { 'Vente produits': 'Produktverkauf', 'Donation': 'Spende', 'Services': 'Dienstleistungen', 'Loyer bureau': 'Büromiete', 'Salaires': 'Gehälter', 'Fournitures': 'Materialien' }
    },
    categories: {
      FR: { 'Ventes': 'Ventes', 'Dons': 'Dons', 'Services': 'Services', 'Immobilier': 'Immobilier', 'Paie': 'Paie', 'Opérationnel': 'Opérationnel' },
      EN: { 'Ventes': 'Sales', 'Dons': 'Donations', 'Services': 'Services', 'Immobilier': 'Real Estate', 'Paie': 'Payroll', 'Opérationnel': 'Operations' },
      DE: { 'Ventes': 'Verkauf', 'Dons': 'Spenden', 'Services': 'Dienstleistungen', 'Immobilier': 'Immobilien', 'Paie': 'Gehälter', 'Opérationnel': 'Betrieb' }
    }
  };

  const supplementalCategoryTranslations = {
    FR: {
      'VENTES': 'Ventes',
      'RECETTES': 'Recettes',
      'DONS': 'Dons',
      'DONATION': 'Donation',
      'SERVICES': 'Services',
      'IMMOBILIER': 'Immobilier',
      'FIN IMMO': 'Fin Immo',
      'INVESTISSEMENT IMMO': 'Investissement Immo',
      'PAIE': 'Paie',
      'SALAIRES': 'Salaires',
      'OPERATIONNEL': 'Operationnel',
      'DEPENSES': 'Depenses',
      'SOCIAL': 'Social',
      'AIDE SOCIALE': 'Aide Sociale',
      'AIDE SOCIALE MENAGE': 'Aide sociale Ménage',
      'SOUTIEN MENAGE': 'Soutien Ménage',
      'SOUTIEN FAMILLE': 'Soutien Famille',
      'COMMERCE EQUITABLE': 'Commerce équitable',
      'PARTICIPATION': 'Participation',
      'TRANSPORT': 'Transport',
      'FOURNITURES': 'Fournitures',
      'FINANCEMENT': 'Financement',
      'FINANCEMENT APPORTS COTISATIONS': 'Financement (apports & cotisations)',
      'VENTE DE MARCHANDISES': 'Vente de marchandises',
      'VENTE DE SERVICES': 'Vente de services',
      'DON EN NATURE': 'Don en nature',
      'DONS EN NATURE': 'Dons en nature',
      'DON MATERIEL': 'Don matériel',
      'REMBOURSEMENT CAUTION LOYER': 'Remboursement caution loyer',
      'REMBOURSEMENT INVESTISSEMENT IMMO': 'Remboursement investissement Immo',
      'REMBOURSEMENTS INVESTISSEMENT IMMO': 'Remboursements investissement Immo',
      'MATERIEL': 'Matériel',
      'ADMINISTRATIVE': 'Administrative',
      'LOGISTIQUE': 'Logistique',
      'ACHAT TERRAIN': 'Achat terrain',
      'CHANTIER': 'Chantier',
      'CHANTIER TRAVAUX': 'Chantier & Travaux',
      'BIEN IMMO': 'Bien immobilier',
      'BIEN IMMOBILIER': 'Bien immobilier',
      'FORMALITES': 'Formalités',
      'VOYAGES': 'Voyages',
      'ALIMENTATION': 'Alimentation',
      'BUREAUTIQUE': 'Bureautique',
      'CARBURANT': 'Carburant',
      'CADEAUX': 'Cadeaux',
      'ETUDES PLANS': 'Études & Plans',
      'MARCHANDISES': 'Marchandises',
      'SHIPPING FRET': 'Shipping / Fret',
      'ABONNEMENT': 'Abonnement',
      'FRAIS ADMINISTRATIFS': 'Frais administratifs',
      'CLOTURE PORTAIL': 'Clôture / Portail',
      'GROS OEUVRES': 'Gros œuvres',
      'SECONDS OEUVRES': 'Seconds œuvres',
      'SOLAIRE ENERGIE': 'Solaire / Énergie',
      'EQUIPEMENTS': 'Équipements',
      'NOTAIRE DOMAINES': 'Notaire / Domaines',
      'FINITIONS': 'Finitions',
      'EXPERTISE DEVIS': 'Expertise / Devis',
      'PLOMBERIE': 'Plomberie',
      'ELECTRICITE': 'Électricité',
      'AUTRE': 'Autre'
    },
    EN: {
      'VENTES': 'Sales',
      'RECETTES': 'Revenue',
      'DONS': 'Donations',
      'DONATION': 'Donation',
      'SERVICES': 'Services',
      'IMMOBILIER': 'Real Estate',
      'FIN IMMO': 'Real Estate Finance',
      'INVESTISSEMENT IMMO': 'Real Estate Investment',
      'PAIE': 'Payroll',
      'SALAIRES': 'Salaries',
      'OPERATIONNEL': 'Operations',
      'DEPENSES': 'Expenses',
      'SOCIAL': 'Social',
      'AIDE SOCIALE': 'Social Aid',
      'AIDE SOCIALE MENAGE': 'Household Social Aid',
      'SOUTIEN MENAGE': 'Household Support',
      'SOUTIEN FAMILLE': 'Family Support',
      'COMMERCE EQUITABLE': 'Fair Trade',
      'PARTICIPATION': 'Participation',
      'TRANSPORT': 'Transport',
      'FOURNITURES': 'Supplies',
      'FINANCEMENT': 'Financing',
      'FINANCEMENT APPORTS COTISATIONS': 'Financing (contributions & fees)',
      'VENTE DE MARCHANDISES': 'Merchandise Sales',
      'VENTE DE SERVICES': 'Service Sales',
      'DON EN NATURE': 'Gift in Kind',
      'DONS EN NATURE': 'Gifts in Kind',
      'DON MATERIEL': 'Material Donation',
      'REMBOURSEMENT CAUTION LOYER': 'Rent Deposit Refund',
      'REMBOURSEMENT INVESTISSEMENT IMMO': 'Real Estate Investment Reimbursement',
      'REMBOURSEMENTS INVESTISSEMENT IMMO': 'Real Estate Investment Reimbursements',
      'MATERIEL': 'Equipment',
      'ADMINISTRATIVE': 'Administrative',
      'LOGISTIQUE': 'Logistics',
      'ACHAT TERRAIN': 'Land Purchase',
      'CHANTIER': 'Construction',
      'CHANTIER TRAVAUX': 'Construction & Works',
      'BIEN IMMO': 'Real Estate Asset',
      'BIEN IMMOBILIER': 'Real Estate Asset',
      'FORMALITES': 'Formalities',
      'VOYAGES': 'Travel',
      'ALIMENTATION': 'Food',
      'BUREAUTIQUE': 'Office Supplies',
      'CARBURANT': 'Fuel',
      'CADEAUX': 'Gifts',
      'ETUDES PLANS': 'Studies & Plans',
      'MARCHANDISES': 'Merchandise',
      'SHIPPING FRET': 'Shipping / Freight',
      'ABONNEMENT': 'Subscription',
      'FRAIS ADMINISTRATIFS': 'Administrative Fees',
      'CLOTURE PORTAIL': 'Fence / Gate',
      'GROS OEUVRES': 'Structural Works',
      'SECONDS OEUVRES': 'Finishing Works',
      'SOLAIRE ENERGIE': 'Solar / Energy',
      'EQUIPEMENTS': 'Equipment',
      'NOTAIRE DOMAINES': 'Notary / Land Registry',
      'FINITIONS': 'Finishes',
      'EXPERTISE DEVIS': 'Survey / Quotation',
      'PLOMBERIE': 'Plumbing',
      'ELECTRICITE': 'Electricity',
      'AUTRE': 'Other'
    },
    DE: {
      'VENTES': 'Verkauf',
      'RECETTES': 'Einnahmen',
      'DONS': 'Spenden',
      'DONATION': 'Spende',
      'SERVICES': 'Dienstleistungen',
      'IMMOBILIER': 'Immobilien',
      'FIN IMMO': 'Immobilienfinanzierung',
      'INVESTISSEMENT IMMO': 'Immobilieninvestition',
      'PAIE': 'Lohnbuchhaltung',
      'SALAIRES': 'Gehaelter',
      'OPERATIONNEL': 'Betrieb',
      'DEPENSES': 'Ausgaben',
      'SOCIAL': 'Soziales',
      'AIDE SOCIALE': 'Sozialhilfe',
      'AIDE SOCIALE MENAGE': 'Sozialhilfe für Haushalte',
      'SOUTIEN MENAGE': 'Haushaltshilfe',
      'SOUTIEN FAMILLE': 'Familienhilfe',
      'COMMERCE EQUITABLE': 'Fairer Handel',
      'PARTICIPATION': 'Beteiligung',
      'TRANSPORT': 'Transport',
      'FOURNITURES': 'Materialien',
      'FINANCEMENT': 'Finanzierung',
      'FINANCEMENT APPORTS COTISATIONS': 'Finanzierung (Einlagen & Beiträge)',
      'VENTE DE MARCHANDISES': 'Warenverkauf',
      'VENTE DE SERVICES': 'Dienstleistungsverkauf',
      'DON EN NATURE': 'Sachspende',
      'DONS EN NATURE': 'Sachspenden',
      'DON MATERIEL': 'Sachspende',
      'REMBOURSEMENT CAUTION LOYER': 'Rückerstattung Mietkaution',
      'REMBOURSEMENT INVESTISSEMENT IMMO': 'Rückerstattung Immobilieninvestition',
      'REMBOURSEMENTS INVESTISSEMENT IMMO': 'Rückerstattungen Immobilieninvestition',
      'MATERIEL': 'Material',
      'ADMINISTRATIVE': 'Verwaltung',
      'LOGISTIQUE': 'Logistik',
      'ACHAT TERRAIN': 'Grundstückskauf',
      'CHANTIER': 'Baustelle',
      'CHANTIER TRAVAUX': 'Bau & Bauarbeiten',
      'BIEN IMMO': 'Immobilie',
      'BIEN IMMOBILIER': 'Immobilie',
      'FORMALITES': 'Formalitäten',
      'VOYAGES': 'Reisen',
      'ALIMENTATION': 'Verpflegung',
      'BUREAUTIQUE': 'Bürobedarf',
      'CARBURANT': 'Kraftstoff',
      'CADEAUX': 'Geschenke',
      'ETUDES PLANS': 'Studien & Pläne',
      'MARCHANDISES': 'Waren',
      'SHIPPING FRET': 'Versand / Fracht',
      'ABONNEMENT': 'Abonnement',
      'FRAIS ADMINISTRATIFS': 'Verwaltungskosten',
      'CLOTURE PORTAIL': 'Zaun / Tor',
      'GROS OEUVRES': 'Rohbauarbeiten',
      'SECONDS OEUVRES': 'Ausbauarbeiten',
      'SOLAIRE ENERGIE': 'Solar / Energie',
      'EQUIPEMENTS': 'Ausrüstung',
      'NOTAIRE DOMAINES': 'Notar / Grundbuch',
      'FINITIONS': 'Endarbeiten',
      'EXPERTISE DEVIS': 'Gutachten / Angebot',
      'PLOMBERIE': 'Sanitärarbeiten',
      'ELECTRICITE': 'Elektrizität',
      'AUTRE': 'Andere'
    }
  };
  const normalizeCategoryKey = (value) =>
    String(value || '')
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .toUpperCase();
  const formatUnknownCategory = (cat) =>
    String(cat || '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const standardValueTranslations = {
    FR: {
      'NON RENSEIGNE': 'Non renseigne',
      'CONCEPTION': 'Conception',
      'MISE EN PLACE': 'Mise en Place',
      'CONSOLIDATION': 'Consolidation',
      'DYNAMISATION': 'Dynamisation',
      'IT': 'IT',
      'FINANCE': 'Finance',
      'FINANCES': 'Finances',
      'ADMINISTRATION': 'Administration',
      'RESSOURCES HUMAINES': 'Ressources Humaines',
      'COMMERCIAL CRM': 'Commercial & CRM',
      'PRODUCTION': 'Production',
      'STOCK ACTIFS': 'Stocks & Actifs',
      'STOCKS ACTIFS': 'Stocks & Actifs',
      'IT SUPPORT': 'IT & Support',
      'TEAM ZH': 'Team ZH',
      'TZH': 'Team ZH',
      'TEAM SN': 'Team SN',
      'TSN': 'Team SN',
      'AVANCE': 'Avance',
      'REMBOURSEMENT': 'Remboursement',
      'AJUSTEMENT': 'Ajustement',
      'INFORMATION': 'Information',
      'REPORT': 'Report',
      'IMMOBILIER': 'Immobilier',
      'PERSONNEL': 'Personnel',
      'REMBOURSE': 'Remboursé',
      'PAYE': 'Payé',
      'PARTIEL': 'Partiel',
      'EN COURS': 'En cours',
      'INFO': 'Information',
      'REPORTE': 'Reporté',
      'PLANIFIE': 'Planifié',
      'HORS PERIMETRE IMMO': 'Hors périmètre IMMO'
    },
    EN: {
      'NON RENSEIGNE': 'Not provided',
      'CONCEPTION': 'Design',
      'MISE EN PLACE': 'Implementation',
      'CONSOLIDATION': 'Consolidation',
      'DYNAMISATION': 'Activation',
      'IT': 'IT',
      'FINANCE': 'Finance',
      'FINANCES': 'Finance',
      'ADMINISTRATION': 'Administration',
      'RESSOURCES HUMAINES': 'Human Resources',
      'COMMERCIAL CRM': 'Sales & CRM',
      'PRODUCTION': 'Production',
      'STOCK ACTIFS': 'Stock & Assets',
      'STOCKS ACTIFS': 'Stock & Assets',
      'IT SUPPORT': 'IT & Support',
      'TEAM ZH': 'Team ZH',
      'TZH': 'Team ZH',
      'TEAM SN': 'Team SN',
      'TSN': 'Team SN',
      'AVANCE': 'Advance',
      'REMBOURSEMENT': 'Reimbursement',
      'AJUSTEMENT': 'Adjustment',
      'INFORMATION': 'Information',
      'REPORT': 'Deferred',
      'IMMOBILIER': 'Real Estate',
      'PERSONNEL': 'Personal',
      'REMBOURSE': 'Reimbursed',
      'PAYE': 'Paid',
      'PARTIEL': 'Partial',
      'EN COURS': 'In progress',
      'INFO': 'Information',
      'REPORTE': 'Deferred',
      'PLANIFIE': 'Planned',
      'HORS PERIMETRE IMMO': 'Outside IMMO scope'
    },
    DE: {
      'NON RENSEIGNE': 'Nicht angegeben',
      'CONCEPTION': 'Konzeption',
      'MISE EN PLACE': 'Umsetzung',
      'CONSOLIDATION': 'Konsolidierung',
      'DYNAMISATION': 'Aktivierung',
      'IT': 'IT',
      'FINANCE': 'Finanzen',
      'FINANCES': 'Finanzen',
      'ADMINISTRATION': 'Administration',
      'RESSOURCES HUMAINES': 'Personalwesen',
      'COMMERCIAL CRM': 'Vertrieb & CRM',
      'PRODUCTION': 'Produktion',
      'STOCK ACTIFS': 'Bestand & Aktiven',
      'STOCKS ACTIFS': 'Bestand & Aktiven',
      'IT SUPPORT': 'IT & Support',
      'TEAM ZH': 'Team ZH',
      'TZH': 'Team ZH',
      'TEAM SN': 'Team SN',
      'TSN': 'Team SN',
      'AVANCE': 'Vorauszahlung',
      'REMBOURSEMENT': 'Rückzahlung',
      'AJUSTEMENT': 'Anpassung',
      'INFORMATION': 'Information',
      'REPORT': 'Verschoben',
      'IMMOBILIER': 'Immobilien',
      'PERSONNEL': 'Persönlich',
      'REMBOURSE': 'Zurückgezahlt',
      'PAYE': 'Bezahlt',
      'PARTIEL': 'Teilweise',
      'EN COURS': 'In Bearbeitung',
      'INFO': 'Information',
      'REPORTE': 'Verschoben',
      'PLANIFIE': 'Geplant',
      'HORS PERIMETRE IMMO': 'Außerhalb des IMMO-Bereichs'
    }
  };
  const translateStandardValue = (value) => {
    if (isLegacyBuCode(value)) return translateDas(value, language);
    const key = normalizeCategoryKey(value);
    return standardValueTranslations[language]?.[key] || formatUnknownCategory(value);
  };
  const translateDescription = (desc) => dataTranslations.descriptions[language]?.[desc] || desc;
  const translateCategory = (cat) => {
    const key = normalizeCategoryKey(cat);
    return supplementalCategoryTranslations[language]?.[key] || dataTranslations.categories[language]?.[cat] || formatUnknownCategory(cat);
  };

  const categoryOptions = useMemo(() => {
    if (socialModal) {
      return [...new Set(['Aide Sociale Ménage', 'Aide Sociale', formData.categorie].filter(Boolean))];
    }
    const defaults = modalType === 'recette'
      ? ['Financement', 'Vente de Marchandises', 'Vente de Services', 'Don en nature', 'Remboursement Caution Loyer', 'Remboursement Investissement Immo', 'Aide Sociale Ménage', 'Ventes', 'Recettes', 'Dons', 'Donation', 'Services', 'Immobilier', 'Fin Immo', 'Social', 'Participation']
      : ['Materiel', 'Administrative', 'Logistique', 'Achat Terrain', 'Chantier', 'Bien_Immo', 'Don Materiel', 'Formalites', 'Voyages', 'Alimentation', 'Bureautique', 'Carburant', 'Cadeaux', 'Etudes & Plans', 'Marchandises', 'Shipping / Fret', 'Abonnement', 'Depenses', 'Operationnel', 'Immobilier', 'Investissement Immo', 'Paie', 'Salaires', 'Social', 'Aide Sociale', 'Transport', 'Fournitures', 'Services'];
    const sourceRows = modalType === 'recette' ? recettes : depenses;
    const existing = sourceRows.map((row) => row.categorie).filter(Boolean);
    return [...new Set([...defaults, ...existing, formData.categorie].filter(Boolean))];
  }, [modalType, socialModal, recettes, depenses, formData.categorie]);

  const immoCategoryOptions = useMemo(() => [
    ...new Set([
      'Achat Terrain', 'Frais Administratifs', 'Clôture/Portail', 'Gros Œuvres',
      'Seconds Œuvres', 'Solaire/Énergie', 'Équipements', 'Notaire/Domaines',
      'Finitions', 'Expertise/Devis', 'Plomberie', 'Électricité', 'Remboursement',
      'Autre', ...immoTransactions.map((item) => item.categorie), immoFormData.categorie
    ].filter(Boolean))
  ], [immoTransactions, immoFormData.categorie]);

  // Load FX history from BigQuery
  useEffect(() => {
    const loadFxHistory = async () => {
      try {
        const response = await api.getFxHistory();
        console.log('🔍 FX API Response:', response);

        if (response?.data && Array.isArray(response.data)) {
          const dataArray = response.data;

          setTauxDuJour(response.taux_du_jour || {});

          if (dataArray.length > 0) {
            const mappedData = dataArray.map(item => ({
              id: item.source_id || item.id,
              date: item.date_taux || item.date_updated || item.date ? cleanDate(item.date_taux || item.date_updated || item.date) : '',
              rate: parseFloat(item.taux || item.rate || 0),
              devise_from: item.devise_base || item.source_currency || item.devise_from,
              devise_to: item.devise_cible || item.target_currency || item.devise_to,
              source: item.source_taux || item.source,
              commentaire: item.commentaire || ''
            }));
            setFxHistory(mappedData);
            console.log('✅ FX History loaded:', mappedData.length, 'rows');
          } else {
            console.log('⚠️ Response data is empty:', dataArray);
            setFxHistory([]);
          }
        } else {
          console.log('⚠️ Invalid response structure:', response);
          setFxHistory([]);
        }
      } catch (error) {
        console.log('❌ FX History error:', error);
        setFxHistory([]);
      }
    };
    loadFxHistory();
  }, []);

  const loadRealEstateFinance = useCallback(async () => {
    setImmoAccessState('loading');
    try {
      const response = await api.getRealEstateFinance(200, 0);
      if (response?.success === false || !Array.isArray(response?.data)) {
        throw Object.assign(new Error('Invalid real-estate register response'), { code: 'INVALID_IMMO_RESPONSE' });
      }
      const rows = response.data;
      setImmoTransactions(rows.map((item) => ({
        ...item,
        id: item.source_id,
        date: cleanDate(item.date_operation),
        montantChf: parseFiniteNumber(item.montant_chf),
        montantCfa: parseFiniteNumber(item.montant_cfa),
        tauxFx: parseFiniteNumber(item.taux_fx),
        partCheikhChf: parseFiniteNumber(item.part_cheikh_chf),
        remboursementCheikhChf: parseFiniteNumber(item.remboursement_cheikh_chf),
        estPlanifie: Boolean(item.est_planifie)
      })));
      setImmoSummary(response?.summary || {});
      setImmoError('');
      setImmoAccessState('available');
    } catch (error) {
      console.error('Real Estate Finance error:', error);
      setImmoTransactions([]);
      setImmoSummary({});
      setImmoError(error.status === 403 || error.code === 'INVALID_IMMO_RESPONSE' ? '' : error.message);
      setImmoAccessState(error.status === 403 ? 'forbidden' : 'unavailable');
    }
  // cleanDate and toNumber are stable helpers within this component.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadRealEstateFinance();
  }, [loadRealEstateFinance]);

  const recettesAffichees = recettes;
  const incomeRegisterRows = useMemo(
    () => recettes.filter(row => matchesIncomeScope(row, incomeScope)),
    [recettes, incomeScope]
  );
  const selectIncomeScope = (value) => {
    const params = new URLSearchParams(location.search);
    const scope = normalizeIncomeScope(value);
    if (scope === 'all') params.delete('incomeScope');
    else params.set('incomeScope', scope);
    params.set('tab', 'recettes');
    navigate({ pathname: location.pathname, search: `?${params.toString()}`, hash: '#finance-revenue-register' });
  };
  const depensesAffichees = depenses;
  const renderFxQualityNotice = (rows) => {
    const missingRateCount = rows.filter((row) => !row.hasExplicitTauxFx).length;
    const missingAmountCount = rows.filter((row) => !row.montantChfAvailable || !row.montantCfaAvailable).length;
    if (!missingRateCount && !missingAmountCount) return null;

    return (
      <div className="mb-4 rounded-lg border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm" role="status">
        <p className="font-semibold text-amber-200">{t.fxQualityTitle}</p>
        {missingRateCount > 0 && (
          <p className="mt-1 text-slate-300">{t.fxQualityRateWarning.replace('{count}', missingRateCount)}</p>
        )}
        {missingAmountCount > 0 && (
          <p className="mt-1 text-slate-300">{t.fxQualityAmountWarning.replace('{count}', missingAmountCount)}</p>
        )}
      </div>
    );
  };

  const recettesExploitation = useMemo(() => recettesAffichees.filter((row) => {
    const category = normalizeCategoryKey(row.categorie);
    return category !== 'AIDE SOCIALE MENAGE' && category !== 'AIDE SOCIALE';
  }), [recettesAffichees]);
  const totalRecettes = financeSummary?.totalIncome ?? null;
  const totalRecettesCfa = financeSummary?.totalIncomeCfa ?? null;
  const totalDepenses = financeSummary?.totalExpenses ?? null;
  const totalDepensesCfa = financeSummary?.totalExpensesCfa ?? null;
  const solde = Number.isFinite(totalRecettes) && Number.isFinite(totalDepenses)
    ? totalRecettes - totalDepenses
    : null;
  const soldeCfa = Number.isFinite(totalRecettesCfa) && Number.isFinite(totalDepensesCfa)
    ? totalRecettesCfa - totalDepensesCfa
    : null;
  const financeSummaryReadAt = financeSummary?.timestamp && !Number.isNaN(new Date(financeSummary.timestamp).getTime())
    ? new Intl.DateTimeFormat(
      language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH',
      { dateStyle: 'short', timeStyle: 'short' }
    ).format(new Date(financeSummary.timestamp))
    : null;
  const latestHistoricalFx = getHistoricalCfaPerChf(new Date().toISOString().split('T')[0]);
  const tauxChfCfa = tauxDuJour.CHF_CFA || latestHistoricalFx?.cfaPerChf || null;
  const formatCfaWithCurrentRate = (chfAmount) => Number.isFinite(chfAmount) && tauxChfCfa
    ? Math.round(chfAmount * tauxChfCfa).toLocaleString()
    : '—';

  const socialRowsAffichees = socialRows;
  const socialRowsTotalChf = socialRowsAffichees.reduce((sum, row) => sum + toNumber(row.montantChf), 0);
  const socialRowsTotalCfaHistorique = socialRowsAffichees.reduce((sum, row) => sum + toNumber(row.montantCfa), 0);
  const socialTotalChf = socialAccessState === 'available'
    ? parseFiniteNumber(socialSummary.total_chf) ?? (socialRowsAffichees.length ? socialRowsTotalChf : null)
    : null;
  const socialTotalCfaHistorique = socialAccessState === 'available'
    ? parseFiniteNumber(socialSummary.total_cfa_historique) ?? (socialRowsAffichees.length ? socialRowsTotalCfaHistorique : null)
    : null;
  const socialTotalCfaActuel = Number.isFinite(socialTotalChf) && tauxChfCfa ? socialTotalChf * tauxChfCfa : null;
  const socialYears = socialRowsAffichees
    .map((row) => cleanDate(row.date).slice(0, 4))
    .filter((year) => /^\d{4}$/.test(year));
  const socialFirstYear = socialSummary.premiere_annee || (socialYears.length ? Math.min(...socialYears.map(Number)) : null);
  const socialLastYear = socialSummary.derniere_annee || (socialYears.length ? Math.max(...socialYears.map(Number)) : null);
  const socialAnnualData = useMemo(() => {
    const yearly = {};
    socialRowsAffichees.forEach((row) => {
      const year = cleanDate(row.date).slice(0, 4);
      if (!/^\d{4}$/.test(year)) return;
      if (!yearly[year]) yearly[year] = { annee: year, montantChf: 0, montantCfa: 0, operations: 0 };
      yearly[year].montantChf += toNumber(row.montantChf);
      yearly[year].montantCfa += toNumber(row.montantCfa);
      yearly[year].operations += 1;
    });
    return Object.values(yearly).sort((a, b) => a.annee.localeCompare(b.annee));
  }, [socialRowsAffichees]);

  const annualFinanceData = useMemo(() => {
    const yearly = {};
    const addRows = (rows, key) => rows.forEach((row) => {
      const year = cleanDate(row.date).slice(0, 4);
      if (!/^\d{4}$/.test(year)) return;
      if (!yearly[year]) yearly[year] = { année: year, recettes: 0, depenses: 0, recettesCfa: 0, depensesCfa: 0 };
      const montantChf = toNumber(row.montantChf ?? row.montant);
      const tauxFx = toNumber(row.tauxFx);
      const montantCfa = toNumber(row.montantCfa) || (tauxFx > 1 ? montantChf * tauxFx : 0);
      yearly[year][key] += montantChf;
      yearly[year][`${key}Cfa`] += montantCfa;
    });
    addRows(recettesExploitation, 'recettes');
    addRows(depensesAffichees, 'depenses');
    return Object.values(yearly).sort((a, b) => a.année.localeCompare(b.année));
  }, [recettesExploitation, depensesAffichees]);

  // Average the direct CHF -> CFA observations for each year.
  const fxYearlyData = useMemo(() => {
    const years = Array.from({ length: 8 }, (_, index) => String(2019 + index));
    const yearlyMap = Object.fromEntries(years.map((year) => [year, { direct: [], inverse: [] }]));

    fxHistory.forEach(item => {
      if (!item.date) return;
      const year = cleanDate(item.date).slice(0, 4);
      if (!yearlyMap[year]) return;
      const rawRate = toNumber(item.rate);
      const from = String(item.devise_from || '').toUpperCase();
      const to = String(item.devise_to || '').toUpperCase();
      if (from === 'CHF' && to === 'CFA' && rawRate > 1) yearlyMap[year].direct.push(rawRate);
      if (from === 'CFA' && to === 'CHF' && rawRate > 0 && rawRate < 1) yearlyMap[year].inverse.push(1 / rawRate);
    });

    return years.map((year) => {
      const observations = yearlyMap[year].direct.length ? yearlyMap[year].direct : yearlyMap[year].inverse;
      const average = observations.length
        ? observations.reduce((sum, rate) => sum + rate, 0) / observations.length
        : null;
      return {
        année: year,
        'Taux Moyen': average === null ? null : Number(average.toFixed(2)),
        observations: observations.length
      };
    });
  }, [fxHistory]);

  const fxYearlyDomain = useMemo(() => {
    const values = fxYearlyData.map((item) => item['Taux Moyen']).filter(Number.isFinite);
    if (!values.length) return [550, 730];
    const minimum = Math.floor((Math.min(...values) - 10) / 10) * 10;
    const maximum = Math.ceil((Math.max(...values) + 10) / 10) * 10;
    return [minimum, maximum];
  }, [fxYearlyData]);

  const fxStatistics = useMemo(() => {
    const rates = fxHistory.map((item) => {
      const from = String(item.devise_from || '').toUpperCase();
      const to = String(item.devise_to || '').toUpperCase();
      const rate = toNumber(item.rate);
      if (!rate) return null;
      if (from === 'CHF' && to === 'CFA') return rate;
      if (from === 'CFA' && to === 'CHF') return 1 / rate;
      return null;
    }).filter(Boolean);
    if (!rates.length) return { minimum: 0, maximum: 0, average: 0 };
    return {
      minimum: Math.min(...rates),
      maximum: Math.max(...rates),
      average: rates.reduce((sum, rate) => sum + rate, 0) / rates.length
    };
  }, [fxHistory]);

  const converterRate = converterDate
    ? getHistoricalCfaPerChf(converterDate)?.cfaPerChf || null
    : tauxChfCfa;
  const converterInputCurrency = converterDirection === 'CHF_CFA' ? 'CHF' : 'CFA';
  const converterOutputCurrency = converterDirection === 'CHF_CFA' ? 'CFA' : 'CHF';
  const converterInputValue = toNumber(converterAmount);
  const converterOutputValue = converterRate
    ? (converterDirection === 'CHF_CFA' ? converterInputValue * converterRate : converterInputValue / converterRate)
    : null;
  const displayedConverterOutput = conversionResult?.output ?? converterOutputValue;
  const formatConvertedValue = (value, currency) => {
    if (value === null || value === undefined) return '-';
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: currency === 'CHF' ? 2 : 0,
      maximumFractionDigits: currency === 'CHF' ? 2 : 0
    });
  };
  const calculateConversion = () => {
    if (!converterRate || converterOutputValue === null) return;
    const entry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: converterInputValue,
      inputCurrency: converterInputCurrency,
      output: converterOutputValue,
      outputCurrency: converterOutputCurrency,
      rate: converterRate,
      direction: converterDirection
    };
    setConversionResult(entry);
    setRecentConversions((current) => [entry, ...current].slice(0, 5));
  };

  const immoYearlyData = useMemo(() => {
    const yearly = immoTransactions.reduce((acc, item) => {
      if (item.estPlanifie || !['Avance', 'Information'].includes(item.type_operation)) return acc;
      const year = item.date.slice(0, 4);
      if (!acc[year]) acc[year] = { montantChf: 0, montantCfa: 0 };
      acc[year].montantChf += item.montantChf;
      acc[year].montantCfa += item.montantCfa;
      return acc;
    }, {});
    return Object.entries(yearly)
      .map(([annee, montants]) => ({ annee, ...montants }))
      .sort((a, b) => a.annee.localeCompare(b.annee));
  }, [immoTransactions]);

  const handleImmoFormChange = (field, value) => {
    if (immoFormError === 'required') setImmoFormError(null);
    setImmoFormData((previous) => {
      const next = { ...previous, [field]: value };
      if (field === 'team') {
        next.team = normalizeTeamCode(value);
        const currentAgentTeam = findAgentTeam(previous.agent, agentsByTeam);
        if (!currentAgentTeam || currentAgentTeam !== next.team) next.agent = '';
      }
      if (field === 'date' && !editingImmo) {
        const historicalRate = getHistoricalCfaPerChf(value)?.cfaPerChf;
        const previousReference = getHistoricalCfaPerChf(previous.date)?.cfaPerChf;
        if (Number(previous.tauxFx) > 0 && Number(previous.tauxFx) === previousReference) {
          next.tauxFx = historicalRate || '';
        }
      }
      return next;
    });
  };

  const openNewImmoModal = () => {
    setImmoFormError(null);
    const next = createEmptyImmoForm();
    const historicalRate = getHistoricalCfaPerChf(next.date)?.cfaPerChf;
    if (historicalRate) next.tauxFx = historicalRate;
    setEditingImmoId(null);
    setImmoFormData(next);
    setShowImmoModal(true);
  };

  const handleImmoEdit = (item) => {
    setImmoFormError(null);
    setEditingImmoId(item.id);
    setImmoFormData({
      date: item.date,
      designation: item.designation || '',
      montantChf: item.montantChf ?? '',
      montantCfa: item.montantCfa ?? '',
      tauxFx: item.tauxFx ?? '',
      partCheikhChf: item.partCheikhChf ?? '',
      remboursementCheikhChf: item.remboursementCheikhChf ?? '',
      sourceFile: item.source_file,
      enrichiGenspark: item.enrichi_genspark,
      typeOperation: item.type_operation || 'Avance',
      perimetre: item.perimetre || 'Immobilier',
      categorie: item.categorie || 'Autre',
      projet: item.projet || 'Terrain Lac Rose',
      documentRef: item.document_ref || '',
      statut: item.statut || 'En cours',
      agent: item.agent || '',
      team: normalizeTeamCode(item.team || ''),
      departement: item.departement || '',
      phaseProjet: item.phase_projet || ''
    });
    setShowImmoModal(true);
  };

  const handleImmoSave = () => {
    if (immoSaveInvalid) return;
    if (!immoFormData.date || !immoFormData.designation.trim()) {
      setImmoFormError('required');
      immoFormErrorRef.current?.focus();
      return;
    }
    setImmoFormError(null);
    let montantChf = toNumber(immoFormData.montantChf);
    let montantCfa = toNumber(immoFormData.montantCfa);
    let tauxFx = immoRate;
    if (!editingImmo) {
      tauxFx = montantChf > 0 && montantCfa > 0 ? montantCfa / montantChf : immoRate;
      if (!tauxFx) tauxFx = getHistoricalCfaPerChf(immoFormData.date)?.cfaPerChf || 0;
      if (montantChf > 0 && !montantCfa && tauxFx) montantCfa = montantChf * tauxFx;
      if (montantCfa > 0 && !montantChf && tauxFx) montantChf = montantCfa / tauxFx;
    }

    const payload = {
      date_operation: immoFormData.date,
      designation: immoFormData.designation,
      montant_chf: montantChf,
      montant_cfa: montantCfa,
      taux_fx: tauxFx || null,
      part_cheikh_chf: toNumber(immoFormData.partCheikhChf),
      remboursement_cheikh_chf: toNumber(immoFormData.remboursementCheikhChf),
      type_operation: immoFormData.typeOperation,
      perimetre: immoFormData.perimetre,
      categorie: immoFormData.categorie,
      projet: immoFormData.projet,
      document_ref: immoFormData.documentRef,
      statut: immoFormData.statut,
      agent: immoFormData.agent,
      team: immoFormData.team,
      departement: immoFormData.departement,
      phase_projet: immoFormData.phaseProjet,
      source_file: editingImmo ? immoFormData.sourceFile : 'M3S App',
      enrichi_genspark: editingImmo ? immoFormData.enrichiGenspark : false
    };
    setFeedback(null);
    setPendingAction({
      scope: 'immo',
      action: editingImmoId !== null ? 'update' : 'create',
      itemId: editingImmoId,
      label: immoFormData.designation.trim(),
      payload
    });
  };

  const executeImmoSave = async (action) => {
    setSavingImmo(true);
    try {
      const response = action.itemId !== null
        ? await api.updateRealEstateFinance(action.itemId, action.payload)
        : await api.createRealEstateFinance(action.payload);
      if (response?.success === false) throw new Error('Real-estate save not confirmed');
      await loadRealEstateFinance();
      setShowImmoModal(false);
      setEditingImmoId(null);
      setFeedback({ tone: 'success', message: withLabel(action.action === 'update' ? t.updatedSuccess : t.savedSuccess, action.label) });
    } finally {
      setSavingImmo(false);
    }
  };

  const handleImmoDelete = (id, label) => {
    setFeedback(null);
    setPendingAction({ scope: 'immo', action: 'delete', itemId: id, label: label || id || t.operationLabel });
  };

  const executeImmoDelete = async (action) => {
    const response = await api.deleteRealEstateFinance(action.itemId);
    if (response?.success === false) throw new Error('Real-estate deletion not confirmed');
    await loadRealEstateFinance();
    setFeedback({ tone: 'success', message: withLabel(t.deletedSuccess, action.label) });
  };

  const handleFormChange = (field, value) => {
    setFinanceFormError(false);
    setFormData((previous) => {
      const next = { ...previous, [field]: value };
      if (field === 'team') {
        next.team = normalizeTeamCode(value);
        const currentAgentTeam = findAgentTeam(previous.agent, agentsByTeam);
        if (!currentAgentTeam || currentAgentTeam !== next.team) next.agent = '';
      }
      return next;
    });
  };

  const handleFinanceDateChange = (date) => {
    setFinanceFormError(false);
    const nextReference = getHistoricalCfaPerChf(date)?.cfaPerChf || '';
    setFormData((previous) => {
      const previousReference = getHistoricalCfaPerChf(previous.date)?.cfaPerChf || '';
      const appliedWasDefault = editingId === null
        && Number(previous.tauxFxApplique) > 0
        && Number(previous.tauxFxApplique) === Number(previousReference);
      return {
        ...previous,
        date,
        tauxFxApplique: appliedWasDefault ? nextReference : previous.tauxFxApplique,
      };
    });
  };

  const handleSave = () => {
    if (financeDescriptionInvalid || financeAmountInvalid || !formData.date) {
      setFinanceFormError(true);
      financeFormErrorRef.current?.focus();
      return;
    }
    const tauxFxReference = getHistoricalCfaPerChf(formData.date)?.cfaPerChf || 0;
    const tauxFxApplique = appliedFormRate;
    if (appliedRateInvalid) return;
    setFinanceFormError(false);

    const montantOrigine = financeAmount;
    const deviseOrigine = String(formData.devise || 'CHF').toUpperCase();
    const montantChf = deviseOrigine === 'CHF' ? montantOrigine : montantOrigine / tauxFxApplique;
    const montantCfa = deviseOrigine === 'CFA' ? montantOrigine : montantOrigine * tauxFxApplique;
    const payload = {
      description: formData.description,
      date: formData.date,
      montant_origine: montantOrigine,
      devise_origine: deviseOrigine,
      montant_chf: montantChf,
      montant_cfa: montantCfa,
      taux_fx: tauxFxApplique,
      taux_fx_applique: tauxFxApplique,
      taux_fx_reference: tauxFxReference || null,
      categorie: formData.categorie,
      type: formData.type || (modalType === 'recette' ? 'Virement' : 'Paiement'),
      agent: formData.agent || '',
      team: formData.team || '',
      departement: formData.departement || '',
      phase_projet: formData.phaseProjet || '',
      pays: formData.pays || '',
      commentaire: formData.commentaire || '',
      fournisseur: formData.fournisseur || ''
    };

    setFeedback(null);
    setPendingAction({
      scope: 'finance',
      action: editingId !== null ? 'update' : 'create',
      itemId: editingId,
      type: modalType,
      socialModal,
      label: formData.description.trim(),
      payload
    });
  };

  const executeFinanceSave = async (action) => {
    setSavingFinance(true);
    try {
      let response;
      if (action.type === 'recette') {
        if (action.itemId !== null) response = await api.updateIncome(action.itemId, action.payload);
        else response = await api.createIncome(action.payload);
      } else if (action.itemId !== null) response = await api.updateExpense(action.itemId, action.payload);
      else response = await api.createExpense(action.payload);
      if (response?.success === false) throw new Error('Finance save not confirmed');
      await loadFinanceData();
      if (action.socialModal) await loadSocialData();
      setShowModal(false);
      setEditingId(null);
      setSocialModal(false);
      setFormData(createEmptyFinanceForm());
      setFeedback({ tone: 'success', message: withLabel(action.action === 'update' ? t.updatedSuccess : t.savedSuccess, action.label) });
    } finally {
      setSavingFinance(false);
    }
  };

  const handleEdit = (type, item) => {
    setFinanceFormError(false);
    setModalType(type);
    setSocialModal(type === 'recette' && activeTab === 'social');
    setEditingId(item.id);
    setFormData({
      ...item,
      montant: item.montantOrigine ?? item.montant,
      devise: item.deviseOrigine ?? item.devise,
      tauxFxApplique: item.tauxFx || '',
      team: normalizeTeamCode(item.team || ''),
    });
    setShowModal(true);
  };

  const handleDelete = (type, id, label) => {
    setFeedback(null);
    setPendingAction({ scope: 'finance', action: 'delete', type, itemId: id, label: label || id || t.operationLabel, socialModal: activeTab === 'social' });
  };

  const executeFinanceDelete = async (action) => {
    const response = action.type === 'recette'
      ? await api.deleteIncome(action.itemId)
      : await api.deleteExpense(action.itemId);
    if (response?.success === false) throw new Error('Finance deletion not confirmed');
    await loadFinanceData();
    if (action.socialModal) await loadSocialData();
    setFeedback({ tone: 'success', message: withLabel(t.deletedSuccess, action.label) });
  };

  const openNewModal = (type) => {
    setFinanceFormError(false);
    const next = createEmptyFinanceForm();
    next.tauxFxApplique = getHistoricalCfaPerChf(next.date)?.cfaPerChf || '';
    setModalType(type);
    setSocialModal(false);
    setEditingId(null);
    setFormData(next);
    setShowModal(true);
  };

  const openNewSocialModal = () => {
    setFinanceFormError(false);
    const next = createEmptyFinanceForm();
    next.tauxFxApplique = getHistoricalCfaPerChf(next.date)?.cfaPerChf || '';
    setModalType('recette');
    setSocialModal(true);
    setEditingId(null);
    setFormData({
      ...next,
      categorie: 'Aide Sociale Ménage',
      agent: '',
      team: 'Team_ZH',
      departement: 'Finances',
      pays: 'CH'
    });
    setShowModal(true);
  };

  // FX Functions
  const handleFxFormChange = (field, value) => {
    setFxFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFxSave = () => {
    if (fxFormInvalid) return;
    setFeedback(null);
    setPendingAction({
      scope: 'fx',
      action: editingFxId !== null ? 'update' : 'create',
      itemId: editingFxId,
      label: `${fxFormData.devise_from} → ${fxFormData.devise_to}`,
      payload: { ...fxFormData, rate: fxFormRate }
    });
  };

  const executeFxSave = (action) => {
    if (action.itemId !== null) {
      setFxHistory(current => current.map(fx => fx.id === action.itemId ? { ...action.payload, id: action.itemId } : fx));
    } else {
      setFxHistory(current => [...current, { ...action.payload, id: `FX-${Date.now()}` }]);
    }
    setShowFxModal(false);
    setEditingFxId(null);
    setFxFormData({ devise_from: 'CHF', devise_to: 'CFA', rate: '', date: new Date().toISOString().split('T')[0], source: 'Manual' });
    setFeedback({ tone: 'success', message: withLabel(action.action === 'update' ? t.fxUpdatedSuccess : t.fxSavedSuccess, action.label) });
  };

  const handleFxEdit = (fx) => {
    setEditingFxId(fx.id);
    setFxFormData(fx);
    setShowFxModal(true);
  };

  const handleFxDelete = (id, label) => {
    setFeedback(null);
    setPendingAction({ scope: 'fx', action: 'delete', itemId: id, label: label || id || t.operationLabel });
  };

  const executeFxDelete = (action) => {
    setFxHistory(current => current.filter(fx => fx.id !== action.itemId));
    setFeedback({ tone: 'success', message: withLabel(t.fxDeletedSuccess, action.label) });
  };

  const confirmPendingAction = async () => {
    if (!pendingAction || pendingAction.error || confirmingAction) return;
    const action = pendingAction;
    setConfirmingAction(true);
    try {
      if (action.scope === 'immo' && action.action === 'delete') await executeImmoDelete(action);
      else if (action.scope === 'immo') await executeImmoSave(action);
      else if (action.scope === 'finance' && action.action === 'delete') await executeFinanceDelete(action);
      else if (action.scope === 'finance') await executeFinanceSave(action);
      else if (action.scope === 'fx' && action.action === 'delete') executeFxDelete(action);
      else if (action.scope === 'fx') executeFxSave(action);
      setPendingAction(null);
    } catch (error) {
      if (action.scope === 'immo' && action.action !== 'delete') {
        setImmoFormError('save');
        setPendingAction(null);
      } else setPendingAction({ ...action, error: true });
    } finally {
      setConfirmingAction(false);
    }
  };

  const openNewFxModal = () => {
    setEditingFxId(null);
    setFxFormData({ devise_from: 'CHF', devise_to: 'CFA', rate: '', date: new Date().toISOString().split('T')[0], source: 'Manual' });
    setShowFxModal(true);
  };

  const filteredFxHistory = useMemo(() =>
    fxHistory.filter(fx => {
      const matchesDevise = !filterDevise || fx.devise_from?.includes(filterDevise) || fx.devise_to?.includes(filterDevise);
      return matchesDevise;
    }), [fxHistory, filterDevise]);

  const immoValue = (key) => immoAccessState === 'available' ? parseFiniteNumber(immoSummary[key]) : null;
  const immoInvestiChf = immoValue('investissements_realises_chf');
  const immoInvestiCfa = immoValue('investissements_realises_cfa');
  const immoRemboursementsDirects = immoValue('remboursements_directs_chf');
  const immoRemboursementsTotal = immoValue('remboursements_total_chf');
  const immoPartCheikh = immoValue('part_cheikh_chf');
  const immoSoldeOuvert = immoValue('solde_ouvert_cheikh_chf');
  const immoEquivalentTauxJour = Number.isFinite(immoInvestiChf) && tauxChfCfa ? Math.round(immoInvestiChf * tauxChfCfa) : null;
  const immoStatusClass = (status) => {
    const key = normalizeCategoryKey(status);
    if (['REMBOURSE', 'PAYE'].includes(key)) return 'bg-green-900/50 text-green-300';
    if (['PARTIEL', 'EN COURS'].includes(key)) return 'bg-orange-900/50 text-orange-300';
    if (['PLANIFIE', 'REPORTE'].includes(key)) return 'bg-blue-900/50 text-blue-300';
    return 'bg-slate-700 text-slate-300';
  };
  const confirmation = pendingAction ? {
    create: { title: t.confirmCreateTitle, body: t.confirmCreateBody, confirm: t.confirmCreate },
    update: { title: t.confirmUpdateTitle, body: t.confirmUpdateBody, confirm: t.confirmUpdate },
    delete: { title: t.confirmDeleteTitle, body: t.confirmDeleteBody, confirm: t.confirmDelete }
  }[pendingAction.action] : null;

  useEffect(() => {
    if (showImmoModal && immoFormError && !pendingAction) immoFormErrorRef.current?.focus();
  }, [showImmoModal, immoFormError, pendingAction]);

  useEffect(() => {
    if (showModal && financeFormError && !pendingAction) financeFormErrorRef.current?.focus();
  }, [showModal, financeFormError, pendingAction]);

  return (
    <>
      <div className="m3s-business-module min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
        <div className="mx-auto w-full max-w-[1800px]">

        <ModulePageTabs
          moduleId="finances"
          language={language}
          activeTab={activeTab}
          onSelect={selectFinanceTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'architecture', label: t.architecture },
            { tab: 'processes', label: t.processes },
            { tab: 'recettes', label: t.recettes },
            { tab: 'depenses', label: t.depenses },
            { tab: 'fx', label: t.fx }
          ]}
        />

        {activeTab === 'overview' && <FinanceFunctionFrame language={language} />}

        <FinanceOverviewIndicators
          language={language}
          incomeCount={financeSummary?.incomeCount}
          expenseCount={financeSummary?.expenseCount}
          realEstateLoadedCount={immoAccessState === 'available' ? immoTransactions.length : null}
          socialLoadedCount={socialAccessState === 'available' ? socialRows.length : null}
          financeState={financeSummaryStatus}
          totalIncome={totalRecettes}
          totalIncomeCfa={totalRecettesCfa}
          totalExpenses={totalDepenses}
          totalExpensesCfa={totalDepensesCfa}
          netBalance={solde}
          netBalanceCfa={soldeCfa}
          currentRate={parseFiniteNumber(tauxChfCfa)}
          realEstateState={immoAccessState}
          realEstateFunding={immoInvestiChf}
          realEstateFundingCfa={immoInvestiCfa}
          reimbursements={immoRemboursementsTotal}
          reimbursementsCfa={Number.isFinite(immoRemboursementsTotal) && tauxChfCfa ? Math.round(immoRemboursementsTotal * tauxChfCfa) : null}
          outstandingBalance={immoSoldeOuvert}
          outstandingBalanceCfa={Number.isFinite(immoSoldeOuvert) && tauxChfCfa ? Math.round(immoSoldeOuvert * tauxChfCfa) : null}
          socialState={socialAccessState}
          socialTotal={socialTotalChf}
          socialTotalCfa={socialTotalCfaHistorique}
        />

        <div
          role="status"
          data-testid="finance-source-status"
          className={`mb-6 flex items-start gap-3 rounded-lg border px-4 py-3 ${
            financeSummaryStatus === 'available'
              ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-100'
              : financeSummaryStatus === 'loading'
                ? 'border-blue-700/60 bg-blue-950/30 text-blue-100'
                : 'border-amber-700/60 bg-amber-950/30 text-amber-100'
          }`}
        >
          {financeSummaryStatus === 'loading' ? (
            <LoaderCircle size={20} className="mt-0.5 shrink-0 animate-spin" aria-hidden="true" />
          ) : financeSummaryStatus === 'available' ? (
            <Database size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
          )}
          <div className="min-w-0 text-sm">
            <p className="font-semibold">
              {financeSummaryStatus === 'loading'
                ? t.sourceLoading
                : financeSummaryStatus === 'available'
                  ? t.sourceAvailable
                  : t.sourceUnavailable}
            </p>
            <p className="mt-1 text-slate-300">
              {financeSummaryStatus === 'available'
                ? `${financeSummary.incomeCount.toLocaleString()} ${t.incomeRecords} · ${financeSummary.expenseCount.toLocaleString()} ${t.expenseRecords} · ${t.globalSource}${financeSummaryReadAt ? ` · ${t.sourceRead} : ${financeSummaryReadAt}` : ''}`
                : financeSummaryStatus === 'unavailable'
                  ? `${t.missingNotZero} ${t.globalSource}`
                  : t.globalSource}
            </p>
            {financeExtractStatus !== 'loading' && (
              <p className="mt-1 text-slate-400">
                {financeExtractStatus === 'available'
                  ? `${recettes.length.toLocaleString()} ${t.incomeRecords} · ${depenses.length.toLocaleString()} ${t.expenseRecords} · ${t.loadedExtract} (${t.maxPerRegister}).`
                  : financeExtractStatus === 'partial'
                    ? `${t.extractPartial} (${recettes.length.toLocaleString()} ${t.incomeRecords} · ${depenses.length.toLocaleString()} ${t.expenseRecords}).`
                    : `${t.extractUnavailable}.`}
              </p>
            )}
          </div>
        </div>

        {feedback && (
          <div className="m3s-feedback m3s-feedback--success mb-6 flex items-start gap-3 px-4 py-3" role="status">
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <p className="text-sm font-semibold leading-6">{feedback.message}</p>
          </div>
        )}

        {activeTab === 'overview' && (
          <div id="finance-overview" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6" tabIndex="-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.tendance} (CHF) · {t.chartScope}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={annualFinanceData} margin={{ top: 8, right: 10, left: 8, bottom: 0 }} barGap={5}>
                  <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                  <XAxis dataKey="année" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={52} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} CHF`]} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="recettes" name={t.recettes} fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="depenses" name={t.depenses} fill="#ef5b62" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.tendance} (CFA) · {t.chartScope}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={annualFinanceData} margin={{ top: 8, right: 10, left: 12, bottom: 0 }} barGap={5}>
                  <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                  <XAxis dataKey="année" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={66} tickFormatter={(value) => `${Math.round(value / 1000000)}M`} />
                  <Tooltip formatter={(value) => [`${Math.round(Number(value)).toLocaleString()} CFA`]} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="recettesCfa" name={t.recettes} fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="depensesCfa" name={t.depenses} fill="#ef5b62" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.historiqueTaux}</h3>
              <p className="text-slate-400 text-sm mb-2">{t.moyenneAnnuelleFx}</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={fxYearlyData} margin={{ top: 28, right: 34, left: 12, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="2 7" stroke="#7180a0" vertical={false} />
                  <XAxis dataKey="année" stroke="#94a3b8" tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={58} domain={fxYearlyDomain} tickFormatter={(value) => Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })} />
                  <Tooltip
                    labelFormatter={(year) => `${year}`}
                    formatter={(value, name, item) => [`1 CHF = ${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CFA (${item.payload.observations} obs.)`, t.taux]}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }}
                  />
                  <Line type="monotone" connectNulls dataKey="Taux Moyen" stroke="#60a5fa" strokeWidth={2.25} dot={{ fill: '#0f172a', stroke: '#60a5fa', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }}>
                    <LabelList dataKey="Taux Moyen" position="top" offset={10} fill="#93c5fd" fontSize={12} formatter={(value) => Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && <FinanceArchitecture language={language} />}

        {activeTab === 'processes' && <FinanceProcessControls language={language} />}

        {activeTab === 'recettes' && (
          <div id="finance-revenue-register" className="min-h-[calc(100dvh-12rem)] scroll-mt-24" tabIndex="-1">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <label className="flex min-w-0 flex-col gap-1 text-sm text-slate-300">
                <span>{t.incomeScope}</span>
                <select value={incomeScope} onChange={event => selectIncomeScope(event.target.value)} className="m3s-field min-h-11 w-full px-3 py-2 sm:w-64">
                  <option value="all">{t.allIncome}</option>
                  <option value="donations">{t.incomeDonations}</option>
                  <option value="financing">{t.incomeFinancing}</option>
                </select>
              </label>
              <StandardCreateButton onClick={() => openNewModal('recette')}>{t.nouvelleRecette}</StandardCreateButton>
            </div>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1" role="status">
              <FinanceTransactionCount count={incomeRegisterRows.length} state={incomeExtractStatus} scope="extract" language={language} />
              <span className="text-xs text-slate-400">{t.loadedExtract} · {t.maxPerRegister}</span>
            </div>
            {incomeExtractStatus === 'available' ? <>
            {renderFxQualityNotice(incomeRegisterRows)}
            <TableControls
              key={incomeScope}
              rows={incomeRegisterRows}
              renderTable={(visibleRows) => (
                <table className="min-w-[1900px] text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.ref}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.date}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.description}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.montantCHF}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.montantCFA}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.tauxFXCol}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.categorie}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.agent}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.team}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.departement}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.phaseProjet}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map(r => (
                      <tr
                        key={r.id}
                        onClick={() => handleEdit('recette', r)}
                        onKeyDown={(event) => event.target === event.currentTarget && event.key === 'Enter' && handleEdit('recette', r)}
                        tabIndex={0}
                        className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                      >
                        <td className="px-4 py-3 text-slate-400">{formatCell(r.ref)}</td>
                        <td className="px-6 py-3 text-slate-400 whitespace-nowrap">{formatDateForDisplay(r.date)}</td>
                        <td className="px-6 py-3 text-slate-300">{translateDescription(r.description)}</td>
                        <td className="px-4 py-3 text-green-400 font-bold">{r.montantChfAvailable ? formatAmount(r.montantChf) : '—'}</td>
                        <td className="px-4 py-3 text-green-300 font-bold">{r.montantCfaAvailable ? formatAmount(r.montantCfa) : '—'}</td>
                        <td className="px-4 py-3 text-purple-300">
                          {r.hasExplicitTauxFx ? formatAmount(r.tauxFx) : <span className="font-semibold text-amber-300">{t.fxRateMissing}</span>}
                        </td>
                        <td className="px-6 py-3 text-slate-400">{translateCategory(r.categorie)}</td>
                        <td className="px-4 py-3 text-slate-400">{formatCell(r.agent)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.team)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.departement)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.phaseProjet)}</td>
                        <td className="px-6 py-3 flex gap-2">
                          <button type="button" title={t.modifier} aria-label={`${t.modifier} : ${r.ref}`} onClick={(event) => { event.stopPropagation(); handleEdit('recette', r); }} className="m3s-icon-button hover:bg-slate-600">
                            <Edit2 size={18} className="text-blue-400" />
                          </button>
                          <button type="button" title={t.supprimer} aria-label={`${t.supprimer} : ${r.ref}`} onClick={(event) => { event.stopPropagation(); handleDelete('recette', r.id, r.description); }} className="m3s-icon-button hover:bg-slate-600">
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
            </> : <p className="py-6 text-sm text-slate-300" role="status">{incomeExtractStatus === 'loading' ? t.sourceLoading : t.extractUnavailable}</p>}
          </div>
        )}

        {activeTab === 'depenses' && (
          <div id="finance-expense-register" className="scroll-mt-24" tabIndex="-1">
            <div className="flex justify-end mb-4">
              <StandardCreateButton onClick={() => openNewModal('depense')}>{t.nouvelleDepense}</StandardCreateButton>
            </div>
            {renderFxQualityNotice(depensesAffichees)}
            <TableControls
              rows={depensesAffichees}
              renderTable={(visibleRows) => (
                <table className="min-w-[1900px] text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.ref}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.date}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.description}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.montantCHF}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.montantCFA}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.tauxFXCol}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.categorie}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.agent}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.team}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.departement}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.phaseProjet}</th>
                      <th className="px-6 py-3 text-left text-white font-bold">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map(d => (
                      <tr
                        key={d.id}
                        onClick={() => handleEdit('depense', d)}
                        onKeyDown={(event) => event.target === event.currentTarget && event.key === 'Enter' && handleEdit('depense', d)}
                        tabIndex={0}
                        className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                      >
                        <td className="px-4 py-3 text-slate-400">{formatCell(d.ref)}</td>
                        <td className="px-6 py-3 text-slate-400 whitespace-nowrap">{formatDateForDisplay(d.date)}</td>
                        <td className="px-6 py-3 text-slate-300">{translateDescription(d.description)}</td>
                        <td className="px-4 py-3 text-red-400 font-bold">{d.montantChfAvailable ? formatAmount(d.montantChf) : '—'}</td>
                        <td className="px-4 py-3 text-red-300 font-bold">{d.montantCfaAvailable ? formatAmount(d.montantCfa) : '—'}</td>
                        <td className="px-4 py-3 text-purple-300">
                          {d.hasExplicitTauxFx ? formatAmount(d.tauxFx) : <span className="font-semibold text-amber-300">{t.fxRateMissing}</span>}
                        </td>
                        <td className="px-6 py-3 text-slate-400">{translateCategory(d.categorie)}</td>
                        <td className="px-4 py-3 text-slate-400">{formatCell(d.agent)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.team)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.departement)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.phaseProjet)}</td>
                        <td className="px-6 py-3 flex gap-2">
                          <button type="button" title={t.modifier} aria-label={`${t.modifier} : ${d.ref}`} onClick={(event) => { event.stopPropagation(); handleEdit('depense', d); }} className="m3s-icon-button hover:bg-slate-600">
                            <Edit2 size={18} className="text-blue-400" />
                          </button>
                          <button type="button" title={t.supprimer} aria-label={`${t.supprimer} : ${d.ref}`} onClick={(event) => { event.stopPropagation(); handleDelete('depense', d.id, d.description); }} className="m3s-icon-button hover:bg-slate-600">
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
          </div>
        )}

        {activeTab === 'fx' && (
          <div id="finance-fx" className="scroll-mt-24 space-y-5" tabIndex="-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                { label: t.tauxActuel, value: tauxChfCfa, icon: ArrowRightLeft, color: 'text-blue-400' },
                { label: t.maximum, value: fxStatistics.maximum, icon: TrendingUp, color: 'text-green-400' },
                { label: t.minimum, value: fxStatistics.minimum, icon: TrendingDown, color: 'text-orange-400' },
                { label: t.moyenne, value: fxStatistics.average, icon: Calculator, color: 'text-purple-400' }
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded bg-slate-700 flex items-center justify-center">
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{value ? Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-'}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div id="finance-fx-navigation" ref={fxNavigationRef} tabIndex={-1} role="navigation" aria-label={t.fx} className="scroll-mt-24 flex gap-2 border-b border-slate-700 overflow-x-auto">
              {[
                { id: 'converter', label: t.convertisseur, icon: Calculator },
                { id: 'dashboard', label: t.tableauBordFx, icon: BarChart3 },
                { id: 'history', label: t.tauxHistorique, icon: History }
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} ref={fxView === id ? activeFxButtonRef : null} aria-pressed={fxView === id} aria-controls={`finance-fx-${id}`} onClick={() => selectFxView(id)} className={`flex min-h-11 items-center gap-2 px-4 py-3 whitespace-nowrap font-medium ${fxView === id ? 'text-orange-300 border-b-2 border-orange-400' : 'text-slate-400 hover:text-white'}`}>
                  <Icon size={17} /> {label}
                </button>
              ))}
            </div>

            {fxView === 'converter' && (
              <div id="finance-fx-converter" className="m3s-fx-workspace min-h-[calc(100dvh-12rem)]">
                <div className="m3s-fx-calculator">
                <a className="m3s-fx-comparison-link" href={`${location.pathname}${location.search}#finance-transfer-comparison`}>{language === 'DE' ? 'Überweisungen vergleichen' : language === 'EN' ? 'Compare transfers' : 'Comparer les transferts'} →</a>
                <section>
                  <h3 className="text-white font-bold mb-5 flex items-center gap-2"><SlidersHorizontal size={18} className="text-blue-400" /> {t.parametresConversion}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="text-sm text-slate-300">
                      <span className="block mb-1">{t.montant}</span>
                      <input type="number" min="0" step="any" value={converterAmount} onChange={(event) => { setConverterAmount(event.target.value); setConversionResult(null); }} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                    </label>
                    <label className="text-sm text-slate-300">
                      <span className="block mb-1">{t.direction}</span>
                      <select value={converterDirection} onChange={(event) => { setConverterDirection(event.target.value); setConversionResult(null); }} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                        <option value="CHF_CFA">CHF → CFA</option>
                        <option value="CFA_CHF">CFA → CHF</option>
                      </select>
                    </label>
                  </div>
                  <label className="block text-sm text-slate-300 mt-4">
                    <span className="block mb-1">{t.dateReference}</span>
                    <LocalizedDateInput value={converterDate} onChange={(date) => { setConverterDate(date); setConversionResult(null); }} className="w-full" />
                  </label>
                  <div className="m3s-fx-reference mt-4 px-4 py-3 border border-slate-600 rounded">
                    <p className="text-xs text-slate-400">{t.tauxApplique}</p>
                    <p className="font-semibold m3s-currency-cfa">{converterRate ? `1 CHF = ${Number(converterRate).toLocaleString(undefined, { maximumFractionDigits: 4 })} CFA` : t.aucunTauxDate}</p>
                  </div>
                  <button onClick={calculateConversion} disabled={!converterRate || converterInputValue < 0} className="w-full mt-4 flex min-h-11 items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50">
                    <Calculator size={18} /> {t.calculer}
                  </button>
                  <details className="mt-6 border-t border-slate-700 pt-5">
                    <summary className="text-white font-semibold mb-3 cursor-pointer">{t.conversionsRapides}</summary>
                    <div className="space-y-2">
                      {(converterDirection === 'CHF_CFA' ? [100, 500, 1000, 5000, 10000] : [100000, 500000, 1000000, 5000000]).map((amount) => {
                        const output = converterRate ? (converterDirection === 'CHF_CFA' ? amount * converterRate : amount / converterRate) : null;
                        return (
                          <button key={amount} onClick={() => { setConverterAmount(String(amount)); setConversionResult(null); }} className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm py-1.5 hover:bg-slate-700/50 rounded px-2">
                            <span className="text-left text-white font-medium">{formatConvertedValue(amount, converterInputCurrency)} {converterInputCurrency}</span>
                            <span className="text-slate-500">→</span>
                            <span className="text-right text-orange-300 font-medium">{formatConvertedValue(output, converterOutputCurrency)} {converterOutputCurrency}</span>
                          </button>
                        );
                      })}
                    </div>
                  </details>
                </section>

                <div className="space-y-5">
                  <section className="m3s-fx-result">
                    <p className="text-sm text-slate-400">{t.conversionResultat}</p>
                    <div className="m3s-fx-amounts">
                      <span style={{ color: converterInputCurrency === 'CFA' ? 'var(--m3s-currency-cfa)' : 'var(--m3s-status-info)' }}>{formatConvertedValue(converterInputValue, converterInputCurrency)} {converterInputCurrency}</span>
                      <span aria-hidden="true">≈</span>
                      <span style={{ color: converterOutputCurrency === 'CFA' ? 'var(--m3s-currency-cfa)' : 'var(--m3s-status-info)' }}>{formatConvertedValue(displayedConverterOutput, converterOutputCurrency)} {converterOutputCurrency}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">1 CHF = {converterRate ? Number(converterRate).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '-'} CFA</p>
                  </section>
                  <section className="border-t border-slate-700 pt-5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><History size={18} className="text-orange-400" /> {t.conversionsRecentes}</h3>
                    {recentConversions.length === 0 ? (
                      <p className="text-sm text-slate-400">-</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                          <thead className="text-slate-400 border-b border-slate-700"><tr><th className="text-left py-2">{t.heure}</th><th className="text-left py-2">{t.montant}</th><th className="text-left py-2">{t.resultat}</th><th className="text-right py-2">{t.taux}</th></tr></thead>
                          <tbody>{recentConversions.map((entry) => <tr key={entry.id} className="border-b border-slate-700/60"><td className="py-2 text-slate-400">{entry.time}</td><td className="py-2 text-white">{formatConvertedValue(entry.amount, entry.inputCurrency)} {entry.inputCurrency}</td><td className="py-2 text-orange-300">{formatConvertedValue(entry.output, entry.outputCurrency)} {entry.outputCurrency}</td><td className="py-2 text-right text-slate-400">{Number(entry.rate).toLocaleString(undefined, { maximumFractionDigits: 4 })}</td></tr>)}</tbody>
                        </table>
                      </div>
                    )}
                  </section>
                </div>
                </div>
                <FinanceTransferComparison language={language} value={transferComparison} onChange={setTransferComparison} />
              </div>
            )}

            {fxView === 'dashboard' && (
              <section id="finance-fx-dashboard" className="min-h-[calc(100dvh-12rem)] bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-white font-bold mb-4">{t.historiqueTaux}</h3>
                <ResponsiveContainer width="100%" height={380}>
                  <LineChart data={fxYearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="année" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Line type="monotone" dataKey="Taux Moyen" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            )}

            {fxView === 'history' && (
              <div id="finance-fx-history" className="min-h-[calc(100dvh-12rem)]">
                <div className="mb-4 flex flex-wrap justify-end gap-4">
                  <select value={filterDevise} onChange={(e) => setFilterDevise(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option value="">{t.filtreDevise}</option><option value="CHF">CHF</option><option value="CFA">CFA</option><option value="USD">USD</option><option value="EUR">EUR</option>
                  </select>
                  <StandardCreateButton onClick={openNewFxModal}>{t.nouveauTaux}</StandardCreateButton>
                </div>
                <TableControls rows={filteredFxHistory} renderTable={(visibleRows) => (
                  <table className="min-w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-slate-700"><tr><th className="px-4 py-3 text-left text-white font-bold">{t.id}</th><th className="px-4 py-3 text-left text-white font-bold">{t.date}</th><th className="px-4 py-3 text-left text-white font-bold">{t.deviseBase}</th><th className="px-4 py-3 text-left text-white font-bold">{t.deviseCible}</th><th className="px-4 py-3 text-left text-white font-bold">{t.taux}</th><th className="px-4 py-3 text-left text-white font-bold">{t.source}</th><th className="px-4 py-3 text-left text-white font-bold">{t.actions}</th></tr></thead>
                    <tbody>{visibleRows.map(fx => <tr key={fx.id} className="border-t border-slate-700 hover:bg-slate-700/50"><td className="px-4 py-3 text-slate-300 text-xs">{fx.id}</td><td className="px-4 py-3 text-slate-300 whitespace-nowrap">{fx.date ? formatDateForDisplay(fx.date) : '—'}</td><td className="px-4 py-3 text-blue-400 font-bold">{fx.devise_from}</td><td className="px-4 py-3 text-green-400 font-bold">{fx.devise_to}</td><td className="px-4 py-3 text-purple-400 font-bold">{parseFloat(fx.rate).toLocaleString(undefined, { maximumFractionDigits: fx.rate < 1 ? 6 : 2 })}</td><td className="px-4 py-3 text-slate-400">{fx.source}</td><td className="px-4 py-3 flex gap-2"><button onClick={() => handleFxEdit(fx)} className="p-1 hover:bg-slate-600 rounded"><Edit2 size={16} className="text-blue-400" /></button><button onClick={() => handleFxDelete(fx.id, `${fx.devise_from} → ${fx.devise_to}`)} className="p-1 hover:bg-slate-600 rounded"><Trash2 size={16} className="text-red-400" /></button></td></tr>)}</tbody>
                  </table>
                )} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'social' && (
          <div id="finance-social" className="scroll-mt-24 space-y-6" tabIndex="-1">
            <section className="flex flex-col gap-4 border-b border-slate-700 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Heart size={22} />
                  </span>
                  <h3 className="text-xl font-bold text-white">{t.socialTitle}</h3>
                </div>
                <p className="max-w-3xl text-sm text-slate-400">{t.socialSubtitle}</p>
              </div>
              {socialAccessState === 'available' && (
                <StandardCreateButton onClick={openNewSocialModal}>{t.nouveauFluxSocial}</StandardCreateButton>
              )}
            </section>

            {socialAccessState !== 'available' ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-8 text-center" role="status">
                {socialAccessState === 'loading' ? (
                  <LoaderCircle size={36} className="mx-auto mb-3 animate-spin text-amber-300" />
                ) : (
                  <AlertTriangle size={36} className="mx-auto mb-3 text-amber-300" />
                )}
                <p className="font-semibold text-white">
                  {socialAccessState === 'forbidden' ? t.restrictedAccessTitle : t.sourceUnavailable}
                </p>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
                  {socialAccessState === 'loading'
                    ? t.sourceLoading
                    : socialAccessState === 'forbidden'
                      ? `${t.socialRestrictedAccess} ${t.restrictedNoSubstitute}`
                      : `${socialError || t.sourceUnavailable} ${t.missingNotZero}`}
                </p>
              </div>
            ) : (
              <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-emerald-500/60">
                <p className="text-sm font-medium text-emerald-400">{t.socialTitle}</p>
                <p className="mt-2 text-2xl font-bold text-white">{Number.isFinite(socialTotalChf) ? socialTotalChf.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'} CHF</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-cyan-500/60">
                <p className="text-sm font-medium text-cyan-400">{t.socialHistoricalCfa}</p>
                <p className="mt-2 text-2xl font-bold text-white">{Number.isFinite(socialTotalCfaHistorique) ? Math.round(socialTotalCfaHistorique).toLocaleString() : '—'} CFA</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/60">
                <p className="text-sm font-medium text-blue-400">{t.socialCurrentCfa}</p>
                <p className="mt-2 text-2xl font-bold text-white">{Number.isFinite(socialTotalCfaActuel) ? Math.round(socialTotalCfaActuel).toLocaleString() : '—'} CFA</p>
                <p className="mt-1 text-xs text-slate-500">1 CHF = {tauxChfCfa ? Number(tauxChfCfa).toLocaleString() : '-'} CFA</p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 transition hover:-translate-y-0.5 hover:border-violet-500/60">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-violet-400">{t.socialOperations}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{socialRowsAffichees.length}</p>
                    <p className="mt-1 text-xs text-slate-500">{t.socialPeriod}: {socialFirstYear || '-'} - {socialLastYear || '-'}</p>
                  </div>
                  <UsersRound size={24} className="text-violet-400" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-5 py-4 text-sm text-amber-100">
              {t.socialNotice}
              {socialError && <span className="ml-2 text-slate-400">({socialError})</span>}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <h4 className="mb-4 font-bold text-white">{t.socialAnnualChf}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={socialAnnualData} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                    <XAxis dataKey="annee" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={54} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} CHF`, t.socialTitle]} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                    <Bar dataKey="montantChf" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={42} />
                  </BarChart>
                </ResponsiveContainer>
              </section>
              <section className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                <h4 className="mb-4 font-bold text-white">{t.socialAnnualCfa}</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={socialAnnualData} margin={{ top: 12, right: 12, left: 12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                    <XAxis dataKey="annee" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={62} tickFormatter={(value) => `${(value / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`} />
                    <Tooltip formatter={(value) => [`${Math.round(Number(value)).toLocaleString()} CFA`, t.socialHistoricalCfa]} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                    <Bar dataKey="montantCfa" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={42} />
                  </BarChart>
                </ResponsiveContainer>
              </section>
            </div>

            {renderFxQualityNotice(socialRowsAffichees)}
            <section>
              <TableControls
                rows={socialRowsAffichees}
                defaultPageSize={10}
                maxHeight="34rem"
                renderTable={(visibleRows) => (
                  <table className="min-w-[1900px] text-sm">
                    <thead className="sticky top-0 z-10 bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.ref}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.date}</th>
                        <th className="px-5 py-3 text-left font-bold text-white">{t.description}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.montantCHF}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.montantCFA}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.tauxFXCol}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.socialNature}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.beneficiaire}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.agent}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.team}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.departement}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.pays}</th>
                        <th className="px-4 py-3 text-left font-bold text-white">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.map((row) => (
                        <tr key={row.id} onClick={() => handleEdit('recette', row)} onKeyDown={(event) => event.target === event.currentTarget && event.key === 'Enter' && handleEdit('recette', row)} tabIndex={0} className="cursor-pointer border-t border-slate-700 hover:bg-slate-700/50 focus:bg-slate-700/70 focus:outline-none">
                          <td className="px-4 py-3 text-slate-400">{formatCell(row.ref)}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-300">{formatDateForDisplay(row.date)}</td>
                          <td className="max-w-[380px] px-5 py-3 font-medium text-white">{translateDescription(row.description)}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-emerald-300">{row.montantChfAvailable ? `${formatAmount(row.montantChf)} CHF` : '—'}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-semibold text-cyan-300">{row.montantCfaAvailable ? `${formatAmount(row.montantCfa)} CFA` : '—'}</td>
                          <td className="px-4 py-3 text-purple-300">
                            {row.hasExplicitTauxFx
                              ? Number(row.tauxFx).toLocaleString(undefined, { maximumFractionDigits: 3 })
                              : <span className="font-semibold text-amber-300">{t.fxRateMissing}</span>}
                          </td>
                          <td className="px-4 py-3"><span className="inline-flex whitespace-nowrap rounded bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">{translateStandardValue(row.natureSociale)}</span></td>
                          <td className="px-4 py-3 text-slate-300">{formatCell(row.beneficiaire)}</td>
                          <td className="px-4 py-3 text-slate-300">{formatCell(row.agent)}</td>
                          <td className="px-4 py-3 text-slate-300">{translateStandardValue(row.team)}</td>
                          <td className="px-4 py-3 text-slate-300">{translateStandardValue(row.departement)}</td>
                          <td className="px-4 py-3 text-slate-300">{formatCell(row.pays)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button type="button" title={t.modifier} aria-label={`${t.modifier} : ${row.ref}`} onClick={(event) => { event.stopPropagation(); handleEdit('recette', row); }} className="m3s-icon-button hover:bg-slate-600"><Edit2 size={17} className="text-blue-400" /></button>
                              <button type="button" title={t.supprimer} aria-label={`${t.supprimer} : ${row.ref}`} onClick={(event) => { event.stopPropagation(); handleDelete('recette', row.id, row.description); }} className="m3s-icon-button hover:bg-slate-600"><Trash2 size={17} className="text-red-400" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              />
            </section>
              </>
            )}
          </div>
        )}

        {activeTab === 'immobilier' && (
          <div id="finance-real-estate" className="scroll-mt-24 space-y-6" tabIndex="-1">
            {immoAccessState !== 'available' ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-8 text-center" role="status">
                {immoAccessState === 'loading' ? (
                  <LoaderCircle size={36} className="mx-auto mb-3 animate-spin text-amber-300" />
                ) : (
                  <AlertTriangle size={36} className="mx-auto mb-3 text-amber-300" />
                )}
                <p className="font-semibold text-white">
                  {immoAccessState === 'forbidden' ? t.restrictedAccessTitle : t.sourceUnavailable}
                </p>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
                  {immoAccessState === 'loading'
                    ? t.sourceLoading
                    : immoAccessState === 'forbidden'
                      ? `${t.immoRestrictedAccess} ${t.restrictedNoSubstitute}`
                      : `${immoError || t.sourceUnavailable} ${t.missingNotZero}`}
                </p>
              </div>
            ) : immoTransactions.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
                <Building2 size={36} className="mx-auto mb-3 text-orange-400" />
                <p className="text-white font-semibold">{t.aucuneDonneeImmo}</p>
                <div className="mt-4 flex justify-center">
                  <StandardCreateButton onClick={openNewImmoModal}>{t.nouvelleOperationImmo}</StandardCreateButton>
                </div>
                {immoError && <p className="mt-2 text-sm text-slate-400">{immoError}</p>}
              </div>
            ) : (
              <>
                <section className="bg-slate-800 border border-slate-700 rounded-lg px-5 py-4 transition-shadow duration-200 hover:shadow-lg">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <Building2 size={26} className="text-orange-400 mt-1 shrink-0" />
                      <div>
                        <h2 className="text-lg font-bold text-white">{t.immoTitle}</h2>
                        <p className="text-sm text-slate-400">{t.immoSubtitle}</p>
                        <FinanceTransactionCount count={immoTransactions.length} state={immoAccessState} scope="registry" language={language} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 shrink-0">
                      <div className="rounded-md px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                        <p className="text-xs uppercase text-slate-400">{t.totalInvesti}</p>
                        <p className="text-2xl font-bold text-cyan-300 whitespace-nowrap">{formatOptionalAmount(immoInvestiChf)} CHF</p>
                      </div>
                      <div className="rounded-md px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                        <p className="text-xs uppercase text-slate-400">{t.montantsHistoriques}</p>
                        <p className="text-2xl font-bold m3s-currency-cfa whitespace-nowrap">{formatOptionalAmount(immoInvestiCfa)} CFA</p>
                      </div>
                    </div>
                  </div>
                  {immoEquivalentTauxJour !== null && (
                    <p className="text-xs text-slate-400 mt-1 text-right">≈ {formatAmount(immoEquivalentTauxJour)} CFA · {t.equivalentTauxJour}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-slate-700 mt-3 xl:divide-x divide-slate-700">
                    <div className="py-3 xl:pr-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.remboursementsDirects}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatOptionalAmount(immoRemboursementsDirects)} CHF</p>
                        <p className="text-xl font-bold m3s-currency-cfa whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoRemboursementsDirects)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:px-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.remboursementsTotal}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatOptionalAmount(immoRemboursementsTotal)} CHF</p>
                        <p className="text-xl font-bold m3s-currency-cfa whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoRemboursementsTotal)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:px-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.soldeOuvert}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatOptionalAmount(immoSoldeOuvert)} CHF</p>
                        <p className="text-xl font-bold m3s-currency-cfa whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoSoldeOuvert)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:pl-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.partCheikh}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatOptionalAmount(immoPartCheikh)} CHF</p>
                        <p className="text-xl font-bold m3s-currency-cfa whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoPartCheikh)} CFA</p>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <section className="bg-slate-800 rounded-lg p-5 border border-slate-700 min-w-0">
                    <h3 className="text-white font-bold mb-3">{t.investissementsAnnee} (CHF)</h3>
                    <ResponsiveContainer width="100%" height={245}>
                      <BarChart data={immoYearlyData} margin={{ top: 8, right: 10, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                        <XAxis dataKey="annee" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={52} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} formatter={(value) => [`${formatAmount(value)} CHF`, t.totalInvesti]} />
                        <Bar dataKey="montantChf" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={44} />
                      </BarChart>
                    </ResponsiveContainer>
                  </section>

                  <section className="bg-slate-800 rounded-lg p-5 border border-slate-700 min-w-0">
                    <h3 className="text-white font-bold mb-3">{t.investissementsAnnee} (CFA)</h3>
                    <ResponsiveContainer width="100%" height={245}>
                      <BarChart data={immoYearlyData} margin={{ top: 8, right: 10, left: 12, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 6" stroke="#7180a0" vertical={false} />
                        <XAxis dataKey="annee" stroke="#94a3b8" tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={66} tickFormatter={(value) => `${Math.round(value / 1000000)}M`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} formatter={(value) => [`${formatAmount(value)} CFA`, t.totalInvesti]} />
                        <Bar dataKey="montantCfa" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={44} />
                      </BarChart>
                    </ResponsiveContainer>
                  </section>
                </div>

                <section className="bg-slate-800 rounded-lg p-6 border border-slate-700 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <h3 className="text-white font-bold">{t.historiqueImmo}</h3>
                      <StandardCreateButton onClick={openNewImmoModal}>{t.nouvelleOperationImmo}</StandardCreateButton>
                    </div>
                    <TableControls
                      rows={immoTransactions}
                      renderTable={(visibleRows) => (
                        <table className="min-w-[2400px] text-sm">
                          <thead className="sticky top-0 z-10 bg-slate-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.ref}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.date}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.designation}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.montantCHF}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.montantCFA}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.tauxFXCol}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.partCheikh}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.remboursementCheikh}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.categorie}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.agent}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.team}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.departement}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.phaseProjet}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.typeOperation}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.projet}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.statut}</th>
                              <th className="px-4 py-3 text-left text-white font-bold">{t.actions}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleRows.map((item) => (
                              <tr
                                key={item.id}
                                onClick={() => handleImmoEdit(item)}
                                onKeyDown={(event) => event.target === event.currentTarget && event.key === 'Enter' && handleImmoEdit(item)}
                                tabIndex={0}
                                className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                              >
                                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.id}</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatDateForDisplay(item.date)}</td>
                                <td className="px-4 py-3 text-white font-medium max-w-[360px]">{item.designation}</td>
                                <td className="px-4 py-3 text-orange-300 font-semibold whitespace-nowrap">{formatOptionalAmount(item.montantChf)} CHF</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatOptionalAmount(item.montantCfa)} CFA</td>
                                <td className="px-4 py-3 text-purple-300">{item.tauxFx !== null ? item.tauxFx.toLocaleString(undefined, { maximumFractionDigits: 3 }) : '—'}</td>
                                <td className="px-4 py-3 text-blue-300 whitespace-nowrap">{formatOptionalAmount(item.partCheikhChf)} CHF</td>
                                <td className="px-4 py-3 text-green-300 whitespace-nowrap">{formatOptionalAmount(item.remboursementCheikhChf)} CHF</td>
                                <td className="px-4 py-3 text-slate-300">{translateCategory(item.categorie)}</td>
                                <td className="px-4 py-3 text-slate-300">{formatCell(item.agent)}</td>
                                <td className="px-4 py-3 text-slate-300">{translateStandardValue(item.team)}</td>
                                <td className="px-4 py-3 text-slate-300">{translateStandardValue(item.departement)}</td>
                                <td className="px-4 py-3 text-slate-300">{translateStandardValue(item.phase_projet)}</td>
                                <td className="px-4 py-3 text-slate-300">{translateStandardValue(item.type_operation)}</td>
                                <td className="px-4 py-3 text-slate-300">{translateStandardValue(item.projet)}</td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${immoStatusClass(item.statut)}`}>
                                    {translateStandardValue(item.statut)}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button type="button" title={t.modifier} aria-label={`${t.modifier} : ${item.id}`} onClick={(event) => { event.stopPropagation(); handleImmoEdit(item); }} className="m3s-icon-button hover:bg-slate-600">
                                      <Edit2 size={17} className="text-blue-400" />
                                    </button>
                                    <button type="button" title={t.supprimer} aria-label={`${t.supprimer} : ${item.id}`} onClick={(event) => { event.stopPropagation(); handleImmoDelete(item.id, item.designation); }} className="m3s-icon-button hover:bg-slate-600">
                                      <Trash2 size={17} className="text-red-400" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    />
                </section>
              </>
            )}
          </div>
        )}

        {activeTab === 'resources' && <FunctionResourcesOverview moduleId="finances" language={language} onSelectTab={selectFinanceTab} />}

        {activeTab === 'assistant' && <FunctionAssistant moduleId="finances" language={language} />}

        {activeTab === 'glossary' && <FinanceGlossary language={language} />}

        <ChildTabPlaceholder moduleId="finances" language={language} activeTab={activeTab} handledTabs={['overview', 'architecture', 'processes', 'recettes', 'depenses', 'fx', 'social', 'immobilier', 'assistant', 'resources', 'glossary']} />

        {showImmoModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <h2 className="text-white text-xl font-bold mb-5">{editingImmoId ? t.modifierOperationImmo : t.nouvelleOperationImmo}</h2>
              {immoFormError && (
                <p id="immo-form-error" ref={immoFormErrorRef} tabIndex={-1} role="alert" className="text-sm text-amber-300 mb-4">
                  {immoFormError === 'required' ? t.immoRequiredError : t.immoSaveError}
                </p>
              )}
              {invalidImmoAmounts.length > 0 && (
                <p id="immo-amounts-error" role="alert" className="text-sm text-amber-300 mb-4">
                  {t.immoAmountsError.replace('{fields}', invalidImmoAmounts.map(([, label]) => label).join(', '))}
                </p>
              )}
              {immoRateInvalid && (
                <p id="immo-rate-error" role="alert" className="text-sm text-amber-300 mb-4">{t.immoRateError}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="lg:col-span-2 text-sm text-slate-300">
                  <span className="block mb-1">{t.designation}</span>
                  <input type="text" aria-required="true" aria-invalid={immoFormError === 'required' && !immoFormData.designation.trim()} aria-describedby={immoFormError === 'required' ? 'immo-form-error' : undefined} value={immoFormData.designation} onChange={(event) => handleImmoFormChange('designation', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.date}</span>
                  <LocalizedDateInput value={immoFormData.date} onChange={(date) => handleImmoFormChange('date', date)} className="w-full" />
                </label>

                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.montantCHF}</span>
                  <input type="number" step="any" {...immoAmountValidation('montantChf')} value={immoFormData.montantChf} onChange={(event) => handleImmoFormChange('montantChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.montantCFA}</span>
                  <input type="number" step="any" {...immoAmountValidation('montantCfa')} value={immoFormData.montantCfa} onChange={(event) => handleImmoFormChange('montantCfa', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.tauxFXCol}</span>
                  <input type="number" step="any" aria-invalid={immoRateInvalid} aria-describedby={immoRateInvalid ? 'immo-rate-error' : undefined} value={immoFormData.tauxFx} onChange={(event) => handleImmoFormChange('tauxFx', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.partCheikh}</span>
                  <input type="number" step="any" {...immoAmountValidation('partCheikhChf')} value={immoFormData.partCheikhChf} onChange={(event) => handleImmoFormChange('partCheikhChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.remboursementCheikh}</span>
                  <input type="number" step="any" {...immoAmountValidation('remboursementCheikhChf')} value={immoFormData.remboursementCheikhChf} onChange={(event) => handleImmoFormChange('remboursementCheikhChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <FinanceAmountPair {...immoAmountPair} label={immoPairCalculated ? t.amountPreview : t.enteredAmounts} language={language} approximate={immoPairCalculated} testId="immo-form-amount-pair" />
                  <FinanceAmountPair {...convertFinanceAmount(immoFormData.partCheikhChf, 'CHF', immoPreviewRate)} label={`${t.partCheikh} · ${t.amountPreview}`} language={language} testId="immo-form-share-pair" />
                  <FinanceAmountPair {...convertFinanceAmount(immoFormData.remboursementCheikhChf, 'CHF', immoPreviewRate)} label={`${t.remboursementCheikh} · ${t.amountPreview}`} language={language} testId="immo-form-repayment-pair" />
                </div>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.categorie}</span>
                  <select value={immoFormData.categorie} onChange={(event) => handleImmoFormChange('categorie', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    {immoCategoryOptions.map((category) => <option key={category} value={category}>{translateCategory(category)}</option>)}
                  </select>
                </label>

                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.typeOperation}</span>
                  <select value={immoFormData.typeOperation} onChange={(event) => handleImmoFormChange('typeOperation', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    {['Avance', 'Remboursement', 'Ajustement', 'Information', 'Report'].map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.perimetre}</span>
                  <select value={immoFormData.perimetre} onChange={(event) => handleImmoFormChange('perimetre', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    {['Immobilier', 'Personnel'].map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.projet}</span>
                  <select value={immoFormData.projet} onChange={(event) => handleImmoFormChange('projet', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    {['Terrain Lac Rose', 'Terrains Diass', 'Hors périmètre IMMO'].map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.statut}</span>
                  <select value={immoFormData.statut} onChange={(event) => handleImmoFormChange('statut', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    {['En cours', 'Partiel', 'Remboursé', 'Payé', 'Reporté', 'Planifié', 'Info'].map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.team}</span>
                  <select aria-label={t.team} value={immoFormData.team} onChange={(event) => handleImmoFormChange('team', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {TEAM_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.agent}</span>
                  <select aria-label={t.agent} value={immoFormData.agent} onChange={(event) => handleImmoFormChange('agent', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {immoAgentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>
                <p
                  className={`text-xs leading-5 md:col-span-2 ${agentDirectoryStatus === 'available' ? 'text-emerald-300' : 'text-amber-300'}`}
                  role="status"
                >
                  {agentDirectoryStatus === 'loading'
                    ? t.agentSourceLoading
                    : agentDirectoryStatus === 'available'
                      ? t.agentSourceAvailable
                      : t.agentSourceUnavailable}
                </p>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.departement}</span>
                  <select value={immoFormData.departement} onChange={(event) => handleImmoFormChange('departement', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {DEPARTMENT_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.phaseProjet}</span>
                  <select value={immoFormData.phaseProjet} onChange={(event) => handleImmoFormChange('phaseProjet', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {PROJECT_PHASE_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                  </select>
                </label>
                <label className="md:col-span-2 text-sm text-slate-300">
                  <span className="block mb-1">{t.documentRef}</span>
                  <input type="text" value={immoFormData.documentRef} onChange={(event) => handleImmoFormChange('documentRef', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowImmoModal(false)} disabled={savingImmo} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50">{t.annuler}</button>
                <button onClick={handleImmoSave} disabled={savingImmo || immoSaveInvalid} className={`${editingImmoId ? 'm3s-primary-button' : 'm3s-success-button'} min-h-11 px-4 disabled:opacity-50 disabled:cursor-not-allowed`}>{t.enregistrer}</button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
              <h2 className="text-white font-bold mb-4">
                {socialModal
                  ? (editingId ? t.modifierFluxSocial : t.nouveauFluxSocial)
                  : (editingId ? (modalType === 'recette' ? t.modifierRecette : t.modifierDepense) : (modalType === 'recette' ? t.creerRecette : t.creerDepense))}
              </h2>
              {financeFormError && (
                <p id="finance-form-error" ref={financeFormErrorRef} tabIndex={-1} role="alert" className="mb-4 text-sm" style={{ color: 'var(--m3s-status-warning)' }}>
                  {t.financeRequiredError}
                </p>
              )}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t.description}
                  aria-label={t.description}
                  aria-required="true"
                  aria-invalid={financeFormError && financeDescriptionInvalid}
                  aria-describedby={financeFormError && financeDescriptionInvalid ? 'finance-form-error' : undefined}
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <input
                  type="number"
                  step="any"
                  placeholder={t.montant}
                  aria-label={t.montant}
                  aria-required="true"
                  aria-invalid={financeFormError && financeAmountInvalid}
                  aria-describedby={financeFormError && financeAmountInvalid ? 'finance-form-error' : undefined}
                  value={formData.montant}
                  onChange={(e) => handleFormChange('montant', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <select aria-label={t.devise} value={formData.devise} onChange={(e) => handleFormChange('devise', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CHF</option>
                  <option>CFA</option>
                </select>
                <FinanceAmountPair {...financeAmountPair} label={t.amountPreview} language={language} testId="finance-form-amount-pair" />
                <select
                  value={formData.categorie}
                  onChange={(e) => handleFormChange('categorie', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="">{t.choisirCategorie}</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>{translateCategory(category)}</option>
                  ))}
                </select>
                <LocalizedDateInput
                  value={formData.date}
                  onChange={handleFinanceDateChange}
                  className="w-full"
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="text-sm text-slate-300">
                    <span className="mb-1 block">{t.tauxReference}</span>
                    <output className="block min-h-11 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-slate-200">
                      {getHistoricalCfaPerChf(formData.date)?.cfaPerChf
                        ? `${formatAmount(getHistoricalCfaPerChf(formData.date).cfaPerChf)} CFA / CHF`
                        : t.tauxReferenceIndisponible}
                    </output>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="mb-1 block">{t.tauxApplique} *</span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      required
                      value={formData.tauxFxApplique}
                      aria-invalid={appliedRateInvalid}
                      aria-describedby={appliedRateInvalid ? 'finance-applied-rate-error' : undefined}
                      onChange={(event) => handleFormChange('tauxFxApplique', event.target.value)}
                      className="min-h-11 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white"
                    />
                  </label>
                </div>
                <p className="text-sm text-slate-300">{t.separationTauxInfo}</p>
                {appliedRateInvalid && (
                  <p id="finance-applied-rate-error" role="alert" className="text-sm text-amber-300">{t.appliedRateError}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.team}</span>
                    <select aria-label={t.team} value={formData.team || ''} onChange={(e) => handleFormChange('team', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {TEAM_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.agent}</span>
                    <select aria-label={t.agent} value={formData.agent || ''} onChange={(e) => handleFormChange('agent', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {financeAgentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </label>
                  <p
                    className={`text-xs leading-5 md:col-span-2 ${agentDirectoryStatus === 'available' ? 'text-emerald-300' : 'text-amber-300'}`}
                    role="status"
                  >
                    {agentDirectoryStatus === 'loading'
                      ? t.agentSourceLoading
                      : agentDirectoryStatus === 'available'
                        ? t.agentSourceAvailable
                        : t.agentSourceUnavailable}
                  </p>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.departement}</span>
                    <select value={formData.departement || ''} onChange={(e) => handleFormChange('departement', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {DEPARTMENT_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.phaseProjet}</span>
                    <select value={formData.phaseProjet || ''} onChange={(e) => handleFormChange('phaseProjet', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {PROJECT_PHASE_OPTIONS.map((value) => <option key={value} value={value}>{translateStandardValue(value)}</option>)}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.pays}</span>
                    <select value={formData.pays || ''} onChange={(e) => handleFormChange('pays', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {COUNTRY_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </label>
                </div>
                <div className="flex gap-4 justify-end">
                  <button onClick={() => { setShowModal(false); setSocialModal(false); }} disabled={savingFinance} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50">{t.annuler}</button>
                  <button onClick={handleSave} disabled={savingFinance || appliedRateInvalid} className={`${editingId ? 'm3s-primary-button' : 'm3s-success-button'} min-h-11 px-4`}>{editingId ? t.enregistrer : t.creer}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showFxModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3" aria-hidden={pendingAction ? 'true' : undefined}>
            <div role="dialog" aria-modal="true" aria-labelledby="finance-fx-form-title" className="bg-slate-800 rounded-lg p-5 max-w-md w-full max-h-[calc(100dvh-1.5rem)] overflow-y-auto border border-slate-700">
              <h2 id="finance-fx-form-title" className="text-white font-bold mb-2">{editingFxId ? t.modifierTaux : t.nouveauTaux}</h2>
              <p className="mb-4 text-sm text-slate-300">{t.fxSessionOnly}</p>
              <div className="space-y-4">
                <label className="block text-sm text-slate-300">
                <span className="mb-1 block">{t.deviseBase} *</span>
                <select aria-label={`${t.deviseBase} *`} aria-required="true" aria-invalid={fxPairInvalid} aria-describedby={fxPairInvalid ? 'finance-fx-form-rule' : undefined} value={fxFormData.devise_from} onChange={(e) => handleFxFormChange('devise_from', e.target.value)} className="w-full min-h-11 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CHF</option>
                  <option>CFA</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                </label>
                <label className="block text-sm text-slate-300">
                <span className="mb-1 block">{t.deviseCible} *</span>
                <select aria-label={`${t.deviseCible} *`} aria-required="true" aria-invalid={fxPairInvalid} aria-describedby={fxPairInvalid ? 'finance-fx-form-rule' : undefined} value={fxFormData.devise_to} onChange={(e) => handleFxFormChange('devise_to', e.target.value)} className="w-full min-h-11 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CFA</option>
                  <option>CHF</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                </label>
                <label className="block text-sm text-slate-300">
                <span className="mb-1 block">{t.taux} *</span>
                <input
                  type="number"
                  step="any"
                  aria-required="true"
                  aria-invalid={fxRateInvalid}
                  aria-describedby={fxRateInvalid ? 'finance-fx-form-rule' : undefined}
                  placeholder={t.taux}
                  value={fxFormData.rate}
                  onChange={(e) => handleFxFormChange('rate', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                </label>
                <div>
                <p className="mb-1 text-sm text-slate-300">{t.date} *</p>
                <LocalizedDateInput
                  value={fxFormData.date}
                  onChange={(date) => handleFxFormChange('date', date)}
                  className="w-full"
                />
                </div>
                <label className="block text-sm text-slate-300">
                <span className="mb-1 block">{t.source}</span>
                <input
                  type="text"
                  placeholder={t.source}
                  value={fxFormData.source}
                  onChange={(e) => handleFxFormChange('source', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                </label>
                <div aria-live="polite">
                  {fxFormInvalid && <p id="finance-fx-form-rule" data-testid="finance-fx-form-rule" className="text-sm" style={{ color: 'var(--m3s-status-warning)' }}>{t.fxFormRule}</p>}
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  <button onClick={() => setShowFxModal(false)} className="min-h-11 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">{t.annuler}</button>
                  <button onClick={handleFxSave} disabled={fxFormInvalid} className={`${editingFxId ? 'm3s-primary-button' : 'm3s-success-button'} min-h-11 px-4 disabled:opacity-50 disabled:cursor-not-allowed`}>{editingFxId ? t.enregistrer : t.creer}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {pendingAction && confirmation && (
          <ActionConfirmationDialog
            id="finance-action-confirmation"
            title={pendingAction.error ? t.actionUnconfirmed : confirmation.title}
            body={pendingAction.error ? pendingAction.label : withLabel(confirmation.body, pendingAction.label)}
            error={pendingAction.error ? t.actionUnconfirmedDetails : undefined}
            closeLabel={t.closeFeedback}
            cancelLabel={t.decline}
            confirmLabel={confirmation.confirm}
            action={pendingAction.action}
            busy={confirmingAction}
            onCancel={() => setPendingAction(null)}
            onConfirm={confirmPendingAction}
          />
        )}

        </div>
      </div>
    </>
  );
};

export default Finance;
