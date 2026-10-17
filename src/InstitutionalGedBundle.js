import React, { useEffect, useRef, useState } from 'react';
import { Download, Paperclip, RefreshCw, X } from 'lucide-react';
import api from './api';

const COPY = {
  FR: { title: 'Documents rattachés', heading: 'Organisation documentaire · V0.1', linked: 'GD-005 · GD-006',
    internal: 'Interne · preuve de préparation', loading: 'Chargement des documents…', denied: 'Accès documentaire non autorisé.',
    unavailable: 'Documents momentanément indisponibles.', close: 'Fermer les documents', refresh: 'Actualiser les documents',
    download: 'Télécharger', busy: 'Téléchargement en cours…', failed: 'Téléchargement non confirmé.', done: 'Téléchargement préparé.', size: 'Ko' },
  DE: { title: 'Verknüpfte Dokumente', heading: 'Dokumentenorganisation · V0.1', linked: 'GD-005 · GD-006',
    internal: 'Intern · Vorbereitungsnachweis', loading: 'Dokumente werden geladen…', denied: 'Dokumentenzugriff nicht erlaubt.',
    unavailable: 'Dokumente vorübergehend nicht verfügbar.', close: 'Dokumente schliessen', refresh: 'Dokumente aktualisieren',
    download: 'Herunterladen', busy: 'Download läuft…', failed: 'Download nicht bestätigt.', done: 'Download vorbereitet.', size: 'KB' },
  EN: { title: 'Linked documents', heading: 'Document organisation · V0.1', linked: 'GD-005 · GD-006',
    internal: 'Internal · preparation evidence', loading: 'Loading documents…', denied: 'Document access is not authorised.',
    unavailable: 'Documents are temporarily unavailable.', close: 'Close documents', refresh: 'Refresh documents',
    download: 'Download', busy: 'Downloading…', failed: 'Download not confirmed.', done: 'Download prepared.', size: 'KB' }
};

const RH_COPY = {
  FR: { title: 'Documents RH rattachés', heading: 'RH de proximité · V0.1', linked: 'GD-008 · GD-009' },
  DE: { title: 'Verknüpfte HR-Dokumente', heading: 'HR vor Ort · V0.1', linked: 'GD-008 · GD-009' },
  EN: { title: 'Linked HR documents', heading: 'Local HR · V0.1', linked: 'GD-008 · GD-009' }
};

const OFFERS_COPY = {
  FR: { title: 'Documents complémentaires', heading: 'Offres, kits et accueil', linked: 'GD-005 · GD-006 · GD-008 · GD-009', internal: 'Interne · ressources complémentaires', version: 'Version' },
  DE: { title: 'Ergänzende Dokumente', heading: 'Angebote, Kits und Einführung', linked: 'GD-005 · GD-006 · GD-008 · GD-009', internal: 'Intern · ergänzende Ressourcen', version: 'Version' },
  EN: { title: 'Supplementary documents', heading: 'Offers, kits and onboarding', linked: 'GD-005 · GD-006 · GD-008 · GD-009', internal: 'Internal · supplementary resources', version: 'Version' }
};

export default function InstitutionalGedBundle(props) {
  return <Bundle key={props.kind || 'documents'} {...props} />;
}

