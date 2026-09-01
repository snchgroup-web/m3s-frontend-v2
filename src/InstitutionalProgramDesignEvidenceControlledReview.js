import React from 'react';
import { AlertTriangle, CheckCircle2, FileCheck2, FileWarning, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const REFERENCES = [
  {
    id: 'SRC-01',
    name: 'M3S_JOURNAL_DE_BORD_2026-09-01.md',
    scopes: 'CON-02 · CON-06',
    contribution: 'direct',
    control: 'caution',
    fingerprint: '0504174B9203',
    finding: text('Chronologie, décisions et trajectoire courante lisibles ; journal vivant encore modifiable pendant la session.', 'Readable chronology, decisions and current roadmap; a living log that can still change during the session.', 'Lesbare Chronologie, Entscheide und aktuelle Trajektorie; lebendes Journal, das sich während der Sitzung noch ändern kann.'),
    reserve: text('Figer une copie GED datée avant tout usage probatoire.', 'Freeze a dated DMS copy before any evidentiary use.', 'Vor jeder beweisbezogenen Nutzung eine datierte DMS-Kopie fixieren.')
  },
  {
    id: 'SRC-02',
    name: '2SG_MODELE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_2_2026-08-23.md',
    scopes: 'CON-02 · CON-03 · CON-04 · CON-06',
    contribution: 'direct',
    control: 'clear',
    fingerprint: '7CF92661A577',
    finding: text('Définit les six composantes, leurs résultats contrôlables, la matrice minimale et l’interdiction de calcul prématuré.', 'Defines the six components, controllable outcomes, minimum matrix and prohibition on premature calculation.', 'Definiert die sechs Komponenten, kontrollierbare Ergebnisse, die Mindestmatrix und das Verbot vorzeitiger Berechnung.'),
    reserve: text('Source de cadrage forte ; ne prouve pas à elle seule la réalisation des résultats.', 'Strong framing source; does not by itself prove that outcomes were achieved.', 'Starke Rahmenquelle; belegt allein nicht die Erreichung der Ergebnisse.')
  },
  {
    id: 'SRC-03',
    name: '2SG_MATRICE_CADRAGE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_2026-08-23.md',
    scopes: 'CON-02 · CON-03 · CON-04 · CON-06',
    contribution: 'direct',
    control: 'clear',
    fingerprint: '55A36EBBB1B3',
    finding: text('Raccorde résultats cibles, états observés et prochaines actions ; confirme que la progression demeure non calculable.', 'Connects target outcomes, observed states and next actions; confirms that progress remains non-computable.', 'Verknüpft Zielergebnisse, beobachtete Zustände und nächste Schritte; bestätigt, dass Fortschritt nicht berechenbar bleibt.'),
    reserve: text('Le fichier source reste nommé V0.1 ; sa relation avec la matrice M3S confirmée doit rester tracée.', 'The source file is still named V0.1; its relationship to the confirmed M3S matrix must remain traceable.', 'Die Quelldatei heißt weiterhin V0.1; ihre Beziehung zur bestätigten M3S-Matrix muss nachvollziehbar bleiben.')
  },
  {
    id: 'SRC-04',
    name: '2SG_INVENTAIRE_SOURCES_MISE_EN_PLACE_V0_1_2026-08-23.md',
    scopes: 'CON-03',
    contribution: 'method',
    control: 'clear',
    fingerprint: 'A3107293015A',
    finding: text('Fournit une méthode prudente d’inventaire, de qualification, de sensibilité et de rattachement aux registres maîtres.', 'Provides a cautious method for inventory, qualification, sensitivity and linkage to master registers.', 'Liefert eine vorsichtige Methode für Inventar, Qualifizierung, Sensibilität und Anbindung an Masterregister.'),
    reserve: text('Concerne la Mise en place : utile comme modèle, mais pas comme résultat direct de CON-03.', 'Concerns Implementation: useful as a method, not as a direct CON-03 outcome.', 'Betrifft die Umsetzung: als Methode nützlich, aber kein direktes CON-03-Ergebnis.')
  },
  {
    id: 'SRC-05',
    name: '2SG_REGISTRE_VEILLE_KM_V3_1_REVISION_LINGUISTIQUE_2026-07-30_STANDALONE.html',
    scopes: 'CON-03',
    contribution: 'direct',
    control: 'caution',
    fingerprint: '957CB37F003B',
    finding: text('Registre structuré de 811 sources : 785 favoris Chrome, 25 Gmail et 1 source Web vérifiée ; priorités, étapes, statuts et actions sont présents.', 'Structured register of 811 sources: 785 Chrome bookmarks, 25 Gmail items and 1 verified Web source; priorities, stages, statuses and actions are present.', 'Strukturiertes Register mit 811 Quellen: 785 Chrome-Lesezeichen, 25 Gmail-Einträge und 1 geprüfte Webquelle; Prioritäten, Stufen, Status und Aktionen sind vorhanden.'),
    reserve: text('633 lignes restent à qualifier et 156 sont restreintes ; volume et structure ne prouvent ni qualité globale ni complétude.', '633 rows remain to qualify and 156 are restricted; volume and structure prove neither overall quality nor completeness.', '633 Zeilen bleiben zu qualifizieren und 156 sind eingeschränkt; Umfang und Struktur belegen weder Gesamtqualität noch Vollständigkeit.')
  },
  {
    id: 'SRC-06',
    name: '2SG_CANDIDATS_GLOSSAIRE_P1_VEILLE_KM_2026-07-30.json',
    scopes: 'CON-03',
    contribution: 'direct',
    control: 'gap',
    fingerprint: '35053DA5A194',
    finding: text('Sept fiches structurées, sans doublon exact ni référence manquante au pré-audit ; la validation française est indiquée au niveau du lot.', 'Seven structured records, with no exact duplicate or missing reference in pre-audit; French validation is stated at package level.', 'Sieben strukturierte Einträge, ohne exakte Dublette oder fehlende Referenz im Vorab-Audit; französische Validierung ist auf Losebene angegeben.'),
    reserve: text('Écart à résoudre : chaque entrée reste « à valider », sans date de validation, et les traductions DE/EN restent à valider.', 'Gap to resolve: every entry remains “to validate”, with no validation date, and DE/EN translations still require validation.', 'Zu klärende Lücke: Jeder Eintrag bleibt „zu validieren“, ohne Validierungsdatum, und DE/EN-Übersetzungen sind weiter zu validieren.')
  },
  {
    id: 'SRC-07',
    name: '2SG_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_VISUEL_2026-08-23_STANDALONE.html',
    scopes: 'CON-04',
    contribution: 'direct',
    control: 'clear',
    fingerprint: '91EB697BA1B4',
    finding: text('Représentation trilingue des 4 étapes et 29 composantes ; liens locaux vers le modèle et la matrice contrôlés comme présents.', 'Trilingual representation of 4 stages and 29 components; local links to the model and matrix were found present.', 'Dreisprachige Darstellung von 4 Stufen und 29 Komponenten; lokale Links zu Modell und Matrix sind vorhanden.'),
    reserve: text('Support de lecture V0.1, non registre maître ; il affiche explicitement une progression non calculable.', 'V0.1 reading aid, not a master register; it explicitly shows progress as non-computable.', 'Lesehilfe V0.1, kein Masterregister; Fortschritt wird ausdrücklich als nicht berechenbar angezeigt.')
  },
  {
    id: 'SRC-08',
    name: '2SG_Intelligence_Dashboard_V4_01-09-2026.html',
    scopes: 'CON-06',
    contribution: 'direct',
    control: 'gap',
    fingerprint: 'E208BF378742',
    finding: text('Le dictionnaire dynamique trilingue contient la trajectoire, PGM-DEC-008, PGM-CON-COL-002 V1.0, l’agenda et le prochain arbitrage.', 'The dynamic trilingual dictionary contains the roadmap, PGM-DEC-008, PGM-CON-COL-002 V1.0, the agenda and the next decision.', 'Das dynamische dreisprachige Wörterbuch enthält die Trajektorie, PGM-DEC-008, PGM-CON-COL-002 V1.0, die Agenda und den nächsten Entscheid.'),
    reserve: text('Écart technique : le contenu statique de repli reste ancien et partiellement mal encodé jusqu’à l’exécution JavaScript ; correction séparée requise avant archivage probatoire.', 'Technical gap: static fallback content remains old and partly misencoded until JavaScript runs; a separate fix is required before evidentiary archiving.', 'Technische Lücke: Statischer Rückfallinhalt bleibt bis zur JavaScript-Ausführung alt und teilweise falsch kodiert; vor beweisbezogener Archivierung ist eine separate Korrektur nötig.')
  }
];

const COPY = {
  FR: {
    eyebrow: 'REVUE CONTRÔLÉE CANDIDATE · PGM-CON-REV-002 · V0.1 · 01-09-2026',
    title: 'Contrôle groupé des huit références ouvertes',
    intro: 'PGM-DEC-009 autorise uniquement l’ouverture et la lecture contrôlées des huit références non restreintes confirmées. Le contrôle qualifie leur apport documentaire sans accepter une preuve.',
    counters: [['8/8', 'références ouvertes et lisibles'], ['7', 'apports directs candidats'], ['1', 'apport méthodologique'], ['0', 'preuves acceptées']],
    labels: { scope: 'Composante(s)', contribution: 'Apport candidat', fingerprint: 'Empreinte à l’ouverture', finding: 'Constat de lecture', reserve: 'Réserve de contrôle' },
    contribution: { direct: 'DIRECT', method: 'MÉTHODE' },
    control: { clear: 'LISIBLE', caution: 'PRUDENCE', gap: 'ÉCART À TRAITER' },
    synthesis: 'Lecture candidate : les mécanismes documentaires de CON-02, CON-03, CON-04 et CON-06 existent et sont reliables. Cette lecture ne démontre ni complétude, ni adoption, ni recevabilité probatoire, ni progression.',
    gaps: 'Deux écarts sont isolés : cohérence des statuts du lot Glossaire et contenu statique de repli du Daily. Ils doivent être corrigés dans des micro-lots séparés avant toute acceptation probatoire.',
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-009', version: 'V1.0', status: 'Ouverture contrôlée autorisée', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'L’ouverture contrôlée des huit références candidates uniques non restreintes de CON-02, CON-03, CON-04 et CON-06 est autorisée et exécutée.', evidence: 'Autorisation explicite de Cheikh dans la session du 01-09-2026 : « J’autorise l’ouverture contrôlée des huit références candidates uniques non restreintes de CON-02, CON-03, CON-04 et CON-06, sans acceptation automatique de preuve, sans CON-01, CON-05, REF-02 ni L2. »', limit: 'L’autorisation couvre uniquement ces huit références. Elle exclut CON-01, CON-05, toute collecte externe, acceptation de preuve, requalification institutionnelle, progression, REF-02 et L2.' },
    next: 'Prochain arbitrage groupé',
    confirmation: 'Confirmer ou amender PGM-CON-REV-002 V0.1 comme relevé candidat, notamment la qualification 7 directes / 1 méthodologique et les deux écarts. Cette confirmation n’acceptera encore aucune preuve.',
    boundary: '0/8 preuve acceptée · CON-01 et CON-05 non ouverts · REF-02 et L2 fermés.'
  },
  EN: {
    eyebrow: 'CANDIDATE CONTROLLED REVIEW · PGM-CON-REV-002 · V0.1 · 1 SEP 2026',
    title: 'Grouped control of the eight opened references',
    intro: 'PGM-DEC-009 authorises only controlled opening and reading of the eight confirmed non-restricted references. The review qualifies their documentary contribution without accepting evidence.',
    counters: [['8/8', 'references opened and readable'], ['7', 'candidate direct contributions'], ['1', 'method contribution'], ['0', 'evidence accepted']],
    labels: { scope: 'Component(s)', contribution: 'Candidate contribution', fingerprint: 'Opening fingerprint', finding: 'Reading finding', reserve: 'Control reservation' },
    contribution: { direct: 'DIRECT', method: 'METHOD' },
    control: { clear: 'READABLE', caution: 'CAUTION', gap: 'GAP TO ADDRESS' },
    synthesis: 'Candidate reading: documentary mechanisms for CON-02, CON-03, CON-04 and CON-06 exist and can be linked. This reading demonstrates neither completeness, adoption, evidentiary admissibility nor progress.',
    gaps: 'Two gaps are isolated: Glossary package status consistency and the Daily static fallback content. They require separate micro-packages before any evidentiary acceptance.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-009', version: 'V1.0', status: 'Controlled opening authorised', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'Controlled opening of the eight unique non-restricted candidate references for CON-02, CON-03, CON-04 and CON-06 is authorised and completed.', evidence: 'Cheikh’s explicit authorisation in the 1 Sep 2026 session, retained in French: “J’autorise l’ouverture contrôlée des huit références candidates uniques non restreintes de CON-02, CON-03, CON-04 et CON-06, sans acceptation automatique de preuve, sans CON-01, CON-05, REF-02 ni L2.”', limit: 'The authorisation covers only these eight references. It excludes CON-01, CON-05, external collection, evidence acceptance, institutional requalification, progress, REF-02 and L2.' },
    next: 'Next grouped decision',
    confirmation: 'Confirm or amend PGM-CON-REV-002 V0.1 as the candidate record, especially the 7 direct / 1 method classification and two gaps. This confirmation will still accept no evidence.',
    boundary: '0/8 evidence accepted · CON-01 and CON-05 not opened · REF-02 and L2 closed.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR KONTROLLIERTE PRÜFUNG · PGM-CON-REV-002 · V0.1 · 01.09.2026',
    title: 'Gebündelte Kontrolle der acht geöffneten Referenzen',
    intro: 'PGM-DEC-009 erlaubt nur die kontrollierte Öffnung und Lektüre der acht bestätigten nicht eingeschränkten Referenzen. Die Prüfung qualifiziert ihren dokumentarischen Beitrag, ohne Nachweise anzunehmen.',
    counters: [['8/8', 'Referenzen geöffnet und lesbar'], ['7', 'direkte Kandidatenbeiträge'], ['1', 'Methodenbeitrag'], ['0', 'Nachweise angenommen']],
    labels: { scope: 'Komponente(n)', contribution: 'Kandidatenbeitrag', fingerprint: 'Fingerabdruck bei Öffnung', finding: 'Lesebefund', reserve: 'Kontrollvorbehalt' },
    contribution: { direct: 'DIREKT', method: 'METHODE' },
    control: { clear: 'LESBAR', caution: 'VORSICHT', gap: 'LÜCKE ZU BEHANDELN' },
    synthesis: 'Kandidatenlektüre: Dokumentationsmechanismen für CON-02, CON-03, CON-04 und CON-06 bestehen und sind verknüpfbar. Diese Lektüre belegt weder Vollständigkeit, Annahme, beweisbezogene Zulässigkeit noch Fortschritt.',
    gaps: 'Zwei Lücken sind isoliert: Statuskonsistenz des Glossar-Loses und statischer Rückfallinhalt des Daily. Vor jeder Nachweisannahme sind getrennte Mikrolosen erforderlich.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-009', version: 'V1.0', status: 'Kontrollierte Öffnung autorisiert', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'Die kontrollierte Öffnung der acht eindeutigen nicht eingeschränkten Kandidatenreferenzen für CON-02, CON-03, CON-04 und CON-06 ist autorisiert und ausgeführt.', evidence: 'Ausdrückliche Autorisierung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „J’autorise l’ouverture contrôlée des huit références candidates uniques non restreintes de CON-02, CON-03, CON-04 et CON-06, sans acceptation automatique de preuve, sans CON-01, CON-05, REF-02 ni L2.“', limit: 'Die Autorisierung umfasst nur diese acht Referenzen. Ausgeschlossen sind CON-01, CON-05, externe Sammlung, Nachweisannahme, institutionelle Neueinstufung, Fortschritt, REF-02 und L2.' },
    next: 'Nächster gebündelter Entscheid',
    confirmation: 'PGM-CON-REV-002 V0.1 als Kandidatenprotokoll bestätigen oder ändern, insbesondere die Einstufung 7 direkt / 1 Methode und die zwei Lücken. Auch diese Bestätigung nimmt noch keinen Nachweis an.',
    boundary: '0/8 Nachweise angenommen · CON-01 und CON-05 nicht geöffnet · REF-02 und L2 geschlossen.'
  }
};

