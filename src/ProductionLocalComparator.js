import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, FolderOpen, X } from 'lucide-react';
import { openLocalComparator } from './localComparator';

const COPY = {
  FR: { title: 'Comparateur Avants de fenêtre', scope: 'Sources françaises : originales du 24-07-26 ou copie neutre V0.1 du 20-10-26',
    privacy: 'Copie de travail temporaire, sans téléversement ni synchronisation M3S. Les saisies et « Enregistrer » restent en mémoire ; seul l’export JSON conserve le travail. Changer de rubrique, fermer ou recharger cette vue abandonne les saisies non exportées.',
    file: 'Fichier HTML existant — base, partagé ou copie neutre V0.1', open: 'Ouvrir la copie locale', close: 'Fermer le comparateur',
    confirm: 'Fermer cette copie locale ? Les saisies non exportées seront perdues.', busy: 'Vérification de la source…', verified: 'Source exacte vérifiée · données conservées uniquement dans la copie locale',
    error: 'Fichier non reconnu ou lecture indisponible. Seuls les deux originaux référencés et la copie neutre V0.1 exacte sont admis ; le fichier original n’a pas été modifié.', frame: 'Comparateur local isolé' },
  DE: { title: 'Vergleich Fenstervorbauten', scope: 'Französische Quellen: Originale vom 24.07.26 oder neutrale Kopie V0.1 vom 20.10.26',
    privacy: 'Temporäre lokale Arbeitskopie ohne Upload oder M3S-Synchronisierung. Eingaben und «Speichern» bleiben im Arbeitsspeicher; nur der JSON-Export erhält die Arbeit. Bereichswechsel, Schliessen oder Neuladen verwirft nicht exportierte Eingaben.',
    file: 'Bestehende HTML-Datei — Basis, Freigabe oder neutrale Kopie V0.1', open: 'Lokale Kopie öffnen', close: 'Vergleich schliessen',
    confirm: 'Lokale Kopie schliessen? Nicht exportierte Eingaben gehen verloren.', busy: 'Quelle wird geprüft…', verified: 'Exakte Quelle geprüft · Daten nur in der lokalen Kopie',
    error: 'Datei nicht erkannt oder Lesen nicht möglich. Nur die zwei referenzierten Originale und die exakte neutrale Kopie V0.1 sind zugelassen; das Original wurde nicht verändert.', frame: 'Isolierter lokaler Vergleich' },
  EN: { title: 'Window awnings comparator', scope: 'French sources: originals dated 24/07/26 or neutral V0.1 copy dated 20/10/26',
    privacy: 'Temporary local working copy, without upload or M3S synchronisation. Entries and “Save” stay in memory; only JSON export retains the work. Changing section, closing or reloading this view discards unexported entries.',
    file: 'Existing HTML file — base, sharing or neutral V0.1 copy', open: 'Open local copy', close: 'Close comparator',
    confirm: 'Close this local copy? Unexported entries will be lost.', busy: 'Verifying source…', verified: 'Exact source verified · data held only in the local copy',
    error: 'File not recognised or reading unavailable. Only the two referenced originals and the exact neutral V0.1 copy are accepted; the original file has not changed.', frame: 'Isolated local comparator' }
};

export default function ProductionLocalComparator({ language = 'FR', onReturn }) {
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
    {onReturn && <button type="button" className="m3s-secondary-button mb-4 inline-flex min-h-11 items-center gap-2 px-3" disabled={state.status === 'loading'} onClick={() => {
      if (state.status !== 'ready' || window.confirm(t.confirm)) onReturn();
    }}><ArrowLeft size={18} aria-hidden="true"/>{({ FR: 'Retour à la fiche de l’outil', DE: 'Zurück zum Werkzeug-Eintrag', EN: 'Back to the tool entry' }[language] || 'Retour à la fiche de l’outil')}</button>}
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
