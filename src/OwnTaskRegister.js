import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye, RefreshCw, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { TASK_REGISTER_COPY } from './PersistentTaskRegister';
import { formatRegistryDate } from './registryDate';
import { EXECUTION_COPY } from './TaskExecutionFields';
import { TASK_MODULE_LABELS, TASK_REGISTER_COLUMNS } from './taskRegisterPresentation';

const COPY = {
  FR: { title: 'Mes tâches', coverage: 'Mes tâches enregistrées et affectées · projet Standardisation · lecture seule. Historique exclu.',
    open: 'Ouvrir le registre partagé', details: 'Détails', expected: 'Résultat attendu', description: 'Description', phase: 'Phase',
    forbidden: 'La lecture de ces affectations n’est pas autorisée pour ce compte.' },
  DE: { title: 'Meine Aufgaben', coverage: 'Meine erfassten und zugewiesenen Aufgaben · Projekt Standardisierung · schreibgeschützt. Historische Aufgaben ausgeschlossen.',
    open: 'Gemeinsames Register öffnen', details: 'Details', expected: 'Erwartetes Ergebnis', description: 'Beschreibung', phase: 'Phase',
    forbidden: 'Das Lesen dieser Zuweisungen ist für dieses Konto nicht erlaubt.' },
  EN: { title: 'My tasks', coverage: 'My recorded and assigned tasks · Standardisation project · read only. Historical tasks excluded.',
    open: 'Open shared register', details: 'Details', expected: 'Expected result', description: 'Description', phase: 'Phase',
    forbidden: 'Reading these assignments is not authorised for this account.' }
};

function TaskReader({ row, t, moduleLabels, language, onClose }) {
  const dialog = useRef(null), closeButton = useRef(null), titleId = useId();
  useEffect(() => {
    const opener = document.activeElement;
    closeButton.current?.focus();
    const key = event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); }
      if (event.key === 'Tab') {
        const controls = [...dialog.current.querySelectorAll('button,[tabindex="0"]')];
        const index = controls.indexOf(document.activeElement);
        if (index === -1 || (event.shiftKey ? index === 0 : index === controls.length - 1)) {
          event.preventDefault(); controls[event.shiftKey ? controls.length - 1 : 0]?.focus();
        }
      }
    };
    const focus = event => { if (!dialog.current?.contains(event.target)) closeButton.current?.focus(); };
    document.addEventListener('keydown', key);
    document.addEventListener('focusin', focus);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('focusin', focus);
      if (opener?.isConnected) opener.focus();
    };
  }, [onClose]);
  const field = (label, value, date = false) => <div key={label}><dt>{label}</dt><dd className={date ? 'own-work-date' : undefined}>{value ?? '\u2014'}</dd></div>;
  return createPortal(<div className="m3s-design-scope own-task-reader-overlay" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} className="own-task-reader m3s-panel">
      <header><div><h3 id={titleId}>{row.title}</h3><p>{row.reference}</p></div>
        <button ref={closeButton} type="button" className="m3s-secondary-button own-work-icon" title={t.close} aria-label={t.close} onClick={onClose}><X size={18} aria-hidden="true"/></button></header>
      <div className="own-task-reader-body" tabIndex={0} role="region" aria-label={t.details}>
        <dl className="own-task-reader-meta">
          {field(t.status, t.statuses[row.status] || row.status)}{field(t.priority, t.priorities[row.priority] || row.priority)}
          {field(t.owner, row.responsable)}{field(t.module, moduleLabels[row.module] || row.module)}
          {field(t.progress, Number.isFinite(row.progression) ? `${row.progression}%` : null)}
          {field(t.due, formatRegistryDate(row.due_date, language), true)}
          {field(t.source, row.source_kind === 'operational' ? t.operational : null)}{field(t.revision, row.revision)}
          {field(t.project, row.project_id)}{field(t.phase, row.execution_context?.phase_id || row.phase_id)}
          {field(t.activity, row.execution_context?.activity_id)}{field(t.related, row.related_reference)}
        </dl>
        <dl className="own-task-reader-text">{field(t.expected, row.expected_result)}{field(t.description, row.description)}</dl>
      </div>
    </section>
  </div>, document.body);
}

