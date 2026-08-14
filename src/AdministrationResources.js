import React, { useEffect, useMemo, useState } from 'react';
import { BookMarked, Database, Edit2, FolderLock, HardDrive, Library, Loader2, Plus, Search, ShieldAlert, Trash2, X } from 'lucide-react';
import api from './api';
import { useAuth } from './AuthContext';
import { ADMINISTRATION_RESOURCES_WRITE_PERMISSION, hasPermission } from './accessControl';
import { isDemoSession, resourceFromApi, resourceToApi } from './administrationRegistryAdapters';
import ActionConfirmationDialog from './ActionConfirmationDialog';

const STORAGE_KEY_PREFIX = 'm3s-administration-resources-v2';

const COPY = {
  FR: {
    eyebrow: 'RESSOURCES ADMINISTRATIVES · REGISTRE GOUVERNÉ', title: 'Sources, favoris et références de la fonction',
    intro: 'Ce registre qualifie les ressources utiles sans remplacer la GED, le registre LEGAL ni les sources officielles. Les dossiers de favoris restent une base initiale non exhaustive.',
    add: 'Ajouter une ressource', search: 'Rechercher une ressource', all: 'Toutes les familles', empty: 'Aucune ressource ne correspond aux filtres.', readOnly: 'Lecture seule',
    edit: 'Modifier', delete: 'Supprimer', close: 'Fermer', cancel: 'Annuler', save: 'Enregistrer', update: 'Modifier',
    confirmCreateTitle: 'Confirmer l’ajout', confirmCreate: 'Oui, ajouter', confirmUpdateTitle: 'Confirmer la modification', confirmUpdate: 'Oui, modifier', confirmDeleteTitle: 'Confirmer la suppression', confirmDelete: 'Oui, supprimer', decline: 'Non',
    confirmCreateBody: 'Ajouter « {title} » au registre des ressources ?', confirmUpdateBody: 'Enregistrer les modifications de « {title} » ?', confirmDeleteBody: 'Supprimer « {title} » du registre des ressources ?',
    saved: 'Ressource enregistrée avec succès.', deleted: 'Ressource supprimée avec succès.', required: 'Complétez les champs obligatoires.', saveFailed: 'Enregistrement impossible. Vérifiez vos droits ou réessayez.', deleteFailed: 'Suppression impossible. Vérifiez vos droits ou réessayez.',
    fields: { title: 'Titre', family: 'Famille', authority: 'Autorité ou propriétaire', location: 'URL ou emplacement GED', status: 'Statut de la source', review: 'Statut de revue', confidentiality: 'Confidentialité', note: 'Note' },
    sourceStatus: ['Officielle', 'Interne gouvernée', 'À qualifier'], reviewStatus: ['Contrôlée', 'À revoir', 'À compléter'], confidentiality: ['Public', 'Interne', 'Restreint'],
    families: ['LEGAL & Réglementaire', 'Institution & Gouvernance', 'Processus & Méthodes', 'Planification & Projets'],
    boundary: 'Un favori facilite l’accès. Il ne prouve ni l’actualité, ni l’applicabilité, ni la conformité juridique d’une règle.'
  },
  EN: {
    eyebrow: 'ADMINISTRATIVE RESOURCES · GOVERNED REGISTER', title: 'Function sources, bookmarks and references',
    intro: 'This register qualifies useful resources without replacing the DMS, the LEGAL register or official sources. Bookmark folders remain an initial, non-exhaustive base.',
    add: 'Add resource', search: 'Search resources', all: 'All families', empty: 'No resource matches the filters.', readOnly: 'Read only',
    edit: 'Edit', delete: 'Delete', close: 'Close', cancel: 'Cancel', save: 'Save', update: 'Update',
    confirmCreateTitle: 'Confirm addition', confirmCreate: 'Yes, add', confirmUpdateTitle: 'Confirm update', confirmUpdate: 'Yes, update', confirmDeleteTitle: 'Confirm deletion', confirmDelete: 'Yes, delete', decline: 'No',
    confirmCreateBody: 'Add “{title}” to the resource register?', confirmUpdateBody: 'Save the changes to “{title}”?', confirmDeleteBody: 'Delete “{title}” from the resource register?', saved: 'Resource saved successfully.', deleted: 'Resource deleted successfully.', required: 'Complete the required fields.', saveFailed: 'Unable to save. Check your permissions or try again.', deleteFailed: 'Unable to delete. Check your permissions or try again.',
    fields: { title: 'Title', family: 'Family', authority: 'Authority or owner', location: 'URL or DMS location', status: 'Source status', review: 'Review status', confidentiality: 'Confidentiality', note: 'Note' },
    sourceStatus: ['Official', 'Governed internal', 'To qualify'], reviewStatus: ['Controlled', 'To review', 'To complete'], confidentiality: ['Public', 'Internal', 'Restricted'],
    families: ['LEGAL & Regulatory', 'Institution & Governance', 'Processes & Methods', 'Planning & Projects'], boundary: 'A bookmark makes access easier. It proves neither currency, applicability nor legal compliance.'
  },
  DE: {
    eyebrow: 'VERWALTUNGSRESSOURCEN · GESTEUERTES REGISTER', title: 'Quellen, Favoriten und Referenzen der Funktion',
    intro: 'Dieses Register qualifiziert nützliche Ressourcen, ohne DMS, LEGAL-Register oder amtliche Quellen zu ersetzen. Favoritenordner bleiben eine erste, nicht abschließende Grundlage.',
    add: 'Ressource hinzufügen', search: 'Ressourcen suchen', all: 'Alle Familien', empty: 'Keine Ressource entspricht den Filtern.', readOnly: 'Nur Lesen',
    edit: 'Bearbeiten', delete: 'Löschen', close: 'Schließen', cancel: 'Abbrechen', save: 'Speichern', update: 'Ändern',
    confirmCreateTitle: 'Hinzufügen bestätigen', confirmCreate: 'Ja, hinzufügen', confirmUpdateTitle: 'Änderung bestätigen', confirmUpdate: 'Ja, ändern', confirmDeleteTitle: 'Löschen bestätigen', confirmDelete: 'Ja, löschen', decline: 'Nein',
    confirmCreateBody: '„{title}“ zum Ressourcenregister hinzufügen?', confirmUpdateBody: 'Änderungen an „{title}“ speichern?', confirmDeleteBody: '„{title}“ aus dem Ressourcenregister löschen?', saved: 'Ressource erfolgreich gespeichert.', deleted: 'Ressource erfolgreich gelöscht.', required: 'Pflichtfelder ausfüllen.', saveFailed: 'Speichern nicht möglich. Berechtigungen prüfen oder erneut versuchen.', deleteFailed: 'Löschen nicht möglich. Berechtigungen prüfen oder erneut versuchen.',
    fields: { title: 'Titel', family: 'Familie', authority: 'Behörde oder Eigentümer', location: 'URL oder DMS-Ablage', status: 'Quellenstatus', review: 'Prüfstatus', confidentiality: 'Vertraulichkeit', note: 'Notiz' },
    sourceStatus: ['Amtlich', 'Intern gesteuert', 'Zu qualifizieren'], reviewStatus: ['Kontrolliert', 'Zu prüfen', 'Zu ergänzen'], confidentiality: ['Öffentlich', 'Intern', 'Eingeschränkt'],
    families: ['LEGAL & Regulierung', 'Institution & Governance', 'Prozesse & Methoden', 'Planung & Projekte'], boundary: 'Ein Favorit erleichtert den Zugriff. Er belegt weder Aktualität noch Anwendbarkeit oder Rechtskonformität.'
  }
};

