import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  DatabaseBackup,
  FolderArchive,
  KeyRound,
  RadioTower,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const text = (FR, EN, DE) => ({ FR, EN, DE });

const FAMILIES = [
  {
    id: 'EXC-01',
    icon: DatabaseBackup,
    title: text('Service PostgreSQL, environnement et titulaire', 'PostgreSQL service, environment and holder', 'PostgreSQL-Dienst, Umgebung und Träger'),
    affected: ['PG-03'],
    recommendation: text(
      'Retenir PostgreSQL administré comme cible de principe, sans fournisseur désigné. Conserver un bac à sable synthétique isolé, prévoir une préproduction dédiée et maintenir toute production fermée jusqu’à une autorisation distincte. IT & Support porte la responsabilité fonctionnelle ; l’exécutant nominatif reste à désigner avant toute action.',
      'Retain managed PostgreSQL as the target principle without naming a provider. Keep an isolated synthetic sandbox, provide a dedicated staging environment and keep production closed until a separate authorisation. IT & Support holds functional accountability; the named operator must be designated before any action.',
      'Verwaltetes PostgreSQL als Zielprinzip ohne Anbieterwahl festhalten. Eine isolierte synthetische Sandbox beibehalten, eine eigene Vorproduktion vorsehen und Produktion bis zu einer getrennten Freigabe geschlossen halten. IT & Support trägt die funktionale Verantwortung; die ausführende Person ist vor jeder Aktion zu bestimmen.'
    ),
    values: [
      text('Cible documentaire retenue : PostgreSQL administré · fournisseur à sélectionner', 'Retained documentary target: managed PostgreSQL · provider to select', 'Festgehaltenes Dokumentationsziel: verwaltetes PostgreSQL · Anbieter auszuwählen'),
      text('Environnements retenus : sandbox synthétique · préproduction dédiée · production fermée', 'Retained environments: synthetic sandbox · dedicated staging · production closed', 'Festgehaltene Umgebungen: synthetische Sandbox · eigene Vorproduktion · Produktion geschlossen'),
      text('Responsabilité fonctionnelle : IT & Support · exécutant nominatif à désigner', 'Functional accountability: IT & Support · named operator to designate', 'Funktionale Verantwortung: IT & Support · ausführende Person zu bestimmen')
    ],
    evidence: text('Compte 2SG autorisé, offre retenue, région d’hébergement, responsable nominatif et séparation des environnements.', 'Authorised 2SG account, selected offer, hosting region, named owner and environment separation.', 'Autorisiertes 2SG-Konto, gewähltes Angebot, Hosting-Region, namentliche Verantwortung und Umgebungstrennung.')
  },
  {
    id: 'EXC-02',
    icon: Clock3,
    title: text('Continuité, sauvegarde et restauration', 'Continuity, backup and restoration', 'Kontinuität, Sicherung und Wiederherstellung'),
    affected: ['PG-04', 'PG-05', 'PG-06'],
    recommendation: text(
      'Retenir comme paramètres documentaires un RPO de 24 heures et un RTO de 8 heures, avec sauvegarde quotidienne chiffrée conservée 30 jours. Exiger une restauration synthétique avant toute migration, puis un contrôle trimestriel après mise en service.',
      'Retain a 24-hour RPO and 8-hour RTO as documentary parameters, with an encrypted daily backup retained for 30 days. Require a synthetic restore before any migration, then quarterly testing after go-live.',
      'RPO 24 Stunden und RTO 8 Stunden als Dokumentationsparameter mit täglich verschlüsselter, 30 Tage aufbewahrter Sicherung festhalten. Vor jeder Migration eine synthetische Wiederherstellung und nach Inbetriebnahme eine vierteljährliche Prüfung verlangen.'
    ),
    values: [
      text('Seuils documentaires retenus : RPO ≤ 24 h · RTO ≤ 8 h', 'Retained documentary targets: RPO ≤ 24 h · RTO ≤ 8 h', 'Festgehaltene Dokumentationsziele: RPO ≤ 24 Std. · RTO ≤ 8 Std.'),
      text('Sauvegarde prévue : quotidienne · chiffrée · conservation 30 jours', 'Planned backup: daily · encrypted · 30-day retention', 'Geplante Sicherung: täglich · verschlüsselt · 30 Tage Aufbewahrung'),
      text('Cadence de test retenue : avant migration puis chaque trimestre', 'Retained test cadence: before migration, then quarterly', 'Festgehaltene Testkadenz: vor Migration, danach vierteljährlich')
    ],
    evidence: text('Rapport de sauvegarde, journal de restauration, temps mesuré et référence GED gouvernée.', 'Backup report, restore log, measured time and governed DMS reference.', 'Sicherungsbericht, Wiederherstellungsprotokoll, gemessene Zeit und gesteuerte DMS-Referenz.')
  },
  {
    id: 'EXC-03',
    icon: KeyRound,
    title: text('Identité de déploiement et fenêtre de migration', 'Deployment identity and migration window', 'Bereitstellungsidentität und Migrationsfenster'),
    affected: ['MIG-03', 'MIG-05'],
    recommendation: text(
      'Retenir une identité technique dédiée et limitée, distincte des comptes humains, avec validation à deux personnes. Prévoir une fenêtre documentaire de 60 minutes hors période critique, arrêt automatique à 45 minutes ou à la première assertion rejetée.',
      'Retain a dedicated least-privilege technical identity, separate from human accounts, with two-person approval. Use a documentary 60-minute off-peak window, with automatic stop at 45 minutes or on the first failed assertion.',
      'Eine eigene, minimal berechtigte technische Identität getrennt von Personenkonten mit Zwei-Personen-Freigabe festhalten. Ein dokumentiertes 60-Minuten-Fenster ausserhalb kritischer Zeiten mit automatischem Stopp nach 45 Minuten oder beim ersten Fehler vorsehen.'
    ),
    values: [
      text('Identité prévue : compte de service dédié · moindre privilège', 'Planned identity: dedicated service account · least privilege', 'Geplante Identität: eigenes Dienstkonto · geringste Berechtigung'),
      text('Contrôle : revue et autorisation à deux personnes', 'Control: two-person review and approval', 'Kontrolle: Prüfung und Freigabe durch zwei Personen'),
      text('Fenêtre retenue : 60 min · arrêt à 45 min ou au premier échec', 'Retained window: 60 min · stop at 45 min or first failure', 'Festgehaltenes Fenster: 60 Min. · Stopp nach 45 Min. oder erstem Fehler')
    ],
    evidence: text('Identifiant technique, autorisations signées, journal horodaté, résultat des assertions et autorité de retour arrière.', 'Technical identifier, signed approvals, timestamped log, assertion results and rollback authority.', 'Technische Kennung, unterzeichnete Freigaben, Zeitprotokoll, Prüfergebnisse und Rückkehrbefugnis.')
  },
  {
    id: 'EXC-04',
    icon: FolderArchive,
    title: text('Références GED gouvernées', 'Governed DMS references', 'Gesteuerte DMS-Referenzen'),
    affected: ['MIG-07', 'OUT-07'],
    recommendation: text(
      'Retenir deux conventions d’emplacement gouverné distinctes pour les migrations et l’outbox, à créer seulement après autorisation. M3S ne conservera qu’un identifiant documentaire opaque et autorisé ; aucun secret, nom de personne ou donnée sensible ne figurera dans le chemin ou le bundle frontend.',
      'Retain two distinct governed location conventions for migrations and the outbox, to be created only after authorisation. M3S will retain only an authorised opaque document identifier; no secret, personal name or sensitive data will appear in the path or frontend bundle.',
      'Zwei getrennte gesteuerte Ablagekonventionen für Migrationen und Outbox festhalten, die erst nach Freigabe anzulegen sind. M3S speichert nur eine autorisierte opake Dokumentkennung; kein Geheimnis, Personenname oder sensible Angabe erscheint im Pfad oder Frontend-Bundle.'
    ),
    values: [
      text('Convention retenue : GED/M3S/REF-01/MIGRATIONS/{année}/{lot}', 'Retained convention: GED/M3S/REF-01/MIGRATIONS/{year}/{package}', 'Festgehaltene Konvention: GED/M3S/REF-01/MIGRATIONS/{Jahr}/{Paket}'),
      text('Convention retenue : GED/M3S/REF-01/OUTBOX/{année}/{lot}', 'Retained convention: GED/M3S/REF-01/OUTBOX/{year}/{package}', 'Festgehaltene Konvention: GED/M3S/REF-01/OUTBOX/{Jahr}/{Paket}'),
      text('Référence applicative : identifiant opaque uniquement', 'Application reference: opaque identifier only', 'Anwendungsreferenz: nur opake Kennung')
    ],
    evidence: text('Références GED créées, droits d’accès, règle de conservation applicable et journal d’audit.', 'Created DMS references, access rights, applicable retention rule and audit log.', 'Erstellte DMS-Referenzen, Zugriffsrechte, anwendbare Aufbewahrungsregel und Auditprotokoll.')
  },
  {
    id: 'EXC-05',
    icon: RadioTower,
    title: text('Outbox, destinataires, reprise et supervision', 'Outbox, recipients, recovery and monitoring', 'Outbox, Empfänger, Wiederanlauf und Überwachung'),
    affected: ['OUT-02', 'OUT-03', 'OUT-04', 'OUT-05', 'OUT-06'],
    recommendation: text(
      'Placer l’outbox sous responsabilité IT & Support, avec destinataires explicitement autorisés par contrat d’événement. Garder le worker désactivé par défaut, imposer l’idempotence, quatre reprises à 1, 5, 15 et 60 minutes, puis quarantaine. Alerter dès un échec ou lorsqu’un message attend plus de 15 minutes.',
      'Place the outbox under IT & Support accountability, with recipients explicitly authorised by an event contract. Keep the worker disabled by default, require idempotency, use four retries at 1, 5, 15 and 60 minutes, then quarantine. Alert on any failure or when a message waits more than 15 minutes.',
      'Die Outbox IT & Support zuordnen und Empfänger ausdrücklich im Ereignisvertrag freigeben. Den Worker standardmässig deaktiviert halten, Idempotenz verlangen, vier Wiederholungen nach 1, 5, 15 und 60 Minuten, danach Quarantäne. Bei jedem Fehler oder einer Wartezeit über 15 Minuten alarmieren.'
    ),
    values: [
      text('Responsabilité retenue : IT & Support · destinataires sur liste autorisée', 'Retained accountability: IT & Support · allowlisted recipients', 'Festgehaltene Verantwortung: IT & Support · Empfänger auf Freigabeliste'),
      text('Worker prévu : désactivé par défaut · idempotent', 'Planned worker: disabled by default · idempotent', 'Geplanter Worker: standardmässig deaktiviert · idempotent'),
      text('Reprises retenues : 1 / 5 / 15 / 60 min · puis quarantaine', 'Retained retries: 1 / 5 / 15 / 60 min · then quarantine', 'Festgehaltene Wiederholungen: 1 / 5 / 15 / 60 Min. · danach Quarantäne'),
      text('Seuil d’alerte retenu : premier échec ou attente > 15 min', 'Retained alert threshold: first failure or wait > 15 min', 'Festgehaltene Alarmschwelle: erster Fehler oder Wartezeit > 15 Min.')
    ],
    evidence: text('Contrat d’événement, titulaire nommé, liste de destinataires, test d’idempotence, métriques et procédure de rejeu.', 'Event contract, named holder, recipient list, idempotency test, metrics and replay procedure.', 'Ereignisvertrag, benannter Träger, Empfängerliste, Idempotenztest, Metriken und Wiederholungsverfahren.')
  }
];

