import React from 'react';
import { AlertTriangle, Archive, ClipboardList, FileSearch, FolderLock, LockKeyhole, Search, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const SCOPES = [
  {
    id: 'CON-01',
    name: text('Préparation entrepreneuriale et personnelle · mindset', 'Entrepreneurial and personal readiness · mindset', 'Unternehmerische und persönliche Vorbereitung · Mindset'),
    location: text('Dossier entrepreneurial restreint de la Direction · emplacement exact à confirmer', 'Restricted Direction entrepreneurial file · exact location to confirm', 'Eingeschränkte unternehmerische Akte der Direktion · genauer Ablageort zu bestätigen'),
    owner: text('Direction · porteur(s) du projet', 'Direction · project lead(s)', 'Direktion · Projektträger'),
    sensitivity: 'restricted'
  },
  {
    id: 'CON-02',
    name: text('Brainstorming et orientations', 'Brainstorming and direction', 'Brainstorming und Ausrichtung'),
    location: text('Notes internes, conversations gouvernées et journal des décisions', 'Internal notes, governed conversations and decision log', 'Interne Notizen, gesteuerte Gespräche und Entscheidjournal'),
    owner: text('Direction · appui Administration', 'Direction · Administration support', 'Direktion · Unterstützung Administration'),
    sensitivity: 'internal'
  },
  {
    id: 'CON-03',
    name: text('Base de connaissances et veille', 'Knowledge base and monitoring', 'Wissensbasis und Monitoring'),
    location: text('Registre Veille / Knowledge Management, GED et taxonomies', 'Monitoring / Knowledge Management register, DMS and taxonomies', 'Register Beobachtung / Wissensmanagement, DMS und Taxonomien'),
    owner: text('IT & Support / Knowledge Management', 'IT & Support / Knowledge Management', 'IT & Support / Wissensmanagement'),
    sensitivity: 'internal'
  },
  {
    id: 'CON-04',
    name: text('Cadrage institutionnel et stratégique', 'Institutional and strategic framing', 'Institutioneller und strategischer Rahmen'),
    location: text('Documents directeurs 2SG, décisions et GED gouvernée', '2SG governing documents, decisions and governed DMS', '2SG-Leitdokumente, Entscheide und gesteuertes DMS'),
    owner: text('Direction et Administration', 'Direction and Administration', 'Direktion und Administration'),
    sensitivity: 'internal'
  },
  {
    id: 'CON-05',
    name: text('Faisabilité et pré-projet', 'Feasibility and pre-project', 'Machbarkeit und Vorprojekt'),
    location: text('Planification & Projets, Finances, LEGAL et dossier de décision', 'Planning & Projects, Finance, LEGAL and decision file', 'Planung & Projekte, Finanzen, LEGAL und Entscheidungsakte'),
    owner: text('Direction · contributions Finances et LEGAL', 'Direction · Finance and LEGAL inputs', 'Direktion · Beiträge Finanzen und LEGAL'),
    sensitivity: 'restricted'
  },
  {
    id: 'CON-06',
    name: text('Trajectoire initiale', 'Initial roadmap', 'Initialer Fahrplan'),
    location: text('Journal, agenda, Daily Intelligence et Planification & Projets', 'Work log, agenda, Daily Intelligence and Planning & Projects', 'Arbeitsjournal, Agenda, Daily Intelligence und Planung & Projekte'),
    owner: text('Direction · pilotage Administration', 'Direction · Administration steering', 'Direktion · Steuerung Administration'),
    sensitivity: 'internal'
  }
];

const COPY = {
  FR: {
    eyebrow: 'PLAN DE RECHERCHE CONFIRMÉ · PGM-CON-COL-001 · V1.0 · 01-09-2026',
    title: 'Borner la recherche documentaire avant toute exécution',
    intro: 'PGM-DEC-006 confirme ce plan pour les six composantes de Conception. PGM-DEC-007 autorise son lancement dans les seules limites métadonnées ; les règles d’arrêt restent pleinement applicables.',
    counters: [['6/6', 'périmètres planifiés'], ['4/6', 'périmètres internes indexés'], ['2', 'arrêts restreints appliqués'], ['0', 'pièces ouvertes']],
    labels: { location: 'Périmètre candidat', sequence: 'Séquence prévue', owner: 'Responsable candidat', sensitivity: 'Sensibilité candidate', stop: 'Règle d’arrêt' },
    sequence: ['Borner le dossier et les mots-clés', 'Relever uniquement références, dates et versions', 'Produire un index pour contrôle humain séparé'],
    sensitivity: { internal: 'Interne', restricted: 'Restreinte' },
    stop: { internal: 'Arrêt avant toute copie de contenu, requalification ou acceptation de preuve.', restricted: 'Arrêt avant ouverture : autorisation nominative et portée d’accès distinctes requises.' },
    status: { internal: 'EXÉCUTÉ · MÉTADONNÉES', restricted: 'STOP · NON PARCOURU' },
    allowedTitle: 'Ce que l’autorisation permet',
    allowed: ['Recherche interne bornée par composante et famille documentaire.', 'Index minimal : référence, titre, date, version apparente, provenance et emplacement.', 'Production d’un relevé candidat pour contrôle humain séparé.'],
    blockedTitle: 'Ce qui reste fermé',
    blocked: ['Ouverture, lecture ou copie du contenu d’une pièce.', 'Accès restreint, secret, identifiant, donnée personnelle ou transmission.', 'Acceptation de preuve, requalification, mandat, exécution, progression, REF-02 ou L2.'],
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-006', version: 'V1.0', status: 'Plan de recherche confirmé', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'PGM-CON-COL-001 V0.1 est confirmé et promu en V1.0 comme plan de recherche documentaire interne bornée pour les six composantes de Conception.', evidence: 'Confirmation explicite de Cheikh dans la session du 01-09-2026 : « Je confirme PGM-CON-COL-001 V0.1 comme plan candidat, sans autoriser encore le lancement de la recherche ni l’ouverture des pièces. »', limit: 'La décision confirme le plan documentaire uniquement. Elle n’autorise aucune recherche, ouverture ou lecture de pièce, aucun accès restreint ou réel, aucune acceptation de preuve, requalification, tâche d’exécution, progression, REF-02 ou L2.' },
    launchRecord: { id: 'PGM-DEC-007', version: 'V1.0', status: 'Lancement borné autorisé', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'Le lancement de la recherche interne bornée selon PGM-CON-COL-001 V1.0 est autorisé dans les limites métadonnées confirmées.', evidence: 'Autorisation explicite de Cheikh dans la session du 01-09-2026 : « super, merci de continuer lancement autorisé ».', limit: 'L’autorisation permet uniquement le parcours des métadonnées internes non restreintes. Elle n’autorise aucune ouverture ou lecture de contenu, aucun parcours des périmètres restreints CON-01 et CON-05, aucune acceptation de preuve, requalification, progression, REF-02 ou L2.' },
    source: 'Base confirmée : PGM-CON-EVD-001 V1.0, PGM-DEC-005 V1.0, PGM-DEC-006 V1.0 et PGM-DEC-007 V1.0. Les règles d’arrêt restent applicables pendant toute la recherche.',
    boundary: 'Exécution bornée : quatre périmètres internes indexés par métadonnées, deux arrêts restreints appliqués, zéro pièce ouverte et zéro preuve acceptée.',
    next: 'Relevé candidat produit · PGM-CON-COL-002 V0.1',
    confirmation: 'Le relevé groupé est présenté ci-dessous pour confirmation ou correction. Aucune pièce ne peut être ouverte et aucune preuve ne peut être acceptée à ce stade.'
  },
  EN: {
    eyebrow: 'CONFIRMED SEARCH PLAN · PGM-CON-COL-001 · V1.0 · 1 SEP 2026',
    title: 'Bound documentary search before any execution',
    intro: 'PGM-DEC-006 confirms this plan for the six Design components. PGM-DEC-007 authorises launch within metadata-only limits; all stop rules remain fully applicable.',
    counters: [['6/6', 'scopes planned'], ['4/6', 'internal scopes indexed'], ['2', 'restricted stops applied'], ['0', 'records opened']],
    labels: { location: 'Candidate scope', sequence: 'Planned sequence', owner: 'Candidate owner', sensitivity: 'Candidate sensitivity', stop: 'Stop rule' },
    sequence: ['Bound the file and keywords', 'Record references, dates and versions only', 'Produce an index for separate human review'],
    sensitivity: { internal: 'Internal', restricted: 'Restricted' },
    stop: { internal: 'Stop before copying content, requalification or evidence acceptance.', restricted: 'Stop before opening: separate named authorisation and access scope required.' },
    status: { internal: 'EXECUTED · METADATA', restricted: 'STOP · NOT TRAVERSED' },
    allowedTitle: 'What the authorisation permits',
    allowed: ['Internal search bounded by component and documentary family.', 'Minimal index: reference, title, date, apparent version, provenance and location.', 'Production of a candidate record for separate human review.'],
    blockedTitle: 'What remains closed',
    blocked: ['Opening, reading or copying a record’s content.', 'Restricted access, secret, credential, personal data or transmission.', 'Evidence acceptance, requalification, mandate, execution, progress, REF-02 or L2.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-006', version: 'V1.0', status: 'Search plan confirmed', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'PGM-CON-COL-001 V0.1 is confirmed and promoted to V1.0 as the bounded internal documentary search plan for the six Design components.', evidence: 'Cheikh’s explicit confirmation in the 1 Sep 2026 session, retained in French: “Je confirme PGM-CON-COL-001 V0.1 comme plan candidat, sans autoriser encore le lancement de la recherche ni l’ouverture des pièces.”', limit: 'The decision confirms the documentary plan only. It authorises no search, record opening or reading, restricted or real access, evidence acceptance, requalification, execution task, progress, REF-02 or L2.' },
    launchRecord: { id: 'PGM-DEC-007', version: 'V1.0', status: 'Bounded launch authorised', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'Starting the bounded internal search under PGM-CON-COL-001 V1.0 is authorised within the confirmed metadata-only limits.', evidence: 'Cheikh’s explicit authorisation in the 1 Sep 2026 session, retained in French: “super, merci de continuer lancement autorisé”.', limit: 'The authorisation permits only traversal of non-restricted internal metadata. It authorises no content opening or reading, traversal of restricted CON-01 and CON-05 scopes, evidence acceptance, requalification, progress, REF-02 or L2.' },
    source: 'Confirmed basis: PGM-CON-EVD-001 V1.0, PGM-DEC-005 V1.0, PGM-DEC-006 V1.0 and PGM-DEC-007 V1.0. Stop rules remain applicable throughout the search.',
    boundary: 'Bounded execution: four internal scopes indexed from metadata, two restricted stops applied, zero records opened and zero evidence accepted.',
    next: 'Candidate record produced · PGM-CON-COL-002 V0.1',
    confirmation: 'The grouped record is shown below for confirmation or correction. No record may be opened and no evidence may be accepted at this stage.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER SUCHPLAN · PGM-CON-COL-001 · V1.0 · 01.09.2026',
    title: 'Dokumentensuche vor jeder Ausführung begrenzen',
    intro: 'PGM-DEC-006 bestätigt diesen Plan für die sechs Konzeptionskomponenten. PGM-DEC-007 autorisiert den Start innerhalb der reinen Metadatengrenzen; alle Stoppregeln bleiben vollständig anwendbar.',
    counters: [['6/6', 'Bereiche geplant'], ['4/6', 'interne Bereiche indexiert'], ['2', 'eingeschränkte Stopps angewendet'], ['0', 'Unterlagen geöffnet']],
    labels: { location: 'Kandidatenbereich', sequence: 'Geplanter Ablauf', owner: 'Kandidatenverantwortung', sensitivity: 'Kandidatensensibilität', stop: 'Stoppregel' },
    sequence: ['Akte und Suchbegriffe abgrenzen', 'Nur Referenzen, Daten und Versionen erfassen', 'Index für getrennte menschliche Prüfung erstellen'],
    sensitivity: { internal: 'Intern', restricted: 'Eingeschränkt' },
    stop: { internal: 'Stopp vor Inhaltskopie, Neueinstufung oder Nachweisannahme.', restricted: 'Stopp vor Öffnung: separate namentliche Autorisierung und Zugriffsbereich erforderlich.' },
    status: { internal: 'AUSGEFÜHRT · METADATEN', restricted: 'STOPP · NICHT DURCHSUCHT' },
    allowedTitle: 'Was die Autorisierung erlaubt',
    allowed: ['Interne Suche, begrenzt nach Komponente und Dokumentenfamilie.', 'Minimalindex: Referenz, Titel, Datum, erkennbare Version, Herkunft und Ablage.', 'Erstellung eines Kandidatenprotokolls für eine getrennte menschliche Prüfung.'],
    blockedTitle: 'Was geschlossen bleibt',
    blocked: ['Öffnung, Lesen oder Kopieren des Inhalts einer Unterlage.', 'Eingeschränkter Zugriff, Geheimnis, Kennung, Personendaten oder Übermittlung.', 'Nachweisannahme, Neueinstufung, Mandat, Ausführung, Fortschritt, REF-02 oder L2.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-006', version: 'V1.0', status: 'Suchplan bestätigt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'PGM-CON-COL-001 V0.1 wird als begrenzter interner Dokumentensuchplan für die sechs Konzeptionskomponenten bestätigt und zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „Je confirme PGM-CON-COL-001 V0.1 comme plan candidat, sans autoriser encore le lancement de la recherche ni l’ouverture des pièces.“', limit: 'Der Entscheid bestätigt nur den Dokumentationsplan. Er erlaubt keine Suche, Öffnung oder Lektüre von Unterlagen, keinen eingeschränkten oder realen Zugriff, keine Nachweisannahme, Neueinstufung, Ausführungsaufgabe, Fortschritt, REF-02 oder L2.' },
    launchRecord: { id: 'PGM-DEC-007', version: 'V1.0', status: 'Begrenzter Start autorisiert', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'Der Start der begrenzten internen Suche nach PGM-CON-COL-001 V1.0 ist innerhalb der bestätigten reinen Metadatengrenzen autorisiert.', evidence: 'Ausdrückliche Autorisierung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „super, merci de continuer lancement autorisé“.', limit: 'Die Autorisierung erlaubt nur das Durchlaufen nicht eingeschränkter interner Metadaten. Sie erlaubt keine Öffnung oder Lektüre von Inhalten, keine Durchsicht der eingeschränkten Bereiche CON-01 und CON-05, keine Nachweisannahme, Neueinstufung, Fortschrittsmessung, REF-02 oder L2.' },
    source: 'Bestätigte Basis: PGM-CON-EVD-001 V1.0, PGM-DEC-005 V1.0, PGM-DEC-006 V1.0 und PGM-DEC-007 V1.0. Die Stoppregeln bleiben während der gesamten Suche anwendbar.',
    boundary: 'Begrenzte Ausführung: vier interne Bereiche anhand von Metadaten indexiert, zwei eingeschränkte Stopps angewendet, null Unterlagen geöffnet und null Nachweise angenommen.',
    next: 'Kandidatenprotokoll erstellt · PGM-CON-COL-002 V0.1',
    confirmation: 'Das gebündelte Protokoll wird unten zur Bestätigung oder Korrektur angezeigt. In dieser Phase darf keine Unterlage geöffnet und kein Nachweis angenommen werden.'
  }
};

const InstitutionalProgramDesignEvidenceSearchPlan = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-search-plan" data-testid="institutional-program-design-evidence-search-plan" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <Search className="shrink-0 text-cyan-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index < 2 ? 'text-cyan-300' : 'text-amber-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {SCOPES.map(scope => (
          <article key={scope.id} data-testid="institutional-program-design-search-scope" className="m3s-raised min-w-0 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-950/45 text-cyan-300"><FileSearch size={19} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-cyan-300">{scope.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(scope.name)}</h5></div></div>
              <span className={`inline-flex shrink-0 self-start rounded-md border px-2.5 py-1.5 text-xs font-semibold ${scope.sensitivity === 'restricted' ? 'border-rose-800/70 bg-rose-950/20 text-rose-200' : 'border-emerald-800/70 bg-emerald-950/20 text-emerald-200'}`}>{t.status[scope.sensitivity]}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.location}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(scope.location)}</p><p className="mt-3 text-xs font-semibold uppercase text-slate-400">{t.labels.owner}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(scope.owner)}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.sequence}</p><ol className="mt-2 space-y-1.5">{t.sequence.map((step, index) => <li key={step} className="flex items-start gap-2 text-sm leading-5 text-slate-300"><span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-800 text-[10px] font-semibold text-cyan-300">{index + 1}</span>{step}</li>)}</ol></div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-700 pt-3 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.sensitivity}</p><span className={`mt-2 inline-flex rounded-md border px-2.5 py-1.5 text-xs font-semibold ${scope.sensitivity === 'restricted' ? 'border-rose-800/70 bg-rose-950/20 text-rose-200' : 'border-slate-700 bg-slate-950/30 text-slate-200'}`}>{t.sensitivity[scope.sensitivity]}</span></div><div><p className="text-xs font-semibold uppercase text-amber-300">{t.labels.stop}</p><p className="mt-2 text-xs leading-5 text-amber-200">{t.stop[scope.sensitivity]}</p></div></div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <section className="rounded-md border border-cyan-800/70 bg-cyan-950/15 p-4"><h5 className="flex items-center gap-2 text-sm font-semibold text-cyan-200"><ClipboardList size={18} aria-hidden="true" />{t.allowedTitle}</h5><ul className="mt-3 space-y-2">{t.allowed.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-300"><Archive className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" />{item}</li>)}</ul></section>
        <section className="rounded-md border border-amber-800/70 bg-amber-950/15 p-4"><h5 className="flex items-center gap-2 text-sm font-semibold text-amber-200"><FolderLock size={18} aria-hidden="true" />{t.blockedTitle}</h5><ul className="mt-3 space-y-2">{t.blocked.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{item}</li>)}</ul></section>
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <GovernedDecisionRecord labels={t.recordLabels} record={t.launchRecord} />
      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><Archive className="mt-0.5 shrink-0 text-cyan-300" size={16} aria-hidden="true" />{t.source}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceSearchPlan;
