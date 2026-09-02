import React from 'react';
import InstitutionalPeopleTeamsHistoricalFollowUp from './InstitutionalPeopleTeamsHistoricalFollowUp';
import { AlertTriangle, CheckSquare2, FileLock2, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PREMIERE UTILISATION · PROTOCOLE V1.0 CONFIRMÉ · 28-08-2026',
    title: 'Préparer l autorisation sans activer le traitement',
    intro: 'Ce protocole vide rassemble les préconditions à contrôler avant toute première utilisation réelle. Il ne constitue ni une autorisation, ni un espace protégé, ni un test sur des données personnelles.',
    counters: [['Préconditions à contrôler', '6/6', 'Toutes requises avant décision'], ['Décision séparée', '1/1', 'GO ou NO-GO humain distinct'], ['Cas actifs', '0', 'Aucun dossier opérationnel'], ['Données personnelles réelles', '0', 'Aucune donnée C3/C4']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['1 · Cas pilote et finalité', ['Catégorie V1.0 concernée', 'Finalité autorisée et bornée', 'Référence opaque du cas pilote', 'Volume et durée du test proposés']],
      ['2 · Autorité et responsabilités', ['Autorité de décision et mandat', 'Fonction pilote et contrôle', 'Opérateur candidat distinct', 'Circuit d escalade et arrêt']],
      ['3 · Espace protégé et accès', ['Répertoire protégé candidat', 'Droits minimaux à tester', 'Journalisation et preuve d accès', 'Séparation REF-01 / GED / données']],
      ['4 · Exécution et retour arrière', ['Plan de test sans donnée réelle', 'Critères de succès et d arrêt', 'Retour arrière et incident', 'Sort final et preuve attendue']]
    ],
    prerequisitesTitle: 'Six préconditions obligatoires proposées',
    prerequisites: ['Fiche 009 complète', 'Mandat vérifié', 'Espace protégé contrôlé', 'Accès minimal testé', 'Retour arrière prêt', 'Décision humaine séparée'],
    outcomesTitle: 'Quatre issues documentaires proposées',
    outcomes: ['Prêt pour décision séparée', 'À compléter', 'Suspendu', 'Refusé'],
    status: 'CONFIRMÉ · Protocole documentaire V1.0. Zéro autorisation active, cas réel, donnée C3/C4, accès ou opération GED.',
    next: 'La fiche GO/NO-GO REF-01-G1-AUT-02-03-011 V1.0 est confirmée par REF-01-DEC-051. Cette confirmation documentaire ne constitue pas un GO.',
    boundary: 'La confirmation n autorise aucune première utilisation. Un cas précis exige une décision GO/NO-GO séparée, nominative et traçable dans l espace autorisé.'
  },
  EN: {
    eyebrow: 'FIRST USE · V1.0 CONFIRMED PROTOCOL · 28 AUG 2026',
    title: 'Prepare authorisation without activating processing',
    intro: 'This empty protocol brings together the prerequisites to review before any first real use. It is neither authorisation, a protected workspace nor a test on personal data.',
    counters: [['Prerequisites to review', '6/6', 'All required before decision'], ['Separate decision', '1/1', 'Distinct human GO or NO-GO'], ['Active cases', '0', 'No operational file'], ['Real personal data', '0', 'No C3/C4 data']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Pilot case and purpose', ['Relevant V1.0 category', 'Authorised bounded purpose', 'Opaque pilot-case reference', 'Proposed test volume and duration']],
      ['2 · Authority and responsibilities', ['Decision authority and mandate', 'Lead and review functions', 'Separate candidate operator', 'Escalation and stop route']],
      ['3 · Protected workspace and access', ['Candidate protected repository', 'Minimum rights to test', 'Access logging and evidence', 'REF-01 / DMS / data separation']],
      ['4 · Execution and rollback', ['No-real-data test plan', 'Success and stop criteria', 'Rollback and incident route', 'Final treatment and expected evidence']]
    ],
    prerequisitesTitle: 'Six proposed mandatory prerequisites',
    prerequisites: ['Complete sheet 009', 'Mandate verified', 'Protected space reviewed', 'Minimum access tested', 'Rollback ready', 'Separate human decision'],
    outcomesTitle: 'Four proposed documentary outcomes',
    outcomes: ['Ready for separate decision', 'To complete', 'On hold', 'Rejected'],
    status: 'CONFIRMED · V1.0 documentary protocol. Zero active authorisations, real cases, C3/C4 data, access or DMS operations.',
    next: 'GO/NO-GO sheet REF-01-G1-AUT-02-03-011 V1.0 is confirmed by REF-01-DEC-051. This documentary confirmation is not a GO.',
    boundary: 'Confirmation authorises no first use. A specific case requires a separate, named and traceable GO/NO-GO decision in the authorised space.'
  },
  DE: {
    eyebrow: 'ERSTNUTZUNG · PROTOKOLL V1.0 BESTÄTIGT · 28.08.2026',
    title: 'Autorisierung vorbereiten, ohne Verarbeitung zu aktivieren',
    intro: 'Dieses leere Protokoll bündelt die Voraussetzungen, die vor jeder ersten realen Nutzung zu prüfen sind. Es ist weder eine Autorisierung noch ein geschützter Raum oder ein Test mit Personendaten.',
    counters: [['Zu prüfende Voraussetzungen', '6/6', 'Alle vor dem Entscheid nötig'], ['Getrennter Entscheid', '1/1', 'Eigenständiges menschliches GO oder NO-GO'], ['Aktive Fälle', '0', 'Keine operative Akte'], ['Reale Personendaten', '0', 'Keine C3/C4-Daten']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Pilotfall und Zweck', ['Betroffene V1.0-Kategorie', 'Autorisierter begrenzter Zweck', 'Opake Pilotfallreferenz', 'Vorgeschlagener Testumfang und Dauer']],
      ['2 · Autorität und Verantwortungen', ['Entscheidautorität und Mandat', 'Federführende und prüfende Funktion', 'Getrennte Kandidaten-Operatorrolle', 'Eskalations- und Stoppweg']],
      ['3 · Geschützter Raum und Zugriff', ['Kandidaten-Repository geschützt', 'Zu testende Mindestrechte', 'Zugriffsprotokoll und Nachweis', 'Trennung REF-01 / DMS / Daten']],
      ['4 · Ausführung und Rückkehr', ['Testplan ohne reale Daten', 'Erfolgs- und Stoppkriterien', 'Rückkehr- und Störungsweg', 'Endbehandlung und erwarteter Nachweis']]
    ],
    prerequisitesTitle: 'Sechs vorgeschlagene Pflichtvoraussetzungen',
    prerequisites: ['Blatt 009 vollständig', 'Mandat geprüft', 'Geschützter Raum kontrolliert', 'Minimalzugriff getestet', 'Rückkehr bereit', 'Getrennter menschlicher Entscheid'],
    outcomesTitle: 'Vier vorgeschlagene Dokumentationsergebnisse',
    outcomes: ['Bereit für getrennten Entscheid', 'Zu ergänzen', 'Ausgesetzt', 'Abgelehnt'],
    status: 'BESTÄTIGT · Dokumentationsprotokoll V1.0. Null aktive Autorisierungen, reale Fälle, C3/C4-Daten, Zugriffe oder DMS-Operationen.',
    next: 'GO/NO-GO-Blatt REF-01-G1-AUT-02-03-011 V1.0 ist durch REF-01-DEC-051 bestätigt. Diese Dokumentenbestätigung ist kein GO.',
    boundary: 'Die Bestätigung autorisiert keine Erstnutzung. Ein bestimmter Fall erfordert einen getrennten, namentlichen und nachvollziehbaren GO/NO-GO-Entscheid im autorisierten Raum.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionFirstUseAuthorisationProtocol = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-first-use-authorisation-protocol" className="mt-5 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-010 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-retention-first-use-authorisation-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.prerequisitesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.prerequisites.map(item => <span key={item} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{item}</span>)}</div></div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.outcomesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.outcomes.map(item => <span key={item} className="rounded-md border border-violet-700/60 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{item}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <InstitutionalPeopleTeamsHistoricalFollowUp language={language}>{t.next}</InstitutionalPeopleTeamsHistoricalFollowUp>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionFirstUseAuthorisationProtocol;
