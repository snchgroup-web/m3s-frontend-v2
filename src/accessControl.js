export const ADMINISTRATION_AUDIT_PERMISSION = 'administration:audit:read';

export const hasPermission = (permissions, permission) => (
  !permission || (Array.isArray(permissions) && permissions.includes(permission))
);

export const filterAuthorizedItems = (items = [], permissions = []) => (
  items.filter(item => hasPermission(permissions, item.requiredPermission))
);
