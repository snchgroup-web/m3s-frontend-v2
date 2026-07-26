import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  Eye,
  Factory,
  Handshake,
  Info,
  Search,
  ShieldCheck,
  UsersRound,
  X
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const EXCHANGE_RATE_CFA_PER_CHF = 711;
const REFERENCE_DATE = '2026-07-01';

const pilotSections = [
  {
    id: 'crm',
    titleKey: 'crmTitle',
    descriptionKey: 'crmDescription',
    icon: Handshake,
    tone: 'blue',
    metrics: [
      { id: 'prospects', labelKey: 'prospects', value: 4 },
      { id: 'clients', labelKey: 'clients', value: 3 },
      { id: 'opportunities', labelKey: 'opportunities', value: 3 },
      {
        id: 'weightedPipeline',
        labelKey: 'weightedPipeline',
        value: 19220 * EXCHANGE_RATE_CFA_PER_CHF,
        secondaryValue: 19220,
        type: 'currency'
      }
    ]
  },
  {
    id: 'rh',
    titleKey: 'rhTitle',
    descriptionKey: 'rhDescription',
    icon: UsersRound,
    tone: 'emerald',
    metrics: [
      { id: 'employees', labelKey: 'employees', value: 2 },
      { id: 'volunteers', labelKey: 'volunteers', value: 3 }
    ]
  },
  {
    id: 'production',
    titleKey: 'productionTitle',
    descriptionKey: 'productionDescription',
    icon: Factory,
    tone: 'amber',
    metrics: [
      { id: 'orders', labelKey: 'orders', value: 4 },
      { id: 'stockLines', labelKey: 'stockLines', value: 4 },
      { id: 'availableUnits', labelKey: 'availableUnits', value: 875 }
    ]
  }
];

