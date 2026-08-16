import React, { useEffect, useMemo, useState } from 'react';
import { Archive, CircleAlert, ClipboardList, Edit2, FileCheck2, Link2, Plus, ShieldAlert, Trash2, X } from 'lucide-react';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import { api } from './api';
import { translateDirectoryPosition } from './MembersDirectory';

const STORAGE_KEY_PREFIX = 'm3s-administration-external-missions-v1';

const COPY = {
  FR: {
    eyebrow: 'MISSIONS EXTERNES · REGISTRE LOCAL', title: 'Suivi des missions déléguées',
    intro: 'Ce registre conserve uniquement les métadonnées de pilotage. Les prompts, pièces jointes, CV, identités et contenus restreints restent dans leurs canaux sécurisés.',
    local: 'Prototype local · isolé par utilisateur', addPrepared: 'Ajouter la mission préparée', unavailable: 'Préparez d’abord une mission externe ci-dessus.',
    empty: 'Aucune mission enregistrée. Envoyez les missions convenues, puis consignez leur état ici.', actions: 'Actions', edit: 'Modifier', delete: 'Supprimer', close: 'Fermer', cancel: 'Annuler', save: 'Enregistrer', update: 'Modifier',
    required: 'Merci de remplir tous les champs obligatoires.', missingFields: 'Champs requis : {fields}.', saved: 'Mission enregistrée avec succès.', deleted: 'Mission supprimée du registre local.',
    selectOwner: 'Sélectionner un responsable', ownerLoading: 'Chargement de l’annuaire RH-001…', ownerFallback: 'Annuaire indisponible : seul l’utilisateur connecté peut être proposé.', ownerRule: 'Liste des membres actifs que votre rôle autorise à consulter. Ce choix n’accorde aucun droit supplémentaire.', optional: 'Facultatif',
    confirmCreateTitle: 'Confirmer l’ajout', confirmCreate: 'Oui, ajouter', confirmUpdateTitle: 'Confirmer la modification', confirmUpdate: 'Oui, modifier', confirmDeleteTitle: 'Confirmer la suppression', confirmDelete: 'Oui, supprimer', decline: 'Non',
    confirmCreateBody: 'Ajouter « {title} » au registre des missions ?', confirmUpdateBody: 'Enregistrer les modifications de « {title} » ?', confirmDeleteBody: 'Supprimer « {title} » du registre local ?',
    restrictedTitle: 'Mission restreinte', restrictedRule: 'Mode restreint : seuls le service, l’état, le responsable et les dates sont conservés localement. Les références et le contenu restent dans la GED sécurisée.',
    metrics: { total: 'Missions', active: 'En circulation', review: 'À contrôler', integrated: 'Intégrées' },
    fields: { title: 'Intitulé non sensible', service: 'Service', sensitivity: 'Sensibilité', status: 'État', owner: 'Responsable 2SG', sentDate: 'Date d’envoi', deadline: 'Échéance', taskRef: 'Référence tâche M3S', gedRef: 'Référence GED', deliverableRef: 'Référence du livrable' },
    help: { taskRef: 'Identifiant de la tâche qui pilote la mission, par ex. TASK-LEGAL-01. À renseigner après création dans Planification & Projets.', gedRef: 'Identifiant ou chemin du dossier/document source dans la GED, par ex. GED / LEGAL / CGU.', deliverableRef: 'Identifiant, nom de fichier ou lien contrôlé du résultat reçu. À renseigner lorsque le livrable existe.' },
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Public', internal: 'Interne', restricted: 'Restreint' },
    statuses: { prepared: 'Préparée', sent: 'Envoyée', received: 'Reçue', review: 'En contrôle', integrated: 'Intégrée', archived: 'Archivée' }
  },
  EN: {
    eyebrow: 'EXTERNAL MISSIONS · LOCAL REGISTER', title: 'Delegated mission tracking',
    intro: 'This register stores steering metadata only. Prompts, attachments, CVs, identities and restricted content remain in their secure channels.',
    local: 'Local prototype · isolated by user', addPrepared: 'Add prepared mission', unavailable: 'Prepare an external mission above first.',
    empty: 'No mission recorded. Send the agreed missions, then track their state here.', actions: 'Actions', edit: 'Edit', delete: 'Delete', close: 'Close', cancel: 'Cancel', save: 'Save', update: 'Update',
    required: 'Please complete all required fields.', missingFields: 'Required fields: {fields}.', saved: 'Mission saved successfully.', deleted: 'Mission removed from the local register.',
    selectOwner: 'Select an owner', ownerLoading: 'Loading the RH-001 directory…', ownerFallback: 'Directory unavailable: only the signed-in user can be proposed.', ownerRule: 'Active members your role is allowed to view. This selection grants no additional permission.', optional: 'Optional',
    confirmCreateTitle: 'Confirm addition', confirmCreate: 'Yes, add', confirmUpdateTitle: 'Confirm update', confirmUpdate: 'Yes, update', confirmDeleteTitle: 'Confirm deletion', confirmDelete: 'Yes, delete', decline: 'No',
    confirmCreateBody: 'Add “{title}” to the mission register?', confirmUpdateBody: 'Save changes to “{title}”?', confirmDeleteBody: 'Delete “{title}” from the local register?',
    restrictedTitle: 'Restricted mission', restrictedRule: 'Restricted mode: only service, state, owner and dates are stored locally. References and content remain in the secure DMS.',
    metrics: { total: 'Missions', active: 'In circulation', review: 'To review', integrated: 'Integrated' },
    fields: { title: 'Non-sensitive title', service: 'Service', sensitivity: 'Sensitivity', status: 'State', owner: '2SG owner', sentDate: 'Sent date', deadline: 'Deadline', taskRef: 'M3S task reference', gedRef: 'DMS reference', deliverableRef: 'Deliverable reference' },
    help: { taskRef: 'Identifier of the task steering the mission, e.g. TASK-LEGAL-01. Fill it after creation in Planning & Projects.', gedRef: 'Identifier or path of the source folder/document in the DMS, e.g. DMS / LEGAL / Terms.', deliverableRef: 'Identifier, filename or controlled link for the received result. Fill it when the deliverable exists.' },
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Public', internal: 'Internal', restricted: 'Restricted' },
    statuses: { prepared: 'Prepared', sent: 'Sent', received: 'Received', review: 'Under review', integrated: 'Integrated', archived: 'Archived' }
  },
  DE: {
    eyebrow: 'EXTERNE AUFGABEN · LOKALES REGISTER', title: 'Nachverfolgung delegierter Aufgaben',
    intro: 'Dieses Register speichert nur Steuerungsmetadaten. Prompts, Anlagen, Lebensläufe, Identitäten und eingeschränkte Inhalte verbleiben in sicheren Kanälen.',
    local: 'Lokaler Prototyp · nach Benutzer getrennt', addPrepared: 'Vorbereitete Aufgabe hinzufügen', unavailable: 'Zuerst oben eine externe Aufgabe vorbereiten.',
    empty: 'Keine Aufgabe erfasst. Vereinbarte Aufgaben senden und ihren Stand anschließend hier verfolgen.', actions: 'Aktionen', edit: 'Ändern', delete: 'Löschen', close: 'Schließen', cancel: 'Abbrechen', save: 'Speichern', update: 'Ändern',
    required: 'Bitte alle Pflichtfelder ausfüllen.', missingFields: 'Pflichtfelder: {fields}.', saved: 'Aufgabe erfolgreich gespeichert.', deleted: 'Aufgabe aus dem lokalen Register gelöscht.',
    selectOwner: 'Verantwortung auswählen', ownerLoading: 'RH-001-Verzeichnis wird geladen…', ownerFallback: 'Verzeichnis nicht verfügbar: Nur der angemeldete Benutzer kann vorgeschlagen werden.', ownerRule: 'Aktive Mitglieder, die Ihre Rolle anzeigen darf. Die Auswahl gewährt keine zusätzlichen Rechte.', optional: 'Optional',
    confirmCreateTitle: 'Hinzufügen bestätigen', confirmCreate: 'Ja, hinzufügen', confirmUpdateTitle: 'Änderung bestätigen', confirmUpdate: 'Ja, ändern', confirmDeleteTitle: 'Löschen bestätigen', confirmDelete: 'Ja, löschen', decline: 'Nein',
    confirmCreateBody: '„{title}“ zum Aufgabenregister hinzufügen?', confirmUpdateBody: 'Änderungen an „{title}“ speichern?', confirmDeleteBody: '„{title}“ aus dem lokalen Register löschen?',
    restrictedTitle: 'Eingeschränkte Aufgabe', restrictedRule: 'Eingeschränkter Modus: Nur Dienst, Status, Verantwortung und Daten werden lokal gespeichert. Referenzen und Inhalte verbleiben im sicheren DMS.',
    metrics: { total: 'Aufgaben', active: 'Im Umlauf', review: 'Zu prüfen', integrated: 'Integriert' },
    fields: { title: 'Nicht sensibler Titel', service: 'Dienst', sensitivity: 'Vertraulichkeit', status: 'Status', owner: '2SG-Verantwortung', sentDate: 'Sendedatum', deadline: 'Frist', taskRef: 'M3S-Aufgabenreferenz', gedRef: 'DMS-Referenz', deliverableRef: 'Ergebnisreferenz' },
    help: { taskRef: 'Kennung der steuernden Aufgabe, z. B. TASK-LEGAL-01. Nach der Anlage in Planung & Projekte eintragen.', gedRef: 'Kennung oder Pfad des Quelldossiers/-dokuments im DMS, z. B. DMS / LEGAL / AGB.', deliverableRef: 'Kennung, Dateiname oder kontrollierter Link des Ergebnisses. Eintragen, sobald das Ergebnis vorliegt.' },
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Öffentlich', internal: 'Intern', restricted: 'Eingeschränkt' },
    statuses: { prepared: 'Vorbereitet', sent: 'Gesendet', received: 'Eingegangen', review: 'In Prüfung', integrated: 'Integriert', archived: 'Archiviert' }
  }
};

const emptyForm = () => ({ title: '', service: 'work', sensitivity: 'internal', status: 'prepared', owner: '', sentDate: '', deadline: '', taskRef: '', gedRef: '', deliverableRef: '' });

const getStorageKey = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const userIdentifier = user?.id || user?.email || user?.name || 'anonymous';
    const tenantIdentifier = user?.tenantId || user?.organizationId || '2sg';
    return `${STORAGE_KEY_PREFIX}:${encodeURIComponent(tenantIdentifier)}:${encodeURIComponent(userIdentifier)}`;
  } catch {
    return `${STORAGE_KEY_PREFIX}:2sg:anonymous`;
  }
};

const readItems = storageKey => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const readCurrentUserOption = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const name = user?.name || user?.display_name || user?.email || '';
    return name ? { value: name, label: name } : null;
  } catch {
    return null;
  }
};

const localDate = () => new Date().toLocaleDateString('en-CA');

const statusTone = {
  prepared: 'border-slate-600 bg-slate-950/30 text-slate-200',
  sent: 'border-blue-700 bg-blue-950/25 text-blue-200',
  received: 'border-cyan-700 bg-cyan-950/25 text-cyan-200',
  review: 'border-amber-700 bg-amber-950/25 text-amber-200',
  integrated: 'border-emerald-700 bg-emerald-950/25 text-emerald-200',
  archived: 'border-violet-700 bg-violet-950/25 text-violet-200'
};

