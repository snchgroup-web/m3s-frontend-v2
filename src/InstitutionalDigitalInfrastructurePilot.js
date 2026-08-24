import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  CloudCog,
  DatabaseBackup,
  FileCheck2,
  LifeBuoy,
  ServerCog,
  ShieldCheck
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const INFRASTRUCTURE_STAGES = [
  'scope',
  'access',
  'environments',
  'continuity',
  'incidents',
  'usage'
];

const CURRENT_STAGE_INDEX = 1;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-04 · Infrastructure numérique & M3S',
    status: 'Socle utilisable · maturité à contrôler',
    body: 'Établir le socle numérique minimal permettant à 2SG d’utiliser M3S et ses services de manière maîtrisée, traçable et continue, sans exposer les configurations sensibles.',
    noMeasure: 'Progression non calculable · socle cible, contrôles, preuves et critères d’usage interne à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Accès, environnements et continuité à consolider',
    stages: ['Socle cible', 'Identités & accès', 'Environnements', 'Sauvegarde & continuité', 'Incidents', 'Usage interne & revue'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Définir le socle minimal : services, données, responsables, dépendances et niveau de criticité.',
      'Tenir un registre des identités, rôles, habilitations, revues et retraits d’accès autorisés.',
      'Distinguer les environnements, leurs usages, leurs responsables et leurs règles de changement.',
      'Formaliser sauvegardes, restauration, continuité, traitement des incidents et critères d’usage interne.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Inventaire versionné des services et composants, sans secret, jeton ni configuration exploitable.',
      'Décisions d’habilitation, revues d’accès et traces d’audit associées aux personnes autorisées.',
      'Preuves de sauvegarde et de restauration testée, avec date, périmètre, résultat et responsable.',
      'Registre des incidents, contrôles de disponibilité et décision humaine autorisant l’usage interne.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Aucun secret, mot de passe, jeton, clé ou chemin sensible ne doit être intégré au navigateur. Un service accessible n’est pas automatiquement sécurisé, sauvegardé ni homologué. Une sauvegarde déclarée n’est recevable qu’après contrôle de restauration.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'IT & Support tient le socle technique et exécute les contrôles autorisés ; les responsables métier expriment les besoins et valident l’usage ; la Gouvernance autorise risques et habilitations sensibles ; Administration suit les échéances ; la GED conserve les preuves non secrètes selon leur classification.',
    source: 'Sources de pilotage : dépôt M3S courant, cadrage de standardisation des modules métier V1, documents des phases M3S et résumé de migration Railway / Netlify du 18.06.2026. Les secrets et configurations restent hors de cette vue.',
    open: 'Ouvrir IT & Support'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-04 · Digital infrastructure & M3S',
    status: 'Usable foundation · maturity to assess',
    body: 'Establish the minimum digital foundation enabling 2SG to use M3S and its services in a controlled, traceable and resilient way without exposing sensitive configurations.',
    noMeasure: 'Progress cannot be calculated · target foundation, controls, evidence and internal-use criteria require validation',
    currentStage: 'Current work point',
    currentStageName: 'Access, environments and continuity to consolidate',
    stages: ['Target foundation', 'Identities & access', 'Environments', 'Backup & continuity', 'Incidents', 'Internal use & review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Define the minimum foundation: services, data, owners, dependencies and criticality level.',
      'Maintain a register of authorised identities, roles, entitlements, reviews and access removals.',
      'Separate environments, their uses, owners and change rules.',
      'Formalise backups, restoration, continuity, incident handling and internal-use criteria.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned inventory of services and components without secrets, tokens or exploitable configuration.',
      'Entitlement decisions, access reviews and audit records linked to authorised people.',
      'Evidence of backup and tested restoration with date, scope, result and owner.',
      'Incident register, availability checks and human decision authorising internal use.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'No secret, password, token, key or sensitive path may be embedded in the browser. An accessible service is not automatically secure, backed up or approved. A declared backup is acceptable only after a restoration check.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'IT & Support maintains the technical foundation and performs authorised controls; business owners state needs and validate use; Governance authorises risks and sensitive entitlements; Administration tracks deadlines; GED retains non-secret evidence according to classification.',
    source: 'Steering sources: current M3S repository, business-module standardisation framework V1, M3S phase documents and the 18 Jun 2026 Railway / Netlify migration summary. Secrets and configurations remain outside this view.',
    open: 'Open IT & Support'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-04 · Digitale Infrastruktur & M3S',
    status: 'Nutzbare Grundlage · Reife zu prüfen',
    body: 'Die digitale Mindestgrundlage schaffen, damit 2SG M3S und seine Dienste kontrolliert, nachvollziehbar und ausfallsicher nutzen kann, ohne sensible Konfigurationen offenzulegen.',
    noMeasure: 'Fortschritt nicht berechenbar · Zielgrundlage, Kontrollen, Nachweise und Kriterien der internen Nutzung sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Zugriffe, Umgebungen und Kontinuität zu konsolidieren',
    stages: ['Zielgrundlage', 'Identitäten & Zugriffe', 'Umgebungen', 'Sicherung & Kontinuität', 'Vorfälle', 'Interne Nutzung & Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Die Mindestgrundlage mit Diensten, Daten, Verantwortung, Abhängigkeiten und Kritikalität definieren.',
      'Ein Register autorisierter Identitäten, Rollen, Berechtigungen, Prüfungen und Entzüge führen.',
      'Umgebungen, Nutzungen, Verantwortungen und Änderungsregeln voneinander trennen.',
      'Sicherung, Wiederherstellung, Kontinuität, Vorfallbearbeitung und Kriterien interner Nutzung formalisieren.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Inventar der Dienste und Komponenten ohne Geheimnisse, Token oder nutzbare Konfiguration.',
      'Berechtigungsentscheide, Zugriffsprüfungen und Auditnachweise für autorisierte Personen.',
      'Nachweis einer Sicherung und geprüften Wiederherstellung mit Datum, Umfang, Ergebnis und Verantwortung.',
      'Vorfallregister, Verfügbarkeitskontrollen und menschlicher Entscheid zur internen Nutzung.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Geheimnisse, Passwörter, Token, Schlüssel oder sensible Pfade dürfen nicht im Browser enthalten sein. Ein erreichbarer Dienst ist nicht automatisch sicher, gesichert oder freigegeben. Eine deklarierte Sicherung ist erst nach einer Wiederherstellungsprüfung zulässig.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'IT & Support betreibt die technische Grundlage und führt autorisierte Kontrollen aus; Fachverantwortliche formulieren Bedürfnisse und validieren die Nutzung; Governance autorisiert Risiken und sensible Berechtigungen; Administration verfolgt Fristen; die GED bewahrt nicht geheime Nachweise gemäß Klassifizierung.',
    source: 'Steuerungsquellen: aktuelles M3S-Repository, Rahmen zur Standardisierung der Fachmodule V1, M3S-Phasendokumente und Zusammenfassung der Railway-/Netlify-Migration vom 18.06.2026. Geheimnisse und Konfigurationen bleiben außerhalb dieser Ansicht.',
    open: 'IT & Support öffnen'
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

const InstitutionalDigitalInfrastructurePilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-digital-infrastructure-pilot" className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby="institutional-digital-infrastructure-pilot-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p>
          <h4 id="institutional-digital-infrastructure-pilot-title" className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-200">
          <ServerCog size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="violet" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-violet-700/70 bg-violet-950/35 px-2.5 py-1 font-semibold text-violet-200">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {INFRASTRUCTURE_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            const observed = index < CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-violet-500 bg-violet-950/40 text-violet-100' : observed ? 'border-blue-800/70 bg-blue-950/20 text-blue-200' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={CloudCog} title={t.tasksTitle} items={t.tasks} accent="text-violet-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><DatabaseBackup className="text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <button type="button" onClick={() => onNavigate('/ged?tab=architecture&returnTo=dashboard&dashboardView=program&dashboardSection=institutional-digital-infrastructure-pilot#it-support-architecture')} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <LifeBuoy size={16} aria-hidden="true" />{t.open}<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default InstitutionalDigitalInfrastructurePilot;
