import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import Finance, { FinanceTrendLegend, shouldShowFxLabel } from './Finance';
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
  LineChart: ({ children, data }) => <div data-testid="fx-chart" data-series={JSON.stringify(data)}>{children}</div>,
  Line: ({ children, ...props }) => <div data-testid="fx-line" data-style={JSON.stringify(props)}>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: props => <div data-testid="finance-bar" data-style={JSON.stringify(props)} />,
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
const observations = () => document.getElementById('finance-fx-observations');

test('malformed and zero rates remain unavailable in history, never counted or silently replaced', async () => {
  mockSearch += '&fxView=history';
  api.getFxHistory.mockResolvedValue({ data: [
    { source_id: 'QA-BAD', devise_base: 'CHF', devise_cible: 'CFA', taux: '700oops' },
    { source_id: 'QA-ZERO', devise_base: 'CHF', devise_cible: 'CFA', taux: 0, rate: 700 },
    { source_id: 'QA-GOOD', devise_base: 'CHF', devise_cible: 'CFA', taux: '710' }
  ] });
  render(<Finance />);
  await screen.findByText('QA-BAD');
  expect(observations()).toHaveTextContent('Observations CHF/CFA valides : 1');
  for (const id of ['QA-BAD', 'QA-ZERO']) expect(within(screen.getByText(id).closest('tr')).getByTitle('À qualifier')).toHaveTextContent('—');
  fireEvent.click(within(screen.getByText('QA-BAD').closest('tr')).getAllByRole('button')[0]);
  expect(screen.getByRole('dialog', { name: 'Modifier Taux' }).querySelector('input[type="number"]')).toHaveValue(null);
});

test('annual chart includes later source years and preserves null gaps', async () => {
  mockSearch += '&fxView=dashboard';
  api.getFxHistory.mockResolvedValue({ data: [
    { source_id: 'QA-25', devise_base: 'CHF', devise_cible: 'CFA', taux: 700, date_taux: '2025-09-01' },
    { source_id: 'QA-27', devise_base: 'CHF', devise_cible: 'CFA', taux: 730, date_taux: '2027-09-01' }
  ] });
  render(<Finance />);
  const chart = await screen.findByTestId('fx-chart');
  expect(JSON.parse(chart.dataset.series)).toEqual([
    { année: '2025', 'Taux Moyen': 700, observations: 1 },
    { année: '2026', 'Taux Moyen': null, observations: 0 },
    { année: '2027', 'Taux Moyen': 730, observations: 1 }
  ]);
});

test('TFX history uses the same thin blue curve and markers as the Finance overview', async () => {
  mockSearch = '?tab=overview';
  const view = render(<Finance />);
  const overviewLine = await screen.findByTestId('fx-line');
  const overview = JSON.parse(overviewLine.dataset.style);
  view.unmount();
  mockSearch = '?tab=fx&fxView=dashboard';
  render(<Finance />);
  const tfxLine = await screen.findByTestId('fx-line');
  expect(JSON.parse(tfxLine.dataset.style)).toEqual(overview);
  expect(document.getElementById('finance-fx-dashboard')).toHaveClass('flex', 'flex-col', 'lg:min-h-[calc(100dvh-12rem)]');
  expect(document.getElementById('finance-fx-dashboard')).not.toHaveClass('min-h-[calc(100dvh-12rem)]');
  expect(screen.getByTestId('finance-fx-chart-layout')).toHaveClass('flex-1', 'items-center');
  expect(overview).toMatchObject({
    stroke: '#60a5fa', strokeWidth: 2.25,
    dot: { r: 4, strokeWidth: 2 }, activeDot: { r: 6 }
  });
});

