export const SERVICE_CYCLE_SCHEMA = 'm3s.production.service-cycle.preparation.v1';
export const SERVICE_CYCLE_SOURCES = Object.freeze({ documents: Object.freeze(['GD-005', 'GD-006']), rh: Object.freeze(['GD-008', 'GD-009']) });
const ROOT_KEYS = ['schema', 'mode', 'id', 'track', 'source_ids', 'scope', 'owner', 'project_reference', 'authorization_reference', 'events'];
const EVENT_KEYS = {
  realization: ['step', 'occurred_on', 'evidence_reference', 'deliverable_reference', 'version'],
  delivery: ['step', 'occurred_on', 'evidence_reference', 'recipient', 'channel', 'deliverable_reference', 'version'],
  acceptance: ['step', 'occurred_on', 'evidence_reference', 'recipient', 'outcome', 'reservations', 'delivery_event_index']
};
const fail = code => { throw new Error(code); };
const keys = (value, allowed) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !allowed.includes(key))) fail('invalid');
};
const text = (value, max = 300) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max || [...value].some(character => character.charCodeAt(0) < 32)) fail('required');
  return value.trim();
};
const reference = value => {
  const result = text(value);
  if (/^(data|javascript|file):|^[A-Za-z]:[\\/]|^\\\\/i.test(result) || /(?:[?&](?:token|apiKey|oobCode|password)=)/i.test(result)) fail('invalid');
  return result;
};
export const serviceCycleToday = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Zurich' }).format(new Date());
const date = (value, today) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail('date');
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value || value > today) fail('date');
  return value;
};
export function hasServiceCycleSources(track, ids) {
  const expected = Object.hasOwn(SERVICE_CYCLE_SOURCES, track) ? SERVICE_CYCLE_SOURCES[track] : null;
  return Boolean(expected && Array.isArray(ids) && ids.length === expected.length && new Set(ids).size === ids.length && expected.every(id => ids.includes(id)));
}
export function createServiceCycle(input) {
  keys(input, ['id', 'track', 'source_ids', 'scope', 'owner', 'project_reference', 'authorization_reference']);
  if (!/^LOCAL-SVC-[A-Za-z0-9-]{1,80}$/.test(input.id || '') || !hasServiceCycleSources(input.track, input.source_ids)) fail('source');
  if (input.project_reference !== undefined && input.project_reference !== null && typeof input.project_reference !== 'string') fail('invalid');
  return {
    schema: SERVICE_CYCLE_SCHEMA, mode: 'local_preparation', id: input.id, track: input.track,
    source_ids: [...SERVICE_CYCLE_SOURCES[input.track]], scope: text(input.scope, 800), owner: text(input.owner, 160),
    project_reference: input.project_reference ? reference(input.project_reference) : null,
    authorization_reference: reference(input.authorization_reference), events: []
  };
}

function advance(cycle, input, state, today) {
  const eventKeys = input && Object.hasOwn(EVENT_KEYS, input.step) ? EVENT_KEYS[input.step] : null;
  if (!eventKeys) fail('invalid');
  keys(input, eventKeys);
  const last = cycle.events[cycle.events.length - 1];
  const occurred_on = date(input.occurred_on, today);
  if (last && occurred_on < last.occurred_on) fail('chronology');
  const common = { step: input.step, occurred_on, evidence_reference: reference(input.evidence_reference) };
  let event;
  let next;
  if (input.step === 'realization') {
    if (!['planned', 'reserved', 'rejected'].includes(state)) fail('transition');
    event = { ...common, deliverable_reference: reference(input.deliverable_reference), version: text(input.version, 80) };
    const previous = [...cycle.events].reverse().find(item => item.step === 'realization');
    if (previous && previous.deliverable_reference === event.deliverable_reference && previous.version === event.version) fail('version');
    next = 'realized';
  } else if (input.step === 'delivery') {
    if (state !== 'realized') fail('transition');
    if (!['email', 'secure_link', 'hand_delivery'].includes(input.channel)) fail('invalid');
    if ((input.version !== undefined && input.version !== last.version) ||
        (input.deliverable_reference !== undefined && input.deliverable_reference !== last.deliverable_reference)) fail('version');
    event = { ...common, recipient: text(input.recipient, 160), channel: input.channel,
      deliverable_reference: last.deliverable_reference, version: last.version };
    next = 'delivered';
  } else {
    if (state !== 'delivered') fail('transition');
    if (!['accepted', 'reserved', 'rejected'].includes(input.outcome)) fail('invalid');
    const recipient = text(input.recipient, 160);
    if (recipient !== last.recipient) fail('recipient');
    const deliveryIndex = cycle.events.length - 1;
    if (input.delivery_event_index !== undefined && input.delivery_event_index !== deliveryIndex) fail('version');
    const reservations = input.outcome === 'accepted' ? null : text(input.reservations, 800);
    if (input.outcome === 'accepted' && input.reservations) fail('reservations');
    event = { ...common, recipient, outcome: input.outcome, reservations, delivery_event_index: deliveryIndex };
    next = input.outcome;
  }
  return { cycle: { ...cycle, events: [...cycle.events, event] }, state: next };
}

// Replay is the only source of stage state; an imported status cannot bypass the evidence gates.
function replay(input, today) {
  keys(input, ROOT_KEYS);
  if (input.schema !== SERVICE_CYCLE_SCHEMA || input.mode !== 'local_preparation' || !Array.isArray(input.events) || input.events.length > 60) fail('invalid');
  let cycle = createServiceCycle(Object.fromEntries(['id', 'track', 'source_ids', 'scope', 'owner', 'project_reference', 'authorization_reference'].map(key => [key, input[key]])));
  let state = 'planned';
  for (const event of input.events) ({ cycle, state } = advance(cycle, event, state, today));
  return { cycle, state };
}
export function validateServiceCycle(input, { track, sourceIds, today = serviceCycleToday() } = {}) {
  const result = replay(input, today);
  if (track !== undefined && (result.cycle.track !== track || !hasServiceCycleSources(track, sourceIds))) fail('source');
  return result;
}
export function appendServiceCycleEvent(input, event, { today = serviceCycleToday() } = {}) {
  const { cycle, state } = replay(input, today);
  if (cycle.events.length >= 60) fail('limit');
  return advance(cycle, event, state, today);
}
export function readServiceCycleFile(value, context) {
  if (typeof value !== 'string' || value.length > 100000) fail('invalid');
  let parsed;
  try { parsed = JSON.parse(value); } catch { fail('invalid'); }
  return validateServiceCycle(parsed, context);
}
export function serviceCycleJson(cycle) {
  return JSON.stringify(validateServiceCycle(cycle).cycle, null, 2) + '\n';
}
