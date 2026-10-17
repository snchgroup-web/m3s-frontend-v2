import React from 'react';
import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstitutionalGedBundle from './InstitutionalGedBundle';
import api from './api';
import { RH_FILE_SPECS } from './institutionalRhGedModel';
jest.mock('./api', () => ({ __esModule: true, default: { getInstitutionalGedBundle: jest.fn(), downloadInstitutionalGedFile: jest.fn() } }));
const files = RH_FILE_SPECS.map(([name, id, size]) => ({ name, id, size, contentType: 'application/octet-stream' }));
beforeEach(() => { jest.clearAllMocks(); api.getInstitutionalGedBundle.mockResolvedValue({ dossiers: ['GD-008', 'GD-009'], files }); });
afterEach(cleanup);
test.each([['FR', 'Documents RH rattachés', 'Fermer les documents'], ['DE', 'Verknüpfte HR-Dokumente', 'Dokumente schliessen'], ['EN', 'Linked HR documents', 'Close documents']])(
  '%s opens the eight-file RH view lazily and closes without leaving it', async (language, openLabel, closeLabel) => {
    render(<InstitutionalGedBundle kind="rh" language={language} />);
    expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: openLabel }));
    expect(await screen.findByText('GD-008 · GD-009')).toBeVisible();
    expect(api.getInstitutionalGedBundle).toHaveBeenCalledWith(expect.objectContaining({ kind: 'rh' }));
    expect(screen.getAllByRole('button', { name: /^(Télécharger|Herunterladen|Download) / })).toHaveLength(8);
    fireEvent.click(screen.getByRole('button', { name: closeLabel }));
    expect(screen.queryByText(files[0].name)).not.toBeInTheDocument();
  }
);
test('language change keeps RH open, while switching kind removes the previous state', async () => {
  const view = render(<InstitutionalGedBundle kind="rh" />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents RH rattachés' })); await screen.findByText(files[0].name);
  view.rerender(<InstitutionalGedBundle kind="rh" language="EN" />);
  expect(screen.getByRole('button', { name: 'Download ' + files[0].name })).toBeVisible(); expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
  view.rerender(<InstitutionalGedBundle language="EN" />);
  expect(screen.getByRole('button', { name: 'Linked documents' })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText(files[0].name)).not.toBeInTheDocument();
});
test('RH download passes its kind and uses an attachment, not an inline viewer', async () => {
  URL.createObjectURL = jest.fn(() => 'blob:synthetic-rh'); URL.revokeObjectURL = jest.fn();
  const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  api.downloadInstitutionalGedFile.mockResolvedValue(new Blob(['synthetic']));
  render(<InstitutionalGedBundle kind="rh" />); fireEvent.click(screen.getByRole('button', { name: 'Documents RH rattachés' }));
  await screen.findByText(files[6].name); fireEvent.click(screen.getByRole('button', { name: 'Télécharger ' + files[6].name }));
  await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
  expect(api.downloadInstitutionalGedFile).toHaveBeenCalledWith(files[6], expect.objectContaining({ kind: 'rh' }));
  expect(document.querySelector('iframe')).toBeNull(); click.mockRestore();
});
test('RH denial shows no filenames and allows a deliberate retry', async () => {
  api.getInstitutionalGedBundle.mockRejectedValueOnce({ status: 403 });
  render(<InstitutionalGedBundle kind="rh" />); fireEvent.click(screen.getByRole('button', { name: 'Documents RH rattachés' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Accès documentaire non autorisé.');
  expect(screen.queryByText(files[0].name)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser les documents' })); expect(await screen.findByText(files[0].name)).toBeVisible();
});
