import React from 'react';

// Dated public observation, valid only through the following non-business days.
// Never persisted as an applied rate or included in recorded financial totals.
export const referenceObservation = Object.freeze({
  date: '2026-09-25',
  validThrough: '2026-09-27',
  chfPerEur: 0.9445,
  xofPerEur: 655.957,
  source: 'https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_20260925/?com.dotmarketing.htmlpage.language=1',
  paritySource: 'https://www.bceao.int/cours/cours-des-devises-contre-Franc-CFA-appliquer-aux-transferts',
});

export function expenseReferenceValuation(expense) {
  const date = String(expense.date || '').slice(0, 10);
  if (expense.hasExplicitTauxFx || expense.montantCfaAvailable || !expense.montantChfAvailable
    || !Number.isFinite(expense.montantChf) || expense.montantChf <= 0
    || !/^\d{4}-\d{2}-\d{2}$/.test(date)
    || date < referenceObservation.date || date > referenceObservation.validThrough) return null;
  const rate = referenceObservation.xofPerEur / referenceObservation.chfPerEur;
  return { rate, equivalent: expense.montantChf * rate };
}

const labels = {
  FR: { reference: 'Référence indicative', excluded: 'Hors totaux comptables', source: 'Cours BCE', parity: 'Parité BCEAO' },
  EN: { reference: 'Indicative reference', excluded: 'Excluded from recorded totals', source: 'ECB rate', parity: 'BCEAO parity' },
  DE: { reference: 'Indikativer Referenzkurs', excluded: 'Nicht in gebuchten Summen', source: 'EZB-Kurs', parity: 'BCEAO-Parität' },
};

export default function ExpenseReferenceRate({ expense, language, missingLabel }) {
  const valuation = expenseReferenceValuation(expense);
  if (!valuation) return <span className="font-semibold text-amber-300">{missingLabel}</span>;
  const t = labels[language] || labels.FR;
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  const rate = new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(valuation.rate);
  const amount = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(valuation.equivalent);
  return (
    <div className="min-w-40 max-w-56 text-slate-300" onClick={event => event.stopPropagation()}>
      <span className="font-semibold">{rate}</span>
      <small className="block">{t.reference} · 25.09.2026</small>
      <small className="block">≈ {amount} FCFA</small>
      <details className="mt-1 text-xs">
        <summary className="cursor-pointer text-blue-400 focus-visible:outline focus-visible:outline-2">{t.source} / BCEAO</summary>
        <p className="mt-1">{t.excluded}</p>
        <a className="block underline" href={referenceObservation.source} target="_blank" rel="noopener noreferrer">{t.source} · 1 EUR = 0.9445 CHF</a>
        <a className="block underline" href={referenceObservation.paritySource} target="_blank" rel="noopener noreferrer">{t.parity} · 1 EUR = 655.957 XOF</a>
      </details>
    </div>
  );
}
