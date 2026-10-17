jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn().mockResolvedValue('synthetic'), signOutIdentity: jest.fn() }));
const { api } = require('./api');
const { currentAccessToken } = require('./identityClient');
const { readRhInstitutionalBundle, RH_FILE_SPECS, RH_INSTITUTIONAL_BUNDLE_ID, RH_INSTITUTIONAL_REFERENCE } = require('./institutionalRhGedModel');
const payload = () => ({ success: true, bundle: { id: RH_INSTITUTIONAL_BUNDLE_ID, reference: RH_INSTITUTIONAL_REFERENCE,
  version: '0.1', classification: 'internal', role: 'preparation_evidence', cycleId: 'cdd7c770-b06e-416a-8d06-4299f80a71de',
  dossiers: ['GD-008', 'GD-009'], files: RH_FILE_SPECS.map(([name, id, size]) => ({ name, id, size, contentType: 'application/octet-stream' })) } });
beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic'); });
test('RH uses its fixed authenticated no-store route and exact eight-file model', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  expect((await api.getInstitutionalGedBundle({ kind: 'rh' })).files).toHaveLength(8);
  expect(fetch.mock.calls[0][0]).toMatch(/\/ged\/institutional\/rh-cycle-v01$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', headers: { Authorization: 'Bearer synthetic' } });
});
test('wrong cycle, dossiers, duplicate file, substituted size/hash/name are rejected', () => {
  for (const mutate of [b => { b.dossiers = ['GD-005', 'GD-006']; }, b => { b.cycleId = 'other'; }, b => { b.files.pop(); },
    b => { b.files[1] = b.files[0]; }, b => { b.files[0].id = 'a'.repeat(64); }, b => { b.files[0].size++; }, b => { b.files[0].name = 'other.html'; }]) {
    const value = payload(); mutate(value.bundle); expect(() => readRhInstitutionalBundle(value)).toThrow('INSTITUTIONAL_RESPONSE_INVALID');
  }
});
test('a documentary file cannot be downloaded through RH and no bytes are requested', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  await expect(api.downloadInstitutionalGedFile({ id: 'f'.repeat(64), name: 'OTHER.html', size: 1 }, { kind: 'rh' })).rejects.toThrow();
  expect(fetch).toHaveBeenCalledTimes(1);
});
test('unsupported bundle selector fails before transport', async () => {
  await expect(api.getInstitutionalGedBundle({ kind: '../private' })).rejects.toThrow();
  expect(fetch).not.toHaveBeenCalled();
});
test('RH access denial remains an error, never an empty successful bundle', async () => {
  fetch.mockResolvedValue({ ok: false, status: 403, json: async () => ({ code: 'INSTITUTIONAL_FORBIDDEN' }) });
  await expect(api.getInstitutionalGedBundle({ kind: 'rh' })).rejects.toMatchObject({ status: 403 });
});
