import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, TrendingDown, ArrowRightLeft, Building2, Calculator, BarChart3, History, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api'; // Phase 2: Aide API pour données BigQuery réelles
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';

const TEAM_OPTIONS = ['Team_ZH', 'Team_SN'];
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

const createEmptyFinanceForm = () => ({
  description: '',
  montant: '',
  devise: 'CHF',
  date: new Date().toISOString().split('T')[0],
  categorie: '',
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
  const [activeTab, setActiveTab] = useState('overview');
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [fxHistory, setFxHistory] = useState([]);
  const [immoTransactions, setImmoTransactions] = useState([]);
  const [immoSummary, setImmoSummary] = useState({});
  const [immoError, setImmoError] = useState('');
  const [showImmoModal, setShowImmoModal] = useState(false);
  const [editingImmoId, setEditingImmoId] = useState(null);
  const [immoFormData, setImmoFormData] = useState(createEmptyImmoForm);
  const [savingImmo, setSavingImmo] = useState(false);
  const [tauxDuJour, setTauxDuJour] = useState({});
  const [filterDevise, setFilterDevise] = useState('');
  const [fxView, setFxView] = useState('converter');
  const [converterAmount, setConverterAmount] = useState('1000');
  const [converterDirection, setConverterDirection] = useState('CHF_CFA');
  const [converterDate, setConverterDate] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [recentConversions, setRecentConversions] = useState([]);
  const [showFxModal, setShowFxModal] = useState(false);
  const [editingFxId, setEditingFxId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('recette');
  const [editingId, setEditingId] = useState(null);
  const [savingFinance, setSavingFinance] = useState(false);
  const [fxFormData, setFxFormData] = useState({
    devise_from: 'CHF',
    devise_to: 'CFA',
    rate: '',
    date: new Date().toISOString().split('T')[0],
    source: 'Manual'
  });
  const [formData, setFormData] = useState(createEmptyFinanceForm);

  // Translations
  const translations = {
    FR: {
      title: 'Finances',
      subtitle: 'Gestion des Recettes, Dépenses et Taux de Change',
      totalRecettes: 'Total Recettes',
      totalDepenses: 'Total Dépenses',
      soldeNet: 'Solde Net',
      tauxFX: 'Taux FX (CFA/CHF)',
      overview: 'Vue d\'ensemble',
      recettes: 'Recettes',
      depenses: 'Dépenses',
      fx: 'Historique FX',
      tendance: 'Tendance Recettes vs Dépenses',
      historiqueTaux: 'Historique Taux de Change (CFA/CHF)',
      moyenneAnnuelleFx: 'Taux moyen annuel - 1 CHF en CFA',
      nouvelleRecette: 'Nouvelle Recette',
      nouvelleDepense: 'Nouvelle Dépense',
      description: 'Description',
      montant: 'Montant',
      montantCHF: 'Montant CHF',
      montantCFA: 'Montant CFA',
      tauxFXCol: 'Taux FX',
      devise: 'Devise',
      categorie: 'Catégorie',
      choisirCategorie: 'Sélectionner une catégorie',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
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
      convertisseur: 'Convertisseur',
      tableauBordFx: 'Tableau de bord',
      tauxHistorique: 'Taux & Historique',
      parametresConversion: 'Paramètres de conversion',
      direction: 'Direction',
      dateReference: 'Date de référence (vide = taux du jour)',
      tauxApplique: 'Taux appliqué',
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
      remboursementsTotal: 'Remboursé Cheikh au total',
      soldeOuvert: 'Solde ouvert',
      partCheikh: 'Part Cheikh',
      investissementsAnnee: 'Investissements par année',
      historiqueImmo: 'Historique des transactions IMMO',
      typeOperation: 'Type opération',
      perimetre: 'Périmètre',
      projet: 'Projet',
      statut: 'Statut',
      aucuneDonneeImmo: 'Les données Fin Immo seront disponibles après l’import BigQuery.',
      nouvelleOperationImmo: 'Nouvelle opération Immo',
      modifierOperationImmo: 'Modifier l’opération Immo',
      designation: 'Désignation',
      documentRef: 'Document / Référence',
      remboursementCheikh: 'Remboursement Cheikh',
      enregistrer: 'Enregistrer',
      supprimerConfirmation: 'Supprimer définitivement cette opération Fin Immo ?'
    },
    EN: {
      title: 'Finance',
      subtitle: 'Revenue, Expense & Foreign Exchange Management',
      totalRecettes: 'Total Revenue',
      totalDepenses: 'Total Expenses',
      soldeNet: 'Net Balance',
      tauxFX: 'FX Rate (CFA/CHF)',
      overview: 'Overview',
      recettes: 'Revenue',
      depenses: 'Expenses',
      fx: 'FX History',
      tendance: 'Revenue vs Expense Trend',
      historiqueTaux: 'Exchange Rate History (CFA/CHF)',
      moyenneAnnuelleFx: 'Annual average rate - 1 CHF in CFA',
      nouvelleRecette: 'New Revenue',
      nouvelleDepense: 'New Expense',
      description: 'Description',
      montant: 'Amount',
      montantCHF: 'Amount CHF',
      montantCFA: 'Amount CFA',
      tauxFXCol: 'FX Rate',
      devise: 'Currency',
      categorie: 'Category',
      choisirCategorie: 'Select a category',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
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
      convertisseur: 'Converter',
      tableauBordFx: 'Dashboard',
      tauxHistorique: 'Rates & History',
      parametresConversion: 'Conversion settings',
      direction: 'Direction',
      dateReference: 'Reference date (blank = today’s rate)',
      tauxApplique: 'Applied rate',
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
      remboursementsTotal: 'Total reimbursed to Cheikh',
      soldeOuvert: 'Outstanding balance',
      partCheikh: 'Cheikh’s share',
      investissementsAnnee: 'Investments by year',
      historiqueImmo: 'IMMO transaction history',
      typeOperation: 'Operation type',
      perimetre: 'Scope',
      projet: 'Project',
      statut: 'Status',
      aucuneDonneeImmo: 'Real Estate Finance data will be available after the BigQuery import.',
      nouvelleOperationImmo: 'New real estate operation',
      modifierOperationImmo: 'Edit real estate operation',
      designation: 'Description',
      documentRef: 'Document / Reference',
      remboursementCheikh: 'Reimbursement to Cheikh',
      enregistrer: 'Save',
      supprimerConfirmation: 'Permanently delete this real estate operation?'
    },
    DE: {
      title: 'Finanzen',
      subtitle: 'Verwaltung von Einnahmen, Ausgaben und Wechselkursen',
      totalRecettes: 'Gesamteinnahmen',
      totalDepenses: 'Gesamtausgaben',
      soldeNet: 'Nettosaldo',
      tauxFX: 'Wechselkurs (CFA/CHF)',
      overview: 'Übersicht',
      recettes: 'Einnahmen',
      depenses: 'Ausgaben',
      fx: 'Wechselkurshistorie',
      tendance: 'Trend Einnahmen vs. Ausgaben',
      historiqueTaux: 'Wechselkurshistorie (CFA/CHF)',
      moyenneAnnuelleFx: 'Jahresdurchschnitt - 1 CHF in CFA',
      nouvelleRecette: 'Neue Einnahme',
      nouvelleDepense: 'Neue Ausgabe',
      description: 'Beschreibung',
      montant: 'Betrag',
      montantCHF: 'Betrag CHF',
      montantCFA: 'Betrag CFA',
      tauxFXCol: 'Wechselkurs',
      devise: 'Währung',
      categorie: 'Kategorie',
      choisirCategorie: 'Kategorie auswählen',
      ref: 'Ref.',
      agent: 'Agent',
      team: 'Team',
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
      convertisseur: 'Umrechner',
      tableauBordFx: 'Dashboard',
      tauxHistorique: 'Kurse & Verlauf',
      parametresConversion: 'Umrechnungseinstellungen',
      direction: 'Richtung',
      dateReference: 'Referenzdatum (leer = heutiger Kurs)',
      tauxApplique: 'Angewandter Kurs',
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
      remboursementsTotal: 'Insgesamt an Cheikh zurückgezahlt',
      soldeOuvert: 'Offener Saldo',
      partCheikh: 'Anteil Cheikh',
      investissementsAnnee: 'Investitionen pro Jahr',
      historiqueImmo: 'IMMO-Transaktionsverlauf',
      typeOperation: 'Vorgangsart',
      perimetre: 'Bereich',
      projet: 'Projekt',
      statut: 'Status',
      aucuneDonneeImmo: 'Die Daten zur Immobilienfinanzierung sind nach dem BigQuery-Import verfügbar.',
      nouvelleOperationImmo: 'Neuer Immobilienvorgang',
      modifierOperationImmo: 'Immobilienvorgang bearbeiten',
      designation: 'Bezeichnung',
      documentRef: 'Dokument / Referenz',
      remboursementCheikh: 'Rückzahlung an Cheikh',
      enregistrer: 'Speichern',
      supprimerConfirmation: 'Diesen Immobilienvorgang dauerhaft löschen?'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['overview', 'recettes', 'depenses', 'fx', 'budget', 'social', 'immobilier'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

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
    const rawTauxFx = item.taux_fx ?? item.taux ?? item.fx_rate;
    const rawAmount = item.montant_origine ?? item.amount_original ?? item.montant ?? item.amount ?? item.montant_chf ?? item.amount_chf ?? item.montant_cfa ?? item.amount_cfa ?? 0;
    const montantOrigine = toNumber(rawAmount);
    const explicitMontantChf = item.montant_chf ?? item.amount_chf ?? item.montantChf;
    const explicitMontantCfa = item.montant_cfa ?? item.amount_cfa ?? item.montantCfa;
    const montantChf = toNumber(
      explicitMontantChf,
      deviseOrigine === 'CHF' ? montantOrigine : 0
    );
    const montantCfa = toNumber(
      explicitMontantCfa,
      deviseOrigine === 'CFA' ? montantOrigine : 0
    );
    const tauxDepuisMontants = montantChf > 0 && montantCfa > 0 ? montantCfa / montantChf : null;
    const tauxBrut = toNumber(rawTauxFx);
    const tauxNormalise = deviseOrigine === 'CFA' && tauxBrut > 0 && tauxBrut < 1 ? 1 / tauxBrut : tauxBrut;
    const tauxFx = tauxDepuisMontants || tauxNormalise || null;
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
      tauxFx,
      hasExplicitTauxFx,
      dateTauxFx: cleanDate(item.date_taux_fx || item.date_taux || item.date_updated || item.created_at),
      sourceTauxFx: item.source_taux_fx || item.source_taux || item.source || 'Standard',
      categorie: item.category || item.categorie || fallbackCategory,
      date: cleanDate(item.date_document || item.date_created || item.created_at || item.date),
      agent: item.agent || item.agent_name || item.responsable || item.owner || item.created_by || 'Non renseigne',
      team: item.team || item.team_name || item.equipe || item.bu || item.business_unit || 'Non renseigne',
      departement: item.departement || item.department || item.department_name || item.service || 'Non renseigne',
      phaseProjet: item.phase_projet || item.phaseProjet || item.project_phase || item.phase || 'Conception',
      status: item.status || item.statut || 'completed'
    };
  }, []);

  const formatCell = (value) => value || '-';
  const formatAmount = (value) => toNumber(value).toLocaleString();
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

  const applyHistoricalFx = useCallback((row) => {
    const storedMontantChf = toNumber(row.montantChf);
    const storedMontantCfa = toNumber(row.montantCfa);
    if (storedMontantChf > 0 && storedMontantCfa > 0) {
      return {
        ...row,
        tauxFx: storedMontantCfa / storedMontantChf,
        montant: storedMontantChf,
        montantChf: storedMontantChf,
        montantCfa: storedMontantCfa
      };
    }
    const historicalRate = row.hasExplicitTauxFx ? null : getHistoricalCfaPerChf(row.date);
    const tauxFx = row.hasExplicitTauxFx ? row.tauxFx : historicalRate?.cfaPerChf;
    const montantOrigine = toNumber(row.montantOrigine ?? row.montant);
    const deviseOrigine = String(row.deviseOrigine || row.devise || 'CHF').toUpperCase();
    const montantChf = tauxFx && deviseOrigine === 'CFA' ? montantOrigine / tauxFx : toNumber(row.montantChf ?? row.montant);
    const montantCfa = tauxFx && deviseOrigine === 'CHF' ? montantOrigine * tauxFx : toNumber(row.montantCfa);

    return {
      ...row,
      tauxFx,
      montant: montantChf,
      montantChf,
      montantCfa,
      dateTauxFx: row.hasExplicitTauxFx ? row.dateTauxFx : historicalRate?.date || row.dateTauxFx,
      sourceTauxFx: row.hasExplicitTauxFx ? row.sourceTauxFx : historicalRate?.source || row.sourceTauxFx
    };
  }, [getHistoricalCfaPerChf]);

  // Phase 2: Load real data from BigQuery via API
  const loadFinanceData = useCallback(async () => {
    try {
      console.log('Fetching real finance data from API...');
      const [expensesRes, incomeRes] = await Promise.all([
        api.getExpenses(200, 0),
        api.getIncome(200, 0)
      ]);

        // Format expenses data
        const expensesData = Array.isArray(expensesRes?.data) ? expensesRes.data : [];
        const formattedExpenses = expensesData.map(item => ({
          id: item.id,
          description: item.description || item.name || 'Transaction',
          montant: parseFloat(item.montant || item.amount) || 0,
          categorie: item.category || item.categorie || 'Opérationnel',
          date: item.date_created || item.created_at || new Date().toISOString().split('T')[0],
          devise: 'CHF',
          status: item.status || item.statut || 'completed'
        }));

        // Format income data
        const incomeData = Array.isArray(incomeRes?.data) ? incomeRes.data : [];
        const formattedIncome = incomeData.map(item => ({
          id: item.id,
          description: item.description || item.name || 'Transaction',
          montant: parseFloat(item.montant || item.amount) || 0,
          categorie: item.category || item.categorie || 'Ventes',
          date: item.date_created || item.created_at || new Date().toISOString().split('T')[0],
          devise: 'CHF',
          status: item.status || item.statut || 'completed'
        }));

        const normalizedExpenses = expensesData.map((item, index) =>
          normalizeFinanceRow(item, 'DEP', 'Operationnel', index)
        );
        const normalizedIncome = incomeData.map((item, index) =>
          normalizeFinanceRow(item, 'REC', 'Ventes', index)
        );

      console.log(`Loaded ${normalizedExpenses.length} expenses and ${normalizedIncome.length} income from BigQuery`);
      setDepenses(normalizedExpenses.length ? normalizedExpenses : formattedExpenses);
      setRecettes(normalizedIncome.length ? normalizedIncome : formattedIncome);
    } catch (error) {
      console.error('Error fetching finance data:', error);
      setDepenses([]);
      setRecettes([]);
    }
  }, [normalizeFinanceRow]);

  useEffect(() => {
    loadFinanceData();
  }, [loadFinanceData]);

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
      'ADMINISTRATION': 'Administration',
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
      'ADMINISTRATION': 'Administration',
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
      'ADMINISTRATION': 'Administration',
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
    const key = normalizeCategoryKey(value);
    return standardValueTranslations[language]?.[key] || formatUnknownCategory(value);
  };
  const translateDescription = (desc) => dataTranslations.descriptions[language]?.[desc] || desc;
  const translateCategory = (cat) => {
    const key = normalizeCategoryKey(cat);
    return supplementalCategoryTranslations[language]?.[key] || dataTranslations.categories[language]?.[cat] || formatUnknownCategory(cat);
  };

  const categoryOptions = useMemo(() => {
    const defaults = modalType === 'recette'
      ? ['Financement', 'Vente de Marchandises', 'Vente de Services', 'Don en nature', 'Remboursement Caution Loyer', 'Remboursement Investissement Immo', 'Aide Sociale Ménage', 'Ventes', 'Recettes', 'Dons', 'Donation', 'Services', 'Immobilier', 'Fin Immo', 'Social', 'Participation']
      : ['Materiel', 'Administrative', 'Logistique', 'Achat Terrain', 'Chantier', 'Bien_Immo', 'Don Materiel', 'Formalites', 'Voyages', 'Alimentation', 'Bureautique', 'Carburant', 'Cadeaux', 'Etudes & Plans', 'Marchandises', 'Shipping / Fret', 'Abonnement', 'Depenses', 'Operationnel', 'Immobilier', 'Investissement Immo', 'Paie', 'Salaires', 'Social', 'Aide Sociale', 'Transport', 'Fournitures', 'Services'];
    const sourceRows = modalType === 'recette' ? recettes : depenses;
    const existing = sourceRows.map((row) => row.categorie).filter(Boolean);
    return [...new Set([...defaults, ...existing, formData.categorie].filter(Boolean))];
  }, [modalType, recettes, depenses, formData.categorie]);

  const agentOptions = useMemo(() => {
    const existing = [...recettes, ...depenses]
      .map((row) => row.agent)
      .filter((value) => value && normalizeCategoryKey(value) !== 'NON RENSEIGNE');
    return [...new Set(['Cheikh', 'Chantal', ...existing, formData.agent].filter(Boolean))];
  }, [recettes, depenses, formData.agent]);

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
              date: cleanDate(item.date_taux || item.date_updated || item.date),
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
    try {
      const response = await api.getRealEstateFinance(200, 0);
      const rows = Array.isArray(response?.data) ? response.data : [];
      setImmoTransactions(rows.map((item) => ({
        ...item,
        id: item.source_id,
        date: cleanDate(item.date_operation),
        montantChf: toNumber(item.montant_chf),
        montantCfa: toNumber(item.montant_cfa),
        tauxFx: item.taux_fx === null ? null : toNumber(item.taux_fx),
        partCheikhChf: toNumber(item.part_cheikh_chf),
        remboursementCheikhChf: toNumber(item.remboursement_cheikh_chf),
        estPlanifie: Boolean(item.est_planifie)
      })));
      setImmoSummary(response?.summary || {});
      setImmoError('');
    } catch (error) {
      console.error('Real Estate Finance error:', error);
      setImmoTransactions([]);
      setImmoSummary({});
      setImmoError(error.message);
    }
  // cleanDate and toNumber are stable helpers within this component.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadRealEstateFinance();
  }, [loadRealEstateFinance]);

  const recettesAffichees = useMemo(() => recettes.map(applyHistoricalFx), [recettes, applyHistoricalFx]);
  const depensesAffichees = useMemo(() => depenses.map(applyHistoricalFx), [depenses, applyHistoricalFx]);

  const recettesExploitation = useMemo(() => recettesAffichees.filter((row) => {
    const category = normalizeCategoryKey(row.categorie);
    return category !== 'AIDE SOCIALE MENAGE' && category !== 'AIDE SOCIALE';
  }), [recettesAffichees]);
  const totalRecettes = recettesExploitation.reduce((sum, r) => sum + toNumber(r.montantChf ?? r.montant), 0);
  const totalDepenses = depensesAffichees.reduce((sum, d) => sum + toNumber(d.montantChf ?? d.montant), 0);
  const solde = totalRecettes - totalDepenses;
  const latestHistoricalFx = getHistoricalCfaPerChf(new Date().toISOString().split('T')[0]);
  const tauxChfCfa = tauxDuJour.CHF_CFA || latestHistoricalFx?.cfaPerChf || null;
  const formatCfaWithCurrentRate = (chfAmount) => tauxChfCfa ? Math.round(chfAmount * tauxChfCfa).toLocaleString() : '-';

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
    setImmoFormData((previous) => {
      const next = { ...previous, [field]: value };
      if (field === 'date') {
        const historicalRate = getHistoricalCfaPerChf(value)?.cfaPerChf;
        if (historicalRate) next.tauxFx = historicalRate;
      }
      return next;
    });
  };

  const openNewImmoModal = () => {
    const next = createEmptyImmoForm();
    const historicalRate = getHistoricalCfaPerChf(next.date)?.cfaPerChf;
    if (historicalRate) next.tauxFx = historicalRate;
    setEditingImmoId(null);
    setImmoFormData(next);
    setShowImmoModal(true);
  };

  const handleImmoEdit = (item) => {
    setEditingImmoId(item.id);
    setImmoFormData({
      date: item.date,
      designation: item.designation || '',
      montantChf: item.montantChf || '',
      montantCfa: item.montantCfa || '',
      tauxFx: item.tauxFx || '',
      partCheikhChf: item.partCheikhChf || '',
      remboursementCheikhChf: item.remboursementCheikhChf || '',
      typeOperation: item.type_operation || 'Avance',
      perimetre: item.perimetre || 'Immobilier',
      categorie: item.categorie || 'Autre',
      projet: item.projet || 'Terrain Lac Rose',
      documentRef: item.document_ref || '',
      statut: item.statut || 'En cours',
      agent: item.agent || '',
      team: item.team || '',
      departement: item.departement || '',
      phaseProjet: item.phase_projet || ''
    });
    setShowImmoModal(true);
  };

  const handleImmoSave = async () => {
    if (!immoFormData.date || !immoFormData.designation.trim()) {
      alert(t.remplirChamps);
      return;
    }
    setSavingImmo(true);
    try {
      let montantChf = toNumber(immoFormData.montantChf);
      let montantCfa = toNumber(immoFormData.montantCfa);
      let tauxFx = montantChf > 0 && montantCfa > 0
        ? montantCfa / montantChf
        : toNumber(immoFormData.tauxFx);
      if (!tauxFx) tauxFx = getHistoricalCfaPerChf(immoFormData.date)?.cfaPerChf || 0;
      if (montantChf > 0 && !montantCfa && tauxFx) montantCfa = montantChf * tauxFx;
      if (montantCfa > 0 && !montantChf && tauxFx) montantChf = montantCfa / tauxFx;

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
        source_file: 'M3S App',
        enrichi_genspark: false
      };
      if (editingImmoId) await api.updateRealEstateFinance(editingImmoId, payload);
      else await api.createRealEstateFinance(payload);
      await loadRealEstateFinance();
      setShowImmoModal(false);
      setEditingImmoId(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setSavingImmo(false);
    }
  };

  const handleImmoDelete = async (id) => {
    if (!window.confirm(t.supprimerConfirmation)) return;
    try {
      await api.deleteRealEstateFinance(id);
      await loadRealEstateFinance();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.description || !formData.montant) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    const historicalRate = getHistoricalCfaPerChf(formData.date);
    if (!historicalRate?.cfaPerChf) {
      alert(`Aucun taux FX historique exact n'est disponible pour le ${formatDateForDisplay(formData.date)}.`);
      return;
    }

    const montantOrigine = toNumber(formData.montant);
    const deviseOrigine = String(formData.devise || 'CHF').toUpperCase();
    const tauxFx = historicalRate.cfaPerChf;
    const montantChf = deviseOrigine === 'CHF' ? montantOrigine : montantOrigine / tauxFx;
    const montantCfa = deviseOrigine === 'CFA' ? montantOrigine : montantOrigine * tauxFx;
    const payload = {
      description: formData.description,
      date: formData.date,
      montant_origine: montantOrigine,
      devise_origine: deviseOrigine,
      montant_chf: montantChf,
      montant_cfa: montantCfa,
      taux_fx: tauxFx,
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

    setSavingFinance(true);
    try {
      if (modalType === 'recette') {
        if (editingId) await api.updateIncome(editingId, payload);
        else await api.createIncome(payload);
      } else if (editingId) await api.updateExpense(editingId, payload);
      else await api.createExpense(payload);
      await loadFinanceData();
      setShowModal(false);
      setEditingId(null);
      setFormData(createEmptyFinanceForm());
    } catch (error) {
      alert(error.message);
    } finally {
      setSavingFinance(false);
    }
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData({
      ...item,
      montant: item.montantOrigine ?? item.montant,
      devise: item.deviseOrigine ?? item.devise
    });
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(t.supprimerConfirmation)) return;
    try {
      if (type === 'recette') await api.deleteIncome(id);
      else await api.deleteExpense(id);
      await loadFinanceData();
    } catch (error) {
      alert(error.message);
    }
  };

  const openNewModal = (type) => {
    setModalType(type);
    setEditingId(null);
    setFormData(createEmptyFinanceForm());
    setShowModal(true);
  };

  // FX Functions
  const handleFxFormChange = (field, value) => {
    setFxFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFxSave = () => {
    if (!fxFormData.devise_from || !fxFormData.devise_to || !fxFormData.rate) {
      alert('Please fill all fields');
      return;
    }

    if (editingFxId) {
      setFxHistory(fxHistory.map(fx => fx.id === editingFxId ? { ...fxFormData, id: editingFxId, rate: parseFloat(fxFormData.rate) } : fx));
    } else {
      setFxHistory([...fxHistory, { ...fxFormData, id: `FX-${Date.now()}`, rate: parseFloat(fxFormData.rate) }]);
    }

    setShowFxModal(false);
    setEditingFxId(null);
    setFxFormData({ devise_from: 'CHF', devise_to: 'CFA', rate: '', date: new Date().toISOString().split('T')[0], source: 'Manual' });
  };

  const handleFxEdit = (fx) => {
    setEditingFxId(fx.id);
    setFxFormData(fx);
    setShowFxModal(true);
  };

  const handleFxDelete = (id) => {
    setFxHistory(fxHistory.filter(fx => fx.id !== id));
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

  const immoInvestiChf = toNumber(immoSummary.investissements_realises_chf);
  const immoInvestiCfa = toNumber(immoSummary.investissements_realises_cfa);
  const immoRemboursementsDirects = toNumber(immoSummary.remboursements_directs_chf);
  const immoRemboursementsTotal = toNumber(immoSummary.remboursements_total_chf);
  const immoPartCheikh = toNumber(immoSummary.part_cheikh_chf);
  const immoSoldeOuvert = toNumber(immoSummary.solde_ouvert_cheikh_chf);
  const immoEquivalentTauxJour = tauxChfCfa ? Math.round(immoInvestiChf * tauxChfCfa) : null;
  const immoStatusClass = (status) => {
    const key = normalizeCategoryKey(status);
    if (['REMBOURSE', 'PAYE'].includes(key)) return 'bg-green-900/50 text-green-300';
    if (['PARTIEL', 'EN COURS'].includes(key)) return 'bg-orange-900/50 text-orange-300';
    if (['PLANIFIE', 'REPORTE'].includes(key)) return 'bg-blue-900/50 text-blue-300';
    return 'bg-slate-700 text-slate-300';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-green-500/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">{t.totalRecettes}</p>
                <div className="mt-1 leading-tight">
                  <p className="text-green-300 text-xl font-bold">{totalRecettes.toLocaleString()} CHF</p>
                  <p className="text-slate-300 text-sm font-semibold mt-1">{formatCfaWithCurrentRate(totalRecettes)} CFA</p>
                </div>
              </div>
              <TrendingUp size={28} className="text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-red-500/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">{t.totalDepenses}</p>
                <div className="mt-1 leading-tight">
                  <p className="text-red-300 text-xl font-bold">{totalDepenses.toLocaleString()} CHF</p>
                  <p className="text-slate-300 text-sm font-semibold mt-1">{formatCfaWithCurrentRate(totalDepenses)} CFA</p>
                </div>
              </div>
              <TrendingDown size={28} className="text-red-400" />
            </div>
          </div>

          <div className={`bg-slate-800 rounded-lg p-5 border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${solde >= 0 ? 'hover:border-blue-500/60' : 'hover:border-orange-500/60'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${solde >= 0 ? 'text-blue-400' : 'text-orange-400'} text-sm font-medium`}>{t.soldeNet}</p>
                <div className="mt-1 leading-tight">
                  <p className={`${solde >= 0 ? 'text-blue-300' : 'text-orange-300'} text-xl font-bold`}>{solde.toLocaleString()} CHF</p>
                  <p className="text-slate-300 text-sm font-semibold mt-1">{formatCfaWithCurrentRate(solde)} CFA</p>
                </div>
              </div>
              <DollarSign size={28} className={solde >= 0 ? 'text-blue-400' : 'text-orange-400'} />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-purple-500/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">{t.tauxFX}</p>
                <p className="text-purple-300 text-xl font-bold mt-1">1 CHF = {tauxChfCfa ? Number(tauxChfCfa).toLocaleString() : '-'} CFA</p>
              </div>
              <ArrowRightLeft size={28} className="text-purple-400" />
            </div>
          </div>
        </div>

        <ModulePageTabs
          moduleId="finances"
          language={language}
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'recettes', label: t.recettes },
            { tab: 'depenses', label: t.depenses },
            { tab: 'fx', label: t.fx }
          ]}
        />

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.tendance} (CHF)</h3>
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
              <h3 className="text-white font-bold mb-4">{t.tendance} (CFA)</h3>
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

        {activeTab === 'recettes' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => openNewModal('recette')} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleRecette}
              </button>
            </div>
            <TableControls
              rows={recettesAffichees}
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
                        onKeyDown={(event) => event.key === 'Enter' && handleEdit('recette', r)}
                        tabIndex={0}
                        className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                      >
                        <td className="px-4 py-3 text-slate-400">{formatCell(r.ref)}</td>
                        <td className="px-6 py-3 text-slate-400 whitespace-nowrap">{formatDateForDisplay(r.date)}</td>
                        <td className="px-6 py-3 text-slate-300">{translateDescription(r.description)}</td>
                        <td className="px-4 py-3 text-green-400 font-bold">{formatAmount(r.montantChf)}</td>
                        <td className="px-4 py-3 text-green-300 font-bold">{formatAmount(r.montantCfa)}</td>
                        <td className="px-4 py-3 text-purple-300">{formatAmount(r.tauxFx)}</td>
                        <td className="px-6 py-3 text-slate-400">{translateCategory(r.categorie)}</td>
                        <td className="px-4 py-3 text-slate-400">{formatCell(r.agent)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.team)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.departement)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(r.phaseProjet)}</td>
                        <td className="px-6 py-3 flex gap-2">
                          <button onClick={(event) => { event.stopPropagation(); handleEdit('recette', r); }} className="p-1 hover:bg-slate-600 rounded">
                            <Edit2 size={18} className="text-blue-400" />
                          </button>
                          <button onClick={(event) => { event.stopPropagation(); handleDelete('recette', r.id); }} className="p-1 hover:bg-slate-600 rounded">
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

        {activeTab === 'depenses' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => openNewModal('depense')} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleDepense}
              </button>
            </div>
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
                        onKeyDown={(event) => event.key === 'Enter' && handleEdit('depense', d)}
                        tabIndex={0}
                        className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                      >
                        <td className="px-4 py-3 text-slate-400">{formatCell(d.ref)}</td>
                        <td className="px-6 py-3 text-slate-400 whitespace-nowrap">{formatDateForDisplay(d.date)}</td>
                        <td className="px-6 py-3 text-slate-300">{translateDescription(d.description)}</td>
                        <td className="px-4 py-3 text-red-400 font-bold">{formatAmount(d.montantChf)}</td>
                        <td className="px-4 py-3 text-red-300 font-bold">{formatAmount(d.montantCfa)}</td>
                        <td className="px-4 py-3 text-purple-300">{formatAmount(d.tauxFx)}</td>
                        <td className="px-6 py-3 text-slate-400">{translateCategory(d.categorie)}</td>
                        <td className="px-4 py-3 text-slate-400">{formatCell(d.agent)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.team)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.departement)}</td>
                        <td className="px-4 py-3 text-slate-400">{translateStandardValue(d.phaseProjet)}</td>
                        <td className="px-6 py-3 flex gap-2">
                          <button onClick={(event) => { event.stopPropagation(); handleEdit('depense', d); }} className="p-1 hover:bg-slate-600 rounded">
                            <Edit2 size={18} className="text-blue-400" />
                          </button>
                          <button onClick={(event) => { event.stopPropagation(); handleDelete('depense', d.id); }} className="p-1 hover:bg-slate-600 rounded">
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
          <div className="space-y-5">
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

            <div className="flex gap-2 border-b border-slate-700 overflow-x-auto">
              {[
                { id: 'converter', label: t.convertisseur, icon: Calculator },
                { id: 'dashboard', label: t.tableauBordFx, icon: BarChart3 },
                { id: 'history', label: t.tauxHistorique, icon: History }
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setFxView(id)} className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap font-medium ${fxView === id ? 'text-orange-300 border-b-2 border-orange-400' : 'text-slate-400 hover:text-white'}`}>
                  <Icon size={17} /> {label}
                </button>
              ))}
            </div>

            {fxView === 'converter' && (
              <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
                <section className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-white font-bold mb-5 flex items-center gap-2"><SlidersHorizontal size={18} className="text-orange-400" /> {t.parametresConversion}</h3>
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
                    <LocalizedDateInput value={converterDate} onChange={(date) => { setConverterDate(date); setConversionResult(null); }} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                  </label>
                  <div className="mt-4 px-4 py-3 border border-slate-600 rounded bg-slate-900/60">
                    <p className="text-xs text-slate-400">{t.tauxApplique}</p>
                    <p className="font-semibold text-orange-300">{converterRate ? `1 CHF = ${Number(converterRate).toLocaleString(undefined, { maximumFractionDigits: 4 })} CFA` : t.aucunTauxDate}</p>
                  </div>
                  <button onClick={calculateConversion} disabled={!converterRate || converterInputValue < 0} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded disabled:opacity-50">
                    <Calculator size={18} /> {t.calculer}
                  </button>
                  <div className="mt-6 border-t border-slate-700 pt-5">
                    <h4 className="text-white font-semibold mb-3">{t.conversionsRapides}</h4>
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
                  </div>
                </section>

                <div className="space-y-5">
                  <section className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
                    <p className="text-sm text-slate-400">{t.conversionResultat}</p>
                    <p className="text-sm text-slate-300 mt-3">{formatConvertedValue(converterInputValue, converterInputCurrency)} {converterInputCurrency} =</p>
                    <p className="text-3xl font-bold text-orange-300 mt-1 break-words">{formatConvertedValue(displayedConverterOutput, converterOutputCurrency)} {converterOutputCurrency}</p>
                    <p className="text-xs text-slate-400 mt-2">1 CHF = {converterRate ? Number(converterRate).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '-'} CFA</p>
                  </section>
                  <section className="bg-slate-800 border border-slate-700 rounded-lg p-5">
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
            )}

            {fxView === 'dashboard' && (
              <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
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
              <div>
                <div className="mb-4 flex flex-wrap justify-end gap-4">
                  <select value={filterDevise} onChange={(e) => setFilterDevise(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option value="">{t.filtreDevise}</option><option value="CHF">CHF</option><option value="CFA">CFA</option><option value="USD">USD</option><option value="EUR">EUR</option>
                  </select>
                  <button onClick={openNewFxModal} className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"><Plus size={20} /> {t.nouveauTaux}</button>
                </div>
                <TableControls rows={filteredFxHistory} renderTable={(visibleRows) => (
                  <table className="min-w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-slate-700"><tr><th className="px-4 py-3 text-left text-white font-bold">{t.id}</th><th className="px-4 py-3 text-left text-white font-bold">{t.date}</th><th className="px-4 py-3 text-left text-white font-bold">{t.deviseBase}</th><th className="px-4 py-3 text-left text-white font-bold">{t.deviseCible}</th><th className="px-4 py-3 text-left text-white font-bold">{t.taux}</th><th className="px-4 py-3 text-left text-white font-bold">{t.source}</th><th className="px-4 py-3 text-left text-white font-bold">{t.actions}</th></tr></thead>
                    <tbody>{visibleRows.map(fx => <tr key={fx.id} className="border-t border-slate-700 hover:bg-slate-700/50"><td className="px-4 py-3 text-slate-300 text-xs">{fx.id}</td><td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatDateForDisplay(fx.date)}</td><td className="px-4 py-3 text-blue-400 font-bold">{fx.devise_from}</td><td className="px-4 py-3 text-green-400 font-bold">{fx.devise_to}</td><td className="px-4 py-3 text-purple-400 font-bold">{parseFloat(fx.rate).toLocaleString(undefined, { maximumFractionDigits: fx.rate < 1 ? 6 : 2 })}</td><td className="px-4 py-3 text-slate-400">{fx.source}</td><td className="px-4 py-3 flex gap-2"><button onClick={() => handleFxEdit(fx)} className="p-1 hover:bg-slate-600 rounded"><Edit2 size={16} className="text-blue-400" /></button><button onClick={() => handleFxDelete(fx.id)} className="p-1 hover:bg-slate-600 rounded"><Trash2 size={16} className="text-red-400" /></button></td></tr>)}</tbody>
                  </table>
                )} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'immobilier' && (
          <div className="space-y-6">
            {immoTransactions.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
                <Building2 size={36} className="mx-auto mb-3 text-orange-400" />
                <p className="text-white font-semibold">{t.aucuneDonneeImmo}</p>
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
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 shrink-0">
                      <div className="rounded-md px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                        <p className="text-xs uppercase text-slate-400">{t.totalInvesti}</p>
                        <p className="text-2xl font-bold text-cyan-300 whitespace-nowrap">{formatAmount(immoInvestiChf)} CHF</p>
                      </div>
                      <div className="rounded-md px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                        <p className="text-xs uppercase text-slate-400">{t.montantsHistoriques}</p>
                        <p className="text-2xl font-bold text-orange-400 whitespace-nowrap">{formatAmount(immoInvestiCfa)} CFA</p>
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
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatAmount(immoRemboursementsDirects)} CHF</p>
                        <p className="text-xl font-bold text-orange-400 whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoRemboursementsDirects)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:px-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.remboursementsTotal}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatAmount(immoRemboursementsTotal)} CHF</p>
                        <p className="text-xl font-bold text-orange-400 whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoRemboursementsTotal)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:px-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.soldeOuvert}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatAmount(immoSoldeOuvert)} CHF</p>
                        <p className="text-xl font-bold text-orange-400 whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoSoldeOuvert)} CFA</p>
                      </div>
                    </div>
                    <div className="py-3 xl:pl-4 rounded-md px-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/30">
                      <p className="text-xs uppercase text-slate-400 mb-1">{t.partCheikh}</p>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-xl font-bold text-cyan-300 whitespace-nowrap">{formatAmount(immoPartCheikh)} CHF</p>
                        <p className="text-xl font-bold text-orange-400 whitespace-nowrap">≈ {formatCfaWithCurrentRate(immoPartCheikh)} CFA</p>
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
                      <button onClick={openNewImmoModal} className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition">
                        <Plus size={18} /> {t.nouvelleOperationImmo}
                      </button>
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
                                onKeyDown={(event) => event.key === 'Enter' && handleImmoEdit(item)}
                                tabIndex={0}
                                className="border-t border-slate-700 hover:bg-slate-700/50 cursor-pointer focus:outline-none focus:bg-slate-700/70"
                              >
                                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.id}</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatDateForDisplay(item.date)}</td>
                                <td className="px-4 py-3 text-white font-medium max-w-[360px]">{item.designation}</td>
                                <td className="px-4 py-3 text-orange-300 font-semibold whitespace-nowrap">{formatAmount(item.montantChf)} CHF</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatAmount(item.montantCfa)} CFA</td>
                                <td className="px-4 py-3 text-purple-300">{item.tauxFx ? item.tauxFx.toLocaleString(undefined, { maximumFractionDigits: 3 }) : '-'}</td>
                                <td className="px-4 py-3 text-blue-300 whitespace-nowrap">{formatAmount(item.partCheikhChf)} CHF</td>
                                <td className="px-4 py-3 text-green-300 whitespace-nowrap">{formatAmount(item.remboursementCheikhChf)} CHF</td>
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
                                    <button onClick={(event) => { event.stopPropagation(); handleImmoEdit(item); }} className="p-1 hover:bg-slate-600 rounded" title={t.modifier}>
                                      <Edit2 size={17} className="text-blue-400" />
                                    </button>
                                    <button onClick={(event) => { event.stopPropagation(); handleImmoDelete(item.id); }} className="p-1 hover:bg-slate-600 rounded" title={t.actions}>
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

        <ChildTabPlaceholder moduleId="finances" language={language} activeTab={activeTab} handledTabs={['overview', 'recettes', 'depenses', 'fx', 'immobilier']} />

        {showImmoModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-slate-700">
              <h2 className="text-white text-xl font-bold mb-5">{editingImmoId ? t.modifierOperationImmo : t.nouvelleOperationImmo}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="lg:col-span-2 text-sm text-slate-300">
                  <span className="block mb-1">{t.designation}</span>
                  <input type="text" value={immoFormData.designation} onChange={(event) => handleImmoFormChange('designation', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.date}</span>
                  <LocalizedDateInput value={immoFormData.date} onChange={(date) => handleImmoFormChange('date', date)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>

                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.montantCHF}</span>
                  <input type="number" step="any" value={immoFormData.montantChf} onChange={(event) => handleImmoFormChange('montantChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.montantCFA}</span>
                  <input type="number" step="any" value={immoFormData.montantCfa} onChange={(event) => handleImmoFormChange('montantCfa', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.tauxFXCol}</span>
                  <input type="number" step="any" value={immoFormData.tauxFx} onChange={(event) => handleImmoFormChange('tauxFx', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.partCheikh}</span>
                  <input type="number" step="any" value={immoFormData.partCheikhChf} onChange={(event) => handleImmoFormChange('partCheikhChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.remboursementCheikh}</span>
                  <input type="number" step="any" value={immoFormData.remboursementCheikhChf} onChange={(event) => handleImmoFormChange('remboursementCheikhChf', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
                </label>
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
                  <span className="block mb-1">{t.agent}</span>
                  <select value={immoFormData.agent} onChange={(event) => handleImmoFormChange('agent', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {agentOptions.map((value) => <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.team}</span>
                  <select value={immoFormData.team} onChange={(event) => handleImmoFormChange('team', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {TEAM_OPTIONS.map((value) => <option key={value} value={value}>{formatUnknownCategory(value)}</option>)}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  <span className="block mb-1">{t.departement}</span>
                  <select value={immoFormData.departement} onChange={(event) => handleImmoFormChange('departement', event.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option value="">-</option>
                    {DEPARTMENT_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
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
                <button onClick={handleImmoSave} disabled={savingImmo} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg disabled:opacity-50">{t.enregistrer}</button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
              <h2 className="text-white font-bold mb-4">{editingId ? (modalType === 'recette' ? t.modifierRecette : t.modifierDepense) : (modalType === 'recette' ? t.creerRecette : t.creerDepense)}</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t.description}
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <input
                  type="number"
                  placeholder={t.montant}
                  value={formData.montant}
                  onChange={(e) => handleFormChange('montant', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <select value={formData.devise} onChange={(e) => handleFormChange('devise', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CHF</option>
                  <option>CFA</option>
                </select>
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
                  onChange={(date) => handleFormChange('date', date)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.agent}</span>
                    <select value={formData.agent || ''} onChange={(e) => handleFormChange('agent', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {agentOptions.map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.team}</span>
                    <select value={formData.team || ''} onChange={(e) => handleFormChange('team', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {TEAM_OPTIONS.map((value) => <option key={value} value={value}>{formatUnknownCategory(value)}</option>)}
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    <span className="block mb-1">{t.departement}</span>
                    <select value={formData.departement || ''} onChange={(e) => handleFormChange('departement', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                      <option value="">-</option>
                      {DEPARTMENT_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
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
                  <button onClick={() => setShowModal(false)} disabled={savingFinance} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg disabled:opacity-50">{t.annuler}</button>
                  <button onClick={handleSave} disabled={savingFinance} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">{editingId ? t.enregistrer : t.creer}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showFxModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
              <h2 className="text-white font-bold mb-4">{editingFxId ? t.modifierTaux : t.nouveauTaux}</h2>
              <div className="space-y-4">
                <select value={fxFormData.devise_from} onChange={(e) => handleFxFormChange('devise_from', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CHF</option>
                  <option>CFA</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                <select value={fxFormData.devise_to} onChange={(e) => handleFxFormChange('devise_to', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                  <option>CFA</option>
                  <option>CHF</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder={t.taux}
                  value={fxFormData.rate}
                  onChange={(e) => handleFxFormChange('rate', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <LocalizedDateInput
                  value={fxFormData.date}
                  onChange={(date) => handleFxFormChange('date', date)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <input
                  type="text"
                  placeholder={t.source}
                  value={fxFormData.source}
                  onChange={(e) => handleFxFormChange('source', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setShowFxModal(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">{t.annuler}</button>
                  <button onClick={handleFxSave} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">{t.creer}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </>
  );
};

export default Finance;
