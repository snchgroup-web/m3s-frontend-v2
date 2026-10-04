import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import TableControls from './TableControls';
import ExpenseProofs from './ExpenseProofs';

const text = {
  FR: {
    title: 'Dépenses classées sociales',
    scope: 'Extrait du registre Dépenses · maximum 200 lignes chargées. Ces opérations ne sont pas ajoutées aux recettes historiques ci-dessous.',
    qualification: 'Classement du registre, pas confirmation de remise aux bénéficiaires. Un transfert mixte doit être ventilé avant de déterminer sa part sociale.',
    historical: 'Recettes sociales historiques · registre distinct',
    pending: 'Transferts à ventiler · hors montants sociaux confirmés',
    empty: 'Aucune dépense classée sociale dans cet extrait.',
    loading: 'Lecture du registre Dépenses…',
    unavailable: 'Registre Dépenses indisponible. Aucun montant de substitution.',
    ref: 'Référence', date: 'Date', description: 'Description', chf: 'Montant CHF', cfa: 'Montant CFA enregistré',
    proof: 'Justificatifs', open: 'Ouvrir le registre Dépenses'
  },
  EN: {
    title: 'Expenses classified as social',
    scope: 'Expense register extract · up to 200 loaded rows. These transactions are not added to the historical income below.',
    qualification: 'Register classification, not confirmation of delivery to recipients. A mixed transfer must be allocated before its social share can be determined.',
    historical: 'Historical social income · separate register',
    pending: 'Transfers awaiting allocation · excluded from confirmed social amounts',
    empty: 'No expense classified as social in this extract.',
    loading: 'Loading the expense register…',
    unavailable: 'Expense register unavailable. No substitute amounts.',
    ref: 'Reference', date: 'Date', description: 'Description', chf: 'CHF amount', cfa: 'Recorded CFA amount',
    proof: 'Supporting documents', open: 'Open the expense register'
  },
  DE: {
    title: 'Als sozial eingestufte Ausgaben',
    scope: 'Auszug aus dem Ausgabenregister · höchstens 200 geladene Zeilen. Diese Vorgänge werden nicht zu den historischen Einnahmen unten addiert.',
    qualification: 'Einstufung im Register, keine Bestätigung der Übergabe an Empfänger. Eine gemischte Überweisung muss vor der Ermittlung ihres sozialen Anteils aufgeteilt werden.',
    historical: 'Historische soziale Einnahmen · getrenntes Register',
    pending: 'Noch aufzuteilende Überweisungen · nicht in bestätigten Sozialbeträgen enthalten',
    empty: 'Keine als sozial eingestufte Ausgabe in diesem Auszug.',
    loading: 'Ausgabenregister wird geladen…',
    unavailable: 'Ausgabenregister nicht verfügbar. Keine Ersatzbeträge.',
    ref: 'Referenz', date: 'Datum', description: 'Beschreibung', chf: 'Betrag CHF', cfa: 'Erfasster Betrag CFA',
    proof: 'Belege', open: 'Ausgabenregister öffnen'
  }
};

const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
const socialCategories = new Set(['social', 'aide sociale', 'aide sociale menage']);

const isPendingTransfer = row =>
  /\b(ria|wu|western union)\b/.test(normalize(`${row.description} ${row.fournisseur}`)) &&
  /ventilation a completer/.test(normalize(row.description));

export const selectSocialExpenses = rows => (Array.isArray(rows) ? rows : []).filter(row =>
  socialCategories.has(normalize(row.categorie)) && !isPendingTransfer(row)
);

export const selectPendingSocialTransfers = rows => (Array.isArray(rows) ? rows : []).filter(isPendingTransfer);

export const socialHistoricalLabel = language => (text[language] || text.FR).historical;

export default function FinanceSocialExpenses({ rows, status, language, formatDate, formatAmount, onOpenExpenses }) {
  const t = text[language] || text.FR;
  const social = selectSocialExpenses(rows);
  const pending = selectPendingSocialTransfers(rows);
  const renderTable = visibleRows => (
    <table className="min-w-[960px] w-full text-sm">
      <thead className="sticky top-0 z-10 bg-slate-700">
        <tr>{[t.ref, t.date, t.description, t.chf, t.cfa, t.proof].map(label =>
          <th key={label} className="px-4 py-3 text-left text-white">{label}</th>
        )}</tr>
      </thead>
      <tbody>{visibleRows.map(row => (
        <tr key={row.id} className="border-t border-slate-700">
          <td className="px-4 py-3 text-slate-400">{row.ref || '—'}</td>
          <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatDate(row.date)}</td>
          <td className="px-4 py-3 text-slate-300">{row.description}</td>
          <td className="px-4 py-3 text-red-400">{row.montantChfAvailable ? formatAmount(row.montantChf) : '—'}</td>
          <td className="px-4 py-3 text-red-300">{row.montantCfaAvailable ? formatAmount(row.montantCfa) : '—'}</td>
          <td className="px-4 py-3"><ExpenseProofs expense={row} /></td>
        </tr>
      ))}</tbody>
    </table>
  );
  return (
    <section aria-label={t.title} className="space-y-3 border-b border-slate-700 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-bold text-white">{t.title}</h4>
        <button type="button" onClick={onOpenExpenses} className="inline-flex min-h-11 items-center gap-2 text-sm text-blue-400">
          <ArrowUpRight size={18} aria-hidden="true" />{t.open}
        </button>
      </div>
      <p className="text-sm text-slate-400">{t.scope}</p>
      <p className="text-sm text-slate-400">{t.qualification}</p>
      {status !== 'available' ? <p role="status" className="text-sm text-slate-300">{status === 'loading' ? t.loading : t.unavailable}</p> : <>
        <TableControls rows={social} renderTable={renderTable} renderEmpty={() => <p className="p-4 text-sm text-slate-400">{t.empty}</p>} />
        {pending.length > 0 && <section aria-label={t.pending} className="space-y-3 pt-3">
          <h5 className="text-sm font-semibold text-amber-300">{t.pending}</h5>
          <TableControls rows={pending} renderTable={renderTable} />
        </section>}
      </>}
    </section>
  );
}
