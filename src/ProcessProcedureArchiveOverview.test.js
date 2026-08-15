import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProcessProcedureArchiveOverview from './ProcessProcedureArchiveOverview';

test('renders the cautious French process, procedure and archive model', () => {
  render(<ProcessProcedureArchiveOverview language="FR" />);

  expect(screen.getByRole('heading', { name: 'Du fonctionnement attendu à la preuve conservée' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Navigation dans Processus, Procédures et Archives' })).toBeInTheDocument();
  expect(screen.getByText('Aucun registre officiel')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vocabulaire de travail commun' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Structure cible du manuel de procédures' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Modèle de registre des dossiers et archives' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cycle gouverné des rapports d’activité' })).toBeInTheDocument();
  expect(screen.getByText('CYCLE CADRÉ · REVUE PILOTE DISPONIBLE')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Revue hebdomadaire du 10 au 15 août 2026' })).toBeInTheDocument();
  expect(screen.getByText(/ne représentent ni dossiers ouverts ni statuts officiels/i)).toBeInTheDocument();
});

test('renders the German functional boundaries', () => {
  render(<ProcessProcedureArchiveOverview language="DE" />);

  expect(screen.getByRole('heading', { name: 'Vom erwarteten Ablauf zum aufbewahrten Nachweis' })).toBeInTheDocument();
  expect(screen.getByText('Kein offizielles Register')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nach oben' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Funktionale Abgrenzung' })).toBeInTheDocument();
  expect(screen.getByText(/ersetzt weder die Fachverantwortung noch Governance/i)).toBeInTheDocument();
});

test('preserves the selected section when the language changes', () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  const { rerender } = render(<ProcessProcedureArchiveOverview language="EN" />);
  fireEvent.click(screen.getByRole('button', { name: 'Reports' }));
  rerender(<ProcessProcedureArchiveOverview language="DE" />);

  expect(scrollIntoView).toHaveBeenNthCalledWith(1, { behavior: 'smooth', block: 'start' });
  expect(scrollIntoView).toHaveBeenNthCalledWith(2, { behavior: 'auto', block: 'start' });
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});
