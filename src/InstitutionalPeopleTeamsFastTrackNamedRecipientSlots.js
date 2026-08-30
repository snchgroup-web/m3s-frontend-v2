import React from 'react';
import { AlertTriangle, ContactRound, LockKeyhole, UserRoundX } from 'lucide-react';

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
    eyebrow: 'EMPLACEMENTS NOMINATIFS CANDIDATS · REF-01-G1-NAM-002 · V0.1 · 30-08-2026', title: 'Préparer cinq emplacements vides avant toute inscription',
    intro: 'NAM-002 applique les profils REC-002 V1.0 sans les transformer en identités. Chaque emplacement reste vide jusqu’à une décision nominative unitaire et un contrôle de l’autorité, du canal et de la sensibilité.',
    counters: [['Emplacements préparés', '5/5', 'Un par profil REC-EXC'], ['Identités inscrites', '0', 'Aucun nom ni entreprise'], ['Coordonnées inscrites', '0', 'Aucune adresse ni contact'], ['Affectations autorisées', '0', 'Décisions unitaires requises']],
    labels: { profile: 'Profil confirmé', file: 'Dossier de preuve', identity: 'Identité future', status: 'VIDE · NON AUTORISÉ' },
    controlsTitle: 'Contrôles obligatoires avant toute inscription',
    controls: ['Identité ou raison sociale vérifiée séparément', 'Fonction et autorité actuelles confirmées', 'Besoin minimal et sensibilité qualifiés', 'Canal autorisé par décision distincte', 'Référence GED restreinte prévue', 'Validation humaine unitaire conservée'],
    decisionTitle: 'Prochain arbitrage groupé',
    decision: 'Confirmer : « Je confirme REF-01-G1-NAM-002 V0.1 comme cadre des cinq emplacements nominatifs vides, sans inscrire ni contacter personne. » Amender : indiquer uniquement l’emplacement NAM-EXC concerné.',
    boundary: 'La confirmation du cadre ne remplira aucun emplacement et n’autorisera aucune identité, adresse, prise de contact, émission, collecte, dépense, accès ou action L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE NAMED-RECIPIENT SLOTS · REF-01-G1-NAM-002 · V0.1 · 30 AUG 2026', title: 'Prepare five empty slots before any named entry',
    intro: 'NAM-002 applies the REC-002 V1.0 profiles without turning them into identities. Every slot remains empty until an individual named decision and checks of authority, channel and sensitivity.',
    counters: [['Prepared slots', '5/5', 'One per REC-EXC profile'], ['Entered identities', '0', 'No name or company'], ['Entered contact details', '0', 'No address or contact'], ['Authorised assignments', '0', 'Individual decisions required']],
    labels: { profile: 'Confirmed profile', file: 'Evidence file', identity: 'Future identity', status: 'EMPTY · NOT AUTHORISED' },
    controlsTitle: 'Mandatory checks before any entry',
    controls: ['Identity or legal entity verified separately', 'Current function and authority confirmed', 'Minimum need and sensitivity qualified', 'Channel authorised through a separate decision', 'Restricted DMS reference planned', 'Individual human validation retained'],
    decisionTitle: 'Next grouped decision',
    decision: 'Confirm: “I confirm REF-01-G1-NAM-002 V0.1 as the framework for the five empty named-recipient slots, without entering or contacting anyone.” Amend: identify only the affected NAM-EXC slot.',
    boundary: 'Confirming the framework will fill no slot and authorise no identity, address, contact, release, collection, expense, access or L2 action.'
  },
  DE: {
    eyebrow: 'KANDIDATEN FÜR LEERE NAMENSSTELLEN · REF-01-G1-NAM-002 · V0.1 · 30.08.2026', title: 'Fünf leere Stellen vor jedem Namenseintrag vorbereiten',
    intro: 'NAM-002 wendet die Profile REC-002 V1.0 an, ohne daraus Identitäten zu machen. Jede Stelle bleibt bis zu einem einzelnen Namensentscheid und Kontrollen von Befugnis, Kanal und Sensibilität leer.',
    counters: [['Vorbereitete Stellen', '5/5', 'Eine je REC-EXC-Profil'], ['Eingetragene Identitäten', '0', 'Kein Name oder Unternehmen'], ['Eingetragene Kontaktdaten', '0', 'Keine Adresse oder Kontaktangabe'], ['Autorisierte Zuordnungen', '0', 'Einzelentscheide erforderlich']],
    labels: { profile: 'Bestätigtes Profil', file: 'Nachweisakte', identity: 'Künftige Identität', status: 'LEER · NICHT AUTORISIERT' },
    controlsTitle: 'Pflichtkontrollen vor jedem Eintrag',
    controls: ['Identität oder Rechtsträger getrennt geprüft', 'Aktuelle Funktion und Befugnis bestätigt', 'Minimaler Bedarf und Sensibilität qualifiziert', 'Kanal durch getrennten Entscheid autorisiert', 'Eingeschränkte DMS-Referenz vorgesehen', 'Einzelne menschliche Validierung bewahrt'],
    decisionTitle: 'Nächster gebündelter Entscheid',
    decision: 'Bestätigen: „Ich bestätige REF-01-G1-NAM-002 V0.1 als Rahmen der fünf leeren Namensstellen, ohne jemanden einzutragen oder zu kontaktieren.“ Ändern: Nur die betroffene NAM-EXC-Stelle nennen.',
    boundary: 'Die Bestätigung des Rahmens füllt keine Stelle und erlaubt keine Identität, Adresse, Kontaktaufnahme, Versand, Sammlung, Ausgabe, Zugriff oder L2-Aktion.'
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
      <div className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-4"><h5 className="text-sm font-semibold text-rose-100">{t.decisionTitle}</h5><p className="mt-2 text-sm font-semibold leading-6 text-rose-100">{t.decision}</p></div>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackNamedRecipientSlots;
