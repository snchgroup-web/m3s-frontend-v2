import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, LogOut, Globe, Home, DollarSign, Users, Briefcase, Package, Building2, FileText, Settings as AdminIcon } from 'lucide-react';

// Mock data - Replace with real API calls
const mockData = {
  financialTrend: [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 41000 }
  ],
  staffDistribution: [
    { name: 'Employés', value: 12 },
    { name: 'Bénévoles', value: 24 },
    { name: 'Membres', value: 156 }
  ],
  moduleStats: {
    finance: { revenue: 285000, expenses: 215000, balance: 70000 },
    rh: { employees: 12, volunteers: 24, members: 156 },
    crm: { prospects: 45, clients: 28, donations: 18 },
    production: { orders: 52, completed: 38, pending: 14 },
    actifs: { total: 1250000, depreciation: 125000 },
    ged: { documents: 847, recent: 12 },
    tasks: { total: 234, completed: 178, pending: 56 }
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  // State
  const [language, setLanguage] = useState('FR');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState('overview');

  // Translations
  const translations = {
    FR: {
      dashboard: 'Tableau de Bord',
      welcome: 'Bienvenue',
      overview: 'Aperçu',
      finance: 'Finance',
      rh: 'Ressources Humaines',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Actifs',
      ged: 'GED',
      admin: 'Administration',
      revenue: 'Recettes',
      expenses: 'Dépenses',
      balance: 'Solde',
      employees: 'Employés',
      volunteers: 'Bénévoles',
      members: 'Membres',
      prospects: 'Prospects',
      clients: 'Clients',
      orders: 'Commandes',
      assets: 'Actifs',
      documents: 'Documents',
      logout: 'Déconnexion',
      month: 'Mois',
      value: 'Valeur',
      status: 'Statut',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Dernière mise à jour',
      currency: 'CHF'
    },
    EN: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      overview: 'Overview',
      finance: 'Finance',
      rh: 'Human Resources',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Assets',
      ged: 'Document Management',
      admin: 'Administration',
      revenue: 'Revenue',
      expenses: 'Expenses',
      balance: 'Balance',
      employees: 'Employees',
      volunteers: 'Volunteers',
      members: 'Members',
      prospects: 'Prospects',
      clients: 'Clients',
      orders: 'Orders',
      assets: 'Assets',
      documents: 'Documents',
      logout: 'Logout',
      month: 'Month',
      value: 'Value',
      status: 'Status',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Last Updated',
      currency: 'CHF'
    },
    DE: {
      dashboard: 'Armaturenbrett',
      welcome: 'Willkommen',
      overview: 'Übersicht',
      finance: 'Finanzen',
      rh: 'Personalwesen',
      crm: 'CRM',
      production: 'Produktion',
      actifs: 'Vermögenswerte',
      ged: 'Dokumentenverwaltung',
      admin: 'Verwaltung',
      revenue: 'Einnahmen',
      expenses: 'Ausgaben',
      balance: 'Bilanz',
      employees: 'Mitarbeiter',
      volunteers: 'Freiwillige',
      members: 'Mitglieder',
      prospects: 'Aussichten',
      clients: 'Kunden',
      orders: 'Bestellungen',
      assets: 'Vermögenswerte',
      documents: 'Dokumente',
      logout: 'Abmelden',
      month: 'Monat',
      value: 'Wert',
      status: 'Status',
      total: 'Gesamt',
      kpi: 'KPI',
      lastUpdate: 'Zuletzt aktualisiert',
      currency: 'CHF'
    }
  };

  const t = translations[language];

  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setDashboardData(mockData);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser({
            name: 'Utilisateur M3S',
            role: 'Manager',
            department: 'Administration'
          });
        }
      } catch (err) {
        console.log('Using mock data');
        setDashboardData(mockData);
        setUser({
          name: 'Utilisateur M3S',
          role: 'Manager',
          department: 'Administration'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const modules = [
    { id: 'overview', icon: Home, label: t.overview, color: 'bg-blue-500', path: '/' },
    { id: 'finance', icon: DollarSign, label: t.finance, color: 'bg-green-500', path: '/finance' },
    { id: 'rh', icon: Users, label: t.rh, color: 'bg-purple-500', path: '/rh' },
    { id: 'crm', icon: Briefcase, label: t.crm, color: 'bg-orange-500', path: '/crm' },
    { id: 'production', icon: Package, label: t.production, color: 'bg-red-500', path: '/production' },
    { id: 'actifs', icon: Building2, label: t.actifs, color: 'bg-indigo-500', path: '/actifs' },
    { id: 'ged', icon: FileText, label: t.ged, color: 'bg-cyan-500', path: '/ged' },
    { id: 'admin', icon: AdminIcon, label: t.admin, color: 'bg-gray-500', path: '/administration' }
  ];

  const handleModuleClick = (module) => {
    if (module.path === '/') {
      setActiveModule('overview');
      navigate('/');
    } else {
      setActiveModule(module.id);
      navigate(module.path);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-blue-400">M3S v2.0</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-700 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => handleModuleClick(mod)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-slate-700 transition ${mod.id === activeModule ? 'bg-slate-700 border-l-4 border-blue-500' : ''}`}
            >
              <mod.icon size={20} className={mod.color} />
              {sidebarOpen && <span className="text-sm">{mod.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-slate-700 rounded">
            <Globe size={18} />
            {sidebarOpen && <span>{language}</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded">
            <LogOut size={18} />
            {sidebarOpen && <span>{t.logout}</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">{t.dashboard}</h2>
              <p className="text-slate-400 text-sm mt-1">{t.welcome}, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm hover:bg-slate-600">
                <option value="FR">Français</option>
                <option value="EN">English</option>
                <option value="DE">Deutsch</option>
              </select>
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
              <p className="text-green-100 text-sm font-medium">{t.revenue}</p>
              <p className="text-3xl font-bold mt-2">{dashboardData?.moduleStats.finance.revenue.toLocaleString('fr-CH')} {t.currency}</p>
              <p className="text-green-200 text-xs mt-2">+12% ce mois</p>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 shadow-lg">
              <p className="text-red-100 text-sm font-medium">{t.expenses}</p>
              <p className="text-3xl font-bold mt-2">{dashboardData?.moduleStats.finance.expenses.toLocaleString('fr-CH')} {t.currency}</p>
              <p className="text-red-200 text-xs mt-2">+5% ce mois</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 shadow-lg">
              <p className="text-blue-100 text-sm font-medium">{t.balance}</p>
              <p className="text-3xl font-bold mt-2">{dashboardData?.moduleStats.finance.balance.toLocaleString('fr-CH')} {t.currency}</p>
              <p className="text-blue-200 text-xs mt-2">Solde positif</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 shadow-lg">
              <p className="text-purple-100 text-sm font-medium">{t.total} {t.employees}</p>
              <p className="text-3xl font-bold mt-2">{dashboardData?.moduleStats.rh.employees + dashboardData?.moduleStats.rh.volunteers + dashboardData?.moduleStats.rh.members}</p>
              <p className="text-purple-200 text-xs mt-2">Tous les statuts</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Financial Trend */}
            <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">{t.finance} - {t.month}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData?.financialTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Staff Distribution */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">{t.rh}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dashboardData?.staffDistribution || []} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {(dashboardData?.staffDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Module Stats */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Statistiques par Module</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick(modules[3])}>
                <p className="text-sm text-slate-400">{t.crm}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.crm.clients}</p>
                <p className="text-xs text-slate-500 mt-1">{t.clients}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick(modules[4])}>
                <p className="text-sm text-slate-400">{t.production}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.production.orders}</p>
                <p className="text-xs text-slate-500 mt-1">{t.orders}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick(modules[6])}>
                <p className="text-sm text-slate-400">{t.ged}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.ged.documents}</p>
                <p className="text-xs text-slate-500 mt-1">{t.documents}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick(modules[5])}>
                <p className="text-sm text-slate-400">{t.actifs}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.actifs.total.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Valeur Totale</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-500 text-xs py-4">
            <p>{t.lastUpdate}: {new Date().toLocaleString('fr-CH')}</p>
            <p>M3S ERP v2.0 - SENESWISS GROUP © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;