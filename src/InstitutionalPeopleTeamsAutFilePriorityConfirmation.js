import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA MATRICE DE PRIORISATION · REF-01-DEC-021 · V1.0 · 27-08-2026',
    title: 'Confirmer la méthode sans choisir un dossier',
    intro: 'Cheikh confirme REF-01-G1-PRI-001 V0.1. La matrice est promue sans modification de fond en V1.0 : les quatre dossiers AUT restent comparables et aucun n’est sélectionné par cette décision.',
    counters: [['Matrice confirmée', '1/1', 'Cadre seulement'], ['Options confirmées', '4/4', 'AUT-A à AUT-D'], ['Dossier sélectionné', '0/4', 'Aucune présélection'], ['Identités ou autorisations', '0', 'Décisions ultérieures']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-021', version: 'V1.0', status: 'Matrice PRI-001 confirmée sans dossier sélectionné', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PRI-001 V0.1 est confirmé et promu en V1.0. Les quatre options AUT-A, AUT-B, AUT-C et AUT-D constituent le cadre gouverné de la future sélection documentaire.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « Alors je confirme », en réponse à PRI-001 V0.1 publié par la PR frontend nº 209 au commit f1b908e.',
      limit: 'Cette décision confirme la méthode et les quatre options, mais ne choisit aucun dossier AUT. Elle n’inscrit aucune identité et n’autorise aucun fournisseur, compte, accès, contact, envoi, collecte, test ou preuve réelle. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-PRI-001 V1.0 gouverne désormais la sélection documentaire, avec 0/4 dossier choisi.',
    next: 'Prochaine étape amendée : confirmer ou amender ensemble SEL-001 V0.2 et BAT-001 V0.1 pour préparer les quatre dossiers en deux vagues contrôlées.',
    boundary: 'G1 reste ouverte. Confirmer la matrice ne vaut ni choix d’un dossier AUT, ni inscription nominative, ni autorisation individuelle, de contact ou d’envoi.'
  },
  EN: {
    eyebrow: 'HUMAN PRIORITISATION-MATRIX CONFIRMATION · REF-01-DEC-021 · V1.0 · 27 AUG 2026',
    title: 'Confirm the method without choosing a file',
    intro: 'Cheikh confirms REF-01-G1-PRI-001 V0.1. The matrix is promoted unchanged in substance to V1.0: the four AUT files remain comparable and none is selected by this decision.',
    counters: [['Confirmed matrix', '1/1', 'Framework only'], ['Confirmed options', '4/4', 'AUT-A through AUT-D'], ['Selected file', '0/4', 'No preselection'], ['Identities or authorisations', '0', 'Later decisions']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-021', version: 'V1.0', status: 'PRI-001 matrix confirmed without selecting a file', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PRI-001 V0.1 is confirmed and promoted to V1.0. The four AUT-A, AUT-B, AUT-C and AUT-D options become the governed framework for the future documentary selection.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “Alors je confirme”, in response to PRI-001 V0.1 published through frontend PR 209 at commit f1b908e.',
      limit: 'This decision confirms the method and four options but selects no AUT file. It records no identity and authorises no provider, account, access, contact, send, collection, test or real evidence. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · REF-01-G1-PRI-001 V1.0 now governs documentary selection, with 0/4 file chosen.',
    next: 'Amended next step: confirm or amend SEL-001 V0.2 and BAT-001 V0.1 together to prepare all four files in two controlled waves.',
    boundary: 'G1 remains open. Confirming the matrix is neither an AUT-file choice nor a named record or individual, contact or send authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER PRIORISIERUNGSMATRIX · REF-01-DEC-021 · V1.0 · 27.08.2026',
    title: 'Die Methode bestätigen, ohne eine Akte zu wählen',
    intro: 'Cheikh bestätigt REF-01-G1-PRI-001 V0.1. Die Matrix wird inhaltlich unverändert zu V1.0: Die vier AUT-Akten bleiben vergleichbar und keine wird mit diesem Entscheid gewählt.',
    counters: [['Bestätigte Matrix', '1/1', 'Nur Rahmen'], ['Bestätigte Optionen', '4/4', 'AUT-A bis AUT-D'], ['Gewählte Akte', '0/4', 'Keine Vorauswahl'], ['Identitäten oder Autorisierungen', '0', 'Spätere Entscheide']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-021', version: 'V1.0', status: 'PRI-001-Matrix ohne Aktenwahl bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PRI-001 V0.1 ist bestätigt und wird zu V1.0. Die vier Optionen AUT-A, AUT-B, AUT-C und AUT-D bilden den gesteuerten Rahmen für die künftige dokumentarische Auswahl.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « Alors je confirme », als Antwort auf PRI-001 V0.1, veröffentlicht mit Frontend-PR 209 am Commit f1b908e.',
      limit: 'Der Entscheid bestätigt Methode und vier Optionen, wählt aber keine AUT-Akte. Er erfasst keine Identität und erlaubt weder Anbieter, Account, Zugriff, Kontakt, Versand, Sammlung, Test noch realen Nachweis. Er schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · REF-01-G1-PRI-001 V1.0 steuert nun die dokumentarische Auswahl; 0/4 Akten sind gewählt.',
    next: 'Geänderter nächster Schritt: SEL-001 V0.2 und BAT-001 V0.1 gemeinsam bestätigen oder ändern, um alle vier Akten in zwei kontrollierten Wellen vorzubereiten.',
    boundary: 'G1 bleibt offen. Die Matrixbestätigung ist weder Wahl einer AUT-Akte noch Namenseintrag oder Einzel-, Kontakt- oder Versandautorisierung.'
  }
};

const InstitutionalPeopleTeamsAutFilePriorityConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-file-priority-confirmation" className="m3s-ref01-g1-aut-file-priority-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-file-priority-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-file-priority-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutFilePriorityConfirmation;
