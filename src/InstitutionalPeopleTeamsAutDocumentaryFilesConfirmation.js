import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DES DOSSIERS AUT-C / AUT-D · REF-01-DEC-026 · V1.0 · 27-08-2026',
    title: 'Confirmer la lecture documentaire sans déclarer les écarts résolus',
    intro: 'Cheikh confirme AUT-C-001 V0.1 et AUT-D-001 V0.1. Les deux dossiers sont promus en V1.0 comme lectures documentaires gouvernées ; leurs indisponibilités et propositions restent inchangées.',
    counters: [['Dossiers confirmés', '2/2', 'AUT-C et AUT-D V1.0'], ['Axes acceptés', '12', 'Six par dossier'], ['Valeurs nouvelles', '0', 'Aucune donnée déduite'], ['Actions réelles', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-026', version: 'V1.0', status: 'AUT-C et AUT-D confirmés comme dossiers documentaires', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-AUT-C-001 V0.1 et REF-01-G1-AUT-D-001 V0.1 sont confirmés ensemble et promus en V1.0. Les douze axes constituent une lecture documentaire acceptée ; les états « indisponible », « candidat » et « règle cadrée » ne sont pas requalifiés.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 27-08-2026 : « je confirme `REF-01-G1-AUT-C-001 V0.1` et `REF-01-G1-AUT-D-001` ». Le second identifiant renvoie au dossier V0.1 soumis dans l’arbitrage immédiatement précédent.',
      limit: 'Cette décision ne valide aucun coût, capacité, fournisseur, RPO, RTO, fréquence, seuil, responsable nommé, RACI institutionnel, accès, donnée réelle, source maîtresse, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · AUT-C-001 V1.0 et AUT-D-001 V1.0 deviennent les lectures documentaires gouvernées de leurs périmètres.',
    next: 'Étape produite ci-dessous : REF-01-G1-REV-002 V0.1 réévalue les six conditions G1 sans déclarer leurs écarts résolus.',
    boundary: 'Confirmer un dossier documentaire signifie accepter sa lecture et ses limites, pas prouver une aptitude à la production.'
  },
  EN: {
    eyebrow: 'HUMAN AUT-C / AUT-D FILE CONFIRMATION · REF-01-DEC-026 · V1.0 · 27 AUG 2026',
    title: 'Confirm the documentary reading without declaring gaps resolved',
    intro: 'Cheikh confirms AUT-C-001 V0.1 and AUT-D-001 V0.1. Both files are promoted to V1.0 as governed documentary readings; their unavailable items and proposals remain unchanged.',
    counters: [['Confirmed files', '2/2', 'AUT-C and AUT-D V1.0'], ['Accepted axes', '12', 'Six per file'], ['New values', '0', 'No inferred data'], ['Real actions', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-026', version: 'V1.0', status: 'AUT-C and AUT-D confirmed as documentary files', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-AUT-C-001 V0.1 and REF-01-G1-AUT-D-001 V0.1 are confirmed together and promoted to V1.0. The twelve axes form an accepted documentary reading; “unavailable”, “candidate” and “framed rule” states are not reclassified.',
      evidence: 'Explicit confirmation by Cheikh during the 27 Aug 2026 session: “je confirme `REF-01-G1-AUT-C-001 V0.1` et `REF-01-G1-AUT-D-001`”. The second identifier refers to the V0.1 file submitted in the immediately preceding decision.',
      limit: 'This decision validates no cost, capacity, provider, RPO, RTO, frequency, threshold, named owner, institutional RACI, access, real data, master source, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · AUT-C-001 V1.0 and AUT-D-001 V1.0 become the governed documentary readings for their scopes.',
    next: 'Produced step below: REF-01-G1-REV-002 V0.1 reassesses the six G1 conditions without declaring their gaps resolved.',
    boundary: 'Confirming a documentary file means accepting its reading and limits, not proving production readiness.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER AUT-C-/AUT-D-AKTEN · REF-01-DEC-026 · V1.0 · 27.08.2026',
    title: 'Die Dokumentlesung bestätigen, ohne Lücken als gelöst darzustellen',
    intro: 'Cheikh bestätigt AUT-C-001 V0.1 und AUT-D-001 V0.1. Beide Akten werden als Governance-konforme Dokumentlesungen zu V1.0; nicht verfügbare Angaben und Vorschläge bleiben unverändert.',
    counters: [['Bestätigte Akten', '2/2', 'AUT-C und AUT-D V1.0'], ['Akzeptierte Achsen', '12', 'Sechs je Akte'], ['Neue Werte', '0', 'Keine Daten abgeleitet'], ['Reale Aktionen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-026', version: 'V1.0', status: 'AUT-C und AUT-D als Dokumentakten bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-AUT-C-001 V0.1 und REF-01-G1-AUT-D-001 V0.1 werden gemeinsam bestätigt und zu V1.0. Die zwölf Achsen bilden eine akzeptierte Dokumentlesung; die Stände „nicht verfügbar“, „Kandidat“ und „strukturierte Regel“ werden nicht umqualifiziert.',
      evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 27.08.2026: « je confirme `REF-01-G1-AUT-C-001 V0.1` et `REF-01-G1-AUT-D-001` ». Der zweite Bezeichner verweist auf die unmittelbar zuvor zur Entscheidung vorgelegte Akte V0.1.',
      limit: 'Der Entscheid validiert keine Kosten, Kapazität, Anbieter, RPO, RTO, Häufigkeit, Schwelle, benannte Verantwortung, institutionelle RACI, Zugriffe, Echtdaten, Masterquelle, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · AUT-C-001 V1.0 und AUT-D-001 V1.0 werden die Governance-konformen Dokumentlesungen ihrer Umfänge.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-REV-002 V0.1 bewertet die sechs G1-Bedingungen neu, ohne offene Lücken als gelöst darzustellen.',
    boundary: 'Die Bestätigung einer Dokumentakte nimmt ihre Lesung und Grenzen an; sie belegt keine Produktionsreife.'
  }
};

const InstitutionalPeopleTeamsAutDocumentaryFilesConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-cd-files-confirmation" className="m3s-ref01-g1-aut-cd-files-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-cd-files-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-cd-files-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutDocumentaryFilesConfirmation;
