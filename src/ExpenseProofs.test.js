import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExpenseProofs from './ExpenseProofs';
import { LanguageProvider } from './LanguageContext';
import api from './api';
jest.mock('./api',()=>({__esModule:true,default:{getExpenseProofs:jest.fn(),downloadPrivateGedDocument:jest.fn()}}));
const expense={id:'DEP-SYNTH',ref:'DEP-SYNTH',description:'Synthetic expense'};
beforeEach(()=>{localStorage.clear(); jest.clearAllMocks();});
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
