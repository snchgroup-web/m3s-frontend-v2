import React from 'react';
import { render, screen } from '@testing-library/react';
import PlanningOverview from './PlanningOverview';
jest.mock('./GlossaryHelp', () => () => null);
jest.mock('./InternalSectionNav', () => () => null);
jest.mock('./ProjectMinimumMethod', () => () => null);
const refs = enabled => ({execution_catalogue_ready:true,writes_enabled:enabled,choices:{phases:[1,2,3,4].map(n=>({id:`phase-${n}`,label:`Phase ${n}`}))}});
test.each([['FR','Écriture activée · compte courant'],['DE','Schreiben aktiviert · aktuelles Konto'],['EN','Writing enabled · current account']])('uses real registration readiness in %s', (language, label) => {
  render(<PlanningOverview language={language} taskReferences={refs(true)} />);
  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByText('1. Phase 1')).toBeInTheDocument();
  expect(screen.getByText('4. Phase 4')).toBeInTheDocument();
  expect(screen.queryByText(/Cadré · non enregistré en base/)).not.toBeInTheDocument();
});
test('registered references do not imply write activation', () => {
  render(<PlanningOverview taskReferences={refs(false)} />);
  expect(screen.getByText(/Références enregistrées · Écriture non activée/)).toBeInTheDocument();
});
