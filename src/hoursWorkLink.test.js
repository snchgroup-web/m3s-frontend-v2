import { hoursWorkLinkFromTask, validateHoursWorkLink, sameHoursWorkLink, csvHoursCell } from './hoursWorkLink';
import { testTask } from './taskContractFixtures';
const task = () => ({ ...testTask(), id: 'task-test', revision: 2, source_kind: 'operational', can_edit: false, project_id: 'project-test' });

test('project/phase/activity references come from the existing task without fabricated action ids', () => {
  const row = task(), copy = JSON.stringify(row), link = hoursWorkLinkFromTask(row);
  expect(link).toMatchObject({ task_id: row.id, task_revision: 2, project_id: 'project-test', phase_id: 'phase-test', activity_id: null });
  expect(JSON.stringify(row)).toBe(copy);
  const activity = { ...row, execution_context: { ...row.execution_context, activity_id: 'activity-test' } };
  expect(hoursWorkLinkFromTask(activity).activity_id).toBe('activity-test');
  expect(link).not.toHaveProperty('action_id');
});

test('an operational plan is not forced into a made-up project', () => {
  const row = { ...task(), project_id: null, execution_context: { execution_kind: 'operation', phase_id: null, activity_id: null,
    operational_plan_id: 'plan-test', recurrence_id: 'rec-test', occurrence_key: '2026-10' } };
  expect(hoursWorkLinkFromTask(row)).toMatchObject({ project_id: null, operational_plan_id: 'plan-test', recurrence_id: 'rec-test' });
  expect(() => hoursWorkLinkFromTask({ ...row, project_id: 'invented-project' })).toThrow('HOURS_WORK_INVALID');
});

test('incomplete, historical, non-read-only or contradictory rows cannot become selectable links', () => {
  for (const row of [null, { ...task(), source_kind: 'historical' }, { ...task(), can_edit: true },
    { ...task(), project_id: null }, { ...task(), revision: 0 }, { ...task(), title: '' },
    { ...task(), execution_context: { ...task().execution_context, operational_plan_id: 'incompatible' } }]) {
    expect(() => hoursWorkLinkFromTask(row)).toThrow('HOURS_WORK_INVALID');
  }
  const link = hoursWorkLinkFromTask(task());
  expect(() => validateHoursWorkLink({ ...link, extra: 'untrusted' })).toThrow();
  expect(sameHoursWorkLink(link, { ...link })).toBe(true);
  expect(sameHoursWorkLink(link, { ...link, task_revision: 3 })).toBe(false);
  expect(sameHoursWorkLink(undefined, null)).toBe(true);
});

test('spreadsheet exports quote references and neutralise formula-like task text', () => {
  expect(csvHoursCell('19/10/26')).toBe('"19/10/26"');
  expect(csvHoursCell(' task "A"')).toBe('" task ""A"""');
  for (const value of ['=1+1',' +cmd','-1','@formula']) expect(csvHoursCell(value)).toBe(`"'${value}"`);
  expect(csvHoursCell(null)).toBe('""');
});
