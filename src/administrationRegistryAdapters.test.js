import {
  correspondenceFromApi,
  correspondenceToApi,
  isDemoSession,
  resourceFromApi,
  resourceToApi
} from './administrationRegistryAdapters';

test('maps resource metadata without document content', () => {
  const form = resourceFromApi({
    id: 'RES-1', title: 'Source', family: 'legal_regulatory', authority: '2SG',
    location: 'GED/LEGAL', source_status: 'official', review_status: 'controlled',
    confidentiality: 'internal', note: 'Reference only'
  });
  expect(resourceToApi(form)).toEqual({
    title: 'Source', family: 'legal_regulatory', authority: '2SG', location: 'GED/LEGAL',
    source_status: 'official', review_status: 'controlled', confidentiality: 'internal',
    note: 'Reference only'
  });
});

test('maps BigQuery dates and correspondence metadata only', () => {
  const form = correspondenceFromApi({
    id: 'COR-1', receipt_date: { value: '2026-08-14' }, direction: 'incoming',
    channel: 'whatsapp', sender: 'A', recipient: 'B', subject: 'CV reçu',
    category: 'human_resources', confidentiality: 'restricted_hr',
    linked_person_or_case: 'Dossier RH', ged_reference: 'GED-1',
    receipt_evidence_reference: 'PREUVE-1', owner: 'RH', next_action: 'Classer',
    status: 'to_file_dms', deadline: null
  });
  expect(form.date).toBe('2026-08-14');
  expect(correspondenceToApi(form)).toMatchObject({
    receipt_date: '2026-08-14', channel: 'whatsapp', confidentiality: 'restricted_hr',
    ged_reference: 'GED-1', deadline: ''
  });
  expect(correspondenceToApi(form)).not.toHaveProperty('file');
});

test('identifies local demonstration sessions', () => {
  expect(isDemoSession('demo_session_123')).toBe(true);
  expect(isDemoSession('jwt-token')).toBe(false);
});

test.each([undefined, null, '', 'unknown'])('keeps a missing or unknown correspondence direction unqualified (%s)', direction => {
  expect(correspondenceFromApi({ direction }).directionIndex).toBe(-1);
});

test.each([['incoming', 0], ['outgoing', 1], ['internal', 2]])('keeps established correspondence direction %s unchanged', (direction, index) => {
  expect(correspondenceFromApi({ direction }).directionIndex).toBe(index);
});
