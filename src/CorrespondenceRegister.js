import React, { useEffect, useMemo, useState } from 'react';
import { Database, Edit2, FileInput, FileLock2, HardDrive, Loader2, Plus, Search, ShieldAlert, Trash2, X } from 'lucide-react';
import api from './api';
import { useAuth } from './AuthContext';
import { correspondenceFromApi, correspondenceToApi, isDemoSession } from './administrationRegistryAdapters';
import ActionConfirmationDialog from './ActionConfirmationDialog';

const STORAGE_KEY_PREFIX = 'm3s-administration-correspondence-v1';

const COPY = {
  FR: {
    title: 'Registre local du courrier', intro: 'Enregistrer uniquement les métadonnées de suivi. Une pièce personnelle, comme un CV reçu via WhatsApp, doit d’abord être classée dans la GED/RH restreinte ; le registre conserve ensuite sa référence, jamais son contenu.',
    add: 'Ajouter un courrier', cvPreset: 'Préparer une réception de CV', search: 'Rechercher dans le registre', empty: 'Aucun courrier enregistré.', edit: 'Modifier', delete: 'Supprimer', close: 'Fermer', cancel: 'Annuler', save: 'Enregistrer', update: 'Modifier', required: 'Complétez les champs obligatoires.', confirmSave: 'Confirmer l’enregistrement de ces métadonnées ?', confirmDelete: 'Confirmer la suppression de cette entrée ?', saved: 'Courrier enregistré avec succès.', deleted: 'Courrier supprimé avec succès.', saveFailed: 'Enregistrement impossible. Vérifiez vos droits ou réessayez.', deleteFailed: 'Suppression impossible. Vérifiez vos droits ou réessayez.', security: 'Aucun fichier ni contenu du CV n’est stocké dans ce registre.',
    confirmCreateTitle: 'Confirmer l’ajout', confirmCreate: 'Oui, ajouter', confirmUpdateTitle: 'Confirmer la modification', confirmUpdate: 'Oui, modifier', confirmDeleteTitle: 'Confirmer la suppression', confirmDeleteAction: 'Oui, supprimer', decline: 'Non', confirmCreateBody: 'Ajouter « {subject} » au registre du courrier ?', confirmUpdateBody: 'Enregistrer les modifications de « {subject} » ?', confirmDeleteBody: 'Supprimer « {subject} » du registre du courrier ?',
    fields: { date: 'Date de réception', direction: 'Sens', channel: 'Canal', sender: 'Expéditeur', recipient: 'Destinataire 2SG', subject: 'Objet', category: 'Catégorie', confidentiality: 'Confidentialité', person: 'Personne ou dossier lié', ged: 'Référence GED/RH', evidence: 'Preuve de réception', owner: 'Responsable du suivi', next: 'Prochaine action', status: 'Statut', deadline: 'Échéance' },
    directions: ['Entrant', 'Sortant', 'Interne'], channels: ['WhatsApp', 'E-mail', 'Courrier papier', 'Formulaire', 'Remise en main propre'], categories: ['Ressources humaines', 'Institutionnel', 'Fournisseur', 'Juridique', 'Projet'], confidentiality: ['Public', 'Interne', 'Restreint RH', 'Confidentiel'], statuses: ['À qualifier', 'À classer dans la GED', 'En traitement', 'Clos'],
    cvSubject: 'CV reçu via WhatsApp', cvNext: 'Classer le fichier dans la GED/RH restreinte, puis compléter la référence.'
  },
  EN: {
    title: 'Correspondence register', intro: 'Record tracking metadata only. A personal file such as a CV received through WhatsApp must first be stored in the restricted HR DMS; the register then retains its reference, never its content.', add: 'Add correspondence', cvPreset: 'Prepare a CV receipt', search: 'Search the register', empty: 'No correspondence recorded.', edit: 'Edit', delete: 'Delete', close: 'Close', cancel: 'Cancel', save: 'Save', update: 'Update', required: 'Complete the required fields.', confirmSave: 'Confirm saving this metadata?', confirmDelete: 'Confirm deletion of this entry?', saved: 'Correspondence saved successfully.', deleted: 'Correspondence deleted successfully.', saveFailed: 'Unable to save. Check your permissions or try again.', deleteFailed: 'Unable to delete. Check your permissions or try again.', security: 'No CV file or content is stored in this register.', fields: { date: 'Receipt date', direction: 'Direction', channel: 'Channel', sender: 'Sender', recipient: '2SG recipient', subject: 'Subject', category: 'Category', confidentiality: 'Confidentiality', person: 'Linked person or file', ged: 'HR/DMS reference', evidence: 'Receipt evidence', owner: 'Follow-up owner', next: 'Next action', status: 'Status', deadline: 'Deadline' }, directions: ['Incoming', 'Outgoing', 'Internal'], channels: ['WhatsApp', 'Email', 'Paper mail', 'Form', 'Hand delivery'], categories: ['Human resources', 'Institutional', 'Supplier', 'Legal', 'Project'], confidentiality: ['Public', 'Internal', 'Restricted HR', 'Confidential'], statuses: ['To qualify', 'To file in DMS', 'In progress', 'Closed'], cvSubject: 'CV received through WhatsApp', cvNext: 'Store the file in the restricted HR DMS, then complete its reference.',
    confirmCreateTitle: 'Confirm addition', confirmCreate: 'Yes, add', confirmUpdateTitle: 'Confirm update', confirmUpdate: 'Yes, update', confirmDeleteTitle: 'Confirm deletion', confirmDeleteAction: 'Yes, delete', decline: 'No', confirmCreateBody: 'Add “{subject}” to the correspondence register?', confirmUpdateBody: 'Save the changes to “{subject}”?', confirmDeleteBody: 'Delete “{subject}” from the correspondence register?'
  },
  DE: {
    title: 'Korrespondenzregister', intro: 'Nur Metadaten zur Nachverfolgung erfassen. Eine persönliche Datei wie ein per WhatsApp erhaltener Lebenslauf wird zuerst im eingeschränkten HR-DMS abgelegt; das Register enthält danach nur die Referenz, nie den Inhalt.', add: 'Korrespondenz hinzufügen', cvPreset: 'Lebenslauf-Eingang vorbereiten', search: 'Register durchsuchen', empty: 'Keine Korrespondenz erfasst.', edit: 'Bearbeiten', delete: 'Löschen', close: 'Schließen', cancel: 'Abbrechen', save: 'Speichern', update: 'Ändern', required: 'Pflichtfelder ausfüllen.', confirmSave: 'Speichern dieser Metadaten bestätigen?', confirmDelete: 'Löschen dieses Eintrags bestätigen?', saved: 'Korrespondenz erfolgreich gespeichert.', deleted: 'Korrespondenz erfolgreich gelöscht.', saveFailed: 'Speichern nicht möglich. Berechtigungen prüfen oder erneut versuchen.', deleteFailed: 'Löschen nicht möglich. Berechtigungen prüfen oder erneut versuchen.', security: 'In diesem Register werden weder Datei noch Inhalt eines Lebenslaufs gespeichert.', fields: { date: 'Eingangsdatum', direction: 'Richtung', channel: 'Kanal', sender: 'Absender', recipient: '2SG-Empfänger', subject: 'Betreff', category: 'Kategorie', confidentiality: 'Vertraulichkeit', person: 'Verknüpfte Person oder Akte', ged: 'HR-/DMS-Referenz', evidence: 'Eingangsnachweis', owner: 'Verantwortung', next: 'Nächste Aktion', status: 'Status', deadline: 'Frist' }, directions: ['Eingang', 'Ausgang', 'Intern'], channels: ['WhatsApp', 'E-Mail', 'Briefpost', 'Formular', 'Persönliche Übergabe'], categories: ['Personalwesen', 'Institutionell', 'Lieferant', 'Recht', 'Projekt'], confidentiality: ['Öffentlich', 'Intern', 'Eingeschränkt HR', 'Vertraulich'], statuses: ['Zu qualifizieren', 'Im DMS abzulegen', 'In Bearbeitung', 'Abgeschlossen'], cvSubject: 'Lebenslauf über WhatsApp erhalten', cvNext: 'Datei im eingeschränkten HR-DMS ablegen und anschließend Referenz ergänzen.',
    confirmCreateTitle: 'Hinzufügen bestätigen', confirmCreate: 'Ja, hinzufügen', confirmUpdateTitle: 'Änderung bestätigen', confirmUpdate: 'Ja, ändern', confirmDeleteTitle: 'Löschen bestätigen', confirmDeleteAction: 'Ja, löschen', decline: 'Nein', confirmCreateBody: '„{subject}“ zum Korrespondenzregister hinzufügen?', confirmUpdateBody: 'Änderungen an „{subject}“ speichern?', confirmDeleteBody: '„{subject}“ aus dem Korrespondenzregister löschen?'
  }
};

