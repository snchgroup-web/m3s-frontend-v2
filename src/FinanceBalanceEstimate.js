import React from 'react';
import { balanceReferenceObservation, safeSourceUrl } from './expenseReferenceValuation';

const copy = {
  FR: { label: 'Solde CFA estimé', basis: 'Estimation du solde CHF · hors comptabilité', rate: 'Référence du', sources: 'Sources BCE / BCEAO', unavailable: 'Estimation indisponible' },
  EN: { label: 'Estimated CFA balance', basis: 'CHF balance estimate · not a ledger balance', rate: 'Reference dated', sources: 'ECB / BCEAO sources', unavailable: 'Estimate unavailable' },
  DE: { label: 'Geschätzter CFA-Saldo', basis: 'Schätzung des CHF-Saldos · kein Buchsaldo', rate: 'Referenz vom', sources: 'EZB-/BCEAO-Quellen', unavailable: 'Schätzung nicht verfügbar' },
};

export default function FinanceBalanceEstimate({ balance, state, language = 'FR', reference = balanceReferenceObservation }) {
  const t = copy[language] || copy.FR;
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  const rate = reference?.xofPerEur / reference?.chfPerEur;
  const source = safeSourceUrl(reference?.source);
  const paritySource = safeSourceUrl(reference?.paritySource);
  const available = state === 'available' && Number.isFinite(balance) && Number.isFinite(rate)
    && rate > 0 && source && paritySource && /^\d{4}-\d{2}-\d{2}$/.test(reference?.date || '')
    && Number.isFinite(balance * rate);
  return <div className="mt-3 border-t pt-2 text-xs" style={{ borderColor: 'var(--m3s-border)', color: 'var(--m3s-text-secondary)' }}>
    <p>{t.label}</p>
    <p data-testid="finance-estimated-balance-cfa" className="mt-1 break-words text-lg font-semibold" style={{ color: 'var(--m3s-status-info)' }}>
      {available ? `≈ ${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(balance * rate)} CFA` : '— CFA'}
    </p>
    {available ? <>
      <p className="mt-1">{t.basis}</p>
      <p className="mt-1">{t.rate} {reference.date.split('-').reverse().join('.')} · 1 CHF = {new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(rate)} CFA</p>
      <details className="mt-1">
        <summary className="cursor-pointer text-blue-400 focus-visible:outline focus-visible:outline-2">{t.sources}</summary>
        <a className="block underline" href={source} target="_blank" rel="noopener noreferrer">1 EUR = {reference.chfPerEur} CHF</a>
        <a className="block underline" href={paritySource} target="_blank" rel="noopener noreferrer">1 EUR = {reference.xofPerEur} XOF</a>
      </details>
    </> : <p>{t.unavailable}</p>}
  </div>;
}
