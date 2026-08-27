import React from 'react';
import { AlertTriangle, Layers3, LockKeyhole, Route } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'ORDONNANCEMENT CANDIDAT DES AUTORISATIONS · REF-01-G1-PRI-002 · V0.1 · 28-08-2026',
    title: 'Commencer par le documentaire, réserver la technique et garder L2 fermée',
    intro: 'Cette proposition ordonne les six dossiers confirmés selon dépendances, exposition et réversibilité. Elle prépare les futures décisions sans sélectionner de titulaire, ouvrir un environnement ni autoriser une exécution.',
    counters: [['Vagues proposées', '3', 'Documentaire, synthétique, décision'], ['Dossiers ordonnés', '6/6', 'Aucun dossier omis'], ['Autorisations accordées', '0', 'Proposition seulement'], ['Exécutions lancées', '0', 'G1 reste ouverte']],
    labels: { objective: 'Objectif de la vague', files: 'Ordre proposé', entry: 'Condition d’entrée', exit: 'Résultat requis avant la suite', state: 'NON AUTORISÉE' },
    waves: [
      ['Vague 1 · Gouvernance documentaire', 'Qualifier d’abord les règles et responsabilités sans dépendre d’un environnement technique.', ['1. AUT-02-03 · Conservation et GED', '2. AUT-02-02 · Rôles et moindre privilège'], 'Autorités, durées, exceptions, matrice de rôles, cas synthétiques et responsables sont confirmés dans des dossiers séparés.', 'Deux décisions d’acceptation documentent les écarts ; aucun document, droit ou identité réelle n’est modifié.'],
      ['Vague 2 · Préparation et essais synthétiques isolés', 'Traiter les dépendances techniques après stabilisation des règles documentaires.', ['3. AUT-02-01 · PostgreSQL et restauration', '4. AUT-02-04 · Migration et retour arrière', '5. AUT-02-05 · Outbox, supervision et reprise'], 'Chaque dossier possède une autorisation unitaire, un environnement isolé, des données synthétiques, des titulaires contrôlés, des critères d’arrêt et un dépôt GED.', 'Trois résultats contrôlés et acceptés séparément ; aucun système, compte, secret, canal ou donnée de production n’est utilisé.'],
      ['Vague 3 · Porte de décision', 'Examiner l’ouverture éventuelle de L2 uniquement après les cinq preuves acceptées.', ['6. AUT-02-06 · Porte de décision L2'], 'EVD-002 complet, cinq acceptations distinctes, écarts et risques clos ou réservés, avis des fonctions et projet de décision.', 'Cheikh reçoit un arbitrage séparé. Sans décision explicite, G1 reste ouverte et L2 fermée.']
    ],
    rationaleTitle: 'Règles de passage entre les vagues',
    rationale: ['Aucune vague ne s’ouvre automatiquement après la précédente.', 'Une autorisation couvre un seul dossier, un seul périmètre et une durée définie.', 'Un résultat technique ne devient une preuve qu’après contrôle puis acceptation humaine séparée.', 'Toute réserve bloquante arrête la progression et conserve les circuits suivants fermés.'],
    next: 'Prochain arbitrage humain unique : confirmer ou amender REF-01-G1-PRI-002 V0.1. Une confirmation validera uniquement l’ordre proposé, sans autoriser la vague 1.',
    boundary: 'État courant : 0 autorisation, 0 collecte, 0 test et 0 preuve acceptée. La priorité proposée ne crée aucun droit ni progression automatique.'
  },
  EN: {
    eyebrow: 'CANDIDATE AUTHORISATION ORDER · REF-01-G1-PRI-002 · V0.1 · 28 AUG 2026',
    title: 'Start with documentary controls, reserve technical work and keep L2 closed',
    intro: 'This proposal orders the six confirmed files by dependency, exposure and reversibility. It prepares future decisions without selecting a holder, opening an environment or authorising execution.',
    counters: [['Proposed waves', '3', 'Documentary, synthetic, decision'], ['Ordered files', '6/6', 'No file omitted'], ['Granted authorisations', '0', 'Proposal only'], ['Started executions', '0', 'G1 remains open']],
    labels: { objective: 'Wave objective', files: 'Proposed order', entry: 'Entry condition', exit: 'Required outcome before continuing', state: 'NOT AUTHORISED' },
    waves: [
      ['Wave 1 · Documentary governance', 'Qualify rules and responsibilities first without depending on a technical environment.', ['1. AUT-02-03 · Retention and DMS', '2. AUT-02-02 · Roles and least privilege'], 'Authorities, periods, exceptions, role matrix, synthetic cases and owners are confirmed in separate files.', 'Two acceptance decisions document gaps; no record, right or real identity is changed.'],
      ['Wave 2 · Isolated synthetic preparation and tests', 'Handle technical dependencies after documentary rules are stable.', ['3. AUT-02-01 · PostgreSQL and restoration', '4. AUT-02-04 · Migration and rollback', '5. AUT-02-05 · Outbox, monitoring and recovery'], 'Each file has an individual authorisation, isolated environment, synthetic data, controlled holders, stop criteria and DMS deposit.', 'Three separately controlled and accepted outcomes; no production system, account, secret, channel or data is used.'],
      ['Wave 3 · Decision gate', 'Review a possible L2 opening only after acceptance of all five evidence items.', ['6. AUT-02-06 · L2 decision gate'], 'Complete EVD-002, five distinct acceptances, closed or reserved gaps and risks, function opinions and a draft decision.', 'Cheikh receives a separate decision. Without an explicit decision, G1 remains open and L2 closed.']
    ],
    rationaleTitle: 'Rules for moving between waves',
    rationale: ['No wave opens automatically after the previous one.', 'One authorisation covers one file, one scope and a defined period.', 'A technical outcome becomes evidence only after control and separate human acceptance.', 'Any blocking reservation stops progress and keeps following routes closed.'],
    next: 'Next single human decision: confirm or amend REF-01-G1-PRI-002 V0.1. Confirmation will validate only the proposed order and will not authorise Wave 1.',
    boundary: 'Current state: 0 authorisations, 0 collections, 0 tests and 0 accepted evidence. The proposed priority creates no right or automatic progress.'
  },
  DE: {
    eyebrow: 'KANDIDATENREIHENFOLGE DER AUTORISIERUNGEN · REF-01-G1-PRI-002 · V0.1 · 28.08.2026',
    title: 'Mit Dokumentenkontrollen beginnen, Technik zurückstellen und L2 geschlossen halten',
    intro: 'Dieser Vorschlag ordnet die sechs bestätigten Akten nach Abhängigkeit, Exposition und Reversibilität. Er bereitet künftige Entscheide vor, ohne Träger zu wählen, eine Umgebung zu öffnen oder eine Ausführung zu erlauben.',
    counters: [['Vorgeschlagene Wellen', '3', 'Dokumentarisch, synthetisch, Entscheid'], ['Geordnete Akten', '6/6', 'Keine Akte fehlt'], ['Erteilte Autorisierungen', '0', 'Nur Vorschlag'], ['Gestartete Ausführungen', '0', 'G1 bleibt offen']],
    labels: { objective: 'Ziel der Welle', files: 'Vorgeschlagene Reihenfolge', entry: 'Eintrittsbedingung', exit: 'Erforderliches Ergebnis vor Fortsetzung', state: 'NICHT AUTORISIERT' },
    waves: [
      ['Welle 1 · Dokumentarische Governance', 'Regeln und Verantwortungen zuerst ohne technische Umgebung qualifizieren.', ['1. AUT-02-03 · Aufbewahrung und DMS', '2. AUT-02-02 · Rollen und geringste Berechtigung'], 'Autoritäten, Fristen, Ausnahmen, Rollenmatrix, synthetische Fälle und Verantwortungen sind in getrennten Akten bestätigt.', 'Zwei Annahmeentscheide dokumentieren Abweichungen; kein Dokument, Recht und keine reale Identität wird geändert.'],
      ['Welle 2 · Isolierte synthetische Vorbereitung und Tests', 'Technische Abhängigkeiten nach Stabilisierung der dokumentarischen Regeln behandeln.', ['3. AUT-02-01 · PostgreSQL und Wiederherstellung', '4. AUT-02-04 · Migration und Rollback', '5. AUT-02-05 · Outbox, Überwachung und Wiederanlauf'], 'Jede Akte besitzt eine Einzelautorisierung, isolierte Umgebung, synthetische Daten, kontrollierte Träger, Stoppkriterien und DMS-Ablage.', 'Drei getrennt kontrollierte und angenommene Ergebnisse; kein Produktionssystem, Account, Geheimnis, Kanal und keine Produktionsdaten werden verwendet.'],
      ['Welle 3 · Entscheidtor', 'Eine mögliche L2-Öffnung erst nach Annahme aller fünf Nachweise prüfen.', ['6. AUT-02-06 · L2-Entscheidtor'], 'Vollständiges EVD-002, fünf getrennte Annahmen, geschlossene oder reservierte Lücken und Risiken, Funktionsstellungnahmen und Entscheidungsentwurf.', 'Cheikh erhält einen getrennten Entscheid. Ohne ausdrücklichen Entscheid bleibt G1 offen und L2 geschlossen.']
    ],
    rationaleTitle: 'Regeln für den Übergang zwischen Wellen',
    rationale: ['Keine Welle öffnet sich automatisch nach der vorherigen.', 'Eine Autorisierung deckt eine Akte, einen Umfang und einen definierten Zeitraum ab.', 'Ein technisches Ergebnis wird erst nach Kontrolle und getrennter menschlicher Annahme zum Nachweis.', 'Jeder blockierende Vorbehalt stoppt den Fortschritt und hält die folgenden Wege geschlossen.'],
    next: 'Nächster einzelner menschlicher Entscheid: REF-01-G1-PRI-002 V0.1 bestätigen oder ändern. Die Bestätigung validiert nur die Reihenfolge und autorisiert Welle 1 nicht.',
    boundary: 'Aktueller Stand: 0 Autorisierungen, 0 Sammlungen, 0 Tests und 0 angenommene Nachweise. Die vorgeschlagene Priorität schafft kein Recht und keinen automatischen Fortschritt.'
  }
};

