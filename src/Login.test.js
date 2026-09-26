import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login, { loginDestination } from './Login';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { loginMessages } from './login/messages';
import { createClockFormatter } from './login/LoginClock';

const mockNavigate = jest.fn();
let mockParams = new URLSearchParams();
let mockAuth;
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate, useSearchParams: () => [mockParams] }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
const renderLogin = () => render(<LanguageProvider><ThemeProvider><Login/></ThemeProvider></LanguageProvider>);

beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear(); sessionStorage.clear();
  mockParams = new URLSearchParams();
  mockAuth = { login: jest.fn().mockResolvedValue({ success: true }), loginDemo: jest.fn().mockResolvedValue({ success: true }), loading: false, demoAuthEnabled: false };
});

test('confirms successful logout once and clears the navigation state', () => {
  sessionStorage.setItem('logout_success', 'true'); renderLogin();
  expect(screen.getByRole('status')).toHaveTextContent('Déconnexion effectuée avec succès.');
  expect(sessionStorage.getItem('logout_success')).toBeNull();
});

test.each(['FR', 'EN', 'DE'])('validates email locally in %s without a browser-language bubble', language => {
  localStorage.setItem('language', language); renderLogin(); const t = loginMessages[language];
  fireEvent.change(screen.getByLabelText(t.email), { target: { value: 'invalid-address' } });
  fireEvent.click(screen.getByRole('button', { name: t.submit }));
  expect(screen.getByRole('alert')).toHaveTextContent(t.invalidEmail);
  expect(screen.getByLabelText(t.email)).toHaveFocus();
  expect(screen.getByLabelText(t.email)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: t.submit }).closest('form')).toHaveAttribute('novalidate');
  expect(mockAuth.login).not.toHaveBeenCalled();
});

test('required fields focus the invalid input and errors follow a language change', () => {
  renderLogin(); fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));
  expect(screen.getByLabelText('Adresse e-mail')).toHaveFocus();
  fireEvent.change(screen.getByLabelText('Langue'), { target: { value: 'DE' } });
  expect(screen.getByRole('alert')).toHaveTextContent('Bitte füllen Sie dieses Feld aus.');
  fireEvent.change(screen.getByLabelText('E-Mail Adresse'), { target: { value: 'synthetic@example.test' } });
  fireEvent.click(screen.getByRole('button', { name: 'Anmelden' }));
  expect(screen.getByLabelText('Passwort', { exact: true })).toHaveFocus();
  expect(mockAuth.login).not.toHaveBeenCalled();
});

test('password visibility toggles, remains inside the field, then conceals on blur', () => {
  renderLogin(); const input = screen.getByLabelText('Mot de passe', { exact: true });
  fireEvent.click(screen.getByRole('button', { name: 'Afficher le mot de passe' }));
  expect(input).toHaveAttribute('type', 'text');
  const toggle = screen.getByRole('button', { name: 'Masquer le mot de passe' });
  fireEvent.blur(input, { relatedTarget: toggle });
  expect(input).toHaveAttribute('type', 'text');
  fireEvent.blur(toggle, { relatedTarget: screen.getByRole('button', { name: 'Se connecter' }) });
  expect(input).toHaveAttribute('type', 'password');
  expect(mockAuth.login).not.toHaveBeenCalled();
});

test('signs in through the existing adapter and preserves the protected destination', async () => {
  mockParams = new URLSearchParams('next=%2Faccount'); renderLogin();
  fireEvent.change(screen.getByLabelText('Adresse e-mail'), { target: { value: 'synthetic@example.test' } });
  fireEvent.change(screen.getByLabelText('Mot de passe', { exact: true }), { target: { value: 'synthetic-only-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/account'));
  expect(mockAuth.login).toHaveBeenCalledWith('synthetic@example.test', 'synthetic-only-password', 'fr');
  expect(screen.getByLabelText('Mot de passe', { exact: true })).toHaveValue('');
});

test('a pending request is submitted only once and a failure is translated', async () => {
  localStorage.setItem('language', 'EN'); let complete;
  mockAuth.login.mockImplementation(() => new Promise(resolve => { complete = resolve; }));
  renderLogin();
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'synthetic@example.test' } });
  fireEvent.change(screen.getByLabelText('Password', { exact: true }), { target: { value: 'synthetic-only-password' } });
  const form = screen.getByRole('button', { name: 'Sign in' }).closest('form');
  fireEvent.submit(form); fireEvent.submit(form);
  expect(mockAuth.login).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
  await act(async () => complete({ success: false, error: 'Ancienne erreur française' }));
  expect(screen.getByRole('alert')).toHaveTextContent(loginMessages.EN.failed);
  expect(screen.queryByText('Ancienne erreur française')).not.toBeInTheDocument();
  expect(mockNavigate).not.toHaveBeenCalled();
});

test('recovery help never claims an email was sent or submits credentials', () => {
  renderLogin(); fireEvent.click(screen.getByRole('button', { name: 'Mot de passe oublié ?' }));
  expect(screen.getByRole('region', { name: 'Assistance à la connexion' })).toHaveTextContent('Aucun e-mail de récupération');
  expect(mockAuth.login).not.toHaveBeenCalled();
  expect(mockAuth.loginDemo).not.toHaveBeenCalled();
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});

