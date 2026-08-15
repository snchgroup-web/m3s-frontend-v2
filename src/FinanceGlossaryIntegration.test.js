import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: '?tab=glossary' })
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

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue({
    success: true,
    data: { total_income_count: 0, total_income: null, total_expense_count: 0, total_expenses: null }
  });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});

test('opens the Finance glossary from the governed child tab', async () => {
  render(
    <LanguageProvider>
      <Finance />
    </LanguageProvider>
  );

  expect(await screen.findByRole('heading', { level: 2, name: 'Glossaire Finances' })).toBeInTheDocument();
  expect(screen.getByText('10 termes')).toBeInTheDocument();
  expect(screen.getAllByText('Définition validée').length).toBeGreaterThan(0);
  expect(screen.getByText(/cinq notions candidates issues de l’architecture Finance/i)).toBeInTheDocument();
});
