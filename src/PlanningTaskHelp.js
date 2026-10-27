import React, { useId, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

const COPY = {
  FR: {
    help: 'Comprendre les propositions locales et les t\u00e2ches partag\u00e9es',
    title: 'De la proposition \u00e0 la t\u00e2che partag\u00e9e',
    items: [
      ['Proposition locale', 'Une action relev\u00e9e dans le journal et conserv\u00e9e dans ce navigateur. Elle ne fait pas partie, \u00e0 elle seule, du registre partag\u00e9 ni de ses compteurs.'],
      ['Validation humaine', 'Une personne relit la proposition et d\u00e9cide de la retenir, la corriger ou l\u2019\u00e9carter. Le statut \u00ab Valid\u00e9e \u00bb reste local : il ne confirme pas un enregistrement sur le serveur.'],
      ['T\u00e2che partag\u00e9e', 'Une action enregistr\u00e9e sur le serveur dans le p\u00e9rim\u00e8tre autoris\u00e9. Elle est rattach\u00e9e \u00e0 un projet et une phase, ou \u00e0 un plan op\u00e9rationnel.']
    ],
    project: 'Standardisation est un projet parmi d\u2019autres : il organise la standardisation des modules M3S. Toutes les propositions ne lui appartiennent pas et son enregistrement ne les transf\u00e8re pas.',
    flow: 'Journal \u2192 Proposition \u2192 Relecture et contr\u00f4le des doublons \u2192 Rattachement adapt\u00e9 \u2192 Enregistrement autoris\u00e9',
    limit: 'Le transfert g\u00e9n\u00e9ral n\u2019est pas automatique. \u00ab Pr\u00eat \u00e0 proposer \u00bb ne prouve pas une inscription \u00e0 l\u2019Agenda ; un statut local \u00ab Termin\u00e9e \u00bb ne cl\u00f4ture aucune t\u00e2che partag\u00e9e.'
  },
  DE: {
    help: 'Lokale Vorschl\u00e4ge und gemeinsame Aufgaben verstehen',
    title: 'Vom Vorschlag zur gemeinsamen Aufgabe',
    items: [
      ['Lokaler Vorschlag', 'Eine im Journal erfasste Aktion, die in diesem Browser gespeichert ist. Sie geh\u00f6rt dadurch allein weder zum gemeinsamen Register noch zu dessen Z\u00e4hlern.'],
      ['Menschliche Freigabe', 'Eine Person pr\u00fcft den Vorschlag und entscheidet, ob er beibehalten, korrigiert oder verworfen wird. Der Status \u201eFreigegeben\u201c bleibt lokal und best\u00e4tigt keine Speicherung auf dem Server.'],
      ['Gemeinsame Aufgabe', 'Eine innerhalb des erlaubten Umfangs auf dem Server gespeicherte Aktion. Sie ist einem Projekt und einer Phase oder einem Betriebsplan zugeordnet.']
    ],
    project: 'Standardisierung ist eines von mehreren Projekten: Es organisiert die Standardisierung der M3S-Module. Nicht alle Vorschl\u00e4ge geh\u00f6ren dazu; seine Registrierung \u00fcbertr\u00e4gt sie nicht.',
    flow: 'Journal \u2192 Vorschlag \u2192 Pr\u00fcfung und Duplikatkontrolle \u2192 Passende Zuordnung \u2192 Autorisierte Speicherung',
    limit: 'Die allgemeine \u00dcbertragung erfolgt nicht automatisch. \u201eVorschlagsbereit\u201c belegt keinen Agendaeintrag; der lokale Status \u201eAbgeschlossen\u201c schliesst keine gemeinsame Aufgabe ab.'
  },
  EN: {
    help: 'Understand local proposals and shared tasks',
    title: 'From proposal to shared task',
    items: [
      ['Local proposal', 'An action identified in the journal and stored in this browser. This alone does not make it part of the shared register or its counts.'],
      ['Human validation', 'A person reviews the proposal and decides to retain, correct or discard it. The local \u201cValidated\u201d status does not confirm a save on the server.'],
      ['Shared task', 'An action saved on the server within the authorised scope. It belongs to a project and phase, or to an operational plan.']
    ],
    project: 'Standardisation is one project among others: it organises the standardisation of M3S modules. Not all proposals belong to it, and registering the project does not transfer them.',
    flow: 'Journal \u2192 Proposal \u2192 Review and duplicate check \u2192 Appropriate assignment \u2192 Authorised save',
    limit: 'General transfer is not automatic. \u201cReady to propose\u201d does not prove an Agenda entry; a local \u201cCompleted\u201d status does not close any shared task.'
  }
};

export function PlanningTaskHelpContent({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const titleId = useId();
  return <section aria-labelledby={titleId} className="mt-3 min-w-0 border-t border-slate-700 pt-4 text-sm leading-6 text-slate-300">
    <h4 id={titleId} className="font-semibold text-slate-100">{t.title}</h4>
    <dl className="mt-3 grid min-w-0 gap-4 lg:grid-cols-3">
      {t.items.map(([label, body]) => <div key={label} className="min-w-0"><dt className="font-semibold text-slate-100">{label}</dt><dd className="mt-1 break-words">{body}</dd></div>)}
    </dl>
    <p className="mt-4 break-words">{t.project}</p>
    <p className="mt-3 break-words font-medium text-slate-100">{t.flow}</p>
    <p className="mt-3 break-words">{t.limit}</p>
  </section>;
}

export default function PlanningTaskHelp({ language = 'FR' }) {
  const t = COPY[language] || COPY.FR;
  const summary = useRef(null);
  return <details className="mt-3 min-w-0" onKeyDown={event => {
    if (event.key === 'Escape' && event.currentTarget.open) {
      event.currentTarget.open = false;
      summary.current?.focus();
      event.stopPropagation();
    }
  }}>
    <summary ref={summary} role="button" aria-label={t.help} title={t.help}
      className="m3s-secondary-button inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 [&::-webkit-details-marker]:hidden">
      <HelpCircle size={19} aria-hidden="true" />
    </summary>
    <PlanningTaskHelpContent language={language} />
  </details>;
}
