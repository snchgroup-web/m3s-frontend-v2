let mockAuth, mockSdk, mockResolver, mockAuthObserver;
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/auth', () => ({ initializeAuth: () => mockAuth,
  browserSessionPersistence: 'session-only', signOut: (...args) => mockSdk.signOut(...args),
  onAuthStateChanged: (_auth, callback) => { mockAuthObserver = callback; },
  signInWithEmailAndPassword: (...args) => mockSdk.login(...args),
  sendPasswordResetEmail: (...args) => mockSdk.recover(...args),
  getMultiFactorResolver: () => mockResolver,
  TotpMultiFactorGenerator: { FACTOR_ID: 'totp', assertionForSignIn: (uid, code) => ({ uid, code }) } }));
const config = { success: true, provider: 'google', firebase: { projectId: 'synthetic', authDomain: 'synthetic.firebaseapp.com' } };
let client;
beforeEach(() => {
  jest.resetModules(); localStorage.clear();
  mockAuthObserver = null;
  mockAuth = { currentUser: null, authStateReady: async () => {} };
  mockSdk = { signOut: jest.fn(async () => { mockAuth.currentUser = null; }), login: jest.fn(), recover: jest.fn() };
  mockResolver = { hints: [{ factorId: 'totp', uid: 'synthetic-factor' }], resolveSignIn: jest.fn(async () => {
    mockAuth.currentUser = { getIdToken: jest.fn().mockResolvedValue('fresh-synthetic-token') };
  }) };
  global.fetch = jest.fn(async url => ({ ok: true, json: async () => url.endsWith('/auth/provider') ? config : { success: true, user: { id: 'existing' } } }));
  client = require('./identityClient');
});
test('terminal refresh errors expire the UI session, but transient network errors do not', async () => {
  const expired = jest.fn(); window.addEventListener('m3s:session-expired', expired);
  try {
    mockAuth.currentUser = { getIdToken: jest.fn().mockRejectedValue({ code: 'auth/network-request-failed' }) };
    await expect(client.currentAccessToken()).rejects.toMatchObject({ code: 'auth/network-request-failed' });
    expect(expired).not.toHaveBeenCalled();
    mockAuth.currentUser.getIdToken.mockRejectedValue({ code: 'auth/user-token-expired' });
    await expect(client.currentAccessToken()).rejects.toMatchObject({ code: 'auth/user-token-expired' });
    expect(expired).toHaveBeenCalledTimes(1);
    await expect(client.currentAccessToken()).resolves.toBeNull();
  } finally { window.removeEventListener('m3s:session-expired', expired); }
});
test('an external Firebase sign-out expires an established UI session', async () => {
  const expired = jest.fn(); window.addEventListener('m3s:session-expired', expired);
  try {
    mockAuth.currentUser = { getIdToken: jest.fn().mockResolvedValue('synthetic-token') };
    await client.currentAccessToken();
    mockAuthObserver(null);
    expect(expired).toHaveBeenCalledTimes(1);
    await expect(client.currentAccessToken()).resolves.toBeNull();
  } finally { window.removeEventListener('m3s:session-expired', expired); }
});
test('provider lookup failure or unknown mode never falls back to stored historical credentials', async () => {
  localStorage.setItem('token', 'old-token');
  fetch.mockRejectedValue(new Error('offline'));
  await expect(client.currentAccessToken()).rejects.toThrow();
  fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true, provider: 'unknown' }) });
  await expect(client.currentAccessToken()).rejects.toThrow('INVALID_ACCESS_PROVIDER');
  expect(mockSdk.login).not.toHaveBeenCalled();
});
test('TOTP sign-in sends tokens only to the account endpoint and refreshes for API requests', async () => {
  mockSdk.login.mockRejectedValue({ code: 'auth/multi-factor-auth-required' });
  await expect(client.googleLogin('synthetic@example.test', 'synthetic-password', 'de')).resolves.toEqual({ kind: 'mfa' });
  expect(mockAuth.languageCode).toBe('de');
  await expect(client.verifyGoogleMfa('123')).rejects.toThrow('INVALID_MFA');
  await client.verifyGoogleMfa('123456');
  expect(mockResolver.resolveSignIn).toHaveBeenCalledWith({ uid: 'synthetic-factor', code: '123456' });
  const account = await client.readGoogleAccount();
  expect(account.user.id).toBe('existing');
  expect(localStorage.getItem('token')).toBeNull();
  expect(fetch).toHaveBeenLastCalledWith(expect.stringMatching(/\/auth\/me$/), expect.objectContaining({
    headers: { Authorization: 'Bearer fresh-synthetic-token' }, cache: 'no-store' }));
  mockAuth.currentUser.getIdToken.mockResolvedValue('renewed-token');
  await expect(client.currentAccessToken()).resolves.toBe('renewed-token');
  await client.signOutIdentity();
  await expect(client.currentAccessToken()).resolves.toBeNull();
  await expect(client.verifyGoogleMfa('123456')).rejects.toThrow('INVALID_MFA');
});
test('unsupported factors and recovery errors are handled without account disclosure', async () => {
  mockSdk.login.mockRejectedValue({ code: 'auth/multi-factor-auth-required' });
  mockResolver.hints = [{ factorId: 'phone' }];
  await expect(client.googleLogin('synthetic@example.test', 'synthetic-password', 'fr')).rejects.toThrow('TOTP_REQUIRED');
  mockSdk.recover.mockRejectedValue({ code: 'auth/user-not-found' });
  await expect(client.recoverGooglePassword('absent@example.test', 'fr')).resolves.toBeUndefined();
  mockSdk.recover.mockRejectedValue({ code: 'auth/too-many-requests' });
  await expect(client.recoverGooglePassword('synthetic@example.test', 'fr')).rejects.toMatchObject({ code: 'auth/too-many-requests' });
});

test('a failed provider fetch is classified as network and can be retried', async () => {
  fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
  await expect(client.loadIdentityProvider()).rejects.toMatchObject({ code: 'ACCESS_NETWORK' });
  await expect(client.loadIdentityProvider()).resolves.toEqual(config);
  expect(mockSdk.login).not.toHaveBeenCalled();
});

test.each([401, 403])('account HTTP %s is distinguished from a credential failure without copying response data', async status => {
  await client.loadIdentityProvider();
  mockAuth.currentUser = { getIdToken: jest.fn().mockResolvedValue('synthetic-token') };
  fetch.mockResolvedValue({ ok: false, status, json: async () => ({ success: false, error: 'private-response' }) });
  await expect(client.readGoogleAccount()).rejects.toMatchObject({ code: 'ACCESS_ACCOUNT_REJECTED', message: 'ACCESS_UNAVAILABLE' });
});
