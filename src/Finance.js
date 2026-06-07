import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, TrendingDown, ArrowRightLeft, Search } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api'; // Phase 2: Aide API pour données BigQuery réelles

// Month translations (stable constants, defined at module level)
const monthTranslations = {
  FR: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};

const shortMonths = ['Jan', 'Fév', 'Mar', 'Avr'];

// Exchange rate: 1 CHF = 656 CFA
const CHF_TO_CFA_RATE = 656;

// Format currency with both CHF and CFA - returns object for separate display
const formatDualCurrency = (chfAmount) => {
  const cfaAmount = Math.round(chfAmount * CHF_TO_CFA_RATE);
  return {
    chf: chfAmount.toLocaleString(),
    cfa: cfaAmount.toLocaleString()
  };
};

const Finance = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [fxHistory, setFxHistory] = useState([]);
  const [searchFx, setSearchFx] = useState('');
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
      devise: 'Devise',
      categorie: 'Catégorie',
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
      id: 'ID'
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
      devise: 'Currency',
      categorie: 'Category',
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
      id: 'ID'
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
      devise: 'Währung',
      categorie: 'Kategorie',
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
      id: 'ID'
    }
  };

  const t = translations[language];

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

        console.log(`Loaded ${formattedExpenses.length} expenses and ${formattedIncome.length} income from BigQuery`);
        setDepenses(formattedExpenses);
        setRecettes(formattedIncome);
      } catch (error) {
        console.error('Error fetching finance data:', error);
        setDepenses([]);
        setRecettes([]);
      }
    };

    fetchFinanceData();
  }, []);

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

  const translateDescription = (desc) => dataTranslations.descriptions[language]?.[desc] || desc;
  const translateCategory = (cat) => dataTranslations.categories[language]?.[cat] || cat;

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

          if (dataArray.length > 0) {
            // Map BigQuery data to display format
            const mappedData = dataArray.map(item => ({
              id: item.id,
              date: item.date,
              rate: parseFloat(item.rate || 0),
              devise_from: item.devise_from,
              devise_to: item.devise_to,
              taux_buy: parseFloat(item.taux_buy || 0),
              taux_sell: parseFloat(item.taux_sell || 0),
              source: item.source,
              active: item.active
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

  const totalRecettes = recettes.reduce((sum, r) => sum + r.montant, 0);
  const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);
  const solde = totalRecettes - totalDepenses;

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

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.description || !formData.montant) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (modalType === 'recette') {
      if (editingId) {
        setRecettes(recettes.map(r => r.id === editingId ? { ...formData, id: editingId, montant: parseFloat(formData.montant) } : r));
      } else {
        setRecettes([...recettes, { ...formData, id: Date.now(), montant: parseFloat(formData.montant) }]);
      }
    } else {
      if (editingId) {
        setDepenses(depenses.map(d => d.id === editingId ? { ...formData, id: editingId, montant: parseFloat(formData.montant) } : d));
      } else {
        setDepenses([...depenses, { ...formData, id: Date.now(), montant: parseFloat(formData.montant) }]);
      }
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ description: '', montant: '', devise: 'CHF', date: new Date().toISOString().split('T')[0], categorie: '' });
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
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
      const matchesSearch = fx.id?.toString().includes(searchFx) || fx.source?.toLowerCase().includes(searchFx.toLowerCase());
      const matchesDevise = !filterDevise || fx.devise_from?.includes(filterDevise) || fx.devise_to?.includes(filterDevise);
      return matchesSearch && matchesDevise;
    }), [fxHistory, searchFx, filterDevise]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">

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
                  <p className="text-white">{formatDualCurrency(totalRecettes).chf} CHF</p>
                  <p className="text-white text-xs">{formatDualCurrency(totalRecettes).cfa} CFA</p>
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
                  <p className="text-white">{formatDualCurrency(totalDepenses).chf} CHF</p>
                  <p className="text-white text-xs">{formatDualCurrency(totalDepenses).cfa} CFA</p>
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
                  <p className="text-white">{formatDualCurrency(solde).chf} CHF</p>
                  <p className="text-white text-xs">{formatDualCurrency(solde).cfa} CFA</p>
                </div>
              </div>
              <DollarSign size={24} className={solde >= 0 ? 'text-blue-400' : 'text-orange-400'} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-4 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-xs">{t.tauxFX}</p>
                <p className="text-white text-lg font-bold">656 CFA</p>
              </div>
              <ArrowRightLeft size={24} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6 border-b border-slate-700">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.overview}</button>
          <button onClick={() => setActiveTab('recettes')} className={`px-4 py-3 font-medium ${activeTab === 'recettes' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.recettes}</button>
          <button onClick={() => setActiveTab('depenses')} className={`px-4 py-3 font-medium ${activeTab === 'depenses' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.depenses}</button>
          <button onClick={() => setActiveTab('fx')} className={`px-4 py-3 font-medium ${activeTab === 'fx' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.fx}</button>
        </div>

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
                <LineChart data={fxHistory.slice(-5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
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
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.description}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.montant}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.devise}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.categorie}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.date}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {recettes.map(r => (
                    <tr key={r.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-slate-300">{translateDescription(r.description)}</td>
                      <td className="px-6 py-3 text-green-400 font-bold">{r.montant.toLocaleString()}</td>
                      <td className="px-6 py-3 text-slate-400">{r.devise}</td>
                      <td className="px-6 py-3 text-slate-400">{translateCategory(r.categorie)}</td>
                      <td className="px-6 py-3 text-slate-400">{r.date}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button onClick={() => handleEdit('recette', r)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={18} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('recette', r.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'depenses' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => openNewModal('depense')} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleDepense}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.description}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.montant}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.devise}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.categorie}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.date}</th>
                    <th className="px-6 py-3 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {depenses.map(d => (
                    <tr key={d.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-slate-300">{translateDescription(d.description)}</td>
                      <td className="px-6 py-3 text-red-400 font-bold">{d.montant.toLocaleString()}</td>
                      <td className="px-6 py-3 text-slate-400">{d.devise}</td>
                      <td className="px-6 py-3 text-slate-400">{translateCategory(d.categorie)}</td>
                      <td className="px-6 py-3 text-slate-400">{d.date}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <button onClick={() => handleEdit('depense', d)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={18} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete('depense', d.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fx' && (
          <div>
            <div className="mb-4 flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder={t.rechercher}
                  value={searchFx}
                  onChange={(e) => setSearchFx(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
              </div>
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

            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
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
                  {filteredFxHistory.length > 0 ? (
                    filteredFxHistory.map(fx => (
                      <tr key={fx.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="px-4 py-3 text-slate-300 text-xs">{fx.id}</td>
                        <td className="px-4 py-3 text-slate-300">{fx.date}</td>
                        <td className="px-4 py-3 text-blue-400 font-bold">{fx.devise_from}</td>
                        <td className="px-4 py-3 text-green-400 font-bold">{fx.devise_to}</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">{parseFloat(fx.rate).toFixed(2)}</td>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                        {fxHistory.length === 0 ? 'No FX data loaded. Loading from BigQuery...' : 'No results found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm mt-4">Total taux: {filteredFxHistory.length}</p>
          </div>
        )}

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
                <input
                  type="text"
                  placeholder={t.categorie}
                  value={formData.categorie}
                  onChange={(e) => handleFormChange('categorie', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
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
                <input
                  type="date"
                  value={fxFormData.date}
                  onChange={(e) => handleFxFormChange('date', e.target.value)}
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
