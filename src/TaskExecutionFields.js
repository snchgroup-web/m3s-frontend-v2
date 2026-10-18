import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TASK_SOURCE_KINDS } from './taskContract';

export const EXECUTION_COPY = {
  FR: {
    expected: 'Résultat attendu', verification: 'Critère de vérification', description: 'Description',
    planned: 'Début prévu', actualStart: 'Début réel', actualEnd: 'Fin réelle', branch: 'Cadre d’exécution',
    project: 'Projet', operation: 'Opération', phase: 'Phase du projet', activity: 'Activité', plan: 'Plan opérationnel',
    assignment: 'Affectation validée', team: 'Team', function: 'Fonction', recurrence: 'Modèle récurrent', occurrence: 'Occurrence',
    sourceLinks: 'Références des preuves', origin: 'Source d’origine unitaire', addLink: 'Ajouter une référence', removeLink: 'Retirer la référence',
    none: 'Aucun', select: 'Sélectionner', references: 'Référentiels', missing: 'Référentiels d’exécution incomplets',
    reference_available: 'Disponible', reference_unavailable: 'Indisponible', reference_forbidden: 'Non autorisé', dossiers: 'Dossiers institutionnels', members: 'Annuaire documentaire',
    sourceKinds: { journal: 'Journal', correspondence: 'Courrier / Agenda', ged: 'GED', production_cycle: 'Cycle Production', budget: 'Budget', transaction: 'Transaction', historical_task: 'Tâche historique' },
    missingLabels: { project_phases: 'Projets et phases', operational_plans: 'Plans opérationnels', governed_assignments: 'Affectations avec fonction', canonical_source_resolution: 'Qualification des sources' }
  },
  DE: {
    expected: 'Erwartetes Ergebnis', verification: 'Prüfkriterium', description: 'Beschreibung',
    planned: 'Geplanter Beginn', actualStart: 'Tatsächlicher Beginn', actualEnd: 'Tatsächliches Ende', branch: 'Ausführungsrahmen',
    project: 'Projekt', operation: 'Betrieb', phase: 'Projektphase', activity: 'Aktivität', plan: 'Betriebsplan',
    assignment: 'Bestätigte Zuordnung', team: 'Team', function: 'Funktion', recurrence: 'Wiederholungsmodell', occurrence: 'Ausführung',
    sourceLinks: 'Nachweisreferenzen', origin: 'Einzelne Ursprungsquelle', addLink: 'Referenz hinzufügen', removeLink: 'Referenz entfernen',
    none: 'Keine', select: 'Auswählen', references: 'Referenzquellen', missing: 'Ausführungsreferenzen unvollständig',
    reference_available: 'Verfügbar', reference_unavailable: 'Nicht verfügbar', reference_forbidden: 'Nicht berechtigt', dossiers: 'Institutionelle Dossiers', members: 'Dokumentarisches Verzeichnis',
    sourceKinds: { journal: 'Journal', correspondence: 'Korrespondenz / Agenda', ged: 'DMS', production_cycle: 'Produktionszyklus', budget: 'Budget', transaction: 'Transaktion', historical_task: 'Historische Aufgabe' },
    missingLabels: { project_phases: 'Projekte und Phasen', operational_plans: 'Betriebspläne', governed_assignments: 'Zuordnungen mit Funktion', canonical_source_resolution: 'Quellenqualifizierung' }
  },
  EN: {
    expected: 'Expected result', verification: 'Verification criterion', description: 'Description',
    planned: 'Planned start', actualStart: 'Actual start', actualEnd: 'Actual end', branch: 'Execution context',
    project: 'Project', operation: 'Operation', phase: 'Project phase', activity: 'Activity', plan: 'Operational plan',
    assignment: 'Approved assignment', team: 'Team', function: 'Function', recurrence: 'Recurrence model', occurrence: 'Occurrence',
    sourceLinks: 'Evidence references', origin: 'Unit source of origin', addLink: 'Add reference', removeLink: 'Remove reference',
    none: 'None', select: 'Select', references: 'Reference sources', missing: 'Execution references incomplete',
    reference_available: 'Available', reference_unavailable: 'Unavailable', reference_forbidden: 'Not authorised', dossiers: 'Institutional dossiers', members: 'Documentary directory',
    sourceKinds: { journal: 'Journal', correspondence: 'Correspondence / Agenda', ged: 'DMS', production_cycle: 'Production cycle', budget: 'Budget', transaction: 'Transaction', historical_task: 'Historical task' },
    missingLabels: { project_phases: 'Projects and phases', operational_plans: 'Operational plans', governed_assignments: 'Assignments with function', canonical_source_resolution: 'Source qualification' }
  }
};
const css = 'm3s-field min-h-11 w-full min-w-0 px-3 py-2';
const icon = 'm3s-secondary-button inline-flex h-11 w-11 shrink-0 items-center justify-center';

