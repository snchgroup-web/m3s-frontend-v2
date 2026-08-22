import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import Production from './Production';
import { api } from './api';

let mockSearch = '';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockSearch }),
  useNavigate: () => jest.fn()
}), { virtual: true });

jest.mock('recharts', () => ({
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));

jest.mock('./api', () => ({
  api: {
    getExpenses: jest.fn(),
    getInventory: jest.fn()
  }
}));

const renderProduction = (tab, language = 'EN', { expenses = [], inventory = [] } = {}) => {
  mockSearch = `?tab=${tab}`;
  localStorage.setItem('language', language);
  api.getExpenses.mockResolvedValue({ data: expenses });
  api.getInventory.mockResolvedValue({ data: inventory });

  return render(
    <LanguageProvider>
      <Production />
    </LanguageProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('renders the orders pilot as read only', async () => {
  renderProduction('commandes');

  expect(await screen.findByRole('heading', { name: 'Local Production pilot' })).toBeInTheDocument();
  expect(screen.getByText('Read only')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'New Order' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
  screen.getAllByRole('button', { name: 'Edit' }).forEach(button => expect(button).toBeDisabled());
  screen.getAllByRole('button', { name: 'Delete' }).forEach(button => expect(button).toBeDisabled());
});

test('renders the operational stock pilot without write actions', async () => {
  renderProduction('stocks');

  expect(await screen.findByText('Source: M3S local pilot')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Add Stock' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
});

test('identifies manufacturing as the next read-only production sub-lot', async () => {
  renderProduction('manufacturing');

  expect(await screen.findByRole('heading', { name: 'Manufacturing' })).toBeInTheDocument();
  expect(screen.getByText('Next sub-lot')).toBeInTheDocument();
  expect(screen.getByText('Manufacturing orders')).toBeInTheDocument();
  expect(screen.getByText('Quality and deadlines')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Create' })).not.toBeInTheDocument();
});

test('keeps the connected suppliers register available separately', async () => {
  renderProduction('fournisseurs');

  expect(await screen.findByText('Supplier register consolidated from Expenses and Stock & Assets.')).toBeInTheDocument();
  expect(api.getExpenses).toHaveBeenCalledWith(500, 0);
  expect(api.getInventory).toHaveBeenCalledWith(500, 0);
});

test('uses the governed team list when preparing a supplier', async () => {
  renderProduction('fournisseurs', 'FR');

  fireEvent.click(await screen.findByRole('button', { name: 'Préparer fournisseur' }));

  const teamSelect = screen.getByRole('combobox', { name: 'Team' });
  expect(teamSelect).toHaveValue('Team_ZH');
  expect(screen.getByRole('option', { name: 'TZH - Team Zurich' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'TSN - Team Sénégal' })).toBeInTheDocument();

  fireEvent.change(teamSelect, { target: { value: 'Team_SN' } });

  expect(teamSelect).toHaveValue('Team_SN');
  expect(screen.getByRole('combobox', { name: 'Agent' })).toHaveValue('');
  expect(screen.getByRole('option', { name: 'Papa Amandiogou Ndiaye (Pape)' })).toBeInTheDocument();

  fireEvent.change(screen.getByRole('textbox', { name: /Nom du fournisseur/ }), { target: { value: 'Fournisseur test' } });
  fireEvent.change(screen.getByRole('textbox', { name: /Email/ }), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Créer' }));

  expect(await screen.findByText('Fournisseur test')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Modifier' }));

  expect(screen.getByRole('combobox', { name: 'Team' })).toHaveValue('Team_SN');
});

test('opens one editable supplier sheet and offers individual or collective agents by team', async () => {
  renderProduction('fournisseurs', 'FR', {
    expenses: [
      { fournisseur: 'Apleona Real Estate AG', team: 'Team ZH', agent: 'Chantal', montant_chf: 100 },
      { fournisseur: 'Apleona Real Estate AG', team: 'TZH', agent: 'Team ZH', montant_chf: 50 }
    ]
  });

  fireEvent.click(await screen.findByText('Apleona Real Estate AG'));

  const dialog = screen.getByRole('dialog');
  expect(screen.queryByTitle('Voir')).not.toBeInTheDocument();
  expect(within(dialog).getByRole('heading', { name: 'Apleona Real Estate AG' })).toBeInTheDocument();
  expect(within(dialog).getByText('Données sources en lecture seule')).toBeInTheDocument();
  expect(within(dialog).getByText('Champs modifiables')).toBeInTheDocument();
  const teamSelect = within(dialog).getByRole('combobox', { name: 'Team' });
  const agentSelect = within(dialog).getByRole('combobox', { name: 'Agent' });
  expect(teamSelect).toHaveValue('Team_ZH');
  expect(agentSelect).toHaveValue('Chantal');
  expect(within(dialog).getByRole('option', { name: 'Cheikh Ndiaye' })).toBeInTheDocument();
  expect(within(dialog).getByRole('option', { name: 'Chantal Löffler' })).toBeInTheDocument();
  expect(within(dialog).getByRole('option', { name: 'Team ZH (collectif)' })).toBeInTheDocument();

  fireEvent.change(teamSelect, { target: { value: 'Team_SN' } });

  expect(agentSelect).toHaveValue('');
  expect(within(dialog).getByRole('option', { name: 'Non attribué' })).toBeInTheDocument();
  expect(within(dialog).queryByRole('option', { name: 'Chantal Löffler' })).not.toBeInTheDocument();
  expect(within(dialog).getByRole('option', { name: 'Papa Amandiogou Ndiaye (Pape)' })).toBeInTheDocument();
  expect(within(dialog).getByRole('option', { name: 'Ibrahima Ndiaye (Ibou)' })).toBeInTheDocument();
  expect(within(dialog).getByRole('option', { name: 'Team SN (collectif)' })).toBeInTheDocument();

  fireEvent.change(agentSelect, { target: { value: 'Team_SN' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Modifier' }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getAllByText('TSN - Team Sénégal').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Team SN (collectif)').length).toBeGreaterThan(0);
});

test('preserves an unknown historical agent instead of inventing an individual assignment', async () => {
  renderProduction('fournisseurs', 'FR', {
    expenses: [{ fournisseur: 'Fournisseur historique', team: 'TZH', agent: 'Agent historique', montant_chf: 25 }]
  });

  fireEvent.click(await screen.findByText('Fournisseur historique'));

  expect(screen.getByRole('combobox', { name: 'Agent' })).toHaveValue('Agent historique');
  expect(screen.getByRole('option', { name: 'Agent historique (valeur historique)' })).toBeInTheDocument();
});

test('flags an incompatible Team-Agent source without displaying or reusing the impossible assignment', async () => {
  renderProduction('fournisseurs', 'FR', {
    expenses: [{
      fournisseur: 'Fazza Design Inc., Adama Archit.',
      team: 'TSN',
      agent: 'Team ZH',
      category: 'Chantier, Formalités',
      departement: 'Finances',
      pays: 'SN',
      date_operation: { value: '2026-08-21' },
      montant_chf: 88099
    }]
  });

  fireEvent.click(await screen.findByText('Fazza Design Inc., Adama Archit.'));

  expect(screen.getByText('Source incohérente : affectation à qualifier')).toBeInTheDocument();
  expect(screen.getAllByText('À qualifier').length).toBeGreaterThan(0);
  expect(screen.queryByText('Team ZH (collectif)')).not.toBeInTheDocument();
  expect(screen.getAllByText('Chantier, Formalités').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Finances').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Sénégal').length).toBeGreaterThan(0);
  expect(screen.getAllByText('21.08.2026').length).toBeGreaterThan(0);
  expect(screen.queryByText(/\[object Object\]/)).not.toBeInTheDocument();

  expect(screen.getByRole('combobox', { name: 'Team' })).toHaveValue('Team_SN');
  expect(screen.getByRole('combobox', { name: 'Agent' })).toHaveValue('');
  expect(screen.getByRole('combobox', { name: 'Département' })).toHaveValue('Finances');
  expect(screen.getByRole('combobox', { name: 'Pays' })).toHaveValue('Sénégal');
  expect(screen.queryByRole('option', { name: /Team ZH/ })).not.toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Team SN (collectif)' })).toBeInTheDocument();
});

test('offers supplier deletion from the row and the unified form with confirmation', async () => {
  const confirm = jest.spyOn(window, 'confirm').mockReturnValue(true);
  renderProduction('fournisseurs', 'FR', {
    expenses: [{ fournisseur: 'Fournisseur à supprimer', team: 'TZH', agent: 'Team ZH', montant_chf: 50 }]
  });

  fireEvent.click(await screen.findByText('Fournisseur à supprimer'));
  expect(screen.getAllByTitle('Supprimer')).toHaveLength(1);
  fireEvent.click(screen.getByText('Supprimer', { selector: 'button' }));

  expect(confirm).toHaveBeenCalledWith('Supprimer ce fournisseur du registre local ?');
  expect(screen.queryByText('Fournisseur à supprimer')).not.toBeInTheDocument();
  confirm.mockRestore();
});

test('scrolls to the Production content when a child tab changes', async () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
  renderProduction('overview', 'FR');

  fireEvent.click(screen.getByRole('tab', { name: 'Fournisseurs' }));

  await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' }));
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});

test('marks a detail tab so its content is visually prioritised on mobile', async () => {
  const { container } = renderProduction('architecture', 'FR');

  expect(await screen.findByRole('heading', { name: 'Architecture & relations Production' })).toBeInTheDocument();
  const stack = container.querySelector('.production-content-stack');
  expect(stack).toHaveClass('production-content-stack--detail');
  expect(stack.querySelector('.production-active-view')).toContainElement(
    screen.getByRole('heading', { name: 'Architecture & relations Production' })
  );
  expect(stack.querySelector('.production-pilot-summary')).toBeInTheDocument();
  expect(stack.querySelector('.production-kpi-summary')).toBeInTheDocument();
});

test('renders the local Production glossary from the governed tab', async () => {
  renderProduction('glossary', 'FR');

  expect(await screen.findByRole('heading', { level: 2, name: 'Glossaire Production' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=PROD-COMMANDE-CLIENT&returnTo=production-glossary'
  );
});
