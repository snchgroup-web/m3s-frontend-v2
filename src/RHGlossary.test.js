import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RHGlossary, { getRHGlossaryTerms } from './RHGlossary';

test.each(['FR', 'DE', 'EN'])('provides nine unique Human Resources terms in %s', language => {
  const terms = getRHGlossaryTerms(language);
  expect(terms).toHaveLength(9);
  expect(new Set(terms.map(term => term.id)).size).toBe(9);
  expect(terms.every(term => term.status === 'candidate')).toBe(true);
});

test('filters terms and preserves the governed return to the local glossary', () => {
  render(<RHGlossary language="FR" />);

  expect(screen.getByRole('heading', { level: 2, name: 'Glossaire Ressources Humaines' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getAllByText('Définition candidate').length).toBeGreaterThan(0);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'délégation' } });
  fireEvent.click(screen.getByRole('button', { name: /Délégation fonctionnelle/i }));

  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=RH-DELEGATION&returnTo=rh-glossary'
  );
});

test('renders the German local glossary title', () => {
  render(<RHGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Glossar Personalwesen' })).toBeInTheDocument();
});
