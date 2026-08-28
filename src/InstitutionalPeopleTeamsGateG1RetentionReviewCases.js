import React from 'react';
import { AlertTriangle, ClipboardCheck, FileSearch, LockKeyhole, UserRoundX } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CAS DE REVUE DE CONSERVATION · CONFIRMÉ V1.0 · 28-08-2026',
    title: 'Transformer un déclencheur en contrôle humain traçable',
    intro: 'Les responsabilités et déclencheurs V1.0 ouvrent seulement une revue. Cette fiche candidate précise, pour chaque catégorie, les éléments à contrôler, les décisions documentaires possibles et l arrêt obligatoire avant toute exécution.',
    counters: [['Cas de revue couverts', '5/5', 'Un par catégorie confirmée'], ['Affectations nominatives', '0', 'Fonctions uniquement'], ['Ordres d exécution', '0', 'Aucune suppression ou archive'], ['Opérations GED', '0', 'Références opaques uniquement']],
    labels: { event: 'Événements ouvrant la revue', evidence: 'Éléments attendus', decisions: 'Décisions documentaires candidates', stop: 'Arrêt obligatoire' },
    badge: 'CONFIRMÉ · V1.0',
    rows: [
      ['Annuaire C2 · personnes et équipes', 'Activation, modification, transfert, fin de mandat ou de relation, changement de finalité ou rectification.', 'Référence RH-001, objet concerné, date d effet, motif contrôlé, fonction requérante et preuve de décision.', 'Maintenir la finalité active ; corriger la donnée ; clôturer le lien ; demander une qualification LEGAL ; placer le cas en attente.', 'Aucun effacement, anonymisation, changement d accès ou clôture technique sans décision séparée.'],
      ['Dossier de candidature', 'Réception autorisée, recrutement, refus, retrait du consentement, litige ou fin de finalité.', 'Référence opaque du dossier, territoire, date de décision, preuve de consentement si applicable et état du litige.', 'Maintenir temporairement ; restreindre l usage ; demander une revue LEGAL ; constater la fin de finalité ; préparer une échéance candidate.', 'Ne jamais copier le CV dans REF-01 ni calculer ou appliquer une échéance sans règle validée.'],
      ['Données salariales et certificat de travail', 'Validation salariale, fin de relation, émission de certificat, correction, créance, réclamation ou litige.', 'Entité, type de relation, sous-catégorie, date de fin, référence de pièce, créance ou gel documenté.', 'Séparer les sous-catégories ; maintenir un gel ; demander une qualification Finance ou LEGAL ; préparer le point de départ candidat.', 'Aucune durée, suppression, anonymisation ou archive n est appliquée par cette fiche.'],
      ['Pièces comptables et justificatifs', 'Validation comptable, clôture d exercice, correction, annulation, contrôle, contestation ou litige.', 'Entité, exercice, nature de la pièce, fondement, référence GED opaque, autorité de validation et éventuel gel.', 'Confirmer la catégorie ; retenir le déclencheur candidat ; maintenir ou lever un gel après autorisation ; transmettre à Finances ou LEGAL.', 'Aucune échéance n est calculée et aucune pièce n est déplacée, supprimée ou archivée.'],
      ['Mandats, délégations, décisions et journaux d accès', 'Entrée en vigueur, modification, révocation, expiration, clôture d accès, incident ou gel de sécurité.', 'Sous-catégorie, autorité, dates d effet, décision, référence de journal ou preuve, état du droit et motif contrôlé.', 'Séparer les sous-catégories ; confirmer le fait générateur ; demander un contrôle Gouvernance, IT ou LEGAL ; préparer le sort candidat.', 'La revue ne retire aucun droit, ne purge aucun journal et ne clôture aucun compte.']
    ],
    status: 'CONFIRMÉ · Cinq protocoles de revue retenus. Zéro affectation nominative, échéance calculée ou opération exécutée.',
    next: 'Étape suivante accomplie : REF-01-G1-AUT-02-03-007 V1.0 fournit le registre vide et traçable.',
    boundary: 'Chaque cas reste en lecture documentaire. Toute affectation réelle, collecte C3/C4, calcul de délai, décision de sort final ou opération GED exige une autorisation distincte.'
  },
  EN: {
    eyebrow: 'RETENTION REVIEW CASES · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Turn a trigger into a traceable human review',
    intro: 'The V1.0 responsibilities and triggers open only a review. This candidate file defines, for each category, the evidence to inspect, possible documentary decisions and the mandatory stop before execution.',
    counters: [['Review cases covered', '5/5', 'One per confirmed category'], ['Named assignments', '0', 'Functions only'], ['Execution orders', '0', 'No deletion or archive'], ['DMS operations', '0', 'Opaque references only']],
    labels: { event: 'Events opening the review', evidence: 'Expected evidence', decisions: 'Candidate documentary decisions', stop: 'Mandatory stop' },
    badge: 'CONFIRMED · V1.0',
    rows: [
      ['C2 directory · people and teams', 'Activation, update, transfer, end of mandate or relationship, purpose change or correction.', 'RH-001 reference, concerned object, effective date, controlled reason, requesting function and decision evidence.', 'Maintain active purpose; correct data; close the link; request LEGAL qualification; place the case on hold.', 'No erasure, anonymisation, access change or technical closure without a separate decision.'],
      ['Application file', 'Authorised receipt, recruitment, rejection, consent withdrawal, dispute or end of purpose.', 'Opaque file reference, territory, decision date, consent evidence where applicable and dispute state.', 'Retain temporarily; restrict use; request LEGAL review; record end of purpose; prepare a candidate deadline.', 'Never copy the CV into REF-01 or calculate or apply a deadline without a validated rule.'],
      ['Salary and employment-reference data', 'Salary validation, end of relationship, reference issue, correction, claim, complaint or dispute.', 'Entity, relationship type, subcategory, end date, record reference, documented claim or hold.', 'Separate subcategories; maintain a hold; request Finance or LEGAL qualification; prepare a candidate starting point.', 'This file applies no period, deletion, anonymisation or archive.'],
      ['Accounting records and evidence', 'Accounting validation, financial-year close, correction, cancellation, audit, challenge or dispute.', 'Entity, year, record type, basis, opaque DMS reference, validation authority and any hold.', 'Confirm category; retain the candidate trigger; maintain or lift a hold after authorisation; refer to Finance or LEGAL.', 'No deadline is calculated and no record is moved, deleted or archived.'],
      ['Mandates, delegations, decisions and access logs', 'Entry into force, change, revocation, expiry, access closure, incident or security hold.', 'Subcategory, authority, effective dates, decision, log or evidence reference, right state and controlled reason.', 'Separate subcategories; confirm the generating event; request Governance, IT or LEGAL control; prepare a candidate outcome.', 'The review removes no right, purges no log and closes no account.']
    ],
    status: 'CONFIRMED · Five review protocols retained. Zero named assignments, calculated periods or executed operations.',
    next: 'Next step completed: REF-01-G1-AUT-02-03-007 V1.0 provides the empty, traceable register.',
    boundary: 'Each case remains a documentary read. Any real assignment, C3/C4 collection, period calculation, final-treatment decision or DMS operation requires a separate authorisation.'
  },
  DE: {
    eyebrow: 'AUFBEWAHRUNGS-PRÜFFÄLLE · BESTÄTIGT V1.0 · 28.08.2026',
    title: 'Einen Auslöser in eine nachvollziehbare menschliche Prüfung überführen',
    intro: 'Die Verantwortungen und Auslöser V1.0 öffnen nur eine Prüfung. Diese Kandidatenakte legt je Kategorie erwartete Nachweise, mögliche Dokumententscheide und den Pflichtstopp vor jeder Ausführung fest.',
    counters: [['Abgedeckte Prüffälle', '5/5', 'Einer je bestätigter Kategorie'], ['Namentliche Zuweisungen', '0', 'Nur Funktionen'], ['Ausführungsaufträge', '0', 'Keine Löschung oder Archivierung'], ['DMS-Operationen', '0', 'Nur opake Referenzen']],
    labels: { event: 'Ereignisse zur Eröffnung der Prüfung', evidence: 'Erwartete Nachweise', decisions: 'Dokumentarische Kandidatenentscheide', stop: 'Pflichtstopp' },
    badge: 'BESTÄTIGT · V1.0',
    rows: [
      ['C2-Verzeichnis · Personen und Teams', 'Aktivierung, Änderung, Transfer, Ende von Mandat oder Beziehung, Zweckänderung oder Berichtigung.', 'RH-001-Referenz, betroffenes Objekt, Wirksamkeitsdatum, kontrollierter Grund, anfragende Funktion und Entscheidnachweis.', 'Aktiven Zweck beibehalten; Daten berichtigen; Verbindung schliessen; LEGAL-Qualifikation verlangen; Fall zurückstellen.', 'Keine Löschung, Anonymisierung, Zugriffsänderung oder technische Schliessung ohne getrennten Entscheid.'],
      ['Bewerbungsdossier', 'Autorisierter Eingang, Einstellung, Absage, Widerruf der Einwilligung, Streit oder Zweckende.', 'Opake Dossierreferenz, Gebiet, Entscheidungsdatum, gegebenenfalls Einwilligungsnachweis und Streitstand.', 'Vorübergehend behalten; Nutzung beschränken; LEGAL-Prüfung verlangen; Zweckende feststellen; Kandidatenfrist vorbereiten.', 'Lebenslauf nie in REF-01 kopieren und ohne validierte Regel keine Frist berechnen oder anwenden.'],
      ['Lohn- und Arbeitszeugnisdaten', 'Lohnvalidierung, Beziehungsende, Zeugnisausgabe, Berichtigung, Anspruch, Beanstandung oder Streit.', 'Einheit, Beziehungsart, Unterkategorie, Enddatum, Unterlagenreferenz, dokumentierter Anspruch oder Sperre.', 'Unterkategorien trennen; Sperre beibehalten; Finanz- oder LEGAL-Qualifikation verlangen; Kandidatenstartpunkt vorbereiten.', 'Diese Akte wendet keine Frist, Löschung, Anonymisierung oder Archivierung an.'],
      ['Buchhaltungsunterlagen und Belege', 'Buchungsvalidierung, Jahresabschluss, Berichtigung, Stornierung, Prüfung, Beanstandung oder Streit.', 'Einheit, Jahr, Unterlagenart, Grundlage, opake DMS-Referenz, Validierungsautorität und mögliche Sperre.', 'Kategorie bestätigen; Kandidatenauslöser festhalten; Sperre nach Autorisierung halten oder aufheben; an Finanzen oder LEGAL verweisen.', 'Keine Frist wird berechnet und keine Unterlage verschoben, gelöscht oder archiviert.'],
      ['Mandate, Delegationen, Entscheide und Zugriffsprotokolle', 'Inkrafttreten, Änderung, Widerruf, Ablauf, Zugriffsschluss, Vorfall oder Sicherheitssperre.', 'Unterkategorie, Autorität, Wirksamkeitsdaten, Entscheid, Protokoll- oder Nachweisreferenz, Rechtsstand und kontrollierter Grund.', 'Unterkategorien trennen; auslösendes Ereignis bestätigen; Governance-, IT- oder LEGAL-Kontrolle verlangen; Kandidatenbehandlung vorbereiten.', 'Die Prüfung entzieht kein Recht, löscht kein Protokoll und schliesst kein Konto.']
    ],
    status: 'BESTÄTIGT · Fünf Prüfprotokolle festgehalten. Null Namenszuweisungen, berechnete Fristen oder ausgeführte Operationen.',
    next: 'Nächster Schritt abgeschlossen: REF-01-G1-AUT-02-03-007 V1.0 stellt das leere, nachvollziehbare Register bereit.',
    boundary: 'Jeder Fall bleibt eine dokumentarische Lesung. Reale Zuweisungen, C3/C4-Sammlungen, Fristberechnungen, Endbehandlungsentscheide oder DMS-Operationen benötigen eine getrennte Autorisierung.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionReviewCases = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ClipboardCheck, UserRoundX, LockKeyhole, FileSearch];

  return (
    <section data-testid="ref01-g1-retention-review-cases" className="mt-4 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4" aria-labelledby="ref01-g1-retention-review-cases-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h6 id="ref01-g1-retention-review-cases-title" className="mt-1 break-words text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ClipboardCheck className="shrink-0 text-cyan-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index === 0 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-006 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div>
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.rows.map(([category, event, evidence, decisions, stop]) => <section key={category} data-testid="ref01-g1-retention-review-case-row" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-slate-100">{category}</h6><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-cyan-200">{t.labels.event}</dt><dd className="mt-0.5 text-slate-300">{event}</dd></div><div><dt className="font-semibold text-sky-200">{t.labels.evidence}</dt><dd className="mt-0.5 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.decisions}</dt><dd className="mt-0.5 text-slate-300">{decisions}</dd></div><div><dt className="font-semibold text-amber-200">{t.labels.stop}</dt><dd className="mt-0.5 text-slate-300">{stop}</dd></div></dl></section>)}</div>
      </article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionReviewCases;
