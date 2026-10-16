import { appendServiceCycleEvent, createServiceCycle, hasServiceCycleSources, readServiceCycleFile, serviceCycleJson, validateServiceCycle } from './productionServiceCycleModel';

const context = { today: '2026-10-16' };
const seed = patch => createServiceCycle({ id: 'LOCAL-SVC-TEST', track: 'documents', source_ids: ['GD-005', 'GD-006'], scope: 'Dossier fictif', owner: 'Fonction fictive', authorization_reference: 'CADRAGE-FICTIF', ...patch });
const realized = (version = 'V1') => ({ step: 'realization', occurred_on: '2026-10-12', evidence_reference: 'CONTROLE-FICTIF', deliverable_reference: 'LIVRABLE-FICTIF', version });
const delivered = () => ({ step: 'delivery', occurred_on: '2026-10-13', evidence_reference: 'COR-FICTIF', recipient: 'Interlocuteur fictif', channel: 'email' });
const accepted = (outcome = 'accepted') => ({ step: 'acceptance', occurred_on: '2026-10-14', evidence_reference: 'RETOUR-FICTIF', recipient: 'Interlocuteur fictif', outcome, ...(outcome !== 'accepted' ? { reservations: 'Point fictif à corriger' } : {}) });
const add = (cycle, event) => appendServiceCycleEvent(cycle, event, context);
const handover = () => add(add(seed(), realized()).cycle, delivered()).cycle;

