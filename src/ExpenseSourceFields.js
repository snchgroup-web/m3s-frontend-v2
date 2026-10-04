import React from 'react';
import { ConversionReferenceField } from './FinanceConversionHelp';

export const expenseAmountLabels = {
  FR: { currency: 'Devise du paiement', total_paid: 'Total payé', principal: 'Montant hors frais', fees: 'Frais', recipient_amount: 'Montant remis au bénéficiaire', recipient_currency: 'Devise reçue', equivalent_chf: 'Contre-valeur CHF documentée', equivalent_cfa: 'Contre-valeur CFA documentée', conversion_source: 'Référence de conversion', invalid: 'Vérifiez les montants : total = montant hors frais + frais ; toute conversion doit avoir une référence.', partial: 'Paiements enregistrés ; conversions à compléter. Les sous-totaux excluent les contre-valeurs manquantes.', source: 'Paiement d’origine' },
  EN: { currency: 'Payment currency', total_paid: 'Total paid', principal: 'Amount excluding fees', fees: 'Fees', recipient_amount: 'Amount delivered to recipient', recipient_currency: 'Received currency', equivalent_chf: 'Documented CHF equivalent', equivalent_cfa: 'Documented CFA equivalent', conversion_source: 'Conversion reference', invalid: 'Check amounts: total = principal + fees; each conversion requires a reference.', partial: 'Payments recorded; conversions pending. Subtotals exclude missing currency equivalents.', source: 'Original payment' },
  DE: { currency: 'Zahlungswährung', total_paid: 'Bezahlter Gesamtbetrag', principal: 'Betrag ohne Gebühren', fees: 'Gebühren', recipient_amount: 'Ausgezahlter Empfängerbetrag', recipient_currency: 'Empfangswährung', equivalent_chf: 'Belegter CHF-Gegenwert', equivalent_cfa: 'Belegter CFA-Gegenwert', conversion_source: 'Umrechnungsreferenz', invalid: 'Beträge prüfen: Gesamtbetrag = Betrag ohne Gebühren + Gebühren; jede Umrechnung benötigt eine Referenz.', partial: 'Zahlungen erfasst; Umrechnungen offen. Zwischensummen enthalten keine fehlenden Gegenwerte.', source: 'Ursprüngliche Zahlung' },
};
export const emptySourceAmounts = () => ({ original_currency: 'CHF', total_paid: '', principal: '', fees: '', recipient_currency: '', recipient_amount: '', equivalent_chf: '', equivalent_cfa: '', conversion_source: '' });

export default function ExpenseSourceFields({ value, onChange, language, invalid }) {
  const t = expenseAmountLabels[language] || expenseAmountLabels.FR;
  const style = 'min-h-11 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white';
  const amount = (name, required = false) => <label className="min-w-0 text-sm text-slate-300" key={name}>
    <span className="mb-1 block">{t[name]}{required ? ' *' : ''}</span>
    <input type="number" min="0" step="any" required={required} value={value[name] ?? ''} onChange={event => onChange({ ...value, [name]: event.target.value })} className={style} />
  </label>;
  return <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <label className="text-sm text-slate-300"><span className="mb-1 block">{t.currency}</span>
      <select className={style} value={value.original_currency} onChange={event => onChange({ ...emptySourceAmounts(), original_currency: event.target.value })}>
        {['CHF', 'USD', 'EUR', 'XOF'].map(code => <option key={code}>{code}</option>)}
      </select>
    </label>
    {amount('total_paid', true)}{amount('principal')}{amount('fees')}
    <label className="text-sm text-slate-300"><span className="mb-1 block">{t.recipient_currency}</span>
      <select className={style} value={value.recipient_currency || ''} onChange={event => onChange({ ...value, recipient_currency: event.target.value, recipient_amount: '' })}>
        <option value="">—</option>{['XOF', 'CHF', 'USD', 'EUR'].map(code => <option key={code}>{code}</option>)}
      </select>
    </label>
    {amount('recipient_amount')}
    {value.original_currency !== 'CHF' && amount('equivalent_chf')}
    {value.original_currency !== 'XOF' && amount('equivalent_cfa')}
    <ConversionReferenceField label={t.conversion_source} inputClassName={style} value={value.conversion_source} language={language} onChange={conversion_source => onChange({ ...value, conversion_source })} />
    {invalid && <p role="alert" className="text-sm text-amber-300 md:col-span-2">{t.invalid}</p>}
  </fieldset>;
}
