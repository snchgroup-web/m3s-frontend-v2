import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { rhReadTransport } from '../api';
import RhEmployeeFiles from './RhEmployeeFiles';

const labels = {
  FR: { title: 'Dossiers employés', pending: 'Vérification de l’accès RH…',
    closed: 'Lecture RH non activée', denied: 'Accès RH non autorisé',
    unavailable: 'Vérification de l’accès indisponible', retry: 'Actualiser' },
  EN: { title: 'Employee files', pending: 'Checking HR access…', closed: 'HR reading not enabled',
    denied: 'HR access not authorized', unavailable: 'Access check unavailable', retry: 'Refresh' },
  DE: { title: 'Personalakten', pending: 'Zugriff auf Personalakten wird geprüft…',
    closed: 'Personalakten nicht freigeschaltet', denied: 'Kein berechtigter Zugriff auf Personalakten',
    unavailable: 'Zugriffsprüfung nicht verfügbar', retry: 'Aktualisieren' }
};
function validMarker(value, userId, organizationId) {
  return value && Object.keys(value).sort().join(',') === 'enabled,organizationId,qualified,revision,userId' &&
    value.enabled === true && value.qualified === true && value.userId === userId &&
    value.organizationId === organizationId && typeof value.revision === 'string' &&
    /^[1-9][0-9]{0,4}$/.test(value.revision) && Number(value.revision) <= 10000;
}

export default function RhEmployeeFilesHost({ access = null, language = 'FR' }) {
  const { user, provider, ready, isAuthenticated } = useAuth();
  const authenticated = ready === true && isAuthenticated === true && provider === 'google' &&
    user?.authProvider === 'google' && typeof user.id === 'string' && user.id.length > 0 &&
    typeof user.tenantId === 'string' && user.tenantId.length > 0;
  const userId = user?.id, organizationId = user?.tenantId;
  const context = JSON.stringify([userId, organizationId, user?.authProvider, provider, ready, isAuthenticated]);
  const [snapshot, setSnapshot] = useState(null);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (access !== null || !authenticated) return undefined;
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setSnapshot({ context, status: 'pending' });
    (async () => {
      try {
        const response = await rhReadTransport('/access', { method: 'GET', signal: controller.signal });
        let status, marker;
        if (response.status === 200) {
          marker = await response.json();
          status = validMarker(marker, userId, organizationId) ? 'available' : 'unavailable';
        } else {
          const error = await response.json();
          status = response.status === 403 ? 'denied' : response.status === 503 &&
            error?.code === 'RH_NOT_ENABLED' ? 'closed' : 'unavailable';
        }
        if (!controller.signal.aborted) setSnapshot({ context, status, marker: status === 'available' ? marker : null });
      } catch {
        if (!disposed) setSnapshot({ context, status: 'unavailable' });
      } finally { clearTimeout(timeout); }
    })();
    return () => { disposed = true; controller.abort(); clearTimeout(timeout); };
  }, [access, authenticated, context, userId, organizationId, refresh]);

  if (access !== null || !authenticated) return <RhEmployeeFiles access={access} language={language}/>;
  const current = snapshot?.context === context ? snapshot : null;
  if (current?.status === 'available') return <RhEmployeeFiles key={context} access={current.marker} language={language}/>;
  const t = labels[language] || labels.FR;
  const status = current?.status || 'pending';
  return <section className="space-y-3" aria-busy={status === 'pending'}>
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-base font-semibold">{t.title}</h3>
      <button type="button" title={t.retry} aria-label={t.retry} disabled={status === 'pending'}
        className="m3s-secondary-button inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border disabled:opacity-40"
        onClick={() => setRefresh(value => value + 1)}><RefreshCw size={18} aria-hidden="true"/></button>
    </div>
    <p role={status === 'pending' ? 'status' : 'alert'}>{t[status]}</p>
  </section>;
}
