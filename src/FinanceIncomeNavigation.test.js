import React from 'react';
import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import Finance from './Finance';
import api from './api';
import { getDashboardIndicatorDestination, getDashboardReturnContext, buildDashboardReturnPath } from './dashboardNavigation';

let mockSearch;
let mockLanguage;
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/finance', search: mockSearch, hash: '#finance-revenue-register' }),
  useNavigate: () => mockNavigate
}), { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div>{children}</div>, Line: () => null,
  BarChart: ({ children }) => <div>{children}</div>, Bar: () => null,
  LabelList: () => null, XAxis: () => null, YAxis: () => null,
  CartesianGrid: () => null, Tooltip: () => null, Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));
jest.mock('./api', () => ({ __esModule: true, default: {
  getFinanceDashboard: jest.fn(), getExpenses: jest.fn(), getIncome: jest.fn(),
  getFxHistory: jest.fn(), getSocialFinance: jest.fn(), getRealEstateFinance: jest.fn()
} }));

const income = [
  ['DON-1', 'DON', 'Support Alpha'],
  ['DON-2', 'Don manuel', 'Support Beta'],
  ['FIN-1', 'FINANCEMENT', 'Capital Gamma'],
  ['REV-1', 'VENTES', 'Service Delta'],
  ['REV-2', 'VENTES', 'DON dans description uniquement']
].map(([id, category, description]) => ({ id, category, description, montant_chf: 10, montant_cfa: 7000, taux_fx_applique: 700, date: '2026-09-01' }));
const register = () => document.getElementById('finance-revenue-register');

beforeEach(() => {
  jest.clearAllMocks();
  mockLanguage = 'FR';
  mockSearch = '?tab=recettes';
  api.getFinanceDashboard.mockResolvedValue({ data: { total_income_count: 500, total_expense_count: 0, total_income: 10000, total_income_cfa: 7000000 } });
  api.getIncome.mockResolvedValue({ data: income });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});

test.each([
  ['donations', 'Support Alpha', 'Capital Gamma', 2],
  ['financing', 'Capital Gamma', 'Support Alpha', 1]
])('%s opens matching source rows and retains originating KPI', async (indicator, shown, hidden, count) => {
  const url = new URL(getDashboardIndicatorDestination(indicator), 'https://m3s.local');
  mockSearch = url.search;
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(within(register()).getByText(shown)).toBeInTheDocument();
  expect(within(register()).queryByText(hidden)).not.toBeInTheDocument();
  expect(within(register()).queryByText('Service Delta')).not.toBeInTheDocument();
  expect(register()).toHaveTextContent(`Transactions chargées : ${count}`);
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('10 000 CHF');
  const context = getDashboardReturnContext(mockSearch);
  expect(buildDashboardReturnPath(context.indicatorId)).toContain(`#dashboard-kpi-${indicator}`);
});

test('URL filter can be cleared or switched without losing the return context', async () => {
  mockSearch = '?tab=recettes&incomeScope=donations&returnTo=dashboard&dashboardKpi=donations';
  const view = render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  const select = within(register()).getByRole('combobox', { name: 'Périmètre des recettes' });
  fireEvent.change(select, { target: { value: 'financing' } });
  let target = mockNavigate.mock.calls.at(-1)[0];
  expect(target.search).toContain('incomeScope=financing');
  expect(target.search).toContain('dashboardKpi=donations');
  expect(target.hash).toBe('#finance-revenue-register');
  mockSearch = target.search;
  view.rerender(<Finance />);
  expect(within(register()).getByText('Capital Gamma')).toBeInTheDocument();
  fireEvent.change(select, { target: { value: 'all' } });
  target = mockNavigate.mock.calls.at(-1)[0];
  expect(target.search).not.toContain('incomeScope');
  expect(target.search).toContain('returnTo=dashboard');
  mockSearch = target.search;
  view.rerender(<Finance />);
  expect(within(register()).getByText('Service Delta')).toBeInTheDocument();
  expect(register()).toHaveTextContent('Transactions chargées : 5');
  expect(api.getIncome).toHaveBeenCalledTimes(1);
});

test.each([['FR', 'Périmètre des recettes'], ['EN', 'Income scope'], ['DE', 'Einnahmenbereich']])('keeps the filter when switching to %s', async (language, label) => {
  mockSearch = '?tab=recettes&incomeScope=donations';
  const view = render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  mockLanguage = language;
  view.rerender(<Finance />);
  expect(within(register()).getByRole('combobox', { name: label })).toHaveValue('donations');
  expect(within(register()).getByText('Support Alpha')).toBeInTheDocument();
  expect(within(register()).queryByText('Capital Gamma')).not.toBeInTheDocument();
});

test('unknown scopes show all receipts without changing global totals', async () => {
  mockSearch = '?tab=recettes&incomeScope=unknown';
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(within(register()).getByRole('combobox', { name: 'Périmètre des recettes' })).toHaveValue('all');
  expect(register()).toHaveTextContent('Transactions chargées : 5');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('10 000 CHF');
});

test('confirmed empty filtered subset shows zero, not a global count', async () => {
  api.getIncome.mockResolvedValue({ data: income.filter(row => row.category === 'VENTES') });
  mockSearch = '?tab=recettes&incomeScope=donations';
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(register()).toHaveTextContent('Transactions chargées : 0');
  expect(register()).toHaveTextContent('Aucun résultat');
});

test.each([{ success: false, data: income }, { data: null }])('does not render a rejected or malformed register as valid rows/zero', async response => {
  api.getIncome.mockResolvedValue(response);
  mockSearch = '?tab=recettes&incomeScope=donations';
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(register()).toHaveTextContent('Transactions chargées : —');
  expect(within(register()).queryByText('Support Alpha')).not.toBeInTheDocument();
  expect(register()).not.toHaveTextContent('Aucun résultat');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('10 000 CHF');
});

test('loading a filtered register is not displayed as a confirmed zero', async () => {
  api.getIncome.mockReturnValue(new Promise(() => {}));
  mockSearch = '?tab=recettes&incomeScope=donations';
  render(<Finance />);
  await waitFor(() => expect(register()).toBeInTheDocument());
  expect(register()).not.toHaveTextContent('Transactions chargées : 0');
  expect(register()).not.toHaveTextContent('Aucun résultat');
});
