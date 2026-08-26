import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  PencilLine,
  ShieldCheck
} from 'lucide-react';

const DECISION_STYLES = {
  amend: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  confirm: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-100',
  hold: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'BASE D’ARBITRAGE G1 · REF-01-G1-ARB-001 · V0.1 · 26-08-2026',
    title: 'Arbitrer les six conditions sans ouvrir L2',
    intro: 'Cette base traduit la revue G1 en décisions proposées. Elle recommande cinq garde-fous de conception et le maintien de L2 fermé. Aucun choix ci-dessous n’est enregistré comme décision de Cheikh.',
    counters: [
      ['Propositions à examiner', '6', 'Une réponse distincte par condition'],
      ['Garde-fous proposés', '5', 'Ils cadrent la suite sans l’exécuter'],
      ['Ouverture L2 proposée', '0', 'Maintien fermé recommandé'],
      ['Décisions enregistrées', '0', 'Arbitrage humain encore attendu']
    ],
    labels: { proposal: 'Décision proposée', condition: 'Condition non négociable', effect: 'Effet si Cheikh valide' },
    decisions: { amend: 'AMENDER PUIS CONFIRMER', confirm: 'CONFIRMER LE PRINCIPE', hold: 'MAINTENIR FERME' },
    items: [
      {
        title: '1 · Service PostgreSQL et restauration',
        decision: 'amend',
        proposal: 'Confirmer PostgreSQL administré comme cible de principe, sans retenir encore de fournisseur, d’offre ou de niveau de service.',
        condition: 'Documenter chiffrement, sauvegarde automatique, restauration testée, localisation, coûts, RPO et RTO avant toute base partagée.',
        effect: 'Le choix d’architecture devient un garde-fou G1 ; l’achat, la configuration et la migration restent interdits.'
      },
      {
        title: '2 · Rôles, moindre privilège et visibilité',
        decision: 'confirm',
        proposal: 'Confirmer la séparation lecture, demande, validation, migration, worker et audit, avec refus par défaut.',
        condition: 'Organisation & RH définit les périmètres métier ; IT & Support les traduit en droits testables ; Gouvernance valide les délégations.',
        effect: 'Le modèle de rôles devient obligatoire pour la conception L2, sans créer encore de compte ni de permission active.'
      },
      {
        title: '3 · Conservation C2/C3/C4 et GED',
        decision: 'confirm',
        proposal: 'Confirmer que la GED conserve la pièce et que REF-01 ne conserve qu’une référence opaque autorisée.',
        condition: 'Une matrice de conservation, suppression, gel et déclassement doit être validée par catégorie avant toute donnée réelle.',
        effect: 'La séparation GED–REF-01 devient une règle obligatoire ; aucune durée de conservation n’est inventée par le système.'
      },
      {
        title: '4 · Autorité de migration et retour arrière',
        decision: 'confirm',
        proposal: 'Confirmer une identité technique dédiée, une revue à deux personnes et une autorité de retour arrière nommée.',
        condition: 'Sauvegarde vérifiée, journal d’exécution, fenêtre approuvée et procédure d’urgence sont requis avant chaque migration.',
        effect: 'La future migration devra respecter ce circuit ; aucune identité ni migration n’est créée par cette confirmation.'
      },
      {
        title: '5 · Supervision et reprise de l’outbox',
        decision: 'confirm',
        proposal: 'Confirmer temporisation progressive, plafond de tentatives, quarantaine, alertes, métriques et rejeu idempotent.',
        condition: 'Les seuils, responsabilités, délais d’alerte et procédure de reprise doivent être documentés et testés sur données synthétiques.',
        effect: 'Ces contrôles deviennent des critères d’acceptation ; aucun worker ni flux BigQuery n’est activé.'
      },
      {
        title: '6 · Ouverture éventuelle de L2',
        decision: 'hold',
        proposal: 'Maintenir L2 fermé et refuser toute ouverture globale à ce stade.',
        condition: 'Les cinq décisions précédentes, leurs preuves et les responsabilités doivent être validées avant une nouvelle demande limitée.',
        effect: 'G1 reste ouverte. Une future autorisation pourra porter seulement sur une API désactivée par défaut et des données synthétiques.'
      }
    ],
    recommendationTitle: 'Recommandation consolidée',
    recommendation: 'VALIDER LES CINQ GARDE-FOUS COMME PRINCIPES, AMENDER LE PREMIER AVANT CONFIRMATION ET MAINTENIR L2 FERME. Cette recommandation ne ferme pas G1.',
    next: 'Arbitrage humain attendu : confirmer, amender ou rejeter chaque proposition. Après seulement, une trace REF-01-DEC-013 pourra être préparée avec les réserves exactes.',
    boundary: 'Limite : aucune décision, source maîtresse, donnée réelle, migration, API, rôle actif, politique de conservation, fournisseur, abonnement, sauvegarde, worker, projection BigQuery ou progression n’est créée.'
  },
  EN: {
    eyebrow: 'G1 DECISION BASIS · REF-01-G1-ARB-001 · V0.1 · 26 AUG 2026',
    title: 'Decide the six conditions without opening L2',
    intro: 'This basis turns the G1 review into proposed decisions. It recommends five design safeguards and keeping L2 closed. No choice below is recorded as Cheikh’s decision.',
    counters: [['Proposals to review', '6', 'One separate response per condition'], ['Proposed safeguards', '5', 'They frame the next step without executing it'], ['Proposed L2 openings', '0', 'Keeping it closed is recommended'], ['Recorded decisions', '0', 'Human decision still required']],
    labels: { proposal: 'Proposed decision', condition: 'Non-negotiable condition', effect: 'Effect if Cheikh validates' },
    decisions: { amend: 'AMEND THEN CONFIRM', confirm: 'CONFIRM THE PRINCIPLE', hold: 'KEEP CLOSED' },
    items: [
      { title: '1 · PostgreSQL service and restoration', decision: 'amend', proposal: 'Confirm managed PostgreSQL as the target principle, without selecting a provider, offer or service level yet.', condition: 'Document encryption, automated backup, tested restoration, location, cost, RPO and RTO before any shared database.', effect: 'The architecture choice becomes a G1 safeguard; purchase, configuration and migration remain prohibited.' },
      { title: '2 · Roles, least privilege and visibility', decision: 'confirm', proposal: 'Confirm separate read, request, validation, migration, worker and audit roles, with default denial.', condition: 'Organisation & HR defines business scopes; IT & Support turns them into testable rights; Governance validates delegations.', effect: 'The role model becomes mandatory for L2 design, without creating any account or active permission.' },
      { title: '3 · C2/C3/C4 retention and DMS', decision: 'confirm', proposal: 'Confirm that the DMS retains the record and REF-01 stores only an authorised opaque reference.', condition: 'A retention, deletion, hold and declassification matrix must be approved by category before any real data.', effect: 'DMS–REF-01 separation becomes mandatory; the system invents no retention period.' },
      { title: '4 · Migration and rollback authority', decision: 'confirm', proposal: 'Confirm a dedicated technical identity, two-person review and a named rollback authority.', condition: 'Verified backup, execution log, approved window and emergency procedure are required before every migration.', effect: 'Any future migration must follow this path; this confirmation creates no identity or migration.' },
      { title: '5 · Outbox monitoring and recovery', decision: 'confirm', proposal: 'Confirm progressive delay, attempt ceiling, quarantine, alerts, metrics and idempotent replay.', condition: 'Thresholds, responsibilities, alert delays and recovery procedure must be documented and tested with synthetic data.', effect: 'These controls become acceptance criteria; no worker or BigQuery flow is activated.' },
      { title: '6 · Possible opening of L2', decision: 'hold', proposal: 'Keep L2 closed and reject any global opening at this stage.', condition: 'The five preceding decisions, their evidence and responsibilities must be approved before a new limited request.', effect: 'G1 remains open. A future authorisation may cover only an API disabled by default and synthetic data.' }
    ],
    recommendationTitle: 'Consolidated recommendation',
    recommendation: 'APPROVE THE FIVE SAFEGUARDS AS PRINCIPLES, AMEND THE FIRST BEFORE CONFIRMATION AND KEEP L2 CLOSED. This recommendation does not close G1.',
    next: 'Human decision required: confirm, amend or reject each proposal. Only then may a REF-01-DEC-013 trace be prepared with the exact reservations.',
    boundary: 'Boundary: no decision, master source, real data, migration, API, active role, retention policy, provider, subscription, backup, worker, BigQuery projection or progress is created.'
  },
  DE: {
    eyebrow: 'G1-ENTSCHEIDUNGSGRUNDLAGE · REF-01-G1-ARB-001 · V0.1 · 26.08.2026',
    title: 'Die sechs Bedingungen entscheiden, ohne L2 zu öffnen',
    intro: 'Diese Grundlage übersetzt die G1-Prüfung in vorgeschlagene Entscheide. Sie empfiehlt fünf Gestaltungsleitplanken und L2 geschlossen zu halten. Keine Auswahl gilt als Cheikhs Entscheid.',
    counters: [['Zu prüfende Vorschläge', '6', 'Eine getrennte Antwort je Bedingung'], ['Vorgeschlagene Leitplanken', '5', 'Sie rahmen den nächsten Schritt ohne Ausführung'], ['Vorgeschlagene L2-Öffnungen', '0', 'Geschlossen halten empfohlen'], ['Erfasste Entscheide', '0', 'Menschlicher Entscheid noch erforderlich']],
    labels: { proposal: 'Vorgeschlagener Entscheid', condition: 'Nicht verhandelbare Bedingung', effect: 'Wirkung bei Validierung durch Cheikh' },
    decisions: { amend: 'ÄNDERN, DANN BESTÄTIGEN', confirm: 'PRINZIP BESTÄTIGEN', hold: 'GESCHLOSSEN HALTEN' },
    items: [
      { title: '1 · PostgreSQL-Dienst und Wiederherstellung', decision: 'amend', proposal: 'Verwaltetes PostgreSQL als Zielprinzip bestätigen, ohne Anbieter, Angebot oder Dienstniveau auszuwählen.', condition: 'Verschlüsselung, automatische Sicherung, getesteter Restore, Standort, Kosten, RPO und RTO vor einer gemeinsamen Datenbank dokumentieren.', effect: 'Die Architekturwahl wird zur G1-Leitplanke; Kauf, Konfiguration und Migration bleiben verboten.' },
      { title: '2 · Rollen, geringste Berechtigung und Sichtbarkeit', decision: 'confirm', proposal: 'Getrennte Rollen für Lesen, Antrag, Validierung, Migration, Worker und Audit mit Standardverweigerung bestätigen.', condition: 'Organisation & HR definiert Fachumfänge; IT & Support übersetzt sie in testbare Rechte; Governance validiert Delegationen.', effect: 'Das Rollenmodell wird für den L2-Entwurf verbindlich, ohne Konto oder aktive Berechtigung zu erstellen.' },
      { title: '3 · Aufbewahrung C2/C3/C4 und DMS', decision: 'confirm', proposal: 'Bestätigen, dass das DMS den Nachweis und REF-01 nur eine autorisierte opake Referenz speichert.', condition: 'Eine Matrix für Aufbewahrung, Löschung, Sperre und Deklassifizierung muss je Kategorie vor realen Daten genehmigt sein.', effect: 'Die Trennung DMS–REF-01 wird verbindlich; das System erfindet keine Aufbewahrungsdauer.' },
      { title: '4 · Migrations- und Rückkehrbefugnis', decision: 'confirm', proposal: 'Eine eigene technische Identität, Zwei-Personen-Prüfung und benannte Rückkehrbefugnis bestätigen.', condition: 'Geprüfte Sicherung, Ausführungsjournal, genehmigtes Fenster und Notfallverfahren sind vor jeder Migration erforderlich.', effect: 'Jede künftige Migration muss diesem Weg folgen; keine Identität oder Migration wird erstellt.' },
      { title: '5 · Outbox-Überwachung und Wiederanlauf', decision: 'confirm', proposal: 'Progressive Wartezeit, Versuchslimit, Quarantäne, Warnungen, Metriken und idempotente Wiederholung bestätigen.', condition: 'Schwellen, Verantwortungen, Warnfristen und Wiederanlauf müssen dokumentiert und mit synthetischen Daten getestet sein.', effect: 'Diese Kontrollen werden Abnahmekriterien; kein Worker oder BigQuery-Fluss wird aktiviert.' },
      { title: '6 · Mögliche Öffnung von L2', decision: 'hold', proposal: 'L2 geschlossen halten und eine globale Öffnung derzeit ablehnen.', condition: 'Die fünf vorherigen Entscheide, ihre Nachweise und Verantwortungen müssen vor einem neuen begrenzten Antrag genehmigt sein.', effect: 'G1 bleibt offen. Eine spätere Autorisierung kann nur eine standardmäßig deaktivierte API und synthetische Daten umfassen.' }
    ],
    recommendationTitle: 'Konsolidierte Empfehlung',
    recommendation: 'DIE FÜNF LEITPLANKEN ALS PRINZIPIEN GENEHMIGEN, DIE ERSTE VOR BESTÄTIGUNG ÄNDERN UND L2 GESCHLOSSEN HALTEN. Diese Empfehlung schließt G1 nicht.',
    next: 'Menschlicher Entscheid erforderlich: jeden Vorschlag bestätigen, ändern oder ablehnen. Erst danach kann eine Spur REF-01-DEC-013 mit den genauen Vorbehalten vorbereitet werden.',
    boundary: 'Grenze: Es werden kein Entscheid, keine Masterquelle, realen Daten, Migration, API, aktive Rolle, Aufbewahrungsregel, Anbieter, Abonnement, Sicherung, Worker, BigQuery-Projektion oder Fortschritt erstellt.'
  }
};

