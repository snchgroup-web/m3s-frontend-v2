export const getSidebarMenuGroups = (menuData) => {
  const items = menuData?.menu || [];
  const itemById = new Map(items.map(item => [item.id, item]));
  const configuredGroups = menuData?.groups || [];

  if (!configuredGroups.length) {
    return [{ id: 'modules', label: {}, items }];
  }

  const groups = configuredGroups.map(group => ({
    ...group,
    items: (group.itemIds || []).map(id => itemById.get(id)).filter(Boolean)
  }));
  const assignedIds = new Set(groups.flatMap(group => group.items.map(item => item.id)));
  const unassignedItems = items.filter(item => !assignedIds.has(item.id));

  if (unassignedItems.length) {
    groups.push({ id: 'other-modules', label: {}, items: unassignedItems });
  }

  return groups.filter(group => group.items.length > 0);
};

const parseMenuPath = (path = '/') => {
  const url = new URL(path, 'https://m3s.local');
  return {
    pathname: url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : '/',
    searchParams: url.searchParams
  };
};

const childMatchesLocation = (child, pathname, search = '') => {
  const candidate = parseMenuPath(child.path);
  const currentPathname = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  if (candidate.pathname !== currentPathname) return false;

  const currentParams = new URLSearchParams(search);
  const expectedEntries = Array.from(candidate.searchParams.entries());
  if (!expectedEntries.length) return false;

  return expectedEntries.every(([key, value]) => currentParams.get(key) === value);
};

export const resolveActiveMenuLocation = (menuData, pathname = '/', search = '') => {
  const items = menuData?.menu || [];
  const currentPathname = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  const parent = items.find(item => parseMenuPath(item.path).pathname === currentPathname) || null;
  if (!parent) return { parent: null, child: null };

  const child = (parent.children || []).find(item => childMatchesLocation(item, currentPathname, search)) || null;
  return { parent, child };
};
