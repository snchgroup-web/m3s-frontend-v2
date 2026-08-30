import React from 'react';
import { AlertTriangle, CheckCircle2, Inbox, LockKeyhole, SendHorizontal, ShieldCheck } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CADRE CONFIRMÉ · M3S-INB-001 · V1.0 · 30-08-2026',
    title: 'Boîte d’entrée M3S · un cadre confirmé, encore vide et non opérationnel',
    intro: 'DEC-073 confirme le cadre en lecture seule qui doit, à terme, transformer chaque e-mail, document, média ou demande autorisée en élément à qualifier puis à rattacher. Aucun registre réel n’est alimenté tant que le backend, les droits et la GED ne sont pas raccordés et autorisés séparément.',
    counters: [['Cadre confirmé', '1/1', 'Structure documentaire uniquement'], ['Entrées réelles', '0', 'Aucune donnée traitée'], ['Imports actifs', '0', 'Aucun connecteur'], ['Automatisations', '0', 'Aucun traitement silencieux']],
    fieldsTitle: 'Champs minimaux gouvernés',
    fields: ['Source et canal', 'Date de réception', 'Catégorie et sensibilité', 'Portefeuille, dossier, projet et tâche', 'Fonction propriétaire', 'Responsable autorisé', 'Statut et prochaine action', 'Échéance', 'Preuve ou lien GED', 'Empreinte anti-doublon'],
    statesTitle: 'Cycle de traitement',
    states: ['Reçu', 'À qualifier', 'Affecté', 'Planifié', 'Traité', 'Archivé'],
    fastTrack: 'Traitement Fast Track',
    fastTrackBody: 'Les entrées homogènes sont regroupées par lot ; seules les exceptions, doublons, sensibilités élevées ou affectations incertaines sont soumises à décision humaine.',
    allowed: 'Préparation suivante permise',
    allowedBody: 'Cadrer un pilote à données fictives ; toute saisie réelle ou dépôt sécurisé exigera une autorisation technique et humaine distincte.',
    boundariesTitle: 'Frontières avant mise en service',
    boundaries: ['Aucune lecture automatique de WhatsApp.', 'Aucun import automatique des e-mails.', 'Aucune donnée personnelle réelle intégrée au bundle frontend.', 'Backend, RBAC et GED requis avant toute automatisation.', 'Aucun compteur affiché avant disponibilité d’une source fiable.'],
    recordLabels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: { id: 'REF-01-DEC-073', version: 'V1.0', status: 'M3S-INB-001 confirmé en lecture seule', author: 'Cheikh Ndiaye', date: '30-08-2026', decision: 'M3S-INB-001 V0.1 est confirmé sans amendement et promu en V1.0 comme cadre en lecture seule de la Boîte d’entrée M3S.', evidence: 'Confirmation anticipée explicite de Cheikh dans la session du 30-08-2026 : « tu peux continuer direct sur le prochain que je confirme en avance » ; le prochain arbitrage affiché était M3S-INB-001 V0.1.', limit: 'La décision confirme uniquement le cadre documentaire. Elle n’active aucun import, connecteur, automatisme, traitement de données réelles, registre opérationnel, accès, dépense ou action L2.' },
    decisionTitle: 'Résultat de la décision Fast Track',
    decision: 'M3S-INB-001 V1.0 est confirmé en lecture seule. Le cadre reste vide et non opérationnel.',
    nextTitle: 'Prochain lot candidat',
    next: 'Préparer M3S-INB-002 V0.1 comme spécification d’un pilote manuel à données fictives, sans import, connexion, automatisation ni mise en production.',
    verdict: 'STATUT · CADRE CONFIRMÉ EN LECTURE SEULE. Zéro entrée réelle, import, connecteur ou traitement automatique activé.'
  },
  EN: {
    eyebrow: 'CONFIRMED FRAMEWORK · M3S-INB-001 · V1.0 · 30 AUG 2026',
    title: 'M3S Inbox · a confirmed framework that remains empty and non-operational',
    intro: 'DEC-073 confirms the read-only framework intended to turn each authorised email, document, media item or request into an item to qualify and attach. No real register is populated until the backend, permissions and DMS are connected and separately authorised.',
    counters: [['Confirmed framework', '1/1', 'Documentary structure only'], ['Real entries', '0', 'No data processed'], ['Active imports', '0', 'No connector'], ['Automations', '0', 'No silent processing']],
    fieldsTitle: 'Minimum governed fields',
    fields: ['Source and channel', 'Received date', 'Category and sensitivity', 'Portfolio, file, project and task', 'Owning function', 'Authorised owner', 'Status and next action', 'Due date', 'Evidence or DMS link', 'Duplicate fingerprint'],
    statesTitle: 'Processing cycle',
    states: ['Received', 'To qualify', 'Assigned', 'Planned', 'Processed', 'Archived'],
    fastTrack: 'Fast Track processing',
    fastTrackBody: 'Homogeneous entries are grouped; only exceptions, duplicates, high sensitivity or uncertain assignments require a human decision.',
    allowed: 'Permitted next preparation',
    allowedBody: 'Frame a fictional-data pilot; any real entry or secure upload requires separate technical and human authorisation.',
    boundariesTitle: 'Boundaries before activation',
    boundaries: ['No automated WhatsApp reading.', 'No automated email import.', 'No real personal data in the frontend bundle.', 'Backend, RBAC and DMS required before automation.', 'No counter displayed before a reliable source exists.'],
    recordLabels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: { id: 'REF-01-DEC-073', version: 'V1.0', status: 'M3S-INB-001 confirmed read-only', author: 'Cheikh Ndiaye', date: '30 Aug 2026', decision: 'M3S-INB-001 V0.1 is confirmed without amendment and promoted to V1.0 as the read-only framework for the M3S Inbox.', evidence: 'Cheikh’s explicit advance confirmation in the 30 Aug 2026 session: “you can continue directly with the next one, which I confirm in advance”; the displayed next decision was M3S-INB-001 V0.1.', limit: 'The decision confirms only the documentary framework. It enables no import, connector, automation, real-data processing, operational register, access, expense or L2 action.' },
    decisionTitle: 'Fast Track decision outcome',
    decision: 'M3S-INB-001 V1.0 is confirmed read-only. The framework remains empty and non-operational.',
    nextTitle: 'Next candidate package',
    next: 'Prepare M3S-INB-002 V0.1 as the specification for a manual fictional-data pilot, without import, connection, automation or production release.',
    verdict: 'STATUS · CONFIRMED READ-ONLY FRAMEWORK. Zero real entries, imports, connectors or automated processing enabled.'
  },
  DE: {
    eyebrow: 'BESTÄTIGTER RAHMEN · M3S-INB-001 · V1.0 · 30.08.2026',
    title: 'M3S-Eingang · bestätigter, weiterhin leerer und nicht operativer Rahmen',
    intro: 'DEC-073 bestätigt den schreibgeschützten Rahmen, der später jede autorisierte E-Mail, jedes Dokument, Medium oder Anliegen zu einem zu qualifizierenden und zuzuordnenden Eintrag machen soll. Kein reales Register wird befüllt, bevor Backend, Berechtigungen und DMS verbunden und getrennt autorisiert sind.',
    counters: [['Bestätigter Rahmen', '1/1', 'Nur dokumentarische Struktur'], ['Reale Eingänge', '0', 'Keine Daten verarbeitet'], ['Aktive Importe', '0', 'Kein Connector'], ['Automatisierungen', '0', 'Keine stille Bearbeitung']],
    fieldsTitle: 'Minimale gesteuerte Felder',
    fields: ['Quelle und Kanal', 'Eingangsdatum', 'Kategorie und Sensibilität', 'Portfolio, Dossier, Projekt und Aufgabe', 'Verantwortliche Funktion', 'Autorisierte Zuständigkeit', 'Status und nächste Aktion', 'Fälligkeit', 'Nachweis oder DMS-Link', 'Duplikat-Fingerabdruck'],
    statesTitle: 'Bearbeitungszyklus',
    states: ['Eingegangen', 'Zu qualifizieren', 'Zugewiesen', 'Geplant', 'Bearbeitet', 'Archiviert'],
    fastTrack: 'Fast-Track-Bearbeitung',
    fastTrackBody: 'Homogene Eingänge werden gebündelt; nur Ausnahmen, Duplikate, hohe Sensibilität oder unklare Zuweisungen benötigen einen menschlichen Entscheid.',
    allowed: 'Erlaubte nächste Vorbereitung',
    allowedBody: 'Einen Pilot mit fiktiven Daten einrahmen; jede reale Erfassung oder sichere Ablage benötigt eine getrennte technische und menschliche Autorisierung.',
    boundariesTitle: 'Grenzen vor Inbetriebnahme',
    boundaries: ['Kein automatisches Lesen von WhatsApp.', 'Kein automatischer E-Mail-Import.', 'Keine realen Personendaten im Frontend-Bundle.', 'Backend, RBAC und DMS vor jeder Automatisierung erforderlich.', 'Kein Zähler ohne verlässliche Quelle.'],
    recordLabels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: { id: 'REF-01-DEC-073', version: 'V1.0', status: 'M3S-INB-001 schreibgeschützt bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026', decision: 'M3S-INB-001 V0.1 wird ohne Änderung bestätigt und zu V1.0 als schreibgeschützter Rahmen des M3S-Eingangs.', evidence: 'Ausdrückliche Vorabbestätigung von Cheikh in der Sitzung vom 30.08.2026: „du kannst direkt mit dem nächsten weitermachen, den ich im Voraus bestätige“; der angezeigte nächste Entscheid war M3S-INB-001 V0.1.', limit: 'Der Entscheid bestätigt nur den dokumentarischen Rahmen. Er aktiviert keinen Import, Connector, Automatismus, keine Verarbeitung realer Daten, kein operatives Register, keinen Zugriff, keine Ausgabe und keine L2-Aktion.' },
    decisionTitle: 'Ergebnis des Fast-Track-Entscheids',
    decision: 'M3S-INB-001 V1.0 ist schreibgeschützt bestätigt. Der Rahmen bleibt leer und nicht operativ.',
    nextTitle: 'Nächstes Kandidatenpaket',
    next: 'M3S-INB-002 V0.1 als Spezifikation eines manuellen Piloten mit fiktiven Daten vorbereiten, ohne Import, Verbindung, Automatisierung oder Produktivsetzung.',
    verdict: 'STATUS · BESTÄTIGTER SCHREIBGESCHÜTZTER RAHMEN. Null reale Eingänge, Importe, Connectoren oder automatische Bearbeitungen aktiviert.'
  }
};

