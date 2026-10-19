import { previousMonth, workMinutes, mergeWorkEntries } from './rhWorkHoursCore';
import { validateHoursWorkLink, sameHoursWorkLink } from './hoursWorkLink';

export const HOURS_STORAGE_SCHEMA = 'm3s.personal-hours.v1';
export const HOURS_SCHEMA = 'm3s.personal-hours.v2';
export const HOURS_ZONES = ['Europe/Zurich', 'Africa/Dakar'];
const dayFormats = new Map(HOURS_ZONES.map(timeZone => [timeZone, new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })]));
const offsetFormats = new Map(HOURS_ZONES.map(timeZone => [timeZone, new Intl.DateTimeFormat('en', { timeZone, timeZoneName: 'shortOffset' })]));
const MAX_FILE = 2 * 1024 * 1024;
const fail = code => { throw new Error(code); };
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const exact = (value, keys) => plain(value) && Object.keys(value).sort().join('|') === [...keys].sort().join('|');
const encoder = () => new TextEncoder();
const encode = bytes => {
  let text = '';
  for (let i = 0; i < bytes.length; i += 16384) text += String.fromCharCode(...bytes.subarray(i, i + 16384));
  return btoa(text);
};
const decode = text => {
  if (typeof text !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(text)) fail('HOURS_INVALID');
  const bytes = Uint8Array.from(atob(text), char => char.charCodeAt(0));
  if (encode(bytes) !== text) fail('HOURS_INVALID');
  return bytes;
};
export const hoursToday = (zone, now = new Date()) => {
  if (!HOURS_ZONES.includes(zone)) fail('HOURS_INVALID');
  return dayFormats.get(zone).format(now);
};
export async function hoursAccountKey(principal, crypto = window.crypto) {
  if (![principal?.id, principal?.tenantId, principal?.email].every(value => typeof value === 'string' && value.trim() && value.length <= 256)) fail('HOURS_ACCOUNT_REQUIRED');
  const bytes = await crypto.subtle.digest('SHA-256', encoder().encode(JSON.stringify([principal.tenantId, principal.id, principal.email.toLowerCase()])));
  return `${HOURS_STORAGE_SCHEMA}.${Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('')}`;
}
function normaliseEntry(entry, zone, today) {
  const keys = ['id','date','start','end','pause','overnight','minutes'];
  if (!(exact(entry, keys) || exact(entry, [...keys, 'work'])) || typeof entry.id !== 'string'
    || !/^HOUR-[A-Za-z0-9-]{1,80}$/.test(entry.id) || typeof entry.overnight !== 'boolean'
    || typeof entry.date !== 'string' || entry.date < '1900-01-01' || entry.date > today) fail('HOURS_INVALID');
  try {
    previousMonth(entry.date);
    const minutes = workMinutes(entry.start, entry.end, entry.pause, entry.overnight);
    if (entry.minutes !== minutes) fail('HOURS_INVALID');
  } catch { fail('HOURS_INVALID'); }
  // The reused civil-time calculator must not silently guess elapsed time on a clock-change date.
  const nextDay = date => new Date(Date.parse(`${date}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);
  const offset = date => offsetFormats.get(zone).formatToParts(new Date(`${date}T00:00:00Z`)).find(part => part.type === 'timeZoneName')?.value;
  for (const date of entry.overnight ? [entry.date, nextDay(entry.date)] : [entry.date]) {
    if (!offset(date) || offset(date) !== offset(nextDay(date))) fail('HOURS_CLOCK_CHANGE');
  }
  return Object.hasOwn(entry, 'work') ? { ...entry, work: validateHoursWorkLink(entry.work) } : { ...entry };
}
export function validateHoursState(value, subject, now = new Date()) {
  if (!exact(value, ['schema','subject','timezone','entries']) || ![HOURS_SCHEMA, HOURS_STORAGE_SCHEMA].includes(value.schema)
    || !new RegExp(`^${HOURS_STORAGE_SCHEMA.replaceAll('.', '\\.')}\\.[a-f0-9]{64}$`).test(subject)
    || value.subject !== subject || !HOURS_ZONES.includes(value.timezone) || !Array.isArray(value.entries)
    || value.entries.length > 2000 || JSON.stringify(value).length > MAX_FILE / 2) fail('HOURS_INVALID');
  if (value.schema === HOURS_STORAGE_SCHEMA && value.entries.some(entry => Object.hasOwn(entry, 'work'))) fail('HOURS_INVALID');
  const entries = value.entries.map(entry => normaliseEntry(entry, value.timezone, hoursToday(value.timezone, now)));
  if (new Set(entries.map(entry => entry.id)).size !== entries.length) fail('HOURS_INVALID');
  try { if (mergeWorkEntries([], entries).skipped) fail('HOURS_INVALID'); }
  catch { fail('HOURS_COLLISION'); }
  return { schema: HOURS_SCHEMA, subject, timezone: value.timezone, entries };
}
export function appendHours(state, incoming, now = new Date()) {
  const current = validateHoursState(state, state.subject, now);
  if (!Array.isArray(incoming) || incoming.length > 2000) fail('HOURS_INVALID');
  const entries = incoming.map(entry => normaliseEntry(entry, state.timezone, hoursToday(state.timezone, now)));
  const compared = [...current.entries];
  for (const entry of entries) {
    const duplicate = compared.find(old => old.id === entry.id ||
      ['date', 'start', 'end', 'overnight'].every(key => old[key] === entry[key]));
    if (duplicate && !sameHoursWorkLink(duplicate.work, entry.work)) fail('HOURS_COLLISION');
    compared.push(entry);
  }
  let merged;
  try { merged = mergeWorkEntries(current.entries, entries); } catch { fail('HOURS_COLLISION'); }
  return { state: validateHoursState({ ...current, entries: merged.entries }, state.subject, now), skipped: merged.skipped };
}
export function newHourEntry(fields, crypto = window.crypto) {
  if (!exact(fields, ['date','start','end','pause','overnight','work'])) fail('HOURS_WORK_INVALID');
  const work = validateHoursWorkLink(fields.work);
  try { return { id: `HOUR-${crypto.randomUUID()}`, ...fields, work, minutes: workMinutes(fields.start, fields.end, fields.pause, fields.overnight) }; }
  catch { fail('HOURS_INVALID'); }
}
async function derive(phrase, salt, crypto) {
  if (typeof phrase !== 'string' || phrase.length < 12 || phrase.length > 4096) fail('HOURS_PHRASE_REQUIRED');
  const key = await crypto.subtle.importKey('raw', encoder().encode(phrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 210000 }, key,
    { name: 'AES-GCM', length: 256 }, false, ['encrypt','decrypt']);
}
export async function createHoursVault(subject, phrase, timezone, crypto = window.crypto) {
  const state = validateHoursState({ schema: HOURS_SCHEMA, subject, timezone, entries: [] }, subject);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { state, salt, key: await derive(phrase, salt, crypto) };
}
export async function sealHoursVault(vault, state, crypto = window.crypto) {
  const validated = validateHoursState(state, vault.state.subject);
  if (state.timezone !== vault.state.timezone) fail('HOURS_ZONE_MISMATCH');
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const bytes = await crypto.subtle.encrypt({ name: 'AES-GCM', iv,
    additionalData: encoder().encode(validated.subject) }, vault.key, encoder().encode(JSON.stringify(validated)));
  return JSON.stringify({ schema: HOURS_SCHEMA, salt: encode(vault.salt), iv: encode(iv), ciphertext: encode(new Uint8Array(bytes)) });
}
export async function openHoursVault(text, phrase, subject, crypto = window.crypto) {
  if (typeof text !== 'string' || text.length > MAX_FILE) fail('HOURS_INVALID');
  const value = JSON.parse(text);
  if (!exact(value, ['schema','salt','iv','ciphertext']) || ![HOURS_SCHEMA, HOURS_STORAGE_SCHEMA].includes(value.schema)) fail('HOURS_INVALID');
  const salt = decode(value.salt), iv = decode(value.iv), bytes = decode(value.ciphertext);
  if (salt.length !== 16 || iv.length !== 12 || bytes.length < 16) fail('HOURS_INVALID');
  const key = await derive(phrase, salt, crypto);
  const clear = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: encoder().encode(subject) }, key, bytes);
  const raw = JSON.parse(new TextDecoder().decode(clear));
  if (raw.schema !== value.schema) fail('HOURS_INVALID');
  const state = validateHoursState(raw, subject);
  return { state, key, salt };
}
export const hoursDuration = minutes => `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`;
export function hoursMonth(state, month) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) fail('HOURS_INVALID');
  return [...state.entries.filter(entry => entry.date.slice(0, 7) === month)].sort((a,b) => b.date.localeCompare(a.date) || b.start.localeCompare(a.start));
}
