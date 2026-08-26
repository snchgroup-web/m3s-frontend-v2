import React from 'react';
import { AlertTriangle, BadgeCheck, ContactRound, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CANDIDATE D’INSCRIPTION NOMINATIVE · REF-01-G1-NAM-001 · V0.1 · 26-08-2026',
    title: 'Préparer les emplacements sans enregistrer d’identité',
    intro: 'Cette fiche applique REC-001 V1.0 en préparant quatre emplacements vides. Elle définit ce qui devra être prouvé avant chaque inscription réelle, sans publier de nom, d’entreprise, d’adresse ou de coordonnée.',
    counters: [['Emplacements préparés', '4', 'Un par profil confirmé'], ['Identités réelles', '0', 'Aucune donnée nominative'], ['Inscriptions autorisées', '0', 'Décision individuelle requise'], ['Contacts ou envois', '0', 'Toujours interdits']],
    labels: { target: 'Emplacement à compléter après autorisation', proof: 'Preuve avant inscription', status: 'VIDE · NON AUTORISÉ' },
    slots: [
      ['REQ-A · Documentation officielle', 'Entité ou service officiel responsable de la documentation.', 'Autorité, source officielle, périmètre et canal professionnel vérifiés.'],
      ['REQ-B · Preuves techniques', 'Fonction IT interne autorisée ou service technique compétent.', 'Mandat, environnement isolé, données synthétiques et séparation du contrôle prouvés.'],
      ['REQ-C · Coûts et capacité', 'Service tarifaire officiel ou interlocuteur professionnel habilité.', 'Qualité, offre non engageante, devise, validité et périmètre comparable vérifiés.'],
      ['REQ-D · Gouvernance interne', 'Fonctions internes de préparation, contrôle, validation et conservation.', 'Rôles, droits, sensibilité, conservation et emplacement GED confirmés.']
    ],
    controlsTitle: 'Contrôles avant chaque inscription réelle',
    controls: ['Rattachement explicite au profil REC et au lot REQ.', 'Nécessité et minimisation des données démontrées.', 'Qualité professionnelle ou mandat interne prouvé.', 'Base d’autorisation et droits d’accès documentés.', 'Responsable interne et emplacement GED désignés.', 'Révision, expiration et autorisation d’envoi traitées séparément.'],
    next: 'Prochain arbitrage humain : confirmer ou amender NAM-001 V0.1, puis autoriser ou refuser séparément la création de chaque fiche nominative. Aucun nom et aucun envoi automatiques.',
    boundary: 'Limite : NAM-001 contient quatre emplacements vides. Il ne crée aucune identité, ne recommande aucun fournisseur et n’autorise aucun contact, envoi, achat ou ouverture de L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE NAMED-RECIPIENT RECORD · REF-01-G1-NAM-001 · V0.1 · 26 AUG 2026',
    title: 'Prepare slots without recording an identity',
    intro: 'This sheet applies REC-001 V1.0 by preparing four empty slots. It defines what must be evidenced before each real entry, without publishing a name, company, address or contact detail.',
    counters: [['Prepared slots', '4', 'One per confirmed profile'], ['Real identities', '0', 'No named data'], ['Authorised records', '0', 'Individual decision required'], ['Contacts or sends', '0', 'Still forbidden']],
    labels: { target: 'Slot to complete after authorisation', proof: 'Evidence before recording', status: 'EMPTY · NOT AUTHORISED' },
    slots: [
      ['REQ-A · Official documentation', 'Official entity or service responsible for documentation.', 'Authority, official source, scope and professional channel verified.'],
      ['REQ-B · Technical evidence', 'Authorised internal IT function or competent technical service.', 'Mandate, isolated environment, synthetic data and separated control evidenced.'],
      ['REQ-C · Costs and capacity', 'Official pricing service or authorised professional contact.', 'Capacity, non-binding offer, currency, validity and comparable scope verified.'],
      ['REQ-D · Internal governance', 'Internal preparation, control, validation and retention functions.', 'Roles, rights, sensitivity, retention and DMS location confirmed.']
    ],
    controlsTitle: 'Controls before each real entry',
    controls: ['Explicit link to the REC profile and REQ package.', 'Necessity and data minimisation demonstrated.', 'Professional capacity or internal mandate evidenced.', 'Authorisation basis and access rights documented.', 'Internal owner and DMS location designated.', 'Review, expiry and send authorisation handled separately.'],
    next: 'Next human decision: confirm or amend NAM-001 V0.1, then separately authorise or refuse creation of each named record. No automatic names or sends.',
    boundary: 'Boundary: NAM-001 contains four empty slots. It creates no identity, recommends no provider and authorises no contact, send, purchase or L2 opening.'
  },
  DE: {
    eyebrow: 'KANDIDATENBLATT FÜR BENANNTE EMPFÄNGER · REF-01-G1-NAM-001 · V0.1 · 26.08.2026',
    title: 'Leere Stellen vorbereiten, ohne eine Identität zu erfassen',
    intro: 'Dieses Blatt wendet REC-001 V1.0 an und bereitet vier leere Stellen vor. Es definiert die vor jedem realen Eintrag nötigen Nachweise, ohne Namen, Firma, Adresse oder Kontaktdaten zu veröffentlichen.',
    counters: [['Vorbereitete Stellen', '4', 'Eine je bestätigtem Profil'], ['Reale Identitäten', '0', 'Keine Namensdaten'], ['Autorisierte Einträge', '0', 'Einzelentscheid erforderlich'], ['Kontakte oder Versand', '0', 'Weiterhin verboten']],
    labels: { target: 'Nach Autorisierung zu ergänzende Stelle', proof: 'Nachweis vor Erfassung', status: 'LEER · NICHT AUTORISIERT' },
    slots: [
      ['REQ-A · Offizielle Dokumentation', 'Offizielle Entität oder Stelle mit Verantwortung für die Dokumentation.', 'Befugnis, offizielle Quelle, Umfang und Fachkanal geprüft.'],
      ['REQ-B · Technische Nachweise', 'Autorisierte interne IT-Funktion oder kompetente technische Stelle.', 'Mandat, isolierte Umgebung, synthetische Daten und getrennte Kontrolle belegt.'],
      ['REQ-C · Kosten und Kapazität', 'Offizielle Preisstelle oder autorisierter Fachkontakt.', 'Eigenschaft, unverbindliche Offerte, Währung, Gültigkeit und vergleichbarer Umfang geprüft.'],
      ['REQ-D · Interne Governance', 'Interne Funktionen für Vorbereitung, Kontrolle, Validierung und Aufbewahrung.', 'Rollen, Rechte, Sensibilität, Aufbewahrung und DMS-Ablage bestätigt.']
    ],
    controlsTitle: 'Kontrollen vor jedem realen Eintrag',
    controls: ['Explizite Verbindung zum REC-Profil und REQ-Paket.', 'Notwendigkeit und Datenminimierung nachgewiesen.', 'Fachliche Eigenschaft oder internes Mandat belegt.', 'Autorisierungsgrundlage und Zugriffsrechte dokumentiert.', 'Interne Verantwortung und DMS-Ablage bestimmt.', 'Prüfung, Ablauf und Versandautorisierung getrennt behandelt.'],
    next: 'Nächster menschlicher Entscheid: NAM-001 V0.1 bestätigen oder ändern und danach die Erstellung jedes benannten Eintrags getrennt erlauben oder ablehnen. Keine automatischen Namen oder Sendungen.',
    boundary: 'Grenze: NAM-001 enthält vier leere Stellen. Es erstellt keine Identität, empfiehlt keinen Anbieter und autorisiert weder Kontakt, Versand, Kauf noch L2-Öffnung.'
  }
};

const InstitutionalPeopleTeamsNamedRecipientCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-named-recipient-candidate" className="m3s-ref01-g1-named-recipient-candidate mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-named-recipient-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-named-recipient-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ContactRound className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <BadgeCheck className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 divide-y divide-slate-700 rounded-md border border-slate-700">{t.slots.map(([profile, target, proof]) => <article key={profile} className="p-4" data-testid="ref01-g1-named-recipient-slot"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{profile}</h6><span className="rounded-md border border-rose-700/70 bg-rose-950/20 px-2 py-1 text-[11px] font-semibold text-rose-200">{t.labels.status}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2"><div><dt className="text-xs font-semibold text-sky-300">{t.labels.target}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{target}</dd></div><div><dt className="text-xs font-semibold text-emerald-300">{t.labels.proof}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{proof}</dd></div></dl></article>)}</div>
      <section className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-4" aria-labelledby="ref01-g1-named-recipient-checks-title"><div className="flex items-center gap-2"><BadgeCheck className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-named-recipient-checks-title" className="text-sm font-semibold text-amber-100">{t.controlsTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.controls.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-named-recipient-check"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsNamedRecipientCandidate;
