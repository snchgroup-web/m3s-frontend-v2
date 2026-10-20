import { webcrypto } from 'crypto';
import { TextDecoder, TextEncoder } from 'util';
import { COMPARATOR_SOURCES, openLocalComparator } from './localComparator';

global.TextDecoder = TextDecoder;
const current = COMPARATOR_SOURCES.find(s => s.version === '0.2');
const html = '<html><head></head><body><select id="languageSelect"><option>FR</option><option>DE</option><option>EN</option></select><button data-theme-choice="light"></button><button data-theme-choice="dark"></button><button data-theme-choice="deep"></button><script>window.syntheticDictionaryKey="Copie enregistrée sur cet appareil.";</script></body></html><!-- Icon notice, lucide-react: synthetic fixture -->';
const bytes = new Uint8Array(current.bytes).fill(32); bytes.set(new TextEncoder().encode(html));
const file = { size: bytes.length, arrayBuffer: async () => bytes.slice().buffer };
const pinnedCrypto = { subtle: { digest: async () => Uint8Array.from(current.sha256.match(/../g), h => parseInt(h, 16)).buffer } };

test.each(['FR', 'DE', 'EN'])('V0.2 bridge seeds only safe display options in %s on a synthetic source fixture', async language => {
  const result = await openLocalComparator(file, pinnedCrypto, { language, theme: 'deep' });
  expect(result.source).toBe(COMPARATOR_SOURCES.find(s => s.version === '0.2'));
  const doc = new DOMParser().parseFromString(result.document, 'text/html'), frame = {};
  new Function('window', 'document', doc.querySelector('script').textContent)(frame, doc);
  expect(frame.__M3S_COMPARATOR_TEMPORARY__).toBe(true);
  expect(frame.__M3S_COMPARATOR_DISPLAY__).toEqual({ language, theme: 'deep' });
  expect(doc.querySelector('#languageSelect').options).toHaveLength(3);
  expect(doc.querySelectorAll('[data-theme-choice]')).toHaveLength(3);
  expect(result.document).toContain('Copie enregistrée sur cet appareil.'); // Dictionary key is preserved, not blindly replaced.
  expect(result.document).toContain('Icon notice, lucide-react:');
  expect(doc.head.firstElementChild.content).toContain("connect-src 'none'");
  frame.localStorage.setItem('2sg.offers-comparator.display.v1', '{"language":"DE","theme":"dark"}');
  expect(frame.localStorage.length).toBe(1);
  expect(localStorage.getItem('2sg.offers-comparator.display.v1')).toBeNull();
  frame.localStorage.setItem('foreign', 'ignored'); expect(frame.localStorage.length).toBe(1);
});

test('unsafe initial display values cannot become executable frame content', async () => {
  const result = await openLocalComparator(file, pinnedCrypto, { language: '</script><script>bad()', theme: 'url(https://example.test)' });
  const doc = new DOMParser().parseFromString(result.document, 'text/html'), frame = {};
  new Function('window', 'document', doc.querySelector('script').textContent)(frame, doc);
  expect(frame.__M3S_COMPARATOR_DISPLAY__).toEqual({ language: 'FR', theme: 'light' });
  expect(doc.scripts).toHaveLength(2);
  await expect(openLocalComparator(file, webcrypto)).rejects.toThrow('COMPARATOR_SOURCE');
});
