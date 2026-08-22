import React, { useMemo, useState } from 'react';
import { Bot, CheckCircle2, ClipboardCopy, FileSearch, LockKeyhole, ShieldCheck } from 'lucide-react';

const MODULES = {
  finances: {
    FR: ['Assistant Finances', ['Préparer un rapprochement de flux', 'Contrôler les pièces et champs manquants', 'Préparer une synthèse CHF/CFA', 'Qualifier une anomalie sans la corriger']],
    EN: ['Finance Assistant', ['Prepare a flow reconciliation', 'Check missing evidence and fields', 'Prepare a CHF/CFA summary', 'Qualify an anomaly without correcting it']],
    DE: ['Assistent Finanzen', ['Einen Zahlungsabgleich vorbereiten', 'Fehlende Belege und Felder prüfen', 'Eine CHF/CFA-Synthese vorbereiten', 'Eine Abweichung ohne Korrektur qualifizieren']]
  },
  rh: {
    FR: ['Assistant Ressources Humaines', ['Préparer une fiche de profil', 'Contrôler un dossier RH incomplet', 'Préparer une trame de contrat', 'Qualifier une demande d’accès']],
    EN: ['Human Resources Assistant', ['Prepare a profile record', 'Check an incomplete HR file', 'Prepare a contract outline', 'Qualify an access request']],
    DE: ['Assistent Personalwesen', ['Ein Profilblatt vorbereiten', 'Eine unvollständige Personalakte prüfen', 'Eine Vertragsvorlage vorbereiten', 'Eine Zugriffsanfrage qualifizieren']]
  },
  'it-support': {
    FR: ['Assistant IT & Support', ['Préparer un diagnostic d’incident', 'Qualifier une demande de support', 'Préparer une checklist de sécurité', 'Documenter une solution testée']],
    EN: ['IT & Support Assistant', ['Prepare an incident diagnosis', 'Qualify a support request', 'Prepare a security checklist', 'Document a tested solution']],
    DE: ['Assistent IT & Support', ['Eine Vorfalldiagnose vorbereiten', 'Eine Supportanfrage qualifizieren', 'Eine Sicherheitscheckliste vorbereiten', 'Eine getestete Lösung dokumentieren']]
  },
  commercial: {
    FR: ['Assistant Commercial & CRM', ['Préparer une fiche prospect', 'Qualifier un besoin client', 'Préparer un suivi donateur ou bénéficiaire', 'Synthétiser un échange commercial']],
    EN: ['Commercial & CRM Assistant', ['Prepare a prospect record', 'Qualify a client need', 'Prepare donor or beneficiary follow-up', 'Summarise a commercial exchange']],
    DE: ['Assistent Vertrieb & CRM', ['Ein Interessentenblatt vorbereiten', 'Einen Kundenbedarf qualifizieren', 'Spender- oder Begünstigtenbetreuung vorbereiten', 'Einen Vertriebsaustausch zusammenfassen']]
  },
  production: {
    FR: ['Assistant Production', ['Préparer une fiche de commande', 'Contrôler les éléments d’exécution', 'Préparer une réception fournisseur', 'Qualifier un retard ou un écart']],
    EN: ['Production Assistant', ['Prepare an order record', 'Check execution elements', 'Prepare a supplier receipt', 'Qualify a delay or variance']],
    DE: ['Assistent Produktion', ['Ein Bestellblatt vorbereiten', 'Ausführungselemente prüfen', 'Eine Lieferantenabnahme vorbereiten', 'Eine Verzögerung oder Abweichung qualifizieren']]
  },
  stock: {
    FR: ['Assistant Stock & Actifs', ['Préparer une fiche d’inventaire', 'Qualifier un mouvement de stock', 'Préparer un suivi d’actif', 'Documenter un risque ou un incident']],
    EN: ['Stock & Assets Assistant', ['Prepare an inventory record', 'Qualify a stock movement', 'Prepare asset tracking', 'Document a risk or incident']],
    DE: ['Assistent Bestand & Aktiven', ['Ein Inventarblatt vorbereiten', 'Eine Bestandsbewegung qualifizieren', 'Eine Aktivenverfolgung vorbereiten', 'Ein Risiko oder einen Vorfall dokumentieren']]
  }
};

