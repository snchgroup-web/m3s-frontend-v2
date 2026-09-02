import React from 'react';
import { render, screen, within } from '@testing-library/react';
import FinanceOverviewIndicators from './FinanceOverviewIndicators';

const BASE_PROPS = {
  language: 'FR',
  incomeCount: 12,
  expenseCount: 15,
  realEstateLoadedCount: 8,
  socialLoadedCount: 4,
  financeState: 'available',
  totalIncome: 1000,
  totalIncomeCfa: 650000,
  totalExpenses: 400,
  totalExpensesCfa: 260000,
  netBalance: 600,
  netBalanceCfa: 390000,
  currentRate: 710,
  realEstateState: 'available',
  realEstateFunding: 12000,
  realEstateFundingCfa: 7800000,
  reimbursements: 3000,
  reimbursementsCfa: 2130000,
  outstandingBalance: 9000,
  outstandingBalanceCfa: 6390000,
  socialState: 'available',
  socialTotal: 1500,
  socialTotalCfa: 975000
};

test('shows core, real-estate and social totals from their dedicated sources', () => {
  render(<FinanceOverviewIndicators {...BASE_PROPS} />);

  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('1 000 CHF');
  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('≈ 650 000 CFA');
  expect(screen.getByTestId('finance-total-income')).toHaveClass('text-xl', 'font-semibold');
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('400 CHF');
  expect(screen.getByTestId('finance-total-expenses')).toHaveTextContent('≈ 260 000 CFA');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('600 CHF');
  expect(screen.getByTestId('finance-net-balance')).toHaveTextContent('≈ 390 000 CFA');
  expect(screen.getByTestId('finance-real-estate-funding')).toHaveTextContent('12 000 CHF');
  expect(screen.getByTestId('finance-real-estate-funding')).toHaveTextContent('≈ 7 800 000 CFA');
  expect(screen.getByTestId('finance-real-estate-reimbursements')).toHaveTextContent('3 000 CHF');
  expect(screen.getByTestId('finance-real-estate-outstanding')).toHaveTextContent('9 000 CHF');
  expect(screen.getByTestId('finance-social-total')).toHaveTextContent('1 500 CHF');
  expect(screen.getByTestId('finance-social-total')).toHaveTextContent('≈ 975 000 CFA');
  expect(screen.getByText('Flux sociaux reclassés')).toBeInTheDocument();
});

test('preserves confirmed zeros while restricted and missing values stay unavailable', () => {
  render(
    <FinanceOverviewIndicators
      {...BASE_PROPS}
      totalIncome={0}
      totalIncomeCfa={0}
      totalExpenses={0}
      totalExpensesCfa={0}
      netBalance={0}
      netBalanceCfa={0}
      realEstateState="forbidden"
      realEstateFunding={null}
      reimbursements={null}
      outstandingBalance={null}
      socialState="unavailable"
      socialTotal={null}
    />
  );

  expect(screen.getByTestId('finance-total-income')).toHaveTextContent('0 CHF');
  expect(screen.getAllByText('Zéro confirmé par la source')).toHaveLength(3);
  expect(screen.getByTestId('finance-real-estate-funding')).toHaveTextContent('— CHF');
  expect(screen.getAllByText('Accès restreint')).toHaveLength(3);
  expect(screen.getByTestId('finance-social-total')).toHaveTextContent('— CHF');
  expect(screen.getByText('Source indisponible')).toBeInTheDocument();
  expect(screen.queryByText(/7 800 000 CFA/)).not.toBeInTheDocument();
  expect(screen.queryByText(/975 000 CFA/)).not.toBeInTheDocument();
});

test('shares the CFA currency style and distinguishes global counts from loaded registers', () => {
  render(<FinanceOverviewIndicators {...BASE_PROPS} />);
  const card = id => within(screen.getByTestId(id).closest('article'));
  expect(card('finance-total-income').getByText('Transactions : 12')).toBeInTheDocument();
  expect(card('finance-total-expenses').getByText('Transactions : 15')).toBeInTheDocument();
  expect(card('finance-net-balance').getByText('Transactions : 27')).toBeInTheDocument();
  expect(card('finance-real-estate-reimbursements').getByText('Registre : transactions chargées : 8')).toBeInTheDocument();
  expect(card('finance-social-total').getByText('Transactions chargées : 4')).toBeInTheDocument();
  expect(card('finance-current-rate').queryByText(/Transactions/)).not.toBeInTheDocument();
  expect(document.querySelectorAll('.m3s-currency-cfa')).toHaveLength(7);
  document.querySelectorAll('.m3s-currency-cfa').forEach(node => {
    expect(node.style.color).not.toBe('var(--m3s-status-warning)');
    expect(node.parentElement).toHaveClass('text-xl', 'font-semibold');
  });
});
