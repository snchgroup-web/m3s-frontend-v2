import React from 'react';
import { AlertTriangle, FileOutput, LockKeyhole, Send, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE CONFIRMÉE DE SOLLICITATION · REF-01-G1-REQ-001 · V1.0 · 26-08-2026',
    title: 'Structurer les demandes confirmées sans contacter un destinataire',
    intro: 'Confirmée par REF-01-DEC-016, cette fiche organise les demandes nécessaires aux sept preuves. Elle ne contient aucun fournisseur, aucune adresse, aucune date d’envoi et ne déclenche aucune communication.',
    counters: [['Lots de demande', '4', 'Trois externes candidats, un interne'], ['Destinataires nommés', '0', 'Aucun contact autorisé'], ['Demandes envoyées', '0', 'Préparation uniquement'], ['Preuves reçues', '0', 'Aucune acceptation']],
    labels: { purpose: 'Objet confirmé', content: 'Contenu minimal', owner: 'Fonctions responsables', status: 'CONTENU CONFIRMÉ · ENVOI INTERDIT' },
    requests: [
      ['REQ-A · Documentation officielle', 'Obtenir les versions datées sur chiffrement, sauvegarde, région d’hébergement et sous-traitants.', 'Référence, version, date, URL officielle ou pièce contractuelle expurgée.', 'IT & Support prépare ; Administration/Conformité contrôle ; GED conserve.'],
      ['REQ-B · Preuves techniques', 'Obtenir ou produire un rapport non productif sur restauration, alertes, RPO et RTO.', 'Scénario synthétique, date, résultat, écart, auteur, contrôleur et référence GED.', 'IT & Support exécute ; métier observe ; Gouvernance accepte les objectifs.'],
      ['REQ-C · Coûts et capacité', 'Obtenir des tarifs comparables sans achat ni engagement.', 'Devise, période, hypothèses, limites, coûts fixes et variables, validité.', 'IT dimensionne ; Finances contrôle ; Gouvernance arbitre.'],
      ['REQ-D · Gouvernance interne', 'Finaliser responsables, sensibilité, conservation, revue et emplacements GED.', 'Identifiants stables, rôles séparés, droits, durée et prochaine revue.', 'Administration coordonne ; GED conserve ; Gouvernance valide.']
    ],
    preflightTitle: 'Contrôle obligatoire avant tout envoi',
    preflight: ['Destinataire nommé et qualité vérifiés.', 'Canal autorisé et traçable.', 'Demande limitée à une seule finalité.', 'Aucun secret ni donnée personnelle réelle.', 'Délai et emplacement GED renseignés.', 'Autorisation humaine d’envoi enregistrée séparément.'],
    next: 'REF-01-G1-REC-001 V1.0 gouverne les profils destinataires ; REF-01-G1-NAM-001 V0.1 prépare quatre emplacements vides sans autoriser de nom ni d’envoi.',
    boundary: 'Limite : REQ-001 V1.0 gouverne le contenu, pas l’émission. Ce n’est ni une consultation lancée, ni un appel d’offres, ni une sélection, ni une autorisation d’achat, de test ou d’ouverture de L2.'
  },
  EN: {
    eyebrow: 'CONFIRMED REQUEST SHEET · REF-01-G1-REQ-001 · V1.0 · 26 AUG 2026',
    title: 'Structure confirmed requests without contacting a recipient',
    intro: 'Confirmed through REF-01-DEC-016, this sheet organises the requests needed for the seven evidence items. It contains no provider, address or send date and triggers no communication.',
    counters: [['Request packages', '4', 'Three external candidates, one internal'], ['Named recipients', '0', 'No contact authorised'], ['Requests sent', '0', 'Preparation only'], ['Evidence received', '0', 'No acceptance']],
    labels: { purpose: 'Confirmed purpose', content: 'Minimum content', owner: 'Responsible functions', status: 'CONTENT CONFIRMED · SEND FORBIDDEN' },
    requests: [
      ['REQ-A · Official documentation', 'Obtain dated versions for encryption, backup, hosting region and subprocessors.', 'Reference, version, date, official URL or redacted contractual record.', 'IT & Support prepares; Administration/Compliance controls; DMS retains.'],
      ['REQ-B · Technical evidence', 'Obtain or produce a non-production report on restoration, alerts, RPO and RTO.', 'Synthetic scenario, date, result, gap, author, controller and DMS reference.', 'IT & Support executes; business observes; Governance accepts objectives.'],
      ['REQ-C · Costs and capacity', 'Obtain comparable pricing without purchase or commitment.', 'Currency, period, assumptions, limits, fixed and variable costs, validity.', 'IT sizes; Finance controls; Governance arbitrates.'],
      ['REQ-D · Internal governance', 'Complete owners, sensitivity, retention, review and DMS locations.', 'Stable identifiers, separated roles, rights, duration and next review.', 'Administration coordinates; DMS retains; Governance validates.']
    ],
    preflightTitle: 'Mandatory control before any send',
    preflight: ['Named recipient and capacity verified.', 'Authorised traceable channel.', 'Request limited to one purpose.', 'No secret or real personal data.', 'Due date and DMS location recorded.', 'Separate human release authorisation recorded.'],
    next: 'REF-01-G1-REC-001 V1.0 governs recipient profiles; REF-01-G1-NAM-001 V0.1 prepares four empty slots without authorising a name or send.',
    boundary: 'Boundary: REQ-001 V1.0 governs content, not release. It is neither a launched consultation, request for proposal, selection, purchase authorisation, test nor L2 opening.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTES ANFRAGEBLATT · REF-01-G1-REQ-001 · V1.0 · 26.08.2026',
    title: 'Bestätigte Anfragen ordnen, ohne Empfänger zu kontaktieren',
    intro: 'Mit REF-01-DEC-016 bestätigt, ordnet dieses Blatt die für sieben Nachweise nötigen Anfragen. Es enthält weder Anbieter, Adresse noch Versanddatum und löst keine Kommunikation aus.',
    counters: [['Anfragepakete', '4', 'Drei externe Kandidaten, eines intern'], ['Benannte Empfänger', '0', 'Kein Kontakt autorisiert'], ['Gesendete Anfragen', '0', 'Nur Vorbereitung'], ['Erhaltene Nachweise', '0', 'Keine Annahme']],
    labels: { purpose: 'Bestätigter Zweck', content: 'Mindestinhalt', owner: 'Verantwortliche Funktionen', status: 'INHALT BESTÄTIGT · VERSAND VERBOTEN' },
    requests: [
      ['REQ-A · Offizielle Dokumentation', 'Datierte Versionen zu Verschlüsselung, Sicherung, Hostingregion und Unterauftragnehmern beschaffen.', 'Referenz, Version, Datum, offizielle URL oder bereinigte Vertragsunterlage.', 'IT & Support bereitet vor; Administration/Compliance kontrolliert; DMS bewahrt.'],
      ['REQ-B · Technische Nachweise', 'Bericht ausserhalb der Produktion zu Restore, Warnungen, RPO und RTO beschaffen oder erstellen.', 'Synthetisches Szenario, Datum, Ergebnis, Abweichung, Autor, Kontrolle und DMS-Referenz.', 'IT & Support führt aus; Fachseite beobachtet; Governance akzeptiert Ziele.'],
      ['REQ-C · Kosten und Kapazität', 'Vergleichbare Preise ohne Kauf oder Verpflichtung beschaffen.', 'Währung, Zeitraum, Annahmen, Grenzen, fixe und variable Kosten, Gültigkeit.', 'IT dimensioniert; Finanzen kontrolliert; Governance entscheidet.'],
      ['REQ-D · Interne Governance', 'Verantwortung, Sensibilität, Aufbewahrung, Prüfung und DMS-Ablage vervollständigen.', 'Stabile Kennungen, getrennte Rollen, Rechte, Dauer und nächste Prüfung.', 'Administration koordiniert; DMS bewahrt; Governance validiert.']
    ],
    preflightTitle: 'Pflichtkontrolle vor jedem Versand',
    preflight: ['Benannter Empfänger und Funktion geprüft.', 'Autorisierter nachvollziehbarer Kanal.', 'Anfrage auf einen Zweck begrenzt.', 'Kein Geheimnis und keine realen Personendaten.', 'Frist und DMS-Ablage erfasst.', 'Getrennte menschliche Versandfreigabe dokumentiert.'],
    next: 'REF-01-G1-REC-001 V1.0 steuert Empfängerprofile; REF-01-G1-NAM-001 V0.1 bereitet vier leere Stellen vor, ohne Namen oder Versand zu autorisieren.',
    boundary: 'Grenze: REQ-001 V1.0 steuert den Inhalt, nicht den Versand. Es ist weder gestartete Konsultation, Ausschreibung, Auswahl, Kaufautorisierung, Test noch L2-Öffnung.'
  }
};

