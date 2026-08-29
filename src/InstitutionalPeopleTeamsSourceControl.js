import React from 'react';
import {
  AlertTriangle,
  Database,
  Eye,
  FileArchive,
  ListChecks,
  SlidersHorizontal
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';
import InstitutionalPeopleTeamsEvidenceMatrix from './InstitutionalPeopleTeamsEvidenceMatrix';
import InstitutionalPeopleTeamsEvidenceReview from './InstitutionalPeopleTeamsEvidenceReview';
import InstitutionalPeopleTeamsEvidenceResults from './InstitutionalPeopleTeamsEvidenceResults';
import InstitutionalPeopleTeamsGapPriorities from './InstitutionalPeopleTeamsGapPriorities';
import InstitutionalPeopleTeamsEventContract from './InstitutionalPeopleTeamsEventContract';
import InstitutionalPeopleTeamsTechnicalFraming from './InstitutionalPeopleTeamsTechnicalFraming';

const STATUS_STYLES = {
  connected: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-200',
  derived: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  evidence: 'border-violet-700/70 bg-violet-950/25 text-violet-100'
};

const COPY = {
  FR: {
    eyebrow: 'CONTROLE DES SUPPORTS CANDIDATS · REF-01 · V1.63 · 29-08-2026',
    title: 'Comparer les supports sans les promouvoir',
    body: 'Ce comparatif distingue le contrat backend RH-001 candidat du lot L1 isolé, les consommations qu il prévoit et les preuves GED. Aucun endpoint ni raccordement de production n est établi par ce contrôle.',
    counters: [
      ['Supports contrôlés', '4', 'Un contrat candidat, deux consommations prévues et un dépôt de preuves'],
      ['Contrats backend candidats', '1', 'Contrat L1 isolé ; aucun endpoint de production vérifié'],
      ['Consommations candidates', '2', 'Annuaire et sélecteurs prévus ; aucun raccordement de production vérifié'],
      ['Sources maîtresses désignées', '0', 'Décision humaine distincte requise']
    ],
    columns: {
      support: 'Support candidat',
      classification: 'Nature',
      role: 'Rôle documenté ou testé',
      responsibility: 'Responsabilité retenue',
      gap: 'Écart avant décision',
      status: 'État'
    },
    statuses: {
      connected: 'Contrat candidat isolé',
      derived: 'Consommation candidate',
      evidence: 'Preuve séparée'
    },
    rows: [
      {
        support: 'API RH-001 · /members-directory',
        classification: 'Contrat documentaire C2 candidat',
        role: 'Projette huit champs assainis. Le handler local répond sur une fixture synthétique ; aucun endpoint ni annuaire de production n est vérifié.',
        responsibility: 'Organisation & RH porterait le sens métier ; IT protégerait et maintiendrait le contrat après décision et raccordement distincts.',
        gap: 'Déploiement, autorisation de production, unicité, couverture, version du contenu, événements de cycle et circuit de correction restent à établir.',
        status: 'connected'
      },
      {
        support: 'Annuaire interne sécurisé',
        classification: 'Vue candidate de lecture RH-001',
        role: 'Prévoit recherche, filtres et traductions à partir de la réponse candidate RH-001 ; ce contrôle ne prouve ni raccordement ni affichage de données réelles.',
        responsibility: 'Organisation & RH validerait le contenu ; IT maintiendrait l interface et les états d accès après ouverture autorisée.',
        gap: 'Le raccordement, la date et la version de l extrait restent à prouver ; cette vue ne peut pas être promue comme source indépendante.',
        status: 'derived'
      },
      {
        support: 'Sélecteurs partagés Team/Agent',
        classification: 'Projection opérationnelle candidate',
        role: 'Prévoit des options issues des membres actifs RH-001, la normalisation TZH/TSN et un collectif distinct par équipe ; aucune alimentation de production n est établie.',
        responsibility: 'La fonction consommatrice validerait l affectation métier ; IT maintiendrait les règles après raccordement autorisé.',
        gap: 'Alimentation réelle, alias, identifiants maîtres, anciennes valeurs et changements d équipe restent à relier à une provenance vérifiée.',
        status: 'derived'
      },
      {
        support: 'GED · preuves RH autorisées',
        classification: 'Dépôt de preuves séparé',
        role: 'Conserve mandats, contrats, décisions et justificatifs autorisés sans devenir l’annuaire opérationnel des personnes et équipes.',
        responsibility: 'GED conserve versions et preuves ; Organisation & RH contrôle le classement et les droits métier.',
        gap: 'Les liens entre preuve, objet REF-01 et événement de cycle restent à versionner et contrôler.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Sept critères avant toute désignation de source maîtresse',
    criteriaIntro: 'Ces sept critères sont validés comme prérequis obligatoires de toute décision ultérieure. Ils ne constituent ni un score, ni un taux d’avancement.',
    criteria: [
      ['Identifiant stable', 'Unicité, non-réutilisation et règle de correction prouvées.'],
      ['Périmètre et couverture', 'Objets inclus, exclusions, territoires et cas collectifs explicités.'],
      ['Cycle versionné', 'Entrée, affectation, transfert, suspension et clôture conservés dans l’historique.'],
      ['Propriété et validation', 'Responsable métier, garde technique et autorité de décision nommés.'],
      ['Accès et sensibilité', 'Classification C2, moindre privilège, journalisation et absence de repli non autorisé.'],
      ['Preuve et conservation', 'Références GED, durée de conservation et relations avec les événements définies.'],
      ['Qualité et propagation', 'Contrôles de cohérence, écarts, corrections et effets sur les consommateurs maîtrisés.']
    ],
    decisionStatus: 'Critères de décision validés',
    recordLabels: {
      eyebrow: 'Registre de décision gouverné',
      author: 'Auteur de la décision',
      date: 'Date de décision',
      decision: 'Décision enregistrée',
      evidence: 'Preuve de traçabilité',
      limit: 'Portée et réserve'
    },
    record: {
      id: 'REF-01-DEC-003',
      version: 'V1.0',
      status: 'Critères de décision validés',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'Les sept critères sont retenus comme prérequis obligatoires avant toute future désignation d’une source maîtresse REF-01. Chaque support candidat devra être contrôlé critère par critère avec sa preuve, son responsable et son écart.',
      evidence: 'Validation explicite de Cheikh dans la session du 25-08-2026 ; comparatif préparatoire REF-01 V0.5 publié par la PR frontend #185 ; commit de fusion 6be6a4a.',
      limit: 'Cette décision ne désigne ni ne valide aucun support candidat ou source maîtresse. Elle ne valide aucune qualité, complétude, identité civile ou donnée personnelle, n’ouvre aucun accès, ne modifie aucun schéma, ne déclenche aucune automatisation et ne calcule aucune progression.'
    },
    nextControl: 'Confirmer ou amender REF-01-G1-WAV-003 V0.1, l’ouverture préparatoire de trois dossiers techniques isolés.',
    boundary: 'Statut : REF-01-DEC-060 confirme REV-004 V1.0 après les deux sous-lots documentaires. WAV-003 V0.1 prépare trois autorisations unitaires sans ouvrir d’environnement ni de test ; G1 reste ouverte et L2 fermé. Zéro nouveau droit, fiche active, titulaire réel, mandat nominatif, délégation, exception, accès C3/C4/C5, worker, alerte, rejeu ou fournisseur ; décisions sur le lot : 57 ; sources maîtresses désignées : 0 ; changements en production : 0.',
    source: 'Supports contrôlés : contrat candidat API RH-001 du lot L1 isolé, fixture C2 synthétique et tests locaux du handler, Annuaire interne C2, Team/Agent, cadrage GED, décisions REF-01-DEC-001 à REF-01-DEC-060, matrices AUT-02-03-002/AUT-02-02-002 V1.0, cadre LEGAL AUT-02-03-003 V1.0, désignation AUT-02-03-004 V1.0, responsabilités/déclencheurs AUT-02-03-005 V1.0, protocoles de revue AUT-02-03-006 V1.0, registre vide AUT-02-03-007 V1.0, portes AUT-02-03-008 V1.0, fiche de décision AUT-02-03-009 V1.0, protocole AUT-02-03-010 V1.0, fiche GO/NO-GO AUT-02-03-011 V1.0, modèle Rôles et moindre privilège AUT-02-02-003 V1.0, matrice Droits testés et refus AUT-02-02-004 V1.0, protocole Attribution et retrait AUT-02-02-005 V1.0, registre d habilitations AUT-02-02-006 V1.0, portes d ouverture AUT-02-02-007 V1.0, fiche de décision AUT-02-02-008 V1.0, protocole AUT-02-02-009 V1.0, fiche GO/NO-GO AUT-02-02-010 V1.0, réévaluation REV-004 V1.0 et candidat WAV-003 V0.1 ; sources officielles PFPDT Suisse, CDP Sénégal et OHADA.'
  },
  EN: {
    eyebrow: 'CANDIDATE-SUPPORT CONTROL · REF-01 · V1.63 · 29 AUG 2026',
    title: 'Compare supports without promoting them',
    body: 'This comparison separates the isolated L1 candidate RH-001 backend contract, its planned consumers and DMS evidence. This control establishes neither a production endpoint nor a production connection.',
    counters: [
      ['Controlled supports', '4', 'One candidate contract, two planned consumers and one evidence repository'],
      ['Candidate backend contracts', '1', 'Isolated L1 contract; no verified production endpoint'],
      ['Candidate consumers', '2', 'Planned directory and selectors; no verified production connection'],
      ['Designated master sources', '0', 'Separate human decision required']
    ],
    columns: {
      support: 'Candidate support',
      classification: 'Nature',
      role: 'Documented or tested role',
      responsibility: 'Retained responsibility',
      gap: 'Gap before decision',
      status: 'State'
    },
    statuses: {
      connected: 'Isolated candidate contract',
      derived: 'Candidate consumer',
      evidence: 'Separate evidence'
    },
    rows: [
      {
        support: 'RH-001 API · /members-directory',
        classification: 'Candidate C2 documentary contract',
        role: 'Projects eight sanitised fields. The local handler responds against a synthetic fixture; no production endpoint or directory is verified.',
        responsibility: 'Organisation & HR would own business meaning; IT would protect and maintain the contract after separate decision and connection.',
        gap: 'Deployment, production authorisation, uniqueness, coverage, content version, lifecycle events and correction workflow remain to be established.',
        status: 'connected'
      },
      {
        support: 'Secure internal directory',
        classification: 'Candidate RH-001 read view',
        role: 'Plans search, filters and translations from the candidate RH-001 response; this control proves neither a connection nor the display of real data.',
        responsibility: 'Organisation & HR would validate content; IT would maintain the interface and access states after an authorised opening.',
        gap: 'Connection, extract date and version remain to be evidenced; this view cannot be promoted as an independent source.',
        status: 'derived'
      },
      {
        support: 'Shared Team/Agent selectors',
        classification: 'Candidate operational projection',
        role: 'Plans options from active RH-001 members, TZH/TSN normalisation and a separate collective per team; no production feed is established.',
        responsibility: 'The consuming function would validate business assignment; IT would maintain rules after an authorised connection.',
        gap: 'Real feed, aliases, master identifiers, former values and team changes still require verified provenance.',
        status: 'derived'
      },
      {
        support: 'DMS · authorised HR evidence',
        classification: 'Separate evidence repository',
        role: 'Retains authorised mandates, contracts, decisions and evidence without becoming the operational people-and-teams directory.',
        responsibility: 'The DMS retains versions and evidence; Organisation & HR controls classification and business rights.',
        gap: 'Links between evidence, REF-01 object and lifecycle event still need versioning and control.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Seven criteria before any master-source designation',
    criteriaIntro: 'These seven criteria are validated as mandatory prerequisites for any later decision. They are neither a score nor a progress rate.',
    criteria: [
      ['Stable identifier', 'Uniqueness, non-reuse and correction rule evidenced.'],
      ['Scope and coverage', 'Included objects, exclusions, territories and collective cases explicit.'],
      ['Versioned lifecycle', 'Entry, assignment, transfer, suspension and closure retained in history.'],
      ['Ownership and validation', 'Business owner, technical steward and decision authority named.'],
      ['Access and sensitivity', 'C2 classification, least privilege, logging and no unauthorised fallback.'],
      ['Evidence and retention', 'DMS references, retention period and event relationships defined.'],
      ['Quality and propagation', 'Consistency controls, gaps, corrections and consumer effects governed.']
    ],
    decisionStatus: 'Decision criteria validated',
    recordLabels: {
      eyebrow: 'Governed decision record',
      author: 'Decision author',
      date: 'Decision date',
      decision: 'Recorded decision',
      evidence: 'Traceability evidence',
      limit: 'Scope and reservation'
    },
    record: {
      id: 'REF-01-DEC-003',
      version: 'V1.0',
      status: 'Decision criteria validated',
      author: 'Cheikh Ndiaye',
      date: '25 Aug 2026',
      decision: 'The seven criteria are retained as mandatory prerequisites before any future designation of a REF-01 master source. Each candidate support must be reviewed criterion by criterion with its evidence, owner and gap.',
      evidence: 'Explicit validation by Cheikh during the 25 Aug 2026 session; REF-01 V0.5 preparatory comparison published through frontend PR #185; merge commit 6be6a4a.',
      limit: 'This decision neither designates nor validates any candidate support or master source. It validates no quality, completeness, civil identity or personal data, opens no access, changes no schema, triggers no automation and calculates no progress.'
    },
    nextControl: 'Confirm or amend REF-01-G1-WAV-003 V0.1, the preparatory opening of three isolated technical files.',
    boundary: 'Status: REF-01-DEC-060 confirms REV-004 V1.0 after both documentary sub-packages. WAV-003 V0.1 prepares three individual authorisations without opening an environment or test; G1 remains open and L2 closed. Zero new rights, active records, real holders, named mandates, delegations, exceptions, C3/C4/C5 access, workers, alerts, replays or providers; package decisions: 57; designated master sources: 0; production changes: 0.',
    source: 'Controlled supports: isolated L1 candidate RH-001 API contract, synthetic C2 fixture and local handler tests, C2 Internal Directory, Team/Agent, DMS framing, decisions REF-01-DEC-001 through REF-01-DEC-060, AUT-02-03-002/AUT-02-02-002 V1.0 matrices, AUT-02-03-003 V1.0 LEGAL framework, AUT-02-03-004 V1.0 designation, AUT-02-03-005 V1.0 ownership/triggers, AUT-02-03-006 V1.0 review protocols, AUT-02-03-007 V1.0 empty register, AUT-02-03-008 V1.0 gates, AUT-02-03-009 V1.0 decision sheet, AUT-02-03-010 V1.0 protocol, AUT-02-03-011 V1.0 GO/NO-GO sheet, AUT-02-02-003 V1.0 Roles and least privilege model, AUT-02-02-004 V1.0 Tested rights and denials matrix, AUT-02-02-005 V1.0 Grant and withdrawal protocol, AUT-02-02-006 V1.0 access-rights register, AUT-02-02-007 V1.0 opening gates, AUT-02-02-008 V1.0 decision sheet, AUT-02-02-009 V1.0 protocol, AUT-02-02-010 V1.0 GO/NO-GO sheet, REV-004 V1.0 reassessment and WAV-003 V0.1 candidate; official Swiss FDPIC, Senegal CDP and OHADA sources.'
  },
  DE: {
    eyebrow: 'KONTROLLE DER QUELLKANDIDATEN · REF-01 · V1.63 · 29.08.2026',
    title: 'Träger vergleichen, ohne sie zu fördern',
    body: 'Dieser Vergleich trennt den isolierten RH-001-Backend-Kandidatenvertrag des L1-Loses, seine geplanten Verbraucher und DMS-Nachweise. Diese Kontrolle belegt weder einen Produktionsendpunkt noch eine Produktionsverbindung.',
    counters: [
      ['Geprüfte Träger', '4', 'Ein Kandidatenvertrag, zwei geplante Verbraucher und ein Nachweisdepot'],
      ['Backend-Kandidatenverträge', '1', 'Isolierter L1-Vertrag; kein verifizierter Produktionsendpunkt'],
      ['Kandidatenverbraucher', '2', 'Geplantes Verzeichnis und Auswahl; keine verifizierte Produktionsverbindung'],
      ['Bestimmte Masterquellen', '0', 'Getrennter menschlicher Entscheid erforderlich']
    ],
    columns: {
      support: 'Quellkandidat',
      classification: 'Art',
      role: 'Dokumentierte oder getestete Rolle',
      responsibility: 'Festgehaltene Verantwortung',
      gap: 'Abweichung vor Entscheid',
      status: 'Stand'
    },
    statuses: {
      connected: 'Isolierter Kandidatenvertrag',
      derived: 'Kandidatenverbraucher',
      evidence: 'Getrennter Nachweis'
    },
    rows: [
      {
        support: 'RH-001-API · /members-directory',
        classification: 'C2-Dokumentations-Kandidatenvertrag',
        role: 'Projiziert acht bereinigte Felder. Der lokale Handler antwortet mit einer synthetischen Fixture; kein Produktionsendpunkt oder reales Verzeichnis ist verifiziert.',
        responsibility: 'Organisation & Personal würde die Fachbedeutung tragen; IT würde den Vertrag nach getrenntem Entscheid und Anschluss schützen und pflegen.',
        gap: 'Bereitstellung, Produktionsautorisierung, Eindeutigkeit, Abdeckung, Inhaltsversion, Lebenszyklusereignisse und Korrekturablauf sind noch zu belegen.',
        status: 'connected'
      },
      {
        support: 'Sicheres internes Verzeichnis',
        classification: 'RH-001-Leseansicht als Kandidat',
        role: 'Plant Suche, Filter und Übersetzungen aus der RH-001-Kandidatenantwort; diese Kontrolle belegt weder Anschluss noch Anzeige realer Daten.',
        responsibility: 'Organisation & Personal würde den Inhalt validieren; IT würde Oberfläche und Zugriffszustände nach autorisierter Öffnung pflegen.',
        gap: 'Anschluss, Datum und Version des Auszugs sind noch zu belegen; diese Ansicht kann nicht als unabhängige Quelle gefördert werden.',
        status: 'derived'
      },
      {
        support: 'Gemeinsame Team-/Agent-Auswahl',
        classification: 'Operative Kandidatenprojektion',
        role: 'Plant Optionen aus aktiven RH-001-Mitgliedern, TZH/TSN-Normalisierung und ein getrenntes Kollektiv je Team; keine Produktionszufuhr ist belegt.',
        responsibility: 'Die verbrauchende Funktion würde die fachliche Zuweisung validieren; IT würde die Regeln nach autorisiertem Anschluss pflegen.',
        gap: 'Reale Zufuhr, Aliase, Masterkennungen, frühere Werte und Teamwechsel benötigen noch eine verifizierte Herkunft.',
        status: 'derived'
      },
      {
        support: 'DMS · autorisierte Personalnachweise',
        classification: 'Getrenntes Nachweisdepot',
        role: 'Bewahrt autorisierte Mandate, Verträge, Entscheide und Nachweise, ohne zum operativen Personen- und Teamverzeichnis zu werden.',
        responsibility: 'DMS bewahrt Versionen und Nachweise; Organisation & Personal kontrolliert Klassifizierung und Fachrechte.',
        gap: 'Verbindungen zwischen Nachweis, REF-01-Objekt und Lebenszyklusereignis müssen noch versioniert und kontrolliert werden.',
        status: 'evidence'
      }
    ],
    criteriaTitle: 'Sieben Kriterien vor jeder Bestimmung einer Masterquelle',
    criteriaIntro: 'Diese sieben Kriterien sind als zwingende Voraussetzungen für jeden späteren Entscheid validiert. Sie sind weder Punktzahl noch Fortschrittsquote.',
    criteria: [
      ['Stabile Kennung', 'Eindeutigkeit, Nichtwiederverwendung und Korrekturregel belegt.'],
      ['Umfang und Abdeckung', 'Enthaltene Objekte, Ausschlüsse, Gebiete und Kollektivfälle ausdrücklich.'],
      ['Versionierter Lebenszyklus', 'Eintritt, Zuweisung, Wechsel, Suspendierung und Abschluss in der Historie bewahrt.'],
      ['Verantwortung und Validierung', 'Fachverantwortung, technische Pflege und Entscheidungsautorität benannt.'],
      ['Zugriff und Sensibilität', 'C2-Klassifizierung, geringste Berechtigung, Protokollierung und kein unautorisierter Ersatz.'],
      ['Nachweis und Aufbewahrung', 'DMS-Referenzen, Aufbewahrungsdauer und Ereignisbeziehungen definiert.'],
      ['Qualität und Weitergabe', 'Konsistenzkontrollen, Abweichungen, Korrekturen und Verbraucherwirkungen gesteuert.']
    ],
    decisionStatus: 'Entscheidungskriterien validiert',
    recordLabels: {
      eyebrow: 'Governance-konformer Entscheidnachweis',
      author: 'Entscheidautor',
      date: 'Entscheiddatum',
      decision: 'Dokumentierter Entscheid',
      evidence: 'Nachweis der Rückverfolgbarkeit',
      limit: 'Umfang und Vorbehalt'
    },
    record: {
      id: 'REF-01-DEC-003',
      version: 'V1.0',
      status: 'Entscheidungskriterien validiert',
      author: 'Cheikh Ndiaye',
      date: '25.08.2026',
      decision: 'Die sieben Kriterien werden als zwingende Voraussetzungen vor jeder künftigen Bestimmung einer REF-01-Masterquelle festgehalten. Jeder Kandidat muss Kriterium für Kriterium mit Nachweis, Verantwortung und Abweichung geprüft werden.',
      evidence: 'Ausdrückliche Validierung durch Cheikh in der Sitzung vom 25.08.2026; vorbereitender REF-01-Vergleich V0.5 mit Frontend-PR #185 veröffentlicht; Merge-Commit 6be6a4a.',
      limit: 'Dieser Entscheid bestimmt oder validiert keinen Kandidaten und keine Masterquelle. Er validiert weder Qualität, Vollständigkeit, Zivilidentität noch Personendaten, öffnet keinen Zugriff, ändert kein Schema, löst keine Automatisierung aus und berechnet keinen Fortschritt.'
    },
    nextControl: 'REF-01-G1-WAV-003 V0.1, die vorbereitende Öffnung von drei isolierten technischen Akten, bestätigen oder ändern.',
    boundary: 'Stand: REF-01-DEC-060 bestätigt REV-004 V1.0 nach beiden Dokumentteilpaketen. WAV-003 V0.1 bereitet drei Einzelautorisierungen vor, ohne Umgebung oder Prüfung zu öffnen; G1 bleibt offen und L2 geschlossen. Null neue Rechte, aktive Einträge, reale Inhaber, Namensmandate, Delegationen, Ausnahmen, C3/C4/C5-Zugriffe, Worker, Alarme, Wiederholungen oder Anbieter; Paketentscheide: 57; bestimmte Masterquellen: 0; produktive Änderungen: 0.',
    source: 'Kontrollierte Träger: isolierter RH-001-API-Kandidatenvertrag des L1-Loses, synthetische C2-Fixture und lokale Handler-Tests, internes C2-Verzeichnis, Team/Agent, DMS-Rahmen, REF-01-DEC-001 bis REF-01-DEC-060, Matrizen AUT-02-03-002/AUT-02-02-002 V1.0, LEGAL-Rahmen AUT-02-03-003 V1.0, Zuordnung AUT-02-03-004 V1.0, Verantwortung/Auslöser AUT-02-03-005 V1.0, Prüfprotokolle AUT-02-03-006 V1.0, leeres Register AUT-02-03-007 V1.0, Tore AUT-02-03-008 V1.0, Entscheidblatt AUT-02-03-009 V1.0, Protokoll AUT-02-03-010 V1.0, GO/NO-GO-Blatt AUT-02-03-011 V1.0, Modell AUT-02-02-003 V1.0 Rollen und geringste Berechtigung, Matrix AUT-02-02-004 V1.0 Getestete Rechte und Ablehnungen, Protokoll AUT-02-02-005 V1.0 Zuweisung und Entzug, Berechtigungsregister AUT-02-02-006 V1.0, Öffnungstore AUT-02-02-007 V1.0, Entscheidblatt AUT-02-02-008 V1.0, Protokoll AUT-02-02-009 V1.0, GO/NO-GO-Blatt AUT-02-02-010 V1.0, Neubewertung REV-004 V1.0 sowie Kandidat WAV-003 V0.1; amtliche Quellen EDOEB Schweiz, CDP Senegal und OHADA.'
  }
};

const StatusBadge = ({ label, status }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {label}
  </span>
);

const SourceCard = ({ row, t }) => (
  <article className="m3s-raised p-3">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <h6 className="text-sm font-semibold text-slate-100">{row.support}</h6>
        <p className="mt-1 text-xs font-semibold text-cyan-300">{row.classification}</p>
      </div>
      <StatusBadge label={t.statuses[row.status]} status={row.status} />
    </div>
    <dl className="mt-3 space-y-3 border-t border-slate-700 pt-3">
      <div><dt className="text-xs font-semibold text-slate-400">{t.columns.role}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.role}</dd></div>
      <div><dt className="text-xs font-semibold text-slate-400">{t.columns.responsibility}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.responsibility}</dd></div>
      <div><dt className="text-xs font-semibold text-amber-300">{t.columns.gap}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row.gap}</dd></div>
    </dl>
  </article>
);

const InstitutionalPeopleTeamsSourceControl = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ListChecks, Database, SlidersHorizontal, FileArchive];

  return (
    <section id="institutional-ref01-source-candidate-control" className="m3s-ref01-sources mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 scroll-mt-24 sm:p-4" aria-labelledby="institutional-ref01-source-candidate-control-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-source-candidate-control-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <Eye className="shrink-0 text-violet-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return (
            <article key={label} className="m3s-raised min-h-28 p-3">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
                <Icon className={index === 3 ? 'text-amber-300' : 'text-violet-300'} size={19} aria-hidden="true" />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
        <table className="w-full min-w-[1420px] border-collapse text-left text-sm">
          <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300">
            <tr>
              <th className="px-3 py-3 font-semibold">{t.columns.support}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.classification}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.role}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.responsibility}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.gap}</th>
              <th className="px-3 py-3 font-semibold">{t.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-950/15">
            {t.rows.map(row => (
              <tr key={row.support} className="align-top">
                <th scope="row" className="px-3 py-3 font-semibold text-slate-100">{row.support}</th>
                <td className="px-3 py-3 font-semibold text-cyan-300">{row.classification}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{row.role}</td>
                <td className="px-3 py-3 leading-5 text-slate-300">{row.responsibility}</td>
                <td className="px-3 py-3 leading-5 text-amber-100">{row.gap}</td>
                <td className="px-3 py-3"><StatusBadge label={t.statuses[row.status]} status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:hidden">
        {t.rows.map(row => <SourceCard key={row.support} row={row} t={t} />)}
      </div>

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2"><ListChecks className="text-emerald-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{t.criteriaTitle}</h6></div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{t.criteriaIntro}</p>
          </div>
          <span className="inline-flex w-fit rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-xs font-semibold text-emerald-200">{t.decisionStatus}</span>
        </div>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.criteria.map(([label, detail], index) => (
            <li key={label} className="rounded-md border border-slate-700 p-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-900/70 text-xs font-semibold text-violet-100">{index + 1}</span>
                <div><p className="text-sm font-semibold text-slate-100">{label}</p><p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p></div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <InstitutionalPeopleTeamsEvidenceMatrix language={language} />
      <InstitutionalPeopleTeamsEvidenceReview language={language} />
      <InstitutionalPeopleTeamsEvidenceResults language={language} />
      <InstitutionalPeopleTeamsGapPriorities language={language} />
      <InstitutionalPeopleTeamsEventContract language={language} />
      <InstitutionalPeopleTeamsTechnicalFraming language={language} />
      <p className="mt-3 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200">{t.nextControl}</p>

      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <p className="mt-3 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsSourceControl;
