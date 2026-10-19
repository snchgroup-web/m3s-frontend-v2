import { webcrypto } from 'crypto';
import { TextEncoder, TextDecoder } from 'util';
import { HOURS_SCHEMA, HOURS_STORAGE_SCHEMA, hoursAccountKey, validateHoursState, appendHours, newHourEntry,
  createHoursVault, sealHoursVault, openHoursVault, hoursMonth, hoursDuration } from './personalHoursVault';
import { hoursWorkLinkFromTask } from './hoursWorkLink';
import { testTask } from './taskContractFixtures';
global.TextEncoder = TextEncoder; global.TextDecoder = TextDecoder;
const principal = { id: 'synthetic-a', tenantId: 'tenant-test', email: 'a@example.test' };
const subject = `${HOURS_STORAGE_SCHEMA}.${'a'.repeat(64)}`;
const work = () => hoursWorkLinkFromTask({ ...testTask(), id: 'task-test', source_kind: 'operational', can_edit: false, revision: 1, project_id: 'project-test' });
const now = new Date('2026-10-19T20:00:00Z');
const entry = () => ({ id: 'HOUR-test', date: '2026-10-18', start: '15:00', end: '17:00', pause: 15, overnight: false, minutes: 105 });
const state = entries => ({ schema: HOURS_SCHEMA, subject, timezone: 'Europe/Zurich', entries });

test('keys separate account, tenant and email without exposing them in the storage key', async () => {
  const key = await hoursAccountKey(principal, webcrypto);
  expect(key).toMatch(/^m3s\.personal-hours\.v1\.[a-f0-9]{64}$/);
  expect(key).not.toContain('example'); expect(key).not.toContain('personal-budget');
  expect(key).toBe(await hoursAccountKey({ ...principal, email: 'A@example.test' }, webcrypto));
  for (const patch of [{ id: 'other' }, { tenantId: 'other' }, { email: 'b@example.test' }]) {
    expect(key).not.toBe(await hoursAccountKey({ ...principal, ...patch }, webcrypto));
  }
  await expect(hoursAccountKey({ email: principal.email }, webcrypto)).rejects.toThrow('HOURS_ACCOUNT_REQUIRED');
});
test('encrypted roundtrip binds the account, validates data and rejects wrong phrase or tampering', async () => {
  const vault = await createHoursVault(subject, 'synthetic hours phrase', 'Europe/Zurich', webcrypto);
  const next = state([entry()]);
  const text = await sealHoursVault(vault, next, webcrypto);
  expect(text).not.toContain('2026-10-18'); expect(text).not.toContain(subject);
  expect(JSON.parse(text)).toMatchObject({ schema: HOURS_SCHEMA });
  expect((await openHoursVault(text, 'synthetic hours phrase', subject, webcrypto)).state).toEqual(next);
  await expect(openHoursVault(text, 'wrong synthetic phrase', subject, webcrypto)).rejects.toBeDefined();
  await expect(openHoursVault(text, 'synthetic hours phrase', `${HOURS_STORAGE_SCHEMA}.${'b'.repeat(64)}`, webcrypto)).rejects.toBeDefined();
  const changed = JSON.parse(text); changed.iv = btoa('123456789012');
  await expect(openHoursVault(JSON.stringify(changed), 'synthetic hours phrase', subject, webcrypto)).rejects.toBeDefined();
});
test('no salary or employee-return schema, extra identity fields, forged minutes or future dates are accepted', () => {
  expect(validateHoursState(state([entry()]), subject, now)).toEqual(state([entry()]));
  for (const patch of [{ schema: '2sg.work-hours.local.v1' }, { employee_key: 'foreign' }, { subject: 'other' }, { timezone: 'Unknown/Zone' }, { entries: 'bad' }]) {
    expect(() => validateHoursState({ ...state([]), ...patch }, subject, now)).toThrow();
  }
  for (const patch of [{ minutes: 0 }, { pause: '15' }, { overnight: 'false' }, { date: '2026-02-30' }, { date: '2026-10-20' },
    { id: '' }, { start: '24:00' }, { end: '14:00' }, { pause: 120 }, { secret: 'not-allowed' }]) {
    expect(() => validateHoursState(state([{ ...entry(), ...patch }]), subject, now)).toThrow();
  }
  expect(() => validateHoursState(state([entry(), entry()]), subject, now)).toThrow();
});
test('append-only merge ignores exact duplicates and never replaces existing versions or overlaps', () => {
  const original = state([entry()]), snapshot = JSON.stringify(original);
  const duplicate = appendHours(original, [{ ...entry(), id: 'HOUR-another-id' }], now);
  expect(duplicate.skipped).toBe(1); expect(duplicate.state).toEqual(original);
  const later = { ...entry(), id: 'HOUR-later', start: '18:00', end: '19:00', pause: 0, minutes: 60 };
  expect(appendHours(original, [later], now).state.entries).toHaveLength(2);
  for (const next of [{ ...entry(), pause: 0, minutes: 120 }, { ...later, start: '16:00', minutes: 180 }]) {
    expect(() => appendHours(original, [next], now)).toThrow('HOURS_COLLISION');
  }
  expect(JSON.stringify(original)).toBe(snapshot);
});
test('night overlap is checked while clock-change dates require manual review, not a guessed duration', () => {
  const night = { ...entry(), start: '22:00', end: '05:00', pause: 60, overnight: true, minutes: 360 };
  const morning = { ...entry(), id: 'HOUR-morning', date: '2026-10-19', start: '04:00', end: '06:00', pause: 0, minutes: 120 };
  expect(() => appendHours(state([night]), [morning], now)).toThrow('HOURS_COLLISION');
  const clock = { ...entry(), date: '2026-10-25' };
  expect(() => validateHoursState(state([clock]), subject, new Date('2026-10-26T12:00Z'))).toThrow('HOURS_CLOCK_CHANGE');
  expect(validateHoursState({ ...state([clock]), timezone: 'Africa/Dakar' }, subject, new Date('2026-10-26T12:00Z')).entries).toHaveLength(1);
});
test('strict envelope/file bounds, passphrase and immutable time zone are enforced', async () => {
  await expect(createHoursVault(subject, 'short', 'Europe/Zurich', webcrypto)).rejects.toThrow('HOURS_PHRASE_REQUIRED');
  for (const text of ['{}', 'x'.repeat(3 * 1024 * 1024), JSON.stringify({ schema: 'm3s.personal-budget.v1' })]) {
    await expect(openHoursVault(text, 'synthetic hours phrase', subject, webcrypto)).rejects.toThrow();
  }
  const vault = await createHoursVault(subject, 'synthetic hours phrase', 'Europe/Zurich', webcrypto);
  await expect(sealHoursVault(vault, { ...state([]), timezone: 'Africa/Dakar' }, webcrypto)).rejects.toThrow('HOURS_ZONE_MISMATCH');
  const text = JSON.parse(await sealHoursVault(vault, state([]), webcrypto));
  text.extra = 'not allowed';
  await expect(openHoursVault(JSON.stringify(text), 'synthetic hours phrase', subject, webcrypto)).rejects.toThrow('HOURS_INVALID');
});
test('entry creation and month extracts preserve unknown/invalid forms rather than zero and never mutate history', () => {
  const { id, minutes, ...fields } = entry();
  const made = newHourEntry({ ...fields, work: work() }, { randomUUID: () => 'synthetic-uuid' });
  expect(made).toMatchObject({ id: 'HOUR-synthetic-uuid', minutes: 105 });
  expect(() => newHourEntry({ ...fields, work: work(), pause: NaN }, webcrypto)).toThrow('HOURS_INVALID');
  expect(() => newHourEntry({ ...fields, work: work(), owner: 'other' }, webcrypto)).toThrow('HOURS_WORK_INVALID');
  expect(() => newHourEntry(fields, webcrypto)).toThrow('HOURS_WORK_INVALID');
  expect(hoursMonth(state([entry()]), '2026-09')).toEqual([]);
  expect(hoursMonth(state([entry()]), '2026-10')).toEqual([entry()]);
  expect(() => hoursMonth(state([]), '')).toThrow('HOURS_INVALID');
  expect(hoursDuration(105)).toBe('1 h 45');
});

