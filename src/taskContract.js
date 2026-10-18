export const TASK_VERSION = 'm3s.task-execution.v2';
export const TASK_SOURCE_KINDS = ['journal', 'correspondence', 'ged', 'production_cycle', 'budget', 'transaction', 'historical_task'];
const plain = v => v && typeof v === 'object' && !Array.isArray(v);
const text = (v, min, max) => typeof v === 'string' && v.trim().length >= min && v.trim().length <= max
  && !Array.from(v).some(c => c.charCodeAt(0) < 32 || (c.charCodeAt(0) >= 127 && c.charCodeAt(0) <= 159));
const identifier = v => text(v, 1, 180) && /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/.test(v);
const optionalId = v => v === null || identifier(v);
const optionalText = (v, max) => v === null || text(v, 1, max);
const date = v => v === null || (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)
  && Number(v.slice(0, 4)) >= 1900 && Number.isFinite(Date.parse(`${v}T00:00:00Z`))
  && new Date(`${v}T00:00:00Z`).toISOString().slice(0, 10) === v);
const source = v => plain(v) && Object.keys(v).every(k => ['kind', 'reference'].includes(k))
  && TASK_SOURCE_KINDS.includes(v.kind) && text(v.reference, 1, 500);
export const emptyTaskFields = () => ({ contract_version: TASK_VERSION, reference: '', title: '',
  description: null, expected_result: '', verification_criterion: null, status: 'to_do', priority: 'normal',
  module: '', assignee_agent_id: '', team_id: null, function_id: '', progression: null,
  planned_start_date: null, due_date: null, actual_start_date: null, actual_end_date: null,
  execution_context: { execution_kind: 'project', phase_id: null, activity_id: null,
    operational_plan_id: null, recurrence_id: null, occurrence_key: null }, source_links: [], source_origin: null });

export const isValidTaskFields = (t, creating = true) => {
  const keys = Object.keys(emptyTaskFields());
  if (!plain(t) || Object.keys(t).some(k => !keys.includes(k)) || t.contract_version !== TASK_VERSION
    || (creating && !text(t.reference, 3, 180)) || (!creating && Object.hasOwn(t, 'reference'))
    || !text(t.title, 3, 240) || !optionalText(t.description, 4000) || !text(t.expected_result, 1, 2000)
    || !optionalText(t.verification_criterion, 2000) || !text(t.module, 1, 100)
    || !identifier(t.assignee_agent_id) || !identifier(t.function_id) || !optionalId(t.team_id)
    || !['to_do', 'in_progress', 'done', 'blocked', 'cancelled'].includes(t.status)
    || !['low', 'normal', 'high', 'urgent'].includes(t.priority)
    || !(t.progression === null || (Number.isInteger(t.progression) && t.progression >= 0 && t.progression <= 100))
    || !['planned_start_date', 'due_date', 'actual_start_date', 'actual_end_date'].every(k => date(t[k]))
    || (t.planned_start_date && t.due_date && t.planned_start_date > t.due_date)
    || (t.actual_start_date && t.actual_end_date && t.actual_start_date > t.actual_end_date)) return false;
  const c = t.execution_context;
  if (!plain(c) || Object.keys(c).some(k => !Object.hasOwn(emptyTaskFields().execution_context, k))
    || !['phase_id', 'activity_id', 'operational_plan_id', 'recurrence_id', 'occurrence_key'].every(k => optionalId(c[k]))) return false;
  if (c.execution_kind === 'project') {
    if (!c.phase_id || c.operational_plan_id || c.recurrence_id || c.occurrence_key) return false;
  } else if (c.execution_kind === 'operation') {
    if (!c.operational_plan_id || c.phase_id || c.activity_id || Boolean(c.recurrence_id) !== Boolean(c.occurrence_key)) return false;
  } else return false;
  if (!Array.isArray(t.source_links) || t.source_links.length > 32 || !t.source_links.every(source)
    || new Set(t.source_links.map(s => JSON.stringify([s.kind, s.reference.normalize('NFKC').trim()]))).size !== t.source_links.length
    || !(t.source_origin === null || (source(t.source_origin) && t.source_origin.kind !== 'historical_task'))) return false;
  return true;
};