function Bundle({ language = 'FR', kind = 'documents' }) {
  const t = { ...(COPY[language] || COPY.FR), ...(kind === 'rh' ? RH_COPY[language] || RH_COPY.FR : kind === 'offers' ? OFFERS_COPY[language] || OFFERS_COPY.FR : {}) };
  const filesId = kind === 'offers' ? 'offers-institutional-ged-files' : kind === 'rh' ? 'rh-institutional-ged-files' : 'institutional-ged-files';
  const [open, setOpen] = useState(false), [reload, setReload] = useState(0);
  const [state, setState] = useState({ kind: 'idle' }), [busy, setBusy] = useState(null), [notice, setNotice] = useState(null);
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (!open) return undefined;
    const controller = new AbortController();
    setState({ kind: 'loading' }); setNotice(null);
    Promise.resolve().then(() => api.getInstitutionalGedBundle({ signal: controller.signal, kind })).then(bundle => {
      if (!controller.signal.aborted) setState({ kind: 'ready', bundle });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ kind: error?.status === 401 || error?.status === 403 ? 'denied' : 'unavailable' });
    });
    return () => controller.abort();
  }, [open, reload, kind]);

  function close() {
    active.current?.abort(); active.current = null;
    setBusy(null); setOpen(false); setState({ kind: 'idle' });
  }
  async function download(file) {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller;
    setBusy(file.id); setNotice(null);
    try {
      const blob = await api.downloadInstitutionalGedFile(file, { signal: controller.signal, kind });
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      try { link.href = url; link.download = file.name; document.body.appendChild(link); link.click(); }
      finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
      setNotice('done');
    } catch { if (!controller.signal.aborted) setNotice('failed'); }
    finally {
      if (active.current === controller) active.current = null;
      if (!controller.signal.aborted) setBusy(null);
    }
  }
  return <section className="border-t border-slate-700 pt-4" data-testid={kind === 'offers' ? 'offers-institutional-ged-bundle' : kind === 'rh' ? 'rh-institutional-ged-bundle' : 'institutional-ged-bundle'}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button type="button" className="m3s-field inline-flex min-h-11 items-center gap-2 px-3 py-2 text-blue-300"
        aria-expanded={open} aria-controls={filesId} onClick={() => open ? close() : setOpen(true)}>
        <Paperclip size={18} aria-hidden="true" />{t.title}
      </button>
      {open && <button type="button" className="m3s-icon-button min-h-11 min-w-11" title={t.close} aria-label={t.close} onClick={close}><X size={18} aria-hidden="true" /></button>}
    </div>
    {open && <div id={filesId} className="mt-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0"><h3 className="text-base font-semibold text-slate-100">{t.heading}</h3><p className="mt-1 text-sm text-slate-300">{t.internal}</p></div>
        <button type="button" className="m3s-icon-button min-h-11 min-w-11 shrink-0" title={t.refresh} aria-label={t.refresh}
          disabled={state.kind === 'loading' || Boolean(busy)} onClick={() => setReload(value => value + 1)}><RefreshCw size={18} aria-hidden="true" /></button>
      </div>
      {state.kind === 'ready' ? <>
        <p className="text-xs text-blue-300">{t.linked}</p>
        <ul className="divide-y divide-slate-700">{state.bundle.files.map(file => <li key={file.id} className="flex min-w-0 items-center gap-3 py-3">
          <div className="min-w-0 flex-1"><p className="break-all text-sm text-slate-100">{file.name}</p><p className="mt-1 text-xs text-slate-400">{new Intl.NumberFormat(language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH', { maximumFractionDigits: 1 }).format(file.size / 1024)} {t.size}</p>
            {kind === 'offers' && <p className="mt-1 break-words text-xs text-slate-300">{t.version} {file.version} · {file.dossiers.join(' · ')}</p>}
          </div>
          <button type="button" className="m3s-icon-button min-h-11 min-w-11 shrink-0 text-blue-300" title={`${t.download} ${file.name}`} aria-label={`${t.download} ${file.name}`}
            disabled={Boolean(busy)} onClick={() => download(file)}><Download size={18} aria-hidden="true" /></button>
        </li>)}</ul>
      </> : <p role={state.kind === 'loading' ? 'status' : 'alert'} className="text-sm text-slate-300">{t[state.kind] || t.loading}</p>}
      {(busy || notice) && <p role={notice === 'failed' ? 'alert' : 'status'} className="text-sm text-slate-300">{busy ? t.busy : t[notice]}</p>}
    </div>}
  </section>;
}
