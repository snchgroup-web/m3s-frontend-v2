import React from 'react';
import { AlertTriangle, Database, LoaderCircle, RefreshCw } from 'lucide-react';
import { formatRegistryDate } from './registryDate';

const COPY = {
  FR: {
    available: 'Totaux globaux disponibles', partial: 'Sous-totaux disponibles · conversions à compléter',
    loading: 'Chargement des totaux globaux...', unavailable: 'Totaux globaux indisponibles',
    source: 'Source : BigQuery via /finance/dashboard', read: 'Lecture API',
    income: 'recettes', expenses: 'dépenses', scope: 'Recettes globales et solde : hors flux sociaux.',
    extract: 'extrait chargé pour les tableaux et graphiques', limit: 'maximum 200 par registre',
    extractPartial: 'Extrait partiel : une source d’écritures est indisponible.', extractUnavailable: 'Extrait des écritures indisponible.',
    social: 'Flux sociaux chargés', separate: 'Comptés séparément, exclus des recettes globales et du solde.',
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
  socialLoaded, socialState, onRefresh, refreshing = false }) {
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
  return (
    <section className="m3s-design-scope mb-6 flex items-start gap-3 border-l-2 px-3 py-3" aria-busy={reading}
      style={{ borderColor: current && !partial ? 'var(--m3s-status-info)' : 'var(--m3s-status-warning)', color: 'var(--m3s-text-primary)' }}>
      <Icon size={20} className={`mt-0.5 shrink-0 ${reading ? 'animate-spin' : ''}`} aria-hidden="true" />
      <div role="status" data-testid="finance-source-status" className="min-w-0 flex-1 text-sm leading-6">
        <p className="font-semibold">{reading ? t.loading : current ? partial ? t.partial : t.available : t.unavailable}</p>
        <p>{current ? `${count(current.incomeCount)} ${t.income} · ${count(current.expenseCount)} ${t.expenses} · ` : ''}{t.source}</p>
        <p>{t.scope}</p>
        <p>{t.read} : {readTime ? <time className="whitespace-nowrap" dateTime={current.timestamp}>{readTime}</time> : '—'}</p>
        {!reading && <>
          <p>{count(incomeLoaded)} {t.income} · {count(expenseLoaded)} {t.expenses} · {t.extract} ({t.limit}).</p>
          {(!incomeAvailable || !expensesAvailable) && <p>{incomeAvailable || expensesAvailable ? t.extractPartial : t.extractUnavailable}</p>}
          <p>{t.social} : {socialState === 'forbidden' || socialState === 'restricted' ? t.restricted : count(socialLoaded)} · {t.limit}. {t.separate}</p>
          {!current && <p>{t.missing}</p>}
          {current?.expenseSubtotal && <p>{t.conversions} · {t.expenses} : CHF {count(current.expensesMissingChf)} · CFA {count(current.expensesMissingCfa)}</p>}
          {current?.incomeSubtotal && <p>{t.conversions} · {t.income} : CHF {count(current.incomeMissingChf)} · CFA {count(current.incomeMissingCfa)}</p>}
        </>}
      </div>
      <button type="button" className="m3s-raised flex h-11 w-11 shrink-0 items-center justify-center rounded border focus-visible:outline focus-visible:outline-2 disabled:opacity-50"
        title={t.refresh} aria-label={t.refresh} disabled={reading} onClick={onRefresh}>
        <RefreshCw size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
