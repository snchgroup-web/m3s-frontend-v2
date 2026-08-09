import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import LocalizedDateInput from './LocalizedDateInput';

const ControlledDateInput = ({ initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  return <LocalizedDateInput value={value} onChange={setValue} className="w-full" />;
};

beforeEach(() => {
  localStorage.setItem('language', 'FR');
});

test('exposes a visible, accessible date control and calendar dialog', () => {
  render(
    <LanguageProvider>
      <ControlledDateInput />
    </LanguageProvider>
  );

  const trigger = screen.getByRole('button', { name: 'Sélectionner une date' });
  expect(trigger).toHaveClass('m3s-date-input__control');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('dialog', { name: 'Sélecteur de date' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Mois précédent' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Mois suivant' })).toBeInTheDocument();
});

test('keeps a formatted selected value visible', () => {
  render(
    <LanguageProvider>
      <ControlledDateInput initialValue="2026-08-09" />
    </LanguageProvider>
  );

  const trigger = screen.getByRole('button', { name: /Sélectionner une date : 09 août 2026/i });
  expect(trigger.querySelector('.m3s-date-input__value')).not.toHaveClass('is-placeholder');
  expect(screen.getByText('09 août 2026')).toBeInTheDocument();
});
