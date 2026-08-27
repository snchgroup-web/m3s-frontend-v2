import React from 'react';
import { BookOpenCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'LÉGENDE LOCALE · CODES DE PILOTAGE REF-01',
    title: 'Comprendre les sigles sans quitter le dossier',
    intro: 'Ces codes abrègent les supports de travail. Ils identifient une fonction documentaire ; ils ne prouvent ni validation, ni exécution, ni autorisation réelle.',
    groups: [
      ['Gouvernance', [['REF', 'Référentiel'], ['G1', 'Porte de décision 1'], ['DEC', 'Décision gouvernée'], ['ADR', 'Registre de décision d’architecture']]],
      ['Collecte préparatoire', [['EVD', 'Preuves attendues'], ['COL', 'Collecte'], ['REQ', 'Demande'], ['REC', 'Destinataire'], ['NAM', 'Destinataire nommé']]],
      ['Autorisation et traitement', [['AUT', 'Autorisation'], ['IDN', 'Identification ou identité'], ['PRI', 'Priorisation'], ['SEL', 'Sélection'], ['BAT', 'Batch ou lot de traitement'], ['WAV', 'Vague de travail']]],
      ['Livraison', [['ML', 'Micro-lot'], ['IMP', 'Implémentation']]]
    ],
    note: 'Code normalisé retenu pour l’identité : IDN. IDE n’est pas utilisé dans cette séquence.'
  },
  EN: {
    eyebrow: 'LOCAL LEGEND · REF-01 GOVERNANCE CODES',
    title: 'Understand the codes without leaving the file',
    intro: 'These codes abbreviate working records. They identify a documentary function; they prove neither approval, execution nor a real authorisation.',
    groups: [
      ['Governance', [['REF', 'Reference system'], ['G1', 'Decision gate 1'], ['DEC', 'Governed decision'], ['ADR', 'Architecture decision record']]],
      ['Preparation and collection', [['EVD', 'Expected evidence'], ['COL', 'Collection'], ['REQ', 'Request'], ['REC', 'Recipient'], ['NAM', 'Named recipient']]],
      ['Authorisation and processing', [['AUT', 'Authorisation'], ['IDN', 'Identification or identity'], ['PRI', 'Prioritisation'], ['SEL', 'Selection'], ['BAT', 'Batch or processing package'], ['WAV', 'Work wave']]],
      ['Delivery', [['ML', 'Micro-package'], ['IMP', 'Implementation']]]
    ],
    note: 'The standard identity code is IDN. IDE is not used in this sequence.'
  },
  DE: {
    eyebrow: 'LOKALE LEGENDE · STEUERUNGSCODES REF-01',
    title: 'Die Kürzel verstehen, ohne die Akte zu verlassen',
    intro: 'Diese Codes kürzen Arbeitsnachweise ab. Sie bezeichnen eine Dokumentfunktion und beweisen weder Genehmigung noch Ausführung oder reale Autorisierung.',
    groups: [
      ['Governance', [['REF', 'Referenzsystem'], ['G1', 'Entscheidtor 1'], ['DEC', 'Gesteuerter Entscheid'], ['ADR', 'Architekturentscheidungsregister']]],
      ['Vorbereitung und Sammlung', [['EVD', 'Erwartete Nachweise'], ['COL', 'Sammlung'], ['REQ', 'Anfrage'], ['REC', 'Empfänger'], ['NAM', 'Benannter Empfänger']]],
      ['Autorisierung und Verarbeitung', [['AUT', 'Autorisierung'], ['IDN', 'Identifikation oder Identität'], ['PRI', 'Priorisierung'], ['SEL', 'Auswahl'], ['BAT', 'Batch oder Verarbeitungspaket'], ['WAV', 'Arbeitswelle']]],
      ['Lieferung', [['ML', 'Mikropaket'], ['IMP', 'Implementierung']]]
    ],
    note: 'Der standardisierte Identitätscode ist IDN. IDE wird in dieser Sequenz nicht verwendet.'
  }
};

const InstitutionalReferenceCodeLegend = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-code-legend" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-code-legend-title">
      <div className="flex items-start gap-3">
        <BookOpenCheck className="mt-0.5 shrink-0 text-violet-300" size={21} aria-hidden="true" />
        <div><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-code-legend-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.groups.map(([group, entries]) => <article key={group} className="m3s-raised p-3" data-testid="ref01-code-group"><p className="text-xs font-semibold text-slate-200">{group}</p><dl className="mt-3 space-y-2">{entries.map(([code, meaning]) => <div key={code} className="grid grid-cols-[3.5rem_1fr] gap-2 text-xs leading-5"><dt className="font-semibold text-violet-200">{code}</dt><dd className="text-slate-300">{meaning}</dd></div>)}</dl></article>)}
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.note}</p>
    </section>
  );
};

export default InstitutionalReferenceCodeLegend;
