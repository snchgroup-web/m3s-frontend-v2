import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceInventory from './InstitutionalProgramDesignEvidenceInventory';

describe('InstitutionalProgramDesignEvidenceInventory', () => {
  test('prepares one grouped candidate inventory without accepting evidence', () => {
    render(<InstitutionalProgramDesignEvidenceInventory language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-row')).toHaveLength(6);
    expect(screen.getAllByTestId('institutional-program-design-evidence-item')).toHaveLength(18);
    expect(screen.getByRole('heading', { name: 'PGM-DEC-003 · V1.0' })).toBeInTheDocument();
    expect(screen.getAllByText('0', { selector: 'p' })).toHaveLength(2);
    expect(screen.getByText(/zéro preuve acceptée/i)).toBeInTheDocument();
    expect(screen.getByText(/n’autorisera encore ni recherche/i)).toBeInTheDocument();
  });

  test('keeps source locations and owners candidate in English', () => {
    render(<InstitutionalProgramDesignEvidenceInventory language="EN" />);

    expect(screen.getAllByText('Candidate source or location')).toHaveLength(6);
    expect(screen.getAllByText('Candidate owner')).toHaveLength(6);
    expect(screen.getByText(/authorises no external collection/i)).toBeInTheDocument();
  });

  test('renders the bounded German inventory', () => {
    render(<InstitutionalProgramDesignEvidenceInventory language="DE" />);

    expect(screen.getByText('Gebündeltes Inventar der erwarteten Nachweise für Konzeption')).toBeInTheDocument();
    expect(screen.getAllByText('Zu prüfen · nicht angenommen')).toHaveLength(6);
    expect(screen.getByText(/keine Suche, keinen Unterlagenzugriff/i)).toBeInTheDocument();
  });
});
