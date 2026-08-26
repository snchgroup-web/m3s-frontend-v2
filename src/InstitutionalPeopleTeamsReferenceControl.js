import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  GitBranch,
  Network,
  ShieldCheck,
  UserCog,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import InstitutionalPeopleTeamsSourceControl from './InstitutionalPeopleTeamsSourceControl';

const STATUS_STYLES = {
  observed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  validated: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  candidate: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/20 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'CONTROLE DETAILLE 1/11 · REF-01 · V1.18 · 26-08-2026',
    title: 'REF-01 · Personnes et équipes',
    body: 'Ce contrôle rapproche l’annuaire RH-001, les sélecteurs Team/Agent et les règles déjà publiées pour les responsabilités collectives. Il prépare un modèle commun sans recopier l’annuaire, désigner une source maîtresse ou confondre personne, appartenance, équipe, rôle et accès M3S.',
    counters: [
      ['Axes contrôlés', '5', 'Identité, structure, cycle, responsabilité et preuve'],
      ['Événements de cycle validés', '6', 'Cadre validé ; mise en œuvre séparée'],
      ['Données personnelles publiées', '0', 'Aucun nom, contact ou identifiant réel'],
      ['Sources maîtresses retenues dans REF-01', '0', 'Aucune promotion autorisée par cette décision']
    ],
    modelTitle: 'Modèle logique validé à quatre objets',
    modelIntro: 'Cette séparation fonctionnelle est validée comme cadre de travail. Elle ne crée ni table, ni compte, ni droit et reste à traduire en règles détaillées.',
    model: [
      ['Personne', 'Identité institutionnelle distincte de ses fonctions, équipes et accès.'],
      ['Appartenance', 'Lien daté entre une personne, un statut institutionnel et une équipe.'],
      ['Équipe', 'Regroupement opérationnel territorial ou fonctionnel, par exemple TZH ou TSN.'],
      ['Responsabilité collective', 'Affectation à toute l’équipe, distincte d’une affectation individuelle.']
    ],
    columns: { axis: 'Axe', observed: 'Constat observé', rule: 'Règle candidate ou contrôle', status: 'État' },
    statuses: { observed: 'Contrat observé', validated: 'Cadre validé', candidate: 'Règle candidate', open: 'Définition ouverte' },
    rows: [
      ['Identité stable', 'RH-001 porte un identifiant technique stable et des libellés d’affichage assainis.', 'Conserver un identifiant non réutilisable ; confirmer séparément identité civile, alias et preuve dans l’espace autorisé.', 'observed'],
      ['Séparation des objets', 'Annuaire, comptes, droits et sélecteurs opérationnels sont déjà traités comme des objets distincts.', 'Personne, Appartenance, Équipe et Responsabilité collective sont retenus ; comptes et droits restent à REF-02.', 'validated'],
      ['Cycle de vie', 'Un état actif/inactif est visible, mais l’entrée, la suspension, le transfert et la sortie ne sont pas versionnés dans la source observée.', 'Six familles d’événements et leur traçabilité minimale sont validées comme cadre de travail.', 'validated'],
      ['Collectifs TZH/TSN', 'Les formulaires distinguent une personne du collectif de son équipe et refusent les couples Team-Agent impossibles.', 'Interdire qu’un collectif soit résolu comme personne ; conserver la provenance des anciennes valeurs sans correction silencieuse.', 'observed'],
      ['Propriété et preuve', 'RH-001 est une source documentaire C2 en lecture seule ; les mandats et preuves restent séparés.', 'Organisation & RH porte le sens métier ; IT assure la garde technique ; la GED conserve les preuves et décisions.', 'validated']
    ],
    decisionIntro: 'La première décision confirme le modèle et les responsabilités. Une seconde décision distincte valide désormais le cadre du cycle de vie sans désigner de source maîtresse ni autoriser de mesure.',
    recordLabels: {
      eyebrow: 'Registre de décision gouverné',
      author: 'Auteur de la décision',
      date: 'Date de décision',
      decision: 'Décision enregistrée',
      evidence: 'Preuve de traçabilité',
      limit: 'Portée et réserve'
    },
    record: {
      id: 'REF-01-DEC-001',
      version: 'V1.0',
      status: 'Cadre REF-01 validé',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'Le modèle Personne, Appartenance, Équipe et Responsabilité collective est retenu. Organisation & RH est propriétaire métier, IT gardien technique et la GED gardien des preuves et décisions.',
      evidence: 'Validation explicite de Cheikh dans la session du 25-08-2026 ; contrôle détaillé REF-01 V0.1 publié par la PR frontend #181 ; commit de fusion 3421921.',
      limit: 'Le principe d’un cycle de vie est retenu. Ses détails sont proposés séparément dans REF-01 V0.3 mais ne sont pas encore validés. Cette décision ne désigne aucune source maîtresse, ne valide aucune donnée personnelle, ne crée aucun compte ou droit et ne déclare aucune progression.'
    },
    lifecycleRecord: {
      id: 'REF-01-DEC-002',
      version: 'V1.0',
      status: 'Cycle REF-01 validé',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'Les six familles d’événements, les douze métadonnées minimales, les six familles de motifs et la séparation Demandeur autorisé–Organisation & RH–IT–GED sont retenues comme cadre du cycle de vie REF-01.',
      evidence: 'Validation explicite de Cheikh dans la session du 25-08-2026 ; proposition REF-01 V0.3 publiée par la PR frontend #183 ; commit de fusion ca40008.',
      limit: 'Cette validation porte sur le cadre de contrôle. Elle n’enregistre aucun événement réel, ne valide aucune donnée personnelle, ne désigne aucune source maîtresse ou schéma, n’ouvre aucune automatisation et ne calcule aucune progression.'
    },
    lifecycleTitle: 'Cycle de vie validé',
    lifecycleIntro: 'Chaque changement devient un événement daté et traçable. Un transfert clôt l’ancienne appartenance puis en ouvre une nouvelle ; il ne réécrit jamais silencieusement l’historique.',
    lifecycleColumns: { event: 'Événement', objects: 'Objet concerné', rule: 'Effet contrôlé', evidence: 'Preuve minimale retenue' },
    lifecycleEvents: [
      ['Enregistrer / créer', 'Personne ou Équipe', 'Créer un identifiant stable, un état préparé et une date d’effet ; aucune activation implicite.', 'Demande autorisée ou décision + référence GED'],
      ['Activer / affecter', 'Appartenance, Équipe ou Responsabilité collective', 'Ouvrir la relation à la date d’effet après validation métier ; l’accès M3S reste traité dans REF-02.', 'Validation Organisation & RH + pièce de fondement'],
      ['Modifier / renommer', 'Personne ou Équipe', 'Créer une nouvelle version et conserver l’ancienne valeur, le motif et la provenance.', 'Demande de correction ou décision datée'],
      ['Transférer', 'Appartenance', 'Clôturer l’appartenance précédente et en ouvrir une nouvelle sans modifier les périodes passées.', 'Décision de transfert + dates d’effet des deux liens'],
      ['Suspendre / réactiver', 'Appartenance ou Équipe', 'Interrompre ou reprendre temporairement la relation ; ne jamais supprimer la personne.', 'Autorisation datée + motif contrôlé'],
      ['Clôturer / archiver', 'Les quatre objets', 'Fermer la relation ou archiver l’objet selon sa nature, en conservant historique et preuves.', 'Acte de fin, décision ou constat autorisé + référence GED']
    ],
    lifecycleMetadataTitle: 'Trace minimale validée pour chaque événement',
    lifecycleMetadata: [
      'Identifiant de l’événement',
      'Type et identifiant de l’objet',
      'Événement et état résultant',
      'Date d’effet',
      'Horodatage de saisie',
      'Motif contrôlé',
      'Demandeur autorisé',
      'Validateur Organisation & RH',
      'Référence de preuve GED',
      'Version précédente',
      'Niveau de confidentialité',
      'Propagation technique requise ou non'
    ],
    lifecycleReasonsTitle: 'Familles de motifs validées',
    lifecycleReasons: ['Entrée institutionnelle', 'Évolution organisationnelle', 'Transfert territorial ou fonctionnel', 'Suspension temporaire', 'Fin de mandat ou de relation', 'Correction d’une erreur prouvée'],
    lifecycleReasonsNote: 'Seul le code de motif nécessaire au pilotage est exposé dans les vues globales. Le détail sensible reste dans l’espace RH autorisé et sa preuve dans la GED.',
    lifecycleRolesTitle: 'Séparation des responsabilités validée',
    lifecycleRoles: [
      ['Demandeur autorisé', 'Initie l’événement et fournit son fondement sans décider seul de son entrée en vigueur.'],
      ['Organisation & RH', 'Valide le sens métier, la date d’effet, le motif et l’état résultant.'],
      ['IT', 'Propage les effets techniques autorisés sans devenir propriétaire de l’identité ou de l’appartenance.'],
      ['GED', 'Conserve la décision et la preuve ; la référence GED est portée par l’événement.']
    ],
    lifecycleBoundary: 'Statut : cadre de contrôle validé par Cheikh le 25-08-2026. Aucun événement réel, schéma, source maîtresse, automatisation ou taux de progression n’est validé par ce lot.',
    boundary: 'Limite : ce lot ne valide ni identité civile, ni appartenance actuelle, ni mandat, ni contrat, ni rôle applicatif. Il n’ouvre aucun accès et ne publie aucun enregistrement RH-001.',
    source: 'Supports observés : contrat documentaire RH-001 en lecture seule, annuaire C2 protégé, sélecteurs Team/Agent partagés, décisions REF-01-DEC-001 et REF-01-DEC-002, et comparatif des supports publié par la PR frontend #185 au commit 6be6a4a.',
    openDirectory: 'Ouvrir l’annuaire sécurisé',
    openArchitecture: 'Examiner l’architecture RH de REF-01'
  },
  EN: {
    eyebrow: 'DETAILED CONTROL 1/11 · REF-01 · V1.18 · 26 AUG 2026',
    title: 'REF-01 · People and teams',
    body: 'This control reconciles the RH-001 directory, Team/Agent selectors and the published rules for collective responsibilities. It prepares a shared model without copying the directory, designating a master source or confusing a person, membership, team, role and M3S access.',
    counters: [
      ['Controlled axes', '5', 'Identity, structure, lifecycle, responsibility and evidence'],
      ['Validated lifecycle events', '6', 'Framework validated; implementation separate'],
      ['Personal records published', '0', 'No name, contact detail or real identifier'],
      ['Master sources retained for REF-01', '0', 'No promotion authorised by this decision']
    ],
    modelTitle: 'Validated four-object logical model',
    modelIntro: 'This functional separation is validated as a working framework. It creates no table, account or right and still requires detailed rules.',
    model: [
      ['Person', 'Institutional identity distinct from positions, teams and access.'],
      ['Membership', 'Dated link between a person, an institutional status and a team.'],
      ['Team', 'Territorial or functional operational group, such as TZH or TSN.'],
      ['Collective responsibility', 'Assignment to the whole team, distinct from an individual assignment.']
    ],
    columns: { axis: 'Axis', observed: 'Observed finding', rule: 'Candidate rule or control', status: 'State' },
    statuses: { observed: 'Observed contract', validated: 'Framework validated', candidate: 'Candidate rule', open: 'Definition open' },
    rows: [
      ['Stable identity', 'RH-001 carries a stable technical identifier and sanitised display labels.', 'Keep a non-reusable identifier; confirm civil identity, aliases and evidence separately in the authorised space.', 'observed'],
      ['Object separation', 'Directory, accounts, rights and operational selectors are already handled as separate objects.', 'Person, Membership, Team and Collective responsibility are retained; accounts and rights remain in REF-02.', 'validated'],
      ['Lifecycle', 'An active/inactive state is visible, but entry, suspension, transfer and exit are not versioned in the observed source.', 'Six event families and their minimum traceability are validated as a working framework.', 'validated'],
      ['TZH/TSN collectives', 'Forms distinguish a person from the team collective and reject impossible Team-Agent pairs.', 'Prevent a collective from resolving as a person; retain historical provenance without silent correction.', 'observed'],
      ['Ownership and evidence', 'RH-001 is a read-only C2 documentary source; mandates and evidence remain separate.', 'Organisation & HR owns business meaning; IT provides technical stewardship; the DMS retains evidence and decisions.', 'validated']
    ],
    decisionIntro: 'The first decision confirms the model and responsibilities. A separate second decision now validates the lifecycle framework without designating a master source or authorising measurement.',
    recordLabels: {
      eyebrow: 'Governed decision record',
      author: 'Decision author',
      date: 'Decision date',
      decision: 'Recorded decision',
      evidence: 'Traceability evidence',
      limit: 'Scope and reservation'
    },
    record: {
      id: 'REF-01-DEC-001',
      version: 'V1.0',
      status: 'REF-01 framework validated',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'The Person, Membership, Team and Collective responsibility model is retained. Organisation & HR is the business owner, IT the technical steward and the DMS the custodian of evidence and decisions.',
      evidence: 'Explicit validation by Cheikh in the session dated 25-08-2026; REF-01 V0.1 detailed control published through frontend PR #181; merge commit 3421921.',
      limit: 'The lifecycle principle is retained. Its details are proposed separately in REF-01 V0.3 but are not yet validated. This decision designates no master source, validates no personal data, creates no account or right and declares no progress.'
    },
    lifecycleRecord: {
      id: 'REF-01-DEC-002',
      version: 'V1.0',
      status: 'REF-01 lifecycle validated',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'The six event families, twelve minimum metadata fields, six reason families and Authorised requester–Organisation & HR–IT–DMS segregation are retained as the REF-01 lifecycle framework.',
      evidence: 'Explicit validation by Cheikh in the session dated 25-08-2026; REF-01 V0.3 proposal published through frontend PR #183; merge commit ca40008.',
      limit: 'This validation covers the control framework. It records no real event, validates no personal data, designates no master source or schema, opens no automation and calculates no progress.'
    },
    lifecycleTitle: 'Validated lifecycle',
    lifecycleIntro: 'Each change becomes a dated, traceable event. A transfer closes the previous membership and then opens a new one; it never silently rewrites history.',
    lifecycleColumns: { event: 'Event', objects: 'Affected object', rule: 'Controlled effect', evidence: 'Retained minimum evidence' },
    lifecycleEvents: [
      ['Register / create', 'Person or Team', 'Create a stable identifier, a prepared state and an effective date; no implicit activation.', 'Authorised request or decision + DMS reference'],
      ['Activate / assign', 'Membership, Team or Collective responsibility', 'Open the relationship on its effective date after business validation; M3S access remains in REF-02.', 'Organisation & HR validation + supporting basis'],
      ['Update / rename', 'Person or Team', 'Create a new version and retain the former value, reason and provenance.', 'Dated correction request or decision'],
      ['Transfer', 'Membership', 'Close the previous membership and open a new one without changing past periods.', 'Transfer decision + effective dates of both links'],
      ['Suspend / reactivate', 'Membership or Team', 'Temporarily interrupt or resume the relationship; never delete the person.', 'Dated authorisation + controlled reason'],
      ['Close / archive', 'All four objects', 'Close the relationship or archive the object according to its nature while retaining history and evidence.', 'End instrument, decision or authorised finding + DMS reference']
    ],
    lifecycleMetadataTitle: 'Validated minimum trace for each event',
    lifecycleMetadata: [
      'Event identifier',
      'Object type and identifier',
      'Event and resulting state',
      'Effective date',
      'Recording timestamp',
      'Controlled reason',
      'Authorised requester',
      'Organisation & HR validator',
      'DMS evidence reference',
      'Previous version',
      'Confidentiality level',
      'Technical propagation required or not'
    ],
    lifecycleReasonsTitle: 'Validated reason families',
    lifecycleReasons: ['Institutional entry', 'Organisational change', 'Territorial or functional transfer', 'Temporary suspension', 'End of mandate or relationship', 'Correction of a proven error'],
    lifecycleReasonsNote: 'Only the reason code needed for steering is exposed in global views. Sensitive detail remains in the authorised HR space and its evidence in the DMS.',
    lifecycleRolesTitle: 'Validated segregation of responsibilities',
    lifecycleRoles: [
      ['Authorised requester', 'Initiates the event and provides its basis without deciding alone when it takes effect.'],
      ['Organisation & HR', 'Validates business meaning, effective date, reason and resulting state.'],
      ['IT', 'Propagates authorised technical effects without owning identity or membership.'],
      ['DMS', 'Retains the decision and evidence; the DMS reference is carried by the event.']
    ],
    lifecycleBoundary: 'Status: control framework validated by Cheikh on 25 Aug 2026. This lot validates no real event, schema, master source, automation or progress rate.',
    boundary: 'Boundary: this lot validates no civil identity, current membership, mandate, contract or application role. It opens no access and publishes no RH-001 record.',
    source: 'Observed supports: read-only RH-001 documentary contract, protected C2 directory, shared Team/Agent selectors, decisions REF-01-DEC-001 and REF-01-DEC-002, and the support comparison published through frontend PR #185 at commit 6be6a4a.',
    openDirectory: 'Open the secure directory',
    openArchitecture: 'Review the REF-01 HR architecture'
  },
  DE: {
    eyebrow: 'DETAILKONTROLLE 1/11 · REF-01 · V1.18 · 26.08.2026',
    title: 'REF-01 · Personen und Teams',
    body: 'Diese Kontrolle gleicht das RH-001-Verzeichnis, die Team-/Agent-Auswahl und die veröffentlichten Regeln für kollektive Verantwortungen ab. Sie bereitet ein gemeinsames Modell vor, ohne das Verzeichnis zu kopieren, eine Masterquelle zu bestimmen oder Person, Mitgliedschaft, Team, Rolle und M3S-Zugriff zu vermischen.',
    counters: [
      ['Geprüfte Achsen', '5', 'Identität, Struktur, Lebenszyklus, Verantwortung und Nachweis'],
      ['Validierte Lebenszyklusereignisse', '6', 'Rahmen validiert; Umsetzung getrennt'],
      ['Veröffentlichte Personendaten', '0', 'Kein Name, Kontakt oder reale Kennung'],
      ['Für REF-01 festgelegte Masterquellen', '0', 'Keine Hochstufung durch diesen Entscheid']
    ],
    modelTitle: 'Validiertes logisches Vier-Objekt-Modell',
    modelIntro: 'Diese funktionale Trennung ist als Arbeitsrahmen validiert. Sie erstellt weder Tabelle, Konto noch Recht und benötigt weiterhin Detailregeln.',
    model: [
      ['Person', 'Institutionelle Identität, getrennt von Funktionen, Teams und Zugriffen.'],
      ['Mitgliedschaft', 'Datierte Verbindung zwischen Person, institutionellem Status und Team.'],
      ['Team', 'Territoriale oder funktionale operative Gruppe wie TZH oder TSN.'],
      ['Kollektive Verantwortung', 'Zuweisung an das ganze Team, getrennt von einer individuellen Zuweisung.']
    ],
    columns: { axis: 'Achse', observed: 'Beobachteter Befund', rule: 'Vorgeschlagene Regel oder Kontrolle', status: 'Stand' },
    statuses: { observed: 'Vertrag beobachtet', validated: 'Rahmen validiert', candidate: 'Regel vorgeschlagen', open: 'Definition offen' },
    rows: [
      ['Stabile Identität', 'RH-001 führt eine stabile technische Kennung und bereinigte Anzeigebezeichnungen.', 'Eine nicht wiederverwendbare Kennung beibehalten; Zivilidentität, Aliase und Nachweis getrennt im autorisierten Raum bestätigen.', 'observed'],
      ['Objekttrennung', 'Verzeichnis, Konten, Rechte und operative Auswahl werden bereits als getrennte Objekte behandelt.', 'Person, Mitgliedschaft, Team und kollektive Verantwortung sind festgehalten; Konten und Rechte bleiben in REF-02.', 'validated'],
      ['Lebenszyklus', 'Ein Aktiv-/Inaktiv-Stand ist sichtbar; Eintritt, Suspendierung, Wechsel und Austritt sind in der beobachteten Quelle nicht versioniert.', 'Sechs Ereignisfamilien und ihre minimale Rückverfolgbarkeit sind als Arbeitsrahmen validiert.', 'validated'],
      ['Kollektive TZH/TSN', 'Formulare unterscheiden Person und Teamkollektiv und weisen unmögliche Team-Agent-Kombinationen ab.', 'Verhindern, dass ein Kollektiv als Person aufgelöst wird; historische Herkunft ohne stille Korrektur bewahren.', 'observed'],
      ['Verantwortung und Nachweis', 'RH-001 ist eine schreibgeschützte C2-Dokumentationsquelle; Mandate und Nachweise bleiben getrennt.', 'Organisation & Personal trägt die Fachverantwortung; IT die technische Pflege; GED verwahrt Nachweise und Entscheide.', 'validated']
    ],
    decisionIntro: 'Der erste Entscheid bestätigt Modell und Verantwortungen. Ein getrennter zweiter Entscheid validiert nun den Lebenszyklusrahmen, ohne eine Masterquelle festzulegen oder Messung zu erlauben.',
    recordLabels: {
      eyebrow: 'Governance-konformer Entscheidnachweis',
      author: 'Entscheidautor',
      date: 'Entscheiddatum',
      decision: 'Dokumentierter Entscheid',
      evidence: 'Nachweis der Rückverfolgbarkeit',
      limit: 'Umfang und Vorbehalt'
    },
    record: {
      id: 'REF-01-DEC-001',
      version: 'V1.0',
      status: 'REF-01-Arbeitsrahmen validiert',
      author: 'Cheikh Ndiaye',
      date: '25.08.2026',
      decision: 'Das Modell Person, Mitgliedschaft, Team und kollektive Verantwortung wird festgehalten. Organisation & Personal trägt die Fachverantwortung, IT die technische Pflege und GED verwahrt Nachweise und Entscheide.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 25.08.2026; REF-01-Detailkontrolle V0.1 mit Frontend-PR #181 veröffentlicht; Merge-Commit 3421921.',
      limit: 'Das Lebenszyklusprinzip ist festgehalten. Seine Details werden getrennt in REF-01 V0.3 vorgeschlagen, sind aber noch nicht validiert. Dieser Entscheid bestimmt keine Masterquelle, validiert keine Personendaten, erstellt kein Konto oder Recht und erklärt keinen Fortschritt.'
    },
    lifecycleRecord: {
      id: 'REF-01-DEC-002',
      version: 'V1.0',
      status: 'REF-01-Lebenszyklus validiert',
      author: 'Cheikh Ndiaye',
      date: '25.08.2026',
      decision: 'Die sechs Ereignisfamilien, zwölf Mindestmetadaten, sechs Grundfamilien und die Funktionstrennung autorisierter Antragsteller–Organisation & Personal–IT–DMS werden als REF-01-Lebenszyklusrahmen festgehalten.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 25.08.2026; REF-01-Vorschlag V0.3 mit Frontend-PR #183 veröffentlicht; Merge-Commit ca40008.',
      limit: 'Diese Validierung betrifft den Kontrollrahmen. Sie erfasst kein reales Ereignis, validiert keine Personendaten, bestimmt keine Masterquelle oder Schema, öffnet keine Automatisierung und berechnet keinen Fortschritt.'
    },
    lifecycleTitle: 'Validierter Lebenszyklus',
    lifecycleIntro: 'Jede Änderung wird zu einem datierten und rückverfolgbaren Ereignis. Ein Wechsel schliesst die bisherige Mitgliedschaft und öffnet danach eine neue; die Historie wird nie still überschrieben.',
    lifecycleColumns: { event: 'Ereignis', objects: 'Betroffenes Objekt', rule: 'Kontrollierte Wirkung', evidence: 'Festgehaltener Mindestnachweis' },
    lifecycleEvents: [
      ['Erfassen / erstellen', 'Person oder Team', 'Stabile Kennung, vorbereiteten Stand und Wirksamkeitsdatum erstellen; keine implizite Aktivierung.', 'Autorisierte Anfrage oder Entscheid + DMS-Referenz'],
      ['Aktivieren / zuweisen', 'Mitgliedschaft, Team oder kollektive Verantwortung', 'Beziehung nach fachlicher Validierung zum Wirksamkeitsdatum öffnen; M3S-Zugriff bleibt in REF-02.', 'Validierung Organisation & Personal + Grundlage'],
      ['Ändern / umbenennen', 'Person oder Team', 'Neue Version erstellen und früheren Wert, Grund und Herkunft bewahren.', 'Datierte Korrekturanfrage oder Entscheid'],
      ['Wechseln', 'Mitgliedschaft', 'Bisherige Mitgliedschaft schliessen und eine neue öffnen, ohne vergangene Zeiträume zu ändern.', 'Wechselentscheid + Wirksamkeitsdaten beider Verbindungen'],
      ['Suspendieren / reaktivieren', 'Mitgliedschaft oder Team', 'Beziehung vorübergehend unterbrechen oder wieder aufnehmen; Person nie löschen.', 'Datierte Autorisierung + kontrollierter Grund'],
      ['Schliessen / archivieren', 'Alle vier Objekte', 'Beziehung schliessen oder Objekt seiner Art entsprechend archivieren und Historie sowie Nachweise bewahren.', 'Beendigungsakt, Entscheid oder autorisierter Befund + DMS-Referenz']
    ],
    lifecycleMetadataTitle: 'Validierte Mindestspur für jedes Ereignis',
    lifecycleMetadata: [
      'Ereigniskennung',
      'Objekttyp und Kennung',
      'Ereignis und resultierender Stand',
      'Wirksamkeitsdatum',
      'Erfassungszeitpunkt',
      'Kontrollierter Grund',
      'Autorisierter Antragsteller',
      'Validierung Organisation & Personal',
      'DMS-Nachweisreferenz',
      'Vorherige Version',
      'Vertraulichkeitsstufe',
      'Technische Weitergabe erforderlich oder nicht'
    ],
    lifecycleReasonsTitle: 'Validierte Grundfamilien',
    lifecycleReasons: ['Institutioneller Eintritt', 'Organisatorische Änderung', 'Territorialer oder funktionaler Wechsel', 'Vorübergehende Suspendierung', 'Ende von Mandat oder Beziehung', 'Korrektur eines belegten Fehlers'],
    lifecycleReasonsNote: 'In globalen Ansichten wird nur der für die Steuerung notwendige Grundcode angezeigt. Sensible Details bleiben im autorisierten Personalbereich und der Nachweis im DMS.',
    lifecycleRolesTitle: 'Validierte Funktionstrennung',
    lifecycleRoles: [
      ['Autorisierter Antragsteller', 'Initiiert das Ereignis und liefert seine Grundlage, ohne allein über das Inkrafttreten zu entscheiden.'],
      ['Organisation & Personal', 'Validiert fachliche Bedeutung, Wirksamkeitsdatum, Grund und resultierenden Stand.'],
      ['IT', 'Überträgt autorisierte technische Wirkungen, ohne Eigentümer von Identität oder Mitgliedschaft zu werden.'],
      ['DMS', 'Bewahrt Entscheid und Nachweis; die DMS-Referenz wird vom Ereignis getragen.']
    ],
    lifecycleBoundary: 'Status: Kontrollrahmen von Cheikh am 25.08.2026 validiert. Dieses Los validiert kein reales Ereignis, Schema, keine Masterquelle, Automatisierung oder Fortschrittsquote.',
    boundary: 'Grenze: Dieses Los validiert weder Zivilidentität, aktuelle Mitgliedschaft, Mandat, Vertrag noch Anwendungsrolle. Es öffnet keinen Zugriff und veröffentlicht keinen RH-001-Datensatz.',
    source: 'Beobachtete Träger: schreibgeschützter RH-001-Dokumentationsvertrag, geschütztes C2-Verzeichnis, gemeinsame Team-/Agent-Auswahl, REF-01-DEC-001 und REF-01-DEC-002 sowie der mit Frontend-PR #185 am Commit 6be6a4a veröffentlichte Trägervergleich.',
    openDirectory: 'Sicheres Verzeichnis öffnen',
    openArchitecture: 'REF-01-Personalarchitektur prüfen'
  }
};

