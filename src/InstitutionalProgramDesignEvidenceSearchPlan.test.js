import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceSearchPlan from './InstitutionalProgramDesignEvidenceSearchPlan';

describe('InstitutionalProgramDesignEvidenceSearchPlan', () => {
  test('records the bounded metadata-only search launch in French', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-search-scope')).toHaveLength(6);
    expect(screen.getAllByText('EXÉCUTÉ · MÉTADONNÉES')).toHaveLength(4);
    expect(screen.getAllByText('STOP · NON PARCOURU')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-006 · V1.0' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-007 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/lancement de la recherche interne bornée/i)).toBeInTheDocument();
    expect(screen.getByText(/zéro pièce ouverte/i)).toBeInTheDocument();
  });

  test('keeps the English launch metadata-only', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="EN" />);

    expect(screen.getAllByText('EXECUTED · METADATA')).toHaveLength(4);
    expect(screen.getAllByText('STOP · NOT TRAVERSED')).toHaveLength(2);
    expect(screen.getByText(/authorises no content opening or reading/i)).toBeInTheDocument();
  });

  test('renders the German stop rules', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="DE" />);

    expect(screen.getByText('Dokumentensuche vor jeder Ausführung begrenzen')).toBeInTheDocument();
    expect(screen.getAllByText('AUSGEFÜHRT · METADATEN')).toHaveLength(4);
    expect(screen.getAllByText('STOPP · NICHT DURCHSUCHT')).toHaveLength(2);
    expect(screen.getByText(/keine Öffnung oder Lektüre von Inhalten/i)).toBeInTheDocument();
  });
});