test('new preparation has no inferred fact, date, client, wage or cost', () => {
  const result = validateServiceCycle(seed(), context);
  expect(result.state).toBe('planned');
  expect(result.cycle.events).toEqual([]);
  expect(result.cycle.project_reference).toBeNull();
  for (const field of ['salary', 'cost', 'customer', 'accepted_at']) expect(result.cycle).not.toHaveProperty(field);
});
test('three stages bind version, recipient, evidence and chronology without mutation', () => {
  const before = seed();
  const r = add(before, realized());
  const d = add(r.cycle, delivered());
  const a = add(d.cycle, accepted());
  expect([r.state, d.state, a.state]).toEqual(['realized', 'delivered', 'accepted']);
  expect(before.events).toEqual([]);
  expect(d.cycle.events[1]).toMatchObject({ deliverable_reference: 'LIVRABLE-FICTIF', version: 'V1' });
  expect(a.cycle.events[2]).toMatchObject({ delivery_event_index: 1, outcome: 'accepted', reservations: null });
});
test.each(['reserved', 'rejected'])('%s preserves history and requires a new version for rework', outcome => {
  const result = add(handover(), accepted(outcome));
  expect(result.state).toBe(outcome);
  expect(() => add(result.cycle, { ...realized(), occurred_on: '2026-10-15' })).toThrow('version');
  const r = add(result.cycle, { ...realized('V2'), occurred_on: '2026-10-15' });
  const d = add(r.cycle, { ...delivered(), occurred_on: '2026-10-15' });
  const a = add(d.cycle, { ...accepted(), occurred_on: '2026-10-16' });
  expect(a.state).toBe('accepted');
  expect(a.cycle.events).toHaveLength(6);
  expect(a.cycle.events[2].outcome).toBe(outcome);
  expect(a.cycle.events[4].version).toBe('V2');
  expect(a.cycle.events[5].delivery_event_index).toBe(4);
});
test.each([delivered(), accepted(), { ...realized(), step: 'constructor' }, { ...realized(), step: 'unknown' }])('cannot skip a stage with %p', event => {
  expect(() => add(seed(), event)).toThrow();
});
test('a closed preparation cannot be amended', () => {
  expect(() => add(add(handover(), accepted()).cycle, { ...realized('V2'), occurred_on: '2026-10-15' })).toThrow('transition');
});
test.each(['', null, '2026-02-30', '2026-13-01', '16/10/26', '2026-10-17'])('rejects invalid or future date %p', occurred_on => {
  expect(() => add(seed(), { ...realized(), occurred_on })).toThrow('date');
});
test('rejects a backwards date', () => {
  expect(() => add(handover(), { ...accepted(), occurred_on: '2026-10-12' })).toThrow('chronology');
});
test.each(['evidence_reference', 'deliverable_reference', 'version'])('requires realization field %s', key => {
  expect(() => add(seed(), { ...realized(), [key]: '' })).toThrow('required');
});
test.each(['evidence_reference', 'recipient'])('requires handover field %s', key => {
  expect(() => add(add(seed(), realized()).cycle, { ...delivered(), [key]: '' })).toThrow('required');
});
test.each(['recipient', 'version', 'deliverable_reference'])('rejects mismatched %s', key => {
  const event = key === 'recipient' ? { ...accepted(), recipient: 'Autre personne' } : { ...delivered(), [key]: 'AUTRE' };
  expect(() => add(key === 'recipient' ? handover() : add(seed(), realized()).cycle, event)).toThrow(key === 'recipient' ? 'recipient' : 'version');
});
test.each(['reserved', 'rejected'])('%s requires a reason', outcome => {
  expect(() => add(handover(), { ...accepted(outcome), reservations: '' })).toThrow('required');
});
test('acceptance without reservations cannot retain reservations', () => {
  expect(() => add(handover(), { ...accepted(), reservations: 'Point restant' })).toThrow('reservations');
});
test('export/replay preserves history, and repeated import does not duplicate it', () => {
  const closed = add(handover(), accepted()).cycle;
  const json = serviceCycleJson(closed);
  const current = { ...context, track: 'documents', sourceIds: ['GD-006', 'GD-005'] };
  expect(readServiceCycleFile(json, current).cycle).toEqual(closed);
  expect(readServiceCycleFile(json, current).cycle.events).toHaveLength(3);
});
test.each([
  c => ({ ...c, mode: 'production' }), c => ({ ...c, status: 'accepted' }), c => ({ ...c, salary: 50000 }),
  c => ({ ...c, source_ids: ['GD-008', 'GD-009'] }), c => ({ ...c, events: [accepted()] }),
  c => ({ ...c, events: [realized(), { ...delivered(), version: 'V99' }] }),
  c => ({ ...c, events: [realized(), delivered(), { ...accepted(), delivery_event_index: 0 }] })
])('rejects a tampered imported preparation', change => {
  expect(() => readServiceCycleFile(JSON.stringify(change(seed())), { ...context, track: 'documents', sourceIds: ['GD-005', 'GD-006'] })).toThrow();
});
test.each(['data:application/pdf;base64,test', 'javascript:alert(1)', 'file:///private/test', 'C:\\private\\test.pdf', 'https://example.invalid/?oobCode=secret'])('rejects unsafe reference %s', evidence_reference => {
  expect(() => add(seed(), { ...realized(), evidence_reference })).toThrow('invalid');
});
test.each(['base64', 'file', 'content', 'salary', 'tenant_id'])('rejects unexpected event field %s', key => {
  expect(() => add(seed(), { ...realized(), [key]: 'not allowed' })).toThrow('invalid');
});
test.each(['documents', 'rh'])('requires the complete %s source set', track => {
  const ids = track === 'documents' ? ['GD-005', 'GD-006'] : ['GD-008', 'GD-009'];
  expect(hasServiceCycleSources(track, ids)).toBe(true);
  expect(hasServiceCycleSources(track, ids.slice(0, 1))).toBe(false);
  expect(hasServiceCycleSources(track, [ids[0], ids[0]])).toBe(false);
});
test('rejects invalid, oversized and mismatched files', () => {
  expect(() => readServiceCycleFile('{')).toThrow('invalid');
  expect(() => readServiceCycleFile(' '.repeat(100001))).toThrow('invalid');
  expect(() => readServiceCycleFile(serviceCycleJson(seed()), { track: 'rh', sourceIds: ['GD-008', 'GD-009'] })).toThrow('source');
  expect(hasServiceCycleSources('constructor', [])).toBe(false);
});
test('history is bounded even after repeated rework', () => {
  let cycle = seed();
  for (let n = 1; n <= 20; n++) {
    cycle = add(cycle, { ...realized(`V${n}`), occurred_on: '2026-10-14' }).cycle;
    cycle = add(cycle, { ...delivered(), occurred_on: '2026-10-14' }).cycle;
    cycle = add(cycle, accepted('reserved')).cycle;
  }
  expect(cycle.events).toHaveLength(60);
  expect(() => add(cycle, { ...realized('V21'), occurred_on: '2026-10-14' })).toThrow('limit');
});
