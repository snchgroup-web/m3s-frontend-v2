import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InstitutionalGedBundle from './InstitutionalGedBundle';
import api from './api';
import spec from './gedOffersSpec.json';
jest.mock('./api', () => ({ __esModule: true, default: { getInstitutionalGedBundle: jest.fn(), downloadInstitutionalGedFile: jest.fn() } }));
const files = spec.files.map(file => ({ ...file, contentType: 'application/octet-stream' }));
beforeEach(() => { jest.clearAllMocks(); api.getInstitutionalGedBundle.mockResolvedValue({ dossiers: spec.dossiers, files }); });

test.each([['FR', 'Documents complémentaires', 'Fermer les documents'], ['DE', 'Ergänzende Dokumente', 'Dokumente schliessen'], ['EN', 'Supplementary documents', 'Close documents']])('supplement opens and closes in %s without touching old bundle kinds', async (language, title, close) => {
  render(<InstitutionalGedBundle language={language} kind="offers" />);
  expect(api.getInstitutionalGedBundle).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: title }));
  await screen.findByText(files[0].name); expect(screen.getAllByRole('listitem')).toHaveLength(10);
  expect(api.getInstitutionalGedBundle).toHaveBeenCalledWith(expect.objectContaining({ kind: 'offers' }));
  expect(screen.getByText(/Version preparation-2026-10-17/)).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: close })); expect(screen.queryByText(files[0].name)).not.toBeInTheDocument();
});

test('language switch preserves loaded supplement and does not refetch', async () => {
  const view = render(<InstitutionalGedBundle kind="offers" />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents complémentaires' })); await screen.findByText(files[0].name);
  view.rerender(<InstitutionalGedBundle kind="offers" language="EN" />);
  expect(screen.getByRole('button', { name: 'Download ' + files[0].name })).toBeVisible(); expect(api.getInstitutionalGedBundle).toHaveBeenCalledTimes(1);
});

test('download is explicitly supplementary and aborts when panel closes', async () => {
  api.downloadInstitutionalGedFile.mockImplementation((_file, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')))));
  render(<InstitutionalGedBundle kind="offers" />);
  fireEvent.click(screen.getByRole('button', { name: 'Documents complémentaires' })); await screen.findByText(files[0].name);
  fireEvent.click(screen.getByRole('button', { name: 'Télécharger ' + files[0].name }));
  await waitFor(() => expect(api.downloadInstitutionalGedFile).toHaveBeenCalledWith(files[0], expect.objectContaining({ kind: 'offers' })));
  const signal = api.downloadInstitutionalGedFile.mock.calls[0][1].signal;
  fireEvent.click(screen.getByRole('button', { name: 'Fermer les documents' })); expect(signal.aborted).toBe(true);
  expect(screen.queryByText('Téléchargement préparé.')).not.toBeInTheDocument();
});

test('denial stays visible, then refresh can load an authorised supplement', async () => {
  api.getInstitutionalGedBundle.mockRejectedValueOnce({ status: 403 });
  render(<InstitutionalGedBundle kind="offers" />); fireEvent.click(screen.getByRole('button', { name: 'Documents complémentaires' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Accès documentaire non autorisé.');
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser les documents' })); await screen.findByText(files[0].name);
  expect(screen.getAllByRole('listitem')).toHaveLength(10);
});
