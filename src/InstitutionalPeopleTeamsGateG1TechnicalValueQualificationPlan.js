import React from 'react';
import { AlertTriangle, DatabaseBackup, ListChecks, LockKeyhole, RadioTower, RefreshCcw } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PLAN CANDIDAT DE QUALIFICATION DES VALEURS · REF-01-G1-PLN-002 · V0.1 · 30-08-2026',
    title: 'Qualifier vingt-deux valeurs en trois lots sans ouvrir d’exécution',
    intro: 'Ce plan candidat reprend l’ordre confirmé par PRI-002 et répartit les valeurs encore ouvertes de REV-005 V1.0. Il définit les objets à qualifier, les preuves attendues et les règles d’arrêt ; il ne propose encore aucune valeur réelle.',
    counters: [['Lots ordonnés', '3/3', 'Ordre PRI-002 conservé'], ['Valeurs identifiées', '22', 'Six · huit · huit'], ['Valeurs proposées', '0/22', 'Aucune donnée réelle retenue'], ['Exécutions et tests', '0', 'G1 ouverte · L2 fermé']],
    labels: { values: 'Valeurs à qualifier', source: 'Provenance requise', output: 'Livrable documentaire', stop: 'Règle d’arrêt' },
    status: 'À QUALIFIER · NON OUVERT',
    packages: [
      { id: '1 · AUT-02-01', title: 'PostgreSQL et restauration', count: '6 valeurs', values: 'Service, environnement, titulaire, RPO/RTO, sauvegarde et restauration testée.', source: 'Documentation technique officielle, cadrage IT autorisé, preuve d’environnement et responsable gouverné.', output: 'Fiche de qualification des six valeurs avec provenance, écart et décision séparée.', stop: 'Arrêter si une valeur, sa source ou son responsable n’est pas vérifiable ; ne créer ni service ni environnement.' },
      { id: '2 · AUT-02-04', title: 'Migration et retour arrière', count: '8 valeurs', values: 'Source, cible, identité d’exécution, commande, fenêtre, seuil, preuve GED et environnement.', source: 'Architecture et procédure IT approuvées, identités techniques autorisées et dépôt GED gouverné.', output: 'Fiche de qualification des huit valeurs sans commande exécutable ni autorisation de migration.', stop: 'Arrêter avant tout accès, secret, commande, migration, rollback ou modification de données.' },
      { id: '3 · AUT-02-05', title: 'Outbox, supervision et reprise', count: '8 valeurs', values: 'Transport, titulaire, destinataires, worker, délais/tentatives, métriques/seuils, dépôt GED et environnement.', source: 'Architecture applicative, règles de supervision, responsabilités IT et preuves de récupération autorisées.', output: 'Fiche de qualification des huit valeurs sans activation de worker, alerte ou rejeu.', stop: 'Arrêter avant toute connexion, émission, traitement, alerte, reprise ou opération de production.' }
    ],
    verdict: 'CANDIDAT · 3 lots et 22 valeurs sont ordonnés ; 0/22 valeur est proposée ou sourcée, 0 exécution est autorisée et 0/6 condition G1 est clôturable.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-PLN-002 V0.1 comme plan documentaire de qualification des vingt-deux valeurs.',
    boundary: 'Ce plan ne sélectionne aucun fournisseur, service, titulaire, destinataire, secret, environnement ou source maîtresse. Il ne crée aucun compte, worker, migration, alerte, test, commande ni changement de production.'
  },
  EN: {
    eyebrow: 'CANDIDATE VALUE-QUALIFICATION PLAN · REF-01-G1-PLN-002 · V0.1 · 30 AUG 2026',
    title: 'Qualify twenty-two values in three packages without opening execution',
    intro: 'This candidate plan retains the order confirmed by PRI-002 and distributes the still-open REV-005 V1.0 values. It defines the items to qualify, expected evidence and stop rules; it proposes no real value yet.',
    counters: [['Ordered packages', '3/3', 'PRI-002 order retained'], ['Identified values', '22', 'Six · eight · eight'], ['Proposed values', '0/22', 'No real data retained'], ['Executions and tests', '0', 'G1 open · L2 closed']],
    labels: { values: 'Values to qualify', source: 'Required provenance', output: 'Documentary output', stop: 'Stop rule' },
    status: 'TO QUALIFY · NOT OPENED',
    packages: [
      { id: '1 · AUT-02-01', title: 'PostgreSQL and restoration', count: '6 values', values: 'Service, environment, holder, RPO/RTO, backup and tested restoration.', source: 'Official technical documentation, authorised IT framing, environment evidence and governed owner.', output: 'Qualification sheet for all six values with provenance, gap and separate decision.', stop: 'Stop if a value, source or owner cannot be verified; create neither service nor environment.' },
      { id: '2 · AUT-02-04', title: 'Migration and rollback', count: '8 values', values: 'Source, target, execution identity, command, window, threshold, DMS evidence and environment.', source: 'Approved IT architecture and procedure, authorised technical identities and governed DMS repository.', output: 'Qualification sheet for all eight values without executable command or migration authorisation.', stop: 'Stop before any access, secret, command, migration, rollback or data change.' },
      { id: '3 · AUT-02-05', title: 'Outbox, monitoring and recovery', count: '8 values', values: 'Transport, holder, recipients, worker, delays/attempts, metrics/thresholds, DMS repository and environment.', source: 'Application architecture, monitoring rules, IT ownership and authorised recovery evidence.', output: 'Qualification sheet for all eight values without activating a worker, alert or replay.', stop: 'Stop before any connection, emission, processing, alert, recovery or production operation.' }
    ],
    verdict: 'CANDIDATE · 3 packages and 22 values are ordered; 0/22 values are proposed or sourced, 0 executions are authorised and 0/6 G1 conditions are closable.',
    next: 'Next human decision: confirm or amend REF-01-G1-PLN-002 V0.1 as the documentary qualification plan for the twenty-two values.',
    boundary: 'This plan selects no provider, service, holder, recipient, secret, environment or master source. It creates no account, worker, migration, alert, test, command or production change.'
  },
  DE: {
    eyebrow: 'KANDIDATENPLAN ZUR WERTEQUALIFIZIERUNG · REF-01-G1-PLN-002 · V0.1 · 30.08.2026',
    title: 'Zweiundzwanzig Werte in drei Paketen qualifizieren, ohne Ausführung zu öffnen',
    intro: 'Dieser Kandidatenplan übernimmt die durch PRI-002 bestätigte Reihenfolge und verteilt die noch offenen Werte von REV-005 V1.0. Er definiert zu qualifizierende Objekte, erwartete Nachweise und Stoppregeln; noch wird kein realer Wert vorgeschlagen.',
    counters: [['Geordnete Pakete', '3/3', 'PRI-002-Reihenfolge beibehalten'], ['Identifizierte Werte', '22', 'Sechs · acht · acht'], ['Vorgeschlagene Werte', '0/22', 'Keine Realdaten übernommen'], ['Ausführungen und Prüfungen', '0', 'G1 offen · L2 geschlossen']],
    labels: { values: 'Zu qualifizierende Werte', source: 'Erforderliche Herkunft', output: 'Dokumentergebnis', stop: 'Stoppregel' },
    status: 'ZU QUALIFIZIEREN · NICHT GEÖFFNET',
    packages: [
      { id: '1 · AUT-02-01', title: 'PostgreSQL und Wiederherstellung', count: '6 Werte', values: 'Dienst, Umgebung, Träger, RPO/RTO, Sicherung und geprüfte Wiederherstellung.', source: 'Offizielle technische Dokumentation, autorisierter IT-Rahmen, Umgebungsnachweis und gesteuerte Verantwortung.', output: 'Qualifizierungsblatt der sechs Werte mit Herkunft, Lücke und getrenntem Entscheid.', stop: 'Stoppen, wenn Wert, Quelle oder Verantwortung nicht prüfbar sind; weder Dienst noch Umgebung erstellen.' },
      { id: '2 · AUT-02-04', title: 'Migration und Rollback', count: '8 Werte', values: 'Quelle, Ziel, Ausführungsidentität, Befehl, Fenster, Schwelle, DMS-Nachweis und Umgebung.', source: 'Genehmigte IT-Architektur und Verfahren, autorisierte technische Identitäten und gesteuerte DMS-Ablage.', output: 'Qualifizierungsblatt der acht Werte ohne ausführbaren Befehl oder Migrationsautorisierung.', stop: 'Vor Zugriff, Geheimnis, Befehl, Migration, Rollback oder Datenänderung stoppen.' },
      { id: '3 · AUT-02-05', title: 'Outbox, Überwachung und Wiederanlauf', count: '8 Werte', values: 'Transport, Träger, Empfänger, Worker, Verzögerungen/Versuche, Metriken/Schwellen, DMS-Ablage und Umgebung.', source: 'Anwendungsarchitektur, Überwachungsregeln, IT-Verantwortung und autorisierte Wiederanlaufnachweise.', output: 'Qualifizierungsblatt der acht Werte ohne Aktivierung von Worker, Alarm oder Wiederholung.', stop: 'Vor Verbindung, Versand, Verarbeitung, Alarm, Wiederanlauf oder Produktionsvorgang stoppen.' }
    ],
    verdict: 'KANDIDAT · 3 Pakete und 22 Werte sind geordnet; 0/22 Werte sind vorgeschlagen oder belegt, 0 Ausführungen sind autorisiert und 0/6 G1-Bedingungen schliessbar.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-PLN-002 V0.1 als dokumentarischen Qualifizierungsplan der zweiundzwanzig Werte bestätigen oder ändern.',
    boundary: 'Dieser Plan wählt keinen Anbieter, Dienst, Träger, Empfänger, kein Geheimnis, keine Umgebung oder Masterquelle. Er erstellt kein Konto, keinen Worker, keine Migration, keinen Alarm, Test, Befehl oder Produktionsänderung.'
  }
};

const ICONS = [DatabaseBackup, RefreshCcw, RadioTower];

const InstitutionalPeopleTeamsGateG1TechnicalValueQualificationPlan = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-pln-002" data-testid="ref01-g1-technical-value-qualification-plan" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ListChecks className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className={`shrink-0 ${index === 0 ? 'text-violet-300' : 'text-rose-300'}`} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.packages.map((item, index) => { const Icon = ICONS[index]; return <article key={item.id} data-testid="ref01-g1-technical-value-package" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={18} aria-hidden="true" /><div><p className="text-xs font-semibold text-slate-400">{item.id} · {item.count}</p><h6 className="mt-1 break-words text-sm font-semibold text-slate-100">{item.title}</h6></div></div><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.status}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-200">{t.labels.values}</dt><dd className="mt-1 text-slate-300">{item.values}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.source}</dt><dd className="mt-1 text-slate-300">{item.source}</dd></div><div><dt className="font-semibold text-violet-200">{t.labels.output}</dt><dd className="mt-1 text-slate-300">{item.output}</dd></div><div><dt className="font-semibold text-rose-200">{t.labels.stop}</dt><dd className="mt-1 text-slate-300">{item.stop}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-sm font-semibold leading-6 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1TechnicalValueQualificationPlan;
