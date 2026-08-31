import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardCheck, Inbox, ListChecks, LockKeyhole, SendHorizontal, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import { INBOX_PILOT_EXECUTION } from './institutionalM3SInboxPilot';

const COPY = {
  FR: {
    eyebrow: 'CADRE CONFIRMÉ · M3S-INB-001 · V1.0 · 30-08-2026',
    title: 'Boîte d’entrée M3S · un cadre confirmé, encore vide et non opérationnel',
    intro: 'DEC-073 confirme le cadre en lecture seule qui doit, à terme, transformer chaque e-mail, document, média ou demande autorisée en élément à qualifier puis à rattacher. Aucun registre réel n’est alimenté tant que le backend, les droits et la GED ne sont pas raccordés et autorisés séparément.',
    counters: [['Cadre confirmé', '1/1', 'Structure documentaire uniquement'], ['Entrées réelles', '0', 'Aucune donnée traitée'], ['Imports actifs', '0', 'Aucun connecteur'], ['Automatisations', '0', 'Aucun traitement silencieux']],
    fieldsTitle: 'Champs minimaux gouvernés',
    fields: ['Source et canal', 'Date de réception', 'Catégorie et sensibilité', 'Portefeuille, dossier, projet et tâche', 'Fonction propriétaire', 'Responsable autorisé', 'Statut et prochaine action', 'Échéance', 'Preuve ou lien GED', 'Empreinte anti-doublon'],
    statesTitle: 'Cycle de traitement',
    states: ['Reçu', 'À qualifier', 'Affecté', 'Planifié', 'Traité', 'Archivé'],
    fastTrack: 'Traitement Fast Track',
    fastTrackBody: 'Les entrées homogènes sont regroupées par lot ; seules les exceptions, doublons, sensibilités élevées ou affectations incertaines sont soumises à décision humaine.',
    allowed: 'Préparation suivante permise',
    allowedBody: 'Cadrer un pilote à données fictives ; toute saisie réelle ou dépôt sécurisé exigera une autorisation technique et humaine distincte.',
    boundariesTitle: 'Frontières avant mise en service',
    boundaries: ['Aucune lecture automatique de WhatsApp.', 'Aucun import automatique des e-mails.', 'Aucune donnée personnelle réelle intégrée au bundle frontend.', 'Backend, RBAC et GED requis avant toute automatisation.', 'Aucun compteur affiché avant disponibilité d’une source fiable.'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-076', version: 'V1.0', status: 'GO limité confirmé · pilote fictif', author: 'Cheikh Ndiaye', date: '31-08-2026', decision: 'Le GO limité au pilote fictif M3S-INB-002 V1.0 est confirmé pour les six cas prévus, selon les garde-fous établis, sans ouverture opérationnelle ni L2.', evidence: 'Confirmation explicite de Cheikh dans la session du 31-08-2026 : « Je confirme le GO limité au pilote fictif M3S-INB-002 V1.0 pour les six cas prévus, selon les garde-fous établis, sans ouverture opérationnelle ni L2. »', limit: 'Le GO autorise uniquement six cas synthétiques en mémoire. Il n’autorise aucune donnée réelle, connexion, import, automatisme, persistance opérationnelle, accès, dépense, production ou action L2.' },
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'M3S-INB-003 V1.1 enregistre le GO limité. Les six cas de M3S-INB-002 V1.0 sont autorisés dans le seul bac à sable synthétique.',
    nextTitle: 'Prochaine revue humaine',
    next: 'Relire les six résultats synthétiques et décider séparément de leur acceptation. Aucun lot réel ou L2 n’est ouvert par cette exécution.',
    pilotEyebrow: 'PROTOCOLE CONFIRMÉ · M3S-INB-002 · V1.0 · 31-08-2026',
    pilotTitle: 'Pilote synthétique isolé · six cas exécutés, relecture ouverte',
    pilotVersion: 'V1.0 · 6/6',
    pilotIntro: 'Le pilote vérifie le modèle de qualification avec six cas entièrement fictifs. L’exécution est déterministe, locale, réinitialisée après contrôle, sans persistance opérationnelle ni canal externe.',
    pilotCounters: [['Cas fictifs exécutés', '6/6', 'Tous réussis techniquement'], ['Personnes réelles', '0', 'Noms et coordonnées interdits'], ['Sources connectées', '0', 'Entrées synthétiques uniquement'], ['Automatismes', '0', 'Aucun traitement externe']],
    scenariosTitle: 'Jeu de contrôle fictif',
    scenarios: ['E-mail interne fictif à qualifier', 'Document fictif à rattacher', 'Média de chantier fictif à classer', 'Demande fictive avec échéance', 'Doublon fictif à signaler', 'Entrée fictive restreinte à bloquer'],
    stepsTitle: 'Parcours manuel proposé',
    steps: ['Créer le cas fictif dans un espace isolé', 'Contrôler les dix champs obligatoires', 'Qualifier catégorie et sensibilité', 'Rattacher à une hiérarchie entièrement fictive', 'Faire progresser le cas dans les six statuts', 'Contrôler la trace puis réinitialiser le jeu'],
    criteriaTitle: 'Critères de réussite avant tout autre lot',
    criteria: ['6/6 cas fictifs traités sans donnée réelle', 'Champs obligatoires contrôlés avant changement de statut', 'Doublon détecté sans créer un second élément', 'Cas restreint bloqué et orienté vers un dépôt sécurisé simulé', 'Aucun appel réseau, import, connecteur, automatisme ou stockage réel', 'Résultats relus humainement et consignés comme preuve de test'],
    stopTitle: 'Arrêt immédiat',
    stop: 'Toute donnée réelle, identité, pièce sensible, canal connecté ou persistance opérationnelle arrête le pilote et exige une décision séparée.',
    pilotDecisionTitle: 'Décision enregistrée · GO limité',
    pilotDecision: 'REF-01-DEC-076 autorise uniquement l’exécution des six cas fictifs de M3S-INB-002 V1.0. Toute donnée réelle ou capacité opérationnelle reste interdite.',
    pilotVerdict: 'STATUT · EXÉCUTION SYNTHÉTIQUE TERMINÉE. 6/6 cas réussis, 5/5 critères techniques vérifiés, zéro donnée réelle et relecture humaine ouverte.',
    criteriaLabels: { passed: 'Vérifié', pending: 'Relecture ouverte' },
    resultsEyebrow: 'PREUVE TECHNIQUE SYNTHÉTIQUE · M3S-INB-002 · 31-08-2026',
    resultsTitle: 'Six cas exécutés puis mémoire réinitialisée',
    resultsIntro: 'Les résultats ci-dessous proviennent du moteur local en mémoire. Ils constituent une preuve de test candidate, pas un registre opérationnel.',
    resultCounterLabels: [['Cas exécutés', 'Périmètre autorisé'], ['Cas réussis', 'Contrôles techniques'], ['Données réelles', 'Frontière respectée'], ['Éléments persistés', 'Après réinitialisation']],
    resultLabels: { passed: 'Réussi', fields: 'Champs contrôlés', outcome: 'Résultat' },
    resultOutcomes: { 'cycle-completed': 'Cycle complet et archivé', 'duplicate-blocked': 'Doublon bloqué sans seconde création', 'restricted-blocked': 'Entrée bloquée vers le dépôt simulé' },
    reviewPending: 'RELECTURE HUMAINE · Les résultats techniques sont disponibles, mais leur acceptation reste à confirmer avant tout autre lot.',
    gateEyebrow: 'FICHE DÉCIDÉE · M3S-INB-003 · V1.1 · 31-08-2026',
    gateTitle: 'Décision GO/NO-GO · GO limité enregistré',
    gateVersion: 'V1.1 · GO LIMITÉ',
    gateIntro: 'La fiche enregistre le seul GO autorisé : tester six cas fictifs en mémoire, sans aucune ouverture opérationnelle.',
    gateCounters: [['Options sélectionnées', '1/2', 'GO limité'], ['Cas autorisés', '6/6', 'Périmètre fictif uniquement'], ['Cas exécutés', '6/6', 'Relecture humaine ouverte'], ['Actions L2', '0', 'G1 reste ouverte']],
    gateFieldsTitle: 'Champs de décision renseignés',
    gateFields: [['Décision', 'GO limité'], ['Auteur et date', 'Cheikh Ndiaye · 31-08-2026'], ['Conditions préalables', 'INB-001, INB-002 et INB-003 confirmés'], ['Périmètre autorisé', 'Six cas fictifs en mémoire uniquement'], ['Preuves examinées', 'Protocole, garde-fous et cinq tests techniques'], ['Risques et retour arrière', 'Arrêt immédiat et remise à zéro']],
    gateRule: 'RÈGLE · Ce GO ne vaut ni mise en service ni ouverture L2. La relecture humaine des résultats reste obligatoire avant tout lot suivant.',
    verdict: 'STATUT · GO LIMITÉ EXÉCUTÉ EN BAC À SABLE. Zéro entrée réelle, import, connecteur, persistance ou action L2.'
  },
  EN: {
    eyebrow: 'CONFIRMED FRAMEWORK · M3S-INB-001 · V1.0 · 30 AUG 2026',
    title: 'M3S Inbox · a confirmed framework that remains empty and non-operational',
    intro: 'DEC-073 confirms the read-only framework intended to turn each authorised email, document, media item or request into an item to qualify and attach. No real register is populated until the backend, permissions and DMS are connected and separately authorised.',
    counters: [['Confirmed framework', '1/1', 'Documentary structure only'], ['Real entries', '0', 'No data processed'], ['Active imports', '0', 'No connector'], ['Automations', '0', 'No silent processing']],
    fieldsTitle: 'Minimum governed fields',
    fields: ['Source and channel', 'Received date', 'Category and sensitivity', 'Portfolio, file, project and task', 'Owning function', 'Authorised owner', 'Status and next action', 'Due date', 'Evidence or DMS link', 'Duplicate fingerprint'],
    statesTitle: 'Processing cycle',
    states: ['Received', 'To qualify', 'Assigned', 'Planned', 'Processed', 'Archived'],
    fastTrack: 'Fast Track processing',
    fastTrackBody: 'Homogeneous entries are grouped; only exceptions, duplicates, high sensitivity or uncertain assignments require a human decision.',
    allowed: 'Permitted next preparation',
    allowedBody: 'Frame a fictional-data pilot; any real entry or secure upload requires separate technical and human authorisation.',
    boundariesTitle: 'Boundaries before activation',
    boundaries: ['No automated WhatsApp reading.', 'No automated email import.', 'No real personal data in the frontend bundle.', 'Backend, RBAC and DMS required before automation.', 'No counter displayed before a reliable source exists.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-076', version: 'V1.0', status: 'Limited GO confirmed · fictional pilot', author: 'Cheikh Ndiaye', date: '31 Aug 2026', decision: 'The limited GO for the M3S-INB-002 V1.0 fictional pilot is confirmed for the six planned cases under the established safeguards, without operational or L2 opening.', evidence: 'Cheikh’s explicit confirmation in the 31 Aug 2026 session: “I confirm the limited GO for the M3S-INB-002 V1.0 fictional pilot for the six planned cases, under the established safeguards, without operational or L2 opening.”', limit: 'The GO authorises only six synthetic in-memory cases. It authorises no real data, connection, import, automation, operational persistence, access, expense, production or L2 action.' },
    decisionTitle: 'Fast Track decision outcome',
    decision: 'M3S-INB-003 V1.1 records the limited GO. The six M3S-INB-002 V1.0 cases are authorised only in the synthetic sandbox.',
    nextTitle: 'Next human review',
    next: 'Review the six synthetic results and decide separately whether to accept them. This execution opens no real or L2 package.',
    pilotEyebrow: 'CONFIRMED PROTOCOL · M3S-INB-002 · V1.0 · 31 AUG 2026',
    pilotTitle: 'Isolated synthetic pilot · six cases run, review open',
    pilotVersion: 'V1.0 · 6/6',
    pilotIntro: 'The pilot checks the qualification model with six entirely fictional cases. Execution is deterministic, local and reset after control, with no operational persistence or external channel.',
    pilotCounters: [['Fictional cases run', '6/6', 'All technically successful'], ['Real people', '0', 'Names and contact details prohibited'], ['Connected sources', '0', 'Synthetic entries only'], ['Automations', '0', 'No external processing']],
    scenariosTitle: 'Fictional control dataset',
    scenarios: ['Fictional internal email to qualify', 'Fictional document to attach', 'Fictional worksite media to classify', 'Fictional request with a due date', 'Fictional duplicate to flag', 'Restricted fictional entry to block'],
    stepsTitle: 'Proposed manual path',
    steps: ['Create the fictional case in an isolated space', 'Check the ten mandatory fields', 'Qualify category and sensitivity', 'Attach to a fully fictional hierarchy', 'Move the case through all six statuses', 'Check the trace, then reset the dataset'],
    criteriaTitle: 'Success criteria before any further package',
    criteria: ['6/6 fictional cases processed without real data', 'Mandatory fields checked before status changes', 'Duplicate detected without creating a second item', 'Restricted case blocked and routed to a simulated secure deposit', 'No network call, import, connector, automation or real storage', 'Results reviewed by a human and recorded as test evidence'],
    stopTitle: 'Immediate stop',
    stop: 'Any real data, identity, sensitive record, connected channel or operational persistence stops the pilot and requires a separate decision.',
    pilotDecisionTitle: 'Recorded decision · limited GO',
    pilotDecision: 'REF-01-DEC-076 authorises only the six fictional M3S-INB-002 V1.0 cases. Any real data or operational capability remains prohibited.',
    pilotVerdict: 'STATUS · SYNTHETIC EXECUTION COMPLETE. 6/6 cases passed, 5/5 technical criteria verified, zero real data and human review open.',
    criteriaLabels: { passed: 'Verified', pending: 'Review open' },
    resultsEyebrow: 'SYNTHETIC TECHNICAL EVIDENCE · M3S-INB-002 · 31 AUG 2026',
    resultsTitle: 'Six cases run and memory reset',
    resultsIntro: 'The results below come from the local in-memory engine. They are candidate test evidence, not an operational register.',
    resultCounterLabels: [['Cases run', 'Authorised scope'], ['Cases passed', 'Technical checks'], ['Real data', 'Boundary respected'], ['Persisted items', 'After reset']],
    resultLabels: { passed: 'Passed', fields: 'Fields checked', outcome: 'Outcome' },
    resultOutcomes: { 'cycle-completed': 'Full cycle completed and archived', 'duplicate-blocked': 'Duplicate blocked without second creation', 'restricted-blocked': 'Entry blocked to simulated secure hold' },
    reviewPending: 'HUMAN REVIEW · Technical results are available, but their acceptance remains to be confirmed before any further package.',
    gateEyebrow: 'DECIDED FORM · M3S-INB-003 · V1.1 · 31 AUG 2026',
    gateTitle: 'GO/NO-GO decision · limited GO recorded',
    gateVersion: 'V1.1 · LIMITED GO',
    gateIntro: 'The form records the only authorised GO: test six fictional in-memory cases with no operational opening.',
    gateCounters: [['Selected options', '1/2', 'Limited GO'], ['Authorised cases', '6/6', 'Fictional scope only'], ['Cases run', '6/6', 'Human review open'], ['L2 actions', '0', 'G1 remains open']],
    gateFieldsTitle: 'Completed decision fields',
    gateFields: [['Decision', 'Limited GO'], ['Author and date', 'Cheikh Ndiaye · 31 Aug 2026'], ['Prerequisites', 'INB-001, INB-002 and INB-003 confirmed'], ['Authorised scope', 'Six fictional in-memory cases only'], ['Evidence reviewed', 'Protocol, safeguards and five technical tests'], ['Risks and rollback', 'Immediate stop and full reset']],
    gateRule: 'RULE · This GO is neither activation nor L2 opening. Human review of the results remains mandatory before any further package.',
    verdict: 'STATUS · LIMITED GO RUN IN THE SANDBOX. Zero real entries, imports, connectors, persistence or L2 actions.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER RAHMEN · M3S-INB-001 · V1.0 · 30.08.2026',
    title: 'M3S-Eingang · bestätigter, weiterhin leerer und nicht operativer Rahmen',
    intro: 'DEC-073 bestätigt den schreibgeschützten Rahmen, der später jede autorisierte E-Mail, jedes Dokument, Medium oder Anliegen zu einem zu qualifizierenden und zuzuordnenden Eintrag machen soll. Kein reales Register wird befüllt, bevor Backend, Berechtigungen und DMS verbunden und getrennt autorisiert sind.',
    counters: [['Bestätigter Rahmen', '1/1', 'Nur dokumentarische Struktur'], ['Reale Eingänge', '0', 'Keine Daten verarbeitet'], ['Aktive Importe', '0', 'Kein Connector'], ['Automatisierungen', '0', 'Keine stille Bearbeitung']],
    fieldsTitle: 'Minimale gesteuerte Felder',
    fields: ['Quelle und Kanal', 'Eingangsdatum', 'Kategorie und Sensibilität', 'Portfolio, Dossier, Projekt und Aufgabe', 'Verantwortliche Funktion', 'Autorisierte Zuständigkeit', 'Status und nächste Aktion', 'Fälligkeit', 'Nachweis oder DMS-Link', 'Duplikat-Fingerabdruck'],
    statesTitle: 'Bearbeitungszyklus',
    states: ['Eingegangen', 'Zu qualifizieren', 'Zugewiesen', 'Geplant', 'Bearbeitet', 'Archiviert'],
    fastTrack: 'Fast-Track-Bearbeitung',
    fastTrackBody: 'Homogene Eingänge werden gebündelt; nur Ausnahmen, Duplikate, hohe Sensibilität oder unklare Zuweisungen benötigen einen menschlichen Entscheid.',
    allowed: 'Erlaubte nächste Vorbereitung',
    allowedBody: 'Einen Pilot mit fiktiven Daten einrahmen; jede reale Erfassung oder sichere Ablage benötigt eine getrennte technische und menschliche Autorisierung.',
    boundariesTitle: 'Grenzen vor Inbetriebnahme',
    boundaries: ['Kein automatisches Lesen von WhatsApp.', 'Kein automatischer E-Mail-Import.', 'Keine realen Personendaten im Frontend-Bundle.', 'Backend, RBAC und DMS vor jeder Automatisierung erforderlich.', 'Kein Zähler ohne verlässliche Quelle.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-076', version: 'V1.0', status: 'Begrenztes GO bestätigt · fiktiver Pilot', author: 'Cheikh Ndiaye', date: '31.08.2026', decision: 'Das begrenzte GO für den fiktiven Piloten M3S-INB-002 V1.0 wird für die sechs vorgesehenen Fälle unter den festgelegten Schutzregeln ohne operative oder L2-Öffnung bestätigt.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 31.08.2026: „Ich bestätige das begrenzte GO für den fiktiven Piloten M3S-INB-002 V1.0 für die sechs vorgesehenen Fälle, nach den festgelegten Schutzregeln, ohne operative oder L2-Öffnung.“', limit: 'Das GO autorisiert nur sechs synthetische Fälle im Arbeitsspeicher. Es erlaubt keine realen Daten, Verbindung, Importe, Automatismen, operative Speicherung, Zugriffe, Ausgaben, Produktion oder L2-Aktion.' },
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'M3S-INB-003 V1.1 erfasst das begrenzte GO. Die sechs Fälle von M3S-INB-002 V1.0 sind nur im synthetischen Sandkasten autorisiert.',
    nextTitle: 'Nächste menschliche Prüfung',
    next: 'Die sechs synthetischen Ergebnisse prüfen und getrennt über ihre Annahme entscheiden. Diese Ausführung öffnet kein reales oder L2-Los.',
    pilotEyebrow: 'BESTÄTIGTES PROTOKOLL · M3S-INB-002 · V1.0 · 31.08.2026',
    pilotTitle: 'Isolierter synthetischer Pilot · sechs Fälle ausgeführt, Prüfung offen',
    pilotVersion: 'V1.0 · 6/6',
    pilotIntro: 'Der Pilot prüft das Qualifikationsmodell mit sechs vollständig fiktiven Fällen. Die Ausführung ist deterministisch, lokal und nach der Kontrolle zurückgesetzt, ohne operative Speicherung oder externen Kanal.',
    pilotCounters: [['Fiktive Fälle ausgeführt', '6/6', 'Alle technisch erfolgreich'], ['Reale Personen', '0', 'Namen und Kontaktdaten verboten'], ['Verbundene Quellen', '0', 'Nur synthetische Eingänge'], ['Automatismen', '0', 'Keine externe Verarbeitung']],
    scenariosTitle: 'Fiktiver Kontrolldatensatz',
    scenarios: ['Fiktive interne E-Mail zur Qualifizierung', 'Fiktives Dokument zur Zuordnung', 'Fiktives Baustellenmedium zur Klassierung', 'Fiktive Anfrage mit Fälligkeit', 'Fiktives Duplikat zur Markierung', 'Eingeschränkter fiktiver Eintrag zur Sperrung'],
    stepsTitle: 'Vorgeschlagener manueller Ablauf',
    steps: ['Fiktiven Fall in einem isolierten Bereich erstellen', 'Die zehn Pflichtfelder prüfen', 'Kategorie und Sensibilität qualifizieren', 'Einer vollständig fiktiven Hierarchie zuordnen', 'Den Fall durch alle sechs Status führen', 'Spur prüfen und Datensatz zurücksetzen'],
    criteriaTitle: 'Erfolgskriterien vor jedem weiteren Paket',
    criteria: ['6/6 fiktive Fälle ohne reale Daten bearbeitet', 'Pflichtfelder vor Statusänderung geprüft', 'Duplikat erkannt, ohne ein zweites Element zu erstellen', 'Eingeschränkter Fall gesperrt und zu einer simulierten sicheren Ablage geführt', 'Kein Netzwerkaufruf, Import, Connector, Automatismus oder reale Speicherung', 'Ergebnisse menschlich geprüft und als Testnachweis protokolliert'],
    stopTitle: 'Sofortiger Stopp',
    stop: 'Reale Daten, Identitäten, sensible Unterlagen, verbundene Kanäle oder operative Persistenz stoppen den Piloten und erfordern einen getrennten Entscheid.',
    pilotDecisionTitle: 'Erfasster Entscheid · begrenztes GO',
    pilotDecision: 'REF-01-DEC-076 autorisiert nur die sechs fiktiven Fälle von M3S-INB-002 V1.0. Reale Daten oder operative Fähigkeiten bleiben verboten.',
    pilotVerdict: 'STATUS · SYNTHETISCHE AUSFÜHRUNG BEENDET. 6/6 Fälle erfolgreich, 5/5 technische Kriterien geprüft, null reale Daten und menschliche Prüfung offen.',
    criteriaLabels: { passed: 'Geprüft', pending: 'Prüfung offen' },
    resultsEyebrow: 'SYNTHETISCHER TECHNISCHER NACHWEIS · M3S-INB-002 · 31.08.2026',
    resultsTitle: 'Sechs Fälle ausgeführt und Speicher zurückgesetzt',
    resultsIntro: 'Die folgenden Ergebnisse stammen aus dem lokalen In-Memory-Modul. Sie sind Kandidaten-Testnachweise, kein operatives Register.',
    resultCounterLabels: [['Ausgeführte Fälle', 'Autorisierter Umfang'], ['Erfolgreiche Fälle', 'Technische Kontrollen'], ['Reale Daten', 'Grenze eingehalten'], ['Persistierte Elemente', 'Nach Rücksetzung']],
    resultLabels: { passed: 'Erfolgreich', fields: 'Geprüfte Felder', outcome: 'Ergebnis' },
    resultOutcomes: { 'cycle-completed': 'Vollständiger Zyklus und archiviert', 'duplicate-blocked': 'Duplikat ohne zweite Erstellung gesperrt', 'restricted-blocked': 'Eintrag zur simulierten sicheren Ablage gesperrt' },
    reviewPending: 'MENSCHLICHE PRÜFUNG · Die technischen Ergebnisse liegen vor, ihre Annahme bleibt jedoch vor jedem weiteren Los zu bestätigen.',
    gateEyebrow: 'ENTSCHIEDENES BLATT · M3S-INB-003 · V1.1 · 31.08.2026',
    gateTitle: 'GO/NO-GO-Entscheid · begrenztes GO erfasst',
    gateVersion: 'V1.1 · BEGRENZTES GO',
    gateIntro: 'Das Blatt erfasst das einzige autorisierte GO: sechs fiktive Fälle im Arbeitsspeicher ohne operative Öffnung testen.',
    gateCounters: [['Gewählte Optionen', '1/2', 'Begrenztes GO'], ['Autorisierte Fälle', '6/6', 'Nur fiktiver Umfang'], ['Ausgeführte Fälle', '6/6', 'Menschliche Prüfung offen'], ['L2-Aktionen', '0', 'G1 bleibt offen']],
    gateFieldsTitle: 'Ausgefüllte Entscheidfelder',
    gateFields: [['Entscheid', 'Begrenztes GO'], ['Autor und Datum', 'Cheikh Ndiaye · 31.08.2026'], ['Voraussetzungen', 'INB-001, INB-002 und INB-003 bestätigt'], ['Autorisierter Umfang', 'Nur sechs fiktive In-Memory-Fälle'], ['Geprüfte Nachweise', 'Protokoll, Schutzregeln und fünf technische Tests'], ['Risiken und Rückkehr', 'Sofortiger Stopp und vollständige Rücksetzung']],
    gateRule: 'REGEL · Dieses GO ist weder Inbetriebnahme noch L2-Öffnung. Die menschliche Prüfung der Ergebnisse bleibt vor jedem weiteren Los zwingend.',
    verdict: 'STATUS · BEGRENZTES GO IM SANDKASTEN AUSGEFÜHRT. Null reale Eingänge, Importe, Connectoren, Speicherung oder L2-Aktionen.'
  }
};

const InstitutionalM3SInboxFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const execution = INBOX_PILOT_EXECUTION;
  const resultValues = [
    `${execution.summary.executed}/${execution.summary.authorised}`,
    `${execution.summary.passed}/${execution.summary.executed}`,
    String(execution.summary.realDataItems),
    String(execution.summary.storeSizeAfterReset)
  ];
  return (
    <section id="institutional-m3s-inbox-frame" data-testid="institutional-m3s-inbox-frame" className="scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-200"><Inbox size={16} aria-hidden="true" />{t.states[0]}</span></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <ShieldCheck className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.fieldsTitle}</h5><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{t.fields.map(field => <div key={field} className="flex min-h-10 items-center gap-2 rounded-md border border-slate-700 bg-slate-950/20 px-3 py-2 text-xs text-slate-300"><CheckCircle2 className="shrink-0 text-violet-300" size={15} aria-hidden="true" />{field}</div>)}</div></article>
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.statesTitle}</h5><ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{t.states.map((state, index) => <li key={state} className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><span className="text-xs font-semibold text-violet-300">{index + 1}</span><p className="mt-1 text-xs font-semibold text-slate-200">{state}</p></li>)}</ol><div className="mt-3 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3"><h5 className="text-sm font-semibold text-emerald-100">{t.fastTrack}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.fastTrackBody}</p></div><div className="mt-3 flex items-start gap-2 rounded-md border border-blue-800/70 bg-blue-950/15 p-3"><ShieldCheck className="mt-0.5 shrink-0 text-blue-300" size={17} aria-hidden="true" /><div><h5 className="text-xs font-semibold text-blue-100">{t.allowed}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.allowedBody}</p></div></div></article>
      </div>
      <div className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3"><div className="flex items-center gap-2"><LockKeyhole className="text-amber-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-amber-100">{t.boundariesTitle}</h5></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.boundaries.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3"><div className="flex items-center gap-2"><SendHorizontal className="text-violet-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.decision}</p></div>
      <div className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3"><div className="flex items-center gap-2"><SendHorizontal className="text-sky-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-sky-100">{t.nextTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-sky-100">{t.next}</p></div>
      <section data-testid="institutional-m3s-inbox-pilot-spec" className="m3s-inbox-pilot-spec mt-4 rounded-md border border-sky-800/70 bg-sky-950/10 p-3 sm:p-4" aria-labelledby="institutional-m3s-inbox-pilot-title">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.pilotEyebrow}</p><h5 id="institutional-m3s-inbox-pilot-title" className="mt-1 text-base font-semibold text-slate-100 sm:text-lg">{t.pilotTitle}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.pilotIntro}</p></div><span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-amber-700/70 bg-amber-950/25 px-3 py-2 text-xs font-semibold text-amber-100"><ClipboardCheck size={16} aria-hidden="true" />{t.pilotVersion}</span></div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.pilotCounters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <article className="m3s-raised p-3 sm:p-4"><div className="flex items-center gap-2"><Inbox className="text-sky-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.scenariosTitle}</h6></div><ol className="mt-3 space-y-2">{t.scenarios.map((scenario, index) => <li key={scenario} className="flex min-h-10 items-center gap-3 rounded-md border border-slate-700 bg-slate-950/20 px-3 py-2 text-xs text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-950/60 font-semibold text-sky-200">{index + 1}</span>{scenario}</li>)}</ol></article>
          <article className="m3s-raised p-3 sm:p-4"><div className="flex items-center gap-2"><ListChecks className="text-violet-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.stepsTitle}</h6></div><ol className="mt-3 space-y-2">{t.steps.map((step, index) => <li key={step} className="flex min-h-10 items-center gap-3 rounded-md border border-slate-700 bg-slate-950/20 px-3 py-2 text-xs text-slate-300"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-950/60 font-semibold text-violet-200">{index + 1}</span>{step}</li>)}</ol></article>
        </div>
        <article className="m3s-raised mt-4 p-3 sm:p-4"><h6 className="text-sm font-semibold text-slate-100">{t.criteriaTitle}</h6><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.criteria.map((item, index) => { const passed = index < execution.summary.technicalCriteriaPassed; return <li key={item} className="flex items-start gap-2 rounded-md border border-slate-700 bg-slate-950/20 p-3 text-xs leading-5 text-slate-300"><span className={`mt-0.5 inline-flex min-h-6 shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${passed ? 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200' : 'border-amber-700/70 bg-amber-950/25 text-amber-100'}`}>{passed ? <CheckCircle2 size={13} aria-hidden="true" /> : <AlertTriangle size={13} aria-hidden="true" />}{passed ? t.criteriaLabels.passed : t.criteriaLabels.pending}</span><span>{item}</span></li>; })}</ul></article>
        <section data-testid="institutional-m3s-inbox-pilot-results" className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-m3s-inbox-pilot-results-title">
          <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.resultsEyebrow}</p><h6 id="institutional-m3s-inbox-pilot-results-title" className="mt-1 text-base font-semibold text-slate-100 sm:text-lg">{t.resultsTitle}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.resultsIntro}</p></div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.resultCounterLabels.map(([label, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-emerald-200">{resultValues[index]}</p><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">{execution.cases.map((result, index) => <article key={result.id} className="m3s-raised p-3" data-testid="institutional-m3s-inbox-pilot-result"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-[11px] font-semibold text-sky-300">{result.id}</p><h6 className="mt-1 text-sm font-semibold text-slate-100">{t.scenarios[index]}</h6></div><span className="inline-flex min-h-7 items-center gap-1 rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[11px] font-semibold text-emerald-200"><CheckCircle2 size={13} aria-hidden="true" />{t.resultLabels.passed}</span></div><dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"><div><dt className="text-xs font-semibold text-slate-400">{t.resultLabels.fields}</dt><dd className="mt-1 text-xs font-semibold text-slate-200">{result.requiredFieldsChecked}/10</dd></div><div><dt className="text-xs font-semibold text-slate-400">{t.resultLabels.outcome}</dt><dd className="mt-1 text-xs font-semibold text-slate-200">{t.resultOutcomes[result.outcome]}</dd></div></dl></article>)}</div>
          <p className="mt-4 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-sm font-semibold leading-6 text-amber-100"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={17} aria-hidden="true" />{t.reviewPending}</p>
        </section>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2"><div className="rounded-md border border-red-800/70 bg-red-950/15 p-3"><div className="flex items-center gap-2"><AlertTriangle className="text-red-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-red-100">{t.stopTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.stop}</p></div><div className="rounded-md border border-amber-800/70 bg-amber-950/15 p-3"><div className="flex items-center gap-2"><LockKeyhole className="text-amber-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-amber-100">{t.pilotDecisionTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.pilotDecision}</p></div></div>
        <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-sm font-semibold leading-6 text-sky-100">{t.pilotVerdict}</p>
      </section>
      <section data-testid="institutional-m3s-inbox-go-no-go" className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-3 sm:p-4" aria-labelledby="institutional-m3s-inbox-go-no-go-title">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.gateEyebrow}</p><h5 id="institutional-m3s-inbox-go-no-go-title" className="mt-1 text-base font-semibold text-slate-100 sm:text-lg">{t.gateTitle}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.gateIntro}</p></div>
          <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-amber-700/70 bg-amber-950/25 px-3 py-2 text-xs font-semibold text-amber-100"><LockKeyhole size={16} aria-hidden="true" />{t.gateVersion}</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.gateCounters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
        <article className="m3s-raised mt-4 p-3 sm:p-4"><div className="flex items-center gap-2"><ClipboardCheck className="text-amber-300" size={17} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.gateFieldsTitle}</h6></div><dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{t.gateFields.map(([label, value]) => <div key={label} className="rounded-md border border-dashed border-slate-600 bg-slate-950/20 p-3"><dt className="text-xs font-semibold text-slate-300">{label}</dt><dd className="mt-2 text-xs font-semibold text-amber-200">{value}</dd></div>)}</dl></article>
        <p className="mt-4 flex items-start gap-2 rounded-md border border-red-800/70 bg-red-950/15 p-3 text-sm font-semibold leading-6 text-red-100"><AlertTriangle className="mt-0.5 shrink-0 text-red-300" size={17} aria-hidden="true" />{t.gateRule}</p>
      </section>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-sm font-semibold leading-6 text-violet-100">{t.verdict}</p>
    </section>
  );
};

export default InstitutionalM3SInboxFrame;
