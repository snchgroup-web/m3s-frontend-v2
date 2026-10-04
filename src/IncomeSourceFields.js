import React from 'react';
import { normalizeExpenseAmounts } from './financeExpenseAmounts';
import { expenseAmountLabels } from './ExpenseSourceFields';
import { ConversionReferenceField } from './FinanceConversionHelp';

export const incomeAmountLabels = {
  FR: { currency: 'Devise de réception', total_received: 'Total reçu', source: 'Encaissement d’origine', partial: 'Recettes enregistrées ; conversions à compléter.', label: 'Recettes connues · sous-total', invalid: 'Vérifiez le montant reçu et les références des conversions.' },
  EN: { currency: 'Receipt currency', total_received: 'Total received', source: 'Original receipt', partial: 'Income recorded; conversions pending.', label: 'Known income · subtotal', invalid: 'Check the received amount and conversion references.' },
  DE: { currency: 'Empfangswährung', total_received: 'Erhaltener Gesamtbetrag', source: 'Ursprünglicher Zahlungseingang', partial: 'Einnahmen erfasst; Umrechnungen offen.', label: 'Bekannte Einnahmen · Zwischensumme', invalid: 'Erhaltenen Betrag und Umrechnungsreferenzen prüfen.' },
};
export const emptyIncomeAmounts = () => ({ original_currency: 'CHF', total_received: '', equivalent_chf: '', equivalent_cfa: '', conversion_source: '' });
export function normalizeIncomeAmounts(input) {
  const allowed = ['original_currency', 'total_received', 'equivalent_chf', 'equivalent_cfa', 'conversion_source'];
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !allowed.includes(key))) throw new Error('Invalid income fields');
  const result = normalizeExpenseAmounts({ original_currency: input.original_currency, total_paid: input.total_received,
    equivalent_chf: input.equivalent_chf, equivalent_cfa: input.equivalent_cfa, conversion_source: input.conversion_source });
  return { original_currency: result.original_currency, total_received: result.total_paid,
    equivalent_chf: result.equivalent_chf, equivalent_cfa: result.equivalent_cfa,
    conversion_source: result.conversion_source, conversion_status: result.conversion_status };
}

export default function IncomeSourceFields({ value, onChange, language, invalid }) {
  const t = { ...(expenseAmountLabels[language] || expenseAmountLabels.FR), ...(incomeAmountLabels[language] || incomeAmountLabels.FR) };
  const style = 'min-h-11 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white';
  const amount = (name, required = false) => <label className="min-w-0 text-sm text-slate-300" key={name}>
    <span className="mb-1 block">{t[name]}{required ? ' *' : ''}</span>
    <input type="number" min="0" step="any" required={required} value={value[name] ?? ''}
      onChange={event => onChange({ ...value, [name]: event.target.value })} className={style} />
  </label>;
  return <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <label className="text-sm text-slate-300"><span className="mb-1 block">{t.currency}</span>
      <select className={style} value={value.original_currency} onChange={event => onChange({ ...emptyIncomeAmounts(), original_currency: event.target.value })}>
        {['CHF', 'USD', 'EUR', 'XOF'].map(code => <option key={code}>{code}</option>)}
      </select>
    </label>
    {amount('total_received', true)}
    {value.original_currency !== 'CHF' && amount('equivalent_chf')}
    {value.original_currency !== 'XOF' && amount('equivalent_cfa')}
    <ConversionReferenceField label={t.conversion_source} inputClassName={style} value={value.conversion_source} language={language} onChange={conversion_source => onChange({ ...value, conversion_source })} />
    {invalid && <p role="alert" className="text-sm text-amber-300 md:col-span-2">{t.invalid}</p>}
  </fieldset>;
}
