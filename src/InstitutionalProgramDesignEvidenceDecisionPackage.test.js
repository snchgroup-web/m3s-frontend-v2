import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceDecisionPackage from './InstitutionalProgramDesignEvidenceDecisionPackage';

describe('InstitutionalProgramDesignEvidenceDecisionPackage', () => {
  test('records eight pronounced decisions without accepting achievement evidence', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(8);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-limited')).toHaveLength(3);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-defer')).toHaveLength(5);
    expect(screen.getAllByText('PRONONCÉE')).toHaveLength(8);
    expect(screen.getByText('8/8')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-017 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText('PGM-DEC-016 · V1.0')).toBeInTheDocument();
    expect(screen.getByText('Paquet de propositions confirmé')).toBeInTheDocument();
    expect(screen.getByText(/alors je confirme PGM-CON-DEC-001 V0.1/)).toBeInTheDocument();
    expect(screen.queryByText('Prochaine confirmation groupée')).not.toBeInTheDocument();
    expect(screen.getByText(/aucune nouvelle confirmation de ce lot/i)).toBeInTheDocument();
    expect(screen.getByText(/aucun accès ou collecte supplémentaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Je prononce les décisions de PGM-CON-DEC-001 V1.0/)).toBeInTheDocument();
    expect(screen.getByText(/Une admission documentaire limitée ne prouve pas/i)).toBeInTheDocument();
  });

  test('preserves the English documentary boundary', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="EN" />);

    expect(screen.getByText('Eight decisions pronounced, zero achievement evidence accepted')).toBeInTheDocument();
    expect(screen.getAllByText('PRONOUNCED')).toHaveLength(8);
    expect(screen.getByText('Proposal package confirmed')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 documentary decisions pronounced, zero evidence accepted/)).toBeInTheDocument();
    expect(screen.getByText(/Limited documentary admission does not prove institutional achievement/i)).toBeInTheDocument();
  });

  test('renders the German individual proposals without accepting evidence', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="DE" />);

    expect(screen.getByText('Acht Entscheide ausgesprochen, null Umsetzungsnachweise angenommen')).toBeInTheDocument();
    expect(screen.getAllByText('AUSGESPROCHEN')).toHaveLength(8);
    expect(screen.getByText('Vorschlagspaket bestätigt')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 Dokumentenentscheide ausgesprochen, null Nachweise angenommen/)).toBeInTheDocument();
  });

  test('preserves each authorised outcome and its source identifier', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage />);
    const rows = screen.getAllByTestId('institutional-program-design-evidence-decision-row');
    const limited = ['SRC-02', 'SRC-04', 'SRC-07'];
    rows.forEach((row, index) => {
      const id = `SRC-${String(index + 1).padStart(2, '0')}`;
      expect(row).toHaveTextContent(id);
      expect(row).toHaveTextContent(limited.includes(id) ? 'ADMISSION LIMITÉE' : 'AJOURNER');
      expect(row).toHaveTextContent('PRONONCÉE');
    });
  });
});
