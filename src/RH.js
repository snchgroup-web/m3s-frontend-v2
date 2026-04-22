import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Plus, Edit2, Trash2, Users, User, Heart, Users2, Briefcase } from 'lucide-react';

const RH = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [employes, setEmployes] = useState([]);
  const [benevoles, setBenevoles] = useState([]);
  const [membres, setMembres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('employe'); // 'employe', 'benevole', 'membre'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    poste: '',
    departement: '',
    dateEmbauche: new Date().toISOString().split('T')[0],
    statut: 'Actif'
  });

  // Données de démo
  useEffect(() => {
    setEmployes([
      { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@seneswiss.sn', telephone: '+221 77 123 4567', poste: 'Développeur', departement: 'IT', dateEmbauche: '2024-01-15', statut: 'Actif' },
      { id: 2, nom: 'Marie Sall', email: 'marie.sall@seneswiss.sn', telephone: '+221 77 234 5678', poste: 'Responsable Finance', departement: 'Finance', dateEmbauche: '2023-06-01', statut: 'Actif' },
      { id: 3, nom: 'Pierre Ndiaye', email: 'pierre.ndiaye@seneswiss.sn', telephone: '+221 77 345 6789', poste: 'Manager', departement: 'Gestion', dateEmbauche: '2022-03-10', statut: 'Actif' },
      { id: 4, nom: 'Sophie Ba', email: 'sophie.ba@seneswiss.sn', telephone: '+221 77 456 7890', poste: 'Responsable RH', departement: 'RH', dateEmbauche: '2023-09-01', statut: 'Actif' },
    ]);

    setBenevoles([
      { id: 1, nom: 'Abdoulaye Diop', email: 'abdoulaye@example.com', telephone: '+221 77 567 8901', poste: 'Bénévole IT', departement: 'IT', dateEmbauche: '2024-02-01', statut: 'Actif' },
      { id: 2, nom: 'Fatoumata Cisse', email: 'fatoumata@example.com', telephone: '+221 77 678 9012', poste: 'Bénévole Social', departement: 'Social', dateEmbauche: '2023-10-15', statut: 'Actif' },
      { id: 3, nom: 'Ousmane Toure', email: 'ousmane@example.com', telephone: '+221 77 789 0123', poste: 'Bénévole Événements', departement: 'Événements', dateEmbauche: '2024-01-20', statut: 'Inactif' },
    ]);

    setMembres([
      { id: 1, nom: 'Assane Seck', email: 'assane@seneswiss.sn', telephone: '+221 77 890 1234', poste: 'Membre', departement: 'Général', dateEmbauche: '2020-05-10', statut: 'Actif' },
      { id: 2, nom: 'Hawa Diallo', email: 'hawa@seneswiss.sn', telephone: '+221 77 901 2345', poste: 'Membre Fondateur', departement: 'Général', dateEmbauche: '2019-01-01', statut: 'Actif' },
      { id: 3, nom: 'Moussa Fall', email: 'moussa@seneswiss.sn', telephone: '+221 77 012 3456', poste: 'Membre', departement: 'Général', dateEmbauche: '2021-03-15', statut: 'Actif' },
      { id: 4, nom: 'Awa Niang', email: 'awa@seneswiss.sn', telephone: '+221 77 123 0456', poste: 'Membre', departement: 'Général', dateEmbauche: '2022-08-20', statut: 'Actif' },
      { id: 5, nom: 'Cheikh Sarr', email: 'cheikh.s@seneswiss.sn', telephone: '+221 77 234 0567', poste: 'Membre', departement: 'Général', dateEmbauche: '2023-11-01', statut: 'Actif' },
    ]);
  }, []);

  // Calculs KPIs
  const totalEmployes = employes.filter(e => e.statut === 'Actif').length;
  const totalBenevoles = benevoles.filter(b => b.statut === 'Actif').length;
  const totalMembres = membres.filter(m => m.statut === 'Actif').length;
  const totalPersonnes = totalEmployes + totalBenevoles + totalMembres;

  // Données pour charts
  const staffDistribution = [
    { name: 'Employés', value: totalEmployes },
    { name: 'Bénévoles', value: totalBenevoles },
    { name: 'Membres', value: totalMembres },
  ];

  const monthlyData = [
    { mois: 'Jan', employes: 3, benevoles: 2, membres: 4 },
    { mois: 'Fév', employes: 3, benevoles: 2, membres: 4 },
    { mois: 'Mar', employes: 3, benevoles: 3, membres: 5 },
    { mois: 'Avr', employes: totalEmployes, benevoles: totalBenevoles, membres: totalMembres },
  ];

  const departementStats = [
    { dept: 'IT', count: employes.filter(e => e.departement === 'IT').length + benevoles.filter(b => b.departement === 'IT').length },
    { dept: 'Finance', count: employes.filter(e => e.departement === 'Finance').length },
    { dept: 'RH', count: employes.filter(e => e.departement === 'RH').length },
    { dept: 'Gestion', count: employes.filter(e => e.departement === 'Gestion').length },
    { dept: 'Social', count: benevoles.filter(b => b.departement === 'Social').length },
  ];

  // Gestion formulaire
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.nom || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (modalType === 'employe') {
      if (editingId) {
        setEmployes(employes.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
      } else {
        setEmployes([...employes, { ...formData, id: Date.now() }]);
      }
    } else if (modalType === 'benevole') {
      if (editingId) {
        setBenevoles(benevoles.map(b => b.id === editingId ? { ...formData, id: editingId } : b));
      } else {
        setBenevoles([...benevoles, { ...formData, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setMembres(membres.map(m => m.id === editingId ? { ...formData, id: editingId } : m));
      } else {
        setMembres([...membres, { ...formData, id: Date.now() }]);
      }
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ nom: '', email: '', telephone: '', poste: '', departement: '', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (type, id) => {
    if (type === 'employe') setEmployes(employes.filter(e => e.id !== id));
    else if (type === 'benevole') setBenevoles(benevoles.filter(b => b.id !== id));
    else setMembres(membres.filter(m => m.id !== id));
  };

  const openNewModal = (type) => {
    setModalType(type);
    setEditingId(null);
    setFormData({ nom: '', email: '', telephone: '', poste: '', departement: '', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
    setShowModal(true);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Table réutilisable
  const PersonnelTable = ({ data, type, onEdit, onDelete, onAdd }) => (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => onAdd(type)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          <Plus size={20} /> Ajouter
        </button>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 py-2 text-left text-white font-bold">Nom</th>
              <th className="px-4 py-2 text-left text-white font-bold">Email</th>
              <th className="px-4 py-2 text-left text-white font-bold">Téléphone</th>
              <th className="px-4 py-2 text-left text-white font-bold">Poste</th>
              <th className="px-4 py-2 text-left text-white font-bold">Département</th>
              <th className="px-4 py-2 text-left text-white font-bold">Statut</th>
              <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                <td className="px-4 py-2 text-slate-400 text-xs">{item.email}</td>
                <td className="px-4 py-2 text-slate-400 text-xs">{item.telephone}</td>
                <td className="px-4 py-2 text-slate-300">{item.poste}</td>
                <td className="px-4 py-2 text-slate-400">{item.departement}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${item.statut === 'Actif' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {item.statut}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => onEdit(type, item)} className="p-1 hover:bg-slate-600 rounded">
                    <Edit2 size={16} className="text-blue-400" />
                  </button>
                  <button onClick={() => onDelete(type, item.id)} className="p-1 hover:bg-slate-600 rounded">
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
          <h1 className="text-4xl font-bold text-white mb-2">👥 Ressources Humaines</h1>
          <p className="text-slate-400">Gestion des Employés, Bénévoles et Membres</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Employés</p>
                <p className="text-white text-2xl font-bold">{totalEmployes}</p>
              </div>
              <User size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Bénévoles</p>
                <p className="text-white text-2xl font-bold">{totalBenevoles}</p>
              </div>
              <Heart size={32} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Membres</p>
                <p className="text-white text-2xl font-bold">{totalMembres}</p>
              </div>
              <Users2 size={32} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Total Personnel</p>
                <p className="text-white text-2xl font-bold">{totalPersonnes}</p>
              </div>
              <Users size={32} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Vue d'ensemble</button>
          <button onClick={() => setActiveTab('employes')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'employes' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Employés ({totalEmployes})</button>
          <button onClick={() => setActiveTab('benevoles')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'benevoles' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Bénévoles ({totalBenevoles})</button>
          <button onClick={() => setActiveTab('membres')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'membres' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Membres ({totalMembres})</button>
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Distribution Personnel */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Distribution Personnel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={staffDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {staffDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Évolution Mensuelle */}
            <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Évolution Personnel par Mois</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="employes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="benevoles" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="membres" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Statistiques par Département */}
            <div className="lg:col-span-3 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Personnel par Département</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departementStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="dept" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Employés */}
        {activeTab === 'employes' && (
          <PersonnelTable data={employes} type="employe" onEdit={handleEdit} onDelete={handleDelete} onAdd={openNewModal} />
        )}

        {/* Bénévoles */}
        {activeTab === 'benevoles' && (
          <PersonnelTable data={benevoles} type="benevole" onEdit={handleEdit} onDelete={handleDelete} onAdd={openNewModal} />
        )}

        {/* Membres */}
        {activeTab === 'membres' && (
          <PersonnelTable data={membres} type="membre" onEdit={handleEdit} onDelete={handleDelete} onAdd={openNewModal} />
        )}
      </div>

      {/* Modal Créer/Éditer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? `Modifier ${modalType}` : `Nouveau ${modalType}`}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
                <input type="text" value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Nom complet" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                <input type="tel" value={formData.telephone} onChange={(e) => handleFormChange('telephone', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="+221 77 123 4567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Poste</label>
                <input type="text" value={formData.poste} onChange={(e) => handleFormChange('poste', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="ex: Développeur" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Département</label>
                <select value={formData.departement} onChange={(e) => handleFormChange('departement', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option value="">Sélectionner</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>RH</option>
                  <option>Gestion</option>
                  <option>Social</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Date d'embauche</label>
                <input type="date" value={formData.dateEmbauche} onChange={(e) => handleFormChange('dateEmbauche', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                <select value={formData.statut} onChange={(e) => handleFormChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option>Actif</option>
                  <option>Inactif</option>
                  <option>Congé</option>
                </select>
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

export default RH;