const ExternalMissionRegister = ({ language = 'FR', draft, enabled = false }) => {
  const t = COPY[language] || COPY.FR;
  const storageKey = useMemo(getStorageKey, []);
  const [items, setItems] = useState(() => readItems(storageKey));
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [ownerOptions, setOwnerOptions] = useState(() => {
    const currentUser = readCurrentUserOption();
    return currentUser ? [currentUser] : [];
  });
  const [ownerDirectoryStatus, setOwnerDirectoryStatus] = useState('loading');
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  useEffect(() => {
    let cancelled = false;
    const currentUser = readCurrentUserOption();
    setOwnerDirectoryStatus('loading');

    api.getMembersDirectory(100, 0)
      .then(response => {
        if (cancelled) return;
        const options = (Array.isArray(response?.data) ? response.data : [])
          .filter(member => member.active !== false && member.display_name)
          .map(member => ({
            value: member.display_name,
            label: member.position
              ? `${member.display_name} — ${translateDirectoryPosition(member.position, language)}`
              : member.display_name
          }))
          .sort((left, right) => left.label.localeCompare(right.label));
        setOwnerOptions(options.length > 0 ? options : (currentUser ? [currentUser] : []));
        setOwnerDirectoryStatus(options.length > 0 ? 'ready' : 'fallback');
      })
      .catch(() => {
        if (cancelled) return;
        setOwnerOptions(currentUser ? [currentUser] : []);
        setOwnerDirectoryStatus('fallback');
      });

    return () => { cancelled = true; };
  }, [language]);

  const metrics = useMemo(() => ({
    total: items.length,
    active: items.filter(item => ['sent', 'received', 'review'].includes(item.status)).length,
    review: items.filter(item => ['received', 'review'].includes(item.status)).length,
    integrated: items.filter(item => item.status === 'integrated').length
  }), [items]);

  const displayTitle = item => item.sensitivity === 'restricted' ? t.restrictedTitle : item.title;
  const openPrepared = () => {
    if (!enabled) return;
    setEditingId('new');
    setForm({ ...emptyForm(), title: draft?.title || '', service: draft?.service || 'work', sensitivity: draft?.sensitivity || 'internal' });
    setMessage('');
    setFormError('');
    setFieldErrors({});
  };
  const openEdit = item => {
    setEditingId(item.id);
    setForm({ ...emptyForm(), ...item, title: item.sensitivity === 'restricted' ? '' : item.title });
    setMessage('');
    setFormError('');
    setFieldErrors({});
  };
  const close = () => { setEditingId(null); setForm(emptyForm()); setFormError(''); setFieldErrors({}); };
  const set = (key, value) => {
    setForm(current => ({ ...current, [key]: value }));
    setFieldErrors(current => ({ ...current, [key]: false }));
    setFormError('');
  };
  const setStatus = value => {
    setForm(current => ({
      ...current,
      status: value,
      sentDate: value !== 'prepared' && !current.sentDate ? localDate() : current.sentDate
    }));
    setFieldErrors(current => ({ ...current, status: false, sentDate: false }));
    setFormError('');
  };
  const requestSave = event => {
    event.preventDefault();
    const missing = [];
    if (form.sensitivity !== 'restricted' && !form.title.trim()) missing.push('title');
    if (!form.owner.trim()) missing.push('owner');
    if (form.status !== 'prepared' && !form.sentDate) missing.push('sentDate');
    if (missing.length > 0) {
      const labels = missing.map(key => t.fields[key]).join(', ');
      setFieldErrors(Object.fromEntries(missing.map(key => [key, true])));
      setFormError(`${t.required} ${t.missingFields.replace('{fields}', labels)}`);
      return;
    }
    setPendingAction({ type: editingId === 'new' ? 'create' : 'update', editingId, form: { ...form } });
  };
  const requestDelete = item => setPendingAction({ type: 'delete', item });
  const confirmPendingAction = () => {
    if (!pendingAction) return;
    if (pendingAction.type === 'delete') {
      setItems(current => current.filter(item => item.id !== pendingAction.item.id));
      setMessage(t.deleted);
      setPendingAction(null);
      return;
    }
    const restricted = pendingAction.form.sensitivity === 'restricted';
    const record = {
      ...pendingAction.form,
      id: pendingAction.editingId === 'new' ? `EXT-${Date.now()}` : pendingAction.editingId,
      title: restricted ? '' : pendingAction.form.title.trim(),
      owner: pendingAction.form.owner.trim(),
      taskRef: restricted ? '' : pendingAction.form.taskRef.trim(),
      gedRef: restricted ? '' : pendingAction.form.gedRef.trim(),
      deliverableRef: restricted ? '' : pendingAction.form.deliverableRef.trim(),
      updatedAt: new Date().toISOString()
    };
    setItems(current => pendingAction.type === 'create' ? [record, ...current] : current.map(item => item.id === record.id ? record : item));
    setMessage(t.saved);
    setPendingAction(null);
    close();
  };

  const confirmation = pendingAction ? {
    create: { title: t.confirmCreateTitle, body: t.confirmCreateBody, confirm: t.confirmCreate },
    update: { title: t.confirmUpdateTitle, body: t.confirmUpdateBody, confirm: t.confirmUpdate },
    delete: { title: t.confirmDeleteTitle, body: t.confirmDeleteBody, confirm: t.confirmDelete }
  }[pendingAction.type] : null;
  const confirmationTitle = pendingAction?.type === 'delete' ? displayTitle(pendingAction.item) : (pendingAction?.form.sensitivity === 'restricted' ? t.restrictedTitle : pendingAction?.form.title);
  const availableOwnerOptions = useMemo(() => {
    if (!form.owner || ownerOptions.some(option => option.value === form.owner)) return ownerOptions;
    return [{ value: form.owner, label: form.owner }, ...ownerOptions];
  }, [form.owner, ownerOptions]);
  const invalidFieldClass = key => fieldErrors[key] ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-500/30' : '';

  const renderStatus = item => <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusTone[item.status] || statusTone.prepared}`}>{t.statuses[item.status] || t.statuses.prepared}</span>;

  return (
    <section className="m3s-panel p-5 sm:p-6" aria-labelledby="external-mission-register-title">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase text-cyan-300">{t.eyebrow}</p>
          <h3 id="external-mission-register-title" className="m3s-section-title mt-2 flex items-center gap-2"><ClipboardList className="text-cyan-300" size={21} />{t.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300"><ShieldAlert size={15} />{t.local}</span>
          <button type="button" className="m3s-success-button min-h-11 gap-2 px-4" onClick={openPrepared} disabled={!enabled} title={!enabled ? t.unavailable : undefined}><Plus size={18} />{t.addPrepared}</button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(metrics).map(([key, value]) => <div key={key} className="rounded-lg border border-slate-700 bg-slate-950/25 p-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.metrics[key]}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>)}
      </div>
      {message && <p className="mt-4 rounded-md border border-emerald-700 bg-emerald-950/25 px-4 py-3 text-sm font-semibold text-emerald-200" role="status">{message}</p>}

      {items.length > 0 ? <>
        <div className="mt-5 hidden overflow-hidden rounded-lg border border-slate-700 lg:block">
          <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-950/60 text-xs uppercase text-slate-300"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">{t.fields.title}</th><th className="px-4 py-3">{t.fields.service}</th><th className="px-4 py-3">{t.fields.status}</th><th className="px-4 py-3">{t.fields.owner}</th><th className="px-4 py-3">{t.fields.deadline}</th><th className="px-4 py-3">{t.actions}</th></tr></thead><tbody>{items.map(item => <tr key={item.id} className="cursor-pointer border-t border-slate-700 text-slate-300 transition hover:bg-blue-950/35" tabIndex={0} onClick={() => openEdit(item)} onKeyDown={event => { if (event.key === 'Enter') openEdit(item); }}><td className="px-4 py-3 font-mono text-xs text-cyan-200">{item.id}</td><td className="px-4 py-3"><p className="font-semibold text-slate-100">{displayTitle(item)}</p>{item.sensitivity !== 'restricted' && (item.taskRef || item.gedRef || item.deliverableRef) && <p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Link2 size={13} />{[item.taskRef, item.gedRef, item.deliverableRef].filter(Boolean).join(' · ')}</p>}</td><td className="px-4 py-3">{t.services[item.service]}</td><td className="px-4 py-3">{renderStatus(item)}</td><td className="px-4 py-3">{item.owner}</td><td className="px-4 py-3">{item.deadline || '—'}</td><td className="px-4 py-3"><div className="flex gap-2"><button type="button" className="m3s-icon-button text-blue-300" title={t.edit} onClick={event => { event.stopPropagation(); openEdit(item); }}><Edit2 size={16} /></button><button type="button" className="m3s-icon-button text-red-300" title={t.delete} onClick={event => { event.stopPropagation(); requestDelete(item); }}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>
        </div>
        <div className="mt-5 grid gap-3 lg:hidden">{items.map(item => <article key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/25 p-4" onClick={() => openEdit(item)}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-mono text-xs text-cyan-200">{item.id}</p><h4 className="mt-1 break-words font-semibold text-slate-100">{displayTitle(item)}</h4></div>{renderStatus(item)}</div><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-xs font-semibold uppercase text-slate-500">{t.fields.service}</dt><dd className="mt-1 text-slate-200">{t.services[item.service]}</dd></div><div><dt className="text-xs font-semibold uppercase text-slate-500">{t.fields.owner}</dt><dd className="mt-1 text-slate-200">{item.owner}</dd></div><div><dt className="text-xs font-semibold uppercase text-slate-500">{t.fields.deadline}</dt><dd className="mt-1 text-slate-200">{item.deadline || '—'}</dd></div><div><dt className="text-xs font-semibold uppercase text-slate-500">{t.fields.sensitivity}</dt><dd className="mt-1 text-slate-200">{t.sensitivities[item.sensitivity]}</dd></div></dl><div className="mt-4 flex justify-end gap-2"><button type="button" className="m3s-icon-button text-blue-300" aria-label={`${t.edit} : ${displayTitle(item)}`} onClick={event => { event.stopPropagation(); openEdit(item); }}><Edit2 size={17} /></button><button type="button" className="m3s-icon-button text-red-300" aria-label={`${t.delete} : ${displayTitle(item)}`} onClick={event => { event.stopPropagation(); requestDelete(item); }}><Trash2 size={17} /></button></div></article>)}</div>
      </> : <div className="mt-5 flex flex-col items-center rounded-lg border border-dashed border-slate-600 px-5 py-8 text-center"><Archive className="text-slate-500" size={28} /><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{t.empty}</p></div>}

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4" role="presentation">
          <form onSubmit={requestSave} noValidate className="m3s-panel max-h-[92vh] w-full max-w-3xl overflow-y-auto p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="external-mission-form-title">
            <div className="flex items-start justify-between gap-3">
              <h2 id="external-mission-form-title" className="m3s-page-title">{editingId === 'new' ? t.addPrepared : t.edit}</h2>
              <button type="button" className="m3s-icon-button" onClick={close} aria-label={t.close}><X size={20} /></button>
            </div>
            {form.sensitivity === 'restricted' && (
              <p className="mt-4 flex items-start gap-2 rounded-md border border-rose-800 bg-rose-950/20 px-4 py-3 text-sm text-rose-100">
                <ShieldAlert className="mt-0.5 shrink-0" size={18} />{t.restrictedRule}
              </p>
            )}
            {formError && (
              <div id="external-mission-form-error" className="mt-4 flex items-start gap-2 rounded-md border border-rose-600 bg-rose-950/35 px-4 py-3 text-sm font-semibold text-rose-100" role="alert">
                <CircleAlert className="mt-0.5 shrink-0" size={18} />
                <span>{formError}</span>
              </div>
            )}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="m3s-field-label">{t.fields.title}{form.sensitivity !== 'restricted' ? ' *' : ''}</span>
                <input
                  className={`m3s-field mt-1 w-full ${invalidFieldClass('title')}`}
                  value={form.sensitivity === 'restricted' ? t.restrictedTitle : form.title}
                  onChange={event => set('title', event.target.value)}
                  disabled={form.sensitivity === 'restricted'}
                  required={form.sensitivity !== 'restricted'}
                  aria-invalid={Boolean(fieldErrors.title)}
                  aria-describedby={formError ? 'external-mission-form-error' : undefined}
                />
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.service}</span>
                <select className="m3s-field mt-1 w-full" value={form.service} onChange={event => set('service', event.target.value)}>{Object.entries(t.services).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.sensitivity}</span>
                <select className="m3s-field mt-1 w-full" value={form.sensitivity} onChange={event => { set('sensitivity', event.target.value); if (event.target.value === 'restricted') setFieldErrors(current => ({ ...current, title: false })); }}>{Object.entries(t.sensitivities).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.status}</span>
                <select className="m3s-field mt-1 w-full" value={form.status} onChange={event => setStatus(event.target.value)}>{Object.entries(t.statuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.owner} *</span>
                <select
                  className={`m3s-field mt-1 w-full ${invalidFieldClass('owner')}`}
                  value={form.owner}
                  onChange={event => set('owner', event.target.value)}
                  required
                  aria-label={`${t.fields.owner} *`}
                  aria-invalid={Boolean(fieldErrors.owner)}
                  aria-describedby="external-mission-owner-help"
                >
                  <option value="">{t.selectOwner}</option>
                  {availableOwnerOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <p id="external-mission-owner-help" className="mt-1 text-xs leading-5 text-slate-400">
                  {ownerDirectoryStatus === 'loading' ? t.ownerLoading : ownerDirectoryStatus === 'fallback' ? t.ownerFallback : t.ownerRule}
                </p>
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.sentDate}{form.status !== 'prepared' ? ' *' : ''}</span>
                <input
                  type="date"
                  className={`m3s-field m3s-native-date mt-1 w-full ${invalidFieldClass('sentDate')}`}
                  value={form.sentDate}
                  onChange={event => set('sentDate', event.target.value)}
                  required={form.status !== 'prepared'}
                  aria-invalid={Boolean(fieldErrors.sentDate)}
                />
              </label>
              <label>
                <span className="m3s-field-label">{t.fields.deadline} · {t.optional}</span>
                <input type="date" className="m3s-field m3s-native-date mt-1 w-full" value={form.deadline} onChange={event => set('deadline', event.target.value)} />
              </label>
              {form.sensitivity !== 'restricted' && (
                <>
                  <label>
                    <span className="m3s-field-label">{t.fields.taskRef} · {t.optional}</span>
                    <input aria-label={t.fields.taskRef} className="m3s-field mt-1 w-full" value={form.taskRef} onChange={event => set('taskRef', event.target.value)} placeholder="TASK-LEGAL-01" />
                    <p className="mt-1 text-xs leading-5 text-slate-400">{t.help.taskRef}</p>
                  </label>
                  <label>
                    <span className="m3s-field-label">{t.fields.gedRef} · {t.optional}</span>
                    <input aria-label={t.fields.gedRef} className="m3s-field mt-1 w-full" value={form.gedRef} onChange={event => set('gedRef', event.target.value)} placeholder="GED / LEGAL / CGU" />
                    <p className="mt-1 text-xs leading-5 text-slate-400">{t.help.gedRef}</p>
                  </label>
                  <label className="sm:col-span-2">
                    <span className="m3s-field-label">{t.fields.deliverableRef} · {t.optional}</span>
                    <input aria-label={t.fields.deliverableRef} className="m3s-field mt-1 w-full" value={form.deliverableRef} onChange={event => set('deliverableRef', event.target.value)} placeholder="LIV-EXT-2026-001" />
                    <p className="mt-1 text-xs leading-5 text-slate-400">{t.help.deliverableRef}</p>
                  </label>
                </>
              )}
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end">
              <button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={close}>{t.cancel}</button>
              <button type="submit" className={`${editingId === 'new' ? 'm3s-success-button' : 'm3s-primary-button'} min-h-11 gap-2 px-4`}><FileCheck2 size={18} />{editingId === 'new' ? t.save : t.update}</button>
            </div>
          </form>
        </div>
      )}
      {pendingAction && confirmation && <ActionConfirmationDialog id="external-mission-confirmation" title={confirmation.title} body={confirmation.body.replace('{title}', confirmationTitle || '')} cancelLabel={t.decline} confirmLabel={confirmation.confirm} action={pendingAction.type} onCancel={() => setPendingAction(null)} onConfirm={confirmPendingAction} />}
    </section>
  );
};

export { STORAGE_KEY_PREFIX };
export default ExternalMissionRegister;
