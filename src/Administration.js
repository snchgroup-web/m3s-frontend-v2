import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import { ModulePageTabs, ModuleTabContent, ChildTabPlaceholder } from './moduleTabs';
import InstitutionOverview from './InstitutionOverview';
import PlanningOverview from './PlanningOverview';
import CorrespondenceAgenda from './CorrespondenceAgenda';
import JournalTaskRegister from './JournalTaskRegister';
import PersistentTaskRegister from './PersistentTaskRegister';
import { TASK_MODULE_LABELS } from './taskRegisterPresentation';
import ComplianceOverview from './ComplianceOverview';
import CommunicationOverview from './CommunicationOverview';
import AdministrationGlossary from './AdministrationGlossary';
import ProcessProcedureArchiveOverview from './ProcessProcedureArchiveOverview';
import AdministrationDashboardOverview from './AdministrationDashboardOverview';
import AdministrationArchitectureOverview from './AdministrationArchitectureOverview';
import AdministrationResources from './AdministrationResources';
import AdministrativeAssistant from './AdministrativeAssistant';
import AdministrationAuditLog from './AdministrationAuditLog';
import { StandardCreateButton } from './StandardUI';
import { useAuth } from './AuthContext';
import { ADMINISTRATION_AUDIT_PERMISSION, hasPermission } from './accessControl';
import {
  buildAdministrationTabPath,
  resolveAdministrationTab,
  shouldShowAdministrationOverviewReturn
} from './administrationTabs';
import { normalizeAdministrationUser, normalizeAuthAccountsCount } from './administrationUsers';

