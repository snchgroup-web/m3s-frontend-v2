import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignGapCorrectionPlan from './InstitutionalProgramDesignGapCorrectionPlan';

describe('InstitutionalProgramDesignGapCorrectionPlan', () => {
  test('frames exactly two French corrections without executing them', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-gap-package')).toHaveLength(2);
    expect(screen.getByText('COR-01')).toBeInTheDocument();
    expect(screen.getByText('COR-02')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(2);
    expect(screen.getByText(/Je confirme PGM-CON-COR-001 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/Aucune donnée source/i)).toBeInTheDocument();
  });

  test('renders the English execution boundary', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="EN" />);

    expect(screen.getByText('Address both gaps without expanding scope')).toBeInTheDocument();
    expect(screen.getAllByText(/no retroactive validation/i)).toHaveLength(2);
    expect(screen.getByText(/no source data, validation status, Telegram delivery/i)).toBeInTheDocument();
  });

  test('renders the German grouped gate', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="DE" />);

    expect(screen.getByText('Beide Lücken ohne Erweiterung des Umfangs behandeln')).toBeInTheDocument();
    expect(screen.getByText(/Nächstes gebündeltes GO/i)).toBeInTheDocument();
    expect(screen.getByText(/ohne rückwirkende Validierung/i)).toBeInTheDocument();
  });
});
