import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinanceGlossary, { getFinanceGlossaryTerms } from './FinanceGlossary';

test.each(['FR', 'DE', 'EN'])('exposes the five Finance candidates in %s', language => {
  const terms = getFinanceGlossaryTerms(language);
  expect(terms).toHaveLength(5);
  terms.forEach(term => {
    expect(term.id).toMatch(/^FIN-/);
    expect(term.status).toBe('candidate');
    expect(term.version).toBe('V5.3');
    expect(term.term).toBeTruthy();
    expect(term.shortDefinition).toBeTruthy();
    expect(term.detailedDefinition).toBeTruthy();
  });
});

test('shows the proposed status and opens the stable central entry', () => {
  render(<FinanceGlossary language="FR" />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'taux de change' } });
  fireEvent.click(screen.getByRole('button', { name: /^Taux de change appliqué/i }));

  expect(screen.getByText('Définition proposée')).toBeInTheDocument();
  expect(screen.getByText('FIN-TAUX-CHANGE-APPLIQUE')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=FIN-TAUX-CHANGE-APPLIQUE&returnTo=finance-glossary'
  );
});

test('renders the German function title without a French fallback', () => {
  render(<FinanceGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Fachglossar Finanzen' })).toBeInTheDocument();
  expect(screen.getByText('Vorgeschlagene Definition')).toBeInTheDocument();
  expect(screen.queryByText('Définition proposée')).not.toBeInTheDocument();
});
