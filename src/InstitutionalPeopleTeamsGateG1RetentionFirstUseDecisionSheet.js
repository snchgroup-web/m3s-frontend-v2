import React from 'react';
import { AlertTriangle, CheckSquare2, FileLock2, Gavel } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PREMIERE UTILISATION · FICHE CANDIDATE V0.1 · 28-08-2026',
    title: 'Préparer un GO ou NO-GO sans ouvrir le cas',
    intro: 'Cette fiche vide prépare la décision humaine séparée exigée après le protocole V1.0. Elle ne crée ni cas pilote, ni identité, ni accès, ni espace protégé et ne permet aucun traitement réel.',
    counters: [['Préconditions à tracer', '6/6', 'Une conclusion par précondition'], ['Décision attendue', '1/1', 'GO ou NO-GO séparé'], ['Décisions actives', '0', 'Aucun cas autorisé'], ['Données personnelles', '0', 'Aucune donnée C3/C4']],
    badge: 'CANDIDAT · À CONFIRMER',
    groups: [
      ['1 · Références et périmètre', ['Identifiant candidat de décision', 'Référence opaque du cas', 'Catégorie et finalité bornée', 'Volume et durée proposés']],
      ['2 · Résultat des préconditions', ['État des six préconditions', 'Références de preuve opaques', 'Écart ou réserve', 'Conclusion de contrôle']],
      ['3 · Autorité et séparation', ['Fonction requérante', 'Fonction de contrôle', 'Autorité nominative à vérifier', 'Opérateur distinct à vérifier']],
      ['4 · Décision et conditions', ['GO borné ou NO-GO', 'Conditions et limites', 'Arrêt et retour arrière', 'Date, trace et prochaine revue']]
    ],
    rulesTitle: 'Cinq règles de décision proposées',
    rules: ['Six préconditions conclues', 'Un seul verdict', 'Mandat vérifié hors bundle', 'Aucune donnée C3/C4 dans REF-01', 'GO limité au périmètre décidé'],
    status: 'CANDIDAT · Fiche vide préparée. Zéro décision active, cas réel, identité, accès, espace protégé ou opération GED.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-03-011 V0.1.',
    boundary: 'Même confirmée, cette fiche ne vaudra pas GO. Une décision réelle devra être renseignée, nominative, datée et conservée dans l espace autorisé après contrôle des six préconditions.'
  },
  EN: {
    eyebrow: 'FIRST USE · V0.1 CANDIDATE SHEET · 28 AUG 2026',
    title: 'Prepare a GO or NO-GO without opening the case',
    intro: 'This empty sheet prepares the separate human decision required after the V1.0 protocol. It creates no pilot case, identity, access or protected workspace and enables no real processing.',
    counters: [['Prerequisites to trace', '6/6', 'One conclusion per prerequisite'], ['Expected decision', '1/1', 'Separate GO or NO-GO'], ['Active decisions', '0', 'No authorised case'], ['Personal data', '0', 'No C3/C4 data']],
    badge: 'CANDIDATE · TO CONFIRM',
    groups: [
      ['1 · References and scope', ['Candidate decision identifier', 'Opaque case reference', 'Bounded category and purpose', 'Proposed volume and duration']],
      ['2 · Prerequisite results', ['State of all six prerequisites', 'Opaque evidence references', 'Gap or reservation', 'Review conclusion']],
      ['3 · Authority and segregation', ['Requesting function', 'Review function', 'Named authority to verify', 'Separate operator to verify']],
      ['4 · Decision and conditions', ['Bounded GO or NO-GO', 'Conditions and limits', 'Stop and rollback', 'Date, trace and next review']]
    ],
    rulesTitle: 'Five proposed decision rules',
    rules: ['Six prerequisites concluded', 'One outcome only', 'Mandate checked outside the bundle', 'No C3/C4 data in REF-01', 'GO limited to the decided scope'],
    status: 'CANDIDATE · Empty sheet prepared. Zero active decisions, real cases, identities, access, protected workspaces or DMS operations.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-03-011 V0.1.',
    boundary: 'Even if confirmed, this sheet will not constitute a GO. A real decision must be completed, named, dated and retained in the authorised space after all six prerequisites are reviewed.'
  },
  DE: {
    eyebrow: 'ERSTNUTZUNG · KANDIDATENBLATT V0.1 · 28.08.2026',
    title: 'GO oder NO-GO vorbereiten, ohne den Fall zu öffnen',
    intro: 'Dieses leere Blatt bereitet den getrennten menschlichen Entscheid nach dem V1.0-Protokoll vor. Es erstellt weder Pilotfall, Identität, Zugriff noch geschützten Raum und ermöglicht keine reale Verarbeitung.',
    counters: [['Zu belegende Voraussetzungen', '6/6', 'Eine Folgerung je Voraussetzung'], ['Erwarteter Entscheid', '1/1', 'Getrenntes GO oder NO-GO'], ['Aktive Entscheide', '0', 'Kein autorisierter Fall'], ['Personendaten', '0', 'Keine C3/C4-Daten']],
    badge: 'KANDIDAT · ZU BESTÄTIGEN',
    groups: [
      ['1 · Referenzen und Umfang', ['Kandidatenkennung des Entscheids', 'Opake Fallreferenz', 'Begrenzte Kategorie und Zweck', 'Vorgeschlagener Umfang und Dauer']],
      ['2 · Ergebnis der Voraussetzungen', ['Stand aller sechs Voraussetzungen', 'Opake Nachweisreferenzen', 'Abweichung oder Vorbehalt', 'Prüffolgerung']],
      ['3 · Autorität und Trennung', ['Anfragende Funktion', 'Prüffunktion', 'Zu prüfende Namensautorität', 'Zu prüfender getrennter Operator']],
      ['4 · Entscheid und Bedingungen', ['Begrenztes GO oder NO-GO', 'Bedingungen und Grenzen', 'Stopp und Rückkehr', 'Datum, Spur und nächste Prüfung']]
    ],
    rulesTitle: 'Fünf vorgeschlagene Entscheidregeln',
    rules: ['Sechs Voraussetzungen abgeschlossen', 'Nur ein Ergebnis', 'Mandat ausserhalb des Bundles geprüft', 'Keine C3/C4-Daten in REF-01', 'GO auf entschiedenen Umfang begrenzt'],
    status: 'KANDIDAT · Leeres Blatt vorbereitet. Null aktive Entscheide, reale Fälle, Identitäten, Zugriffe, geschützte Räume oder DMS-Operationen.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-03-011 V0.1 bestätigen oder ändern.',
    boundary: 'Auch nach Bestätigung ist dieses Blatt kein GO. Ein realer Entscheid muss nach Prüfung aller sechs Voraussetzungen ausgefüllt, namentlich, datiert und im autorisierten Raum aufbewahrt werden.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionFirstUseDecisionSheet = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-first-use-decision-sheet" className="mt-5 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><Gavel className="mt-0.5 shrink-0 text-violet-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-violet-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-violet-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-011 · V0.1</h6><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-retention-first-use-decision-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-violet-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionFirstUseDecisionSheet;
