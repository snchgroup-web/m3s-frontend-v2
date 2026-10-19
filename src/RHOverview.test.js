import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import RHOverview from './RHOverview';

test('keeps a real zero distinct from an unavailable RH source', () => {
  const { rerender } = render(<RHOverview language="FR" directoryCount={0} directoryStatus="available" />);

  expect(screen.getByText('0 membre confirmé par la source')).toBeInTheDocument();
  expect(screen.getByText(/aucune valeur de démonstration/i)).toBeInTheDocument();
  expect(screen.getByText(/graphiques mensuels fictifs ont été retirés/i)).toBeInTheDocument();

  rerender(<RHOverview language="FR" directoryCount={null} directoryStatus="unavailable" />);
  expect(within(screen.getByRole('heading', { name: 'Annuaire des membres' }).closest('article')).getByText('Source indisponible')).toBeInTheDocument();
  expect(screen.queryByText('0 membre confirmé par la source')).not.toBeInTheDocument();
});

test.each([
  ['FR', 'Dossiers employés', '2 dossiers accessibles', '0 dossier accessible', 'Source indisponible', 'Ouvrir les dossiers employés', 'Actualiser le compteur employés'],
  ['EN', 'Employee dossiers', '2 accessible dossiers', '0 accessible dossiers', 'Source unavailable', 'Open employee dossiers', 'Refresh employee count'],
  ['DE', 'Beschäftigtenakten', '2 zugängliche Akten', '0 zugängliche Akten', 'Quelle nicht verfügbar', 'Beschäftigtenakten öffnen', 'Beschäftigtenzahl aktualisieren']
])('shows scoped employee counts separately from members and local drafts in %s', (language, title, two, zero, missing, openLabel, refreshLabel) => {
  const onOpen = jest.fn(), refresh = jest.fn();
  const props = { language, directoryCount: 6, directoryStatus: 'available',
    employeeDraftCount: 3, volunteerDraftCount: 4, onOpenEmployees: onOpen };
  const view = render(<RHOverview {...props} employeeSummary={{ status: 'available', count: 2, refresh }} />);
  const card = () => within(screen.getByRole('heading', { name: title }).closest('article'));
  expect(card().getByText(two)).toBeInTheDocument();
  fireEvent.click(card().getByRole('button', { name: openLabel }));
  fireEvent.click(card().getByRole('button', { name: refreshLabel }));
  expect(onOpen).toHaveBeenCalledTimes(1); expect(refresh).toHaveBeenCalledTimes(1);
  view.rerender(<RHOverview {...props} employeeSummary={{ status: 'available', count: 0 }} />);
  expect(card().getByText(zero)).toBeInTheDocument();
  view.rerender(<RHOverview {...props} employeeSummary={{ status: 'unavailable', count: null }} />);
  expect(card().getByText(missing)).toBeInTheDocument();
  expect(card().queryByText(zero)).not.toBeInTheDocument();
});

test('renders the German source-governance frame', () => {
  render(<RHOverview language="DE" directoryCount={3} directoryStatus="available" employeeDraftCount={1} />);

  expect(screen.getByRole('heading', { name: /Erkennen, wer zu 2SG beiträgt/i })).toBeInTheDocument();
  expect(screen.getByText('3 Mitglieder durch die Quelle bestätigt')).toBeInTheDocument();
  expect(screen.getByText(/nicht persistente Eingabe/i)).toBeInTheDocument();
});

test.each([['FR', 'Ouvrir les outils RH de proximit\u00e9'], ['DE', 'Werkzeuge f\u00fcr wohnortnahe Personalarbeit \u00f6ffnen'], ['EN', 'Open proximity HR tools']])('provides a visible tools entry in %s', (language, label) => {
  const open = jest.fn(); render(<RHOverview language={language} onOpenTools={open} />);
  fireEvent.click(screen.getByRole('button', { name: label }));
  expect(open).toHaveBeenCalledTimes(1);
});
