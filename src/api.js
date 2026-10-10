/**
 * Aide API - Frontend ERP M3S
 *
 * Intégration avec Backend Phase 1 (http://localhost:3001)
 * Contient tous les appels API pour récupérer les vraies données BigQuery
 *
 * Date: 29 mai 2026
 * Version: 2.0 (Phase 2 - Intégration Frontend)
 * Langue: Français 🇫🇷
 */

import { currentAccessToken, signOutIdentity } from './identityClient';

const isLocalHost = typeof window !== 'undefined'
  && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const DEFAULT_API_BASE_URL = isLocalHost
  ? 'http://localhost:3001/api'
  : 'https://web-production-1e53c.up.railway.app/api';
const API_BASE_URL = process.env.REACT_APP_API_URL || DEFAULT_API_BASE_URL;

const getAuthHeaders = async () => {
  const token = await currentAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const clearExpiredSession = () => {
  signOutIdentity().catch(() => {});
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.setItem('session_expired', 'true');
  window.dispatchEvent(new Event('m3s:session-expired'));
  if (window.location.pathname !== '/login') {
    const next = `${window.location.pathname}${window.location.search}`;
    window.location.replace(`/login?session=expired&next=${encodeURIComponent(next)}`);
  }
};

export const rhReadTransport = async (path, { method = 'GET', signal } = {}) => {
  const validPath = path === '/access' || (typeof path === 'string' &&
    /^\/employees\?limit=(?:[1-9]|[1-9][0-9]|100)&offset=(?:0|[1-9][0-9]{0,5})$/.test(path) &&
    Number(path.split('&offset=')[1]) <= 100000) || (typeof path === 'string' &&
    /^\/employees\/[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}\/contract-documents(?:\/[a-f0-9]{64}\/versions\/[a-f0-9]{64})?\?dossierRevision=[1-9][0-9]{0,3}$/.test(path));
  if (method !== 'GET' || !validPath) {
    throw Object.assign(new Error('RH_INVALID_PAGE'), { code: 'RH_INVALID_PAGE' });
  }
  if (signal?.aborted) throw Object.assign(new Error('RH_ABORTED'), { code: 'RH_ABORTED' });
  const token = await currentAccessToken();
  if (!token || token.startsWith('demo_session_') || signal?.aborted) {
    throw Object.assign(new Error('RH_AUTH_REQUIRED'), { code: 'RH_AUTH_REQUIRED' });
  }
  const response = await fetch(`${API_BASE_URL}/rh/private${path}`, {
    method: 'GET', signal, cache: 'no-store', headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status === 401 && !signal?.aborted) {
    const currentToken = await currentAccessToken();
    if (!signal?.aborted && currentToken === token) clearExpiredSession();
  }
  return response;
};

export const rhReturnTransport = async (path, body, {signal} = {}) => {
  if (!['/returns/context','/returns/observations'].includes(path) || !body ||
      new TextEncoder().encode(JSON.stringify(body)).byteLength > 2 * 1024 * 1024) throw new Error('RH_RETURN_INVALID_FIELDS');
  const token = await currentAccessToken();
  if (!token || token.startsWith('demo_session_') || signal?.aborted) throw new Error('RH_AUTH_REQUIRED');
  const response = await fetch(`${API_BASE_URL}/rh/private${path}`, {
    method:'POST',signal,cache:'no-store',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body)
  });
  if (response.status===401 && !signal?.aborted && await currentAccessToken()===token) clearExpiredSession();
  const payload = await response.json();
  if (!response.ok) throw Object.assign(new Error('RH_RETURN_REQUEST_FAILED'),{code:payload?.code,status:response.status});
  return payload;
};

const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...await getAuthHeaders(),
      ...(options.headers || {})
    }
  });

  if (response.status === 401) {
    clearExpiredSession();
  }

  return response;
};

