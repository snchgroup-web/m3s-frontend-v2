import { webcrypto } from 'crypto';
import { TextDecoder, TextEncoder } from 'util';
import { COMPARATOR_SOURCES, openLocalComparator } from './localComparator';

global.TextDecoder = TextDecoder;
const neutral = COMPARATOR_SOURCES.find(source => source.variant === 'neutral');
const storageKey = '2sg.neutral-window-quotes.v1';
const originalKey = '2sg-lac-rose-avants-fenetres-v1';
const html = '<html><head></head><body><header><p class="mini">Données locales non chiffrées sur cet appareil</p><button id="saveBtn" title="Enregistrer sur cet appareil"></button></header><script>const key="2sg.neutral-window-quotes.v1";window.saveText="Copie enregistrée sur cet appareil.";window.importText="Fichier neutre chargé. Enregistrez-le pour conserver cette copie sur l’appareil.";</script></body></html><!-- Icon notice, lucide-react: synthetic licence fixture -->';
const fixtureBytes = new Uint8Array(312918).fill(32);
fixtureBytes.set(new TextEncoder().encode(html));
const file = { size: fixtureBytes.length, arrayBuffer: async () => fixtureBytes.slice().buffer };
const pinnedCrypto = { subtle: { digest: async () => Uint8Array.from(neutral.sha256.match(/../g), h => parseInt(h, 16)).buffer } };

test('neutral launcher keeps only its own temporary namespace with no parent storage', async () => {
  const result = await openLocalComparator(file, pinnedCrypto);
  const doc = new DOMParser().parseFromString(result.document, 'text/html');
  const frame = {};
  new Function('window', 'document', doc.querySelector('script').textContent)(frame, doc);
  frame.localStorage.setItem(storageKey, 'synthetic only');
  expect(frame.localStorage.getItem(storageKey)).toBe('synthetic only');
  frame.localStorage.setItem(originalKey, 'ignored');
  expect(frame.localStorage.getItem(originalKey)).toBeNull();
  expect(frame.localStorage.length).toBe(1);
  expect(localStorage.getItem(storageKey)).toBeNull();
  expect(() => frame.localStorage.setItem(storageKey, 'x'.repeat(3 * 1024 * 1024))).toThrow('LOCAL_LIMIT');
  frame.localStorage.clear(); expect(frame.localStorage.length).toBe(0);
});

test('neutral launcher replaces durable-save claims without editing the selected file', async () => {
  const before = await file.arrayBuffer();
  const { document: documentText, source } = await openLocalComparator(file, pinnedCrypto);
  const doc = new DOMParser().parseFromString(documentText, 'text/html');
  expect(source).toBe(neutral);
  expect(doc.querySelector('header > .mini').textContent).toContain('sans stockage durable');
  expect(doc.getElementById('saveBtn').getAttribute('aria-label')).toBe('Garder en mémoire dans cette vue');
  expect(doc.scripts[1].textContent).toContain('Exportez le JSON pour la conserver.');
  expect(doc.scripts[1].textContent).toContain('Exportez le JSON avant de quitter cette vue.');
  expect(documentText).not.toContain('Copie enregistrée sur cet appareil.');
  expect(documentText).not.toContain('conserver cette copie sur l’appareil.');
  expect(documentText).toContain('Icon notice, lucide-react: synthetic licence fixture');
  expect(new Uint8Array(await file.arrayBuffer())).toEqual(new Uint8Array(before));
});

test('neutral launcher retains the network policy and rejects same-sized content without the pinned hash', async () => {
  const { document: documentText } = await openLocalComparator(file, pinnedCrypto);
  const doc = new DOMParser().parseFromString(documentText, 'text/html');
  for (const directive of ["connect-src 'none'", "form-action 'none'", "base-uri 'none'", "frame-src 'none'"]) expect(doc.head.firstElementChild.content).toContain(directive);
  expect(documentText).not.toContain('postMessage');
  await expect(openLocalComparator(file, webcrypto)).rejects.toThrow('COMPARATOR_SOURCE');
});
