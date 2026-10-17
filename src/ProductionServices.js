import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, RefreshCw } from 'lucide-react';
import api from './api';
import TableControls from './TableControls';
import { formatRegistryDate } from './registryDate';
import { PRODUCTION_SERVICE_DESTINATIONS } from './productionServiceNavigation';
import ProductionServiceWorkspace from './ProductionSharedServiceCyclePanel';
import InstitutionalGedBundle from './InstitutionalGedBundle';

const TRACKS = [
  { id: 'documents', sourceIds: ['GD-005', 'GD-006'], href: PRODUCTION_SERVICE_DESTINATIONS.documents, label: 'openDocuments' },
  { id: 'rh', sourceIds: ['GD-008', 'GD-009'], href: PRODUCTION_SERVICE_DESTINATIONS.rh, label: 'openRh' }
];
const SOURCE_TYPES = { 'GD-005': 'document_governance', 'GD-006': 'document_governance', 'GD-008': 'rh_proximity_framework', 'GD-009': 'rh_tools' };
const COPY = {
  FR: {
    title: 'Suivi des prestations', scope: 'Préparation interne · sources en lecture seule',
    boundary: 'Deux parcours candidats, pas des commandes clients. Le statut des dossiers sources ne vaut ni livraison ni réception de prestation.',
    loading: 'Chargement des dossiers sources…', forbidden: 'Accès aux métadonnées non autorisé.',
    unavailable: 'Source de suivi indisponible. Aucun résultat local ne lui est substitué.',
    connected: 'Source connectée : registre des grands dossiers', refresh: 'Actualiser',
    track: 'Parcours', sources: 'Dossiers rattachés', next: 'Suivi documenté', cost: 'Coût de réalisation',
    qualify: 'À qualifier', notLinked: 'Aucun dossier source rattaché', missing: 'Source attendue non rattachée',
    original: 'Point source conservé', state: 'État documenté', action: 'Prochaine action',
    checked: 'Vérifié le', reference: 'Référence source', status: 'Statut du dossier', owner: 'Responsabilité',
    ownerUnknown: 'À confirmer', active: 'Actif', paused: 'En pause', archived: 'Archivé', unknownStatus: 'Statut à qualifier',
    documents: 'Organisation documentaire', rh: 'RH de proximité',
    openDocuments: 'Ouvrir le suivi documentaire', openRh: 'Ouvrir les ressources RH',
    shared: 'Planification et projets', readScope: 'Préparation', delivery: 'Livraison et réception : à documenter',
    costNote: 'Le classeur de mesure interne reste séparé. Aucun salaire, coût employeur ou prix n’est déduit de ces dossiers.'
  },
  EN: {
    title: 'Service delivery follow-up', scope: 'Internal preparation · read-only sources',
    boundary: 'Two candidate paths, not customer orders. Source dossier status is not evidence of service delivery or acceptance.',
    loading: 'Loading source dossiers…', forbidden: 'Source metadata access is not authorised.',
    unavailable: 'Follow-up source unavailable. No local result is substituted.',
    connected: 'Connected source: major dossiers register', refresh: 'Refresh',
    track: 'Path', sources: 'Linked dossiers', next: 'Documented follow-up', cost: 'Delivery cost',
    qualify: 'To qualify', notLinked: 'No source dossier linked', missing: 'Expected source not linked',
    original: 'Preserved source entry', state: 'Documented state', action: 'Next action',
    checked: 'Verified on', reference: 'Source reference', status: 'Dossier status', owner: 'Responsibility',
    ownerUnknown: 'To confirm', active: 'Active', paused: 'Paused', archived: 'Archived', unknownStatus: 'Status to qualify',
    documents: 'Document organisation', rh: 'Proximity HR',
    openDocuments: 'Open document follow-up', openRh: 'Open HR resources',
    shared: 'Planning and projects', readScope: 'Preparation', delivery: 'Delivery and acceptance: to document',
    costNote: 'The internal measurement workbook remains separate. No salary, employer cost or price is derived from these dossiers.'
  },
  DE: {
    title: 'Leistungsverfolgung', scope: 'Interne Vorbereitung · schreibgeschützte Quellen',
    boundary: 'Zwei mögliche Leistungswege, keine Kundenaufträge. Der Quellenstatus belegt weder Lieferung noch Abnahme einer Leistung.',
    loading: 'Quellenakten werden geladen…', forbidden: 'Zugriff auf Quellenmetadaten nicht erlaubt.',
    unavailable: 'Verfolgungsquelle nicht verfügbar. Kein lokales Ergebnis wird eingesetzt.',
    connected: 'Verbundene Quelle: Register der Hauptdossiers', refresh: 'Aktualisieren',
    track: 'Leistungsweg', sources: 'Verknüpfte Dossiers', next: 'Dokumentierter Stand', cost: 'Durchführungskosten',
    qualify: 'Zu qualifizieren', notLinked: 'Kein Quelldossier verknüpft', missing: 'Erwartete Quelle nicht verknüpft',
    original: 'Erhaltener Quelleintrag', state: 'Dokumentierter Stand', action: 'Nächste Aktion',
    checked: 'Geprüft am', reference: 'Quellenreferenz', status: 'Dossierstatus', owner: 'Verantwortung',
    ownerUnknown: 'Zu bestätigen', active: 'Aktiv', paused: 'Pausiert', archived: 'Archiviert', unknownStatus: 'Status zu klären',
    documents: 'Dokumentenorganisation', rh: 'Wohnortnahe Personalarbeit',
    openDocuments: 'Dokumentenverfolgung öffnen', openRh: 'HR-Ressourcen öffnen',
    shared: 'Planung und Projekte', readScope: 'Vorbereitung', delivery: 'Lieferung und Abnahme: zu dokumentieren',
    costNote: 'Die interne Messarbeitsmappe bleibt getrennt. Aus diesen Dossiers werden weder Lohn, Arbeitgeberkosten noch Preis abgeleitet.'
  }
};

