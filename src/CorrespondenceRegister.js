import React, { useMemo, useState } from 'react';
import { Edit2, FileInput, FileLock2, Plus, Search, Trash2, X } from 'lucide-react';

const STORAGE_KEY = 'm3s-administration-correspondence-v1';

const COPY = {
  FR: {
    title: 'Registre local du courrier', intro: 'Enregistrer uniquement les métadonnées de suivi. Une pièce personnelle, comme un CV reçu via WhatsApp, doit d’abord être classée dans la GED/RH restreinte ; le registre conserve ensuite sa référence, jamais son contenu.',
    add: 'Ajouter un courrier', cvPreset: 'Préparer une réception de CV', search: 'Rechercher dans le registre', empty: 'Aucun courrier enregistré localement.', edit: 'Modifier', delete: 'Supprimer', close: 'Fermer', cancel: 'Annuler', save: 'Enregistrer', update: 'Modifier', required: 'Complétez les champs obligatoires.', confirmSave: 'Confirmer l’enregistrement de ces métadonnées ?', confirmDelete: 'Confirmer la suppression de cette entrée locale ?', saved: 'Courrier enregistré avec succès.', deleted: 'Courrier supprimé avec succès.', security: 'Aucun fichier ni contenu du CV n’est stocké dans ce prototype.',
    fields: { date: 'Date de réception', direction: 'Sens', channel: 'Canal', sender: 'Expéditeur', recipient: 'Destinataire 2SG', subject: 'Objet', category: 'Catégorie', confidentiality: 'Confidentialité', person: 'Personne ou dossier lié', ged: 'Référence GED/RH', evidence: 'Preuve de réception', owner: 'Responsable du suivi', next: 'Prochaine action', status: 'Statut', deadline: 'Échéance' },
    directions: ['Entrant', 'Sortant', 'Interne'], channels: ['WhatsApp', 'E-mail', 'Courrier papier', 'Formulaire', 'Remise en main propre'], categories: ['Ressources humaines', 'Institutionnel', 'Fournisseur', 'Juridique', 'Projet'], confidentiality: ['Public', 'Interne', 'Restreint RH', 'Confidentiel'], statuses: ['À qualifier', 'À classer dans la GED', 'En traitement', 'Clos'],
    cvSubject: 'CV reçu via WhatsApp', cvNext: 'Classer le fichier dans la GED/RH restreinte, puis compléter la référence.'
  },
  EN: {
    title: 'Local correspondence register', intro: 'Record tracking metadata only. A personal file such as a CV received through WhatsApp must first be stored in the restricted HR DMS; the register then retains its reference, never its content.', add: 'Add correspondence', cvPreset: 'Prepare a CV receipt', search: 'Search the register', empty: 'No correspondence saved locally.', edit: 'Edit', delete: 'Delete', close: 'Close', cancel: 'Cancel', save: 'Save', update: 'Update', required: 'Complete the required fields.', confirmSave: 'Confirm saving this metadata?', confirmDelete: 'Confirm deletion of this local entry?', saved: 'Correspondence saved successfully.', deleted: 'Correspondence deleted successfully.', security: 'No CV file or content is stored in this prototype.', fields: { date: 'Receipt date', direction: 'Direction', channel: 'Channel', sender: 'Sender', recipient: '2SG recipient', subject: 'Subject', category: 'Category', confidentiality: 'Confidentiality', person: 'Linked person or file', ged: 'HR/DMS reference', evidence: 'Receipt evidence', owner: 'Follow-up owner', next: 'Next action', status: 'Status', deadline: 'Deadline' }, directions: ['Incoming', 'Outgoing', 'Internal'], channels: ['WhatsApp', 'Email', 'Paper mail', 'Form', 'Hand delivery'], categories: ['Human resources', 'Institutional', 'Supplier', 'Legal', 'Project'], confidentiality: ['Public', 'Internal', 'Restricted HR', 'Confidential'], statuses: ['To qualify', 'To file in DMS', 'In progress', 'Closed'], cvSubject: 'CV received through WhatsApp', cvNext: 'Store the file in the restricted HR DMS, then complete its reference.'
  },
  DE: {
    title: 'Lokales Korrespondenzregister', intro: 'Nur Metadaten zur Nachverfolgung erfassen. Eine persönliche Datei wie ein per WhatsApp erhaltener Lebenslauf wird zuerst im eingeschränkten HR-DMS abgelegt; das Register enthält danach nur die Referenz, nie den Inhalt.', add: 'Korrespondenz hinzufügen', cvPreset: 'Lebenslauf-Eingang vorbereiten', search: 'Register durchsuchen', empty: 'Keine Korrespondenz lokal gespeichert.', edit: 'Bearbeiten', delete: 'Löschen', close: 'Schließen', cancel: 'Abbrechen', save: 'Speichern', update: 'Ändern', required: 'Pflichtfelder ausfüllen.', confirmSave: 'Speichern dieser Metadaten bestätigen?', confirmDelete: 'Löschen dieses lokalen Eintrags bestätigen?', saved: 'Korrespondenz erfolgreich gespeichert.', deleted: 'Korrespondenz erfolgreich gelöscht.', security: 'In diesem Prototyp werden weder Datei noch Inhalt eines Lebenslaufs gespeichert.', fields: { date: 'Eingangsdatum', direction: 'Richtung', channel: 'Kanal', sender: 'Absender', recipient: '2SG-Empfänger', subject: 'Betreff', category: 'Kategorie', confidentiality: 'Vertraulichkeit', person: 'Verknüpfte Person oder Akte', ged: 'HR-/DMS-Referenz', evidence: 'Eingangsnachweis', owner: 'Verantwortung', next: 'Nächste Aktion', status: 'Status', deadline: 'Frist' }, directions: ['Eingang', 'Ausgang', 'Intern'], channels: ['WhatsApp', 'E-Mail', 'Briefpost', 'Formular', 'Persönliche Übergabe'], categories: ['Personalwesen', 'Institutionell', 'Lieferant', 'Recht', 'Projekt'], confidentiality: ['Öffentlich', 'Intern', 'Eingeschränkt HR', 'Vertraulich'], statuses: ['Zu qualifizieren', 'Im DMS abzulegen', 'In Bearbeitung', 'Abgeschlossen'], cvSubject: 'Lebenslauf über WhatsApp erhalten', cvNext: 'Datei im eingeschränkten HR-DMS ablegen und anschließend Referenz ergänzen.'
  }
};

