import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  FileKey2,
  History,
  ListChecks,
  ShieldCheck
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'LOT L1 · FONDATIONS DE DONNEES CANDIDATES · REF-01-L1-DATA-001 · V0.1 · 26-08-2026',
    title: 'Tester la structure sans toucher aux données réelles',
    intro: 'Après confirmation de G0, ce micro-lot prépare un schéma PostgreSQL isolé et réversible. Les contrôles ont été exécutés dans un moteur embarqué avec des identifiants fictifs ; aucune migration n’a été appliquée à une base M3S partagée ou de production.',
    counters: [['Objets candidats', '5', 'Journal, versions, périodes, preuves et outbox'], ['Contrôles testés', '7', 'Intégrité, confidentialité et retour arrière'], ['Tests backend', '3', 'Migration, taxonomie et tests unitaires'], ['Applications en production', '0', 'Aucune base, route ou donnée réelle']],
    objectsTitle: 'Cinq objets isolés préparés',
    objectLabels: { purpose: 'Finalité', control: 'Contrôle principal' },
    objects: [
      ['event', 'Journal append-only des changements gouvernés.', 'Idempotence, double responsabilité et refus de modification ou suppression.'],
      ['object_version', 'Versions datées des objets REF-01.', 'Une seule version courante par objet et intervalles cohérents.'],
      ['membership_period', 'Historique des appartenances Personne–Équipe.', 'Refus des périodes qui se chevauchent pour le même couple.'],
      ['evidence_link', 'Référence opaque vers une preuve conservée dans la GED.', 'Classification C2 à C4 ; aucun fichier de preuve copié.'],
      ['outbox', 'Message candidat pour une propagation ultérieure contrôlée.', 'Un message par événement et état de traitement explicite.']
    ],
    checksTitle: 'Preuves techniques déjà obtenues',
    checks: ['Migration montante exécutée.', 'Cinq tables attendues retrouvées.', 'Clé d’idempotence en double refusée.', 'Modification du journal refusée.', 'Chevauchement d’appartenance refusé.', 'État outbox incohérent refusé.', 'Migration descendante exécutée et schéma supprimé.'],
    traceTitle: 'Trace de réalisation',
    trace: 'Backend PR #46 fusionnée au commit cf35120. Validations : migration REF-01 réussie sur données fictives, taxonomie 19/19, tests unitaires 7/7 et GitGuardian réussi.',
    gateTitle: 'G1 reste à décider',
    gateIntro: 'La réussite technique locale ne vaut pas approbation de données ou de sécurité. Les points suivants doivent être examinés avant toute base partagée :',
    gates: ['Service PostgreSQL cible et procédure de sauvegarde/restauration.', 'Rôles applicatifs, moindre privilège et visibilité par ligne.', 'Conservation et traitement C2/C3/C4 avec la GED.', 'Identité autorisée à appliquer ou annuler une migration.', 'Surveillance, alertes, reprise et règles de réessai de l’outbox.', 'Autorisation ou refus d’un futur lot L2 API.'],
    status: 'Statut : fondations L1 candidates préparées et testées localement ; G1 reste ouverte.',
    next: 'Prochain arbitrage humain : confirmer, corriger ou rejeter le schéma candidat et les six conditions G1. Aucune ouverture de L2 avant cette décision.',
    boundary: 'Limite : aucune migration de production, route API, rôle, secret, donnée personnelle, preuve GED, projection BigQuery, automatisation ou progression n’est créée.'
  },
  EN: {
    eyebrow: 'L1 PACKAGE · CANDIDATE DATA FOUNDATIONS · REF-01-L1-DATA-001 · V0.1 · 26 AUG 2026',
    title: 'Test the structure without touching real data',
    intro: 'Following G0 confirmation, this micro-package prepares an isolated and reversible PostgreSQL schema. Controls ran in an embedded engine with fictitious identifiers; no migration was applied to a shared or production M3S database.',
    counters: [['Candidate objects', '5', 'Journal, versions, periods, evidence and outbox'], ['Tested controls', '7', 'Integrity, confidentiality and rollback'], ['Backend tests', '3', 'Migration, taxonomy and unit tests'], ['Production applications', '0', 'No database, route or real data']],
    objectsTitle: 'Five isolated objects prepared', objectLabels: { purpose: 'Purpose', control: 'Main control' },
    objects: [['event', 'Append-only journal of governed changes.', 'Idempotency, dual responsibility and rejection of updates or deletes.'], ['object_version', 'Effective-dated versions of REF-01 objects.', 'One current version per object and coherent intervals.'], ['membership_period', 'History of Person–Team memberships.', 'Reject overlapping periods for the same pair.'], ['evidence_link', 'Opaque reference to evidence retained in the DMS.', 'C2 to C4 classification; no evidence file copied.'], ['outbox', 'Candidate message for later controlled propagation.', 'One message per event and explicit processing state.']],
    checksTitle: 'Technical evidence already obtained',
    checks: ['Up migration applied.', 'Five expected tables found.', 'Duplicate idempotency key rejected.', 'Journal mutation rejected.', 'Overlapping membership rejected.', 'Incoherent outbox state rejected.', 'Down migration applied and schema removed.'],
    traceTitle: 'Implementation trace', trace: 'Backend PR #46 merged at commit cf35120. Validations: REF-01 migration passed with fictitious data, taxonomy 19/19, unit tests 7/7 and GitGuardian passed.',
    gateTitle: 'G1 still requires a decision', gateIntro: 'Local technical success is not a data or security approval. The following items must be reviewed before any shared database:',
    gates: ['Target PostgreSQL service and backup/restore procedure.', 'Application roles, least privilege and row visibility.', 'Retention and C2/C3/C4 handling with the DMS.', 'Authorised identity for applying or reversing a migration.', 'Monitoring, alerts, recovery and outbox retry rules.', 'Authorisation or rejection of a future L2 API package.'],
    status: 'Status: candidate L1 foundations prepared and tested locally; G1 remains open.', next: 'Next human decision: confirm, amend or reject the candidate schema and the six G1 conditions. Do not open L2 before that decision.', boundary: 'Boundary: no production migration, API route, role, secret, personal data, DMS evidence, BigQuery projection, automation or progress is created.'
  },
  DE: {
    eyebrow: 'LOS L1 · KANDIDAT FÜR DATENGRUNDLAGEN · REF-01-L1-DATA-001 · V0.1 · 26.08.2026',
    title: 'Die Struktur prüfen, ohne reale Daten zu berühren',
    intro: 'Nach der Bestätigung von G0 bereitet dieses Mikrolos ein isoliertes und reversibles PostgreSQL-Schema vor. Die Kontrollen liefen in einer eingebetteten Engine mit fiktiven Kennungen; keine Migration wurde auf eine gemeinsame oder produktive M3S-Datenbank angewandt.',
    counters: [['Kandidatenobjekte', '5', 'Journal, Versionen, Perioden, Nachweise und Outbox'], ['Geprüfte Kontrollen', '7', 'Integrität, Vertraulichkeit und Rückkehr'], ['Backend-Tests', '3', 'Migration, Taxonomie und Unit-Tests'], ['Produktive Anwendungen', '0', 'Keine Datenbank, Route oder reale Daten']],
    objectsTitle: 'Fünf isolierte Objekte vorbereitet', objectLabels: { purpose: 'Zweck', control: 'Hauptkontrolle' },
    objects: [['event', 'Append-only-Journal der gesteuerten Änderungen.', 'Idempotenz, doppelte Verantwortung und Ablehnung von Änderung oder Löschung.'], ['object_version', 'Datierte Versionen der REF-01-Objekte.', 'Eine aktuelle Version je Objekt und stimmige Zeiträume.'], ['membership_period', 'Historie der Person–Team-Mitgliedschaften.', 'Überlappende Zeiträume desselben Paars werden abgelehnt.'], ['evidence_link', 'Opake Referenz auf einen im DMS bewahrten Nachweis.', 'Klassifizierung C2 bis C4; keine Nachweisdatei kopiert.'], ['outbox', 'Kandidatennachricht für spätere kontrollierte Weitergabe.', 'Eine Nachricht je Ereignis und ausdrücklicher Verarbeitungsstand.']],
    checksTitle: 'Bereits erhaltene technische Nachweise',
    checks: ['Aufwärtsmigration ausgeführt.', 'Fünf erwartete Tabellen gefunden.', 'Doppelte Idempotenzkennung abgelehnt.', 'Journaländerung abgelehnt.', 'Überlappende Mitgliedschaft abgelehnt.', 'Inkonsistenter Outbox-Stand abgelehnt.', 'Abwärtsmigration ausgeführt und Schema entfernt.'],
    traceTitle: 'Umsetzungsspur', trace: 'Backend-PR #46 am Commit cf35120 fusioniert. Prüfungen: REF-01-Migration mit fiktiven Daten erfolgreich, Taxonomie 19/19, Unit-Tests 7/7 und GitGuardian erfolgreich.',
    gateTitle: 'G1 benötigt weiterhin einen Entscheid', gateIntro: 'Lokaler technischer Erfolg ist keine Daten- oder Sicherheitsfreigabe. Vor jeder gemeinsamen Datenbank sind folgende Punkte zu prüfen:',
    gates: ['Zielservice PostgreSQL und Sicherungs-/Wiederherstellungsverfahren.', 'Anwendungsrollen, geringste Berechtigung und Zeilensichtbarkeit.', 'Aufbewahrung und C2/C3/C4-Behandlung mit dem DMS.', 'Autorisierte Identität zum Anwenden oder Zurücknehmen einer Migration.', 'Überwachung, Warnungen, Wiederanlauf und Outbox-Wiederholungsregeln.', 'Autorisierung oder Ablehnung eines künftigen API-Loses L2.'],
    status: 'Stand: Kandidatengrundlagen L1 lokal vorbereitet und geprüft; G1 bleibt offen.', next: 'Nächster menschlicher Entscheid: Kandidatenschema und sechs G1-Bedingungen bestätigen, ändern oder ablehnen. L2 bleibt bis dahin geschlossen.', boundary: 'Grenze: Keine Produktionsmigration, API-Route, Rolle, Geheimnis, Personendaten, DMS-Nachweise, BigQuery-Projektion, Automatisierung oder Fortschrittsquote wird erstellt.'
  }
};

const InstitutionalPeopleTeamsDataFoundations = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [Database, ShieldCheck, ListChecks, FileKey2];

  return (
    <section id="institutional-ref01-l1-data-foundations" className="mt-5 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-l1-data-foundations-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h6 id="institutional-ref01-l1-data-foundations-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Database className="shrink-0 text-cyan-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 3 ? 'text-amber-300' : 'text-cyan-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <section className="mt-4" aria-labelledby="ref01-l1-objects-title"><div className="flex items-center gap-2"><History className="text-cyan-300" size={18} aria-hidden="true" /><h6 id="ref01-l1-objects-title" className="text-sm font-semibold text-slate-100">{t.objectsTitle}</h6></div><div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.objects.map(([name, purpose, control]) => <article key={name} className="m3s-raised p-4" data-testid="ref01-l1-object"><h6 className="font-mono text-sm font-semibold text-cyan-200">{name}</h6><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-slate-400">{t.objectLabels.purpose}</dt><dd className="mt-1 text-slate-300">{purpose}</dd></div><div><dt className="font-semibold text-emerald-300">{t.objectLabels.control}</dt><dd className="mt-1 text-slate-300">{control}</dd></div></dl></article>)}</div></section>
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2"><section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-l1-checks-title"><div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-l1-checks-title" className="text-sm font-semibold text-slate-100">{t.checksTitle}</h6></div><ul className="mt-3 space-y-2">{t.checks.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-l1-check"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{item}</li>)}</ul><div className="mt-4 border-t border-slate-700 pt-3"><p className="text-xs font-semibold text-sky-300">{t.traceTitle}</p><p className="mt-2 text-xs leading-5 text-slate-400">{t.trace}</p></div></section><section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-l1-gate-title"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-l1-gate-title" className="text-sm font-semibold text-slate-100">{t.gateTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-400">{t.gateIntro}</p><ol className="mt-3 space-y-2">{t.gates.map((item, index) => <li key={item} className="m3s-raised flex items-start gap-2 p-3 text-xs leading-5 text-slate-300" data-testid="ref01-l1-gate"><span className="font-semibold text-amber-300">{index + 1}.</span>{item}</li>)}</ol></section></div>
      <p className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p><p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p><p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsDataFoundations;
