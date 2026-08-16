import React, { useMemo, useState } from 'react';
import { Bot, BriefcaseBusiness, CheckCircle2, ClipboardCopy, FileSearch, ListChecks, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'AGENT SPÉCIALISÉ · PROTOTYPE CADRÉ', title: 'Assistant administratif 2SG',
    intro: 'Un espace de préparation pour aider le responsable et l’équipe sans remplacer leur décision, leurs droits ni les fonctions compétentes.',
    status: 'Non connecté · aucune action autonome', missions: 'Missions autorisées', boundaries: 'Limites obligatoires', prepare: 'Préparer une demande',
    task: 'Type de soutien', context: 'Contexte minimal', source: 'Source ou emplacement GED', result: 'Projet de consigne contrôlée', copy: 'Copier la consigne', copied: 'Consigne copiée.', copyFailed: 'Copie impossible. Sélectionnez la consigne manuellement.',
    tasks: ['Qualifier un courrier reçu', 'Préparer une synthèse de dossier', 'Contrôler les champs manquants', 'Préparer une relance', 'Classer une ressource', 'Préparer une mission externe'],
    missionItems: ['Structurer les faits et les métadonnées.', 'Repérer les champs, pièces ou décisions manquants.', 'Préparer une synthèse ou un projet de message.', 'Rappeler provenance, confidentialité, responsable et échéance.'],
    boundaryItems: ['Ne valide, ne signe et n’adopte aucun document.', 'N’envoie aucun courrier et n’effectue aucun paiement.', 'Ne supprime aucune preuve et n’accède pas aux pièces restreintes sans droit.', 'Ne formule pas de conclusion juridique, fiscale ou réglementaire.'],
    contextPlaceholder: 'Décrire la demande sans coller de secret, mot de passe ou contenu sensible…', sourcePlaceholder: 'Ex. GED / Administration / Courrier / COR-2026-…',
    promptLead: 'Agis comme assistant administratif 2SG dans un cadre de préparation uniquement.'
  },
  EN: {
    eyebrow: 'SPECIALISED AGENT · FRAMED PROTOTYPE', title: '2SG administrative assistant', intro: 'A preparation area supporting the owner and team without replacing decisions, rights or competent functions.', status: 'Not connected · no autonomous action', missions: 'Allowed missions', boundaries: 'Mandatory boundaries', prepare: 'Prepare a request', task: 'Support type', context: 'Minimum context', source: 'Source or DMS location', result: 'Controlled instruction draft', copy: 'Copy instruction', copied: 'Instruction copied.', copyFailed: 'Copy failed. Select the instruction manually.', tasks: ['Qualify incoming correspondence', 'Prepare a file summary', 'Check missing fields', 'Prepare a reminder', 'Classify a resource', 'Prepare an external mission'], missionItems: ['Structure facts and metadata.', 'Identify missing fields, evidence or decisions.', 'Prepare a summary or message draft.', 'Recall provenance, confidentiality, owner and deadline.'], boundaryItems: ['Does not validate, sign or adopt any document.', 'Sends no correspondence and makes no payment.', 'Deletes no evidence and accesses no restricted file without rights.', 'Provides no legal, tax or regulatory conclusion.'], contextPlaceholder: 'Describe the request without pasting secrets, passwords or sensitive content…', sourcePlaceholder: 'E.g. DMS / Administration / Correspondence / COR-2026-…', promptLead: 'Act as the 2SG administrative assistant in preparation-only mode.'
  },
  DE: {
    eyebrow: 'SPEZIALISIERTER AGENT · GERAHMTER PROTOTYP', title: '2SG-Verwaltungsassistent', intro: 'Ein Vorbereitungsbereich zur Unterstützung von Verantwortung und Team, ohne Entscheidungen, Rechte oder zuständige Funktionen zu ersetzen.', status: 'Nicht verbunden · keine autonome Aktion', missions: 'Erlaubte Aufgaben', boundaries: 'Verbindliche Grenzen', prepare: 'Anfrage vorbereiten', task: 'Unterstützungsart', context: 'Mindestkontext', source: 'Quelle oder DMS-Ablage', result: 'Kontrollierter Anweisungsentwurf', copy: 'Anweisung kopieren', copied: 'Anweisung kopiert.', copyFailed: 'Kopieren nicht möglich. Anweisung bitte manuell auswählen.', tasks: ['Eingehende Korrespondenz qualifizieren', 'Aktenzusammenfassung vorbereiten', 'Fehlende Felder prüfen', 'Erinnerung vorbereiten', 'Ressource klassifizieren', 'Externe Aufgabe vorbereiten'], missionItems: ['Fakten und Metadaten strukturieren.', 'Fehlende Felder, Nachweise oder Entscheide erkennen.', 'Zusammenfassung oder Nachrichtenentwurf vorbereiten.', 'Herkunft, Vertraulichkeit, Verantwortung und Frist nennen.'], boundaryItems: ['Validiert, unterzeichnet oder verabschiedet kein Dokument.', 'Versendet keine Korrespondenz und leistet keine Zahlung.', 'Löscht keinen Nachweis und greift ohne Rechte auf keine eingeschränkte Akte zu.', 'Gibt keine rechtliche, steuerliche oder regulatorische Schlussfolgerung ab.'], contextPlaceholder: 'Anfrage ohne Geheimnisse, Passwörter oder sensible Inhalte beschreiben…', sourcePlaceholder: 'Z. B. DMS / Verwaltung / Korrespondenz / KOR-2026-…', promptLead: 'Handle als 2SG-Verwaltungsassistent ausschließlich im Vorbereitungsmodus.'
  }
};

