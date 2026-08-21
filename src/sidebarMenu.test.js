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

test('keeps the Dashboard parent as its overview and preserves its eight child views', () => {
  const dashboard = menuData.menu.find(item => item.id === 'dashboard');
  const administration = menuData.menu.find(item => item.id === 'administration');
  const planning = administration.children.find(item => item.id === 'planning');

  expect(dashboard.children.map(item => item.path)).toEqual([
    '/?view=overview',
    '/?view=intelligence',
    '/?view=map',
    '/?view=architecture',
    '/?view=processes',
    '/?view=incidents',
    '/?view=resources',
    '/?view=glossary'
  ]);
  expect(dashboard.children.map(item => item.id)).toContain('global-steering');
  expect(dashboard.children.find(item => item.id === 'global-intelligence').label.FR).toBe('Daily Intelligence');
  expect(administration.icon).toBe('Briefcase');
  expect(planning.icon).toBe('ClipboardList');
});

test.each([
  ['/', '', 'dashboard', null],
  ['/', '?view=overview', 'dashboard', 'global-steering'],
  ['/', '?view=intelligence', 'dashboard', 'global-intelligence'],
  ['/', '?view=architecture', 'dashboard', 'global-architecture'],
  ['/', '?view=processes', 'dashboard', 'global-processes'],
  ['/', '?view=incidents', 'dashboard', 'global-incidents'],
  ['/', '?view=resources', 'dashboard', 'global-resources'],
  ['/', '?view=glossary', 'dashboard', 'global-glossary'],
  ['/administration', '?tab=institution', 'administration', 'institution'],
  ['/administration', '?tab=compliance&section=registers', 'administration', 'compliance'],
  ['/finance', '?tab=depenses', 'finances', 'depenses']
])('resolves the active parent and child for %s%s', (pathname, search, parentId, childId) => {
  const active = resolveActiveMenuLocation(menuData, pathname, search);
  expect(active.parent?.id).toBe(parentId);
  expect(active.child?.id || null).toBe(childId);
});

test('keeps the parent active without inventing a child on an overview URL', () => {
  const active = resolveActiveMenuLocation(menuData, '/administration', '');
  expect(active.parent?.id).toBe('administration');
  expect(active.child).toBeNull();
});

test('keeps the Dashboard parent active without activating the overview child', () => {
  const active = resolveActiveMenuLocation(menuData, '/', '');
  expect(active.parent?.id).toBe('dashboard');
  expect(active.child).toBeNull();
});

test('uses the shared overview label for the Dashboard landing view', () => {
  const dashboard = menuData.menu.find(item => item.id === 'dashboard');
  const overview = dashboard.children.find(item => item.id === 'global-steering');

  expect(overview.label).toEqual({
    FR: "Vue d'ensemble",
    EN: 'Overview',
    DE: 'Übersicht',
  });
});

test('places governed resources immediately before each local glossary', () => {
  const pairs = [
    ['finances', 'finance-resources', 'finance-glossary'],
    ['rh', 'rh-resources', 'rh-glossary'],
    ['commercial', 'crm-resources', 'crm-glossary'],
    ['production', 'production-resources', 'production-glossary'],
    ['stock', 'stock-resources', 'glossary'],
    ['it-support', 'it-support-resources', 'it-support-glossary'],
  ];

  pairs.forEach(([moduleId, resourcesId, glossaryId]) => {
    const ids = menuData.menu.find(item => item.id === moduleId).children.map(item => item.id);
    expect(ids.indexOf(resourcesId)).toBe(ids.indexOf(glossaryId) - 1);
  });

  const productionIds = menuData.menu.find(item => item.id === 'production').children.map(item => item.id);
  expect(productionIds.indexOf('production-stocks')).toBeLessThan(productionIds.indexOf('production-resources'));

  const itIds = menuData.menu.find(item => item.id === 'it-support').children.map(item => item.id);
  expect(itIds[0]).toBe('it-support-architecture');
  expect(itIds.at(-1)).toBe('it-support-glossary');
});

test('starts every support and operations function with Architecture then Processes', () => {
  const expected = [
    ['finances', 'finance-architecture', 'finance-processes'],
    ['rh', 'rh-architecture', 'rh-processes'],
    ['it-support', 'it-support-architecture', 'it-support-processes'],
    ['commercial', 'crm-architecture', 'crm-processes'],
    ['production', 'production-architecture', 'production-processes'],
    ['stock', 'stock-architecture', 'stock-processes']
  ];

  expected.forEach(([moduleId, architectureId, processesId]) => {
    const ids = menuData.menu.find(item => item.id === moduleId).children.map(item => item.id);
    expect(ids.slice(0, 2)).toEqual([architectureId, processesId]);
  });
});
