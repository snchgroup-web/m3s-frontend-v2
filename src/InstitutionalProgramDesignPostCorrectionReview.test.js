import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignPostCorrectionReview from './InstitutionalProgramDesignPostCorrectionReview';

describe('InstitutionalProgramDesignPostCorrectionReview', () => {
  test('records both French controls without accepting evidence', () => {
    render(<InstitutionalProgramDesignPostCorrectionReview language="FR" />);

    const controls = screen.getAllByTestId('institutional-program-design-post-correction-control');
    expect(controls).toHaveLength(2);
    controls.forEach(control => expect(control).toHaveTextContent('Écart technique levé'));
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByText(/Je confirme PGM-CON-REV-003 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/ne signifie ni preuve acceptée/i)).toBeInTheDocument();
  });

  test('preserves the English evidentiary boundary', () => {
    render(<InstitutionalProgramDesignPostCorrectionReview language="EN" />);

    expect(screen.getByText('Two technical gaps resolved, zero evidence accepted')).toBeInTheDocument();
    expect(screen.getByText(/does not qualify the eight references as institutional evidence/i)).toBeInTheDocument();
    expect(screen.getByText(/without accepting the eight references as evidence/i)).toBeInTheDocument();
  });

  test('renders the German post-correction gate', () => {
    render(<InstitutionalProgramDesignPostCorrectionReview language="DE" />);

    expect(screen.getByText('Zwei technische Lücken behoben, null Nachweise angenommen')).toBeInTheDocument();
    expect(screen.getByText(/Nächste gebündelte Bestätigung/i)).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-REV-003 V0.1 als Nachkorrekturprüfung/i)).toBeInTheDocument();
  });
});
