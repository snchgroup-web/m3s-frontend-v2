import React from 'react';
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  CheckCircle2,
  DatabaseBackup,
  KeyRound,
  LockKeyhole,
  RadioTower,
  Server,
  ShieldCheck
} from 'lucide-react';

const STATUS_STYLES = {
  partial: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  open: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  locked: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'REVUE DE PORTE G1 · REF-01-G1-REV-001 · V0.1 · 26-08-2026',
    title: 'Décider G1 sans confondre preuve et recommandation',
    intro: 'Cette matrice rapproche les preuves locales du lot L1, les orientations candidates et les validations encore nécessaires. Elle prépare l’arbitrage de Cheikh ; elle ne ferme pas G1 et n’autorise aucune migration, API ou donnée réelle.',
    counters: [
      ['Conditions G1', '6', 'Toutes exigent une décision humaine'],
      ['Partiellement étayées', '3', 'Rôles, classification et outbox'],
      ['Décisions enregistrées', '0', 'Aucune condition G1 encore approuvée'],
      ['Autorisations L2', '0', 'L2 reste fermé']
    ],
    labels: { evidence: 'Preuve disponible', recommendation: 'Orientation candidate', owner: 'Validation attendue' },
    statuses: { partial: 'Preuve partielle', open: 'Décision ouverte', locked: 'L2 fermé' },
    items: [
      {
        title: '1 · Service PostgreSQL et restauration',
        status: 'open',
        evidence: 'Le schéma fonctionne dans un moteur PostgreSQL embarqué. Aucun fournisseur, environnement partagé, sauvegarde, restauration, RPO ou RTO n’est observé.',
        recommendation: 'Retenir un PostgreSQL administré seulement après chiffrement, sauvegarde automatique, restauration testée et objectifs RPO/RTO approuvés.',
        owner: 'IT & Support prépare la preuve technique ; Management & Gouvernance autorise le service et les objectifs.'
      },
      {
        title: '2 · Rôles, moindre privilège et visibilité',
        status: 'partial',
        evidence: 'Les droits PUBLIC sont retirés et la séparation demandeur–validateur est testée. Aucun rôle applicatif ni contrôle de visibilité par ligne n’existe encore.',
        recommendation: 'Définir des rôles distincts lecture, demande, validation, migration, worker et audit ; refus par défaut et visibilité limitée au besoin métier.',
        owner: 'Organisation & RH valide les périmètres ; IT & Support implémente ; Gouvernance arbitre les délégations.'
      },
      {
        title: '3 · Conservation C2/C3/C4 et GED',
        status: 'partial',
        evidence: 'Le schéma accepte C2 à C4 et conserve uniquement une référence opaque GED. Aucune durée, règle de suppression, gel ou déclassement n’est approuvée.',
        recommendation: 'Valider une matrice de conservation par catégorie avant toute donnée réelle ; la GED conserve la pièce, REF-01 uniquement sa référence autorisée.',
        owner: 'GED et Administration proposent la matrice ; Organisation & RH valide le besoin ; Gouvernance et LEGAL arbitrent.'
      },
      {
        title: '4 · Autorité de migration et retour arrière',
        status: 'open',
        evidence: 'Les scripts montant et descendant sont réversibles, mais aucune identité de déploiement, approbation ou procédure d’urgence n’est définie.',
        recommendation: 'Réserver la migration à une identité technique dédiée, avec revue à deux personnes, sauvegarde vérifiée, journal d’exécution et autorité de retour arrière nommée.',
        owner: 'IT & Support exécute ; Management & Gouvernance autorise ; le responsable métier confirme la fenêtre et l’impact.'
      },
      {
        title: '5 · Supervision et reprise de l’outbox',
        status: 'partial',
        evidence: 'États, tentatives, disponibilité et dernière erreur sont modélisés. Aucun worker, seuil, alerte, quarantaine ou procédure de reprise n’est actif.',
        recommendation: 'Définir temporisation progressive, plafond de tentatives, file de quarantaine, alertes, métriques et rejeu idempotent avant toute propagation.',
        owner: 'IT & Support propose et exploite ; la fonction propriétaire contrôle les écarts ; Gouvernance valide les seuils sensibles.'
      },
      {
        title: '6 · Ouverture éventuelle de L2',
        status: 'locked',
        evidence: 'Les fondations L1 sont testées localement, mais les cinq conditions précédentes ne sont pas approuvées et aucune base partagée n’existe.',
        recommendation: 'Maintenir L2 fermé. Une décision ultérieure pourra autoriser uniquement un service API désactivé par défaut et testé avec des données synthétiques.',
        owner: 'Décision explicite de Cheikh après avis Organisation & RH, IT & Support, GED et Management & Gouvernance.'
      }
    ],
    verdictTitle: 'Verdict préparatoire',
    verdict: 'ARBITRAGES NECESSAIRES · G1 reste ouverte. Les fondations sont suffisamment documentées pour décider, pas pour déployer.',
    next: 'Prochaine décision humaine : confirmer, corriger ou rejeter chaque orientation candidate. Une validation globale ne doit intervenir qu’après définition des éléments encore ouverts.',
    boundary: 'Limite : cette revue ne crée ni fournisseur, abonnement, sauvegarde, rôle, politique de conservation, worker, migration partagée, route API, donnée réelle, preuve GED, projection BigQuery ou taux de progression.'
  },
  EN: {
    eyebrow: 'G1 GATE REVIEW · REF-01-G1-REV-001 · V0.1 · 26 AUG 2026',
    title: 'Decide G1 without confusing evidence and recommendation',
    intro: 'This matrix aligns local L1 evidence, candidate directions and the approvals still required. It prepares Cheikh’s decision; it does not close G1 or authorise any migration, API or real data.',
    counters: [['G1 conditions', '6', 'All require a human decision'], ['Partially supported', '3', 'Roles, classification and outbox'], ['Recorded decisions', '0', 'No G1 condition approved yet'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { evidence: 'Available evidence', recommendation: 'Candidate direction', owner: 'Expected validation' },
    statuses: { partial: 'Partial evidence', open: 'Open decision', locked: 'L2 closed' },
    items: [
      { title: '1 · PostgreSQL service and restoration', status: 'open', evidence: 'The schema works in an embedded PostgreSQL engine. No provider, shared environment, backup, restore, RPO or RTO is observed.', recommendation: 'Select a managed PostgreSQL service only after encryption, automated backup, tested restoration and approved RPO/RTO objectives.', owner: 'IT & Support prepares technical evidence; Management & Governance authorises the service and objectives.' },
      { title: '2 · Roles, least privilege and visibility', status: 'partial', evidence: 'PUBLIC rights are revoked and requester–validator segregation is tested. No application role or row-visibility control exists yet.', recommendation: 'Define separate read, request, validation, migration, worker and audit roles; default denial and visibility limited to business need.', owner: 'Organisation & HR validates scopes; IT & Support implements; Governance arbitrates delegations.' },
      { title: '3 · C2/C3/C4 retention and DMS', status: 'partial', evidence: 'The schema accepts C2 to C4 and stores only an opaque DMS reference. No retention, deletion, hold or declassification rule is approved.', recommendation: 'Approve a retention matrix by category before any real data; the DMS retains the record and REF-01 only its authorised reference.', owner: 'DMS and Administration propose the matrix; Organisation & HR validates need; Governance and LEGAL arbitrate.' },
      { title: '4 · Migration and rollback authority', status: 'open', evidence: 'Up and down scripts are reversible, but no deployment identity, approval or emergency procedure is defined.', recommendation: 'Reserve migration to a dedicated technical identity, with two-person review, verified backup, execution log and named rollback authority.', owner: 'IT & Support executes; Management & Governance authorises; the business owner confirms the window and impact.' },
      { title: '5 · Outbox monitoring and recovery', status: 'partial', evidence: 'States, attempts, availability and last error are modelled. No worker, threshold, alert, quarantine or recovery procedure is active.', recommendation: 'Define progressive delay, attempt ceiling, quarantine queue, alerts, metrics and idempotent replay before propagation.', owner: 'IT & Support proposes and operates; the owning function controls gaps; Governance validates sensitive thresholds.' },
      { title: '6 · Possible opening of L2', status: 'locked', evidence: 'L1 foundations are tested locally, but the preceding five conditions are not approved and no shared database exists.', recommendation: 'Keep L2 closed. A later decision may authorise only an API service disabled by default and tested with synthetic data.', owner: 'Explicit Cheikh decision after input from Organisation & HR, IT & Support, DMS and Management & Governance.' }
    ],
    verdictTitle: 'Preparatory verdict', verdict: 'DECISIONS REQUIRED · G1 remains open. Foundations are documented enough to decide, not to deploy.', next: 'Next human decision: confirm, amend or reject each candidate direction. Global approval should occur only after the open items are defined.', boundary: 'Boundary: this review creates no provider, subscription, backup, role, retention policy, worker, shared migration, API route, real data, DMS evidence, BigQuery projection or progress rate.'
  },
  DE: {
    eyebrow: 'PRÜFUNG TOR G1 · REF-01-G1-REV-001 · V0.1 · 26.08.2026',
    title: 'G1 entscheiden, ohne Nachweis und Empfehlung zu verwechseln',
    intro: 'Diese Matrix verbindet lokale L1-Nachweise, Kandidatenrichtungen und noch erforderliche Genehmigungen. Sie bereitet Cheikhs Entscheid vor; sie schließt G1 nicht und autorisiert keine Migration, API oder reale Daten.',
    counters: [['G1-Bedingungen', '6', 'Alle erfordern einen menschlichen Entscheid'], ['Teilweise belegt', '3', 'Rollen, Klassifizierung und Outbox'], ['Erfasste Entscheide', '0', 'Noch keine G1-Bedingung genehmigt'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { evidence: 'Verfügbarer Nachweis', recommendation: 'Kandidatenrichtung', owner: 'Erwartete Validierung' },
    statuses: { partial: 'Teilnachweis', open: 'Offener Entscheid', locked: 'L2 geschlossen' },
    items: [
      { title: '1 · PostgreSQL-Dienst und Wiederherstellung', status: 'open', evidence: 'Das Schema funktioniert in einer eingebetteten PostgreSQL-Engine. Anbieter, gemeinsame Umgebung, Sicherung, Wiederherstellung, RPO und RTO sind nicht beobachtet.', recommendation: 'Einen verwalteten PostgreSQL-Dienst erst nach Verschlüsselung, automatischer Sicherung, getestetem Restore und genehmigten RPO/RTO-Zielen wählen.', owner: 'IT & Support erstellt den technischen Nachweis; Management & Governance autorisiert Dienst und Ziele.' },
      { title: '2 · Rollen, geringste Berechtigung und Sichtbarkeit', status: 'partial', evidence: 'PUBLIC-Rechte sind entzogen und die Trennung Antrag–Validierung ist getestet. Anwendungsrollen und Zeilensichtbarkeit fehlen noch.', recommendation: 'Getrennte Rollen für Lesen, Antrag, Validierung, Migration, Worker und Audit definieren; standardmäßig verweigern und Sichtbarkeit auf den Fachbedarf begrenzen.', owner: 'Organisation & HR validiert Umfänge; IT & Support setzt um; Governance entscheidet Delegationen.' },
      { title: '3 · Aufbewahrung C2/C3/C4 und DMS', status: 'partial', evidence: 'Das Schema akzeptiert C2 bis C4 und speichert nur eine opake DMS-Referenz. Dauer, Löschung, Sperre und Deklassifizierung sind nicht genehmigt.', recommendation: 'Vor realen Daten eine Aufbewahrungsmatrix je Kategorie genehmigen; das DMS bewahrt den Nachweis, REF-01 nur seine autorisierte Referenz.', owner: 'DMS und Administration schlagen die Matrix vor; Organisation & HR validiert den Bedarf; Governance und LEGAL entscheiden.' },
      { title: '4 · Migrations- und Rückkehrbefugnis', status: 'open', evidence: 'Aufwärts- und Abwärtsskripte sind reversibel, aber Identität, Genehmigung und Notfallverfahren sind nicht definiert.', recommendation: 'Migration einer eigenen technischen Identität vorbehalten, mit Zwei-Personen-Prüfung, geprüfter Sicherung, Ausführungsjournal und benannter Rückkehrbefugnis.', owner: 'IT & Support führt aus; Management & Governance autorisiert; die Fachverantwortung bestätigt Fenster und Auswirkung.' },
      { title: '5 · Outbox-Überwachung und Wiederanlauf', status: 'partial', evidence: 'Stände, Versuche, Verfügbarkeit und letzter Fehler sind modelliert. Worker, Schwelle, Warnung, Quarantäne und Wiederanlauf sind nicht aktiv.', recommendation: 'Vor Weitergabe progressive Wartezeit, Versuchslimit, Quarantäne, Warnungen, Metriken und idempotente Wiederholung definieren.', owner: 'IT & Support schlägt vor und betreibt; die Fachfunktion kontrolliert Abweichungen; Governance validiert sensible Schwellen.' },
      { title: '6 · Mögliche Öffnung von L2', status: 'locked', evidence: 'L1-Grundlagen sind lokal getestet, aber die fünf vorherigen Bedingungen sind nicht genehmigt und keine gemeinsame Datenbank besteht.', recommendation: 'L2 geschlossen halten. Ein späterer Entscheid kann nur einen standardmäßig deaktivierten und mit synthetischen Daten getesteten API-Dienst autorisieren.', owner: 'Ausdrücklicher Entscheid von Cheikh nach Stellungnahmen von Organisation & HR, IT & Support, DMS sowie Management & Governance.' }
    ],
    verdictTitle: 'Vorbereitendes Urteil', verdict: 'ENTSCHEIDE ERFORDERLICH · G1 bleibt offen. Die Grundlagen reichen zum Entscheiden, nicht zum Bereitstellen.', next: 'Nächster menschlicher Entscheid: Jede Kandidatenrichtung bestätigen, ändern oder ablehnen. Eine Gesamtgenehmigung erst nach Definition der offenen Punkte.', boundary: 'Grenze: Diese Prüfung erstellt keinen Anbieter, kein Abonnement, keine Sicherung, Rolle, Aufbewahrungsregel, Worker, gemeinsame Migration, API-Route, realen Daten, DMS-Nachweis, BigQuery-Projektion oder Fortschrittswert.'
  }
};

const ITEM_ICONS = [DatabaseBackup, KeyRound, Archive, ShieldCheck, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1Review = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-ref01-g1-review" className="m3s-ref01-g1-review mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-review-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-review-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <Server className="shrink-0 text-amber-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 3 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <CheckCircle2 className={index === 2 ? 'text-amber-300' : 'text-sky-300'} size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {t.items.map((item, index) => {
          const Icon = ITEM_ICONS[index];
          return <article key={item.title} className="m3s-raised p-4" data-testid="ref01-g1-condition"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{item.title}</h6></div><span className={`ref01-g1-status--${item.status} rounded-md border px-2 py-1 text-[11px] font-semibold ${STATUS_STYLES[item.status]}`}>{t.statuses[item.status]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-300">{t.labels.evidence}</dt><dd className="mt-1 text-slate-300">{item.evidence}</dd></div><div><dt className="font-semibold text-emerald-300">{t.labels.recommendation}</dt><dd className="mt-1 text-slate-300">{item.recommendation}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.owner}</dt><dd className="mt-1 text-slate-300">{item.owner}</dd></div></dl></article>;
        })}
      </div>

      <div className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-4"><div className="flex items-center gap-2"><AlertTriangle className="text-amber-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-amber-100">{t.verdictTitle}</h6></div><p className="mt-2 text-sm font-semibold leading-6 text-amber-100">{t.verdict}</p></div>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p>
      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><LockKeyhole className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1Review;
