import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from './Login';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams()]
}), { virtual: true });

jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    error: '',
    loading: false,
    demoAuthEnabled: false
  })
}));

jest.mock('./LanguageContext', () => ({
  useLanguage: () => ({ language: 'FR' })
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
  sessionStorage.setItem('logout_success', 'true');
});

test('confirms a successful logout once and clears the navigation state', async () => {
  render(<Login />);

  expect(screen.getByRole('status')).toHaveTextContent('Déconnexion effectuée avec succès.');
  await waitFor(() => expect(sessionStorage.getItem('logout_success')).toBeNull());
});
