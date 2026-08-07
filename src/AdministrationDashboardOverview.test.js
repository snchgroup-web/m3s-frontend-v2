import { fireEvent, render, screen, within } from '@testing-library/react';
import AdministrationDashboardOverview from './AdministrationDashboardOverview';

test('distinguishes a confirmed zero from an unavailable task source', () => {
  const { rerender } = render(
    <AdministrationDashboardOverview language="FR" tasks={[]} tasksStatus="ready" completedTasks={0} />
  );

  expect(screen.getAllByText('0')).toHaveLength(2);
  expect(screen.getAllByText('Zéro confirmé par la source')).toHaveLength(2);

  rerender(<AdministrationDashboardOverview language="FR" tasks={[]} tasksStatus="unavailable" completedTasks={0} />);

  expect(screen.getAllByText('—')).toHaveLength(2);
  expect(screen.getAllByText('Source indisponible').length).toBeGreaterThanOrEqual(2);
});

test('shows the six governed Administration components and opens the selected one', () => {
  const onNavigate = jest.fn();
  render(
    <AdministrationDashboardOverview
      language="EN"
      tasks={[{ id: 1 }, { id: 2 }]}
      tasksStatus="ready"
      completedTasks={1}
      onNavigate={onNavigate}
    />
  );

  expect(screen.getByRole('heading', { name: 'Administration local dashboard' })).toBeInTheDocument();
  const componentsMetric = screen.getByText('Structured components').closest('article');
  expect(within(componentsMetric).getByText('6')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Processes & Procedures' })).toBeInTheDocument();

  const openButtons = screen.getAllByRole('button', { name: /Open/ });
  expect(openButtons).toHaveLength(6);
  fireEvent.click(openButtons[4]);
  expect(onNavigate).toHaveBeenCalledWith('processes');
});

test('renders the German operational wording', () => {
  render(<AdministrationDashboardOverview language="DE" tasks={[]} tasksStatus="loading" completedTasks={0} />);

  expect(screen.getByRole('heading', { name: 'Lokales Verwaltungsdashboard' })).toBeInTheDocument();
  expect(screen.getAllByText('Quelle wird geladen')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'Prozesse & Verfahren' })).toBeInTheDocument();
});
