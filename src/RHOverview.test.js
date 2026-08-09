import React from 'react';
import { render, screen } from '@testing-library/react';
import RHOverview from './RHOverview';

test('keeps a real zero distinct from an unavailable RH source', () => {
  const { rerender } = render(<RHOverview language="FR" directoryCount={0} directoryStatus="available" />);

  expect(screen.getByText('0 membre confirmé par la source')).toBeInTheDocument();
  expect(screen.getByText(/aucune valeur de démonstration/i)).toBeInTheDocument();
  expect(screen.getByText(/graphiques mensuels fictifs ont été retirés/i)).toBeInTheDocument();

  rerender(<RHOverview language="FR" directoryCount={null} directoryStatus="unavailable" />);
  expect(screen.getByText('Source indisponible')).toBeInTheDocument();
  expect(screen.queryByText('0 membre confirmé par la source')).not.toBeInTheDocument();
});

test('renders the German source-governance frame', () => {
  render(<RHOverview language="DE" directoryCount={3} directoryStatus="available" employeeDraftCount={1} />);

  expect(screen.getByRole('heading', { name: /Erkennen, wer zu 2SG beiträgt/i })).toBeInTheDocument();
  expect(screen.getByText('3 Mitglieder durch die Quelle bestätigt')).toBeInTheDocument();
  expect(screen.getByText(/nicht persistente Eingabe/i)).toBeInTheDocument();
});
