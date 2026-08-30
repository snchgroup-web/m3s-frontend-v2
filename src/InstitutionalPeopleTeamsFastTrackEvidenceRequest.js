import React from 'react';
import { AlertTriangle, FileInput, LockKeyhole, Send, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'MODÈLE UNIQUE CANDIDAT · REF-01-G1-REQ-002 · V0.1 · 30-08-2026',
    title: 'Préparer une demande commune sans l’envoyer',
    intro: 'REQ-002 reprend les cinq dossiers confirmés par COL-003 V1.0 dans un modèle de sollicitation unique. Les destinataires, canaux, échéances et pièces sensibles restent volontairement non renseignés.',
    counters: [['Dossiers couverts', '5/5', 'COL-EXC-01 à COL-EXC-05'], ['Destinataires nommés', '0', 'Aucune personne sélectionnée'], ['Demandes envoyées', '0', 'Émission non autorisée'], ['Pièces reçues', '0', 'Collecte non ouverte']],
    fieldsTitle: 'Champs gouvernés avant toute émission',
    fields: ['Référence du dossier COL-EXC', 'Objet et liste minimale des pièces attendues', 'Fonction responsable candidate', 'Destinataire nommé à valider séparément', 'Canal autorisé et niveau de sensibilité', 'Échéance, accusé de réception et référence GED'],
    status: 'CANDIDAT · AUCUN ENVOI',
    decisionTitle: 'Prochain arbitrage groupé',
    decision: 'Confirmer : « Je confirme REF-01-G1-REQ-002 V0.1 comme modèle unique de demande de preuves, sans autoriser son envoi. » Amender : indiquer uniquement le champ à corriger.',
    boundary: 'La confirmation du modèle ne nommera aucun destinataire et n’autorisera aucun contact, envoi, collecte, transmission sensible, compte, test, dépense ou action L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE SINGLE TEMPLATE · REF-01-G1-REQ-002 · V0.1 · 30 AUG 2026',
    title: 'Prepare one shared request without sending it',
    intro: 'REQ-002 brings the five files confirmed by COL-003 V1.0 into one request template. Recipients, channels, deadlines and sensitive records remain deliberately unset.',
    counters: [['Covered files', '5/5', 'COL-EXC-01 through COL-EXC-05'], ['Named recipients', '0', 'No person selected'], ['Requests sent', '0', 'Release not authorised'], ['Records received', '0', 'Collection not open']],
    fieldsTitle: 'Governed fields before any release',
    fields: ['COL-EXC file reference', 'Purpose and minimum expected-record list', 'Candidate responsible function', 'Named recipient to be validated separately', 'Authorised channel and sensitivity level', 'Deadline, acknowledgement and DMS reference'],
    status: 'CANDIDATE · NO RELEASE',
    decisionTitle: 'Next grouped decision',
    decision: 'Confirm: “I confirm REF-01-G1-REQ-002 V0.1 as the single evidence-request template, without authorising its release.” Amend: identify only the field to correct.',
    boundary: 'Confirming the template will name no recipient and authorise no contact, release, collection, sensitive transmission, account, test, expense or L2 action.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR EINHEITSVORLAGE · REF-01-G1-REQ-002 · V0.1 · 30.08.2026',
    title: 'Eine gemeinsame Anfrage vorbereiten, ohne sie zu versenden',
    intro: 'REQ-002 führt die fünf mit COL-003 V1.0 bestätigten Akten in einer Anfragevorlage zusammen. Empfänger, Kanäle, Fristen und sensible Unterlagen bleiben bewusst offen.',
    counters: [['Abgedeckte Akten', '5/5', 'COL-EXC-01 bis COL-EXC-05'], ['Benannte Empfänger', '0', 'Keine Person ausgewählt'], ['Versandte Anfragen', '0', 'Versand nicht erlaubt'], ['Erhaltene Unterlagen', '0', 'Sammlung nicht geöffnet']],
    fieldsTitle: 'Gesteuerte Felder vor jedem Versand',
    fields: ['Referenz der COL-EXC-Akte', 'Zweck und minimale Liste erwarteter Unterlagen', 'Verantwortliche Kandidatenfunktion', 'Getrennt zu bestätigender benannter Empfänger', 'Autorisierter Kanal und Sensibilitätsstufe', 'Frist, Empfangsbestätigung und DMS-Referenz'],
    status: 'KANDIDAT · KEIN VERSAND',
    decisionTitle: 'Nächster gebündelter Entscheid',
    decision: 'Bestätigen: „Ich bestätige REF-01-G1-REQ-002 V0.1 als einheitliche Vorlage für Nachweisanfragen, ohne den Versand zu erlauben.“ Ändern: Nur das zu korrigierende Feld nennen.',
    boundary: 'Die Bestätigung der Vorlage benennt keinen Empfänger und erlaubt keinen Kontakt, Versand, keine Sammlung, sensible Übermittlung, kein Konto, keinen Test, keine Ausgabe oder L2-Aktion.'
  }
};

const InstitutionalPeopleTeamsFastTrackEvidenceRequest = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-req-002" data-testid="ref01-g1-fast-track-evidence-request" className="scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <FileInput className="shrink-0 text-violet-300" size={26} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <ShieldCheck className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <article className="mt-4 m3s-raised p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><h5 className="text-sm font-semibold text-slate-100">{t.fieldsTitle}</h5><span className="inline-flex rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.status}</span></div>
        <ol className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">{t.fields.map((field, index) => <li key={field} className="flex min-h-16 items-start gap-3 rounded-md border border-slate-700 p-3 text-xs leading-5 text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-950/60 font-semibold text-violet-200">{index + 1}</span>{field}</li>)}</ol>
      </article>

      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-4"><div className="flex items-center gap-2"><Send className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceRequest;
