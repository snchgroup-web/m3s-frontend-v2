import React from 'react';
import { AlertTriangle, Circle, MousePointerClick } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CANDIDATE DE SÉLECTION AUT · REF-01-G1-SEL-001 · V0.1 · 27-08-2026',
    title: 'Préparer le choix sans présélectionner la réponse',
    intro: 'Cette fiche applique PRI-001 V1.0. Elle sépare la validation de la méthode du choix effectif du premier dossier : aucun bouton, aucune valeur et aucun ordre ne sont présélectionnés.',
    options: [
      ['AUT-A', 'Documentation officielle', 'REQ-A · REC-A', 'Sources publiques ou institutionnelles'],
      ['AUT-B', 'Preuves techniques', 'REQ-B · REC-B', 'Preuves isolées et synthétiques'],
      ['AUT-C', 'Retour indépendant', 'REQ-C · REC-C', 'Relecture méthodologique bornée'],
      ['AUT-D', 'Revue croisée', 'REQ-D · REC-D', 'Contrôle croisé borné']
    ],
    labels: { scope: 'Périmètre', status: 'NON SÉLECTIONNÉ' },
    status: 'FICHE CANDIDATE · 0/4 DOSSIER SÉLECTIONNÉ · AUCUNE PRIORITÉ EXÉCUTÉE',
    next: 'Point de reprise : confirmer ou amender SEL-001 V0.1, puis indiquer explicitement une seule valeur parmi AUT-A, AUT-B, AUT-C ou AUT-D.',
    boundary: 'La sélection future autorisera uniquement la préparation documentaire du dossier choisi. Elle ne vaudra ni choix d’une identité, ni désignation d’un fournisseur, ni autorisation de contact, d’envoi, d’accès ou de preuve réelle.'
  },
  EN: {
    eyebrow: 'CANDIDATE AUT SELECTION SHEET · REF-01-G1-SEL-001 · V0.1 · 27 AUG 2026',
    title: 'Prepare the choice without preselecting the answer',
    intro: 'This sheet applies PRI-001 V1.0. It separates method validation from the effective choice of the first file: no button, value or order is preselected.',
    options: [
      ['AUT-A', 'Official documentation', 'REQ-A · REC-A', 'Public or institutional sources'],
      ['AUT-B', 'Technical evidence', 'REQ-B · REC-B', 'Isolated synthetic evidence'],
      ['AUT-C', 'Independent feedback', 'REQ-C · REC-C', 'Bounded methodological review'],
      ['AUT-D', 'Cross-review', 'REQ-D · REC-D', 'Bounded cross-control']
    ],
    labels: { scope: 'Scope', status: 'NOT SELECTED' },
    status: 'CANDIDATE SHEET · 0/4 FILE SELECTED · NO PRIORITY EXECUTED',
    next: 'Resume point: confirm or amend SEL-001 V0.1, then explicitly state one value among AUT-A, AUT-B, AUT-C or AUT-D.',
    boundary: 'The future selection will authorise documentary preparation of the chosen file only. It will not select an identity, designate a provider or authorise contact, send, access or real evidence.'
  },
  DE: {
    eyebrow: 'KANDIDATENBLATT ZUR AUT-AUSWAHL · REF-01-G1-SEL-001 · V0.1 · 27.08.2026',
    title: 'Die Wahl vorbereiten, ohne eine Antwort vorauszuwählen',
    intro: 'Dieses Blatt wendet PRI-001 V1.0 an. Es trennt die Methodenbestätigung von der tatsächlichen Wahl der ersten Akte: Keine Schaltfläche, kein Wert und keine Reihenfolge sind vorausgewählt.',
    options: [
      ['AUT-A', 'Offizielle Dokumentation', 'REQ-A · REC-A', 'Öffentliche oder institutionelle Quellen'],
      ['AUT-B', 'Technische Nachweise', 'REQ-B · REC-B', 'Isolierte synthetische Nachweise'],
      ['AUT-C', 'Unabhängige Rückmeldung', 'REQ-C · REC-C', 'Begrenzte methodische Prüfung'],
      ['AUT-D', 'Gegenprüfung', 'REQ-D · REC-D', 'Begrenzte Gegenkontrolle']
    ],
    labels: { scope: 'Umfang', status: 'NICHT GEWÄHLT' },
    status: 'KANDIDATENBLATT · 0/4 AKTEN GEWÄHLT · KEINE PRIORITÄT AUSGEFÜHRT',
    next: 'Wiederaufnahmepunkt: SEL-001 V0.1 bestätigen oder ändern und danach genau einen Wert aus AUT-A, AUT-B, AUT-C oder AUT-D ausdrücklich nennen.',
    boundary: 'Die künftige Auswahl erlaubt nur die dokumentarische Vorbereitung der gewählten Akte. Sie wählt keine Identität, bestimmt keinen Anbieter und erlaubt weder Kontakt, Versand, Zugriff noch reale Nachweise.'
  }
};

const InstitutionalPeopleTeamsAutFileSelectionCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-file-selection-candidate" className="m3s-ref01-g1-aut-file-selection-candidate mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-file-selection-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-file-selection-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><MousePointerClick className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.options.map(([id, title, link, scope]) => <article key={id} className="m3s-raised min-h-36 p-4" data-testid="ref01-g1-aut-selection-option"><div className="flex items-center justify-between gap-3"><p className="text-base font-semibold text-amber-200">{id}</p><Circle className="text-slate-400" size={20} aria-hidden="true" /></div><p className="mt-3 text-sm font-semibold text-slate-100">{title}</p><p className="mt-2 text-xs text-sky-200">{link}</p><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.scope} : </span>{scope}</p><p className="mt-3 text-[11px] font-semibold text-slate-400">{t.labels.status}</p></article>)}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutFileSelectionCandidate;
