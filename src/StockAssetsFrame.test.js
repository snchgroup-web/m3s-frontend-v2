import React from 'react';
import { render, screen } from '@testing-library/react';
import StockAssetsFrame from './StockAssetsFrame';

test('presents the Stock & Assets business frame without overstating its scope', () => {
  const { container, rerender } = render(<StockAssetsFrame language="FR" />);

  expect(container.firstChild).toHaveClass('m3s-design-scope');
  expect(screen.getByRole('heading', { name: 'Savoir ce que 2SG possède, où cela se trouve et quel contrôle appliquer' })).toBeInTheDocument();
  expect(screen.getByText(/stocks_actifs_propres/)).toBeInTheDocument();
  expect(screen.getByText(/ne remplace ni la comptabilité/)).toBeInTheDocument();
  expect(screen.getByText(/Les données existantes restent la source opérationnelle/)).toBeInTheDocument();

  rerender(<StockAssetsFrame language="DE" />);
  expect(screen.getByRole('heading', { name: 'Erkennen, was 2SG besitzt, wo es sich befindet und welche Kontrolle gilt' })).toBeInTheDocument();
  expect(screen.getByText(/ersetzt weder Buchhaltung noch Rechtstitel/)).toBeInTheDocument();
});
