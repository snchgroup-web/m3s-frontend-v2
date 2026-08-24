import React from 'react';
import {
  Ban,
  BookOpenCheck,
  Database,
  Scale,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CADRE DE TRAVAIL VALIDÉ · CHEIKH · 25-08-2026',
    title: 'Base d’arbitrage CNS-03 validée comme cadre de travail',
    body: 'Cheikh a validé les quatre propositions ci-dessous comme cadre de travail CNS-03. Cette décision permet d’organiser l’inventaire des données et référentiels sans déclarer une source maîtresse, un modèle validé ou une qualité de données acquise.',
    cards: [
      {
        title: 'Périmètre cible retenu',
        body: 'Référentiels transversaux et métier nécessaires au pilotage de 2SG : personnes et équipes, rôles et droits, parties prenantes, portefeuilles, dossiers, projets, produits et services, catégories financières, devises et taux, documents et preuves, lieux et actifs. Chaque objet reçoit un identifiant stable, un propriétaire, un cycle de vie, une source, un territoire et un niveau de sensibilité.',
        limit: 'Hors périmètre : importer des données personnelles réelles, publier un schéma sensible ou déclarer un référentiel complet avant inventaire.'
      },
      {
        title: 'Preuves recevables retenues',
        body: 'Registre versionné des référentiels ; dictionnaire de données ; correspondance entre sources, objets et champs ; modèle des entités, relations et identifiants ; vocabulaire contrôlé relié au glossaire ; contrôles de qualité et anomalies datées ; historique des corrections, rapprochements, migrations et décisions conservé dans la GED.',
        limit: 'Une correspondance technique ne prouve ni que la source est maîtresse, ni que la donnée est exacte, actuelle ou complète.'
      },
      {
        title: 'Responsabilités retenues',
        body: 'La fonction propriétaire valide le sens métier et les règles. Administration coordonne les référentiels partagés. IT & Support implémente uniquement les schémas, échanges, accès et contrôles autorisés. La GED conserve versions et décisions. Gouvernance arbitre les définitions transversales, l’autorité des sources et les exceptions sensibles.',
        limit: 'Cette répartition ne modifie automatiquement ni base de données, ni droit d’accès, ni mandat ou responsabilité juridique.'
      },
      {
        title: 'Principe de calcul retenu',
        body: 'Aucun pourcentage à ce stade. La mesure reste indisponible tant que les objets critiques, sources candidates, propriétaires, champs, relations, règles de qualité, preuves, cas non applicables et fréquence de revue ne sont pas inventoriés, validés et versionnés.',
        limit: 'Une règle séparée devra ensuite définir le dénominateur, les statuts admissibles, les contrôles minimaux, le traitement des anomalies et l’autorité de revue.'
      }
    ],
    decisionTitle: 'Validation humaine consignée',
    decision: 'Cadre de travail CNS-03 validé par Cheikh le 25-08-2026. Cette validation autorise la préparation de l’inventaire détaillé, mais ne désigne aucune source maîtresse, ne valide aucun modèle réel et ne déclare aucune qualité de données acquise.',
    authority: 'La désignation d’une source maîtresse, la modification d’un schéma réel, l’ouverture d’un accès ou l’usage de données sensibles restent des décisions distinctes de la validation de ce cadre.',
    recordLabels: {
      eyebrow: 'Registre de décision gouverné',
      author: 'Auteur de la décision',
      date: 'Date de décision',
      decision: 'Décision enregistrée',
      evidence: 'Preuve de traçabilité',
      limit: 'Portée et réserve'
    },
    record: {
      id: 'CNS-03-DEC-001',
      version: 'V1.0',
      status: 'Cadre de travail validé',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'Les quatre propositions CNS-03 sont retenues comme base de travail pour préparer l’inventaire détaillé des données et référentiels de 2SG.',
      evidence: 'Validation globale des huit CNS donnée par Cheikh puis portée et continuité confirmées le 25-08-2026 ; base candidate CNS-03 publiée par la PR frontend #177 ; commit de fusion bc7e24a7.',
      limit: 'Ne désigne aucune source maîtresse, ne valide aucun modèle ou schéma réel, n’ouvre aucun accès et ne déclare ni qualité, ni complétude, ni progression. Toute évolution crée une nouvelle version sans écraser cette trace.'
    },
    source: 'Sources : CNS-03 publié, cadres CNS-01 et CNS-02 validés, architecture de données M3S, pilote Administration, glossaire central et règles de gouvernance 2SG. Statut : cadre de travail validé par Cheikh le 25-08-2026 ; aucune source maîtresse ni progression déclarée.'
  },
  EN: {
    eyebrow: 'VALIDATED WORKING FRAMEWORK · CHEIKH · 25-08-2026',
    title: 'CNS-03 decision baseline validated as a working framework',
    body: 'Cheikh validated the four proposals below as the CNS-03 working framework. This decision organises the data and reference-system inventory without declaring an authoritative source, a validated model or established data quality.',
    cards: [
      {
        title: 'Retained target scope',
        body: 'Cross-functional and business reference systems required to steer 2SG: people and teams, roles and rights, stakeholders, portfolios, files, projects, products and services, finance categories, currencies and rates, documents and evidence, locations and assets. Each object receives a stable identifier, owner, lifecycle, source, territory and sensitivity level.',
        limit: 'Out of scope: importing real personal data, publishing a sensitive schema or declaring a reference system complete before inventory.'
      },
      {
        title: 'Retained acceptable evidence',
        body: 'Versioned reference-system register; data dictionary; mapping between sources, objects and fields; entity, relationship and identifier model; controlled vocabulary linked to the glossary; dated quality controls and anomalies; DMS history of corrections, reconciliations, migrations and decisions.',
        limit: 'A technical mapping proves neither that a source is authoritative nor that data is accurate, current or complete.'
      },
      {
        title: 'Retained responsibilities',
        body: 'The owning function validates business meaning and rules. Administration coordinates shared reference systems. IT & Support implements only authorised schemas, exchanges, access and controls. The DMS retains versions and decisions. Governance decides cross-functional definitions, source authority and sensitive exceptions.',
        limit: 'This allocation does not automatically change any database, access right, mandate or legal responsibility.'
      },
      {
        title: 'Retained calculation principle',
        body: 'No percentage at this stage. Measurement remains unavailable until critical objects, candidate sources, owners, fields, relationships, quality rules, evidence, not-applicable cases and review frequency are inventoried, validated and versioned.',
        limit: 'A separate rule must then define the denominator, eligible statuses, minimum controls, anomaly treatment and review authority.'
      }
    ],
    decisionTitle: 'Human validation recorded',
    decision: 'CNS-03 working framework validated by Cheikh on 25-08-2026. This authorises preparation of the detailed inventory but designates no master source, validates no real model and declares no established data quality.',
    authority: 'Designating a master source, changing a real schema, opening access or using sensitive data remain decisions separate from validation of this framework.',
    recordLabels: {
      eyebrow: 'Governed decision record',
      author: 'Decision author',
      date: 'Decision date',
      decision: 'Recorded decision',
      evidence: 'Traceability evidence',
      limit: 'Scope and reservation'
    },
    record: {
      id: 'CNS-03-DEC-001',
      version: 'V1.0',
      status: 'Working framework validated',
      author: 'Cheikh Ndiaye',
      date: '25-08-2026',
      decision: 'The four CNS-03 proposals are retained as the working baseline for preparing the detailed inventory of 2SG data and reference systems.',
      evidence: 'Cheikh validated all eight CNS frameworks and confirmed their scope and continuity on 25-08-2026; the CNS-03 candidate baseline was published through frontend PR #177; merge commit bc7e24a7.',
      limit: 'This designates no master source, validates no real model or schema, opens no access and declares no quality, completeness or progress. Any change creates a new version without overwriting this record.'
    },
    source: 'Sources: published CNS-03, validated CNS-01 and CNS-02 frameworks, M3S data architecture, Administration pilot, central glossary and recorded 2SG governance rules. Status: working framework validated by Cheikh on 25-08-2026; no master source or progress declared.'
  },
  DE: {
    eyebrow: 'VALIDIERTER ARBEITSRAHMEN · CHEIKH · 25.08.2026',
    title: 'Entscheidungsgrundlage CNS-03 als Arbeitsrahmen validiert',
    body: 'Cheikh hat die vier nachstehenden Vorschläge als Arbeitsrahmen CNS-03 validiert. Dieser Entscheid strukturiert das Inventar der Daten und Referenzsysteme, ohne eine Masterquelle, ein validiertes Modell oder eine gesicherte Datenqualität zu erklären.',
    cards: [
      {
        title: 'Festgehaltener Zielumfang',
        body: 'Funktionsübergreifende und fachliche Referenzsysteme für die Steuerung von 2SG: Personen und Teams, Rollen und Rechte, Beteiligte, Portfolios, Dossiers, Projekte, Produkte und Leistungen, Finanzkategorien, Währungen und Kurse, Dokumente und Nachweise, Orte und Vermögenswerte. Jedes Objekt erhält stabile Kennung, Verantwortung, Lebenszyklus, Quelle, Gebiet und Sensibilitätsstufe.',
        limit: 'Nicht enthalten: reale Personendaten importieren, sensible Schemata veröffentlichen oder ein Referenzsystem vor dem Inventar als vollständig erklären.'
      },
      {
        title: 'Festgehaltene zulässige Nachweise',
        body: 'Versioniertes Register der Referenzsysteme; Datenwörterbuch; Zuordnung von Quellen, Objekten und Feldern; Modell von Entitäten, Beziehungen und Kennungen; mit dem Glossar verknüpftes kontrolliertes Vokabular; datierte Qualitätskontrollen und Anomalien; GED-Historie von Korrekturen, Abgleichen, Migrationen und Entscheidungen.',
        limit: 'Eine technische Zuordnung beweist weder die Autorität einer Quelle noch Richtigkeit, Aktualität oder Vollständigkeit der Daten.'
      },
      {
        title: 'Festgehaltene Verantwortungen',
        body: 'Die verantwortliche Fachfunktion validiert Bedeutung und Regeln. Administration koordiniert gemeinsame Referenzsysteme. IT & Support implementiert nur autorisierte Schemata, Austauschwege, Zugriffe und Kontrollen. Die GED bewahrt Versionen und Entscheide. Governance entscheidet funktionsübergreifende Definitionen, Quellenautorität und sensible Ausnahmen.',
        limit: 'Diese Zuordnung ändert weder Datenbanken noch Zugriffsrechte, Mandate oder rechtliche Verantwortungen automatisch.'
      },
      {
        title: 'Festgehaltenes Berechnungsprinzip',
        body: 'In dieser Phase kein Prozentsatz. Die Messung bleibt nicht verfügbar, bis kritische Objekte, Quellenkandidaten, Verantwortungen, Felder, Beziehungen, Qualitätsregeln, Nachweise, nicht anwendbare Fälle und Prüffrequenz inventarisiert, validiert und versioniert sind.',
        limit: 'Danach muss eine getrennte Regel Nenner, zulässige Status, Mindestkontrollen, Umgang mit Anomalien und Prüfbefugnis festlegen.'
      }
    ],
    decisionTitle: 'Menschliche Validierung dokumentiert',
    decision: 'Arbeitsrahmen CNS-03 von Cheikh am 25.08.2026 validiert. Dies erlaubt die Vorbereitung des Detailinventars, bezeichnet aber keine Masterquelle, validiert kein reales Modell und erklärt keine gesicherte Datenqualität.',
    authority: 'Die Festlegung einer Masterquelle, Änderung eines realen Schemas, Öffnung eines Zugriffs oder Nutzung sensibler Daten bleiben getrennte Entscheide.',
    recordLabels: {
      eyebrow: 'Governance-konformer Entscheidnachweis',
      author: 'Entscheidautor',
      date: 'Entscheiddatum',
      decision: 'Dokumentierter Entscheid',
      evidence: 'Nachweis der Rückverfolgbarkeit',
      limit: 'Umfang und Vorbehalt'
    },
    record: {
      id: 'CNS-03-DEC-001',
      version: 'V1.0',
      status: 'Arbeitsrahmen validiert',
      author: 'Cheikh Ndiaye',
      date: '25.08.2026',
      decision: 'Die vier Vorschläge CNS-03 werden als Arbeitsgrundlage für das Detailinventar der Daten und Referenzsysteme von 2SG festgehalten.',
      evidence: 'Cheikh hat alle acht CNS-Arbeitsrahmen validiert und Umfang sowie Fortführung am 25.08.2026 bestätigt; Kandidatenbasis CNS-03 mit Frontend-PR #177 veröffentlicht; Merge-Commit bc7e24a7.',
      limit: 'Dies bezeichnet keine Masterquelle, validiert kein reales Modell oder Schema, öffnet keinen Zugriff und erklärt weder Qualität noch Vollständigkeit oder Fortschritt. Jede Änderung erzeugt eine neue Version, ohne diesen Nachweis zu überschreiben.'
    },
    source: 'Quellen: veröffentlichtes CNS-03, validierte Arbeitsrahmen CNS-01 und CNS-02, M3S-Datenarchitektur, Pilot Administration, zentrales Glossar und dokumentierte 2SG-Governance-Regeln. Status: Arbeitsrahmen von Cheikh am 25.08.2026 validiert; keine Masterquelle und kein Fortschritt erklärt.'
  }
};

