import React from 'react';
import {
  Calculator,
  CheckSquare,
  FileSearch,
  ListChecks,
  Scale,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';
import InstitutionalConsolidationDecisionMatrix from './InstitutionalConsolidationDecisionMatrix';

const COPY = {
  FR: {
    eyebrow: 'REVUE HUMAINE INTÉGRÉE · CONSOLIDATION',
    title: 'Validation des CNS-01 à CNS-08 consignée avant toute mesure globale',
    status: '8 cadres de travail validés',
    body: 'Cette vue rassemble les huit cadres validés par Cheikh. Elle reste une couche de gouvernance distincte des résultats métier : la validation autorise les inventaires détaillés, mais ne transforme aucun cadrage en résultat acquis et ne calcule aucun taux de progression.',
    noMeasure: 'Progression indisponible · inventaires, preuves réelles, responsables nominatifs, règles de calcul et réserves restent à établir par domaine',
    gatesTitle: 'Quatre principes validés',
    gates: [
      ['Périmètre cible', 'Le cadre de chaque CNS fixe les inclusions, exclusions et dépendances à inventorier.'],
      ['Preuves recevables', 'Chaque résultat devra rester relié à des pièces, sources, dates, versions et critères d’acceptation.'],
      ['Responsabilités', 'La séparation entre production du fond, contrôle, validation, décision et conservation est retenue.'],
      ['Règle de calcul', 'Aucun taux ne sera affiché avant une règle versionnée couvrant dénominateur, statuts, indisponibilités et revue.']
    ],
    outputsTitle: 'Effets de la validation',
    outputs: [
      'Les huit cadres peuvent maintenant servir de base aux inventaires détaillés.',
      'Chaque CNS dispose d’une trace versionnée, d’une autorité, d’une date et de limites explicites.',
      'Les preuves manquantes, restreintes ou à contrôler demeurent visibles comme écarts.',
      'La mesure globale reste indisponible jusqu’à une règle de calcul distincte et prouvée.',
      'Toute évolution devra créer une nouvelle version sans effacer les décisions du 25-08-2026.'
    ],
    governanceTitle: 'Décision et responsabilités',
    governance: 'Les fonctions responsables valident leur fond métier. Administration prépare la grille et consolide les statuts. La GED conserve les preuves autorisées. Les membres fondateurs arbitrent la décision institutionnelle et toute délégation requise. Une absence de preuve reste un écart, jamais une validation implicite.',
    source: 'Sources de revue : Programme institutionnel global 2SG V0.2, matrice de cadrage V0.1, CNS-01 à CNS-08 publiés, Journal de bord et contexte Daily Intelligence V4. Statut : huit cadres de travail validés par Cheikh et consignés le 25-08-2026 ; aucune progression globale déclarée.'
  },
  EN: {
    eyebrow: 'INTEGRATED HUMAN REVIEW · CONSOLIDATION',
    title: 'CNS-01 through CNS-08 validation recorded before any global measurement',
    status: '8 working frameworks validated',
    body: 'This view brings together the eight frameworks validated by Cheikh. It remains a governance layer separate from business outcomes: validation authorises detailed inventories but turns no framework into an achieved result and calculates no progress rate.',
    noMeasure: 'Progress unavailable · inventories, real evidence, named owners, calculation rules and reservations remain to be established by domain',
    gatesTitle: 'Four validated principles',
    gates: [
      ['Target scope', 'Each CNS framework sets the inclusions, exclusions and dependencies to inventory.'],
      ['Acceptable evidence', 'Every outcome must remain connected to records, sources, dates, versions and acceptance criteria.'],
      ['Responsibilities', 'Separation between content production, control, validation, decision and retention is retained.'],
      ['Calculation rule', 'No rate will be displayed before a versioned rule covers denominator, statuses, unavailable states and review.']
    ],
    outputsTitle: 'Effects of validation',
    outputs: [
      'The eight frameworks can now serve as baselines for detailed inventories.',
      'Each CNS has a versioned record, authority, date and explicit limitations.',
      'Missing, restricted or pending evidence remains visible as gaps.',
      'Global measurement remains unavailable until a separate, evidenced calculation rule exists.',
      'Any change must create a new version without erasing the decisions dated 25-08-2026.'
    ],
    governanceTitle: 'Decision and responsibilities',
    governance: 'Responsible functions validate their business content. Administration prepares the grid and consolidates statuses. The DMS retains authorised evidence. Founding members decide the institutional outcome and any required delegation. Missing evidence remains a gap, never implicit validation.',
    source: 'Review sources: 2SG Global Institutional Programme V0.2, Framing Matrix V0.1, published CNS-01 through CNS-08, Work Log and Daily Intelligence V4 context. Status: eight working frameworks validated by Cheikh and recorded on 25-08-2026; no global progress declared.'
  },
  DE: {
    eyebrow: 'INTEGRIERTE MENSCHLICHE PRÜFUNG · KONSOLIDIERUNG',
    title: 'Validierung CNS-01 bis CNS-08 vor jeder Gesamtmessung dokumentiert',
    status: '8 Arbeitsrahmen validiert',
    body: 'Diese Ansicht führt die acht von Cheikh validierten Arbeitsrahmen zusammen. Sie bleibt eine von Fachergebnissen getrennte Governance-Schicht: Die Validierung erlaubt Detailinventare, macht aber aus keinem Rahmen ein erreichtes Ergebnis und berechnet keinen Fortschrittswert.',
    noMeasure: 'Fortschritt nicht verfügbar · Inventare, reale Nachweise, namentliche Verantwortungen, Berechnungsregeln und Vorbehalte sind je Domäne noch zu erstellen',
    gatesTitle: 'Vier validierte Grundsätze',
    gates: [
      ['Zielumfang', 'Der Rahmen jedes CNS legt die zu inventarisierenden Einschlüsse, Ausschlüsse und Abhängigkeiten fest.'],
      ['Zulässige Nachweise', 'Jedes Ergebnis muss mit Unterlagen, Quellen, Daten, Versionen und Annahmekriterien verbunden bleiben.'],
      ['Verantwortungen', 'Die Trennung von Fachinhalt, Kontrolle, Validierung, Entscheid und Aufbewahrung ist festgehalten.'],
      ['Berechnungsregel', 'Kein Wert wird angezeigt, bevor eine versionierte Regel Nenner, Status, Nichtverfügbarkeit und Prüfung abdeckt.']
    ],
    outputsTitle: 'Wirkungen der Validierung',
    outputs: [
      'Die acht Arbeitsrahmen können nun als Grundlage für Detailinventare dienen.',
      'Jedes CNS besitzt einen versionierten Nachweis mit Autorität, Datum und ausdrücklichen Grenzen.',
      'Fehlende, eingeschränkte oder noch zu prüfende Nachweise bleiben als Lücken sichtbar.',
      'Die Gesamtmessung bleibt ohne getrennte und belegte Berechnungsregel nicht verfügbar.',
      'Jede Änderung muss eine neue Version erzeugen, ohne die Entscheide vom 25.08.2026 zu löschen.'
    ],
    governanceTitle: 'Entscheid und Verantwortungen',
    governance: 'Die zuständigen Funktionen validieren ihren Fachinhalt. Administration bereitet die Prüfliste vor und konsolidiert Status. Die GED bewahrt autorisierte Nachweise. Die Gründungsmitglieder entscheiden institutionell und über nötige Delegationen. Fehlender Nachweis bleibt eine Lücke und wird nie zur stillschweigenden Validierung.',
    source: 'Prüfquellen: Globales institutionelles 2SG-Programm V0.2, Strukturierungsmatrix V0.1, veröffentlichte CNS-01 bis CNS-08, Arbeitsjournal und Daily-Intelligence-V4-Kontext. Status: acht Arbeitsrahmen von Cheikh validiert und am 25.08.2026 dokumentiert; kein Gesamtfortschritt erklärt.'
  }
};

const GATE_ICONS = [ListChecks, FileSearch, UsersRound, Calculator];

const InstitutionalConsolidationIntegratedReview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-consolidation-integrated-review';

  const openSection = targetId => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${targetId}`);
    document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
  };

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/25 px-3 py-2 text-xs font-semibold text-emerald-100"><Scale size={16} aria-hidden="true" />{t.status}</span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="violet" />

      <div className="mt-4">
        <div className="flex items-center gap-2"><ShieldCheck className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.gatesTitle}</h5></div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {t.gates.map(([title, body], index) => {
            const Icon = GATE_ICONS[index];
            return <article key={title} className="m3s-raised p-4"><Icon className="text-violet-300" size={18} aria-hidden="true" /><h6 className="mt-3 text-sm font-semibold text-slate-100">{title}</h6><p className="mt-2 text-sm leading-5 text-slate-300">{body}</p></article>;
          })}
        </div>
      </div>

      <InstitutionalConsolidationDecisionMatrix language={language} onOpen={openSection} />

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ListChecks className="text-emerald-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.outputsTitle}</h5></div><ul className="mt-3 space-y-2">{t.outputs.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckSquare className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><UsersRound className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.governanceTitle}</h5></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.governance}</p></article>
      </div>

      <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalConsolidationIntegratedReview;
