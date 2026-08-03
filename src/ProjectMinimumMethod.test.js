import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectMinimumMethod from './ProjectMinimumMethod';

test('presents the minimum project core in French without implying persistence', () => {
  render(<ProjectMinimumMethod language="FR" />);

  expect(screen.getByRole('heading', { name: 'Contrôle minimal d’un projet' })).toBeInTheDocument();
  expect(screen.getByText('Règle candidate V0.1')).toBeInTheDocument();
  expect(screen.getByText('Lecture seule')).toBeInTheDocument();
  expect(screen.getByText('Objectif')).toBeInTheDocument();
  expect(screen.getByText('Décision')).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Noyau' })).toHaveAttribute('aria-selected', 'true');
});

test('opens the complete milestone cycle', () => {
  render(<ProjectMinimumMethod language="FR" />);

  fireEvent.click(screen.getByRole('tab', { name: 'Jalons' }));

  expect(screen.getByRole('heading', { name: 'Cycle de contrôle J0 à J8' })).toBeInTheDocument();
  expect(screen.getByText('Besoin confirmé')).toBeInTheDocument();
  expect(screen.getByText('Archivage et retour d’expérience')).toBeInTheDocument();
});

test('keeps the active method view when the language changes', () => {
  const { rerender } = render(<ProjectMinimumMethod language="FR" />);
  fireEvent.click(screen.getByRole('tab', { name: 'Revue' }));

  rerender(<ProjectMinimumMethod language="DE" />);

  expect(screen.getByRole('tab', { name: 'Kurzprüfung' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('heading', { name: 'Kurzprüfung mit sechs Fragen' })).toBeInTheDocument();
  expect(screen.getByText('Welcher Nachweis fehlt noch?')).toBeInTheDocument();
  expect(screen.getByText('Regelentwurf V0.1')).toBeInTheDocument();
  expect(screen.getByText('Nur-Lese-Modus')).toBeInTheDocument();
});

test('shows closure conditions in English', () => {
  render(<ProjectMinimumMethod language="EN" />);
  fireEvent.click(screen.getByRole('tab', { name: 'Closure' }));

  expect(screen.getByRole('heading', { name: 'Closure conditions' })).toBeInTheDocument();
  expect(screen.getByText('Payments reconciled')).toBeInTheDocument();
  expect(screen.getByText('Useful lesson added to KM')).toBeInTheDocument();
});
