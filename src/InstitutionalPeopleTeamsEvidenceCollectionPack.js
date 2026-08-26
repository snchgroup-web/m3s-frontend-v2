import React from 'react';
import { AlertTriangle, Archive, ClipboardList, FileSearch, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PAQUET DE COLLECTE GOUVERNÉ · REF-01-G1-COL-001 · V1.0 · 26-08-2026',
    title: 'Encadrer la collecte contrôlée sans démarrer la consultation',
    intro: 'Ce paquet confirmé par REF-01-DEC-015 gouverne sept emplacements de collecte, leurs canaux admissibles, contrôles et responsabilités. Il n’autorise encore aucun destinataire nommé, contact, compte, essai, achat ou sélection.',
    counters: [['Périmètre confirmé', '7/7', 'Un emplacement par exigence'], ['Preuves reçues', '0', 'Collecte non démarrée'], ['Destinataires nommés', '0', 'Autorisation séparée'], ['Fournisseurs retenus', '0', 'Aucune sélection']],
    labels: { channel: 'Canal admissible gouverné', owner: 'Préparation et contrôle', control: 'Contrôle avant acceptation', status: 'CONFIRMÉ' },
    items: [
      ['1 · Chiffrement', 'Documentation officielle datée et, si autorisée, configuration expurgée.', 'IT & Support prépare ; Gouvernance contrôle ; GED conserve.', 'Refuser secret, clé, identifiant ou simple affirmation commerciale.'],
      ['2 · Sauvegarde automatique', 'Politique officielle et rapport non productif autorisé.', 'IT & Support prépare et teste ; GED conserve ; Gouvernance accepte les objectifs.', 'Fréquence, conservation, isolation, chiffrement, alertes et échecs doivent être explicites.'],
      ['3 · Restauration testée', 'Rapport interne daté sur données synthétiques uniquement.', 'IT exécute ; métier observe ; Gouvernance accepte ; GED conserve.', 'Refuser tout test de production ou toute donnée personnelle réelle.'],
      ['4 · Localisation et juridiction', 'Sources officielles contractuelles, région d’hébergement et sous-traitants.', 'Administration et Conformité instruisent ; IT confirme la topologie.', 'Aucune conclusion automatique de conformité ; questions juridiques séparées.'],
      ['5 · Coûts et capacité', 'Tarifs officiels et scénarios internes comparables avec devise, période et hypothèses.', 'IT dimensionne ; Finances contrôle ; Gouvernance arbitre.', 'Séparer coûts fixes et variables ; sourcer taux et hypothèses.'],
      ['6 · RPO et RTO', 'Proposition interne chiffrée reliée aux impacts et preuves techniques.', 'IT propose ; Organisation & RH décrit l’impact ; Gouvernance décide.', 'Refuser objectif non mesurable ou incompatible avec sauvegarde et restauration.'],
      ['7 · Responsables et GED', 'Matrice interne avec rôles, références GED, sensibilité, conservation et revue.', 'Administration, GED, IT et Gouvernance séparent préparation, contrôle et décision.', 'Chaque preuve doit avoir un identifiant stable et un accès autorisé.']
    ],
    workflowTitle: 'Séquence de collecte proposée',
    workflow: ['Autoriser le périmètre et les canaux.', 'Collecter chaque exigence séparément.', 'Enregistrer les dix métadonnées.', 'Contrôler indépendamment provenance, fraîcheur et contradictions.', 'Soumettre les résultats à une décision humaine distincte.'],
    refusalsTitle: 'Rejets obligatoires',
    refusals: ['Source ou version absente.', 'Document expiré ou contradictoire.', 'Secret, identifiant ou donnée personnelle réelle.', 'Promesse commerciale sans preuve contrôlable.', 'Pression pour choisir un fournisseur avant comparaison.'],
    verdict: 'PAQUET CONFIRMÉ · Sept emplacements gouvernés, zéro collecte, zéro destinataire nommé et zéro fournisseur retenu.',
    next: 'REQ-001 V1.0 gouverne le contenu, REC-001 V1.0 les profils, NAM-001 V1.0 les emplacements, AUT-001 V1.0 les autorisations et IDN-001 V0.1 la future fiche unitaire vide.',
    boundary: 'Limite : ce paquet n’est ni un appel d’offres, ni une demande envoyée, ni une sélection, ni un test, ni une ouverture de L2.'
  },
  EN: {
    eyebrow: 'GOVERNED COLLECTION PACKAGE · REF-01-G1-COL-001 · V1.0 · 26 AUG 2026', title: 'Govern controlled collection without starting consultation', intro: 'Confirmed through REF-01-DEC-015, this package governs seven collection slots, their admissible channels, controls and responsibilities. It authorises no named recipient, contact, account, trial, purchase or selection.',
    counters: [['Confirmed scope', '7/7', 'One slot per requirement'], ['Evidence received', '0', 'Collection not started'], ['Named recipients', '0', 'Separate authorisation'], ['Selected providers', '0', 'No selection']],
    labels: { channel: 'Governed admissible channel', owner: 'Preparation and control', control: 'Control before acceptance', status: 'CONFIRMED' },
    items: [
      ['1 · Encryption', 'Dated official documentation and, if authorised, redacted configuration.', 'IT & Support prepares; Governance controls; DMS retains.', 'Reject secrets, keys, identifiers or unsupported marketing claims.'],
      ['2 · Automated backup', 'Official policy and authorised non-production report.', 'IT & Support prepares and tests; DMS retains; Governance accepts objectives.', 'Frequency, retention, isolation, encryption, alerts and failures must be explicit.'],
      ['3 · Tested restoration', 'Dated internal report using synthetic data only.', 'IT executes; business observes; Governance accepts; DMS retains.', 'Reject any production test or real personal data.'],
      ['4 · Location and jurisdiction', 'Official contractual sources, hosting region and subprocessors.', 'Administration and Compliance investigate; IT confirms topology.', 'No automatic compliance conclusion; legal questions remain separate.'],
      ['5 · Costs and capacity', 'Official pricing and comparable internal scenarios with currency, period and assumptions.', 'IT sizes; Finance controls; Governance arbitrates.', 'Separate fixed and variable costs; source rates and assumptions.'],
      ['6 · RPO and RTO', 'Quantified internal proposal linked to impacts and technical evidence.', 'IT proposes; Organisation & HR describes impact; Governance decides.', 'Reject unmeasurable objectives or inconsistency with backup and restoration.'],
      ['7 · Owners and DMS', 'Internal matrix with roles, DMS references, sensitivity, retention and review.', 'Administration, DMS, IT and Governance separate preparation, control and decision.', 'Every item needs a stable identifier and authorised access.']
    ],
    workflowTitle: 'Proposed collection sequence', workflow: ['Authorise scope and channels.', 'Collect each requirement separately.', 'Record the ten metadata fields.', 'Independently check provenance, freshness and contradictions.', 'Submit results to a separate human decision.'],
    refusalsTitle: 'Mandatory rejections', refusals: ['Missing source or version.', 'Expired or contradictory record.', 'Secret, identifier or real personal data.', 'Marketing promise without controllable evidence.', 'Pressure to select a provider before comparison.'],
    verdict: 'PACKAGE CONFIRMED · Seven governed slots, zero collection, zero named recipients and zero selected providers.', next: 'REQ-001 V1.0 governs content, REC-001 V1.0 profiles, NAM-001 V1.0 slots, AUT-001 V1.0 authorisations and IDN-001 V0.1 the future empty individual record.', boundary: 'Boundary: this package is neither a request for proposal, sent request, selection, test nor L2 opening.'
  },
  DE: {
    eyebrow: 'GESTEUERTES SAMMLUNGSPAKET · REF-01-G1-COL-001 · V1.0 · 26.08.2026', title: 'Kontrollierte Sammlung steuern, ohne die Konsultation zu starten', intro: 'Mit REF-01-DEC-015 bestätigt, steuert dieses Paket sieben Sammelstellen, ihre zulässigen Kanäle, Kontrollen und Verantwortung. Es autorisiert keinen benannten Empfänger, Kontakt, Account, Test, Kauf oder Auswahl.',
    counters: [['Bestätigter Umfang', '7/7', 'Eine Stelle je Anforderung'], ['Erhaltene Nachweise', '0', 'Sammlung nicht gestartet'], ['Benannte Empfänger', '0', 'Getrennte Autorisierung'], ['Gewählte Anbieter', '0', 'Keine Auswahl']],
    labels: { channel: 'Gesteuerter zulässiger Kanal', owner: 'Vorbereitung und Kontrolle', control: 'Kontrolle vor Annahme', status: 'BESTÄTIGT' },
    items: [
      ['1 · Verschlüsselung', 'Datierte offizielle Dokumentation und, falls autorisiert, bereinigte Konfiguration.', 'IT & Support bereitet vor; Governance kontrolliert; DMS bewahrt.', 'Geheimnisse, Schlüssel, Kennungen oder unbelegte Werbung ablehnen.'],
      ['2 · Automatische Sicherung', 'Offizielle Regel und autorisierter Bericht ausserhalb der Produktion.', 'IT & Support bereitet vor und testet; DMS bewahrt; Governance akzeptiert Ziele.', 'Frequenz, Aufbewahrung, Trennung, Verschlüsselung, Warnungen und Fehler ausdrücklich.'],
      ['3 · Getestete Wiederherstellung', 'Datierter interner Bericht nur mit synthetischen Daten.', 'IT führt aus; Fachseite beobachtet; Governance akzeptiert; DMS bewahrt.', 'Produktionstests und reale Personendaten ablehnen.'],
      ['4 · Standort und Rechtsraum', 'Offizielle Vertragsquellen, Hostingregion und Unterauftragnehmer.', 'Administration und Compliance prüfen; IT bestätigt Topologie.', 'Keine automatische Konformitätsaussage; Rechtsfragen bleiben getrennt.'],
      ['5 · Kosten und Kapazität', 'Offizielle Preise und vergleichbare interne Szenarien mit Währung, Zeitraum und Annahmen.', 'IT dimensioniert; Finanzen kontrolliert; Governance entscheidet.', 'Fixe und variable Kosten trennen; Kurse und Annahmen belegen.'],
      ['6 · RPO und RTO', 'Bezifferter interner Vorschlag mit Auswirkungen und technischen Nachweisen.', 'IT schlägt vor; Organisation & Personal beschreibt Wirkung; Governance entscheidet.', 'Nicht messbare oder mit Sicherung und Restore unvereinbare Ziele ablehnen.'],
      ['7 · Verantwortung und DMS', 'Interne Matrix mit Rollen, DMS-Referenzen, Sensibilität, Aufbewahrung und Prüfung.', 'Administration, DMS, IT und Governance trennen Vorbereitung, Kontrolle und Entscheid.', 'Jeder Nachweis braucht eine stabile Kennung und autorisierten Zugriff.']
    ],
    workflowTitle: 'Vorgeschlagene Sammelfolge', workflow: ['Umfang und Kanäle autorisieren.', 'Jede Anforderung getrennt sammeln.', 'Zehn Metadaten erfassen.', 'Herkunft, Aktualität und Widersprüche unabhängig prüfen.', 'Ergebnisse einem getrennten menschlichen Entscheid vorlegen.'],
    refusalsTitle: 'Zwingende Ablehnungen', refusals: ['Quelle oder Version fehlt.', 'Abgelaufener oder widersprüchlicher Nachweis.', 'Geheimnis, Kennung oder reale Personendaten.', 'Werbeversprechen ohne kontrollierbaren Nachweis.', 'Druck zur Anbieterwahl vor dem Vergleich.'],
    verdict: 'PAKET BESTÄTIGT · Sieben gesteuerte Stellen, null Sammlung, null benannte Empfänger und null gewählte Anbieter.', next: 'REQ-001 V1.0 steuert Inhalt, REC-001 V1.0 Profile, NAM-001 V1.0 Stellen, AUT-001 V1.0 Autorisierungen und IDN-001 V0.1 die künftige leere Einzelakte.', boundary: 'Grenze: Dieses Paket ist weder Ausschreibung, versandte Anfrage, Auswahl, Test noch L2-Öffnung.'
  }
};

