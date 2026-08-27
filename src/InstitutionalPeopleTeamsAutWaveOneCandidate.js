import React from 'react';
import { AlertTriangle, FileSearch, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CANDIDATE DE VAGUE 1 · REF-01-G1-WAV-001 · V0.1 · 27-08-2026',
    title: 'Préparer trois dossiers en parallèle sans commencer la collecte',
    intro: 'Cette fiche transforme la décision DEC-022 en trois gabarits documentaires séparés. Elle prépare les champs, sorties et contrôles de AUT-A, AUT-B et AUT-C sans inscrire de contenu réel.',
    counters: [['Pistes préparées', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Sources enregistrées', '0', 'Index vide'], ['Preuves ou relecteurs', '0', 'Aucune donnée réelle'], ['Actions externes', '0', 'Nouvel arbitrage requis']],
    tracks: [
      ['AUT-A · Documentation officielle', 'Index de sources', ['Autorité ou éditeur', 'Référence ou URL', 'Date et version', 'Périmètre couvert', 'Provenance et accès'], '0 source enregistrée'],
      ['AUT-B · Preuves techniques', 'Matrice de preuves synthétiques', ['Référence du contrôle', 'Jeu de données synthétique', 'Environnement isolé', 'Résultat reproductible', 'Responsable du contrôle'], '0 preuve jointe'],
      ['AUT-C · Retour indépendant', 'Brief de revue bornée', ['Corpus autorisé', 'Questions de revue', 'Rôle du relecteur', 'Déclaration de conflit', 'Format du verdict'], '0 relecteur nommé']
    ],
    labels: { output: 'Sortie attendue', fields: 'Champs préparés', status: 'STATUT' },
    next: 'Prochain arbitrage : confirmer ou amender WAV-001 V0.1 avant toute recherche officielle, production de preuve technique ou désignation d’un relecteur réel.',
    boundary: 'Les trois gabarits restent vides. Aucun fournisseur, compte, accès, contact, envoi, collecte, test réel ou preuve réelle n’est autorisé ; AUT-D reste en attente.'
  },
  EN: {
    eyebrow: 'CANDIDATE WAVE 1 SHEET · REF-01-G1-WAV-001 · V0.1 · 27 AUG 2026',
    title: 'Prepare three files in parallel without starting collection',
    intro: 'This sheet translates DEC-022 into three separate documentary templates. It prepares the fields, outputs and controls for AUT-A, AUT-B and AUT-C without recording real content.',
    counters: [['Prepared tracks', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Recorded sources', '0', 'Empty index'], ['Evidence or reviewers', '0', 'No real data'], ['External actions', '0', 'New decision required']],
    tracks: [
      ['AUT-A · Official documentation', 'Source index', ['Authority or publisher', 'Reference or URL', 'Date and version', 'Covered scope', 'Provenance and access'], '0 sources recorded'],
      ['AUT-B · Technical evidence', 'Synthetic-evidence matrix', ['Control reference', 'Synthetic dataset', 'Isolated environment', 'Reproducible result', 'Control owner'], '0 evidence attached'],
      ['AUT-C · Independent feedback', 'Bounded-review brief', ['Authorised corpus', 'Review questions', 'Reviewer role', 'Conflict declaration', 'Verdict format'], '0 reviewers named']
    ],
    labels: { output: 'Expected output', fields: 'Prepared fields', status: 'STATUS' },
    next: 'Next decision: confirm or amend WAV-001 V0.1 before any official research, technical-evidence production or designation of a real reviewer.',
    boundary: 'All three templates remain empty. No provider, account, access, contact, send, collection, real test or real evidence is authorised; AUT-D remains pending.'
  },
  DE: {
    eyebrow: 'KANDIDATENBLATT WELLE 1 · REF-01-G1-WAV-001 · V0.1 · 27.08.2026',
    title: 'Drei Akten parallel vorbereiten, ohne die Sammlung zu beginnen',
    intro: 'Dieses Blatt überführt DEC-022 in drei getrennte Dokumentvorlagen. Es bereitet Felder, Ausgaben und Kontrollen für AUT-A, AUT-B und AUT-C vor, ohne reale Inhalte zu erfassen.',
    counters: [['Vorbereitete Spuren', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Erfasste Quellen', '0', 'Leerer Index'], ['Nachweise oder Prüfer', '0', 'Keine realen Daten'], ['Externe Aktionen', '0', 'Neuer Entscheid nötig']],
    tracks: [
      ['AUT-A · Offizielle Dokumentation', 'Quellenindex', ['Behörde oder Herausgeber', 'Referenz oder URL', 'Datum und Version', 'Abgedeckter Umfang', 'Herkunft und Zugriff'], '0 Quellen erfasst'],
      ['AUT-B · Technische Nachweise', 'Matrix synthetischer Nachweise', ['Kontrollreferenz', 'Synthetischer Datensatz', 'Isolierte Umgebung', 'Reproduzierbares Ergebnis', 'Kontrollverantwortung'], '0 Nachweise beigefügt'],
      ['AUT-C · Unabhängige Rückmeldung', 'Begrenzter Prüfauftrag', ['Erlaubter Korpus', 'Prüffragen', 'Rolle des Prüfers', 'Konflikterklärung', 'Urteilsformat'], '0 Prüfer benannt']
    ],
    labels: { output: 'Erwartete Ausgabe', fields: 'Vorbereitete Felder', status: 'STATUS' },
    next: 'Nächster Entscheid: WAV-001 V0.1 bestätigen oder ändern, bevor offizielle Recherche, technische Nachweiserstellung oder Benennung eines realen Prüfers beginnt.',
    boundary: 'Alle drei Vorlagen bleiben leer. Anbieter, Konto, Zugriff, Kontakt, Versand, Sammlung, Realtest oder realer Nachweis sind nicht erlaubt; AUT-D wartet weiterhin.'
  }
};

const InstitutionalPeopleTeamsAutWaveOneCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-wave-one-candidate" className="mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-wave-one-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-wave-one-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileSearch className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileSearch className="text-amber-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.tracks.map(([title, output, fields, status]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-aut-wave-one-track"><p className="text-sm font-semibold text-slate-100">{title}</p><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.output} : </span>{output}</p><p className="mt-3 text-xs font-semibold text-slate-400">{t.labels.fields}</p><ul className="mt-2 space-y-1.5">{fields.map(field => <li key={field} className="text-xs leading-5 text-slate-300">• {field}</li>)}</ul><p className="mt-4 text-[11px] font-semibold text-amber-200">{t.labels.status} · {status}</p></article>)}</div>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutWaveOneCandidate;
