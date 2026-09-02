import React from 'react';

const finiteAmount = value => {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const convertFinanceAmount = (amount, currency, rate) => {
  const value = finiteAmount(amount);
  const appliedRate = finiteAmount(rate);
  const canConvert = value !== null && appliedRate !== null && appliedRate > 0;
  if (currency === 'CHF') return { chf: value, cfa: canConvert ? finiteAmount(value * appliedRate) : null };
  if (currency === 'CFA') return { chf: canConvert ? finiteAmount(value / appliedRate) : null, cfa: value };
  return { chf: null, cfa: null };
};

const FinanceAmountPair = ({ chf, cfa, label, language, approximate = true, testId }) => {
  const locale = { FR: 'fr-CH', EN: 'en-GB', DE: 'de-CH' }[language] || 'fr-CH';
  const display = (value, unit) => {
    const amount = finiteAmount(value);
    return `${amount === null ? '\u2014' : amount.toLocaleString(locale, { maximumFractionDigits: 2 })} ${unit}`;
  };
  return (
    <div className="min-w-0 mt-2">
      <p className="mb-1 text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>{label}</p>
      <output aria-label={label} aria-live="polite" data-testid={testId} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-base font-semibold">
        <span className="max-w-full break-words" style={{ color: 'var(--m3s-status-info)' }}>{display(chf, 'CHF')}</span>
        <span className="m3s-currency-cfa max-w-full break-words">{approximate ? '\u2248 ' : ''}{display(cfa, 'CFA')}</span>
      </output>
    </div>
  );
};

export default FinanceAmountPair;
