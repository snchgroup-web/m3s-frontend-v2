import React from 'react';
import { AlertTriangle, ChevronDown, Database, LoaderCircle, RefreshCw } from 'lucide-react';
import { formatRegistryDate } from './registryDate';
import { incomeEstimateCopy } from './incomeReferenceEstimate';
import { safeSourceUrl } from './expenseReferenceValuation';

const COPY = {
  FR: {
    available: 'Totaux globaux disponibles', partial: 'Sous-totaux disponibles · conversions à compléter',
    loading: 'Chargement des totaux globaux...', unavailable: 'Totaux globaux indisponibles',
    source: 'Source : BigQuery via /finance/dashboard', read: 'Lecture API',
    income: 'recettes', expenses: 'dépenses', scope: 'Recettes globales et solde : hors flux sociaux.',
    extract: 'extrait chargé pour les tableaux et graphiques', limit: 'maximum 200 par registre',
    extractPartial: 'Extrait partiel : une source d’écritures est indisponible.', extractUnavailable: 'Extrait des écritures indisponible.',
    social: 'Flux sociaux chargés', separate: 'Comptés séparément, exclus des recettes globales et du solde.',
    socialRegister: 'Registre social', socialLoading: 'Chargement en cours', socialUnavailable: 'Indisponible',
    restricted: 'Accès restreint', missing: 'Aucune valeur manquante n’est remplacée par zéro.',
    conversions: 'Contre-valeurs non renseignées', refresh: 'Actualiser recettes, dépenses et flux sociaux'
  },
  DE: {
    available: 'Globale Summen verfügbar', partial: 'Zwischensummen verfügbar · Umrechnungen offen',
    loading: 'Globale Summen werden geladen...', unavailable: 'Globale Summen nicht verfügbar',
    source: 'Quelle: BigQuery über /finance/dashboard', read: 'API-Abfrage',
    income: 'Einnahmen', expenses: 'Ausgaben', scope: 'Globale Einnahmen und Saldo: ohne soziale Flüsse.',
    extract: 'geladener Auszug für Tabellen und Diagramme', limit: 'höchstens 200 pro Register',
    extractPartial: 'Teilauszug: Eine Buchungsquelle ist nicht verfügbar.', extractUnavailable: 'Buchungsauszug nicht verfügbar.',
    social: 'Geladene soziale Flüsse', separate: 'Separat gezählt, nicht in globalen Einnahmen und Saldo enthalten.',
    socialRegister: 'Sozialregister', socialLoading: 'Wird geladen', socialUnavailable: 'Nicht verfügbar',
    restricted: 'Eingeschränkter Zugriff', missing: 'Fehlende Werte werden nie durch Null ersetzt.',
    conversions: 'Fehlende Gegenwerte', refresh: 'Einnahmen, Ausgaben und soziale Flüsse aktualisieren'
  },
  EN: {
    available: 'Global totals available', partial: 'Subtotals available · conversions pending',
    loading: 'Loading global totals...', unavailable: 'Global totals unavailable',
    source: 'Source: BigQuery via /finance/dashboard', read: 'API read',
    income: 'income records', expenses: 'expense records', scope: 'Global revenue and balance: excluding social flows.',
    extract: 'loaded extract for tables and charts', limit: 'maximum 200 per register',
    extractPartial: 'Partial extract: an entry source is unavailable.', extractUnavailable: 'Entry extract unavailable.',
    social: 'Loaded social flows', separate: 'Counted separately, excluded from global revenue and balance.',
    socialRegister: 'Social register', socialLoading: 'Loading', socialUnavailable: 'Unavailable',
    restricted: 'Restricted access', missing: 'Missing values are never replaced with zero.',
    conversions: 'Missing currency equivalents', refresh: 'Refresh income, expenses and social flows'
  }
};

export function formatFinanceReadTime(value, language = 'FR') {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  const day = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  const locale = { FR: 'fr-FR', DE: 'de-CH', EN: 'en-GB' }[language] || 'fr-FR';
  return `${formatRegistryDate(day, language)} ${new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date)}`;
}

