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
  expect(screen.getByRole('heading', { name: 'Circuit documentaire proposé' })).toBeInTheDocument();
  expect(screen.getByText('Responsable du processus')).toBeInTheDocument();
  expect(screen.getByText('Validation du fond')).toBeInTheDocument();
  expect(screen.getByText('Décision humaine')).toBeInTheDocument();
  expect(screen.getByText('Classement à créer après approbation')).toBeInTheDocument();
  expect(screen.getByText(/GED\/Administration\/Rapports_activite/)).toBeInTheDocument();
  expect(screen.getByText(/aucun archivage institutionnel n’est déclaré/i)).toBeInTheDocument();
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
  expect(screen.getByRole('heading', { name: 'Vorgeschlagener Dokumentenprozess' })).toBeInTheDocument();
  expect(screen.getByText('Ablage nach Genehmigung anzulegen')).toBeInTheDocument();
  expect(screen.getByText(/keine institutionelle Ablage behauptet/i)).toBeInTheDocument();
});

test('keeps the pilot review provisional after assigning the process owner and DMS reference', () => {
  render(<AdministrationReportingCycle language="FR" />);

  expect(screen.getByText('Synthèse de travail provisoire', { selector: 'dd' })).toBeInTheDocument();
  expect(screen.getByText(/Administration est responsable du processus/i)).toBeInTheDocument();
  expect(screen.getByText(/Elle n’est ni signée, ni adoptée, ni archivée/i)).toBeInTheDocument();
});
