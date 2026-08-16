import { render, screen } from '@testing-library/react';
import TransversalRelationContract from './TransversalRelationContract';

test('explains the governed transversal relation contract in French', () => {
  render(<TransversalRelationContract language="FR" />);

  expect(screen.getByRole('heading', { name: 'Contrat minimal de relations communes' })).toBeInTheDocument();
  expect(screen.getByText('Agent & affectation')).toBeInTheDocument();
  expect(screen.getByText('Validation & réception')).toBeInTheDocument();
  expect(screen.getByText('Document GED & preuve')).toBeInTheDocument();
  expect(screen.getByText(/Une validation n’est pas déduite du nom de l’auteur/)).toBeInTheDocument();
});

test('keeps optional relationships conditional in English', () => {
  render(<TransversalRelationContract language="EN" />);

  expect(screen.getByRole('heading', { name: 'Minimum contract for shared relationships' })).toBeInTheDocument();
  expect(screen.getAllByText('When the context exists')).toHaveLength(4);
  expect(screen.getByText(/without creating empty levels/)).toBeInTheDocument();
});

test('renders the German responsibility and evidence wording', () => {
  render(<TransversalRelationContract language="DE" />);

  expect(screen.getByRole('heading', { name: 'Minimalvertrag für gemeinsame Beziehungen' })).toBeInTheDocument();
  expect(screen.getByText('Agent & Zuordnung')).toBeInTheDocument();
  expect(screen.getByText('DMS-Dokument & Nachweis')).toBeInTheDocument();
  expect(screen.getByText(/Eine Freigabe wird nicht aus dem Namen des Autors abgeleitet/)).toBeInTheDocument();
});
