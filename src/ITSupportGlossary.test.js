import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ITSupportGlossary, { getITSupportGlossaryTerms } from './ITSupportGlossary';

test.each(['FR', 'DE', 'EN'])('exposes the three validated IT & Support terms in %s', language => {
  const terms = getITSupportGlossaryTerms(language);
  expect(terms).toHaveLength(3);
  terms.forEach(term => {
    expect(term.id).toMatch(/^KM-/);
    expect(term.status).toBe('validated');
    expect(term.version).toBe('V5.2');
    expect(term.term).toBeTruthy();
    expect(term.shortDefinition).toBeTruthy();
    expect(term.detailedDefinition).toBeTruthy();
  });
});

test('shows the validated status and opens the stable central entry', () => {
  render(<ITSupportGlossary language="FR" />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'base de connaissances' } });
  fireEvent.click(screen.getByRole('button', { name: /^Base de connaissances/i }));

  expect(screen.getByText('Définition validée')).toBeInTheDocument();
  expect(screen.getByText('KM-BASE-CONNAISSANCES')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=KM-BASE-CONNAISSANCES&returnTo=it-support-glossary'
  );
});

test('renders the German function title without a French fallback', () => {
  render(<ITSupportGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Fachglossar IT & Support' })).toBeInTheDocument();
  expect(screen.getByText('Validierte Definition')).toBeInTheDocument();
  expect(screen.queryByText('Définition validée')).not.toBeInTheDocument();
});
