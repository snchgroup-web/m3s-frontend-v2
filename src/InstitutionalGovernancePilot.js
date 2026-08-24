import React from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, FileKey2, Gavel, KeyRound, Network, Users } from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const GOVERNANCE_STAGES = [
  'principles',
  'people',
  'mandates',
  'decisions',
  'access',
  'review'
];

const CURRENT_STAGE_INDEX = 2;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-02 · Gouvernance',
    status: 'Cadrage opérationnel établi',
    body: 'Rendre explicites les organes, rôles, mandats, décisions, délégations et droits nécessaires au fonctionnement horizontal de 2SG.',
    noMeasure: 'Progression non calculable · mandats, règles décisionnelles, preuves et méthode de mesure à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Mandats et délégations à confirmer',
    stages: ['Principes', 'Personnes & fonctions', 'Mandats & délégations', 'Règles de décision', 'Droits M3S', 'Revue périodique'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Maintenir le registre des organes, membres, équipes et responsabilités fonctionnelles.',
      'Distinguer puis faire confirmer fonction, mandat juridique, délégation et pouvoir de signature.',
      'Valider la RACI, les circuits d’approbation et les seuils sans inventer de montant.',
      'Raccorder les droits M3S à la classification, au besoin d’en connaître et aux revues périodiques.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Statuts, procès-verbaux, acceptations ou décisions institutionnelles dans leur version applicable.',
      'Matrice des profils et fiches de fonction datées, versionnées et validées.',
      'Mandats, délégations, décisions et exceptions avec objet, durée, limites et autorité.',
      'Registre des accès M3S et journal d’audit reliés aux validations correspondantes.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Le Bureau reste horizontal entre membres fondateurs et associés. Statut de membre, fonction, mandat juridique et droit M3S sont quatre notions distinctes. Une responsabilité locale ou métier ne crée pas un pouvoir général implicite.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Les fondateurs approuvent le cadre institutionnel et les habilitations sensibles ; chaque responsable porte son périmètre métier ; Administration tient les registres ; IT applique les droits autorisés ; la GED conserve les preuves.',
    source: 'Sources de pilotage : vue Institution, matrice des profils V0.3, fiches de fonction V0.2, proposition RACI et cadre décisionnel V0.1. Les mandats actuels et seuils restent à confirmer.',
    open: 'Ouvrir Gouvernance & équipe'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-02 · Governance',
    status: 'Operational framing established',
    body: 'Make explicit the bodies, roles, mandates, decisions, delegations and rights required for 2SG horizontal governance.',
    noMeasure: 'Progress cannot be calculated · mandates, decision rules, evidence and measurement method require validation',
    currentStage: 'Current work point',
    currentStageName: 'Mandates and delegations to confirm',
    stages: ['Principles', 'People & functions', 'Mandates & delegations', 'Decision rules', 'M3S rights', 'Periodic review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Maintain the register of bodies, members, teams and functional responsibilities.',
      'Separate and confirm function, legal mandate, delegation and signing authority.',
      'Validate the RACI, approval paths and thresholds without inventing amounts.',
      'Connect M3S rights to classification, need-to-know and periodic reviews.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Statutes, minutes, acceptances or institutional decisions in their applicable version.',
      'Dated, versioned and validated profile matrix and function sheets.',
      'Mandates, delegations, decisions and exceptions with purpose, duration, limits and authority.',
      'M3S access register and audit log linked to the corresponding approvals.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'The Bureau remains horizontal across founding and associate members. Membership status, function, legal mandate and M3S right are four separate concepts. A local or business responsibility creates no implicit general authority.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Founders approve the institutional framework and sensitive authorisations; each lead owns their business scope; Administration maintains registers; IT applies authorised rights; GED retains evidence.',
    source: 'Steering sources: Institution view, profile matrix V0.3, function sheets V0.2, proposed RACI and decision framework V0.1. Current mandates and thresholds remain to be confirmed.',
    open: 'Open Governance & team'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-02 · Governance',
    status: 'Operativer Rahmen festgelegt',
    body: 'Organe, Rollen, Mandate, Entscheidungen, Delegationen und Rechte für die horizontale Governance von 2SG ausdrücklich festlegen.',
    noMeasure: 'Fortschritt nicht berechenbar · Mandate, Entscheidungsregeln, Nachweise und Messmethode sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Mandate und Delegationen zu bestätigen',
    stages: ['Grundsätze', 'Personen & Funktionen', 'Mandate & Delegationen', 'Entscheidungsregeln', 'M3S-Rechte', 'Regelmäßige Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Das Register der Organe, Mitglieder, Teams und funktionalen Verantwortungen pflegen.',
      'Funktion, Rechtsmandat, Delegation und Zeichnungsbefugnis trennen und bestätigen lassen.',
      'RACI, Genehmigungswege und Schwellen ohne erfundene Beträge validieren.',
      'M3S-Rechte mit Klassifizierung, Kenntnisbedarf und regelmäßigen Prüfungen verbinden.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Statuten, Protokolle, Annahmeerklärungen oder institutionelle Entscheidungen in der anwendbaren Fassung.',
      'Datierte, versionierte und validierte Profilmatrix und Funktionsblätter.',
      'Mandate, Delegationen, Entscheidungen und Ausnahmen mit Zweck, Dauer, Grenzen und Autorität.',
      'M3S-Zugriffsregister und Auditprotokoll mit Verknüpfung zu den entsprechenden Genehmigungen.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Der Vorstand bleibt zwischen Gründungsmitgliedern und assoziierten Mitgliedern horizontal. Mitgliedsstatus, Funktion, Rechtsmandat und M3S-Recht sind vier getrennte Begriffe. Eine lokale oder fachliche Verantwortung schafft keine implizite allgemeine Befugnis.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Die Gründungsmitglieder genehmigen den institutionellen Rahmen und sensible Berechtigungen; jede verantwortliche Person trägt ihren Fachbereich; Administration führt die Register; IT setzt autorisierte Rechte um; die GED bewahrt Nachweise.',
    source: 'Steuerungsquellen: Institutionsansicht, Profilmatrix V0.3, Funktionsblätter V0.2, vorgeschlagene RACI und Entscheidungsrahmen V0.1. Aktuelle Mandate und Schwellen sind noch zu bestätigen.',
    open: 'Governance & Team öffnen'
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

const InstitutionalGovernancePilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-governance-pilot" className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby="institutional-governance-pilot-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 id="institutional-governance-pilot-title" className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-cyan-700/70 bg-cyan-950/30 px-3 py-2 text-xs font-semibold text-cyan-200">
          <Network size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="cyan" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-cyan-700/70 bg-cyan-950/35 px-2.5 py-1 font-semibold text-cyan-200">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {GOVERNANCE_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            const documented = index < CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-cyan-500 bg-cyan-950/40 text-cyan-100' : documented ? 'border-emerald-800/70 bg-emerald-950/20 text-emerald-200' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={Gavel} title={t.tasksTitle} items={t.tasks} accent="text-cyan-300" />
        <ListBlock icon={FileKey2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><KeyRound className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><Users className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <button type="button" onClick={() => onNavigate('/administration?tab=institution&section=institution-governance&returnTo=dashboard&dashboardView=program#institution-governance')} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <ClipboardCheck size={16} aria-hidden="true" />{t.open}<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default InstitutionalGovernancePilot;
