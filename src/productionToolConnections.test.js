import { getProductionToolReturnPath, withProductionToolReturn, PRODUCTION_TOOLS_PATH, PRODUCTION_TOOL_IDS, TOOL_ENTRY_PATHS } from './productionToolConnections';

test.each(['', '?returnTo=elsewhere', '?returnTo=https://example.test'])('does not invent a Production origin for %s', search => {
  expect(getProductionToolReturnPath(search)).toBeNull();
  expect(withProductionToolReturn('/rh?tab=resources#rh-proximity-tools', search)).toBe('/rh?tab=resources#rh-proximity-tools');
});
test.each(PRODUCTION_TOOL_IDS)('returns to the exact allowlisted %s entry', id => {
  expect(getProductionToolReturnPath(`?returnTo=production-tools&returnTool=${id}`)).toBe(`/production?tab=manufacturing#production-tool-${id}`);
});
test('unknown or injected entry identifiers safely fall back to the directory', () => {
  expect(getProductionToolReturnPath('?returnTo=production&returnTool=https://example.test')).toBe(PRODUCTION_TOOLS_PATH);
  expect(getProductionToolReturnPath('?returnTo=production')).toBe(PRODUCTION_TOOLS_PATH);
});
test('nested routes preserve only the qualified origin, not unrelated source parameters', () => {
  const target = new URL(withProductionToolReturn('/rh?tab=myaccount#own-account-top', '?view=finances&private=do-not-copy&returnTo=production&returnTool=budget-perso-ch'), 'https://m3s.local');
  expect(target.pathname).toBe('/rh'); expect(target.searchParams.get('tab')).toBe('myaccount');
  expect(target.searchParams.get('returnTool')).toBe('budget-perso-ch'); expect(target.searchParams.has('private')).toBe(false);
  expect(target.hash).toBe('#own-account-top');
});
test('four internal entries each carry their own return identity', () => {
  for (const [id, path] of Object.entries(TOOL_ENTRY_PATHS)) {
    const entry = new URL(path, 'https://m3s.local');
    expect(getProductionToolReturnPath(entry.search)).toBe(`/production?tab=manufacturing#production-tool-${id}`);
  }
});
