export const TRANSFER_PROVIDERS = [
  { id: 'ria', name: 'Ria', url: 'https://www.riamoneytransfer.com/fr-ch/send-money-to-senegal/' },
  { id: 'wu', name: 'Western Union', url: 'https://www.westernunion.com/ch/fr/send-money-to-senegal.html' }
];
export const TRANSFER_QUOTE_MAX_AGE_MS = 60 * 60 * 1000;
export const createTransferComparison = () => ({
  payout: 'cash', payment: 'debit', promotion: 'regular',
  quotes: TRANSFER_PROVIDERS.map(({ id }) => ({ id, total: '', fees: '', net: '', observedAt: '', delay: '', verified: false }))
});

const money = value => {
  if ((typeof value !== 'string' && typeof value !== 'number') || String(value).trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 && number <= 1e12 && Math.abs(number * 100 - Math.round(number * 100)) < 0.001 ? Math.round(number * 100) : null;
};

export function compareTransferQuotes(state, now = Date.now()) {
  const quotes = state.quotes.map(quote => {
    const total = money(quote.total), fees = money(quote.fees), net = money(quote.net);
    const date = new Date(quote.observedAt);
    const parts = String(quote.observedAt).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
    const matches = parts && [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()].every((part, index) => part === Number(parts[index + 1]));
    const observedAt = matches ? date.getTime() : NaN;
    let reason = null;
    if (!total || !net || fees === null || fees >= total) reason = 'incomplete';
    else if (!Number.isFinite(observedAt) || observedAt > now) reason = 'date';
    else if (now - observedAt > TRANSFER_QUOTE_MAX_AGE_MS) reason = 'stale';
    else if (!quote.verified) reason = 'unverified';
    return { ...quote, total, fees, net, reason, effectiveRate: total && net ? net / total : null };
  });
  const ready = quotes.every(quote => !quote.reason) && quotes.length === 2;
  // Compare actual equal all-in budgets, never extrapolate provider quotes or use the M3S reference rate.
  if (!ready) return { quotes, status: 'pending', bestId: null, difference: null };
  if (quotes[0].total !== quotes[1].total) return { quotes, status: 'budget', bestId: null, difference: null };
  const difference = Math.abs(quotes[0].net - quotes[1].net) / 100;
  return { quotes, status: difference === 0 ? 'equal' : 'ranked',
    bestId: difference === 0 ? null : quotes[quotes[0].net > quotes[1].net ? 0 : 1].id, difference };
}
