import React from 'react';
import { AlertTriangle, FileInput, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'OUVERTURE DOCUMENTAIRE BORNÉE · REF-01-G1-WAV-002 · V1.0 · 28-08-2026',
    title: 'Ouvrir deux préparations, sans ouvrir les droits ni les pièces réelles',
    intro: 'DEC-039 ouvre la vague 1 uniquement pour rédiger et rapprocher les deux fiches d’autorisation candidates. Cette ouverture n’est pas une autorisation d’exécution.',
    counters: [['Préparations ouvertes', '2/2', 'AUT-02-03 et AUT-02-02'], ['Autorisations d’exécution', '0', 'Décisions séparées requises'], ['Opérations réelles', '0', 'GED et accès inchangés'], ['Preuves acceptées', '0', 'G1 reste ouverte']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-039', version: 'V1.0', status: 'Vague 1 ouverte pour préparation documentaire seulement', author: 'Cheikh Ndiaye', date: '28-08-2026',
      decision: 'REF-01-G1-WAV-002 V1.0 ouvre la préparation parallèle de deux fiches candidates : AUT-02-03 Conservation et GED, puis AUT-02-02 Rôles et moindre privilège. Les supports gouvernés existants peuvent être rapprochés en lecture documentaire et les inconnues doivent rester explicites.',
      evidence: 'Demande explicite de Cheikh dans la session du 28-08-2026 : « tu peux ouvrir aussi ou bien ? », acceptée dans le périmètre documentaire strict annoncé par Codex.',
      limit: 'L’ouverture ne permet aucun accès réel, identité réelle, attribution ou retrait de droit, création de compte, durée inventée, consultation d’une pièce protégée, modification GED, collecte, environnement, test, fournisseur, contact, preuve acceptée, fermeture de G1 ou ouverture de L2.'
    },
    status: 'OUVERTE · Deux fiches candidates peuvent être préparées en parallèle ; aucune exécution n’est autorisée.',
    next: 'Prochain arbitrage groupé : confirmer ou amender les deux fiches candidates présentées ci-dessous avant toute autorisation unitaire.',
    boundary: 'La lecture reste limitée aux cadres déjà gouvernés et aux constats non sensibles. Toute donnée ou action réelle arrête la préparation.'
  },
  EN: {
    eyebrow: 'BOUNDED DOCUMENTARY OPENING · REF-01-G1-WAV-002 · V1.0 · 28 AUG 2026',
    title: 'Open two preparations without opening real rights or records',
    intro: 'DEC-039 opens Wave 1 only to draft and reconcile the two candidate authorisation files. This opening is not an execution authorisation.',
    counters: [['Open preparations', '2/2', 'AUT-02-03 and AUT-02-02'], ['Execution authorisations', '0', 'Separate decisions required'], ['Real operations', '0', 'DMS and access unchanged'], ['Accepted evidence', '0', 'G1 remains open']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-039', version: 'V1.0', status: 'Wave 1 opened for documentary preparation only', author: 'Cheikh Ndiaye', date: '28 Aug 2026',
      decision: 'REF-01-G1-WAV-002 V1.0 opens parallel preparation of two candidate files: AUT-02-03 Retention and DMS, followed by AUT-02-02 Roles and least privilege. Existing governed supports may be reconciled through documentary reading and unknowns must remain explicit.',
      evidence: 'Explicit request by Cheikh during the 28 Aug 2026 session: “tu peux ouvrir aussi ou bien ?”, accepted within the strict documentary scope stated by Codex.',
      limit: 'The opening permits no real access, real identity, right assignment or withdrawal, account creation, invented period, protected-record consultation, DMS change, collection, environment, test, provider, contact, accepted evidence, G1 closure or L2 opening.'
    },
    status: 'OPEN · Two candidate files may be prepared in parallel; no execution is authorised.',
    next: 'Next grouped decision: confirm or amend both candidate files presented below before any individual authorisation.',
    boundary: 'Reading remains limited to governed frameworks and non-sensitive findings. Any real data or action stops preparation.'
  },
  DE: {
    eyebrow: 'BEGRENZTE DOKUMENTARISCHE ÖFFNUNG · REF-01-G1-WAV-002 · V1.0 · 28.08.2026',
    title: 'Zwei Vorbereitungen öffnen, ohne reale Rechte oder Unterlagen zu öffnen',
    intro: 'DEC-039 öffnet Welle 1 nur zur Erstellung und Abstimmung der zwei Kandidatenakten. Diese Öffnung ist keine Ausführungsautorisierung.',
    counters: [['Offene Vorbereitungen', '2/2', 'AUT-02-03 und AUT-02-02'], ['Ausführungsautorisierungen', '0', 'Getrennte Entscheide nötig'], ['Reale Operationen', '0', 'DMS und Zugriffe unverändert'], ['Angenommene Nachweise', '0', 'G1 bleibt offen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-039', version: 'V1.0', status: 'Welle 1 nur für Dokumentvorbereitung geöffnet', author: 'Cheikh Ndiaye', date: '28.08.2026',
      decision: 'REF-01-G1-WAV-002 V1.0 öffnet die parallele Vorbereitung von zwei Kandidatenakten: AUT-02-03 Aufbewahrung und DMS, danach AUT-02-02 Rollen und geringste Berechtigung. Bestehende gesteuerte Grundlagen dürfen dokumentarisch abgeglichen werden; Unbekanntes bleibt ausdrücklich offen.',
      evidence: 'Ausdrückliche Frage von Cheikh in der Sitzung vom 28.08.2026: « tu peux ouvrir aussi ou bien ? », angenommen im von Codex angekündigten strikten Dokumentumfang.',
      limit: 'Die Öffnung erlaubt keinen Realzugriff, keine reale Identität, Rechtezuweisung oder -entnahme, Kontoerstellung, erfundene Frist, Einsicht in geschützte Unterlagen, DMS-Änderung, Sammlung, Umgebung, Prüfung, Anbieter, Kontakt, Nachweisannahme, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'GEÖFFNET · Zwei Kandidatenakten dürfen parallel vorbereitet werden; keine Ausführung ist erlaubt.',
    next: 'Nächster gebündelter Entscheid: beide nachfolgend dargestellten Kandidatenakten vor jeder Einzelautorisierung bestätigen oder ändern.',
    boundary: 'Die Lektüre bleibt auf gesteuerte Rahmen und nicht sensible Feststellungen begrenzt. Echtdaten oder Realaktionen stoppen die Vorbereitung.'
  }
};

const InstitutionalPeopleTeamsGateG1DocumentaryWaveOpening = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-documentary-wave-opening" className="mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-documentary-wave-opening-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-documentary-wave-opening-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileInput className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index === 0 ? <FileInput className="shrink-0 text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1DocumentaryWaveOpening;
