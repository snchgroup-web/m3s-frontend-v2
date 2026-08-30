import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA RÉÉVALUATION TECHNIQUE · REF-01-DEC-065 · V1.0 · 30-08-2026',
    title: 'Confirmer REV-005 sans transformer les champs en preuves',
    intro: 'Cheikh confirme REF-01-G1-REV-005 V0.1. La revue devient V1.0 comme lecture gouvernée des trois structures techniques ; les 22 valeurs ouvertes restent à qualifier et aucune exécution n’est autorisée.',
    counters: [['Revue confirmée', '1/1', 'REV-005 V1.0'], ['Structures confirmées', '3/3', 'PostgreSQL · Migration · Outbox'], ['Valeurs ouvertes', '22', 'Six · huit · huit'], ['Conditions clôturables', '0/6', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-065', version: 'V1.0', status: 'Réévaluation documentaire de la vague technique confirmée', author: 'Cheikh Ndiaye', date: '30-08-2026',
      decision: 'REF-01-G1-REV-005 V0.1 est confirmée et promue en V1.0 comme lecture gouvernée des trois structures techniques de WAV-003 et de leurs vingt-deux valeurs encore ouvertes.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « merci pour le retour, c super, stp garde la méthode accélérée et je confirme, continue ».',
      limit: 'Cette décision ne désigne aucune valeur réelle, source maîtresse, personne, responsabilité technique, commande, secret, environnement, migration, worker, alerte ou fournisseur. Elle ne lance aucun test, ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · REV-005 V1.0 devient la lecture gouvernée courante : 3/3 structures, 33/33 champs, 22 valeurs ouvertes et 0/6 condition G1 clôturable.',
    next: 'Étape candidate produite ci-dessous : REF-01-G1-PLN-002 V0.1 ordonne la qualification documentaire des 22 valeurs en trois lots, sans les renseigner.',
    boundary: 'La confirmation autorise la réutilisation de la revue comme base de travail ; elle ne vaut ni GO, ni preuve technique, ni aptitude à la production.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE TECHNICAL REASSESSMENT · REF-01-DEC-065 · V1.0 · 30 AUG 2026',
    title: 'Confirm REV-005 without turning fields into evidence',
    intro: 'Cheikh confirms REF-01-G1-REV-005 V0.1. The review becomes V1.0 as the governed reading of all three technical structures; the 22 open values remain to qualify and no execution is authorised.',
    counters: [['Confirmed review', '1/1', 'REV-005 V1.0'], ['Confirmed structures', '3/3', 'PostgreSQL · Migration · Outbox'], ['Open values', '22', 'Six · eight · eight'], ['Closable conditions', '0/6', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-065', version: 'V1.0', status: 'Documentary technical-wave reassessment confirmed', author: 'Cheikh Ndiaye', date: '30 Aug 2026',
      decision: 'REF-01-G1-REV-005 V0.1 is confirmed and promoted to V1.0 as the governed reading of the three WAV-003 technical structures and their twenty-two still-open values.',
      evidence: 'Explicit confirmation by Cheikh during the 30 Aug 2026 session: “merci pour le retour, c super, stp garde la méthode accélérée et je confirme, continue”.',
      limit: 'This decision designates no real value, master source, person, technical responsibility, command, secret, environment, migration, worker, alert or provider. It starts no test, does not close G1 and does not open L2.'
    },
    status: 'CONFIRMED · REV-005 V1.0 becomes the current governed reading: 3/3 structures, 33/33 fields, 22 open values and 0/6 closable G1 conditions.',
    next: 'Candidate step produced below: REF-01-G1-PLN-002 V0.1 orders documentary qualification of the 22 values into three packages without filling them.',
    boundary: 'Confirmation permits reuse of the review as a working baseline; it is neither a GO, technical evidence nor production readiness.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER TECHNISCHEN NEUBEWERTUNG · REF-01-DEC-065 · V1.0 · 30.08.2026',
    title: 'REV-005 bestätigen, ohne Felder zu Nachweisen zu machen',
    intro: 'Cheikh bestätigt REF-01-G1-REV-005 V0.1. Die Prüfung wird zur gesteuerten Lesung V1.0 der drei technischen Strukturen; die 22 offenen Werte bleiben zu qualifizieren und keine Ausführung ist autorisiert.',
    counters: [['Bestätigte Prüfung', '1/1', 'REV-005 V1.0'], ['Bestätigte Strukturen', '3/3', 'PostgreSQL · Migration · Outbox'], ['Offene Werte', '22', 'Sechs · acht · acht'], ['Schliessbare Bedingungen', '0/6', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-065', version: 'V1.0', status: 'Dokumentarische Neubewertung der technischen Welle bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026',
      decision: 'REF-01-G1-REV-005 V0.1 wird bestätigt und als gesteuerte Lesung der drei technischen WAV-003-Strukturen und ihrer zweiundzwanzig noch offenen Werte zu V1.0.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 30.08.2026: « merci pour le retour, c super, stp garde la méthode accélérée et je confirme, continue ».',
      limit: 'Dieser Entscheid bestimmt keinen realen Wert, keine Masterquelle, Person, technische Verantwortung, keinen Befehl, kein Geheimnis, keine Umgebung, Migration, Worker, Alarm oder Anbieter. Er startet keine Prüfung, schliesst G1 nicht und öffnet L2 nicht.'
    },
    status: 'BESTÄTIGT · REV-005 V1.0 wird die aktuelle gesteuerte Lesung: 3/3 Strukturen, 33/33 Felder, 22 offene Werte und 0/6 schliessbare G1-Bedingungen.',
    next: 'Nachfolgend erstellter Kandidatenschritt: REF-01-G1-PLN-002 V0.1 ordnet die dokumentarische Qualifizierung der 22 Werte in drei Pakete, ohne sie auszufüllen.',
    boundary: 'Die Bestätigung erlaubt die Wiederverwendung als Arbeitsgrundlage; sie ist weder GO, technischer Nachweis noch Produktionsreife.'
  }
};

const InstitutionalPeopleTeamsGateG1TechnicalWaveReassessmentConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rev-005-confirmation" data-testid="ref01-g1-technical-wave-reassessment-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-rev-005-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-rev-005-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1TechnicalWaveReassessmentConfirmation;
