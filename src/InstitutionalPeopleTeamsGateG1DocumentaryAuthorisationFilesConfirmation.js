import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE GROUPÉE · REF-01-DEC-040 · V1.0 · 28-08-2026',
    title: 'Confirmer deux cadres distincts sans ouvrir leur exécution',
    intro: 'Cheikh confirme ensemble les deux fiches corrigées à onze champs ouverts. Chaque portée conserve sa propre clause, ses inconnues et sa condition d’arrêt.',
    counters: [['Fiches confirmées', '2/2', 'AUT-02-03 et AUT-02-02 V1.0'], ['Champs ouverts', '11', 'Aucune valeur inventée'], ['Autorisations d’exécution', '0', 'Décisions ultérieures requises'], ['Opérations réelles', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-040', version: 'V1.0', status: 'Deux cadres documentaires confirmés sans exécution', author: 'Cheikh Ndiaye', date: '28-08-2026',
      decision: 'Clause 1 : REF-01-G1-AUT-02-03-001 V0.1 est confirmée et promue en V1.0 pour cadrer Conservation et GED. Clause 2 : REF-01-G1-AUT-02-02-001 V0.1 est confirmée et promue en V1.0 pour cadrer Rôles et moindre privilège. Les onze champs restent ouverts et les deux portées ne sont pas fusionnées.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026, en réponse à l’arbitrage groupé corrigé : « je confirme ».',
      limit: 'La décision ne fixe aucune durée, autorité nominative, référence de pièce, titulaire, droit, périmètre de ligne, délégation, fréquence ou exception. Elle ne permet aucun accès, compte, connexion, opération GED, export, exposition de donnée, collecte, test, preuve acceptée, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · Deux cadres V1.0, deux clauses séparées, onze inconnues conservées et zéro exécution.',
    next: 'Étape suivante : préparer ensemble les deux matrices candidates correspondant aux onze champs, sans leur attribuer de valeur réelle ni appliquer un droit ou une règle GED.',
    boundary: 'La confirmation autorise uniquement la préparation documentaire déjà ouverte par WAV-002 V1.0. Toute action réelle exige une décision unitaire ultérieure.'
  },
  EN: {
    eyebrow: 'GROUPED HUMAN CONFIRMATION · REF-01-DEC-040 · V1.0 · 28 AUG 2026',
    title: 'Confirm two separate frameworks without opening execution',
    intro: 'Cheikh confirms both corrected files together with eleven open fields. Each scope keeps its own clause, unknowns and stop condition.',
    counters: [['Confirmed files', '2/2', 'AUT-02-03 and AUT-02-02 V1.0'], ['Open fields', '11', 'No invented value'], ['Execution authorisations', '0', 'Later decisions required'], ['Real operations', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-040', version: 'V1.0', status: 'Two documentary frameworks confirmed without execution', author: 'Cheikh Ndiaye', date: '28 Aug 2026',
      decision: 'Clause 1: REF-01-G1-AUT-02-03-001 V0.1 is confirmed and promoted to V1.0 for Retention and DMS framing. Clause 2: REF-01-G1-AUT-02-02-001 V0.1 is confirmed and promoted to V1.0 for Roles and least privilege framing. All eleven fields remain open and the two scopes are not merged.',
      evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session in response to the corrected grouped decision: “je confirme”.',
      limit: 'The decision sets no period, named authority, record reference, holder, right, row scope, delegation, review frequency or exception. It permits no access, account, login, DMS operation, export, data exposure, collection, test, accepted evidence, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · Two V1.0 frameworks, two separate clauses, eleven retained unknowns and zero execution.',
    next: 'Next step: prepare both candidate matrices for the eleven fields together, without assigning a real value or applying any right or DMS rule.',
    boundary: 'Confirmation authorises only the documentary preparation already opened by WAV-002 V1.0. Any real action requires a later unitary decision.'
  },
  DE: {
    eyebrow: 'GEBÜNDELTE MENSCHLICHE BESTÄTIGUNG · REF-01-DEC-040 · V1.0 · 28.08.2026',
    title: 'Zwei getrennte Rahmen bestätigen, ohne ihre Ausführung zu öffnen',
    intro: 'Cheikh bestätigt beide korrigierten Akten mit elf offenen Feldern gemeinsam. Jeder Umfang behält seine eigene Klausel, Unbekannten und Stoppbedingung.',
    counters: [['Bestätigte Akten', '2/2', 'AUT-02-03 und AUT-02-02 V1.0'], ['Offene Felder', '11', 'Kein erfundener Wert'], ['Ausführungsautorisierungen', '0', 'Spätere Entscheide nötig'], ['Reale Operationen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-040', version: 'V1.0', status: 'Zwei Dokumentrahmen ohne Ausführung bestätigt', author: 'Cheikh Ndiaye', date: '28.08.2026',
      decision: 'Klausel 1: REF-01-G1-AUT-02-03-001 V0.1 wird bestätigt und für Aufbewahrung und DMS zu V1.0. Klausel 2: REF-01-G1-AUT-02-02-001 V0.1 wird bestätigt und für Rollen und geringste Berechtigung zu V1.0. Alle elf Felder bleiben offen; die Umfänge werden nicht zusammengeführt.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 28.08.2026 als Antwort auf den korrigierten gebündelten Entscheid: « je confirme ».',
      limit: 'Der Entscheid setzt keine Frist, benannte Autorität, Unterlagenreferenz, Inhaberschaft, Rechte, Zeilenumfänge, Delegation, Prüffrequenz oder Ausnahme. Er erlaubt keinen Zugriff, kein Konto, Login, DMS-Handlung, Export, Datenoffenlegung, Sammlung, Test, angenommenen Nachweis, keine G1-Schliessung und keine L2-Öffnung.'
    },
    status: 'BESTÄTIGT · Zwei V1.0-Rahmen, zwei getrennte Klauseln, elf offene Angaben und null Ausführung.',
    next: 'Nächster Schritt: beide Kandidatenmatrizen zu den elf Feldern gemeinsam vorbereiten, ohne Realwerte zuzuweisen oder Rechte beziehungsweise DMS-Regeln anzuwenden.',
    boundary: 'Die Bestätigung erlaubt nur die bereits durch WAV-002 V1.0 geöffnete Dokumentvorbereitung. Jede Realaktion braucht einen späteren Einzelentscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1DocumentaryAuthorisationFilesConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-documentary-authorisation-files-confirmation" className="m3s-ref01-g1-aut-cd-files-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-documentary-authorisation-files-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-documentary-authorisation-files-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1DocumentaryAuthorisationFilesConfirmation;
