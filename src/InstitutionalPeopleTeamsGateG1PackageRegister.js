import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, FileStack, KeyRound, LockKeyhole, RadioTower, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE CANDIDAT DE PRÉPARATION G1 · REF-01-G1-PKG-001 · V0.1 · 27-08-2026',
    title: 'Préparer les cinq lots sans action réelle',
    intro: 'Ce registre traduit PLN-001 V1.0 en cinq fiches de préparation. Il attribue des fonctions candidates, jamais des personnes, et maintient chaque lot arrêté avant la collecte, le test ou le changement réel.',
    counters: [['Fiches candidates', '5', 'Une par lot'], ['Responsables nommés', '0', 'Fonctions seulement'], ['Preuves réelles', '0', 'Aucune reçue'], ['Actions réelles', '0', 'Arrêt obligatoire']],
    labels: { functions: 'Fonctions candidates', dependencies: 'Dépendances', evidence: 'Preuves attendues', stop: 'Condition d’arrêt' },
    items: [
      ['PKG-01 · Rôles et visibilité', 'PLN-01', 'IT & Support · Gouvernance · Ressources humaines', 'Contrat RH-001, modèle Team/Agent et principes de moindre privilège confirmés.', 'Matrice des rôles, séparation des responsabilités, visibilité par ligne et scénarios synthétiques.', 'Arrêt avant création ou modification d’un rôle, compte, accès ou délégation réelle.'],
      ['PKG-02 · Conservation et GED', 'PLN-02', 'Administration · LEGAL · Ressources humaines · GED', 'Classification C2/C3/C4, catégories de pièces, autorités et exceptions à qualifier.', 'Matrice de conservation, gel, suppression, déclassement, exceptions et preuve GED.', 'Arrêt avant suppression, reclassement, déplacement ou altération d’une pièce réelle.'],
      ['PKG-03 · PostgreSQL et reprise', 'PLN-03', 'IT & Support · Gouvernance', 'Autorité de comparaison, périmètre isolé et critères RPO/RTO à confirmer.', 'Dossier comparatif des services, sauvegardes, restaurations, sécurité et preuves exigibles.', 'Arrêt avant contact fournisseur, compte, achat, secret ou test sur production.'],
      ['PKG-04 · Migration et retour arrière', 'PLN-04', 'IT & Support · Gouvernance · Administration', 'PKG-01 et PKG-03 préparés ; autorités et scénario synthétique identifiés.', 'Procédure candidate de migration isolée, double approbation, sauvegarde vérifiée et rollback.', 'Arrêt avant table, endpoint, donnée réelle, migration ou changement de démarrage.'],
      ['PKG-05 · Outbox et supervision', 'PLN-05', 'IT & Support · Gouvernance', 'PKG-01 préparé ; responsabilité, seuils et règle d’escalade à confirmer.', 'Spécification candidate du worker, métriques, alertes, quarantaine, reprise et preuves.', 'Arrêt avant worker, notification, alerte, surveillance ou automatisation réelle.']
    ],
    gate: 'PORTE FINALE · Les cinq fiches restent candidates. Leur confirmation ne remplacera ni l’autorisation propre à chaque action réelle, ni la réévaluation finale des six conditions G1.',
    next: 'Prochain arbitrage humain unique : confirmer ou amender REF-01-G1-PKG-001 V0.1.',
    boundary: 'Aucun responsable nominatif, calendrier, budget, fournisseur, environnement, droit, donnée, preuve réelle, source maîtresse, progression ou autorisation L2 n’est créé.'
  },
  EN: {
    eyebrow: 'CANDIDATE G1 PREPARATION REGISTER · REF-01-G1-PKG-001 · V0.1 · 27 AUG 2026',
    title: 'Prepare the five packages without real action',
    intro: 'This register turns PLN-001 V1.0 into five preparation sheets. It assigns candidate functions, never people, and stops each package before any real collection, test or change.',
    counters: [['Candidate sheets', '5', 'One per package'], ['Named owners', '0', 'Functions only'], ['Real evidence', '0', 'None received'], ['Real actions', '0', 'Mandatory stop']],
    labels: { functions: 'Candidate functions', dependencies: 'Dependencies', evidence: 'Expected evidence', stop: 'Stop condition' },
    items: [
      ['PKG-01 · Roles and visibility', 'PLN-01', 'IT & Support · Governance · Human Resources', 'RH-001 contract, Team/Agent model and confirmed least-privilege principles.', 'Role matrix, separation of duties, row visibility and synthetic scenarios.', 'Stop before creating or changing any real role, account, access or delegation.'],
      ['PKG-02 · Retention and DMS', 'PLN-02', 'Administration · LEGAL · Human Resources · DMS', 'C2/C3/C4 classification, record categories, authorities and exceptions to qualify.', 'Retention, hold, deletion, declassification, exception and DMS-evidence matrix.', 'Stop before deleting, reclassifying, moving or changing any real record.'],
      ['PKG-03 · PostgreSQL and recovery', 'PLN-03', 'IT & Support · Governance', 'Comparison authority, isolated scope and RPO/RTO criteria to confirm.', 'Comparison file for services, backups, restorations, security and required evidence.', 'Stop before provider contact, account, purchase, secret or production test.'],
      ['PKG-04 · Migration and rollback', 'PLN-04', 'IT & Support · Governance · Administration', 'PKG-01 and PKG-03 prepared; authorities and synthetic scenario identified.', 'Candidate isolated-migration procedure, dual approval, verified backup and rollback.', 'Stop before any table, endpoint, real data, migration or startup change.'],
      ['PKG-05 · Outbox and monitoring', 'PLN-05', 'IT & Support · Governance', 'PKG-01 prepared; ownership, thresholds and escalation rule to confirm.', 'Candidate worker, metrics, alerts, quarantine, recovery and evidence specification.', 'Stop before any real worker, notification, alert, monitoring or automation.']
    ],
    gate: 'FINAL GATE · The five sheets remain candidates. Their confirmation will replace neither package-specific authorisation for real action nor the final reassessment of all six G1 conditions.',
    next: 'Next single human decision: confirm or amend REF-01-G1-PKG-001 V0.1.',
    boundary: 'No named owner, schedule, budget, provider, environment, right, data, real evidence, master source, progress or L2 authorisation is created.'
  },
  DE: {
    eyebrow: 'KANDIDATENREGISTER DER G1-VORBEREITUNG · REF-01-G1-PKG-001 · V0.1 · 27.08.2026',
    title: 'Die fünf Pakete ohne reale Aktion vorbereiten',
    intro: 'Dieses Register überführt PLN-001 V1.0 in fünf Vorbereitungsblätter. Es ordnet Kandidatenfunktionen, niemals Personen, zu und stoppt jedes Paket vor realer Sammlung, Prüfung oder Änderung.',
    counters: [['Kandidatenblätter', '5', 'Eines je Paket'], ['Benannte Verantwortliche', '0', 'Nur Funktionen'], ['Realnachweise', '0', 'Keine erhalten'], ['Reale Aktionen', '0', 'Pflichtstopp']],
    labels: { functions: 'Kandidatenfunktionen', dependencies: 'Abhängigkeiten', evidence: 'Erwartete Nachweise', stop: 'Stoppbedingung' },
    items: [
      ['PKG-01 · Rollen und Sichtbarkeit', 'PLN-01', 'IT & Support · Governance · Personalwesen', 'RH-001-Vertrag, Team-/Agent-Modell und bestätigte Prinzipien geringster Berechtigung.', 'Rollenmatrix, Funktionstrennung, Zeilensichtbarkeit und synthetische Szenarien.', 'Stopp vor Erstellung oder Änderung realer Rollen, Konten, Zugriffe oder Delegationen.'],
      ['PKG-02 · Aufbewahrung und DMS', 'PLN-02', 'Administration · LEGAL · Personalwesen · DMS', 'C2/C3/C4-Klassifikation, Unterlagenarten, Autoritäten und Ausnahmen zu qualifizieren.', 'Matrix für Aufbewahrung, Sperre, Löschung, Deklassifizierung, Ausnahmen und DMS-Nachweis.', 'Stopp vor Löschung, Umklassifizierung, Verschiebung oder Änderung realer Unterlagen.'],
      ['PKG-03 · PostgreSQL und Wiederanlauf', 'PLN-03', 'IT & Support · Governance', 'Vergleichsautorität, isolierter Umfang und RPO-/RTO-Kriterien zu bestätigen.', 'Vergleichsakte für Dienste, Sicherungen, Wiederherstellungen, Sicherheit und Nachweise.', 'Stopp vor Anbieterkontakt, Konto, Kauf, Geheimnis oder Produktionstest.'],
      ['PKG-04 · Migration und Rollback', 'PLN-04', 'IT & Support · Governance · Administration', 'PKG-01 und PKG-03 vorbereitet; Autoritäten und synthetisches Szenario identifiziert.', 'Kandidatenverfahren für isolierte Migration, Doppelgenehmigung, geprüfte Sicherung und Rollback.', 'Stopp vor Tabelle, Endpunkt, Echtdaten, Migration oder Startänderung.'],
      ['PKG-05 · Outbox und Überwachung', 'PLN-05', 'IT & Support · Governance', 'PKG-01 vorbereitet; Verantwortung, Schwellen und Eskalationsregel zu bestätigen.', 'Kandidatenspezifikation für Worker, Messwerte, Alarme, Quarantäne, Wiederanlauf und Nachweise.', 'Stopp vor realem Worker, Hinweis, Alarm, Monitoring oder Automatisierung.']
    ],
    gate: 'FINALE SCHRANKE · Die fünf Blätter bleiben Kandidaten. Ihre Bestätigung ersetzt weder die paketspezifische Autorisierung realer Aktionen noch die finale Neubewertung aller sechs G1-Bedingungen.',
    next: 'Nächster einzelner menschlicher Entscheid: REF-01-G1-PKG-001 V0.1 bestätigen oder ändern.',
    boundary: 'Es entstehen keine benannte Verantwortung, Terminplanung, Budget, Anbieter, Umgebung, Rechte, Daten, Realnachweise, Masterquelle, Fortschritt oder L2-Autorisierung.'
  }
};

const ICONS = [KeyRound, Archive, DatabaseBackup, ShieldCheck, RadioTower];

const InstitutionalPeopleTeamsGateG1PackageRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-package-register" className="m3s-ref01-g1-package-register mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-package-register-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-package-register-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileStack className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileStack className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, plan, functions, dependencies, evidence, stop], index) => { const Icon = ICONS[index]; return <article key={title} data-testid="ref01-g1-package-register-item" className="m3s-raised p-4"><div className="flex items-start justify-between gap-3"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{title}</h6></div><span className="rounded-full border border-sky-700 px-2 py-1 text-xs font-semibold text-sky-200">{plan}</span></div><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.functions}</dt><dd className="mt-1 text-slate-300">{functions}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.dependencies}</dt><dd className="mt-1 text-slate-300">{dependencies}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.evidence}</dt><dd className="mt-1 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-rose-200">{t.labels.stop}</dt><dd className="mt-1 text-slate-300">{stop}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.gate}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PackageRegister;
