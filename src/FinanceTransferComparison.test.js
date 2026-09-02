import React, { useState } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import FinanceTransferComparison from './FinanceTransferComparison';
import { compareTransferQuotes, createTransferComparison, TRANSFER_QUOTE_MAX_AGE_MS } from './financeTransferQuotes';

const timestamp = '2026-09-03T12:00';
const now = new Date(timestamp).getTime();
const ready = () => ({ ...createTransferComparison(), quotes: [
  { id: 'ria', total: '100', fees: '2', net: '67000', observedAt: timestamp, delay: '', verified: true },
  { id: 'wu', total: '100', fees: '0', net: '66500', observedAt: timestamp, delay: '', verified: true }
] });
const assess = state => compareTransferQuotes(state, now);

test('blank drafts never have rates or a winning provider', () => {
  const result = assess(createTransferComparison());
  expect(result.status).toBe('pending');
  expect(result.bestId).toBeNull();
  expect(result.quotes.every(quote => quote.effectiveRate === null)).toBe(true);
});
test('compares net amounts for equal all-in budgets, without subtracting included fees again', () => {
  const result = assess(ready());
  expect(result).toMatchObject({ status: 'ranked', bestId: 'ria', difference: 500 });
  expect(result.quotes[0].effectiveRate).toBe(670);
});
test('zero fees are valid and equal amounts do not name a winner', () => {
  const state = ready(); state.quotes[1].net = '67000';
  expect(assess(state)).toMatchObject({ status: 'equal', bestId: null, difference: 0 });
});
test('never scales mismatching budgets into a ranking', () => {
  const state = ready(); state.quotes[1].total = '99.99';
  expect(assess(state)).toMatchObject({ status: 'budget', bestId: null });
});
test.each(['', ' ', null, undefined, 'Infinity', 'NaN', '-1', '0', '0.001', '1000000000001'])('invalid budget %s cannot be ranked', total => {
  const state = ready(); state.quotes[0].total = total;
  expect(assess(state).status).toBe('pending');
});
test.each(['', ' ', null, 'Infinity', '-1', '0'])('invalid net %s cannot be ranked', net => {
  const state = ready(); state.quotes[0].net = net;
  expect(assess(state).status).toBe('pending');
});
test.each(['', ' ', null, '-1', '100', '200'])('missing or excessive fees %s cannot be ranked', fees => {
  const state = ready(); state.quotes[0].fees = fees;
  expect(assess(state).status).toBe('pending');
});
test.each(['', 'invalid', '2026-09-03', '2026-02-31T12:00', '2026-09-03T12:01'])('invalid or future timestamp %s cannot be ranked', observedAt => {
  const state = ready(); state.quotes[0].observedAt = observedAt;
  expect(assess(state).quotes[0].reason).toBe('date');
});
test('quotes expire under the explicit internal freshness rule', () => {
  expect(compareTransferQuotes(ready(), now + TRANSFER_QUOTE_MAX_AGE_MS).status).toBe('ranked');
  expect(compareTransferQuotes(ready(), now + TRANSFER_QUOTE_MAX_AGE_MS + 1)).toMatchObject({ status: 'pending', bestId: null });
});
test('unverified conditions block ranking', () => {
  const state = ready(); state.quotes[1].verified = false;
  expect(assess(state).quotes[1].reason).toBe('unverified');
});

function Harness({ language = 'FR', initial = ready() }) {
  const [value, onChange] = useState(initial);
  return <FinanceTransferComparison language={language} value={value} onChange={onChange} />;
}
beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(now));
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

test.each([['FR', 'Comparer les transferts'], ['EN', 'Compare transfers'], ['DE', 'Überweisungen vergleichen']])('renders %s and links only to official CH to SN sources', (language, heading) => {
  render(<Harness language={language} initial={createTransferComparison()} />);
  expect(screen.getByRole('heading', { name: heading })).toBeVisible();
  for (const link of screen.getAllByRole('link')) {
    expect(link.href).toMatch(/^https:\/\/www\.(riamoneytransfer|westernunion)\.com\/(fr-ch|ch\/fr)\/send-money-to-senegal/);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  expect(screen.getAllByRole('checkbox').every(input => !input.checked)).toBe(true);
});
test.each(['Réception', 'Paiement', 'Tarif'])('changing %s invalidates both quote confirmations without deleting entered amounts', label => {
  render(<Harness />);
  const select = screen.getByLabelText(label);
  fireEvent.change(select, { target: { value: select.options[1].value } });
  expect(screen.getAllByRole('checkbox').every(input => !input.checked)).toBe(true);
  expect(screen.getByText('Comparaison en attente de deux devis vérifiés.')).toBeVisible();
  expect(within(screen.getByRole('group', { name: 'Ria' })).getByLabelText('Total débité, frais inclus (CHF)')).toHaveValue(100);
});
test('editing a quote clears its verification and removes the winner', () => {
  render(<Harness />);
  fireEvent.change(within(screen.getByRole('group', { name: 'Ria' })).getByLabelText('Net reçu, déductions incluses (CFA)'), { target: { value: '67500' } });
  expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
  expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
  expect(screen.getByText('Comparaison en attente de deux devis vérifiés.')).toBeVisible();
});
test('an idle comparison expires without an API request or user interaction', () => {
  jest.useFakeTimers();
  jest.setSystemTime(now);
  render(<Harness />);
  expect(screen.getByText(/Net le plus élevé.*Ria/)).toBeVisible();
  act(() => jest.advanceTimersByTime(TRANSFER_QUOTE_MAX_AGE_MS + 1));
  expect(screen.getByText('Comparaison en attente de deux devis vérifiés.')).toBeVisible();
});
