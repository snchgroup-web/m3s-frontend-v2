import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ExternalLink, Search } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const LOCAL_TERM_GROUPS = Object.freeze([
  {
    id: 'institution',
    labels: { FR: 'Institution', EN: 'Institution', DE: 'Institution' },
    termIds: ['INST-VISION', 'INST-MISSION', 'INST-BUT', 'INST-VALEURS']
  },
  {
    id: 'governance',
    labels: { FR: 'Gouvernance', EN: 'Governance', DE: 'Governance' },
    termIds: ['GOUV-REGLES-OR', 'GOUV-GOUVERNANCE']
  },
  {
    id: 'strategy',
    labels: { FR: 'Stratégie', EN: 'Strategy', DE: 'Strategie' },
    termIds: [
      'STRAT-STRATEGIE',
      'STRAT-BUSINESS-MODEL',
      'STRAT-BUSINESS-PLAN',
      'STRAT-BLUEPRINT',
      'STRAT-FEUILLE-ROUTE',
      'OPS-PLAN-ACTION'
    ]
  },
  {
    id: 'planning',
    labels: { FR: 'Planification & Projets', EN: 'Planning & Projects', DE: 'Planung & Projekte' },
    termIds: ['PROJ-JALON', 'PROJ-REVUE']
  }
]);

const translations = {
  FR: {
    eyebrow: 'VUE MÉTIER LOCALE · LECTURE SEULE',
    title: 'Glossaire métier Administration',
    intro: 'Les termes utiles à la fonction Administration sont réunis ici sans dupliquer leurs définitions. Le Glossaire central 2SG reste la source maîtresse versionnée.',
    search: 'Rechercher un terme ou une définition…',
    all: 'Tous les domaines',
    terms: 'termes',
    empty: 'Aucun terme ne correspond à ces critères.',
    validated: 'Définition validée',
    stableId: 'Identifiant stable',
    version: 'Version',
    localDomain: 'Contexte métier',
    source: 'Source maîtresse',
    central: 'Glossaire central 2SG',
    openCentral: 'Consulter dans le Glossaire central',
    governance: 'Toute modification ou nouvelle entrée est proposée au Glossaire central, puis réutilisée dans cette vue locale après validation.'
  },
  EN: {
    eyebrow: 'LOCAL BUSINESS VIEW · READ ONLY',
    title: 'Administration business glossary',
    intro: 'Terms useful to the Administration function are gathered here without duplicating their definitions. The versioned 2SG Central Glossary remains the master source.',
    search: 'Search a term or definition…',
    all: 'All domains',
    terms: 'terms',
    empty: 'No term matches these criteria.',
    validated: 'Validated definition',
    stableId: 'Stable identifier',
    version: 'Version',
    localDomain: 'Business context',
    source: 'Master source',
    central: '2SG Central Glossary',
    openCentral: 'Open in the Central Glossary',
    governance: 'Any change or new entry is proposed to the Central Glossary, then reused in this local view after validation.'
  },
  DE: {
    eyebrow: 'LOKALE FACHSICHT · NUR LESEN',
    title: 'Fachglossar Administration',
    intro: 'Die für die Verwaltungsfunktion relevanten Begriffe werden hier zusammengeführt, ohne Definitionen zu duplizieren. Das versionierte zentrale 2SG-Glossar bleibt die maßgebliche Quelle.',
    search: 'Begriff oder Definition suchen…',
    all: 'Alle Bereiche',
    terms: 'Begriffe',
    empty: 'Kein Begriff entspricht diesen Kriterien.',
    validated: 'Validierte Definition',
    stableId: 'Stabile Kennung',
    version: 'Version',
    localDomain: 'Fachlicher Kontext',
    source: 'Maßgebliche Quelle',
    central: 'Zentrales 2SG-Glossar',
    openCentral: 'Im zentralen Glossar öffnen',
    governance: 'Änderungen oder neue Einträge werden dem zentralen Glossar vorgeschlagen und nach Validierung in dieser lokalen Sicht wiederverwendet.'
  }
};

const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const getAdministrationGlossaryTerms = (language = 'FR') => {
  const normalizedLanguage = ['FR', 'DE', 'EN'].includes(language) ? language : 'FR';

  return LOCAL_TERM_GROUPS.flatMap(group => group.termIds.map(termId => ({
    ...getGlossaryContextEntry(termId, normalizedLanguage),
    groupId: group.id,
    groupLabel: group.labels[normalizedLanguage]
  }))).filter(term => term.id);
};

