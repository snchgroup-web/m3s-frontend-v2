import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ExpenseDocumentPicker, { saveExpenseAttachment } from './ExpenseDocumentPicker';
import api from './api';

jest.mock('./LanguageContext', () => ({ useLanguage: () => ({ language: 'FR' }) }));
jest.mock('./api', () => ({ __esModule: true, default: {
  getExpenseAttachmentOptions: jest.fn(), preparePrivateGedImport: jest.fn(),
  importPrivateGedDocument: jest.fn(), attachExpenseDocument: jest.fn()
} }));

const root = 'a'.repeat(64);
const version = 'b'.repeat(64);
const record = { id: version, rootId: root, lifecycle: true, trashed: false, category: 'finance', name: 'Facture.pdf', title: 'Facture' };

beforeEach(() => {
  jest.clearAllMocks();
  api.getExpenseAttachmentOptions.mockResolvedValue({ enabled: true, documents: [record] });
});

test('defaults to no attachment without blocking the expense save', async () => {
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker onChange={onChange} onReadyChange={onReadyChange}/>);
  expect(screen.getByLabelText('Aucun justificatif')).toBeChecked();
  expect(onChange).toHaveBeenCalledWith(null);
  expect(onReadyChange).toHaveBeenCalledWith(true);
  await waitFor(() => expect(api.getExpenseAttachmentOptions).toHaveBeenCalled());
  expect(api.preparePrivateGedImport).not.toHaveBeenCalled();
});

test('selects only a current financial GED document and retains metadata without a value prop', async () => {
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker onChange={onChange} onReadyChange={onReadyChange}/>);
  const existingMode = screen.getByLabelText('Document financier existant');
  await waitFor(() => expect(existingMode).toBeEnabled());
  fireEvent.click(existingMode);
  expect(screen.getByLabelText('Document')).toHaveTextContent('Facture');
  expect(onChange).toHaveBeenLastCalledWith(null);
  expect(onReadyChange).toHaveBeenLastCalledWith(false);
  fireEvent.change(screen.getByLabelText('Document'), { target: { value: root } });
  expect(onChange).toHaveBeenLastCalledWith({ record, documentRole: 'invoice', externalReference: '' });
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
  fireEvent.change(screen.getByLabelText('Type de justificatif'), { target: { value: 'payment_receipt' } });
  fireEvent.change(screen.getByLabelText('Référence externe'), { target: { value: 'PAY-001' } });
  expect(onChange).toHaveBeenLastCalledWith({ record, documentRole: 'payment_receipt', externalReference: 'PAY-001' });
});

test('keeps attachment modes closed while availability is loading', async () => {
  let resolveOptions;
  api.getExpenseAttachmentOptions.mockReturnValue(new Promise(resolve => { resolveOptions = resolve; }));
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker onChange={onChange} onReadyChange={onReadyChange}/>);
  expect(screen.getByLabelText('Document financier existant')).toBeDisabled();
  expect(screen.getByLabelText('Importer un fichier approuvé')).toBeDisabled();
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
  await act(async () => { resolveOptions({ enabled: true, documents: [record] }); });
  expect(screen.getByLabelText('Document financier existant')).toBeEnabled();
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
});

test('missing attachment API in legacy Finance mocks stays unavailable while none remains ready', async () => {
  const method = api.getExpenseAttachmentOptions;
  api.getExpenseAttachmentOptions = undefined;
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker onChange={onChange} onReadyChange={onReadyChange}/>);
  expect(await screen.findByRole('status')).toHaveTextContent('momentanément indisponibles');
  expect(screen.getByLabelText('Aucun justificatif')).toBeChecked();
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
  api.getExpenseAttachmentOptions = method;
});

test('prepares an approved file but sends no bytes before the expense is saved', async () => {
  const candidate = { id: version, name: 'Facture.pdf', size: 20, category: 'finance', existing: false };
  api.preparePrivateGedImport.mockResolvedValue(candidate);
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker value={null} onChange={onChange} onReadyChange={onReadyChange}/>);
  await waitFor(() => expect(api.getExpenseAttachmentOptions).toHaveBeenCalled());
  fireEvent.click(screen.getByLabelText('Importer un fichier approuvé'));
  const file = new File(['approved synthetic file'], 'Facture.pdf', { type: 'application/pdf' });
  await act(async () => { fireEvent.change(screen.getByLabelText('Fichier'), { target: { files: [file] } }); });
  expect(await screen.findByText(/Fichier approuvé/)).toBeInTheDocument();
  expect(api.preparePrivateGedImport).toHaveBeenCalledWith(file, 'finance', { signal: expect.any(AbortSignal) });
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
  expect(onChange).toHaveBeenLastCalledWith({ record: null, file, candidate, documentRole: 'invoice', externalReference: '' });
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
});

