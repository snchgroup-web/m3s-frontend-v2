import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceSearchResults from './InstitutionalProgramDesignEvidenceSearchResults';

describe('InstitutionalProgramDesignEvidenceSearchResults', () => {
  test('shows the grouped French metadata index and its gaps', () => {
    render(<InstitutionalProgramDesignEvidenceSearchResults language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-search-result')).toHaveLength(6);
    expect(screen.getAllByText('INDEXÉ · MÉTADONNÉES')).toHaveLength(3);
    expect(screen.getByText('PARTIEL · LACUNES')).toBeInTheDocument();
    expect(screen.getAllByText('STOP · RESTREINT')).toHaveLength(2);
    expect(screen.getByText('870')).toBeInTheDocument();
    expect(screen.getByText(/507 correspondances lexicales/i)).toBeInTheDocument();
    expect(screen.getAllByText(/feuille de route versionnée/i)).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-008 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/PGM-CON-COL-002 V0.1 est confirmé et promu en V1.0/i)).toBeInTheDocument();
    expect(screen.getByText(/huit références candidates uniques non restreintes/i)).toBeInTheDocument();
  });

  test('keeps English results candidate-only', () => {
    render(<InstitutionalProgramDesignEvidenceSearchResults language="EN" />);

    expect(screen.getByText('Confirmed index of the bounded internal search')).toBeInTheDocument();
    expect(screen.getByText(/No content was opened or read/i)).toBeInTheDocument();
    expect(screen.getByText(/neither 507 unique records/i)).toBeInTheDocument();
    expect(screen.getByText(/authorises no record opening or reading/i)).toBeInTheDocument();
  });

  test('renders German restrictions and next gate', () => {
    render(<InstitutionalProgramDesignEvidenceSearchResults language="DE" />);

    expect(screen.getByText('Bestätigter Index der begrenzten internen Suche')).toBeInTheDocument();
    expect(screen.getAllByText('STOPP · EINGESCHRÄNKT')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-008 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/acht eindeutigen nicht eingeschränkten Kandidatenreferenzen/i)).toBeInTheDocument();
  });
});
