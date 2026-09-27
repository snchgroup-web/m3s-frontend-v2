import api from './api';
import { currentAccessToken } from './identityClient';
jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(async () => 'synthetic-token'), signOutIdentity: jest.fn() }));
const record = { id: 'a'.repeat(64), name: 'Synthetic.pdf', size: 15 };
beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic-token'); });
afterEach(() => { delete global.fetch; });

test('list uses bearer authorization and no-store, with no document metadata in URLs', async () => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, documents: [record] }) });
  expect(await api.getPrivateGedDocuments()).toEqual([record]);
  expect(fetch.mock.calls[0][0]).toMatch(/\/ged\/private\/documents$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', headers: { Authorization: 'Bearer synthetic-token' } });
});

test.each([null, {}, { success: true, documents: [{ ...record, name: '../unsafe.pdf' }] },
  { success: true, documents: [{ ...record, size: 9999999 }] }])('rejects malformed private document lists', async payload => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => payload });
  await expect(api.getPrivateGedDocuments()).rejects.toThrow();
});

test('download uses a private request rather than a public or signed URL', async () => {
  const blob = new Blob(['%PDF-synthetic!'], { type: 'application/pdf' });
  fetch.mockResolvedValue({ ok: true, status: 200, headers: new Map([['content-type', 'application/pdf']]), blob: async () => blob });
  expect(await api.downloadPrivateGedDocument({ ...record, size: blob.size })).toBe(blob);
  expect(fetch.mock.calls[0][0]).toMatch(new RegExp(`/ged/private/documents/${record.id}/content$`));
  expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer synthetic-token');
});

test('download rejects invalid identifiers before network access and wrong content after it', async () => {
  await expect(api.downloadPrivateGedDocument({ id: '../escape' })).rejects.toThrow();
  expect(fetch).not.toHaveBeenCalled();
  fetch.mockResolvedValue({ ok: true, headers: new Map([['content-type', 'text/html']]) });
  await expect(api.downloadPrivateGedDocument(record)).rejects.toThrow();
  fetch.mockResolvedValue({ ok: true, headers: new Map([['content-type', 'application/pdf']]), blob: async () => new Blob(['wrong size']) });
  await expect(api.downloadPrivateGedDocument(record)).rejects.toThrow();
});
