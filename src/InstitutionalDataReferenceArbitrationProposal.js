import React from 'react';
import {
  Ban,
  BookOpenCheck,
  Database,
  Scale,
  ShieldQuestion,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PROPOSITION À EXAMINER · AUCUNE VALIDATION ENREGISTRÉE',
    title: 'Base d’arbitrage candidate CNS-03',
    body: 'Ces quatre propositions préparent l’examen humain de CNS-03. Elles permettent d’organiser l’inventaire des données et référentiels sans déclarer une source maîtresse, un modèle validé ou une qualité de données acquise.',
    cards: [
      {
        title: 'Périmètre cible proposé',
        body: 'Référentiels transversaux et métier nécessaires au pilotage de 2SG : personnes et équipes, rôles et droits, parties prenantes, portefeuilles, dossiers, projets, produits et services, catégories financières, devises et taux, documents et preuves, lieux et actifs. Chaque objet reçoit un identifiant stable, un propriétaire, un cycle de vie, une source, un territoire et un niveau de sensibilité.',
        limit: 'Hors périmètre : importer des données personnelles réelles, publier un schéma sensible ou déclarer un référentiel complet avant inventaire.'
      },
      {
        title: 'Preuves recevables proposées',
        body: 'Registre versionné des référentiels ; dictionnaire de données ; correspondance entre sources, objets et champs ; modèle des entités, relations et identifiants ; vocabulaire contrôlé relié au glossaire ; contrôles de qualité et anomalies datées ; historique des corrections, rapprochements, migrations et décisions conservé dans la GED.',
        limit: 'Une correspondance technique ne prouve ni que la source est maîtresse, ni que la donnée est exacte, actuelle ou complète.'
      },
      {
        title: 'Responsabilités proposées',
        body: 'La fonction propriétaire valide le sens métier et les règles. Administration coordonne les référentiels partagés. IT & Support implémente uniquement les schémas, échanges, accès et contrôles autorisés. La GED conserve versions et décisions. Gouvernance arbitre les définitions transversales, l’autorité des sources et les exceptions sensibles.',
        limit: 'Cette répartition ne modifie automatiquement ni base de données, ni droit d’accès, ni mandat ou responsabilité juridique.'
      },
      {
        title: 'Principe de calcul proposé',
        body: 'Aucun pourcentage à ce stade. La mesure reste indisponible tant que les objets critiques, sources candidates, propriétaires, champs, relations, règles de qualité, preuves, cas non applicables et fréquence de revue ne sont pas inventoriés, validés et versionnés.',
        limit: 'Une règle séparée devra ensuite définir le dénominateur, les statuts admissibles, les contrôles minimaux, le traitement des anomalies et l’autorité de revue.'
      }
    ],
    decisionTitle: 'Arbitrage humain requis',
    decision: 'Cheikh peut valider ces propositions comme cadre de travail CNS-03, les modifier ou consigner des réserves. Tant que cette décision n’est pas explicitement enregistrée, le statut reste candidat.',
    authority: 'La désignation d’une source maîtresse, la modification d’un schéma réel, l’ouverture d’un accès ou l’usage de données sensibles restent des décisions distinctes de la validation de ce cadre.',
    source: 'Sources : CNS-03 publié, cadres CNS-01 et CNS-02 validés, architecture de données M3S, pilote Administration, glossaire central et règles de gouvernance 2SG. Statut : proposition candidate à validation humaine.'
  },
  EN: {
    eyebrow: 'PROPOSAL FOR REVIEW · NO VALIDATION RECORDED',
    title: 'Candidate CNS-03 decision baseline',
    body: 'These four proposals prepare the CNS-03 human review. They organise the data and reference-system inventory without declaring an authoritative source, a validated model or established data quality.',
    cards: [
      {
        title: 'Proposed target scope',
        body: 'Cross-functional and business reference systems required to steer 2SG: people and teams, roles and rights, stakeholders, portfolios, files, projects, products and services, finance categories, currencies and rates, documents and evidence, locations and assets. Each object receives a stable identifier, owner, lifecycle, source, territory and sensitivity level.',
        limit: 'Out of scope: importing real personal data, publishing a sensitive schema or declaring a reference system complete before inventory.'
      },
      {
        title: 'Proposed acceptable evidence',
        body: 'Versioned reference-system register; data dictionary; mapping between sources, objects and fields; entity, relationship and identifier model; controlled vocabulary linked to the glossary; dated quality controls and anomalies; DMS history of corrections, reconciliations, migrations and decisions.',
        limit: 'A technical mapping proves neither that a source is authoritative nor that data is accurate, current or complete.'
      },
      {
        title: 'Proposed responsibilities',
        body: 'The owning function validates business meaning and rules. Administration coordinates shared reference systems. IT & Support implements only authorised schemas, exchanges, access and controls. The DMS retains versions and decisions. Governance decides cross-functional definitions, source authority and sensitive exceptions.',
        limit: 'This allocation does not automatically change any database, access right, mandate or legal responsibility.'
      },
      {
        title: 'Proposed calculation principle',
        body: 'No percentage at this stage. Measurement remains unavailable until critical objects, candidate sources, owners, fields, relationships, quality rules, evidence, not-applicable cases and review frequency are inventoried, validated and versioned.',
        limit: 'A separate rule must then define the denominator, eligible statuses, minimum controls, anomaly treatment and review authority.'
      }
    ],
    decisionTitle: 'Human decision required',
    decision: 'Cheikh may validate these proposals as the CNS-03 working framework, amend them or record reservations. Until that decision is explicitly recorded, the status remains candidate.',
    authority: 'Designating a master source, changing a real schema, opening access or using sensitive data remain decisions separate from validation of this framework.',
    source: 'Sources: published CNS-03, validated CNS-01 and CNS-02 frameworks, M3S data architecture, Administration pilot, central glossary and recorded 2SG governance rules. Status: candidate proposal pending human validation.'
  },
  DE: {
    eyebrow: 'VORSCHLAG ZUR PRÜFUNG · KEINE VALIDIERUNG PROTOKOLLIERT',
    title: 'Kandidatenbasis für den Entscheid CNS-03',
    body: 'Diese vier Vorschläge bereiten die menschliche Prüfung CNS-03 vor. Sie strukturieren das Inventar der Daten und Referenzsysteme, ohne eine Masterquelle, ein validiertes Modell oder eine gesicherte Datenqualität zu erklären.',
    cards: [
      {
        title: 'Vorgeschlagener Zielumfang',
        body: 'Funktionsübergreifende und fachliche Referenzsysteme für die Steuerung von 2SG: Personen und Teams, Rollen und Rechte, Beteiligte, Portfolios, Dossiers, Projekte, Produkte und Leistungen, Finanzkategorien, Währungen und Kurse, Dokumente und Nachweise, Orte und Vermögenswerte. Jedes Objekt erhält stabile Kennung, Verantwortung, Lebenszyklus, Quelle, Gebiet und Sensibilitätsstufe.',
        limit: 'Nicht enthalten: reale Personendaten importieren, sensible Schemata veröffentlichen oder ein Referenzsystem vor dem Inventar als vollständig erklären.'
      },
      {
        title: 'Vorgeschlagene zulässige Nachweise',
        body: 'Versioniertes Register der Referenzsysteme; Datenwörterbuch; Zuordnung von Quellen, Objekten und Feldern; Modell von Entitäten, Beziehungen und Kennungen; mit dem Glossar verknüpftes kontrolliertes Vokabular; datierte Qualitätskontrollen und Anomalien; GED-Historie von Korrekturen, Abgleichen, Migrationen und Entscheidungen.',
        limit: 'Eine technische Zuordnung beweist weder die Autorität einer Quelle noch Richtigkeit, Aktualität oder Vollständigkeit der Daten.'
      },
      {
        title: 'Vorgeschlagene Verantwortungen',
        body: 'Die verantwortliche Fachfunktion validiert Bedeutung und Regeln. Administration koordiniert gemeinsame Referenzsysteme. IT & Support implementiert nur autorisierte Schemata, Austauschwege, Zugriffe und Kontrollen. Die GED bewahrt Versionen und Entscheide. Governance entscheidet funktionsübergreifende Definitionen, Quellenautorität und sensible Ausnahmen.',
        limit: 'Diese Zuordnung ändert weder Datenbanken noch Zugriffsrechte, Mandate oder rechtliche Verantwortungen automatisch.'
      },
      {
        title: 'Vorgeschlagenes Berechnungsprinzip',
        body: 'In dieser Phase kein Prozentsatz. Die Messung bleibt nicht verfügbar, bis kritische Objekte, Quellenkandidaten, Verantwortungen, Felder, Beziehungen, Qualitätsregeln, Nachweise, nicht anwendbare Fälle und Prüffrequenz inventarisiert, validiert und versioniert sind.',
        limit: 'Danach muss eine getrennte Regel Nenner, zulässige Status, Mindestkontrollen, Umgang mit Anomalien und Prüfbefugnis festlegen.'
      }
    ],
    decisionTitle: 'Menschlicher Entscheid erforderlich',
    decision: 'Cheikh kann diese Vorschläge als Arbeitsrahmen CNS-03 validieren, ändern oder Vorbehalte protokollieren. Bis dieser Entscheid ausdrücklich dokumentiert ist, bleibt der Status Kandidat.',
    authority: 'Die Festlegung einer Masterquelle, Änderung eines realen Schemas, Öffnung eines Zugriffs oder Nutzung sensibler Daten bleiben getrennte Entscheide.',
    source: 'Quellen: veröffentlichtes CNS-03, validierte Arbeitsrahmen CNS-01 und CNS-02, M3S-Datenarchitektur, Pilot Administration, zentrales Glossar und dokumentierte 2SG-Governance-Regeln. Status: Kandidatenvorschlag zur menschlichen Validierung.'
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
        <article className="rounded-md border border-amber-800/70 bg-amber-950/15 p-4">
          <div className="flex items-center gap-2"><ShieldQuestion className="text-amber-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-amber-100">{t.decisionTitle}</h6></div>
          <p className="mt-2 text-sm leading-6 text-slate-200">{t.decision}</p>
        </article>
        <article className="rounded-md border border-slate-700 bg-slate-950/20 p-4">
          <div className="flex items-center gap-2"><Scale className="text-slate-300" size={18} aria-hidden="true" /><p className="text-sm leading-6 text-slate-200">{t.authority}</p></div>
        </article>
      </div>

      <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalDataReferenceArbitrationProposal;
