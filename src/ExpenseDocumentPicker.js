import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FileCheck2, FileUp, Paperclip } from 'lucide-react';
import api from './api';
import { useLanguage } from './LanguageContext';

const copy = {
  FR: {
    title: 'Justificatif (facultatif)', none: 'Aucun justificatif', existing: 'Document financier existant',
    import: 'Importer un fichier approuvé', document: 'Document', choose: 'Choisir un document', file: 'Fichier',
    role: 'Type de justificatif', reference: 'Référence externe', invoice: 'Facture', payment_receipt: 'Reçu de paiement',
    transfer_receipt: 'Reçu de transfert', other: 'Autre', loading: 'Chargement des documents…', empty: 'Aucun document financier disponible.',
    disabled: 'Le rattachement de justificatifs n’est pas disponible.', checking: 'Vérification du fichier…',
    ready: 'Fichier approuvé. Il sera importé après l’enregistrement de la dépense.',
    existingFile: 'Fichier déjà enregistré. Il sera rattaché après l’enregistrement de la dépense.',
    invalid: 'Ce fichier ne peut pas être rattaché. Choisissez uniquement un fichier approuvé.', error: 'Documents momentanément indisponibles.'
  },
  EN: {
    title: 'Supporting document (optional)', none: 'No supporting document', existing: 'Existing financial document',
    import: 'Import an approved file', document: 'Document', choose: 'Choose a document', file: 'File',
    role: 'Document type', reference: 'External reference', invoice: 'Invoice', payment_receipt: 'Payment receipt',
    transfer_receipt: 'Transfer receipt', other: 'Other', loading: 'Loading documents…', empty: 'No financial document available.',
    disabled: 'Supporting-document attachment is unavailable.', checking: 'Checking file…',
    ready: 'Approved file. It will be imported after the expense is saved.',
    existingFile: 'File already registered. It will be attached after the expense is saved.',
    invalid: 'This file cannot be attached. Choose an approved file only.', error: 'Documents are temporarily unavailable.'
  },
  DE: {
    title: 'Beleg (optional)', none: 'Kein Beleg', existing: 'Vorhandenes Finanzdokument',
    import: 'Freigegebene Datei importieren', document: 'Dokument', choose: 'Dokument auswählen', file: 'Datei',
    role: 'Belegart', reference: 'Externe Referenz', invoice: 'Rechnung', payment_receipt: 'Zahlungsbeleg',
    transfer_receipt: 'Überweisungsbeleg', other: 'Sonstige', loading: 'Dokumente werden geladen…', empty: 'Kein Finanzdokument verfügbar.',
    disabled: 'Das Verknüpfen von Belegen ist nicht verfügbar.', checking: 'Datei wird geprüft…',
    ready: 'Freigegebene Datei. Sie wird nach dem Speichern der Ausgabe importiert.',
    existingFile: 'Datei bereits registriert. Sie wird nach dem Speichern der Ausgabe verknüpft.',
    invalid: 'Diese Datei kann nicht verknüpft werden. Wählen Sie nur eine freigegebene Datei.', error: 'Dokumente sind vorübergehend nicht verfügbar.'
  }
};

const roles = ['invoice', 'payment_receipt', 'transfer_receipt', 'credit_note', 'other'];
const attachmentError = code => Object.assign(new Error(code), { code });

export async function saveExpenseAttachment(expenseId, selection, { signal, kind = 'expense' } = {}) {
  if (!selection) return null;
  let versionId = selection.record?.id;
  const expectedRootId = selection.record?.rootId;

  if (selection.file || selection.candidate) {
    if (!selection.file || !selection.candidate) throw attachmentError('GED_ATTACHMENT_NOT_READY');
    const imported = await api.importPrivateGedDocument(selection.file, selection.candidate, { signal });
    versionId = imported?.document?.id;
  }
  if (!/^[a-f0-9]{64}$/.test(versionId || '')) throw attachmentError('GED_ATTACHMENT_NOT_READY');

  const scope = kind === 'income' ? { kind } : {};
  const current = await api.getExpenseAttachmentOptions({ signal, ...scope });
  if (!current.enabled) throw attachmentError('GED_EXPENSE_ATTACH_DISABLED');
  const record = current.documents.find(row => row.id === versionId && row.lifecycle === true && row.trashed === false &&
    row.category === 'finance' && /^[a-f0-9]{64}$/.test(row.rootId || '') && (!expectedRootId || row.rootId === expectedRootId));
  if (!record) throw attachmentError('GED_VERSION_CONFLICT');

  const result = await api.attachExpenseDocument(expenseId, {
    documentId: record.rootId,
    versionId: record.id,
    documentRole: selection.documentRole,
    ...(selection.externalReference?.trim() ? { externalReference: selection.externalReference.trim() } : {})
  }, { signal, ...scope });
  if (result?.success !== true || typeof result.created !== 'boolean') throw attachmentError('GED_UNAVAILABLE');
  return result;
}

