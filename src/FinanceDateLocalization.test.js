import React, { useEffect } from 'react';
import { render, screen, within } from '@testing-library/react';
import Finance from './Finance';
import api from './api';
import { LanguageProvider, useLanguage } from './LanguageContext';

let mockLocation = { pathname: '/finance', search: '?tab=recettes' };
jest.mock('react-router-dom', () => ({ useLocation: () => mockLocation, useNavigate: () => jest.fn() }), { virtual: true });
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div>{children}</div>, BarChart: ({ children }) => <div>{children}</div>,
  ResponsiveContainer: ({ children }) => <div>{children}</div>, Line: () => null, Bar: () => null,
  XAxis: () => null, YAxis: () => null, CartesianGrid: () => null, Tooltip: () => null,
  Legend: () => null, LabelList: () => null
}));
jest.mock('./api', () => ({ __esModule: true, default: {
  getFinanceDashboard: jest.fn(), getExpenses: jest.fn(), getIncome: jest.fn(),
  getFxHistory: jest.fn(), getSocialFinance: jest.fn(), getRealEstateFinance: jest.fn(),
  createIncome: jest.fn(), updateIncome: jest.fn(), deleteIncome: jest.fn(),
  createExpense: jest.fn(), updateExpense: jest.fn(), deleteExpense: jest.fn()
} }));

const row = Object.freeze({ id: 'DATE-DEMO', ref: 'DATE-DEMO', date: '2026-09-08',
  description: 'Synthetic calendar-date transaction', montant_chf: 10, montant_cfa: 7000, taux_fx: 700 });
function FinanceHarness({ language = 'FR' }) {
  const { setLanguage } = useLanguage();
  useEffect(() => { setLanguage(language); }, [setLanguage, language]);
  return <Finance/>;
}
const page = language => <LanguageProvider><FinanceHarness language={language}/></LanguageProvider>;
beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear(); mockLocation = { pathname: '/finance', search: '?tab=recettes' };
  api.getFinanceDashboard.mockResolvedValue({ success: true, data: { total_income_count: 1, total_income: 10, total_expense_count: 1, total_expenses: 10 } });
  api.getExpenses.mockResolvedValue({ data: [row] }); api.getIncome.mockResolvedValue({ data: [row] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});
afterEach(() => {
  for (const [name, method] of Object.entries(api)) if (/^(create|update|delete)/.test(name)) expect(method).not.toHaveBeenCalled();
  expect(row.date).toBe('2026-09-08'); expect(row.montant_chf).toBe(10);
  expect(row.montant_cfa).toBe(7000); expect(row.taux_fx).toBe(700);
});

test.each(['recettes', 'depenses'])('the %s table follows FR/DE/EN without refetching or altering its source', async tab => {
  mockLocation = { pathname: '/finance', search: `?tab=${tab}` };
  const view = render(page('FR'));
  const tableRow = (await screen.findByText('DATE-DEMO')).closest('tr');
  for (const [language, expected] of [['FR', '08-09-26'], ['DE', '08.09.26'], ['EN', '08/09/26']]) {
    view.rerender(page(language));
    expect(within(tableRow).getByText(expected)).toBeInTheDocument();
    expect(tableRow.cells[1]).toHaveClass('whitespace-nowrap');
  }
  expect(api.getExpenses).toHaveBeenCalledTimes(1); expect(api.getIncome).toHaveBeenCalledTimes(1);
});
test.each(['', '2026-02-30'])('an unavailable or invalid operation date (%s) does not become today', async date => {
  api.getIncome.mockResolvedValue({ data: [{ ...row, date }] });
  render(page('FR'));
  const tableRow = (await screen.findByText('DATE-DEMO')).closest('tr');
  expect(tableRow.cells[1]).toHaveTextContent('—');
});
test.each([{ value: '2026-09-08' }, '2026-09-08T23:30:00-07:00'])('retains the source calendar date of %j', async date => {
  const source = Object.freeze({ ...row, date });
  api.getIncome.mockResolvedValue({ data: [source] });
  render(page('FR'));
  const tableRow = (await screen.findByText('DATE-DEMO')).closest('tr');
  expect(within(tableRow).getByText('08-09-26')).toBeInTheDocument();
  expect(source.date).toEqual(date);
});

test.each([
  ['?tab=fx&fxView=history', 'FX-DATE-DEMO'],
  ['?tab=social', 'SOCIAL-DATE-DEMO'],
  ['?tab=immobilier', 'IMMO-DATE-DEMO']
])('other finance date columns follow all three languages without writes: %s', async (search, reference) => {
  mockLocation = { pathname: '/finance', search };
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'FX-DATE-DEMO', date_taux: row.date, devise_base: 'CHF', devise_cible: 'CFA', taux: 700 }] });
  api.getSocialFinance.mockResolvedValue({ data: [{ ...row, id: 'SOCIAL-DATE-DEMO', ref: 'SOCIAL-DATE-DEMO' }], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [{ source_id: 'IMMO-DATE-DEMO', date_operation: row.date, designation: 'Synthetic real estate', montant_chf: 10, montant_cfa: 7000 }], summary: {} });
  const view = render(page('FR'));
  const tableRow = (await screen.findByText(reference)).closest('tr');
  for (const [language, expected] of [['FR', '08-09-26'], ['DE', '08.09.26'], ['EN', '08/09/26']]) {
    view.rerender(page(language));
    expect(within(tableRow).getByText(expected)).toBeInTheDocument();
    expect(tableRow.cells[1]).toHaveClass('whitespace-nowrap');
  }
  for (const method of [api.getFxHistory, api.getSocialFinance, api.getRealEstateFinance]) expect(method).toHaveBeenCalledTimes(1);
});
