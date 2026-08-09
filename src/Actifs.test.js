import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Actifs from './Actifs';
import api from './api';

let mockLocationSearch = '?tab=risques';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockLocationSearch })
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
  mockLocationSearch = '?tab=risques';
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

test('connects the Stock & Assets business frame to the overview', async () => {
  render(<Actifs />);

  await screen.findByText('Read-only monitoring register');
  fireEvent.click(screen.getByRole('button', { name: 'Overview' }));

  expect(screen.getByRole('heading', { name: 'Know what 2SG owns, where it is and which control applies' })).toBeInTheDocument();
  expect(screen.getByText(/does not replace accounting, legal title/)).toBeInTheDocument();
});

test('opens the local Stock & Assets glossary from the governed child tab', async () => {
  mockLocationSearch = '?tab=glossary';
  render(<Actifs />);

  expect(await screen.findByRole('heading', { level: 2, name: 'Stock & Assets Glossary' })).toBeInTheDocument();
  expect(screen.getByText('9 terms')).toBeInTheDocument();
});
