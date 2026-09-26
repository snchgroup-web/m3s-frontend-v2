import api from './api';
jest.mock('./identityClient', () => ({ currentAccessToken: async () => global.localStorage.getItem('token'), signOutIdentity: async () => {} }));

beforeEach(() => { localStorage.clear(); global.fetch = jest.fn(); });
afterEach(() => { localStorage.clear(); jest.restoreAllMocks(); });

test('demo and absent sessions never request a real profile or clear credentials', async () => {
  for (const token of ['', 'demo_session_synthetic']) {
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', '{"name":"Synthetic"}');
    await expect(api.getOwnProfile()).rejects.toMatchObject({ code: 'PROFILE_NOT_LINKED' });
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBe('{"name":"Synthetic"}');
    expect(localStorage.getItem('token')).toBe(token || null);
  }
});

test('real session requests an uncached profile with abort support', async () => {
  localStorage.setItem('token', 'synthetic-signed-token');
  const signal = new AbortController().signal;
  const payload = { success: true, scope: 'current-account' };
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => payload });
  await expect(api.getOwnProfile({ signal })).resolves.toEqual(payload);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/profile'), {
    signal, cache: 'no-store', headers: { Authorization: 'Bearer synthetic-signed-token' }
  });
});
