import React from 'react';
import { AlertTriangle, CheckCircle2, ClipboardList, FileCheck2, LockKeyhole, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const PACKAGES = [
  {
    id: 'COL-EXC-01',
    family: 'EXC-01',
    title: text('Service PostgreSQL et environnements', 'PostgreSQL service and environments', 'PostgreSQL-Dienst und Umgebungen'),
    owner: text('IT & Support', 'IT & Support', 'IT & Support'),
    evidence: [
      text('Compte 2SG autorisé et offre fournisseur retenue', 'Authorised 2SG account and selected provider offer', 'Autorisiertes 2SG-Konto und ausgewähltes Anbieterangebot'),
      text('Région d’hébergement et séparation des environnements', 'Hosting region and environment separation', 'Hosting-Region und Umgebungstrennung'),
      text('Responsable nominatif et mandat d’exécution', 'Named owner and execution mandate', 'Namentliche Verantwortung und Ausführungsmandat')
    ]
  },
  {
    id: 'COL-EXC-02',
    family: 'EXC-02',
    title: text('Continuité, sauvegarde et restauration', 'Continuity, backup and restoration', 'Kontinuität, Sicherung und Wiederherstellung'),
    owner: text('IT & Support · Administration / GED', 'IT & Support · Administration / DMS', 'IT & Support · Verwaltung / DMS'),
    evidence: [
      text('Rapport de sauvegarde chiffrée et règle de conservation', 'Encrypted-backup report and retention rule', 'Bericht zur verschlüsselten Sicherung und Aufbewahrungsregel'),
      text('Journal de restauration synthétique et temps mesuré', 'Synthetic-restore log and measured time', 'Protokoll der synthetischen Wiederherstellung und gemessene Zeit'),
      text('Référence GED gouvernée et résultat du contrôle', 'Governed DMS reference and control result', 'Gesteuerte DMS-Referenz und Kontrollergebnis')
    ]
  },
  {
    id: 'COL-EXC-03',
    family: 'EXC-03',
    title: text('Identité et fenêtre de migration', 'Identity and migration window', 'Identität und Migrationsfenster'),
    owner: text('IT & Support · autorité à deux personnes', 'IT & Support · two-person authority', 'IT & Support · Zwei-Personen-Autorität'),
    evidence: [
      text('Identifiant technique dédié et droits minimaux', 'Dedicated technical identifier and least privilege', 'Eigene technische Kennung und geringste Berechtigung'),
      text('Deux autorisations signées et journal horodaté', 'Two signed approvals and timestamped log', 'Zwei unterzeichnete Freigaben und Zeitprotokoll'),
      text('Assertions, règle d’arrêt et autorité de retour arrière', 'Assertions, stop rule and rollback authority', 'Prüfungen, Stoppregel und Rollback-Befugnis')
    ]
  },
  {
    id: 'COL-EXC-04',
    family: 'EXC-04',
    title: text('Références GED gouvernées', 'Governed DMS references', 'Gesteuerte DMS-Referenzen'),
    owner: text('Administration / GED · IT & Support', 'Administration / DMS · IT & Support', 'Verwaltung / DMS · IT & Support'),
    evidence: [
      text('Deux références GED créées après autorisation', 'Two DMS references created after authorisation', 'Zwei nach Freigabe erstellte DMS-Referenzen'),
      text('Droits d’accès et règle de conservation applicables', 'Applicable access rights and retention rule', 'Anwendbare Zugriffsrechte und Aufbewahrungsregel'),
      text('Identifiants opaques et journal d’audit', 'Opaque identifiers and audit log', 'Opake Kennungen und Auditprotokoll')
    ]
  },
  {
    id: 'COL-EXC-05',
    family: 'EXC-05',
    title: text('Outbox, reprise et supervision', 'Outbox, recovery and monitoring', 'Outbox, Wiederanlauf und Überwachung'),
    owner: text('IT & Support · fonctions destinataires', 'IT & Support · recipient functions', 'IT & Support · Empfängerfunktionen'),
    evidence: [
      text('Contrat d’événement, titulaire et destinataires autorisés', 'Event contract, holder and authorised recipients', 'Ereignisvertrag, Träger und autorisierte Empfänger'),
      text('Test d’idempotence, métriques et seuils d’alerte', 'Idempotency test, metrics and alert thresholds', 'Idempotenztest, Metriken und Alarmschwellen'),
      text('Procédure de quarantaine et de rejeu contrôlé', 'Quarantine and controlled replay procedure', 'Verfahren für Quarantäne und kontrollierte Wiederholung')
    ]
  }
];

const COPY = {
  FR: {
    eyebrow: 'PLAN DE PREUVES CONFIRMÉ · REF-01-G1-COL-003 · V1.0 · 30-08-2026',
    title: 'Cinq dossiers de preuves organisés, collecte toujours fermée',
    intro: 'DEC-068 confirme l’organisation documentaire issue d’ARB-002 V1.0. Les pièces attendues et les fonctions responsables candidates sont cadrées, sans contact, compte, donnée sensible, connexion ni test.',
    counters: [['Dossiers confirmés', '5/5', 'Un par famille confirmée'], ['Décisions enregistrées', '1', 'REF-01-DEC-068'], ['Pièces reçues', '0', 'Aucune collecte lancée'], ['Autorisations L2', '0', 'G1 reste ouverte']],
    labels: { owner: 'Fonctions responsables candidates', evidence: 'Pièces attendues' },
    status: 'CONFIRMÉ · COLLECTE NON OUVERTE',
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'COL-003 V1.0 reste le plan documentaire gouverné des cinq dossiers. DEC-069 confirme désormais REQ-002 V1.0 comme modèle unique sans envoi.',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 confirmé comme plan documentaire', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-COL-003 V0.1 est confirmé sans amendement et promu en V1.0 comme plan documentaire des cinq dossiers de preuves COL-EXC-01 à COL-EXC-05.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « Je confirme REF-01-G1-COL-003 V0.1 comme plan documentaire des cinq dossiers de preuves. »', limit: 'La décision valide uniquement l’organisation documentaire. Elle n’autorise aucun contact, envoi, collecte réelle, transmission sensible, compte, infrastructure, connexion, test, dépense ou action L2 ; G1 reste ouverte.' },
    boundary: 'Les pièces reçues et les tests exécutés restent à zéro. Toute émission, collecte réelle, transmission sensible, création d’infrastructure, connexion ou test exige une autorisation humaine distincte.'
  },
  EN: {
    eyebrow: 'CONFIRMED EVIDENCE PLAN · REF-01-G1-COL-003 · V1.0 · 30 AUG 2026',
    title: 'Five evidence files organised, collection still closed',
    intro: 'DEC-068 confirms the documentary organisation derived from ARB-002 V1.0. Expected records and candidate responsible functions are framed, with no contact, account, sensitive data, connection or test.',
    counters: [['Confirmed files', '5/5', 'One per confirmed family'], ['Recorded decisions', '1', 'REF-01-DEC-068'], ['Records received', '0', 'No collection started'], ['L2 authorisations', '0', 'G1 remains open']],
    labels: { owner: 'Candidate responsible functions', evidence: 'Expected records' },
    status: 'CONFIRMED · COLLECTION NOT OPEN',
    decisionTitle: 'Fast Track decision outcome',
    decision: 'COL-003 V1.0 remains the governed documentary plan for the five files. DEC-069 now confirms REQ-002 V1.0 as one template without release.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 confirmed as documentary plan', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-COL-003 V0.1 is confirmed without amendment and promoted to V1.0 as the documentary plan for the five COL-EXC-01 through COL-EXC-05 evidence files.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session: “I confirm REF-01-G1-COL-003 V0.1 as the documentary plan for the five evidence files.”', limit: 'The decision validates documentary organisation only. It authorises no contact, release, real collection, sensitive transmission, account, infrastructure, connection, test, expense or L2 action; G1 remains open.' },
    boundary: 'Records received and tests run remain at zero. Any release, real collection, sensitive transmission, infrastructure creation, connection or test requires a separate human authorisation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER NACHWEISPLAN · REF-01-G1-COL-003 · V1.0 · 30.08.2026',
    title: 'Fünf Nachweisakten organisiert, Sammlung weiter geschlossen',
    intro: 'DEC-068 bestätigt die aus ARB-002 V1.0 abgeleitete Dokumentationsorganisation. Erwartete Unterlagen und Kandidatenfunktionen sind strukturiert, ohne Kontakt, Konto, sensible Daten, Verbindung oder Prüfung.',
    counters: [['Bestätigte Akten', '5/5', 'Eine je bestätigter Familie'], ['Erfasste Entscheide', '1', 'REF-01-DEC-068'], ['Erhaltene Unterlagen', '0', 'Keine Sammlung gestartet'], ['L2-Autorisierungen', '0', 'G1 bleibt offen']],
    labels: { owner: 'Kandidatenfunktionen', evidence: 'Erwartete Unterlagen' },
    status: 'BESTÄTIGT · SAMMLUNG NICHT GEÖFFNET',
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'COL-003 V1.0 bleibt der gesteuerte Dokumentationsplan der fünf Akten. DEC-069 bestätigt nun REQ-002 V1.0 als einheitliche Vorlage ohne Versand.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-068', version: 'V1.0', status: 'COL-003 als Dokumentationsplan bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-COL-003 V0.1 wird ohne Änderung bestätigt und zu V1.0 als Dokumentationsplan für die fünf Nachweisakten COL-EXC-01 bis COL-EXC-05.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026: „Ich bestätige REF-01-G1-COL-003 V0.1 als Dokumentationsplan der fünf Nachweisakten.“', limit: 'Der Entscheid validiert nur die Dokumentationsorganisation. Er erlaubt keinen Kontakt, Versand, reale Sammlung, sensible Übermittlung, kein Konto, keine Infrastruktur, Verbindung, Prüfung, Ausgabe oder L2-Aktion; G1 bleibt offen.' },
    boundary: 'Erhaltene Unterlagen und ausgeführte Prüfungen bleiben bei null. Jeder Versand, jede reale Sammlung, sensible Übermittlung, Infrastrukturerstellung, Verbindung oder Prüfung benötigt einen getrennten menschlichen Entscheid.'
  }
};

