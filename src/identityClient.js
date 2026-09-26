const local = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
export const ACCESS_API = process.env.REACT_APP_API_URL || (local ? 'http://localhost:3001/api' : 'https://web-production-1e53c.up.railway.app/api');
let providerPromise, clientPromise, resolver;
let signedOut = false;

async function jsonRequest(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${ACCESS_API}${path}`, { ...options, signal: controller.signal, cache: 'no-store' });
    const data = await response.json();
    if (!response.ok || data?.success !== true) throw new Error('ACCESS_UNAVAILABLE');
    return data;
  } finally { clearTimeout(timer); }
}

// Only the server selects a provider. A failed lookup never enables legacy login.
export function loadIdentityProvider() {
  if (!providerPromise) providerPromise = jsonRequest('/auth/provider').then(config => {
    if (!['legacy', 'google'].includes(config.provider)) throw new Error('INVALID_ACCESS_PROVIDER');
    if (config.provider === 'google' && (!config.firebase?.projectId ||
        config.firebase.authDomain !== `${config.firebase.projectId}.firebaseapp.com`)) throw new Error('INVALID_ACCESS_PROVIDER');
    return config;
  }).catch(error => { providerPromise = null; throw error; });
  return providerPromise;
}

async function client() {
  if (!clientPromise) clientPromise = (async () => {
    const config = await loadIdentityProvider();
    if (config.provider !== 'google') throw new Error('GOOGLE_NOT_ACTIVE');
    const { initializeApp } = await import('firebase/app');
    const sdk = await import('firebase/auth');
    const auth = sdk.initializeAuth(initializeApp(config.firebase, 'm3s-access'), { persistence: sdk.browserSessionPersistence });
    await auth.authStateReady();
    return { auth, sdk };
  })().catch(error => { clientPromise = null; throw error; });
  return clientPromise;
}

export async function currentAccessToken() {
  const config = await loadIdentityProvider();
  if (config.provider === 'legacy') return localStorage.getItem('token');
  if (signedOut) return null;
  const { auth } = await client();
  return auth.currentUser ? auth.currentUser.getIdToken() : null;
}

export async function readGoogleAccount() {
  const token = await currentAccessToken();
  if (!token) return null;
  const data = await jsonRequest('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  return { token, user: data.user };
}

export async function googleLogin(email, password, language) {
  const { auth, sdk } = await client();
  resolver = null; signedOut = false;
  auth.languageCode = language;
  await sdk.signOut(auth);
  try {
    await sdk.signInWithEmailAndPassword(auth, email, password);
    return { kind: 'authenticated' };
  } catch (error) {
    if (error.code !== 'auth/multi-factor-auth-required') throw error;
    const pending = sdk.getMultiFactorResolver(auth, error);
    if (!pending.hints.some(hint => hint.factorId === sdk.TotpMultiFactorGenerator.FACTOR_ID)) throw new Error('TOTP_REQUIRED');
    resolver = pending;
    return { kind: 'mfa' };
  }
}

export async function verifyGoogleMfa(code) {
  if (!resolver || !/^\d{6}$/.test(code)) throw new Error('INVALID_MFA');
  const { sdk } = await client();
  const hint = resolver.hints.find(item => item.factorId === sdk.TotpMultiFactorGenerator.FACTOR_ID);
  await resolver.resolveSignIn(sdk.TotpMultiFactorGenerator.assertionForSignIn(hint.uid, code));
  resolver = null;
}

export async function recoverGooglePassword(email, language) {
  const { auth, sdk } = await client();
  auth.languageCode = language;
  try { await sdk.sendPasswordResetEmail(auth, email); }
  catch (error) {
    if (!['auth/user-not-found', 'auth/invalid-email'].includes(error.code)) throw error;
  }
}

export async function signOutIdentity() {
  signedOut = true; resolver = null;
  if (clientPromise) { const { auth, sdk } = await clientPromise; await sdk.signOut(auth); }
}
