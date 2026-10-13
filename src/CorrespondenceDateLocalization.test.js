import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import CorrespondenceRegister from './CorrespondenceRegister';
import api from './api';
import { ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION } from './accessControl';

let mockCurrentUser;
jest.mock('./AuthContext', () => ({ useAuth: () => ({ user: mockCurrentUser, token: 'signed-token' }) }));
jest.mock('./api', () => ({
  __esModule: true,
  default: {
    getAdministrationCorrespondence: jest.fn(),
    createAdministrationCorrespondence: jest.fn(),
    updateAdministrationCorrespondence: jest.fn(),
    deleteAdministrationCorrespondence: jest.fn()
  }
}));

const record = {
  id: 'COR-DATE-SYNTHETIC', receipt_date: '2026-09-08', deadline: '2027-01-01',
  direction: 'outgoing', channel: 'email', sender: 'Sender synthetic',
  recipient: 'Recipient synthetic', subject: 'Date synthetic', owner: 'Owner synthetic',
  category: 'institutional', confidentiality: 'internal', status: 'in_progress'
};
const cases = [
  ['FR', '08-09-26', 'Rechercher dans le registre', 'Date du courrier *', 'Modifier', 'Oui, modifier'],
  ['DE', '08.09.26', 'Register durchsuchen', 'Korrespondenzdatum *', 'Bearbeiten', 'Ja, ändern'],
  ['EN', '08/09/26', 'Search the register', 'Correspondence date *', 'Edit', 'Yes, update']
];

beforeEach(() => {
  mockCurrentUser = { id: 'USER-SYNTHETIC', tenantId: '2sg', permissions: [ADMINISTRATION_CORRESPONDENCE_WRITE_PERMISSION] };
  jest.clearAllMocks();
  localStorage.clear();
  api.getAdministrationCorrespondence.mockResolvedValue({ data: [record] });
  api.updateAdministrationCorrespondence.mockResolvedValue({ data: record });
});

test.each(cases)('renders a non-wrapping calendar date and searches display or ISO in %s', async (language, expected, searchLabel) => {
  const original = JSON.stringify(record);
  render(<CorrespondenceRegister language={language} />);
  const date = await screen.findByText(expected, { selector: 'time' });
  expect(date).toHaveAttribute('datetime', record.receipt_date);
  expect(date.closest('td')).toHaveClass('whitespace-nowrap');
  const table = within(screen.getByRole('table'));
  const search = screen.getByRole('textbox', { name: searchLabel });
  for (const query of [expected, record.receipt_date, 'unmatched date']) {
    fireEvent.change(search, { target: { value: query } });
    expect(table.getAllByRole('row')).toHaveLength(query === 'unmatched date' ? 1 : 2);
  }
  expect(JSON.stringify(record)).toBe(original);
  expect(api.createAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(api.updateAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(api.deleteAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(localStorage.length).toBe(0);
});

test('language changes update display but preserve ISO form dates without refetching or saving', async () => {
  const original = JSON.stringify(record);
  const view = render(<CorrespondenceRegister language="FR" />);
  await screen.findByText('08-09-26', { selector: 'time' });
  fireEvent.click(screen.getByText(record.subject));
  for (const [language, expected, , dateLabel] of cases) {
    view.rerender(<CorrespondenceRegister language={language} />);
    expect(screen.getByText(expected, { selector: 'time' })).toHaveAttribute('datetime', record.receipt_date);
    expect(screen.getByLabelText(dateLabel)).toHaveValue(record.receipt_date);
    expect(screen.getByRole('dialog').querySelectorAll('input[type="date"]')[1]).toHaveValue(record.deadline);
  }
  expect(api.getAdministrationCorrespondence).toHaveBeenCalledTimes(1);
  expect(api.updateAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(JSON.stringify(record)).toBe(original);
  expect(localStorage.length).toBe(0);
});

test.each(cases)('keeps ISO dates in an unchanged synthetic save payload in %s', async (language, expected, searchLabel, dateLabel, editLabel, confirmLabel) => {
  render(<CorrespondenceRegister language={language} />);
  await screen.findByText(expected, { selector: 'time' });
  fireEvent.click(screen.getByText(record.subject));
  expect(screen.getByLabelText(dateLabel)).toHaveValue(record.receipt_date);
  fireEvent.click(screen.getByRole('dialog', { name: editLabel, exact: true }).querySelector('button[type="submit"]'));
  fireEvent.click(screen.getByRole('button', { name: confirmLabel, exact: true }));
  await screen.findByText(expected, { selector: 'time' });
  expect(api.updateAdministrationCorrespondence).toHaveBeenCalledWith(record.id, expect.objectContaining({
    receipt_date: record.receipt_date, deadline: record.deadline
  }));
  expect(api.createAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(api.deleteAdministrationCorrespondence).not.toHaveBeenCalled();
  expect(localStorage.length).toBe(0);
});
