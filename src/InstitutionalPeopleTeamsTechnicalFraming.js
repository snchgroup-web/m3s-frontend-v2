import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Braces,
  Database,
  FileKey2,
  KeyRound,
  Layers3,
  Route,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import InstitutionalPeopleTeamsImplementationProposal from './InstitutionalPeopleTeamsImplementationProposal';

const COPY = {
  FR: {
    eyebrow: 'CADRAGE TECHNIQUE CANDIDAT · REF-01-ML-001 · V0.2 · 26-08-2026',
    title: 'Traduire la base fonctionnelle sans modifier le système réel',
    intro: 'Ce cadrage propose des structures, interfaces, permissions et contrôles à examiner. Les noms techniques sont des candidats documentaires : ils ne constituent ni un schéma déployé, ni une API ouverte, ni des droits créés.',
    counters: [['Couches candidates', '5', 'Journal, versions, périodes, preuves et propagation'], ['Groupes fonctionnels mappés', '12', 'Base REF-01-ML-001 V1.0'], ['Interfaces candidates', '4', 'Deux commandes, une lecture et une propagation'], ['Modifications techniques', '0', 'Aucun changement appliqué']],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-008', version: 'V1.0', status: 'Préparation du cadrage autorisée', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'La préparation documentaire d’un cadrage technique candidat pour REF-01-ML-001 V1.0 est autorisée. Le cadrage doit rester réversible, vérifiable et séparé de toute implémentation.',
      evidence: 'Validation explicite de Cheikh dans la session du 26-08-2026 ; base fonctionnelle REF-01-ML-001 V1.0 et REF-01-DEC-007 publiées par la PR frontend nº 193 au commit 805b528f.',
      limit: 'Cette décision ne valide aucun choix technique candidat et n’autorise aucun schéma, table, endpoint, permission, accès, donnée réelle, migration, déploiement, automatisation, source maîtresse ou progression.'
    },
    confirmationRecord: {
      id: 'REF-01-DEC-009', version: 'V1.0', status: 'Cadrage candidat confirmé', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'Le cadrage technique candidat REF-01-ML-001 V0.1 est confirmé comme base de travail V0.2 : cinq couches, douze groupes fonctionnels mappés, quatre interfaces, quatre permissions, huit contrôles et huit conditions avant implémentation.',
      evidence: 'Validation explicite de Cheikh dans la session du 26-08-2026 ; cadrage candidat V0.1 publié par la PR frontend nº 194 au commit b548190e.',
      limit: 'Cette confirmation valide le cadrage comme base candidate. Elle ne crée ni n’autorise aucune table, API, permission, accès, donnée réelle, migration, automatisation, source maîtresse, progression ou implémentation.'
    },
    layersTitle: 'Cinq couches techniques candidates',
    layers: [
      ['Journal d’événements immuable', 'ref01_event', 'Conserver chaque changement comme entrée append-only avec identifiant, version et horodatage.'],
      ['Versions des objets', 'ref01_object_version', 'Projeter l’état courant sans écraser les versions précédentes de Personne, Appartenance, Équipe ou Responsabilité collective.'],
      ['Périodes d’appartenance', 'ref01_membership_period', 'Représenter début, fin et transfert comme périodes non chevauchantes à contrôler.'],
      ['Lien de preuve opaque', 'ref01_evidence_link', 'Conserver uniquement une référence GED autorisée et sa classification, jamais le contenu sensible dans REF-01.'],
      ['File de propagation', 'ref01_outbox', 'Préparer une propagation idempotente vers les consommateurs après validation métier.']
    ],
    mappingTitle: 'Mappage candidat des douze groupes fonctionnels',
    mappingIntro: 'Un groupe fonctionnel peut nécessiter plusieurs champs physiques. Les clés ci-dessous restent des noms de travail à confirmer.',
    mappingColumns: { group: 'Groupe fonctionnel', key: 'Clé candidate', rule: 'Règle de contrôle' },
    mappingLabels: { key: 'Clé candidate', rule: 'Règle de contrôle' },
    mapping: [
      ['Identifiant de l’événement', 'event_id', 'UUID immuable et non réutilisable.'],
      ['Type et identifiant de l’objet', 'object_type · object_id', 'Type contrôlé et identifiant stable obligatoire.'],
      ['Événement et état résultant', 'event_type · resulting_state', 'Couple autorisé par une transition confirmée.'],
      ['Date d’effet', 'effective_at', 'Date métier distincte de la saisie.'],
      ['Horodatage de saisie', 'recorded_at', 'Généré côté serveur et non modifiable.'],
      ['Motif contrôlé', 'reason_code', 'Code gouverné ; détail sensible conservé hors vue globale.'],
      ['Demandeur autorisé', 'requested_by_subject_id', 'Sujet authentifié, distinct du validateur.'],
      ['Validateur Organisation & RH', 'validated_by_subject_id', 'Obligatoire avant tout passage à l’état actif.'],
      ['Référence de preuve GED', 'evidence_ref', 'Référence opaque et autorisée ; contenu non recopié.'],
      ['Version précédente', 'previous_version_id', 'Lien obligatoire lorsqu’une version antérieure existe.'],
      ['Niveau de confidentialité', 'confidentiality_code', 'C2 minimum, à confirmer par la politique de classification.'],
      ['Propagation technique', 'propagation_status', 'Valeur candidate pending, completed ou failed, avec journal séparé.']
    ],
    interfacesTitle: 'Interfaces candidates à examiner',
    interfaceLabels: { purpose: 'Finalité', guard: 'Garde bloquante' },
    interfaces: [
      ['POST', '/ref01/event-requests', 'Préparer une demande d’événement sans l’activer.', 'Permission de demande, clé d’idempotence et version attendue.'],
      ['POST', '/ref01/event-requests/{eventId}/validate', 'Valider ou refuser la demande selon Organisation & RH.', 'Séparation demandeur/validateur et preuve de décision.'],
      ['GET', '/ref01/objects/{objectType}/{objectId}/history', 'Lire l’historique assaini selon les droits.', 'Moindre privilège, masquage du motif sensible et journalisation.'],
      ['POST', '/ref01/event-requests/{eventId}/propagate', 'Déclencher une propagation interne après validation.', 'Réservé au service technique ; idempotence et outbox obligatoires.']
    ],
    permissionsTitle: 'Permissions candidates, non créées',
    permissions: [
      ['ref01.request', 'Préparer une demande sans pouvoir la valider seul.'],
      ['ref01.validate', 'Valider le sens métier et la date d’effet.'],
      ['ref01.propagate', 'Autoriser le service technique à propager un événement validé.'],
      ['ref01.evidence.link', 'Associer une référence GED autorisée sans ouvrir la pièce.']
    ],
    controlsTitle: 'Huit contrôles techniques candidats',
    controls: [
      'Écriture append-only : une correction produit un nouvel événement.',
      'Clé d’idempotence obligatoire pour toute commande répétable.',
      'Contrôle de version pour empêcher l’écrasement concurrent.',
      'Transaction unique entre événement, version et file de propagation.',
      'Journal d’audit distinct pour demande, validation, lecture et propagation.',
      'Classification et filtrage appliqués avant toute réponse de lecture.',
      'Référence GED opaque ; aucun contenu de preuve dans les projections globales.',
      'Rejeu et échec de propagation contrôlés sans dupliquer l’effet métier.'
    ],
    exitTitle: 'Conditions avant toute proposition d’implémentation',
    exit: [
      'Confirmer ou corriger les cinq couches candidates.',
      'Confirmer la technologie de persistance et les conventions de nommage.',
      'Raccorder les sujets techniques aux utilisateurs sans exposer d’identité civile.',
      'Arbitrer la source maîtresse et le propriétaire de chaque objet.',
      'Mapper les quatre permissions candidates sur le RBAC réel.',
      'Valider classification, conservation, audit et références GED.',
      'Approuver les tests de contrat, concurrence, sécurité et reprise.',
      'Préparer séparément migration, retour arrière et déploiement avant toute exécution.'
    ],
    status: 'Statut : cadrage technique candidat V0.2 confirmé comme base de travail ; aucune implémentation technique n’est autorisée ou appliquée.',
    next: 'Prochain arbitrage : confirmer, corriger ou rejeter la proposition d’implémentation candidate REF-01-IMP-001 V0.1, toujours sans exécution.',
    boundary: 'Limite : zéro table, endpoint, permission, accès, donnée réelle, migration, déploiement, automatisation, source maîtresse ou taux de progression créé dans ce lot.'
  },
  EN: {
    eyebrow: 'CANDIDATE TECHNICAL FRAMING · REF-01-ML-001 · V0.2 · 26 AUG 2026',
    title: 'Translate the functional baseline without changing the real system',
    intro: 'This framing proposes structures, interfaces, permissions and controls for review. Technical names are documentary candidates: they are neither a deployed schema, an open API nor created rights.',
    counters: [['Candidate layers', '5', 'Journal, versions, periods, evidence and propagation'], ['Mapped functional groups', '12', 'REF-01-ML-001 V1.0 baseline'], ['Candidate interfaces', '4', 'Two commands, one read and one propagation'], ['Technical changes', '0', 'No change applied']],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-008', version: 'V1.0', status: 'Framing preparation authorised', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'Documentary preparation of candidate technical framing for REF-01-ML-001 V1.0 is authorised. The framing must remain reversible, verifiable and separate from any implementation.',
      evidence: 'Explicit validation by Cheikh during the 26 Aug 2026 session; REF-01-ML-001 V1.0 functional baseline and REF-01-DEC-007 published through frontend PR 193 at commit 805b528f.',
      limit: 'This decision validates no candidate technical choice and authorises no schema, table, endpoint, permission, access, real data, migration, deployment, automation, master source or progress.'
    },
    confirmationRecord: {
      id: 'REF-01-DEC-009', version: 'V1.0', status: 'Candidate framing confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'Candidate technical framing REF-01-ML-001 V0.1 is confirmed as working baseline V0.2: five layers, twelve mapped functional groups, four interfaces, four permissions, eight controls and eight pre-implementation conditions.',
      evidence: 'Explicit validation by Cheikh during the 26 Aug 2026 session; candidate framing V0.1 published through frontend PR 194 at commit b548190e.',
      limit: 'This confirmation validates the framing as a candidate baseline. It creates or authorises no table, API, permission, access, real data, migration, automation, master source, progress or implementation.'
    },
    layersTitle: 'Five candidate technical layers',
    layers: [
      ['Immutable event journal', 'ref01_event', 'Retain each change as an append-only entry with identifier, version and timestamp.'],
      ['Object versions', 'ref01_object_version', 'Project current state without overwriting previous Person, Membership, Team or Collective responsibility versions.'],
      ['Membership periods', 'ref01_membership_period', 'Represent start, end and transfer as controlled non-overlapping periods.'],
      ['Opaque evidence link', 'ref01_evidence_link', 'Retain only an authorised DMS reference and classification, never sensitive content in REF-01.'],
      ['Propagation queue', 'ref01_outbox', 'Prepare idempotent propagation to consumers after business validation.']
    ],
    mappingTitle: 'Candidate mapping of the twelve functional groups',
    mappingIntro: 'One functional group may require several physical fields. The keys below remain working names to confirm.',
    mappingColumns: { group: 'Functional group', key: 'Candidate key', rule: 'Control rule' },
    mappingLabels: { key: 'Candidate key', rule: 'Control rule' },
    mapping: [
      ['Event identifier', 'event_id', 'Immutable, non-reusable UUID.'], ['Object type and identifier', 'object_type · object_id', 'Controlled type and stable identifier required.'],
      ['Event and resulting state', 'event_type · resulting_state', 'Pair allowed by a confirmed transition.'], ['Effective date', 'effective_at', 'Business date distinct from capture.'],
      ['Capture timestamp', 'recorded_at', 'Server-generated and immutable.'], ['Controlled reason', 'reason_code', 'Governed code; sensitive detail kept outside global views.'],
      ['Authorised requester', 'requested_by_subject_id', 'Authenticated subject distinct from validator.'], ['Organisation & HR validator', 'validated_by_subject_id', 'Required before any active state.'],
      ['DMS evidence reference', 'evidence_ref', 'Opaque authorised reference; content not copied.'], ['Previous version', 'previous_version_id', 'Required link when a former version exists.'],
      ['Confidentiality level', 'confidentiality_code', 'C2 minimum, to confirm against classification policy.'], ['Technical propagation', 'propagation_status', 'Candidate pending, completed or failed value with separate log.']
    ],
    interfacesTitle: 'Candidate interfaces to review',
    interfaceLabels: { purpose: 'Purpose', guard: 'Blocking guard' },
    interfaces: [
      ['POST', '/ref01/event-requests', 'Prepare an event request without activating it.', 'Request permission, idempotency key and expected version.'],
      ['POST', '/ref01/event-requests/{eventId}/validate', 'Validate or reject according to Organisation & HR.', 'Requester/validator separation and decision evidence.'],
      ['GET', '/ref01/objects/{objectType}/{objectId}/history', 'Read sanitised history according to rights.', 'Least privilege, sensitive-reason masking and logging.'],
      ['POST', '/ref01/event-requests/{eventId}/propagate', 'Trigger internal propagation after validation.', 'Technical service only; idempotency and outbox required.']
    ],
    permissionsTitle: 'Candidate permissions, not created',
    permissions: [['ref01.request', 'Prepare a request without validating it alone.'], ['ref01.validate', 'Validate business meaning and effective date.'], ['ref01.propagate', 'Allow the technical service to propagate a validated event.'], ['ref01.evidence.link', 'Associate an authorised DMS reference without opening the record.']],
    controlsTitle: 'Eight candidate technical controls',
    controls: ['Append-only writes: a correction creates a new event.', 'Mandatory idempotency key for every repeatable command.', 'Version control prevents concurrent overwrite.', 'Single transaction across event, version and propagation queue.', 'Separate audit for request, validation, read and propagation.', 'Classification and filtering before any read response.', 'Opaque DMS reference; no evidence content in global projections.', 'Controlled replay and propagation failure without duplicating the business effect.'],
    exitTitle: 'Conditions before any implementation proposal',
    exit: ['Confirm or amend the five candidate layers.', 'Confirm persistence technology and naming conventions.', 'Link technical subjects to users without exposing civil identity.', 'Decide the master source and owner for each object.', 'Map the four candidate permissions to real RBAC.', 'Validate classification, retention, audit and DMS references.', 'Approve contract, concurrency, security and recovery tests.', 'Prepare migration, rollback and deployment separately before execution.'],
    status: 'Status: candidate technical framing V0.2 confirmed as a working baseline; no technical implementation is authorised or applied.',
    next: 'Next review: confirm, amend or reject candidate implementation proposal REF-01-IMP-001 V0.1, still without execution.',
    boundary: 'Boundary: zero table, endpoint, permission, access, real data, migration, deployment, automation, master source or progress rate is created in this package.'
  },
  DE: {
    eyebrow: 'TECHNISCHE KANDIDATENAUSGESTALTUNG · REF-01-ML-001 · V0.2 · 26.08.2026',
    title: 'Die funktionale Basis übersetzen, ohne das reale System zu ändern',
    intro: 'Diese Ausgestaltung schlägt Strukturen, Schnittstellen, Berechtigungen und Kontrollen zur Prüfung vor. Technische Namen sind dokumentarische Kandidaten: weder bereitgestelltes Schema noch offene API oder erstellte Rechte.',
    counters: [['Kandidatenebenen', '5', 'Journal, Versionen, Perioden, Nachweise und Weitergabe'], ['Zugeordnete Funktionsgruppen', '12', 'Basis REF-01-ML-001 V1.0'], ['Kandidatenschnittstellen', '4', 'Zwei Befehle, ein Lesen und eine Weitergabe'], ['Technische Änderungen', '0', 'Keine Änderung angewendet']],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-008', version: 'V1.0', status: 'Vorbereitung der Ausgestaltung autorisiert', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'Die dokumentarische Vorbereitung einer technischen Kandidatenausgestaltung für REF-01-ML-001 V1.0 ist autorisiert. Sie muss reversibel, prüfbar und von jeder Umsetzung getrennt bleiben.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 26.08.2026; funktionale Basis REF-01-ML-001 V1.0 und REF-01-DEC-007 mit Frontend-PR Nr. 193 am Commit 805b528f veröffentlicht.',
      limit: 'Der Entscheid validiert keine technische Kandidatenwahl und autorisiert kein Schema, keine Tabelle, keinen Endpoint, keine Berechtigung, keinen Zugriff, keine realen Daten, Migration, Bereitstellung, Automatisierung, Masterquelle oder Fortschritt.'
    },
    confirmationRecord: {
      id: 'REF-01-DEC-009', version: 'V1.0', status: 'Kandidatenausgestaltung bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'Die technische Kandidatenausgestaltung REF-01-ML-001 V0.1 ist als Arbeitsbasis V0.2 bestätigt: fünf Ebenen, zwölf abgebildete Funktionsgruppen, vier Schnittstellen, vier Berechtigungen, acht Kontrollen und acht Bedingungen vor einer Umsetzung.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 26.08.2026; Kandidatenausgestaltung V0.1 mit Frontend-PR Nr. 194 am Commit b548190e veröffentlicht.',
      limit: 'Diese Bestätigung validiert die Ausgestaltung als Kandidatenbasis. Sie erstellt oder autorisiert keine Tabelle, API, Berechtigung, keinen Zugriff, reale Daten, Migration, Automatisierung, Masterquelle, Fortschritt oder Umsetzung.'
    },
    layersTitle: 'Fünf technische Kandidatenebenen',
    layers: [['Unveränderliches Ereignisjournal', 'ref01_event', 'Jede Änderung als append-only Eintrag mit Kennung, Version und Zeitstempel bewahren.'], ['Objektversionen', 'ref01_object_version', 'Aktuellen Stand projizieren, ohne frühere Versionen der vier Objekte zu überschreiben.'], ['Mitgliedschaftsperioden', 'ref01_membership_period', 'Beginn, Ende und Wechsel als kontrollierte, nicht überlappende Perioden darstellen.'], ['Opaker Nachweislink', 'ref01_evidence_link', 'Nur autorisierte DMS-Referenz und Klassifizierung, nie sensible Inhalte in REF-01 bewahren.'], ['Weitergabewarteschlange', 'ref01_outbox', 'Idempotente Weitergabe nach fachlicher Validierung vorbereiten.']],
    mappingTitle: 'Kandidatenzuordnung der zwölf Funktionsgruppen',
    mappingIntro: 'Eine Funktionsgruppe kann mehrere physische Felder benötigen. Die folgenden Schlüssel bleiben zu bestätigende Arbeitsnamen.',
    mappingColumns: { group: 'Funktionsgruppe', key: 'Kandidatenschlüssel', rule: 'Kontrollregel' },
    mappingLabels: { key: 'Kandidatenschlüssel', rule: 'Kontrollregel' },
    mapping: [['Ereigniskennung', 'event_id', 'Unveränderliche, nicht wiederverwendbare UUID.'], ['Objekttyp und Kennung', 'object_type · object_id', 'Kontrollierter Typ und stabile Kennung erforderlich.'], ['Ereignis und Ergebnisstand', 'event_type · resulting_state', 'Paar durch bestätigten Übergang erlaubt.'], ['Wirksamkeitsdatum', 'effective_at', 'Fachdatum getrennt von Erfassung.'], ['Erfassungszeitpunkt', 'recorded_at', 'Serverseitig erzeugt und unveränderlich.'], ['Kontrollierter Grund', 'reason_code', 'Gesteuerter Code; sensible Details außerhalb globaler Ansichten.'], ['Autorisierter Antragsteller', 'requested_by_subject_id', 'Authentifiziertes Subjekt getrennt von Validierung.'], ['Validierung Organisation & Personal', 'validated_by_subject_id', 'Vor jedem aktiven Stand erforderlich.'], ['DMS-Nachweisreferenz', 'evidence_ref', 'Opake autorisierte Referenz; Inhalt nicht kopiert.'], ['Vorherige Version', 'previous_version_id', 'Verpflichtender Link bei bestehender Vorversion.'], ['Vertraulichkeitsstufe', 'confidentiality_code', 'Mindestens C2, mit Klassifizierungsrichtlinie zu bestätigen.'], ['Technische Weitergabe', 'propagation_status', 'Kandidat pending, completed oder failed mit getrenntem Protokoll.']],
    interfacesTitle: 'Zu prüfende Kandidatenschnittstellen',
    interfaceLabels: { purpose: 'Zweck', guard: 'Sperrregel' },
    interfaces: [['POST', '/ref01/event-requests', 'Ereignisantrag vorbereiten, ohne ihn zu aktivieren.', 'Antragsrecht, Idempotenzschlüssel und erwartete Version.'], ['POST', '/ref01/event-requests/{eventId}/validate', 'Nach Organisation & Personal validieren oder ablehnen.', 'Trennung Antrag/Validierung und Entscheidnachweis.'], ['GET', '/ref01/objects/{objectType}/{objectId}/history', 'Bereinigte Historie nach Rechten lesen.', 'Geringste Berechtigung, Maskierung sensibler Gründe und Protokollierung.'], ['POST', '/ref01/event-requests/{eventId}/propagate', 'Interne Weitergabe nach Validierung auslösen.', 'Nur technischer Dienst; Idempotenz und Outbox erforderlich.']],
    permissionsTitle: 'Kandidatenberechtigungen, nicht erstellt',
    permissions: [['ref01.request', 'Antrag vorbereiten, ohne allein zu validieren.'], ['ref01.validate', 'Fachbedeutung und Wirksamkeitsdatum validieren.'], ['ref01.propagate', 'Technischem Dienst die Weitergabe eines validierten Ereignisses erlauben.'], ['ref01.evidence.link', 'Autorisierte DMS-Referenz zuordnen, ohne die Unterlage zu öffnen.']],
    controlsTitle: 'Acht technische Kandidatenkontrollen',
    controls: ['Append-only-Schreiben: Eine Korrektur erzeugt ein neues Ereignis.', 'Idempotenzschlüssel für jeden wiederholbaren Befehl.', 'Versionskontrolle gegen gleichzeitiges Überschreiben.', 'Eine Transaktion für Ereignis, Version und Weitergabewarteschlange.', 'Getrenntes Audit für Antrag, Validierung, Lesen und Weitergabe.', 'Klassifizierung und Filterung vor jeder Leseantwort.', 'Opake DMS-Referenz; keine Nachweisinhalte in globalen Projektionen.', 'Kontrollierte Wiederholung und Fehlerbehandlung ohne doppelte Fachwirkung.'],
    exitTitle: 'Bedingungen vor jedem Umsetzungsvorschlag',
    exit: ['Fünf Kandidatenebenen bestätigen oder ändern.', 'Persistenztechnologie und Namenskonventionen bestätigen.', 'Technische Subjekte ohne Offenlegung der Zivilidentität zuordnen.', 'Masterquelle und Verantwortung jedes Objekts entscheiden.', 'Vier Kandidatenberechtigungen auf das reale RBAC abbilden.', 'Klassifizierung, Aufbewahrung, Audit und DMS-Referenzen validieren.', 'Vertrags-, Parallelitäts-, Sicherheits- und Wiederherstellungstests genehmigen.', 'Migration, Rückkehr und Bereitstellung getrennt vor jeder Ausführung vorbereiten.'],
    status: 'Stand: technische Kandidatenausgestaltung V0.2 als Arbeitsbasis bestätigt; keine technische Umsetzung ist autorisiert oder angewendet.',
    next: 'Nächster Entscheid: Den Kandidaten REF-01-IMP-001 V0.1 für den Umsetzungsvorschlag bestätigen, ändern oder ablehnen, weiterhin ohne Ausführung.',
    boundary: 'Grenze: Null Tabellen, Endpoints, Berechtigungen, Zugriffe, reale Daten, Migrationen, Bereitstellungen, Automatisierungen, Masterquellen oder Fortschrittsquoten werden in diesem Los erstellt.'
  }
};

