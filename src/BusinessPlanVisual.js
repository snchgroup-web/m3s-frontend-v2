import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  CircleDollarSign,
  FolderOpen,
  Gauge,
  Landmark,
  PackageCheck,
  Route,
  ShieldCheck,
  Target,
  Users,
  X
} from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'Parcours économique dérivé',
    title: 'Business Plan 2SG V8',
    subtitle: 'Une lecture pilotable de la trajectoire économique, sans publier de chiffres non consolidés ni remplacer les sources financières.',
    sourceStatus: 'Base stratégique et financière de travail',
    substanceStatus: 'Fond validé',
    figuresStatus: 'Chiffrage à tester',
    languageNote: 'La source maîtresse est rédigée en français. Les lectures DE et EN facilitent la compréhension, mais ne constituent pas encore des traductions institutionnelles validées.',
    financialNote: 'Aucun montant consolidé n’est publié dans cette présentation. Les prix, marges, besoins de financement et trajectoires de trésorerie doivent être testés dans le tableau financier en CFA et CHF avant tout usage externe.',
    close: 'Fermer le parcours Business Plan',
    previous: 'Vue précédente',
    next: 'Vue suivante',
    openGed: 'Consulter la source dans la GED',
    progress: 'Vue {current} sur {total}',
    slideLabel: 'Afficher la vue : {title}',
    insightTitle: 'Décision de pilotage',
    sourceRule: 'Sources de référence : Business Plan V8, Business Model V2, tableau financier de travail et documents directeurs applicables. Toute décision financière reste soumise à validation humaine.',
    slides: [
      {
        title: 'Trajectoire',
        summary: 'La V8 traduit l’offre enrichie en trajectoire économique progressive, sans rechercher une croissance rapide non maîtrisée.',
        items: ['Stabiliser', 'Consolider', 'Rentabiliser', 'Accélérer après preuves'],
        insight: 'Le passage à l’étape suivante dépend de la capacité réelle d’exécution et des résultats observés.'
      },
      {
        title: 'Marchés & segments',
        summary: 'Les segments distinguent les usages individuels, les prestations aux organisations, les programmes et les partenariats.',
        groups: [
          ['B2C', 'Créateurs, artisans, indépendants et porteurs de projets.'],
          ['B2B', 'PME, ONG, associations, entreprises et structures sociales.'],
          ['B2B2C', 'Organisations qui accompagnent leurs bénéficiaires.'],
          ['Partenariats', 'Fondations, diaspora, bailleurs et partenaires terrain.']
        ],
        insight: 'Chaque segment exige une offre, un canal, un coût de livraison et une preuve de valeur distincts.'
      },
      {
        title: 'Proposition de valeur',
        summary: 'La promesse économique doit rester concrète, observable et adaptée aux capacités démontrées.',
        items: ['Organisation intelligente', 'IA opérationnelle', 'Social business', 'Relation client', 'E-commerce utile', 'Sécurité et souveraineté'],
        insight: 'Une offre est prioritaire lorsqu’elle améliore le temps, les coûts, la qualité, la sécurité ou la capacité de revenu.'
      },
      {
        title: 'Packs commerciaux',
        summary: 'Les packs rendent les briques existantes compréhensibles et vendables sans remplacer la taxonomie des offres.',
        groups: [
          ['Organisation intelligente', 'Système, automatisation légère, documentation et formation initiale.'],
          ['Automatisation métier', 'Workflows, agent simple, dashboards et amélioration continue.'],
          ['IA souveraine', 'Modèles locaux, confidentialité, accompagnement et maintenance.'],
          ['Formation IA', 'Ateliers, coaching et programmes pour organisations.'],
          ['Social business', 'Compétences, nouveaux revenus, kits et accompagnement.'],
          ['E-commerce', 'Boutique, catalogue, commandes, artisans et support.']
        ],
        insight: 'Les packs prioritaires doivent être sélectionnés puis chiffrés avant tout lancement commercial.'
      },
      {
        title: 'Revenus & coûts',
        summary: 'La V8 définit les familles économiques à mesurer, mais ne crée pas de nouveaux chiffres.',
        groups: [
          ['Revenus', 'Prestations, formations, outils, commerce, partenariats et programmes d’impact.'],
          ['Coûts humains', 'Accompagnement, formation, support, coordination et production.'],
          ['Coûts numériques', 'Hébergement, IA, licences, sécurité et maintenance.'],
          ['Coûts commerciaux', 'Contenus, prospection, marketing, logistique, retours et SAV.']
        ],
        insight: 'Le prochain chiffrage doit distinguer revenus récurrents, revenus projet, commerce, programmes et partenariats.'
      },
      {
        title: 'Scénarios',
        summary: 'Trois scénarios permettent de relier l’ambition à des preuves et à une capacité opérationnelle mesurable.',
        groups: [
          ['Prudent', 'Stabiliser les prestations simples, documenter l’offre et tester les prix.'],
          ['Central', 'Structurer les packs, la relation client, l’e-commerce pilote et les premiers outils valorisables.'],
          ['Ambitieux', 'Déployer partenariats, programmes B2B2C, IA souveraine et services externalisés après preuves.']
        ],
        insight: 'Le scénario central n’est crédible qu’après consolidation des hypothèses de prix, marge, récurrence et capacité.'
      },
      {
        title: 'Investissements',
        summary: 'Les priorités d’investissement doivent renforcer l’exécution réelle avant l’image ou l’expansion.',
        groups: [
          ['Stabilisation', 'Pilotage, documentation, offre claire, premiers clients et formation interne.'],
          ['Consolidation', 'Automatisation, relation client, e-commerce pilote, support et tableau financier fiable.'],
          ['Accélération', 'IA souveraine, partenariats, programmes, packaging et présentation financeurs.']
        ],
        insight: 'Le besoin de financement se déduit des hypothèses testées ; il ne doit pas être inventé dans la présentation.'
      },
      {
        title: 'Garde-fous & décisions',
        summary: 'La V8 est une base de cadrage économique validée sur le fond, pas encore une version financeur.',
        items: ['Chiffrer les packs prioritaires', 'Relier les hypothèses au tableau CFA / CHF', 'Isoler les outils internes avant toute promesse produit', 'Limiter les promesses aux capacités démontrées', 'Conserver la taxonomie existante', 'Préparer ensuite une version externe contrôlée'],
        insight: 'La décision suivante porte sur les packs à chiffrer et les hypothèses à tester dans le tableau financier.'
      }
    ]
  },
  EN: {
    eyebrow: 'Derived economic journey',
    title: '2SG Business Plan V8',
    subtitle: 'A pilotable reading of the economic trajectory without publishing unconsolidated figures or replacing financial sources.',
    sourceStatus: 'Strategic and financial working baseline',
    substanceStatus: 'Substance validated',
    figuresStatus: 'Figures to be tested',
    languageNote: 'The master source is written in French. The DE and EN readings support understanding but are not yet validated institutional translations.',
    financialNote: 'No consolidated amount is published in this presentation. Prices, margins, funding needs and cash-flow trajectories must be tested in the CFA and CHF financial workbook before external use.',
    close: 'Close Business Plan journey',
    previous: 'Previous view',
    next: 'Next view',
    openGed: 'Open the source in the GED',
    progress: 'View {current} of {total}',
    slideLabel: 'Show view: {title}',
    insightTitle: 'Steering decision',
    sourceRule: 'Reference sources: Business Plan V8, Business Model V2, financial working table and applicable governing documents. Every financial decision remains subject to human validation.',
    slides: [
      { title: 'Trajectory', summary: 'V8 turns the enriched offer into a progressive economic trajectory without seeking uncontrolled rapid growth.', items: ['Stabilise', 'Consolidate', 'Reach profitability', 'Accelerate after evidence'], insight: 'Moving to the next stage depends on actual delivery capacity and observed results.' },
      { title: 'Markets & segments', summary: 'Segments distinguish individual uses, services to organisations, programmes and partnerships.', groups: [['B2C', 'Creators, artisans, independent workers and project holders.'], ['B2B', 'SMEs, NGOs, associations, companies and social organisations.'], ['B2B2C', 'Organisations supporting their beneficiaries.'], ['Partnerships', 'Foundations, diaspora, donors and field partners.']], insight: 'Each segment requires a distinct offer, channel, delivery cost and proof of value.' },
      { title: 'Value proposition', summary: 'The economic promise must remain concrete, observable and aligned with demonstrated capabilities.', items: ['Intelligent organisation', 'Operational AI', 'Social business', 'Customer relations', 'Useful e-commerce', 'Security and sovereignty'], insight: 'An offer is a priority when it improves time, cost, quality, security or income capacity.' },
      { title: 'Commercial packs', summary: 'Packs make existing building blocks understandable and sellable without replacing the offer taxonomy.', groups: [['Intelligent organisation', 'System, light automation, documentation and initial training.'], ['Business automation', 'Workflows, simple agent, dashboards and continuous improvement.'], ['Sovereign AI', 'Local models, confidentiality, support and maintenance.'], ['AI training', 'Workshops, coaching and programmes for organisations.'], ['Social business', 'Skills, new income, kits and support.'], ['E-commerce', 'Shop, catalogue, orders, artisans and support.']], insight: 'Priority packs must be selected and costed before any commercial launch.' },
      { title: 'Revenue & costs', summary: 'V8 defines the economic families to measure but creates no new figures.', groups: [['Revenue', 'Services, training, tools, trade, partnerships and impact programmes.'], ['Human costs', 'Support, training, coordination and production.'], ['Digital costs', 'Hosting, AI, licences, security and maintenance.'], ['Commercial costs', 'Content, prospecting, marketing, logistics, returns and after-sales service.']], insight: 'The next costing must separate recurring, project, trade, programme and partnership revenue.' },
      { title: 'Scenarios', summary: 'Three scenarios connect ambition with evidence and measurable operating capacity.', groups: [['Prudent', 'Stabilise simple services, document the offer and test prices.'], ['Central', 'Structure packs, customer relations, pilot e-commerce and the first tools with value potential.'], ['Ambitious', 'Deploy partnerships, B2B2C programmes, sovereign AI and outsourced services after evidence.']], insight: 'The central scenario is credible only after price, margin, recurrence and capacity assumptions are consolidated.' },
      { title: 'Investments', summary: 'Investment priorities must strengthen actual delivery before image or expansion.', groups: [['Stabilisation', 'Steering, documentation, clear offer, first clients and internal training.'], ['Consolidation', 'Automation, customer relations, pilot e-commerce, support and a reliable financial table.'], ['Acceleration', 'Sovereign AI, partnerships, programmes, packaging and funder presentation.']], insight: 'Funding needs derive from tested assumptions; they must not be invented in the presentation.' },
      { title: 'Guardrails & decisions', summary: 'V8 is an economic working baseline validated in substance, not yet a funder version.', items: ['Cost priority packs', 'Connect assumptions to the CFA / CHF table', 'Isolate internal tools before product promises', 'Limit promises to proven capabilities', 'Keep the existing taxonomy', 'Then prepare a controlled external version'], insight: 'The next decision concerns which packs to cost and which assumptions to test in the financial table.' }
    ]
  },
  DE: {
    eyebrow: 'Abgeleiteter wirtschaftlicher Pfad',
    title: '2SG-Businessplan V8',
    subtitle: 'Eine steuerbare Lektüre der wirtschaftlichen Entwicklung, ohne unbestätigte Zahlen zu veröffentlichen oder Finanzquellen zu ersetzen.',
    sourceStatus: 'Strategische und finanzielle Arbeitsgrundlage',
    substanceStatus: 'Inhalt validiert',
    figuresStatus: 'Zahlen zu prüfen',
    languageNote: 'Die maßgebliche Quelle ist auf Französisch verfasst. Die DE- und EN-Fassungen erleichtern die Lektüre, sind aber noch keine validierten institutionellen Übersetzungen.',
    financialNote: 'In dieser Präsentation werden keine konsolidierten Beträge veröffentlicht. Preise, Margen, Finanzierungsbedarf und Liquiditätsverläufe müssen vor externer Nutzung in der Finanztabelle in CFA und CHF geprüft werden.',
    close: 'Businessplan-Pfad schließen',
    previous: 'Vorherige Ansicht',
    next: 'Nächste Ansicht',
    openGed: 'Quelle in der GED öffnen',
    progress: 'Ansicht {current} von {total}',
    slideLabel: 'Ansicht anzeigen: {title}',
    insightTitle: 'Steuerungsentscheidung',
    sourceRule: 'Referenzquellen: Businessplan V8, Geschäftsmodell V2, finanzielle Arbeitstabelle und anwendbare Leitdokumente. Jede finanzielle Entscheidung bleibt der menschlichen Validierung unterstellt.',
    slides: [
      { title: 'Entwicklungspfad', summary: 'V8 überführt das erweiterte Angebot in einen schrittweisen wirtschaftlichen Pfad, ohne unkontrolliertes schnelles Wachstum anzustreben.', items: ['Stabilisieren', 'Konsolidieren', 'Rentabilität erreichen', 'Nach Nachweisen beschleunigen'], insight: 'Der Übergang zur nächsten Stufe hängt von der tatsächlichen Umsetzungskapazität und den beobachteten Ergebnissen ab.' },
      { title: 'Märkte & Segmente', summary: 'Die Segmente unterscheiden individuelle Nutzungen, Leistungen für Organisationen, Programme und Partnerschaften.', groups: [['B2C', 'Kreative, Handwerksbetriebe, Selbstständige und Projekttragende.'], ['B2B', 'KMU, NGO, Vereine, Unternehmen und soziale Organisationen.'], ['B2B2C', 'Organisationen, die ihre Begünstigten begleiten.'], ['Partnerschaften', 'Stiftungen, Diaspora, Förderer und Partner vor Ort.']], insight: 'Jedes Segment benötigt ein eigenes Angebot, einen Kanal, Lieferkosten und einen Wertnachweis.' },
      { title: 'Wertangebot', summary: 'Das wirtschaftliche Versprechen muss konkret, beobachtbar und an nachgewiesene Fähigkeiten angepasst bleiben.', items: ['Intelligente Organisation', 'Operative KI', 'Social Business', 'Kundenbeziehungen', 'Nützlicher E-Commerce', 'Sicherheit und Souveränität'], insight: 'Ein Angebot hat Priorität, wenn es Zeit, Kosten, Qualität, Sicherheit oder Einkommensmöglichkeiten verbessert.' },
      { title: 'Angebotspakete', summary: 'Pakete machen bestehende Bausteine verständlich und verkäuflich, ohne die Angebotstaxonomie zu ersetzen.', groups: [['Intelligente Organisation', 'System, leichte Automatisierung, Dokumentation und Erstschulung.'], ['Prozessautomatisierung', 'Workflows, einfacher Agent, Dashboards und laufende Verbesserung.'], ['Souveräne KI', 'Lokale Modelle, Vertraulichkeit, Begleitung und Wartung.'], ['KI-Schulung', 'Workshops, Coaching und Programme für Organisationen.'], ['Social Business', 'Kompetenzen, neue Einkommen, Kits und Begleitung.'], ['E-Commerce', 'Shop, Katalog, Bestellungen, Handwerksbetriebe und Support.']], insight: 'Prioritäre Pakete müssen vor jedem Marktstart ausgewählt und kalkuliert werden.' },
      { title: 'Erlöse & Kosten', summary: 'V8 definiert die zu messenden wirtschaftlichen Familien, erzeugt aber keine neuen Zahlen.', groups: [['Erlöse', 'Leistungen, Schulungen, Werkzeuge, Handel, Partnerschaften und Wirkungsprogramme.'], ['Personalkosten', 'Begleitung, Schulung, Koordination und Produktion.'], ['Digitale Kosten', 'Hosting, KI, Lizenzen, Sicherheit und Wartung.'], ['Vertriebskosten', 'Inhalte, Akquise, Marketing, Logistik, Retouren und Kundendienst.']], insight: 'Die nächste Kalkulation muss wiederkehrende, projektbezogene, Handels-, Programm- und Partnerschaftserlöse trennen.' },
      { title: 'Szenarien', summary: 'Drei Szenarien verbinden Ambition mit Nachweisen und messbarer Umsetzungskapazität.', groups: [['Vorsichtig', 'Einfache Leistungen stabilisieren, Angebot dokumentieren und Preise testen.'], ['Zentral', 'Pakete, Kundenbeziehungen, Pilot-E-Commerce und erste verwertbare Werkzeuge strukturieren.'], ['Ambitioniert', 'Partnerschaften, B2B2C-Programme, souveräne KI und ausgelagerte Dienste nach Nachweisen ausbauen.']], insight: 'Das zentrale Szenario ist erst nach Konsolidierung der Preis-, Margen-, Wiederholungs- und Kapazitätsannahmen belastbar.' },
      { title: 'Investitionen', summary: 'Investitionsprioritäten müssen die reale Umsetzung vor Außendarstellung oder Expansion stärken.', groups: [['Stabilisierung', 'Steuerung, Dokumentation, klares Angebot, erste Kundschaft und interne Schulung.'], ['Konsolidierung', 'Automatisierung, Kundenbeziehungen, Pilot-E-Commerce, Support und verlässliche Finanztabelle.'], ['Beschleunigung', 'Souveräne KI, Partnerschaften, Programme, Packaging und Präsentation für Finanzierende.']], insight: 'Der Finanzierungsbedarf ergibt sich aus geprüften Annahmen und darf nicht in der Präsentation erfunden werden.' },
      { title: 'Leitplanken & Entscheidungen', summary: 'V8 ist eine inhaltlich validierte wirtschaftliche Arbeitsgrundlage, aber noch keine Fassung für Finanzierende.', items: ['Prioritäre Pakete kalkulieren', 'Annahmen mit der CFA-/CHF-Tabelle verbinden', 'Interne Werkzeuge vor Produktversprechen abgrenzen', 'Versprechen auf nachgewiesene Fähigkeiten begrenzen', 'Bestehende Taxonomie beibehalten', 'Danach kontrollierte externe Fassung vorbereiten'], insight: 'Die nächste Entscheidung betrifft die zu kalkulierenden Pakete und die in der Finanztabelle zu prüfenden Annahmen.' }
    ]
  }
};

