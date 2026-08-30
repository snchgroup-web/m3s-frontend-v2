import React from 'react';
import { AlertTriangle, FileInput, LockKeyhole, Send, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'MODÈLE UNIQUE CONFIRMÉ · REF-01-G1-REQ-002 · V1.0 · 30-08-2026',
    title: 'Un modèle commun confirmé, aucun envoi autorisé',
    intro: 'DEC-069 confirme REQ-002 comme modèle unique couvrant les cinq dossiers de COL-003 V1.0. Les destinataires, canaux, échéances et pièces sensibles restent volontairement non renseignés.',
    counters: [['Dossiers couverts', '5/5', 'COL-EXC-01 à COL-EXC-05'], ['Décisions enregistrées', '1', 'REF-01-DEC-069'], ['Demandes envoyées', '0', 'Émission non autorisée'], ['Pièces reçues', '0', 'Collecte non ouverte']],
    fieldsTitle: 'Champs gouvernés avant toute émission',
    fields: ['Référence du dossier COL-EXC', 'Objet et liste minimale des pièces attendues', 'Fonction responsable candidate', 'Destinataire nommé à valider séparément', 'Canal autorisé et niveau de sensibilité', 'Échéance, accusé de réception et référence GED'],
    status: 'CONFIRMÉ · AUCUN ENVOI',
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'REQ-002 V1.0 gouverne désormais le modèle de demande, pas son émission. REC-002 V0.1, présenté ensuite, prépare les cinq profils destinataires sans nommer personne.',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-069', version: 'V1.0', status: 'REQ-002 confirmé sans autorisation d’envoi', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-REQ-002 V0.1 est confirmé sans amendement et promu en V1.0 comme modèle unique de demande de preuves couvrant les cinq dossiers COL-EXC.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « Je confirme REF-01-G1-REQ-002 V0.1 comme modèle unique de demande de preuves, sans autoriser son envoi. »', limit: 'La décision confirme le modèle, pas son émission. Elle ne nomme aucun destinataire et n’autorise aucun contact, canal, envoi, collecte, transmission sensible, compte, test, dépense ou action L2 ; G1 reste ouverte.' },
    boundary: 'Les demandes envoyées et les pièces reçues restent à zéro. Toute désignation nominative, tout canal, envoi ou collecte exige encore une autorisation humaine distincte.'
  },
  EN: {
    eyebrow: 'CONFIRMED SINGLE TEMPLATE · REF-01-G1-REQ-002 · V1.0 · 30 AUG 2026',
    title: 'One shared template confirmed, no release authorised',
    intro: 'DEC-069 confirms REQ-002 as the single template covering the five COL-003 V1.0 files. Recipients, channels, deadlines and sensitive records remain deliberately unset.',
    counters: [['Covered files', '5/5', 'COL-EXC-01 through COL-EXC-05'], ['Recorded decisions', '1', 'REF-01-DEC-069'], ['Requests sent', '0', 'Release not authorised'], ['Records received', '0', 'Collection not open']],
    fieldsTitle: 'Governed fields before any release',
    fields: ['COL-EXC file reference', 'Purpose and minimum expected-record list', 'Candidate responsible function', 'Named recipient to be validated separately', 'Authorised channel and sensitivity level', 'Deadline, acknowledgement and DMS reference'],
    status: 'CONFIRMED · NO RELEASE',
    decisionTitle: 'Fast Track decision outcome',
    decision: 'REQ-002 V1.0 now governs the request template, not its release. REC-002 V0.1, shown next, prepares five recipient profiles without naming anyone.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-069', version: 'V1.0', status: 'REQ-002 confirmed without release authorisation', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-REQ-002 V0.1 is confirmed without amendment and promoted to V1.0 as the single evidence-request template covering the five COL-EXC files.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session: “I confirm REF-01-G1-REQ-002 V0.1 as the single evidence-request template, without authorising its release.”', limit: 'The decision confirms the template, not its release. It names no recipient and authorises no contact, channel, release, collection, sensitive transmission, account, test, expense or L2 action; G1 remains open.' },
    boundary: 'Requests sent and records received remain at zero. Any named designation, channel, release or collection still requires a separate human authorisation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE EINHEITSVORLAGE · REF-01-G1-REQ-002 · V1.0 · 30.08.2026',
    title: 'Eine gemeinsame Vorlage bestätigt, kein Versand erlaubt',
    intro: 'DEC-069 bestätigt REQ-002 als einheitliche Vorlage für die fünf Akten von COL-003 V1.0. Empfänger, Kanäle, Fristen und sensible Unterlagen bleiben bewusst offen.',
    counters: [['Abgedeckte Akten', '5/5', 'COL-EXC-01 bis COL-EXC-05'], ['Erfasste Entscheide', '1', 'REF-01-DEC-069'], ['Versandte Anfragen', '0', 'Versand nicht erlaubt'], ['Erhaltene Unterlagen', '0', 'Sammlung nicht geöffnet']],
    fieldsTitle: 'Gesteuerte Felder vor jedem Versand',
    fields: ['Referenz der COL-EXC-Akte', 'Zweck und minimale Liste erwarteter Unterlagen', 'Verantwortliche Kandidatenfunktion', 'Getrennt zu bestätigender benannter Empfänger', 'Autorisierter Kanal und Sensibilitätsstufe', 'Frist, Empfangsbestätigung und DMS-Referenz'],
    status: 'BESTÄTIGT · KEIN VERSAND',
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'REQ-002 V1.0 steuert nun die Anfragevorlage, nicht den Versand. Das nachfolgende REC-002 V0.1 bereitet fünf Empfängerprofile vor, ohne jemanden zu benennen.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-069', version: 'V1.0', status: 'REQ-002 ohne Versandfreigabe bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-REQ-002 V0.1 wird ohne Änderung bestätigt und zu V1.0 als einheitliche Vorlage für Nachweisanfragen zu den fünf COL-EXC-Akten.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026: „Ich bestätige REF-01-G1-REQ-002 V0.1 als einheitliche Vorlage für Nachweisanfragen, ohne den Versand zu erlauben.“', limit: 'Der Entscheid bestätigt die Vorlage, nicht den Versand. Er benennt keinen Empfänger und erlaubt keinen Kontakt, Kanal, Versand, keine Sammlung, sensible Übermittlung, kein Konto, keinen Test, keine Ausgabe oder L2-Aktion; G1 bleibt offen.' },
    boundary: 'Versandte Anfragen und erhaltene Unterlagen bleiben bei null. Jede namentliche Bestimmung, jeder Kanal, Versand oder jede Sammlung benötigt weiterhin einen getrennten menschlichen Entscheid.'
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
        <div className="flex flex-wrap items-start justify-between gap-3"><h5 className="text-sm font-semibold text-slate-100">{t.fieldsTitle}</h5><span className="inline-flex rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.status}</span></div>
        <ol className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">{t.fields.map((field, index) => <li key={field} className="flex min-h-16 items-start gap-3 rounded-md border border-slate-700 p-3 text-xs leading-5 text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-950/60 font-semibold text-violet-200">{index + 1}</span>{field}</li>)}</ol>
      </article>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-4"><div className="flex items-center gap-2"><Send className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceRequest;
