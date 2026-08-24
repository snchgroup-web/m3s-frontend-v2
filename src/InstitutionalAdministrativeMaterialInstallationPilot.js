import React from 'react';
import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Laptop,
  Library,
  MapPinHouse,
  ShieldCheck,
  Warehouse
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const INSTALLATION_STAGES = [
  'scope',
  'sites',
  'equipment',
  'subscriptions',
  'allocation',
  'review'
];

const CURRENT_STAGE_INDEX = 0;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-03 · Installation administrative & matérielle',
    status: 'Moyens existants · inventaire institutionnel incomplet',
    body: 'Identifier les moyens essentiels permettant à 2SG de fonctionner, puis documenter leur localisation, leur affectation, leur protection et leur continuité sans exposer de données privées ou de sécurité.',
    noMeasure: 'Progression non calculable · périmètre cible, affectations, preuves, contrôles et règle de calcul à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Périmètre institutionnel et inventaire minimal à définir',
    stages: ['Périmètre cible', 'Locaux & lieux', 'Équipements & actifs', 'Abonnements & services', 'Affectations & continuité', 'Preuves & revue'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Définir les moyens essentiels du lancement et les distinguer des biens privés, des stocks commerciaux et des actifs patrimoniaux.',
      'Recenser les locaux, espaces de travail, équipements, abonnements et services nécessaires avec une référence stable.',
      'Relier chaque moyen à un lieu, une fonction, un responsable ou collectif, un statut d’usage et une règle de continuité.',
      'Qualifier les écarts, besoins de protection, maintenance, renouvellement, restitution et prochaine revue.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Inventaire institutionnel versionné avec identifiant, catégorie, lieu, affectation, statut et date de revue.',
      'Références GED autorisées vers factures, contrats, garanties, photos ou décisions, sans pièce sensible dans le frontend.',
      'Constat d’existence et d’état, preuve d’affectation ou de mise à disposition et responsable de contrôle identifié.',
      'Décision humaine confirmant le périmètre minimal, les règles de classification et les conditions de continuité.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Une ligne de stock ne prouve ni propriété, ni disponibilité physique, ni état, ni affectation institutionnelle. Un abonnement déclaré n’est pas automatiquement actif, payé, autorisé ou indispensable. Les moyens personnels mis à disposition restent distingués des biens appartenant à 2SG.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Adresses privées détaillées, numéros de série, identifiants de compte, contrats, clés d’accès, plans de sécurité, preuves d’achat et valeurs financières sensibles restent dans les registres autorisés et la GED classifiée.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'Stock & Actifs tient l’inventaire physique ; IT & Support qualifie équipements numériques, abonnements et continuité ; Administration coordonne lieux, affectations et revues ; la fonction utilisatrice confirme le besoin et l’usage ; Finances rapproche les coûts ; la Gouvernance valide périmètre, règles et risques.',
    source: 'Sources de pilotage : registres M3S Stock & Actifs, IT & Support et Ressources Administration, journaux déclarant les moyens existants et dictionnaire de données M3S. Leur présence ne vaut ni propriété, ni conformité, ni validation.',
    openAssets: 'Ouvrir l’inventaire',
    openIt: 'Ouvrir les moyens numériques',
    openResources: 'Ouvrir les ressources'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-03 · Administrative & material setup',
    status: 'Existing means · incomplete institutional inventory',
    body: 'Identify the essential means enabling 2SG to operate, then document their location, allocation, protection and continuity without exposing private or security data.',
    noMeasure: 'Progress cannot be calculated · target scope, allocations, evidence, controls and calculation rule require validation',
    currentStage: 'Current work point',
    currentStageName: 'Institutional scope and minimum inventory to define',
    stages: ['Target scope', 'Premises & locations', 'Equipment & assets', 'Subscriptions & services', 'Allocations & continuity', 'Evidence & review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Define essential launch means and separate them from private property, commercial stock and patrimonial assets.',
      'Inventory premises, workspaces, equipment, subscriptions and required services using stable references.',
      'Link each means to a location, function, person or collective owner, usage status and continuity rule.',
      'Qualify gaps and needs for protection, maintenance, renewal, return and the next review.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned institutional inventory with identifier, category, location, allocation, status and review date.',
      'Authorised DMS references to invoices, contracts, warranties, photos or decisions, with no sensitive record in the frontend.',
      'Existence and condition check, evidence of allocation or availability, and an identified control owner.',
      'Human decision confirming minimum scope, classification rules and continuity conditions.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A stock line proves neither ownership, physical availability, condition nor institutional allocation. A declared subscription is not automatically active, paid, authorised or essential. Personal means made available remain separate from assets owned by 2SG.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Detailed private addresses, serial numbers, account identifiers, contracts, access keys, security plans, purchase evidence and sensitive financial values remain in authorised registers and the classified DMS.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Stock & Assets maintains the physical inventory; IT & Support qualifies digital equipment, subscriptions and continuity; Administration coordinates locations, allocations and reviews; the using function confirms need and use; Finance reconciles costs; Governance validates scope, rules and risks.',
    source: 'Steering sources: M3S Stock & Assets, IT & Support and Administration Resources registers, logs declaring existing means and the M3S data dictionary. Their presence proves neither ownership, compliance nor validation.',
    openAssets: 'Open inventory',
    openIt: 'Open digital means',
    openResources: 'Open resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-03 · Administrative & materielle Einrichtung',
    status: 'Vorhandene Mittel · unvollständiges institutionelles Inventar',
    body: 'Die wesentlichen Betriebsmittel von 2SG bestimmen und Standort, Zuordnung, Schutz und Kontinuität dokumentieren, ohne private oder sicherheitsrelevante Daten offenzulegen.',
    noMeasure: 'Fortschritt nicht berechenbar · Zielumfang, Zuordnungen, Nachweise, Kontrollen und Berechnungsregel sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Institutionellen Umfang und Mindestinventar definieren',
    stages: ['Zielumfang', 'Räume & Standorte', 'Ausrüstung & Aktiven', 'Abonnements & Dienste', 'Zuordnung & Kontinuität', 'Nachweise & Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Wesentliche Startmittel definieren und von Privatvermögen, Handelsbestand und patrimonialen Aktiven trennen.',
      'Räume, Arbeitsplätze, Ausrüstung, Abonnements und erforderliche Dienste mit stabilen Referenzen erfassen.',
      'Jedes Mittel mit Standort, Funktion, verantwortlicher Person oder Kollektiv, Nutzungsstatus und Kontinuitätsregel verknüpfen.',
      'Lücken sowie Bedarf an Schutz, Wartung, Erneuerung, Rückgabe und nächster Prüfung qualifizieren.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes institutionelles Inventar mit Kennung, Kategorie, Standort, Zuordnung, Status und Prüfdatum.',
      'Autorisierte DMS-Verweise auf Rechnungen, Verträge, Garantien, Fotos oder Entscheide ohne sensible Unterlagen im Frontend.',
      'Existenz- und Zustandskontrolle, Nachweis der Zuordnung oder Bereitstellung und benannte Kontrollverantwortung.',
      'Menschlicher Entscheid zu Mindestumfang, Klassifizierungsregeln und Kontinuitätsbedingungen.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Eine Bestandszeile beweist weder Eigentum, physische Verfügbarkeit, Zustand noch institutionelle Zuordnung. Ein deklariertes Abonnement ist nicht automatisch aktiv, bezahlt, autorisiert oder notwendig. Bereitgestellte persönliche Mittel bleiben vom Eigentum von 2SG getrennt.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Detaillierte Privatadressen, Seriennummern, Konto-IDs, Verträge, Zugangsschlüssel, Sicherheitspläne, Kaufnachweise und sensible Finanzwerte verbleiben in autorisierten Registern und im klassifizierten DMS.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Bestand & Aktiven führt das physische Inventar; IT & Support qualifiziert digitale Ausrüstung, Abonnements und Kontinuität; Administration koordiniert Standorte, Zuordnungen und Prüfungen; die nutzende Funktion bestätigt Bedarf und Nutzung; Finanzen stimmt Kosten ab; Governance validiert Umfang, Regeln und Risiken.',
    source: 'Steuerungsquellen: M3S-Register Bestand & Aktiven, IT & Support und Ressourcen Administration, Journale zu vorhandenen Mitteln sowie das M3S-Datenwörterbuch. Ihre Existenz beweist weder Eigentum, Konformität noch Validierung.',
    openAssets: 'Inventar öffnen',
    openIt: 'Digitale Mittel öffnen',
    openResources: 'Ressourcen öffnen'
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

const InstitutionalAdministrativeMaterialInstallationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-admin-material-installation-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-cyan-700/70 bg-cyan-950/30 px-3 py-2 text-xs font-semibold text-cyan-100">
          <Warehouse size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="cyan" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-cyan-700/70 bg-cyan-950/35 px-2.5 py-1 font-semibold text-cyan-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {INSTALLATION_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-cyan-500 bg-cyan-950/40 text-cyan-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={ClipboardCheck} title={t.tasksTitle} items={t.tasks} accent="text-cyan-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><MapPinHouse className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><Building2 className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/actifs?tab=inventory&${returnContext}#assets-inventory-register`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Boxes size={16} aria-hidden="true" />{t.openAssets}<ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onNavigate(`/ged?tab=overview&${returnContext}#it-support-overview`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <Laptop size={16} aria-hidden="true" />{t.openIt}
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=resources&${returnContext}#administration-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <Library size={16} aria-hidden="true" />{t.openResources}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalAdministrativeMaterialInstallationPilot;
