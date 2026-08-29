import React from 'react';
import { AlertTriangle, ClipboardList, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REGISTRE D’HABILITATIONS · GABARIT CONFIRMÉ V1.0 · 29-08-2026',
    title: 'Préparer la traçabilité sans enregistrer de droit réel',
    intro: 'Ce registre candidat assemble les métadonnées minimales d’une future habilitation. Il reste vide : aucune identité civile, aucun compte, aucun droit, aucune décision et aucun journal technique réel ne sont enregistrés.',
    counters: [['Champs structurés', '16/16', 'Quatre groupes documentaires'], ['États candidats', '6/6', 'Cycle proposé à arbitrer'], ['Fiches actives', '0', 'Aucun cas réel ouvert'], ['Droits réels', '0', 'Aucune habilitation créée']],
    badge: 'CONFIRMÉ · VIDE',
    groups: [
      ['1 · Identification et demande', ['Référence opaque du registre', 'Référence opaque du titulaire, sans identité civile', 'Fonction et équipe', 'Référence de demande et besoin métier']],
      ['2 · Droit et périmètre', ['Rôle, action et objet', 'Classification C1 à C5', 'Périmètre de lignes et de données', 'État actuel et état cible']],
      ['3 · Décision et validité', ['Fonction demandeuse', 'Fonction approbatrice', 'Référence de décision', 'Date d’effet et date d’expiration ou de revue']],
      ['4 · Exécution et clôture', ['Référence opaque du journal technique', 'Résultat contrôlé et anomalies', 'Référence de retrait ou retour arrière', 'Preuve de clôture hors bundle public']]
    ],
    statesTitle: 'Six états candidats du registre',
    states: ['Brouillon', 'À valider', 'Autorisé', 'Appliqué', 'Retiré ou expiré', 'Refusé'],
    status: 'CONFIRMÉ · Registre documentaire vide retenu en V1.0. Aucun formulaire actif, titulaire, compte, droit, accès C3/C4/C5, décision, journal technique ou changement de production.',
    next: 'Portes AUT-02-02-007 confirmées en V1.0 ; fiche de décision AUT-02-02-008 préparée en V0.1.',
    boundary: 'Ce gabarit ne vaut ni registre opérationnel ni preuve d’habilitation. Toute future fiche devra être autorisée séparément, protégée hors bundle public et reliée à des preuves contrôlées.'
  },
  EN: {
    eyebrow: 'ACCESS-RIGHTS REGISTER · V1.0 CONFIRMED TEMPLATE · 29 AUG 2026',
    title: 'Prepare traceability without recording a real right',
    intro: 'This candidate register assembles the minimum metadata for a future access right. It remains empty: no civil identity, account, right, decision or real technical log is recorded.',
    counters: [['Structured fields', '16/16', 'Four documentary groups'], ['Candidate states', '6/6', 'Proposed cycle for decision'], ['Active records', '0', 'No real case opened'], ['Real rights', '0', 'No access right created']],
    badge: 'CONFIRMED · EMPTY',
    groups: [
      ['1 · Identification and request', ['Opaque register reference', 'Opaque holder reference without civil identity', 'Function and team', 'Request reference and business need']],
      ['2 · Right and scope', ['Role, action and object', 'C1 to C5 classification', 'Row and data scope', 'Current state and target state']],
      ['3 · Decision and validity', ['Requesting function', 'Approving function', 'Decision reference', 'Effective date and expiry or review date']],
      ['4 · Execution and closure', ['Opaque technical-log reference', 'Controlled result and anomalies', 'Withdrawal or rollback reference', 'Closure evidence outside the public bundle']]
    ],
    statesTitle: 'Six candidate register states',
    states: ['Draft', 'Pending validation', 'Authorised', 'Applied', 'Withdrawn or expired', 'Denied'],
    status: 'CONFIRMED · Empty documentary register retained as V1.0. No active form, holder, account, right, C3/C4/C5 access, decision, technical log or production change.',
    next: 'AUT-02-02-007 gates confirmed as V1.0; AUT-02-02-008 decision sheet prepared as V0.1.',
    boundary: 'This template is neither an operational register nor proof of access. Any future record must be authorised separately, protected outside the public bundle and linked to controlled evidence.'
  },
  DE: {
    eyebrow: 'BERECHTIGUNGSREGISTER · BESTÄTIGTE VORLAGE V1.0 · 29.08.2026',
    title: 'Nachvollziehbarkeit vorbereiten, ohne ein reales Recht zu erfassen',
    intro: 'Dieses Kandidatenregister bündelt die minimalen Metadaten einer künftigen Berechtigung. Es bleibt leer: keine Zivilidentität, kein Konto, Recht, Entscheid oder reales technisches Protokoll wird erfasst.',
    counters: [['Strukturierte Felder', '16/16', 'Vier Dokumentationsgruppen'], ['Kandidatenzustände', '6/6', 'Vorgeschlagener Zyklus zur Entscheidung'], ['Aktive Einträge', '0', 'Kein realer Fall eröffnet'], ['Reale Rechte', '0', 'Keine Berechtigung erstellt']],
    badge: 'BESTÄTIGT · LEER',
    groups: [
      ['1 · Identifikation und Antrag', ['Opake Registerreferenz', 'Opake Inhaberreferenz ohne Zivilidentität', 'Funktion und Team', 'Antragsreferenz und Fachbedarf']],
      ['2 · Recht und Umfang', ['Rolle, Aktion und Objekt', 'Klassifikation C1 bis C5', 'Zeilen- und Datenumfang', 'Aktueller Stand und Zielstand']],
      ['3 · Entscheid und Gültigkeit', ['Antragstellende Funktion', 'Genehmigende Funktion', 'Entscheidreferenz', 'Wirksamkeitsdatum und Ablauf- oder Prüfdatum']],
      ['4 · Ausführung und Abschluss', ['Opake technische Protokollreferenz', 'Kontrolliertes Ergebnis und Abweichungen', 'Entzugs- oder Rücknahmereferenz', 'Abschlussnachweis ausserhalb des öffentlichen Bundles']]
    ],
    statesTitle: 'Sechs Kandidatenzustände des Registers',
    states: ['Entwurf', 'Zu validieren', 'Autorisiert', 'Angewendet', 'Entzogen oder abgelaufen', 'Abgelehnt'],
    status: 'BESTÄTIGT · Leeres Dokumentationsregister als V1.0 übernommen. Kein aktives Formular, Inhaber, Konto, Recht, C3/C4/C5-Zugriff, Entscheid, technisches Protokoll oder Produktionsänderung.',
    next: 'Tore AUT-02-02-007 als V1.0 bestätigt; Entscheidblatt AUT-02-02-008 als V0.1 vorbereitet.',
    boundary: 'Diese Vorlage ist weder ein operatives Register noch ein Berechtigungsnachweis. Jeder künftige Eintrag muss getrennt autorisiert, ausserhalb des öffentlichen Bundles geschützt und mit kontrollierten Nachweisen verknüpft werden.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessRegister = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  const CounterIcons = [ClipboardList, ShieldCheck, AlertTriangle, LockKeyhole];

  return (
    <section data-testid="ref01-g1-least-privilege-access-register" className="mt-4 rounded-md border border-violet-800/70 bg-violet-950/10 p-1 sm:p-4">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><ClipboardList className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = CounterIcons[index]; return <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="break-words text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className="shrink-0 text-violet-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-006 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-access-register-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-violet-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.statesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.states.map(state => <span key={state} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{state}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-rose-800/70 bg-rose-950/20 p-3 text-xs font-semibold leading-5 text-rose-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><KeyRound className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessRegister;
