import { taskIndicatorSnapshot, taskCoverageCopy } from './taskIndicator';

test('task counter separates a genuine zero from unavailable or partial coverage', () => {
  expect(taskIndicatorSnapshot(null).stats.total).toBeNull();
  expect(taskIndicatorSnapshot({ success: false, total: 0 }).status).toBe('unavailable');
  expect(taskIndicatorSnapshot({ total: 0, open: 0, completed: 0 }).stats.total).toBe(0);
  expect(taskIndicatorSnapshot({ total: '', open: 0 }).status).toBe('unavailable');
  const historical = taskIndicatorSnapshot({ total: 654, open: 88, completed: 566, coverage: 'historical_only' });
  expect(historical.status).toBe('partial');
  expect(historical.stats.total).toBe(654);
  expect(historical.stats.coverage).toBe('historical_only');
});

test('task counter uses returned server totals, including cancellation, without invented increments', () => {
  const snapshot = taskIndicatorSnapshot({ total: 657, open: 89, completed: 566, blocked: 1, cancelled: 2,
    coverage: 'historical_and_current_account' });
  expect(snapshot.status).toBe('available');
  expect(snapshot.stats).toEqual({ total: 657, open: 89, completed: 566, blocked: 1, cancelled: 2,
    coverage: 'historical_and_current_account' });
  expect(taskIndicatorSnapshot({ total: -1 }).stats.total).toBeNull();
});

test('task counter coverage captions distinguish history from current-account scope in three languages', () => {
  for (const language of ['FR', 'DE', 'EN']) {
    expect(taskCoverageCopy('historical_only', language)).not.toBe('');
    expect(taskCoverageCopy('historical_only', language)).not.toEqual(taskCoverageCopy('historical_and_current_account', language));
    expect(taskCoverageCopy(null, language)).toBe('');
  }
});