export default function OwnTaskRegister({ language = 'FR', initialSearch = '' }) {
  const registerCopy = TASK_REGISTER_COPY[language] || TASK_REGISTER_COPY.FR;
  const t = { ...registerCopy, ...(EXECUTION_COPY[language] || EXECUTION_COPY.FR), ...(COPY[language] || COPY.FR) };
  const moduleLabels = TASK_MODULE_LABELS[language] || TASK_MODULE_LABELS.FR;
  const navigate = useNavigate();
  const sourceSearch = typeof initialSearch === 'string' ? initialSearch.slice(0, 240) : '';
  const [query, setQuery] = useState({ limit: 25, offset: 0, search: sourceSearch });
  const [search, setSearch] = useState(sourceSearch);
  useEffect(() => { setSearch(sourceSearch); setQuery(previous => previous.search === sourceSearch ? previous : { ...previous, search: sourceSearch, offset: 0 }); }, [sourceSearch]);
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ status: 'loading', page: null });
  const [selectedId, setSelectedId] = useState(null);
  const closeReader = useCallback(() => setSelectedId(null), []);
  const tableRegion = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    setSelectedId(null);
    setState({ status: 'loading', page: null });
    api.getOwnTasks(query.limit, query.offset, query.search, { signal: controller.signal }).then(page => {
      if (controller.signal.aborted) return;
      if (query.offset > 0 && query.offset >= page.total) { setQuery(previous => ({ ...previous, offset: 0 })); return; }
      setState({ status: 'ready', page });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ status: error.status === 403 ? 'forbidden' : 'unavailable', page: null });
    });
    return () => controller.abort();
  }, [query, revision]);
  useEffect(() => {
    const refresh = () => setRevision(value => value + 1);
    window.addEventListener('m3s:tasks-changed', refresh);
    return () => window.removeEventListener('m3s:tasks-changed', refresh);
  }, []);
  const page = state.page, loading = state.status === 'loading';
  const selected = page?.data.find(row => row.id === selectedId);
  useEffect(() => { if (tableRegion.current) tableRegion.current.scrollTop = 0; }, [page]);
  const iconButton = (name, Icon, action, disabled = false) => <button type="button" className="m3s-secondary-button own-work-icon" title={name} aria-label={name} onClick={action} disabled={disabled}><Icon size={18} aria-hidden="true"/></button>;
  return <section className="own-work-register" aria-labelledby="own-task-title" aria-busy={loading}>
    <div className="own-work-toolbar"><h3 id="own-task-title">{t.title}</h3>{iconButton(t.refresh, RefreshCw, () => setRevision(value => value + 1), loading)}</div>
    <p>{t.coverage}</p>
    <form className="own-work-toolbar" onSubmit={event => { event.preventDefault(); setQuery(previous => ({ ...previous, search, offset: 0 })); }}>
      <label className="own-work-search"><span className="sr-only">{t.search}</span><input type="search" className="m3s-field" value={search} maxLength={240} placeholder={t.search} onChange={event => setSearch(event.target.value)}/></label>
      <button type="submit" className="m3s-secondary-button own-work-icon" title={t.search} aria-label={t.search}><Search size={18} aria-hidden="true"/></button>
      {iconButton(t.clear, X, () => { setSearch(''); setQuery(previous => ({ ...previous, search: '', offset: 0 })); }, !search && !query.search)}
      <label>{t.rows} <select className="m3s-field" value={query.limit} onChange={event => setQuery(previous => ({ ...previous, limit: Number(event.target.value), offset: 0 }))}>{[10,25,50,100].map(value => <option key={value}>{value}</option>)}</select></label>
    </form>
    {page?.data.length ? <div ref={tableRegion} className="m3s-table-shell own-work-table own-task-table" role="region" aria-label={t.title} tabIndex={0}><table>
      <colgroup>{TASK_REGISTER_COLUMNS.map(key => <col key={key} className={`own-task-col-${key}`}/>)}</colgroup>
      <thead><tr>{TASK_REGISTER_COLUMNS.map(key => <th key={key} scope="col">{registerCopy[key]}</th>)}</tr></thead><tbody>
      {page.data.map(row => <tr key={row.id}>
        <td><strong className="own-task-title" title={row.title}>{row.title}</strong><small className="own-task-reference" title={row.reference}>{row.reference}</small></td>
        <td>{t.statuses[row.status] || row.status || '\u2014'}</td><td>{t.priorities[row.priority] || row.priority || '\u2014'}</td>
        <td><span className="own-task-owner" title={row.responsable}>{row.responsable || '\u2014'}</span></td><td>{moduleLabels[row.module] || row.module || '\u2014'}</td>
        <td>{Number.isFinite(row.progression) ? `${row.progression}%` : '\u2014'}</td>
        <td className="own-work-date">{formatRegistryDate(row.due_date, language)}</td>
        <td>{row.source_kind === 'operational' ? t.operational : '\u2014'}</td>
        <td><button type="button" className="m3s-secondary-button own-work-icon" title={t.details} aria-label={`${t.details} : ${row.title}`} aria-haspopup="dialog" onClick={() => setSelectedId(row.id)}><Eye size={18} aria-hidden="true"/></button></td>
      </tr>)}
    </tbody></table></div> : <p role="status">{loading ? t.loading : page ? t.empty : t[state.status]}</p>}
    <div className="own-work-toolbar"><span>{page ? `${page.count} ${t.shown} · ${query.search ? t.results : t.total} : ${page.total}` : '\u2014'}</span><div className="own-work-toolbar">
      {page?.count > 0 && <span className="own-work-date">{query.offset + 1}–{query.offset + page.count} / {page.total}</span>}
      {iconButton(t.previous, ChevronLeft, () => setQuery(previous => ({ ...previous, offset: Math.max(0, previous.offset - previous.limit) })), loading || !page || query.offset === 0)}
      {iconButton(t.next, ChevronRight, () => setQuery(previous => ({ ...previous, offset: previous.offset + previous.limit })), loading || !page || query.offset + query.limit >= page.total)}
    </div></div>
    <button type="button" className="m3s-secondary-button own-work-link" onClick={() => navigate('/administration?tab=planning#planning-register')}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>
    {selected && <TaskReader row={selected} t={t} moduleLabels={moduleLabels} language={language} onClose={closeReader}/>}
  </section>;
}
