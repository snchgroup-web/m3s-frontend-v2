import React from 'react';
import {
  Building2,
  CheckCircle2,
  FileVideo2,
  Hammer,
  Link2,
  Paintbrush,
  ShieldCheck,
  UserRoundCheck,
  Waves
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'VALIDATION SUR CAS RÉEL · 16-08-2026',
    title: 'Cas pilote : Villa LR1',
    body: 'Cette lecture applique le modèle au dernier état terrain documenté. Elle ne crée aucun identifiant technique et le cas Villa LR1 ne devient pas la définition générale du modèle.',
    asset: 'Actif suivi',
    assetName: 'Villa LR1',
    assetBody: 'Un même actif peut porter plusieurs interventions distinctes sans confondre leurs prestataires, tâches, contrôles, paiements ou preuves.',
    branches: [
      {
        title: 'Avants de fenêtres',
        icon: ShieldCheck,
        status: 'Intervention en finition',
        rows: [
          ['Tâche restante', 'Peinture', Paintbrush],
          ['Contrôle', 'Étanchéité confirmée après pluie ; réception finale encore à consigner.', CheckCircle2],
          ['Preuves GED', 'Environ 15 photos et vidéos à indexer et relier à l’intervention.', FileVideo2]
        ]
      },
      {
        title: 'Mini-forage',
        icon: Waves,
        status: 'Intervention fonctionnelle',
        rows: [
          ['Tâche séparée', 'Protection maçonnée et couvercle, confiés à un autre intervenant.', Hammer],
          ['Contrôle', 'Eau rétablie et débit vérifié ; finition de protection à réceptionner séparément.', CheckCircle2],
          ['Preuves GED', 'Photos et vidéos à indexer et relier à l’intervention et à sa finition.', FileVideo2]
        ]
      }
    ],
    responsibilityTitle: 'Responsabilités sans ambiguïté',
    responsibility: 'Les responsables, exécutants, contrôleurs et validateurs sont reliés par des affectations. Le nom de l’auteur d’une saisie ne suffit pas à attribuer l’une de ces responsabilités.',
    pendingTitle: 'Raccordements encore à gouverner',
    pending: ['Identifiants de l’actif, des interventions et des tâches', 'Références GED des médias', 'Réceptions finales et éventuels soldes', 'Affectations nominatives selon les droits'],
    cardinality: 'Lecture validée : 1 actif → plusieurs interventions ; 1 intervention → plusieurs tâches, contrôles et preuves. Les cardinalités techniques restent à confirmer lors du raccordement backend.'
  },
  EN: {
    eyebrow: 'REAL-CASE VALIDATION · 16 AUG 2026',
    title: 'Pilot case: Villa LR1',
    body: 'This view applies the model to the latest documented field status. It creates no technical identifier, and Villa LR1 does not become the general definition of the model.',
    asset: 'Tracked asset',
    assetName: 'Villa LR1',
    assetBody: 'One asset can carry several distinct interventions without mixing their providers, tasks, controls, payments or evidence.',
    branches: [
      {
        title: 'Window awnings',
        icon: ShieldCheck,
        status: 'Finishing in progress',
        rows: [
          ['Remaining task', 'Painting', Paintbrush],
          ['Control', 'Watertightness confirmed after rain; final acceptance still to be recorded.', CheckCircle2],
          ['DMS evidence', 'About 15 photos and videos to index and link to the intervention.', FileVideo2]
        ]
      },
      {
        title: 'Mini-borehole',
        icon: Waves,
        status: 'Functional intervention',
        rows: [
          ['Separate task', 'Protective masonry and cover, assigned to another worker.', Hammer],
          ['Control', 'Water restored and flow checked; protective finishing to be accepted separately.', CheckCircle2],
          ['DMS evidence', 'Photos and videos to index and link to the intervention and its finishing work.', FileVideo2]
        ]
      }
    ],
    responsibilityTitle: 'Unambiguous responsibilities',
    responsibility: 'Owners, performers, controllers and validators are linked through assignments. The name of a record’s author is not enough to assign any of these responsibilities.',
    pendingTitle: 'Connections still to govern',
    pending: ['Asset, intervention and task identifiers', 'DMS references for media', 'Final acceptance and any balances', 'Named assignments according to access rights'],
    cardinality: 'Validated reading: 1 asset → several interventions; 1 intervention → several tasks, controls and evidence items. Technical cardinalities remain to be confirmed during backend connection.'
  },
  DE: {
    eyebrow: 'VALIDIERUNG AM REALEN FALL · 16.08.2026',
    title: 'Pilotfall: Villa LR1',
    body: 'Diese Ansicht wendet das Modell auf den zuletzt dokumentierten Geländestand an. Sie erzeugt keine technische Kennung, und Villa LR1 wird nicht zur allgemeinen Definition des Modells.',
    asset: 'Verfolgte Anlage',
    assetName: 'Villa LR1',
    assetBody: 'Eine Anlage kann mehrere getrennte Interventionen tragen, ohne Anbieter, Aufgaben, Kontrollen, Zahlungen oder Nachweise zu vermischen.',
    branches: [
      {
        title: 'Fenstervordächer',
        icon: ShieldCheck,
        status: 'Abschlussarbeiten laufen',
        rows: [
          ['Verbleibende Aufgabe', 'Anstrich', Paintbrush],
          ['Kontrolle', 'Dichtheit nach Regen bestätigt; Endabnahme noch zu dokumentieren.', CheckCircle2],
          ['DMS-Nachweise', 'Rund 15 Fotos und Videos zu indexieren und mit der Intervention zu verknüpfen.', FileVideo2]
        ]
      },
      {
        title: 'Mini-Bohrung',
        icon: Waves,
        status: 'Funktionierende Intervention',
        rows: [
          ['Getrennte Aufgabe', 'Schutzmauerwerk und Abdeckung, einem anderen Ausführenden zugeordnet.', Hammer],
          ['Kontrolle', 'Wasser wiederhergestellt und Durchfluss geprüft; Schutzabschluss getrennt abzunehmen.', CheckCircle2],
          ['DMS-Nachweise', 'Fotos und Videos zu indexieren und mit Intervention und Abschlussarbeit zu verknüpfen.', FileVideo2]
        ]
      }
    ],
    responsibilityTitle: 'Eindeutige Verantwortungen',
    responsibility: 'Verantwortliche, Ausführende, Kontrollierende und Validierende werden über Zuordnungen verknüpft. Der Name des Erfassers reicht für keine dieser Verantwortungen aus.',
    pendingTitle: 'Noch zu steuernde Anbindungen',
    pending: ['Kennungen für Anlage, Interventionen und Aufgaben', 'DMS-Referenzen der Medien', 'Endabnahmen und mögliche Restzahlungen', 'Namentliche Zuordnungen gemäß Zugriffsrechten'],
    cardinality: 'Bestätigte Lesart: 1 Anlage → mehrere Interventionen; 1 Intervention → mehrere Aufgaben, Kontrollen und Nachweise. Technische Kardinalitäten sind bei der Backend-Anbindung zu bestätigen.'
  }
};

