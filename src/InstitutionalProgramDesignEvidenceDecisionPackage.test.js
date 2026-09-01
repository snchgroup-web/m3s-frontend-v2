import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceDecisionPackage from './InstitutionalProgramDesignEvidenceDecisionPackage';

describe('InstitutionalProgramDesignEvidenceDecisionPackage', () => {
  test('prepares eight French proposals without pronouncing a decision', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(8);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-limited')).toHaveLength(3);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-defer')).toHaveLength(5);
    expect(screen.getAllByText('PROPOSITION')).toHaveLength(8);
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByText(/Je confirme PGM-CON-DEC-001 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/n’est ni une admissibilité prononcée/i)).toBeInTheDocument();
  });

  test('preserves the English documentary boundary', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="EN" />);

    expect(screen.getByText('Eight explicit proposals, zero decisions pronounced')).toBeInTheDocument();
    expect(screen.getAllByText('PROPOSAL')).toHaveLength(8);
    expect(screen.getByText(/neither pronounced admissibility/i)).toBeInTheDocument();
  });

  test('renders the German individual proposals without accepting evidence', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="DE" />);

    expect(screen.getByText('Acht ausdrückliche Vorschläge, null ausgesprochene Entscheide')).toBeInTheDocument();
    expect(screen.getAllByText('VORSCHLAG')).toHaveLength(8);
    expect(screen.getByText(/ohne sie bereits auszusprechen, Nachweise anzunehmen/i)).toBeInTheDocument();
  });
});
