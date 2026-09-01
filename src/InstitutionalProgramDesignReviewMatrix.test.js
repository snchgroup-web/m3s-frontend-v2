import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignReviewMatrix from './InstitutionalProgramDesignReviewMatrix';

describe('InstitutionalProgramDesignReviewMatrix', () => {
  test('records the confirmed six-row framing without progress or execution', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-review-row')).toHaveLength(6);
    ['CON-01', 'CON-02', 'CON-03', 'CON-04', 'CON-05', 'CON-06'].forEach(id => expect(screen.getByText(id)).toBeInTheDocument());
    expect(screen.getByText('6/6', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('progression non calculable')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-002 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/Aucune preuve n’est acceptée/)).toBeInTheDocument();
  });

  test('keeps evidence and owners explicitly candidate', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="EN" />);

    expect(screen.getAllByText('Candidate evidence')).toHaveLength(6);
    expect(screen.getAllByText('Candidate owner')).toHaveLength(6);
    expect(screen.getByText(/No evidence is accepted/)).toBeInTheDocument();
  });

  test('provides the grouped German review copy', () => {
    render(<InstitutionalProgramDesignReviewMatrix language="DE" />);

    expect(screen.getByText('Bestätigter Prüfrahmen für die sechs Konzeptionskomponenten')).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-EVD-001 V0.1/)).toBeInTheDocument();
  });
});
