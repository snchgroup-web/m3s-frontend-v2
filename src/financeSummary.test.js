import { normalizeFinanceSummary } from './financeSummary';

const valid = { total_income_count: '3', total_expense_count: '1', total_income: '600', total_income_cfa: '360000', total_expenses: '50', total_expenses_cfa: '30000' };

test('normalizes authoritative totals independently from any loaded rows', () => {
  expect(normalizeFinanceSummary({ success: true, data: valid })).toEqual({ totalIncome: 600, totalIncomeCfa: 360000, totalExpenses: 50, totalExpensesCfa: 30000, incomeCount: 3, expenseCount: 1, timestamp: null });
});

test.each([null, {}, { success: false, data: valid }, { data: { ...valid, total_income_count: null } }, { data: { ...valid, total_expense_count: -1 } }, { data: { ...valid, total_income: null } }])('rejects unavailable or invalid summary %p', response => {
  expect(normalizeFinanceSummary(response)).toBeNull();
});

test('preserves authoritative zero-count totals and absent CFA separately', () => {
  const zero = normalizeFinanceSummary({ data: { ...valid, total_income_count: 0, total_income: null, total_income_cfa: null } });
  expect(zero.totalIncome).toBe(0);
  expect(zero.totalIncomeCfa).toBe(0);
  const missing = normalizeFinanceSummary({ data: { ...valid, total_income_cfa: null } });
  expect(missing.totalIncome).toBe(600);
  expect(missing.totalIncomeCfa).toBeNull();
});
