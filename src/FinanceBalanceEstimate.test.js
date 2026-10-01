import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceBalanceEstimate from './FinanceBalanceEstimate';
import FinanceOverviewIndicators from './FinanceOverviewIndicators';

test.each([
  ['FR', 'Solde CFA estimé', 'fr-CH'],
  ['EN', 'Estimated CFA balance', 'en-GB'],
  ['DE', 'Geschätzter CFA-Saldo', 'de-CH'],
])('renders a signed, dated estimate with source links in %s', (language, label, locale) => {
  render(<FinanceBalanceEstimate balance={-11672.77} state="available" language={language} />);
  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByTestId('finance-estimated-balance-cfa').textContent).toBe(`≈ ${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(-11672.77 * 655.957 / 0.9437)} CFA`);
  expect(screen.getByText(/01.10.2026/)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { hidden: true })).toHaveLength(2);
});

test.each([null, undefined, NaN, Infinity])('does not manufacture a balance from %s', balance => {
  render(<FinanceBalanceEstimate balance={balance} state="available" />);
  expect(screen.getByTestId('finance-estimated-balance-cfa')).toHaveTextContent('— CFA');
});
test.each(['loading', 'forbidden', 'unavailable'])('does not expose stale amounts in %s state', state => {
  render(<FinanceBalanceEstimate balance={100} state={state} />);
  expect(screen.getByTestId('finance-estimated-balance-cfa')).toHaveTextContent('— CFA');
});
test('preserves a real zero', () => {
  render(<FinanceBalanceEstimate balance={0} state="available" />);
  expect(screen.getByTestId('finance-estimated-balance-cfa')).toHaveTextContent('≈ 0 CFA');
});
test('keeps missing recorded CFA distinct from the estimate without using the undated header rate', () => {
  render(<FinanceOverviewIndicators financeState="available" netBalance={100} netBalanceCfa={null} currentRate={710} />);
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('— CFA');
  expect(screen.getByTestId('finance-estimated-balance-cfa').textContent).toBe(`≈ ${new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 0 }).format(100 * 655.957 / 0.9437)} CFA`);
});
