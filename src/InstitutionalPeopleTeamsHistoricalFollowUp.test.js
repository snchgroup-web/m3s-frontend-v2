import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import HistoricalFollowUp from './InstitutionalPeopleTeamsHistoricalFollowUp';
import CategoryDesignation from './InstitutionalPeopleTeamsGateG1RetentionCategoryDesignation';
import OwnersTriggers from './InstitutionalPeopleTeamsGateG1RetentionOwnersTriggers';
import ReviewCases from './InstitutionalPeopleTeamsGateG1RetentionReviewCases';
import ReviewRegister from './InstitutionalPeopleTeamsGateG1RetentionReviewRegister';
import CaseOpeningGates from './InstitutionalPeopleTeamsGateG1RetentionCaseOpeningGates';
import CaseOpeningDecisionSheet from './InstitutionalPeopleTeamsGateG1RetentionCaseOpeningDecisionSheet';
import FirstUseAuthorisationProtocol from './InstitutionalPeopleTeamsGateG1RetentionFirstUseAuthorisationProtocol';
import FirstUseDecisionSheet from './InstitutionalPeopleTeamsGateG1RetentionFirstUseDecisionSheet';

const sheets = [
  ['categories', CategoryDesignation, 'REF-01-DEC-045'],
  ['owners and triggers', OwnersTriggers, '006'],
  ['review cases', ReviewCases, '007'],
  ['review register', ReviewRegister, 'REF-01-DEC-048'],
  ['opening gates', CaseOpeningGates, '009'],
  ['opening decision', CaseOpeningDecisionSheet, 'REF-01-DEC-050'],
  ['first-use protocol', FirstUseAuthorisationProtocol, 'REF-01-DEC-051'],
  ['first-use decision', FirstUseDecisionSheet, 'REF-01-DEC-051']
];

describe.each([
  ['FR', 'Repère historique · étape documentaire', 'Voir l’état courant de REF-01'],
  ['EN', 'Historical milestone · documentary step', 'View the current REF-01 status'],
  ['DE', 'Historischer Stand · Dokumentationsschritt', 'Aktuellen REF-01-Stand ansehen']
])('%s historical follow-ups', (language, label, linkName) => {
  test.each(sheets)('%s points to current status without requesting another decision', (_name, Sheet, reference) => {
    render(<Sheet language={language} />);
    const footer = within(screen.getByTestId('ref01-historical-follow-up'));
    expect(footer.getByText(label)).toBeInTheDocument();
    expect(footer.getByRole('link', { name: linkName })).toHaveAttribute('href', '#institutional-ref01-g1-att-001');
    expect(footer.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByTestId('ref01-historical-follow-up')).toHaveTextContent(reference);
    expect(screen.getByTestId('ref01-historical-follow-up').textContent).not.toMatch(/Prochain arbitrage|Prochaine étape|Next human arbitration|Next step:|Nächster Schritt:/i);
    expect(footer.queryByRole('button')).not.toBeInTheDocument();
    expect(footer.queryByRole('textbox')).not.toBeInTheDocument();
  });
});

test('unsupported language falls back to French and preserves the documentary statement', () => {
  render(<HistoricalFollowUp language="unknown">No execution authorised.</HistoricalFollowUp>);
  expect(screen.getByText('Repère historique · étape documentaire')).toBeInTheDocument();
  expect(screen.getByText('No execution authorised.')).toBeInTheDocument();
});

test('browser Back restores the nested scroll area and keyboard focus without changing the URL context', () => {
  jest.useFakeTimers();
  window.history.replaceState({ idx: 2 }, '', '/?view=program&returnTo=ref01-fasttrack#history');
  const { container } = render(<main style={{ overflowY: 'auto' }}><HistoricalFollowUp>History</HistoricalFollowUp></main>);
  const main = container.querySelector('main');
  const link = screen.getByRole('link');
  main.scrollTop = 950;
  main.scrollLeft = 12;
  fireEvent.click(link);
  expect(window.history.state).toEqual({ idx: 2 });
  main.scrollTop = 100;
  main.scrollLeft = 0;
  act(() => { window.dispatchEvent(new PopStateEvent('popstate')); jest.runOnlyPendingTimers(); });
  expect(main.scrollTop).toBe(950);
  expect(main.scrollLeft).toBe(12);
  expect(link).toHaveFocus();
  expect(window.location.search).toBe('?view=program&returnTo=ref01-fasttrack');
  jest.useRealTimers();
});

test.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }])('modified clicks do not register a return position: %p', modifiers => {
  jest.useFakeTimers();
  const { container } = render(<main style={{ overflowY: 'auto' }}><HistoricalFollowUp>History</HistoricalFollowUp></main>);
  const main = container.querySelector('main');
  main.scrollTop = 950;
  fireEvent.click(screen.getByRole('link'), modifiers);
  main.scrollTop = 100;
  act(() => { window.dispatchEvent(new PopStateEvent('popstate')); jest.runOnlyPendingTimers(); });
  expect(main.scrollTop).toBe(100);
  jest.useRealTimers();
});

test('unmount cancels a pending restoration', () => {
  jest.useFakeTimers();
  const { container, unmount } = render(<main style={{ overflowY: 'auto' }}><HistoricalFollowUp>History</HistoricalFollowUp></main>);
  const main = container.querySelector('main');
  main.scrollTop = 950;
  fireEvent.click(screen.getByRole('link'));
  main.scrollTop = 100;
  act(() => window.dispatchEvent(new PopStateEvent('popstate')));
  unmount();
  act(() => jest.runOnlyPendingTimers());
  expect(main.scrollTop).toBe(100);
  jest.useRealTimers();
});

test('only the last activated sheet restores position, including visits in reverse DOM order', () => {
  jest.useFakeTimers();
  window.history.replaceState(null, '', '/?view=program');
  const { container } = render(<main style={{ overflowY: 'auto' }}><HistoricalFollowUp>First</HistoricalFollowUp><HistoricalFollowUp>Second</HistoricalFollowUp></main>);
  const main = container.querySelector('main');
  const links = screen.getAllByRole('link');
  main.scrollTop = 950;
  fireEvent.click(links[1]);
  main.scrollTop = 400;
  fireEvent.click(links[0]);
  main.scrollTop = 100;
  act(() => { window.dispatchEvent(new PopStateEvent('popstate')); jest.runOnlyPendingTimers(); });
  expect(main.scrollTop).toBe(400);
  expect(links[0]).toHaveFocus();
  window.history.replaceState(null, '', '/?view=resources');
  main.scrollTop = 10;
  act(() => { window.dispatchEvent(new PopStateEvent('popstate')); jest.runOnlyPendingTimers(); });
  expect(main.scrollTop).toBe(10);
  jest.useRealTimers();
});
