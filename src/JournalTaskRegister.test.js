import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import JournalTaskRegister, { STORAGE_KEY } from './JournalTaskRegister';

describe('JournalTaskRegister', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  });

  test('renders the bounded local pilot and journal candidates', () => {
    render(<JournalTaskRegister language="FR" />);

    expect(screen.getByRole('heading', { name: 'Candidats issus du journal de bord' })).toBeInTheDocument();
    expect(screen.getAllByText('Valider le micro-correctif P2 des bordures en mode clair')).toHaveLength(2);
    expect(screen.getAllByText('Validation requise').length).toBeGreaterThan(0);
    expect(screen.getByText('Stockage local au navigateur')).toBeInTheDocument();
  });

  test('requires an explicit deadline before human validation', () => {
    render(<JournalTaskRegister language="FR" />);

    fireEvent.click(screen.getByRole('button', { name: 'Nouvelle tâche candidate' }));
    fireEvent.change(screen.getByPlaceholderText('Action concrète et vérifiable'), { target: { value: 'Préparer la revue mensuelle' } });
    fireEvent.change(screen.getByPlaceholderText(/Journal de bord du 04-08-2026/i), { target: { value: 'Journal du 04-08-2026' } });
    fireEvent.change(screen.getByPlaceholderText('Personne ou fonction responsable'), { target: { value: 'Cheikh' } });
    fireEvent.change(screen.getByLabelText('Validation humaine'), { target: { value: 'validated' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));

    expect(window.alert).toHaveBeenCalledWith('Une échéance explicite est requise avant de valider cette tâche.');
    expect(window.confirm).not.toHaveBeenCalled();
  });

  test('saves a validated candidate locally and marks it ready for Agenda', () => {
    render(<JournalTaskRegister language="FR" />);

    fireEvent.click(screen.getByRole('button', { name: 'Nouvelle tâche candidate' }));
    fireEvent.change(screen.getByPlaceholderText('Action concrète et vérifiable'), { target: { value: 'Préparer la revue mensuelle' } });
    fireEvent.change(screen.getByPlaceholderText(/Journal de bord du 04-08-2026/i), { target: { value: 'Journal du 04-08-2026' } });
    fireEvent.change(screen.getByPlaceholderText('Personne ou fonction responsable'), { target: { value: 'Cheikh' } });
    fireEvent.change(screen.getByLabelText('Échéance'), { target: { value: '2026-08-10' } });
    fireEvent.change(screen.getByLabelText('Validation humaine'), { target: { value: 'validated' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.getAllByText('Préparer la revue mensuelle').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Prêt à proposer').length).toBeGreaterThan(0);
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toEqual(expect.arrayContaining([
      expect.objectContaining({ owner: 'Cheikh', deadline: '2026-08-10', validationStatus: 'validated' })
    ]));
  });

  test('renders the governed pilot in German', () => {
    render(<JournalTaskRegister language="DE" />);

    expect(screen.getByRole('heading', { name: 'Kandidaten aus dem Arbeitsjournal' })).toBeInTheDocument();
    expect(screen.getAllByText('P2-Mikrokorrektur der Rahmen im hellen Modus freigeben')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Neuer Aufgabenkandidat' })).toBeInTheDocument();
  });
});
