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
    expect(screen.getByText(/Confirmer ou amender PGM-CON-COL-002 V0.1/i)).toBeInTheDocument();
  });

  test('keeps English results candidate-only', () => {
    render(<InstitutionalProgramDesignEvidenceSearchResults language="EN" />);

    expect(screen.getByText('Grouped results of the bounded internal search')).toBeInTheDocument();
    expect(screen.getByText(/No content was opened or read/i)).toBeInTheDocument();
    expect(screen.getByText(/neither 507 unique records/i)).toBeInTheDocument();
  });

  test('renders German restrictions and next gate', () => {
    render(<InstitutionalProgramDesignEvidenceSearchResults language="DE" />);

    expect(screen.getByText('Gebündelte Ergebnisse der begrenzten internen Suche')).toBeInTheDocument();
    expect(screen.getAllByText('STOPP · EINGESCHRÄNKT')).toHaveLength(2);
    expect(screen.getByText(/PGM-CON-COL-002 V0.1 als Kandidatenindex bestätigen/i)).toBeInTheDocument();
  });
});
