import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceReadStatus, { formatFinanceReadTime } from './FinanceReadStatus';

const summary = { incomeCount: 62, expenseCount: 150, timestamp: '2026-10-15T14:00:00Z' };

test('keeps the source details collapsed without losing scope, dates or refresh controls', () => {
  const view = render(<FinanceReadStatus summary={summary} status="available" />);
  const details = screen.getByRole('status').querySelector('details');
  expect(details).not.toHaveAttribute('open');
  expect(details.querySelector('summary')).toHaveTextContent('Totaux globaux disponibles');
  details.open = true;
  view.rerender(<FinanceReadStatus language="EN" summary={summary} status="available" />);
  expect(details).toHaveAttribute('open');
  expect(details.querySelector('summary')).toHaveTextContent('Global totals available');
  expect(screen.getByRole('button', { name: 'Refresh income, expenses and social flows' })).toBeEnabled();
});

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
  expect(status).toHaveTextContent('Registre social : Accès restreint');
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

test.each([
  ['FR', 'loading', 'Registre social : Chargement en cours', 'Flux sociaux chargés'],
  ['FR', 'unavailable', 'Registre social : Indisponible', 'Flux sociaux chargés'],
  ['DE', 'loading', 'Sozialregister : Wird geladen', 'Geladene soziale Flüsse'],
  ['DE', 'unavailable', 'Sozialregister : Nicht verfügbar', 'Geladene soziale Flüsse'],
  ['EN', 'loading', 'Social register : Loading', 'Loaded social flows'],
  ['EN', 'unavailable', 'Social register : Unavailable', 'Loaded social flows']
])('marks the social source as %s/%s even if an old count is supplied', (language, socialState, label, loaded) => {
  render(<FinanceReadStatus language={language} summary={summary} status="available"
    socialLoaded={26} socialState={socialState} />);
  expect(screen.getByRole('status')).toHaveTextContent(label);
  expect(screen.getByRole('status')).not.toHaveTextContent(loaded);
});

test('distinguishes a confirmed empty social register from an unavailable count', () => {
  const view = render(<FinanceReadStatus status="available" summary={summary} socialState="available" socialLoaded={0} />);
  expect(screen.getByRole('status')).toHaveTextContent('Flux sociaux chargés : 0');
  view.rerender(<FinanceReadStatus status="available" summary={summary} socialState="available" socialLoaded={null} />);
  expect(screen.getByRole('status')).toHaveTextContent('Registre social : Indisponible');
  expect(screen.getByRole('status')).not.toHaveTextContent('Flux sociaux chargés');
});
