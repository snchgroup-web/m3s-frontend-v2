import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU REGISTRE D’AUTORISATION · REF-01-DEC-037 · V1.0 · 28-08-2026',
    title: 'Confirmer le registre sans ouvrir les autorisations',
    intro: 'Cheikh confirme REF-01-G1-AUT-002 V0.1. Le registre devient V1.0 comme cadre gouverné des six décisions unitaires ; aucune autorisation, collecte ou exécution n’est accordée.',
    counters: [['Registre confirmé', '1/1', 'AUT-002 V1.0'], ['Dossiers gouvernés', '6/6', 'Un dossier par circuit'], ['Autorisations accordées', '0', 'Tous les dossiers restent fermés'], ['Preuves acceptées', '0', 'G1 reste ouverte']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-037', version: 'V1.0', status: 'Registre AUT-002 confirmé sans autorisation', author: 'Cheikh Ndiaye', date: '28-08-2026',
      decision: 'REF-01-G1-AUT-002 V0.1 est confirmé et promu en V1.0. Ses six dossiers et leurs contrôles communs deviennent le cadre gouverné des futures décisions unitaires d’autorisation.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 28-08-2026 : « confirmé, merci » en réponse à l’arbitrage REF-01-G1-AUT-002 V0.1.',
      limit: 'Cette décision ne choisit aucun dossier, titulaire, fournisseur, compte, accès, canal ou environnement. Elle n’autorise aucune collecte, donnée réelle, sauvegarde, restauration, attribution de droit, modification GED, migration, worker, alerte, notification, test, acceptation de preuve, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · REF-01-G1-AUT-002 V1.0 gouverne six dossiers ; zéro autorisation est accordée.',
    next: 'Étape préparée ci-dessous : REF-01-G1-PRI-002 V0.1 propose l’ordre de préparation des six dossiers sans en ouvrir aucun.',
    boundary: 'Confirmer le registre valide sa structure et ses garde-fous. Toute ouverture future demeure soumise à une décision humaine distincte, bornée et réversible.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE AUTHORISATION REGISTER · REF-01-DEC-037 · V1.0 · 28 AUG 2026',
    title: 'Confirm the register without opening authorisations',
    intro: 'Cheikh confirms REF-01-G1-AUT-002 V0.1. The register becomes V1.0 as the governed framework for six individual decisions; no authorisation, collection or execution is granted.',
    counters: [['Confirmed register', '1/1', 'AUT-002 V1.0'], ['Governed files', '6/6', 'One file per route'], ['Granted authorisations', '0', 'All files remain closed'], ['Accepted evidence', '0', 'G1 remains open']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-037', version: 'V1.0', status: 'AUT-002 register confirmed without authorisation', author: 'Cheikh Ndiaye', date: '28 Aug 2026',
      decision: 'REF-01-G1-AUT-002 V0.1 is confirmed and promoted to V1.0. Its six files and shared controls become the governed framework for future individual authorisation decisions.',
      evidence: 'Explicit confirmation by Cheikh during the 28 Aug 2026 session: “confirmé, merci” in response to the REF-01-G1-AUT-002 V0.1 decision point.',
      limit: 'This decision selects no file, holder, provider, account, access, channel or environment. It authorises no collection, real data, backup, restoration, right assignment, DMS change, migration, worker, alert, notification, test, evidence acceptance, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · REF-01-G1-AUT-002 V1.0 governs six files; zero authorisations are granted.',
    next: 'Prepared step below: REF-01-G1-PRI-002 V0.1 proposes the preparation order for all six files without opening any.',
    boundary: 'Confirming the register validates its structure and safeguards. Every future opening still requires a separate, bounded and reversible human decision.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES AUTORISIERUNGSREGISTERS · REF-01-DEC-037 · V1.0 · 28.08.2026',
    title: 'Das Register bestätigen, ohne Autorisierungen zu öffnen',
    intro: 'Cheikh bestätigt REF-01-G1-AUT-002 V0.1. Das Register wird als gesteuerter Rahmen für sechs Einzelentscheide zu V1.0; keine Autorisierung, Sammlung oder Ausführung wird erteilt.',
    counters: [['Bestätigtes Register', '1/1', 'AUT-002 V1.0'], ['Gesteuerte Akten', '6/6', 'Eine Akte je Weg'], ['Erteilte Autorisierungen', '0', 'Alle Akten bleiben geschlossen'], ['Angenommene Nachweise', '0', 'G1 bleibt offen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-037', version: 'V1.0', status: 'AUT-002-Register ohne Autorisierung bestätigt', author: 'Cheikh Ndiaye', date: '28.08.2026',
      decision: 'REF-01-G1-AUT-002 V0.1 ist bestätigt und wird zu V1.0. Seine sechs Akten und gemeinsamen Kontrollen bilden den gesteuerten Rahmen für künftige einzelne Autorisierungsentscheide.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 28.08.2026: « confirmé, merci » als Antwort auf den Entscheidpunkt REF-01-G1-AUT-002 V0.1.',
      limit: 'Der Entscheid wählt keine Akte, keinen Träger, Anbieter, Account, Zugriff, Kanal oder keine Umgebung. Er erlaubt keine Sammlung, Echtdaten, Sicherung, Wiederherstellung, Rechtezuweisung, DMS-Änderung, Migration, Worker, Warnung, Benachrichtigung, Prüfung, Nachweisannahme, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · REF-01-G1-AUT-002 V1.0 steuert sechs Akten; null Autorisierungen sind erteilt.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PRI-002 V0.1 schlägt die Vorbereitungsreihenfolge der sechs Akten vor, ohne eine zu öffnen.',
    boundary: 'Die Registerbestätigung validiert Struktur und Schutzmassnahmen. Jede künftige Öffnung braucht weiterhin einen getrennten, begrenzten und reversiblen menschlichen Entscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1ExecutionAuthorisationRegisterConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-execution-authorisation-register-confirmation" className="m3s-ref01-g1-execution-authorisation-register-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-execution-authorisation-register-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-execution-authorisation-register-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1ExecutionAuthorisationRegisterConfirmation;
