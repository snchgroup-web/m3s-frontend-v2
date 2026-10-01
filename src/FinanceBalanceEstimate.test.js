import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.queryByText(/01.10.2026/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: label }));
  expect(screen.getByRole('dialog', { name: label })).toHaveFocus();
  expect(screen.getByText(/01.10.2026/)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { hidden: true })).toHaveLength(2);
});

test('closes with Escape, close button and backdrop, restoring focus without moving details into the card', () => {
  render(<FinanceBalanceEstimate balance={100} state="available" />);
  const trigger = screen.getByRole('button', { name: 'Solde CFA estimé' });
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog');
  expect(trigger.contains(dialog)).toBe(false);
  fireEvent.keyDown(dialog, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('button', { name: 'Fermer' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('dialog').parentElement);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('contains keyboard focus in the dialog including source links', () => {
  render(<FinanceBalanceEstimate balance={100} state="available" />);
  fireEvent.click(screen.getByRole('button', { name: 'Solde CFA estimé' }));
  const close = screen.getByRole('button', { name: 'Fermer' });
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  const last = screen.getAllByRole('link').at(-1);
  expect(last).toHaveFocus();
  fireEvent.keyDown(last, { key: 'Tab' });
  expect(close).toHaveFocus();
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
