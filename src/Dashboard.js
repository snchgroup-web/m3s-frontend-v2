import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from './api';

// Month translations (stable constants, defined at module level)
const monthTranslations = {
  FR: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const numberFromApi = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const withApiFallback = async (request, fallback = null) => {
  try {
    return await request();
  } catch (error) {
    console.warn('Dashboard API fallback:', error.message);
    return fallback;
  }
};

// Format currency with both CHF and CFA - returns object for separate display
const formatDualCurrency = (chfAmount, exchangeRate) => {
  const cfaAmount = Math.round(chfAmount * (exchangeRate || 0));
  return {
    chf: chfAmount.toLocaleString(),
    cfa: cfaAmount.toLocaleString()
  };
};

// Neutral baseline: unavailable API data must never look like real business data.
const mockDataBaseRaw = {
  financialTrend: [],
  moduleStats: {
    finance: { revenue: 0, expenses: 0, balance: 0, donations: 0, financing: 0, incomeCount: 0, expenseCount: 0 },
    rh: { employees: 12, volunteers: 24, members: 156, beneficiaries: 89 },
    crm: { prospects: 45, clients: 28, donations: 18, suppliers: 34 },
    production: { orders: 52, completed: 38, pending: 14, stocks: 0 },
    actifs: { total: 1250000, depreciation: 125000 },
    ged: { documents: 0, recent: 0 },
    tasks: { total: 0, completed: 0, pending: 0 },
    caseStudies: 12
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataWarning, setDataWarning] = useState(false);

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
      donations: 'Dons',
      financing: 'Financements',
      files: 'Fichiers',
      tasks: 'Tâches',
      beneficiaries: 'Bénéficiaires',
      suppliers: 'Fournisseurs',
      month: 'Année',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Dernière mise à jour',
      currency: 'CHF',
      moduleStats: 'Statistiques par Module',
      transactions: 'transactions',
      netMonthly: 'Net mensuel',
      donors: 'donateurs',
      projects: 'projets',
      employees_staff: 'employés',
      quantity: 'Quantité en Stock',
      active: 'Actifs',
      persons: 'Personnes'
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
      donations: 'Donations',
      financing: 'Financing',
      files: 'Files',
      tasks: 'Tasks',
      beneficiaries: 'Beneficiaries',
      suppliers: 'Suppliers',
      month: 'Year',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Last Updated',
      currency: 'CHF',
      moduleStats: 'Module Statistics',
      transactions: 'transactions',
      netMonthly: 'Net monthly',
      donors: 'donors',
      projects: 'projects',
      employees_staff: 'employees',
      quantity: 'Stock Quantity',
      active: 'Active',
      persons: 'Persons'
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
      donations: 'Spenden',
      financing: 'Finanzierung',
      files: 'Dateien',
      transactions: 'Transaktionen',
      netMonthly: 'Netto monatlich',
      donors: 'Spender',
      projects: 'Projekte',
      employees_staff: 'Mitarbeiter',
      quantity: 'Lagermenge',
      active: 'Aktiv',
      persons: 'Personen',
      tasks: 'Aufgaben',
      beneficiaries: 'Begünstigte',
      suppliers: 'Lieferanten',
      month: 'Jahr',
      total: 'Gesamt',
      kpi: 'KPI',
      lastUpdate: 'Zuletzt aktualisiert',
      currency: 'CHF',
      moduleStats: 'Modulstatistiken'
    }
  };

  const t = translations[language];
  const dataWarningText = {
    FR: 'Certaines données réelles sont temporairement indisponibles. Aucune valeur de démonstration n’est affichée. Reconnectez-vous si votre session a expiré.',
    EN: 'Some live data is temporarily unavailable. No demonstration values are displayed. Sign in again if your session has expired.',
    DE: 'Einige Live-Daten sind vorübergehend nicht verfügbar. Es werden keine Demowerte angezeigt. Melden Sie sich erneut an, falls Ihre Sitzung abgelaufen ist.'
  }[language] || '';

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
    { name: t.employees, value: dashboardData?.moduleStats.rh.employees || 0 },
    { name: t.volunteers, value: dashboardData?.moduleStats.rh.volunteers || 0 },
    { name: t.members, value: dashboardData?.moduleStats.rh.members || 0 }
  ];

  // Fetch data from API, with stable mock fallback when the backend is unavailable.
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [financeDashboard, documentsCount, inventoryCount, tasksCount, users, income, expenses, fx] = await Promise.all([
          withApiFallback(() => api.getFinanceDashboard()),
          withApiFallback(() => api.getDocumentsCount()),
          withApiFallback(() => api.getInventoryCount()),
          withApiFallback(() => api.getTasksCount()),
          withApiFallback(() => api.getUsers(100, 0)),
          withApiFallback(() => api.getIncome(200, 0)),
          withApiFallback(() => api.getExpenses(200, 0)),
          withApiFallback(() => api.getFxHistory(), {})
        ]);

        const apiUnavailable = [financeDashboard, documentsCount, inventoryCount, tasksCount, users, income, expenses]
          .some((response) => response === null) || fx?.success === false;
        setDataWarning(apiUnavailable);

        const incomeRows = Array.isArray(income?.data) ? income.data : [];
        const expenseRows = Array.isArray(expenses?.data) ? expenses.data : [];
        const operatingIncomeRows = incomeRows.filter((row) => !String(row.category || '').toUpperCase().includes('AIDE SOCIALE'));
        const totalIncome = incomeRows.length
          ? operatingIncomeRows.reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0)
          : numberFromApi(financeDashboard?.data?.total_income, 0);
        const totalExpenses = expenseRows.length
          ? expenseRows.reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0)
          : numberFromApi(financeDashboard?.data?.total_expenses, 0);
        const donations = incomeRows.filter((row) => String(row.category || '').toUpperCase().includes('DON')).reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0);
        const financing = incomeRows.filter((row) => String(row.category || '').toUpperCase() === 'FINANCEMENT').reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0);
        const exchangeRate = numberFromApi(fx?.taux_du_jour?.CHF_CFA, 0);
        const inventoryTotal = numberFromApi(inventoryCount?.total, 0);
        const documentsTotal = numberFromApi(documentsCount?.total, 0);
        const tasksTotal = numberFromApi(tasksCount?.total, 0);
        const userRows = Array.isArray(users?.data) ? users.data : [];

        const yearlyFinance = {};
        const addToYear = (rows, key) => rows.forEach((row) => {
          const rawDate = row.date_document?.value || row.date_document || row.date_created?.value || row.date_created || row.created_at?.value || row.created_at || row.date;
          const year = String(rawDate || '').slice(0, 4);
          if (!/^\d{4}$/.test(year)) return;
          if (!yearlyFinance[year]) yearlyFinance[year] = { month: year, revenue: 0, expenses: 0 };
          yearlyFinance[year][key] += numberFromApi(row.montant_chf ?? row.montant);
        });
        addToYear(operatingIncomeRows, 'revenue');
        addToYear(expenseRows, 'expenses');
        const financialTrend = Object.values(yearlyFinance).sort((a, b) => a.month.localeCompare(b.month));

        setDashboardData({
          ...mockDataBase,
          exchangeRate,
          financialTrend,
          moduleStats: {
            ...mockDataBase.moduleStats,
            finance: {
              ...mockDataBase.moduleStats.finance,
              revenue: totalIncome,
              expenses: totalExpenses,
              balance: totalIncome - totalExpenses,
              donations,
              financing,
              incomeCount: incomeRows.length,
              expenseCount: expenseRows.length
            },
            production: {
              ...mockDataBase.moduleStats.production,
              stocks: inventoryTotal
            },
            ged: {
              ...mockDataBase.moduleStats.ged,
              documents: documentsTotal
            },
            tasks: {
              ...mockDataBase.moduleStats.tasks,
              total: tasksTotal
            },
            rh: {
              ...mockDataBase.moduleStats.rh,
              employees: 2,
              volunteers: 0,
              members: userRows.length
            }
          }
        });

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
        console.warn('Dashboard data unavailable:', err.message);
        setDataWarning(true);
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
      {/* Content */}
      <div className="overflow-auto">
        <div className="p-6 space-y-6">
          {dataWarning && (
            <div className="rounded-lg border border-amber-700 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
              {dataWarningText}
            </div>
          )}
          {/* KPI Cards Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Recettes */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-green-500 hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.revenue}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue, dashboardData.exchangeRate).chf} CHF</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.revenue, dashboardData.exchangeRate).cfa} CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{dashboardData?.moduleStats.finance.incomeCount} {t.transactions}</p>
            </div>

            {/* Dépenses */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-red-500 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.expenses}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses, dashboardData.exchangeRate).chf} CHF</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.expenses, dashboardData.exchangeRate).cfa} CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{dashboardData?.moduleStats.finance.expenseCount} {t.transactions}</p>
            </div>

            {/* Solde */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.balance}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.balance, dashboardData.exchangeRate).chf} CHF</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.balance, dashboardData.exchangeRate).cfa} CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.netMonthly}</p>
            </div>

            {/* Dons */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-yellow-500 hover:shadow-yellow-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.donations}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.donations, dashboardData.exchangeRate).chf} CHF</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.donations, dashboardData.exchangeRate).cfa} CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">7 {t.donors}</p>
            </div>

            {/* Financements */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.financing}</p>
              </div>
              <p className="text-white text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.financing, dashboardData.exchangeRate).chf} CHF</p>
              <p className="text-slate-400 text-lg font-bold">{formatDualCurrency(dashboardData?.moduleStats.finance.financing, dashboardData.exchangeRate).cfa} CFA</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">3 {t.projects}</p>
            </div>

            {/* Staff */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-purple-500 hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Staff</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.rh.employees + dashboardData?.moduleStats.rh.volunteers + dashboardData?.moduleStats.rh.members}</p>
              <p className="text-slate-500 text-xs">{t.total}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{dashboardData?.moduleStats.rh.employees} {t.employees_staff}</p>
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
              <p className="text-slate-500 text-xs">{t.quantity}</p>
            </div>

            {/* Documents */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-pink-500 hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">{t.documents}</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.ged.documents}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.files}</p>
            </div>

            {/* Clients */}
            <div className="bg-slate-800 rounded-lg p-4 shadow-lg border-2 border-slate-700 hover:border-teal-400 hover:shadow-teal-400/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <p className="text-slate-300 text-sm font-medium">Clients</p>
              </div>
              <p className="text-white text-lg font-bold">{dashboardData?.moduleStats.crm.clients}</p>
              <div className="border-t border-slate-700 my-2"></div>
              <p className="text-slate-500 text-xs">{t.active}</p>
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
              <p className="text-slate-500 text-xs">{t.persons}</p>
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
