import { BUDGET_MAX_REVISION, isBudgetValid, parseBudgetFile } from './financeBudgetModel';

export const isBudgetServerId = value => typeof value === 'string'
  && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export const isBudgetServerRecord = value => value && isBudgetServerId(value.id)
  && Number.isInteger(value.version) && value.version >= 1 && value.version <= BUDGET_MAX_REVISION
  && value.scope === 'organization' && value.status === 'draft' && value.access === 'owner-only';
export const readBudgetServerRecord = payload => {
  const record = payload?.data;
  if (payload?.success !== true || !isBudgetServerRecord(record) || !isBudgetValid(record.budget)) throw new Error('Invalid budget response');
  const budget = parseBudgetFile(JSON.stringify({ schema: 'm3s-budget-draft', version: 1,
    scope: 'organization', status: 'draft', budget: record.budget }));
  return { budget, remote: { id: record.id, version: record.version, snapshot: JSON.stringify(budget) } };
};
export const readBudgetServerList = payload => {
  if (payload?.success !== true || !Array.isArray(payload.data) || payload.data.length > 20
    || typeof payload.hasMore !== 'boolean' || new Set(payload.data.map(r => r?.id)).size !== payload.data.length
    || !payload.data.every(r => isBudgetServerRecord(r) && typeof r.title === 'string' && r.title.length <= 120
      && typeof r.entity === 'string' && r.entity.length <= 120 && typeof r.year === 'string' && /^\d{4}$/.test(r.year))) {
    throw new Error('Invalid budget list');
  }
  return payload;
};
