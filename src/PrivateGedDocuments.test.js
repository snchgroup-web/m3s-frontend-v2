import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PrivateGedDocuments from './PrivateGedDocuments';
import api from './api';

let mockLanguage = 'FR';
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('./api', () => ({ __esModule: true, default: {
  getPrivateGedDocuments: jest.fn(), downloadPrivateGedDocument: jest.fn()
} }));
const record = { id: 'a'.repeat(64), name: 'Synthetic.pdf', size: 1234 };
beforeEach(() => {
  jest.clearAllMocks(); mockLanguage = 'FR';
  api.getPrivateGedDocuments.mockResolvedValue([record]);
  api.downloadPrivateGedDocument.mockResolvedValue(new Blob(['%PDF-synthetic'], { type: 'application/pdf' }));
  URL.createObjectURL = jest.fn(() => 'blob:synthetic-only');
  URL.revokeObjectURL = jest.fn();
});

test('lists registered documents, downloads through authenticated API and releases object URLs', async () => {
  const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
    expect(this.download).toBe(record.name); expect(this.href).toBe('blob:synthetic-only');
  });
  render(<PrivateGedDocuments/>);
  await screen.findByText(record.name);
  fireEvent.click(screen.getByRole('button', { name: `Télécharger ${record.name}` }));
  expect(await screen.findByText('Téléchargement préparé.')).toBeInTheDocument();
  expect(api.downloadPrivateGedDocument).toHaveBeenCalledWith(record, { signal: expect.any(AbortSignal) });
  expect(click).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:synthetic-only'), { timeout: 2000 });
  click.mockRestore();
});

test('refresh failure clears previously visible document names', async () => {
  render(<PrivateGedDocuments/>); await screen.findByText(record.name);
  api.getPrivateGedDocuments.mockRejectedValueOnce(new Error('provider secret must not render'));
  fireEvent.click(screen.getByRole('button', { name: 'Actualiser les documents' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('momentanément indisponibles');
  expect(screen.queryByText(record.name)).not.toBeInTheDocument();
  expect(screen.queryByText(/provider secret/)).not.toBeInTheDocument();
});

test.each([
  [{ status: 403 }, 'Aucun accès aux documents privés pour ce compte.'],
  [{ code: 'GED_NOT_ENABLED' }, 'Les documents privés ne sont pas encore disponibles.']
])('distinguishes access and disabled state from an empty register', async (error, message) => {
  api.getPrivateGedDocuments.mockRejectedValueOnce(error);
  render(<PrivateGedDocuments/>);
  expect(await screen.findByText(message)).toBeInTheDocument();
  expect(screen.queryByText('Aucun document enregistré.')).not.toBeInTheDocument();
});

test.each([['FR', 'Documents GED privés', 'Télécharger'], ['EN', 'Private GED documents', 'Download'],
  ['DE', 'Private GED-Dokumente', 'Herunterladen']])('renders localized labels in %s', async (language, title, action) => {
  mockLanguage = language; render(<PrivateGedDocuments/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: `${action} ${record.name}` })).toBeEnabled();
});

test('shows a genuine empty register', async () => {
  api.getPrivateGedDocuments.mockResolvedValueOnce([]); render(<PrivateGedDocuments/>);
  expect(await screen.findByText('Aucun document enregistré.')).toBeInTheDocument();
});

test('failed downloads expose no provider details and remain retryable', async () => {
  api.downloadPrivateGedDocument.mockRejectedValueOnce(new Error('private provider data'));
  render(<PrivateGedDocuments/>); await screen.findByText(record.name);
  fireEvent.click(screen.getByRole('button', { name: `Télécharger ${record.name}` }));
  expect(await screen.findByRole('alert')).toHaveTextContent('téléchargement a échoué');
  expect(URL.createObjectURL).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: `Télécharger ${record.name}` })).toBeEnabled();
});

test('leaving during download aborts it and prevents a late private file save', async () => {
  let resolve;
  api.downloadPrivateGedDocument.mockReturnValue(new Promise(done => { resolve = done; }));
  const view = render(<PrivateGedDocuments/>); await screen.findByText(record.name);
  fireEvent.click(screen.getByRole('button', { name: `Télécharger ${record.name}` }));
  const { signal } = api.downloadPrivateGedDocument.mock.calls[0][1];
  expect(screen.getByRole('button', { name: `Télécharger ${record.name}` })).toBeDisabled();
  view.unmount(); expect(signal.aborted).toBe(true);
  await act(async () => { resolve(new Blob(['synthetic'])); });
  expect(URL.createObjectURL).not.toHaveBeenCalled();
});
