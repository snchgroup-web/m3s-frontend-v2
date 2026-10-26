import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, ExternalLink, HelpCircle, X } from 'lucide-react';
import { getContextualHelp } from './contextualHelpContexts';
import { PlanningTaskHelpContent } from './PlanningTaskHelp';

const COPY = {
  FR: { help: 'Aide contextuelle', close: 'Fermer l’aide', source: 'Glossaire central 2SG', open: 'Voir dans le Glossaire', newTab: 'Nouvel onglet', candidate: 'Définition proposée', validated: 'Définition validée', limit: 'Cette aide ne modifie aucune donnée et ne donne aucun droit supplémentaire.' },
  DE: { help: 'Kontexthilfe', close: 'Hilfe schließen', source: 'Zentrales 2SG-Glossar', open: 'Im Glossar anzeigen', newTab: 'Neuer Tab', candidate: 'Vorgeschlagene Definition', validated: 'Validierte Definition', limit: 'Diese Hilfe ändert keine Daten und gewährt keine zusätzlichen Rechte.' },
  EN: { help: 'Contextual help', close: 'Close help', source: '2SG Central Glossary', open: 'View in Glossary', newTab: 'New tab', candidate: 'Proposed definition', validated: 'Validated definition', limit: 'This help does not change any data or grant additional permissions.' }
};

export default function ContextualHelp({ pathname, search = '', language = 'FR', pageTitle }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();
  const t = COPY[language] || COPY.FR;
  const context = getContextualHelp(pathname, search, language);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  if (!context || !context.entries.length) return null;
  const close = () => {
    dialogRef.current?.close();
    setOpen(false);
    triggerRef.current?.focus();
  };

  return <>
    <button ref={triggerRef} type="button" className="icon-button" aria-label={t.help} title={t.help}
      aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      <HelpCircle size={20} className="text-sky-400" aria-hidden="true" />
    </button>
    {open && createPortal(<dialog ref={dialogRef} aria-labelledby={titleId} className="m3s-context-help"
      onCancel={event => { event.preventDefault(); close(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll('button, a[href]');
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
      }}>
      <div className="m3s-context-help__heading">
        <div className="min-w-0">
          <h2 id={titleId} className="text-lg font-semibold">{t.help}</h2>
          <p className="m3s-context-help__secondary mt-1 break-words text-sm">{pageTitle}</p>
        </div>
        <button type="button" autoFocus onClick={close} className="m3s-secondary-button inline-flex h-11 w-11 shrink-0 items-center justify-center"
          aria-label={t.close} title={t.close}><X size={20} aria-hidden="true" /></button>
      </div>
      {context.planning && <PlanningTaskHelpContent language={language} />}
      <p className="m3s-context-help__secondary mt-5 flex items-center gap-2 text-xs font-semibold">
        <BookOpen size={16} aria-hidden="true" />{t.source}
      </p>
      <dl>
        {context.entries.map(entry => <div key={entry.id} className="m3s-context-help__entry" data-term-id={entry.id}>
          <dt className="font-semibold">{entry.term}</dt>
          <dd>
            <p className="mt-2 text-sm leading-6">{entry.shortDefinition}</p>
            <p className="m3s-context-help__secondary mt-2 text-xs">{entry.status === 'candidate' ? t.candidate : t.validated} · {entry.version}</p>
            {entry.status !== 'candidate' && <a className="m3s-context-help__link mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
              href={`/ged?tab=knowledge&term=${encodeURIComponent(entry.id)}`} target="_blank" rel="noopener noreferrer"
              aria-label={`${t.open} : ${entry.term} (${t.newTab})`}>
              {t.open}<ExternalLink size={15} aria-hidden="true" />
            </a>}
          </dd>
        </div>)}
      </dl>
      <p className="m3s-context-help__secondary mt-4 text-xs leading-5">{t.limit}</p>
    </dialog>, document.body)}
  </>;
}