const translations = {
  FR: {
    eyebrow: 'Diagnostic interne',
    title: 'Synthèse des pilotes locaux',
    subtitle: 'Vue de lecture seule pour comparer les repères CRM, RH et Production sans les présenter comme des données consolidées.',
    localPilot: 'Pilote local',
    readOnly: 'Lecture seule',
    nonConsolidated: 'Données non consolidées',
    referenceDate: 'Date de référence',
    searchLabel: 'Rechercher un indicateur',
    searchPlaceholder: 'Ex. prospects, stock...',
    domainLabel: 'Filtrer par domaine',
    allDomains: 'Tous les domaines',
    indicator: 'Indicateur',
    value: 'Valeur',
    status: 'Statut',
    action: 'Action',
    viewDetails: 'Voir le détail',
    details: 'Détail de l’indicateur',
    close: 'Fermer',
    emptyTitle: 'Aucun indicateur trouvé',
    emptyText: 'Modifiez la recherche ou le filtre de domaine.',
    datasetNote: 'Ces valeurs sont des repères UX locaux. Elles ne remplacent ni les données réelles du backend, ni Finance, ni BigQuery.',
    exchangeNote: 'Conversion indicative : 1 CHF = 711 CFA.',
    crmTitle: 'CRM local pilote',
    crmDescription: 'Cadrage commercial local, sans API ni persistance.',
    rhTitle: 'RH local pilote',
    rhDescription: 'Repères RH séparés des utilisateurs, rôles et accès applicatifs.',
    productionTitle: 'Production locale pilote',
    productionDescription: 'Repères opérationnels sans inventory backend ni Finance.',
    prospects: 'Prospects',
    clients: 'Clients',
    opportunities: 'Opportunités',
    weightedPipeline: 'Pipeline pondéré',
    employees: 'Employés',
    volunteers: 'Bénévoles',
    orders: 'Commandes',
    stockLines: 'Lignes de stock',
    availableUnits: 'Unités disponibles',
    indicative: 'indicatif'
  },
  EN: {
    eyebrow: 'Internal diagnostics',
    title: 'Local pilots summary',
    subtitle: 'Read-only view comparing CRM, HR and Production markers without presenting them as consolidated data.',
    localPilot: 'Local pilot',
    readOnly: 'Read only',
    nonConsolidated: 'Non-consolidated data',
    referenceDate: 'Reference date',
    searchLabel: 'Search indicators',
    searchPlaceholder: 'E.g. prospects, stock...',
    domainLabel: 'Filter by domain',
    allDomains: 'All domains',
    indicator: 'Indicator',
    value: 'Value',
    status: 'Status',
    action: 'Action',
    viewDetails: 'View details',
    details: 'Indicator details',
    close: 'Close',
    emptyTitle: 'No indicators found',
    emptyText: 'Change the search term or domain filter.',
    datasetNote: 'These values are local UX markers. They do not replace live backend, Finance or BigQuery data.',
    exchangeNote: 'Indicative conversion: 1 CHF = 711 CFA.',
    crmTitle: 'Local CRM pilot',
    crmDescription: 'Local commercial framing without API or persistence.',
    rhTitle: 'Local HR pilot',
    rhDescription: 'HR markers kept separate from application users, roles and access.',
    productionTitle: 'Local Production pilot',
    productionDescription: 'Operational markers without inventory backend or Finance.',
    prospects: 'Prospects',
    clients: 'Clients',
    opportunities: 'Opportunities',
    weightedPipeline: 'Weighted pipeline',
    employees: 'Employees',
    volunteers: 'Volunteers',
    orders: 'Orders',
    stockLines: 'Stock lines',
    availableUnits: 'Available units',
    indicative: 'indicative'
  },
  DE: {
    eyebrow: 'Interne Diagnose',
    title: 'Übersicht der lokalen Piloten',
    subtitle: 'Schreibgeschützte Ansicht der CRM-, Personal- und Produktionswerte ohne Darstellung als konsolidierte Daten.',
    localPilot: 'Lokaler Pilot',
    readOnly: 'Nur lesen',
    nonConsolidated: 'Nicht konsolidierte Daten',
    referenceDate: 'Referenzdatum',
    searchLabel: 'Kennzahl suchen',
    searchPlaceholder: 'Z. B. Interessenten, Bestand...',
    domainLabel: 'Nach Bereich filtern',
    allDomains: 'Alle Bereiche',
    indicator: 'Kennzahl',
    value: 'Wert',
    status: 'Status',
    action: 'Aktion',
    viewDetails: 'Details anzeigen',
    details: 'Details zur Kennzahl',
    close: 'Schließen',
    emptyTitle: 'Keine Kennzahl gefunden',
    emptyText: 'Ändern Sie die Suche oder den Bereichsfilter.',
    datasetNote: 'Diese Werte sind lokale UX-Orientierungswerte. Sie ersetzen keine Live-Daten aus Backend, Finanzen oder BigQuery.',
    exchangeNote: 'Indikative Umrechnung: 1 CHF = 711 CFA.',
    crmTitle: 'Lokaler CRM-Pilot',
    crmDescription: 'Lokaler Vertriebsrahmen ohne API oder Persistenz.',
    rhTitle: 'Lokaler Personalpilot',
    rhDescription: 'Personalwerte getrennt von Anwendungsnutzern, Rollen und Zugängen.',
    productionTitle: 'Lokaler Produktionspilot',
    productionDescription: 'Operative Werte ohne Bestands-Backend oder Finanzen.',
    prospects: 'Interessenten',
    clients: 'Kunden',
    opportunities: 'Chancen',
    weightedPipeline: 'Gewichtete Pipeline',
    employees: 'Mitarbeitende',
    volunteers: 'Freiwillige',
    orders: 'Bestellungen',
    stockLines: 'Bestandszeilen',
    availableUnits: 'Verfügbare Einheiten',
    indicative: 'indikativ'
  }
};

const localeByLanguage = {
  FR: 'fr-FR',
  EN: 'en-GB',
  DE: 'de-CH'
};

const toneClasses = {
  blue: {
    badge: 'border-blue-400/40 bg-blue-500/10 text-blue-200',
    icon: 'bg-blue-500/15 text-blue-300'
  },
  emerald: {
    badge: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
    icon: 'bg-emerald-500/15 text-emerald-300'
  },
  amber: {
    badge: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
    icon: 'bg-amber-500/15 text-amber-300'
  }
};

