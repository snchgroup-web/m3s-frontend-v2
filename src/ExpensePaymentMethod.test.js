import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpensePaymentMethod, { paymentMethodLabel } from './ExpensePaymentMethod';

test.each([
  ['FR', 'Moyen de paiement', 'Carte de crédit'],
  ['EN', 'Payment method', 'Credit card'],
  ['DE', 'Zahlungsmittel', 'Kreditkarte'],
])('selects a stable persisted value using %s labels', (language, label, option) => {
  const onChange = jest.fn();
  render(<ExpensePaymentMethod value="" language={language} onChange={onChange} />);
  expect(screen.getByRole('option', { name: option })).toHaveValue('Carte de crédit');
  fireEvent.change(screen.getByLabelText(label), { target: { value: 'Carte de crédit' } });
  expect(onChange).toHaveBeenCalledWith('Carte de crédit');
});

test.each(['Virement', 'Google Pay Credit', 'Paiement'])('preserves existing values including legacy and unspecified: %s', value => {
  render(<ExpensePaymentMethod value={value} language="EN" onChange={jest.fn()} />);
  expect(screen.getByLabelText('Payment method')).toHaveValue(value);
});

test('does not treat the generic payment placeholder as a known method', () => {
  expect(paymentMethodLabel('Paiement', 'FR')).toBe('Non renseigné');
  expect(paymentMethodLabel('Virement', 'EN')).toBe('Bank transfer');
  expect(paymentMethodLabel('Google Pay Credit', 'FR')).toBe('Google Pay Credit');
});
