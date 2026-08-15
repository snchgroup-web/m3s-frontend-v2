import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationPortfolioOverview, { ADMINISTRATION_PORTFOLIO_AS_OF } from './AdministrationPortfolioOverview';

test('shows the seven sourced portfolio items without invented progress', () => {
  render(<AdministrationPortfolioOverview language="FR" />);

  expect(ADMINISTRATION_PORTFOLIO_AS_OF).toBe('2026-08-15');
  expect(screen.getByRole('heading', { name: 'Grands dossiers et chantiers' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(7);
  expect(screen.getByRole('heading', { name: 'LEGAL · base documentaire' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Avants de fenêtres' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Mini-forage · alimentation en eau' })).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.queryByText(/%/)).not.toBeInTheDocument();
});

test('reveals one documented checkpoint and keeps source and next action explicit', () => {
  render(<AdministrationPortfolioOverview language="FR" />);

  const buttons = screen.getAllByRole('button', { name: 'Afficher le point documenté' });
  fireEvent.click(buttons[1]);

  expect(screen.getByText('Prochaine action')).toBeInTheDocument();
  expect(screen.getByText('Source de l’état affiché')).toBeInTheDocument();
  expect(screen.getByText('2SG_M3S_INVENTAIRE_DOCUMENTAIRE_GOUVERNE_CONTROLE_2026-08-14.xlsx')).toBeInTheDocument();
  expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(buttons[1]);
  expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
});

test.each([
  ['EN', 'Major files and workstreams', 'Show documented checkpoint'],
  ['DE', 'Wichtige Akten und Vorhaben', 'Dokumentierten Stand anzeigen']
])('renders portfolio labels in %s', (language, title, action) => {
  render(<AdministrationPortfolioOverview language={language} />);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: action })).toHaveLength(7);
});
