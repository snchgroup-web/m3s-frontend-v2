import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, RefreshCw, Search, X } from 'lucide-react';
import api, { isValidTaskFields } from './api';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import { StandardCreateButton } from './StandardUI';
import { formatRegistryDate } from './registryDate';
import TaskExecutionFields, { EXECUTION_COPY } from './TaskExecutionFields';
import { TASK_VERSION, emptyTaskFields, isTaskSelectionValid, taskFieldsFromRecord } from './taskContract';

const COPY = {
  FR: {
    add: 'Nouvelle tâche', edit: 'Modifier tâche', title: 'Tâche', reference: 'Référence stable',
    status: 'Statut', priority: 'Priorité', owner: 'Responsable', module: 'Module', progress: 'Progression',
    related: 'Référence liée', due: 'Échéance', source: 'Source', actions: 'Actions', revision: 'Révision',
    historical: 'Historique · lecture seule', operational: 'Compte courant',
    historicalOnly: 'Périmètre : historique uniquement. Tâches du compte courant indisponibles.',
    combined: 'Périmètre : historique et tâches du compte courant.', readOnly: 'Écriture non autorisée pour ce compte.',
    unavailable: 'Source de tâches indisponible.', accessUnavailable: 'Accès opérationnel indisponible.',
    loading: 'Chargement…', empty: 'Aucune tâche dans ce résultat.', search: 'Rechercher dans les tâches', clear: 'Effacer la recherche',
    refresh: 'Actualiser les tâches et les compteurs', previous: 'Page précédente', next: 'Page suivante', rows: 'Lignes',
    results: 'résultats', total: 'Total serveur', shown: 'affichées', unavailableCount: 'Compteurs indisponibles',
    save: 'Enregistrer', cancel: 'Annuler', close: 'Fermer', decline: 'Non',
    confirmCreate: 'Confirmer l’ajout', confirmUpdate: 'Confirmer la modification', yesCreate: 'Oui, ajouter', yesUpdate: 'Oui, modifier',
    confirmBody: 'Enregistrer « {title} » sur le serveur ?', saved: 'Tâche enregistrée sur le serveur.', replayed: 'Enregistrement déjà confirmé par le serveur.',
    refreshFailed: 'Enregistrement confirmé ; relecture incomplète. Actualisez les tâches et les compteurs.',
    unknown: 'Résultat réseau non confirmé. Conservez cette référence et cette demande ; ne créez pas une autre tâche.',
    retry: 'Reprendre la même demande', conflict: 'La tâche a changé. Vos champs sont conservés. Fermez puis actualisez le registre avant de rouvrir la version serveur.',
    duplicate: 'Cette référence existe avec un contenu différent. Vérifiez le registre avant toute nouvelle demande.',
    historicalDuplicate: 'Doublon historique possible (identifiant ou titre). Vérifiez l’historique avant de poursuivre.',
    forbidden: 'Enregistrement refusé pour ce compte.', invalid: 'Champs invalides. Vérifiez la référence, les champs et la progression (0–100).',
    statuses: { to_do: 'À faire', in_progress: 'En cours', done: 'Terminé', blocked: 'Bloqué', cancelled: 'Annulé' },
    priorities: { low: 'Basse', normal: 'Moyenne', high: 'Haute', urgent: 'Urgente' }
  },
  DE: {
    add: 'Neue Aufgabe', edit: 'Aufgabe bearbeiten', title: 'Aufgabe', reference: 'Stabile Referenz',
    status: 'Status', priority: 'Priorität', owner: 'Verantwortlich', module: 'Modul', progress: 'Fortschritt',
    related: 'Verknüpfte Referenz', due: 'Frist', source: 'Quelle', actions: 'Aktionen', revision: 'Revision',
    historical: 'Historisch · schreibgeschützt', operational: 'Aktuelles Konto',
    historicalOnly: 'Umfang: nur historische Aufgaben. Aufgaben des aktuellen Kontos nicht verfügbar.',
    combined: 'Umfang: historische Aufgaben und Aufgaben des aktuellen Kontos.', readOnly: 'Kein Schreibzugriff für dieses Konto.',
    unavailable: 'Aufgabenquelle nicht verfügbar.', accessUnavailable: 'Operativer Zugriff nicht verfügbar.',
    loading: 'Wird geladen…', empty: 'Keine Aufgaben in diesem Ergebnis.', search: 'Aufgaben durchsuchen', clear: 'Suche löschen',
    refresh: 'Aufgaben und Zähler aktualisieren', previous: 'Vorherige Seite', next: 'Nächste Seite', rows: 'Zeilen',
    results: 'Ergebnisse', total: 'Servergesamtzahl', shown: 'angezeigt', unavailableCount: 'Zähler nicht verfügbar',
    save: 'Speichern', cancel: 'Abbrechen', close: 'Schliessen', decline: 'Nein',
    confirmCreate: 'Hinzufügen bestätigen', confirmUpdate: 'Änderung bestätigen', yesCreate: 'Ja, hinzufügen', yesUpdate: 'Ja, ändern',
    confirmBody: '„{title}“ auf dem Server speichern?', saved: 'Aufgabe auf dem Server gespeichert.', replayed: 'Speicherung bereits vom Server bestätigt.',
    refreshFailed: 'Speicherung bestätigt; erneutes Lesen unvollständig. Aufgaben und Zähler aktualisieren.',
    unknown: 'Netzwerkergebnis nicht bestätigt. Referenz und Anfrage beibehalten; keine weitere Aufgabe anlegen.',
    retry: 'Dieselbe Anfrage fortsetzen', conflict: 'Die Aufgabe wurde geändert. Ihre Felder bleiben erhalten. Schliessen und Register aktualisieren, dann Serverversion öffnen.',
    duplicate: 'Diese Referenz existiert mit anderem Inhalt. Vor einer neuen Anfrage das Register prüfen.',
    historicalDuplicate: 'Mögliches historisches Duplikat (ID oder Titel). Zuerst Verlauf prüfen.',
    forbidden: 'Speicherung für dieses Konto verweigert.', invalid: 'Ungültige Felder. Referenz, Felder und Fortschritt (0–100) prüfen.',
    statuses: { to_do: 'Zu erledigen', in_progress: 'In Bearbeitung', done: 'Erledigt', blocked: 'Blockiert', cancelled: 'Abgebrochen' },
    priorities: { low: 'Niedrig', normal: 'Mittel', high: 'Hoch', urgent: 'Dringend' }
  },
  EN: {
    add: 'New task', edit: 'Edit task', title: 'Task', reference: 'Stable reference',
    status: 'Status', priority: 'Priority', owner: 'Owner', module: 'Module', progress: 'Progress',
    related: 'Related reference', due: 'Due date', source: 'Source', actions: 'Actions', revision: 'Revision',
    historical: 'Historical · read only', operational: 'Current account',
    historicalOnly: 'Coverage: historical tasks only. Current-account tasks unavailable.',
    combined: 'Coverage: historical and current-account tasks.', readOnly: 'Writing is not authorised for this account.',
    unavailable: 'Task source unavailable.', accessUnavailable: 'Operational access unavailable.',
    loading: 'Loading…', empty: 'No tasks in this result.', search: 'Search tasks', clear: 'Clear search',
    refresh: 'Refresh tasks and counts', previous: 'Previous page', next: 'Next page', rows: 'Rows',
    results: 'results', total: 'Server total', shown: 'shown', unavailableCount: 'Counts unavailable',
    save: 'Save', cancel: 'Cancel', close: 'Close', decline: 'No',
    confirmCreate: 'Confirm addition', confirmUpdate: 'Confirm update', yesCreate: 'Yes, add', yesUpdate: 'Yes, update',
    confirmBody: 'Save “{title}” on the server?', saved: 'Task saved on the server.', replayed: 'Record already confirmed by the server.',
    refreshFailed: 'Save confirmed; read-back incomplete. Refresh tasks and counts.',
    unknown: 'Network result unconfirmed. Keep this reference and request; do not create another task.',
    retry: 'Resume the same request', conflict: 'The task has changed. Your fields are preserved. Close and refresh the register, then reopen the server version.',
    duplicate: 'This reference exists with different content. Check the register before another request.',
    historicalDuplicate: 'Potential historical duplicate (ID or title). Check the history before proceeding.',
    forbidden: 'Saving refused for this account.', invalid: 'Invalid fields. Check the reference, fields and progress (0–100).',
    statuses: { to_do: 'To do', in_progress: 'In progress', done: 'Done', blocked: 'Blocked', cancelled: 'Cancelled' },
    priorities: { low: 'Low', normal: 'Normal', high: 'High', urgent: 'Urgent' }
  }
};
const aliases = {
  'À faire': 'to_do', 'A faire': 'to_do', 'En cours': 'in_progress', 'Terminé': 'done', 'Bloqué': 'blocked', 'Annulé': 'cancelled',
  Basse: 'low', Moyenne: 'normal', Haute: 'high', Urgente: 'urgent'
};
const canonical = value => aliases[value] || value;
const fieldClass = 'm3s-field min-h-11 w-full min-w-0 px-3 py-2';
const iconClass = 'm3s-secondary-button inline-flex min-h-11 min-w-11 items-center justify-center';
const errorKey = error => ({
  TASK_CONFLICT: 'conflict', TASK_DUPLICATE_REFERENCE: 'duplicate', TASK_POTENTIAL_HISTORICAL_DUPLICATE: 'historicalDuplicate',
  TASK_SOURCE_UNAVAILABLE: 'unavailable', TASK_FORBIDDEN: 'forbidden', TASK_INVALID: 'invalid',
  TASK_CONTRACT_MISMATCH: 'missing', TASK_CONTEXT_SOURCE_UNAVAILABLE: 'missing', TASK_CONTEXT_REFERENCE_UNQUALIFIED: 'missing',
  TASK_ASSIGNMENT_UNQUALIFIED: 'missing', TASK_SOURCE_UNQUALIFIED: 'missing', TASK_CONTEXT_INVALID: 'invalid',
  TASK_SOURCE_LINK_INVALID: 'invalid', TASK_SOURCE_LINK_DUPLICATE: 'duplicate'
}[error?.code] || 'unknown');