export default function FinanceReadStatus({ language = 'FR', summary, status, incomeLoaded, expenseLoaded,
  socialLoaded, socialState = 'available', onRefresh, refreshing = false, incomeEstimate = null }) {
  const t = COPY[language] || COPY.FR;
  const current = status === 'available' ? summary : null;
  const partial = current?.expenseSubtotal || current?.incomeSubtotal;
  const reading = refreshing || status === 'loading';
  const Icon = reading ? LoaderCircle : current && !partial ? Database : AlertTriangle;
  const readTime = formatFinanceReadTime(current?.timestamp, language);
  const locale = { FR: 'fr-CH', DE: 'de-CH', EN: 'en-GB' }[language] || 'fr-CH';
  const count = value => Number.isSafeInteger(value) && value >= 0 ? value.toLocaleString(locale) : '—';
  const incomeAvailable = Number.isSafeInteger(incomeLoaded) && incomeLoaded >= 0;
  const expensesAvailable = Number.isSafeInteger(expenseLoaded) && expenseLoaded >= 0;
  const socialMessage = socialState === 'forbidden' || socialState === 'restricted'
    ? `${t.socialRegister} : ${t.restricted}`
    : socialState === 'loading'
      ? `${t.socialRegister} : ${t.socialLoading}`
      : socialState !== 'available' || !Number.isSafeInteger(socialLoaded) || socialLoaded < 0
        ? `${t.socialRegister} : ${t.socialUnavailable}`
        : `${t.social} : ${count(socialLoaded)}`;
  return (
    <section className="m3s-design-scope mb-4 flex items-start gap-3 border-l-2 px-3 py-2" aria-busy={reading}
      style={{ borderColor: current && !partial ? 'var(--m3s-status-info)' : 'var(--m3s-status-warning)', color: 'var(--m3s-text-primary)' }}>
      <div role="status" data-testid="finance-source-status" className="min-w-0 flex-1 text-sm leading-6">
        <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold focus-visible:outline focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
          <Icon size={20} className={`shrink-0 ${reading ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span className="min-w-0 flex-1">{reading ? t.loading : current ? partial ? t.partial : t.available : t.unavailable}</span>
          <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-1 pb-2 pt-2">
        <p>{current ? `${count(current.incomeCount)} ${t.income} · ${count(current.expenseCount)} ${t.expenses} · ` : ''}{t.source}</p>
        <p>{t.scope}</p>
        <p>{t.read} : {readTime ? <time className="whitespace-nowrap" dateTime={current.timestamp}>{readTime}</time> : '—'}</p>
        {!reading && <>
          <p>{count(incomeLoaded)} {t.income} · {count(expenseLoaded)} {t.expenses} · {t.extract} ({t.limit}).</p>
          {(!incomeAvailable || !expensesAvailable) && <p>{incomeAvailable || expensesAvailable ? t.extractPartial : t.extractUnavailable}</p>}
          <p>{socialMessage} · {t.limit}. {t.separate}</p>
          {!current && <p>{t.missing}</p>}
          {current?.expenseSubtotal && <p>{t.conversions} · {t.expenses} : CHF {count(current.expensesMissingChf)} · CFA {count(current.expensesMissingCfa)}</p>}
          {current?.incomeSubtotal && <p>{t.conversions} · {t.income} : CHF {count(current.incomeMissingChf)} · CFA {count(current.incomeMissingCfa)}</p>}
          {current && incomeEstimate && <div className="mt-3 border-t pt-3" style={{ borderColor: 'var(--m3s-border)' }}>
            <p className="font-semibold">{incomeEstimateCopy(language).details}</p>
            <p>{incomeEstimateCopy(language).known} : {incomeEstimate.knownCfa.toLocaleString(locale, { maximumFractionDigits: 2 })} CFA</p>
            <p>{incomeEstimateCopy(language).estimate} : ≈ {incomeEstimate.cfa.toLocaleString(locale, { maximumFractionDigits: 2 })} CFA</p>
            <p>{incomeEstimateCopy(language).excluded}</p>
            <ul className="mt-2 space-y-2">{incomeEstimate.references.map((row, index) => <li key={index}>
              <span className="font-mono">{row.reference}</span> · <time className="whitespace-nowrap" dateTime={row.date}>{formatRegistryDate(row.date, language)}</time> · {row.chf.toLocaleString(locale)} CHF · {incomeEstimateCopy(language).rate} {row.rate.toLocaleString(locale, { maximumFractionDigits: 4 })}
              {safeSourceUrl(row.source) ? <a className="ml-2 break-all underline" href={safeSourceUrl(row.source)} target="_blank" rel="noopener noreferrer">{row.fromHistory ? 'TFX' : 'BCE / ECB'}</a> : <span className="ml-2">{row.source}</span>}
              {safeSourceUrl(row.paritySource) && <a className="ml-2 underline" href={safeSourceUrl(row.paritySource)} target="_blank" rel="noopener noreferrer">BCEAO</a>}
            </li>)}</ul>
          </div>}
        </>}
        </div>
        </details>
      </div>
      <button type="button" className="m3s-raised flex h-11 w-11 shrink-0 items-center justify-center rounded border focus-visible:outline focus-visible:outline-2 disabled:opacity-50"
        title={t.refresh} aria-label={t.refresh} disabled={reading} onClick={onRefresh}>
        <RefreshCw size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
