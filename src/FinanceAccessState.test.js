import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

let mockSearch = '?tab=social';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/finance', search: mockSearch }),
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

const forbidden = () => Object.assign(new Error('Finance permission required'), {
  status: 403,
  code: 'FINANCE_FORBIDDEN'
});

const renderFinance = () => render(
  <LanguageProvider>
    <Finance />
  </LanguageProvider>
);

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
  api.getFinanceDashboard.mockResolvedValue({
    success: true,
    data: { total_income_count: 0, total_income: 0, total_expense_count: 0, total_expenses: 0 }
  });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('does not turn forbidden social data into zero-valued indicators', async () => {
  mockSearch = '?tab=social';
  api.getSocialFinance.mockRejectedValue(forbidden());
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });

  renderFinance();

  expect(await screen.findByText('Accès Finance restreint')).toBeInTheDocument();
  expect(screen.getByText(/flux sociaux nécessitent une permission Finance dédiée/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Nouveau flux social' })).not.toBeInTheDocument();
  expect(screen.queryByText('0.00 CHF')).not.toBeInTheDocument();
});

test('distinguishes forbidden real-estate data from an empty register', async () => {
  mockSearch = '?tab=immobilier';
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockRejectedValue(forbidden());

  renderFinance();

  expect(await screen.findByText('Accès Finance restreint')).toBeInTheDocument();
  expect(screen.getByText(/financement immobilier nécessitent une permission Finance dédiée/i)).toBeInTheDocument();
  expect(screen.queryByText(/disponibles après l’import BigQuery/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Nouvelle opération Immo' })).not.toBeInTheDocument();
});
