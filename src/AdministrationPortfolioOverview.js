import React, { useState } from 'react';
import {
  BookOpenCheck,
  ChevronDown,
  FileCheck2,
  FolderKanban,
  Landmark,
  RefreshCw,
  Scale,
  Waves
} from 'lucide-react';

export const ADMINISTRATION_PORTFOLIO_AS_OF = '2026-08-16';

const COPY = {
  FR: {
    eyebrow: 'PORTEFEUILLE · POINTS SOURCÉS',
    title: 'Grands dossiers et chantiers',
    intro: "Cette vue rassemble les dossiers transversaux à piloter. Elle montre le dernier état documenté, pas un avancement supposé en temps réel.",
    asOf: 'Vue consolidée le',
    lastChecked: 'Dernière vérification',
    nextAction: 'Prochaine action',
    source: 'Source de l’état affiché',
    show: 'Afficher le point documenté',
    hide: 'Masquer le point documenté',
    protectedNotice: 'Les détails de ce dossier ne sont pas intégrés au navigateur. Ils devront être chargés depuis une source autorisée.',
    confidentiality: { internal: 'Interne', restricted: 'Restreint' },
    items: {
      tfx: {
        type: 'Outil transversal',
        title: 'TFX · taux de change',
        status: 'Règle documentée · raccordement à poursuivre',
        summary: 'Le taux courant sert d’indicateur ; chaque opération conserve le taux réellement appliqué, sa date et sa source.',
        next: 'Raccorder la source TFX courante sans réécrire les taux historiques des prestataires.',
        source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md'
      },
      legal: {
        type: 'Dossier protégé',
        title: 'LEGAL · accès restreint',
        status: 'Métadonnées protégées',
        summary: 'Le détail du dossier reste conservé hors du bundle client.'
      },
      windows: {
        type: 'Chantier Villa LR1',
        title: 'Avants de fenêtres',
        status: 'Étanchéité confirmée · peinture restante',
        summary: 'La pluie a servi de contrôle en conditions réelles et aucune infiltration n’a été signalée. Le délai annoncé n’a pas été respecté ; la peinture reste la dernière finition.',
        next: 'Achever la peinture, indexer les photos et vidéos dans la GED, puis consigner les réserves éventuelles, la réception finale et le statut du solde.',
        source: 'Point terrain Cheikh / Ibou du 16-08-2026 · environ 15 photos et vidéos à indexer'
      },
      water: {
        type: 'Incident Villa LR1',
        title: 'Mini-forage · alimentation en eau',
        status: 'Eau rétablie · protection à terminer',
        summary: 'Le mini-forage a été exécuté dans le délai, l’eau est revenue et le débit a été contrôlé dans la villa. La satisfaction sur cette intervention est confirmée.',
        next: 'Faire réaliser par le maçon les deux rangées de briques de protection de chaque côté et poser un couvercle, puis documenter et réceptionner cette finition séparée.',
        source: 'Point terrain Cheikh / Ibou du 16-08-2026 · preuves photos et vidéos à indexer'
      },
      directors: {
        type: 'Gouvernance documentaire',
        title: 'Documents directeurs',
        status: 'Inventaire à consolider',
        summary: 'Les sources stratégiques courantes sont identifiées, mais leurs preuves de validation, signature ou adoption restent distinctes.',
        next: 'Compléter les métadonnées et preuves manquantes sans promouvoir ni réécrire les sources.',
        source: 'M3S_JOURNAL_DE_BORD_2026-08-14.md'
      },
      references: {
        type: 'Gouvernance documentaire',
        title: 'Référentiels fonctionnels',
        status: 'Alignement à planifier',
        summary: 'Les principaux référentiels existent ; plusieurs sont antérieurs aux derniers documents stratégiques.',
        next: 'Établir l’ordre d’alignement, le propriétaire, la version maîtresse et la preuve de validation de chaque référentiel.',
        source: 'M3S_PLAN_ALIGNEMENT_REFERENTIEL_FONCTIONNEL_2026-07-05.md · contrôlé le 14-08-2026'
      },
      daily: {
        type: 'Pilotage quotidien',
        title: 'Daily Intelligence Dashboard',
        status: 'Source maîtresse à stabiliser',
        summary: 'Les livraisons existent, mais mémoire, agenda, journal et priorités doivent provenir d’un état commun et actuel.',
        next: 'Raccorder les composantes éditoriales à une source maîtresse unique avant toute nouvelle extension.',
        source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md'
      }
    }
  },
  EN: {
    eyebrow: 'PORTFOLIO · SOURCED CHECKPOINTS',
    title: 'Major files and workstreams',
    intro: 'This view brings together cross-functional matters to steer. It shows the latest documented state, not assumed real-time progress.',
    asOf: 'View consolidated on',
    lastChecked: 'Last checked',
    nextAction: 'Next action',
    source: 'Source of the displayed state',
    show: 'Show documented checkpoint',
    hide: 'Hide documented checkpoint',
    protectedNotice: 'Details for this file are not embedded in the browser. They must be loaded from an authorised source.',
    confidentiality: { internal: 'Internal', restricted: 'Restricted' },
    items: {
      tfx: { type: 'Cross-functional tool', title: 'TFX · exchange rates', status: 'Rule documented · connection pending', summary: 'The current rate is an indicator; each transaction keeps the rate actually applied, its date and its source.', next: 'Connect the current TFX source without rewriting providers’ historical rates.', source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md' },
      legal: { type: 'Protected file', title: 'LEGAL · restricted access', status: 'Protected metadata', summary: 'The detailed file remains outside the client bundle.' },
      windows: { type: 'Villa LR1 workstream', title: 'Window awnings', status: 'Watertightness confirmed · painting pending', summary: 'Rain provided a real-condition check and no water ingress was reported. The announced deadline was missed; painting is the final remaining finish.', next: 'Complete the painting, index the photos and videos in the DMS, then record any reservations, final acceptance and balance status.', source: 'Cheikh / Ibou field checkpoint, 16 Aug 2026 · about 15 photos and videos to index' },
      water: { type: 'Villa LR1 incident', title: 'Mini-borehole · water supply', status: 'Water restored · protection pending', summary: 'The mini-borehole was completed on time, water supply was restored and flow was checked throughout the villa. Satisfaction with this intervention is confirmed.', next: 'Have the mason build two protective brick rows on each side and install a cover, then document and accept this separate finishing work.', source: 'Cheikh / Ibou field checkpoint, 16 Aug 2026 · photo and video evidence to index' },
      directors: { type: 'Document governance', title: 'Governing documents', status: 'Inventory to consolidate', summary: 'Current strategic sources are identified, while evidence of approval, signature or adoption remains separate.', next: 'Complete missing metadata and evidence without promoting or rewriting sources.', source: 'M3S_JOURNAL_DE_BORD_2026-08-14.md' },
      references: { type: 'Document governance', title: 'Functional reference documents', status: 'Alignment to plan', summary: 'The main reference documents exist; several predate the latest strategic documents.', next: 'Set the alignment order, owner, master version and approval evidence for each reference document.', source: 'M3S_PLAN_ALIGNEMENT_REFERENTIEL_FONCTIONNEL_2026-07-05.md · checked 2026-08-14' },
      daily: { type: 'Daily steering', title: 'Daily Intelligence Dashboard', status: 'Master source to stabilise', summary: 'Deliveries exist, but memory, agenda, journal and priorities should come from one shared current state.', next: 'Connect editorial components to a single master source before any further extension.', source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md' }
    }
  },
  DE: {
    eyebrow: 'PORTFOLIO · BELEGTE STÄNDE',
    title: 'Wichtige Akten und Vorhaben',
    intro: 'Diese Ansicht bündelt funktionsübergreifend zu steuernde Themen. Sie zeigt den letzten dokumentierten Stand, keinen angenommenen Echtzeitfortschritt.',
    asOf: 'Ansicht konsolidiert am',
    lastChecked: 'Zuletzt geprüft',
    nextAction: 'Nächster Schritt',
    source: 'Quelle des angezeigten Stands',
    show: 'Dokumentierten Stand anzeigen',
    hide: 'Dokumentierten Stand ausblenden',
    protectedNotice: 'Einzelheiten dieser Akte sind nicht im Browser eingebettet. Sie müssen aus einer autorisierten Quelle geladen werden.',
    confidentiality: { internal: 'Intern', restricted: 'Eingeschränkt' },
    items: {
      tfx: { type: 'Funktionsübergreifendes Werkzeug', title: 'TFX · Wechselkurse', status: 'Regel dokumentiert · Anbindung ausstehend', summary: 'Der aktuelle Kurs dient als Kennzahl; jede Transaktion behält den tatsächlich angewandten Kurs, sein Datum und seine Quelle.', next: 'Die aktuelle TFX-Quelle anbinden, ohne historische Dienstleisterkurse umzuschreiben.', source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md' },
      legal: { type: 'Geschützte Akte', title: 'LEGAL · eingeschränkter Zugriff', status: 'Geschützte Metadaten', summary: 'Die detaillierte Akte bleibt außerhalb des Client-Bundles.' },
      windows: { type: 'Vorhaben Villa LR1', title: 'Fenstervordächer', status: 'Dichtheit bestätigt · Anstrich ausstehend', summary: 'Regen diente als Prüfung unter realen Bedingungen; es wurde kein Wassereintritt gemeldet. Die angekündigte Frist wurde überschritten, der Anstrich bleibt die letzte Ausführung.', next: 'Anstrich abschließen, Fotos und Videos im DMS indexieren und danach mögliche Vorbehalte, Endabnahme und Restzahlungsstatus dokumentieren.', source: 'Geländestand Cheikh / Ibou vom 16.08.2026 · rund 15 Fotos und Videos zu indexieren' },
      water: { type: 'Vorfall Villa LR1', title: 'Mini-Bohrung · Wasserversorgung', status: 'Wasser wiederhergestellt · Schutz ausstehend', summary: 'Die Mini-Bohrung wurde fristgerecht ausgeführt, die Wasserversorgung ist wiederhergestellt und der Durchfluss wurde in der Villa geprüft. Die Zufriedenheit mit dieser Intervention ist bestätigt.', next: 'Durch den Maurer auf beiden Seiten je zwei schützende Ziegelreihen und eine Abdeckung erstellen lassen; diese getrennte Abschlussarbeit anschließend dokumentieren und abnehmen.', source: 'Geländestand Cheikh / Ibou vom 16.08.2026 · Foto- und Videonachweise zu indexieren' },
      directors: { type: 'Dokumentensteuerung', title: 'Leitende Dokumente', status: 'Inventar zu konsolidieren', summary: 'Die aktuellen strategischen Quellen sind identifiziert; Nachweise für Freigabe, Unterzeichnung oder Annahme bleiben getrennt.', next: 'Fehlende Metadaten und Nachweise ergänzen, ohne Quellen hochzustufen oder umzuschreiben.', source: 'M3S_JOURNAL_DE_BORD_2026-08-14.md' },
      references: { type: 'Dokumentensteuerung', title: 'Funktionale Referenzdokumente', status: 'Ausrichtung zu planen', summary: 'Die wichtigsten Referenzdokumente bestehen; mehrere sind älter als die neuesten strategischen Dokumente.', next: 'Reihenfolge der Ausrichtung, Verantwortung, Masterversion und Freigabenachweis je Referenz festlegen.', source: 'M3S_PLAN_ALIGNEMENT_REFERENTIEL_FONCTIONNEL_2026-07-05.md · geprüft am 14.08.2026' },
      daily: { type: 'Tägliche Steuerung', title: 'Daily Intelligence Dashboard', status: 'Masterquelle zu stabilisieren', summary: 'Lieferungen bestehen, doch Gedächtnis, Agenda, Journal und Prioritäten sollen aus einem gemeinsamen aktuellen Stand stammen.', next: 'Redaktionelle Komponenten vor jeder Erweiterung an eine einzige Masterquelle anbinden.', source: 'M3S_JOURNAL_DE_BORD_2026-08-10.md' }
    }
  }
};

const ITEMS = [
  { id: 'tfx', checkedOn: '2026-08-10', icon: RefreshCw, confidentiality: 'internal', tone: 'border-cyan-800 bg-cyan-950/20 text-cyan-300' },
  { id: 'legal', checkedOn: null, icon: Scale, confidentiality: 'restricted', tone: 'border-amber-800 bg-amber-950/20 text-amber-300' },
  { id: 'windows', checkedOn: '2026-08-16', icon: Landmark, confidentiality: 'internal', tone: 'border-blue-800 bg-blue-950/20 text-blue-300' },
  { id: 'water', checkedOn: '2026-08-16', icon: Waves, confidentiality: 'internal', tone: 'border-cyan-800 bg-cyan-950/20 text-cyan-300' },
  { id: 'directors', checkedOn: '2026-08-14', icon: FileCheck2, confidentiality: 'internal', tone: 'border-violet-800 bg-violet-950/20 text-violet-300' },
  { id: 'references', checkedOn: '2026-08-14', icon: BookOpenCheck, confidentiality: 'internal', tone: 'border-emerald-800 bg-emerald-950/20 text-emerald-300' },
  { id: 'daily', checkedOn: '2026-08-10', icon: FolderKanban, confidentiality: 'internal', tone: 'border-slate-600 bg-slate-900/35 text-slate-300' }
];

const formatDate = (value, language) => new Intl.DateTimeFormat(
  language === 'DE' ? 'de-CH' : language === 'EN' ? 'en-GB' : 'fr-CH',
  { day: '2-digit', month: '2-digit', year: 'numeric' }
).format(new Date(`${value}T12:00:00`));

const AdministrationPortfolioOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="administration-portfolio" className="scroll-mt-28 py-1" aria-labelledby="administration-portfolio-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
          <h3 id="administration-portfolio-title" className="mt-2 text-xl font-semibold text-slate-100">{t.title}</h3>
          <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <p className="shrink-0 text-xs font-semibold text-slate-400">{t.asOf} {formatDate(ADMINISTRATION_PORTFOLIO_AS_OF, language)}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-12">
        {ITEMS.map(({ id, checkedOn, icon: Icon, confidentiality, tone }, index) => {
          const item = t.items[id];
          const expanded = expandedId === id;
          const isRestricted = confidentiality === 'restricted';
          const detailId = `portfolio-${id}-details`;

          return (
            <article key={id} className={`flex min-h-64 flex-col rounded-lg border border-slate-700 bg-slate-900/45 p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-950/20 ${index < 3 ? 'xl:col-span-4' : 'xl:col-span-3'}`}>
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${tone}`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-300">{t.confidentiality[confidentiality]}</span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase text-slate-400">{item.type}</p>
              <h4 className="mt-1 text-base font-semibold text-slate-100">{item.title}</h4>
              <p className="mt-2 text-sm font-semibold leading-5 text-blue-200">{item.status}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{item.summary}</p>
              <div className="mt-4 border-t border-slate-700 pt-3">
                {!isRestricted && <p className="text-xs text-slate-400"><span className="font-semibold text-slate-300">{t.lastChecked} :</span> {formatDate(checkedOn, language)}</p>}
                {isRestricted ? (
                  <p className="rounded-md border border-amber-800/70 bg-amber-950/20 p-3 text-xs leading-5 text-amber-100">{t.protectedNotice}</p>
                ) : <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={detailId}
                  onClick={() => setExpandedId(current => current === id ? null : id)}
                  className="mt-3 inline-flex min-h-10 w-full items-center justify-between gap-3 rounded-md border border-slate-600 bg-slate-800 px-3 text-left text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <span>{expanded ? t.hide : t.show}</span>
                  <ChevronDown size={17} className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>}
              </div>
              {expanded && !isRestricted && (
                <div id={detailId} className="mt-3 space-y-3 rounded-md border border-slate-700 bg-slate-950/45 p-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">{t.nextAction}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-200">{item.next}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-400">{t.source}</p>
                    <p className="mt-1 break-words text-xs leading-5 text-slate-400">{item.source}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AdministrationPortfolioOverview;