const LocalPilotSummary = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.FR;
  const locale = localeByLanguage[language] || localeByLanguage.FR;
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState(null);

  const formatNumber = (value) => new Intl.NumberFormat(locale).format(value);
  const formatDate = (value) => new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(`${value}T12:00:00`));

  const formatMetric = (metric) => {
    if (metric.type === 'currency') {
      return {
        primary: `${formatNumber(metric.value)} CFA`,
        secondary: `${formatNumber(metric.secondaryValue)} CHF (${t.indicative})`
      };
    }

    return {
      primary: formatNumber(metric.value),
      secondary: null
    };
  };

  const rows = useMemo(() => pilotSections.flatMap((section) => section.metrics.map((metric) => ({
    ...metric,
    domain: section.id,
    domainTitle: t[section.titleKey],
    domainDescription: t[section.descriptionKey],
    label: t[metric.labelKey],
    tone: section.tone
  }))), [t]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    return rows.filter((row) => {
      const matchesDomain = domain === 'all' || row.domain === domain;
      const matchesQuery = !normalizedQuery
        || `${row.label} ${row.domainTitle}`.toLocaleLowerCase(locale).includes(normalizedQuery);
      return matchesDomain && matchesQuery;
    });
  }, [domain, locale, query, rows]);

  return (
    <main className="min-h-screen bg-slate-900 p-4 text-slate-100 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl space-y-6" aria-labelledby="local-pilot-title">
        <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 shadow-lg sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
              <h1 id="local-pilot-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {t.title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">{t.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label={t.status}>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 text-sm font-semibold text-blue-200">
                <BadgeCheck aria-hidden="true" size={17} />
                {t.localPilot}
              </span>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 text-sm font-semibold text-emerald-200">
                <Eye aria-hidden="true" size={17} />
                {t.readOnly}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3">
              <CalendarDays className="shrink-0 text-blue-300" aria-hidden="true" size={19} />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">{t.referenceDate}</p>
                <p className="mt-1 font-semibold text-white">{formatDate(REFERENCE_DATE)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3">
              <ShieldCheck className="shrink-0 text-amber-300" aria-hidden="true" size={19} />
              <p className="text-sm font-semibold text-amber-100">{t.nonConsolidated}</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3" aria-label={t.title}>
          {pilotSections.map((section) => {
            const Icon = section.icon;
            const tone = toneClasses[section.tone];

            return (
              <article key={section.id} className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}>
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-semibold ${tone.badge}`}>
                      {t[section.titleKey]}
                    </span>
                    <p className="mt-3 text-sm leading-5 text-slate-400">{t[section.descriptionKey]}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {section.metrics.map((metric) => {
                    const formatted = formatMetric(metric);
                    return (
                      <div key={metric.id} className="min-w-0 rounded-lg border border-slate-700 bg-slate-900/50 p-3">
                        <p className="text-xs font-medium text-slate-400">{t[metric.labelKey]}</p>
                        <p className="mt-1 break-words text-lg font-bold tabular-nums text-white">{formatted.primary}</p>
                        {formatted.secondary && (
                          <p className="mt-1 text-xs tabular-nums text-slate-400">{formatted.secondary}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6" aria-labelledby="pilot-data-title">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-blue-300">{t.readOnly}</p>
              <h2 id="pilot-data-title" className="mt-1 text-xl font-bold text-white">{t.indicator}</h2>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-2xl">
              <label className="text-sm font-semibold text-slate-300">
                {t.searchLabel}
                <span className="relative mt-2 block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" size={18} />
                  <input
                    className="min-h-11 w-full rounded-lg border border-slate-600 bg-slate-900 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t.searchPlaceholder}
                  />
                </span>
              </label>

              <label className="text-sm font-semibold text-slate-300">
                {t.domainLabel}
                <select
                  className="mt-2 min-h-11 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 text-sm text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                >
                  <option value="all">{t.allDomains}</option>
                  {pilotSections.map((section) => (
                    <option key={section.id} value={section.id}>{t[section.titleKey]}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filteredRows.length > 0 ? (
            <>
              <div className="mt-5 hidden overflow-x-auto rounded-lg border border-slate-700 md:block">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-900/70 text-xs uppercase text-slate-400">
                    <tr>
                      <th className="px-4 py-3">{t.domainLabel}</th>
                      <th className="px-4 py-3">{t.indicator}</th>
                      <th className="px-4 py-3">{t.value}</th>
                      <th className="px-4 py-3">{t.status}</th>
                      <th className="px-4 py-3 text-right">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredRows.map((row) => {
                      const formatted = formatMetric(row);
                      return (
                        <tr key={`${row.domain}-${row.id}`} className="hover:bg-slate-700/30">
                          <td className="px-4 py-3 font-semibold text-slate-200">{row.domainTitle}</td>
                          <td className="px-4 py-3 text-slate-300">{row.label}</td>
                          <td className="px-4 py-3 tabular-nums text-white">
                            <span className="font-semibold">{formatted.primary}</span>
                            {formatted.secondary && <span className="mt-1 block text-xs text-slate-400">{formatted.secondary}</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-lg border border-blue-400/40 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">
                              {t.localPilot}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              type="button"
                              onClick={() => setSelectedMetric(row)}
                            >
                              <Eye aria-hidden="true" size={17} />
                              {t.viewDetails}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-3 md:hidden">
                {filteredRows.map((row) => {
                  const formatted = formatMetric(row);
                  return (
                    <article key={`${row.domain}-${row.id}`} className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase text-slate-400">{row.domainTitle}</p>
                          <h3 className="mt-1 font-semibold text-white">{row.label}</h3>
                        </div>
                        <span className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-200">
                          {t.localPilot}
                        </span>
                      </div>
                      <p className="mt-4 text-xl font-bold tabular-nums text-white">{formatted.primary}</p>
                      {formatted.secondary && <p className="mt-1 text-xs tabular-nums text-slate-400">{formatted.secondary}</p>}
                      <button
                        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-600 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="button"
                        onClick={() => setSelectedMetric(row)}
                      >
                        <Eye aria-hidden="true" size={17} />
                        {t.viewDetails}
                      </button>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-slate-600 bg-slate-900/40 px-5 py-10 text-center">
              <Search className="mx-auto text-slate-400" aria-hidden="true" size={24} />
              <h3 className="mt-3 font-semibold text-white">{t.emptyTitle}</h3>
              <p className="mt-1 text-sm text-slate-400">{t.emptyText}</p>
            </div>
          )}
        </section>

        <aside className="grid gap-3 rounded-lg border border-slate-700 bg-slate-800 p-5 text-sm text-slate-300 sm:grid-cols-2">
          <p className="flex gap-3">
            <Info className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" size={18} />
            <span>{t.datasetNote}</span>
          </p>
          <p className="flex gap-3">
            <Info className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" size={18} />
            <span>{t.exchangeNote}</span>
          </p>
        </aside>
      </section>

      {selectedMetric && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pilot-detail-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMetric(null);
          }}
        >
          <section className="w-full max-w-lg rounded-lg border border-slate-600 bg-slate-800 p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-blue-300">{selectedMetric.domainTitle}</p>
                <h2 id="pilot-detail-title" className="mt-1 text-xl font-bold text-white">{t.details}</h2>
              </div>
              <button
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="button"
                onClick={() => setSelectedMetric(null)}
                aria-label={t.close}
                title={t.close}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <dl className="mt-5 grid gap-3">
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                <dt className="text-xs font-semibold uppercase text-slate-400">{t.indicator}</dt>
                <dd className="mt-1 font-semibold text-white">{selectedMetric.label}</dd>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                <dt className="text-xs font-semibold uppercase text-slate-400">{t.value}</dt>
                <dd className="mt-1 text-xl font-bold tabular-nums text-white">{formatMetric(selectedMetric).primary}</dd>
                {formatMetric(selectedMetric).secondary && (
                  <dd className="mt-1 text-sm tabular-nums text-slate-400">{formatMetric(selectedMetric).secondary}</dd>
                )}
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                <dt className="text-xs font-semibold uppercase text-slate-400">{t.status}</dt>
                <dd className="mt-2 inline-flex rounded-lg border border-blue-400/40 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">
                  {t.localPilot} · {t.readOnly}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
};

export default LocalPilotSummary;