const InstitutionalPeopleTeamsGateG1ExecutionAuthorisationPriority = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-execution-authorisation-priority" className="m3s-ref01-g1-execution-authorisation-priority mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-execution-authorisation-priority-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-execution-authorisation-priority-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Route className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.waves.map(([title, objective, files, entry, exit]) => <article key={title} data-testid="ref01-g1-execution-authorisation-wave" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-amber-200">{title}</h6><span className="w-fit rounded-md border border-rose-700/70 bg-rose-950/25 px-2 py-1 text-[10px] font-semibold text-rose-100">{t.labels.state}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-amber-300">{t.labels.objective}</dt><dd className="mt-1 text-slate-300">{objective}</dd></div><div><dt className="font-semibold text-sky-300">{t.labels.files}</dt><dd className="mt-1 space-y-1 text-slate-300">{files.map(file => <span key={file} className="block">{file}</span>)}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.entry}</dt><dd className="mt-1 text-slate-300">{entry}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.exit}</dt><dd className="mt-1 text-slate-300">{exit}</dd></div></dl></article>)}</div>
      <section className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-4" aria-labelledby="ref01-g1-execution-authorisation-priority-rules-title"><div className="flex items-center gap-2"><Layers3 className="text-sky-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-execution-authorisation-priority-rules-title" className="text-sm font-semibold text-sky-100">{t.rationaleTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.rationale.map(item => <li key={item} data-testid="ref01-g1-execution-authorisation-priority-rule" className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-sky-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExecutionAuthorisationPriority;
