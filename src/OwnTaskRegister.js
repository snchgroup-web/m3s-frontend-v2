import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, RefreshCw, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { TASK_REGISTER_COPY } from './PersistentTaskRegister';
import { formatRegistryDate } from './registryDate';

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
  const t = { ...(TASK_REGISTER_COPY[language] || TASK_REGISTER_COPY.FR), ...(COPY[language] || COPY.FR) };
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
    {page?.data.length ? <div className="m3s-table-shell own-work-table"><table><thead><tr>{[t.title,t.status,t.priority,t.due,t.details].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>
      {page.data.map(row => <tr key={row.id}>
        <td><strong>{row.title}</strong><small>{row.reference}</small></td><td>{t.statuses[row.status] || row.status}</td><td>{t.priorities[row.priority] || row.priority}</td>
        <td className="own-work-date">{formatRegistryDate(row.due_date, language)}</td>
        <td><details><summary>{t.details}</summary><dl>
          <dt>{t.expected}</dt><dd>{row.expected_result}</dd>
          {row.description && <><dt>{t.description}</dt><dd>{row.description}</dd></>}
          <dt>{t.phase}</dt><dd>{row.phase_id}</dd><dt>{t.progress}</dt><dd>{row.progression === null ? '\u2014' : `${row.progression}%`}</dd>
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
