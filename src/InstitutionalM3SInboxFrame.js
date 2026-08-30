import React from 'react';
import { AlertTriangle, CheckCircle2, Inbox, LockKeyhole, SendHorizontal, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CADRAGE CANDIDAT · M3S-INB-001 · V0.1 · 30-08-2026',
    title: 'Boîte d’entrée M3S · absorber l’activité courante sans créer une nouvelle dette',
    intro: 'Ce registre candidat transforme chaque e-mail, document, média ou demande autorisée en élément à qualifier puis à rattacher. Il reste en lecture seule tant que le backend, les droits et la GED ne sont pas raccordés.',
    fieldsTitle: 'Champs minimaux gouvernés',
    fields: ['Source et canal', 'Date de réception', 'Catégorie et sensibilité', 'Portefeuille, dossier, projet et tâche', 'Fonction propriétaire', 'Responsable autorisé', 'Statut et prochaine action', 'Échéance', 'Preuve ou lien GED', 'Empreinte anti-doublon'],
    statesTitle: 'Cycle de traitement',
    states: ['Reçu', 'À qualifier', 'Affecté', 'Planifié', 'Traité', 'Archivé'],
    fastTrack: 'Traitement Fast Track',
    fastTrackBody: 'Les entrées homogènes sont regroupées par lot ; seules les exceptions, doublons, sensibilités élevées ou affectations incertaines sont soumises à décision humaine.',
    allowed: 'Première étape autorisée',
    allowedBody: 'Saisie manuelle contrôlée ou dépôt sécurisé, sans automatisation silencieuse.',
    boundariesTitle: 'Frontières avant mise en service',
    boundaries: ['Aucune lecture automatique de WhatsApp.', 'Aucun import automatique des e-mails.', 'Aucune donnée personnelle réelle intégrée au bundle frontend.', 'Backend, RBAC et GED requis avant toute automatisation.', 'Aucun compteur affiché avant disponibilité d’une source fiable.'],
    decisionTitle: 'Prochain arbitrage Fast Track',
    decision: 'Confirmer : « Je confirme M3S-INB-001 V0.1 comme cadre en lecture seule de la Boîte d’entrée M3S, sans activer import, automatisation ni traitement de données réelles. »',
    verdict: 'STATUT · CADRAGE CANDIDAT EN LECTURE SEULE. Aucun registre opérationnel, import ou traitement automatique n’est activé.'
  },
  EN: {
    eyebrow: 'CANDIDATE FRAMEWORK · M3S-INB-001 · V0.1 · 30 AUG 2026',
    title: 'M3S Inbox · absorb daily activity without creating new debt',
    intro: 'This candidate register turns each authorised email, document, media item or request into an item to qualify and attach. It remains read-only until the backend, permissions and DMS are connected.',
    fieldsTitle: 'Minimum governed fields',
    fields: ['Source and channel', 'Received date', 'Category and sensitivity', 'Portfolio, file, project and task', 'Owning function', 'Authorised owner', 'Status and next action', 'Due date', 'Evidence or DMS link', 'Duplicate fingerprint'],
    statesTitle: 'Processing cycle',
    states: ['Received', 'To qualify', 'Assigned', 'Planned', 'Processed', 'Archived'],
    fastTrack: 'Fast Track processing',
    fastTrackBody: 'Homogeneous entries are grouped; only exceptions, duplicates, high sensitivity or uncertain assignments require a human decision.',
    allowed: 'Authorised first step',
    allowedBody: 'Controlled manual entry or secure upload, without silent automation.',
    boundariesTitle: 'Boundaries before activation',
    boundaries: ['No automated WhatsApp reading.', 'No automated email import.', 'No real personal data in the frontend bundle.', 'Backend, RBAC and DMS required before automation.', 'No counter displayed before a reliable source exists.'],
    decisionTitle: 'Next Fast Track decision',
    decision: 'Confirm: “I confirm M3S-INB-001 V0.1 as the read-only framework for the M3S Inbox, without enabling import, automation or real-data processing.”',
    verdict: 'STATUS · READ-ONLY CANDIDATE FRAMEWORK. No operational register, import or automated processing is enabled.'
  },
  DE: {
    eyebrow: 'KANDIDATENRAHMEN · M3S-INB-001 · V0.1 · 30.08.2026',
    title: 'M3S-Eingang · Tagesgeschäft aufnehmen, ohne neue Rückstände zu schaffen',
    intro: 'Dieses Kandidatenregister macht jede autorisierte E-Mail, jedes Dokument, Medium oder Anliegen zu einem zu qualifizierenden und zuzuordnenden Eintrag. Es bleibt schreibgeschützt, bis Backend, Berechtigungen und DMS verbunden sind.',
    fieldsTitle: 'Minimale gesteuerte Felder',
    fields: ['Quelle und Kanal', 'Eingangsdatum', 'Kategorie und Sensibilität', 'Portfolio, Dossier, Projekt und Aufgabe', 'Verantwortliche Funktion', 'Autorisierte Zuständigkeit', 'Status und nächste Aktion', 'Fälligkeit', 'Nachweis oder DMS-Link', 'Duplikat-Fingerabdruck'],
    statesTitle: 'Bearbeitungszyklus',
    states: ['Eingegangen', 'Zu qualifizieren', 'Zugewiesen', 'Geplant', 'Bearbeitet', 'Archiviert'],
    fastTrack: 'Fast-Track-Bearbeitung',
    fastTrackBody: 'Homogene Eingänge werden gebündelt; nur Ausnahmen, Duplikate, hohe Sensibilität oder unklare Zuweisungen benötigen einen menschlichen Entscheid.',
    allowed: 'Autorisierter erster Schritt',
    allowedBody: 'Kontrollierte manuelle Erfassung oder sichere Ablage, ohne stille Automatisierung.',
    boundariesTitle: 'Grenzen vor Inbetriebnahme',
    boundaries: ['Kein automatisches Lesen von WhatsApp.', 'Kein automatischer E-Mail-Import.', 'Keine realen Personendaten im Frontend-Bundle.', 'Backend, RBAC und DMS vor jeder Automatisierung erforderlich.', 'Kein Zähler ohne verlässliche Quelle.'],
    decisionTitle: 'Nächster Fast-Track-Entscheid',
    decision: 'Bestätigen: „Ich bestätige M3S-INB-001 V0.1 als schreibgeschützten Rahmen des M3S-Eingangs, ohne Import, Automatisierung oder Verarbeitung realer Daten zu aktivieren.“',
    verdict: 'STATUS · SCHREIBGESCHÜTZTER KANDIDATENRAHMEN. Kein operatives Register, Import oder automatische Bearbeitung ist aktiviert.'
  }
};

