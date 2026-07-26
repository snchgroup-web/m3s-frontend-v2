import api from './api';
import { normalizeOfferCode } from './offerTaxonomy';
import offerTaxonomyData from './shared/offerTaxonomy.json';

const localItems = Array.isArray(offerTaxonomyData.items) ? offerTaxonomyData.items : [];

const parseHttpStatus = (error) => {
  const match = String(error?.message || '').match(/HTTP\s+(\d{3})/);
  return match ? Number(match[1]) : null;
};

const serializeError = (error) => {
  if (!error) return null;
  return {
    message: error.message || String(error),
    status: parseHttpStatus(error)
  };
};

const localListResponse = (source, error = null) => ({
  data: {
    success: true,
    version: offerTaxonomyData.version,
    validated_at: offerTaxonomyData.validated_at,
    items: localItems,
    count: localItems.length
  },
  items: localItems,
  count: localItems.length,
  version: offerTaxonomyData.version,
  validated_at: offerTaxonomyData.validated_at,
  source,
  error: serializeError(error)
});

const findLocalItem = (type) => {
  const normalizedType = normalizeOfferCode(type);
  if (!normalizedType) return null;

  return localItems.find((item) => (
    normalizeOfferCode(item.code) === normalizedType ||
    (Array.isArray(item.aliases) && item.aliases.some(alias => normalizeOfferCode(alias) === normalizedType))
  )) || null;
};

const localDetailResponse = (type, source, error = null) => {
  const item = findLocalItem(type);
  if (!item) {
    return {
      data: null,
      item: null,
      normalized_type: null,
      source,
      error: serializeError(error)
    };
  }

  const data = {
    success: true,
    type,
    normalized_type: item.code,
    item
  };

  return {
    data,
    item,
    normalized_type: item.code,
    source,
    error: serializeError(error)
  };
};

export const getDigitalOffersTaxonomyData = async (options = {}) => {
  const { preferLocal = false } = options;

  if (preferLocal) {
    return localListResponse('local');
  }

  try {
    const response = await api.getDigitalOffersTaxonomy();
    const items = Array.isArray(response?.items) ? response.items : [];

    return {
      data: response,
      items,
      count: response?.count ?? items.length,
      version: response?.version,
      validated_at: response?.validated_at,
      source: 'api',
      error: null
    };
  } catch (error) {
    return localListResponse('fallback', error);
  }
};

export const getDigitalOfferTaxonomyData = async (type, options = {}) => {
  const { preferLocal = false } = options;

  if (preferLocal) {
    return localDetailResponse(type, 'local');
  }

  try {
    const response = await api.getDigitalOfferTaxonomy(type);
    const item = response?.item || response?.data || null;

    return {
      data: response,
      item,
      normalized_type: response?.normalized_type || item?.code || null,
      source: 'api',
      error: null
    };
  } catch (error) {
    const fallback = localDetailResponse(type, 'fallback', error);
    if (fallback.item) return fallback;

    return {
      data: null,
      item: null,
      normalized_type: null,
      source: 'api',
      error: serializeError(error)
    };
  }
};

const taxonomyDataProvider = {
  getDigitalOffersTaxonomyData,
  getDigitalOfferTaxonomyData
};

export default taxonomyDataProvider;
