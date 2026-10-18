import api, { isValidTaskFields, tasksTransport } from './api';
import { currentAccessToken, signOutIdentity } from './identityClient';
import { testTask, testTaskReferences } from './taskContractFixtures';

jest.mock('./identityClient', () => ({ currentAccessToken: jest.fn(), signOutIdentity: jest.fn().mockResolvedValue() }));
const originalFetch = global.fetch;
const task = testTask();
const row = { ...task, id: 'task-server-id', revision: 1, source_kind: 'operational', can_edit: true };
const coverage = { operational_available: true, coverage: 'historical_and_current_account' };
const response = (payload, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => payload });
beforeEach(() => {
  currentAccessToken.mockReset().mockResolvedValue('test-session');
  global.fetch = jest.fn();
});
afterEach(() => { global.fetch = originalFetch; jest.useRealTimers(); });

test('list encodes search and pages, authenticates and bypasses cache', async () => {
  const payload = { success: true, data: [row], count: 1, limit: 25, offset: 50, total: 205, ...coverage };
  fetch.mockResolvedValue(response(payload));
  await expect(api.getTasks(25, 50, 'A&B / été')).resolves.toEqual(payload);
  const [url, options] = fetch.mock.calls[0];
  expect(new URL(url).searchParams.get('search')).toBe('A&B / été');
  expect(new URL(url).searchParams.get('contract_version')).toBe('m3s.task-execution.v2');
  expect(options).toMatchObject({ method: 'GET', cache: 'no-store', headers: { Authorization: 'Bearer test-session' } });
  expect(options.body).toBeUndefined();
});

test('disabled access and unavailable operational count are not converted to zero', async () => {
  const access = { success: true, enabled: false, can_read: false, can_write: false, scope: 'current_account', code: 'TASK_SOURCE_UNAVAILABLE' };
  fetch.mockResolvedValueOnce(response(access));
  await expect(api.getTasksAccess()).resolves.toEqual(access);
  const counts = { success: true, total: 6, open: 5, completed: 1, blocked: 1, cancelled: 0, historical_total: 6,
    operational_total: null, operational_available: false, coverage: 'historical_only' };
  fetch.mockResolvedValueOnce(response(counts));
  await expect(api.getTasksCount()).resolves.toMatchObject({ operational_total: null, total: 6 });
});

test('POST preserves the stable reference and accepts an explicit identical replay', async () => {
  fetch.mockResolvedValueOnce(response({ success: true, data: row }, 201))
    .mockResolvedValueOnce(response({ success: true, data: row, replayed: true }));
  await api.createTask(task);
  await expect(api.createTask(task)).resolves.toMatchObject({ replayed: true });
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(task));
  expect(fetch.mock.calls[1][1].body).toBe(fetch.mock.calls[0][1].body);
});

test('acknowledges the server-normalized NFKC, whitespace and case-insensitive reference', async () => {
  fetch.mockResolvedValue(response({ success: true, data: { ...row, reference: 'plan ref-001' } }));
  await expect(api.createTask({ ...task, reference: '  ＰＬＡＮ   REF-001  ' })).resolves.toMatchObject({ success: true });
});

test('PUT sends revision and immutable-reference-free fields; cancellation is a status, never DELETE', async () => {
  const { reference, ...fields } = task;
  const updated = { ...fields, status: 'cancelled', progression: 42 };
  fetch.mockResolvedValue(response({ success: true, data: { ...row, ...updated, revision: 2 } }));
  await api.updateTask(row.id, { expected_revision: 1, task: updated });
  expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'PUT', cache: 'no-store', body: JSON.stringify({ expected_revision: 1, task: updated }) });
  expect(api.deleteTask).toBeUndefined();
});

test.each(['TASK_CONFLICT', 'TASK_DUPLICATE_REFERENCE', 'TASK_POTENTIAL_HISTORICAL_DUPLICATE', 'TASK_SOURCE_UNAVAILABLE', 'TASK_FORBIDDEN', 'TASK_INVALID'])('preserves %s without retry', async code => {
  fetch.mockResolvedValue(response({ success: false, code }, 409));
  await expect(api.createTask(task)).rejects.toMatchObject({ code, status: 409 });
  expect(fetch).toHaveBeenCalledTimes(1);
});

test.each([null, 'demo_session_test'])('does not send requests without real credentials (%s)', async token => {
  currentAccessToken.mockResolvedValue(token);
  await expect(api.getTasksAccess()).rejects.toMatchObject({ code: 'TASK_FORBIDDEN' });
  expect(fetch).not.toHaveBeenCalled();
});