test('rejected files stay unselected until the user chooses none or a valid document', async () => {
  api.preparePrivateGedImport.mockRejectedValue({ code: 'GED_DOCUMENT_NOT_APPROVED' });
  const onChange = jest.fn(), onReadyChange = jest.fn();
  render(<ExpenseDocumentPicker value={null} onChange={onChange} onReadyChange={onReadyChange}/>);
  await waitFor(() => expect(api.getExpenseAttachmentOptions).toHaveBeenCalled());
  fireEvent.click(screen.getByLabelText('Importer un fichier approuvé'));
  await act(async () => { fireEvent.change(screen.getByLabelText('Fichier'), {
    target: { files: [new File(['not approved'], 'Unknown.pdf', { type: 'application/pdf' })] }
  }); });
  expect(await screen.findByRole('alert')).toHaveTextContent('uniquement un fichier approuvé');
  expect(onChange).toHaveBeenLastCalledWith(null);
  expect(onReadyChange).toHaveBeenLastCalledWith(false);
  fireEvent.click(screen.getByLabelText('Aucun justificatif'));
  expect(onReadyChange).toHaveBeenLastCalledWith(true);
});

test('imports, rechecks the current root and attaches idempotently after expense creation', async () => {
  const file = new File(['approved synthetic file'], 'Facture.pdf', { type: 'application/pdf' });
  const candidate = { id: version, category: 'finance' };
  const selection = { record: null, file, candidate, documentRole: 'invoice', externalReference: ' INV-001 ' };
  api.importPrivateGedDocument.mockResolvedValue({ created: true, document: { id: version } });
  api.getExpenseAttachmentOptions.mockResolvedValue({ enabled: true, documents: [record] });
  api.attachExpenseDocument.mockResolvedValue({ success: true, created: true });
  await expect(saveExpenseAttachment('DEP-001', selection)).resolves.toMatchObject({ success: true });
  expect(api.importPrivateGedDocument).toHaveBeenCalledWith(file, candidate, { signal: undefined });
  expect(api.getExpenseAttachmentOptions).toHaveBeenCalledWith({ signal: undefined });
  expect(api.attachExpenseDocument).toHaveBeenCalledWith('DEP-001', {
    documentId: root, versionId: version, documentRole: 'invoice', externalReference: 'INV-001'
  }, { signal: undefined });

  api.importPrivateGedDocument.mockResolvedValueOnce({ created: false, document: { id: version } });
  api.attachExpenseDocument.mockResolvedValueOnce({ success: true, created: false });
  await expect(saveExpenseAttachment('DEP-001', selection)).resolves.toMatchObject({ created: false });
});

test.each([
  ['stale version', []],
  ['trashed root', [{ ...record, trashed: true }]],
  ['different root', [{ ...record, rootId: 'c'.repeat(64) }]],
  ['private source', [{ ...record, category: 'personal' }]]
])('never attaches a %s', async (_label, documents) => {
  api.getExpenseAttachmentOptions.mockResolvedValue({ enabled: true, documents });
  await expect(saveExpenseAttachment('DEP-001', { record, documentRole: 'other', externalReference: '' }))
    .rejects.toMatchObject({ code: 'GED_VERSION_CONFLICT' });
  expect(api.attachExpenseDocument).not.toHaveBeenCalled();
});

test('helper rejects an unconfirmed attachment response', async () => {
  api.getExpenseAttachmentOptions.mockResolvedValue({ enabled: true, documents: [record] });
  api.attachExpenseDocument.mockResolvedValue({ success: false, created: false });
  await expect(saveExpenseAttachment('DEP-001', { record, documentRole: 'other' }))
    .rejects.toMatchObject({ code: 'GED_UNAVAILABLE' });
});
