import { currentAgendaMonth, groupCorrespondenceAgenda, loadCorrespondenceAgenda, shiftAgendaMonth, validAgendaDate } from './correspondenceAgendaModel';

const item = (id, changes = {}) => ({ id, subject: `Subject ${id}`, owner: 'Synthetic owner', deadline: { value: '2026-10-19' }, status: 'in_progress', ...changes });
const response = data => ({ success: true, source: 'bigquery', data });

test('accepts real calendar dates and rejects missing or impossible dates', () => {
  expect(validAgendaDate('2026-10-19')).toBe(true);
  for (const value of ['', null, '19.10.2026', '2026-02-30', '2026-13-01']) expect(validAgendaDate(value)).toBe(false);
  expect(validAgendaDate('2028-02-29')).toBe(true);
});

test('uses stored deadlines only and groups sources without duplicating follow-up reviews', async () => {
  const { records } = await loadCorrespondenceAgenda(async () => response([
    ...Array.from({ length: 5 }, (_, i) => item(`COR-${i}`)),
    item('CLOSED', { status: 'closed' }), item('NEXT', { deadline: '2026-11-19' }),
    item('NOTE', { deadline: null, next_action: 'Follow up on 19.10.2026' })
  ]));
  const groups = groupCorrespondenceAgenda(records, '2026-10');
  expect(groups).toHaveLength(1);
  expect(groups[0].records).toHaveLength(5);
  expect(groupCorrespondenceAgenda(records, '2026-10', true)[0].records).toHaveLength(6);
});

test('paginates, adapts BigQuery dates and deduplicates source identifiers', async () => {
  const read = jest.fn().mockResolvedValueOnce(response(Array.from({ length: 200 }, (_, i) => item(`COR-${i}`))))
    .mockResolvedValueOnce(response([item('COR-0', { subject: 'Updated source' }), item('COR-200')]));
  const result = await loadCorrespondenceAgenda(read);
  expect(read.mock.calls).toEqual([[200, 0], [200, 200]]);
  expect(result.partial).toBe(false);
  expect(result.records).toHaveLength(201);
  expect(result.records[0]).toMatchObject({ deadline: '2026-10-19', subject: 'Updated source' });
});

test('marks bounded extracts as partial instead of claiming completeness', async () => {
  const read = jest.fn(async () => response(Array.from({ length: 200 }, (_, i) => item(`COR-${i}`))));
  expect((await loadCorrespondenceAgenda(read)).partial).toBe(true);
  expect(read).toHaveBeenCalledTimes(10);
});

test.each([{ success: false, data: [] }, { success: true, source: 'local', data: [] }, response([{ id: null }])])('fails closed for invalid sources: %j', async value => {
  await expect(loadCorrespondenceAgenda(async () => value)).rejects.toThrow();
});

test('discards cancelled loads', async () => {
  let active = true;
  const read = jest.fn(async () => { active = false; return response([item('COR-1')]); });
  expect(await loadCorrespondenceAgenda(read, () => active)).toBeNull();
});

test('navigates across years and determines the current month in Zurich', () => {
  expect(shiftAgendaMonth('2026-12', 1)).toBe('2027-01');
  expect(shiftAgendaMonth('2026-01', -1)).toBe('2025-12');
  jest.useFakeTimers().setSystemTime(new Date('2026-09-30T23:30:00Z'));
  expect(currentAgendaMonth()).toBe('2026-10');
  jest.useRealTimers();
});
