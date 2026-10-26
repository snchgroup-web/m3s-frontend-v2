export function capitalizeDateLabel(label, locale) {
  if (typeof label !== 'string' || label.length === 0) return label;
  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}
