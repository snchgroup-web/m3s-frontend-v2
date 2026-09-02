import { matchesIncomeScope, normalizeIncomeScope } from './financeIncomeScope';

test.each([
  ['DON', true, false], ['Don manuel', true, false], ['FINANCEMENT', false, true],
  ['financement', false, true], ['VENTES', false, false], ['', false, false],
  [undefined, false, false], ['FINANCEMENT IMMO', false, false]
])('preserves current Dashboard category rule for %s', (category, donation, financing) => {
  const row = { category, description: 'DON FINANCEMENT' };
  expect(matchesIncomeScope(row, 'donations')).toBe(donation);
  expect(matchesIncomeScope(row, 'financing')).toBe(financing);
  expect(matchesIncomeScope(row, 'all')).toBe(true);
});

test.each([null, undefined, 'unknown', 'DON', '__proto__'])('invalid scope %s defaults to all', value => {
  expect(normalizeIncomeScope(value)).toBe('all');
});

test('does not extend category rules to translated or alternative fields', () => {
  expect(matchesIncomeScope({ categorie: 'DON', description: 'DON' }, 'donations')).toBe(false);
});
