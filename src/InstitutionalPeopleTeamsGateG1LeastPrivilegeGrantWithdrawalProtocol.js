import React from 'react';
import { AlertTriangle, KeyRound, LockKeyhole, UserMinus, UserPlus } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'ATTRIBUTION ET RETRAIT · PROTOCOLE CANDIDAT V0.1 · 29-08-2026',
    title: 'Préparer chaque changement de droit sans l’exécuter',
    intro: 'Ce protocole candidat structure une future demande d’attribution, modification, expiration ou retrait. Il sépare besoin métier, validation, exécution technique et preuve, sans créer de compte ni modifier un droit réel.',
    counters: [['Préconditions structurées', '6/6', 'Contrôles documentaires candidats'], ['Demandes actives', '0', 'Aucun cas réel ouvert'], ['Droits attribués', '0', 'Aucune exécution autorisée'], ['Droits retirés', '0', 'Aucune exécution autorisée']],
    badge: 'CANDIDAT · À ARBITRER',
    groups: [
      ['1 · Demande et besoin métier', ['Référence opaque de la demande', 'Titulaire candidat sans identité civile exposée', 'Fonction et équipe concernées', 'Droit, objet, niveau et justification demandés']],
      ['2 · Séparation et validation', ['Demandeur distinct de l’approbateur', 'Propriétaire métier du périmètre', 'IT comme exécutant technique candidat', 'Gouvernance ou LEGAL pour exception sensible']],
      ['3 · Portée et calendrier', ['État actuel et état cible', 'Périmètre exact de lignes et de données', 'Date d’effet et expiration', 'Déclencheur de revue ou de retrait']],
      ['4 · Preuve et clôture', ['Référence de décision autorisée', 'Référence opaque du journal technique', 'Résultat contrôlé et anomalies', 'Retrait, retour arrière et clôture tracés']]
    ],
    rulesTitle: 'Six préconditions avant toute future exécution',
    rules: ['Besoin métier explicite', 'Titulaire et périmètre autorisés séparément', 'Demandeur différent de l’approbateur', 'Refus par défaut avant décision', 'Expiration ou revue obligatoire', 'Preuve conservée hors bundle public'],
    status: 'CANDIDAT · Zéro demande active, compte créé, droit attribué, modifié ou retiré, délégation, exception, accès C3/C4/C5 ou changement de production.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-02-005 V0.1.',
    boundary: 'Ce protocole ne vaut ni autorisation nominative ni procédure technique exécutable. Une future opération exigera une décision distincte, les preuves requises et un contrôle hors bundle public.'
  },
  EN: {
    eyebrow: 'GRANT AND WITHDRAWAL · V0.1 CANDIDATE PROTOCOL · 29 AUG 2026',
    title: 'Prepare every right change without executing it',
    intro: 'This candidate protocol structures a future grant, change, expiry or withdrawal request. It separates business need, approval, technical execution and evidence without creating an account or changing a real right.',
    counters: [['Structured prerequisites', '6/6', 'Candidate documentary controls'], ['Active requests', '0', 'No real case opened'], ['Granted rights', '0', 'No execution authorised'], ['Withdrawn rights', '0', 'No execution authorised']],
    badge: 'CANDIDATE · DECISION REQUIRED',
    groups: [
      ['1 · Request and business need', ['Opaque request reference', 'Candidate holder without exposed civil identity', 'Relevant function and team', 'Requested right, object, level and rationale']],
      ['2 · Segregation and approval', ['Requester separate from approver', 'Business owner of the scope', 'IT as candidate technical executor', 'Governance or LEGAL for sensitive exception']],
      ['3 · Scope and calendar', ['Current state and target state', 'Exact row and data scope', 'Effective date and expiry', 'Review or withdrawal trigger']],
      ['4 · Evidence and closure', ['Authorised decision reference', 'Opaque technical-log reference', 'Controlled outcome and anomalies', 'Withdrawal, rollback and closure traced']]
    ],
    rulesTitle: 'Six prerequisites before any future execution',
    rules: ['Explicit business need', 'Holder and scope authorised separately', 'Requester differs from approver', 'Default denial before decision', 'Mandatory expiry or review', 'Evidence retained outside the public bundle'],
    status: 'CANDIDATE · Zero active requests, created accounts, granted, changed or withdrawn rights, delegations, exceptions, C3/C4/C5 access or production changes.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-02-005 V0.1.',
    boundary: 'This protocol is neither a named authorisation nor an executable technical procedure. Any future operation will require a separate decision, the required evidence and control outside the public bundle.'
  },
  DE: {
    eyebrow: 'ZUWEISUNG UND ENTZUG · KANDIDATENPROTOKOLL V0.1 · 29.08.2026',
    title: 'Jede Rechteänderung vorbereiten, ohne sie auszuführen',
    intro: 'Dieses Kandidatenprotokoll strukturiert eine künftige Zuweisung, Änderung, Befristung oder einen Entzug. Es trennt Fachbedarf, Genehmigung, technische Ausführung und Nachweis, ohne ein Konto zu erstellen oder ein reales Recht zu ändern.',
    counters: [['Strukturierte Voraussetzungen', '6/6', 'Dokumentarische Kandidatenkontrollen'], ['Aktive Anträge', '0', 'Kein realer Fall eröffnet'], ['Zugewiesene Rechte', '0', 'Keine Ausführung autorisiert'], ['Entzogene Rechte', '0', 'Keine Ausführung autorisiert']],
    badge: 'KANDIDAT · ENTSCHEID NÖTIG',
    groups: [
      ['1 · Antrag und Fachbedarf', ['Opake Antragsreferenz', 'Kandidateninhaber ohne offengelegte Zivilidentität', 'Betroffene Funktion und Team', 'Beantragtes Recht, Objekt, Stufe und Begründung']],
      ['2 · Trennung und Genehmigung', ['Antragsteller getrennt von Genehmiger', 'Fachverantwortung des Umfangs', 'IT als technischer Kandidatenausführer', 'Governance oder LEGAL bei sensibler Ausnahme']],
      ['3 · Umfang und Kalender', ['Aktueller Stand und Zielstand', 'Exakter Zeilen- und Datenumfang', 'Wirksamkeitsdatum und Ablauf', 'Prüf- oder Entzugsauslöser']],
      ['4 · Nachweis und Abschluss', ['Autorisierte Entscheidreferenz', 'Opake technische Protokollreferenz', 'Kontrolliertes Ergebnis und Abweichungen', 'Entzug, Rücknahme und Abschluss protokolliert']]
    ],
    rulesTitle: 'Sechs Voraussetzungen vor jeder künftigen Ausführung',
    rules: ['Ausdrücklicher Fachbedarf', 'Inhaber und Umfang getrennt autorisiert', 'Antragsteller nicht Genehmiger', 'Standardverweigerung vor Entscheid', 'Obligatorischer Ablauf oder Prüfung', 'Nachweis ausserhalb des öffentlichen Bundles'],
    status: 'KANDIDAT · Null aktive Anträge, erstellte Konten, zugewiesene, geänderte oder entzogene Rechte, Delegationen, Ausnahmen, C3/C4/C5-Zugriffe oder Produktionsänderungen.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-02-005 V0.1 bestätigen oder ändern.',
    boundary: 'Dieses Protokoll ist weder eine namentliche Autorisierung noch ein ausführbares technisches Verfahren. Jede künftige Operation erfordert einen getrennten Entscheid, die nötigen Nachweise und eine Kontrolle ausserhalb des öffentlichen Bundles.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeGrantWithdrawalProtocol = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [KeyRound, AlertTriangle, UserPlus, UserMinus];

  return (
    <section data-testid="ref01-g1-least-privilege-grant-withdrawal-protocol" className="mt-4 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><KeyRound className="shrink-0 text-amber-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className="shrink-0 text-amber-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-005 · V0.1</h6><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-grant-withdrawal-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-violet-800/70 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-rose-800/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><LockKeyhole className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeGrantWithdrawalProtocol;
