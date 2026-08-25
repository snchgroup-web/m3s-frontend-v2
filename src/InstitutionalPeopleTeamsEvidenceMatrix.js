import React from 'react';
import {
  AlertTriangle,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
  TableProperties
} from 'lucide-react';

const STATE_STYLES = {
  observed: 'border-violet-700/70 bg-violet-950/25 text-violet-100',
  partial: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  open: 'border-amber-700/70 bg-amber-950/25 text-amber-100'
};

const COPY = {
  FR: {
    eyebrow: 'MATRICE DE PREUVES · REF-01 · V0.7 · 25-08-2026',
    title: 'Contrôler chaque support selon les sept critères validés',
    intro: 'Cette matrice décrit les éléments observables et les preuves restant à établir. Un état descriptif ne vaut ni conformité, ni qualification, ni promotion du support.',
    counters: [
      ['Supports examinés', '4'],
      ['Critères obligatoires', '7'],
      ['Contrôles descriptifs', '28'],
      ['Sources maîtresses', '0']
    ],
    columns: { support: 'Support', criterion: 'Critère', evidence: 'Preuve observée', owner: 'Responsable retenu', gap: 'Écart à traiter', state: 'État de preuve' },
    labels: { evidence: 'Preuve observée', owner: 'Responsable retenu', gap: 'Écart à traiter' },
    states: { observed: 'Élément observé', partial: 'Preuve partielle', open: 'Preuve à établir' },
    criteria: {
      stable: 'Identifiant stable', scope: 'Périmètre et couverture', lifecycle: 'Cycle versionné',
      ownership: 'Propriété et validation', access: 'Accès et sensibilité', evidence: 'Preuve et conservation', quality: 'Qualité et propagation'
    },
    supports: [
      {
        name: 'API RH-001 · /members-directory',
        rows: [
          ['stable', 'Le contrat expose un champ technique person_id distinct des libellés d’affichage.', 'Organisation & RH définit la règle métier ; IT garde le contrat.', 'Prouver l’unicité, la non-réutilisation et la correction versionnée de cet identifiant.', 'partial'],
          ['scope', 'La réponse observée porte libellés, équipe, type, état et exclut les coordonnées personnelles.', 'Organisation & RH définit inclusions et exclusions ; IT applique le contrat.', 'Documenter les objets exclus, territoires, collectifs et cas hors périmètre.', 'partial'],
          ['lifecycle', 'Un état actif ou inactif est exposé dans l’instantané courant.', 'Organisation & RH valide les événements ; IT conserve leur représentation.', 'Aucune preuve observée d’entrée, transfert, suspension et clôture historisés.', 'open'],
          ['ownership', 'Les décisions REF-01 séparent propriétaire métier, garde technique et gardien des preuves.', 'Organisation & RH, IT et GED selon REF-01-DEC-001 et 002.', 'Rattacher le contrat à une autorité de version et à une trace de validation opérationnelle.', 'partial'],
          ['access', 'L’appel est authentifié, classé C2, en lecture seule et distingue notamment le refus 403.', 'IT protège l’accès ; Organisation & RH autorise le besoin métier.', 'Établir moindre privilège, journalisation et revue périodique des autorisations.', 'observed'],
          ['evidence', 'Le contrat ne contient pas de coordonnées personnelles et reste séparé des pièces RH.', 'GED conserve les pièces ; Organisation & RH relie la preuve au sens métier.', 'Aucune référence GED, durée de conservation ou relation événement-preuve n’est exposée.', 'open'],
          ['quality', 'Des tests couvrent la requête authentifiée, la classification C2 et l’état d’accès interdit.', 'IT contrôle le contrat ; Organisation & RH arbitre les écarts de contenu.', 'Définir contrôles durables d’unicité, complétude autorisée, correction et propagation.', 'partial']
        ]
      },
      {
        name: 'Annuaire interne sécurisé',
        rows: [
          ['stable', 'La vue affiche person_id comme référence séparée du nom présenté.', 'Organisation & RH valide la référence ; IT maintient son affichage.', 'La vue ne prouve ni non-réutilisation ni historique de correction de la référence.', 'observed'],
          ['scope', 'Recherche et filtres exploitent équipe, type, fonction et état reçus de RH-001.', 'Organisation & RH définit la population visible ; IT applique les filtres.', 'Rendre visibles la date, la version, les exclusions et la couverture de l’extrait.', 'partial'],
          ['lifecycle', 'La vue distingue uniquement l’état courant actif ou inactif.', 'Organisation & RH valide le cycle ; IT affiche les états autorisés.', 'Aucun historique versionné des changements n’est consultable dans cette vue.', 'open'],
          ['ownership', 'La vue ne conserve pas de second annuaire et dépend du contrat RH-001.', 'Organisation & RH valide le contenu ; IT maintient interface et états d’accès.', 'Tracer qui valide chaque version de contenu et quand elle entre en vigueur.', 'partial'],
          ['access', 'La vue traite séparément accès restreint, pilote indisponible et erreur sans ancien annuaire de repli.', 'IT traite les états techniques ; Organisation & RH définit les rôles autorisés.', 'Prouver la matrice de droits, les journaux d’accès et leur revue.', 'partial'],
          ['evidence', 'L’interface se présente comme une vue documentaire en lecture seule.', 'GED garde les preuves ; l’annuaire n’en devient pas le dépôt.', 'Ajouter seulement des références autorisées vers preuves et versions, sans les dupliquer.', 'open'],
          ['quality', 'La vue traduit les fonctions et permet de filtrer sans modifier les données reçues.', 'IT contrôle le rendu ; Organisation & RH traite les écarts métier.', 'Afficher fraîcheur et version, puis tracer correction et propagation vers les consommateurs.', 'partial']
        ]
      },
      {
        name: 'Sélecteurs partagés Team/Agent',
        rows: [
          ['stable', 'Le person_id reste disponible comme alias, mais la valeur enregistrée privilégie un prénom unique ou un libellé.', 'IT maintient la projection ; Organisation & RH valide l’identifiant de référence.', 'La valeur opérationnelle n’est pas encore fondée sur l’identifiant stable RH-001.', 'open'],
          ['scope', 'La projection retient les membres actifs de TZH/TSN et ajoute un collectif distinct par équipe.', 'La fonction consommatrice valide l’affectation ; Organisation & RH cadre les équipes.', 'Documenter exclusions, autres équipes, changements territoriaux et cas historiques.', 'partial'],
          ['lifecycle', 'La liste est reconstruite depuis les membres actuellement actifs.', 'Organisation & RH valide les dates ; IT projette l’état autorisé.', 'Les anciennes affectations et changements d’équipe ne sont pas versionnés par le sélecteur.', 'open'],
          ['ownership', 'La responsabilité métier de l’affectation reste à la fonction consommatrice.', 'Fonction consommatrice pour le choix ; Organisation & RH pour l’appartenance ; IT pour la règle.', 'Versionner la règle de projection et la décision qui autorise chaque consommation.', 'partial'],
          ['access', 'En cas d’indisponibilité RH-001, seules les options collectives prévues restent proposées.', 'IT contrôle le repli ; la fonction consommatrice contrôle l’usage.', 'Prouver les droits et journaux des formulaires qui enregistrent l’affectation.', 'partial'],
          ['evidence', 'Les options transportent des alias techniques et des libellés, sans pièce justificative.', 'GED conserve le fondement ; la fonction consommatrice référence l’opération.', 'Relier l’affectation à un événement REF-01 et à une preuve autorisée.', 'open'],
          ['quality', 'Les règles normalisent TZH/TSN, excluent les couples impossibles et sont couvertes par des tests.', 'IT maintient les contrôles ; Organisation & RH arbitre les incohérences.', 'Conserver la provenance historique et maîtriser les corrections chez tous les consommateurs.', 'observed']
        ]
      },
      {
        name: 'GED · preuves RH autorisées',
        rows: [
          ['stable', 'Les pièces sont cadrées comme preuves séparées des objets opérationnels REF-01.', 'GED garde les pièces ; Organisation & RH identifie l’objet métier lié.', 'Aucun lien gouverné et stable pièce-personne-équipe-événement n’est encore observé.', 'open'],
          ['scope', 'Le cadrage cite mandats, contrats, décisions et justificatifs autorisés.', 'Organisation & RH classe le contenu ; GED applique le plan de classement.', 'Versionner inclusions, exclusions, territoires et pièces attendues par type d’événement.', 'partial'],
          ['lifecycle', 'La GED est retenue pour conserver décisions, versions et preuves.', 'GED garde les versions ; Organisation & RH valide les événements associés.', 'Prouver la chaîne entre version précédente, date d’effet et événement REF-01.', 'partial'],
          ['ownership', 'REF-01 attribue la garde des preuves à la GED et le sens métier à Organisation & RH.', 'Organisation & RH décide le classement métier ; GED assure la conservation.', 'Nommer l’autorité de versement, de validation et d’archivage pour chaque type de pièce.', 'partial'],
          ['access', 'Le périmètre vise uniquement les preuves RH autorisées et séparées des vues globales.', 'Organisation & RH définit les droits ; GED et IT les appliquent.', 'Établir classification, moindre privilège, journalisation et revue des accès aux pièces.', 'partial'],
          ['evidence', 'La fonction retenue de la GED est la conservation des versions, décisions et justificatifs.', 'GED porte conservation et intégrité ; Organisation & RH porte la valeur probante métier.', 'Définir durées, sort final, référence obligatoire et contrôle d’intégrité.', 'partial'],
          ['quality', 'Aucun contrôle automatique de cohérence avec RH-001 ou ses consommateurs n’est observé.', 'Organisation & RH arbitre ; GED et IT exécutent les contrôles autorisés.', 'Définir écarts, doublons, corrections et propagation sans exposer les pièces sensibles.', 'open']
        ]
      }
    ],
    boundary: 'Lecture descriptive uniquement : aucune ligne ne qualifie un support, ne valide une donnée personnelle, ne désigne une source maîtresse et ne mesure une progression.'
  },
  EN: {
    eyebrow: 'EVIDENCE MATRIX · REF-01 · V0.7 · 25 AUG 2026',
    title: 'Review each support against the seven validated criteria',
    intro: 'This matrix describes observable elements and evidence still to establish. A descriptive state is not compliance, qualification or support promotion.',
    counters: [['Supports reviewed', '4'], ['Mandatory criteria', '7'], ['Descriptive controls', '28'], ['Master sources', '0']],
    columns: { support: 'Support', criterion: 'Criterion', evidence: 'Observed evidence', owner: 'Retained owner', gap: 'Gap to address', state: 'Evidence state' },
    labels: { evidence: 'Observed evidence', owner: 'Retained owner', gap: 'Gap to address' },
    states: { observed: 'Observed element', partial: 'Partial evidence', open: 'Evidence to establish' },
    criteria: {
      stable: 'Stable identifier', scope: 'Scope and coverage', lifecycle: 'Versioned lifecycle',
      ownership: 'Ownership and validation', access: 'Access and sensitivity', evidence: 'Evidence and retention', quality: 'Quality and propagation'
    },
    supports: [
      { name: 'RH-001 API · /members-directory', rows: [
        ['stable', 'The contract exposes a technical person_id field separate from display labels.', 'Organisation & HR defines the business rule; IT stewards the contract.', 'Evidence uniqueness, non-reuse and versioned correction of this identifier.', 'partial'],
        ['scope', 'The observed response carries labels, team, type and state while excluding personal contact details.', 'Organisation & HR defines inclusion and exclusion; IT applies the contract.', 'Document excluded objects, territories, collectives and out-of-scope cases.', 'partial'],
        ['lifecycle', 'A current active or inactive state is exposed.', 'Organisation & HR validates events; IT retains their representation.', 'No observed evidence of historised entry, transfer, suspension and closure.', 'open'],
        ['ownership', 'REF-01 decisions separate business owner, technical steward and evidence custodian.', 'Organisation & HR, IT and DMS under REF-01-DEC-001 and 002.', 'Link the contract to a version authority and an operational validation trace.', 'partial'],
        ['access', 'The call is authenticated, C2-classified, read-only and distinguishes the 403 denial state.', 'IT protects access; Organisation & HR authorises the business need.', 'Establish least privilege, logging and periodic access review.', 'observed'],
        ['evidence', 'The contract contains no personal contact details and remains separate from HR documents.', 'DMS retains documents; Organisation & HR links evidence to business meaning.', 'No DMS reference, retention period or event-evidence relationship is exposed.', 'open'],
        ['quality', 'Tests cover the authenticated request, C2 classification and forbidden-access state.', 'IT controls the contract; Organisation & HR arbitrates content gaps.', 'Define durable uniqueness, authorised completeness, correction and propagation controls.', 'partial']
      ]},
      { name: 'Secure internal directory', rows: [
        ['stable', 'The view displays person_id as a reference separate from the presented name.', 'Organisation & HR validates the reference; IT maintains its display.', 'The view proves neither non-reuse nor correction history for the reference.', 'observed'],
        ['scope', 'Search and filters use team, type, position and state received from RH-001.', 'Organisation & HR defines the visible population; IT applies filters.', 'Expose extract date, version, exclusions and coverage.', 'partial'],
        ['lifecycle', 'The view distinguishes only the current active or inactive state.', 'Organisation & HR validates the lifecycle; IT displays authorised states.', 'No versioned history of changes is available in this view.', 'open'],
        ['ownership', 'The view retains no second directory and depends on the RH-001 contract.', 'Organisation & HR validates content; IT maintains UI and access states.', 'Trace who validates each content version and when it takes effect.', 'partial'],
        ['access', 'The view separates restricted, unavailable and error states without a legacy-directory fallback.', 'IT handles technical states; Organisation & HR defines authorised roles.', 'Evidence the rights matrix, access logs and their review.', 'partial'],
        ['evidence', 'The interface presents itself as a read-only documentary view.', 'DMS retains evidence; the directory does not become its repository.', 'Add only authorised references to evidence and versions, without duplication.', 'open'],
        ['quality', 'The view translates positions and filters without changing received data.', 'IT controls rendering; Organisation & HR handles business gaps.', 'Expose freshness and version, then trace correction and consumer propagation.', 'partial']
      ]},
      { name: 'Shared Team/Agent selectors', rows: [
        ['stable', 'person_id remains available as an alias, but the stored value favours a unique first name or label.', 'IT maintains the projection; Organisation & HR validates the reference identifier.', 'The operational value is not yet based on the stable RH-001 identifier.', 'open'],
        ['scope', 'The projection retains active TZH/TSN members and adds a distinct collective per team.', 'The consuming function validates assignment; Organisation & HR frames teams.', 'Document exclusions, other teams, territorial changes and historical cases.', 'partial'],
        ['lifecycle', 'The list is rebuilt from currently active members.', 'Organisation & HR validates dates; IT projects the authorised state.', 'Former assignments and team changes are not versioned by the selector.', 'open'],
        ['ownership', 'Business responsibility for assignment remains with the consuming function.', 'Consuming function for selection; Organisation & HR for membership; IT for the rule.', 'Version the projection rule and the decision authorising each use.', 'partial'],
        ['access', 'When RH-001 is unavailable, only the planned collective options remain available.', 'IT controls fallback; the consuming function controls its use.', 'Evidence rights and logs for forms that record the assignment.', 'partial'],
        ['evidence', 'Options carry technical aliases and labels without a supporting document.', 'DMS retains the basis; the consuming function references the operation.', 'Link assignment to a REF-01 event and authorised evidence.', 'open'],
        ['quality', 'Rules normalise TZH/TSN, reject impossible pairs and are covered by tests.', 'IT maintains controls; Organisation & HR arbitrates inconsistencies.', 'Retain historical provenance and govern corrections across all consumers.', 'observed']
      ]},
      { name: 'DMS · authorised HR evidence', rows: [
        ['stable', 'Documents are framed as evidence separate from operational REF-01 objects.', 'DMS holds documents; Organisation & HR identifies the related business object.', 'No governed stable document-person-team-event link is yet observed.', 'open'],
        ['scope', 'The framing cites authorised mandates, contracts, decisions and supporting records.', 'Organisation & HR classifies content; DMS applies the filing plan.', 'Version inclusions, exclusions, territories and expected documents per event type.', 'partial'],
        ['lifecycle', 'DMS is retained to preserve decisions, versions and evidence.', 'DMS retains versions; Organisation & HR validates related events.', 'Evidence the chain between previous version, effective date and REF-01 event.', 'partial'],
        ['ownership', 'REF-01 assigns evidence custody to DMS and business meaning to Organisation & HR.', 'Organisation & HR decides business classification; DMS ensures retention.', 'Name deposit, validation and archive authorities for each document type.', 'partial'],
        ['access', 'The scope targets authorised HR evidence separated from global views.', 'Organisation & HR defines rights; DMS and IT apply them.', 'Establish classification, least privilege, logging and access reviews for documents.', 'partial'],
        ['evidence', 'The retained DMS role is to preserve versions, decisions and supporting records.', 'DMS owns retention and integrity; Organisation & HR owns business evidential value.', 'Define periods, disposal, mandatory references and integrity controls.', 'partial'],
        ['quality', 'No automated consistency control with RH-001 or its consumers is observed.', 'Organisation & HR arbitrates; DMS and IT execute authorised controls.', 'Define gaps, duplicates, corrections and propagation without exposing sensitive documents.', 'open']
      ]}
    ],
    boundary: 'Descriptive reading only: no row qualifies a support, validates personal data, designates a master source or measures progress.'
  },
  DE: {
    eyebrow: 'NACHWEISMATRIX · REF-01 · V0.7 · 25.08.2026',
    title: 'Jeden Träger anhand der sieben validierten Kriterien prüfen',
    intro: 'Diese Matrix beschreibt beobachtbare Elemente und noch zu erstellende Nachweise. Ein beschreibender Stand ist weder Konformität noch Qualifikation oder Förderung des Trägers.',
    counters: [['Geprüfte Träger', '4'], ['Zwingende Kriterien', '7'], ['Beschreibende Kontrollen', '28'], ['Masterquellen', '0']],
    columns: { support: 'Träger', criterion: 'Kriterium', evidence: 'Beobachteter Nachweis', owner: 'Festgehaltene Verantwortung', gap: 'Zu behandelnde Abweichung', state: 'Nachweisstand' },
    labels: { evidence: 'Beobachteter Nachweis', owner: 'Festgehaltene Verantwortung', gap: 'Zu behandelnde Abweichung' },
    states: { observed: 'Beobachtetes Element', partial: 'Teilnachweis', open: 'Nachweis zu erstellen' },
    criteria: {
      stable: 'Stabile Kennung', scope: 'Umfang und Abdeckung', lifecycle: 'Versionierter Lebenszyklus',
      ownership: 'Verantwortung und Validierung', access: 'Zugriff und Sensibilität', evidence: 'Nachweis und Aufbewahrung', quality: 'Qualität und Weitergabe'
    },
    supports: [
      { name: 'RH-001-API · /members-directory', rows: [
        ['stable', 'Der Vertrag stellt ein technisches Feld person_id getrennt von Anzeigebezeichnungen bereit.', 'Organisation & Personal definiert die Fachregel; IT pflegt den Vertrag.', 'Eindeutigkeit, Nichtwiederverwendung und versionierte Korrektur dieser Kennung belegen.', 'partial'],
        ['scope', 'Die beobachtete Antwort enthält Bezeichnungen, Team, Typ und Stand, jedoch keine privaten Kontaktdaten.', 'Organisation & Personal definiert Ein- und Ausschluss; IT setzt den Vertrag um.', 'Ausgeschlossene Objekte, Gebiete, Kollektive und Fälle ausserhalb des Umfangs dokumentieren.', 'partial'],
        ['lifecycle', 'Ein aktueller Aktiv- oder Inaktivstand wird bereitgestellt.', 'Organisation & Personal validiert Ereignisse; IT bewahrt ihre Darstellung.', 'Kein beobachteter Nachweis historisierter Eintritte, Wechsel, Suspendierungen und Abschlüsse.', 'open'],
        ['ownership', 'REF-01-Entscheide trennen Fachverantwortung, technische Pflege und Nachweisverwahrung.', 'Organisation & Personal, IT und DMS gemäss REF-01-DEC-001 und 002.', 'Vertrag mit Versionsautorität und betrieblicher Validierungsspur verbinden.', 'partial'],
        ['access', 'Der Aufruf ist authentifiziert, C2-klassifiziert, schreibgeschützt und unterscheidet den 403-Ablehnungsstand.', 'IT schützt den Zugriff; Organisation & Personal autorisiert den Fachbedarf.', 'Geringste Berechtigung, Protokollierung und regelmässige Zugriffsprüfung erstellen.', 'observed'],
        ['evidence', 'Der Vertrag enthält keine privaten Kontaktdaten und bleibt von Personalakten getrennt.', 'DMS bewahrt Unterlagen; Organisation & Personal verbindet Nachweis und Fachbedeutung.', 'Keine DMS-Referenz, Aufbewahrungsdauer oder Ereignis-Nachweis-Beziehung wird bereitgestellt.', 'open'],
        ['quality', 'Tests decken authentifizierte Anfrage, C2-Klassifizierung und verbotenen Zugriff ab.', 'IT kontrolliert den Vertrag; Organisation & Personal entscheidet Inhaltsabweichungen.', 'Dauerhafte Kontrollen für Eindeutigkeit, erlaubte Vollständigkeit, Korrektur und Weitergabe definieren.', 'partial']
      ]},
      { name: 'Sicheres internes Verzeichnis', rows: [
        ['stable', 'Die Ansicht zeigt person_id als Referenz getrennt vom dargestellten Namen.', 'Organisation & Personal validiert die Referenz; IT pflegt ihre Anzeige.', 'Die Ansicht belegt weder Nichtwiederverwendung noch Korrekturhistorie der Referenz.', 'observed'],
        ['scope', 'Suche und Filter verwenden Team, Typ, Funktion und Stand aus RH-001.', 'Organisation & Personal bestimmt die sichtbare Population; IT setzt Filter um.', 'Datum, Version, Ausschlüsse und Abdeckung des Auszugs sichtbar machen.', 'partial'],
        ['lifecycle', 'Die Ansicht unterscheidet nur den aktuellen Aktiv- oder Inaktivstand.', 'Organisation & Personal validiert den Lebenszyklus; IT zeigt erlaubte Stände.', 'Keine versionierte Änderungshistorie ist in dieser Ansicht verfügbar.', 'open'],
        ['ownership', 'Die Ansicht bewahrt kein zweites Verzeichnis und hängt vom RH-001-Vertrag ab.', 'Organisation & Personal validiert Inhalt; IT pflegt Oberfläche und Zugriffszustände.', 'Nachweisen, wer jede Inhaltsversion validiert und wann sie wirksam wird.', 'partial'],
        ['access', 'Die Ansicht trennt eingeschränkten, nicht verfügbaren und Fehlerzustand ohne altes Ersatzverzeichnis.', 'IT behandelt technische Stände; Organisation & Personal definiert autorisierte Rollen.', 'Rechtematrix, Zugriffsprotokolle und deren Prüfung belegen.', 'partial'],
        ['evidence', 'Die Oberfläche weist sich als schreibgeschützte Dokumentationsansicht aus.', 'DMS bewahrt Nachweise; das Verzeichnis wird nicht zu deren Depot.', 'Nur autorisierte Referenzen auf Nachweise und Versionen ohne Duplikation ergänzen.', 'open'],
        ['quality', 'Die Ansicht übersetzt Funktionen und filtert, ohne empfangene Daten zu ändern.', 'IT kontrolliert Darstellung; Organisation & Personal behandelt Fachabweichungen.', 'Aktualität und Version anzeigen, danach Korrektur und Verbraucherweitergabe verfolgen.', 'partial']
      ]},
      { name: 'Gemeinsame Team-/Agent-Auswahl', rows: [
        ['stable', 'person_id bleibt als Alias verfügbar, der gespeicherte Wert bevorzugt jedoch einen eindeutigen Vornamen oder eine Bezeichnung.', 'IT pflegt die Projektion; Organisation & Personal validiert die Referenzkennung.', 'Der operative Wert beruht noch nicht auf der stabilen RH-001-Kennung.', 'open'],
        ['scope', 'Die Projektion übernimmt aktive TZH-/TSN-Mitglieder und ergänzt je Team ein getrenntes Kollektiv.', 'Die verbrauchende Funktion validiert die Zuweisung; Organisation & Personal rahmt Teams.', 'Ausschlüsse, weitere Teams, Gebietswechsel und historische Fälle dokumentieren.', 'partial'],
        ['lifecycle', 'Die Liste wird aus aktuell aktiven Mitgliedern neu aufgebaut.', 'Organisation & Personal validiert Daten; IT projiziert den autorisierten Stand.', 'Frühere Zuweisungen und Teamwechsel werden vom Selektor nicht versioniert.', 'open'],
        ['ownership', 'Die Fachverantwortung der Zuweisung bleibt bei der verbrauchenden Funktion.', 'Verbrauchende Funktion für Auswahl; Organisation & Personal für Mitgliedschaft; IT für die Regel.', 'Projektionsregel und Entscheid zur Autorisierung jeder Nutzung versionieren.', 'partial'],
        ['access', 'Ist RH-001 nicht verfügbar, bleiben nur die vorgesehenen Kollektivoptionen verfügbar.', 'IT kontrolliert den Ersatz; die verbrauchende Funktion kontrolliert die Nutzung.', 'Rechte und Protokolle der Formulare belegen, welche die Zuweisung speichern.', 'partial'],
        ['evidence', 'Optionen tragen technische Aliase und Bezeichnungen ohne Belegstück.', 'DMS bewahrt die Grundlage; die verbrauchende Funktion referenziert den Vorgang.', 'Zuweisung mit REF-01-Ereignis und autorisiertem Nachweis verbinden.', 'open'],
        ['quality', 'Regeln normalisieren TZH/TSN, weisen unmögliche Paare ab und sind durch Tests gedeckt.', 'IT pflegt Kontrollen; Organisation & Personal entscheidet Inkonsistenzen.', 'Historische Herkunft bewahren und Korrekturen bei allen Verbrauchern steuern.', 'observed']
      ]},
      { name: 'DMS · autorisierte Personalnachweise', rows: [
        ['stable', 'Unterlagen sind als Nachweise getrennt von operativen REF-01-Objekten gerahmt.', 'DMS bewahrt Unterlagen; Organisation & Personal bestimmt das verbundene Fachobjekt.', 'Noch keine governance-konforme stabile Unterlage-Person-Team-Ereignis-Verbindung beobachtet.', 'open'],
        ['scope', 'Der Rahmen nennt autorisierte Mandate, Verträge, Entscheide und Belege.', 'Organisation & Personal klassiert Inhalt; DMS setzt den Ablageplan um.', 'Ein- und Ausschlüsse, Gebiete und erwartete Unterlagen je Ereignistyp versionieren.', 'partial'],
        ['lifecycle', 'DMS ist zur Bewahrung von Entscheiden, Versionen und Nachweisen vorgesehen.', 'DMS bewahrt Versionen; Organisation & Personal validiert verbundene Ereignisse.', 'Kette zwischen Vorversion, Wirksamkeitsdatum und REF-01-Ereignis belegen.', 'partial'],
        ['ownership', 'REF-01 weist DMS die Nachweisverwahrung und Organisation & Personal die Fachbedeutung zu.', 'Organisation & Personal entscheidet Fachklassierung; DMS sichert Aufbewahrung.', 'Einlieferungs-, Validierungs- und Archivierungsautorität je Unterlagentyp benennen.', 'partial'],
        ['access', 'Der Umfang betrifft nur autorisierte Personalnachweise getrennt von globalen Ansichten.', 'Organisation & Personal definiert Rechte; DMS und IT setzen sie um.', 'Klassifizierung, geringste Berechtigung, Protokollierung und Zugriffsprüfungen erstellen.', 'partial'],
        ['evidence', 'Die festgehaltene DMS-Rolle ist die Bewahrung von Versionen, Entscheiden und Belegen.', 'DMS trägt Aufbewahrung und Integrität; Organisation & Personal die fachliche Beweiskraft.', 'Fristen, Aussonderung, Pflichtreferenzen und Integritätskontrollen definieren.', 'partial'],
        ['quality', 'Keine automatisierte Konsistenzkontrolle mit RH-001 oder Verbrauchern ist beobachtet.', 'Organisation & Personal entscheidet; DMS und IT führen autorisierte Kontrollen aus.', 'Abweichungen, Duplikate, Korrekturen und Weitergabe ohne Offenlegung sensibler Unterlagen definieren.', 'open']
      ]}
    ],
    boundary: 'Nur beschreibende Lesart: Keine Zeile qualifiziert einen Träger, validiert Personendaten, bestimmt eine Masterquelle oder misst Fortschritt.'
  }
};

