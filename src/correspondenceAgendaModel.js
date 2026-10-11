import { correspondenceFromApi } from './administrationRegistryAdapters';

const PAGE_SIZE = 200;
const MAX_PAGES = 10;

export const validAgendaDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const loadCorrespondenceAgenda = async (readPage, isActive = () => true) => {
  const records = new Map();
  for (let page = 0; page < MAX_PAGES; page += 1) {
    if (!isActive()) return null;
    const response = await readPage(PAGE_SIZE, page * PAGE_SIZE);
    if (!isActive()) return null;
    if (response?.success !== true || response.source !== 'bigquery' || !Array.isArray(response.data)) {
      throw new Error('Invalid correspondence source');
    }
    for (const item of response.data) {
      if (typeof item?.id !== 'string' || !item.id) throw new Error('Invalid correspondence identifier');
      records.set(item.id, correspondenceFromApi(item));
    }
    if (response.data.length < PAGE_SIZE) return { records: [...records.values()], partial: false };
  }
  return { records: [...records.values()], partial: true };
};

export const groupCorrespondenceAgenda = (records, month, includeClosed = false) => {
  const groups = new Map();
  for (const item of records) {
    if (!validAgendaDate(item.deadline) || !item.deadline.startsWith(`${month}-`) || (!includeClosed && item.statusIndex === 3)) continue;
    const key = JSON.stringify([item.deadline, item.owner]);
    if (!groups.has(key)) groups.set(key, { date: item.deadline, owner: item.owner, records: [] });
    groups.get(key).records.push(item);
  }
  return [...groups.values()].sort((a, b) => a.date.localeCompare(b.date) || a.owner.localeCompare(b.owner));
};

export const currentAgendaMonth = () => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit' }).formatToParts(new Date());
  return `${parts.find(part => part.type === 'year').value}-${parts.find(part => part.type === 'month').value}`;
};

export const shiftAgendaMonth = (month, delta) => {
  const date = new Date(`${month}-01T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + delta);
  return date.toISOString().slice(0, 7);
};
