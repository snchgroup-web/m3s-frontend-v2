export const normalizeIncomeScope = value =>
  ['donations', 'financing'].includes(value) ? value : 'all';

// Preserve the Dashboard's source-category rules, never match translated text or descriptions.
export const matchesIncomeScope = (row, scope) => {
  const category = String(row.category || '').toUpperCase();
  if (scope === 'donations') return category.includes('DON');
  if (scope === 'financing') return category === 'FINANCEMENT';
  return true;
};