const InstitutionalPeopleTeamsExternalRequestCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-external-request" className="m3s-ref01-g1-external-request mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-external-request-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-external-request-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileOutput className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <FileOutput className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 divide-y divide-slate-700 rounded-md border border-slate-700">{t.requests.map(([title, purpose, content, owner]) => <article key={title} className="p-4" data-testid="ref01-g1-request-package"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{title}</h6><span className="ref01-g1-request-status rounded-md border border-rose-700/70 bg-rose-950/20 px-2 py-1 text-[11px] font-semibold text-rose-100">{t.labels.status}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3"><div><dt className="text-xs font-semibold text-sky-300">{t.labels.purpose}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{purpose}</dd></div><div><dt className="text-xs font-semibold text-violet-300">{t.labels.content}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{content}</dd></div><div><dt className="text-xs font-semibold text-emerald-300">{t.labels.owner}</dt><dd className="mt-1 text-xs leading-5 text-slate-300">{owner}</dd></div></dl></article>)}</div>
      <section className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-4" aria-labelledby="ref01-g1-request-preflight-title"><div className="flex items-center gap-2"><ShieldCheck className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-request-preflight-title" className="text-sm font-semibold text-amber-100">{t.preflightTitle}</h6></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.preflight.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-request-preflight"><Send className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section>
      <p className="mt-4 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsExternalRequestCandidate;
