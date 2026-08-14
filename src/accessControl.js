export const ADMINISTRATION_AUDIT_PERMISSION = 'administration:audit:read';
export const ADMINISTRATION_RESOURCES_READ_PERMISSION = 'administration:resources:read';
export const ADMINISTRATION_RESOURCES_WRITE_PERMISSION = 'administration:resources:write';
export const ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION = 'administration:correspondence:read';
export const ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION = 'administration:correspondence:write';

export const hasPermission = (permissions, permission) => (
  !permission || (Array.isArray(permissions) && permissions.includes(permission))
);

export const filterAuthorizedItems = (items = [], permissions = []) => (
  items.filter(item => hasPermission(permissions, item.requiredPermission))
);
