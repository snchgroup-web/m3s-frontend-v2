import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CorrespondenceDocument from './CorrespondenceDocument';
import api from './api';
jest.mock('./api', () => ({ __esModule: true, default: { getPrivateGedDocuments: jest.fn(), downloadPrivateGedDocument: jest.fn() } }));
jest.mock('./PdfDocumentPreview', () => ({ __esModule: true, default: ({ name }) => <div data-testid="pdf-preview">{name}</div> }));
const row = { id: 'a'.repeat(64), name: 'Synthetic correspondence.pdf', category: 'correspondence', size: 1234 };
beforeEach(() => {
  jest.clearAllMocks(); api.getPrivateGedDocuments.mockResolvedValue([row]);
  api.downloadPrivateGedDocument.mockResolvedValue(new Blob(['synthetic'], { type: 'application/pdf' }));
});
test.each(['FR', 'EN', 'DE'])('opens a registered restricted PDF and closes without mutating the register in %s', async language => {
  const { unmount } = render(<CorrespondenceDocument reference={row.id} language={language}/>);
  const trigger = screen.getByRole('button'); trigger.focus(); fireEvent.click(trigger);
  await screen.findByTestId('pdf-preview');
  expect(api.downloadPrivateGedDocument).toHaveBeenCalledWith(row, { signal: expect.any(AbortSignal) });
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus(); unmount();
});
test.each([{ ...row, category: 'finance' }, { ...row, category: 'personal' }, { ...row, trashed: true }, { ...row, id: 'b'.repeat(64) }])('rejects unrelated or trashed records before requesting content', async unrelated => {
  api.getPrivateGedDocuments.mockResolvedValue([unrelated]);
  render(<CorrespondenceDocument reference={row.id}/>); fireEvent.click(screen.getByRole('button'));
  await screen.findByRole('alert'); expect(api.downloadPrivateGedDocument).not.toHaveBeenCalled();
});
test('arbitrary paths and URLs are not followed', () => {
  const { container } = render(<CorrespondenceDocument reference="https://untrusted.example/file.pdf"/>);
  expect(container).toBeEmptyDOMElement(); expect(api.getPrivateGedDocuments).not.toHaveBeenCalled();
});
