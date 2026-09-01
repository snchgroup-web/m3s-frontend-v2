import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceAdmissibilityArbitration from './InstitutionalProgramDesignEvidenceAdmissibilityArbitration';

describe('InstitutionalProgramDesignEvidenceAdmissibilityArbitration', () => {
  test('groups eight French references without pronouncing admissibility', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-arbitration-lane')).toHaveLength(4);
    expect(screen.getAllByTestId('institutional-program-design-evidence-arbitration-reference')).toHaveLength(8);
    expect(screen.getAllByText('PROPOSITION')).toHaveLength(4);
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByText(/Je confirme PGM-CON-ARB-001 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/ne rend aucune référence admissible/i)).toBeInTheDocument();
  });

  test('preserves the English decision boundary', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="EN" />);

    expect(screen.getByText('Four candidate lanes, no admissibility decided')).toBeInTheDocument();
    expect(screen.getAllByText('PROPOSAL')).toHaveLength(4);
    expect(screen.getByText(/makes no reference admissible/i)).toBeInTheDocument();
  });

  test('renders the German candidate lanes without evidence acceptance', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="DE" />);

    expect(screen.getByText('Vier Kandidatenwege, keine Zulässigkeit entschieden')).toBeInTheDocument();
    expect(screen.getAllByText('VORSCHLAG')).toHaveLength(4);
    expect(screen.getByText(/ohne Zulässigkeit auszusprechen, Nachweise anzunehmen/i)).toBeInTheDocument();
  });
});
