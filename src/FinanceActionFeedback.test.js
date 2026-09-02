import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

let mockSearch = '?tab=recettes';

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
    getRealEstateFinance: jest.fn(),
    createIncome: jest.fn(),
    updateIncome: jest.fn(),
    deleteIncome: jest.fn(),
    createExpense: jest.fn(),
    updateExpense: jest.fn(),
    deleteExpense: jest.fn(),
    createRealEstateFinance: jest.fn(),
    updateRealEstateFinance: jest.fn(),
    deleteRealEstateFinance: jest.fn()
  }
}));

const renderFinance = () => render(
  <LanguageProvider>
    <Finance />
  </LanguageProvider>
);

beforeEach(() => {
  mockSearch = '?tab=recettes';
  localStorage.clear();
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue({
    success: true,
    data: { total_income_count: 0, total_income: 0, total_expense_count: 0, total_expenses: 0 }
  });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({
    data: [{
      source_id: 'FX-TODAY',
      date_taux: new Date().toISOString().split('T')[0],
      taux: 710,
      devise_base: 'CHF',
      devise_cible: 'CFA',
      source_taux: 'Test'
    }]
  });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
  api.createIncome.mockResolvedValue({ success: true });
});

test('requires confirmation before creating a revenue entry and then reports success', async () => {
  renderFinance();
  await act(async () => {});

  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Cotisation pilote' } });
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '100' } });
  expect(screen.getAllByText('710 CFA / CHF')).not.toHaveLength(0);
  const appliedRate = screen.getByLabelText('Taux appliqué *');
  expect(appliedRate).toHaveValue(710);
  fireEvent.change(appliedRate, { target: { value: '705' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));

  expect(screen.getByRole('dialog', { name: 'Confirmer l’ajout' })).toHaveTextContent('Cotisation pilote');
  expect(api.createIncome).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  await waitFor(() => expect(api.createIncome).toHaveBeenCalledWith(expect.objectContaining({
    taux_fx: 705,
    taux_fx_applique: 705,
    taux_fx_reference: 710,
    montant_chf: 100,
    montant_cfa: 70500,
  })));
  expect(await screen.findByText('« Cotisation pilote » a été enregistrée avec succès.')).toBeInTheDocument();
});

test('keeps incomplete historical FX values visible without reference-rate substitution', async () => {
  api.getIncome.mockResolvedValue({
    data: [
      {
        source_id: 'REC-00003',
        description: 'Recette CFA historique',
        devise_origine: 'CFA',
        montant_origine: 100000,
        montant_chf: 0,
        montant_cfa: 100000,
        taux_fx_applique: 0,
      },
      {
        source_id: 'REC-00004',
        description: 'Recette CHF incomplète',
        devise_origine: 'CHF',
        montant_origine: 100,
        montant_chf: 100,
        montant_cfa: null,
        taux_fx_applique: null,
      },
    ],
  });

  renderFinance();

  expect(await screen.findByText(/2 écriture\(s\) affichée\(s\) ont un taux appliqué absent ou nul/)).toBeInTheDocument();
  expect(screen.getByText(/1 écriture\(s\) affichée\(s\) ont un montant CHF ou CFA indisponible/)).toBeInTheDocument();
  expect(screen.getAllByText('À qualifier')).toHaveLength(2);

  const cfaRow = screen.getByText('REC-00003').closest('tr');
  const incompleteChfRow = screen.getByText('REC-00004').closest('tr');
  expect(cfaRow).toHaveTextContent('0');
  expect(cfaRow).not.toHaveTextContent('710');
  expect(incompleteChfRow).toHaveTextContent('—');
  expect(incompleteChfRow).not.toHaveTextContent('71 000');
});

test('keeps a local FX rate until deletion is confirmed', async () => {
  mockSearch = '?tab=fx';
  const { container } = renderFinance();

  fireEvent.click(await screen.findByRole('button', { name: /Taux & Historique/ }));
  expect(await screen.findByText('FX-TODAY')).toBeInTheDocument();
  const deleteButton = container.querySelector('svg.lucide-trash-2').closest('button');
  fireEvent.click(deleteButton);

  expect(screen.getByRole('dialog', { name: 'Confirmer la suppression' })).toHaveTextContent('CHF → CFA');
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(screen.getByText('FX-TODAY')).toBeInTheDocument();

  fireEvent.click(deleteButton);
  fireEvent.click(screen.getByRole('button', { name: 'Oui, supprimer' }));

  expect(screen.queryByText('FX-TODAY')).not.toBeInTheDocument();
  expect(screen.getByText('Le taux « CHF → CFA » a été supprimé localement avec succès.')).toBeInTheDocument();
});

