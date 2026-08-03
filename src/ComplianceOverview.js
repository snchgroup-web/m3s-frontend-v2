import React from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  FileSearch,
  FolderLock,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import InternalSectionNav from './InternalSectionNav';

const COPY = {
  FR: {
    eyebrow: 'Administration / Conformité',
    title: 'Conformité légale, réglementaire & juridique',
    subtitle: 'Vue de cadrage en lecture seule pour vérifier la conformité associative de 2SG, suivre ses obligations et piloter ses dossiers juridiques ou contentieux. Elle ne constitue ni un avis juridique ni une déclaration de conformité.',
    readOnly: 'Lecture seule',
    targetModel: 'Modèle cible',
    noClaim: 'Aucune conformité déclarée',
    navLabel: 'Navigation dans Conformité',
    navFramework: 'Périmètre',
    navRegister: 'Registres',
    navControls: 'Contrôles & preuves',
    navResponsibilities: 'Responsabilités',
    navBoundaries: 'Frontières',
    backToTop: 'Revenir en haut',
    frameworkTitle: 'Périmètre de conformité à organiser',
    frameworkBody: 'La conformité est transversale. Administration tient les registres et les échéances ; la gouvernance et les fonctions compétentes valident le fond dans leur domaine.',
    institutional: 'Conformité associative',
    institutionalBody: 'Statuts, règlement intérieur, code de conduite, organes, mandats, procès-verbaux, délégations et décisions, à confirmer par les versions signées en vigueur.',
    legal: 'Légale, réglementaire & juridique',
    legalBody: 'Lois, règlements, contrats, autorisations, déclarations, relations avec les autorités et suivi des dossiers juridiques ou contentieux.',
    socialFiscal: 'Sociale & fiscale',
    socialFiscalBody: 'Employeur, personnel, déclarations, affiliations, fiscalité et paiements, sous responsabilité RH et Finances.',
    dataSecurity: 'Données & sécurité',
    dataSecurityBody: 'Classification, confidentialité, habilitations, protection des données, sauvegardes et continuité minimale.',
    registerTitle: 'Registres des obligations et dossiers juridiques',
    registerBody: 'Chaque obligation et chaque dossier doivent être traçables sans transformer une hypothèse, une allégation ou une position de partie en fait juridiquement établi.',
    registerFields: ['Identifiant et territoire', 'Texte ou source officielle', 'Fonction responsable', 'Échéance ou fréquence', 'Statut et niveau de risque', 'Preuve attendue et emplacement GED'],
    associationTitle: 'Conformité de l’association à vérifier',
    associationStatus: 'Contrôle documentaire à ouvrir',
    associationItems: ['Statuts signés et version en vigueur', 'Règlement intérieur approuvé', 'Code de conduite adopté', 'Composition des organes et mandats actuels', 'Procès-verbaux, décisions et délégations', 'Inscriptions, déclarations et obligations périodiques applicables'],
    legalCasesTitle: 'Registre juridique & contentieux',
    legalCaseStatus: 'Contentieux signalé en cours',
    legalCaseName: 'Villa LR1 — dossier A. Kane',
    legalCaseBody: 'Plainte concernant des malfaçons alléguées liées à la construction de la villa, signalée comme en cours devant le tribunal. La juridiction, les références, les parties, les échéances, les conseils et les pièces doivent être confirmés à partir du dossier juridique.',
    legalCaseRule: 'Aucune responsabilité ni issue judiciaire n’est présumée. Les pièces et données sensibles restent classifiées dans la GED avec accès restreint.',
    lifecycleTitle: 'Cycle de suivi',
    lifecycleSteps: ['Identifier', 'Qualifier', 'Attribuer', 'Planifier', 'Contrôler', 'Prouver', 'Clôturer ou renouveler'],
    controlsTitle: 'Contrôles, preuves et alertes',
    controlsBody: 'Une obligation n’est déclarée satisfaite qu’après vérification de la preuve par la personne ou la fonction compétente.',
    evidence: 'Preuve vérifiable',
    evidenceBody: 'Document, reçu, déclaration, procès-verbal, contrat, journal ou contrôle daté, conservé avec classification dans la GED.',
    alert: 'Échéance & alerte',
    alertBody: 'Rappel avant date limite, responsable désigné, retard visible et action corrective documentée.',
    exception: 'Écart & exception',
    exceptionBody: 'Motif, risque, décision humaine, mesure compensatoire, délai de correction et trace de clôture.',
    validation: 'Validation humaine',
    validationBody: 'Les interprétations sensibles et les déclarations officielles restent soumises à la gouvernance ou à un professionnel compétent.',
    responsibilitiesTitle: 'Répartition des responsabilités',
    administrationRole: 'Administration',
    administrationRoleBody: 'Tient le registre, coordonne, relance, consolide les statuts et oriente les preuves.',
    governanceRole: 'Gouvernance',
    governanceRoleBody: 'Décide, valide les politiques, accepte les risques résiduels et autorise les déclarations institutionnelles.',
    specialistRole: 'Fonctions métier / conseil compétent',
    specialistRoleBody: 'RH, Finances, IT, opérations ou conseil juridique qualifient et valident le fond dans leur périmètre.',
    gedRole: 'GED',
    gedRoleBody: 'Conserve les sources, versions, preuves et historiques selon classification et droits d’accès.',
    boundariesTitle: 'Frontières fonctionnelles et prudence',
    boundariesBody: 'Cette vue organise le pilotage administratif. Elle ne remplace pas les modules métiers ni une expertise juridique.',
    boundaryItems: [
      'Juridique : interprétation du droit, contrats sensibles, contentieux et avis professionnels.',
      'RH : obligations employeur, personnel, contrats de travail et affiliations sociales.',
      'Finances : fiscalité, comptabilité, paiements et justificatifs financiers.',
      'IT & Support : sécurité technique, accès, sauvegardes et incidents numériques.',
      'GED : conservation documentaire ; Administration reste responsable du suivi métier.'
    ],
    sourceRule: 'Les sources maîtresses identifiées sont le Document Directeur Global V4, la Note de synthèse stratégique V2, les documents institutionnels signés, le dossier juridique classifié et les sources officielles applicables. Toute règle ou situation doit afficher sa source, sa date, sa version, son territoire et son niveau de confidentialité.'
  },
  EN: {
    eyebrow: 'Administration / Compliance',
    title: 'Legal, regulatory & institutional compliance',
    subtitle: 'Read-only framing view to verify 2SG association compliance, monitor its obligations, and track legal matters or disputes. It is neither legal advice nor a declaration of compliance.',
    readOnly: 'Read-only',
    targetModel: 'Target model',
    noClaim: 'No compliance claim',
    navLabel: 'Compliance navigation',
    navFramework: 'Scope',
    navRegister: 'Registers',
    navControls: 'Controls & evidence',
    navResponsibilities: 'Responsibilities',
    navBoundaries: 'Boundaries',
    backToTop: 'Back to top',
    frameworkTitle: 'Compliance scope to organise',
    frameworkBody: 'Compliance is cross-functional. Administration maintains registers and deadlines; governance and competent functions validate substance in their domain.',
    institutional: 'Association compliance',
    institutionalBody: 'Statutes, internal rules, code of conduct, bodies, mandates, minutes, delegations and decisions, to be confirmed against current signed versions.',
    legal: 'Legal, regulatory & judicial',
    legalBody: 'Laws, regulations, contracts, permits, filings, relations with authorities, and monitoring of legal matters or disputes.',
    socialFiscal: 'Employment & tax',
    socialFiscalBody: 'Employer, staff, filings, registrations, taxation and payments, under HR and Finance ownership.',
    dataSecurity: 'Data & security',
    dataSecurityBody: 'Classification, confidentiality, permissions, data protection, backups and minimum continuity.',
    registerTitle: 'Obligation and legal matter registers',
    registerBody: 'Every obligation and matter must be traceable without turning an assumption, allegation or party position into a legally established fact.',
    registerFields: ['Identifier and territory', 'Official text or source', 'Owning function', 'Deadline or frequency', 'Status and risk level', 'Expected evidence and GED location'],
    associationTitle: 'Association compliance to verify',
    associationStatus: 'Documentary review to open',
    associationItems: ['Signed statutes and current version', 'Approved internal rules', 'Adopted code of conduct', 'Current bodies and mandates', 'Minutes, decisions and delegations', 'Applicable registrations, filings and periodic duties'],
    legalCasesTitle: 'Legal matters & disputes register',
    legalCaseStatus: 'Reported ongoing dispute',
    legalCaseName: 'Villa LR1 — A. Kane matter',
    legalCaseBody: 'Complaint concerning alleged construction defects at the villa, reported as pending before the court. The court, references, parties, deadlines, counsel and documents must be confirmed from the legal file.',
    legalCaseRule: 'No liability or judicial outcome is presumed. Sensitive records and data remain classified in the GED with restricted access.',
    lifecycleTitle: 'Monitoring cycle',
    lifecycleSteps: ['Identify', 'Qualify', 'Assign', 'Plan', 'Control', 'Evidence', 'Close or renew'],
    controlsTitle: 'Controls, evidence and alerts',
    controlsBody: 'An obligation is marked satisfied only after its evidence is checked by the competent person or function.',
    evidence: 'Verifiable evidence',
    evidenceBody: 'Document, receipt, filing, minutes, contract, log or dated control stored with classification in the GED.',
    alert: 'Deadline & alert',
    alertBody: 'Reminder before due date, named owner, visible delay and documented corrective action.',
    exception: 'Gap & exception',
    exceptionBody: 'Reason, risk, human decision, compensating measure, correction deadline and closure trace.',
    validation: 'Human validation',
    validationBody: 'Sensitive interpretations and official statements remain subject to governance or a competent professional.',
    responsibilitiesTitle: 'Responsibility allocation',
    administrationRole: 'Administration',
    administrationRoleBody: 'Maintains the register, coordinates, follows up, consolidates statuses and routes evidence.',
    governanceRole: 'Governance',
    governanceRoleBody: 'Decides, approves policies, accepts residual risks and authorises institutional statements.',
    specialistRole: 'Business functions / competent adviser',
    specialistRoleBody: 'HR, Finance, IT, operations or legal counsel qualify and validate substance in their perimeter.',
    gedRole: 'GED',
    gedRoleBody: 'Stores sources, versions, evidence and histories according to classification and access rights.',
    boundariesTitle: 'Functional boundaries and caution',
    boundariesBody: 'This view organises administrative monitoring. It does not replace business modules or legal expertise.',
    boundaryItems: [
      'Legal: interpretation of law, sensitive contracts, disputes and professional opinions.',
      'HR: employer duties, staff, employment contracts and social registrations.',
      'Finance: taxation, accounting, payments and financial evidence.',
      'IT & Support: technical security, access, backups and digital incidents.',
      'GED: documentary storage; Administration remains responsible for business monitoring.'
    ],
    sourceRule: 'Identified master sources are the Global Governing Document V4, Strategic Summary V2, signed institutional records, the classified legal file and applicable official sources. Every rule or situation must display its source, date, version, territory and confidentiality level.'
  },
  DE: {
    eyebrow: 'Verwaltung / Compliance',
    title: 'Rechtliche, regulatorische & institutionelle Compliance',
    subtitle: 'Schreibgeschützte Rahmenansicht zur Prüfung der Vereinskonformität von 2SG, zur Überwachung von Verpflichtungen sowie zur Steuerung rechtlicher Verfahren oder Streitfälle. Sie ist weder Rechtsberatung noch eine Konformitätserklärung.',
    readOnly: 'Schreibgeschützt',
    targetModel: 'Zielmodell',
    noClaim: 'Keine Konformität behauptet',
    navLabel: 'Navigation innerhalb der Compliance',
    navFramework: 'Umfang',
    navRegister: 'Register',
    navControls: 'Kontrollen & Nachweise',
    navResponsibilities: 'Verantwortungen',
    navBoundaries: 'Abgrenzung',
    backToTop: 'Nach oben',
    frameworkTitle: 'Zu organisierender Compliance-Umfang',
    frameworkBody: 'Compliance ist bereichsübergreifend. Die Verwaltung führt Register und Fristen; Governance und zuständige Funktionen validieren die Inhalte ihres Bereichs.',
    institutional: 'Vereinskonformität',
    institutionalBody: 'Statuten, Geschäftsordnung, Verhaltenskodex, Organe, Mandate, Protokolle, Delegationen und Entscheidungen, anhand der geltenden unterzeichneten Fassungen zu bestätigen.',
    legal: 'Rechtlich, regulatorisch & justiziell',
    legalBody: 'Gesetze, Vorschriften, Verträge, Genehmigungen, Meldungen, Behördenkontakte und die Verfolgung rechtlicher Verfahren oder Streitfälle.',
    socialFiscal: 'Arbeits- & steuerrechtlich',
    socialFiscalBody: 'Arbeitgeber, Personal, Meldungen, Anmeldungen, Steuern und Zahlungen unter Verantwortung von HR und Finanzen.',
    dataSecurity: 'Daten & Sicherheit',
    dataSecurityBody: 'Klassifizierung, Vertraulichkeit, Berechtigungen, Datenschutz, Sicherungen und Mindestkontinuität.',
    registerTitle: 'Register der Verpflichtungen und Rechtsfälle',
    registerBody: 'Jede Verpflichtung und jeder Fall müssen nachvollziehbar sein, ohne Annahmen, Behauptungen oder Parteipositionen als rechtlich festgestellte Tatsachen darzustellen.',
    registerFields: ['Kennung und Gebiet', 'Amtlicher Text oder Quelle', 'Verantwortliche Funktion', 'Frist oder Häufigkeit', 'Status und Risikostufe', 'Erwarteter Nachweis und GED-Ablage'],
    associationTitle: 'Vereinskonformität zu prüfen',
    associationStatus: 'Dokumentenprüfung zu eröffnen',
    associationItems: ['Unterzeichnete Statuten und geltende Fassung', 'Genehmigte Geschäftsordnung', 'Verabschiedeter Verhaltenskodex', 'Aktuelle Organe und Mandate', 'Protokolle, Entscheidungen und Delegationen', 'Anwendbare Eintragungen, Meldungen und periodische Pflichten'],
    legalCasesTitle: 'Register für Rechtsfälle & Streitigkeiten',
    legalCaseStatus: 'Laufender Streitfall gemeldet',
    legalCaseName: 'Villa LR1 — Fall A. Kane',
    legalCaseBody: 'Klage wegen behaupteter Baumängel an der Villa, die als gerichtlich anhängig gemeldet wurde. Gericht, Aktenzeichen, Parteien, Fristen, Rechtsbeistand und Unterlagen sind anhand der Rechtsakte zu bestätigen.',
    legalCaseRule: 'Weder Haftung noch Verfahrensausgang werden vorweggenommen. Sensible Unterlagen und Daten bleiben in der GED klassifiziert und zugriffsbeschränkt.',
    lifecycleTitle: 'Überwachungszyklus',
    lifecycleSteps: ['Identifizieren', 'Qualifizieren', 'Zuordnen', 'Planen', 'Kontrollieren', 'Nachweisen', 'Schließen oder erneuern'],
    controlsTitle: 'Kontrollen, Nachweise und Warnungen',
    controlsBody: 'Eine Verpflichtung gilt erst nach Prüfung des Nachweises durch die zuständige Person oder Funktion als erfüllt.',
    evidence: 'Prüfbarer Nachweis',
    evidenceBody: 'Dokument, Beleg, Meldung, Protokoll, Vertrag, Log oder datierte Kontrolle mit Klassifizierung in der GED.',
    alert: 'Frist & Warnung',
    alertBody: 'Erinnerung vor Fälligkeit, benannte Verantwortung, sichtbarer Verzug und dokumentierte Korrekturmaßnahme.',
    exception: 'Abweichung & Ausnahme',
    exceptionBody: 'Grund, Risiko, menschliche Entscheidung, Ersatzmaßnahme, Korrekturfrist und Abschlussnachweis.',
    validation: 'Menschliche Validierung',
    validationBody: 'Sensible Auslegungen und offizielle Erklärungen bleiben der Governance oder einer fachkundigen Stelle vorbehalten.',
    responsibilitiesTitle: 'Verteilung der Verantwortungen',
    administrationRole: 'Verwaltung',
    administrationRoleBody: 'Führt das Register, koordiniert, erinnert, konsolidiert Status und leitet Nachweise weiter.',
    governanceRole: 'Governance',
    governanceRoleBody: 'Entscheidet, genehmigt Richtlinien, akzeptiert Restrisiken und autorisiert institutionelle Erklärungen.',
    specialistRole: 'Fachfunktionen / kompetente Beratung',
    specialistRoleBody: 'HR, Finanzen, IT, Betrieb oder Rechtsberatung qualifizieren und validieren Inhalte in ihrem Bereich.',
    gedRole: 'GED',
    gedRoleBody: 'Bewahrt Quellen, Versionen, Nachweise und Historien nach Klassifizierung und Zugriffsrechten auf.',
    boundariesTitle: 'Funktionale Abgrenzung und Vorsicht',
    boundariesBody: 'Diese Ansicht organisiert die administrative Überwachung. Sie ersetzt weder Fachmodule noch Rechtsberatung.',
    boundaryItems: [
      'Recht: Rechtsauslegung, sensible Verträge, Streitfälle und fachliche Gutachten.',
      'HR: Arbeitgeberpflichten, Personal, Arbeitsverträge und Sozialversicherungsanmeldungen.',
      'Finanzen: Steuern, Buchhaltung, Zahlungen und Finanznachweise.',
      'IT & Support: technische Sicherheit, Zugriffe, Sicherungen und digitale Vorfälle.',
      'GED: Dokumentenablage; die Verwaltung bleibt für die fachliche Überwachung verantwortlich.'
    ],
    sourceRule: 'Identifizierte maßgebliche Quellen sind das Globale Leitdokument V4, die Strategische Zusammenfassung V2, unterzeichnete institutionelle Unterlagen, die klassifizierte Rechtsakte und anwendbare amtliche Quellen. Jede Regel oder Situation muss Quelle, Datum, Version, Gebiet und Vertraulichkeitsstufe anzeigen.'
  }
};

