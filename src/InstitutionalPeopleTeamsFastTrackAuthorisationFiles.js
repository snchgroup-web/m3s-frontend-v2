import React from 'react';
import { AlertTriangle, FileLock2, LockKeyhole, SendHorizontal, ShieldX } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const FILES = [
  ['AUT-EXC-01', 'NAM-EXC-01', 'REC-EXC-01', 'COL-EXC-01', text('Service PostgreSQL et environnements', 'PostgreSQL service and environments', 'PostgreSQL-Dienst und Umgebungen')],
  ['AUT-EXC-02', 'NAM-EXC-02', 'REC-EXC-02', 'COL-EXC-02', text('Continuité, sauvegarde et restauration', 'Continuity, backup and restoration', 'Kontinuität, Sicherung und Wiederherstellung')],
  ['AUT-EXC-03', 'NAM-EXC-03', 'REC-EXC-03', 'COL-EXC-03', text('Identité technique et fenêtre de migration', 'Technical identity and migration window', 'Technische Identität und Migrationsfenster')],
  ['AUT-EXC-04', 'NAM-EXC-04', 'REC-EXC-04', 'COL-EXC-04', text('Références GED, droits et conservation', 'DMS references, rights and retention', 'DMS-Referenzen, Rechte und Aufbewahrung')],
  ['AUT-EXC-05', 'NAM-EXC-05', 'REC-EXC-05', 'COL-EXC-05', text('Outbox, destinataires et supervision', 'Outbox, recipients and monitoring', 'Outbox, Empfänger und Überwachung')]
];

