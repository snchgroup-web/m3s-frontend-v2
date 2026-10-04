import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceConversionHelp, { ConversionReferenceField } from './FinanceConversionHelp';

test.each([
  ['FR', 'Référence de conversion', 'Fermer', 'Valeur attendue'],
  ['EN', 'Conversion reference', 'Close', 'Expected value'],
  ['DE', 'Umrechnungsreferenz', 'Schließen', 'Erwarteter Wert']
])('provides localized evidence instructions and restores focus in %s', (language, title, close, expected) => {
  render(<FinanceConversionHelp language={language} />);
  const trigger = screen.getByRole('button');
  fireEvent.click(trigger);
  expect(screen.getByRole('dialog', { name: title })).toBeInTheDocument();
  expect(screen.getByText(expected)).toBeInTheDocument();
  expect(screen.getByText(/TEST-001/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: close })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('keeps rate help separate from table actions and traps focus', () => {
  const edit = jest.fn();
  render(<table><tbody><tr onClick={edit}><td><FinanceConversionHelp kind="rate" /></td></tr></tbody></table>);
  const trigger = screen.getByRole('button');
  fireEvent.click(trigger);
  expect(edit).not.toHaveBeenCalled();
  expect(screen.getByRole('dialog', { name: 'Taux CHF → CFA' })).toBeInTheDocument();
  expect(screen.getByText(/Non renseigné/)).toBeInTheDocument();
  expect(screen.getByText(/Ria ou Western Union/)).toBeInTheDocument();
  expect(screen.getByText(/Définition proposée/)).toBeInTheDocument();
  expect(screen.queryByText(/TEST-001/)).not.toBeInTheDocument();
  const close = screen.getByRole('button', { name: 'Fermer' });
  const glossary = screen.getByRole('link', { name: 'Glossaire Finances' });
  fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
  expect(glossary).toHaveFocus();
  fireEvent.keyDown(glossary, { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.click(close);
  expect(trigger).toHaveFocus();
  expect(edit).not.toHaveBeenCalled();
});

test('can close with the backdrop without editing a reference', () => {
  const onChange = jest.fn();
  render(<ConversionReferenceField label="Référence" value="Existing evidence" onChange={onChange} language="FR" />);
  const input = screen.getByLabelText('Référence');
  expect(input).toHaveAttribute('maxlength', '500');
  fireEvent.click(screen.getByRole('button'));
  fireEvent.mouseDown(screen.getByRole('dialog').parentElement);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(input).toHaveValue('Existing evidence');
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.change(input, { target: { value: 'Provider TEST-002, date, USD/CHF' } });
  expect(onChange).toHaveBeenCalledWith('Provider TEST-002, date, USD/CHF');
});
