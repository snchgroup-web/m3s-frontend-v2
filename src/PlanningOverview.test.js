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
});

test('renders the planner model in German', () => {
  render(<PlanningOverview language="DE" tasksTotal={0} completedTasks={0} />);

  expect(screen.getByRole('heading', { name: 'Planung & Projektmanagement' })).toBeInTheDocument();
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
