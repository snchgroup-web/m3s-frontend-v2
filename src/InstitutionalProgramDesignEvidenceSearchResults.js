import React from 'react';
import { AlertTriangle, Archive, CheckCircle2, FileSearch, FolderLock, SearchCheck, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const RESULTS = [
  {
    id: 'CON-01',
    name: text('Préparation entrepreneuriale et personnelle · mindset', 'Entrepreneurial and personal readiness · mindset', 'Unternehmerische und persönliche Vorbereitung · Mindset'),
    status: 'stopped',
    families: '0/3',
    occurrences: 0,
    note: text('Arrêt appliqué avant parcours du dossier restreint ; emplacement exact et autorisation nominative absents.', 'Stop applied before traversing the restricted file; exact location and named authorisation are absent.', 'Stopp vor Durchsicht der eingeschränkten Akte angewendet; genauer Ablageort und namentliche Autorisierung fehlen.'),
    references: []
  },
  {
    id: 'CON-02',
    name: text('Brainstorming et orientations', 'Brainstorming and direction', 'Brainstorming und Ausrichtung'),
    status: 'indexed',
    families: '3/3',
    occurrences: 111,
    note: text('Les trois filtres de familles retournent des références candidates ; leur contenu et leur pertinence ne sont pas contrôlés.', 'All three family filters return candidate references; their content and relevance are not reviewed.', 'Alle drei Familienfilter liefern Kandidatenreferenzen; Inhalt und Relevanz sind nicht geprüft.'),
    references: [
      ['M3S_JOURNAL_DE_BORD_2026-09-01.md', '01-09-2026'],
      ['2SG_MODELE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_2_2026-08-23.md', '23-08-2026'],
      ['2SG_MATRICE_CADRAGE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_2026-08-23.md', '23-08-2026']
    ]
  },
  {
    id: 'CON-03',
    name: text('Base de connaissances et veille', 'Knowledge base and monitoring', 'Wissensbasis und Monitoring'),
    status: 'indexed',
    families: '3/3',
    occurrences: 341,
    note: text('Les métadonnées couvrent inventaires, qualifications et taxonomies ; les doublons et faux positifs restent à contrôler.', 'Metadata covers inventories, qualification and taxonomies; duplicates and false positives still require review.', 'Die Metadaten decken Inventare, Qualifizierung und Taxonomien ab; Dubletten und Fehlzuordnungen sind noch zu prüfen.'),
    references: [
      ['2SG_INVENTAIRE_SOURCES_MISE_EN_PLACE_V0_1_2026-08-23.md', '23-08-2026'],
      ['2SG_REGISTRE_VEILLE_KM_V3_1_REVISION_LINGUISTIQUE_2026-07-30_STANDALONE.html', '30-07-2026'],
      ['2SG_CANDIDATS_GLOSSAIRE_P1_VEILLE_KM_2026-07-30.json', '30-07-2026']
    ]
  },
  {
    id: 'CON-04',
    name: text('Cadrage institutionnel et stratégique', 'Institutional and strategic framing', 'Institutioneller und strategischer Rahmen'),
    status: 'indexed',
    families: '3/3',
    occurrences: 51,
    note: text('Des références candidates existent pour les documents directeurs, les versions et les matrices de cohérence.', 'Candidate references exist for governing documents, versions and consistency matrices.', 'Kandidatenreferenzen für Leitdokumente, Versionen und Kohärenzmatrizen sind vorhanden.'),
    references: [
      ['2SG_MODELE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_2_2026-08-23.md', '23-08-2026'],
      ['2SG_MATRICE_CADRAGE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_2026-08-23.md', '23-08-2026'],
      ['2SG_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_VISUEL_2026-08-23_STANDALONE.html', '23-08-2026']
    ]
  },
  {
    id: 'CON-05',
    name: text('Faisabilité et pré-projet', 'Feasibility and pre-project', 'Machbarkeit und Vorprojekt'),
    status: 'stopped',
    families: '0/3',
    occurrences: 0,
    note: text('Arrêt appliqué avant parcours des dossiers Finances, LEGAL et décisionnels classés restreints.', 'Stop applied before traversing restricted Finance, LEGAL and decision files.', 'Stopp vor Durchsicht der eingeschränkten Finanz-, LEGAL- und Entscheidungsakten angewendet.'),
    references: []
  },
  {
    id: 'CON-06',
    name: text('Trajectoire initiale', 'Initial roadmap', 'Initialer Fahrplan'),
    status: 'partial',
    families: '1/3',
    occurrences: 4,
    note: text('Des sources de trajectoire sont repérées, mais aucune référence nommée « feuille de route versionnée » ni « registre des dépendances et jalons » n’est localisée.', 'Roadmap sources are identified, but no reference named “versioned roadmap” or “dependency and milestone register” is located.', 'Quellen zur Trajektorie sind identifiziert, aber keine Referenz mit der Bezeichnung „versionierter Fahrplan“ oder „Abhängigkeits- und Meilensteinregister“ wurde gefunden.'),
    references: [
      ['M3S_JOURNAL_DE_BORD_2026-09-01.md', '01-09-2026'],
      ['2SG_Intelligence_Dashboard_V4_01-09-2026.html', '01-09-2026'],
      ['2SG_MATRICE_CADRAGE_PROGRAMME_INSTITUTIONNEL_GLOBAL_V0_1_2026-08-23.md', '23-08-2026']
    ]
  }
];

const COPY = {
  FR: {
    eyebrow: 'INDEX CONFIRMÉ · PGM-CON-COL-002 · V1.0 · 01-09-2026',
    title: 'Index confirmé de la recherche interne bornée',
    intro: 'PGM-DEC-008 confirme le relevé produit après la recherche autorisée par PGM-DEC-007. Seules les métadonnées des emplacements internes bornés ont été parcourues : nom, chemin, date et version apparente. Aucun contenu n’a été ouvert ou lu.',
    counters: [['870', 'références de fichiers parcourues'], ['4/6', 'périmètres internes indexés'], ['10/12', 'filtres internes avec candidats'], ['0', 'pièces ouvertes ou preuves acceptées']],
    labels: { families: 'Filtres avec candidats', occurrences: 'Correspondances lexicales', references: 'Références candidates récentes', none: 'Aucune référence exposée', method: 'Méthode et périmètre' },
    status: { indexed: 'INDEXÉ · MÉTADONNÉES', partial: 'PARTIEL · LACUNES', stopped: 'STOP · RESTREINT' },
    method: 'Corpus : dossiers docs et codex_outputs du projet, puis répertoires stratégiques non restreints 00 à 03 et 05 à 08. Exclusions : contenu des fichiers, dossiers restreints identifiés, dépôts Git, worktrees et archives.',
    source: 'Instantané de métadonnées du 01-09-2026. Les dates affichées sont les dates de modification des fichiers et non des dates de validation métier.',
    boundary: 'Index confirmé uniquement : les 507 correspondances lexicales peuvent se chevaucher et contenir des faux positifs. Elles ne représentent ni 507 documents uniques, ni des preuves recevables, ni une progression du Programme.',
    missing: 'Lacunes explicites : CON-01 et CON-05 restent fermés par sensibilité ; CON-06 ne possède pas encore de candidat identifiable par nom pour la feuille de route versionnée et le registre des dépendances et jalons.',
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-008', version: 'V1.0', status: 'Index de recherche confirmé', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'PGM-CON-COL-002 V0.1 est confirmé et promu en V1.0 comme index de la recherche interne bornée des six composantes de Conception.', evidence: 'Confirmation explicite de Cheikh dans la session du 01-09-2026 : « Je confirme PGM-CON-COL-002 V0.1 comme index candidat de la recherche interne bornée, sans autoriser l’ouverture d’une pièce ni l’acceptation d’une preuve. »', limit: 'La décision confirme uniquement l’index de métadonnées. Elle n’autorise aucune ouverture ou lecture de pièce, aucun parcours de CON-01 ou CON-05, aucune acceptation de preuve, requalification, progression, collecte externe, REF-02 ou L2.' },
    next: 'Prochaine porte Fast Track',
    confirmation: 'Autoriser ou non l’ouverture contrôlée des huit références candidates uniques non restreintes de CON-02, CON-03, CON-04 et CON-06. Cette autorisation resterait sans acceptation automatique de preuve, sans CON-01, CON-05, REF-02 ni L2.'
  },
  EN: {
    eyebrow: 'CONFIRMED INDEX · PGM-CON-COL-002 · V1.0 · 1 SEP 2026',
    title: 'Confirmed index of the bounded internal search',
    intro: 'PGM-DEC-008 confirms the record produced after the search authorised by PGM-DEC-007. Only metadata in the bounded internal locations was traversed: name, path, date and apparent version. No content was opened or read.',
    counters: [['870', 'file references traversed'], ['4/6', 'internal scopes indexed'], ['10/12', 'internal filters with candidates'], ['0', 'records opened or evidence accepted']],
    labels: { families: 'Filters with candidates', occurrences: 'Lexical matches', references: 'Recent candidate references', none: 'No reference exposed', method: 'Method and scope' },
    status: { indexed: 'INDEXED · METADATA', partial: 'PARTIAL · GAPS', stopped: 'STOP · RESTRICTED' },
    method: 'Corpus: project docs and codex_outputs folders, then non-restricted strategic directories 00 to 03 and 05 to 08. Exclusions: file content, identified restricted folders, Git repositories, worktrees and archives.',
    source: 'Metadata snapshot dated 1 Sep 2026. Displayed dates are file modification dates, not business-validation dates.',
    boundary: 'Confirmed index only: the 507 lexical matches can overlap and contain false positives. They represent neither 507 unique records, admissible evidence nor Programme progress.',
    missing: 'Explicit gaps: CON-01 and CON-05 remain closed by sensitivity; CON-06 still has no filename candidate for the versioned roadmap or dependency and milestone register.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-008', version: 'V1.0', status: 'Search index confirmed', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'PGM-CON-COL-002 V0.1 is confirmed and promoted to V1.0 as the bounded internal search index for the six Design components.', evidence: 'Cheikh’s explicit confirmation in the 1 Sep 2026 session, retained in French: “Je confirme PGM-CON-COL-002 V0.1 comme index candidat de la recherche interne bornée, sans autoriser l’ouverture d’une pièce ni l’acceptation d’une preuve.”', limit: 'The decision confirms the metadata index only. It authorises no record opening or reading, traversal of CON-01 or CON-05, evidence acceptance, requalification, progress, external collection, REF-02 or L2.' },
    next: 'Next Fast Track gate',
    confirmation: 'Authorise or decline controlled opening of the eight unique non-restricted candidate references for CON-02, CON-03, CON-04 and CON-06. Any authorisation would still grant no automatic evidence acceptance and exclude CON-01, CON-05, REF-02 and L2.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER INDEX · PGM-CON-COL-002 · V1.0 · 01.09.2026',
    title: 'Bestätigter Index der begrenzten internen Suche',
    intro: 'PGM-DEC-008 bestätigt das nach der durch PGM-DEC-007 autorisierten Suche erstellte Protokoll. Durchlaufen wurden nur Metadaten der begrenzten internen Ablagen: Name, Pfad, Datum und erkennbare Version. Kein Inhalt wurde geöffnet oder gelesen.',
    counters: [['870', 'Dateireferenzen durchlaufen'], ['4/6', 'interne Bereiche indexiert'], ['10/12', 'interne Filter mit Kandidaten'], ['0', 'Unterlagen geöffnet oder Nachweise angenommen']],
    labels: { families: 'Filter mit Kandidaten', occurrences: 'Lexikalische Treffer', references: 'Aktuelle Kandidatenreferenzen', none: 'Keine Referenz offengelegt', method: 'Methode und Umfang' },
    status: { indexed: 'INDEXIERT · METADATEN', partial: 'TEILWEISE · LÜCKEN', stopped: 'STOPP · EINGESCHRÄNKT' },
    method: 'Korpus: Projektordner docs und codex_outputs sowie nicht eingeschränkte strategische Verzeichnisse 00 bis 03 und 05 bis 08. Ausgeschlossen: Dateiinhalte, identifizierte eingeschränkte Ordner, Git-Repositories, Worktrees und Archive.',
    source: 'Metadaten-Snapshot vom 01.09.2026. Angezeigte Daten sind Änderungsdaten der Dateien und keine fachlichen Validierungsdaten.',
    boundary: 'Nur bestätigter Index: Die 507 lexikalischen Treffer können sich überschneiden und Fehlzuordnungen enthalten. Sie sind weder 507 eindeutige Unterlagen noch zulässige Nachweise oder Programmfortschritt.',
    missing: 'Explizite Lücken: CON-01 und CON-05 bleiben aufgrund ihrer Sensibilität geschlossen; für CON-06 fehlt weiterhin ein Dateinamenskandidat zum versionierten Fahrplan und zum Abhängigkeits- und Meilensteinregister.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-008', version: 'V1.0', status: 'Suchindex bestätigt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'PGM-CON-COL-002 V0.1 wird als Index der begrenzten internen Suche für die sechs Konzeptionskomponenten bestätigt und zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „Je confirme PGM-CON-COL-002 V0.1 comme index candidat de la recherche interne bornée, sans autoriser l’ouverture d’une pièce ni l’acceptation d’une preuve.“', limit: 'Der Entscheid bestätigt nur den Metadatenindex. Er erlaubt keine Öffnung oder Lektüre von Unterlagen, keine Durchsicht von CON-01 oder CON-05, keine Nachweisannahme, Neueinstufung, Fortschrittsmessung, externe Sammlung, REF-02 oder L2.' },
    next: 'Nächstes Fast-Track-Tor',
    confirmation: 'Die kontrollierte Öffnung der acht eindeutigen nicht eingeschränkten Kandidatenreferenzen für CON-02, CON-03, CON-04 und CON-06 genehmigen oder ablehnen. Eine Genehmigung würde weiterhin keine automatische Nachweisannahme erlauben und CON-01, CON-05, REF-02 sowie L2 ausschließen.'
  }
};

