import { normalizeFinanceSummary } from './financeSummary';

const valid = { total_income_count: '3', total_expense_count: '1', total_income: '600', total_income_cfa: '360000', total_expenses: '50', total_expenses_cfa: '30000' };

test('normalizes authoritative totals independently from any loaded rows', () => {
  expect(normalizeFinanceSummary({ success: true, data: valid })).toEqual({ totalIncome: 600, totalIncomeCfa: 360000, totalExpenses: 50, totalExpensesCfa: 30000, incomeCount: 3, expenseCount: 1, timestamp: null, expensesMissingChf: 0, expensesMissingCfa: 0, incomeMissingChf: 0, incomeMissingCfa: 0 });
});

test('income in CHF remains complete without manufacturing CFA equivalents', () => {
  const result = normalizeFinanceSummary({ data: { ...valid, total_income_cfa: null,
    income_missing_chf: 0, income_missing_cfa: 1, known_income_cfa: 200000 } });
  expect(result.totalIncome).toBe(600);
  expect(result.totalIncomeCfa).toBeNull();
  expect(result.incomeSubtotal).toEqual({ chf: 600, cfa: 200000, missingChf: 0, missingCfa: 1 });
  const unknown = normalizeFinanceSummary({ data: { ...valid, total_income_cfa: null, income_missing_cfa: 3 } });
  expect(unknown.incomeSubtotal.cfa).toBeNull();
  expect(normalizeFinanceSummary({ data: { ...valid, income_missing_cfa: 4 } })).toBeNull();
});

test('keeps known subtotals separate from full totals and never fills unknowns with zero', () => {
  const result = normalizeFinanceSummary({ data: { ...valid, total_expense_count: 3, expenses_missing_chf: 1, expenses_missing_cfa: 2 } });
  expect(result.totalExpenses).toBeNull();
  expect(result.totalExpensesCfa).toBeNull();
  expect(result.expenseSubtotal).toEqual({ chf: 50, cfa: 30000, missingChf: 1, missingCfa: 2 });
  const unknown = normalizeFinanceSummary({ data: { ...valid, expenses_missing_chf: 1, expenses_missing_cfa: 1, total_expenses: null, total_expenses_cfa: null } });
  expect(unknown.expenseSubtotal.chf).toBeNull();
  expect(unknown.expenseSubtotal.cfa).toBeNull();
  expect(normalizeFinanceSummary({ data: { ...valid, expenses_missing_chf: 2 } })).toBeNull();
});

test('reads dedicated known subtotals when the API masks incomplete full totals', () => {
  const result = normalizeFinanceSummary({ data: { ...valid, total_expense_count: 3,
    total_expenses: null, total_expenses_cfa: null,
    known_expenses_chf: '123.45', known_expenses_cfa: 78900,
    expenses_missing_chf: 1, expenses_missing_cfa: 2 } });
  expect(result.expenseSubtotal).toEqual({ chf: 123.45, cfa: 78900, missingChf: 1, missingCfa: 2 });
  expect(result.totalExpenses).toBeNull();
  expect(result.totalExpensesCfa).toBeNull();
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
