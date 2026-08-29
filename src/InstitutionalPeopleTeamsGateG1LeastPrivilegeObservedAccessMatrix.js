import React from 'react';
import { AlertTriangle, Eye, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'DROITS TESTÉS ET REFUS · MATRICE CONFIRMÉE V1.0 · 29-08-2026',
    title: 'Distinguer le comportement testé de tout droit réel',
    intro: 'Cette matrice s’appuie sur le contrat candidat RH-001 du lot L1 isolé et ses tests synthétiques locaux. Elle qualifie une future lecture C2, les refus 401/403 et ce qui n’est pas ouvert, sans présenter ces résultats comme un comportement de production.',
    counters: [['Tests synthétiques', '3/3', '200 Utilisateur · 401 · 403 Auditeur'], ['Champs projetés', '8', 'Contrat candidat C2 assaini'], ['Lignes de fixture', '6', 'Jeu documentaire, pas un total global'], ['Droits modifiés', '0', 'Qualification documentaire seulement']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['1 · Contexte de contrôle', ['Fondations L1 isolées, non raccordées', 'Route candidate : GET /api/members-directory', 'Rôles candidats : Admin et Utilisateur · alias Manager vers Admin', 'Tests : Utilisateur autorisé · Auditeur refusé']],
      ['2 · Lecture synthétique', ['Action candidate : lecture seule', 'Réponse 200 dans le test local autorisé', 'Huit champs projetés et assainis', 'Six lignes dans la fixture C2']],
      ['3 · Refus et non-ouvertures', ['401 testé sans authentification', '403 testé avec le rôle Auditeur', 'Aucun endpoint d’écriture ouvert dans L1', 'Aucune donnée C3/C4/C5 dans le contrat']],
      ['4 · Preuve et revue', ['Contrat candidat API RH-001', 'Tests synthétiques locaux du 31-07-2026', 'Journalisation requise avant activation', 'Vérification de production encore requise']]
    ],
    rulesTitle: 'Cinq règles candidates de lecture des accès',
    rules: ['Authentification explicite', 'Rôles autorisés explicitement', 'Lecture C2 seulement si elle est activée', 'Décision séparée pour écriture ou C3/C4/C5', 'Refus par défaut hors périmètre'],
    status: 'CONFIRMÉ · Matrice de qualification du contrat L1 et de ses tests synthétiques retenue en V1.0. Zéro compte, attribution, retrait, délégation, exception, accès C3/C4/C5 ou modification de production.',
    next: 'Protocole AUT-02-02-005 et registre AUT-02-02-006 confirmés en V1.0 ; portes AUT-02-02-007 préparées en V0.1.',
    boundary: 'Les codes 200, 401 et 403 proviennent ici du handler testé localement avec une fixture synthétique. Ils ne prouvent ni un déploiement ni une autorisation de production ; toute activation exigera une décision séparée, un périmètre explicite et une preuve protégée.'
  },
  EN: {
    eyebrow: 'TESTED RIGHTS AND DENIALS · V1.0 CONFIRMED MATRIX · 29 AUG 2026',
    title: 'Separate tested behaviour from any real right',
    intro: 'This matrix relies on the isolated L1 candidate RH-001 contract and its local synthetic tests. It qualifies future C2 reading, 401/403 denials and what is not opened without presenting those results as production behaviour.',
    counters: [['Synthetic tests', '3/3', '200 User · 401 · 403 Auditor'], ['Projected fields', '8', 'Sanitised candidate C2 contract'], ['Fixture rows', '6', 'Documentary set, not a global total'], ['Changed rights', '0', 'Documentary qualification only']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Control context', ['Isolated L1 foundations, not wired in', 'Candidate route: GET /api/members-directory', 'Candidate roles: Admin and User · Manager alias to Admin', 'Tests: User allowed · Auditor denied']],
      ['2 · Synthetic reading', ['Candidate action: read only', '200 response in the authorised local test', 'Eight projected sanitised fields', 'Six rows in the C2 fixture']],
      ['3 · Denials and unopened paths', ['401 tested without authentication', '403 tested with the Auditor role', 'No write endpoint opened in L1', 'No C3/C4/C5 data in the contract']],
      ['4 · Evidence and review', ['Candidate RH-001 API contract', 'Local synthetic tests dated 31 Jul 2026', 'Logging required before activation', 'Production verification still required']]
    ],
    rulesTitle: 'Five candidate access-reading rules',
    rules: ['Explicit authentication', 'Explicitly allowed roles', 'C2 reading only if activated', 'Separate decision for writes or C3/C4/C5', 'Default denial outside scope'],
    status: 'CONFIRMED · Qualification matrix for the L1 contract and its synthetic tests retained as V1.0. Zero account, assignment, withdrawal, delegation, exception, C3/C4/C5 access or production change.',
    next: 'AUT-02-02-005 protocol and AUT-02-02-006 register confirmed as V1.0; AUT-02-02-007 gates prepared as V0.1.',
    boundary: 'The 200, 401 and 403 statuses come from the locally tested handler with a synthetic fixture. They prove neither deployment nor production authorisation; any activation requires a separate decision, explicit scope and protected evidence.'
  },
  DE: {
    eyebrow: 'GETESTETE RECHTE UND ABLEHNUNGEN · BESTÄTIGTE MATRIX V1.0 · 29.08.2026',
    title: 'Getestetes Verhalten von jedem realen Recht trennen',
    intro: 'Diese Matrix stützt sich auf den isolierten RH-001-Kandidatenvertrag des L1-Loses und seine lokalen synthetischen Tests. Sie qualifiziert künftiges C2-Lesen, 401/403-Ablehnungen und nicht geöffnete Wege, ohne diese Ergebnisse als Produktionsverhalten darzustellen.',
    counters: [['Synthetische Tests', '3/3', '200 Benutzer · 401 · 403 Auditor'], ['Projizierte Felder', '8', 'Bereinigter C2-Kandidatenvertrag'], ['Fixture-Zeilen', '6', 'Dokumentationssatz, keine Gesamtsumme'], ['Geänderte Rechte', '0', 'Nur dokumentarische Qualifikation']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Kontrollkontext', ['Isolierte L1-Grundlagen, nicht angebunden', 'Kandidatenroute: GET /api/members-directory', 'Kandidatenrollen: Admin und Benutzer · Manager-Alias zu Admin', 'Tests: Benutzer erlaubt · Auditor abgelehnt']],
      ['2 · Synthetisches Lesen', ['Kandidatenaktion: nur Lesen', 'Antwort 200 im autorisierten lokalen Test', 'Acht projizierte bereinigte Felder', 'Sechs Zeilen in der C2-Fixture']],
      ['3 · Ablehnungen und ungeöffnete Wege', ['401 ohne Authentifizierung getestet', '403 mit der Rolle Auditor getestet', 'Kein Schreibendpunkt in L1 geöffnet', 'Keine C3/C4/C5-Daten im Vertrag']],
      ['4 · Nachweis und Prüfung', ['RH-001-API-Kandidatenvertrag', 'Lokale synthetische Tests vom 31.07.2026', 'Protokollierung vor Aktivierung erforderlich', 'Produktionsprüfung weiterhin erforderlich']]
    ],
    rulesTitle: 'Fünf Kandidatenregeln zur Zugriffslektüre',
    rules: ['Explizite Authentifizierung', 'Explizit zugelassene Rollen', 'C2-Lesen nur bei Aktivierung', 'Getrennter Entscheid für Schreiben oder C3/C4/C5', 'Standardablehnung ausserhalb des Umfangs'],
    status: 'BESTÄTIGT · Qualifikationsmatrix für den L1-Vertrag und seine synthetischen Tests als V1.0 festgehalten. Null Konten, Zuweisungen, Entzüge, Delegationen, Ausnahmen, C3/C4/C5-Zugriffe oder Produktionsänderungen.',
    next: 'Protokoll AUT-02-02-005 und Register AUT-02-02-006 als V1.0 bestätigt; Tore AUT-02-02-007 als V0.1 vorbereitet.',
    boundary: 'Die Statuscodes 200, 401 und 403 stammen aus dem lokal getesteten Handler mit synthetischer Fixture. Sie belegen weder Bereitstellung noch Produktionsautorisierung; jede Aktivierung erfordert einen getrennten Entscheid, expliziten Umfang und geschützte Nachweise.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeObservedAccessMatrix = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-observed-access-matrix" className="mt-5 rounded-md border border-cyan-800/70 bg-cyan-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><Eye className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? ShieldCheck : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-004 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-observed-access-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-cyan-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-violet-800/70 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeObservedAccessMatrix;
