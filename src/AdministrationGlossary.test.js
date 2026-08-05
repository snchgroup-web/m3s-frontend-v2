import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationGlossary, { getAdministrationGlossaryTerms } from './AdministrationGlossary';

test.each(['FR', 'DE', 'EN'])('reuses all central Administration definitions in %s', language => {
  const terms = getAdministrationGlossaryTerms(language);
  expect(terms).toHaveLength(14);
  terms.forEach(term => {
    expect(term.id).toBeTruthy();
    expect(term.term).toBeTruthy();
    expect(term.shortDefinition).toBeTruthy();
    expect(term.detailedDefinition).toBeTruthy();
    expect(term.version).toMatch(/^V5\./);
  });
});

test('filters the local view and opens the stable term in the Central Glossary', () => {
  render(<AdministrationGlossary language="FR" />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'jalon' } });
  fireEvent.click(screen.getByRole('button', { name: /^Jalon/i }));

  expect(screen.getByText('PROJ-JALON')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Consulter dans le Glossaire central/i })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=PROJ-JALON&returnTo=administration-glossary'
  );
});

test('renders the local governance wording in German', () => {
  render(<AdministrationGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Fachglossar Administration' })).toBeInTheDocument();
  expect(screen.getByText('Maßgebliche Quelle')).toBeInTheDocument();
});
