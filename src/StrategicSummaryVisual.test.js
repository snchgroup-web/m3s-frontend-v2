import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StrategicSummaryVisual from './StrategicSummaryVisual';

test('navigates through the French strategic summary', () => {
  render(<StrategicSummaryVisual language="FR" onClose={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Note de synthèse stratégique V2' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Positionnement' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Vue suivante' }));
  expect(screen.getByRole('heading', { name: 'Publics progressifs' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Afficher la vue : Garde-fous & décision' }));
  expect(screen.getByText(/La prochaine décision porte sur la validation stratégique/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Consulter la source dans la GED' })).toHaveAttribute('href', '/ged?tab=documents&returnVisual=strategic-summary');
});

test('renders the German translation warning and closes', () => {
  const onClose = jest.fn();
  render(<StrategicSummaryVisual language="DE" onClose={onClose} />);

  expect(screen.getByText(/noch keine validierten institutionellen Übersetzungen/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Visuelle Aufbereitung schließen' }));
  expect(onClose).toHaveBeenCalledTimes(1);
});