const VillaLr1RelationPilot = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section className="mt-5 rounded-lg border border-blue-800/80 bg-blue-950/15 p-4 sm:p-5" aria-labelledby="villa-lr1-relation-pilot-title">
      <p className="text-xs font-semibold uppercase text-blue-300">{t.eyebrow}</p>
      <h4 id="villa-lr1-relation-pilot-title" className="mt-2 text-lg font-semibold text-slate-100">{t.title}</h4>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.body}</p>

      <div className="mt-5 rounded-lg border border-slate-700 bg-slate-900/45 p-4">
        <div className="flex items-start gap-3">
          <Building2 size={21} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">{t.asset}</p>
            <h5 className="mt-1 font-semibold text-slate-100">{t.assetName}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.assetBody}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {t.branches.map(branch => {
          const BranchIcon = branch.icon;
          return (
            <article key={branch.title} className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <BranchIcon size={20} className="shrink-0 text-cyan-300" aria-hidden="true" />
                  <h5 className="min-w-0 break-words font-semibold text-slate-100">{branch.title}</h5>
                </div>
                <span className="max-w-full whitespace-normal rounded-full border border-blue-700 bg-blue-950/30 px-2.5 py-1 text-left text-[11px] font-semibold leading-4 text-blue-200">{branch.status}</span>
              </div>
              <div className="mt-4 space-y-3">
                {branch.rows.map(([label, value, Icon]) => (
                  <div key={label} className="flex gap-3 rounded-md border border-slate-700 bg-slate-800 p-3">
                    <Icon size={18} className="mt-0.5 shrink-0 text-slate-300" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
                      <p className="mt-1 break-words text-sm leading-6 text-slate-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <aside className="rounded-lg border border-emerald-800/80 bg-emerald-950/15 p-4">
          <div className="flex gap-3">
            <UserRoundCheck size={20} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
            <div><h5 className="font-semibold text-slate-100">{t.responsibilityTitle}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibility}</p></div>
          </div>
        </aside>
        <aside className="rounded-lg border border-amber-800/80 bg-amber-950/15 p-4">
          <div className="flex gap-3">
            <Link2 size={20} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
            <div className="min-w-0"><h5 className="font-semibold text-slate-100">{t.pendingTitle}</h5><ul className="mt-2 space-y-1 text-sm leading-6 text-slate-300">{t.pending.map(item => <li key={item}>• {item}</li>)}</ul></div>
          </div>
        </aside>
      </div>

      <p className="mt-4 border-l-2 border-blue-700 pl-3 text-xs leading-5 text-slate-400">{t.cardinality}</p>
    </section>
  );
};

export default VillaLr1RelationPilot;
