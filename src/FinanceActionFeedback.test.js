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
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

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

const fxFormCopy = [
  ['FR', 'Taux & Historique', 'Ajouter Taux', 'Devise Source *', 'Devise Cible *', 'Taux *', 'Créer', 'Non', 'Oui, ajouter', 'Annuler'],
  ['EN', 'Rates & History', 'Add Exchange Rate', 'Base Currency *', 'Target Currency *', 'Rate *', 'Create', 'No', 'Yes, add', 'Cancel'],
  ['DE', 'Kurse & Verlauf', 'Wechselkurs hinzufügen', 'Basiswährung *', 'Zielwährung *', 'Wechselkurs *', 'Erstellen', 'Nein', 'Ja, hinzufügen', 'Abbrechen'],
];

test.each(fxFormCopy)('validates FX inputs inline and retains the inverse rate after declining in %s', async (language, history, add, base, target, rateLabel, create, decline, confirm, cancel) => {
  mockSearch = '?tab=fx';
  localStorage.setItem('language', language);
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: history }));
  fireEvent.click(screen.getByRole('button', { name: add }));
  const form = screen.getByRole('dialog', { name: add });
  const rate = within(form).getByLabelText(rateLabel);
  const save = within(form).getByRole('button', { name: create });
  expect(save).toBeDisabled();
  expect(rate).toHaveAttribute('aria-invalid', 'true');
  expect(rate).toHaveAttribute('aria-describedby', 'finance-fx-form-rule');
  for (const value of ['0', '-10', '']) {
    fireEvent.change(rate, { target: { value } });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
  }
  fireEvent.change(rate, { target: { value: '0.0014084507' } });
  fireEvent.change(within(form).getByLabelText(base), { target: { value: 'CFA' } });
  expect(save).toBeDisabled();
  expect(within(form).getByLabelText(target)).toHaveAttribute('aria-invalid', 'true');
  fireEvent.change(within(form).getByLabelText(target), { target: { value: 'CHF' } });
  expect(save).toBeEnabled();
  expect(rate).toHaveAttribute('step', 'any');
  expect(rate.checkValidity()).toBe(true);
  expect(screen.queryByTestId('finance-fx-form-rule')).not.toBeInTheDocument();
  fireEvent.click(save);
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: decline }));
  expect(rate).toHaveValue(0.0014084507);
  expect(within(form).getByLabelText(base)).toHaveValue('CFA');
  fireEvent.click(save);
  fireEvent.click(screen.getByRole('button', { name: confirm }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  const row = screen.getByText('Manual').closest('tr');
  expect(row).toHaveTextContent('CFA');
  expect(row).toHaveTextContent('CHF');
  expect(screen.getByText('FX-TODAY')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: add }));
  expect(screen.getByLabelText(rateLabel)).toHaveValue(null);
  expect(screen.getByRole('button', { name: create })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: cancel }));
  expect(window.alert).not.toHaveBeenCalled();
  for (const [name, method] of Object.entries(api)) if (/^(create|update|delete)/.test(name)) expect(method).not.toHaveBeenCalled();
});

test.each([0, -10, Infinity, null])('keeps the original invalid FX rate %s untouched until explicitly corrected', async rateValue => {
  mockSearch = '?tab=fx';
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'FX-INVALID', taux: rateValue, devise_base: 'CHF', devise_cible: 'CFA', date_taux: '2026-09-01', source_taux: 'QA source' }] });
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: 'Taux & Historique' }));
  const row = screen.getByText('FX-INVALID').closest('tr');
  fireEvent.click(within(row).getAllByRole('button')[0]);
  const form = screen.getByRole('dialog', { name: 'Modifier Taux' });
  expect(within(form).getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  expect(within(form).getByLabelText('Taux *')).toHaveAttribute('aria-invalid', 'true');
  fireEvent.click(within(form).getByRole('button', { name: 'Annuler' }));
  expect(row).toBeInTheDocument();
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
  expect(window.alert).not.toHaveBeenCalled();
});