const COPY = {
  FR: {
    eyebrow: 'ARBITRAGE CONSOLIDÉ CONFIRMÉ · REF-01-G1-ARB-002 · V1.0 · 30-08-2026',
    title: 'Les cinq familles sont décidées en une seule réponse',
    intro: 'Cheikh confirme sans amendement les cinq recommandations de ARB-002. Elles deviennent des paramètres documentaires gouvernés pour préparer les preuves ; elles ne constituent ni des valeurs de production actives ni une autorisation d’exécution.',
    counters: [['Familles confirmées', '5', 'Treize lignes couvertes'], ['Décisions enregistrées', '1', 'REF-01-DEC-067'], ['Valeurs de production actives', '0', 'Preuves encore requises'], ['Ouvertures L2', '0', 'Maintien fermé']],
    labels: { affected: 'Lignes concernées', recommendation: 'Décision confirmée', values: 'Paramètres documentaires retenus', evidence: 'Preuves requises avant exécution' },
    status: 'CONFIRMÉ · PREUVES AVANT EXÉCUTION',
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-067', version: 'V1.0', status: 'ARB-002 confirmé dans son ensemble', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'REF-01-G1-ARB-002 V0.1 est confirmé sans amendement et promu en V1.0. Les cinq familles et leurs paramètres documentaires deviennent le cadre gouverné de préparation des preuves manquantes.', evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « Je confirme REF-01-G1-ARB-002 V0.1 dans son ensemble. »', limit: 'Cette décision ne sélectionne aucun fournisseur, compte, personne, secret ou environnement de production. Elle ne crée aucune sauvegarde, identité, référence GED, file, worker, alerte, donnée réelle ou dépense ; G1 reste ouverte et L2 fermé.' },
    bulkTitle: 'Résultat du Fast Track',
    bulk: 'Une seule confirmation humaine couvre les cinq familles. Les treize exceptions disposent maintenant de paramètres documentaires retenus, mais conservent leur besoin de preuve avant toute exécution.',
    next: 'DEC-068 à DEC-073 confirment COL-003 V1.0, REQ-002 V1.0, REC-002 V1.0, NAM-002 V1.0, AUT-003 V1.0 et M3S-INB-001 V1.0. Le prochain candidat est un pilote manuel à données fictives ; aucun import, traitement réel, contact, infrastructure ni action L2 n’est ouvert.',
    boundary: 'Aucune infrastructure, sauvegarde, identité, dossier GED, file, worker, alerte, donnée réelle ou dépense n’est créée. Les qualifications restent 9 synthétiques, 8 partielles et 5 ouvertes jusqu’au contrôle des preuves.'
  },
  EN: {
    eyebrow: 'CONFIRMED CONSOLIDATED DECISION · REF-01-G1-ARB-002 · V1.0 · 30 AUG 2026',
    title: 'All five families are decided in one response',
    intro: 'Cheikh confirms all five ARB-002 recommendations without amendment. They become governed documentary parameters for preparing evidence; they are neither active production values nor execution authorisation.',
    counters: [['Confirmed families', '5', 'Thirteen lines covered'], ['Recorded decisions', '1', 'REF-01-DEC-067'], ['Active production values', '0', 'Evidence still required'], ['L2 openings', '0', 'Kept closed']],
    labels: { affected: 'Affected lines', recommendation: 'Confirmed decision', values: 'Retained documentary parameters', evidence: 'Evidence required before execution' },
    status: 'CONFIRMED · EVIDENCE BEFORE EXECUTION',
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-067', version: 'V1.0', status: 'ARB-002 confirmed as a whole', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'REF-01-G1-ARB-002 V0.1 is confirmed without amendment and promoted to V1.0. Its five families and documentary parameters become the governed framework for preparing missing evidence.', evidence: 'Cheikh’s explicit confirmation in the 30 Aug 2026 session: “I confirm REF-01-G1-ARB-002 V0.1 as a whole.”', limit: 'This decision selects no provider, account, person, secret or production environment. It creates no backup, identity, DMS reference, queue, worker, alert, real data or expense; G1 remains open and L2 closed.' },
    bulkTitle: 'Fast Track result',
    bulk: 'One human confirmation covers all five families. The thirteen exceptions now have retained documentary parameters but still require evidence before any execution.',
    next: 'DEC-068 through DEC-073 confirm COL-003 V1.0, REQ-002 V1.0, REC-002 V1.0, NAM-002 V1.0, AUT-003 V1.0 and M3S-INB-001 V1.0. The next candidate is a manual fictional-data pilot; no import, real-data processing, contact, infrastructure or L2 action is opened.',
    boundary: 'No infrastructure, backup, identity, DMS folder, queue, worker, alert, real data or expense is created. Qualifications remain 9 synthetic, 8 partial and 5 open until evidence is checked.'
  },
  DE: {
    eyebrow: 'KONSOLIDIERTER ENTSCHEID BESTÄTIGT · REF-01-G1-ARB-002 · V1.0 · 30.08.2026',
    title: 'Alle fünf Familien sind mit einer Antwort entschieden',
    intro: 'Cheikh bestätigt alle fünf ARB-002-Empfehlungen ohne Änderung. Sie werden zu gesteuerten Dokumentationsparametern für die Nachweisvorbereitung; sie sind weder aktive Produktionswerte noch eine Ausführungsfreigabe.',
    counters: [['Bestätigte Familien', '5', 'Dreizehn Zeilen abgedeckt'], ['Erfasste Entscheide', '1', 'REF-01-DEC-067'], ['Aktive Produktionswerte', '0', 'Nachweise noch erforderlich'], ['L2-Öffnungen', '0', 'Bleibt geschlossen']],
    labels: { affected: 'Betroffene Zeilen', recommendation: 'Bestätigter Entscheid', values: 'Festgehaltene Dokumentationsparameter', evidence: 'Vor Ausführung erforderliche Nachweise' },
    status: 'BESTÄTIGT · NACHWEIS VOR AUSFÜHRUNG',
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-067', version: 'V1.0', status: 'ARB-002 als Ganzes bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'REF-01-G1-ARB-002 V0.1 wird ohne Änderung bestätigt und zu V1.0. Die fünf Familien und ihre Dokumentationsparameter bilden den gesteuerten Rahmen zur Vorbereitung fehlender Nachweise.', evidence: 'Ausdrückliche Bestätigung von Cheikh in der Sitzung vom 30.08.2026: „Ich bestätige REF-01-G1-ARB-002 V0.1 als Ganzes.“', limit: 'Dieser Entscheid wählt keinen Anbieter, Account, keine Person, kein Geheimnis und keine Produktionsumgebung. Er schafft keine Sicherung, Identität, DMS-Referenz, Queue, Worker, Warnung, Realdaten oder Ausgabe; G1 bleibt offen und L2 geschlossen.' },
    bulkTitle: 'Fast-Track-Ergebnis',
    bulk: 'Eine menschliche Bestätigung deckt alle fünf Familien ab. Die dreizehn Ausnahmen besitzen nun festgehaltene Dokumentationsparameter, benötigen aber weiterhin Nachweise vor jeder Ausführung.',
    next: 'DEC-068 bis DEC-073 bestätigen COL-003 V1.0, REQ-002 V1.0, REC-002 V1.0, NAM-002 V1.0, AUT-003 V1.0 und M3S-INB-001 V1.0. Der nächste Kandidat ist ein manueller Pilot mit fiktiven Daten; kein Import, keine Verarbeitung realer Daten, kein Kontakt, keine Infrastruktur oder L2-Aktion wird geöffnet.',
    boundary: 'Es werden keine Infrastruktur, Sicherung, Identität, DMS-Ablage, Queue, Worker, Warnung, Realdaten oder Ausgabe geschaffen. Die Qualifizierungen bleiben 9 synthetisch, 8 teilweise und 5 offen, bis die Nachweise geprüft sind.'
  }
};

