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
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* New Header */}
      <Header title={t.dashboard} language={language} setLanguage={setLanguage} />

      {/* Content */}
      <div className="overflow-auto">
        <div className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-xl">📊</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{t.dashboard}</h2>
            <p className="text-slate-400 ml-auto">{t.moduleStats}</p>
          </div>

          {/* KPI Cards Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Recettes */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-green-500 hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.revenue}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).chf}</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).cfa}</p>
              <p className="text-slate-500 text-xs">CHF / CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">42 transactions</p>
            </div>

            {/* Dépenses */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-red-500 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.expenses}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).chf}</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).cfa}</p>
              <p className="text-slate-500 text-xs">CHF / CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">38 transactions</p>
            </div>

            {/* Solde */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.balance}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.balance).chf}</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.balance).cfa}</p>
              <p className="text-slate-500 text-xs">CHF / CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">Net mensuel</p>
            </div>

            {/* Dons */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-yellow-500 hover:shadow-yellow-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.donations}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.donations).chf}</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.donations).cfa}</p>
              <p className="text-slate-500 text-xs">CHF / CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">7 donateurs</p>
            </div>

            {/* Financements */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.financing}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.financing).chf}</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.financing).cfa}</p>
              <p className="text-slate-500 text-xs">CHF / CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">3 projects</p>
            </div>

            {/* Staff */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-purple-500 hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Staff</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.rh.employees + dashboardData?.moduleStats.rh.volunteers + dashboardData?.moduleStats.rh.members}</p>
              <p className="text-slate-500 text-xs">Total</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">12 employés</p>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Stocks */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-red-400 hover:shadow-red-400/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Stocks</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.production.stocks}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.stocks}</p>
            </div>

            {/* Articles */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-pink-500 hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Articles</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.production.articles}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.articles}</p>
            </div>

            {/* Clients */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-teal-400 hover:shadow-teal-400/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Clients</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.crm.clients}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">Actifs</p>
            </div>

            {/* Commandes */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-lime-500 hover:shadow-lime-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.orders}</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.production.orders}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.total}</p>
            </div>

            {/* Bénéficiaires */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-violet-500 hover:shadow-violet-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.beneficiaries}</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.rh.beneficiaries}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">Personnes</p>
            </div>

            {/* Fournisseurs */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-sky-400 hover:shadow-sky-400/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-sky-400 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.suppliers}</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.crm.suppliers}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.total}</p>
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
                  <Line type="monotone" dataKey="revenue" name={t.revenue} stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" name={t.expenses} stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Staff Distribution */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
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
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">{t.moduleStats}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick('/crm')}>
                <p className="text-sm text-slate-400">{t.crm}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.crm.clients}</p>
                <p className="text-xs text-slate-500 mt-1">{t.clients}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick('/production')}>
                <p className="text-sm text-slate-400">{t.production}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.production.orders}</p>
                <p className="text-xs text-slate-500 mt-1">{t.orders}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick('/ged')}>
                <p className="text-sm text-slate-400">{t.ged}</p>
                <p className="text-2xl font-bold mt-2">{dashboardData?.moduleStats.ged.documents}</p>
                <p className="text-xs text-slate-500 mt-1">{t.documents}</p>
              </div>
              <div className="bg-slate-700 rounded p-4 cursor-pointer hover:bg-slate-600 transition" onClick={() => handleModuleClick('/actifs')}>
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
    </>
  );
};

export default Dashboard;