import React from 'react';
import {
  ArrowRight,
  Building2,
  FileCheck2,
  FolderArchive,
  GitBranch,
  Link2,
  UsersRound
} from 'lucide-react';

const COPY = {
  FR: {
    title: 'Contrat minimal de relations communes',
    body: 'Cette lecture relie les objets sans imposer tous les niveaux à chaque enregistrement. Les identifiants gouvernés remplacent les noms et références libres dès qu’une relation existe.',
    legend: {
      conditional: 'Si le contexte existe',
      governed: 'Lien gouverné',
      target: 'Objet cible'
    },
    flows: [
      {
        title: 'Pilotage du travail',
        items: [
          ['Dossier', 'Cadre une affaire, un incident ou un chantier.', 'conditional', FolderArchive],
          ['Projet & tâche', 'Organisent le résultat et l’exécution sans créer de niveaux vides.', 'conditional', GitBranch]
        ]
      },
      {
        title: 'Responsabilité et actif',
        items: [
          ['Agent & affectation', 'Relient une personne à un objet avec un rôle précis : responsable, exécutant, contrôleur ou validateur.', 'governed', UsersRound],
          ['Actif & intervention', 'Rattachent un travail, une réparation ou un contrôle au bien concerné.', 'conditional', Building2],
          ['Validation & réception', 'Consignent une décision ou un contrôle sur l’objet concerné et identifient le validateur.', 'target', FileCheck2]
        ]
      },
      {
        title: 'Preuve documentaire',
        items: [
          ['Document GED & preuve', 'La GED conserve le document ; la preuve qualifie son rôle et le relie au dossier, projet, tâche, actif, dépense ou paiement.', 'governed', FileCheck2]
        ]
      }
    ],
    rule: 'Une validation n’est pas déduite du nom de l’auteur. Elle doit être portée par une affectation, une réception, une décision ou une autre relation explicitement gouvernée.'
  },
  EN: {
    title: 'Minimum contract for shared relationships',
    body: 'This view links objects without forcing every level onto every record. Governed identifiers replace names and free-form references whenever a relationship exists.',
    legend: {
      conditional: 'When the context exists',
      governed: 'Governed link',
      target: 'Target object'
    },
    flows: [
      {
        title: 'Work steering',
        items: [
          ['File', 'Frames a matter, incident or worksite.', 'conditional', FolderArchive],
          ['Project & task', 'Organise the result and execution without creating empty levels.', 'conditional', GitBranch]
        ]
      },
      {
        title: 'Responsibility and asset',
        items: [
          ['Agent & assignment', 'Link a person to an object with a precise role: owner, performer, controller or validator.', 'governed', UsersRound],
          ['Asset & intervention', 'Link work, repair or inspection to the asset concerned.', 'conditional', Building2],
          ['Validation & reception', 'Record a decision or inspection on the relevant object and identify the validator.', 'target', FileCheck2]
        ]
      },
      {
        title: 'Documentary evidence',
        items: [
          ['DMS document & evidence', 'The DMS retains the document; evidence qualifies its role and links it to the file, project, task, asset, expense or payment.', 'governed', FileCheck2]
        ]
      }
    ],
    rule: 'Approval is not inferred from the author’s name. It must be carried by an assignment, reception, decision or another explicitly governed relationship.'
  },
  DE: {
    title: 'Minimalvertrag für gemeinsame Beziehungen',
    body: 'Diese Ansicht verknüpft Objekte, ohne jedem Eintrag alle Ebenen aufzuzwingen. Gesteuerte Kennungen ersetzen Namen und freie Referenzen, sobald eine Beziehung besteht.',
    legend: {
      conditional: 'Wenn der Kontext besteht',
      governed: 'Gesteuerte Verknüpfung',
      target: 'Zielobjekt'
    },
    flows: [
      {
        title: 'Arbeitssteuerung',
        items: [
          ['Akte', 'Rahmt einen Vorgang, Vorfall oder eine Baustelle.', 'conditional', FolderArchive],
          ['Projekt & Aufgabe', 'Ordnen Ergebnis und Ausführung, ohne leere Ebenen anzulegen.', 'conditional', GitBranch]
        ]
      },
      {
        title: 'Verantwortung und Anlage',
        items: [
          ['Agent & Zuordnung', 'Verknüpfen eine Person mit einem Objekt und einer präzisen Rolle: verantwortlich, ausführend, kontrollierend oder validierend.', 'governed', UsersRound],
          ['Anlage & Intervention', 'Ordnen Arbeit, Reparatur oder Kontrolle dem betroffenen Gut zu.', 'conditional', Building2],
          ['Validierung & Abnahme', 'Dokumentieren Entscheidung oder Kontrolle am betroffenen Objekt und benennen die validierende Person.', 'target', FileCheck2]
        ]
      },
      {
        title: 'Dokumentarischer Nachweis',
        items: [
          ['DMS-Dokument & Nachweis', 'Das DMS bewahrt das Dokument auf; der Nachweis qualifiziert seine Rolle und verknüpft es mit Akte, Projekt, Aufgabe, Anlage, Aufwand oder Zahlung.', 'governed', FileCheck2]
        ]
      }
    ],
    rule: 'Eine Freigabe wird nicht aus dem Namen des Autors abgeleitet. Sie muss durch Zuordnung, Abnahme, Entscheidung oder eine andere ausdrücklich gesteuerte Beziehung belegt sein.'
  }
};

const STATUS_CLASSES = {
  conditional: 'border-slate-600 bg-slate-900/55 text-slate-300',
  governed: 'border-cyan-700 bg-cyan-950/25 text-cyan-200',
  target: 'border-dashed border-amber-700 bg-amber-950/20 text-amber-200'
};

const TransversalRelationContract = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-5 rounded-lg border border-cyan-900/70 bg-slate-900/35 p-4 sm:p-5" aria-labelledby="transversal-relation-contract-title">
      <div className="flex items-start gap-3">
        <Link2 size={22} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
        <div>
          <h4 id="transversal-relation-contract-title" className="font-semibold text-slate-100">{t.title}</h4>
          <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.body}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(t.legend).map(([status, label]) => (
          <span key={status} className={`inline-flex min-h-6 max-w-full items-center whitespace-normal rounded-full border px-2.5 py-1 text-left text-[11px] font-semibold leading-4 ${STATUS_CLASSES[status]}`}>
            {label}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {t.flows.map(flow => (
          <article key={flow.title} className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
            <h5 className="text-sm font-semibold text-slate-200">{flow.title}</h5>
            <div className="mt-3 space-y-3">
              {flow.items.map(([title, body, status, Icon], index) => (
                <React.Fragment key={title}>
                  {index > 0 && <ArrowRight size={17} className="mx-auto rotate-90 text-slate-500" aria-hidden="true" />}
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon size={18} className="shrink-0 text-cyan-300" aria-hidden="true" />
                        <h6 className="min-w-0 break-words font-semibold text-slate-100">{title}</h6>
                      </div>
                      <span className={`max-w-full whitespace-normal rounded-full border px-2 py-0.5 text-left text-[10px] font-semibold leading-4 ${STATUS_CLASSES[status]}`}>
                        {t.legend[status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 border-l-2 border-cyan-700 pl-3 text-xs leading-5 text-slate-400">{t.rule}</p>
    </section>
  );
};

export default TransversalRelationContract;
