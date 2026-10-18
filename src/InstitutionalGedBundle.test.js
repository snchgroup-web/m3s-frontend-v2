import React from 'react';
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstitutionalGedBundle from './InstitutionalGedBundle';
import api from './api';

jest.mock('./api', () => ({ __esModule: true, default: { getInstitutionalGedBundle: jest.fn(), downloadInstitutionalGedFile: jest.fn() } }));
const bundle = { dossiers: ['GD-005', 'GD-006'], files: ['A.md', 'B.html', 'C.csv', 'D.json', 'E.json'].map((name, index) => ({
  id: String(index).repeat(64), name, size: 100, contentType: 'application/octet-stream' })) };
beforeEach(() => { jest.clearAllMocks(); api.getInstitutionalGedBundle.mockResolvedValue(bundle); });
afterEach(cleanup);

test('metadata is loaded only when the user opens the shared five-file version', async () => {
  render(<InstitutionalGedBundle />);
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  expect(await screen.findByText('GD-005 · GD-006')).toBeVisible();
  expect(screen.getAllByRole('button', { name: /^Télécharger / })).toHaveLength(5);
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Fermer les documents' }));
  expect(screen.queryByText('A.md')).not.toBeInTheDocument();
});

test.each([['FR', 'Documents rattachés', 'Fermer les documents'], ['DE', 'Verknüpfte Dokumente', 'Dokumente schliessen'], ['EN', 'Linked documents', 'Close documents']])(
  '%s labels, open and close remain available', async (language, openLabel, closeLabel) => {
    render(<InstitutionalGedBundle language={language} />);
    fireEvent.click(screen.getByRole('button', { name: openLabel }));
    expect(await screen.findByText('A.md')).toBeVisible();
    expect(screen.getByRole('button', { name: closeLabel })).toBeVisible();
  }
);

test('permission or service errors do not expose filenames or invent attached data', async () => {
  api.getInstitutionalGedBundle.mockRejectedValueOnce({ status: 403 });
  const view = render(<InstitutionalGedBundle />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Accès documentaire non autorisé.');
  expect(screen.queryByText('A.md')).not.toBeInTheDocument();
  view.unmount(); api.getInstitutionalGedBundle.mockRejectedValueOnce({ status: 503 });
  render(<InstitutionalGedBundle language="EN" />); fireEvent.click(screen.getByRole('button', { name: 'Linked documents' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Documents are temporarily unavailable.');
});

test('changing language keeps the open version and does not refetch metadata', async () => {
  const view = render(<InstitutionalGedBundle />); fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  await screen.findByText('A.md'); view.rerender(<InstitutionalGedBundle language="DE" />);
  expect(screen.getByRole('button', { name: 'Herunterladen A.md' })).toBeVisible();
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
});

test('download uses the checked file, never renders HTML, and releases its blob URL', async () => {
  const create = jest.fn(() => 'blob:synthetic'), revoke = jest.fn();
  URL.createObjectURL = create; URL.revokeObjectURL = revoke;
  const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  api.downloadInstitutionalGedFile.mockResolvedValue(new Blob(['synthetic'], { type: 'application/octet-stream' }));
  render(<InstitutionalGedBundle />); fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  await screen.findByText('A.md'); fireEvent.click(screen.getByRole('button', { name: 'Télécharger B.html' }));
  await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
  expect(api.downloadInstitutionalGedFile).toHaveBeenCalledWith(bundle.files[1], expect.anything());
  expect(screen.queryByRole('iframe')).not.toBeInTheDocument();
  await waitFor(() => expect(revoke).toHaveBeenCalledWith('blob:synthetic'), { timeout: 1500 }); click.mockRestore();
});

test('an exact selection does not leak other files and equivalent props do not refetch', async () => {
  const view = render(<InstitutionalGedBundle fileIds={[bundle.files[1].id]} />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  await screen.findByText('B.html');
  expect(screen.queryByText('A.md')).not.toBeInTheDocument();
  view.rerender(<InstitutionalGedBundle language="DE" fileIds={[bundle.files[1].id]} />);
  expect(screen.getByRole('button', { name: 'Herunterladen B.html' })).toBeVisible();
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
});

test.each([{ ids: [] }, { ids: ['missing'] }, { ids: [bundle.files[0].id, 'missing'] }])('missing selection $ids never falls back to the full bundle', async ({ ids }) => {
  render(<InstitutionalGedBundle language="EN" fileIds={ids} />);
  fireEvent.click(screen.getByRole('button', { name: 'Linked documents' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Requested document version unavailable.');
  expect(screen.queryByText('A.md')).not.toBeInTheDocument();
});

test('changing selection aborts old metadata and requires an explicit reopen', async () => {
  const view = render(<InstitutionalGedBundle fileIds={[bundle.files[0].id]} />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents rattachés' }));
  await screen.findByText('A.md');
  const signal = api.getInstitutionalGedBundle.mock.calls[0][0].signal;
  view.rerender(<InstitutionalGedBundle fileIds={[bundle.files[1].id]} />);
  expect(signal.aborted).toBe(true);
  expect(screen.queryByText('A.md')).not.toBeInTheDocument();
  expect(screen.queryByText('B.html')).not.toBeInTheDocument();
});
