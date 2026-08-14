export const RESOURCE_FAMILIES = [
  'legal_regulatory',
  'institution_governance',
  'processes_methods',
  'planning_projects'
];
export const RESOURCE_SOURCE_STATUSES = ['official', 'governed_internal', 'to_qualify'];
export const RESOURCE_REVIEW_STATUSES = ['controlled', 'to_review', 'to_complete'];
export const RESOURCE_CONFIDENTIALITY = ['public', 'internal', 'restricted'];

export const CORRESPONDENCE_DIRECTIONS = ['incoming', 'outgoing', 'internal'];
export const CORRESPONDENCE_CHANNELS = ['whatsapp', 'email', 'paper', 'form', 'hand_delivery'];
export const CORRESPONDENCE_CATEGORIES = ['human_resources', 'institutional', 'supplier', 'legal', 'project'];
export const CORRESPONDENCE_CONFIDENTIALITY = ['public', 'internal', 'restricted_hr', 'confidential'];
export const CORRESPONDENCE_STATUSES = ['to_qualify', 'to_file_dms', 'in_progress', 'closed'];

const indexOf = (values, value, fallback = 0) => {
  const index = values.indexOf(value);
  return index >= 0 ? index : fallback;
};

const dateValue = value => {
  if (value && typeof value === 'object' && 'value' in value) return value.value;
  return value || '';
};

export const resourceFromApi = item => ({
  id: item.id,
  title: item.title || '',
  familyIndex: indexOf(RESOURCE_FAMILIES, item.family),
  authority: item.authority || '',
  location: item.location || '',
  statusIndex: indexOf(RESOURCE_SOURCE_STATUSES, item.source_status, 2),
  reviewIndex: indexOf(RESOURCE_REVIEW_STATUSES, item.review_status, 2),
  confidentialityIndex: indexOf(RESOURCE_CONFIDENTIALITY, item.confidentiality, 1),
  note: item.note || '',
  sourceKind: 'backend'
});

export const resourceToApi = item => ({
  title: item.title.trim(),
  family: RESOURCE_FAMILIES[item.familyIndex] || RESOURCE_FAMILIES[0],
  authority: item.authority.trim(),
  location: item.location.trim(),
  source_status: RESOURCE_SOURCE_STATUSES[item.statusIndex] || RESOURCE_SOURCE_STATUSES[2],
  review_status: RESOURCE_REVIEW_STATUSES[item.reviewIndex] || RESOURCE_REVIEW_STATUSES[2],
  confidentiality: RESOURCE_CONFIDENTIALITY[item.confidentialityIndex] || RESOURCE_CONFIDENTIALITY[1],
  note: item.note.trim()
});

export const correspondenceFromApi = item => ({
  id: item.id,
  date: dateValue(item.receipt_date),
  directionIndex: indexOf(CORRESPONDENCE_DIRECTIONS, item.direction),
  channelIndex: indexOf(CORRESPONDENCE_CHANNELS, item.channel, 1),
  sender: item.sender || '',
  recipient: item.recipient || '',
  subject: item.subject || '',
  categoryIndex: indexOf(CORRESPONDENCE_CATEGORIES, item.category, 1),
  confidentialityIndex: indexOf(CORRESPONDENCE_CONFIDENTIALITY, item.confidentiality, 1),
  person: item.linked_person_or_case || '',
  ged: item.ged_reference || '',
  evidence: item.receipt_evidence_reference || '',
  owner: item.owner || '',
  next: item.next_action || '',
  statusIndex: indexOf(CORRESPONDENCE_STATUSES, item.status),
  deadline: dateValue(item.deadline),
  sourceKind: 'backend'
});

export const correspondenceToApi = item => ({
  receipt_date: item.date,
  direction: CORRESPONDENCE_DIRECTIONS[item.directionIndex] || CORRESPONDENCE_DIRECTIONS[0],
  channel: CORRESPONDENCE_CHANNELS[item.channelIndex] || CORRESPONDENCE_CHANNELS[1],
  sender: item.sender.trim(),
  recipient: item.recipient.trim(),
  subject: item.subject.trim(),
  category: CORRESPONDENCE_CATEGORIES[item.categoryIndex] || CORRESPONDENCE_CATEGORIES[1],
  confidentiality: CORRESPONDENCE_CONFIDENTIALITY[item.confidentialityIndex] || CORRESPONDENCE_CONFIDENTIALITY[1],
  linked_person_or_case: item.person.trim(),
  ged_reference: item.ged.trim(),
  receipt_evidence_reference: item.evidence.trim(),
  owner: item.owner.trim(),
  next_action: item.next.trim(),
  status: CORRESPONDENCE_STATUSES[item.statusIndex] || CORRESPONDENCE_STATUSES[0],
  deadline: item.deadline || ''
});

export const isDemoSession = token => String(token || '').startsWith('demo_session_');
