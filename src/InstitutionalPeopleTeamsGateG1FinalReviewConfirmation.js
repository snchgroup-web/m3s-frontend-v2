import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA REVUE FINALE G1 · REF-01-DEC-034 · V1.0 · 27-08-2026',
    title: 'Confirmer la revue sans confondre documentation et preuve',
    intro: 'Cheikh confirme REF-01-G1-REV-003 V0.1. La revue devient V1.0 comme lecture gouvernée après les cinq lots ; aucune condition de sortie ne devient satisfaite par cette confirmation.',
    counters: [['Revue confirmée', '1/1', 'REV-003 V1.0'], ['Lots documentaires', '5/5', 'Cadres confirmés'], ['Conditions clôturables', '0/6', 'Preuves manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-034', version: 'V1.0', status: 'Revue finale G1 confirmée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-REV-003 V0.1 est confirmée et promue en V1.0 comme lecture consolidée des cinq lots documentaires et des six conditions de sortie G1.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « bravo, merci mon cher et merci de continuer car je valide `REF-01-G1-REV-003 V0.1` ».',
      limit: 'Cette décision ne crée ni preuve, rôle, droit, durée de conservation, service, environnement, sauvegarde, restauration, migration, worker, alerte, test, source maîtresse ou progression. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-REV-003 V1.0 devient la lecture gouvernée courante : cinq lots confirmés, zéro condition G1 clôturable.',
    next: 'Étape produite ci-dessous : REF-01-G1-EVD-002 V0.1 prépare le registre consolidé des preuves de sortie sans lancer leur collecte.',
    boundary: 'Confirmer la revue autorise sa réutilisation comme base de travail ; cela ne prouve ni conformité, ni aptitude à la production, ni avancement technique.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE FINAL G1 REVIEW · REF-01-DEC-034 · V1.0 · 27 AUG 2026',
    title: 'Confirm the review without confusing documentation with evidence',
    intro: 'Cheikh confirms REF-01-G1-REV-003 V0.1. The review becomes V1.0 as the governed reading after all five packages; this confirmation satisfies no exit condition.',
    counters: [['Confirmed review', '1/1', 'REV-003 V1.0'], ['Documentary packages', '5/5', 'Confirmed frameworks'], ['Closable conditions', '0/6', 'Evidence missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-034', version: 'V1.0', status: 'Final G1 review confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-REV-003 V0.1 is confirmed and promoted to V1.0 as the consolidated reading of the five documentary packages and six G1 exit conditions.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “bravo, merci mon cher et merci de continuer car je valide `REF-01-G1-REV-003 V0.1`”.',
      limit: 'This decision creates no evidence, role, right, retention period, service, environment, backup, restoration, migration, worker, alert, test, master source or progress. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · REF-01-G1-REV-003 V1.0 becomes the current governed reading: five packages confirmed, zero G1 conditions closable.',
    next: 'Produced step below: REF-01-G1-EVD-002 V0.1 prepares the consolidated exit-evidence register without starting collection.',
    boundary: 'Confirming the review permits its reuse as a working baseline; it proves neither compliance, production readiness nor technical progress.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER ABSCHLIESSENDEN G1-PRÜFUNG · REF-01-DEC-034 · V1.0 · 27.08.2026',
    title: 'Die Prüfung bestätigen, ohne Dokumentation mit Nachweis zu verwechseln',
    intro: 'Cheikh bestätigt REF-01-G1-REV-003 V0.1. Die Prüfung wird als gesteuerte Lesung nach allen fünf Paketen zu V1.0; keine Austrittsbedingung wird dadurch erfüllt.',
    counters: [['Bestätigte Prüfung', '1/1', 'REV-003 V1.0'], ['Dokumentpakete', '5/5', 'Bestätigte Rahmen'], ['Schliessbare Bedingungen', '0/6', 'Nachweise fehlen'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-034', version: 'V1.0', status: 'Abschliessende G1-Prüfung bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-REV-003 V0.1 wird bestätigt und als konsolidierte Lesung der fünf Dokumentpakete und sechs G1-Austrittsbedingungen zu V1.0.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « bravo, merci mon cher et merci de continuer car je valide `REF-01-G1-REV-003 V0.1` ».',
      limit: 'Dieser Entscheid erzeugt weder Nachweis, Rolle, Recht, Aufbewahrungsfrist, Dienst, Umgebung, Sicherung, Wiederherstellung, Migration, Worker, Alarm, Test, Masterquelle noch Fortschritt. Er schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · REF-01-G1-REV-003 V1.0 wird die aktuelle gesteuerte Lesung: fünf Pakete bestätigt, null G1-Bedingungen schliessbar.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-EVD-002 V0.1 bereitet das konsolidierte Austrittsnachweisregister vor, ohne die Sammlung zu starten.',
    boundary: 'Die Bestätigung der Prüfung erlaubt ihre Wiederverwendung als Arbeitsgrundlage; sie belegt weder Konformität, Produktionsreife noch technischen Fortschritt.'
  }
};

const InstitutionalPeopleTeamsGateG1FinalReviewConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-final-review-confirmation" className="m3s-ref01-g1-final-review-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-final-review-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-final-review-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1FinalReviewConfirmation;
