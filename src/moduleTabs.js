import menuData from './menuStructure.json';

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
  return new URLSearchParams(query).get('tab') || fallback;
};

export const getModuleChildren = (moduleId) => {
  const module = menuData.menu.find(item => item.id === moduleId);
  return module?.children || [];
};

export const getModuleChildTabs = (moduleId, language) =>
  getModuleChildren(moduleId).map(child => ({
    id: child.id,
    tab: getPathTab(child.path, child.id),
    label: child.label?.[language] || child.label?.FR || child.id
  }));

export const getModuleChildTabIds = (moduleId) =>
  getModuleChildren(moduleId).map(child => getPathTab(child.path, child.id));

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

export const ModulePageTabs = ({ moduleId, language, activeTab, onSelect, tabs = [] }) => {
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

  getModuleChildTabs(moduleId, language).forEach(childTab => {
    addTab(explicitTabs.get(childTab.tab) || childTab);
  });

  tabs.forEach(addTab);

  if (!mergedTabs.length) return null;

  return (
    <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto">
      {mergedTabs.map(tab => (
        <button
          key={tab.id || tab.tab}
          onClick={() => onSelect(tab.tab)}
          className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.tab ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const ChildTabPlaceholder = ({ moduleId, language, activeTab, handledTabs = [] }) => {
  if (handledTabs.includes(activeTab)) return null;

  const child = getModuleChildTabs(moduleId, language).find(tab => tab.tab === activeTab);
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
