import { rhReadTransport } from './api';
import { currentAccessToken, signOutIdentity } from './identityClient';
jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(), signOutIdentity: jest.fn().mockResolvedValue() }));
beforeEach(() => { global.fetch = jest.fn().mockResolvedValue({ status: 200 }); currentAccessToken.mockReset(); signOutIdentity.mockClear(); });
test('contract viewing uses only scoped authenticated GET paths', async () => {
  currentAccessToken.mockResolvedValue('synthetic.jwt.token');
  const root = '/employees/11111111-1111-4111-8111-111111111111/contract-documents';
  for (const path of [`${root}?dossierRevision=2`,`${root}/${'a'.repeat(64)}/versions/${'b'.repeat(64)}?dossierRevision=2`]) {
    await rhReadTransport(path);
    expect(fetch).toHaveBeenLastCalledWith(expect.stringContaining(path),expect.objectContaining({cache:'no-store',method:'GET'}));
  }
  for (const path of [`${root}?dossierRevision=0`,`${root}?dossierRevision=2&owner=other`,`${root}/not-a-hash/versions/x?dossierRevision=2`]) {
    await expect(rhReadTransport(path)).rejects.toMatchObject({code:'RH_INVALID_PAGE'});
  }
  expect(fetch).toHaveBeenCalledTimes(2);
});
test('no missing/demo token or arbitrary URL can reach the API', async () => {
  for (const token of [null, 'demo_session_synthetic']) {
    currentAccessToken.mockResolvedValue(token);
    await expect(rhReadTransport('/employees?limit=25&offset=0')).rejects.toMatchObject({ code: 'RH_AUTH_REQUIRED' });
  }
  for (const path of ['https://other.example.test', '/access?owner=other', '/employees?limit=25&offset=100001', '/employees?limit=25&offset=0&owner=other']) {
    await expect(rhReadTransport(path)).rejects.toMatchObject({ code: 'RH_INVALID_PAGE' });
  }
  await expect(rhReadTransport('/employees?limit=25&offset=0', { method: 'POST' })).rejects.toMatchObject({ code: 'RH_INVALID_PAGE' });
  expect(fetch).not.toHaveBeenCalled();
});

test('access metadata uses only the same authenticated bounded GET transport', async () => {
  currentAccessToken.mockResolvedValue('synthetic.jwt.token');
  await rhReadTransport('/access');
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/rh/private/access'), {
    method: 'GET', signal: undefined, cache: 'no-store', headers: { Authorization: 'Bearer synthetic.jwt.token' }
  });
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

test('cancellation during the second token lookup never signs the user out', async () => {
  const controller = new AbortController();
  let finishLookup, lookupStarted;
  const started = new Promise(resolve => { lookupStarted = resolve; });
  currentAccessToken.mockResolvedValueOnce('synthetic.same.token').mockImplementationOnce(() => {
    lookupStarted();
    return new Promise(resolve => { finishLookup = resolve; });
  });
  fetch.mockResolvedValue({ status: 401 });
  localStorage.setItem('user', '{"name":"Synthetic current account"}');
  try {
    const pending = rhReadTransport('/employees?limit=25&offset=0', { signal: controller.signal });
    await started;
    controller.abort();
    finishLookup('synthetic.same.token');
    await expect(pending).resolves.toMatchObject({ status: 401 });
    expect(signOutIdentity).not.toHaveBeenCalled();
    expect(localStorage.getItem('user')).toContain('Synthetic current account');
  } finally { localStorage.clear(); }
});
