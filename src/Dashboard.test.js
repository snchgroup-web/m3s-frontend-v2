import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import api from './api';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/', search: '', hash: '' }),
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: 'EN' })
}));

jest.mock('recharts', () => ({
  CartesianGrid: () => null,
  Legend: () => null,
  Line: () => null,
  LineChart: ({ children }) => <div>{children}</div>,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getFinanceDashboard: jest.fn(),
    getDocumentsCount: jest.fn(),
    getInventoryCount: jest.fn(),
    getSuppliersCount: jest.fn(),
    getBeneficiariesCount: jest.fn(),
    getDonorsCount: jest.fn(),
    getMembersDirectory: jest.fn(),
    getTasksCount: jest.fn(),
    getAuthAccountsCount: jest.fn(),
    getManagementPortfolioSummary: jest.fn(),
    getIncome: jest.fn(),
    getExpenses: jest.fn(),
    getSocialFinance: jest.fn(),
    getRealEstateFinance: jest.fn(),
    getFxHistory: jest.fn()
  }
}));

const summaryResponse = (overrides = {}) => ({
  success: true,
  data: { total_income_count: 3, total_expense_count: 1, total_income: 600, total_income_cfa: 360000, total_expenses: 50, total_expenses_cfa: 30000, ...overrides }
});

beforeEach(() => {
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue(summaryResponse());
  api.getDocumentsCount.mockResolvedValue({ total: 12 });
  api.getInventoryCount.mockResolvedValue({ total: 8 });
  api.getSuppliersCount.mockResolvedValue({ total: 79 });
  api.getBeneficiariesCount.mockResolvedValue({ total: 4 });
  api.getDonorsCount.mockResolvedValue({ total: 6 });
  api.getMembersDirectory.mockResolvedValue({
    total: 6,
    data: [
      { member_type: 'Fondateur', team: 'TZH', active: true },
      { member_type: 'Fondateur', team: 'TZH', active: true },
      { member_type: 'Associe', team: 'TSN', active: true },
      { member_type: 'Associe', team: 'TSN', active: true },
      { member_type: 'Associe', team: 'TSN', active: true },
      { member_type: 'Associe', team: 'TSN', active: true }
    ]
  });
  api.getTasksCount.mockResolvedValue({ total: 4, open: 2, completed: 2, blocked: 0, cancelled: 0 });
  api.getAuthAccountsCount.mockResolvedValue({ total: 3 });
  api.getManagementPortfolioSummary.mockResolvedValue({
    data: { active_dossiers: 7, total_dossiers: 7, restricted_dossiers: 1, verified_on: '2026-08-20' }
  });
  api.getIncome.mockResolvedValue({
    data: [
      { category: 'PRESTATION', montant_chf: 300, montant_cfa: 180000, date: '2026-01-01' },
      { category: 'DON', montant_chf: 100, montant_cfa: 60000, date: '2026-01-02' },
      { category: 'FINANCEMENT', montant_chf: 200, montant_cfa: 120000, date: '2026-01-03' }
    ]
  });
  api.getExpenses.mockResolvedValue({
    data: [{ category: 'OUTILS', montant_chf: 50, montant_cfa: 30000, date: '2026-01-04' }]
  });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: { total_chf: 0, total_cfa_historique: 0 } });
  api.getRealEstateFinance.mockResolvedValue({
    data: [],
    summary: {
      investissements_realises_chf: 12000,
      investissements_realises_cfa: 7800000,
      remboursements_total_chf: 3000,
      solde_ouvert_cheikh_chf: 9000
    }
  });
  api.getFxHistory.mockResolvedValue({ taux_du_jour: { CHF_CFA: 600 } });
});

