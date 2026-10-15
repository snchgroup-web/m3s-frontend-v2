import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import TableControls from './TableControls';

const rows = Array.from({ length: 12 }, (_, index) => Object.freeze({ id: `DEMO-${index + 1}` }));
const renderTable = visible => <table><tbody>{visible.map(row => <tr key={row.id}><td>{row.id}</td></tr>)}</tbody></table>;

beforeEach(() => localStorage.clear());

test.each([
  ['FR', 'Lignes', 'Rechercher...', 'Page', 'Page précédente', 'Page suivante', 'au total'],
  ['DE', 'Zeilen', 'Suchen...', 'Seite', 'Vorherige Seite', 'Nächste Seite', 'insgesamt'],
  ['EN', 'Rows', 'Search...', 'Page', 'Previous page', 'Next page', 'total']
])('localises page controls, names and filtered totals in %s without changing pagination', (language, rowLabel, search, page, previous, next, total) => {
  localStorage.setItem('language', language);
  render(<LanguageProvider><TableControls rows={rows} renderTable={renderTable} /></LanguageProvider>);
  expect(screen.getByText(`${page} 1 / 2`)).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: rowLabel })).toHaveValue('10');
  expect(screen.getByRole('button', { name: previous })).toBeDisabled();
  expect(screen.getByRole('button', { name: previous })).toHaveAttribute('title', previous);
  fireEvent.click(screen.getByRole('button', { name: next }));
  expect(screen.getByText(`${page} 2 / 2`)).toBeInTheDocument();
  expect(screen.getByText('DEMO-12')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: next })).toBeDisabled();
  fireEvent.change(screen.getByPlaceholderText(search), { target: { value: 'DEMO-12' } });
  expect(screen.getByText(`${page} 1 / 1`)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`12 ${total}`))).toBeInTheDocument();
  expect(rows).toHaveLength(12);
});

function LanguageSwitch() {
  const { setLanguage } = useLanguage();
  return <><button onClick={() => setLanguage('DE')}>DE</button><TableControls rows={rows} renderTable={renderTable} /></>;
}

test('preserves search and page size when switching language', () => {
  render(<LanguageProvider><LanguageSwitch /></LanguageProvider>);
  fireEvent.change(screen.getByRole('combobox', { name: 'Lignes' }), { target: { value: '25' } });
  fireEvent.change(screen.getByPlaceholderText('Rechercher...'), { target: { value: 'DEMO-12' } });
  fireEvent.click(screen.getByRole('button', { name: 'DE' }));
  expect(screen.getByRole('combobox', { name: 'Zeilen' })).toHaveValue('25');
  expect(screen.getByPlaceholderText('Suchen...')).toHaveValue('DEMO-12');
  expect(screen.getByText('DEMO-12')).toBeInTheDocument();
  expect(screen.getByText('Seite 1 / 1')).toBeInTheDocument();
});