const SOURCE_COPY = {
  FR: { loading: 'Connexion à la source sécurisée', backend: 'Source backend sécurisée', local: 'Pilote local · backend indisponible', forbidden: 'Accès au registre non autorisé', reference: 'Référence documentaire', retained: 'Les anciennes entrées locales restent dans ce navigateur et ne sont jamais importées automatiquement.' },
  EN: { loading: 'Connecting to the secure source', backend: 'Secure backend source', local: 'Local pilot · backend unavailable', forbidden: 'Register access not authorised', reference: 'Documentary reference', retained: 'Previous local entries remain in this browser and are never imported automatically.' },
  DE: { loading: 'Verbindung zur sicheren Quelle', backend: 'Sichere Backend-Quelle', local: 'Lokaler Pilot · Backend nicht verfügbar', forbidden: 'Registerzugriff nicht autorisiert', reference: 'Dokumentarische Referenz', retained: 'Frühere lokale Einträge bleiben in diesem Browser und werden nie automatisch importiert.' }
};

const SEED = [
  { id: 'RES-001', contentKey: 'inventory', sourceKind: 'baseline', title: 'Inventaire documentaire gouverné 2SG/M3S', familyIndex: 0, authority: 'Administration 2SG / GED', location: 'GED / Administration / LEGAL / Inventaire gouverné', statusIndex: 1, reviewIndex: 0, confidentialityIndex: 1, note: 'Registre de statut documentaire. Validation sur le fond, signature et adoption restent distinctes.' },
  { id: 'RES-002', contentKey: 'swissLegal', sourceKind: 'baseline', title: 'Favoris officiels LEGAL - Suisse', familyIndex: 0, authority: 'SECO et autorités compétentes', location: 'Favoris Administration / LEGAL / Suisse', statusIndex: 2, reviewIndex: 2, confidentialityIndex: 0, note: 'Base initiale non exhaustive à qualifier par obligation, territoire et date.' },
  { id: 'RES-003', contentKey: 'senegalLegal', sourceKind: 'baseline', title: 'Favoris officiels LEGAL - Sénégal', familyIndex: 0, authority: 'PFPDT, CDP et autorités compétentes', location: 'Favoris Administration / LEGAL / Sénégal', statusIndex: 2, reviewIndex: 2, confidentialityIndex: 0, note: 'CDP et applicabilité des sources à confirmer. Ne constitue pas un avis juridique.' },
  { id: 'RES-004', contentKey: 'administrationPilot', sourceKind: 'baseline', title: 'Pilote Administration M3S', familyIndex: 2, authority: '2SG / M3S', location: 'GED / Référentiels / Administration pilote', statusIndex: 1, reviewIndex: 0, confidentialityIndex: 1, note: 'Capital réutilisable pour les autres fonctions M3S.' }
];

