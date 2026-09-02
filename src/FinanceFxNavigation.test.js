import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Finance from './Finance';
import api from './api';
import { getDashboardReturnContext, buildDashboardReturnPath } from './dashboardNavigation';

let mockSearch;
let mockLanguage;
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/finance', search: mockSearch, hash: '#finance-fx-navigation' }),
  useNavigate: () => mockNavigate
}), { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div>{children}</div>, Line: () => null,
  BarChart: ({ children }) => <div>{children}</div>, Bar: () => null,
  LabelList: () => null, XAxis: () => null, YAxis: () => null,
  CartesianGrid: () => null, Tooltip: () => null, Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));
jest.mock('./api', () => ({ __esModule: true, default: {
  getFinanceDashboard: jest.fn(), getExpenses: jest.fn(), getIncome: jest.fn(),
  getFxHistory: jest.fn(), getSocialFinance: jest.fn(), getRealEstateFinance: jest.fn()
} }));


beforeEach(() => {
  jest.clearAllMocks();
  mockLanguage = 'FR';
  mockSearch = '?tab=fx';
  api.getFinanceDashboard.mockResolvedValue({ data: { total_income_count: 0, total_expense_count: 0 } });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'QA-NAV-FX', devise_base: 'CHF', devise_cible: 'CFA', taux: 700, date_taux: '2026-09-01' }] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});
const nav = () => screen.getByRole('navigation', { name: 'Historique FX' });
const labels = { converter: 'Convertisseur', dashboard: 'Tableau de bord', history: 'Taux & Historique' };
const expectView = view => {
  expect(within(nav()).getByRole('button', { name: labels[view] })).toHaveAttribute('aria-pressed', 'true');
  for (const key of Object.keys(labels)) expect(Boolean(document.getElementById('finance-fx-' + key))).toBe(key === view);
};

test.each(['converter', 'dashboard', 'history'])('direct URL opens FX %s with its selected control and panel', async view => {
  mockSearch += '&fxView=' + view;
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expectView(view);
  expect(within(nav()).getByRole('button', { name: labels[view] })).toHaveAttribute('aria-controls', 'finance-fx-' + view);
  expect(mockNavigate).not.toHaveBeenCalled();
});

test.each(['', '&fxView=unknown', '&fxView=HISTORY'])('legacy or invalid FX URL %s retains converter fallback', async value => {
  mockSearch += value;
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expectView('converter');
  expect(mockNavigate).not.toHaveBeenCalled();
});

test('switching FX views preserves the KPI return context and adds an accessible anchor', async () => {
  mockSearch = '?tab=fx&returnTo=dashboard&dashboardKpi=reference-rate&incomeScope=donations';
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  for (const view of ['history', 'dashboard', 'converter']) {
    fireEvent.click(within(nav()).getByRole('button', { name: labels[view] }));
    const target = mockNavigate.mock.calls.at(-1)[0];
    const params = new URLSearchParams(target.search);
    expect(params.get('tab')).toBe('fx');
    expect(params.get('fxView')).toBe(view);
    expect(params.get('incomeScope')).toBe('donations');
    expect(target.hash).toBe('#finance-fx-navigation');
    const context = getDashboardReturnContext(target.search);
    expect(buildDashboardReturnPath(context.indicatorId)).toContain('#dashboard-kpi-reference-rate');
    expectView(view);
  }
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
});

test('back, forward and a remount follow URL state without reloading data on view changes', async () => {
  mockSearch += '&fxView=history';
  const view = render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expectView('history');
  mockSearch = '?tab=fx&fxView=dashboard';
  view.rerender(<Finance />);
  expectView('dashboard');
  mockSearch = '?tab=fx&fxView=history';
  view.rerender(<Finance />);
  expectView('history');
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
  view.unmount();
  render(<Finance />);
  await screen.findByText('QA-NAV-FX');
  expectView('history');
});

test.each([['FR', 'Historique FX', 'Taux & Historique'], ['EN', 'FX History', 'Rates & History'], ['DE', 'Wechselkurshistorie', 'Kurse & Verlauf']])('language %s retains the FX history panel and selected button', async (language, name, label) => {
  mockSearch += '&fxView=history';
  const view = render(<Finance />);
  await screen.findByText('QA-NAV-FX');
  mockLanguage = language;
  view.rerender(<Finance />);
  const button = within(screen.getByRole('navigation', { name })).getByRole('button', { name: label });
  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(document.getElementById('finance-fx-history')).toHaveTextContent('QA-NAV-FX');
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
  expect(mockNavigate).not.toHaveBeenCalled();
});

