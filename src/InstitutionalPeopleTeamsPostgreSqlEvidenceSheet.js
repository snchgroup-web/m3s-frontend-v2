import React from 'react';
import {
  AlertTriangle,
  Archive,
  Banknote,
  CheckCircle2,
  Clock3,
  DatabaseBackup,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  MapPinned,
  RotateCcw,
  UsersRound
} from 'lucide-react';

const STATUS_STYLES = {
  open: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  partial: 'border-sky-700/70 bg-sky-950/25 text-sky-100'
};

const COPY = {
  FR: {
    eyebrow: 'FICHE GOUVERNEE DU POINT 1 · REF-01-G1-EVD-001 · V1.0 · 26-08-2026',
    title: 'Encadrer les sept preuves sans choisir de service',
    intro: 'Cette fiche confirmée par REF-01-DEC-014 traduit l’amendement REF-01-DEC-013 en contrôles documentaires. Elle définit ce qui devra être remis, accepté et conservé avant une confirmation séparée du point PostgreSQL/restauration. Elle ne collecte encore aucune offre et ne valide aucun fournisseur.',
    counters: [['Exigences définies', '7', 'Issues de REF-01-DEC-013'], ['Dossiers complets', '0', 'Aucune preuve reçue'], ['Fournisseurs retenus', '0', 'Aucune sélection autorisée'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { proof: 'Preuve attendue', acceptance: 'Critère d’acceptation', owner: 'Responsables candidats' },
    statuses: { open: 'PREUVE A ETABLIR', partial: 'CADRAGE PARTIEL' },
    items: [
      { title: '1 · Chiffrement au repos et en transit', status: 'open', proof: 'Description versionnée des mécanismes, protocoles, responsabilités de clés et paramètres autorisés, accompagnée d’une preuve officielle ou d’une configuration expurgée.', acceptance: 'Stockage et transport couverts ; propriétaire des clés, rotation, exceptions et contrôle nommés.', owner: 'IT & Support prépare et contrôle ; Management & Gouvernance approuve ; la GED conserve la preuve autorisée.' },
      { title: '2 · Sauvegarde automatique et fréquence', status: 'open', proof: 'Politique documentée indiquant fréquence, conservation, chiffrement, isolation, surveillance et traitement des échecs.', acceptance: 'Plan automatique explicite, durée de conservation, alerte, responsable et preuve d’exécution sur environnement non productif.', owner: 'IT & Support prépare et teste ; la GED conserve la politique et les rapports ; Gouvernance autorise les objectifs.' },
      { title: '3 · Restauration effectivement testée', status: 'open', proof: 'Rapport daté d’un essai sur données synthétiques : environnement, sauvegarde utilisée, durée, contrôles d’intégrité, résultat et anomalies.', acceptance: 'Restauration achevée, intégrité vérifiée, écarts consignés et aucun recours à des données personnelles réelles.', owner: 'IT & Support exécute ; le responsable métier observe l’impact ; la GED conserve le rapport ; Gouvernance accepte le résultat.' },
      { title: '4 · Localisation et juridiction des données', status: 'open', proof: 'Région d’hébergement, opérateur, sous-traitants, flux transfrontaliers et conditions contractuelles, avec source officielle datée et versionnée.', acceptance: 'Localisation explicite, chaîne de traitement identifiable et questions juridiques soumises à la fonction compétente sans conclusion automatique de conformité.', owner: 'Administration et Conformité instruisent ; IT confirme la topologie ; Gouvernance décide ; la GED conserve les sources.' },
      { title: '5 · Coûts et hypothèses de capacité', status: 'open', proof: 'Scénarios comparables couvrant stockage, calcul, sauvegardes, trafic, support, croissance, devise, période et hypothèses.', acceptance: 'Unités et périmètres comparables, coûts fixes et variables séparés, taux de change sourcé et hypothèses de capacité explicites.', owner: 'IT & Support dimensionne ; Finances contrôle coûts et devises ; Management & Gouvernance arbitre.' },
      { title: '6 · RPO et RTO proposés', status: 'open', proof: 'Propositions chiffrées reliées aux impacts métier, à la fréquence des sauvegardes, à la méthode de mesure et aux scénarios de panne.', acceptance: 'RPO et RTO mesurables, compatibles avec les preuves de sauvegarde et restauration, puis acceptés séparément par le métier et la gouvernance.', owner: 'IT & Support propose ; Organisation & RH décrit l’impact métier ; Management & Gouvernance valide les objectifs.' },
      { title: '7 · Responsables de contrôle et preuve GED', status: 'partial', proof: 'Matrice nommant préparateur, contrôleur, validateur et décideur, avec identifiants GED, sensibilité, durée de conservation et date de revue.', acceptance: 'Chaque exigence dispose d’un responsable, d’une séparation des contrôles et d’une référence GED stable et autorisée.', owner: 'Le cadre général IT, GED et Gouvernance est confirmé ; les affectations précises et références GED restent à établir.' }
    ],
    metadataTitle: 'Métadonnées obligatoires pour chaque preuve',
    metadataIntro: 'Une pièce sans provenance, version ou responsable reste non vérifiable et ne peut pas fermer le point 1.',
    metadata: ['Identifiant stable', 'Titre et objet', 'Source ou émetteur', 'Date et version', 'Responsable de préparation', 'Contrôleur et validateur', 'Sensibilité', 'Environnement et données utilisées', 'Durée de validité ou fraîcheur', 'Référence GED et réserves'],
    gateTitle: 'Porte de confirmation du point 1',
    gateBody: 'Le point PostgreSQL/restauration ne pourra être soumis à confirmation que lorsque les sept preuves auront une source, un responsable, un critère accepté et une référence GED contrôlée. Un dossier incomplet, expiré ou contradictoire maintient G1 ouverte.',
    verdict: 'FICHE CONFIRMEE · Sept exigences gouvernées, zéro preuve reçue, zéro fournisseur retenu et L2 fermé.',
    next: 'COL-001 V1.0 gouverne la collecte, REQ-001 V1.0 les demandes, REC-001 V1.0 les profils, NAM-001 V1.0 les emplacements et AUT-001 V0.1 les autorisations unitaires.',
    boundary: 'Limite : cette fiche ne vaut ni appel d’offres, ni choix de fournisseur, ni budget, ni avis juridique, ni configuration, ni sauvegarde active, ni test de production, ni ouverture de L2.'
  },
  EN: {
    eyebrow: 'POINT 1 GOVERNED EVIDENCE SHEET · REF-01-G1-EVD-001 · V1.0 · 26 AUG 2026',
    title: 'Govern the seven evidence items without selecting a service',
    intro: 'This sheet, confirmed through REF-01-DEC-014, translates the REF-01-DEC-013 amendment into documentary controls. It defines what must be submitted, accepted and retained before separate confirmation of the PostgreSQL/restoration point. It collects no offer and validates no provider.',
    counters: [['Defined requirements', '7', 'Derived from REF-01-DEC-013'], ['Complete packages', '0', 'No evidence received'], ['Selected providers', '0', 'No selection authorised'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { proof: 'Expected evidence', acceptance: 'Acceptance criterion', owner: 'Candidate owners' },
    statuses: { open: 'EVIDENCE TO ESTABLISH', partial: 'PARTIAL FRAMING' },
    items: [
      { title: '1 · Encryption at rest and in transit', status: 'open', proof: 'Versioned description of mechanisms, protocols, key responsibilities and authorised settings, with official evidence or a redacted configuration.', acceptance: 'Storage and transport covered; key owner, rotation, exceptions and control named.', owner: 'IT & Support prepares and controls; Management & Governance approves; the DMS retains authorised evidence.' },
      { title: '2 · Automated backup and frequency', status: 'open', proof: 'Documented policy covering frequency, retention, encryption, isolation, monitoring and failure handling.', acceptance: 'Explicit automated plan, retention period, alert, owner and non-production execution evidence.', owner: 'IT & Support prepares and tests; the DMS retains policy and reports; Governance authorises objectives.' },
      { title: '3 · Effectively tested restoration', status: 'open', proof: 'Dated report of a synthetic-data test: environment, backup used, duration, integrity checks, result and anomalies.', acceptance: 'Restore completed, integrity verified, gaps recorded and no real personal data used.', owner: 'IT & Support executes; the business owner observes impact; the DMS retains the report; Governance accepts the result.' },
      { title: '4 · Data location and jurisdiction', status: 'open', proof: 'Hosting region, operator, subprocessors, cross-border flows and contractual terms, with dated and versioned official sources.', acceptance: 'Explicit location, identifiable processing chain and legal questions submitted to the competent function without an automatic compliance conclusion.', owner: 'Administration and Compliance investigate; IT confirms topology; Governance decides; the DMS retains sources.' },
      { title: '5 · Costs and capacity assumptions', status: 'open', proof: 'Comparable scenarios covering storage, compute, backups, traffic, support, growth, currency, period and assumptions.', acceptance: 'Comparable units and scopes, separated fixed and variable costs, sourced exchange rate and explicit capacity assumptions.', owner: 'IT & Support sizes; Finance controls costs and currencies; Management & Governance arbitrates.' },
      { title: '6 · Proposed RPO and RTO', status: 'open', proof: 'Quantified proposals linked to business impact, backup frequency, measurement method and outage scenarios.', acceptance: 'Measurable RPO and RTO consistent with backup and restore evidence, then separately accepted by business and governance.', owner: 'IT & Support proposes; Organisation & HR describes business impact; Management & Governance validates objectives.' },
      { title: '7 · Control owners and DMS evidence', status: 'partial', proof: 'Matrix naming preparer, controller, validator and decision-maker, with DMS identifiers, sensitivity, retention and review date.', acceptance: 'Every requirement has an owner, segregated control and a stable authorised DMS reference.', owner: 'The general IT, DMS and Governance framework is confirmed; exact assignments and DMS references remain to establish.' }
    ],
    metadataTitle: 'Mandatory metadata for every evidence item', metadataIntro: 'An item without provenance, version or owner remains unverifiable and cannot close point 1.',
    metadata: ['Stable identifier', 'Title and purpose', 'Source or issuer', 'Date and version', 'Preparation owner', 'Controller and validator', 'Sensitivity', 'Environment and data used', 'Validity or freshness period', 'DMS reference and reservations'],
    gateTitle: 'Point 1 confirmation gate', gateBody: 'The PostgreSQL/restoration point may be submitted for confirmation only when all seven evidence items have a source, an owner, an accepted criterion and a controlled DMS reference. An incomplete, expired or contradictory package keeps G1 open.',
    verdict: 'SHEET CONFIRMED · Seven governed requirements, zero evidence received, zero selected providers and L2 closed.',
    next: 'COL-001 V1.0 governs collection, REQ-001 V1.0 requests, REC-001 V1.0 profiles, NAM-001 V1.0 slots and AUT-001 V0.1 individual authorisations.',
    boundary: 'Boundary: this sheet is neither a request for proposal, provider choice, budget, legal opinion, configuration, active backup, production test nor L2 opening.'
  },
  DE: {
    eyebrow: 'GESTEUERTES NACHWEISBLATT PUNKT 1 · REF-01-G1-EVD-001 · V1.0 · 26.08.2026',
    title: 'Sieben Nachweise steuern, ohne einen Dienst auszuwählen',
    intro: 'Dieses mit REF-01-DEC-014 bestätigte Blatt übersetzt die Änderung REF-01-DEC-013 in Dokumentationskontrollen. Es definiert, was vor der getrennten Bestätigung des PostgreSQL-/Restore-Punkts einzureichen, anzunehmen und aufzubewahren ist. Es sammelt kein Angebot und validiert keinen Anbieter.',
    counters: [['Definierte Anforderungen', '7', 'Aus REF-01-DEC-013'], ['Vollständige Dossiers', '0', 'Keine Nachweise erhalten'], ['Gewählte Anbieter', '0', 'Keine Auswahl autorisiert'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { proof: 'Erwarteter Nachweis', acceptance: 'Annahmekriterium', owner: 'Kandidatenverantwortung' },
    statuses: { open: 'NACHWEIS ZU ERSTELLEN', partial: 'TEILRAHMEN' },
    items: [
      { title: '1 · Verschlüsselung bei Speicherung und Übertragung', status: 'open', proof: 'Versionierte Beschreibung von Mechanismen, Protokollen, Schlüsselverantwortung und erlaubten Einstellungen mit offiziellem Nachweis oder bereinigter Konfiguration.', acceptance: 'Speicherung und Transport abgedeckt; Schlüsselverantwortung, Rotation, Ausnahmen und Kontrolle benannt.', owner: 'IT & Support erstellt und kontrolliert; Management & Governance genehmigt; das DMS bewahrt den autorisierten Nachweis.' },
      { title: '2 · Automatische Sicherung und Frequenz', status: 'open', proof: 'Dokumentierte Regel zu Frequenz, Aufbewahrung, Verschlüsselung, Trennung, Überwachung und Fehlerbehandlung.', acceptance: 'Expliziter automatischer Plan, Aufbewahrungsdauer, Warnung, Verantwortung und Ausführungsnachweis ausserhalb der Produktion.', owner: 'IT & Support erstellt und testet; das DMS bewahrt Regel und Berichte; Governance autorisiert Ziele.' },
      { title: '3 · Tatsächlich getestete Wiederherstellung', status: 'open', proof: 'Datierter Bericht eines Tests mit synthetischen Daten: Umgebung, Sicherung, Dauer, Integritätskontrollen, Ergebnis und Abweichungen.', acceptance: 'Restore abgeschlossen, Integrität geprüft, Abweichungen erfasst und keine realen Personendaten verwendet.', owner: 'IT & Support führt aus; Fachverantwortung beobachtet Wirkung; DMS bewahrt Bericht; Governance akzeptiert Ergebnis.' },
      { title: '4 · Datenstandort und Rechtsraum', status: 'open', proof: 'Hostingregion, Betreiber, Unterauftragnehmer, grenzüberschreitende Flüsse und Vertragsbedingungen mit datierten offiziellen Quellen.', acceptance: 'Standort ausdrücklich, Verarbeitungskette erkennbar und Rechtsfragen ohne automatische Konformitätsaussage der zuständigen Funktion vorgelegt.', owner: 'Administration und Compliance prüfen; IT bestätigt Topologie; Governance entscheidet; DMS bewahrt Quellen.' },
      { title: '5 · Kosten und Kapazitätsannahmen', status: 'open', proof: 'Vergleichbare Szenarien zu Speicher, Rechenleistung, Sicherung, Verkehr, Support, Wachstum, Währung, Zeitraum und Annahmen.', acceptance: 'Vergleichbare Einheiten und Umfänge, getrennte fixe und variable Kosten, belegter Wechselkurs und ausdrückliche Kapazitätsannahmen.', owner: 'IT & Support dimensioniert; Finanzen kontrolliert Kosten und Währungen; Management & Governance entscheidet.' },
      { title: '6 · Vorgeschlagene RPO und RTO', status: 'open', proof: 'Bezifferte Vorschläge mit Fachauswirkung, Sicherungsfrequenz, Messmethode und Ausfallszenarien.', acceptance: 'Messbare RPO und RTO im Einklang mit Sicherungs- und Restore-Nachweisen, danach getrennt durch Fachseite und Governance akzeptiert.', owner: 'IT & Support schlägt vor; Organisation & Personal beschreibt Fachauswirkung; Management & Governance validiert Ziele.' },
      { title: '7 · Kontrollverantwortung und DMS-Nachweis', status: 'partial', proof: 'Matrix mit Ersteller, Kontrolle, Validierung und Entscheid sowie DMS-Kennungen, Sensibilität, Aufbewahrung und Prüfdatum.', acceptance: 'Jede Anforderung hat Verantwortung, getrennte Kontrolle und eine stabile autorisierte DMS-Referenz.', owner: 'Der allgemeine Rahmen für IT, DMS und Governance ist bestätigt; genaue Zuweisungen und DMS-Referenzen fehlen noch.' }
    ],
    metadataTitle: 'Pflichtmetadaten für jeden Nachweis', metadataIntro: 'Ein Element ohne Herkunft, Version oder Verantwortung bleibt nicht prüfbar und kann Punkt 1 nicht schliessen.',
    metadata: ['Stabile Kennung', 'Titel und Zweck', 'Quelle oder Aussteller', 'Datum und Version', 'Erstellungsverantwortung', 'Kontrolle und Validierung', 'Sensibilität', 'Umgebung und verwendete Daten', 'Gültigkeit oder Aktualität', 'DMS-Referenz und Vorbehalte'],
    gateTitle: 'Bestätigungstor für Punkt 1', gateBody: 'Der PostgreSQL-/Restore-Punkt darf erst bestätigt werden, wenn alle sieben Nachweise eine Quelle, Verantwortung, ein angenommenes Kriterium und eine kontrollierte DMS-Referenz haben. Ein unvollständiges, abgelaufenes oder widersprüchliches Dossier hält G1 offen.',
    verdict: 'BLATT BESTÄTIGT · Sieben gesteuerte Anforderungen, null Nachweise, null Anbieter und L2 geschlossen.',
    next: 'COL-001 V1.0 steuert Sammlung, REQ-001 V1.0 Anfragen, REC-001 V1.0 Profile, NAM-001 V1.0 Stellen und AUT-001 V0.1 Einzelautorisierungen.',
    boundary: 'Grenze: Dieses Blatt ist weder Ausschreibung, Anbieterwahl, Budget, Rechtsgutachten, Konfiguration, aktive Sicherung, Produktionstest noch L2-Öffnung.'
  }
};

const ITEM_ICONS = [KeyRound, DatabaseBackup, RotateCcw, MapPinned, Banknote, Clock3, UsersRound];

const InstitutionalPeopleTeamsPostgreSqlEvidenceSheet = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-evidence" className="m3s-ref01-g1-evidence mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-evidence-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-evidence-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><FileCheck2 className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index > 1 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <FileCheck2 className="text-sky-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map((item, index) => { const Icon = ITEM_ICONS[index]; return <article key={item.title} className="m3s-raised p-4" data-testid="ref01-g1-evidence-item"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-sky-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{item.title}</h6></div><span className={`ref01-g1-evidence-status--${item.status} rounded-md border px-2 py-1 text-[11px] font-semibold ${STATUS_STYLES[item.status]}`}>{t.statuses[item.status]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-300">{t.labels.proof}</dt><dd className="mt-1 text-slate-300">{item.proof}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.acceptance}</dt><dd className="mt-1 text-slate-300">{item.acceptance}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.owner}</dt><dd className="mt-1 text-slate-300">{item.owner}</dd></div></dl></article>; })}</div>

      <section className="mt-4 rounded-md border border-slate-700 bg-slate-950/25 p-4" aria-labelledby="ref01-g1-evidence-metadata-title"><div className="flex items-center gap-2"><Archive className="text-violet-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-evidence-metadata-title" className="text-sm font-semibold text-slate-100">{t.metadataTitle}</h6></div><p className="mt-2 text-xs leading-5 text-slate-300">{t.metadataIntro}</p><ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">{t.metadata.map((item, index) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-evidence-metadata"><span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-800 text-[11px] font-semibold text-sky-300">{index + 1}</span>{item}</li>)}</ol></section>

      <section className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/15 p-4" aria-labelledby="ref01-g1-evidence-gate-title"><div className="flex items-center gap-2"><CheckCircle2 className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-evidence-gate-title" className="text-sm font-semibold text-amber-100">{t.gateTitle}</h6></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.gateBody}</p></section>
      <p className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3 text-xs font-semibold leading-5 text-sky-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-emerald-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsPostgreSqlEvidenceSheet;
