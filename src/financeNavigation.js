import { useEffect } from 'react';

export const financeSectionIds = Object.freeze({
  recettes: 'finance-revenue-register',
  depenses: 'finance-expense-register',
  resources: 'finance-documents'
});

export function revealFinanceSection(target) {
  if (!target) return;
  const main = target.closest('main');
  if (main && typeof main.scrollTo === 'function') {
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    main.scrollTo({ top: main.scrollTop + target.getBoundingClientRect().top - main.getBoundingClientRect().top - margin, behavior: 'instant' });
  } else target.scrollIntoView?.({ block: 'start', inline: 'nearest' });
  target.focus({ preventScroll: true });
}

export function useFinanceSectionNavigation(location, activeTab, ready) {
  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    const targetId = financeSectionIds[tab];
    if (!ready || activeTab !== tab || !targetId ||
        (location.hash && location.hash !== `#${targetId}`)) return undefined;
    // Wait for the indicators above the register to finish changing height.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      revealFinanceSection(target);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.search, location.hash, activeTab, ready]);
}
