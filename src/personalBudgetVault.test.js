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
  expect(html).toContain("e.source===parent");
  expect(parsed.querySelectorAll('script')).toHaveLength(2);
  expect(() => new Function(parsed.querySelector('script').textContent)).not.toThrow();
});
