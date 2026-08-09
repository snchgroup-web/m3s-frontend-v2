import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StockAssetsGlossary, { getStockAssetsGlossaryTerms } from './StockAssetsGlossary';

test.each(['FR', 'DE', 'EN'])('provides nine unique Stock & Assets terms in %s', language => {
  const terms = getStockAssetsGlossaryTerms(language);
  expect(terms).toHaveLength(9);
  expect(new Set(terms.map(term => term.id)).size).toBe(9);
  expect(terms.every(term => term.status === 'candidate')).toBe(true);
});

test('filters terms and preserves the governed return to the local glossary', () => {
  render(<StockAssetsGlossary language="FR" />);

  expect(screen.getByRole('heading', { level: 2, name: 'Glossaire Stock & Actifs' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getAllByText('Définition candidate').length).toBeGreaterThan(0);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'foncier' } });
  fireEvent.click(screen.getByRole('button', { name: /Registre foncier/i }));

  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=ACTIF-REGISTRE-FONCIER&returnTo=stock-assets-glossary'
  );
});

test('renders the German local glossary title', () => {
  render(<StockAssetsGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Glossar Anlagen & Vermögenswerte' })).toBeInTheDocument();
});
