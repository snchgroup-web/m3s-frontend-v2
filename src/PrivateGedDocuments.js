import React, { useEffect, useRef, useState } from 'react';
import { Download, FileText, LockKeyhole, RefreshCw } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';

const messages = {
  FR: { title: 'Documents GED privés', refresh: 'Actualiser les documents', loading: 'Chargement des documents…',
    empty: 'Aucun document enregistré.', denied: 'Aucun accès aux documents privés pour ce compte.',
    disabled: 'Les documents privés ne sont pas encore disponibles.', error: 'Les documents sont momentanément indisponibles.',
    download: 'Télécharger', downloading: 'Téléchargement en cours…', failed: 'Le téléchargement a échoué. Réessaie.',
    done: 'Téléchargement préparé.', size: 'Ko' },
  EN: { title: 'Private GED documents', refresh: 'Refresh documents', loading: 'Loading documents…',
    empty: 'No documents registered.', denied: 'This account has no access to private documents.',
    disabled: 'Private documents are not available yet.', error: 'Documents are temporarily unavailable.',
    download: 'Download', downloading: 'Downloading…', failed: 'Download failed. Please try again.',
    done: 'Download prepared.', size: 'KB' },
  DE: { title: 'Private GED-Dokumente', refresh: 'Dokumente aktualisieren', loading: 'Dokumente werden geladen…',
    empty: 'Keine Dokumente registriert.', denied: 'Dieses Konto hat keinen Zugriff auf private Dokumente.',
    disabled: 'Private Dokumente sind noch nicht verfügbar.', error: 'Dokumente sind vorübergehend nicht verfügbar.',
    download: 'Herunterladen', downloading: 'Download läuft…', failed: 'Download fehlgeschlagen. Bitte erneut versuchen.',
    done: 'Download vorbereitet.', size: 'KB' }
};

export default function PrivateGedDocuments() {
  const { language } = useLanguage();
  const t = messages[language] || messages.FR;
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ status: 'loading', rows: [] });
  const [busy, setBusy] = useState(null);
  const [notice, setNotice] = useState(null);
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', rows: [] });
    api.getPrivateGedDocuments({ signal: controller.signal }).then(rows => {
      if (!controller.signal.aborted) setState({ status: 'ready', rows });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ rows: [], status: error.status === 403 ? 'denied' :
        error.code === 'GED_NOT_ENABLED' ? 'disabled' : 'error' });
    });
    return () => controller.abort();
  }, [revision]);

  async function download(row) {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    setBusy(row.id); setNotice(null);
    try {
      const blob = await api.downloadPrivateGedDocument(row, { signal: controller.signal });
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = row.name;
      document.body.appendChild(link);
      try { link.click(); } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
      setNotice('done');
    } catch {
      if (!controller.signal.aborted) setNotice('failed');
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setBusy(null);
    }
  }

  return <section className="private-ged" aria-labelledby="private-ged-title" aria-busy={state.status === 'loading'}>
    <div className="private-ged-heading"><h3 id="private-ged-title"><LockKeyhole size={18} aria-hidden="true"/>{t.title}</h3>
      <button className="m3s-secondary-button" aria-label={t.refresh} title={t.refresh}
        disabled={state.status === 'loading' || !!busy} onClick={() => { setNotice(null); setRevision(value => value + 1); }}><RefreshCw size={18}/></button>
    </div>
    {state.status !== 'ready' && <p role={state.status === 'error' ? 'alert' : 'status'}>{t[state.status]}</p>}
    {state.status === 'ready' && (state.rows.length ? <ul className="private-ged-list">{state.rows.map(row =>
      <li key={row.id}><FileText size={21} aria-hidden="true"/><div className="private-ged-file"><span>{row.name}</span>
        <small>PDF · {new Intl.NumberFormat({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH', { maximumFractionDigits: 1 }).format(row.size / 1024)} {t.size}</small></div>
        <button className="m3s-secondary-button" aria-label={`${t.download} ${row.name}`} title={`${t.download} ${row.name}`}
          disabled={!!busy} onClick={() => download(row)}><Download size={19}/></button></li>
    )}</ul> : <p>{t.empty}</p>)}
    {busy && <p role="status">{t.downloading}</p>}
    {notice && <p role={notice === 'failed' ? 'alert' : 'status'}>{t[notice]}</p>}
  </section>;
}
