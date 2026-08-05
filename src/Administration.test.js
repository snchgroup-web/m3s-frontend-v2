import { resolveAdministrationTab } from './administrationTabs';

test.each([
  ['overview', 'overview'],
  ['institution', 'institution'],
  ['planning', 'planning'],
  ['communication', 'communication'],
  ['compliance', 'compliance'],
  ['glossary', 'glossary'],
  ['tasks', 'planning'],
  ['projects', 'planning'],
  ['unknown', 'overview'],
  [null, 'overview']
])('resolves the Administration route %p to %p', (input, expected) => {
  expect(resolveAdministrationTab(input)).toBe(expected);
});
