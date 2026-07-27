import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Production from './Production';
import { api } from './api';

let mockSearch = '';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch })
}), { virtual: true });

jest.mock('recharts', () => ({
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));

jest.mock('./api', () => ({
  api: {
    getExpenses: jest.fn(),
    getInventory: jest.fn()
  }
}));

const renderProduction = (tab, language = 'EN') => {
  mockSearch = `?tab=${tab}`;
  localStorage.setItem('language', language);
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getInventory.mockResolvedValue({ data: [] });

  return render(
    <LanguageProvider>
      <Production />
    </LanguageProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('renders the orders pilot as read only', async () => {
  renderProduction('commandes');

  expect(await screen.findByRole('heading', { name: 'Local Production pilot' })).toBeInTheDocument();
  expect(screen.getByText('Read only')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'New Order' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
  screen.getAllByRole('button', { name: 'Edit' }).forEach(button => expect(button).toBeDisabled());
  screen.getAllByRole('button', { name: 'Delete' }).forEach(button => expect(button).toBeDisabled());
});

test('renders the operational stock pilot without write actions', async () => {
  renderProduction('stocks');

  expect(await screen.findByText('Source: M3S local pilot')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Add Stock' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
});

test('keeps the connected suppliers register available separately', async () => {
  renderProduction('fournisseurs');

  expect(await screen.findByText('Supplier register consolidated from Expenses and Stock & Assets.')).toBeInTheDocument();
  expect(api.getExpenses).toHaveBeenCalledWith(500, 0);
  expect(api.getInventory).toHaveBeenCalledWith(500, 0);
});
