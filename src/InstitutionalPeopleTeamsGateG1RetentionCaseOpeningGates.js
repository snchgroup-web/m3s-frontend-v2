import React from 'react';
import { AlertTriangle, CheckSquare2, FileLock2, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PORTES D OUVERTURE D UN CAS · CONFIRMÉ V1.0 · 28-08-2026',
    title: 'Contrôler l admissibilité avant toute inscription réelle',
    intro: 'Cette fiche candidate définit six contrôles préalables. Elle ne crée aucun formulaire actif, cas réel, identité, accès, délai ou opération.',
    counters: [['Portes préparées', '6/6', 'Toutes obligatoires'], ['Verdicts proposés', '4', 'Décision humaine distincte'], ['Cas préremplis', '0', 'Aucune donnée réelle'], ['Exécutions', '0', 'Aucune action automatique']],
    badge: 'CONFIRMÉ · V1.0',
    labels: { expected: 'Contrôle attendu', evidence: 'Trace minimale', stop: 'Arrêt obligatoire' },
    gates: [
      ['1 · Catégorie et déclencheur', 'Rattacher le signal à une catégorie V1.0 et à un événement observable, daté et qualifié.', 'Catégorie, événement, date candidate et origine du signal.', 'Refuser toute ouverture automatique ou catégorie libre non qualifiée.'],
      ['2 · Nécessité et périmètre', 'Documenter la finalité, l entité, le territoire et la stricte nécessité de la revue.', 'Finalité, entité, territoire, fonction requérante et justification.', 'Arrêter si le périmètre est indéterminé ou contient des données sans rapport.'],
      ['3 · Identifiants opaques', 'Créer uniquement un identifiant de cas et une référence d objet non directement identifiante.', 'Identifiant candidat, référence opaque et niveau de sensibilité.', 'Aucun nom, CV, pièce brute ou contenu C3/C4 dans REF-01 ou le bundle public.'],
      ['4 · Responsabilités', 'Désigner les fonctions pilote, contributrices et l autorité candidate avant toute affectation personnelle.', 'Fonctions, séparation des rôles et référence de mandat à obtenir.', 'Aucune affectation nominative sans mandat distinct et contrôlé.'],
      ['5 · Preuves et sécurité', 'Qualifier les preuves attendues, leur dépôt autorisé, les accès et l éventuel gel.', 'Références opaques, classification, dépôt, droits et état du gel.', 'Aucune collecte, copie, extraction ou ouverture d accès par cette fiche.'],
      ['6 · Décision d ouverture', 'Consigner un verdict humain daté avant toute création opérationnelle.', 'Verdict, autorité, date, motifs et prochaine action documentaire.', 'Un accord documentaire ne vaut ni traitement, ni délai appliqué, ni opération GED.']
    ],
    verdictsTitle: 'Quatre verdicts documentaires proposés',
    verdicts: ['Ouvrir sous réserve', 'Refuser', 'Demander des éléments', 'Mettre en attente'],
    status: 'CONFIRMÉ · Six portes et quatre verdicts retenus. Zéro cas réel, donnée sensible ou exécution.',
    next: 'Étape réalisée : la fiche de décision vide REF-01-G1-AUT-02-03-009 est confirmée en V1.0.',
    boundary: 'La confirmation valide uniquement les portes et verdicts. La première ouverture réelle exigera une autorisation séparée, un environnement protégé et un contrôle du cas lui-même.'
  },
  EN: {
    eyebrow: 'CASE-OPENING GATES · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Control admissibility before any real registration',
    intro: 'This candidate file defines six prior controls. It creates no active form, real case, identity, access, period or operation.',
    counters: [['Prepared gates', '6/6', 'All mandatory'], ['Proposed outcomes', '4', 'Separate human decision'], ['Prefilled cases', '0', 'No real data'], ['Executions', '0', 'No automated action']],
    badge: 'CONFIRMED · V1.0',
    labels: { expected: 'Expected control', evidence: 'Minimum trace', stop: 'Mandatory stop' },
    gates: [
      ['1 · Category and trigger', 'Link the signal to a V1.0 category and an observable, dated and qualified event.', 'Category, event, candidate date and signal origin.', 'Reject automatic opening or an unqualified free category.'],
      ['2 · Necessity and scope', 'Document the purpose, entity, territory and strict need for the review.', 'Purpose, entity, territory, requesting function and justification.', 'Stop when scope is undetermined or includes unrelated data.'],
      ['3 · Opaque identifiers', 'Create only a case identifier and a non-directly identifying object reference.', 'Candidate identifier, opaque reference and sensitivity level.', 'No name, CV, raw record or C3/C4 content in REF-01 or the public bundle.'],
      ['4 · Responsibilities', 'Name lead and contributing functions and the candidate authority before any personal assignment.', 'Functions, segregation of duties and mandate reference to obtain.', 'No named assignment without a separate controlled mandate.'],
      ['5 · Evidence and security', 'Qualify expected evidence, authorised repository, access and any hold.', 'Opaque references, classification, repository, rights and hold state.', 'No collection, copying, extraction or access opening through this file.'],
      ['6 · Opening decision', 'Record a dated human outcome before any operational creation.', 'Outcome, authority, date, reasons and next documentary action.', 'Documentary approval is not processing, an applied period or a DMS operation.']
    ],
    verdictsTitle: 'Four proposed documentary outcomes',
    verdicts: ['Open with reservations', 'Reject', 'Request information', 'Place on hold'],
    status: 'CONFIRMED · Six gates and four outcomes retained. Zero real cases, sensitive data or execution.',
    next: 'Completed step: the empty REF-01-G1-AUT-02-03-009 decision sheet is confirmed as V1.0.',
    boundary: 'Confirmation validates only the gates and outcomes. The first real opening will require separate authorisation, a protected environment and review of the case itself.'
  },
  DE: {
    eyebrow: 'TORE ZUR FALLERÖFFNUNG · BESTÄTIGT V1.0 · 28.08.2026',
    title: 'Zulässigkeit vor jedem realen Eintrag kontrollieren',
    intro: 'Diese Kandidatenakte definiert sechs vorgängige Kontrollen. Sie erstellt kein aktives Formular, keinen realen Fall, keine Identität, keinen Zugriff, keine Frist und keine Operation.',
    counters: [['Vorbereitete Tore', '6/6', 'Alle obligatorisch'], ['Vorgeschlagene Ergebnisse', '4', 'Getrennter menschlicher Entscheid'], ['Vorausgefüllte Fälle', '0', 'Keine realen Daten'], ['Ausführungen', '0', 'Keine automatische Aktion']],
    badge: 'BESTÄTIGT · V1.0',
    labels: { expected: 'Erwartete Kontrolle', evidence: 'Mindestspur', stop: 'Pflichtstopp' },
    gates: [
      ['1 · Kategorie und Auslöser', 'Das Signal einer V1.0-Kategorie und einem beobachtbaren, datierten und qualifizierten Ereignis zuordnen.', 'Kategorie, Ereignis, Kandidatendatum und Signalherkunft.', 'Automatische Öffnung oder unqualifizierte freie Kategorie ablehnen.'],
      ['2 · Notwendigkeit und Umfang', 'Zweck, Einheit, Gebiet und strikte Notwendigkeit der Prüfung dokumentieren.', 'Zweck, Einheit, Gebiet, anfragende Funktion und Begründung.', 'Stoppen, wenn der Umfang unbestimmt ist oder sachfremde Daten enthält.'],
      ['3 · Opake Kennungen', 'Nur eine Fallkennung und eine nicht direkt identifizierende Objektreferenz erstellen.', 'Kandidatenkennung, opake Referenz und Sensibilitätsstufe.', 'Kein Name, CV, Rohbeleg oder C3/C4-Inhalt in REF-01 oder im öffentlichen Bundle.'],
      ['4 · Verantwortungen', 'Federführende und mitwirkende Funktionen sowie Kandidatenautorität vor jeder persönlichen Zuweisung bestimmen.', 'Funktionen, Funktionstrennung und zu beschaffende Mandatsreferenz.', 'Keine Namenszuweisung ohne getrenntes kontrolliertes Mandat.'],
      ['5 · Nachweise und Sicherheit', 'Erwartete Nachweise, autorisiertes Depot, Zugriffe und allfällige Sperre qualifizieren.', 'Opake Referenzen, Klassifizierung, Depot, Rechte und Sperrstatus.', 'Keine Sammlung, Kopie, Extraktion oder Zugriffsöffnung durch diese Akte.'],
      ['6 · Eröffnungsentscheid', 'Vor jeder operativen Erstellung ein datiertes menschliches Ergebnis dokumentieren.', 'Ergebnis, Autorität, Datum, Gründe und nächste Dokumentationsaktion.', 'Dokumentarische Zustimmung ist weder Verarbeitung noch angewandte Frist oder DMS-Operation.']
    ],
    verdictsTitle: 'Vier vorgeschlagene Dokumentationsergebnisse',
    verdicts: ['Unter Vorbehalt öffnen', 'Ablehnen', 'Angaben anfordern', 'In Wartestellung setzen'],
    status: 'BESTÄTIGT · Sechs Tore und vier Ergebnisse festgehalten. Null reale Fälle, sensible Daten oder Ausführung.',
    next: 'Erledigter Schritt: Das leere Entscheidblatt REF-01-G1-AUT-02-03-009 ist als V1.0 bestätigt.',
    boundary: 'Die Bestätigung validiert nur Tore und Ergebnisse. Die erste reale Öffnung erfordert eine getrennte Autorisierung, eine geschützte Umgebung und die Kontrolle des Falls selbst.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionCaseOpeningGates = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-case-opening-gates" className="mt-5 rounded-md border border-slate-700 bg-slate-950/25 p-3 sm:p-4">
      <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : index === 2 ? FileLock2 : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-008 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.gates.map(([title, expected, evidence, stop]) => <section key={title} data-testid="ref01-g1-retention-case-opening-gate" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-slate-100">{title}</h6><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-cyan-200">{t.labels.expected}</dt><dd className="mt-0.5 text-slate-300">{expected}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.evidence}</dt><dd className="mt-0.5 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-amber-200">{t.labels.stop}</dt><dd className="mt-0.5 text-slate-300">{stop}</dd></div></dl></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.verdictsTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.verdicts.map(verdict => <span key={verdict} className="rounded-md border border-violet-700/60 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{verdict}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionCaseOpeningGates;
