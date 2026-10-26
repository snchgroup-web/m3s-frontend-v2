import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CorrespondenceAgenda from './CorrespondenceAgenda';

jest.mock('./AuthContext', () => ({ useAuth: () => ({ token: null, user: null }) }));
jest.mock('react-router-dom', () => ({ Link: ({ children }) => <span>{children}</span> }), { virtual: true });

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('2026-10-26T12:00:00Z'));
});

afterEach(() => jest.useRealTimers());

test.each([
  ['FR', 'Mois', 'fr-CH'],
  ['DE', 'Monat', 'de-CH'],
  ['EN', 'Month', 'en-GB']
])('keeps the native %s month control labelled, localised and ISO-valued', (language, label, locale) => {
  render(<CorrespondenceAgenda language={language} />);
  const input = screen.getByLabelText(label);
  expect(input).toHaveAttribute('type', 'month');
  expect(input).toHaveAttribute('lang', locale);
  expect(input).toHaveClass('m3s-agenda-month');
  expect(input).toHaveValue('2026-10');
});

test('retains native month selection, previous/next and today navigation', () => {
  render(<CorrespondenceAgenda />);
  const input = screen.getByLabelText('Mois');
  fireEvent.change(input, { target: { value: '2026-12' } });
  expect(input).toHaveValue('2026-12');
  fireEvent.click(screen.getByRole('button', { name: 'Mois suivant' }));
  expect(input).toHaveValue('2027-01');
  fireEvent.click(screen.getByRole('button', { name: 'Mois pr\u00e9c\u00e9dent' }));
  expect(input).toHaveValue('2026-12');
  fireEvent.click(screen.getByRole('button', { name: 'Aujourd\u2019hui' }));
  expect(input).toHaveValue('2026-10');
});
