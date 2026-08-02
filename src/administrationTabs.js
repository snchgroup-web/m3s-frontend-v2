export const resolveAdministrationTab = (tab) => {
  if (['tasks', 'projects'].includes(tab)) return 'planning';
  if (['overview', 'planning', 'institution', 'communication', 'compliance'].includes(tab)) return tab;
  return 'overview';
};
