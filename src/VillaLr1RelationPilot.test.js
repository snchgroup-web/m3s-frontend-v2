import { render, screen } from '@testing-library/react';
import VillaLr1RelationPilot from './VillaLr1RelationPilot';

test('maps the documented Villa LR1 state without inventing identifiers', () => {
  render(<VillaLr1RelationPilot language="FR" />);

  expect(screen.getByRole('heading', { name: 'Cas pilote : Villa LR1' })).toBeInTheDocument();
  expect(screen.getByText('Étanchéité confirmée après pluie ; réception finale encore à consigner.')).toBeInTheDocument();
  expect(screen.getByText('Eau rétablie et débit vérifié ; finition de protection à réceptionner séparément.')).toBeInTheDocument();
  expect(screen.getByText(/ne crée aucun identifiant technique/)).toBeInTheDocument();
  expect(screen.getByText(/1 actif → plusieurs interventions/)).toBeInTheDocument();
});

test('renders the English case with governed assignments', () => {
  render(<VillaLr1RelationPilot language="EN" />);

  expect(screen.getByRole('heading', { name: 'Pilot case: Villa LR1' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Unambiguous responsibilities' })).toBeInTheDocument();
  expect(screen.getByText(/linked through assignments/)).toBeInTheDocument();
});

test('renders the German finishing work separately', () => {
  render(<VillaLr1RelationPilot language="DE" />);

  expect(screen.getByRole('heading', { name: 'Pilotfall: Villa LR1' })).toBeInTheDocument();
  expect(screen.getByText('Abschlussarbeiten laufen')).toBeInTheDocument();
  expect(screen.getByText(/Schutzmauerwerk und Abdeckung/)).toBeInTheDocument();
});
