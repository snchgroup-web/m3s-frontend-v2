import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationPortfolioOverview, { ADMINISTRATION_PORTFOLIO_AS_OF } from './AdministrationPortfolioOverview';

test('shows the seven sourced portfolio items without invented progress', () => {
  render(<AdministrationPortfolioOverview language="FR" />);

  expect(ADMINISTRATION_PORTFOLIO_AS_OF).toBe('2026-08-16');
  expect(screen.getByRole('heading', { name: 'Grands dossiers et chantiers' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Grands dossiers et chantiers' }).closest('section')).toHaveAttribute('id', 'administration-portfolio');
  expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(7);
  expect(screen.getByRole('heading', { name: 'LEGAL · accès restreint' })).toBeInTheDocument();
  expect(screen.getByText(/ne sont pas intégrés au navigateur/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Avants de fenêtres' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Mini-forage · alimentation en eau' })).toBeInTheDocument();
  expect(screen.getByText('Étanchéité confirmée · peinture restante')).toBeInTheDocument();
  expect(screen.getByText('Eau rétablie · protection à terminer')).toBeInTheDocument();
  expect(screen.getByText(/aucune infiltration n’a été signalée/)).toBeInTheDocument();
  expect(screen.getByText(/le débit a été contrôlé dans la villa/)).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.queryByText(/%/)).not.toBeInTheDocument();
});

test('keeps restricted LEGAL metadata out of the client and reveals an internal checkpoint', () => {
  render(<AdministrationPortfolioOverview language="FR" />);

  const buttons = screen.getAllByRole('button', { name: 'Afficher le point documenté' });
  expect(buttons).toHaveLength(6);
  expect(screen.queryByText(/INVENTAIRE_DOCUMENTAIRE_GOUVERNE_CONTROLE/)).not.toBeInTheDocument();
  fireEvent.click(buttons[0]);

  expect(screen.getByText('Prochaine action')).toBeInTheDocument();
  expect(screen.getByText('Source de l’état affiché')).toBeInTheDocument();
  expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

  fireEvent.click(buttons[0]);
  expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
});

test.each([
  ['EN', 'Major files and workstreams', 'Show documented checkpoint'],
  ['DE', 'Wichtige Akten und Vorhaben', 'Dokumentierten Stand anzeigen']
])('renders portfolio labels in %s', (language, title, action) => {
  render(<AdministrationPortfolioOverview language={language} />);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: action })).toHaveLength(6);
});
