import React from 'react';
import {Upload, FileJson} from 'lucide-react';
import {rhReturnTransport} from '../api';
import './ReturnImport.css';
const h=React.createElement;
const labels={
  FR:{title:'Déclarations reçues',period:'Période',salary:'Salaire',hours:'Heures',file:'Fichier de déclaration JSON',send:'Importer la déclaration',ready:'Déclaration prête à importer',busy:'Contrôle en cours…',done:'Déclaration enregistrée · réception non vérifiée',error:'Import indisponible ou déclaration incompatible',denied:'Import non autorisé pour cette période',amount:'Montant attendu',revision:'Révision précédente'},
  EN:{title:'Received declarations',period:'Period',salary:'Salary',hours:'Hours',file:'JSON declaration file',send:'Import declaration',ready:'Declaration ready to import',busy:'Checking…',done:'Declaration saved · receipt unverified',error:'Import unavailable or incompatible declaration',denied:'Import not authorized for this period',amount:'Expected amount',revision:'Previous revision'},
  DE:{title:'Erhaltene Erklärungen',period:'Zeitraum',salary:'Gehalt',hours:'Stunden',file:'JSON-Erklärungsdatei',send:'Erklärung importieren',ready:'Erklärung zum Import bereit',busy:'Wird geprüft…',done:'Erklärung gespeichert · Empfang nicht geprüft',error:'Import nicht verfügbar oder Erklärung inkompatibel',denied:'Import für diesen Zeitraum nicht berechtigt',amount:'Erwarteter Betrag',revision:'Vorherige Revision'}
};
export default function ReturnImport({employeeId,revision,language='FR',transport=rhReturnTransport}) {
  const t=labels[language]||labels.FR;
  const [period,setPeriod]=React.useState('2026-09');
  const [kind,setKind]=React.useState('salary');
  const [context,setContext]=React.useState(null);
  const [pending,setPending]=React.useState(null);
  const [status,setStatus]=React.useState('busy');
  const epoch=React.useRef(0), controller=React.useRef(null),fileSerial=React.useRef(0);
  React.useEffect(()=>{
    const generation=++epoch.current; const abort=new AbortController(); controller.current=abort;
    setContext(null);setPending(null);setStatus('busy');
    Promise.resolve().then(()=>transport('/returns/context',{target:{employeeId,dossierRevision:revision,period,kind}},{signal:abort.signal}))
      .then(value=>{
        if(value?.target?.employeeId!==employeeId||value.target.dossierRevision!==revision||value.target.period!==period||value.target.kind!==kind||
          !Number.isSafeInteger(value.expectedPreviousRevision)||value.expectedPreviousRevision<0||
          !Number.isSafeInteger(value.expectation?.amountXof)||value.expectation.amountXof<0||typeof value.expectation.employeeName!=='string'||value.paymentConfirmed!==false) throw Error('invalid context');
        if(epoch.current===generation&&!abort.signal.aborted){setContext(value);setStatus('idle');}
      })
      .catch(error=>{if(epoch.current===generation&&!abort.signal.aborted)setStatus(error.status===403?'denied':'error');});
    return ()=>{epoch.current=generation+1;abort.abort();};
  },[employeeId,revision,period,kind,transport]);
  async function choose(event) {
    const file=event.target.files?.[0];event.target.value='';setPending(null);
    const generation=epoch.current,selection=++fileSerial.current;
    if(!file||!context)return;
    try {
      if(file.size>1024*1024)throw Error('too large');
      const source=await file.text(); const parsed=JSON.parse(source);
      const expected=context.expectation;
      if (!parsed||Array.isArray(parsed)||parsed.employee_name!==expected.employeeName||
        (kind==='salary'&&(parsed.payroll_period!==period||parsed.amount_xof!==expected.amountXof))||
        (kind==='hours'&&(!Array.isArray(parsed.entries)||!parsed.entries.length||parsed.entries.some(entry=>typeof entry.date!=='string'||entry.date.slice(0,7)!==period)))) throw Error('mismatch');
      if(epoch.current!==generation||selection!==fileSerial.current)return;
      setPending({source,requestId:crypto.randomUUID(),name:file.name});setStatus('ready');
    } catch {if(epoch.current===generation&&selection===fileSerial.current)setStatus('error');}
  }
  async function submit() {
    if(!pending||!context||status==='busy')return;
    const generation=epoch.current;setStatus('busy');
    try {
      const result=await transport('/returns/observations',{items:[{requestId:pending.requestId,employeeId,dossierRevision:revision,kind,period,expectedPreviousRevision:context.expectedPreviousRevision,source:pending.source}]},{signal:controller.current.signal});
      if(epoch.current!==generation)return;
      if(result.status!=='unverified_observations'||result.paymentConfirmed!==false||result.results?.length!==1)throw Error('unexpected result');
      setContext({...context,expectedPreviousRevision:result.results[0].observationRevision});setPending(null);setStatus('done');
    } catch {if(epoch.current===generation)setStatus('error');}
  }
  return h('section',{className:'rh-return-import space-y-3 border-t pt-4 mt-4','aria-busy':status==='busy'},
    h('h3',{className:'text-base font-semibold'},t.title),
    h('div',{className:'flex flex-wrap gap-3 items-center'},
      h('label',null,t.period,h('input',{type:'month',value:period,onChange:e=>setPeriod(e.target.value),className:'ml-2 rounded border p-2'})),
      h('div',{role:'group','aria-label':t.title,className:'flex gap-1'},...['salary','hours'].map(value=>h('button',{key:value,type:'button','aria-pressed':kind===value,onClick:()=>setKind(value),className:'m3s-secondary-button rounded border px-3 py-2'},t[value])))),
    context&&h('p',{className:'text-sm'},`${t.amount}: ${context.expectation.amountXof.toLocaleString()} FCFA · ${t.revision}: ${context.expectedPreviousRevision}`),
    context&&h('label',{className:'flex flex-wrap gap-2 items-center'},h(FileJson,{size:18,'aria-hidden':true}),t.file,h('input',{key:`${period}-${kind}`,type:'file',accept:'.json,application/json',onChange:choose,disabled:status==='busy'})),
    pending&&h('p',{className:'text-sm break-all'},pending.name),
    h('p',{role:status==='error'||status==='denied'?'alert':'status',className:'text-sm'},t[status]||''),
    context&&h('button',{type:'button',disabled:!pending||status==='busy',onClick:submit,className:'m3s-primary-button inline-flex gap-2 items-center rounded px-3 py-2 disabled:opacity-40'},h(Upload,{size:18,'aria-hidden':true}),t.send));
}
