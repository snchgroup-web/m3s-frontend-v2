import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Building2, Plus, TrendingDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';

const Actifs = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventaire, setInventaire] = useState([]);
  const [immobilisations, setImmobilisations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'Immobilier',
    valeurAcquisition: '',
    dateAcquisition: new Date().toISOString().split('T')[0],
    dureeVie: '',
    depreciation: ''
  });

  const translations = {
    FR: {
      title: 'Stock & Actifs',
      subtitle: 'Inventaire, immobilisations et depreciation',
      inventory: 'Inventaire',
      overview: 'Vue d\'ensemble',
      immobilisations: 'Immobilisations',
      valueBrute: 'Valeur Stock CHF',
      valueNette: 'Valeur Nette',
      depreciations: 'Depreciations',
      tauxDeprec: 'Categories',
      valuePerYear: 'Valeur nette par annee',
      valuePerType: 'Valeur par categorie',
      article: 'Article',
      categorie: 'Categorie',
      quantite: 'Quantite',
      valeurCHF: 'Valeur CHF',
      valeurCFA: 'Valeur CFA',
      localisation: 'Localisation',
      statut: 'Statut',
      nom: 'Nom',
      type: 'Type',
      valeurBrute: 'Valeur Brute',
      valeurNette: 'Valeur Nette',
      tauxDepreciation: 'Taux Deprec.',
      actions: 'Actions',
      nouvelActif: 'Nouvel Actif',
      annuler: 'Annuler',
      creer: 'Creer',
      remplirChamps: 'Veuillez remplir les champs obligatoires'
    },
    EN: {
      title: 'Stock & Assets',
      subtitle: 'Inventory, fixed assets and depreciation',
      inventory: 'Inventory',
      overview: 'Overview',
      immobilisations: 'Fixed Assets',
      valueBrute: 'Stock Value CHF',
      valueNette: 'Net Value',
      depreciations: 'Depreciations',
      tauxDeprec: 'Categories',
      valuePerYear: 'Net value by year',
      valuePerType: 'Value by category',
      article: 'Item',
      categorie: 'Category',
      quantite: 'Quantity',
      valeurCHF: 'Value CHF',
      valeurCFA: 'Value CFA',
      localisation: 'Location',
      statut: 'Status',
      nom: 'Name',
      type: 'Type',
      valeurBrute: 'Gross Value',
      valeurNette: 'Net Value',
      tauxDepreciation: 'Depr. Rate',
      actions: 'Actions',
      nouvelActif: 'New Asset',
      annuler: 'Cancel',
      creer: 'Create',
      remplirChamps: 'Please fill in all required fields'
    },
    DE: {
      title: 'Bestand & Anlagen',
      subtitle: 'Inventar, Anlagen und Abschreibungen',
      inventory: 'Bestand',
      overview: 'Ubersicht',
      immobilisations: 'Anlagevermogen',
      valueBrute: 'Bestandswert CHF',
      valueNette: 'Nettowert',
      depreciations: 'Abschreibungen',
      tauxDeprec: 'Kategorien',
      valuePerYear: 'Nettowert pro Jahr',
      valuePerType: 'Wert nach Kategorie',
      article: 'Artikel',
      categorie: 'Kategorie',
      quantite: 'Menge',
      valeurCHF: 'Wert CHF',
      valeurCFA: 'Wert CFA',
      localisation: 'Standort',
      statut: 'Status',
      nom: 'Name',
      type: 'Typ',
      valeurBrute: 'Bruttowert',
      valeurNette: 'Nettowert',
      tauxDepreciation: 'Abschr. Satz',
      actions: 'Aktionen',
      nouvelActif: 'Neues Vermogen',
      annuler: 'Abbrechen',
      creer: 'Erstellen',
      remplirChamps: 'Bitte fullen Sie alle erforderlichen Felder aus'
    }
  };

  const t = translations[language] || translations.FR;

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['inventory', 'overview', 'immobilisations', 'risques'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const response = await api.getInventory(200, 0);
        const rows = Array.isArray(response?.data) ? response.data : [];
        setInventaire(rows.map(item => ({
          id: item.id || item.source_id || item.ref,
          article: item.article || item.name || '',
          categorie: item.categorie || '',
          quantite: Number(item.quantite ?? item.quantity ?? 0),
          valeurChf: Number(item.valeur_chf ?? item.price ?? 0),
          valeurCfa: Number(item.valeur_cfa ?? 0),
          localisation: item.localisation || '',
          statut: item.statut || item.status || ''
        })));
      } catch (error) {
        console.error('Erreur chargement inventaire:', error);
        setInventaire([]);
      }
    };

    loadInventory();
  }, []);

  useEffect(() => {
    setImmobilisations([
      { id: 1, nom: 'Bureau Principal Dakar', type: 'Immobilier', valeurAcquisition: 500000, dateAcquisition: '2020-01-15', dureeVie: 40, tauxDepreciation: 2.5, valeurNette: 475000 },
      { id: 2, nom: 'Serveur Principal', type: 'Informatique', valeurAcquisition: 50000, dateAcquisition: '2021-06-01', dureeVie: 5, tauxDepreciation: 20, valeurNette: 30000 },
      { id: 3, nom: 'Parc Vehicules', type: 'Transport', valeurAcquisition: 200000, dateAcquisition: '2019-03-20', dureeVie: 8, tauxDepreciation: 12.5, valeurNette: 100000 },
      { id: 4, nom: 'Mobilier Bureau', type: 'Mobilier', valeurAcquisition: 100000, dateAcquisition: '2022-01-10', dureeVie: 10, tauxDepreciation: 10, valeurNette: 80000 },
      { id: 5, nom: 'Equipements Reseau', type: 'Informatique', valeurAcquisition: 75000, dateAcquisition: '2021-09-15', dureeVie: 7, tauxDepreciation: 14.28, valeurNette: 45000 }
    ]);
  }, []);

  const totalInventaireChf = inventaire.reduce((sum, item) => sum + item.valeurChf, 0);
  const totalInventaireCfa = inventaire.reduce((sum, item) => sum + item.valeurCfa, 0);
  const totalQuantite = inventaire.reduce((sum, item) => sum + item.quantite, 0);
  const categoriesInventaire = new Set(inventaire.map(item => item.categorie).filter(Boolean)).size;
  const totalValeurNette = immobilisations.reduce((sum, item) => sum + item.valeurNette, 0);
  const totalDepreciation = immobilisations.reduce((sum, item) => sum + item.valeurAcquisition, 0) - totalValeurNette;

  const depreciationParAnnee = [
    { annee: '2020', valeur: 500000 },
    { annee: '2021', valeur: 480000 },
    { annee: '2022', valeur: 460000 },
    { annee: '2023', valeur: 440000 },
    { annee: '2024', valeur: 420000 },
    { annee: '2026', valeur: totalValeurNette }
  ];

  const inventaireParCategorie = useMemo(() => Object.values(inventaire.reduce((acc, item) => {
    const categorie = item.categorie || 'Autre';
    acc[categorie] = acc[categorie] || { type: categorie, valeur: 0 };
    acc[categorie].valeur += item.valeurChf;
    return acc;
  }, {})).slice(0, 8), [inventaire]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.nom || !formData.valeurAcquisition) {
      alert(t.remplirChamps);
      return;
    }
    setImmobilisations([...immobilisations, {
      ...formData,
      id: Date.now(),
      valeurAcquisition: parseFloat(formData.valeurAcquisition),
      valeurNette: parseFloat(formData.valeurAcquisition),
      tauxDepreciation: 0
    }]);
    setShowModal(false);
    setFormData({ nom: '', type: 'Immobilier', valeurAcquisition: '', dateAcquisition: new Date().toISOString().split('T')[0], dureeVie: '', depreciation: '' });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🏢 {t.title}</h1>
            <p className="text-slate-400">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">{t.valueBrute}</p>
                  <p className="text-white text-2xl font-bold">{totalInventaireChf.toLocaleString()}</p>
                </div>
                <Building2 size={32} className="text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
              <div>
                <p className="text-green-200 text-sm">{t.valeurCFA}</p>
                <p className="text-white text-2xl font-bold">{totalInventaireCfa.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
              <div>
                <p className="text-red-200 text-sm">{t.quantite}</p>
                <p className="text-white text-2xl font-bold">{totalQuantite.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm">{t.tauxDeprec}</p>
                  <p className="text-white text-2xl font-bold">{categoriesInventaire}</p>
                </div>
                <TrendingDown size={32} className="text-orange-400" />
              </div>
            </div>
          </div>

          <ModulePageTabs
            moduleId="stock"
            language={language}
            activeTab={activeTab}
            onSelect={setActiveTab}
            tabs={[
              { tab: 'overview', label: t.overview },
              { tab: 'inventory', label: `${t.inventory} (${inventaire.length})` },
              { tab: 'immobilisations', label: t.immobilisations }
            ]}
          />

          {activeTab === 'inventory' && (
            <TableControls rows={inventaire} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.article}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.categorie}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.quantite}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.valeurCHF}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.valeurCFA}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.localisation}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(item => (
                    <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{item.article}</td>
                      <td className="px-4 py-2 text-slate-400">{item.categorie}</td>
                      <td className="px-4 py-2 text-slate-400">{item.quantite.toLocaleString()}</td>
                      <td className="px-4 py-2 text-green-400 font-bold">{item.valeurChf.toLocaleString()}</td>
                      <td className="px-4 py-2 text-blue-400 font-bold">{item.valeurCfa.toLocaleString()}</td>
                      <td className="px-4 py-2 text-slate-400">{item.localisation}</td>
                      <td className="px-4 py-2 text-slate-400">{item.statut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-white font-bold mb-4">{t.valuePerYear}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={depreciationParAnnee}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="annee" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Line type="monotone" dataKey="valeur" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-white font-bold mb-4">{t.valuePerType}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventaireParCategorie}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="type" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Bar dataKey="valeur" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'immobilisations' && (
            <div>
              <div className="flex justify-end mb-4">
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  <Plus size={20} /> {t.nouvelActif}
                </button>
              </div>
              <TableControls rows={immobilisations} renderTable={(visibleRows) => (
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                      <th className="px-4 py-2 text-left text-white font-bold">{t.type}</th>
                      <th className="px-4 py-2 text-left text-white font-bold">{t.valeurBrute}</th>
                      <th className="px-4 py-2 text-left text-white font-bold">{t.valeurNette}</th>
                      <th className="px-4 py-2 text-left text-white font-bold">{t.tauxDepreciation}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map(item => (
                      <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                        <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                        <td className="px-4 py-2 text-slate-400">{item.type}</td>
                        <td className="px-4 py-2 text-slate-400">{item.valeurAcquisition.toLocaleString()}</td>
                        <td className="px-4 py-2 text-green-400 font-bold">{item.valeurNette.toLocaleString()}</td>
                        <td className="px-4 py-2 text-orange-400">{item.tauxDepreciation}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )} />
                <div className="px-4 py-3 border-t border-slate-700 text-sm text-slate-400">
                  Depreciations: {totalDepreciation.toLocaleString()}
                </div>
            </div>
          )}

          <ChildTabPlaceholder moduleId="stock" language={language} activeTab={activeTab} handledTabs={['inventory', 'overview', 'immobilisations']} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">{t.nouvelActif}</h2>
            <div className="space-y-4">
              <input type="text" placeholder={t.nom} value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
              <input type="number" placeholder={t.valeurBrute} value={formData.valeurAcquisition} onChange={(e) => handleFormChange('valeurAcquisition', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
              <LocalizedDateInput value={formData.dateAcquisition} onChange={(date) => handleFormChange('dateAcquisition', date)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white" />
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

export default Actifs;
