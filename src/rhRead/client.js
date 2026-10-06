const fail = code => { throw Object.assign(new Error(code), { code }); };
const keys = (value, expected) => value && typeof value === 'object' && !Array.isArray(value) &&
  Object.keys(value).sort().join(',') === [...expected].sort().join(',');
const errors = new Set(['RH_NOT_ENABLED', 'RH_AUTH_REQUIRED', 'RH_ORIGIN_DENIED', 'RH_ACCESS_DENIED',
  'RH_ENTITLEMENT_SOURCE_UNAVAILABLE', 'RH_INVALID_PAGE', 'RH_SERVICE_UNAVAILABLE']);

function item(value) {
  if (!keys(value, ['employeeId', 'revision', 'displayName', 'positionRef', 'siteRef',
    'employmentStartDate', 'status', 'classification']) || value.status !== 'draft' ||
    value.classification !== 'C3' || !Number.isInteger(value.revision) ||
    value.revision < 1 || value.revision >= 10000 || typeof value.employeeId !== 'string' ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value.employeeId) ||
    typeof value.displayName !== 'string' || !value.displayName || [...value.displayName].length > 160 ||
    value.displayName !== value.displayName.trim().normalize('NFC') || /[<>@]/.test(value.displayName) ||
    [...value.displayName].some(character => character.charCodeAt(0) < 32)) fail('RH_INVALID_RESPONSE');
  for (const field of ['positionRef', 'siteRef']) {
    if (value[field] !== null && (typeof value[field] !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(value[field]))) fail('RH_INVALID_RESPONSE');
  }
  const date = value.employmentStartDate;
  if (date !== null) {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('RH_INVALID_RESPONSE');
    const parsed = new Date(`${date}T12:00:00Z`);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) fail('RH_INVALID_RESPONSE');
  }
  return Object.freeze({ ...value, employeeId: value.employeeId.toLowerCase() });
}

// Read-only promotion of the qualified client; no creation or revision commands.
export function createRhClient({ enabled = false, transport } = {}) {
  return Object.freeze({ async list({ limit = 50, offset = 0, signal } = {}) {
    if (enabled !== true || typeof transport !== 'function') fail('RH_NOT_ENABLED');
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(offset) || offset < 0 || offset > 100000) fail('RH_INVALID_PAGE');
    if (signal?.aborted) fail('RH_ABORTED');
    let response;
    try { response = await transport(`/employees?limit=${limit}&offset=${offset}`, { method: 'GET', cache: 'no-store', signal }); }
    catch { fail(signal?.aborted ? 'RH_ABORTED' : 'RH_TRANSPORT_UNAVAILABLE'); }
    if (signal?.aborted) fail('RH_ABORTED');
    if (!response || !Number.isInteger(response.status) || typeof response.json !== 'function') fail('RH_INVALID_RESPONSE');
    let data;
    try { data = await response.json(); } catch { fail(signal?.aborted ? 'RH_ABORTED' : 'RH_INVALID_RESPONSE'); }
    if (signal?.aborted) fail('RH_ABORTED');
    if (response.status === 401) fail('RH_AUTH_REQUIRED');
    if (response.status !== 200) fail(errors.has(data?.code) ? data.code : 'RH_SERVICE_UNAVAILABLE');
    if (!keys(data, ['items', 'limit', 'offset', 'candidate']) || data.candidate !== true ||
        data.limit !== limit || data.offset !== offset || !Array.isArray(data.items) || data.items.length > limit) fail('RH_INVALID_RESPONSE');
    const items = data.items.map(item);
    if (new Set(items.map(row => row.employeeId)).size !== items.length) fail('RH_INVALID_RESPONSE');
    return Object.freeze({ items: Object.freeze(items), limit, offset, loadedCount: items.length, total: null, candidate: true });
  } });
}
