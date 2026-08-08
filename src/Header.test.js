import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from './Header';
import api from './api';

const mockNavigate = jest.fn();
const mockSetLanguage = jest.fn();
const mockSetTheme = jest.fn();
const mockLogout = jest.fn();
let mockLanguage = 'FR';
let mockIsDarkMode = true;

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/', search: '' }),
  useNavigate: () => mockNavigate
}), { virtual: true });

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: mockLanguage, setLanguage: mockSetLanguage })
}));

jest.mock('./ThemeContext', () => ({
  useTheme: () => ({ isDarkMode: mockIsDarkMode, setTheme: mockSetTheme })
}));

jest.mock('./AuthContext', () => ({
  useAuth: () => ({ user: { name: 'Cheikh', role: 'Manager' }, logout: mockLogout })
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: { getFxHistory: jest.fn() }
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockLanguage = 'FR';
  mockIsDarkMode = true;
  api.getFxHistory.mockReturnValue(new Promise(() => {}));
});

test('groups theme and language choices in one display settings panel', async () => {
  render(<Header onOpenMenu={jest.fn()} />);

  expect(screen.queryByRole('dialog', { name: 'Paramètres d’affichage' })).not.toBeInTheDocument();
  const trigger = screen.getByRole('button', { name: 'Paramètres d’affichage' });
  expect(trigger.querySelector('.lucide-settings')).toBeInTheDocument();
  fireEvent.click(trigger);

  const panel = screen.getByRole('dialog', { name: 'Paramètres d’affichage' });
  expect(panel).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sombre/ })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'FR' })).toHaveAttribute('aria-pressed', 'true');

  fireEvent.click(screen.getByRole('button', { name: /Clair/ }));
  expect(mockSetTheme).toHaveBeenCalledWith('light');
  expect(screen.queryByRole('dialog', { name: 'Paramètres d’affichage' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();

  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  expect(mockSetLanguage).toHaveBeenCalledWith('EN');
  expect(screen.queryByRole('dialog', { name: 'Paramètres d’affichage' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();

  await waitFor(() => expect(api.getFxHistory).toHaveBeenCalledTimes(1));
});

test('closes display settings with Escape and restores trigger focus', () => {
  render(<Header onOpenMenu={jest.fn()} />);

  const trigger = screen.getByRole('button', { name: 'Paramètres d’affichage' });
  fireEvent.click(trigger);
  fireEvent.keyDown(document, { key: 'Escape' });

  expect(screen.queryByRole('dialog', { name: 'Paramètres d’affichage' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('closes display settings when the active language is selected again', () => {
  render(<Header onOpenMenu={jest.fn()} />);

  const trigger = screen.getByRole('button', { name: 'Paramètres d’affichage' });
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('button', { name: 'FR' }));

  expect(mockSetLanguage).toHaveBeenCalledWith('FR');
  expect(screen.queryByRole('dialog', { name: 'Paramètres d’affichage' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
