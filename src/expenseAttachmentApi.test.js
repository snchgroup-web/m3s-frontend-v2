import api from './api';
import { currentAccessToken } from './identityClient';

jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(async () => 'synthetic-token'), signOutIdentity: jest.fn() }));

const root = 'a'.repeat(64);
const version = 'b'.repeat(64);
const current = { id: version, rootId: root, lifecycle: true, trashed: false, revision: 1,
  category: 'finance', name: 'Facture.pdf', title: 'Facture', size: 20 };

beforeEach(() => { global.fetch = jest.fn(); currentAccessToken.mockResolvedValue('synthetic-token'); });
afterEach(() => { delete global.fetch; });

test('returns only current non-trashed financial roots when attachment is enabled', async () => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true,
    capabilities: { expenseAttach: true }, documents: [current,
      { ...current, id: 'c'.repeat(64), rootId: 'c'.repeat(64), category: 'personal' },
      { ...current, id: 'd'.repeat(64), rootId: 'd'.repeat(64), trashed: true }] }) });
  await expect(api.getExpenseAttachmentOptions()).resolves.toEqual({ enabled: true, documents: [current] });
  expect(fetch.mock.calls[0][1]).toMatchObject({ cache: 'no-store', headers: { Authorization: 'Bearer synthetic-token' } });
});

test('fails closed on malformed capability and remains disabled when capability is absent', async () => {
  fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ success: true, capabilities: { expenseAttach: 'yes' }, documents: [] }) });
  await expect(api.getExpenseAttachmentOptions()).rejects.toMatchObject({ code: 'GED_UNAVAILABLE' });
  fetch.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ success: true, documents: [] }) });
  await expect(api.getExpenseAttachmentOptions()).resolves.toEqual({ enabled: false, documents: [] });
});

test('posts the strict link contract and verifies the echoed idempotent result', async () => {
  const link = { expenseId: 'DEP-001', documentId: root, versionId: version, documentRole: 'invoice', externalReference: 'INV-001', revision: 1 };
  fetch.mockResolvedValue({ ok: true, status: 201, json: async () => ({ success: true, created: true, link }) });
  await expect(api.attachExpenseDocument('DEP-001', { documentId: root, versionId: version,
    documentRole: 'invoice', externalReference: ' INV-001 ' })).resolves.toMatchObject({ created: true, link });
  expect(fetch.mock.calls[0][0]).toMatch(/\/ged\/private\/expenses\/DEP-001\/documents$/);
  expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'POST', cache: 'no-store', headers: {
    Authorization: 'Bearer synthetic-token', 'Content-Type': 'application/json'
  } });
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ documentId: root, versionId: version,
    documentRole: 'invoice', externalReference: 'INV-001' });
});

test('rejects malformed commands and unverified success responses', async () => {
  await expect(api.attachExpenseDocument('DEP-001', { documentId: '../bad', versionId: version, documentRole: 'invoice' }))
    .rejects.toMatchObject({ code: 'GED_INVALID_COMMAND' });
  expect(fetch).not.toHaveBeenCalled();
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, created: false,
    link: { expenseId: 'DEP-OTHER', documentId: root, versionId: version, documentRole: 'invoice', externalReference: null, revision: 1 } }) });
  await expect(api.attachExpenseDocument('DEP-001', { documentId: root, versionId: version, documentRole: 'invoice' }))
    .rejects.toMatchObject({ code: 'GED_UNAVAILABLE' });
});
