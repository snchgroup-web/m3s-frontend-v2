import React from 'react';
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
    social: 'Flux sociaux totaux',
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
    social: 'Total social flows',
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
    social: 'Soziale Flüsse gesamt',
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
  pink: { color: 'var(--m3s-status-danger)', hover: 'hover:border-pink-500/60' }
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

const IndicatorCard = ({ label, value, unit = 'CHF', state, detail, source, icon: Icon, tone, locale, testId }) => {
  const style = TONES[tone];
  const copy = COPY[locale === 'de-CH' ? 'DE' : locale === 'en-GB' ? 'EN' : 'FR'];
  const displayValue = state === 'loading' ? '…' : formatAmount(value, unit, locale);

  return (
    <article className={`m3s-panel min-h-[8.5rem] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${style.hover}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium" style={{ color: style.color }}>{label}</p>
          <p data-testid={testId} className="mt-2 text-xl font-semibold" style={{ color: 'var(--m3s-text-primary)' }}>{displayValue}</p>
          {detail && <p className="mt-1 text-xs font-medium" style={{ color: 'var(--m3s-text-secondary)' }}>{detail}</p>}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${style.color} 14%, transparent)`, color: style.color }}>
          <Icon size={21} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 border-t pt-2 text-xs" style={{ borderColor: 'var(--m3s-border)', color: 'var(--m3s-text-secondary)' }}>{stateLabel(state, value, copy, source)}</p>
    </article>
  );
};

const FinanceOverviewIndicators = ({
  language = 'FR',
  financeState,
  totalIncome,
  totalExpenses,
  netBalance,
  currentRate,
  realEstateState,
  realEstateFunding,
  realEstateFundingCfa,
  reimbursements,
  outstandingBalance,
  socialState,
  socialTotal,
  socialTotalCfa
}) => {
  const t = COPY[language] || COPY.FR;
  const locale = language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH';
  const rateState = Number.isFinite(currentRate) ? 'available' : 'unavailable';
  const cfaDetail = (value) => Number.isFinite(value)
    ? `${formatAmount(value, 'CFA', locale)} · ${t.historicalCfa}`
    : null;
  const availableDetail = (state, value) => state === 'available' ? cfaDetail(value) : null;

  return (
    <section aria-label={language === 'DE' ? 'Finanzkennzahlen' : language === 'EN' ? 'Finance indicators' : 'Indicateurs financiers'} className="m3s-design-scope mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <IndicatorCard label={t.income} value={totalIncome} state={financeState} source={t.globalSource} icon={TrendingUp} tone="green" locale={locale} testId="finance-total-income" />
      <IndicatorCard label={t.expenses} value={totalExpenses} state={financeState} source={t.globalSource} icon={TrendingDown} tone="red" locale={locale} testId="finance-total-expenses" />
      <IndicatorCard label={t.balance} value={netBalance} state={financeState} source={t.globalSource} icon={CircleDollarSign} tone="blue" locale={locale} testId="finance-net-balance" />
      <IndicatorCard label={t.rate} value={currentRate} unit="CFA / CHF" state={rateState} source={t.currentRate} icon={ArrowRightLeft} tone="violet" locale={locale} testId="finance-current-rate" />
      <IndicatorCard label={t.realEstateFunding} value={realEstateFunding} state={realEstateState} detail={availableDetail(realEstateState, realEstateFundingCfa)} source={t.realEstateSource} icon={Building2} tone="cyan" locale={locale} testId="finance-real-estate-funding" />
      <IndicatorCard label={t.reimbursements} value={reimbursements} state={realEstateState} source={t.realEstateSource} icon={HandCoins} tone="teal" locale={locale} testId="finance-real-estate-reimbursements" />
      <IndicatorCard label={t.outstanding} value={outstandingBalance} state={realEstateState} source={t.realEstateSource} icon={Landmark} tone="amber" locale={locale} testId="finance-real-estate-outstanding" />
      <IndicatorCard label={t.social} value={socialTotal} state={socialState} detail={availableDetail(socialState, socialTotalCfa)} source={t.socialSource} icon={HeartHandshake} tone="pink" locale={locale} testId="finance-social-total" />
    </section>
  );
};

export default FinanceOverviewIndicators;
