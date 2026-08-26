import React from 'react';
import { AlertTriangle, ContactRound, FileCheck2, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE GOUVERNÉ D’AUTORISATION NOMINATIVE · REF-01-G1-AUT-001 · V1.0 · 27-08-2026',
    title: 'Gouverner chaque future autorisation séparément',
    intro: 'Confirmé par REF-01-DEC-019, ce registre applique NAM-001 V1.0 avec quatre dossiers d’autorisation confirmés qui restent vides. Une décision sur un dossier ne s’étend jamais aux autres et ne vaut pas autorisation d’envoi.',
    counters: [['Dossiers préparés', '4', 'Un par profil gouverné'], ['Identités proposées', '0', 'Aucun nom réel'], ['Autorisations accordées', '0', 'Décision unitaire requise'], ['Contacts ou envois', '0', 'Décision encore séparée']],
    labels: { scope: 'Portée du dossier', requirements: 'Éléments requis', status: 'DOSSIER CONFIRMÉ · VIDE' },
    records: [
      ['AUT-A · Documentation officielle', 'Une identité professionnelle candidate pour REQ-A uniquement.', 'Qualité officielle, source, finalité, données minimales, responsable interne, GED et expiration.'],
      ['AUT-B · Preuves techniques', 'Une fonction interne ou identité professionnelle candidate pour REQ-B uniquement.', 'Mandat, environnement isolé, données synthétiques, droits, contrôleur, GED et expiration.'],
      ['AUT-C · Coûts et capacité', 'Une identité professionnelle candidate pour REQ-C uniquement.', 'Qualité tarifaire, offre non engageante, devise, validité, canal, responsable et GED.'],
      ['AUT-D · Gouvernance interne', 'Une fonction ou responsabilité interne candidate pour REQ-D uniquement.', 'Mandat, séparation des rôles, droits, sensibilité, conservation, GED et révision.']
    ],
    controlsTitle: 'Six contrôles avant une décision nominative',
    controls: ['Lien unique vers le lot REQ et le profil REC.', 'Identité et qualité limitées au strict nécessaire.', 'Provenance et canal professionnel vérifiés.', 'Base d’autorisation et droits documentés.', 'Responsable, GED, conservation et expiration renseignés.', 'Décision nominative et autorisation d’envoi traitées séparément.'],
    next: 'IDN-001 V0.1 prépare désormais un gabarit unitaire vide ; son cadre doit être confirmé avant de choisir un dossier AUT ou d’inscrire une identité réelle.',
    boundary: 'Limite : AUT-001 V1.0 ne contient aucune identité et n’autorise aucun contact, envoi, compte, essai, achat, fournisseur, preuve réelle, fermeture de G1 ou ouverture de L2.'
  },
  EN: {
    eyebrow: 'GOVERNED NAMED-RECORD AUTHORISATION REGISTER · REF-01-G1-AUT-001 · V1.0 · 27 AUG 2026',
    title: 'Govern every future authorisation separately',
    intro: 'Confirmed through REF-01-DEC-019, this register applies NAM-001 V1.0 with four confirmed authorisation files that remain empty. A decision on one file never extends to another and does not authorise a send.',
    counters: [['Prepared files', '4', 'One per governed profile'], ['Proposed identities', '0', 'No real name'], ['Granted authorisations', '0', 'Individual decision required'], ['Contacts or sends', '0', 'Still a separate decision']],
    labels: { scope: 'File scope', requirements: 'Required elements', status: 'CONFIRMED FILE · EMPTY' },
    records: [
      ['AUT-A · Official documentation', 'One candidate professional identity for REQ-A only.', 'Official capacity, source, purpose, minimal data, internal owner, DMS and expiry.'],
      ['AUT-B · Technical evidence', 'One candidate internal function or professional identity for REQ-B only.', 'Mandate, isolated environment, synthetic data, rights, controller, DMS and expiry.'],
      ['AUT-C · Costs and capacity', 'One candidate professional identity for REQ-C only.', 'Pricing capacity, non-binding offer, currency, validity, channel, owner and DMS.'],
      ['AUT-D · Internal governance', 'One candidate internal function or responsibility for REQ-D only.', 'Mandate, separated roles, rights, sensitivity, retention, DMS and review.']
    ],
    controlsTitle: 'Six controls before a named decision',
    controls: ['Unique link to the REQ package and REC profile.', 'Identity and capacity limited to what is necessary.', 'Provenance and professional channel verified.', 'Authorisation basis and rights documented.', 'Owner, DMS, retention and expiry recorded.', 'Named decision and send authorisation handled separately.'],
    next: 'IDN-001 V0.1 now prepares an empty individual template; its framework must be confirmed before selecting an AUT file or recording any real identity.',
    boundary: 'Boundary: AUT-001 V1.0 contains no identity and authorises no contact, send, account, trial, purchase, provider, real evidence, G1 closure or L2 opening.'
  },
  DE: {
    eyebrow: 'GESTEUERTES REGISTER FÜR NAMENSAUTORISIERUNGEN · REF-01-G1-AUT-001 · V1.0 · 27.08.2026',
    title: 'Jede künftige Autorisierung getrennt steuern',
    intro: 'Mit REF-01-DEC-019 bestätigt, wendet dieses Register NAM-001 V1.0 mit vier bestätigten, weiterhin leeren Autorisierungsakten an. Ein Entscheid für eine Akte gilt nie für eine andere und autorisiert keinen Versand.',
    counters: [['Vorbereitete Dossiers', '4', 'Eines je gesteuertem Profil'], ['Vorgeschlagene Identitäten', '0', 'Kein realer Name'], ['Erteilte Autorisierungen', '0', 'Einzelentscheid erforderlich'], ['Kontakte oder Versand', '0', 'Weiterhin getrennter Entscheid']],
    labels: { scope: 'Umfang des Dossiers', requirements: 'Erforderliche Elemente', status: 'BESTÄTIGTE AKTE · LEER' },
    records: [
      ['AUT-A · Offizielle Dokumentation', 'Eine berufliche Kandidatenidentität nur für REQ-A.', 'Offizielle Eigenschaft, Quelle, Zweck, minimale Daten, interne Verantwortung, DMS und Ablauf.'],
      ['AUT-B · Technische Nachweise', 'Eine interne Funktion oder berufliche Kandidatenidentität nur für REQ-B.', 'Mandat, isolierte Umgebung, synthetische Daten, Rechte, Kontrolle, DMS und Ablauf.'],
      ['AUT-C · Kosten und Kapazität', 'Eine berufliche Kandidatenidentität nur für REQ-C.', 'Preiseigenschaft, unverbindliche Offerte, Währung, Gültigkeit, Kanal, Verantwortung und DMS.'],
      ['AUT-D · Interne Governance', 'Eine interne Funktion oder Verantwortung nur für REQ-D.', 'Mandat, Rollentrennung, Rechte, Sensibilität, Aufbewahrung, DMS und Prüfung.']
    ],
    controlsTitle: 'Sechs Kontrollen vor einem Namensentscheid',
    controls: ['Eindeutige Verbindung zu REQ-Paket und REC-Profil.', 'Identität und Eigenschaft auf das Notwendige begrenzt.', 'Herkunft und Fachkanal geprüft.', 'Autorisierungsgrundlage und Rechte dokumentiert.', 'Verantwortung, DMS, Aufbewahrung und Ablauf erfasst.', 'Namensentscheid und Versandautorisierung getrennt behandelt.'],
    next: 'IDN-001 V0.1 bereitet nun eine leere Einzelvorlage vor; ihr Rahmen muss bestätigt werden, bevor eine AUT-Akte gewählt oder eine reale Identität erfasst wird.',
    boundary: 'Grenze: AUT-001 V1.0 enthält keine Identität und autorisiert weder Kontakt, Versand, Account, Test, Kauf, Anbieter, reale Nachweise, G1-Schliessung noch L2-Öffnung.'
  }
};

const InstitutionalPeopleTeamsNamedRecordAuthorisationCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-named-record-authorisation-candidate" className="m3s-ref01-g1-named-record-authorisation-candidate mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-named-record-authorisation-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-named-record-authorisation-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileCheck2 className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileCheck2 className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 divide-y divide-slate-700 rounded-md border border-slate-700">{t.records.map(([record, scope, requirements]) => <article key={record} className="p-4" data-testid="ref01-g1-named-authorisation-file"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{record}</h6><span className="rounded-md border border-rose-700/70 bg-rose-950/20 px-2 py-1 text-[11px] font-semibold text-rose-200">{t.labels.status}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2"><div><dt className="text-xs font-semibold text-sky-300">{t.labels.scope}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{scope}</dd></div><div><dt className="text-xs font-semibold text-emerald-300">{t.labels.requirements}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{requirements}</dd></div></dl></article>)}</div>
      <section className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-4" aria-labelledby="ref01-g1-named-authorisation-checks-title"><div className="flex items-center gap-2"><ContactRound className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-named-authorisation-checks-title" className="text-sm font-semibold text-amber-100">{t.controlsTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.controls.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-named-authorisation-check"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsNamedRecordAuthorisationCandidate;
