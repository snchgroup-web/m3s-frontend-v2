import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const COPY = {
  FR: { history: 'Repère historique · étape documentaire', current: 'Voir l’état courant de REF-01' },
  EN: { history: 'Historical milestone · documentary step', current: 'View the current REF-01 status' },
  DE: { history: 'Historischer Stand · Dokumentationsschritt', current: 'Aktuellen REF-01-Stand ansehen' }
};

let activeReturnLink = null;

const InstitutionalPeopleTeamsHistoricalFollowUp = ({ language = 'FR', children }) => {
  const t = COPY[language] || COPY.FR;
  const returnPosition = useRef(null);
  const returnLink = useRef(null);

  useEffect(() => {
    let timer;
    const restorePosition = () => {
      const position = returnPosition.current;
      if (!position || activeReturnLink !== returnLink.current || window.location.href !== position.url) return;
      // Native history restores the document, but not M3S's nested scroll area.
      timer = window.setTimeout(() => {
        if (!position.container.isConnected || activeReturnLink !== returnLink.current || window.location.href !== position.url) return;
        position.container.scrollTop = position.top;
        position.container.scrollLeft = position.left;
        returnLink.current?.focus({ preventScroll: true });
      }, 0);
    };
    const link = returnLink.current;
    window.addEventListener('popstate', restorePosition);
    return () => {
      window.removeEventListener('popstate', restorePosition);
      window.clearTimeout(timer);
      if (activeReturnLink === link) activeReturnLink = null;
    };
  }, []);

  const rememberPosition = event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    let container = event.currentTarget.parentElement;
    while (container && !/(auto|scroll)/.test(window.getComputedStyle(container).overflowY)) {
      container = container.parentElement;
    }
    container = container || document.scrollingElement;
    if (container) {
      activeReturnLink = event.currentTarget;
      returnPosition.current = {
        url: window.location.href, container, top: container.scrollTop, left: container.scrollLeft
      };
    }
  };
  return (
    <div data-testid="ref01-historical-follow-up" className="mt-3 border-t border-slate-700 p-3" style={{ backgroundColor: 'var(--m3s-surface-panel)' }}>
      <p className="text-xs font-semibold text-slate-400">{t.history}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{children}</p>
      <a ref={returnLink} onClick={rememberPosition} href="#institutional-ref01-g1-att-001" className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
        <span>{t.current}</span><ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
};

export default InstitutionalPeopleTeamsHistoricalFollowUp;
