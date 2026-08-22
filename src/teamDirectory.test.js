import {
  buildTeamAgentDirectory,
  findAgentTeam,
  getDirectoryAgentLabel,
  resolveDirectoryAgent,
  TEAM_CODES
} from './teamDirectory';

const members = [
  { person_id: 'PER-1', display_name: 'Cheikh Ndiaye', preferred_name: 'Cheikh', team: 'TZH', active: true },
  { person_id: 'PER-2', display_name: 'Chantal Löffler', preferred_name: 'Chantal', team: 'TZH', active: true },
  { person_id: 'PER-3', display_name: 'Gnilane Diouf', preferred_name: 'Gnilane', team: 'TSN', active: true },
  { person_id: 'PER-4', display_name: 'Gnilane Ndiaye', preferred_name: 'Gnilane', team: 'TSN', active: true },
  { person_id: 'PER-5', display_name: 'Inactive Person', preferred_name: 'Inactive', team: 'TSN', active: false }
];

test('builds personal options from RH-001 and always keeps the collective option', () => {
  const directory = buildTeamAgentDirectory(members, {
    [TEAM_CODES.ZURICH]: 'Team ZH (collectif)',
    [TEAM_CODES.SENEGAL]: 'Team SN (collectif)'
  });

  expect(directory.Team_ZH.map(option => option.value)).toEqual(['Chantal', 'Cheikh', 'Team_ZH']);
  expect(directory.Team_SN.map(option => option.value)).toEqual(['Gnilane Diouf', 'Gnilane Ndiaye', 'Team_SN']);
  expect(directory.Team_SN.map(option => option.value)).not.toContain('Inactive');
});

test('resolves historical names while retaining distinct duplicate preferred names', () => {
  const directory = buildTeamAgentDirectory(members);

  expect(resolveDirectoryAgent('TZH', 'Chantal Löffler', directory)).toBe('Chantal');
  expect(resolveDirectoryAgent('TSN', 'Gnilane Ndiaye', directory)).toBe('Gnilane Ndiaye');
  expect(findAgentTeam('Cheikh Ndiaye', directory)).toBe('Team_ZH');
  expect(getDirectoryAgentLabel('Cheikh', directory)).toBe('Cheikh Ndiaye');
});

test('falls back to collectives only when RH-001 is unavailable', () => {
  const directory = buildTeamAgentDirectory([], {
    [TEAM_CODES.ZURICH]: 'Team ZH (collectif)',
    [TEAM_CODES.SENEGAL]: 'Team SN (collectif)'
  });

  expect(directory.Team_ZH).toEqual(expect.arrayContaining([expect.objectContaining({ value: 'Team_ZH' })]));
  expect(directory.Team_SN).toEqual(expect.arrayContaining([expect.objectContaining({ value: 'Team_SN' })]));
  expect(findAgentTeam('Cheikh', directory)).toBe('');
});
