import React from 'react';
import { render, screen } from '@testing-library/react';
import RH from './RH';

let mockLocationSearch = '?tab=glossary';

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
});

test('opens the local Human Resources glossary from the governed child tab', () => {
  render(<RH />);

  expect(screen.getByRole('heading', { level: 2, name: 'Human Resources Glossary' })).toBeInTheDocument();
  expect(screen.getByText('9 terms')).toBeInTheDocument();
});
