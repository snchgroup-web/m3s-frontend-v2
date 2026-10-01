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
  const expensesMissingChf = parseTransactionCount(response.data.expenses_missing_chf) ?? 0;
  const expensesMissingCfa = parseTransactionCount(response.data.expenses_missing_cfa) ?? 0;
  if (expensesMissingChf > expenseCount || expensesMissingCfa > expenseCount) return null;
  if (totalIncome === null || (totalExpenses === null && expensesMissingChf === 0)) return null;

  return {
    totalIncome,
    totalIncomeCfa,
    totalExpenses: expensesMissingChf > 0 ? null : totalExpenses,
    totalExpensesCfa: expensesMissingCfa > 0 ? null : totalExpensesCfa,
    ...((expensesMissingChf > 0 || expensesMissingCfa > 0) ? {
      expenseSubtotal: {
        chf: expensesMissingChf < expenseCount ? parseFiniteNumber(response.data.known_expenses_chf) ?? totalExpenses : null,
        cfa: expensesMissingCfa < expenseCount ? parseFiniteNumber(response.data.known_expenses_cfa) ?? totalExpensesCfa : null,
        missingChf: expensesMissingChf,
        missingCfa: expensesMissingCfa
      }
    } : {}),
    expensesMissingChf,
    expensesMissingCfa,
    incomeCount,
    expenseCount,
    timestamp: response.timestamp || null
  };
};

export const expenseSubtotalCopy = (language = 'FR') => ({
  FR: { label: 'Dépenses connues · sous-total', partial: 'Partiel', missing: 'Contre-valeurs non renseignées', balance: 'Solde complet en attente des conversions', source: 'Montants enregistrés ; paiements non convertis exclus' },
  EN: { label: 'Known expenses · subtotal', partial: 'Partial', missing: 'Missing currency equivalents', balance: 'Full balance pending conversions', source: 'Recorded amounts; unconverted payments excluded' },
  DE: { label: 'Bekannte Ausgaben · Zwischensumme', partial: 'Teilbetrag', missing: 'Fehlende Gegenwerte', balance: 'Vollständiger Saldo wartet auf Umrechnungen', source: 'Erfasste Beträge; nicht umgerechnete Zahlungen ausgeschlossen' }
}[language] || expenseSubtotalCopy('FR'));
