import { capitalizeDateLabel } from './dateLabel';

test.each([
  ['fr-CH', 'lun. 26 oct. 2026', 'Lun. 26 oct. 2026'],
  ['fr-CH', 'lundi, 26 octobre 2026', 'Lundi, 26 octobre 2026'],
  ['de-CH', 'Mo., 26. Okt. 2026', 'Mo., 26. Okt. 2026'],
  ['en-GB', 'Monday, 26 October 2026', 'Monday, 26 October 2026'],
  ['fr-CH', '\u00e9ch\u00e9ance 26-10-26', '\u00c9ch\u00e9ance 26-10-26'],
  ['en-GB', '26/10/26', '26/10/26'],
  ['fr-CH', '', '']
])('changes only the initial character of the %s label %s', (locale, label, expected) => {
  expect(capitalizeDateLabel(label, locale)).toBe(expected);
  expect(capitalizeDateLabel(label, locale).slice(1)).toBe(label.slice(1));
});

test.each([null, undefined])('preserves an absent label without inventing a date: %s', label => {
  expect(capitalizeDateLabel(label, 'fr-CH')).toBe(label);
});
