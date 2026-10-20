import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ProductionTools from './ProductionTools';
import { TOOL_ENTRY_PATHS, PRODUCTION_TOOL_IDS } from './productionToolConnections';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';
const mockNavigate = jest.fn();
let mockSearch = '';
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate, useLocation: () => ({ search: mockSearch }) }), { virtual: true });
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: { id: 'synthetic', email: 'qa@example.test' } }) }));
beforeEach(() => { mockSearch = ''; jest.clearAllMocks(); });

test.each(['FR', 'DE', 'EN'])('keeps eight families, five internal entries, two existing external links and one shared task in %s', language => {
  const { container } = render(<ProductionTools language={language}/>);
  expect(container.querySelectorAll('article')).toHaveLength(8);
  expect(screen.getAllByRole('button')).toHaveLength(14);
  fireEvent.click(screen.getByRole('button', { name: /^(Ouvrir|Öffnen|Open) Budget Perso CH$/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith(TOOL_ENTRY_PATHS['budget-perso-ch']);
  fireEvent.click(screen.getByRole('button', { name: /^(Ouvrir|Öffnen|Open) Daily Intelligence Dashboard$/ }));
  expect(mockNavigate).toHaveBeenLastCalledWith(TOOL_ENTRY_PATHS['daily-dashboard']);
  expect(container.textContent).not.toMatch(/C:\\|50000|30000|50 000|30 000/);
  expect(screen.queryByRole('button', { name: /^(Ouvrir|Öffnen|Open) FluxConvert$/ })).not.toBeInTheDocument();
  expect(container.querySelectorAll('details')).toHaveLength(4);
  expect(container.textContent).toContain('0.1.0');
  expect(container.textContent).toContain('SQLite');
  expect(container.textContent).toContain('24');
  expect(container.textContent).not.toContain('file:///');
  expect(screen.getByRole('link', { name: /FluxConvert/ })).toHaveAttribute('href', 'https://fluxconvert-app.vercel.app/fr');
  expect(screen.getByRole('link', { name: /FluxConvert/ })).toHaveAttribute('rel', 'noreferrer');
  expect(screen.getAllByRole('link')).toHaveLength(2);
  expect(container.querySelector('#production-tool-daily-brief a')).toHaveAttribute('href', 'https://chatgpt.com/s/t_6ad5606d2a488191ba1548f9b85daf9b');
  const follow = screen.getAllByRole('button').find(e => /raccordement|Anbindungsaufgabe|connection task/.test(e.textContent));
  fireEvent.click(follow);
  expect(mockNavigate).toHaveBeenLastCalledWith('/account?view=tasks&returnTo=production&taskSearch=TAC-PROD-OUTILS-20261019-001#own-account-top');
});

test.each([['FR', '22-07-26'], ['DE', '22.07.26'], ['EN', '22/07/26']])('opens dated help, one tool at a time, with keyboard return in %s', (language, date) => {
  const { container } = render(<ProductionTools language={language}/>);
  const t = TOOL_FACTS_COPY[language];
  const row = container.querySelector('#production-tool-comparator-avants-fenetres');
  const trigger = within(row).getByRole('button', { name: new RegExp(`^${t.help}`) });
  fireEvent.click(trigger);
  const region = within(row).getByRole('region');
  expect(region).toHaveTextContent(date);
  expect(region).toHaveTextContent(TOOL_FACTS['comparator-avants-fenetres'].makers[language]);
  expect(region).toHaveTextContent(t.effortNote);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const close = within(region).getByRole('button', { name: t.close }); close.focus();
  fireEvent.keyDown(close, { key: 'Escape' });
  expect(container.querySelector('.production-tool-facts')).toBeNull(); expect(trigger).toHaveFocus();
  fireEvent.click(trigger);
  fireEvent.click(within(container.querySelector('#production-tool-fluxconvert')).getByRole('button', { name: new RegExp(`^${t.help}`) }));
  expect(container.querySelectorAll('.production-tool-facts')).toHaveLength(1);
  expect(screen.getByRole('region', { name: new RegExp(`^${t.help}`) })).toHaveTextContent(t.external);
  fireEvent.click(screen.getByRole('button', { name: t.close }));
  expect(container.querySelector('.production-tool-facts')).toBeNull();
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(8);
});

test('each family has translated documentary facts without invented hours or creation dates', () => {
  expect(Object.keys(TOOL_FACTS).sort()).toEqual([...PRODUCTION_TOOL_IDS].sort());
  for (const fact of Object.values(TOOL_FACTS)) {
    for (const key of ['purpose', 'makers', 'systems', 'evidence']) for (const language of ['FR', 'DE', 'EN']) expect(fact[key][language].length).toBeGreaterThan(20);
    for (const [date, kind] of fact.dates) {
      expect(new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10)).toBe(date);
      for (const language of ['FR', 'DE', 'EN']) expect(TOOL_FACTS_COPY[language].kinds[kind]).toBeTruthy();
    }
  }
  expect(TOOL_FACTS.fluxconvert.systems.EN).toContain('not verified as active services');
});

test('opens only the local verified launcher for the comparator without a public source file', () => {
  mockSearch = '?tab=manufacturing&tool=comparator-avants-fenetres';
  const { container } = render(<ProductionTools/>);
  expect(screen.getByRole('heading', { name: 'Comparaison et suivi des offres' })).toBeInTheDocument();
  expect(screen.getByLabelText(/Fichier HTML existant/)).toHaveAttribute('type', 'file');
  expect(screen.getByRole('button', { name: 'Ouvrir la copie locale' })).toBeDisabled();
  expect(container.querySelector('iframe')).toBeNull();
  expect(container.querySelectorAll('#production-tools article')).toHaveLength(8);
  fireEvent.click(screen.getByRole('button', { name: 'Retour à la fiche de l’outil' }));
  expect(mockNavigate).toHaveBeenLastCalledWith('/production?tab=manufacturing#production-tool-comparator-avants-fenetres');
});

test.each([
  ['FR', /publiés à l’identique le 20-10-26/, /sans régénération/, /raccordement contrôlé sur données fictives/],
  ['DE', /am 20.10.26 nach Freigabe unverändert veröffentlicht/, /ohne Neugenerierung/, /Anbindung mit fiktiven Daten geprüft/],
  ['EN', /published unchanged on 20\/10\/26/, /without regeneration/, /connection checked with synthetic data/]
])('qualified facts in %s separate recovery, editorial freshness and the neutral candidate', (language, published, noRegeneration, visual) => {
  const { container } = render(<ProductionTools language={language}/>);
  const daily = container.querySelector('#production-tool-daily-dashboard');
  expect(daily).toHaveTextContent(published);
  expect(daily).toHaveTextContent(noRegeneration);
  expect(daily).not.toHaveTextContent(/HTTP 500/);
  expect(container.querySelector('#production-tool-fluxconvert')).toHaveTextContent('7e1143b');
  expect(container.querySelector('#production-tool-fluxconvert')).toHaveTextContent('PostgreSQL');
  expect(container.querySelector('#production-tool-comparator-avants-fenetres')).toHaveTextContent(visual);
  expect(container.querySelector('#production-tool-comparator-avants-fenetres details')).toHaveTextContent('V0.1/V0.2');
  expect(container.querySelectorAll('.production-tool-row')).toHaveLength(8);
  expect(container.textContent).not.toMatch(/file:\/\/\/|C:\\/);
  expect(TOOL_FACTS['daily-dashboard'].dates).toContainEqual(['2026-10-20', 'recovered']);
  expect(TOOL_FACTS['comparator-avants-fenetres'].dates).toContainEqual(['2026-10-20', 'neutral']);
  expect(TOOL_FACTS.fluxconvert.dates).toContainEqual(['2026-10-20', 'qualified']);
});
