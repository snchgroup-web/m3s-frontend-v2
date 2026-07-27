import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Actifs from './Actifs';
import api from './api';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: '?tab=risques' })
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: 'EN' })
}));

jest.mock('recharts', () => ({
  Bar: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  CartesianGrid: () => null,
  Cell: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getInventory: jest.fn(),
    getRealEstateFinance: jest.fn(),
    createInventoryItem: jest.fn(),
    updateInventoryItem: jest.fn(),
    deleteInventoryItem: jest.fn()
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
  api.getInventory.mockResolvedValue({
    data: [{
      source_id: 'ART-001',
      article: 'Test equipment',
      categorie: 'Outils_Equipements',
      quantite: 1,
      valeur_chf: 50,
      valeur_cfa: 33500,
      localisation: 'Dakar, SN',
      statut: 'A Réparer',
      bu: 'ADMIN_ORG'
    }]
  });
  api.getRealEstateFinance.mockResolvedValue({ data: [] });
});

test('keeps the Risks register read-only while Inventory remains editable', async () => {
  render(<Actifs />);

  expect(await screen.findByText('Read-only monitoring register')).toBeInTheDocument();
  expect(screen.getByText(/Edit inventory items in the Inventory tab/)).toBeInTheDocument();
  expect(screen.getByText('Test equipment')).toBeInTheDocument();
  expect(screen.queryByTitle('Edit item')).not.toBeInTheDocument();
  expect(screen.queryByText('New item')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Inventory (1)' }));

  expect(screen.getByText('New item')).toBeInTheDocument();
  expect(screen.getByTitle('Edit item')).toBeInTheDocument();

  await waitFor(() => {
    expect(api.getInventory).toHaveBeenCalledWith(300, 0);
    expect(api.getRealEstateFinance).toHaveBeenCalledWith(300, 0);
  });
});
