import React from 'react';
import { AlertTriangle, ClipboardCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA COLLECTE · REF-01-DEC-015 · V1.0 · 26-08-2026',
    title: 'Gouverner le périmètre, les canaux et les responsabilités',
    intro: 'Cheikh confirme et indique avoir amendé le périmètre, les canaux et les responsables du paquet. Aucun libellé distinct d’amendement n’étant précisé, REF-01-G1-COL-001 V0.1 est promu sans modification textuelle en V1.0 ; toute modification ultérieure sera consignée séparément.',
    counters: [['Périmètre confirmé', '7/7', 'Une exigence par emplacement'], ['Canaux gouvernés', '3', 'Officiel, interne autorisé, contact autorisé'], ['Fonctions responsables', '5', 'Aucune personne externe nommée'], ['Envois autorisés', '0', 'Autorisation séparée requise']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-015', version: 'V1.0', status: 'Périmètre, canaux et responsabilités confirmés', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-G1-COL-001 V0.1 est confirmé et promu en V1.0. Les sept emplacements, les canaux admissibles et les fonctions de préparation, contrôle, décision et conservation deviennent le cadre gouverné de collecte.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « je confirme et amende Périm, canaux, responsable », en réponse au paquet publié par la PR frontend nº 203 au commit 526042b0.',
      limit: 'La décision n’autorise aucun destinataire nommé, contact, envoi, compte, essai, achat, sélection, traitement de donnée réelle ou ouverture de L2. Aucun amendement textuel n’est déduit sans contenu distinct.'
    },
    status: 'CONFIRMÉ · REF-01-G1-COL-001 V1.0 devient le cadre gouverné de préparation de la collecte.',
    next: 'Prochaine étape : préparer les demandes candidates et soumettre séparément leurs destinataires et leur envoi à autorisation humaine.',
    boundary: 'G1 reste ouverte. Confirmer l’organisation de la collecte ne vaut ni sollicitation externe ni acceptation d’une preuve.'
  },
  EN: {
    eyebrow: 'HUMAN COLLECTION CONFIRMATION · REF-01-DEC-015 · V1.0 · 26 AUG 2026',
    title: 'Govern scope, channels and responsibilities',
    intro: 'Cheikh confirms and states that the package scope, channels and owners are amended. As no distinct amendment wording is supplied, REF-01-G1-COL-001 V0.1 is promoted unchanged to V1.0; any later change must be recorded separately.',
    counters: [['Confirmed scope', '7/7', 'One slot per requirement'], ['Governed channels', '3', 'Official, authorised internal, authorised contact'], ['Responsible functions', '5', 'No external person named'], ['Authorised sends', '0', 'Separate authorisation required']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-015', version: 'V1.0', status: 'Scope, channels and responsibilities confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'REF-01-G1-COL-001 V0.1 is confirmed and promoted to V1.0. Its seven slots, admissible channels and preparation, control, decision and retention functions become the governed collection framework.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “je confirme et amende Périm, canaux, responsable”, in response to the package published through frontend PR 203 at commit 526042b0.',
      limit: 'This decision authorises no named recipient, contact, send, account, trial, purchase, selection, real-data processing or L2 opening. No textual amendment is inferred without distinct wording.'
    },
    status: 'CONFIRMED · REF-01-G1-COL-001 V1.0 becomes the governed collection-preparation framework.',
    next: 'Next step: prepare candidate requests and submit their recipients and release separately for human authorisation.',
    boundary: 'G1 remains open. Confirming collection organisation is neither an external request nor acceptance of evidence.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE SAMMLUNGSBESTÄTIGUNG · REF-01-DEC-015 · V1.0 · 26.08.2026',
    title: 'Umfang, Kanäle und Verantwortung steuern',
    intro: 'Cheikh bestätigt und bezeichnet Umfang, Kanäle und Verantwortung des Pakets als geändert. Da kein gesonderter Änderungstext vorliegt, wird REF-01-G1-COL-001 V0.1 unverändert zu V1.0; jede spätere Änderung wird getrennt dokumentiert.',
    counters: [['Bestätigter Umfang', '7/7', 'Eine Stelle je Anforderung'], ['Gesteuerte Kanäle', '3', 'Offiziell, intern autorisiert, Kontakt autorisiert'], ['Verantwortliche Funktionen', '5', 'Keine externe Person benannt'], ['Autorisierte Sendungen', '0', 'Getrennter Entscheid erforderlich']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-015', version: 'V1.0', status: 'Umfang, Kanäle und Verantwortung bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'REF-01-G1-COL-001 V0.1 ist bestätigt und wird zu V1.0. Die sieben Stellen, zulässigen Kanäle sowie Funktionen für Vorbereitung, Kontrolle, Entscheid und Aufbewahrung bilden den gesteuerten Sammlungsrahmen.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: « je confirme et amende Périm, canaux, responsable », als Antwort auf das mit Frontend-PR 203 am Commit 526042b0 veröffentlichte Paket.',
      limit: 'Der Entscheid autorisiert keinen benannten Empfänger, Kontakt, Versand, Account, Test, Kauf, Auswahl, keine Verarbeitung realer Daten und keine L2-Öffnung. Ohne gesonderten Inhalt wird keine Textänderung abgeleitet.'
    },
    status: 'BESTÄTIGT · REF-01-G1-COL-001 V1.0 wird zum gesteuerten Rahmen der Sammlungsvorbereitung.',
    next: 'Nächster Schritt: Anfrageentwürfe vorbereiten und Empfänger sowie Versand getrennt zur menschlichen Autorisierung vorlegen.',
    boundary: 'G1 bleibt offen. Die Bestätigung der Sammlungsorganisation ist weder externe Anfrage noch Annahme eines Nachweises.'
  }
};

const InstitutionalPeopleTeamsCollectionConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-collection-confirmation" className="m3s-ref01-g1-collection-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-collection-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-collection-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ClipboardCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 3 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <ClipboardCheck className="text-emerald-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsCollectionConfirmation;
