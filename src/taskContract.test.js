import { emptyTaskFields, isValidTaskFields, isTaskSelectionValid, validTaskReferences, taskFieldsFromRecord } from './taskContract';
import { testTask, testTaskReferences } from './taskContractFixtures';

test('unknown progress and dates remain null, independently of status', () => {
  expect(emptyTaskFields().progression).toBeNull();
  for (const status of ['to_do', 'done', 'cancelled']) expect(isValidTaskFields({ ...testTask(), progression: null, status })).toBe(true);
  for (const patch of [{ actual_start_date: '2026-12-10', actual_end_date: '2026-12-09' },
    { planned_start_date: '2026-12-10', due_date: '2026-12-09' }, { expected_result: '' }, { responsable: 'free label' },
    { contract_version: 'old' }]) expect(isValidTaskFields({ ...testTask(), ...patch })).toBe(false);
});

test('only governed phase and assignment choices can qualify a project selection', () => {
  const refs = testTaskReferences();
  expect(validTaskReferences(refs)).toBe(true);
  expect(isTaskSelectionValid(testTask(), refs)).toBe(true);
  expect(isTaskSelectionValid({ ...testTask(), assignee_agent_id: 'invented-agent' }, refs)).toBe(false);
  expect(isTaskSelectionValid({ ...testTask(), execution_context: { ...testTask().execution_context, phase_id: 'invented-phase' } }, refs)).toBe(false);
  expect(isTaskSelectionValid({ ...testTask(), execution_context: { ...testTask().execution_context,
    phase_id: 'phase-other', activity_id: 'activity-test' } }, refs)).toBe(false);
});

test('operation requires matching function, plan and qualified occurrence without a project', () => {
  const task = { ...testTask(), execution_context: { execution_kind: 'operation', phase_id: null, activity_id: null,
    operational_plan_id: 'plan-test', recurrence_id: null, occurrence_key: null } };
  const refs = testTaskReferences();
  expect(isValidTaskFields(task)).toBe(true);
  expect(isTaskSelectionValid(task, refs)).toBe(true);
  const recurring = { ...task, execution_context: { ...task.execution_context, recurrence_id: 'recurrence-test', occurrence_key: '2026-11' } };
  expect(isTaskSelectionValid(recurring, refs)).toBe(true);
  expect(isTaskSelectionValid({ ...recurring, execution_context: { ...recurring.execution_context, occurrence_key: '2026-13' } }, refs)).toBe(false);
  expect(isValidTaskFields({ ...task, execution_context: { ...task.execution_context, phase_id: 'phase-test' } })).toBe(false);
});

test('evidence may be plural, but duplicate sources or historical origins cannot recreate work', () => {
  const task = { ...testTask(), source_links: [{ kind: 'ged', reference: 'GED-test' }],
    source_origin: { kind: 'correspondence', reference: 'COR-test' } };
  expect(isValidTaskFields(task)).toBe(true);
  expect(isValidTaskFields({ ...task, source_links: [task.source_links[0], { kind: 'ged', reference: ' GED-test ' }] })).toBe(false);
  expect(isValidTaskFields({ ...task, source_origin: { kind: 'historical_task', reference: 'old-1' } })).toBe(false);
  expect(isValidTaskFields({ ...task, source_links: [{ kind: 'agenda', reference: 'COR-test' }] })).toBe(false);
});

test('catalogue failures, duplicates and malformed parentage cannot advertise writing', () => {
  for (const modify of [r => { r.execution_catalogue_ready = false; }, r => { r.missing = ['project_phases']; },
    r => { r.choices.phases.push(r.choices.phases[0]); }, r => { r.choices.phases[0].project_id = null; },
    r => { r.choices.activities[0].phase_id = 'unknown'; }, r => { r.sources.members.status = 'unknown'; },
    r => { r.choices.assignments[0].team_id = ''; }]) {
    const r = testTaskReferences(); modify(r); expect(validTaskReferences(r)).toBe(false);
  }
  const unavailable = { ...testTaskReferences(), writes_enabled: false, execution_catalogue_ready: false, missing: ['project_phases'] };
  expect(validTaskReferences(unavailable)).toBe(true);
  expect(isTaskSelectionValid(testTask(), unavailable)).toBe(false);
});

test('editing projection excludes server identity metadata and clones nested source arrays', () => {
  const record = { ...testTask(), id: 'server-id', responsable: 'Server display', source_links: [{ kind: 'ged', reference: 'TEST' }] };
  const projected = taskFieldsFromRecord(record);
  expect(projected.id).toBeUndefined(); expect(projected.responsable).toBeUndefined();
  projected.source_links[0].reference = 'other';
  expect(record.source_links[0].reference).toBe('TEST');
  expect(isValidTaskFields(taskFieldsFromRecord({ ...record, source_links: undefined }))).toBe(false);
});

test('a read-only Standardisation catalogue never authorises creation before source qualification', () => {
  const refs = testTaskReferences();
  refs.execution_scope = 'standardisation_project_only';
  refs.execution_catalogue_ready = true;
  refs.writes_enabled = false;
  refs.missing = ['canonical_source_resolution'];
  refs.sources.execution_references = { status: 'available', data: [], read_only: true };
  refs.choices.activities = [];
  refs.choices.operational_plans = [];
  refs.choices.recurrences = [];
  expect(validTaskReferences(refs)).toBe(true);
  expect(isTaskSelectionValid(testTask(), refs)).toBe(false);
  refs.missing = [];
  refs.source_resolution_ready = true;
  refs.activation_enabled = false;
  expect(validTaskReferences(refs)).toBe(true);
  expect(isTaskSelectionValid(testTask(), refs)).toBe(false);
});
