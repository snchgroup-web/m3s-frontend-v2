import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Finance from './Finance';
import api from './api';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/finance', search: '?tab=recettes' }),
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
    getMembersDirectory: jest.fn()
  }
}));

const members = [
  { person_id: 'PER-1', display_name: 'Cheikh Ndiaye', preferred_name: 'Cheikh', team: 'TZH', active: true },
  { person_id: 'PER-2', display_name: 'Chantal Löffler', preferred_name: 'Chantal', team: 'TZH', active: true },
  { person_id: 'PER-3', display_name: 'Gnilane Diouf', preferred_name: 'Gnilane', team: 'TSN', active: true },
  { person_id: 'PER-4', display_name: 'Gnilane Ndiaye', preferred_name: 'Gnilane', team: 'TSN', active: true },
  { person_id: 'PER-5', display_name: 'Papa Amandiogou Ndiaye', preferred_name: 'Pape', team: 'TSN', active: true },
  { person_id: 'PER-6', display_name: 'Ibrahima Ndiaye', preferred_name: 'Ibou', team: 'TSN', active: true }
];

const renderFinance = () => render(
  <LanguageProvider>
    <Finance />
  </LanguageProvider>
);

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  api.getFinanceDashboard.mockResolvedValue({ success: true, data: {} });
  api.getExpenses.mockResolvedValue({ data: [] });
  api.getIncome.mockResolvedValue({ data: [] });
  api.getFxHistory.mockResolvedValue({ data: [] });
  api.getSocialFinance.mockResolvedValue({ data: [], summary: {} });
  api.getRealEstateFinance.mockResolvedValue({ data: [], summary: {} });
});

test('filters finance agents by the RH-001 team while retaining each team collective', async () => {
  api.getMembersDirectory.mockResolvedValue({ data: members });
  renderFinance();

  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  expect(await screen.findByText('Personnes proposées depuis l’annuaire sécurisé RH-001.')).toBeInTheDocument();

  const teamSelect = screen.getByRole('combobox', { name: 'Team' });
  const agentSelect = screen.getByRole('combobox', { name: 'Agent' });

  fireEvent.change(teamSelect, { target: { value: 'Team_ZH' } });
  expect(within(agentSelect).getByRole('option', { name: 'Cheikh Ndiaye' })).toBeInTheDocument();
  expect(within(agentSelect).getByRole('option', { name: 'Chantal Löffler' })).toBeInTheDocument();
  expect(within(agentSelect).getByRole('option', { name: 'Team ZH (collectif)' })).toBeInTheDocument();
  expect(within(agentSelect).queryByRole('option', { name: 'Ibrahima Ndiaye' })).not.toBeInTheDocument();

  fireEvent.change(agentSelect, { target: { value: 'Cheikh' } });
  fireEvent.change(teamSelect, { target: { value: 'Team_SN' } });
  expect(agentSelect).toHaveValue('');
  expect(within(agentSelect).getByRole('option', { name: 'Ibrahima Ndiaye (Ibou)' })).toBeInTheDocument();
  expect(within(agentSelect).getByRole('option', { name: 'Papa Amandiogou Ndiaye (Pape)' })).toBeInTheDocument();
  expect(within(agentSelect).getByRole('option', { name: 'Team SN (collectif)' })).toBeInTheDocument();
  expect(within(agentSelect).queryByRole('option', { name: 'Chantal Löffler' })).not.toBeInTheDocument();
});

test('offers only team collectives when the RH-001 directory is unavailable', async () => {
  api.getMembersDirectory.mockRejectedValue(new Error('RH-001 unavailable'));
  renderFinance();

  fireEvent.click(await screen.findByRole('button', { name: 'Nouvelle Recette' }));
  expect(await screen.findByText('Annuaire RH-001 indisponible : seuls les collectifs des équipes sont proposés.')).toBeInTheDocument();

  const teamSelect = screen.getByRole('combobox', { name: 'Team' });
  const agentSelect = screen.getByRole('combobox', { name: 'Agent' });
  fireEvent.change(teamSelect, { target: { value: 'Team_ZH' } });

  await waitFor(() => {
    const values = within(agentSelect).getAllByRole('option').map((option) => option.value);
    expect(values).toEqual(['', 'Team_ZH']);
  });
});