test('invalid fields, immutable reference on PUT and DELETE are rejected before fetch', async () => {
  for (const reference of ['ab', 'a'.repeat(181), 'PLAN\n001']) {
    await expect(api.createTask({ ...task, reference })).rejects.toMatchObject({ code: 'TASK_INVALID' });
  }
  await expect(api.updateTask(row.id, { expected_revision: 0, task })).rejects.toMatchObject({ code: 'TASK_INVALID' });
  await expect(api.updateTask(row.id, { expected_revision: 1, task })).rejects.toMatchObject({ code: 'TASK_INVALID' });
  await expect(tasksTransport('/some-id', { method: 'DELETE' })).rejects.toMatchObject({ code: 'TASK_INVALID' });
  expect(fetch).not.toHaveBeenCalled();
});

test.each(['to_do', 'in_progress', 'done', 'blocked', 'cancelled'])('progression is independent of %s', status => {
  for (const progression of [null, 0, 42, 100]) expect(isValidTaskFields({ ...task, status, progression })).toBe(true);
  for (const progression of [-1, 101, 42.5, NaN, '']) expect(isValidTaskFields({ ...task, status, progression })).toBe(false);
});

test.each([
  { title: 'ab' }, { title: 'a'.repeat(241) }, { responsable: '  ' }, { responsable: 'a'.repeat(161) },
  { module: '' }, { module: 'a'.repeat(101) }, { related_reference: '  ' }, { related_reference: 'a'.repeat(181) },
  { due_date: '1899-12-31' }, { due_date: '2026-02-30' }, { reference: ' ab ' }
])('matches server field limits: %p', fields => expect(isValidTaskFields({ ...task, ...fields })).toBe(false));

test('malformed acknowledgements and failed reads never look like success', async () => {
  fetch.mockResolvedValueOnce(response({ success: true, data: { ...row, reference: 'OTHER' } }));
  await expect(api.createTask(task)).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
  fetch.mockResolvedValueOnce(response({ success: true, total: null, ...coverage }));
  await expect(api.getTasksCount()).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
  fetch.mockResolvedValueOnce({ ok: true, status: 201, json: async () => { throw new Error('truncated'); } });
  await expect(api.createTask(task)).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
  fetch.mockRejectedValueOnce(new TypeError('offline'));
  await expect(api.createTask(task)).rejects.toMatchObject({ code: 'TASK_NETWORK_UNKNOWN' });
  expect(fetch).toHaveBeenCalledTimes(4);
});

test('historical rows cannot advertise write access', async () => {
  fetch.mockResolvedValue(response({ success: true, data: [{ ...row, source_kind: 'historical' }], count: 1, limit: 100, offset: 0, total: 1, ...coverage }));
  await expect(api.getTasks()).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
});

test('an aborted request is not sent and obsolete unauthorized replies do not expire a new session', async () => {
  const controller = new AbortController(); controller.abort();
  await expect(api.getTasksAccess({ signal: controller.signal })).rejects.toMatchObject({ code: 'TASK_ABORTED' });
  expect(fetch).not.toHaveBeenCalled();
  currentAccessToken.mockResolvedValueOnce('old').mockResolvedValueOnce('new');
  fetch.mockResolvedValue(response({ success: false, code: 'TASK_FORBIDDEN' }, 401));
  await expect(api.getTasksAccess()).rejects.toMatchObject({ code: 'TASK_FORBIDDEN' });
  expect(signOutIdentity).not.toHaveBeenCalled();
});

test('reference options authenticate, negotiate V2 and reject unqualified writable catalogues', async () => {
  fetch.mockResolvedValueOnce(response({ success: true, ...testTaskReferences() }));
  await expect(api.getTaskReferences()).resolves.toMatchObject({ writes_enabled: true });
  expect(fetch.mock.calls[0][0]).toContain('/tasks/references?contract_version=');
  fetch.mockResolvedValueOnce(response({ success: true, ...testTaskReferences(), execution_catalogue_ready: false }));
  await expect(api.getTaskReferences()).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
});

test('an old server cannot advertise V2 write access', async () => {
  fetch.mockResolvedValue(response({ success: true, enabled: true, can_read: true, can_write: true, scope: 'current_account' }));
  await expect(api.getTasksAccess()).rejects.toMatchObject({ code: 'TASK_RESPONSE_INVALID' });
});
