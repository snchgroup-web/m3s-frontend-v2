import React, { useEffect, useRef, useState } from 'react';
import { Pencil, FilePlus2, Trash2, RotateCcw, History, Download, Check, X } from 'lucide-react';
import api from './api';
import { useLanguage } from './LanguageContext';
import ActionConfirmationDialog from './ActionConfirmationDialog';

const copy = {
  FR: { rename: 'Modifier le titre', version: 'Nouvelle version', trash: 'Mettre à la corbeille', restore: 'Restaurer', history: 'Historique',
    title: 'Titre du document', file: 'Nouveau fichier', save: 'Enregistrer', cancel: 'Annuler', confirm: 'Confirmer', close: 'Fermer',
    trashBody: 'Le document sera placé dans la corbeille. Ses fichiers seront conservés et il pourra être restauré.',
    restoreBody: 'Restaurer ce document dans son dossier ?', versionBody: 'Ajouter ce fichier comme nouvelle version ? Les versions précédentes seront conservées.',
    renameBody: 'Enregistrer ce nouveau titre sans modifier le fichier original ?',
    failed: 'Action non confirmée. Actualise les documents avant de réessayer.', conflict: 'Le document a changé. Actualise avant de réessayer.',
    success: 'Modification enregistrée.', checking: 'Vérification du fichier…', approved: 'Fichier vérifié.',
    notApproved: 'Ce fichier doit être autorisé à l’import avant de pouvoir être ajouté comme version.',
    invalidVersion: 'Choisis un fichier différent, du même classement.', loading: 'Chargement…', download: 'Télécharger', import: 'Import initial' },
  EN: { rename: 'Edit title', version: 'New version', trash: 'Move to trash', restore: 'Restore', history: 'History',
    title: 'Document title', file: 'New file', save: 'Save', cancel: 'Cancel', confirm: 'Confirm', close: 'Close',
    trashBody: 'The document will move to trash. Its files will be retained and it can be restored.',
    restoreBody: 'Restore this document to its folder?', versionBody: 'Add this file as a new version? Previous versions will be retained.',
    renameBody: 'Save this title without changing the original file?', failed: 'Action not confirmed. Refresh documents before retrying.',
    conflict: 'The document has changed. Refresh before retrying.', success: 'Change saved.', checking: 'Checking file…', approved: 'File verified.',
    notApproved: 'This file must be approved for import before it can be added as a version.', invalidVersion: 'Choose a different file with the same classification.',
    loading: 'Loading…', download: 'Download', import: 'Initial import' },
  DE: { rename: 'Titel bearbeiten', version: 'Neue Version', trash: 'In den Papierkorb', restore: 'Wiederherstellen', history: 'Verlauf',
    title: 'Dokumenttitel', file: 'Neue Datei', save: 'Speichern', cancel: 'Abbrechen', confirm: 'Bestätigen', close: 'Schliessen',
    trashBody: 'Das Dokument wird in den Papierkorb verschoben. Die Dateien bleiben erhalten und können wiederhergestellt werden.',
    restoreBody: 'Dieses Dokument im Ordner wiederherstellen?', versionBody: 'Diese Datei als neue Version hinzufügen? Frühere Versionen bleiben erhalten.',
    renameBody: 'Diesen Titel speichern, ohne die Originaldatei zu ändern?', failed: 'Aktion nicht bestätigt. Dokumente vor erneutem Versuch aktualisieren.',
    conflict: 'Das Dokument wurde geändert. Bitte zuerst aktualisieren.', success: 'Änderung gespeichert.', checking: 'Datei wird geprüft…', approved: 'Datei geprüft.',
    notApproved: 'Diese Datei muss vor dem Hinzufügen als Version für den Import freigegeben werden.', invalidVersion: 'Eine andere Datei mit derselben Zuordnung auswählen.',
    loading: 'Wird geladen…', download: 'Herunterladen', import: 'Erster Import' }
};