test('blocks an undated FX edit until a date is chosen', async () => {
  mockSearch = '?tab=fx';
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'FX-UNDATED', taux: 695, devise_base: 'CHF', devise_cible: 'CFA', source_taux: 'QA source' }] });
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: 'Taux & Historique' }));
  fireEvent.click(within(screen.getByText('FX-UNDATED').closest('tr')).getAllByRole('button')[0]);
  const form = screen.getByRole('dialog', { name: 'Modifier Taux' });
  expect(within(screen.getByText('FX-UNDATED').closest('tr')).getAllByRole('cell')[1]).toHaveTextContent('—');
  expect(within(form).getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  fireEvent.click(within(form).getByRole('button', { name: 'Sélectionner une date' }));
  fireEvent.click(screen.getByRole('button', { name: "Aujourd'hui" }));
  expect(within(form).getByRole('button', { name: 'Enregistrer' })).toBeEnabled();
  expect(within(form).getByLabelText('Taux *')).toHaveValue(695);
  fireEvent.click(within(form).getByRole('button', { name: 'Annuler' }));
  expect(window.alert).not.toHaveBeenCalled();
});

test('never uses an undated historical FX row as today\'s applied rate', async () => {
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'FX-UNDATED', taux: 695, devise_base: 'CHF', devise_cible: 'CFA', source_taux: 'QA source' }] });
  renderFinance();
  await act(async () => {});
  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  expect(screen.getByLabelText('Taux appliqué *')).toHaveValue(null);
  expect(screen.getByText('Non disponible pour cette date')).toBeInTheDocument();
  expect(screen.getByTestId('finance-form-amount-pair')).not.toHaveTextContent('695');
});

test('keeps a dated FX edit and source unchanged until confirmation, without API writes', async () => {
  mockSearch = '?tab=fx';
  api.getFxHistory.mockResolvedValue({ data: [{ source_id: 'FX-HISTORY', taux: 695.123456, devise_base: 'CHF', devise_cible: 'CFA', date_taux: '2026-09-01', source_taux: 'QA source' }] });
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: 'Taux & Historique' }));
  const row = screen.getByText('FX-HISTORY').closest('tr');
  fireEvent.click(within(row).getAllByRole('button')[0]);
  const form = screen.getByRole('dialog', { name: 'Modifier Taux' });
  const rate = within(form).getByLabelText('Taux *');
  expect(rate).toHaveValue(695.123456);
  expect(within(form).getByRole('button', { name: /01 septembre 2026/ })).toBeInTheDocument();
  fireEvent.change(rate, { target: { value: '696.23456789' } });
  fireEvent.click(within(form).getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(rate).toHaveValue(696.23456789);
  expect(row).not.toHaveTextContent('696,23');
  expect(within(form).getByLabelText('Source')).toHaveValue('QA source');
  fireEvent.click(within(form).getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  fireEvent.click(within(row).getAllByRole('button')[0]);
  expect(screen.getByLabelText('Taux *')).toHaveValue(696.23456789);
  expect(screen.getByLabelText('Source')).toHaveValue('QA source');
  expect(api.getFxHistory).toHaveBeenCalledTimes(1);
  for (const [name, method] of Object.entries(api)) if (/^(create|update|delete)/.test(name)) expect(method).not.toHaveBeenCalled();
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

const immoHistory = overrides => ({
  source_id: 'QA-IMM-001', date_operation: '2026-09-01', designation: 'Historique fictif QA',
  montant_chf: 100, montant_cfa: 70000, taux_fx: 695,
  part_cheikh_chf: 0, remboursement_cheikh_chf: 0,
  type_operation: 'Avance', source_file: 'Import fictif QA', enrichi_genspark: true,
  ...overrides,
});

const openImmoHistory = async overrides => {
  mockSearch = '?tab=immobilier';
  useHistoricalRates();
  api.getRealEstateFinance.mockResolvedValue({ data: [immoHistory(overrides)], summary: {} });
  api.updateRealEstateFinance.mockResolvedValue({ success: true });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-IMM-001'));
};

test('preserves historical real-estate amounts, rate and provenance after a date change', async () => {
  await openImmoHistory();
  changeToSeptemberSecond();
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(695);
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.updateRealEstateFinance).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(api.updateRealEstateFinance).toHaveBeenCalledWith('QA-IMM-001', expect.objectContaining({
    date_operation: '2026-09-02', montant_chf: 100, montant_cfa: 70000, taux_fx: 695,
    part_cheikh_chf: 0, remboursement_cheikh_chf: 0, source_file: 'Import fictif QA', enrichi_genspark: true,
  })));
});

test('keeps a real zero and a missing real-estate rate instead of computing them', async () => {
  await openImmoHistory({ montant_chf: 0, montant_cfa: 100000, taux_fx: null });
  expect(screen.getByLabelText('Montant CHF')).toHaveValue(0);
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(null);
  changeToSeptemberSecond();
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(null);
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(api.updateRealEstateFinance).toHaveBeenCalledWith('QA-IMM-001', expect.objectContaining({
    montant_chf: 0, montant_cfa: 100000, taux_fx: null,
  })));
});

test.each([
  ['montant_chf', 'Montant CHF'], ['montant_cfa', 'Montant CFA'],
  ['part_cheikh_chf', 'Part Cheikh'], ['remboursement_cheikh_chf', 'Remboursement par Cheikh'],
])('blocks an incomplete historical amount: %s', async (field, label) => {
  await openImmoHistory({ [field]: null });
  const input = screen.getByLabelText(label);
  expect(input).toHaveValue(null);
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  expect(screen.getByRole('alert')).toHaveTextContent(label);
  const row = screen.getByText('QA-IMM-001').closest('tr');
  expect(row).toHaveTextContent('—');
  fireEvent.change(input, { target: { value: '0' } });
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeEnabled();
  expect(api.updateRealEstateFinance).not.toHaveBeenCalled();
});