const SEED_CONTENT = {
  EN: {
    inventory: { title: '2SG/M3S governed document inventory', authority: '2SG Administration / DMS', location: 'DMS / Administration / LEGAL / Governed inventory', note: 'Document status register. Substantive validation, signature and adoption remain distinct.' },
    swissLegal: { title: 'Official LEGAL bookmarks - Switzerland', authority: 'SECO and competent authorities', location: 'Administration bookmarks / LEGAL / Switzerland', note: 'Initial non-exhaustive base to qualify by obligation, territory and date.' },
    senegalLegal: { title: 'Official LEGAL bookmarks - Senegal', authority: 'PFPDT, CDP and competent authorities', location: 'Administration bookmarks / LEGAL / Senegal', note: 'CDP sources and applicability remain to be confirmed. This is not legal advice.' },
    administrationPilot: { title: 'M3S Administration pilot', authority: '2SG / M3S', location: 'DMS / Reference frameworks / Administration pilot', note: 'Reusable capital for other M3S functions.' }
  },
  DE: {
    inventory: { title: 'Gesteuertes 2SG/M3S-Dokumenteninventar', authority: '2SG-Verwaltung / DMS', location: 'DMS / Verwaltung / LEGAL / Gesteuertes Inventar', note: 'Register der Dokumentenstatus. Inhaltliche Validierung, Unterzeichnung und Verabschiedung bleiben getrennt.' },
    swissLegal: { title: 'Amtliche LEGAL-Favoriten - Schweiz', authority: 'SECO und zuständige Behörden', location: 'Favoriten Verwaltung / LEGAL / Schweiz', note: 'Erste, nicht abschließende Grundlage, nach Pflicht, Gebiet und Datum zu qualifizieren.' },
    senegalLegal: { title: 'Amtliche LEGAL-Favoriten - Senegal', authority: 'PFPDT, CDP und zuständige Behörden', location: 'Favoriten Verwaltung / LEGAL / Senegal', note: 'CDP-Quellen und Anwendbarkeit sind zu bestätigen. Dies ist keine Rechtsberatung.' },
    administrationPilot: { title: 'M3S-Verwaltungspilot', authority: '2SG / M3S', location: 'DMS / Referenzrahmen / Verwaltungspilot', note: 'Wiederverwendbares Kapital für weitere M3S-Funktionen.' }
  }
};