const EvidenceState = ({ state, label }) => (
  <span className={`ref01-evidence-state ref01-evidence-state--${state} inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATE_STYLES[state]}`}>
    {label}
  </span>
);

const InstitutionalPeopleTeamsEvidenceMatrix = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const flatRows = t.supports.flatMap(support => support.rows.map(row => ({ support: support.name, row })));
  const CounterIcons = [FileSearch, ShieldCheck, TableProperties, ClipboardCheck];

  return (
    <section
      id="institutional-ref01-evidence-matrix"
      data-control-count={flatRows.length}
      className="m3s-ref01-evidence-matrix mt-4 rounded-md border border-sky-800/70 bg-sky-950/10 p-4 scroll-mt-24"
      aria-labelledby="institutional-ref01-evidence-matrix-title"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-evidence-matrix-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <ClipboardCheck className="shrink-0 text-sky-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([label, value], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-24 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold leading-5 text-slate-300">{label}</p><p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 3 ? 'text-amber-300' : 'text-sky-300'} size={18} aria-hidden="true" />
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
        <table className="w-full min-w-[1500px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.support}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.criterion}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.evidence}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.owner}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.gap}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.state}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {flatRows.map(({ support, row }) => {
              const [criterion, evidence, owner, gap, state] = row;
              return (
                <tr key={`${support}-${criterion}`} className="align-top" data-testid="ref01-evidence-row">
                  <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{support}</th>
                  <td className="px-3 py-3 font-semibold text-sky-200">{t.criteria[criterion]}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{evidence}</td>
                  <td className="px-3 py-3 leading-5 text-slate-300">{owner}</td>
                  <td className="px-3 py-3 leading-5 text-amber-100">{gap}</td>
                  <td className="px-3 py-3"><EvidenceState state={state} label={t.states[state]} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-4 xl:hidden">
        {t.supports.map(support => (
          <section key={support.name} className="overflow-hidden rounded-md border border-slate-700" aria-label={support.name}>
            <h6 className="ref01-evidence-support-heading border-b border-slate-700 bg-slate-900/60 px-3 py-3 text-sm font-semibold text-slate-100">{support.name}</h6>
            <div className="divide-y divide-slate-700">
              {support.rows.map(([criterion, evidence, owner, gap, state]) => (
                <article key={criterion} className="p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-sky-200">{t.criteria[criterion]}</p>
                    <EvidenceState state={state} label={t.states[state]} />
                  </div>
                  <dl className="mt-3 space-y-3">
                    <div><dt className="text-xs font-semibold text-slate-400">{t.labels.evidence}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{evidence}</dd></div>
                    <div><dt className="text-xs font-semibold text-slate-400">{t.labels.owner}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{owner}</dd></div>
                    <div><dt className="text-xs font-semibold text-amber-300">{t.labels.gap}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{gap}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200">
        <AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}
      </p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEvidenceMatrix;
