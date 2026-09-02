import React from 'react';
import FinanceTransactionCount, { sumTransactionCounts } from './FinanceTransactionCount';
import {
  ArrowRightLeft,
  Building2,
  CircleDollarSign,
  HandCoins,
  HeartHandshake,
  Landmark,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

const COPY = {
  FR: {
    income: 'Recettes globales',
    expenses: 'Dépenses globales',
    balance: 'Solde net',
    rate: 'Taux de référence',
    realEstateFunding: 'Financement immobilier total',
    reimbursements: 'Remboursements immobiliers',
    outstanding: 'Solde restant ouvert',
    social: 'Flux sociaux reclassés',
    loading: 'Chargement de la source',
    unavailable: 'Source indisponible',
    restricted: 'Accès restreint',
    confirmedZero: 'Zéro confirmé par la source',
    globalSource: 'BigQuery · synthèse Finance',
    realEstateSource: 'Registre Finance immobilier',
    socialSource: 'Registre Finance social',
    historicalCfa: 'CFA historiques enregistrés',
    currentRate: 'Cours de référence courant'
  },
  EN: {
    income: 'Global revenue',
    expenses: 'Global expenses',
    balance: 'Net balance',
    rate: 'Reference rate',
    realEstateFunding: 'Total real estate funding',
    reimbursements: 'Real estate reimbursements',
    outstanding: 'Outstanding balance',
    social: 'Reclassified social flows',
    loading: 'Loading source',
    unavailable: 'Source unavailable',
    restricted: 'Restricted access',
    confirmedZero: 'Zero confirmed by source',
    globalSource: 'BigQuery · Finance summary',
    realEstateSource: 'Real estate Finance register',
    socialSource: 'Social Finance register',
    historicalCfa: 'Recorded historical CFA',
    currentRate: 'Current reference rate'
  },
  DE: {
    income: 'Globale Einnahmen',
    expenses: 'Globale Ausgaben',
    balance: 'Nettosaldo',
    rate: 'Referenzkurs',
    realEstateFunding: 'Immobilienfinanzierung gesamt',
    reimbursements: 'Immobilienrückzahlungen',
    outstanding: 'Offener Restsaldo',
    social: 'Neu klassifizierte soziale Flüsse',
    loading: 'Quelle wird geladen',
    unavailable: 'Quelle nicht verfügbar',
    restricted: 'Eingeschränkter Zugriff',
    confirmedZero: 'Null durch die Quelle bestätigt',
    globalSource: 'BigQuery · Finanzübersicht',
    realEstateSource: 'Register Immobilienfinanzen',
    socialSource: 'Register Sozialfinanzen',
    historicalCfa: 'Erfasste historische CFA',
    currentRate: 'Aktueller Referenzkurs'
  }
};

const TONES = {
  green: { color: 'var(--m3s-status-success)', hover: 'hover:border-emerald-500/60' },
  red: { color: 'var(--m3s-status-danger)', hover: 'hover:border-rose-500/60' },
  blue: { color: 'var(--m3s-status-info)', hover: 'hover:border-blue-500/60' },
  violet: { color: 'var(--m3s-row-accent)', hover: 'hover:border-violet-500/60' },
  cyan: { color: 'var(--m3s-status-info)', hover: 'hover:border-cyan-500/60' },
  teal: { color: 'var(--m3s-status-success)', hover: 'hover:border-teal-500/60' },
  amber: { color: 'var(--m3s-status-warning)', hover: 'hover:border-amber-500/60' },
  social: { color: 'var(--m3s-status-social)', hover: 'hover:border-fuchsia-500/60' }
};

const formatAmount = (value, unit, locale) => (
  Number.isFinite(value)
    ? `${value.toLocaleString(locale, { maximumFractionDigits: 2 })} ${unit}`
    : `— ${unit}`
);

const stateLabel = (state, value, copy, source) => {
  if (state === 'loading') return copy.loading;
  if (state === 'forbidden') return copy.restricted;
  if (state !== 'available' || !Number.isFinite(value)) return copy.unavailable;
  if (value === 0) return copy.confirmedZero;
  return source;
};

const IndicatorCard = ({
  label,
  value,
  unit = 'CHF',
  secondaryValue,
  secondaryUnit,
  state,
  source,
  icon: Icon,
  tone,
  locale,
  transactionCount,
  countScope = 'global',
  testId
}) => {
  const style = TONES[tone];
  const copy = COPY[locale === 'de-CH' ? 'DE' : locale === 'en-GB' ? 'EN' : 'FR'];
  const displayValue = state === 'loading' ? `… ${unit}` : formatAmount(value, unit, locale);
  const displaySecondaryValue = state === 'loading'
    ? `… ${secondaryUnit}`
    : state === 'available'
      ? formatAmount(secondaryValue, secondaryUnit, locale)
      : `— ${secondaryUnit}`;

  return (
    <article className={`m3s-panel min-h-[8.5rem] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${style.hover}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium" style={{ color: style.color }}>{label}</p>
          <p data-testid={testId} className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl font-semibold">
            <span style={{ color: 'var(--m3s-status-info)' }}>{displayValue}</span>
            {secondaryUnit && (
              <span className="m3s-currency-cfa">
                ≈ {displaySecondaryValue}
              </span>
            )}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${style.color} 14%, transparent)`, color: style.color }}>
          <Icon size={21} aria-hidden="true" />
        </span>
      </div>
      {secondaryUnit && <FinanceTransactionCount count={transactionCount} scope={countScope} state={state} language={locale === 'de-CH' ? 'DE' : locale === 'en-GB' ? 'EN' : 'FR'} />}
      <p className="mt-3 border-t pt-2 text-xs" style={{ borderColor: 'var(--m3s-border)', color: 'var(--m3s-text-secondary)' }}>{stateLabel(state, value, copy, source)}</p>
    </article>
  );
};

