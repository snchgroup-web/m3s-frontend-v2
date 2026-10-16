import React, { useRef, useState } from 'react';
import { Download, Plus, Upload } from 'lucide-react';
import ActionConfirmationDialog from './ActionConfirmationDialog';
import { StandardCreateButton } from './StandardUI';
import { formatRegistryDate } from './registryDate';
import { appendServiceCycleEvent, createServiceCycle, hasServiceCycleSources, readServiceCycleFile, serviceCycleJson, serviceCycleToday, validateServiceCycle } from './productionServiceCycleModel';

const COPY = {
  FR: {
    title: 'Réalisation, livraison et réception', local: 'Préparation locale · non enregistrée dans M3S',
    referencesOnly: 'Références déclarées · pièces et habilitations non vérifiées',
    track: 'Parcours de préparation', documents: 'Organisation documentaire', rh: 'RH de proximité',
    sourceMissing: 'Dossiers sources incomplets : préparation indisponible.', scope: 'Périmètre du livrable', owner: 'Responsable de préparation',
    project: 'Référence projet ou tâche', authorization: 'Référence du cadrage autorisé', optional: 'facultatif',
    create: 'Préparer un cycle', newCycle: 'Nouveau cycle', export: 'Exporter la préparation JSON', import: 'Reprendre une préparation JSON',
    realized: 'Réalisation documentée', delivered: 'Remise documentée', accepted: 'Acceptation rapportée', reserved: 'Réserves rapportées', rejected: 'Refus rapporté', planned: 'À préparer',
    realization: 'Réalisation', delivery: 'Livraison', acceptance: 'Réception de la prestation', pending: 'Non documentée',
    date: 'Date du fait', evidence: 'Référence de preuve', deliverable: 'Référence du livrable', version: 'Version',
    recipient: 'Destinataire de la remise', channel: 'Canal de remise', email: 'E-mail', secure_link: 'Lien sécurisé', hand_delivery: 'Remise en main propre',
    outcome: 'Retour documenté', reservations: 'Réserves ou motif du refus', add: 'Ajouter à la préparation',
    added: 'Étape ajoutée à la préparation locale.', imported: 'Préparation locale reprise.', exported: 'Préparation exportée.',
    empty: 'Aucune étape documentée.', history: 'Historique de préparation', step: 'Étape', state: 'État de la préparation',
    confirmTitle: 'Confirmer cette préparation', confirmBody: 'Cette action modifie uniquement la préparation locale. Aucun enregistrement partagé, envoi ou réception réelle dans M3S.',
    replaceBody: 'Remplacer la préparation locale de ce parcours ? Les autres parcours et les fichiers exportés restent conservés.',
    confirm: 'Confirmer', cancel: 'Annuler',
    errors: { required: 'Renseignez les champs obligatoires.', date: 'Date réelle attendue, non future.', chronology: 'La date précède l’étape précédente.', transition: 'Cette étape ne suit pas le cycle attendu.', version: 'La version doit correspondre à la remise ; une reprise exige une nouvelle version.', recipient: 'Le retour ne correspond pas au destinataire de cette remise.', reservations: 'Une acceptation sans réserve ne peut pas contenir de réserve.', source: 'Le parcours ou les références sources ne correspondent pas.', limit: 'La limite de ce cycle est atteinte.', invalid: 'Préparation ou référence non conforme.' }
  },
  EN: {
    title: 'Realisation, delivery and acceptance', local: 'Local preparation · not recorded in M3S',
    referencesOnly: 'Declared references · files and authority not verified',
    track: 'Preparation path', documents: 'Document organisation', rh: 'Proximity HR',
    sourceMissing: 'Source dossiers incomplete: preparation unavailable.', scope: 'Deliverable scope', owner: 'Preparation owner',
    project: 'Project or task reference', authorization: 'Authorised scope reference', optional: 'optional',
    create: 'Prepare a cycle', newCycle: 'New cycle', export: 'Export preparation JSON', import: 'Resume preparation JSON',
    realized: 'Realisation documented', delivered: 'Handover documented', accepted: 'Reported acceptance', reserved: 'Reported reservations', rejected: 'Reported rejection', planned: 'To prepare',
    realization: 'Realisation', delivery: 'Delivery', acceptance: 'Service acceptance', pending: 'Not documented',
    date: 'Event date', evidence: 'Evidence reference', deliverable: 'Deliverable reference', version: 'Version',
    recipient: 'Handover recipient', channel: 'Handover channel', email: 'Email', secure_link: 'Secure link', hand_delivery: 'Hand delivery',
    outcome: 'Documented response', reservations: 'Reservations or rejection reason', add: 'Add to preparation',
    added: 'Stage added to the local preparation.', imported: 'Local preparation resumed.', exported: 'Preparation exported.',
    empty: 'No documented stage.', history: 'Preparation history', step: 'Stage', state: 'Preparation state',
    confirmTitle: 'Confirm this preparation', confirmBody: 'This action changes only the local preparation. No shared record, sending or actual acceptance in M3S.',
    replaceBody: 'Replace the local preparation for this path? Other paths and exported files are preserved.',
    confirm: 'Confirm', cancel: 'Cancel',
    errors: { required: 'Complete the required fields.', date: 'A real, non-future date is required.', chronology: 'The date precedes the previous stage.', transition: 'This stage does not follow the expected cycle.', version: 'The version must match the handover; rework requires a new version.', recipient: 'The response does not match this handover recipient.', reservations: 'Acceptance without reservations cannot contain a reservation.', source: 'The path or source references do not match.', limit: 'The cycle limit has been reached.', invalid: 'Invalid preparation or reference.' }
  },
  DE: {
    title: 'Realisierung, Lieferung und Abnahme', local: 'Lokale Vorbereitung · nicht in M3S gespeichert',
    referencesOnly: 'Angegebene Referenzen · Dateien und Befugnisse nicht geprüft',
    track: 'Vorbereitungsweg', documents: 'Dokumentenorganisation', rh: 'Wohnortnahe Personalarbeit',
    sourceMissing: 'Quellendossiers unvollständig: Vorbereitung nicht verfügbar.', scope: 'Umfang des Ergebnisses', owner: 'Verantwortung für die Vorbereitung',
    project: 'Projekt- oder Aufgabenreferenz', authorization: 'Referenz des freigegebenen Umfangs', optional: 'optional',
    create: 'Zyklus vorbereiten', newCycle: 'Neuer Zyklus', export: 'Vorbereitung als JSON exportieren', import: 'JSON-Vorbereitung fortsetzen',
    realized: 'Realisierung dokumentiert', delivered: 'Übergabe dokumentiert', accepted: 'Gemeldete Abnahme', reserved: 'Gemeldete Vorbehalte', rejected: 'Gemeldete Ablehnung', planned: 'Vorzubereiten',
    realization: 'Realisierung', delivery: 'Lieferung', acceptance: 'Abnahme der Leistung', pending: 'Nicht dokumentiert',
    date: 'Ereignisdatum', evidence: 'Nachweisreferenz', deliverable: 'Ergebnisreferenz', version: 'Version',
    recipient: 'Empfänger der Übergabe', channel: 'Übergabekanal', email: 'E-Mail', secure_link: 'Geschützter Link', hand_delivery: 'Persönliche Übergabe',
    outcome: 'Dokumentierte Rückmeldung', reservations: 'Vorbehalte oder Ablehnungsgrund', add: 'Zur Vorbereitung hinzufügen',
    added: 'Schritt zur lokalen Vorbereitung hinzugefügt.', imported: 'Lokale Vorbereitung fortgesetzt.', exported: 'Vorbereitung exportiert.',
    empty: 'Kein dokumentierter Schritt.', history: 'Vorbereitungsverlauf', step: 'Schritt', state: 'Vorbereitungsstand',
    confirmTitle: 'Diese Vorbereitung bestätigen', confirmBody: 'Diese Aktion ändert nur die lokale Vorbereitung. Kein gemeinsamer Eintrag, Versand oder tatsächliche Abnahme in M3S.',
    replaceBody: 'Lokale Vorbereitung dieses Weges ersetzen? Andere Wege und exportierte Dateien bleiben erhalten.',
    confirm: 'Bestätigen', cancel: 'Abbrechen',
    errors: { required: 'Pflichtfelder ausfüllen.', date: 'Ein echtes, nicht zukünftiges Datum ist erforderlich.', chronology: 'Das Datum liegt vor dem vorherigen Schritt.', transition: 'Dieser Schritt entspricht nicht dem erwarteten Ablauf.', version: 'Die Version muss zur Übergabe passen; Nacharbeit braucht eine neue Version.', recipient: 'Die Rückmeldung passt nicht zum Übergabeempfänger.', reservations: 'Eine vorbehaltlose Abnahme darf keinen Vorbehalt enthalten.', source: 'Weg oder Quellenreferenzen stimmen nicht überein.', limit: 'Die Zyklusgrenze ist erreicht.', invalid: 'Ungültige Vorbereitung oder Referenz.' }
  }
};
const emptyEvent = () => ({ occurred_on: '', evidence_reference: '', deliverable_reference: '', version: '', recipient: '', channel: 'email', outcome: 'accepted', reservations: '' });
const emptySetup = () => ({ scope: '', owner: '', project_reference: '', authorization_reference: '' });
const fieldClass = 'm3s-field min-h-11 w-full min-w-0 px-3 py-2';
const iconClass = 'm3s-secondary-button inline-flex min-h-11 min-w-11 items-center justify-center';
const SHARED_COPY = {
  FR: { local: 'Stockage partagé M3S · droits dédiés', referencesOnly: 'Références déclarées · contenu des pièces non vérifié', add: 'Enregistrer cette étape', confirmBody: 'Enregistrer ces références dans le suivi partagé ? Aucun envoi, paiement ou signature. La réception reste rapportée, non signée.', history: 'Historique partagé', readOnly: 'Votre accès ne permet pas d’enregistrer cette étape.' },
  DE: { local: 'Gemeinsame M3S-Speicherung · eigene Rechte', referencesOnly: 'Angegebene Referenzen · Dateiinhalt nicht verifiziert', add: 'Diesen Schritt speichern', confirmBody: 'Diese Referenzen gemeinsam speichern? Kein Versand, keine Zahlung oder Unterschrift. Die Abnahme bleibt gemeldet, nicht unterschrieben.', history: 'Gemeinsamer Verlauf', readOnly: 'Ihr Zugriff erlaubt das Speichern dieses Schritts nicht.' },
  EN: { local: 'Shared M3S storage · dedicated permissions', referencesOnly: 'Declared references · file content not verified', add: 'Record this stage', confirmBody: 'Record these references in shared storage? No sending, payment or signature. Acceptance remains reported, not signed.', history: 'Shared history', readOnly: 'Your access does not permit recording this stage.' }
};

