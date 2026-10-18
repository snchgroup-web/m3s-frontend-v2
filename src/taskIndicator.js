export const taskCoverageCopy = (coverage, language = 'FR') => {
  const copy = {
    FR: { historical_only: 'Historique seul · tâches du compte indisponibles', historical_and_current_account: 'Historique + tâches du compte courant' },
    DE: { historical_only: 'Nur Historie · Kontoaufgaben nicht verfügbar', historical_and_current_account: 'Historie + Aufgaben des aktuellen Kontos' },
    EN: { historical_only: 'Historical tasks only · account tasks unavailable', historical_and_current_account: 'History + current-account tasks' }
  };
  return (copy[language] || copy.FR)[coverage] || '';
};

export const taskIndicatorSnapshot = result => {
  const number = value => value !== null && value !== undefined && value !== ''
    && Number.isSafeInteger(Number(value)) && Number(value) >= 0 ? Number(value) : null;
  const total = result?.success === false ? null : number(result?.total);
  return {
    status: total === null ? 'unavailable' : result?.coverage === 'historical_only' ? 'partial' : 'available',
    stats: {
      total,
      open: total === null ? null : number(result?.open),
      completed: total === null ? null : number(result?.completed),
      blocked: total === null ? null : number(result?.blocked),
      cancelled: total === null ? null : number(result?.cancelled),
      coverage: result?.coverage || null
    }
  };
};
