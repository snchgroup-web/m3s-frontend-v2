import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import BusinessPlanVisual from './BusinessPlanVisual';

test('navigates through the French Business Plan journey without publishing figures', () => {
  render(<BusinessPlanVisual language="FR" onClose={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Business Plan 2SG V8' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Trajectoire' })).toBeInTheDocument();
  expect(screen.getByText(/Aucun montant consolidé n’est publié/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Vue suivante' }));
  expect(screen.getByRole('heading', { name: 'Marchés & segments' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Afficher la vue : Garde-fous & décisions' }));
  expect(screen.getByText(/La décision suivante porte sur les packs à chiffrer/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Consulter la source dans la GED' })).toHaveAttribute('href', '/ged?tab=documents');
});

test('renders the German financial guardrail and closes', () => {
  const onClose = jest.fn();
  render(<BusinessPlanVisual language="DE" onClose={onClose} />);

  expect(screen.getByText(/keine konsolidierten Beträge veröffentlicht/i)).toBeInTheDocument();
  expect(screen.getByText('Zahlen zu prüfen')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Businessplan-Pfad schließen' }));
  expect(onClose).toHaveBeenCalledTimes(1);
});
