import React from 'react';
import { ClipboardCheck } from 'lucide-react';

const GovernedDecisionRecord = ({ labels, record }) => (
  <article className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-4" aria-labelledby={`${record.id}-title`}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="text-sky-300" size={18} aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase text-sky-300">{labels.eyebrow}</p>
          <h6 id={`${record.id}-title`} className="mt-1 text-sm font-semibold text-slate-100">{record.id} · {record.version}</h6>
        </div>
      </div>
      <span className="rounded-full border border-emerald-700 px-3 py-1 text-xs font-semibold text-emerald-200">{record.status}</span>
    </div>

    <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-md border border-slate-700 p-3">
        <dt className="text-xs font-semibold uppercase text-slate-400">{labels.author}</dt>
        <dd className="mt-1 text-sm text-slate-100">{record.author}</dd>
      </div>
      <div className="rounded-md border border-slate-700 p-3">
        <dt className="text-xs font-semibold uppercase text-slate-400">{labels.date}</dt>
        <dd className="mt-1 text-sm text-slate-100">{record.date}</dd>
      </div>
      <div className="rounded-md border border-slate-700 p-3 sm:col-span-2">
        <dt className="text-xs font-semibold uppercase text-slate-400">{labels.decision}</dt>
        <dd className="mt-1 text-sm leading-6 text-slate-100">{record.decision}</dd>
      </div>
      <div className="rounded-md border border-slate-700 p-3 sm:col-span-2">
        <dt className="text-xs font-semibold uppercase text-slate-400">{labels.evidence}</dt>
        <dd className="mt-1 text-sm leading-6 text-slate-300">{record.evidence}</dd>
      </div>
      <div className="rounded-md border border-amber-800/70 bg-amber-950/10 p-3 sm:col-span-2">
        <dt className="text-xs font-semibold uppercase text-amber-300">{labels.limit}</dt>
        <dd className="mt-1 text-sm leading-6 text-slate-300">{record.limit}</dd>
      </div>
    </dl>
  </article>
);

export default GovernedDecisionRecord;
