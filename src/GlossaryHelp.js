import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, ExternalLink, HelpCircle, X } from 'lucide-react';
import { getGlossaryContextEntry } from './glossaryContext';

const COPY = {
  FR: {
    help: 'Définition du Glossaire',
    validated: 'Définition validée',
    source: 'Glossaire central 2SG',
    open: 'Voir dans le Glossaire',
    close: 'Fermer',
    returnToPage: 'Revenir à la page Institution'
  },
  DE: {
    help: 'Glossardefinition',
    validated: 'Validierte Definition',
    source: 'Zentrales 2SG-Glossar',
    open: 'Im Glossar anzeigen',
    close: 'Schließen',
    returnToPage: 'Zur Institution-Seite zurückkehren'
  },
  EN: {
    help: 'Glossary definition',
    validated: 'Validated definition',
    source: '2SG Central Glossary',
    open: 'View in Glossary',
    close: 'Close',
    returnToPage: 'Return to the Institution page'
  }
};

export const GlossaryEntryPanel = ({ termId, language = 'FR', onReturn }) => {
  const t = COPY[language] || COPY.FR;
  const entry = getGlossaryContextEntry(termId, language);
  if (!entry) return null;

  return (
    <section
      id="glossary-context-entry"
      className="glossary-entry-panel scroll-mt-24 rounded-lg border border-blue-700/70 bg-blue-950/30 p-5 md:p-6"
      aria-labelledby="glossary-context-title"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
            <BookOpen size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase text-blue-300">{t.source} · {entry.version}</p>
            <h3 id="glossary-context-title" className="mt-1 text-xl font-bold text-white">{entry.term}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-blue-100">{entry.shortDefinition}</p>
          </div>
        </div>
        <span className="w-fit rounded-full border border-emerald-600/70 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-200">
          {t.validated}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{entry.detailedDefinition}</p>
      <p className="mt-4 font-mono text-xs text-slate-500">{entry.id}</p>
      {onReturn && (
        <button
          type="button"
          onClick={onReturn}
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md border border-slate-600 bg-slate-800 px-4 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {t.returnToPage}
        </button>
      )}
    </section>
  );
};

const GlossaryHelp = ({ termId, language = 'FR' }) => {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const t = COPY[language] || COPY.FR;
  const entry = getGlossaryContextEntry(termId, language);

  useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  if (!entry) return null;
  const dialogTitleId = `glossary-help-${termId.toLowerCase()}-title`;
  const glossaryPath = `/ged?tab=knowledge&term=${encodeURIComponent(termId)}`;

  const closeDialog = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-600 bg-blue-950 text-blue-200 transition hover:border-blue-400 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={`${t.help} : ${entry.term}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={`${t.help} : ${entry.term}`}
      >
        <HelpCircle size={16} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border border-blue-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-blue-300">{t.source} · {entry.version}</p>
                <h3 id={dialogTitleId} className="mt-1 text-xl font-bold text-white">{entry.term}</h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDialog}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-600 bg-slate-800 text-slate-200 transition hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={t.close}
                title={t.close}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <span className="mt-4 inline-flex rounded-full border border-emerald-600/70 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-200">
              {t.validated}
            </span>
            <p className="mt-4 font-semibold leading-6 text-blue-100">{entry.shortDefinition}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{entry.detailedDefinition}</p>
            <p className="mt-4 font-mono text-xs text-slate-500">{entry.id}</p>
            <a
              href={glossaryPath}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <ExternalLink size={17} aria-hidden="true" />
              {t.open}
            </a>
          </section>
        </div>
      )}
    </>
  );
};

export default GlossaryHelp;
