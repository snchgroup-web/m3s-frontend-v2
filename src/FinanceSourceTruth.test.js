import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/finance', search: '?tab=overview' }),
  useNavigate: () => jest.fn()
}), { virtual: true });

jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div>{children}</div>,
  Line: () => null,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  LabelList: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getFinanceDashboard: jest.fn(),
    getExpenses: jest.fn(),
    getIncome: jest.fn(),
    getFxHistory: jest.fn(),
    getSocialFinance: jest.fn(),
    getRealEstateFinance: jest.fn()
  }
}));

const renderFinance = () => render(
  <LanguageProvider>
    <Finance />
  </LanguageProvider>
);

const dashboardResponse = (overrides = {}) => ({
  success: true,
  data: {
    total_income_count: 2,
    total_income: 1000,
    total_expense_count: 2,
    total_expenses: 400,
    ...overrides
  },
  timestamp: '2026-08-09T12:00:00.000Z'
});

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue(dashboardResponse());
  api.getExpenses.mockResolvedValue({ data: [{ id: 'DEP-1', montant_chf: 20, date: '2026-08-01' }] });
  api.getIncome.mockResolvedValue({ data: [{ id: 'REC-1', montant_chf: 50, date: '2026-08-01' }] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});

test('keeps a real zero distinct from an unavailable total', async () => {
  api.getFinanceDashboard.mockResolvedValue(dashboardResponse({
    total_income_count: 0,
    total_income: null,
    total_expense_count: 0,
    total_expenses: null
  }));

  renderFinance();

  await screen.findByText('Totaux globaux disponibles');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('0 CHF');
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('0 CHF');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('0 CHF');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('Totaux globaux disponibles');
});

test('shows unavailable instead of manufacturing zero when the global source fails', async () => {
  api.getFinanceDashboard.mockRejectedValue(new Error('Backend unavailable'));

  renderFinance();

  await screen.findByText('Totaux globaux indisponibles');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('Totaux globaux indisponibles');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('Aucune valeur manquante n’est remplacée par zéro.');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('— CHF');
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('— CHF');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('— CHF');
});

test('does not convert a null total into zero when records exist', async () => {
  api.getFinanceDashboard.mockResolvedValue(dashboardResponse({
    total_income_count: 3,
    total_income: null
  }));

  renderFinance();

  await screen.findByText('Totaux globaux indisponibles');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('— CHF');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('Aucune valeur manquante n’est remplacée par zéro.');
});

test('uses authoritative global totals instead of the loaded page subtotal', async () => {
  renderFinance();

  await screen.findByText('Totaux globaux disponibles');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('1 000 CHF');
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('400 CHF');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('600 CHF');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('2 recettes · 2 dépenses');
  expect(screen.getByTestId('finance-source-status')).toHaveTextContent('1 recettes · 1 dépenses');
  expect(screen.getByText(/Tendance Recettes vs Dépenses \(CHF\) · extrait chargé/)).toBeInTheDocument();
  expect(screen.getByTestId('finance-total-income').closest('article')).toHaveTextContent('Transactions : 2');
  expect(screen.getByTestId('finance-total-expenses').closest('article')).toHaveTextContent('Transactions : 2');
  expect(screen.getByTestId('finance-net-balance').closest('article')).toHaveTextContent('Transactions : 4');
});

test.each([{ success: false, data: [] }, { data: null }])('does not label an invalid social response as zero transactions', async response => {
  api.getSocialFinance.mockResolvedValue(response);
  renderFinance();
  await screen.findByText('Totaux globaux disponibles');
  const card = screen.getByTestId('finance-social-total').closest('article');
  expect(card).toHaveTextContent('Transactions chargées : —');
  expect(card).not.toHaveTextContent('Transactions chargées : 0');
});
