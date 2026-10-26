import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import ProductionTools from './ProductionTools';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';
import { PRODUCTION_TOOL_IDS, TOOL_SOURCE_REFERENCES } from './productionToolConnections';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn(), useLocation: () => ({ search: '' }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));

test.each([['FR', '26-10-26'], ['DE', '26.10.26'], ['EN', '26/10/26']])('B21 publication and backup milestones render in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  expect(row).toHaveTextContent('B21');
  expect(row).toHaveTextContent('PR 7');
  expect(row).toHaveTextContent('25872a2');
  expect(row).toHaveTextContent(date);
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  for (const kind of ['b21Release', 'b21Backup']) {
    const milestone = within(help).getByText(TOOL_FACTS_COPY[language].kinds[kind], { exact: false });
    expect(milestone.querySelector('time')).toHaveAttribute('datetime', '2026-10-26');
    expect(milestone).toHaveTextContent(date);
  }
  expect(within(row).getByRole('link')).toHaveAttribute('href', 'https://fluxconvert-app.vercel.app/fr');
  expect(within(row).getByRole('link')).toHaveAttribute('target', '_blank');
});

test.each(['FR', 'DE', 'EN'])('B21 backup scope remains distinct from historic Git and cloud recovery in %s', language => {
  const fact = TOOL_FACTS.fluxconvert;
  const backup = fact.protections[language][6];
  for (const value of ['AES-256', '862', '193', '5']) expect(backup).toContain(value);
  for (const value of ['158', '14', '16', '55f987c']) expect(fact.protections[language][4]).toContain(value);
  expect(fact.protections[language][5]).toContain('25872a2');
  expect(fact.protections[language][5]).toContain('PR 7');
  expect(fact.limits[language][2]).toMatch(/SQL.*20/);
  expect(fact.limits[language][2]).toMatch(/planificateur|Scheduler|scheduler/);
  expect(fact.limits[language][3]).toMatch(/partagé et public non activé|gemeinsames und öffentliches OCR nicht aktiviert|shared and public OCR not activated/);
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('B21 / Git 25872a2 / PR 7');
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('Git 55f987c / PR 6');
});

test.each(['FR', 'DE', 'EN'])('the %s update keeps one tool entry and private backup evidence private', language => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(PRODUCTION_TOOL_IDS.length);
  expect(container.querySelectorAll('#production-tool-fluxconvert')).toHaveLength(1);
  expect(row.textContent).not.toMatch(/LOCAL-OUTILS-DOCS-|LOCALAPPDATA|[CD]:|\.tar\.gpg|postgres(?:ql)?:\/\//);
  expect(TOOL_FACTS.fluxconvert.dates).toContainEqual(['2026-10-23', 'backup']);
  expect(TOOL_FACTS.fluxconvert.dates).toHaveLength(10);
});
