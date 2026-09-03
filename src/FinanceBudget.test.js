import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import FinanceBudget from './FinanceBudget';
import FinanceBudgetProvider, { FinanceBudgetSession } from './FinanceBudgetContext';
import { createBudget, serializeBudget } from './financeBudgetModel';

let mockAuth = { token: 'qa-session-a', isAuthenticated: true };
jest.mock('./AuthContext', () => ({ useAuth: () => mockAuth }));
let ids = 0;
const select = jest.fn();
beforeEach(() => {
  ids = 0; mockAuth = { token: 'qa-session-a', isAuthenticated: true }; jest.clearAllMocks();
  Object.defineProperty(global, 'crypto', { configurable: true, value: { randomUUID: () => 'qa-row-' + ++ids } });
  global.URL.createObjectURL = jest.fn(() => 'blob:qa');
  global.URL.revokeObjectURL = jest.fn();
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());
const show = language => render(<FinanceBudgetSession><FinanceBudget language={language || 'FR'} onSelectTab={select} /></FinanceBudgetSession>);
const start = () => {
  fireEvent.click(screen.getAllByRole('button', { name: 'Nouveau brouillon' }).at(-1));
  fireEvent.change(screen.getByLabelText('Nom du budget'), { target: { value: 'QA planning' } });
  fireEvent.change(screen.getByLabelText('Entité / périmètre propriétaire'), { target: { value: 'QA organisation' } });
};
const add = () => { fireEvent.click(screen.getByRole('button', { name: 'Ajouter une rubrique' })); fireEvent.change(screen.getByLabelText('Rubrique 1'), { target: { value: 'QA service' } }); };
const month = i => screen.getAllByRole('textbox').filter(el => el.getAttribute('aria-label')?.startsWith('QA service '))[i];
const fixture = () => serializeBudget({ ...createBudget(2026), title: 'QA imported', entity: 'QA org', rows: [] }).text;
const upload = async (text, size = text.length) => act(async () => fireEvent.change(screen.getByLabelText('Importer un brouillon JSON', { selector: 'input' }), { target: { files: [{ size, text: async () => text }] } }));

test('no financial records or personal editor in a fresh budget', () => {
  show();
  expect(screen.getByText('Personnel non ouvert')).toBeInTheDocument();
  expect(screen.queryByLabelText('Nom du budget')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Exporter le brouillon JSON' })).toBeDisabled();
});
test('draft uses entered subtotals and preserves zeros, blanks, invalids and currencies', () => {
  show(); start(); add();
  expect(screen.getByTestId('budget-total-out-CHF')).toHaveTextContent('\u2014 CHF');
  fireEvent.change(month(0), { target: { value: '0' } });
  expect(screen.getByTestId('budget-total-out-CHF')).toHaveTextContent('0 CHF');
  fireEvent.change(month(1), { target: { value: '100' } });
  expect(screen.getByTestId('budget-total-out-CHF')).toHaveTextContent('100 CHF');
  expect(screen.getByTestId('budget-total-out-CFA')).toHaveTextContent('\u2014 CFA');
  fireEvent.change(month(2), { target: { value: '-1' } });
  expect(month(2)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByTestId('budget-total-out-CHF')).toHaveTextContent('\u2014 CHF');
  expect(screen.getByRole('button', { name: 'Exporter le brouillon JSON' })).toBeDisabled();
});
test('manual assumption requires source/date and never fills source amounts', () => {
  show(); start(); add(); fireEvent.change(month(0), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText('Hypothèse CFA / CHF'), { target: { value: '710' } });
  expect(within(month(0).closest('td')).getByText('\u2248 \u2014 CFA')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Source de l’hypothèse'), { target: { value: 'QA' } });
  fireEvent.change(screen.getByLabelText('Date de l’hypothèse'), { target: { value: '2026-09-03' } });
  expect(month(0)).toHaveValue('100');
  expect(month(0).closest('td').textContent.replace(/\s/g, '')).toContain('71000CFA');
});
test('currency change clears amounts only on confirmation; cancelling preserves values', () => {
  show(); start(); add(); fireEvent.change(month(0), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText('Devise 1'), { target: { value: 'CFA' } });
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' })); expect(month(0)).toHaveValue('100');
  expect(screen.getByLabelText('Devise 1')).toHaveValue('CHF');
  fireEvent.change(screen.getByLabelText('Devise 1'), { target: { value: 'CFA' } });
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  expect(screen.getByLabelText('Devise 1')).toHaveValue('CFA'); expect(month(0)).toHaveValue('');
});
test('delete and replace have explicit cancel/confirm, keyboard escape works', () => {
  show(); start(); add();
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer la rubrique : QA service' }));
  fireEvent.keyDown(document, { key: 'Escape' }); expect(screen.getByLabelText('Rubrique 1')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer la rubrique : QA service' }));
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  expect(screen.queryByLabelText('Rubrique 1')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Nouveau brouillon' }));
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' })); expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA planning');
});
test('changing year retains values only after confirmation', () => {
  show(); start(); add(); fireEvent.change(month(0), { target: { value: '20' } });
  fireEvent.change(screen.getByLabelText('Exercice'), { target: { value: '2030' } });
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  expect(screen.getByLabelText('Exercice')).toHaveValue('2030'); expect(month(0)).toHaveValue('20');
});
test('export requests a file, tracks revision, and editing marks it dirty again', () => {
  show(); start(); add();
  fireEvent.click(screen.getByRole('button', { name: 'Exporter le brouillon JSON' }));
  expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Révision exportée 1')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Téléchargement demandé');
  fireEvent.change(month(0), { target: { value: '20' } });
  expect(screen.getByText('Modifications non exportées')).toBeInTheDocument();
});
test('failed export retains the dirty draft', () => {
  show(); start(); URL.createObjectURL.mockImplementation(() => { throw Error('Denied'); });
  fireEvent.click(screen.getByRole('button', { name: 'Exporter le brouillon JSON' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Export impossible');
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA planning');
});
test('valid imports are confirmed before replacing a draft', async () => {
  show(); start(); await upload(fixture());
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA planning');
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA imported');
  expect(screen.getByRole('status')).toHaveTextContent('Non approuvé');
});

test.each(['edit', 'unmount'])('a delayed import cannot override a newer %s', async action => {
  const wrap = visible => <FinanceBudgetSession>{visible && <FinanceBudget language="FR" onSelectTab={select} />}</FinanceBudgetSession>;
  const view = render(wrap(true));
  let resolveRead;
  fireEvent.change(screen.getByLabelText('Importer un brouillon JSON', { selector: 'input' }), {
    target: { files: [{ size: 100, text: () => new Promise(resolve => { resolveRead = resolve; }) }] }
  });
  if (action === 'edit') start(); else view.rerender(wrap(false));
  await act(async () => resolveRead(fixture()));
  if (action === 'unmount') view.rerender(wrap(true));
  expect(screen.queryByDisplayValue('QA imported')).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  if (action === 'edit') expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA planning');
  else expect(screen.queryByLabelText('Nom du budget')).not.toBeInTheDocument();
});
test.each(['{}', 'broken', JSON.stringify({ scope: 'personal' })])('invalid import %s preserves the draft', async text => {
  show(); start(); await upload(text);
  expect(screen.getByRole('alert')).toHaveTextContent('Fichier refusé');
  expect(screen.getByLabelText('Nom du budget')).toHaveValue('QA planning');
});
test('oversized file is rejected before reading', async () => {
  show(); const read = jest.fn();
  await act(async () => fireEvent.change(screen.getByLabelText('Importer un brouillon JSON', { selector: 'input' }), { target: { files: [{ size: 600000, text: read }] } }));
  expect(read).not.toHaveBeenCalled(); expect(screen.getByRole('alert')).toBeInTheDocument();
});
test('draft survives view unmount and language changes in the same session', () => {
  const wrap = (visible, lang) => <FinanceBudgetSession>{visible ? <FinanceBudget language={lang} onSelectTab={select} /> : <p>Other view</p>}</FinanceBudgetSession>;
  const view = render(wrap(true, 'FR')); start(); add();
  fireEvent.click(screen.getByRole('button', { name: 'Recettes' })); expect(select).toHaveBeenCalledWith('recettes');
  view.rerender(wrap(false, 'FR')); view.rerender(wrap(true, 'EN'));
  expect(screen.getByLabelText('Budget name')).toHaveValue('QA planning');
  expect(screen.getByLabelText('Category 1')).toHaveValue('QA service');
  expect(screen.getByText('Actuals not reconciled · Variances unavailable')).toBeInTheDocument();
});
test('switching auth session or signing out destroys the previous draft', () => {
  const tree = () => <FinanceBudgetProvider><FinanceBudget language="FR" onSelectTab={select} /></FinanceBudgetProvider>;
  const view = render(tree()); start();
  mockAuth = { token: 'qa-session-b', isAuthenticated: true }; view.rerender(tree());
  expect(screen.queryByLabelText('Nom du budget')).not.toBeInTheDocument();
  start(); mockAuth = { token: null, isAuthenticated: false }; view.rerender(tree());
  expect(screen.queryByLabelText('Nom du budget')).not.toBeInTheDocument();
});
test('unsaved draft warns on browser close and listener is removed on unmount', () => {
  const view = show(); start();
  const event = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(event); expect(event.defaultPrevented).toBe(true);
  view.unmount(); const next = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(next); expect(next.defaultPrevented).toBe(false);
});
test.each([['EN', 'New draft', 'Personal workspace closed'], ['DE', 'Neuer Entwurf', 'Privatbereich geschlossen']])('%s controls render translated', (language, button, status) => {
  show(language); expect(screen.getAllByRole('button', { name: button })).toHaveLength(2); expect(screen.getByText(status)).toBeInTheDocument();
});
