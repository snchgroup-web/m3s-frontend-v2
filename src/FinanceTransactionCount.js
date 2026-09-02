import React from 'react';

export const parseTransactionCount = (value) => {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;
  const count = Number(value);
  return Number.isSafeInteger(count) && count >= 0 ? count : null;
};

export const sumTransactionCounts = (...values) => {
  const counts = values.map(parseTransactionCount);
  return counts.every(count => count !== null)
    ? parseTransactionCount(counts.reduce((sum, count) => sum + count, 0))
    : null;
};

const COPY = {
  FR: { global: 'Transactions', extract: 'Transactions chargées', registry: 'Registre : transactions chargées' },
  EN: { global: 'Transactions', extract: 'Loaded transactions', registry: 'Register: loaded transactions' },
  DE: { global: 'Transaktionen', extract: 'Geladene Transaktionen', registry: 'Register: geladene Transaktionen' }
};

export default function FinanceTransactionCount({ count, state, scope = 'global', language = 'FR' }) {
  const value = state === 'available' ? parseTransactionCount(count) : null;
  const locale = language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH';
  return (
    <span className="m3s-transaction-count mt-2 block text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>
      {(COPY[language] || COPY.FR)[scope]} : {state === 'loading' ? '…' : value === null ? '—' : value.toLocaleString(locale)}
    </span>
  );
}
