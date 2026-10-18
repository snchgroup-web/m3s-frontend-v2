import React, { useEffect, useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from './AuthContext';
import { productionServiceTransport } from './api';
import { readServiceCapabilities, readSharedCycle, readSharedCycleList } from './productionServiceSharedModel';
import { validateServiceCycle } from './productionServiceCycleModel';
import { formatRegistryDate } from './registryDate';

const TRACKS = ['documents', 'rh'];
const COPY = {
  FR: {
    title: 'Production suivie', scope: 'Cycles partag\u00e9s accessibles \u00e0 ton compte \u00b7 lecture seule',
    boundary: 'Le nombre porte sur les cycles accessibles de chaque parcours. L\u2019\u00e9tat et la date d\u00e9crivent son dernier cycle cr\u00e9\u00e9, pas l\u2019ensemble des prestations.',
    documents: 'Organisation documentaire', rh: 'RH de proximit\u00e9', count: 'Cycles accessibles', latest: 'Dernier cycle cr\u00e9\u00e9',
    owner: 'Responsable de pr\u00e9paration', state: '\u00c9tat document\u00e9', date: 'Date du dernier fait', revision: 'R\u00e9vision',
    loading: 'Chargement\u2026', forbidden: 'Acc\u00e8s non autoris\u00e9', unavailable: 'Source indisponible', closed: 'Suivi partag\u00e9 non activ\u00e9',
    limit: 'P\u00e9rim\u00e8tre trop large : plus de 100 cycles', empty: 'Aucun cycle partag\u00e9 pour ce parcours.',
    refresh: 'Actualiser la synth\u00e8se Production', open: 'Ouvrir le suivi des prestations',
    receipt: 'Une remise ne vaut pas r\u00e9ception. Les r\u00e9ceptions consign\u00e9es sont rapport\u00e9es, non sign\u00e9es ; les r\u00e9f\u00e9rences ne sont pas v\u00e9rifi\u00e9es par cette synth\u00e8se.',
    stages: { planned: 'Pr\u00e9paration enregistr\u00e9e', realized: 'R\u00e9alisation document\u00e9e', delivered: 'Remise enregistr\u00e9e \u00b7 retour attendu', accepted: 'R\u00e9ception rapport\u00e9e : accept\u00e9e', reserved: 'R\u00e9ception rapport\u00e9e : r\u00e9serves', rejected: 'R\u00e9ception rapport\u00e9e : refus' }
  },
  DE: {
    title: 'Verfolgte Produktion', scope: 'F\u00fcr Ihr Konto zug\u00e4ngliche gemeinsame Zyklen \u00b7 schreibgesch\u00fctzt',
    boundary: 'Die Anzahl betrifft die zug\u00e4nglichen Zyklen je Leistungsweg. Status und Datum beschreiben den zuletzt angelegten Zyklus, nicht alle Leistungen.',
    documents: 'Dokumentenorganisation', rh: 'Wohnortnahe Personalarbeit', count: 'Zug\u00e4ngliche Zyklen', latest: 'Zuletzt angelegter Zyklus',
    owner: 'Vorbereitungsverantwortung', state: 'Dokumentierter Stand', date: 'Datum des letzten Vorgangs', revision: 'Revision',
    loading: 'Wird geladen\u2026', forbidden: 'Zugriff nicht erlaubt', unavailable: 'Quelle nicht verf\u00fcgbar', closed: 'Gemeinsamer Verlauf nicht aktiviert',
    limit: 'Umfang zu gross: mehr als 100 Zyklen', empty: 'Kein gemeinsamer Zyklus f\u00fcr diesen Leistungsweg.',
    refresh: 'Produktions\u00fcbersicht aktualisieren', open: 'Leistungsverfolgung \u00f6ffnen',
    receipt: 'Eine Lieferung ist keine Abnahme. Erfasste Abnahmen sind gemeldet, nicht unterschrieben; Referenzen werden in dieser \u00dcbersicht nicht verifiziert.',
    stages: { planned: 'Vorbereitung erfasst', realized: 'Realisierung dokumentiert', delivered: '\u00dcbergabe erfasst \u00b7 R\u00fcckmeldung erwartet', accepted: 'Gemeldete Abnahme: angenommen', reserved: 'Gemeldete Abnahme: Vorbehalte', rejected: 'Gemeldete Abnahme: abgelehnt' }
  },
  EN: {
    title: 'Production follow-up', scope: 'Shared cycles accessible to your account \u00b7 read only',
    boundary: 'The count covers accessible cycles for each path. State and date describe its most recently created cycle, not all services.',
    documents: 'Document organisation', rh: 'Proximity HR', count: 'Accessible cycles', latest: 'Most recently created cycle',
    owner: 'Preparation owner', state: 'Documented state', date: 'Last event date', revision: 'Revision',
    loading: 'Loading\u2026', forbidden: 'Access not authorised', unavailable: 'Source unavailable', closed: 'Shared follow-up not enabled',
    limit: 'Scope too broad: more than 100 cycles', empty: 'No shared cycle for this path.',
    refresh: 'Refresh Production overview', open: 'Open service delivery follow-up',
    receipt: 'Delivery is not acceptance. Recorded acceptances are reported, not signed; this overview does not verify references.',
    stages: { planned: 'Preparation recorded', realized: 'Realisation documented', delivered: 'Delivery recorded \u00b7 awaiting feedback', accepted: 'Reported acceptance: accepted', reserved: 'Reported acceptance: reservations', rejected: 'Reported acceptance: rejected' }
  }
};
const issue = error => [401, 403].includes(error?.status) ? 'forbidden'
  : error?.code === 'SERVICE_NOT_ENABLED' ? 'closed' : error?.code === 'SERVICE_LIMIT' ? 'limit' : 'unavailable';

export default function ProductionOverview({ language = 'FR', onOpenServices }) {
  const t = COPY[language] || COPY.FR;
  const auth = useAuth();
  const principal = JSON.stringify([auth.isAuthenticated, auth.user?.id, auth.user?.tenantId]);
  const [reload, setReload] = useState(0);
  const [source, setSource] = useState(null);
  const rows = source?.principal === principal ? source.rows : TRACKS.map(track => ({ track, kind: 'loading' }));
  const loading = rows.some(row => row.kind === 'loading');
  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    setSource(null);
    (async () => {
      const access = readServiceCapabilities(await productionServiceTransport('/access', undefined, options));
      const results = await Promise.all(TRACKS.map(async track => {
        if (!access.some(item => item.track === track && item.can_read)) return { track, kind: 'forbidden' };
        try {
          const items = readSharedCycleList(await productionServiceTransport(`?track=${track}`, undefined, options), track);
          const latest = [...items].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at) || a.id.localeCompare(b.id))[0];
          if (!latest) return { track, kind: 'available', count: 0, latest: null };
          const detail = readSharedCycle(await productionServiceTransport(`/${latest.id}`, undefined, options), track);
          if (detail.record.id !== latest.id || detail.record.revision < latest.revision
            || ['scope', 'owner', 'project_reference', 'authorization_reference'].some(key => detail.record[key] !== latest[key])) throw new Error('SERVICE_RESPONSE_INVALID');
          const { state } = validateServiceCycle(detail.cycle);
          return { track, kind: 'available', count: items.length, latest: detail.record, state,
            date: detail.cycle.events.at(-1)?.occurred_on || null };
        } catch (error) { return { track, kind: issue(error) }; }
      }));
      if (!controller.signal.aborted) setSource({ principal, rows: results });
    })().catch(error => {
      if (!controller.signal.aborted) setSource({ principal, rows: TRACKS.map(track => ({ track, kind: issue(error) })) });
    });
    return () => controller.abort();
  }, [principal, reload]);

  return <section aria-labelledby="production-overview-title" className="space-y-5" data-testid="production-overview">
    <header className="flex items-start justify-between gap-3 border-b border-slate-700 pb-4">
      <div className="min-w-0">
        <h2 id="production-overview-title" className="text-xl font-semibold text-slate-100">{t.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{t.scope}</p>
        <p className="mt-2 max-w-4xl text-sm text-slate-400">{t.boundary}</p>
      </div>
      <button type="button" className="m3s-secondary-button inline-flex h-11 w-11 shrink-0 items-center justify-center" title={t.refresh} aria-label={t.refresh}
        disabled={loading} onClick={() => setReload(value => value + 1)}><RefreshCw size={18} aria-hidden="true" /></button>
    </header>
    <div className="divide-y divide-slate-700">
      {rows.map(row => <section key={row.track} aria-label={t[row.track]} className="min-w-0 py-5 first:pt-0">
        <h3 className="text-base font-semibold text-slate-100">{t[row.track]}</h3>
        {row.kind !== 'available' ? <p role={row.kind === 'loading' ? 'status' : 'alert'} className="mt-3 text-sm text-slate-300">{t[row.kind]}</p> : <>
          <p className="mt-3 text-sm text-slate-300">{t.count} : <strong>{row.count}</strong></p>
          {!row.latest ? <p className="mt-2 text-sm text-slate-400">{t.empty}</p> : <dl className="mt-3 grid min-w-0 gap-x-5 gap-y-2 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
            <dt className="text-slate-400">{t.latest}</dt><dd className="min-w-0 break-words text-slate-200">{row.latest.scope}</dd>
            <dt className="text-slate-400">{t.owner}</dt><dd className="break-words text-slate-200">{row.latest.owner}</dd>
            <dt className="text-slate-400">{t.state}</dt><dd className="text-slate-200">{t.stages[row.state]}</dd>
            <dt className="text-slate-400">{t.date}</dt><dd className="whitespace-nowrap text-slate-200">{formatRegistryDate(row.date, language)}</dd>
            <dt className="text-slate-400">{t.revision}</dt><dd className="break-all text-slate-200">{row.latest.revision}{' \u00b7 '}{row.latest.id}</dd>
          </dl>}
        </>}
      </section>)}
    </div>
    <p className="border-t border-slate-700 pt-4 text-sm text-slate-400">{t.receipt}</p>
    <button type="button" className="m3s-secondary-button inline-flex min-h-11 items-center gap-2 px-3" onClick={onOpenServices}>
      <ArrowRight size={18} aria-hidden="true" />{t.open}
    </button>
  </section>;
}
