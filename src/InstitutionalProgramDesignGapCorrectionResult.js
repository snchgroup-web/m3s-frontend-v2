import React from 'react';
import { AlertTriangle, CheckCircle2, FileCheck2, Languages, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const RESULTS = [
  {
    id: 'COR-01',
    icon: Languages,
    title: text('Statuts du Glossaire rendus cohérents', 'Glossary statuses made consistent', 'Glossarstatus konsistent gemacht'),
    result: text(
      'La source SRC-06 reste intacte. Une copie corrigée distincte sépare le statut du lot, les définitions FR et les traductions DE/EN ; les 7/7 entrées restent à valider.',
      'Source SRC-06 remains unchanged. A separate corrected copy splits package status, FR definitions and DE/EN translations; all 7/7 entries remain to validate.',
      'Quelle SRC-06 bleibt unverändert. Eine getrennte korrigierte Kopie trennt Losstatus, FR-Definitionen und DE/EN-Übersetzungen; alle 7/7 Einträge bleiben zu validieren.'
    ),
    artifact: '2SG_CANDIDATS_GLOSSAIRE_P1_VEILLE_KM_2026-07-30_COR-01_V1.json',
    fingerprint: '3DF782AA314DDCB2CB4AE9B915AED348EBEA752E0A82CC50113ADC90CF45519D',
    control: text(
      'Source initiale 35053DA5A194 conservée ; JSON, UTF-8 et statuts FR/DE/EN contrôlés.',
      'Original source 35053DA5A194 preserved; JSON, UTF-8 and FR/DE/EN statuses checked.',
      'Ursprungsquelle 35053DA5A194 bewahrt; JSON, UTF-8 und FR/DE/EN-Status geprüft.'
    )
  },
  {
    id: 'COR-02',
    icon: FileCheck2,
    title: text('Repli statique du Daily raccordé au contexte courant', 'Daily static fallback connected to current context', 'Statischer Daily-Rückfall an aktuellen Kontext angebunden'),
    result: text(
      'La génération remplace désormais les marqueurs HTML visibles sans JavaScript depuis le même contexte que le dictionnaire dynamique : date, mémoire, journal, agenda, décision et prochaine porte.',
      'Generation now replaces HTML markers visible without JavaScript from the same context as the dynamic dictionary: date, memory, log, agenda, decision and next gate.',
      'Die Erzeugung ersetzt nun die ohne JavaScript sichtbaren HTML-Marker aus demselben Kontext wie das dynamische Wörterbuch: Datum, Gedächtnis, Journal, Agenda, Entscheid und nächstes Tor.'
    ),
    artifact: 'scripts/build-dashboard-v4-artifacts.mjs',
    fingerprint: '67541BEEF16CA058CDF6757488C4A55F054957A8C737D7306EF9513370E0E85A',
    control: text(
      'Test unitaire UTF-8 et échappement réussi ; état Telegram conservé et contrôlé séparément.',
      'UTF-8 and escaping unit test passed; Telegram state preserved and checked separately.',
      'UTF-8- und Escaping-Einheitstest bestanden; Telegram-Status getrennt bewahrt und geprüft.'
    )
  }
];

const COPY = {
  FR: {
    eyebrow: 'RELEVÉ D’EXÉCUTION CANDIDAT · PGM-CON-COR-002 · V0.1 · 01-09-2026',
    title: 'Deux corrections exécutées, aucune preuve acceptée',
    intro: 'PGM-DEC-011 consigne le GO d’exécution. Ce relevé décrit les résultats techniques de COR-01 et COR-02 sans transformer les sources corrigées en preuves institutionnelles.',
    counters: [['2/2', 'corrections exécutées'], ['7/7', 'entrées Glossaire prudentes'], ['0', 'validation rétroactive'], ['0', 'preuve acceptée']],
    labels: { result: 'Résultat technique', artifact: 'Livrable', fingerprint: 'Empreinte', control: 'Contrôle de sortie' },
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    decisionRecord: { id: 'PGM-DEC-011', version: 'V1.0', status: 'Exécution technique autorisée', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'PGM-CON-COR-001 V0.1 est confirmé et l’exécution technique de COR-01 puis COR-02 est autorisée.', evidence: 'Instruction explicite de Cheikh dans la session du 01-09-2026 : « Les corrections COR-01 et COR-02 ne sont pas encore exécutées. merci d’executer ou bien ? »', limit: 'Autorisation limitée aux deux corrections techniques, sans validation rétroactive, acceptation de preuve, envoi Telegram, CON-01, CON-05, REF-02 ni L2.' },
    next: 'Prochaine confirmation groupée',
    confirmation: 'Je confirme PGM-CON-COR-002 V0.1 comme relevé d’exécution de COR-01 et COR-02, sans accepter de preuve ni ouvrir CON-01, CON-05, REF-02 ou L2.',
    boundary: 'Résultat candidat : 0 preuve acceptée, 0 progression calculée et 0 périmètre institutionnel rouvert.'
  },
  EN: {
    eyebrow: 'CANDIDATE EXECUTION RECORD · PGM-CON-COR-002 · V0.1 · 1 SEP 2026',
    title: 'Two corrections executed, zero evidence accepted',
    intro: 'PGM-DEC-011 records the execution GO. This record describes COR-01 and COR-02 technical results without turning corrected sources into institutional evidence.',
    counters: [['2/2', 'corrections executed'], ['7/7', 'cautious Glossary entries'], ['0', 'retrospective validation'], ['0', 'evidence accepted']],
    labels: { result: 'Technical result', artifact: 'Deliverable', fingerprint: 'Fingerprint', control: 'Exit control' },
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    decisionRecord: { id: 'PGM-DEC-011', version: 'V1.0', status: 'Technical execution authorised', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'PGM-CON-COR-001 V0.1 is confirmed and technical execution of COR-01 followed by COR-02 is authorised.', evidence: 'Cheikh’s explicit instruction in the 1 Sep 2026 session, retained in French: “Les corrections COR-01 et COR-02 ne sont pas encore exécutées. merci d’executer ou bien ?”', limit: 'Authorisation is limited to both technical corrections, with no retrospective validation, evidence acceptance, Telegram delivery, CON-01, CON-05, REF-02 or L2.' },
    next: 'Next grouped confirmation',
    confirmation: 'I confirm PGM-CON-COR-002 V0.1 as the execution record for COR-01 and COR-02, without accepting evidence or opening CON-01, CON-05, REF-02 or L2.',
    boundary: 'Candidate result: zero evidence accepted, zero calculated progress and zero institutional scope reopened.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR AUSFÜHRUNGSPROTOKOLL · PGM-CON-COR-002 · V0.1 · 01.09.2026',
    title: 'Zwei Korrekturen ausgeführt, null Nachweise angenommen',
    intro: 'PGM-DEC-011 erfasst das Ausführungs-GO. Dieses Protokoll beschreibt die technischen Ergebnisse von COR-01 und COR-02, ohne korrigierte Quellen in institutionelle Nachweise umzuwandeln.',
    counters: [['2/2', 'Korrekturen ausgeführt'], ['7/7', 'vorsichtige Glossareinträge'], ['0', 'rückwirkende Validierung'], ['0', 'Nachweise angenommen']],
    labels: { result: 'Technisches Ergebnis', artifact: 'Lieferobjekt', fingerprint: 'Fingerabdruck', control: 'Austrittskontrolle' },
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    decisionRecord: { id: 'PGM-DEC-011', version: 'V1.0', status: 'Technische Ausführung autorisiert', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'PGM-CON-COR-001 V0.1 ist bestätigt und die technische Ausführung von COR-01 und danach COR-02 ist autorisiert.', evidence: 'Ausdrückliche Anweisung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „Les corrections COR-01 et COR-02 ne sont pas encore exécutées. merci d’executer ou bien ?“', limit: 'Die Autorisierung ist auf beide technischen Korrekturen begrenzt, ohne rückwirkende Validierung, Nachweisannahme, Telegram-Sendung, CON-01, CON-05, REF-02 oder L2.' },
    next: 'Nächste gebündelte Bestätigung',
    confirmation: 'Ich bestätige PGM-CON-COR-002 V0.1 als Ausführungsprotokoll für COR-01 und COR-02, ohne Nachweise anzunehmen oder CON-01, CON-05, REF-02 oder L2 zu öffnen.',
    boundary: 'Kandidatenergebnis: null Nachweise angenommen, null Fortschritt berechnet und kein institutioneller Umfang wieder geöffnet.'
  }
};

const InstitutionalProgramDesignGapCorrectionResult = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-gap-correction-result" data-testid="institutional-program-design-gap-correction-result" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ShieldCheck className="shrink-0 text-emerald-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-emerald-300' : 'text-slate-200'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {RESULTS.map(item => {
          const Icon = item.icon;
          return (
            <article key={item.id} data-testid="institutional-program-design-gap-result" className="m3s-raised p-4">
              <div className="flex items-start gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-950/30 text-emerald-300"><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-emerald-300">{item.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(item.title)}</h5></div></div>
              <div className="mt-4 space-y-3">
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.result}</p><p className="mt-1 text-sm leading-6 text-slate-300">{local(item.result)}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.artifact}</p><p className="mt-1 break-words font-mono text-xs text-sky-200">{item.artifact}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.fingerprint}</p><p className="mt-1 break-all font-mono text-xs text-slate-300">{item.fingerprint}</p></div>
                <p className="flex items-start gap-2 text-xs font-semibold leading-5 text-emerald-200"><CheckCircle2 className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{local(item.control)}</p>
              </div>
            </article>
          );
        })}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.decisionRecord} />
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignGapCorrectionResult;
