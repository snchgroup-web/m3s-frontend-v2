export const RH_INSTITUTIONAL_BUNDLE_ID = 'a58ea347ee3225a66bd7e58f7bcbc5ee5be8d45ba1f9fdcd769647cf6230d9a0';
export const RH_INSTITUTIONAL_REFERENCE = `GED-RH-INST-V01-${RH_INSTITUTIONAL_BUNDLE_ID}`;
export const RH_FILE_SPECS = [
  ['01_PARCOURS_ET_INTERFACES_V0_1.md', '3dd3ae174a19de608e7c17a50570fab859745a0ec4dd7c1b052925fd8d4a954b', 6094],
  ['02_INDEX_SOURCES_ET_OUTILS_V0_1.md', 'a68e1a224bee153548fdba6eb16a577e6029de32f4cdda9e50fd157a42a2b420', 4806],
  ['03_PRISE_EN_MAIN_ET_CONSERVATION_V0_1.md', '7e3fd9ec252ded89da4bbbc589dbcd4ef8d39e51d4e0e1c347fded1b55c95fac', 6461],
  ['04_POINTS_OUVERTS_ET_PASSAGES_V0_1.md', '6d1c2a4cdb33f8dac267ebdb53cffafd5ed4970c8b95e30807dd0bbcdc6f0d05', 6469],
  ['REFERENCES_SOURCES_V0_1.csv', 'f54be5219017bc7f1d973dc17bb53227429a6a912a19db60fe4e89a974498466', 4984],
  ['SOURCES_V0_1.json', '5ddffd908dc8b0a3689b6262a832db6e9a0f531dc9de5144ee6b08bcdb30cabb', 6896],
  ['2SG_RH_PROXIMITE_CYCLE_01_V0_1.html', 'ca9908ec43b9ca33c1359b64e230bc51e815ce09240a93d96e0e2b6fb5ce640a', 2121303],
  ['MANIFEST.json', RH_INSTITUTIONAL_BUNDLE_ID, 5052]
];

export function readRhInstitutionalBundle(payload) {
  const bundle = payload?.bundle;
  const invalid = () => { throw new Error('INSTITUTIONAL_RESPONSE_INVALID'); };
  if (payload?.success !== true || bundle?.id !== RH_INSTITUTIONAL_BUNDLE_ID || bundle.reference !== RH_INSTITUTIONAL_REFERENCE ||
      bundle.version !== '0.1' || bundle.classification !== 'internal' || bundle.role !== 'preparation_evidence' ||
      bundle.cycleId !== 'cdd7c770-b06e-416a-8d06-4299f80a71de' || !Array.isArray(bundle.dossiers) || bundle.dossiers.join(',') !== 'GD-008,GD-009' ||
      !Array.isArray(bundle.files) || bundle.files.length !== 8) invalid();
  bundle.files.forEach((file, index) => {
    const [name, id, size] = RH_FILE_SPECS[index];
    if (file?.name !== name || file.id !== id || file.size !== size || file.contentType !== 'application/octet-stream') invalid();
  });
  return bundle;
}
