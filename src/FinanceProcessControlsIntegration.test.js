import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: '?tab=processes' })
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
  api.getFinanceDashboard.mockResolvedValue({ success: true, data: {} });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});

test('opens Finance processes and controls from its governed child tab', async () => {
  render(
    <LanguageProvider>
      <Finance />
    </LanguageProvider>
  );

  expect(await screen.findByRole('heading', { name: 'Comprendre les parcours et les contrôles réellement actifs' })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Processus & contrôles' }).length).toBeGreaterThan(0);
  expect(screen.queryByRole('heading', { name: 'Voir les objets, les sources et leurs réutilisations' })).not.toBeInTheDocument();
});