const AdministrationGlossary = ({ language = 'FR' }) => {
  const normalizedLanguage = ['FR', 'DE', 'EN'].includes(language) ? language : 'FR';
  const t = translations[normalizedLanguage];
  const terms = useMemo(() => getAdministrationGlossaryTerms(normalizedLanguage), [normalizedLanguage]);
  const [query, setQuery] = useState('');
  const [groupId, setGroupId] = useState('all');
  const [selectedId, setSelectedId] = useState(terms[0]?.id || null);

  const visibleTerms = useMemo(() => {
    const normalizedQuery = normalize(query);
    return terms.filter(term => {
      const matchesGroup = groupId === 'all' || term.groupId === groupId;
      const searchable = normalize(`${term.term} ${term.shortDefinition} ${term.detailedDefinition} ${term.id}`);
      return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [groupId, query, terms]);

  const selectedTerm = terms.find(term => term.id === selectedId && visibleTerms.some(item => item.id === term.id))
    || visibleTerms[0]
    || null;

  return (
    <section className="administration-glossary space-y-5" aria-labelledby="administration-glossary-title">
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="m3s-icon-button shrink-0 bg-cyan-500/10 text-cyan-500" aria-hidden="true"><BookOpen size={22} /></span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-cyan-500">{t.eyebrow}</p>
            <h2 id="administration-glossary-title" className="m3s-page-title mt-1">{t.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
          </div>
        </div>
      </header>

      <div className="m3s-panel p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <label className="relative block">
            <span className="sr-only">{t.search}</span>
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={18} aria-hidden="true" />
            <input
              className="m3s-field w-full pl-10 pr-3"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={t.search}
            />
          </label>
          <select className="m3s-field w-full px-3" value={groupId} onChange={event => setGroupId(event.target.value)} aria-label={t.all}>
            <option value="all">{t.all}</option>
            {LOCAL_TERM_GROUPS.map(group => <option key={group.id} value={group.id}>{group.labels[normalizedLanguage]}</option>)}
          </select>
        </div>
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <div className="m3s-panel min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--m3s-border)' }}>
            <h3 className="m3s-panel-title">{t.title}</h3>
            <span className="text-xs font-semibold" style={{ color: 'var(--m3s-text-secondary)' }}>{visibleTerms.length} {t.terms}</span>
          </div>
          <div className="max-h-[34rem] overflow-y-auto">
            {visibleTerms.map(term => (
              <button
                key={term.id}
                type="button"
                className={`administration-glossary__term w-full border-b px-4 py-3 text-left transition-colors ${selectedTerm?.id === term.id ? 'is-active' : ''}`}
                style={{ borderColor: 'var(--m3s-border)' }}
                onClick={() => setSelectedId(term.id)}
                aria-pressed={selectedTerm?.id === term.id}
              >
                <span className="block font-semibold">{term.term}</span>
                <span className="mt-1 block text-xs leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{term.shortDefinition}</span>
                <span className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold" style={{ borderColor: 'var(--m3s-border)', color: 'var(--m3s-text-secondary)' }}>{term.groupLabel}</span>
              </button>
            ))}
            {!visibleTerms.length && <p className="p-6 text-sm" style={{ color: 'var(--m3s-text-secondary)' }}>{t.empty}</p>}
          </div>
        </div>

        {selectedTerm && (
          <article className="m3s-panel min-w-0 p-5 sm:p-6" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-cyan-500">{selectedTerm.groupLabel}</p>
                <h3 className="m3s-section-title mt-1">{selectedTerm.term}</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                <CheckCircle2 size={14} aria-hidden="true" /> {t.validated}
              </span>
            </div>
            <p className="mt-5 text-base font-semibold leading-7">{selectedTerm.shortDefinition}</p>
            <p className="mt-3 text-sm leading-7" style={{ color: 'var(--m3s-text-secondary)' }}>{selectedTerm.detailedDefinition}</p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="m3s-raised p-3"><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.stableId}</dt><dd className="mt-1 break-all font-mono text-sm">{selectedTerm.id}</dd></div>
              <div className="m3s-raised p-3"><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.version}</dt><dd className="mt-1 text-sm font-semibold">{selectedTerm.version}</dd></div>
              <div className="m3s-raised p-3"><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.localDomain}</dt><dd className="mt-1 text-sm font-semibold">{selectedTerm.groupLabel}</dd></div>
              <div className="m3s-raised p-3"><dt className="text-xs font-semibold uppercase" style={{ color: 'var(--m3s-text-secondary)' }}>{t.source}</dt><dd className="mt-1 text-sm font-semibold">{t.central}</dd></div>
            </dl>

            <div className="mt-6 border-t pt-5" style={{ borderColor: 'var(--m3s-border)' }}>
              <p className="text-xs leading-5" style={{ color: 'var(--m3s-text-secondary)' }}>{t.governance}</p>
              <a
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                href={`/ged?tab=knowledge&term=${encodeURIComponent(selectedTerm.id)}`}
              >
                {t.openCentral} <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default AdministrationGlossary;
