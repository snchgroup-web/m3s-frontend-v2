import { fireEvent, render, screen, within } from '@testing-library/react';
import AdministrationDashboardOverview from './AdministrationDashboardOverview';

test('distinguishes a confirmed zero from an unavailable task source', () => {
  const { rerender } = render(
    <AdministrationDashboardOverview language="FR" tasksTotal={0} tasksStatus="ready" openTasks={0} completedTasks={0} />
  );

  expect(screen.getAllByText('0')).toHaveLength(2);
  expect(screen.getByText('Ouvertes : 0')).toBeInTheDocument();
  expect(screen.getAllByText('Zéro confirmé par la source')).toHaveLength(2);

  rerender(<AdministrationDashboardOverview language="FR" tasksTotal={null} tasksStatus="unavailable" completedTasks={null} />);

  expect(screen.getAllByText('—')).toHaveLength(3);
  expect(screen.getAllByText('Source indisponible').length).toBeGreaterThanOrEqual(2);
});

test('shows the nine governed Administration components and opens the selected one', () => {
  const onNavigate = jest.fn();
  render(
    <AdministrationDashboardOverview
      language="EN"
      tasksTotal={654}
      tasksStatus="ready"
      openTasks={88}
      completedTasks={566}
      onNavigate={onNavigate}
    />
  );

  expect(screen.getByRole('heading', { name: 'Administration local dashboard' })).toBeInTheDocument();
  const trackedTasksMetric = screen.getByText('Tracked tasks').closest('button');
  const completedTasksMetric = screen.getByText('Completed tasks').closest('button');
  expect(within(trackedTasksMetric).getByText('654')).toBeInTheDocument();
  expect(within(trackedTasksMetric).getByText('Open : 88')).toBeInTheDocument();
  expect(within(completedTasksMetric).getByText('566')).toBeInTheDocument();
  const componentsMetric = screen.getByText('Structured components').closest('button');
  expect(within(componentsMetric).getByText('9')).toBeInTheDocument();
  const complianceMetric = screen.getByText('LEGAL documentary progress').closest('button');
  expect(within(complianceMetric).getByText('—')).toBeInTheDocument();
  expect(within(complianceMetric).getByText('Details loaded after authorisation')).toBeInTheDocument();
  expect(within(complianceMetric).getByText('Controlled access')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Processes & Procedures' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Architecture & Relationships' })).toBeInTheDocument();
  const functionalCoverage = screen.getByRole('region', { name: 'Functional coverage' });
  expect(within(functionalCoverage).getAllByRole('heading', { level: 4 }).map(heading => heading.textContent)).toEqual([
    'Institution',
    'Architecture & Relationships',
    'Processes & Procedures',
    'Compliance',
    'Planning & Projects',
    'Communication & Correspondence',
    'Resources',
    'Administrative assistant',
    'Glossary'
  ]);

  fireEvent.click(screen.getByRole('button', { name: 'Open Tracked tasks' }));
  expect(onNavigate).toHaveBeenCalledWith('planning');

  const openButtons = screen.getAllByRole('button', { name: 'Open' });
  expect(openButtons).toHaveLength(9);
  fireEvent.click(openButtons[2]);
  expect(onNavigate).toHaveBeenCalledWith('processes');
});

test('does not fabricate an open count when an older task summary omits it', () => {
  render(
    <AdministrationDashboardOverview
      language="EN"
      tasksTotal={654}
      tasksStatus="ready"
      openTasks={null}
      completedTasks={566}
    />
  );

  const trackedTasksMetric = screen.getByText('Tracked tasks').closest('button');
  expect(within(trackedTasksMetric).getByText('654')).toBeInTheDocument();
  expect(within(trackedTasksMetric).queryByText(/^Open/)).not.toBeInTheDocument();
});

test('renders the German operational wording', () => {
  render(<AdministrationDashboardOverview language="DE" tasksTotal={null} tasksStatus="loading" completedTasks={null} />);

  expect(screen.getByRole('heading', { name: 'Lokales Verwaltungsdashboard' })).toBeInTheDocument();
  expect(screen.getAllByText('Quelle wird geladen')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'Prozesse & Verfahren' })).toBeInTheDocument();
});
