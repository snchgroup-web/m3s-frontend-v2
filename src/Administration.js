import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Plus, Edit2, Trash2, Shield, Users, Lock, Activity, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import { ModulePageTabs, ChildTabPlaceholder } from './moduleTabs';
import TableControls from './TableControls';

const Admin = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Translations
  const translations = {
    FR: {
      title: 'Administration',
      subtitle: 'Gestion administrative, activités, tâches et communication',
      totalUsers: 'Total Utilisateurs',
      activeUsers: 'Utilisateurs Actifs',
      totalRoles: 'Total Rôles',
      auditLogs: 'Audit Logs',
      failedLogins: 'Connexions Échouées',
      overview: 'Vue d\'ensemble',
      users: 'Utilisateurs',
      roles: 'Rôles',
      audit: 'Audit Log',
      tasks: 'Activités & Tâches',
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
      projetsPhases: 'Projets / Phases',
      communication: 'Communication',
      tachesTerminees: 'Tâches terminées',
      nouvelleTache: 'Nouvelle tâche',
      modifierTache: 'Modifier tâche'
    },
    EN: {
      title: 'Administration',
      subtitle: 'Administrative management, activities, tasks and communication',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      totalRoles: 'Total Roles',
      auditLogs: 'Audit Logs',
      failedLogins: 'Failed Logins',
      overview: 'Overview',
      users: 'Users',
      roles: 'Roles',
      audit: 'Audit Log',
      tasks: 'Activities & Tasks',
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
      projetsPhases: 'Projects / Phases',
      communication: 'Communication',
      tachesTerminees: 'Completed tasks',
      nouvelleTache: 'New task',
      modifierTache: 'Edit task'
    },
    DE: {
      title: 'Verwaltung',
      subtitle: 'Administrative Verwaltung, Aktivitäten, Aufgaben und Kommunikation',
      totalUsers: 'Gesamtbenutzer',
      activeUsers: 'Aktive Benutzer',
      totalRoles: 'Gesamtrollen',
      auditLogs: 'Audit-Protokolle',
      failedLogins: 'Fehlgeschlagene Anmeldungen',
      overview: 'Übersicht',
      users: 'Benutzer',
      roles: 'Rollen',
      audit: 'Audit-Protokoll',
      tasks: 'Aktivitäten & Aufgaben',
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
      projetsPhases: 'Projekte / Phasen',
      communication: 'Kommunikation',
      tachesTerminees: 'Abgeschlossene Aufgaben',
      nouvelleTache: 'Neue Aufgabe',
      modifierTache: 'Aufgabe bearbeiten'
    }
  };

  const t = translations[language];

  // Data translations for audit actions, days, and roles
  const dataTranslations = {
    // Audit Actions
    auditActions: {
      FR: { 'LOGIN': 'Connexion', 'CREATE': 'Création', 'UPDATE': 'Modification', 'DELETE': 'Suppression', 'READ': 'Lecture', 'EXPORT': 'Exportation', 'LOGIN_FAILED': 'Échec Connexion' },
      EN: { 'LOGIN': 'Login', 'CREATE': 'Create', 'UPDATE': 'Update', 'DELETE': 'Delete', 'READ': 'Read', 'EXPORT': 'Export', 'LOGIN_FAILED': 'Login Failed' },
      DE: { 'LOGIN': 'Anmeldung', 'CREATE': 'Erstellen', 'UPDATE': 'Aktualisierung', 'DELETE': 'Löschung', 'READ': 'Lesen', 'EXPORT': 'Exportieren', 'LOGIN_FAILED': 'Anmeldung Fehlgeschlagen' }
    },
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
    taskModules: {
      FR: {
        'DOCUMENTS': 'Documents',
        'RECETTES': 'Recettes',
        'DEPENSES': 'Dépenses',
        'FINANCE': 'Finance',
        'FINANCES': 'Finances',
        'SOCIAL': 'Social',
        'IMMO': 'Immo',
        'STOCKS': 'Stocks',
        'ACTIFS': 'Actifs',
        'TACHES': 'Tâches',
        'RH': 'RH',
        'GED': 'GED',
        'CRM': 'CRM',
        'PRODUCTION': 'Production',
        'FX': 'Convertisseur FX',
        'ADMINISTRATION': 'Administration'
      },
      EN: {
        'DOCUMENTS': 'Documents',
        'RECETTES': 'Income',
        'DEPENSES': 'Expenses',
        'FINANCE': 'Finance',
        'FINANCES': 'Finance',
        'SOCIAL': 'Social',
        'IMMO': 'Real estate',
        'STOCKS': 'Stock',
        'ACTIFS': 'Assets',
        'TACHES': 'Tasks',
        'RH': 'HR',
        'GED': 'Document management',
        'CRM': 'CRM',
        'PRODUCTION': 'Production',
        'FX': 'FX converter',
        'ADMINISTRATION': 'Administration'
      },
      DE: {
        'DOCUMENTS': 'Dokumente',
        'RECETTES': 'Einnahmen',
        'DEPENSES': 'Ausgaben',
        'FINANCE': 'Finanzen',
        'FINANCES': 'Finanzen',
        'SOCIAL': 'Soziales',
        'IMMO': 'Immobilien',
        'STOCKS': 'Bestände',
        'ACTIFS': 'Aktiva',
        'TACHES': 'Aufgaben',
        'RH': 'Personal',
        'GED': 'Dokumentenverwaltung',
        'CRM': 'CRM',
        'PRODUCTION': 'Produktion',
        'FX': 'FX-Konverter',
        'ADMINISTRATION': 'Verwaltung'
      }
    }
  };

  const translateAuditAction = (action) => dataTranslations.auditActions[language]?.[action] || action;
  const translateDay = (day) => dataTranslations.days[language]?.[day] || day;
  const translateRole = (role) => dataTranslations.roles[language]?.[role] || role;
  const translateRoleDescription = (desc) => dataTranslations.roleDescriptions[language]?.[desc] || desc;
  const normalizeLookupKey = (value) => String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  const taskStatusKeys = {
    'TERMINE': 'Terminé',
    'EN COURS': 'En cours',
    'A FAIRE': 'À faire',
    'BLOQUE': 'Bloqué',
    'ANNULE': 'Annulé'
  };
  const taskPriorityKeys = {
    'HAUTE': 'Haute',
    'MOYENNE': 'Moyenne',
    'BASSE': 'Basse',
    'URGENTE': 'Urgente'
  };
  const taskStatusOptions = ['À faire', 'En cours', 'Terminé', 'Bloqué', 'Annulé'];
  const taskPriorityOptions = ['Basse', 'Moyenne', 'Haute', 'Urgente'];
  const taskModuleOptions = ['ADMINISTRATION', 'TACHES', 'DOCUMENTS', 'RECETTES', 'DEPENSES', 'FINANCE', 'SOCIAL', 'IMMO', 'STOCKS', 'ACTIFS', 'RH', 'GED', 'CRM', 'PRODUCTION', 'FX'];
  const translateTaskStatus = (status) => {
    const canonical = taskStatusKeys[normalizeLookupKey(status)] || status;
    return dataTranslations.taskStatuses[language]?.[canonical] || status;
  };
  const translateTaskPriority = (priority) => {
    const canonical = taskPriorityKeys[normalizeLookupKey(priority)] || priority;
    return dataTranslations.taskPriorities[language]?.[canonical] || priority;
  };
  const translateTaskModule = (module) => {
    const key = normalizeLookupKey(module);
    return dataTranslations.taskModules[language]?.[key] || module;
  };
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
  const [roles, setRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
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
  const [taskFormData, setTaskFormData] = useState({
    titre: '',
    statut: 'En cours',
    priorite: 'Moyenne',
    responsable: '',
    module: 'ADMINISTRATION',
    progression: 0
  });

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (['overview', 'tasks', 'institution', 'projects', 'communication'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.getTasks(100, 0);
        setTasks(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error('Erreur chargement taches:', error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

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
  const auditCount = auditLogs.length;
  const completedTasks = tasks.filter(task => normalizeLookupKey(task.statut || task.status) === 'TERMINE').length;

  // Données pour charts
  const roleDistribution = roles.map(r => ({
    name: translateRole(r.nom),
    nameKey: r.nom,
    count: users.filter(u => u.role === r.nom).length
  }));

  const auditActivity = [
    { action: translateAuditAction('LOGIN'), actionKey: 'LOGIN', count: auditLogs.filter(log => log.action === 'LOGIN').length },
    { action: translateAuditAction('CREATE'), actionKey: 'CREATE', count: auditLogs.filter(log => log.action === 'CREATE').length },
    { action: translateAuditAction('UPDATE'), actionKey: 'UPDATE', count: auditLogs.filter(log => log.action === 'UPDATE').length },
    { action: translateAuditAction('DELETE'), actionKey: 'DELETE', count: auditLogs.filter(log => log.action === 'DELETE').length },
    { action: translateAuditAction('READ'), actionKey: 'READ', count: auditLogs.filter(log => log.action === 'READ').length },
  ];

  const dailyActivity = [
    { jour: translateDay('Lun'), jourKey: 'Lun', actions: 8 },
    { jour: translateDay('Mar'), jourKey: 'Mar', actions: 12 },
    { jour: translateDay('Mer'), jourKey: 'Mer', actions: 15 },
    { jour: translateDay('Jeu'), jourKey: 'Jeu', actions: 10 },
    { jour: translateDay('Ven'), jourKey: 'Ven', actions: auditCount },
  ];

  // Gestion formulaires
  const handleUserChange = (field, value) => {
    setUserFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (field, value) => {
    setRoleFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaskChange = (field, value) => {
    setTaskFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = () => {
    if (!userFormData.nom || !userFormData.email) {
      alert(t.remplirChamps);
      return;
    }

    const normalizedUser = {
      ...userFormData,
      statut: normalizeUserStatus(userFormData.statut)
    };

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...normalizedUser, id: editingId } : u));
    } else {
      setUsers([...users, { ...normalizedUser, id: Date.now() }]);
    }

    setShowUserModal(false);
    setEditingId(null);
    setUserFormData({ nom: '', email: '', role: 'Viewer', statut: 'Actif', dateCreation: new Date().toISOString().split('T')[0] });
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

  const getDefaultTaskFormData = () => ({
    titre: '',
    statut: 'En cours',
    priorite: 'Moyenne',
    responsable: '',
    module: 'ADMINISTRATION',
    progression: 0
  });

  const openNewTaskModal = () => {
    setEditingTaskId(null);
    setTaskFormData(getDefaultTaskFormData());
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id || task.source_id);
    setTaskFormData({
      titre: task.titre || task.title || '',
      statut: taskStatusKeys[normalizeLookupKey(task.statut || task.status)] || 'En cours',
      priorite: taskPriorityKeys[normalizeLookupKey(task.priorite || task.priority)] || 'Moyenne',
      responsable: task.responsable || '',
      module: normalizeLookupKey(task.module || 'ADMINISTRATION') || 'ADMINISTRATION',
      progression: Number(task.progression || 0)
    });
    setShowTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!taskFormData.titre) {
      alert(t.remplirChamps);
      return;
    }

    const normalizedTask = {
      titre: taskFormData.titre,
      statut: taskStatusKeys[normalizeLookupKey(taskFormData.statut)] || taskFormData.statut,
      priorite: taskPriorityKeys[normalizeLookupKey(taskFormData.priorite)] || taskFormData.priorite,
      responsable: taskFormData.responsable,
      module: normalizeLookupKey(taskFormData.module) || 'ADMINISTRATION',
      progression: Math.max(0, Math.min(100, Number(taskFormData.progression) || 0))
    };

    if (editingTaskId) {
      setTasks(tasks.map(task => (task.id || task.source_id) === editingTaskId ? { ...task, ...normalizedTask, id: task.id || editingTaskId } : task));
    } else {
      setTasks([{ ...normalizedTask, id: Date.now() }, ...tasks]);
    }

    setShowTaskModal(false);
    setEditingTaskId(null);
    setTaskFormData(getDefaultTaskFormData());
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => (task.id || task.source_id) !== id));
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">{t.institution}</p>
                <p className="text-white text-2xl font-bold">1</p>
              </div>
              <Users size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">{t.tasks}</p>
                <p className="text-white text-2xl font-bold">{tasks.length}</p>
              </div>
              <AlertCircle size={32} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">{t.tachesTerminees}</p>
                <p className="text-white text-2xl font-bold">{completedTasks}</p>
              </div>
              <Lock size={32} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">{t.projetsPhases}</p>
                <p className="text-white text-2xl font-bold">0</p>
              </div>
              <Activity size={32} className="text-orange-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm">{t.communication}</p>
                <p className="text-white text-2xl font-bold">0</p>
              </div>
              <Shield size={32} className="text-red-400" />
            </div>
          </div>
        </div>

        <ModulePageTabs
          moduleId="administration"
          language={language}
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { tab: 'overview', label: t.overview },
            { tab: 'institution', label: t.institution },
            { tab: 'tasks', label: `${t.tasks} (${tasks.length})` },
            { tab: 'projects', label: t.projetsPhases },
            { tab: 'communication', label: t.communication }
          ]}
        />

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribution des rôles */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4">{t.roleDistribution}</h3>
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
              <h3 className="text-white font-bold mb-4">{t.activityByType}</h3>
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
              <h3 className="text-white font-bold mb-4">{t.dailyActivity}</h3>
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

        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={openNewTaskModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.nouvelleTache}
              </button>
            </div>
            <TableControls rows={tasks} renderTable={(visibleRows) => (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.titleTask}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.priorite}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.responsable}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.module}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.progression}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map(task => (
                    <tr key={task.id || task.source_id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{formatValue(task.titre || task.title)}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(translateTaskStatus(task.statut || task.status))}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(translateTaskPriority(task.priorite || task.priority))}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(task.responsable)}</td>
                      <td className="px-4 py-2 text-slate-400">{formatValue(translateTaskModule(task.module))}</td>
                      <td className="px-4 py-2 text-blue-400 font-bold">{Number(task.progression || 0)}%</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEditTask(task)} className="p-1 hover:bg-slate-600 rounded">
                          <Edit2 size={16} className="text-blue-400" />
                        </button>
                        <button onClick={() => handleDeleteTask(task.id || task.source_id)} className="p-1 hover:bg-slate-600 rounded">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} />
          </div>
        )}

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setEditingId(null); setUserFormData({ nom: '', email: '', role: 'Viewer', statut: 'Actif', dateCreation: new Date().toISOString().split('T')[0] }); setShowUserModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                <Plus size={20} /> {t.newUser}
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.nom}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.email}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.role}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.dateCreation}</th>
                    <th className="px-4 py-2 text-left text-white font-bold">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-2 text-slate-300 font-medium">{formatValue(u.nom)}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(u.email)}</td>
                      <td className="px-4 py-2 text-slate-300">{formatValue(translateRole(u.role))}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getUserStatusClass(u.statut)}`}>
                          {getUserStatusLabel(u.statut)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-slate-400 text-xs">{formatValue(u.dateCreation)}</td>
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
                <Plus size={20} /> {t.newRole}
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map(r => (
                <div key={r.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-bold text-lg">{translateRole(r.nom)}</h4>
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

        {/* Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-2 text-left text-white font-bold">{t.utilisateur}</th>
                  <th className="px-4 py-2 text-left text-white font-bold">{t.action}</th>
                  <th className="px-4 py-2 text-left text-white font-bold">{t.module}</th>
                  <th className="px-4 py-2 text-left text-white font-bold">{t.timestamp}</th>
                  <th className="px-4 py-2 text-left text-white font-bold">{t.statut}</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                    <td className="px-4 py-2 text-slate-300">{log.utilisateur}</td>
                    <td className="px-4 py-2 text-slate-400">{translateAuditAction(log.action)}</td>
                    <td className="px-4 py-2 text-slate-400">{log.module}</td>
                    <td className="px-4 py-2 text-slate-400 text-xs">{log.timestamp}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${log.statut === 'Success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                        {log.statut === 'Success' ? t.success : t.failed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ChildTabPlaceholder moduleId="administration" language={language} activeTab={activeTab} handledTabs={['overview', 'tasks']} />
        </div>
      </div>

      {/* Modal Tache */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingTaskId ? t.modifierTache : t.nouvelleTache}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.titleTask} *</label>
                <input type="text" value={taskFormData.titre} onChange={(e) => handleTaskChange('titre', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.statut}</label>
                <select value={taskFormData.statut} onChange={(e) => handleTaskChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  {taskStatusOptions.map(status => (
                    <option key={status} value={status}>{translateTaskStatus(status)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.priorite}</label>
                <select value={taskFormData.priorite} onChange={(e) => handleTaskChange('priorite', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  {taskPriorityOptions.map(priority => (
                    <option key={priority} value={priority}>{translateTaskPriority(priority)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.responsable}</label>
                <input type="text" value={taskFormData.responsable} onChange={(e) => handleTaskChange('responsable', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.module}</label>
                <select value={taskFormData.module} onChange={(e) => handleTaskChange('module', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  {taskModuleOptions.map(module => (
                    <option key={module} value={module}>{translateTaskModule(module)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.progression}</label>
                <input type="number" min="0" max="100" value={taskFormData.progression} onChange={(e) => handleTaskChange('progression', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowTaskModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSaveTask} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{editingTaskId ? t.modifier : t.creer}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Utilisateur */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? t.editUser : t.newUser}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.nom} *</label>
                <input type="text" value={userFormData.nom} onChange={(e) => handleUserChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Nom complet" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.email} *</label>
                <input type="email" value={userFormData.email} onChange={(e) => handleUserChange('email', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="email@seneswiss.sn" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.role}</label>
                <select value={userFormData.role} onChange={(e) => handleUserChange('role', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  {roles.map(r => (
                    <option key={r.id} value={r.nom}>{translateRole(r.nom)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.statut}</label>
                <select value={userFormData.statut} onChange={(e) => handleUserChange('statut', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500">
                  <option value="Actif">{t.active}</option>
                  <option value="Inactif">{t.inactive}</option>
                  <option value="Suspendu">{t.suspended}</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUserModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSaveUser} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">{editingId ? t.modifier : t.creer}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rôle */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? t.editRole : t.newRole}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.nominRole} *</label>
                <input type="text" value={roleFormData.nom} onChange={(e) => handleRoleChange('nom', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="ex: Manager" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.description}</label>
                <textarea value={roleFormData.description} onChange={(e) => handleRoleChange('description', e.target.value)} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Description du rôle" rows="3" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t.permissions}</label>
                <textarea value={roleFormData.permissions.join(', ')} onChange={(e) => handleRoleChange('permissions', e.target.value.split(',').map(p => p.trim()))} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500" placeholder="Read, Create, Update, Delete" rows="3" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowRoleModal(false)} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">{t.annuler}</button>
              <button onClick={handleSaveRole} className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">{editingId ? t.modifier : t.creer}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;