test('overview trend bars use currency colors and a distinct expense fill without changing their data keys', async () => {
  mockSearch = '?tab=overview';
  render(<Finance />);
  await screen.findByTestId('fx-line');
  const bars = screen.getAllByTestId('finance-bar').map(node => JSON.parse(node.dataset.style));
  expect(bars.map(bar => bar.dataKey)).toEqual(['recettes', 'depenses', 'recettesCfa', 'depensesCfa']);
  for (const [income, expense, color] of [[bars[0], bars[1], 'var(--m3s-status-info)'], [bars[2], bars[3], 'var(--m3s-currency-cfa)']]) {
    expect(income.fill).toBe(color);
    expect(income.fillOpacity).toBeUndefined();
    expect(expense).toMatchObject({ fill: color, fillOpacity: 0.35, stroke: color, strokeWidth: 1.5 });
    expect(income.name).toBe('Recettes');
    expect(expense.name).toBe('Dépenses');
  }
});

test('trend legends preserve series order and match the solid and outlined bar treatments', () => {
  render(<FinanceTrendLegend payload={[
    { dataKey: 'depenses', value: 'Dépenses', color: '#2563eb' },
    { dataKey: 'recettes', value: 'Recettes', color: '#2563eb' }
  ]} />);
  const items = screen.getAllByRole('listitem');
  expect(items.map(item => item.textContent)).toEqual(['Recettes', 'Dépenses']);
  expect(items[0].querySelector('span span').style.opacity).toBe('1');
  expect(items[1].querySelector('span span').style.opacity).toBe('0.35');
  expect(items[1].querySelector('span').style.borderWidth).toBe('1.5px');
});

test.each([200, 308, 620, 1200])('FX label density adapts to %s pixels without changing points', width => {
  const indices = Array.from({ length: 9 }, (_, index) => index).filter(index => shouldShowFxLabel(index, 9, width));
  if (width >= 300) expect(indices[0]).toBe(0);
  expect(indices.at(-1)).toBe(8);
  if (width === 1200) expect(indices).toHaveLength(9);
  if (width < 620) expect(indices.length).toBeLessThanOrEqual(3);
  expect(shouldShowFxLabel(0, 1, width)).toBe(true);
});

test.each([['FR', 'Aucune observation CHF/CFA datée exploitable.'], ['EN', 'No usable dated CHF/CFA observations.'], ['DE', 'Keine verwendbaren datierten CHF/CFA-Beobachtungen.']])('empty chart has an explicit localized state in %s', async (language, message) => {
  mockLanguage = language; mockSearch += '&fxView=dashboard';
  api.getFxHistory.mockResolvedValue({ data: [] });
  render(<Finance />);
  expect(await screen.findByText(message)).toBeInTheDocument();
  expect(screen.queryByTestId('fx-chart')).not.toBeInTheDocument();
  expect(observations()).toHaveTextContent('0');
});

test.each([{ success: false, data: [] }, { data: null }])('failed or invalid source is not reported as an empty loaded history', async response => {
  mockSearch += '&fxView=dashboard';
  api.getFxHistory.mockResolvedValue(response);
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(observations()).toHaveTextContent('Source FX indisponible');
  expect(observations()).not.toHaveTextContent('Historique chargé');
  expect(screen.queryByTestId('fx-chart')).not.toBeInTheDocument();
});

const output = () => screen.getByRole('status', { name: 'Résultat de la conversion' });
test('loading and a rejected FX read are distinct from an empty available register', async () => {
  let rejectRead;
  api.getFxHistory.mockReturnValue(new Promise((resolve, reject) => { rejectRead = reject; }));
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(observations()).not.toHaveTextContent('Historique chargé');
  expect(observations()).not.toHaveTextContent('Source FX indisponible');
  expect(converter().getByRole('button', { name: 'Calculer' })).toBeDisabled();
  await act(async () => rejectRead(new Error('QA inaccessible')));
  expect(observations()).toHaveTextContent('Source FX indisponible');
});

test('an invalid first observation cannot shadow a valid rate on the same date', async () => {
  const date = new Date().toISOString().slice(0, 10);
  api.getFxHistory.mockResolvedValue({ data: [-5, 700].map((taux, i) => ({ source_id: 'QA-EXACT-' + i, taux, date_taux: date, devise_base: 'CHF', devise_cible: 'CFA' })) });
  render(<Finance />);
  await screen.findByText('Historique chargé · Observations CHF/CFA valides : 1 · CFA par CHF');
  expect(converter().getByRole('button', { name: 'Calculer' })).toBeEnabled();
  expect(output().textContent.replace(/\s/g, '')).toContain('700000CFA');
});