test('does not derive a cleared real-estate rate from two recorded amounts', async () => {
  await openImmoHistory();
  const rate = screen.getByLabelText('Taux appliqué');
  fireEvent.change(rate, { target: { value: '-1' } });
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  fireEvent.change(rate, { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(api.updateRealEstateFinance).toHaveBeenCalledWith('QA-IMM-001', expect.objectContaining({
    montant_chf: 100, montant_cfa: 70000, taux_fx: null,
  })));
});

test.each([{ rows: [] }, { rows: [immoHistory()] }])('creates an operation with the existing calculation from register $rows', async ({ rows }) => {
  mockSearch = '?tab=immobilier';
  api.getRealEstateFinance.mockResolvedValue({ data: rows, summary: {} });
  api.createRealEstateFinance.mockResolvedValue({ success: true });
  renderFinance();
  await act(async () => {});
  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle opération Immo' }));
  fireEvent.change(screen.getByLabelText('Désignation'), { target: { value: 'Création fictive QA' } });
  fireEvent.change(screen.getByLabelText('Montant CHF'), { target: { value: '100' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.createRealEstateFinance).not.toHaveBeenCalled();
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Confirmer l’ajout' })).getByRole('button', { name: 'Non' }));
  expect(api.createRealEstateFinance).not.toHaveBeenCalled();
  expect(screen.getByLabelText('Désignation')).toHaveValue('Création fictive QA');
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));
  await waitFor(() => expect(api.createRealEstateFinance).toHaveBeenCalledWith(expect.objectContaining({
    montant_chf: 100, montant_cfa: 71000, taux_fx: 710,
  })));
});

test('keeps an explicit amount edit independent from the historical rate and other amounts', async () => {
  await openImmoHistory();
  fireEvent.change(screen.getByLabelText('Montant CHF'), { target: { value: '120' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(api.updateRealEstateFinance).toHaveBeenCalledWith('QA-IMM-001', expect.objectContaining({
    montant_chf: 120, montant_cfa: 70000, taux_fx: 695,
  })));
});

test('keeps an invalid historical zero rate visible and blocks saving', async () => {
  await openImmoHistory({ taux_fx: 0 });
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(0);
  expect(screen.getByLabelText('Taux appliqué')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  expect(api.updateRealEstateFinance).not.toHaveBeenCalled();
});

test.each([
  ['FR', 'Remboursement par Cheikh', 'Total remboursé par Cheikh', 'Enregistrer', 'Oui, modifier'],
  ['EN', 'Repayment from Cheikh', 'Total repayments from Cheikh', 'Save', 'Yes, update'],
  ['DE', 'Rückzahlung durch Cheikh', 'Gesamtrückzahlungen durch Cheikh', 'Speichern', 'Ja, ändern'],
])('identifies Cheikh as the payer without changing the repayment value in %s', async (language, label, total, save, confirm) => {
  localStorage.setItem('language', language);
  await openImmoHistory({ remboursement_cheikh_chf: 123.45 });
  expect(screen.getByText(total, { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: label })).toBeInTheDocument();
  expect(screen.getByLabelText(label)).toHaveValue(123.45);
  expect(screen.queryByText(/^(Reimbursement to Cheikh|Total reimbursed to Cheikh|Rückzahlung an Cheikh)$/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: save }));
  fireEvent.click(screen.getByRole('button', { name: confirm }));
  await waitFor(() => expect(api.updateRealEstateFinance).toHaveBeenCalledWith('QA-IMM-001', expect.objectContaining({
    remboursement_cheikh_chf: 123.45, montant_chf: 100, montant_cfa: 70000, taux_fx: 695,
  })));
});

const immoFormCopy = [
  ['FR', 'Nouvelle opération Immo', 'Désignation', 'Enregistrer', 'Oui, ajouter', 'Annuler', 'Renseignez une désignation et une date.', 'Enregistrement non confirmé.'],
  ['EN', 'New real estate operation', 'Description', 'Save', 'Yes, add', 'Cancel', 'Enter a description and a date.', 'Save not confirmed.'],
  ['DE', 'Neuer Immobilienvorgang', 'Bezeichnung', 'Speichern', 'Ja, hinzufügen', 'Abbrechen', 'Geben Sie eine Bezeichnung und ein Datum ein.', 'Speicherung nicht bestätigt.'],
];

test.each(immoFormCopy)('keeps required-field and failed-save feedback in the form in %s', async (language, add, designation, save, confirm, cancel, requiredMessage, saveMessage) => {
  mockSearch = '?tab=immobilier';
  localStorage.setItem('language', language);
  api.createRealEstateFinance.mockRejectedValueOnce(new Error('QA transport failure'));
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: add }));
  const input = screen.getByLabelText(designation);
  fireEvent.change(input, { target: { value: '   ' } });
  fireEvent.click(screen.getByRole('button', { name: save }));
  expect(screen.getByRole('alert')).toHaveTextContent(requiredMessage);
  expect(screen.getByRole('alert')).toHaveFocus();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(api.createRealEstateFinance).not.toHaveBeenCalled();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'Creation fictive QA' } });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(input).toHaveAttribute('aria-invalid', 'false');
  fireEvent.click(screen.getByRole('button', { name: save }));
  fireEvent.click(screen.getByRole('button', { name: confirm }));
  const error = await screen.findByRole('alert');
  expect(error).toHaveTextContent(saveMessage);
  expect(error).toHaveFocus();
  expect(input).toHaveValue('Creation fictive QA');
  expect(screen.getByRole('button', { name: save })).toBeEnabled();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(api.createRealEstateFinance).toHaveBeenCalledTimes(1);
  expect(window.alert).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: cancel }));
  fireEvent.click(screen.getByRole('button', { name: add }));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByLabelText(designation)).toHaveValue('');
});

test.each(['create', 'update'])('does not announce a successful %s when the server reports failure', async action => {
  if (action === 'update') await openImmoHistory();
  else {
    mockSearch = '?tab=immobilier';
    renderFinance();
    fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle opération Immo' }));
    fireEvent.change(screen.getByLabelText('Désignation'), { target: { value: 'Creation fictive QA' } });
  }
  const method = action === 'update' ? api.updateRealEstateFinance : api.createRealEstateFinance;
  method.mockResolvedValueOnce({ success: false });
  const reads = api.getRealEstateFinance.mock.calls.length;
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: action === 'update' ? 'Oui, modifier' : 'Oui, ajouter' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Enregistrement non confirmé.');
  expect(screen.getByLabelText('Désignation')).toBeInTheDocument();
  expect(screen.queryByText(/avec succès/)).not.toBeInTheDocument();
  expect(api.getRealEstateFinance).toHaveBeenCalledTimes(reads);
  expect(method).toHaveBeenCalledTimes(1);
});