const statusStyle = {
  indexed: 'border-emerald-800/70 bg-emerald-950/20 text-emerald-200',
  partial: 'border-amber-800/70 bg-amber-950/20 text-amber-200',
  stopped: 'border-rose-800/70 bg-rose-950/20 text-rose-200'
};

const InstitutionalProgramDesignEvidenceSearchResults = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-search-results" data-testid="institutional-program-design-evidence-search-results" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <SearchCheck className="shrink-0 text-emerald-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-emerald-300' : index === 2 ? 'text-cyan-300' : 'text-amber-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 space-y-3">
        {RESULTS.map(result => (
          <article key={result.id} data-testid="institutional-program-design-search-result" className="m3s-raised p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-950/35 text-emerald-300">{result.status === 'stopped' ? <FolderLock size={19} aria-hidden="true" /> : <FileSearch size={19} aria-hidden="true" />}</span><div><p className="text-xs font-semibold text-emerald-300">{result.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(result.name)}</h5></div></div>
              <span className={`inline-flex shrink-0 self-start rounded-md border px-2.5 py-1.5 text-xs font-semibold ${statusStyle[result.status]}`}>{t.status[result.status]}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[0.7fr_0.7fr_2fr]">
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.families}</p><p className="mt-2 text-lg font-semibold text-slate-100">{result.families}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.occurrences}</p><p className="mt-2 text-lg font-semibold text-slate-100">{result.occurrences}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.references}</p>{result.references.length ? <ul className="mt-2 space-y-1.5">{result.references.map(([reference, date]) => <li key={reference} className="flex min-w-0 items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={14} aria-hidden="true" /><span className="min-w-0 break-words">{reference} · {date}</span></li>)}</ul> : <p className="mt-2 text-sm text-slate-400">{t.labels.none}</p>}</div>
            </div>
            <p className="mt-4 border-t border-slate-700 pt-3 text-xs leading-5 text-slate-300">{local(result.note)}</p>
          </article>
        ))}
      </div>

      <section className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-4"><h5 className="flex items-center gap-2 text-sm font-semibold text-cyan-200"><Archive size={18} aria-hidden="true" />{t.labels.method}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.method}</p><p className="mt-2 text-xs leading-5 text-slate-400">{t.source}</p></section>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-rose-800/70 bg-rose-950/15 p-3 text-xs font-semibold leading-5 text-rose-200"><FolderLock className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.missing}</p>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceSearchResults;