const InstitutionalM3SInboxFrame = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-m3s-inbox-frame" data-testid="institutional-m3s-inbox-frame" className="scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h4 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{t.title}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><span className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start rounded-md border border-violet-700/70 bg-violet-950/30 px-3 py-2 text-xs font-semibold text-violet-200"><Inbox size={16} aria-hidden="true" />{t.states[0]}</span></div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.fieldsTitle}</h5><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{t.fields.map(field => <div key={field} className="flex min-h-10 items-center gap-2 rounded-md border border-slate-700 bg-slate-950/20 px-3 py-2 text-xs text-slate-300"><CheckCircle2 className="shrink-0 text-violet-300" size={15} aria-hidden="true" />{field}</div>)}</div></article>
        <article className="m3s-raised p-3 sm:p-4"><h5 className="text-sm font-semibold text-slate-100">{t.statesTitle}</h5><ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{t.states.map((state, index) => <li key={state} className="rounded-md border border-slate-700 bg-slate-950/20 p-3"><span className="text-xs font-semibold text-violet-300">{index + 1}</span><p className="mt-1 text-xs font-semibold text-slate-200">{state}</p></li>)}</ol><div className="mt-3 rounded-md border border-emerald-800/70 bg-emerald-950/15 p-3"><h5 className="text-sm font-semibold text-emerald-100">{t.fastTrack}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.fastTrackBody}</p></div><div className="mt-3 flex items-start gap-2 rounded-md border border-blue-800/70 bg-blue-950/15 p-3"><ShieldCheck className="mt-0.5 shrink-0 text-blue-300" size={17} aria-hidden="true" /><div><h5 className="text-xs font-semibold text-blue-100">{t.allowed}</h5><p className="mt-1 text-xs leading-5 text-slate-300">{t.allowedBody}</p></div></div></article>
      </div>
      <div className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/15 p-3"><div className="flex items-center gap-2"><LockKeyhole className="text-amber-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-amber-100">{t.boundariesTitle}</h5></div><ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">{t.boundaries.map(item => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-300"><AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={14} aria-hidden="true" />{item}</li>)}</ul></div>
      <div className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3"><div className="flex items-center gap-2"><SendHorizontal className="text-violet-300" size={17} aria-hidden="true" /><h5 className="text-sm font-semibold text-violet-100">{t.decisionTitle}</h5></div><p className="mt-2 text-sm font-semibold leading-6 text-violet-100">{t.decision}</p></div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-sm font-semibold leading-6 text-violet-100">{t.verdict}</p>
    </section>
  );
};

export default InstitutionalM3SInboxFrame;
