import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { rhReadTransport } from '../api';

const empty = Object.freeze({ status: 'idle', count: null });
const loading = Object.freeze({ status: 'loading', count: null });
const unavailable = Object.freeze({ status: 'unavailable', count: null });
const denied = Object.freeze({ status: 'restricted', count: null });

function validAccess(value, userId, organizationId) {
  return value?.enabled === true && value.qualified === true &&
    value.userId === userId && value.organizationId === organizationId &&
    typeof value.revision === 'string' && /^[1-9][0-9]{0,4}$/.test(value.revision) &&
    Number(value.revision) <= 10000;
}

export function parseEmployeeCount(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.keys(value).sort().join(',') !== 'candidate,count,scope,source' ||
      value.candidate !== true || value.source !== 'rh-read-v1' ||
      value.scope !== 'authorized-employee-files' ||
      !Number.isSafeInteger(value.count) || value.count < 0) {
    throw new Error('RH_SERVICE_UNAVAILABLE');
  }
  return value.count;
}

export function useRhEmployeeCount({ active = true, access = null, transport = rhReadTransport } = {}) {
  const { user, provider, ready, isAuthenticated } = useAuth();
  const authenticated = ready === true && isAuthenticated === true && provider === 'google' &&
    user?.authProvider === 'google' && typeof user.id === 'string' && user.id.length > 0 &&
    typeof user.tenantId === 'string' && user.tenantId.length > 0;
  const userId = user?.id, organizationId = user?.tenantId;
  const accessKey = JSON.stringify(access === null ? null : {
    enabled: access.enabled, qualified: access.qualified, userId: access.userId,
    organizationId: access.organizationId, revision: access.revision
  });
  const context = JSON.stringify([userId, organizationId, user?.authProvider, provider,
    ready, isAuthenticated, active, accessKey]);
  const [snapshot, setSnapshot] = useState(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!active || !authenticated || typeof transport !== 'function') return undefined;
    const controller = new AbortController();
    let disposed = false;
    const save = value => { if (!disposed) setSnapshot({ context, transport, revision, ...value }); };
    const timeout = setTimeout(() => { controller.abort(); save(unavailable); }, 15000);
    save(loading);
    const read = path => transport(path, { method: 'GET', signal: controller.signal });
    const failure = response => response?.status === 401 || response?.status === 403 ? denied : unavailable;
    (async () => {
      try {
        let marker = JSON.parse(accessKey);
        if (marker === null) {
          const response = await read('/access');
          if (disposed || controller.signal.aborted) return;
          if (response.status !== 200) { save(failure(response)); return; }
          marker = await response.json();
        }
        if (disposed || controller.signal.aborted) return;
        if (!validAccess(marker, userId, organizationId)) { save(unavailable); return; }
        const response = await read('/employees/summary');
        if (disposed || controller.signal.aborted) return;
        if (response.status !== 200) { save(failure(response)); return; }
        const count = parseEmployeeCount(await response.json());
        if (!controller.signal.aborted) save({ status: 'available', count });
      } catch { if (!controller.signal.aborted) save(unavailable); }
      finally { clearTimeout(timeout); }
    })();
    return () => { disposed = true; controller.abort(); clearTimeout(timeout); };
  }, [active, authenticated, userId, organizationId, context, accessKey, transport, revision]);

  // Hide a previous account's aggregate before effect cleanup or a late response.
  const current = snapshot?.context === context && snapshot.transport === transport &&
    snapshot.revision === revision ? snapshot : null;
  const state = !active || !authenticated ? empty : typeof transport !== 'function'
    ? unavailable : current || loading;
  return { status: state.status, count: state.count, refresh: () => setRevision(value => value + 1) };
}