export default function GedDocumentActions({ row, onChanged, onDownload, disabled }) {
  const { language } = useLanguage(); const t = copy[language] || copy.FR;
  const [mode, setMode] = useState(null); const [title, setTitle] = useState(row.title || row.name);
  const [file, setFile] = useState(null); const [candidate, setCandidate] = useState(null);
  const [notice, setNotice] = useState(null); const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false); const [events, setEvents] = useState(null);
  const invalidTitle = !title.trim() || Array.from(title).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127 || '<>'.includes(char));
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    const controller = new AbortController();
    if (!file || mode !== 'version') return () => controller.abort();
    setNotice('checking'); setCandidate(null);
    api.preparePrivateGedImport(file, row.category, { signal: controller.signal }).then(value => {
      if (controller.signal.aborted) return;
      if ([row.id, row.rootId].includes(value.id)) { setNotice('invalidVersion'); return; }
      setCandidate(value); setNotice('approved');
    }).catch(() => { if (!controller.signal.aborted) setNotice('notApproved'); });
    return () => controller.abort();
  }, [file, mode, row.category, row.id, row.rootId]);

  function open(nextMode) {
    setMode(nextMode); setTitle(row.title || row.name); setFile(null); setCandidate(null); setNotice(null); setEvents(null);
    setConfirming(['trash', 'restore'].includes(nextMode));
  }
  async function history() {
    if (active.current) return;
    open('history'); const controller = new AbortController(); active.current = controller; setBusy(true);
    try {
      const result = await api.getPrivateGedHistory(row, { signal: controller.signal });
      if (!controller.signal.aborted) setEvents(result);
    } catch { if (!controller.signal.aborted) setNotice('failed'); }
    finally { active.current = null; if (!controller.signal.aborted) setBusy(false); }
  }
  async function save() {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller; setBusy(true); setNotice(null);
    try {
      let command = { action: mode };
      if (mode === 'rename') command.title = title.trim();
      if (mode === 'version') {
        if (!candidate || !file) throw new Error('No version');
        await api.importPrivateGedDocument(file, candidate, { signal: controller.signal });
        command.versionId = candidate.id;
      }
      await api.mutatePrivateGedDocument(row, command, { signal: controller.signal });
      if (!controller.signal.aborted) { setConfirming(false); setMode(null); setNotice('success'); onChanged(); }
    } catch (error) {
      if (!controller.signal.aborted) { setConfirming(false); setNotice(error.code === 'GED_VERSION_CONFLICT' ? 'conflict' : 'failed'); }
    } finally { active.current = null; if (!controller.signal.aborted) setBusy(false); }
  }
  const button = (action, Icon, click = () => open(action)) => <button type="button" key={action}
    className={action === 'trash' ? 'm3s-danger-button' : 'm3s-secondary-button'} aria-label={`${t[action]} ${row.title || row.name}`}
    title={t[action]} disabled={disabled || busy} onClick={click}><Icon size={18} aria-hidden="true"/></button>;
  return <div className="ged-lifecycle">
    <div className="private-ged-actions">{row.trashed ? button('restore', RotateCcw) : <>{button('rename', Pencil)}{button('version', FilePlus2)}{button('trash', Trash2)}</>}
      {button('history', History, history)}</div>
    {['rename', 'version'].includes(mode) && <form className="private-ged-import" aria-label={t[mode]} onSubmit={event => { event.preventDefault(); setConfirming(true); }}>
      {mode === 'rename' ? <label>{t.title}<input value={title} maxLength={140} required disabled={busy}
        onChange={event => setTitle(event.target.value)}/></label> : <label>{t.file}<input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png" disabled={busy}
        onChange={event => { setCandidate(null); setFile(event.target.files?.[0] || null); }}/></label>}
      <div className="private-ged-actions"><button type="submit" className="m3s-primary-button" disabled={busy || (mode === 'rename' ? invalidTitle : !candidate)}><Check size={18}/>{t.save}</button>
        <button type="button" className="m3s-secondary-button" disabled={busy} onClick={() => { setMode(null); setNotice(null); }}><X size={18}/>{t.cancel}</button></div>
    </form>}
    {mode === 'history' && <section className="ged-history" aria-label={t.history}>
      <h4>{t.history}</h4>{busy && <p role="status">{t.loading}</p>}
      {events && <ol>{events.map(event => <li key={event.revision}><span>{event.revision} · {t[event.action] || event.action} · {event.title}</span>
        <time>{new Intl.DateTimeFormat({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(event.createdAt))}</time>
        <button type="button" className="m3s-secondary-button" disabled={disabled || busy} title={t.download} aria-label={`${t.download} ${event.document.name}, ${event.revision}`}
          onClick={() => onDownload(event.document)}><Download size={18}/></button></li>)}</ol>}
      <button type="button" className="m3s-secondary-button" disabled={busy} onClick={() => setMode(null)}><X size={18}/>{t.close}</button>
    </section>}
    {notice && <p role={['failed','conflict','notApproved','invalidVersion'].includes(notice) ? 'alert' : 'status'}>{t[notice]}</p>}
    {confirming && <ActionConfirmationDialog id={`ged-${row.rootId}`} title={t[mode]} body={t[`${mode}Body`]}
      cancelLabel={t.cancel} confirmLabel={t.confirm} action={mode === 'trash' ? 'delete' : 'update'} busy={busy}
      onCancel={() => { setConfirming(false); if (['trash','restore'].includes(mode)) setMode(null); }} onConfirm={save}/>}
  </div>;
}
