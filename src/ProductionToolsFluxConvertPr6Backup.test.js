import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import ProductionTools from './ProductionTools';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';
import { TOOL_SOURCE_REFERENCES } from './productionToolConnections';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn(), useLocation: () => ({ search: '' }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));

test.each([['FR', '23-10-26'], ['DE', '23.10.26'], ['EN', '23/10/26']])('PR6 backup evidence is current and readable in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  expect(row).toHaveTextContent('PR 6');
  expect(row).toHaveTextContent('55f987c');
  expect(row).toHaveTextContent(date);
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  expect(help).toHaveTextContent(TOOL_FACTS.fluxconvert.protections[language][4]);
  for (const value of ['AES-256', '158', '14', '16']) expect(help).toHaveTextContent(value);
  const milestone = within(help).getByText(TOOL_FACTS_COPY[language].kinds.backup, { exact: false });
  expect(milestone.querySelector('time')).toHaveAttribute('datetime', '2026-10-23');
  expect(milestone).toHaveTextContent(date);
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('Git 55f987c / PR 6');
});

test.each(['FR', 'DE', 'EN'])('PR6 code coverage does not hide the %s cloud and SQL boundaries', language => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  const limit = TOOL_FACTS.fluxconvert.limits[language][2];
  expect(help).toHaveTextContent(limit);
  expect(limit).toMatch(/SQL.*20/);
  expect(limit).toMatch(/planificateur|Scheduler|scheduler/);
  expect(limit).toMatch(/non récupérés|fehlen|unrecovered/);
  expect(limit).toMatch(/non vérifié égal|nicht.*abgeglichen|not verified equal/);
  expect(row.textContent).not.toMatch(/FLUXCONVERT-APP-|LOCALAPPDATA|C:\\|D:\/|\.tar\.gpg|\.env|postgres(?:ql)?:\/\//i);
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(8);
});
