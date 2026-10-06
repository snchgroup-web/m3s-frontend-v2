import { createRhClient } from './client';
const readErrors = new Set(['RH_NOT_ENABLED', 'RH_AUTH_REQUIRED', 'RH_ACCESS_DENIED',
  'RH_INVALID_PAGE', 'RH_INVALID_RESPONSE', 'RH_TRANSPORT_UNAVAILABLE',
  'RH_SERVICE_UNAVAILABLE', 'RH_ORIGIN_DENIED', 'RH_ENTITLEMENT_SOURCE_UNAVAILABLE']);

// One instance per host-authenticated scope; dispose it before changing that scope.
function createRhEmployeesSession({ enabled = false, transport } = {}) {
  let client = createRhClient({ enabled, transport });
  let generation = 0, pending = null, disposed = false;
  const listeners = new Set();
  const empty = (status, extra = {}) => Object.freeze({ status, items: Object.freeze([]),
    loadedCount: 0, total: null, limit: null, offset: null, candidate: true, error: null, ...extra });
  let state = empty('idle');
  const publish = value => {
    state = value;
    for (const listener of [...listeners]) {
      if (listeners.has(listener)) { try { listener(); } catch { /* A subscriber must not break cancellation. */ } }
    }
  };
  const invalidate = () => {
    generation++;
    const previous = pending;
    pending = null;
    previous?.abort();
  };
  return Object.freeze({
    getSnapshot: () => state,
    subscribe(listener) {
      if (disposed || typeof listener !== 'function') throw new Error('RH_SESSION_CLOSED');
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async load({ limit = 50, offset = 0 } = {}) {
      if (disposed) return false;
      invalidate();
      const ticket = generation;
      const controller = new AbortController();
      pending = controller;
      publish(empty('loading'));
      // A subscriber can leave the view synchronously during the loading notification.
      if (disposed || ticket !== generation) return false;
      try {
        const page = await client.list({ limit, offset, signal: controller.signal });
        if (disposed || ticket !== generation) return false;
        pending = null;
        publish(Object.freeze({ status: 'available', ...page, error: null }));
        return !disposed && ticket === generation;
      } catch (error) {
        if (disposed || ticket !== generation) return false;
        pending = null;
        const code = readErrors.has(error?.code ?? error?.message) ? error.code ?? error.message : 'RH_SERVICE_UNAVAILABLE';
        publish(empty('error', { error: code }));
        return false;
      }
    },
    clear() {
      if (disposed) return;
      invalidate();
      publish(empty('idle'));
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      invalidate();
      client = null;
      publish(empty('closed'));
      listeners.clear();
    }
  });
}

export { createRhEmployeesSession };
