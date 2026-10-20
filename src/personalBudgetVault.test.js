import { webcrypto } from 'crypto';
import { TextEncoder, TextDecoder } from 'util';
import { BUDGET_SOURCE_SHA256, budgetAccountKey, verifyBudgetSource, validateBudgetStorage, newBudgetVault, sealBudgetVault, openBudgetVault, budgetFrameDocument } from './personalBudgetVault';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const source = '<!doctype html><html><head><link href="https://example.invalid/font.css"></head><body><script>window.fixture=true;</script></body></html>';
const cryptoForFixture = { getRandomValues: webcrypto.getRandomValues.bind(webcrypto), subtle: {
  digest: async () => Uint8Array.from(BUDGET_SOURCE_SHA256.match(/../g), byte => parseInt(byte, 16)).buffer,
  importKey: webcrypto.subtle.importKey.bind(webcrypto.subtle), deriveKey: webcrypto.subtle.deriveKey.bind(webcrypto.subtle),
  encrypt: webcrypto.subtle.encrypt.bind(webcrypto.subtle), decrypt: webcrypto.subtle.decrypt.bind(webcrypto.subtle)
} };

test('uses account and tenant scoped keys without an email in the storage key', async () => {
  const a = await budgetAccountKey({ email: 'a@example.test', tenantId: 'one' }, webcrypto);
  expect(a).not.toContain('example');
  expect(a).not.toBe(await budgetAccountKey({ email: 'b@example.test', tenantId: 'one' }, webcrypto));
  expect(a).not.toBe(await budgetAccountKey({ email: 'a@example.test', tenantId: 'two' }, webcrypto));
  await expect(budgetAccountKey({}, webcrypto)).rejects.toThrow('ACCOUNT_REQUIRED');
});

test('rejects any unrecognised executable source', async () => {
  await expect(verifyBudgetSource(source, webcrypto)).rejects.toThrow('SOURCE_REJECTED');
  await expect(verifyBudgetSource('x'.repeat(300001), webcrypto)).rejects.toThrow('SOURCE_REJECTED');
});

test('round trips encrypted snapshots, rejects wrong phrases and detects tampering', async () => {
  const phrase = 'synthetic test phrase only';
  const vault = await newBudgetVault(source, phrase, cryptoForFixture);
  const storage = { 'budget-perso-ch-v2': JSON.stringify({ synthetic: 'private entry' }), 'budget-perso-ch-v2-lang': 'de' };
  const encrypted = await sealBudgetVault(vault, storage, webcrypto);
  expect(encrypted).not.toContain('private entry');
  expect(encrypted).not.toContain(source);
  const result = await openBudgetVault(encrypted, phrase, cryptoForFixture);
  expect(result.html).toBe(source); expect(result.storage).toEqual(storage);
  await expect(openBudgetVault(encrypted, 'different synthetic phrase', cryptoForFixture)).rejects.toBeDefined();
  const changed = JSON.parse(encrypted); changed.iv = btoa('123456789012');
  await expect(openBudgetVault(JSON.stringify(changed), phrase, cryptoForFixture)).rejects.toBeDefined();
});

test('validates envelope, passphrase and storage boundaries', async () => {
  await expect(newBudgetVault(source, 'short', cryptoForFixture)).rejects.toThrow('PHRASE_REQUIRED');
  await expect(openBudgetVault('{}', 'synthetic test phrase', webcrypto)).rejects.toThrow('VAULT_REJECTED');
  await expect(openBudgetVault('x'.repeat(7 * 1024 * 1024), 'synthetic test phrase', webcrypto)).rejects.toThrow('VAULT_REJECTED');
  expect(() => validateBudgetStorage({ token: 'not allowed' })).toThrow();
  expect(() => validateBudgetStorage({ 'budget-perso-ch-v2': 42 })).toThrow();
  expect(() => validateBudgetStorage([])).toThrow();
  expect(() => validateBudgetStorage({ 'budget-perso-ch-v2': 'x'.repeat(4 * 1024 * 1024) })).toThrow();
});

test('uses an opaque local frame bridge, blocks remote services and escapes snapshots in scripts', () => {
  const html = budgetFrameDocument(source, { 'budget-perso-ch-v2': '</script><script>bad()</script>' }, 'synthetic-nonce');
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  expect(parsed.querySelector('link')).toBeNull();
  expect(parsed.head.firstElementChild.content).toContain("connect-src 'none'");
  expect(parsed.head.firstElementChild.content).toContain("form-action 'none'");
  expect(html).not.toContain('</script><script>bad()');
  expect(html).toContain("Object.defineProperty(window, 'claude', {value:undefined})");
  expect(html).toContain("e.source!==parent||e.data?.nonce!==nonce");
  expect(parsed.querySelectorAll('script')).toHaveLength(2);
  expect(() => new Function(parsed.querySelector('script').textContent)).not.toThrow();
});

test.each(['light', 'standard', 'deep'])('applies only the 2SG display layer in %s without modifying the source or saved preference', theme => {
  const storage = Object.freeze({ 'budget-perso-ch-v2-theme': 'deep' });
  const html = budgetFrameDocument(source, storage, 'fixture-style', theme);
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  expect(parsed.documentElement.dataset.m3sTheme).toBe(theme);
  expect(parsed.body.lastElementChild.id).toBe('m3s-budget-appearance');
  expect(parsed.querySelector('#m3s-budget-appearance').textContent).toContain('--surface:#111e31');
  expect(storage).toEqual({ 'budget-perso-ch-v2-theme': 'deep' });
  expect(source).not.toContain('m3s-budget-appearance');
  expect(parsed.querySelectorAll('script')).toHaveLength(2);
});

test('appearance messages require the parent and nonce and never emit a storage change', () => {
  const parsed = new DOMParser().parseFromString(budgetFrameDocument(source, {}, 'fixture-style', 'light'), 'text/html');
  const parent = { postMessage: jest.fn() }, window = {};
  let receive;
  new Function('window', 'document', 'parent', 'addEventListener', parsed.querySelector('script').textContent)(window, parsed, parent, (_, handler) => { receive = handler; });
  expect(window.localStorage.getItem('budget-perso-ch-v2-theme')).toBe('auto');
  expect(window.localStorage.length).toBe(0);
  const data = { type: 'm3s-budget-appearance', nonce: 'fixture-style', theme: 'deep' };
  receive({ source: {}, data });
  receive({ source: parent, data: { ...data, nonce: 'wrong' } });
  receive({ source: parent, data: { ...data, theme: '<script>' } });
  expect(parsed.documentElement.dataset.m3sTheme).toBe('light');
  receive({ source: parent, data });
  expect(parsed.documentElement.dataset.m3sTheme).toBe('deep');
  expect(parent.postMessage).not.toHaveBeenCalled();
  receive({ source: parent, data: { type: 'm3s-budget-flush', nonce: 'fixture-style' } });
  expect(parent.postMessage).toHaveBeenLastCalledWith({ type: 'm3s-budget-storage', nonce: 'fixture-style', storage: {} }, '*');
});
