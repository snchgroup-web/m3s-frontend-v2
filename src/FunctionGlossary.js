import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ExternalLink, Search } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const SUPPORTED_LANGUAGES = ['FR', 'DE', 'EN'];

const normalizeLanguage = language => SUPPORTED_LANGUAGES.includes(language) ? language : 'FR';
const normalizeSearch = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const buildFunctionGlossaryTerms = (groups = [], language = 'FR') => {
  const normalizedLanguage = normalizeLanguage(language);

  return groups.flatMap(group => group.termIds.map(termId => {
    const entry = getGlossaryContextEntry(termId, normalizedLanguage);
    if (!entry) return null;

    return {
      ...entry,
      groupId: group.id,
      groupLabel: group.labels[normalizedLanguage] || group.labels.FR || group.id
    };
  })).filter(Boolean);
};

const FunctionGlossary = ({
  language = 'FR',
  groups = [],
  copy,
  glossaryId = 'function-glossary',
  centralReturnTo = null
}) => {
  const normalizedLanguage = normalizeLanguage(language);
  const t = copy[normalizedLanguage] || copy.FR;
  const terms = useMemo(
    () => buildFunctionGlossaryTerms(groups, normalizedLanguage),
    [groups, normalizedLanguage]
  );
  const [query, setQuery] = useState('');
  const [groupId, setGroupId] = useState('all');
  const [selectedId, setSelectedId] = useState(terms[0]?.id || null);

  const visibleTerms = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return terms.filter(term => {
      const matchesGroup = groupId === 'all' || term.groupId === groupId;
      const searchable = normalizeSearch(`${term.term} ${term.shortDefinition} ${term.detailedDefinition} ${term.id}`);
      return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [groupId, query, terms]);

  const selectedTerm = terms.find(term => term.id === selectedId && visibleTerms.some(item => item.id === term.id))
    || visibleTerms[0]
    || null;
  const titleId = `${glossaryId}-title`;
  const centralHref = `/ged?tab=knowledge&term=${encodeURIComponent(selectedTerm?.id || '')}${centralReturnTo ? `&returnTo=${encodeURIComponent(centralReturnTo)}` : ''}`;
  const selectedStatus = selectedTerm?.status === 'candidate'
    ? {
        label: t.candidate || t.validated,
        classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
      }
    : {
        label: t.validated,
        classes: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
      };

  return (
    <section className="function-glossary space-y-5" aria-labelledby={titleId}>
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="m3s-icon-button shrink-0 bg-cyan-500/10 text-cyan-500" aria-hidden="true"><BookOpen size={22} /></span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-cyan-500">{t.eyebrow}</p>
            <h2 id={titleId} className="m3s-page-title mt-1">{t.title}</h2>
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
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.labels[normalizedLanguage] || group.labels.FR || group.id}
              </option>
            ))}
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
                className={`function-glossary__term w-full border-b px-4 py-3 text-left transition-colors ${selectedTerm?.id === term.id ? 'is-active' : ''}`}
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
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${selectedStatus.classes}`}>
                <CheckCircle2 size={14} aria-hidden="true" /> {selectedStatus.label}
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
                href={centralHref}
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

export default FunctionGlossary;
