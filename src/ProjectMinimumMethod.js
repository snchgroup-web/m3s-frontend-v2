import React, { useState } from 'react';
import {
  Archive,
  BadgeCheck,
  Banknote,
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  Flag,
  Gauge,
  Scale,
  ShieldAlert,
  UserRoundCheck
} from 'lucide-react';

const COPY = {
  FR: {
    title: 'Contrôle minimal d’un projet',
    body: 'Une fiche commune pour rendre chaque projet compréhensible, pilotable et vérifiable, même par une personne qui n’a pas participé aux échanges initiaux.',
    candidate: 'Règle candidate V0.1',
    readOnly: 'Lecture seule',
    pilot: 'Issue du pilote Villa Lac Rose',
    tabLabel: 'Vues de la méthode minimale de gestion de projet',
    tabs: {
      core: 'Noyau',
      milestones: 'Jalons',
      review: 'Revue',
      closure: 'Clôture'
    },
    coreTitle: 'Huit éléments toujours visibles',
    coreBody: 'Une conversation, un message ou une facture isolée ne remplace pas cette fiche minimale.',
    essentials: [
      ['Objectif', 'Résultat observable attendu.'],
      ['Responsable', 'Une personne chargée du suivi.'],
      ['Échéance', 'Date cible et prochain jalon.'],
      ['Coût', 'Prévu, engagé, payé et restant.'],
      ['Preuve', 'Document, photo, test ou réception.'],
      ['Statut', 'État courant expliqué.'],
      ['Risque', 'Obstacle, impact et réponse.'],
      ['Décision', 'Décideur, date et suite retenue.']
    ],
    milestonesTitle: 'Cycle de contrôle J0 à J8',
    milestonesBody: 'La profondeur documentaire s’adapte au projet, mais aucun jalon critique ne doit rester implicite.',
    milestones: [
      ['J0', 'Besoin confirmé'],
      ['J1', 'Périmètre et responsable validés'],
      ['J2', 'Options ou offres recueillies'],
      ['J3', 'Comparaison et risques contrôlés'],
      ['J4', 'Décision et engagement autorisés'],
      ['J5', 'Exécution suivie'],
      ['J6', 'Contrôle et réception'],
      ['J7', 'Paiement final et clôture'],
      ['J8', 'Archivage et retour d’expérience']
    ],
    reviewTitle: 'Revue courte en six questions',
    reviewBody: 'Une revue brève suffit lorsque les réponses sont factuelles et reliées à des preuves.',
    reviewQuestions: [
      'Qu’est-ce qui a changé depuis la dernière revue ?',
      'Le résultat attendu reste-t-il pertinent ?',
      'Quel est le prochain jalon ?',
      'Quel blocage ou risque exige une décision ?',
      'Quel montant est engagé, payé et restant ?',
      'Quelle preuve manque encore ?'
    ],
    urgencyTitle: 'Urgence : adapter sans perdre la trace',
    urgencyBody: 'L’urgence peut réduire certains contrôles avant engagement. Elle exige alors une justification, un montant autorisé, un décideur et un contrôle après exécution.',
    closureTitle: 'Conditions de clôture',
    closureBody: 'Le statut « terminé » ne suffit pas : le résultat, les paiements et les preuves doivent être rapprochés.',
    closureChecks: [
      'Résultat livré et contrôlé',
      'Réserves levées ou acceptées',
      'Paiements rapprochés',
      'Preuves rangées dans la GED',
      'Réception et décision tracées',
      'Écarts expliqués',
      'Leçon utile versée au KM'
    ],
    footer: 'La méthode reste candidate. Un second projet court devra confirmer sa portée transversale avant toute automatisation ou Skill.'
  },
  EN: {
    title: 'Minimum project control',
    body: 'A shared record that keeps every project understandable, manageable and verifiable, even for someone who did not take part in the initial discussions.',
    candidate: 'Candidate rule V0.1',
    readOnly: 'Read only',
    pilot: 'Derived from the Villa Lac Rose pilot',
    tabLabel: 'Minimum project management method views',
    tabs: {
      core: 'Core',
      milestones: 'Milestones',
      review: 'Review',
      closure: 'Closure'
    },
    coreTitle: 'Eight elements that remain visible',
    coreBody: 'A conversation, message or isolated invoice does not replace this minimum record.',
    essentials: [
      ['Objective', 'Expected observable outcome.'],
      ['Owner', 'One person responsible for follow-up.'],
      ['Deadline', 'Target date and next milestone.'],
      ['Cost', 'Planned, committed, paid and remaining.'],
      ['Evidence', 'Document, photo, test or acceptance.'],
      ['Status', 'Current state with an explanation.'],
      ['Risk', 'Obstacle, impact and response.'],
      ['Decision', 'Decision-maker, date and chosen next step.']
    ],
    milestonesTitle: 'J0 to J8 control cycle',
    milestonesBody: 'Documentation depth may vary by project, but no critical milestone should remain implicit.',
    milestones: [
      ['J0', 'Need confirmed'],
      ['J1', 'Scope and owner approved'],
      ['J2', 'Options or offers collected'],
      ['J3', 'Comparison and risks checked'],
      ['J4', 'Decision and commitment authorised'],
      ['J5', 'Execution monitored'],
      ['J6', 'Control and acceptance'],
      ['J7', 'Final payment and closure'],
      ['J8', 'Archiving and lessons learned']
    ],
    reviewTitle: 'Short review in six questions',
    reviewBody: 'A brief review is enough when answers are factual and linked to evidence.',
    reviewQuestions: [
      'What has changed since the last review?',
      'Is the expected outcome still relevant?',
      'What is the next milestone?',
      'Which blocker or risk requires a decision?',
      'What amount is committed, paid and remaining?',
      'Which evidence is still missing?'
    ],
    urgencyTitle: 'Urgency: adapt without losing traceability',
    urgencyBody: 'Urgency may reduce some checks before commitment. It then requires a justification, an authorised ceiling, a decision-maker and a post-execution review.',
    closureTitle: 'Closure conditions',
    closureBody: 'A “completed” status is not enough: the outcome, payments and evidence must be reconciled.',
    closureChecks: [
      'Outcome delivered and checked',
      'Reservations cleared or accepted',
      'Payments reconciled',
      'Evidence filed in the GED',
      'Acceptance and decision recorded',
      'Variances explained',
      'Useful lesson added to KM'
    ],
    footer: 'The method remains a candidate. A second short project must confirm its cross-functional scope before any automation or Skill.'
  },
  DE: {
    title: 'Mindestkontrolle eines Projekts',
    body: 'Ein gemeinsamer Steckbrief macht jedes Projekt verständlich, steuerbar und überprüfbar, auch für Personen, die nicht an den ersten Gesprächen beteiligt waren.',
    candidate: 'Regelentwurf V0.1',
    readOnly: 'Nur-Lese-Modus',
    pilot: 'Aus dem Pilotprojekt Villa Lac Rose',
    tabLabel: 'Ansichten der minimalen Projektmanagement-Methode',
    tabs: {
      core: 'Kern',
      milestones: 'Meilensteine',
      review: 'Kurzprüfung',
      closure: 'Abschluss'
    },
    coreTitle: 'Acht stets sichtbare Elemente',
    coreBody: 'Ein Gespräch, eine Nachricht oder eine einzelne Rechnung ersetzt diesen Mindeststeckbrief nicht.',
    essentials: [
      ['Ziel', 'Erwartetes, beobachtbares Ergebnis.'],
      ['Verantwortliche Person', 'Eine Person für die Nachverfolgung.'],
      ['Frist', 'Zieldatum und nächster Meilenstein.'],
      ['Kosten', 'Geplant, gebunden, bezahlt und offen.'],
      ['Nachweis', 'Dokument, Foto, Test oder Abnahme.'],
      ['Status', 'Aktueller Stand mit Erklärung.'],
      ['Risiko', 'Hindernis, Auswirkung und Reaktion.'],
      ['Entscheidung', 'Entscheidungsbefugte Person, Datum und Folgeschritt.']
    ],
    milestonesTitle: 'Kontrollzyklus J0 bis J8',
    milestonesBody: 'Die Dokumentationstiefe kann je Projekt variieren, aber kein kritischer Meilenstein darf implizit bleiben.',
    milestones: [
      ['J0', 'Bedarf bestätigt'],
      ['J1', 'Umfang und Verantwortung freigegeben'],
      ['J2', 'Optionen oder Angebote gesammelt'],
      ['J3', 'Vergleich und Risiken geprüft'],
      ['J4', 'Entscheidung und Verpflichtung autorisiert'],
      ['J5', 'Umsetzung nachverfolgt'],
      ['J6', 'Kontrolle und Abnahme'],
      ['J7', 'Schlusszahlung und Abschluss'],
      ['J8', 'Archivierung und Erfahrungssicherung']
    ],
    reviewTitle: 'Kurzprüfung mit sechs Fragen',
    reviewBody: 'Eine kurze Prüfung reicht aus, wenn die Antworten sachlich und mit Nachweisen verknüpft sind.',
    reviewQuestions: [
      'Was hat sich seit der letzten Prüfung geändert?',
      'Ist das erwartete Ergebnis weiterhin relevant?',
      'Welcher Meilenstein folgt als Nächstes?',
      'Welche Blockade oder welches Risiko erfordert eine Entscheidung?',
      'Welcher Betrag ist gebunden, bezahlt und offen?',
      'Welcher Nachweis fehlt noch?'
    ],
    urgencyTitle: 'Dringlichkeit: anpassen, ohne die Spur zu verlieren',
    urgencyBody: 'Dringlichkeit kann einzelne Kontrollen vor einer Verpflichtung verkürzen. Dann sind Begründung, genehmigter Höchstbetrag, entscheidende Person und Nachkontrolle erforderlich.',
    closureTitle: 'Abschlussbedingungen',
    closureBody: 'Der Status „abgeschlossen“ genügt nicht: Ergebnis, Zahlungen und Nachweise müssen abgestimmt sein.',
    closureChecks: [
      'Ergebnis geliefert und geprüft',
      'Vorbehalte aufgehoben oder akzeptiert',
      'Zahlungen abgestimmt',
      'Nachweise in der GED abgelegt',
      'Abnahme und Entscheidung dokumentiert',
      'Abweichungen erklärt',
      'Nützliche Erkenntnis im KM gesichert'
    ],
    footer: 'Die Methode bleibt ein Entwurf. Ein zweites kurzes Projekt muss ihre bereichsübergreifende Eignung bestätigen, bevor Automatisierung oder eine Skill entsteht.'
  }
};

