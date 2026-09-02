import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const COPY = {
  FR: { history: 'Repère historique · étape documentaire', current: 'Voir l’état courant de REF-01' },
  EN: { history: 'Historical milestone · documentary step', current: 'View the current REF-01 status' },
  DE: { history: 'Historischer Stand · Dokumentationsschritt', current: 'Aktuellen REF-01-Stand ansehen' }
};

const InstitutionalPeopleTeamsHistoricalFollowUp = ({ language = 'FR', children }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <div data-testid="ref01-historical-follow-up" className="mt-3 border-t border-slate-700 pt-3">
      <p className="text-xs font-semibold text-slate-400">{t.history}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{children}</p>
      <a href="#institutional-ref01-g1-att-001" className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
        <span>{t.current}</span><ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
};

export default InstitutionalPeopleTeamsHistoricalFollowUp;