const InstitutionalPeopleTeamsGateG1Arbitration = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section id="institutional-ref01-g1-arbitration" className="m3s-ref01-g1-arbitration mt-5 scroll-mt-24 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-arbitration-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-g1-arbitration-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
        </div>
        <ClipboardCheck className="shrink-0 text-cyan-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => (
          <article key={label} className="m3s-raised min-h-28 p-3">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>
              {index === 2 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <CheckCircle2 className={index === 3 ? 'text-amber-300' : 'text-cyan-300'} size={19} aria-hidden="true" />}
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{note}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {t.items.map((item) => (
          <article key={item.title} className="m3s-raised p-4" data-testid="ref01-g1-arbitration-item">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{item.title}</h6></div>
              <span className={`ref01-g1-decision--${item.decision} rounded-md border px-2 py-1 text-[11px] font-semibold ${DECISION_STYLES[item.decision]}`}>{t.decisions[item.decision]}</span>
            </div>
            <dl className="mt-4 space-y-3 text-xs leading-5">
              <div><dt className="font-semibold text-cyan-300">{t.labels.proposal}</dt><dd className="mt-1 text-slate-300">{item.proposal}</dd></div>
              <div><dt className="font-semibold text-amber-300">{t.labels.condition}</dt><dd className="mt-1 text-slate-300">{item.condition}</dd></div>
              <div><dt className="font-semibold text-violet-300">{t.labels.effect}</dt><dd className="mt-1 text-slate-300">{item.effect}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-cyan-700/70 bg-cyan-950/20 p-4">
        <div className="flex items-center gap-2"><PencilLine className="text-cyan-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-cyan-100">{t.recommendationTitle}</h6></div>
        <p className="mt-2 text-sm font-semibold leading-6 text-cyan-100">{t.recommendation}</p>
      </div>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p>
      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1Arbitration;
