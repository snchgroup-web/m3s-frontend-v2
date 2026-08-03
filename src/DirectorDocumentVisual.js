import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  FolderOpen,
  Landmark,
  Network,
  Route,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  X
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Lecture institutionnelle dérivée',
    title: 'Document Directeur Global 2SG V4',
    subtitle: 'Une vue d’ensemble de l’institution, de son architecture et de sa trajectoire, sans remplacer la V3C historique ni les sources maîtresses.',
    sourceStatus: 'Version V4 de travail stratégique',
    historyStatus: 'V3C historique préservée',
    validationStatus: 'Consolidation à valider',
    documentDate: 'Date de la source : 02-08-2026',
    classification: 'Classification : Interne C2',
    languageNote: 'La source maîtresse est rédigée en français. Les lectures DE et EN facilitent la compréhension, mais ne constituent pas encore des traductions institutionnelles validées.',
    governanceNote: 'Cette présentation organise la lecture de la V4. Elle ne consolide pas automatiquement le document, ne modifie pas les référentiels et ne remplace aucune décision institutionnelle.',
    close: 'Fermer le parcours du Document Directeur',
    previous: 'Vue précédente',
    next: 'Vue suivante',
    openGed: 'Consulter la source dans la GED',
    progress: 'Vue {current} sur {total}',
    slideLabel: 'Afficher la vue : {title}',
    insightTitle: 'Repère de gouvernance',
    sourceRule: 'Sources de référence : Document Directeur Global V4 de travail, V3C historique, Note stratégique V2 et référentiels applicables. Toute consolidation reste soumise à validation humaine.',
    slides: [
      {
        title: 'Identité & vocation',
        summary: '2SG relie association internationale, social business, services et innovation dans une institution hybride Suisse–Sénégal.',
        items: ['Pont durable Suisse–Sénégal', 'Valeur économique, sociale et organisationnelle', 'Capital humain comme actif stratégique', 'Coopération équilibrée et innovation responsable'],
        insight: 'Le modèle ne se réduit ni à l’assistance associative ni à la recherche classique du profit.'
      },
      {
        title: 'Positionnement & promesse',
        summary: 'La promesse doit rester simple, observable et adaptée aux capacités réellement démontrées.',
        groups: [['Temps', 'Organiser, automatiser et réduire les tâches répétitives.'], ['Coûts', 'Réutiliser des systèmes sobres et mieux pilotés.'], ['Qualité', 'Documenter, standardiser et capitaliser.'], ['Sécurité', 'Protéger les données, les accès et les usages IA.'], ['Revenus', 'Développer packs, services, formation, e-commerce et social business.']],
        insight: 'Les cibles progressent des petites structures et artisans vers les PME, réseaux et programmes Afrique–Europe.'
      },
      {
        title: 'Piliers & unités',
        summary: 'Les piliers stratégiques et les Business Units donnent une architecture lisible sans transformer le Document Directeur en catalogue commercial.',
        groups: [['ADMIN / ORG', 'Gouvernance, conformité, communication et coordination.'], ['SOCIAL', 'Impact, co-développement et initiatives communautaires.'], ['BUSINESS / TRADE', 'Services, immobilier, commerce, logistique et revenus.'], ['TECH / DIGITAL', 'M3S, GED, IA, automatisation et connaissances.']],
        insight: 'Le noyau exécutable reste Business, Social, Organisation et Digital ; les packs constituent une couche d’offre distincte.'
      },
      {
        title: 'Organisation binationale',
        summary: 'La gouvernance associe un Bureau horizontal, deux pôles géographiques et des responsabilités fonctionnelles clairement mandatées.',
        groups: [['Assemblée générale', 'Valide les grandes orientations sans rôle applicatif direct.'], ['Bureau', 'Relie Zurich et le Sénégal pour l’exécution et la supervision.'], ['TEAM ZH', 'Membres fondateurs et droits Admin selon le besoin de savoir.'], ['TEAM SN', 'Membres associés, opérations locales et droits Utilisateur étendus dans leur fonction.']],
        insight: 'Les droits système, les responsabilités métier et la confidentialité ne doivent jamais être confondus avec une hiérarchie générale.'
      },
      {
        title: 'Chaîne de valeur & processus',
        summary: '2SG transforme un besoin réel en solution utilisée, standardisée puis éventuellement valorisable après preuve.',
        items: ['Identifier un besoin réel', 'Construire et tester un outil interne', 'Standardiser méthode et procédure', 'Préparer un produit, service ou kit', 'Valoriser après preuve d’usage', 'Mesurer qualité, impact et apprentissage'],
        insight: 'Les processus de management, opérationnels, support et innovation doivent rester reliés à des preuves et à des responsables.'
      },
      {
        title: 'M3S & connaissances',
        summary: 'M3S constitue la colonne vertébrale qui relie gouvernance, opérations, finances, projets, documents, données et apprentissage.',
        groups: [['Pilotage', 'Administration, finance, projets, clients et opérations.'], ['Connaissances', 'Veille, GED, glossaire, base de connaissances et capitalisation.'], ['Transformation', 'IA, automatisation, tableaux de bord et outils internes.'], ['Traçabilité', 'Rôles, décisions, preuves, statuts, alertes et historique.']],
        insight: 'Un outil interne ne devient une offre qu’après usage réel, standardisation, évaluation et décision humaine.'
      },
      {
        title: 'Sécurité & conformité',
        summary: 'La protection de l’institution, des personnes et de l’information est une fonction transversale et permanente.',
        items: ['Classification et confidentialité', 'Accès selon le besoin de savoir', 'Protection des données et des comptes', 'Journalisation et sauvegardes', 'Conformité institutionnelle et réglementaire', 'Continuité minimale des activités critiques'],
        insight: 'Le droit Admin n’autorise jamais automatiquement l’accès aux pages personnelles ou aux informations secrètes.'
      },
      {
        title: 'Trajectoire & garde-fous',
        summary: 'La progression va de la stabilisation du noyau à la consolidation, puis à une expansion fondée sur des preuves.',
        groups: [['Stabiliser', 'Base légale, rôles, charges, documentation et premiers flux.'], ['Consolider', 'Offre, processus, compétences, partenariats et tableaux de bord.'], ['Accélérer', 'Label, solutions numériques, réseau et diffusion maîtrisée.'], ['Garde-fous', 'Éviter dispersion, branding prématuré et confusion entre outil, pack, produit et revenu.']],
        insight: 'La prochaine décision documentaire est la consolidation formelle de la V4 et sa relation gouvernée avec la V3C.'
      }
    ]
  },
  EN: {
    eyebrow: 'Derived institutional reading',
    title: '2SG Global Governing Document V4',
    subtitle: 'An overview of the institution, its architecture and trajectory without replacing historical V3C or the master sources.',
    sourceStatus: 'Strategic V4 working version',
    historyStatus: 'Historical V3C preserved',
    validationStatus: 'Consolidation to validate',
    documentDate: 'Source date: 02-08-2026',
    classification: 'Classification: Internal C2',
    languageNote: 'The master source is written in French. The DE and EN readings support understanding but are not yet validated institutional translations.',
    governanceNote: 'This presentation organises the reading of V4. It does not automatically consolidate the document, alter reference frameworks or replace any institutional decision.',
    close: 'Close Governing Document journey',
    previous: 'Previous view',
    next: 'Next view',
    openGed: 'Open the source in the GED',
    progress: 'View {current} of {total}',
    slideLabel: 'Show view: {title}',
    insightTitle: 'Governance marker',
    sourceRule: 'Reference sources: Global Governing Document V4 working draft, historical V3C, Strategic Note V2 and applicable frameworks. Any consolidation remains subject to human validation.',
    slides: [
      { title: 'Identity & purpose', summary: '2SG connects an international association, social business, services and innovation in a hybrid Switzerland–Senegal institution.', items: ['A lasting Switzerland–Senegal bridge', 'Economic, social and organisational value', 'Human capital as a strategic asset', 'Balanced cooperation and responsible innovation'], insight: 'The model is neither limited to charitable assistance nor driven solely by conventional profit.' },
      { title: 'Positioning & promise', summary: 'The promise must remain simple, observable and aligned with actually demonstrated capabilities.', groups: [['Time', 'Organise, automate and reduce repetitive work.'], ['Costs', 'Reuse leaner and better-managed systems.'], ['Quality', 'Document, standardise and capture knowledge.'], ['Security', 'Protect data, access and AI uses.'], ['Revenue', 'Develop packs, services, training, e-commerce and social business.']], insight: 'Targets progress from small organisations and artisans to SMEs, networks and Africa–Europe programmes.' },
      { title: 'Pillars & units', summary: 'Strategic pillars and Business Units provide a readable architecture without turning the Governing Document into a commercial catalogue.', groups: [['ADMIN / ORG', 'Governance, compliance, communication and coordination.'], ['SOCIAL', 'Impact, co-development and community initiatives.'], ['BUSINESS / TRADE', 'Services, real estate, trade, logistics and revenue.'], ['TECH / DIGITAL', 'M3S, GED, AI, automation and knowledge.']], insight: 'The executable core remains Business, Social, Organisation and Digital; packs are a separate offer layer.' },
      { title: 'Binational organisation', summary: 'Governance combines a horizontal Board, two geographic hubs and clearly mandated functional responsibilities.', groups: [['General Assembly', 'Validates major directions without a direct application role.'], ['Board', 'Connects Zurich and Senegal for execution and supervision.'], ['TEAM ZH', 'Founding members and Admin rights subject to need-to-know.'], ['TEAM SN', 'Associate members, local operations and extended User rights in their function.']], insight: 'System rights, business responsibilities and confidentiality must never be confused with general hierarchy.' },
      { title: 'Value chain & processes', summary: '2SG turns a real need into a solution that is used, standardised and only then potentially valorised after evidence.', items: ['Identify a real need', 'Build and test an internal tool', 'Standardise method and procedure', 'Prepare a product, service or kit', 'Valorise after proof of use', 'Measure quality, impact and learning'], insight: 'Management, operational, support and innovation processes must stay connected to evidence and owners.' },
      { title: 'M3S & knowledge', summary: 'M3S is the backbone connecting governance, operations, finance, projects, documents, data and learning.', groups: [['Steering', 'Administration, finance, projects, customers and operations.'], ['Knowledge', 'Monitoring, GED, glossary, knowledge base and capture.'], ['Transformation', 'AI, automation, dashboards and internal tools.'], ['Traceability', 'Roles, decisions, evidence, statuses, alerts and history.']], insight: 'An internal tool becomes an offer only after real use, standardisation, evaluation and human decision.' },
      { title: 'Security & compliance', summary: 'Protecting the institution, people and information is a permanent cross-functional responsibility.', items: ['Classification and confidentiality', 'Need-to-know access', 'Data and account protection', 'Logging and backups', 'Institutional and regulatory compliance', 'Minimum continuity for critical activities'], insight: 'Admin rights never automatically authorise access to personal pages or secret information.' },
      { title: 'Trajectory & guardrails', summary: 'Progression moves from stabilising the core to consolidation and then evidence-based expansion.', groups: [['Stabilise', 'Legal basis, roles, costs, documentation and first flows.'], ['Consolidate', 'Offer, processes, skills, partnerships and dashboards.'], ['Accelerate', 'Label, digital solutions, network and controlled distribution.'], ['Guardrails', 'Avoid dispersion, premature branding and confusion between tool, pack, product and revenue.']], insight: 'The next documentary decision is formal consolidation of V4 and its governed relationship with V3C.' }
    ]
  },
  DE: {
    eyebrow: 'Abgeleitete institutionelle Lektüre',
    title: 'Globales 2SG-Leitdokument V4',
    subtitle: 'Ein Überblick über Institution, Architektur und Entwicklungspfad, ohne die historische V3C oder maßgebliche Quellen zu ersetzen.',
    sourceStatus: 'Strategische V4-Arbeitsversion',
    historyStatus: 'Historische V3C bleibt erhalten',
    validationStatus: 'Konsolidierung zu validieren',
    documentDate: 'Quelldatum: 02.08.2026',
    classification: 'Klassifizierung: Intern C2',
    languageNote: 'Die maßgebliche Quelle ist auf Französisch verfasst. Die DE- und EN-Fassungen erleichtern die Lektüre, sind aber noch keine validierten institutionellen Übersetzungen.',
    governanceNote: 'Diese Präsentation strukturiert die Lektüre der V4. Sie konsolidiert das Dokument nicht automatisch, ändert keine Referenzrahmen und ersetzt keine institutionelle Entscheidung.',
    close: 'Pfad des Leitdokuments schließen',
    previous: 'Vorherige Ansicht',
    next: 'Nächste Ansicht',
    openGed: 'Quelle in der GED öffnen',
    progress: 'Ansicht {current} von {total}',
    slideLabel: 'Ansicht anzeigen: {title}',
    insightTitle: 'Governance-Leitpunkt',
    sourceRule: 'Referenzquellen: Arbeitsfassung des Globalen Leitdokuments V4, historische V3C, Strategische Notiz V2 und anwendbare Referenzrahmen. Jede Konsolidierung bleibt der menschlichen Validierung unterstellt.',
    slides: [
      { title: 'Identität & Zweck', summary: '2SG verbindet internationalen Verein, Social Business, Dienstleistungen und Innovation in einer hybriden Institution Schweiz–Senegal.', items: ['Dauerhafte Brücke Schweiz–Senegal', 'Wirtschaftlicher, sozialer und organisatorischer Wert', 'Humankapital als strategischer Vermögenswert', 'Ausgewogene Kooperation und verantwortungsvolle Innovation'], insight: 'Das Modell beschränkt sich weder auf Vereinshilfe noch allein auf klassische Gewinnerzielung.' },
      { title: 'Positionierung & Versprechen', summary: 'Das Versprechen muss einfach, beobachtbar und an tatsächlich nachgewiesene Fähigkeiten angepasst bleiben.', groups: [['Zeit', 'Organisieren, automatisieren und repetitive Arbeit reduzieren.'], ['Kosten', 'Schlanke und besser gesteuerte Systeme wiederverwenden.'], ['Qualität', 'Dokumentieren, standardisieren und Wissen sichern.'], ['Sicherheit', 'Daten, Zugriffe und KI-Nutzung schützen.'], ['Erlöse', 'Pakete, Leistungen, Schulungen, E-Commerce und Social Business entwickeln.']], insight: 'Die Zielgruppen entwickeln sich von kleinen Organisationen und Handwerksbetrieben zu KMU, Netzwerken und Afrika–Europa-Programmen.' },
      { title: 'Säulen & Einheiten', summary: 'Strategische Säulen und Business Units schaffen eine lesbare Architektur, ohne das Leitdokument in einen Produktkatalog zu verwandeln.', groups: [['ADMIN / ORG', 'Governance, Compliance, Kommunikation und Koordination.'], ['SOCIAL', 'Wirkung, Ko-Entwicklung und Gemeinschaftsinitiativen.'], ['BUSINESS / TRADE', 'Dienstleistungen, Immobilien, Handel, Logistik und Erlöse.'], ['TECH / DIGITAL', 'M3S, GED, KI, Automatisierung und Wissen.']], insight: 'Der ausführbare Kern bleibt Business, Social, Organisation und Digital; Pakete bilden eine getrennte Angebotsebene.' },
      { title: 'Binationale Organisation', summary: 'Die Governance verbindet einen horizontalen Vorstand, zwei geografische Pole und klar mandatierte Funktionsverantwortungen.', groups: [['Generalversammlung', 'Validiert zentrale Ausrichtungen ohne direkte Anwendungsrolle.'], ['Vorstand', 'Verbindet Zürich und Senegal für Ausführung und Aufsicht.'], ['TEAM ZH', 'Gründungsmitglieder und Adminrechte nach dem Need-to-know-Prinzip.'], ['TEAM SN', 'Assoziierte Mitglieder, lokale Operationen und erweiterte Benutzerrechte in ihrer Funktion.']], insight: 'Systemrechte, fachliche Verantwortung und Vertraulichkeit dürfen nie mit einer allgemeinen Hierarchie verwechselt werden.' },
      { title: 'Wertschöpfung & Prozesse', summary: '2SG überführt einen realen Bedarf in eine genutzte und standardisierte Lösung, die erst nach Nachweisen verwertet werden kann.', items: ['Realen Bedarf erkennen', 'Internes Werkzeug bauen und testen', 'Methode und Verfahren standardisieren', 'Produkt, Leistung oder Kit vorbereiten', 'Nach Nutzungsnachweis verwerten', 'Qualität, Wirkung und Lernen messen'], insight: 'Management-, operative, Support- und Innovationsprozesse müssen mit Nachweisen und Verantwortlichen verbunden bleiben.' },
      { title: 'M3S & Wissen', summary: 'M3S ist das Rückgrat, das Governance, Betrieb, Finanzen, Projekte, Dokumente, Daten und Lernen verbindet.', groups: [['Steuerung', 'Administration, Finanzen, Projekte, Kundschaft und Betrieb.'], ['Wissen', 'Monitoring, GED, Glossar, Wissensbasis und Sicherung.'], ['Transformation', 'KI, Automatisierung, Dashboards und interne Werkzeuge.'], ['Nachvollziehbarkeit', 'Rollen, Entscheidungen, Nachweise, Status, Warnungen und Verlauf.']], insight: 'Ein internes Werkzeug wird erst nach realer Nutzung, Standardisierung, Bewertung und menschlicher Entscheidung zum Angebot.' },
      { title: 'Sicherheit & Compliance', summary: 'Der Schutz der Institution, der Menschen und der Informationen ist eine dauerhafte Querschnittsaufgabe.', items: ['Klassifizierung und Vertraulichkeit', 'Zugriff nach Need-to-know', 'Schutz von Daten und Konten', 'Protokollierung und Sicherungen', 'Institutionelle und regulatorische Compliance', 'Mindestkontinuität kritischer Tätigkeiten'], insight: 'Adminrechte erlauben niemals automatisch den Zugriff auf persönliche Seiten oder geheime Informationen.' },
      { title: 'Entwicklung & Leitplanken', summary: 'Die Entwicklung führt von der Stabilisierung des Kerns über Konsolidierung zu einer evidenzbasierten Expansion.', groups: [['Stabilisieren', 'Rechtsgrundlage, Rollen, Kosten, Dokumentation und erste Abläufe.'], ['Konsolidieren', 'Angebot, Prozesse, Kompetenzen, Partnerschaften und Dashboards.'], ['Beschleunigen', 'Label, digitale Lösungen, Netzwerk und kontrollierte Verbreitung.'], ['Leitplanken', 'Zerstreuung, verfrühtes Branding und Verwechslung von Werkzeug, Paket, Produkt und Erlös vermeiden.']], insight: 'Die nächste Dokumentenentscheidung betrifft die formelle Konsolidierung der V4 und ihre geregelte Beziehung zur V3C.' }
    ]
  }
};

const ICONS = [Building2, Target, Landmark, Users, Workflow, Network, ShieldCheck, Route];
const interpolate = (template, values) => Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);

const DirectorDocumentVisual = ({ language = 'FR', onClose }) => {
  const t = COPY[language] || COPY.FR;
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = t.slides[activeIndex];
  const SlideIcon = ICONS[activeIndex];
  const total = t.slides.length;

  return (
    <section id="director-document-visual" className="scroll-mt-20 rounded-lg border border-blue-800 bg-slate-900" aria-labelledby="director-document-visual-title">
      <header className="border-b border-slate-700 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h3 id="director-document-visual-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{t.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label={t.close} title={t.close}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-blue-700 bg-blue-950/60 px-3 py-1.5 text-xs font-semibold text-blue-100">{t.sourceStatus}</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200">{t.historyStatus}</span>
          <span className="rounded-full border border-amber-700 bg-amber-950/60 px-3 py-1.5 text-xs font-semibold text-amber-100">{t.validationStatus}</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200">{t.documentDate}</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200">{t.classification}</span>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <p className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-xs leading-5 text-slate-300">{t.languageNote}</p>
          <p className="rounded-lg border border-amber-800/60 bg-amber-950/20 p-3 text-xs leading-5 text-amber-100/85">{t.governanceNote}</p>
        </div>
      </header>

      <div className="border-b border-slate-700 p-4 sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label={t.title}>
          {t.slides.map((item, index) => (
            <button key={item.title} type="button" role="tab" aria-selected={activeIndex === index} aria-label={interpolate(t.slideLabel, { title: item.title })} onClick={() => setActiveIndex(index)} className={`min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeIndex === index ? 'border-blue-500 bg-blue-950 text-blue-100' : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {index + 1}. {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6" role="tabpanel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-blue-300"><SlideIcon size={21} aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">{interpolate(t.progress, { current: activeIndex + 1, total })}</p>
                <h4 className="mt-1 text-xl font-bold text-white">{slide.title}</h4>
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-200">{slide.summary}</p>
            {slide.items && <ul className="mt-5 grid gap-3 sm:grid-cols-2">{slide.items.map(item => <li key={item} className="flex gap-3 border-l-2 border-blue-700 bg-slate-800/60 p-3 text-sm leading-6 text-slate-200"><CheckCircle className="mt-1 shrink-0 text-emerald-400" size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>}
            {slide.groups && <dl className="mt-5 divide-y divide-slate-700 border-y border-slate-700">{slide.groups.map(([label, body]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"><dt className="text-sm font-bold text-blue-200">{label}</dt><dd className="text-sm leading-6 text-slate-300">{body}</dd></div>)}</dl>}
          </div>
          <aside className="w-full shrink-0 rounded-lg border border-emerald-800/70 bg-emerald-950/20 p-4 lg:w-72">
            <p className="text-sm font-bold text-emerald-200">{t.insightTitle}</p>
            <p className="mt-2 text-sm leading-6 text-emerald-100/80">{slide.insight}</p>
          </aside>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-700 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => setActiveIndex(index => Math.max(0, index - 1))} disabled={activeIndex === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={17} aria-hidden="true" />{t.previous}</button>
            <button type="button" onClick={() => setActiveIndex(index => Math.min(total - 1, index + 1))} disabled={activeIndex === total - 1} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-950 px-4 py-2 text-sm font-bold text-blue-100 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40">{t.next}<ArrowRight size={17} aria-hidden="true" /></button>
          </div>
          <a href="/ged?tab=documents" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"><FolderOpen size={17} aria-hidden="true" />{t.openGed}</a>
        </div>
        <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500"><BookOpen className="mt-0.5 shrink-0" size={15} aria-hidden="true" /><span>{t.sourceRule}</span></p>
      </div>
    </section>
  );
};

export default DirectorDocumentVisual;
