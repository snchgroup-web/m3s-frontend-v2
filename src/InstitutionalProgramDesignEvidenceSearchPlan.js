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
    eyebrow: 'PLAN DE RECHERCHE CANDIDAT · PGM-CON-COL-001 · V0.1 · 01-09-2026',
    title: 'Préparer la recherche documentaire sans encore l’exécuter',
    intro: 'PGM-DEC-005 autorise uniquement la préparation de ce plan. Les six périmètres, séquences et responsabilités restent candidats ; aucune recherche, ouverture de pièce ou appréciation probatoire n’est lancée.',
    counters: [['6/6', 'périmètres planifiés'], ['18', 'familles à rechercher après autorisation'], ['0', 'recherches lancées'], ['0', 'pièces ouvertes']],
    labels: { location: 'Périmètre candidat', sequence: 'Séquence prévue', owner: 'Responsable candidat', sensitivity: 'Sensibilité candidate', stop: 'Règle d’arrêt' },
    sequence: ['Borner le dossier et les mots-clés', 'Relever uniquement références, dates et versions', 'Produire un index pour contrôle humain séparé'],
    sensitivity: { internal: 'Interne', restricted: 'Restreinte' },
    stop: { internal: 'Arrêt avant toute copie de contenu, requalification ou acceptation de preuve.', restricted: 'Arrêt avant ouverture : autorisation nominative et portée d’accès distinctes requises.' },
    planned: 'PLANIFIÉ · NON LANCÉ',
    allowedTitle: 'Ce que le plan prépare',
    allowed: ['Recherche interne bornée par composante et famille documentaire.', 'Index minimal : référence, titre, date, version, provenance et emplacement.', 'Contrôle humain ultérieur de présence, complétude, fraîcheur et recevabilité.'],
    blockedTitle: 'Ce qui reste fermé',
    blocked: ['Recherche effective, ouverture ou lecture de pièce.', 'Accès restreint, secret, identifiant, donnée personnelle ou transmission.', 'Acceptation de preuve, requalification, mandat, exécution, progression, REF-02 ou L2.'],
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-005', version: 'V1.0', status: 'Préparation du plan autorisée', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'La préparation de PGM-CON-COL-001 V0.1 est autorisée comme plan de recherche documentaire interne bornée pour les six composantes de Conception.', evidence: 'Confirmation explicite de Cheikh dans la session du 01-09-2026 : « Je confirme et autorise la préparation de PGM-CON-COL-001 V0.1 comme plan de recherche documentaire interne bornée, sans lancer la recherche, ouvrir une pièce ni accepter une preuve. »', limit: 'La décision autorise la préparation documentaire uniquement. Elle n’autorise aucune recherche, ouverture ou lecture de pièce, aucun accès restreint ou réel, aucune acceptation de preuve, requalification, tâche d’exécution, progression, REF-02 ou L2.' },
    source: 'Base de préparation : PGM-CON-EVD-001 V1.0 et PGM-DEC-005 V1.0. Les périmètres restent candidats tant que le plan n’est pas confirmé et qu’une autorisation d’exécution distincte n’est pas accordée.',
    boundary: 'Plan candidat uniquement : six périmètres, dix-huit familles attendues, zéro recherche lancée, zéro pièce ouverte et zéro preuve acceptée.',
    next: 'Prochain arbitrage groupé',
    confirmation: 'Confirmer ou amender PGM-CON-COL-001 V0.1 comme plan candidat. Cette confirmation n’autorisera toujours pas le lancement de la recherche ni l’ouverture des pièces.'
  },
  EN: {
    eyebrow: 'CANDIDATE SEARCH PLAN · PGM-CON-COL-001 · V0.1 · 1 SEP 2026',
    title: 'Prepare documentary search without executing it yet',
    intro: 'PGM-DEC-005 authorises preparation only of this plan. The six scopes, sequences and responsibilities remain candidates; no search, record opening or evidentiary assessment is started.',
    counters: [['6/6', 'scopes planned'], ['18', 'families to search after authorisation'], ['0', 'searches started'], ['0', 'records opened']],
    labels: { location: 'Candidate scope', sequence: 'Planned sequence', owner: 'Candidate owner', sensitivity: 'Candidate sensitivity', stop: 'Stop rule' },
    sequence: ['Bound the file and keywords', 'Record references, dates and versions only', 'Produce an index for separate human review'],
    sensitivity: { internal: 'Internal', restricted: 'Restricted' },
    stop: { internal: 'Stop before copying content, requalification or evidence acceptance.', restricted: 'Stop before opening: separate named authorisation and access scope required.' },
    planned: 'PLANNED · NOT STARTED',
    allowedTitle: 'What the plan prepares',
    allowed: ['Internal search bounded by component and documentary family.', 'Minimal index: reference, title, date, version, provenance and location.', 'Later human review of presence, completeness, freshness and admissibility.'],
    blockedTitle: 'What remains closed',
    blocked: ['Effective search, record opening or reading.', 'Restricted access, secret, credential, personal data or transmission.', 'Evidence acceptance, requalification, mandate, execution, progress, REF-02 or L2.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-005', version: 'V1.0', status: 'Plan preparation authorised', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'Preparation of PGM-CON-COL-001 V0.1 is authorised as the bounded internal documentary search plan for the six Design components.', evidence: 'Cheikh’s explicit confirmation in the 1 Sep 2026 session, retained in French: “Je confirme et autorise la préparation de PGM-CON-COL-001 V0.1 comme plan de recherche documentaire interne bornée, sans lancer la recherche, ouvrir une pièce ni accepter une preuve.”', limit: 'The decision authorises documentary preparation only. It authorises no search, record opening or reading, restricted or real access, evidence acceptance, requalification, execution task, progress, REF-02 or L2.' },
    source: 'Preparation basis: PGM-CON-EVD-001 V1.0 and PGM-DEC-005 V1.0. Scopes remain candidates until the plan is confirmed and separate execution authorisation is granted.',
    boundary: 'Candidate plan only: six scopes, eighteen expected families, zero searches started, zero records opened and zero evidence accepted.',
    next: 'Next grouped decision',
    confirmation: 'Confirm or amend PGM-CON-COL-001 V0.1 as the candidate plan. Confirmation will still not authorise starting the search or opening records.'
  },
  DE: {
    eyebrow: 'KANDIDATEN-SUCHPLAN · PGM-CON-COL-001 · V0.1 · 01.09.2026',
    title: 'Dokumentensuche vorbereiten, ohne sie bereits auszuführen',
    intro: 'PGM-DEC-005 erlaubt nur die Vorbereitung dieses Plans. Die sechs Bereiche, Abläufe und Verantwortungen bleiben Kandidaten; keine Suche, Unterlagenöffnung oder Nachweisbewertung wird gestartet.',
    counters: [['6/6', 'Bereiche geplant'], ['18', 'Familien nach Autorisierung zu suchen'], ['0', 'Suchen gestartet'], ['0', 'Unterlagen geöffnet']],
    labels: { location: 'Kandidatenbereich', sequence: 'Geplanter Ablauf', owner: 'Kandidatenverantwortung', sensitivity: 'Kandidatensensibilität', stop: 'Stoppregel' },
    sequence: ['Akte und Suchbegriffe abgrenzen', 'Nur Referenzen, Daten und Versionen erfassen', 'Index für getrennte menschliche Prüfung erstellen'],
    sensitivity: { internal: 'Intern', restricted: 'Eingeschränkt' },
    stop: { internal: 'Stopp vor Inhaltskopie, Neueinstufung oder Nachweisannahme.', restricted: 'Stopp vor Öffnung: separate namentliche Autorisierung und Zugriffsbereich erforderlich.' },
    planned: 'GEPLANT · NICHT GESTARTET',
    allowedTitle: 'Was der Plan vorbereitet',
    allowed: ['Interne Suche, begrenzt nach Komponente und Dokumentenfamilie.', 'Minimalindex: Referenz, Titel, Datum, Version, Herkunft und Ablage.', 'Spätere menschliche Prüfung von Vorhandensein, Vollständigkeit, Aktualität und Zulässigkeit.'],
    blockedTitle: 'Was geschlossen bleibt',
    blocked: ['Effektive Suche, Öffnung oder Lesen von Unterlagen.', 'Eingeschränkter Zugriff, Geheimnis, Kennung, Personendaten oder Übermittlung.', 'Nachweisannahme, Neueinstufung, Mandat, Ausführung, Fortschritt, REF-02 oder L2.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-005', version: 'V1.0', status: 'Planvorbereitung erlaubt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'Die Vorbereitung von PGM-CON-COL-001 V0.1 als begrenzter interner Dokumentensuchplan für die sechs Konzeptionskomponenten ist erlaubt.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „Je confirme et autorise la préparation de PGM-CON-COL-001 V0.1 comme plan de recherche documentaire interne bornée, sans lancer la recherche, ouvrir une pièce ni accepter une preuve.“', limit: 'Der Entscheid erlaubt nur die dokumentarische Vorbereitung. Er erlaubt keine Suche, Öffnung oder Lektüre von Unterlagen, keinen eingeschränkten oder realen Zugriff, keine Nachweisannahme, Neueinstufung, Ausführungsaufgabe, Fortschritt, REF-02 oder L2.' },
    source: 'Vorbereitungsbasis: PGM-CON-EVD-001 V1.0 und PGM-DEC-005 V1.0. Die Bereiche bleiben Kandidaten, bis der Plan bestätigt und eine getrennte Ausführungsautorisierung erteilt ist.',
    boundary: 'Nur Kandidatenplan: sechs Bereiche, achtzehn erwartete Familien, null gestartete Suchen, null geöffnete Unterlagen und null angenommene Nachweise.',
    next: 'Nächster gebündelter Entscheid',
    confirmation: 'PGM-CON-COL-001 V0.1 als Kandidatenplan bestätigen oder ändern. Auch die Bestätigung erlaubt noch keinen Suchstart und keine Unterlagenöffnung.'
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
              <span className="inline-flex shrink-0 self-start rounded-md border border-amber-800/70 bg-amber-950/20 px-2.5 py-1.5 text-xs font-semibold text-amber-200">{t.planned}</span>
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
      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><Archive className="mt-0.5 shrink-0 text-cyan-300" size={16} aria-hidden="true" />{t.source}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceSearchPlan;
