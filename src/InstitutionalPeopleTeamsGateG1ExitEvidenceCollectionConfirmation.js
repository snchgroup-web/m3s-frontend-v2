import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU PROTOCOLE DE COLLECTE · REF-01-DEC-036 · V1.0 · 28-08-2026',
    title: 'Confirmer les six circuits sans autoriser leur exécution',
    intro: 'Cheikh confirme REF-01-G1-COL-002 V0.1. Le protocole devient V1.0 comme cadre gouverné des sources, préparations, contrôles et arrêts ; aucun circuit n’est ouvert par cette décision.',
    counters: [['Protocole confirmé', '1/1', 'COL-002 V1.0'], ['Circuits gouvernés', '6/6', 'Cinq preuves et une porte'], ['Circuits autorisés', '0', 'Décision unitaire requise'], ['Preuves acceptées', '0', 'G1 reste ouverte']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-036', version: 'V1.0', status: 'Protocole des six circuits confirmé', author: 'Cheikh Ndiaye', date: '28-08-2026',
      decision: 'REF-01-G1-COL-002 V0.1 est confirmé et promu en V1.0. Ses six circuits, sources et canaux admissibles, préparations candidates, contrôles avant acceptation et arrêts obligatoires deviennent le protocole gouverné courant.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026 : « merci, je suis de retour et je confirme `REF-01-G1-COL-002 V0.1`, continue ».',
      limit: 'La décision n’autorise aucune collecte, demande, personne, fournisseur, compte, accès, secret, environnement, sauvegarde, restauration, attribution de droit, déplacement GED, migration, worker, alerte, notification, test, acceptation de preuve, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-COL-002 V1.0 gouverne les six circuits ; zéro circuit est autorisé.',
    next: 'Étape préparée ci-dessous : REF-01-G1-AUT-002 V0.1 distingue les six futures autorisations unitaires sans en accorder aucune.',
    boundary: 'Confirmer le protocole valide la manière de préparer et contrôler les preuves ; cela ne prouve aucune condition technique et ne déclenche aucune action.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE COLLECTION PROTOCOL · REF-01-DEC-036 · V1.0 · 28 AUG 2026',
    title: 'Confirm all six routes without authorising execution',
    intro: 'Cheikh confirms REF-01-G1-COL-002 V0.1. The protocol becomes V1.0 as the governed framework for sources, preparation, controls and stops; this decision opens no route.',
    counters: [['Confirmed protocol', '1/1', 'COL-002 V1.0'], ['Governed routes', '6/6', 'Five evidence items and one gate'], ['Authorised routes', '0', 'Individual decision required'], ['Accepted evidence', '0', 'G1 remains open']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-036', version: 'V1.0', status: 'Six-route protocol confirmed', author: 'Cheikh Ndiaye', date: '28 Aug 2026',
      decision: 'REF-01-G1-COL-002 V0.1 is confirmed and promoted to V1.0. Its six routes, admissible sources and channels, candidate preparations, controls before acceptance and mandatory stops become the current governed protocol.',
      evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session: “merci, je suis de retour et je confirme `REF-01-G1-COL-002 V0.1`, continue”.',
      limit: 'This decision authorises no collection, request, person, provider, account, access, secret, environment, backup, restoration, right assignment, DMS move, migration, worker, alert, notification, test, evidence acceptance, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-COL-002 V1.0 governs all six routes; zero routes are authorised.',
    next: 'Prepared step below: REF-01-G1-AUT-002 V0.1 separates the six future individual authorisations without granting any.',
    boundary: 'Confirming the protocol validates how evidence is prepared and controlled; it proves no technical condition and triggers no action.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES SAMMLUNGSPROTOKOLLS · REF-01-DEC-036 · V1.0 · 28.08.2026',
    title: 'Alle sechs Wege bestätigen, ohne ihre Ausführung zu erlauben',
    intro: 'Cheikh bestätigt REF-01-G1-COL-002 V0.1. Das Protokoll wird als gesteuerter Rahmen für Quellen, Vorbereitung, Kontrollen und Stopps zu V1.0; durch diesen Entscheid wird kein Weg geöffnet.',
    counters: [['Bestätigtes Protokoll', '1/1', 'COL-002 V1.0'], ['Gesteuerte Wege', '6/6', 'Fünf Nachweise und ein Tor'], ['Autorisierte Wege', '0', 'Einzelentscheid erforderlich'], ['Angenommene Nachweise', '0', 'G1 bleibt offen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-036', version: 'V1.0', status: 'Protokoll der sechs Wege bestätigt', author: 'Cheikh Ndiaye', date: '28.08.2026',
      decision: 'REF-01-G1-COL-002 V0.1 ist bestätigt und wird zu V1.0. Sechs Wege, zulässige Quellen und Kanäle, Kandidatenvorbereitungen, Kontrollen vor Annahme und Pflichtstopps bilden das aktuelle gesteuerte Protokoll.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 28.08.2026: « merci, je suis de retour et je confirme `REF-01-G1-COL-002 V0.1`, continue ».',
      limit: 'Der Entscheid erlaubt keine Sammlung, Anfrage, Person, keinen Anbieter, Account, Zugriff, kein Geheimnis, keine Umgebung, Sicherung, Wiederherstellung, Rechtezuweisung, DMS-Verschiebung, Migration, Worker, Warnung, Benachrichtigung, Prüfung, Nachweisannahme, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-COL-002 V1.0 steuert alle sechs Wege; null Wege sind autorisiert.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-AUT-002 V0.1 trennt die sechs künftigen Einzelautorisierungen, ohne eine zu erteilen.',
    boundary: 'Die Protokollbestätigung validiert die Vorbereitung und Kontrolle der Nachweise; sie beweist keine technische Bedingung und löst keine Aktion aus.'
  }
};

const InstitutionalPeopleTeamsGateG1ExitEvidenceCollectionConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-exit-evidence-collection-confirmation" className="m3s-ref01-g1-exit-evidence-collection-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-exit-evidence-collection-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-exit-evidence-collection-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExitEvidenceCollectionConfirmation;
