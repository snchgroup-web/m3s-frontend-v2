import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import ReturnImport from './ReturnImport';
jest.mock('../api',()=>({rhReturnTransport:jest.fn()}));
const employeeId='11111111-1111-4111-8111-111111111111';
const context={target:{employeeId,dossierRevision:2,period:'2026-09',kind:'salary'},expectation:{employeeName:'SYNTHETIC',amountXof:50000},expectedPreviousRevision:0,paymentConfirmed:false};
beforeEach(()=>{Object.defineProperty(global,'crypto',{configurable:true,value:{randomUUID:()=> '22222222-2222-4222-8222-222222222222'}});});
test('imports only after explicit confirmation, keeping receipt unverified',async()=>{
  const transport=jest.fn().mockResolvedValueOnce(context).mockResolvedValueOnce({status:'unverified_observations',paymentConfirmed:false,results:[{observationRevision:1}]});
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  const input=await screen.findByLabelText('Fichier de déclaration JSON');
  const source=JSON.stringify({employee_name:'SYNTHETIC',payroll_period:'2026-09',amount_xof:50000});
  fireEvent.change(input,{target:{files:[{name:'synthetic.json',size:source.length,text:async()=>source}]}});
  await screen.findByText('Déclaration prête à importer');expect(transport).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button',{name:'Importer la déclaration'}));
  await screen.findByText('Déclaration enregistrée · réception non vérifiée');
  expect(transport.mock.calls[1][1].items[0]).toMatchObject({employeeId,period:'2026-09',kind:'salary',expectedPreviousRevision:0,source});
});
test('refuses another person or amount before sending',async()=>{
  const transport=jest.fn().mockResolvedValue(context);
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  fireEvent.change(await screen.findByLabelText('Fichier de déclaration JSON'),{target:{files:[{name:'wrong.json',size:30,text:async()=>JSON.stringify({employee_name:'OTHER',payroll_period:'2026-09',amount_xof:30000})}]}});
  await screen.findByRole('alert');expect(screen.getByRole('button',{name:'Importer la déclaration'})).toBeDisabled();expect(transport).toHaveBeenCalledTimes(1);
});
test('denied context exposes no importer',async()=>{
  render(<ReturnImport employeeId={employeeId} revision={2} language="EN" transport={async()=>{throw Object.assign(Error(),{status:403});}}/>);
  expect(await screen.findByRole('alert')).toHaveTextContent('Import not authorized');
  expect(screen.queryByLabelText('JSON declaration file')).not.toBeInTheDocument();
});
test('aborts a pending request on dossier change and ignores stale response',async()=>{
  let resolve;const transport=jest.fn(()=>new Promise(r=>{resolve=r;}));
  const {rerender}=render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  await waitFor(()=>expect(transport).toHaveBeenCalledTimes(1));
  const signal=transport.mock.calls[0][2].signal; const old=resolve;
  rerender(<ReturnImport employeeId={employeeId} revision={3} transport={transport}/>);
  expect(signal.aborted).toBe(true);old(context);
  await waitFor(()=>expect(transport).toHaveBeenCalledTimes(2));
  expect(screen.queryByLabelText('Fichier de déclaration JSON')).not.toBeInTheDocument();
});