const Card = ({ icon: Icon, title, body }) => (
  <article className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
    <Icon className="text-blue-300" size={21} aria-hidden="true" />
    <h4 className="mt-3 font-bold text-white">{title}</h4>
    <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
  </article>
);

const ComplianceOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const navItems = [
    { id: 'compliance-framework', label: t.navFramework },
    { id: 'compliance-register', label: t.navRegister },
    { id: 'compliance-controls', label: t.navControls },
    { id: 'compliance-responsibilities', label: t.navResponsibilities },
    { id: 'compliance-boundaries', label: t.navBoundaries }
  ];
  const framework = [
    [t.institutional, t.institutionalBody, Landmark],
    [t.legal, t.legalBody, Scale],
    [t.socialFiscal, t.socialFiscalBody, UserCheck],
    [t.dataSecurity, t.dataSecurityBody, FolderLock]
  ];
  const controls = [
    [t.evidence, t.evidenceBody, FileSearch],
    [t.alert, t.alertBody, CalendarClock],
    [t.exception, t.exceptionBody, AlertTriangle],
    [t.validation, t.validationBody, CheckCircle2]
  ];
  const responsibilities = [
    [t.administrationRole, t.administrationRoleBody, FileCheck2],
    [t.governanceRole, t.governanceRoleBody, Landmark],
    [t.specialistRole, t.specialistRoleBody, UserCheck],
    [t.gedRole, t.gedRoleBody, FolderLock]
  ];

  return (
    <section id="compliance-top" className="administration-overview mb-6 space-y-6 scroll-mt-24" aria-labelledby="compliance-title">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase text-blue-300">{t.eyebrow}</p>
            <h2 id="compliance-title" className="mt-2 text-2xl font-bold text-white">{t.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[t.readOnly, t.targetModel, t.noClaim].map(label => (
              <span key={label} className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-200">{label}</span>
            ))}
          </div>
        </div>
      </header>

      <InternalSectionNav ariaLabel={t.navLabel} items={navItems} topId="compliance-top" backToTopLabel={t.backToTop} refreshKey={language} />

      <section id="compliance-framework" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="compliance-framework-title">
        <h3 id="compliance-framework-title" className="text-xl font-bold text-white">{t.frameworkTitle}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.frameworkBody}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {framework.map(([title, body, Icon]) => <Card key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="compliance-register" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="compliance-register-title">
        <h3 id="compliance-register-title" className="text-xl font-bold text-white">{t.registerTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{t.registerBody}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {t.registerFields.map((field, index) => (
            <div key={field} className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-950/35 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-bold text-blue-200">{index + 1}</span>
              <span className="text-sm font-semibold text-slate-200">{field}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <article className="rounded-lg border border-blue-800/80 bg-blue-950/25 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Landmark className="text-blue-300" size={21} aria-hidden="true" />
                <h4 className="font-bold text-white">{t.associationTitle}</h4>
              </div>
              <span className="rounded-full border border-blue-700 bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-100">{t.associationStatus}</span>
            </div>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 sm:grid-cols-2">
              {t.associationItems.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 shrink-0 text-blue-300" size={15} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-amber-700/80 bg-amber-950/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gavel className="text-amber-300" size={21} aria-hidden="true" />
                <h4 className="font-bold text-white">{t.legalCasesTitle}</h4>
              </div>
              <span className="rounded-full border border-amber-700 bg-amber-950 px-3 py-1 text-xs font-semibold text-amber-100">{t.legalCaseStatus}</span>
            </div>
            <h5 className="mt-4 text-lg font-bold text-amber-100">{t.legalCaseName}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t.legalCaseBody}</p>
            <p className="mt-3 border-t border-amber-900/60 pt-3 text-sm leading-6 text-amber-100/80">{t.legalCaseRule}</p>
          </article>
        </div>
        <h4 className="mt-6 font-bold text-white">{t.lifecycleTitle}</h4>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {t.lifecycleSteps.map((step, index) => (
            <React.Fragment key={step}>
              <span className="shrink-0 rounded-md border border-blue-800 bg-blue-950/40 px-3 py-2 text-sm font-semibold text-blue-100">{step}</span>
              {index < t.lifecycleSteps.length - 1 && <span className="self-center text-blue-400" aria-hidden="true">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section id="compliance-controls" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="compliance-controls-title">
        <h3 id="compliance-controls-title" className="text-xl font-bold text-white">{t.controlsTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{t.controlsBody}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {controls.map(([title, body, Icon]) => <Card key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="compliance-responsibilities" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="compliance-responsibilities-title">
        <h3 id="compliance-responsibilities-title" className="text-xl font-bold text-white">{t.responsibilitiesTitle}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {responsibilities.map(([title, body, Icon]) => <Card key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="compliance-boundaries" className="scroll-mt-20 rounded-lg border border-amber-700/70 bg-amber-950/20 p-5" aria-labelledby="compliance-boundaries-title">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-amber-300" size={22} aria-hidden="true" />
          <div>
            <h3 id="compliance-boundaries-title" className="text-xl font-bold text-white">{t.boundariesTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-amber-100/80">{t.boundariesBody}</p>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 lg:grid-cols-2">
          {t.boundaryItems.map(item => <li key={item} className="rounded-md border border-amber-900/60 bg-slate-950/25 px-3 py-2">{item}</li>)}
        </ul>
        <p className="mt-4 border-t border-amber-900/60 pt-4 text-sm leading-6 text-amber-100/80">{t.sourceRule}</p>
      </section>
    </section>
  );
};

export default ComplianceOverview;
