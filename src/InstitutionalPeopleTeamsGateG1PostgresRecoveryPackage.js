import React from 'react';
import { AlertTriangle, DatabaseBackup, FileQuestion, LockKeyhole, RotateCcwKey, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'SUPPORT CONFIRMÉ · LOT 3 · REF-01-G1-PKG-03-001 · V1.0 · 27-08-2026',
    title: 'Grille PostgreSQL et reprise confirmée sans choix de service',
    intro: 'Cette grille confirmée définit les questions et preuves attendues pour PKG-03 sans nommer de fournisseur, fixer de cible technique ni lancer de sauvegarde ou de restauration.',
    counters: [['Dossier confirmé', '1', 'PKG-03-001 V1.0'], ['Axes contrôlés', '4', 'Décision documentaire'], ['Services retenus', '0', 'Aucun choix'], ['Actions réelles', '0', 'Aucun test ni compte']],
    labels: { purpose: 'Finalité', checks: 'Points à documenter', outputs: 'Livrables candidats', unknowns: 'Valeurs à qualifier' },
    areas: [
      { title: 'Périmètre et autorité', icon: FileQuestion, purpose: 'Définir ce qui pourrait être comparé, par qui et pour quelle décision.', checks: ['Périmètre fonctionnel et environnement isolé', 'Autorité métier, garde technique et double validation', 'Données exclues et classification de sensibilité', 'Critères d’arrêt avant toute consultation'], outputs: ['Mandat comparatif candidat', 'Matrice des responsabilités candidates'], unknowns: 'Autorité nominative, périmètre exact, charge, volume, territoires et calendrier.' },
      { title: 'Continuité et reprise', icon: RotateCcwKey, purpose: 'Rendre vérifiables sauvegarde, restauration et continuité avant toute mise en œuvre.', checks: ['RPO et RTO à proposer puis faire valider', 'Fréquence, rétention et chiffrement des sauvegardes', 'Procédure de restauration isolée', 'Preuves de test et critères de réussite'], outputs: ['Grille RPO/RTO candidate', 'Protocole synthétique de restauration'], unknowns: 'Objectifs RPO/RTO, fréquence, durée de conservation, jeu synthétique et responsables.' },
      { title: 'Sécurité et exploitation', icon: ShieldCheck, purpose: 'Comparer les garanties sans créer de secret, de compte ou de droit.', checks: ['Identités techniques et moindre privilège', 'Chiffrement, rotation et journalisation', 'Localisation et portabilité des données', 'Supervision, incidents et réversibilité'], outputs: ['Matrice de sécurité candidate', 'Registre des écarts et questions'], unknowns: 'Exigences de résidence, politiques de secrets, journaux requis, seuils et escalades.' },
      { title: 'Comparaison et décision', icon: DatabaseBackup, purpose: 'Séparer exigences, preuves annoncées, coûts et décision humaine.', checks: ['Critères obligatoires et critères souhaitables', 'Preuve exigée pour chaque affirmation', 'Coûts comparables et hypothèses explicites', 'Sortie, export, réversibilité et conditions contractuelles'], outputs: ['Tableau comparatif candidat', 'Fiche d’arbitrage humain'], unknowns: 'Budget, candidats comparables, prix, conditions, preuves reçues et option recommandée.' }
    ],
    status: 'CONFIRMÉ · Une grille documentaire gouvernée ; zéro fournisseur, zéro prix, zéro compte, zéro secret, zéro sauvegarde et zéro restauration réelle.',
    next: 'Décision consignée ci-dessous : REF-01-DEC-031 confirme REF-01-G1-PKG-03-001 V1.0 sans choisir de service.',
    boundary: 'Arrêt obligatoire avant recherche ou contact fournisseur, achat, création de compte, saisie de secret, utilisation de donnée réelle, sauvegarde, restauration, test de production ou choix technique.'
  },
  EN: {
    eyebrow: 'CONFIRMED SUPPORT · PACKAGE 3 · REF-01-G1-PKG-03-001 · V1.0 · 27 AUG 2026',
    title: 'Confirmed PostgreSQL and recovery grid without selecting a service',
    intro: 'This confirmed grid defines the questions and expected evidence for PKG-03 without naming a provider, setting a technical target or starting backup or restoration.',
    counters: [['Confirmed file', '1', 'PKG-03-001 V1.0'], ['Controlled areas', '4', 'Documentary decision'], ['Selected services', '0', 'No choice'], ['Real actions', '0', 'No test or account']],
    labels: { purpose: 'Purpose', checks: 'Points to document', outputs: 'Candidate outputs', unknowns: 'Values to qualify' },
    areas: [
      { title: 'Scope and authority', icon: FileQuestion, purpose: 'Define what may be compared, by whom and for which decision.', checks: ['Functional scope and isolated environment', 'Business authority, technical custody and dual approval', 'Excluded data and sensitivity classification', 'Stop criteria before any consultation'], outputs: ['Candidate comparison mandate', 'Candidate responsibility matrix'], unknowns: 'Named authority, exact scope, workload, volume, territories and schedule.' },
      { title: 'Continuity and recovery', icon: RotateCcwKey, purpose: 'Make backup, restoration and continuity verifiable before implementation.', checks: ['RPO and RTO to propose then validate', 'Backup frequency, retention and encryption', 'Isolated restoration procedure', 'Test evidence and success criteria'], outputs: ['Candidate RPO/RTO grid', 'Synthetic restoration protocol'], unknowns: 'RPO/RTO objectives, frequency, retention period, synthetic dataset and owners.' },
      { title: 'Security and operations', icon: ShieldCheck, purpose: 'Compare safeguards without creating a secret, account or right.', checks: ['Technical identities and least privilege', 'Encryption, rotation and logging', 'Data location and portability', 'Monitoring, incidents and reversibility'], outputs: ['Candidate security matrix', 'Gap and question register'], unknowns: 'Residency requirements, secret policies, required logs, thresholds and escalations.' },
      { title: 'Comparison and decision', icon: DatabaseBackup, purpose: 'Separate requirements, claimed evidence, costs and human decision.', checks: ['Mandatory and desirable criteria', 'Required evidence for every claim', 'Comparable costs and explicit assumptions', 'Exit, export, reversibility and contractual conditions'], outputs: ['Candidate comparison table', 'Human decision sheet'], unknowns: 'Budget, comparable candidates, prices, terms, evidence received and recommended option.' }
    ],
    status: 'CONFIRMED · One governed documentary grid; zero providers, prices, accounts, secrets, real backups or restorations.',
    next: 'Decision recorded below: REF-01-DEC-031 confirms REF-01-G1-PKG-03-001 V1.0 without selecting a service.',
    boundary: 'Mandatory stop before provider research or contact, purchase, account creation, secret entry, real-data use, backup, restoration, production test or technical selection.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER TRÄGER · PAKET 3 · REF-01-G1-PKG-03-001 · V1.0 · 27.08.2026',
    title: 'Bestätigtes PostgreSQL- und Wiederanlaufraster ohne Dienstwahl',
    intro: 'Dieses bestätigte Raster definiert die Fragen und erwarteten Nachweise für PKG-03, ohne Anbieter zu nennen, ein technisches Ziel festzulegen oder Sicherung und Wiederherstellung zu starten.',
    counters: [['Bestätigte Akte', '1', 'PKG-03-001 V1.0'], ['Kontrollbereiche', '4', 'Dokumentarischer Entscheid'], ['Gewählte Dienste', '0', 'Keine Wahl'], ['Reale Aktionen', '0', 'Kein Test, kein Konto']],
    labels: { purpose: 'Zweck', checks: 'Zu dokumentierende Punkte', outputs: 'Kandidatenergebnisse', unknowns: 'Zu qualifizierende Werte' },
    areas: [
      { title: 'Umfang und Autorität', icon: FileQuestion, purpose: 'Definieren, was durch wen und für welchen Entscheid verglichen werden darf.', checks: ['Funktionaler Umfang und isolierte Umgebung', 'Fachautorität, technische Obhut und Doppelgenehmigung', 'Ausgeschlossene Daten und Sensibilitätsklassifikation', 'Stoppkriterien vor jeder Konsultation'], outputs: ['Kandidatenmandat für den Vergleich', 'Kandidaten-Verantwortungsmatrix'], unknowns: 'Benannte Autorität, genauer Umfang, Last, Volumen, Gebiete und Zeitplan.' },
      { title: 'Kontinuität und Wiederanlauf', icon: RotateCcwKey, purpose: 'Sicherung, Wiederherstellung und Kontinuität vor Umsetzung prüfbar machen.', checks: ['RPO und RTO vorschlagen und dann validieren', 'Frequenz, Aufbewahrung und Verschlüsselung der Sicherungen', 'Isoliertes Wiederherstellungsverfahren', 'Testnachweise und Erfolgskriterien'], outputs: ['Kandidatenraster RPO/RTO', 'Synthetisches Wiederherstellungsprotokoll'], unknowns: 'RPO-/RTO-Ziele, Frequenz, Aufbewahrungsfrist, synthetischer Datensatz und Verantwortliche.' },
      { title: 'Sicherheit und Betrieb', icon: ShieldCheck, purpose: 'Garantien vergleichen, ohne Geheimnis, Konto oder Recht zu erstellen.', checks: ['Technische Identitäten und geringste Berechtigung', 'Verschlüsselung, Rotation und Protokollierung', 'Datenstandort und Portabilität', 'Überwachung, Vorfälle und Reversibilität'], outputs: ['Kandidaten-Sicherheitsmatrix', 'Abweichungs- und Fragenregister'], unknowns: 'Residenzanforderungen, Geheimnisrichtlinien, erforderliche Protokolle, Schwellen und Eskalationen.' },
      { title: 'Vergleich und Entscheid', icon: DatabaseBackup, purpose: 'Anforderungen, angekündigte Nachweise, Kosten und menschlichen Entscheid trennen.', checks: ['Pflicht- und Wunschkriterien', 'Erforderlicher Nachweis für jede Aussage', 'Vergleichbare Kosten und explizite Annahmen', 'Ausstieg, Export, Reversibilität und Vertragsbedingungen'], outputs: ['Kandidaten-Vergleichstabelle', 'Blatt für menschlichen Entscheid'], unknowns: 'Budget, vergleichbare Kandidaten, Preise, Bedingungen, erhaltene Nachweise und empfohlene Option.' }
    ],
    status: 'BESTÄTIGT · Ein gesteuertes Dokumentraster; null Anbieter, Preise, Konten, Geheimnisse, reale Sicherungen oder Wiederherstellungen.',
    next: 'Nachfolgend erfasster Entscheid: REF-01-DEC-031 bestätigt REF-01-G1-PKG-03-001 V1.0 ohne Dienstwahl.',
    boundary: 'Pflichtstopp vor Anbietersuche oder -kontakt, Kauf, Kontoerstellung, Geheimniseingabe, Echtdatennutzung, Sicherung, Wiederherstellung, Produktionstest oder technischer Wahl.'
  }
};

const InstitutionalPeopleTeamsGateG1PostgresRecoveryPackage = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-postgres-recovery-package" className="m3s-ref01-g1-postgres-recovery-package mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-postgres-recovery-package-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-postgres-recovery-package-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><DatabaseBackup className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <DatabaseBackup className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.areas.map(area => { const Icon = area.icon; return <article key={area.title} data-testid="ref01-g1-postgres-recovery-area" className="m3s-raised p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{area.title}</h6></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.purpose}</dt><dd className="mt-1 text-slate-300">{area.purpose}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.checks}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.checks.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.outputs}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{area.outputs.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-amber-200">{t.labels.unknowns}</dt><dd className="mt-1 text-slate-300">{area.unknowns}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostgresRecoveryPackage;
