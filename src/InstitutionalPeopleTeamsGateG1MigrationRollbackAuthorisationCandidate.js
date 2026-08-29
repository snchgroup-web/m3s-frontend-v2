import React from 'react';
import { AlertTriangle, LockKeyhole, Undo2 } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'AUTORISATION UNITAIRE CANDIDATE · REF-01-G1-AUT-02-04-001 · V0.1 · 29-08-2026',
    title: 'Cadrer une migration synthétique et son retour arrière avant toute exécution',
    intro: 'AUT-02-01-001 V1.0 confirme la première structure de la vague. Cette deuxième fiche prépare séparément la migration et le rollback, sans source réelle, environnement ouvert ni commande exécutable.',
    counters: [['Champs structurés', '11/11', 'Valeurs candidates ou ouvertes'], ['Valeurs à compléter', '8', 'Sept ouvertes · une à confirmer'], ['Autorisation d’exécution', '0', 'Décision distincte requise'], ['Migrations lancées', '0', 'Aucun système ouvert']],
    labels: { value: 'Valeur candidate', status: 'Statut', proof: 'Preuve exigée' },
    groups: [
      ['Identité et périmètre', [
        ['Objet', 'Répéter une migration et son retour arrière sur schéma et données strictement synthétiques', 'PROPOSÉ', 'Fiche confirmée et objectif borné'],
        ['Source synthétique', 'À désigner · aucune source réelle', 'OUVERT', 'Identifiant, version, propriétaire et inventaire'],
        ['Cible isolée', 'À désigner · hors production', 'OUVERT', 'Identifiant, propriétaire, isolement et extinction']
      ]],
      ['Responsabilités et protection', [
        ['Fonction pilote', 'IT & Support · candidat', 'À CONFIRMER', 'Responsable fonctionnel et délégation'],
        ['Titulaire d’exécution', 'À désigner', 'OUVERT', 'Identité autorisée et moindre privilège'],
        ['Point de retour', 'Sauvegarde synthétique vérifiée avant migration', 'PROPOSÉ', 'Empreinte, horodatage et contrôle de restauration']
      ]],
      ['Scénario et contrôle', [
        ['Paquet de migration', 'À préparer puis confirmer', 'OUVERT', 'Version, commandes non secrètes, dépendances et revue'],
        ['Séquence', 'Contrôler, migrer, rapprocher, revenir en arrière puis recontrôler', 'PROPOSÉ', 'Procédure versionnée et journal horodaté'],
        ['Déclencheur de rollback', 'À proposer puis confirmer', 'OUVERT', 'Seuils mesurables, décisionnaire et arrêt automatique']
      ]],
      ['Mesure et preuve', [
        ['Fenêtre et durée', 'À proposer puis confirmer', 'OUVERT', 'Début, fin, durée maximale et répétition autorisée'],
        ['Dépôt de preuve', 'Emplacement GED à désigner', 'OUVERT', 'Chemin gouverné, inventaire, journaux, résultats et clôture']
      ]]
    ],
    verdict: 'CANDIDAT · La fiche structure onze champs mais ne constitue ni une autorisation de migration ni une procédure exécutable.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-04-001 V0.1.',
    boundary: 'Une confirmation validera uniquement cette structure documentaire. Source, cible, titulaire, commandes, seuils, durée et exécution resteront soumis à des décisions séparées.'
  },
  EN: {
    eyebrow: 'CANDIDATE INDIVIDUAL AUTHORISATION · REF-01-G1-AUT-02-04-001 · V0.1 · 29 AUG 2026',
    title: 'Frame a synthetic migration and rollback before any execution',
    intro: 'AUT-02-01-001 V1.0 confirms the first wave structure. This second sheet separately prepares migration and rollback without a real source, open environment or executable command.',
    counters: [['Structured fields', '11/11', 'Candidate or open values'], ['Values to complete', '8', 'Seven open · one to confirm'], ['Execution authorisation', '0', 'Separate decision required'], ['Started migrations', '0', 'No system opened']],
    labels: { value: 'Candidate value', status: 'Status', proof: 'Required evidence' },
    groups: [
      ['Identity and scope', [['Purpose', 'Rehearse a migration and its rollback on strictly synthetic schema and data', 'PROPOSED', 'Confirmed sheet and bounded objective'], ['Synthetic source', 'To designate · no real source', 'OPEN', 'Identifier, version, owner and inventory'], ['Isolated target', 'To designate · outside production', 'OPEN', 'Identifier, owner, isolation and shutdown']]],
      ['Responsibilities and protection', [['Lead function', 'IT & Support · candidate', 'TO CONFIRM', 'Functional owner and delegation'], ['Execution holder', 'To designate', 'OPEN', 'Authorised identity and least privilege'], ['Restore point', 'Verified synthetic backup before migration', 'PROPOSED', 'Fingerprint, timestamp and restoration control']]],
      ['Scenario and control', [['Migration package', 'To prepare and then confirm', 'OPEN', 'Version, non-secret commands, dependencies and review'], ['Sequence', 'Control, migrate, reconcile, roll back, then control again', 'PROPOSED', 'Versioned procedure and timestamped log'], ['Rollback trigger', 'To propose and then confirm', 'OPEN', 'Measurable thresholds, decision maker and automatic stop']]],
      ['Measurement and evidence', [['Window and duration', 'To propose and then confirm', 'OPEN', 'Start, end, maximum duration and authorised repetition'], ['Evidence deposit', 'DMS location to designate', 'OPEN', 'Governed path, inventory, logs, results and closure']]]
    ],
    verdict: 'CANDIDATE · The sheet structures eleven fields but is neither a migration authorisation nor an executable procedure.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-04-001 V0.1.',
    boundary: 'Confirmation will validate this documentary structure only. Source, target, holder, commands, thresholds, duration and execution remain subject to separate decisions.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR EINZELAUTORISIERUNG · REF-01-G1-AUT-02-04-001 · V0.1 · 29.08.2026',
    title: 'Synthetische Migration und Rollback vor jeder Ausführung abgrenzen',
    intro: 'AUT-02-01-001 V1.0 bestätigt die erste Wellenstruktur. Dieses zweite Blatt bereitet Migration und Rollback getrennt vor, ohne Realquelle, offene Umgebung oder ausführbaren Befehl.',
    counters: [['Strukturierte Felder', '11/11', 'Kandidaten- oder offene Werte'], ['Zu ergänzende Werte', '8', 'Sieben offen · einer zu bestätigen'], ['Ausführungsautorisierung', '0', 'Getrennter Entscheid nötig'], ['Gestartete Migrationen', '0', 'Kein System geöffnet']],
    labels: { value: 'Kandidatenwert', status: 'Status', proof: 'Erforderlicher Nachweis' },
    groups: [
      ['Identität und Umfang', [['Zweck', 'Migration und Rollback mit strikt synthetischem Schema und Daten wiederholen', 'VORGESCHLAGEN', 'Bestätigtes Blatt und begrenztes Ziel'], ['Synthetische Quelle', 'Zu bestimmen · keine Realquelle', 'OFFEN', 'Kennung, Version, Eigentümer und Inventar'], ['Isoliertes Ziel', 'Zu bestimmen · ausserhalb Produktion', 'OFFEN', 'Kennung, Eigentümer, Isolation und Abschaltung']]],
      ['Verantwortung und Schutz', [['Federführende Funktion', 'IT & Support · Kandidat', 'ZU BESTÄTIGEN', 'Funktionseigentümer und Delegation'], ['Ausführungsträger', 'Zu bestimmen', 'OFFEN', 'Autorisierte Identität und geringste Berechtigung'], ['Rückkehrpunkt', 'Geprüfte synthetische Sicherung vor der Migration', 'VORGESCHLAGEN', 'Fingerabdruck, Zeitstempel und Wiederherstellungskontrolle']]],
      ['Szenario und Kontrolle', [['Migrationspaket', 'Vorzubereiten und danach zu bestätigen', 'OFFEN', 'Version, nicht geheime Befehle, Abhängigkeiten und Prüfung'], ['Ablauf', 'Prüfen, migrieren, abgleichen, zurückrollen und erneut prüfen', 'VORGESCHLAGEN', 'Versioniertes Verfahren und Zeitprotokoll'], ['Rollback-Auslöser', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Messbare Schwellen, Entscheidungsträger und automatischer Stopp']]],
      ['Messung und Nachweis', [['Fenster und Dauer', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Beginn, Ende, Höchstdauer und erlaubte Wiederholung'], ['Nachweisablage', 'DMS-Ort zu bestimmen', 'OFFEN', 'Gesteuerter Pfad, Inventar, Journale, Ergebnisse und Abschluss']]]
    ],
    verdict: 'KANDIDAT · Das Blatt strukturiert elf Felder, ist aber weder Migrationsautorisierung noch ausführbares Verfahren.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-04-001 V0.1 bestätigen oder ändern.',
    boundary: 'Eine Bestätigung validiert nur diese Dokumentstruktur. Quelle, Ziel, Träger, Befehle, Schwellen, Dauer und Ausführung bleiben getrennten Entscheiden unterstellt.'
  }
};

const InstitutionalPeopleTeamsGateG1MigrationRollbackAuthorisationCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-02-04-001" data-testid="ref01-g1-migration-rollback-authorisation-candidate" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-02-04-001-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-02-04-001-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Undo2 className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([group, fields]) => <article key={group} className="m3s-raised min-w-0 p-3 sm:p-4"><h6 className="text-sm font-semibold text-violet-100">{group}</h6><div className="mt-3 space-y-3">{fields.map(([field, value, status, proof]) => <dl key={field} data-testid="ref01-g1-migration-rollback-authorisation-field" className="rounded-md border border-slate-700/70 bg-slate-950/20 p-3 text-xs leading-5"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><dt className="font-semibold text-slate-100">{field}</dt><dd className="text-xs font-semibold text-amber-200">{status}</dd></div><div className="mt-2"><dt className="font-semibold text-sky-300">{t.labels.value}</dt><dd className="mt-1 break-words text-slate-300">{value}</dd></div><div className="mt-2"><dt className="font-semibold text-emerald-300">{t.labels.proof}</dt><dd className="mt-1 break-words text-slate-300">{proof}</dd></div></dl>)}</div></article>)}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1MigrationRollbackAuthorisationCandidate;
