import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  FolderOpen,
  Megaphone,
  MessagesSquare,
  Palette,
  Send,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import InstitutionalMeasurementReadiness from './InstitutionalMeasurementReadiness';

const IDENTITY_STAGES = [
  'architecture',
  'verbal',
  'visual',
  'templates',
  'channels',
  'governance'
];

const CURRENT_STAGE_INDEX = 0;

const COPY = {
  FR: {
    eyebrow: 'PILOTE DE PROGRESSION · MISE EN PLACE',
    title: 'MEP-06 · Identité & communication',
    status: 'Identité et canaux partiellement disponibles · statut officiel à valider',
    body: 'Rendre l’identité de 2SG cohérente et ses premiers canaux institutionnels utilisables, en distinguant clairement la marque 2SG, le système interne M3S, les pistes exploratoires et les actifs effectivement approuvés.',
    noMeasure: 'Progression non calculable · socle de marque, actifs, canaux, preuves, responsabilités et règle de calcul à valider',
    currentStage: 'Point de travail actuel',
    currentStageName: 'Socle de marque, modèles et canaux officiels à valider',
    stages: ['Architecture de marque', 'Identité verbale', 'Identité visuelle', 'Modèles documentaires', 'Canaux officiels', 'Gouvernance & revue'],
    tasksTitle: 'Tâches de pilotage',
    tasks: [
      'Confirmer l’usage public de 2SG / SeneSwiss Group et maintenir M3S comme système interne, sans les placer au même niveau institutionnel.',
      'Versionner les messages maîtres, le ton de voix, les baselines et leurs traductions FR, DE et EN avec un statut explicite.',
      'Inventorier logos, variantes, palettes, typographies, modèles Word, PowerPoint, PDF, signatures et supports avec propriétaire et usage autorisé.',
      'Recenser les canaux institutionnels internes et externes, leur responsable, leur public, leur niveau de confidentialité et leur preuve de mise en service.'
    ],
    evidenceTitle: 'Preuves attendues',
    evidence: [
      'Registre versionné des actifs de marque avec identifiant, type, statut, responsable, usage autorisé et date de revue.',
      'Décisions humaines distinguant clairement validé, candidat, exploratoire, remplacé et archivé.',
      'Modèles documentaires contrôlés avec source, version, langue, classification, signature et règles d’emploi.',
      'Inventaire des canaux officiels avec preuve de contrôle, autorisation de publication, continuité et prochaine revue.'
    ],
    controlsTitle: 'Contrôles minimaux',
    controls: 'Une planche logo, une palette exploratoire, un prototype ou un canal techniquement accessible ne devient pas automatiquement officiel. La charte de marque, le Design System M3S et les modèles documentaires restent reliés mais distincts. Toute publication engageant 2SG exige une validation humaine adaptée.',
    privacyTitle: 'Données conservées hors de cette vue',
    privacy: 'Identifiants de comptes, accès aux domaines et messageries, listes privées de destinataires, contacts non publiés, statistiques sensibles, contrats, pièces personnelles et contenus non diffusés restent dans les registres autorisés et la GED classifiée.',
    responsibilitiesTitle: 'Responsabilités',
    responsibilities: 'La Gouvernance valide l’architecture de marque, les messages officiels et les droits de publication ; Administration / Communication tient les actifs, modèles et canaux ; chaque fonction valide son fond métier ; le Design System applique les décisions approuvées ; IT & Support sécurise les canaux ; la GED conserve versions et preuves.',
    source: 'Sources de pilotage : cadrages d’identité verbale et visuelle 2SG / M3S, point de reprise Branding, Design System Lab et module Administration / Communication & Courrier. Leur existence ne vaut ni charte définitive, ni logo officiel, ni canal autorisé.',
    openIdentity: 'Ouvrir les sources d’identité',
    openCommunication: 'Ouvrir la communication',
    openResources: 'Ouvrir les ressources d’identité'
  },
  EN: {
    eyebrow: 'PROGRESS PILOT · IMPLEMENTATION',
    title: 'MEP-06 · Identity & communication',
    status: 'Identity and channels partly available · official status to validate',
    body: 'Make the 2SG identity coherent and its first institutional channels usable while clearly separating the 2SG brand, the internal M3S system, exploratory directions and actually approved assets.',
    noMeasure: 'Progress cannot be calculated · brand foundation, assets, channels, evidence, responsibilities and calculation rule require validation',
    currentStage: 'Current work point',
    currentStageName: 'Brand foundation, templates and official channels to validate',
    stages: ['Brand architecture', 'Verbal identity', 'Visual identity', 'Document templates', 'Official channels', 'Governance & review'],
    tasksTitle: 'Steering tasks',
    tasks: [
      'Confirm the public use of 2SG / SeneSwiss Group and keep M3S as the internal system without placing both at the same institutional level.',
      'Version master messages, tone of voice, taglines and FR, DE and EN translations with an explicit status.',
      'Inventory logos, variants, palettes, typefaces, Word, PowerPoint and PDF templates, signatures and media with an owner and authorised use.',
      'Inventory internal and external institutional channels, their owner, audience, confidentiality level and evidence of service.'
    ],
    evidenceTitle: 'Expected evidence',
    evidence: [
      'Versioned brand asset register with identifier, type, status, owner, authorised use and review date.',
      'Human decisions clearly separating approved, candidate, exploratory, superseded and archived.',
      'Controlled document templates with source, version, language, classification, signature and usage rules.',
      'Official channel inventory with control evidence, publication authorisation, continuity and next review.'
    ],
    controlsTitle: 'Minimum controls',
    controls: 'A logo board, exploratory palette, prototype or technically accessible channel does not automatically become official. The brand charter, the M3S Design System and document templates remain connected but distinct. Any publication committing 2SG requires appropriate human approval.',
    privacyTitle: 'Data retained outside this view',
    privacy: 'Account identifiers, domain and email access, private recipient lists, unpublished contacts, sensitive analytics, contracts, personal records and undistributed content remain in authorised registers and the classified DMS.',
    responsibilitiesTitle: 'Responsibilities',
    responsibilities: 'Governance approves brand architecture, official messages and publishing rights; Administration / Communication maintains assets, templates and channels; each function validates its business content; the Design System applies approved decisions; IT & Support secures channels; the DMS retains versions and evidence.',
    source: 'Steering sources: 2SG / M3S verbal and visual identity frameworks, Branding resumption point, Design System Lab and Administration / Communication & Correspondence. Their existence proves neither a final charter, official logo nor authorised channel.',
    openIdentity: 'Open identity sources',
    openCommunication: 'Open communication',
    openResources: 'Open identity resources'
  },
  DE: {
    eyebrow: 'FORTSCHRITTSPILOT · UMSETZUNG',
    title: 'MEP-06 · Identität & Kommunikation',
    status: 'Identität und Kanäle teilweise vorhanden · offizieller Status zu validieren',
    body: 'Die Identität von 2SG kohärent und erste institutionelle Kanäle nutzbar machen, wobei die Marke 2SG, das interne System M3S, explorative Richtungen und tatsächlich freigegebene Elemente klar getrennt bleiben.',
    noMeasure: 'Fortschritt nicht berechenbar · Markenbasis, Elemente, Kanäle, Nachweise, Verantwortungen und Berechnungsregel sind zu validieren',
    currentStage: 'Aktueller Arbeitspunkt',
    currentStageName: 'Markenbasis, Vorlagen und offizielle Kanäle validieren',
    stages: ['Markenarchitektur', 'Verbale Identität', 'Visuelle Identität', 'Dokumentvorlagen', 'Offizielle Kanäle', 'Governance & Prüfung'],
    tasksTitle: 'Steuerungsaufgaben',
    tasks: [
      'Die öffentliche Verwendung von 2SG / SeneSwiss Group bestätigen und M3S als internes System führen, ohne beide institutionell gleichzustellen.',
      'Masterbotschaften, Tonalität, Baselines und Übersetzungen FR, DE und EN mit explizitem Status versionieren.',
      'Logos, Varianten, Paletten, Schriften, Word-, PowerPoint- und PDF-Vorlagen, Signaturen und Medien mit Verantwortung und erlaubter Nutzung inventarisieren.',
      'Interne und externe institutionelle Kanäle mit Verantwortung, Zielgruppe, Vertraulichkeit und Betriebsnachweis erfassen.'
    ],
    evidenceTitle: 'Erwartete Nachweise',
    evidence: [
      'Versioniertes Markenregister mit Kennung, Typ, Status, Verantwortung, erlaubter Nutzung und Prüfdatum.',
      'Menschliche Entscheide mit klarer Trennung von freigegeben, Kandidat, explorativ, ersetzt und archiviert.',
      'Kontrollierte Dokumentvorlagen mit Quelle, Version, Sprache, Klassifizierung, Signatur und Nutzungsregeln.',
      'Inventar offizieller Kanäle mit Kontrollnachweis, Publikationsfreigabe, Kontinuität und nächster Prüfung.'
    ],
    controlsTitle: 'Mindestkontrollen',
    controls: 'Eine Logoübersicht, explorative Palette, ein Prototyp oder technisch erreichbarer Kanal wird nicht automatisch offiziell. Markenrichtlinie, M3S Design System und Dokumentvorlagen bleiben verbunden, aber getrennt. Jede 2SG verpflichtende Publikation erfordert eine angemessene menschliche Freigabe.',
    privacyTitle: 'Daten außerhalb dieser Ansicht',
    privacy: 'Konto-IDs, Domain- und E-Mail-Zugänge, private Verteiler, unveröffentlichte Kontakte, sensible Analysen, Verträge, persönliche Unterlagen und nicht verbreitete Inhalte verbleiben in autorisierten Registern und der klassifizierten GED.',
    responsibilitiesTitle: 'Verantwortlichkeiten',
    responsibilities: 'Governance validiert Markenarchitektur, offizielle Botschaften und Publikationsrechte; Verwaltung / Kommunikation führt Elemente, Vorlagen und Kanäle; jede Funktion validiert ihre Fachinhalte; das Design System setzt freigegebene Entscheide um; IT & Support sichert die Kanäle; die GED bewahrt Versionen und Nachweise.',
    source: 'Steuerungsquellen: Rahmenwerke zur verbalen und visuellen Identität 2SG / M3S, Branding-Wiederaufnahme, Design System Lab und Verwaltung / Kommunikation & Korrespondenz. Ihre Existenz beweist weder endgültige Richtlinie, offizielles Logo noch autorisierten Kanal.',
    openIdentity: 'Identitätsquellen öffnen',
    openCommunication: 'Kommunikation öffnen',
    openResources: 'Identitätsressourcen öffnen'
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

const InstitutionalIdentityCommunicationPilot = ({ language = 'FR', onNavigate }) => {
  const t = COPY[language] || COPY.FR;
  const sectionId = 'institutional-identity-communication-pilot';
  const returnContext = `returnTo=dashboard&dashboardView=program&dashboardSection=${sectionId}`;

  return (
    <section id={sectionId} className="m3s-panel scroll-mt-24 p-4 sm:p-5" aria-labelledby={`${sectionId}-title`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase text-fuchsia-300">{t.eyebrow}</p>
          <h4 id={`${sectionId}-title`} className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.body}</p>
        </div>
        <span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-fuchsia-700/70 bg-fuchsia-950/30 px-3 py-2 text-xs font-semibold text-fuchsia-100">
          <Sparkles size={16} aria-hidden="true" />{t.status}
        </span>
      </div>

      <InstitutionalMeasurementReadiness language={language} headline={t.noMeasure} accent="fuchsia" />

      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-semibold text-slate-200">{t.currentStage}</span>
          <span className="rounded-md border border-fuchsia-700/70 bg-fuchsia-950/35 px-2.5 py-1 font-semibold text-fuchsia-100">{t.currentStageName}</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
          {IDENTITY_STAGES.map((stage, index) => {
            const current = index === CURRENT_STAGE_INDEX;
            return (
              <li key={stage} className={`min-h-16 rounded-md border p-2 text-xs font-semibold ${current ? 'border-fuchsia-500 bg-fuchsia-950/40 text-fuchsia-100' : 'border-slate-600 bg-slate-950/10 text-slate-200'}`}>
                <span className="mb-1 block">{index + 1}</span>{t.stages[index]}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <ListBlock icon={BookOpenCheck} title={t.tasksTitle} items={t.tasks} accent="text-fuchsia-300" />
        <ListBlock icon={FileCheck2} title={t.evidenceTitle} items={t.evidence} accent="text-emerald-300" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.controls}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><MessagesSquare className="text-rose-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.privacyTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.privacy}</p>
        </article>
        <article className="m3s-raised p-4">
          <div className="flex items-center gap-2"><BadgeCheck className="text-blue-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-slate-100">{t.responsibilitiesTitle}</h5></div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.responsibilities}</p>
        </article>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 xl:flex-row xl:items-end xl:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-slate-400">{t.source}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => onNavigate(`/administration?tab=institution&section=institution-sources&${returnContext}#institution-sources`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Palette size={16} aria-hidden="true" />{t.openIdentity}<ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=communication&${returnContext}#communication-institutional`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
            <Megaphone size={16} aria-hidden="true" />{t.openCommunication}<Send size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onNavigate(`/administration?tab=resources&${returnContext}#administration-resources-title`)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-fuchsia-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
            <FolderOpen size={16} aria-hidden="true" />{t.openResources}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalIdentityCommunicationPilot;
