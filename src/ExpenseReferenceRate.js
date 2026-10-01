import React from 'react';
import { expenseReferenceValuation, safeSourceUrl } from './expenseReferenceValuation';
export { expenseReferenceValuation, referenceObservation } from './expenseReferenceValuation';

const labels = {
  FR: { reference: 'Référence indicative', excluded: 'Hors totaux comptables', source: 'Cours BCE', parity: 'Parité BCEAO', history: 'Source TFX', missing: 'Référence indisponible' },
  EN: { reference: 'Indicative reference', excluded: 'Excluded from recorded totals', source: 'ECB rate', parity: 'BCEAO parity', history: 'TFX source', missing: 'Reference unavailable' },
  DE: { reference: 'Indikativer Referenzkurs', excluded: 'Nicht in gebuchten Summen', source: 'EZB-Kurs', parity: 'BCEAO-Parität', history: 'TFX-Quelle', missing: 'Referenz nicht verfügbar' },
};
const localeFor = language => ({ FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH');

export function ExpenseReferenceAmount({ expense, language, history }) {
  const valuation = expenseReferenceValuation(expense, history);
  const t = labels[language] || labels.FR;
  if (!valuation) return <span className="font-normal text-amber-300">{t.missing}</span>;
  return <span title={t.excluded} className="font-normal text-slate-300">
    ≈ {new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 0 }).format(valuation.equivalent)}
    <small className="block">{t.reference}</small>
    <small className="block">{t.excluded}</small>
  </span>;
}

export default function ExpenseReferenceRate({ expense, language, missingLabel, history }) {
  const valuation = expenseReferenceValuation(expense, history);
  if (!valuation) return <span className="font-semibold text-amber-300">{missingLabel}</span>;
  const t = labels[language] || labels.FR;
  const rate = new Intl.NumberFormat(localeFor(language), { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(valuation.rate);
  const date = valuation.date.split('-').reverse().join('.');
  const sourceUrl = safeSourceUrl(valuation.source);
  return (
    <div className="min-w-40 max-w-56 text-slate-300" onClick={event => event.stopPropagation()}>
      <span className="font-semibold">{rate}</span>
      <small className="block">{t.reference} · {date}</small>
      <details className="mt-1 text-xs">
        <summary className="cursor-pointer text-blue-400 focus-visible:outline focus-visible:outline-2">{valuation.fromHistory ? t.history : `${t.source} / BCEAO`}</summary>
        <p className="mt-1">{t.excluded}</p>
        {valuation.fromHistory ? (sourceUrl
          ? <a className="block underline break-words" href={sourceUrl} target="_blank" rel="noopener noreferrer">{valuation.source}</a>
          : <p className="break-words">{valuation.source}</p>) : <>
          <a className="block underline" href={sourceUrl} target="_blank" rel="noopener noreferrer">{t.source} · 1 EUR = {valuation.chfPerEur} CHF</a>
          <a className="block underline" href={valuation.paritySource} target="_blank" rel="noopener noreferrer">{t.parity} · 1 EUR = 655.957 XOF</a>
        </>}
      </details>
    </div>
  );
}
