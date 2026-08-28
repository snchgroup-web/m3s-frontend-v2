import React from 'react';
import { AlertTriangle, Archive, KeyRound, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHES CANDIDATES · VAGUE 1 DOCUMENTAIRE · 28-08-2026',
    title: 'Préparer ensemble les deux dossiers sans mélanger leurs décisions',
    intro: 'Les fiches traduisent AUT-002 V1.0, PRI-002 V1.0 et les matrices PKG-01/PKG-02 V1.0. Elles définissent ce qui peut être documenté ; elles n’accordent encore aucune autorisation d’exécution.',
    counters: [['Fiches préparées', '2/2', 'Candidates V0.1'], ['Champs à confirmer', '10', 'Cinq par dossier'], ['Actions réelles', '0', 'Lecture gouvernée seulement'], ['Décisions attendues', '2', 'Acceptations séparées']],
    badge: 'CANDIDAT · NON AUTORISÉ',
    labels: { basis: 'Fondements gouvernés', scope: 'Préparation documentaire admise', output: 'Livrables candidats', unknowns: 'À confirmer avant autorisation', stop: 'Arrêt obligatoire' },
    files: [
      { id: 'REF-01-G1-AUT-02-03-001', version: 'V0.1', route: 'AUT-02-03 · Conservation et GED', icon: Archive, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-02-001 V1.0', scope: 'Rapprocher catégories C2/C3/C4, finalités, événements déclencheurs, autorités fonctionnelles candidates, exceptions et exigences de preuve GED sans ouvrir de pièce protégée.', outputs: ['Matrice de conservation candidate sans durée inventée', 'Registre des champs inconnus et exceptions', 'Chemin fonctionnel de validation et preuve GED', 'Checklist de contrôle documentaire en lecture seule'], unknowns: 'Durées applicables, déclencheurs précis, autorités nominatives, règles locales et références de pièces autorisées.', stop: 'Arrêt avant accès à une pièce C3/C4, fixation d’une durée, suppression, déplacement, reclassement, gel ou modification GED.' },
      { id: 'REF-01-G1-AUT-02-02-001', version: 'V0.1', route: 'AUT-02-02 · Rôles et moindre privilège', icon: KeyRound, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-01-001 V1.0', scope: 'Rapprocher fonctions, responsabilités, séparation saisie-contrôle-validation-décision et scénarios synthétiques de refus, sans nom réel ni accès applicatif.', outputs: ['Matrice candidate des rôles et visibilités', 'Cas synthétiques attribution-retrait-refus', 'Chemin d’approbation et de revue', 'Registre des exceptions et incompatibilités'], unknowns: 'Titulaires réels, droits effectifs, périmètres de lignes, délégations, fréquence de revue et exceptions autorisées.', stop: 'Arrêt avant identité réelle, compte, connexion, attribution, retrait, export, exposition de donnée ou modification d’un droit réel.' }
    ],
    next: 'Prochain arbitrage humain groupé : confirmer ou amender les deux fiches V0.1. La confirmation documentaire ne vaudra toujours pas autorisation d’exécution.',
    boundary: 'Aucun résultat ne peut être compté comme preuve acceptée. Chaque futur dossier devra recevoir sa propre décision, son responsable autorisé et ses critères avant action.'
  },
  EN: {
    eyebrow: 'CANDIDATE FILES · DOCUMENTARY WAVE 1 · 28 AUG 2026',
    title: 'Prepare both files together without merging their decisions',
    intro: 'The files translate AUT-002 V1.0, PRI-002 V1.0 and the PKG-01/PKG-02 V1.0 matrices. They define what may be documented; they still grant no execution authorisation.',
    counters: [['Prepared files', '2/2', 'V0.1 candidates'], ['Fields to confirm', '10', 'Five per file'], ['Real actions', '0', 'Governed reading only'], ['Expected decisions', '2', 'Separate acceptances']],
    badge: 'CANDIDATE · NOT AUTHORISED',
    labels: { basis: 'Governed foundations', scope: 'Permitted documentary preparation', output: 'Candidate outputs', unknowns: 'To confirm before authorisation', stop: 'Mandatory stop' },
    files: [
      { id: 'REF-01-G1-AUT-02-03-001', version: 'V0.1', route: 'AUT-02-03 · Retention and DMS', icon: Archive, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-02-001 V1.0', scope: 'Reconcile C2/C3/C4 categories, purposes, triggering events, candidate functional authorities, exceptions and DMS evidence requirements without opening protected records.', outputs: ['Candidate retention matrix with no invented period', 'Unknown-field and exception register', 'Functional validation and DMS-evidence path', 'Read-only documentary-control checklist'], unknowns: 'Applicable periods, precise triggers, named authorities, local rules and authorised record references.', stop: 'Stop before C3/C4 record access, setting a period, deletion, move, reclassification, hold or DMS change.' },
      { id: 'REF-01-G1-AUT-02-02-001', version: 'V0.1', route: 'AUT-02-02 · Roles and least privilege', icon: KeyRound, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-01-001 V1.0', scope: 'Reconcile functions, responsibilities, entry-control-validation-decision separation and synthetic refusal scenarios without a real name or application access.', outputs: ['Candidate role and visibility matrix', 'Synthetic assignment-withdrawal-refusal cases', 'Approval and review path', 'Exception and incompatibility register'], unknowns: 'Real holders, effective rights, row scopes, delegations, review frequency and authorised exceptions.', stop: 'Stop before real identity, account, login, assignment, withdrawal, export, data exposure or changing a real right.' }
    ],
    next: 'Next grouped human decision: confirm or amend both V0.1 files. Documentary confirmation will still not constitute execution authorisation.',
    boundary: 'No output may be counted as accepted evidence. Each future file needs its own decision, authorised owner and criteria before action.'
  },
  DE: {
    eyebrow: 'KANDIDATENAKTEN · DOKUMENTARISCHE WELLE 1 · 28.08.2026',
    title: 'Beide Akten gemeinsam vorbereiten, ohne ihre Entscheide zu vermischen',
    intro: 'Die Akten übersetzen AUT-002 V1.0, PRI-002 V1.0 und die Matrizen PKG-01/PKG-02 V1.0. Sie definieren mögliche Dokumentation, erteilen aber noch keine Ausführungsautorisierung.',
    counters: [['Vorbereitete Akten', '2/2', 'Kandidaten V0.1'], ['Zu bestätigende Felder', '10', 'Fünf je Akte'], ['Reale Aktionen', '0', 'Nur gesteuerte Lektüre'], ['Erwartete Entscheide', '2', 'Getrennte Annahmen']],
    badge: 'KANDIDAT · NICHT AUTORISIERT',
    labels: { basis: 'Gesteuerte Grundlagen', scope: 'Erlaubte Dokumentvorbereitung', output: 'Kandidatenergebnisse', unknowns: 'Vor Autorisierung zu bestätigen', stop: 'Obligatorischer Stopp' },
    files: [
      { id: 'REF-01-G1-AUT-02-03-001', version: 'V0.1', route: 'AUT-02-03 · Aufbewahrung und DMS', icon: Archive, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-02-001 V1.0', scope: 'C2/C3/C4-Kategorien, Zwecke, Auslöser, funktionale Kandidatenautoritäten, Ausnahmen und DMS-Nachweisanforderungen abgleichen, ohne geschützte Unterlagen zu öffnen.', outputs: ['Kandidaten-Aufbewahrungsmatrix ohne erfundene Frist', 'Register unbekannter Felder und Ausnahmen', 'Funktionaler Validierungs- und DMS-Nachweisweg', 'Checkliste für schreibgeschützte Dokumentkontrolle'], unknowns: 'Anwendbare Fristen, genaue Auslöser, benannte Autoritäten, lokale Regeln und erlaubte Unterlagenreferenzen.', stop: 'Stopp vor C3/C4-Unterlagenzugriff, Fristsetzung, Löschung, Verschiebung, Umklassifizierung, Sperre oder DMS-Änderung.' },
      { id: 'REF-01-G1-AUT-02-02-001', version: 'V0.1', route: 'AUT-02-02 · Rollen und geringste Berechtigung', icon: KeyRound, basis: 'AUT-002 V1.0 · PRI-002 V1.0 · PKG-01-001 V1.0', scope: 'Funktionen, Verantwortungen, Trennung von Erfassung-Kontrolle-Validierung-Entscheid und synthetische Ablehnungsszenarien ohne Realname oder Anwendungszugriff abgleichen.', outputs: ['Kandidatenmatrix für Rollen und Sichtbarkeit', 'Synthetische Fälle Zuweisung-Entzug-Ablehnung', 'Genehmigungs- und Prüfweg', 'Ausnahme- und Unvereinbarkeitsregister'], unknowns: 'Reale Inhaber, wirksame Rechte, Zeilenumfänge, Delegationen, Prüffrequenz und autorisierte Ausnahmen.', stop: 'Stopp vor Realidentität, Konto, Login, Zuweisung, Entzug, Export, Datenoffenlegung oder Änderung eines Realrechts.' }
    ],
    next: 'Nächster gebündelter menschlicher Entscheid: beide V0.1-Akten bestätigen oder ändern. Die Dokumentbestätigung bleibt keine Ausführungsautorisierung.',
    boundary: 'Kein Ergebnis darf als angenommener Nachweis zählen. Jede künftige Akte braucht vor einer Aktion ihren eigenen Entscheid, autorisierten Verantwortlichen und Kriterien.'
  }
};

const InstitutionalPeopleTeamsGateG1DocumentaryAuthorisationFiles = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-documentary-authorisation-files" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-documentary-authorisation-files-title">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-documentary-authorisation-files-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className={`shrink-0 ${index === 0 ? 'text-violet-300' : 'text-rose-300'}`} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.files.map(file => { const Icon = file.icon; return <article key={file.id} data-testid="ref01-g1-documentary-authorisation-file" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">{file.id} · {file.version}</h6><p className="mt-1 text-xs font-semibold text-violet-200">{file.route}</p></div></div><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.badge}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-200">{t.labels.basis}</dt><dd className="mt-1 text-slate-300">{file.basis}</dd></div><div><dt className="font-semibold text-violet-200">{t.labels.scope}</dt><dd className="mt-1 text-slate-300">{file.scope}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.output}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{file.outputs.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-amber-200">{t.labels.unknowns}</dt><dd className="mt-1 text-slate-300">{file.unknowns}</dd></div><div><dt className="font-semibold text-rose-200">{t.labels.stop}</dt><dd className="mt-1 text-slate-300">{file.stop}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1DocumentaryAuthorisationFiles;
