import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useAuth } from './AuthContext';
import { productionServiceTransport } from './api';
import ProductionServiceCycle from './ProductionServiceCyclePanel';
import { readServiceCapabilities, readSharedCycle, readSharedCycleList, sameServiceValue, serviceRequestId } from './productionServiceSharedModel';

const Session = createContext(null);
const COPY = {
  FR: { mode: 'Stockage du cycle', shared: 'Partagé M3S', local: 'Préparation locale', loading: 'Chargement du suivi partagé…',
    closed: 'Le suivi partagé n’est pas activé. Aucune préparation locale ne lui est substituée.', forbidden: 'Accès partagé non autorisé.',
    unavailable: 'Suivi partagé indisponible. Aucun enregistrement local de remplacement.', limit: 'Plus de 100 cycles : sélection indisponible, affinez le périmètre avec le responsable.',
    list: 'Cycle partagé', newCycle: 'Nouvelle préparation', empty: 'Aucun cycle partagé pour ce parcours.', refresh: 'Actualiser le suivi partagé',
    saved: 'Enregistrement partagé confirmé.', saving: 'Enregistrement en cours…', uncertain: 'Résultat non confirmé. Ne créez pas une autre demande : reprenez celle-ci.',
    retry: 'Reprendre la même demande', conflict: 'Le cycle a évolué. Actualisez et vérifiez l’historique avant de proposer une nouvelle étape.',
    failed: 'Demande refusée. Vérifiez les champs et actualisez les droits.', export: 'Exporter une copie JSON en lecture seule',
    revision: 'Révision', audit: 'Historique daté par le serveur · réception rapportée, non signée', selected: 'Référence partagée', choose: 'Choisir un cycle' },
  DE: { mode: 'Zyklusspeicherung', shared: 'Gemeinsam in M3S', local: 'Lokale Vorbereitung', loading: 'Gemeinsamer Verlauf wird geladen…',
    closed: 'Der gemeinsame Verlauf ist nicht aktiviert. Keine lokale Vorbereitung wird eingesetzt.', forbidden: 'Gemeinsamer Zugriff nicht erlaubt.',
    unavailable: 'Gemeinsamer Verlauf nicht verfügbar. Kein lokaler Ersatzeintrag.', limit: 'Mehr als 100 Zyklen: Auswahl nicht verfügbar; Umfang mit der verantwortlichen Person klären.',
    list: 'Gemeinsamer Zyklus', newCycle: 'Neue Vorbereitung', empty: 'Kein gemeinsamer Zyklus für diesen Weg.', refresh: 'Gemeinsamen Verlauf aktualisieren',
    saved: 'Gemeinsame Speicherung bestätigt.', saving: 'Speicherung läuft…', uncertain: 'Ergebnis nicht bestätigt. Keine neue Anfrage erstellen; dieselbe fortsetzen.',
    retry: 'Dieselbe Anfrage fortsetzen', conflict: 'Der Zyklus wurde geändert. Aktualisieren und Verlauf prüfen, bevor ein neuer Schritt vorgeschlagen wird.',
    failed: 'Anfrage abgelehnt. Felder prüfen und Rechte aktualisieren.', export: 'Schreibgeschützte JSON-Kopie exportieren',
    revision: 'Revision', audit: 'Serverdatierter Verlauf · Abnahme gemeldet, nicht unterschrieben', selected: 'Gemeinsame Referenz', choose: 'Zyklus auswählen' },
  EN: { mode: 'Cycle storage', shared: 'Shared M3S', local: 'Local preparation', loading: 'Loading shared follow-up…',
    closed: 'Shared follow-up is not enabled. No local preparation is substituted.', forbidden: 'Shared access is not authorised.',
    unavailable: 'Shared follow-up unavailable. No replacement local record.', limit: 'More than 100 cycles: selection unavailable; narrow the scope with the responsible person.',
    list: 'Shared cycle', newCycle: 'New preparation', empty: 'No shared cycle for this path.', refresh: 'Refresh shared follow-up',
    saved: 'Shared record confirmed.', saving: 'Saving…', uncertain: 'Result not confirmed. Do not create another request; resume this one.',
    retry: 'Resume the same request', conflict: 'The cycle has changed. Refresh and check its history before proposing another stage.',
    failed: 'Request refused. Check the fields and refresh permissions.', export: 'Export a read-only JSON copy',
    revision: 'Revision', audit: 'Server-dated history · reported acceptance, not signed', selected: 'Shared reference', choose: 'Choose a cycle' }
};
const fieldClass = 'm3s-field min-h-11 w-full min-w-0 px-3 py-2';
const buttonClass = 'm3s-secondary-button inline-flex min-h-11 min-w-11 items-center justify-center';
const issueFor = error => [401, 403].includes(error?.status) ? 'forbidden' : error?.code === 'SERVICE_NOT_ENABLED' ? 'closed' : error?.code === 'SERVICE_LIMIT' ? 'limit' : 'unavailable';

