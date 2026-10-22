import React from 'react';
import { X } from 'lucide-react';
import { formatRegistryDate } from './registryDate';
import { TOOL_FACTS, TOOL_FACTS_COPY } from './productionToolFactsData';

export default function ProductionToolFacts({ toolId, name, language = 'FR', external, onClose }) {
  const fact = TOOL_FACTS[toolId];
  const key = TOOL_FACTS_COPY[language] ? language : 'FR';
  const t = TOOL_FACTS_COPY[key];
  if (!fact) return null;
  return <section id={`production-help-${toolId}`} className="production-tool-facts w-full" aria-label={`${t.help} : ${name}`}>
    <div className="flex items-start justify-between gap-3"><p className="min-w-0 text-sm leading-6">{fact.purpose[key]}</p>
      <button type="button" className="m3s-secondary-button inline-flex h-11 w-11 shrink-0 items-center justify-center" onClick={onClose} title={t.close} aria-label={t.close}><X size={18} aria-hidden="true"/></button></div>
    <dl className="mt-3 grid gap-4 text-sm leading-6 md:grid-cols-2">
      <div><dt>{t.makers}</dt><dd>{fact.makers[key]}</dd></div>
      <div><dt>{t.systems}</dt><dd>{fact.systems[key]}</dd></div>
      {['protections', 'limits'].map(field => fact[field]?.[key] && <div key={field} className="md:col-span-2"><dt>{t[field]}</dt><dd><ul className="list-disc space-y-2 pl-5">{fact[field][key].map(text => <li key={text}>{text}</li>)}</ul></dd></div>)}
      <div><dt>{t.dates}</dt><dd><ol>{fact.dates.map(([date, kind]) => <li key={`${date}-${kind}`}><time dateTime={date}>{formatRegistryDate(date, key)}</time> : {t.kinds[kind]}</li>)}</ol></dd></div>
      <div><dt>{t.evidence}</dt><dd>{fact.evidence[key]}</dd></div>
      <div className="md:col-span-2"><dt>{t.effort}</dt><dd>{t.effortNote}</dd></div>
    </dl>
    {external && <p className="mt-3 text-sm leading-6">{t.external}</p>}
  </section>;
}
