import React from 'react';
import { AlertTriangle, FileCheck2, LockKeyhole, PauseCircle, Scale, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });
const PRONOUNCEMENT = 'Je prononce les décisions de PGM-CON-DEC-001 V1.0 : admissions limitées de SRC-02 au cadrage, SRC-04 à la méthode et SRC-07 au support visuel ; ajournement de SRC-01, SRC-03, SRC-05, SRC-06 et SRC-08 selon les conditions du paquet. Cela n’accepte aucune preuve de réalisation, ne modifie aucun taux de progression et n’ouvre ni CON-01, CON-05, REF-02 ni L2.';

const DECISIONS = [
  ['SRC-01', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre une copie GED datée et la fermeture des portes G1, G2 et G5.', 'Wait for a dated DMS copy and closure of gates G1, G2 and G5.', 'Auf eine datierte GED-Kopie und den Abschluss der Tore G1, G2 und G5 warten.')],
  ['SRC-02', 'V2', 'LIMITED', text('ADMISSION LIMITÉE · CADRAGE', 'LIMITED ADMISSION · FRAMING', 'BEGRENZTE ZULASSUNG · RAHMEN'), text('Limiter l’usage au périmètre et à la structure, jamais à la preuve d’une réalisation.', 'Limit use to scope and structure, never as evidence of achievement.', 'Nutzung auf Umfang und Struktur begrenzen, niemals als Umsetzungsnachweis.')],
  ['SRC-03', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre la traçabilité V0.1 vers la matrice M3S confirmée ainsi que la fermeture des réserves de version et de provenance.', 'Wait for traceability from V0.1 to the confirmed M3S matrix and closure of version and provenance reservations.', 'Auf die Rückverfolgbarkeit von V0.1 zur bestätigten M3S-Matrix und den Abschluss der Versions- und Herkunftsvorbehalte warten.')],
  ['SRC-04', 'V3', 'LIMITED', text('ADMISSION LIMITÉE · MÉTHODE', 'LIMITED ADMISSION · METHOD', 'BEGRENZTE ZULASSUNG · METHODE'), text('Limiter l’usage à la méthode d’inventaire, sans qualifier la pièce comme résultat direct de CON-03.', 'Limit use to the inventory method without qualifying the file as a direct CON-03 outcome.', 'Nutzung auf die Inventarmethode begrenzen, ohne die Datei als direktes CON-03-Ergebnis einzustufen.')],
  ['SRC-05', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre le traitement de la couverture non qualifiée et restreinte, sans présumer la complétude.', 'Wait until unqualified and restricted coverage is addressed, without assuming completeness.', 'Auf die Behandlung der unqualifizierten und eingeschränkten Abdeckung warten, ohne Vollständigkeit anzunehmen.')],
  ['SRC-06', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre la conservation de la filiation et la validation séparée des 7 entrées FR, DE et EN.', 'Wait for lineage preservation and separate validation of the 7 FR, DE and EN entries.', 'Auf die Bewahrung der Herkunftskette und die getrennte Validierung der 7 FR-, DE- und EN-Einträge warten.')],
  ['SRC-07', 'V4', 'LIMITED', text('ADMISSION LIMITÉE · SUPPORT VISUEL', 'LIMITED ADMISSION · VISUAL SUPPORT', 'BEGRENZTE ZULASSUNG · VISUELLE UNTERSTÜTZUNG'), text('Limiter l’usage à la lecture et à la navigation, sans promotion en registre maître.', 'Limit use to reading and navigation, without promotion to a master register.', 'Nutzung auf Lesen und Navigation begrenzen, ohne Beförderung zum Masterregister.')],
  ['SRC-08', 'V1', 'DEFER', text('AJOURNER', 'DEFER', 'VERTAGEN'), text('Attendre le gel de l’édition datée et de ses métadonnées de livraison dans la GED.', 'Wait for the dated edition and its delivery metadata to be frozen in the DMS.', 'Auf die Fixierung der datierten Ausgabe und ihrer Liefermetadaten in der GED warten.')]
];

const COPY = {
  FR: {
    eyebrow: 'PAQUET DÉCISIONNEL INDIVIDUEL CONFIRMÉ · PGM-CON-DEC-001 · V1.0 · 02-09-2026',
    title: 'Huit décisions prononcées, zéro preuve de réalisation acceptée',
    intro: 'Après confirmation du paquet, Cheikh a prononcé les huit décisions en une fois : trois admissions à usage documentaire limité et cinq ajournements. Les conditions de chaque référence restent applicables.',
    counters: [['8/8', 'décisions documentaires prononcées'], ['3', 'admissions à usage limité'], ['5', 'références ajournées'], ['0', 'preuves de réalisation acceptées']],
    labels: { lane: 'Voie confirmée', outcome: 'Décision prononcée', condition: 'Condition ou limite', status: 'PRONONCÉE' },
    guardrails: 'Portée du paquet confirmé',
    rules: ['Les huit décisions sont prononcées ; aucune nouvelle confirmation de ce lot n’est attendue.', 'Une admission limitée autorise seulement l’usage documentaire indiqué, jamais une preuve de réalisation.', 'Un ajournement maintient la référence hors preuve tant que sa condition reste ouverte.', 'Aucune décision ne modifie le taux de progression ni ne promeut une référence en registre maître.'],
    recordLabels: { eyebrow: 'Décision gouvernée consignée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Trace de confirmation', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-016', version: 'V1.0', status: 'Paquet de propositions confirmé', author: 'Cheikh Ndiaye', date: '02-09-2026', decision: 'PGM-CON-DEC-001 V0.1 est confirmé et promu en V1.0 comme paquet des huit propositions : trois admissions limitées et cinq ajournements.', evidence: 'Message de Cheikh du 02-09-2026 : « alors je confirme PGM-CON-DEC-001 V0.1 ». Portée reprise de la proposition présentée, sans extension des autorisations.', limit: '0/8 décision documentaire prononcée, zéro preuve acceptée. Aucune promotion de référence, progression, ouverture de CON-01, CON-05, REF-02 ou L2.' },
    appliedRecord: { id: 'PGM-DEC-017', version: 'V1.0', status: 'Huit décisions documentaires prononcées', author: 'Cheikh Ndiaye', date: '02-09-2026', decision: 'SRC-02 admise au cadrage ; SRC-04 à la méthode ; SRC-07 au support visuel. SRC-01, SRC-03, SRC-05, SRC-06 et SRC-08 ajournées selon leurs conditions.', evidence: `Décision explicite de Cheikh : « ${PRONOUNCEMENT} »`, limit: 'Usages documentaires limités uniquement. Zéro preuve de réalisation acceptée, aucune progression calculée, aucun accès ou collecte supplémentaire, aucune ouverture de CON-01, CON-05, REF-02 ou L2.' },
    history: 'Historique : confirmation préalable du paquet',
    next: 'Suivi des réserves, sans nouvelle boucle de confirmation',
    confirmation: 'Les cinq références ajournées restent en attente de leurs conditions documentaires. Une révision ne se justifie qu’en présence d’un élément nouveau pertinent ou d’une correction explicite ; aucun accès, aucune collecte ni ouverture de périmètre supplémentaire ne découle de ces décisions.',
    boundary: 'Une admission documentaire limitée ne prouve pas une réalisation institutionnelle. Aucun taux de progression ne change ; CON-01, CON-05, REF-02 et L2 restent fermés.'
  },
  EN: {
    eyebrow: 'CONFIRMED INDIVIDUAL DECISION PACKAGE · PGM-CON-DEC-001 · V1.0 · 2 SEP 2026',
    title: 'Eight decisions pronounced, zero achievement evidence accepted',
    intro: 'After confirming the package, Cheikh pronounced all eight decisions together: three limited documentary-use admissions and five deferrals. Each reference retains its conditions.',
    counters: [['8/8', 'documentary decisions pronounced'], ['3', 'limited-use admissions'], ['5', 'references deferred'], ['0', 'achievement evidence accepted']],
    labels: { lane: 'Confirmed lane', outcome: 'Pronounced decision', condition: 'Condition or limit', status: 'PRONOUNCED' },
    guardrails: 'Scope of the confirmed package',
    rules: ['All eight decisions are pronounced; this batch requires no further confirmation.', 'A limited admission authorises only the stated documentary use, never achievement evidence.', 'A deferral keeps the reference outside evidence while its condition remains open.', 'No decision changes the progress rate or promotes a reference to a master register.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Confirmation trace', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-016', version: 'V1.0', status: 'Proposal package confirmed', author: 'Cheikh Ndiaye', date: '2 Sep 2026', decision: 'PGM-CON-DEC-001 V0.1 is confirmed and promoted to V1.0 as the package of eight proposals: three limited admissions and five deferrals.', evidence: 'Cheikh’s message of 2 Sep 2026, retained in French: “alors je confirme PGM-CON-DEC-001 V0.1”. Scope follows the presented proposal without extending authorisations.', limit: '0/8 documentary decisions pronounced, zero evidence accepted. No reference promotion, progress, opening of CON-01, CON-05, REF-02 or L2.' },
    appliedRecord: { id: 'PGM-DEC-017', version: 'V1.0', status: 'Eight documentary decisions pronounced', author: 'Cheikh Ndiaye', date: '2 Sep 2026', decision: 'SRC-02 admitted for framing; SRC-04 for method; SRC-07 for visual support. SRC-01, SRC-03, SRC-05, SRC-06 and SRC-08 deferred under their conditions.', evidence: `Cheikh’s explicit decision, retained in French: “${PRONOUNCEMENT}”`, limit: 'Limited documentary uses only. Zero achievement evidence accepted, no progress calculated, no additional access or collection, no opening of CON-01, CON-05, REF-02 or L2.' },
    history: 'History: prior package confirmation',
    next: 'Track reservations without another confirmation loop',
    confirmation: 'The five deferred references await their documentary conditions. Review is warranted only for relevant new information or an explicit correction; these decisions grant no additional access, collection or scope opening.',
    boundary: 'Limited documentary admission does not prove institutional achievement. Progress remains unchanged; CON-01, CON-05, REF-02 and L2 remain closed.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES INDIVIDUELLES ENTSCHEIDUNGSPAKET · PGM-CON-DEC-001 · V1.0 · 02.09.2026',
    title: 'Acht Entscheide ausgesprochen, null Umsetzungsnachweise angenommen',
    intro: 'Nach Bestätigung des Pakets hat Cheikh die acht Entscheide gebündelt ausgesprochen: drei begrenzte Dokumentenzulassungen und fünf Vertagungen. Die Bedingungen jeder Referenz bleiben bestehen.',
    counters: [['8/8', 'Dokumentenentscheide ausgesprochen'], ['3', 'begrenzte Zulassungen'], ['5', 'Referenzen vertagt'], ['0', 'Umsetzungsnachweise angenommen']],
    labels: { lane: 'Bestätigter Weg', outcome: 'Ausgesprochener Entscheid', condition: 'Bedingung oder Grenze', status: 'AUSGESPROCHEN' },
    guardrails: 'Umfang des bestätigten Pakets',
    rules: ['Alle acht Entscheide sind ausgesprochen; dieser Satz benötigt keine erneute Bestätigung.', 'Eine begrenzte Zulassung erlaubt nur die angegebene Dokumentennutzung, niemals einen Umsetzungsnachweis.', 'Eine Vertagung hält die Referenz außerhalb der Nachweise, solange ihre Bedingung offen ist.', 'Kein Entscheid ändert den Fortschrittswert oder befördert eine Referenz zum Masterregister.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Bestätigungsnachweis', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-016', version: 'V1.0', status: 'Vorschlagspaket bestätigt', author: 'Cheikh Ndiaye', date: '02.09.2026', decision: 'PGM-CON-DEC-001 V0.1 wird als Paket der acht Vorschläge bestätigt und zu V1.0 befördert: drei begrenzte Zulassungen und fünf Vertagungen.', evidence: 'Nachricht von Cheikh vom 02.09.2026 im französischen Original: „alors je confirme PGM-CON-DEC-001 V0.1“. Der Umfang folgt dem vorgelegten Vorschlag, ohne Genehmigungen auszuweiten.', limit: '0/8 Dokumentenentscheide ausgesprochen, null Nachweise angenommen. Keine Beförderung von Referenzen, kein Fortschritt, keine Öffnung von CON-01, CON-05, REF-02 oder L2.' },
    appliedRecord: { id: 'PGM-DEC-017', version: 'V1.0', status: 'Acht Dokumentenentscheide ausgesprochen', author: 'Cheikh Ndiaye', date: '02.09.2026', decision: 'SRC-02 für den Rahmen zugelassen; SRC-04 für die Methode; SRC-07 zur visuellen Unterstützung. SRC-01, SRC-03, SRC-05, SRC-06 und SRC-08 unter ihren Bedingungen vertagt.', evidence: `Ausdrücklicher Entscheid von Cheikh im französischen Original: „${PRONOUNCEMENT}“`, limit: 'Nur begrenzte Dokumentennutzung. Null angenommene Umsetzungsnachweise, kein berechneter Fortschritt, kein zusätzlicher Zugriff oder zusätzliche Sammlung, keine Öffnung von CON-01, CON-05, REF-02 oder L2.' },
    history: 'Historie: vorherige Paketbestätigung',
    next: 'Vorbehalte verfolgen, ohne erneute Bestätigungsschleife',
    confirmation: 'Die fünf vertagten Referenzen warten auf ihre Dokumentenbedingungen. Eine erneute Prüfung ist nur bei relevanten neuen Informationen oder ausdrücklicher Korrektur begründet; diese Entscheide gewähren keinen zusätzlichen Zugriff, keine Sammlung und keine Erweiterung des Umfangs.',
    boundary: 'Begrenzte Dokumentenzulassung beweist keine institutionelle Umsetzung. Der Fortschritt bleibt unverändert; CON-01, CON-05, REF-02 und L2 bleiben geschlossen.'
  }
};

const InstitutionalProgramDesignEvidenceDecisionPackage = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-decision-package" data-testid="institutional-program-design-evidence-decision-package" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Scale className="shrink-0 text-cyan-300" size={28} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 3 ? 'text-slate-200' : index === 1 ? 'text-emerald-300' : index === 2 ? 'text-amber-300' : 'text-cyan-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{DECISIONS.map(([id, lane, type, outcome, condition]) => { const Icon = type === 'LIMITED' ? FileCheck2 : PauseCircle; const accent = type === 'LIMITED' ? 'text-emerald-300' : 'text-amber-300'; return <article key={id} data-testid="institutional-program-design-evidence-decision-row" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950/30 ${accent}`}><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-cyan-300">{id}</p><p className="mt-1 text-xs text-slate-400">{t.labels.lane} · {lane}</p></div></div><span className="shrink-0 rounded-md border border-amber-800 bg-amber-950/30 px-2 py-1 text-xs font-semibold text-amber-200">{t.labels.status}</span></div><div className="mt-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.outcome}</p><p data-testid={`institutional-program-design-evidence-decision-${type.toLowerCase()}`} className={`mt-1 text-sm font-semibold ${accent}`}>{local(outcome)}</p></div><div className="mt-3"><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.condition}</p><p className="mt-1 text-xs leading-5 text-slate-300">{local(condition)}</p></div></article>; })}</div>

      <div className="mt-4 rounded-md border border-cyan-900/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.guardrails}</p><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.rules.map(rule => <li key={rule} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" />{rule}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.appliedRecord} />
      <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold text-slate-300">{t.history}</summary><GovernedDecisionRecord labels={t.recordLabels} record={t.record} /></details>
      <div className="mt-4 rounded-md border border-blue-800/70 bg-blue-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}<LockKeyhole size={15} aria-hidden="true" /></p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceDecisionPackage;
