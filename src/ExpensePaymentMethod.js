import React from 'react';

// Translate labels without rewriting persisted legacy values.
const methods = [
  ['Virement bancaire', 'Bank transfer', 'Banküberweisung'],
  ['Carte bancaire', 'Bank card', 'Bankkarte'],
  ['Carte de débit', 'Debit card', 'Debitkarte'],
  ['Carte de crédit', 'Credit card', 'Kreditkarte'],
  ['Mobile Money', 'Mobile money', 'Mobile Money'],
  ['Espèces', 'Cash', 'Bargeld'],
  ['Chèque', 'Cheque', 'Scheck'],
  ['Portefeuille électronique', 'Digital wallet', 'Elektronische Geldbörse'],
  ['Autre', 'Other', 'Andere'],
];
const aliases = { Virement: 'Virement bancaire', Carte: 'Carte bancaire' };
export const paymentMethodLabels = {
  FR: { label: 'Moyen de paiement', missing: 'Non renseigné' },
  EN: { label: 'Payment method', missing: 'Not specified' },
  DE: { label: 'Zahlungsmittel', missing: 'Nicht angegeben' },
};
const labelIndex = language => ({ FR: 0, EN: 1, DE: 2 }[language] ?? 0);
export function paymentMethodLabel(value, language) {
  const t = paymentMethodLabels[language] || paymentMethodLabels.FR;
  if (!value || value === 'Paiement') return t.missing;
  return methods.find(row => row[0] === (aliases[value] || value))?.[labelIndex(language)] || value;
}

export default function ExpensePaymentMethod({ value = '', language, onChange }) {
  const t = paymentMethodLabels[language] || paymentMethodLabels.FR;
  const known = methods.some(row => row[0] === value);
  return <label className="block text-sm text-slate-300">
    {t.label}
    <select value={value} onChange={event => onChange(event.target.value)} className="mt-1 min-h-11 w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
      <option value="">{t.missing}</option>
      {value && !known && <option value={value}>{paymentMethodLabel(value, language)}</option>}
      {methods.map(row => <option key={row[0]} value={row[0]}>{row[labelIndex(language)]}</option>)}
    </select>
  </label>;
}
