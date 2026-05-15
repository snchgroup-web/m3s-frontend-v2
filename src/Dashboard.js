import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from './Header';

// Month translations (stable constants, defined at module level)
const monthTranslations = {
  FR: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Exchange rate: 1 CHF = 656 CFA
const CHF_TO_CFA_RATE = 656;

// Format currency with both CHF and CFA - returns object for separate display
const formatDualCurrency = (chfAmount) => {
  const cfaAmount = Math.round(chfAmount * CHF_TO_CFA_RATE);
  return {
    chf: chfAmount.toLocaleString(),
    cfa: cfaAmount.toLocaleString()
  };
};

// Mock data (stable constant, defined at module level)
const mockDataBaseRaw = {
  financialTrend: [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 48000, expenses: 33000 },
    { month: 'Apr', revenue: 61000, expenses: 38000 },
    { month: 'May', revenue: 55000, expenses: 36000 },
    { month: 'Jun', revenue: 67000, expenses: 41000 }
  ],
  moduleStats: {
    finance: { revenue: 285000, expenses: 215000, balance: 70000, donations: 15000, financing: 25000 },
    rh: { employees: 12, volunteers: 24, members: 156, beneficiaries: 89 },
    crm: { prospects: 45, clients: 28, donations: 18, suppliers: 34 },
    production: { orders: 52, completed: 38, pending: 14, stocks: 342, articles: 127 },
    actifs: { total: 1250000, depreciation: 125000 },
    ged: { documents: 847, recent: 12 },
    tasks: { total: 234, completed: 178, pending: 56 },
    caseStudies: 12
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Translations
  const translations = {
    FR: {
      dashboard: 'Tableau de Bord',
      welcome: 'Bienvenue',
      finance: 'Finance',
      rh: 'Ressources Humaines',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Actifs',
      ged: 'GED',
      revenue: 'Recettes',
      expenses: 'Dépenses',
      balance: 'Solde',
      employees: 'Employés',
      volunteers: 'Bénévoles',
      members: 'Membres',
      prospects: 'Prospects',
      clients: 'Clients',
      orders: 'Commandes',
      documents: 'Documents',
      stocks: 'Quantité en Stock',
      articles: 'Articles',
      donations: 'Dons',
      financing: 'Financements',
      files: 'Fichiers',
      tasks: 'Tâches',
      beneficiaries: 'Bénéficiaires',
      suppliers: 'Fournisseurs',
      month: 'Mois',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Dernière mise à jour',
      currency: 'CHF',
      moduleStats: 'Statistiques par Module'
    },
    EN: {
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      finance: 'Finance',
      rh: 'Human Resources',
      crm: 'CRM',
      production: 'Production',
      actifs: 'Assets',
      ged: 'Document Management',
      revenue: 'Revenue',
      expenses: 'Expenses',
      balance: 'Balance',
      employees: 'Employees',
      volunteers: 'Volunteers',
      members: 'Members',
      prospects: 'Prospects',
      clients: 'Clients',
      orders: 'Orders',
      documents: 'Documents',
      stocks: 'Stock Quantity',
      articles: 'Articles',
      donations: 'Donations',
      financing: 'Financing',
      files: 'Files',
      tasks: 'Tasks',
      beneficiaries: 'Beneficiaries',
      suppliers: 'Suppliers',
      month: 'Month',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Last Updated',
      currency: 'CHF',
      moduleStats: 'Module Statistics'
    },
    DE: {
      dashboard: 'Dashboard',
      welcome: 'Willkommen',
      finance: 'Finanzen',
      rh: 'Personalwesen',
      crm: 'CRM',
      production: 'Produktion',
      actifs: 'Vermögenswerte',
      ged: 'Dokumentenverwaltung',
      revenue: 'Einnahmen',
      expenses: 'Ausgaben',
      balance: 'Bilanz',
      employees: 'Mitarbeiter',
      volunteers: 'Freiwillige',
      members: 'Mitglieder',
      prospects: 'Aussichten',
      clients: 'Kunden',
      orders: 'Bestellungen',
      documents: 'Dokumente',
      stocks: 'Lagermenge',
      articles: 'Artikel',
      donations: 'Spenden',
      financing: 'Finanzierung',
      files: 'Dateien',
      tasks: 'Aufgaben',
      beneficiaries: 'Begünstigte',
      suppliers: 'Lieferanten',
      month: 'Monat',
      total: 'Gesamt',
      kpi: 'KPI',
      lastUpdate: 'Zuletzt aktualisiert',
      currency: 'CHF',
      moduleStats: 'Modulstatistiken'
    }
  };

  const t = translations[language];

  // Get translated month name
  const getMonthName = useCallback((shortMonth) => {
    const index = shortMonths.indexOf(shortMonth);
    return monthTranslations[language][index] || shortMonth;
  }, [language]);

  // Apply month translations
  const mockDataBase = useMemo(() => ({
    ...mockDataBaseRaw,
    financialTrend: mockDataBaseRaw.financialTrend.map(item => ({
      ...item,
      month: getMonthName(item.month)
    }))
  }), [getMonthName]);

  // Create staff distribution with translated names
  const getStaffDistribution = () => [
    { name: t.employees, value: 12 },
    { name: t.volunteers, value: 24 },
    { name: t.members, value: 156 }
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setDashboardData(mockDataBase);
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
        setDashboardData(mockDataBase);
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
  }, [mockDataBase]);

  const handleModuleClick = (path) => {
    navigate(path);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) {
    return (
      <>
        <Header title={t.dashboard} icon="📊" language={language} setLanguage={setLanguage} />
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Chargement du tableau de bord...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* New Header */}
      <Header title={t.dashboard} icon="📊" language={language} setLanguage={setLanguage} />

      {/* Content */}
      <div className="overflow-auto">
        <div className="p-6 space-y-6">
          {/* KPI Cards - Clean Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.revenue}</p>
                <span className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors mt-0.5">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">42 transactions</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-red-500/10 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.expenses}</p>
                <span className="w-2 h-2 rounded-full bg-red-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-red-400 transition-colors">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-red-400 transition-colors mt-0.5">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">38 transactions</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.balance}</p>
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{formatDualCurrency(dashboardData?.moduleStats.finance.balance).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors mt-0.5">{formatDualCurrency(dashboardData?.moduleStats.finance.balance).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">Net mensuel</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.donations}</p>
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">{formatDualCurrency(dashboardData?.moduleStats.finance.donations).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-amber-400 transition-colors mt-0.5">{formatDualCurrency(dashboardData?.moduleStats.finance.donations).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">7 donateurs</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.financing}</p>
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{formatDualCurrency(dashboardData?.moduleStats.finance.financing).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
              <p className="text-lg font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors mt-0.5">{formatDualCurrency(dashboardData?.moduleStats.finance.financing).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">3 projets</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">Staff</p>
                <span className="w-2 h-2 rounded-full bg-purple-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{dashboardData?.moduleStats.rh.employees + dashboardData?.moduleStats.rh.volunteers + dashboardData?.moduleStats.rh.members}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total</p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">{dashboardData?.moduleStats.rh.employees} employés</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.documents}</p>
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{dashboardData?.moduleStats.ged.documents}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.files}</p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">{dashboardData?.moduleStats.ged.recent} récents</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.tasks}</p>
                <span className="w-2 h-2 rounded-full bg-orange-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{dashboardData?.moduleStats.tasks.total}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.total}</p>
              <p className="text-xs text-slate-500 mt-1 border-t border-slate-700/50 pt-1">{dashboardData?.moduleStats.tasks.completed} terminées</p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-rose-500/10 hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">Stocks</p>
                <span className="w-2 h-2 rounded-full bg-rose-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">{dashboardData?.moduleStats.production.stocks}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.stocks}</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">Articles</p>
                <span className="w-2 h-2 rounded-full bg-pink-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">{dashboardData?.moduleStats.production.articles}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.articles}</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">Clients</p>
                <span className="w-2 h-2 rounded-full bg-teal-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{dashboardData?.moduleStats.crm.clients}</p>
              <p className="text-xs text-slate-500 mt-0.5">Actifs</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-lime-500/10 hover:border-lime-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.orders}</p>
                <span className="w-2 h-2 rounded-full bg-lime-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">{dashboardData?.moduleStats.production.orders}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.total}</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.beneficiaries}</p>
                <span className="w-2 h-2 rounded-full bg-violet-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">{dashboardData?.moduleStats.rh.beneficiaries}</p>
              <p className="text-xs text-slate-500 mt-0.5">Personnes</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-sky-500/10 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs font-medium">{t.suppliers}</p>
                <span className="w-2 h-2 rounded-full bg-sky-400 group-hover:animate-pulse"></span>
              </div>
              <p className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{dashboardData?.moduleStats.crm.suppliers}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.total}</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Financial Trend */}
            <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">{t.finance} - {t.month}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData?.financialTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name={t.revenue} stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" name={t.expenses} stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Staff Distribution */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">{t.rh}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={getStaffDistribution()} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {getStaffDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Module Stats */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">{t.moduleStats}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 group" onClick={() => handleModuleClick('/crm')}>
                <p className="text-sm text-slate-400 group-hover:text-blue-400 transition-colors">{t.crm}</p>
                <p className="text-2xl font-bold mt-2 group-hover:text-blue-400 transition-colors">{dashboardData?.moduleStats.crm.clients}</p>
                <p className="text-xs text-slate-500 mt-1">{t.clients}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300 group" onClick={() => handleModuleClick('/production')}>
                <p className="text-sm text-slate-400 group-hover:text-green-400 transition-colors">{t.production}</p>
                <p className="text-2xl font-bold mt-2 group-hover:text-green-400 transition-colors">{dashboardData?.moduleStats.production.orders}</p>
                <p className="text-xs text-slate-500 mt-1">{t.orders}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group" onClick={() => handleModuleClick('/ged')}>
                <p className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">{t.ged}</p>
                <p className="text-2xl font-bold mt-2 group-hover:text-indigo-400 transition-colors">{dashboardData?.moduleStats.ged.documents}</p>
                <p className="text-xs text-slate-500 mt-1">{t.documents}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 group" onClick={() => handleModuleClick('/actifs')}>
                <p className="text-sm text-slate-400 group-hover:text-amber-400 transition-colors">{t.actifs}</p>
                <p className="text-2xl font-bold mt-2 group-hover:text-amber-400 transition-colors">{dashboardData?.moduleStats.actifs.total.toLocaleString()}</p>
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
    </>
  );
};

export default Dashboard;