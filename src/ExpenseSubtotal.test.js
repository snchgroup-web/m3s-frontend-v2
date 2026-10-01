import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceOverviewIndicators from './FinanceOverviewIndicators';
import { expenseSubtotalCopy } from './financeSummary';

test.each(['FR', 'EN', 'DE'])('labels partial expenses and preserves full balance in %s', language => {
  render(<FinanceOverviewIndicators language={language} financeState="available" expenseCount={144}
    expenseSubtotal={{ chf: 123.45, cfa: 78900, missingChf: 1, missingCfa: 2 }}
    totalExpenses={null} totalExpensesCfa={null} netBalance={null} netBalanceCfa={null} />);
  expect(screen.getByText(expenseSubtotalCopy(language).label)).toBeInTheDocument();
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('123');
  expect(screen.getByTestId('finance-total-expenses')).not.toHaveTextContent('≈');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('— CHF');
  expect(screen.getByText(/CHF 1 · CFA 2/)).toBeInTheDocument();
});

test.each(['loading', 'forbidden', 'unavailable'])('does not expose stale partial values while %s', financeState => {
  render(<FinanceOverviewIndicators financeState={financeState}
    expenseSubtotal={{ chf: 123.45, cfa: 78900, missingChf: 1, missingCfa: 2 }} />);
  expect(screen.queryByText(expenseSubtotalCopy('FR').label)).not.toBeInTheDocument();
  expect(screen.getByTestId('finance-total-expenses')).not.toHaveTextContent('123');
});
