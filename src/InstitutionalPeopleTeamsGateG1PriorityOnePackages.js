import React from 'react';
import { AlertTriangle, Archive, FileCheck2, KeyRound, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'SUPPORTS CANDIDATS · PRIORITÉ 1 · 27-08-2026',
    title: 'Préparer les deux lots de priorité 1 sans ouvrir d’accès ni toucher aux pièces',
    intro: 'Les deux matrices traduisent PKG-001 V1.0 en contrôles documentaires. Elles nomment des fonctions, des axes et des livrables candidats, jamais des personnes, droits ou durées de conservation réels.',
    counters: [['Supports candidats', '2', 'PKG-01 et PKG-02'], ['Responsables nommés', '0', 'Fonctions seulement'], ['Changements réels', '0', 'Aucun accès ni pièce'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { functions: 'Fonctions candidates', axes: 'Axes à documenter', outputs: 'Livrables candidats', unknowns: 'À qualifier', stop: 'Condition d’arrêt' },
    packages: [
      {
        id: 'REF-01-G1-PKG-01-001', version: 'V0.1', title: 'Rôles et visibilité', icon: KeyRound,
        functions: 'Ressources humaines · IT & Support · Administration · Gouvernance · GED',
        axes: ['Propriété métier et administration technique', 'Lecture de l’annuaire et appartenance Team/Agent', 'Visibilité par ligne et moindre privilège', 'Séparation saisie, contrôle, validation et décision', 'Responsabilité individuelle et collective distinctes'],
        outputs: ['Matrice des rôles candidats', 'Matrice de visibilité candidate', 'Chemin d’approbation', 'Scénarios synthétiques de contrôle', 'Registre des exceptions'],
        unknowns: 'Titulaires réels, périmètres d’accès, délégations, fréquence de revue et exceptions autorisées.',
        stop: 'Arrêt avant création ou modification d’un rôle, compte, accès, droit, délégation ou visibilité réelle.'
      },
      {
        id: 'REF-01-G1-PKG-02-001', version: 'V0.1', title: 'Conservation et GED', icon: Archive,
        functions: 'Administration · LEGAL · Ressources humaines · GED · Gouvernance',
        axes: ['Catégorie et sensibilité C2/C3/C4', 'Finalité et événement déclencheur', 'Gel ou maintien probatoire', 'Déclassement et autorité de suppression', 'Exception et preuve GED'],
        outputs: ['Matrice de conservation candidate', 'Registre des exceptions', 'Exigences de preuve GED', 'Chemin des autorités de décision'],
        unknowns: 'Durées, déclencheurs précis, autorités nominatives, règles locales et exceptions applicables.',
        stop: 'Arrêt avant suppression, reclassement, déplacement, déclassement, gel ou altération d’une pièce réelle.'
      }
    ],
    status: 'CANDIDATS · Deux supports préparés, zéro titulaire, zéro accès, zéro durée inventée et zéro pièce modifiée.',
    next: 'Prochain arbitrage humain groupé : confirmer ou amender REF-01-G1-PKG-01-001 V0.1 et REF-01-G1-PKG-02-001 V0.1.',
    boundary: 'Un arbitrage favorable confirmera seulement les matrices documentaires. Il ne donnera aucun droit et ne permettra aucune opération sur une pièce réelle.'
  },
  EN: {
    eyebrow: 'CANDIDATE SUPPORTS · PRIORITY 1 · 27 AUG 2026',
    title: 'Prepare both priority-one packages without opening access or changing records',
    intro: 'Both matrices translate PKG-001 V1.0 into documentary controls. They name candidate functions, axes and outputs, never real people, rights or retention periods.',
    counters: [['Candidate supports', '2', 'PKG-01 and PKG-02'], ['Named owners', '0', 'Functions only'], ['Real changes', '0', 'No access or records'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { functions: 'Candidate functions', axes: 'Axes to document', outputs: 'Candidate outputs', unknowns: 'To qualify', stop: 'Stop condition' },
    packages: [
      {
        id: 'REF-01-G1-PKG-01-001', version: 'V0.1', title: 'Roles and visibility', icon: KeyRound,
        functions: 'Human Resources · IT & Support · Administration · Governance · DMS',
        axes: ['Business ownership and technical administration', 'Directory reading and Team/Agent membership', 'Row visibility and least privilege', 'Separation of entry, control, validation and decision', 'Distinct individual and collective responsibility'],
        outputs: ['Candidate role matrix', 'Candidate visibility matrix', 'Approval path', 'Synthetic control scenarios', 'Exception register'],
        unknowns: 'Real holders, access scopes, delegations, review frequency and authorised exceptions.',
        stop: 'Stop before creating or changing any real role, account, access, right, delegation or visibility.'
      },
      {
        id: 'REF-01-G1-PKG-02-001', version: 'V0.1', title: 'Retention and DMS', icon: Archive,
        functions: 'Administration · LEGAL · Human Resources · DMS · Governance',
        axes: ['Category and C2/C3/C4 sensitivity', 'Purpose and triggering event', 'Hold or evidentiary freeze', 'Declassification and deletion authority', 'Exception and DMS evidence'],
        outputs: ['Candidate retention matrix', 'Exception register', 'DMS evidence requirements', 'Decision-authority path'],
        unknowns: 'Periods, precise triggers, named authorities, local rules and applicable exceptions.',
        stop: 'Stop before deleting, reclassifying, moving, declassifying, freezing or changing any real record.'
      }
    ],
    status: 'CANDIDATES · Two supports prepared, zero holders, zero access, zero invented periods and zero changed records.',
    next: 'Next grouped human decision: confirm or amend REF-01-G1-PKG-01-001 V0.1 and REF-01-G1-PKG-02-001 V0.1.',
    boundary: 'A favourable decision will confirm only the documentary matrices. It will grant no right and permit no operation on a real record.'
  },
  DE: {
    eyebrow: 'KANDIDATENTRÄGER · PRIORITÄT 1 · 27.08.2026',
    title: 'Beide Priorität-1-Pakete vorbereiten, ohne Zugriff zu öffnen oder Unterlagen zu ändern',
    intro: 'Beide Matrizen übersetzen PKG-001 V1.0 in dokumentarische Kontrollen. Sie nennen Kandidatenfunktionen, Achsen und Ergebnisse, niemals reale Personen, Rechte oder Aufbewahrungsfristen.',
    counters: [['Kandidatenträger', '2', 'PKG-01 und PKG-02'], ['Benannte Verantwortliche', '0', 'Nur Funktionen'], ['Reale Änderungen', '0', 'Kein Zugriff, keine Unterlage'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { functions: 'Kandidatenfunktionen', axes: 'Zu dokumentierende Achsen', outputs: 'Kandidatenergebnisse', unknowns: 'Zu qualifizieren', stop: 'Stoppbedingung' },
    packages: [
      {
        id: 'REF-01-G1-PKG-01-001', version: 'V0.1', title: 'Rollen und Sichtbarkeit', icon: KeyRound,
        functions: 'Personalwesen · IT & Support · Administration · Governance · DMS',
        axes: ['Fachverantwortung und technische Administration', 'Verzeichnislesung und Team-/Agent-Zugehörigkeit', 'Zeilensichtbarkeit und geringste Berechtigung', 'Trennung von Erfassung, Kontrolle, Validierung und Entscheid', 'Getrennte individuelle und kollektive Verantwortung'],
        outputs: ['Kandidaten-Rollenmatrix', 'Kandidaten-Sichtbarkeitsmatrix', 'Genehmigungsweg', 'Synthetische Kontrollszenarien', 'Ausnahmeregister'],
        unknowns: 'Reale Inhaber, Zugriffsumfänge, Delegationen, Prüffrequenz und autorisierte Ausnahmen.',
        stop: 'Stopp vor Erstellung oder Änderung realer Rollen, Konten, Zugriffe, Rechte, Delegationen oder Sichtbarkeit.'
      },
      {
        id: 'REF-01-G1-PKG-02-001', version: 'V0.1', title: 'Aufbewahrung und DMS', icon: Archive,
        functions: 'Administration · LEGAL · Personalwesen · DMS · Governance',
        axes: ['Kategorie und Sensibilität C2/C3/C4', 'Zweck und auslösendes Ereignis', 'Sperre oder Beweissicherung', 'Deklassifizierung und Löschautorität', 'Ausnahme und DMS-Nachweis'],
        outputs: ['Kandidaten-Aufbewahrungsmatrix', 'Ausnahmeregister', 'DMS-Nachweisanforderungen', 'Weg der Entscheidautoritäten'],
        unknowns: 'Fristen, genaue Auslöser, benannte Autoritäten, lokale Regeln und anwendbare Ausnahmen.',
        stop: 'Stopp vor Löschung, Umklassifizierung, Verschiebung, Deklassifizierung, Sperre oder Änderung realer Unterlagen.'
      }
    ],
    status: 'KANDIDATEN · Zwei Träger vorbereitet, null Inhaber, null Zugriff, null erfundene Fristen und null geänderte Unterlagen.',
    next: 'Nächster gebündelter menschlicher Entscheid: REF-01-G1-PKG-01-001 V0.1 und REF-01-G1-PKG-02-001 V0.1 bestätigen oder ändern.',
    boundary: 'Ein positiver Entscheid bestätigt nur die Dokumentmatrizen. Er gewährt kein Recht und erlaubt keine Operation an realen Unterlagen.'
  }
};

const InstitutionalPeopleTeamsGateG1PriorityOnePackages = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-priority-one-packages" className="m3s-ref01-g1-priority-one-packages mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-priority-one-packages-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-priority-one-packages-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileCheck2 className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileCheck2 className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.packages.map(pkg => { const Icon = pkg.icon; return <article key={pkg.id} data-testid="ref01-g1-priority-one-package" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-sky-300" size={19} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">{pkg.id} · {pkg.version}</h6><p className="mt-1 text-xs font-semibold text-violet-200">{pkg.title}</p></div></div><span className="rounded-full border border-amber-700 px-2 py-1 text-xs font-semibold text-amber-200">CANDIDAT</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-200">{t.labels.functions}</dt><dd className="mt-1 text-slate-300">{pkg.functions}</dd></div><div><dt className="font-semibold text-violet-200">{t.labels.axes}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{pkg.axes.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.outputs}</dt><dd className="mt-1"><ul className="space-y-1 text-slate-300">{pkg.outputs.map(item => <li key={item}>• {item}</li>)}</ul></dd></div><div><dt className="font-semibold text-amber-200">{t.labels.unknowns}</dt><dd className="mt-1 text-slate-300">{pkg.unknowns}</dd></div><div><dt className="font-semibold text-rose-200">{t.labels.stop}</dt><dd className="mt-1 text-slate-300">{pkg.stop}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PriorityOnePackages;
