import React from 'react';
import { AlertTriangle, CalendarClock, LockKeyhole, ShieldCheck, UserCog } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'RESPONSABILITÉS ET DÉCLENCHEURS · CONFIRMÉ V1.0 · 28-08-2026',
    title: 'Attribuer le pilotage sans lancer la conservation',
    intro: 'La désignation V1.0 fixe les cinq catégories. Cette fiche confirmée attribue leur pilotage à des fonctions et décrit les événements qui ouvrent un contrôle documenté, jamais une suppression ou un archivage automatique.',
    counters: [['Catégories couvertes', '5/5', 'Même périmètre que la désignation V1.0'], ['Responsables fonctionnels', '5/5', 'Fonctions confirmées, sans mandat nominatif'], ['Automatisations ouvertes', '0', 'Chaque événement ouvre seulement un contrôle'], ['Opérations GED', '0', 'Aucune pièce déplacée ou supprimée']],
    labels: { category: 'Catégorie', accountable: 'Fonction pilote confirmée', stewards: 'Contributeurs et gardiens', triggers: 'Déclencheurs documentaires confirmés', gate: 'Contrôle humain obligatoire' },
    badge: 'CONFIRMÉ · V1.0',
    rows: [
      ['Annuaire C2 · personnes et équipes', 'Organisation & RH', 'IT garde le support technique ; GED conserve décisions et preuves ; Gouvernance arbitre.', 'Création ou activation ; modification ou transfert ; fin de mandat, de relation ou de finalité ; demande de rectification.', 'Confirmer l événement, sa date d effet, la décision et le sort autorisé avant toute action.'],
      ['Dossier de candidature', 'Organisation & RH', 'GED restreinte garde la pièce ; LEGAL intervient en cas de litige, consentement ou règle locale.', 'Réception autorisée ; décision de recrutement ou de refus ; retrait du consentement ; ouverture ou clôture d un litige.', 'Vérifier la catégorie, le territoire, la décision et la référence opaque ; ne jamais copier le CV dans REF-01.'],
      ['Données salariales et certificat de travail', 'Organisation & RH', 'Finances porte les écritures et créances ; GED garde les preuves ; LEGAL qualifie les cas sensibles.', 'Validation d une écriture salariale ; fin de relation ; émission d un certificat ; réclamation, correction ou litige.', 'Qualifier la relation, la sous-catégorie, l entité et le point de départ avant de retenir une durée.'],
      ['Pièces comptables et justificatifs', 'Finances', 'GED garde les justificatifs ; LEGAL confirme le cadre applicable ; Administration suit la complétude.', 'Validation comptable ; clôture d exercice ; correction ou annulation ; contrôle, contestation ou litige.', 'Confirmer entité, exercice, fondement, référence opaque et éventuel gel avant le calcul d une échéance.'],
      ['Mandats, délégations, décisions et journaux d accès', 'Gouvernance', 'Administration suit les actes ; IT porte les journaux techniques ; GED garde les décisions et preuves.', 'Entrée en vigueur ; modification, révocation ou expiration ; clôture d accès ; incident ou gel de sécurité.', 'Séparer chaque sous-catégorie et obtenir l autorité, la preuve et le sort final avant toute opération.']
    ],
    status: 'CONFIRMÉ · Cinq fonctions pilotes retenues. Zéro mandat nominatif, règle automatique ou opération GED.',
    next: 'Étape suivante : examiner REF-01-G1-AUT-02-03-006 V0.1, qui transforme les déclencheurs en cinq cas de revue humaine sans ouvrir leur exécution.',
    boundary: 'Les déclencheurs sont des événements de contrôle. Ils ne démarrent aucune durée, suppression, anonymisation, archive, gel ou notification sans règle validée et décision autorisée.'
  },
  EN: {
    eyebrow: 'OWNERSHIP AND TRIGGERS · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Assign stewardship without starting retention',
    intro: 'The V1.0 designation fixes the five categories. This confirmed file assigns their stewardship to functions and describes events that open a documented review, never an automatic deletion or archive.',
    counters: [['Categories covered', '5/5', 'Same scope as the V1.0 designation'], ['Responsible functions', '5/5', 'Confirmed functions, no named mandate'], ['Automations opened', '0', 'Each event opens only a review'], ['DMS operations', '0', 'No record moved or deleted']],
    labels: { category: 'Category', accountable: 'Confirmed lead function', stewards: 'Contributors and custodians', triggers: 'Confirmed documentary triggers', gate: 'Mandatory human control' },
    badge: 'CONFIRMED · V1.0',
    rows: [
      ['C2 directory · people and teams', 'Organisation & HR', 'IT safeguards the technical support; DMS retains decisions and evidence; Governance arbitrates.', 'Create or activate; update or transfer; end of mandate, relationship or purpose; rectification request.', 'Confirm the event, effective date, decision and authorised outcome before any action.'],
      ['Application file', 'Organisation & HR', 'Restricted DMS retains the record; LEGAL intervenes for a dispute, consent or local rule.', 'Authorised receipt; recruitment or rejection decision; consent withdrawal; opening or closure of a dispute.', 'Check category, territory, decision and opaque reference; never copy the CV into REF-01.'],
      ['Salary and employment-reference data', 'Organisation & HR', 'Finance owns entries and claims; DMS retains evidence; LEGAL qualifies sensitive cases.', 'Salary-entry validation; end of relationship; issue of a reference; claim, correction or dispute.', 'Qualify the relationship, subcategory, entity and starting point before retaining a period.'],
      ['Accounting records and evidence', 'Finance', 'DMS retains evidence; LEGAL confirms the applicable framework; Administration tracks completeness.', 'Accounting validation; financial-year close; correction or cancellation; audit, challenge or dispute.', 'Confirm entity, year, basis, opaque reference and any hold before calculating a deadline.'],
      ['Mandates, delegations, decisions and access logs', 'Governance', 'Administration follows instruments; IT owns technical logs; DMS retains decisions and evidence.', 'Entry into force; change, revocation or expiry; access closure; incident or security hold.', 'Separate every subcategory and obtain authority, evidence and final outcome before any operation.']
    ],
    status: 'CONFIRMED · Five lead functions retained. Zero named mandate, automated rule or DMS operation.',
    next: 'Next step: review REF-01-G1-AUT-02-03-006 V0.1, which turns the triggers into five human-review cases without opening execution.',
    boundary: 'Triggers are review events. They start no period, deletion, anonymisation, archive, hold or notification without a validated rule and authorised decision.'
  },
  DE: {
    eyebrow: 'VERANTWORTUNG UND AUSLÖSER · BESTÄTIGT V1.0 · 28.08.2026',
    title: 'Verantwortung zuweisen, ohne Aufbewahrung zu starten',
    intro: 'Die Zuordnung V1.0 legt die fünf Kategorien fest. Diese bestätigte Akte weist ihre Steuerung Funktionen zu und beschreibt Ereignisse, die eine dokumentierte Prüfung öffnen, niemals eine automatische Löschung oder Archivierung.',
    counters: [['Abgedeckte Kategorien', '5/5', 'Gleicher Umfang wie Zuordnung V1.0'], ['Verantwortliche Funktionen', '5/5', 'Bestätigte Funktionen ohne Namensmandat'], ['Geöffnete Automatisierungen', '0', 'Jedes Ereignis öffnet nur eine Prüfung'], ['DMS-Operationen', '0', 'Keine Unterlage verschoben oder gelöscht']],
    labels: { category: 'Kategorie', accountable: 'Bestätigte verantwortliche Funktion', stewards: 'Mitwirkende und Verwahrende', triggers: 'Bestätigte dokumentarische Auslöser', gate: 'Obligatorische menschliche Kontrolle' },
    badge: 'BESTÄTIGT · V1.0',
    rows: [
      ['C2-Verzeichnis · Personen und Teams', 'Organisation & Personal', 'IT sichert den technischen Träger; DMS bewahrt Entscheide und Nachweise; Governance entscheidet.', 'Erstellung oder Aktivierung; Änderung oder Transfer; Ende von Mandat, Beziehung oder Zweck; Berichtigungsantrag.', 'Ereignis, Wirksamkeitsdatum, Entscheid und erlaubte Endbehandlung vor jeder Aktion bestätigen.'],
      ['Bewerbungsdossier', 'Organisation & Personal', 'Eingeschränktes DMS bewahrt die Unterlage; LEGAL wirkt bei Streit, Einwilligung oder lokaler Regel mit.', 'Autorisierter Eingang; Einstellungs- oder Absageentscheid; Widerruf der Einwilligung; Beginn oder Ende eines Streits.', 'Kategorie, Gebiet, Entscheid und opake Referenz prüfen; Lebenslauf nie in REF-01 kopieren.'],
      ['Lohn- und Arbeitszeugnisdaten', 'Organisation & Personal', 'Finanzen trägt Buchungen und Ansprüche; DMS bewahrt Nachweise; LEGAL qualifiziert sensible Fälle.', 'Validierung einer Lohnbuchung; Ende der Beziehung; Ausstellung eines Zeugnisses; Anspruch, Korrektur oder Streit.', 'Beziehung, Unterkategorie, Einheit und Startpunkt vor Festlegung einer Frist qualifizieren.'],
      ['Buchhaltungsunterlagen und Belege', 'Finanzen', 'DMS bewahrt Belege; LEGAL bestätigt den Rahmen; Verwaltung verfolgt die Vollständigkeit.', 'Buchungsvalidierung; Jahresabschluss; Korrektur oder Stornierung; Prüfung, Beanstandung oder Streit.', 'Einheit, Jahr, Grundlage, opake Referenz und mögliche Sperre vor einer Fristberechnung bestätigen.'],
      ['Mandate, Delegationen, Entscheide und Zugriffsprotokolle', 'Governance', 'Verwaltung verfolgt Akte; IT trägt technische Protokolle; DMS bewahrt Entscheide und Nachweise.', 'Inkrafttreten; Änderung, Widerruf oder Ablauf; Zugriffsschluss; Vorfall oder Sicherheitssperre.', 'Jede Unterkategorie trennen und Autorität, Nachweis und Endbehandlung vor jeder Operation einholen.']
    ],
    status: 'BESTÄTIGT · Fünf verantwortliche Funktionen festgehalten. Null Namensmandat, automatisierte Regel oder DMS-Operation.',
    next: 'Nächster Schritt: REF-01-G1-AUT-02-03-006 V0.1 prüfen; die Akte überführt Auslöser in fünf menschliche Prüffälle, ohne Ausführung zu öffnen.',
    boundary: 'Auslöser sind Prüfereignisse. Ohne validierte Regel und autorisierten Entscheid starten sie keine Frist, Löschung, Anonymisierung, Archivierung, Sperre oder Meldung.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionOwnersTriggers = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ShieldCheck, UserCog, CalendarClock, LockKeyhole];

  return (
    <section data-testid="ref01-g1-retention-owners-triggers" className="mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="ref01-g1-retention-owners-triggers-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="ref01-g1-retention-owners-triggers-title" className="mt-1 break-words text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><UserCog className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-violet-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-005 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.rows.map(([category, accountable, stewards, triggers, gate]) => <section key={category} data-testid="ref01-g1-retention-owner-trigger-row" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-slate-100">{category}</h6><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-violet-200">{t.labels.accountable}</dt><dd className="mt-0.5 text-slate-200">{accountable}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.stewards}</dt><dd className="mt-0.5 text-slate-300">{stewards}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.triggers}</dt><dd className="mt-0.5 text-slate-300">{triggers}</dd></div><div><dt className="font-semibold text-amber-200">{t.labels.gate}</dt><dd className="mt-0.5 text-slate-300">{gate}</dd></div></dl></section>)}</div>
      </article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionOwnersTriggers;
