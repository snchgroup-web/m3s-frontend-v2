import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

const COPY = {
  FR: { details: 'Détail du taux CHF/CFA', unavailable: 'Taux indisponible', date: 'Date du taux', source: 'Source', unknown: 'Non renseignée', current: 'Référence du jour', previous: 'Dernière référence disponible', undated: 'Date à vérifier', fallback: 'Historique de référence', indicative: 'Taux indicatif, distinct du taux appliqué aux transactions.' },
  DE: { details: 'Details zum CHF/CFA-Kurs', unavailable: 'Kurs nicht verfügbar', date: 'Kursdatum', source: 'Quelle', unknown: 'Nicht angegeben', current: 'Referenz von heute', previous: 'Letzte verfügbare Referenz', undated: 'Datum zu prüfen', fallback: 'Referenzhistorie', indicative: 'Indikativer Kurs, getrennt vom angewandten Transaktionskurs.' },
  EN: { details: 'CHF/CFA rate details', unavailable: 'Rate unavailable', date: 'Rate date', source: 'Source', unknown: 'Not provided', current: "Today's reference", previous: 'Latest available reference', undated: 'Date to verify', fallback: 'Reference history', indicative: 'Indicative rate, separate from the rate applied to transactions.' }
};

export const readHeaderFx = response => {
  const rate = Number(response?.taux_du_jour?.CHF_CFA);
  if (!Number.isFinite(rate) || rate <= 0) return { rate: null, metadata: null };
  const metadata = response?.taux_du_jour_details?.CHF_CFA;
  return { rate, metadata: metadata && Number(metadata.rate) === rate ? metadata : null };
};

const HeaderFxRate = ({ response, language = 'FR', now = new Date() }) => {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const t = COPY[language] || COPY.FR;
  const locale = { FR: 'fr-CH', DE: 'de-CH', EN: 'en-GB' }[language] || 'fr-CH';
  const { rate, metadata } = readHeaderFx(response);
  const date = typeof metadata?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ? metadata.date : null;
  const parsedDate = date ? new Date(`${date}T00:00:00Z`) : null;
  const validDate = parsedDate && Number.isFinite(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === date;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const status = !validDate || date > today ? t.undated : date === today ? t.current : t.previous;
  const displayDate = validDate ? new Intl.DateTimeFormat(locale, { timeZone: 'UTC', dateStyle: 'medium' }).format(parsedDate) : t.unknown;
  const source = typeof metadata?.source === 'string' && metadata.source.trim() ? metadata.source.trim() : t.unknown;

  useEffect(() => {
    if (!open) return undefined;
    const pointer = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    const key = event => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', pointer);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', pointer);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button ref={trigger} type="button" className="header-fx-trigger inline-flex items-center gap-1 rounded font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400" aria-label={t.details} aria-expanded={open} aria-controls="header-fx-details" title={`${t.details} · ${rate ? status : t.unavailable}`} onClick={() => setOpen(value => !value)}>
        <span>{rate ? `1 CHF = ${rate.toLocaleString(locale, { maximumFractionDigits: 4 })} CFA` : t.unavailable}</span>
        <Info size={13} aria-hidden="true" />
      </button>
      {open && (
        <section id="header-fx-details" aria-label={t.details} className="header-settings-panel absolute right-0 top-7 z-50 w-72 max-w-[calc(100vw-1rem)] rounded-md border border-slate-600 bg-slate-800 p-3 text-left text-slate-100 shadow-xl">
          <p className="font-semibold">{rate ? status : t.unavailable}</p>
          <dl className="mt-2 space-y-2">
            <div><dt className="text-slate-400">{t.date}</dt><dd>{displayDate}</dd></div>
            <div><dt className="text-slate-400">{t.source}</dt><dd className="break-words">{source}</dd></div>
          </dl>
          {metadata?.basis === 'history_fallback' && <p className="mt-2 text-slate-400">{t.fallback}</p>}
          <p className="mt-2 border-t border-slate-600 pt-2 text-slate-300">{t.indicative}</p>
        </section>
      )}
    </div>
  );
};

export default HeaderFxRate;
