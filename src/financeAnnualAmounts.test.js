import { addAnnualAmounts } from './financeAnnualAmounts';

test('unknown equivalents never become zero or inferred conversions', () => {
  const bucket = { recettes: 0, recettesCfa: 0 };
  addAnnualAmounts(bucket, 'recettes', { montantChf: 2, montantCfa: null, tauxFx: 700 });
  addAnnualAmounts(bucket, 'recettes', { montantChf: 3, montantCfa: 2100 });
  expect(bucket).toEqual({ recettes: 5, recettesCfa: null });
});

test('missing CHF does not hide known CFA, and explicit zero stays zero', () => {
  const bucket = { depenses: 0, depensesCfa: 0 };
  addAnnualAmounts(bucket, 'depenses', { montantChf: 0, montantCfa: 0 });
  expect(bucket).toEqual({ depenses: 0, depensesCfa: 0 });
  addAnnualAmounts(bucket, 'depenses', { montantChf: 0, montantChfAvailable: false, montantCfa: 100 });
  expect(bucket).toEqual({ depenses: null, depensesCfa: 100 });
});
