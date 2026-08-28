import React from 'react';
import { AlertTriangle, ClipboardList, FileKey2, ListChecks, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE DES REVUES DE CONSERVATION · CONFIRMÉ V1.0 · 28-08-2026',
    title: 'Préparer une trace uniforme sans ouvrir de cas réel',
    intro: 'Ce gabarit organise les métadonnées d une future revue humaine. Il ne contient aucun dossier, nom, document sensible, délai calculé ou ordre d exécution.',
    counters: [['Gabarit', '1', 'Structure vide'], ['Métadonnées', '16', 'Quatre groupes contrôlés'], ['Cas réels', '0', 'Aucune donnée personnelle'], ['Opérations', '0', 'Aucune action GED']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['Identité et périmètre', ['Identifiant du cas', 'Catégorie confirmée', 'Référence opaque de l objet', 'Entité et territoire']],
      ['Déclenchement', ['Événement observé', 'Date d effet candidate', 'Origine du signal', 'Fonction requérante']],
      ['Contrôle et preuves', ['Fonction pilote', 'Fonctions contributrices', 'Références de preuves', 'État du gel']],
      ['Décision documentaire', ['Résultat candidat', 'Autorité de décision candidate', 'Date de décision', 'Prochaine revue ou échéance candidate']]
    ],
    statesTitle: 'Cinq états documentaires proposés',
    states: ['Ouvert', 'Qualifié', 'En attente', 'Décision préparée', 'Clôturé documentairement'],
    status: 'CONFIRMÉ · Gabarit et cinq états retenus. Zéro cas réel, affectation nominative, donnée C3/C4, délai appliqué ou opération.',
    next: 'Étape suivante : préparer les six portes d ouverture dans REF-01-G1-AUT-02-03-008 V0.1.',
    boundary: 'Une confirmation validera uniquement le gabarit et ses états. Chaque futur cas, preuve, délai, décision finale et opération GED exigera son propre contrôle et son autorisation.'
  },
  EN: {
    eyebrow: 'RETENTION REVIEW REGISTER · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Prepare a uniform trace without opening a real case',
    intro: 'This template organises metadata for a future human review. It contains no file, name, sensitive record, calculated period or execution order.',
    counters: [['Template', '1', 'Empty structure'], ['Metadata fields', '16', 'Four controlled groups'], ['Real cases', '0', 'No personal data'], ['Operations', '0', 'No DMS action']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['Identity and scope', ['Case identifier', 'Confirmed category', 'Opaque object reference', 'Entity and territory']],
      ['Trigger', ['Observed event', 'Candidate effective date', 'Signal origin', 'Requesting function']],
      ['Control and evidence', ['Lead function', 'Contributing functions', 'Evidence references', 'Hold state']],
      ['Documentary decision', ['Candidate outcome', 'Candidate decision authority', 'Decision date', 'Next review or candidate deadline']]
    ],
    statesTitle: 'Five proposed documentary states',
    states: ['Open', 'Qualified', 'On hold', 'Decision prepared', 'Documentary closed'],
    status: 'CONFIRMED · Template and five states retained. Zero real cases, named assignments, C3/C4 data, applied periods or operations.',
    next: 'Next step: prepare the six opening gates in REF-01-G1-AUT-02-03-008 V0.1.',
    boundary: 'Confirmation will validate only the template and its states. Every future case, item of evidence, period, final decision and DMS operation will require its own review and authorisation.'
  },
  DE: {
    eyebrow: 'REGISTER DER AUFBEWAHRUNGSPRÜFUNGEN · BESTÄTIGT V1.0 · 28.08.2026',
    title: 'Eine einheitliche Spur vorbereiten, ohne einen realen Fall zu eröffnen',
    intro: 'Diese Vorlage ordnet Metadaten für eine künftige menschliche Prüfung. Sie enthält keine Akte, keinen Namen, keinen sensiblen Nachweis, keine berechnete Frist und keinen Ausführungsauftrag.',
    counters: [['Vorlage', '1', 'Leere Struktur'], ['Metadatenfelder', '16', 'Vier kontrollierte Gruppen'], ['Reale Fälle', '0', 'Keine Personendaten'], ['Operationen', '0', 'Keine DMS-Aktion']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['Identität und Umfang', ['Fallkennung', 'Bestätigte Kategorie', 'Undurchsichtige Objektreferenz', 'Einheit und Gebiet']],
      ['Auslöser', ['Beobachtetes Ereignis', 'Kandidaten-Wirkungsdatum', 'Signalherkunft', 'Anfragende Funktion']],
      ['Kontrolle und Nachweise', ['Federführende Funktion', 'Mitwirkende Funktionen', 'Nachweisreferenzen', 'Sperrstatus']],
      ['Dokumentarischer Entscheid', ['Kandidatenergebnis', 'Kandidaten-Entscheidbehörde', 'Entscheiddatum', 'Nächste Prüfung oder Kandidatenfrist']]
    ],
    statesTitle: 'Fünf vorgeschlagene Dokumentationsstände',
    states: ['Offen', 'Qualifiziert', 'In Wartestellung', 'Entscheid vorbereitet', 'Dokumentarisch geschlossen'],
    status: 'BESTÄTIGT · Vorlage und fünf Stände festgehalten. Null reale Fälle, Namenszuweisungen, C3/C4-Daten, angewandte Fristen oder Operationen.',
    next: 'Nächster Schritt: die sechs Öffnungstore in REF-01-G1-AUT-02-03-008 V0.1 vorbereiten.',
    boundary: 'Eine Bestätigung validiert nur die Vorlage und ihre Stände. Jeder künftige Fall, Nachweis, jede Frist, jeder Endentscheid und jede DMS-Operation benötigt eine eigene Prüfung und Autorisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionReviewRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-review-register" className="mt-5 rounded-md border border-slate-700 bg-slate-950/25 p-3 sm:p-4">
      <div className="flex items-start gap-3"><ClipboardList className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index === 0 ? FileKey2 : index === 1 ? ListChecks : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-007 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-retention-review-register-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.statesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.states.map(state => <span key={state} className="rounded-md border border-violet-700/60 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{state}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionReviewRegister;
