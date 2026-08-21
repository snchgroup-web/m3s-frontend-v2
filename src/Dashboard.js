import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRightLeft,
  Building2,
  Files,
  FolderKanban,
  Gift,
  HandCoins,
  HeartHandshake,
  HelpCircle,
  Landmark,
  ListChecks,
  Scale,
  ShoppingCart,
  Truck,
  UserRoundSearch,
  UsersRound,
  Warehouse
} from 'lucide-react';
import api from './api';
import DashboardPilotageNavigation from './DashboardPilotageNavigation';
import { getDashboardIndicatorDestination } from './dashboardNavigation';
import { getFinanceKpiDefinition, getManagementKpiDefinition, getOperationsKpiDefinition } from './dashboardKpiDictionary';

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

const hasApiNumber = (value) => (
  value !== null
  && value !== undefined
  && value !== ''
  && Number.isFinite(Number(value))
);

const withApiFallback = async (request, fallback = null) => {
  try {
    return await request();
  } catch (error) {
    console.warn('Dashboard API fallback:', error.message);
    return fallback;
  }
};

const withApiResult = async (request) => {
  try {
    return { data: await request(), errorStatus: null };
  } catch (error) {
    console.warn('Dashboard API source unavailable:', error.message);
    return { data: null, errorStatus: error.status || null };
  }
};

// Format currency with both CHF and CFA - returns object for separate display
const formatDualCurrency = (chfAmount, cfaAmount) => {
  return {
    chf: Number.isFinite(chfAmount) ? chfAmount.toLocaleString() : '—',
    cfa: Number.isFinite(cfaAmount) ? cfaAmount.toLocaleString() : '—'
  };
};

const formatCount = (value) => Number.isFinite(value) ? value.toLocaleString() : '—';

const kpiAccentClasses = {
  amber: 'bg-amber-500/10 text-amber-300',
  blue: 'bg-blue-500/10 text-blue-300',
  cyan: 'bg-cyan-500/10 text-cyan-300',
  emerald: 'bg-emerald-500/10 text-emerald-300',
  lime: 'bg-lime-500/10 text-lime-300',
  pink: 'bg-pink-500/10 text-pink-300',
  red: 'bg-red-500/10 text-red-300',
  rose: 'bg-rose-500/10 text-rose-300',
  sky: 'bg-sky-500/10 text-sky-300',
  teal: 'bg-teal-500/10 text-teal-300',
  violet: 'bg-violet-500/10 text-violet-300'
};

const kpiStatusClasses = {
  available: 'border-emerald-700/60 bg-emerald-950/35 text-emerald-300',
  unavailable: 'border-amber-700/60 bg-amber-950/30 text-amber-300',
  restricted: 'border-violet-700/60 bg-violet-950/30 text-violet-300',
  disconnected: 'border-slate-600 bg-slate-900/45 text-slate-400'
};

