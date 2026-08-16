import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AdministrativeAssistant from './AdministrativeAssistant';

test('frames the assistant as preparation-only and preserves human authority', () => {
  render(<AdministrativeAssistant language="FR" />);

  expect(screen.getByRole('heading', { name: 'Assistant administratif 2SG' })).toBeInTheDocument();
  expect(screen.getByText('Non connecté · aucune action autonome')).toBeInTheDocument();
  expect(screen.getAllByText(/Ne valide, ne signe et n’adopte aucun document/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/N’envoie aucun courrier/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('heading', { name: 'Mission externe bornée et contrôlée' })).toBeInTheDocument();
  expect(screen.getByText(/CAS PILOTE RELATIONNEL 3\/3/)).toBeInTheDocument();
});

test('prepares a bounded external mission without sending it', () => {
  render(<AdministrativeAssistant language="FR" />);

  expect(screen.getByText('Portefeuille des missions externes')).toBeInTheDocument();
  expect(screen.getByText(/uniquement après micro-test concluant/)).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: 'Préparer la mission' })[1]);

  expect(screen.getByLabelText('Service destinataire')).toHaveValue('work');
  expect(screen.getByLabelText('Sensibilité')).toHaveValue('internal');
  expect(screen.getByLabelText('Type de soutien')).toHaveValue('5');
  expect(screen.getByText(/Service destinataire: ChatGPT Work/)).toBeInTheDocument();
  expect(screen.getAllByText(/préparer uniquement les projets manquants ou incomplets/).length).toBeGreaterThanOrEqual(1);
});

test('blocks clipboard export for restricted content', async () => {
  const originalClipboard = navigator.clipboard;
  const writeText = jest.fn();
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  render(<AdministrativeAssistant language="FR" />);
  fireEvent.change(screen.getByLabelText('Sensibilité'), { target: { value: 'restricted' } });
  fireEvent.click(screen.getByRole('button', { name: 'Copier la consigne' }));

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Copie désactivée'));
  expect(writeText).not.toHaveBeenCalled();
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: originalClipboard });
});

test('reuses the governed product-test protocol without opening Production', () => {
  render(<AdministrativeAssistant language="FR" />);
  fireEvent.click(screen.getAllByRole('button', { name: 'Préparer la mission' })[2]);

  expect(screen.getAllByText(/M3S-INSTR-DIGITAL-TEST-001 V1/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/24 à 40 heures sur 7 à 10 jours/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText(/Aucun lancement, achat, compte, publicité, paiement/).length).toBeGreaterThanOrEqual(1);
  expect(screen.getByText(/Passage Production : uniquement après micro-test concluant/)).toBeInTheDocument();
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
