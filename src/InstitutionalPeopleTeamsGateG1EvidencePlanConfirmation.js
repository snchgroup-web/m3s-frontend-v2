import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU PLAN G1 · REF-01-DEC-028 · V1.0 · 27-08-2026',
    title: 'Confirmer le plan sans lancer les cinq lots',
    intro: 'Cheikh confirme REF-01-G1-PLN-001 V0.1. Le plan devient V1.0 et peut servir de cadre gouverné à la préparation des cinq lots ; cette décision ne déclenche aucune exécution réelle.',
    counters: [['Plan confirmé', '1/1', 'PLN-001 V1.0'], ['Lots encadrés', '5', 'Préparation bornée'], ['Actions réelles', '0', 'Aucune exécution'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-028', version: 'V1.0', status: 'Plan de preuves G1 confirmé', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PLN-001 V0.1 est confirmé et promu en V1.0. Les cinq lots peuvent être préparés dans leurs limites documentées, avec une décision humaine distincte avant toute action réelle.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « merci, je confirme Prochain arbitrage : confirmer ou amender REF-01-G1-PLN-001 V0.1 ».',
      limit: 'Cette décision ne ferme pas G1, n’ouvre pas L2 et n’autorise aucun compte, accès, rôle réel, collecte, destinataire, fournisseur, achat, suppression, sauvegarde, restauration, migration, worker, alerte, donnée réelle, source maîtresse ou taux de progression.'
    },
    status: 'CONFIRMÉ · REF-01-G1-PLN-001 V1.0 devient le plan gouverné courant des cinq lots.',
    next: 'Étape produite ci-dessous : REF-01-G1-PKG-001 V0.1 prépare les cinq fiches de lot sans démarrer leur exécution.',
    boundary: 'La confirmation autorise la préparation des supports et critères ; chaque collecte, test ou changement réel exigera une autorisation séparée.'
  },
  EN: {
    eyebrow: 'HUMAN G1 PLAN CONFIRMATION · REF-01-DEC-028 · V1.0 · 27 AUG 2026',
    title: 'Confirm the plan without starting the five packages',
    intro: 'Cheikh confirms REF-01-G1-PLN-001 V0.1. The plan becomes V1.0 and may govern preparation of the five packages; this decision starts no real execution.',
    counters: [['Confirmed plan', '1/1', 'PLN-001 V1.0'], ['Governed packages', '5', 'Bounded preparation'], ['Real actions', '0', 'No execution'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-028', version: 'V1.0', status: 'G1 evidence plan confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PLN-001 V0.1 is confirmed and promoted to V1.0. The five packages may be prepared within their documented boundaries, with a separate human decision before any real action.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “merci, je confirme Prochain arbitrage : confirmer ou amender REF-01-G1-PLN-001 V0.1”.',
      limit: 'This decision does not close G1, open L2 or authorise any account, access, real role, collection, recipient, provider, purchase, deletion, backup, restoration, migration, worker, alert, real data, master source or progress rate.'
    },
    status: 'CONFIRMED · REF-01-G1-PLN-001 V1.0 becomes the current governed plan for the five packages.',
    next: 'Produced step below: REF-01-G1-PKG-001 V0.1 prepares the five package sheets without starting execution.',
    boundary: 'Confirmation authorises preparation of supports and criteria; every real collection, test or change requires a separate authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES G1-PLANS · REF-01-DEC-028 · V1.0 · 27.08.2026',
    title: 'Den Plan bestätigen, ohne die fünf Pakete zu starten',
    intro: 'Cheikh bestätigt REF-01-G1-PLN-001 V0.1. Der Plan wird zu V1.0 und kann die Vorbereitung der fünf Pakete steuern; dieser Entscheid startet keine reale Ausführung.',
    counters: [['Bestätigter Plan', '1/1', 'PLN-001 V1.0'], ['Gesteuerte Pakete', '5', 'Begrenzte Vorbereitung'], ['Reale Aktionen', '0', 'Keine Ausführung'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-028', version: 'V1.0', status: 'G1-Nachweisplan bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PLN-001 V0.1 wird bestätigt und zu V1.0. Die fünf Pakete dürfen innerhalb ihrer dokumentierten Grenzen vorbereitet werden; vor jeder realen Aktion ist ein eigener menschlicher Entscheid erforderlich.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « merci, je confirme Prochain arbitrage : confirmer ou amender REF-01-G1-PLN-001 V0.1 ».',
      limit: 'Dieser Entscheid schliesst G1 nicht, öffnet L2 nicht und erlaubt weder Konto, Zugriff, reale Rolle, Sammlung, Empfänger, Anbieter, Kauf, Löschung, Sicherung, Wiederherstellung, Migration, Worker, Alarm, Echtdaten, Masterquelle noch Fortschrittswert.'
    },
    status: 'BESTÄTIGT · REF-01-G1-PLN-001 V1.0 wird der aktuelle gesteuerte Plan der fünf Pakete.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PKG-001 V0.1 bereitet die fünf Paketblätter vor, ohne die Ausführung zu starten.',
    boundary: 'Die Bestätigung erlaubt die Vorbereitung von Trägern und Kriterien; jede reale Sammlung, Prüfung oder Änderung benötigt eine eigene Autorisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1EvidencePlanConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-evidence-plan-confirmation" className="m3s-ref01-g1-evidence-plan-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-evidence-plan-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-evidence-plan-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1EvidencePlanConfirmation;
