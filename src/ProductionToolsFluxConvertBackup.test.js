import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductionTools from './ProductionTools';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn(), useLocation: () => ({ search: '' }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));

test.each([['FR', '22-10-26'], ['DE', '22.10.26'], ['EN', '22/10/26']])('verified backup coverage and remaining limits render in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  expect(row).toHaveTextContent(/PC-?\/USB/);
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  expect(help).toHaveTextContent(TOOL_FACTS.fluxconvert.protections[language][4]);
  expect(help).toHaveTextContent('f616e00');
  expect(help).toHaveTextContent('153');
  expect(help).toHaveTextContent('12');
  expect(help).toHaveTextContent(TOOL_FACTS.fluxconvert.limits[language][2]);
  const milestone = within(help).getByText(TOOL_FACTS_COPY[language].kinds.backup, { exact: false });
  expect(milestone).toHaveTextContent(date);
  expect(milestone.querySelector('time')).toHaveAttribute('datetime', '2026-10-22');
  expect(help.textContent).not.toMatch(/FLUXCONVERT-APP-|LOCALAPPDATA|C:\\|D:\/|\.tar\.gpg|\.env|postgres(?:ql)?:\/\//i);
});

test.each(['FR', 'DE', 'EN'])('the %s backup update does not imply current SQL or complete SaaS recovery', language => {
  const limits = TOOL_FACTS.fluxconvert.limits[language][2];
  expect(limits).toContain('20');
  expect(limits).toContain('SQL');
  expect(limits).toMatch(/cloud|Cloud/);
  expect(limits).toMatch(/planificateur|Scheduler|scheduler/);
  expect(limits).toMatch(/non récupérés|fehlen|unrecovered/);
  expect(limits).toMatch(/non vérifié égal|nicht.*abgeglichen|not verified equal/);
  for (const [id, fact] of Object.entries(TOOL_FACTS)) {
    if (id !== 'fluxconvert') expect(fact.dates.some(([, kind]) => kind === 'backup')).toBe(false);
  }
});
