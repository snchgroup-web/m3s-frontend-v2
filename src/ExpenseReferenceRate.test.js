import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseReferenceRate, { ExpenseReferenceAmount, expenseReferenceValuation } from './ExpenseReferenceRate';

const expense = Object.freeze({ date: '2026-09-26', montantChf: 4.2, montantChfAvailable: true, montantCfaAvailable: false, hasExplicitTauxFx: false });

test('values a weekend expense without rounding the rate or mutating the payment', () => {
  const result = expenseReferenceValuation(expense);
  expect(result.rate).toBeCloseTo(694.5018528321863, 8);
  expect(result.equivalent).toBeCloseTo(2916.907781895183, 8);
  expect(expense.montantChf).toBe(4.2);
  expect(expense.montantCfaAvailable).toBe(false);
});

const observation = { date: '2026-10-02', rate: 695, devise_from: 'CHF', devise_to: 'XOF', source: 'Synthetic dated TFX reference' };
test.each([[1.62, 1123], [2.43, 1685]])('values a CHF refund of %s at the dated reference without changing ledger amounts', (amount, rounded) => {
  const receipt = Object.freeze({ ...expense, date: '2026-09-18', montantChf: amount,
    source_amounts: Object.freeze({ original_currency: 'CHF', total_received: amount }) });
  const result = expenseReferenceValuation(receipt);
  expect(result.rate).toBeCloseTo(655.957 / 0.9462, 10);
  expect(result.date).toBe('2026-09-18');
  expect(result.validThrough).toBe('2026-09-18');
  expect(result.source).toContain('cambi_rif_20260918');
  expect(Math.round(result.equivalent)).toBe(rounded);
  expect(receipt.montantCfaAvailable).toBe(false);
  expect(receipt.source_amounts.total_received).toBe(amount);
});
test('uses the exact dated TFX observation, including inverse XOF pairs', () => {
  const row = { ...expense, date: observation.date };
  const history = Object.freeze([Object.freeze(observation)]);
  expect(expenseReferenceValuation(row, history)).toMatchObject({ rate: 695, fromHistory: true, source: observation.source });
  expect(expenseReferenceValuation(row, [{ ...observation, devise_from: 'XOF', devise_to: 'CHF', rate: 1 / 695 }]).rate).toBeCloseTo(695);
});

test.each([
  [{ ...observation, date: '2026-09-30' }],
  [{ ...observation, date: '2026-10-03' }],
  [{ ...observation, source: '' }],
  [{ ...observation, source: 'Ria transfer' }],
  [{ ...observation, rate: 0 }],
  [observation, { ...observation, rate: 700 }],
])('does not substitute stale, future, unsourced, transaction or conflicting rates: %j', history => {
  expect(expenseReferenceValuation({ ...expense, date: observation.date }, history)).toBeNull();
});

test.each(['2026-09-02', '2026-09-04', '2026-09-29'])('retains official source metadata for %s', date => {
  const result = expenseReferenceValuation({ ...expense, date });
  expect(result.date).toBe(date);
  expect(result.fromHistory).toBe(false);
  expect(result.source).toContain(date.replaceAll('-', ''));
  expect(result.equivalent).toBeGreaterThan(0);
});

test.each([{ source_amounts: { recipient_amount: 100 } }, { fournisseur: 'Ria' }, { description: 'Western Union transfer' }])('does not resolve transfer evidence with a market estimate: %j', fields => {
  expect(expenseReferenceValuation({ ...expense, ...fields })).toBeNull();
});

test('renders an indicative amount and an unavailable state without a false zero', () => {
  const { rerender } = render(<ExpenseReferenceAmount expense={expense} language="FR" />);
  expect(screen.getByText(/≈/)).toHaveTextContent('2');
  expect(screen.getByText('Hors totaux comptables')).toBeInTheDocument();
  rerender(<ExpenseReferenceAmount expense={{ ...expense, date: '2026-10-02' }} language="FR" />);
  expect(screen.getByText('Référence indisponible')).toBeInTheDocument();
  expect(screen.queryByText('0')).not.toBeInTheDocument();
});

test('never renders executable source links', () => {
  render(<ExpenseReferenceRate expense={{ ...expense, date: observation.date }} history={[{ ...observation, source: 'javascript:alert(1)' }]} language="EN" />);
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('values the October CHF debit with its dated ECB reference, without changing the source payment', () => {
  const claude = Object.freeze({ ...expense, date: '2026-10-01', montantChf: 18.24,
    source_amounts: Object.freeze({ original_currency: 'USD', total_paid: 21.62 }) });
  const result = expenseReferenceValuation(claude);
  expect(result.date).toBe('2026-10-01');
  expect(result.validThrough).toBe('2026-10-01');
  expect(result.rate).toBeCloseTo(655.957 / 0.9437, 10);
  expect(Math.round(result.equivalent)).toBe(12678);
  expect(result.source).toContain('www.ecb.europa.eu');
  expect(result.fromHistory).toBe(false);
  expect(claude.source_amounts.total_paid).toBe(21.62);
  expect(claude.montantCfaAvailable).toBe(false);
  render(<ExpenseReferenceAmount expense={claude} language="FR" />);
  expect(screen.getByText('Hors totaux comptables')).toBeInTheDocument();
  expect(screen.queryByText('Référence indisponible')).not.toBeInTheDocument();
});

test.each([
  { date: '2026-09-24' }, { date: '2026-09-28' }, { date: '' },
  { date: 'not-a-date' }, { hasExplicitTauxFx: true }, { montantCfaAvailable: true },
  { montantChfAvailable: false }, { montantChf: null }, { montantChf: NaN }, { montantChf: 0 },
])('does not invent or replace a recorded conversion: %j', overrides => {
  expect(expenseReferenceValuation({ ...expense, ...overrides })).toBeNull();
});

test.each([
  ['FR', 'Référence indicative', 'Hors totaux comptables', 'fr-CH'],
  ['EN', 'Indicative reference', 'Excluded from recorded totals', 'en-GB'],
  ['DE', 'Indikativer Referenzkurs', 'Nicht in gebuchten Summen', 'de-CH'],
])('renders the source and indicative amount in %s without opening row editing', (language, reference, excluded, locale) => {
  const edit = jest.fn();
  render(<div onClick={edit}><ExpenseReferenceRate expense={expense} language={language} missingLabel="missing" /></div>);
  expect(screen.getByText(`${reference} · 25.09.2026`)).toBeInTheDocument();
  expect(screen.getByText(new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(655.957 / 0.9445))).toBeInTheDocument();
  fireEvent.click(document.querySelector('summary'));
  expect(screen.getByText(excluded)).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(2);
  expect(edit).not.toHaveBeenCalled();
});
