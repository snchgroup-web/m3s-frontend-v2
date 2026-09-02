import { parseFxRate, cfaPerChfObservation, summarizeFxHistory, yearlyFxHistory } from './financeFxHistory';

const direct = (rate, date = '2026-09-01') => ({ rate, date, devise_from: 'CHF', devise_to: 'CFA' });
const inverse = (rate, date) => ({ ...direct(rate, date), devise_from: 'CFA', devise_to: 'CHF' });

test.each([undefined, null, '', ' ', '700oops', '1,25', 0, '0', -1, Infinity, NaN, true, {}, []])('rejects invalid rate %p without fabricating zero', value => {
  expect(parseFxRate(value)).toBeNull();
  expect(cfaPerChfObservation(direct(value))).toBeNull();
});

test.each([700, '700', ' 700.25 ', '1e-3'])('accepts a finite strictly positive rate %p', value => {
  expect(parseFxRate(value)).toBe(Number(value));
});

test('normalizes only CHF/CFA observations and rejects reciprocal overflow', () => {
  expect(cfaPerChfObservation(direct(700))).toEqual({ rate: 700, direct: true });
  expect(cfaPerChfObservation(inverse(0.002))).toEqual({ rate: 500, direct: false });
  expect(cfaPerChfObservation({ ...direct(1.1), devise_to: 'USD' })).toBeNull();
  expect(cfaPerChfObservation(inverse(Number.MIN_VALUE))).toBeNull();
});

test('summarizes valid loaded observations without current-rate substitution', () => {
  expect(summarizeFxHistory([direct(700), inverse(0.002), direct(-8), direct('700x'), { ...direct(1.1), devise_to: 'USD' }])).toEqual({ count: 2, minimum: 500, maximum: 700, average: 600 });
  expect(summarizeFxHistory([])).toEqual({ count: 0, minimum: null, maximum: null, average: null });
  expect(summarizeFxHistory([direct(1e308), direct(1e308)]).average).toBe(1e308);
});

test('builds the actual year range beyond 2026 and leaves missing years null', () => {
  expect(yearlyFxHistory([direct(700, '2025-09-01'), direct(730, '2027-09-01')])).toEqual([
    { year: '2025', rate: 700, observations: 1 },
    { year: '2026', rate: null, observations: 0 },
    { year: '2027', rate: 730, observations: 1 }
  ]);
});

test('retains direct priority by year and uses inverses only without direct observations', () => {
  const rows = [direct(700, '2025-09-01'), direct(710, '2025-09-02'), inverse(0.002, '2025-09-03'), inverse(0.002, '2026-09-01')];
  expect(yearlyFxHistory(rows)).toEqual([{ year: '2025', rate: 705, observations: 2 }, { year: '2026', rate: 500, observations: 1 }]);
});

test('undated or impossible dates do not become annual observations', () => {
  expect(yearlyFxHistory([direct(700, ''), direct(700, '2026-02-30'), direct(700, '2026-13-01'), direct(700, 'unknown'), direct('700x')])).toEqual([]);
  expect(summarizeFxHistory([direct(700, '')]).count).toBe(1);
});
