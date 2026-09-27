import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GedDocumentActions from './GedDocumentActions';
import api from './api';
import { useLanguage } from './LanguageContext';
jest.mock('./api', () => ({ __esModule: true, default: {
  mutatePrivateGedDocument: jest.fn(), getPrivateGedHistory: jest.fn(), preparePrivateGedImport: jest.fn(), importPrivateGedDocument: jest.fn()
} }));
jest.mock('./LanguageContext', () => ({ useLanguage: jest.fn() }));
const row = { id: 'a'.repeat(64), rootId: 'a'.repeat(64), name: 'Original.pdf', title: 'CV', revision: 0, lifecycle: true, category: 'personal' };
beforeEach(() => { jest.clearAllMocks(); useLanguage.mockReturnValue({ language: 'FR' }); api.mutatePrivateGedDocument.mockResolvedValue({ ...row, revision: 1 }); });
test('rename requires confirmation then persists title without changing filename', async () => {
  const changed = jest.fn(); render(<GedDocumentActions row={row} onChanged={changed}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Modifier le titre CV' }));
  fireEvent.change(screen.getByLabelText('Titre du document'), { target: { value: 'CV actualisé' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.mutatePrivateGedDocument).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  await waitFor(() => expect(changed).toHaveBeenCalledTimes(1));
  expect(api.mutatePrivateGedDocument).toHaveBeenCalledWith(row, { action: 'rename', title: 'CV actualisé' }, expect.any(Object));
});
test('trash can be cancelled and restoring uses the restore action', async () => {
  const changed = jest.fn(); const view = render(<GedDocumentActions row={row} onChanged={changed}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Mettre à la corbeille CV' }));
  fireEvent.click(screen.getByRole('button', { name: 'Annuler' })); expect(api.mutatePrivateGedDocument).not.toHaveBeenCalled();
  view.rerender(<GedDocumentActions row={{ ...row, trashed: true }} onChanged={changed}/>);
  expect(screen.queryByRole('button', { name: 'Modifier le titre CV' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Restaurer CV' }));
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  await waitFor(() => expect(changed).toHaveBeenCalled());
  expect(api.mutatePrivateGedDocument.mock.calls[0][1]).toEqual({ action: 'restore' });
});
test('new version checks the file, imports original bytes, then links the revision', async () => {
  const next = { id: 'b'.repeat(64), name: 'New.pdf', category: 'personal' }; const changed = jest.fn();
  api.preparePrivateGedImport.mockResolvedValue(next); api.importPrivateGedDocument.mockResolvedValue({ created: true });
  render(<GedDocumentActions row={row} onChanged={changed}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Nouvelle version CV' }));
  const file = new File(['%PDF-synthetic'], 'New.pdf', { type: 'application/pdf' });
  fireEvent.change(screen.getByLabelText('Nouveau fichier'), { target: { files: [file] } });
  await screen.findByText('Fichier vérifié.');
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  expect(api.importPrivateGedDocument).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  await waitFor(() => expect(changed).toHaveBeenCalled());
  expect(api.importPrivateGedDocument).toHaveBeenCalledWith(file, next, expect.any(Object));
  expect(api.mutatePrivateGedDocument.mock.calls[0][1]).toEqual({ action: 'version', versionId: next.id });
});
test('unapproved or identical versions cannot be submitted', async () => {
  api.preparePrivateGedImport.mockResolvedValue({ id: row.id });
  render(<GedDocumentActions row={row} onChanged={jest.fn()}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Nouvelle version CV' }));
  fireEvent.change(screen.getByLabelText('Nouveau fichier'), { target: { files: [new File(['a'], 'Original.pdf')] } });
  await screen.findByText('Choisis un fichier différent, du même classement.');
  expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeDisabled();
});
test('conflict is explicit and never reports success', async () => {
  api.mutatePrivateGedDocument.mockRejectedValue({ code: 'GED_VERSION_CONFLICT' }); const changed = jest.fn();
  render(<GedDocumentActions row={row} onChanged={changed}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Mettre à la corbeille CV' })); fireEvent.click(screen.getByRole('button', { name: 'Confirmer' }));
  await screen.findByRole('alert'); expect(changed).not.toHaveBeenCalled();
  expect(screen.getByRole('alert')).toHaveTextContent('Le document a changé');
});
test.each([['EN','Edit title CV'],['DE','Titel bearbeiten CV']])('action labels follow %s', (language, label) => {
  useLanguage.mockReturnValue({ language }); render(<GedDocumentActions row={row}/>); expect(screen.getByRole('button', { name: label })).toBeVisible();
});
test('history retains a downloadable original', async () => {
  api.getPrivateGedHistory.mockResolvedValue([{ revision: 0, action: 'import', title: 'CV', createdAt: '2026-01-01T00:00:00Z', document: row }]);
  const download = jest.fn(); render(<GedDocumentActions row={row} onDownload={download}/>);
  fireEvent.click(screen.getByRole('button', { name: 'Historique CV' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Télécharger Original.pdf, 0' })); expect(download).toHaveBeenCalledWith(row);
});