const ICONS = [Database, BookOpenCheck, UsersRound, Ban];
const ACCENTS = ['text-violet-300', 'text-blue-300', 'text-cyan-300', 'text-amber-300'];

const InstitutionalDataReferenceArbitrationProposal = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-4 rounded-md border border-violet-800/70 bg-violet-950/15 p-4" aria-labelledby="institutional-data-reference-arbitration-proposal-title">
      <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
      <h5 id="institutional-data-reference-arbitration-proposal-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.body}</p>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {t.cards.map((card, index) => {
          const Icon = ICONS[index];
          return (
            <article key={card.title} className="m3s-raised p-4">
              <div className="flex items-center gap-2">
                <Icon className={ACCENTS[index]} size={18} aria-hidden="true" />
                <h6 className="text-sm font-semibold text-slate-100">{card.title}</h6>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.body}</p>
              <p className="mt-3 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-400">{card.limit}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="rounded-md border border-emerald-800/70 bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-emerald-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-emerald-100">{t.decisionTitle}</h6></div>
          <p className="mt-2 text-sm leading-6 text-slate-200">{t.decision}</p>
        </article>
        <article className="rounded-md border border-slate-700 bg-slate-950/20 p-4">
          <div className="flex items-center gap-2"><Scale className="text-slate-300" size={18} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{t.authority}</p></div>
        </article>
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />

      <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalDataReferenceArbitrationProposal;
