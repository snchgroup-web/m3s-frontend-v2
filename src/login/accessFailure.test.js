import { accessFailure } from './accessFailure';

test.each([
  ['auth/invalid-credential', 'ACC-CREDENTIALS'], ['auth/user-not-found', 'ACC-CREDENTIALS'],
  ['auth/wrong-password', 'ACC-CREDENTIALS'], ['auth/network-request-failed', 'ACC-NETWORK'],
  ['ACCESS_NETWORK', 'ACC-NETWORK'], ['auth/too-many-requests', 'ACC-RATE'],
  ['auth/unauthorized-domain', 'ACC-CONFIG'], ['auth/invalid-api-key', 'ACC-CONFIG'],
  ['auth/argument-error', 'ACC-CONFIG'], ['ACCESS_ACCOUNT_REJECTED', 'ACC-ACCOUNT'],
  ['ACCESS_PROVIDER_CHANGED', 'ACC-RELOAD'], ['auth/invalid-verification-code', 'ACC-MFA'],
  ['TOTP_REQUIRED', 'ACC-FACTOR']
])('%s maps to a fixed safe category', (code, reference) => {
  expect(accessFailure({ code, message: 'private details', customData: { email: 'private@example.test' } }).reference).toBe(reference);
});

test('unknown failures never blame credentials or expose raw messages', () => {
  expect(accessFailure({ code: 'unknown-private-value', message: 'secret' })).toEqual({ key: 'serviceFailed', reference: 'ACC-SERVICE' });
  expect(accessFailure(new Error('private details'), 'initialize')).toEqual({ key: 'serviceFailed', reference: 'ACC-INIT' });
  expect(accessFailure({ name: 'AbortError' }).reference).toBe('ACC-NETWORK');
});
