jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn().mockResolvedValue('synthetic'), signOutIdentity: jest.fn() }));
const { api } = require('./api');
const { currentAccessToken } = require('./identityClient');
const spec = require('./gedOffersSpec.json');
const { readOffersBundle, OFFERS_REFERENCE } = require('./gedOffersModel');
const payload = () => ({ success: true, bundle: { id: spec.id, reference: OFFERS_REFERENCE, version: spec.version,
  classification: 'internal', role: 'supplementary_resources', canonicalReferencesPreserved: true, dossiers: [...spec.dossiers],
  files: spec.files.map(file => ({ ...file, dossiers: [...file.dossiers], contentType: 'application/octet-stream' })) } });
beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic'); });

test('supplement uses its fixed authenticated no-store route', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  expect((await api.getInstitutionalGedBundle({ kind: 'offers' })).files).toHaveLength(10);
  expect(fetch.mock.calls[0][0]).toMatch(/\/ged\/institutional\/offers-20261017$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', headers: { Authorization: 'Bearer synthetic' } });
});

test('substituted bundle, version, target, file and changed canonical flag fail closed', () => {
  for (const mutate of [b => { b.id = 'a'.repeat(64); }, b => { b.version = '0.1'; }, b => { b.dossiers.pop(); },
    b => { b.canonicalReferencesPreserved = false; }, b => { b.files.pop(); }, b => { b.files[1] = b.files[0]; },
    b => { b.files[0].name = 'OTHER.md'; }, b => { b.files[0].size++; }, b => { b.files[0].id = 'f'.repeat(64); },
    b => { b.files[0].version = '2'; }, b => { b.files[0].dossiers = ['GD-005']; }]) {
    const p = payload(); mutate(p.bundle); expect(() => readOffersBundle(p)).toThrow('INSTITUTIONAL_RESPONSE_INVALID');
  }
});

test('unlisted requested file cannot reach byte transport', async () => {
  fetch.mockResolvedValue({ ok: true, json: async () => payload() });
  await expect(api.downloadInstitutionalGedFile({ id: 'f'.repeat(64), name: 'OTHER.md', size: 1 }, { kind: 'offers' })).rejects.toThrow();
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('denied supplement is an error rather than an empty success', async () => {
  fetch.mockResolvedValue({ ok: false, status: 403, json: async () => ({ code: 'INSTITUTIONAL_FORBIDDEN' }) });
  await expect(api.getInstitutionalGedBundle({ kind: 'offers' })).rejects.toMatchObject({ status: 403 });
});
