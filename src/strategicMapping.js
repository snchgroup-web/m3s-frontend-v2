export const DAS_KEYS = {
  SOCIAL: 'SOCIAL',
  BUSINESS: 'BUSINESS',
  DIGITAL: 'DIGITAL',
  GOVERNANCE_ORG: 'GOUVERNANCE_ORGANISATION'
};

export const LEGACY_BU_TO_DAS = {
  ADMIN_ORG: DAS_KEYS.GOVERNANCE_ORG,
  SOCIAL: DAS_KEYS.SOCIAL,
  IMPORT_EXPORT: DAS_KEYS.BUSINESS,
  IMMO: DAS_KEYS.BUSINESS,
  M3S: DAS_KEYS.DIGITAL,
  DIGITAL: DAS_KEYS.DIGITAL,
  IA: DAS_KEYS.DIGITAL,
  TECH_DIGITAL: DAS_KEYS.DIGITAL
};

export const DAS_LABELS = {
  FR: {
    [DAS_KEYS.SOCIAL]: 'Social',
    [DAS_KEYS.BUSINESS]: 'Business',
    [DAS_KEYS.DIGITAL]: 'Digital',
    [DAS_KEYS.GOVERNANCE_ORG]: 'Gouvernance & Organisation'
  },
  EN: {
    [DAS_KEYS.SOCIAL]: 'Social',
    [DAS_KEYS.BUSINESS]: 'Business',
    [DAS_KEYS.DIGITAL]: 'Digital',
    [DAS_KEYS.GOVERNANCE_ORG]: 'Governance & Organization'
  },
  DE: {
    [DAS_KEYS.SOCIAL]: 'Soziales',
    [DAS_KEYS.BUSINESS]: 'Business',
    [DAS_KEYS.DIGITAL]: 'Digital',
    [DAS_KEYS.GOVERNANCE_ORG]: 'Governance & Organisation'
  }
};

export const LEGACY_BU_LABELS = {
  FR: {
    ADMIN_ORG: 'ADMIN_ORG - ancienne BU administration',
    IMPORT_EXPORT: 'IMPORT_EXPORT - ancienne BU import/export',
    SOCIAL: 'SOCIAL - ancienne BU sociale',
    IMMO: 'IMMO - ancienne BU immobiliere',
    TECH_DIGITAL: 'TECH_DIGITAL - ancienne BU digitale'
  },
  EN: {
    ADMIN_ORG: 'ADMIN_ORG - legacy administration BU',
    IMPORT_EXPORT: 'IMPORT_EXPORT - legacy import/export BU',
    SOCIAL: 'SOCIAL - legacy social BU',
    IMMO: 'IMMO - legacy real estate BU',
    TECH_DIGITAL: 'TECH_DIGITAL - legacy digital BU'
  },
  DE: {
    ADMIN_ORG: 'ADMIN_ORG - fruehere BU Administration',
    IMPORT_EXPORT: 'IMPORT_EXPORT - fruehere BU Import/Export',
    SOCIAL: 'SOCIAL - fruehere BU Soziales',
    IMMO: 'IMMO - fruehere BU Immobilien',
    TECH_DIGITAL: 'TECH_DIGITAL - fruehere BU Digital'
  }
};

export const normalizeStrategicCode = (value) =>
  String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();

export const getDasFromLegacyBu = (value) => {
  const normalized = normalizeStrategicCode(value);
  return LEGACY_BU_TO_DAS[normalized] || normalized || '';
};

export const isLegacyBuCode = (value) =>
  Boolean(LEGACY_BU_TO_DAS[normalizeStrategicCode(value)]);

export const translateDas = (value, language = 'FR') => {
  const das = getDasFromLegacyBu(value);
  return DAS_LABELS[language]?.[das] || DAS_LABELS.FR[das] || String(value || '-');
};

export const translateLegacyBu = (value, language = 'FR') => {
  const normalized = normalizeStrategicCode(value);
  return LEGACY_BU_LABELS[language]?.[normalized] || LEGACY_BU_LABELS.FR[normalized] || String(value || '-');
};