export function ProductionServiceSession({ children }) {
  const [attempt, setAttempt] = useState(null);
  const [busy, setBusy] = useState(false);
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState(null);
  const pending = useRef(null);
  const lock = useRef(false);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => {
    if (!attempt) return undefined;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [attempt]);
  const run = async request => {
    if (lock.current || !request) return;
    lock.current = true; setBusy(true); setIssue('');
    try {
      const payload = await productionServiceTransport(request.path, JSON.parse(request.body));
      const checked = readSharedCycle(payload, request.track);
      const fields = ['track', 'scope', 'owner', 'project_reference', 'authorization_reference'];
      if (typeof payload.replayed !== 'boolean' || (request.id && checked.record.id !== request.id) ||
          fields.some(key => checked.cycle[key] !== request.expected[key]) ||
          checked.cycle.events.length < request.expected.events.length ||
          !sameServiceValue(checked.cycle.events.slice(0, request.expected.events.length), request.expected.events)) throw new Error('SERVICE_RESPONSE_INVALID');
      if (!alive.current) return;
      pending.current = null; setAttempt(null); setResult(checked); setIssue('saved');
    } catch (error) {
      if (!alive.current) return;
      if ([400, 401, 403, 404, 409, 413, 415, 422].includes(error?.status)) {
        pending.current = null; setAttempt(null);
        setIssue([401, 403].includes(error.status) ? 'forbidden' : error.status === 409 ? 'conflict' : 'failed');
      } else setIssue('uncertain');
    } finally { lock.current = false; if (alive.current) setBusy(false); }
  };
  const save = (track, record, values, expected) => {
    if (pending.current || lock.current) return;
    let requestId;
    try { requestId = serviceRequestId(); } catch { setIssue('failed'); return; }
    const request = { track, id: record?.id, expected,
      path: record ? `/${record.id}/events` : '',
      body: JSON.stringify({ request_id: requestId, ...(record ? { expected_revision: record.revision, event: values.event } : { preparation: values.preparation }) }) };
    pending.current = request; setAttempt(request);
    return run(request);
  };
  return <Session.Provider value={{ attempt, busy, issue, result, save, retry: () => run(pending.current) }}>{children}</Session.Provider>;
}
export function ProductionServiceSessionProvider({ children }) {
  const auth = useAuth();
  const key = auth?.isAuthenticated ? JSON.stringify([auth.user?.id, auth.user?.tenantId]) : 'signed-out';
  return <ProductionServiceSession key={key}>{children}</ProductionServiceSession>;
}

