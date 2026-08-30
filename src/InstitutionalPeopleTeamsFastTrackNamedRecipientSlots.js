import React from 'react';
import { AlertTriangle, ContactRound, LockKeyhole, UserRoundX } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const SLOTS = [
  ['NAM-EXC-01', 'REC-EXC-01', 'COL-EXC-01', text('Référent IT PostgreSQL et environnements', 'PostgreSQL and environments IT owner', 'IT-Verantwortung PostgreSQL und Umgebungen')],
  ['NAM-EXC-02', 'REC-EXC-02', 'COL-EXC-02', text('Binôme IT et GED pour continuité et restauration', 'IT and DMS pair for continuity and restoration', 'IT- und DMS-Duo für Kontinuität und Wiederherstellung')],
  ['NAM-EXC-03', 'REC-EXC-03', 'COL-EXC-03', text('Autorité à deux personnes pour identité et migration', 'Two-person authority for identity and migration', 'Zwei-Personen-Autorität für Identität und Migration')],
  ['NAM-EXC-04', 'REC-EXC-04', 'COL-EXC-04', text('Responsable GED pour références, droits et conservation', 'DMS owner for references, rights and retention', 'DMS-Verantwortung für Referenzen, Rechte und Aufbewahrung')],
  ['NAM-EXC-05', 'REC-EXC-05', 'COL-EXC-05', text('Référent IT et fonctions destinataires pour Outbox et supervision', 'IT owner and recipient functions for Outbox and monitoring', 'IT-Verantwortung und Empfängerfunktionen für Outbox und Überwachung')]
];

