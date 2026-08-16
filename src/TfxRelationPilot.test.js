import React from 'react';
import { render, screen } from '@testing-library/react';
import TfxRelationPilot from './TfxRelationPilot';

test('separates applied rate, reference rate, fee and evidence without exposing transaction data', () => {
  render(<TfxRelationPilot language="FR" />);

  expect(screen.getByRole('heading', { name: 'Cas pilote relationnel : transfert CHF/CFA' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Taux appliqué' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Taux TFX de référence' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Frais de transfert' })).toBeInTheDocument();
  expect(screen.getByText(/1 transfert → 1 taux appliqué/)).toBeInTheDocument();
  expect(screen.queryByText(/Ria|590|540|404 740|370 278/i)).not.toBeInTheDocument();
});

test('renders the governed allocation model in English', () => {
  render(<TfxRelationPilot language="EN" />);

  expect(screen.getByRole('heading', { name: 'Relational pilot case: CHF/CFA transfer' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Allocation after transfer' })).toBeInTheDocument();
  expect(screen.getByText(/without duplicating the transfer/)).toBeInTheDocument();
});

test('keeps German labels readable and the reference rate independent', () => {
  render(<TfxRelationPilot language="DE" />);

  expect(screen.getByRole('heading', { name: 'Relationaler Pilotfall: CHF/CFA-Transfer' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'TFX-Referenzkurs' })).toBeInTheDocument();
  expect(screen.getByText(/unabhängige Vergleichsreferenz/)).toBeInTheDocument();
});
