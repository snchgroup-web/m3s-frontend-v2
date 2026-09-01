import React from 'react';
import { AlertTriangle, BookOpen, Brain, ClipboardList, Compass, FileSearch, Lightbulb, LockKeyhole, Route, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'MATRICE GROUPÉE CONFIRMÉE · PGM-CON-REV-001 · V1.0 · 01-09-2026',
    title: 'Cadre de revue confirmé pour les six composantes de Conception',
    intro: 'Cheikh confirme la matrice dans son ensemble, sans exception, correction de preuve ni changement de responsable. Les preuves et responsables restent candidats jusqu’à une décision humaine distincte.',
    counters: [['6/6', 'lignes de cadrage confirmées'], ['0', 'preuves acceptées'], ['0', 'tâches d’exécution ouvertes'], ['—', 'progression non calculable']],
    rowStatus: 'Cadrage confirmé',
    labels: { target: 'Résultat cible sourcé', observed: 'État observé', action: 'Action de cadrage confirmée', evidence: 'Preuves candidates', owner: 'Responsable candidat', open: 'Point ouvert confirmé' },
    rows: [
      { id: 'CON-01', name: 'Préparation entrepreneuriale et personnelle · mindset', target: 'Diagnostic de disponibilité et d’engagement, règles personnelles de fonctionnement et risques identifiés.', observed: 'Contenu défini ; diagnostic et preuves à structurer.', action: 'Définir les questions de diagnostic, les critères et les preuves non sensibles.', evidence: ['Questionnaire ou auto-diagnostic borné', 'Règles personnelles de fonctionnement', 'Registre non sensible des contraintes et risques'], owner: 'Porteur(s) du projet · validation Direction', open: 'Périmètre, confidentialité et critères à confirmer.' },
      { id: 'CON-02', name: 'Brainstorming et orientations', target: 'Note d’orientation structurée et arbitrages initiaux tracés.', observed: 'Nombreux éléments produits ; périmètre cible à inventorier.', action: 'Inventorier les décisions, thèmes et arbitrages déjà produits.', evidence: ['Inventaire des notes et conversations', 'Note d’orientation consolidée', 'Journal des arbitrages et versions'], owner: 'Direction · appui Administration', open: 'Corpus cible et statut des orientations à confirmer.' },
      { id: 'CON-03', name: 'Base de connaissances et veille', target: 'Sources inventoriées, qualifiées, classées et réutilisables.', observed: 'Ressources existantes ; inventaire et qualification à consolider.', action: 'Définir le corpus cible, les sources maîtresses candidates et les règles de classement.', evidence: ['Inventaire des sources', 'Fiches de qualification et fraîcheur', 'Taxonomie et règles de classement'], owner: 'IT & Support / Knowledge Management · validation métier', open: 'Corpus, sources maîtresses et propriétaire à confirmer.' },
      { id: 'CON-04', name: 'Cadrage institutionnel et stratégique', target: 'Documents directeurs et stratégiques cohérents, avec statut et source visibles.', observed: 'Documents existants ; statuts et alignement à contrôler.', action: 'Raccorder l’inventaire documentaire gouverné et traiter les écarts prioritaires.', evidence: ['Inventaire des documents directeurs', 'Statuts, versions et sources', 'Table de cohérence et écarts prioritaires'], owner: 'Direction et Administration · conservation GED', open: 'Hiérarchie documentaire et écarts bloquants à arbitrer.' },
      { id: 'CON-05', name: 'Faisabilité et pré-projet', target: 'Dossier de pré-projet et décision humaine de poursuivre, corriger ou suspendre.', observed: 'Éléments dispersés ; dossier de décision à constituer.', action: 'Définir la fiche minimale de faisabilité et les critères Go / No-Go.', evidence: ['Fiche de faisabilité', 'Hypothèses de besoins, ressources, budget et risques', 'Décision humaine Go / Corriger / Suspendre'], owner: 'Direction · contributions Finances, LEGAL et fonctions concernées', open: 'Hypothèses, seuils et autorité de décision à confirmer.' },
      { id: 'CON-06', name: 'Trajectoire initiale', target: 'Feuille de route initiale approuvée.', observed: 'Trajectoire et journaux existants ; critères de passage à formaliser.', action: 'Consolider priorités, dépendances, jalons et conditions de passage.', evidence: ['Feuille de route versionnée', 'Registre des dépendances et jalons', 'Critères et décision de passage vers Mise en place'], owner: 'Direction · pilotage Administration', open: 'Ordre cible, jalons et conditions de passage à confirmer.' }
    ],
    source: 'Sources bornées : Modèle du Programme institutionnel global 2SG V0.2 du 23-08-2026, sections 3.1 et Lecture prudente ; Matrice de cadrage V0.1 du 23-08-2026, lignes CON-01 à CON-06 ; PGM-DEC-001 et PGM-DEC-002 V1.0.',
    recordLabels: { eyebrow: 'Trace de décision gouvernée', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision consignée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'PGM-DEC-002', version: 'V1.0', status: 'Matrice Conception confirmée', author: 'Cheikh Ndiaye', date: '01-09-2026', decision: 'PGM-CON-REV-001 V0.1 est confirmé sans exception, correction de preuve ni changement de responsable et promu en V1.0 comme cadre de revue des six composantes de Conception.', evidence: 'Confirmation explicite de Cheikh dans la session du 01-09-2026 : « merci, je confirme PGM-CON-REV-001 V0.1, en signalant uniquement les exceptions, corrections de preuve ou changements de responsable. »', limit: 'La décision confirme le cadrage documentaire. Elle n’accepte aucune preuve candidate, ne mandate aucun responsable candidat, n’ouvre aucune tâche d’exécution, ne déclare aucune composante achevée et ne calcule aucune progression.' },
    boundary: 'Cadrage confirmé uniquement. Aucune preuve n’est acceptée, aucun responsable n’est mandaté, aucune tâche d’exécution n’est ouverte, aucune composante n’est déclarée achevée et aucun pourcentage n’est calculé.',
    next: 'Prochaine porte candidate',
    confirmation: 'Autoriser ou non la préparation de PGM-CON-EVD-001 V0.1 comme inventaire probatoire groupé des six composantes, sans collecte externe, accès réel ni exécution.'
  },
  EN: {
    eyebrow: 'CONFIRMED GROUPED MATRIX · PGM-CON-REV-001 · V1.0 · 1 SEP 2026',
    title: 'Confirmed review framework for the six Design components',
    intro: 'Cheikh confirms the matrix as a whole, with no exception, evidence correction or owner change. Evidence and owners remain candidates pending a separate human decision.',
    counters: [['6/6', 'framing rows confirmed'], ['0', 'evidence items accepted'], ['0', 'execution tasks opened'], ['—', 'progress not calculable']],
    rowStatus: 'Framing confirmed',
    labels: { target: 'Sourced target outcome', observed: 'Observed state', action: 'Confirmed framing action', evidence: 'Candidate evidence', owner: 'Candidate owner', open: 'Confirmed open point' },
    rows: [
      { id: 'CON-01', name: 'Entrepreneurial and personal readiness · mindset', target: 'Availability and commitment diagnosis, personal operating rules and identified risks.', observed: 'Content defined; diagnosis and evidence to structure.', action: 'Define diagnostic questions, criteria and non-sensitive evidence.', evidence: ['Bounded questionnaire or self-assessment', 'Personal operating rules', 'Non-sensitive constraints and risk register'], owner: 'Project lead(s) · Direction validation', open: 'Scope, confidentiality and criteria to confirm.' },
      { id: 'CON-02', name: 'Brainstorming and direction', target: 'Structured direction note and traceable initial decisions.', observed: 'Many items produced; target scope to inventory.', action: 'Inventory decisions, themes and choices already produced.', evidence: ['Inventory of notes and conversations', 'Consolidated direction note', 'Decision and version log'], owner: 'Direction · Administration support', open: 'Target corpus and status of directions to confirm.' },
      { id: 'CON-03', name: 'Knowledge base and monitoring', target: 'Inventoried, qualified, classified and reusable sources.', observed: 'Resources exist; inventory and qualification to consolidate.', action: 'Define the target corpus, candidate master sources and classification rules.', evidence: ['Source inventory', 'Qualification and freshness records', 'Taxonomy and classification rules'], owner: 'IT & Support / Knowledge Management · business validation', open: 'Corpus, master sources and owner to confirm.' },
      { id: 'CON-04', name: 'Institutional and strategic framing', target: 'Consistent governing and strategic documents with visible status and source.', observed: 'Documents exist; status and alignment to control.', action: 'Connect the governed document inventory and handle priority gaps.', evidence: ['Governing-document inventory', 'Statuses, versions and sources', 'Consistency and priority-gap table'], owner: 'Direction and Administration · DMS retention', open: 'Document hierarchy and blocking gaps to decide.' },
      { id: 'CON-05', name: 'Feasibility and pre-project', target: 'Pre-project file and human decision to proceed, correct or suspend.', observed: 'Scattered elements; decision file to assemble.', action: 'Define the minimum feasibility sheet and Go / No-Go criteria.', evidence: ['Feasibility sheet', 'Needs, resources, budget and risk assumptions', 'Human Go / Correct / Suspend decision'], owner: 'Direction · Finance, LEGAL and relevant function inputs', open: 'Assumptions, thresholds and decision authority to confirm.' },
      { id: 'CON-06', name: 'Initial roadmap', target: 'Approved initial roadmap.', observed: 'Roadmap and work logs exist; passage criteria to formalise.', action: 'Consolidate priorities, dependencies, milestones and passage conditions.', evidence: ['Versioned roadmap', 'Dependency and milestone register', 'Criteria and decision to move into Implementation'], owner: 'Direction · Administration steering', open: 'Target order, milestones and passage conditions to confirm.' }
    ],
    source: 'Bounded sources: 2SG Global Institutional Programme Model V0.2 dated 23 Aug 2026, sections 3.1 and Cautious current Design reading; Framing Matrix V0.1 dated 23 Aug 2026, rows CON-01 through CON-06; PGM-DEC-001 and PGM-DEC-002 V1.0.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'PGM-DEC-002', version: 'V1.0', status: 'Design matrix confirmed', author: 'Cheikh Ndiaye', date: '1 Sep 2026', decision: 'PGM-CON-REV-001 V0.1 is confirmed with no exception, evidence correction or owner change and promoted to V1.0 as the review framework for the six Design components.', evidence: 'Cheikh’s explicit confirmation in the 1 Sep 2026 session, retained in French: “merci, je confirme PGM-CON-REV-001 V0.1, en signalant uniquement les exceptions, corrections de preuve ou changements de responsable.”', limit: 'The decision confirms the documentary framing. It accepts no candidate evidence, mandates no candidate owner, opens no execution task, declares no component complete and calculates no progress.' },
    boundary: 'Confirmed framing only. No evidence is accepted, no owner mandated, no execution task opened, no component declared complete and no percentage calculated.',
    next: 'Next candidate gate',
    confirmation: 'Authorise or decline preparation of PGM-CON-EVD-001 V0.1 as the grouped evidence inventory for all six components, without external collection, real access or execution.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE GEBÜNDELTE MATRIX · PGM-CON-REV-001 · V1.0 · 01.09.2026',
    title: 'Bestätigter Prüfrahmen für die sechs Konzeptionskomponenten',
    intro: 'Cheikh bestätigt die Matrix als Ganzes ohne Ausnahme, Nachweiskorrektur oder Verantwortungsänderung. Nachweise und Verantwortungen bleiben bis zu einem getrennten menschlichen Entscheid Kandidaten.',
    counters: [['6/6', 'Strukturierungszeilen bestätigt'], ['0', 'Nachweise angenommen'], ['0', 'Ausführungsaufgaben geöffnet'], ['—', 'Fortschritt nicht berechenbar']],
    rowStatus: 'Rahmen bestätigt',
    labels: { target: 'Belegtes Zielergebnis', observed: 'Beobachteter Stand', action: 'Bestätigte Strukturierungsaktion', evidence: 'Kandidatennachweise', owner: 'Kandidatenverantwortung', open: 'Bestätigter offener Punkt' },
    rows: [
      { id: 'CON-01', name: 'Unternehmerische und persönliche Vorbereitung · Mindset', target: 'Diagnose von Verfügbarkeit und Engagement, persönliche Arbeitsregeln und identifizierte Risiken.', observed: 'Inhalt definiert; Diagnose und Nachweise zu strukturieren.', action: 'Diagnosefragen, Kriterien und nicht sensible Nachweise definieren.', evidence: ['Begrenzter Fragebogen oder Selbstdiagnose', 'Persönliche Arbeitsregeln', 'Nicht sensibles Register der Einschränkungen und Risiken'], owner: 'Projektträger · Validierung durch Direktion', open: 'Umfang, Vertraulichkeit und Kriterien zu bestätigen.' },
      { id: 'CON-02', name: 'Brainstorming und Ausrichtung', target: 'Strukturierte Ausrichtungsnotiz und nachvollziehbare Anfangsentscheide.', observed: 'Viele Elemente erstellt; Zielumfang zu inventarisieren.', action: 'Bereits erstellte Entscheide, Themen und Abwägungen inventarisieren.', evidence: ['Inventar von Notizen und Gesprächen', 'Konsolidierte Ausrichtungsnotiz', 'Entscheid- und Versionsjournal'], owner: 'Direktion · Unterstützung Administration', open: 'Zielkorpus und Status der Ausrichtungen zu bestätigen.' },
      { id: 'CON-03', name: 'Wissensbasis und Monitoring', target: 'Inventarisierte, qualifizierte, klassifizierte und wiederverwendbare Quellen.', observed: 'Ressourcen vorhanden; Inventar und Qualifizierung zu konsolidieren.', action: 'Zielkorpus, Kandidaten-Masterquellen und Klassifizierungsregeln definieren.', evidence: ['Quelleninventar', 'Qualifizierungs- und Aktualitätsnachweise', 'Taxonomie und Klassifizierungsregeln'], owner: 'IT & Support / Wissensmanagement · Fachvalidierung', open: 'Korpus, Masterquellen und Verantwortung zu bestätigen.' },
      { id: 'CON-04', name: 'Institutioneller und strategischer Rahmen', target: 'Kohärente Leit- und Strategiedokumente mit sichtbarem Status und Quelle.', observed: 'Dokumente vorhanden; Status und Ausrichtung zu kontrollieren.', action: 'Gesteuertes Dokumentinventar verbinden und prioritäre Lücken behandeln.', evidence: ['Inventar der Leitdokumente', 'Status, Versionen und Quellen', 'Tabelle der Kohärenz und prioritären Lücken'], owner: 'Direktion und Administration · DMS-Aufbewahrung', open: 'Dokumenthierarchie und blockierende Lücken zu entscheiden.' },
      { id: 'CON-05', name: 'Machbarkeit und Vorprojekt', target: 'Vorprojektdossier und menschlicher Entscheid für Fortsetzung, Korrektur oder Aussetzung.', observed: 'Verteilte Elemente; Entscheidungsdossier zu erstellen.', action: 'Minimales Machbarkeitsblatt und Go-/No-Go-Kriterien definieren.', evidence: ['Machbarkeitsblatt', 'Annahmen zu Bedarf, Ressourcen, Budget und Risiken', 'Menschlicher Entscheid Go / Korrigieren / Aussetzen'], owner: 'Direktion · Beiträge Finanzen, LEGAL und betroffene Funktionen', open: 'Annahmen, Schwellen und Entscheidungsbefugnis zu bestätigen.' },
      { id: 'CON-06', name: 'Initialer Fahrplan', target: 'Genehmigter initialer Fahrplan.', observed: 'Fahrplan und Arbeitsjournale vorhanden; Übergangskriterien zu formalisieren.', action: 'Prioritäten, Abhängigkeiten, Meilensteine und Übergangsbedingungen konsolidieren.', evidence: ['Versionierter Fahrplan', 'Register der Abhängigkeiten und Meilensteine', 'Kriterien und Entscheid zum Übergang in die Umsetzung'], owner: 'Direktion · Steuerung Administration', open: 'Zielreihenfolge, Meilensteine und Übergangsbedingungen zu bestätigen.' }
    ],
    source: 'Begrenzte Quellen: Modell des globalen institutionellen 2SG-Programms V0.2 vom 23.08.2026, Abschnitte 3.1 und Vorsichtige aktuelle Lektüre der Konzeption; Strukturierungsmatrix V0.1 vom 23.08.2026, Zeilen CON-01 bis CON-06; PGM-DEC-001 und PGM-DEC-002 V1.0.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'PGM-DEC-002', version: 'V1.0', status: 'Konzeptionsmatrix bestätigt', author: 'Cheikh Ndiaye', date: '01.09.2026', decision: 'PGM-CON-REV-001 V0.1 wird ohne Ausnahme, Nachweiskorrektur oder Verantwortungsänderung bestätigt und als Prüfrahmen der sechs Konzeptionskomponenten zu V1.0 befördert.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 01.09.2026, im französischen Originalwortlaut: „merci, je confirme PGM-CON-REV-001 V0.1, en signalant uniquement les exceptions, corrections de preuve ou changements de responsable.“', limit: 'Der Entscheid bestätigt den dokumentarischen Rahmen. Er nimmt keinen Kandidatennachweis an, mandatiert keine Kandidatenverantwortung, öffnet keine Ausführungsaufgabe, erklärt keine Komponente als abgeschlossen und berechnet keinen Fortschritt.' },
    boundary: 'Nur der Rahmen ist bestätigt. Kein Nachweis ist angenommen, keine Verantwortung mandatiert, keine Ausführungsaufgabe geöffnet, keine Komponente als abgeschlossen erklärt und kein Prozentsatz berechnet.',
    next: 'Nächstes Kandidatentor',
    confirmation: 'Die Vorbereitung von PGM-CON-EVD-001 V0.1 als gebündeltes Nachweisinventar der sechs Komponenten erlauben oder ablehnen, ohne externe Sammlung, realen Zugriff oder Ausführung.'
  }
};

