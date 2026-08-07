import React from 'react';
import {
  Archive,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileArchive,
  FileCheck2,
  FileText,
  FolderKanban,
  Landmark,
  LockKeyhole,
  Network,
  Route,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import InternalSectionNav from './InternalSectionNav';

const COPY = {
  FR: {
    eyebrow: 'Administration / Processus, procédures & archives',
    title: 'Du fonctionnement attendu à la preuve conservée',
    subtitle: 'Vue de cadrage en lecture seule pour structurer les processus administratifs, leurs procédures, les dossiers d’exécution et leur archivage. Elle décrit un modèle cible et ne crée aucun registre officiel.',
    badges: ['Lecture seule', 'Modèle cible', 'Aucun registre officiel'],
    navLabel: 'Navigation dans Processus, Procédures et Archives',
    nav: ['Cycle', 'Définitions', 'Manuel', 'Dossiers & archives', 'Responsabilités', 'Frontières'],
    backToTop: 'Revenir en haut',
    cycleTitle: 'Chaîne administrative gouvernée',
    cycleBody: 'Chaque étape produit une information utile à la suivante. La preuve et l’archive se préparent dès la conception du processus.',
    cycle: [
      ['Processus', 'Définir le résultat attendu et les responsabilités.'],
      ['Procédure', 'Décrire la manière approuvée de travailler.'],
      ['Exécution', 'Réaliser les activités et décisions autorisées.'],
      ['Preuve', 'Conserver les faits, validations et pièces utiles.'],
      ['Revue', 'Contrôler le résultat, les écarts et les suites.'],
      ['Archive', 'Classer la version close selon les règles GED.']
    ],
    definitionsTitle: 'Vocabulaire de travail commun',
    definitionsBody: 'Ces définitions facilitent la lecture par un profil non métier. Elles restent candidates au Glossaire central 2SG jusqu’à validation documentaire.',
    definitions: [
      ['Processus', 'Enchaînement coordonné d’activités qui transforme une demande ou une ressource en résultat vérifiable.', Route],
      ['Procédure', 'Façon approuvée d’exécuter une partie d’un processus : étapes, rôles, contrôles, preuves et exceptions.', ClipboardCheck],
      ['Manuel de procédures', 'Ensemble gouverné des procédures applicables, de leurs responsables, versions et règles communes.', BookOpenCheck],
      ['Dossier', 'Regroupement des informations et pièces relatives à une affaire, une décision, un projet ou une obligation.', FolderKanban],
      ['Archive', 'Dossier ou document clos, conservé avec son contexte, sa version, sa durée et ses droits d’accès.', Archive],
      ['Contrôle', 'Vérification définie à l’avance pour confirmer un état, une règle, une autorisation ou une preuve.', ShieldCheck]
    ],
    manualTitle: 'Structure cible du manuel de procédures',
    manualBody: 'Chaque procédure reste une fiche autonome, reliée à son processus et gouvernée par une même structure.',
    manualFields: [
      'Identifiant, titre, objet et périmètre',
      'Déclencheur, entrées et résultat attendu',
      'Rôles, délégations et niveau d’autorisation',
      'Étapes, délais, dépendances et exceptions',
      'Contrôles, preuves et emplacement GED',
      'Version, approbation, date d’effet et prochaine revue'
    ],
    familiesTitle: 'Familles à organiser progressivement',
    families: [
      ['Management & gouvernance', 'Décisions, délégations, revues et pilotage institutionnel.'],
      ['Opérations', 'Activités, achats, travaux, prestations et réception.'],
      ['Support', 'Administration, Finances, RH, IT, GED et actifs.'],
      ['Innovation & connaissance', 'Veille, expérimentation, apprentissage et capitalisation.']
    ],
    recordsTitle: 'Modèle de registre des dossiers et archives',
    recordsBody: 'Les lignes ci-dessous illustrent la structure attendue. Elles ne représentent ni dossiers ouverts ni statuts officiels.',
    demoLabel: 'Exemples de structure',
    headers: ['Objet', 'Processus lié', 'Preuve attendue', 'Sortie cible'],
    records: [
      ['Courrier reçu', 'Traiter une correspondance', 'Message, pièce jointe, décision', 'Dossier classé et réponse suivie'],
      ['Document institutionnel', 'Valider une version officielle', 'Source, relecture, approbation', 'Version publiée et précédente archivée'],
      ['Dossier administratif', 'Suivre une affaire ou obligation', 'Échéances, échanges, justificatifs', 'Clôture documentée ou prochaine action']
    ],
    archiveRulesTitle: 'Règles minimales d’archivage',
    archiveRules: [
      'Séparer brouillon, version active, document remplacé et archive close.',
      'Conserver source, date, version, responsable et niveau de confidentialité.',
      'Ne pas supprimer une preuve sensible sans règle et autorisation applicables.',
      'Permettre la recherche sans exposer les données à un profil non autorisé.'
    ],
    responsibilitiesTitle: 'Répartition des responsabilités',
    responsibilities: [
      ['Administration', 'Tient le registre, coordonne les échéances, relance et consolide les statuts.', FileCheck2],
      ['Fonction responsable', 'Définit le fond métier, exécute ou contrôle et confirme le résultat.', UserCheck],
      ['Gouvernance', 'Approuve les règles, délégations, exceptions sensibles et versions institutionnelles.', Landmark],
      ['GED', 'Conserve sources, versions, preuves, dossiers clos et droits documentaires.', FileArchive],
      ['IT & Support', 'Opère les accès, la sécurité technique, les sauvegardes et la continuité.', LockKeyhole]
    ],
    boundariesTitle: 'Frontières fonctionnelles',
    boundariesBody: 'Administration orchestre la traçabilité et les délais. Elle ne remplace ni le propriétaire métier, ni la gouvernance, ni la GED, ni l’expertise juridique ou technique.',
    boundaries: [
      'La fonction responsable valide le contenu et les critères métier.',
      'La gouvernance autorise les politiques, délégations et décisions sensibles.',
      'La GED gère la conservation documentaire, les versions et les accès.',
      'IT & Support gère les contrôles techniques et la continuité.',
      'Le juridique qualifie les dossiers nécessitant une expertise.'
    ],
    source: 'Sources de cadrage : Document Directeur Global V4, Note de synthèse stratégique V2, architecture documentaire M3S, arborescences 05_M3S_Processus_Procedures et 09_M3S_Archives.'
  },
  EN: {
    eyebrow: 'Administration / Processes, procedures & archives',
    title: 'From expected operation to retained evidence',
    subtitle: 'Read-only framing view for organising administrative processes, their procedures, execution files and archiving. It describes a target model and creates no official register.',
    badges: ['Read-only', 'Target model', 'No official register'],
    navLabel: 'Processes, Procedures and Archives navigation',
    nav: ['Cycle', 'Definitions', 'Manual', 'Files & archives', 'Responsibilities', 'Boundaries'],
    backToTop: 'Back to top',
    cycleTitle: 'Governed administrative chain',
    cycleBody: 'Each stage produces useful information for the next. Evidence and archiving are prepared from process design onwards.',
    cycle: [
      ['Process', 'Define the expected result and responsibilities.'],
      ['Procedure', 'Describe the approved way of working.'],
      ['Execution', 'Perform authorised activities and decisions.'],
      ['Evidence', 'Retain useful facts, validations and records.'],
      ['Review', 'Check results, deviations and next steps.'],
      ['Archive', 'File the closed version under GED rules.']
    ],
    definitionsTitle: 'Shared working vocabulary',
    definitionsBody: 'These definitions support non-specialist readers. They remain candidates for the 2SG Central Glossary until documentary validation.',
    definitions: [
      ['Process', 'A coordinated sequence of activities that turns a request or resource into a verifiable result.', Route],
      ['Procedure', 'The approved way to perform part of a process: steps, roles, controls, evidence and exceptions.', ClipboardCheck],
      ['Procedures manual', 'The governed set of applicable procedures, owners, versions and shared rules.', BookOpenCheck],
      ['File', 'A grouping of information and records for a matter, decision, project or obligation.', FolderKanban],
      ['Archive', 'A closed file or document retained with its context, version, retention period and access rights.', Archive],
      ['Control', 'A predefined check confirming a state, rule, authorisation or item of evidence.', ShieldCheck]
    ],
    manualTitle: 'Target structure of the procedures manual',
    manualBody: 'Each procedure remains an autonomous sheet linked to its process and governed by a shared structure.',
    manualFields: [
      'Identifier, title, purpose and scope',
      'Trigger, inputs and expected result',
      'Roles, delegations and authorisation level',
      'Steps, deadlines, dependencies and exceptions',
      'Controls, evidence and GED location',
      'Version, approval, effective date and next review'
    ],
    familiesTitle: 'Families to organise progressively',
    families: [
      ['Management & governance', 'Decisions, delegations, reviews and institutional steering.'],
      ['Operations', 'Activities, purchases, works, services and acceptance.'],
      ['Support', 'Administration, Finance, HR, IT, GED and assets.'],
      ['Innovation & knowledge', 'Monitoring, experimentation, learning and capitalisation.']
    ],
    recordsTitle: 'File and archive register model',
    recordsBody: 'The rows below illustrate the expected structure. They are neither open files nor official statuses.',
    demoLabel: 'Structure examples',
    headers: ['Object', 'Linked process', 'Expected evidence', 'Target output'],
    records: [
      ['Incoming correspondence', 'Handle correspondence', 'Message, attachment, decision', 'Filed record and tracked response'],
      ['Institutional document', 'Approve an official version', 'Source, review, approval', 'Published version and prior version archived'],
      ['Administrative file', 'Track a matter or obligation', 'Deadlines, exchanges, evidence', 'Documented closure or next action']
    ],
    archiveRulesTitle: 'Minimum archiving rules',
    archiveRules: [
      'Separate drafts, active versions, superseded documents and closed archives.',
      'Retain source, date, version, owner and confidentiality level.',
      'Do not delete sensitive evidence without an applicable rule and authorisation.',
      'Enable search without exposing data to an unauthorised profile.'
    ],
    responsibilitiesTitle: 'Responsibility allocation',
    responsibilities: [
      ['Administration', 'Maintains the register, coordinates deadlines, follows up and consolidates statuses.', FileCheck2],
      ['Owning function', 'Defines business substance, performs or controls work and confirms the result.', UserCheck],
      ['Governance', 'Approves rules, delegations, sensitive exceptions and institutional versions.', Landmark],
      ['GED', 'Stores sources, versions, evidence, closed files and documentary rights.', FileArchive],
      ['IT & Support', 'Operates access, technical security, backups and continuity.', LockKeyhole]
    ],
    boundariesTitle: 'Functional boundaries',
    boundariesBody: 'Administration orchestrates traceability and deadlines. It does not replace the business owner, governance, GED, or legal and technical expertise.',
    boundaries: [
      'The owning function validates business content and criteria.',
      'Governance authorises policies, delegations and sensitive decisions.',
      'GED manages documentary retention, versions and access.',
      'IT & Support manages technical controls and continuity.',
      'Legal experts qualify matters requiring specialist advice.'
    ],
    source: 'Framing sources: Global Governing Document V4, Strategic Summary V2, M3S documentary architecture, and the 05_M3S_Processus_Procedures and 09_M3S_Archives structures.'
  },
  DE: {
    eyebrow: 'Verwaltung / Prozesse, Verfahren & Archive',
    title: 'Vom erwarteten Ablauf zum aufbewahrten Nachweis',
    subtitle: 'Schreibgeschützte Rahmenansicht zur Strukturierung administrativer Prozesse, ihrer Verfahren, Ausführungsakten und Archivierung. Sie beschreibt ein Zielmodell und erstellt kein offizielles Register.',
    badges: ['Schreibgeschützt', 'Zielmodell', 'Kein offizielles Register'],
    navLabel: 'Navigation in Prozesse, Verfahren und Archive',
    nav: ['Ablauf', 'Definitionen', 'Handbuch', 'Akten & Archive', 'Verantwortungen', 'Abgrenzung'],
    backToTop: 'Nach oben',
    cycleTitle: 'Gesteuerte Verwaltungskette',
    cycleBody: 'Jede Stufe erzeugt nützliche Informationen für die nächste. Nachweise und Archivierung werden bereits bei der Prozessgestaltung vorbereitet.',
    cycle: [
      ['Prozess', 'Erwartetes Ergebnis und Verantwortungen festlegen.'],
      ['Verfahren', 'Die genehmigte Arbeitsweise beschreiben.'],
      ['Ausführung', 'Autorisierte Aktivitäten und Entscheidungen umsetzen.'],
      ['Nachweis', 'Nützliche Fakten, Freigaben und Unterlagen sichern.'],
      ['Überprüfung', 'Ergebnis, Abweichungen und Folgeschritte prüfen.'],
      ['Archiv', 'Die abgeschlossene Version nach GED-Regeln ablegen.']
    ],
    definitionsTitle: 'Gemeinsames Arbeitsvokabular',
    definitionsBody: 'Diese Definitionen unterstützen fachfremde Leserinnen und Leser. Bis zur dokumentarischen Validierung bleiben sie Kandidaten für das zentrale 2SG-Glossar.',
    definitions: [
      ['Prozess', 'Eine koordinierte Folge von Aktivitäten, die eine Anfrage oder Ressource in ein prüfbares Ergebnis umwandelt.', Route],
      ['Verfahren', 'Die genehmigte Art, einen Teil eines Prozesses auszuführen: Schritte, Rollen, Kontrollen, Nachweise und Ausnahmen.', ClipboardCheck],
      ['Verfahrenshandbuch', 'Die gesteuerte Gesamtheit anwendbarer Verfahren, Verantwortungen, Versionen und gemeinsamer Regeln.', BookOpenCheck],
      ['Akte', 'Zusammengehörige Informationen und Unterlagen zu einer Angelegenheit, Entscheidung, einem Projekt oder einer Verpflichtung.', FolderKanban],
      ['Archiv', 'Eine abgeschlossene Akte oder ein Dokument mit Kontext, Version, Aufbewahrungsdauer und Zugriffsrechten.', Archive],
      ['Kontrolle', 'Eine vorab definierte Prüfung zur Bestätigung eines Zustands, einer Regel, Freigabe oder eines Nachweises.', ShieldCheck]
    ],
    manualTitle: 'Zielstruktur des Verfahrenshandbuchs',
    manualBody: 'Jedes Verfahren bleibt ein eigenständiges Blatt, das mit seinem Prozess verbunden und durch eine gemeinsame Struktur gesteuert wird.',
    manualFields: [
      'Kennung, Titel, Zweck und Geltungsbereich',
      'Auslöser, Eingaben und erwartetes Ergebnis',
      'Rollen, Delegationen und Berechtigungsstufe',
      'Schritte, Fristen, Abhängigkeiten und Ausnahmen',
      'Kontrollen, Nachweise und GED-Ablage',
      'Version, Freigabe, Gültigkeitsdatum und nächste Überprüfung'
    ],
    familiesTitle: 'Schrittweise zu organisierende Familien',
    families: [
      ['Management & Governance', 'Entscheidungen, Delegationen, Überprüfungen und institutionelle Steuerung.'],
      ['Betrieb', 'Aktivitäten, Einkäufe, Arbeiten, Leistungen und Abnahmen.'],
      ['Support', 'Verwaltung, Finanzen, HR, IT, GED und Vermögenswerte.'],
      ['Innovation & Wissen', 'Beobachtung, Erprobung, Lernen und Wissenssicherung.']
    ],
    recordsTitle: 'Modell für Akten- und Archivregister',
    recordsBody: 'Die folgenden Zeilen veranschaulichen die erwartete Struktur. Sie sind weder offene Akten noch offizielle Statusangaben.',
    demoLabel: 'Strukturbeispiele',
    headers: ['Objekt', 'Verknüpfter Prozess', 'Erwarteter Nachweis', 'Zielergebnis'],
    records: [
      ['Eingangskorrespondenz', 'Korrespondenz bearbeiten', 'Nachricht, Anhang, Entscheidung', 'Abgelegte Akte und verfolgte Antwort'],
      ['Institutionelles Dokument', 'Offizielle Version genehmigen', 'Quelle, Prüfung, Freigabe', 'Veröffentlichte Version und Vorgängerversion archiviert'],
      ['Verwaltungsakte', 'Angelegenheit oder Pflicht verfolgen', 'Fristen, Austausch, Nachweise', 'Dokumentierter Abschluss oder nächste Aktion']
    ],
    archiveRulesTitle: 'Mindestregeln für die Archivierung',
    archiveRules: [
      'Entwurf, aktive Version, ersetztes Dokument und geschlossenes Archiv trennen.',
      'Quelle, Datum, Version, Verantwortung und Vertraulichkeitsstufe aufbewahren.',
      'Sensible Nachweise nie ohne anwendbare Regel und Genehmigung löschen.',
      'Suche ermöglichen, ohne Daten für unberechtigte Profile offenzulegen.'
    ],
    responsibilitiesTitle: 'Verteilung der Verantwortungen',
    responsibilities: [
      ['Verwaltung', 'Führt das Register, koordiniert Fristen, erinnert und konsolidiert Status.', FileCheck2],
      ['Verantwortliche Funktion', 'Definiert den Fachinhalt, führt aus oder kontrolliert und bestätigt das Ergebnis.', UserCheck],
      ['Governance', 'Genehmigt Regeln, Delegationen, sensible Ausnahmen und institutionelle Versionen.', Landmark],
      ['GED', 'Bewahrt Quellen, Versionen, Nachweise, geschlossene Akten und Dokumentenrechte auf.', FileArchive],
      ['IT & Support', 'Betreibt Zugriffe, technische Sicherheit, Sicherungen und Kontinuität.', LockKeyhole]
    ],
    boundariesTitle: 'Funktionale Abgrenzung',
    boundariesBody: 'Die Verwaltung koordiniert Nachvollziehbarkeit und Fristen. Sie ersetzt weder die Fachverantwortung noch Governance, GED oder rechtliche und technische Expertise.',
    boundaries: [
      'Die verantwortliche Funktion validiert Fachinhalt und Kriterien.',
      'Governance autorisiert Richtlinien, Delegationen und sensible Entscheidungen.',
      'GED verwaltet Aufbewahrung, Versionen und Zugriffe.',
      'IT & Support verwaltet technische Kontrollen und Kontinuität.',
      'Rechtsfachleute qualifizieren Fälle mit Beratungsbedarf.'
    ],
    source: 'Rahmenquellen: Globales Leitdokument V4, Strategische Zusammenfassung V2, M3S-Dokumentenarchitektur sowie die Strukturen 05_M3S_Processus_Procedures und 09_M3S_Archives.'
  }
};

const InfoCard = ({ icon: Icon, title, body }) => (
  <article className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
    <Icon className="text-blue-300" size={21} aria-hidden="true" />
    <h4 className="mt-3 font-semibold text-slate-100">{title}</h4>
    <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
  </article>
);

const ProcessProcedureArchiveOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const sectionIds = ['process-cycle', 'process-definitions', 'process-manual', 'process-records', 'process-responsibilities', 'process-boundaries'];
  const navItems = sectionIds.map((id, index) => ({ id, label: t.nav[index] }));

  return (
    <section id="process-top" className="administration-overview mb-6 space-y-6 scroll-mt-24" aria-labelledby="process-title">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h2 id="process-title" className="mt-2 text-2xl font-semibold text-slate-100">{t.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.badges.map(label => <span key={label} className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-200">{label}</span>)}
          </div>
        </div>
      </header>

      <InternalSectionNav ariaLabel={t.navLabel} items={navItems} topId="process-top" backToTopLabel={t.backToTop} refreshKey={language} />

      <section id="process-cycle" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-cycle-title">
        <div className="flex items-start gap-3">
          <Network className="mt-0.5 shrink-0 text-blue-300" size={22} aria-hidden="true" />
          <div>
            <h3 id="process-cycle-title" className="text-xl font-semibold text-slate-100">{t.cycleTitle}</h3>
            <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.cycleBody}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {t.cycle.map(([title, body], index) => (
            <article key={title} className="min-h-36 rounded-lg border border-blue-800/70 bg-blue-950/25 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800 text-xs font-bold text-white">{index + 1}</span>
              <h4 className="mt-3 font-semibold text-slate-100">{title}</h4>
              <p className="mt-2 text-sm leading-5 text-slate-300">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process-definitions" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-definitions-title">
        <h3 id="process-definitions-title" className="text-xl font-semibold text-slate-100">{t.definitionsTitle}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.definitionsBody}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {t.definitions.map(([title, body, Icon]) => <InfoCard key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="process-manual" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-manual-title">
        <div className="flex items-start gap-3">
          <BookOpenCheck className="mt-0.5 shrink-0 text-emerald-300" size={22} aria-hidden="true" />
          <div>
            <h3 id="process-manual-title" className="text-xl font-semibold text-slate-100">{t.manualTitle}</h3>
            <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.manualBody}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {t.manualFields.map((field, index) => (
            <div key={field} className="flex items-start gap-3 rounded-md border border-slate-700 bg-slate-950/35 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-xs font-bold text-emerald-200">{index + 1}</span>
              <span className="text-sm font-semibold leading-6 text-slate-200">{field}</span>
            </div>
          ))}
        </div>
        <h4 className="mt-6 font-semibold text-slate-100">{t.familiesTitle}</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {t.families.map(([title, body]) => (
            <article key={title} className="rounded-md border border-emerald-800/60 bg-emerald-950/20 p-4">
              <h5 className="font-semibold text-emerald-100">{title}</h5>
              <p className="mt-2 text-sm leading-5 text-slate-300">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process-records" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-records-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 id="process-records-title" className="text-xl font-semibold text-slate-100">{t.recordsTitle}</h3>
            <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.recordsBody}</p>
          </div>
          <span className="shrink-0 rounded-full border border-amber-700 bg-amber-950/30 px-3 py-1 text-xs font-semibold text-amber-100">{t.demoLabel}</span>
        </div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-900/70">
              <tr>{t.headers.map(header => <th key={header} className="px-4 py-3 font-semibold text-slate-100">{header}</th>)}</tr>
            </thead>
            <tbody>
              {t.records.map(row => (
                <tr key={row[0]} className="border-t border-slate-700 transition-colors hover:bg-blue-950/25">
                  {row.map((cell, index) => <td key={cell} className={`px-4 py-3 leading-5 ${index === 0 ? 'font-semibold text-slate-200' : 'text-slate-300'}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 rounded-lg border border-amber-800/70 bg-amber-950/20 p-4">
          <div className="flex items-center gap-2">
            <FileArchive className="text-amber-300" size={20} aria-hidden="true" />
            <h4 className="font-semibold text-slate-100">{t.archiveRulesTitle}</h4>
          </div>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 lg:grid-cols-2">
            {t.archiveRules.map(rule => <li key={rule} className="flex items-start gap-2"><CheckCircle2 className="mt-1 shrink-0 text-amber-300" size={15} aria-hidden="true" /><span>{rule}</span></li>)}
          </ul>
        </div>
      </section>

      <section id="process-responsibilities" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="process-responsibilities-title">
        <h3 id="process-responsibilities-title" className="text-xl font-semibold text-slate-100">{t.responsibilitiesTitle}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {t.responsibilities.map(([title, body, Icon]) => <InfoCard key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="process-boundaries" className="scroll-mt-20 rounded-lg border border-amber-700/70 bg-amber-950/20 p-5" aria-labelledby="process-boundaries-title">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 shrink-0 text-amber-300" size={22} aria-hidden="true" />
          <div>
            <h3 id="process-boundaries-title" className="text-xl font-semibold text-slate-100">{t.boundariesTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-amber-100/80">{t.boundariesBody}</p>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 lg:grid-cols-2">
          {t.boundaries.map(item => <li key={item} className="flex items-start gap-2 rounded-md border border-slate-700 bg-slate-900/30 p-3"><CheckCircle2 className="mt-1 shrink-0 text-amber-300" size={15} aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
        <p className="mt-5 border-t border-amber-800/50 pt-4 text-xs leading-5 text-amber-100/80">{t.source}</p>
      </section>
    </section>
  );
};

export default ProcessProcedureArchiveOverview;
