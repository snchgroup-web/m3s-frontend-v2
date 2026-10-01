import { cfaPerChfObservation } from './financeFxHistory';

const paritySource = 'https://www.bceao.int/cours/cours-des-devises-contre-Franc-CFA-appliquer-aux-transferts';
const officialObservation = (date, chfPerEur, validThrough = date) => Object.freeze({
  date, validThrough, chfPerEur, xofPerEur: 655.957,
  source: `https://www.bancaditalia.it/compiti/operazioni-cambi/cambio/cambi_rif_${date.replaceAll('-', '')}/?com.dotmarketing.htmlpage.language=1`,
  paritySource,
});

// Public historical observations, never applied to ledger amounts or saved forms.
export const referenceObservation = officialObservation('2026-09-25', 0.9445, '2026-09-27');
const publicObservations = [
  officialObservation('2026-09-02', 0.9424),
  officialObservation('2026-09-04', 0.9405, '2026-09-06'),
  officialObservation('2026-09-18', 0.9462),
  referenceObservation,
  officialObservation('2026-09-29', 0.9461),
  Object.freeze({
    ...officialObservation('2026-10-01', 0.9437),
    source: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-chf.en.html',
  }),
];

const validDate = date => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
};

export function safeSourceUrl(source) {
  try {
    const url = new URL(source);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function expenseReferenceValuation(expense, history = []) {
  const date = String(expense.date || '').slice(0, 10);
  if (expense.hasExplicitTauxFx || expense.montantCfaAvailable || !expense.montantChfAvailable
    || !Number.isFinite(expense.montantChf) || expense.montantChf <= 0 || !validDate(date)
    || expense.source_amounts?.recipient_amount != null
    || /\bria\b|western\s*union|\bwu\b/i.test(`${expense.fournisseur || ''} ${expense.description || ''}`)) return null;

  // Transaction-provider rates belong to their payment, not a market reference.
  const candidates = (Array.isArray(history) ? history : []).filter(row => row.date === date
    && typeof row.source === 'string' && row.source.trim()
    && !/\bria\b|western\s*union|\bwu\b/i.test(row.source))
    .map(row => ({ ...row, rate: cfaPerChfObservation(row)?.rate })).filter(row => row.rate);
  if (candidates.length) {
    const rate = candidates[0].rate;
    if (candidates.some(row => Math.abs(row.rate - rate) > 0.000001)) return null;
    return { ...candidates[0], source: candidates[0].source.trim(), rate, equivalent: expense.montantChf * rate, fromHistory: true };
  }
  const observation = publicObservations.find(row => date >= row.date && date <= row.validThrough);
  if (!observation) return null;
  const rate = observation.xofPerEur / observation.chfPerEur;
  return { ...observation, rate, equivalent: expense.montantChf * rate, fromHistory: false };
}
