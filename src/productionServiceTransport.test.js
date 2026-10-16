import { TextEncoder } from 'util';
import { productionServiceTransport } from './api';
import { currentAccessToken } from './identityClient';

jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(), signOutIdentity: jest.fn().mockResolvedValue() }));
beforeEach(() => {
  global.TextEncoder = TextEncoder;
  currentAccessToken.mockResolvedValue('synthetic-google-session');
  global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ storage: 'shared', items: [] }) });
});
test('uses current Google credentials and no-store; never puts the secret in a URL', async () => {
  await productionServiceTransport('/access');
  expect(fetch.mock.calls[0][0]).toMatch(/\/production\/service-cycles\/access$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'GET', cache: 'no-store', headers: { Authorization: 'Bearer synthetic-google-session' } });
});
test('sends one explicit JSON mutation without a retry', async () => {
  const body = { request_id: 'synthetic', preparation: {} };
  await productionServiceTransport('', body);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
});
test.each([null, 'demo_session_test'])('does not send an unauthenticated or demo request', async token => {
  currentAccessToken.mockResolvedValue(token);
  await expect(productionServiceTransport('/access')).rejects.toMatchObject({ status: 401 });
  expect(fetch).not.toHaveBeenCalled();
});
test('rejects another route and oversized UTF-8 mutation before fetch', async () => {
  await expect(productionServiceTransport('/../rh/private')).rejects.toThrow();
  await expect(productionServiceTransport('', { scope: 'é'.repeat(5000) })).rejects.toMatchObject({ status: 413 });
  expect(fetch).not.toHaveBeenCalled();
});
test('preserves conflict code and rejects an unrecognised success acknowledgement', async () => {
  fetch.mockResolvedValueOnce({ ok: false, status: 409, json: async () => ({ code: 'SERVICE_CONFLICT' }) });
  await expect(productionServiceTransport('', {})).rejects.toMatchObject({ status: 409, code: 'SERVICE_CONFLICT' });
  fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ storage: 'local' }) });
  await expect(productionServiceTransport('/access')).rejects.toThrow('SERVICE_RESPONSE_INVALID');
});
