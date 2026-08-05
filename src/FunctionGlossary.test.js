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

test('prepares a governed local proposal without modifying the central glossary', () => {
  render(<FunctionGlossary language="FR" groups={groups} copy={copy} glossaryId="test-glossary" />);

  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
  expect(screen.getByRole('dialog', { name: 'Proposer un terme' })).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Terme \*/), { target: { value: 'Revue de conformité' } });
  fireEvent.change(screen.getByLabelText(/Définition courte \*/), { target: { value: 'Contrôle formalisé avant décision.' } });
  fireEvent.change(screen.getByLabelText(/Source ou référence/), { target: { value: 'Référentiel Administration' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter la proposition' }));

  expect(screen.queryByRole('dialog', { name: 'Proposer un terme' })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Propositions préparées dans cette session' })).toBeInTheDocument();
  expect(screen.getByText('Revue de conformité')).toBeInTheDocument();
  expect(screen.getByText('Brouillon local · à soumettre au Glossaire central')).toBeInTheDocument();
});
