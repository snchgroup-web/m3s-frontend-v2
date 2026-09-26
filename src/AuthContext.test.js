import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as identity from './identityClient';
jest.mock('./identityClient', () => ({ loadIdentityProvider: jest.fn(), googleLogin: jest.fn(), verifyGoogleMfa: jest.fn(),
  readGoogleAccount: jest.fn(), signOutIdentity: jest.fn(), recoverGooglePassword: jest.fn() }));
function Consumer() {
  const auth = useAuth();
  return <><span>{auth.ready ? auth.user?.id || 'signed-out' : 'initializing'}</span>
    <button onClick={() => auth.login('synthetic@example.test', 'synthetic-password')}>login</button>
    <button onClick={() => auth.verifyMfa('123456')}>verify</button><button onClick={auth.logout}>logout</button></>;
}
beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear();
  identity.loadIdentityProvider.mockResolvedValue({ provider: 'google' });
  identity.readGoogleAccount.mockResolvedValue(null);
  identity.signOutIdentity.mockResolvedValue();
});
test('Google mode clears historical browser credentials and waits for server account verification', async () => {
  localStorage.setItem('token', 'historical'); localStorage.setItem('user', JSON.stringify({ id: 'historical' }));
  identity.readGoogleAccount.mockResolvedValue({ token: 'synthetic-token', user: { id: 'pinned-account' } });
  render(<AuthProvider><Consumer/></AuthProvider>);
  await screen.findByText('pinned-account');
  expect(localStorage.getItem('token')).toBeNull(); expect(localStorage.getItem('user')).toBeNull();
  fireEvent.click(screen.getByText('logout'));
  await screen.findByText('signed-out'); expect(identity.signOutIdentity).toHaveBeenCalled();
});
test('an MFA challenge is not an authenticated M3S session', async () => {
  identity.googleLogin.mockResolvedValue({ kind: 'mfa' });
  identity.verifyGoogleMfa.mockResolvedValue();
  render(<AuthProvider><Consumer/></AuthProvider>);
  await screen.findByText('signed-out');
  fireEvent.click(screen.getByText('login'));
  await waitFor(() => expect(identity.googleLogin).toHaveBeenCalled());
  expect(screen.getByText('signed-out')).toBeInTheDocument();
  identity.readGoogleAccount.mockResolvedValue({ token: 'synthetic-token', user: { id: 'pinned-account' } });
  fireEvent.click(screen.getByText('verify'));
  await screen.findByText('pinned-account');
  expect(localStorage.getItem('token')).toBeNull();
});
test('failed account restoration never leaves an old authenticated user visible', async () => {
  localStorage.setItem('user', JSON.stringify({ id: 'old-user' }));
  identity.readGoogleAccount.mockRejectedValue(new Error('revoked'));
  render(<AuthProvider><Consumer/></AuthProvider>);
  await screen.findByText('signed-out');
  expect(screen.queryByText('old-user')).not.toBeInTheDocument();
  expect(identity.signOutIdentity).toHaveBeenCalled();
});
