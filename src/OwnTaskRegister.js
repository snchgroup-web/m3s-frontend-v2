import React, { useEffect, useState } from 'react';
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
export default function OwnTaskRegister({ language = 'FR' }) {
  const registerCopy = TASK_REGISTER_COPY[language] || TASK_REGISTER_COPY.FR;
  const t = { ...registerCopy, ...(EXECUTION_COPY[language] || EXECUTION_COPY.FR), ...(COPY[language] || COPY.FR) };
  const moduleLabels = TASK_MODULE_LABELS[language] || TASK_MODULE_LABELS.FR;
  const navigate = useNavigate();
  const [query, setQuery] = useState({ limit: 25, offset: 0, search: '' });
  const [search, setSearch] = useState('');
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ status: 'loading', page: null });
  useEffect(() => {
    const controller = new AbortController();
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
    {page?.data.length ? <div className="m3s-table-shell own-work-table own-task-table" role="region" aria-label={t.title} tabIndex={0}><table><thead><tr>{TASK_REGISTER_COLUMNS.map(key => <th key={key} scope="col">{registerCopy[key]}</th>)}</tr></thead><tbody>
      {page.data.map(row => <tr key={row.id}>
        <td><strong>{row.title}</strong><small>{row.reference}</small>{row.related_reference && <small>{t.related}: {row.related_reference}</small>}</td>
        <td>{t.statuses[row.status] || row.status || '\u2014'}</td><td>{t.priorities[row.priority] || row.priority || '\u2014'}</td>
        <td>{row.responsable || '\u2014'}</td><td>{moduleLabels[row.module] || row.module || '\u2014'}</td>
        <td>{Number.isFinite(row.progression) ? `${row.progression}%` : '\u2014'}</td>
        <td className="own-work-date">{formatRegistryDate(row.due_date, language)}</td>
        <td>{row.source_kind === 'operational' ? t.operational : '\u2014'}</td>
        <td><details><summary className="m3s-secondary-button own-work-icon own-task-details" title={t.details} aria-label={`${t.details} : ${row.title}`}><Eye size={18} aria-hidden="true"/></summary><dl>
          <dt>{t.expected}</dt><dd>{row.expected_result || '\u2014'}</dd>
          {row.description && <><dt>{t.description}</dt><dd>{row.description}</dd></>}
          <dt>{t.project}</dt><dd>{row.project_id || '\u2014'}</dd>
          <dt>{t.phase}</dt><dd>{row.execution_context?.phase_id || row.phase_id || '\u2014'}</dd>
          <dt>{t.activity}</dt><dd>{row.execution_context?.activity_id || '\u2014'}</dd>
          <dt>{t.revision}</dt><dd>{row.revision}</dd>
        </dl></details></td>
      </tr>)}
    </tbody></table></div> : <p role="status">{loading ? t.loading : page ? t.empty : t[state.status]}</p>}
    <div className="own-work-toolbar"><span>{page ? `${page.count} ${t.shown} · ${t.total} : ${page.total}` : '\u2014'}</span><div className="own-work-toolbar">
      {iconButton(t.previous, ChevronLeft, () => setQuery(previous => ({ ...previous, offset: Math.max(0, previous.offset - previous.limit) })), loading || !page || query.offset === 0)}
      {iconButton(t.next, ChevronRight, () => setQuery(previous => ({ ...previous, offset: previous.offset + previous.limit })), loading || !page || query.offset + query.limit >= page.total)}
    </div></div>
    <button type="button" className="m3s-secondary-button own-work-link" onClick={() => navigate('/administration?tab=planning#planning-register')}><ArrowUpRight size={18} aria-hidden="true"/>{t.open}</button>
  </section>;
}
