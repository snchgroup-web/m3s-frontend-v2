// Reused unchanged from outil-salaire/core.cjs: calendar, duration and append-only merge.
export function previousMonth(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('DATE_INVALID');
  const parsed = new Date(`${date}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error('DATE_INVALID');
  parsed.setUTCDate(1);
  parsed.setUTCMonth(parsed.getUTCMonth() - 1);
  return parsed.toISOString().slice(0, 7);
}

export function workMinutes(start, end, pause, overnight) {
  const valid = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  if (!valid(start) || !valid(end)) throw new Error('Indique les heures de début et de fin.');
  const minutes = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
  const span = minutes(end) - minutes(start) + (overnight ? 1440 : 0);
  if (span <= 0 || span > 1440) throw new Error('Vérifie les horaires et la case « Fin le lendemain ».');
  if (!Number.isSafeInteger(pause) || pause < 0 || pause >= span) throw new Error('La pause doit être inférieure à la durée de présence.');
  return span - pause;
}

export function workInterval(entry) {
  previousMonth(entry.date);
  const duration = workMinutes(entry.start, entry.end, entry.pause, entry.overnight);
  const start = Date.parse(`${entry.date}T${entry.start}:00Z`);
  return { start, end: start + (duration + entry.pause) * 60000 };
}

export function mergeWorkEntries(existing, incoming) {
  const result = [...existing];
  let skipped = 0;
  const slot = entry => `${entry.date}|${entry.start}|${entry.end}|${entry.overnight}`;
  for (const candidate of incoming) {
    const interval = workInterval(candidate);
    const sameId = candidate.id && result.find(entry => entry.id === candidate.id);
    const duplicate = result.find(entry => slot(entry) === slot(candidate));
    if (sameId && (slot(sameId) !== slot(candidate) || sameId.pause !== candidate.pause)) throw new Error('Le fichier contient une autre version d’une saisie existante. Rien n’a été remplacé.');
    if (duplicate) {
      if (duplicate.pause !== candidate.pause) throw new Error('Ces horaires existent avec une autre pause. Modifie la saisie existante ; rien n’a été remplacé.');
      skipped += 1;
      continue;
    }
    if (result.some(entry => {
      const other = workInterval(entry);
      return interval.start < other.end && interval.end > other.start;
    })) throw new Error('Ces horaires chevauchent une saisie existante, éventuellement la nuit précédente. Vérifie les horaires.');
    result.push(candidate);
  }
  return { entries: result, skipped };
}
