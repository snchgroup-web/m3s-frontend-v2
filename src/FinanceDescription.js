import React from 'react';
import { Languages } from 'lucide-react';
import { translateFinanceDescription } from './financeDescriptionTranslation';

const labels = { FR: 'Description d’origine', EN: 'Original description', DE: 'Originalbeschreibung' };

export default function FinanceDescription({ value, language }) {
  const display = translateFinanceDescription(value, language);
  const label = labels[language] || labels.FR;
  return <>
    <span>{display}</span>
    {display !== value && <details className="mt-1 max-w-sm" onClick={event => event.stopPropagation()} onKeyDown={event => event.stopPropagation()}>
      <summary title={label} aria-label={label} className="flex min-h-11 w-11 cursor-pointer list-none items-center justify-center rounded border border-slate-600 text-blue-400 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2">
        <Languages size={17} aria-hidden="true" />
      </summary>
      <p className="mt-1 whitespace-pre-wrap break-words text-xs text-slate-400">{value}</p>
    </details>}
  </>;
}
