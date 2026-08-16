import React from 'react';
import { render, screen } from '@testing-library/react';
import FinanceFunctionFrame from './FinanceFunctionFrame';

test('frames Finance with real sources, responsibilities and prudent boundaries', () => {
  const { container, rerender } = render(<FinanceFunctionFrame language="FR" />);

  expect(container.firstChild).toHaveClass('m3s-design-scope');
  expect(screen.getByRole('heading', { name: '2SG - Finances et pilotage des ressources' })).toBeInTheDocument();
  expect(screen.getByText(/Tracer les ressources, les engagements et les preuves financières/)).toBeInTheDocument();
  expect(screen.getByText(/finance\/dashboard fournit les agrégats globaux/)).toBeInTheDocument();
  expect(screen.getByText(/Un zéro réel reste zéro/)).toBeInTheDocument();
  expect(screen.getByText(/taux réellement appliqué/)).toBeInTheDocument();
  expect(screen.getByText(/ne remplace ni la comptabilité certifiée/)).toBeInTheDocument();

  rerender(<FinanceFunctionFrame language="DE" />);
  expect(screen.getByRole('heading', { name: '2SG - Finanzen und Ressourcensteuerung' })).toBeInTheDocument();
  expect(screen.getByText(/ersetzt weder zertifizierte Buchhaltung/)).toBeInTheDocument();
});
