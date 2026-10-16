import { createServiceCycle, appendServiceCycleEvent } from './productionServiceCycleModel';
import { readServiceCapabilities, readSharedCycle, readSharedCycleList, sameServiceValue } from './productionServiceSharedModel';

const id = '12345678-1234-4123-8123-123456789abc';
const setup = { track: 'documents', scope: 'Fictitious scope', owner: 'Fictitious function', project_reference: null, authorization_reference: 'TEST-SCOPE' };
const row = { id, ...setup, revision: 0, events: [], audit: [], references_verified: false, acceptance_kind: 'reported_not_signed' };
const envelope = item => ({ storage: 'shared', item });

test('reads explicitly scoped capabilities and never infers access from a role', () => {
  expect(readServiceCapabilities({ storage: 'shared', acceptance_kind: 'reported_not_signed', items: [{ track: 'documents', can_read: true, can_prepare: false, can_deliver: true, can_accept: false }] })[0].can_prepare).toBe(false);
  expect(() => readServiceCapabilities({ storage: 'shared', acceptance_kind: 'reported_not_signed', items: [{ track: 'documents', role: 'Manager' }] })).toThrow();
});
test('reuses the existing cycle model without promoting a local ID or import', () => {
  const read = readSharedCycle(envelope(row), 'documents');
  expect(read.record.id).toBe(id);
  expect(read.cycle.id).toBe(`LOCAL-SVC-${id}`);
  expect(() => readSharedCycle(envelope({ ...row, id: 'LOCAL-SVC-demo' }), 'documents')).toThrow();
  expect(() => readSharedCycle(envelope(row), 'rh')).toThrow();
});
test('accepts PostgreSQL JSONB key order but not changed history or audit', () => {
  const base = createServiceCycle({ ...setup, id: `LOCAL-SVC-${id}`, source_ids: ['GD-005', 'GD-006'] });
  const cycle = appendServiceCycleEvent(base, { step: 'realization', occurred_on: '2026-10-12', evidence_reference: 'TEST', deliverable_reference: 'TEST-DELIVERY', version: 'V1' }).cycle;
  const event = Object.fromEntries(Object.entries(cycle.events[0]).reverse());
  const complete = { ...row, revision: 1, events: [event], audit: [{ revision: 1, actor: 'a'.repeat(64), recorded_at: '2026-10-12T12:00:00Z' }] };
  expect(readSharedCycle(envelope(complete), 'documents').cycle.events).toHaveLength(1);
  expect(() => readSharedCycle(envelope({ ...complete, audit: [] }), 'documents')).toThrow();
  expect(() => readSharedCycle(envelope({ ...complete, events: [{ ...event, salary: 50000 }] }), 'documents')).toThrow();
  expect(sameServiceValue({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
});
test('rejects fictional storage, missing revision, verified/signed claims and confidential extras', () => {
  for (const bad of [{ ...row, revision: 1 }, { ...row, references_verified: true }, { ...row, acceptance_kind: 'signed' }, { ...row, salary: 50000 }]) {
    expect(() => readSharedCycle(envelope(bad), 'documents')).toThrow();
  }
  expect(() => readSharedCycle({ storage: 'local', item: row }, 'documents')).toThrow();
});
test('checks list bounds, unique IDs, path and dates', () => {
  const { events, audit, references_verified, acceptance_kind, ...summary } = row;
  summary.created_at = '2026-10-12T12:00:00Z';
  expect(readSharedCycleList({ storage: 'shared', items: [summary] }, 'documents')).toHaveLength(1);
  for (const items of [[summary, summary], [{ ...summary, created_at: 'bad' }], Array(101).fill(summary)]) {
    expect(() => readSharedCycleList({ storage: 'shared', items }, 'documents')).toThrow();
  }
});
