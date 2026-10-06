import { createRhClient } from './client';
const row = { employeeId: '11111111-1111-4111-8111-111111111111', revision: 1,
  displayName: 'Synthetic employee', positionRef: null, siteRef: null,
  employmentStartDate: null, status: 'draft', classification: 'C3' };
const payload = items => ({ items, limit: 50, offset: 0, candidate: true });
test('the read client has no mutation command and defaults closed', async () => {
  const transport = jest.fn(); const client = createRhClient({ transport });
  expect(Object.keys(client)).toEqual(['list']);
  await expect(client.list()).rejects.toMatchObject({ code: 'RH_NOT_ENABLED' });
  expect(transport).not.toHaveBeenCalled();
});
test('returns a minimized immutable page, with unknown total and date retained', async () => {
  const client = createRhClient({ enabled: true, transport: async () => ({ status: 200, json: async () => payload([row]) }) });
  const result = await client.list();
  expect(result.total).toBeNull(); expect(result.items[0].employmentStartDate).toBeNull();
  expect(Object.isFrozen(result.items[0])).toBe(true);
});
test.each([{ salary: 50000 }, { employmentStartDate: '2026-02-30' }, { status: 'active' },
  { classification: 'C2' }, { displayName: '<invalid>' }, { displayName: 'Synthetic\u0000employee' },
  { positionRef: undefined }])('rejects unexpected or unsafe fields: %p', async patch => {
  const client = createRhClient({ enabled: true, transport: async () => ({ status: 200, json: async () => payload([{ ...row, ...patch }]) }) });
  await expect(client.list()).rejects.toMatchObject({ code: 'RH_INVALID_RESPONSE' });
});
test('rejects duplicates and normalizes expired authentication without private messages', async () => {
  for (const items of [[row, row]]) {
    const client = createRhClient({ enabled: true, transport: async () => ({ status: 200, json: async () => payload(items) }) });
    await expect(client.list()).rejects.toMatchObject({ code: 'RH_INVALID_RESPONSE' });
  }
  const client = createRhClient({ enabled: true, transport: async () => ({ status: 401, json: async () => ({ code: 'ACCESS_DENIED', secret: 'private' }) }) });
  await expect(client.list()).rejects.toMatchObject({ code: 'RH_AUTH_REQUIRED' });
});
