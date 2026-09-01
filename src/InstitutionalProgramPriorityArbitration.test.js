import React from 'react';
import { render, screen } from '@testing-library/react';
import InstitutionalProgramPriorityArbitration from './InstitutionalProgramPriorityArbitration';

describe('InstitutionalProgramPriorityArbitration', () => {
  test('presents one bounded grouped priority without opening REF-02', () => {
    render(<InstitutionalProgramPriorityArbitration language="FR" />);

    expect(screen.getByText('Conception · revue groupée des 6 composantes')).toBeInTheDocument();
    expect(screen.getByText(/Aucun REF-02 n’est ouvert automatiquement/)).toBeInTheDocument();
    expect(screen.getByText(/sans ouvrir leur exécution/)).toBeInTheDocument();
  });

  test('keeps current activity separate from the institutional stages', () => {
    render(<InstitutionalProgramPriorityArbitration language="EN" />);

    expect(screen.getByText('Current activity')).toBeInTheDocument();
    expect(screen.getByText(/without becoming a fifth institutional stage/)).toBeInTheDocument();
  });

  test('provides the German candidate copy', () => {
    render(<InstitutionalProgramPriorityArbitration language="DE" />);

    expect(screen.getByText('Konzeption · gebündelte Prüfung der 6 Komponenten')).toBeInTheDocument();
  });
});