test('preserves historical edits after rejection and requires a fresh confirmation for another attempt', async () => {
  await openImmoHistory();
  api.updateRealEstateFinance.mockRejectedValueOnce(new Error('QA rejected'));
  fireEvent.change(screen.getByLabelText('Montant CHF'), { target: { value: '120' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Enregistrement non confirmé.');
  expect(screen.getByLabelText('Montant CHF')).toHaveValue(120);
  expect(screen.getByLabelText('Montant CFA')).toHaveValue(70000);
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(695);
  expect(api.updateRealEstateFinance).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.updateRealEstateFinance).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  await waitFor(() => expect(screen.queryByLabelText('Désignation')).not.toBeInTheDocument());
  expect(api.updateRealEstateFinance).toHaveBeenCalledTimes(2);
  expect(api.updateRealEstateFinance.mock.calls[1]).toEqual(api.updateRealEstateFinance.mock.calls[0]);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('blocks a second request while the first confirmed save is pending', async () => {
  await openImmoHistory();
  let resolveSave;
  api.updateRealEstateFinance.mockReturnValueOnce(new Promise(resolve => { resolveSave = resolve; }));
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  expect(screen.getByRole('button', { name: 'Oui, modifier' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Non' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));
  expect(api.updateRealEstateFinance).toHaveBeenCalledTimes(1);
  await act(async () => resolveSave({ success: true }));
  expect(screen.queryByLabelText('Désignation')).not.toBeInTheDocument();
});

const financeActions = [
  ['recettes', 'create', 'createIncome'], ['depenses', 'create', 'createExpense'],
  ['social', 'create', 'createIncome'], ['recettes', 'update', 'updateIncome'],
  ['depenses', 'update', 'updateExpense'], ['social', 'update', 'updateIncome'],
  ['recettes', 'delete', 'deleteIncome'], ['depenses', 'delete', 'deleteExpense'],
  ['social', 'delete', 'deleteIncome'], ['immobilier', 'delete', 'deleteRealEstateFinance'],
];

test.each(['recettes', 'depenses', 'social'])('shows both currencies for the %s draft without changing the original input', async tab => {
  mockSearch = '?tab=' + tab;
  api.getSocialFinance.mockResolvedValue({ data: [], summary: { total_chf: 0, total_cfa_historique: 0 } });
  renderFinance();
  await act(async () => {});
  const add = { recettes: 'Nouvelle Recette', depenses: 'Nouvelle Dépense', social: 'Nouveau flux social' }[tab];
  fireEvent.click(screen.getByRole('button', { name: add }));
  const pair = screen.getByTestId('finance-form-amount-pair');
  const text = () => pair.textContent.replace(/\s/g, '');
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText('Taux appliqué *'), { target: { value: '705' } });
  expect(text()).toBe('100CHF≈70500CFA');
  fireEvent.change(screen.getByLabelText('Devise'), { target: { value: 'CFA' } });
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '70500' } });
  expect(text()).toBe('100CHF≈70500CFA');
  fireEvent.change(screen.getByLabelText('Taux appliqué *'), { target: { value: '' } });
  expect(text()).toBe('—CHF≈70500CFA');
  expect(screen.getByPlaceholderText('Montant')).toHaveValue(70500);
  expect(api.createIncome).not.toHaveBeenCalled();
  expect(api.createExpense).not.toHaveBeenCalled();
});

test('keeps recorded immo currencies distinct while translating the repayment at its historical rate', async () => {
  await openImmoHistory({ montant_chf: 100, montant_cfa: 70000, taux_fx: 695, part_cheikh_chf: 10, remboursement_cheikh_chf: 20 });
  expect(screen.getByTestId('immo-form-amount-pair').textContent.replace(/\s/g, '')).toBe('100CHF70000CFA');
  expect(screen.getByTestId('immo-form-share-pair').textContent.replace(/\s/g, '')).toBe('10CHF≈6950CFA');
  expect(screen.getByTestId('immo-form-repayment-pair').textContent.replace(/\s/g, '')).toBe('20CHF≈13900CFA');
  changeToSeptemberSecond();
  expect(screen.getByTestId('immo-form-repayment-pair').textContent.replace(/\s/g, '')).toBe('20CHF≈13900CFA');
  expect(screen.getByLabelText('Taux appliqué')).toHaveValue(695);
  expect(api.updateRealEstateFinance).not.toHaveBeenCalled();
});

test('does not fill a missing recorded immo currency from its rate', async () => {
  await openImmoHistory({ montant_cfa: null, taux_fx: 700 });
  expect(screen.getByTestId('immo-form-amount-pair').textContent.replace(/\s/g, '')).toBe('100CHF—CFA');
  expect(screen.getByLabelText('Montant CFA')).toHaveValue(null);
  expect(api.updateRealEstateFinance).not.toHaveBeenCalled();
});

test('previews a new immo counterpart without writing into the amount fields', async () => {
  mockSearch = '?tab=immobilier';
  renderFinance();
  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle opération Immo' }));
  fireEvent.change(screen.getByLabelText('Montant CHF'), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText('Taux appliqué'), { target: { value: '705' } });
  expect(screen.getByTestId('immo-form-amount-pair').textContent.replace(/\s/g, '')).toBe('100CHF≈70500CFA');
  expect(screen.getByLabelText('Montant CFA')).toHaveValue(null);
  expect(api.createRealEstateFinance).not.toHaveBeenCalled();
});

test.each(['recettes', 'depenses', 'social'])('keeps %s required-field feedback in the form and preserves the draft on decline', async tab => {
  mockSearch = '?tab=' + tab;
  renderFinance();
  await act(async () => {});
  const add = { recettes: 'Nouvelle Recette', depenses: 'Nouvelle Dépense', social: 'Nouveau flux social' }[tab];
  fireEvent.click(screen.getByRole('button', { name: add }));
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: '   ' } });
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '125.5' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent('Renseignez une description, une date et un montant numérique');
  expect(screen.getByRole('alert')).toHaveFocus();
  expect(screen.getByPlaceholderText('Description')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByPlaceholderText('Montant')).toHaveValue(125.5);
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Brouillon fictif QA' } });
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));
  expect(screen.getByRole('alert')).toHaveFocus();
  expect(screen.getByPlaceholderText('Montant')).toHaveAttribute('aria-invalid', 'true');
  expect(window.alert).not.toHaveBeenCalled();
  expect(api.createIncome).not.toHaveBeenCalled();
  expect(api.createExpense).not.toHaveBeenCalled();
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '125.5' } });
  fireEvent.change(screen.getByLabelText('Taux appliqué *'), { target: { value: '705' } });
  fireEvent.change(screen.getByLabelText('Team'), { target: { value: 'Team_ZH' } });
  fireEvent.change(screen.getByLabelText('Agent'), { target: { value: 'Team_ZH' } });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(screen.getByPlaceholderText('Description')).toHaveValue('Brouillon fictif QA');
  expect(screen.getByPlaceholderText('Montant')).toHaveValue(125.5);
  expect(screen.getByLabelText('Taux appliqué *')).toHaveValue(705);
  expect(screen.getByLabelText('Agent')).toHaveValue('Team_ZH');
  expect(api.createIncome).not.toHaveBeenCalled();
  expect(api.createExpense).not.toHaveBeenCalled();
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' }));
  fireEvent.click(screen.getByRole('button', { name: add }));
  expect(screen.queryByText(/Renseignez une description, une date/)).not.toBeInTheDocument();
  expect(screen.getByPlaceholderText('Description')).toHaveValue('');
});

test.each([
  ['FR', 'Nouvelle Recette', 'Créer', 'Renseignez une description, une date et un montant numérique'],
  ['EN', 'New Revenue', 'Create', 'Enter a description, a date and a numeric amount'],
  ['DE', 'Neue Einnahme', 'Erstellen', 'Geben Sie eine Beschreibung, ein Datum und einen numerischen Betrag ein'],
])('translates required-field feedback in %s without a browser alert', async (language, add, create, message) => {
  localStorage.setItem('language', language);
  renderFinance();
  await act(async () => {});
  fireEvent.click(screen.getByRole('button', { name: add }));
  fireEvent.click(screen.getByRole('button', { name: create }));
  expect(screen.getByRole('alert')).toHaveTextContent(message);
  expect(screen.getByRole('alert')).toHaveFocus();
  expect(window.alert).not.toHaveBeenCalled();
});

test.each([0, -25.5])('does not mistake the recorded amount %s for a missing entry', async amount => {
  api.getIncome.mockResolvedValue({ data: [{ ...historicalRow(700), montant_origine: amount, devise_origine: 'CHF' }] });
  renderFinance();
  fireEvent.click(await screen.findByText('QA-FX-001'));
  expect(screen.getByPlaceholderText('Montant')).toHaveValue(amount);
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(screen.getByRole('dialog', { name: 'Confirmer la modification' })).toBeInTheDocument();
  expect(window.alert).not.toHaveBeenCalled();
  expect(api.updateIncome).not.toHaveBeenCalled();
});

