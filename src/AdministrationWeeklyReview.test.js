import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import AdministrationWeeklyReview from './AdministrationWeeklyReview';
import { W35_SOURCES, WEEKLY_REVIEW_W35 } from './administrationWeeklyReviewW35';

test.each(['FR', 'EN', 'DE'])('shows the bounded W35 synthesis and seven source references in %s', language => {
  const copy = WEEKLY_REVIEW_W35[language];
  render(<AdministrationWeeklyReview language={language} />);
  expect(screen.getByRole('heading', { name: copy.title })).toBeInTheDocument();
  expect(screen.getByText(copy.intro)).toBeInTheDocument();
  expect(screen.getByText(copy.coverageValue)).toBeInTheDocument();
  expect(screen.getByText(copy.gedStatus)).toBeInTheDocument();
  expect(screen.getByText(copy.promotionRule)).toBeInTheDocument();
  copy.results.forEach(result => expect(screen.getByText(result)).toBeInTheDocument());
  copy.resultReferences.forEach(reference => expect(screen.getByText(reference)).toBeInTheDocument());
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  W35_SOURCES.forEach(source => {
    expect(screen.getByText(source.file)).toBeInTheDocument();
    source.sections.forEach(section => expect(screen.getByText(section)).toBeInTheDocument());
  });
});

test('preserves the original pilot and its missing-day warning without mixing sources', () => {
  render(<AdministrationWeeklyReview />);
  const select = screen.getByRole('combobox', { name: 'Période de la revue' });
  fireEvent.click(screen.getByRole('button'));
  fireEvent.change(select, { target: { value: '2026-W33' } });
  expect(screen.getByRole('heading', { name: 'Revue hebdomadaire du 10 au 15 août 2026' })).toBeInTheDocument();
  expect(screen.getByText('3 journaux disponibles · 3 journées sans journal')).toBeInTheDocument();
  expect(screen.getByText(/11, 12 et 13 août : l’absence de journal/)).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('M3S_JOURNAL_DE_BORD_2026-08-10.md')).toBeInTheDocument();
  expect(screen.queryByText('M3S_JOURNAL_DE_BORD_2026-08-30.md')).not.toBeInTheDocument();
  fireEvent.change(select, { target: { value: '2026-W35' } });
  expect(screen.getByRole('heading', { name: WEEKLY_REVIEW_W35.FR.title })).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('M3S_JOURNAL_DE_BORD_2026-08-10.md')).not.toBeInTheDocument();
});

test('keeps the selected period and open source panel across language changes', () => {
  const view = render(<AdministrationWeeklyReview />);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2026-W33' } });
  fireEvent.click(screen.getByRole('button'));
  view.rerender(<AdministrationWeeklyReview language="DE" />);
  expect(screen.getByRole('combobox', { name: 'Zeitraum des Rückblicks' })).toHaveValue('2026-W33');
  expect(screen.getByText('M3S_JOURNAL_DE_BORD_2026-08-10.md')).toBeInTheDocument();
  view.rerender(<AdministrationWeeklyReview language="EN" />);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2026-W35' } });
  expect(screen.getByRole('heading', { name: WEEKLY_REVIEW_W35.EN.title })).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
});

test('preserves the existing arrival anchor as a focusable section', () => {
  render(<AdministrationWeeklyReview />);
  const target = document.getElementById('weekly-review-title');
  expect(target).toHaveClass('scroll-mt-24');
  target.focus();
  expect(target).toHaveFocus();
  expect(within(target).getByRole('heading', { name: WEEKLY_REVIEW_W35.FR.title })).toBeInTheDocument();
});

test('keeps the source inventory bounded and the financial/operational claims absent', () => {
  expect(W35_SOURCES.map(source => source.date)).toEqual([
    '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28', '2026-08-29', '2026-08-30'
  ]);
  Object.values(WEEKLY_REVIEW_W35).forEach(copy => {
    expect(copy.sources).toHaveLength(7);
    expect(copy.results).toHaveLength(copy.resultReferences.length);
    expect(copy.indicators.map(([, value]) => value)).toEqual(['7', '0', '22', '13']);
    expect(copy.gedPath).toContain('W35-PILOTE');
    expect(copy.results.join(' ')).not.toMatch(/PGM-DEC-017|ATT-001|M3S-INB-002/);
  });
});

test('falls back to French for an unsupported interface language', () => {
  render(<AdministrationWeeklyReview language="XX" />);
  expect(screen.getByRole('heading', { name: WEEKLY_REVIEW_W35.FR.title })).toBeInTheDocument();
});
