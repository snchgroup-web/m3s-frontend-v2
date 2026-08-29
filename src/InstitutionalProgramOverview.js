import React, { useEffect } from 'react';
import { Activity, ArrowLeft, Briefcase, Building2, Network, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import InstitutionalLegalPilot from './InstitutionalLegalPilot';
import InstitutionalGovernancePilot from './InstitutionalGovernancePilot';
import InstitutionalDigitalInfrastructurePilot from './InstitutionalDigitalInfrastructurePilot';
import InstitutionalInitialFundingPilot from './InstitutionalInitialFundingPilot';
import InstitutionalAdministrativeMaterialInstallationPilot from './InstitutionalAdministrativeMaterialInstallationPilot';
import InstitutionalIdentityCommunicationPilot from './InstitutionalIdentityCommunicationPilot';
import InstitutionalOperationalLaunchPilot from './InstitutionalOperationalLaunchPilot';
import InstitutionalGovernanceComplianceConsolidationPilot from './InstitutionalGovernanceComplianceConsolidationPilot';
import InstitutionalProcessesProceduresConsolidationPilot from './InstitutionalProcessesProceduresConsolidationPilot';
import InstitutionalDataReferenceSystemsConsolidationPilot from './InstitutionalDataReferenceSystemsConsolidationPilot';
import InstitutionalFinanceControlsConsolidationPilot from './InstitutionalFinanceControlsConsolidationPilot';
import InstitutionalHumanResourcesCapabilitiesConsolidationPilot from './InstitutionalHumanResourcesCapabilitiesConsolidationPilot';
import InstitutionalM3SSecurityContinuityConsolidationPilot from './InstitutionalM3SSecurityContinuityConsolidationPilot';
import InstitutionalQualityLessonsConsolidationPilot from './InstitutionalQualityLessonsConsolidationPilot';
import InstitutionalReportingConsolidationPilot from './InstitutionalReportingConsolidationPilot';
import InstitutionalConsolidationIntegratedReview from './InstitutionalConsolidationIntegratedReview';
import InstitutionalPeopleTeamsGateG1PostAuthorisationReassessment from './InstitutionalPeopleTeamsGateG1PostAuthorisationReassessment';
import InstitutionalPeopleTeamsGateG1PostAuthorisationReassessmentConfirmation from './InstitutionalPeopleTeamsGateG1PostAuthorisationReassessmentConfirmation';
import InstitutionalPeopleTeamsGateG1SyntheticWaveCandidate from './InstitutionalPeopleTeamsGateG1SyntheticWaveCandidate';

const translations = {
  FR: {
    eyebrow: 'PROGRAMME INSTITUTIONNEL GLOBAL 2SG',
    title: 'De l’idée à une institution durable',
    body: 'Cette lecture présente la structure institutionnelle validée. Elle prépare le futur registre de progression sans remplacer les documents directeurs, les preuves ou les décisions humaines.',
    readOnly: 'Lecture seule',
    sourceStatus: 'Structure générale validée · composantes et mesure à affiner',
    institution: '2SG · Institution porteuse',
    institutionBody: '2SG porte la mission, la gouvernance, les actifs, les activités, les projets et les offres.',
    cycles: {
      implantation: {
        title: 'Cycle institutionnel · Implantation',
        body: 'Concevoir l’idée institutionnelle puis la rendre opérationnelle.',
        steps: [
          ['Conception', 'Préparer les porteurs, bâtir et formaliser une idée cohérente et réalisable.', '6 composantes cadrées'],
          ['Mise en place', 'Installer la structure hybride et rendre ses premiers moyens opérationnels.', '7 composantes cadrées']
        ]
      },
      development: {
        title: 'Cycle institutionnel · Développement',
        body: 'Stabiliser ce qui a été implanté puis développer son usage et son impact.',
        steps: [
          ['Consolidation', 'Contrôler, corriger, documenter, sécuriser et stabiliser.', '8 composantes cadrées'],
          ['Dynamisation', 'Animer, faire adopter, étendre et optimiser de manière maîtrisée.', '8 composantes cadrées']
        ]
      }
    },
    system: 'M3S · Système interne transversal de management',
    systemBody: 'M3S aide 2SG à piloter, organiser, documenter, contrôler et capitaliser. Il soutient l’institution sans constituer une institution parallèle ni un niveau stratégique équivalent.',
    measurement: 'Mesure gouvernée',
    measurementBody: 'Aucun pourcentage n’est affiché tant que le périmètre cible, les tâches, les preuves et les éventuels poids ne sont pas validés.',
    source: 'Sources de cadrage',
    sourceModel: 'Modèle du Programme institutionnel global V0.2 · 23.08.2026',
    sourceMatrix: 'Matrice de cadrage V0.1 · 29 composantes',
    openResources: 'Voir les ressources',
    openArchitecture: 'Voir l’architecture',
    focusedEyebrow: 'ARBITRAGE COURANT · REF-01 · WAV-003',
    focusedTitle: 'REV-004 confirmée · Vague technique à arbitrer',
    focusedBody: 'Cette vue légère présente la réévaluation confirmée, sa décision et le candidat WAV-003 sans charger tout l’historique du Programme institutionnel.',
    openFullProgram: 'Ouvrir le programme complet',
    returnToFocusedReview: 'Retour à l’arbitrage REV-004'
  },
  EN: {
    eyebrow: '2SG GLOBAL INSTITUTIONAL PROGRAMME',
    title: 'From an idea to a sustainable institution',
    body: 'This view presents the validated institutional structure. It prepares the future progress register without replacing governing documents, evidence or human decisions.',
    readOnly: 'Read only',
    sourceStatus: 'Overall structure validated · components and measurement to refine',
    institution: '2SG · Sponsoring institution',
    institutionBody: '2SG carries the mission, governance, assets, activities, projects and offers.',
    cycles: {
      implantation: {
        title: 'Institutional cycle · Establishment',
        body: 'Design the institutional idea and then make it operational.',
        steps: [
          ['Design', 'Prepare the founders, build and formalise a coherent and feasible idea.', '6 framed components'],
          ['Implementation', 'Install the hybrid structure and make its initial resources operational.', '7 framed components']
        ]
      },
      development: {
        title: 'Institutional cycle · Development',
        body: 'Stabilise what has been established, then develop its use and impact.',
        steps: [
          ['Consolidation', 'Control, correct, document, secure and stabilise.', '8 framed components'],
          ['Dynamisation', 'Mobilise, foster adoption, expand and optimise in a controlled way.', '8 framed components']
        ]
      }
    },
    system: 'M3S · Cross-functional internal management system',
    systemBody: 'M3S helps 2SG steer, organise, document, control and retain knowledge. It supports the institution without becoming a parallel institution or an equivalent strategic level.',
    measurement: 'Governed measurement',
    measurementBody: 'No percentage is displayed until the target scope, tasks, evidence and any weights have been validated.',
    source: 'Framing sources',
    sourceModel: 'Global Institutional Programme model V0.2 · 23 Aug 2026',
    sourceMatrix: 'Framing matrix V0.1 · 29 components',
    openResources: 'View resources',
    openArchitecture: 'View architecture',
    focusedEyebrow: 'CURRENT DECISION · REF-01 · WAV-003',
    focusedTitle: 'REV-004 confirmed · Technical wave to decide',
    focusedBody: 'This lightweight view presents the confirmed reassessment, its decision and candidate WAV-003 without loading the full Institutional Programme history.',
    openFullProgram: 'Open the full programme',
    returnToFocusedReview: 'Back to the REV-004 decision'
  },
  DE: {
    eyebrow: 'GLOBALES INSTITUTIONELLES 2SG-PROGRAMM',
    title: 'Von der Idee zu einer nachhaltigen Institution',
    body: 'Diese Ansicht zeigt die validierte institutionelle Struktur. Sie bereitet das künftige Fortschrittsregister vor, ohne Leitdokumente, Nachweise oder menschliche Entscheidungen zu ersetzen.',
    readOnly: 'Nur Lesen',
    sourceStatus: 'Gesamtstruktur validiert · Komponenten und Messung zu präzisieren',
    institution: '2SG · Trägerinstitution',
    institutionBody: '2SG trägt Mission, Governance, Vermögenswerte, Aktivitäten, Projekte und Angebote.',
    cycles: {
      implantation: {
        title: 'Institutioneller Zyklus · Aufbau',
        body: 'Die institutionelle Idee konzipieren und anschließend funktionsfähig machen.',
        steps: [
          ['Konzeption', 'Die Träger vorbereiten und eine kohärente, realisierbare Idee ausarbeiten.', '6 strukturierte Komponenten'],
          ['Umsetzung', 'Die hybride Struktur einrichten und ihre ersten Mittel funktionsfähig machen.', '7 strukturierte Komponenten']
        ]
      },
      development: {
        title: 'Institutioneller Zyklus · Entwicklung',
        body: 'Das Aufgebaute stabilisieren und anschließend Nutzung und Wirkung entwickeln.',
        steps: [
          ['Konsolidierung', 'Kontrollieren, korrigieren, dokumentieren, absichern und stabilisieren.', '8 strukturierte Komponenten'],
          ['Dynamisierung', 'Aktivieren, Nutzung fördern, erweitern und kontrolliert optimieren.', '8 strukturierte Komponenten']
        ]
      }
    },
    system: 'M3S · Internes funktionsübergreifendes Managementsystem',
    systemBody: 'M3S hilft 2SG beim Steuern, Organisieren, Dokumentieren, Kontrollieren und Sichern von Wissen. Es unterstützt die Institution, ohne eine parallele Institution oder eine gleichwertige strategische Ebene zu bilden.',
    measurement: 'Governance-konforme Messung',
    measurementBody: 'Es wird kein Prozentsatz angezeigt, solange Zielumfang, Aufgaben, Nachweise und mögliche Gewichtungen nicht validiert sind.',
    source: 'Strukturierungsquellen',
    sourceModel: 'Modell des globalen institutionellen Programms V0.2 · 23.08.2026',
    sourceMatrix: 'Strukturierungsmatrix V0.1 · 29 Komponenten',
    openResources: 'Ressourcen anzeigen',
    openArchitecture: 'Architektur anzeigen',
    focusedEyebrow: 'AKTUELLER ENTSCHEID · REF-01 · WAV-003',
    focusedTitle: 'REV-004 bestätigt · Technische Welle zu entscheiden',
    focusedBody: 'Diese leichte Ansicht zeigt die bestätigte Neubewertung, ihren Entscheid und den Kandidaten WAV-003, ohne die gesamte Historie des institutionellen Programms zu laden.',
    openFullProgram: 'Vollständiges Programm öffnen',
    returnToFocusedReview: 'Zurück zum REV-004-Entscheid'
  }
};

const cyclePresentation = {
  implantation: { icon: Building2, accent: 'text-cyan-300', surface: 'bg-cyan-950/25', border: 'border-cyan-800/70' },
  development: { icon: TrendingUp, accent: 'text-emerald-300', surface: 'bg-emerald-950/25', border: 'border-emerald-800/70' }
};

const InstitutionalProgramOverview = ({ language = 'FR', focus = '', returnTo = '', onSelectView, onNavigate }) => {
  const t = translations[language] || translations.FR;
  const focusedReview = focus === 'ref01-rev004';
  const canReturnToFocusedReview = returnTo === 'ref01-rev004';

  useEffect(() => {
    const sectionId = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!sectionId.startsWith('institutional-')) return;
    const section = document.getElementById(sectionId);
    if (typeof section?.scrollIntoView === 'function') section.scrollIntoView({ block: 'start' });
  }, [language]);

  if (focusedReview) {
    return (
      <div className="institutional-program-view m3s-business-module m3s-design-scope mt-5 space-y-4">
        <header className="m3s-panel p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase text-blue-300">{t.focusedEyebrow}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">{t.focusedTitle}</h3>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">{t.focusedBody}</p>
          <a href="/?view=program&returnTo=ref01-rev004#institutional-ref01-g1-rev-004" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {t.openFullProgram}
          </a>
        </header>
        <InstitutionalPeopleTeamsGateG1PostAuthorisationReassessment language={language} />
        <InstitutionalPeopleTeamsGateG1PostAuthorisationReassessmentConfirmation language={language} />
        <InstitutionalPeopleTeamsGateG1SyntheticWaveCandidate language={language} />
      </div>
    );
  }

  return (
    <div className="institutional-program-view m3s-business-module m3s-design-scope mt-5 space-y-4">
      <header className="m3s-panel p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase text-blue-300">{t.eyebrow}</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-100 sm:text-2xl">{t.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
          </div>
          <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-blue-700/70 bg-blue-950/30 px-3 py-2 text-xs font-semibold text-blue-200">
            <ShieldCheck size={16} aria-hidden="true" />{t.readOnly}
          </span>
        </div>
        <p className="mt-4 rounded-md border border-amber-800/60 bg-amber-950/20 px-3 py-2 text-sm text-amber-200">{t.sourceStatus}</p>
        {canReturnToFocusedReview && (
          <a href="/?view=program&focus=ref01-rev004" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-blue-700 bg-blue-950/35 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:border-blue-400 hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto">
            <ArrowLeft size={17} aria-hidden="true" />{t.returnToFocusedReview}
          </a>
        )}
      </header>

      <section className="institutional-program-root m3s-panel p-4 sm:p-5" aria-labelledby="institutional-program-root-title">
        <div className="mx-auto flex max-w-xl items-center gap-3 rounded-md border border-blue-700/70 bg-blue-950/25 p-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-950/50 text-blue-300">
            <Target size={23} aria-hidden="true" />
          </span>
          <div>
            <h4 id="institutional-program-root-title" className="text-base font-semibold text-slate-100">{t.institution}</h4>
            <p className="mt-1 text-sm leading-5 text-slate-300">{t.institutionBody}</p>
          </div>
        </div>

        <div className="mx-auto h-6 w-px bg-blue-700/70" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {Object.entries(t.cycles).map(([cycleId, cycle]) => {
            const presentation = cyclePresentation[cycleId];
            const CycleIcon = presentation.icon;
            return (
              <article key={cycleId} className={`rounded-md border p-4 ${presentation.border} ${presentation.surface}`}>
                <div className="flex items-start gap-3">
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-900/40 ${presentation.accent}`}>
                    <CycleIcon size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-slate-100">{cycle.title}</h4>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{cycle.body}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cycle.steps.map(([title, body, count], index) => (
                    <div key={title} className="m3s-raised min-h-[142px] p-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-950/40 text-xs font-semibold text-blue-300">{index + 1}</span>
                        <h5 className="text-sm font-semibold text-slate-100">{title}</h5>
                      </div>
                      <p className="mt-2 text-sm leading-5 text-slate-300">{body}</p>
                      <p className="mt-3 text-xs font-semibold text-blue-300">{count}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="m3s-panel p-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-violet-950/35 text-violet-300">
              <Network size={21} aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-base font-semibold text-slate-100">{t.system}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-300">{t.systemBody}</p>
            </div>
          </div>
        </article>
        <article className="m3s-panel p-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-950/35 text-amber-300">
              <Activity size={21} aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-base font-semibold text-slate-100">{t.measurement}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-300">{t.measurementBody}</p>
            </div>
          </div>
        </article>
      </section>

      <InstitutionalLegalPilot language={language} onNavigate={onNavigate} />
      <InstitutionalGovernancePilot language={language} onNavigate={onNavigate} />
      <InstitutionalDigitalInfrastructurePilot language={language} onNavigate={onNavigate} />
      <InstitutionalInitialFundingPilot language={language} onNavigate={onNavigate} />
      <InstitutionalAdministrativeMaterialInstallationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalIdentityCommunicationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalOperationalLaunchPilot language={language} onNavigate={onNavigate} />
      <InstitutionalGovernanceComplianceConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalProcessesProceduresConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalDataReferenceSystemsConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalFinanceControlsConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalHumanResourcesCapabilitiesConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalM3SSecurityContinuityConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalQualityLessonsConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalReportingConsolidationPilot language={language} onNavigate={onNavigate} />
      <InstitutionalConsolidationIntegratedReview language={language} />

      <footer className="m3s-panel p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-300" size={18} aria-hidden="true" />
              <h4 className="text-sm font-semibold text-slate-100">{t.source}</h4>
            </div>
            <p className="mt-2 text-sm text-slate-300">{t.sourceModel}</p>
            <p className="mt-1 text-sm text-slate-400">{t.sourceMatrix}</p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => onSelectView('resources')} className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {t.openResources}
            </button>
            <button type="button" onClick={() => onSelectView('architecture')} className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {t.openArchitecture}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstitutionalProgramOverview;
