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

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiFetch = (url, options = {}) => fetch(url, {
  ...options,
  headers: {
    ...getAuthHeaders(),
    ...(options.headers || {})
  }
});

// Gestion des erreurs centralisée
const handleError = (erreur, endpoint) => {
  console.error(`Erreur API [${endpoint}]:`, erreur);
  throw new Error(`Impossible de récupérer ${endpoint}: ${erreur.message}`);
};

// ============================================================================
// APPELS API FINANCE
// ============================================================================

export const api = {
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

  // Finance - Historique des taux de change (FX History)
  getFxHistory: async () => {
    try {
      const res = await apiFetch(`${API_BASE_URL}/finance/fx-history`);
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
