import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ProductionTools from './ProductionTools';
import ProductionToolFacts from './ProductionToolFacts';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';
import { TOOL_SOURCE_REFERENCES } from './productionToolConnections';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn(), useLocation: () => ({ search: '' }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));

test.each([['FR', '22-10-26'], ['DE', '22.10.26'], ['EN', '22/10/26']])('FluxConvert displays the verified policy separately from its limits in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  const t = TOOL_FACTS_COPY[language];
  expect(row).toHaveTextContent('f616e00');
  expect(row).toHaveTextContent(date);
  expect(row).toHaveTextContent('7e1143b');
  expect(row).toHaveTextContent('SQLite');
  fireEvent.click(within(row).getByRole('button', { name: `${t.help} : FluxConvert` }));
  const help = within(row).getByRole('region');
  for (const field of ['protections', 'limits']) {
    const section = within(help).getByText(t[field], { exact: true }).parentElement;
    expect(within(section).getAllByRole('listitem')).toHaveLength(4);
    for (const text of TOOL_FACTS.fluxconvert[field][language]) expect(section).toHaveTextContent(text);
  }
  expect(help).toHaveTextContent('FRA1');
  expect(help).toHaveTextContent('Cheikh');
  expect(help).toHaveTextContent('2SG');
  expect(help).toHaveTextContent('24');
  expect(help).toHaveTextContent('30');
  expect(help).toHaveTextContent(TOOL_FACTS_COPY[language].effortNote);
  expect(help.querySelector('time[datetime="2026-10-22"]')).toHaveTextContent(date);
  expect(within(row).getByRole('link')).toHaveAttribute('href', 'https://fluxconvert-app.vercel.app/fr');
  expect(within(row).getByRole('link')).toHaveAttribute('target', '_blank');
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(8);
  expect(TOOL_SOURCE_REFERENCES.fluxconvert).toContain('Git f616e00');
});

test.each(['FR', 'DE', 'EN'])('the %s card excludes secrets, private paths and obsolete unqualified claims', language => {
  const { container } = render(<ProductionTools language={language} />);
  const row = container.querySelector('#production-tool-fluxconvert');
  fireEvent.click(within(row).getByRole('button', { name: `${TOOL_FACTS_COPY[language].help} : FluxConvert` }));
  expect(row.textContent).not.toMatch(/C:\\|D:\/|LOCALAPPDATA|\.tar\.gpg|cloud-values\.json|postgres(?:ql)?:\/\/|prisma\+postgres:\/\//i);
  expect(row.textContent).not.toMatch(/Auteur initial et droits à qualifier|Ursprüngliche Urheberschaft und Rechte offen|Original authorship and rights remain open/);
  expect(row.textContent).not.toMatch(/conservation applicative encore à qualifier|function region and application retention remain open|Anwendungsaufbewahrung offen/);
  expect(within(row).getByRole('region')).toHaveTextContent(TOOL_FACTS.fluxconvert.limits[language][2]);
  expect(within(row).getByRole('region')).toHaveTextContent(TOOL_FACTS.fluxconvert.protections[language][2]);
});

test('optional protections and limits do not add sections to other tool facts', () => {
  const { container } = render(<ProductionToolFacts toolId="fx" name="FX" onClose={() => {}} />);
  expect(screen.queryByText(TOOL_FACTS_COPY.FR.protections)).not.toBeInTheDocument();
  expect(screen.queryByText(TOOL_FACTS_COPY.FR.limits)).not.toBeInTheDocument();
  expect(container.querySelectorAll('dl > div')).toHaveLength(5);
});
