import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, KeyRound, LockKeyhole, RadioTower, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PLAN CONFIRMÉ DE LEVÉE DES ÉCARTS G1 · REF-01-G1-PLN-001 · V1.0 · 27-08-2026',
    title: 'Ordonner les preuves sans lancer d’action réelle',
    intro: 'Ce plan confirmé transforme la réévaluation en cinq lots documentaires et techniques bornés. Il décrit l’ordre, le livrable et la condition de sortie ; il n’autorise pas leur exécution réelle.',
    counters: [['Lots candidats', '5', 'Un par écart principal'], ['Conditions couvertes', '6/6', 'L2 reste une porte'], ['Actions réelles', '0', 'Préparation seulement'], ['Progression calculée', '0', 'Aucun taux autorisé']],
    labels: { output: 'Livrable candidat', exit: 'Condition de sortie', boundary: 'Limite du lot' },
    items: [
      ['PLN-01 · Rôles, moindre privilège et visibilité', 'Priorité 1 · Peut être préparé avec PLN-02', 'Matrice candidate des rôles applicatifs, délégations, visibilité par ligne et autorité d’approbation.', 'Rôles nommés, séparation des responsabilités et scénarios de test approuvés humainement.', 'Aucun droit, compte, accès ou délégation réelle créé.'],
      ['PLN-02 · Conservation C2/C3/C4 et GED', 'Priorité 1 · Peut être préparé avec PLN-01', 'Matrice candidate de conservation, suppression, gel, déclassement, exceptions et preuve GED.', 'Règles qualifiées par LEGAL, Administration, RH, GED et autorité de décision identifiée.', 'Aucune suppression, reclassification ou modification de pièce réelle.'],
      ['PLN-03 · PostgreSQL, sauvegarde et restauration', 'Priorité 2 · Après cadrage d’autorité', 'Dossier comparatif candidat des services, sauvegardes, restaurations, RPO, RTO et preuves exigibles.', 'Périmètre, critères, méthode de test isolé et décision de collecte approuvés séparément.', 'Aucun fournisseur présélectionné, compte ouvert, achat, secret ou test sur production.'],
      ['PLN-04 · Migration, retour arrière et autorité', 'Priorité 3 · Après PLN-01 et PLN-03', 'Procédure candidate de migration isolée, double approbation, sauvegarde vérifiée, rollback et urgence.', 'Autorités nommées, preuves minimales et scénario synthétique acceptés avant tout environnement partagé.', 'Aucune migration, table, endpoint, donnée réelle ou changement de démarrage appliqué.'],
      ['PLN-05 · Outbox, supervision et reprise', 'Priorité 3 · Après PLN-01', 'Spécification candidate du worker, seuils, alertes, quarantaine, métriques, fréquence et escalade.', 'Seuils, responsabilité, arrêt, test synthétique et preuves de reprise approuvés.', 'Aucun worker, alerte, notification, surveillance ou automatisation réelle activé.']
    ],
    gate: 'PORTE FINALE · Une nouvelle réévaluation des six conditions sera requise après preuves. G1 restera ouverte et L2 fermé tant que chaque condition de sortie ne sera pas démontrée et décidée séparément.',
    next: 'Statut : REF-01-G1-PLN-001 V1.0 est confirmé. La préparation détaillée des cinq lots reste soumise au registre candidat PKG-001 ci-dessous.',
    boundary: 'Le plan ne crée ni fournisseur, prix, compte, accès, rôle, durée, donnée, sauvegarde, migration, alerte, source maîtresse, progrès ou autorisation L2.'
  },
  EN: {
    eyebrow: 'CONFIRMED G1 GAP-EVIDENCE PLAN · REF-01-G1-PLN-001 · V1.0 · 27 AUG 2026',
    title: 'Order the evidence without starting real action',
    intro: 'This confirmed plan turns the reassessment into five bounded documentary and technical packages. It defines order, output and exit condition; it does not authorise real execution.',
    counters: [['Candidate packages', '5', 'One per main gap'], ['Covered conditions', '6/6', 'L2 remains a gate'], ['Real actions', '0', 'Preparation only'], ['Calculated progress', '0', 'No rate authorised']],
    labels: { output: 'Candidate output', exit: 'Exit condition', boundary: 'Package boundary' },
    items: [
      ['PLN-01 · Roles, least privilege and visibility', 'Priority 1 · May be prepared with PLN-02', 'Candidate matrix of application roles, delegations, row visibility and approval authority.', 'Named roles, separation of duties and test scenarios approved by a human decision.', 'No real right, account, access or delegation created.'],
      ['PLN-02 · C2/C3/C4 retention and DMS', 'Priority 1 · May be prepared with PLN-01', 'Candidate matrix for retention, deletion, hold, declassification, exceptions and DMS evidence.', 'Rules qualified by LEGAL, Administration, HR and DMS, with decision authority identified.', 'No deletion, reclassification or change to a real record.'],
      ['PLN-03 · PostgreSQL, backup and restoration', 'Priority 2 · After authority framing', 'Candidate comparison file for services, backups, restorations, RPO, RTO and required evidence.', 'Scope, criteria, isolated-test method and collection decision approved separately.', 'No provider preselected, account opened, purchase, secret or production test.'],
      ['PLN-04 · Migration, rollback and authority', 'Priority 3 · After PLN-01 and PLN-03', 'Candidate isolated-migration procedure with dual approval, verified backup, rollback and emergency response.', 'Named authorities, minimum evidence and synthetic scenario accepted before any shared environment.', 'No migration, table, endpoint, real data or startup change applied.'],
      ['PLN-05 · Outbox monitoring and recovery', 'Priority 3 · After PLN-01', 'Candidate specification for worker, thresholds, alerts, quarantine, metrics, frequency and escalation.', 'Thresholds, ownership, stop rule, synthetic test and recovery evidence approved.', 'No real worker, alert, notification, monitoring or automation activated.']
    ],
    gate: 'FINAL GATE · A new reassessment of all six conditions will be required after evidence. G1 remains open and L2 closed until every exit condition is demonstrated and decided separately.',
    next: 'Status: REF-01-G1-PLN-001 V1.0 is confirmed. Detailed preparation of the five packages remains subject to the candidate PKG-001 register below.',
    boundary: 'The plan creates no provider, price, account, access, role, period, data, backup, migration, alert, master source, progress or L2 authorisation.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER PLAN FÜR G1-LÜCKENNACHWEISE · REF-01-G1-PLN-001 · V1.0 · 27.08.2026',
    title: 'Nachweise ordnen, ohne reale Aktionen zu starten',
    intro: 'Dieser bestätigte Plan überführt die Neubewertung in fünf begrenzte Dokumentations- und Technikpakete. Er beschreibt Reihenfolge, Ergebnis und Austrittsbedingung; reale Ausführung ist nicht erlaubt.',
    counters: [['Kandidatenpakete', '5', 'Eines je Hauptlücke'], ['Abgedeckte Bedingungen', '6/6', 'L2 bleibt eine Schranke'], ['Reale Aktionen', '0', 'Nur Vorbereitung'], ['Berechneter Fortschritt', '0', 'Kein Satz autorisiert']],
    labels: { output: 'Kandidatenergebnis', exit: 'Austrittsbedingung', boundary: 'Paketgrenze' },
    items: [
      ['PLN-01 · Rollen, geringste Berechtigung und Sichtbarkeit', 'Priorität 1 · Mit PLN-02 vorbereitbar', 'Kandidatenmatrix für Anwendungsrollen, Delegationen, Zeilensichtbarkeit und Genehmigungsautorität.', 'Benannte Rollen, Funktionstrennung und Testszenarien menschlich genehmigt.', 'Kein reales Recht, Konto, Zugriff oder Delegation erstellt.'],
      ['PLN-02 · Aufbewahrung C2/C3/C4 und DMS', 'Priorität 1 · Mit PLN-01 vorbereitbar', 'Kandidatenmatrix für Aufbewahrung, Löschung, Sperre, Deklassifizierung, Ausnahmen und DMS-Nachweis.', 'Regeln durch LEGAL, Verwaltung, HR und DMS qualifiziert und Entscheidautorität identifiziert.', 'Keine Löschung, Umklassifizierung oder Änderung realer Unterlagen.'],
      ['PLN-03 · PostgreSQL, Sicherung und Wiederherstellung', 'Priorität 2 · Nach Autoritätsrahmen', 'Kandidatenvergleich zu Diensten, Sicherungen, Wiederherstellungen, RPO, RTO und verlangten Nachweisen.', 'Umfang, Kriterien, isolierte Testmethode und Sammelentscheid getrennt genehmigt.', 'Kein Anbieter vorausgewählt, Konto eröffnet, Kauf, Geheimnis oder Produktionstest.'],
      ['PLN-04 · Migration, Rückkehr und Autorität', 'Priorität 3 · Nach PLN-01 und PLN-03', 'Kandidatenverfahren für isolierte Migration, Doppelgenehmigung, geprüfte Sicherung, Rollback und Notfall.', 'Benannte Autoritäten, Mindestnachweise und synthetisches Szenario vor gemeinsamer Umgebung akzeptiert.', 'Keine Migration, Tabelle, Endpunkt, Echtdaten oder Startänderung angewandt.'],
      ['PLN-05 · Outbox-Überwachung und Wiederanlauf', 'Priorität 3 · Nach PLN-01', 'Kandidatenspezifikation für Worker, Schwellen, Alarme, Quarantäne, Messwerte, Rhythmus und Eskalation.', 'Schwellen, Verantwortung, Stoppregel, synthetischer Test und Wiederanlaufnachweise genehmigt.', 'Kein realer Worker, Alarm, Hinweis, Monitoring oder Automatisierung aktiviert.']
    ],
    gate: 'FINALE SCHRANKE · Nach den Nachweisen ist eine neue Prüfung aller sechs Bedingungen erforderlich. G1 bleibt offen und L2 geschlossen, bis jede Austrittsbedingung getrennt belegt und entschieden ist.',
    next: 'Stand: REF-01-G1-PLN-001 V1.0 ist bestätigt. Die Detailvorbereitung der fünf Pakete bleibt dem nachfolgenden Kandidatenregister PKG-001 unterstellt.',
    boundary: 'Der Plan erzeugt weder Anbieter, Preis, Konto, Zugriff, Rolle, Dauer, Daten, Sicherung, Migration, Alarm, Masterquelle, Fortschritt noch L2-Autorisierung.'
  }
};

const ICONS = [KeyRound, Archive, DatabaseBackup, ShieldCheck, RadioTower];

const InstitutionalPeopleTeamsGateG1EvidencePlan = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-evidence-plan" className="m3s-ref01-g1-evidence-plan mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-evidence-plan-title">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-evidence-plan-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <ShieldCheck className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, order, output, exit, boundary], index) => { const Icon = ICONS[index]; return <article key={title} data-testid="ref01-g1-evidence-plan-package" className="m3s-raised p-4"><div className="flex items-start gap-2"><Icon className="mt-0.5 shrink-0 text-violet-300" size={19} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">{title}</h6><p className="mt-1 text-xs font-semibold text-sky-200">{order}</p></div></div><dl className="mt-3 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.output}</dt><dd className="mt-1 text-slate-300">{output}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.exit}</dt><dd className="mt-1 text-slate-300">{exit}</dd></div><div><dt className="font-semibold text-rose-200">{t.labels.boundary}</dt><dd className="mt-1 text-slate-300">{boundary}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-rose-700/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.gate}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1EvidencePlan;
