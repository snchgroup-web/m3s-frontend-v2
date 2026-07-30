import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import api from './api';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: 'EN' })
}));

jest.mock('recharts', () => ({
  CartesianGrid: () => null,
  Cell: () => null,
  Legend: () => null,
  Line: () => null,
  LineChart: ({ children }) => <div>{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div>{children}</div>,
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
    getTasksCount: jest.fn(),
    getUsers: jest.fn(),
    getIncome: jest.fn(),
    getExpenses: jest.fn(),
    getFxHistory: jest.fn()
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue({ data: {} });
  api.getDocumentsCount.mockResolvedValue({ total: 12 });
  api.getInventoryCount.mockResolvedValue({ total: 8 });
  api.getTasksCount.mockResolvedValue({ total: 4 });
  api.getUsers.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
  api.getIncome.mockResolvedValue({
    data: [
      { category: 'PRESTATION', montant_chf: 300, date: '2026-01-01' },
      { category: 'DON', montant_chf: 100, date: '2026-01-02' },
      { category: 'FINANCEMENT', montant_chf: 200, date: '2026-01-03' }
    ]
  });
  api.getExpenses.mockResolvedValue({
    data: [{ category: 'OUTILS', montant_chf: 50, date: '2026-01-04' }]
  });
  api.getFxHistory.mockResolvedValue({ taux_du_jour: { CHF_CFA: 600 } });
});

test('shows connected KPI values and labels missing sources explicitly', async () => {
  render(<Dashboard />);

  expect(await screen.findByText('M3S users')).toBeInTheDocument();
  expect(screen.getAllByText('12').length).toBeGreaterThan(0);
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getAllByText('Source not connected').length).toBeGreaterThan(0);
  expect(screen.queryByText('7 donors')).not.toBeInTheDocument();
  expect(screen.queryByText('3 projects')).not.toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Open module: CRM' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open module: Production' })).toBeInTheDocument();

  await waitFor(() => {
    expect(api.getFinanceDashboard).toHaveBeenCalledTimes(1);
    expect(api.getDocumentsCount).toHaveBeenCalledTimes(1);
    expect(api.getInventoryCount).toHaveBeenCalledTimes(1);
    expect(api.getTasksCount).toHaveBeenCalledTimes(1);
    expect(api.getUsers).toHaveBeenCalledWith(100, 0);
  });
});

test('does not turn unavailable sources into real zeroes', async () => {
  api.getDocumentsCount.mockResolvedValue(null);
  api.getInventoryCount.mockResolvedValue(null);
  api.getTasksCount.mockResolvedValue(null);
  api.getUsers.mockResolvedValue(null);
  api.getIncome.mockResolvedValue(null);
  api.getExpenses.mockResolvedValue(null);

  render(<Dashboard />);

  expect(await screen.findByText(/Some live data is temporarily unavailable/)).toBeInTheDocument();
  expect(screen.getAllByText('Unavailable').length).toBeGreaterThan(0);
  expect(screen.getByText('No financial series is available yet.')).toBeInTheDocument();
});

test('treats an empty users response as a real zero-user state', async () => {
  api.getUsers.mockResolvedValue({ data: [] });

  render(<Dashboard />);

  expect(await screen.findByText('No M3S users are registered yet.')).toBeInTheDocument();
  expect(screen.getByText('M3S users')).toBeInTheDocument();
  expect(screen.getAllByText('0').length).toBeGreaterThan(0);
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

  render(<Dashboard />);

  expect(await screen.findByText('M3S users')).toBeInTheDocument();
  expect(screen.queryByText(/Some live data is temporarily unavailable/)).not.toBeInTheDocument();
  expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(3);
});
