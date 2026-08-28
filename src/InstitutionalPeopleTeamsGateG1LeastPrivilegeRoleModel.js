import React from 'react';
import { AlertTriangle, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'RÔLES ET MOINDRE PRIVILÈGE · MODÈLE CONFIRMÉ V1.0 · 28-08-2026',
    title: 'Qualifier les six champs sans ouvrir de droit réel',
    intro: 'Ce modèle reprend les valeurs déjà contrôlées dans AUT-02-02-002 V1.0. Il distingue rôle canonique, droit effectif, périmètre, délégation, revue et exception sans modifier un compte ni exposer de donnée C3/C4/C5.',
    counters: [['Champs rapprochés', '6/6', 'Deux sourcés · quatre gouvernés'], ['Titulaire observé', '1', 'Compte historique uniquement'], ['Délégations actives', '0', 'Aucune preuve disponible'], ['Droits modifiés', '0', 'Lecture documentaire seulement']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['1 · Identité fonctionnelle et rôle', ['Identifiant institutionnel opaque', 'Fonction et équipe', 'Rôle source observé', 'Rôle canonique candidat']],
      ['2 · Droits et périmètre', ['Action autorisée', 'Objet et niveau de donnée', 'Périmètre de lignes', 'Justification métier et preuve']],
      ['3 · Délégation et revue', ['Délégant et délégataire', 'Portée et expiration', 'Déclencheur de revue', 'Responsable et preuve attendue']],
      ['4 · Exception et arrêt', ['Motif et autorité', 'Contrôle compensatoire', 'Expiration obligatoire', 'Refus, retrait et escalade']]
    ],
    rulesTitle: 'Cinq règles candidates de moindre privilège',
    rules: ['Rôle canonique distinct du droit', 'Périmètre explicite avant accès', 'Délégation datée et révocable', 'Exception temporaire et tracée', 'Refus par défaut pour C4/C5'],
    status: 'CONFIRMÉ · Modèle documentaire de qualification retenu en V1.0. Zéro création de compte, attribution, retrait, délégation, exception, accès C3/C4/C5 ou modification de production.',
    next: 'Suite préparée : qualifier séparément les droits observés et les refus dans REF-01-G1-AUT-02-02-004 V0.1.',
    boundary: 'Une confirmation validera seulement le modèle de qualification. Les titulaires, droits, périmètres et exceptions réels resteront soumis à une décision nominative séparée et à des preuves hors bundle public.'
  },
  EN: {
    eyebrow: 'ROLES AND LEAST PRIVILEGE · V1.0 CONFIRMED MODEL · 28 AUG 2026',
    title: 'Qualify all six fields without opening a real right',
    intro: 'This model reuses the values already reviewed in AUT-02-02-002 V1.0. It separates canonical role, effective right, scope, delegation, review and exception without changing an account or exposing C3/C4/C5 data.',
    counters: [['Reconciled fields', '6/6', 'Two sourced · four governed'], ['Observed holder', '1', 'Historical account only'], ['Active delegations', '0', 'No evidence available'], ['Changed rights', '0', 'Documentary reading only']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Functional identity and role', ['Opaque institutional identifier', 'Function and team', 'Observed source role', 'Candidate canonical role']],
      ['2 · Rights and scope', ['Authorised action', 'Object and data level', 'Row scope', 'Business rationale and evidence']],
      ['3 · Delegation and review', ['Delegator and delegate', 'Scope and expiry', 'Review trigger', 'Owner and expected evidence']],
      ['4 · Exception and stop', ['Reason and authority', 'Compensating control', 'Mandatory expiry', 'Denial, withdrawal and escalation']]
    ],
    rulesTitle: 'Five candidate least-privilege rules',
    rules: ['Canonical role separate from right', 'Explicit scope before access', 'Dated and revocable delegation', 'Temporary and traced exception', 'Default denial for C4/C5'],
    status: 'CONFIRMED · Documentary qualification model retained in V1.0. Zero account creation, assignment, withdrawal, delegation, exception, C3/C4/C5 access or production change.',
    next: 'Next prepared step: qualify observed rights and denials separately in REF-01-G1-AUT-02-02-004 V0.1.',
    boundary: 'Confirmation will validate only the qualification model. Real holders, rights, scopes and exceptions will still require a separate named decision and evidence outside the public bundle.'
  },
  DE: {
    eyebrow: 'ROLLEN UND GERINGSTE BERECHTIGUNG · BESTÄTIGTES MODELL V1.0 · 28.08.2026',
    title: 'Sechs Felder qualifizieren, ohne ein reales Recht zu öffnen',
    intro: 'Dieses Modell übernimmt die bereits in AUT-02-02-002 V1.0 geprüften Werte. Es trennt kanonische Rolle, wirksames Recht, Umfang, Delegation, Prüfung und Ausnahme, ohne ein Konto zu ändern oder C3/C4/C5-Daten offenzulegen.',
    counters: [['Abgeglichene Felder', '6/6', 'Zwei belegt · vier gesteuert'], ['Beobachteter Inhaber', '1', 'Nur historisches Konto'], ['Aktive Delegationen', '0', 'Kein Nachweis verfügbar'], ['Geänderte Rechte', '0', 'Nur dokumentarische Lektüre']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Funktionale Identität und Rolle', ['Opake institutionelle Kennung', 'Funktion und Team', 'Beobachtete Quellrolle', 'Kanonische Kandidatenrolle']],
      ['2 · Rechte und Umfang', ['Erlaubte Aktion', 'Objekt und Datenstufe', 'Zeilenumfang', 'Geschäftliche Begründung und Nachweis']],
      ['3 · Delegation und Prüfung', ['Delegierende und delegierte Person', 'Umfang und Ablauf', 'Prüfauslöser', 'Verantwortung und erwarteter Nachweis']],
      ['4 · Ausnahme und Stopp', ['Grund und Autorität', 'Kompensierende Kontrolle', 'Obligatorischer Ablauf', 'Ablehnung, Entzug und Eskalation']]
    ],
    rulesTitle: 'Fünf Kandidatenregeln zur geringsten Berechtigung',
    rules: ['Kanonische Rolle vom Recht getrennt', 'Expliziter Umfang vor Zugriff', 'Datierte und widerrufbare Delegation', 'Temporäre und protokollierte Ausnahme', 'Standardablehnung für C4/C5'],
    status: 'BESTÄTIGT · Dokumentarisches Qualifikationsmodell in V1.0 übernommen. Null Kontoerstellungen, Zuweisungen, Entzüge, Delegationen, Ausnahmen, C3/C4/C5-Zugriffe oder Produktionsänderungen.',
    next: 'Nächster vorbereiteter Schritt: beobachtete Rechte und Ablehnungen in REF-01-G1-AUT-02-02-004 V0.1 getrennt qualifizieren.',
    boundary: 'Eine Bestätigung validiert nur das Qualifikationsmodell. Reale Inhaber, Rechte, Umfänge und Ausnahmen benötigen weiterhin einen getrennten namentlichen Entscheid und Nachweise ausserhalb des öffentlichen Bundles.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeRoleModel = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-role-model" className="mt-5 rounded-md border border-fuchsia-800/70 bg-fuchsia-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><KeyRound className="mt-0.5 shrink-0 text-fuchsia-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-fuchsia-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? ShieldCheck : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-fuchsia-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-003 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-role-model-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-fuchsia-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-fuchsia-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeRoleModel;
