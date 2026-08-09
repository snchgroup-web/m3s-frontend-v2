import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

jest.mock('./MembersDirectory', () => () => <div>Internal directory</div>);

beforeEach(() => {
  mockLocationSearch = '?tab=glossary';
  mockLanguage = 'EN';
  mockNavigate.mockReset();
  api.getMembersDirectory.mockReset();
  api.getMembersDirectory.mockResolvedValue({ data: [], total: 0 });
});

test('keeps the URL and header context aligned when selecting the RH overview', async () => {
  render(<RH />);

  fireEvent.click(screen.getByRole('button', { name: 'Overview', exact: true }));
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
  fireEvent.change(screen.getByPlaceholderText('Nom complet'), { target: { value: 'Awa Test' } });
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

  fireEvent.change(screen.getByPlaceholderText('Nom complet'), { target: { value: 'Awa Ndiaye' } });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('requires a second confirmation before deleting a local employee draft', async () => {
  mockLocationSearch = '?tab=employes';
  render(<RH />);

  await waitFor(() => expect(screen.getByText('Members (0)')).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  fireEvent.change(screen.getByPlaceholderText('Nom complet'), { target: { value: 'Awa Test' } });
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
