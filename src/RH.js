import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Plus, Edit2, Trash2, Users, User, Heart, Users2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { api } from './api';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';

const RH = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Translations
  const translations = {
    FR: {
      title: 'Ressources Humaines',
      subtitle: 'Gestion des Employés, Bénévoles et Membres',
      overview: 'Vue d\'ensemble',
      employes: 'Employés',
      employe: 'Employé',
      benevoles: 'Bénévoles',
      benevole: 'Bénévole',
      membres: 'Membres',
      membre: 'Membre',
      totalEmployes: 'Total Employés',
      totalBenevoles: 'Total Bénévoles',
      totalMembres: 'Total Membres',
      totalPersonnes: 'Total Personnes',
      distribution: 'Distribution du Personnel',
      evolution: 'Évolution Mensuelle',
      departements: 'Statistiques par Département',
      nom: 'Nom',
      email: 'Email',
      emailPerso: 'Email perso',
      telephone: 'Téléphone',
      poste: 'Poste',
      departement: 'Team / Département',
      matricule: 'Matricule',
      role: 'Rôle',
      typeMembre: 'Type membre',
      statut: 'Statut',
      actions: 'Actions',
      ajouter: 'Ajouter',
      actif: 'Actif',
      inactif: 'Inactif',
      conge: 'Congé',
      modifier: 'Modifier',
      creer: 'Créer',
      annuler: 'Annuler',
      dateEmbauche: 'Date d\'Embauche',
      selectionner: 'Sélectionner',
      nonRenseigne: 'Non renseigné'
    },
    EN: {
      title: 'Human Resources',
      subtitle: 'Employee, Volunteer & Member Management',
      overview: 'Overview',
      employes: 'Employees',
      employe: 'Employee',
      benevoles: 'Volunteers',
      benevole: 'Volunteer',
      membres: 'Members',
      membre: 'Member',
      totalEmployes: 'Total Employees',
      totalBenevoles: 'Total Volunteers',
      totalMembres: 'Total Members',
      totalPersonnes: 'Total People',
      distribution: 'Staff Distribution',
      evolution: 'Monthly Evolution',
      departements: 'Department Statistics',
      nom: 'Name',
      email: 'Email',
      emailPerso: 'Personal email',
      telephone: 'Phone',
      poste: 'Position',
      departement: 'Team / Department',
      matricule: 'Employee ID',
      role: 'Role',
      typeMembre: 'Member type',
      statut: 'Status',
      actions: 'Actions',
      ajouter: 'Add',
      actif: 'Active',
      inactif: 'Inactive',
      conge: 'Leave',
      modifier: 'Edit',
      creer: 'Create',
      annuler: 'Cancel',
      dateEmbauche: 'Hire Date',
      selectionner: 'Select',
      nonRenseigne: 'Not provided'
    },
    DE: {
      title: 'Personalwesen',
      subtitle: 'Verwaltung von Mitarbeitern, Freiwilligen und Mitgliedern',
      overview: 'Übersicht',
      employes: 'Mitarbeiter',
      employe: 'Mitarbeiter',
      benevoles: 'Freiwillige',
      benevole: 'Freiwillige',
      membres: 'Mitglieder',
      membre: 'Mitglied',
      totalEmployes: 'Gesamtmitarbeiter',
      totalBenevoles: 'Gesamtfreiwillige',
      totalMembres: 'Gesamtmitglieder',
      totalPersonnes: 'Gesamtpersonen',
      distribution: 'Personalverteilung',
      evolution: 'Monatliche Entwicklung',
      departements: 'Abteilungsstatistiken',
      nom: 'Name',
      email: 'E-Mail',
      emailPerso: 'Private E-Mail',
      telephone: 'Telefon',
      poste: 'Position',
      departement: 'Team / Abteilung',
      matricule: 'Personalnummer',
      role: 'Rolle',
      typeMembre: 'Mitgliedstyp',
      statut: 'Status',
      actions: 'Aktionen',
      ajouter: 'Hinzufügen',
      actif: 'Aktiv',
      inactif: 'Inaktiv',
      conge: 'Urlaub',
      modifier: 'Bearbeiten',
      creer: 'Erstellen',
      annuler: 'Abbrechen',
      dateEmbauche: 'Einstellungsdatum',
      selectionner: 'Auswählen',
      nonRenseigne: 'Nicht angegeben'
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
        'TZH': 'Team ZH',
        'TSN': 'Team SN',
        'Team_ZH': 'Team ZH',
        'Team_SN': 'Team SN',
        'Événements': 'Événements',
        'Général': 'Général'
      },
      EN: {
        'IT': 'IT',
        'Finance': 'Finance',
        'Gestion': 'Management',
        'RH': 'HR',
        'Social': 'Social',
        'TZH': 'Team ZH',
        'TSN': 'Team SN',
        'Team_ZH': 'Team ZH',
        'Team_SN': 'Team SN',
        'Événements': 'Events',
        'Général': 'General'
      },
      DE: {
        'IT': 'IT',
        'Finance': 'Finanzen',
        'Gestion': 'Verwaltung',
        'RH': 'Personalwesen',
        'Social': 'Soziales',
        'TZH': 'Team ZH',
        'TSN': 'Team SN',
        'Team_ZH': 'Team ZH',
        'Team_SN': 'Team SN',
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
  const normalizeRole = (value) => {
    const text = String(value || '').trim().toLowerCase();
    if (text === 'admin' || text === 'administrator' || text === 'administrateur') return 'Admin';
    return 'Utilisateur';
  };
  const normalizeStatus = (value) => {
    const text = String(value || '').trim().toLowerCase();
    if (['inactif', 'inactive', 'false', '0'].includes(text)) return 'Inactif';
    if (['conge', 'congé', 'leave'].includes(text)) return 'Congé';
    return 'Actif';
  };
  const normalizeMemberType = (person) => {
    const id = String(person.id || '').toLowerCase();
    const name = String(person.name || `${person.prenom || ''} ${person.nom || ''}`).toLowerCase();
    if (id.includes('cheikh') || id.includes('chantal') || name.includes('cheikh') || name.includes('chantal')) return 'Fondateur';
    const raw = String(person.type_membre || person.member_type || '').trim().toLowerCase();
    return raw === 'fondateur' ? 'Fondateur' : 'Associ\u00e9';
  };
  const formatValue = (value) => {
    const text = String(value || '').trim();
    return text && text !== 'N/A' ? text : t.nonRenseigne;
  };
  const getStatusLabel = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === 'Congé') return t.conge;
    return normalized === 'Actif' ? t.actif : t.inactif;
  };
  const getStatusClass = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === 'Actif') return 'bg-green-900 text-green-200';
    if (normalized === 'Congé') return 'bg-amber-900 text-amber-200';
    return 'bg-red-900 text-red-200';
  };
  const getTypeLabel = (type) => {
    if (type === 'membre') return t.membre;
    if (type === 'benevole') return t.benevole;
    return t.employe;
  };

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
    emailPerso: '',
    telephone: '',
    poste: '',
    departement: '',
    matricule: '',
    role: 'Utilisateur',
    typeMembre: 'Associé',
    dateEmbauche: new Date().toISOString().split('T')[0],
    statut: 'Actif'
  });

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['overview', 'membres', 'employes', 'benevoles', 'teams', 'hours', 'competences', 'myaccount'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  // Charger les donnees RH depuis l'API et les sources provisoires validees.
  useEffect(() => {
    const loadData = async () => {
      setEmployes([
        { id: 'EMP-001', nom: 'Jean Dupont', email: 'jean.dupont@seneswiss.sn', telephone: '+221 77 123 4567', poste: 'D\u00e9veloppeur', departement: 'IT', role: 'Utilisateur', typeMembre: '', dateEmbauche: '2024-01-15', statut: 'Actif' },
        { id: 'EMP-002', nom: 'Marie Sall', email: 'marie.sall@seneswiss.sn', telephone: '+221 77 234 5678', poste: 'Responsable Finance', departement: 'Finance', role: 'Utilisateur', typeMembre: '', dateEmbauche: '2023-06-01', statut: 'Actif' },
      ]);
      setBenevoles([]);

      try {
        const response = await api.getUsers(100, 0);
        console.log('RH API Response:', response);

        if (response?.data && Array.isArray(response.data)) {
          const mappedMembres = response.data.map(emp => ({
            id: emp.id || emp.user_id,
            nom: emp.name || emp.full_name || `${emp.prenom || ''} ${emp.nom || ''}`.trim() || 'N/A',
            email: emp.email || emp.email_pro || emp.email_work,
            emailPerso: emp.email_perso || emp.email_perso_raw || '',
            telephone: emp.telephone || emp.phone || '',
            poste: emp.poste || emp.position || 'Membre',
            departement: emp.team || emp.departement || emp.department || 'N/A',
            matricule: emp.matricule || emp.employee_id || '',
            role: normalizeRole(emp.role || emp.profil || emp.access_role),
            typeMembre: normalizeMemberType(emp),
            dateEmbauche: emp.created_at ? emp.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            statut: emp.active === false ? 'Inactif' : normalizeStatus(emp.status)
          }));
          setMembres(mappedMembres);
          console.log('RH members loaded:', mappedMembres.length, 'rows');
        } else {
          setMembres([]);
        }
      } catch (error) {
        console.log('RH error:', error);
        setMembres([]);
      }
    };

    loadData();
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

    const normalizedData = {
      ...formData,
      role: normalizeRole(formData.role),
      statut: normalizeStatus(formData.statut),
      typeMembre: modalType === 'membre' ? (formData.typeMembre || 'Associé') : ''
    };

    if (modalType === 'employe') {
      if (editingId) {
        setEmployes(employes.map(e => e.id === editingId ? { ...normalizedData, id: editingId } : e));
      } else {
        setEmployes([...employes, { ...normalizedData, id: Date.now() }]);
      }
    } else if (modalType === 'benevole') {
      if (editingId) {
        setBenevoles(benevoles.map(b => b.id === editingId ? { ...normalizedData, id: editingId } : b));
      } else {
        setBenevoles([...benevoles, { ...normalizedData, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setMembres(membres.map(m => m.id === editingId ? { ...normalizedData, id: editingId } : m));
      } else {
        setMembres([...membres, { ...normalizedData, id: Date.now() }]);
      }
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ nom: '', email: '', emailPerso: '', telephone: '', poste: '', departement: '', matricule: '', role: 'Utilisateur', typeMembre: 'Associé', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
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
    setFormData({ nom: '', email: '', emailPerso: '', telephone: '', poste: '', departement: '', matricule: '', role: 'Utilisateur', typeMembre: type === 'membre' ? 'Associé' : '', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
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
      <TableControls
        rows={data}
        renderTable={(visibleRows) => (
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-700">
              <tr>
                <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.email}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.telephone}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.poste}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.departement}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.role}</th>
                {type === 'membre' && <th className="px-4 py-2 text-left text-white font-bold">{t.typeMembre}</th>}
                <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(item => (
                <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                  <td className="px-4 py-2 text-slate-300 font-medium">{item.nom}</td>
                  <td className="px-4 py-2 text-slate-400 text-xs">{item.email}</td>
                  <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(item.telephone)}</td>
                  <td className="px-4 py-2 text-slate-300">{translatePosition(item.poste)}</td>
                  <td className="px-4 py-2 text-slate-400">{formatValue(translateDepartment(item.departement))}</td>
                  <td className="px-4 py-2 text-slate-400">{formatValue(item.role)}</td>
                  {type === 'membre' && <td className="px-4 py-2 text-slate-400">{formatValue(item.typeMembre)}</td>}
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClass(item.statut)}`}>
                      {getStatusLabel(item.statut)}
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
        )}
      />
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">{t.totalEmployes}</p>
                <p className="text-white text-2xl font-bold">{totalEmployes}</p>
              </div>
              <User size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">{t.totalBenevoles}</p>
                <p className="text-white text-2xl font-bold">{totalBenevoles}</p>
              </div>
              <Heart size={32} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">{t.totalMembres}</p>
                <p className="text-white text-2xl font-bold">{totalMembres}</p>
              </div>
              <Users2 size={32} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">{t.totalPersonnes}</p>
                <p className="text-white text-2xl font-bold">{totalPersonnes}</p>
              </div>
              <Users size={32} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ModulePageTabs
          moduleId="rh"
          language={language}
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'membres', label: `${t.membres} (${totalMembres})` },
            { tab: 'employes', label: `${t.employes} (${totalEmployes})` },
            { tab: 'benevoles', label: `${t.benevoles} (${totalBenevoles})` }
          ]}
        />

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

        <ChildTabPlaceholder moduleId="rh" language={language} activeTab={activeTab} handledTabs={['overview', 'membres', 'employes', 'benevoles']} />
        </div>
      </div>

      {/* Modal Créer/Éditer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? `${t.modifier} ${getTypeLabel(modalType)}` : `${t.creer} ${getTypeLabel(modalType)}`}
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
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.emailPerso}</label>
                <input type="email" value={formData.emailPerso || ''} onChange={(e) => handleFormChange('emailPerso', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="email personnel" />
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
                  <option value="">{t.selectionner}</option>
                  <option value="IT">{translateDepartment('IT')}</option>
                  <option value="Finance">{translateDepartment('Finance')}</option>
                  <option value="RH">{translateDepartment('RH')}</option>
                  <option value="Gestion">{translateDepartment('Gestion')}</option>
                  <option value="Social">{translateDepartment('Social')}</option>
                  <option value="Team_ZH">{translateDepartment('Team_ZH')}</option>
                  <option value="Team_SN">{translateDepartment('Team_SN')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.matricule}</label>
                <input type="text" value={formData.matricule || ''} onChange={(e) => handleFormChange('matricule', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="TZH001A" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.role}</label>
                <select value={formData.role || 'Utilisateur'} onChange={(e) => handleFormChange('role', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option value="Utilisateur">Utilisateur</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {modalType === 'membre' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.typeMembre}</label>
                  <select value={formData.typeMembre || 'Associé'} onChange={(e) => handleFormChange('typeMembre', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                    <option value="Fondateur">Fondateur</option>
                    <option value="Associé">Associé</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.dateEmbauche}</label>
                <LocalizedDateInput value={formData.dateEmbauche} onChange={(date) => handleFormChange('dateEmbauche', date)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.statut}</label>
                <select value={formData.statut} onChange={(e) => handleFormChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option value="Actif">{t.actif}</option>
                  <option value="Inactif">{t.inactif}</option>
                  <option value="Congé">{t.conge}</option>
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
    </>
  );
};

export default RH;