const InstitutionalM3SInboxFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-m3s-inbox-frame" data-testid="institutional-m3s-inbox-frame" className="scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-200"><Inbox size={16} aria-hidden="true" />{t.states[0]}</span></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <ShieldCheck className="text-violet-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-amber-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.fieldsTitle}</h5><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{t.fields.map(field => <div key={field} className="flex min-h-10 items-center gap-2 rounded-md border border-slate-700 bg-slate-950/20 px-3 py-2 text-xs text-slate-300"><CheckCircle2 className="shrink-0 text-violet-300" size={15} aria-hidden="true" />{field}</div>)}</div></article>
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.statesTitle}</h5><ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{t.states.map((state, index) => <li key={state} className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><span className="text-xs font-semibold text-violet-300">{index + 1}</span><p className="mt-1 text-xs font-semibold text-slate-200">{state}</p></li>)}</ol><div className="mt-3 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3"><h5 className="text-sm font-semibold text-emerald-100">{t.fastTrack}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.fastTrackBody}</p></div><div className="mt-3 flex items-start gap-2 rounded-md border border-blue-800/70 bg-blue-950/15 p-3"><ShieldCheck className="mt-0.5 shrink-0 text-blue-300" size={17} aria-hidden="true" /><div><h5 className="text-xs font-semibold text-blue-100">{t.allowed}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.allowedBody}</p></div></div></article>
      </div>
      <div className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3"><div className="flex items-center gap-2"><LockKeyhole className="text-amber-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-amber-100">{t.boundariesTitle}</h5></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.boundaries.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></div>
      <GovernedDecisionRecord labels={t.recordLabels} record={t.record} />
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3"><div className="flex items-center gap-2"><SendHorizontal className="text-violet-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.decision}</p></div>
      <div className="mt-4 rounded-md border border-sky-700/70 bg-sky-950/20 p-3"><div className="flex items-center gap-2"><SendHorizontal className="text-sky-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-sky-100">{t.nextTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-sky-100">{t.next}</p></div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-sm font-semibold leading-6 text-violet-100">{t.verdict}</p>
    </section>
  );
};

export default InstitutionalM3SInboxFrame;