const ICONS = [Route, Users, Target, PackageCheck, CircleDollarSign, Gauge, Landmark, ShieldCheck];
const interpolate = (template, values) => Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, value), template);

const BusinessPlanVisual = ({ language = 'FR', onClose }) => {
  const t = COPY[language] || COPY.FR;
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = t.slides[activeIndex];
  const SlideIcon = ICONS[activeIndex];
  const total = t.slides.length;

  return (
    <section id="business-plan-visual" className="scroll-mt-20 rounded-lg border border-blue-800 bg-slate-900" aria-labelledby="business-plan-visual-title">
      <header className="border-b border-slate-700 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h3 id="business-plan-visual-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{t.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label={t.close} title={t.close}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-blue-700 bg-blue-950/60 px-3 py-1.5 text-xs font-semibold text-blue-100">{t.sourceStatus}</span>
          <span className="rounded-full border border-emerald-700 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-100">{t.substanceStatus}</span>
          <span className="rounded-full border border-amber-700 bg-amber-950/60 px-3 py-1.5 text-xs font-semibold text-amber-100">{t.figuresStatus}</span>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <p className="rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-xs leading-5 text-slate-300">{t.languageNote}</p>
          <p className="rounded-lg border border-amber-800/60 bg-amber-950/20 p-3 text-xs leading-5 text-amber-100/85">{t.financialNote}</p>
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

export default BusinessPlanVisual;