const COPY = {
  FR: {
    eyebrow: 'DOSSIERS D’AUTORISATION CONFIRMÉS · REF-01-G1-AUT-003 · V1.0 · 30-08-2026',
    title: 'Cinq dossiers gouvernés, toujours vides et non exécutoires',
    intro: 'DEC-072 confirme AUT-003 comme cadre de contrôle relié aux cinq emplacements NAM-EXC. La décision valide la structure, pas une autorisation : chaque dossier reste sans identité, autorité vérifiée, canal ni décision exécutoire.',
    counters: [['Dossiers confirmés', '5/5', 'Un par emplacement NAM-EXC'], ['Identités inscrites', '0', 'Aucun titulaire réel'], ['Autorisations accordées', '0', 'Aucune décision exécutoire'], ['Contacts ou envois', '0', 'Aucun canal sélectionné']],
    labels: { slot: 'Emplacement confirmé', profile: 'Profil fonctionnel', evidence: 'Dossier de preuve', purpose: 'Objet du dossier', identity: 'Identité', channel: 'Canal', validity: 'Validité', dms: 'GED', status: 'VIDE · NON AUTORISÉ' },
    checksTitle: 'Champs obligatoires avant toute autorisation unitaire',
    checks: ['Identité ou raison sociale vérifiée séparément', 'Qualité, mandat et autorité actuels prouvés', 'Objet et portée minimale de l’autorisation', 'Sensibilité et droits d’accès qualifiés', 'Canal professionnel autorisé séparément', 'Validité, expiration et révocation définies', 'Responsable interne et double contrôle', 'Référence GED restreinte et journal d’audit'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-072', version: 'V1.0', status: 'AUT-003 confirmé sans autorisation ni contact', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-AUT-003 V0.1 est confirmé sans amendement et promu en V1.0 comme cadre des cinq dossiers d’autorisation vides.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « Je confirme REF-01-G1-AUT-003 V0.1 comme cadre des cinq dossiers d’autorisation vides, sans autoriser ni contacter personne. »', limit: 'La décision confirme uniquement le cadre vide. Elle n’autorise aucune identité, entreprise, adresse, affectation, prise de contact, émission, collecte, accès, dépense, connexion ou action L2 ; G1 reste ouverte.' },
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'AUT-003 V1.0 gouverne désormais les cinq dossiers vides. Toute future autorisation restera une décision humaine unitaire appuyée par les huit champs obligatoires.',
    nextTitle: 'Arbitrage groupé suivant confirmé',
    next: 'REF-01-DEC-077 accepte les 6/6 résultats synthétiques de M3S-INB-002 V1.0 et clôt le lot fictif. Le focus revient aux preuves G1 manquantes ; aucun traitement réel ni L2 n’est ouvert.',
    boundary: 'La confirmation du cadre ne remplira aucun dossier et n’autorisera aucune identité, entreprise, adresse, affectation, prise de contact, émission, collecte, accès, dépense, connexion ou action L2.'
  },
  EN: {
    eyebrow: 'CONFIRMED AUTHORISATION FILES · REF-01-G1-AUT-003 · V1.0 · 30 AUG 2026',
    title: 'Five governed files that remain empty and non-executable',
    intro: 'DEC-072 confirms AUT-003 as the control framework linked to the five NAM-EXC slots. The decision validates the structure, not an authorisation: every file remains without identity, verified authority, channel or executable decision.',
    counters: [['Confirmed files', '5/5', 'One per NAM-EXC slot'], ['Entered identities', '0', 'No real holder'], ['Granted authorisations', '0', 'No executable decision'], ['Contacts or sends', '0', 'No channel selected']],
    labels: { slot: 'Confirmed slot', profile: 'Functional profile', evidence: 'Evidence file', purpose: 'File purpose', identity: 'Identity', channel: 'Channel', validity: 'Validity', dms: 'DMS', status: 'EMPTY · NOT AUTHORISED' },
    checksTitle: 'Required fields before any individual authorisation',
    checks: ['Identity or legal entity verified separately', 'Current capacity, mandate and authority evidenced', 'Purpose and minimum authorisation scope', 'Sensitivity and access rights qualified', 'Professional channel authorised separately', 'Validity, expiry and revocation defined', 'Internal owner and two-person control', 'Restricted DMS reference and audit trail'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-072', version: 'V1.0', status: 'AUT-003 confirmed without authorisation or contact', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-AUT-003 V0.1 is confirmed without amendment and promoted to V1.0 as the framework for five empty authorisation files.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session: “I confirm REF-01-G1-AUT-003 V0.1 as the framework for the five empty authorisation files, without authorising or contacting anyone.”', limit: 'The decision confirms only the empty framework. It authorises no identity, company, address, assignment, contact, release, collection, access, expense, connection or L2 action; G1 remains open.' },
    decisionTitle: 'Fast Track decision outcome',
    decision: 'AUT-003 V1.0 now governs the five empty files. Every future authorisation remains an individual human decision supported by the eight mandatory fields.',
    nextTitle: 'Next grouped decision confirmed',
    next: 'REF-01-DEC-077 accepts all 6/6 M3S-INB-002 V1.0 synthetic results and closes the fictional package. Focus returns to missing G1 evidence; no real-data processing or L2 is open.',
    boundary: 'Confirming the framework will fill no file and authorise no identity, company, address, assignment, contact, release, collection, access, expense, connection or L2 action.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE AUTORISIERUNGSAKTEN · REF-01-G1-AUT-003 · V1.0 · 30.08.2026',
    title: 'Fünf gesteuerte, weiterhin leere und nicht ausführbare Akten',
    intro: 'DEC-072 bestätigt AUT-003 als Kontrollrahmen für die fünf NAM-EXC-Stellen. Der Entscheid validiert die Struktur, nicht eine Autorisierung: Jede Akte bleibt ohne Identität, geprüfte Befugnis, Kanal oder ausführbaren Entscheid.',
    counters: [['Bestätigte Akten', '5/5', 'Eine je NAM-EXC-Stelle'], ['Eingetragene Identitäten', '0', 'Kein realer Träger'], ['Erteilte Autorisierungen', '0', 'Kein ausführbarer Entscheid'], ['Kontakte oder Versand', '0', 'Kein Kanal ausgewählt']],
    labels: { slot: 'Bestätigte Stelle', profile: 'Funktionsprofil', evidence: 'Nachweisakte', purpose: 'Zweck der Akte', identity: 'Identität', channel: 'Kanal', validity: 'Gültigkeit', dms: 'DMS', status: 'LEER · NICHT AUTORISIERT' },
    checksTitle: 'Pflichtfelder vor jeder Einzelautorisierung',
    checks: ['Identität oder Rechtsträger getrennt geprüft', 'Aktuelle Eigenschaft, Mandat und Befugnis belegt', 'Zweck und minimaler Autorisierungsumfang', 'Sensibilität und Zugriffsrechte qualifiziert', 'Fachkanal getrennt autorisiert', 'Gültigkeit, Ablauf und Widerruf definiert', 'Interne Verantwortung und Zwei-Personen-Kontrolle', 'Eingeschränkte DMS-Referenz und Auditspur'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-072', version: 'V1.0', status: 'AUT-003 ohne Autorisierung oder Kontakt bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-AUT-003 V0.1 wird ohne Änderung bestätigt und zu V1.0 als Rahmen für fünf leere Autorisierungsakten.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026: „Ich bestätige REF-01-G1-AUT-003 V0.1 als Rahmen der fünf leeren Autorisierungsakten, ohne jemanden zu autorisieren oder zu kontaktieren.“', limit: 'Der Entscheid bestätigt nur den leeren Rahmen. Er erlaubt keine Identität, Firma, Adresse, Zuordnung, Kontaktaufnahme, Versand, Sammlung, Zugriff, Ausgabe, Verbindung oder L2-Aktion; G1 bleibt offen.' },
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'AUT-003 V1.0 steuert nun die fünf leeren Akten. Jede künftige Autorisierung bleibt ein einzelner menschlicher Entscheid, gestützt auf die acht Pflichtfelder.',
    nextTitle: 'Nächster gebündelter Entscheid bestätigt',
    next: 'REF-01-DEC-077 nimmt alle 6/6 synthetischen Ergebnisse von M3S-INB-002 V1.0 an und schliesst das fiktive Los. Der Fokus kehrt zu fehlenden G1-Nachweisen zurück; keine reale Verarbeitung und kein L2 sind geöffnet.',
    boundary: 'Die Bestätigung des Rahmens füllt keine Akte und erlaubt keine Identität, Firma, Adresse, Zuordnung, Kontaktaufnahme, Versand, Sammlung, Zugriff, Ausgabe, Verbindung oder L2-Aktion.'
  }
};

const InstitutionalPeopleTeamsFastTrackAuthorisationFiles = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-003" data-testid="ref01-g1-fast-track-authorisation-files" className="scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <FileLock2 className="shrink-0 text-sky-300" size={26} aria-hidden="true" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileLock2 className="text-sky-300" size={19} aria-hidden="true" /> : <ShieldX className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{FILES.map(([id, slot, profile, evidence, purpose]) => <article key={id} data-testid="ref01-g1-fast-track-authorisation-file" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-sky-300">{id}</p><p className="mt-1 text-xs text-slate-400">{t.labels.slot} · {slot}</p><p className="mt-1 text-xs text-slate-400">{t.labels.profile} · {profile}</p><p className="mt-1 text-xs text-slate-400">{t.labels.evidence} · {evidence}</p></div><span className="inline-flex rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.labels.status}</span></div><p className="mt-3 text-xs font-semibold text-slate-400">{t.labels.purpose}</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-200">{purpose[language] || purpose.FR}</p><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400"><span className="rounded-md border border-dashed border-slate-600 px-2 py-2">{t.labels.identity} : —</span><span className="rounded-md border border-dashed border-slate-600 px-2 py-2">{t.labels.channel} : —</span><span className="rounded-md border border-dashed border-slate-600 px-2 py-2">{t.labels.validity} : —</span><span className="rounded-md border border-dashed border-slate-600 px-2 py-2">{t.labels.dms} : —</span></div></article>)}</div>
      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-4"><h5 className="text-sm font-semibold text-slate-100">{t.checksTitle}</h5><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.checks.map(check => <li key={check} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{check}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-4"><div className="flex items-center gap-2"><SendHorizontal className="text-sky-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-sky-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-sky-100">{t.decision}</p></div>
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-4"><div className="flex items-center gap-2"><SendHorizontal className="text-violet-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.nextTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.next}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackAuthorisationFiles;
