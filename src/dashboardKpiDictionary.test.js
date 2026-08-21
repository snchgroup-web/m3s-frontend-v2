import { getManagementKpiDefinition, getManagementKpiDefinitions } from './dashboardKpiDictionary';

test.each(['FR', 'EN', 'DE'])('provides the four governed Management KPIs in %s', (language) => {
  const definitions = getManagementKpiDefinitions(language);

  expect(definitions.map(({ id }) => id)).toEqual([
    'active-major-files',
    'users',
    'documents',
    'tasks'
  ]);
  definitions.forEach((definition) => {
    expect(definition).toEqual(expect.objectContaining({
      label: expect.any(String),
      definition: expect.any(String),
      scope: expect.any(String),
      source: expect.any(String),
      freshness: expect.any(String),
      action: expect.any(String)
    }));
  });
});

test('falls back to French and never fabricates an unknown KPI', () => {
  expect(getManagementKpiDefinition('users', 'XX')?.label).toBe('Utilisateurs M3S');
  expect(getManagementKpiDefinition('unknown', 'FR')).toBeNull();
});

