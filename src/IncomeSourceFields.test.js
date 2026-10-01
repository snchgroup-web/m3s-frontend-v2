import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IncomeSourceFields, { emptyIncomeAmounts, normalizeIncomeAmounts, incomeAmountLabels } from './IncomeSourceFields';

test('CHF receipts do not require or infer a CFA conversion', () => {
  const result = normalizeIncomeAmounts({ ...emptyIncomeAmounts(), total_received: '2.50' });
  expect(result.total_received).toBe(2.5);
  expect(result.equivalent_chf).toBe(2.5);
  expect(result.equivalent_cfa).toBeNull();
  expect(() => normalizeIncomeAmounts({ total_paid: 2 })).toThrow();
});

test.each(['FR', 'EN', 'DE'])('localized source fields are editable in %s', language => {
  const onChange = jest.fn();
  render(<IncomeSourceFields value={emptyIncomeAmounts()} language={language} onChange={onChange} />);
  fireEvent.change(screen.getByLabelText(`${incomeAmountLabels[language].total_received} *`), { target: { value: '3.25' } });
  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ total_received: '3.25' }));
  fireEvent.change(screen.getByLabelText(incomeAmountLabels[language].currency), { target: { value: 'USD' } });
  expect(onChange).toHaveBeenLastCalledWith({ ...emptyIncomeAmounts(), original_currency: 'USD' });
});
