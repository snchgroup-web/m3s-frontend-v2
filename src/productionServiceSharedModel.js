import { createServiceCycle, SERVICE_CYCLE_SOURCES, validateServiceCycle } from './productionServiceCycleModel';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function sameServiceValue(a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
  const keys = Object.keys(a).sort();
  return keys.length === Object.keys(b).length && keys.every(key => Object.hasOwn(b, key) && sameServiceValue(a[key], b[key]));
}
const fail = () => { throw new Error('SERVICE_RESPONSE_INVALID'); };
const fields = (value, names) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !names.includes(key))) fail();
};
export function readServiceCapabilities(payload) {
  if (payload?.storage !== 'shared' || payload.acceptance_kind !== 'reported_not_signed' || !Array.isArray(payload.items) || payload.items.length > 2) fail();
  const seen = new Set();
  return payload.items.map(row => {
    fields(row, ['track', 'can_read', 'can_prepare', 'can_deliver', 'can_accept']);
    if (!Object.hasOwn(SERVICE_CYCLE_SOURCES, row.track) || seen.has(row.track) || row.can_read !== true ||
        ['can_prepare', 'can_deliver', 'can_accept'].some(key => typeof row[key] !== 'boolean')) fail();
    seen.add(row.track);
    return row;
  });
}
function readPreparation(row, track) {
  if (!row || !UUID.test(row.id) || row.track !== track || !Number.isInteger(row.revision) || row.revision < 0 || row.revision > 60) fail();
  return createServiceCycle({ id: `LOCAL-SVC-${row.id}`, track, source_ids: SERVICE_CYCLE_SOURCES[track],
    scope: row.scope, owner: row.owner, project_reference: row.project_reference, authorization_reference: row.authorization_reference });
}
export function readSharedCycleList(payload, track) {
  if (payload?.storage !== 'shared' || !Array.isArray(payload.items) || payload.items.length > 100) fail();
  const seen = new Set();
  return payload.items.map(row => {
    fields(row, ['id', 'track', 'scope', 'owner', 'project_reference', 'authorization_reference', 'revision', 'created_at']);
    readPreparation(row, track);
    if (seen.has(row.id) || !Number.isFinite(Date.parse(row.created_at))) fail();
    seen.add(row.id);
    return row;
  });
}
export function readSharedCycle(payload, track) {
  const row = payload?.item;
  if (payload?.storage !== 'shared') fail();
  fields(row, ['id', 'track', 'scope', 'owner', 'project_reference', 'authorization_reference', 'revision', 'events', 'audit', 'references_verified', 'acceptance_kind']);
  const base = readPreparation(row, track);
  if (row.references_verified !== false || row.acceptance_kind !== 'reported_not_signed' || !Array.isArray(row.events) ||
      row.events.length !== row.revision || !Array.isArray(row.audit) || row.audit.length !== row.revision) fail();
  row.audit.forEach((entry, i) => {
    fields(entry, ['revision', 'actor', 'recorded_at']);
    if (entry.revision !== i + 1 || !/^[a-f0-9]{64}$/.test(entry.actor) || !Number.isFinite(Date.parse(entry.recorded_at))) fail();
  });
  const { cycle } = validateServiceCycle({ ...base, events: row.events });
  if (!sameServiceValue(cycle.events, row.events)) fail();
  return { record: row, cycle };
}
export function serviceRequestId() {
  if (!window.crypto?.randomUUID) throw new Error('SERVICE_SECURE_CONTEXT_REQUIRED');
  return window.crypto.randomUUID();
}
