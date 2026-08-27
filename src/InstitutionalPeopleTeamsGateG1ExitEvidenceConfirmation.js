import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA MATRICE DES PREUVES · REF-01-DEC-035 · V1.0 · 27-08-2026',
    title: 'Confirmer les preuves attendues sans autoriser leur collecte',
    intro: 'Cheikh confirme REF-01-G1-EVD-002 V0.1. La matrice devient V1.0 comme cadre gouverné des six preuves de sortie ; aucune pièce n’est reçue, testée ou acceptée par cette confirmation.',
    counters: [['Matrice confirmée', '1/1', 'EVD-002 V1.0'], ['Preuves attendues', '6/6', 'Cinq dossiers et une porte'], ['Preuves reçues', '0', 'Aucune pièce versée'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-035', version: 'V1.0', status: 'Matrice des preuves de sortie confirmée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-EVD-002 V0.1 est confirmée et promue en V1.0. Ses six dossiers, fonctions candidates, preuves attendues et critères d’acceptation deviennent le cadre gouverné courant de préparation des preuves de sortie G1.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « Super, merci je confirme `REF-01-G1-EVD-002 V0.1` ».',
      limit: 'Cette décision n’autorise aucune collecte, demande, personne, fournisseur, compte, accès, rôle, durée, environnement, sauvegarde, restauration, migration, worker, alerte, notification, test, donnée réelle, source maîtresse, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-EVD-002 V1.0 devient la matrice gouvernée courante ; zéro preuve est reçue ou testée.',
    next: 'Étape produite ci-dessous : REF-01-G1-COL-002 V0.1 prépare le protocole de collecte sans autoriser son exécution.',
    boundary: 'Confirmer les preuves attendues valide leur définition et leurs critères ; cela ne prouve aucune condition et ne permet encore aucune collecte.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE EVIDENCE MATRIX · REF-01-DEC-035 · V1.0 · 27 AUG 2026',
    title: 'Confirm expected evidence without authorising collection',
    intro: 'Cheikh confirms REF-01-G1-EVD-002 V0.1. The matrix becomes V1.0 as the governed framework for all six exit evidence items; this confirmation receives, tests or accepts no evidence.',
    counters: [['Confirmed matrix', '1/1', 'EVD-002 V1.0'], ['Expected evidence', '6/6', 'Five files and one gate'], ['Evidence received', '0', 'No records supplied'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-035', version: 'V1.0', status: 'Exit-evidence matrix confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-EVD-002 V0.1 is confirmed and promoted to V1.0. Its six files, candidate functions, expected evidence and acceptance criteria become the current governed framework for preparing G1 exit evidence.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “Super, merci je confirme `REF-01-G1-EVD-002 V0.1`”.',
      limit: 'This decision authorises no collection, request, person, provider, account, access, role, period, environment, backup, restoration, migration, worker, alert, notification, test, real data, master source, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-EVD-002 V1.0 becomes the current governed matrix; zero evidence is received or tested.',
    next: 'Produced step below: REF-01-G1-COL-002 V0.1 prepares the collection protocol without authorising execution.',
    boundary: 'Confirming expected evidence validates its definition and criteria; it proves no condition and permits no collection yet.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER NACHWEISMATRIX · REF-01-DEC-035 · V1.0 · 27.08.2026',
    title: 'Erwartete Nachweise bestätigen, ohne ihre Sammlung zu erlauben',
    intro: 'Cheikh bestätigt REF-01-G1-EVD-002 V0.1. Die Matrix wird als gesteuerter Rahmen für alle sechs Austrittsnachweise zu V1.0; durch diese Bestätigung wird kein Nachweis erhalten, getestet oder akzeptiert.',
    counters: [['Bestätigte Matrix', '1/1', 'EVD-002 V1.0'], ['Erwartete Nachweise', '6/6', 'Fünf Akten und ein Tor'], ['Erhaltene Nachweise', '0', 'Keine Unterlage eingereicht'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-035', version: 'V1.0', status: 'Matrix der Austrittsnachweise bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-EVD-002 V0.1 wird bestätigt und zu V1.0. Die sechs Akten, Kandidatenfunktionen, erwarteten Nachweise und Abnahmekriterien bilden den aktuellen gesteuerten Rahmen zur Vorbereitung der G1-Austrittsnachweise.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « Super, merci je confirme `REF-01-G1-EVD-002 V0.1` ».',
      limit: 'Dieser Entscheid erlaubt weder Sammlung, Anfrage, Person, Anbieter, Konto, Zugriff, Rolle, Frist, Umgebung, Sicherung, Wiederherstellung, Migration, Worker, Alarm, Benachrichtigung, Test, Echtdaten, Masterquelle, G1-Schliessung noch L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-EVD-002 V1.0 wird die aktuelle gesteuerte Matrix; null Nachweise sind erhalten oder getestet.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-COL-002 V0.1 bereitet das Sammlungsprotokoll vor, ohne seine Ausführung zu erlauben.',
    boundary: 'Die Bestätigung der erwarteten Nachweise validiert Definition und Kriterien; sie belegt keine Bedingung und erlaubt noch keine Sammlung.'
  }
};

const InstitutionalPeopleTeamsGateG1ExitEvidenceConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-exit-evidence-confirmation" className="m3s-ref01-g1-exit-evidence-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-exit-evidence-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-exit-evidence-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExitEvidenceConfirmation;
