import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA RÉÉVALUATION G1 · REF-01-DEC-060 · V1.0 · 29-08-2026',
    title: 'Confirmer REV-004 sans transformer les supports en preuves',
    intro: 'Cheikh confirme REF-01-G1-REV-004 V0.1. La revue devient V1.0 comme lecture gouvernée après les deux sous-lots documentaires ; aucune condition de sortie ne devient satisfaite.',
    counters: [['Revue confirmée', '1/1', 'REV-004 V1.0'], ['Supports documentaires', '18/18', 'Dix Conservation · huit Rôles'], ['Conditions clôturables', '0/6', 'Preuves réelles manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-060', version: 'V1.0', status: 'Réévaluation après les deux sous-lots confirmée', author: 'Cheikh Ndiaye', date: '29-08-2026',
      decision: 'REF-01-G1-REV-004 V0.1 est confirmée et promue en V1.0 comme lecture gouvernée des six conditions après les sous-lots Conservation/GED et Rôles/moindre privilège.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 29-08-2026 : « merci je confirme REF-01-G1-REV-004 V0.1 ».',
      limit: 'Cette décision ne crée ni preuve réelle, titulaire, compte, droit, accès C3/C4/C5, cas GED, durée appliquée, environnement, migration, worker, alerte, test, source maîtresse ou progression. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · REV-004 V1.0 devient la lecture gouvernée courante : 18 supports confirmés, zéro condition G1 clôturable.',
    next: 'Étape candidate produite ci-dessous : REF-01-G1-WAV-003 V0.1 prépare l’ouverture documentaire de la vague technique, sans autoriser un environnement ni un test.',
    boundary: 'La confirmation autorise la réutilisation de la revue comme base de travail ; elle ne vaut ni GO, ni preuve d’exécution, ni aptitude à la production.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE G1 REASSESSMENT · REF-01-DEC-060 · V1.0 · 29 AUG 2026',
    title: 'Confirm REV-004 without turning supports into evidence',
    intro: 'Cheikh confirms REF-01-G1-REV-004 V0.1. The review becomes V1.0 as the governed reading after both documentary sub-packages; no exit condition becomes satisfied.',
    counters: [['Confirmed review', '1/1', 'REV-004 V1.0'], ['Documentary supports', '18/18', 'Ten Retention · eight Roles'], ['Closable conditions', '0/6', 'Real evidence missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-060', version: 'V1.0', status: 'Reassessment after both sub-packages confirmed', author: 'Cheikh Ndiaye', date: '29 Aug 2026',
      decision: 'REF-01-G1-REV-004 V0.1 is confirmed and promoted to V1.0 as the governed reading of all six conditions after the Retention/DMS and Roles/least-privilege sub-packages.',
      evidence: 'Explicit confirmation by Cheikh during the 29 Aug 2026 session: “merci je confirme REF-01-G1-REV-004 V0.1”.',
      limit: 'This decision creates no real evidence, holder, account, right, C3/C4/C5 access, DMS case, applied period, environment, migration, worker, alert, test, master source or progress. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · REV-004 V1.0 becomes the current governed reading: 18 confirmed supports, zero G1 conditions closable.',
    next: 'Candidate step produced below: REF-01-G1-WAV-003 V0.1 prepares documentary opening of the technical wave without authorising an environment or test.',
    boundary: 'Confirmation permits reuse of the review as a working baseline; it is neither a GO, execution evidence nor production readiness.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER G1-NEUBEWERTUNG · REF-01-DEC-060 · V1.0 · 29.08.2026',
    title: 'REV-004 bestätigen, ohne Träger zu Nachweisen zu machen',
    intro: 'Cheikh bestätigt REF-01-G1-REV-004 V0.1. Die Prüfung wird nach beiden Dokumentteilpaketen zur gesteuerten Lesung V1.0; keine Austrittsbedingung wird dadurch erfüllt.',
    counters: [['Bestätigte Prüfung', '1/1', 'REV-004 V1.0'], ['Dokumentträger', '18/18', 'Zehn Aufbewahrung · acht Rollen'], ['Schliessbare Bedingungen', '0/6', 'Realnachweise fehlen'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-060', version: 'V1.0', status: 'Neubewertung nach beiden Teilpaketen bestätigt', author: 'Cheikh Ndiaye', date: '29.08.2026',
      decision: 'REF-01-G1-REV-004 V0.1 wird bestätigt und als gesteuerte Lesung der sechs Bedingungen nach den Teilpaketen Aufbewahrung/DMS und Rollen/geringste Berechtigung zu V1.0.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 29.08.2026: « merci je confirme REF-01-G1-REV-004 V0.1 ».',
      limit: 'Dieser Entscheid erstellt keinen Realnachweis, Inhaber, Account, Recht, C3/C4/C5-Zugriff, DMS-Fall, keine angewandte Frist, Umgebung, Migration, Worker, Alarm, Prüfung, Masterquelle oder Fortschritte. Er schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · REV-004 V1.0 wird die aktuelle gesteuerte Lesung: 18 bestätigte Träger, null schliessbare G1-Bedingungen.',
    next: 'Nachfolgend erstellter Kandidatenschritt: REF-01-G1-WAV-003 V0.1 bereitet die dokumentarische Öffnung der technischen Welle vor, ohne Umgebung oder Prüfung zu erlauben.',
    boundary: 'Die Bestätigung erlaubt die Wiederverwendung als Arbeitsgrundlage; sie ist weder GO, Ausführungsnachweis noch Produktionsreife.'
  }
};

const InstitutionalPeopleTeamsGateG1PostAuthorisationReassessmentConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rev-004-confirmation" data-testid="ref01-g1-post-authorisation-reassessment-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-rev-004-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-rev-004-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostAuthorisationReassessmentConfirmation;
