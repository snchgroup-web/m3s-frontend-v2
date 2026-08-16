import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceSourceStandardMapping from './FinanceSourceStandardMapping';

test('maps observed Finance fields without authorizing migration', () => {
  render(<FinanceSourceStandardMapping language="FR" />);

  expect(screen.getByRole('heading', { name: 'Cartographie source/API vers le standard M3S' })).toBeInTheDocument();
  expect(screen.getByText('taux_fx | taux | fx_rate')).toBeInTheDocument();
  expect(screen.getByText('taux_applique')).toBeInTheDocument();
  expect(screen.getByText(/pas un schéma de production/i)).toBeInTheDocument();
  expect(screen.queryByText(/Ria|590|540|404 740|370 278/i)).not.toBeInTheDocument();
});

test('classifies missing referentials and hides individual values', () => {
  render(<FinanceSourceStandardMapping language="FR" />);

  expect(screen.getAllByText('Relation manquante')).toHaveLength(4);
  expect(screen.getByText('Champs bénéficiaires ou de répartition individuelle')).toBeInTheDocument();
  expect(screen.getByText(/Valeurs masquées dans cette vue/)).toBeInTheDocument();
  expect(screen.queryByText(/Cheikh|Ria|590|540|404 740|370 278/i)).not.toBeInTheDocument();
  expect(screen.getByLabelText('Relation manquante: 2').parentElement.parentElement).toHaveStyle({ color: 'var(--m3s-status-warning)' });
});

test('shows the read-only backend audit without exposing business data', () => {
  render(<FinanceSourceStandardMapping language="FR" />);

  expect(screen.getByRole('heading', { name: 'Audit des contrats backend' })).toBeInTheDocument();
  expect(screen.getByText(/réponse 401/)).toBeInTheDocument();
  expect(screen.getByText(/taux de référence et le taux appliqué depuis une même valeur/)).toBeInTheDocument();
  expect(screen.getByText(/aucun contrôle d’accès propre à la fonction Finance/)).toBeInTheDocument();
  expect(screen.getByText(/Aucune donnée métier n’a été lue/)).toBeInTheDocument();
  expect(screen.queryByText(/part_cheikh|remboursement_cheikh|Ria|590|540/i)).not.toBeInTheDocument();
});

test('renders the mapping governance in English and German', () => {
  const { rerender } = render(<FinanceSourceStandardMapping language="EN" />);

  expect(screen.getByRole('heading', { name: 'Source/API to M3S standard mapping' })).toBeInTheDocument();
  expect(screen.getAllByText('Missing relationship')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Backend contract audit' })).toBeInTheDocument();

  rerender(<FinanceSourceStandardMapping language="DE" />);
  expect(screen.getByRole('heading', { name: 'Zuordnung von Quelle/API zum M3S-Standard' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Prüfung der Backend-Verträge' })).toBeInTheDocument();
  expect(screen.getByText('Governance der Zuordnung')).toBeInTheDocument();
});