const COPY = {
  FR: {
    eyebrow: 'ASSISTANT MÉTIER · PRÉPARATION CONTRÔLÉE', intro: 'Cet assistant prépare, contrôle et structure le travail de la fonction. Il ne décide pas, n’exécute aucune transaction et ne remplace pas le responsable métier.',
    status: 'Prototype cadré · aucune action autonome', missions: 'Missions proposées', boundaries: 'Frontières obligatoires',
    boundaryItems: ['Aucune validation, signature, dépense ou paiement.', 'Aucun envoi, suppression ou modification de source maîtresse.', 'Les données sensibles restent dans un canal autorisé.', 'Le responsable humain contrôle le résultat avant toute suite.'],
    prepare: 'Préparer une demande', task: 'Type de soutien', context: 'Contexte factuel', source: 'Source ou référence GED', result: 'Projet de demande', copy: 'Copier la demande', copied: 'Demande copiée.', missing: 'à compléter',
    promptLead: 'Tu interviens comme assistant métier 2SG/M3S en préparation contrôlée.', expected: 'Livrable attendu : une proposition structurée, les éléments manquants, les risques et la prochaine décision humaine requise.'
  },
  EN: {
    eyebrow: 'BUSINESS ASSISTANT · CONTROLLED PREPARATION', intro: 'This assistant prepares, checks and structures function work. It makes no decision, executes no transaction and does not replace the function owner.',
    status: 'Framed prototype · no autonomous action', missions: 'Suggested missions', boundaries: 'Mandatory boundaries',
    boundaryItems: ['No approval, signature, expense or payment.', 'No sending, deletion or change to a master source.', 'Sensitive data stays in an authorised channel.', 'A human owner checks the result before any next step.'],
    prepare: 'Prepare a request', task: 'Support type', context: 'Factual context', source: 'Source or DMS reference', result: 'Request draft', copy: 'Copy request', copied: 'Request copied.', missing: 'to complete',
    promptLead: 'You act as a 2SG/M3S business assistant under controlled preparation.', expected: 'Expected deliverable: a structured proposal, missing elements, risks and the next required human decision.'
  },
  DE: {
    eyebrow: 'FACHASSISTENT · KONTROLLIERTE VORBEREITUNG', intro: 'Dieser Assistent bereitet Funktionsarbeit vor, prüft und strukturiert sie. Er entscheidet nicht, führt keine Transaktion aus und ersetzt die fachliche Verantwortung nicht.',
    status: 'Gerahmter Prototyp · keine autonome Aktion', missions: 'Vorgeschlagene Aufgaben', boundaries: 'Verbindliche Grenzen',
    boundaryItems: ['Keine Freigabe, Unterschrift, Ausgabe oder Zahlung.', 'Kein Versand, Löschen oder Ändern einer Hauptquelle.', 'Sensible Daten verbleiben in einem freigegebenen Kanal.', 'Die menschliche Verantwortung prüft das Ergebnis vor jeder Folgeaktion.'],
    prepare: 'Anfrage vorbereiten', task: 'Unterstützungsart', context: 'Sachlicher Kontext', source: 'Quelle oder GED-Referenz', result: 'Anfrageentwurf', copy: 'Anfrage kopieren', copied: 'Anfrage kopiert.', missing: 'zu ergänzen',
    promptLead: 'Du arbeitest als 2SG/M3S-Fachassistent in kontrollierter Vorbereitung.', expected: 'Erwartetes Ergebnis: strukturierter Vorschlag, fehlende Elemente, Risiken und nächste erforderliche menschliche Entscheidung.'
  }
};

const FunctionAssistant = ({ moduleId, language = 'FR' }) => {
  const lang = MODULES[moduleId]?.[language] ? language : 'FR';
  const [title, tasks] = MODULES[moduleId]?.[lang] || MODULES.finances.FR;
  const t = COPY[lang];
  const [task, setTask] = useState(tasks[0]);
  const [context, setContext] = useState('');
  const [source, setSource] = useState('');
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => `${t.promptLead}\n\n${t.task}: ${task}\n${t.context}: ${context || t.missing}\n${t.source}: ${source || t.missing}\n\n${t.boundaries}:\n- ${t.boundaryItems.join('\n- ')}\n\n${t.expected}`, [context, source, t, task]);

  const copyPrompt = async () => {
    if (!navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="function-assistant space-y-5" aria-labelledby={`${moduleId}-assistant-title`}>
      <header className="m3s-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h2 id={`${moduleId}-assistant-title`} className="m3s-page-title mt-2">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{t.intro}</p></div>
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-amber-700 bg-amber-950/25 px-3 py-2 text-xs font-semibold text-amber-200"><Bot size={17} />{t.status}</span>
        </div>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="m3s-panel p-5"><h3 className="m3s-section-title flex items-center gap-2"><CheckCircle2 className="text-emerald-300" size={21} />{t.missions}</h3><ul className="mt-4 space-y-3">{tasks.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />{item}</li>)}</ul></section>
        <section className="m3s-panel p-5"><h3 className="m3s-section-title flex items-center gap-2"><ShieldCheck className="text-rose-300" size={21} />{t.boundaries}</h3><ul className="mt-4 space-y-3">{t.boundaryItems.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><LockKeyhole className="mt-0.5 shrink-0 text-rose-300" size={18} />{item}</li>)}</ul></section>
      </div>
      <section className="m3s-panel p-5 sm:p-6"><h3 className="m3s-section-title flex items-center gap-2"><FileSearch className="text-blue-300" size={21} />{t.prepare}</h3><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="space-y-4"><label><span className="m3s-field-label">{t.task}</span><select className="m3s-field mt-1 w-full" value={task} onChange={event => setTask(event.target.value)}>{tasks.map(item => <option key={item}>{item}</option>)}</select></label><label><span className="m3s-field-label">{t.context}</span><textarea className="m3s-field mt-1 min-h-32 w-full" value={context} onChange={event => setContext(event.target.value)} /></label><label><span className="m3s-field-label">{t.source}</span><input className="m3s-field mt-1 w-full" value={source} onChange={event => setSource(event.target.value)} /></label></div><div className="rounded-md border border-slate-700 bg-slate-950/35 p-4"><p className="text-xs font-semibold uppercase text-slate-400">{t.result}</p><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-300">{prompt}</pre><button type="button" onClick={copyPrompt} className="m3s-secondary-button mt-4 min-h-11 gap-2 px-4"><ClipboardCopy size={18} />{t.copy}</button>{copied && <p className="mt-3 text-sm font-semibold text-emerald-300" role="status">{t.copied}</p>}</div></div></section>
    </section>
  );
};

export default FunctionAssistant;
