import { webcrypto } from 'crypto';
import { TextDecoder } from 'util';
import { COMPARATOR_SOURCES, openLocalComparator } from './localComparator';

global.TextDecoder = TextDecoder;
const source = '<!doctype html><html><head><link href="https://example.test/font.css"></head><body><script>window.synthetic=true;</script></body></html>';
const fixture = bytes => ({ size: bytes, arrayBuffer: async () => Uint8Array.from(source.padEnd(bytes, ' '), c => c.charCodeAt(0)).buffer });
const pinnedCrypto = { subtle: { digest: async () => Uint8Array.from(COMPARATOR_SOURCES[0].sha256.match(/../g), h => parseInt(h, 16)).buffer } };

test('pins two originals and one neutral version without treating sharing aliases as extra tools', () => {
  expect(COMPARATOR_SOURCES).toHaveLength(3);
  expect(new Set(COMPARATOR_SOURCES.map(s => s.sha256)).size).toBe(3);
  expect(COMPARATOR_SOURCES[1].bytes).toBe(531699);
  expect(COMPARATOR_SOURCES[2]).toMatchObject({ variant: 'neutral', bytes: 312918, language: 'FR', version: '0.1' });
});

test('rejects unknown sizes and unknown executable content before constructing a frame', async () => {
  const unread = { size: 9, arrayBuffer: jest.fn() };
  await expect(openLocalComparator(unread, webcrypto)).rejects.toThrow('COMPARATOR_SOURCE');
  expect(unread.arrayBuffer).not.toHaveBeenCalled();
  await expect(openLocalComparator(fixture(59220), webcrypto)).rejects.toThrow('COMPARATOR_SOURCE');
  await expect(openLocalComparator({ size: 59220, arrayBuffer: async () => new ArrayBuffer(9) }, pinnedCrypto)).rejects.toThrow('COMPARATOR_SOURCE');
});

test('preserves the existing engine while blocking network, frames and durable storage', async () => {
  const result = await openLocalComparator(fixture(59220), pinnedCrypto);
  const doc = new DOMParser().parseFromString(result.document, 'text/html');
  expect(result.source.sha256).toBe(COMPARATOR_SOURCES[0].sha256);
  expect(doc.querySelector('link')).toBeNull();
  expect(doc.head.firstElementChild.content).toContain("connect-src 'none'");
  expect(doc.head.firstElementChild.content).toContain("form-action 'none'");
  expect(doc.head.firstElementChild.content).toContain("frame-src 'none'");
  expect(doc.querySelectorAll('script')).toHaveLength(2);
  expect(doc.querySelectorAll('script')[1].textContent).toBe('window.synthetic=true;');
  const context = {};
  new Function('window', 'document', doc.querySelector('script').textContent)(context, doc);
  const storage = context.localStorage, key = '2sg-lac-rose-avants-fenetres-v1';
  expect(storage.getItem(key)).toBeNull();
  storage.setItem('foreign-key', 'ignored'); expect(storage.length).toBe(0);
  storage.setItem(key, 'synthetic only'); expect(storage.getItem(key)).toBe('synthetic only');
  expect(storage.length).toBe(1); expect(storage.key(0)).toBe(key); expect(storage.key(1)).toBeNull();
  expect(localStorage.getItem(key)).toBeNull();
  expect(() => storage.setItem(key, 'x'.repeat(3 * 1024 * 1024))).toThrow('LOCAL_LIMIT');
  storage.clear(); expect(storage.length).toBe(0);
  expect(result.document).not.toContain('postMessage');
});
