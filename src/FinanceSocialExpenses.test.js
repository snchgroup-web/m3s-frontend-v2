import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import FinanceSocialExpenses, { selectSocialExpenses, selectPendingSocialTransfers } from './FinanceSocialExpenses';

jest.mock('./ExpenseProofs', () => ({ __esModule: true, default: ({ expense }) => <button>{`Proof ${expense.ref}`}</button> }));

const rows = [
  { id: 'S1', ref: 'S1', categorie: 'Social', description: 'Synthetic family support', date: '2026-04-02', montantChfAvailable: true, montantChf: 10, montantCfaAvailable: true, montantCfa: 6900 },
  { id: 'S2', ref: 'S2', categorie: 'Aide Sociale Ménage', description: 'Synthetic support', montantChfAvailable: true, montantChf: 5, montantCfaAvailable: false },
  { id: 'N1', ref: 'N1', categorie: 'Abonnement', natureSociale: 'Aide sociale', description: 'Synthetic subscription' },
  { id: 'P1', ref: 'P1', categorie: 'Social', description: 'Envoi Ria synthetic, ventilation à compléter', montantChfAvailable: true, montantChf: 100, montantCfaAvailable: true, montantCfa: 68000 }
];

beforeEach(() => localStorage.clear());

test('uses only explicit categories, excludes pending allocation and preserves original rows', () => {
  const original = JSON.stringify(rows);
  expect(selectSocialExpenses(rows).map(row => row.id)).toEqual(['S1', 'S2']);
  expect(selectPendingSocialTransfers(rows).map(row => row.id)).toEqual(['P1']);
  expect(selectSocialExpenses(null)).toEqual([]);
  expect(JSON.stringify(rows)).toBe(original);
});

test.each([
  ['FR', 'Dépenses classées sociales', 'Ouvrir le registre Dépenses'],
  ['EN', 'Expenses classified as social', 'Open the expense register'],
  ['DE', 'Als sozial eingestufte Ausgaben', 'Ausgabenregister öffnen']
])('shows existing expense references and pending transfers separately in %s', (language, title, open) => {
  localStorage.setItem('language', language);
  const onOpenExpenses = jest.fn();
  render(<LanguageProvider><FinanceSocialExpenses rows={rows} status="available" language={language} formatDate={v => v || '—'} formatAmount={String} onOpenExpenses={onOpenExpenses} /></LanguageProvider>);
  const section = screen.getByRole('region', { name: title });
  const tables = within(section).getAllByRole('table');
  expect(within(tables[0]).getByText('S1')).toBeInTheDocument();
  expect(within(tables[0]).queryByText('P1')).not.toBeInTheDocument();
  expect(within(tables[1]).getByText('P1')).toBeInTheDocument();
  expect(within(section).queryByText('N1')).not.toBeInTheDocument();
  expect(within(tables[0]).getAllByRole('row')[2]).toHaveTextContent('—');
  fireEvent.click(screen.getByRole('button', { name: open }));
  expect(onOpenExpenses).toHaveBeenCalledTimes(1);
  expect(rows[1].montantCfa).toBeUndefined();
});

test('distinguishes a failed source from an empty extract and hides stale data', () => {
  const props = { rows, status: 'unavailable', language: 'FR', formatDate: String, formatAmount: String };
  const view = render(<LanguageProvider><FinanceSocialExpenses {...props} /></LanguageProvider>);
  expect(screen.getByRole('status')).toHaveTextContent('Registre Dépenses indisponible');
  expect(screen.queryByText('S1')).not.toBeInTheDocument();
  view.rerender(<LanguageProvider><FinanceSocialExpenses {...props} rows={[]} status="available" /></LanguageProvider>);
  expect(screen.getByText('Aucune dépense classée sociale dans cet extrait.')).toBeInTheDocument();
});
