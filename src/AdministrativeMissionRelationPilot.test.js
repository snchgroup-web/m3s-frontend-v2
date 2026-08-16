import { render, screen } from '@testing-library/react';
import AdministrativeMissionRelationPilot from './AdministrativeMissionRelationPilot';

test('validates the third relational pilot without granting autonomous authority', () => {
  render(<AdministrativeMissionRelationPilot language="FR" />);

  expect(screen.getByRole('heading', { name: 'Mission externe bornée et contrôlée' })).toBeInTheDocument();
  expect(screen.getByText('Dossier de mission')).toBeInTheDocument();
  expect(screen.getByText('Affectation')).toBeInTheDocument();
  expect(screen.getByText('Décision humaine')).toBeInTheDocument();
  expect(screen.getByText(/L’état de circulation et le verdict documentaire restent deux champs distincts/)).toBeInTheDocument();
  expect(screen.getByText(/1 dossier de mission → 1\+ affectations/)).toBeInTheDocument();
  expect(screen.getByText(/Aucun schéma de production/)).toBeInTheDocument();
});

test('renders the bounded mission relationship in English and German', () => {
  const { rerender } = render(<AdministrativeMissionRelationPilot language="EN" />);

  expect(screen.getByRole('heading', { name: 'Bounded and controlled external mission' })).toBeInTheDocument();
  expect(screen.getByText('Framing validated')).toBeInTheDocument();

  rerender(<AdministrativeMissionRelationPilot language="DE" />);
  expect(screen.getByRole('heading', { name: 'Begrenzte und kontrollierte externe Aufgabe' })).toBeInTheDocument();
  expect(screen.getByText('Rahmen validiert')).toBeInTheDocument();
  expect(screen.getByText(/1 Aufgabenakte → 1\+ Zuordnungen/)).toBeInTheDocument();
});
