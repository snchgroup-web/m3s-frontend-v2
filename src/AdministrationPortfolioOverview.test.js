import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import AdministrationPortfolioOverview, { ADMINISTRATION_PORTFOLIO_AS_OF, getAdministrationPortfolioRecords } from './AdministrationPortfolioOverview';

test('keeps the original seven checkpoints and adds three linked HR dossiers without invented progress', () => {
  render(<AdministrationPortfolioOverview language="FR" />);

  expect(ADMINISTRATION_PORTFOLIO_AS_OF).toBe('2026-10-14');
  expect(screen.getByRole('heading', { name: 'Grands dossiers et chantiers' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Grands dossiers et chantiers' }).closest('section')).toHaveAttribute('id', 'administration-portfolio');
  expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(10);
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
  expect(buttons).toHaveLength(9);
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
  expect(screen.getAllByRole('button', { name: action })).toHaveLength(9);
});

test.each([
  ['FR', ['RH de proximité', 'Outils RH', 'Accueil et livret des membres'], 'Afficher le point documenté', 'Ouvrir les ressources RH'],
  ['EN', ['Local HR', 'HR tools', 'Member welcome and booklet'], 'Show documented checkpoint', 'Open HR resources'],
  ['DE', ['Praxisnahes Personalmanagement', 'Personalwerkzeuge', 'Mitgliedereinführung und Handbuch'], 'Dokumentierten Stand anzeigen', 'Personalressourcen öffnen']
])('links the HR framework, tools and booklet to existing sources in %s', (language, titles, show, open) => {
  const records = getAdministrationPortfolioRecords(language);
  expect(records.filter(row => row.dossierId).map(row => row.dossierId)).toEqual(['GD-008', 'GD-009', 'GD-010']);
  expect(records.find(row => row.id === 'tfx').checkedOn).toBe('2026-08-10');
  expect(records.find(row => row.id === 'proximityRh').source).toContain('RH_PROXIMITE_KIT_CANDIDAT.md');
  render(<AdministrationPortfolioOverview language={language} />);
  for (const title of titles) {
    const card = within(screen.getByRole('heading', { name: title }).closest('article'));
    fireEvent.click(card.getByRole('button', { name: show }));
    expect(card.getByRole('link', { name: open })).toHaveAttribute('href', '/rh?tab=resources');
    expect(card.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(card.getByRole('button'));
    expect(card.queryByRole('link')).not.toBeInTheDocument();
  }
  expect(document.body.textContent).not.toMatch(/Koné|Mariam|50 000|30 000|Enregistrement.*m4a/);
});
