import offerTaxonomyData from './shared/offerTaxonomy.json';

const taxonomyItems = offerTaxonomyData.items || [];

const enumKeysByValue = {
  DIGITAL: 'DIGITAL',
  USAGE_INTERNE: 'INTERNAL_USAGE',
  PRODUITS_DIGITAUX: 'DIGITAL_PRODUCTS',
  SERVICES_DIGITAUX: 'DIGITAL_SERVICES',
  GESTION_INFORMATION: 'INFORMATION_MANAGEMENT',
  PILOTAGE_ERP: 'ERP_STEERING',
  AUTOMATISATION_INTERNE: 'INTERNAL_AUTOMATION',
  PLATEFORMES_CLOUD: 'CLOUD_PLATFORMS',
  APPLICATIONS: 'APPLICATIONS',
  BASES_CONNAISSANCES: 'KNOWLEDGE_BASES',
  AGENTS_IA: 'AI_AGENTS',
  FORMATION_ACCOMPAGNEMENT: 'TRAINING_SUPPORT',
  DIGITALISATION: 'DIGITALIZATION',
  AUTOMATISATION_PROCESSUS: 'PROCESS_AUTOMATION',
  INTEGRATION_IA: 'AI_INTEGRATION',
  STRUCTURATION_DOCUMENTAIRE: 'DOCUMENT_STRUCTURING'
};

const uniqueValues = (field) => (
  [...new Set(taxonomyItems.map(item => item[field]).filter(Boolean))]
);

const buildEnum = (values) => (
  values.reduce((acc, value) => {
    const key = enumKeysByValue[value] || value;
    acc[key] = value;
    return acc;
  }, {})
);

const buildOfferTypes = () => (
  taxonomyItems.reduce((acc, item) => {
    acc[item.code] = item.code;
    (item.aliases || []).forEach(alias => {
      acc[alias] = alias;
    });
    return acc;
  }, {})
);

export const normalizeOfferCode = (value) =>
  String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();

export const OFFER_DAS = buildEnum(uniqueValues('das_strategique'));

export const OFFER_FAMILIES = buildEnum(uniqueValues('famille_offre'));

export const OFFER_SUB_FAMILIES = buildEnum(uniqueValues('sous_famille_offre'));

export const OFFER_TYPES = buildOfferTypes();

const buildTaxonomyEntry = (item) => ({
  das_strategique: item.das_strategique,
  famille_offre: item.famille_offre,
  sous_famille_offre: item.sous_famille_offre,
  type_offre: item.type_offre,
  produit_service: item.produit_service
});

export const OFFER_TAXONOMY = taxonomyItems.reduce((acc, item) => {
  const taxonomyEntry = buildTaxonomyEntry(item);
  acc[normalizeOfferCode(item.code)] = taxonomyEntry;
  (item.aliases || []).forEach(alias => {
    acc[normalizeOfferCode(alias)] = taxonomyEntry;
  });
  return acc;
}, {});

export const getOfferTaxonomy = (value) => {
  const normalized = normalizeOfferCode(value);
  return OFFER_TAXONOMY[normalized] || null;
};

export const getOfferDas = (value) =>
  getOfferTaxonomy(value)?.das_strategique || '';

export const getOfferFamily = (value) =>
  getOfferTaxonomy(value)?.famille_offre || '';

export const isKnownOfferType = (value) =>
  Boolean(getOfferTaxonomy(value));
