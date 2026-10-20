export const COMPARATOR_SOURCES = Object.freeze([
  Object.freeze({ sha256: '1b781c4a9f24006f65772631ea625d9f12ccebbc8b3b93fc07f91af66fd764c8', bytes: 59220, variant: 'base', version: '2026-07-24' }),
  Object.freeze({ sha256: '2b09f9f8ed230162fcd728020a4c5300ee1a691270d6816b1b2033da6fac1028', bytes: 531699, variant: 'shared', version: '2026-07-24' }),
  Object.freeze({ sha256: 'df4fcd60970d3915b4ae439ed31c266ef80dad33e5f63f00da1fe6f11f4e816b', bytes: 312918, variant: 'neutral', version: '0.1', language: 'FR' }),
  Object.freeze({ sha256: '7c2d51cd94f712f34f7b78cff3566c4a45564a076a2e78f360bc7649f83d115e', bytes: 336392, variant: 'neutral', version: '0.2', languages: ['FR', 'DE', 'EN'] })
]);

export async function openLocalComparator(file, webCrypto = window.crypto, display = {}) {
  if (!file || !COMPARATOR_SOURCES.some(source => source.bytes === file.size)) throw new Error('COMPARATOR_SOURCE');
  const bytes = await file.arrayBuffer();
  if (bytes.byteLength !== file.size) throw new Error('COMPARATOR_SOURCE');
  const hash = Array.from(new Uint8Array(await webCrypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
  const source = COMPARATOR_SOURCES.find(source => source.sha256 === hash && source.bytes === bytes.byteLength);
  if (!source) throw new Error('COMPARATOR_SOURCE');
  const doc = new DOMParser().parseFromString(new TextDecoder('utf-8', { fatal: true }).decode(bytes), 'text/html');
  if (source.variant === 'neutral' && source.version === '0.1') {
    const privacy = doc.querySelector('header > .mini');
    if (privacy) privacy.textContent = 'Copie temporaire en mémoire, sans stockage durable ni synchronisation. Exportez le JSON avant de quitter. Ne pas y placer de données sensibles ; les anciens JSON du chantier sont refusés.';
    const save = doc.getElementById('saveBtn');
    if (save) { save.title = 'Garder en mémoire dans cette vue'; save.setAttribute('aria-label', save.title); }
    doc.querySelectorAll('script').forEach(script => {
      script.textContent = script.textContent
        .replace('Copie enregistrée sur cet appareil.', 'Copie gardée en mémoire dans cette vue. Exportez le JSON pour la conserver.')
        .replace('Fichier neutre chargé. Enregistrez-le pour conserver cette copie sur l’appareil.', 'Fichier neutre chargé en mémoire. Exportez le JSON avant de quitter cette vue.');
    });
  }
  // Keep the standalone icon notice when serialising only documentElement.
  [...doc.childNodes].filter(node => node.nodeType === 8 && node.data.includes('Icon notice, lucide-react:')).forEach(node => doc.body.appendChild(node));
  doc.querySelectorAll('link,base,iframe,object,embed,meta[http-equiv="Content-Security-Policy"]').forEach(node => node.remove());
  const policy = doc.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
  const bridge = doc.createElement('script');
  // The existing engine saves only in frame memory. No parent snapshot or server transport.
  bridge.textContent = `(() => {
    const key=${JSON.stringify(source.variant === 'neutral' ? '2sg.neutral-window-quotes.v1' : '2sg-lac-rose-avants-fenetres-v1')}, values=Object.create(null);
    const allowed=k=>k===key||(${source.variant === 'neutral' && source.version === '0.2'}&&k==='2sg.offers-comparator.display.v1');
    window.__M3S_COMPARATOR_TEMPORARY__=true;
    window.__M3S_COMPARATOR_DISPLAY__=${JSON.stringify({ language: ['FR', 'DE', 'EN'].includes(display.language) ? display.language : 'FR', theme: ['light', 'dark', 'deep'].includes(display.theme) ? display.theme : 'light' })};
    Object.defineProperty(window,'localStorage',{value:{
      getItem:k=>allowed(k)&&Object.hasOwn(values,k)?values[k]:null,
      setItem:(k,v)=>{if(!allowed(k))return;v=String(v);if(v.length>2*1024*1024)throw new Error('LOCAL_LIMIT');values[k]=v},
      removeItem:k=>{if(allowed(k))delete values[k]}, clear:()=>{Object.keys(values).forEach(k=>delete values[k])},
      key:i=>Object.keys(values)[i]??null,get length(){return Object.keys(values).length}
    }});
    document.addEventListener('click',e=>{
      const href=e.target.closest('a')?.getAttribute('href')||'';
      if(href.startsWith('#')){e.preventDefault();document.getElementById(href.slice(1))?.scrollIntoView({block:'start'});return;}
      if(href&&!href.startsWith('blob:'))e.preventDefault();
    },true);
  })();`;
  doc.head.prepend(bridge); doc.head.prepend(policy);
  return { source, document: `<!doctype html>\n${doc.documentElement.outerHTML}` };
}
