import { emptyTaskFields, TASK_VERSION } from './taskContract';

// Synthetic only: these identifiers are never seeded or imported.
export const testTask = () => ({ ...emptyTaskFields(), reference: 'PLAN-2026-001', title: 'Suivi',
  expected_result: 'Resultat test verifiable', module: 'ADMINISTRATION', assignee_agent_id: 'agent-test',
  team_id: 'team-test', function_id: 'function-test', progression: 27, due_date: '2026-11-12',
  execution_context: { ...emptyTaskFields().execution_context, phase_id: 'phase-test' } });
export const testTaskReferences = () => ({ contract_version: TASK_VERSION, execution_catalogue_ready: true,
  writes_enabled: true, missing: [], sources: { dossiers: { status: 'available', data: [] }, members: { status: 'available', data: [] } },
  choices: {
    phases: [{ id: 'phase-test', label: 'Phase test', project_id: 'project-test', dossier_id: 'dossier-test', portfolio_id: 'portfolio-test' },
      { id: 'phase-other', label: 'Autre phase', project_id: 'project-test', dossier_id: 'dossier-test', portfolio_id: 'portfolio-test' }],
    activities: [{ id: 'activity-test', label: 'Activite test', phase_id: 'phase-test' }],
    operational_plans: [{ id: 'plan-test', label: 'Plan test', function_id: 'function-test', portfolio_id: 'portfolio-test' }],
    assignments: [{ id: 'assignment-test', label: 'Responsable test', assignee_agent_id: 'agent-test', team_id: 'team-test', function_id: 'function-test', module: 'ADMINISTRATION' }],
    recurrences: [{ id: 'recurrence-test', label: 'Modele test', operational_plan_id: 'plan-test', occurrence_keys: ['2026-11', '2026-12'] }]
  } });
