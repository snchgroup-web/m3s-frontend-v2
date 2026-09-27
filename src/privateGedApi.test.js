import api from './api';
import { currentAccessToken } from './identityClient';
jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(async () => 'synthetic-token'), signOutIdentity: jest.fn() }));
const record = { id: 'a'.repeat(64), name: 'Synthetic.pdf', size: 15 };
beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic-token'); });
afterEach(() => { delete global.fetch; });

test('lifecycle command uses root identity and exact revision without metadata in URL', async () => {
  const root = { ...record, rootId: record.id, lifecycle: true, title: 'CV', revision: 0, trashed: false };
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, document: { ...root, title: 'Updated', revision: 1 } }) });
  expect(await api.mutatePrivateGedDocument(root, { action: 'rename', title: 'Updated' })).toMatchObject({ title: 'Updated' });
  expect(fetch.mock.calls[0][0]).toMatch(new RegExp(`/${root.rootId}/actions$`));
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ action: 'rename', title: 'Updated', expectedRevision: 0 });
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, document: root }) });
  await expect(api.mutatePrivateGedDocument(root, { action: 'trash' })).rejects.toThrow();
});

test('history rejects malformed document entries', async () => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, history: [{ revision: 0, document: { ...record, id: '../bad' } }] }) });
  await expect(api.getPrivateGedHistory({ rootId: record.id })).rejects.toThrow();
});

const bytes = new (require('util').TextEncoder)().encode('synthetic-document-bytes');
const syntheticFile = { name: 'Synthetic CV.docx', size: bytes.length, arrayBuffer: async () => bytes.buffer };
const sha = require('crypto').createHash('sha256').update(bytes).digest('hex');
const approved = { name: syntheticFile.name, size: syntheticFile.size, sha256: sha, category: 'personal' };
const policyReply = (patch = {}) => ({ ok: true, status: 200, json: async () => ({ success: true, documents: [], approved: [approved], ...patch }) });
beforeAll(() => { Object.defineProperty(global, 'crypto', { configurable: true, value: require('crypto').webcrypto }); });

test('file selection checks hash and classification without uploading its content', async () => {
  fetch.mockResolvedValue(policyReply());
  const candidate = await api.preparePrivateGedImport(syntheticFile, 'personal');
  expect(candidate).toMatchObject({ id: sha, category: 'personal', existing: false });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch.mock.calls[0][1].body).toBeUndefined();
  await expect(api.preparePrivateGedImport(syntheticFile, 'finance')).rejects.toMatchObject({ code: 'GED_CATEGORY_MISMATCH' });
});

test.each([['jpg', 'image/jpeg'], ['jpeg', 'image/jpeg'], ['png', 'image/png']])('approved %s scan keeps authenticated import and MIME checks', async (ext, mime) => {
  const file = { ...syntheticFile, name: `Synthetic.${ext}` };
  const row = { ...approved, name: file.name, category: 'finance', contentType: mime };
  fetch.mockResolvedValue(policyReply({ approved: [row] }));
  const candidate = await api.preparePrivateGedImport(file, 'finance');
  expect(candidate.contentType).toBe(mime);
  fetch.mockResolvedValueOnce(policyReply({ approved: [row] })).mockResolvedValueOnce({ ok: true, status: 201,
    json: async () => ({ success: true, created: true, document: { ...row, id: sha } }) });
  await expect(api.importPrivateGedDocument(file, candidate)).resolves.toMatchObject({ created: true });
  expect(fetch.mock.calls.at(-1)[1].headers['Content-Type']).toBe(mime);
});

test('larger approved list works but never accepts SVG or more than 64 entries', async () => {
  fetch.mockResolvedValue(policyReply({ approved: [approved, ...Array.from({ length: 10 }, (_, i) => ({ ...approved, sha256: String(i).padStart(64, '0') }))] }));
  await expect(api.preparePrivateGedImport(syntheticFile, 'personal')).resolves.toMatchObject({ id: sha });
  fetch.mockResolvedValue(policyReply({ approved: Array(65).fill(approved) }));
  await expect(api.preparePrivateGedImport(syntheticFile, 'personal')).rejects.toThrow('GED_UNAVAILABLE');
  await expect(api.preparePrivateGedImport({ ...syntheticFile, name: 'Unsafe.svg' }, 'personal')).rejects.toThrow('GED_FORMAT_REQUIRED');
});
test('unknown or oversized files never send a POST', async () => {
  fetch.mockResolvedValue(policyReply({ approved: [] }));
  await expect(api.preparePrivateGedImport(syntheticFile, 'personal')).rejects.toMatchObject({ code: 'GED_DOCUMENT_NOT_APPROVED' });
  await expect(api.preparePrivateGedImport({ ...syntheticFile, size: 5242881 }, 'personal')).rejects.toMatchObject({ code: 'GED_TOO_LARGE' });
  expect(fetch.mock.calls.every(([, options]) => !options.method)).toBe(true);
});
test('confirmed import revalidates approval, sends authenticated bytes and requires matching server evidence', async () => {
  const doc = { id: sha, name: approved.name, size: approved.size, category: 'personal' };
  fetch.mockResolvedValueOnce(policyReply()).mockResolvedValueOnce({ ok: true, status: 201,
    json: async () => ({ success: true, created: true, document: doc }) });
  expect(await api.importPrivateGedDocument(syntheticFile, doc)).toMatchObject({ created: true, document: doc });
  expect(fetch.mock.calls[1][1]).toMatchObject({ method: 'POST', body: syntheticFile,
    headers: { Authorization: 'Bearer synthetic-token', 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } });
  fetch.mockResolvedValueOnce(policyReply()).mockResolvedValueOnce({ ok: true, status: 200,
    json: async () => ({ success: true, created: true, document: { ...doc, category: 'finance' } }) });
  await expect(api.importPrivateGedDocument(syntheticFile, doc)).rejects.toThrow();
});

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