const LOCAL_WARNING = {
  FR: 'Prototype local : ne saisissez aucune identité ni donnée personnelle réelle avant le raccordement au backend sécurisé et aux droits RH.',
  EN: 'Local prototype: do not enter any real identity or personal data until the secure backend and HR permissions are connected.',
  DE: 'Lokaler Prototyp: Vor der Anbindung an das sichere Backend und die HR-Berechtigungen keine echten Identitäts- oder Personendaten eingeben.'
};

const today = () => new Date().toISOString().slice(0, 10);
const defaultForm = () => ({ date: today(), directionIndex: 0, channelIndex: 1, sender: '', recipient: '', subject: '', categoryIndex: 1, confidentialityIndex: 1, person: '', ged: '', evidence: '', owner: '', next: '', statusIndex: 0, deadline: '' });
const loadItems = () => { try { const items = JSON.parse(window.localStorage.getItem(STORAGE_KEY)); return Array.isArray(items) ? items : []; } catch { return []; } };

const CorrespondenceRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const [items, setItems] = useState(loadItems);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const visible = useMemo(() => items.filter(item => `${item.subject} ${item.sender} ${item.recipient} ${item.person} ${item.ged}`.toLowerCase().includes(query.trim().toLowerCase())), [items, query]);
  const persist = next => { setItems(next); window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };
  const open = (item = null) => { setEditing(item?.id || 'new'); setForm(item ? { ...item } : defaultForm()); setMessage(''); };
  const prepareCv = () => { const base = defaultForm(); setEditing('new'); setForm({ ...base, channelIndex: 0, subject: t.cvSubject, categoryIndex: 0, confidentialityIndex: 2, statusIndex: 1, next: t.cvNext }); setMessage(''); };
  const close = () => { setEditing(null); setForm(defaultForm()); };
  const save = event => {
    event.preventDefault();
    if (!form.date || !form.sender.trim() || !form.recipient.trim() || !form.subject.trim() || !form.owner.trim()) { setMessage(t.required); return; }
    if (!window.confirm(t.confirmSave)) return;
    const entry = { ...form, id: editing === 'new' ? `COR-${Date.now()}` : editing };
    persist(editing === 'new' ? [entry, ...items] : items.map(item => item.id === editing ? entry : item));
    close(); setMessage(t.saved);
  };
  const remove = item => { if (!window.confirm(t.confirmDelete)) return; persist(items.filter(current => current.id !== item.id)); setMessage(t.deleted); };
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));

  return (
    <div className="mt-8 border-t border-slate-700 pt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-4xl"><h4 className="text-lg font-semibold text-slate-100">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{t.intro}</p></div><div className="flex flex-col gap-2 sm:flex-row"><button type="button" className="m3s-secondary-button min-h-11 gap-2 px-4" onClick={prepareCv}><FileInput size={18} />{t.cvPreset}</button><button type="button" className="m3s-success-button min-h-11 gap-2 px-4" onClick={() => open()}><Plus size={18} />{t.add}</button></div></div>
      <p className="mt-4 flex items-center gap-2 rounded-md border border-amber-800 bg-amber-950/20 px-4 py-3 text-sm text-amber-100"><FileLock2 size={18} className="shrink-0" />{t.security}</p>
      <p className="mt-2 rounded-md border border-rose-800 bg-rose-950/20 px-4 py-3 text-sm font-semibold text-rose-100">{LOCAL_WARNING[language] || LOCAL_WARNING.FR}</p>
      {message && <p className="mt-4 rounded-md border border-emerald-700 bg-emerald-950/25 px-4 py-3 text-sm font-semibold text-emerald-200" role="status">{message}</p>}
      <label className="relative mt-4 block"><Search className="absolute left-3 top-3 text-slate-500" size={18} /><span className="sr-only">{t.search}</span><input className="m3s-field min-h-11 w-full pl-10" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} /></label>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-700"><table className="min-w-[980px] w-full text-left text-sm"><thead className="bg-slate-900/70 text-xs uppercase text-slate-300"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">{t.fields.date}</th><th className="px-4 py-3">{t.fields.subject}</th><th className="px-4 py-3">{t.fields.channel}</th><th className="px-4 py-3">{t.fields.owner}</th><th className="px-4 py-3">{t.fields.status}</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{visible.map(item => <tr key={item.id} className="cursor-pointer border-t border-slate-700 text-slate-300 transition hover:bg-blue-950/35" tabIndex={0} onClick={() => open(item)} onKeyDown={event => { if (event.key === 'Enter') open(item); }}><td className="px-4 py-3 font-mono text-xs text-cyan-200">{item.id}</td><td className="px-4 py-3">{item.date}</td><td className="px-4 py-3 font-semibold text-slate-100">{item.subject}</td><td className="px-4 py-3">{t.channels[item.channelIndex]}</td><td className="px-4 py-3">{item.owner}</td><td className="px-4 py-3">{t.statuses[item.statusIndex]}</td><td className="px-4 py-3"><div className="flex gap-2"><button type="button" className="m3s-icon-button text-blue-300" title={t.edit} onClick={event => { event.stopPropagation(); open(item); }}><Edit2 size={16} /></button><button type="button" className="m3s-icon-button text-red-300" title={t.delete} onClick={event => { event.stopPropagation(); remove(item); }}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table>{!visible.length && <p className="p-8 text-center text-sm text-slate-400">{t.empty}</p>}</div>
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
      </div><div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end"><button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={close}>{t.cancel}</button><button type="submit" className="m3s-success-button min-h-11 px-4">{editing === 'new' ? t.save : t.update}</button></div></form></div>}
    </div>
  );
};

export default CorrespondenceRegister;
