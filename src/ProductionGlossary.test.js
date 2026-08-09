import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductionGlossary, { getProductionGlossaryTerms } from './ProductionGlossary';

test.each(['FR', 'DE', 'EN'])('provides nine unique Production terms in %s', language => {
  const terms = getProductionGlossaryTerms(language);
  expect(terms).toHaveLength(9);
  expect(new Set(terms.map(term => term.id)).size).toBe(9);
  expect(terms.every(term => term.status === 'candidate')).toBe(true);
});

test('filters Production terms and preserves the governed return to the local glossary', () => {
  render(<ProductionGlossary language="FR" />);

  expect(screen.getByRole('heading', { level: 2, name: 'Glossaire Production' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getAllByText('Définition candidate').length).toBeGreaterThan(0);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'fabrication' } });
  fireEvent.click(screen.getByRole('button', { name: /Ordre de fabrication/i }));

  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=PROD-ORDRE-FABRICATION&returnTo=production-glossary'
  );
});

test('renders the German Production glossary title', () => {
  render(<ProductionGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Glossar Produktion' })).toBeInTheDocument();
});
