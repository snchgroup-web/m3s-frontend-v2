import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU REGISTRE D’AUTORISATION · REF-01-DEC-019 · V1.0 · 27-08-2026',
    title: 'Confirmer le registre sans autoriser une identité',
    intro: 'Cheikh confirme REF-01-G1-AUT-001 V0.1. Le registre est promu sans modification de fond en V1.0 : ses quatre dossiers vides et ses six contrôles deviennent le cadre gouverné de toute future autorisation nominative unitaire.',
    counters: [['Dossiers confirmés', '4/4', 'Toujours vides'], ['Contrôles confirmés', '6/6', 'Avant toute décision'], ['Identités autorisées', '0', 'Aucun nom réel'], ['Contacts ou envois', '0', 'Décision encore séparée']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-019', version: 'V1.0', status: 'Registre et contrôles de AUT-001 confirmés', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-AUT-001 V0.1 est confirmé et promu en V1.0. Les quatre dossiers vides et les six contrôles deviennent le cadre gouverné avant toute future décision nominative individuelle.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « Je confirme », en réponse au registre publié par la PR frontend nº 207 au commit 2cdddbb.',
      limit: 'Cette décision ne remplit aucun dossier, ne désigne ni n’autorise aucune identité, et n’autorise aucun contact ou envoi. Elle ne ferme pas G1, n’ouvre pas L2 et ne valide aucun fournisseur, compte, essai, achat, donnée réelle ou preuve.'
    },
    status: 'CONFIRMÉ · REF-01-G1-AUT-001 V1.0 gouverne désormais les autorisations unitaires, sans en accorder aucune.',
    next: 'Étapes suivantes accomplies : IDN-001, PRI-001, SEL-001 et BAT-001 sont confirmés en V1.0 ; WAV-001 V0.1 prépare la vague 1.',
    boundary: 'G1 reste ouverte. Confirmer le registre ne vaut ni inscription nominative, ni autorisation individuelle, ni autorisation d’envoi.'
  },
  EN: {
    eyebrow: 'HUMAN AUTHORISATION-REGISTER CONFIRMATION · REF-01-DEC-019 · V1.0 · 27 AUG 2026',
    title: 'Confirm the register without authorising an identity',
    intro: 'Cheikh confirms REF-01-G1-AUT-001 V0.1. The register is promoted unchanged in substance to V1.0: its four empty files and six controls become the governed framework for every future individual named authorisation.',
    counters: [['Confirmed files', '4/4', 'Still empty'], ['Confirmed controls', '6/6', 'Before any decision'], ['Authorised identities', '0', 'No real name'], ['Contacts or sends', '0', 'Still a separate decision']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-019', version: 'V1.0', status: 'AUT-001 register and controls confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-AUT-001 V0.1 is confirmed and promoted to V1.0. Its four empty files and six controls become the governed framework before any future individual named decision.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “Je confirme”, in response to the register published through frontend PR 207 at commit 2cdddbb.',
      limit: 'This decision fills no file, designates or authorises no identity, and authorises no contact or send. It does not close G1, open L2 or validate any provider, account, trial, purchase, real data or evidence.'
    },
    status: 'CONFIRMED · REF-01-G1-AUT-001 V1.0 now governs individual authorisations without granting any.',
    next: 'Next steps completed: IDN-001, PRI-001, SEL-001 and BAT-001 are confirmed as V1.0; WAV-001 V0.1 prepares Wave 1.',
    boundary: 'G1 remains open. Confirming the register is neither a named record nor an individual or send authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES AUTORISIERUNGSREGISTERS · REF-01-DEC-019 · V1.0 · 27.08.2026',
    title: 'Das Register bestätigen, ohne eine Identität zu autorisieren',
    intro: 'Cheikh bestätigt REF-01-G1-AUT-001 V0.1. Das Register wird inhaltlich unverändert zu V1.0: vier leere Akten und sechs Kontrollen bilden den gesteuerten Rahmen für jede künftige einzelne Namensautorisierung.',
    counters: [['Bestätigte Akten', '4/4', 'Weiterhin leer'], ['Bestätigte Kontrollen', '6/6', 'Vor jedem Entscheid'], ['Autorisierte Identitäten', '0', 'Kein realer Name'], ['Kontakte oder Versand', '0', 'Weiterhin getrennter Entscheid']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-019', version: 'V1.0', status: 'Register und Kontrollen von AUT-001 bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-AUT-001 V0.1 ist bestätigt und wird zu V1.0. Vier leere Akten und sechs Kontrollen bilden den gesteuerten Rahmen vor jedem künftigen einzelnen Namensentscheid.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « Je confirme », als Antwort auf das mit Frontend-PR 207 am Commit 2cdddbb veröffentlichte Register.',
      limit: 'Der Entscheid füllt keine Akte, bestimmt oder autorisiert keine Identität und erlaubt weder Kontakt noch Versand. Er schliesst G1 nicht, öffnet L2 nicht und validiert keinen Anbieter, Account, Test, Kauf, reale Daten oder Nachweise.'
    },
    status: 'BESTÄTIGT · REF-01-G1-AUT-001 V1.0 steuert nun Einzelautorisierungen, ohne eine zu erteilen.',
    next: 'Nächste Schritte abgeschlossen: IDN-001, PRI-001, SEL-001 und BAT-001 sind als V1.0 bestätigt; WAV-001 V0.1 bereitet Welle 1 vor.',
    boundary: 'G1 bleibt offen. Die Registerbestätigung ist weder Namenseintrag noch Einzel- oder Versandautorisierung.'
  }
};

const InstitutionalPeopleTeamsAuthorisationRegisterConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-authorisation-register-confirmation" className="m3s-ref01-g1-authorisation-register-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-authorisation-register-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-authorisation-register-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAuthorisationRegisterConfirmation;
