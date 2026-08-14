import {
  buildAdministrationTabPath,
  resolveAdministrationTab,
  shouldShowAdministrationOverviewReturn
} from './administrationTabs';

test.each([
  ['overview', 'overview'],
  ['institution', 'institution'],
  ['planning', 'planning'],
  ['communication', 'communication'],
  ['compliance', 'compliance'],
  ['processes', 'processes'],
  ['architecture', 'architecture'],
  ['resources', 'resources'],
  ['assistant', 'assistant'],
  ['glossary', 'glossary'],
  ['tasks', 'planning'],
  ['projects', 'planning'],
  ['unknown', 'overview'],
  [null, 'overview']
])('resolves the Administration route %p to %p', (input, expected) => {
  expect(resolveAdministrationTab(input)).toBe(expected);
});

test('opens the audit route only when the dedicated permission is available', () => {
  expect(resolveAdministrationTab('audit')).toBe('overview');
  expect(resolveAdministrationTab('audit', { canReadAudit: true })).toBe('audit');
});

test('keeps a visible return path when a component is opened from the Administration overview', () => {
  expect(buildAdministrationTabPath('processes', { fromOverview: true }))
    .toBe('/administration?tab=processes&returnTo=overview');
  expect(shouldShowAdministrationOverviewReturn('processes', '?tab=processes&returnTo=overview')).toBe(true);
  expect(shouldShowAdministrationOverviewReturn('overview', '?tab=overview&returnTo=overview')).toBe(false);
});
