import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FunctionGlossary, { buildFunctionGlossaryTerms } from './FunctionGlossary';

const groups = [
  {
    id: 'steering',
    labels: { FR: 'Pilotage', DE: 'Steuerung', EN: 'Steering' },
    termIds: ['INST-VISION', 'PROJ-JALON', 'UNKNOWN-TERM']
  }
];

const copy = {
  FR: {
    eyebrow: 'VUE MÉTIER',
    title: 'Glossaire de test',
    intro: 'Vue locale reliée au Glossaire central.',
    search: 'Rechercher…',
    all: 'Tous les domaines',
    terms: 'termes',
    empty: 'Aucun terme.',
    validated: 'Validée',
    stableId: 'Identifiant',
    version: 'Version',
    localDomain: 'Contexte',
    source: 'Source',
    central: 'Glossaire central',
    openCentral: 'Ouvrir dans le Glossaire central',
    governance: 'La source centrale reste maîtresse.'
  }
};

test('builds a reusable function view from stable central identifiers', () => {
  const terms = buildFunctionGlossaryTerms(groups, 'FR');
  expect(terms.map(term => term.id)).toEqual(['INST-VISION', 'PROJ-JALON']);
  expect(terms.every(term => term.groupLabel === 'Pilotage')).toBe(true);
});

test('filters a configured function glossary and preserves the central link', () => {
  render(<FunctionGlossary language="FR" groups={groups} copy={copy} glossaryId="test-glossary" />);

  expect(screen.getByRole('heading', { level: 2, name: 'Glossaire de test' })).toHaveAttribute('id', 'test-glossary-title');
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'jalon' } });
  fireEvent.click(screen.getByRole('button', { name: /^Jalon/i }));

  expect(screen.getByText('PROJ-JALON')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ouvrir dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=PROJ-JALON'
  );
});

test('confirms adding, editing and deleting a governed local proposal', () => {
  render(<FunctionGlossary language="FR" groups={groups} copy={copy} glossaryId="test-glossary" />);

  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
  expect(screen.getByRole('dialog', { name: 'Proposer un terme' })).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Terme \*/), { target: { value: 'Revue de conformité' } });
  fireEvent.change(screen.getByLabelText(/Définition courte \*/), { target: { value: 'Contrôle formalisé avant décision.' } });
  fireEvent.change(screen.getByLabelText(/Source ou référence/), { target: { value: 'Référentiel Administration' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la proposition' }));

  expect(screen.getByRole('dialog', { name: "Confirmer l'ajout" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(screen.getByRole('dialog', { name: 'Proposer un terme' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la proposition' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, ajouter' }));

  expect(screen.getByRole('heading', { name: 'Propositions préparées dans cette session' })).toBeInTheDocument();
  expect(screen.getByText('Revue de conformité')).toBeInTheDocument();
  expect(screen.getByText('Brouillon local · à soumettre au Glossaire central')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Proposition ajoutée avec succès.');

  fireEvent.click(screen.getByRole('button', { name: 'Modifier' }));
  expect(screen.getByRole('dialog', { name: 'Modifier la proposition' })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/Définition courte \*/), { target: { value: 'Contrôle formalisé et documenté avant décision.' } });
  fireEvent.click(screen.getByRole('button', { name: 'Modifier la proposition' }));
  expect(screen.getByRole('dialog', { name: 'Confirmer la modification' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Oui, modifier' }));

  expect(screen.getByText('Contrôle formalisé et documenté avant décision.')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Proposition modifiée avec succès.');

  fireEvent.click(screen.getByRole('button', { name: 'Supprimer' }));
  expect(screen.getByRole('dialog', { name: 'Confirmer la suppression' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Non' }));
  expect(screen.getByText('Revue de conformité')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Supprimer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Oui, supprimer' }));

  expect(screen.queryByText('Revue de conformité')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Proposition supprimée avec succès.');
});
