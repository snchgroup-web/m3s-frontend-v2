import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Braces,
  CalendarClock,
  CheckSquare2,
  FileKey2,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'BASE FONCTIONNELLE CONFIRMEE · REF-01-ML-001 · V1.0 · 26-08-2026',
    reference: 'Convention de référence : ML signifie micro-lot.',
    title: 'Rendre chaque changement daté, explicable et non destructif',
    intro: 'Ce contrat traduit le cycle validé par REF-01-DEC-002 en règles fonctionnelles vérifiables. Son contenu fonctionnel est confirmé par REF-01-DEC-007, sans créer de schéma, d’API d’écriture ou d’événement réel.',
    counters: [['Familles d’événements', '6', 'Contenu fonctionnel confirmé'], ['Objets logiques', '4', 'Personne, appartenance, équipe, collectif'], ['Métadonnées minimales', '12', 'Contenu fonctionnel confirmé'], ['Événements enregistrés', '0', 'Aucune donnée réelle dans ce lot']],
    eventTitle: 'Transitions fonctionnelles confirmées',
    eventIntro: 'Les libellés ci-dessous décrivent des effets métier. Ils ne constituent ni codes de base de données ni endpoints.',
    eventColumns: { event: 'Famille', object: 'Objet', before: 'État de départ', after: 'État résultant', guard: 'Règle bloquante' },
    eventLabels: { object: 'Objet', before: 'État de départ', after: 'État résultant', guard: 'Règle bloquante' },
    events: [
      ['Enregistrer / créer', 'Personne ou Équipe', 'Absent', 'Préparé', 'Aucune activation implicite ; identifiant stable requis.'],
      ['Activer / affecter', 'Appartenance, Équipe ou Responsabilité collective', 'Préparé ou inactif', 'Actif à la date d’effet', 'Validation Organisation & RH et fondement autorisé requis.'],
      ['Modifier / renommer', 'Personne ou Équipe', 'Version courante', 'Nouvelle version courante', 'Ancienne version, motif et provenance obligatoirement conservés.'],
      ['Transférer', 'Appartenance', 'Lien actif', 'Ancien lien clôturé + nouveau lien daté', 'Interdiction d’écraser ou de prolonger silencieusement le lien précédent.'],
      ['Suspendre / réactiver', 'Appartenance ou Équipe', 'Actif ou suspendu', 'Suspendu ou actif', 'Événement daté et motif contrôlé ; la personne n’est jamais supprimée.'],
      ['Clôturer / archiver', 'Les quatre objets', 'État courant', 'Clôturé ou archivé', 'Toute reprise exige un nouvel événement ; historique et preuve restent conservés.']
    ],
    metadataTitle: 'Douze métadonnées fonctionnelles',
    metadataIntro: 'Les champs sont obligatoires au niveau fonctionnel, sous réserve d’une règle gouvernée pour les cas réellement non applicables.',
    metadata: [
      ['Identifiant de l’événement', 'Unique et immuable.'], ['Type et identifiant de l’objet', 'Référence l’un des quatre objets.'],
      ['Événement et état résultant', 'Décrit le changement et son effet.'], ['Date d’effet', 'Date métier distincte de la saisie.'],
      ['Horodatage de saisie', 'Trace le moment d’enregistrement.'], ['Motif contrôlé', 'Utilise une famille validée.'],
      ['Demandeur autorisé', 'Initie sans valider seul.'], ['Validateur Organisation & RH', 'Confirme le sens et la date.'],
      ['Référence de preuve GED', 'Pointe vers la preuve autorisée.'], ['Version précédente', 'Obligatoire lorsqu’une version existe.'],
      ['Niveau de confidentialité', 'C2 minimum dans le cadre observé.'], ['Propagation technique', 'Indique oui, non ou en attente.']
    ],
    rolesTitle: 'Séparation des contrôles',
    roles: [
      ['Demandeur autorisé', 'Prépare la demande et son fondement.', 'Ne décide pas seul de l’entrée en vigueur.'],
      ['Organisation & RH', 'Valide objet, événement, date, motif et résultat.', 'Ne conserve pas la pièce à la place de la GED.'],
      ['IT', 'Contrôle la représentation et la propagation autorisée.', 'Ne devient ni propriétaire métier ni validateur RH.'],
      ['GED', 'Conserve décision, preuve, version et intégrité.', 'Ne devient pas l’annuaire opérationnel.']
    ],
    acceptanceTitle: 'Critères d’acceptation confirmés',
    acceptance: [
      'Un événement possède un identifiant unique qui ne change jamais.',
      'La date d’effet et l’horodatage de saisie restent distincts.',
      'Une modification crée une nouvelle version et conserve la précédente.',
      'Un transfert clôt l’ancien lien puis crée le nouveau lien daté.',
      'Aucun état préparé ne devient actif sans validation Organisation & RH.',
      'Une suspension ne supprime jamais la Personne ni ses périodes passées.',
      'Les vues globales n’exposent ni détail sensible du motif ni contenu de preuve.',
      'Aucune écriture réelle n’est autorisée avant validation du schéma, des droits, de la source et des tests.'
    ],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-007', version: 'V1.0', status: 'Contrat fonctionnel confirmé', author: 'Cheikh Ndiaye', date: '26-08-2026',
      decision: 'Le contenu fonctionnel de REF-01-ML-001 est confirmé : six transitions, douze métadonnées minimales, quatre rôles de contrôle et huit critères d’acceptation constituent la base fonctionnelle V1.0.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 26-08-2026 ; contrat candidat REF-01-ML-001 V0.1 publié par la PR frontend nº 192 au commit 72a16fb3.',
      limit: 'La décision n’autorise aucun cadrage technique, schéma, endpoint, rôle applicatif, droit, accès, événement réel, donnée personnelle, preuve GED, migration, automatisation, source maîtresse ou calcul de progression.'
    },
    status: 'Statut : base fonctionnelle V1.0 confirmée ; aucune implémentation technique autorisée.',
    next: 'Prochain arbitrage : décider séparément si un cadrage technique candidat peut être préparé, toujours sans implémentation.',
    boundary: 'Limite : cette confirmation ne crée aucun identifiant réel, table, endpoint, rôle applicatif, droit, accès, événement, preuve GED, migration, automatisation, source maîtresse ou taux de progression.'
  },
  EN: {
    eyebrow: 'CONFIRMED FUNCTIONAL BASELINE · REF-01-ML-001 · V1.0 · 26 AUG 2026',
    reference: 'Reference convention: ML means micro-package.',
    title: 'Make every change dated, explainable and non-destructive',
    intro: 'This contract turns the lifecycle validated by REF-01-DEC-002 into verifiable functional rules. Its functional content is confirmed by REF-01-DEC-007 without creating a schema, write API or real event.',
    counters: [['Event families', '6', 'Functional content confirmed'], ['Logical objects', '4', 'Person, membership, team, collective'], ['Minimum metadata', '12', 'Functional content confirmed'], ['Recorded events', '0', 'No real data in this package']],
    eventTitle: 'Confirmed functional transitions',
    eventIntro: 'The labels below describe business effects. They are neither database codes nor endpoints.',
    eventColumns: { event: 'Family', object: 'Object', before: 'Starting state', after: 'Resulting state', guard: 'Blocking rule' },
    eventLabels: { object: 'Object', before: 'Starting state', after: 'Resulting state', guard: 'Blocking rule' },
    events: [
      ['Register / create', 'Person or Team', 'Absent', 'Prepared', 'No implicit activation; stable identifier required.'],
      ['Activate / assign', 'Membership, Team or Collective responsibility', 'Prepared or inactive', 'Active on effective date', 'Organisation & HR validation and authorised basis required.'],
      ['Update / rename', 'Person or Team', 'Current version', 'New current version', 'Former version, reason and provenance must be retained.'],
      ['Transfer', 'Membership', 'Active link', 'Former link closed + new dated link', 'The former link may not be overwritten or silently extended.'],
      ['Suspend / reactivate', 'Membership or Team', 'Active or suspended', 'Suspended or active', 'Dated event and controlled reason; the Person is never deleted.'],
      ['Close / archive', 'All four objects', 'Current state', 'Closed or archived', 'Any reopening requires a new event; history and evidence remain retained.']
    ],
    metadataTitle: 'Twelve functional metadata fields',
    metadataIntro: 'Fields are functionally mandatory, subject to a governed rule for genuinely non-applicable cases.',
    metadata: [
      ['Event identifier', 'Unique and immutable.'], ['Object type and identifier', 'References one of the four objects.'],
      ['Event and resulting state', 'Describes the change and its effect.'], ['Effective date', 'Business date distinct from capture.'],
      ['Capture timestamp', 'Traces the recording time.'], ['Controlled reason', 'Uses a validated family.'],
      ['Authorised requester', 'Initiates without validating alone.'], ['Organisation & HR validator', 'Confirms meaning and date.'],
      ['DMS evidence reference', 'Points to authorised evidence.'], ['Previous version', 'Required when a version exists.'],
      ['Confidentiality level', 'C2 minimum in the observed framework.'], ['Technical propagation', 'States yes, no or pending.']
    ],
    rolesTitle: 'Segregation of controls',
    roles: [
      ['Authorised requester', 'Prepares the request and its basis.', 'Does not decide effectiveness alone.'],
      ['Organisation & HR', 'Validates object, event, date, reason and outcome.', 'Does not retain the record instead of DMS.'],
      ['IT', 'Controls representation and authorised propagation.', 'Becomes neither business owner nor HR validator.'],
      ['DMS', 'Retains decision, evidence, version and integrity.', 'Does not become the operational directory.']
    ],
    acceptanceTitle: 'Confirmed acceptance criteria',
    acceptance: [
      'An event has a unique identifier that never changes.',
      'Effective date and capture timestamp remain distinct.',
      'An update creates a new version and retains the previous one.',
      'A transfer closes the former link before creating the new dated link.',
      'No prepared state becomes active without Organisation & HR validation.',
      'A suspension never deletes the Person or past periods.',
      'Global views expose neither sensitive reason detail nor evidence content.',
      'No real write is authorised before validation of schema, rights, source and tests.'
    ],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-007', version: 'V1.0', status: 'Functional contract confirmed', author: 'Cheikh Ndiaye', date: '26 Aug 2026',
      decision: 'The functional content of REF-01-ML-001 is confirmed: six transitions, twelve minimum metadata fields, four control roles and eight acceptance criteria form functional baseline V1.0.',
      evidence: 'Explicit confirmation by Cheikh during the 26 Aug 2026 session; candidate contract REF-01-ML-001 V0.1 published through frontend PR 192 at commit 72a16fb3.',
      limit: 'The decision authorises no technical framing, schema, endpoint, application role, right, access, real event, personal data, DMS evidence, migration, automation, master source or progress calculation.'
    },
    status: 'Status: functional baseline V1.0 confirmed; no technical implementation authorised.',
    next: 'Next review: decide separately whether candidate technical framing may be prepared, still without implementation.',
    boundary: 'Boundary: this confirmation creates no real identifier, table, endpoint, application role, right, access, event, DMS evidence, migration, automation, master source or progress rate.'
  },
  DE: {
    eyebrow: 'BESTAETIGTE FUNKTIONALE BASIS · REF-01-ML-001 · V1.0 · 26.08.2026',
    reference: 'Referenzkonvention: ML bedeutet Mikrolos.',
    title: 'Jede Änderung datiert, erklärbar und nicht destruktiv machen',
    intro: 'Dieser Vertrag übersetzt den mit REF-01-DEC-002 validierten Lebenszyklus in prüfbare funktionale Regeln. Sein funktionaler Inhalt ist mit REF-01-DEC-007 bestätigt, ohne Schema, Schreib-API oder reales Ereignis zu erstellen.',
    counters: [['Ereignisfamilien', '6', 'Funktionaler Inhalt bestätigt'], ['Logische Objekte', '4', 'Person, Mitgliedschaft, Team, Kollektiv'], ['Mindestmetadaten', '12', 'Funktionaler Inhalt bestätigt'], ['Erfasste Ereignisse', '0', 'Keine realen Daten in diesem Los']],
    eventTitle: 'Bestätigte funktionale Übergänge',
    eventIntro: 'Die folgenden Bezeichnungen beschreiben fachliche Wirkungen. Sie sind weder Datenbankcodes noch Endpoints.',
    eventColumns: { event: 'Familie', object: 'Objekt', before: 'Ausgangsstand', after: 'Resultierender Stand', guard: 'Sperrregel' },
    eventLabels: { object: 'Objekt', before: 'Ausgangsstand', after: 'Resultierender Stand', guard: 'Sperrregel' },
    events: [
      ['Erfassen / erstellen', 'Person oder Team', 'Nicht vorhanden', 'Vorbereitet', 'Keine implizite Aktivierung; stabile Kennung erforderlich.'],
      ['Aktivieren / zuweisen', 'Mitgliedschaft, Team oder kollektive Verantwortung', 'Vorbereitet oder inaktiv', 'Zum Wirksamkeitsdatum aktiv', 'Validierung Organisation & Personal und autorisierte Grundlage erforderlich.'],
      ['Ändern / umbenennen', 'Person oder Team', 'Aktuelle Version', 'Neue aktuelle Version', 'Frühere Version, Grund und Herkunft müssen bewahrt werden.'],
      ['Wechseln', 'Mitgliedschaft', 'Aktiver Link', 'Früherer Link geschlossen + neuer datierter Link', 'Der frühere Link darf nicht überschrieben oder still verlängert werden.'],
      ['Suspendieren / reaktivieren', 'Mitgliedschaft oder Team', 'Aktiv oder suspendiert', 'Suspendiert oder aktiv', 'Datiertes Ereignis und kontrollierter Grund; die Person wird nie gelöscht.'],
      ['Schliessen / archivieren', 'Alle vier Objekte', 'Aktueller Stand', 'Geschlossen oder archiviert', 'Jede Wiederaufnahme erfordert ein neues Ereignis; Historie und Nachweis bleiben erhalten.']
    ],
    metadataTitle: 'Zwölf funktionale Metadatenfelder',
    metadataIntro: 'Die Felder sind funktional zwingend, vorbehaltlich einer gesteuerten Regel für tatsächlich nicht anwendbare Fälle.',
    metadata: [
      ['Ereigniskennung', 'Eindeutig und unveränderlich.'], ['Objekttyp und Kennung', 'Referenziert eines der vier Objekte.'],
      ['Ereignis und Ergebnisstand', 'Beschreibt Änderung und Wirkung.'], ['Wirksamkeitsdatum', 'Fachdatum getrennt von der Erfassung.'],
      ['Erfassungszeitpunkt', 'Protokolliert den Aufnahmezeitpunkt.'], ['Kontrollierter Grund', 'Verwendet eine validierte Familie.'],
      ['Autorisierter Antragsteller', 'Initiiert, ohne allein zu validieren.'], ['Validierung Organisation & Personal', 'Bestätigt Bedeutung und Datum.'],
      ['DMS-Nachweisreferenz', 'Verweist auf autorisierten Nachweis.'], ['Vorherige Version', 'Erforderlich, wenn eine Version besteht.'],
      ['Vertraulichkeitsstufe', 'Mindestens C2 im beobachteten Rahmen.'], ['Technische Weitergabe', 'Gibt ja, nein oder ausstehend an.']
    ],
    rolesTitle: 'Trennung der Kontrollen',
    roles: [
      ['Autorisierter Antragsteller', 'Bereitet Antrag und Grundlage vor.', 'Entscheidet nicht allein über Wirksamkeit.'],
      ['Organisation & Personal', 'Validiert Objekt, Ereignis, Datum, Grund und Ergebnis.', 'Bewahrt die Unterlage nicht anstelle des DMS.'],
      ['IT', 'Kontrolliert Darstellung und autorisierte Weitergabe.', 'Wird weder Fachverantwortung noch Personalvalidierung.'],
      ['DMS', 'Bewahrt Entscheid, Nachweis, Version und Integrität.', 'Wird nicht zum operativen Verzeichnis.']
    ],
    acceptanceTitle: 'Bestätigte Abnahmekriterien',
    acceptance: [
      'Ein Ereignis besitzt eine eindeutige Kennung, die sich nie ändert.',
      'Wirksamkeitsdatum und Erfassungszeitpunkt bleiben getrennt.',
      'Eine Änderung erstellt eine neue Version und bewahrt die vorherige.',
      'Ein Wechsel schliesst den früheren Link vor dem neuen datierten Link.',
      'Kein vorbereiteter Stand wird ohne Validierung Organisation & Personal aktiv.',
      'Eine Suspendierung löscht weder Person noch frühere Zeiträume.',
      'Globale Ansichten zeigen weder sensible Grunddetails noch Nachweisinhalte.',
      'Keine reale Schreiboperation vor Validierung von Schema, Rechten, Quelle und Tests.'
    ],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Dokumentierter Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-007', version: 'V1.0', status: 'Funktionaler Vertrag bestätigt', author: 'Cheikh Ndiaye', date: '26.08.2026',
      decision: 'Der funktionale Inhalt von REF-01-ML-001 ist bestätigt: sechs Übergänge, zwölf Mindestmetadatenfelder, vier Kontrollrollen und acht Abnahmekriterien bilden die funktionale Basis V1.0.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 26.08.2026; Vertragskandidat REF-01-ML-001 V0.1 mit Frontend-PR Nr. 192 am Commit 72a16fb3 veröffentlicht.',
      limit: 'Der Entscheid autorisiert keine technische Ausgestaltung, kein Schema, keinen Endpoint, keine Anwendungsrolle, kein Recht, keinen Zugriff, kein reales Ereignis, keine Personendaten, keinen DMS-Nachweis, keine Migration, Automatisierung, Masterquelle oder Fortschrittsberechnung.'
    },
    status: 'Stand: funktionale Basis V1.0 bestätigt; keine technische Umsetzung autorisiert.',
    next: 'Nächster Entscheid: getrennt entscheiden, ob eine technische Kandidatenausgestaltung weiterhin ohne Umsetzung vorbereitet werden darf.',
    boundary: 'Grenze: Diese Bestätigung erstellt keine reale Kennung, Tabelle, keinen Endpoint, keine Anwendungsrolle, kein Recht, keinen Zugriff, kein Ereignis, keinen DMS-Nachweis, keine Migration, Automatisierung, Masterquelle oder Fortschrittsquote.'
  }
};

