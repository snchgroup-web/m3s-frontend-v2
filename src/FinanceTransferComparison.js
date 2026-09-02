import React, { useEffect, useState } from 'react';
import { ArrowDownUp, ExternalLink, Info } from 'lucide-react';
import { compareTransferQuotes, TRANSFER_PROVIDERS, TRANSFER_QUOTE_MAX_AGE_MS } from './financeTransferQuotes';

const COPY = {
  FR: {
    title: 'Comparer les transferts', corridor: 'Suisse → Sénégal · CHF / CFA (XOF)',
    scope: 'Devis saisis · Aucun tarif en direct · Brouillon temporaire',
    payout: 'Réception', payment: 'Paiement', promotion: 'Tarif',
    payouts: ['Guichet / espèces', 'Wave', 'Orange Money', 'Free Money', 'Compte bancaire'],
    payments: ['Carte de débit', 'Carte de crédit', 'Virement bancaire', 'Espèces'], promotions: ['Habituel / récurrent', 'Premier transfert'],
    source: 'Devis officiel', total: 'Total débité, frais inclus (CHF)', fees: 'Dont frais facturés (CHF)', net: 'Net reçu, déductions incluses (CFA)',
    date: 'Devis consulté le', delay: 'Délai annoncé', effective: 'Taux effectif net',
    verified: 'Ce devis correspond aux conditions ci-dessus ; disponibilité, frais tiers / retrait et promotion vérifiés.',
    incomplete: 'Montants à compléter ou incohérents.', dateError: 'Date et heure valides requises, non futures.', stale: 'Devis de plus de 60 min : à reconsulter.',
    unverified: 'Conditions à vérifier.', ready: 'Devis comparable', pending: 'Comparaison en attente de deux devis vérifiés.',
    budget: 'Budgets différents : aucun classement.', equal: 'Même net reçu pour le même total débité.', best: 'Net le plus élevé parmi ces deux devis', gain: 'Écart',
    caveat: 'Comparaison ponctuelle, pas une recommandation de prestataire. Taux, frais et délais restent à confirmer avant tout envoi.',
    method: 'Sources et conditions', sourceDate: 'Pages officielles consultées le 03.09.2026.',
    conditions: 'Guichet, compte bancaire et portefeuille mobile sont annoncés par les deux prestataires. Le réseau exact et le mode de paiement doivent être disponibles pour le devis Suisse → Sénégal. Les frais de retrait et les taxes éventuelles font partie du net reçu.',
    freshness: 'Seuil de fraîcheur interne : 60 min maximum, sans garantie de validité tarifaire. Un tarif de premier transfert peut être inapplicable à un envoi récurrent. Aucun transfert ni enregistrement comptable depuis cet outil.',
    cash: 'Guichet : identité, horaires et déplacement à vérifier.', mobile: 'Mobile : opérateur, compte éligible, plafonds et frais de retrait à vérifier.'
  },
  EN: {
    title: 'Compare transfers', corridor: 'Switzerland → Senegal · CHF / CFA (XOF)', scope: 'Entered quotes · No live prices · Temporary draft',
    payout: 'Receive via', payment: 'Pay with', promotion: 'Pricing', payouts: ['Cash pickup', 'Wave', 'Orange Money', 'Free Money', 'Bank account'],
    payments: ['Debit card', 'Credit card', 'Bank transfer', 'Cash'], promotions: ['Regular / recurring', 'First transfer'],
    source: 'Official quote', total: 'Total charged, fees included (CHF)', fees: 'Of which charged fees (CHF)', net: 'Net received, deductions included (CFA)',
    date: 'Quote viewed at', delay: 'Quoted delivery time', effective: 'Effective net rate',
    verified: 'This quote matches the conditions above; availability, third-party / withdrawal fees and promotion checked.',
    incomplete: 'Incomplete or inconsistent amounts.', dateError: 'A valid, non-future date and time are required.', stale: 'Quote over 60 min old: check again.',
    unverified: 'Conditions not verified.', ready: 'Comparable quote', pending: 'Awaiting two verified quotes.', budget: 'Different budgets: no ranking.',
    equal: 'Same net received for the same total charged.', best: 'Highest net amount among these two quotes', gain: 'Difference',
    caveat: 'Point-in-time comparison, not a provider recommendation. Confirm rates, fees and delivery time before any transfer.',
    method: 'Sources and conditions', sourceDate: 'Official pages consulted on 03 Sep 2026.',
    conditions: 'Both providers advertise cash pickup, bank accounts and mobile wallets. The exact network and payment method must be available for the Switzerland → Senegal quote. Net received includes any withdrawal charges and taxes.',
    freshness: 'Internal freshness limit: 60 min, not a guarantee of price validity. First-transfer pricing may not apply to recurring transfers. No money transfer or accounting entry from this tool.',
    cash: 'Cash pickup: check identification, opening hours and travel.', mobile: 'Mobile: check operator, eligible account, limits and withdrawal fees.'
  },
  DE: {
    title: 'Überweisungen vergleichen', corridor: 'Schweiz → Senegal · CHF / CFA (XOF)', scope: 'Erfasste Angebote · Keine Live-Preise · Temporärer Entwurf',
    payout: 'Empfang', payment: 'Zahlungsart', promotion: 'Tarif', payouts: ['Bargeldabholung', 'Wave', 'Orange Money', 'Free Money', 'Bankkonto'],
    payments: ['Debitkarte', 'Kreditkarte', 'Banküberweisung', 'Bargeld'], promotions: ['Regulär / wiederkehrend', 'Erste Überweisung'],
    source: 'Offizielles Angebot', total: 'Gesamtbelastung inkl. Gebühren (CHF)', fees: 'Davon berechnete Gebühren (CHF)', net: 'Nettoempfang inkl. Abzüge (CFA)',
    date: 'Angebot abgerufen am', delay: 'Angegebene Dauer', effective: 'Effektiver Nettokurs',
    verified: 'Dieses Angebot entspricht den obigen Bedingungen; Verfügbarkeit, Dritt- / Abhebegebühren und Aktion geprüft.',
    incomplete: 'Beträge unvollständig oder widersprüchlich.', dateError: 'Gültiges Datum mit Uhrzeit erforderlich, nicht in der Zukunft.', stale: 'Angebot älter als 60 Min.: erneut prüfen.',
    unverified: 'Bedingungen noch ungeprüft.', ready: 'Vergleichbares Angebot', pending: 'Zwei geprüfte Angebote ausstehend.', budget: 'Unterschiedliche Budgets: keine Rangfolge.',
    equal: 'Gleicher Nettoempfang bei gleicher Gesamtbelastung.', best: 'Höchster Nettoempfang dieser zwei Angebote', gain: 'Differenz',
    caveat: 'Momentaufnahme, keine Anbieterempfehlung. Kurse, Gebühren und Dauer vor jeder Überweisung bestätigen.',
    method: 'Quellen und Bedingungen', sourceDate: 'Offizielle Seiten am 03.09.2026 eingesehen.',
    conditions: 'Beide Anbieter nennen Bargeldabholung, Bankkonten und mobile Geldbörsen. Das konkrete Netz und die Zahlungsart müssen für das Angebot Schweiz → Senegal verfügbar sein. Der Nettoempfang berücksichtigt Abhebegebühren und mögliche Steuern.',
    freshness: 'Interne Aktualitätsgrenze: 60 Min., keine Preisgarantie. Tarife für Erstüberweisungen gelten möglicherweise nicht für wiederkehrende Zahlungen. Keine Überweisung oder Buchung aus diesem Werkzeug.',
    cash: 'Bargeld: Ausweis, Öffnungszeiten und Anfahrt prüfen.', mobile: 'Mobil: Betreiber, Konto, Limits und Abhebegebühren prüfen.'
  }
};
const PAYOUTS = ['cash', 'wave', 'orange', 'free', 'bank'];
const PAYMENTS = ['debit', 'credit', 'bank', 'cash'];

