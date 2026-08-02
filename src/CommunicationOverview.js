import React from 'react';
import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CircleUserRound,
  FileInput,
  FileOutput,
  FolderLock,
  Languages,
  Mail,
  Megaphone,
  MessagesSquare,
  Route,
  Send,
  ShieldCheck
} from 'lucide-react';
import InternalSectionNav from './InternalSectionNav';

const COPY = {
  FR: {
    eyebrow: 'Administration / Communication & Courrier',
    title: 'Communication institutionnelle & courrier officiel',
    subtitle: 'Vue de cadrage en lecture seule pour organiser les communications internes et externes de 2SG ainsi que le courrier entrant et sortant. Elle ne remplace ni une messagerie, ni la GED, ni le CRM.',
    readOnly: 'Lecture seule',
    targetModel: 'Modèle cible',
    demoData: 'Données de démonstration',
    navLabel: 'Navigation dans Communication et Courrier',
    navScope: 'Périmètre',
    navRegister: 'Registre',
    navWorkflow: 'Circuit',
    navCommunication: 'Communication',
    navGovernance: 'Responsabilités',
    backToTop: 'Revenir en haut',
    scopeTitle: 'Périmètre administratif à organiser',
    scopeBody: 'Administration assure la traçabilité, l’orientation et les échéances. Le fond reste validé par la gouvernance ou la fonction compétente avant toute diffusion officielle.',
    internal: 'Communication interne',
    internalBody: 'Notes, décisions, consignes, comptes rendus et informations destinées aux membres, équipes et personnels concernés.',
    external: 'Communication institutionnelle externe',
    externalBody: 'Présentations, informations partenaires, prises de position et messages publics autorisés au nom de 2SG.',
    incoming: 'Courrier entrant',
    incomingBody: 'Réception, horodatage, enregistrement, classification, attribution, échéance et réponse attendue.',
    outgoing: 'Courrier sortant',
    outgoingBody: 'Rédaction, contrôle, validation, signature, envoi, preuve de transmission et archivage.',
    registerTitle: 'Registre pilote du courrier et des communications',
    registerBody: 'Chaque entrée reçoit un identifiant, un responsable, un statut et un lien vers ses pièces dans la GED. Les exemples ci-dessous illustrent le modèle et ne correspondent à aucun courrier réel.',
    sampleBadge: 'Exemple',
    registerFields: ['Identifiant et sens', 'Date et canal', 'Expéditeur / destinataire', 'Objet et classification', 'Responsable et échéance', 'Statut et preuve GED'],
    sampleItems: [
      { id: 'COR-ENT-0001', title: 'Demande institutionnelle reçue', direction: 'Entrant · Email', status: 'À qualifier', owner: 'Administration', deadline: 'Échéance à fixer' },
      { id: 'COR-SOR-0001', title: 'Réponse officielle préparée', direction: 'Sortant · Courrier', status: 'En validation', owner: 'Fonction compétente', deadline: 'Envoi après autorisation' },
      { id: 'COM-INT-0001', title: 'Note interne d’organisation', direction: 'Interne · Note', status: 'Projet', owner: 'Responsable du contenu', deadline: 'Diffusion à planifier' }
    ],
    ownerLabel: 'Responsable',
    deadlineLabel: 'Suite',
    workflowTitle: 'Circuit de traitement et de validation',
    workflowBody: 'Le même circuit rend le courrier traçable, qu’il arrive par email, formulaire, lettre, messagerie ou remise en main propre.',
    workflowSteps: [
      ['Recevoir ou créer', 'Capturer la date, le canal et l’origine.'],
      ['Enregistrer', 'Attribuer un identifiant unique.'],
      ['Classer', 'Définir type, confidentialité et dossier.'],
      ['Attribuer', 'Désigner responsable, contributeurs et échéance.'],
      ['Préparer', 'Rédiger la réponse ou le message.'],
      ['Valider', 'Contrôler fond, forme, droits et signature.'],
      ['Envoyer ou diffuser', 'Utiliser le canal et la liste autorisés.'],
      ['Prouver et archiver', 'Conserver version finale et preuve dans la GED.']
    ],
    humanRule: 'Aucun courrier officiel, message sensible ou prise de position institutionnelle n’est diffusé sans validation humaine et niveau d’autorisation adapté.',
    communicationTitle: 'Communication institutionnelle gouvernée',
    communicationBody: 'Le contenu doit être adapté au public, au canal, au niveau de confidentialité et à la langue, tout en conservant une version maîtresse identifiable.',
    audiences: 'Publics & destinataires',
    audiencesBody: 'Membres, personnels, partenaires, autorités, fournisseurs, bénéficiaires, médias ou public, selon une liste autorisée.',
    templates: 'Modèles & identité',
    templatesBody: 'Courrier, note, compte rendu, communiqué et présentation utilisent les modèles, la signature et l’identité visuelle validés.',
    trilingual: 'Trilinguisme',
    trilingualBody: 'FR, DE et EN sont gérés avec langue source, statut de traduction, relecture et validation institutionnelle visibles.',
    channels: 'Canaux & diffusion',
    channelsBody: 'Email, lettre, site, réseaux, messagerie ou réunion sont choisis selon le public, la sensibilité et la preuve attendue.',
    governanceTitle: 'Responsabilités et frontières fonctionnelles',
    administrationRole: 'Administration',
    administrationBody: 'Enregistre, oriente, relance, suit les échéances et conserve la preuve administrative du traitement.',
    governanceRole: 'Gouvernance',
    governanceBody: 'Autorise les positions officielles, les destinataires sensibles, les signatures et les communications engageant 2SG.',
    ownerRole: 'Fonction responsable',
    ownerBody: 'Fournit et valide le fond métier, répond aux demandes et assume les suites dans son périmètre.',
    gedRole: 'GED',
    gedBody: 'Conserve scans, pièces jointes, versions, modèles, preuves d’envoi, accusés et archives selon les droits d’accès.',
    boundaryTitle: 'Ce que cette vue ne remplace pas',
    boundaryItems: [
      'GED : stockage, classement, versionnage et archivage des documents.',
      'CRM / Marketing : communication commerciale, campagnes, prospects et relation client.',
      'Planification & Projets : tâches, échéances, dépendances et exécution des actions liées.',
      'Conformité / Juridique : contrôle des obligations, mentions légales et courriers sensibles.',
      'IT & Support : comptes, canaux techniques, sécurité, délivrabilité et sauvegardes.'
    ],
    sourceRule: 'Les sources maîtresses sont les documents institutionnels et stratégiques validés, l’identité verbale et visuelle, les décisions de gouvernance, les modèles approuvés et les pièces classifiées dans la GED. Chaque communication officielle doit afficher auteur, validateur, date, version, langue, destinataires et niveau de confidentialité.'
  },
  EN: {
    eyebrow: 'Administration / Communication & Correspondence',
    title: 'Institutional communication & official correspondence',
    subtitle: 'Read-only framing view to organise 2SG internal and external communication as well as inbound and outbound correspondence. It replaces neither messaging, the DMS nor the CRM.',
    readOnly: 'Read only',
    targetModel: 'Target model',
    demoData: 'Demonstration data',
    navLabel: 'Navigation within Communication and Correspondence',
    navScope: 'Scope',
    navRegister: 'Register',
    navWorkflow: 'Workflow',
    navCommunication: 'Communication',
    navGovernance: 'Responsibilities',
    backToTop: 'Back to top',
    scopeTitle: 'Administrative scope to organise',
    scopeBody: 'Administration ensures traceability, routing and deadlines. Content remains subject to approval by governance or the competent function before any official distribution.',
    internal: 'Internal communication',
    internalBody: 'Notes, decisions, instructions, minutes and information intended for the relevant members, teams and staff.',
    external: 'External institutional communication',
    externalBody: 'Presentations, partner information, positions and public messages authorised on behalf of 2SG.',
    incoming: 'Inbound correspondence',
    incomingBody: 'Receipt, timestamp, registration, classification, assignment, deadline and expected response.',
    outgoing: 'Outbound correspondence',
    outgoingBody: 'Drafting, review, approval, signature, dispatch, transmission evidence and archiving.',
    registerTitle: 'Pilot register for correspondence and communication',
    registerBody: 'Each entry receives an identifier, owner, status and link to its records in the DMS. The examples below illustrate the model and do not represent real correspondence.',
    sampleBadge: 'Example',
    registerFields: ['Identifier and direction', 'Date and channel', 'Sender / recipient', 'Subject and classification', 'Owner and deadline', 'Status and DMS evidence'],
    sampleItems: [
      { id: 'COR-IN-0001', title: 'Institutional request received', direction: 'Inbound · Email', status: 'To qualify', owner: 'Administration', deadline: 'Deadline to set' },
      { id: 'COR-OUT-0001', title: 'Official response prepared', direction: 'Outbound · Letter', status: 'Under review', owner: 'Competent function', deadline: 'Send after authorisation' },
      { id: 'COM-INT-0001', title: 'Internal organisation note', direction: 'Internal · Note', status: 'Draft', owner: 'Content owner', deadline: 'Distribution to schedule' }
    ],
    ownerLabel: 'Owner',
    deadlineLabel: 'Next step',
    workflowTitle: 'Processing and approval workflow',
    workflowBody: 'The same workflow makes correspondence traceable whether it arrives by email, form, letter, messaging or hand delivery.',
    workflowSteps: [
      ['Receive or create', 'Capture date, channel and origin.'],
      ['Register', 'Assign a unique identifier.'],
      ['Classify', 'Set type, confidentiality and file.'],
      ['Assign', 'Name owner, contributors and deadline.'],
      ['Prepare', 'Draft the response or message.'],
      ['Approve', 'Review content, form, rights and signature.'],
      ['Send or distribute', 'Use authorised channel and list.'],
      ['Prove and archive', 'Retain final version and evidence in the DMS.']
    ],
    humanRule: 'No official correspondence, sensitive message or institutional position is distributed without human approval and the appropriate level of authority.',
    communicationTitle: 'Governed institutional communication',
    communicationBody: 'Content must suit the audience, channel, confidentiality level and language while retaining an identifiable master version.',
    audiences: 'Audiences & recipients',
    audiencesBody: 'Members, staff, partners, authorities, suppliers, beneficiaries, media or the public, according to an authorised list.',
    templates: 'Templates & identity',
    templatesBody: 'Letters, notes, minutes, releases and presentations use approved templates, signatures and visual identity.',
    trilingual: 'Trilingual delivery',
    trilingualBody: 'FR, DE and EN are managed with visible source language, translation status, review and institutional approval.',
    channels: 'Channels & distribution',
    channelsBody: 'Email, letter, website, social media, messaging or meeting are selected according to audience, sensitivity and required evidence.',
    governanceTitle: 'Responsibilities and functional boundaries',
    administrationRole: 'Administration',
    administrationBody: 'Registers, routes, follows up, tracks deadlines and retains administrative evidence of processing.',
    governanceRole: 'Governance',
    governanceBody: 'Authorises official positions, sensitive recipients, signatures and communications that commit 2SG.',
    ownerRole: 'Responsible function',
    ownerBody: 'Provides and validates business content, answers requests and owns follow-up within its scope.',
    gedRole: 'DMS',
    gedBody: 'Stores scans, attachments, versions, templates, dispatch evidence, acknowledgements and archives according to access rights.',
    boundaryTitle: 'What this view does not replace',
    boundaryItems: [
      'DMS: document storage, classification, versioning and archiving.',
      'CRM / Marketing: commercial communication, campaigns, prospects and customer relations.',
      'Planning & Projects: tasks, deadlines, dependencies and execution of related actions.',
      'Compliance / Legal: review of obligations, legal notices and sensitive correspondence.',
      'IT & Support: accounts, technical channels, security, deliverability and backups.'
    ],
    sourceRule: 'Master sources are approved institutional and strategic documents, verbal and visual identity, governance decisions, approved templates and classified DMS records. Each official communication must show author, approver, date, version, language, recipients and confidentiality level.'
  },
  DE: {
    eyebrow: 'Verwaltung / Kommunikation & Korrespondenz',
    title: 'Institutionelle Kommunikation & offizielle Korrespondenz',
    subtitle: 'Schreibgeschützte Rahmenansicht zur Organisation der internen und externen Kommunikation von 2SG sowie des Posteingangs und -ausgangs. Sie ersetzt weder Messaging noch GED oder CRM.',
    readOnly: 'Schreibgeschützt',
    targetModel: 'Zielmodell',
    demoData: 'Demonstrationsdaten',
    navLabel: 'Navigation innerhalb Kommunikation und Korrespondenz',
    navScope: 'Umfang',
    navRegister: 'Register',
    navWorkflow: 'Ablauf',
    navCommunication: 'Kommunikation',
    navGovernance: 'Verantwortungen',
    backToTop: 'Nach oben',
    scopeTitle: 'Zu organisierender Verwaltungsumfang',
    scopeBody: 'Die Verwaltung gewährleistet Nachvollziehbarkeit, Weiterleitung und Fristen. Inhalte werden vor jeder offiziellen Verbreitung durch Governance oder die zuständige Funktion freigegeben.',
    internal: 'Interne Kommunikation',
    internalBody: 'Notizen, Entscheidungen, Anweisungen, Protokolle und Informationen für die betroffenen Mitglieder, Teams und Mitarbeitenden.',
    external: 'Externe institutionelle Kommunikation',
    externalBody: 'Präsentationen, Partnerinformationen, Stellungnahmen und öffentliche Mitteilungen, die im Namen von 2SG genehmigt wurden.',
    incoming: 'Posteingang',
    incomingBody: 'Eingang, Zeitstempel, Registrierung, Klassifizierung, Zuordnung, Frist und erwartete Antwort.',
    outgoing: 'Postausgang',
    outgoingBody: 'Entwurf, Prüfung, Freigabe, Unterschrift, Versand, Übermittlungsnachweis und Archivierung.',
    registerTitle: 'Pilotregister für Korrespondenz und Kommunikation',
    registerBody: 'Jeder Eintrag erhält eine Kennung, Verantwortung, Status und Verknüpfung zu den Unterlagen in der GED. Die folgenden Beispiele veranschaulichen das Modell und sind keine echten Schreiben.',
    sampleBadge: 'Beispiel',
    registerFields: ['Kennung und Richtung', 'Datum und Kanal', 'Absender / Empfänger', 'Betreff und Klassifizierung', 'Verantwortung und Frist', 'Status und GED-Nachweis'],
    sampleItems: [
      { id: 'KOR-EIN-0001', title: 'Institutionelle Anfrage eingegangen', direction: 'Eingang · E-Mail', status: 'Zu qualifizieren', owner: 'Verwaltung', deadline: 'Frist festzulegen' },
      { id: 'KOR-AUS-0001', title: 'Offizielle Antwort vorbereitet', direction: 'Ausgang · Schreiben', status: 'In Freigabe', owner: 'Zuständige Funktion', deadline: 'Versand nach Genehmigung' },
      { id: 'KOM-INT-0001', title: 'Interne Organisationsnotiz', direction: 'Intern · Notiz', status: 'Entwurf', owner: 'Inhaltsverantwortung', deadline: 'Verteilung zu planen' }
    ],
    ownerLabel: 'Verantwortung',
    deadlineLabel: 'Nächster Schritt',
    workflowTitle: 'Bearbeitungs- und Freigabeablauf',
    workflowBody: 'Derselbe Ablauf macht Korrespondenz nachvollziehbar, unabhängig davon, ob sie per E-Mail, Formular, Brief, Messaging oder persönlich eingeht.',
    workflowSteps: [
      ['Empfangen oder erstellen', 'Datum, Kanal und Herkunft erfassen.'],
      ['Registrieren', 'Eine eindeutige Kennung vergeben.'],
      ['Klassifizieren', 'Art, Vertraulichkeit und Akte festlegen.'],
      ['Zuordnen', 'Verantwortung, Mitwirkende und Frist bestimmen.'],
      ['Vorbereiten', 'Antwort oder Mitteilung entwerfen.'],
      ['Freigeben', 'Inhalt, Form, Rechte und Unterschrift prüfen.'],
      ['Senden oder verteilen', 'Genehmigten Kanal und Verteiler nutzen.'],
      ['Nachweisen und archivieren', 'Endfassung und Nachweis in der GED sichern.']
    ],
    humanRule: 'Offizielle Schreiben, sensible Mitteilungen oder institutionelle Stellungnahmen werden nicht ohne menschliche Freigabe und angemessene Berechtigungsstufe verbreitet.',
    communicationTitle: 'Gesteuerte institutionelle Kommunikation',
    communicationBody: 'Inhalte müssen zu Zielgruppe, Kanal, Vertraulichkeit und Sprache passen und zugleich eine erkennbare Masterfassung behalten.',
    audiences: 'Zielgruppen & Empfänger',
    audiencesBody: 'Mitglieder, Personal, Partner, Behörden, Lieferanten, Begünstigte, Medien oder Öffentlichkeit gemäß genehmigtem Verteiler.',
    templates: 'Vorlagen & Identität',
    templatesBody: 'Schreiben, Notizen, Protokolle, Mitteilungen und Präsentationen nutzen genehmigte Vorlagen, Signaturen und visuelle Identität.',
    trilingual: 'Dreisprachigkeit',
    trilingualBody: 'FR, DE und EN werden mit sichtbarer Ausgangssprache, Übersetzungsstatus, Prüfung und institutioneller Freigabe verwaltet.',
    channels: 'Kanäle & Verteilung',
    channelsBody: 'E-Mail, Brief, Website, soziale Medien, Messaging oder Sitzung werden nach Zielgruppe, Sensibilität und erforderlichem Nachweis gewählt.',
    governanceTitle: 'Verantwortungen und funktionale Abgrenzung',
    administrationRole: 'Verwaltung',
    administrationBody: 'Registriert, leitet weiter, erinnert, überwacht Fristen und bewahrt den administrativen Bearbeitungsnachweis auf.',
    governanceRole: 'Governance',
    governanceBody: 'Genehmigt offizielle Positionen, sensible Empfänger, Unterschriften und Mitteilungen, die 2SG verpflichten.',
    ownerRole: 'Verantwortliche Funktion',
    ownerBody: 'Liefert und validiert Fachinhalte, beantwortet Anfragen und verantwortet Folgemaßnahmen im eigenen Bereich.',
    gedRole: 'GED',
    gedBody: 'Bewahrt Scans, Anhänge, Versionen, Vorlagen, Versandnachweise, Empfangsbestätigungen und Archive nach Zugriffsrechten auf.',
    boundaryTitle: 'Was diese Ansicht nicht ersetzt',
    boundaryItems: [
      'GED: Speicherung, Klassifizierung, Versionierung und Archivierung von Dokumenten.',
      'CRM / Marketing: kommerzielle Kommunikation, Kampagnen, Interessenten und Kundenbeziehungen.',
      'Planung & Projekte: Aufgaben, Fristen, Abhängigkeiten und Ausführung verbundener Maßnahmen.',
      'Compliance / Recht: Prüfung von Pflichten, rechtlichen Angaben und sensibler Korrespondenz.',
      'IT & Support: Konten, technische Kanäle, Sicherheit, Zustellbarkeit und Sicherungen.'
    ],
    sourceRule: 'Maßgebliche Quellen sind genehmigte institutionelle und strategische Dokumente, verbale und visuelle Identität, Governance-Entscheidungen, genehmigte Vorlagen und klassifizierte GED-Unterlagen. Jede offizielle Kommunikation muss Autor, Freigabe, Datum, Version, Sprache, Empfänger und Vertraulichkeitsstufe ausweisen.'
  }
};

const DetailCard = ({ icon: Icon, title, body }) => (
  <article className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
    <Icon className="text-cyan-300" size={21} aria-hidden="true" />
    <h4 className="mt-3 font-bold text-white">{title}</h4>
    <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
  </article>
);

const CommunicationOverview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const navItems = [
    { id: 'communication-scope', label: t.navScope },
    { id: 'communication-register', label: t.navRegister },
    { id: 'communication-workflow', label: t.navWorkflow },
    { id: 'communication-institutional', label: t.navCommunication },
    { id: 'communication-governance', label: t.navGovernance }
  ];
  const scopeCards = [
    [t.internal, t.internalBody, MessagesSquare],
    [t.external, t.externalBody, Megaphone],
    [t.incoming, t.incomingBody, FileInput],
    [t.outgoing, t.outgoingBody, FileOutput]
  ];
  const communicationCards = [
    [t.audiences, t.audiencesBody, CircleUserRound],
    [t.templates, t.templatesBody, BookOpenCheck],
    [t.trilingual, t.trilingualBody, Languages],
    [t.channels, t.channelsBody, Send]
  ];
  const responsibilityCards = [
    [t.administrationRole, t.administrationBody, Mail],
    [t.governanceRole, t.governanceBody, Building2],
    [t.ownerRole, t.ownerBody, BadgeCheck],
    [t.gedRole, t.gedBody, FolderLock]
  ];

  return (
    <section id="communication-top" className="mb-6 space-y-6 scroll-mt-24" aria-labelledby="communication-title">
      <header className="rounded-lg border border-slate-700 bg-slate-800 p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase text-cyan-300">{t.eyebrow}</p>
            <h2 id="communication-title" className="mt-2 text-2xl font-bold text-white">{t.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[t.readOnly, t.targetModel, t.demoData].map(label => (
              <span key={label} className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-200">{label}</span>
            ))}
          </div>
        </div>
      </header>

      <InternalSectionNav ariaLabel={t.navLabel} items={navItems} topId="communication-top" backToTopLabel={t.backToTop} refreshKey={language} />

      <section id="communication-scope" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="communication-scope-title">
        <h3 id="communication-scope-title" className="text-xl font-bold text-white">{t.scopeTitle}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.scopeBody}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {scopeCards.map(([title, body, Icon]) => <DetailCard key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="communication-register" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="communication-register-title">
        <h3 id="communication-register-title" className="text-xl font-bold text-white">{t.registerTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{t.registerBody}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {t.registerFields.map((field, index) => (
            <div key={field} className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-950/35 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-950 text-xs font-bold text-cyan-200">{index + 1}</span>
              <span className="text-sm font-semibold text-slate-200">{field}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {t.sampleItems.map(item => (
            <article key={item.id} className="rounded-lg border border-cyan-900 bg-cyan-950/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-cyan-200">{item.id}</span>
                <span className="rounded-full border border-cyan-800 bg-cyan-950 px-2.5 py-1 text-xs font-semibold text-cyan-100">{t.sampleBadge}</span>
              </div>
              <h4 className="mt-3 font-bold text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-cyan-100/80">{item.direction}</p>
              <div className="mt-4 grid gap-2 border-t border-cyan-900/70 pt-3 text-sm text-slate-300">
                <p><strong className="text-slate-100">{t.ownerLabel} :</strong> {item.owner}</p>
                <p><strong className="text-slate-100">{t.deadlineLabel} :</strong> {item.deadline}</p>
                <p className="font-semibold text-amber-200">{item.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="communication-workflow" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="communication-workflow-title">
        <div className="flex items-start gap-3">
          <Route className="mt-0.5 shrink-0 text-cyan-300" size={22} aria-hidden="true" />
          <div>
            <h3 id="communication-workflow-title" className="text-xl font-bold text-white">{t.workflowTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{t.workflowBody}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.workflowSteps.map(([title, body], index) => (
            <article key={title} className="rounded-lg border border-slate-700 bg-slate-900/45 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-blue-200">{index + 1}</span>
              <h4 className="mt-3 font-bold text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-lg border border-amber-700/70 bg-amber-950/20 p-4 text-sm leading-6 text-amber-100">{t.humanRule}</p>
      </section>

      <section id="communication-institutional" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="communication-institutional-title">
        <h3 id="communication-institutional-title" className="text-xl font-bold text-white">{t.communicationTitle}</h3>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-400">{t.communicationBody}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {communicationCards.map(([title, body, Icon]) => <DetailCard key={title} title={title} body={body} icon={Icon} />)}
        </div>
      </section>

      <section id="communication-governance" className="scroll-mt-20 rounded-lg border border-slate-700 bg-slate-800 p-5" aria-labelledby="communication-governance-title">
        <h3 id="communication-governance-title" className="text-xl font-bold text-white">{t.governanceTitle}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {responsibilityCards.map(([title, body, Icon]) => <DetailCard key={title} title={title} body={body} icon={Icon} />)}
        </div>
        <article className="mt-5 rounded-lg border border-amber-700/70 bg-amber-950/20 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-amber-300" size={22} aria-hidden="true" />
            <div>
              <h4 className="font-bold text-white">{t.boundaryTitle}</h4>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 lg:grid-cols-2">
                {t.boundaryItems.map(item => <li key={item} className="rounded-md border border-amber-900/60 bg-slate-950/25 px-3 py-2">{item}</li>)}
              </ul>
            </div>
          </div>
          <p className="mt-4 border-t border-amber-900/60 pt-4 text-sm leading-6 text-amber-100/80">{t.sourceRule}</p>
        </article>
      </section>
    </section>
  );
};

export default CommunicationOverview;
