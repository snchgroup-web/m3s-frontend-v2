import { useEffect, useState, useSyncExternalStore } from 'react';
import { createRhEmployeesSession } from './session';
const inactive = Object.freeze({ status: 'idle', items: Object.freeze([]), loadedCount: 0,
  total: null, limit: null, offset: null, candidate: true, error: null });
const loading = Object.freeze({ ...inactive, status: 'loading' });
const noSubscribe = () => () => {};
const inactiveSnapshot = () => inactive;

// scopeKey is a host lifecycle marker, not a credential or an authorization grant.
function useRhEmployeesRead({ enabled = false, scopeKey = null, transport,
  active = false, limit = 50, offset = 0 } = {}) {
  const [mounted, setMounted] = useState(null);
  const ready = enabled === true && active === true && typeof transport === 'function' &&
    typeof scopeKey === 'string' && scopeKey.length > 0 && scopeKey.length <= 128;
  useEffect(() => {
    if (!ready) { setMounted(null); return; }
    const session = createRhEmployeesSession({ enabled: true, transport });
    setMounted({ session, scopeKey, transport });
    return () => session.dispose();
  }, [ready, scopeKey, transport]);

  // Mask the old scope during render, before effect cleanup can run.
  const session = ready && mounted?.scopeKey === scopeKey && mounted?.transport === transport
    ? mounted.session : null;
  const state = useSyncExternalStore(session?.subscribe ?? noSubscribe,
    session?.getSnapshot ?? inactiveSnapshot, inactiveSnapshot);
  useEffect(() => {
    if (!session) return;
    void session.load({ limit, offset });
    return () => session.clear();
  }, [session, limit, offset]);

  const snapshot = !session ? (ready ? loading : inactive) : state.status === 'available' &&
    (state.limit !== limit || state.offset !== offset) ? loading : state;
  return { snapshot, refresh: () => session ? session.load({ limit, offset }) : Promise.resolve(false) };
}

export { useRhEmployeesRead };
