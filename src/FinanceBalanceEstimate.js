import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';
import { balanceReferenceObservation, safeSourceUrl } from './expenseReferenceValuation';

const copy = {
  FR: { label: 'Solde CFA estimé', basis: 'Estimation du solde CHF · hors comptabilité', rate: 'Référence du', sources: 'Sources BCE / BCEAO', unavailable: 'Estimation indisponible' },
  EN: { label: 'Estimated CFA balance', basis: 'CHF balance estimate · not a ledger balance', rate: 'Reference dated', sources: 'ECB / BCEAO sources', unavailable: 'Estimate unavailable' },
  DE: { label: 'Geschätzter CFA-Saldo', basis: 'Schätzung des CHF-Saldos · kein Buchsaldo', rate: 'Referenz vom', sources: 'EZB-/BCEAO-Quellen', unavailable: 'Schätzung nicht verfügbar' },
};

export default function FinanceBalanceEstimate({ balance, state, language = 'FR', reference = balanceReferenceObservation }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const dialog = useRef(null);
  const t = copy[language] || copy.FR;
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  const rate = reference?.xofPerEur / reference?.chfPerEur;
  const source = safeSourceUrl(reference?.source);
  const paritySource = safeSourceUrl(reference?.paritySource);
  const available = state === 'available' && Number.isFinite(balance) && Number.isFinite(rate)
    && rate > 0 && source && paritySource && /^\d{4}-\d{2}-\d{2}$/.test(reference?.date || '')
    && Number.isFinite(balance * rate);
  const active = open && available;
  const closeLabel = { FR: 'Fermer', EN: 'Close', DE: 'Schliessen' }[language] || 'Fermer';
  const amount = available ? `≈ ${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(balance * rate)} CFA` : '— CFA';
  useEffect(() => {
    if (!active) return undefined;
    const returnFocus = trigger.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    return () => { document.body.style.overflow = overflow; returnFocus?.focus(); };
  }, [active]);
  function keyboard(event) {
    if (event.key === 'Escape') { event.stopPropagation(); setOpen(false); }
    if (event.key === 'Tab') {
      const controls = dialog.current.querySelectorAll('button, a[href]');
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { event.preventDefault(); first?.focus(); }
    }
  }
  return <>
    <button ref={trigger} type="button" disabled={!available} aria-label={t.label} aria-haspopup="dialog" aria-expanded={Boolean(active)} title={available ? t.label : t.unavailable}
      onClick={event => { event.stopPropagation(); setOpen(true); }}
      className="mt-2 flex w-full items-center justify-between gap-2 text-left focus-visible:outline focus-visible:outline-2 disabled:cursor-default"
      style={{ color: 'var(--m3s-status-info)' }}>
      <span className="min-w-0"><span className="block text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>{t.label}</span>
        <span data-testid="finance-estimated-balance-cfa" className="block break-words text-lg font-semibold">{amount}</span></span>
      <Info size={18} className="shrink-0" aria-hidden="true" />
    </button>
    {active && createPortal(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) setOpen(false); }}>
      <section ref={dialog} role="dialog" aria-modal="true" aria-label={t.label} tabIndex={-1} onKeyDown={keyboard}
        className="m3s-panel w-full max-w-md max-h-[90vh] overflow-y-auto p-5" style={{ color: 'var(--m3s-text-primary)' }}>
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-semibold">{t.label}</h2>
          <button type="button" className="m3s-icon-button shrink-0" aria-label={closeLabel} title={closeLabel} onClick={() => setOpen(false)}><X size={20}/></button></div>
        <p className="mt-3 break-words text-xl font-semibold" style={{ color: 'var(--m3s-status-info)' }}>{amount}</p>
        <p className="mt-2 text-sm">{t.basis}</p>
        <p className="mt-3 text-sm">{t.rate} {reference.date.split('-').reverse().join('.')} · 1 CHF = {new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(rate)} CFA</p>
        <p className="mt-3 text-sm font-semibold">{t.sources}</p>
        <a className="mt-1 block text-sm underline" href={source} target="_blank" rel="noopener noreferrer">1 EUR = {reference.chfPerEur} CHF</a>
        <a className="mt-1 block text-sm underline" href={paritySource} target="_blank" rel="noopener noreferrer">1 EUR = {reference.xofPerEur} XOF</a>
      </section>
    </div>, document.body)}
  </>;
}