const localizeResource = (item, language) => {
  const translated = item.contentKey ? SEED_CONTENT[language]?.[item.contentKey] : null;
  return translated ? { ...item, ...translated } : item;
};

const emptyForm = { title: '', familyIndex: 0, authority: '', location: '', statusIndex: 2, reviewIndex: 2, confidentialityIndex: 1, note: '' };

const getStorageKey = user => {
  const userIdentifier = user?.id || user?.email || user?.name || 'anonymous';
  const tenantIdentifier = user?.tenantId || user?.organizationId || '2sg';
  return `${STORAGE_KEY_PREFIX}:${encodeURIComponent(tenantIdentifier)}:${encodeURIComponent(userIdentifier)}`;
};

const loadResources = storageKey => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const AdministrationResources = ({ language = 'FR' }) => {
  const { token, user } = useAuth();
  const t = COPY[language] || COPY.FR;
  const sourceText = SOURCE_COPY[language] || SOURCE_COPY.FR;
  const storageKey = useMemo(() => getStorageKey(user), [user]);
  const [resources, setResources] = useState([]);
  const [sourceState, setSourceState] = useState('loading');
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const hasWritePermission = hasPermission(user?.permissions, ADMINISTRATION_RESOURCES_WRITE_PERMISSION);
  const canWrite = hasWritePermission && (sourceState === 'backend' || sourceState === 'local');

  useEffect(() => {
    let active = true;
    const loadLocalSource = () => {
      if (!active) return;
      setResources(loadResources(storageKey));
      setSourceState('local');
    };
    if (!token || isDemoSession(token)) {
      loadLocalSource();
      return () => { active = false; };
    }
    setSourceState('loading');
    api.getAdministrationResources().then(result => {
      if (!active) return;
      setResources((result.data || []).map(resourceFromApi));
      setSourceState('backend');
    }).catch(error => {
      if (!active) return;
      if (error.status === 403 || error.status === 401) {
        setResources([]);
        setSourceState('forbidden');
        return;
      }
      loadLocalSource();
    });
    return () => { active = false; };
  }, [storageKey, token]);

  const visible = useMemo(() => [...SEED, ...resources].map(item => localizeResource(item, language)).filter(item => {
    const matchesFamily = familyFilter === 'all' || String(item.familyIndex) === familyFilter;
    const haystack = `${item.title} ${item.authority} ${item.location} ${item.note}`.toLowerCase();
    return matchesFamily && haystack.includes(query.trim().toLowerCase());
  }), [familyFilter, language, query, resources]);

  const persist = next => {
    setResources(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const openCreate = () => { if (!canWrite) return; setEditing('new'); setForm(emptyForm); setMessage(''); };
  const openEdit = item => { if (!canWrite) return; setEditing(item.id); setForm({ ...item }); setMessage(''); };
  const close = () => { setEditing(null); setForm(emptyForm); };
  const save = event => {
    event.preventDefault();
    if (!canWrite) return;
    if (!form.title.trim() || !form.authority.trim() || !form.location.trim()) { setMessage(t.required); return; }
    setPendingAction({ type: editing === 'new' ? 'create' : 'update', editing, form: { ...form } });
  };
  const remove = item => { if (canWrite) setPendingAction({ type: 'delete', item }); };
  const confirmPendingAction = async () => {
    if (!pendingAction || !canWrite) return;
    const action = pendingAction;
    setBusy(true);
    try {
      if (action.type === 'delete') {
        if (sourceState === 'backend') await api.deleteAdministrationResource(action.item.id);
        const nextResources = resources.filter(current => current.id !== action.item.id);
        if (sourceState === 'local') window.localStorage.setItem(storageKey, JSON.stringify(nextResources));
        setResources(nextResources);
        setMessage(t.deleted);
      } else {
        const { contentKey, sourceKind, ...editableFields } = action.form;
        const item = { ...editableFields, id: action.editing === 'new' ? `RES-${Date.now()}` : action.editing, sourceKind: sourceState };
        if (sourceState === 'backend') {
          const result = action.type === 'create'
            ? await api.createAdministrationResource(resourceToApi(item))
            : await api.updateAdministrationResource(action.editing, resourceToApi(item));
          const savedItem = resourceFromApi(result.data);
          setResources(action.type === 'create' ? [savedItem, ...resources] : resources.map(current => current.id === action.editing ? savedItem : current));
        } else if (sourceState === 'local') {
          persist(action.type === 'create' ? [item, ...resources] : resources.map(current => current.id === action.editing ? item : current));
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
    delete: { title: t.confirmDeleteTitle, body: t.confirmDeleteBody, confirm: t.confirmDelete }
  }[pendingAction.type] : null;
  const confirmationTitle = pendingAction?.type === 'delete' ? pendingAction.item.title : pendingAction?.form.title;
  const SourceIcon = sourceState === 'backend' ? Database : sourceState === 'local' ? HardDrive : sourceState === 'forbidden' ? ShieldAlert : Loader2;

  return (
    <section className="administration-resources administration-overview space-y-5" aria-labelledby="administration-resources-title">
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl"><p className="text-xs font-bold uppercase text-cyan-300">{t.eyebrow}</p><h2 id="administration-resources-title" className="m3s-page-title mt-2">{t.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{t.intro}</p></div>
          <div className="flex flex-col items-start gap-2 lg:items-end"><span className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300"><SourceIcon size={15} className={sourceState === 'loading' ? 'animate-spin' : ''} />{sourceText[sourceState]}</span>{!hasWritePermission && <span className="rounded-full border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-300">{t.readOnly}</span>}{hasWritePermission && <button type="button" className="m3s-success-button min-h-11 gap-2 px-4" onClick={openCreate} disabled={!canWrite || busy}><Plus size={18} />{t.add}</button>}</div>
        </div>
      </header>

      {message && <p className="rounded-md border border-emerald-700 bg-emerald-950/25 px-4 py-3 text-sm font-semibold text-emerald-200" role="status">{message}</p>}
      {sourceState === 'local' && <p className="rounded-md border border-amber-700 bg-amber-950/20 px-4 py-3 text-sm text-amber-100">{sourceText.retained}</p>}

      <div className="m3s-panel grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_260px]">
        <label className="relative"><Search className="absolute left-3 top-3 text-slate-500" size={18} /><span className="sr-only">{t.search}</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search} className="m3s-field min-h-11 w-full pl-10" /></label>
        <select value={familyFilter} onChange={event => setFamilyFilter(event.target.value)} className="m3s-field min-h-11"><option value="all">{t.all}</option>{t.families.map((label, index) => <option key={label} value={index}>{label}</option>)}</select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map(item => (
          <article key={item.id} className="m3s-panel flex min-h-72 flex-col p-5 transition hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-950 text-cyan-300"><BookMarked size={21} /></span><div className="flex flex-col items-end gap-1"><span className="rounded-full border border-slate-600 px-2.5 py-1 text-xs font-semibold text-slate-300">{t.reviewStatus[item.reviewIndex]}</span><span className="text-[11px] font-semibold uppercase text-slate-500">{item.sourceKind === 'baseline' ? sourceText.reference : sourceText[sourceState]}</span></div></div>
            <h3 className="mt-4 text-lg font-semibold text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-cyan-200">{t.families[item.familyIndex]}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
            <dl className="mt-4 space-y-2 border-t border-slate-700 pt-3 text-sm"><div><dt className="text-xs uppercase text-slate-500">{t.fields.authority}</dt><dd className="mt-1 text-slate-300">{item.authority}</dd></div><div><dt className="text-xs uppercase text-slate-500">{t.fields.location}</dt><dd className="mt-1 break-words text-slate-300">{item.location}</dd></div></dl>
            {canWrite && item.sourceKind !== 'baseline' && <div className="mt-auto flex flex-wrap gap-2 pt-4"><button type="button" className="m3s-secondary-button min-h-10 gap-2 px-3" onClick={() => openEdit(item)} disabled={busy}><Edit2 size={16} />{t.edit}</button><button type="button" className="m3s-danger-button min-h-10 gap-2 px-3" onClick={() => remove(item)} disabled={busy}><Trash2 size={16} />{t.delete}</button></div>}
          </article>
        ))}
        {!visible.length && <div className="m3s-panel col-span-full p-8 text-center text-slate-400"><Library className="mx-auto mb-3" />{t.empty}</div>}
      </div>

      <aside className="rounded-lg border border-amber-800 bg-amber-950/20 p-4 text-sm leading-6 text-amber-100"><FolderLock className="mr-2 inline" size={18} />{t.boundary}</aside>

      {canWrite && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4" role="presentation">
          <form onSubmit={save} className="m3s-panel max-h-[92vh] w-full max-w-3xl overflow-y-auto p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="resource-form-title">
            <div className="flex items-start justify-between gap-3"><h2 id="resource-form-title" className="m3s-page-title">{editing === 'new' ? t.add : t.edit}</h2><button type="button" className="m3s-icon-button" onClick={close} aria-label={t.close}><X size={20} /></button></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="m3s-field-label">{t.fields.title} *</span><input className="m3s-field mt-1 w-full" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} /></label>
              <label><span className="m3s-field-label">{t.fields.family} *</span><select className="m3s-field mt-1 w-full" value={form.familyIndex} onChange={event => setForm({ ...form, familyIndex: Number(event.target.value) })}>{t.families.map((label, index) => <option key={label} value={index}>{label}</option>)}</select></label>
              <label><span className="m3s-field-label">{t.fields.authority} *</span><input className="m3s-field mt-1 w-full" value={form.authority} onChange={event => setForm({ ...form, authority: event.target.value })} /></label>
              <label className="sm:col-span-2"><span className="m3s-field-label">{t.fields.location} *</span><input className="m3s-field mt-1 w-full" value={form.location} onChange={event => setForm({ ...form, location: event.target.value })} /></label>
              <label><span className="m3s-field-label">{t.fields.status}</span><select className="m3s-field mt-1 w-full" value={form.statusIndex} onChange={event => setForm({ ...form, statusIndex: Number(event.target.value) })}>{t.sourceStatus.map((label, index) => <option key={label} value={index}>{label}</option>)}</select></label>
              <label><span className="m3s-field-label">{t.fields.review}</span><select className="m3s-field mt-1 w-full" value={form.reviewIndex} onChange={event => setForm({ ...form, reviewIndex: Number(event.target.value) })}>{t.reviewStatus.map((label, index) => <option key={label} value={index}>{label}</option>)}</select></label>
              <label><span className="m3s-field-label">{t.fields.confidentiality}</span><select className="m3s-field mt-1 w-full" value={form.confidentialityIndex} onChange={event => setForm({ ...form, confidentialityIndex: Number(event.target.value) })}>{t.confidentiality.map((label, index) => <option key={label} value={index}>{label}</option>)}</select></label>
              <label className="sm:col-span-2"><span className="m3s-field-label">{t.fields.note}</span><textarea className="m3s-field mt-1 min-h-24 w-full" value={form.note} onChange={event => setForm({ ...form, note: event.target.value })} /></label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end"><button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={close} disabled={busy}>{t.cancel}</button><button type="submit" className="m3s-success-button min-h-11 px-4" disabled={busy}>{editing === 'new' ? t.save : t.update}</button></div>
          </form>
        </div>
      )}
      {pendingAction && confirmation && (
        <ActionConfirmationDialog
          id="resource-confirmation"
          title={confirmation.title}
          body={confirmation.body.replace('{title}', confirmationTitle || '')}
          cancelLabel={t.decline}
          confirmLabel={confirmation.confirm}
          action={pendingAction.type}
          busy={busy}
          onCancel={() => setPendingAction(null)}
          onConfirm={confirmPendingAction}
        />
      )}
    </section>
  );
};

export default AdministrationResources;
