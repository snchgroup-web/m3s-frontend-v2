import { useEffect } from 'react';
import { financeSectionIds, revealFinanceSection } from './financeNavigation';

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
  if (!tabs && !panel) return main;
  if (!tabs || !panel || panel.dataset.activeTab !== tabs.dataset.activeTab) return null;
  return tabs.dataset.activeTab === 'overview' ? tabs : panel;
}

export function useModuleNavigation(mainRef, location) {
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return undefined;
    const tab = new URLSearchParams(location.search).get('tab');
    // Finance registers already wait for their asynchronous source indicators.
    const financeId = financeSectionIds[tab];
    if (location.pathname === '/finance' && financeId && (!location.hash || location.hash === `#${financeId}`)) return undefined;
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
        const target = resolveModuleTarget(main, location);
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
  }, [mainRef, location.key, location.pathname, location.search, location.hash]);
}
