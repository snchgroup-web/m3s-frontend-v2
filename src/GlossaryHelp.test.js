import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GlossaryHelp, { GlossaryEntryPanel } from './GlossaryHelp';

test('opens an accessible contextual definition and links to the stable glossary identifier', () => {
  render(<GlossaryHelp termId="STRAT-BUSINESS-PLAN" language="FR" />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Business Plan' }));

  expect(screen.getByRole('dialog', { name: 'Business Plan' })).toBeInTheDocument();
  expect(screen.getByText('Proposition à valider')).toBeInTheDocument();
  expect(screen.getByText('STRAT-BUSINESS-PLAN')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Voir dans le Glossaire' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=STRAT-BUSINESS-PLAN'
  );
});

test('renders the selected contextual entry in German', () => {
  render(<GlossaryEntryPanel termId="GOUV-GOUVERNANCE" language="DE" />);

  expect(screen.getByRole('heading', { name: 'Governance' })).toBeInTheDocument();
  expect(screen.getByText('Vorschlag zur Validierung')).toBeInTheDocument();
  expect(screen.getByText(/vertikale Hierarchie/i)).toBeInTheDocument();
});
