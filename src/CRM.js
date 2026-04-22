import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart } from 'recharts';
import { Plus, Edit2, Trash2, Users, TrendingUp, Gift, Target } from 'lucide-react';
 
const CRM = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [prospects, setProspects] = useState([]);
  const [clients, setClients] = useState([]);
  const [dons, setDons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('prospect');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    statut: 'Nouveau',
    montant: '',
    date: new Date().toISOString().split('T')[0],
    categorie: ''
  });
 
  useEffect(() => {
    setProspects([
      { id: 1, nom: 'Entreprise Tech A', email: 'contact@techa.com', telephone: '+221 77 123 4567', statut: 'Qualifié', dateContact: '2026-04-10', valeur: 50000 },
      { id: 2, nom: 'ONG Solidarité', email: 'info@ong-sol.org', telephone: '+221 77 234 5678', statut: 'Nouveau', dateContact: '2026-04-15', valeur: 30000 },
      { id: 3, nom: 'Gouvernement Local', email: 'admin@gouv.sn', telephone: '+221 77 345 6789', statut: 'Qualifié', dateContact: '2026-04-12', valeur: 100000 },
      { id: 4, nom: 'Entreprise Privée B', email: 'contact@entb.com', telephone: '+221 77 456 7890', statut: 'Négociation', dateContact: '2026-04-08', valeur: 75000 },
    ]);
 
    setClients([
      { id: 1, nom: 'SENELEC', email: 'contact@senelec.sn', telephone: '+221 33 889 0000', statut: 'Actif', dateDebut: '2025-06-01', valeurAnnuelle: 120000 },
      { id: 2, nom: 'Université Cheikh Anta Diop', email: 'admin@ucad.edu.sn', telephone: '+221 33 824 0000', statut: 'Actif', dateDebut: '2025-08-15', valeurAnnuelle: 80000 },
      { id: 3, nom: 'Ministère Santé', email: 'info@sante.gouv.sn', telephone: '+221 33 829 0000', statut: 'Inactif', dateDebut: '2024-01-10', valeurAnnuelle: 0 },
      { id: 4, nom: 'Orange Sénégal', email: 'corporate@orange.sn', telephone: '+221 33 839 0000', statut: 'Actif', dateDebut: '2025-11-01', valeurAnnuelle: 150000 },
      { id: 5, nom: 'Banque Sénégalaise', email: 'partnership@banque.sn', telephone: '+221 33 849 0000', statut: 'Actif', dateDebut: '2025-03-20', valeurAnnuelle: 100000 },
    ]);
 
    setDons([
      { id: 1, donateur: 'Entreprise Tech A', montant: 5000, devise: 'CHF', date: '2026-04-01', categorie: 'Donation' },
      { id: 2, donateur: 'Fondation Internationale', montant: 10000, devise: 'EUR', date: '2026-03-15', categorie: 'Fondation' },
      { id: 3, donateur: 'Individu Particulier', montant: 500, devise: 'CHF', date: '2026-04-10', categorie: 'Particulier' },
      { id: 4, donateur: 'ONG Partenaire', montant: 3000, devise: 'CHF', date: '2026-03-25', categorie: 'Partenariat' },
      { id: 5, donateur: 'Gouvernement Local', montant: 20000, devise: 'CFA', date: '2026-02-20', categorie: 'Public' },
    ]);
  }, []);
 
  const totalProspects = prospects.length;
  const prospectQualifies = prospects.filter(p => p.statut === 'Qualifié').length;
  const totalClients = clients.filter(c => c.statut === 'Actif').length;
  const totalDons = dons.reduce((sum, d) => sum + d.montant, 0);
  const tauxConversion = totalClients > 0 ? Math.round((totalClients / (totalProspects + totalClients)) * 100) : 0;
 
  const pipelineData = [
    { nom: 'Nouveau', count: prospects.filter(p => p.statut === 'Nouveau').length },
    { nom: 'Qualifié', count: prospectQualifies },
    { nom: 'Négociation', count: prospects.filter(p => p.statut === 'Négociation').length },
  ];
 
  const clientsStatut = [
    { nom: 'Actifs', count: clients.filter(c => c.statut === 'Actif').length },
    { nom: 'Inactifs', count: clients.filter(c => c.statut === 'Inactif').length },
  ];
 
  const donsMensuel = [
    { mois: 'Jan', montant: 5000 },
    { mois: 'Fév', montant: 23000 },
    { mois: 'Mar', montant: 13500 },
    { mois: 'Avr', montant: totalDons },
  ];
 
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
 
  const handleSave = () => {
    if (!formData.nom || !formData.email) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }
 
    if (modalType === 'prospect') {
      if (editingId) {
        setProspects(prospects.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      } else {
        setProspects([...prospects, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'client') {
      if (editingId) {
        setClients(clients.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
      } else {
        setClients([...clients, { ...formData, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setDons(dons.map(d => d.id === editingId ? { ...formData, id: editingId, montant: parseFloat(formData.montant) } : d));
      } else {
        setDons([...dons, { ...formData, id: Date.now(), montant: parseFloat(formData.montant) }]);
      }
    }
 
    setShowModal(false);
    setEditingId(null);
    setFormData({ nom: '', email: '', telephone: '', statut: 'Nouveau', montant: '', date: new Date().toISOString().split('T')[0], categorie: '' });
  };
 
  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
    setShowModal(true);
  };
 
  const handleDelete = (type, id) => {
    if (type === 'prospect') setProspects(prospects.filter(p => p.id !== id));
    else if (type === 'client') setClients(clients.filter(c => c.id !== id));
    else setDons(dons.filter(d => d.id !== id));
  };
 
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
 
  const Table = ({ data, type, onEdit, onDelete, onAdd, columns }) => (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => { setEditingId(null); setFormData({ nom: '', email: '', telephone: '', statut: 'Nouveau', montant: '', date: new Date().toISOString().split('T')[0], categorie: '' }); setModalType(type); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          <Plus size={20} /> Ajouter
        </button>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-2 text-left text-white font-bold">{col}</th>
              ))}
              <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                {type === 'prospect' && (
                  <>
                    <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                    <td className="px-4 py-2 text-slate-400 text-xs">{item.email}</td>
                    <td className="px-4 py-2 text-slate-400">{item.statut}</td>
                    <td className="px-4 py-2 text-slate-400">{item.valeur.toLocaleString()} CHF</td>
                  </>
                )}
                {type === 'client' && (
                  <>
                    <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                    <td className="px-4 py-2 text-slate-400 text-xs">{item.email}</td>
                    <td className="px-4 py-2 text-slate-400">{item.statut}</td>
                    <td className="px-4 py-2 text-green-400 font-bold">{item.valeurAnnuelle.toLocaleString()} CHF</td>
                  </>
                )}
                {type === 'don' && (
                  <>
                    <td className="px-4 py-2 text-slate-300 font-medium">{item.donateur}</td>
                    <td className="px-4 py-2 text-slate-400">{item.categorie}</td>
                    <td className="px-4 py-2 text-slate-400">{item.devise}</td>
                    <td className="px-4 py-2 text-green-400 font-bold">{item.montant.toLocaleString()}</td>
                  </>
                )}
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(type, item)} className="p-1 hover:bg-slate-600 rounded">
                    <Edit2 size={16} className="text-blue-400" />
                  </button>
                  <button onClick={() => handleDelete(type, item.id)} className="p-1 hover:bg-slate-600 rounded">
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
 
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💼 CRM - Gestion Commerciale</h1>
          <p className="text-slate-400">Prospects, Clients et Donations</p>
        </div>
 
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Prospects</p>
                <p className="text-white text-2xl font-bold">{totalProspects}</p>
              </div>
              <Target size={32} className="text-blue-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Clients Actifs</p>
                <p className="text-white text-2xl font-bold">{totalClients}</p>
              </div>
              <Users size={32} className="text-green-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Dons</p>
                <p className="text-white text-2xl font-bold">{totalDons.toLocaleString()}</p>
              </div>
              <Gift size={32} className="text-purple-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Taux Conversion</p>
                <p className="text-white text-2xl font-bold">{tauxConversion}%</p>
              </div>
              <TrendingUp size={32} className="text-orange-400" />
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 rounded-lg p-6 border border-cyan-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-200 text-sm">Prospects Qualifiés</p>
                <p className="text-white text-2xl font-bold">{prospectQualifies}</p>
              </div>
              <TrendingUp size={32} className="text-cyan-400" />
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Vue d'ensemble</button>
          <button onClick={() => setActiveTab('prospects')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'prospects' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Prospects ({totalProspects})</button>
          <button onClick={() => setActiveTab('clients')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'clients' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Clients ({totalClients})</button>
          <button onClick={() => setActiveTab('dons')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'dons' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Donations</button>
        </div>
 
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Pipeline Prospects</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pipelineData} cx="50%" cy="50%" labelLine={false} label={({ nom, count }) => `${nom}: ${count}`} outerRadius={80} fill="#8884d8" dataKey="count">
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
 
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Statut Clients</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={clientsStatut} cx="50%" cy="50%" labelLine={false} label={({ nom, count }) => `${nom}: ${count}`} outerRadius={80} fill="#8884d8" dataKey="count">
                    {clientsStatut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
 
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Donations Mensuelles</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={donsMensuel}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Line type="monotone" dataKey="montant" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
 
        {/* Prospects */}
        {activeTab === 'prospects' && (
          <Table data={prospects} type="prospect" onEdit={handleEdit} onDelete={handleDelete} columns={['Nom', 'Email', 'Statut', 'Valeur']} />
        )}
 
        {/* Clients */}
        {activeTab === 'clients' && (
          <Table data={clients} type="client" onEdit={handleEdit} onDelete={handleDelete} columns={['Nom', 'Email', 'Statut', 'Valeur Annuelle']} />
        )}
 
        {/* Donations */}
        {activeTab === 'dons' && (
          <Table data={dons} type="don" onEdit={handleEdit} onDelete={handleDelete} columns={['Donateur', 'Catégorie', 'Devise', 'Montant']} />
        )}
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? `Modifier ${modalType}` : `Nouveau ${modalType}`}
            </h2>
 
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom/Donateur *</label>
                <input type="text" value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                <input type="tel" value={formData.telephone} onChange={(e) => handleFormChange('telephone', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>
 
              {modalType !== 'don' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                  <select value={formData.statut} onChange={(e) => handleFormChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    {modalType === 'prospect' ? (
                      <>
                        <option>Nouveau</option>
                        <option>Qualifié</option>
                        <option>Négociation</option>
                      </>
                    ) : (
                      <>
                        <option>Actif</option>
                        <option>Inactif</option>
                      </>
                    )}
                  </select>
                </div>
              )}
 
              {modalType === 'don' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Montant</label>
                    <input type="number" value={formData.montant} onChange={(e) => handleFormChange('montant', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
                  </div>
 
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Devise</label>
                    <select value={formData.devise} onChange={(e) => handleFormChange('devise', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                      <option>CHF</option>
                      <option>CFA</option>
                      <option>EUR</option>
                    </select>
                  </div>
 
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie</label>
                    <input type="text" value={formData.categorie} onChange={(e) => handleFormChange('categorie', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Donation, Fondation, etc" />
                  </div>
                </>
              )}
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                <input type="date" value={formData.date} onChange={(e) => handleFormChange('date', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
 
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Annuler</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{editingId ? 'Modifier' : 'Créer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default CRM;
 