const COPY = {
  FR: {
    eyebrow: 'EMPLACEMENTS NOMINATIFS CONFIRMÉS · REF-01-G1-NAM-002 · V1.0 · 30-08-2026', title: 'Cinq emplacements gouvernés, toujours vides',
    intro: 'DEC-071 confirme NAM-002 comme cadre des cinq emplacements alignés sur REC-002 V1.0. Cette confirmation structure les places futures sans inscrire une identité, une entreprise, une adresse ou un canal.',
    counters: [['Emplacements confirmés', '5/5', 'Un par profil REC-EXC'], ['Décisions enregistrées', '1', 'REF-01-DEC-071'], ['Identités inscrites', '0', 'Aucun nom ni entreprise'], ['Affectations autorisées', '0', 'Décisions unitaires requises']],
    labels: { profile: 'Profil confirmé', file: 'Dossier de preuve', identity: 'Identité future', status: 'CONFIRMÉ · VIDE' },
    controlsTitle: 'Contrôles obligatoires avant toute inscription',
    controls: ['Identité ou raison sociale vérifiée séparément', 'Fonction et autorité actuelles confirmées', 'Besoin minimal et sensibilité qualifiés', 'Canal autorisé par décision distincte', 'Référence GED restreinte prévue', 'Validation humaine unitaire conservée'],
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'NAM-002 V1.0 gouverne désormais les cinq emplacements vides. AUT-003 V0.1, présenté ensuite, prépare cinq dossiers d’autorisation également vides et non exécutoires.',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-071', version: 'V1.0', status: 'NAM-002 confirmé sans identité ni contact', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-NAM-002 V0.1 est confirmé sans amendement et promu en V1.0 comme cadre des cinq emplacements nominatifs vides.', evidence: 'Confirmation de reprise de Cheikh dans la session du 30-08-2026 : « Alors codex, je suis de retour, merci de continuer », appliquée au point d’arbitrage NAM-002 explicitement consigné.', limit: 'La décision confirme uniquement le cadre vide. Elle n’inscrit aucune personne ou entreprise et n’autorise aucune coordonnée, affectation, adresse, canal, prise de contact, émission, collecte, dépense ou action L2 ; G1 reste ouverte.' },
    boundary: 'Les identités, coordonnées, affectations et demandes envoyées restent à zéro. Toute inscription ou prise de contact exige encore une décision humaine distincte.'
  },
  EN: {
    eyebrow: 'CONFIRMED NAMED-RECIPIENT SLOTS · REF-01-G1-NAM-002 · V1.0 · 30 AUG 2026', title: 'Five governed slots that remain empty',
    intro: 'DEC-071 confirms NAM-002 as the framework for five slots aligned with REC-002 V1.0. This confirmation structures future positions without entering an identity, company, address or channel.',
    counters: [['Confirmed slots', '5/5', 'One per REC-EXC profile'], ['Recorded decisions', '1', 'REF-01-DEC-071'], ['Entered identities', '0', 'No name or company'], ['Authorised assignments', '0', 'Individual decisions required']],
    labels: { profile: 'Confirmed profile', file: 'Evidence file', identity: 'Future identity', status: 'CONFIRMED · EMPTY' },
    controlsTitle: 'Mandatory checks before any entry',
    controls: ['Identity or legal entity verified separately', 'Current function and authority confirmed', 'Minimum need and sensitivity qualified', 'Channel authorised through a separate decision', 'Restricted DMS reference planned', 'Individual human validation retained'],
    decisionTitle: 'Fast Track decision outcome',
    decision: 'NAM-002 V1.0 now governs the five empty slots. AUT-003 V0.1, shown next, prepares five authorisation files that are also empty and non-executable.',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-071', version: 'V1.0', status: 'NAM-002 confirmed without identity or contact', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-NAM-002 V0.1 is confirmed without amendment and promoted to V1.0 as the framework for five empty named-recipient slots.', evidence: 'Cheikh’s continuation confirmation in the 30 Aug 2026 session: “Codex, I am back, thank you for continuing,” applied to the explicitly recorded NAM-002 decision point.', limit: 'The decision confirms only the empty framework. It enters no person or company and authorises no contact detail, assignment, address, channel, contact, release, collection, expense or L2 action; G1 remains open.' },
    boundary: 'Identities, contact details, assignments and requests sent remain at zero. Every entry or contact still requires a separate human decision.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE NAMENSSTELLEN · REF-01-G1-NAM-002 · V1.0 · 30.08.2026', title: 'Fünf gesteuerte, weiterhin leere Stellen',
    intro: 'DEC-071 bestätigt NAM-002 als Rahmen für fünf Stellen, die mit REC-002 V1.0 abgestimmt sind. Diese Bestätigung strukturiert künftige Stellen, ohne Identität, Unternehmen, Adresse oder Kanal einzutragen.',
    counters: [['Bestätigte Stellen', '5/5', 'Eine je REC-EXC-Profil'], ['Erfasste Entscheide', '1', 'REF-01-DEC-071'], ['Eingetragene Identitäten', '0', 'Kein Name oder Unternehmen'], ['Autorisierte Zuordnungen', '0', 'Einzelentscheide erforderlich']],
    labels: { profile: 'Bestätigtes Profil', file: 'Nachweisakte', identity: 'Künftige Identität', status: 'BESTÄTIGT · LEER' },
    controlsTitle: 'Pflichtkontrollen vor jedem Eintrag',
    controls: ['Identität oder Rechtsträger getrennt geprüft', 'Aktuelle Funktion und Befugnis bestätigt', 'Minimaler Bedarf und Sensibilität qualifiziert', 'Kanal durch getrennten Entscheid autorisiert', 'Eingeschränkte DMS-Referenz vorgesehen', 'Einzelne menschliche Validierung bewahrt'],
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'NAM-002 V1.0 steuert nun die fünf leeren Stellen. Das nachfolgende AUT-003 V0.1 bereitet fünf ebenfalls leere und nicht ausführbare Autorisierungsakten vor.',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-071', version: 'V1.0', status: 'NAM-002 ohne Identität oder Kontakt bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-NAM-002 V0.1 wird ohne Änderung bestätigt und zu V1.0 als Rahmen für fünf leere Namensstellen.', evidence: 'Fortsetzungsbestätigung von Cheikh in der Sitzung vom 30.08.2026: „Codex, ich bin zurück, danke fürs Weitermachen“, angewandt auf den ausdrücklich festgehaltenen NAM-002-Entscheidpunkt.', limit: 'Der Entscheid bestätigt nur den leeren Rahmen. Er trägt keine Person oder Firma ein und erlaubt keine Kontaktdaten, Zuordnung, Adresse, keinen Kanal, Kontakt, Versand, Sammlung, Ausgabe oder L2-Aktion; G1 bleibt offen.' },
    boundary: 'Identitäten, Kontaktdaten, Zuordnungen und versandte Anfragen bleiben bei null. Jeder Eintrag oder Kontakt benötigt weiterhin einen getrennten menschlichen Entscheid.'
  }
};

const InstitutionalPeopleTeamsFastTrackNamedRecipientSlots = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-nam-002" data-testid="ref01-g1-fast-track-named-recipient-slots" className="scroll-mt-24 rounded-md border border-rose-800/70 bg-rose-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-rose-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ContactRound className="shrink-0 text-rose-300" size={26} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <ContactRound className="text-rose-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{SLOTS.map(([id, profileId, file, profile]) => <article key={id} data-testid="ref01-g1-fast-track-named-recipient-slot" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-rose-300">{id}</p><p className="mt-1 text-xs text-slate-400">{t.labels.profile} · {profileId}</p><p className="mt-1 text-xs text-slate-400">{t.labels.file} · {file}</p></div><span className="inline-flex rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.labels.status}</span></div><p className="mt-3 text-sm font-semibold leading-6 text-slate-200">{profile[language] || profile.FR}</p><div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-slate-600 px-3 py-3 text-xs font-semibold text-slate-400"><UserRoundX size={17} aria-hidden="true" />{t.labels.identity} : —</div></article>)}</div>
      <div className="mt-4 rounded-md border border-slate-700 bg-slate-950/20 p-4"><h5 className="text-sm font-semibold text-slate-100">{t.controlsTitle}</h5><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.controls.map(control => <li key={control} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{control}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-4"><h5 className="text-sm font-semibold text-rose-100">{t.decisionTitle}</h5><p className="mt-2 text-sm font-semibold leading-6 text-rose-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackNamedRecipientSlots;