test('a retained fxView never changes the requested Finance parent tab', async () => {
  mockSearch = '?tab=immobilier&fxView=history';
  render(<Finance />);
  await screen.findByRole('button', { name: 'Nouvelle opération Immo' });
  expect(screen.queryByRole('navigation', { name: 'Historique FX' })).not.toBeInTheDocument();
});

const converter = () => within(document.getElementById('finance-fx-converter'));
const output = () => screen.getByRole('status', { name: 'Résultat de la conversion' });
const readyConverter = async (rate = 700) => {
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'QA-CONVERT-FX', devise_base: 'CHF', devise_cible: 'CFA', taux: rate, date_taux: new Date().toISOString().slice(0, 10) }] });
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
};

test.each(['', '-5', '1e308', 'Infinity', 'NaN'])('invalid converter amount %s never becomes a zero result or a recent conversion', async value => {
  await readyConverter();
  fireEvent.change(converter().getByLabelText('Montant', { exact: true }), { target: { value } });
  expect(converter().getByLabelText('Montant', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  expect(converter().getByRole('alert')).toHaveTextContent('Montant vide, négatif ou résultat hors limites');
  expect(converter().getByRole('button', { name: 'Calculer' })).toBeDisabled();
  expect(output()).toHaveTextContent('— CFA');
  fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  expect(converter().queryByRole('table')).not.toBeInTheDocument();
});

test.each(['CHF_CFA', 'CFA_CHF'])('an explicit zero remains calculable in %s', async direction => {
  await readyConverter();
  fireEvent.change(converter().getByLabelText('Direction'), { target: { value: direction } });
  fireEvent.change(converter().getByLabelText('Montant', { exact: true }), { target: { value: '0' } });
  expect(converter().getByRole('button', { name: 'Calculer' })).toBeEnabled();
  expect(output().textContent.replace(/\s/g, '')).toBe(direction === 'CHF_CFA' ? '0,00CHF≈0CFA' : '0CFA≈0,00CHF');
  fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  expect(converter().getByRole('table').querySelectorAll('tbody tr')).toHaveLength(1);
});

test.each([0, -1, Infinity, null])('invalid reference rate %s cannot produce a conversion', async rate => {
  await readyConverter(rate);
  expect(converter().getByRole('button', { name: 'Calculer' })).toBeDisabled();
  expect(output()).toHaveTextContent('— CFA');
});

test('a changed FX reference refreshes the preview while preserving the saved conversion snapshot', async () => {
  await readyConverter();
  fireEvent.change(converter().getByLabelText('Montant', { exact: true }), { target: { value: '10' } });
  fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  expect(output().textContent.replace(/\s/g, '')).toContain('7000CFA');
  fireEvent.click(within(nav()).getByRole('button', { name: 'Taux & Historique' }));
  const row = screen.getByText('QA-CONVERT-FX').closest('tr');
  fireEvent.click(within(row).getAllByRole('button')[0]);
  const form = screen.getByRole('dialog', { name: 'Modifier Taux' });
  fireEvent.change(within(form).getByLabelText('Taux *'), { target: { value: '710' } });
  fireEvent.click(within(form).getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  fireEvent.click(within(nav()).getByRole('button', { name: 'Convertisseur' }));
  expect(output().textContent.replace(/\s/g, '')).toContain('7100CFA');
  expect(converter().getByRole('table').querySelector('tbody').textContent.replace(/\s/g, '')).toContain('7000CFA700');
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
});

test.each([['FR', 'Montant', 'Montant vide'], ['EN', 'Amount', 'Missing or negative'], ['DE', 'Betrag', 'Betrag fehlt']])('converter validation is localized in %s', async (language, label, message) => {
  mockLanguage = language;
  api.getFxHistory.mockResolvedValue({ data: [], taux_du_jour: { CHF_CFA: 700 } });
  render(<Finance />);
  fireEvent.change(await screen.findByLabelText(label, { exact: true }), { target: { value: '' } });
  expect(converter().getByRole('alert')).toHaveTextContent(message);
});
