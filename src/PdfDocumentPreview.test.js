import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PdfDocumentPreview from './PdfDocumentPreview';
import { loadPdf } from './pdfEngine';

jest.mock('./pdfEngine', () => ({ loadPdf: jest.fn() }));
let destroy;
let getPage;
beforeEach(() => {
  jest.clearAllMocks();
  global.ResizeObserver = class { observe() {} disconnect() {} };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({});
  destroy = jest.fn(() => Promise.resolve());
  getPage = jest.fn(async () => ({
    getViewport: ({ scale }) => ({ width: 600 * scale, height: 800 * scale }),
    render: () => ({ promise: Promise.resolve(), cancel: jest.fn() }),
    getTextContent: async () => ({ items: [{ str: 'Synthetic invoice' }] })
  }));
  loadPdf.mockReturnValue({ promise: Promise.resolve({ numPages: 2, getPage }), destroy });
});
afterEach(() => jest.restoreAllMocks());

test('renders only supplied bytes, navigates pages and destroys the private PDF on close', async () => {
  const blob = { arrayBuffer: async () => new ArrayBuffer(4) };
  const { unmount } = render(<PdfDocumentPreview blob={blob} name="Invoice.pdf" language="EN"/>);
  await screen.findByText('Synthetic invoice');
  expect(loadPdf).toHaveBeenCalledWith(expect.any(Uint8Array));
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  await waitFor(() => expect(getPage).toHaveBeenCalledWith(2));
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  unmount();
  expect(destroy).toHaveBeenCalledTimes(1);
});

test('shows a localized error for corrupt or password protected PDFs', async () => {
  loadPdf.mockReturnValue({ promise: Promise.reject(new Error('Invalid PDF')), destroy });
  render(<PdfDocumentPreview blob={{ arrayBuffer: async () => new ArrayBuffer(4) }} name="Invoice.pdf" language="DE"/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Vorschau nicht verfügbar');
});

test('keeps the rendered canvas visible when optional text extraction fails', async () => {
  const page = await getPage();
  const getTextContent = jest.fn().mockRejectedValue(new Error('Text unavailable'));
  getPage.mockResolvedValue({ ...page, getTextContent });
  render(<PdfDocumentPreview blob={{ arrayBuffer: async () => new ArrayBuffer(4) }} name="Invoice.pdf" language="EN"/>);
  await waitFor(() => expect(getTextContent).toHaveBeenCalled());
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveStyle({ visibility: 'visible' });
});

test('closing before bytes arrive never starts a renderer', async () => {
  let resolve;
  const { unmount } = render(<PdfDocumentPreview blob={{ arrayBuffer: () => new Promise(done => { resolve = done; }) }} name="Invoice.pdf" language="FR"/>);
  unmount();
  resolve(new ArrayBuffer(4));
  await Promise.resolve();
  expect(loadPdf).not.toHaveBeenCalled();
});
