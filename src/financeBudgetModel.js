export const BUDGET_MAX_ROWS = 100;
export const BUDGET_FILE_LIMIT = 512 * 1024;
export const BUDGET_KINDS = ['operating', 'investment', 'financing'];
export const BUDGET_CURRENCIES = ['CHF', 'CFA'];
export const BUDGET_DIRECTIONS = ['in', 'out'];

export const parseBudgetAmount = value => {
  if (typeof value !== 'string') return { state: 'invalid', cents: null };
  if (!value.trim()) return { state: 'empty', cents: null };
  const text = value.trim().replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(text) || Number(text) > 1e9) return { state: 'invalid', cents: null };
  const [whole, fraction = ''] = text.split('.');
  return { state: 'valid', cents: Number(whole) * 100 + Number(fraction.padEnd(2, '0')) };
};
export const parseBudgetRate = value => {
  if (typeof value !== 'string' || !/^\d+(?:[.,]\d{1,6})?$/.test(value.trim())) return null;
  const rate = Number(value.trim().replace(',', '.'));
  return rate > 0 && rate <= 1e6 ? rate : null;
};
export const createBudget = (year = new Date().getFullYear()) => ({
  title: '', entity: '', year: String(year), revision: 0, rate: '', rateSource: '', rateDate: '', rows: []
});
export const createBudgetRow = () => ({
  id: window.crypto.randomUUID(), label: '', kind: 'operating',
  direction: 'out', currency: 'CHF', months: Array(12).fill('')
});
const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const validText = (value, max, required = false) => typeof value === 'string'
  && value.length <= max && (!required || Boolean(value.trim()));
export const isBudgetValid = draft => {
  if (!draft || !validText(draft.title, 120, true) || !validText(draft.entity, 120, true)
    || typeof draft.year !== 'string' || !/^\d{4}$/.test(draft.year) || Number(draft.year) < 2000 || Number(draft.year) > 2100
    || !Number.isInteger(draft.revision) || draft.revision < 0 || draft.revision > 1000000
    || !validText(draft.rate, 24) || !validText(draft.rateSource, 200) || !validText(draft.rateDate, 10)
    || (draft.rate.trim() ? parseBudgetRate(draft.rate) === null || !draft.rateSource.trim() || !validDate(draft.rateDate) : Boolean(draft.rateSource || draft.rateDate))
    || !Array.isArray(draft.rows) || draft.rows.length > BUDGET_MAX_ROWS) return false;
  const ids = new Set();
  return draft.rows.every(row => {
    if (!row || !validText(row.id, 64, true) || ids.has(row.id)
      || !validText(row.label, 120, true) || !BUDGET_KINDS.includes(row.kind)
      || !BUDGET_DIRECTIONS.includes(row.direction) || !BUDGET_CURRENCIES.includes(row.currency)
      || !Array.isArray(row.months) || row.months.length !== 12
      || !row.months.every(v => typeof v === 'string' && v.length <= 24 && parseBudgetAmount(v).state !== 'invalid')) return false;
    ids.add(row.id); return true;
  });
};
export const summarizeBudgetRow = row => {
  const amounts = row.months.map(parseBudgetAmount);
  return {
    cents: amounts.some(v => v.state === 'invalid') || !amounts.some(v => v.state === 'valid') ? null : amounts.reduce((sum, v) => sum + (v.cents ?? 0), 0),
    filled: amounts.filter(v => v.state === 'valid').length,
    invalid: amounts.filter(v => v.state === 'invalid').length
  };
};
// Currency buckets stay separate: the rate is an explicit budget assumption, never a live FX fallback.
export const summarizeBudget = draft => BUDGET_CURRENCIES.map(currency => {
  const groups = Object.fromEntries(BUDGET_DIRECTIONS.map(direction => {
    const rows = draft.rows.filter(row => row.currency === currency && row.direction === direction);
    const summaries = rows.map(summarizeBudgetRow);
    const filled = summaries.reduce((sum, r) => sum + r.filled, 0);
    const invalid = summaries.reduce((sum, r) => sum + r.invalid, 0);
    return [direction, {
      cents: !filled || invalid ? null : summaries.reduce((sum, r) => sum + (r.cents ?? 0), 0),
      filled, expected: rows.length * 12, invalid
    }];
  }));
  return { currency, ...groups };
});
export const serializeBudget = (draft, now = new Date()) => {
  if (!isBudgetValid(draft) || draft.revision >= 1000000) throw new Error('Invalid budget');
  const next = { ...draft, revision: draft.revision + 1 };
  return { draft: next, text: JSON.stringify({ schema: 'm3s-budget-draft', version: 1, scope: 'organization', status: 'draft', exportedAt: now.toISOString(), budget: next }, null, 2) };
};
export const parseBudgetFile = text => {
  if (typeof text !== 'string' || text.length > BUDGET_FILE_LIMIT) throw new Error('Invalid budget file');
  const file = JSON.parse(text);
  if (file?.schema !== 'm3s-budget-draft' || file.version !== 1 || file.scope !== 'organization' || file.status !== 'draft'
    || !isBudgetValid(file.budget)) throw new Error('Invalid budget file');
  const b = file.budget;
  // Copy only the supported fields. Imported permissions, actuals and approval claims are never retained.
  return {
    title: b.title, entity: b.entity, year: b.year, revision: b.revision,
    rate: b.rate, rateSource: b.rateSource, rateDate: b.rateDate,
    rows: b.rows.map(r => ({ id: r.id, label: r.label, kind: r.kind, direction: r.direction, currency: r.currency, months: [...r.months] }))
  };
};
