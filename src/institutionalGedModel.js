export const INSTITUTIONAL_BUNDLE_ID = 'b4bd0e9ea0a1b2b9a4d980c9722f0fd05c372723f433e6275f46e34d05ce3699';
export const INSTITUTIONAL_REFERENCE = `GED-INST-V01-${INSTITUTIONAL_BUNDLE_ID}`;
const hash = /^[a-f0-9]{64}$/;
const invalid = () => { throw new Error('INSTITUTIONAL_RESPONSE_INVALID'); };
export function readInstitutionalBundle(payload) {
  const bundle = payload?.bundle;
  if (payload?.success !== true || bundle?.id !== INSTITUTIONAL_BUNDLE_ID || bundle.reference !== INSTITUTIONAL_REFERENCE ||
      bundle.version !== '0.1' || bundle.classification !== 'internal' || bundle.role !== 'preparation_evidence' ||
      bundle.cycleId !== 'bccde91a-fedc-469a-ad65-ab2f212db959' || !Array.isArray(bundle.dossiers) || bundle.dossiers.join(',') !== 'GD-005,GD-006' ||
      !Array.isArray(bundle.files) || bundle.files.length !== 5 || new Set(bundle.files.map(file => file.id)).size !== 5 ||
      new Set(bundle.files.map(file => file.name)).size !== 5) invalid();
  bundle.files.forEach(file => {
    if (!hash.test(file.id) || !Number.isSafeInteger(file.size) || file.size < 1 || file.size > 3 * 1024 * 1024 ||
        file.contentType !== 'application/octet-stream' || typeof file.name !== 'string' ||
        !/^[A-Za-z0-9_-]+\.(md|html|csv|json)$/.test(file.name) || file.name.length > 144) invalid();
  });
  return bundle;
}

export async function readInstitutionalDownload(response, file) {
  if (!file || !hash.test(file.id) || !Number.isSafeInteger(file.size) || file.size < 1 || file.size > 3 * 1024 * 1024 ||
      response.headers.get('content-type')?.split(';')[0] !== 'application/octet-stream') invalid();
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength !== file.size || !window.crypto?.subtle) invalid();
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  const actual = Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2, '0')).join('');
  if (actual !== file.id) invalid();
  return new Blob([bytes], { type: 'application/octet-stream' });
}