export default function ProductionServiceCycle({ language = 'FR', sourceKind, sourceRows = [], shared = null }) {
  const t = { ...(COPY[language] || COPY.FR), ...(shared ? SHARED_COPY[language] || SHARED_COPY.FR : {}) };
  const [localTrack, setTrack] = useState('documents');
  const track = shared ? shared.track : localTrack;
  const [cycles, setCycles] = useState({});
  const [setup, setSetup] = useState(emptySetup);
  const [form, setForm] = useState(emptyEvent);
  const [notice, setNotice] = useState(null);
  const [pending, setPending] = useState(null);
  const fileRef = useRef(null);
  const importSequence = useRef(0);
  const cycle = shared ? shared.cycle : cycles[track];
  const state = cycle ? validateServiceCycle(cycle).state : 'planned';
  const step = state === 'realized' ? 'delivery' : state === 'delivered' ? 'acceptance' : 'realization';
  const sources = sourceRows.filter(row => (track === 'documents' ? ['GD-005', 'GD-006'] : ['GD-008', 'GD-009']).includes(row.dossier_id)).map(row => row.dossier_id);
  const allowed = sourceKind === 'available' && hasServiceCycleSources(track, sources) && (!shared || shared.ready);
  const locked = Boolean(shared?.locked);
  const canAct = !shared || shared.capabilities?.[!cycle || step === 'realization' ? 'can_prepare' : step === 'delivery' ? 'can_deliver' : 'can_accept'] === true;
  const last = cycle?.events[cycle.events.length - 1];
  const attemptStart = cycle?.events.map(event => event.step).lastIndexOf('realization') ?? -1;
  const currentAttempt = cycle?.events.slice(Math.max(0, attemptStart)) || [];
  const reportError = error => setNotice({ error: true, key: Object.hasOwn(t.errors, error.message) ? error.message : 'invalid' });
  const input = (key, label, value, update, { required = true, type = 'text', readOnly = false } = {}) => <label className="min-w-0 space-y-1 text-sm text-slate-200" key={key}>
    <span>{label}{required ? ' *' : ''}</span><input className={fieldClass} type={type} value={value || ''} disabled={locked} readOnly={readOnly} required={required} max={type === 'date' ? serviceCycleToday() : undefined} maxLength={key === 'scope' || key === 'reservations' ? 800 : 300} onChange={event => update(key, event.target.value)} />
  </label>;
  const setSetupField = (key, value) => setSetup(previous => ({ ...previous, [key]: value }));
  const setEventField = (key, value) => setForm(previous => ({ ...previous, [key]: value }));
  const eventValues = () => {
    let values = { step, occurred_on: form.occurred_on, evidence_reference: form.evidence_reference };
    if (step === 'realization') values = { ...values, deliverable_reference: form.deliverable_reference, version: form.version };
    if (step === 'delivery') values = { ...values, recipient: form.recipient, channel: form.channel };
    if (step === 'acceptance') values = { ...values, recipient: last.recipient, outcome: form.outcome, reservations: form.reservations };
    return values;
  };
  let canPropose = false;
  if (allowed && canAct && !locked) {
    try {
      if (cycle) appendServiceCycleEvent(cycle, eventValues());
      else createServiceCycle({ ...setup, track, source_ids: sources, id: 'LOCAL-SVC-validation' });
      canPropose = true;
    } catch { /* Incomplete preparation keeps the primary action disabled. */ }
  }
  const propose = event => {
    event.preventDefault();
    setNotice(null);
    try {
      if (!allowed || !canAct || locked) throw new Error('source');
      if (!cycle) {
        const candidate = createServiceCycle({ ...setup, track, source_ids: sources, id: `LOCAL-SVC-${Date.now()}-${Math.random().toString(36).slice(2, 10)}` });
        setPending({ track, cycle: candidate, request: { preparation: { ...setup, track } } });
      } else {
        setPending({ track, cycle: appendServiceCycleEvent(cycle, eventValues()).cycle, request: { event: eventValues() } });
      }
    } catch (error) { reportError(error); }
  };
  const download = () => {
    try {
      const json = serviceCycleJson(cycle);
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      const anchor = document.createElement('a');
      anchor.href = url; anchor.download = `${cycle.id}-${track}.json`; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice({ key: 'exported' });
    } catch (error) { reportError(error); }
  };
  const importFile = async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const sequence = ++importSequence.current;
    const currentTrack = track;
    try {
      if (file.size > 100000 || !allowed) throw new Error('invalid');
      const content = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('invalid')); reader.readAsText(file); });
      if (sequence !== importSequence.current) return;
      const result = readServiceCycleFile(content, { track: currentTrack, sourceIds: sources });
      setPending({ track: currentTrack, cycle: result.cycle, imported: true, replace: Boolean(cycles[currentTrack]) });
    } catch (error) { if (sequence === importSequence.current) reportError(error); }
  };

  if (sourceKind !== 'available') return null;
  return <section id="production-service-cycle" aria-labelledby="service-cycle-title" className="mt-7 space-y-5 border-t border-slate-700 pt-5">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div><h3 id="service-cycle-title" className="text-lg font-semibold text-slate-100">{t.title}</h3><p className="mt-1 text-sm font-medium text-amber-300">{t.local}</p><p className="mt-1 text-xs text-slate-400">{t.referencesOnly}</p></div>
      <div className="flex gap-2">
        {!shared && <>
        <input ref={fileRef} type="file" accept=".json,application/json" hidden aria-label={t.import} onChange={importFile} disabled={!allowed} />
        <button type="button" className={iconClass} title={t.import} aria-label={t.import} disabled={!allowed} onClick={() => fileRef.current?.click()}><Upload size={18} aria-hidden="true" /></button>
        <button type="button" className={iconClass} title={t.export} aria-label={t.export} disabled={!cycle || !allowed} onClick={download}><Download size={18} aria-hidden="true" /></button>
        </>}
        {cycle && <button type="button" className={iconClass} title={t.newCycle} aria-label={t.newCycle} disabled={!allowed || locked || (shared && !shared.capabilities?.can_prepare)} onClick={() => shared ? shared.onNew() : setPending({ track, cycle: null, replace: true })}><Plus size={18} aria-hidden="true" /></button>}
      </div>
    </header>
    <label className="block max-w-md space-y-1 text-sm text-slate-200"><span>{t.track}</span>
      <select className={fieldClass} value={track} disabled={locked} onChange={event => { importSequence.current++; if (shared) shared.onTrack(event.target.value); else setTrack(event.target.value); setForm(emptyEvent()); setSetup(emptySetup()); setNotice(null); setPending(null); }}>
        {['documents', 'rh'].map(value => <option key={value} value={value}>{t[value]}</option>)}
      </select>
    </label>
    {!allowed ? <p role="status" className="text-sm text-amber-300">{t.sourceMissing}</p> : <>
      {cycle && <>
        <dl className="grid gap-3 border-y border-slate-700 py-4 text-sm sm:grid-cols-3">
          <div><dt className="text-slate-400">{t.scope}</dt><dd className="mt-1 break-words text-slate-200">{cycle.scope}</dd></div>
          <div><dt className="text-slate-400">{t.owner}</dt><dd className="mt-1 break-words text-slate-200">{cycle.owner}</dd></div>
          <div><dt className="text-slate-400">{t.state}</dt><dd className="mt-1 font-medium text-blue-300">{t[state]}</dd></div>
        </dl>
        <ol className="grid gap-4 sm:grid-cols-3">{['realization', 'delivery', 'acceptance'].map((kind, index) => {
          const item = [...currentAttempt].reverse().find(value => value.step === kind);
          return <li key={kind} className="min-w-0 border-l-2 border-blue-500 pl-3 text-sm"><h4 className="font-semibold text-slate-100">{index + 1}. {t[kind]}</h4><p className="mt-1 text-slate-300">{item ? `${item.outcome ? `${t[item.outcome]} · ` : ''}${formatRegistryDate(item.occurred_on, language)}` : t.pending}</p></li>;
        })}</ol>
      </>}
      {state !== 'accepted' && !canAct && <p role="status" className="text-sm text-slate-300">{t.readOnly}</p>}
      {state !== 'accepted' && canAct && <form onSubmit={propose} className="space-y-4">
        <h4 className="font-semibold text-slate-100">{cycle ? t[step] : t.create}</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {!cycle ? <>
            {input('scope', t.scope, setup.scope, setSetupField)}
            {input('owner', t.owner, setup.owner, setSetupField)}
            {input('authorization_reference', t.authorization, setup.authorization_reference, setSetupField)}
            {input('project_reference', `${t.project} (${t.optional})`, setup.project_reference, setSetupField, { required: false })}
          </> : <>
            {input('occurred_on', t.date, form.occurred_on, setEventField, { type: 'date' })}
            {input('evidence_reference', t.evidence, form.evidence_reference, setEventField)}
            {step === 'realization' && <>{input('deliverable_reference', t.deliverable, form.deliverable_reference, setEventField)}{input('version', t.version, form.version, setEventField)}</>}
            {step === 'delivery' && <>
              {input('recipient', t.recipient, form.recipient, setEventField)}
              <label className="space-y-1 text-sm text-slate-200"><span>{t.channel}</span><select className={fieldClass} value={form.channel} disabled={locked} onChange={event => setEventField('channel', event.target.value)}>{['email', 'secure_link', 'hand_delivery'].map(channel => <option key={channel} value={channel}>{t[channel]}</option>)}</select></label>
              <p className="break-words text-sm text-slate-300">{t.deliverable} : {last.deliverable_reference} · {t.version} {last.version}</p>
            </>}
            {step === 'acceptance' && <>
              {input('recipient', t.recipient, last.recipient, setEventField, { readOnly: true })}
              <label className="space-y-1 text-sm text-slate-200"><span>{t.outcome}</span><select className={fieldClass} value={form.outcome} disabled={locked} onChange={event => setForm(previous => ({ ...previous, outcome: event.target.value, reservations: '' }))}>{['accepted', 'reserved', 'rejected'].map(outcome => <option key={outcome} value={outcome}>{t[outcome]}</option>)}</select></label>
              {form.outcome !== 'accepted' && input('reservations', t.reservations, form.reservations, setEventField)}
            </>}
          </>}
        </div>
        <StandardCreateButton type="submit" disabled={!canPropose}>{cycle ? t.add : t.create}</StandardCreateButton>
      </form>}
      {notice && <p role={notice.error ? 'alert' : 'status'} className={notice.error ? 'text-sm text-amber-300' : 'text-sm text-blue-300'}>{notice.error ? t.errors[notice.key] : t[notice.key]}</p>}
      <details className="border-t border-slate-700 pt-3"><summary className="min-h-11 cursor-pointer font-medium text-slate-200">{t.history}</summary>
        {!cycle?.events.length ? <p className="py-3 text-sm text-slate-400">{t.empty}</p> : <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm">
          <thead><tr>{[t.step, t.date, t.evidence, t.version].map(label => <th key={label} className="border-b border-slate-700 px-3 py-3">{label}</th>)}</tr></thead>
          <tbody>{cycle.events.map((item, index) => <tr key={index} className="border-b border-slate-700 text-slate-300"><td className="px-3 py-3">{t[item.step]}{item.outcome && ` · ${t[item.outcome]}`}</td><td className="whitespace-nowrap px-3 py-3">{formatRegistryDate(item.occurred_on, language)}</td><td className="max-w-sm break-words px-3 py-3">{item.evidence_reference}{item.reservations && <p className="mt-1 text-amber-300">{item.reservations}</p>}</td><td className="px-3 py-3">{item.version || '—'}</td></tr>)}</tbody>
        </table></div>}
      </details>
    </>}
    {pending && allowed && <ActionConfirmationDialog id="production-cycle-confirmation" title={t.confirmTitle} body={pending.replace ? t.replaceBody : t.confirmBody} cancelLabel={t.cancel} confirmLabel={t.confirm} action="create" onCancel={() => setPending(null)} onConfirm={() => {
      if (shared) { if (!locked && canAct) shared.onSave(pending.request, pending.cycle); setPending(null); return; }
      setCycles(previous => ({ ...previous, [pending.track]: pending.cycle }));
      setNotice({ key: pending.imported ? 'imported' : 'added' }); setPending(null); setForm(emptyEvent()); setSetup(emptySetup());
    }} />}
  </section>;
}
