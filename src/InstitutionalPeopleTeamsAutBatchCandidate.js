import React from 'react';
import { AlertTriangle, GitMerge, LockKeyhole, Rows3 } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PROTOCOLE CONFIRMÉ DE TRAITEMENT GROUPÉ · REF-01-G1-BAT-001 · V1.0 · 27-08-2026',
    title: 'Accélérer en deux vagues sans fusionner les contrôles',
    intro: 'Le lot complet réduit les attentes entre dossiers. AUT-A, AUT-B et AUT-C sont préparés en parallèle ; AUT-D commence ensuite comme revue croisée de leurs trois résultats.',
    counters: [['Dossiers inclus', '4/4', 'Un lot commun'], ['Vagues', '2', 'Trois pistes puis revue croisée'], ['Verdicts attendus', '4', 'Un verdict par dossier'], ['Actions réelles', '0', 'Arrêt humain commun']],
    waveLabel: 'Vague',
    lanes: [
      ['1', 'AUT-A · Documentation officielle', 'Index des sources publiques ou institutionnelles', 'Autorité, date, périmètre et provenance'],
      ['1', 'AUT-B · Preuves techniques', 'Matrice de preuves isolées et synthétiques', 'Reproductibilité, séparation et traçabilité'],
      ['1', 'AUT-C · Retour indépendant', 'Brief de revue méthodologique bornée', 'Corpus, rôle du relecteur et conflits d’intérêts'],
      ['2', 'AUT-D · Revue croisée', 'Grille de rapprochement des résultats A–C', 'Écarts conservés, aucune promotion automatique']
    ],
    labels: { output: 'Sortie préparée', control: 'Contrôle indépendant', status: 'CONFIRMÉ · NON EXÉCUTÉ' },
    sequence: 'Dépendance conservée : AUT-D ne peut pas conclure avant la disponibilité des sorties A, B et C. Les quatre dossiers appartiennent néanmoins au même lot de pilotage.',
    next: 'Décisions consignées : REF-01-DEC-022 confirme SEL-001 et BAT-001 ; REF-01-DEC-023 confirme WAV-001 V1.0 et ouvre les trois pistes bornées de la vague 1.',
    boundary: 'Point d’arrêt commun obligatoire avant toute identité, désignation de fournisseur, création de compte, accès, contact, envoi, collecte, test sur données réelles ou promotion de source maîtresse.'
  },
  EN: {
    eyebrow: 'CONFIRMED BATCH-PROCESSING PROTOCOL · REF-01-G1-BAT-001 · V1.0 · 27 AUG 2026',
    title: 'Accelerate in two waves without merging controls',
    intro: 'The complete package reduces waiting between files. AUT-A, AUT-B and AUT-C are prepared in parallel; AUT-D then starts as a cross-review of their three results.',
    counters: [['Included files', '4/4', 'One common package'], ['Waves', '2', 'Three tracks then cross-review'], ['Expected verdicts', '4', 'One verdict per file'], ['Real actions', '0', 'Common human hold point']],
    waveLabel: 'Wave',
    lanes: [
      ['1', 'AUT-A · Official documentation', 'Index of public or institutional sources', 'Authority, date, scope and provenance'],
      ['1', 'AUT-B · Technical evidence', 'Matrix of isolated synthetic evidence', 'Reproducibility, separation and traceability'],
      ['1', 'AUT-C · Independent feedback', 'Bounded methodological-review brief', 'Corpus, reviewer role and conflicts of interest'],
      ['2', 'AUT-D · Cross-review', 'Reconciliation grid for A–C results', 'Gaps retained, no automatic promotion']
    ],
    labels: { output: 'Prepared output', control: 'Independent control', status: 'CONFIRMED · NOT EXECUTED' },
    sequence: 'Dependency retained: AUT-D cannot conclude before outputs A, B and C are available. All four files nevertheless belong to the same governed package.',
    next: 'Decisions recorded: REF-01-DEC-022 confirms SEL-001 and BAT-001; REF-01-DEC-023 confirms WAV-001 V1.0 and opens the three bounded Wave 1 tracks.',
    boundary: 'A common human hold point is mandatory before any identity, provider designation, account creation, access, contact, send, collection, real-data test or master-source promotion.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES PROTOKOLL FÜR PAKETVERARBEITUNG · REF-01-G1-BAT-001 · V1.0 · 27.08.2026',
    title: 'In zwei Wellen beschleunigen, ohne Kontrollen zu vermischen',
    intro: 'Das Gesamtpaket verkürzt Wartezeiten zwischen den Akten. AUT-A, AUT-B und AUT-C werden parallel vorbereitet; AUT-D beginnt danach als Gegenprüfung ihrer drei Ergebnisse.',
    counters: [['Enthaltene Akten', '4/4', 'Ein gemeinsames Paket'], ['Wellen', '2', 'Drei Spuren, dann Gegenprüfung'], ['Erwartete Urteile', '4', 'Ein Urteil je Akte'], ['Reale Aktionen', '0', 'Gemeinsamer menschlicher Haltepunkt']],
    waveLabel: 'Welle',
    lanes: [
      ['1', 'AUT-A · Offizielle Dokumentation', 'Index öffentlicher oder institutioneller Quellen', 'Autorität, Datum, Umfang und Herkunft'],
      ['1', 'AUT-B · Technische Nachweise', 'Matrix isolierter synthetischer Nachweise', 'Reproduzierbarkeit, Trennung und Rückverfolgbarkeit'],
      ['1', 'AUT-C · Unabhängige Rückmeldung', 'Begrenzter methodischer Prüfauftrag', 'Korpus, Prüferrolle und Interessenkonflikte'],
      ['2', 'AUT-D · Gegenprüfung', 'Abgleichraster der Ergebnisse A–C', 'Abweichungen erhalten, keine automatische Beförderung']
    ],
    labels: { output: 'Vorbereitete Ausgabe', control: 'Unabhängige Kontrolle', status: 'BESTÄTIGT · NICHT AUSGEFÜHRT' },
    sequence: 'Abhängigkeit bleibt bestehen: AUT-D kann vor Verfügbarkeit der Ausgaben A, B und C nicht abschliessen. Alle vier Akten gehören dennoch zum selben gesteuerten Paket.',
    next: 'Entscheide erfasst: REF-01-DEC-022 bestätigt SEL-001 und BAT-001; REF-01-DEC-023 bestätigt WAV-001 V1.0 und öffnet die drei begrenzten Spuren der Welle 1.',
    boundary: 'Ein gemeinsamer menschlicher Haltepunkt ist vor Identität, Anbieterbestimmung, Kontoerstellung, Zugriff, Kontakt, Versand, Sammlung, Echtdatentest oder Beförderung zur Masterquelle zwingend.'
  }
};

const InstitutionalPeopleTeamsAutBatchCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-batch-candidate" className="m3s-ref01-g1-aut-batch-candidate mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-batch-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-batch-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Rows3 className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 3 ? <GitMerge className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.lanes.map(([wave, title, output, control]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-aut-batch-lane"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-slate-100">{title}</p><span className="rounded-md border border-sky-700/70 bg-sky-950/40 px-2 py-1 text-[11px] font-semibold text-sky-200">{t.waveLabel} {wave}</span></div><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.output} : </span>{output}</p><p className="mt-2 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.control} : </span>{control}</p><p className="mt-3 text-[11px] font-semibold text-sky-200">{t.labels.status}</p></article>)}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.sequence}</p>
      <p className="mt-3 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutBatchCandidate;
