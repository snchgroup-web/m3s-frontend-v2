import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceReadStatus, { formatFinanceReadTime } from './FinanceReadStatus';

const summary = { incomeCount: 62, expenseCount: 150, timestamp: '2026-10-15T14:00:00Z' };

test.each([
  ['FR', 'Recettes globales et solde : hors flux sociaux.', /15-10-26/, 'Actualiser recettes, dépenses et flux sociaux'],
  ['DE', 'Globale Einnahmen und Saldo: ohne soziale Flüsse.', /15\.10\.26/, 'Einnahmen, Ausgaben und soziale Flüsse aktualisieren'],
  ['EN', 'Global revenue and balance: excluding social flows.', /15\/10\/26/, 'Refresh income, expenses and social flows']
])('localises scopes, API dates and refresh action in %s', (language, scope, date, name) => {
  const refresh = jest.fn();
  render(<FinanceReadStatus language={language} summary={summary} status="available" incomeLoaded={62} expenseLoaded={150}
    socialLoaded={26} onRefresh={refresh} />);
  const status = screen.getByRole('status');
  expect(status).toHaveTextContent(scope);
  expect(status.querySelector('time')).toHaveTextContent(date);
  expect(status).not.toHaveTextContent('88');
  fireEvent.click(screen.getByRole('button', { name }));
  expect(refresh).toHaveBeenCalledTimes(1);
});

test('keeps source failure, restricted social records and true empty extracts distinct', () => {
  render(<FinanceReadStatus summary={summary} status="unavailable" incomeLoaded={0} expenseLoaded={null} socialLoaded={0}
    socialState="restricted" />);
  const status = screen.getByRole('status');
  expect(status).toHaveTextContent('0 recettes · — dépenses');
  expect(status).toHaveTextContent('Extrait partiel : une source d’écritures est indisponible.');
  expect(status).toHaveTextContent('Flux sociaux chargés : Accès restreint');
  expect(status).not.toHaveTextContent('62');
  expect(status.querySelector('time')).toBeNull();
});

test('blocks a second refresh while reading and never substitutes the render time', () => {
  const view = render(<FinanceReadStatus summary={{ ...summary, timestamp: 'invalid' }} status="available" />);
  expect(screen.getByRole('status')).toHaveTextContent('Lecture API : —');
  view.rerender(<FinanceReadStatus status="loading" />);
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByRole('status').querySelector('time')).toBeNull();
});

test.each([null, '', 'invalid', undefined])('does not manufacture a timestamp for %p', value => {
  expect(formatFinanceReadTime(value, 'EN')).toBeNull();
});