const LOCAL_WARNING = {
  FR: 'Prototype local : ne saisissez aucune identité ni donnée personnelle réelle avant le raccordement au backend sécurisé et aux droits RH.',
  EN: 'Local prototype: do not enter any real identity or personal data until the secure backend and HR permissions are connected.',
  DE: 'Lokaler Prototyp: Vor der Anbindung an das sichere Backend und die HR-Berechtigungen keine echten Identitäts- oder Personendaten eingeben.'
};

const SOURCE_COPY = {
  FR: { loading: 'Connexion à la source sécurisée', backend: 'Source backend sécurisée', local: 'Pilote local · backend indisponible', forbidden: 'Accès au registre non autorisé', retained: 'Les entrées locales restent isolées pour cet utilisateur et ne sont jamais importées automatiquement.' },
  EN: { loading: 'Connecting to the secure source', backend: 'Secure backend source', local: 'Local pilot · backend unavailable', forbidden: 'Register access not authorised', retained: 'Local entries remain isolated for this user and are never imported automatically.' },
  DE: { loading: 'Verbindung zur sicheren Quelle', backend: 'Sichere Backend-Quelle', local: 'Lokaler Pilot · Backend nicht verfügbar', forbidden: 'Registerzugriff nicht autorisiert', retained: 'Lokale Einträge bleiben für diesen Benutzer isoliert und werden nie automatisch importiert.' }
};

