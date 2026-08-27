import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU GABARIT UNITAIRE · REF-01-DEC-020 · V1.0 · 27-08-2026',
    title: 'Confirmer le gabarit sans inscrire une identité',
    intro: 'Cheikh confirme REF-01-G1-IDN-001 V0.1. Le gabarit est promu sans modification de fond en V1.0 : ses quatre groupes et douze champs deviennent le cadre gouverné d’une future fiche unitaire, qui reste entièrement vide.',
    counters: [['Gabarit confirmé', '1/1', 'Toujours vide'], ['Groupes confirmés', '4/4', 'Cadre seulement'], ['Champs confirmés', '12/12', 'Aucune valeur réelle'], ['Identités ou autorisations', '0', 'Décisions ultérieures']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-020', version: 'V1.0', status: 'Gabarit IDN-001 confirmé et maintenu vide', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-IDN-001 V0.1 est confirmé et promu en V1.0. Ses quatre groupes et douze champs deviennent le cadre gouverné avant toute future fiche contenant une identité réelle.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « je confirme », après clarification du terme « amender » et en réponse au gabarit publié par la PR frontend nº 208 au commit 35edccd.',
      limit: 'Cette décision ne choisit aucun dossier AUT, ne remplit aucun champ, n’inscrit ni n’autorise aucune identité et n’autorise aucun contact ou envoi. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-IDN-001 V1.0 gouverne désormais la structure des futures fiches unitaires, sans en créer aucune.',
    next: 'Étapes accomplies : PRI-001, SEL-001, BAT-001 et WAV-001 sont confirmés en V1.0 ; la vague 1 est ouverte sans identité réelle.',
    boundary: 'G1 reste ouverte. Confirmer le gabarit ne vaut ni choix d’un dossier AUT, ni inscription nominative, ni autorisation individuelle, de contact ou d’envoi.'
  },
  EN: {
    eyebrow: 'HUMAN INDIVIDUAL-TEMPLATE CONFIRMATION · REF-01-DEC-020 · V1.0 · 27 AUG 2026',
    title: 'Confirm the template without recording an identity',
    intro: 'Cheikh confirms REF-01-G1-IDN-001 V0.1. The template is promoted unchanged in substance to V1.0: its four groups and twelve fields become the governed framework for one future individual record, which remains entirely empty.',
    counters: [['Confirmed template', '1/1', 'Still empty'], ['Confirmed groups', '4/4', 'Framework only'], ['Confirmed fields', '12/12', 'No real value'], ['Identities or authorisations', '0', 'Later decisions']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-020', version: 'V1.0', status: 'IDN-001 template confirmed and kept empty', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-IDN-001 V0.1 is confirmed and promoted to V1.0. Its four groups and twelve fields become the governed framework before any future record containing a real identity.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “je confirme”, after clarification of the term “amend” and in response to the template published through frontend PR 208 at commit 35edccd.',
      limit: 'This decision selects no AUT file, fills no field, records or authorises no identity and authorises no contact or send. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · REF-01-G1-IDN-001 V1.0 now governs the structure of future individual records without creating one.',
    next: 'Completed steps: PRI-001, SEL-001, BAT-001 and WAV-001 are confirmed as V1.0; Wave 1 is open without a real identity.',
    boundary: 'G1 remains open. Confirming the template is neither an AUT-file choice nor a named record or individual, contact or send authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER EINZELVORLAGE · REF-01-DEC-020 · V1.0 · 27.08.2026',
    title: 'Die Vorlage bestätigen, ohne eine Identität zu erfassen',
    intro: 'Cheikh bestätigt REF-01-G1-IDN-001 V0.1. Die Vorlage wird inhaltlich unverändert zu V1.0: vier Gruppen und zwölf Felder bilden den gesteuerten Rahmen für eine künftige Einzelakte, die vollständig leer bleibt.',
    counters: [['Bestätigte Vorlage', '1/1', 'Weiterhin leer'], ['Bestätigte Gruppen', '4/4', 'Nur Rahmen'], ['Bestätigte Felder', '12/12', 'Kein realer Wert'], ['Identitäten oder Autorisierungen', '0', 'Spätere Entscheide']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-020', version: 'V1.0', status: 'Vorlage IDN-001 bestätigt und leer gehalten', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-IDN-001 V0.1 ist bestätigt und wird zu V1.0. Vier Gruppen und zwölf Felder bilden den gesteuerten Rahmen vor jeder künftigen Akte mit einer realen Identität.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « je confirme », nach Klärung des Begriffs « ändern » und als Antwort auf die mit Frontend-PR 208 am Commit 35edccd veröffentlichte Vorlage.',
      limit: 'Der Entscheid wählt keine AUT-Akte, füllt kein Feld, erfasst oder autorisiert keine Identität und erlaubt weder Kontakt noch Versand. Er schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · REF-01-G1-IDN-001 V1.0 steuert nun die Struktur künftiger Einzelakten, ohne eine anzulegen.',
    next: 'Abgeschlossene Schritte: PRI-001, SEL-001, BAT-001 und WAV-001 sind als V1.0 bestätigt; Welle 1 ist ohne reale Identität geöffnet.',
    boundary: 'G1 bleibt offen. Die Vorlagenbestätigung ist weder Wahl einer AUT-Akte noch Namenseintrag oder Einzel-, Kontakt- oder Versandautorisierung.'
  }
};

const InstitutionalPeopleTeamsIdentityRecordConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-identity-record-confirmation" className="m3s-ref01-g1-identity-record-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-identity-record-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-identity-record-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 3 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsIdentityRecordConfirmation;
