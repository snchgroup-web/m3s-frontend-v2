import menuData from './menuStructure.json';
import { getSidebarMenuGroups, resolveActiveMenuLocation } from './sidebarMenu';

test('groups every global module once in the governed sidebar order', () => {
  const groups = getSidebarMenuGroups(menuData);

  expect(groups.map(group => group.id)).toEqual([
    'management-governance',
    'support-functions',
    'operations-development'
  ]);
  expect(groups.map(group => group.items.map(item => item.id))).toEqual([
    ['dashboard'],
    ['administration', 'finances', 'rh', 'it-support'],
    ['commercial', 'production', 'stock']
  ]);
  expect(groups.flatMap(group => group.items)).toHaveLength(menuData.menu.length);
});

test('exposes direct dashboard views and swaps Administration and Planning icons', () => {
  const dashboard = menuData.menu.find(item => item.id === 'dashboard');
  const administration = menuData.menu.find(item => item.id === 'administration');
  const planning = administration.children.find(item => item.id === 'planning');

  expect(dashboard.children.map(item => item.path)).toEqual([
    '/?view=overview',
    '/?view=intelligence',
    '/?view=map'
  ]);
  expect(administration.icon).toBe('Briefcase');
  expect(planning.icon).toBe('ClipboardList');
});

test.each([
  ['/', '', 'dashboard', 'global-steering'],
  ['/', '?view=intelligence', 'dashboard', 'global-intelligence'],
  ['/administration', '?tab=institution', 'administration', 'institution'],
  ['/administration', '?tab=compliance&section=registers', 'administration', 'compliance'],
  ['/finance', '?tab=depenses', 'finances', 'depenses']
])('resolves the active parent and child for %s%s', (pathname, search, parentId, childId) => {
  const active = resolveActiveMenuLocation(menuData, pathname, search);
  expect(active.parent?.id).toBe(parentId);
  expect(active.child?.id).toBe(childId);
});

test('keeps the parent active without inventing a child on an overview URL', () => {
  const active = resolveActiveMenuLocation(menuData, '/administration', '');
  expect(active.parent?.id).toBe('administration');
  expect(active.child).toBeNull();
});
