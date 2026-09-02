export const parseFxRate = value => {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (typeof value === 'string' && !value.trim()) return null;
  const rate = Number(value);
  return Number.isFinite(rate) && rate > 0 ? rate : null;
};

export const cfaPerChfObservation = row => {
  const rate = parseFxRate(row.rate);
  if (rate === null) return null;
  const from = String(row.devise_from || '').trim().toUpperCase();
  const to = String(row.devise_to || '').trim().toUpperCase();
  if (from === 'CHF' && to === 'CFA') return { rate, direct: true };
  if (from === 'CFA' && to === 'CHF') {
    const inverse = parseFxRate(1 / rate);
    return inverse === null ? null : { rate: inverse, direct: false };
  }
  return null;
};

const average = rates => rates.length
  ? parseFxRate(rates.reduce((sum, rate) => sum + rate / rates.length, 0))
  : null;

export const summarizeFxHistory = rows => {
  const rates = rows.map(cfaPerChfObservation).filter(Boolean).map(item => item.rate);
  return {
    count: rates.length,
    minimum: rates.length ? Math.min(...rates) : null,
    maximum: rates.length ? Math.max(...rates) : null,
    average: average(rates)
  };
};

export const yearlyFxHistory = rows => {
  const years = new Map();
  rows.forEach(row => {
    const observation = cfaPerChfObservation(row);
    const date = String(row.date || '');
    if (!observation || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    const parsed = new Date(date + 'T00:00:00Z');
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return;
    const year = parsed.getUTCFullYear();
    if (!years.has(year)) years.set(year, { direct: [], inverse: [] });
    years.get(year)[observation.direct ? 'direct' : 'inverse'].push(observation.rate);
  });
  if (!years.size) return [];
  const first = Math.min(...years.keys()), last = Math.max(...years.keys());
  return Array.from({ length: last - first + 1 }, (_, index) => {
    const year = first + index, values = years.get(year);
    // Retain the existing direct-observation priority within each year.
    const rates = values ? (values.direct.length ? values.direct : values.inverse) : [];
    return { year: String(year), rate: average(rates), observations: rates.length };
  });
};
