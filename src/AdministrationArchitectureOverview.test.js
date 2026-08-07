import { render, screen } from '@testing-library/react';
import AdministrationArchitectureOverview from './AdministrationArchitectureOverview';

test('renders the reusable Administration architecture in French', () => {
  render(<AdministrationArchitectureOverview language="FR" />);

  expect(screen.getByRole('heading', { name: 'Voir comment la fonction s’organise et coopère' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Patron réutilisable d’une application métier M3S' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Quatre couches complémentaires' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Relations avec les autres fonctions' })).toBeInTheDocument();
  expect(screen.getByText(/Un enregistrement réel n’existe que lorsqu’une source autorisée le fournit/)).toBeInTheDocument();
  expect(screen.getByText('Document Directeur Global V4')).toBeInTheDocument();
});

test('keeps systems framed without presenting a vendor decision', () => {
  render(<AdministrationArchitectureOverview language="EN" />);

  expect(screen.getByRole('heading', { name: 'Systems and connection levels' })).toBeInTheDocument();
  expect(screen.getByText('M3S interface')).toBeInTheDocument();
  expect(screen.getAllByText('Partial')).toHaveLength(2);
  expect(screen.getByText(/neither technical approval nor vendor selection/i)).toBeInTheDocument();
});

test('renders the German relations and reuse rule', () => {
  render(<AdministrationArchitectureOverview language="DE" />);

  expect(screen.getByRole('heading', { name: 'Organisation und Zusammenarbeit der Funktion verstehen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Beziehungen zu anderen Funktionen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Wiederverwendungsregel' })).toBeInTheDocument();
});
