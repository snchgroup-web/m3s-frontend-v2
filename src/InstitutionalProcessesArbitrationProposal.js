import React from 'react';
import {
  Ban,
  FileCheck2,
  ListChecks,
  Scale,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CADRE DE TRAVAIL VALIDÉ · CHEIKH · 24-08-2026',
    title: 'Base d’arbitrage CNS-02 validée comme cadre de travail',
    body: 'Cheikh a validé les quatre propositions ci-dessous comme cadre de travail CNS-02. Cette décision autorise la préparation de l’inventaire détaillé des processus sans présumer qu’ils sont complets, approuvés, appliqués ou efficaces.',
    cards: [
      {
        title: 'Périmètre cible retenu',
        body: 'Processus essentiels et critiques de 2SG, transversaux ou propres aux fonctions : gouvernance, obligations, administration, finances, ressources humaines, données, sécurité, continuité et opérations. Chaque processus est inventorié puis priorisé selon son résultat attendu, son risque, sa fréquence et ses dépendances.',
        limit: 'Hors périmètre : déclarer le manuel complet, imposer une procédure non validée ou confondre processus, projet, activité et tâche.'
      },
      {
        title: 'Preuves recevables retenues',
        body: 'Fiche processus versionnée ; procédure approuvée lorsque nécessaire ; résultat d’exécution daté ; contrôles et décisions reliés à leurs preuves ; écarts, corrections et nouvelle vérification ; historique GED des versions, exceptions, revues et archives.',
        limit: 'Une procédure disponible ne prouve ni son approbation, ni son application, ni l’efficacité de ses contrôles.'
      },
      {
        title: 'Responsabilités retenues',
        body: 'La fonction propriétaire valide le fond et le résultat. Administration tient le registre, coordonne versions et revues. Gouvernance approuve règles et exceptions sensibles. La GED conserve les preuves. IT & Support opère les contrôles techniques autorisés. Les exécutants réalisent et documentent les étapes attribuées.',
        limit: 'Cette répartition ne crée aucun mandat, droit M3S ou responsabilité juridique supplémentaire.'
      },
      {
        title: 'Principe de calcul retenu',
        body: 'Aucun pourcentage à ce stade. La mesure reste indisponible tant que l’inventaire des processus critiques, leurs statuts, propriétaires, contrôles minimaux, preuves attendues et règles de revue ne sont pas validés et versionnés.',
        limit: 'Une règle séparée devra ensuite définir le dénominateur, les statuts admissibles, les cas non applicables, la fréquence et l’autorité de revue.'
      }
    ],
    decisionTitle: 'Validation humaine consignée',
    decision: 'Cadre de travail CNS-02 validé par Cheikh le 24-08-2026. Cette validation autorise la préparation de l’inventaire détaillé, mais ne vaut ni approbation d’une procédure, ni déclaration de maturité ou d’efficacité.',
    authority: 'L’approbation d’une procédure, d’une exception sensible ou d’un changement de responsabilité reste une décision distincte de la validation de ce cadre de travail.',
    recordLabels: {
      eyebrow: 'Registre de décision gouverné',
      author: 'Auteur de la décision',
      date: 'Date de décision',
      decision: 'Décision enregistrée',
      evidence: 'Preuve de traçabilité',
      limit: 'Portée et réserve'
    },
    record: {
      id: 'CNS-02-DEC-001',
      version: 'V1.0',
      status: 'Cadre de travail validé',
      author: 'Cheikh Ndiaye',
      date: '24-08-2026',
      decision: 'Les quatre propositions CNS-02 sont retenues comme base de travail pour préparer l’inventaire détaillé des processus essentiels et critiques de 2SG.',
      evidence: 'Validation humaine consignée dans la session et le journal 2SG du 24-08-2026 ; base candidate publiée par la PR frontend #175 ; commit de fusion 9ffcf847.',
      limit: 'N’approuve aucune procédure, exception sensible ou modification de responsabilité et ne déclare ni application, ni efficacité, ni maturité. Toute évolution produit une nouvelle version sans écraser cette trace.'
    },
    source: 'Sources : CNS-02 publié, CNS-01 validé comme cadre de travail, pilote Administration, vues Processus & Procédures et règles de gouvernance 2SG. Statut : cadre de travail validé par Cheikh le 24-08-2026 ; aucune procédure particulière approuvée.'
  },
  EN: {
    eyebrow: 'VALIDATED WORKING FRAMEWORK · CHEIKH · 24-08-2026',
    title: 'CNS-02 decision baseline validated as a working framework',
    body: 'Cheikh validated the four proposals below as the CNS-02 working framework. This decision authorises preparation of the detailed process inventory without assuming that processes are complete, approved, applied or effective.',
    cards: [
      {
        title: 'Retained target scope',
        body: 'Essential and critical 2SG processes, whether cross-functional or function-specific: governance, obligations, administration, finance, human resources, data, security, continuity and operations. Each process is inventoried and prioritised by expected outcome, risk, frequency and dependencies.',
        limit: 'Out of scope: declaring the manual complete, imposing an unvalidated procedure, or confusing a process with a project, activity or task.'
      },
      {
        title: 'Retained acceptable evidence',
        body: 'Versioned process sheet; approved procedure where required; dated execution outcome; controls and decisions linked to evidence; deviations, corrections and new verification; DMS history of versions, exceptions, reviews and archives.',
        limit: 'An available procedure proves neither approval, application nor control effectiveness.'
      },
      {
        title: 'Retained responsibilities',
        body: 'The owning function validates substance and outcome. Administration maintains the register and coordinates versions and reviews. Governance approves rules and sensitive exceptions. The DMS retains evidence. IT & Support performs authorised technical controls. Executors perform and document assigned steps.',
        limit: 'This allocation creates no additional mandate, M3S right or legal responsibility.'
      },
      {
        title: 'Retained calculation principle',
        body: 'No percentage at this stage. Measurement remains unavailable until the inventory of critical processes, their statuses, owners, minimum controls, expected evidence and review rules are validated and versioned.',
        limit: 'A separate rule must then define the denominator, eligible statuses, not-applicable cases, frequency and review authority.'
      }
    ],
    decisionTitle: 'Human validation recorded',
    decision: 'CNS-02 working framework validated by Cheikh on 24-08-2026. This authorises preparation of the detailed inventory, but is neither approval of a procedure nor a declaration of maturity or effectiveness.',
    authority: 'Approval of a procedure, sensitive exception or responsibility change remains separate from validation of this working framework.',
    recordLabels: {
      eyebrow: 'Governed decision record',
      author: 'Decision author',
      date: 'Decision date',
      decision: 'Recorded decision',
      evidence: 'Traceability evidence',
      limit: 'Scope and reservation'
    },
    record: {
      id: 'CNS-02-DEC-001',
      version: 'V1.0',
      status: 'Working framework validated',
      author: 'Cheikh Ndiaye',
      date: '24-08-2026',
      decision: 'The four CNS-02 proposals are retained as the working baseline for preparing the detailed inventory of essential and critical 2SG processes.',
      evidence: 'Human validation recorded in the 2SG session and journal dated 24-08-2026; candidate baseline published through frontend PR #175; merge commit 9ffcf847.',
      limit: 'This approves no procedure, sensitive exception or responsibility change and declares neither application, effectiveness nor maturity. Any change creates a new version without overwriting this record.'
    },
    source: 'Sources: published CNS-02, CNS-01 validated as a working framework, Administration pilot, Processes & Procedures views and recorded 2SG governance rules. Status: working framework validated by Cheikh on 24-08-2026; no specific procedure is approved.'
  },
  DE: {
    eyebrow: 'VALIDIERTER ARBEITSRAHMEN · CHEIKH · 24.08.2026',
    title: 'Entscheidungsgrundlage CNS-02 als Arbeitsrahmen validiert',
    body: 'Cheikh hat die vier nachstehenden Vorschläge als Arbeitsrahmen CNS-02 validiert. Dieser Entscheid erlaubt die Vorbereitung des Detailinventars, ohne vollständige, genehmigte, angewandte oder wirksame Prozesse vorauszusetzen.',
    cards: [
      {
        title: 'Festgehaltener Zielumfang',
        body: 'Wesentliche und kritische 2SG-Prozesse, funktionsübergreifend oder funktionsspezifisch: Governance, Pflichten, Administration, Finanzen, Personal, Daten, Sicherheit, Kontinuität und Betrieb. Jeder Prozess wird nach Zielergebnis, Risiko, Häufigkeit und Abhängigkeiten inventarisiert und priorisiert.',
        limit: 'Nicht enthalten: das Handbuch als vollständig erklären, ein nicht validiertes Verfahren auferlegen oder Prozess, Projekt, Aktivität und Aufgabe verwechseln.'
      },
      {
        title: 'Festgehaltene zulässige Nachweise',
        body: 'Versioniertes Prozessblatt; bei Bedarf genehmigtes Verfahren; datiertes Ausführungsergebnis; mit Nachweisen verknüpfte Kontrollen und Entscheide; Abweichungen, Korrekturen und neue Prüfung; GED-Historie von Versionen, Ausnahmen, Prüfungen und Archiven.',
        limit: 'Ein verfügbares Verfahren belegt weder Genehmigung noch Anwendung oder Kontrollwirksamkeit.'
      },
      {
        title: 'Festgehaltene Verantwortungen',
        body: 'Die verantwortliche Funktion validiert Inhalt und Ergebnis. Administration führt das Register und koordiniert Versionen und Prüfungen. Governance genehmigt Regeln und sensible Ausnahmen. Die GED bewahrt Nachweise. IT & Support führt autorisierte technische Kontrollen aus. Ausführende dokumentieren ihre Schritte.',
        limit: 'Diese Zuordnung schafft kein zusätzliches Mandat, M3S-Recht oder rechtliche Verantwortung.'
      },
      {
        title: 'Festgehaltenes Berechnungsprinzip',
        body: 'In dieser Phase kein Prozentsatz. Die Messung bleibt nicht verfügbar, bis Inventar, Status, Verantwortungen, Mindestkontrollen, erwartete Nachweise und Prüfregeln der kritischen Prozesse validiert und versioniert sind.',
        limit: 'Danach muss eine getrennte Regel Nenner, zulässige Status, nicht anwendbare Fälle, Frequenz und Prüfbefugnis festlegen.'
      }
    ],
    decisionTitle: 'Menschliche Validierung dokumentiert',
    decision: 'Arbeitsrahmen CNS-02 von Cheikh am 24.08.2026 validiert. Dies erlaubt die Vorbereitung des Detailinventars, ist aber weder Genehmigung eines Verfahrens noch Erklärung von Reife oder Wirksamkeit.',
    authority: 'Die Genehmigung eines Verfahrens, einer sensiblen Ausnahme oder einer Verantwortungsänderung bleibt von der Validierung dieses Arbeitsrahmens getrennt.',
    recordLabels: {
      eyebrow: 'Governance-konformer Entscheidnachweis',
      author: 'Entscheidautor',
      date: 'Entscheiddatum',
      decision: 'Dokumentierter Entscheid',
      evidence: 'Nachweis der Rückverfolgbarkeit',
      limit: 'Umfang und Vorbehalt'
    },
    record: {
      id: 'CNS-02-DEC-001',
      version: 'V1.0',
      status: 'Arbeitsrahmen validiert',
      author: 'Cheikh Ndiaye',
      date: '24.08.2026',
      decision: 'Die vier Vorschläge CNS-02 werden als Arbeitsgrundlage für das Detailinventar der wesentlichen und kritischen 2SG-Prozesse festgehalten.',
      evidence: 'Menschliche Validierung in der 2SG-Sitzung und im Journal vom 24.08.2026 dokumentiert; Kandidatenbasis mit Frontend-PR #175 veröffentlicht; Merge-Commit 9ffcf847.',
      limit: 'Dies genehmigt weder Verfahren, sensible Ausnahmen noch Verantwortungsänderungen und erklärt weder Anwendung, Wirksamkeit noch Reife. Jede Änderung erzeugt eine neue Version, ohne diesen Nachweis zu überschreiben.'
    },
    source: 'Quellen: veröffentlichtes CNS-02, CNS-01 als Arbeitsrahmen validiert, Pilot Administration, Ansichten Prozesse & Verfahren und dokumentierte 2SG-Governance-Regeln. Status: Arbeitsrahmen von Cheikh am 24.08.2026 validiert; kein einzelnes Verfahren genehmigt.'
  }
};

const ICONS = [ListChecks, FileCheck2, UsersRound, Ban];
const ACCENTS = ['text-cyan-300', 'text-blue-300', 'text-violet-300', 'text-amber-300'];

const InstitutionalProcessesArbitrationProposal = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-4" aria-labelledby="institutional-processes-arbitration-proposal-title">
      <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
      <h5 id="institutional-processes-arbitration-proposal-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h5>
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

export default InstitutionalProcessesArbitrationProposal;
