import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Info, Edit2, Trash2, X } from 'lucide-react';
import { api } from './api';
import { useLanguage } from './LanguageContext';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import LocalizedDateInput from './LocalizedDateInput';
import TableControls from './TableControls';
import MembersDirectory from './MembersDirectory';
import RHGlossary from './RHGlossary';
import RHOverview from './RHOverview';
import { StandardCreateButton } from './StandardUI';
import FunctionResourcesOverview from './FunctionResourcesOverview';
import { FunctionArchitectureOverview, FunctionProcessOverview } from './FunctionStructuralViews';
import FunctionAssistant from './FunctionAssistant';

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
      glossary: 'Glossaire',
      localDraftTitle: 'Registre local de travail',
      localDraftBody: "Ces fiches restent dans la session en cours. Elles ne sont ni enregistrées dans le backend, ni versées dans un dossier RH officiel.",
      localDraftCount: count => `${count} brouillon${count > 1 ? 's' : ''} local${count > 1 ? 'aux' : ''}`,
      requiredMessage: 'Renseignez le nom et l’adresse e-mail avant de poursuivre.',
      confirmCreateTitle: 'Confirmer l’ajout du brouillon',
      confirmCreateBody: 'Ajouter « {name} » à ce registre local ? Aucune donnée ne sera enregistrée dans le backend.',
      confirmUpdateTitle: 'Confirmer la modification',
      confirmUpdateBody: 'Modifier le brouillon local « {name} » ? Cette modification disparaîtra à la fin de la session.',
      confirmDeleteTitle: 'Confirmer la suppression',
      confirmDeleteBody: 'Supprimer le brouillon local « {name} » ? Cette action concerne uniquement la session en cours.',
      confirm: 'Oui, confirmer',
      decline: 'Non, revenir',
      createdSuccess: 'Brouillon « {name} » ajouté localement avec succès. Aucun enregistrement backend n’a été créé.',
      updatedSuccess: 'Brouillon « {name} » modifié localement avec succès. Aucun enregistrement backend n’a été modifié.',
      deletedSuccess: 'Brouillon « {name} » supprimé localement avec succès. Aucun dossier RH officiel n’a été supprimé.',
      editDraft: 'Modifier le brouillon {name}',
      deleteDraft: 'Supprimer le brouillon {name}',
      closeMessage: 'Fermer le message'
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
      glossary: 'Glossary',
      localDraftTitle: 'Local working register',
      localDraftBody: 'These records remain in the current session. They are neither saved to the backend nor added to an official HR file.',
      localDraftCount: count => `${count} local draft${count === 1 ? '' : 's'}`,
      requiredMessage: 'Enter a name and email address before continuing.',
      confirmCreateTitle: 'Confirm draft creation',
      confirmCreateBody: 'Add “{name}” to this local register? No data will be saved to the backend.',
      confirmUpdateTitle: 'Confirm update',
      confirmUpdateBody: 'Update the local draft “{name}”? This change will disappear at the end of the session.',
      confirmDeleteTitle: 'Confirm deletion',
      confirmDeleteBody: 'Delete the local draft “{name}”? This action applies only to the current session.',
      confirm: 'Yes, confirm',
      decline: 'No, go back',
      createdSuccess: 'Draft “{name}” added locally. No backend record was created.',
      updatedSuccess: 'Draft “{name}” updated locally. No backend record was changed.',
      deletedSuccess: 'Draft “{name}” deleted locally. No official HR file was deleted.',
      editDraft: 'Edit draft {name}',
      deleteDraft: 'Delete draft {name}',
      closeMessage: 'Close message'
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
      glossary: 'Glossar',
      localDraftTitle: 'Lokales Arbeitsregister',
      localDraftBody: 'Diese Einträge bleiben in der aktuellen Sitzung. Sie werden weder im Backend gespeichert noch einer offiziellen Personalakte hinzugefügt.',
      localDraftCount: count => `${count} lokale${count === 1 ? 'r Entwurf' : ' Entwürfe'}`,
      requiredMessage: 'Geben Sie einen Namen und eine E-Mail-Adresse ein, bevor Sie fortfahren.',
      confirmCreateTitle: 'Entwurf hinzufügen bestätigen',
      confirmCreateBody: '„{name}“ zu diesem lokalen Register hinzufügen? Im Backend werden keine Daten gespeichert.',
      confirmUpdateTitle: 'Änderung bestätigen',
      confirmUpdateBody: 'Den lokalen Entwurf „{name}“ ändern? Diese Änderung endet mit der aktuellen Sitzung.',
      confirmDeleteTitle: 'Löschen bestätigen',
      confirmDeleteBody: 'Den lokalen Entwurf „{name}“ löschen? Diese Aktion betrifft nur die aktuelle Sitzung.',
      confirm: 'Ja, bestätigen',
      decline: 'Nein, zurück',
      createdSuccess: 'Entwurf „{name}“ wurde lokal hinzugefügt. Es wurde kein Backend-Eintrag erstellt.',
      updatedSuccess: 'Entwurf „{name}“ wurde lokal geändert. Es wurde kein Backend-Eintrag geändert.',
      deletedSuccess: 'Entwurf „{name}“ wurde lokal gelöscht. Es wurde keine offizielle Personalakte gelöscht.',
      editDraft: 'Entwurf {name} bearbeiten',
      deleteDraft: 'Entwurf {name} löschen',
      closeMessage: 'Meldung schließen'
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
  const [, setMembres] = useState([]);
  const [directoryCount, setDirectoryCount] = useState(null);
  const [directoryStatus, setDirectoryStatus] = useState('loading');
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [feedback, setFeedback] = useState(null);
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
    } else if (['overview', 'architecture', 'processes', 'directory', 'employes', 'benevoles', 'teams', 'hours', 'competences', 'myaccount', 'assistant', 'resources', 'glossary'].includes(tab)) {
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
    if (feedback?.tone === 'error') setFeedback(null);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const interpolateName = (template, name) => template.replace('{name}', name || t.nonRenseigne);

  const requestSave = () => {
    if (!formData.nom || !formData.email) {
      setFeedback({ tone: 'error', message: t.requiredMessage });
      return;
    }

    const normalizedData = {
      ...formData,
      role: normalizeRole(formData.role),
      statut: normalizeStatus(formData.statut),
      typeMembre: modalType === 'membre' ? (formData.typeMembre || 'Associé') : ''
    };

    setFeedback(null);
    setPendingAction({
      kind: editingId ? 'update' : 'create',
      type: modalType,
      id: editingId,
      data: normalizedData,
      name: normalizedData.nom
    });
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingId(item.id);
    setFormData(item);
    setShowModal(true);
  };

  const requestDelete = (type, item) => {
    setFeedback(null);
    setPendingAction({ kind: 'delete', type, id: item.id, name: item.nom });
  };

  const confirmPendingAction = () => {
    if (!pendingAction) return;
    const { kind, type, id, data, name } = pendingAction;
    const updateRegister = (setter) => {
      setter(current => {
        if (kind === 'delete') return current.filter(item => item.id !== id);
        if (kind === 'update') return current.map(item => item.id === id ? { ...data, id } : item);
        return [...current, { ...data, id: Date.now() }];
      });
    };

    if (type === 'employe') updateRegister(setEmployes);
    else if (type === 'benevole') updateRegister(setBenevoles);
    else updateRegister(setMembres);

    const successKey = kind === 'create' ? 'createdSuccess' : kind === 'update' ? 'updatedSuccess' : 'deletedSuccess';
    setFeedback({ tone: 'success', message: interpolateName(t[successKey], name) });
    setPendingAction(null);
    if (kind !== 'delete') {
      setShowModal(false);
      setEditingId(null);
      setFormData({ nom: '', email: '', emailPerso: '', telephone: '', poste: '', departement: '', matricule: '', role: 'Utilisateur', typeMembre: 'Associé', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
    }
  };

  const openNewModal = (type) => {
    setFeedback(null);
    setModalType(type);
    setEditingId(null);
    setFormData({ nom: '', email: '', emailPerso: '', telephone: '', poste: '', departement: '', matricule: '', role: 'Utilisateur', typeMembre: type === 'membre' ? 'Associé' : '', dateEmbauche: new Date().toISOString().split('T')[0], statut: 'Actif' });
    setShowModal(true);
  };

  // Table réutilisable
  const PersonnelTable = ({ data, type, onEdit, onDelete, onAdd }) => (
    <div className="m3s-design-scope space-y-4">
      <section className="m3s-panel flex flex-col gap-3 border-l-2 p-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderLeftColor: '#f59e0b' }}>
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 shrink-0 text-amber-400" size={20} aria-hidden="true" />
          <div>
            <h2 className="m3s-panel-title">{t.localDraftTitle}</h2>
            <p className="mt-1 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.localDraftBody}</p>
          </div>
        </div>
        <span className="m3s-draft-badge shrink-0 rounded-full px-3 py-1 text-xs font-semibold">{t.localDraftCount(data.length)}</span>
      </section>

      {feedback && (!showModal || feedback.tone === 'success') && (
        <div className={`${feedback.tone === 'success' ? 'm3s-feedback m3s-feedback--success' : 'rounded-md border border-red-500/50 bg-red-950/30 text-red-100'} flex items-start justify-between gap-3 px-4 py-3`} role={feedback.tone === 'success' ? 'status' : 'alert'}>
          <div className="flex items-start gap-2">
            {feedback.tone === 'success' && <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />}
            <span className="text-sm leading-5">{feedback.message}</span>
          </div>
          <button type="button" className="shrink-0 rounded p-1 hover:bg-black/10" onClick={() => setFeedback(null)} aria-label={t.closeMessage}><X size={16} /></button>
        </div>
      )}

      <div className="flex justify-end">
        <StandardCreateButton onClick={() => onAdd(type)}>{t.ajouter}</StandardCreateButton>
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
                    <button type="button" onClick={() => onEdit(type, item)} className="rounded p-2 hover:bg-slate-600" aria-label={interpolateName(t.editDraft, item.nom)}>
                      <Edit2 size={16} className="text-blue-400" />
                    </button>
                    <button type="button" onClick={() => onDelete(type, item)} className="rounded p-2 hover:bg-slate-600" aria-label={interpolateName(t.deleteDraft, item.nom)}>
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
      <div className="m3s-design-scope m3s-business-module min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-8">
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

        {activeTab === 'architecture' && (
          <FunctionArchitectureOverview moduleId="rh" language={language} />
        )}

        {activeTab === 'processes' && (
          <FunctionProcessOverview moduleId="rh" language={language} />
        )}

        {/* Employés */}
        {activeTab === 'employes' && (
          <section id="rh-employees-register" className="scroll-mt-24" tabIndex="-1">
            <PersonnelTable data={employes} type="employe" onEdit={handleEdit} onDelete={requestDelete} onAdd={openNewModal} />
          </section>
        )}

        {/* Bénévoles */}
        {activeTab === 'benevoles' && (
          <PersonnelTable data={benevoles} type="benevole" onEdit={handleEdit} onDelete={requestDelete} onAdd={openNewModal} />
        )}

        {/* Annuaire interne RH-001 */}
        {activeTab === 'directory' && (
          <MembersDirectory onLoaded={handleDirectoryLoaded} initialMemberType={new URLSearchParams(location.search).get('memberType')} />
        )}

        {activeTab === 'resources' && (
          <FunctionResourcesOverview moduleId="rh" language={language} onSelectTab={handleTabSelect} />
        )}

        {activeTab === 'assistant' && <FunctionAssistant moduleId="rh" language={language} />}

        {activeTab === 'glossary' && (
          <RHGlossary language={language} />
        )}

        <ChildTabPlaceholder moduleId="rh" language={language} activeTab={activeTab} handledTabs={['overview', 'architecture', 'processes', 'directory', 'employes', 'benevoles', 'assistant', 'resources', 'glossary']} />
        </div>
      </div>

      {/* Modal Créer/Éditer */}
      {showModal && !pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="m3s-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="rh-draft-form-title">
            <h2 id="rh-draft-form-title" className="m3s-page-title mb-6">
              {editingId ? `${t.modifier} ${getTypeLabel(modalType)}` : `${t.creer} ${getTypeLabel(modalType)}`}
            </h2>

            {feedback?.tone === 'error' && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-md border border-red-500/50 bg-red-950/30 px-4 py-3 text-red-100" role="alert">
                <span className="text-sm leading-5">{feedback.message}</span>
                <button type="button" className="shrink-0 rounded p-1 hover:bg-black/10" onClick={() => setFeedback(null)} aria-label={t.closeMessage}>
                  <X size={16} />
                </button>
              </div>
            )}

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
                <LocalizedDateInput value={formData.dateEmbauche} onChange={(date) => handleFormChange('dateEmbauche', date)} className="w-full" />
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
              <button type="button" onClick={() => setShowModal(false)} className="m3s-secondary-button min-h-11 flex-1 px-4">{t.annuler}</button>
              <button type="button" onClick={requestSave} className={`${editingId ? 'm3s-primary-button' : 'm3s-success-button'} min-h-11 flex-1 px-4`}>{editingId ? t.modifier : t.creer}</button>
            </div>
          </div>
        </div>
      )}

      {pendingAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <section className="m3s-panel w-full max-w-md p-5 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="rh-confirmation-title">
            <h3 id="rh-confirmation-title" className="m3s-section-title">
              {pendingAction.kind === 'create' ? t.confirmCreateTitle : pendingAction.kind === 'update' ? t.confirmUpdateTitle : t.confirmDeleteTitle}
            </h3>
            <p className="mt-3 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>
              {interpolateName(pendingAction.kind === 'create' ? t.confirmCreateBody : pendingAction.kind === 'update' ? t.confirmUpdateBody : t.confirmDeleteBody, pendingAction.name)}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={() => setPendingAction(null)}>{t.decline}</button>
              <button type="button" className={`${pendingAction.kind === 'create' ? 'm3s-success-button' : pendingAction.kind === 'update' ? 'm3s-primary-button' : 'm3s-danger-button'} min-h-11 px-4`} onClick={confirmPendingAction}>{t.confirm}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default RH;
