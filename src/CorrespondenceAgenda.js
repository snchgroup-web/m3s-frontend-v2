import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from 'lucide-react';
import api from './api';
import { useAuth } from './AuthContext';
import { ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION, hasPermission } from './accessControl';
import { isDemoSession } from './administrationRegistryAdapters';
import { currentAgendaMonth, groupCorrespondenceAgenda, loadCorrespondenceAgenda, shiftAgendaMonth } from './correspondenceAgendaModel';

const COPY = {
  FR: {
    title: 'Agenda', source: 'Agenda partagé · Courrier', month: 'Mois', previous: 'Mois précédent', next: 'Mois suivant', today: 'Aujourd’hui', refresh: 'Actualiser l’agenda',
    loading: 'Chargement de l’agenda…', unavailable: 'Agenda indisponible. Les échéances enregistrées restent conservées dans le Courrier.', forbidden: 'Accès à l’agenda du courrier non autorisé.', empty: 'Aucun suivi programmé pour ce mois.',
    partial: 'Extrait partiel du registre : certaines échéances peuvent ne pas être affichées.', includeClosed: 'Inclure les courriers clos', review: 'Point de suivi', planned: 'Planifié', closed: 'Clos', records: 'courrier(s) lié(s)', open: 'Ouvrir le courrier', noAction: 'Prochaine action non renseignée', unknownOwner: 'Responsable non renseigné', locale: 'fr-CH'
  },
  EN: {
    title: 'Agenda', source: 'Shared agenda · Correspondence', month: 'Month', previous: 'Previous month', next: 'Next month', today: 'Today', refresh: 'Refresh agenda',
    loading: 'Loading agenda…', unavailable: 'Agenda unavailable. Saved deadlines remain in the correspondence register.', forbidden: 'Correspondence agenda access not authorised.', empty: 'No follow-up scheduled this month.',
    partial: 'Partial register extract: some deadlines may not be displayed.', includeClosed: 'Include closed correspondence', review: 'Follow-up review', planned: 'Scheduled', closed: 'Closed', records: 'linked correspondence item(s)', open: 'Open correspondence', noAction: 'Next action not specified', unknownOwner: 'Owner not specified', locale: 'en-GB'
  },
  DE: {
    title: 'Agenda', source: 'Gemeinsame Agenda · Korrespondenz', month: 'Monat', previous: 'Vorheriger Monat', next: 'Nächster Monat', today: 'Heute', refresh: 'Agenda aktualisieren',
    loading: 'Agenda wird geladen…', unavailable: 'Agenda nicht verfügbar. Gespeicherte Fristen bleiben im Korrespondenzregister erhalten.', forbidden: 'Zugriff auf die Korrespondenzagenda nicht erlaubt.', empty: 'Keine Nachverfolgung für diesen Monat geplant.',
    partial: 'Unvollständiger Registerauszug: Einige Fristen werden möglicherweise nicht angezeigt.', includeClosed: 'Abgeschlossene Korrespondenz einbeziehen', review: 'Nachverfolgung', planned: 'Geplant', closed: 'Abgeschlossen', records: 'verknüpfte Korrespondenzeinträge', open: 'Korrespondenz öffnen', noAction: 'Nächste Aktion nicht angegeben', unknownOwner: 'Verantwortung nicht angegeben', locale: 'de-CH'
  }
};

const CorrespondenceAgenda = ({ language = 'FR' }) => {
  const { token, user } = useAuth();
  const t = COPY[language] || COPY.FR;
  const [month, setMonth] = useState(currentAgendaMonth);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [result, setResult] = useState({ identity: '', status: 'loading', records: [], partial: false });
  const allowed = Boolean(token && !isDemoSession(token) && hasPermission(user?.permissions, ADMINISTRATION_CORRESPONDENCE_READ_PERMISSION));
  const identity = JSON.stringify([user?.tenantId, user?.id || user?.email, user?.permissions]);

  useEffect(() => {
    let active = true;
    setResult({ identity, status: allowed ? 'loading' : 'forbidden', records: [], partial: false });
    if (allowed) {
      loadCorrespondenceAgenda(api.getAdministrationCorrespondence, () => active).then(data => {
        if (active && data) setResult({ ...data, identity, status: 'ready' });
      }).catch(error => {
        if (active) setResult({ identity, status: [401, 403].includes(error.status) ? 'forbidden' : 'unavailable', records: [], partial: false });
      });
    }
    return () => { active = false; };
  }, [allowed, identity, token, refresh]);

  const current = allowed && result.identity === identity ? result : { status: allowed ? 'loading' : 'forbidden', records: [] };
  const groups = useMemo(() => groupCorrespondenceAgenda(current.records, month, includeClosed), [current.records, month, includeClosed]);
  const formatDate = date => new Intl.DateTimeFormat(t.locale, { timeZone: 'Europe/Zurich', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00Z`));
  const iconButton = 'm3s-secondary-button inline-flex min-h-11 min-w-11 items-center justify-center disabled:opacity-50';

  return (
    <section id="planning-agenda" className="scroll-mt-40 border-y border-slate-700 py-5" aria-labelledby="planning-agenda-title">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 id="planning-agenda-title" className="flex items-center gap-2 text-xl font-semibold text-slate-100"><CalendarDays size={22} aria-hidden="true" />{t.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{t.source}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={iconButton} title={t.previous} aria-label={t.previous} onClick={() => setMonth(value => shiftAgendaMonth(value, -1))}><ChevronLeft size={20} /></button>
          <label className="sr-only" htmlFor="correspondence-agenda-month">{t.month}</label>
          <input id="correspondence-agenda-month" className="m3s-field m3s-native-date min-h-11 w-44" type="month" value={month} onChange={event => { if (/^\d{4}-\d{2}$/.test(event.target.value)) setMonth(event.target.value); }} />
          <button type="button" className={iconButton} title={t.next} aria-label={t.next} onClick={() => setMonth(value => shiftAgendaMonth(value, 1))}><ChevronRight size={20} /></button>
          <button type="button" className="m3s-secondary-button min-h-11 px-3 text-sm" onClick={() => setMonth(currentAgendaMonth())}>{t.today}</button>
          <button type="button" className={iconButton} title={t.refresh} aria-label={t.refresh} disabled={!allowed || current.status === 'loading'} onClick={() => setRefresh(value => value + 1)}><RefreshCw size={18} /></button>
        </div>
      </div>
      <label className="mt-4 flex min-h-11 items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={includeClosed} onChange={event => setIncludeClosed(event.target.checked)} />{t.includeClosed}</label>
      {current.status !== 'ready' && <p role="status" className="py-4 text-sm text-slate-300">{t[current.status]}</p>}
      {current.status === 'ready' && current.partial && <p role="status" className="py-2 text-sm text-amber-300">{t.partial}</p>}
      {current.status === 'ready' && groups.length === 0 && <p className="py-4 text-sm text-slate-300">{t.empty}</p>}
      {groups.map(group => (
        <article key={JSON.stringify([group.date, group.owner])} className="border-t border-slate-700 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-semibold text-slate-100"><time dateTime={group.date}>{formatDate(group.date)}</time></h4>
            <span className="text-sm text-blue-300">{group.records.every(item => item.statusIndex === 3) ? t.closed : t.planned}</span>
          </div>
          <p className="mt-1 text-sm text-slate-300">{t.review} · {group.owner || t.unknownOwner} · {group.records.length} {t.records}</p>
          <ul className="mt-3 divide-y divide-slate-700">
            {group.records.map(item => (
              <li key={item.id} className="flex flex-col justify-between gap-3 py-3 md:flex-row">
                <div className="min-w-0 break-words">
                  <p className="font-medium text-slate-100">{item.subject}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.next || t.noAction}</p>
                  <p className="mt-1 break-all font-mono text-xs text-slate-400">{item.id}</p>
                </div>
                <Link className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-sm text-blue-300 underline underline-offset-4" to={`/administration?tab=communication&correspondenceId=${encodeURIComponent(item.id)}#communication-register`}><ExternalLink size={16} aria-hidden="true" />{t.open}</Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
};

export default CorrespondenceAgenda;