const today = () => new Date().toISOString().slice(0, 10);
const defaultForm = () => ({ date: today(), directionIndex: 0, channelIndex: 1, sender: '', recipient: '', subject: '', categoryIndex: 1, confidentialityIndex: 1, person: '', ged: '', evidence: '', owner: '', next: '', statusIndex: 0, deadline: '' });
const getStorageKey = user => {
  const userIdentifier = user?.id || user?.email || user?.name || 'anonymous';
  const tenantIdentifier = user?.tenantId || user?.organizationId || '2sg';
  return `${STORAGE_KEY_PREFIX}:${encodeURIComponent(tenantIdentifier)}:${encodeURIComponent(userIdentifier)}`;
};
const loadItems = storageKey => { try { const items = JSON.parse(window.localStorage.getItem(storageKey)); return Array.isArray(items) ? items : []; } catch { return []; } };

const CorrespondenceRegister = ({ language = 'FR' }) => {
  const { token, user } = useAuth();
  const t = COPY[language] || COPY.FR;
  const sourceText = SOURCE_COPY[language] || SOURCE_COPY.FR;
  const storageKey = useMemo(() => getStorageKey(user), [user]);
  const [items, setItems] = useState([]);
  const [sourceState, setSourceState] = useState('loading');
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const visible = useMemo(() => items.filter(item => `${item.subject} ${item.sender} ${item.recipient} ${item.person} ${item.ged}`.toLowerCase().includes(query.trim().toLowerCase())), [items, query]);
  useEffect(() => {
    let active = true;
    const loadLocalSource = () => {
      if (!active) return;
      setItems(loadItems(storageKey));
      setSourceState('local');
    };
    if (!token || isDemoSession(token)) {
      loadLocalSource();
      return () => { active = false; };
    }
    setSourceState('loading');
    api.getAdministrationCorrespondence().then(result => {
      if (!active) return;
      setItems((result.data || []).map(correspondenceFromApi));
      setSourceState('backend');
    }).catch(error => {
      if (!active) return;
      if (error.status === 403 || error.status === 401) {
        setItems([]);
        setSourceState('forbidden');
        return;
      }
      loadLocalSource();
    });
    return () => { active = false; };
  }, [storageKey, token]);

  const persist = next => { setItems(next); window.localStorage.setItem(storageKey, JSON.stringify(next)); };
  const open = (item = null) => { setEditing(item?.id || 'new'); setForm(item ? { ...item } : defaultForm()); setMessage(''); };
  const prepareCv = () => { const base = defaultForm(); setEditing('new'); setForm({ ...base, channelIndex: 0, subject: t.cvSubject, categoryIndex: 0, confidentialityIndex: 2, statusIndex: 1, next: t.cvNext }); setMessage(''); };
  const close = () => { setEditing(null); setForm(defaultForm()); };
  const save = event => {
    event.preventDefault();
    if (!form.date || !form.sender.trim() || !form.recipient.trim() || !form.subject.trim() || !form.owner.trim()) { setMessage(t.required); return; }
    setPendingAction({ type: editing === 'new' ? 'create' : 'update', editing, form: { ...form } });
  };
  const remove = item => setPendingAction({ type: 'delete', item });
  const confirmPendingAction = async () => {
    if (!pendingAction) return;
    const action = pendingAction;
    setBusy(true);
    try {
      if (action.type === 'delete') {
        if (sourceState === 'backend') await api.deleteAdministrationCorrespondence(action.item.id);
        const nextItems = items.filter(current => current.id !== action.item.id);
        if (sourceState === 'local') window.localStorage.setItem(storageKey, JSON.stringify(nextItems));
        setItems(nextItems);
        setMessage(t.deleted);
      } else {
        const entry = { ...action.form, id: action.editing === 'new' ? `COR-${Date.now()}` : action.editing, sourceKind: sourceState };
        if (sourceState === 'backend') {
          const result = action.type === 'create'
            ? await api.createAdministrationCorrespondence(correspondenceToApi(entry))
            : await api.updateAdministrationCorrespondence(action.editing, correspondenceToApi(entry));
          const savedItem = correspondenceFromApi(result.data);
          setItems(action.type === 'create' ? [savedItem, ...items] : items.map(item => item.id === action.editing ? savedItem : item));
        } else if (sourceState === 'local') {
          persist(action.type === 'create' ? [entry, ...items] : items.map(item => item.id === action.editing ? entry : item));
        } else {
          setMessage(t.saveFailed);
          return;
        }
        close();
        setMessage(t.saved);
      }
    } catch {
      setMessage(action.type === 'delete' ? t.deleteFailed : t.saveFailed);
    } finally {
      setBusy(false);
      setPendingAction(null);
    }
  };
  const confirmation = pendingAction ? {
    create: { title: t.confirmCreateTitle, body: t.confirmCreateBody, confirm: t.confirmCreate },
    update: { title: t.confirmUpdateTitle, body: t.confirmUpdateBody, confirm: t.confirmUpdate },
    delete: { title: t.confirmDeleteTitle, body: t.confirmDeleteBody, confirm: t.confirmDeleteAction }
  }[pendingAction.type] : null;
  const confirmationSubject = pendingAction?.type === 'delete' ? pendingAction.item.subject : pendingAction?.form.subject;
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const canWrite = sourceState === 'backend' || sourceState === 'local';
  const SourceIcon = sourceState === 'backend' ? Database : sourceState === 'local' ? HardDrive : sourceState === 'forbidden' ? ShieldAlert : Loader2;

  return (
    <div className="mt-8 border-t border-slate-700 pt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-4xl"><h4 className="text-lg font-semibold text-slate-100">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{t.intro}</p></div><div className="flex flex-col items-start gap-2 lg:items-end"><span className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300"><SourceIcon size={15} className={sourceState === 'loading' ? 'animate-spin' : ''} />{sourceText[sourceState]}</span><div className="flex flex-col gap-2 sm:flex-row"><button type="button" className="m3s-secondary-button min-h-11 gap-2 px-4" onClick={prepareCv} disabled={!canWrite || busy}><FileInput size={18} />{t.cvPreset}</button><button type="button" className="m3s-success-button min-h-11 gap-2 px-4" onClick={() => open()} disabled={!canWrite || busy}><Plus size={18} />{t.add}</button></div></div></div>
      <p className="mt-4 flex items-center gap-2 rounded-md border border-amber-800 bg-amber-950/20 px-4 py-3 text-sm text-amber-100"><FileLock2 size={18} className="shrink-0" />{t.security}</p>
      {sourceState === 'local' && <><p className="mt-2 rounded-md border border-rose-800 bg-rose-950/20 px-4 py-3 text-sm font-semibold text-rose-100">{LOCAL_WARNING[language] || LOCAL_WARNING.FR}</p><p className="mt-2 rounded-md border border-amber-700 bg-amber-950/20 px-4 py-3 text-sm text-amber-100">{sourceText.retained}</p></>}
      {message && <p className="mt-4 rounded-md border border-emerald-700 bg-emerald-950/25 px-4 py-3 text-sm font-semibold text-emerald-200" role="status">{message}</p>}
      <label className="relative mt-4 block"><Search className="absolute left-3 top-3 text-slate-500" size={18} /><span className="sr-only">{t.search}</span><input className="m3s-field min-h-11 w-full pl-10" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} /></label>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-700"><table className="min-w-[980px] w-full text-left text-sm"><thead className="bg-slate-900/70 text-xs uppercase text-slate-300"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">{t.fields.date}</th><th className="px-4 py-3">{t.fields.subject}</th><th className="px-4 py-3">{t.fields.channel}</th><th className="px-4 py-3">{t.fields.owner}</th><th className="px-4 py-3">{t.fields.status}</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{visible.map(item => <tr key={item.id} className="cursor-pointer border-t border-slate-700 text-slate-300 transition hover:bg-blue-950/35" tabIndex={0} onClick={() => open(item)} onKeyDown={event => { if (event.key === 'Enter') open(item); }}><td className="px-4 py-3 font-mono text-xs text-cyan-200">{item.id}</td><td className="px-4 py-3">{item.date}</td><td className="px-4 py-3 font-semibold text-slate-100">{item.subject}</td><td className="px-4 py-3">{t.channels[item.channelIndex]}</td><td className="px-4 py-3">{item.owner}</td><td className="px-4 py-3">{t.statuses[item.statusIndex]}</td><td className="px-4 py-3"><div className="flex gap-2"><button type="button" className="m3s-icon-button text-blue-300" title={t.edit} onClick={event => { event.stopPropagation(); open(item); }} disabled={busy}><Edit2 size={16} /></button><button type="button" className="m3s-icon-button text-red-300" title={t.delete} onClick={event => { event.stopPropagation(); remove(item); }} disabled={busy}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table>{!visible.length && <p className="p-8 text-center text-sm text-slate-400">{t.empty}</p>}</div>
      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4" role="presentation"><form onSubmit={save} className="m3s-panel max-h-[92vh] w-full max-w-4xl overflow-y-auto p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="correspondence-form-title"><div className="flex items-start justify-between gap-3"><h2 id="correspondence-form-title" className="m3s-page-title">{editing === 'new' ? t.add : t.edit}</h2><button type="button" className="m3s-icon-button" onClick={close} aria-label={t.close}><X size={20} /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <label><span className="m3s-field-label">{t.fields.date} *</span><input type="date" className="m3s-field m3s-native-date mt-1 w-full" value={form.date} onChange={e => set('date', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.direction}</span><select className="m3s-field mt-1 w-full" value={form.directionIndex} onChange={e => set('directionIndex', Number(e.target.value))}>{t.directions.map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>
        <label><span className="m3s-field-label">{t.fields.channel}</span><select className="m3s-field mt-1 w-full" value={form.channelIndex} onChange={e => set('channelIndex', Number(e.target.value))}>{t.channels.map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>
        <label><span className="m3s-field-label">{t.fields.sender} *</span><input className="m3s-field mt-1 w-full" value={form.sender} onChange={e => set('sender', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.recipient} *</span><input className="m3s-field mt-1 w-full" value={form.recipient} onChange={e => set('recipient', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.subject} *</span><input className="m3s-field mt-1 w-full" value={form.subject} onChange={e => set('subject', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.category}</span><select className="m3s-field mt-1 w-full" value={form.categoryIndex} onChange={e => set('categoryIndex', Number(e.target.value))}>{t.categories.map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>
        <label><span className="m3s-field-label">{t.fields.confidentiality}</span><select className="m3s-field mt-1 w-full" value={form.confidentialityIndex} onChange={e => set('confidentialityIndex', Number(e.target.value))}>{t.confidentiality.map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>
        <label><span className="m3s-field-label">{t.fields.status}</span><select className="m3s-field mt-1 w-full" value={form.statusIndex} onChange={e => set('statusIndex', Number(e.target.value))}>{t.statuses.map((v, i) => <option key={v} value={i}>{v}</option>)}</select></label>
        <label><span className="m3s-field-label">{t.fields.person}</span><input className="m3s-field mt-1 w-full" value={form.person} onChange={e => set('person', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.ged}</span><input className="m3s-field mt-1 w-full" value={form.ged} onChange={e => set('ged', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.evidence}</span><input className="m3s-field mt-1 w-full" value={form.evidence} onChange={e => set('evidence', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.owner} *</span><input className="m3s-field mt-1 w-full" value={form.owner} onChange={e => set('owner', e.target.value)} /></label>
        <label><span className="m3s-field-label">{t.fields.deadline}</span><input type="date" className="m3s-field m3s-native-date mt-1 w-full" value={form.deadline} onChange={e => set('deadline', e.target.value)} /></label>
        <label className="md:col-span-2 lg:col-span-3"><span className="m3s-field-label">{t.fields.next}</span><textarea className="m3s-field mt-1 min-h-24 w-full" value={form.next} onChange={e => set('next', e.target.value)} /></label>
      </div><div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end"><button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={close} disabled={busy}>{t.cancel}</button><button type="submit" className="m3s-success-button min-h-11 px-4" disabled={busy}>{editing === 'new' ? t.save : t.update}</button></div></form></div>}
      {pendingAction && confirmation && <ActionConfirmationDialog id="correspondence-confirmation" title={confirmation.title} body={confirmation.body.replace('{subject}', confirmationSubject || '')} cancelLabel={t.decline} confirmLabel={confirmation.confirm} action={pendingAction.type} busy={busy} onCancel={() => setPendingAction(null)} onConfirm={confirmPendingAction} />}
    </div>
  );
};

export default CorrespondenceRegister;
