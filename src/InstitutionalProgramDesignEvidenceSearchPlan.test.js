import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceSearchPlan from './InstitutionalProgramDesignEvidenceSearchPlan';

describe('InstitutionalProgramDesignEvidenceSearchPlan', () => {
  test('prepares six bounded scopes without launching search', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-search-scope')).toHaveLength(6);
    expect(screen.getAllByText('PLANIFIÉ · NON LANCÉ')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-005 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText(/zéro recherche lancée/i)).toBeInTheDocument();
    expect(screen.getByText(/n’autorisera toujours pas/i)).toBeInTheDocument();
  });

  test('keeps the English plan non-executing', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="EN" />);

    expect(screen.getAllByText('PLANNED · NOT STARTED')).toHaveLength(6);
    expect(screen.getByText(/authorises no search/i)).toBeInTheDocument();
    expect(screen.getByText(/will still not authorise starting the search/i)).toBeInTheDocument();
  });

  test('renders the German stop rules', () => {
    render(<InstitutionalProgramDesignEvidenceSearchPlan language="DE" />);

    expect(screen.getByText('Dokumentensuche vorbereiten, ohne sie bereits auszuführen')).toBeInTheDocument();
    expect(screen.getAllByText('GEPLANT · NICHT GESTARTET')).toHaveLength(6);
    expect(screen.getByText(/keinen Suchstart/i)).toBeInTheDocument();
  });
});
