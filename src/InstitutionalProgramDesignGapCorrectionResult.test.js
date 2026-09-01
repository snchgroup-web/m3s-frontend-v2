import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignGapCorrectionResult from './InstitutionalProgramDesignGapCorrectionResult';

describe('InstitutionalProgramDesignGapCorrectionResult', () => {
  test('records both French corrections and the governed decision', () => {
    render(<InstitutionalProgramDesignGapCorrectionResult language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-gap-result')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-011 · V1.0' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-012 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
    expect(screen.getByText('7/7')).toBeInTheDocument();
    expect(screen.getByText(/source SRC-06 reste intacte/i)).toBeInTheDocument();
    expect(screen.getByText(/même contexte que le dictionnaire dynamique/i)).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-REV-003 V0.1/i)).toBeInTheDocument();
    expect(screen.getByText(/0 preuve acceptée/i)).toBeInTheDocument();
  });

  test('preserves the English operational boundary', () => {
    render(<InstitutionalProgramDesignGapCorrectionResult language="EN" />);

    expect(screen.getByText('Two corrections confirmed, zero evidence accepted')).toBeInTheDocument();
    expect(screen.getByText(/no retrospective validation, evidence acceptance, Telegram delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/zero calculated progress/i)).toBeInTheDocument();
  });

  test('renders the German result gate', () => {
    render(<InstitutionalProgramDesignGapCorrectionResult language="DE" />);

    expect(screen.getByText('Zwei Korrekturen bestätigt, null Nachweise angenommen')).toBeInTheDocument();
    expect(screen.getByText(/Kandidat für Nachkorrekturprüfung/i)).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-REV-003 V0.1/i)).toBeInTheDocument();
  });
});
