import React from 'react';
import {render,screen,fireEvent,waitFor,act} from '@testing-library/react';
import ReturnImport from './ReturnImport';
jest.mock('../api',()=>({rhReturnTransport:jest.fn()}));
const employeeId='11111111-1111-4111-8111-111111111111';
const context={target:{employeeId,dossierRevision:2,period:'2026-09',kind:'salary'},expectation:{employeeName:'SYNTHETIC',amountXof:50000},expectedPreviousRevision:0,paymentConfirmed:false};
const declaration=patch=>({schema:'2sg.salary.declaration.local.v1',reference:'LOCAL-synthetic-2026-09',
  employee_name:'SYNTHETIC',role:'Test',site:'Synthetic site',payroll_period:'2026-09',amount_xof:50000,
  received_date:'2026-10-03',funding_channel:'Wave grouped transfer',group_transfer_date:'2026-10-03',
  individual_delivery_channel:null,status:'confirmed_local',note:'',channel:'direct',collector:null,
  recorded_at_client:'2026-10-05T10:00:00.000Z',authenticated:false,signature:null,sync_m3s:false,proof:null,...patch});
const saved=patch=>({status:'unverified_observations',paymentConfirmed:false,results:[{employeeId,period:'2026-09',kind:'salary',observationRevision:1,replayed:false,...patch}]});
async function choose(data) {
  const source=JSON.stringify(data);
  const input=await screen.findByLabelText('Fichier de déclaration JSON');
  await act(async()=>{
    fireEvent.change(input,{target:{files:[{name:'synthetic.json',size:source.length,text:async()=>source}]}});
  });
  return source;
}
beforeEach(()=>{Object.defineProperty(global,'crypto',{configurable:true,value:{randomUUID:()=> '22222222-2222-4222-8222-222222222222'}});});
test('imports only after explicit confirmation, keeping receipt unverified',async()=>{
  const transport=jest.fn().mockResolvedValueOnce(context).mockResolvedValueOnce(saved());
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  const input=await screen.findByLabelText('Fichier de déclaration JSON');
  const source=JSON.stringify(declaration());
  fireEvent.change(input,{target:{files:[{name:'synthetic.json',size:source.length,text:async()=>source}]}});
  await screen.findByText('Déclaration prête à importer');expect(transport).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button',{name:'Importer la déclaration'}));
  await screen.findByText('Déclaration enregistrée · réception non vérifiée');
  expect(transport.mock.calls[1][1].items[0]).toMatchObject({employeeId,period:'2026-09',kind:'salary',expectedPreviousRevision:0,source});
});
test('refuses another person before sending',async()=>{
  const transport=jest.fn().mockResolvedValue(context);
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  fireEvent.change(await screen.findByLabelText('Fichier de déclaration JSON'),{target:{files:[{name:'wrong.json',size:30,text:async()=>JSON.stringify({employee_name:'OTHER',payroll_period:'2026-09',amount_xof:30000})}]}});
  await screen.findByRole('alert');expect(screen.getByRole('button',{name:'Importer la déclaration'})).toBeDisabled();expect(transport).toHaveBeenCalledTimes(1);
});

test.each([
  {amount_xof:40000},
  {status:'difference_reported',received_date:null,note:'Synthetic difference to reconcile'}
])('keeps discrepancy $status $amount_xof visible without changing expectation',async patch=>{
  const transport=jest.fn().mockResolvedValueOnce(context).mockResolvedValueOnce(saved());
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  const source=await choose(declaration(patch));
  await screen.findByText('Écart déclaré · rapprochement requis');
  expect(screen.getByText(/Montant attendu: 50/)).toBeInTheDocument();
  expect(screen.getByText(/Montant déclaré:/)).toHaveTextContent(String(patch.amount_xof||50000).slice(0,2));
  expect(transport).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button',{name:'Importer la déclaration'}));
  await screen.findByText('Déclaration enregistrée · réception non vérifiée');
  expect(transport.mock.calls[1][1].items[0].source).toBe(source);
  expect(screen.getByText(/Montant attendu: 50/)).toBeInTheDocument();
});

test.each([
  {amount_xof:0},{amount_xof:4.2},{authenticated:true},{signature:'fake'},{sync_m3s:true},
  {schema:'unsupported'},{payroll_period:'2026-10'},{status:'difference_reported',note:''}
])('refuses invalid amount, period, schema or trust claim %j before submit',async patch=>{
  const transport=jest.fn().mockResolvedValue(context);
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  await choose(declaration(patch));
  await screen.findByRole('alert');
  expect(screen.getByRole('button',{name:'Importer la déclaration'})).toBeDisabled();
  expect(transport).toHaveBeenCalledTimes(1);
});

test.each([
  {employeeId:'33333333-3333-4333-8333-333333333333'},
  {period:'2026-10'},{kind:'hours'},{observationRevision:undefined},
  {observationRevision:2},{replayed:undefined}
])('does not announce success for an incompatible server response %j',async patch=>{
  const transport=jest.fn().mockResolvedValueOnce(context).mockResolvedValueOnce(saved(patch));
  render(<ReturnImport employeeId={employeeId} revision={2} transport={transport}/>);
  await choose(declaration()); await screen.findByText('Déclaration prête à importer');
  fireEvent.click(screen.getByRole('button',{name:'Importer la déclaration'}));
  await screen.findByRole('alert');
  expect(screen.queryByText('Déclaration enregistrée · réception non vérifiée')).not.toBeInTheDocument();
  expect(screen.getByText(/Révision précédente: 0/)).toBeInTheDocument();
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
