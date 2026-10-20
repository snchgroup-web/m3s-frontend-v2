import React, { useEffect, useRef, useState } from 'react';
import { FolderOpen, X } from 'lucide-react';
import { openLocalComparator } from './localComparator';

const COPY = {
  FR: { title: 'Comparateur Avants de fenêtre', scope: 'Outil existant · source française du 24-07-26',
    privacy: 'Copie de travail temporaire, sans téléversement ni synchronisation M3S. Les saisies et « Enregistrer » restent en mémoire ; seul l’export JSON conserve le travail. Changer de rubrique, fermer ou recharger cette vue abandonne les saisies non exportées.',
    file: 'Fichier HTML existant — version de base ou partagée', open: 'Ouvrir la copie locale', close: 'Fermer le comparateur',
    confirm: 'Fermer cette copie locale ? Les saisies non exportées seront perdues.', busy: 'Vérification de la source…', verified: 'Source exacte vérifiée · données conservées uniquement dans la copie locale',
    error: 'Fichier non reconnu ou lecture indisponible. Seules les deux versions existantes référencées sont admises ; le fichier original n’a pas été modifié.', frame: 'Comparateur local isolé' },
  DE: { title: 'Vergleich Fenstervorbauten', scope: 'Bestehendes Werkzeug · französische Quelle vom 24.07.26',
    privacy: 'Temporäre lokale Arbeitskopie ohne Upload oder M3S-Synchronisierung. Eingaben und «Speichern» bleiben im Arbeitsspeicher; nur der JSON-Export erhält die Arbeit. Bereichswechsel, Schliessen oder Neuladen verwirft nicht exportierte Eingaben.',
    file: 'Bestehende HTML-Datei — Basis- oder Freigabeversion', open: 'Lokale Kopie öffnen', close: 'Vergleich schliessen',
    confirm: 'Lokale Kopie schliessen? Nicht exportierte Eingaben gehen verloren.', busy: 'Quelle wird geprüft…', verified: 'Exakte Quelle geprüft · Daten nur in der lokalen Kopie',
    error: 'Datei nicht erkannt oder Lesen nicht möglich. Nur die zwei referenzierten Versionen sind zugelassen; das Original wurde nicht verändert.', frame: 'Isolierter lokaler Vergleich' },
  EN: { title: 'Window awnings comparator', scope: 'Existing tool · French source dated 24/07/26',
    privacy: 'Temporary local working copy, without upload or M3S synchronisation. Entries and “Save” stay in memory; only JSON export retains the work. Changing section, closing or reloading this view discards unexported entries.',
    file: 'Existing HTML file — base or sharing version', open: 'Open local copy', close: 'Close comparator',
    confirm: 'Close this local copy? Unexported entries will be lost.', busy: 'Verifying source…', verified: 'Exact source verified · data held only in the local copy',
    error: 'File not recognised or reading unavailable. Only the two referenced existing versions are accepted; the original file has not changed.', frame: 'Isolated local comparator' }
};

export default function ProductionLocalComparator({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const [file, setFile] = useState(null), [state, setState] = useState({ status: 'idle' });
  const operation = useRef(0);
  useEffect(() => () => { operation.current += 1; }, []);
  useEffect(() => {
    if (state.status !== 'ready') return undefined;
    const leave = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', leave);
    return () => window.removeEventListener('beforeunload', leave);
  }, [state.status]);
  const open = async event => {
    event.preventDefault(); const id = ++operation.current; setState({ status: 'loading' });
    try {
      const result = await openLocalComparator(file);
      if (operation.current === id) setState({ status: 'ready', document: result.document });
    } catch { if (operation.current === id) setState({ status: 'error' }); }
  };
  return <section id="production-local-comparator" className="mt-5 border-t border-slate-700 pt-5" aria-labelledby="production-comparator-title">
    <h4 id="production-comparator-title" className="m3s-panel-title">{t.title}</h4>
    <p className="mt-2 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.scope}</p><p className="my-4 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.privacy}</p>
    {state.status === 'ready' ? <>
      <div className="my-3 flex flex-wrap items-center justify-between gap-3"><p role="status" className="text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.verified}</p>
        <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={() => {
          if (window.confirm(t.confirm)) { operation.current += 1; setState({ status: 'idle' }); setFile(null); }
        }}><X size={18} aria-hidden="true"/>{t.close}</button></div>
      <iframe title={t.frame} srcDoc={state.document} sandbox="allow-scripts allow-downloads allow-modals" referrerPolicy="no-referrer"
        className="block min-h-[550px] w-full rounded border border-slate-600" style={{ height: '80dvh' }}/>
    </> : <form onSubmit={open} className="flex flex-wrap items-end gap-3">
      <label className="grid min-w-0 flex-1 basis-full gap-2 text-sm sm:basis-80" style={{ gridTemplateColumns: 'minmax(0, 1fr)', color: 'var(--m3s-text-primary)' }}>{t.file}<input type="file" accept=".html,text/html" disabled={state.status === 'loading'}
        onChange={event => { setFile(event.target.files?.[0] || null); setState({ status: 'idle' }); }} className="m3s-field min-h-11 w-full min-w-0 max-w-full p-2"/></label>
      <button type="submit" disabled={!file || state.status === 'loading'} className="m3s-secondary-button inline-flex min-h-11 shrink-0 items-center gap-2 px-3 disabled:opacity-50"><FolderOpen size={18} aria-hidden="true"/>{t.open}</button>
    </form>}
    {state.status === 'loading' && <p role="status" className="mt-3 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.busy}</p>}
    {state.status === 'error' && <p role="alert" className="mt-3 text-sm" style={{ color: 'var(--m3s-status-danger)' }}>{t.error}</p>}
  </section>;
}
