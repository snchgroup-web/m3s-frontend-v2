import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { api } from './api';
import { useLanguage } from './LanguageContext';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';
import MembersDirectory from './MembersDirectory';
import RHGlossary from './RHGlossary';
import RHOverview from './RHOverview';

const RH = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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
      nonRenseigne: 'Non renseigné',
      glossary: 'Glossaire'
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
      nonRenseigne: 'Not provided',
      glossary: 'Glossary'
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
      nonRenseigne: 'Nicht angegeben',
      glossary: 'Glossar'
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
    }
  };

  const translatePosition = (position) => dataTranslations.positions[language]?.[position] || position;
  const translateDepartment = (dept) => dataTranslations.departments[language]?.[dept] || dept;
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
  const [directoryCount, setDirectoryCount] = useState(null);
  const [directoryStatus, setDirectoryStatus] = useState('loading');
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
    if (tab === 'membres') {
      setActiveTab('directory');
    } else if (['overview', 'directory', 'employes', 'benevoles', 'teams', 'hours', 'competences', 'myaccount', 'glossary'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;

    const loadDirectoryCount = async () => {
      setDirectoryStatus('loading');
      try {
        const response = await api.getMembersDirectory(1, 0);
        if (cancelled) return;
        const rows = Array.isArray(response?.data) ? response.data : [];
        setDirectoryCount(Number.isFinite(response?.total) ? response.total : rows.length);
        setDirectoryStatus('available');
      } catch (error) {
        if (cancelled) return;
        setDirectoryCount(null);
        setDirectoryStatus('unavailable');
      }
    };

    loadDirectoryCount();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDirectoryLoaded = useCallback((count) => {
    if (Number.isFinite(count)) {
      setDirectoryCount(count);
      setDirectoryStatus('available');
      return;
    }
    setDirectoryCount(null);
    setDirectoryStatus('unavailable');
  }, []);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    navigate(`/rh?tab=${encodeURIComponent(tab)}`);
  };

  const totalEmployes = employes.filter(e => e.statut === 'Actif').length;
  const totalBenevoles = benevoles.filter(b => b.statut === 'Actif').length;
  const totalMembresLabel = directoryStatus === 'available' ? directoryCount : '—';

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

        {/* Tabs */}
        <ModulePageTabs
          moduleId="rh"
          language={language}
          activeTab={activeTab}
          onSelect={handleTabSelect}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'directory', label: `${t.membres} (${totalMembresLabel})` },
            { tab: 'employes', label: `${t.employes} (${totalEmployes})` },
            { tab: 'benevoles', label: `${t.benevoles} (${totalBenevoles})` },
            { tab: 'glossary', label: t.glossary }
          ]}
        />

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <RHOverview
            language={language}
            directoryCount={directoryCount}
            directoryStatus={directoryStatus}
            employeeDraftCount={employes.length}
            volunteerDraftCount={benevoles.length}
          />
        )}

        {/* Employés */}
        {activeTab === 'employes' && (
          <PersonnelTable data={employes} type="employe" onEdit={handleEdit} onDelete={handleDelete} onAdd={openNewModal} />
        )}

        {/* Bénévoles */}
        {activeTab === 'benevoles' && (
          <PersonnelTable data={benevoles} type="benevole" onEdit={handleEdit} onDelete={handleDelete} onAdd={openNewModal} />
        )}

        {/* Annuaire interne RH-001 */}
        {activeTab === 'directory' && (
          <MembersDirectory onLoaded={handleDirectoryLoaded} />
        )}

        {activeTab === 'glossary' && (
          <RHGlossary language={language} />
        )}

        <ChildTabPlaceholder moduleId="rh" language={language} activeTab={activeTab} handledTabs={['overview', 'directory', 'employes', 'benevoles', 'glossary']} />
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