const InstitutionalPeopleTeamsFastTrackExceptionArbitration = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-arb-002" data-testid="ref01-g1-fast-track-arbitration" className="scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
        <ShieldCheck className="shrink-0 text-violet-300" size={26} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <CheckCircle2 className="text-violet-300" size={19} aria-hidden="true" /> : <AlertTriangle className={index === 2 ? 'text-amber-300' : 'text-rose-300'} size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}
      </div>

      <div className="mt-4 divide-y divide-slate-700 rounded-md border border-slate-700">
        {FAMILIES.map((family) => {
          const Icon = family.icon;
          return (
            <article key={family.id} data-testid="ref01-g1-fast-track-exception-family" className="p-3 sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-start gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-violet-950/45 text-violet-300"><Icon size={20} aria-hidden="true" /></span><div><p className="text-xs font-semibold text-violet-300">{family.id}</p><h5 className="mt-1 text-sm font-semibold text-slate-100">{family.title[language] || family.title.FR}</h5></div></div>
                <span className="inline-flex self-start rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.status}</span>
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div><dt className="text-xs font-semibold text-violet-300">{t.labels.recommendation}</dt><dd className="mt-1 text-sm leading-6 text-slate-300">{family.recommendation[language] || family.recommendation.FR}</dd></div>
                <div><dt className="text-xs font-semibold text-slate-400">{t.labels.affected}</dt><dd className="mt-2 flex flex-wrap gap-2">{family.affected.map(id => <span key={id} className="rounded-md border border-slate-600 bg-slate-900/40 px-2 py-1 text-xs font-semibold text-sky-300">{id}</span>)}</dd></div>
              </dl>
              <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                <div><p className="text-xs font-semibold text-sky-300">{t.labels.values}</p><ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">{family.values.map(item => <li key={item.FR} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-sky-300" size={15} aria-hidden="true" />{item[language] || item.FR}</li>)}</ul></div>
                <div><p className="text-xs font-semibold text-amber-300">{t.labels.evidence}</p><p className="mt-2 text-xs leading-5 text-slate-300">{family.evidence[language] || family.evidence.FR}</p></div>
              </div>
            </article>
          );
        })}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-4"><h5 className="text-sm font-semibold text-violet-100">{t.bulkTitle}</h5><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.bulk}</p></div>
      <p className="mt-3 rounded-md border border-sky-700/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackExceptionArbitration;
