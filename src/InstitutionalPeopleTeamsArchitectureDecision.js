import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  FileCheck2,
  GitBranch,
  ServerCog,
  ShieldCheck,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'LOT L0 · DECISION D’ARCHITECTURE CANDIDATE · REF-01-ADR-001 · V0.1 · 26-08-2026',
    title: 'Décider où écrire, lire et conserver avant tout code',
    intro: 'Cet ADR candidat transforme l’orientation confirmée de REF-01-IMP-001 V1.0 en décision vérifiable. Il compare les options, répartit les responsabilités et définit la sortie de G0 ; il ne déploie aucune technologie.',
    counters: [['Options comparées', '3', 'Une recommandée, deux alternatives encadrées'], ['Facteurs de décision', '6', 'Transaction, sécurité, reprise et réutilisation'], ['Responsabilités', '4', 'Métier, technique, preuve et gouvernance'], ['Changements appliqués', '0', 'ADR documentaire uniquement']],
    statementTitle: 'Décision d’architecture candidate',
    statementBadge: 'CANDIDATE · A CONFIRMER',
    statement: 'PostgreSQL devient le registre transactionnel candidat des événements REF-01, versions, périodes et messages outbox. BigQuery reste une projection dérivée de lecture et de reporting. Le contrat RH-001 existant demeure en lecture seule jusqu’à une migration séparément autorisée.',
    optionsTitle: 'Trois options comparées',
    optionLabels: { benefit: 'Apport', reservation: 'Réserve', position: 'Position candidate' },
    options: [
      ['A · PostgreSQL + BigQuery', 'Transactions atomiques, contrôle de concurrence et reporting réutilisé.', 'Deux stockages à superviser et propagation à rapprocher.', 'Recommandée pour G0'],
      ['B · BigQuery seul', 'Réutilise le stockage déjà observé et limite les composants.', 'Doit encore prouver transaction, verrouillage de version, outbox et rollback équivalents.', 'Alternative conditionnelle'],
      ['C · PostgreSQL seul', 'Modèle transactionnel plus simple pour le cœur REF-01.', 'Répliquerait ou déplacerait les usages analytiques déjà portés par BigQuery.', 'Non recommandée pour le reporting']
    ],
    driversTitle: 'Six facteurs obligatoires de décision',
    drivers: ['Atomicité événement–version–outbox.', 'Concurrence optimiste et refus des versions périmées.', 'Audit append-only et traçabilité des validations.', 'Sauvegarde, restauration et retour arrière testables.', 'Classification, moindre privilège et absence de pièce GED copiée.', 'Réutilisation contrôlée de BigQuery pour lecture et reporting.'],
    rolesTitle: 'Matrice des responsabilités candidate',
    roleLabels: { owner: 'Responsable', role: 'Rôle dans L0', proof: 'Preuve attendue' },
    roles: [
      ['Organisation & RH', 'Propriétaire du sens métier, des transitions et des règles d’effet.', 'Validation fonctionnelle de l’ADR et des objets.'],
      ['IT & Support', 'Gardien technique de PostgreSQL, de l’API, de l’outbox et des sauvegardes.', 'Revue d’architecture, sécurité et réversibilité.'],
      ['GED', 'Gardien des décisions et références de preuve opaques.', 'Convention de référence, classification et conservation.'],
      ['Management & Gouvernance', 'Autorité des portes G0 à G3 et de toute activation réelle.', 'Décision datée, limites et Go/No-Go consignés.']
    ],
    gateTitle: 'Sortie exigée pour G0',
    gate: ['ADR confirmé et versionné.', 'Technologie et environnement d’hébergement explicités.', 'Source maîtresse candidate définie objet par objet.', 'Responsabilités métier, technique, GED et gouvernance confirmées.', 'Classification et règles de conservation approuvées.', 'RBAC candidat et séparation demandeur–validateur documentés.', 'Sauvegarde, restauration, RPO et RTO proposés.', 'Conventions de nommage, versionnement et journalisation fixées.'],
    exclusionsTitle: 'Ce que L0 ne décide pas encore',
    exclusions: ['Aucun fournisseur cloud ou abonnement acheté.', 'Aucune table, migration, route ou permission créée.', 'Aucune donnée personnelle ou preuve GED importée.', 'Aucun délai, coût ou taux de progression déclaré.', 'Aucune activation de L1 à L5 sans nouvelle porte.'],
    status: 'Statut : REF-01-ADR-001 V0.1 préparé comme décision candidate du lot L0 ; G0 reste ouverte et zéro changement technique est appliqué.',
    next: 'Prochain arbitrage : confirmer, amender ou rejeter l’ADR candidat et la matrice des responsabilités avant toute ouverture de L1.',
    boundary: 'Limite : la confirmation de REF-01-IMP-001 V1.0 autorise la préparation documentaire de L0, pas la création d’une base, d’une API, d’un droit ou d’une donnée réelle.'
  },
  EN: {
    eyebrow: 'L0 PACKAGE · CANDIDATE ARCHITECTURE DECISION · REF-01-ADR-001 · V0.1 · 26 AUG 2026',
    title: 'Decide where to write, read and retain before any code',
    intro: 'This candidate ADR turns the confirmed direction of REF-01-IMP-001 V1.0 into a verifiable decision. It compares options, allocates responsibilities and defines the G0 exit; it deploys no technology.',
    counters: [['Compared options', '3', 'One recommended, two bounded alternatives'], ['Decision drivers', '6', 'Transaction, security, recovery and reuse'], ['Responsibilities', '4', 'Business, technical, evidence and governance'], ['Applied changes', '0', 'Documentary ADR only']],
    statementTitle: 'Candidate architecture decision', statementBadge: 'CANDIDATE · TO CONFIRM', statement: 'PostgreSQL becomes the candidate transactional record for REF-01 events, versions, periods and outbox messages. BigQuery remains a derived read and reporting projection. The existing RH-001 contract stays read-only until a separately authorised migration.',
    optionsTitle: 'Three compared options', optionLabels: { benefit: 'Benefit', reservation: 'Reservation', position: 'Candidate position' },
    options: [['A · PostgreSQL + BigQuery', 'Atomic transactions, concurrency control and reused reporting.', 'Two stores to operate and propagated data to reconcile.', 'Recommended for G0'], ['B · BigQuery only', 'Reuses the observed store and limits components.', 'Must still prove equivalent transactions, version locking, outbox and rollback.', 'Conditional alternative'], ['C · PostgreSQL only', 'Simpler transactional model for the REF-01 core.', 'Would duplicate or move analytical uses already carried by BigQuery.', 'Not recommended for reporting']],
    driversTitle: 'Six mandatory decision drivers', drivers: ['Atomic event–version–outbox write.', 'Optimistic concurrency and rejection of stale versions.', 'Append-only audit and validation traceability.', 'Testable backup, restoration and rollback.', 'Classification, least privilege and no copied DMS record.', 'Controlled reuse of BigQuery for reading and reporting.'],
    rolesTitle: 'Candidate responsibility matrix', roleLabels: { owner: 'Owner', role: 'Role in L0', proof: 'Expected evidence' },
    roles: [['Organisation & HR', 'Owns business meaning, transitions and effective rules.', 'Functional approval of the ADR and objects.'], ['IT & Support', 'Technical steward for PostgreSQL, API, outbox and backups.', 'Architecture, security and reversibility review.'], ['DMS', 'Custodian of decisions and opaque evidence references.', 'Reference, classification and retention convention.'], ['Management & Governance', 'Authority for gates G0 to G3 and any real activation.', 'Dated decision, limits and recorded Go/No-Go.']],
    gateTitle: 'Required G0 exit', gate: ['ADR confirmed and versioned.', 'Technology and hosting environment stated.', 'Candidate master source defined per object.', 'Business, technical, DMS and governance responsibilities confirmed.', 'Classification and retention rules approved.', 'Candidate RBAC and requester–validator segregation documented.', 'Backup, restore, RPO and RTO proposed.', 'Naming, versioning and journaling conventions fixed.'],
    exclusionsTitle: 'What L0 does not decide yet', exclusions: ['No cloud provider or subscription purchased.', 'No table, migration, route or permission created.', 'No personal data or DMS evidence imported.', 'No timeline, cost or progress rate declared.', 'No activation of L1 to L5 without a new gate.'],
    status: 'Status: REF-01-ADR-001 V0.1 prepared as the candidate L0 decision; G0 remains open and zero technical change is applied.', next: 'Next review: confirm, amend or reject the candidate ADR and responsibility matrix before opening L1.', boundary: 'Boundary: confirmation of REF-01-IMP-001 V1.0 authorises documentary preparation of L0, not creation of a database, API, permission or real data.'
  },
  DE: {
    eyebrow: 'LOS L0 · KANDIDAT FÜR ARCHITEKTURENTSCHEID · REF-01-ADR-001 · V0.1 · 26.08.2026',
    title: 'Vor jedem Code entscheiden, wo geschrieben, gelesen und bewahrt wird',
    intro: 'Dieser ADR-Kandidat übersetzt die bestätigte Ausrichtung von REF-01-IMP-001 V1.0 in einen prüfbaren Entscheid. Er vergleicht Optionen, verteilt Verantwortungen und definiert den G0-Ausgang; keine Technologie wird bereitgestellt.',
    counters: [['Verglichene Optionen', '3', 'Eine empfohlen, zwei begrenzte Alternativen'], ['Entscheidungsfaktoren', '6', 'Transaktion, Sicherheit, Wiederherstellung und Wiederverwendung'], ['Verantwortungen', '4', 'Fachlich, technisch, Nachweis und Governance'], ['Angewandte Änderungen', '0', 'Nur dokumentarischer ADR']],
    statementTitle: 'Kandidat für Architekturentscheid', statementBadge: 'KANDIDAT · ZU BESTÄTIGEN', statement: 'PostgreSQL wird Kandidat für das Transaktionsregister der REF-01-Ereignisse, Versionen, Perioden und Outbox-Nachrichten. BigQuery bleibt abgeleitete Lese- und Reportingprojektion. Der bestehende RH-001-Vertrag bleibt bis zu einer getrennt autorisierten Migration schreibgeschützt.',
    optionsTitle: 'Drei verglichene Optionen', optionLabels: { benefit: 'Nutzen', reservation: 'Vorbehalt', position: 'Kandidatenposition' },
    options: [['A · PostgreSQL + BigQuery', 'Atomare Transaktionen, Konkurrenzkontrolle und wiederverwendetes Reporting.', 'Zwei Speicher zu betreiben und Weitergabe abzugleichen.', 'Für G0 empfohlen'], ['B · Nur BigQuery', 'Nutzt den beobachteten Speicher weiter und begrenzt Komponenten.', 'Muss gleichwertige Transaktionen, Versionssperre, Outbox und Rollback beweisen.', 'Bedingte Alternative'], ['C · Nur PostgreSQL', 'Einfacheres Transaktionsmodell für den REF-01-Kern.', 'Würde bestehende analytische BigQuery-Nutzung duplizieren oder verschieben.', 'Für Reporting nicht empfohlen']],
    driversTitle: 'Sechs zwingende Entscheidungsfaktoren', drivers: ['Atomarer Schreibvorgang für Ereignis, Version und Outbox.', 'Optimistische Konkurrenz und Ablehnung veralteter Versionen.', 'Append-only-Audit und Rückverfolgbarkeit der Validierung.', 'Testbare Sicherung, Wiederherstellung und Rückkehr.', 'Klassifizierung, geringste Berechtigung und keine kopierte DMS-Unterlage.', 'Kontrollierte BigQuery-Wiederverwendung für Lesen und Reporting.'],
    rolesTitle: 'Kandidatenmatrix der Verantwortungen', roleLabels: { owner: 'Verantwortung', role: 'Rolle in L0', proof: 'Erwarteter Nachweis' },
    roles: [['Organisation & Personal', 'Fachverantwortung für Bedeutung, Übergänge und Wirksamkeitsregeln.', 'Fachliche Bestätigung von ADR und Objekten.'], ['IT & Support', 'Technische Pflege von PostgreSQL, API, Outbox und Sicherungen.', 'Architektur-, Sicherheits- und Reversibilitätsprüfung.'], ['DMS', 'Bewahrt Entscheide und opake Nachweisreferenzen.', 'Referenz-, Klassifizierungs- und Aufbewahrungskonvention.'], ['Management & Governance', 'Entscheidungsinstanz für G0 bis G3 und jede reale Aktivierung.', 'Datierter Entscheid, Grenzen und protokolliertes Go/No-Go.']],
    gateTitle: 'Erforderlicher Ausgang für G0', gate: ['ADR bestätigt und versioniert.', 'Technologie und Hosting-Umgebung benannt.', 'Kandidaten-Masterquelle je Objekt definiert.', 'Fachliche, technische, DMS- und Governance-Verantwortungen bestätigt.', 'Klassifizierung und Aufbewahrungsregeln genehmigt.', 'Kandidaten-RBAC und Trennung Antrag–Validierung dokumentiert.', 'Sicherung, Wiederherstellung, RPO und RTO vorgeschlagen.', 'Namens-, Versions- und Journalisierungskonventionen festgelegt.'],
    exclusionsTitle: 'Was L0 noch nicht entscheidet', exclusions: ['Kein Cloud-Anbieter oder Abonnement gekauft.', 'Keine Tabelle, Migration, Route oder Berechtigung erstellt.', 'Keine Personendaten oder DMS-Nachweise importiert.', 'Keine Frist, Kosten oder Fortschrittsquote erklärt.', 'Keine Aktivierung von L1 bis L5 ohne neues Tor.'],
    status: 'Stand: REF-01-ADR-001 V0.1 als Kandidatenentscheid für L0 vorbereitet; G0 bleibt offen und null technische Änderungen sind angewandt.', next: 'Nächster Entscheid: ADR-Kandidat und Verantwortungsmatrix vor Öffnung von L1 bestätigen, ändern oder ablehnen.', boundary: 'Grenze: Die Bestätigung von REF-01-IMP-001 V1.0 autorisiert die dokumentarische Vorbereitung von L0, nicht die Erstellung von Datenbank, API, Berechtigung oder realen Daten.'
  }
};

const InstitutionalPeopleTeamsArchitectureDecision = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [GitBranch, ShieldCheck, UsersRound, ServerCog];
  return (
    <section id="institutional-ref01-architecture-decision" className="mt-5 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-architecture-decision-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-architecture-decision-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileCheck2 className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 3 ? 'text-amber-300' : 'text-violet-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-2"><Database className="text-emerald-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.statementTitle}</h6></div><span className="rounded-md border border-emerald-700/70 bg-emerald-950/30 px-2 py-1 text-xs font-semibold text-emerald-200">{t.statementBadge}</span></div><p className="mt-3 text-sm font-semibold leading-6 text-emerald-100">{t.statement}</p></article>
      <section className="mt-4" aria-labelledby="ref01-adr-options-title"><h6 id="ref01-adr-options-title" className="text-sm font-semibold text-slate-100">{t.optionsTitle}</h6><div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.options.map(([title, benefit, reservation, position]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-adr-option"><h6 className="text-sm font-semibold text-violet-200">{title}</h6><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-emerald-300">{t.optionLabels.benefit}</dt><dd className="mt-1 text-slate-300">{benefit}</dd></div><div><dt className="font-semibold text-amber-300">{t.optionLabels.reservation}</dt><dd className="mt-1 text-slate-300">{reservation}</dd></div><div><dt className="font-semibold text-sky-300">{t.optionLabels.position}</dt><dd className="mt-1 text-slate-300">{position}</dd></div></dl></article>)}</div></section>
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2"><section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-adr-drivers-title"><h6 id="ref01-adr-drivers-title" className="text-sm font-semibold text-slate-100">{t.driversTitle}</h6><ol className="mt-3 space-y-2">{t.drivers.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-adr-driver"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span><span className="font-semibold">{index + 1}. </span>{item}</span></li>)}</ol></section><section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-adr-gate-title"><h6 id="ref01-adr-gate-title" className="text-sm font-semibold text-slate-100">{t.gateTitle}</h6><ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{t.gate.map((item, index) => <li key={item} className="m3s-raised flex items-start gap-2 p-3 text-xs leading-5 text-slate-300" data-testid="ref01-adr-gate"><span className="font-semibold text-violet-300">{index + 1}.</span>{item}</li>)}</ol></section></div>
      <section className="mt-4" aria-labelledby="ref01-adr-roles-title"><h6 id="ref01-adr-roles-title" className="text-sm font-semibold text-slate-100">{t.rolesTitle}</h6><div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.roles.map(([owner, role, proof]) => <article key={owner} className="m3s-raised p-4" data-testid="ref01-adr-role"><h6 className="text-sm font-semibold text-sky-200">{owner}</h6><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-slate-400">{t.roleLabels.role}</dt><dd className="mt-1 text-slate-300">{role}</dd></div><div><dt className="font-semibold text-emerald-300">{t.roleLabels.proof}</dt><dd className="mt-1 text-slate-300">{proof}</dd></div></dl></article>)}</div></section>
      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-adr-exclusions-title"><h6 id="ref01-adr-exclusions-title" className="text-sm font-semibold text-slate-100">{t.exclusionsTitle}</h6><ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">{t.exclusions.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p><p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p><p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsArchitectureDecision;
