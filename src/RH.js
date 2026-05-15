import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Plus, Edit2, Trash2, Users, User, Heart, Users2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Header from './Header';

const RH = () => {
  const { language, setLanguage } = useLanguage();

  // Translations
  const translations = {
    FR: {
      title: 'Ressources Humaines',
      subtitle: 'Gestion des Employés, Bénévoles et Membres',
      overview: 'Vue d\'ensemble',
      employes: 'Employés',
      benevoles: 'Bénévoles',
      membres: 'Membres',
      totalEmployes: 'Total Employés',
      totalBenevoles: 'Total Bénévoles',
      totalMembres: 'Total Membres',
      totalPersonnes: 'Total Personnes',
      distribution: 'Distribution du Personnel',
      evolution: 'Évolution Mensuelle',
      departements: 'Statistiques par Département',
      nom: 'Nom',
      email: 'Email',
      telephone: 'Téléphone',
      poste: 'Poste',
      departement: 'Département',
      statut: 'Statut',
      actions: 'Actions',
      ajouter: 'Ajouter',
      actif: 'Actif',
      inactif: 'Inactif',
      modifier: 'Modifier',
      creer: 'Créer',
      annuler: 'Annuler',
      dateEmbauche: 'Date d\'Embauche'
    },
    EN: {
      title: 'Human Resources',
      subtitle: 'Employee, Volunteer & Member Management',
      overview: 'Overview',
      employes: 'Employees',
      benevoles: 'Volunteers',
      membres: 'Members',
      totalEmployes: 'Total Employees',
      totalBenevoles: 'Total Volunteers',
      totalMembres: 'Total Members',
      totalPersonnes: 'Total People',
      distribution: 'Staff Distribution',
      evolution: 'Monthly Evolution',
      departements: 'Department Statistics',
      nom: 'Name',
      email: 'Email',
      telephone: 'Phone',
      poste: 'Position',
      departement: 'Department',
      statut: 'Status',
      actions: 'Actions',
      ajouter: 'Add',
      actif: 'Active',
      inactif: 'Inactive',
      modifier: 'Edit',
      creer: 'Create',
      annuler: 'Cancel',
      dateEmbauche: 'Hire Date'
    },
    DE: {
      title: 'Personalwesen',
      subtitle: 'Verwaltung von Mitarbeitern, Freiwilligen und Mitgliedern',
      overview: 'Übersicht',
      employes: 'Mitarbeiter',
      benevoles: 'Freiwillige',
      membres: 'Mitglieder',
      totalEmployes: 'Gesamtmitarbeiter',
      totalBenevoles: 'Gesamtfreiwillige',
      totalMembres: 'Gesamtmitglieder',
      totalPersonnes: 'Gesamtpersonen',
      distribution: 'Personalverteilung',
      evolution: 'Monatliche Entwicklung',
      departements: 'Abteilungsstatistiken',
      nom: 'Name',
      email: 'E-Mail',
      telephone: 'Telefon',
      poste: 'Position',
      departement: 'Abteilung',
      statut: 'Status',
      actions: 'Aktionen',
      ajouter: 'Hinzufügen',
      actif: 'Aktiv',
      inactif: 'Inaktiv',
      modifier: 'Bearbeiten',
      creer: 'Erstellen',
      annuler: 'Abbrechen',
      dateEmbauche: 'Einstellungsdatum'
    }
  };

  const t = translations[language];

  // Data translations for positions, departments, and roles
  const dataTranslations = {
    // Positions/Roles
    positions: {
      FR: {
        'Développeur': 'Développeur',
        'Responsable Finance': 'Responsable Finance',
        'Manager': 'Manager',
        'Responsable RH': 'Responsable RH',
        'Bénévole IT': 'Bénévole IT',
        'Bénévole Social': 'Bénévole Social',
        'Bénévole Événements': 'Bénévole Événements',
        'Membre': 'Membre',
        'Membre Fondateur': 'Membre Fondateur'
      },
      EN: {
        'Développeur': 'Developer',
        'Responsable Finance': 'Finance Manager',
        'Manager': 'Manager',
        'Responsable RH': 'HR Manager',
        'Bénévole IT': 'IT Volunteer',
        'Bénévole Social': 'Social Volunteer',
        'Bénévole Événements': 'Events Volunteer',
        'Membre': 'Member',
        'Membre Fondateur': 'Founding Member'
      },
      DE: {
        'Développeur': 'Entwickler',
        'Responsable Finance': 'Finanzleiter',
        'Manager': 'Manager',
        'Responsable RH': 'HR-Leiter',
        'Bénévole IT': 'IT-Freiwilliger',
        'Bénévole Social': 'Sozialfreiwilliger',
        'Bénévole Événements': 'Veranstaltungsfreiwilliger',
        'Membre': 'Mitglied',
        'Membre Fondateur': 'Gründungsmitglied'
      }
    },
    // Departments
    departments: {
      FR: {
        'IT': 'IT',
        'Finance': 'Finance',
        'Gestion': 'Gestion',
        'RH': 'RH',
        'Social': 'Social',
        'Événements': 'Événements',
        'Général': 'Général'
      },
      EN: {
        'IT': 'IT',
        'Finance': 'Finance',
        'Gestion': 'Management',
        'RH': 'HR',
        'Social': 'Social',
        'Événements': 'Events',
        'Général': 'General'
      },
      DE: {
        'IT': 'IT',
        'Finance': 'Finanzen',
        'Gestion': 'Verwaltung',
        'RH': 'Personalwesen',
        'Social': 'Soziales',
        'Événements': 'Veranstaltungen',
        'Général': 'Allgemein'
      }
    },
    // Category names (Employé, Bénévole, Membre in charts)
    categories: {
      FR: { 'Employés': 'Employés', 'Bénévoles': 'Bénévoles', 'Membres': 'Membres' },
      EN: { 'Employés': 'Employees', 'Bénévoles': 'Volunteers', 'Membres': 'Members' },
      DE: { 'Employés': 'Mitarbeiter', 'Bénévoles': 'Freiwillige', 'Membres': 'Mitglieder' }
    }
  };

  const translatePosition = (position) => dataTranslations.positions[language]?.[position] || position;
  const translateDepartment = (dept) => dataTranslations.departments[language]?.[dept] || dept;
  const translateCategory = (category) => dataTranslations.categories[language]?.[category] || category;

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
    { name: translateCategory('Employés'), nameKey: 'Employés', value: totalEmployes },
    { name: translateCategory('Bénévoles'), nameKey: 'Bénévoles', value: totalBenevoles },
    { name: translateCategory('Membres'), nameKey: 'Membres', value: totalMembres },
  ];

  const monthlyData = [
    { mois: 'Jan', employes: 3, benevoles: 2, membres: 4 },
    { mois: 'Fév', employes: 3, benevoles: 2, membres: 4 },
    { mois: 'Mar', employes: 3, benevoles: 3, membres: 5 },
    { mois: 'Avr', employes: totalEmployes, benevoles: totalBenevoles, membres: totalMembres },
  ];

  const departementStats = [
    { dept: translateDepartment('IT'), deptKey: 'IT', count: employes.filter(e => e.departement === 'IT').length + benevoles.filter(b => b.departement === 'IT').length },
    { dept: translateDepartment('Finance'), deptKey: 'Finance', count: employes.filter(e => e.departement === 'Finance').length },
    { dept: translateDepartment('RH'), deptKey: 'RH', count: employes.filter(e => e.departement === 'RH').length },
    { dept: translateDepartment('Gestion'), deptKey: 'Gestion', count: employes.filter(e => e.departement === 'Gestion').length },
    { dept: translateDepartment('Social'), deptKey: 'Social', count: benevoles.filter(b => b.departement === 'Social').length },
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
          <Plus size={20} /> {t.ajouter}
        </button>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.email}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.telephone}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.poste}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.departement}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
              <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                <td className="px-4 py-2 text-slate-400 text-xs">{item.email}</td>
                <td className="px-4 py-2 text-slate-400 text-xs">{item.telephone}</td>
                <td className="px-4 py-2 text-slate-300">{translatePosition(item.poste)}</td>
                <td className="px-4 py-2 text-slate-400">{translateDepartment(item.departement)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${item.statut === 'Actif' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {item.statut === 'Actif' ? t.actif : t.inactif}
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
    <>
      <Header title={t.title} icon="👥" subtitle={t.subtitle} language={language} setLanguage={setLanguage} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalEmployes}</p>
              <User size={16} className="text-blue-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{totalEmployes}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalBenevoles}</p>
              <Heart size={16} className="text-green-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors">{totalBenevoles}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalMembres}</p>
              <Users2 size={16} className="text-purple-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">{totalMembres}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalPersonnes}</p>
              <Users size={16} className="text-orange-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">{totalPersonnes}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.overview}</button>
          <button onClick={() => setActiveTab('employes')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'employes' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.employes} ({totalEmployes})</button>
          <button onClick={() => setActiveTab('benevoles')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'benevoles' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.benevoles} ({totalBenevoles})</button>
          <button onClick={() => setActiveTab('membres')} className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'membres' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}>{t.membres} ({totalMembres})</button>
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Distribution Personnel */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.distribution}</h3>
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
              <h3 className="text-white font-bold mb-4">{t.evolution}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Bar dataKey="employes" name={t.employes} fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="benevoles" name={t.benevoles} fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="membres" name={t.membres} fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Statistiques par Département */}
            <div className="lg:col-span-3 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.departements}</h3>
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
              {editingId ? `${t.modifier} ${modalType}` : `${t.creer} ${modalType}`}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.nom} *</label>
                <input type="text" value={formData.nom} onChange={(e) => handleFormChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Nom complet" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.email} *</label>
                <input type="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="email@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.telephone}</label>
                <input type="tel" value={formData.telephone} onChange={(e) => handleFormChange('telephone', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="+221 77 123 4567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.poste}</label>
                <input type="text" value={formData.poste} onChange={(e) => handleFormChange('poste', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="ex: Développeur" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.departement}</label>
                <select value={formData.departement} onChange={(e) => handleFormChange('departement', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option value="">Sélectionner</option>
                  <option value="IT">{translateDepartment('IT')}</option>
                  <option value="Finance">{translateDepartment('Finance')}</option>
                  <option value="RH">{translateDepartment('RH')}</option>
                  <option value="Gestion">{translateDepartment('Gestion')}</option>
                  <option value="Social">{translateDepartment('Social')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.dateEmbauche}</label>
                <input type="date" value={formData.dateEmbauche} onChange={(e) => handleFormChange('dateEmbauche', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.statut}</label>
                <select value={formData.statut} onChange={(e) => handleFormChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option>Actif</option>
                  <option>Inactif</option>
                  <option>Congé</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{editingId ? t.modifier : t.creer}</button>
            </div>
          </div>
        </div>
      )}
        </div>
    </>
  );
};

export default RH;

