import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseSourceFields, { emptySourceAmounts } from './ExpenseSourceFields';
import { normalizeExpenseAmounts } from './financeExpenseAmounts';
import { normalizeFinanceSummary } from './financeSummary';

test.each(['FR', 'EN', 'DE'])('source amount fields render in %s', language => {
  render(<ExpenseSourceFields language={language} value={emptySourceAmounts()} onChange={() => {}} />);
  expect(screen.getAllByRole('combobox')).toHaveLength(2);
  expect(screen.getAllByRole('spinbutton')).toHaveLength(5);
});
test('currency change clears previous amounts and conversion', () => {
  const onChange = jest.fn();
  render(<ExpenseSourceFields language="EN" value={{ ...emptySourceAmounts(), total_paid: '123', equivalent_cfa: '456' }} onChange={onChange} />);
  fireEvent.change(screen.getByLabelText('Payment currency'), { target: { value: 'USD' } });
  expect(onChange).toHaveBeenCalledWith({ ...emptySourceAmounts(), original_currency: 'USD' });
});
test('recipient money is not a total equivalent', () => {
  const result = normalizeExpenseAmounts({ original_currency: 'CHF', total_paid: 11, principal: 10, fees: 1, recipient_currency: 'XOF', recipient_amount: 6500 });
  expect(result.equivalent_chf).toBe(11);
  expect(result.equivalent_cfa).toBeNull();
});
test('partial and all-unknown equivalents cannot look like complete totals', () => {
  const data = { total_income_count: 1, total_expense_count: 2, total_income: 100, total_income_cfa: 65000,
    total_expenses: 10, total_expenses_cfa: null, expenses_missing_chf: 1, expenses_missing_cfa: 2 };
  expect(normalizeFinanceSummary({ data }).totalExpenses).toBeNull();
  expect(normalizeFinanceSummary({ data }).totalExpensesCfa).toBeNull();
  expect(normalizeFinanceSummary({ data: { ...data, total_expenses: null } }).expensesMissingChf).toBe(1);
});
