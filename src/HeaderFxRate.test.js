import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeaderFxRate, { readHeaderFx } from './HeaderFxRate';

const response = {
  taux_du_jour: { CHF_CFA: 700 },
  taux_du_jour_details: { CHF_CFA: { rate: 700, date: '2026-10-02', source: 'Synthetic provider', basis: 'history_fallback' } }
};
const now = new Date('2026-10-03T01:00:00Z');

test.each([
  ['FR', 'Détail du taux CHF/CFA', 'Dernière référence disponible'],
  ['DE', 'Details zum CHF/CFA-Kurs', 'Letzte verfügbare Referenz'],
  ['EN', 'CHF/CFA rate details', 'Latest available reference']
])('opens and closes dated provenance without replacing transaction rates in %s', (language, label, status) => {
  render(<HeaderFxRate response={response} language={language} now={now} />);
  const button = screen.getByRole('button', { name: label });
  expect(button).toHaveTextContent('1 CHF = 700 CFA');
  expect(screen.queryByText('Synthetic provider')).not.toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(status)).toBeInTheDocument();
  expect(screen.getByText('Synthetic provider')).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(button).toHaveFocus();
  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Synthetic provider')).not.toBeInTheDocument();
});

test('closes provenance when clicking outside', () => {
  render(<HeaderFxRate response={response} now={now} />);
  fireEvent.click(screen.getByRole('button'));
  fireEvent.pointerDown(document.body);
  expect(screen.queryByText('Synthetic provider')).not.toBeInTheDocument();
});

test('ignores metadata for a different rate and does not invent its date', () => {
  const mismatched = { ...response, taux_du_jour: { CHF_CFA: 710 } };
  expect(readHeaderFx(mismatched).metadata).toBeNull();
  render(<HeaderFxRate response={mismatched} now={now} />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Date à vérifier')).toBeInTheDocument();
  expect(screen.getAllByText('Non renseignée')).toHaveLength(2);
  expect(screen.queryByText('Synthetic provider')).not.toBeInTheDocument();
});

test('keeps an old API compatible and rejects missing, zero, negative and invalid rates', () => {
  expect(readHeaderFx({ taux_du_jour: { CHF_CFA: 700 } })).toEqual({ rate: 700, metadata: null });
  for (const rate of [null, 0, -1, Infinity, 'invalid']) {
    expect(readHeaderFx({ taux_du_jour: { CHF_CFA: rate } }).rate).toBeNull();
  }
  render(<HeaderFxRate response={null} now={now} />);
  expect(screen.getByRole('button')).toHaveTextContent('Taux indisponible');
});

test('uses the Zurich date at midnight and does not present future or malformed dates as current', () => {
  const current = { ...response, taux_du_jour_details: { CHF_CFA: { ...response.taux_du_jour_details.CHF_CFA, date: '2026-10-03' } } };
  const { rerender } = render(<HeaderFxRate response={current} now={new Date('2026-10-02T22:30:00Z')} />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Référence du jour')).toBeInTheDocument();
  for (const date of ['2026-10-04', '2026-02-30', '2026-10-03junk']) {
    rerender(<HeaderFxRate response={{ ...current, taux_du_jour_details: { CHF_CFA: { ...current.taux_du_jour_details.CHF_CFA, date } } }} now={now} />);
    expect(screen.getByText('Date à vérifier')).toBeInTheDocument();
  }
});
