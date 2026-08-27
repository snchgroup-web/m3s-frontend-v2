import React from 'react';
import { AlertTriangle, FileSearch, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CONFIRMÉE DE VAGUE 1 · REF-01-G1-WAV-001 · V1.0 · 27-08-2026',
    title: 'Préparer trois dossiers en parallèle dans leurs limites confirmées',
    intro: 'Cette fiche confirmée transforme la décision DEC-022 en trois travaux documentaires séparés. DEC-023 autorise leur ouverture bornée sans inscrire de donnée réelle ni déclencher de contact externe.',
    counters: [['Pistes confirmées', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Sources enregistrées', '0', 'Recherche publique à démarrer'], ['Preuves ou relecteurs', '0', 'Synthétique ou profil uniquement'], ['Actions externes', '0', 'Contact et envoi interdits']],
    tracks: [
      ['AUT-A · Documentation officielle', 'Index de sources', ['Autorité ou éditeur', 'Référence ou URL', 'Date et version', 'Périmètre couvert', 'Provenance et accès'], 'AUTORISÉ · Sources officielles publiques'],
      ['AUT-B · Preuves techniques', 'Matrice de preuves synthétiques', ['Référence du contrôle', 'Jeu de données synthétique', 'Environnement isolé', 'Résultat reproductible', 'Responsable du contrôle'], 'AUTORISÉ · Données synthétiques isolées'],
      ['AUT-C · Retour indépendant', 'Brief de revue bornée', ['Corpus autorisé', 'Questions de revue', 'Rôle du relecteur', 'Déclaration de conflit', 'Format du verdict'], 'AUTORISÉ · Profil sans identité réelle']
    ],
    labels: { output: 'Sortie attendue', fields: 'Champs préparés', status: 'STATUT' },
    next: 'Prochain travail : produire les trois sorties bornées, puis les présenter ensemble à un seul contrôle humain avant toute étape externe.',
    boundary: 'Aucun fournisseur, compte, accès réel, contact, envoi, collecte externe, test sur données réelles ou promotion de source maîtresse n’est autorisé ; AUT-D reste en attente.'
  },
  EN: {
    eyebrow: 'CONFIRMED WAVE 1 SHEET · REF-01-G1-WAV-001 · V1.0 · 27 AUG 2026',
    title: 'Prepare three files in parallel within their confirmed limits',
    intro: 'This confirmed sheet translates DEC-022 into three separate documentary work tracks. DEC-023 authorises their bounded opening without recording real data or triggering external contact.',
    counters: [['Confirmed tracks', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Recorded sources', '0', 'Public research to start'], ['Evidence or reviewers', '0', 'Synthetic or profile only'], ['External actions', '0', 'Contact and send forbidden']],
    tracks: [
      ['AUT-A · Official documentation', 'Source index', ['Authority or publisher', 'Reference or URL', 'Date and version', 'Covered scope', 'Provenance and access'], 'AUTHORISED · Public official sources'],
      ['AUT-B · Technical evidence', 'Synthetic-evidence matrix', ['Control reference', 'Synthetic dataset', 'Isolated environment', 'Reproducible result', 'Control owner'], 'AUTHORISED · Isolated synthetic data'],
      ['AUT-C · Independent feedback', 'Bounded-review brief', ['Authorised corpus', 'Review questions', 'Reviewer role', 'Conflict declaration', 'Verdict format'], 'AUTHORISED · Profile without real identity']
    ],
    labels: { output: 'Expected output', fields: 'Prepared fields', status: 'STATUS' },
    next: 'Next work: produce the three bounded outputs, then submit them together to one human review before any external step.',
    boundary: 'No provider, account, real access, contact, send, external collection, real-data test or master-source promotion is authorised; AUT-D remains pending.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES BLATT WELLE 1 · REF-01-G1-WAV-001 · V1.0 · 27.08.2026',
    title: 'Drei Akten parallel innerhalb ihrer bestätigten Grenzen vorbereiten',
    intro: 'Dieses bestätigte Blatt überführt DEC-022 in drei getrennte Dokumentarbeiten. DEC-023 erlaubt ihre begrenzte Öffnung, ohne Echtdaten zu erfassen oder externe Kontakte auszulösen.',
    counters: [['Bestätigte Spuren', '3/3', 'AUT-A, AUT-B, AUT-C'], ['Erfasste Quellen', '0', 'Öffentliche Recherche beginnt'], ['Nachweise oder Prüfer', '0', 'Nur synthetisch oder Profil'], ['Externe Aktionen', '0', 'Kontakt und Versand verboten']],
    tracks: [
      ['AUT-A · Offizielle Dokumentation', 'Quellenindex', ['Behörde oder Herausgeber', 'Referenz oder URL', 'Datum und Version', 'Abgedeckter Umfang', 'Herkunft und Zugriff'], 'AUTORISIERT · Öffentliche offizielle Quellen'],
      ['AUT-B · Technische Nachweise', 'Matrix synthetischer Nachweise', ['Kontrollreferenz', 'Synthetischer Datensatz', 'Isolierte Umgebung', 'Reproduzierbares Ergebnis', 'Kontrollverantwortung'], 'AUTORISIERT · Isolierte synthetische Daten'],
      ['AUT-C · Unabhängige Rückmeldung', 'Begrenzter Prüfauftrag', ['Erlaubter Korpus', 'Prüffragen', 'Rolle des Prüfers', 'Konflikterklärung', 'Urteilsformat'], 'AUTORISIERT · Profil ohne reale Identität']
    ],
    labels: { output: 'Erwartete Ausgabe', fields: 'Vorbereitete Felder', status: 'STATUS' },
    next: 'Nächste Arbeit: die drei begrenzten Ausgaben erstellen und danach gemeinsam einer menschlichen Kontrolle vorlegen, bevor ein externer Schritt erfolgt.',
    boundary: 'Anbieter, Konto, Realzugriff, Kontakt, Versand, externe Sammlung, Echtdatentest oder Förderung einer Masterquelle sind nicht erlaubt; AUT-D wartet weiterhin.'
  }
};

const InstitutionalPeopleTeamsAutWaveOneCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-wave-one-candidate" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-wave-one-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-wave-one-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileSearch className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileSearch className="text-amber-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-3">{t.tracks.map(([title, output, fields, status]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-aut-wave-one-track"><p className="text-sm font-semibold text-slate-100">{title}</p><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.output} : </span>{output}</p><p className="mt-3 text-xs font-semibold text-slate-400">{t.labels.fields}</p><ul className="mt-2 space-y-1.5">{fields.map(field => <li key={field} className="text-xs leading-5 text-slate-300">• {field}</li>)}</ul><p className="mt-4 text-[11px] font-semibold text-emerald-200">{t.labels.status} · {status}</p></article>)}</div>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutWaveOneCandidate;
