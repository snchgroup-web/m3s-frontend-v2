import React from 'react';
import { AlertTriangle, LockKeyhole, Send, UserRoundSearch } from 'lucide-react';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const PROFILES = [
  ['REC-EXC-01', 'COL-EXC-01', text('Référent IT habilité à documenter le service PostgreSQL et ses environnements', 'IT owner authorised to document the PostgreSQL service and its environments', 'IT-Verantwortung zur Dokumentation des PostgreSQL-Dienstes und seiner Umgebungen')],
  ['REC-EXC-02', 'COL-EXC-02', text('Binôme IT et GED habilité à documenter sauvegarde, conservation et restauration', 'IT and DMS pair authorised to document backup, retention and restoration', 'IT- und DMS-Duo zur Dokumentation von Sicherung, Aufbewahrung und Wiederherstellung')],
  ['REC-EXC-03', 'COL-EXC-03', text('Autorité à deux personnes habilitée à documenter identité et fenêtre de migration', 'Two-person authority authorised to document identity and the migration window', 'Zwei-Personen-Autorität zur Dokumentation von Identität und Migrationsfenster')],
  ['REC-EXC-04', 'COL-EXC-04', text('Responsable GED habilité à confirmer références, droits et conservation', 'DMS owner authorised to confirm references, rights and retention', 'DMS-Verantwortung zur Bestätigung von Referenzen, Rechten und Aufbewahrung')],
  ['REC-EXC-05', 'COL-EXC-05', text('Référent IT avec fonctions destinataires habilité à documenter Outbox et supervision', 'IT owner with recipient functions authorised to document Outbox and monitoring', 'IT-Verantwortung mit Empfängerfunktionen zur Dokumentation von Outbox und Überwachung')]
];

const COPY = {
  FR: {
    eyebrow: 'PROFILS DESTINATAIRES CANDIDATS · REF-01-G1-REC-002 · V0.1 · 30-08-2026', title: 'Définir cinq capacités attendues sans nommer de personne',
    intro: 'REC-002 traduit le modèle REQ-002 V1.0 en cinq profils fonctionnels. Il décrit la qualité attendue du futur répondant, pas son identité, son adresse ou son canal.',
    counters: [['Profils préparés', '5/5', 'Un par dossier COL-EXC'], ['Personnes nommées', '0', 'Aucune identité sélectionnée'], ['Canaux sélectionnés', '0', 'Aucun contact autorisé'], ['Demandes envoyées', '0', 'Émission fermée']],
    profile: 'Capacité fonctionnelle attendue', status: 'CANDIDAT · AUCUNE IDENTITÉ', decisionTitle: 'Prochain arbitrage groupé',
    decision: 'Confirmer : « Je confirme REF-01-G1-REC-002 V0.1 comme profils fonctionnels des cinq destinataires, sans nommer ni contacter personne. » Amender : indiquer uniquement le profil REC-EXC concerné.',
    boundary: 'La confirmation des profils ne désignera aucune personne, entreprise, adresse ou canal et n’autorisera aucun contact, envoi, collecte, accès, dépense ou action L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE RECIPIENT PROFILES · REF-01-G1-REC-002 · V0.1 · 30 AUG 2026', title: 'Define five expected capabilities without naming anyone',
    intro: 'REC-002 translates the REQ-002 V1.0 template into five functional profiles. It describes the expected capacity of a future respondent, not their identity, address or channel.',
    counters: [['Prepared profiles', '5/5', 'One per COL-EXC file'], ['Named people', '0', 'No identity selected'], ['Selected channels', '0', 'No contact authorised'], ['Requests sent', '0', 'Release closed']],
    profile: 'Expected functional capacity', status: 'CANDIDATE · NO IDENTITY', decisionTitle: 'Next grouped decision',
    decision: 'Confirm: “I confirm REF-01-G1-REC-002 V0.1 as the functional profiles for the five recipients, without naming or contacting anyone.” Amend: identify only the affected REC-EXC profile.',
    boundary: 'Confirming the profiles will designate no person, company, address or channel and authorise no contact, release, collection, access, expense or L2 action.'
  },
  DE: {
    eyebrow: 'KANDIDATEN-EMPFÄNGERPROFILE · REF-01-G1-REC-002 · V0.1 · 30.08.2026', title: 'Fünf erwartete Fähigkeiten definieren, ohne jemanden zu benennen',
    intro: 'REC-002 überführt die Vorlage REQ-002 V1.0 in fünf Funktionsprofile. Es beschreibt die erwartete Fähigkeit einer künftigen Auskunftsperson, nicht Identität, Adresse oder Kanal.',
    counters: [['Vorbereitete Profile', '5/5', 'Eines je COL-EXC-Akte'], ['Benannte Personen', '0', 'Keine Identität ausgewählt'], ['Gewählte Kanäle', '0', 'Kein Kontakt erlaubt'], ['Versandte Anfragen', '0', 'Versand geschlossen']],
    profile: 'Erwartete Funktionsfähigkeit', status: 'KANDIDAT · KEINE IDENTITÄT', decisionTitle: 'Nächster gebündelter Entscheid',
    decision: 'Bestätigen: „Ich bestätige REF-01-G1-REC-002 V0.1 als Funktionsprofile der fünf Empfänger, ohne jemanden zu benennen oder zu kontaktieren.“ Ändern: Nur das betroffene REC-EXC-Profil nennen.',
    boundary: 'Die Bestätigung der Profile bestimmt keine Person, Firma, Adresse oder keinen Kanal und erlaubt keinen Kontakt, Versand, keine Sammlung, keinen Zugriff, keine Ausgabe oder L2-Aktion.'
  }
};

const InstitutionalPeopleTeamsFastTrackRecipientProfiles = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rec-002" data-testid="ref01-g1-fast-track-recipient-profiles" className="scroll-mt-24 rounded-md border border-fuchsia-800/70 bg-fuchsia-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-fuchsia-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><UserRoundSearch className="shrink-0 text-fuchsia-300" size={26} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><LockKeyhole className={index === 0 ? 'text-fuchsia-300' : 'text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{PROFILES.map(([id, file, profile]) => <article key={id} data-testid="ref01-g1-fast-track-recipient-profile" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-fuchsia-300">{id} · {file}</p><p className="mt-2 text-xs font-semibold text-slate-400">{t.profile}</p></div><span className="inline-flex rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.status}</span></div><p className="mt-2 text-sm leading-6 text-slate-200">{profile[language] || profile.FR}</p></article>)}</div>
      <div className="mt-4 rounded-md border border-fuchsia-700/70 bg-fuchsia-950/20 p-4"><div className="flex items-center gap-2"><Send className="text-fuchsia-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-fuchsia-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-fuchsia-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackRecipientProfiles;
