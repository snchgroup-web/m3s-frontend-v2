import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU REGISTRE G1 · REF-01-DEC-029 · V1.0 · 27-08-2026',
    title: 'Confirmer le registre sans démarrer les cinq lots',
    intro: 'Cheikh confirme REF-01-G1-PKG-001 V0.1. Le registre devient V1.0 et fixe le cadre documentaire des cinq lots, sans ouvrir leur exécution.',
    counters: [['Registre confirmé', '1/1', 'PKG-001 V1.0'], ['Fiches encadrées', '5', 'Préparation seulement'], ['Actions réelles', '0', 'Aucune exécution'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-029', version: 'V1.0', status: 'Registre des cinq lots confirmé', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PKG-001 V0.1 est confirmé et promu en V1.0. Les cinq fiches deviennent le registre gouverné courant de préparation ; chaque lot conserve sa propre condition d’arrêt.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « Merci je valide REF-01-G1-PKG-001 V0.1 ».',
      limit: 'Cette décision ne ferme pas G1, n’ouvre pas L2 et n’autorise aucun compte, accès, rôle réel, collecte, destinataire, fournisseur, achat, suppression, reclassement, sauvegarde, restauration, migration, worker, alerte, donnée réelle, source maîtresse ou taux de progression.'
    },
    status: 'CONFIRMÉ · REF-01-G1-PKG-001 V1.0 devient le registre gouverné courant des cinq lots.',
    next: 'Étape produite ci-dessous : deux supports candidats distincts préparent PKG-01 et PKG-02, sans ouvrir d’accès ni modifier de pièce.',
    boundary: 'La confirmation porte sur le registre documentaire. Toute décision, collecte, test ou modification réelle reste soumise à une autorisation séparée.'
  },
  EN: {
    eyebrow: 'HUMAN G1 REGISTER CONFIRMATION · REF-01-DEC-029 · V1.0 · 27 AUG 2026',
    title: 'Confirm the register without starting the five packages',
    intro: 'Cheikh confirms REF-01-G1-PKG-001 V0.1. The register becomes V1.0 and frames the five packages as documents without starting execution.',
    counters: [['Confirmed register', '1/1', 'PKG-001 V1.0'], ['Governed sheets', '5', 'Preparation only'], ['Real actions', '0', 'No execution'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-029', version: 'V1.0', status: 'Five-package register confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PKG-001 V0.1 is confirmed and promoted to V1.0. The five sheets become the current governed preparation register; each package retains its own stop condition.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “Merci je valide REF-01-G1-PKG-001 V0.1”.',
      limit: 'This decision does not close G1, open L2 or authorise any account, access, real role, collection, recipient, provider, purchase, deletion, reclassification, backup, restoration, migration, worker, alert, real data, master source or progress rate.'
    },
    status: 'CONFIRMED · REF-01-G1-PKG-001 V1.0 becomes the current governed register for the five packages.',
    next: 'Produced step below: two separate candidate supports prepare PKG-01 and PKG-02 without opening access or changing records.',
    boundary: 'Confirmation covers the documentary register. Every real decision, collection, test or change still requires separate authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES G1-REGISTERS · REF-01-DEC-029 · V1.0 · 27.08.2026',
    title: 'Das Register bestätigen, ohne die fünf Pakete zu starten',
    intro: 'Cheikh bestätigt REF-01-G1-PKG-001 V0.1. Das Register wird zu V1.0 und rahmt die fünf Pakete dokumentarisch ein, ohne ihre Ausführung zu starten.',
    counters: [['Bestätigtes Register', '1/1', 'PKG-001 V1.0'], ['Gesteuerte Blätter', '5', 'Nur Vorbereitung'], ['Reale Aktionen', '0', 'Keine Ausführung'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-029', version: 'V1.0', status: 'Register der fünf Pakete bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PKG-001 V0.1 wird bestätigt und zu V1.0. Die fünf Blätter werden zum aktuellen gesteuerten Vorbereitungsregister; jedes Paket behält seine eigene Stoppbedingung.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « Merci je valide REF-01-G1-PKG-001 V0.1 ».',
      limit: 'Dieser Entscheid schliesst G1 nicht, öffnet L2 nicht und erlaubt weder Konto, Zugriff, reale Rolle, Sammlung, Empfänger, Anbieter, Kauf, Löschung, Umklassifizierung, Sicherung, Wiederherstellung, Migration, Worker, Alarm, Echtdaten, Masterquelle noch Fortschrittswert.'
    },
    status: 'BESTÄTIGT · REF-01-G1-PKG-001 V1.0 wird das aktuelle gesteuerte Register der fünf Pakete.',
    next: 'Nachfolgend erstellter Schritt: zwei getrennte Kandidatenträger bereiten PKG-01 und PKG-02 vor, ohne Zugriff zu öffnen oder Unterlagen zu ändern.',
    boundary: 'Die Bestätigung betrifft das Dokumentregister. Jeder reale Entscheid, jede Sammlung, Prüfung oder Änderung benötigt weiterhin eine eigene Autorisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1PackageRegisterConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-package-register-confirmation" className="m3s-ref01-g1-package-register-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-package-register-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-package-register-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PackageRegisterConfirmation;