const Admin = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const permissions = Array.isArray(user?.permissions) ? user.permissions : [];
  const canReadAudit = hasPermission(permissions, ADMINISTRATION_AUDIT_PERMISSION);

  // Translations
  const translations = {
    FR: {
      title: 'Administration',
      subtitle: 'Institution, planification, communication, courrier et conformité',
      totalUsers: 'Total Utilisateurs',
      activeUsers: 'Utilisateurs Actifs',
      totalRoles: 'Total Rôles',
      auditLogs: 'Audit Logs',
      failedLogins: 'Connexions Échouées',
      overview: 'Vue d\'ensemble',
      users: 'Utilisateurs',
      roles: 'Rôles',
      audit: 'Journal d’audit',
      tasks: 'Tâches & Actions',
      planning: 'Planification & Projets',
      roleDistribution: 'Distribution des Rôles',
      activityByType: 'Activité par Type d\'Action',
      dailyActivity: 'Activité Quotidienne (7 derniers jours)',
      newUser: 'Nouvel Utilisateur',
      editUser: 'Modifier Utilisateur',
      newRole: 'Nouveau Rôle',
      editRole: 'Modifier Rôle',
      nom: 'Nom',
      email: 'Email',
      role: 'Rôle',
      statut: 'Statut',
      dateCreation: 'Date Création',
      actions: 'Actions',
      utilisateur: 'Utilisateur',
      action: 'Action',
      module: 'Module',
      timestamp: 'Timestamp',
      description: 'Description',
      permissions: 'Permissions (séparées par virgule)',
      nominRole: 'Nom du Rôle',
      annuler: 'Annuler',
      creer: 'Créer',
      modifier: 'Modifier',
      supprimer: 'Supprimer',
      remplirChamps: 'Veuillez remplir les champs obligatoires',
      active: 'Actif',
      inactive: 'Inactif',
      suspended: 'Suspendu',
      success: 'Success',
      failed: 'Failed',
      nonRenseigne: 'Non renseigné',
      userCount: 'Utilisateurs',
      titleTask: 'Tâche',
      responsable: 'Responsable',
      priorite: 'Priorité',
      progression: 'Progression',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven'
      , institution: 'Institution',
      communication: 'Communication & Courrier',
      processes: 'Processus & Procédures',
      architecture: 'Architecture & Relations',
      compliance: 'Conformité',
      resources: 'Ressources',
      assistant: 'Assistant administratif',
      complianceTracked: 'dossier suivi',
      backToOverview: 'Revenir à la vue d’ensemble',
      tachesTerminees: 'Tâches terminées',
      nouvelleTache: 'Nouvelle tâche',
      modifierTache: 'Modifier tâche'
      , userRegisterTitle: 'Comptes M3S et répertoire administratif'
      , userRegisterDescription: 'Le compteur recense les comptes authentifiés. Le tableau présente séparément le répertoire administratif disponible dans la source RH.'
      , authenticatedAccounts: 'Comptes M3S authentifiés'
      , administrativeDirectory: 'Répertoire administratif'
      , readOnlySource: 'Source gouvernée · lecture seule'
      , sourceConnected: 'Source connectée'
      , sourceUnavailable: 'Source indisponible'
      , loading: 'Chargement…'
      , position: 'Fonction'
      , department: 'Équipe'
      , memberType: 'Type de membre'
      , noUsers: 'Aucun utilisateur disponible dans la source.'
    },
    EN: {
      title: 'Administration',
      subtitle: 'Institution, planning, communication, correspondence and compliance',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      totalRoles: 'Total Roles',
      auditLogs: 'Audit Logs',
      failedLogins: 'Failed Logins',
      overview: 'Overview',
      users: 'Users',
      roles: 'Roles',
      audit: 'Audit log',
      tasks: 'Tasks & Actions',
      planning: 'Planning & Projects',
      roleDistribution: 'Role Distribution',
      activityByType: 'Activity by Type',
      dailyActivity: 'Daily Activity (Last 7 Days)',
      newUser: 'New User',
      editUser: 'Edit User',
      newRole: 'New Role',
      editRole: 'Edit Role',
      nom: 'Name',
      email: 'Email',
      role: 'Role',
      statut: 'Status',
      dateCreation: 'Creation Date',
      actions: 'Actions',
      utilisateur: 'User',
      action: 'Action',
      module: 'Module',
      timestamp: 'Timestamp',
      description: 'Description',
      permissions: 'Permissions (comma-separated)',
      nominRole: 'Role Name',
      annuler: 'Cancel',
      creer: 'Create',
      modifier: 'Edit',
      supprimer: 'Delete',
      remplirChamps: 'Please fill in all required fields',
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      success: 'Success',
      failed: 'Failed',
      nonRenseigne: 'Not provided',
      userCount: 'Users',
      titleTask: 'Task',
      responsable: 'Owner',
      priorite: 'Priority',
      progression: 'Progress',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri'
      , institution: 'Institution',
      communication: 'Communication & Correspondence',
      processes: 'Processes & Procedures',
      architecture: 'Architecture & Relationships',
      compliance: 'Compliance',
      resources: 'Resources',
      assistant: 'Administrative assistant',
      complianceTracked: 'tracked matter',
      backToOverview: 'Return to overview',
      tachesTerminees: 'Completed tasks',
      nouvelleTache: 'New task',
      modifierTache: 'Edit task'
      , userRegisterTitle: 'M3S accounts and administrative directory'
      , userRegisterDescription: 'The counter covers authenticated accounts. The table separately presents the administrative directory available from the HR source.'
      , authenticatedAccounts: 'Authenticated M3S accounts'
      , administrativeDirectory: 'Administrative directory'
      , readOnlySource: 'Governed source · read only'
      , sourceConnected: 'Source connected'
      , sourceUnavailable: 'Source unavailable'
      , loading: 'Loading…'
      , position: 'Function'
      , department: 'Team'
      , memberType: 'Member type'
      , noUsers: 'No users are available from the source.'
    },
    DE: {
      title: 'Verwaltung',
      subtitle: 'Institution, Planung, Kommunikation, Korrespondenz und Compliance',
      totalUsers: 'Gesamtbenutzer',
      activeUsers: 'Aktive Benutzer',
      totalRoles: 'Gesamtrollen',
      auditLogs: 'Audit-Protokolle',
      failedLogins: 'Fehlgeschlagene Anmeldungen',
      overview: 'Übersicht',
      users: 'Benutzer',
      roles: 'Rollen',
      audit: 'Auditprotokoll',
      tasks: 'Aufgaben & Aktionen',
      planning: 'Planung & Projekte',
      roleDistribution: 'Rollenverteilung',
      activityByType: 'Aktivität nach Typ',
      dailyActivity: 'Tägliche Aktivität (letzte 7 Tage)',
      newUser: 'Neuer Benutzer',
      editUser: 'Benutzer bearbeiten',
      newRole: 'Neue Rolle',
      editRole: 'Rolle bearbeiten',
      nom: 'Name',
      email: 'Email',
      role: 'Rolle',
      statut: 'Status',
      dateCreation: 'Erstellungsdatum',
      actions: 'Aktionen',
      utilisateur: 'Benutzer',
      action: 'Aktion',
      module: 'Modul',
      timestamp: 'Zeitstempel',
      description: 'Beschreibung',
      permissions: 'Berechtigungen (kommagetrennt)',
      nominRole: 'Rollenname',
      annuler: 'Abbrechen',
      creer: 'Erstellen',
      modifier: 'Bearbeiten',
      supprimer: 'Löschen',
      remplirChamps: 'Bitte füllen Sie alle erforderlichen Felder aus',
      active: 'Aktiv',
      inactive: 'Inaktiv',
      suspended: 'Gesperrt',
      success: 'Erfolg',
      failed: 'Fehler',
      nonRenseigne: 'Nicht angegeben',
      userCount: 'Benutzer',
      titleTask: 'Aufgabe',
      responsable: 'Verantwortlich',
      priorite: 'Priorität',
      progression: 'Fortschritt',
      mon: 'Mo',
      tue: 'Di',
      wed: 'Mi',
      thu: 'Do',
      fri: 'Fr'
      , institution: 'Institution',
      communication: 'Kommunikation & Korrespondenz',
      processes: 'Prozesse & Verfahren',
      architecture: 'Architektur & Beziehungen',
      compliance: 'Compliance',
      resources: 'Ressourcen',
      assistant: 'Verwaltungsassistent',
      complianceTracked: 'verfolgter Fall',
      backToOverview: 'Zur Übersicht zurückkehren',
      tachesTerminees: 'Abgeschlossene Aufgaben',
      nouvelleTache: 'Neue Aufgabe',
      modifierTache: 'Aufgabe bearbeiten'
      , userRegisterTitle: 'M3S-Konten und Verwaltungsverzeichnis'
      , userRegisterDescription: 'Der Zähler erfasst authentifizierte Konten. Die Tabelle zeigt getrennt das in der HR-Quelle verfügbare Verwaltungsverzeichnis.'
      , authenticatedAccounts: 'Authentifizierte M3S-Konten'
      , administrativeDirectory: 'Verwaltungsverzeichnis'
      , readOnlySource: 'Governance-Quelle · schreibgeschützt'
      , sourceConnected: 'Quelle verbunden'
      , sourceUnavailable: 'Quelle nicht verfügbar'
      , loading: 'Wird geladen…'
      , position: 'Funktion'
      , department: 'Team'
      , memberType: 'Mitgliedstyp'
      , noUsers: 'In der Quelle sind keine Benutzer verfügbar.'
    }
  };

  const t = translations[language];

  // Data translations for days, roles, and task fields
  const dataTranslations = {
    // Days of Week
    days: {
      FR: { 'Lun': 'Lun', 'Mar': 'Mar', 'Mer': 'Mer', 'Jeu': 'Jeu', 'Ven': 'Ven' },
      EN: { 'Lun': 'Mon', 'Mar': 'Tue', 'Mer': 'Wed', 'Jeu': 'Thu', 'Ven': 'Fri' },
      DE: { 'Lun': 'Mo', 'Mar': 'Di', 'Mer': 'Mi', 'Jeu': 'Do', 'Ven': 'Fr' }
    },
    // Roles
    roles: {
      FR: { 'Manager': 'Manager', 'Administrateur': 'Administrateur', 'Admin Finance': 'Admin Finance', 'Chef Projet': 'Chef Projet', 'Chef Opérations': 'Chef Opérations', 'Viewer': 'Viewer' },
      EN: { 'Manager': 'Manager', 'Administrateur': 'Administrator', 'Admin Finance': 'Finance Admin', 'Chef Projet': 'Project Manager', 'Chef Opérations': 'Operations Chief', 'Viewer': 'Viewer' },
      DE: { 'Manager': 'Manager', 'Administrateur': 'Administrator', 'Admin Finance': 'Finanzadministrator', 'Chef Projet': 'Projektmanager', 'Chef Opérations': 'Betriebsleiter', 'Viewer': 'Betrachter' }
    },
    // Role Descriptions
    roleDescriptions: {
      FR: { 'Accès complet à tous les modules': 'Accès complet à tous les modules', 'Gestion système et permissions': 'Gestion système et permissions', 'Gestion finances uniquement': 'Gestion finances uniquement', 'Coordination et suivi': 'Coordination et suivi', 'Gestion opérations': 'Gestion opérations', 'Lecture seule': 'Lecture seule' },
      EN: { 'Accès complet à tous les modules': 'Full access to all modules', 'Gestion système et permissions': 'System management and permissions', 'Gestion finances uniquement': 'Finance management only', 'Coordination et suivi': 'Coordination and monitoring', 'Gestion opérations': 'Operations management', 'Lecture seule': 'Read-only access' },
      DE: { 'Accès complet à tous les modules': 'Vollzugriff auf alle Module', 'Gestion système et permissions': 'Systemverwaltung und Berechtigungen', 'Gestion finances uniquement': 'Nur Finanzverwaltung', 'Coordination et suivi': 'Koordination und Überwachung', 'Gestion opérations': 'Betriebsverwaltung', 'Lecture seule': 'Nur Lesezugriff' }
    },
    taskStatuses: {
      FR: { 'Terminé': 'Terminé', 'En cours': 'En cours', 'À faire': 'À faire', 'A faire': 'À faire', 'Bloqué': 'Bloqué', 'Annulé': 'Annulé' },
      EN: { 'Terminé': 'Done', 'En cours': 'In progress', 'À faire': 'To do', 'A faire': 'To do', 'Bloqué': 'Blocked', 'Annulé': 'Cancelled' },
      DE: { 'Terminé': 'Erledigt', 'En cours': 'In Bearbeitung', 'À faire': 'Zu erledigen', 'A faire': 'Zu erledigen', 'Bloqué': 'Blockiert', 'Annulé': 'Abgebrochen' }
    },
    taskPriorities: {
      FR: { 'Haute': 'Haute', 'Moyenne': 'Moyenne', 'Basse': 'Basse', 'Urgente': 'Urgente' },
      EN: { 'Haute': 'High', 'Moyenne': 'Medium', 'Basse': 'Low', 'Urgente': 'Urgent' },
      DE: { 'Haute': 'Hoch', 'Moyenne': 'Mittel', 'Basse': 'Niedrig', 'Urgente': 'Dringend' }
    },
    taskModules: TASK_MODULE_LABELS
  };

  const translateRole = (role) => dataTranslations.roles[language]?.[role] || role;
  const translateRoleDescription = (desc) => dataTranslations.roleDescriptions[language]?.[desc] || desc;
  const formatValue = (value) => {
    const text = String(value || '').trim();
    return text && text !== 'N/A' ? text : t.nonRenseigne;
  };
  const normalizeUserStatus = (value) => {
    const text = String(value || '').trim().toLowerCase();
    if (['inactif', 'inactive', 'inaktiv', 'false', '0'].includes(text)) return 'Inactif';
    if (['suspendu', 'suspended', 'gesperrt'].includes(text)) return 'Suspendu';
    return 'Actif';
  };
  const getUserStatusLabel = (status) => {
    const normalized = normalizeUserStatus(status);
    if (normalized === 'Inactif') return t.inactive;
    if (normalized === 'Suspendu') return t.suspended;
    return t.active;
  };
  const getUserStatusClass = (status) => {
    const normalized = normalizeUserStatus(status);
    if (normalized === 'Actif') return 'bg-green-900 text-green-200';
    if (normalized === 'Suspendu') return 'bg-amber-900 text-amber-200';
    return 'bg-red-900 text-red-200';
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [usersStatus, setUsersStatus] = useState('loading');
  const [authAccountsCount, setAuthAccountsCount] = useState(null);
  const [authAccountsStatus, setAuthAccountsStatus] = useState('loading');
  const [usersSourceTimestamp, setUsersSourceTimestamp] = useState(null);
  const [roles, setRoles] = useState([]);
  const [taskSummary, setTaskSummary] = useState({ total: null, open: null, completed: null });
  const [taskSummaryStatus, setTaskSummaryStatus] = useState('loading');
  const [taskReferences, setTaskReferences] = useState(null);
  useEffect(() => { setTaskReferences(null); }, [user?.id]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    nom: '',
    permissions: [],
    description: ''
  });

  const handleTaskSummary = useCallback((summary, status) => {
    setTaskSummary(summary || { total: null, open: null, completed: null });
    setTaskSummaryStatus(status);
  }, []);

  useEffect(() => {
    const requestedTab = new URLSearchParams(location.search).get('tab');
    const resolvedTab = resolveAdministrationTab(requestedTab, { canReadAudit });
    setActiveTab(resolvedTab);
    if (requestedTab === 'audit' && !canReadAudit) {
      navigate(buildAdministrationTabPath('overview'), { replace: true });
    }
  }, [canReadAudit, location.search, navigate]);

  useEffect(() => {
    if (activeTab === 'planning') return;
    const controller = new AbortController();
    handleTaskSummary(null, 'loading');
    api.getTasksCount({ signal: controller.signal }).then(summary => {
      if (!controller.signal.aborted) handleTaskSummary(summary, 'ready');
    }).catch(() => {
      if (!controller.signal.aborted) handleTaskSummary(null, 'unavailable');
    });
    return () => controller.abort();
  }, [activeTab, handleTaskSummary, user?.id]);

  // Les rôles restent un prototype local distinct du registre utilisateurs.
  useEffect(() => {
    setRoles([
      { id: 1, nom: 'Manager', permissions: ['Read', 'Create', 'Update', 'Delete', 'Admin'], description: 'Accès complet à tous les modules' },
      { id: 2, nom: 'Administrateur', permissions: ['Read', 'Create', 'Update', 'Delete', 'Audit'], description: 'Gestion système et permissions' },
      { id: 3, nom: 'Admin Finance', permissions: ['Read Finance', 'Create Finance', 'Update Finance', 'Export'], description: 'Gestion finances uniquement' },
      { id: 4, nom: 'Chef Projet', permissions: ['Read', 'Create', 'Update'], description: 'Coordination et suivi' },
      { id: 5, nom: 'Chef Opérations', permissions: ['Read', 'Create', 'Update'], description: 'Gestion opérations' },
      { id: 6, nom: 'Viewer', permissions: ['Read'], description: 'Lecture seule' },
    ]);

  }, []);

  useEffect(() => {
    if (activeTab !== 'users') return;

    let active = true;
    setUsersStatus('loading');
    setAuthAccountsStatus('loading');

    Promise.allSettled([api.getUsers(100, 0), api.getAuthAccountsCount()]).then(([usersResult, accountsResult]) => {
      if (!active) return;

      if (usersResult.status === 'fulfilled' && Array.isArray(usersResult.value?.data)) {
        setUsers(usersResult.value.data.map(normalizeAdministrationUser));
        setUsersSourceTimestamp(usersResult.value.timestamp || null);
        setUsersStatus('ready');
      } else {
        setUsers([]);
        setUsersSourceTimestamp(null);
        setUsersStatus('unavailable');
      }

      if (accountsResult.status === 'fulfilled') {
        const count = normalizeAuthAccountsCount(accountsResult.value);
        setAuthAccountsCount(count);
        setAuthAccountsStatus(count === null ? 'unavailable' : 'ready');
      } else {
        setAuthAccountsCount(null);
        setAuthAccountsStatus('unavailable');
      }
    });

    return () => { active = false; };
  }, [activeTab]);

  // Calculs KPIs
  const tasksTotal = taskSummaryStatus === 'ready' ? taskSummary.total : null;
  const openTasks = taskSummaryStatus === 'ready' ? taskSummary.open : null;
  const completedTasks = taskSummaryStatus === 'ready' ? taskSummary.completed : null;

  // Gestion formulaires
  const handleRoleChange = (field, value) => {
    setRoleFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveRole = () => {
    if (!roleFormData.nom) {
      alert(t.remplirChamps);
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

  const handleEditRole = (role) => {
    setEditingId(role.id);
    setRoleFormData(role);
    setShowRoleModal(true);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const handleTabSelect = (tab, { fromOverview = false } = {}) => {
    setActiveTab(tab);
    navigate(buildAdministrationTabPath(tab, { fromOverview }));
  };

  const handleOverviewNavigate = tab => handleTabSelect(tab, { fromOverview: true });
  const returnToOverview = shouldShowAdministrationOverviewReturn(activeTab, location.search);

  return (
    <>
      <div className="administration-page min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="mx-auto w-full max-w-[1800px]">

        <ModulePageTabs
          moduleId="administration"
          language={language}
          activeTab={activeTab}
          onSelect={handleTabSelect}
          permissions={permissions}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'institution', label: t.institution },
            { tab: 'planning', label: taskSummaryStatus === 'ready' ? `${t.planning} (${tasksTotal})` : t.planning },
            { tab: 'communication', label: t.communication },
            { tab: 'compliance', label: t.compliance },
            { tab: 'processes', label: t.processes },
            { tab: 'architecture', label: t.architecture },
            { tab: 'resources', label: t.resources },
            { tab: 'assistant', label: t.assistant },
            ...(canReadAudit ? [{ tab: 'audit', label: t.audit }] : [])
          ]}
        />

        {returnToOverview && (
          <nav className="mb-5" aria-label={t.backToOverview}>
            <button
              type="button"
              onClick={() => handleTabSelect('overview')}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-3 text-sm font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              {t.backToOverview}
            </button>
          </nav>
        )}

        <ModuleTabContent activeTab={activeTab}>
        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <AdministrationDashboardOverview
            language={language}
            tasksTotal={tasksTotal}
            tasksStatus={taskSummaryStatus}
            tasksCoverage={taskSummary.coverage}
            openTasks={openTasks}
            completedTasks={completedTasks}
            onNavigate={handleOverviewNavigate}
          />
        )}

        {activeTab === 'institution' && (
          <InstitutionOverview language={language} />
        )}

        {activeTab === 'planning' && (
          <div id="administration-task-register" className="scroll-mt-24" tabIndex="-1">
            <PlanningOverview
              agenda={<CorrespondenceAgenda language={language} />}
              language={language}
              tasksTotal={tasksTotal}
              tasksStatus={taskSummaryStatus}
              tasksCoverage={taskSummary.coverage}
              taskReferences={taskReferences}
              openTasks={openTasks}
              completedTasks={completedTasks}
            >
              <JournalTaskRegister language={language} />
            </PlanningOverview>
            <PersistentTaskRegister key={user?.id || user?.email || 'current-account'} language={language} moduleLabels={dataTranslations.taskModules[language]} onSummaryChange={handleTaskSummary} onReferencesChange={setTaskReferences} />
          </div>
        )}

        {activeTab === 'compliance' && (
          <ComplianceOverview language={language} />
        )}

        {activeTab === 'communication' && (
          <CommunicationOverview language={language} correspondenceId={new URLSearchParams(location.search).get('correspondenceId') || ''} />
        )}

        {activeTab === 'glossary' && (
          <AdministrationGlossary language={language} />
        )}

        {activeTab === 'processes' && (
          <ProcessProcedureArchiveOverview language={language} />
        )}

        {activeTab === 'architecture' && (
          <AdministrationArchitectureOverview language={language} />
        )}

        {activeTab === 'resources' && (
          <AdministrationResources language={language} />
        )}

        {activeTab === 'assistant' && (
          <AdministrativeAssistant language={language} />
        )}

        {activeTab === 'audit' && canReadAudit && (
          <AdministrationAuditLog language={language} />
        )}

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <section id="administration-users-register" className="scroll-mt-24 space-y-5" tabIndex="-1">
            <button type="button" className="m3s-secondary-button px-4 py-2" onClick={() => navigate('/account')}>
              {{ FR: 'Mon compte', EN: 'My account', DE: 'Mein Konto' }[language]}
            </button>
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">{t.userRegisterTitle}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{t.userRegisterDescription}</p>
                </div>
                <span className="w-fit rounded-full border border-cyan-700 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {t.readOnlySource}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-blue-800 bg-blue-950/30 p-4">
                  <p className="text-sm font-medium text-blue-200">{t.authenticatedAccounts}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">
                    {authAccountsStatus === 'loading' ? t.loading : authAccountsStatus === 'ready' ? authAccountsCount : '—'}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {authAccountsStatus === 'ready' ? t.sourceConnected : authAccountsStatus === 'loading' ? t.loading : t.sourceUnavailable}
                  </p>
                </div>
                <div className="rounded-md border border-slate-600 bg-slate-900/35 p-4">
                  <p className="text-sm font-medium text-slate-200">{t.administrativeDirectory}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">
                    {usersStatus === 'loading' ? t.loading : usersStatus === 'ready' ? users.length : '—'}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {usersStatus === 'ready'
                      ? `${t.sourceConnected}${usersSourceTimestamp ? ` · ${new Date(usersSourceTimestamp).toLocaleString()}` : ''}`
                      : usersStatus === 'loading' ? t.loading : t.sourceUnavailable}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800">
              <table className="min-w-[760px] w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.email}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.position}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.department}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.memberType}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                  </tr>
                </thead>
                <tbody>
                  {usersStatus === 'loading' && (
                    <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-300">{t.loading}</td></tr>
                  )}
                  {usersStatus === 'unavailable' && (
                    <tr><td colSpan="6" className="px-4 py-8 text-center text-amber-200">{t.sourceUnavailable}</td></tr>
                  )}
                  {usersStatus === 'ready' && users.length === 0 && (
                    <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-300">{t.noUsers}</td></tr>
                  )}
                  {users.map(u => (
                    <tr
                      key={u.id}
                      className="administration-table-row border-t border-slate-700 transition-colors hover:bg-blue-950/25"
                    >
                      <td className="px-4 py-2 text-slate-300 font-medium">{formatValue(u.name)}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(u.email)}</td>
                      <td className="px-4 py-2 text-slate-300">{formatValue(u.position)}</td>
                      <td className="px-4 py-2 text-slate-300">{formatValue(u.department)}</td>
                      <td className="px-4 py-2 text-slate-300">{formatValue(u.memberType)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getUserStatusClass(u.status)}`}>
                          {getUserStatusLabel(u.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Rôles */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex justify-end mb-4">
              <StandardCreateButton onClick={() => { setEditingId(null); setRoleFormData({ nom: '', permissions: [], description: '' }); setShowRoleModal(true); }}>
                {t.newRole}
              </StandardCreateButton>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map(r => (
                <div key={r.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-100">{translateRole(r.nom)}</h4>
                      <p className="text-slate-400 text-sm">{translateRoleDescription(r.description)}</p>
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
                  <p className="text-slate-400 text-xs mt-4">{t.userCount}: {users.filter(u => u.role === r.nom).length}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <ChildTabPlaceholder moduleId="administration" language={language} activeTab={activeTab} permissions={permissions} handledTabs={['overview', 'institution', 'planning', 'communication', 'compliance', 'processes', 'architecture', 'resources', 'assistant', 'audit', 'users', 'roles', 'glossary']} />
        </ModuleTabContent>
        </div>
      </div>


      {/* Modal Rôle */}
      {showRoleModal && (
        <div className="administration-modal fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center">
          <form
            className="administration-modal__panel max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-5 shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
            onSubmit={(event) => { event.preventDefault(); handleSaveRole(); }}
          >
            <h2 id="role-modal-title" className="mb-6 text-2xl font-semibold text-slate-100">
              {editingId ? t.editRole : t.newRole}
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="role-name" className="mb-2 block text-sm font-medium text-slate-300">{t.nominRole} *</label>
                <input id="role-name" type="text" required value={roleFormData.nom} onChange={(e) => handleRoleChange('nom', e.target.value)} className="min-h-11 w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="ex: Manager" />
              </div>

              <div>
                <label htmlFor="role-description" className="mb-2 block text-sm font-medium text-slate-300">{t.description}</label>
                <textarea id="role-description" value={roleFormData.description} onChange={(e) => handleRoleChange('description', e.target.value)} className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Description du rôle" rows="3" />
              </div>

              <div>
                <label htmlFor="role-permissions" className="mb-2 block text-sm font-medium text-slate-300">{t.permissions}</label>
                <textarea id="role-permissions" value={roleFormData.permissions.join(', ')} onChange={(e) => handleRoleChange('permissions', e.target.value.split(',').map(p => p.trim()))} className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Read, Create, Update, Delete" rows="3" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setShowRoleModal(false)} className="administration-modal__cancel min-h-11 rounded-md bg-slate-700 px-4 py-2 font-medium text-white transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400">{t.annuler}</button>
              <button type="submit" className={`${editingId ? 'm3s-primary-button' : 'm3s-success-button'} administration-modal__primary min-h-11 px-4`}>{editingId ? t.modifier : t.creer}</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;

