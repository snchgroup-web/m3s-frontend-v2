import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceSearchPlan from './InstitutionalProgramDesignEvidenceSearchPlan';

describe('InstitutionalProgramDesignEvidenceSearchPlan', () => {
  test('prepares six bounded scopes without launching search', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-search-scope')).toHaveLength(6);
    expect(screen.getAllByText('CONFIRMÉ · NON LANCÉ')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-006 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/zéro recherche lancée/i)).toBeInTheDocument();
    expect(screen.getByText(/aucune recherche ni ouverture de pièce n’est permise/i)).toBeInTheDocument();
  });

  test('keeps the English plan non-executing', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="EN" />);

    expect(screen.getAllByText('CONFIRMED · NOT STARTED')).toHaveLength(6);
    expect(screen.getByText(/authorises no search/i)).toBeInTheDocument();
    expect(screen.getByText(/no search or record opening is permitted/i)).toBeInTheDocument();
  });

  test('renders the German stop rules', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="DE" />);

    expect(screen.getByText('Dokumentensuche vor jeder Ausführung begrenzen')).toBeInTheDocument();
    expect(screen.getAllByText('BESTÄTIGT · NICHT GESTARTET')).toHaveLength(6);
    expect(screen.getByText(/weder Suche noch Unterlagenöffnung zulässig/i)).toBeInTheDocument();
  });
});
