import React from 'react';
import {
  Boxes,
  Building2,
  Database,
  FileCheck2,
  FolderArchive,
  GitBranch,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  ServerCog,
  UsersRound
} from 'lucide-react';
import InternalSectionNav from './InternalSectionNav';

const COPY = {
  FR: {
    eyebrow: 'Administration / Architecture & relations',
    title: 'Voir comment la fonction s’organise et coopère',
    subtitle: 'Cette vue décrit l’architecture fonctionnelle cible d’Administration, ses objets, ses échanges et ses systèmes d’appui. Elle ne constitue ni un organigramme hiérarchique ni une décision d’achat logiciel.',
    badges: ['Lecture seule', 'Modèle réutilisable', 'Sources visibles'],
    navLabel: 'Navigation dans Architecture et Relations',
    nav: ['Modèle', 'Couches', 'Objets', 'Relations', 'Systèmes', 'Sources'],
    backToTop: 'Revenir en haut',
    modelTitle: 'Patron réutilisable d’une application métier M3S',
    modelBody: 'Chaque fonction doit pouvoir être lue selon la même chaîne. Ce patron permettra d’accélérer les prochains modules sans recopier leur contenu métier.',
    model: [
      ['Mission', 'Pourquoi la fonction existe et quel résultat elle produit.'],
      ['Objets', 'Ce qu’elle crée, suit, contrôle ou transmet.'],
      ['Processus', 'Comment les objets évoluent avec rôles, délais et preuves.'],
      ['Relations', 'Qui fournit, valide, reçoit ou conserve l’information.'],
      ['Systèmes', 'Quels outils soutiennent le travail et avec quel niveau de maturité.'],
      ['Pilotage', 'Quels indicateurs sont définis, sourcés et attribués.']
    ],
    layersTitle: 'Quatre couches complémentaires',
    layersBody: 'Une couche ne remplace pas l’autre. Cette séparation évite de confondre décision, travail métier, conservation documentaire et fonctionnement technique.',
    layers: [
      ['1', 'Gouvernance', 'Orientations, politiques, délégations, arbitrages et validations sensibles.', Landmark],
      ['2', 'Fonction Administration', 'Registres, coordination, planification, courrier, conformité et procédures.', Building2],
      ['3', 'Services partagés', 'GED, glossaire, référentiels, annuaires et autres ressources communes.', FolderArchive],
      ['4', 'Socle technique', 'Interface, API, identité, droits, données, journaux, sécurité et continuité.', ServerCog]
    ],
    objectsTitle: 'Objets structurants de la fonction',
    objectsBody: 'Les objets ci-dessous sont des catégories de travail. Un enregistrement réel n’existe que lorsqu’une source autorisée le fournit.',
    objects: [
      ['Institution', 'Identité, vision, règles, gouvernance et ressources.', Building2],
      ['Projet & tâche', 'Objectifs, phases, activités, jalons, responsables et échéances.', GitBranch],
      ['Communication & courrier', 'Message, destinataire, canal, pièce, réponse et suivi.', Network],
      ['Obligation & dossier', 'Exigence, territoire, échéance, risque, preuve et décision.', FileCheck2],
      ['Processus & procédure', 'Déclencheur, étapes, rôles, contrôles, résultat et version.', Boxes],
      ['Document & archive', 'Source, version, confidentialité, conservation et droits.', FolderArchive]
    ],
    relationsTitle: 'Relations avec les autres fonctions',
    relationsBody: 'Administration orchestre les flux et la traçabilité. La fonction compétente reste propriétaire du contenu métier.',
    headers: ['Partenaire', 'Apport à Administration', 'Retour d’Administration'],
    relations: [
      ['Management & Gouvernance', 'Décisions, priorités, délégations et arbitrages.', 'Dossiers consolidés, alertes, preuves et demandes de décision.'],
      ['Fonctions métier', 'Règles, données, critères de contrôle et validation du fond.', 'Coordination, échéances, registres et traçabilité.'],
      ['Finances', 'Budgets, paiements, justificatifs et règles financières.', 'Engagements autorisés, dossiers et pièces à rapprocher.'],
      ['Ressources Humaines', 'Profils, rôles, contrats et obligations employeur.', 'Demandes, échéances et documents administratifs.'],
      ['GED & Knowledge Management', 'Versions, preuves, classement, recherche et conservation.', 'Métadonnées, statut du dossier et règles d’accès.'],
      ['IT & Support', 'Identité, droits, sécurité, disponibilité et sauvegardes.', 'Besoins fonctionnels, incidents et exigences de continuité.']
    ],
    systemsTitle: 'Systèmes et niveaux de raccordement',
    systemsBody: 'Le statut décrit le raccordement actuel ou le cadrage observé. Il ne vaut ni homologation technique ni choix de fournisseur.',
    statuses: { used: 'Utilisé', partial: 'Partiel', framed: 'Cadré', target: 'Cible' },
    systems: [
      ['Interface M3S', 'Navigation et vues fonctionnelles Administration.', 'used', Layers3],
      ['API & données', 'Tâches raccordées ; autres registres à connecter progressivement.', 'partial', Database],
      ['GED', 'Conservation des sources, pièces, versions et preuves.', 'used', FolderArchive],
      ['Identité & droits', 'Authentification existante ; matrice fonctionnelle à poursuivre.', 'partial', LockKeyhole],
      ['Courrier & communication', 'Parcours et frontières définis, registre encore en lecture seule.', 'framed', Network],
      ['Manuel de procédures', 'Structure cible définie, procédures officielles à gouverner.', 'target', FileCheck2]
    ],
    sourcesTitle: 'Sources maîtresses et règle de preuve',
    sourcesBody: 'L’interface résume et relie. La source maîtresse demeure dans le document, le référentiel, la GED ou le système autorisé qui porte la donnée.',
    sources: [
      ['Document Directeur Global V4', 'Orientation et architecture institutionnelle.'],
      ['Note de synthèse stratégique V2', 'Contexte, trajectoire et principes de fonctionnement.'],
      ['Référentiels fonctionnels M3S', 'Objets, responsabilités, processus et frontières.'],
      ['GED 2SG', 'Documents, versions, preuves et archives.'],
      ['API et registres autorisés', 'Données opérationnelles disponibles et datées.'],
      ['Glossaire central 2SG', 'Définitions transversales gouvernées.']
    ],
    ruleTitle: 'Règle de réutilisation',
    ruleBody: 'Pour chaque nouvelle fonction : conserver cette structure, remplacer seulement la mission, les objets, processus, relations, systèmes, sources et indicateurs propres au métier.',
    sourceNote: 'Cadrage consolidé à partir des documents directeurs 2SG/M3S, des référentiels fonctionnels, de la structure GED et de l’implémentation publiée.'
  },
  EN: {
    eyebrow: 'Administration / Architecture & relationships',
    title: 'See how the function is organised and cooperates',
    subtitle: 'This view describes Administration’s target functional architecture, objects, exchanges and supporting systems. It is neither a hierarchical organisation chart nor a software purchasing decision.',
    badges: ['Read-only', 'Reusable model', 'Visible sources'],
    navLabel: 'Architecture and Relationships navigation',
    nav: ['Model', 'Layers', 'Objects', 'Relationships', 'Systems', 'Sources'],
    backToTop: 'Back to top',
    modelTitle: 'Reusable pattern for an M3S business application',
    modelBody: 'Every function should be readable through the same chain. This pattern will accelerate future modules without copying their business content.',
    model: [
      ['Mission', 'Why the function exists and which result it produces.'],
      ['Objects', 'What it creates, tracks, controls or transfers.'],
      ['Processes', 'How objects evolve with roles, deadlines and evidence.'],
      ['Relationships', 'Who provides, validates, receives or retains information.'],
      ['Systems', 'Which tools support work and at what maturity level.'],
      ['Steering', 'Which indicators are defined, sourced and owned.']
    ],
    layersTitle: 'Four complementary layers',
    layersBody: 'No layer replaces another. This separation avoids mixing decisions, business work, documentary retention and technical operation.',
    layers: [
      ['1', 'Governance', 'Directions, policies, delegations, arbitration and sensitive approvals.', Landmark],
      ['2', 'Administration function', 'Registers, coordination, planning, correspondence, compliance and procedures.', Building2],
      ['3', 'Shared services', 'DMS, glossary, repositories, directories and shared resources.', FolderArchive],
      ['4', 'Technical foundation', 'Interface, API, identity, rights, data, logs, security and continuity.', ServerCog]
    ],
    objectsTitle: 'Structuring objects of the function',
    objectsBody: 'The items below are work categories. A real record exists only when an authorised source provides it.',
    objects: [
      ['Institution', 'Identity, vision, rules, governance and resources.', Building2],
      ['Project & task', 'Objectives, phases, activities, milestones, owners and deadlines.', GitBranch],
      ['Communication & correspondence', 'Message, recipient, channel, attachment, response and follow-up.', Network],
      ['Obligation & file', 'Requirement, territory, deadline, risk, evidence and decision.', FileCheck2],
      ['Process & procedure', 'Trigger, steps, roles, controls, result and version.', Boxes],
      ['Document & archive', 'Source, version, confidentiality, retention and rights.', FolderArchive]
    ],
    relationsTitle: 'Relationships with other functions',
    relationsBody: 'Administration orchestrates flows and traceability. The competent function remains owner of the business content.',
    headers: ['Partner', 'Input to Administration', 'Return from Administration'],
    relations: [
      ['Management & Governance', 'Decisions, priorities, delegations and arbitration.', 'Consolidated files, alerts, evidence and decision requests.'],
      ['Business functions', 'Rules, data, control criteria and business validation.', 'Coordination, deadlines, registers and traceability.'],
      ['Finance', 'Budgets, payments, evidence and financial rules.', 'Authorised commitments, files and records to reconcile.'],
      ['Human Resources', 'Profiles, roles, contracts and employer obligations.', 'Requests, deadlines and administrative documents.'],
      ['DMS & Knowledge Management', 'Versions, evidence, filing, search and retention.', 'Metadata, file status and access rules.'],
      ['IT & Support', 'Identity, rights, security, availability and backups.', 'Functional needs, incidents and continuity requirements.']
    ],
    systemsTitle: 'Systems and connection levels',
    systemsBody: 'Status describes current connection or observed framing. It is neither technical approval nor vendor selection.',
    statuses: { used: 'In use', partial: 'Partial', framed: 'Framed', target: 'Target' },
    systems: [
      ['M3S interface', 'Administration navigation and functional views.', 'used', Layers3],
      ['API & data', 'Tasks connected; other registers to be connected progressively.', 'partial', Database],
      ['DMS', 'Retention of sources, records, versions and evidence.', 'used', FolderArchive],
      ['Identity & rights', 'Authentication exists; functional matrix to be continued.', 'partial', LockKeyhole],
      ['Correspondence & communication', 'Flow and boundaries defined; register still read-only.', 'framed', Network],
      ['Procedures manual', 'Target structure defined; official procedures to govern.', 'target', FileCheck2]
    ],
    sourcesTitle: 'Master sources and evidence rule',
    sourcesBody: 'The interface summarises and links. The master source remains the document, repository, DMS or authorised system that carries the data.',
    sources: [
      ['Global Governing Document V4', 'Institutional direction and architecture.'],
      ['Strategic Summary V2', 'Context, trajectory and operating principles.'],
      ['M3S functional repositories', 'Objects, responsibilities, processes and boundaries.'],
      ['2SG DMS', 'Documents, versions, evidence and archives.'],
      ['Authorised APIs and registers', 'Available and dated operational data.'],
      ['2SG Central Glossary', 'Governed cross-functional definitions.']
    ],
    ruleTitle: 'Reuse rule',
    ruleBody: 'For every new function: retain this structure and replace only the mission, objects, processes, relationships, systems, sources and business indicators.',
    sourceNote: 'Framing consolidated from 2SG/M3S governing documents, functional repositories, DMS structure and the published implementation.'
  },
  DE: {
    eyebrow: 'Verwaltung / Architektur & Beziehungen',
    title: 'Organisation und Zusammenarbeit der Funktion verstehen',
    subtitle: 'Diese Ansicht beschreibt die funktionale Zielarchitektur der Verwaltung, ihre Objekte, Austauschbeziehungen und unterstützenden Systeme. Sie ist weder ein hierarchisches Organigramm noch eine Software-Kaufentscheidung.',
    badges: ['Schreibgeschützt', 'Wiederverwendbares Modell', 'Sichtbare Quellen'],
    navLabel: 'Navigation in Architektur und Beziehungen',
    nav: ['Modell', 'Ebenen', 'Objekte', 'Beziehungen', 'Systeme', 'Quellen'],
    backToTop: 'Nach oben',
    modelTitle: 'Wiederverwendbares Muster einer M3S-Fachanwendung',
    modelBody: 'Jede Funktion soll über dieselbe Kette lesbar sein. Dieses Muster beschleunigt künftige Module, ohne deren Fachinhalte zu kopieren.',
    model: [
      ['Auftrag', 'Warum die Funktion besteht und welches Ergebnis sie erzeugt.'],
      ['Objekte', 'Was sie erstellt, verfolgt, kontrolliert oder weitergibt.'],
      ['Prozesse', 'Wie sich Objekte mit Rollen, Fristen und Nachweisen entwickeln.'],
      ['Beziehungen', 'Wer Informationen liefert, validiert, erhält oder aufbewahrt.'],
      ['Systeme', 'Welche Werkzeuge die Arbeit mit welchem Reifegrad unterstützen.'],
      ['Steuerung', 'Welche Kennzahlen definiert, belegt und zugeordnet sind.']
    ],
    layersTitle: 'Vier ergänzende Ebenen',
    layersBody: 'Keine Ebene ersetzt eine andere. Die Trennung verhindert die Vermischung von Entscheidung, Facharbeit, Dokumentenaufbewahrung und technischem Betrieb.',
    layers: [
      ['1', 'Governance', 'Ausrichtung, Richtlinien, Delegationen, Entscheidungen und sensible Freigaben.', Landmark],
      ['2', 'Funktion Verwaltung', 'Register, Koordination, Planung, Korrespondenz, Compliance und Verfahren.', Building2],
      ['3', 'Gemeinsame Dienste', 'DMS, Glossar, Referenzwerke, Verzeichnisse und gemeinsame Ressourcen.', FolderArchive],
      ['4', 'Technisches Fundament', 'Oberfläche, API, Identität, Rechte, Daten, Protokolle, Sicherheit und Kontinuität.', ServerCog]
    ],
    objectsTitle: 'Strukturierende Objekte der Funktion',
    objectsBody: 'Die folgenden Elemente sind Arbeitskategorien. Ein realer Eintrag besteht nur, wenn eine autorisierte Quelle ihn liefert.',
    objects: [
      ['Institution', 'Identität, Vision, Regeln, Governance und Ressourcen.', Building2],
      ['Projekt & Aufgabe', 'Ziele, Phasen, Aktivitäten, Meilensteine, Verantwortliche und Fristen.', GitBranch],
      ['Kommunikation & Korrespondenz', 'Nachricht, Empfänger, Kanal, Anlage, Antwort und Nachverfolgung.', Network],
      ['Pflicht & Akte', 'Anforderung, Gebiet, Frist, Risiko, Nachweis und Entscheidung.', FileCheck2],
      ['Prozess & Verfahren', 'Auslöser, Schritte, Rollen, Kontrollen, Ergebnis und Version.', Boxes],
      ['Dokument & Archiv', 'Quelle, Version, Vertraulichkeit, Aufbewahrung und Rechte.', FolderArchive]
    ],
    relationsTitle: 'Beziehungen zu anderen Funktionen',
    relationsBody: 'Die Verwaltung orchestriert Abläufe und Nachvollziehbarkeit. Die zuständige Funktion bleibt Eigentümerin des Fachinhalts.',
    headers: ['Partner', 'Beitrag an die Verwaltung', 'Rückgabe der Verwaltung'],
    relations: [
      ['Management & Governance', 'Entscheidungen, Prioritäten, Delegationen und Schlichtung.', 'Konsolidierte Akten, Hinweise, Nachweise und Entscheidungsanfragen.'],
      ['Fachfunktionen', 'Regeln, Daten, Kontrollkriterien und fachliche Validierung.', 'Koordination, Fristen, Register und Nachvollziehbarkeit.'],
      ['Finanzen', 'Budgets, Zahlungen, Belege und Finanzregeln.', 'Autorisierte Verpflichtungen, Akten und abzugleichende Belege.'],
      ['Personalwesen', 'Profile, Rollen, Verträge und Arbeitgeberpflichten.', 'Anfragen, Fristen und Verwaltungsdokumente.'],
      ['DMS & Wissensmanagement', 'Versionen, Nachweise, Ablage, Suche und Aufbewahrung.', 'Metadaten, Aktenstatus und Zugriffsregeln.'],
      ['IT & Support', 'Identität, Rechte, Sicherheit, Verfügbarkeit und Sicherungen.', 'Funktionale Anforderungen, Vorfälle und Kontinuitätsbedarf.']
    ],
    systemsTitle: 'Systeme und Anbindungsgrade',
    systemsBody: 'Der Status beschreibt die aktuelle Anbindung oder den beobachteten Rahmen. Er ist weder technische Freigabe noch Anbieterwahl.',
    statuses: { used: 'Verwendet', partial: 'Teilweise', framed: 'Gerahmt', target: 'Ziel' },
    systems: [
      ['M3S-Oberfläche', 'Navigation und funktionale Verwaltungsansichten.', 'used', Layers3],
      ['API & Daten', 'Aufgaben angebunden; weitere Register schrittweise zu verbinden.', 'partial', Database],
      ['DMS', 'Aufbewahrung von Quellen, Unterlagen, Versionen und Nachweisen.', 'used', FolderArchive],
      ['Identität & Rechte', 'Authentifizierung vorhanden; funktionale Matrix fortzuführen.', 'partial', LockKeyhole],
      ['Korrespondenz & Kommunikation', 'Ablauf und Grenzen definiert; Register noch schreibgeschützt.', 'framed', Network],
      ['Verfahrenshandbuch', 'Zielstruktur definiert; offizielle Verfahren zu steuern.', 'target', FileCheck2]
    ],
    sourcesTitle: 'Masterquellen und Nachweisregel',
    sourcesBody: 'Die Oberfläche fasst zusammen und verknüpft. Masterquelle bleibt das Dokument, Referenzwerk, DMS oder autorisierte System, das die Daten trägt.',
    sources: [
      ['Globales Leitdokument V4', 'Institutionelle Ausrichtung und Architektur.'],
      ['Strategische Zusammenfassung V2', 'Kontext, Entwicklungspfad und Arbeitsprinzipien.'],
      ['Funktionale M3S-Referenzwerke', 'Objekte, Verantwortungen, Prozesse und Grenzen.'],
      ['2SG-DMS', 'Dokumente, Versionen, Nachweise und Archive.'],
      ['Autorisierte APIs und Register', 'Verfügbare und datierte operative Daten.'],
      ['Zentrales 2SG-Glossar', 'Gesteuerte funktionsübergreifende Definitionen.']
    ],
    ruleTitle: 'Wiederverwendungsregel',
    ruleBody: 'Für jede neue Funktion: diese Struktur beibehalten und nur Auftrag, Objekte, Prozesse, Beziehungen, Systeme, Quellen und Fachkennzahlen ersetzen.',
    sourceNote: 'Konsolidierter Rahmen aus 2SG/M3S-Leitdokumenten, funktionalen Referenzwerken, DMS-Struktur und veröffentlichter Implementierung.'
  }
};

