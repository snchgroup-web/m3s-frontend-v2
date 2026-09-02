import {
  getDashboardKpiDefinitions,
  getFinanceKpiDefinition,
  getFinanceKpiDefinitions,
  getManagementKpiDefinition,
  getManagementKpiDefinitions,
  getOperationsKpiDefinition,
  getOperationsKpiDefinitions,
  getSupportKpiDefinition,
  getSupportKpiDefinitions
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

test.each([
  ['FR', 'par Cheikh'], ['EN', 'from Cheikh'], ['DE', 'durch Cheikh'],
])('defines repayments and the outstanding balance with Cheikh as payer in %s', (language, payer) => {
  const repayments = getFinanceKpiDefinition('real-estate-reimbursements', language);
  const balance = getFinanceKpiDefinition('outstanding-balance', language);
  expect(repayments.definition).toContain(payer);
  expect(balance.definition).toContain(payer);
  expect(repayments.source).toContain('remboursements_total_chf');
  expect(balance.source).toContain('solde_ouvert_cheikh_chf');
});

test.each(['FR', 'EN', 'DE'])('provides the six governed Operations KPIs in %s', (language) => {
  const definitions = getOperationsKpiDefinitions(language);

  expect(definitions.map(({ id }) => id)).toEqual([
    'stocks',
    'clients',
    'orders',
    'beneficiaries',
    'donors',
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

test.each(['FR', 'EN', 'DE'])('provides the nine governed Support KPIs in %s', (language) => {
  const definitions = getSupportKpiDefinitions(language);

  expect(definitions.map(({ id }) => id)).toEqual([
    'members',
    'founders',
    'associates',
    'teams',
    'employees',
    'it-accounts',
    'it-documents',
    'it-incidents',
    'it-storage'
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

test('keeps member counts distinct from employees and pending IT measures', () => {
  expect(getSupportKpiDefinition('members', 'FR')?.source).toContain('annuaire des membres');
  expect(getSupportKpiDefinition('employees', 'FR')?.scope).toContain('indisponible');
  expect(getSupportKpiDefinition('it-incidents', 'FR')?.source).toContain('registre des incidents');
  expect(getSupportKpiDefinition('unknown', 'FR')).toBeNull();
});

test('groups the Dashboard dictionary without duplicating KPI records', () => {
  const groups = getDashboardKpiDefinitions('FR');
  expect(groups.management).toHaveLength(4);
  expect(groups.finance).toHaveLength(10);
  expect(groups.support).toHaveLength(9);
  expect(groups.operations).toHaveLength(6);
  expect(new Set(Object.values(groups).flat().map(({ id }) => id))).toHaveProperty('size', 29);
});

