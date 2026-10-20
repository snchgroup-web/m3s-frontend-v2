export const COMPARATOR_SOURCES = Object.freeze([
  Object.freeze({ sha256: '1b781c4a9f24006f65772631ea625d9f12ccebbc8b3b93fc07f91af66fd764c8', bytes: 59220, variant: 'base', version: '2026-07-24' }),
  Object.freeze({ sha256: '2b09f9f8ed230162fcd728020a4c5300ee1a691270d6816b1b2033da6fac1028', bytes: 531699, variant: 'shared', version: '2026-07-24' })
]);

export async function openLocalComparator(file, webCrypto = window.crypto) {
  if (!file || !COMPARATOR_SOURCES.some(source => source.bytes === file.size)) throw new Error('COMPARATOR_SOURCE');
  const bytes = await file.arrayBuffer();
  if (bytes.byteLength !== file.size) throw new Error('COMPARATOR_SOURCE');
  const hash = Array.from(new Uint8Array(await webCrypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
  const source = COMPARATOR_SOURCES.find(source => source.sha256 === hash && source.bytes === bytes.byteLength);
  if (!source) throw new Error('COMPARATOR_SOURCE');
  const doc = new DOMParser().parseFromString(new TextDecoder('utf-8', { fatal: true }).decode(bytes), 'text/html');
  doc.querySelectorAll('link,base,iframe,object,embed,meta[http-equiv="Content-Security-Policy"]').forEach(node => node.remove());
  const policy = doc.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
  const bridge = doc.createElement('script');
  // The existing engine saves only in frame memory. No parent snapshot or server transport.
  bridge.textContent = `(() => {
    const key='2sg-lac-rose-avants-fenetres-v1', values=Object.create(null);
    Object.defineProperty(window,'localStorage',{value:{
      getItem:k=>k===key&&Object.hasOwn(values,k)?values[k]:null,
      setItem:(k,v)=>{if(k!==key)return;v=String(v);if(v.length>2*1024*1024)throw new Error('LOCAL_LIMIT');values[k]=v},
      removeItem:k=>{if(k===key)delete values[k]}, clear:()=>{delete values[key]},
      key:i=>i===0&&Object.hasOwn(values,key)?key:null,get length(){return Object.keys(values).length}
    }});
    document.addEventListener('click',e=>{const href=e.target.closest('a')?.getAttribute('href')||'';if(href&&!href.startsWith('#')&&!href.startsWith('blob:'))e.preventDefault()},true);
  })();`;
  doc.head.prepend(bridge); doc.head.prepend(policy);
  return { source, document: `<!doctype html>\n${doc.documentElement.outerHTML}` };
}
