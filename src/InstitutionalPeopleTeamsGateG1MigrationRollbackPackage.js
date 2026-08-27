import React from 'react';
import { AlertTriangle, FileClock, GitPullRequestArrow, LockKeyhole, RotateCcw, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'SUPPORT CONFIRMÉ · LOT 4 · REF-01-G1-PKG-04-001 · V1.0 · 27-08-2026',
    title: 'Procédure migration et retour arrière confirmée sans environnement réel',
    intro: 'Cette procédure confirmée ordonne prérequis, autorités, séquence isolée et retour arrière sans choisir d’environnement, fixer de commande ni appliquer une migration.',
    counters: [['Dossier confirmé', '1', 'PKG-04-001 V1.0'], ['Axes contrôlés', '4', 'Décision documentaire'], ['Environnements touchés', '0', 'Aucun accès'], ['Actions réelles', '0', 'Aucune migration']],
    labels: { purpose: 'Finalité', checks: 'Points à documenter', outputs: 'Livrables candidats', unknowns: 'Valeurs à qualifier' },
    areas: [
      { title: 'Périmètre et prérequis', icon: FileClock, purpose: 'Définir une migration bornée avant tout environnement partagé.', checks: ['Source, cible et objets concernés', 'Dépendances PKG-01 et PKG-03', 'Jeu strictement synthétique et isolé', 'Critères d’entrée et d’arrêt'], outputs: ['Mandat de migration candidat', 'Checklist de prérequis'], unknowns: 'Source, cible, tables, endpoints, volumes, fenêtre et environnement.' },
      { title: 'Autorités et approbations', icon: ShieldCheck, purpose: 'Séparer préparation, contrôle, autorisation et exécution.', checks: ['Autorité métier et garde technique', 'Double approbation avant chaque étape', 'Séparation des responsabilités', 'Règle d’urgence et journal de décision'], outputs: ['Matrice d’autorité candidate', 'Chemin d’approbation'], unknowns: 'Titulaires, délégations, seuils, suppléances et escalades.' },
      { title: 'Séquence de migration isolée', icon: GitPullRequestArrow, purpose: 'Rendre la séquence vérifiable sans l’exécuter.', checks: ['État initial et empreintes attendues', 'Ordre des transformations', 'Contrôles de qualité et de complétude', 'Critères de réussite et de suspension'], outputs: ['Runbook candidat', 'Grille de contrôle synthétique'], unknowns: 'Commandes, outils, durée, tolérances, jeux de contrôle et preuves.' },
      { title: 'Retour arrière et preuve', icon: RotateCcw, purpose: 'Préparer l’arrêt et le retour à l’état initial avant tout changement.', checks: ['Point de retour et sauvegarde vérifiable', 'Déclencheurs de rollback', 'Contrôles après retour arrière', 'Archivage des décisions et anomalies'], outputs: ['Plan de rollback candidat', 'Fiche de résultat et anomalies'], unknowns: 'RPO/RTO applicables, seuils, responsables, preuve de sauvegarde et décision finale.' }
    ],
    status: 'CONFIRMÉ · Une procédure documentaire gouvernée ; zéro environnement, zéro table, zéro endpoint, zéro donnée réelle et zéro migration.',
    next: 'Décision consignée ci-dessous : REF-01-DEC-032 confirme REF-01-G1-PKG-04-001 V1.0 sans autoriser de migration.',
    boundary: 'Arrêt obligatoire avant accès à un environnement, commande, sauvegarde réelle, table, endpoint, donnée, migration, rollback ou changement de démarrage.'
  },
  EN: {
    eyebrow: 'CONFIRMED SUPPORT · PACKAGE 4 · REF-01-G1-PKG-04-001 · V1.0 · 27 AUG 2026',
    title: 'Confirmed migration and rollback procedure without a real environment',
    intro: 'This confirmed procedure orders prerequisites, authorities, isolated sequence and rollback without selecting an environment, setting commands or applying a migration.',
    counters: [['Confirmed file', '1', 'PKG-04-001 V1.0'], ['Controlled areas', '4', 'Documentary decision'], ['Touched environments', '0', 'No access'], ['Real actions', '0', 'No migration']],
    labels: { purpose: 'Purpose', checks: 'Points to document', outputs: 'Candidate outputs', unknowns: 'Values to qualify' },
    areas: [
      { title: 'Scope and prerequisites', icon: FileClock, purpose: 'Define a bounded migration before any shared environment.', checks: ['Relevant source, target and objects', 'PKG-01 and PKG-03 dependencies', 'Strictly synthetic isolated dataset', 'Entry and stop criteria'], outputs: ['Candidate migration mandate', 'Prerequisite checklist'], unknowns: 'Source, target, tables, endpoints, volumes, window and environment.' },
      { title: 'Authorities and approvals', icon: ShieldCheck, purpose: 'Separate preparation, control, authorisation and execution.', checks: ['Business authority and technical custody', 'Dual approval before every stage', 'Separation of duties', 'Emergency rule and decision log'], outputs: ['Candidate authority matrix', 'Approval path'], unknowns: 'Holders, delegations, thresholds, substitutes and escalations.' },
      { title: 'Isolated migration sequence', icon: GitPullRequestArrow, purpose: 'Make the sequence verifiable without executing it.', checks: ['Initial state and expected fingerprints', 'Transformation order', 'Quality and completeness controls', 'Success and suspension criteria'], outputs: ['Candidate runbook', 'Synthetic control grid'], unknowns: 'Commands, tools, duration, tolerances, control datasets and evidence.' },
      { title: 'Rollback and evidence', icon: RotateCcw, purpose: 'Prepare stop and return to the initial state before any change.', checks: ['Return point and verifiable backup', 'Rollback triggers', 'Controls after rollback', 'Archiving decisions and anomalies'], outputs: ['Candidate rollback plan', 'Result and anomaly sheet'], unknowns: 'Applicable RPO/RTO, thresholds, owners, backup evidence and final decision.' }
    ],
    status: 'CONFIRMED · One governed documentary procedure; zero environments, tables, endpoints, real data or migrations.',
    next: 'Decision recorded below: REF-01-DEC-032 confirms REF-01-G1-PKG-04-001 V1.0 without authorising migration.',
    boundary: 'Mandatory stop before environment access, commands, real backup, table, endpoint, data, migration, rollback or startup change.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER TRÄGER · PAKET 4 · REF-01-G1-PKG-04-001 · V1.0 · 27.08.2026',
    title: 'Bestätigtes Migration- und Rollback-Verfahren ohne reale Umgebung',
    intro: 'Dieses bestätigte Verfahren ordnet Voraussetzungen, Autoritäten, isolierte Sequenz und Rollback, ohne eine Umgebung zu wählen, Befehle festzulegen oder eine Migration anzuwenden.',
    counters: [['Bestätigte Akte', '1', 'PKG-04-001 V1.0'], ['Kontrollbereiche', '4', 'Dokumentarischer Entscheid'], ['Berührte Umgebungen', '0', 'Kein Zugriff'], ['Reale Aktionen', '0', 'Keine Migration']],
    labels: { purpose: 'Zweck', checks: 'Zu dokumentierende Punkte', outputs: 'Kandidatenergebnisse', unknowns: 'Zu qualifizierende Werte' },
    areas: [
      { title: 'Umfang und Voraussetzungen', icon: FileClock, purpose: 'Eine begrenzte Migration vor jeder gemeinsamen Umgebung definieren.', checks: ['Betroffene Quelle, Ziel und Objekte', 'Abhängigkeiten PKG-01 und PKG-03', 'Streng synthetischer isolierter Datensatz', 'Eintritts- und Stoppkriterien'], outputs: ['Kandidaten-Migrationsmandat', 'Voraussetzungscheckliste'], unknowns: 'Quelle, Ziel, Tabellen, Endpunkte, Volumen, Fenster und Umgebung.' },
      { title: 'Autoritäten und Genehmigungen', icon: ShieldCheck, purpose: 'Vorbereitung, Kontrolle, Autorisierung und Ausführung trennen.', checks: ['Fachautorität und technische Obhut', 'Doppelgenehmigung vor jeder Stufe', 'Funktionstrennung', 'Notfallregel und Entscheidjournal'], outputs: ['Kandidaten-Autoritätsmatrix', 'Genehmigungsweg'], unknowns: 'Inhaber, Delegationen, Schwellen, Stellvertretungen und Eskalationen.' },
      { title: 'Isolierte Migrationssequenz', icon: GitPullRequestArrow, purpose: 'Die Sequenz ohne Ausführung prüfbar machen.', checks: ['Anfangszustand und erwartete Fingerabdrücke', 'Reihenfolge der Transformationen', 'Qualitäts- und Vollständigkeitskontrollen', 'Erfolgs- und Aussetzungskriterien'], outputs: ['Kandidaten-Runbook', 'Synthetisches Kontrollraster'], unknowns: 'Befehle, Werkzeuge, Dauer, Toleranzen, Kontrolldatensätze und Nachweise.' },
      { title: 'Rollback und Nachweis', icon: RotateCcw, purpose: 'Stopp und Rückkehr zum Ausgangszustand vor jeder Änderung vorbereiten.', checks: ['Rückkehrpunkt und prüfbare Sicherung', 'Rollback-Auslöser', 'Kontrollen nach dem Rollback', 'Archivierung von Entscheiden und Abweichungen'], outputs: ['Kandidaten-Rollbackplan', 'Ergebnis- und Abweichungsblatt'], unknowns: 'Anwendbare RPO/RTO, Schwellen, Verantwortliche, Sicherungsnachweis und Schlussentscheid.' }
    ],
    status: 'BESTÄTIGT · Ein gesteuertes Dokumentverfahren; null Umgebungen, Tabellen, Endpunkte, Echtdaten oder Migrationen.',
    next: 'Nachfolgend erfasster Entscheid: REF-01-DEC-032 bestätigt REF-01-G1-PKG-04-001 V1.0 ohne Migrationsfreigabe.',
    boundary: 'Pflichtstopp vor Umgebungszugriff, Befehl, realer Sicherung, Tabelle, Endpunkt, Daten, Migration, Rollback oder Startänderung.'
  }
};

const InstitutionalPeopleTeamsGateG1MigrationRollbackPackage = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-migration-rollback-package" className="m3s-ref01-g1-migration-rollback-package mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-migration-rollback-package-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-migration-rollback-package-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><GitPullRequestArrow className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <GitPullRequestArrow className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.areas.map(area => { const Icon = area.icon; return <article key={area.title} data-testid="ref01-g1-migration-rollback-area" className="m3s-raised p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{area.title}</h6></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.purpose}</dt><dd className="mt-1 text-slate-300">{area.purpose}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.checks}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.checks.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.outputs}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.outputs.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-amber-200">{t.labels.unknowns}</dt><dd className="mt-1 text-slate-300">{area.unknowns}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1MigrationRollbackPackage;
