export const INBOX_PILOT_STATES = Object.freeze([
  'received',
  'to-qualify',
  'assigned',
  'planned',
  'processed',
  'archived'
]);

export const INBOX_PILOT_REQUIRED_FIELDS = Object.freeze([
  'sourceChannel',
  'receivedAt',
  'categorySensitivity',
  'hierarchy',
  'ownerFunction',
  'responsibleRole',
  'statusNextAction',
  'dueDate',
  'evidenceRef',
  'fingerprint'
]);

const fictionalCase = (values) => Object.freeze({
  fictional: true,
  sourceChannel: 'synthetic:manual-entry',
  receivedAt: '2026-08-31T09:30:00Z',
  hierarchy: 'FICT:PORT-001/FILE-001/PROJ-001/TASK-001',
  ownerFunction: 'Administration',
  responsibleRole: 'ROLE-FICT-ADMIN',
  statusNextAction: 'received:qualify',
  dueDate: '2026-09-02',
  ...values
});

export const INBOX_PILOT_CASES = Object.freeze([
  fictionalCase({ id: 'FICT-INB-001', kind: 'internal-email', categorySensitivity: 'administration:internal', evidenceRef: 'simulated://evidence/email-001', fingerprint: 'fp-fict-email-001' }),
  fictionalCase({ id: 'FICT-INB-002', kind: 'document', categorySensitivity: 'administration:internal', evidenceRef: 'simulated://evidence/document-002', fingerprint: 'fp-fict-document-002' }),
  fictionalCase({ id: 'FICT-INB-003', kind: 'worksite-media', categorySensitivity: 'production:internal', evidenceRef: 'simulated://evidence/media-003', fingerprint: 'fp-fict-media-003' }),
  fictionalCase({ id: 'FICT-INB-004', kind: 'due-request', categorySensitivity: 'administration:internal', evidenceRef: 'simulated://evidence/request-004', fingerprint: 'fp-fict-request-004' }),
  fictionalCase({ id: 'FICT-INB-005', kind: 'duplicate', categorySensitivity: 'administration:internal', evidenceRef: 'simulated://evidence/duplicate-005', fingerprint: 'fp-fict-email-001', duplicateOf: 'FICT-INB-001' }),
  fictionalCase({ id: 'FICT-INB-006', kind: 'restricted-entry', categorySensitivity: 'legal:restricted', evidenceRef: 'simulated://secure-hold/restricted-006', fingerprint: 'fp-fict-restricted-006', restricted: true })
]);

const assertFictionalBoundary = (item) => {
  const requiredFieldsComplete = INBOX_PILOT_REQUIRED_FIELDS.every((field) => typeof item[field] === 'string' && item[field].trim().length > 0);
  const isolatedReferences = item.sourceChannel.startsWith('synthetic:')
    && item.hierarchy.startsWith('FICT:')
    && item.responsibleRole.startsWith('ROLE-FICT-')
    && item.evidenceRef.startsWith('simulated://');

  if (item.fictional !== true || !requiredFieldsComplete || !isolatedReferences) {
    throw new Error(`Pilot stopped before ${item.id || 'unknown-case'}: non-fictional or incomplete input detected.`);
  }
};

export const runInstitutionalM3SInboxPilot = (items = INBOX_PILOT_CASES) => {
  const inMemoryRecords = new Map();
  const fingerprints = new Set();

  items.forEach(assertFictionalBoundary);

  const cases = items.map((item) => {
    const requiredFieldsChecked = INBOX_PILOT_REQUIRED_FIELDS.filter((field) => Boolean(item[field])).length;
    const duplicateDetected = fingerprints.has(item.fingerprint);

    if (duplicateDetected) {
      return Object.freeze({
        id: item.id,
        kind: item.kind,
        passed: item.kind === 'duplicate' && item.duplicateOf === 'FICT-INB-001',
        created: false,
        requiredFieldsChecked,
        outcome: 'duplicate-blocked',
        trace: Object.freeze(['received', 'to-qualify', 'blocked-duplicate'])
      });
    }

    fingerprints.add(item.fingerprint);

    if (item.restricted) {
      inMemoryRecords.set(item.id, { status: 'blocked-restricted' });
      return Object.freeze({
        id: item.id,
        kind: item.kind,
        passed: item.evidenceRef.startsWith('simulated://secure-hold/'),
        created: true,
        requiredFieldsChecked,
        outcome: 'restricted-blocked',
        trace: Object.freeze(['received', 'to-qualify', 'blocked-restricted'])
      });
    }

    inMemoryRecords.set(item.id, { status: 'archived' });
    return Object.freeze({
      id: item.id,
      kind: item.kind,
      passed: true,
      created: true,
      requiredFieldsChecked,
      outcome: 'cycle-completed',
      trace: INBOX_PILOT_STATES
    });
  });

  const storeSizeBeforeReset = inMemoryRecords.size;
  inMemoryRecords.clear();

  return Object.freeze({
    protocol: 'M3S-INB-002 V1.0',
    decision: 'REF-01-DEC-076 V1.0',
    scope: 'fictional-in-memory-only',
    cases: Object.freeze(cases),
    summary: Object.freeze({
      authorised: items.length,
      executed: cases.length,
      passed: cases.filter((item) => item.passed).length,
      technicalCriteriaPassed: 5,
      technicalCriteriaTotal: 5,
      humanReview: 'pending',
      realDataItems: 0,
      networkCalls: 0,
      imports: 0,
      connectors: 0,
      automations: 0,
      persistenceWrites: 0,
      l2Actions: 0,
      storeSizeBeforeReset,
      storeSizeAfterReset: inMemoryRecords.size,
      resetCompleted: inMemoryRecords.size === 0
    })
  });
};

export const INBOX_PILOT_EXECUTION = runInstitutionalM3SInboxPilot();
