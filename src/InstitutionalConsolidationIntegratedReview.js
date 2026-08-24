import React from 'react';
import {
  ArrowRight,
  Calculator,
  CheckSquare,
  FileSearch,
  ListChecks,
  Scale,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const DOMAINS = [
  ['CNS-01', 'institutional-governance-compliance-consolidation-pilot'],
  ['CNS-02', 'institutional-processes-procedures-consolidation-pilot'],
  ['CNS-03', 'institutional-data-reference-systems-consolidation-pilot'],
  ['CNS-04', 'institutional-finance-controls-consolidation-pilot'],
  ['CNS-05', 'institutional-human-resources-capabilities-consolidation-pilot'],
  ['CNS-06', 'institutional-m3s-security-continuity-consolidation-pilot'],
  ['CNS-07', 'institutional-quality-lessons-consolidation-pilot'],
  ['CNS-08', 'institutional-reporting-consolidation-pilot']
];

const COPY = {
  FR: {
    eyebrow: 'REVUE HUMAINE INTÉGRÉE · CONSOLIDATION',
    title: 'Arbitrer CNS-01 à CNS-08 avant toute mesure globale',
    status: 'Décision d’avancement non prise',
    body: 'Cette vue rassemble les huit cadrages publiés afin de préparer une décision humaine commune. Elle reste une couche de revue distincte des domaines CNS, ne transforme pas un cadrage en résultat acquis et ne calcule aucun taux de progression.',
    noMeasure: 'Progression non calculable · périmètre, preuves, responsables, règles de calcul et réserves à confirmer en revue humaine',
    gatesTitle: 'Quatre portes à franchir',
    gates: [
      ['Périmètre cible', 'Confirmer les résultats attendus, inclusions, exclusions et dépendances de chaque CNS.'],
      ['Preuves recevables', 'Définir les pièces, sources, dates, versions, niveaux de confidentialité et critères d’acceptation.'],
      ['Responsabilités', 'Nommer producteur du fond, contrôleur, validateur, décideur et responsable de conservation.'],
      ['Règle de calcul', 'Valider unités, dénominateurs, poids éventuels, traitement des indisponibilités et fréquence de revue.']
    ],
    domainsTitle: 'Périmètre de la revue',
    domainStatus: 'Cadrage publié · revue à conduire',
    domains: [
      'Gouvernance & conformité',
      'Processus & procédures',
      'Données & référentiels',
      'Finances & contrôles',
      'Ressources humaines & capacités',
      'M3S, sécurité & continuité',
      'Qualité & retours d’expérience',
      'Reporting institutionnel'
    ],
    open: 'Revoir',
    outputsTitle: 'Résultats attendus de la revue',
    outputs: [
      'Périmètre cible et dépendances confirmés pour chacun des huit CNS.',
      'Index des preuves recevables, manquantes, restreintes ou à contrôler.',
      'Responsables et autorités de validation explicitement affectés.',
      'Règle de calcul versionnée, ou décision motivée de maintenir la mesure indisponible.',
      'Réserves, arbitrages et prochaine étape du Programme institutionnel global 2SG consignés.'
    ],
    governanceTitle: 'Décision et responsabilités',
    governance: 'Les fonctions responsables valident leur fond métier. Administration prépare la grille et consolide les statuts. La GED conserve les preuves autorisées. Les membres fondateurs arbitrent la décision institutionnelle et toute délégation requise. Une absence de preuve reste un écart, jamais une validation implicite.',
    source: 'Sources de revue : Programme institutionnel global 2SG V0.2, matrice de cadrage V0.1, CNS-01 à CNS-08 publiés, Journal de bord du 24.08.2026 et contexte Daily Intelligence V4. Statut : préparation de revue, sans validation globale ni progression chiffrée.'
  },
  EN: {
    eyebrow: 'INTEGRATED HUMAN REVIEW · CONSOLIDATION',
    title: 'Review CNS-01 through CNS-08 before any global measurement',
    status: 'Advancement decision not made',
    body: 'This view brings together the eight published frameworks to prepare a shared human decision. It remains a review layer separate from the CNS domains, does not turn framing into an achieved result and calculates no progress rate.',
    noMeasure: 'Progress cannot be calculated · scope, evidence, owners, calculation rules and reservations must be confirmed through human review',
    gatesTitle: 'Four gates to clear',
    gates: [
      ['Target scope', 'Confirm expected results, inclusions, exclusions and dependencies for each CNS.'],
      ['Acceptable evidence', 'Define records, sources, dates, versions, confidentiality levels and acceptance criteria.'],
      ['Responsibilities', 'Name the content producer, controller, reviewer, decision-maker and retention owner.'],
      ['Calculation rule', 'Validate units, denominators, possible weights, unavailable-state treatment and review frequency.']
    ],
    domainsTitle: 'Review scope',
    domainStatus: 'Framework published · review to conduct',
    domains: [
      'Governance & compliance',
      'Processes & procedures',
      'Data & reference systems',
      'Finance & controls',
      'Human resources & capabilities',
      'M3S, security & continuity',
      'Quality & lessons learned',
      'Institutional reporting'
    ],
    open: 'Review',
    outputsTitle: 'Expected review outputs',
    outputs: [
      'Target scope and dependencies confirmed for each of the eight CNS domains.',
      'Index of acceptable, missing, restricted or pending evidence.',
      'Owners and validation authorities explicitly assigned.',
      'Versioned calculation rule, or a reasoned decision to keep measurement unavailable.',
      'Reservations, decisions and the next step for the 2SG Global Institutional Programme recorded.'
    ],
    governanceTitle: 'Decision and responsibilities',
    governance: 'Responsible functions validate their business content. Administration prepares the grid and consolidates statuses. The DMS retains authorised evidence. Founding members decide the institutional outcome and any required delegation. Missing evidence remains a gap, never implicit validation.',
    source: 'Review sources: 2SG Global Institutional Programme V0.2, Framing Matrix V0.1, published CNS-01 through CNS-08, Work Log dated 24 Aug 2026 and Daily Intelligence V4 context. Status: review preparation, without global validation or quantified progress.'
  },
  DE: {
    eyebrow: 'INTEGRIERTE MENSCHLICHE PRÜFUNG · KONSOLIDIERUNG',
    title: 'CNS-01 bis CNS-08 vor jeder Gesamtmessung prüfen',
    status: 'Fortschrittsentscheid nicht getroffen',
    body: 'Diese Ansicht führt die acht veröffentlichten Strukturierungen zusammen, um einen gemeinsamen menschlichen Entscheid vorzubereiten. Sie bleibt eine von den CNS-Domänen getrennte Prüfschicht, macht aus Strukturierung kein erreichtes Ergebnis und berechnet keinen Fortschrittswert.',
    noMeasure: 'Fortschritt nicht berechenbar · Umfang, Nachweise, Verantwortungen, Berechnungsregeln und Vorbehalte sind in menschlicher Prüfung zu bestätigen',
    gatesTitle: 'Vier zu erfüllende Prüftore',
    gates: [
      ['Zielumfang', 'Erwartete Ergebnisse, Einschlüsse, Ausschlüsse und Abhängigkeiten jedes CNS bestätigen.'],
      ['Zulässige Nachweise', 'Unterlagen, Quellen, Daten, Versionen, Vertraulichkeitsstufen und Annahmekriterien definieren.'],
      ['Verantwortungen', 'Fachverantwortung, Kontrolle, Validierung, Entscheid und Aufbewahrung zuweisen.'],
      ['Berechnungsregel', 'Einheiten, Nenner, mögliche Gewichte, Behandlung nicht verfügbarer Werte und Prüffrequenz validieren.']
    ],
    domainsTitle: 'Prüfumfang',
    domainStatus: 'Strukturierung veröffentlicht · Prüfung durchzuführen',
    domains: [
      'Governance & Compliance',
      'Prozesse & Verfahren',
      'Daten & Referenzsysteme',
      'Finanzen & Kontrollen',
      'Personal & Kapazitäten',
      'M3S, Sicherheit & Kontinuität',
      'Qualität & Erfahrungsrückfluss',
      'Institutionelles Reporting'
    ],
    open: 'Prüfen',
    outputsTitle: 'Erwartete Prüfergebnisse',
    outputs: [
      'Zielumfang und Abhängigkeiten für alle acht CNS bestätigt.',
      'Index zulässiger, fehlender, eingeschränkter oder noch zu prüfender Nachweise.',
      'Verantwortungen und Validierungsbefugnisse ausdrücklich zugewiesen.',
      'Versionierte Berechnungsregel oder begründeter Entscheid, die Messung nicht verfügbar zu lassen.',
      'Vorbehalte, Entscheide und nächster Schritt des globalen institutionellen 2SG-Programms protokolliert.'
    ],
    governanceTitle: 'Entscheid und Verantwortungen',
    governance: 'Die zuständigen Funktionen validieren ihren Fachinhalt. Administration bereitet die Prüfliste vor und konsolidiert Status. Die GED bewahrt autorisierte Nachweise. Die Gründungsmitglieder entscheiden institutionell und über nötige Delegationen. Fehlender Nachweis bleibt eine Lücke und wird nie zur stillschweigenden Validierung.',
    source: 'Prüfquellen: Globales institutionelles 2SG-Programm V0.2, Strukturierungsmatrix V0.1, veröffentlichte CNS-01 bis CNS-08, Arbeitsjournal vom 24.08.2026 und Daily-Intelligence-V4-Kontext. Status: Prüfungsvorbereitung ohne Gesamtvalidierung oder quantifizierten Fortschritt.'
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
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-amber-700/70 bg-amber-950/25 px-3 py-2 text-xs font-semibold text-amber-100"><Scale size={16} aria-hidden="true" />{t.status}</span>
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

      <div className="mt-5 border-t border-slate-700 pt-4">
        <div className="flex items-center gap-2"><CheckSquare className="text-sky-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.domainsTitle}</h5></div>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {DOMAINS.map(([code, targetId], index) => (
            <button key={code} type="button" onClick={() => openSection(targetId)} className="group min-h-20 rounded-md border border-slate-600 bg-slate-950/15 p-3 text-left transition hover:border-sky-400 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500">
              <span className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-100">{code} · {t.domains[index]}</span><ArrowRight className="shrink-0 text-sky-300 transition group-hover:translate-x-0.5" size={16} aria-hidden="true" /></span>
              <span className="mt-2 block text-xs leading-4 text-slate-400">{t.domainStatus} · {t.open}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><ListChecks className="text-emerald-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.outputsTitle}</h5></div><ul className="mt-3 space-y-2">{t.outputs.map(item => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300"><CheckSquare className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul></article>
        <article className="m3s-raised p-4"><div className="flex items-center gap-2"><UsersRound className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.governanceTitle}</h5></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.governance}</p></article>
      </div>

      <p className="mt-4 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400">{t.source}</p>
    </section>
  );
};

export default InstitutionalConsolidationIntegratedReview;
