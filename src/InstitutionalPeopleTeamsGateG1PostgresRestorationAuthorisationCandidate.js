import React from 'react';
import { AlertTriangle, DatabaseBackup, LockKeyhole } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'AUTORISATION UNITAIRE CANDIDATE · REF-01-G1-AUT-02-01-001 · V0.1 · 29-08-2026',
    title: 'Cadrer PostgreSQL et la restauration synthétique avant toute désignation',
    intro: 'WAV-003 V1.0 permet de préparer cette fiche documentaire. Elle définit les champs à compléter et les arrêts obligatoires, sans choisir de service ni ouvrir un environnement.',
    counters: [['Champs structurés', '11/11', 'Valeurs candidates ou ouvertes'], ['Valeurs à désigner', '6', 'Aucune invention'], ['Autorisation d’exécution', '0', 'Décision distincte requise'], ['Tests lancés', '0', 'Aucun environnement ouvert']],
    labels: { value: 'Valeur candidate', status: 'Statut', proof: 'Preuve exigée' },
    groups: [
      ['Identité et périmètre', [
        ['Objet', 'Sauvegarde et restauration PostgreSQL sur données strictement synthétiques', 'PROPOSÉ', 'Fiche confirmée et objectif borné'],
        ['Service ou scénario', 'À désigner', 'OUVERT', 'Nom, propriétaire et documentation officielle'],
        ['Environnement isolé', 'À désigner · hors production', 'OUVERT', 'Identifiant, propriétaire, isolement et procédure d’extinction']
      ]],
      ['Responsabilités et données', [
        ['Fonction pilote', 'IT & Support · candidat', 'À CONFIRMER', 'Responsable fonctionnel et délégation'],
        ['Titulaire d’exécution', 'À désigner', 'OUVERT', 'Identité autorisée et moindre privilège'],
        ['Jeu de données', 'Strictement synthétique · aucune donnée personnelle réelle', 'PROPOSÉ', 'Inventaire et contrôle de non-réalité']
      ]],
      ['Scénario et mesure', [
        ['Séquence', 'Créer la sauvegarde, restaurer, contrôler puis revenir à l’état initial', 'PROPOSÉ', 'Procédure versionnée et journal horodaté'],
        ['RPO / RTO', 'À proposer puis confirmer', 'OUVERT', 'Définitions, unités, seuils et méthode de mesure'],
        ['Fenêtre et durée', 'À proposer puis confirmer', 'OUVERT', 'Début, fin, durée maximale et arrêt automatique']
      ]],
      ['Contrôle et preuve', [
        ['Critères d’arrêt', 'Toute ressource réelle, secret, donnée réelle, perte d’isolement ou écart non maîtrisé', 'PROPOSÉ', 'Checklist signée et mécanisme d’arrêt'],
        ['Dépôt de preuve', 'Emplacement GED à désigner', 'OUVERT', 'Chemin gouverné, index, journal, résultats et décision de clôture']
      ]]
    ],
    verdict: 'CANDIDAT · La fiche structure onze champs mais ne constitue ni une autorisation de test ni une spécification technique complète.',
    next: 'Prochain arbitrage humain : confirmer ou amender REF-01-G1-AUT-02-01-001 V0.1.',
    boundary: 'Une confirmation validera uniquement cette structure documentaire. Le service, l’environnement, le titulaire, les seuils et l’exécution resteront soumis à des décisions séparées.'
  },
  EN: {
    eyebrow: 'CANDIDATE INDIVIDUAL AUTHORISATION · REF-01-G1-AUT-02-01-001 · V0.1 · 29 AUG 2026',
    title: 'Frame PostgreSQL and synthetic restoration before any designation',
    intro: 'WAV-003 V1.0 permits preparation of this documentary sheet. It defines fields to complete and mandatory stops without selecting a service or opening an environment.',
    counters: [['Structured fields', '11/11', 'Candidate or open values'], ['Values to designate', '6', 'No invention'], ['Execution authorisation', '0', 'Separate decision required'], ['Started tests', '0', 'No environment opened']],
    labels: { value: 'Candidate value', status: 'Status', proof: 'Required evidence' },
    groups: [
      ['Identity and scope', [['Purpose', 'PostgreSQL backup and restoration using strictly synthetic data', 'PROPOSED', 'Confirmed sheet and bounded objective'], ['Service or scenario', 'To designate', 'OPEN', 'Name, owner and official documentation'], ['Isolated environment', 'To designate · outside production', 'OPEN', 'Identifier, owner, isolation and shutdown procedure']]],
      ['Responsibilities and data', [['Lead function', 'IT & Support · candidate', 'TO CONFIRM', 'Functional owner and delegation'], ['Execution holder', 'To designate', 'OPEN', 'Authorised identity and least privilege'], ['Dataset', 'Strictly synthetic · no real personal data', 'PROPOSED', 'Inventory and non-reality control']]],
      ['Scenario and measurement', [['Sequence', 'Create backup, restore, control, then return to initial state', 'PROPOSED', 'Versioned procedure and timestamped log'], ['RPO / RTO', 'To propose and then confirm', 'OPEN', 'Definitions, units, thresholds and measurement method'], ['Window and duration', 'To propose and then confirm', 'OPEN', 'Start, end, maximum duration and automatic stop']]],
      ['Control and evidence', [['Stop criteria', 'Any real resource, secret, real data, loss of isolation or uncontrolled gap', 'PROPOSED', 'Signed checklist and stop mechanism'], ['Evidence deposit', 'DMS location to designate', 'OPEN', 'Governed path, index, log, results and closure decision']]]
    ],
    verdict: 'CANDIDATE · The sheet structures eleven fields but is neither a test authorisation nor a complete technical specification.',
    next: 'Next human decision: confirm or amend REF-01-G1-AUT-02-01-001 V0.1.',
    boundary: 'Confirmation will validate this documentary structure only. Service, environment, holder, thresholds and execution remain subject to separate decisions.'
  },
  DE: {
    eyebrow: 'KANDIDAT FÜR EINZELAUTORISIERUNG · REF-01-G1-AUT-02-01-001 · V0.1 · 29.08.2026',
    title: 'PostgreSQL und synthetische Wiederherstellung vor jeder Bestimmung abgrenzen',
    intro: 'WAV-003 V1.0 erlaubt die Vorbereitung dieses Dokumentblatts. Es definiert auszufüllende Felder und obligatorische Stopps, ohne Dienstwahl oder Umgebungsöffnung.',
    counters: [['Strukturierte Felder', '11/11', 'Kandidaten- oder offene Werte'], ['Zu bestimmende Werte', '6', 'Keine Erfindung'], ['Ausführungsautorisierung', '0', 'Getrennter Entscheid nötig'], ['Gestartete Prüfungen', '0', 'Keine Umgebung geöffnet']],
    labels: { value: 'Kandidatenwert', status: 'Status', proof: 'Erforderlicher Nachweis' },
    groups: [
      ['Identität und Umfang', [['Zweck', 'PostgreSQL-Sicherung und -Wiederherstellung mit strikt synthetischen Daten', 'VORGESCHLAGEN', 'Bestätigtes Blatt und begrenztes Ziel'], ['Dienst oder Szenario', 'Zu bestimmen', 'OFFEN', 'Name, Eigentümer und offizielle Dokumentation'], ['Isolierte Umgebung', 'Zu bestimmen · ausserhalb Produktion', 'OFFEN', 'Kennung, Eigentümer, Isolation und Abschaltverfahren']]],
      ['Verantwortung und Daten', [['Federführende Funktion', 'IT & Support · Kandidat', 'ZU BESTÄTIGEN', 'Funktionseigentümer und Delegation'], ['Ausführungsträger', 'Zu bestimmen', 'OFFEN', 'Autorisierte Identität und geringste Berechtigung'], ['Datensatz', 'Strikt synthetisch · keine realen Personendaten', 'VORGESCHLAGEN', 'Inventar und Kontrolle auf Nichtrealität']]],
      ['Szenario und Messung', [['Ablauf', 'Sicherung erstellen, wiederherstellen, prüfen und zum Ausgangszustand zurückkehren', 'VORGESCHLAGEN', 'Versioniertes Verfahren und Zeitprotokoll'], ['RPO / RTO', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Definitionen, Einheiten, Schwellen und Messmethode'], ['Fenster und Dauer', 'Vorzuschlagen und danach zu bestätigen', 'OFFEN', 'Beginn, Ende, Höchstdauer und automatischer Stopp']]],
      ['Kontrolle und Nachweis', [['Stoppkriterien', 'Jede reale Ressource, Geheimnis, reale Daten, Isolationsverlust oder unkontrollierte Abweichung', 'VORGESCHLAGEN', 'Unterzeichnete Checkliste und Stoppmechanismus'], ['Nachweisablage', 'DMS-Ort zu bestimmen', 'OFFEN', 'Gesteuerter Pfad, Index, Journal, Ergebnisse und Abschlussentscheid']]]
    ],
    verdict: 'KANDIDAT · Das Blatt strukturiert elf Felder, ist aber weder Prüfautorisierung noch vollständige technische Spezifikation.',
    next: 'Nächster menschlicher Entscheid: REF-01-G1-AUT-02-01-001 V0.1 bestätigen oder ändern.',
    boundary: 'Eine Bestätigung validiert nur diese Dokumentstruktur. Dienst, Umgebung, Träger, Schwellen und Ausführung bleiben getrennten Entscheiden unterstellt.'
  }
};

const InstitutionalPeopleTeamsGateG1PostgresRestorationAuthorisationCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-02-01-001" data-testid="ref01-g1-postgres-authorisation-candidate" className="mt-5 scroll-mt-24 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-02-01-001-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-violet-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-02-01-001-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><DatabaseBackup className="shrink-0 text-violet-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note]) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([group, fields]) => <article key={group} className="m3s-raised min-w-0 p-3 sm:p-4"><h6 className="text-sm font-semibold text-violet-100">{group}</h6><div className="mt-3 space-y-3">{fields.map(([field, value, status, proof]) => <dl key={field} data-testid="ref01-g1-postgres-authorisation-field" className="rounded-md border border-slate-700/70 bg-slate-950/20 p-3 text-xs leading-5"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><dt className="font-semibold text-slate-100">{field}</dt><dd className="text-xs font-semibold text-amber-200">{status}</dd></div><div className="mt-2"><dt className="font-semibold text-sky-300">{t.labels.value}</dt><dd className="mt-1 break-words text-slate-300">{value}</dd></div><div className="mt-2"><dt className="font-semibold text-emerald-300">{t.labels.proof}</dt><dd className="mt-1 break-words text-slate-300">{proof}</dd></div></dl>)}</div></article>)}</div>
      <p className="mt-4 rounded-md border border-violet-700/70 bg-violet-950/20 p-3 text-xs font-semibold leading-5 text-violet-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostgresRestorationAuthorisationCandidate;
