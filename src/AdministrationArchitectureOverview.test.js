import { render, screen, within } from '@testing-library/react';
import AdministrationArchitectureOverview from './AdministrationArchitectureOverview';

test('renders the reusable Administration architecture in French', () => {
  render(<AdministrationArchitectureOverview language="FR" />);

  expect(screen.getByRole('heading', { name: 'Voir comment la fonction s’organise et coopère' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Patron réutilisable d’une application métier M3S' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Quatre couches complémentaires' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Relations avec les autres fonctions' })).toBeInTheDocument();
  expect(screen.getByText(/Un enregistrement réel n’existe que lorsqu’une source autorisée le fournit/)).toBeInTheDocument();
  expect(screen.getByText('Document Directeur Global V4')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Raccordement au modèle relationnel transversal V1' })).toBeInTheDocument();
  expect(screen.getByText('Inventaire contrôlé au 15-08-2026')).toBeInTheDocument();
  expect(screen.getByText('administration_resources')).toBeInTheDocument();
  expect(screen.getByText('GET /api/administration/audit')).toBeInTheDocument();
  expect(screen.getByText(/trace technique et journal de bord métier/)).toBeInTheDocument();
});

test('keeps systems framed without presenting a vendor decision', () => {
  render(<AdministrationArchitectureOverview language="EN" />);

  expect(screen.getByRole('heading', { name: 'Systems and connection levels' })).toBeInTheDocument();
  expect(screen.getByText('M3S interface')).toBeInTheDocument();
  const systemsSection = screen.getByRole('heading', { name: 'Systems and connection levels' }).closest('section');
  expect(within(systemsSection).getAllByText('Partial')).toHaveLength(2);
  expect(screen.getByText(/neither technical approval nor vendor selection/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Connection to the cross-functional relational model V1' })).toBeInTheDocument();
  expect(screen.getByText(/Distinguish application account, person, role, function and assignment/)).toBeInTheDocument();
});

test('renders the German relations and reuse rule', () => {
  render(<AdministrationArchitectureOverview language="DE" />);

  expect(screen.getByRole('heading', { name: 'Organisation und Zusammenarbeit der Funktion verstehen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beziehungen zu anderen Funktionen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Wiederverwendungsregel' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Anbindung an das funktionsübergreifende relationale Modell V1' })).toBeInTheDocument();
  expect(screen.getByText(/Technische Auditspur und fachliches Arbeitsjournal getrennt halten/)).toBeInTheDocument();
});
