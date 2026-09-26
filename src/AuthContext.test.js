import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import * as identity from './identityClient';
jest.mock('./identityClient', () => ({ loadIdentityProvider: jest.fn(), googleLogin: jest.fn(), verifyGoogleMfa: jest.fn(),
  readGoogleAccount: jest.fn(), signOutIdentity: jest.fn(), recoverGooglePassword: jest.fn() }));
function Consumer() {
  const auth = useAuth();
  return <><span>{auth.ready ? auth.user?.id || 'signed-out' : 'initializing'}</span>
    <button onClick={() => auth.login('synthetic@example.test', 'synthetic-password')}>login</button>
    <button onClick={() => auth.verifyMfa('123456')}>verify</button><button onClick={auth.logout}>logout</button>
    <button onClick={() => auth.loginDemo('demo@example.test')}>demo</button>
    <span>{auth.demoAuthEnabled ? 'demo-enabled' : 'demo-disabled'}</span></>;
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
test('Google mode disallows demo login and clears context on session expiry', async () => {
  identity.readGoogleAccount.mockResolvedValue({ token: 'synthetic-token', user: { id: 'pinned-account' } });
  render(<AuthProvider><Consumer/></AuthProvider>);
  await screen.findByText('pinned-account');
  expect(screen.getByText('demo-disabled')).toBeInTheDocument();
  fireEvent.click(screen.getByText('demo'));
  await waitFor(() => expect(identity.loadIdentityProvider).toHaveBeenCalledTimes(2));
  expect(localStorage.getItem('token')).toBeNull();
  expect(screen.getByText('pinned-account')).toBeInTheDocument();
  fireEvent(window, new Event('m3s:session-expired'));
  await screen.findByText('signed-out');
});

test.each([[401, 'ACC-CREDENTIALS'], [409, 'ACC-RELOAD'], [500, 'ACC-SERVICE']])('legacy HTTP %s never exposes the raw backend message', async (status, reference) => {
  const originalFetch = global.fetch;
  identity.loadIdentityProvider.mockResolvedValue({ provider: 'legacy' });
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status,
    json: async () => ({ success: false, error: 'private-backend-details' }) });
  let auth, result;
  function Probe() { auth = useAuth(); return <Consumer/>; }
  try {
    render(<AuthProvider><Probe/></AuthProvider>);
    await screen.findByText('signed-out');
    await act(async () => { result = await auth.login('synthetic@example.test', 'synthetic-only-password'); });
    expect(auth.error).toBe('ACCESS_REJECTED');
    expect(result).toMatchObject({ success: false, error: 'ACCESS_REJECTED', failure: { reference } });
    expect(JSON.stringify(result)).not.toContain('private-backend-details');
  } finally { global.fetch = originalFetch; }
});
