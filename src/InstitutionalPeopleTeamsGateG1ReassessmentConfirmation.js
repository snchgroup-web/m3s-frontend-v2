import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA RÉÉVALUATION G1 · REF-01-DEC-027 · V1.0 · 27-08-2026',
    title: 'Confirmer la réévaluation sans fermer G1',
    intro: 'Cheikh confirme REF-01-G1-REV-002 V0.1. La revue devient V1.0 comme lecture gouvernée de l’état documentaire de G1 ; elle ne transforme aucune condition partielle en condition satisfaite.',
    counters: [['Revue confirmée', '1/1', 'REV-002 V1.0'], ['Conditions partielles', '5', 'Écarts conservés'], ['Conditions clôturables', '0/6', 'Preuves manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-027', version: 'V1.0', status: 'Réévaluation G1 confirmée comme lecture gouvernée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-REV-002 V0.1 est confirmé et promu en V1.0. Les six conditions restent lisibles selon le verdict établi : cinq partiellement documentées, aucune clôturable et L2 non autorisé.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « woow du bon boulot, merci de continuer, jeconfirme ». Le support soumis immédiatement avant ce message était REF-01-G1-REV-002 V0.1.',
      limit: 'Cette décision ne ferme pas G1, n’ouvre pas L2 et ne valide aucun fournisseur, service, sauvegarde, restauration, RPO, RTO, rôle applicatif, durée de conservation, migration, worker, seuil, alerte, responsable nommé, accès, donnée réelle ou source maîtresse.'
    },
    status: 'CONFIRMÉ · REF-01-G1-REV-002 V1.0 devient la lecture gouvernée courante de G1.',
    next: 'Étape produite ci-dessous : REF-01-G1-PLN-001 V0.1 ordonne cinq lots de preuves sans autoriser leur exécution réelle.',
    boundary: 'Confirmer le diagnostic autorise sa réutilisation comme base de travail ; cela ne prouve ni conformité, ni aptitude à la production, ni progression.'
  },
  EN: {
    eyebrow: 'HUMAN G1 REASSESSMENT CONFIRMATION · REF-01-DEC-027 · V1.0 · 27 AUG 2026',
    title: 'Confirm the reassessment without closing G1',
    intro: 'Cheikh confirms REF-01-G1-REV-002 V0.1. The review becomes V1.0 as the governed reading of G1 documentary status; it turns no partial condition into a satisfied condition.',
    counters: [['Confirmed review', '1/1', 'REV-002 V1.0'], ['Partial conditions', '5', 'Gaps retained'], ['Closable conditions', '0/6', 'Evidence missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-027', version: 'V1.0', status: 'G1 reassessment confirmed as governed reading', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-REV-002 V0.1 is confirmed and promoted to V1.0. The six conditions remain readable under the established verdict: five partially documented, none closable and L2 not authorised.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “woow du bon boulot, merci de continuer, jeconfirme”. The support submitted immediately before that message was REF-01-G1-REV-002 V0.1.',
      limit: 'This decision does not close G1, open L2 or validate any provider, service, backup, restoration, RPO, RTO, application role, retention period, migration, worker, threshold, alert, named owner, access, real data or master source.'
    },
    status: 'CONFIRMED · REF-01-G1-REV-002 V1.0 becomes the current governed reading of G1.',
    next: 'Produced step below: REF-01-G1-PLN-001 V0.1 orders five evidence packages without authorising real execution.',
    boundary: 'Confirming the diagnosis permits its reuse as a working baseline; it proves neither compliance, production readiness nor progress.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER G1-NEUBEWERTUNG · REF-01-DEC-027 · V1.0 · 27.08.2026',
    title: 'Die Neubewertung bestätigen, ohne G1 zu schliessen',
    intro: 'Cheikh bestätigt REF-01-G1-REV-002 V0.1. Die Prüfung wird als Governance-konforme Lesung des G1-Dokumentationsstands zu V1.0; keine teilweise Bedingung wird dadurch erfüllt.',
    counters: [['Bestätigte Prüfung', '1/1', 'REV-002 V1.0'], ['Teilweise Bedingungen', '5', 'Lücken bleiben'], ['Schliessbare Bedingungen', '0/6', 'Nachweise fehlen'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-027', version: 'V1.0', status: 'G1-Neubewertung als gesteuerte Lesung bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-REV-002 V0.1 wird bestätigt und zu V1.0. Die sechs Bedingungen bleiben gemäss festgehaltenem Urteil lesbar: fünf teilweise dokumentiert, keine schliessbar und L2 nicht autorisiert.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « woow du bon boulot, merci de continuer, jeconfirme ». Der unmittelbar zuvor vorgelegte Träger war REF-01-G1-REV-002 V0.1.',
      limit: 'Dieser Entscheid schliesst G1 nicht, öffnet L2 nicht und validiert weder Anbieter, Dienst, Sicherung, Wiederherstellung, RPO, RTO, Anwendungsrolle, Aufbewahrungsdauer, Migration, Worker, Schwelle, Alarm, benannte Verantwortung, Zugriff, Echtdaten noch Masterquelle.'
    },
    status: 'BESTÄTIGT · REF-01-G1-REV-002 V1.0 wird die aktuelle Governance-konforme G1-Lesung.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PLN-001 V0.1 ordnet fünf Nachweispakete, ohne reale Ausführung zu erlauben.',
    boundary: 'Die Bestätigung der Diagnose erlaubt ihre Wiederverwendung als Arbeitsgrundlage; sie belegt weder Konformität, Produktionsreife noch Fortschritt.'
  }
};

const InstitutionalPeopleTeamsGateG1ReassessmentConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-reassessment-confirmation" className="m3s-ref01-g1-reassessment-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-reassessment-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-reassessment-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ReassessmentConfirmation;
