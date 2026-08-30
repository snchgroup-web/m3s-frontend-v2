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
      text('Cible : PostgreSQL administré · fournisseur non sélectionné', 'Target: managed PostgreSQL · provider not selected', 'Ziel: verwaltetes PostgreSQL · Anbieter nicht ausgewählt'),
      text('Environnements : sandbox synthétique · préproduction dédiée · production fermée', 'Environments: synthetic sandbox · dedicated staging · production closed', 'Umgebungen: synthetische Sandbox · eigene Vorproduktion · Produktion geschlossen'),
      text('Responsable : IT & Support · exécutant nominatif à désigner', 'Owner: IT & Support · named operator to designate', 'Verantwortung: IT & Support · ausführende Person zu bestimmen')
    ],
    evidence: text('Compte 2SG autorisé, offre retenue, région d’hébergement, responsable nominatif et séparation des environnements.', 'Authorised 2SG account, selected offer, hosting region, named owner and environment separation.', 'Autorisiertes 2SG-Konto, gewähltes Angebot, Hosting-Region, namentliche Verantwortung und Umgebungstrennung.')
  },
  {
    id: 'EXC-02',
    icon: Clock3,
    title: text('Continuité, sauvegarde et restauration', 'Continuity, backup and restoration', 'Kontinuität, Sicherung und Wiederherstellung'),
    affected: ['PG-04', 'PG-05', 'PG-06'],
    recommendation: text(
      'Adopter comme base candidate un RPO de 24 heures et un RTO de 8 heures, avec sauvegarde quotidienne chiffrée conservée 30 jours. Exiger une restauration synthétique avant toute migration, puis un contrôle trimestriel après mise en service.',
      'Adopt a 24-hour RPO and 8-hour RTO as candidate baselines, with an encrypted daily backup retained for 30 days. Require a synthetic restore before any migration, then quarterly testing after go-live.',
      'Als Kandidatenbasis RPO 24 Stunden und RTO 8 Stunden mit täglich verschlüsselter, 30 Tage aufbewahrter Sicherung festhalten. Vor jeder Migration eine synthetische Wiederherstellung und nach Inbetriebnahme eine vierteljährliche Prüfung verlangen.'
    ),
    values: [
      text('Seuils candidats : RPO ≤ 24 h · RTO ≤ 8 h', 'Candidate targets: RPO ≤ 24 h · RTO ≤ 8 h', 'Kandidatenziele: RPO ≤ 24 Std. · RTO ≤ 8 Std.'),
      text('Sauvegarde candidate : quotidienne · chiffrée · conservation 30 jours', 'Candidate backup: daily · encrypted · 30-day retention', 'Kandidatensicherung: täglich · verschlüsselt · 30 Tage Aufbewahrung'),
      text('Test candidat : avant migration puis chaque trimestre', 'Candidate test: before migration, then quarterly', 'Kandidatentest: vor Migration, danach vierteljährlich')
    ],
    evidence: text('Rapport de sauvegarde, journal de restauration, temps mesuré et référence GED gouvernée.', 'Backup report, restore log, measured time and governed DMS reference.', 'Sicherungsbericht, Wiederherstellungsprotokoll, gemessene Zeit und gesteuerte DMS-Referenz.')
  },
  {
    id: 'EXC-03',
    icon: KeyRound,
    title: text('Identité de déploiement et fenêtre de migration', 'Deployment identity and migration window', 'Bereitstellungsidentität und Migrationsfenster'),
    affected: ['MIG-03', 'MIG-05'],
    recommendation: text(
      'Utiliser une identité technique dédiée et limitée, distincte des comptes humains, avec validation à deux personnes. Prévoir une fenêtre candidate de 60 minutes hors période critique, arrêt automatique à 45 minutes ou à la première assertion rejetée.',
      'Use a dedicated least-privilege technical identity, separate from human accounts, with two-person approval. Use a candidate 60-minute off-peak window, with automatic stop at 45 minutes or on the first failed assertion.',
      'Eine eigene, minimal berechtigte technische Identität getrennt von Personenkonten mit Zwei-Personen-Freigabe verwenden. Ein 60-minütiges Kandidatenfenster ausserhalb kritischer Zeiten mit automatischem Stopp nach 45 Minuten oder beim ersten Fehler vorsehen.'
    ),
    values: [
      text('Identité candidate : compte de service dédié · moindre privilège', 'Candidate identity: dedicated service account · least privilege', 'Kandidatenidentität: eigenes Dienstkonto · geringste Berechtigung'),
      text('Contrôle : revue et autorisation à deux personnes', 'Control: two-person review and approval', 'Kontrolle: Prüfung und Freigabe durch zwei Personen'),
      text('Fenêtre candidate : 60 min · arrêt à 45 min ou au premier échec', 'Candidate window: 60 min · stop at 45 min or first failure', 'Kandidatenfenster: 60 Min. · Stopp nach 45 Min. oder erstem Fehler')
    ],
    evidence: text('Identifiant technique, autorisations signées, journal horodaté, résultat des assertions et autorité de retour arrière.', 'Technical identifier, signed approvals, timestamped log, assertion results and rollback authority.', 'Technische Kennung, unterzeichnete Freigaben, Zeitprotokoll, Prüfergebnisse und Rückkehrbefugnis.')
  },
  {
    id: 'EXC-04',
    icon: FolderArchive,
    title: text('Références GED gouvernées', 'Governed DMS references', 'Gesteuerte DMS-Referenzen'),
    affected: ['MIG-07', 'OUT-07'],
    recommendation: text(
      'Créer deux emplacements gouvernés distincts pour les migrations et l’outbox. M3S ne conservera qu’un identifiant documentaire opaque et autorisé ; aucun secret, nom de personne ou donnée sensible ne figurera dans le chemin ou le bundle frontend.',
      'Create two distinct governed locations for migrations and the outbox. M3S will retain only an authorised opaque document identifier; no secret, personal name or sensitive data will appear in the path or frontend bundle.',
      'Zwei getrennte gesteuerte Ablagen für Migrationen und Outbox schaffen. M3S speichert nur eine autorisierte opake Dokumentkennung; kein Geheimnis, Personenname oder sensible Angabe erscheint im Pfad oder Frontend-Bundle.'
    ),
    values: [
      text('Convention candidate : GED/M3S/REF-01/MIGRATIONS/{année}/{lot}', 'Candidate convention: GED/M3S/REF-01/MIGRATIONS/{year}/{package}', 'Kandidatenkonvention: GED/M3S/REF-01/MIGRATIONS/{Jahr}/{Paket}'),
      text('Convention candidate : GED/M3S/REF-01/OUTBOX/{année}/{lot}', 'Candidate convention: GED/M3S/REF-01/OUTBOX/{year}/{package}', 'Kandidatenkonvention: GED/M3S/REF-01/OUTBOX/{Jahr}/{Paket}'),
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
      text('Titulaire candidat : IT & Support · destinataires sur liste autorisée', 'Candidate owner: IT & Support · allowlisted recipients', 'Kandidatenträger: IT & Support · Empfänger auf Freigabeliste'),
      text('Worker candidat : désactivé par défaut · idempotent', 'Candidate worker: disabled by default · idempotent', 'Kandidaten-Worker: standardmässig deaktiviert · idempotent'),
      text('Reprises candidates : 1 / 5 / 15 / 60 min · puis quarantaine', 'Candidate retries: 1 / 5 / 15 / 60 min · then quarantine', 'Kandidatenwiederholungen: 1 / 5 / 15 / 60 Min. · danach Quarantäne'),
      text('Alerte candidate : premier échec ou attente > 15 min', 'Candidate alert: first failure or wait > 15 min', 'Kandidatenalarm: erster Fehler oder Wartezeit > 15 Min.')
    ],
    evidence: text('Contrat d’événement, titulaire nommé, liste de destinataires, test d’idempotence, métriques et procédure de rejeu.', 'Event contract, named holder, recipient list, idempotency test, metrics and replay procedure.', 'Ereignisvertrag, benannter Träger, Empfängerliste, Idempotenztest, Metriken und Wiederholungsverfahren.')
  }
];

