import React from 'react';
import {render, screen, within} from '@testing-library/react';
import Cockpit from './InstitutionalProgramFastTrackCockpit';
import status from './programDeliveryCurrentStatus.json';

test.each(['FR', 'DE', 'EN'])('current access status and historical decisions stay separate in %s', language => {
  render(<Cockpit language={language} />);
  const current = within(screen.getByTestId('program-access-current'));
  expect(current.getByText(status.title[language])).toBeInTheDocument();
  expect(current.getByText(status.intro[language])).toBeInTheDocument();
  expect(current.getAllByRole('row')).toHaveLength(7);
  for (const block of status.blocks) {
    expect(current.getByText(block.title[language])).toBeInTheDocument();
    if (block.body) expect(current.getByText(block.body[language])).toBeInTheDocument();
    if (block.rows) for (const row of block.rows) for (const cell of row) expect(current.getByText(cell[language])).toBeInTheDocument();
  }
  expect(current.getByText(/SHA-256/)).toBeInTheDocument();
  expect(current.queryByText(/14\/20/)).not.toBeInTheDocument();
  expect(document.querySelector('time')).toHaveAttribute('datetime', status.snapshotDate);
  expect(screen.getByText('8/8')).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(current.queryByText('8/8')).not.toBeInTheDocument();
  expect(current.getByRole('link')).toHaveAttribute('href', `/boussole#${language.toLowerCase()}/${status.id}`);
});

test('language change replaces the current status text and unknown language falls back to French', () => {
  const {rerender} = render(<Cockpit language="FR" />);
  rerender(<Cockpit language="DE" />);
  expect(screen.queryByText(status.intro.FR)).not.toBeInTheDocument();
  expect(screen.getByText(status.intro.DE)).toBeInTheDocument();
  rerender(<Cockpit language="unknown" />);
  expect(screen.getByText(status.intro.FR)).toBeInTheDocument();
});
