import { api } from './api';

beforeEach(() => { global.fetch = jest.fn(); localStorage.clear(); localStorage.setItem('token', 'test-account'); });
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });
test('budget transport sends bearer JSON with no cache and an independent expected version', async () => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true, data: { version: 3 } }) });
  await api.updateBudgetDraft('draft-id', { title: 'Test' }, 2);
  const [url, options] = fetch.mock.calls[0];
  expect(url).toMatch(/finance\/budget-drafts\/draft-id$/);
  expect(options.method).toBe('PUT'); expect(options.cache).toBe('no-store');
  expect(options.headers.Authorization).toBe('Bearer test-account');
  expect(JSON.parse(options.body)).toEqual({ budget: { title: 'Test' }, expectedVersion: 2 });
});
test('errors retain reconciliation metadata without logging payloads or retrying', async () => {
  const log = jest.spyOn(console, 'error').mockImplementation(() => {});
  fetch.mockResolvedValue({ ok: false, status: 503, json: async () => ({ success: false, draftId: 'draft-id', reconcileRequired: true, code: 'BUDGET_STORAGE_UNAVAILABLE', error: 'private contents' }) });
  await expect(api.createBudgetDraft({ title: 'Internal' })).rejects.toMatchObject({ status: 503, draftId: 'draft-id', reconcileRequired: true, message: 'Budget storage request failed' });
  expect(fetch).toHaveBeenCalledTimes(1); expect(log).not.toHaveBeenCalled();
});
test('a network timeout aborts the request instead of looping', async () => {
  jest.useFakeTimers();
  fetch.mockImplementation((url, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('Aborted')))));
  const request = api.createBudgetDraft({ title: 'Internal' });
  const assertion = expect(request).rejects.toThrow('Aborted'); jest.advanceTimersByTime(30000); await assertion;
  expect(fetch).toHaveBeenCalledTimes(1);
});
test('an older request cannot clear a newly signed-in account', async () => {
  let resolve;
  fetch.mockReturnValue(new Promise(done => { resolve = done; }));
  const request = api.getBudgetCapabilities();
  localStorage.setItem('token', 'new-account');
  resolve({ ok: false, status: 401, json: async () => ({ success: false }) });
  await expect(request).rejects.toMatchObject({ status: 401 }); expect(localStorage.getItem('token')).toBe('new-account');
});
test('invalid JSON success responses never masquerade as saved content', async () => {
  fetch.mockResolvedValue({ ok: true, status: 200, json: async () => { throw new Error('Invalid JSON'); } });
  await expect(api.createBudgetDraft({})).rejects.toMatchObject({ status: 200 });
});
