import React from 'react';
import { AlertTriangle, Eye, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'DROITS OBSERVÉS ET REFUS · MATRICE CANDIDATE V0.1 · 28-08-2026',
    title: 'Distinguer le droit constaté, le refus et ce qui reste fermé',
    intro: 'Cette matrice s’appuie uniquement sur le contrat API RH-001 et les comportements déjà observés. Elle documente la lecture C2 autorisée, les refus 401/403 et les fermetures sans attribuer, retirer ni étendre un droit réel.',
    counters: [['Scénarios qualifiés', '4/4', 'Lecture · 401 · 403 · écriture fermée'], ['Champs exposés', '8', 'Annuaire C2 assaini'], ['Lignes observées', '6', 'Périmètre contrôlé, pas un total global'], ['Droits modifiés', '0', 'Qualification documentaire seulement']],
    badge: 'CANDIDAT · À CONFIRMER',
    groups: [
      ['1 · Contexte de contrôle', ['Objet : annuaire interne C2', 'Route : GET /api/members-directory', 'Rôle canonique observé : Admin', 'Rôle source historique : Manager vers Admin']],
      ['2 · Lecture effective', ['Action : lecture seule', 'Réponse 200 avec permission', 'Huit champs assainis', 'Six lignes C2 observées']],
      ['3 · Refus et fermetures', ['401 sans authentification', '403 authentifié sans permission', 'Toutes les écritures fermées', 'C4/C5 fermés même pour Admin']],
      ['4 · Preuve et revue', ['Contrat API RH-001', 'Tests de production du 31-07-2026', 'Journalisation requise', 'Revue avant toute extension']]
    ],
    rulesTitle: 'Cinq règles candidates de lecture des accès',
    rules: ['Authentification explicite', 'Permission explicite', 'Lecture seule limitée au C2', 'Décision séparée pour C4/C5', 'Refus par défaut hors périmètre'],
    status: 'CANDIDAT · Matrice de qualification des comportements observés. Zéro compte, attribution, retrait, délégation, exception, accès C3/C4/C5 ou modification de production.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-02-004 V0.1.',
    boundary: 'Un code 200, 401 ou 403 constitue ici une preuve technique bornée, pas une autorisation institutionnelle générale. Toute extension exigera une décision séparée, un périmètre explicite et une preuve hors bundle public.'
  },
  EN: {
    eyebrow: 'OBSERVED RIGHTS AND DENIALS · V0.1 CANDIDATE MATRIX · 28 AUG 2026',
    title: 'Separate the observed right, the denial and what remains closed',
    intro: 'This matrix relies only on the RH-001 API contract and already observed behaviours. It documents authorised C2 reading, 401/403 denials and closures without assigning, withdrawing or extending a real right.',
    counters: [['Qualified scenarios', '4/4', 'Read · 401 · 403 · write closed'], ['Exposed fields', '8', 'Sanitised C2 directory'], ['Observed rows', '6', 'Controlled scope, not a global total'], ['Changed rights', '0', 'Documentary qualification only']],
    badge: 'CANDIDATE · TO CONFIRM',
    groups: [
      ['1 · Control context', ['Object: internal C2 directory', 'Route: GET /api/members-directory', 'Observed canonical role: Admin', 'Historical source role: Manager to Admin']],
      ['2 · Effective reading', ['Action: read only', '200 response with permission', 'Eight sanitised fields', 'Six observed C2 rows']],
      ['3 · Denials and closures', ['401 without authentication', '403 authenticated without permission', 'All writes closed', 'C4/C5 closed even to Admin']],
      ['4 · Evidence and review', ['RH-001 API contract', 'Production tests dated 31 Jul 2026', 'Logging required', 'Review before any extension']]
    ],
    rulesTitle: 'Five candidate access-reading rules',
    rules: ['Explicit authentication', 'Explicit permission', 'Read only and limited to C2', 'Separate decision for C4/C5', 'Default denial outside scope'],
    status: 'CANDIDATE · Qualification matrix for observed behaviours. Zero account, assignment, withdrawal, delegation, exception, C3/C4/C5 access or production change.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-02-004 V0.1.',
    boundary: 'A 200, 401 or 403 status is bounded technical evidence here, not a general institutional authorisation. Any extension will require a separate decision, an explicit scope and evidence outside the public bundle.'
  },
  DE: {
    eyebrow: 'BEOBACHTETE RECHTE UND ABLEHNUNGEN · KANDIDATENMATRIX V0.1 · 28.08.2026',
    title: 'Beobachtetes Recht, Ablehnung und geschlossene Bereiche trennen',
    intro: 'Diese Matrix stützt sich nur auf den RH-001-API-Vertrag und bereits beobachtete Verhaltensweisen. Sie dokumentiert erlaubtes C2-Lesen, 401/403-Ablehnungen und Sperren, ohne ein reales Recht zuzuweisen, zu entziehen oder zu erweitern.',
    counters: [['Qualifizierte Szenarien', '4/4', 'Lesen · 401 · 403 · Schreiben gesperrt'], ['Offengelegte Felder', '8', 'Bereinigtes C2-Verzeichnis'], ['Beobachtete Zeilen', '6', 'Kontrollierter Umfang, keine Gesamtsumme'], ['Geänderte Rechte', '0', 'Nur dokumentarische Qualifikation']],
    badge: 'KANDIDAT · ZU BESTÄTIGEN',
    groups: [
      ['1 · Kontrollkontext', ['Objekt: internes C2-Verzeichnis', 'Route: GET /api/members-directory', 'Beobachtete kanonische Rolle: Admin', 'Historische Quellrolle: Manager zu Admin']],
      ['2 · Wirksames Lesen', ['Aktion: nur Lesen', 'Antwort 200 mit Berechtigung', 'Acht bereinigte Felder', 'Sechs beobachtete C2-Zeilen']],
      ['3 · Ablehnungen und Sperren', ['401 ohne Authentifizierung', '403 authentifiziert ohne Berechtigung', 'Alle Schreibwege gesperrt', 'C4/C5 auch für Admin gesperrt']],
      ['4 · Nachweis und Prüfung', ['RH-001-API-Vertrag', 'Produktionstests vom 31.07.2026', 'Protokollierung erforderlich', 'Prüfung vor jeder Erweiterung']]
    ],
    rulesTitle: 'Fünf Kandidatenregeln zur Zugriffslektüre',
    rules: ['Explizite Authentifizierung', 'Explizite Berechtigung', 'Nur Lesen und auf C2 begrenzt', 'Getrennter Entscheid für C4/C5', 'Standardablehnung ausserhalb des Umfangs'],
    status: 'KANDIDAT · Qualifikationsmatrix für beobachtete Verhaltensweisen. Null Konten, Zuweisungen, Entzüge, Delegationen, Ausnahmen, C3/C4/C5-Zugriffe oder Produktionsänderungen.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-02-004 V0.1 bestätigen oder ändern.',
    boundary: 'Ein Status 200, 401 oder 403 ist hier ein begrenzter technischer Nachweis, keine allgemeine institutionelle Autorisierung. Jede Erweiterung erfordert einen getrennten Entscheid, einen expliziten Umfang und Nachweise ausserhalb des öffentlichen Bundles.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeObservedAccessMatrix = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-observed-access-matrix" className="mt-5 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><Eye className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? ShieldCheck : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-004 · V0.1</h6><span className="rounded-md border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-[10px] font-semibold text-amber-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-observed-access-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-violet-800/70 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeObservedAccessMatrix;