test.each([false, true])('keeps an empty social register usable with explicit totals=%s', async hasTotals => {
  mockSearch = '?tab=social';
  api.getSocialFinance.mockResolvedValue({ data: [], summary: hasTotals ? { total_chf: 0, total_cfa_historique: 0 } : {} });
  renderFinance();
  expect(await screen.findByRole('button', { name: 'Nouveau flux social' })).toBeInTheDocument();
  await act(async () => {});
  const cardFor = label => screen.getAllByText(label, { exact: true }).find(node => node.tagName === 'P').parentElement;
  expect(cardFor('SOCIAL - Flux reclassés')).toHaveTextContent(hasTotals ? /0[.,]00 CHF/ : '— CHF');
  expect(cardFor('CFA historiques enregistrés')).toHaveTextContent(hasTotals ? '0 CFA' : '— CFA');
  fireEvent.click(screen.getByRole('button', { name: 'Nouveau flux social' }));
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  expect(api.createIncome).not.toHaveBeenCalled();
});

test.each(['recettes', 'depenses', 'social', 'immobilier'])('keeps keyboard delete separate from opening the %s row', async tab => {
  mockSearch = '?tab=' + tab;
  const row = { ...historicalRow(700), source_id: 'QA-KEY-001' };
  api.getIncome.mockResolvedValue({ data: [row] });
  api.getExpenses.mockResolvedValue({ data: [row] });
  api.getSocialFinance.mockResolvedValue({ data: [row], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [immoHistory({ source_id: 'QA-KEY-001' })], summary: {} });
  renderFinance();
  const sourceRow = (await screen.findByText('QA-KEY-001')).closest('tr');
  const remove = sourceRow.querySelector('svg.lucide-trash-2').closest('button');
  expect(remove).toHaveAccessibleName('Supprimer : QA-KEY-001');
  expect(remove).toHaveAttribute('title', 'Supprimer');
  expect(remove).toHaveAttribute('type', 'button');
  const edit = within(sourceRow).getByRole('button', { name: 'Modifier : QA-KEY-001' });
  expect(edit).toHaveAttribute('title', 'Modifier');
  const hasEditor = () => tab === 'immobilier'
    ? screen.queryByLabelText('Désignation')
    : screen.queryByPlaceholderText('Description');
  fireEvent.keyDown(remove, { key: 'Enter', code: 'Enter' });
  expect(hasEditor()).not.toBeInTheDocument();
  fireEvent.click(remove);
  expect(screen.getByRole('dialog', { name: 'Confirmer la suppression' })).toBeInTheDocument();
  expect(hasEditor()).not.toBeInTheDocument();
  expect(api.deleteIncome).not.toHaveBeenCalled();
  expect(api.deleteExpense).not.toHaveBeenCalled();
  expect(api.deleteRealEstateFinance).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(sourceRow).toBeInTheDocument();
  expect(hasEditor()).not.toBeInTheDocument();
  fireEvent.keyDown(sourceRow, { key: 'Enter', code: 'Enter' });
  expect(hasEditor()).toBeInTheDocument();
});

test.each(financeActions.flatMap(([tab, action, method]) => ['network', 'explicit'].map(failure => ({ tab, action, method, failure }))))(
  'preserves $tab after $action $failure failure and requires a fresh confirmation',
  async ({ tab, action, method, failure }) => {
    mockSearch = '?tab=' + tab;
    useHistoricalRates();
    const row = { ...historicalRow(700), source_id: 'QA-ACTION-001' };
    api.getIncome.mockResolvedValue({ data: [row] });
    api.getExpenses.mockResolvedValue({ data: [row] });
    api.getSocialFinance.mockResolvedValue({ data: [row], summary: {} });
    api.getRealEstateFinance.mockResolvedValue({ data: [immoHistory({ source_id: 'QA-ACTION-001' })], summary: {} });
    api[method].mockResolvedValue({ success: true });
    if (failure === 'network') api[method].mockRejectedValueOnce(new Error('Private server detail QA'));
    else api[method].mockResolvedValueOnce({ success: false });
    renderFinance();
    const sourceRow = (await screen.findByText('QA-ACTION-001')).closest('tr');
    const deleteButton = action === 'delete' ? sourceRow.querySelector('svg.lucide-trash-2').closest('button') : null;
    if (action === 'create') {
      const add = { recettes: 'Nouvelle Recette', depenses: 'Nouvelle Dépense', social: 'Nouveau flux social' }[tab];
      fireEvent.click(screen.getByRole('button', { name: add }));
      fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Action fictive QA' } });
      fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '100' } });
    } else if (action === 'update') fireEvent.click(screen.getByText('QA-ACTION-001'));
    const trigger = () => fireEvent.click(action === 'delete' ? deleteButton : screen.getByRole('button', { name: action === 'create' ? 'Créer' : 'Enregistrer' }));
    const confirmLabel = { create: 'Oui, ajouter', update: 'Oui, modifier', delete: 'Oui, supprimer' }[action];
    const reads = [api.getIncome, api.getExpenses, api.getSocialFinance, api.getRealEstateFinance].map(fn => fn.mock.calls.length);
    const draftValues = () => action === 'delete' ? null : [
      screen.getByPlaceholderText('Montant').value,
      screen.getByLabelText('Taux appliqué *').value,
      screen.getByLabelText('Team').value,
      screen.getByLabelText('Agent').value,
    ];
    const draft = draftValues();
    trigger();
    expect(api[method]).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: confirmLabel }));
    const errorDialog = await screen.findByRole('dialog', { name: 'Action non confirmée' });
    expect(within(errorDialog).getByRole('alert')).toHaveFocus();
    expect(within(errorDialog).getAllByRole('button')).toHaveLength(1);
    expect(within(errorDialog).queryByRole('button', { name: confirmLabel })).not.toBeInTheDocument();
    expect(errorDialog).not.toHaveTextContent('Private server detail QA');
    expect(screen.queryByText(/avec succès/)).not.toBeInTheDocument();
    expect(sourceRow).toBeInTheDocument();
    expect([api.getIncome, api.getExpenses, api.getSocialFinance, api.getRealEstateFinance].map(fn => fn.mock.calls.length)).toEqual(reads);
    expect(api[method]).toHaveBeenCalledTimes(1);
    expect(window.alert).not.toHaveBeenCalled();
    fireEvent.click(within(errorDialog).getByRole('button', { name: 'Fermer' }));
    expect(draftValues()).toEqual(draft);
    if (action !== 'delete') expect(screen.getByPlaceholderText('Description')).toHaveValue(action === 'create' ? 'Action fictive QA' : row.description);
    trigger();
    expect(api[method]).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: confirmLabel }));
    await screen.findByText(/avec succès/);
    expect(api[method]).toHaveBeenCalledTimes(2);
    expect(api[method].mock.calls[1]).toEqual(api[method].mock.calls[0]);
    expect(screen.queryByRole('dialog', { name: 'Action non confirmée' })).not.toBeInTheDocument();
  }
);
