import React from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, Scale, ShieldCheck, Users } from 'lucide-react';
import { LEGAL_DOCUMENTARY_BASELINE, LEGAL_DOCUMENTARY_STAGES } from './legalDocumentaryProgress';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-01 · LEGAL',
    status: 'Cadrage piloté',
    body: 'Constituer, qualifier, faire valider puis conserver le socle légal et réglementaire applicable à la structure hybride 2SG.',
    noMeasure: 'Progression non calculable · périmètre cible, tâches et preuves à valider',
    currentStage: 'Étape actuelle',
    currentStageName: 'Applicabilité à qualifier',
    stages: ['Inventaire', 'Applicabilité', 'Rédaction', 'Relecture', 'Validation', 'Adoption / publication'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Maintenir l’inventaire gouverné des documents et obligations.',
      'Qualifier l’applicabilité selon la structure, le territoire et l’usage.',
      'Préparer ou réviser les pièces manquantes sans les présenter comme adoptées.',
      'Obtenir les validations, signatures ou décisions humaines requises.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Inventaire daté, versionné et relié aux sources maîtresses.',
      'Source officielle et décision d’applicabilité pour chaque obligation.',
      'Preuve distincte de relecture, validation, signature ou adoption.',
      'Classement GED avec sensibilité et droits d’accès appropriés.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Ne jamais confondre brouillon, validation sur le fond, signature et adoption. Les conclusions juridiques et les pièces restreintes restent dans les espaces autorisés.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Administration coordonne et relance ; la Gouvernance décide et adopte ; la fonction ou le conseil compétent qualifie le fond ; la GED conserve les preuves.',
    source: 'Source de pilotage : inventaire documentaire gouverné et synthèse autorisée de Conformité.',
    open: 'Ouvrir l’avancement LEGAL'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-01 · LEGAL',
    status: 'Governed framing',
    body: 'Establish, qualify, validate and retain the legal and regulatory foundation applicable to the 2SG hybrid structure.',
    noMeasure: 'Progress cannot be calculated · target scope, tasks and evidence require validation',
    currentStage: 'Current stage',
    currentStageName: 'Applicability to qualify',
    stages: ['Inventory', 'Applicability', 'Drafting', 'Review', 'Validation', 'Adoption / publication'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Maintain the governed inventory of documents and obligations.',
      'Qualify applicability according to structure, territory and use.',
      'Prepare or revise missing documents without presenting them as adopted.',
      'Obtain the required human validations, signatures or decisions.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'A dated, versioned inventory linked to governing sources.',
      'Official source and applicability decision for each obligation.',
      'Separate evidence of review, validation, signature or adoption.',
      'GED filing with appropriate sensitivity and access rights.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'Never conflate draft, substantive validation, signature and adoption. Legal conclusions and restricted documents remain in authorised spaces.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Administration coordinates and follows up; Governance decides and adopts; the competent function or adviser qualifies substance; GED retains evidence.',
    source: 'Steering source: governed document inventory and authorised Compliance summary.',
    open: 'Open LEGAL progress'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-01 · LEGAL',
    status: 'Gesteuerte Strukturierung',
    body: 'Die für die hybride 2SG-Struktur anwendbare rechtliche und regulatorische Grundlage erfassen, qualifizieren, validieren und sichern.',
    noMeasure: 'Fortschritt nicht berechenbar · Zielumfang, Aufgaben und Nachweise sind zu validieren',
    currentStage: 'Aktuelle Etappe',
    currentStageName: 'Anwendbarkeit zu qualifizieren',
    stages: ['Inventar', 'Anwendbarkeit', 'Entwurf', 'Prüfung', 'Validierung', 'Verabschiedung / Veröffentlichung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Das gesteuerte Inventar der Dokumente und Pflichten pflegen.',
      'Die Anwendbarkeit nach Struktur, Gebiet und Nutzung qualifizieren.',
      'Fehlende Unterlagen vorbereiten oder überarbeiten, ohne sie als verabschiedet darzustellen.',
      'Erforderliche menschliche Validierungen, Unterschriften oder Entscheidungen einholen.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Datiertes, versioniertes Inventar mit Verknüpfung zu den Leitquellen.',
      'Offizielle Quelle und Anwendbarkeitsentscheidung für jede Pflicht.',
      'Getrennter Nachweis für Prüfung, Validierung, Unterschrift oder Verabschiedung.',
      'GED-Ablage mit angemessener Vertraulichkeit und Zugriffsrechten.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Entwurf, inhaltliche Validierung, Unterschrift und Verabschiedung dürfen nie gleichgesetzt werden. Rechtliche Schlussfolgerungen und eingeschränkte Unterlagen bleiben in autorisierten Bereichen.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Administration koordiniert und verfolgt nach; Governance entscheidet und verabschiedet; zuständige Fachfunktion oder Beratung qualifiziert den Inhalt; die GED sichert die Nachweise.',
    source: 'Steuerungsquelle: gesteuertes Dokumenteninventar und autorisierte Compliance-Zusammenfassung.',
    open: 'LEGAL-Fortschritt öffnen'
  }
};

const ListBlock = ({ icon: Icon, title, items, accent }) => (
  <article className="m3s-raised p-4">
    <div className="flex items-center gap-2">
      <Icon className={accent} size={18} aria-hidden="true" />
      <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
    </div>
    <ul className="mt-3 space-y-2">
      {items.map(item => (
        <li key={item} className="flex gap-2 text-sm leading-5 text-slate-300">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={15} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

const InstitutionalLegalPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-legal-pilot" className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby="institutional-legal-pilot-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p>
          <h4 id="institutional-legal-pilot-title" className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-emerald-700/70 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-200">
          <ShieldCheck size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="blue" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-blue-700/70 bg-blue-950/35 px-2.5 py-1 font-semibold text-blue-200">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {LEGAL_DOCUMENTARY_STAGES.map((stage, index) => {
            const current = index === LEGAL_DOCUMENTARY_BASELINE.currentStageIndex;
            const complete = index < LEGAL_DOCUMENTARY_BASELINE.currentStageIndex;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-blue-500 bg-blue-950/40 text-blue-100' : complete ? 'border-emerald-800/70 bg-emerald-950/20 text-emerald-200' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={Scale} title={t.tasksTitle} items={t.tasks} accent="text-blue-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><Users className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <button type="button" onClick={() => onNavigate('/administration?tab=compliance&returnTo=dashboard&dashboardView=program#compliance-progress')} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {t.open}<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default InstitutionalLegalPilot;
