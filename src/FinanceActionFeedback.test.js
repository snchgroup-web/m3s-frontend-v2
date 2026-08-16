import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

let mockSearch = '?tab=recettes';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch })
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

  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Cotisation pilote' } });
  fireEvent.change(screen.getByPlaceholderText('Montant'), { target: { value: '100' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));

  expect(screen.getByRole('dialog', { name: 'Confirmer l’ajout' })).toHaveTextContent('Cotisation pilote');
  expect(api.createIncome).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  await waitFor(() => expect(api.createIncome).toHaveBeenCalledTimes(1));
  expect(await screen.findByText('« Cotisation pilote » a été enregistrée avec succès.')).toBeInTheDocument();
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
