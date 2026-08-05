import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ExternalLink, Plus, Search, X } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const SUPPORTED_LANGUAGES = ['FR', 'DE', 'EN'];

const normalizeLanguage = language => SUPPORTED_LANGUAGES.includes(language) ? language : 'FR';
const normalizeSearch = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const PROPOSAL_COPY = Object.freeze({
  FR: {
    add: 'Ajouter',
    proposalTitle: 'Proposer un terme',
    proposalHelp: 'Cette action prépare un brouillon local. Elle ne modifie pas le Glossaire central 2SG et nécessite une validation humaine.',
    termLabel: 'Terme',
    definitionLabel: 'Définition courte',
    domainLabel: 'Domaine local',
    sourceLabel: 'Source ou référence',
    optional: 'facultatif',
    cancel: 'Annuler',
    prepare: 'Ajouter la proposition',
    close: 'Fermer',
    draftTitle: 'Propositions préparées dans cette session',
    localDraft: 'Brouillon local · à soumettre au Glossaire central'
  },
  EN: {
    add: 'Add',
    proposalTitle: 'Propose a term',
    proposalHelp: 'This action prepares a local draft. It does not modify the 2SG Central Glossary and requires human validation.',
    termLabel: 'Term',
    definitionLabel: 'Short definition',
    domainLabel: 'Local domain',
    sourceLabel: 'Source or reference',
    optional: 'optional',
    cancel: 'Cancel',
    prepare: 'Add proposal',
    close: 'Close',
    draftTitle: 'Proposals prepared in this session',
    localDraft: 'Local draft · to be submitted to the Central Glossary'
  },
  DE: {
    add: 'Hinzufügen',
    proposalTitle: 'Begriff vorschlagen',
    proposalHelp: 'Diese Aktion erstellt einen lokalen Entwurf. Sie ändert das zentrale 2SG-Glossar nicht und erfordert eine menschliche Validierung.',
    termLabel: 'Begriff',
    definitionLabel: 'Kurzdefinition',
    domainLabel: 'Lokaler Bereich',
    sourceLabel: 'Quelle oder Referenz',
    optional: 'optional',
    cancel: 'Abbrechen',
    prepare: 'Vorschlag hinzufügen',
    close: 'Schließen',
    draftTitle: 'In dieser Sitzung vorbereitete Vorschläge',
    localDraft: 'Lokaler Entwurf · an das zentrale Glossar zu übermitteln'
  }
});

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
  const t = { ...PROPOSAL_COPY[normalizedLanguage], ...(copy[normalizedLanguage] || copy.FR) };
  const terms = useMemo(
    () => buildFunctionGlossaryTerms(groups, normalizedLanguage),
    [groups, normalizedLanguage]
  );
  const [query, setQuery] = useState('');
  const [groupId, setGroupId] = useState('all');
  const [selectedId, setSelectedId] = useState(terms[0]?.id || null);
  const [showProposal, setShowProposal] = useState(false);
  const [proposal, setProposal] = useState({ term: '', definition: '', groupId: groups[0]?.id || '', source: '' });
  const [localProposals, setLocalProposals] = useState([]);

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

  const openProposal = () => {
    setProposal({ term: '', definition: '', groupId: groups[0]?.id || '', source: '' });
    setShowProposal(true);
  };

  const submitProposal = event => {
    event.preventDefault();
    const selectedGroup = groups.find(group => group.id === proposal.groupId);
    setLocalProposals(current => [...current, {
      ...proposal,
      id: `${glossaryId}-proposal-${current.length + 1}`,
      groupLabel: selectedGroup?.labels?.[normalizedLanguage] || selectedGroup?.labels?.FR || proposal.groupId
    }]);
    setShowProposal(false);
  };

  return (
    <section className="function-glossary space-y-5" aria-labelledby={titleId}>
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="m3s-icon-button shrink-0 bg-cyan-500/10 text-cyan-500" aria-hidden="true"><BookOpen size={22} /></span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-cyan-500">{t.eyebrow}</p>
              <h2 id={titleId} className="m3s-page-title mt-1">{t.title}</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.intro}</p>
            </div>
          </div>
          <button type="button" className="m3s-primary-button inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-4" onClick={openProposal}>
            <Plus size={17} aria-hidden="true" /> {t.add}
          </button>
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

      {localProposals.length > 0 && (
        <section className="m3s-panel px-4 py-3 sm:px-5" aria-labelledby={`${glossaryId}-drafts-title`}>
          <h3 id={`${glossaryId}-drafts-title`} className="m3s-panel-title">{t.draftTitle}</h3>
          <div className="mt-2 divide-y" style={{ borderColor: 'var(--m3s-border)' }}>
            {localProposals.map(item => (
              <div key={item.id} className="py-3 first:pt-1 last:pb-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold">{item.term}</p>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">{t.localDraft}</span>
                </div>
                <p className="mt-1 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{item.definition}</p>
                <p className="mt-1 text-xs" style={{ color: 'var(--m3s-text-secondary)' }}>{item.groupLabel}{item.source ? ` · ${item.source}` : ''}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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

      {showProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="presentation">
          <section className="m3s-panel w-full max-w-xl p-5 sm:p-6" role="dialog" aria-modal="true" aria-labelledby={`${glossaryId}-proposal-title`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id={`${glossaryId}-proposal-title`} className="m3s-section-title">{t.proposalTitle}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: 'var(--m3s-text-secondary)' }}>{t.proposalHelp}</p>
              </div>
              <button type="button" className="m3s-icon-button shrink-0" onClick={() => setShowProposal(false)} aria-label={t.close} title={t.close}>
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <form className="mt-5 space-y-4" onSubmit={submitProposal}>
              <label className="block text-sm font-semibold">
                {t.termLabel} *
                <input className="m3s-field mt-1.5 w-full px-3" value={proposal.term} onChange={event => setProposal(current => ({ ...current, term: event.target.value }))} required />
              </label>
              <label className="block text-sm font-semibold">
                {t.definitionLabel} *
                <textarea className="m3s-field mt-1.5 min-h-24 w-full px-3 py-2" value={proposal.definition} onChange={event => setProposal(current => ({ ...current, definition: event.target.value }))} required />
              </label>
              <label className="block text-sm font-semibold">
                {t.domainLabel} *
                <select className="m3s-field mt-1.5 w-full px-3" value={proposal.groupId} onChange={event => setProposal(current => ({ ...current, groupId: event.target.value }))} required>
                  {groups.map(group => <option key={group.id} value={group.id}>{group.labels[normalizedLanguage] || group.labels.FR || group.id}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                {t.sourceLabel} <span className="font-normal" style={{ color: 'var(--m3s-text-secondary)' }}>({t.optional})</span>
                <input className="m3s-field mt-1.5 w-full px-3" value={proposal.source} onChange={event => setProposal(current => ({ ...current, source: event.target.value }))} />
              </label>
              <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end" style={{ borderColor: 'var(--m3s-border)' }}>
                <button type="button" className="m3s-secondary-button min-h-11 px-4" onClick={() => setShowProposal(false)}>{t.cancel}</button>
                <button type="submit" className="m3s-primary-button min-h-11 px-4">{t.prepare}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
};

export default FunctionGlossary;
