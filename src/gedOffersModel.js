import spec from './gedOffersSpec.json';

export const OFFERS_BUNDLE_ID = 'a49d924c3acf9b924f118268c23e320e4919d4d4309fbdf3f83d8fd990950318';
export const OFFERS_REFERENCE = `GED-OFFRES-${OFFERS_BUNDLE_ID}`;
export function readOffersBundle(payload) {
  const bundle = payload?.bundle;
  const invalid = () => { throw new Error('INSTITUTIONAL_RESPONSE_INVALID'); };
  if (spec.id !== OFFERS_BUNDLE_ID || payload?.success !== true || bundle?.id !== OFFERS_BUNDLE_ID ||
      bundle.reference !== OFFERS_REFERENCE || bundle.version !== spec.version || bundle.classification !== 'internal' ||
      bundle.role !== 'supplementary_resources' || bundle.canonicalReferencesPreserved !== true ||
      JSON.stringify(bundle.dossiers) !== JSON.stringify(spec.dossiers) || !Array.isArray(bundle.files) || bundle.files.length !== 10 ||
      new Set(bundle.files.map(file => file?.id)).size !== 10) invalid();
  bundle.files.forEach((file, index) => {
    const expected = spec.files[index];
    if (file?.id !== expected.id || file.name !== expected.name || file.size !== expected.size || file.version !== expected.version ||
        JSON.stringify(file.dossiers) !== JSON.stringify(expected.dossiers) || file.contentType !== 'application/octet-stream') invalid();
  });
  return bundle;
}
