import React, { useMemo, useState } from 'react';
import { Bot, CheckCircle2, ClipboardCopy, FileSearch, ListChecks, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'AGENT SPÉCIALISÉ · PROTOTYPE CADRÉ', title: 'Assistant administratif 2SG',
    intro: 'Un espace de préparation pour aider le responsable et l’équipe sans remplacer leur décision, leurs droits ni les fonctions compétentes.',
    status: 'Non connecté · aucune action autonome', missions: 'Missions autorisées', boundaries: 'Limites obligatoires', prepare: 'Préparer une demande',
    task: 'Type de soutien', context: 'Contexte minimal', source: 'Source ou emplacement GED', result: 'Projet de consigne contrôlée', copy: 'Copier la consigne', copied: 'Consigne copiée.', copyFailed: 'Copie impossible. Sélectionnez la consigne manuellement.',
    tasks: ['Qualifier un courrier reçu', 'Préparer une synthèse de dossier', 'Contrôler les champs manquants', 'Préparer une relance', 'Classer une ressource'],
    missionItems: ['Structurer les faits et les métadonnées.', 'Repérer les champs, pièces ou décisions manquants.', 'Préparer une synthèse ou un projet de message.', 'Rappeler provenance, confidentialité, responsable et échéance.'],
    boundaryItems: ['Ne valide, ne signe et n’adopte aucun document.', 'N’envoie aucun courrier et n’effectue aucun paiement.', 'Ne supprime aucune preuve et n’accède pas aux pièces restreintes sans droit.', 'Ne formule pas de conclusion juridique, fiscale ou réglementaire.'],
    contextPlaceholder: 'Décrire la demande sans coller de secret, mot de passe ou contenu sensible…', sourcePlaceholder: 'Ex. GED / Administration / Courrier / COR-2026-…',
    promptLead: 'Agis comme assistant administratif 2SG dans un cadre de préparation uniquement.'
  },
  EN: {
    eyebrow: 'SPECIALISED AGENT · FRAMED PROTOTYPE', title: '2SG administrative assistant', intro: 'A preparation area supporting the owner and team without replacing decisions, rights or competent functions.', status: 'Not connected · no autonomous action', missions: 'Allowed missions', boundaries: 'Mandatory boundaries', prepare: 'Prepare a request', task: 'Support type', context: 'Minimum context', source: 'Source or DMS location', result: 'Controlled instruction draft', copy: 'Copy instruction', copied: 'Instruction copied.', copyFailed: 'Copy failed. Select the instruction manually.', tasks: ['Qualify incoming correspondence', 'Prepare a file summary', 'Check missing fields', 'Prepare a reminder', 'Classify a resource'], missionItems: ['Structure facts and metadata.', 'Identify missing fields, evidence or decisions.', 'Prepare a summary or message draft.', 'Recall provenance, confidentiality, owner and deadline.'], boundaryItems: ['Does not validate, sign or adopt any document.', 'Sends no correspondence and makes no payment.', 'Deletes no evidence and accesses no restricted file without rights.', 'Provides no legal, tax or regulatory conclusion.'], contextPlaceholder: 'Describe the request without pasting secrets, passwords or sensitive content…', sourcePlaceholder: 'E.g. DMS / Administration / Correspondence / COR-2026-…', promptLead: 'Act as the 2SG administrative assistant in preparation-only mode.'
  },
  DE: {
    eyebrow: 'SPEZIALISIERTER AGENT · GERAHMTER PROTOTYP', title: '2SG-Verwaltungsassistent', intro: 'Ein Vorbereitungsbereich zur Unterstützung von Verantwortung und Team, ohne Entscheidungen, Rechte oder zuständige Funktionen zu ersetzen.', status: 'Nicht verbunden · keine autonome Aktion', missions: 'Erlaubte Aufgaben', boundaries: 'Verbindliche Grenzen', prepare: 'Anfrage vorbereiten', task: 'Unterstützungsart', context: 'Mindestkontext', source: 'Quelle oder DMS-Ablage', result: 'Kontrollierter Anweisungsentwurf', copy: 'Anweisung kopieren', copied: 'Anweisung kopiert.', copyFailed: 'Kopieren nicht möglich. Anweisung bitte manuell auswählen.', tasks: ['Eingehende Korrespondenz qualifizieren', 'Aktenzusammenfassung vorbereiten', 'Fehlende Felder prüfen', 'Erinnerung vorbereiten', 'Ressource klassifizieren'], missionItems: ['Fakten und Metadaten strukturieren.', 'Fehlende Felder, Nachweise oder Entscheide erkennen.', 'Zusammenfassung oder Nachrichtenentwurf vorbereiten.', 'Herkunft, Vertraulichkeit, Verantwortung und Frist nennen.'], boundaryItems: ['Validiert, unterzeichnet oder verabschiedet kein Dokument.', 'Versendet keine Korrespondenz und leistet keine Zahlung.', 'Löscht keinen Nachweis und greift ohne Rechte auf keine eingeschränkte Akte zu.', 'Gibt keine rechtliche, steuerliche oder regulatorische Schlussfolgerung ab.'], contextPlaceholder: 'Anfrage ohne Geheimnisse, Passwörter oder sensible Inhalte beschreiben…', sourcePlaceholder: 'Z. B. DMS / Verwaltung / Korrespondenz / KOR-2026-…', promptLead: 'Handle als 2SG-Verwaltungsassistent ausschließlich im Vorbereitungsmodus.'
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

const AdministrativeAssistant = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const promptCopy = PROMPT_COPY[language] || PROMPT_COPY.FR;
  const [taskIndex, setTaskIndex] = useState(0);
  const [context, setContext] = useState('');
  const [source, setSource] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const task = t.tasks[taskIndex] || t.tasks[0];
  const prompt = useMemo(() => `${t.promptLead}\n\n${promptCopy.labels.task}: ${task}\n${promptCopy.labels.context}: ${context || promptCopy.labels.missing}\n${promptCopy.labels.source}: ${source || promptCopy.labels.missing}\n\n${promptCopy.labels.boundaries}:\n- ${t.boundaryItems.join('\n- ')}\n\n${promptCopy.expected}`, [context, promptCopy, source, t, task]);

  const copyPrompt = async () => {
    setCopyStatus('');
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
      <section className="m3s-panel p-5 sm:p-6"><h3 className="m3s-section-title flex items-center gap-2"><FileSearch className="text-blue-300" size={21} />{t.prepare}</h3><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="space-y-4"><label><span className="m3s-field-label">{t.task}</span><select className="m3s-field mt-1 w-full" value={taskIndex} onChange={event => setTaskIndex(Number(event.target.value))}>{t.tasks.map((item, index) => <option key={item} value={index}>{item}</option>)}</select></label><label><span className="m3s-field-label">{t.context}</span><textarea className="m3s-field mt-1 min-h-32 w-full" value={context} onChange={event => setContext(event.target.value)} placeholder={t.contextPlaceholder} /></label><label><span className="m3s-field-label">{t.source}</span><input className="m3s-field mt-1 w-full" value={source} onChange={event => setSource(event.target.value)} placeholder={t.sourcePlaceholder} /></label></div><div className="rounded-lg border border-slate-700 bg-slate-950/35 p-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.result}</p><pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-300">{prompt}</pre><button type="button" onClick={copyPrompt} className="m3s-secondary-button mt-4 min-h-11 gap-2 px-4"><ClipboardCopy size={18} />{t.copy}</button>{copyStatus === 'success' && <p className="mt-3 text-sm font-semibold text-emerald-300" role="status">{t.copied}</p>}{copyStatus === 'error' && <p className="mt-3 text-sm font-semibold text-amber-200" role="alert">{t.copyFailed}</p>}</div></div></section>
    </section>
  );
};

export default AdministrativeAssistant;
