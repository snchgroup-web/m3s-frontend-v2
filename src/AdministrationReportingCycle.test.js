import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AdministrationReportingCycle from './AdministrationReportingCycle';

test('frames the French reporting cycle and identifies the provisional pilot review', () => {
  render(<AdministrationReportingCycle language="FR" />);

  expect(screen.getByRole('heading', { name: 'Cycle gouverné des rapports d’activité' })).toBeInTheDocument();
  expect(screen.getByText('Journal quotidien')).toBeInTheDocument();
  expect(screen.getByText('Revue hebdomadaire')).toBeInTheDocument();
  expect(screen.getByText('Rapport mensuel')).toBeInTheDocument();
  expect(screen.getByText('Rapport d’activité')).toBeInTheDocument();
  expect(screen.getByText(/REVUE PILOTE DISPONIBLE/)).toBeInTheDocument();
  expect(screen.getByText(/ne devient une source institutionnelle qu’après validation/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Revue hebdomadaire du 10 au 15 août 2026' })).toBeInTheDocument();
  expect(screen.getByText('3 journaux disponibles · 3 journées sans journal')).toBeInTheDocument();
  expect(screen.getByText(/n’est pas assimilée à une absence de travail/i)).toBeInTheDocument();
  expect(screen.queryByText('M3S_JOURNAL_DE_BORD_2026-08-10.md')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Afficher les journaux sources/i }));
  expect(screen.getByText('M3S_JOURNAL_DE_BORD_2026-08-10.md')).toBeInTheDocument();
});

test('renders the German responsibilities and documentary caution', () => {
  render(<AdministrationReportingCycle language="DE" />);

  expect(screen.getByRole('heading', { name: 'Gesteuerter Tätigkeitsberichtszyklus' })).toBeInTheDocument();
  expect(screen.getByText('Wer macht was?')).toBeInTheDocument();
  expect(screen.getByText(/Keine Kennzahl, keinen Fortschrittsgrad/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Wochenrückblick vom 10. bis 15. August 2026' })).toBeInTheDocument();
  expect(screen.getByText(/bleibt eine Arbeitsübersicht/i)).toBeInTheDocument();
});
