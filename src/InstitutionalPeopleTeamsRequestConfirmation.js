import React from 'react';
import { AlertTriangle, ClipboardCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DES DEMANDES · REF-01-DEC-016 · V1.0 · 26-08-2026',
    title: 'Confirmer le contenu sans autoriser le contact',
    intro: 'Cheikh confirme REF-01-G1-REQ-001 V0.1. La fiche est promue sans modification textuelle en V1.0 : ses quatre lots et ses six contrôles deviennent le cadre gouverné des demandes, sans destinataire nommé ni envoi.',
    counters: [['Lots confirmés', '4/4', 'Trois externes candidats, un interne'], ['Contrôles confirmés', '6/6', 'Obligatoires avant tout envoi'], ['Destinataires nommés', '0', 'Décision séparée requise'], ['Envois autorisés', '0', 'Aucune communication déclenchée']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-016', version: 'V1.0', status: 'Contenu et contrôles de REQ-001 confirmés', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-G1-REQ-001 V0.1 est confirmé et promu en V1.0. Les quatre lots de demande et les six contrôles préalables deviennent le cadre gouverné pour préparer les sollicitations nécessaires aux preuves du point 1.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « je confirme REQ-001 », en réponse à la fiche candidate publiée par la PR frontend nº 204 au commit df3b5c8b.',
      limit: 'La décision ne nomme ni n’autorise aucun destinataire, contact, adresse, canal concret, date d’envoi ou transmission. Elle n’autorise ni compte, essai, achat, fournisseur, donnée réelle, acceptation de preuve ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-REQ-001 V1.0 gouverne désormais le contenu des demandes, pas leur émission.',
    next: 'REF-01-G1-REC-001 V1.0 gouverne désormais les profils ; REF-01-G1-NAM-001 V0.1 prépare les emplacements vides avant toute inscription réelle.',
    boundary: 'G1 reste ouverte. Une demande confirmée n’est ni une demande envoyée, ni un appel d’offres, ni une sélection.'
  },
  EN: {
    eyebrow: 'HUMAN REQUEST CONFIRMATION · REF-01-DEC-016 · V1.0 · 26 AUG 2026',
    title: 'Confirm content without authorising contact',
    intro: 'Cheikh confirms REF-01-G1-REQ-001 V0.1. The sheet is promoted unchanged to V1.0: its four packages and six controls become the governed request framework, with no named recipient or send.',
    counters: [['Confirmed packages', '4/4', 'Three external candidates, one internal'], ['Confirmed controls', '6/6', 'Mandatory before any send'], ['Named recipients', '0', 'Separate decision required'], ['Authorised sends', '0', 'No communication triggered']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-016', version: 'V1.0', status: 'REQ-001 content and controls confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'REF-01-G1-REQ-001 V0.1 is confirmed and promoted to V1.0. Its four request packages and six pre-send controls become the governed framework for preparing the evidence requests needed for point 1.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “je confirme REQ-001”, in response to the candidate sheet published through frontend PR 204 at commit df3b5c8b.',
      limit: 'This decision names or authorises no recipient, contact, address, concrete channel, send date or transmission. It authorises no account, trial, purchase, provider, real data, evidence acceptance or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-REQ-001 V1.0 now governs request content, not release.',
    next: 'REF-01-G1-REC-001 V1.0 now governs profiles; REF-01-G1-NAM-001 V0.1 prepares empty slots before any real entry.',
    boundary: 'G1 remains open. A confirmed request is neither a sent request, request for proposal nor selection.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE ANFRAGEBESTÄTIGUNG · REF-01-DEC-016 · V1.0 · 26.08.2026',
    title: 'Inhalt bestätigen, ohne Kontakt zu autorisieren',
    intro: 'Cheikh bestätigt REF-01-G1-REQ-001 V0.1. Das Blatt wird unverändert zu V1.0: vier Anfragepakete und sechs Kontrollen bilden den gesteuerten Anfragerahmen, ohne benannten Empfänger oder Versand.',
    counters: [['Bestätigte Pakete', '4/4', 'Drei externe Kandidaten, eines intern'], ['Bestätigte Kontrollen', '6/6', 'Vor jedem Versand zwingend'], ['Benannte Empfänger', '0', 'Getrennter Entscheid erforderlich'], ['Autorisierte Sendungen', '0', 'Keine Kommunikation ausgelöst']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-016', version: 'V1.0', status: 'Inhalt und Kontrollen von REQ-001 bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'REF-01-G1-REQ-001 V0.1 ist bestätigt und wird zu V1.0. Vier Anfragepakete und sechs Kontrollen vor dem Versand bilden den gesteuerten Rahmen zur Vorbereitung der für Punkt 1 nötigen Nachweisanfragen.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: « je confirme REQ-001 », als Antwort auf das mit Frontend-PR 204 am Commit df3b5c8b veröffentlichte Kandidatenblatt.',
      limit: 'Der Entscheid benennt oder autorisiert keinen Empfänger, Kontakt, keine Adresse, keinen konkreten Kanal, kein Versanddatum und keine Übermittlung. Er autorisiert weder Account, Test, Kauf, Anbieter, reale Daten, Nachweisannahme noch L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-REQ-001 V1.0 steuert nun den Anfrageinhalt, nicht den Versand.',
    next: 'REF-01-G1-REC-001 V1.0 steuert nun die Profile; REF-01-G1-NAM-001 V0.1 bereitet leere Stellen vor jedem realen Eintrag vor.',
    boundary: 'G1 bleibt offen. Eine bestätigte Anfrage ist weder versandte Anfrage noch Ausschreibung oder Auswahl.'
  }
};

const InstitutionalPeopleTeamsRequestConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-request-confirmation" className="m3s-ref01-g1-request-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-request-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-request-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ClipboardCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index > 1 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <ClipboardCheck className="text-emerald-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsRequestConfirmation;