test('v1 encrypted records reopen under the same account key with every old entry unchanged and unlinked', async () => {
  const vault = await createHoursVault(subject, 'synthetic hours phrase', 'Europe/Zurich', webcrypto);
  const legacy = { ...state([entry()]), schema: HOURS_STORAGE_SCHEMA };
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const bytes = await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(subject) },
    vault.key, new TextEncoder().encode(JSON.stringify(legacy)));
  const text = JSON.stringify({ schema: HOURS_STORAGE_SCHEMA, salt: Buffer.from(vault.salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'), ciphertext: Buffer.from(bytes).toString('base64') });
  const opened = await openHoursVault(text, 'synthetic hours phrase', subject, webcrypto);
  expect(opened.state.schema).toBe(HOURS_SCHEMA); expect(opened.state.entries).toEqual(legacy.entries);
  expect(opened.state.entries[0]).not.toHaveProperty('work');
  expect(JSON.parse(text).schema).toBe(HOURS_STORAGE_SCHEMA);
  const exported = await sealHoursVault(opened, opened.state, webcrypto);
  expect(JSON.parse(exported).schema).toBe(HOURS_SCHEMA);
  expect((await openHoursVault(exported, 'synthetic hours phrase', subject, webcrypto)).state.entries).toEqual(legacy.entries);
});

test('work links survive encryption and different links on the same hours refuse replacement or silent deduplication', async () => {
  const linked = { ...entry(), work: work() }, next = state([linked]);
  const vault = await createHoursVault(subject, 'synthetic hours phrase', 'Europe/Zurich', webcrypto);
  const encrypted = await sealHoursVault(vault, next, webcrypto);
  expect(encrypted).not.toContain(linked.work.task_reference);
  expect((await openHoursVault(encrypted, 'synthetic hours phrase', subject, webcrypto)).state).toEqual(next);
  expect(appendHours(next, [{ ...linked, id: 'HOUR-copy' }], now).skipped).toBe(1);
  const other = { ...linked, id: 'HOUR-other', work: { ...linked.work, task_id: 'different-task' } };
  expect(() => appendHours(next, [other], now)).toThrow('HOURS_COLLISION');
  expect(() => appendHours(state([]), [linked, other], now)).toThrow('HOURS_COLLISION');
  expect(() => appendHours(state([entry()]), [linked], now)).toThrow('HOURS_COLLISION');
  expect(next.entries[0].work.task_id).toBe('task-test');
});
