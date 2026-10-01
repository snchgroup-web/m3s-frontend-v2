import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseReferenceRate, { expenseReferenceValuation } from './ExpenseReferenceRate';

const expense = Object.freeze({ date: '2026-09-26', montantChf: 4.2, montantChfAvailable: true, montantCfaAvailable: false, hasExplicitTauxFx: false });

test('values a weekend expense without rounding the rate or mutating the payment', () => {
  const result = expenseReferenceValuation(expense);
  expect(result.rate).toBeCloseTo(694.5018528321863, 8);
  expect(result.equivalent).toBeCloseTo(2916.907781895183, 8);
  expect(expense.montantChf).toBe(4.2);
  expect(expense.montantCfaAvailable).toBe(false);
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
