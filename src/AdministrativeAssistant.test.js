import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AdministrativeAssistant from './AdministrativeAssistant';

test('frames the assistant as preparation-only and preserves human authority', () => {
  render(<AdministrativeAssistant language="FR" />);

  expect(screen.getByRole('heading', { name: 'Assistant administratif 2SG' })).toBeInTheDocument();
  expect(screen.getByText('Non connecté · aucune action autonome')).toBeInTheDocument();
  expect(screen.getAllByText(/Ne valide, ne signe et n’adopte aucun document/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/N’envoie aucun courrier/).length).toBeGreaterThanOrEqual(1);
});

test('keeps the selected mission synchronized with the interface language', () => {
  const { rerender } = render(<AdministrativeAssistant language="FR" />);
  fireEvent.change(screen.getByLabelText('Type de soutien'), { target: { value: '1' } });
  expect(screen.getByText(/Mission: Préparer une synthèse de dossier/)).toBeInTheDocument();

  rerender(<AdministrativeAssistant language="EN" />);
  expect(screen.getByLabelText('Support type')).toHaveValue('1');
  expect(screen.getByText(/Mission: Prepare a file summary/)).toBeInTheDocument();
  expect(screen.queryByText(/Préparer une synthèse de dossier/)).not.toBeInTheDocument();
});

test('does not announce a copy when the clipboard is unavailable', async () => {
  const originalClipboard = navigator.clipboard;
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
  render(<AdministrativeAssistant language="EN" />);
  fireEvent.click(screen.getByRole('button', { name: 'Copy instruction' }));

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Copy failed'));
  expect(screen.queryByText('Instruction copied.')).not.toBeInTheDocument();
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: originalClipboard });
});
