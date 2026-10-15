import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import RH from './RH';
import { api } from './api';

let mockLocationSearch = '?tab=glossary';
let mockLanguage = 'EN';
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockLocationSearch }),
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: mockLanguage })
}));

jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: null, provider: 'google', ready: true, isAuthenticated: false }) }));

jest.mock('./api', () => ({
  api: {
    getMembersDirectory: jest.fn().mockResolvedValue({ data: [], total: 0 })
  }
}));

jest.mock('recharts', () => ({
  Bar: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  CartesianGrid: () => null,
  Cell: () => null,
  Legend: () => null,
  Pie: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div>{children}</div>,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null
}));

jest.mock('./MembersDirectory', () => ({ initialMemberType }) => <div data-member-type={initialMemberType || ''}>Internal directory</div>);
jest.mock('./OwnProfile', () => ({ embedded }) => <div data-testid="own-profile" data-embedded={String(embedded)}>Current account profile</div>);

beforeEach(() => {
  mockLocationSearch = '?tab=glossary';
  mockLanguage = 'EN';
  mockNavigate.mockReset();
  api.getMembersDirectory.mockReset();
  api.getMembersDirectory.mockResolvedValue({ data: [], total: 0 });
});

test('RH My account renders the shared current-account profile instead of a placeholder', async () => {
  mockLocationSearch = '?tab=myaccount';
  render(<RH/>);
  expect(await screen.findByTestId('own-profile')).toHaveAttribute('data-embedded', 'true');
  expect(screen.queryByText('Section to build')).not.toBeInTheDocument();
});

test('employee files stay off by default without replacing the local register', async () => {
  mockLocationSearch = '?tab=employes';
  render(<RH/>);
  expect(await screen.findByText('HR reading not enabled')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Local working register' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Employees', exact: true })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  for (const name of ['Personal email', 'Phone', 'Employee ID', 'Role', 'Team / Department', 'Hire Date']) {
    expect(screen.getByText(name, { selector: 'label' })).toBeInTheDocument();
  }
  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
});

test('passes the URL member type to the directory and follows route changes', async () => {
  mockLocationSearch = '?tab=directory&memberType=fondateur&returnTo=dashboard&dashboardKpi=founders';
  const view = render(<RH />);
  expect(await screen.findByText('Internal directory')).toHaveAttribute('data-member-type', 'fondateur');
  mockLocationSearch = '?tab=directory&memberType=associe&returnTo=dashboard&dashboardKpi=associates';
  view.rerender(<RH />);
  expect(screen.getByText('Internal directory')).toHaveAttribute('data-member-type', 'associe');
  mockLocationSearch = '?tab=directory';
  view.rerender(<RH />);
  expect(screen.getByText('Internal directory')).toHaveAttribute('data-member-type', '');
  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
});

test('keeps the URL and header context aligned when selecting the RH overview', async () => {
  render(<RH />);

  fireEvent.click(screen.getByRole('tab', { name: 'Overview', exact: true }));
  expect(mockNavigate).toHaveBeenCalledWith('/rh?tab=overview');
  await waitFor(() => {
    expect(screen.getByText('Members (0)')).toBeInTheDocument();
  });
});

test('opens the local Human Resources glossary from the governed child tab', async () => {
  render(<RH />);

  expect(screen.getByRole('heading', { level: 2, name: 'Human Resources Glossary' })).toBeInTheDocument();
  expect(screen.getByText('9 terms')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Members (0)')).toBeInTheDocument();
  });
});

test('shows the real RH-001 zero without fictitious staff or charts', async () => {
  mockLocationSearch = '?tab=overview';
  render(<RH />);

  await waitFor(() => {
    expect(screen.getByText('0 members confirmed by the source')).toBeInTheDocument();
  });
  expect(screen.queryByText('Jean Dupont')).not.toBeInTheDocument();
  expect(screen.queryByText('Marie Sall')).not.toBeInTheDocument();
  expect(screen.queryByText('Monthly Evolution')).not.toBeInTheDocument();
  expect(screen.getByText(/Fictitious monthly charts were removed/i)).toBeInTheDocument();
});

