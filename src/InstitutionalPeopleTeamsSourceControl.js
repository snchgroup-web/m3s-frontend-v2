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
    eyebrow: 'CONTROLE DES SUPPORTS CANDIDATS · REF-01 · V1.19 · 27-08-2026',
    title: 'Comparer les supports sans les promouvoir',
    body: 'Ce comparatif distingue le contrat backend RH-001, ses vues de lecture, ses projections opérationnelles et les preuves GED. Un support raccordé ou utile ne devient pas automatiquement une source maîtresse.',
    counters: [
      ['Supports contrôlés', '4', 'Un contrat, deux consommations dérivées et un dépôt de preuves'],
      ['Contrats backend observés', '1', 'Endpoint RH-001 protégé et en lecture seule'],
      ['Consommations dérivées', '2', 'Annuaire sécurisé et sélecteurs Team/Agent'],
      ['Sources maîtresses désignées', '0', 'Décision humaine distincte requise']
    ],
    columns: {
      support: 'Support observé',
      classification: 'Nature',
      role: 'Rôle réellement observé',
      responsibility: 'Responsabilité retenue',
      gap: 'Écart avant décision',
      status: 'État'
    },
    statuses: {
      connected: 'Support raccordé',
      derived: 'Consommation dérivée',
      evidence: 'Preuve séparée'
    },
    rows: [
      {
        support: 'API RH-001 · /members-directory',
        classification: 'Contrat documentaire C2',
        role: 'Expose, après autorisation, un annuaire assaini en lecture seule avec identifiant technique, libellés, équipe, type et état ; aucune coordonnée personnelle.',
        responsibility: 'Organisation & RH porte le sens métier ; IT protège et maintient le contrat technique.',
        gap: 'Unicité, couverture, version du contenu, événements de cycle et circuit de correction restent à prouver sur la durée.',
        status: 'connected'
      },
      {
        support: 'Annuaire interne sécurisé',
        classification: 'Vue de lecture de RH-001',
        role: 'Affiche la réponse RH-001 selon les droits, avec recherche, filtres et traductions locales ; ne conserve pas un second annuaire.',
        responsibility: 'Organisation & RH valide le contenu ; IT maintient l’interface et les états d’accès.',
        gap: 'La date et la version de l’extrait doivent rester visibles ; cette vue ne peut pas être promue comme source indépendante.',
        status: 'derived'
      },
      {
        support: 'Sélecteurs partagés Team/Agent',
        classification: 'Projection opérationnelle dérivée',
        role: 'Construit des options à partir des membres actifs RH-001, normalise TZH/TSN et ajoute un collectif distinct pour chaque équipe.',
        responsibility: 'La fonction consommatrice valide l’affectation métier ; IT maintient les règles de projection.',
        gap: 'Alias et libellés ne valent pas identifiant maître ; les anciennes valeurs et changements d’équipe doivent garder leur provenance.',
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
    nextControl: 'Prochain arbitrage : confirmer ou amender REF-01-G1-IDN-001 V0.1 ; aucun dossier AUT, aucune identité et aucun envoi ne sont encore autorisés, G1 reste ouverte et L2 fermé.',
    boundary: 'Statut : base fonctionnelle V1.0, cadrage V0.2 et proposition V1.0 confirmés ; ADR L0 V1.0 confirmé par REF-01-DEC-012 ; G0 clôturée ; fondations L1 V0.1 testées localement ; quatre principes G1 confirmés ; fiche de preuve V1.0, paquet de collecte V1.0, fiche de sollicitation V1.0, profils destinataires V1.0, fiche nominative V1.0 et registre d’autorisation V1.0 confirmés ; gabarit unitaire IDN-001 V0.1 préparé et vide, zéro preuve reçue, zéro destinataire nommé, zéro autorisation accordée, zéro demande envoyée, zéro fournisseur retenu et L2 fermé ; décisions sur le lot : 16 ; sources maîtresses désignées : 0 ; changements en production : 0.',
    source: 'Supports contrôlés : contrat API RH-001, Annuaire interne, Team/Agent, cadrage GED, backend Node.js/Express et BigQuery observés, décisions REF-01-DEC-001 à REF-01-DEC-019, REF-01-IMP-001 V1.0, REF-01-ADR-001 V1.0 et fondations L1 candidates publiées par la PR backend #46 au commit cf35120.'
  },
  EN: {
    eyebrow: 'CANDIDATE-SUPPORT CONTROL · REF-01 · V1.19 · 27 AUG 2026',
    title: 'Compare supports without promoting them',
    body: 'This comparison separates the RH-001 backend contract, its read views, its operational projections and DMS evidence. A connected or useful support does not automatically become a master source.',
    counters: [
      ['Controlled supports', '4', 'One contract, two derived consumers and one evidence repository'],
      ['Observed backend contracts', '1', 'Protected read-only RH-001 endpoint'],
      ['Derived consumers', '2', 'Secure directory and Team/Agent selectors'],
      ['Designated master sources', '0', 'Separate human decision required']
    ],
    columns: {
      support: 'Observed support',
      classification: 'Nature',
      role: 'Actually observed role',
      responsibility: 'Retained responsibility',
      gap: 'Gap before decision',
      status: 'State'
    },
    statuses: {
      connected: 'Connected support',
      derived: 'Derived consumer',
      evidence: 'Separate evidence'
    },
    rows: [
      {
        support: 'RH-001 API · /members-directory',
        classification: 'C2 documentary contract',
        role: 'After authorisation, exposes a sanitised read-only directory with technical identifier, labels, team, type and state; no personal contact details.',
        responsibility: 'Organisation & HR owns business meaning; IT protects and maintains the technical contract.',
        gap: 'Uniqueness, coverage, content version, lifecycle events and the correction workflow still require durable evidence.',
        status: 'connected'
      },
      {
        support: 'Secure internal directory',
        classification: 'RH-001 read view',
        role: 'Displays the RH-001 response according to rights, with search, filters and local translations; it retains no second directory.',
        responsibility: 'Organisation & HR validates content; IT maintains the interface and access states.',
        gap: 'Extract date and version must remain visible; this view cannot be promoted as an independent source.',
        status: 'derived'
      },
      {
        support: 'Shared Team/Agent selectors',
        classification: 'Derived operational projection',
        role: 'Builds options from active RH-001 members, normalises TZH/TSN and adds a separate collective for each team.',
        responsibility: 'The consuming function validates the business assignment; IT maintains projection rules.',
        gap: 'Aliases and labels are not master identifiers; former values and team changes must retain provenance.',
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
    nextControl: 'Next decision: confirm or amend REF-01-G1-IDN-001 V0.1; no AUT file, identity or send is yet authorised, G1 remains open and L2 closed.',
    boundary: 'Status: functional baseline V1.0, framing V0.2 and proposal V1.0 confirmed; L0 ADR V1.0 confirmed through REF-01-DEC-012; G0 closed; L1 foundations V0.1 tested locally; four G1 principles confirmed; evidence sheet V1.0, collection package V1.0, request sheet V1.0, recipient profiles V1.0, named-recipient sheet V1.0 and authorisation register V1.0 confirmed; empty individual template IDN-001 V0.1 prepared, zero evidence received, zero named recipients, zero authorisations granted, zero requests sent, zero selected providers and L2 closed; package decisions: 16; designated master sources: 0; production changes: 0.',
    source: 'Controlled supports: RH-001 API contract, Internal Directory, Team/Agent, DMS framing, observed Node.js/Express backend and BigQuery, decisions REF-01-DEC-001 through REF-01-DEC-019, REF-01-IMP-001 V1.0, REF-01-ADR-001 V1.0 and candidate L1 foundations published through backend PR #46 at commit cf35120.'
  },
  DE: {
    eyebrow: 'KONTROLLE DER QUELLKANDIDATEN · REF-01 · V1.19 · 27.08.2026',
    title: 'Träger vergleichen, ohne sie zu fördern',
    body: 'Dieser Vergleich trennt den RH-001-Backendvertrag, seine Leseansichten, operativen Projektionen und DMS-Nachweise. Ein verbundener oder nützlicher Träger wird nicht automatisch zur Masterquelle.',
    counters: [
      ['Geprüfte Träger', '4', 'Ein Vertrag, zwei abgeleitete Verbraucher und ein Nachweisdepot'],
      ['Beobachtete Backendverträge', '1', 'Geschützter schreibgeschützter RH-001-Endpunkt'],
      ['Abgeleitete Verbraucher', '2', 'Sicheres Verzeichnis und Team-/Agent-Auswahl'],
      ['Bestimmte Masterquellen', '0', 'Getrennter menschlicher Entscheid erforderlich']
    ],
    columns: {
      support: 'Beobachteter Träger',
      classification: 'Art',
      role: 'Tatsächlich beobachtete Rolle',
      responsibility: 'Festgehaltene Verantwortung',
      gap: 'Abweichung vor Entscheid',
      status: 'Stand'
    },
    statuses: {
      connected: 'Verbundener Träger',
      derived: 'Abgeleiteter Verbraucher',
      evidence: 'Getrennter Nachweis'
    },
    rows: [
      {
        support: 'RH-001-API · /members-directory',
        classification: 'C2-Dokumentationsvertrag',
        role: 'Stellt nach Autorisierung ein bereinigtes schreibgeschütztes Verzeichnis mit technischer Kennung, Bezeichnungen, Team, Typ und Stand bereit; keine privaten Kontaktdaten.',
        responsibility: 'Organisation & Personal trägt die Fachbedeutung; IT schützt und pflegt den technischen Vertrag.',
        gap: 'Eindeutigkeit, Abdeckung, Inhaltsversion, Lebenszyklusereignisse und Korrekturablauf benötigen noch dauerhafte Nachweise.',
        status: 'connected'
      },
      {
        support: 'Sicheres internes Verzeichnis',
        classification: 'RH-001-Leseansicht',
        role: 'Zeigt die RH-001-Antwort gemäss Rechten mit Suche, Filtern und lokalen Übersetzungen; es speichert kein zweites Verzeichnis.',
        responsibility: 'Organisation & Personal validiert den Inhalt; IT pflegt Oberfläche und Zugriffszustände.',
        gap: 'Datum und Version des Auszugs müssen sichtbar bleiben; diese Ansicht kann nicht als unabhängige Quelle gefördert werden.',
        status: 'derived'
      },
      {
        support: 'Gemeinsame Team-/Agent-Auswahl',
        classification: 'Abgeleitete operative Projektion',
        role: 'Erstellt Optionen aus aktiven RH-001-Mitgliedern, normalisiert TZH/TSN und ergänzt je Team ein getrenntes Kollektiv.',
        responsibility: 'Die verbrauchende Funktion validiert die fachliche Zuweisung; IT pflegt die Projektionsregeln.',
        gap: 'Aliase und Bezeichnungen sind keine Masterkennungen; frühere Werte und Teamwechsel müssen ihre Herkunft bewahren.',
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
    nextControl: 'Nächster Entscheid: REF-01-G1-IDN-001 V0.1 bestätigen oder ändern; keine AUT-Akte, Identität oder Sendung ist bisher autorisiert, G1 bleibt offen und L2 geschlossen.',
    boundary: 'Stand: funktionale Basis V1.0, Ausgestaltung V0.2 und Vorschlag V1.0 bestätigt; L0-ADR V1.0 mit REF-01-DEC-012 bestätigt; G0 geschlossen; L1-Grundlagen V0.1 lokal geprüft; vier G1-Prinzipien bestätigt; Nachweisblatt V1.0, Sammlungspaket V1.0, Anfrageblatt V1.0, Empfängerprofile V1.0, Blatt für benannte Empfänger V1.0 und Autorisierungsregister V1.0 bestätigt; leere Einzelvorlage IDN-001 V0.1 vorbereitet, null erhaltene Nachweise, null benannte Empfänger, null erteilte Autorisierungen, null gesendete Anfragen, null gewählte Anbieter und L2 geschlossen; Paketentscheide: 16; bestimmte Masterquellen: 0; produktive Änderungen: 0.',
    source: 'Kontrollierte Träger: RH-001-API-Vertrag, Internes Verzeichnis, Team/Agent, DMS-Rahmen, beobachtetes Node.js/Express-Backend und BigQuery, REF-01-DEC-001 bis REF-01-DEC-019, REF-01-IMP-001 V1.0, REF-01-ADR-001 V1.0 und mit Backend-PR #46 am Commit cf35120 veröffentlichte Kandidatengrundlagen L1.'
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
