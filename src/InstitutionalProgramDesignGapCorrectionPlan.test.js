import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignGapCorrectionPlan from './InstitutionalProgramDesignGapCorrectionPlan';

describe('InstitutionalProgramDesignGapCorrectionPlan', () => {
  test('shows exactly two executed French corrections without accepting evidence', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-gap-package')).toHaveLength(2);
    expect(screen.getByText('COR-01')).toBeInTheDocument();
    expect(screen.getByText('COR-02')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
    expect(screen.getByText(/corrections exécutées/i)).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-COR-002 V0.1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/aucune validation rétroactive/i)).toHaveLength(2);
  });

  test('renders the English execution boundary', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="EN" />);

    expect(screen.getByText('Address both gaps without expanding scope')).toBeInTheDocument();
    expect(screen.getByText(/Both corrections were executed separately/i)).toBeInTheDocument();
    expect(screen.getByText(/no retrospective validation, Telegram delivery/i)).toBeInTheDocument();
  });

  test('renders the German candidate execution record', () => {
    render(<InstitutionalProgramDesignGapCorrectionPlan language="DE" />);

    expect(screen.getByText('Beide Lücken ohne Erweiterung des Umfangs behandeln')).toBeInTheDocument();
    expect(screen.getByText(/Kandidat für Ausführungsprotokoll/i)).toBeInTheDocument();
    expect(screen.getAllByText(/keine rückwirkende Validierung/i)).toHaveLength(2);
  });
});
