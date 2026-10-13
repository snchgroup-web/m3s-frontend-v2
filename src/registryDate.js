const STYLES = {
  FR: { locale: 'fr-FR', separator: '-' },
  DE: { locale: 'de-CH', separator: '.' },
  EN: { locale: 'en-GB', separator: '/' }
};
const formatters = Object.fromEntries(Object.entries(STYLES).map(([language, style]) => [language,
  new Intl.DateTimeFormat(style.locale, { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: '2-digit' })
]));

export function formatRegistryDate(value, language = 'FR') {
  const iso = typeof value === 'string' ? value : value?.value;
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '\u2014';
  const date = new Date(`${iso}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== iso) return '\u2014';
  const key = Object.hasOwn(STYLES, language) ? language : 'FR';
  return formatters[key].formatToParts(date).map(part => part.type === 'literal' ? STYLES[key].separator : part.value).join('');
}