function SharedCycle({ language, sourceKind, sourceRows }) {
  const t = COPY[language] || COPY.FR;
  const session = useContext(Session);
  const [track, setTrack] = useState(session.attempt?.track || 'documents');
  const [selected, setSelected] = useState(session.attempt?.id || '');
  const [reload, setReload] = useState(0);
  const [listing, setListing] = useState({ kind: 'loading', items: [], capabilities: null });
  const [detail, setDetail] = useState({ kind: 'available', value: null });
  const result = session.result;
  const locked = session.busy || Boolean(session.attempt);
  useEffect(() => {
    if (!result) return;
    setTrack(result.record.track); setSelected(result.record.id); setReload(value => value + 1);
  }, [result]);
  useEffect(() => {
    if (sourceKind !== 'available') return undefined;
    const controller = new AbortController();
    setListing({ kind: 'loading', items: [], capabilities: null });
    (async () => {
      const access = readServiceCapabilities(await productionServiceTransport('/access', undefined, { signal: controller.signal }));
      const capabilities = access.find(row => row.track === track);
      if (!capabilities) throw Object.assign(new Error('SERVICE_FORBIDDEN'), { status: 403 });
      const items = readSharedCycleList(await productionServiceTransport(`?track=${track}`, undefined, { signal: controller.signal }), track);
      if (!controller.signal.aborted) setListing({ kind: 'available', items, capabilities });
    })().catch(error => { if (!controller.signal.aborted) setListing({ kind: issueFor(error), items: [], capabilities: null }); });
    return () => controller.abort();
  }, [track, reload, sourceKind]);
  useEffect(() => {
    if (!selected) { setDetail({ kind: 'available', value: null }); return undefined; }
    const controller = new AbortController();
    setDetail({ kind: 'loading', value: null });
    productionServiceTransport(`/${selected}`, undefined, { signal: controller.signal }).then(payload => {
      const value = readSharedCycle(payload, track);
      if (value.record.id !== selected) throw new Error('SERVICE_RESPONSE_INVALID');
      if (!controller.signal.aborted) setDetail({ kind: 'available', value });
    }).catch(error => { if (!controller.signal.aborted) setDetail({ kind: issueFor(error), value: null }); });
    return () => controller.abort();
  }, [selected, track, reload]);
  if (sourceKind !== 'available') return null;
  const ready = listing.kind === 'available' && listing.capabilities?.track === track && detail.kind === 'available' &&
    (selected ? detail.value?.record.id === selected && detail.value.record.track === track : detail.value === null);
  const value = ready ? detail.value : null;
  const changeTrack = next => { if (!locked) { setSelected(''); setTrack(next); } };
  const download = () => {
    if (!value || !ready) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify({ schema: 'm3s.production.service-cycle.shared-snapshot.v1', mode: 'read_only_copy', item: value.record }, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `M3S-service-${value.record.id}-r${value.record.revision}.json`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="mt-5 space-y-3">
    <div className="flex flex-wrap items-end gap-3">
      <label className="min-w-0 flex-1 space-y-1 text-sm text-slate-200"><span>{t.list}</span>
        <select className={fieldClass} aria-label={t.list} value={selected} disabled={locked || listing.kind !== 'available'} onChange={event => setSelected(event.target.value)}>
          <option value="">{listing.capabilities?.can_prepare ? t.newCycle : t.choose}</option>
          {listing.items.map(row => <option key={row.id} value={row.id}>{row.scope} · {t.revision} {row.revision}</option>)}
        </select>
      </label>
      <button className={buttonClass} type="button" title={t.refresh} aria-label={t.refresh} disabled={locked || listing.kind === 'loading'} onClick={() => setReload(value => value + 1)}><RefreshCw size={18} aria-hidden="true" /></button>
      <button className={buttonClass} type="button" title={t.export} aria-label={t.export} disabled={!value || locked} onClick={download}><Download size={18} aria-hidden="true" /></button>
    </div>
    {listing.kind !== 'available' && <p role={listing.kind === 'loading' ? 'status' : 'alert'} className="text-sm text-amber-300">{t[listing.kind]}</p>}
    {listing.kind === 'available' && listing.items.length === 0 && <p className="text-sm text-slate-300">{t.empty}</p>}
    {detail.kind !== 'available' && <p role={detail.kind === 'loading' ? 'status' : 'alert'} className="text-sm text-amber-300">{t[detail.kind]}</p>}
    {session.issue && <p role={session.issue === 'saved' ? 'status' : 'alert'} className={session.issue === 'saved' ? 'text-sm text-blue-300' : 'text-sm text-amber-300'}>{t[session.issue]}</p>}
    {session.busy && <p role="status" className="text-sm text-slate-300">{t.saving}</p>}
    {session.attempt && !session.busy && <button className="m3s-secondary-button min-h-11 px-3" type="button" onClick={session.retry}>{t.retry}</button>}
    {value && <p className="break-words text-xs text-slate-400">{t.selected} : {value.record.id} · {t.revision} {value.record.revision}<br />{t.audit}</p>}
    {ready && <ProductionServiceCycle key={`${track}:${selected}:${value?.record.revision ?? 'new'}`} language={language} sourceKind={sourceKind} sourceRows={sourceRows}
      shared={{ ready, track, cycle: value?.cycle || null, capabilities: listing.capabilities, locked, onTrack: changeTrack, onNew: () => setSelected(''),
        onSave: (values, expected) => session.save(track, value?.record, values, expected) }} />}
    {!ready && <label className="block max-w-md space-y-1 text-sm text-slate-200"><span>{language === 'FR' ? 'Parcours' : language === 'DE' ? 'Leistungsweg' : 'Path'}</span><select className={fieldClass} disabled={locked} value={track} onChange={event => changeTrack(event.target.value)}><option value="documents">{language === 'FR' ? 'Organisation documentaire' : language === 'DE' ? 'Dokumentenorganisation' : 'Document organisation'}</option><option value="rh">{language === 'FR' ? 'RH de proximité' : language === 'DE' ? 'Wohnortnahe Personalarbeit' : 'Proximity HR'}</option></select></label>}
  </div>;
}
function Workspace(props) {
  const t = COPY[props.language] || COPY.FR;
  const session = useContext(Session);
  const [mode, setMode] = useState('shared');
  if (props.sourceKind !== 'available') return null;
  return <div className="mt-5 border-t border-slate-700 pt-4">
    <label className="block max-w-md space-y-1 text-sm text-slate-200"><span>{t.mode}</span><select className={fieldClass} value={mode} disabled={session.busy || Boolean(session.attempt)} onChange={event => setMode(event.target.value)}><option value="shared">{t.shared}</option><option value="local">{t.local}</option></select></label>
    {mode === 'shared' ? <SharedCycle {...props} /> : <ProductionServiceCycle {...props} />}
  </div>;
}
export default function ProductionServiceWorkspace(props) {
  const session = useContext(Session);
  return session ? <Workspace {...props} /> : <ProductionServiceSession><Workspace {...props} /></ProductionServiceSession>;
}
