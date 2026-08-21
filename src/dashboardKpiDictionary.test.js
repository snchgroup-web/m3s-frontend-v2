import {
  getDashboardKpiDefinitions,
  getFinanceKpiDefinition,
  getFinanceKpiDefinitions,
  getManagementKpiDefinition,
  getManagementKpiDefinitions,
  getOperationsKpiDefinition,
  getOperationsKpiDefinitions
} from './dashboardKpiDictionary';

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

test.each(['FR', 'EN', 'DE'])('provides the ten governed Finance KPIs in %s', (language) => {
  const definitions = getFinanceKpiDefinitions(language);

  expect(definitions.map(({ id }) => id)).toEqual([
    'revenue',
    'expenses',
    'balance',
    'donations',
    'financing',
    'reference-rate',
    'real-estate-funding',
    'real-estate-reimbursements',
    'outstanding-balance',
    'social-flows'
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

test('distinguishes historical CFA values from current-rate equivalents', () => {
  expect(getFinanceKpiDefinition('real-estate-funding', 'FR')?.scope).toContain('ne sont pas recalculés au taux courant');
  expect(getFinanceKpiDefinition('real-estate-reimbursements', 'FR')?.definition).toContain('taux de référence courant');
  expect(getFinanceKpiDefinition('social-flows', 'FR')?.definition).toContain('CFA historique');
  expect(getFinanceKpiDefinition('unknown', 'FR')).toBeNull();
});

test.each(['FR', 'EN', 'DE'])('provides the five governed Operations KPIs in %s', (language) => {
  const definitions = getOperationsKpiDefinitions(language);

  expect(definitions.map(({ id }) => id)).toEqual([
    'stocks',
    'clients',
    'orders',
    'beneficiaries',
    'suppliers'
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

test('distinguishes the connected inventory count from pending Operations counters', () => {
  expect(getOperationsKpiDefinition('stocks', 'FR')?.source).toContain('API Stock & Actifs');
  expect(getOperationsKpiDefinition('clients', 'FR')?.scope).toContain('ne doit pas être interprétée comme zéro');
  expect(getOperationsKpiDefinition('unknown', 'FR')).toBeNull();
});

test('groups the Dashboard dictionary without duplicating KPI records', () => {
  const groups = getDashboardKpiDefinitions('FR');
  expect(groups.management).toHaveLength(4);
  expect(groups.finance).toHaveLength(10);
  expect(groups.operations).toHaveLength(5);
  expect(new Set(Object.values(groups).flat().map(({ id }) => id))).toHaveProperty('size', 19);
});

