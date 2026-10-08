import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Eye, X, Download } from 'lucide-react';
const PdfDocumentPreview = lazy(() => import('../PdfDocumentPreview'));

const copy = {
  FR: { title: 'Projets de contrat', draft: 'Brouillon · non signable', loading: 'Chargement…',
    empty: 'Aucun projet consultable', error: 'Documents indisponibles ou accès non autorisé',
    open: 'Afficher le projet de contrat', close: 'Refermer le document', download: 'Télécharger le document' },
  EN: { title: 'Contract drafts', draft: 'Draft · not ready for signature', loading: 'Loading…',
    empty: 'No draft available to view', error: 'Documents unavailable or access denied',
    open: 'View contract draft', close: 'Close document', download: 'Download document' },
  DE: { title: 'Vertragsentwürfe', draft: 'Entwurf · nicht unterschriftsreif', loading: 'Wird geladen…',
    empty: 'Kein einsehbarer Entwurf', error: 'Dokumente nicht verfügbar oder Zugriff verweigert',
    open: 'Vertragsentwurf anzeigen', close: 'Dokument schließen', download: 'Dokument herunterladen' }
};
const hash = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
export function validateContractList(value, employeeId, revision) {
  if (!value || Object.keys(value).sort().join(',') !== 'documents,dossierRevision,employeeId' ||
      value.employeeId !== employeeId || value.dossierRevision !== revision || !Array.isArray(value.documents) || value.documents.length > 100) throw Error();
  const seen = new Set();
  for (const d of value.documents) {
    if (!d || Object.keys(d).sort().join(',') !== 'byteSize,documentId,versionId' || !hash(d.documentId) || !hash(d.versionId) ||
        !Number.isInteger(d.byteSize) || d.byteSize < 10 || d.byteSize > 1048576 || seen.has(`${d.documentId}:${d.versionId}`)) throw Error();
    seen.add(`${d.documentId}:${d.versionId}`);
  }
  return value.documents;
}

export default function ContractDocuments({ employeeId, revision, transport, language='FR' }) {
  const t = copy[language] || copy.FR;
  const context = `${employeeId}:${revision}`;
  const [list, setList] = useState(null);
  const [selected, setSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  const prefix = `/employees/${employeeId}/contract-documents`;
  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setList({context,transport,status:'loading'}); setSelected(null); setPreview(null);
    (async () => {
      try {
        const response = await transport(`${prefix}?dossierRevision=${revision}`,{method:'GET',signal:controller.signal});
        if (response.status !== 200) throw Error();
        const documents = validateContractList(await response.json(),employeeId,revision);
        if (!disposed && !controller.signal.aborted) setList({context,transport,status:'available',documents});
      } catch { if (!disposed) setList({context,transport,status:'error'}); }
      finally { clearTimeout(timeout); }
    })();
    return () => { disposed=true; controller.abort(); clearTimeout(timeout); };
  }, [context, employeeId, revision, prefix, transport]);
  useEffect(() => {
    if (!selected || selected.context !== context || selected.transport !== transport) return undefined;
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 20000);
    setPreview({selected,status:'loading'});
    (async () => {
      try {
        const d = selected.document;
        const response = await transport(`${prefix}/${d.documentId}/versions/${d.versionId}?dossierRevision=${revision}`,
          {method:'GET',signal:controller.signal});
        if (response.status !== 200 || response.headers?.get('content-type')?.split(';')[0] !== 'application/pdf') throw Error();
        const blob = await response.blob();
        if (blob.size !== d.byteSize || blob.size > 1048576 || blob.type !== 'application/pdf') throw Error();
        if (!disposed && !controller.signal.aborted) setPreview({selected,status:'available',blob});
      } catch { if (!disposed) setPreview({selected,status:'error'}); }
      finally { clearTimeout(timeout); }
    })();
    return () => { disposed=true; controller.abort(); clearTimeout(timeout); };
  }, [selected, context, prefix, revision, transport]);
  const current = list?.context === context && list.transport === transport ? list : null;
  const opened = selected?.context === context && selected.transport === transport;
  const visible = opened && preview?.selected === selected ? preview : null;
  useEffect(() => { if (opened) closeButton.current?.focus(); }, [opened]);
  const close = () => {setSelected(null);setPreview(null);trigger.current?.focus();};
  const icon = (Icon, label, action, props={}) => <button {...props} type="button" className="m3s-icon-button" title={label}
    aria-label={label} onClick={action}><Icon size={18} aria-hidden="true"/></button>;
  const download = () => {
    if (!visible?.blob) return;
    const url = URL.createObjectURL(visible.blob);
    const a = document.createElement('a'); a.href=url; a.download='2SG-projet-contrat.pdf'; a.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  };
  return <section className="mt-4 space-y-3" aria-label={t.title}>
    <h3 className="text-sm font-semibold">{t.title}</h3>
    {!current || current.status === 'loading' ? <p role="status">{t.loading}</p> : current.status === 'error' ?
      <p role="alert">{t.error}</p> : current.documents.length === 0 ? <p>{t.empty}</p> :
      <ul>{current.documents.map(d => <li key={`${d.documentId}:${d.versionId}`} className="flex items-center justify-between gap-3 py-2 border-b">
        <span className="text-sm">PDF · {t.draft}</span>
        {icon(Eye,t.open,event => {trigger.current=event.currentTarget;setSelected({context,transport,document:d});})}
      </li>)}</ul>}
    {opened && <div className="space-y-2" onKeyDown={event => {if(event.key==='Escape'){event.stopPropagation();close();}}}>
      <div className="flex justify-end gap-2">
        {visible?.status === 'available' && icon(Download,t.download,download)}
        {icon(X,t.close,close,{ref:closeButton})}
      </div>
      {!visible || visible.status === 'loading' ? <p role="status">{t.loading}</p> : visible.status === 'error' ?
        <p role="alert">{t.error}</p> : <Suspense fallback={<p role="status">{t.loading}</p>}>
          <PdfDocumentPreview blob={visible.blob} name={t.title} language={language}/></Suspense>}
    </div>}
  </section>;
}