const budgetFetch = async (path, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const auth = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/finance/budget-drafts${path}`, {
      ...options, signal: controller.signal, cache: 'no-store',
      headers: { ...auth, 'Content-Type': 'application/json' }
    });
    if (response.status === 401 && (await getAuthHeaders()).Authorization === auth.Authorization) clearExpiredSession();
    let payload;
    try { payload = await response.json(); } catch { payload = null; }
    if (!response.ok || payload?.success !== true) {
      const error = new Error('Budget storage request failed');
      error.status = response.status; error.code = payload?.code;
      error.draftId = payload?.draftId; error.reconcileRequired = payload?.reconcileRequired === true;
      throw error;
    }
    return payload;
  } finally { clearTimeout(timer); }
};

const administrationFetch = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...await getAuthHeaders(),
      ...(options.headers || {})
    }
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (response.status === 401) clearExpiredSession();
  if (!response.ok) {
    const error = new Error(payload?.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.code = payload?.code || 'ADMIN_REGISTRY_ERROR';
    throw error;
  }
  return payload;
};

// Gestion des erreurs centralisée
const handleError = (erreur, endpoint) => {
  console.error(`Erreur API [${endpoint}]:`, erreur);
  const wrappedError = new Error(`Impossible de récupérer ${endpoint}: ${erreur.message}`);
  wrappedError.status = erreur.status;
  wrappedError.code = erreur.code;
  throw wrappedError;
};

const createApiError = async (response, fallbackCode = 'API_REQUEST_FAILED') => {
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  const error = new Error(payload?.error || `HTTP ${response.status}`);
  error.status = response.status;
  error.code = payload?.code || fallbackCode;
  return error;
};

// ============================================================================
// APPELS API FINANCE
// ============================================================================

const gedMime = name => ({ pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' })[name?.split('.').pop()];
const GED_MAX_BYTES = 5 * 1024 * 1024;
const EXPENSE_DOCUMENT_ROLES = new Set(['invoice', 'payment_receipt', 'transfer_receipt', 'credit_note', 'other']);
const unsafeExpenseReference = value => value.includes('<') || value.includes('>') ||
  Array.from(value).some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);
const validGedRecord = row => row && /^[a-f0-9]{64}$/.test(row.id) && typeof row.name === 'string' &&
  /^[\p{L}\p{N} ._()-]{1,140}\.(pdf|docx|jpg|jpeg|png)$/u.test(row.name) && !row.name.startsWith('.') &&
  Number.isInteger(row.size) && row.size >= 10 && row.size <= GED_MAX_BYTES &&
  (row.category === undefined || ['personal', 'finance', 'correspondence', 'unclassified'].includes(row.category)) &&
  (row.contentType === undefined || row.contentType === gedMime(row.name)) &&
  (row.lifecycle === undefined || (row.lifecycle === true && /^[a-f0-9]{64}$/.test(row.rootId) &&
    Number.isSafeInteger(row.revision) && row.revision >= 0 && row.revision <= 10000 && typeof row.trashed === 'boolean' &&
    typeof row.title === 'string' && row.title.length > 0 && row.title.length <= 144));
const gedError = code => Object.assign(new Error(code), { code });

export const api = {
  getExpenseProofs: async (expenseId, { signal, kind = 'expense' } = {}) => {
    if (!['expense', 'income'].includes(kind)) throw gedError('GED_INVALID_COMMAND');
    if (typeof expenseId !== 'string' || !expenseId || expenseId.length > 128) throw gedError('GED_UNAVAILABLE');
    const res = await apiFetch(`${API_BASE_URL}/ged/private/${kind === 'income' ? 'income' : 'expenses'}/${encodeURIComponent(expenseId)}/documents`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !Array.isArray(payload.documents) || payload.documents.length > 100 ||
      payload.documents.some(row => !validGedRecord(row) || row.category !== 'finance')) throw gedError('GED_UNAVAILABLE');
    return payload.documents;
  },
  mutatePrivateGedDocument: async (row, command, { signal } = {}) => {
    if (!/^[a-f0-9]{64}$/.test(row?.rootId) || !Number.isSafeInteger(row.revision)) throw gedError('GED_UNAVAILABLE');
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents/${row.rootId}/actions`, {
      method: 'POST', signal, cache: 'no-store', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...command, expectedRevision: row.revision })
    });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !validGedRecord(payload.document) || payload.document.rootId !== row.rootId ||
      payload.document.revision !== row.revision + 1) throw gedError('GED_UNAVAILABLE');
    return payload.document;
  },
  getPrivateGedHistory: async (row, { signal } = {}) => {
    if (!/^[a-f0-9]{64}$/.test(row?.rootId)) throw gedError('GED_UNAVAILABLE');
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents/${row.rootId}/history`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !Array.isArray(payload.history) || payload.history.length > 10001 ||
      payload.history.some(event => !validGedRecord(event.document) || !Number.isSafeInteger(event.revision))) throw gedError('GED_UNAVAILABLE');
    return payload.history;
  },
  getPrivateGedDocuments: async ({ signal } = {}) => {
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !Array.isArray(payload.documents) || payload.documents.length > 100 ||
        payload.documents.some(row => !validGedRecord(row))) {
      throw new Error('GED_UNAVAILABLE');
    }
    return payload.documents;
  },
  getExpenseAttachmentOptions: async ({ signal, kind = 'expense' } = {}) => {
    if (!['expense', 'income'].includes(kind)) throw gedError('GED_INVALID_COMMAND');
    const capability = kind === 'income' ? 'incomeAttach' : 'expenseAttach';
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !Array.isArray(payload.documents) || payload.documents.length > 100 ||
        payload.documents.some(row => !validGedRecord(row)) ||
        (payload.capabilities?.[capability] !== undefined && typeof payload.capabilities[capability] !== 'boolean')) {
      throw gedError('GED_UNAVAILABLE');
    }
    return {
      enabled: payload.capabilities?.[capability] === true,
      documents: payload.documents.filter(row => row.lifecycle === true && row.trashed === false && row.category === 'finance')
    };
  },
  attachExpenseDocument: async (expenseId, value, { signal, kind = 'expense' } = {}) => {
    if (!['expense', 'income'].includes(kind)) throw gedError('GED_INVALID_COMMAND');
    if (typeof expenseId !== 'string' || !expenseId || expenseId.length > 128 || expenseId.trim() !== expenseId ||
        !value || typeof value !== 'object' || Array.isArray(value) ||
        !/^[a-f0-9]{64}$/.test(value.documentId) || !/^[a-f0-9]{64}$/.test(value.versionId) ||
        !EXPENSE_DOCUMENT_ROLES.has(value.documentRole)) throw gedError('GED_INVALID_COMMAND');
    if (value.externalReference !== undefined && value.externalReference !== null && typeof value.externalReference !== 'string') {
      throw gedError('GED_INVALID_COMMAND');
    }
    const externalReference = value.externalReference === undefined || value.externalReference === null || value.externalReference.trim() === ''
      ? undefined : value.externalReference.trim();
    if (externalReference !== undefined && (externalReference.length > 140 || unsafeExpenseReference(externalReference))) {
      throw gedError('GED_INVALID_COMMAND');
    }
    const body = { documentId: value.documentId, versionId: value.versionId, documentRole: value.documentRole,
      ...(externalReference === undefined ? {} : { externalReference }) };
    const res = await apiFetch(`${API_BASE_URL}/ged/private/${kind === 'income' ? 'income' : 'expenses'}/${encodeURIComponent(expenseId)}/documents`, {
      method: 'POST', signal, cache: 'no-store', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    const link = payload?.link;
    if (payload?.success !== true || typeof payload.created !== 'boolean' || !link ||
        link[kind === 'income' ? 'incomeId' : 'expenseId'] !== expenseId || link.documentId !== body.documentId || link.versionId !== body.versionId ||
        link.documentRole !== body.documentRole || link.externalReference !== (externalReference ?? null) ||
        !Number.isSafeInteger(link.revision) || link.revision < 1 || link.revision > 10000) {
      throw gedError('GED_UNAVAILABLE');
    }
    return payload;
  },
  preparePrivateGedImport: async (file, category, { signal } = {}) => {
    if (!file || !/\.(pdf|docx|jpg|jpeg|png)$/.test(file.name) || !['personal', 'finance', 'correspondence'].includes(category) ||
      (category === 'correspondence' && !file.name.endsWith('.pdf'))) throw gedError('GED_FORMAT_REQUIRED');
    if (!Number.isSafeInteger(file.size) || file.size < 10 || file.size > GED_MAX_BYTES) throw gedError('GED_TOO_LARGE');
    const bytes = await file.arrayBuffer();
    const id = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
    if (signal?.aborted) throw gedError('GED_ABORTED');
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || !Array.isArray(payload.approved) || payload.approved.length > 64 || !Array.isArray(payload.documents)) throw gedError('GED_UNAVAILABLE');
    const approved = payload.approved.find(row => row.sha256 === id && row.size === file.size && row.name === file.name);
    if (!approved || !validGedRecord({ ...approved, id })) throw gedError('GED_DOCUMENT_NOT_APPROVED');
    if (approved.category !== category) throw gedError('GED_CATEGORY_MISMATCH');
    return { id, name: approved.name, size: approved.size, category, contentType: gedMime(approved.name),
      existing: payload.documents.some(row => row.id === id) };
  },
  importPrivateGedDocument: async (file, candidate, { signal } = {}) => {
    // Revalidate the current server approval immediately before any file is sent.
    const checked = await api.preparePrivateGedImport(file, candidate.category, { signal });
    if (checked.id !== candidate.id) throw gedError('GED_DOCUMENT_NOT_APPROVED');
    const res = await apiFetch(`${API_BASE_URL}/ged/private/documents/${checked.id}`, {
      method: 'POST', signal, cache: 'no-store', headers: { 'Content-Type': checked.contentType }, body: file
    });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    const payload = await res.json();
    if (payload?.success !== true || typeof payload.created !== 'boolean' || !validGedRecord(payload.document) ||
        payload.document.id !== checked.id || payload.document.size !== checked.size ||
        payload.document.name !== checked.name || payload.document.category !== checked.category) throw gedError('GED_UNAVAILABLE');
    return payload;
  },
  downloadPrivateGedDocument: async (record, { signal, expenseId, incomeId } = {}) => {
    if (incomeId !== undefined && (expenseId !== undefined || typeof incomeId !== 'string' || !incomeId || incomeId.length > 128)) throw gedError('GED_UNAVAILABLE');
    if (!validGedRecord(record)) throw new Error('GED_UNAVAILABLE');
    if (expenseId !== undefined && (typeof expenseId !== 'string' || !expenseId || expenseId.length > 128)) throw gedError('GED_UNAVAILABLE');
    const route = incomeId !== undefined ? `income/${encodeURIComponent(incomeId)}/documents/${record.id}/content`
      : expenseId === undefined ? `documents/${record.id}/content` : `expenses/${encodeURIComponent(expenseId)}/documents/${record.id}/content`;
    const res = await apiFetch(`${API_BASE_URL}/ged/private/${route}`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'GED_UNAVAILABLE');
    if (res.headers.get('content-type')?.split(';')[0] !== gedMime(record.name)) throw new Error('GED_UNAVAILABLE');
    const blob = await res.blob();
    if (blob.size !== record.size || blob.size > GED_MAX_BYTES) throw new Error('GED_UNAVAILABLE');
    return blob;
  },
  getOwnProfile: async ({ signal } = {}) => {
    const token = await currentAccessToken();
    if (!token || token.startsWith('demo_session_')) {
      const error = new Error('No linked account for this session');
      error.code = 'PROFILE_NOT_LINKED';
      throw error;
    }
    const res = await apiFetch(`${API_BASE_URL}/auth/profile`, { signal, cache: 'no-store' });
    if (!res.ok) throw await createApiError(res, 'PROFILE_UNAVAILABLE');
    return res.json();
  },
  getBudgetCapabilities: () => budgetFetch('/capabilities'),
  listBudgetDrafts: (offset = 0) => budgetFetch(`?limit=20&offset=${encodeURIComponent(offset)}`),
  getBudgetDraft: id => budgetFetch(`/${encodeURIComponent(id)}`),
  createBudgetDraft: budget => budgetFetch('', { method: 'POST', body: JSON.stringify({ budget }) }),
  updateBudgetDraft: (id, budget, expectedVersion) => budgetFetch(`/${encodeURIComponent(id)}`, {
    method: 'PUT', body: JSON.stringify({ budget, expectedVersion })
  }),
  getManagementPortfolioSummary: async () => {
    const res = await apiFetch(`${API_BASE_URL}/management/portfolio/summary`);
    if (!res.ok) throw await createApiError(res, 'MANAGEMENT_PORTFOLIO_SOURCE_UNAVAILABLE');
    return res.json();
  },

  getLatestIntelligence: async () => {
    const res = await apiFetch(`${API_BASE_URL}/intelligence/latest`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  getLatestIntelligenceArtifact: async (artifactType) => {
    const supportedTypes = new Set(['html', 'pdf', 'reference']);
    if (!supportedTypes.has(artifactType)) throw new Error('Type de livrable Intelligence invalide');
    const res = await apiFetch(`${API_BASE_URL}/intelligence/latest/${artifactType}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return {
      blob: await res.blob(),
      contentDisposition: res.headers?.get?.('content-disposition') || ''
    };
  },

  getBoussoleArtifact: async () => {
    const res = await apiFetch(`${API_BASE_URL}/boussole/latest/html`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.blob();
  },

  // Finance - Tableau de bord
  getFinanceDashboard: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/finance/dashboard`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/finance/dashboard');
    }
  },

  // Finance - Dépenses
  getExpenses: async (limite = 100, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/finance/expenses?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/finance/expenses');
    }
  },

  createExpense: async (data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/expenses`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  updateExpense: async (id, data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/expenses/${encodeURIComponent(id)}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  deleteExpense: async (id) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/expenses/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  // Finance - Revenus/Recettes
  getIncome: async (limite = 100, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/finance/income?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/finance/income');
    }
  },

  createIncome: async (data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/income`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  updateIncome: async (id, data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/income/${encodeURIComponent(id)}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  deleteIncome: async (id) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/income/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  getSocialFinance: async (limite = 200, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/finance/social?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw await createApiError(res, 'FINANCE_SOCIAL_REQUEST_FAILED');
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/finance/social');
    }
  },

  // Finance - Financement immobilier
  getRealEstateFinance: async (limite = 200, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/finance/real-estate?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw await createApiError(res, 'FINANCE_REAL_ESTATE_REQUEST_FAILED');
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/finance/real-estate');
    }
  },

  createRealEstateFinance: async (data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/real-estate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  updateRealEstateFinance: async (id, data) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/real-estate/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  deleteRealEstateFinance: async (id) => {
    const res = await apiFetch(`${API_BASE_URL}/finance/real-estate/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  // Finance - Historique des taux de change (FX History)
  getFxHistory: async (limite = 500, decalage = 0) => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/fx-rates?limit=${limite}&offset=${decalage}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      console.error(`❌ FX History API Error:`, erreur.message);
      // Retourner structure vide au lieu de throw
      return { success: false, data: [], error: erreur.message };
    }
  },

  // Generic GET method for any API endpoint
  get: async (endpoint) => {
    try {
      const res = await apiFetch(`${API_BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, endpoint);
    }
  },

  // ============================================================================
  // APPELS API DOCUMENTS (GED - Gestion Électronique des Documents)
  // ============================================================================

  // Documents - Liste
  getDigitalOffersTaxonomy: async () => {
    const res = await apiFetch(`${API_BASE_URL}/referentiels/offres-digitales`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  getDigitalOfferTaxonomy: async (type) => {
    const normalizedType = String(type || '').trim().toUpperCase();
    const res = await apiFetch(
      `${API_BASE_URL}/referentiels/offres-digitales/${encodeURIComponent(normalizedType)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  getDocuments: async (limite = 100, decalage = 0, type = null) => {
    try {
      let url = `${API_BASE_URL}/documents?limit=${limite}&offset=${decalage}`;
      if (type) url += `&type=${type}`;

      const res = await apiFetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/documents');
    }
  },

  // Documents - Nombre total
  getDocumentsCount: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/documents/count`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/documents/count');
    }
  },

  // ============================================================================
  // APPELS API INVENTAIRE (Production/Stocks)
  // ============================================================================

  // Inventaire - Liste
  getInventory: async (limite = 100, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/inventory?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/inventory');
    }
  },

  // Inventaire - Nombre total
  getInventoryCount: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/inventory/count`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/inventory/count');
    }
  },

  getSuppliersCount: async () => {
    const res = await apiFetch(`${API_BASE_URL}/suppliers/count`);
    if (!res.ok) throw await createApiError(res, 'SUPPLIER_COUNT_UNAVAILABLE');
    return res.json();
  },

  getBeneficiariesCount: async () => {
    const res = await apiFetch(`${API_BASE_URL}/beneficiaries/count`);
    if (!res.ok) throw await createApiError(res, 'BENEFICIARY_COUNT_UNAVAILABLE');
    return res.json();
  },

  getDonorsCount: async () => {
    const res = await apiFetch(`${API_BASE_URL}/donors/count`);
    if (!res.ok) throw await createApiError(res, 'DONOR_COUNT_UNAVAILABLE');
    return res.json();
  },

  createInventoryItem: async (data) => {
    const res = await apiFetch(`${API_BASE_URL}/inventory`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  updateInventoryItem: async (id, data) => {
    const res = await apiFetch(`${API_BASE_URL}/inventory/${encodeURIComponent(id)}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  deleteInventoryItem: async (id) => {
    const res = await apiFetch(`${API_BASE_URL}/inventory/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    return res.json();
  },

  // ============================================================================
  // APPELS API TÂCHES
  // ============================================================================

  // Tâches - Liste
  getTasks: async (limite = 100, decalage = 0, statut = null) => {
    try {
      let url = `${API_BASE_URL}/tasks?limit=${limite}&offset=${decalage}`;
      if (statut) url += `&status=${statut}`;

      const res = await apiFetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/tasks');
    }
  },

  // Tâches - Nombre total
  getTasksCount: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/tasks/count`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/tasks/count');
    }
  },

  // ============================================================================
  // APPELS API UTILISATEURS (RH - Ressources Humaines)
  // ============================================================================

  // Comptes M3S authentifies - Nombre total uniquement
  getAuthAccountsCount: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/auth/accounts/count`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/auth/accounts/count');
    }
  },

  // Utilisateurs - Liste
  getUsers: async (limite = 100, decalage = 0) => {
    try {
      const res = await apiFetch(
        `${API_BASE_URL}/users?limit=${limite}&offset=${decalage}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/users');
    }
  },

  // RH-001 - Annuaire interne assaini, en lecture seule
  getMembersDirectory: async (limite = 100, decalage = 0) => {
    const res = await fetch(
      `${API_BASE_URL}/members-directory?limit=${limite}&offset=${decalage}`,
      { headers: await getAuthHeaders() }
    );

    let payload = null;
    try {
      payload = await res.json();
    } catch (error) {
      payload = null;
    }

    if (res.status === 401) clearExpiredSession();

    if (!res.ok) {
      const error = new Error(payload?.error || `HTTP ${res.status}`);
      error.status = res.status;
      error.code = payload?.code || 'RH001_DIRECTORY_ERROR';
      throw error;
    }

    return payload;
  },

  // Administration - registres sécurisés de métadonnées
  getAdministrationResources: (limite = 200, decalage = 0) => administrationFetch(
    `/administration/resources?limit=${limite}&offset=${decalage}`
  ),

  createAdministrationResource: data => administrationFetch('/administration/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),

  updateAdministrationResource: (id, data) => administrationFetch(
    `/administration/resources/${encodeURIComponent(id)}`,
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
  ),

  deleteAdministrationResource: id => administrationFetch(
    `/administration/resources/${encodeURIComponent(id)}`,
    { method: 'DELETE' }
  ),

  getAdministrationCorrespondence: (limite = 200, decalage = 0) => administrationFetch(
    `/administration/correspondence?limit=${limite}&offset=${decalage}`
  ),

  createAdministrationCorrespondence: data => administrationFetch('/administration/correspondence', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),

  updateAdministrationCorrespondence: (id, data) => administrationFetch(
    `/administration/correspondence/${encodeURIComponent(id)}`,
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
  ),

  deleteAdministrationCorrespondence: id => administrationFetch(
    `/administration/correspondence/${encodeURIComponent(id)}`,
    { method: 'DELETE' }
  ),

  getAdministrationAudit: (limite = 100, decalage = 0) => administrationFetch(
    `/administration/audit?limit=${limite}&offset=${decalage}`
  ),

  // ============================================================================
  // APPELS API TAUX DE CHANGE
  // ============================================================================

  // Taux de change - Liste
  getFXRates: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/fx-rates`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/fx-rates');
    }
  },

  // ============================================================================
  // APPELS API SANTÉ ET INFO
  // ============================================================================

  // Vérification de santé
  getHealth: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/health');
    }
  },

  // Info API (liste tous les endpoints)
  getInfo: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/info`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (erreur) {
      handleError(erreur, '/info');
    }
  },

  // ============================================================================
  // FONCTIONS UTILITAIRES
  // ============================================================================

  /**
   * Formate les données d'API en format attendu par les composants
   * @param {Object} donnees - Données brutes de l'API
   * @returns {Array} Données formatées
   */
  formatData: (donnees) => {
    if (!donnees) return [];
    if (donnees.data && Array.isArray(donnees.data)) return donnees.data;
    if (Array.isArray(donnees)) return donnees;
    return [];
  },

  /**
   * Convertit montant CHF en CFA (1 CHF = 656 CFA)
   * @param {number} montantCHF - Montant en CHF
   * @returns {Object} {chf, cfa}
   */
  convertCurrency: (montantCHF) => {
    const TAUX_CHF_CFA = 656;
    const montantCFA = Math.round(montantCHF * TAUX_CHF_CFA);
    return {
      chf: montantCHF.toLocaleString('fr-CH'),
      cfa: montantCFA.toLocaleString('fr-SN')
    };
  },

  /**
   * Récupère toutes les données financières en une seule requête
   * @returns {Object} {dashboard, expenses, income}
   */
  getAllFinanceData: async () => {
    try {
      const [dashboard, expenses, income] = await Promise.all([
        api.getFinanceDashboard(),
        api.getExpenses(100, 0),
        api.getIncome(100, 0)
      ]);
      return { dashboard, expenses, income };
    } catch (erreur) {
      handleError(erreur, 'getAllFinanceData');
    }
  },

  /**
   * Récupère tous les documents
   * @returns {Object} {documents, count}
   */
  getAllDocuments: async () => {
    try {
      const [documents, count] = await Promise.all([
        api.getDocuments(100, 0),
        api.getDocumentsCount()
      ]);
      return { documents, count };
    } catch (erreur) {
      handleError(erreur, 'getAllDocuments');
    }
  }
};

export default api;
