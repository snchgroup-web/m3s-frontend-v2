import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown, Banknote, Gift, Zap, Users, FileText, CheckSquare, Package, Box, Users2, Users3, Truck } from 'lucide-react';
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
          {/* KPI Cards - Reduced Size */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-green-100 text-xs font-medium">{t.revenue}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p>{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).chf} CHF</p>
                  <p className="text-green-200">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue).cfa} CFA</p>
                </div>
              </div>
              <DollarSign size={24} className="text-green-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-red-100 text-xs font-medium">{t.expenses}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p>{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).chf} CHF</p>
                  <p className="text-red-200">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses).cfa} CFA</p>
                </div>
              </div>
              <TrendingDown size={24} className="text-red-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-blue-100 text-xs font-medium">{t.balance}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p>{formatDualCurrency(dashboardData?.moduleStats.finance.balance).chf} CHF</p>
                  <p className="text-blue-200">{formatDualCurrency(dashboardData?.moduleStats.finance.balance).cfa} CFA</p>
                </div>
              </div>
              <Banknote size={24} className="text-blue-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-yellow-100 text-xs font-medium">{t.donations}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p>{formatDualCurrency(dashboardData?.moduleStats.finance.donations).chf} CHF</p>
                  <p className="text-yellow-200">{formatDualCurrency(dashboardData?.moduleStats.finance.donations).cfa} CFA</p>
                </div>
              </div>
              <Gift size={24} className="text-yellow-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-cyan-100 text-xs font-medium">{t.financing}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p>{formatDualCurrency(dashboardData?.moduleStats.finance.financing).chf} CHF</p>
                  <p className="text-cyan-200">{formatDualCurrency(dashboardData?.moduleStats.finance.financing).cfa} CFA</p>
                </div>
              </div>
              <Zap size={24} className="text-cyan-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-100 text-xs font-medium">Staff</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.rh.employees + dashboardData?.moduleStats.rh.volunteers + dashboardData?.moduleStats.rh.members}</p>
                <p className="text-purple-200 text-xs mt-1">Total</p>
              </div>
              <Users size={24} className="text-purple-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-indigo-100 text-xs font-medium">{t.documents}</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.ged.documents}</p>
                <p className="text-indigo-200 text-xs mt-1">{t.files}</p>
              </div>
              <FileText size={24} className="text-indigo-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-orange-100 text-xs font-medium">{t.tasks}</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.tasks.total}</p>
                <p className="text-orange-200 text-xs mt-1">{t.total}</p>
              </div>
              <CheckSquare size={24} className="text-orange-100 ml-2 flex-shrink-0" />
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-rose-100 text-xs font-medium">Stocks</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.production.stocks}</p>
                <p className="text-rose-200 text-xs mt-1">{t.stocks}</p>
              </div>
              <Box size={20} className="text-rose-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-pink-100 text-xs font-medium">Articles</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.production.articles}</p>
                <p className="text-pink-200 text-xs mt-1">{t.articles}</p>
              </div>
              <Package size={20} className="text-pink-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-teal-100 text-xs font-medium">Clients</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.crm.clients}</p>
                <p className="text-teal-200 text-xs mt-1">Active</p>
              </div>
              <Users2 size={20} className="text-teal-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-lime-600 to-lime-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lime-100 text-xs font-medium">{t.orders}</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.production.orders}</p>
                <p className="text-lime-200 text-xs mt-1">{t.total}</p>
              </div>
              <Truck size={20} className="text-lime-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-violet-100 text-xs font-medium">{t.beneficiaries}</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.rh.beneficiaries}</p>
                <p className="text-violet-200 text-xs mt-1">Personnes</p>
              </div>
              <Users3 size={20} className="text-violet-100 ml-2 flex-shrink-0" />
            </div>
            <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-lg p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sky-100 text-xs font-medium">{t.suppliers}</p>
                <p className="text-base font-bold mt-1">{dashboardData?.moduleStats.crm.suppliers}</p>
                <p className="text-sky-200 text-xs mt-1">{t.total}</p>
              </div>
              <Truck size={20} className="text-sky-100 ml-2 flex-shrink-0" />
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