export function readServiceSources(payload) {
  if (payload?.success !== true || !Array.isArray(payload.data) || payload.data.length > 4 ||
      payload.source?.registry !== 'management_dossiers' || payload.source?.system !== 'bigquery' ||
      payload.source?.scope !== 'internal_service_preparation' || payload.source?.read_only !== true) throw new Error('SERVICE_FOLLOWUP_SOURCE_INVALID');
  const seen = new Set();
  return payload.data.map(row => {
    if (!row || !Object.hasOwn(SOURCE_TYPES, row.dossier_id) || SOURCE_TYPES[row.dossier_id] !== row.dossier_type || seen.has(row.dossier_id) ||
        formatRegistryDate(row.verified_on) === '\u2014' ||
        ['display_title', 'status', 'responsible_status', 'display_state', 'display_next_action', 'source_ref']
          .some(key => typeof row[key] !== 'string' || !row[key].trim() || row[key].length > 2000)) throw new Error('SERVICE_FOLLOWUP_SOURCE_INVALID');
    seen.add(row.dossier_id);
    return row;
  });
}

export default function ProductionServices({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const [reload, setReload] = useState(0);
  const [source, setSource] = useState({ kind: 'loading', rows: [] });
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    setSource({ kind: 'loading', rows: [] });
    api.getProductionServiceFollowup({ signal: controller.signal }).then(payload => {
      if (!controller.signal.aborted) setSource({ kind: 'available', rows: readServiceSources(payload) });
    }).catch(error => {
      if (!controller.signal.aborted) setSource({ kind: error?.status === 401 || error?.status === 403 ? 'forbidden' : 'unavailable', rows: [] });
    });
    return () => controller.abort();
  }, [reload]);
  const rows = TRACKS.map(track => ({ ...track, title: t[track.id], sources: source.rows.filter(row => track.sourceIds.includes(row.dossier_id)) }));
  const statusLabel = status => ({ active: t.active, paused: t.paused, archived: t.archived }[status] || t.unknownStatus);
  const toggle = id => setExpanded(current => current === id ? null : id);
  return (
    <section id="production-service-followup" className="scroll-mt-24 space-y-5" aria-labelledby="production-services-title" data-testid="production-services">
      <header className="flex items-start justify-between gap-4 border-b border-slate-700 pb-4">
        <div className="min-w-0">
          <h2 id="production-services-title" className="text-xl font-semibold text-white">{t.title}</h2>
          <p className="mt-2 text-sm font-medium text-blue-300">{t.scope}</p>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">{t.boundary}</p>
        </div>
        <button type="button" className="m3s-field shrink-0 p-3 text-slate-200 disabled:opacity-40" disabled={source.kind === 'loading'}
          title={t.refresh} aria-label={t.refresh} onClick={() => setReload(value => value + 1)}><RefreshCw size={18} aria-hidden="true" /></button>
      </header>
      {source.kind !== 'available' ? <p role={source.kind === 'loading' ? 'status' : 'alert'} className="text-sm text-slate-300">{t[source.kind]}</p> : <>
        <p className="text-sm text-slate-300">{t.connected}</p>
        <TableControls rows={rows} getSearchText={row => `${row.title} ${row.sources.map(item => `${item.dossier_id} ${item.display_title} ${item.display_next_action}`).join(' ')}`}
          renderTable={visible => <table className="w-full min-w-[780px] text-sm">
            <thead className="bg-slate-700 text-left text-white"><tr>
              {[t.track, t.sources, t.next, t.cost].map(label => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}
            </tr></thead>
            <tbody>{visible.map(row => <React.Fragment key={row.id}>
              <tr className="border-b border-slate-700 align-top">
                <th scope="row" className="px-4 py-4 text-left font-semibold text-slate-100">{row.title}</th>
                <td className="px-4 py-4 text-slate-300">
                  {row.sources.length ? <ul className="space-y-2">{row.sources.map(item => <li key={item.dossier_id}>
                    <span>{item.dossier_id}</span><time className="ml-3 whitespace-nowrap" dateTime={item.verified_on}>{formatRegistryDate(item.verified_on, language)}</time>
                  </li>)}</ul> : t.notLinked}
                  {row.sources.length > 0 && row.sources.length < row.sourceIds.length && <p className="mt-2 text-xs text-amber-300">{t.missing}</p>}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  <button type="button" disabled={!row.sources.length} aria-expanded={expanded === row.id} aria-controls={`service-detail-${row.id}`}
                    aria-label={`${t.original} · ${row.title}`}
                    onClick={() => toggle(row.id)} className="flex min-h-11 items-center gap-2 text-left text-blue-300 disabled:text-slate-400">
                    <ChevronDown size={16} className={expanded === row.id ? 'rotate-180' : ''} aria-hidden="true" />{t.original}
                  </button>
                  <p className="mt-1 text-xs text-slate-400">{t.delivery}</p>
                </td>
                <td className="px-4 py-4 text-slate-300">{t.qualify}</td>
              </tr>
              {expanded === row.id && row.sources.length > 0 && <tr id={`service-detail-${row.id}`}><td colSpan="4" className="px-4 py-5">
                {row.sources.map(item => <div key={item.dossier_id} className="mb-5 border-l-2 border-blue-500 pl-4 last:mb-0">
                  <h3 className="font-semibold text-slate-100">{item.dossier_id} · {item.display_title}</h3>
                  <dl className="mt-3 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <dt className="text-slate-400">{t.status}</dt><dd className="text-slate-200">{statusLabel(item.status)}{!['active', 'paused', 'archived'].includes(item.status) && ` (${item.status})`}</dd>
                    <dt className="text-slate-400">{t.owner}</dt><dd className="text-slate-200">{item.responsible_status === 'to_confirm' ? t.ownerUnknown : item.responsible_status}</dd>
                    <dt className="text-slate-400">{t.state}</dt><dd className="break-words text-slate-200">{item.display_state}</dd>
                    <dt className="text-slate-400">{t.action}</dt><dd className="break-words text-slate-200">{item.display_next_action}</dd>
                    <dt className="text-slate-400">{t.reference}</dt><dd className="break-words text-slate-200">{item.source_ref}</dd>
                    <dt className="text-slate-400">{t.checked}</dt><dd className="whitespace-nowrap text-slate-200">{formatRegistryDate(item.verified_on, language)}</dd>
                  </dl>
                </div>)}
              </td></tr>}
            </React.Fragment>)}</tbody>
          </table>} />
        {source.rows.some(item => item.dossier_id === 'GD-005') && source.rows.some(item => item.dossier_id === 'GD-006') && <InstitutionalGedBundle language={language} />}
        {source.rows.some(item => item.dossier_id === 'GD-008') && source.rows.some(item => item.dossier_id === 'GD-009') && <InstitutionalGedBundle language={language} kind="rh" />}
        <nav className="flex flex-wrap gap-4 text-sm text-blue-300" aria-label={t.next}>
          {TRACKS.map(track => <a className="inline-flex min-h-11 items-center gap-2 underline" key={track.id} href={track.href}>{t[track.label]}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
          <a className="inline-flex min-h-11 items-center gap-2 underline" href={PRODUCTION_SERVICE_DESTINATIONS.planning}>{t.shared}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
        <p className="text-xs leading-5 text-slate-400">{t.costNote}</p>
      </>}
      <ProductionServiceWorkspace language={language} sourceKind={source.kind} sourceRows={source.rows} />
    </section>
  );
}
