import { expenseReferenceValuation } from './expenseReferenceValuation';

const amount = value => {
  if (!['number', 'string'].includes(typeof value) || String(value).trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

// A display-only estimate requires a complete extract reconciled to the global summary.
export function incomeReferenceEstimate(summary, rows, history = []) {
  if (!summary?.incomeSubtotal || !Array.isArray(rows) || rows.length !== summary.incomeCount
    || summary.incomeMissingChf !== 0 || !(summary.incomeMissingCfa > 0)) return null;
  const ids = rows.map(row => String(row.id || row.source_id || row.ref || row.reference || '').trim());
  if (ids.some(id => !id) || new Set(ids).size !== ids.length) return null;
  const normalized = rows.map(row => {
    const rawDate = row.date_document || row.date_created || row.created_at || row.date;
    const currency = String(row.devise_origine || row.devise || row.currency || 'CHF').toUpperCase();
    return { ...row, date: String(rawDate?.value || rawDate || '').slice(0, 10),
      montantChf: amount(row.montant_chf ?? row.amount_chf ?? (currency === 'CHF' ? row.montant : null)),
      montantCfa: amount(row.montant_cfa ?? row.amount_cfa),
      hasExplicitTauxFx: amount(row.taux_fx_applique ?? row.taux_fx ?? row.taux ?? row.fx_rate) > 0 };
  });
  if (normalized.some(row => row.montantChf === null)) return null;
  const missing = normalized.filter(row => row.montantCfa === null);
  const known = normalized.filter(row => row.montantCfa !== null).reduce((sum, row) => sum + row.montantCfa, 0);
  const chf = normalized.reduce((sum, row) => sum + row.montantChf, 0);
  if (missing.length !== summary.incomeMissingCfa || !Number.isFinite(summary.totalIncome)
    || !Number.isFinite(summary.incomeSubtotal.cfa)
    || Math.abs(chf - summary.totalIncome) > 0.005 || Math.abs(known - summary.incomeSubtotal.cfa) > 0.005) return null;
  const datedHistory = (Array.isArray(history) ? history : []).map(row => {
    const rawDate = row.date_taux || row.date_updated || row.date;
    return { ...row, date: String(rawDate?.value || rawDate || '').slice(0, 10), rate: row.taux ?? row.rate,
      devise_from: row.devise_base || row.source_currency || row.devise_from,
      devise_to: row.devise_cible || row.target_currency || row.devise_to, source: row.source_taux || row.source };
  });
  const references = missing.map(row => {
    const valuation = expenseReferenceValuation({ ...row, montantChfAvailable: true, montantCfaAvailable: false }, datedHistory);
    return valuation ? { ...valuation, reference: row.ref || row.reference || row.source_id || row.id || '', chf: row.montantChf } : null;
  });
  if (references.some(row => !row)) return null;
  const cfa = known + references.reduce((sum, row) => sum + row.equivalent, 0);
  return Number.isFinite(cfa) ? { cfa, knownCfa: known, count: references.length, references } : null;
}

export const incomeEstimateCopy = language => ({
  FR: { label: 'Recettes · CFA indicatifs', status: 'Indicatif', source: 'CFA enregistrés + références datées ; hors total comptable', details: 'Compléments CFA indicatifs des recettes', known: 'CFA déjà enregistrés', estimate: 'Total CFA avec références indicatives', rate: 'Taux CHF → CFA', excluded: 'Présentation uniquement : aucune écriture ni taux de reçu modifié.' },
  EN: { label: 'Income · indicative CFA', status: 'Indicative', source: 'Recorded CFA + dated references; not a ledger total', details: 'Indicative income CFA equivalents', known: 'CFA already recorded', estimate: 'CFA total including indicative references', rate: 'CHF → CFA rate', excluded: 'Display only: no ledger entry or receipt rate changed.' },
  DE: { label: 'Einnahmen · indikative CFA', status: 'Indikativ', source: 'Erfasste CFA + datierte Referenzen; keine Buchsumme', details: 'Indikative CFA-Gegenwerte der Einnahmen', known: 'Bereits erfasste CFA', estimate: 'CFA-Summe einschließlich indikativer Referenzen', rate: 'CHF → CFA-Kurs', excluded: 'Nur Anzeige: keine Buchung oder Belegkurse geändert.' }
}[language] || incomeEstimateCopy('FR'));
