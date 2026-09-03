import { createBudget, isBudgetValid, parseBudgetAmount, parseBudgetFile, parseBudgetRate, serializeBudget, summarizeBudget, summarizeBudgetRow } from './financeBudgetModel';
const valid = () => ({ ...createBudget(2026), title: 'QA budget', entity: 'QA organisation',
  rows: [{ id: 'qa-row', label: 'QA expense', currency: 'CHF', direction: 'out', kind: 'operating', months: Array(12).fill('') }] });
test.each(['', ' ', '\t'])('blank %j stays unknown', value => expect(parseBudgetAmount(value)).toEqual({ state: 'empty', cents: null }));
test.each([['0', 0], ['0.00', 0], ['0,10', 10], ['0.20', 20], ['1000000000', 100000000000]])('amount %s retains integer cents', (value, cents) => expect(parseBudgetAmount(value)).toEqual({ state: 'valid', cents }));
test.each(['-1', 'Infinity', '1e3', '12oops', '1.234', '0x10', '1000000001', true, null])('reject invalid amount %s', value => expect(parseBudgetAmount(value).state).toBe('invalid'));
test.each(['', '0', '-1', '710oops', 'Infinity', '1e3', '1000001', '0.0000001'])('reject invalid rate %s', value => expect(parseBudgetRate(value)).toBeNull());
test('decimal budget rate is independent from any live reference', () => expect(parseBudgetRate('710,123456')).toBe(710.123456));
test('subtotals expose completion and preserve exact cents', () => {
  const d = valid(); d.rows[0].months[0] = '0.10'; d.rows[0].months[1] = '0.20';
  expect(summarizeBudgetRow(d.rows[0])).toEqual({ cents: 30, filled: 2, invalid: 0 });
  expect(summarizeBudget(d)[0].out).toEqual({ cents: 30, filled: 2, expected: 12, invalid: 0 });
  d.rows[0].months[2] = 'oops'; expect(summarizeBudget(d)[0].out.cents).toBeNull();
});
test('true zero, missing, currencies and flow directions remain distinct', () => {
  const d = valid(); expect(summarizeBudget(d)[0].out.cents).toBeNull();
  d.rows[0].months[0] = '0';
  d.rows.push({ ...d.rows[0], id: 'cfa', currency: 'CFA', direction: 'in', months: Array(12).fill('70000') });
  const sums = summarizeBudget(d);
  expect(sums[0].out.cents).toBe(0); expect(sums[0].in.cents).toBeNull();
  expect(sums[1].in.cents).toBe(84000000); expect(sums[1].out.cents).toBeNull();
});
test('maximal supported grid stays below integer overflow', () => {
  const d = valid(); d.rows = Array.from({ length: 100 }, (_, i) => ({ ...d.rows[0], id: 'row-'+i, months: Array(12).fill('1000000000') }));
  expect(isBudgetValid(d)).toBe(true); expect(Number.isSafeInteger(summarizeBudget(d)[0].out.cents)).toBe(true);
});
test('export round trip is a versioned organisation draft, never an approval', () => {
  const d = valid(); d.rows[0].months[0] = '0';
  const out = serializeBudget(d, new Date('2026-09-03T12:00:00Z'));
  expect(JSON.parse(out.text)).toMatchObject({ schema: 'm3s-budget-draft', version: 1, status: 'draft', scope: 'organization' });
  expect(out.draft.revision).toBe(1); expect(d.revision).toBe(0); expect(parseBudgetFile(out.text)).toEqual(out.draft);
});
test.each([
  d => { d.title = ''; }, d => { d.entity = ''; }, d => { d.year = 2026; }, d => { d.year = '1999'; },
  d => { d.rows[0].months = ['1']; }, d => { d.rows[0].months[0] = true; }, d => { d.rows[0].months[0] = '1e3'; },
  d => { d.rows.push({ ...d.rows[0] }); }, d => { d.rows[0].currency = 'EUR'; }, d => { d.rows[0].direction = 'mixed'; },
  d => { d.rows[0].kind = 'personal'; }, d => { d.rate = '710'; }, d => { d.rateSource = 'Orphan source'; },
  d => { d.rate = '710'; d.rateSource = 'QA'; d.rateDate = '2026-02-30'; },
  d => { d.rows = Array.from({ length: 101 }, (_, i) => ({ ...d.rows[0], id: String(i) })); }
])('malformed draft %s cannot be exported or imported', mutate => {
  const d = valid(); mutate(d); expect(isBudgetValid(d)).toBe(false); expect(() => serializeBudget(d)).toThrow();
  expect(() => parseBudgetFile(JSON.stringify({ schema: 'm3s-budget-draft', version: 1, status: 'draft', scope: 'organization', budget: d }))).toThrow();
});
test.each([['scope', 'personal'], ['status', 'approved'], ['version', 2], ['schema', 'other']])('rejects unsupported %s', (key, value) => {
  const file = JSON.parse(serializeBudget(valid()).text); file[key] = value;
  expect(() => parseBudgetFile(JSON.stringify(file))).toThrow();
});
test('imports only whitelisted fields', () => {
  const file = JSON.parse(serializeBudget(valid()).text);
  file.budget.permissions = ['admin']; file.budget.actual = 100; file.budget.rows[0].approved = true;
  const p = parseBudgetFile(JSON.stringify(file)); expect(p.permissions).toBeUndefined(); expect(p.actual).toBeUndefined(); expect(p.rows[0].approved).toBeUndefined();
});
test('documented manual rate survives exports', () => {
  const d = { ...valid(), rate: '710', rateSource: 'QA', rateDate: '2026-09-03' };
  expect(parseBudgetFile(serializeBudget(d).text)).toMatchObject({ rate: '710', rateSource: 'QA', rateDate: '2026-09-03' });
});
test.each(['null', '{}', '{', ' '.repeat(512 * 1024 + 1)])('refuses invalid or excessive file', text => expect(() => parseBudgetFile(text)).toThrow());
