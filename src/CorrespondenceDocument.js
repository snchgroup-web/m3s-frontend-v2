import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, X } from 'lucide-react';
import api from './api';

const PdfDocumentPreview = lazy(() => import('./PdfDocumentPreview'));
const copy = {
  FR: { view: 'Afficher la pièce GED', close: 'Fermer', loading: 'Chargement…', error: 'Pièce indisponible pour cette session.' },
  EN: { view: 'View DMS document', close: 'Close', loading: 'Loading…', error: 'Document unavailable for this session.' },
  DE: { view: 'GED-Dokument anzeigen', close: 'Schliessen', loading: 'Wird geladen…', error: 'Dokument für diese Sitzung nicht verfügbar.' }
};

export default function CorrespondenceDocument({ reference, language = 'FR' }) {
  const t = copy[language] || copy.FR;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(null);
  const trigger = useRef(null), dialog = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const controller = new AbortController();
    const returnFocus = trigger.current;
    setState(null); dialog.current?.focus();
    // Resolve a registered, visible correspondence record before requesting its bytes.
    api.getPrivateGedDocuments({ signal: controller.signal }).then(async rows => {
      const row = rows.find(item => item.id === reference && item.category === 'correspondence' && !item.trashed && item.name.endsWith('.pdf'));
      if (!row) throw new Error('unavailable');
      const blob = await api.downloadPrivateGedDocument(row, { signal: controller.signal });
      if (blob.type !== 'application/pdf') throw new Error('unavailable');
      if (!controller.signal.aborted) setState({ row, blob });
    }).catch(() => { if (!controller.signal.aborted) setState({ error: true }); });
    return () => { controller.abort(); returnFocus?.focus(); };
  }, [open, reference]);
  if (!/^[a-f0-9]{64}$/.test(reference || '')) return null;
  const close = () => setOpen(false);
  function keyboard(event) {
    event.stopPropagation();
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const buttons = Array.from(dialog.current.querySelectorAll('button:not(:disabled)'));
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
  return <>
    <button ref={trigger} type="button" className="m3s-icon-button" title={t.view} aria-label={t.view}
      onKeyDown={event => event.stopPropagation()} onClick={event => { event.stopPropagation(); setOpen(true); }}><Eye size={18}/></button>
    {open && createPortal(<div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={event => {
      event.stopPropagation(); if (event.target === event.currentTarget) close();
    }}><section ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label={t.view} onKeyDown={keyboard}
      className="m3s-panel p-5 w-full max-w-5xl max-h-[90vh] overflow-y-auto" style={{ color: 'var(--m3s-text-primary)' }}>
      <div className="flex items-start justify-between gap-3 mb-3"><h2 className="text-lg font-semibold break-words">{state?.row?.name || t.view}</h2>
        <button type="button" className="m3s-icon-button shrink-0" aria-label={t.close} title={t.close} onClick={close}><X size={20}/></button></div>
      {!state ? <p role="status">{t.loading}</p> : state.error ? <p role="alert">{t.error}</p> :
        <Suspense fallback={<p role="status">{t.loading}</p>}><PdfDocumentPreview blob={state.blob} name={state.row.name} language={language}/></Suspense>}
    </section></div>, document.body)}
  </>;
}
