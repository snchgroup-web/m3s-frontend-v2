const normalizeKey = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .trim()
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .toUpperCase();

export const TEAM_CODES = {
  ZURICH: 'Team_ZH',
  SENEGAL: 'Team_SN'
};

export const normalizeTeamCode = (value) => {
  const key = normalizeKey(value).replace(/\s+/g, '_');
  if (['TZH', 'TEAM_ZH', 'TEAMZH', 'ZH'].includes(key)) return TEAM_CODES.ZURICH;
  if (['TSN', 'TEAM_SN', 'TEAMSN', 'SN'].includes(key)) return TEAM_CODES.SENEGAL;
  return String(value || '').trim();
};

const collectiveOption = (team, label) => ({
  value: team,
  label,
  aliases: [team, team === TEAM_CODES.ZURICH ? 'TZH' : 'TSN']
});

export const buildTeamAgentDirectory = (members = [], collectiveLabels = {}) => {
  const activeMembers = (Array.isArray(members) ? members : [])
    .filter(member => member?.active !== false)
    .map(member => ({ ...member, normalizedTeam: normalizeTeamCode(member?.team) }))
    .filter(member => [TEAM_CODES.ZURICH, TEAM_CODES.SENEGAL].includes(member.normalizedTeam));

  const result = {
    [TEAM_CODES.ZURICH]: [],
    [TEAM_CODES.SENEGAL]: []
  };

  Object.keys(result).forEach(team => {
    const teamMembers = activeMembers.filter(member => member.normalizedTeam === team);
    const preferredCounts = teamMembers.reduce((counts, member) => {
      const preferred = String(member.preferred_name || '').trim();
      if (preferred) counts[normalizeKey(preferred)] = (counts[normalizeKey(preferred)] || 0) + 1;
      return counts;
    }, {});

    result[team] = teamMembers
      .map(member => {
        const displayName = String(member.display_name || '').trim();
        const preferredName = String(member.preferred_name || '').trim();
        const preferredIsUnique = preferredName && preferredCounts[normalizeKey(preferredName)] === 1;
        const displayStartsWithPreferred = preferredName
          && normalizeKey(displayName).startsWith(`${normalizeKey(preferredName)} `);
        return {
          value: preferredIsUnique ? preferredName : displayName,
          label: displayName && preferredName && !displayStartsWithPreferred
            ? `${displayName} (${preferredName})`
            : displayName || preferredName,
          personId: member.person_id || '',
          aliases: [member.person_id, displayName, preferredName].filter(Boolean)
        };
      })
      .filter(option => option.value && option.label)
      .sort((left, right) => left.label.localeCompare(right.label, 'fr'));

    result[team].push(collectiveOption(team, collectiveLabels[team] || team));
  });

  return result;
};

export const resolveDirectoryAgent = (team, rawValue, directory) => {
  const options = directory?.[normalizeTeamCode(team)] || [];
  const candidates = String(rawValue || '').split(',').map(value => value.trim()).filter(Boolean);

  for (const candidate of candidates) {
    const candidateKey = normalizeKey(candidate);
    const option = options.find(item => [item.value, item.label, ...(item.aliases || [])]
      .some(alias => normalizeKey(alias) === candidateKey));
    if (option) return option.value;
  }

  return candidates[0] || '';
};

export const findAgentTeam = (rawValue, directory) => {
  const candidateKey = normalizeKey(rawValue);
  return Object.entries(directory || {}).find(([, options]) => options.some(option => (
    [option.value, option.label, ...(option.aliases || [])].some(alias => normalizeKey(alias) === candidateKey)
  )))?.[0] || '';
};

export const getDirectoryAgentLabel = (rawValue, directory) => {
  const candidateKey = normalizeKey(rawValue);
  for (const options of Object.values(directory || {})) {
    const option = options.find(item => [item.value, item.label, ...(item.aliases || [])]
      .some(alias => normalizeKey(alias) === candidateKey));
    if (option) return option.label;
  }
  return rawValue;
};
