import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import CRM from './CRM';
import api from './api';

let mockSearch = '';
let mockLanguage = 'EN';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch })
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: mockLanguage })
}));

jest.mock('recharts', () => ({
  Bar: () => null,
  BarChart: ({ children }) => <div>{children}</div>,
  CartesianGrid: () => null,
  Cell: () => null,
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
    getSocialFinance: jest.fn(),
    getInventory: jest.fn()
  }
}));

const renderCRM = (tab, language = 'EN') => {
  mockSearch = `?tab=${tab}`;
  mockLanguage = language;
  api.getSocialFinance.mockResolvedValue({ data: [] });
  api.getInventory.mockResolvedValue({ data: [] });

  return render(<CRM />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

test('keeps the CRM pilot read-only and preserves validated sources', async () => {
  const view = renderCRM('prospects');

  expect(await screen.findByRole('heading', { name: 'Prospects' })).toBeInTheDocument();
  expect(screen.getByText('Next sub-lot')).toBeInTheDocument();
  expect(screen.getByText('Read only')).toBeInTheDocument();
  expect(screen.getByText('Organization or person')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Add' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Clients (0)' }));
  expect(screen.getByRole('heading', { name: 'Clients' })).toBeInTheDocument();
  expect(screen.getByText('Identity and segment')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Sales (0)' }));
  expect(screen.getByRole('heading', { name: 'Sales' })).toBeInTheDocument();
  expect(screen.getByText('Prospect or client')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Donations (0)' }));
  expect(screen.getByRole('heading', { name: 'Donations' })).toBeInTheDocument();

  await waitFor(() => {
    expect(api.getSocialFinance).toHaveBeenCalledWith(300, 0);
    expect(api.getInventory).toHaveBeenCalledWith(500, 0);
  });

  mockLanguage = 'DE';
  view.rerender(<CRM />);
  fireEvent.click(screen.getByRole('button', { name: 'Verkäufe (0)' }));

  expect(screen.getByRole('heading', { name: 'Verkäufe' })).toBeInTheDocument();
  expect(screen.getByText('Nächstes Teilpaket')).toBeInTheDocument();
  expect(screen.getByText('Nur lesen')).toBeInTheDocument();
});
