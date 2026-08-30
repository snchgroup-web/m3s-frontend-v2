import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardCheck, Inbox, ListChecks, LockKeyhole, SendHorizontal, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

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
    record: { id: 'REF-01-DEC-075', version: 'V1.0', status: 'M3S-INB-003 confirmé, fiche vide', author: 'Cheikh Ndiaye', date: '31-08-2026', decision: 'M3S-INB-003 V0.1 est confirmé sans amendement et promu en V1.0 uniquement comme fiche GO/NO-GO vide.', evidence: 'Confirmation explicite de Cheikh dans la session du 31-08-2026 : « Je confirme. Le prochain candidat est M3S-INB-003 V0.1. »', limit: 'La décision confirme la structure de la fiche, pas un GO. Elle ne coche aucune option, n’autorise aucun cas, import, connecteur, automatisme, stockage réel, donnée personnelle, registre opérationnel, accès, dépense ou action L2.' },
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'M3S-INB-003 V1.0 est confirmé comme fiche GO/NO-GO vide. Le protocole M3S-INB-002 V1.0 reste non exécuté et non opérationnel.',
    nextTitle: 'Prochain arbitrage distinct',
    next: 'Conserver M3S-INB-003 V1.0 vide jusqu’à une décision humaine distincte GO ou NO-GO. Aucune option n’est présumée.',
    pilotEyebrow: 'PROTOCOLE CONFIRMÉ · M3S-INB-002 · V1.0 · 31-08-2026',
    pilotTitle: 'Pilote manuel isolé · protocole confirmé, exécution fermée',
    pilotVersion: 'V1.0',
    pilotIntro: 'Le pilote proposé vérifie le modèle de qualification sans utiliser une seule donnée réelle. Il reste local, réinitialisable, sans persistance opérationnelle et sans connexion à un canal externe.',
    pilotCounters: [['Cas fictifs prévus', '6', 'Aucun cas encore exécuté'], ['Personnes réelles', '0', 'Noms et coordonnées interdits'], ['Sources connectées', '0', 'Saisie fictive uniquement'], ['Automatismes', '0', 'Traitement humain simulé']],
    scenariosTitle: 'Jeu de contrôle fictif',
    scenarios: ['E-mail interne fictif à qualifier', 'Document fictif à rattacher', 'Média de chantier fictif à classer', 'Demande fictive avec échéance', 'Doublon fictif à signaler', 'Entrée fictive restreinte à bloquer'],
    stepsTitle: 'Parcours manuel proposé',
    steps: ['Créer le cas fictif dans un espace isolé', 'Contrôler les dix champs obligatoires', 'Qualifier catégorie et sensibilité', 'Rattacher à une hiérarchie entièrement fictive', 'Faire progresser le cas dans les six statuts', 'Contrôler la trace puis réinitialiser le jeu'],
    criteriaTitle: 'Critères de réussite avant tout autre lot',
    criteria: ['6/6 cas fictifs traités sans donnée réelle', 'Champs obligatoires contrôlés avant changement de statut', 'Doublon détecté sans créer un second élément', 'Cas restreint bloqué et orienté vers un dépôt sécurisé simulé', 'Aucun appel réseau, import, connecteur, automatisme ou stockage réel', 'Résultats relus humainement et consignés comme preuve de test'],
    stopTitle: 'Arrêt immédiat',
    stop: 'Toute donnée réelle, identité, pièce sensible, canal connecté ou persistance opérationnelle arrête le pilote et exige une décision séparée.',
    pilotDecisionTitle: 'Décision enregistrée · exécution toujours interdite',
    pilotDecision: 'REF-01-DEC-075 confirme uniquement la fiche vide M3S-INB-003 V1.0. Une décision GO distincte reste obligatoire avant le premier cas.',
    pilotVerdict: 'STATUT · PROTOCOLE CONFIRMÉ, NON EXÉCUTÉ. 0/6 cas exécuté, zéro donnée réelle et aucune capacité opérationnelle ouverte.',
    gateEyebrow: 'FICHE CONFIRMÉE · M3S-INB-003 · V1.0 · 31-08-2026',
    gateTitle: 'Décision GO/NO-GO · structure confirmée, choix non renseigné',
    gateVersion: 'V1.0 · VIDE',
    gateIntro: 'Cette fiche sépare la confirmation documentaire de la décision d’exécuter. Elle reste vide afin qu’aucun GO ne puisse être déduit de la validation de sa structure.',
    gateCounters: [['Options sélectionnées', '0/2', 'Ni GO ni NO-GO'], ['Cas autorisés', '0/6', 'Exécution toujours fermée'], ['Preuves de test', '0', 'Aucun cas exécuté'], ['Actions L2', '0', 'G1 reste ouverte']],
    gateFieldsTitle: 'Champs de décision volontairement vides',
    gateFields: [['Décision', 'Non renseignée'], ['Auteur et date', 'Non renseignés'], ['Conditions préalables', 'Non renseignées'], ['Périmètre autorisé', 'Non renseigné'], ['Preuves examinées', 'Non renseignées'], ['Risques et retour arrière', 'Non renseignés']],
    gateRule: 'RÈGLE · La fiche confirmée ne vaut ni GO ni NO-GO. Seule une décision humaine ultérieure, explicite et tracée peut autoriser le démarrage.',
    verdict: 'STATUT · CADRE CONFIRMÉ EN LECTURE SEULE. Zéro entrée réelle, import, connecteur ou traitement automatique activé.'
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
    record: { id: 'REF-01-DEC-075', version: 'V1.0', status: 'M3S-INB-003 confirmed, empty form', author: 'Cheikh Ndiaye', date: '31 Aug 2026', decision: 'M3S-INB-003 V0.1 is confirmed without amendment and promoted to V1.0 only as an empty GO/NO-GO form.', evidence: 'Cheikh’s explicit confirmation in the 31 Aug 2026 session: “I confirm. The next candidate is M3S-INB-003 V0.1.”', limit: 'The decision confirms the form structure, not a GO. It selects no option and enables no case, import, connector, automation, real storage, personal data, operational register, access, expense or L2 action.' },
    decisionTitle: 'Fast Track decision outcome',
    decision: 'M3S-INB-003 V1.0 is confirmed as an empty GO/NO-GO form. The M3S-INB-002 V1.0 protocol remains unexecuted and non-operational.',
    nextTitle: 'Next separate decision',
    next: 'Keep M3S-INB-003 V1.0 empty until a separate human GO or NO-GO decision. No option is presumed.',
    pilotEyebrow: 'CONFIRMED PROTOCOL · M3S-INB-002 · V1.0 · 31 AUG 2026',
    pilotTitle: 'Isolated manual pilot · protocol confirmed, execution closed',
    pilotVersion: 'V1.0',
    pilotIntro: 'The proposed pilot checks the qualification model without using any real data. It remains local, resettable, without operational persistence and without connection to an external channel.',
    pilotCounters: [['Planned fictional cases', '6', 'No case run yet'], ['Real people', '0', 'Names and contact details prohibited'], ['Connected sources', '0', 'Fictional manual entry only'], ['Automations', '0', 'Simulated human processing']],
    scenariosTitle: 'Fictional control dataset',
    scenarios: ['Fictional internal email to qualify', 'Fictional document to attach', 'Fictional worksite media to classify', 'Fictional request with a due date', 'Fictional duplicate to flag', 'Restricted fictional entry to block'],
    stepsTitle: 'Proposed manual path',
    steps: ['Create the fictional case in an isolated space', 'Check the ten mandatory fields', 'Qualify category and sensitivity', 'Attach to a fully fictional hierarchy', 'Move the case through all six statuses', 'Check the trace, then reset the dataset'],
    criteriaTitle: 'Success criteria before any further package',
    criteria: ['6/6 fictional cases processed without real data', 'Mandatory fields checked before status changes', 'Duplicate detected without creating a second item', 'Restricted case blocked and routed to a simulated secure deposit', 'No network call, import, connector, automation or real storage', 'Results reviewed by a human and recorded as test evidence'],
    stopTitle: 'Immediate stop',
    stop: 'Any real data, identity, sensitive record, connected channel or operational persistence stops the pilot and requires a separate decision.',
    pilotDecisionTitle: 'Recorded decision · execution still prohibited',
    pilotDecision: 'REF-01-DEC-075 confirms only the empty M3S-INB-003 V1.0 form. A separate GO decision remains mandatory before the first case.',
    pilotVerdict: 'STATUS · CONFIRMED, UNEXECUTED PROTOCOL. 0/6 cases run, zero real data and no operational capability opened.',
    gateEyebrow: 'CONFIRMED FORM · M3S-INB-003 · V1.0 · 31 AUG 2026',
    gateTitle: 'GO/NO-GO decision · structure confirmed, choice left blank',
    gateVersion: 'V1.0 · EMPTY',
    gateIntro: 'This form separates documentary confirmation from an execution decision. It remains empty so that no GO can be inferred from approval of its structure.',
    gateCounters: [['Selected options', '0/2', 'Neither GO nor NO-GO'], ['Authorised cases', '0/6', 'Execution remains closed'], ['Test evidence', '0', 'No case run'], ['L2 actions', '0', 'G1 remains open']],
    gateFieldsTitle: 'Decision fields deliberately left blank',
    gateFields: [['Decision', 'Not entered'], ['Author and date', 'Not entered'], ['Prerequisites', 'Not entered'], ['Authorised scope', 'Not entered'], ['Evidence reviewed', 'Not entered'], ['Risks and rollback', 'Not entered']],
    gateRule: 'RULE · The confirmed form is neither a GO nor a NO-GO. Only a later explicit and recorded human decision can authorise the start.',
    verdict: 'STATUS · CONFIRMED READ-ONLY FRAMEWORK. Zero real entries, imports, connectors or automated processing enabled.'
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
    record: { id: 'REF-01-DEC-075', version: 'V1.0', status: 'M3S-INB-003 bestätigt, leeres Blatt', author: 'Cheikh Ndiaye', date: '31.08.2026', decision: 'M3S-INB-003 V0.1 wird ohne Änderung nur als leeres GO/NO-GO-Blatt bestätigt und zu V1.0.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 31.08.2026: „Ich bestätige. Der nächste Kandidat ist M3S-INB-003 V0.1.“', limit: 'Der Entscheid bestätigt die Struktur des Blatts, nicht ein GO. Er wählt keine Option und aktiviert keinen Fall, Import, Connector, Automatismus, reale Speicherung, Personendaten, kein operatives Register, keinen Zugriff, keine Ausgabe und keine L2-Aktion.' },
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'M3S-INB-003 V1.0 ist als leeres GO/NO-GO-Blatt bestätigt. Das Protokoll M3S-INB-002 V1.0 bleibt unausgeführt und nicht operativ.',
    nextTitle: 'Nächster getrennter Entscheid',
    next: 'M3S-INB-003 V1.0 bis zu einem getrennten menschlichen GO- oder NO-GO-Entscheid leer halten. Keine Option wird vorausgesetzt.',
    pilotEyebrow: 'BESTÄTIGTES PROTOKOLL · M3S-INB-002 · V1.0 · 31.08.2026',
    pilotTitle: 'Isolierter manueller Pilot · Protokoll bestätigt, Ausführung geschlossen',
    pilotVersion: 'V1.0',
    pilotIntro: 'Der vorgeschlagene Pilot prüft das Qualifikationsmodell ohne reale Daten. Er bleibt lokal, rücksetzbar, ohne operative Persistenz und ohne Verbindung zu einem externen Kanal.',
    pilotCounters: [['Geplante fiktive Fälle', '6', 'Noch kein Fall ausgeführt'], ['Reale Personen', '0', 'Namen und Kontaktdaten verboten'], ['Verbundene Quellen', '0', 'Nur fiktive manuelle Eingabe'], ['Automatismen', '0', 'Simulierte menschliche Bearbeitung']],
    scenariosTitle: 'Fiktiver Kontrolldatensatz',
    scenarios: ['Fiktive interne E-Mail zur Qualifizierung', 'Fiktives Dokument zur Zuordnung', 'Fiktives Baustellenmedium zur Klassierung', 'Fiktive Anfrage mit Fälligkeit', 'Fiktives Duplikat zur Markierung', 'Eingeschränkter fiktiver Eintrag zur Sperrung'],
    stepsTitle: 'Vorgeschlagener manueller Ablauf',
    steps: ['Fiktiven Fall in einem isolierten Bereich erstellen', 'Die zehn Pflichtfelder prüfen', 'Kategorie und Sensibilität qualifizieren', 'Einer vollständig fiktiven Hierarchie zuordnen', 'Den Fall durch alle sechs Status führen', 'Spur prüfen und Datensatz zurücksetzen'],
    criteriaTitle: 'Erfolgskriterien vor jedem weiteren Paket',
    criteria: ['6/6 fiktive Fälle ohne reale Daten bearbeitet', 'Pflichtfelder vor Statusänderung geprüft', 'Duplikat erkannt, ohne ein zweites Element zu erstellen', 'Eingeschränkter Fall gesperrt und zu einer simulierten sicheren Ablage geführt', 'Kein Netzwerkaufruf, Import, Connector, Automatismus oder reale Speicherung', 'Ergebnisse menschlich geprüft und als Testnachweis protokolliert'],
    stopTitle: 'Sofortiger Stopp',
    stop: 'Reale Daten, Identitäten, sensible Unterlagen, verbundene Kanäle oder operative Persistenz stoppen den Piloten und erfordern einen getrennten Entscheid.',
    pilotDecisionTitle: 'Erfasster Entscheid · Ausführung weiterhin verboten',
    pilotDecision: 'REF-01-DEC-075 bestätigt nur das leere Blatt M3S-INB-003 V1.0. Vor dem ersten Fall bleibt ein getrennter GO-Entscheid zwingend.',
    pilotVerdict: 'STATUS · BESTÄTIGTES, UNAUSGEFÜHRTES PROTOKOLL. 0/6 Fälle ausgeführt, null reale Daten und keine operative Fähigkeit geöffnet.',
    gateEyebrow: 'BESTÄTIGTES BLATT · M3S-INB-003 · V1.0 · 31.08.2026',
    gateTitle: 'GO/NO-GO-Entscheid · Struktur bestätigt, Auswahl leer',
    gateVersion: 'V1.0 · LEER',
    gateIntro: 'Dieses Blatt trennt die dokumentarische Bestätigung vom Ausführungsentscheid. Es bleibt leer, damit aus der Bestätigung seiner Struktur kein GO abgeleitet werden kann.',
    gateCounters: [['Gewählte Optionen', '0/2', 'Weder GO noch NO-GO'], ['Autorisierte Fälle', '0/6', 'Ausführung bleibt geschlossen'], ['Testnachweise', '0', 'Kein Fall ausgeführt'], ['L2-Aktionen', '0', 'G1 bleibt offen']],
    gateFieldsTitle: 'Bewusst leere Entscheidfelder',
    gateFields: [['Entscheid', 'Nicht eingetragen'], ['Autor und Datum', 'Nicht eingetragen'], ['Voraussetzungen', 'Nicht eingetragen'], ['Autorisierter Umfang', 'Nicht eingetragen'], ['Geprüfte Nachweise', 'Nicht eingetragen'], ['Risiken und Rückkehr', 'Nicht eingetragen']],
    gateRule: 'REGEL · Das bestätigte Blatt ist weder GO noch NO-GO. Nur ein späterer ausdrücklicher und protokollierter menschlicher Entscheid kann den Start autorisieren.',
    verdict: 'STATUS · BESTÄTIGTER SCHREIBGESCHÜTZTER RAHMEN. Null reale Eingänge, Importe, Connectoren oder automatische Bearbeitungen aktiviert.'
  }
};

const InstitutionalM3SInboxFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
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
        <article className="m3s-raised mt-4 p-3 sm:p-4"><h6 className="text-sm font-semibold text-slate-100">{t.criteriaTitle}</h6><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.criteria.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />{item}</li>)}</ul></article>
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
