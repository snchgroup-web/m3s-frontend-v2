import {
  ADMINISTRATION_AUDIT_PERMISSION,
  filterAuthorizedItems,
  hasPermission
} from './accessControl';

test('keeps unrestricted items and hides restricted items without the required permission', () => {
  const items = [
    { id: 'overview' },
    { id: 'audit', requiredPermission: ADMINISTRATION_AUDIT_PERMISSION }
  ];

  expect(filterAuthorizedItems(items, []).map(item => item.id)).toEqual(['overview']);
  expect(filterAuthorizedItems(items, [ADMINISTRATION_AUDIT_PERMISSION]).map(item => item.id))
    .toEqual(['overview', 'audit']);
  expect(hasPermission([], '')).toBe(true);
});