const FinanceOverviewIndicators = ({
  language = 'FR',
  incomeCount,
  expenseCount,
  realEstateLoadedCount,
  socialLoadedCount,
  financeState,
  totalIncome,
  totalIncomeCfa,
  totalExpenses,
  totalExpensesCfa,
  netBalance,
  netBalanceCfa,
  currentRate,
  realEstateState,
  realEstateFunding,
  realEstateFundingCfa,
  reimbursements,
  reimbursementsCfa,
  outstandingBalance,
  outstandingBalanceCfa,
  socialState,
  socialTotal,
  socialTotalCfa
}) => {
  const t = COPY[language] || COPY.FR;
  const locale = language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH';
  const rateState = Number.isFinite(currentRate) ? 'available' : 'unavailable';
  const historicalSource = (source) => `${source} · ${t.historicalCfa}`;
  const currentRateSource = (source) => `${source} · ${t.currentRate}`;

  return (
    <section aria-label={language === 'DE' ? 'Finanzkennzahlen' : language === 'EN' ? 'Finance indicators' : 'Indicateurs financiers'} className="m3s-design-scope mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <IndicatorCard label={t.income} value={totalIncome} secondaryValue={totalIncomeCfa} secondaryUnit="CFA" state={financeState} source={historicalSource(t.globalSource)} icon={TrendingUp} tone="green" locale={locale} transactionCount={incomeCount} testId="finance-total-income" />
      <IndicatorCard label={t.expenses} value={totalExpenses} secondaryValue={totalExpensesCfa} secondaryUnit="CFA" state={financeState} source={historicalSource(t.globalSource)} icon={TrendingDown} tone="red" locale={locale} transactionCount={expenseCount} testId="finance-total-expenses" />
      <IndicatorCard label={t.balance} value={netBalance} secondaryValue={netBalanceCfa} secondaryUnit="CFA" state={financeState} source={historicalSource(t.globalSource)} icon={CircleDollarSign} tone="blue" locale={locale} transactionCount={sumTransactionCounts(incomeCount, expenseCount)} testId="finance-net-balance" />
      <IndicatorCard label={t.rate} value={currentRate} unit="CFA / CHF" state={rateState} source={t.currentRate} icon={ArrowRightLeft} tone="violet" locale={locale} testId="finance-current-rate" />
      <IndicatorCard label={t.realEstateFunding} value={realEstateFunding} secondaryValue={realEstateFundingCfa} secondaryUnit="CFA" state={realEstateState} source={historicalSource(t.realEstateSource)} icon={Building2} tone="cyan" locale={locale} transactionCount={realEstateLoadedCount} countScope="registry" testId="finance-real-estate-funding" />
      <IndicatorCard label={t.reimbursements} value={reimbursements} secondaryValue={reimbursementsCfa} secondaryUnit="CFA" state={realEstateState} source={currentRateSource(t.realEstateSource)} icon={HandCoins} tone="teal" locale={locale} transactionCount={realEstateLoadedCount} countScope="registry" testId="finance-real-estate-reimbursements" />
      <IndicatorCard label={t.outstanding} value={outstandingBalance} secondaryValue={outstandingBalanceCfa} secondaryUnit="CFA" state={realEstateState} source={currentRateSource(t.realEstateSource)} icon={Landmark} tone="amber" locale={locale} transactionCount={realEstateLoadedCount} countScope="registry" testId="finance-real-estate-outstanding" />
      <IndicatorCard label={t.social} value={socialTotal} secondaryValue={socialTotalCfa} secondaryUnit="CFA" state={socialState} source={historicalSource(t.socialSource)} icon={HeartHandshake} tone="social" locale={locale} transactionCount={socialLoadedCount} countScope="extract" testId="finance-social-total" />
    </section>
  );
};

export default FinanceOverviewIndicators;