export default function ExpenseDocumentPicker({ value, onChange, onReadyChange, disabled = false, kind = 'expense' }) {
  const { language } = useLanguage();
  const t = useMemo(() => {
  const incomeCopy = {
    FR: { ready: 'Fichier approuvé. Il sera importé après l’enregistrement de la recette.', existingFile: 'Fichier déjà enregistré. Il sera rattaché après l’enregistrement de la recette.' },
    EN: { ready: 'Approved file. It will be imported after the income is saved.', existingFile: 'File already registered. It will be attached after the income is saved.' },
    DE: { ready: 'Freigegebene Datei. Sie wird nach dem Speichern der Einnahme importiert.', existingFile: 'Datei bereits registriert. Sie wird nach dem Speichern der Einnahme verknüpft.' }
  };
  return { ...(copy[language] || copy.FR), credit_note: ({ FR: 'Avoir', EN: 'Credit note', DE: 'Gutschrift' })[language] || 'Avoir', ...(kind === 'income' ? incomeCopy[language] || incomeCopy.FR : {}) };
  }, [language, kind]);
  const [internalValue, setInternalValue] = useState(value || null);
  const currentValue = value === undefined ? internalValue : value;
  const [mode, setMode] = useState(currentValue?.file ? 'import' : currentValue?.record ? 'existing' : 'none');
  const [role, setRole] = useState(value?.documentRole || 'invoice');
  const [reference, setReference] = useState(value?.externalReference || '');
  const metadata = useRef({ role, reference });
  metadata.current = { role, reference };
  const attachmentApiAvailable = typeof api.getExpenseAttachmentOptions === 'function';
  const [options, setOptions] = useState(() => ({ status: attachmentApiAvailable ? 'loading' : 'error', enabled: false, documents: [] }));
  const [file, setFile] = useState(value?.file || null);
  const [candidate, setCandidate] = useState(value?.candidate ? { status: 'ready', record: value.candidate } : { status: 'idle' });
  const selectedRoot = currentValue?.record?.rootId || '';
  const unavailable = disabled || options.status !== 'ready' || !options.enabled;
  const statusText = useMemo(() => {
    if (options.status === 'loading') return t.loading;
    if (options.status === 'error') return t.error;
    if (!options.enabled) return t.disabled;
    if (mode === 'existing' && !options.documents.length) return t.empty;
    if (mode === 'import' && candidate.status === 'checking') return t.checking;
    if (mode === 'import' && candidate.status === 'ready') return candidate.record.existing ? t.existingFile : t.ready;
    if (mode === 'import' && candidate.status === 'error') return t.invalid;
    return '';
  }, [candidate, mode, options, t]);

  function emitChange(nextValue) {
    if (value === undefined) setInternalValue(nextValue);
    onChange(nextValue);
  }

  useEffect(() => {
    if (mode === 'none') emitChange(null);
    onReadyChange?.(mode === 'none');
    if (!attachmentApiAvailable) return undefined;
    const controller = new AbortController();
    api.getExpenseAttachmentOptions({ signal: controller.signal, ...(kind === 'income' ? { kind } : {}) }).then(result => {
      if (controller.signal.aborted) return;
      setOptions({ status: 'ready', ...result });
      onReadyChange?.(mode === 'none' || Boolean(currentValue));
    }).catch(() => {
      if (controller.signal.aborted) return;
      setOptions({ status: 'error', enabled: false, documents: [] });
      emitChange(null);
      onReadyChange?.(mode === 'none');
    });
    return () => controller.abort();
    // Availability is intentionally read once for each form opening.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The picker owns one availability snapshot per form opening.

  useEffect(() => {
    if (mode !== 'import' || !file || options.status !== 'ready' || !options.enabled) return undefined;
    const controller = new AbortController();
    setCandidate({ status: 'checking' });
    emitChange(null);
    onReadyChange?.(false);
    api.preparePrivateGedImport(file, 'finance', { signal: controller.signal }).then(record => {
      if (controller.signal.aborted) return;
      setCandidate({ status: 'ready', record });
      emitChange({ record: null, file, candidate: record, documentRole: metadata.current.role, externalReference: metadata.current.reference });
      onReadyChange?.(true);
    }).catch(() => {
      if (controller.signal.aborted) return;
      setCandidate({ status: 'error' });
      emitChange(null);
      onReadyChange?.(false);
    });
    return () => controller.abort();
    // File approval is tied to this file and the current capability snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, mode, options.enabled, options.status]);

  function chooseMode(nextMode) {
    setMode(nextMode);
    setFile(null);
    setCandidate({ status: 'idle' });
    emitChange(null);
    onReadyChange?.(nextMode === 'none');
  }

  function chooseExisting(rootId) {
    const record = options.documents.find(row => row.rootId === rootId);
    emitChange(record ? { record, documentRole: role, externalReference: reference } : null);
    onReadyChange?.(Boolean(record));
  }

  function updateMetadata(nextRole, nextReference) {
    setRole(nextRole);
    setReference(nextReference);
    if (currentValue) emitChange({ ...currentValue, documentRole: nextRole, externalReference: nextReference });
  }

  return <fieldset className="border-t border-slate-600 pt-4 space-y-3" disabled={disabled}>
    <legend className="px-1 font-semibold flex items-center gap-2"><Paperclip size={18} aria-hidden="true"/>{t.title}</legend>
    <div className="grid gap-2 sm:grid-cols-3">
      {[['none', t.none], ['existing', t.existing], ['import', t.import]].map(([key, label]) => <label key={key} className="flex items-start gap-2 text-sm">
        <input type="radio" name="expense-document-mode" value={key} checked={mode === key}
          disabled={disabled || (key !== 'none' && unavailable)} onChange={() => chooseMode(key)}/>
        <span>{label}</span>
      </label>)}
    </div>
    {mode === 'existing' && <label className="block text-sm">
      <span className="block mb-1">{t.document}</span>
      <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" value={selectedRoot}
        disabled={unavailable || !options.documents.length} onChange={event => chooseExisting(event.target.value)}>
        <option value="">{t.choose}</option>
        {options.documents.map(row => <option key={row.rootId} value={row.rootId}>{row.title || row.name}</option>)}
      </select>
    </label>}
    {mode === 'import' && <label className="block text-sm">
      <span className="block mb-1">{t.file}</span>
      <span className="flex min-w-0 items-center gap-2"><FileUp className="shrink-0" size={18} aria-hidden="true"/><input className="min-w-0 w-full" type="file" accept=".pdf,.docx,.jpg,.jpeg,.png"
        disabled={unavailable} onChange={event => {
          const nextFile = event.target.files?.[0] || null;
          setCandidate({ status: 'idle' }); setFile(nextFile);
          if (!nextFile) { emitChange(null); onReadyChange?.(false); }
        }}/></span>
    </label>}
    {mode !== 'none' && options.enabled && <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-sm"><span className="block mb-1">{t.role}</span>
        <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" value={role}
          onChange={event => updateMetadata(event.target.value, reference)}>{roles.map(item => <option key={item} value={item}>{t[item]}</option>)}</select>
      </label>
      <label className="text-sm"><span className="block mb-1">{t.reference}</span>
        <input className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white" type="text" maxLength={140} value={reference}
          onChange={event => updateMetadata(role, event.target.value)}/>
      </label>
    </div>}
    {statusText && <p role={candidate.status === 'error' ? 'alert' : 'status'} className="text-sm flex items-start gap-2">
      {candidate.status === 'ready' ? <FileCheck2 size={18} aria-hidden="true"/> : null}<span>{statusText}</span>
    </p>}
  </fieldset>;
}
