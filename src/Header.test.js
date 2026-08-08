import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from './Header';
import api from './api';

const mockNavigate = jest.fn();
const mockSetLanguage = jest.fn();
const mockSetTheme = jest.fn();
const mockLogout = jest.fn();
let mockLanguage = 'FR';
let mockIsDarkMode = true;
let mockUser = { name: 'Cheikh', role: 'Manager' };

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
  useAuth: () => ({ user: mockUser, logout: mockLogout })
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: { getFxHistory: jest.fn() }
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockLanguage = 'FR';
  mockIsDarkMode = true;
  mockUser = { name: 'Cheikh', role: 'Manager' };
  sessionStorage.clear();
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

test('shows the 2SG loading state only while a different language is applied', () => {
  jest.useFakeTimers();
  render(<Header onOpenMenu={jest.fn()} />);

  fireEvent.click(screen.getByRole('button', { name: 'Paramètres d’affichage' }));
  fireEvent.click(screen.getByRole('button', { name: 'DE' }));

  expect(mockSetLanguage).toHaveBeenCalledWith('DE');
  expect(screen.getByRole('status', { name: 'Chargement de la langue en cours…' })).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(450));
  expect(screen.queryByRole('status', { name: 'Chargement de la langue en cours…' })).not.toBeInTheDocument();
  jest.useRealTimers();
});

test('asks for confirmation before logout and confirms the completed action through login navigation state', () => {
  render(<Header onOpenMenu={jest.fn()} />);

  const logoutButton = screen.getByRole('button', { name: 'Déconnexion' });
  fireEvent.click(logoutButton);

  expect(screen.getByRole('dialog', { name: 'Confirmer la déconnexion' })).toBeInTheDocument();
  expect(mockLogout).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: 'Annuler' }));
  expect(screen.queryByRole('dialog', { name: 'Confirmer la déconnexion' })).not.toBeInTheDocument();
  expect(logoutButton).toHaveFocus();

  fireEvent.click(logoutButton);
  fireEvent.click(screen.getByRole('button', { name: 'Se déconnecter' }));

  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(sessionStorage.getItem('logout_success')).toBe('true');
  expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
});

test('uses the connected user photo when available and falls back to initials if it fails', () => {
  mockUser = { name: 'Cheikh', role: 'Manager', photo_url: 'https://example.com/cheikh.jpg' };
  render(<Header onOpenMenu={jest.fn()} />);

  const photo = screen.getByRole('img', { name: 'Photo de profil - Cheikh' });
  expect(photo).toHaveAttribute('src', 'https://example.com/cheikh.jpg');

  fireEvent.error(photo);
  expect(screen.queryByRole('img', { name: 'Photo de profil - Cheikh' })).not.toBeInTheDocument();
  expect(screen.getByText('CH')).toBeInTheDocument();
});
