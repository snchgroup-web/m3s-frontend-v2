import React from 'react';
import { AlertTriangle, CheckSquare2, FileLock2, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PREMIERE EXECUTION D UNE HABILITATION · PROTOCOLE V1.0 CONFIRMÉ · 29-08-2026',
    title: 'Préparer l exécution sans créer ni activer le droit',
    intro: 'Ce protocole vide rassemble les contrôles requis avant toute première application technique d une habilitation. Il ne constitue ni une autorisation active, ni un compte, ni un droit, ni une instruction exécutable par IT.',
    counters: [['Préconditions à contrôler', '6/6', 'Toutes requises avant décision'], ['Décision séparée', '1/1', 'Autorisation humaine traçable'], ['Autorisations actives', '0', 'Aucun cas réel'], ['Droits exécutés', '0', 'Aucune action technique']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['1 · Demande et périmètre', ['Référence de la fiche 008', 'Titulaire et mandat à vérifier', 'Rôle et périmètre minimal candidats', 'Durée et expiration candidates']],
      ['2 · Autorité et séparation', ['Propriétaire métier', 'Autorité de décision candidate', 'Fonction IT exécutante distincte', 'Contrôle après exécution']],
      ['3 · Préparation technique', ['Environnement cible candidat', 'Droits minimaux exacts', 'Journalisation et preuve attendue', 'Séparation REF-01 / secrets / C3-C5']],
      ['4 · Exécution et retour arrière', ['Contrôles préalables', 'Fenêtre d activation candidate', 'Vérification et arrêt', 'Retrait et preuve de clôture']]
    ],
    prerequisitesTitle: 'Six préconditions obligatoires proposées',
    prerequisites: ['Fiche 008 complète', 'Titulaire et mandat vérifiés', 'Périmètre minimal confirmé', 'Environnement contrôlé', 'Retrait prêt', 'Décision humaine séparée'],
    outcomesTitle: 'Quatre issues documentaires proposées',
    outcomes: ['Prêt pour décision d exécution', 'À compléter', 'Suspendu', 'Refusé'],
    status: 'CONFIRMÉ · Protocole documentaire V1.0. Zéro autorisation active, compte, droit, accès C3/C4/C5 ou exécution.',
    next: 'Étape suivante : préparer REF-01-G1-AUT-02-02-010 V0.1, la fiche candidate de décision GO/NO-GO.',
    boundary: 'La confirmation n autorise aucune première exécution. Une activation réelle exige une décision GO/NO-GO séparée, nominative et traçable, puis une action IT contrôlée avec vérification et retrait préparé.'
  },
  EN: {
    eyebrow: 'FIRST EXECUTION OF AN ACCESS RIGHT · V1.0 CONFIRMED PROTOCOL · 29 AUG 2026',
    title: 'Prepare execution without creating or activating the right',
    intro: 'This empty protocol brings together the checks required before the first technical application of an access right. It is neither an active authorisation, account, right nor executable instruction to IT.',
    counters: [['Prerequisites to review', '6/6', 'All required before decision'], ['Separate decision', '1/1', 'Traceable human authorisation'], ['Active authorisations', '0', 'No real case'], ['Executed rights', '0', 'No technical action']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Request and scope', ['Sheet 008 reference', 'Holder and mandate to verify', 'Candidate role and minimum scope', 'Candidate duration and expiry']],
      ['2 · Authority and segregation', ['Business owner', 'Candidate decision authority', 'Separate executing IT function', 'Post-execution review']],
      ['3 · Technical preparation', ['Candidate target environment', 'Exact minimum rights', 'Expected logging and evidence', 'REF-01 / secrets / C3-C5 separation']],
      ['4 · Execution and rollback', ['Pre-execution checks', 'Candidate activation window', 'Verification and stop', 'Withdrawal and closure evidence']]
    ],
    prerequisitesTitle: 'Six proposed mandatory prerequisites',
    prerequisites: ['Complete sheet 008', 'Holder and mandate verified', 'Minimum scope confirmed', 'Environment reviewed', 'Withdrawal ready', 'Separate human decision'],
    outcomesTitle: 'Four proposed documentary outcomes',
    outcomes: ['Ready for execution decision', 'To complete', 'On hold', 'Rejected'],
    status: 'CONFIRMED · V1.0 documentary protocol. Zero active authorisations, accounts, rights, C3/C4/C5 access or executions.',
    next: 'Next step: prepare REF-01-G1-AUT-02-02-010 V0.1, the candidate GO/NO-GO decision sheet.',
    boundary: 'Confirmation authorises no first execution. A real activation requires a separate named and traceable GO/NO-GO decision followed by controlled IT action with verification and prepared withdrawal.'
  },
  DE: {
    eyebrow: 'ERSTE AUSFUEHRUNG EINER BERECHTIGUNG · BESTÄTIGTES PROTOKOLL V1.0 · 29.08.2026',
    title: 'Ausführung vorbereiten, ohne das Recht zu erstellen oder zu aktivieren',
    intro: 'Dieses leere Protokoll bündelt die Kontrollen vor der ersten technischen Anwendung einer Berechtigung. Es ist weder aktive Autorisierung noch Konto, Recht oder ausführbare IT-Anweisung.',
    counters: [['Zu prüfende Voraussetzungen', '6/6', 'Alle vor dem Entscheid nötig'], ['Getrennter Entscheid', '1/1', 'Nachvollziehbare menschliche Autorisierung'], ['Aktive Autorisierungen', '0', 'Kein realer Fall'], ['Ausgeführte Rechte', '0', 'Keine technische Aktion']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Antrag und Umfang', ['Referenz des Blatts 008', 'Inhaber und Mandat zu prüfen', 'Kandidatenrolle und Minimalumfang', 'Kandidatendauer und Ablauf']],
      ['2 · Autorität und Trennung', ['Fachverantwortung', 'Kandidaten-Entscheidautorität', 'Getrennte ausführende IT-Funktion', 'Kontrolle nach Ausführung']],
      ['3 · Technische Vorbereitung', ['Kandidaten-Zielumgebung', 'Exakte Mindestrechte', 'Erwartete Protokollierung und Nachweis', 'Trennung REF-01 / Geheimnisse / C3-C5']],
      ['4 · Ausführung und Rückkehr', ['Vorgängige Kontrollen', 'Kandidaten-Aktivierungsfenster', 'Prüfung und Stopp', 'Entzug und Abschlussnachweis']]
    ],
    prerequisitesTitle: 'Sechs vorgeschlagene Pflichtvoraussetzungen',
    prerequisites: ['Blatt 008 vollständig', 'Inhaber und Mandat geprüft', 'Minimalumfang bestätigt', 'Umgebung kontrolliert', 'Entzug bereit', 'Getrennter menschlicher Entscheid'],
    outcomesTitle: 'Vier vorgeschlagene Dokumentationsergebnisse',
    outcomes: ['Bereit für Ausführungsentscheid', 'Zu ergänzen', 'Ausgesetzt', 'Abgelehnt'],
    status: 'BESTÄTIGT · Dokumentationsprotokoll V1.0. Null aktive Autorisierungen, Konten, Rechte, C3/C4/C5-Zugriffe oder Ausführungen.',
    next: 'Nächster Schritt: REF-01-G1-AUT-02-02-010 V0.1, das Kandidatenblatt zum GO/NO-GO-Entscheid, vorbereiten.',
    boundary: 'Die Bestätigung autorisiert keine erste Ausführung. Eine reale Aktivierung erfordert einen getrennten, namentlichen und nachvollziehbaren GO/NO-GO-Entscheid und danach eine kontrollierte IT-Aktion mit Prüfung und vorbereitetem Entzug.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeFirstUseAuthorisationProtocol = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-first-use-authorisation-protocol" className="mt-5 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-009 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-first-use-authorisation-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.prerequisitesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.prerequisites.map(item => <span key={item} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{item}</span>)}</div></div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.outcomesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.outcomes.map(item => <span key={item} className="rounded-md border border-violet-700/60 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{item}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeFirstUseAuthorisationProtocol;
