import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceAmountPair, { convertFinanceAmount } from './FinanceAmountPair';

test.each([
  [100, 'CHF', 705, { chf: 100, cfa: 70500 }],
  [70500, 'CFA', 705, { chf: 100, cfa: 70500 }],
  [0, 'CHF', 705, { chf: 0, cfa: 0 }],
  [-20, 'CHF', 705, { chf: -20, cfa: -14100 }],
  ['', 'CHF', 705, { chf: null, cfa: null }],
  [' ', 'CFA', 705, { chf: null, cfa: null }],
  [null, 'CHF', 705, { chf: null, cfa: null }],
  [100, 'CHF', '', { chf: 100, cfa: null }],
  [100, 'CFA', 0, { chf: null, cfa: 100 }],
  [100, 'CHF', -2, { chf: 100, cfa: null }],
  [100, 'CHF', Infinity, { chf: 100, cfa: null }],
  [1e308, 'CHF', 710, { chf: 1e308, cfa: null }],
  [100, 'EUR', 705, { chf: null, cfa: null }],
])('converts %s %s only with its supplied rate %s', (amount, currency, rate, expected) => {
  expect(convertFinanceAmount(amount, currency, rate)).toEqual(expected);
});

test.each(['FR', 'EN', 'DE'])('renders equally sized currency values in %s', language => {
  render(<FinanceAmountPair chf={100} cfa={70500} label="QA amount" language={language} />);
  const pair = screen.getByRole('status', { name: 'QA amount' });
  expect(pair).toHaveClass('text-base', 'font-semibold', 'flex-wrap');
  expect(pair.children[0]).toHaveTextContent('100 CHF');
  expect(pair.children[1]).toHaveTextContent('CFA');
  expect(pair.children[1]).toHaveClass('m3s-currency-cfa');
  for (const child of pair.children) expect(child.className).not.toMatch(/text-(xs|sm|lg|xl)/);
});

test('does not reinterpret independently recorded real-estate amounts', () => {
  render(<FinanceAmountPair chf={0} cfa={100000} label="Recorded amounts" language="FR" approximate={false} />);
  const pair = screen.getByRole('status', { name: 'Recorded amounts' });
  expect(pair).toHaveTextContent('0 CHF');
  expect(pair).not.toHaveTextContent('≈');
  expect(pair.children[1].textContent.replace(/\s/g, '')).toBe('100000CFA');
});
