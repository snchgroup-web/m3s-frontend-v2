import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const tableText = {
  FR: {
    search: 'Rechercher...',
    clearSearch: 'Effacer la recherche',
    rows: 'Lignes',
    noResult: 'Aucun resultat',
    of: 'sur',
    shown: 'affichees'
  },
  EN: {
    search: 'Search...',
    clearSearch: 'Clear search',
    rows: 'Rows',
    noResult: 'No results',
    of: 'of',
    shown: 'shown'
  },
  DE: {
    search: 'Suchen...',
    clearSearch: 'Suche loeschen',
    rows: 'Zeilen',
    noResult: 'Keine Ergebnisse',
    of: 'von',
    shown: 'angezeigt'
  }
};

const normalizeSearchValue = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const rowMatchesSearch = (row, query) => {
  if (!query) return true;
  return normalizeSearchValue(JSON.stringify(row)).includes(query);
};

const TableControls = ({
  rows,
  renderTable,
  renderEmpty,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  maxHeight = '30rem',
  searchPlaceholder
}) => {
  const { language } = useLanguage();
  const t = tableText[language] || tableText.FR;
  const [query, setQuery] = useState('');
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);
  const safeRows = useMemo(() => (Array.isArray(rows) ? rows : []), [rows]);
  const normalizedQuery = normalizeSearchValue(query);

  const filteredRows = useMemo(
    () => safeRows.filter(row => rowMatchesSearch(row, normalizedQuery)),
    [safeRows, normalizedQuery]
  );

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const startIndex = filteredRows.length ? (safePage - 1) * pageSize : 0;
  const endIndex = Math.min(startIndex + pageSize, filteredRows.length);
  const pageRows = filteredRows.slice(startIndex, endIndex);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    setPage(1);
  }, [query, pageSize, safeRows.length]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search size={18} className={`absolute left-3 top-3 ${hasQuery ? 'text-blue-400' : 'text-slate-500'}`} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && hasQuery) {
                setQuery('');
              }
            }}
            placeholder={searchPlaceholder || t.search}
            className={`w-full rounded-lg border bg-slate-700 py-2 pl-10 pr-10 text-white placeholder-slate-400 ${
              hasQuery ? 'border-blue-500 ring-1 ring-blue-500/40' : 'border-slate-600'
            }`}
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              title={t.clearSearch}
              className="absolute right-2 top-2 rounded p-1 text-slate-300 hover:bg-slate-600 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <label className="flex items-center gap-2">
            <span>{t.rows}</span>
            <select
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white"
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <span className="text-slate-400">
            {filteredRows.length ? `${startIndex + 1}-${endIndex}` : '0'} {t.of} {filteredRows.length} {t.shown}
            {filteredRows.length !== safeRows.length ? ` (${safeRows.length} total)` : ''}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
        <div className="overflow-auto" style={{ maxHeight }}>
          {pageRows.length > 0 ? renderTable(pageRows) : (renderEmpty?.() || (
            <div className="px-6 py-8 text-center text-slate-400">{t.noResult}</div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
        <span>Page {safePage} / {pageCount}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
            className="rounded border border-slate-600 bg-slate-700 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setPage(Math.min(pageCount, safePage + 1))}
            disabled={safePage >= pageCount}
            className="rounded border border-slate-600 bg-slate-700 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableControls;