test('keeps an employee addition local and requires confirmation before applying it', async () => {
  mockLocationSearch = '?tab=employes';
  render(<RH />);

  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
  expect(screen.getByRole('heading', { name: 'Local working register' })).toBeInTheDocument();
  expect(screen.getByText(/neither saved to the backend/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Awa Test' } });
  fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'awa@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  expect(screen.getByRole('heading', { name: 'Confirm draft creation' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Edit draft Awa Test' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Yes, confirm' }));

  expect(screen.getByRole('status')).toHaveTextContent('No backend record was created.');
  expect(screen.getByRole('button', { name: 'Edit draft Awa Test' })).toBeInTheDocument();
  expect(screen.getByText('1 local draft')).toBeInTheDocument();
});

test('shows required-field errors inside the active draft modal', async () => {
  mockLocationSearch = '?tab=employes';
  render(<RH />);

  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));

  const dialog = screen.getByRole('dialog', { name: 'Create Employee' });
  expect(dialog).toContainElement(screen.getByRole('alert'));
  expect(screen.getByRole('alert')).toHaveTextContent(/name and email address/i);

  fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Awa Ndiaye' } });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('requires a second confirmation before deleting a local employee draft', async () => {
  mockLocationSearch = '?tab=employes';
  render(<RH />);

  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'Awa Test' } });
  fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'awa@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create' }));
  fireEvent.click(screen.getByRole('button', { name: 'Yes, confirm' }));

  fireEvent.click(screen.getByRole('button', { name: 'Delete draft Awa Test' }));
  expect(screen.getByRole('heading', { name: 'Confirm deletion' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'No, go back' }));
  expect(screen.getByRole('button', { name: 'Delete draft Awa Test' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Delete draft Awa Test' }));
  fireEvent.click(screen.getByRole('button', { name: 'Yes, confirm' }));
  expect(screen.getByRole('status')).toHaveTextContent('No official HR file was deleted.');
  expect(screen.queryByRole('button', { name: 'Delete draft Awa Test' })).not.toBeInTheDocument();
});

test('explains the local volunteer register in German', async () => {
  mockLanguage = 'DE';
  mockLocationSearch = '?tab=benevoles';
  render(<RH />);

  await waitFor(() => expect(screen.getByText('Mitglieder (0)')).toBeInTheDocument());
  expect(screen.getByRole('heading', { name: 'Lokales Arbeitsregister' })).toBeInTheDocument();
  expect(screen.getByText(/weder im Backend gespeichert/i)).toBeInTheDocument();
  expect(screen.getByText('0 lokale Entwürfe')).toBeInTheDocument();
});

const rhLocaleCases = [
  ['FR', 'Ajouter', 'Nom', 'Nom complet', 'Email', 'Email perso', 'Poste', 'ex. : Développeur', 'Team / Département', 'Rôle', 'Utilisateur', 'Statut', 'Congé', 'Créer', 'Oui, confirmer', 'Rechercher...', 'Développeur', 'Modifier le brouillon'],
  ['EN', 'Add', 'Name', 'Full name', 'Email', 'Personal email', 'Position', 'e.g. Developer', 'Team / Department', 'Role', 'User', 'Status', 'Leave', 'Create', 'Yes, confirm', 'Search...', 'Developer', 'Edit draft'],
  ['DE', 'Hinzufügen', 'Name', 'Vollständiger Name', 'E-Mail', 'Private E-Mail', 'Position', 'z. B. Entwickler', 'Team / Abteilung', 'Rolle', 'Benutzer', 'Status', 'Urlaub', 'Erstellen', 'Ja, bestätigen', 'Suchen...', 'Entwickler', 'Entwurf']
];

test.each(['employes', 'benevoles'].flatMap(tab => rhLocaleCases.map(locale => [tab, ...locale])))('localises the %s draft form and values in %s while preserving stored codes', async (tab, language, add, name, nameHint, email, personal, position, positionHint, department, role, user, status, leave, create, confirm, search, developer, edit) => {
  mockLocationSearch = `?tab=${tab}`;
  mockLanguage = language;
  render(<RH />);
  await screen.findByText({ FR: 'Membres (0)', EN: 'Members (0)', DE: 'Mitglieder (0)' }[language]);
  fireEvent.click(screen.getByRole('button', { name: add, exact: true }));
  const dialog = screen.getByRole('dialog');
  const nameField = within(dialog).getByRole('textbox', { name, exact: true });
  expect(nameField).toHaveAttribute('placeholder', nameHint);
  expect(within(dialog).getByRole('textbox', { name: personal, exact: true })).toHaveAttribute('placeholder', personal);
  expect(within(dialog).getByRole('textbox', { name: position, exact: true })).toHaveAttribute('placeholder', positionHint);
  const roleField = within(dialog).getByRole('combobox', { name: role, exact: true });
  expect(within(roleField).getByRole('option', { name: user, exact: true })).toHaveAttribute('value', 'Utilisateur');
  expect(within(roleField).getByRole('option', { name: 'Admin', exact: true })).toHaveAttribute('value', 'Admin');
  fireEvent.change(nameField, { target: { value: 'Personne-QA_Test' } });
  fireEvent.change(within(dialog).getByRole('textbox', { name: email, exact: true }), { target: { value: 'qa@example.test' } });
  fireEvent.change(within(dialog).getByRole('textbox', { name: position, exact: true }), { target: { value: 'Développeur' } });
  fireEvent.change(within(dialog).getByRole('combobox', { name: department, exact: true }), { target: { value: 'Finance' } });
  fireEvent.change(within(dialog).getByRole('combobox', { name: status, exact: true }), { target: { value: 'Congé' } });
  fireEvent.click(within(dialog).getByRole('button', { name: create, exact: true }));
  fireEvent.click(screen.getByRole('button', { name: confirm, exact: true }));
  const row = screen.getByText('Personne-QA_Test', { selector: 'td' }).closest('tr');
  expect(within(row).getByText(user, { exact: true })).toBeInTheDocument();
  expect(within(row).getByText(developer, { exact: true })).toBeInTheDocument();
  expect(within(row).getByText(leave, { exact: true })).toBeInTheDocument();
  const searchField = screen.getByPlaceholderText(search);
  for (const query of [user, 'Utilisateur', developer, 'Développeur', 'Personne-QA_Test']) {
    fireEvent.change(searchField, { target: { value: query } });
    expect(screen.getByText('Personne-QA_Test', { selector: 'td' })).toBeInTheDocument();
  }
  const editName = language === 'DE' ? `${edit} Personne-QA_Test bearbeiten` : `${edit} Personne-QA_Test`;
  fireEvent.click(screen.getByRole('button', { name: editName }));
  expect(screen.getByRole('combobox', { name: role, exact: true })).toHaveValue('Utilisateur');
  expect(screen.getByRole('combobox', { name: department, exact: true })).toHaveValue('Finance');
  expect(screen.getByRole('combobox', { name: status, exact: true })).toHaveValue('Congé');
  expect(screen.getByRole('textbox', { name: position, exact: true })).toHaveValue('Développeur');
  expect(screen.getByRole('textbox', { name, exact: true })).toHaveValue('Personne-QA_Test');
  await waitFor(() => expect(api.getMembersDirectory).toHaveBeenCalledTimes(1));
});

test('preserves draft values and navigation across a language change, including unknown text', async () => {
  mockLocationSearch = '?tab=benevoles&returnTo=dashboard';
  mockLanguage = 'EN';
  const view = render(<RH />);
  await screen.findByText('Members (0)');
  fireEvent.click(screen.getByRole('button', { name: 'Add', exact: true }));
  fireEvent.change(screen.getByRole('textbox', { name: 'Name', exact: true }), { target: { value: 'Personne-QA_Test' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Email', exact: true }), { target: { value: 'qa@example.test' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Position', exact: true }), { target: { value: 'toString' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Yes, confirm', exact: true }));
  expect(screen.getByText('toString', { selector: 'td' })).toBeInTheDocument();
  mockLanguage = 'DE';
  view.rerender(<RH />);
  expect(screen.getByRole('tab', { name: 'Freiwillige (1)', exact: true })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Benutzer', { selector: 'td' })).toBeInTheDocument();
  expect(screen.getByText('toString', { selector: 'td' })).toBeInTheDocument();
  expect(screen.getByText('Personne-QA_Test', { selector: 'td' })).toBeInTheDocument();
  expect(mockNavigate).not.toHaveBeenCalled();
  await waitFor(() => expect(api.getMembersDirectory).toHaveBeenCalledTimes(1));
});
