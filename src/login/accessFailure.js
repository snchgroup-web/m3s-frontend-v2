// Only fixed categories leave this boundary; provider messages can contain user data.
export function accessFailure(error, stage = 'login') {
  const code = error?.code;
  if (code === 'auth/too-many-requests') return { key: 'tooMany', reference: 'ACC-RATE' };
  if (['auth/network-request-failed', 'ACCESS_NETWORK'].includes(code) || error?.name === 'AbortError')
    return { key: 'networkFailed', reference: 'ACC-NETWORK' };
  if (['auth/invalid-credential', 'auth/invalid-login-credentials', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'].includes(code))
    return { key: 'credentialsFailed', reference: 'ACC-CREDENTIALS' };
  if (['auth/unauthorized-domain', 'auth/app-not-authorized', 'auth/invalid-api-key', 'auth/api-key-not-valid.-please-pass-a-valid-api-key.',
    'auth/operation-not-allowed', 'auth/configuration-not-found', 'auth/argument-error'].includes(code))
    return { key: 'configurationFailed', reference: 'ACC-CONFIG' };
  if (code === 'ACCESS_ACCOUNT_REJECTED') return { key: 'accountRejected', reference: 'ACC-ACCOUNT' };
  if (code === 'ACCESS_PROVIDER_CHANGED') return { key: 'providerChanged', reference: 'ACC-RELOAD' };
  if (['auth/invalid-verification-code', 'auth/missing-verification-code', 'auth/code-expired', 'auth/invalid-multi-factor-session'].includes(code))
    return { key: 'mfaFailed', reference: 'ACC-MFA' };
  if (code === 'TOTP_REQUIRED') return { key: 'configurationFailed', reference: 'ACC-FACTOR' };
  return { key: 'serviceFailed', reference: stage === 'initialize' ? 'ACC-INIT' : 'ACC-SERVICE' };
}
