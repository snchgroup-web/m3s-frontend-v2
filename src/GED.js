import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit2, Trash2, FileText, Folder, Download, Upload } from 'lucide-react';
 
const GED = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [documents, setDocuments] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('document');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    type: 'PDF',
    dossier: '',
    dateCreation: new Date().toISOString().split('T')[0],
    taille: '',
    statut: 'Actif'
  });
 
  useEffect(() => {
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
  const totalTaille = (45 + 120 + 65 + 180 + 25 + 85);
  const documentsActifs = documents.filter(d => d.statut === 'Actif').length;
 
  const documentParType = [
    { type: 'PDF', count: documents.filter(d => d.type === 'PDF').length },
    { type: 'Excel', count: documents.filter(d => d.type === 'Excel').length },
    { type: 'Word', count: documents.filter(d => d.type === 'Word').length },
  ];
 
  const dossierStats = dossiers.map(d => ({
    nom: d.nom,
    docs: d.nombreDocs,
    taille: parseInt(d.taille)
  }));
 
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (!formData.nom) {
      alert('Veuillez remplir les champs obligatoires');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
 
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📄 Gestion Électronique Documents</h1>
          <p className="text-slate-400">Archivage et Organisation des Documents</p>
        </div>
 
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Documents</p>
                <p className="text-white text-2xl font-bold">{totalDocuments}</p>
              </div>
              <FileText size={32} className="text-blue-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Dossiers</p>
                <p className="text-white text-2xl font-bold">{totalDossiers}</p>
              </div>
              <Folder size={32} className="text-green-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Stockage Total</p>
                <p className="text-white text-2xl font-bold">{totalTaille} MB</p>
              </div>
              <Upload size={32} className="text-purple-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Documents Actifs</p>
                <p className="text-white text-2xl font-bold">{documentsActifs}</p>
              </div>
              <Download size={32} className="text-orange-400" />
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Vue d'ensemble</button>
          <button onClick={() => setActiveTab('documents')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Documents</button>
          <button onClick={() => setActiveTab('dossiers')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'dossiers' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Dossiers</button>
        </div>
 
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Documents par Type</h3>
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
              <h3 className="text-white font-bold mb-4">Taille par Dossier</h3>
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
                <Plus size={20} /> Nouveau Document
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">Nom</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Type</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Dossier</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Taille</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Date</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(d => (
                    <tr key={d.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{d.nom}</td>
                      <td className="px-4 py-2 text-slate-400">{d.type}</td>
                      <td className="px-4 py-2 text-slate-400">{d.dossier}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{d.taille}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{d.dateCreation}</td>
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
            </div>
          </div>
        )}
 
        {/* Dossiers */}
        {activeTab === 'dossiers' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setModalType('dossier'); setFormData({ nom: '', type: 'PDF', dossier: '', dateCreation: new Date().toISOString().split('T')[0], taille: '', statut: 'Actif' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                <Plus size={20} /> Nouveau Dossier
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">Nom Dossier</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Documents</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Taille</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Créé</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dossiers.map(d => (
                    <tr key={d.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{d.nom}</td>
                      <td className="px-4 py-2 text-slate-400">{d.nombreDocs}</td>
                      <td className="px-4 py-2 text-slate-400">{d.taille}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{d.dateCreation}</td>
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
            </div>
          </div>
        )}
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Nouvel Élément</h2>
 
            <div className="space-y-4">
              <input type="text" placeholder="Nom" value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              <select value={formData.type} onChange={(e) => handleFormChange('type', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
              </select>
              <input type="date" value={formData.dateCreation} onChange={(e) => handleFormChange('dateCreation', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
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
 
export default GED;