import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceAdmissibilityArbitration from './InstitutionalProgramDesignEvidenceAdmissibilityArbitration';

describe('InstitutionalProgramDesignEvidenceAdmissibilityArbitration', () => {
  test('confirms the four French lanes without pronouncing admissibility', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-arbitration-lane')).toHaveLength(4);
    expect(screen.getAllByTestId('institutional-program-design-evidence-arbitration-reference')).toHaveLength(8);
    expect(screen.getAllByText('PROPOSITION')).toHaveLength(4);
    expect(screen.getByText('0/8')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-015 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-DEC-001 V0.1 prépare huit propositions individuelles/i)).toBeInTheDocument();
    expect(screen.getByText(/ne rend aucune référence admissible/i)).toBeInTheDocument();
  });

  test('preserves the English decision boundary', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="EN" />);

    expect(screen.getByText('Four confirmed lanes, eight decisions still open')).toBeInTheDocument();
    expect(screen.getAllByText('PROPOSAL')).toHaveLength(4);
    expect(screen.getByText(/makes no reference admissible/i)).toBeInTheDocument();
  });

  test('renders the German candidate lanes without evidence acceptance', () => {
    render(<InstitutionalProgramDesignEvidenceAdmissibilityArbitration language="DE" />);

    expect(screen.getByText('Vier bestätigte Wege, acht Entscheide noch offen')).toBeInTheDocument();
    expect(screen.getAllByText('VORSCHLAG')).toHaveLength(4);
    expect(screen.getByText(/spricht 0\/8 Zulässigkeitsentscheide aus/i)).toBeInTheDocument();
  });
});
