import { isValidTaskFields, taskFieldsFromRecord } from './taskContract';

const VERSION = 'm3s.hours-task-link.v1';
const fields = ['schema', 'task_id', 'task_reference', 'task_title', 'task_revision', 'execution_kind',
  'project_id', 'phase_id', 'activity_id', 'operational_plan_id', 'recurrence_id', 'occurrence_key'];
const text = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
  && !Array.from(v).some(char => char.charCodeAt(0) < 32 || (char.charCodeAt(0) >= 127 && char.charCodeAt(0) <= 159));
const id = v => text(v, 180) && /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/.test(v);
const optional = v => v === null || id(v);
const invalid = () => { throw new Error('HOURS_WORK_INVALID'); };

export function validateHoursWorkLink(work) {
  if (!work || typeof work !== 'object' || Array.isArray(work) || Object.keys(work).length !== fields.length
    || fields.some(k => !Object.hasOwn(work, k)) || work.schema !== VERSION || !id(work.task_id)
    || !text(work.task_reference, 180) || !text(work.task_title, 240)
    || !Number.isSafeInteger(work.task_revision) || work.task_revision < 1
    || !['project_id', 'phase_id', 'activity_id', 'operational_plan_id', 'recurrence_id', 'occurrence_key'].every(k => optional(work[k]))) invalid();
  if (work.execution_kind === 'project') {
    if (!work.project_id || !work.phase_id || work.operational_plan_id || work.recurrence_id || work.occurrence_key) invalid();
  } else if (work.execution_kind === 'operation') {
    if (!work.operational_plan_id || work.project_id || work.phase_id || work.activity_id
      || Boolean(work.recurrence_id) !== Boolean(work.occurrence_key)) invalid();
  } else invalid();
  return Object.fromEntries(fields.map(key => [key, work[key]]));
}

// The API supplies actor-scoped rows; never derive a project from a display name.
export function hoursWorkLinkFromTask(row) {
  if (row?.source_kind !== 'operational' || row.can_edit !== false || !isValidTaskFields(taskFieldsFromRecord(row))) invalid();
  return validateHoursWorkLink({ schema: VERSION, task_id: String(row.id), task_reference: row.reference,
    task_title: row.title, task_revision: row.revision, ...row.execution_context, project_id: row.project_id ?? null });
}

export const sameHoursWorkLink = (a, b) => JSON.stringify(a ? validateHoursWorkLink(a) : null) === JSON.stringify(b ? validateHoursWorkLink(b) : null);

export function csvHoursCell(value) {
  const raw = String(value ?? '');
  return `"${(/^[\s]*[=+@-]/.test(raw) ? "'" : '') + raw.replaceAll('"', '""')}"`;
}
