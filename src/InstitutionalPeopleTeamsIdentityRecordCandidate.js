import React from 'react';
import { AlertTriangle, FileUser, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'GABARIT CONFIRMÉ DE FICHE UNITAIRE · REF-01-G1-IDN-001 · V1.0 · 27-08-2026',
    title: 'Documenter une seule identité sans l’autoriser',
    intro: 'Confirmé par REF-01-DEC-020, ce gabarit applique AUT-001 V1.0 à une future identité candidate. Il reste non affecté et vide : la priorité du dossier AUT, l’identité, les preuves et chaque décision seront traitées séparément.',
    counters: [['Gabarits unitaires', '1', 'Cadre confirmé'], ['Dossier AUT prioritaire', '0/4', 'Aucune affectation'], ['Identités inscrites', '0', 'Aucun nom réel'], ['Autorisations accordées', '0', 'Décision ultérieure']],
    groups: [
      ['1 · Rattachement gouverné', ['Dossier AUT-A, B, C ou D', 'Lot REQ et profil REC correspondants', 'Finalité précise et nécessité documentée']],
      ['2 · Identité minimale', ['Nom ou fonction strictement nécessaire', 'Qualité professionnelle ou mandat', 'Source officielle et canal professionnel']],
      ['3 · Contrôles et preuves', ['Responsable interne et droits d’accès', 'Référence GED et niveau de sensibilité', 'Conservation, expiration et révision']],
      ['4 · Décisions séparées', ['Autoriser ou refuser l’inscription', 'Autoriser ou refuser le contact', 'Autoriser ou refuser chaque envoi']]
    ],
    status: 'GABARIT CONFIRMÉ ET VIDE · AUCUN DOSSIER AUT PRIORISÉ · AUCUNE IDENTITÉ',
    next: 'PRI-001, SEL-001, BAT-001 et WAV-001 sont confirmés en V1.0 ; la vague 1 est ouverte sans identité réelle.',
    boundary: 'Limite : IDN-001 ne contient aucun nom, entreprise, adresse, coordonnée, canal, preuve réelle ou autorisation. Il ne déclenche aucun contact ou envoi et ne ferme pas G1.'
  },
  EN: {
    eyebrow: 'CONFIRMED INDIVIDUAL RECORD TEMPLATE · REF-01-G1-IDN-001 · V1.0 · 27 AUG 2026',
    title: 'Document one identity without authorising it',
    intro: 'Confirmed through REF-01-DEC-020, this template applies AUT-001 V1.0 to one future candidate identity. It remains unassigned and empty: AUT-file priority, identity, evidence and every decision are handled separately.',
    counters: [['Individual templates', '1', 'Confirmed framework'], ['Priority AUT file', '0/4', 'No assignment'], ['Recorded identities', '0', 'No real name'], ['Granted authorisations', '0', 'Later decision']],
    groups: [
      ['1 · Governed link', ['AUT-A, B, C or D file', 'Matching REQ package and REC profile', 'Precise purpose and documented necessity']],
      ['2 · Minimal identity', ['Strictly necessary name or function', 'Professional capacity or mandate', 'Official source and professional channel']],
      ['3 · Controls and evidence', ['Internal owner and access rights', 'DMS reference and sensitivity level', 'Retention, expiry and review']],
      ['4 · Separate decisions', ['Authorise or refuse the record', 'Authorise or refuse contact', 'Authorise or refuse each send']]
    ],
    status: 'CONFIRMED EMPTY TEMPLATE · NO AUT FILE PRIORITISED · NO IDENTITY',
    next: 'PRI-001, SEL-001, BAT-001 and WAV-001 are confirmed as V1.0; Wave 1 is open without a real identity.',
    boundary: 'Boundary: IDN-001 contains no name, company, address, contact detail, channel, real evidence or authorisation. It triggers no contact or send and does not close G1.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTE VORLAGE FÜR EINZELAKTEN · REF-01-G1-IDN-001 · V1.0 · 27.08.2026',
    title: 'Eine Identität dokumentieren, ohne sie zu autorisieren',
    intro: 'Mit REF-01-DEC-020 bestätigt, wendet diese Vorlage AUT-001 V1.0 auf eine künftige Kandidatenidentität an. Sie bleibt nicht zugeordnet und leer: AUT-Aktenpriorität, Identität, Nachweise und jeder Entscheid werden getrennt behandelt.',
    counters: [['Einzelvorlagen', '1', 'Bestätigter Rahmen'], ['Priorisierte AUT-Akte', '0/4', 'Keine Zuordnung'], ['Erfasste Identitäten', '0', 'Kein realer Name'], ['Erteilte Autorisierungen', '0', 'Späterer Entscheid']],
    groups: [
      ['1 · Gesteuerte Verbindung', ['AUT-Akte A, B, C oder D', 'Passendes REQ-Paket und REC-Profil', 'Präziser Zweck und dokumentierte Notwendigkeit']],
      ['2 · Minimale Identität', ['Nur notwendiger Name oder Funktion', 'Berufliche Eigenschaft oder Mandat', 'Offizielle Quelle und Fachkanal']],
      ['3 · Kontrollen und Nachweise', ['Interne Verantwortung und Zugriffsrechte', 'DMS-Referenz und Sensibilitätsstufe', 'Aufbewahrung, Ablauf und Prüfung']],
      ['4 · Getrennte Entscheide', ['Eintrag erlauben oder ablehnen', 'Kontakt erlauben oder ablehnen', 'Jeden Versand erlauben oder ablehnen']]
    ],
    status: 'BESTÄTIGTE LEERE VORLAGE · KEINE AUT-AKTE PRIORISIERT · KEINE IDENTITÄT',
    next: 'PRI-001, SEL-001, BAT-001 und WAV-001 sind als V1.0 bestätigt; Welle 1 ist ohne reale Identität geöffnet.',
    boundary: 'Grenze: IDN-001 enthält keinen Namen, keine Firma, Adresse, Kontaktdaten, keinen Kanal, realen Nachweis oder Autorisierung. Es löst keinen Kontakt oder Versand aus und schliesst G1 nicht.'
  }
};

const InstitutionalPeopleTeamsIdentityRecordCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-identity-record-candidate" className="m3s-ref01-g1-identity-record-candidate mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-identity-record-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-identity-record-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileUser className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">{t.groups.map(([title, fields]) => <article key={title} className="rounded-md border border-slate-700 p-4" data-testid="ref01-g1-identity-record-group"><h6 className="text-sm font-semibold text-violet-200">{title}</h6><ul className="mt-3 space-y-2">{fields.map(field => <li key={field} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-identity-record-field"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{field}</li>)}</ul></article>)}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsIdentityRecordCandidate;