const StatusBadge = ({ status, label }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {label}
  </span>
);

const InstitutionalPeopleTeamsReferenceControl = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const returnContext = 'returnTo=dashboard&dashboardView=program&dashboardSection=institutional-ref01-people-teams-control';

  return (
    <section id="institutional-ref01-people-teams-control" className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-people-teams-control-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h5 id="institutional-ref01-people-teams-control-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <ShieldCheck className="shrink-0 text-cyan-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = [BadgeCheck, CalendarClock, UserRoundCheck, ShieldCheck][index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 0 ? 'text-cyan-300' : 'text-amber-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3">
        <div className="flex items-center gap-2"><Network className="text-cyan-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.modelTitle}</h6></div>
        <p className="mt-2 text-xs leading-5 text-slate-400">{t.modelIntro}</p>
        <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {t.model.map(([label, description], index) => (
            <li key={label} className="rounded-md border border-slate-700 p-3">
              <p className="text-xs font-semibold text-cyan-300">{index + 1}</p>
              <h6 className="mt-1 text-sm font-semibold text-slate-100">{label}</h6>
              <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="m3s-ref01-decision mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-4">
        <div className="flex items-center gap-2"><ShieldCheck className="text-emerald-300" size={18} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{t.decisionIntro}</p></div>
        <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      </div>

      <div className="m3s-ref01-lifecycle mt-4 rounded-md border border-sky-800/70 bg-sky-950/10 p-4">
        <div className="flex items-start gap-3">
          <CalendarClock className="mt-0.5 shrink-0 text-sky-300" size={20} aria-hidden="true" />
          <div>
            <h6 className="text-sm font-semibold text-slate-100">{t.lifecycleTitle}</h6>
            <p className="mt-1 text-sm leading-6 text-slate-300">{t.lifecycleIntro}</p>
          </div>
        </div>

        <div className="m3s-ref01-decision">
          <GovernedDecisionRecord labels={t.recordLabels} record={t.lifecycleRecord} />
        </div>

        <div className="mt-4 hidden overflow-x-auto border-y border-slate-700 md:block">
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
            <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
              <tr>
                <th className="px-3 py-3 font-semibold">{t.lifecycleColumns.event}</th>
                <th className="px-3 py-3 font-semibold">{t.lifecycleColumns.objects}</th>
                <th className="px-3 py-3 font-semibold">{t.lifecycleColumns.rule}</th>
                <th className="px-3 py-3 font-semibold">{t.lifecycleColumns.evidence}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-950/15">
              {t.lifecycleEvents.map(([event, objects, rule, evidence]) => (
                <tr key={event} className="align-top">
                  <th scope="row" className="px-3 py-3 font-semibold text-sky-200">{event}</th>
                  <td className="px-3 py-3 leading-5 text-slate-300">{objects}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{rule}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
          {t.lifecycleEvents.map(([event, objects, rule, evidence], index) => (
            <article key={event} className="border-t border-slate-700 pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-900/70 text-xs font-semibold text-sky-100">{index + 1}</span>
                <div>
                  <h6 className="text-sm font-semibold text-slate-100">{event}</h6>
                  <p className="mt-1 text-xs font-semibold text-sky-200">{objects}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-5 text-slate-300">{rule}</p>
              <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-400"><FileCheck2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{evidence}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-slate-700 pt-4 xl:grid-cols-2">
          <section aria-labelledby="ref01-lifecycle-metadata-title">
            <div className="flex items-center gap-2"><FileCheck2 className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-lifecycle-metadata-title" className="text-sm font-semibold text-slate-100">{t.lifecycleMetadataTitle}</h6></div>
            <ol className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {t.lifecycleMetadata.map((field, index) => (
                <li key={field} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><span className="font-semibold text-cyan-300">{index + 1}.</span>{field}</li>
              ))}
            </ol>
          </section>

          <div className="space-y-5">
            <section aria-labelledby="ref01-lifecycle-reasons-title">
              <div className="flex items-center gap-2"><GitBranch className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-lifecycle-reasons-title" className="text-sm font-semibold text-slate-100">{t.lifecycleReasonsTitle}</h6></div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.lifecycleReasons.map((reason) => <li key={reason} className="rounded-md border border-amber-800/70 bg-amber-950/20 px-2 py-1 text-xs font-semibold text-amber-100">{reason}</li>)}
              </ul>
              <p className="mt-3 text-xs leading-5 text-slate-400">{t.lifecycleReasonsNote}</p>
            </section>

            <section className="border-t border-slate-700 pt-4" aria-labelledby="ref01-lifecycle-roles-title">
              <div className="flex items-center gap-2"><UserCog className="text-violet-300" size={18} aria-hidden="true" /><h6 id="ref01-lifecycle-roles-title" className="text-sm font-semibold text-slate-100">{t.lifecycleRolesTitle}</h6></div>
              <dl className="mt-3 space-y-2">
                {t.lifecycleRoles.map(([role, responsibility]) => (
                  <div key={role} className="grid grid-cols-1 gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
                    <dt className="text-xs font-semibold text-violet-200">{role}</dt>
                    <dd className="text-xs leading-5 text-slate-300">{responsibility}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.lifecycleBoundary}</p>
      </div>

      <InstitutionalPeopleTeamsSourceControl language={language} />

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 md:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.axis}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.observed}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.rule}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.rows.map(([axis, observed, rule, status]) => (
              <tr key={axis} className="align-top">
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{axis}</th>
                <td className="px-3 py-3 leading-5 text-slate-300">{observed}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{rule}</td>
                <td className="px-3 py-3"><StatusBadge status={status} label={t.statuses[status]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
        {t.rows.map(([axis, observed, rule, status]) => (
          <article key={axis} className="m3s-raised p-3">
            <div className="flex flex-wrap items-start justify-between gap-2"><h6 className="text-sm font-semibold text-slate-100">{axis}</h6><StatusBadge status={status} label={t.statuses[status]} /></div>
            <p className="mt-3 text-sm leading-5 text-slate-300">{observed}</p>
            <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{rule}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={16} aria-hidden="true" />{t.boundary}</p>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => onNavigate(`/rh?tab=directory&${returnContext}#members-directory-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"><UsersRound size={16} aria-hidden="true" />{t.openDirectory}<ArrowRight size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => onNavigate(`/rh?tab=architecture&${returnContext}#rh-architecture-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"><Network size={16} aria-hidden="true" />{t.openArchitecture}</button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalPeopleTeamsReferenceControl;
