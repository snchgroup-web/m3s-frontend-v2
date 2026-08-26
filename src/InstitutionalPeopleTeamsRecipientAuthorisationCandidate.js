import React from 'react';
import { AlertTriangle, ContactRound, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CANDIDATE DES DESTINATAIRES · REF-01-G1-REC-001 · V0.1 · 26-08-2026',
    title: 'Qualifier les destinataires sans inscrire de nom réel',
    intro: 'Cette fiche dérive les profils nécessaires de REQ-001 V1.0. Elle définit les qualités à vérifier avant toute nomination, sans contenir de personne, d’entreprise, d’adresse ou de canal concret.',
    counters: [['Profils candidats', '4', 'Un profil par lot confirmé'], ['Noms réels inscrits', '0', 'Aucune identité publiée'], ['Contacts autorisés', '0', 'Autorisation humaine distincte'], ['Demandes envoyées', '0', 'Aucun déclenchement']],
    labels: { profile: 'Profil destinataire candidat', qualification: 'Qualité à vérifier', channel: 'Canal admissible après autorisation', status: 'PROFIL CANDIDAT · AUCUN NOM' },
    recipients: [
      ['REQ-A · Documentation officielle', 'Service officiel, éditeur ou responsable contractuel capable de fournir une source datée et versionnée.', 'Autorité sur la documentation, provenance vérifiable, absence de secret et périmètre correspondant.', 'Page officielle ou contact professionnel autorisé et traçable.'],
      ['REQ-B · Preuves techniques', 'Responsable IT interne autorisé ou service technique compétent pour produire un rapport non productif.', 'Mandat explicite, environnement isolé, données synthétiques, méthode et contrôleur séparé.', 'Canal interne autorisé avec dépôt GED gouverné.'],
      ['REQ-C · Coûts et capacité', 'Service tarifaire officiel ou interlocuteur professionnel habilité à communiquer une offre non engageante.', 'Tarif daté, devise, hypothèses, validité, périmètre comparable et aucune acceptation commerciale.', 'Source tarifaire officielle ou contact professionnel autorisé.'],
      ['REQ-D · Gouvernance interne', 'Fonctions internes responsables de la préparation, du contrôle, de la validation et de la conservation.', 'Rôles séparés, droits vérifiés, sensibilité, durée de conservation et emplacement GED définis.', 'Workflow interne M3S/GED, sans destinataire externe.']
    ],
    checksTitle: 'Conditions avant l’ajout d’un nom réel',
    checks: ['Besoin et lot REQ correspondants confirmés.', 'Qualité professionnelle ou fonction interne vérifiée.', 'Canal autorisé, traçable et limité à la finalité.', 'Aucune donnée personnelle non nécessaire.', 'Responsable interne de l’envoi et emplacement GED désignés.', 'Autorisation humaine de nomination enregistrée séparément.'],
    next: 'Prochain arbitrage humain : confirmer ou amender ces quatre profils, puis décider séparément si des destinataires nommés peuvent être inscrits. Aucun envoi automatique.',
    boundary: 'Limite : REC-001 ne nomme personne, ne recommande aucun fournisseur, n’autorise aucun contact, aucune transmission, aucun achat et aucune ouverture de L2.'
  },
  EN: {
    eyebrow: 'CANDIDATE RECIPIENT SHEET · REF-01-G1-REC-001 · V0.1 · 26 AUG 2026',
    title: 'Qualify recipients without recording a real name',
    intro: 'This sheet derives the required profiles from REQ-001 V1.0. It defines the capacities to verify before any nomination and contains no person, company, address or concrete channel.',
    counters: [['Candidate profiles', '4', 'One profile per confirmed package'], ['Real names recorded', '0', 'No identity published'], ['Authorised contacts', '0', 'Separate human authorisation'], ['Requests sent', '0', 'No trigger']],
    labels: { profile: 'Candidate recipient profile', qualification: 'Capacity to verify', channel: 'Admissible channel after authorisation', status: 'CANDIDATE PROFILE · NO NAME' },
    recipients: [
      ['REQ-A · Official documentation', 'Official service, publisher or contractual owner able to provide a dated and versioned source.', 'Authority over the documentation, verifiable provenance, no secret and matching scope.', 'Official page or authorised traceable professional contact.'],
      ['REQ-B · Technical evidence', 'Authorised internal IT owner or competent technical service able to produce a non-production report.', 'Explicit mandate, isolated environment, synthetic data, method and separated controller.', 'Authorised internal channel with governed DMS deposit.'],
      ['REQ-C · Costs and capacity', 'Official pricing service or professional contact authorised to provide a non-binding offer.', 'Dated price, currency, assumptions, validity, comparable scope and no commercial acceptance.', 'Official pricing source or authorised professional contact.'],
      ['REQ-D · Internal governance', 'Internal functions responsible for preparation, control, validation and retention.', 'Separated roles, verified rights, sensitivity, retention and DMS location defined.', 'Internal M3S/DMS workflow, with no external recipient.']
    ],
    checksTitle: 'Conditions before adding a real name',
    checks: ['Matching need and REQ package confirmed.', 'Professional capacity or internal function verified.', 'Authorised traceable channel limited to the purpose.', 'No unnecessary personal data.', 'Internal send owner and DMS location designated.', 'Separate human nomination authorisation recorded.'],
    next: 'Next human decision: confirm or amend these four profiles, then decide separately whether named recipients may be recorded. No automatic send.',
    boundary: 'Boundary: REC-001 names nobody, recommends no provider and authorises no contact, transmission, purchase or L2 opening.'
  },
  DE: {
    eyebrow: 'KANDIDATENBLATT EMPFÄNGER · REF-01-G1-REC-001 · V0.1 · 26.08.2026',
    title: 'Empfänger qualifizieren, ohne einen realen Namen zu erfassen',
    intro: 'Dieses Blatt leitet die nötigen Profile aus REQ-001 V1.0 ab. Es definiert die vor jeder Benennung zu prüfenden Eigenschaften und enthält keine Person, Firma, Adresse oder konkreten Kanal.',
    counters: [['Kandidatenprofile', '4', 'Ein Profil je bestätigtem Paket'], ['Erfasste reale Namen', '0', 'Keine Identität veröffentlicht'], ['Autorisierte Kontakte', '0', 'Getrennte menschliche Autorisierung'], ['Gesendete Anfragen', '0', 'Keine Auslösung']],
    labels: { profile: 'Kandidatenprofil Empfänger', qualification: 'Zu prüfende Eigenschaft', channel: 'Zulässiger Kanal nach Autorisierung', status: 'KANDIDATENPROFIL · KEIN NAME' },
    recipients: [
      ['REQ-A · Offizielle Dokumentation', 'Offizielle Stelle, Herausgeber oder Vertragsverantwortung, die eine datierte und versionierte Quelle liefern kann.', 'Befugnis für die Dokumentation, prüfbare Herkunft, kein Geheimnis und passender Umfang.', 'Offizielle Seite oder autorisierter nachvollziehbarer Fachkontakt.'],
      ['REQ-B · Technische Nachweise', 'Autorisierte interne IT-Verantwortung oder kompetente technische Stelle für einen Bericht ausserhalb der Produktion.', 'Ausdrückliches Mandat, isolierte Umgebung, synthetische Daten, Methode und getrennte Kontrolle.', 'Autorisierter interner Kanal mit gesteuerter DMS-Ablage.'],
      ['REQ-C · Kosten und Kapazität', 'Offizielle Preisstelle oder Fachkontakt, der eine unverbindliche Offerte mitteilen darf.', 'Datierter Preis, Währung, Annahmen, Gültigkeit, vergleichbarer Umfang und keine kommerzielle Annahme.', 'Offizielle Preisquelle oder autorisierter Fachkontakt.'],
      ['REQ-D · Interne Governance', 'Interne Funktionen für Vorbereitung, Kontrolle, Validierung und Aufbewahrung.', 'Getrennte Rollen, geprüfte Rechte, Sensibilität, Aufbewahrung und DMS-Ablage definiert.', 'Interner M3S-/DMS-Ablauf ohne externen Empfänger.']
    ],
    checksTitle: 'Bedingungen vor dem Ergänzen eines realen Namens',
    checks: ['Passender Bedarf und passendes REQ-Paket bestätigt.', 'Fachliche Eigenschaft oder interne Funktion geprüft.', 'Autorisierter nachvollziehbarer Kanal auf den Zweck begrenzt.', 'Keine unnötigen Personendaten.', 'Interne Versandverantwortung und DMS-Ablage bestimmt.', 'Getrennte menschliche Benennungsautorisierung dokumentiert.'],
    next: 'Nächster menschlicher Entscheid: diese vier Profile bestätigen oder ändern und danach getrennt entscheiden, ob benannte Empfänger erfasst werden dürfen. Kein automatischer Versand.',
    boundary: 'Grenze: REC-001 benennt niemanden, empfiehlt keinen Anbieter und autorisiert weder Kontakt, Übermittlung, Kauf noch L2-Öffnung.'
  }
};

const InstitutionalPeopleTeamsRecipientAuthorisationCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-recipient-candidate" className="m3s-ref01-g1-recipient-candidate mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-recipient-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-recipient-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ContactRound className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <ContactRound className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 divide-y divide-slate-700 rounded-md border border-slate-700">{t.recipients.map(([request, profile, qualification, channel]) => <article key={request} className="p-4" data-testid="ref01-g1-recipient-profile"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{request}</h6><span className="rounded-md border border-amber-700/70 bg-amber-950/20 px-2 py-1 text-[11px] font-semibold text-amber-100">{t.labels.status}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3"><div><dt className="text-xs font-semibold text-sky-300">{t.labels.profile}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{profile}</dd></div><div><dt className="text-xs font-semibold text-emerald-300">{t.labels.qualification}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{qualification}</dd></div><div><dt className="text-xs font-semibold text-violet-300">{t.labels.channel}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{channel}</dd></div></dl></article>)}</div>
      <section className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-4" aria-labelledby="ref01-g1-recipient-checks-title"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-recipient-checks-title" className="text-sm font-semibold text-amber-100">{t.checksTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.checks.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-recipient-check"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsRecipientAuthorisationCandidate;
