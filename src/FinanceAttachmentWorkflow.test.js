import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Finance from './Finance';
import api from './api';
import { saveExpenseAttachment } from './ExpenseDocumentPicker';

let mockTab = 'depenses';
jest.mock('react-router-dom', () => ({ useLocation: () => ({ pathname: '/finance', search: `?tab=${mockTab}` }), useNavigate: () => jest.fn() }), { virtual: true });
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: 'FR' }) }));
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div>{children}</div>, Line: () => null,
  BarChart: ({ children }) => <div>{children}</div>, Bar: () => null,
  LabelList: () => null, XAxis: () => null, YAxis: () => null,
  CartesianGrid: () => null, Tooltip: () => null, Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));
jest.mock('./ExpenseDocumentPicker', () => ({
  __esModule: true,
  default: ({ onChange, onReadyChange }) => <button onClick={() => {
    onChange({ record: { id: 'a'.repeat(64), rootId: 'a'.repeat(64) }, documentRole: 'invoice' });
    onReadyChange(true);
  }}>Synthetic document selection</button>,
  saveExpenseAttachment: jest.fn()
}));
jest.mock('./api', () => ({ __esModule: true, default: {
  getFinanceDashboard: jest.fn(), getExpenses: jest.fn(), getIncome: jest.fn(), getFxHistory: jest.fn(),
  getSocialFinance: jest.fn(), getRealEstateFinance: jest.fn(), createExpense: jest.fn(), createIncome: jest.fn()
} }));
beforeEach(() => {
  jest.clearAllMocks();
  mockTab = 'depenses';
  api.getFinanceDashboard.mockResolvedValue({ data: { total_income_count: 0, total_income: 0, total_income_cfa: 0, total_expense_count: 0, total_expenses: 0, total_expenses_cfa: 0 } });
  api.getExpenses.mockResolvedValue({ capabilities: { expense_amount_contract: 2 }, data: [] });
  api.getIncome.mockResolvedValue({ capabilities: { income_amount_contract: 2 }, data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
  api.createExpense.mockResolvedValue({ success: true, data: { id: 'DEP-SYNTHETIC-CREATED' } });
  api.createIncome.mockResolvedValue({ success: true, data: { id: 'REC-SYNTHETIC-CREATED' } });
  saveExpenseAttachment.mockResolvedValue({ success: true });
});
async function create(income = false) {
  mockTab = income ? 'recettes' : 'depenses';
  render(<Finance/>);
  await screen.findByText('Totaux globaux disponibles');
  fireEvent.click(screen.getByRole('button', { name: income ? 'Nouvelle Recette' : 'Nouvelle Dépense' }));
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Synthetic expense and invoice' } });
  fireEvent.change(screen.getByLabelText(income ? 'Total reçu *' : 'Total payé *'), { target: { value: '5' } });
  fireEvent.click(screen.getByText('Synthetic document selection'));
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));
}
test('attaches only to the confirmed server expense ID, separately from the monetary payload', async () => {
  await create();
  await waitFor(() => expect(saveExpenseAttachment).toHaveBeenCalledWith('DEP-SYNTHETIC-CREATED', expect.objectContaining({ documentRole: 'invoice' }), {}));
  expect(api.createExpense).toHaveBeenCalledTimes(1);
  expect(api.createExpense.mock.calls[0][0]).not.toHaveProperty('attachment');
  expect(screen.queryByText('Synthetic document selection')).not.toBeInTheDocument();
});

test('income attachment retry keeps its namespace and never recreates a receipt', async () => {
  saveExpenseAttachment.mockRejectedValueOnce(new Error('Synthetic temporary failure'));
  await create(true);
  const retry = await screen.findByRole('button', { name: 'Réessayer uniquement le rattachement' });
  expect(screen.getByText(/Recette enregistrée ; rattachement/)).toHaveTextContent('REC-SYNTHETIC-CREATED');
  fireEvent.click(retry);
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Réessayer uniquement le rattachement' })).not.toBeInTheDocument());
  expect(api.createIncome).toHaveBeenCalledTimes(1);
  expect(api.createExpense).not.toHaveBeenCalled();
  expect(api.createIncome.mock.calls[0][0].source_amounts).toMatchObject({ original_currency: 'CHF', total_received: '5' });
  expect(saveExpenseAttachment).toHaveBeenLastCalledWith('REC-SYNTHETIC-CREATED', expect.any(Object), { kind: 'income' });
});
test('a failed attachment can be retried without recreating the expense', async () => {
  saveExpenseAttachment.mockRejectedValueOnce(new Error('Synthetic temporary failure'));
  await create();
  const retry = await screen.findByRole('button', { name: 'Réessayer uniquement le rattachement' });
  expect(screen.getByText(/Dépense enregistrée ; rattachement/)).toHaveTextContent('DEP-SYNTHETIC-CREATED');
  fireEvent.click(retry);
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Réessayer uniquement le rattachement' })).not.toBeInTheDocument());
  expect(api.createExpense).toHaveBeenCalledTimes(1);
  expect(saveExpenseAttachment).toHaveBeenCalledTimes(2);
});
test('missing saved ID does not attach to a guessed expense or leave the create form open', async () => {
  api.createExpense.mockResolvedValue({ success: true });
  await create();
  await screen.findByText(/Dépense enregistrée ; rattachement/);
  expect(saveExpenseAttachment).not.toHaveBeenCalled();
  expect(screen.queryByRole('button', { name: 'Créer' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Réessayer uniquement le rattachement' })).not.toBeInTheDocument();
});
