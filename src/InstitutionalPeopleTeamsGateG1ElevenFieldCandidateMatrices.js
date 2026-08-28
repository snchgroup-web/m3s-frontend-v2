import React from 'react';
import { AlertTriangle, Archive, CheckCircle2, KeyRound, ListChecks, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import InstitutionalPeopleTeamsGateG1LegalRetentionFramework from './InstitutionalPeopleTeamsGateG1LegalRetentionFramework';

const STATE_STYLES = {
  sourced: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-100',
  confirmed: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  legal: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  partial: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  open: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'MATRICES CONFIRMÉES · QUALIFICATION DES ONZE CHAMPS · 28-08-2026',
    title: 'Confirmer les valeurs et instruire les deux champs LEGAL',
    intro: 'Cheikh confirme les quatre valeurs sourcées et les cinq valeurs partielles comme état de travail gouverné. Les deux champs LEGAL disposent maintenant d un cadre officiel candidat, séparé de toute validation de conformité ou exécution.',
    counters: [['Matrices confirmées', '2/2', 'Deux portées toujours séparées'], ['Valeurs confirmées', '9/9', 'Quatre sourcées · cinq de travail'], ['Champs LEGAL instruits', '2/2', 'Cadre sourcé · applicabilité à valider'], ['Autorisations', '0', 'Aucun droit ni traitement ouvert']],
    badge: 'STRUCTURE CONFIRMÉE · V1.0',
    labels: { basis: 'Cadre et preuve', format: 'Structure retenue', supports: 'Sources rapprochées', value: 'Valeur qualifiée', stop: 'Arrêt obligatoire' },
    states: { sourced: 'SOURCÉ · CONFIRMÉ', confirmed: 'TRAVAIL · CONFIRMÉ', legal: 'LEGAL SOURCÉ · À VALIDER', partial: 'PARTIEL · À ARBITRER', open: 'OUVERT · SOURCE REQUISE' },
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V1.0', title: 'Conservation et GED', icon: Archive,
        basis: 'Structure confirmée par REF-01-DEC-041 · cadre AUT-02-03-001 V1.0 · principes REF-01-DEC-013 et COL-002 V1.0',
        rows: [
          { field: 'Durées applicables', format: 'Durée, unité, fondement, point de départ et sort final', supports: 'PFPDT Suisse · CDP Sénégal · OHADA · LEGAL · Administration', value: 'Cadre candidat par catégorie : finalité active puis suppression/anonymisation ; Suisse, jusqu à 3 mois pour une candidature non retenue, 5 ans pour les données salariales, 10 ans pour le certificat de travail et les pièces comptables ; Sénégal/OHADA, 10 ans pour les pièces comptables des entités concernées. Applicabilité à valider.', state: 'legal' },
          { field: 'Déclencheurs précis', format: 'Événement daté, objet concerné et règle de calcul', supports: 'COL-02-03 · contrat RH-001 · cycle de vie REF-01', value: 'Événements candidats documentés : validation de la pièce ; fin d’affectation ou clôture ; expiration ou révocation d’un droit ; ouverture ou levée d’un gel ; fin de conservation.', state: 'confirmed' },
          { field: 'Autorités nominatives', format: 'Fonction autorisée, personne désignée et preuve du mandat', supports: 'REF-01-DEC-001 à 042 · Gouvernance · Organisation & RH', value: 'Cheikh Ndiaye est l’autorité de décision de gouvernance du lot. Les autorités nominatives de versement, contrôle, archivage et suppression ne sont pas encore désignées.', state: 'confirmed' },
          { field: 'Règles locales', format: 'Territoire, règle, version et date d’effet', supports: 'Contexte maître 2SG · LPD Suisse · loi sénégalaise n° 2008-12 · CDP · OHADA', value: 'La Suisse constitue le cadre central du siège 2SG : finalité, proportionnalité, transparence et suppression/anonymisation. Le Sénégal applique la nécessité, l information sur la durée et la destruction ou l archivage à échéance. Le rattachement territorial, les transferts et le référentiel OHADA restent à confirmer par LEGAL.', state: 'legal' },
          { field: 'Références de pièces autorisées', format: 'Identifiant GED, type de pièce et niveau C2/C3/C4', supports: 'REF-01-DEC-013 · contrat RH-001 · cadrage GED', value: 'Format autorisé : référence GED opaque uniquement, sans copie de pièce dans REF-01 ni dans le bundle public. Aucune référence réelle C3/C4 n’est désignée.', state: 'sourced' }
        ],
        stop: 'Arrêt avant fixation d’une durée, promotion d’une règle juridique, désignation d’une autorité supplémentaire, référence réelle C3/C4 ou opération GED.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V1.0', title: 'Rôles et moindre privilège', icon: KeyRound,
        basis: 'Structure confirmée par REF-01-DEC-041 · contrat API RH-001 · contrôles de production du 31-07-2026 · REF-01-DEC-013',
        rows: [
          { field: 'Titulaires réels', format: 'Identifiant institutionnel, fonction, équipe et preuve du mandat', supports: 'Contrat RH-001 · authentification de production · décision de gouvernance', value: 'Cheikh Ndiaye : compte historique au rôle source Manager, mappé vers le rôle canonique Admin pour le pilote RH-001. Aucune autre attribution réelle n’est établie par ce lot.', state: 'sourced' },
          { field: 'Droits effectifs', format: 'Action, objet, niveau et justification métier', supports: 'GET /api/members-directory · tests 401/403 · contrat RH-001', value: 'Lecture seule de l’annuaire C2 assaini via GET /api/members-directory pour le rôle Admin ; huit champs autorisés ; toutes les écritures fermées ; 401 sans authentification et 403 sans droit. Admin seul reste insuffisant pour C4/C5.', state: 'sourced' },
          { field: 'Périmètres de lignes', format: 'Fonction, équipe, territoire et critère de propriété', supports: 'Annuaire RH-001 · filtres Team et type de membre · pagination contrôlée', value: 'Périmètre observé : six enregistrements C2 de l’annuaire, filtrables par Team et type de membre, sans champ C4/C5. Aucun périmètre plus fin par propriétaire, fonction ou territoire n’est encore défini.', state: 'confirmed' },
          { field: 'Délégations', format: 'Délégant, délégataire, portée, début, fin et preuve', supports: 'Contrat RH-001 · DATA_DICTIONARY_M3S · Gouvernance', value: 'Aucune délégation active n’est documentée. Toute future délégation devra identifier délégant, délégataire, portée, approbateur, début, expiration et preuve.', state: 'confirmed' },
          { field: 'Fréquence de revue', format: 'Cadence ou événement, responsable et preuve attendue', supports: 'Contrat RH-001 · cycle des habilitations · Gouvernance', value: 'Revue candidate lors de toute attribution, modification, révocation ou expiration d’un droit. La cadence périodique reste à fixer.', state: 'confirmed' },
          { field: 'Exceptions autorisées', format: 'Motif, portée, autorité, expiration et contrôle compensatoire', supports: 'REF-01-DEC-013 · contrat RH-001 · règles C4/C5', value: 'Aucune exception permanente n’est autorisée. Le refus par défaut s’applique ; toute future exception doit être séparée, justifiée, approuvée, limitée dans le temps et journalisée. Le rôle Admin n’ouvre pas automatiquement C4/C5.', state: 'sourced' }
        ],
        stop: 'Arrêt avant attribution, retrait ou extension d’un droit, création de compte, délégation, exception, accès C4/C5 ou modification d’un périmètre réel.'
      }
    ],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    previousRecord: { id: 'REF-01-DEC-041', version: 'V1.0', status: 'Deux structures de matrice confirmées', author: 'Cheikh Ndiaye', date: '28-08-2026', decision: 'REF-01-G1-AUT-02-03-002 V0.1 et REF-01-G1-AUT-02-02-002 V0.1 sont confirmées ensemble et promues en V1.0 comme structures distinctes. Les onze champs peuvent être qualifiés uniquement selon le niveau de preuve disponible.', evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026 : « je confirme les 2 matrices V0.1 » ; matrices candidates publiées par la PR frontend nº 231 au commit 9ec7e0d.', limit: 'La confirmation porte sur les structures. Elle ne fixe aucune durée légale et n’autorise aucun compte, droit, délégation, exception, accès, pièce ou opération GED.' },
    record: { id: 'REF-01-DEC-042', version: 'V1.0', status: 'Neuf valeurs confirmées · deux champs LEGAL instruits', author: 'Cheikh Ndiaye', date: '28-08-2026', decision: 'Les quatre valeurs sourcées et les cinq valeurs partielles sont confirmées comme état gouverné du lot. Les durées applicables et règles locales sont instruites dans REF-01-G1-AUT-02-03-003 V0.1 à partir de sources officielles Suisse, Sénégal et OHADA.', evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026 : « je confirme les 4 et les 5 » ; rapprochement LEGAL borné aux sources officielles référencées dans la matrice candidate.', limit: 'La confirmation des cinq valeurs conserve leurs réserves. Le cadre LEGAL reste candidat : il ne constitue pas un avis juridique, ne conclut pas à la conformité, ne tranche pas seul l applicabilité et ne déclenche aucune conservation, suppression, archive, gel ou opération GED.' },
    status: 'NEUF VALEURS CONFIRMÉES · Deux champs LEGAL instruits par un cadre sourcé candidat. Zéro autorisation d exécution.',
    next: 'Prochain arbitrage humain : faire contrôler l applicabilité de REF-01-G1-AUT-02-03-003 V0.1 par LEGAL, puis désigner les catégories réellement utilisées par REF-01 avant toute durée opérationnelle.',
    boundary: 'Les valeurs décrivent l’état prouvé ou candidat au 28-08-2026. Elles ne créent aucun droit, aucune règle juridique, aucune délégation, aucun accès C3/C4/C5 et aucune opération GED.'
  },
  EN: {
    eyebrow: 'CONFIRMED MATRICES · ELEVEN-FIELD QUALIFICATION · 28 AUG 2026',
    title: 'Confirm the values and establish the two LEGAL fields',
    intro: 'Cheikh confirms the four sourced values and five partial values as the governed working state. The two LEGAL fields now have a sourced candidate framework, separate from any compliance conclusion or execution.',
    counters: [['Confirmed matrices', '2/2', 'Two scopes remain separate'], ['Confirmed values', '9/9', 'Four sourced · five working values'], ['LEGAL fields established', '2/2', 'Sourced framework · applicability to validate'], ['Authorisations', '0', 'No right or processing opened']],
    badge: 'CONFIRMED STRUCTURE · V1.0',
    labels: { basis: 'Framework and evidence', format: 'Retained structure', supports: 'Reconciled sources', value: 'Qualified value', stop: 'Mandatory stop' },
    states: { sourced: 'SOURCED · CONFIRMED', confirmed: 'WORKING VALUE · CONFIRMED', legal: 'LEGAL SOURCED · TO VALIDATE', partial: 'PARTIAL · DECISION REQUIRED', open: 'OPEN · SOURCE REQUIRED' },
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V1.0', title: 'Retention and DMS', icon: Archive,
        basis: 'Structure confirmed by REF-01-DEC-041 · AUT-02-03-001 V1.0 framework · REF-01-DEC-013 and COL-002 V1.0 principles',
        rows: [
          { field: 'Applicable periods', format: 'Period, unit, basis, starting point and final treatment', supports: 'Swiss FDPIC · Senegal CDP · OHADA · LEGAL · Administration', value: 'Candidate category framework: active purpose followed by deletion/anonymisation; Switzerland, up to 3 months for an unsuccessful application, 5 years for salary data, 10 years for employment-reference and accounting records; Senegal/OHADA, 10 years for accounting evidence of concerned entities. Applicability remains to validate.', state: 'legal' },
          { field: 'Precise triggers', format: 'Dated event, concerned object and calculation rule', supports: 'COL-02-03 · RH-001 contract · REF-01 lifecycle', value: 'Documented candidate events: record validation; end of assignment or closure; right expiry or revocation; opening or lifting a hold; end of retention.', state: 'confirmed' },
          { field: 'Named authorities', format: 'Authorised function, designated person and mandate evidence', supports: 'REF-01-DEC-001 through 042 · Governance · Organisation & HR', value: 'Cheikh Ndiaye is the governance decision authority for this package. Named deposit, control, archive and deletion authorities are not yet designated.', state: 'confirmed' },
          { field: 'Local rules', format: 'Territory, rule, version and effective date', supports: '2SG master context · Swiss FADP · Senegal Law No. 2008-12 · CDP · OHADA', value: 'Switzerland is the central framework for 2SG s seat: purpose, proportionality, transparency and deletion/anonymisation. Senegal applies necessity, period notice, and destruction or archiving at expiry. Territorial connection, transfers and OHADA scope remain for LEGAL confirmation.', state: 'legal' },
          { field: 'Authorised record references', format: 'DMS identifier, record type and C2/C3/C4 level', supports: 'REF-01-DEC-013 · RH-001 contract · DMS framing', value: 'Authorised format: opaque DMS reference only, with no record copied into REF-01 or the public bundle. No real C3/C4 reference is designated.', state: 'sourced' }
        ],
        stop: 'Stop before setting a period, promoting a legal rule, naming an additional authority, using a real C3/C4 reference or performing a DMS operation.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V1.0', title: 'Roles and least privilege', icon: KeyRound,
        basis: 'Structure confirmed by REF-01-DEC-041 · RH-001 API contract · 31 July 2026 production controls · REF-01-DEC-013',
        rows: [
          { field: 'Real holders', format: 'Institutional identifier, function, team and mandate evidence', supports: 'RH-001 contract · production authentication · governance decision', value: 'Cheikh Ndiaye: historical account with source role Manager, mapped to canonical Admin for the RH-001 pilot. No other real assignment is established by this package.', state: 'sourced' },
          { field: 'Effective rights', format: 'Action, object, level and business justification', supports: 'GET /api/members-directory · 401/403 tests · RH-001 contract', value: 'Read-only access to the sanitised C2 directory through GET /api/members-directory for Admin; eight authorised fields; all writes closed; 401 without authentication and 403 without permission. Admin alone remains insufficient for C4/C5.', state: 'sourced' },
          { field: 'Row scopes', format: 'Function, team, territory and ownership criterion', supports: 'RH-001 directory · Team and member-type filters · controlled pagination', value: 'Observed scope: six C2 directory records, filterable by Team and member type, with no C4/C5 field. No finer scope by owner, function or territory is defined yet.', state: 'confirmed' },
          { field: 'Delegations', format: 'Delegator, delegate, scope, start, end and evidence', supports: 'RH-001 contract · DATA_DICTIONARY_M3S · Governance', value: 'No active delegation is documented. Any future delegation must identify delegator, delegate, scope, approver, start, expiry and evidence.', state: 'confirmed' },
          { field: 'Review frequency', format: 'Cadence or event, owner and expected evidence', supports: 'RH-001 contract · entitlement lifecycle · Governance', value: 'Candidate review whenever a right is assigned, changed, revoked or expires. The periodic cadence remains unset.', state: 'confirmed' },
          { field: 'Authorised exceptions', format: 'Reason, scope, authority, expiry and compensating control', supports: 'REF-01-DEC-013 · RH-001 contract · C4/C5 rules', value: 'No standing exception is authorised. Default denial applies; any future exception must be separate, justified, approved, time-limited and logged. Admin does not automatically open C4/C5.', state: 'sourced' }
        ],
        stop: 'Stop before assigning, removing or extending a right, creating an account, delegation or exception, accessing C4/C5 or changing a real scope.'
      }
    ],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    previousRecord: { id: 'REF-01-DEC-041', version: 'V1.0', status: 'Two matrix structures confirmed', author: 'Cheikh Ndiaye', date: '28 Aug 2026', decision: 'REF-01-G1-AUT-02-03-002 V0.1 and REF-01-G1-AUT-02-02-002 V0.1 are confirmed together and promoted to V1.0 as separate structures. Their eleven fields may be qualified only according to available evidence.', evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session: “je confirme les 2 matrices V0.1”; candidate matrices published through frontend PR 231 at commit 9ec7e0d.', limit: 'Confirmation covers the structures. It sets no legal period and authorises no account, right, delegation, exception, access, record or DMS operation.' },
    record: { id: 'REF-01-DEC-042', version: 'V1.0', status: 'Nine values confirmed · two LEGAL fields established', author: 'Cheikh Ndiaye', date: '28 Aug 2026', decision: 'The four sourced and five partial values are confirmed as the governed package state. Applicable periods and local rules are established in REF-01-G1-AUT-02-03-003 V0.1 from official Swiss, Senegalese and OHADA sources.', evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session: “je confirme les 4 et les 5”; LEGAL reconciliation bounded to the official sources referenced in the candidate matrix.', limit: 'Confirmation of the five values preserves their reservations. The LEGAL framework remains a candidate: it is not legal advice, does not assert compliance, does not by itself settle applicability, and triggers no retention, deletion, archive, hold or DMS operation.' },
    status: 'NINE VALUES CONFIRMED · Two LEGAL fields established through a sourced candidate framework. Zero execution authorisations.',
    next: 'Next human decision: have LEGAL review the applicability of REF-01-G1-AUT-02-03-003 V0.1, then designate the categories actually used by REF-01 before any operational period.',
    boundary: 'Values describe the evidenced or candidate state on 28 Aug 2026. They create no right, legal rule, delegation, C3/C4/C5 access or DMS operation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE MATRIZEN · QUALIFIZIERUNG DER ELF FELDER · 28.08.2026',
    title: 'Werte bestätigen und die beiden LEGAL-Felder bestimmen',
    intro: 'Cheikh bestätigt die vier belegten und fünf teilweisen Werte als gesteuerten Arbeitsstand. Die beiden LEGAL-Felder besitzen nun einen belegten Kandidatenrahmen, getrennt von jeder Konformitätsaussage oder Ausführung.',
    counters: [['Bestätigte Matrizen', '2/2', 'Zwei getrennte Umfänge'], ['Bestätigte Werte', '9/9', 'Vier belegt · fünf Arbeitswerte'], ['Bestimmte LEGAL-Felder', '2/2', 'Belegter Rahmen · Anwendbarkeit zu prüfen'], ['Autorisierungen', '0', 'Kein Recht oder Vorgang geöffnet']],
    badge: 'STRUKTUR BESTÄTIGT · V1.0',
    labels: { basis: 'Rahmen und Nachweis', format: 'Bestätigte Struktur', supports: 'Abgeglichene Quellen', value: 'Qualifizierter Wert', stop: 'Pflichtstopp' },
    states: { sourced: 'BELEGT · BESTÄTIGT', confirmed: 'ARBEITSWERT · BESTÄTIGT', legal: 'LEGAL BELEGT · ZU PRÜFEN', partial: 'TEILWEISE · ENTSCHEID NÖTIG', open: 'OFFEN · QUELLE NÖTIG' },
    matrices: [
      {
        id: 'REF-01-G1-AUT-02-03-002', version: 'V1.0', title: 'Aufbewahrung und DMS', icon: Archive,
        basis: 'Struktur bestätigt durch REF-01-DEC-041 · Rahmen AUT-02-03-001 V1.0 · Prinzipien REF-01-DEC-013 und COL-002 V1.0',
        rows: [
          { field: 'Anwendbare Fristen', format: 'Frist, Einheit, Grundlage, Startpunkt und Endbehandlung', supports: 'EDOEB Schweiz · CDP Senegal · OHADA · LEGAL · Verwaltung', value: 'Kandidatenrahmen je Kategorie: aktiver Zweck, danach Löschung/Anonymisierung; Schweiz bis 3 Monate für erfolglose Bewerbung, 5 Jahre für Lohndaten, 10 Jahre für Arbeitszeugnis- und Buchhaltungsdaten; Senegal/OHADA 10 Jahre für Buchhaltungsbelege betroffener Einheiten. Anwendbarkeit zu prüfen.', state: 'legal' },
          { field: 'Genaue Auslöser', format: 'Datiertes Ereignis, betroffenes Objekt und Berechnungsregel', supports: 'COL-02-03 · RH-001-Vertrag · REF-01-Lebenszyklus', value: 'Dokumentierte Kandidatenereignisse: Validierung der Unterlage; Ende einer Zuweisung oder Abschluss; Ablauf oder Entzug eines Rechts; Beginn oder Aufhebung einer Sperre; Ende der Aufbewahrung.', state: 'confirmed' },
          { field: 'Benannte Autoritäten', format: 'Autorisierte Funktion, bezeichnete Person und Mandatsnachweis', supports: 'REF-01-DEC-001 bis 042 · Governance · Organisation & Personal', value: 'Cheikh Ndiaye ist die Governance-Entscheidautorität des Pakets. Namentliche Zuständigkeiten für Ablage, Kontrolle, Archivierung und Löschung sind noch nicht bestimmt.', state: 'confirmed' },
          { field: 'Lokale Regeln', format: 'Gebiet, Regel, Version und Gültigkeitsdatum', supports: '2SG-Masterkontext · Schweizer DSG · senegalesisches Gesetz Nr. 2008-12 · CDP · OHADA', value: 'Die Schweiz ist der zentrale Rahmen des 2SG-Sitzes: Zweck, Verhältnismässigkeit, Transparenz und Löschung/Anonymisierung. Senegal verlangt Notwendigkeit, Fristinformation und Löschung oder Archivierung bei Ablauf. Gebietsbezug, Transfers und OHADA-Umfang bleiben durch LEGAL zu bestätigen.', state: 'legal' },
          { field: 'Autorisierte Unterlagenreferenzen', format: 'DMS-Kennung, Unterlagentyp und C2/C3/C4-Stufe', supports: 'REF-01-DEC-013 · RH-001-Vertrag · DMS-Rahmen', value: 'Autorisierte Form: nur opake DMS-Referenz, ohne Kopie der Unterlage in REF-01 oder im öffentlichen Bundle. Keine reale C3/C4-Referenz ist bestimmt.', state: 'sourced' }
        ],
        stop: 'Stopp vor Festlegung einer Frist, Hochstufung einer Rechtsregel, Benennung einer weiteren Autorität, realer C3/C4-Referenz oder DMS-Operation.'
      },
      {
        id: 'REF-01-G1-AUT-02-02-002', version: 'V1.0', title: 'Rollen und geringste Berechtigung', icon: KeyRound,
        basis: 'Struktur bestätigt durch REF-01-DEC-041 · RH-001-API-Vertrag · Produktionskontrollen vom 31.07.2026 · REF-01-DEC-013',
        rows: [
          { field: 'Reale Inhaber', format: 'Institutionelle Kennung, Funktion, Team und Mandatsnachweis', supports: 'RH-001-Vertrag · Produktionsauthentifizierung · Governance-Entscheid', value: 'Cheikh Ndiaye: historisches Konto mit Quellrolle Manager, für den RH-001-Piloten auf die kanonische Rolle Admin abgebildet. Keine weitere reale Zuweisung wird durch dieses Paket belegt.', state: 'sourced' },
          { field: 'Wirksame Rechte', format: 'Aktion, Objekt, Stufe und fachliche Begründung', supports: 'GET /api/members-directory · 401/403-Tests · RH-001-Vertrag', value: 'Nur-Lese-Zugriff auf das bereinigte C2-Verzeichnis über GET /api/members-directory für Admin; acht erlaubte Felder; alle Schreibwege geschlossen; 401 ohne Authentifizierung und 403 ohne Recht. Admin allein genügt nicht für C4/C5.', state: 'sourced' },
          { field: 'Zeilenumfänge', format: 'Funktion, Team, Gebiet und Eigentumskriterium', supports: 'RH-001-Verzeichnis · Team- und Mitgliedstypfilter · kontrollierte Seitennavigation', value: 'Beobachteter Umfang: sechs C2-Verzeichniseinträge, nach Team und Mitgliedstyp filterbar, ohne C4/C5-Feld. Ein feinerer Umfang nach Eigentümer, Funktion oder Gebiet ist noch nicht definiert.', state: 'confirmed' },
          { field: 'Delegationen', format: 'Delegierende, delegierte Person, Umfang, Beginn, Ende und Nachweis', supports: 'RH-001-Vertrag · DATA_DICTIONARY_M3S · Governance', value: 'Keine aktive Delegation ist dokumentiert. Jede künftige Delegation muss delegierende und delegierte Person, Umfang, Genehmigung, Beginn, Ablauf und Nachweis bestimmen.', state: 'confirmed' },
          { field: 'Prüffrequenz', format: 'Rhythmus oder Ereignis, Verantwortung und erwarteter Nachweis', supports: 'RH-001-Vertrag · Berechtigungslebenszyklus · Governance', value: 'Kandidatenprüfung bei Zuweisung, Änderung, Entzug oder Ablauf eines Rechts. Der periodische Rhythmus ist noch nicht festgelegt.', state: 'confirmed' },
          { field: 'Autorisierte Ausnahmen', format: 'Grund, Umfang, Autorität, Ablauf und kompensierende Kontrolle', supports: 'REF-01-DEC-013 · RH-001-Vertrag · C4/C5-Regeln', value: 'Keine dauerhafte Ausnahme ist autorisiert. Standardverweigerung gilt; jede künftige Ausnahme muss getrennt, begründet, genehmigt, zeitlich begrenzt und protokolliert sein. Admin öffnet C4/C5 nicht automatisch.', state: 'sourced' }
        ],
        stop: 'Stopp vor Zuweisung, Entzug oder Erweiterung eines Rechts, Kontoerstellung, Delegation, Ausnahme, C4/C5-Zugriff oder Änderung eines realen Umfangs.'
      }
    ],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    previousRecord: { id: 'REF-01-DEC-041', version: 'V1.0', status: 'Zwei Matrixstrukturen bestätigt', author: 'Cheikh Ndiaye', date: '28.08.2026', decision: 'REF-01-G1-AUT-02-03-002 V0.1 und REF-01-G1-AUT-02-02-002 V0.1 sind gemeinsam bestätigt und werden als getrennte Strukturen zu V1.0. Ihre elf Felder dürfen nur gemäss verfügbarer Nachweise qualifiziert werden.', evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 28.08.2026: « je confirme les 2 matrices V0.1 »; Kandidatenmatrizen veröffentlicht mit Frontend-PR 231 am Commit 9ec7e0d.', limit: 'Die Bestätigung betrifft die Strukturen. Sie setzt keine Rechtsfrist fest und autorisiert kein Konto, Recht, Delegation, Ausnahme, keinen Zugriff, keine Unterlage und keine DMS-Operation.' },
    record: { id: 'REF-01-DEC-042', version: 'V1.0', status: 'Neun Werte bestätigt · zwei LEGAL-Felder bestimmt', author: 'Cheikh Ndiaye', date: '28.08.2026', decision: 'Die vier belegten und fünf teilweisen Werte sind als gesteuerter Paketstand bestätigt. Anwendbare Fristen und lokale Regeln werden in REF-01-G1-AUT-02-03-003 V0.1 anhand amtlicher Schweizer, senegalesischer und OHADA-Quellen bestimmt.', evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 28.08.2026: « je confirme les 4 et les 5 »; LEGAL-Abgleich begrenzt auf die in der Kandidatenmatrix referenzierten amtlichen Quellen.', limit: 'Die Bestätigung der fünf Werte bewahrt ihre Vorbehalte. Der LEGAL-Rahmen bleibt Kandidat: keine Rechtsberatung, keine Konformitätsaussage, keine alleinige Klärung der Anwendbarkeit und keine Aufbewahrung, Löschung, Archivierung, Sperre oder DMS-Operation.' },
    status: 'NEUN WERTE BESTÄTIGT · Zwei LEGAL-Felder durch einen belegten Kandidatenrahmen bestimmt. Null Ausführungsautorisierungen.',
    next: 'Nächster menschlicher Entscheid: Anwendbarkeit von REF-01-G1-AUT-02-03-003 V0.1 durch LEGAL prüfen lassen und danach die von REF-01 tatsächlich genutzten Kategorien vor jeder operativen Frist bestimmen.',
    boundary: 'Die Werte beschreiben den belegten oder Kandidatenstand vom 28.08.2026. Sie schaffen kein Recht, keine Rechtsregel, Delegation, keinen C3/C4/C5-Zugriff und keine DMS-Operation.'
  }
};

const InstitutionalPeopleTeamsGateG1ElevenFieldCandidateMatrices = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-eleven-field-candidate-matrices" className="m3s-ref01-g1-aut-cd-documentary-files mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-eleven-field-candidate-matrices-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-eleven-field-candidate-matrices-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ListChecks className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 3 ? <CheckCircle2 className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {t.matrices.map(matrix => { const Icon = matrix.icon; return <article key={matrix.id} data-testid="ref01-g1-eleven-field-candidate-matrix" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-sky-300" size={19} aria-hidden="true" /><div className="min-w-0"><h6 className="break-words text-sm font-semibold text-slate-100">{matrix.id} · {matrix.version}</h6><p className="mt-1 text-xs font-semibold text-violet-200">{matrix.title}</p></div></div><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-3"><p className="text-xs font-semibold text-sky-200">{t.labels.basis}</p><p className="mt-1 text-xs leading-5 text-slate-300">{matrix.basis}</p></div><div className="mt-3 grid grid-cols-1 gap-3 2xl:grid-cols-2">{matrix.rows.map(row => <section key={row.field} data-testid="ref01-g1-eleven-field-candidate-row" className="rounded-md border border-slate-700 bg-slate-950/15 p-3"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="text-xs font-semibold text-slate-100">{row.field}</h6><span className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${STATE_STYLES[row.state]}`}>{t.states[row.state]}</span></div><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.format}</dt><dd className="mt-0.5 text-slate-300">{row.format}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.supports}</dt><dd className="mt-0.5 text-slate-300">{row.supports}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.value}</dt><dd className="mt-0.5 text-slate-200">{row.value}</dd></div></dl></section>)}</div><p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" /><span><span className="block">{t.labels.stop}</span>{matrix.stop}</span></p></article>; })}
      </div>
      <InstitutionalPeopleTeamsGateG1LegalRetentionFramework language={language} />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.previousRecord} className="mt-4" />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} className="mt-4" />
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ElevenFieldCandidateMatrices;
