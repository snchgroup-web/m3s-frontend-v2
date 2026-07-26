import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider } from './LanguageContext';
import LocalPilotSummary from './LocalPilotSummary';

const renderSummary = (language = 'FR') => {
  localStorage.setItem('language', language);
  return render(
    <LanguageProvider>
      <LocalPilotSummary />
    </LanguageProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
});

test('renders the local read-only pilot without requesting live data', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');

  renderSummary();

  expect(screen.getByRole('heading', { name: 'Synthèse des pilotes locaux' })).toBeInTheDocument();
  expect(screen.getAllByText('Pilote local').length).toBeGreaterThan(0);
  expect(fetchSpy).not.toHaveBeenCalled();

  fetchSpy.mockRestore();
});

test('filters indicators and opens a read-only detail', () => {
  renderSummary();

  fireEvent.change(screen.getByLabelText('Rechercher un indicateur'), {
    target: { value: 'Bénévoles' }
  });

  expect(screen.getAllByText('Bénévoles').length).toBeGreaterThan(0);
  expect(screen.getAllByRole('button', { name: 'Voir le détail' })).toHaveLength(2);

  fireEvent.click(screen.getAllByRole('button', { name: 'Voir le détail' })[0]);
  expect(screen.getByRole('dialog', { name: 'Détail de l’indicateur' })).toBeInTheDocument();
  expect(screen.getByText('Pilote local · Lecture seule')).toBeInTheDocument();
});

test('renders the English translation from the shared language context', () => {
  renderSummary('EN');

  expect(screen.getByRole('heading', { name: 'Local pilots summary' })).toBeInTheDocument();
  expect(screen.getByLabelText('Search indicators')).toBeInTheDocument();
});
