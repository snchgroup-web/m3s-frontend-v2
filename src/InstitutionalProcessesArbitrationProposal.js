import React from 'react';
import {
  Ban,
  FileCheck2,
  ListChecks,
  Scale,
  ShieldQuestion,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PROPOSITION À EXAMINER · AUCUNE VALIDATION ENREGISTRÉE',
    title: 'Base d’arbitrage candidate CNS-02',
    body: 'Ces quatre propositions préparent l’examen humain de CNS-02. Elles rendent la décision contrôlable sans présumer que les processus sont complets, approuvés, appliqués ou efficaces.',
    cards: [
      {
        title: 'Périmètre cible proposé',
        body: 'Processus essentiels et critiques de 2SG, transversaux ou propres aux fonctions : gouvernance, obligations, administration, finances, ressources humaines, données, sécurité, continuité et opérations. Chaque processus est inventorié puis priorisé selon son résultat attendu, son risque, sa fréquence et ses dépendances.',
        limit: 'Hors périmètre : déclarer le manuel complet, imposer une procédure non validée ou confondre processus, projet, activité et tâche.'
      },
      {
        title: 'Preuves recevables proposées',
        body: 'Fiche processus versionnée ; procédure approuvée lorsque nécessaire ; résultat d’exécution daté ; contrôles et décisions reliés à leurs preuves ; écarts, corrections et nouvelle vérification ; historique GED des versions, exceptions, revues et archives.',
        limit: 'Une procédure disponible ne prouve ni son approbation, ni son application, ni l’efficacité de ses contrôles.'
      },
      {
        title: 'Responsabilités proposées',
        body: 'La fonction propriétaire valide le fond et le résultat. Administration tient le registre, coordonne versions et revues. Gouvernance approuve règles et exceptions sensibles. La GED conserve les preuves. IT & Support opère les contrôles techniques autorisés. Les exécutants réalisent et documentent les étapes attribuées.',
        limit: 'Cette répartition ne crée aucun mandat, droit M3S ou responsabilité juridique supplémentaire.'
      },
      {
        title: 'Principe de calcul proposé',
        body: 'Aucun pourcentage à ce stade. La mesure reste indisponible tant que l’inventaire des processus critiques, leurs statuts, propriétaires, contrôles minimaux, preuves attendues et règles de revue ne sont pas validés et versionnés.',
        limit: 'Une règle séparée devra ensuite définir le dénominateur, les statuts admissibles, les cas non applicables, la fréquence et l’autorité de revue.'
      }
    ],
    decisionTitle: 'Arbitrage humain requis',
    decision: 'Cheikh peut valider ces propositions comme cadre de travail CNS-02, les modifier ou consigner des réserves. Tant que cette décision n’est pas explicitement enregistrée, le statut reste candidat.',
    authority: 'L’approbation d’une procédure, d’une exception sensible ou d’un changement de responsabilité reste une décision distincte de la validation de ce cadre de travail.',
    source: 'Sources : CNS-02 publié, CNS-01 validé comme cadre de travail, pilote Administration, vues Processus & Procédures et règles de gouvernance 2SG. Statut : proposition candidate à validation humaine.'
  },
  EN: {
    eyebrow: 'PROPOSAL FOR REVIEW · NO VALIDATION RECORDED',
    title: 'Candidate CNS-02 decision baseline',
    body: 'These four proposals prepare the CNS-02 human review. They make the decision controllable without assuming that processes are complete, approved, applied or effective.',
    cards: [
      {
        title: 'Proposed target scope',
        body: 'Essential and critical 2SG processes, whether cross-functional or function-specific: governance, obligations, administration, finance, human resources, data, security, continuity and operations. Each process is inventoried and prioritised by expected outcome, risk, frequency and dependencies.',
        limit: 'Out of scope: declaring the manual complete, imposing an unvalidated procedure, or confusing a process with a project, activity or task.'
      },
      {
        title: 'Proposed acceptable evidence',
        body: 'Versioned process sheet; approved procedure where required; dated execution outcome; controls and decisions linked to evidence; deviations, corrections and new verification; DMS history of versions, exceptions, reviews and archives.',
        limit: 'An available procedure proves neither approval, application nor control effectiveness.'
      },
      {
        title: 'Proposed responsibilities',
        body: 'The owning function validates substance and outcome. Administration maintains the register and coordinates versions and reviews. Governance approves rules and sensitive exceptions. The DMS retains evidence. IT & Support performs authorised technical controls. Executors perform and document assigned steps.',
        limit: 'This allocation creates no additional mandate, M3S right or legal responsibility.'
      },
      {
        title: 'Proposed calculation principle',
        body: 'No percentage at this stage. Measurement remains unavailable until the inventory of critical processes, their statuses, owners, minimum controls, expected evidence and review rules are validated and versioned.',
        limit: 'A separate rule must then define the denominator, eligible statuses, not-applicable cases, frequency and review authority.'
      }
    ],
    decisionTitle: 'Human decision required',
    decision: 'Cheikh may validate these proposals as the CNS-02 working framework, amend them or record reservations. Until that decision is explicitly recorded, the status remains candidate.',
    authority: 'Approval of a procedure, sensitive exception or responsibility change remains separate from validation of this working framework.',
    source: 'Sources: published CNS-02, CNS-01 validated as a working framework, Administration pilot, Processes & Procedures views and recorded 2SG governance rules. Status: candidate proposal pending human validation.'
  },
  DE: {
    eyebrow: 'VORSCHLAG ZUR PRÜFUNG · KEINE VALIDIERUNG PROTOKOLLIERT',
    title: 'Kandidatenbasis für den Entscheid CNS-02',
    body: 'Diese vier Vorschläge bereiten die menschliche Prüfung CNS-02 vor. Sie machen den Entscheid kontrollierbar, ohne vollständige, genehmigte, angewandte oder wirksame Prozesse vorauszusetzen.',
    cards: [
      {
        title: 'Vorgeschlagener Zielumfang',
        body: 'Wesentliche und kritische 2SG-Prozesse, funktionsübergreifend oder funktionsspezifisch: Governance, Pflichten, Administration, Finanzen, Personal, Daten, Sicherheit, Kontinuität und Betrieb. Jeder Prozess wird nach Zielergebnis, Risiko, Häufigkeit und Abhängigkeiten inventarisiert und priorisiert.',
        limit: 'Nicht enthalten: das Handbuch als vollständig erklären, ein nicht validiertes Verfahren auferlegen oder Prozess, Projekt, Aktivität und Aufgabe verwechseln.'
      },
      {
        title: 'Vorgeschlagene zulässige Nachweise',
        body: 'Versioniertes Prozessblatt; bei Bedarf genehmigtes Verfahren; datiertes Ausführungsergebnis; mit Nachweisen verknüpfte Kontrollen und Entscheide; Abweichungen, Korrekturen und neue Prüfung; GED-Historie von Versionen, Ausnahmen, Prüfungen und Archiven.',
        limit: 'Ein verfügbares Verfahren belegt weder Genehmigung noch Anwendung oder Kontrollwirksamkeit.'
      },
      {
        title: 'Vorgeschlagene Verantwortungen',
        body: 'Die verantwortliche Funktion validiert Inhalt und Ergebnis. Administration führt das Register und koordiniert Versionen und Prüfungen. Governance genehmigt Regeln und sensible Ausnahmen. Die GED bewahrt Nachweise. IT & Support führt autorisierte technische Kontrollen aus. Ausführende dokumentieren ihre Schritte.',
        limit: 'Diese Zuordnung schafft kein zusätzliches Mandat, M3S-Recht oder rechtliche Verantwortung.'
      },
      {
        title: 'Vorgeschlagenes Berechnungsprinzip',
        body: 'In dieser Phase kein Prozentsatz. Die Messung bleibt nicht verfügbar, bis Inventar, Status, Verantwortungen, Mindestkontrollen, erwartete Nachweise und Prüfregeln der kritischen Prozesse validiert und versioniert sind.',
        limit: 'Danach muss eine getrennte Regel Nenner, zulässige Status, nicht anwendbare Fälle, Frequenz und Prüfbefugnis festlegen.'
      }
    ],
    decisionTitle: 'Menschlicher Entscheid erforderlich',
    decision: 'Cheikh kann diese Vorschläge als Arbeitsrahmen CNS-02 validieren, ändern oder Vorbehalte protokollieren. Bis dieser Entscheid ausdrücklich dokumentiert ist, bleibt der Status Kandidat.',
    authority: 'Die Genehmigung eines Verfahrens, einer sensiblen Ausnahme oder einer Verantwortungsänderung bleibt von der Validierung dieses Arbeitsrahmens getrennt.',
    source: 'Quellen: veröffentlichtes CNS-02, CNS-01 als Arbeitsrahmen validiert, Pilot Administration, Ansichten Prozesse & Verfahren und dokumentierte 2SG-Governance-Regeln. Status: Kandidatenvorschlag zur menschlichen Validierung.'
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

export default InstitutionalProcessesArbitrationProposal;
