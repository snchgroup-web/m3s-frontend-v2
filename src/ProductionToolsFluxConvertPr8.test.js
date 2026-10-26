import React from 'react';
import { createHash } from 'crypto';
import { fireEvent, render, within } from '@testing-library/react';
import ProductionTools from './ProductionTools';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';
import { PRODUCTION_TOOL_IDS, TOOL_SOURCE_REFERENCES } from './productionToolConnections';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn(), useLocation: () => ({ search: '' }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));

const preservedPolicies = {
  "FR": "a52e8d5f26bf5df76abf89d98ad9bf8e037572e0b6c946c9baff0862062f6d60",
  "DE": "4a21e4161d0a2de052c8da8fd576b17016bc10d542e041b6bdb4078088b5d772",
  "EN": "484db3af0e15f59fe48caf8d672bf0d4b96afb34f45bfbf468c3b24eabd4427e"
};
const otherToolsHash = '7017bb98749b2d40addda515e587fdf8606e17e211c86b0545563eb47abe2f5e';
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test.each([['FR', '26-10-26'], ['DE', '26.10.26'], ['EN', '26/10/26']])('PR 8 milestones and current version render in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  expect(row).toHaveTextContent('PR 8');
  expect(row).toHaveTextContent('2adde7e');
  expect(row).toHaveTextContent(date);
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  for (const kind of ['pr8Release', 'pr8CodeBackup']) {
    const milestone = within(help).getByText(TOOL_FACTS_COPY[language].kinds[kind], { exact: false });
    expect(milestone.querySelector('time')).toHaveAttribute('datetime', '2026-10-26');
    expect(milestone).toHaveTextContent(date);
  }
  expect(within(row).getByRole('link')).toHaveAttribute('href', 'https://fluxconvert-app.vercel.app/fr');
  expect(within(row).getByRole('link')).toHaveAttribute('target', '_blank');
});

test.each(['FR', 'DE', 'EN'])('PR 8 code backup has a bounded scope in %s', language => {
  const fact = TOOL_FACTS.fluxconvert;
  const release = fact.protections[language][7];
  const backup = fact.protections[language][8];
  expect(release).toMatch(/PR 8.*2adde7e/);
  expect(release).toContain('FR/DE/EN');
  for (const value of ['AES-256', '192', 'USB']) expect(backup).toContain(value);
  expect(backup).toMatch(/isolée|isolierten|isolated/);
  expect(fact.limits[language][4]).toContain('.env');
  expect(fact.limits[language][4]).toContain('SQL');
  expect(fact.limits[language][4]).toMatch(/après l’archive|Nach dem Archiv|after the archive/);
  expect(fact.limits[language][4]).toMatch(/partagé ou public activé|gemeinsames oder öffentliches OCR aktiviert|shared or public OCR activated/);
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('Git 2adde7e / PR 8');
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('B21 / Git 25872a2 / PR 7');
});

test.each(['FR', 'DE', 'EN'])('the %s delta preserves historic policies, other tools and private evidence boundaries', language => {
  const fact = TOOL_FACTS.fluxconvert;
  expect(hash({ protections: fact.protections[language].slice(0, 7), limits: fact.limits[language].slice(0, 4), dates: fact.dates.slice(0, 8) })).toBe(preservedPolicies[language]);
  expect(hash(Object.fromEntries(Object.entries(TOOL_FACTS).filter(([id]) => id !== 'fluxconvert')))).toBe(otherToolsHash);
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(PRODUCTION_TOOL_IDS.length);
  expect(container.querySelectorAll('#production-tool-fluxconvert')).toHaveLength(1);
  expect(row.textContent).not.toMatch(/LOCAL-OUTILS-DOCS-|LOCALAPPDATA|[CD]:|\.tar\.gpg|postgres(?:ql)?:\/\//);
  expect(TOOL_FACTS.fluxconvert.dates).toHaveLength(10);
});