const TaskEditor = ({ editor, t, moduleLabels, references, pending, busy, canWrite, onChange, onClose, onSubmit, onRetry }) => {
  const formRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    formRef.current?.querySelector('input:not(:disabled):not([readonly])')?.focus();
    return () => { if (opener?.isConnected) opener.focus(); };
  }, []);
  const fieldsLocked = busy || Boolean(editor.uncertain);
  const field = (name, label, type = 'text', extra = {}) => (
    <label className="block min-w-0 text-sm" key={name}>
      <span className="mb-1 block">{label}</span>
      <input className={fieldClass} type={type} value={editor.fields[name] ?? ''}
        onChange={event => onChange(name, type === 'number' ? (event.target.value === '' ? '' : Number(event.target.value)) : event.target.value)} {...extra} />
    </label>
  );
  return (
    <div className="administration-modal fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center">
      <form ref={formRef} role="dialog" aria-modal="true" aria-labelledby="persistent-task-title"
        aria-hidden={pending ? true : undefined} inert={pending ? true : undefined}
        className="administration-modal__panel max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-5 text-slate-200 shadow-2xl"
        onSubmit={event => { event.preventDefault(); onSubmit(); }}
        onKeyDown={event => {
          if (pending) return;
          if (event.key === 'Escape' && !busy) { event.preventDefault(); onClose(); }
          if (event.key === 'Tab') {
            const controls = Array.from(formRef.current.querySelectorAll('input:not(:disabled), select:not(:disabled), button:not(:disabled)'));
            const first = controls[0], last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }
        }}>
        <h2 id="persistent-task-title" className="mb-5 text-lg font-semibold">{editor.record ? t.edit : t.add}</h2>
        {editor.error && <p role="alert" className="mb-4 text-sm text-amber-300">{t[editor.error]}</p>}
        <fieldset disabled={fieldsLocked} className="grid min-w-0 gap-4 sm:grid-cols-2">
          {field('reference', `${t.reference} *`, 'text', { required: true, minLength: 3, maxLength: 180, readOnly: Boolean(editor.record || editor.referenceLocked) })}
          {field('title', `${t.title} *`, 'text', { required: true, minLength: 3, maxLength: 240 })}
          {[['status', t.status, t.statuses], ['priority', t.priority, t.priorities]].map(([name, label, values]) => (
            <label key={name} className="block min-w-0 text-sm"><span className="mb-1 block">{label}</span>
              <select aria-label={label} className={fieldClass} value={editor.fields[name]} onChange={event => onChange(name, event.target.value)}>
                {Object.entries(values).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
              </select>
            </label>
          ))}
          {field('expected_result', `${t.expected} *`, 'text', { required: true, maxLength: 2000 })}
          {field('description', t.description, 'text', { maxLength: 4000 })}
          {field('verification_criterion', t.verification, 'text', { maxLength: 2000 })}
          <TaskExecutionFields fields={editor.fields} editing={Boolean(editor.record)} references={references} t={t} onChange={onChange} />
          <p className="self-center text-sm">{t.module}: {moduleLabels?.[editor.fields.module] || editor.fields.module || '\u2014'}</p>
          {field('progression', `${t.progress} (%)`, 'number', { min: 0, max: 100, step: 1 })}
          {field('planned_start_date', t.planned, 'date', { min: '1900-01-01' })}
          {field('due_date', t.due, 'date', { min: '1900-01-01' })}
          {field('actual_start_date', t.actualStart, 'date', { min: '1900-01-01' })}
          {field('actual_end_date', t.actualEnd, 'date', { min: '1900-01-01' })}
          {editor.record && <p className="self-center text-sm">{t.revision} {editor.record.revision}</p>}
        </fieldset>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button type="button" disabled={busy} className="m3s-secondary-button min-h-11 px-4" onClick={onClose}>{t.close}</button>
          {editor.uncertain
            ? <button type="button" className="m3s-primary-button min-h-11 px-4" disabled={busy || !canWrite} onClick={onRetry}>{t.retry}</button>
            : <button type="submit" className={`${editor.record ? 'm3s-primary-button' : 'm3s-success-button'} min-h-11 px-4`}
              disabled={busy || !canWrite || Boolean(editor.uncertain) || editor.error === 'conflict' || !isValidTaskFields(editor.fields)
                || !isTaskSelectionValid(editor.fields, references)}>{t.save}</button>}
        </div>
      </form>
    </div>
  );
};

