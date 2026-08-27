import React from 'react';
import { AlertTriangle, Layers3, MousePointerClick } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CONFIRMÉE DE SÉLECTION AUT · REF-01-G1-SEL-001 · V1.0 · 27-08-2026',
    title: 'Préparer les quatre dossiers dans un lot contrôlé',
    intro: 'Cette version amendée applique PRI-001 V1.0 et la demande d’accélération de Cheikh. AUT-A à AUT-D sont inclus dans un même lot candidat, sans exécution ni autorisation implicite.',
    options: [
      ['AUT-A', 'Documentation officielle', 'REQ-A · REC-A', 'Sources publiques ou institutionnelles'],
      ['AUT-B', 'Preuves techniques', 'REQ-B · REC-B', 'Preuves isolées et synthétiques'],
      ['AUT-C', 'Retour indépendant', 'REQ-C · REC-C', 'Relecture méthodologique bornée'],
      ['AUT-D', 'Revue croisée', 'REQ-D · REC-D', 'Contrôle croisé borné']
    ],
    labels: { scope: 'Périmètre', status: 'INCLUS AU LOT · NON EXÉCUTÉ' },
    status: 'LOT CANDIDAT · 4/4 DOSSIERS INCLUS · 0 EXÉCUTÉ · 0 IDENTITÉ · 0 AUTORISATION',
    next: 'Étape accomplie : SEL-001 V1.0 et BAT-001 V1.0 sont confirmés par REF-01-DEC-022 ; la vague documentaire WAV-001 V0.1 est préparée sans contenu réel.',
    boundary: 'L’inclusion dans le lot ne vaut ni désignation d’une source maîtresse, ni choix d’une identité ou d’un fournisseur, ni autorisation de contact, d’envoi, d’accès, de collecte, de test ou de preuve réelle.'
  },
  EN: {
    eyebrow: 'CONFIRMED AUT SELECTION SHEET · REF-01-G1-SEL-001 · V1.0 · 27 AUG 2026',
    title: 'Prepare all four files as one controlled package',
    intro: 'This amended version applies PRI-001 V1.0 and Cheikh’s request to accelerate. AUT-A through AUT-D are included in one candidate package, without execution or implicit authorisation.',
    options: [
      ['AUT-A', 'Official documentation', 'REQ-A · REC-A', 'Public or institutional sources'],
      ['AUT-B', 'Technical evidence', 'REQ-B · REC-B', 'Isolated synthetic evidence'],
      ['AUT-C', 'Independent feedback', 'REQ-C · REC-C', 'Bounded methodological review'],
      ['AUT-D', 'Cross-review', 'REQ-D · REC-D', 'Bounded cross-control']
    ],
    labels: { scope: 'Scope', status: 'INCLUDED IN PACKAGE · NOT EXECUTED' },
    status: 'CANDIDATE PACKAGE · 4/4 FILES INCLUDED · 0 EXECUTED · 0 IDENTITY · 0 AUTHORISATION',
    next: 'Completed step: SEL-001 V1.0 and BAT-001 V1.0 are confirmed through REF-01-DEC-022; documentary wave WAV-001 V0.1 is prepared without real content.',
    boundary: 'Inclusion in the package does not designate a master source, identity or provider and does not authorise contact, send, access, collection, testing or real evidence.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES BLATT ZUR AUT-AUSWAHL · REF-01-G1-SEL-001 · V1.0 · 27.08.2026',
    title: 'Alle vier Akten als ein kontrolliertes Paket vorbereiten',
    intro: 'Diese geänderte Version wendet PRI-001 V1.0 und Cheikhs Beschleunigungswunsch an. AUT-A bis AUT-D sind in einem Kandidatenpaket enthalten, ohne Ausführung oder stillschweigende Autorisierung.',
    options: [
      ['AUT-A', 'Offizielle Dokumentation', 'REQ-A · REC-A', 'Öffentliche oder institutionelle Quellen'],
      ['AUT-B', 'Technische Nachweise', 'REQ-B · REC-B', 'Isolierte synthetische Nachweise'],
      ['AUT-C', 'Unabhängige Rückmeldung', 'REQ-C · REC-C', 'Begrenzte methodische Prüfung'],
      ['AUT-D', 'Gegenprüfung', 'REQ-D · REC-D', 'Begrenzte Gegenkontrolle']
    ],
    labels: { scope: 'Umfang', status: 'IM PAKET ENTHALTEN · NICHT AUSGEFÜHRT' },
    status: 'KANDIDATENPAKET · 4/4 AKTEN ENTHALTEN · 0 AUSGEFÜHRT · 0 IDENTITÄTEN · 0 AUTORISIERUNGEN',
    next: 'Abgeschlossener Schritt: SEL-001 V1.0 und BAT-001 V1.0 sind mit REF-01-DEC-022 bestätigt; Dokumentwelle WAV-001 V0.1 ist ohne reale Inhalte vorbereitet.',
    boundary: 'Die Aufnahme in das Paket bestimmt weder Masterquelle, Identität noch Anbieter und erlaubt weder Kontakt, Versand, Zugriff, Sammlung, Test noch reale Nachweise.'
  }
};

const InstitutionalPeopleTeamsAutFileSelectionCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-file-selection-candidate" className="m3s-ref01-g1-aut-file-selection-candidate mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-file-selection-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-file-selection-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><MousePointerClick className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.options.map(([id, title, link, scope]) => <article key={id} className="m3s-raised min-h-36 p-4" data-testid="ref01-g1-aut-selection-option"><div className="flex items-center justify-between gap-3"><p className="text-base font-semibold text-amber-200">{id}</p><Layers3 className="text-amber-300" size={20} aria-hidden="true" /></div><p className="mt-3 text-sm font-semibold text-slate-100">{title}</p><p className="mt-2 text-xs text-sky-200">{link}</p><p className="mt-3 text-xs leading-5 text-slate-300"><span className="font-semibold text-slate-400">{t.labels.scope} : </span>{scope}</p><p className="mt-3 text-[11px] font-semibold text-amber-200">{t.labels.status}</p></article>)}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutFileSelectionCandidate;
