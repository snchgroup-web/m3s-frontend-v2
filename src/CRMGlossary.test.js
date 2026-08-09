import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CRMGlossary, { getCRMGlossaryTerms } from './CRMGlossary';

test.each(['FR', 'DE', 'EN'])('provides nine unique CRM terms in %s', language => {
  const terms = getCRMGlossaryTerms(language);
  expect(terms).toHaveLength(9);
  expect(new Set(terms.map(term => term.id)).size).toBe(9);
  expect(terms.every(term => term.status === 'candidate')).toBe(true);
});

test('filters CRM terms and preserves the governed return to the local glossary', () => {
  render(<CRMGlossary language="FR" />);

  expect(screen.getByRole('heading', { level: 2, name: 'Glossaire Commercial & CRM' })).toBeInTheDocument();
  expect(screen.getByText('9 termes')).toBeInTheDocument();
  expect(screen.getAllByText('Définition candidate').length).toBeGreaterThan(0);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'pipeline' } });
  fireEvent.click(screen.getByRole('button', { name: /Pipeline commercial/i }));

  expect(screen.getByRole('link', { name: 'Examiner dans le Glossaire central' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=CRM-PIPELINE&returnTo=crm-glossary'
  );
});

test('renders the German CRM glossary title', () => {
  render(<CRMGlossary language="DE" />);
  expect(screen.getByRole('heading', { level: 2, name: 'Glossar Vertrieb & CRM' })).toBeInTheDocument();
});
