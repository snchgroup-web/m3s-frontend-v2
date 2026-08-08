import { fireEvent, render, screen, within } from '@testing-library/react';
import AdministrationDashboardOverview from './AdministrationDashboardOverview';

test('distinguishes a confirmed zero from an unavailable task source', () => {
  const { rerender } = render(
    <AdministrationDashboardOverview language="FR" tasksTotal={0} tasksStatus="ready" completedTasks={0} />
  );

  expect(screen.getAllByText('0')).toHaveLength(2);
  expect(screen.getAllByText('Zéro confirmé par la source')).toHaveLength(2);

  rerender(<AdministrationDashboardOverview language="FR" tasksTotal={null} tasksStatus="unavailable" completedTasks={null} />);

  expect(screen.getAllByText('—')).toHaveLength(2);
  expect(screen.getAllByText('Source indisponible').length).toBeGreaterThanOrEqual(2);
});

test('shows the seven governed Administration components and opens the selected one', () => {
  const onNavigate = jest.fn();
  render(
    <AdministrationDashboardOverview
      language="EN"
      tasksTotal={654}
      tasksStatus="ready"
      completedTasks={566}
      onNavigate={onNavigate}
    />
  );

  expect(screen.getByRole('heading', { name: 'Administration local dashboard' })).toBeInTheDocument();
  const trackedTasksMetric = screen.getByText('Tracked tasks').closest('article');
  const completedTasksMetric = screen.getByText('Completed tasks').closest('article');
  expect(within(trackedTasksMetric).getByText('654')).toBeInTheDocument();
  expect(within(completedTasksMetric).getByText('566')).toBeInTheDocument();
  const componentsMetric = screen.getByText('Structured components').closest('article');
  expect(within(componentsMetric).getByText('7')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Processes & Procedures' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Architecture & Relationships' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 4 }).map(heading => heading.textContent)).toEqual([
    'Institution',
    'Architecture & Relationships',
    'Processes & Procedures',
    'Compliance',
    'Planning & Projects',
    'Communication & Correspondence',
    'Glossary'
  ]);

  const openButtons = screen.getAllByRole('button', { name: /Open/ });
  expect(openButtons).toHaveLength(7);
  fireEvent.click(openButtons[2]);
  expect(onNavigate).toHaveBeenCalledWith('processes');
});

test('renders the German operational wording', () => {
  render(<AdministrationDashboardOverview language="DE" tasksTotal={null} tasksStatus="loading" completedTasks={null} />);

  expect(screen.getByRole('heading', { name: 'Lokales Verwaltungsdashboard' })).toBeInTheDocument();
  expect(screen.getAllByText('Quelle wird geladen')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'Prozesse & Verfahren' })).toBeInTheDocument();
});