const EventCard = ({ row, t }) => (
  <article className="m3s-raised p-3" data-testid="ref01-event-card">
    <h6 className="text-sm font-semibold text-slate-100">{row[0]}</h6>
    <dl className="mt-3 space-y-3 border-t border-slate-700 pt-3">
      <div><dt className="text-xs font-semibold text-slate-400">{t.eventLabels.object}</dt><dd className="mt-1 text-sm text-cyan-300">{row[1]}</dd></div>
      <div><dt className="text-xs font-semibold text-slate-400">{t.eventLabels.before}</dt><dd className="mt-1 text-sm text-slate-300">{row[2]}</dd></div>
      <div><dt className="text-xs font-semibold text-slate-400">{t.eventLabels.after}</dt><dd className="mt-1 text-sm text-emerald-200">{row[3]}</dd></div>
      <div><dt className="text-xs font-semibold text-amber-300">{t.eventLabels.guard}</dt><dd className="mt-1 text-sm leading-5 text-slate-300">{row[4]}</dd></div>
    </dl>
  </article>
);

const InstitutionalPeopleTeamsEventContract = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [GitBranch, Braces, FileKey2, ShieldCheck];

  return (
    <section id="institutional-ref01-event-contract" className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-4 scroll-mt-24" aria-labelledby="institutional-ref01-event-contract-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p>
          <h6 id="institutional-ref01-event-contract-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6>
          <p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p>
          <p className="mt-2 text-xs font-semibold text-cyan-200">{t.reference}</p>
        </div>
        <CalendarClock className="shrink-0 text-cyan-300" size={24} aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {t.counters.map(([label, value, note], index) => {
          const Icon = CounterIcons[index];
          return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div><Icon className={index === 3 ? 'text-amber-300' : 'text-cyan-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>;
        })}
      </div>

      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} className="mt-4" />

      <section className="mt-4" aria-labelledby="ref01-event-transitions-title">
        <h6 id="ref01-event-transitions-title" className="text-sm font-semibold text-slate-100">{t.eventTitle}</h6>
        <p className="mt-1 text-xs leading-5 text-slate-400">{t.eventIntro}</p>
        <div className="mt-3 hidden overflow-x-auto rounded-md border border-slate-700 xl:block">
          <table className="w-full min-w-[1320px] border-collapse text-left text-sm">
            <thead className="m3s-cns03-inventory-head bg-slate-900/70 text-xs uppercase text-slate-300"><tr><th className="px-3 py-3 font-semibold">{t.eventColumns.event}</th><th className="px-3 py-3 font-semibold">{t.eventColumns.object}</th><th className="px-3 py-3 font-semibold">{t.eventColumns.before}</th><th className="px-3 py-3 font-semibold">{t.eventColumns.after}</th><th className="px-3 py-3 font-semibold">{t.eventColumns.guard}</th></tr></thead>
            <tbody className="divide-y divide-slate-700 bg-slate-950/15">{t.events.map(row => <tr key={row[0]} className="align-top" data-testid="ref01-event-row"><th scope="row" className="px-3 py-3 font-semibold text-slate-100">{row[0]}</th><td className="px-3 py-3 text-cyan-300">{row[1]}</td><td className="px-3 py-3 text-slate-300">{row[2]}</td><td className="px-3 py-3 text-emerald-200">{row[3]}</td><td className="px-3 py-3 leading-5 text-amber-100">{row[4]}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 xl:hidden">{t.events.map(row => <EventCard key={row[0]} row={row} t={t} />)}</div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-event-metadata-title">
          <div className="flex items-center gap-2"><FileKey2 className="text-cyan-300" size={18} aria-hidden="true" /><h6 id="ref01-event-metadata-title" className="text-sm font-semibold text-slate-100">{t.metadataTitle}</h6></div>
          <p className="mt-2 text-xs leading-5 text-slate-400">{t.metadataIntro}</p>
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">{t.metadata.map(([label, detail], index) => <div key={label} className="m3s-raised p-3" data-testid="ref01-metadata-field"><dt className="text-xs font-semibold text-cyan-300">{index + 1}. {label}</dt><dd className="mt-1 text-xs leading-5 text-slate-400">{detail}</dd></div>)}</dl>
        </section>

        <div className="space-y-4">
          <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-event-roles-title">
            <div className="flex items-center gap-2"><ShieldCheck className="text-violet-300" size={18} aria-hidden="true" /><h6 id="ref01-event-roles-title" className="text-sm font-semibold text-slate-100">{t.rolesTitle}</h6></div>
            <div className="mt-3 space-y-3">{t.roles.map(([role, does, limit]) => <article key={role} className="m3s-raised p-3"><h6 className="text-xs font-semibold text-violet-200">{role}</h6><p className="mt-2 text-xs leading-5 text-slate-300">{does}</p><p className="mt-2 border-t border-slate-700 pt-2 text-xs leading-5 text-amber-100">{limit}</p></article>)}</div>
          </section>

          <section className="rounded-md border border-slate-700 p-4" aria-labelledby="ref01-event-acceptance-title">
            <div className="flex items-center gap-2"><CheckSquare2 className="text-emerald-300" size={18} aria-hidden="true" /><h6 id="ref01-event-acceptance-title" className="text-sm font-semibold text-slate-100">{t.acceptanceTitle}</h6></div>
            <ol className="mt-3 space-y-2">{t.acceptance.map((criterion, index) => <li key={criterion} className="flex items-start gap-2 text-xs leading-5 text-slate-300" data-testid="ref01-acceptance-criterion"><span className="font-semibold text-emerald-300">{index + 1}.</span>{criterion}</li>)}</ol>
          </section>
        </div>
      </div>

      <p className="mt-4 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3 text-xs font-semibold leading-5 text-emerald-200">{t.status}</p>
      <p className="mt-3 flex items-start gap-2 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-200"><ArrowRight className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.next}</p>
      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsEventContract;