export default function FinanceTransferComparison({ language, value, onChange }) {
  const t = COPY[language] || COPY.FR;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const clock = Date.now();
    const deadlines = value.quotes.map(quote => new Date(quote.observedAt).getTime()).filter(time => time <= clock).map(time => time + TRANSFER_QUOTE_MAX_AGE_MS + 1).filter(deadline => deadline > clock);
    if (!deadlines.length) return undefined;
    const timer = setTimeout(() => setNow(Date.now()), Math.min(...deadlines) - Date.now());
    return () => clearTimeout(timer);
  }, [value.quotes, now]);
  const result = compareTransferQuotes(value, Math.max(now, Date.now()));
  const format = (number, decimals = 2) => number.toLocaleString(language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-CH' : 'fr-CH', { maximumFractionDigits: decimals });
  const update = (id, key, next) => onChange(current => ({ ...current, quotes: current.quotes.map(quote => quote.id !== id ? quote : { ...quote, [key]: next, ...(key !== 'verified' ? { verified: false } : {}) }) }));
  const scenario = (key, next) => onChange(current => ({ ...current, [key]: next, quotes: current.quotes.map(quote => ({ ...quote, verified: false })) }));
  const select = (key, options, labels) => <label>{t[key]}<select aria-label={t[key]} value={value[key]} onChange={event => scenario(key, event.target.value)}>{options.map((option, i) => <option key={option} value={option}>{labels[i]}</option>)}</select></label>;
  return <section id="finance-transfer-comparison" className="m3s-transfer-comparison" aria-labelledby="transfer-comparison-title" tabIndex={-1}>
    <header><h3 id="transfer-comparison-title"><ArrowDownUp size={20} aria-hidden="true" />{t.title}</h3><p>{t.corridor}</p><small>{t.scope}</small></header>
    <div className="m3s-transfer-scenario">
      {select('payout', PAYOUTS, t.payouts)}{select('payment', PAYMENTS, t.payments)}{select('promotion', ['regular', 'first'], t.promotions)}
    </div>
    <div className="m3s-transfer-quotes">
      {TRANSFER_PROVIDERS.map(provider => {
        const quote = value.quotes.find(item => item.id === provider.id);
        const assessed = result.quotes.find(item => item.id === provider.id);
        return <fieldset key={provider.id}>
          <legend>{provider.name}</legend>
          <a href={provider.url} target="_blank" rel="noopener noreferrer">{t.source}<ExternalLink size={14} aria-hidden="true" /></a>
          {['total', 'fees', 'net'].map(key => <label key={key}>{t[key]}<input type="number" inputMode="decimal" min="0" step="0.01" className={key === 'net' ? 'm3s-transfer-cfa' : 'm3s-transfer-chf'} value={quote[key]} onChange={event => update(provider.id, key, event.target.value)} /></label>)}
          <label>{t.date}<input type="datetime-local" value={quote.observedAt} onChange={event => update(provider.id, 'observedAt', event.target.value)} /></label>
          <label>{t.delay}<input value={quote.delay} maxLength={100} onChange={event => update(provider.id, 'delay', event.target.value)} /></label>
          <label className="m3s-transfer-check"><input type="checkbox" checked={quote.verified} onChange={event => update(provider.id, 'verified', event.target.checked)} />{t.verified}</label>
          <p className="m3s-transfer-quote-status" role="status">{assessed.reason ? t[assessed.reason === 'date' ? 'dateError' : assessed.reason] : t.ready}</p>
          <div className="m3s-transfer-rate">{t.effective}<strong>{assessed.effectiveRate === null ? '—' : format(assessed.effectiveRate, 4)} CFA / CHF</strong></div>
        </fieldset>;
      })}
    </div>
    <div className="m3s-transfer-result" role="status">
      <strong>{result.status === 'ranked' ? `${t.best} : ${TRANSFER_PROVIDERS.find(p => p.id === result.bestId).name}` : t[result.status]}</strong>
      {result.difference !== null && <div className="m3s-currency-cfa">{t.gain} : {format(result.difference)} CFA</div>}
      <p>{t.caveat}</p>
    </div>
    <details><summary><Info size={16} aria-hidden="true" />{t.method}</summary><p>{t.sourceDate}</p><p>{t.conditions}</p><p>{t.cash}</p><p>{t.mobile}</p><p>{t.freshness}</p></details>
  </section>;
}
