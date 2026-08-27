import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DES MATRICES PRIORITAIRES · REF-01-DEC-030 · V1.0 · 27-08-2026',
    title: 'Confirmer les deux matrices sans attribuer de droits ni agir sur la GED',
    intro: 'Cheikh confirme ensemble REF-01-G1-PKG-01-001 V0.1 et REF-01-G1-PKG-02-001 V0.1. Elles deviennent V1.0 comme cadres documentaires, sans titulaire, droit, durée de conservation ou opération réelle.',
    counters: [['Matrices confirmées', '2/2', 'PKG-01 et PKG-02 V1.0'], ['Titulaires nommés', '0', 'Fonctions seulement'], ['Changements réels', '0', 'Aucun accès ni pièce'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-030', version: 'V1.0', status: 'Matrices PKG-01 et PKG-02 confirmées', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PKG-01-001 V0.1 et REF-01-G1-PKG-02-001 V0.1 sont confirmées ensemble et promues en V1.0. Elles deviennent les cadres documentaires gouvernés pour préparer les rôles et la visibilité ainsi que la conservation et la GED.',
      evidence: 'Confirmation de Cheikh en réponse au prochain arbitrage groupé présenté dans la session du 27-08-2026 : « je valide le prochain et merci cher codex ».',
      limit: 'Cette décision ne nomme aucun titulaire, ne fixe aucun droit, accès, délégation, durée ou exception et ne permet aucune collecte, création de compte, suppression, reclassement, déplacement, gel ou modification de pièce. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · PKG-01-001 V1.0 et PKG-02-001 V1.0 deviennent les deux matrices documentaires gouvernées de priorité 1.',
    next: 'Étape produite ci-dessous : REF-01-G1-PKG-03-001 V0.1 prépare le dossier comparatif PostgreSQL et reprise, sans contacter de fournisseur ni utiliser de donnée réelle.',
    boundary: 'La validation porte uniquement sur les cadres documentaires. Toute attribution, durée, décision technique, collecte ou opération réelle exige un arbitrage séparé.'
  },
  EN: {
    eyebrow: 'HUMAN PRIORITY-MATRIX CONFIRMATION · REF-01-DEC-030 · V1.0 · 27 AUG 2026',
    title: 'Confirm both matrices without assigning rights or operating on the DMS',
    intro: 'Cheikh confirms REF-01-G1-PKG-01-001 V0.1 and REF-01-G1-PKG-02-001 V0.1 together. They become V1.0 documentary frameworks without any holder, right, retention period or real operation.',
    counters: [['Confirmed matrices', '2/2', 'PKG-01 and PKG-02 V1.0'], ['Named holders', '0', 'Functions only'], ['Real changes', '0', 'No access or records'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-030', version: 'V1.0', status: 'PKG-01 and PKG-02 matrices confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PKG-01-001 V0.1 and REF-01-G1-PKG-02-001 V0.1 are confirmed together and promoted to V1.0. They become the governed documentary frameworks for roles and visibility and for retention and DMS preparation.',
      evidence: 'Confirmation by Cheikh in response to the grouped next decision presented during the 27 Aug 2026 session: “je valide le prochain et merci cher codex”.',
      limit: 'This decision names no holder, sets no right, access, delegation, period or exception and permits no collection, account creation, deletion, reclassification, move, hold or record change. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · PKG-01-001 V1.0 and PKG-02-001 V1.0 become the two governed priority-one documentary matrices.',
    next: 'Produced step below: REF-01-G1-PKG-03-001 V0.1 prepares the PostgreSQL and recovery comparison file without contacting a provider or using real data.',
    boundary: 'Validation covers only the documentary frameworks. Any assignment, period, technical decision, collection or real operation requires a separate decision.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER PRIORITÄTSMATRIZEN · REF-01-DEC-030 · V1.0 · 27.08.2026',
    title: 'Beide Matrizen bestätigen, ohne Rechte zuzuweisen oder im DMS zu handeln',
    intro: 'Cheikh bestätigt REF-01-G1-PKG-01-001 V0.1 und REF-01-G1-PKG-02-001 V0.1 gemeinsam. Sie werden zu dokumentarischen Rahmen V1.0 ohne Inhaber, Recht, Aufbewahrungsfrist oder reale Operation.',
    counters: [['Bestätigte Matrizen', '2/2', 'PKG-01 und PKG-02 V1.0'], ['Benannte Inhaber', '0', 'Nur Funktionen'], ['Reale Änderungen', '0', 'Kein Zugriff, keine Unterlage'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-030', version: 'V1.0', status: 'Matrizen PKG-01 und PKG-02 bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PKG-01-001 V0.1 und REF-01-G1-PKG-02-001 V0.1 werden gemeinsam bestätigt und zu V1.0. Sie werden zu gesteuerten Dokumentrahmen für Rollen und Sichtbarkeit sowie Aufbewahrung und DMS.',
      evidence: 'Bestätigung von Cheikh als Antwort auf den gebündelten nächsten Entscheid in der Sitzung vom 27.08.2026: « je valide le prochain et merci cher codex ».',
      limit: 'Dieser Entscheid benennt keinen Inhaber, setzt kein Recht, keinen Zugriff, keine Delegation, Frist oder Ausnahme und erlaubt keine Sammlung, Kontoerstellung, Löschung, Umklassifizierung, Verschiebung, Sperre oder Unterlagenänderung. G1 bleibt offen und L2 geschlossen.'
    },
    status: 'BESTÄTIGT · PKG-01-001 V1.0 und PKG-02-001 V1.0 werden die zwei gesteuerten Dokumentmatrizen der Priorität 1.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PKG-03-001 V0.1 bereitet die Vergleichsakte PostgreSQL und Wiederanlauf vor, ohne Anbieter zu kontaktieren oder Echtdaten zu verwenden.',
    boundary: 'Die Bestätigung betrifft nur die Dokumentrahmen. Jede Zuweisung, Frist, technische Entscheidung, Sammlung oder reale Operation benötigt einen eigenen Entscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1PriorityOneConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-priority-one-confirmation" className="m3s-ref01-g1-priority-one-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-priority-one-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-priority-one-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PriorityOneConfirmation;