test('uses summary counts, labels loaded subsets and applies the shared CFA color', async () => {
  api.getFinanceDashboard.mockResolvedValue(summaryResponse({ total_income_count: 120, total_expense_count: 80 }));
  render(<Dashboard />);
  await screen.findByText('Transactions : 120');
  const card = id => document.getElementById(`dashboard-kpi-${id}`);
  expect(card('expenses')).toHaveTextContent('Transactions : 80');
  expect(card('balance')).toHaveTextContent('Transactions : 200');
  expect(card('donations')).toHaveTextContent('Loaded transactions : 1');
  expect(card('financing')).toHaveTextContent('Loaded transactions : 1');
  expect(card('real-estate-funding')).toHaveTextContent('Register: loaded transactions : 0');
  expect(card('social-flows')).toHaveTextContent('Loaded transactions : 0');
  expect(card('revenue').querySelector('.global-kpi-cfa')).toHaveClass('m3s-currency-cfa');
  expect(card('revenue').querySelector('.global-kpi-primary')).toHaveClass('text-emerald-300');
  expect(card('expenses').querySelector('.global-kpi-primary')).toHaveClass('text-red-300');
});

test('does not replace missing aggregate counts with page sizes or expose rejected source counts', async () => {
  api.getFinanceDashboard.mockResolvedValue({ success: false, data: { total_income_count: 100, total_expense_count: 30 } });
  api.getSocialFinance.mockResolvedValue({ success: false, data: [], summary: {} });
  api.getRealEstateFinance.mockRejectedValue(Object.assign(new Error('Forbidden'), { status: 403 }));
  render(<Dashboard />);
  await waitFor(() => expect(document.getElementById('dashboard-kpi-revenue')).toHaveTextContent('Transactions : —'));
  expect(document.getElementById('dashboard-kpi-balance')).toHaveTextContent('Transactions : —');
  expect(document.getElementById('dashboard-kpi-social-flows')).toHaveTextContent('Loaded transactions : —');
  expect(document.getElementById('dashboard-kpi-real-estate-funding')).toHaveTextContent('Register: loaded transactions : —');
});

test.each([null, { data: {} }, { success: false, data: { total_income_count: 1, total_expense_count: 1, total_income: 900, total_expenses: 50 } }])('never substitutes a loaded page for a missing or rejected global summary: %p', async response => {
  api.getFinanceDashboard.mockResolvedValue(response);
  render(<Dashboard />);
  await screen.findByText(/Some live data is temporarily unavailable/);
  for (const id of ['revenue', 'expenses', 'balance']) {
    const card = document.getElementById(`dashboard-kpi-${id}`);
    expect(card).toHaveTextContent('— CHF');
    expect(card).toHaveTextContent('Unavailable');
    expect(card).toHaveTextContent('Transactions : —');
  }
  expect(document.getElementById('dashboard-kpi-donations')).toHaveTextContent('100 CHF');
  expect(document.getElementById('dashboard-kpi-donations')).toHaveTextContent('Loaded transactions : 1');
});

test('does not display rejected immobilier payloads and keeps unrelated income data', async () => {
  api.getFinanceDashboard.mockResolvedValue({ data: { total_income_count: 1, total_expense_count: 1, total_income: 600, total_income_cfa: 360000, total_expenses: 50, total_expenses_cfa: 30000 } });
  api.getRealEstateFinance.mockResolvedValue({ success: false, data: [], summary: { investissements_realises_chf: 99000, remboursements_total_chf: 5000 } });
  render(<Dashboard />);
  await screen.findByText(/Some live data is temporarily unavailable/);
  const card = document.getElementById('dashboard-kpi-real-estate-funding');
  expect(card).toHaveTextContent('— CHF');
  expect(card).toHaveTextContent('Unavailable');
  expect(document.getElementById('dashboard-kpi-revenue')).toHaveTextContent('600 CHF');
});

test('keeps authoritative totals when only the income excerpt fails', async () => {
  api.getIncome.mockRejectedValue(new Error('Excerpt unavailable'));
  render(<Dashboard />);
  await screen.findByText(/Some live data is temporarily unavailable/);
  const revenue = document.getElementById('dashboard-kpi-revenue');
  expect(revenue).toHaveTextContent('600 CHF');
  expect(revenue).toHaveTextContent('Available');
  expect(revenue).toHaveTextContent('Transactions : 3');
  expect(document.getElementById('dashboard-kpi-donations')).toHaveTextContent('— CHF');
});

test('keeps a known CHF balance when CFA is missing without reconverting it', async () => {
  api.getFinanceDashboard.mockResolvedValue(summaryResponse({ total_income_cfa: null }));
  render(<Dashboard />);
  await screen.findByText(/Some live data is temporarily unavailable/);
  const balance = document.getElementById('dashboard-kpi-balance');
  expect(balance).toHaveTextContent('550 CHF');
  expect(balance).toHaveTextContent('≈ — CFA');
});

test.each([
  ['getDocumentsCount', { total: 900 }, 'documents'],
  ['getSuppliersCount', { total: 900 }, 'suppliers'],
  ['getSocialFinance', { data: [], summary: { total_chf: 900, total_cfa_historique: 540000 } }, 'social-flows']
])('rejects explicit failure from %s without masking independent sources', async (method, payload, id) => {
  api[method].mockResolvedValue({ success: false, ...payload });
  render(<Dashboard />);
  await screen.findByText(/Some live data is temporarily unavailable/);
  const card = document.getElementById(`dashboard-kpi-${id}`);
  expect(card).toHaveTextContent('Unavailable');
  expect(card).not.toHaveTextContent('900');
  expect(document.getElementById('dashboard-kpi-revenue')).toHaveTextContent('600 CHF');
});

test('preserves restricted status for an explicit forbidden source result', async () => {
  api.getRealEstateFinance.mockResolvedValue({ success: false, status: 403, data: [], summary: {} });
  render(<Dashboard />);
  const card = await screen.findByRole('button', { name: 'Open module: Total real estate funding' });
  expect(card).toHaveTextContent('Restricted');
  expect(card).toHaveTextContent('— CHF');
});

test('preserves zero-valued global totals backed by authoritative zero counts', async () => {
  api.getFinanceDashboard.mockResolvedValue(summaryResponse({ total_income_count: 0, total_expense_count: 0, total_income: null, total_income_cfa: null, total_expenses: null, total_expenses_cfa: null }));
  render(<Dashboard />);
  const card = await screen.findByRole('button', { name: 'Open module: Revenue' });
  expect(card).toHaveTextContent('0 CHF');
  expect(card).toHaveTextContent('Transactions : 0');
  expect(card).toHaveTextContent('Available');
});

test('shows connected KPI values and labels missing sources explicitly', async () => {
  render(<Dashboard />);

  expect(await screen.findByText('M3S users')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Active major files' })).toHaveTextContent('7');
  expect(screen.getByText('Management · Major-file portfolio')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Management & Governance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Support functions · Finance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Support functions · Human Resources' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Support functions · IT & Support' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Operations & Development · Commercial & CRM' })).toBeInTheDocument();
  expect(screen.getAllByText('M3S · Authenticated accounts')).toHaveLength(2);
  expect(screen.getByText('Administration · Task register')).toBeInTheDocument();
  expect(screen.getAllByText('Document Management · Documents')).toHaveLength(2);
  expect(screen.getAllByText('Available').length).toBeGreaterThan(0);
  expect(screen.getAllByText('To connect').length).toBeGreaterThan(0);
  expect(screen.getAllByText('12').length).toBeGreaterThan(0);
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Suppliers' })).toHaveTextContent('79');
  expect(screen.getByText('Finance + Stock & Assets · Distinct suppliers')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Beneficiaries' })).toHaveTextContent('4');
  expect(screen.getByText('Finance · Social flows · Distinct units')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Donors' })).toHaveTextContent('6');
  expect(screen.getByText('Stock & Assets · Donation candidates · Distinct donors')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Tracked tasks' })).toHaveTextContent('4');
  expect(screen.getByRole('button', { name: 'Open module: Tracked tasks' })).toHaveTextContent('Open 2 · Completed 2');
  expect(screen.getByRole('button', { name: 'Open module: Members' })).toHaveTextContent('6');
  expect(screen.getByRole('button', { name: 'Open module: Founding members' })).toHaveTextContent('2');
  expect(screen.getByRole('button', { name: 'Open module: Associate members' })).toHaveTextContent('4');
  expect(screen.getByRole('button', { name: 'Open module: Teams' })).toHaveTextContent('2');
  expect(screen.getByRole('button', { name: 'Open module: Employees' })).toHaveTextContent('—');
  expect(screen.getAllByText('Source not connected').length).toBeGreaterThan(0);
  expect(screen.queryByText('3 projects')).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cross-functional analysis' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Documented financial trend' })).toBeInTheDocument();
  expect(screen.getByLabelText('Global indicators')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Revenue' })).toHaveTextContent('600 CHF');
  expect(screen.getByRole('button', { name: 'Open module: Revenue' })).toHaveTextContent('360 000 CFA');
  expect(screen.getByRole('button', { name: 'Open module: Total real estate funding' })).toHaveTextContent('12 000 CHF');
  expect(screen.getByRole('button', { name: 'Open module: Reclassified social flows' })).toHaveTextContent('0 CHF');
  expect(screen.getByRole('button', { name: 'Open module: Reclassified social flows' })).toHaveTextContent('0 CFA');
  expect(screen.queryByRole('heading', { name: 'Module Statistics' })).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Human Resources' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Open module: Revenue' }));
  expect(mockNavigate).toHaveBeenCalledWith('/finance?tab=recettes&returnTo=dashboard&dashboardKpi=revenue#finance-revenue-register');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: Tracked tasks' }));
  expect(mockNavigate).toHaveBeenCalledWith('/administration?tab=planning&returnTo=dashboard&dashboardKpi=tasks#administration-task-register');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: Active major files' }));
  expect(mockNavigate).toHaveBeenCalledWith('/administration?tab=overview&returnTo=dashboard&dashboardKpi=active-major-files#administration-portfolio');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: M3S users' }));
  expect(mockNavigate).toHaveBeenCalledWith('/administration?tab=users&returnTo=dashboard&dashboardKpi=users#administration-users-register');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: Donors' }));
  expect(mockNavigate).toHaveBeenCalledWith('/crm?tab=dons&returnTo=dashboard&dashboardKpi=donors#crm-donations-register');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: Founding members' }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/rh?tab=directory&memberType=fondateur&returnTo=dashboard&dashboardKpi=founders#members-directory-register');
  fireEvent.click(screen.getByRole('button', { name: 'Open module: Associate members' }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/rh?tab=directory&memberType=associe&returnTo=dashboard&dashboardKpi=associates#members-directory-register');
    fireEvent.click(screen.getByRole('button', { name: 'Understand this indicator: M3S users' }));
    expect(mockNavigate).toHaveBeenCalledWith('/?view=glossary&kpi=users#dashboard-kpi-definition-users');
    fireEvent.click(screen.getByRole('button', { name: 'Understand this indicator: Real estate reimbursements' }));
    expect(mockNavigate).toHaveBeenCalledWith('/?view=glossary&kpi=real-estate-reimbursements#dashboard-kpi-definition-real-estate-reimbursements');
    fireEvent.click(screen.getByRole('button', { name: 'Understand this indicator: Clients' }));
    expect(mockNavigate).toHaveBeenCalledWith('/?view=glossary&kpi=clients#dashboard-kpi-definition-clients');

  await waitFor(() => {
    expect(api.getFinanceDashboard).toHaveBeenCalledTimes(1);
    expect(api.getDocumentsCount).toHaveBeenCalledTimes(1);
    expect(api.getInventoryCount).toHaveBeenCalledTimes(1);
    expect(api.getSuppliersCount).toHaveBeenCalledTimes(1);
    expect(api.getBeneficiariesCount).toHaveBeenCalledTimes(1);
    expect(api.getDonorsCount).toHaveBeenCalledTimes(1);
    expect(api.getTasksCount).toHaveBeenCalledTimes(1);
    expect(api.getAuthAccountsCount).toHaveBeenCalledTimes(1);
    expect(api.getManagementPortfolioSummary).toHaveBeenCalledTimes(1);
    expect(api.getMembersDirectory).toHaveBeenCalledWith(100, 0);
  });
});

test('does not turn unavailable sources into real zeroes', async () => {
  api.getFinanceDashboard.mockResolvedValue(null);
  api.getDocumentsCount.mockResolvedValue(null);
  api.getInventoryCount.mockResolvedValue(null);
  api.getTasksCount.mockResolvedValue(null);
  api.getAuthAccountsCount.mockResolvedValue(null);
  api.getManagementPortfolioSummary.mockResolvedValue(null);
  api.getIncome.mockResolvedValue(null);
  api.getExpenses.mockResolvedValue(null);

  render(<Dashboard />);

  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();
  expect(screen.getAllByText('Unavailable').length).toBeGreaterThan(0);
  expect(screen.getByText('No financial series is available yet.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Revenue' })).toHaveTextContent('— CHF');
  expect(screen.getByRole('button', { name: 'Open module: Revenue' })).not.toHaveTextContent('0 CHF');
  expect(screen.getByRole('button', { name: 'Open module: Active major files' })).toHaveTextContent('—');
});

