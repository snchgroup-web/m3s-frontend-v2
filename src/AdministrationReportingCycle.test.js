import React from 'react';
import { render, screen } from '@testing-library/react';
import AdministrationReportingCycle from './AdministrationReportingCycle';

test('frames the French reporting cycle without generating reports or figures', () => {
  render(<AdministrationReportingCycle language="FR" />);

  expect(screen.getByRole('heading', { name: 'Cycle gouverné des rapports d’activité' })).toBeInTheDocument();
  expect(screen.getByText('Journal quotidien')).toBeInTheDocument();
  expect(screen.getByText('Revue hebdomadaire')).toBeInTheDocument();
  expect(screen.getByText('Rapport mensuel')).toBeInTheDocument();
  expect(screen.getByText('Rapport d’activité')).toBeInTheDocument();
  expect(screen.getByText(/AUCUN RAPPORT GÉNÉRÉ/)).toBeInTheDocument();
  expect(screen.getByText(/ne devient une source institutionnelle qu’après validation/i)).toBeInTheDocument();
});

test('renders the German responsibilities and documentary caution', () => {
  render(<AdministrationReportingCycle language="DE" />);

  expect(screen.getByRole('heading', { name: 'Gesteuerter Tätigkeitsberichtszyklus' })).toBeInTheDocument();
  expect(screen.getByText('Wer macht was?')).toBeInTheDocument();
  expect(screen.getByText(/Keine Kennzahl, keinen Fortschrittsgrad/i)).toBeInTheDocument();
  expect(screen.getByText(/bleiben ein Zielmodell/i)).toBeInTheDocument();
});
