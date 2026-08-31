import {
  INBOX_PILOT_CASES,
  INBOX_PILOT_EXECUTION,
  INBOX_PILOT_REQUIRED_FIELDS,
  INBOX_PILOT_STATES,
  runInstitutionalM3SInboxPilot
} from './institutionalM3SInboxPilot';

test('executes all six fictional Inbox cases and resets the in-memory dataset', () => {
  expect(INBOX_PILOT_EXECUTION.protocol).toBe('M3S-INB-002 V1.0');
  expect(INBOX_PILOT_EXECUTION.decision).toBe('REF-01-DEC-076 V1.0');
  expect(INBOX_PILOT_EXECUTION.cases).toHaveLength(6);
  expect(INBOX_PILOT_EXECUTION.summary).toMatchObject({
    authorised: 6,
    executed: 6,
    passed: 6,
    technicalCriteriaPassed: 5,
    humanReview: 'pending',
    realDataItems: 0,
    networkCalls: 0,
    imports: 0,
    connectors: 0,
    automations: 0,
    persistenceWrites: 0,
    l2Actions: 0,
    storeSizeAfterReset: 0,
    resetCompleted: true
  });
});

test('checks ten governed fields and completes the normal six-state cycle', () => {
  expect(INBOX_PILOT_REQUIRED_FIELDS).toHaveLength(10);
  const normalCases = INBOX_PILOT_EXECUTION.cases.slice(0, 4);
  normalCases.forEach((item) => {
    expect(item.requiredFieldsChecked).toBe(10);
    expect(item.trace).toEqual(INBOX_PILOT_STATES);
    expect(item.outcome).toBe('cycle-completed');
  });
});

test('blocks the duplicate without creating a second record', () => {
  const duplicate = INBOX_PILOT_EXECUTION.cases.find((item) => item.kind === 'duplicate');
  expect(duplicate).toMatchObject({ passed: true, created: false, outcome: 'duplicate-blocked' });
});

test('blocks the restricted case in the simulated secure hold', () => {
  const restricted = INBOX_PILOT_EXECUTION.cases.find((item) => item.kind === 'restricted-entry');
  expect(restricted).toMatchObject({ passed: true, created: true, outcome: 'restricted-blocked' });
});

test('stops before processing a non-fictional input', () => {
  const unsafe = { ...INBOX_PILOT_CASES[0], id: 'UNSAFE-001', fictional: false };
  expect(() => runInstitutionalM3SInboxPilot([unsafe])).toThrow(/Pilot stopped before UNSAFE-001/);
});
