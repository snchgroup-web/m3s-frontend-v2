export const BUDGET_SOURCE_SHA256 = 'c909fc463cbc172de5f575cc2827b30c9205156e7a5c426fd6fa995b50b30146';
const PREFIX = 'budget-perso-ch-v2';
const KEYS = [PREFIX, ...['lang', 'theme', 'tab', 'tour'].map(key => `${PREFIX}-${key}`)];
const MAX_BYTES = 3 * 1024 * 1024;
const encoder = () => new TextEncoder();
const base64 = bytes => btoa(String.fromCharCode(...bytes));
const unbase64 = text => Uint8Array.from(atob(text), char => char.charCodeAt(0));
const serialise = bytes => {
  let result = '';
  for (let offset = 0; offset < bytes.length; offset += 16384) result += String.fromCharCode(...bytes.subarray(offset, offset + 16384));
  return btoa(result);
};

export async function budgetAccountKey(principal, webCrypto = window.crypto) {
  if (!principal?.email) throw new Error('ACCOUNT_REQUIRED');
  const identity = JSON.stringify([principal.tenantId || '', principal.id || '', principal.email.toLowerCase()]);
  const digest = await webCrypto.subtle.digest('SHA-256', encoder().encode(identity));
  return `m3s.personal-budget.v1.${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')}`;
}

export async function verifyBudgetSource(html, webCrypto = window.crypto) {
  if (typeof html !== 'string' || html.length > 300000) throw new Error('SOURCE_REJECTED');
  const digest = await webCrypto.subtle.digest('SHA-256', encoder().encode(html));
  if (Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('') !== BUDGET_SOURCE_SHA256) throw new Error('SOURCE_REJECTED');
  return html;
}

export async function loadBudgetTemplate({ signal } = {}) {
  const response = await fetch(`${process.env.PUBLIC_URL || ''}/tools/budget-perso-ch-v20261014.txt`, { signal, credentials: 'omit', cache: 'no-cache' });
  if (!response.ok) throw new Error('SOURCE_UNAVAILABLE');
  return verifyBudgetSource(await response.text());
}

export function validateBudgetStorage(storage) {
  if (!storage || typeof storage !== 'object' || Array.isArray(storage)) throw new Error('STORAGE_REJECTED');
  const entries = Object.entries(storage);
  if (entries.some(([key, value]) => !KEYS.includes(key) || typeof value !== 'string') || JSON.stringify(storage).length > MAX_BYTES) throw new Error('STORAGE_REJECTED');
  return Object.fromEntries(entries);
}

async function derive(passphrase, salt, webCrypto) {
  if (typeof passphrase !== 'string' || passphrase.length < 12) throw new Error('PHRASE_REQUIRED');
  const material = await webCrypto.subtle.importKey('raw', encoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return webCrypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 210000 }, material,
    { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

export async function newBudgetVault(html, passphrase, webCrypto = window.crypto) {
  await verifyBudgetSource(html, webCrypto);
  const salt = webCrypto.getRandomValues(new Uint8Array(16));
  return { html, storage: {}, salt, key: await derive(passphrase, salt, webCrypto) };
}

export async function sealBudgetVault(vault, storage, webCrypto = window.crypto) {
  const data = encoder().encode(JSON.stringify({ html: vault.html, storage: validateBudgetStorage(storage) }));
  const iv = webCrypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await webCrypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: encoder().encode('m3s.personal-budget.v1') }, vault.key, data);
  return JSON.stringify({ schema: 'm3s.personal-budget.v1', salt: base64(vault.salt), iv: base64(iv), ciphertext: serialise(new Uint8Array(ciphertext)) });
}

export async function openBudgetVault(text, passphrase, webCrypto = window.crypto) {
  if (typeof text !== 'string' || text.length > 6 * 1024 * 1024) throw new Error('VAULT_REJECTED');
  const envelope = JSON.parse(text);
  if (envelope.schema !== 'm3s.personal-budget.v1' || !['salt', 'iv', 'ciphertext'].every(key => typeof envelope[key] === 'string')) throw new Error('VAULT_REJECTED');
  const salt = unbase64(envelope.salt), iv = unbase64(envelope.iv);
  if (salt.length !== 16 || iv.length !== 12) throw new Error('VAULT_REJECTED');
  const key = await derive(passphrase, salt, webCrypto);
  const plaintext = await webCrypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: encoder().encode('m3s.personal-budget.v1') }, key, unbase64(envelope.ciphertext));
  const data = JSON.parse(new TextDecoder().decode(plaintext));
  return { html: await verifyBudgetSource(data.html, webCrypto), storage: validateBudgetStorage(data.storage), key, salt };
}

export function budgetFrameDocument(html, storage, nonce) {
  validateBudgetStorage(storage);
  const document = new DOMParser().parseFromString(html, 'text/html');
  document.querySelectorAll('link, base, iframe, object, embed').forEach(node => node.remove());
  const policy = document.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
  document.head.prepend(policy);
  const bridge = document.createElement('script');
  // This storage is in memory inside an opaque-origin frame; only encrypted snapshots reach disk.
  bridge.textContent = `(() => {
    const nonce = ${JSON.stringify(nonce)}, values = ${JSON.stringify(storage).replace(/</g, '\\u003c')};
    const allowed = ${JSON.stringify(KEYS)};
    const send = () => parent.postMessage({type:'m3s-budget-storage', nonce, storage:{...values}}, '*');
    Object.defineProperty(window, 'claude', {value:undefined});
    Object.defineProperty(window, 'localStorage', {value:{
      getItem:k=>allowed.includes(k)&&Object.hasOwn(values,k)?values[k]:null,
      setItem:(k,v)=>{if(allowed.includes(k)){values[k]=String(v);send()}},
      removeItem:k=>{if(allowed.includes(k)){delete values[k];send()}},
      clear:()=>{for(const k of Object.keys(values))delete values[k];send()},
      key:i=>Object.keys(values)[i]||null, get length(){return Object.keys(values).length}
    }});
    addEventListener('message', e=>{if(e.source===parent&&e.data?.type==='m3s-budget-flush'&&e.data.nonce===nonce)send()});
    document.addEventListener('click', e=>{const a=e.target.closest('a');const href=(a?.getAttribute('href')||'').toLowerCase();if(href.startsWith('http:')||href.startsWith('https:')||href.startsWith('//'))e.preventDefault()},true);
  })();`;
  document.head.insertBefore(bridge, policy.nextSibling);
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}
