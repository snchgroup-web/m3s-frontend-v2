import { incomeReferenceEstimate } from './incomeReferenceEstimate';

const summary = { incomeCount: 2, totalIncome: 10, incomeMissingChf: 0, incomeMissingCfa: 1,
  incomeSubtotal: { chf: 10, cfa: 5600 } };
const rows = [Object.freeze({ id: 'A', montant_chf: 8, montant_cfa: 5600 }),
  Object.freeze({ id: 'B', montant_chf: 2, montant_cfa: null, date: '2026-10-10' })];
const history = [{ date: '2026-10-10', devise_from: 'CHF', devise_to: 'CFA', rate: 700, source: 'https://example.test/reference' }];

test('uses the exact dated TFX reference after reconciliation, without mutating records', () => {
  const before = JSON.stringify({ summary, rows, history });
  expect(incomeReferenceEstimate(summary, rows, history)).toMatchObject({ cfa: 7000, knownCfa: 5600, count: 1,
    references: [{ rate: 700, fromHistory: true, reference: 'B', chf: 2 }] });
  expect(JSON.stringify({ summary, rows, history })).toBe(before);
});

test.each([
  [{ ...summary, incomeCount: 3 }, rows, history],
  [summary, [rows[0], rows[0]], history],
  [{ ...summary, totalIncome: 11 }, rows, history],
  [{ ...summary, incomeSubtotal: { cfa: 5601 } }, rows, history],
  [{ ...summary, incomeMissingCfa: 2 }, rows, history],
  [{ ...summary, incomeMissingChf: 1 }, rows, history],
  [summary, [rows[0], { ...rows[1], montant_chf: null, montant: 2, currency: 'USD' }], history],
  [summary, [rows[0], { ...rows[1], fournisseur: 'Ria' }], history],
  [summary, rows, []],
  [summary, rows, [...history, { ...history[0], rate: 701 }]]
])('does not invent a full estimate for incomplete, conflicting or operator data %#', (s, r, h) => {
  expect(incomeReferenceEstimate(s, r, h)).toBeNull();
});

test('uses the existing dated public observation only when no exact TFX reference exists', () => {
  const result = incomeReferenceEstimate(summary, [rows[0], { ...rows[1], date: '2026-09-04' }]);
  expect(result.references[0]).toMatchObject({ fromHistory: false, date: '2026-09-04', chfPerEur: 0.9405 });
  expect(result.cfa).toBeCloseTo(5600 + 2 * 655.957 / 0.9405);
});

test('accepts the existing raw TFX API aliases and BigQuery date values', () => {
  expect(incomeReferenceEstimate(summary, rows, [{ date_taux: { value: '2026-10-10' }, taux: 700,
    devise_base: 'CHF', devise_cible: 'XOF', source_taux: 'https://example.test/raw' }])).toMatchObject({ cfa: 7000,
      references: [{ fromHistory: true, source: 'https://example.test/raw' }] });
});