const COPY = {
  FR: {
    eyebrow: 'ARBITRAGE CONSOLIDÉ CANDIDAT · REF-01-G1-ARB-002 · V0.1 · 30-08-2026',
    title: 'Décider les cinq familles en une seule réponse',
    intro: 'Les recommandations ci-dessous transforment les treize exceptions de QLF-001 en cinq choix cohérents. Elles sont préremplies pour accélérer la revue, mais restent candidates : aucune valeur n’est active ni enregistrée comme décision de Cheikh.',
    counters: [['Familles regroupées', '5', 'Treize lignes couvertes'], ['Réponses attendues', '1', 'Confirmer tout ou amender seulement'], ['Valeurs actives', '0', 'Candidats uniquement'], ['Ouvertures L2', '0', 'Maintien fermé']],
    labels: { affected: 'Lignes concernées', recommendation: 'Recommandation préremplie', values: 'Valeurs candidates', evidence: 'Preuves requises avant exécution' },
    status: 'CANDIDAT · CONFIRMATION HUMAINE REQUISE',
    bulkTitle: 'Formule Fast Track proposée',
    bulk: 'Confirmer : « Je confirme REF-01-G1-ARB-002 V0.1 dans son ensemble. » Amender : indiquer seulement l’identifiant EXC concerné et la valeur à remplacer. Les autres recommandations restent inchangées.',
    next: 'Après confirmation, une seule décision REF-01-DEC-067 pourra promouvoir ARB-002 en V1.0 et ouvrir la collecte de preuves, sans ouvrir L2 ni autoriser une mise en production.',
    boundary: 'Les seuils, chemins, délais et responsabilités nominatives restent des propositions. Aucune infrastructure, sauvegarde, identité, dossier GED, file, worker, alerte, donnée réelle ou dépense n’est créée.'
  },
  EN: {
    eyebrow: 'CANDIDATE CONSOLIDATED DECISION · REF-01-G1-ARB-002 · V0.1 · 30 AUG 2026',
    title: 'Decide all five families in one response',
    intro: 'The recommendations below turn the thirteen QLF-001 exceptions into five coherent choices. They are prefilled to accelerate review but remain candidates: no value is active or recorded as Cheikh’s decision.',
    counters: [['Grouped families', '5', 'Thirteen lines covered'], ['Expected responses', '1', 'Confirm all or amend only'], ['Active values', '0', 'Candidates only'], ['L2 openings', '0', 'Kept closed']],
    labels: { affected: 'Affected lines', recommendation: 'Prefilled recommendation', values: 'Candidate values', evidence: 'Evidence required before execution' },
    status: 'CANDIDATE · HUMAN CONFIRMATION REQUIRED',
    bulkTitle: 'Proposed Fast Track wording',
    bulk: 'Confirm: “I confirm REF-01-G1-ARB-002 V0.1 as a whole.” Amend: state only the affected EXC identifier and the replacement value. All other recommendations remain unchanged.',
    next: 'After confirmation, one REF-01-DEC-067 decision may promote ARB-002 to V1.0 and open evidence collection, without opening L2 or authorising production.',
    boundary: 'Thresholds, paths, delays and named responsibilities remain proposals. No infrastructure, backup, identity, DMS folder, queue, worker, alert, real data or expense is created.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR KONSOLIDIERTEN ENTSCHEID · REF-01-G1-ARB-002 · V0.1 · 30.08.2026',
    title: 'Alle fünf Familien mit einer Antwort entscheiden',
    intro: 'Die nachstehenden Empfehlungen bündeln die dreizehn QLF-001-Ausnahmen in fünf kohärente Entscheide. Sie sind zur Beschleunigung vorausgefüllt, bleiben aber Kandidaten: Kein Wert ist aktiv oder als Entscheid von Cheikh dokumentiert.',
    counters: [['Gebündelte Familien', '5', 'Dreizehn Zeilen abgedeckt'], ['Erwartete Antworten', '1', 'Alles bestätigen oder nur ändern'], ['Aktive Werte', '0', 'Nur Kandidaten'], ['L2-Öffnungen', '0', 'Bleibt geschlossen']],
    labels: { affected: 'Betroffene Zeilen', recommendation: 'Vorausgefüllte Empfehlung', values: 'Kandidatenwerte', evidence: 'Vor Ausführung erforderliche Nachweise' },
    status: 'KANDIDAT · MENSCHLICHE BESTÄTIGUNG ERFORDERLICH',
    bulkTitle: 'Vorgeschlagene Fast-Track-Formulierung',
    bulk: 'Bestätigen: „Ich bestätige REF-01-G1-ARB-002 V0.1 als Ganzes.“ Ändern: Nur die betroffene EXC-Kennung und den Ersatzwert nennen. Alle übrigen Empfehlungen bleiben unverändert.',
    next: 'Nach Bestätigung kann ein einziger Entscheid REF-01-DEC-067 ARB-002 zu V1.0 machen und die Nachweissammlung öffnen, ohne L2 oder Produktion freizugeben.',
    boundary: 'Schwellen, Pfade, Fristen und namentliche Verantwortungen bleiben Vorschläge. Es werden keine Infrastruktur, Sicherung, Identität, DMS-Ablage, Queue, Worker, Warnung, Realdaten oder Ausgabe geschaffen.'
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
                <span className="inline-flex self-start rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.status}</span>
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

      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-4"><h5 className="text-sm font-semibold text-violet-100">{t.bulkTitle}</h5><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.bulk}</p></div>
      <p className="mt-3 rounded-md border border-sky-700/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsFastTrackExceptionArbitration;
