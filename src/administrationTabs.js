export const resolveAdministrationTab = (tab) => {
  if (['tasks', 'projects'].includes(tab)) return 'planning';
  if (['overview', 'planning', 'institution', 'communication', 'compliance', 'processes', 'architecture', 'glossary'].includes(tab)) return tab;
  return 'overview';
};

export const buildAdministrationTabPath = (tab, { fromOverview = false } = {}) => {
  const params = new URLSearchParams({ tab });
  if (fromOverview && tab !== 'overview') params.set('returnTo', 'overview');
  return `/administration?${params.toString()}`;
};

export const shouldShowAdministrationOverviewReturn = (activeTab, search = '') => (
  activeTab !== 'overview' && new URLSearchParams(search).get('returnTo') === 'overview'
);
