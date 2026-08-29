import React from 'react';
import { AlertTriangle, CheckSquare2, FileLock2, Gavel } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PREMIERE EXECUTION · FICHE CANDIDATE V0.1 · 29-08-2026',
    title: 'Préparer un GO ou NO-GO sans exécuter le droit',
    intro: 'Cette fiche vide prépare la décision humaine séparée exigée après le protocole 009 V1.0. Elle ne crée ni autorisation active, ni titulaire, ni compte, ni droit et ne permet aucune action technique.',
    counters: [['Préconditions à tracer', '6/6', 'Une conclusion par précondition'], ['Décision attendue', '1/1', 'GO ou NO-GO séparé'], ['Décisions actives', '0', 'Aucune exécution autorisée'], ['Droits exécutés', '0', 'Aucune action technique']],
    badge: 'CANDIDAT · V0.1',
    groups: [
      ['1 · Références et périmètre', ['Identifiant candidat de décision', 'Référence opaque de l habilitation', 'Rôle et droits minimaux exacts', 'Environnement, durée et expiration']],
      ['2 · Résultat des préconditions', ['État des six préconditions', 'Références de preuve opaques', 'Écart ou réserve', 'Conclusion du contrôle']],
      ['3 · Autorité et séparation', ['Propriétaire métier', 'Autorité nominative à vérifier', 'Fonction IT exécutante distincte', 'Contrôleur après exécution']],
      ['4 · Décision et conditions', ['GO borné ou NO-GO', 'Conditions et limites', 'Arrêt, retrait et retour arrière', 'Date, trace et prochaine revue']]
    ],
    rulesTitle: 'Cinq règles de décision proposées',
    rules: ['Six préconditions conclues', 'Un seul verdict', 'Mandat vérifié hors bundle', 'Aucun secret ni donnée C3-C5 dans REF-01', 'GO limité aux droits et à la durée décidés'],
    status: 'CANDIDAT · Fiche documentaire V0.1. Zéro décision active, titulaire réel, compte, droit, accès C3/C4/C5 ou action technique.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-02-010 V0.1.',
    boundary: 'Même renseignée, cette fiche ne vaudra pas exécution. Une décision réelle devra être nominative, datée, conservée dans l espace autorisé et transmise séparément à IT après contrôle des six préconditions.'
  },
  EN: {
    eyebrow: 'FIRST EXECUTION · V0.1 CANDIDATE SHEET · 29 AUG 2026',
    title: 'Prepare a GO or NO-GO without executing the right',
    intro: 'This empty sheet prepares the separate human decision required after protocol 009 V1.0. It creates no active authorisation, holder, account or right and enables no technical action.',
    counters: [['Prerequisites to trace', '6/6', 'One conclusion per prerequisite'], ['Expected decision', '1/1', 'Separate GO or NO-GO'], ['Active decisions', '0', 'No authorised execution'], ['Executed rights', '0', 'No technical action']],
    badge: 'CANDIDATE · V0.1',
    groups: [
      ['1 · References and scope', ['Candidate decision identifier', 'Opaque access-record reference', 'Exact minimum role and rights', 'Environment, duration and expiry']],
      ['2 · Prerequisite results', ['State of all six prerequisites', 'Opaque evidence references', 'Gap or reservation', 'Review conclusion']],
      ['3 · Authority and segregation', ['Business owner', 'Named authority to verify', 'Separate executing IT function', 'Post-execution reviewer']],
      ['4 · Decision and conditions', ['Bounded GO or NO-GO', 'Conditions and limits', 'Stop, withdrawal and rollback', 'Date, trace and next review']]
    ],
    rulesTitle: 'Five proposed decision rules',
    rules: ['Six prerequisites concluded', 'One outcome only', 'Mandate checked outside the bundle', 'No secret or C3-C5 data in REF-01', 'GO limited to the decided rights and duration'],
    status: 'CANDIDATE · V0.1 documentary sheet. Zero active decisions, real holders, accounts, rights, C3/C4/C5 access or technical actions.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-02-010 V0.1.',
    boundary: 'Even when completed, this sheet will not constitute execution. A real decision must be named, dated, retained in the authorised space and transmitted separately to IT after all six prerequisites are reviewed.'
  },
  DE: {
    eyebrow: 'ERSTE AUSFUEHRUNG · KANDIDATENBLATT V0.1 · 29.08.2026',
    title: 'GO oder NO-GO vorbereiten, ohne das Recht auszuführen',
    intro: 'Dieses leere Blatt bereitet den getrennten menschlichen Entscheid nach Protokoll 009 V1.0 vor. Es erstellt weder aktive Autorisierung, Inhaber, Konto noch Recht und ermöglicht keine technische Aktion.',
    counters: [['Zu belegende Voraussetzungen', '6/6', 'Eine Folgerung je Voraussetzung'], ['Erwarteter Entscheid', '1/1', 'Getrenntes GO oder NO-GO'], ['Aktive Entscheide', '0', 'Keine autorisierte Ausführung'], ['Ausgeführte Rechte', '0', 'Keine technische Aktion']],
    badge: 'KANDIDAT · V0.1',
    groups: [
      ['1 · Referenzen und Umfang', ['Kandidatenkennung des Entscheids', 'Opake Referenz der Berechtigung', 'Exakte minimale Rolle und Rechte', 'Umgebung, Dauer und Ablauf']],
      ['2 · Ergebnis der Voraussetzungen', ['Stand aller sechs Voraussetzungen', 'Opake Nachweisreferenzen', 'Abweichung oder Vorbehalt', 'Prüffolgerung']],
      ['3 · Autorität und Trennung', ['Fachverantwortung', 'Zu prüfende Namensautorität', 'Getrennte ausführende IT-Funktion', 'Kontrolle nach Ausführung']],
      ['4 · Entscheid und Bedingungen', ['Begrenztes GO oder NO-GO', 'Bedingungen und Grenzen', 'Stopp, Entzug und Rückkehr', 'Datum, Spur und nächste Prüfung']]
    ],
    rulesTitle: 'Fünf vorgeschlagene Entscheidregeln',
    rules: ['Sechs Voraussetzungen abgeschlossen', 'Nur ein Ergebnis', 'Mandat ausserhalb des Bundles geprüft', 'Keine Geheimnisse oder C3-C5-Daten in REF-01', 'GO auf entschiedene Rechte und Dauer begrenzt'],
    status: 'KANDIDAT · Dokumentationsblatt V0.1. Null aktive Entscheide, reale Inhaber, Konten, Rechte, C3/C4/C5-Zugriffe oder technische Aktionen.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-02-010 V0.1 bestätigen oder ändern.',
    boundary: 'Auch ausgefüllt ist dieses Blatt keine Ausführung. Ein realer Entscheid muss namentlich, datiert, im autorisierten Raum aufbewahrt und nach Prüfung aller sechs Voraussetzungen getrennt an IT übermittelt werden.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeFirstExecutionDecisionSheet = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-first-execution-decision-sheet" className="mt-5 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><Gavel className="mt-0.5 shrink-0 text-violet-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-violet-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-violet-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-010 · V0.1</h6><span className="rounded-md border border-violet-700/70 bg-violet-950/25 px-2 py-1 text-[10px] font-semibold text-violet-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-first-execution-decision-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-violet-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeFirstExecutionDecisionSheet;
