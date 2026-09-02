import { parseTransactionCount } from './FinanceTransactionCount';

const parseFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeFinanceSummary = (response) => {
  if (response?.success === false || !response?.data) return null;

  const incomeCount = parseTransactionCount(response.data.total_income_count);
  const expenseCount = parseTransactionCount(response.data.total_expense_count);
  const rawIncome = parseFiniteNumber(response.data.total_income);
  const rawIncomeCfa = parseFiniteNumber(response.data.total_income_cfa);
  const rawExpenses = parseFiniteNumber(response.data.total_expenses);
  const rawExpensesCfa = parseFiniteNumber(response.data.total_expenses_cfa);

  if (incomeCount === null || expenseCount === null || incomeCount < 0 || expenseCount < 0) return null;

  const totalIncome = incomeCount === 0 ? 0 : rawIncome;
  const totalIncomeCfa = incomeCount === 0 ? 0 : rawIncomeCfa;
  const totalExpenses = expenseCount === 0 ? 0 : rawExpenses;
  const totalExpensesCfa = expenseCount === 0 ? 0 : rawExpensesCfa;
  if (totalIncome === null || totalExpenses === null) return null;

  return {
    totalIncome,
    totalIncomeCfa,
    totalExpenses,
    totalExpensesCfa,
    incomeCount,
    expenseCount,
    timestamp: response.timestamp || null
  };
};
