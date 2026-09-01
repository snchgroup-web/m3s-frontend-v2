import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceControlledReview from './InstitutionalProgramDesignEvidenceControlledReview';

describe('InstitutionalProgramDesignEvidenceControlledReview', () => {
  test('records the bounded French reading without accepting evidence', () => {
    render(<InstitutionalProgramDesignEvidenceControlledReview language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-controlled-reference')).toHaveLength(8);
    expect(screen.getAllByText('DIRECT')).toHaveLength(7);
    expect(screen.getByText('MÉTHODE')).toBeInTheDocument();
    expect(screen.getAllByText('ÉCART À TRAITER')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-009 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/0\/8 preuve acceptée/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmer ou amender PGM-CON-REV-002 V0.1/i)).toBeInTheDocument();
  });

  test('keeps the English review candidate-only', () => {
    render(<InstitutionalProgramDesignEvidenceControlledReview language="EN" />);

    expect(screen.getByText('Grouped control of the eight opened references')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 evidence accepted/i)).toBeInTheDocument();
    expect(screen.getByText(/CON-01 and CON-05 not opened/i)).toBeInTheDocument();
  });

  test('renders the German boundary', () => {
    render(<InstitutionalProgramDesignEvidenceControlledReview language="DE" />);

    expect(screen.getByText('Gebündelte Kontrolle der acht geöffneten Referenzen')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 Nachweise angenommen/i)).toBeInTheDocument();
    expect(screen.getByText(/REF-02 und L2 geschlossen/i)).toBeInTheDocument();
  });
});
