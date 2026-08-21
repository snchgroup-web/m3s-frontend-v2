import { normalizeAdministrationUser, normalizeAuthAccountsCount } from './administrationUsers';

test('normalizes the governed HR user shape without inventing missing fields', () => {
  expect(normalizeAdministrationUser({
    id: 'cheikh',
    name: 'Cheikh Ndiaye',
    email: 'cheikh@example.test',
    position: 'Initiateur et porteur de projet',
    department: 'Management',
    member_type: 'Fondateur',
    status: 'Actif'
  })).toEqual({
    id: 'cheikh',
    name: 'Cheikh Ndiaye',
    email: 'cheikh@example.test',
    position: 'Initiateur et porteur de projet',
    department: 'Management',
    memberType: 'Fondateur',
    status: 'Actif'
  });
});

test.each([
  [{ total: 6 }, 6],
  [{ count: '4' }, 4],
  [{ total: null }, null],
  [{}, null]
])('normalizes the authenticated account count from %p', (payload, expected) => {
  expect(normalizeAuthAccountsCount(payload)).toBe(expected);
});
