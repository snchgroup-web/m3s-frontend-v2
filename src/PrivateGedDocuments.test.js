import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PrivateGedDocuments from './PrivateGedDocuments';
import api from './api';

let mockLanguage = 'FR';
jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: mockLanguage }) }));
jest.mock('./api', () => ({ __esModule: true, default: {
  getPrivateGedDocuments: jest.fn(), downloadPrivateGedDocument: jest.fn(), preparePrivateGedImport: jest.fn(), importPrivateGedDocument: jest.fn()
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

test.each([['FR', 'Documents à accès restreint', 'Télécharger'], ['EN', 'Restricted-access documents', 'Download'],
  ['DE', 'Zugriffsgeschützte Dokumente', 'Herunterladen']])('renders localized labels in %s', async (language, title, action) => {
  mockLanguage = language; render(<PrivateGedDocuments/>);
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(await screen.findByRole('button', { name: `${action} ${record.name}` })).toBeEnabled();
});

const chooseImport = async () => {
  fireEvent.click(await screen.findByRole('button', { name: 'Importer un document' }));
  const file = new File(['synthetic-only'], 'Synthetic CV.docx');
  await act(async () => { fireEvent.change(screen.getByLabelText('Fichier'), { target: { files: [file] } }); });
  return file;
};

test.each(['personal', 'finance'])('scopes visible files and imports to %s without deleting records', async scope => {
  const personal = { ...record, category: 'personal', name: 'Synthetic CV.docx' };
  const finance = { ...record, id: 'b'.repeat(64), category: 'finance', name: 'Synthetic invoice.pdf' };
  api.getPrivateGedDocuments.mockResolvedValue([personal, finance]);
  render(<PrivateGedDocuments scope={scope}/>);
  await screen.findByText(scope === 'personal' ? personal.name : finance.name);
  expect(screen.queryByText(scope === 'personal' ? finance.name : personal.name)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Importer un document' }));
  expect(screen.getByLabelText('Classement')).toHaveValue(scope);
  expect(screen.getByLabelText('Classement')).toBeDisabled();
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
});
test('personal import requires explicit confirmation and refreshes only after real success', async () => {
  const cv = { ...record, name: 'Synthetic CV.docx', category: 'personal' };
  api.preparePrivateGedImport.mockResolvedValue(cv);
  api.importPrivateGedDocument.mockResolvedValue({ created: true, document: cv });
  render(<PrivateGedDocuments/>); await screen.findByText(record.name);
  const file = await chooseImport();
  await screen.findByText('Fichier vérifié, prêt à importer.');
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
  expect(screen.getByLabelText('Classement')).toHaveValue('personal');
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer l’import' }));
  await screen.findByText('Document enregistré et relu avec succès.');
  expect(api.importPrivateGedDocument).toHaveBeenCalledWith(file, cv, { signal: expect.any(AbortSignal) });
  expect(api.getPrivateGedDocuments).toHaveBeenCalledTimes(2);
});
test.each([
  ['GED_DOCUMENT_NOT_APPROVED', 'pas encore partie'], ['GED_CATEGORY_MISMATCH', 'ne correspond pas'],
  ['GED_TOO_LARGE', '5 Mio'], ['GED_FORMAT_REQUIRED', 'Word (.docx)']
])('rejected selection cannot be submitted (%s)', async (code, text) => {
  api.preparePrivateGedImport.mockRejectedValue({ code });
  render(<PrivateGedDocuments/>); await screen.findByText(record.name); await chooseImport();
  expect(await screen.findByRole('alert')).toHaveTextContent(text);
  expect(screen.getByRole('button', { name: 'Confirmer l’import' })).toBeDisabled();
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
});
test('existing documents are not uploaded again; cancellation sends no bytes', async () => {
  api.preparePrivateGedImport.mockResolvedValue({ ...record, existing: true });
  render(<PrivateGedDocuments/>); await screen.findByText(record.name); await chooseImport();
  await screen.findByText('Ce document est déjà enregistré.');
  expect(screen.getByRole('button', { name: 'Confirmer l’import' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' }));
  expect(screen.queryByLabelText('Fichier')).not.toBeInTheDocument();
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
});
test('failed upload never shows success or leaks provider details', async () => {
  api.preparePrivateGedImport.mockResolvedValue(record);
  api.importPrivateGedDocument.mockRejectedValue(new Error('sensitive provider detail'));
  render(<PrivateGedDocuments/>); await screen.findByText(record.name); await chooseImport();
  await screen.findByText('Fichier vérifié, prêt à importer.');
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer l’import' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Import non confirmé');
  expect(screen.queryByText(/sensitive provider/)).not.toBeInTheDocument();
  expect(screen.queryByText('Document enregistré et relu avec succès.')).not.toBeInTheDocument();
});

test('shows a genuine empty register', async () => {
  api.getPrivateGedDocuments.mockResolvedValueOnce([]); render(<PrivateGedDocuments/>);
  expect(await screen.findByText('Aucun document enregistré.')).toBeInTheDocument();
});

test('financial toolbar keeps the title, import and trash controls together', async () => {
  api.getPrivateGedDocuments.mockResolvedValueOnce([{ ...record, category: 'finance', lifecycle: true,
    rootId: record.id, revision: 0, trashed: false, title: record.name }]);
  render(<PrivateGedDocuments scope="finance"/>);
  await screen.findByText(record.name);
  const toolbar = document.querySelector('.private-ged-toolbar-sticky');
  expect(toolbar).toContainElement(screen.getByRole('heading', { name: 'Documents financiers 2SG' }));
  expect(toolbar).toContainElement(screen.getByRole('button', { name: 'Importer un document' }));
  expect(toolbar).toContainElement(screen.getByRole('button', { name: 'Documents', exact: true }));
  expect(toolbar).toContainElement(screen.getByRole('button', { name: 'Corbeille', exact: true }));
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