const ESSENTIAL_ICONS = [Gauge, UserRoundCheck, CalendarClock, Banknote, FileCheck2, BadgeCheck, ShieldAlert, Scale];

const ProjectMinimumMethod = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const [activeView, setActiveView] = useState('core');
  const tabs = ['core', 'milestones', 'review', 'closure'];

  return (
    <section id="planning-method" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="planning-method-title">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="shrink-0 text-emerald-300" size={22} aria-hidden="true" />
            <h3 id="planning-method-title" className="text-lg font-bold text-white">{t.title}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-700 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-200">{t.candidate}</span>
          <span className="rounded-full border border-blue-700 bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-200">{t.readOnly}</span>
        </div>
      </header>

      <p className="mt-4 text-xs font-semibold uppercase text-slate-400">{t.pilot}</p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={t.tabLabel}>
        {tabs.map((tab) => {
          const selected = activeView === tab;
          return (
            <button
              key={tab}
              id={`planning-method-tab-${tab}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`planning-method-panel-${tab}`}
              onClick={() => setActiveView(tab)}
              className={`min-h-11 rounded-md border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${selected ? 'border-blue-500 bg-blue-900 text-white' : 'border-slate-600 bg-slate-900 text-slate-300 hover:border-blue-600 hover:text-white'}`}
            >
              {t.tabs[tab]}
            </button>
          );
        })}
      </div>

      <div
        id={`planning-method-panel-${activeView}`}
        role="tabpanel"
        aria-labelledby={`planning-method-tab-${activeView}`}
        className="mt-5 border-t border-slate-700 pt-5"
      >
        {activeView === 'core' && (
          <div>
            <h4 className="font-bold text-white">{t.coreTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">{t.coreBody}</p>
            <dl className="mt-4 grid gap-x-5 sm:grid-cols-2 xl:grid-cols-4">
              {t.essentials.map(([label, description], index) => {
                const Icon = ESSENTIAL_ICONS[index];
                return (
                  <div key={label} className="border-t border-slate-700 py-3">
                    <dt className="flex items-center gap-2 text-sm font-bold text-white">
                      <Icon className="shrink-0 text-blue-300" size={17} aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-5 text-slate-400">{description}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}

        {activeView === 'milestones' && (
          <div>
            <h4 className="font-bold text-white">{t.milestonesTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">{t.milestonesBody}</p>
            <ol className="mt-4 grid gap-3 md:grid-cols-3">
              {t.milestones.map(([code, label]) => (
                <li key={code} className="flex min-h-16 items-center gap-3 border-l-2 border-blue-600 bg-slate-900/45 px-3 py-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-blue-200">{code}</span>
                  <span className="text-sm font-semibold leading-5 text-slate-200">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {activeView === 'review' && (
          <div>
            <h4 className="font-bold text-white">{t.reviewTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">{t.reviewBody}</p>
            <ol className="mt-4 grid gap-x-6 md:grid-cols-2">
              {t.reviewQuestions.map((question, index) => (
                <li key={question} className="flex gap-3 border-t border-slate-700 py-3 text-sm leading-6 text-slate-200">
                  <span className="font-bold text-blue-300">{index + 1}</span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
            <aside className="mt-4 border-l-4 border-amber-500 bg-amber-950/25 px-4 py-3">
              <div className="flex items-center gap-2 font-bold text-amber-200">
                <ShieldAlert size={18} aria-hidden="true" />
                {t.urgencyTitle}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-300">{t.urgencyBody}</p>
            </aside>
          </div>
        )}

        {activeView === 'closure' && (
          <div>
            <h4 className="font-bold text-white">{t.closureTitle}</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">{t.closureBody}</p>
            <ul className="mt-4 grid gap-x-6 md:grid-cols-2">
              {t.closureChecks.map((item, index) => (
                <li key={item} className="flex gap-3 border-t border-slate-700 py-3 text-sm leading-6 text-slate-200">
                  {index === t.closureChecks.length - 1 ? (
                    <Archive className="mt-0.5 shrink-0 text-emerald-300" size={17} aria-hidden="true" />
                  ) : (
                    <BadgeCheck className="mt-0.5 shrink-0 text-emerald-300" size={17} aria-hidden="true" />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer className="mt-5 flex items-start gap-3 border-t border-slate-700 pt-4 text-sm leading-6 text-slate-400">
        <Flag className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" />
        <p>{t.footer}</p>
      </footer>
    </section>
  );
};

export default ProjectMinimumMethod;
