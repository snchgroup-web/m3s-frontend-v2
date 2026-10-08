import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContractDocuments, { validateContractList } from './ContractDocuments';
jest.mock('../PdfDocumentPreview', () => function Preview() { return <div>PDF preview</div>; });
const employeeId = 'ca70cac6-df8d-4ae8-ab3f-765f9358d513';
const document = { documentId: 'a'.repeat(64), versionId: 'b'.repeat(64), byteSize: 13 };
const payload = { employeeId, dossierRevision: 2, documents: [document] };
test('rejects mismatched scope, revision, duplicate and unexpected fields', () => {
  expect(validateContractList(payload, employeeId, 2)).toEqual([document]);
  for (const value of [{...payload, employeeId:'other'}, {...payload, dossierRevision:3},
    {...payload, documents:[document,document]}, {...payload, url:'https://example.com'}]) {
    expect(() => validateContractList(value,employeeId,2)).toThrow();
  }
});
test('opens the authenticated PDF and closes its preview', async () => {
  const transport = jest.fn().mockResolvedValueOnce({status:200,json:async()=>payload})
    .mockResolvedValueOnce({status:200,headers:{get:()=> 'application/pdf'},
      blob:async()=>new Blob(['%PDF-1234567\n'],{type:'application/pdf'})});
  render(<ContractDocuments employeeId={employeeId} revision={2} transport={transport}/>);
  fireEvent.click(await screen.findByRole('button',{name:'Afficher le projet de contrat'}));
  expect(await screen.findByText('PDF preview')).toBeInTheDocument();
  expect(transport.mock.calls[1][0]).toContain(`/versions/${document.versionId}?dossierRevision=2`);
  fireEvent.click(screen.getByRole('button',{name:'Refermer le document'}));
  expect(screen.queryByText('PDF preview')).not.toBeInTheDocument();
});
test('denied list is not exposed and messages follow the chosen language', async () => {
  render(<ContractDocuments employeeId={employeeId} revision={2} language="EN"
    transport={async()=>({status:403})}/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Documents unavailable or access denied');
  expect(screen.queryByRole('button',{name:'View contract draft'})).not.toBeInTheDocument();
});
test('aborts the old request on a dossier change', async () => {
  const transport = jest.fn(()=>new Promise(()=>{}));
  const {rerender,unmount} = render(<ContractDocuments employeeId={employeeId} revision={2} transport={transport}/>);
  await waitFor(()=>expect(transport).toHaveBeenCalledTimes(1));
  const signal = transport.mock.calls[0][1].signal;
  rerender(<ContractDocuments employeeId={employeeId} revision={3} transport={transport}/>);
  expect(signal.aborted).toBe(true);
  expect(screen.queryByText('PDF preview')).not.toBeInTheDocument();
  unmount();
});
