import React from 'react';
import { AlertTriangle, ContactRound, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DES PROFILS DESTINATAIRES · REF-01-DEC-017 · V1.0 · 26-08-2026',
    title: 'Confirmer les profils sans autoriser une identité',
    intro: 'Cheikh confirme REF-01-G1-REC-001 V0.1. La fiche est promue sans modification textuelle en V1.0 : ses quatre profils et ses six contrôles deviennent le cadre gouverné de qualification, sans nom réel, coordonnées ni contact.',
    counters: [['Profils confirmés', '4/4', 'Un profil par lot REQ'], ['Contrôles confirmés', '6/6', 'Avant toute identité réelle'], ['Noms réels inscrits', '0', 'Décision séparée requise'], ['Envois autorisés', '0', 'Aucune communication déclenchée']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-017', version: 'V1.0', status: 'Profils et contrôles de REC-001 confirmés', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'REF-01-G1-REC-001 V0.1 est confirmé et promu en V1.0. Les quatre profils destinataires et les six contrôles préalables deviennent le cadre gouverné pour préparer une éventuelle inscription nominative.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « confirmé, merci de continuer », en réponse à la fiche candidate publiée par la PR frontend nº 205 au commit 967deda1.',
      limit: 'Cette décision n’inscrit et n’autorise aucun nom, entreprise, adresse, coordonnée, canal concret, contact ou envoi. Elle n’autorise ni compte, essai, achat, fournisseur, donnée réelle, acceptation de preuve ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-REC-001 V1.0 gouverne désormais les profils admissibles, pas les identités ni les contacts.',
    next: 'NAM-001 V1.0 gouverne désormais les emplacements vides ; AUT-001 V0.1 prépare les décisions unitaires avant toute identité réelle.',
    boundary: 'G1 reste ouverte. Un profil confirmé n’est ni un destinataire désigné, ni une autorisation de contact ou d’envoi.'
  },
  EN: {
    eyebrow: 'HUMAN RECIPIENT-PROFILE CONFIRMATION · REF-01-DEC-017 · V1.0 · 26 AUG 2026',
    title: 'Confirm profiles without authorising an identity',
    intro: 'Cheikh confirms REF-01-G1-REC-001 V0.1. The sheet is promoted unchanged to V1.0: its four profiles and six controls become the governed qualification framework, with no real name, contact details or contact.',
    counters: [['Confirmed profiles', '4/4', 'One profile per REQ package'], ['Confirmed controls', '6/6', 'Before any real identity'], ['Real names recorded', '0', 'Separate decision required'], ['Authorised sends', '0', 'No communication triggered']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-017', version: 'V1.0', status: 'REC-001 profiles and controls confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'REF-01-G1-REC-001 V0.1 is confirmed and promoted to V1.0. Its four recipient profiles and six preliminary controls become the governed framework for preparing a possible named record.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “confirmé, merci de continuer”, in response to the candidate sheet published through frontend PR 205 at commit 967deda1.',
      limit: 'This decision records or authorises no name, company, address, contact detail, concrete channel, contact or send. It authorises no account, trial, purchase, provider, real data, evidence acceptance or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-REC-001 V1.0 now governs admissible profiles, not identities or contacts.',
    next: 'NAM-001 V1.0 now governs empty slots; AUT-001 V0.1 prepares individual decisions before any real identity.',
    boundary: 'G1 remains open. A confirmed profile is neither a designated recipient nor an authorisation to contact or send.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER EMPFÄNGERPROFILE · REF-01-DEC-017 · V1.0 · 26.08.2026',
    title: 'Profile bestätigen, ohne eine Identität zu autorisieren',
    intro: 'Cheikh bestätigt REF-01-G1-REC-001 V0.1. Das Blatt wird unverändert zu V1.0: vier Profile und sechs Kontrollen bilden den gesteuerten Qualifikationsrahmen, ohne realen Namen, Kontaktdaten oder Kontakt.',
    counters: [['Bestätigte Profile', '4/4', 'Ein Profil je REQ-Paket'], ['Bestätigte Kontrollen', '6/6', 'Vor jeder realen Identität'], ['Erfasste reale Namen', '0', 'Getrennter Entscheid erforderlich'], ['Autorisierte Sendungen', '0', 'Keine Kommunikation ausgelöst']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-017', version: 'V1.0', status: 'Profile und Kontrollen von REC-001 bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'REF-01-G1-REC-001 V0.1 ist bestätigt und wird zu V1.0. Vier Empfängerprofile und sechs vorgängige Kontrollen bilden den gesteuerten Rahmen zur Vorbereitung einer möglichen namentlichen Erfassung.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: « confirmé, merci de continuer », als Antwort auf das mit Frontend-PR 205 am Commit 967deda1 veröffentlichte Kandidatenblatt.',
      limit: 'Der Entscheid erfasst oder autorisiert keinen Namen, keine Firma, Adresse, Kontaktdaten, keinen konkreten Kanal, Kontakt oder Versand. Er autorisiert weder Account, Test, Kauf, Anbieter, reale Daten, Nachweisannahme noch L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-REC-001 V1.0 steuert nun zulässige Profile, nicht Identitäten oder Kontakte.',
    next: 'NAM-001 V1.0 steuert nun leere Stellen; AUT-001 V0.1 bereitet Einzelentscheide vor jeder realen Identität vor.',
    boundary: 'G1 bleibt offen. Ein bestätigtes Profil ist weder ein bestimmter Empfänger noch eine Kontakt- oder Versandautorisierung.'
  }
};

const InstitutionalPeopleTeamsRecipientConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-recipient-confirmation" className="m3s-ref01-g1-recipient-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-recipient-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-recipient-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ContactRound className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index > 1 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <ContactRound className="text-emerald-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsRecipientConfirmation;