const PROMPT_COPY = {
  FR: {
    labels: { task: 'Mission', context: 'Contexte', source: 'Source/provenance', boundaries: 'Garde-fous', missing: '[à compléter]' },
    expected: 'Résultat attendu : faits structurés, champs manquants, prochaine action proposée et validation humaine requise.'
  },
  EN: {
    labels: { task: 'Mission', context: 'Context', source: 'Source/provenance', boundaries: 'Guardrails', missing: '[to be completed]' },
    expected: 'Expected result: structured facts, missing fields, proposed next action and required human validation.'
  },
  DE: {
    labels: { task: 'Aufgabe', context: 'Kontext', source: 'Quelle/Herkunft', boundaries: 'Leitplanken', missing: '[zu ergänzen]' },
    expected: 'Erwartetes Ergebnis: strukturierte Fakten, fehlende Felder, vorgeschlagene nächste Aktion und erforderliche menschliche Freigabe.'
  }
};

const DELEGATION_COPY = {
  FR: {
    title: 'Portefeuille des missions externes',
    intro: 'Un seul point de pilotage pour déléguer l’activité courante sans interrompre la trajectoire principale 2SG/M3S.',
    mainLane: 'Trajectoire principale', mainLaneText: 'Architecture, données, modules et décisions M3S restent pilotés par Cheikh et Codex.',
    delegatedLane: 'Activité courante déléguée', delegatedLaneText: 'Veille, préparation et contrôles répétitifs sont confiés à un service borné puis reviennent pour validation.',
    projectLabel: 'Portefeuille gouverné', projectName: 'ADM · Missions externes et activité courante',
    workflowLabel: 'Circuit commun', workflow: 'Signal → qualification → mission bornée → contrôle → intégration M3S ou archivage',
    prepareMission: 'Préparer la mission', service: 'Service destinataire', sensitivity: 'Sensibilité',
    copyBlocked: 'Copie désactivée : remplacez les données restreintes par un résumé expurgé ou utilisez un canal approuvé.',
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Public', internal: 'Interne', restricted: 'Restreint' },
    status: 'Prête à cadrer', productionRule: 'Passage Production : uniquement après micro-test concluant et décision Go.',
    templates: [
      { id: 'cowork-team', service: 'cowork', sensitivity: 'internal', title: 'Rapprocher Taskforce et matrice V0.3', context: 'Comparer l’instruction historique Taskforce à la matrice V0.3 validée. Produire uniquement une table des écarts : repris, remplacé, à confirmer ou hors périmètre. Ne créer aucune nomination et ne consulter aucun CV ni pièce d’identité.', source: 'GED / Gouvernance / Matrice profils V0.3 + instruction historique Taskforce' },
      { id: 'work-legal', service: 'work', sensitivity: 'internal', title: 'Préparer les documents LEGAL manquants', context: 'À partir de l’inventaire documentaire gouverné, préparer uniquement les projets manquants ou incomplets : CGU, CGV lorsque pertinentes, mentions légales et politiques associées. Distinguer brouillon, validation sur le fond, signature et adoption. Ne conclure à aucune conformité juridique.', source: 'GED / LEGAL / Inventaire documentaire gouverné + sources officielles autorisées' },
      { id: 'work-saas', service: 'work', sensitivity: 'internal', title: 'Transformer l’idée immobilière en micro-test', context: 'Réutiliser l’évaluation validée des 11 idées SaaS sans la refaire et appliquer M3S-INSTR-DIGITAL-TEST-001 V1. Préparer uniquement le pack de déclenchement du micro-test Gestion d’immeubles diaspora/gérants : un public, un problème, responsable à nommer, cinq entretiens, hypothèses, données minimales fictives, journal du temps, scoring et critères Go/No-Go. Plafond futur : 24 à 40 heures sur 7 à 10 jours. Aucun lancement, achat, compte, publicité, paiement, développement, import Gmail/M3S ou donnée personnelle réelle.', source: 'Veille KM / Évaluation idées SaaS Sénégal / priorité 1 immobilier + M3S-INSTR-DIGITAL-TEST-001 V1' },
      { id: 'classic-review', service: 'classic', sensitivity: 'internal', title: 'Effectuer un second contrôle documentaire', context: 'Contrôler un livrable préparé par un autre service contre le corpus transmis. Vérifier fidélité, provenance, omissions et extrapolations. Rendre validé, à corriger ou non vérifiable, sans enrichissement externe.', source: 'Pack de contrôle borné transmis par Cheikh et Codex' },
      { id: 'genspark-benchmark', service: 'genspark', sensitivity: 'public', title: 'Comparer des solutions publiques', context: 'Comparer des applications publiques de gestion immobilière diaspora et de gestion administrative. Relever fonctions, public cible, modèle tarifaire public, limites et différenciation possible. N’utiliser aucune source interne 2SG et ne créer aucun compte.', source: 'Web public uniquement' },
      { id: 'work-email', service: 'work', sensitivity: 'internal', title: 'Qualifier la veille e-mail quotidienne', context: 'Regrouper les signaux e-mail dans un relevé unique sans les promouvoir comme sources officielles. Pour chaque signal, fournir : objet, date, expéditeur, dossier M3S, urgence, sensibilité, pièce ou lien, action proposée, responsable et échéance. Dédupliquer les conversations et séparer alerte, tâche, preuve et simple ressource. Ne télécharger ni ne retransmettre de pièce restreinte.', source: 'Gmail / conversation Veille e-mails prioritaires → ADM · Missions externes et activité courante' }
    ]
  },
  EN: {
    title: 'External mission portfolio',
    intro: 'One control point to delegate recurring work without interrupting the main 2SG/M3S trajectory.',
    mainLane: 'Main trajectory', mainLaneText: 'M3S architecture, data, modules and decisions remain led by Cheikh and Codex.',
    delegatedLane: 'Delegated recurring work', delegatedLaneText: 'Monitoring, preparation and repetitive checks go to a bounded service and return for validation.',
    projectLabel: 'Governed portfolio', projectName: 'ADM · External missions and recurring work',
    workflowLabel: 'Shared workflow', workflow: 'Signal → qualification → bounded mission → review → M3S integration or archive',
    prepareMission: 'Prepare mission', service: 'Target service', sensitivity: 'Sensitivity',
    copyBlocked: 'Copy disabled: replace restricted data with a redacted summary or use an approved channel.',
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Public', internal: 'Internal', restricted: 'Restricted' },
    status: 'Ready to frame', productionRule: 'Production gate: only after a successful micro-test and a Go decision.',
    templates: [
      { id: 'cowork-team', service: 'cowork', sensitivity: 'internal', title: 'Reconcile Taskforce and matrix V0.3', context: 'Compare the historical Taskforce instruction with the validated V0.3 matrix. Produce only a differences table: retained, replaced, to confirm or out of scope. Create no appointment and review no CV or identity document.', source: 'DMS / Governance / Profiles matrix V0.3 + historical Taskforce instruction' },
      { id: 'work-legal', service: 'work', sensitivity: 'internal', title: 'Prepare missing LEGAL documents', context: 'Using the governed document inventory, prepare only missing or incomplete drafts: terms of use, terms of sale when relevant, legal notice and related policies. Distinguish draft, content validation, signature and adoption. Make no legal compliance conclusion.', source: 'DMS / LEGAL / Governed document inventory + authorised official sources' },
      { id: 'work-saas', service: 'work', sensitivity: 'internal', title: 'Turn the property idea into a micro-test', context: 'Reuse the validated assessment of eleven SaaS ideas without repeating it and apply M3S-INSTR-DIGITAL-TEST-001 V1. Prepare only the trigger pack for the Property management for diaspora/agents micro-test: one audience, one problem, owner to appoint, five interviews, assumptions, fictitious minimum data, time log, scoring and Go/No-Go criteria. Future cap: 24 to 40 hours over 7 to 10 days. No launch, purchase, account, advertising, payment, development, Gmail/M3S import or real personal data.', source: 'Monitoring KM / Senegal SaaS ideas assessment / property priority 1 + M3S-INSTR-DIGITAL-TEST-001 V1' },
      { id: 'classic-review', service: 'classic', sensitivity: 'internal', title: 'Run an independent document check', context: 'Check a deliverable prepared by another service against the supplied corpus. Verify fidelity, provenance, omissions and extrapolations. Return validated, needs correction or not verifiable, without external enrichment.', source: 'Bounded control pack supplied by Cheikh and Codex' },
      { id: 'genspark-benchmark', service: 'genspark', sensitivity: 'public', title: 'Benchmark public solutions', context: 'Compare public property-management and administrative-management applications. Record functions, target users, public pricing, limits and possible differentiation. Use no internal 2SG source and create no account.', source: 'Public web only' },
      { id: 'work-email', service: 'work', sensitivity: 'internal', title: 'Qualify daily email monitoring', context: 'Consolidate email signals into one record without promoting them to official sources. For each signal provide: subject, date, sender, M3S file, urgency, sensitivity, attachment or link, proposed action, owner and deadline. Deduplicate conversations and separate alert, task, evidence and simple resource. Do not download or forward restricted attachments.', source: 'Gmail / Priority email monitoring conversation → ADM · External missions and recurring work' }
    ]
  },
  DE: {
    title: 'Portfolio externer Aufgaben',
    intro: 'Ein Steuerungspunkt für wiederkehrende delegierte Arbeit, ohne die 2SG/M3S-Hauptentwicklung zu unterbrechen.',
    mainLane: 'Hauptentwicklung', mainLaneText: 'M3S-Architektur, Daten, Module und Entscheidungen bleiben bei Cheikh und Codex.',
    delegatedLane: 'Delegierte laufende Arbeit', delegatedLaneText: 'Monitoring, Vorbereitung und wiederkehrende Kontrollen gehen an einen begrenzten Dienst und kommen zur Freigabe zurück.',
    projectLabel: 'Gesteuertes Portfolio', projectName: 'ADM · Externe Aufgaben und laufende Arbeit',
    workflowLabel: 'Gemeinsamer Ablauf', workflow: 'Signal → Qualifizierung → begrenzte Aufgabe → Kontrolle → M3S-Integration oder Archivierung',
    prepareMission: 'Aufgabe vorbereiten', service: 'Zieldienst', sensitivity: 'Vertraulichkeit',
    copyBlocked: 'Kopieren deaktiviert: eingeschränkte Daten durch eine bereinigte Zusammenfassung ersetzen oder einen freigegebenen Kanal verwenden.',
    services: { cowork: 'Claude Cowork', work: 'ChatGPT Work', classic: 'ChatGPT Classic', genspark: 'Genspark' },
    sensitivities: { public: 'Öffentlich', internal: 'Intern', restricted: 'Eingeschränkt' },
    status: 'Bereit zur Rahmung', productionRule: 'Übergang zu Produktion: erst nach erfolgreichem Mikrotest und Go-Entscheid.',
    templates: [
      { id: 'cowork-team', service: 'cowork', sensitivity: 'internal', title: 'Taskforce und Matrix V0.3 abgleichen', context: 'Die historische Taskforce-Anweisung mit der validierten Matrix V0.3 vergleichen. Nur eine Abweichungstabelle erstellen: übernommen, ersetzt, zu bestätigen oder außerhalb des Umfangs. Keine Ernennung erzeugen und keine Lebensläufe oder Ausweise prüfen.', source: 'DMS / Governance / Profilmatrix V0.3 + historische Taskforce-Anweisung' },
      { id: 'work-legal', service: 'work', sensitivity: 'internal', title: 'Fehlende LEGAL-Dokumente vorbereiten', context: 'Ausgehend vom gesteuerten Dokumentenverzeichnis nur fehlende oder unvollständige Entwürfe vorbereiten: Nutzungsbedingungen, Verkaufsbedingungen soweit relevant, Impressum und verbundene Richtlinien. Entwurf, inhaltliche Freigabe, Unterschrift und Verabschiedung unterscheiden. Keine rechtliche Konformität feststellen.', source: 'DMS / LEGAL / Gesteuertes Dokumentenverzeichnis + freigegebene amtliche Quellen' },
      { id: 'work-saas', service: 'work', sensitivity: 'internal', title: 'Immobilienidee in einen Mikrotest überführen', context: 'Die validierte Bewertung der elf SaaS-Ideen wiederverwenden und nicht neu erstellen sowie M3S-INSTR-DIGITAL-TEST-001 V1 anwenden. Nur das Startpaket für den Mikrotest Immobilienverwaltung für Diaspora/Verwalter vorbereiten: eine Zielgruppe, ein Problem, zu ernennende Verantwortung, fünf Interviews, Annahmen, fiktive Mindestdaten, Zeitprotokoll, Bewertung und Go/No-Go-Kriterien. Spätere Obergrenze: 24 bis 40 Stunden über 7 bis 10 Tage. Kein Start, Kauf, Konto, Werbung, Zahlung, Entwicklung, Gmail-/M3S-Import oder echte personenbezogene Daten.', source: 'Monitoring KM / Bewertung SaaS-Ideen Senegal / Priorität 1 Immobilien + M3S-INSTR-DIGITAL-TEST-001 V1' },
      { id: 'classic-review', service: 'classic', sensitivity: 'internal', title: 'Unabhängige Dokumentenkontrolle durchführen', context: 'Ein von einem anderen Dienst erstelltes Ergebnis gegen den übermittelten Korpus prüfen. Treue, Herkunft, Auslassungen und Schlussfolgerungen bewerten. Validiert, zu korrigieren oder nicht prüfbar zurückgeben, ohne externe Anreicherung.', source: 'Begrenztes Kontrollpaket von Cheikh und Codex' },
      { id: 'genspark-benchmark', service: 'genspark', sensitivity: 'public', title: 'Öffentliche Lösungen vergleichen', context: 'Öffentliche Anwendungen für Immobilien- und Verwaltungsmanagement vergleichen. Funktionen, Zielgruppe, öffentliche Preise, Grenzen und Differenzierung erfassen. Keine interne 2SG-Quelle verwenden und kein Konto erstellen.', source: 'Nur öffentliches Web' },
      { id: 'work-email', service: 'work', sensitivity: 'internal', title: 'Tägliches E-Mail-Monitoring qualifizieren', context: 'E-Mail-Signale in einem einzigen Verzeichnis bündeln, ohne sie zu offiziellen Quellen zu erklären. Je Signal erfassen: Betreff, Datum, Absender, M3S-Akte, Dringlichkeit, Vertraulichkeit, Anlage oder Link, vorgeschlagene Aktion, Verantwortung und Frist. Unterhaltungen deduplizieren und Alarm, Aufgabe, Nachweis und einfache Ressource trennen. Keine eingeschränkten Anhänge herunterladen oder weiterleiten.', source: 'Gmail / Unterhaltung Prioritäres E-Mail-Monitoring → ADM · Externe Aufgaben und laufende Arbeit' }
    ]
  }
};

const AdministrativeAssistant = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const promptCopy = PROMPT_COPY[language] || PROMPT_COPY.FR;
  const delegation = DELEGATION_COPY[language] || DELEGATION_COPY.FR;
  const [taskIndex, setTaskIndex] = useState(0);
  const [context, setContext] = useState('');
  const [source, setSource] = useState('');
  const [service, setService] = useState('cowork');
  const [sensitivity, setSensitivity] = useState('internal');
  const [copyStatus, setCopyStatus] = useState('');
  const task = t.tasks[taskIndex] || t.tasks[0];
  const prompt = useMemo(() => `${t.promptLead}\n\n${delegation.service}: ${delegation.services[service]}\n${delegation.sensitivity}: ${delegation.sensitivities[sensitivity]}\n${promptCopy.labels.task}: ${task}\n${promptCopy.labels.context}: ${context || promptCopy.labels.missing}\n${promptCopy.labels.source}: ${source || promptCopy.labels.missing}\n\n${promptCopy.labels.boundaries}:\n- ${t.boundaryItems.join('\n- ')}\n\n${promptCopy.expected}`, [context, delegation, promptCopy, sensitivity, service, source, t, task]);

  const prepareTemplate = template => {
    setTaskIndex(t.tasks.length - 1);
    setService(template.service);
    setSensitivity(template.sensitivity);
    setContext(template.context);
    setSource(template.source);
    setCopyStatus('');
  };

  const copyPrompt = async () => {
    setCopyStatus('');
    if (sensitivity === 'restricted') {
      setCopyStatus('blocked');
      return;
    }
    if (!navigator.clipboard?.writeText) {
      setCopyStatus('error');
      return;
    }
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus('success');
      window.setTimeout(() => setCopyStatus(''), 1800);
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <section className="administrative-assistant administration-overview space-y-5" aria-labelledby="administrative-assistant-title">
      <header className="m3s-panel p-5 sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-bold uppercase text-violet-300">{t.eyebrow}</p><h2 id="administrative-assistant-title" className="m3s-page-title mt-2">{t.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{t.intro}</p></div><span className="inline-flex items-center gap-2 self-start rounded-full border border-amber-700 bg-amber-950/25 px-3 py-2 text-xs font-semibold text-amber-200"><Bot size={17} />{t.status}</span></div></header>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="m3s-panel p-5"><h3 className="m3s-section-title flex items-center gap-2"><ListChecks className="text-emerald-300" size={21} />{t.missions}</h3><ul className="mt-4 space-y-3">{t.missionItems.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />{item}</li>)}</ul></section>
        <section className="m3s-panel p-5"><h3 className="m3s-section-title flex items-center gap-2"><ShieldCheck className="text-rose-300" size={21} />{t.boundaries}</h3><ul className="mt-4 space-y-3">{t.boundaryItems.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-rose-300" size={18} />{item}</li>)}</ul></section>
      </div>
      <section className="m3s-panel p-5 sm:p-6" aria-labelledby="external-missions-title">
        <div className="max-w-4xl"><h3 id="external-missions-title" className="m3s-section-title flex items-center gap-2"><BriefcaseBusiness className="text-cyan-300" size={21} />{delegation.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{delegation.intro}</p><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div className="rounded-lg border border-slate-700 bg-slate-950/25 p-3"><dt className="font-semibold text-slate-100">{delegation.projectLabel}</dt><dd className="mt-1 leading-6 text-slate-300">{delegation.projectName}</dd></div><div className="rounded-lg border border-slate-700 bg-slate-950/25 p-3"><dt className="font-semibold text-slate-100">{delegation.workflowLabel}</dt><dd className="mt-1 leading-6 text-slate-300">{delegation.workflow}</dd></div></dl></div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2"><div className="rounded-lg border border-blue-800/70 bg-blue-950/20 p-4"><p className="font-semibold text-blue-200">{delegation.mainLane}</p><p className="mt-2 text-sm leading-6 text-slate-300">{delegation.mainLaneText}</p></div><div className="rounded-lg border border-cyan-800/70 bg-cyan-950/20 p-4"><p className="font-semibold text-cyan-200">{delegation.delegatedLane}</p><p className="mt-2 text-sm leading-6 text-slate-300">{delegation.delegatedLaneText}</p></div></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{delegation.templates.map(template => <article key={template.id} className="flex min-h-56 flex-col rounded-lg border border-slate-700 bg-slate-950/25 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full border border-slate-600 px-2.5 py-1 text-xs font-semibold text-slate-200">{delegation.services[template.service]}</span><span className="text-xs font-semibold text-emerald-300">{delegation.status}</span></div><h4 className="mt-4 text-base font-semibold text-slate-100">{template.title}</h4><p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-300">{template.context}</p>{template.id === 'work-saas' && <p className="mt-3 text-xs font-semibold text-amber-200">{delegation.productionRule}</p>}<button type="button" onClick={() => prepareTemplate(template)} className="m3s-secondary-button mt-auto min-h-11 px-4">{delegation.prepareMission}</button></article>)}</div>
      </section>
      <section className="m3s-panel p-5 sm:p-6"><h3 className="m3s-section-title flex items-center gap-2"><FileSearch className="text-blue-300" size={21} />{t.prepare}</h3><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="space-y-4"><label><span className="m3s-field-label">{delegation.service}</span><select className="m3s-field mt-1 w-full" value={service} onChange={event => setService(event.target.value)}>{Object.entries(delegation.services).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label><span className="m3s-field-label">{delegation.sensitivity}</span><select className="m3s-field mt-1 w-full" value={sensitivity} onChange={event => { setSensitivity(event.target.value); setCopyStatus(''); }}>{Object.entries(delegation.sensitivities).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label><span className="m3s-field-label">{t.task}</span><select className="m3s-field mt-1 w-full" value={taskIndex} onChange={event => setTaskIndex(Number(event.target.value))}>{t.tasks.map((item, index) => <option key={item} value={index}>{item}</option>)}</select></label><label><span className="m3s-field-label">{t.context}</span><textarea className="m3s-field mt-1 min-h-32 w-full" value={context} onChange={event => setContext(event.target.value)} placeholder={t.contextPlaceholder} /></label><label><span className="m3s-field-label">{t.source}</span><input className="m3s-field mt-1 w-full" value={source} onChange={event => setSource(event.target.value)} placeholder={t.sourcePlaceholder} /></label></div><div className="rounded-lg border border-slate-700 bg-slate-950/35 p-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.result}</p><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-300">{prompt}</pre><button type="button" onClick={copyPrompt} className="m3s-secondary-button mt-4 min-h-11 gap-2 px-4" aria-disabled={sensitivity === 'restricted'}><ClipboardCopy size={18} />{t.copy}</button>{copyStatus === 'success' && <p className="mt-3 text-sm font-semibold text-emerald-300" role="status">{t.copied}</p>}{copyStatus === 'error' && <p className="mt-3 text-sm font-semibold text-amber-200" role="alert">{t.copyFailed}</p>}{copyStatus === 'blocked' && <p className="mt-3 text-sm font-semibold text-rose-300" role="alert">{delegation.copyBlocked}</p>}</div></div></section>
    </section>
  );
};

export default AdministrativeAssistant;
