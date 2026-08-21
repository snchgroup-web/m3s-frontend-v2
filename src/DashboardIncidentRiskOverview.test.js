import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DashboardIncidentRiskOverview from './DashboardIncidentRiskOverview';

test('shows sourced Villa LR1 cases without publishing a global incident total', () => {
  render(<DashboardIncidentRiskOverview language="FR" onNavigate={jest.fn()} />);

  expect(screen.getByRole('heading', { name: 'Incidents & Risques' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Avants de fenêtres' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Mini-forage · alimentation en eau' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Dossier juridique Villa LR1' })).toBeInTheDocument();
  expect(screen.getByText('Cas de référence affichés · aucun total global publié')).toBeInTheDocument();
  expect(screen.queryByText(/A\. Kane|M\. Kane/i)).not.toBeInTheDocument();
});

test('keeps the legal file protected and routes users to the governed source', () => {
  const onNavigate = jest.fn();
  render(<DashboardIncidentRiskOverview language="FR" onNavigate={onNavigate} />);

  expect(screen.getByText('Dossier signalé · détails protégés')).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: 'Ouvrir le dossier source' })[2]);
  expect(onNavigate).toHaveBeenCalledWith('/administration?tab=compliance&returnTo=dashboard&dashboardView=incidents#compliance-register');
});

test.each([
  ['EN', 'Incidents & Risks', 'Villa LR1 legal file'],
  ['DE', 'Vorfälle & Risiken', 'Rechtsakte Villa LR1']
])('renders the protected cross-functional view in %s', (language, title, legalTitle) => {
  render(<DashboardIncidentRiskOverview language={language} onNavigate={jest.fn()} />);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: legalTitle })).toBeInTheDocument();
});