const CONTROL_STYLES = {
  clear: 'border-emerald-800/70 bg-emerald-950/20 text-emerald-200',
  caution: 'border-amber-800/70 bg-amber-950/20 text-amber-200',
  gap: 'border-rose-800/70 bg-rose-950/20 text-rose-200'
};

const InstitutionalProgramDesignEvidenceControlledReview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-controlled-review" data-testid="institutional-program-design-controlled-review" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <FileCheck2 className="shrink-0 text-sky-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 0 ? 'text-sky-300' : index === 1 ? 'text-emerald-300' : 'text-amber-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 space-y-3">
        {REFERENCES.map(reference => (
          <article key={reference.id} data-testid="institutional-program-design-controlled-reference" className="m3s-raised p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0"><p className="text-xs font-semibold text-sky-300">{reference.id} · {reference.scopes}</p><h5 className="mt-1 break-words text-sm font-semibold text-slate-100 sm:text-base">{reference.name}</h5></div>
              <div className="flex flex-wrap gap-2"><span className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold ${reference.contribution === 'direct' ? 'border-sky-800/70 bg-sky-950/20 text-sky-200' : 'border-violet-800/70 bg-violet-950/20 text-violet-200'}`}>{t.contribution[reference.contribution]}</span><span className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold ${CONTROL_STYLES[reference.control]}`}>{t.control[reference.control]}</span></div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1.5fr_0.7fr]">
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.finding}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(reference.finding)}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.reserve}</p><p className="mt-2 text-sm leading-6 text-amber-200">{local(reference.reserve)}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.fingerprint}</p><p className="mt-2 break-all font-mono text-xs text-slate-300">{reference.fingerprint}</p></div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-0.5 shrink-0 text-sky-300" size={18} aria-hidden="true" />{t.synthesis}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-rose-800/70 bg-rose-950/15 p-3 text-xs font-semibold leading-5 text-rose-200"><FileWarning className="mt-0.5 shrink-0" size={17} aria-hidden="true" />{t.gaps}</p>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceControlledReview;
