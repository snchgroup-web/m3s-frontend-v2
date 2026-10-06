import { rhReadTransport } from './api';
import { currentAccessToken } from './identityClient';
jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(), signOutIdentity: jest.fn().mockResolvedValue() }));
beforeEach(() => { global.fetch = jest.fn().mockResolvedValue({ status: 200 }); currentAccessToken.mockReset(); });
test('no missing/demo token or arbitrary URL can reach the API', async () => {
  for (const token of [null, 'demo_session_synthetic']) {
    currentAccessToken.mockResolvedValue(token);
    await expect(rhReadTransport('/employees?limit=25&offset=0')).rejects.toMatchObject({ code: 'RH_AUTH_REQUIRED' });
  }
  for (const path of ['https://other.example.test', '/employees?limit=25&offset=100001', '/employees?limit=25&offset=0&owner=other']) {
    await expect(rhReadTransport(path)).rejects.toMatchObject({ code: 'RH_INVALID_PAGE' });
  }
  await expect(rhReadTransport('/employees?limit=25&offset=0', { method: 'POST' })).rejects.toMatchObject({ code: 'RH_INVALID_PAGE' });
  expect(fetch).not.toHaveBeenCalled();
});
test('uses the existing token provider, bounded private path, no cache and the supplied abort signal', async () => {
  currentAccessToken.mockResolvedValue('synthetic.jwt.token');
  const signal = new AbortController().signal;
  await rhReadTransport('/employees?limit=25&offset=0', { signal });
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/rh/private/employees?limit=25&offset=0'), {
    method: 'GET', signal, cache: 'no-store', headers: { Authorization: 'Bearer synthetic.jwt.token' }
  });
});
test('a cancelled request does not fetch or expire a newly changed session', async () => {
  const controller = new AbortController(); controller.abort();
  await expect(rhReadTransport('/employees?limit=25&offset=0', { signal: controller.signal })).rejects.toMatchObject({ code: 'RH_ABORTED' });
  expect(fetch).not.toHaveBeenCalled();
  localStorage.setItem('user', '{"name":"Synthetic new account"}');
  currentAccessToken.mockResolvedValueOnce('synthetic.old.token').mockResolvedValueOnce('synthetic.new.token');
  fetch.mockResolvedValue({ status: 401 });
  await rhReadTransport('/employees?limit=25&offset=0');
  expect(localStorage.getItem('user')).toContain('Synthetic new account');
  localStorage.clear();
});
