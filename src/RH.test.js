import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RH from './RH';
import { api } from './api';

let mockLocationSearch = '?tab=glossary';
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: mockLocationSearch }),
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: 'EN' })
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
