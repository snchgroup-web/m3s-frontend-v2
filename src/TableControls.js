import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const tableText = {
  FR: {
    search: 'Rechercher...',
    rows: 'Lignes',
    noResult: 'Aucun resultat',
    of: 'sur',
    shown: 'affichees'
  },
  EN: {
    search: 'Search...',
    rows: 'Rows',
    noResult: 'No results',
    of: 'of',
    shown: 'shown'
  },
  DE: {
    search: 'Suchen...',
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

  useEffect(() => {
    setPage(1);
  }, [query, pageSize, safeRows.length]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder || t.search}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 py-2 pl-10 pr-4 text-white placeholder-slate-400"
          />
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
