import {
  DASHBOARD_INDICATOR_DESTINATIONS,
  buildDashboardDestination,
  buildDashboardReturnPath,
  getDashboardIndicatorDestination,
  getDashboardReturnContext
} from './dashboardNavigation';

test('adds a governed dashboard return context without losing tab or anchor', () => {
  expect(buildDashboardDestination('/finance?tab=depenses#finance-expense-register', 'expenses')).toBe(
    '/finance?tab=depenses&returnTo=dashboard&dashboardKpi=expenses#finance-expense-register'
  );
});

test('builds the exact return path to the originating indicator', () => {
  expect(buildDashboardReturnPath('active-major-files')).toBe(
    '/?view=overview&dashboardKpi=active-major-files#dashboard-kpi-active-major-files'
  );
});

test('recognises only an explicit dashboard return context', () => {
  expect(getDashboardReturnContext('?returnTo=dashboard&dashboardKpi=users')).toEqual({
    enabled: true,
    indicatorId: 'users',
    view: 'overview'
  });
  expect(getDashboardReturnContext('?returnTo=overview')).toEqual({
    enabled: false,
    indicatorId: null,
    view: 'overview'
  });
});

test('returns to the exact dashboard section when no KPI initiated the navigation', () => {
  expect(getDashboardReturnContext('?returnTo=dashboard&dashboardView=incidents')).toEqual({
    enabled: true,
    indicatorId: null,
    view: 'incidents'
  });
  expect(buildDashboardReturnPath(null, 'incidents')).toBe('/?view=incidents#global-pilotage-title');
});

test('falls back to the governed dashboard overview for an unknown return view', () => {
  expect(buildDashboardReturnPath(null, 'unknown')).toBe('/?view=overview#global-situation');
});

test('governs every current KPI destination and preserves its exact return identity', () => {
  expect(Object.keys(DASHBOARD_INDICATOR_DESTINATIONS)).toHaveLength(29);

  Object.entries(DASHBOARD_INDICATOR_DESTINATIONS).forEach(([indicatorId, path]) => {
    const destination = getDashboardIndicatorDestination(indicatorId);
    expect(destination).toContain(`dashboardKpi=${indicatorId}`);
    expect(destination).toContain('returnTo=dashboard');
    expect(destination).toContain(new URL(path, 'https://m3s.local').hash);
    expect(buildDashboardReturnPath(indicatorId)).toContain(`#dashboard-kpi-${indicatorId}`);
  });
});

test('rejects an indicator without a governed destination', () => {
  expect(() => getDashboardIndicatorDestination('unknown-kpi')).toThrow('Unknown dashboard indicator');
});