const historicalRow = rate => ({
  source_id: 'QA-FX-001', description: 'Transaction fictive QA',
  date_document: '2026-09-01', devise_origine: 'CFA', montant_origine: 100000,
  montant_chf: 0, montant_cfa: 100000, taux_fx_applique: rate,
});

const useHistoricalRates = () => api.getFxHistory.mockResolvedValue({ data: [
  { source_id: 'QA-FX-A', date_taux: '2026-09-01', taux: 700, devise_base: 'CHF', devise_cible: 'CFA' },
  { source_id: 'QA-FX-B', date_taux: '2026-09-02', taux: 710, devise_base: 'CHF', devise_cible: 'CFA' },
] });

const changeToSeptemberSecond = () => {
  fireEvent.click(screen.getByRole('button', { name: /Sélectionner une date/ }));
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Sélecteur de date' })).getAllByRole('button', { name: '2', exact: true })[0]);
};

test.each([
  ['recettes', 0], ['recettes', null], ['recettes', -2], ['depenses', 0], ['depenses', null],
])('does not replace an unknown applied rate when editing %s (%s)', async (tab, rate) => {
  mockSearch = '?tab=' + tab;
  useHistoricalRates();
  (tab === 'recettes' ? api.getIncome : api.getExpenses).mockResolvedValue({ data: [historicalRow(rate)] });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  const input = screen.getByLabelText('Taux appliqué *');
  expect(input).toHaveValue(null);
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  expect(screen.getByRole('alert')).toHaveTextContent('taux appliqué strictement positif');
  changeToSeptemberSecond();
  expect(input).toHaveValue(null);
  expect(api.updateIncome).not.toHaveBeenCalled();
  expect(api.updateExpense).not.toHaveBeenCalled();
});

test('keeps a recorded rate even when it equals the old date reference', async () => {
  useHistoricalRates();
  api.getIncome.mockResolvedValue({ data: [historicalRow(700)] });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  changeToSeptemberSecond();
  expect(screen.getByLabelText('Taux appliqué *')).toHaveValue(700);
  expect(screen.getAllByText('710 CFA / CHF').length).toBeGreaterThan(0);
});

test('requires an explicit valid rate then confirms the historical update', async () => {
  useHistoricalRates();
  api.getIncome.mockResolvedValue({ data: [historicalRow(0)] });
  api.updateIncome.mockResolvedValue({ success: true });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  const input = screen.getByLabelText('Taux appliqué *');
  for (const rate of ['', '0', '-1']) {
    fireEvent.change(input, { target: { value: rate } });
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  }
  fireEvent.change(input, { target: { value: '705' } });
  expect(input).toHaveAttribute('aria-invalid', 'false');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.updateIncome).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(api.updateIncome).toHaveBeenCalledWith('QA-FX-001', expect.objectContaining({
    taux_fx_applique: 705, taux_fx: 705, taux_fx_reference: 700,
    montant_origine: 100000, montant_chf: 100000 / 705, montant_cfa: 100000,
  })));
});

test('does not reinsert the suggested rate after clearing it in a new entry', async () => {
  renderFinance();
  await act(async () => {});
  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  const input = screen.getByLabelText('Taux appliqué *');
  expect(input).toHaveValue(710);
  fireEvent.change(input, { target: { value: '' } });
  expect(input).toHaveValue(null);
  expect(screen.getByRole('button', { name: 'Créer' })).toBeDisabled();
  expect(api.createIncome).not.toHaveBeenCalled();
});

test.each([
  ['EN', 'Applied rate *', 'Save', 'strictly positive applied rate'],
  ['DE', 'Angewandter Kurs *', 'Speichern', 'strikt positiven angewandten Kurs'],
])('explains the invalid rate in %s', async (language, label, save, message) => {
  localStorage.setItem('language', language);
  api.getIncome.mockResolvedValue({ data: [historicalRow(null)] });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  expect(screen.getByLabelText(label)).toHaveValue(null);
  expect(screen.getByRole('alert')).toHaveTextContent(message);
  expect(screen.getByRole('button', { name: save })).toBeDisabled();
});

test('does not backfill a historical rate when reference data arrives after opening', async () => {
  let resolveRates;
  api.getFxHistory.mockReturnValue(new Promise(resolve => { resolveRates = resolve; }));
  api.getIncome.mockResolvedValue({ data: [historicalRow(null)] });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  expect(screen.getByLabelText('Taux appliqué *')).toHaveValue(null);
  await act(async () => resolveRates({ data: [{
    source_id: 'QA-FX-A', date_taux: '2026-09-01', taux: 700, devise_base: 'CHF', devise_cible: 'CFA',
  }] }));
  expect(screen.getAllByText('700 CFA / CHF').length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Taux appliqué *')).toHaveValue(null);
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
});
