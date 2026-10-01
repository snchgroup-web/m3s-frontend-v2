const amount = (value, available) => {
  if (available === false || value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

// An incomplete series must remain incomplete regardless of row order.
export function addAnnualAmounts(bucket, key, row) {
  for (const [suffix, value] of [
    ['', amount(row.montantChf, row.montantChfAvailable)],
    ['Cfa', amount(row.montantCfa, row.montantCfaAvailable)],
  ]) {
    const field = `${key}${suffix}`;
    bucket[field] = bucket[field] === null || value === null ? null : bucket[field] + value;
  }
}