const PersistentTaskRegister = ({ language = 'FR', moduleLabels, onSummaryChange, onReferencesChange }) => {
  const t = { ...(COPY[language] || COPY.FR), ...(EXECUTION_COPY[language] || EXECUTION_COPY.FR) };
  const [query, setQuery] = useState({ search: '', limit: 25, offset: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(null);
  const [access, setAccess] = useState(null);
  const [references, setReferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countReady, setCountReady] = useState(false);
  const [editor, setEditor] = useState(null);
  const [pending, setPending] = useState(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const readRequest = useRef(null);
  const writeRequest = useRef(null);
  const writing = useRef(false);
  const mounted = useRef(true);
  const load = useCallback(async () => {
    readRequest.current?.abort();
    const controller = new AbortController();
    readRequest.current = controller;
    setLoading(true); setPage(null); setAccess(null); setReferences(null); setCountReady(false);
    onSummaryChange?.(null, 'loading');
    onReferencesChange?.(null);
    const options = { signal: controller.signal };
    const [list, count, rights, refs] = await Promise.allSettled([
      api.getTasks(query.limit, query.offset, query.search, options), api.getTasksCount(options), api.getTasksAccess(options),
      api.getTaskReferences(options)
    ]);
    if (controller.signal.aborted || !mounted.current) return false;
    if (list.status === 'fulfilled') setPage(list.value);
    if (rights.status === 'fulfilled') setAccess(rights.value);
    if (refs.status === 'fulfilled') setReferences(refs.value);
    onReferencesChange?.(refs.status === 'fulfilled' ? refs.value : null);
    const counted = count.status === 'fulfilled';
    setCountReady(counted);
    onSummaryChange?.(counted ? count.value : null, counted ? 'ready' : 'unavailable');
    setLoading(false);
    // A deletion elsewhere or a narrowed search can invalidate the last page.
    if (list.status === 'fulfilled' && query.offset > 0 && query.offset >= list.value.total) {
      setQuery(previous => ({ ...previous, offset: 0 }));
    }
    return list.status === 'fulfilled' && counted;
  }, [query, onSummaryChange, onReferencesChange]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; readRequest.current?.abort(); writeRequest.current?.abort(); };
  }, []);
  useEffect(() => { load(); return () => readRequest.current?.abort(); }, [load]);

  const canWrite = !loading && page?.operational_available === true && access?.enabled === true
    && access.can_read === true && access.can_write === true && access.contract_version === TASK_VERSION
    && access.client_contract_compatible === true && references?.writes_enabled === true
    && references.execution_catalogue_ready === true;
  const openEditor = record => {
    if (!canWrite || (record && (record.source_kind !== 'operational' || record.can_edit !== true))) return;
    const fields = record ? taskFieldsFromRecord(record) : emptyTaskFields();
    setFeedback(null); setEditor({ record, fields });
  };
  const proposeSave = () => {
    if (!canWrite || writing.current || !editor || !isValidTaskFields(editor.fields)
      || !isTaskSelectionValid(editor.fields, references) || editor.error === 'conflict') return;
    setPending({ record: editor.record, fields: { ...editor.fields } });
  };
  const save = async () => {
    if (!canWrite || !pending || writing.current) return;
    const request = pending;
    writing.current = true; setBusy(true);
    setEditor(previous => ({ ...previous, error: null, referenceLocked: true }));
    const controller = new AbortController();
    writeRequest.current = controller;
    try {
      let response;
      if (request.record) {
        const { reference, ...task } = request.fields;
        response = await api.updateTask(request.record.id, { expected_revision: request.record.revision, task }, { signal: controller.signal });
      } else response = await api.createTask(request.fields, { signal: controller.signal });
      if (!mounted.current) return;
      setEditor(null); setPending(null);
      window.dispatchEvent(new Event('m3s:tasks-changed'));
      const refreshed = await load();
      if (mounted.current) setFeedback(refreshed ? (response.replayed ? 'replayed' : 'saved') : 'refreshFailed');
    } catch (error) {
      if (!mounted.current) return;
      const key = errorKey(error);
      setPending(null);
      setEditor(previous => ({ ...previous, error: key, uncertain: key === 'unknown' ? request : null }));
      if (['forbidden', 'unavailable'].includes(key)) setAccess(null);
    } finally {
      writing.current = false;
      if (mounted.current) setBusy(false);
    }
  };
  const showStatus = value => t.statuses[canonical(value)] || value || '\u2014';
  const showPriority = value => t.priorities[canonical(value)] || value || '\u2014';
  return (
    <section aria-labelledby="planning-register" aria-busy={loading}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{page ? t[page.coverage === 'historical_only' ? 'historicalOnly' : 'combined'] : (loading ? t.loading : t.unavailable)}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={iconClass} title={t.refresh} aria-label={t.refresh} disabled={loading || busy} onClick={() => load()}><RefreshCw size={18} /></button>
          <StandardCreateButton disabled={!canWrite || busy} onClick={() => openEditor(null)}>{t.add}</StandardCreateButton>
        </div>
      </div>
      {!loading && (!access || !access.enabled || !access.can_read) && <p role="status" className="mb-3 text-sm text-amber-300">{t.accessUnavailable}</p>}
      {!loading && access?.enabled && access.can_read && !access.can_write && <p className="mb-3 text-sm text-slate-400">{t.readOnly}</p>}
      {!loading && <details className="mb-4 border-b border-slate-700 py-3">
        <summary className="cursor-pointer text-sm font-medium">{t.references}{references?.execution_catalogue_ready !== true ? ` · ${t.missing}` : ''}</summary>
        {references ? <div className="mt-3 grid min-w-0 gap-4 sm:grid-cols-2">
          {['dossiers', 'members'].map(kind => <div key={kind} className="min-w-0 text-sm">
            <h4 className="mb-2 font-medium">{t[kind]} · {t[`reference_${references.sources[kind].status}`]}</h4>
            {references.sources[kind].data.map(row => <p key={row.id} className="mb-2 break-words">{row.label} <span className="text-xs text-slate-400">{row.id}</span></p>)}
          </div>)}
          {references.missing.length > 0 && <p role="status" className="break-words text-sm text-amber-300 sm:col-span-2">
            {references.missing.map(k => t.missingLabels[k] || k).join(' · ')}</p>}
        </div> : <p className="mt-3 text-sm">{t.unavailable}</p>}
      </details>}
      {feedback && <p role="status" className="mb-3 text-sm text-slate-200">{t[feedback]}</p>}
      {!loading && !countReady && <p role="status" className="mb-3 text-sm text-amber-300">{t.unavailableCount}</p>}
      <form className="mb-4 flex min-w-0 flex-wrap items-center gap-3" onSubmit={event => {
        event.preventDefault(); setQuery(previous => ({ ...previous, search, offset: 0 }));
      }}>
        <label className="min-w-0 flex-1"><span className="sr-only">{t.search}</span>
          <input className={fieldClass} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t.search} />
        </label>
        <button type="submit" className={iconClass} title={t.search} aria-label={t.search} disabled={busy}><Search size={18} /></button>
        <button type="button" className={iconClass} title={t.clear} aria-label={t.clear} disabled={busy || (!search && !query.search)}
          onClick={() => { setSearch(''); setQuery(previous => ({ ...previous, search: '', offset: 0 })); }}><X size={18} /></button>
        <label className="flex items-center gap-2 text-sm text-slate-300">{t.rows}
          <select aria-label={t.rows} className="m3s-field min-h-11 px-2" value={query.limit} disabled={busy}
            onChange={event => setQuery(previous => ({ ...previous, limit: Number(event.target.value), offset: 0 }))}>
            {[10, 25, 50, 100].map(limit => <option key={limit}>{limit}</option>)}
          </select>
        </label>
      </form>
      <div className="m3s-table-shell overflow-auto">
        {page?.data.length ? <table className="min-w-full text-sm" style={{ minWidth: '65rem' }}>
          <thead className="bg-slate-700 text-left text-white"><tr>
            {[t.title, t.status, t.priority, t.owner, t.module, t.progress, t.due, t.source, t.actions].map(label => <th key={label} scope="col" className="px-4 py-2 font-semibold">{label}</th>)}
          </tr></thead>
          <tbody>{page.data.map(row => {
            const editable = canWrite && row.source_kind === 'operational' && row.can_edit === true;
            return <tr key={`${row.source_kind}:${row.id}`} className="administration-table-row border-t border-slate-700">
              <td className="max-w-sm break-words px-4 py-2 text-slate-200" style={{ minWidth: '15rem' }}><span className="font-medium">{row.title ?? row.titre}</span>
                {row.reference && <span className="mt-1 block text-xs text-slate-400">{row.reference}</span>}
                {row.related_reference && <span className="mt-1 block text-xs text-slate-400">{t.related}: {row.related_reference}</span>}</td>
              <td className="px-4 py-2 text-slate-300">{showStatus(row.status ?? row.statut)}</td>
              <td className="px-4 py-2 text-slate-300">{showPriority(row.priority ?? row.priorite)}</td>
              <td className="px-4 py-2 text-slate-300">{row.responsable || '\u2014'}</td>
              <td className="px-4 py-2 text-slate-300">{moduleLabels?.[row.module] || row.module || '\u2014'}</td>
              <td className="px-4 py-2 text-slate-300">{Number.isFinite(row.progression) ? `${row.progression}%` : '\u2014'}</td>
              <td className="whitespace-nowrap px-4 py-2 text-slate-300">{formatRegistryDate(row.due_date, language)}</td>
              <td className="px-4 py-2 text-xs text-slate-400">{row.source_kind === 'historical' ? t.historical : t.operational}</td>
              <td className="px-4 py-2">{editable && <button type="button" className={`${iconClass} text-blue-400`} title={t.edit}
                aria-label={`${t.edit} : ${row.title ?? row.titre}`} onClick={() => openEditor(row)}><Edit2 size={16} /></button>}</td>
            </tr>;
          })}</tbody>
        </table> : <p className="px-6 py-8 text-center text-sm text-slate-400">{loading ? t.loading : (page ? t.empty : t.unavailable)}</p>}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <span>{page ? `${page.count} ${t.shown} · ${query.search ? t.results : t.total} : ${page.total}` : '\u2014'}</span>
        <div className="flex gap-2">
          <button type="button" className={iconClass} title={t.previous} aria-label={t.previous} disabled={loading || busy || !page || query.offset === 0}
            onClick={() => setQuery(previous => ({ ...previous, offset: Math.max(0, previous.offset - previous.limit) }))}><ChevronLeft size={16} /></button>
          <button type="button" className={iconClass} title={t.next} aria-label={t.next} disabled={loading || busy || !page || query.offset + query.limit >= page.total}
            onClick={() => setQuery(previous => ({ ...previous, offset: previous.offset + previous.limit }))}><ChevronRight size={16} /></button>
        </div>
      </div>
      {editor && <TaskEditor editor={editor} t={t} moduleLabels={moduleLabels} references={references} pending={pending} busy={busy} canWrite={canWrite}
        onClose={() => { if (!writing.current) setEditor(null); }} onSubmit={proposeSave}
        onRetry={() => setPending(editor.uncertain)}
        onChange={(name, value) => setEditor(previous => ({ ...previous, error: previous.error === 'conflict' ? 'conflict' : null,
          fields: { ...previous.fields, [name]: value === '' && ['description', 'verification_criterion', 'progression', 'planned_start_date', 'due_date', 'actual_start_date', 'actual_end_date'].includes(name) ? null : value } }))} />}
      {pending && <ActionConfirmationDialog id="persistent-task-confirm" title={pending.record ? t.confirmUpdate : t.confirmCreate}
        body={t.confirmBody.replace('{title}', pending.fields.title)} cancelLabel={t.decline}
        confirmLabel={pending.record ? t.yesUpdate : t.yesCreate} action={pending.record ? 'update' : 'create'} busy={busy}
        onCancel={() => { if (!writing.current) setPending(null); }} onConfirm={save} />}
    </section>
  );
};

export default PersistentTaskRegister;
