import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import CRM from './CRM';
import api from './api';

let mockSearch = '';
let mockLanguage = 'EN';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch }),
  useNavigate: () => jest.fn()
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

  fireEvent.click(screen.getByRole('tab', { name: 'Clients (0)' }));
  expect(screen.getByRole('heading', { name: 'Clients' })).toBeInTheDocument();
  expect(screen.getByText('Identity and segment')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Sales (0)' }));
  expect(screen.getByRole('heading', { name: 'Sales' })).toBeInTheDocument();
  expect(screen.getByText('Prospect or client')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Donations (0)' }));
  expect(screen.getByRole('heading', { name: 'Donations' })).toBeInTheDocument();

  await waitFor(() => {
    expect(api.getSocialFinance).toHaveBeenCalledWith(300, 0);
    expect(api.getInventory).toHaveBeenCalledWith(500, 0);
  });

  mockLanguage = 'DE';
  view.rerender(<CRM />);
  fireEvent.click(screen.getByRole('tab', { name: 'Verkäufe (0)' }));

  expect(screen.getByRole('heading', { name: 'Verkäufe' })).toBeInTheDocument();
  expect(screen.getByText('Nächstes Teilpaket')).toBeInTheDocument();
  expect(screen.getByText('Nur lesen')).toBeInTheDocument();
});

test('preserves confirmed zero values when both extracts are available', async () => {
  mockSearch = '?tab=overview';
  mockLanguage = 'EN';
  api.getSocialFinance.mockResolvedValue({ data: [], timestamp: '2026-08-09T08:00:00.000Z' });
  api.getInventory.mockResolvedValue({ data: [], timestamp: '2026-08-09T08:01:00.000Z' });

  render(<CRM />);

  expect(await screen.findByText('2/2')).toBeInTheDocument();
  expect(screen.getByText(/Finance Social: Available/)).toBeInTheDocument();
  expect(screen.getByText(/Stocks & Assets: Available/)).toBeInTheDocument();
  expect(screen.getByText('0 CHF')).toBeInTheDocument();
  expect(screen.getByText(/up to 300 social flows and 500 stock items/i)).toBeInTheDocument();
});

test('does not turn unavailable CRM sources into zero values', async () => {
  mockSearch = '?tab=overview';
  mockLanguage = 'EN';
  api.getSocialFinance.mockRejectedValue(new Error('social unavailable'));
  api.getInventory.mockRejectedValue(new Error('inventory unavailable'));

  render(<CRM />);

  expect(await screen.findByText('0/2')).toBeInTheDocument();
  expect(screen.getByText('Finance Social: Unavailable')).toBeInTheDocument();
  expect(screen.getByText('Stocks & Assets: Unavailable')).toBeInTheDocument();
  expect(screen.queryByText('0 CHF')).not.toBeInTheDocument();
});

test('keeps an available social extract when inventory is unavailable', async () => {
  mockSearch = '?tab=overview';
  mockLanguage = 'EN';
  api.getSocialFinance.mockResolvedValue({
    data: [{ id: 'SOC-1', montant_chf: 125, montant_cfa: 87500, description: 'Aide sociale' }],
    timestamp: '2026-08-09T08:00:00.000Z'
  });
  api.getInventory.mockRejectedValue(new Error('inventory unavailable'));

  render(<CRM />);

  expect(await screen.findByText('1/2')).toBeInTheDocument();
  expect(screen.getByText(/Finance Social: Available/)).toBeInTheDocument();
  expect(screen.getByText('Stocks & Assets: Unavailable')).toBeInTheDocument();
  expect(screen.getByText('125 CHF')).toBeInTheDocument();
  expect(screen.queryByText('0 CHF')).not.toBeInTheDocument();
});

test('uses the governed beneficiary field without inferring a name from the description', async () => {
  mockSearch = '?tab=beneficiaires';
  mockLanguage = 'FR';
  api.getSocialFinance.mockResolvedValue({
    data: [
      { id: 'SOC-1', beneficiaire: 'Unité Alpha', description: 'Aide famille Rufisque' },
      { id: 'SOC-2', beneficiaire: '', description: 'Aide famille Rufisque' }
    ]
  });
  api.getInventory.mockResolvedValue({ data: [] });

  render(<CRM />);

  expect(await screen.findByText('Unité Alpha')).toBeInTheDocument();
  expect(screen.getByText('Bénéficiaire à préciser')).toBeInTheDocument();
  expect(screen.queryByText('Famille SN')).not.toBeInTheDocument();
  expect(screen.queryByText('Communauté Rufisque')).not.toBeInTheDocument();
});

test('opens the governed local CRM glossary from the module tab', async () => {
  renderCRM('glossary', 'FR');

  expect(await screen.findByRole('heading', { level: 2, name: 'Glossaire Commercial & CRM' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=CRM-PROSPECT&returnTo=crm-glossary'
  );
});
