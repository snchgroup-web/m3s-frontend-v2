import { formatRegistryDate } from './registryDate';

test.each([['FR', '08-09-26'], ['DE', '08.09.26'], ['EN', '08/09/26'], ['unknown', '08-09-26']])(
  'calendar dates use the %s display convention', (language, expected) => {
    expect(formatRegistryDate('2026-09-08', language)).toBe(expected);
    expect(formatRegistryDate({ value: '2026-09-08' }, language)).toBe(expected);
  }
);
test.each(['', null, undefined, '2026-02-30', '2025-02-29', '2026-13-01', '2026-09-08T12:00:00Z', '08-09-26'])(
  'invalid or non-calendar input is not fabricated: %s', value => expect(formatRegistryDate(value, 'FR')).toBe('\u2014')
);
test('leap days, month boundaries and ISO source are preserved', () => {
  const source = { value: '2024-02-29' };
  expect(formatRegistryDate(source, 'DE')).toBe('29.02.24');
  expect(source).toEqual({ value: '2024-02-29' });
  expect(formatRegistryDate('2027-01-01', 'FR')).toBe('01-01-27');
  expect(formatRegistryDate('2026-12-31', 'EN')).toBe('31/12/26');
});