const readyConverter = async (rate = 700) => {
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'QA-CONVERT-FX', devise_base: 'CHF', devise_cible: 'CFA', taux: rate, date_taux: new Date().toISOString().slice(0, 10) }] });
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
};

test.each(['CHF_CFA', 'CFA_CHF'])('recent %s conversion keeps currency identity, equal typography and an explicit rate unit', async direction => {
  await readyConverter();
  fireEvent.change(converter().getByLabelText('Direction'), { target: { value: direction } });
  fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  const table = converter().getByRole('table', { name: 'Conversions récentes' });
  const cells = within(table).getAllByRole('row')[1].querySelectorAll('td');
  const currencies = direction.split('_');
  expect(cells[1].textContent).toMatch(new RegExp(currencies[0] + '$'));
  expect(cells[2].textContent).toMatch(new RegExp(currencies[1] + '$'));
  expect(cells[1]).toHaveClass('font-medium');
  expect(cells[2]).toHaveClass('font-medium');
  expect(cells[0]).toHaveTextContent('Référence courante');
  expect(within(table).getByRole('columnheader', { name: 'Taux (CFA / CHF)' })).toBeInTheDocument();
  expect(converter().getByRole('region', { name: 'Conversions récentes' })).toHaveAttribute('tabindex', '0');
});

test('each recent conversion retains its historical date when the selected date changes', async () => {
  const now = new Date(), month = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  api.getFxHistory.mockResolvedValue({ data: [1, 2].map(day => ({
    source_id: 'QA-DATE-' + day, devise_base: 'CHF', devise_cible: 'CFA',
    taux: 700 + day, date_taux: month + '-0' + day
  })), taux_du_jour: { CHF_CFA: 700 } });
  render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  for (const day of [1, 2]) {
    fireEvent.click(converter().getByRole('button', { name: /Sélectionner une date/ }));
    const dayButton = within(screen.getByRole('dialog')).getAllByRole('button', { name: String(day), exact: true })
      .find(button => !button.classList.contains('is-outside-month'));
    fireEvent.click(dayButton);
    fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  }
  const table = converter().getByRole('table');
  expect([...table.querySelectorAll('time')].map(node => node.dateTime)).toEqual([month + '-02', month + '-01']);
  expect([...table.querySelectorAll('tbody tr')].map(row => row.lastElementChild.textContent)).toEqual(['702', '701']);
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
});

test.each([['EN', 'Recent conversions', 'Current reference'], ['DE', 'Letzte Umrechnungen', 'Aktuelle Referenz']])('saved reference labels follow a switch to %s', async (language, title, reference) => {
  api.getFxHistory.mockResolvedValue({ data: [], taux_du_jour: { CHF_CFA: 700 } });
  const view = render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  mockLanguage = language;
  view.rerender(<Finance />);
  expect(converter().getByRole('table', { name: title })).toHaveTextContent(reference);
});

test('recent conversions retain only five snapshots across FX views and clear on remount', async () => {
  api.getFxHistory.mockResolvedValue({ data: [], taux_du_jour: { CHF_CFA: 700 } });
  const view = render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  for (let amount = 1; amount <= 6; amount++) {
    fireEvent.change(converter().getByLabelText('Montant', { exact: true }), { target: { value: String(amount) } });
    fireEvent.click(converter().getByRole('button', { name: 'Calculer' }));
  }
  expect(converter().getByRole('table').querySelectorAll('tbody tr')).toHaveLength(5);
  fireEvent.click(within(nav()).getByRole('button', { name: 'Taux & Historique' }));
  fireEvent.click(within(nav()).getByRole('button', { name: 'Convertisseur' }));
  expect(converter().getByRole('table').querySelectorAll('tbody tr')).toHaveLength(5);
  view.unmount(); render(<Finance />);
  await screen.findByText('Totaux globaux disponibles');
  expect(converter().queryByRole('table')).not.toBeInTheDocument();
});

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