const ROW_ICONS = [Brain, Lightbulb, BookOpen, ShieldCheck, FileSearch, Route];

const InstitutionalProgramDesignReviewMatrix = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-program-design-review-matrix" data-testid="institutional-program-design-review-matrix" className="scroll-mt-24 m3s-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ClipboardList className="shrink-0 text-violet-300" size={28} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {t.counters.map(([value, label], index) => <article key={label} className="m3s-raised min-h-24 p-3"><p className={`text-xl font-semibold ${index === 0 ? 'text-violet-300' : index === 1 ? 'text-amber-300' : 'text-slate-200'}`}>{value}</p><p className="mt-2 text-xs leading-5 text-slate-300">{label}</p></article>)}
      </div>

      <div className="mt-4 space-y-3">
        {t.rows.map((row, index) => {
          const Icon = ROW_ICONS[index];
          return (
            <article key={row.id} data-testid="institutional-program-design-review-row" className="m3s-raised p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-violet-950/45 text-violet-300"><Icon size={19} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-violet-300">{row.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{row.name}</h5></div></div>
                <span className="inline-flex shrink-0 self-start rounded-md border border-amber-800/70 bg-amber-950/20 px-2.5 py-1.5 text-xs font-semibold text-amber-200">{t.rowStatus}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.target}</p><p className="mt-1 text-sm leading-6 text-slate-200">{row.target}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.observed}</p><p className="mt-1 text-sm leading-6 text-slate-300">{row.observed}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.action}</p><p className="mt-1 text-sm leading-6 text-slate-300">{row.action}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.evidence}</p><ul className="mt-1 space-y-1">{row.evidence.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-300"><FileSearch className="mt-0.5 shrink-0 text-cyan-300" size={14} aria-hidden="true" />{item}</li>)}</ul></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.owner}</p><p className="mt-1 text-sm leading-6 text-slate-300">{row.owner}</p></div>
                <div><p className="text-xs font-semibold uppercase text-slate-400">{t.labels.open}</p><p className="mt-1 text-sm font-semibold leading-6 text-amber-200">{row.open}</p></div>
              </div>
            </article>
          );
        })}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <p className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-400"><Compass className="mt-0.5 shrink-0 text-violet-300" size={16} aria-hidden="true" />{t.source}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-800/70 bg-amber-950/15 p-3 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}<LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" /></p>
      <div className="mt-3 rounded-md border border-violet-800/70 bg-violet-950/15 p-3"><p className="text-xs font-semibold uppercase text-violet-300">{t.next}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{t.confirmation}</p></div>
    </section>
  );
};

export default InstitutionalProgramDesignReviewMatrix;
