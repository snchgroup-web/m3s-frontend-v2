import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PlanningOverview from './PlanningOverview';

test('renders the project hierarchy and recurring activity branch in French', () => {
  render(<PlanningOverview language="FR" tasksTotal={8} completedTasks={2} />);

  expect(screen.getByRole('heading', { name: 'Planification & Gestion de projets' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Branche projet' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Branche activité récurrente' })).toBeInTheDocument();
  expect(screen.getByText(/Une phase appartient toujours à un projet/i)).toBeInTheDocument();
  expect(screen.getByText('25 %')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Navigation dans Planification & Projets' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contrôle minimal d’un projet' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Contrôle minimal' })).toBeInTheDocument();
});

test('connects strategic steering to validated glossary definitions', () => {
  render(<PlanningOverview language="FR" tasksTotal={8} completedTasks={2} />);

  expect(screen.getByRole('heading', { name: "De la cible à l'exécution" })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Pilotage' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Blueprint institutionnel' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Feuille de route' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: "Plan d'action" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Feuille de route' }));
  expect(screen.getByRole('dialog', { name: 'Feuille de route' })).toBeInTheDocument();
  expect(screen.getByText('Définition validée')).toBeInTheDocument();
  expect(screen.getByText('STRAT-FEUILLE-ROUTE')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Voir dans le Glossaire' })).toHaveAttribute(
    'href',
    '/ged?tab=knowledge&term=STRAT-FEUILLE-ROUTE'
  );
});

test('connects the milestone dimension to a validated glossary definition', () => {
  render(<PlanningOverview language="FR" tasksTotal={8} completedTasks={2} />);

  fireEvent.click(screen.getByRole('button', { name: 'Définition du Glossaire : Jalon' }));

  expect(screen.getByRole('dialog', { name: 'Jalon' })).toBeInTheDocument();
  expect(screen.getByText('Définition validée')).toBeInTheDocument();
  expect(screen.getByText('PROJ-JALON')).toBeInTheDocument();
});

test('renders the planner model in German', () => {
  render(<PlanningOverview language="DE" tasksTotal={0} completedTasks={0} />);

  expect(screen.getByRole('heading', { name: 'Planung & Projektmanagement' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vom Zielbild zur Umsetzung' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Institutioneller Blueprint' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Maßnahmenplan' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Übergreifende Dimensionen des Planers' })).toBeInTheDocument();
  expect(screen.getByText(/Eine Phase gehört immer zu einem Projekt/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nach oben' })).toBeInTheDocument();
});

test('uses the planner internal navigation', () => {
  const scrollIntoView = jest.fn();
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  render(<PlanningOverview language="EN" tasksTotal={2} completedTasks={1} />);
  fireEvent.click(screen.getByRole('button', { name: 'Dimensions' }));

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
});

test('connects the validated journal layer before the historical register', () => {
  render(
    <PlanningOverview language="FR" tasksTotal={2} completedTasks={1}>
      <section id="planning-journal-register">Registre pilote du journal</section>
    </PlanningOverview>
  );

  expect(screen.getByRole('button', { name: 'Journal validé' })).toBeInTheDocument();
  expect(screen.getByText('Registre pilote du journal')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Registre des tâches et actions' })).toBeInTheDocument();
});