const InstitutionalPeopleTeamsFastTrackEvidenceCollection = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-col-003" data-testid="ref01-g1-fast-track-evidence-plan" className="scroll-mt-24 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ClipboardList className="shrink-0 text-cyan-300" size={26} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <CheckCircle2 className="text-cyan-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {PACKAGES.map(item => (
          <article key={item.id} data-testid="ref01-g1-fast-track-evidence-family" className="m3s-raised p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold text-cyan-300">{item.id} · {item.family}</p><h5 className="mt-1 text-sm font-semibold text-slate-100">{item.title[language] || item.title.FR}</h5></div><span className="inline-flex self-start rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.status}</span></div>
            <p className="mt-3 text-xs font-semibold text-slate-400">{t.labels.owner}</p>
            <p className="mt-1 text-sm text-slate-200">{item.owner[language] || item.owner.FR}</p>
            <p className="mt-3 text-xs font-semibold text-cyan-300">{t.labels.evidence}</p>
            <ul className="mt-2 space-y-2">{item.evidence.map(entry => <li key={entry.FR} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><FileCheck2 className="mt-0.5 shrink-0 text-cyan-300" size={15} aria-hidden="true" />{entry[language] || entry.FR}</li>)}</ul>
          </article>
        ))}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-cyan-700/70 bg-cyan-950/20 p-4"><div className="flex items-center gap-2"><ShieldCheck className="text-cyan-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-cyan-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-cyan-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackEvidenceCollection;
