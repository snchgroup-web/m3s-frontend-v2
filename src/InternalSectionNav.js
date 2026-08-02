import React from 'react';
import { ArrowUp } from 'lucide-react';

const InternalSectionNav = ({ ariaLabel, items, topId, backToTopLabel }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-0 z-20 rounded-lg border border-slate-600 bg-slate-900/95 p-2 shadow-lg backdrop-blur" aria-label={ariaLabel}>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {items.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="min-h-10 shrink-0 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollToSection(topId)}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-700 bg-blue-950 text-blue-200 transition hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={backToTopLabel}
          title={backToTopLabel}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default InternalSectionNav;