const InstitutionalPeopleTeamsEvidenceCollectionPack = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-evidence-collection" className="m3s-ref01-g1-evidence-collection mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-evidence-collection-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-evidence-collection-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ClipboardList className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index > 1 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <FileSearch className="text-violet-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, channel, owner, control]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-collection-slot"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{title}</h6><span className="ref01-g1-collection-status rounded-md border border-violet-700/70 bg-violet-950/25 px-2 py-1 text-[11px] font-semibold text-violet-100">{t.labels.status}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-300">{t.labels.channel}</dt><dd className="mt-1 text-slate-300">{channel}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.owner}</dt><dd className="mt-1 text-slate-300">{owner}</dd></div><div><dt className="font-semibold text-amber-300">{t.labels.control}</dt><dd className="mt-1 text-slate-300">{control}</dd></div></dl></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2"><section className="rounded-md border border-sky-800/70 bg-sky-950/15 p-4" aria-labelledby="ref01-g1-collection-workflow-title"><div className="flex items-center gap-2"><ShieldCheck className="text-sky-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-collection-workflow-title" className="text-sm font-semibold text-sky-100">{t.workflowTitle}</h6></div><ol className="mt-3 space-y-2">{t.workflow.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-collection-step"><span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-800 text-[11px] font-semibold text-sky-300">{index + 1}</span>{item}</li>)}</ol></section><section className="rounded-md border border-rose-800/70 bg-rose-950/15 p-4" aria-labelledby="ref01-g1-collection-refusals-title"><div className="flex items-center gap-2"><Archive className="text-rose-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-collection-refusals-title" className="text-sm font-semibold text-rose-100">{t.refusalsTitle}</h6></div><ul className="mt-3 space-y-2">{t.refusals.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-collection-refusal"><AlertTriangle className="mt-0.5 shrink-0 text-rose-300" size={14} aria-hidden="true" />{item}</li>)}</ul></section></div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEvidenceCollectionPack;