const SectionTitle = ({ id, title, body }) => (
  <div>
    <h3 id={`${id}-title`} className="text-xl font-semibold text-slate-100">{title}</h3>
    <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{body}</p>
  </div>
);

const AdministrationArchitectureOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const ids = ['admin-architecture-model', 'admin-architecture-layers', 'admin-architecture-objects', 'admin-architecture-relations', 'admin-architecture-systems', 'admin-architecture-sources'];
  const navItems = ids.map((id, index) => ({ id, label: t.nav[index] }));

  return (
    <div id="admin-architecture-top" className="administration-overview space-y-6">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">{t.title}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-300">{t.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {t.badges.map(label => <span key={label} className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">{label}</span>)}
        </div>
      </header>

      <InternalSectionNav ariaLabel={t.navLabel} items={navItems} topId="admin-architecture-top" backToTopLabel={t.backToTop} refreshKey={language} />

      <section id={ids[0]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[0]}-title`}>
        <SectionTitle id={ids[0]} title={t.modelTitle} body={t.modelBody} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {t.model.map(([title, body], index) => (
            <article key={title} className="min-h-32 rounded-lg border border-slate-700 bg-slate-900/45 p-4">
              <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-blue-200">{index + 1}</span><h4 className="font-semibold text-slate-100">{title}</h4></div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id={ids[1]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[1]}-title`}>
        <SectionTitle id={ids[1]} title={t.layersTitle} body={t.layersBody} />
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {t.layers.map(([number, title, body, Icon]) => (
            <article key={number} className="min-h-44 rounded-lg border border-blue-900/70 bg-slate-900/45 p-4">
              <div className="flex items-start justify-between gap-3"><span className="text-2xl font-semibold text-blue-300">{number}</span><Icon size={22} className="text-blue-300" aria-hidden="true" /></div>
              <h4 className="mt-4 font-semibold text-slate-100">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id={ids[2]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[2]}-title`}>
        <SectionTitle id={ids[2]} title={t.objectsTitle} body={t.objectsBody} />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.objects.map(([title, body, Icon]) => <article key={title} className="flex min-h-32 gap-4 rounded-lg border border-slate-700 bg-slate-900/45 p-4"><Icon size={22} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" /><div><h4 className="font-semibold text-slate-100">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div></article>)}
        </div>
      </section>

      <section id={ids[3]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[3]}-title`}>
        <SectionTitle id={ids[3]} title={t.relationsTitle} body={t.relationsBody} />
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-900"><tr>{t.headers.map(header => <th key={header} className="px-4 py-3 font-semibold text-slate-200">{header}</th>)}</tr></thead><tbody>{t.relations.map((row, index) => <tr key={row[0]} className={`border-t border-slate-700 ${index % 2 ? 'bg-slate-900/30' : 'bg-slate-800'}`}>{row.map((cell, cellIndex) => <td key={cell} className={`px-4 py-3 leading-6 ${cellIndex === 0 ? 'font-semibold text-slate-200' : 'text-slate-400'}`}>{cell}</td>)}</tr>)}</tbody></table>
        </div>
      </section>

      <section id={ids[4]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[4]}-title`}>
        <SectionTitle id={ids[4]} title={t.systemsTitle} body={t.systemsBody} />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.systems.map(([title, body, status, Icon]) => <article key={title} className="min-h-36 rounded-lg border border-slate-700 bg-slate-900/45 p-4"><div className="flex items-start justify-between gap-3"><Icon size={22} className="text-emerald-300" aria-hidden="true" /><span className="rounded-full border border-slate-600 px-2.5 py-1 text-xs font-semibold text-slate-300">{t.statuses[status]}</span></div><h4 className="mt-4 font-semibold text-slate-100">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></article>)}
        </div>
      </section>

      <section id={ids[5]} className="scroll-mt-24 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby={`${ids[5]}-title`}>
        <SectionTitle id={ids[5]} title={t.sourcesTitle} body={t.sourcesBody} />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{t.sources.map(([title, body]) => <article key={title} className="rounded-lg border border-slate-700 bg-slate-900/45 p-4"><h4 className="font-semibold text-slate-100">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></article>)}</div>
        <aside className="mt-5 rounded-lg border border-emerald-800 bg-emerald-950/20 p-5"><div className="flex gap-3"><UsersRound size={22} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" /><div><h3 className="font-semibold text-slate-100">{t.ruleTitle}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{t.ruleBody}</p></div></div></aside>
        <p className="mt-5 border-t border-slate-700 pt-4 text-xs leading-5 text-slate-500">{t.sourceNote}</p>
      </section>
    </div>
  );
};

export default AdministrationArchitectureOverview;
