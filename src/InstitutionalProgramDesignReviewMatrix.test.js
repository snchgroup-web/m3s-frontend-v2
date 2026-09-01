import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignReviewMatrix from './InstitutionalProgramDesignReviewMatrix';

describe('InstitutionalProgramDesignReviewMatrix', () => {
  test('renders all six sourced Design components without progress or execution', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-review-row')).toHaveLength(6);
    ['CON-01', 'CON-02', 'CON-03', 'CON-04', 'CON-05', 'CON-06'].forEach(id => expect(screen.getByText(id)).toBeInTheDocument());
    expect(screen.getByText('0/6', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('progression non calculable')).toBeInTheDocument();
    expect(screen.getByText(/Aucune composante n’est validée/)).toBeInTheDocument();
  });

  test('keeps evidence and owners explicitly candidate', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="EN" />);

    expect(screen.getAllByText('Candidate evidence')).toHaveLength(6);
    expect(screen.getAllByText('Candidate owner')).toHaveLength(6);
    expect(screen.getByText(/No component is validated/)).toBeInTheDocument();
  });

  test('provides the grouped German review copy', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="DE" />);

    expect(screen.getByText('Die sechs Konzeptionskomponenten in einem Entscheid prüfen')).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-REV-001 V0.1 als Kandidatenmatrix/)).toBeInTheDocument();
  });
});
