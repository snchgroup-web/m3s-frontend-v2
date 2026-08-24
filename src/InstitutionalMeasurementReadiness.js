import React from 'react';
import { Calculator, FileCheck2, ListChecks, Target } from 'lucide-react';

const COPY = {
  FR: {
    title: 'Méthode de mesure commune', state: 'Calcul non autorisé',
    intro: 'Le taux ne pourra être calculé qu’après validation et versionnement des quatre composantes ci-dessous.',
    items: [
      { title: 'Périmètre cible', detail: 'Composantes attendues et limites explicites.', status: 'À valider' },
      { title: 'Tâches gouvernées', detail: 'Responsable, échéance et état vérifiable.', status: 'À structurer' },
      { title: 'Preuves recevables', detail: 'Critères d’acceptation et emplacement GED.', status: 'À valider' },
      { title: 'Règle de calcul', detail: 'Unité, pondération éventuelle et règle d’arrêt.', status: 'À arbitrer' }
    ],
    rule: 'Une étape documentée n’est pas automatiquement achevée. Administration suit les statuts ; la fonction responsable valide le résultat ; la Gouvernance autorise la méthode ; la GED conserve la preuve.'
  },
  EN: {
    title: 'Shared measurement method', state: 'Calculation not authorised',
    intro: 'A rate may only be calculated once the four components below have been validated and versioned.',
    items: [
      { title: 'Target scope', detail: 'Expected components and explicit boundaries.', status: 'To validate' },
      { title: 'Governed tasks', detail: 'Owner, due date and verifiable state.', status: 'To structure' },
      { title: 'Acceptable evidence', detail: 'Acceptance criteria and GED location.', status: 'To validate' },
      { title: 'Calculation rule', detail: 'Unit, optional weighting and stop rule.', status: 'To decide' }
    ],
    rule: 'A documented stage is not automatically complete. Administration tracks status; the responsible function validates the outcome; Governance authorises the method; GED retains evidence.'
  },
  DE: {
    title: 'Gemeinsame Messmethode', state: 'Berechnung nicht autorisiert',
    intro: 'Ein Fortschrittswert darf erst berechnet werden, wenn die vier folgenden Bestandteile validiert und versioniert sind.',
    items: [
      { title: 'Zielumfang', detail: 'Erwartete Bestandteile und klare Grenzen.', status: 'Zu validieren' },
      { title: 'Gesteuerte Aufgaben', detail: 'Verantwortung, Frist und prüfbarer Status.', status: 'Zu strukturieren' },
      { title: 'Zulässige Nachweise', detail: 'Abnahmekriterien und GED-Ablageort.', status: 'Zu validieren' },
      { title: 'Berechnungsregel', detail: 'Einheit, optionale Gewichtung und Abbruchregel.', status: 'Zu entscheiden' }
    ],
    rule: 'Eine dokumentierte Etappe ist nicht automatisch abgeschlossen. Administration verfolgt den Status; die zuständige Funktion validiert das Ergebnis; Governance autorisiert die Methode; die GED sichert den Nachweis.'
  }
};

const ICONS = [Target, ListChecks, FileCheck2, Calculator];

const InstitutionalMeasurementReadiness = ({ language = 'FR', headline, accent = 'blue' }) => {
  const t = COPY[language] || COPY.FR;
  const cyan = accent === 'cyan';
  const violet = accent === 'violet';
  const emerald = accent === 'emerald';
  const accentClasses = emerald
    ? 'border-emerald-700/60 bg-emerald-950/20 text-emerald-200'
    : violet
      ? 'border-violet-700/60 bg-violet-950/20 text-violet-200'
      : cyan
        ? 'border-cyan-700/60 bg-cyan-950/20 text-cyan-200'
        : 'border-blue-700/60 bg-blue-950/20 text-blue-200';
  const iconClasses = emerald ? 'text-emerald-300' : violet ? 'text-violet-300' : cyan ? 'text-cyan-300' : 'text-blue-300';

  return (
    <section className="mt-4 rounded-md border border-amber-800/60 bg-amber-950/15 p-3 sm:p-4" aria-label={t.title}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h5 className="text-sm font-semibold text-slate-100">{t.title}</h5>
          <p className="mt-1 text-sm font-semibold text-amber-200">{headline}</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">{t.intro}</p>
        </div>
        <span className="inline-flex min-h-8 shrink-0 items-center self-start rounded-md border border-amber-700/70 bg-amber-950/30 px-2.5 py-1 text-xs font-semibold text-amber-200">{t.state}</span>
      </div>

      <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {t.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title} className="min-w-0 border-l-2 border-slate-600 bg-slate-950/15 px-3 py-2.5">
              <div className="flex items-start gap-2">
                <Icon className={`mt-0.5 shrink-0 ${iconClasses}`} size={16} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-100">{index + 1}. {item.title}</p>
                  <p className="mt-1 text-xs leading-4 text-slate-300">{item.detail}</p>
                  <span className={`mt-2 inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${accentClasses}`}>{item.status}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 border-t border-amber-900/50 pt-3 text-xs leading-5 text-slate-300">{t.rule}</p>
    </section>
  );
};

export default InstitutionalMeasurementReadiness;