export const validTaskReferences = r => {
  if (r?.contract_version !== TASK_VERSION || typeof r.execution_catalogue_ready !== 'boolean'
    || typeof r.writes_enabled !== 'boolean' || !Array.isArray(r.missing) || !r.missing.every(v => text(v, 1, 100))) return false;
  for (const kind of ['dossiers', 'members']) {
    const s = r.sources?.[kind];
    if (!s || !['available', 'unavailable', 'forbidden'].includes(s.status) || !Array.isArray(s.data)
      || (s.status !== 'available' && s.data.length) || s.data.length > 100
      || !s.data.every(v => identifier(v.id) && text(v.label, 1, 2000))
      || new Set(s.data.map(v => v.id)).size !== s.data.length) return false;
  }
  for (const kind of ['phases', 'activities', 'operational_plans', 'assignments', 'recurrences']) {
    const rows = r.choices?.[kind];
    if (!Array.isArray(rows) || rows.length > 1000 || !rows.every(v => plain(v) && identifier(v.id) && text(v.label, 1, 2000))
      || new Set(rows.map(v => v.id)).size !== rows.length) return false;
  }
  const c = r.choices;
  if (r.source_origins !== undefined && (!Array.isArray(r.source_origins) || r.source_origins.length > 32
    || !r.source_origins.every(v => source({ kind: v.kind, reference: v.reference }) && text(v.label, 1, 240))
    || new Set(r.source_origins.map(v => `${v.kind}:${v.reference}`)).size !== r.source_origins.length)) return false;
  if (!c.phases.every(v => ['project_id', 'dossier_id', 'portfolio_id'].every(k => identifier(v[k])))
    || !c.activities.every(v => c.phases.some(p => p.id === v.phase_id))
    || !c.operational_plans.every(v => identifier(v.function_id) && identifier(v.portfolio_id))
    || !c.assignments.every(v => identifier(v.assignee_agent_id) && optionalId(v.team_id) && identifier(v.function_id) && text(v.module, 1, 100))
    || !c.recurrences.every(v => c.operational_plans.some(p => p.id === v.operational_plan_id)
      && Array.isArray(v.occurrence_keys) && v.occurrence_keys.length <= 1000 && v.occurrence_keys.every(identifier)
      && new Set(v.occurrence_keys).size === v.occurrence_keys.length)) return false;
  return !r.writes_enabled || (r.execution_catalogue_ready && r.missing.length === 0
    && c.assignments.length > 0 && (c.phases.length > 0 || c.operational_plans.length > 0));
};

export const isTaskSelectionValid = (t, r) => {
  if (!validTaskReferences(r) || !r.writes_enabled) return false;
  const c = t.execution_context, choices = r.choices;
  if (!choices.assignments.some(a => ['assignee_agent_id', 'team_id', 'function_id', 'module'].every(k => a[k] === t[k]))) return false;
  if (c.execution_kind === 'project') return choices.phases.some(p => p.id === c.phase_id)
    && (!c.activity_id || choices.activities.some(a => a.id === c.activity_id && a.phase_id === c.phase_id));
  return choices.operational_plans.some(p => p.id === c.operational_plan_id && p.function_id === t.function_id)
    && (!c.recurrence_id || choices.recurrences.some(r => r.id === c.recurrence_id
      && r.operational_plan_id === c.operational_plan_id && r.occurrence_keys.includes(c.occurrence_key)));
};

export const taskFieldsFromRecord = r => Object.fromEntries(Object.keys(emptyTaskFields()).map(k => [k,
  k === 'execution_context' ? { ...r[k] } : k === 'source_links' ? (Array.isArray(r[k]) ? r[k].map(s => ({ ...s })) : r[k])
    : k === 'source_origin' ? (r[k] ? { ...r[k] } : null) : r[k]]));
