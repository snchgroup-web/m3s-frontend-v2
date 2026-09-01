import React from 'react';
import { AlertTriangle, CheckCircle2, FileCheck2, Languages, LockKeyhole, ShieldCheck } from 'lucide-react';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const CONTROLS = [
  {
    id: 'COR-01',
    icon: Languages,
    title: text('Cohérence des statuts Glossaire', 'Glossary status consistency', 'Konsistenz der Glossarstatus'),
    basis: '3DF782AA314DDCB2CB4AE9B915AED348EBEA752E0A82CC50113ADC90CF45519D',
    checks: text(
      ['Source originale inchangée.', 'Statut du lot séparé des entrées et des langues.', '7/7 entrées FR/DE/EN maintenues à valider.', 'JSON et UTF-8 contrôlés.'],
      ['Original source unchanged.', 'Package status separated from entries and languages.', 'All 7/7 FR/DE/EN entries remain pending validation.', 'JSON and UTF-8 checked.'],
      ['Ursprungsquelle unverändert.', 'Losstatus von Einträgen und Sprachen getrennt.', 'Alle 7/7 FR/DE/EN-Einträge bleiben zu validieren.', 'JSON und UTF-8 geprüft.']
    ),
    verdict: text('Écart technique levé', 'Technical gap resolved', 'Technische Lücke behoben')
  },
  {
    id: 'COR-02',
    icon: FileCheck2,
    title: text('Repli statique du Daily', 'Daily static fallback', 'Statischer Daily-Rückfall'),
    basis: '67541BEEF16CA058CDF6757488C4A55F054957A8C737D7306EF9513370E0E85A',
    checks: text(
      ['Date, mémoire, résultats et prochaine action visibles sans JavaScript.', 'Édition du 02-09-2026 alignée sur le contexte courant.', 'Aucun caractère de remplacement ni mojibake.', 'État Telegram conservé sans nouvel envoi.'],
      ['Date, memory, results and next action visible without JavaScript.', '2 Sep 2026 edition aligned with current context.', 'No replacement character or mojibake.', 'Telegram state preserved with no new delivery.'],
      ['Datum, Gedächtnis, Ergebnisse und nächster Schritt ohne JavaScript sichtbar.', 'Ausgabe vom 02.09.2026 am aktuellen Kontext ausgerichtet.', 'Keine Ersatzzeichen oder Mojibake.', 'Telegram-Status ohne neue Sendung bewahrt.']
    ),
    verdict: text('Écart technique levé', 'Technical gap resolved', 'Technische Lücke behoben')
  }
];

const COPY = {
  FR: {
    eyebrow: 'CONTRÔLE POST-CORRECTION CANDIDAT · PGM-CON-REV-003 · V0.1 · 02-09-2026',
    title: 'Deux écarts techniques levés, aucune preuve acceptée',
    intro: 'Ce contrôle vérifie les sorties de COR-01 et COR-02 après confirmation de PGM-CON-COR-002 V1.0. Il ne qualifie pas les huit références comme preuves institutionnelles.',
    counters: [['2/2', 'contrôles réussis'], ['2/2', 'écarts techniques levés'], ['0/8', 'référence acceptée comme preuve'], ['0', 'progression calculée']],
    labels: { basis: 'Base contrôlée', checks: 'Constats de contrôle', verdict: 'Verdict technique' },
    next: 'Prochaine confirmation groupée',
    confirmation: 'Je confirme PGM-CON-REV-003 V0.1 comme contrôle post-correction des deux écarts techniques, sans accepter les huit références comme preuves ni ouvrir CON-01, CON-05, REF-02 ou L2.',
    boundary: '« Écart technique levé » ne signifie ni preuve acceptée, ni adoption institutionnelle, ni progression du Programme.'
  },
  EN: {
    eyebrow: 'CANDIDATE POST-CORRECTION REVIEW · PGM-CON-REV-003 · V0.1 · 2 SEP 2026',
    title: 'Two technical gaps resolved, zero evidence accepted',
    intro: 'This review checks COR-01 and COR-02 outputs after confirmation of PGM-CON-COR-002 V1.0. It does not qualify the eight references as institutional evidence.',
    counters: [['2/2', 'checks passed'], ['2/2', 'technical gaps resolved'], ['0/8', 'references accepted as evidence'], ['0', 'calculated progress']],
    labels: { basis: 'Controlled basis', checks: 'Control findings', verdict: 'Technical verdict' },
    next: 'Next grouped confirmation',
    confirmation: 'I confirm PGM-CON-REV-003 V0.1 as the post-correction review for both technical gaps, without accepting the eight references as evidence or opening CON-01, CON-05, REF-02 or L2.',
    boundary: '“Technical gap resolved” means neither accepted evidence, institutional adoption nor Programme progress.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR NACHKORREKTURPRÜFUNG · PGM-CON-REV-003 · V0.1 · 02.09.2026',
    title: 'Zwei technische Lücken behoben, null Nachweise angenommen',
    intro: 'Diese Prüfung kontrolliert die Ergebnisse von COR-01 und COR-02 nach Bestätigung von PGM-CON-COR-002 V1.0. Sie qualifiziert die acht Referenzen nicht als institutionelle Nachweise.',
    counters: [['2/2', 'Kontrollen bestanden'], ['2/2', 'technische Lücken behoben'], ['0/8', 'Referenzen als Nachweis angenommen'], ['0', 'berechneter Fortschritt']],
    labels: { basis: 'Kontrollierte Grundlage', checks: 'Kontrollbefunde', verdict: 'Technisches Urteil' },
    next: 'Nächste gebündelte Bestätigung',
    confirmation: 'Ich bestätige PGM-CON-REV-003 V0.1 als Nachkorrekturprüfung der beiden technischen Lücken, ohne die acht Referenzen als Nachweise anzunehmen oder CON-01, CON-05, REF-02 oder L2 zu öffnen.',
    boundary: '„Technische Lücke behoben“ bedeutet weder angenommene Nachweise, institutionelle Annahme noch Programmfortschritt.'
  }
};

const InstitutionalProgramDesignPostCorrectionReview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-post-correction-review" data-testid="institutional-program-design-post-correction-review" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ShieldCheck className="shrink-0 text-cyan-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-cyan-300' : 'text-slate-200'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {CONTROLS.map(item => {
          const Icon = item.icon;
          return (
            <article key={item.id} data-testid="institutional-program-design-post-correction-control" className="m3s-raised p-4">
              <div className="flex items-start gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-950/30 text-cyan-300"><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-cyan-300">{item.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(item.title)}</h5></div></div>
              <div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.basis}</p><p className="mt-1 break-all font-mono text-xs text-sky-200">{item.basis}</p></div>
              <div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.checks}</p><ul className="mt-2 space-y-2">{local(item.checks).map(check => <li key={check} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{check}</li>)}</ul></div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-200"><ShieldCheck size={16} aria-hidden="true" />{t.labels.verdict} : {local(item.verdict)}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignPostCorrectionReview;
