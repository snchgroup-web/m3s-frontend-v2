import React from 'react';
import { AlertTriangle, Archive, ClipboardCheck, FileSearch, FolderSearch2, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const INVENTORY = [
  {
    id: 'CON-01',
    name: text('Préparation entrepreneuriale et personnelle · mindset', 'Entrepreneurial and personal readiness · mindset', 'Unternehmerische und persönliche Vorbereitung · Mindset'),
    evidence: [
      text('Questionnaire ou auto-diagnostic borné', 'Bounded questionnaire or self-assessment', 'Begrenzter Fragebogen oder Selbstdiagnose'),
      text('Règles personnelles de fonctionnement', 'Personal operating rules', 'Persönliche Arbeitsregeln'),
      text('Registre non sensible des contraintes et risques', 'Non-sensitive constraints and risk register', 'Nicht sensibles Register der Einschränkungen und Risiken')
    ],
    source: text('Dossier entrepreneurial restreint de la Direction · emplacement exact à confirmer', 'Restricted Direction entrepreneurial file · exact location to confirm', 'Eingeschränkte unternehmerische Akte der Direktion · genauer Ablageort zu bestätigen'),
    sensitivity: 'restricted',
    owner: text('Porteur(s) du projet · validation Direction', 'Project lead(s) · Direction validation', 'Projektträger · Validierung durch Direktion')
  },
  {
    id: 'CON-02',
    name: text('Brainstorming et orientations', 'Brainstorming and direction', 'Brainstorming und Ausrichtung'),
    evidence: [
      text('Inventaire des notes et conversations', 'Inventory of notes and conversations', 'Inventar von Notizen und Gesprächen'),
      text('Note d’orientation consolidée', 'Consolidated direction note', 'Konsolidierte Ausrichtungsnotiz'),
      text('Journal des arbitrages et versions', 'Decision and version log', 'Entscheid- und Versionsjournal')
    ],
    source: text('Notes internes, conversations gouvernées et journal des décisions · corpus à borner', 'Internal notes, governed conversations and decision log · corpus to bound', 'Interne Notizen, gesteuerte Gespräche und Entscheidjournal · Korpus abzugrenzen'),
    sensitivity: 'internal',
    owner: text('Direction · appui Administration', 'Direction · Administration support', 'Direktion · Unterstützung Administration')
  },
  {
    id: 'CON-03',
    name: text('Base de connaissances et veille', 'Knowledge base and monitoring', 'Wissensbasis und Monitoring'),
    evidence: [
      text('Inventaire des sources', 'Source inventory', 'Quelleninventar'),
      text('Fiches de qualification et fraîcheur', 'Qualification and freshness records', 'Qualifizierungs- und Aktualitätsnachweise'),
      text('Taxonomie et règles de classement', 'Taxonomy and classification rules', 'Taxonomie und Klassifizierungsregeln')
    ],
    source: text('Registre Veille / Knowledge Management, GED et taxonomies · raccordement à confirmer', 'Monitoring / Knowledge Management register, DMS and taxonomies · connection to confirm', 'Register Beobachtung / Wissensmanagement, DMS und Taxonomien · Verbindung zu bestätigen'),
    sensitivity: 'internal',
    owner: text('IT & Support / Knowledge Management · validation métier', 'IT & Support / Knowledge Management · business validation', 'IT & Support / Wissensmanagement · Fachvalidierung')
  },
  {
    id: 'CON-04',
    name: text('Cadrage institutionnel et stratégique', 'Institutional and strategic framing', 'Institutioneller und strategischer Rahmen'),
    evidence: [
      text('Inventaire des documents directeurs', 'Governing-document inventory', 'Inventar der Leitdokumente'),
      text('Statuts, versions et sources', 'Statuses, versions and sources', 'Status, Versionen und Quellen'),
      text('Table de cohérence et écarts prioritaires', 'Consistency and priority-gap table', 'Tabelle der Kohärenz und prioritären Lücken')
    ],
    source: text('Documents directeurs 2SG, décisions et GED gouvernée · hiérarchie à confirmer', '2SG governing documents, decisions and governed DMS · hierarchy to confirm', '2SG-Leitdokumente, Entscheide und gesteuertes DMS · Hierarchie zu bestätigen'),
    sensitivity: 'internal',
    owner: text('Direction et Administration · conservation GED', 'Direction and Administration · DMS retention', 'Direktion und Administration · DMS-Aufbewahrung')
  },
  {
    id: 'CON-05',
    name: text('Faisabilité et pré-projet', 'Feasibility and pre-project', 'Machbarkeit und Vorprojekt'),
    evidence: [
      text('Fiche de faisabilité', 'Feasibility sheet', 'Machbarkeitsblatt'),
      text('Hypothèses de besoins, ressources, budget et risques', 'Needs, resources, budget and risk assumptions', 'Annahmen zu Bedarf, Ressourcen, Budget und Risiken'),
      text('Décision humaine Go / Corriger / Suspendre', 'Human Go / Correct / Suspend decision', 'Menschlicher Entscheid Go / Korrigieren / Aussetzen')
    ],
    source: text('Planification & Projets, Finances, LEGAL et dossier de décision · périmètre à confirmer', 'Planning & Projects, Finance, LEGAL and decision file · scope to confirm', 'Planung & Projekte, Finanzen, LEGAL und Entscheidungsakte · Umfang zu bestätigen'),
    sensitivity: 'restricted',
    owner: text('Direction · contributions Finances, LEGAL et fonctions concernées', 'Direction · Finance, LEGAL and relevant function inputs', 'Direktion · Beiträge Finanzen, LEGAL und betroffene Funktionen')
  },
  {
    id: 'CON-06',
    name: text('Trajectoire initiale', 'Initial roadmap', 'Initialer Fahrplan'),
    evidence: [
      text('Feuille de route versionnée', 'Versioned roadmap', 'Versionierter Fahrplan'),
      text('Registre des dépendances et jalons', 'Dependency and milestone register', 'Register der Abhängigkeiten und Meilensteine'),
      text('Critères et décision de passage vers Mise en place', 'Criteria and decision to move into Implementation', 'Kriterien und Entscheid zum Übergang in die Umsetzung')
    ],
    source: text('Journal, agenda, Daily Intelligence et Planification & Projets · sources à rapprocher', 'Work log, agenda, Daily Intelligence and Planning & Projects · sources to reconcile', 'Arbeitsjournal, Agenda, Daily Intelligence und Planung & Projekte · Quellen abzugleichen'),
    sensitivity: 'internal',
    owner: text('Direction · pilotage Administration', 'Direction · Administration steering', 'Direktion · Steuerung Administration')
  }
];

const COPY = {
  FR: {
    eyebrow: 'INVENTAIRE PROBATOIRE CONFIRMÉ · PGM-CON-EVD-001 · V1.0 · 01-09-2026',
    title: 'Inventaire groupé des preuves attendues pour Conception',
    intro: 'PGM-DEC-004 confirme cet inventaire groupé. Il fixe les familles de preuves attendues, leurs emplacements candidats, leur sensibilité et les fonctions responsables candidates, sans rechercher, ouvrir ni accepter une pièce.',
    counters: [['6/6', 'composantes couvertes'], ['18', 'familles de preuves candidates'], ['0', 'preuves acceptées'], ['0', 'collectes ou accès ouverts']],
    status: 'Confirmé · pièces non contrôlées',
    labels: { expected: 'Preuves attendues candidates', source: 'Source ou emplacement candidat', owner: 'Responsable candidat', sensitivity: 'Sensibilité candidate', control: 'Contrôle suivant' },
    sensitivity: { internal: 'Interne', restricted: 'Restreinte' },
    control: 'Confirmer ou corriger les familles, l’emplacement, la sensibilité et le responsable candidat. Aucun contrôle de pièce n’est encore autorisé.',
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-004', version: 'V1.0', status: 'Inventaire probatoire confirmé', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'PGM-CON-EVD-001 V0.1 est confirmé et promu en V1.0 comme inventaire probatoire groupé des six composantes de Conception.', evidence: 'Confirmation explicite de Cheikh dans la continuité de la session du 01-09-2026 : « Alors je le confirme deja, merci de continuer ».', limit: 'Cette décision confirme l’inventaire documentaire uniquement. Elle n’autorise aucune collecte externe, recherche interne de pièces, ouverture de fichier restreint, accès réel, acceptation de preuve, mandat, tâche d’exécution, progression, REF-02 ou L2.' },
    source: 'Base confirmée : PGM-CON-REV-001 V1.0, PGM-DEC-003 V1.0 et PGM-DEC-004 V1.0. Les emplacements indiquent des familles candidates ; ils ne prouvent ni présence, ni complétude, ni recevabilité.',
    boundary: 'Inventaire candidat uniquement : 18 familles attendues, zéro preuve acceptée, zéro collecte ouverte, zéro responsable mandaté et zéro progression calculée.',
    next: 'Prochaine porte candidate',
    confirmation: 'Autoriser ou non la préparation de PGM-CON-COL-001 V0.1 comme plan de recherche documentaire interne bornée, sans lancer la recherche, ouvrir une pièce ni accepter une preuve.'
  },
  EN: {
    eyebrow: 'CONFIRMED EVIDENCE INVENTORY · PGM-CON-EVD-001 · V1.0 · 1 SEP 2026',
    title: 'Grouped inventory of expected evidence for Design',
    intro: 'PGM-DEC-004 confirms this grouped inventory. It fixes the expected evidence families, candidate locations, sensitivity and candidate responsible functions without searching for, opening or accepting any record.',
    counters: [['6/6', 'components covered'], ['18', 'candidate evidence families'], ['0', 'evidence items accepted'], ['0', 'collections or accesses opened']],
    status: 'Confirmed · records not reviewed',
    labels: { expected: 'Candidate expected evidence', source: 'Candidate source or location', owner: 'Candidate owner', sensitivity: 'Candidate sensitivity', control: 'Next control' },
    sensitivity: { internal: 'Internal', restricted: 'Restricted' },
    control: 'Confirm or correct the families, location, sensitivity and candidate owner. No record review is authorised yet.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-004', version: 'V1.0', status: 'Evidence inventory confirmed', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'PGM-CON-EVD-001 V0.1 is confirmed and promoted to V1.0 as the grouped evidence inventory for the six Design components.', evidence: 'Cheikh’s explicit confirmation in the continuation of the 1 Sep 2026 session, retained in French: “Alors je le confirme deja, merci de continuer”.', limit: 'This decision confirms the documentary inventory only. It authorises no external collection, internal record search, restricted-file opening, real access, evidence acceptance, mandate, execution task, progress, REF-02 or L2.' },
    source: 'Confirmed basis: PGM-CON-REV-001 V1.0, PGM-DEC-003 V1.0 and PGM-DEC-004 V1.0. Locations identify candidate families; they prove neither presence, completeness nor admissibility.',
    boundary: 'Candidate inventory only: 18 expected families, zero evidence accepted, zero collection opened, zero owners mandated and no progress calculated.',
    next: 'Next candidate gate',
    confirmation: 'Authorise or decline preparation of PGM-CON-COL-001 V0.1 as a bounded internal documentary search plan, without starting the search, opening a record or accepting evidence.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES NACHWEISINVENTAR · PGM-CON-EVD-001 · V1.0 · 01.09.2026',
    title: 'Gebündeltes Inventar der erwarteten Nachweise für Konzeption',
    intro: 'PGM-DEC-004 bestätigt dieses gebündelte Inventar. Es legt erwartete Nachweisfamilien, Kandidatenablagen, Sensibilität und Kandidatenfunktionen fest, ohne Unterlagen zu suchen, zu öffnen oder anzunehmen.',
    counters: [['6/6', 'Komponenten abgedeckt'], ['18', 'Kandidatennachweisfamilien'], ['0', 'Nachweise angenommen'], ['0', 'Sammlungen oder Zugriffe geöffnet']],
    status: 'Bestätigt · Unterlagen nicht geprüft',
    labels: { expected: 'Erwartete Kandidatennachweise', source: 'Kandidatenquelle oder Ablage', owner: 'Kandidatenverantwortung', sensitivity: 'Kandidatensensibilität', control: 'Nächste Kontrolle' },
    sensitivity: { internal: 'Intern', restricted: 'Eingeschränkt' },
    control: 'Familien, Ablage, Sensibilität und Kandidatenverantwortung bestätigen oder korrigieren. Eine Unterlagenprüfung ist noch nicht erlaubt.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-004', version: 'V1.0', status: 'Nachweisinventar bestätigt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'PGM-CON-EVD-001 V0.1 wird als gebündeltes Nachweisinventar der sechs Konzeptionskomponenten bestätigt und zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Fortsetzung der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „Alors je le confirme deja, merci de continuer“.', limit: 'Der Entscheid bestätigt nur das dokumentarische Inventar. Er erlaubt keine externe Sammlung, interne Unterlagensuche, Öffnung eingeschränkter Dateien, realen Zugriff, Nachweisannahme, Mandatierung, Ausführungsaufgabe, Fortschrittsmessung, REF-02 oder L2.' },
    source: 'Bestätigte Basis: PGM-CON-REV-001 V1.0, PGM-DEC-003 V1.0 und PGM-DEC-004 V1.0. Die Ablagen bezeichnen Kandidatenfamilien; sie belegen weder Vorhandensein, Vollständigkeit noch Zulässigkeit.',
    boundary: 'Nur Kandidateninventar: 18 erwartete Familien, null angenommene Nachweise, null geöffnete Sammlung, null mandatierte Verantwortungen und kein berechneter Fortschritt.',
    next: 'Nächstes Kandidatentor',
    confirmation: 'Die Vorbereitung von PGM-CON-COL-001 V0.1 als begrenzten internen Dokumentensuchplan erlauben oder ablehnen, ohne die Suche zu starten, Unterlagen zu öffnen oder Nachweise anzunehmen.'
  }
};

