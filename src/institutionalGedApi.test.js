jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn().mockResolvedValue('synthetic'), signOutIdentity: jest.fn() }));
const { api } = require('./api');
const { currentAccessToken } = require('./identityClient');
const { INSTITUTIONAL_BUNDLE_ID, INSTITUTIONAL_REFERENCE } = require('./institutionalGedModel');
const payload = () => ({ success: true, bundle: { id: INSTITUTIONAL_BUNDLE_ID, reference: INSTITUTIONAL_REFERENCE,
  version: '0.1', classification: 'internal', role: 'preparation_evidence', cycleId: 'bccde91a-fedc-469a-ad65-ab2f212db959',
  dossiers: ['GD-005', 'GD-006'], files: ['A.md', 'B.html', 'C.csv', 'D.json', 'E.json'].map((name, index) => ({ id: String(index + 1).repeat(64), name, size: 50, contentType: 'application/octet-stream' })) } });
beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic'); });
test('metadata uses authenticated no-store transport and a fixed institutional route', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  expect((await api.getInstitutionalGedBundle()).files).toHaveLength(5);
  expect(fetch.mock.calls[0][0]).toMatch(/\/ged\/institutional\/document-cycle-v01$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', headers: { Authorization: 'Bearer synthetic' } });
});
test('a stale or invented file is rejected after fresh metadata, before requesting any bytes', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  await expect(api.downloadInstitutionalGedFile({ id: 'f'.repeat(64), name: 'other.html', size: 50 })).rejects.toThrow();
  expect(fetch).toHaveBeenCalledTimes(1);
});
test('access errors are retained as errors instead of an empty successful bundle', async () => {
  fetch.mockResolvedValue({ ok: false, status: 403, json: async () => ({ code: 'INSTITUTIONAL_FORBIDDEN' }) });
  await expect(api.getInstitutionalGedBundle()).rejects.toMatchObject({ status: 403 });
});