test.each(['FR', 'EN', 'DE'])('Authenticator challenge is localized and never retains the password in %s', async language => {
  localStorage.setItem('language', language);
  const t = loginMessages[language];
  mockAuth.login.mockResolvedValue({ success: false, mfaRequired: true });
  mockAuth.verifyMfa = jest.fn().mockResolvedValue({ success: true });
  mockAuth.cancelMfa = jest.fn().mockResolvedValue();
  renderLogin();
  fireEvent.change(screen.getByLabelText(t.email), { target: { value: 'synthetic@example.test' } });
  fireEvent.change(screen.getByLabelText(t.password, { exact: true }), { target: { value: 'synthetic-only-password' } });
  fireEvent.click(screen.getByRole('button', { name: t.submit }));
  await screen.findByLabelText(t.code);
  expect(screen.queryByLabelText(t.password, { exact: true })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: t.verify }));
  expect(mockAuth.verifyMfa).not.toHaveBeenCalled();
  expect(screen.getByRole('alert')).toHaveTextContent(t.invalidCode);
  fireEvent.change(screen.getByLabelText(t.code), { target: { value: '123456' } });
  fireEvent.click(screen.getByRole('button', { name: t.verify }));
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  expect(mockAuth.verifyMfa).toHaveBeenCalledWith('123456');
});

test('Google recovery needs explicit user action, email validation and sends only once', async () => {
  mockAuth.provider = 'google'; mockAuth.recoverPassword = jest.fn().mockResolvedValue();
  renderLogin(); fireEvent.click(screen.getByRole('button', { name: 'Mot de passe oublié ?' }));
  expect(mockAuth.recoverPassword).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: loginMessages.FR.sendRecovery }));
  expect(mockAuth.recoverPassword).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText(loginMessages.FR.email), { target: { value: 'synthetic@example.test' } });
  fireEvent.click(screen.getByRole('button', { name: loginMessages.FR.sendRecovery }));
  await screen.findByText(loginMessages.FR.recoverySent);
  expect(mockAuth.recoverPassword).toHaveBeenCalledTimes(1);
  expect(mockAuth.recoverPassword).toHaveBeenCalledWith('synthetic@example.test', 'fr');
});

test('theme and language changes retain input and persist preferences', () => {
  renderLogin(); fireEvent.change(screen.getByLabelText('Adresse e-mail'), { target: { value: 'synthetic@example.test' } });
  fireEvent.click(screen.getByRole('button', { name: 'Clair' }));
  fireEvent.change(screen.getByLabelText('Langue'), { target: { value: 'EN' } });
  expect(localStorage.getItem('language')).toBe('EN'); expect(localStorage.getItem('theme')).toBe('light');
  expect(screen.getByLabelText('Email address')).toHaveValue('synthetic@example.test');
  expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'true');
});

test('existing session can return to its account without another login', () => {
  mockAuth.isAuthenticated = true; renderLogin();
  fireEvent.click(screen.getByRole('button', { name: 'Revenir à Mon compte' }));
  expect(mockNavigate).toHaveBeenCalledWith('/account'); expect(mockAuth.login).not.toHaveBeenCalled();
});

test('demo flow remains guarded by the existing configuration', async () => {
  mockAuth.demoAuthEnabled = true; mockAuth.demoAccounts = [{ email: 'fixture@example.test', name: 'Fixture', role: 'Reader' }];
  renderLogin(); fireEvent.click(screen.getByRole('button', { name: 'Fixture (Reader)' }));
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  expect(mockAuth.loginDemo).toHaveBeenCalledWith('fixture@example.test'); expect(mockAuth.login).not.toHaveBeenCalled();
});

test('session expiry message remains translated and clears its marker', () => {
  localStorage.setItem('session_expired', 'true'); localStorage.setItem('language', 'DE'); renderLogin();
  expect(screen.getByRole('status')).toHaveTextContent(loginMessages.DE.expired);
  expect(localStorage.getItem('session_expired')).toBeNull();
});

test('return destinations reject external and ambiguous paths', () => {
  for (const path of [null, 'https://other.test', '//other.test', '/\\other.test', '/\n/other.test']) expect(loginDestination(path)).toBe('/');
  expect(loginDestination('/rh?tab=myaccount')).toBe('/rh?tab=myaccount');
});

test('clock handles winter, summer and different dates without external requests', () => {
  const format = createClockFormatter('EN');
  expect(format(new Date('2026-01-20T12:00:00Z'))).toMatchObject({ timeZurich: '13:00', timeDakar: '12:00', dakarDay: '' });
  expect(format(new Date('2026-07-20T23:10:00Z'))).toMatchObject({ timeZurich: '01:10', timeDakar: '23:10', dakarDay: '20 Jul' });
});

test('all languages provide the same message keys and an accurate legal status', () => {
  for (const language of ['EN', 'DE']) expect(Object.keys(loginMessages[language]).sort()).toEqual(Object.keys(loginMessages.FR).sort());
  renderLogin(); expect(screen.getByText('Kirchenackerweg 23, 8050 Zurich, Suisse')).toBeInTheDocument();
  expect(screen.getByText(loginMessages.FR.termsText)).toBeInTheDocument();
});
