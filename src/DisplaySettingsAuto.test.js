import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Header from './Header';
import Login from './Login';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { loginMessages } from './login/messages';

const mockNavigate = jest.fn();
const mockLogin = jest.fn();
const originalMatchMedia = window.matchMedia;

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/administration', search: '?tab=communication' }),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams()]
}), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { name: 'QA fictive', role: 'QA' }, logout: jest.fn(), login: mockLogin, loading: false, demoAuthEnabled: false }) }));
jest.mock('./api', () => ({ __esModule: true, default: { getFxHistory: () => new Promise(() => {}), getOwnProfile: () => new Promise(() => {}) } }));

const settingsNames = { FR: 'Paramètres d’affichage', DE: 'Anzeigeeinstellungen', EN: 'Display settings' };
const wrap = content => <LanguageProvider><ThemeProvider>{content}</ThemeProvider></LanguageProvider>;

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
  window.matchMedia = () => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
});
afterEach(() => { window.matchMedia = originalMatchMedia; });

test.each(['FR', 'DE', 'EN'])('Header exposes Auto in a compact two-column panel, closes it and restores focus in %s', language => {
  localStorage.setItem('language', language);
  render(wrap(<Header />));
  const trigger = screen.getByRole('button', { name: settingsNames[language] });
  fireEvent.click(trigger);
  const panel = screen.getByRole('dialog', { name: settingsNames[language] });
  const auto = within(panel).getByRole('button', { name: 'Auto', exact: true });
  expect(panel).toHaveClass('w-64', 'fixed', 'right-3', 'sm:absolute');
  expect(auto.parentElement).toHaveClass('grid-cols-2');
  expect(within(panel).getByRole('button', { name: 'Standard', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(auto.parentElement.children).toHaveLength(4);
  fireEvent.click(auto);
  expect(screen.queryByRole('dialog', { name: settingsNames[language] })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(localStorage.getItem('theme')).toBe('auto');
  expect(document.documentElement.dataset.theme).toBe('light');
  fireEvent.click(trigger);
  expect(screen.getByRole('button', { name: 'Auto', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'Standard', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(mockNavigate).not.toHaveBeenCalled();
});

test.each(['FR', 'DE', 'EN'])('the login appearance selector recognizes Auto without invoking authentication in %s', language => {
  localStorage.setItem('language', language);
  localStorage.setItem('theme', 'auto');
  render(wrap(<Login />));
  const group = screen.getByRole('group', { name: loginMessages[language].theme });
  expect(within(group).getAllByRole('button')).toHaveLength(4);
  expect(within(group).getByRole('button', { name: 'Auto', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(within(group).getByRole('button', { name: 'Standard', exact: true })).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(within(group).getByRole('button', { name: loginMessages[language].deep, exact: true }));
  expect(localStorage.getItem('theme')).toBe('deep');
  expect(within(group).getByRole('button', { name: 'Auto', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(mockLogin).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
});