const GlobalKpiCard = ({ id, label, value, secondary, dualCurrency = false, source, status, statusLabel, icon: Icon, accent, onOpen, openLabel, definition, helpLabel, onHelp }) => (
  <article
    id={`dashboard-kpi-${id}`}
    className="global-kpi-card group relative min-h-[132px] scroll-mt-24 rounded-md border border-slate-700 bg-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-blue-950/25 focus-within:ring-2 focus-within:ring-blue-500"
  >
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${openLabel}: ${label}`}
      title={definition || undefined}
      className="flex min-h-[130px] w-full flex-col rounded-md p-4 pr-14 text-left focus:outline-none"
    >
    <span className="flex items-start justify-between gap-3">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-slate-300">{label}</span>
        {dualCurrency ? (
          <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-semibold">
            <span className="text-blue-300">{value}</span>
            <span className="text-amber-300">≈ {secondary}</span>
          </span>
        ) : (
          <>
            <span className="mt-2 block break-words text-lg font-semibold text-slate-100">{value}</span>
            {secondary && <span className="mt-0.5 block break-words text-sm font-medium text-slate-400">{secondary}</span>}
          </>
        )}
      </span>
      <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${onHelp ? 'mr-10' : ''} ${kpiAccentClasses[accent]}`}>
        <Icon size={20} aria-hidden="true" />
      </span>
    </span>
    <span className="mt-auto flex items-end justify-between gap-2 border-t border-slate-700 pt-2">
      <span className="min-w-0 truncate text-xs text-slate-500" title={source}>{source}</span>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${kpiStatusClasses[status]}`}>{statusLabel}</span>
    </span>
    </button>
    {onHelp && (
      <button
        type="button"
        onClick={onHelp}
        aria-label={`${helpLabel}: ${label}`}
        title={`${helpLabel}: ${label}`}
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-600 bg-slate-900/80 text-slate-300 transition hover:border-blue-400 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <HelpCircle size={18} aria-hidden="true" />
      </button>
    )}
  </article>
);

const GlobalKpiGroup = ({ id, title, description, cards, gridClass }) => (
  <section className="global-kpi-group space-y-3" aria-labelledby={`kpi-group-${id}`}>
    <div className="border-l-2 border-blue-500 pl-3">
      <h2 id={`kpi-group-${id}`} className="text-base font-semibold text-slate-100">{title}</h2>
      <p className="mt-0.5 text-sm text-slate-400">{description}</p>
    </div>
    <div className={`grid gap-3 ${gridClass}`}>
      {cards.map((card) => <GlobalKpiCard key={card.id} {...card} />)}
    </div>
  </section>
);

// Neutral baseline: missing sources must never look like real zeroes.
const mockDataBaseRaw = {
  financialTrend: [],
  sourceStatus: {
    finance: 'unavailable',
    documents: 'unavailable',
    inventory: 'unavailable',
    tasks: 'unavailable',
    users: 'unavailable',
    portfolio: 'unavailable',
    income: 'unavailable',
    expenses: 'unavailable',
    donations: 'unavailable',
    financing: 'unavailable',
    fx: 'unavailable',
    realEstate: 'unavailable',
    social: 'unavailable',
    suppliers: 'unavailable'
  },
  moduleStats: {
    finance: {
      revenue: null, revenueCfa: null, expenses: null, expensesCfa: null,
      balance: null, balanceCfa: null, donations: null, donationsCfa: null,
      financing: null, financingCfa: null, referenceRate: null,
      realEstateFunding: null, realEstateFundingCfa: null,
      reimbursements: null, reimbursementsCfa: null,
      outstandingBalance: null, outstandingBalanceCfa: null,
      social: null, socialCfa: null, incomeCount: 0, expenseCount: 0
    },
    rh: { employees: null, volunteers: null, members: null, beneficiaries: null },
    crm: { prospects: null, clients: null, donations: null, suppliers: null },
    production: { orders: null, completed: null, pending: null, stocks: null },
    actifs: { total: null, depreciation: null },
    ged: { documents: null, recent: null },
    tasks: { total: null, open: null, completed: null, blocked: null, cancelled: null },
    management: { activeDossiers: null },
    caseStudies: null
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      referenceRate: 'Taux de référence',
      realEstateFunding: 'Financement immobilier total',
      realEstateReimbursements: 'Remboursements immobiliers',
      outstandingBalance: 'Solde restant ouvert',
      socialFlows: 'Flux sociaux reclassés',
      files: 'Fichiers',
      tasks: 'Tâches',
      beneficiaries: 'Bénéficiaires',
      suppliers: 'Fournisseurs',
      month: 'Année',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Dernière mise à jour',
      currency: 'CHF',
      globalIndicators: 'Indicateurs globaux',
      transactions: 'transactions',
      netMonthly: 'Net mensuel',
      donors: 'donateurs',
      projects: 'projets',
      employees_staff: 'employés',
      quantity: 'Quantité en Stock',
      active: 'Actifs',
      persons: 'Personnes',
      m3sUsers: 'Utilisateurs M3S',
      activeAccounts: 'Comptes actifs',
      trackedTasks: 'Tâches suivies',
      activeMajorFiles: 'Grands dossiers actifs',
      openTasks: 'Ouvertes',
      completedTasks: 'Terminées',
      unavailable: 'Indisponible',
      restricted: 'Accès restreint',
      notConnected: 'Source non connectée',
      connectedData: 'Données connectées',
      loadingDashboard: 'Chargement du tableau de bord...',
      noTrend: 'Aucune série financière disponible pour le moment.',
      analysisGroup: 'Analyse transversale',
      analysisGroupBody: 'Le graphique repose uniquement sur les recettes et dépenses datées disponibles. Aucune série de démonstration n’est ajoutée.',
      financialEvolution: 'Évolution financière documentée',
      financeSource: 'Finance · Recettes et dépenses datées',
      openModule: 'Ouvrir le module',
      managementGroup: 'Management & Gouvernance',
      managementGroupBody: 'Accès, utilisateurs et preuves documentaires transversales.',
      supportGroup: 'Fonctions support',
      supportGroupBody: 'Indicateurs financiers issus des flux réellement disponibles.',
      operationsGroup: 'Opérations & Développement',
      operationsGroupBody: 'Activité métier et relations opérationnelles, avec sources absentes signalées.',
      available: 'Disponible',
      sourceToConnect: 'À connecter',
      authenticationAccounts: 'M3S · Comptes authentifiés',
      administrationTasks: 'Administration · Registre des tâches',
      gedDocuments: 'GED · Documents',
      financeIncome: 'Finance · Recettes',
      financeExpenses: 'Finance · Dépenses',
      financeBalance: 'Finance · Recettes et dépenses',
      financeDonations: 'Finance · Dons',
      financeFunding: 'Finance · Financements',
      financeReferenceRate: 'Finance · Historique FX',
      financeRealEstate: 'Finance · Registre immobilier',
      financeSocial: 'Finance · Registre social',
      assetsInventory: 'Stock & Actifs · Inventaire',
      beneficiarySource: 'Finance · Flux sociaux · Unités distinctes',
      supplierSources: 'Finance + Stock & Actifs · Fournisseurs distincts',
      majorFilesPortfolio: 'Management · Portefeuille des grands dossiers',
      explainIndicator: 'Comprendre cet indicateur'
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
      referenceRate: 'Reference rate',
      realEstateFunding: 'Total real estate funding',
      realEstateReimbursements: 'Real estate reimbursements',
      outstandingBalance: 'Outstanding balance',
      socialFlows: 'Reclassified social flows',
      files: 'Files',
      tasks: 'Tasks',
      beneficiaries: 'Beneficiaries',
      suppliers: 'Suppliers',
      month: 'Year',
      total: 'Total',
      kpi: 'KPI',
      lastUpdate: 'Last Updated',
      currency: 'CHF',
      globalIndicators: 'Global indicators',
      transactions: 'transactions',
      netMonthly: 'Net monthly',
      donors: 'donors',
      projects: 'projects',
      employees_staff: 'employees',
      quantity: 'Stock Quantity',
      active: 'Active',
      persons: 'Persons',
      m3sUsers: 'M3S users',
      activeAccounts: 'Active accounts',
      trackedTasks: 'Tracked tasks',
      activeMajorFiles: 'Active major files',
      openTasks: 'Open',
      completedTasks: 'Completed',
      unavailable: 'Unavailable',
      restricted: 'Restricted access',
      notConnected: 'Source not connected',
      connectedData: 'Connected data',
      loadingDashboard: 'Loading dashboard...',
      noTrend: 'No financial series is available yet.',
      analysisGroup: 'Cross-functional analysis',
      analysisGroupBody: 'The chart uses only available dated income and expense records. No demonstration series is added.',
      financialEvolution: 'Documented financial trend',
      financeSource: 'Finance · Dated income and expenses',
      openModule: 'Open module',
      managementGroup: 'Management & Governance',
      managementGroupBody: 'Cross-functional access, users and documentary evidence.',
      supportGroup: 'Support functions',
      supportGroupBody: 'Financial indicators drawn from genuinely available flows.',
      operationsGroup: 'Operations & Development',
      operationsGroupBody: 'Business activity and operational relationships, with missing sources clearly marked.',
      available: 'Available',
      sourceToConnect: 'To connect',
      authenticationAccounts: 'M3S · Authenticated accounts',
      administrationTasks: 'Administration · Task register',
      gedDocuments: 'Document Management · Documents',
      financeIncome: 'Finance · Income',
      financeExpenses: 'Finance · Expenses',
      financeBalance: 'Finance · Income and expenses',
      financeDonations: 'Finance · Donations',
      financeFunding: 'Finance · Financing',
      financeReferenceRate: 'Finance · FX history',
      financeRealEstate: 'Finance · Real estate register',
      financeSocial: 'Finance · Social register',
      assetsInventory: 'Stock & Assets · Inventory',
      beneficiarySource: 'Finance · Social flows · Distinct units',
      supplierSources: 'Finance + Stock & Assets · Distinct suppliers',
      majorFilesPortfolio: 'Management · Major-file portfolio',
      explainIndicator: 'Understand this indicator'
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
      balance: 'Saldo',
      employees: 'Mitarbeiter',
      volunteers: 'Freiwillige',
      members: 'Mitglieder',
      prospects: 'Aussichten',
      clients: 'Kunden',
      orders: 'Bestellungen',
      documents: 'Dokumente',
      stocks: 'Lagermenge',
      donations: 'Spenden',
      financing: 'Finanzierungen',
      referenceRate: 'Referenzkurs',
      realEstateFunding: 'Immobilienfinanzierung gesamt',
      realEstateReimbursements: 'Immobilienrückzahlungen',
      outstandingBalance: 'Offener Restsaldo',
      socialFlows: 'Neu klassifizierte soziale Flüsse',
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
      globalIndicators: 'Globale Kennzahlen',
      m3sUsers: 'M3S-Benutzer',
      activeAccounts: 'Aktive Konten',
      trackedTasks: 'Verfolgte Aufgaben',
      activeMajorFiles: 'Aktive wichtige Akten',
      openTasks: 'Offen',
      completedTasks: 'Erledigt',
      unavailable: 'Nicht verfügbar',
      restricted: 'Eingeschränkter Zugriff',
      notConnected: 'Quelle nicht verbunden',
      connectedData: 'Verbundene Daten',
      loadingDashboard: 'Dashboard wird geladen...',
      noTrend: 'Derzeit ist keine Finanzreihe verfügbar.',
      analysisGroup: 'Funktionsübergreifende Analyse',
      analysisGroupBody: 'Das Diagramm verwendet ausschließlich verfügbare datierte Einnahmen und Ausgaben. Es werden keine Demoreihen ergänzt.',
      financialEvolution: 'Dokumentierte Finanzentwicklung',
      financeSource: 'Finanzen · Datierte Einnahmen und Ausgaben',
      openModule: 'Modul öffnen',
      managementGroup: 'Management & Governance',
      managementGroupBody: 'Funktionsübergreifende Zugänge, Benutzer und Dokumentennachweise.',
      supportGroup: 'Unterstützungsfunktionen',
      supportGroupBody: 'Finanzkennzahlen aus tatsächlich verfügbaren Datenflüssen.',
      operationsGroup: 'Betrieb & Entwicklung',
      operationsGroupBody: 'Fachliche Aktivität und operative Beziehungen; fehlende Quellen sind klar gekennzeichnet.',
      available: 'Verfügbar',
      sourceToConnect: 'Zu verbinden',
      authenticationAccounts: 'M3S · Authentifizierte Konten',
      administrationTasks: 'Verwaltung · Aufgabenregister',
      gedDocuments: 'Dokumentenverwaltung · Dokumente',
      financeIncome: 'Finanzen · Einnahmen',
      financeExpenses: 'Finanzen · Ausgaben',
      financeBalance: 'Finanzen · Einnahmen und Ausgaben',
      financeDonations: 'Finanzen · Spenden',
      financeFunding: 'Finanzen · Finanzierung',
      financeReferenceRate: 'Finanzen · Wechselkurshistorie',
      financeRealEstate: 'Finanzen · Immobilienregister',
      financeSocial: 'Finanzen · Sozialregister',
      assetsInventory: 'Bestand & Aktiven · Inventar',
      beneficiarySource: 'Finanzen · Sozialflüsse · Eindeutige Einheiten',
      supplierSources: 'Finanzen + Bestand & Aktiven · Eindeutige Lieferanten',
      majorFilesPortfolio: 'Management · Portfolio wichtiger Akten',
      explainIndicator: 'Diese Kennzahl verstehen'
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

  // Fetch data from API, with stable mock fallback when the backend is unavailable.
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [financeDashboard, documentsCount, inventoryCount, tasksCount, authAccountsCount, portfolioSummary, income, expenses, fx, socialResult, realEstateResult, suppliersResult, beneficiariesResult] = await Promise.all([
          withApiFallback(() => api.getFinanceDashboard()),
          withApiFallback(() => api.getDocumentsCount()),
          withApiFallback(() => api.getInventoryCount()),
          withApiFallback(() => api.getTasksCount()),
          withApiFallback(() => api.getAuthAccountsCount()),
          withApiFallback(() => api.getManagementPortfolioSummary()),
          withApiFallback(() => api.getIncome(200, 0)),
          withApiFallback(() => api.getExpenses(200, 0)),
          withApiFallback(() => api.getFxHistory(), {}),
          withApiResult(() => api.getSocialFinance(200, 0)),
          withApiResult(() => api.getRealEstateFinance(200, 0)),
          withApiResult(() => api.getSuppliersCount()),
          withApiResult(() => api.getBeneficiariesCount())
        ]);

        const social = socialResult.data;
        const realEstate = realEstateResult.data;
        const suppliers = suppliersResult.data;
        const beneficiaries = beneficiariesResult.data;
        const incomeAvailable = Array.isArray(income?.data);
        const expensesAvailable = Array.isArray(expenses?.data);
        const incomeRows = incomeAvailable ? income.data : [];
        const expenseRows = expensesAvailable ? expenses.data : [];
        const operatingIncomeRows = incomeRows.filter((row) => !String(row.category || '').toUpperCase().includes('AIDE SOCIALE'));
        const dashboardSummary = financeDashboard?.data || {};
        const aggregateValue = (summaryValue, summaryCount, rowsAvailable, rows, fieldSelector) => {
          if (hasApiNumber(summaryCount) && Number(summaryCount) === 0) return 0;
          if (hasApiNumber(summaryValue)) return Number(summaryValue);
          if (!rowsAvailable) return null;
          return rows.reduce((sum, row) => sum + numberFromApi(fieldSelector(row)), 0);
        };
        const totalIncome = aggregateValue(
          dashboardSummary.total_income, dashboardSummary.total_income_count,
          incomeAvailable, operatingIncomeRows, (row) => row.montant_chf ?? row.montant
        );
        const totalIncomeCfa = aggregateValue(
          dashboardSummary.total_income_cfa, dashboardSummary.total_income_count,
          incomeAvailable, operatingIncomeRows, (row) => row.montant_cfa
        );
        const totalExpenses = aggregateValue(
          dashboardSummary.total_expenses, dashboardSummary.total_expense_count,
          expensesAvailable, expenseRows, (row) => row.montant_chf ?? row.montant
        );
        const totalExpensesCfa = aggregateValue(
          dashboardSummary.total_expenses_cfa, dashboardSummary.total_expense_count,
          expensesAvailable, expenseRows, (row) => row.montant_cfa
        );
        const donations = incomeAvailable
          ? incomeRows.filter((row) => String(row.category || '').toUpperCase().includes('DON')).reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0)
          : null;
        const donationsCfa = incomeAvailable
          ? incomeRows.filter((row) => String(row.category || '').toUpperCase().includes('DON')).reduce((sum, row) => sum + numberFromApi(row.montant_cfa), 0)
          : null;
        const financing = incomeAvailable
          ? incomeRows.filter((row) => String(row.category || '').toUpperCase() === 'FINANCEMENT').reduce((sum, row) => sum + numberFromApi(row.montant_chf ?? row.montant), 0)
          : null;
        const financingCfa = incomeAvailable
          ? incomeRows.filter((row) => String(row.category || '').toUpperCase() === 'FINANCEMENT').reduce((sum, row) => sum + numberFromApi(row.montant_cfa), 0)
          : null;
        const exchangeRate = numberFromApi(fx?.taux_du_jour?.CHF_CFA, 0);
        const realEstateAvailable = Boolean(realEstate?.summary) && Array.isArray(realEstate?.data);
        const realEstateValue = (key) => realEstateAvailable && hasApiNumber(realEstate.summary[key])
          ? Number(realEstate.summary[key])
          : null;
        const realEstateFunding = realEstateValue('investissements_realises_chf');
        const realEstateFundingCfa = realEstateValue('investissements_realises_cfa');
        const reimbursements = realEstateValue('remboursements_total_chf');
        const outstandingBalance = realEstateValue('solde_ouvert_cheikh_chf');
        const reimbursementsCfa = Number.isFinite(reimbursements) && exchangeRate ? Math.round(reimbursements * exchangeRate) : null;
        const outstandingBalanceCfa = Number.isFinite(outstandingBalance) && exchangeRate ? Math.round(outstandingBalance * exchangeRate) : null;
        const socialAvailable = Array.isArray(social?.data) && Boolean(social?.summary);
        const socialTotal = socialAvailable && hasApiNumber(social.summary.total_chf) ? Number(social.summary.total_chf) : null;
        const socialTotalCfa = socialAvailable && hasApiNumber(social.summary.total_cfa_historique) ? Number(social.summary.total_cfa_historique) : null;
        const inventoryAvailable = hasApiNumber(inventoryCount?.total);
        const documentsAvailable = hasApiNumber(documentsCount?.total);
        const tasksAvailable = hasApiNumber(tasksCount?.total);
        const taskStatusesAvailable = hasApiNumber(tasksCount?.open) && hasApiNumber(tasksCount?.completed);
        const usersAvailable = hasApiNumber(authAccountsCount?.total);
        const portfolioAvailable = hasApiNumber(portfolioSummary?.data?.active_dossiers);
        const suppliersAvailable = hasApiNumber(suppliers?.total);
        const beneficiariesAvailable = hasApiNumber(beneficiaries?.total);
        const inventoryTotal = inventoryAvailable ? Number(inventoryCount.total) : null;
        const documentsTotal = documentsAvailable ? Number(documentsCount.total) : null;
        const tasksTotal = tasksAvailable ? Number(tasksCount.total) : null;
        const tasksOpen = taskStatusesAvailable ? Number(tasksCount.open) : null;
        const tasksCompleted = taskStatusesAvailable ? Number(tasksCount.completed) : null;
        const tasksBlocked = hasApiNumber(tasksCount?.blocked) ? Number(tasksCount.blocked) : null;
        const tasksCancelled = hasApiNumber(tasksCount?.cancelled) ? Number(tasksCount.cancelled) : null;
        const usersTotal = usersAvailable ? Number(authAccountsCount.total) : null;
        const activeDossiers = portfolioAvailable ? Number(portfolioSummary.data.active_dossiers) : null;
        const suppliersTotal = suppliersAvailable ? Number(suppliers.total) : null;
        const beneficiariesTotal = beneficiariesAvailable ? Number(beneficiaries.total) : null;
        const financeAvailable = [totalIncome, totalIncomeCfa, totalExpenses, totalExpensesCfa].every(Number.isFinite);
        const apiUnavailable = [
          financeDashboard,
          documentsCount,
          inventoryCount,
          tasksCount,
          authAccountsCount,
          portfolioSummary,
          income,
          expenses
        ].some((response) => response === null)
          || !documentsAvailable
          || !inventoryAvailable
          || !tasksAvailable
          || !usersAvailable
          || !portfolioAvailable
          || !incomeAvailable
          || !expensesAvailable
          || (!social && socialResult.errorStatus !== 403)
          || (!realEstate && realEstateResult.errorStatus !== 403)
          || (!suppliersAvailable && suppliersResult.errorStatus !== 403)
          || (!beneficiariesAvailable && beneficiariesResult.errorStatus !== 403)
          || fx?.success === false;
        setDataWarning(apiUnavailable);

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
          sourceStatus: {
            finance: financeAvailable ? 'available' : 'unavailable',
            documents: documentsAvailable ? 'available' : 'unavailable',
            inventory: inventoryAvailable ? 'available' : 'unavailable',
            tasks: tasksAvailable ? 'available' : 'unavailable',
            users: usersAvailable ? 'available' : 'unavailable',
            portfolio: portfolioAvailable ? 'available' : 'unavailable',
            income: incomeAvailable ? 'available' : 'unavailable',
            expenses: expensesAvailable ? 'available' : 'unavailable',
            donations: incomeAvailable ? 'available' : 'unavailable',
            financing: incomeAvailable ? 'available' : 'unavailable',
            fx: exchangeRate ? 'available' : 'unavailable',
            realEstate: realEstateAvailable ? 'available' : realEstateResult.errorStatus === 403 ? 'restricted' : 'unavailable',
            social: socialAvailable ? 'available' : socialResult.errorStatus === 403 ? 'restricted' : 'unavailable',
            suppliers: suppliersAvailable ? 'available' : suppliersResult.errorStatus === 403 ? 'restricted' : 'unavailable',
            beneficiaries: beneficiariesAvailable ? 'available' : beneficiariesResult.errorStatus === 403 ? 'restricted' : 'unavailable'
          },
          moduleStats: {
            ...mockDataBase.moduleStats,
            finance: {
              ...mockDataBase.moduleStats.finance,
              revenue: totalIncome,
              revenueCfa: totalIncomeCfa,
              expenses: totalExpenses,
              expensesCfa: totalExpensesCfa,
              balance: financeAvailable ? totalIncome - totalExpenses : null,
              balanceCfa: financeAvailable ? totalIncomeCfa - totalExpensesCfa : null,
              donations,
              donationsCfa,
              financing,
              financingCfa,
              referenceRate: exchangeRate || null,
              realEstateFunding,
              realEstateFundingCfa,
              reimbursements,
              reimbursementsCfa,
              outstandingBalance,
              outstandingBalanceCfa,
              social: socialTotal,
              socialCfa: socialTotalCfa,
              incomeCount: incomeRows.length,
              expenseCount: expenseRows.length
            },
            production: {
              ...mockDataBase.moduleStats.production,
              stocks: inventoryTotal
            },
            crm: {
              ...mockDataBase.moduleStats.crm,
              suppliers: suppliersTotal
            },
            ged: {
              ...mockDataBase.moduleStats.ged,
              documents: documentsTotal
            },
            tasks: {
              ...mockDataBase.moduleStats.tasks,
              total: tasksTotal,
              open: tasksOpen,
              completed: tasksCompleted,
              blocked: tasksBlocked,
              cancelled: tasksCancelled
            },
            rh: {
              ...mockDataBase.moduleStats.rh,
              members: usersTotal,
              beneficiaries: beneficiariesTotal
            },
            management: {
              ...mockDataBase.moduleStats.management,
              activeDossiers
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

  useEffect(() => {
    if (loading || !location.hash.startsWith('#dashboard-kpi-')) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (target?.classList.contains('global-kpi-card')) target.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [dashboardData, loading, location.hash]);

  const handleModuleClick = (path) => {
    navigate(path);
  };

  const handleIndicatorOpen = indicatorId => {
    navigate(getDashboardIndicatorDestination(indicatorId));
  };

  const handleIndicatorHelp = indicatorId => {
    navigate(`/?view=glossary&kpi=${encodeURIComponent(indicatorId)}#dashboard-kpi-definition-${indicatorId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">{t.loadingDashboard}</p>
        </div>
      </div>
    );
  }

  const sourceState = (sourceKey) => {
    const sourceStatus = dashboardData?.sourceStatus?.[sourceKey];
    if (sourceStatus === 'available') return { status: 'available', statusLabel: t.available };
    if (sourceStatus === 'restricted') return { status: 'restricted', statusLabel: t.restricted };
    return { status: 'unavailable', statusLabel: t.unavailable };
  };
  const disconnectedState = { status: 'disconnected', statusLabel: t.sourceToConnect };
  const financeValues = {
    revenue: formatDualCurrency(dashboardData?.moduleStats.finance.revenue, dashboardData?.moduleStats.finance.revenueCfa),
    expenses: formatDualCurrency(dashboardData?.moduleStats.finance.expenses, dashboardData?.moduleStats.finance.expensesCfa),
    balance: formatDualCurrency(dashboardData?.moduleStats.finance.balance, dashboardData?.moduleStats.finance.balanceCfa),
    donations: formatDualCurrency(dashboardData?.moduleStats.finance.donations, dashboardData?.moduleStats.finance.donationsCfa),
    financing: formatDualCurrency(dashboardData?.moduleStats.finance.financing, dashboardData?.moduleStats.finance.financingCfa),
    realEstateFunding: formatDualCurrency(dashboardData?.moduleStats.finance.realEstateFunding, dashboardData?.moduleStats.finance.realEstateFundingCfa),
    reimbursements: formatDualCurrency(dashboardData?.moduleStats.finance.reimbursements, dashboardData?.moduleStats.finance.reimbursementsCfa),
    outstandingBalance: formatDualCurrency(dashboardData?.moduleStats.finance.outstandingBalance, dashboardData?.moduleStats.finance.outstandingBalanceCfa),
    social: formatDualCurrency(dashboardData?.moduleStats.finance.social, dashboardData?.moduleStats.finance.socialCfa)
  };
  const financeKpiHelp = indicatorId => ({
    definition: getFinanceKpiDefinition(indicatorId, language)?.definition,
    helpLabel: t.explainIndicator,
    onHelp: () => handleIndicatorHelp(indicatorId)
  });
  const operationsKpiHelp = indicatorId => ({
    definition: getOperationsKpiDefinition(indicatorId, language)?.definition,
    helpLabel: t.explainIndicator,
    onHelp: () => handleIndicatorHelp(indicatorId)
  });
  const kpiGroups = [
    {
      id: 'management',
      title: t.managementGroup,
      description: t.managementGroupBody,
      gridClass: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
      cards: [
        {
          id: 'active-major-files', label: t.activeMajorFiles, value: formatCount(dashboardData?.moduleStats.management.activeDossiers),
          source: t.majorFilesPortfolio, ...sourceState('portfolio'), icon: FolderKanban, accent: 'blue',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('active-major-files'),
          definition: getManagementKpiDefinition('active-major-files', language)?.definition,
          helpLabel: t.explainIndicator, onHelp: () => handleIndicatorHelp('active-major-files')
        },
        {
          id: 'users', label: t.m3sUsers, value: formatCount(dashboardData?.moduleStats.rh.members),
          secondary: dashboardData?.sourceStatus.users === 'available' ? t.activeAccounts : null,
          source: t.authenticationAccounts, ...sourceState('users'), icon: UsersRound, accent: 'violet',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('users'),
          definition: getManagementKpiDefinition('users', language)?.definition,
          helpLabel: t.explainIndicator, onHelp: () => handleIndicatorHelp('users')
        },
        {
          id: 'documents', label: t.documents, value: formatCount(dashboardData?.moduleStats.ged.documents),
          secondary: dashboardData?.sourceStatus.documents === 'available' ? t.files : null,
          source: t.gedDocuments, ...sourceState('documents'), icon: Files, accent: 'pink',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('documents'),
          definition: getManagementKpiDefinition('documents', language)?.definition,
          helpLabel: t.explainIndicator, onHelp: () => handleIndicatorHelp('documents')
        },
        {
          id: 'tasks', label: t.trackedTasks, value: formatCount(dashboardData?.moduleStats.tasks.total),
          secondary: dashboardData?.sourceStatus.tasks === 'available'
            && Number.isFinite(dashboardData?.moduleStats.tasks.open)
            && Number.isFinite(dashboardData?.moduleStats.tasks.completed)
            ? `${t.openTasks} ${formatCount(dashboardData.moduleStats.tasks.open)} · ${t.completedTasks} ${formatCount(dashboardData.moduleStats.tasks.completed)}`
            : null,
          source: t.administrationTasks, ...sourceState('tasks'), icon: ListChecks, accent: 'cyan',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('tasks'),
          definition: getManagementKpiDefinition('tasks', language)?.definition,
          helpLabel: t.explainIndicator, onHelp: () => handleIndicatorHelp('tasks')
        }
      ]
    },
    {
      id: 'support',
      title: t.supportGroup,
      description: t.supportGroupBody,
      gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      cards: [
        {
          id: 'revenue', label: t.revenue, value: `${financeValues.revenue.chf} CHF`, secondary: `${financeValues.revenue.cfa} CFA`, dualCurrency: true,
          source: t.financeIncome, ...sourceState('income'), icon: HandCoins, accent: 'emerald',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('revenue'), ...financeKpiHelp('revenue')
        },
        {
          id: 'expenses', label: t.expenses, value: `${financeValues.expenses.chf} CHF`, secondary: `${financeValues.expenses.cfa} CFA`, dualCurrency: true,
          source: t.financeExpenses, ...sourceState('expenses'), icon: ArrowDownToLine, accent: 'red',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('expenses'), ...financeKpiHelp('expenses')
        },
        {
          id: 'balance', label: t.balance, value: `${financeValues.balance.chf} CHF`, secondary: `${financeValues.balance.cfa} CFA`, dualCurrency: true,
          source: t.financeBalance, ...sourceState('finance'), icon: Scale, accent: 'blue',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('balance'), ...financeKpiHelp('balance')
        },
        {
          id: 'donations', label: t.donations, value: `${financeValues.donations.chf} CHF`, secondary: `${financeValues.donations.cfa} CFA`, dualCurrency: true,
          source: t.financeDonations, ...sourceState('donations'), icon: Gift, accent: 'amber',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('donations'), ...financeKpiHelp('donations')
        },
        {
          id: 'financing', label: t.financing, value: `${financeValues.financing.chf} CHF`, secondary: `${financeValues.financing.cfa} CFA`, dualCurrency: true,
          source: t.financeFunding, ...sourceState('financing'), icon: Landmark, accent: 'cyan',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('financing'), ...financeKpiHelp('financing')
        },
        {
          id: 'reference-rate', label: t.referenceRate,
          value: Number.isFinite(dashboardData?.moduleStats.finance.referenceRate) ? `${formatCount(dashboardData.moduleStats.finance.referenceRate)} CFA / CHF` : '— CFA / CHF',
          source: t.financeReferenceRate, ...sourceState('fx'), icon: ArrowRightLeft, accent: 'violet',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('reference-rate'), ...financeKpiHelp('reference-rate')
        },
        {
          id: 'real-estate-funding', label: t.realEstateFunding, value: `${financeValues.realEstateFunding.chf} CHF`, secondary: `${financeValues.realEstateFunding.cfa} CFA`, dualCurrency: true,
          source: t.financeRealEstate, ...sourceState('realEstate'), icon: Building2, accent: 'sky',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('real-estate-funding'), ...financeKpiHelp('real-estate-funding')
        },
        {
          id: 'real-estate-reimbursements', label: t.realEstateReimbursements, value: `${financeValues.reimbursements.chf} CHF`, secondary: `${financeValues.reimbursements.cfa} CFA`, dualCurrency: true,
          source: t.financeRealEstate, ...sourceState('realEstate'), icon: HandCoins, accent: 'teal',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('real-estate-reimbursements'), ...financeKpiHelp('real-estate-reimbursements')
        },
        {
          id: 'outstanding-balance', label: t.outstandingBalance, value: `${financeValues.outstandingBalance.chf} CHF`, secondary: `${financeValues.outstandingBalance.cfa} CFA`, dualCurrency: true,
          source: t.financeRealEstate, ...sourceState('realEstate'), icon: Landmark, accent: 'amber',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('outstanding-balance'), ...financeKpiHelp('outstanding-balance')
        },
        {
          id: 'social-flows', label: t.socialFlows, value: `${financeValues.social.chf} CHF`, secondary: `${financeValues.social.cfa} CFA`, dualCurrency: true,
          source: t.financeSocial, ...sourceState('social'), icon: HeartHandshake, accent: 'pink',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('social-flows'), ...financeKpiHelp('social-flows')
        }
      ]
    },
    {
      id: 'operations',
      title: t.operationsGroup,
      description: t.operationsGroupBody,
      gridClass: 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-5',
      cards: [
        {
          id: 'stocks', label: t.stocks, value: formatCount(dashboardData?.moduleStats.production.stocks),
          secondary: dashboardData?.sourceStatus.inventory === 'available' ? t.quantity : null,
          source: t.assetsInventory, ...sourceState('inventory'), icon: Warehouse, accent: 'rose',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('stocks'), ...operationsKpiHelp('stocks')
        },
        {
          id: 'clients', label: t.clients, value: formatCount(dashboardData?.moduleStats.crm.clients),
          source: t.notConnected, ...disconnectedState, icon: UserRoundSearch, accent: 'teal',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('clients'), ...operationsKpiHelp('clients')
        },
        {
          id: 'orders', label: t.orders, value: formatCount(dashboardData?.moduleStats.production.orders),
          source: t.notConnected, ...disconnectedState, icon: ShoppingCart, accent: 'lime',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('orders'), ...operationsKpiHelp('orders')
        },
        {
          id: 'beneficiaries', label: t.beneficiaries, value: formatCount(dashboardData?.moduleStats.rh.beneficiaries),
          source: t.beneficiarySource, ...sourceState('beneficiaries'), icon: HeartHandshake, accent: 'violet',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('beneficiaries'), ...operationsKpiHelp('beneficiaries')
        },
        {
          id: 'suppliers', label: t.suppliers, value: formatCount(dashboardData?.moduleStats.crm.suppliers),
          source: t.supplierSources, ...sourceState('suppliers'), icon: Truck, accent: 'sky',
          openLabel: t.openModule, onOpen: () => handleIndicatorOpen('suppliers'), ...operationsKpiHelp('suppliers')
        }
      ]
    }
  ];

  return (
    <>
      {/* Content */}
      <div className="overflow-auto">
        <div className="space-y-4 p-3 sm:p-4 lg:space-y-6 lg:p-6">
          {dataWarning && (
            <div className="dashboard-data-warning flex items-start gap-3 rounded-md border px-3 py-3 text-sm leading-5 shadow-sm sm:px-4" role="status">
              <AlertTriangle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
              <span>{dataWarningText}</span>
            </div>
          )}
          <DashboardPilotageNavigation language={language} onNavigate={handleModuleClick} />
          <section id="global-situation" aria-label={t.dashboard} className="space-y-6">
          <div className="space-y-6" aria-label={t.globalIndicators}>
            {kpiGroups.map((group) => (
              <GlobalKpiGroup
                key={group.id}
                id={group.id}
                title={group.title}
                description={group.description}
                cards={group.cards}
                gridClass={group.gridClass}
              />
            ))}
          </div>
          <section className="dashboard-analysis-section space-y-3" aria-labelledby="dashboard-analysis-title">
            <div className="border-l-2 border-cyan-500 pl-3">
              <h2 id="dashboard-analysis-title" className="text-base font-semibold text-slate-100">{t.analysisGroup}</h2>
              <p className="mt-0.5 max-w-4xl text-sm text-slate-400">{t.analysisGroupBody}</p>
            </div>
            <div className="dashboard-analysis-card rounded-md border border-slate-700 bg-slate-800 p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{t.financialEvolution}</h3>
                  <p className="mt-1 text-xs text-slate-500">{t.financeSource}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${dashboardData?.sourceStatus.finance === 'available' ? kpiStatusClasses.available : kpiStatusClasses.unavailable}`}>
                  {dashboardData?.sourceStatus.finance === 'available' ? t.available : t.unavailable}
                </span>
              </div>
              {dashboardData?.financialTrend?.length ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.financialTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--chart-tooltip-bg, #1e293b)', border: '1px solid var(--chart-tooltip-border, #475569)', color: 'var(--chart-tooltip-text, #e2e8f0)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name={t.revenue} stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" name={t.expenses} stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center rounded border border-dashed border-slate-600 text-center text-sm text-slate-400 px-6">
                  {t.noTrend}
                </div>
              )}
            </div>
          </section>
          </section>

          {/* Footer */}
          <div className="text-center text-slate-500 text-xs py-4">
            <p>{t.lastUpdate}: {new Date().toLocaleString({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH')}</p>
            <p>M3S ERP v2.0 - SENESWISS GROUP © 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
