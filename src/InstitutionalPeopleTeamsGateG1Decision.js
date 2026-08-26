import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  DatabaseBackup,
  LockKeyhole,
  PencilLine,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const OUTCOME_STYLES = {
  amended: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  confirmed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-100',
  closed: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'ARBITRAGE HUMAIN G1 · REF-01-DEC-013 · V1.0 · 26-08-2026',
    title: 'Confirmer quatre principes, amender PostgreSQL et maintenir L2 fermé',
    intro: 'Cheikh valide la recommandation consolidée et l’amende sur son premier point. Les principes 2 à 5 sont confirmés, PostgreSQL reste une cible de principe sous réserve documentaire et L2 demeure fermé. G1 n’est pas clôturée.',
    counters: [['Principes confirmés', '4', 'Rôles, GED, migration et outbox'], ['Point amendé', '1', 'PostgreSQL et restauration à compléter'], ['Ouvertures L2', '0', 'Maintien fermé confirmé'], ['Décisions gouvernées', '1', 'REF-01-DEC-013 consigne l’arbitrage']],
    outcomeTitle: 'Résultat par proposition',
    labels: { amended: 'AMENDEE · A CONFIRMER', confirmed: 'PRINCIPE CONFIRME', closed: 'L2 FERME' },
    outcomes: [
      ['1 · Service PostgreSQL et restauration', 'amended', 'PostgreSQL administré reste la cible de principe. Aucun fournisseur, offre ou niveau de service n’est retenu ; la confirmation finale attend les preuves obligatoires.'],
      ['2 · Rôles, moindre privilège et visibilité', 'confirmed', 'Séparation lecture, demande, validation, migration, worker et audit avec refus par défaut confirmée comme principe.'],
      ['3 · Conservation C2/C3/C4 et GED', 'confirmed', 'La GED conserve les pièces ; REF-01 ne conserve que des références opaques autorisées.'],
      ['4 · Autorité de migration et retour arrière', 'confirmed', 'Identité technique dédiée, revue à deux personnes et autorité de retour arrière confirmées comme principes.'],
      ['5 · Supervision et reprise de l’outbox', 'confirmed', 'Temporisation, plafond, quarantaine, alertes, métriques et rejeu idempotent confirmés comme critères futurs.'],
      ['6 · Ouverture éventuelle de L2', 'closed', 'L2 reste fermé. Toute demande future devra être limitée, désactivée par défaut et fondée sur des données synthétiques.']
    ],
    amendmentTitle: 'Amendement à instruire avant confirmation du point 1',
    amendmentIntro: 'La cible PostgreSQL n’est pas rejetée, mais elle ne devient pas une décision de service exploitable tant que les éléments suivants ne sont pas documentés, contrôlés et soumis à validation humaine.',
    amendmentItems: ['Chiffrement au repos et en transit.', 'Sauvegarde automatique et fréquence.', 'Restauration effectivement testée.', 'Localisation et juridiction des données.', 'Coûts et hypothèses de capacité.', 'RPO et RTO proposés.', 'Responsables de contrôle et preuve GED associée.'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-013', version: 'V1.0', status: 'Arbitrage G1 partiel confirmé', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'Cheikh valide la recommandation REF-01-G1-ARB-001 V0.1 et l’amende : les principes 2 à 5 sont confirmés ; PostgreSQL administré reste une cible de principe mais le point 1 demeure à confirmer après documentation des garanties ; L2 reste fermé.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 : « je le valide et amende, continue stp », donnée en réponse à la recommandation consolidée publiée par la PR frontend nº 200 au commit bcccda1.',
      limit: 'Cette décision ne clôt pas G1 et n’autorise aucun fournisseur, abonnement, sauvegarde active, base partagée, migration, API, compte, permission, donnée réelle, preuve GED importée, worker, projection BigQuery ou mesure de progression.'
    },
    status: 'STATUT · Quatre principes confirmés, un point amendé, G1 ouverte et L2 fermé.',
    next: 'Prochaine étape : préparer la fiche de preuve du point 1 avec les sept éléments requis, puis demander sa confirmation séparée. Aucun travail L2 ne commence avant cette décision.',
    boundary: 'Limite : l’amendement précise les preuves attendues ; il ne choisit pas un fournisseur et ne vaut ni achat, ni configuration, ni autorisation technique.'
  },
  EN: {
    eyebrow: 'G1 HUMAN DECISION · REF-01-DEC-013 · V1.0 · 26 AUG 2026',
    title: 'Confirm four principles, amend PostgreSQL and keep L2 closed',
    intro: 'Cheikh approves the consolidated recommendation and amends its first point. Principles 2 to 5 are confirmed, PostgreSQL remains a target principle subject to documentary evidence, and L2 stays closed. G1 is not closed.',
    counters: [['Confirmed principles', '4', 'Roles, DMS, migration and outbox'], ['Amended point', '1', 'PostgreSQL and restoration to complete'], ['L2 openings', '0', 'Keeping it closed confirmed'], ['Governed decisions', '1', 'REF-01-DEC-013 records the decision']],
    outcomeTitle: 'Outcome by proposal', labels: { amended: 'AMENDED · TO CONFIRM', confirmed: 'PRINCIPLE CONFIRMED', closed: 'L2 CLOSED' },
    outcomes: [
      ['1 · PostgreSQL service and restoration', 'amended', 'Managed PostgreSQL remains the target principle. No provider, offer or service level is selected; final confirmation requires the mandatory evidence.'],
      ['2 · Roles, least privilege and visibility', 'confirmed', 'Separate read, request, validation, migration, worker and audit roles with default denial are confirmed as a principle.'],
      ['3 · C2/C3/C4 retention and DMS', 'confirmed', 'The DMS retains records; REF-01 stores authorised opaque references only.'],
      ['4 · Migration and rollback authority', 'confirmed', 'A dedicated technical identity, two-person review and named rollback authority are confirmed as principles.'],
      ['5 · Outbox monitoring and recovery', 'confirmed', 'Delay, ceiling, quarantine, alerts, metrics and idempotent replay are confirmed as future criteria.'],
      ['6 · Possible opening of L2', 'closed', 'L2 remains closed. Any later request must be limited, disabled by default and use synthetic data.']
    ],
    amendmentTitle: 'Amendment to document before confirming point 1', amendmentIntro: 'The PostgreSQL target is not rejected, but it does not become an actionable service decision until the following elements are documented, controlled and submitted for human approval.',
    amendmentItems: ['Encryption at rest and in transit.', 'Automated backup and frequency.', 'Effectively tested restoration.', 'Data location and jurisdiction.', 'Costs and capacity assumptions.', 'Proposed RPO and RTO.', 'Control owners and associated DMS evidence.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-013', version: 'V1.0', status: 'Partial G1 decision confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026', decision: 'Cheikh approves recommendation REF-01-G1-ARB-001 V0.1 and amends it: principles 2 to 5 are confirmed; managed PostgreSQL remains a target principle but point 1 awaits confirmation after the safeguards are documented; L2 stays closed.', evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session: “je le valide et amende, continue stp”, in response to the consolidated recommendation published through frontend PR 200 at commit bcccda1.', limit: 'This decision does not close G1 and authorises no provider, subscription, active backup, shared database, migration, API, account, permission, real data, imported DMS evidence, worker, BigQuery projection or progress measurement.' },
    status: 'STATUS · Four principles confirmed, one point amended, G1 open and L2 closed.', next: 'Next step: prepare the point 1 evidence sheet with the seven required elements, then request its separate confirmation. No L2 work starts before that decision.', boundary: 'Boundary: the amendment specifies expected evidence; it selects no provider and is neither a purchase, configuration nor technical authorisation.'
  },
  DE: {
    eyebrow: 'MENSCHLICHER G1-ENTSCHEID · REF-01-DEC-013 · V1.0 · 26.08.2026',
    title: 'Vier Prinzipien bestätigen, PostgreSQL ändern und L2 geschlossen halten',
    intro: 'Cheikh genehmigt die konsolidierte Empfehlung und ändert ihren ersten Punkt. Die Prinzipien 2 bis 5 sind bestätigt, PostgreSQL bleibt ein Zielprinzip unter Dokumentationsvorbehalt und L2 bleibt geschlossen. G1 ist nicht geschlossen.',
    counters: [['Bestätigte Prinzipien', '4', 'Rollen, DMS, Migration und Outbox'], ['Geänderter Punkt', '1', 'PostgreSQL und Restore zu ergänzen'], ['L2-Öffnungen', '0', 'Geschlossen halten bestätigt'], ['Governance-Entscheide', '1', 'REF-01-DEC-013 hält den Entscheid fest']],
    outcomeTitle: 'Ergebnis je Vorschlag', labels: { amended: 'GEÄNDERT · ZU BESTÄTIGEN', confirmed: 'PRINZIP BESTÄTIGT', closed: 'L2 GESCHLOSSEN' },
    outcomes: [
      ['1 · PostgreSQL-Dienst und Wiederherstellung', 'amended', 'Verwaltetes PostgreSQL bleibt Zielprinzip. Kein Anbieter, Angebot oder Dienstniveau ist gewählt; die endgültige Bestätigung benötigt die Pflichtnachweise.'],
      ['2 · Rollen, geringste Berechtigung und Sichtbarkeit', 'confirmed', 'Getrennte Rollen für Lesen, Antrag, Validierung, Migration, Worker und Audit mit Standardverweigerung sind als Prinzip bestätigt.'],
      ['3 · Aufbewahrung C2/C3/C4 und DMS', 'confirmed', 'Das DMS bewahrt Unterlagen; REF-01 speichert nur autorisierte opake Referenzen.'],
      ['4 · Migrations- und Rückkehrbefugnis', 'confirmed', 'Eigene technische Identität, Zwei-Personen-Prüfung und benannte Rückkehrbefugnis sind als Prinzipien bestätigt.'],
      ['5 · Outbox-Überwachung und Wiederanlauf', 'confirmed', 'Wartezeit, Limit, Quarantäne, Warnungen, Metriken und idempotente Wiederholung sind als künftige Kriterien bestätigt.'],
      ['6 · Mögliche Öffnung von L2', 'closed', 'L2 bleibt geschlossen. Jeder spätere Antrag muss begrenzt, standardmässig deaktiviert und auf synthetische Daten beschränkt sein.']
    ],
    amendmentTitle: 'Vor Bestätigung von Punkt 1 zu dokumentierende Änderung', amendmentIntro: 'Das PostgreSQL-Ziel ist nicht abgelehnt, wird aber erst nach Dokumentation, Kontrolle und menschlicher Genehmigung der folgenden Elemente zu einem ausführbaren Dienstentscheid.',
    amendmentItems: ['Verschlüsselung bei Speicherung und Übertragung.', 'Automatische Sicherung und Frequenz.', 'Tatsächlich getestete Wiederherstellung.', 'Datenstandort und Rechtsraum.', 'Kosten und Kapazitätsannahmen.', 'Vorgeschlagene RPO und RTO.', 'Kontrollverantwortliche und zugehöriger DMS-Nachweis.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-013', version: 'V1.0', status: 'Teilentscheid G1 bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026', decision: 'Cheikh genehmigt die Empfehlung REF-01-G1-ARB-001 V0.1 und ändert sie: Die Prinzipien 2 bis 5 sind bestätigt; verwaltetes PostgreSQL bleibt Zielprinzip, Punkt 1 wartet jedoch bis zur Dokumentation der Garantien auf Bestätigung; L2 bleibt geschlossen.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 26.08.2026: „je le valide et amende, continue stp“, als Antwort auf die mit Frontend-PR Nr. 200 am Commit bcccda1 veröffentlichte Empfehlung.', limit: 'Dieser Entscheid schliesst G1 nicht und autorisiert keinen Anbieter, kein Abonnement, aktive Sicherung, gemeinsame Datenbank, Migration, API, Konto, Berechtigung, reale Daten, importierten DMS-Nachweis, Worker, BigQuery-Projektion oder Fortschrittsmessung.' },
    status: 'STAND · Vier Prinzipien bestätigt, ein Punkt geändert, G1 offen und L2 geschlossen.', next: 'Nächster Schritt: Nachweisblatt für Punkt 1 mit den sieben erforderlichen Elementen vorbereiten und getrennt bestätigen lassen. Vor diesem Entscheid beginnt kein L2-Los.', boundary: 'Grenze: Die Änderung präzisiert erwartete Nachweise; sie wählt keinen Anbieter und ist weder Kauf, Konfiguration noch technische Autorisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1Decision = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-decision" className="m3s-ref01-g1-decision mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-decision-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-decision-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ShieldCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 1 ? <PencilLine className="text-amber-300" size={19} aria-hidden="true" /> : index === 2 ? <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" /> : <CheckCircle2 className="text-emerald-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>

      <section className="mt-4" aria-labelledby="ref01-g1-decision-outcomes-title"><h6 id="ref01-g1-decision-outcomes-title" className="text-sm font-semibold text-slate-100">{t.outcomeTitle}</h6><div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.outcomes.map(([title, status, body]) => <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-decision-outcome"><div className="flex flex-wrap items-start justify-between gap-3"><h6 className="text-sm font-semibold text-slate-100">{title}</h6><span className={`ref01-g1-outcome--${status} rounded-md border px-2 py-1 text-[11px] font-semibold ${OUTCOME_STYLES[status]}`}>{t.labels[status]}</span></div><p className="mt-3 text-xs leading-5 text-slate-300">{body}</p></article>)}</div></section>

      <section className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/15 p-4" aria-labelledby="ref01-g1-decision-amendment-title"><div className="flex items-center gap-2"><DatabaseBackup className="text-amber-300" size={18} aria-hidden="true" /><h6 id="ref01-g1-decision-amendment-title" className="text-sm font-semibold text-amber-100">{t.amendmentTitle}</h6></div><p className="mt-2 text-sm leading-6 text-slate-300">{t.amendmentIntro}</p><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{t.amendmentItems.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-g1-amendment-requirement"><CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={15} aria-hidden="true" />{item}</li>)}</ul></section>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1Decision;
