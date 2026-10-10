import React, { useEffect, useRef, useState } from 'react';
import { Download, FileText, LockKeyhole, RefreshCw, Upload, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import api from './api';
import GedDocumentActions from './GedDocumentActions';

const messages = {
  FR: { title: 'Documents à accès restreint', refresh: 'Actualiser les documents', loading: 'Chargement des documents…',
    empty: 'Aucun document enregistré.', denied: 'Aucun accès aux documents privés pour ce compte.',
    disabled: 'Les documents privés ne sont pas encore disponibles.', error: 'Les documents sont momentanément indisponibles.',
    download: 'Télécharger', downloading: 'Téléchargement en cours…', failed: 'Le téléchargement a échoué. Réessaie.',
    done: 'Téléchargement préparé.', size: 'Ko', personal: 'Dossier personnel', finance: 'Documents financiers 2SG', unclassified: 'Classement à préciser',
    correspondence: 'Courrier restreint', add: 'Importer un document', file: 'Fichier', category: 'Classement', cancel: 'Annuler', confirm: 'Confirmer l’import', checking: 'Vérification du fichier…',
    importing: 'Import en cours…', imported: 'Document enregistré et relu avec succès.', existing: 'Ce document est déjà enregistré.', ready: 'Fichier vérifié, prêt à importer.',
    importFailed: 'Import non confirmé. Actualise les documents avant de réessayer.', invalid: 'Format PDF, Word (.docx), JPEG ou PNG requis.',
    tooLarge: 'Le fichier doit contenir entre 10 octets et 5 Mio.', notApproved: 'Ce fichier ne fait pas encore partie des documents autorisés à l’import.',
    mismatch: 'Ce classement ne correspond pas au classement autorisé pour ce fichier.', checkFailed: 'La vérification du fichier a échoué.' },
  EN: { title: 'Restricted-access documents', refresh: 'Refresh documents', loading: 'Loading documents…',
    empty: 'No documents registered.', denied: 'This account has no access to private documents.',
    disabled: 'Private documents are not available yet.', error: 'Documents are temporarily unavailable.',
    download: 'Download', downloading: 'Downloading…', failed: 'Download failed. Please try again.',
    done: 'Download prepared.', size: 'KB', personal: 'Personal folder', finance: '2SG financial documents', unclassified: 'Classification pending',
    correspondence: 'Restricted correspondence', add: 'Import a document', file: 'File', category: 'Classification', cancel: 'Cancel', confirm: 'Confirm import', checking: 'Checking file…',
    importing: 'Importing…', imported: 'Document saved and successfully read back.', existing: 'This document is already registered.', ready: 'File verified, ready to import.',
    importFailed: 'Import not confirmed. Refresh documents before retrying.', invalid: 'A PDF, Word (.docx), JPEG or PNG file is required.',
    tooLarge: 'File size must be between 10 bytes and 5 MiB.', notApproved: 'This file has not yet been approved for import.',
    mismatch: 'This classification does not match the approved classification for this file.', checkFailed: 'File verification failed.' },
  DE: { title: 'Zugriffsgeschützte Dokumente', refresh: 'Dokumente aktualisieren', loading: 'Dokumente werden geladen…',
    empty: 'Keine Dokumente registriert.', denied: 'Dieses Konto hat keinen Zugriff auf private Dokumente.',
    disabled: 'Private Dokumente sind noch nicht verfügbar.', error: 'Dokumente sind vorübergehend nicht verfügbar.',
    download: 'Herunterladen', downloading: 'Download läuft…', failed: 'Download fehlgeschlagen. Bitte erneut versuchen.',
    done: 'Download vorbereitet.', size: 'KB', personal: 'Persönlicher Ordner', finance: '2SG-Finanzdokumente', unclassified: 'Zuordnung offen',
    correspondence: 'Geschützte Korrespondenz', add: 'Dokument importieren', file: 'Datei', category: 'Zuordnung', cancel: 'Abbrechen', confirm: 'Import bestätigen', checking: 'Datei wird geprüft…',
    importing: 'Import läuft…', imported: 'Dokument gespeichert und erfolgreich erneut gelesen.', existing: 'Dieses Dokument ist bereits registriert.', ready: 'Datei geprüft, bereit zum Import.',
    importFailed: 'Import nicht bestätigt. Dokumente vor einem erneuten Versuch aktualisieren.', invalid: 'Eine PDF-, Word- (.docx), JPEG- oder PNG-Datei ist erforderlich.',
    tooLarge: 'Die Datei muss zwischen 10 Byte und 5 MiB gross sein.', notApproved: 'Diese Datei ist noch nicht für den Import freigegeben.',
    mismatch: 'Diese Zuordnung entspricht nicht der freigegebenen Zuordnung der Datei.', checkFailed: 'Dateiprüfung fehlgeschlagen.' }
};

export default function PrivateGedDocuments({ scope = 'all' }) {
  const { language } = useLanguage();
  const t = messages[language] || messages.FR;
  const scoped = ['personal', 'finance', 'correspondence'].includes(scope);
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ status: 'loading', rows: [] });
  const [busy, setBusy] = useState(null);
  const [notice, setNotice] = useState(null);
  const [trash, setTrash] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(scoped ? scope : 'personal');
  const [candidate, setCandidate] = useState({ status: 'idle' });
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', rows: [] });
    Promise.resolve().then(() => api.getPrivateGedDocuments({ signal: controller.signal })).then(rows => {
      if (!controller.signal.aborted) setState({ status: 'ready', rows });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ rows: [], status: error.status === 403 ? 'denied' :
        error.code === 'GED_NOT_ENABLED' ? 'disabled' : 'error' });
    });
    return () => controller.abort();
  }, [revision]);

  useEffect(() => {
    const controller = new AbortController();
    if (!importOpen || !file) { setCandidate({ status: 'idle' }); return () => controller.abort(); }
    setCandidate({ status: 'checking' });
    api.preparePrivateGedImport(file, category, { signal: controller.signal }).then(record => {
      if (!controller.signal.aborted) setCandidate({ status: record.existing ? 'existing' : 'ready', record });
    }).catch(error => {
      if (!controller.signal.aborted) setCandidate({ status: 'error', message: {
        GED_FORMAT_REQUIRED: 'invalid', GED_TOO_LARGE: 'tooLarge', GED_DOCUMENT_NOT_APPROVED: 'notApproved',
        GED_CATEGORY_MISMATCH: 'mismatch'
      }[error.code] || 'checkFailed' });
    });
    return () => controller.abort();
  }, [importOpen, file, category]);

  async function importDocument(event) {
    event.preventDefault();
    if (active.current || candidate.status !== 'ready') return;
    const controller = new AbortController();
    active.current = controller; setBusy('import'); setNotice(null);
    try {
      const result = await api.importPrivateGedDocument(file, candidate.record, { signal: controller.signal });
      if (controller.signal.aborted) return;
      setImportOpen(false); setFile(null); setNotice(result.created ? 'imported' : 'existing');
      setRevision(value => value + 1);
    } catch {
      if (!controller.signal.aborted) setNotice('importFailed');
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setBusy(null);
    }
  }

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

  const classified = scoped ? state.rows.filter(row => row.category === scope) : state.rows;
  const rows = classified.filter(row => !!row.trashed === trash);
  const trashText = { FR: ['Documents', 'Corbeille'], EN: ['Documents', 'Trash'], DE: ['Dokumente', 'Papierkorb'] }[language] || ['Documents', 'Corbeille'];
  const changedText = { FR: 'Modification enregistrée.', EN: 'Change saved.', DE: 'Änderung gespeichert.' }[language] || 'Modification enregistrée.';
  return <section className="private-ged" aria-labelledby="private-ged-title" aria-busy={state.status === 'loading'}>
    <div className={scope === 'finance' ? 'private-ged-toolbar private-ged-toolbar-sticky' : 'private-ged-toolbar'}>
    <div className="private-ged-heading"><h3 id="private-ged-title"><LockKeyhole size={18} aria-hidden="true"/>{scoped ? t[scope] : t.title}</h3>
      <div className="private-ged-actions"><button className="m3s-secondary-button" disabled={state.status !== 'ready' || !!busy || importOpen}
        onClick={() => { setNotice(null); setFile(null); setCategory(scoped ? scope : 'personal'); setImportOpen(true); }}><Upload size={18} aria-hidden="true"/>{t.add}</button>
      <button className="m3s-secondary-button" aria-label={t.refresh} title={t.refresh}
        disabled={state.status === 'loading' || !!busy} onClick={() => { setNotice(null); setRevision(value => value + 1); }}><RefreshCw size={18}/></button>
      </div>
    </div>
    {classified.some(row => row.lifecycle) && <div className="private-ged-actions" role="group" aria-label={t.title}>
      {trashText.map((label, index) => <button key={label} className="m3s-secondary-button" type="button" aria-pressed={trash === !!index}
        disabled={!!busy} onClick={() => setTrash(!!index)}>{label}</button>)}
    </div>}
    </div>
    {importOpen && <form className="private-ged-import" onSubmit={importDocument} aria-label={t.add}>
      <label htmlFor="ged-category">{t.category}</label>
      <select id="ged-category" value={category} disabled={!!busy || scoped} onChange={event => { setCandidate({ status: 'idle' }); setCategory(event.target.value); }}>
        <option value="personal">{t.personal}</option><option value="finance">{t.finance}</option><option value="correspondence">{t.correspondence}</option>
      </select>
      <label htmlFor="ged-file">{t.file}</label>
      <input id="ged-file" type="file" accept={scope === 'correspondence' ? '.pdf' : '.pdf,.docx,.jpg,.jpeg,.png'} disabled={!!busy} onChange={event => {
        setNotice(null); setCandidate({ status: 'idle' }); setFile(event.target.files?.[0] || null);
      }}/>
      {candidate.status !== 'idle' && <p role={candidate.status === 'error' ? 'alert' : 'status'}>{t[candidate.message || candidate.status]}</p>}
      <div className="private-ged-actions"><button type="submit" className="m3s-secondary-button" disabled={!!busy || candidate.status !== 'ready'}><Upload size={18} aria-hidden="true"/>{t.confirm}</button>
        <button type="button" className="m3s-secondary-button" disabled={!!busy} onClick={() => { setImportOpen(false); setFile(null); }}><X size={18} aria-hidden="true"/>{t.cancel}</button></div>
    </form>}
    {state.status !== 'ready' && <p role={state.status === 'error' ? 'alert' : 'status'}>{t[state.status]}</p>}
    {state.status === 'ready' && (rows.length ? <ul className="private-ged-list">{rows.map(row =>
      <li key={row.rootId || row.id} className="ged-document-row"><FileText size={21} aria-hidden="true"/><div className="private-ged-file"><span>{row.title || row.name}</span>
        <small>{t[row.category] || t.unclassified} · {row.name.endsWith('.docx') ? 'Word' : row.name.split('.').pop().toUpperCase()} · {new Intl.NumberFormat({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH', { maximumFractionDigits: 1 }).format(row.size / 1024)} {t.size}</small></div>
        <button className="m3s-secondary-button" aria-label={`${t.download} ${row.name}`} title={`${t.download} ${row.name}`}
          disabled={!!busy} onClick={() => download(row)}><Download size={19}/></button>
        {row.lifecycle && <GedDocumentActions key={`${row.rootId}-${row.revision}`} row={row} disabled={!!busy} onDownload={download}
          onChanged={() => { setNotice('changed'); setRevision(value => value + 1); }}/>}
      </li>
    )}</ul> : <p>{t.empty}</p>)}
    {busy && <p role="status">{t[busy === 'import' ? 'importing' : 'downloading']}</p>}
    {notice && <p role={['failed', 'importFailed'].includes(notice) ? 'alert' : 'status'}>{notice === 'changed' ? changedText : t[notice]}</p>}
  </section>;
}
