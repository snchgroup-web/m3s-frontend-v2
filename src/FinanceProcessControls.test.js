import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceProcessControls from './FinanceProcessControls';

test('distinguishes persisted Finance workflows from the local FX converter', () => {
  const { rerender } = render(<FinanceProcessControls language="FR" />);

  expect(screen.getByRole('heading', { name: 'Comprendre les parcours et les contrôles réellement actifs' })).toBeInTheDocument();
  expect(screen.getByText('/finance/income · /finance/expenses')).toBeInTheDocument();
  expect(screen.getByText('/finance/real-estate')).toBeInTheDocument();
  expect(screen.getByText(/Aucune persistance API n’est observée/)).toBeInTheDocument();
  expect(screen.getByText(/Aucune confirmation préalable n’est observée/)).toBeInTheDocument();
  expect(screen.getByText(/ne prouve pas encore un workflow technique complet d’approbation/)).toBeInTheDocument();

  rerender(<FinanceProcessControls language="DE" />);
  expect(screen.getByRole('heading', { name: 'Tatsächlich aktive Abläufe und Kontrollen verstehen' })).toBeInTheDocument();
  expect(screen.getByText('Kontrollen vor einem Zielverfahren ergänzen')).toBeInTheDocument();
});

test('opens governed glossary help from the observed Finance process', () => {
  render(<FinanceProcessControls language="FR" />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Écriture financière' }));
  expect(screen.getByRole('dialog', { name: 'Écriture financière' })).toBeInTheDocument();
  expect(screen.getByText('Définition proposée')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Fermer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Taux de change appliqué' }));
  expect(screen.getByRole('dialog', { name: 'Taux de change appliqué' })).toBeInTheDocument();
  expect(screen.getByText('Définition validée')).toBeInTheDocument();
});
