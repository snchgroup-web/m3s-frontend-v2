import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceAdmissibilityMatrix from './InstitutionalProgramDesignEvidenceAdmissibilityMatrix';

describe('InstitutionalProgramDesignEvidenceAdmissibilityMatrix', () => {
  test('keeps all eight French references pending behind five gates', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityMatrix language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-gate')).toHaveLength(5);
    expect(screen.getAllByTestId('institutional-program-design-evidence-admissibility-row')).toHaveLength(8);
    expect(screen.getAllByText('À ARBITRER')).toHaveLength(8);
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-014 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-ARB-001 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/n’est ni une décision d’admissibilité/i)).toBeInTheDocument();
  });

  test('preserves the English evidentiary boundary', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityMatrix language="EN" />);

    expect(screen.getByText('Eight decisions governed, no admissibility pronounced')).toBeInTheDocument();
    expect(screen.getAllByText('TO DECIDE')).toHaveLength(8);
    expect(screen.getByText(/neither an admissibility decision, accepted evidence/i)).toBeInTheDocument();
  });

  test('renders the German candidate matrix without promotion', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityMatrix language="DE" />);

    expect(screen.getByText('Acht Entscheide gesteuert, keine Zulässigkeit ausgesprochen')).toBeInTheDocument();
    expect(screen.getAllByText('ZU ENTSCHEIDEN')).toHaveLength(8);
    expect(screen.getByText(/Er spricht 0\/8 Zulässigkeitsentscheide aus/i)).toBeInTheDocument();
  });
});