export default function TaskExecutionFields({ fields: f, editing, references, t, onChange }) {
  const choices = references?.choices || { phases: [], activities: [], operational_plans: [], assignments: [], recurrences: [] };
  const c = f.execution_context;
  const setContext = patch => onChange('execution_context', { ...c, ...patch });
  const select = (label, value, rows, change, disabled = false, optional = false) => (
    <label className="block min-w-0 text-sm"><span className="mb-1 block">{label}</span>
      <select aria-label={label} className={css} value={value || ''} onChange={e => change(e.target.value || null)} disabled={disabled} required={!optional}>
        <option value="">{optional ? t.none : t.select}</option>
        {value && !rows.some(r => r.id === value) && <option value={value}>{value}</option>}
        {rows.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
      </select>
    </label>
  );
  const assignment = choices.assignments.find(a => ['assignee_agent_id', 'team_id', 'function_id', 'module'].every(k => a[k] === f[k]));
  const phase = choices.phases.find(p => p.id === c.phase_id);
  const recurrence = choices.recurrences.find(r => r.id === c.recurrence_id);
  const sourceControl = (label, value, change, locked = false, origin = false) => (
    <div className="grid min-w-0 gap-2 sm:grid-cols-2">
      <label className="block min-w-0 text-sm"><span className="mb-1 block">{label}</span>
        <select aria-label={label} className={css} value={value?.kind || ''} disabled={locked}
          onChange={e => change(e.target.value ? { kind: e.target.value, reference: value?.reference || '' } : null)}>
          {origin && <option value="">{t.none}</option>}
          {TASK_SOURCE_KINDS.filter(k => !origin || k !== 'historical_task').map(k => <option key={k} value={k}>{t.sourceKinds[k]}</option>)}
        </select>
      </label>
      <label className="block min-w-0 text-sm"><span className="mb-1 block">{t.reference}</span>
        <input aria-label={`${label} · ${t.reference}`} className={css} value={value?.reference || ''} maxLength={500} disabled={locked || !value} required={Boolean(value)}
          onChange={e => change({ ...value, reference: e.target.value })} />
      </label>
    </div>
  );
  return <>
    {select(t.branch, c.execution_kind, [{ id: 'project', label: t.project }, { id: 'operation', label: t.operation }],
      execution_kind => onChange('execution_context', { execution_kind, phase_id: null, activity_id: null,
        operational_plan_id: null, recurrence_id: null, occurrence_key: null }), editing)}
    {c.execution_kind === 'project' ? <>
      {select(t.phase, c.phase_id, choices.phases.map(p => ({ ...p, label: `${p.project_id} · ${p.label}` })),
        phase_id => setContext({ phase_id, activity_id: null }), editing)}
      {select(t.activity, c.activity_id, choices.activities.filter(a => a.phase_id === c.phase_id), activity_id => setContext({ activity_id }), editing, true)}
      {phase && <p className="self-center break-words text-sm">{phase.dossier_id} · {phase.portfolio_id}</p>}
    </> : <>
      {select(t.plan, c.operational_plan_id, choices.operational_plans, operational_plan_id => setContext({ operational_plan_id, recurrence_id: null, occurrence_key: null }), editing)}
      {select(t.recurrence, c.recurrence_id, choices.recurrences.filter(r => r.operational_plan_id === c.operational_plan_id), recurrence_id => setContext({ recurrence_id, occurrence_key: null }), editing, true)}
      {c.recurrence_id && select(t.occurrence, c.occurrence_key, (recurrence?.occurrence_keys || []).map(id => ({ id, label: id })), occurrence_key => setContext({ occurrence_key }), editing)}
    </>}
    {select(t.assignment, assignment?.id, choices.assignments.filter(a => c.execution_kind !== 'operation'
      || choices.operational_plans.some(p => p.id === c.operational_plan_id && p.function_id === a.function_id)), id => {
      const a = choices.assignments.find(a => a.id === id);
      for (const key of ['assignee_agent_id', 'team_id', 'function_id', 'module']) onChange(key, a?.[key] ?? (key === 'team_id' ? null : ''));
    })}
    <p className="self-center break-words text-sm">{t.team}: {f.team_id || '\u2014'} · {t.function}: {f.function_id || '\u2014'}</p>
    <div className="min-w-0 space-y-3 sm:col-span-2">
      {references?.source_origins?.length ? select(t.origin,
        f.source_origin ? `${f.source_origin.kind}:${f.source_origin.reference}` : null,
        references.source_origins.map(s => ({ id: `${s.kind}:${s.reference}`, label: s.label })), id => {
          const value = references.source_origins.find(s => `${s.kind}:${s.reference}` === id);
          onChange('source_origin', value ? { kind: value.kind, reference: value.reference } : null);
        }, editing) : sourceControl(t.origin, f.source_origin, value => onChange('source_origin', value), editing, true)}
      {f.source_links.map((link, index) => <div key={index} className="flex min-w-0 items-end gap-2">
        <div className="min-w-0 flex-1">{sourceControl(`${t.sourceLinks} ${index + 1}`, link,
          value => onChange('source_links', f.source_links.map((s, n) => n === index ? value : s)))}</div>
        <button type="button" className={`${icon} text-red-400`} title={t.removeLink} aria-label={`${t.removeLink} ${index + 1}`}
          onClick={() => onChange('source_links', f.source_links.filter((_, n) => n !== index))}><Trash2 size={17} /></button>
      </div>)}
      <button type="button" className={icon} title={t.addLink} aria-label={t.addLink} disabled={f.source_links.length >= 32}
        onClick={() => onChange('source_links', [...f.source_links, { kind: 'ged', reference: '' }])}><Plus size={17} /></button>
    </div>
  </>;
}
