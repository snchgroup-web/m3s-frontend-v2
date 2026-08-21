export const DASHBOARD_RETURN_KEY = 'returnTo';
export const DASHBOARD_RETURN_VALUE = 'dashboard';
export const DASHBOARD_KPI_KEY = 'dashboardKpi';
export const DASHBOARD_VIEW_KEY = 'dashboardView';

const DASHBOARD_VIEWS = new Set([
  'overview',
  'intelligence',
  'map',
  'architecture',
  'processes',
  'incidents',
  'resources',
  'glossary'
]);

export const DASHBOARD_INDICATOR_DESTINATIONS = Object.freeze({
  'active-major-files': '/administration?tab=overview#administration-portfolio',
  users: '/administration?tab=users#administration-users-register',
  documents: '/ged?tab=documents#ged-documents-register',
  tasks: '/administration?tab=planning#administration-task-register',
  revenue: '/finance?tab=recettes#finance-revenue-register',
  expenses: '/finance?tab=depenses#finance-expense-register',
  balance: '/finance#finance-overview',
  donations: '/finance?tab=recettes#finance-revenue-register',
  financing: '/finance?tab=recettes#finance-revenue-register',
  'reference-rate': '/finance?tab=fx#finance-fx',
  'real-estate-funding': '/finance?tab=immobilier#finance-real-estate',
  'real-estate-reimbursements': '/finance?tab=immobilier#finance-real-estate',
  'outstanding-balance': '/finance?tab=immobilier#finance-real-estate',
  'social-flows': '/finance?tab=social#finance-social',
  stocks: '/actifs?tab=inventory#assets-inventory-register',
  clients: '/crm?tab=clients#crm-clients-register',
  orders: '/production?tab=commandes#production-orders-register',
  beneficiaries: '/crm?tab=beneficiaires#crm-beneficiaries-register',
  suppliers: '/production?tab=fournisseurs#production-suppliers-register'
});

export const buildDashboardDestination = (path, indicatorId) => {
  const url = new URL(path, 'https://m3s.local');
  url.searchParams.set(DASHBOARD_RETURN_KEY, DASHBOARD_RETURN_VALUE);
  url.searchParams.set(DASHBOARD_KPI_KEY, indicatorId);
  return `${url.pathname}${url.search}${url.hash}`;
};

export const getDashboardIndicatorDestination = indicatorId => {
  const path = DASHBOARD_INDICATOR_DESTINATIONS[indicatorId];
  if (!path) throw new Error(`Unknown dashboard indicator: ${indicatorId}`);
  return buildDashboardDestination(path, indicatorId);
};

export const buildDashboardReturnPath = (indicatorId, requestedView = 'overview') => {
  const view = DASHBOARD_VIEWS.has(requestedView) ? requestedView : 'overview';
  const params = new URLSearchParams({ view });
  if (indicatorId) params.set(DASHBOARD_KPI_KEY, indicatorId);
  const hash = indicatorId
    ? `#dashboard-kpi-${indicatorId}`
    : view === 'overview'
      ? '#global-situation'
      : '#global-pilotage-title';
  return `/?${params.toString()}${hash}`;
};

export const getDashboardReturnContext = search => {
  const params = new URLSearchParams(search);
  return {
    enabled: params.get(DASHBOARD_RETURN_KEY) === DASHBOARD_RETURN_VALUE,
    indicatorId: params.get(DASHBOARD_KPI_KEY),
    view: DASHBOARD_VIEWS.has(params.get(DASHBOARD_VIEW_KEY))
      ? params.get(DASHBOARD_VIEW_KEY)
      : 'overview'
  };
};