const MappingCard = ({ row, t }) => (
  <article className="m3s-raised p-3" data-testid="ref01-technical-mapping-card">
    <h6 className="text-sm font-semibold text-slate-100">{row[0]}</h6>
    <dl className="mt-3 space-y-3 border-t border-slate-700 pt-3">
      <div><dt className="text-xs font-semibold text-slate-400">{t.mappingLabels.key}</dt><dd className="mt-1 font-mono text-xs text-cyan-300">{row[1]}</dd></div>
      <div><dt className="text-xs font-semibold text-amber-300">{t.mappingLabels.rule}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{row[2]}</dd></div>
    </dl>
  </article>
);

const InstitutionalPeopleTeamsTechnicalFraming = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [Layers3, Braces, Route, ShieldCheck];

  return (
    <section id="institutional-ref01-technical-framing" className="mt-4 rounded-md border border-teal-800/70 bg-teal-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-technical-framing-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-teal-300">{t.eyebrow}</p><h6 id="institutional-ref01-technical-framing-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <Database className="shrink-0 text-teal-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 3 ? 'text-amber-300' : 'text-teal-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} className="mt-4" />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.confirmationRecord} className="mt-3" />

      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-technical-layers-title">
        <div className="flex items-center gap-2"><Layers3 className="text-teal-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-layers-title" className="text-sm font-semibold text-slate-100">{t.layersTitle}</h6></div>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-5">{t.layers.map(([title, key, detail]) => <article key={key} className="m3s-raised p-3" data-testid="ref01-technical-layer"><h6 className="text-sm font-semibold text-slate-100">{title}</h6><p className="mt-2 font-mono text-xs text-teal-300">{key}</p><p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p></article>)}</div>
      </section>

      <section className="mt-4" aria-labelledby="ref01-technical-mapping-title">
        <div className="flex items-center gap-2"><FileKey2 className="text-cyan-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-mapping-title" className="text-sm font-semibold text-slate-100">{t.mappingTitle}</h6></div>
        <p className="mt-2 text-xs leading-5 text-slate-400">{t.mappingIntro}</p>
        <div className="mt-3 hidden overflow-x-auto rounded-md border border-slate-700 xl:block"><table className="w-full min-w-[1100px] border-collapse text-left text-sm"><thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300"><tr><th className="px-3 py-3 font-semibold">{t.mappingColumns.group}</th><th className="px-3 py-3 font-semibold">{t.mappingColumns.key}</th><th className="px-3 py-3 font-semibold">{t.mappingColumns.rule}</th></tr></thead><tbody className="divide-y divide-slate-700 bg-slate-950/15">{t.mapping.map(row => <tr key={row[0]} data-testid="ref01-technical-mapping-row"><th scope="row" className="px-3 py-3 font-semibold text-slate-100">{row[0]}</th><td className="px-3 py-3 font-mono text-xs text-cyan-300">{row[1]}</td><td className="px-3 py-3 text-slate-300">{row[2]}</td></tr>)}</tbody></table></div>
        <div className="mt-3 grid grid-cols-1 gap-3 xl:hidden">{t.mapping.map(row => <MappingCard key={row[0]} row={row} t={t} />)}</div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-technical-interfaces-title"><div className="flex items-center gap-2"><Route className="text-sky-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-interfaces-title" className="text-sm font-semibold text-slate-100">{t.interfacesTitle}</h6></div><div className="mt-3 space-y-3">{t.interfaces.map(([method, route, purpose, guard]) => <article key={`${method}-${route}`} className="m3s-raised p-3" data-testid="ref01-technical-interface"><div className="flex flex-wrap items-center gap-2"><span className="rounded-md border border-sky-700/70 bg-sky-950/30 px-2 py-1 text-xs font-semibold text-sky-200">{method}</span><code className="break-all text-xs text-cyan-300">{route}</code></div><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.interfaceLabels.purpose} : </span>{purpose}</p><p className="mt-2 text-xs leading-5 text-amber-100"><span className="font-semibold">{t.interfaceLabels.guard} : </span>{guard}</p></article>)}</div></section>

        <div className="space-y-4">
          <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-technical-permissions-title"><div className="flex items-center gap-2"><KeyRound className="text-violet-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-permissions-title" className="text-sm font-semibold text-slate-100">{t.permissionsTitle}</h6></div><dl className="mt-3 space-y-3">{t.permissions.map(([key, detail]) => <div key={key} className="m3s-raised p-3"><dt className="font-mono text-xs font-semibold text-violet-200">{key}</dt><dd className="mt-2 text-xs leading-5 text-slate-400">{detail}</dd></div>)}</dl></section>
          <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-technical-controls-title"><div className="flex items-center gap-2"><ShieldCheck className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-controls-title" className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h6></div><ol className="mt-3 space-y-2">{t.controls.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-technical-control"><span className="font-semibold text-emerald-300">{index + 1}.</span>{item}</li>)}</ol></section>
        </div>
      </div>

      <section className="mt-4 rounded-md border border-slate-700 p-4" aria-labelledby="ref01-technical-exit-title"><div className="flex items-center gap-2"><Braces className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-technical-exit-title" className="text-sm font-semibold text-slate-100">{t.exitTitle}</h6></div><ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">{t.exit.map((item, index) => <li key={item} className="m3s-raised flex items-start gap-3 p-3 text-xs leading-5 text-slate-300" data-testid="ref01-technical-exit"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-900/60 font-semibold text-amber-100">{index + 1}</span>{item}</li>)}</ol></section>

      <p className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p>
      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <InstitutionalPeopleTeamsImplementationProposal language={language} />
    </section>
  );
};

export default InstitutionalPeopleTeamsTechnicalFraming;
