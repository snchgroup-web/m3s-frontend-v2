import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle,
  CircleDollarSign,
  Compass,
  FolderOpen,
  Layers3,
  ShieldCheck,
  Users,
  X
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Lecture visuelle dérivée',
    title: 'Note de synthèse stratégique V2',
    subtitle: 'Une lecture courte des repères stratégiques, sans remplacer le document maître.',
    sourceStatus: 'Source FR de travail',
    readOnly: 'Lecture seule',
    languageNote: 'Cette présentation synthétise une source française de travail. Les versions DE et EN facilitent la lecture mais ne constituent pas encore des traductions institutionnelles validées.',
    close: 'Fermer la lecture visuelle',
    previous: 'Vue précédente',
    next: 'Vue suivante',
    openGed: 'Consulter la source dans la GED',
    progress: 'Vue {current} sur {total}',
    slideLabel: 'Afficher la vue : {title}',
    insightTitle: 'Point de lecture',
    sourceRule: 'Source maîtresse : Note de synthèse stratégique V2. Toute décision reste soumise à validation humaine et aux documents directeurs applicables.',
    slides: [
      {
        title: 'Positionnement',
        summary: '2SG / M3S relie institution, social business, services, organisation et innovation numérique entre l’Afrique et l’Europe.',
        items: ['IA opérationnelle', 'Systèmes intelligents', 'Social business', 'Accompagnement', 'Innovation organisationnelle'],
        insight: 'Le positionnement est large ; son déploiement doit rester progressif et vérifiable.'
      },
      {
        title: 'Publics progressifs',
        summary: 'Les publics sont abordés par horizons afin de ne pas disperser les ressources.',
        groups: [
          ['Court terme', 'ONG, associations, petites structures, artisans, entrepreneurs et projets pilotes.'],
          ['Moyen terme', 'PME, NPO, coopératives, structures sociales et organisations diasporiques.'],
          ['Long terme', 'Institutions, réseaux, fédérations et programmes Afrique-Europe.']
        ],
        insight: 'Chaque élargissement dépend des preuves produites par les usages précédents.'
      },
      {
        title: 'Promesse vérifiable',
        summary: 'Chaque action, outil ou offre doit produire une amélioration concrète et observable.',
        items: ['Gagner du temps', 'Réduire les coûts', 'Améliorer la qualité', 'Renforcer sécurité et souveraineté', 'Créer des capacités de revenu'],
        insight: 'Le filtre de décision porte sur le temps, l’argent, la qualité, la sécurité et la capacité de revenu.'
      },
      {
        title: 'Piliers reliés',
        summary: 'Les piliers historiques restent distincts tout en contribuant à une même trajectoire.',
        groups: [
          ['ADMIN / ORG', 'Gouvernance, conformité et coordination.'],
          ['SOCIAL', 'Impact, accompagnement, solidarité et co-développement.'],
          ['BUSINESS / TRADE', 'Revenus, services, commerce, intermédiation et logistique.'],
          ['IMMO', 'Actifs, infrastructures, investissements et financement immobilier.'],
          ['TECH / DIGITAL / M3S', 'ERP, GED, données, IA, automatisation et knowledge management.']
        ],
        insight: 'Une offre commerciale lisible se construit au-dessus des fonctions ; elle ne les remplace pas.'
      },
      {
        title: 'Cycle de valorisation',
        summary: 'Un outil interne peut devenir une compétence, puis éventuellement un produit ou un service.',
        items: ['Besoin interne réel', 'Outil M3S', 'Usage terrain', 'Standardisation', 'Documentation', 'Packaging', 'Offre commerciale'],
        insight: 'La valeur doit être démontrée par l’usage avant toute industrialisation.'
      },
      {
        title: 'Garde-fous & décision',
        summary: 'La Note V2 reste un pont stratégique à valider, pas une autorisation de modifier toutes les sources.',
        items: ['Ne pas modifier directement les documents maîtres sans micro-lot', 'Ne pas confondre outil, pack, offre, canal et modèle économique', 'Conserver la taxonomie commerciale existante à ce stade', 'Valider la Note V2 avant l’alignement documentaire suivant'],
        insight: 'La prochaine décision porte sur la validation stratégique de la V2 et son rôle de base d’alignement.'
      }
    ]
  },
  EN: {
    eyebrow: 'Derived visual reading',
    title: 'Strategic summary note V2',
    subtitle: 'A concise reading of strategic references that does not replace the master document.',
    sourceStatus: 'Working French source',
    readOnly: 'Read only',
    languageNote: 'This presentation summarises a working French source. The DE and EN versions support reading but are not yet validated institutional translations.',
    close: 'Close visual reading',
    previous: 'Previous view',
    next: 'Next view',
    openGed: 'Open the source in the GED',
    progress: 'View {current} of {total}',
    slideLabel: 'Show view: {title}',
    insightTitle: 'Reading point',
    sourceRule: 'Master source: Strategic summary note V2. Every decision remains subject to human validation and the applicable governing documents.',
    slides: [
      { title: 'Positioning', summary: '2SG / M3S connects institution, social business, services, organisation and digital innovation between Africa and Europe.', items: ['Operational AI', 'Intelligent systems', 'Social business', 'Support', 'Organisational innovation'], insight: 'The positioning is broad; deployment must remain progressive and verifiable.' },
      { title: 'Progressive audiences', summary: 'Audiences are approached by horizon to avoid spreading resources too thinly.', groups: [['Short term', 'NGOs, associations, small organisations, artisans, entrepreneurs and pilot projects.'], ['Medium term', 'SMEs, NPOs, cooperatives, social organisations and diaspora organisations.'], ['Long term', 'Institutions, networks, federations and Africa-Europe programmes.']], insight: 'Each expansion depends on evidence produced by earlier uses.' },
      { title: 'Verifiable promise', summary: 'Every action, tool or offer must produce a concrete and observable improvement.', items: ['Save time', 'Reduce costs', 'Improve quality', 'Strengthen security and sovereignty', 'Create income capacity'], insight: 'The decision filter covers time, money, quality, security and income capacity.' },
      { title: 'Connected pillars', summary: 'The historical pillars remain distinct while contributing to one trajectory.', groups: [['ADMIN / ORG', 'Governance, compliance and coordination.'], ['SOCIAL', 'Impact, support, solidarity and co-development.'], ['BUSINESS / TRADE', 'Revenue, services, trade, intermediation and logistics.'], ['REAL ESTATE', 'Assets, infrastructure, investments and real-estate financing.'], ['TECH / DIGITAL / M3S', 'ERP, GED, data, AI, automation and knowledge management.']], insight: 'A readable commercial offer sits above the functions; it does not replace them.' },
      { title: 'Value cycle', summary: 'An internal tool may become a capability and, eventually, a product or service.', items: ['Real internal need', 'M3S tool', 'Field use', 'Standardisation', 'Documentation', 'Packaging', 'Commercial offer'], insight: 'Value must be demonstrated through use before industrialisation.' },
      { title: 'Guardrails & decision', summary: 'Note V2 remains a strategic bridge to validate, not permission to change every source.', items: ['Do not edit master documents directly without a dedicated micro-lot', 'Do not confuse tool, pack, offer, channel and business model', 'Keep the existing commercial taxonomy at this stage', 'Validate Note V2 before the next documentary alignment'], insight: 'The next decision concerns strategic validation of V2 and its role as an alignment baseline.' }
    ]
  },
  DE: {
    eyebrow: 'Abgeleitete visuelle Aufbereitung',
    title: 'Strategische Synthesenotiz V2',
    subtitle: 'Eine kurze Lektüre strategischer Orientierungspunkte, die das Masterdokument nicht ersetzt.',
    sourceStatus: 'Französische Arbeitsquelle',
    readOnly: 'Nur lesen',
    languageNote: 'Diese Präsentation fasst eine französische Arbeitsquelle zusammen. Die DE- und EN-Versionen dienen der Lektüre, sind aber noch keine validierten institutionellen Übersetzungen.',
    close: 'Visuelle Aufbereitung schließen',
    previous: 'Vorherige Ansicht',
    next: 'Nächste Ansicht',
    openGed: 'Quelle in der GED öffnen',
    progress: 'Ansicht {current} von {total}',
    slideLabel: 'Ansicht anzeigen: {title}',
    insightTitle: 'Lesehinweis',
    sourceRule: 'Maßgebliche Quelle: Strategische Synthesenotiz V2. Jede Entscheidung unterliegt weiterhin der menschlichen Validierung und den anwendbaren Leitdokumenten.',
    slides: [
      { title: 'Positionierung', summary: '2SG / M3S verbindet Institution, Social Business, Dienstleistungen, Organisation und digitale Innovation zwischen Afrika und Europa.', items: ['Operative KI', 'Intelligente Systeme', 'Social Business', 'Begleitung', 'Organisationsinnovation'], insight: 'Die Positionierung ist breit; die Umsetzung muss schrittweise und überprüfbar bleiben.' },
      { title: 'Schrittweise Zielgruppen', summary: 'Die Zielgruppen werden nach Zeithorizonten erschlossen, damit Ressourcen nicht verzettelt werden.', groups: [['Kurzfristig', 'NGO, Vereine, kleine Organisationen, Handwerksbetriebe, Unternehmende und Pilotprojekte.'], ['Mittelfristig', 'KMU, NPO, Genossenschaften, soziale Organisationen und Diasporaorganisationen.'], ['Langfristig', 'Institutionen, Netzwerke, Verbände und Afrika-Europa-Programme.']], insight: 'Jede Erweiterung hängt von den Nachweisen der vorherigen Anwendungen ab.' },
      { title: 'Überprüfbares Versprechen', summary: 'Jede Aktion, jedes Werkzeug und jedes Angebot muss eine konkrete und beobachtbare Verbesserung bewirken.', items: ['Zeit gewinnen', 'Kosten senken', 'Qualität verbessern', 'Sicherheit und Souveränität stärken', 'Einkommensmöglichkeiten schaffen'], insight: 'Der Entscheidungsfilter umfasst Zeit, Geld, Qualität, Sicherheit und Einkommensmöglichkeiten.' },
      { title: 'Verbundene Säulen', summary: 'Die historischen Säulen bleiben unterscheidbar und tragen zugleich zu einer gemeinsamen Entwicklung bei.', groups: [['ADMIN / ORG', 'Governance, Compliance und Koordination.'], ['SOCIAL', 'Wirkung, Begleitung, Solidarität und gemeinsame Entwicklung.'], ['BUSINESS / TRADE', 'Einnahmen, Dienstleistungen, Handel, Vermittlung und Logistik.'], ['IMMOBILIEN', 'Vermögenswerte, Infrastruktur, Investitionen und Immobilienfinanzierung.'], ['TECH / DIGITAL / M3S', 'ERP, GED, Daten, KI, Automatisierung und Wissensmanagement.']], insight: 'Ein verständliches kommerzielles Angebot liegt über den Funktionen; es ersetzt sie nicht.' },
      { title: 'Wertschöpfungszyklus', summary: 'Ein internes Werkzeug kann zu einer Fähigkeit und später zu einem Produkt oder einer Dienstleistung werden.', items: ['Realer interner Bedarf', 'M3S-Werkzeug', 'Praxiseinsatz', 'Standardisierung', 'Dokumentation', 'Packaging', 'Kommerzielles Angebot'], insight: 'Der Wert muss vor einer Industrialisierung durch Nutzung belegt werden.' },
      { title: 'Leitplanken & Entscheidung', summary: 'Die Notiz V2 bleibt eine zu validierende strategische Brücke und keine Erlaubnis, alle Quellen zu ändern.', items: ['Masterdokumente nur in einem eigenen Micro-Lot bearbeiten', 'Werkzeug, Paket, Angebot, Kanal und Geschäftsmodell nicht verwechseln', 'Die bestehende kommerzielle Taxonomie vorerst beibehalten', 'Notiz V2 vor der nächsten Dokumentausrichtung validieren'], insight: 'Die nächste Entscheidung betrifft die strategische Validierung der V2 und ihre Rolle als Ausrichtungsgrundlage.' }
    ]
  }
};

const ICONS = [Compass, Users, CircleDollarSign, Layers3, BriefcaseBusiness, ShieldCheck];
const interpolate = (template, values) => Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);

const StrategicSummaryVisual = ({ language = 'FR', onClose }) => {
  const t = COPY[language] || COPY.FR;
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = t.slides[activeIndex];
  const SlideIcon = ICONS[activeIndex];
  const total = t.slides.length;

  return (
    <section id="strategic-summary-visual" tabIndex={-1} className="scroll-mt-20 rounded-lg border border-blue-800 bg-slate-900 focus:outline-none" aria-labelledby="strategic-summary-title">
      <header className="border-b border-slate-700 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h3 id="strategic-summary-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{t.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label={t.close} title={t.close}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-700 bg-amber-950/60 px-3 py-1.5 text-xs font-semibold text-amber-100">{t.sourceStatus}</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300">{t.readOnly}</span>
        </div>
        <p className="mt-4 rounded-lg border border-amber-800/60 bg-amber-950/20 p-3 text-xs leading-5 text-amber-100/85">{t.languageNote}</p>
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
            {slide.groups && <dl className="mt-5 divide-y divide-slate-700 border-y border-slate-700">{slide.groups.map(([label, body]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"><dt className="text-sm font-bold text-blue-200">{label}</dt><dd className="text-sm leading-6 text-slate-300">{body}</dd></div>)}</dl>}
          </div>
          <aside className="w-full shrink-0 rounded-lg border border-emerald-800/70 bg-emerald-950/20 p-4 lg:w-72">
            <p className="text-sm font-bold text-emerald-200">{t.insightTitle}</p>
            <p className="mt-2 text-sm leading-6 text-emerald-100/80">{slide.insight}</p>
          </aside>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-700 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button type="button" onClick={() => setActiveIndex(index => Math.max(0, index - 1))} disabled={activeIndex === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-bold text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={17} aria-hidden="true" />{t.previous}</button>
            <button type="button" onClick={() => setActiveIndex(index => Math.min(total - 1, index + 1))} disabled={activeIndex === total - 1} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-950 px-4 py-2 text-sm font-bold text-blue-100 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-40">{t.next}<ArrowRight size={17} aria-hidden="true" /></button>
          </div>
          <a href="/ged?tab=documents&returnVisual=strategic-summary" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"><FolderOpen size={17} aria-hidden="true" />{t.openGed}</a>
        </div>
        <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500"><BookOpen className="mt-0.5 shrink-0" size={15} aria-hidden="true" /><span>{t.sourceRule}</span></p>
      </div>
    </section>
  );
};

export default StrategicSummaryVisual;
