import { useEffect } from 'react';
import { financeSectionIds, revealFinanceSection } from './financeNavigation';

const hasQueryDestination = search => {
  const params = new URLSearchParams(search);
  return ['section', 'visual', 'dashboardKpi', 'kpi'].some(key => Boolean(params.get(key)));
};

export function resolveModuleTarget(main, location) {
  const tabs = main.querySelector('[data-module-tabs]');
  const panel = main.querySelector('[data-module-content]');
  const requested = new URLSearchParams(location.search).get('tab');
  const normalized = tabs?.dataset.moduleTabs === 'rh' && requested === 'membres' ? 'directory' : requested;
  if (tabs && normalized && tabs.dataset.tabValues.split(',').includes(normalized) && tabs.dataset.activeTab !== normalized) return null;
  if (panel && panel.dataset.ready !== 'true') return null;
  if (location.hash) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return null; }
    return Array.from(main.querySelectorAll('[id]')).find(element => element.id === id) || null;
  }
  if (hasQueryDestination(location.search)) return null;
  if (!tabs && !panel) return main;
  if (!tabs || !panel || panel.dataset.activeTab !== tabs.dataset.activeTab) return null;
  return tabs.dataset.activeTab === 'overview' ? tabs : panel;
}

export function useModuleNavigation(mainRef, { key, pathname, search, hash }) {
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return undefined;
    // Nested views own their query-based focus (for example GED -> institution visual).
    if (!hash && hasQueryDestination(search)) return undefined;
    const tab = new URLSearchParams(search).get('tab');
    // Finance registers already wait for their asynchronous source indicators.
    const financeId = financeSectionIds[tab];
    if (pathname === '/finance' && financeId && (!hash || hash === `#${financeId}`)) return undefined;
    let frame;
    let finished = false;
    const finish = () => {
      finished = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      main.removeEventListener('wheel', finish);
      main.removeEventListener('touchstart', finish);
      main.removeEventListener('keydown', finish);
    };
    const reveal = () => {
      if (finished) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = resolveModuleTarget(main, { search, hash });
        if (!target) return;
        if (target === main) main.scrollTo?.({ top: 0, behavior: 'instant' });
        else revealFinanceSection(target);
        finish();
      });
    };
    // Observe only until the destination is rendered; never pull the reader back later.
    const observer = new MutationObserver(reveal);
    observer.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-active-tab', 'data-ready', 'id'] });
    main.addEventListener('wheel', finish, { passive: true });
    main.addEventListener('touchstart', finish, { passive: true });
    main.addEventListener('keydown', finish);
    reveal();
    const timeout = window.setTimeout(finish, 12000);
    return () => { window.clearTimeout(timeout); finish(); };
  }, [mainRef, key, pathname, search, hash]);
}
