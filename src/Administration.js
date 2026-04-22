import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Plus, Edit2, Trash2, Shield, Users, Lock, Activity, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [userFormData, setUserFormData] = useState({
    nom: '',
    email: '',
    role: 'Viewer',
    statut: 'Actif',
    dateCreation: new Date().toISOString().split('T')[0]
  });
  const [roleFormData, setRoleFormData] = useState({
    nom: '',
    permissions: [],
    description: ''
  });

  // Données de démo
  useEffect(() => {
    setUsers([
      { id: 1, nom: 'Cheikh Sall', email: 'cheikh@seneswiss.sn', role: 'Manager', statut: 'Actif', dateCreation: '2026-01-15' },
      { id: 2, nom: 'Chantal Ba', email: 'chantal@seneswiss.sn', role: 'Admin Finance', statut: 'Actif', dateCreation: '2026-02-01' },
      { id: 3, nom: 'Pape Ndiaye', email: 'pape@seneswiss.sn', role: 'Administrateur', statut: 'Actif', dateCreation: '2026-03-10' },
      { id: 4, nom: 'Gnilane Diop', email: 'gnilane.d@seneswiss.sn', role: 'Chef Projet', statut: 'Actif', dateCreation: '2026-03-20' },
      { id: 5, nom: 'Ibou Seck', email: 'ibou@seneswiss.sn', role: 'Chef Opérations', statut: 'Actif', dateCreation: '2026-02-15' },
    ]);

    setRoles([
      { id: 1, nom: 'Manager', permissions: ['Read', 'Create', 'Update', 'Delete', 'Admin'], description: 'Accès complet à tous les modules' },
      { id: 2, nom: 'Administrateur', permissions: ['Read', 'Create', 'Update', 'Delete', 'Audit'], description: 'Gestion système et permissions' },
      { id: 3, nom: 'Admin Finance', permissions: ['Read Finance', 'Create Finance', 'Update Finance', 'Export'], description: 'Gestion finances uniquement' },
      { id: 4, nom: 'Chef Projet', permissions: ['Read', 'Create', 'Update'], description: 'Coordination et suivi' },
      { id: 5, nom: 'Chef Opérations', permissions: ['Read', 'Create', 'Update'], description: 'Gestion opérations' },
      { id: 6, nom: 'Viewer', permissions: ['Read'], description: 'Lecture seule' },
    ]);

    setAuditLogs([
      { id: 1, utilisateur: 'Cheikh Sall', action: 'LOGIN', module: 'Auth', timestamp: '2026-04-22 15:30:00', statut: 'Success' },
      { id: 2, utilisateur: 'Chantal Ba', action: 'CREATE', module: 'Finance', timestamp: '2026-04-22 15:25:00', statut: 'Success' },
      { id: 3, utilisateur: 'Pape Ndiaye', action: 'UPDATE', module: 'Users', timestamp: '2026-04-22 15:20:00', statut: 'Success' },
      { id: 4, utilisateur: 'Gnilane Diop', action: 'READ', module: 'Dashboard', timestamp: '2026-04-22 15:15:00', statut: 'Success' },
      { id: 5, utilisateur: 'Ibou Seck', action: 'DELETE', module: 'Finance', timestamp: '2026-04-22 15:10:00', statut: 'Success' },
      { id: 6, utilisateur: 'Cheikh Sall', action: 'EXPORT', module: 'Finance', timestamp: '2026-04-22 15:05:00', statut: 'Success' },
      { id: 7, utilisateur: 'Chantal Ba', action: 'LOGIN', module: 'Auth', timestamp: '2026-04-22 14:45:00', statut: 'Success' },
      { id: 8, utilisateur: 'Pape Ndiaye', action: 'LOGIN_FAILED', module: 'Auth', timestamp: '2026-04-22 14:30:00', statut: 'Failed' },
    ]);
  }, []);

  // Calculs KPIs
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.statut === 'Actif').length;
  const totalRoles = roles.length;
  const auditCount = auditLogs.length;
  const failedLogins = auditLogs.filter(log => log.statut === 'Failed').length;

  // Données pour charts
  const roleDistribution = roles.map(r => ({
    name: r.nom,
    count: users.filter(u => u.role === r.nom).length
  }));

  const auditActivity = [
    { action: 'LOGIN', count: auditLogs.filter(log => log.action === 'LOGIN').length },
    { action: 'CREATE', count: auditLogs.filter(log => log.action === 'CREATE').length },
    { action: 'UPDATE', count: auditLogs.filter(log => log.action === 'UPDATE').length },
    { action: 'DELETE', count: auditLogs.filter(log => log.action === 'DELETE').length },
    { action: 'READ', count: auditLogs.filter(log => log.action === 'READ').length },
  ];

  const dailyActivity = [
    { jour: 'Lun', actions: 8 },
    { jour: 'Mar', actions: 12 },
    { jour: 'Mer', actions: 15 },
    { jour: 'Jeu', actions: 10 },
    { jour: 'Ven', actions: auditCount },
  ];

  // Gestion formulaires
  const handleUserChange = (field, value) => {
    setUserFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (field, value) => {
    setRoleFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = () => {
    if (!userFormData.nom || !userFormData.email) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...userFormData, id: editingId } : u));
    } else {
      setUsers([...users, { ...userFormData, id: Date.now() }]);
    }

    setShowUserModal(false);
    setEditingId(null);
    setUserFormData({ nom: '', email: '', role: 'Viewer', statut: 'Actif', dateCreation: new Date().toISOString().split('T')[0] });
  };

  const handleSaveRole = () => {
    if (!roleFormData.nom) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    if (editingId) {
      setRoles(roles.map(r => r.id === editingId ? { ...roleFormData, id: editingId } : r));
    } else {
      setRoles([...roles, { ...roleFormData, id: Date.now() }]);
    }

    setShowRoleModal(false);
    setEditingId(null);
    setRoleFormData({ nom: '', permissions: [], description: '' });
  };

  const handleEditUser = (user) => {
    setEditingId(user.id);
    setUserFormData(user);
    setShowUserModal(true);
  };

  const handleEditRole = (role) => {
    setEditingId(role.id);
    setRoleFormData(role);
    setShowRoleModal(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">⚙️ Administration</h1>
          <p className="text-slate-400">Gestion des Utilisateurs, Rôles et Audit Trail</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Utilisateurs</p>
                <p className="text-white text-2xl font-bold">{totalUsers}</p>
              </div>
              <Users size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Utilisateurs Actifs</p>
                <p className="text-white text-2xl font-bold">{activeUsers}</p>
              </div>
              <AlertCircle size={32} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Rôles</p>
                <p className="text-white text-2xl font-bold">{totalRoles}</p>
              </div>
              <Lock size={32} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Audit Logs</p>
                <p className="text-white text-2xl font-bold">{auditCount}</p>
              </div>
              <Activity size={32} className="text-orange-400" />
            </div>
          </div>

          <div className={`bg-gradient-to-br ${failedLogins === 0 ? 'from-green-900 to-green-800' : 'from-red-900 to-red-800'} rounded-lg p-6 border ${failedLogins === 0 ? 'border-green-700' : 'border-red-700'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${failedLogins === 0 ? 'text-green-200' : 'text-red-200'} text-sm`}>Connexions Échouées</p>
                <p className="text-white text-2xl font-bold">{failedLogins}</p>
              </div>
              <Shield size={32} className={failedLogins === 0 ? 'text-green-400' : 'text-red-400'} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Vue d'ensemble</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Utilisateurs ({totalUsers})</button>
          <button onClick={() => setActiveTab('roles')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'roles' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Rôles ({totalRoles})</button>
          <button onClick={() => setActiveTab('audit')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'audit' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>Audit Log</button>
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribution des rôles */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Distribution des Rôles</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={roleDistribution.filter(r => r.count > 0)} cx="50%" cy="50%" labelLine={false} label={({ name, count }) => `${name}: ${count}`} outerRadius={80} fill="#8884d8" dataKey="count">
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Activité par type d'action */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Activité par Type d'Action</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={auditActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="action" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Activité quotidienne */}
            <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">Activité Quotidienne (7 derniers jours)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="jour" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Line type="monotone" dataKey="actions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setUserFormData({ nom: '', email: '', role: 'Viewer', statut: 'Actif', dateCreation: new Date().toISOString().split('T')[0] }); setShowUserModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> Nouvel Utilisateur
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">Nom</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Email</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Rôle</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Statut</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Date Création</th>
                    <th className="px-4 py-2 text-left text-white font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{u.nom}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{u.email}</td>
                      <td className="px-4 py-2 text-slate-300">{u.role}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.statut === 'Actif' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                          {u.statut}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{u.dateCreation}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEditUser(u)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDeleteUser(u.id)} className="p-1 hover:bg-slate-600 rounded">
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

        {/* Rôles */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setRoleFormData({ nom: '', permissions: [], description: '' }); setShowRoleModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                <Plus size={20} /> Nouveau Rôle
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map(r => (
                <div key={r.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-bold text-lg">{r.nom}</h4>
                      <p className="text-slate-400 text-sm">{r.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditRole(r)} className="p-1 hover:bg-slate-700 rounded">
                        <Edit2 size={16} className="text-blue-400" />
                      </button>
                      <button onClick={() => handleDeleteRole(r.id)} className="p-1 hover:bg-slate-700 rounded">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {r.permissions.map((perm, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs font-medium">
                        {perm}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs mt-4">Utilisateurs: {users.filter(u => u.role === r.nom).length}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-2 text-left text-white font-bold">Utilisateur</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Action</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Module</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Timestamp</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                    <td className="px-4 py-2 text-slate-300">{log.utilisateur}</td>
                    <td className="px-4 py-2 text-slate-400">{log.action}</td>
                    <td className="px-4 py-2 text-slate-400">{log.module}</td>
                    <td className="px-4 py-2 text-slate-400 text-xs">{log.timestamp}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${log.statut === 'Success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                        {log.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Utilisateur */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Modifier Utilisateur' : 'Nouvel Utilisateur'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
                <input type="text" value={userFormData.nom} onChange={(e) => handleUserChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Nom complet" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                <input type="email" value={userFormData.email} onChange={(e) => handleUserChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="email@seneswiss.sn" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rôle</label>
                <select value={userFormData.role} onChange={(e) => handleUserChange('role', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  {roles.map(r => (
                    <option key={r.id} value={r.nom}>{r.nom}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                <select value={userFormData.statut} onChange={(e) => handleUserChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option>Actif</option>
                  <option>Inactif</option>
                  <option>Suspendu</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUserModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Annuler</button>
              <button onClick={handleSaveUser} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{editingId ? 'Modifier' : 'Créer'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rôle */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Modifier Rôle' : 'Nouveau Rôle'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom du Rôle *</label>
                <input type="text" value={roleFormData.nom} onChange={(e) => handleRoleChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="ex: Manager" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea value={roleFormData.description} onChange={(e) => handleRoleChange('description', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Description du rôle" rows="3" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Permissions (séparées par virgule)</label>
                <textarea value={roleFormData.permissions.join(', ')} onChange={(e) => handleRoleChange('permissions', e.target.value.split(',').map(p => p.trim()))} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Read, Create, Update, Delete" rows="3" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowRoleModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Annuler</button>
              <button onClick={handleSaveRole} className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">{editingId ? 'Modifier' : 'Créer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

