import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
  expect(screen.queryByText('Aucune opération immobilière enregistrée.')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Nouvelle opération Immo' })).not.toBeInTheDocument();
});

test.each([
  ['fr', 'Aucune opération immobilière enregistrée.', 'Nouvelle opération Immo', 'Désignation', 'Annuler'],
  ['en', 'No real estate operations recorded.', 'New real estate operation', 'Description', 'Cancel'],
  ['de', 'Keine Immobilienvorgänge erfasst.', 'Neuer Immobilienvorgang', 'Bezeichnung', 'Abbrechen'],
])('opens and cancels the first operation on a confirmed empty register in %s', async (language, empty, add, designation, cancel) => {
  mockSearch = '?tab=immobilier';
  localStorage.setItem('language', language.toUpperCase());
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
  renderFinance();
  expect(await screen.findByText(empty)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: add }));
  expect(screen.getByLabelText(designation)).toHaveValue('');
  fireEvent.click(screen.getByRole('button', { name: cancel }));
  expect(screen.queryByLabelText(designation)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: add })).toBeEnabled();
});

test('does not offer creation while the real-estate register is loading', () => {
  mockSearch = '?tab=immobilier';
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockReturnValue(new Promise(() => {}));
  renderFinance();
  expect(screen.queryByRole('button', { name: 'Nouvelle opération Immo' })).not.toBeInTheDocument();
  expect(screen.queryByText('Aucune opération immobilière enregistrée.')).not.toBeInTheDocument();
});

test.each([
  ['network failure', () => Promise.reject(new Error('Network unavailable'))],
  ['missing response', () => Promise.resolve(undefined)],
  ['missing data', () => Promise.resolve({ summary: {} })],
  ['invalid data', () => Promise.resolve({ data: {} })],
  ['reported failure', () => Promise.resolve({ success: false, data: [] })],
])('does not unlock an empty register after %s', async (_, response) => {
  mockSearch = '?tab=immobilier';
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockImplementation(response);
  renderFinance();
  const register = within(document.getElementById('finance-real-estate'));
  expect(await register.findByText(/Aucune valeur manquante/)).toBeInTheDocument();
  expect(screen.queryByText('Aucune opération immobilière enregistrée.')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Nouvelle opération Immo' })).not.toBeInTheDocument();
});
