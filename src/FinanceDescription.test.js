import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import FinanceDescription from './FinanceDescription';
import TableControls from './TableControls';
import { translateFinanceDescription } from './financeDescriptionTranslation';

beforeEach(() => localStorage.clear());

test('offers the exact original without triggering the row action', () => {
  const edit = jest.fn();
  const source = 'Fournitures - <b>DEMO</b> 20 CHF';
  const { container } = render(<div onClick={edit} onKeyDown={edit}><FinanceDescription value={source} language="DE" /></div>);
  expect(screen.getByText('Materialien - <b>DEMO</b> 20 CHF')).toBeInTheDocument();
  const summary = screen.getByLabelText('Originalbeschreibung');
  expect(summary).toHaveAttribute('title', 'Originalbeschreibung');
  fireEvent.click(summary);
  fireEvent.keyDown(summary, { key: 'Enter' });
  expect(edit).not.toHaveBeenCalled();
  expect(within(summary.closest('details')).getByText(source)).toBeInTheDocument();
  expect(container.querySelector('b')).toBeNull();
});

test('does not add an original control for unchanged text', () => {
  const view = render(<FinanceDescription value="Texte libre" language="EN" />);
  expect(screen.getByText('Texte libre')).toBeInTheDocument();
  expect(screen.queryByLabelText('Original description')).not.toBeInTheDocument();
  view.rerender(<FinanceDescription value="Fournitures" language="FR" />);
  expect(screen.getByText('Fournitures')).toBeInTheDocument();
  expect(screen.queryByLabelText('Description d’origine')).not.toBeInTheDocument();
});

const rows = Object.freeze([Object.freeze({ id: 'REF-QA', description: 'Fournitures' })]);
function SearchHarness({ translated = true }) {
  const { language, setLanguage } = useLanguage();
  return <><button onClick={() => setLanguage('DE')}>DE</button><button onClick={() => setLanguage('EN')}>EN</button>
    <TableControls rows={rows} getSearchText={translated ? row => translateFinanceDescription(row.description, language) : undefined}
      renderTable={visible => <table><tbody>{visible.map(row => <tr key={row.id}><td>{row.id}</td><td><FinanceDescription value={row.description} language={language} /></td></tr>)}</tbody></table>} />
  </>;
}

test('finds source and translated descriptions, recalculates on language change and never decorates source rows', () => {
  render(<LanguageProvider><SearchHarness /></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'DE' }));
  const search = screen.getByPlaceholderText('Suchen...');
  fireEvent.change(search, { target: { value: 'Materialien' } });
  expect(screen.getByText('REF-QA')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  expect(screen.queryByText('REF-QA')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'Supplies' } });
  expect(screen.getByText('REF-QA')).toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'Fournitures' } });
  expect(screen.getByText('REF-QA')).toBeInTheDocument();
  expect(rows).toEqual([{ id: 'REF-QA', description: 'Fournitures' }]);
});

test('retains the default TableControls search contract when no projection is supplied', () => {
  render(<LanguageProvider><SearchHarness translated={false} /></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'EN' }));
  const search = screen.getByPlaceholderText('Search...');
  fireEvent.change(search, { target: { value: 'Supplies' } });
  expect(screen.queryByText('REF-QA')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'Fournitures' } });
  expect(screen.getByText('REF-QA')).toBeInTheDocument();
});
