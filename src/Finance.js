import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api'; // Phase 2: Aide API pour données BigQuery réelles
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';

// Month translations (stable constants, defined at module level)
const monthTranslations = {
  FR: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};

const shortMonths = ['Jan', 'Fév', 'Mar', 'Avr'];

const Finance = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [fxHistory, setFxHistory] = useState([]);
  const [tauxDuJour, setTauxDuJour] = useState({});
  const [filterDevise, setFilterDevise] = useState('');
  const [showFxModal, setShowFxModal] = useState(false);
  const [editingFxId, setEditingFxId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('recette');
  const [editingId, setEditingId] = useState(null);
  const [fxFormData, setFxFormData] = useState({
    devise_from: 'CHF',
    devise_to: 'CFA',
    rate: '',
    date: new Date().toISOString().split('T')[0],
    source: 'Manual'
  });
  const [formData, setFormData] = useState({
    description: '',
    montant: '',
    devise: 'CHF',
    date: new Date().toISOString().split('T')[0],
    categorie: ''
  });

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
      remplirChamps: 'Veuillez remplir les champs obligatoires'
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
      remplirChamps: 'Please fill in all required fields'
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
      remplirChamps: 'Bitte füllen Sie alle erforderlichen Felder aus'
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
    const hasExplicitTauxFx = rawTauxFx !== undefined && rawTauxFx !== null && rawTauxFx !== '';
    const tauxFx = hasExplicitTauxFx ? toNumber(rawTauxFx) : null;
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
  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        console.log('Fetching real finance data from API...');
        const [expensesRes, incomeRes] = await Promise.all([
          api.getExpenses(100, 0),
          api.getIncome(100, 0)
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
    };

    fetchFinanceData();
  }, [normalizeFinanceRow]);

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
      'ABONNEMENT': 'Abonnement'
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
      'ABONNEMENT': 'Subscription'
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
      'ABONNEMENT': 'Abonnement'
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
      'ADMINISTRATION': 'Administration'
    },
    EN: {
      'NON RENSEIGNE': 'Not provided',
      'CONCEPTION': 'Design',
      'MISE EN PLACE': 'Implementation',
      'CONSOLIDATION': 'Consolidation',
      'DYNAMISATION': 'Activation',
      'IT': 'IT',
      'FINANCE': 'Finance',
      'ADMINISTRATION': 'Administration'
    },
    DE: {
      'NON RENSEIGNE': 'Nicht angegeben',
      'CONCEPTION': 'Konzeption',
      'MISE EN PLACE': 'Umsetzung',
      'CONSOLIDATION': 'Konsolidierung',
      'DYNAMISATION': 'Aktivierung',
      'IT': 'IT',
      'FINANCE': 'Finanzen',
      'ADMINISTRATION': 'Administration'
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

  const getMonthName = useCallback((shortMonth) => {
    const index = shortMonths.indexOf(shortMonth);
    if (index !== -1) {
      return monthTranslations[language][index] || shortMonth;
    }
    return shortMonth;
  }, [language]);

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

  const recettesAffichees = useMemo(() => recettes.map(applyHistoricalFx), [recettes, applyHistoricalFx]);
  const depensesAffichees = useMemo(() => depenses.map(applyHistoricalFx), [depenses, applyHistoricalFx]);

  const totalRecettes = recettesAffichees.reduce((sum, r) => sum + toNumber(r.montantChf ?? r.montant), 0);
  const totalDepenses = depensesAffichees.reduce((sum, d) => sum + toNumber(d.montantChf ?? d.montant), 0);
  const solde = totalRecettes - totalDepenses;
  const latestHistoricalFx = getHistoricalCfaPerChf(new Date().toISOString().split('T')[0]);
  const tauxChfCfa = tauxDuJour.CHF_CFA || latestHistoricalFx?.cfaPerChf || null;
  const formatCfaWithCurrentRate = (chfAmount) => tauxChfCfa ? Math.round(chfAmount * tauxChfCfa).toLocaleString() : '-';

  // Memoized data with translations
  const monthlyDataRaw = useMemo(() => [
    { mois: 'Jan', recettes: 5000, depenses: 3000 },
    { mois: 'Fév', recettes: 6500, depenses: 3500 },
    { mois: 'Mar', recettes: 7000, depenses: 4000 },
    { mois: 'Avr', recettes: totalRecettes, depenses: totalDepenses },
  ], [totalRecettes, totalDepenses]);

  const monthlyData = useMemo(() =>
    monthlyDataRaw.map(item => ({
      ...item,
      mois: getMonthName(item.mois)
    })), [monthlyDataRaw, getMonthName]);

  // Transform 350 FX rates into yearly data for chart
  const fxYearlyData = useMemo(() => {
    if (!fxHistory || fxHistory.length === 0) return [];

    const yearlyMap = {};
    fxHistory.forEach(item => {
      try {
        const dateStr = item.date || '';
        const year = dateStr.substring(0, 4);
        const rate = parseFloat(item.rate) || 0;

        if (!yearlyMap[year]) {
          yearlyMap[year] = { rates: [], year };
        }
        if (rate > 0) {
          yearlyMap[year].rates.push(rate);
        }
      } catch (e) {
        // Skip malformed dates
      }
    });

    // Calculate average per year
    return Object.values(yearlyMap)
      .map(data => ({
        année: data.year,
        'Taux Moyen': parseFloat((data.rates.reduce((a, b) => a + b, 0) / data.rates.length).toFixed(2))
      }))
      .sort((a, b) => a.année - b.année);
  }, [fxHistory]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.description || !formData.montant) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const typeCode = modalType === 'recette' ? 'REC' : 'DEP';
    const fallbackCategory = modalType === 'recette' ? 'Ventes' : 'Operationnel';
    const normalizedRow = normalizeFinanceRow(
      { ...formData, id: editingId || Date.now() },
      typeCode,
      fallbackCategory
    );

    if (modalType === 'recette') {
      if (editingId) {
        setRecettes(recettes.map(r => r.id === editingId ? normalizedRow : r));
      } else {
        setRecettes([...recettes, normalizedRow]);
      }
    } else {
      if (editingId) {
        setDepenses(depenses.map(d => d.id === editingId ? normalizedRow : d));
      } else {
        setDepenses([...depenses, normalizedRow]);
      }
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ description: '', montant: '', devise: 'CHF', date: new Date().toISOString().split('T')[0], categorie: '' });
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

  const handleDelete = (type, id) => {
    if (type === 'recette') {
      setRecettes(recettes.filter(r => r.id !== id));
    } else {
      setDepenses(depenses.filter(d => d.id !== id));
    }
  };

  const openNewModal = (type) => {
    setModalType(type);
    setEditingId(null);
    setFormData({ description: '', montant: '', devise: 'CHF', date: new Date().toISOString().split('T')[0], categorie: '' });
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💰 {t.title}</h1>
          <p className="text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs">{t.totalRecettes}</p>
                <div className="text-sm font-bold mt-1 leading-tight">
                  <p className="text-white">{totalRecettes.toLocaleString()} CHF</p>
                  <p className="text-white text-xs">{formatCfaWithCurrentRate(totalRecettes)} CFA</p>
                </div>
              </div>
              <TrendingUp size={24} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 border border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-xs">{t.totalDepenses}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p className="text-white">{totalDepenses.toLocaleString()} CHF</p>
                  <p className="text-white text-xs">{formatCfaWithCurrentRate(totalDepenses)} CFA</p>
                </div>
              </div>
              <TrendingDown size={24} className="text-red-400" />
            </div>
          </div>

          <div className={`bg-gradient-to-br ${solde >= 0 ? 'from-blue-900 to-blue-800' : 'from-orange-900 to-orange-800'} rounded-lg p-4 border ${solde >= 0 ? 'border-blue-700' : 'border-orange-700'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${solde >= 0 ? 'text-blue-200' : 'text-orange-200'} text-xs`}>{t.soldeNet}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p className="text-white">{solde.toLocaleString()} CHF</p>
                  <p className="text-white text-xs">{formatCfaWithCurrentRate(solde)} CFA</p>
                </div>
              </div>
              <DollarSign size={24} className={solde >= 0 ? 'text-blue-400' : 'text-orange-400'} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-4 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-xs">{t.tauxFX}</p>
                <p className="text-white text-lg font-bold">{tauxChfCfa ? Number(tauxChfCfa).toLocaleString() : '-'} CFA</p>
              </div>
              <ArrowRightLeft size={24} className="text-purple-400" />
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
              <h3 className="text-white font-bold mb-4">{t.tendance}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="recettes" name={t.recettes} fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="depenses" name={t.depenses} fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.historiqueTaux}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fxYearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="année" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Line type="monotone" dataKey="Taux Moyen" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 6 }} activeDot={{ r: 8 }} />
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
          <div>
            <div className="mb-4 flex justify-end gap-4">
              <select
                value={filterDevise}
                onChange={(e) => setFilterDevise(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              >
                <option value="">{t.filtreDevise}</option>
                <option value="CHF">CHF</option>
                <option value="CFA">CFA</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <button onClick={openNewFxModal} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouveauTaux}
              </button>
            </div>
            <TableControls
              rows={filteredFxHistory}
              renderTable={(visibleRows) => (
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.id}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.date}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.deviseBase}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.deviseCible}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.taux}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.source}</th>
                      <th className="px-4 py-3 text-left text-white font-bold">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map(fx => (
                      <tr key={fx.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="px-4 py-3 text-slate-300 text-xs">{fx.id}</td>
                        <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{formatDateForDisplay(fx.date)}</td>
                        <td className="px-4 py-3 text-blue-400 font-bold">{fx.devise_from}</td>
                        <td className="px-4 py-3 text-green-400 font-bold">{fx.devise_to}</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">{parseFloat(fx.rate).toLocaleString(undefined, { maximumFractionDigits: fx.rate < 1 ? 6 : 2 })}</td>
                        <td className="px-4 py-3 text-slate-400">{fx.source}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button onClick={() => handleFxEdit(fx)} className="p-1 hover:bg-slate-600 rounded">
                            <Edit2 size={16} className="text-blue-400" />
                          </button>
                          <button onClick={() => handleFxDelete(fx.id)} className="p-1 hover:bg-slate-600 rounded">
                            <Trash2 size={16} className="text-red-400" />
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

        <ChildTabPlaceholder moduleId="finances" language={language} activeTab={activeTab} handledTabs={['overview', 'recettes', 'depenses', 'fx']} />

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
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
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">{t.annuler}</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{t.creer}</button>
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
