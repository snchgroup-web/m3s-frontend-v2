import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationGlossary, { getAdministrationGlossaryTerms } from './AdministrationGlossary';

test.each(['FR', 'DE', 'EN'])('reuses all central Administration definitions in %s', language => {
  const terms = getAdministrationGlossaryTerms(language);
  expect(terms).toHaveLength(26);
  terms.forEach(term => {
    expect(term.id).toBeTruthy();
    expect(term.term).toBeTruthy();
    expect(term.shortDefinition).toBeTruthy();
    expect(term.detailedDefinition).toBeTruthy();
    expect(term.version).toMatch(/^V5\./);
  });
});

test('covers every Administration component and keeps unvalidated business terms explicit', () => {
  const terms = getAdministrationGlossaryTerms('FR');
  const ids = terms.map(term => term.id);

  expect(ids).toEqual(expect.arrayContaining([
    'ADM-ARCHITECTURE-FONCTIONNELLE',
    'ADM-PROCESSUS',
    'ADM-PROCEDURE',
    'ADM-MANUEL-PROCEDURES',
    'ADM-RAPPORT-ACTIVITE',
    'ADM-PERIODE-REFERENCE',
    'ADM-VERSION-CONSOLIDEE',
    'ADM-CONFORMITE',
    'ADM-CORRESPONDANCE'
  ]));
  expect(terms.find(term => term.id === 'ADM-PROCESSUS')).toMatchObject({ status: 'candidate' });
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
  expect(screen.getByRole('heading', { level: 2, name: 'Glossar Administration' })).toBeInTheDocument();
  expect(screen.getByText('Maßgebliche Quelle')).toBeInTheDocument();
});
