import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceTransactionCount, { parseTransactionCount, sumTransactionCounts } from './FinanceTransactionCount';

test.each([null, undefined, '', ' ', false, true, -1, 1.5, Infinity, NaN, {}, Number.MAX_SAFE_INTEGER + 1])('rejects invalid count %p', value => {
  expect(parseTransactionCount(value)).toBeNull();
});

test('accepts real zero and integer API strings without fabricating a balance count', () => {
  expect(parseTransactionCount('0')).toBe(0);
  expect(parseTransactionCount('200')).toBe(200);
  expect(sumTransactionCounts('200', 3)).toBe(203);
  expect(sumTransactionCounts(0, 0)).toBe(0);
  expect(sumTransactionCounts(200, null)).toBeNull();
});

test.each([
  ['FR', 'global', 'Transactions : 2'],
  ['EN', 'extract', 'Loaded transactions : 2'],
  ['DE', 'registry', 'Register: geladene Transaktionen : 2']
])('localizes %s and keeps the %s scope explicit', (language, scope, label) => {
  render(<FinanceTransactionCount count={2} state="available" language={language} scope={scope} />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

test.each(['forbidden', 'restricted', 'unavailable'])('does not expose a stale count in %s', state => {
  render(<FinanceTransactionCount count={8} state={state} />);
  expect(screen.getByText('Transactions : —')).toBeInTheDocument();
});

test('distinguishes loading, unavailable and confirmed zero', () => {
  const { rerender } = render(<FinanceTransactionCount count={0} state="loading" />);
  expect(screen.getByText('Transactions : …')).toBeInTheDocument();
  rerender(<FinanceTransactionCount count={null} state="available" />);
  expect(screen.getByText('Transactions : —')).toBeInTheDocument();
  rerender(<FinanceTransactionCount count={0} state="available" />);
  expect(screen.getByText('Transactions : 0')).toBeInTheDocument();
});
