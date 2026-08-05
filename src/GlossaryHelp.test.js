import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GlossaryHelp, { GlossaryEntryPanel } from './GlossaryHelp';

test('opens an accessible contextual definition and links to the stable glossary identifier', () => {
  render(<GlossaryHelp termId="STRAT-BUSINESS-PLAN" language="FR" />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Business Plan' }));

  expect(screen.getByRole('dialog', { name: 'Business Plan' })).toBeInTheDocument();
  expect(screen.getByText('Définition validée')).toBeInTheDocument();
  expect(screen.getByText(/Glossaire central 2SG · V5\.0/i)).toBeInTheDocument();
  expect(screen.getByText('STRAT-BUSINESS-PLAN')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Voir dans le Glossaire' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=STRAT-BUSINESS-PLAN'
  );
});

test('renders the selected contextual entry in German', () => {
  render(<GlossaryEntryPanel termId="GOUV-GOUVERNANCE" language="DE" />);

  expect(screen.getByRole('heading', { name: 'Governance' })).toBeInTheDocument();
  expect(screen.getByText('Validierte Definition')).toBeInTheDocument();
  expect(screen.getByText(/vertikale Hierarchie/i)).toBeInTheDocument();
});

test('uses the approved Direction and Strategy wording', () => {
  const { rerender } = render(<GlossaryEntryPanel termId="INST-BUT" language="FR" />);

  expect(screen.getByText(/Finalité institutionnelle générale/i)).toBeInTheDocument();

  rerender(<GlossaryEntryPanel termId="GOUV-REGLES-OR" language="DE" />);
  expect(screen.getByRole('heading', { name: 'Goldene Regeln der Zusammenarbeit' })).toBeInTheDocument();
  expect(screen.getByText('Validierte Definition')).toBeInTheDocument();
});

test('distinguishes a proposed project term from a validated definition', () => {
  render(<GlossaryHelp termId="PROJ-JALON" language="FR" />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Jalon' }));

  expect(screen.getByRole('dialog', { name: 'Jalon' })).toBeInTheDocument();
  expect(screen.getByText('Définition proposée')).toBeInTheDocument();
  expect(screen.queryByText('Définition validée')).not.toBeInTheDocument();
  expect(screen.getByText('PROJ-JALON')).toBeInTheDocument();
  expect(screen.getByText('Publication dans le Glossaire après validation')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Voir dans le Glossaire' })).not.toBeInTheDocument();
});
