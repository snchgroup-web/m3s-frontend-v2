import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExpenseProofs from './ExpenseProofs';
import { LanguageProvider } from './LanguageContext';
import api from './api';
jest.mock('./api',()=>({__esModule:true,default:{getExpenseProofs:jest.fn(),downloadPrivateGedDocument:jest.fn()}}));
jest.mock('./PdfDocumentPreview', () => ({ __esModule: true, default: ({ name }) => <div data-testid="pdf-preview">{name}</div> }));
const expense={id:'DEP-SYNTH',ref:'DEP-SYNTH',description:'Synthetic expense'};
beforeEach(()=>{localStorage.clear(); jest.clearAllMocks();});

test('keeps DOCX downloadable without offering an unsupported preview', async () => {
  api.getExpenseProofs.mockResolvedValue([{ id: 'a'.repeat(64), name: 'Invoice.docx' }]);
  render(<LanguageProvider><ExpenseProofs expense={expense}/></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Justificatifs : DEP-SYNTH' }));
  expect(await screen.findByRole('button', { name: 'Télécharger : Invoice.docx' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Afficher : Invoice.docx' })).not.toBeInTheDocument();
  expect(api.downloadPrivateGedDocument).not.toHaveBeenCalled();
});

test.each(['application/pdf', 'image/jpeg'])('previews protected %s and revokes its URL on close', async type => {
  URL.createObjectURL = jest.fn(() => 'blob:synthetic');
  URL.revokeObjectURL = jest.fn();
  const row = { id: 'a'.repeat(64), name: type === 'application/pdf' ? 'Invoice.pdf' : 'Receipt.jpg', documentRole: 'invoice' };
  api.getExpenseProofs.mockResolvedValue([row]);
  api.downloadPrivateGedDocument.mockResolvedValue(new Blob(['synthetic'], { type }));
  render(<LanguageProvider><ExpenseProofs expense={expense}/></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Justificatifs : DEP-SYNTH' }));
  fireEvent.click(await screen.findByRole('button', { name: `Afficher : ${row.name}` }));
  await screen.findByRole('button', { name: 'Fermer le document' });
  expect(api.downloadPrivateGedDocument).toHaveBeenCalledWith(row, expect.objectContaining({ expenseId: expense.id }));
  if (type === 'application/pdf') expect(await screen.findByTestId('pdf-preview')).toHaveTextContent(row.name);
  else expect(screen.getByAltText(row.name)).toHaveAttribute('src', 'blob:synthetic');
  fireEvent.click(screen.getByRole('button', { name: 'Fermer le document' }));
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:synthetic');
  expect(screen.getByRole('button', { name: `Afficher : ${row.name}` })).toBeInTheDocument();
});

test.each(['denied', 'unsafe-type'])('does not open preview when %s', async scenario => {
  URL.createObjectURL = jest.fn();
  api.getExpenseProofs.mockResolvedValue([{ id: 'a'.repeat(64), name: 'Invoice.pdf' }]);
  if (scenario === 'denied') api.downloadPrivateGedDocument.mockRejectedValue(new Error('Forbidden'));
  else api.downloadPrivateGedDocument.mockResolvedValue(new Blob(['<script>'], { type: 'text/html' }));
  render(<LanguageProvider><ExpenseProofs expense={expense}/></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Justificatifs : DEP-SYNTH' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Afficher : Invoice.pdf' }));
  await screen.findByRole('alert');
  expect(URL.createObjectURL).not.toHaveBeenCalled();
});
test('loads only on action, shows invoice and receipt, closes with Escape',async()=>{
  api.getExpenseProofs.mockResolvedValue([{id:'a'.repeat(64),name:'Invoice.pdf',documentRole:'invoice',externalReference:'INV-SYNTH'},{id:'b'.repeat(64),name:'Receipt.pdf',documentRole:'payment_receipt'}]);
  render(<LanguageProvider><ExpenseProofs expense={expense}/></LanguageProvider>);
  expect(api.getExpenseProofs).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button',{name:'Justificatifs : DEP-SYNTH'}));
  expect(await screen.findByText('Facture · INV-SYNTH')).toBeInTheDocument();
  expect(screen.getByText('Reçu de paiement')).toBeInTheDocument();
  expect(api.getExpenseProofs).toHaveBeenCalledWith(expense.id,expect.any(Object));
  fireEvent.keyDown(screen.getByRole('dialog'),{key:'Escape'});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
test('denial is not presented as empty and no download is performed',async()=>{
  api.getExpenseProofs.mockRejectedValue(new Error('denied'));
  render(<LanguageProvider><ExpenseProofs expense={expense}/></LanguageProvider>);
  fireEvent.click(screen.getByRole('button',{name:'Justificatifs : DEP-SYNTH'}));
  await waitFor(()=>expect(screen.getByRole('alert')).toHaveTextContent('pas disponibles'));
  expect(api.downloadPrivateGedDocument).not.toHaveBeenCalled();
});
