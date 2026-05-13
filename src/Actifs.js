import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit2, Trash2, Building2, TrendingDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Actifs = () => {
  const { language } = useLanguage();

  // Translations
  const translations = {
    FR: {
      title: 'Gestion des Actifs',
      subtitle: 'Immobilisations et Dépréciations',
      overview: 'Vue d\'ensemble',
      immobilisations: 'Immobilisations',
      valeurBrute: 'Valeur Brute',
      valeurNette: 'Valeur Nette',
      depreciations: 'Dépréciations',
      tauxDepreciation: 'Taux Dépréc.',
      valeurNetteparAnnee: 'Valeur Nette par Année',
      actifParType: 'Actif par Type',
      nom: 'Nom',
      type: 'Type',
      valeurAcquisition: 'Valeur Acquisition',
      dateAcquisition: 'Date Acquisition',
      dureeVie: 'Durée de Vie',
      depreciation: 'Dépréciation',
      actions: 'Actions',
      creer: 'Créer',
      modifier: 'Modifier',
      annuler: 'Annuler'
    },
    EN: {
      title: 'Asset Management',
      subtitle: 'Fixed Assets and Depreciation',
      overview: 'Overview',
      immobilisations: 'Fixed Assets',
      valeurBrute: 'Gross Value',
      valeurNette: 'Net Value',
      depreciations: 'Depreciation',
      tauxDepreciation: 'Depreciation Rate',
      valeurNetteparAnnee: 'Net Value per Year',
      actifParType: 'Assets by Type',
      nom: 'Name',
      type: 'Type',
      valeurAcquisition: 'Acquisition Value',
      dateAcquisition: 'Acquisition Date',
      dureeVie: 'Useful Life',
      depreciation: 'Depreciation',
      actions: 'Actions',
      creer: 'Create',
      modifier: 'Edit',
      annuler: 'Cancel'
    },
    DE: {
      title: 'Vermögensverwaltung',
      subtitle: 'Anlagevermögen und Abschreibung',
      overview: 'Übersicht',
      immobilisations: 'Anlagevermögen',
      valeurBrute: 'Bruttowert',
      valeurNette: 'Nettowert',
      depreciations: 'Abschreibung',
      tauxDepreciation: 'Abschreibungssatz',
      valeurNetteparAnnee: 'Nettowert pro Jahr',
      actifParType: 'Vermögenswerte nach Typ',
      nom: 'Name',
      type: 'Typ',
      valeurAcquisition: 'Anschaffungswert',
      dateAcquisition: 'Anschaffungsdatum',
      dureeVie: 'Nutzungsdauer',
      depreciation: 'Abschreibung',
      actions: 'Aktionen',
      creer: 'Erstellen',
      modifier: 'Bearbeiten',
      annuler: 'Abbrechen'
    }
  };

  const t = translations[language];
  const [activeTab, setActiveTab] = useState('overview');
  const [immobilisations, setImmobilisations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'Immobilier',
    valeurAcquisition: '',
    dateAcquisition: new Date().toISOString().split('T')[0],
    dureeVie: '',
    depreciation: ''
  });
 
  useEffect(() => {
    setImmobilisations([
      { id: 1, nom: 'Bureau Principal Dakar', type: 'Immobilier', valeurAcquisition: 500000, dateAcquisition: '2020-01-15', dureeVie: 40, tauxDepreciation: 2.5, valeurNette: 475000 },
      { id: 2, nom: 'Serveur Principal', type: 'Informatique', valeurAcquisition: 50000, dateAcquisition: '2021-06-01', dureeVie: 5, tauxDepreciation: 20, valeurNette: 30000 },
      { id: 3, nom: 'Parc Vehicules (5 véhicules)', type: 'Transport', valeurAcquisition: 200000, dateAcquisition: '2019-03-20', dureeVie: 8, tauxDepreciation: 12.5, valeurNette: 100000 },
      { id: 4, nom: 'Mobilier Bureau', type: 'Mobilier', valeurAcquisition: 100000, dateAcquisition: '2022-01-10', dureeVie: 10, tauxDepreciation: 10, valeurNette: 80000 },
      { id: 5, nom: 'Équipements Réseau', type: 'Informatique', valeurAcquisition: 75000, dateAcquisition: '2021-09-15', dureeVie: 7, tauxDepreciation: 14.28, valeurNette: 45000 },
    ]);
  }, []);
 
  const totalValeur = immobilisations.reduce((sum, a) => sum + a.valeurAcquisition, 0);
  const totalValeurNette = immobilisations.reduce((sum, a) => sum + a.valeurNette, 0);
  const totalDepreciation = totalValeur - totalValeurNette;
  const tauxDepreciationMoyen = Math.round((totalDepreciation / totalValeur) * 100);
 
  const depreciationParAnnee = [
    { annee: '2020', valeur: 500000 },
    { annee: '2021', valeur: 480000 },
    { annee: '2022', valeur: 460000 },
    { annee: '2023', valeur: 440000 },
    { annee: '2024', valeur: 420000 },
    { annee: '2026', valeur: totalValeur },
  ];
 
  const actifParType = [
    { type: 'Immobilier', count: immobilisations.filter(a => a.type === 'Immobilier').length, valeur: 500000 },
    { type: 'Informatique', count: immobilisations.filter(a => a.type === 'Informatique').length, valeur: 125000 },
    { type: 'Transport', count: immobilisations.filter(a => a.type === 'Transport').length, valeur: 200000 },
    { type: 'Mobilier', count: immobilisations.filter(a => a.type === 'Mobilier').length, valeur: 100000 },
  ];
 
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (!formData.nom || !formData.valeurAcquisition) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }
 
    if (editingId) {
      setImmobilisations(immobilisations.map(i => i.id === editingId ? { ...formData, id: editingId, valeurAcquisition: parseFloat(formData.valeurAcquisition) } : i));
    } else {
      setImmobilisations([...immobilisations, { ...formData, id: Date.now(), valeurAcquisition: parseFloat(formData.valeurAcquisition) }]);
    }
 
    setShowModal(false);
    setEditingId(null);
    setFormData({ nom: '', type: 'Immobilier', valeurAcquisition: '', dateAcquisition: new Date().toISOString().split('T')[0], dureeVie: '', depreciation: '' });
  };
 
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setShowModal(true);
  };
 
  const handleDelete = (id) => {
    setImmobilisations(immobilisations.filter(i => i.id !== id));
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
 
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏢 Gestion des Actifs</h1>
          <p className="text-slate-400">Immobilisations et Dépréciations</p>
        </div>
 
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Valeur Brute</p>
                <p className="text-white text-2xl font-bold">{totalValeur.toLocaleString()}</p>
              </div>
              <Building2 size={32} className="text-blue-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Valeur Nette</p>
                <p className="text-white text-2xl font-bold">{totalValeurNette.toLocaleString()}</p>
              </div>
              <Building2 size={32} className="text-green-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm">Dépréciations</p>
                <p className="text-white text-2xl font-bold">{totalDepreciation.toLocaleString()}</p>
              </div>
              <TrendingDown size={32} className="text-red-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Taux Dépréc.</p>
                <p className="text-white text-2xl font-bold">{tauxDepreciationMoyen}%</p>
              </div>
              <TrendingDown size={32} className="text-orange-400" />
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Vue d'ensemble</button>
          <button onClick={() => setActiveTab('immobilisations')} className={`px-4 py-3 font-medium ${activeTab === 'immobilisations' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Immobilisations</button>
        </div>
 
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Valeur Nette par Année</h3>
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
              <h3 className="text-white font-bold mb-4">Valeur par Type d'Actif</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={actifParType}>
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
 
        {/* Immobilisations */}
        {activeTab === 'immobilisations' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setFormData({ nom: '', type: 'Immobilier', valeurAcquisition: '', dateAcquisition: new Date().toISOString().split('T')[0], dureeVie: '', depreciation: '' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> Nouvel Actif
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">Nom</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Type</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Valeur Brute</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Valeur Nette</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Taux Dépréc.</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {immobilisations.map(a => (
                    <tr key={a.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{a.nom}</td>
                      <td className="px-4 py-2 text-slate-400">{a.type}</td>
                      <td className="px-4 py-2 text-slate-400">{a.valeurAcquisition.toLocaleString()}</td>
                      <td className="px-4 py-2 text-green-400 font-bold">{a.valeurNette.toLocaleString()}</td>
                      <td className="px-4 py-2 text-orange-400">{a.tauxDepreciation}%</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit(a)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDelete(a.id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Nouvel Actif</h2>
 
            <div className="space-y-4">
              <input type="text" placeholder="Nom" value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <select value={formData.type} onChange={(e) => handleFormChange('type', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                <option>Immobilier</option>
                <option>Informatique</option>
                <option>Transport</option>
                <option>Mobilier</option>
              </select>
              <input type="number" placeholder="Valeur Acquisition" value={formData.valeurAcquisition} onChange={(e) => handleFormChange('valeurAcquisition', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <input type="date" value={formData.dateAcquisition} onChange={(e) => handleFormChange('dateAcquisition', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
            </div>
 
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Annuler</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">Créer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Actifs;