import { useEffect, useRef } from 'react';
import menuData from './menuStructure.json';
import { filterAuthorizedItems } from './accessControl';

export const centerTabHorizontally = (container, activeButton) => {
  if (!container || !activeButton) return;

  const containerRect = container.getBoundingClientRect();
  const activeButtonRect = activeButton.getBoundingClientRect();
  const buttonCenterInContent = container.scrollLeft
    + (activeButtonRect.left - containerRect.left)
    + (activeButtonRect.width / 2);
  const desiredLeft = buttonCenterInContent - (container.clientWidth / 2);
  const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
  const left = Math.min(maxLeft, Math.max(0, desiredLeft));

  if (typeof container.scrollTo === 'function') {
    container.scrollTo({ left, behavior: 'smooth' });
  } else {
    container.scrollLeft = left;
  }
};

const placeholderText = {
  FR: {
    title: 'Section a construire',
    body: 'Cet onglet existe dans la structure globale du systeme. Son contenu metier sera ajoute progressivement.'
  },
  EN: {
    title: 'Section to build',
    body: 'This tab exists in the global system structure. Its business content will be added progressively.'
  },
  DE: {
    title: 'Bereich im Aufbau',
    body: 'Dieser Reiter existiert in der globalen Systemstruktur. Der fachliche Inhalt wird schrittweise ergaenzt.'
  }
};

export const getPathTab = (path, fallback) => {
  const query = String(path || '').split('?')[1] || '';
  const params = new URLSearchParams(query);
  return params.get('tab') || params.get('view') || fallback;
};

export const getModuleChildren = (moduleId, permissions = []) => {
  const module = menuData.menu.find(item => item.id === moduleId);
  return filterAuthorizedItems(module?.children || [], permissions);
};

export const getModuleChildTabs = (moduleId, language, permissions = []) =>
  getModuleChildren(moduleId, permissions).map(child => ({
    id: child.id,
    tab: getPathTab(child.path, child.id),
    label: child.label?.[language] || child.label?.FR || child.id
  }));

export const getModuleChildTabIds = (moduleId, permissions = []) =>
  getModuleChildren(moduleId, permissions).map(child => getPathTab(child.path, child.id));

export const ModuleChildTabs = ({ moduleId, language, activeTab, onSelect }) => {
  const tabs = getModuleChildTabs(moduleId, language);
  if (!tabs.length) return null;

  return (
    <div className="flex gap-3 mb-6 border-b border-slate-700 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.tab)}
          className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.tab ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const ModulePageTabs = ({ moduleId, language, activeTab, onSelect, tabs = [], permissions = [], ariaLabel }) => {
  const activeButtonRef = useRef(null);
  const tabListRef = useRef(null);
  const mergedTabs = [];
  const seen = new Set();
  const explicitTabs = new Map(tabs.map(tab => [tab.tab, tab]));

  const addTab = (tab) => {
    if (!tab?.tab || seen.has(tab.tab)) return;
    seen.add(tab.tab);
    mergedTabs.push(tab);
  };

  const overviewTab = explicitTabs.get('overview');
  if (overviewTab) addTab(overviewTab);

  getModuleChildTabs(moduleId, language, permissions).forEach(childTab => {
    addTab(explicitTabs.get(childTab.tab) || childTab);
  });

  tabs.forEach(addTab);

  useEffect(() => {
    centerTabHorizontally(tabListRef.current, activeButtonRef.current);
  }, [activeTab, language]);

  if (!mergedTabs.length) return null;

  return (
    <div ref={tabListRef} className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto" role="tablist" aria-label={ariaLabel}>
      {mergedTabs.map(tab => (
        <button
          key={tab.id || tab.tab}
          ref={activeTab === tab.tab ? activeButtonRef : null}
          onClick={() => onSelect(tab.tab)}
          role="tab"
          aria-selected={activeTab === tab.tab}
          className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.tab ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const ChildTabPlaceholder = ({ moduleId, language, activeTab, handledTabs = [], permissions = [] }) => {
  if (handledTabs.includes(activeTab)) return null;

  const child = getModuleChildTabs(moduleId, language, permissions).find(tab => tab.tab === activeTab);
  if (!child) return null;

  const t = placeholderText[language] || placeholderText.FR;

  return (
    <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
      <h3 className="text-white text-xl font-bold mb-2">{child.label}</h3>
      <p className="text-blue-300 font-semibold mb-2">{t.title}</p>
      <p className="text-slate-400">{t.body}</p>
    </div>
  );
};
