import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InstitutionalProgramDesignEvidenceDecisionPackage from './InstitutionalProgramDesignEvidenceDecisionPackage';
import InstitutionalProgramFastTrackCockpit from './InstitutionalProgramFastTrackCockpit';

describe('InstitutionalProgramDesignEvidenceDecisionPackage', () => {
  beforeEach(() => window.history.replaceState(null, '', '/?view=program'));
  afterEach(() => window.history.replaceState(null, '', '/'));

  test('records eight pronounced decisions without accepting achievement evidence', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="FR" />);

    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(8);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-limited')).toHaveLength(3);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-defer')).toHaveLength(5);
    expect(screen.getAllByText('PRONONCÉE')).toHaveLength(8);
    expect(screen.getByText('8/8')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PGM-DEC-017 · V1.0' })).toBeInTheDocument();
    expect(screen.getByText('PGM-DEC-016 · V1.0')).toBeInTheDocument();
    expect(screen.getByText('Paquet de propositions confirmé')).toBeInTheDocument();
    expect(screen.getByText(/alors je confirme PGM-CON-DEC-001 V0.1/)).toBeInTheDocument();
    expect(screen.queryByText('Prochaine confirmation groupée')).not.toBeInTheDocument();
    expect(screen.getByText(/aucune nouvelle confirmation de ce lot/i)).toBeInTheDocument();
    expect(screen.getByText(/aucun accès ou collecte supplémentaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Je prononce les décisions de PGM-CON-DEC-001 V1.0/)).toBeInTheDocument();
    expect(screen.getByText(/Une admission documentaire limitée ne prouve pas/i)).toBeInTheDocument();
  });

  test('preserves the English documentary boundary', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="EN" />);

    expect(screen.getByText('Eight decisions pronounced, zero achievement evidence accepted')).toBeInTheDocument();
    expect(screen.getAllByText('PRONOUNCED')).toHaveLength(8);
    expect(screen.getByText('Proposal package confirmed')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 documentary decisions pronounced, zero evidence accepted/)).toBeInTheDocument();
    expect(screen.getByText(/Limited documentary admission does not prove institutional achievement/i)).toBeInTheDocument();
  });

  test('renders the German individual proposals without accepting evidence', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage language="DE" />);

    expect(screen.getByText('Acht Entscheide ausgesprochen, null Umsetzungsnachweise angenommen')).toBeInTheDocument();
    expect(screen.getAllByText('AUSGESPROCHEN')).toHaveLength(8);
    expect(screen.getByText('Vorschlagspaket bestätigt')).toBeInTheDocument();
    expect(screen.getByText(/0\/8 Dokumentenentscheide ausgesprochen, null Nachweise angenommen/)).toBeInTheDocument();
  });

  test('preserves each authorised outcome and its source identifier', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage />);
    const rows = screen.getAllByTestId('institutional-program-design-evidence-decision-row');
    const limited = ['SRC-02', 'SRC-04', 'SRC-07'];
    rows.forEach((row, index) => {
      const id = `SRC-${String(index + 1).padStart(2, '0')}`;
      expect(row).toHaveTextContent(id);
      expect(row).toHaveTextContent(limited.includes(id) ? 'ADMISSION LIMITÉE' : 'AJOURNER');
      expect(row).toHaveTextContent('PRONONCÉE');
    });
  });

  test('filters the five deferrals without changing global decisions', () => {
    render(<InstitutionalProgramDesignEvidenceDecisionPackage />);
    fireEvent.click(screen.getByRole('button', { name: 'En attente (5)' }));
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(5);
    expect(screen.queryAllByTestId('institutional-program-design-evidence-decision-limited')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('5 références affichées sur 8');
    expect(screen.getByRole('button', { name: 'En attente (5)' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('8/8')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(window.location.search).toBe('?view=program&decisionFilter=deferred');
    expect(window.location.hash).toBe('#institutional-program-design-evidence-decision-package');
    fireEvent.click(screen.getByRole('button', { name: 'Usages limités (3)' }));
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Toutes (8)' }));
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(8);
    expect(window.location.search).toBe('?view=program');
  });

  test('deep link and language changes keep the selected subset and return route', () => {
    window.history.replaceState({ key: 'route' }, '', '/?view=program&decisionFilter=deferred&returnTo=ref01-fasttrack');
    const view = render(<InstitutionalProgramDesignEvidenceDecisionPackage language="FR" />);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(5);
    view.rerender(<InstitutionalProgramDesignEvidenceDecisionPackage language="EN" />);
    expect(screen.getByRole('button', { name: 'Waiting (5)' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('link', { name: 'Back to global cockpit' })).toHaveAttribute('href', '/?view=program#institutional-fast-track-cockpit');
    view.rerender(<InstitutionalProgramDesignEvidenceDecisionPackage language="DE" />);
    expect(screen.getByRole('button', { name: 'Wartend (5)' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Begrenzte Nutzung (3)' }));
    expect(window.history.state).toEqual({ key: 'route' });
    expect(new URLSearchParams(window.location.search).get('returnTo')).toBe('ref01-fasttrack');
  });

  test('invalid filter falls back to all; browser navigation synchronises the subset', () => {
    window.history.replaceState(null, '', '/?view=program&decisionFilter=__proto__');
    render(<InstitutionalProgramDesignEvidenceDecisionPackage />);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(8);
    window.history.replaceState(null, '', '/?view=program&decisionFilter=limited');
    fireEvent.popState(window);
    expect(screen.getAllByTestId('institutional-program-design-evidence-decision-row')).toHaveLength(3);
  });

  test.each([
    ['FR', 'Suivre les 5 références en attente'],
    ['EN', 'Follow the 5 waiting references'],
    ['DE', 'Die 5 wartenden Referenzen verfolgen'],
  ])('cockpit links directly to the five waiting references in %s', (language, label) => {
    render(<InstitutionalProgramFastTrackCockpit language={language} />);
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', '/?view=program&decisionFilter=deferred#institutional-program-design-evidence-decision-package');
  });
});
