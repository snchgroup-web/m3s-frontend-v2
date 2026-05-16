import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Edit2, Trash2, DollarSign, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';

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
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);
  const [fxHistory, setFxHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('recette');
  const [editingId, setEditingId] = useState(null);
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
      annuler: 'Annuler'
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
      annuler: 'Cancel'
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
      annuler: 'Abbrechen'
    }
  };

  const t = translations[language];

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

  useEffect(() => {
    setRecettes([
      { id: 1, description: 'Vente produits', montant: 5000, devise: 'CHF', date: '2026-04-01', categorie: 'Ventes' },
      { id: 2, description: 'Donation', montant: 2000, devise: 'CFA', date: '2026-04-05', categorie: 'Dons' },
      { id: 3, description: 'Services', montant: 3500, devise: 'CHF', date: '2026-04-10', categorie: 'Services' },
    ]);

    setDepenses([
      { id: 1, description: 'Loyer bureau', montant: 1500, devise: 'CHF', date: '2026-04-01', categorie: 'Immobilier' },
      { id: 2, description: 'Salaires', montant: 8000, devise: 'CHF', date: '2026-04-05', categorie: 'Paie' },
      { id: 3, description: 'Fournitures', montant: 500, devise: 'CFA', date: '2026-04-08', categorie: 'Opérationnel' },
    ]);

    setFxHistory([
      { date: '2026-04-01', rate: 656 },
      { date: '2026-04-05', rate: 658 },
      { date: '2026-04-10', rate: 655 },
      { date: '2026-04-15', rate: 660 },
      { date: '2026-04-20', rate: 662 },
    ]);
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
        setRecettes(recettes.map(r => r.id === editingId ? { ...formData, id: editingId } : r));
      } else {
        setRecettes([...recettes, { ...formData, id: Date.now(), montant: parseFloat(formData.montant) }]);
      }
    } else {
      if (editingId) {
        setDepenses(depenses.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
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

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs">{t.totalRecettes}</p>
                <div className="text-sm font-bold mt-1 leading-tight">
                  <p className="text-white">{formatDualCurrency(totalRecettes).chf} CHF</p>
                  <p className="text-white">{formatDualCurrency(totalRecettes).cfa} CFA</p>
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
                  <p className="text-white">{formatDualCurrency(totalDepenses).cfa} CFA</p>
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
                  <p className="text-white">{formatDualCurrency(solde).cfa} CFA</p>
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
                <LineChart data={fxHistory}>
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
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-4">{t.historiqueTaux}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={fxHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? (modalType === 'recette' ? t.modifierRecette : t.modifierDepense) : (modalType === 'recette' ? t.creerRecette : t.creerDepense)}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.description}</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="ex: Vente produits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.montant}</label>
                <input
                  type="number"
                  value={formData.montant}
                  onChange={(e) => handleFormChange('montant', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.devise}</label>
                <select
                  value={formData.devise}
                  onChange={(e) => handleFormChange('devise', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                >
                  <option>CHF</option>
                  <option>CFA</option>
                  <option>EUR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.categorie}</label>
                <input
                  type="text"
                  value={formData.categorie}
                  onChange={(e) => handleFormChange('categorie', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  placeholder="ex: Ventes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.date}</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
              >
                {t.annuler}
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                {editingId ? t.modifier : t.creer}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Finance;