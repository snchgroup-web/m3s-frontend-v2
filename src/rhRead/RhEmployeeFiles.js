import React, { useId } from 'react';
import { useAuth } from '../AuthContext';
import { rhReadTransport } from '../api';
import { RhEmployeesRead } from './EmployeeFiles';

export default function RhEmployeeFiles({ access = null, language = 'FR' }) {
  const { user, provider, ready, isAuthenticated } = useAuth();
  const scopeId = useId();
  const enabled = ready === true && isAuthenticated === true && provider === 'google' &&
    user?.authProvider === 'google' && typeof user.id === 'string' && user.id.length > 0 &&
    typeof user.tenantId === 'string' && user.tenantId.length > 0 &&
    access?.enabled === true && access?.qualified === true && access.userId === user.id &&
    access.organizationId === user.tenantId && typeof access.revision === 'string' &&
    access.revision.length > 0 && access.revision.length <= 128;
  // Remount at any host-authenticated context change; this marker grants no permission.
  const context = JSON.stringify([user?.id, user?.tenantId, user?.authProvider, provider,
    ready, isAuthenticated, access?.revision, enabled]);
  return <RhEmployeesRead key={context} enabled={enabled} active scopeKey={scopeId}
    transport={rhReadTransport} language={language}/>;
}