test('treats a real zero-account response as an available state', async () => {
  api.getAuthAccountsCount.mockResolvedValue({ total: 0 });

  render(<Dashboard />);

  expect(await screen.findByText('M3S users')).toBeInTheDocument();
  expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  expect(screen.queryByText(/Some live data is temporarily unavailable/)).not.toBeInTheDocument();
});

test('keeps null and empty count totals unavailable', async () => {
  api.getDocumentsCount.mockResolvedValue({ total: null });
  api.getInventoryCount.mockResolvedValue({ total: '' });
  api.getTasksCount.mockResolvedValue({ total: undefined });

  render(<Dashboard />);

  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getAllByText('Unavailable').length).toBeGreaterThanOrEqual(3);
  });
});

test('keeps real zero count totals available without a partial-data warning', async () => {
  api.getDocumentsCount.mockResolvedValue({ total: 0 });
  api.getInventoryCount.mockResolvedValue({ total: 0 });
  api.getTasksCount.mockResolvedValue({ total: 0 });
  api.getSuppliersCount.mockResolvedValue({ total: 0 });
  api.getBeneficiariesCount.mockResolvedValue({ total: 0 });
  api.getDonorsCount.mockResolvedValue({ total: 0 });

  render(<Dashboard />);

  expect(await screen.findByText('M3S users')).toBeInTheDocument();
  expect(screen.queryByText(/Some live data is temporarily unavailable/)).not.toBeInTheDocument();
  expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(6);
});

test('keeps an unavailable supplier source distinct from a real zero', async () => {
  api.getSuppliersCount.mockResolvedValue(null);

  render(<Dashboard />);

  const supplierCard = await screen.findByRole('button', { name: 'Open module: Suppliers' });
  expect(supplierCard).toHaveTextContent('—');
  expect(supplierCard).toHaveTextContent('Unavailable');
  expect(supplierCard).not.toHaveTextContent('0');
  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();
});

test('keeps an unavailable beneficiary source distinct from a real zero', async () => {
  api.getBeneficiariesCount.mockResolvedValue(null);

  render(<Dashboard />);

  const beneficiaryCard = await screen.findByRole('button', { name: 'Open module: Beneficiaries' });
  expect(beneficiaryCard).toHaveTextContent('—');
  expect(beneficiaryCard).toHaveTextContent('Unavailable');
  expect(beneficiaryCard).not.toHaveTextContent('0');
  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();
});

test('keeps an unavailable donor source distinct from a real zero', async () => {
  api.getDonorsCount.mockResolvedValue(null);

  render(<Dashboard />);

  const donorCard = await screen.findByRole('button', { name: 'Open module: Donors' });
  expect(donorCard).toHaveTextContent('—');
  expect(donorCard).toHaveTextContent('Unavailable');
  expect(donorCard).not.toHaveTextContent('0');
  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();
});

test('keeps the real task total when the optional status summary is unavailable', async () => {
  api.getTasksCount.mockResolvedValue({ total: 4 });

  render(<Dashboard />);

  const taskCard = await screen.findByRole('button', { name: 'Open module: Tracked tasks' });
  expect(taskCard).toHaveTextContent('4');
  expect(taskCard).not.toHaveTextContent('Open');
  expect(screen.queryByText(/Some live data is temporarily unavailable/)).not.toBeInTheDocument();
});

test('opens a local function map without leaving global steering', async () => {
  render(<Dashboard />);

  expect(await screen.findByRole('heading', { name: 'Decide from a reliable overall view' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Function map' }));
  fireEvent.click(screen.getByRole('button', { name: 'Show local map : Administration' }));
  expect(mockNavigate).toHaveBeenLastCalledWith(
    { pathname: '/', search: '?view=map&function=administration' },
    { replace: true }
  );
});
