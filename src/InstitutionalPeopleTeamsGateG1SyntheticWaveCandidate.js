import React from 'react';
import { AlertTriangle, DatabaseBackup, LockKeyhole, RadioTower, RotateCcw, TestTube2 } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'OUVERTURE CANDIDATE DE LA VAGUE 2 · REF-01-G1-WAV-003 · V0.1 · 29-08-2026',
    title: 'Préparer trois dossiers techniques isolés sans autoriser un test',
    intro: 'REV-004 V1.0 confirme la fin de la préparation documentaire de la vague 1. Conformément à PRI-002 V1.0, cette fiche candidate propose uniquement d’ouvrir la rédaction de trois autorisations unitaires pour la vague 2.',
    counters: [['Dossiers candidats', '3/3', 'AUT-02-01 · 02-04 · 02-05'], ['Autorisations unitaires', '0/3', 'Aucune fiche encore confirmée'], ['Environnements désignés', '0/3', 'Aucun système ouvert'], ['Tests lancés', '0', 'G1 ouverte · L2 fermé']],
    labels: { basis: 'Cadre confirmé', prepare: 'Préparation documentaire proposée', evidence: 'Preuve exigée avant tout résultat', stop: 'Arrêt obligatoire' },
    files: [
      ['AUT-02-01 · PostgreSQL et restauration', 'PKG-03 V1.0 · EVD-002 · REV-004 V1.0', 'Fiche unitaire, environnement isolé candidat, données synthétiques, sauvegarde/restauration, critères RPO/RTO et retour à l’état initial.', 'Service et environnement autorisés, sauvegarde traçable, restauration contrôlée et mesures vérifiables.', 'Aucun service, compte, secret, sauvegarde ou restauration réelle avant une décision unitaire.', 'database'],
      ['AUT-02-04 · Migration et retour arrière', 'PKG-04 V1.0 · EVD-002 · REV-004 V1.0', 'Fiche unitaire, source et cible synthétiques, fenêtre bornée, répétition, contrôles avant/après et procédure de retour arrière.', 'Identité d’exécution autorisée, sauvegarde, répétition réussie, écarts tracés et rollback contrôlé.', 'Aucune source, cible, identité, donnée ou migration réelle avant une décision unitaire.', 'rollback'],
      ['AUT-02-05 · Outbox, supervision et reprise', 'PKG-05 V1.0 · EVD-002 · REV-004 V1.0', 'Fiche unitaire, worker et file synthétiques, seuils candidats, canaux fictifs, quarantaine, rejeu et rapprochement.', 'Traitement isolé contrôlé, alertes fictives, reprise testée et rapprochement vérifiable.', 'Aucun worker, canal, destinataire, alerte, rejeu ou flux réel avant une décision unitaire.', 'outbox']
    ],
    prerequisitesTitle: 'Sept garde-fous communs avant toute préparation',
    prerequisites: ['Une autorisation séparée par dossier', 'Un périmètre et une durée bornés', 'Un environnement isolé explicitement autorisé', 'Des données strictement synthétiques', 'Des fonctions responsables et une séparation des contrôles', 'Des critères d’arrêt et de retour arrière', 'Un dépôt GED des supports et résultats contrôlés'],
    verdict: 'CANDIDAT · WAV-003 n’ouvre que la préparation de trois fiches unitaires. Aucun environnement, compte, secret, test, migration, worker, alerte ou preuve n’est autorisé.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-WAV-003 V0.1. Une confirmation ouvrira seulement la préparation documentaire des trois autorisations unitaires.',
    boundary: 'Chaque future exécution exigera ensuite sa propre fiche complète et une décision humaine distincte. G1 reste ouverte et L2 fermé.'
  },
  EN: {
    eyebrow: 'CANDIDATE OPENING OF WAVE 2 · REF-01-G1-WAV-003 · V0.1 · 29 AUG 2026',
    title: 'Prepare three isolated technical files without authorising a test',
    intro: 'REV-004 V1.0 confirms completion of Wave 1 documentary preparation. Under PRI-002 V1.0, this candidate sheet proposes only opening the drafting of three individual authorisations for Wave 2.',
    counters: [['Candidate files', '3/3', 'AUT-02-01 · 02-04 · 02-05'], ['Individual authorisations', '0/3', 'No sheet confirmed yet'], ['Designated environments', '0/3', 'No system opened'], ['Started tests', '0', 'G1 open · L2 closed']],
    labels: { basis: 'Confirmed framework', prepare: 'Proposed documentary preparation', evidence: 'Evidence required before any result', stop: 'Mandatory stop' },
    files: [
      ['AUT-02-01 · PostgreSQL and restoration', 'PKG-03 V1.0 · EVD-002 · REV-004 V1.0', 'Individual sheet, candidate isolated environment, synthetic data, backup/restoration, RPO/RTO criteria and return to the initial state.', 'Authorised service and environment, traceable backup, controlled restoration and verifiable measurements.', 'No real service, account, secret, backup or restoration before an individual decision.', 'database'],
      ['AUT-02-04 · Migration and rollback', 'PKG-04 V1.0 · EVD-002 · REV-004 V1.0', 'Individual sheet, synthetic source and target, bounded window, rehearsal, before/after controls and rollback procedure.', 'Authorised execution identity, backup, successful rehearsal, traced gaps and controlled rollback.', 'No real source, target, identity, data or migration before an individual decision.', 'rollback'],
      ['AUT-02-05 · Outbox, monitoring and recovery', 'PKG-05 V1.0 · EVD-002 · REV-004 V1.0', 'Individual sheet, synthetic worker and queue, candidate thresholds, fictitious channels, quarantine, replay and reconciliation.', 'Controlled isolated processing, fictitious alerts, tested recovery and verifiable reconciliation.', 'No real worker, channel, recipient, alert, replay or flow before an individual decision.', 'outbox']
    ],
    prerequisitesTitle: 'Seven common guardrails before any preparation',
    prerequisites: ['One separate authorisation per file', 'A bounded scope and period', 'An explicitly authorised isolated environment', 'Strictly synthetic data', 'Responsible functions and separated controls', 'Stop and rollback criteria', 'A DMS deposit for controlled supports and results'],
    verdict: 'CANDIDATE · WAV-003 opens only preparation of three individual sheets. No environment, account, secret, test, migration, worker, alert or evidence is authorised.',
    next: 'Next human decision: confirm or amend REF-01-G1-WAV-003 V0.1. Confirmation will open documentary preparation of the three individual authorisations only.',
    boundary: 'Each future execution will then require its own complete sheet and a separate human decision. G1 remains open and L2 closed.'
  },
  DE: {
    eyebrow: 'KANDIDATENÖFFNUNG DER WELLE 2 · REF-01-G1-WAV-003 · V0.1 · 29.08.2026',
    title: 'Drei isolierte technische Akten vorbereiten, ohne Prüfung zu erlauben',
    intro: 'REV-004 V1.0 bestätigt den Abschluss der Dokumentvorbereitung von Welle 1. Gemäss PRI-002 V1.0 schlägt dieses Kandidatenblatt nur die Erstellung von drei Einzelautorisierungen für Welle 2 vor.',
    counters: [['Kandidatenakten', '3/3', 'AUT-02-01 · 02-04 · 02-05'], ['Einzelautorisierungen', '0/3', 'Noch kein Blatt bestätigt'], ['Bestimmte Umgebungen', '0/3', 'Kein System geöffnet'], ['Gestartete Prüfungen', '0', 'G1 offen · L2 geschlossen']],
    labels: { basis: 'Bestätigter Rahmen', prepare: 'Vorgeschlagene Dokumentvorbereitung', evidence: 'Erforderlicher Nachweis vor jedem Ergebnis', stop: 'Obligatorischer Stopp' },
    files: [
      ['AUT-02-01 · PostgreSQL und Wiederherstellung', 'PKG-03 V1.0 · EVD-002 · REV-004 V1.0', 'Einzelblatt, isolierte Kandidatenumgebung, synthetische Daten, Sicherung/Wiederherstellung, RPO/RTO-Kriterien und Rückkehr zum Ausgangszustand.', 'Autorisierter Dienst und Umgebung, nachvollziehbare Sicherung, kontrollierte Wiederherstellung und prüfbare Messungen.', 'Kein realer Dienst, Account, Geheimnis, keine Sicherung oder Wiederherstellung vor einem Einzelentscheid.', 'database'],
      ['AUT-02-04 · Migration und Rollback', 'PKG-04 V1.0 · EVD-002 · REV-004 V1.0', 'Einzelblatt, synthetische Quelle und Ziel, begrenztes Fenster, Probe, Vor-/Nachkontrollen und Rollback-Verfahren.', 'Autorisierte Ausführungsidentität, Sicherung, erfolgreiche Probe, erfasste Abweichungen und kontrollierter Rollback.', 'Keine reale Quelle, Ziel, Identität, Daten oder Migration vor einem Einzelentscheid.', 'rollback'],
      ['AUT-02-05 · Outbox, Überwachung und Wiederanlauf', 'PKG-05 V1.0 · EVD-002 · REV-004 V1.0', 'Einzelblatt, synthetischer Worker und Queue, Kandidatenschwellen, fiktive Kanäle, Quarantäne, Wiederholung und Abstimmung.', 'Kontrollierte isolierte Verarbeitung, fiktive Alarme, geprüfter Wiederanlauf und prüfbare Abstimmung.', 'Kein realer Worker, Kanal, Empfänger, Alarm, keine Wiederholung oder Realfluss vor einem Einzelentscheid.', 'outbox']
    ],
    prerequisitesTitle: 'Sieben gemeinsame Leitplanken vor jeder Vorbereitung',
    prerequisites: ['Eine getrennte Autorisierung pro Akte', 'Begrenzter Umfang und Zeitraum', 'Ausdrücklich autorisierte isolierte Umgebung', 'Strikt synthetische Daten', 'Verantwortliche Funktionen und getrennte Kontrollen', 'Stopp- und Rollback-Kriterien', 'DMS-Ablage der kontrollierten Träger und Ergebnisse'],
    verdict: 'KANDIDAT · WAV-003 öffnet nur die Vorbereitung von drei Einzelblättern. Keine Umgebung, kein Account, Geheimnis, Test, keine Migration, Worker, Alarm oder Nachweis ist autorisiert.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-WAV-003 V0.1 bestätigen oder ändern. Eine Bestätigung öffnet nur die Dokumentvorbereitung der drei Einzelautorisierungen.',
    boundary: 'Jede spätere Ausführung braucht danach ein eigenes vollständiges Blatt und einen getrennten menschlichen Entscheid. G1 bleibt offen und L2 geschlossen.'
  }
};

const ICONS = { database: DatabaseBackup, rollback: RotateCcw, outbox: RadioTower };

const InstitutionalPeopleTeamsGateG1SyntheticWaveCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-wave-003" data-testid="ref01-g1-synthetic-wave-candidate" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-wave-003-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-wave-003-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><TestTube2 className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.files.map(([title, basis, prepare, evidence, stop, icon]) => { const Icon = ICONS[icon]; return <article key={title} data-testid="ref01-g1-synthetic-wave-file" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={18} aria-hidden="true" /><h6 className="break-words text-sm font-semibold text-slate-100">{title}</h6></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-300">{t.labels.basis}</dt><dd className="mt-1 text-slate-300">{basis}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.prepare}</dt><dd className="mt-1 text-slate-300">{prepare}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.evidence}</dt><dd className="mt-1 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.stop}</dt><dd className="mt-1 text-slate-300">{stop}</dd></div></dl></article>; })}</div>
      <section className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-4" aria-labelledby="institutional-ref01-g1-wave-003-prerequisites-title"><h6 id="institutional-ref01-g1-wave-003-prerequisites-title" className="text-sm font-semibold text-sky-100">{t.prerequisitesTitle}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{t.prerequisites.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-sky-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1SyntheticWaveCandidate;
