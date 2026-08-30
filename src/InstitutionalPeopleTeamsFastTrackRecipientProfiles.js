import React from 'react';
import { AlertTriangle, LockKeyhole, Send, UserRoundSearch } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

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
    eyebrow: 'PROFILS DESTINATAIRES CONFIRMÉS · REF-01-G1-REC-002 · V1.0 · 30-08-2026', title: 'Cinq capacités attendues confirmées sans nommer de personne',
    intro: 'DEC-070 confirme les cinq profils fonctionnels dérivés de REQ-002 V1.0. Ils décrivent la qualité attendue des futurs répondants, pas leur identité, adresse ou canal.',
    counters: [['Profils confirmés', '5/5', 'Un par dossier COL-EXC'], ['Décisions enregistrées', '1', 'REF-01-DEC-070'], ['Personnes nommées', '0', 'Aucune identité sélectionnée'], ['Demandes envoyées', '0', 'Émission fermée']],
    profile: 'Capacité fonctionnelle attendue', status: 'CONFIRMÉ · AUCUNE IDENTITÉ', decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'REC-002 V1.0 gouverne les cinq profils. DEC-071 confirme désormais NAM-002 V1.0 comme cinq emplacements nominatifs toujours vides.',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-070', version: 'V1.0', status: 'REC-002 confirmé sans identité ni contact', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-REC-002 V0.1 est confirmé sans amendement et promu en V1.0 comme profils fonctionnels des cinq futurs destinataires.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 après contrôle Remote : « C tout bon, merci pour le retour et continue. »', limit: 'La décision confirme uniquement les cinq profils fonctionnels. Elle ne nomme aucune personne ou entreprise et n’autorise aucune adresse, canal, prise de contact, émission, collecte, donnée sensible, dépense ou action L2 ; G1 reste ouverte.' },
    boundary: 'Les personnes nommées, canaux et demandes envoyées restent à zéro. Toute inscription nominative ou prise de contact exige encore une décision humaine distincte.'
  },
  EN: {
    eyebrow: 'CONFIRMED RECIPIENT PROFILES · REF-01-G1-REC-002 · V1.0 · 30 AUG 2026', title: 'Five expected capabilities confirmed without naming anyone',
    intro: 'DEC-070 confirms the five functional profiles derived from REQ-002 V1.0. They describe the expected capacity of future respondents, not their identity, address or channel.',
    counters: [['Confirmed profiles', '5/5', 'One per COL-EXC file'], ['Recorded decisions', '1', 'REF-01-DEC-070'], ['Named people', '0', 'No identity selected'], ['Requests sent', '0', 'Release closed']],
    profile: 'Expected functional capacity', status: 'CONFIRMED · NO IDENTITY', decisionTitle: 'Fast Track decision outcome',
    decision: 'REC-002 V1.0 governs the five profiles. DEC-071 now confirms NAM-002 V1.0 as five named-recipient slots that remain empty.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-070', version: 'V1.0', status: 'REC-002 confirmed without identity or contact', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-REC-002 V0.1 is confirmed without amendment and promoted to V1.0 as the functional profiles for the five future recipients.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session after Remote review: “Everything is good, thank you for the feedback, and continue.”', limit: 'The decision confirms only the five functional profiles. It names no person or company and authorises no address, channel, contact, release, collection, sensitive data, expense or L2 action; G1 remains open.' },
    boundary: 'Named people, channels and requests sent remain at zero. Any named entry or contact still requires a separate human decision.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE EMPFÄNGERPROFILE · REF-01-G1-REC-002 · V1.0 · 30.08.2026', title: 'Fünf erwartete Fähigkeiten bestätigt, ohne jemanden zu benennen',
    intro: 'DEC-070 bestätigt die fünf aus REQ-002 V1.0 abgeleiteten Funktionsprofile. Sie beschreiben die erwartete Fähigkeit künftiger Auskunftspersonen, nicht Identität, Adresse oder Kanal.',
    counters: [['Bestätigte Profile', '5/5', 'Eines je COL-EXC-Akte'], ['Erfasste Entscheide', '1', 'REF-01-DEC-070'], ['Benannte Personen', '0', 'Keine Identität ausgewählt'], ['Versandte Anfragen', '0', 'Versand geschlossen']],
    profile: 'Erwartete Funktionsfähigkeit', status: 'BESTÄTIGT · KEINE IDENTITÄT', decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'REC-002 V1.0 steuert die fünf Profile. DEC-071 bestätigt nun NAM-002 V1.0 als fünf weiterhin leere Namensstellen.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-070', version: 'V1.0', status: 'REC-002 ohne Identität oder Kontakt bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-REC-002 V0.1 wird ohne Änderung bestätigt und zu V1.0 als Funktionsprofile der fünf künftigen Empfänger.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026 nach der Remote-Prüfung: „Alles ist gut, danke für die Rückmeldung, bitte weitermachen.“', limit: 'Der Entscheid bestätigt nur die fünf Funktionsprofile. Er benennt keine Person oder Firma und erlaubt keine Adresse, keinen Kanal, Kontakt, Versand, keine Sammlung, sensible Daten, Ausgabe oder L2-Aktion; G1 bleibt offen.' },
    boundary: 'Benannte Personen, Kanäle und versandte Anfragen bleiben bei null. Jeder Namenseintrag oder Kontakt benötigt weiterhin einen getrennten menschlichen Entscheid.'
  }
};

const InstitutionalPeopleTeamsFastTrackRecipientProfiles = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rec-002" data-testid="ref01-g1-fast-track-recipient-profiles" className="scroll-mt-24 rounded-md border border-fuchsia-800/70 bg-fuchsia-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-fuchsia-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><UserRoundSearch className="shrink-0 text-fuchsia-300" size={26} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><LockKeyhole className={index === 0 ? 'text-fuchsia-300' : 'text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{PROFILES.map(([id, file, profile]) => <article key={id} data-testid="ref01-g1-fast-track-recipient-profile" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-fuchsia-300">{id} · {file}</p><p className="mt-2 text-xs font-semibold text-slate-400">{t.profile}</p></div><span className="inline-flex rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.status}</span></div><p className="mt-2 text-sm leading-6 text-slate-200">{profile[language] || profile.FR}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-fuchsia-700/70 bg-fuchsia-950/20 p-4"><div className="flex items-center gap-2"><Send className="text-fuchsia-300" size={18} aria-hidden="true" /><h5 className="text-sm font-semibold text-fuchsia-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-fuchsia-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackRecipientProfiles;