const InstitutionalProgramDesignEvidenceInventory = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const local = value => value[language] || value.FR;

  return (
    <section id="institutional-program-design-evidence-inventory" data-testid="institutional-program-design-evidence-inventory" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <FolderSearch2 className="shrink-0 text-cyan-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 0 ? 'text-cyan-300' : index < 2 ? 'text-slate-100' : 'text-amber-300'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 space-y-3">
        {INVENTORY.map(row => (
          <article key={row.id} data-testid="institutional-program-design-evidence-row" className="m3s-raised p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-950/45 text-cyan-300"><FileSearch size={19} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-cyan-300">{row.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{local(row.name)}</h5></div></div>
              <span className="inline-flex shrink-0 self-start rounded-md border border-amber-800/70 bg-amber-950/20 px-2.5 py-1.5 text-xs font-semibold text-amber-200">{t.status}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4">
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.expected}</p><ul className="mt-2 space-y-1.5">{row.evidence.map(item => <li key={local(item)} data-testid="institutional-program-design-evidence-item" className="flex items-start gap-2 text-sm leading-5 text-slate-300"><ClipboardCheck className="mt-0.5 shrink-0 text-cyan-300" size={14} aria-hidden="true" />{local(item)}</li>)}</ul></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.source}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(row.source)}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.owner}</p><p className="mt-2 text-sm leading-6 text-slate-300">{local(row.owner)}</p><p className="mt-3 text-xs font-semibold uppercase text-slate-400">{t.labels.sensitivity}</p><span className={`mt-2 inline-flex rounded-md border px-2.5 py-1.5 text-xs font-semibold ${row.sensitivity === 'restricted' ? 'border-rose-800/70 bg-rose-950/20 text-rose-200' : 'border-slate-700 bg-slate-950/30 text-slate-200'}`}>{t.sensitivity[row.sensitivity]}</span></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.control}</p><p className="mt-2 text-sm leading-6 text-amber-200">{t.control}</p></div>
            </div>
          </article>
        ))}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><Archive className="mt-0.5 shrink-0 text-cyan-300" size={16} aria-hidden="true" />{t.source}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}<LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" /></p>
      <div className="mt-3 rounded-md border border-cyan-800/70 bg-cyan-950/15 p-3"><p className="flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300"><ShieldCheck size={16} aria-hidden="true" />{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
    </section>
  );
};

export default InstitutionalProgramDesignEvidenceInventory;
