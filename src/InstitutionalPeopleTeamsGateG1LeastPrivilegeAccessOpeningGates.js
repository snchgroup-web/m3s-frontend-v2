import React from 'react';
import { AlertTriangle, CheckSquare2, FileKey2, LockKeyhole, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'PORTES D’OUVERTURE D’UNE HABILITATION · V1.0 CONFIRMÉE · 29-08-2026',
    title: 'Contrôler l’admissibilité avant toute fiche réelle d’habilitation',
    intro: 'Cette fiche candidate définit six contrôles préalables à l’ouverture documentaire d’une habilitation. Elle ne crée aucun titulaire, compte, droit, accès, journal technique ni changement de production.',
    counters: [['Portes préparées', '6/6', 'Toutes obligatoires'], ['Verdicts proposés', '4', 'Décision humaine distincte'], ['Fiches préremplies', '0', 'Aucune donnée réelle'], ['Droits exécutés', '0', 'Aucune action technique']],
    badge: 'CONFIRMÉ · V1.0',
    labels: { expected: 'Contrôle attendu', evidence: 'Trace minimale', stop: 'Arrêt obligatoire' },
    gates: [
      ['1 · Besoin et demande', 'Documenter un besoin métier explicite et une demande référencée avant toute ouverture.', 'Référence opaque, fonction demandeuse, besoin, objet et justification.', 'Refuser les demandes orales, génériques ou sans propriétaire métier.'],
      ['2 · Titulaire et mandat', 'Qualifier le titulaire par référence opaque, fonction, équipe et mandat contrôlé.', 'Référence institutionnelle opaque, fonction, équipe et preuve de mandat hors bundle public.', 'Aucun nom civil, compte ou mandat nominatif non contrôlé dans REF-01.'],
      ['3 · Droit et périmètre', 'Définir action, objet, classification C1 à C5 et périmètre minimal de lignes et de données.', 'Rôle, action, objet, niveau, filtres et état cible.', 'Arrêter si le droit est plus large que le besoin ou si C3/C4/C5 n’est pas autorisé séparément.'],
      ['4 · Séparation des rôles', 'Distinguer demandeur, propriétaire métier, approbateur et futur exécutant technique.', 'Fonctions responsables et références de décisions distinctes.', 'Aucune auto-approbation, exécution anticipée ou exception implicite.'],
      ['5 · Validité et preuve', 'Fixer effet, expiration ou revue, preuve attendue et dépôt protégé.', 'Dates candidates, déclencheur de revue, référence GED opaque et classification.', 'Aucune durée illimitée, preuve sensible dans le bundle public ou fiche sans échéance.'],
      ['6 · Décision d’ouverture', 'Consigner un verdict humain daté avant de créer une fiche active ou transmettre à IT.', 'Verdict, autorité, date, réserves et prochaine action documentaire.', 'Un accord sur la fiche ne vaut ni création de compte, ni attribution de droit, ni exécution technique.']
    ],
    verdictsTitle: 'Quatre verdicts documentaires proposés',
    verdicts: ['Ouvrir la fiche sous réserve', 'Refuser', 'Demander des éléments', 'Mettre en attente'],
    status: 'CONFIRMÉ · Six portes et quatre verdicts retenus en V1.0. Zéro fiche active, titulaire, compte, droit réel ou exécution.',
    next: 'Suite préparée : la fiche 008 est confirmée en V1.0 ; confirmer ou amender le protocole REF-01-G1-AUT-02-02-009 V0.1.',
    boundary: 'Ces portes contrôlent seulement l’admissibilité documentaire. La première fiche réelle, son stockage protégé et toute exécution technique exigeront des décisions séparées.'
  },
  EN: {
    eyebrow: 'ACCESS-RECORD OPENING GATES · V1.0 CONFIRMED · 29 AUG 2026',
    title: 'Control admissibility before any real access-rights record',
    intro: 'This candidate file defines six controls before the documentary opening of an access right. It creates no holder, account, right, access, technical log or production change.',
    counters: [['Prepared gates', '6/6', 'All mandatory'], ['Proposed outcomes', '4', 'Separate human decision'], ['Prefilled records', '0', 'No real data'], ['Executed rights', '0', 'No technical action']],
    badge: 'CONFIRMED · V1.0',
    labels: { expected: 'Expected control', evidence: 'Minimum trace', stop: 'Mandatory stop' },
    gates: [
      ['1 · Need and request', 'Document an explicit business need and a referenced request before opening anything.', 'Opaque reference, requesting function, need, object and rationale.', 'Reject oral, generic or business-owner-free requests.'],
      ['2 · Holder and mandate', 'Qualify the holder through an opaque reference, function, team and controlled mandate.', 'Opaque institutional reference, function, team and mandate evidence outside the public bundle.', 'No civil name, account or uncontrolled named mandate in REF-01.'],
      ['3 · Right and scope', 'Define action, object, C1 to C5 classification and the minimum row and data scope.', 'Role, action, object, level, filters and target state.', 'Stop when the right exceeds the need or C3/C4/C5 is not separately authorised.'],
      ['4 · Segregation of duties', 'Separate requester, business owner, approver and future technical executor.', 'Responsible functions and separate decision references.', 'No self-approval, early execution or implicit exception.'],
      ['5 · Validity and evidence', 'Set effect, expiry or review, expected evidence and protected repository.', 'Candidate dates, review trigger, opaque DMS reference and classification.', 'No unlimited period, sensitive evidence in the public bundle or record without a deadline.'],
      ['6 · Opening decision', 'Record a dated human outcome before creating an active record or sending anything to IT.', 'Outcome, authority, date, reservations and next documentary action.', 'Approval of the record is not account creation, right assignment or technical execution.']
    ],
    verdictsTitle: 'Four proposed documentary outcomes',
    verdicts: ['Open the record with reservations', 'Reject', 'Request information', 'Place on hold'],
    status: 'CONFIRMED · Six gates and four outcomes retained as V1.0. Zero active records, holders, accounts, real rights or executions.',
    next: 'Prepared next step: sheet 008 is confirmed as V1.0; confirm or amend protocol REF-01-G1-AUT-02-02-009 V0.1.',
    boundary: 'These gates control documentary admissibility only. The first real record, its protected storage and any technical execution will require separate decisions.'
  },
  DE: {
    eyebrow: 'TORE ZUR ERÖFFNUNG EINER BERECHTIGUNG · V1.0 BESTÄTIGT · 29.08.2026',
    title: 'Zulässigkeit vor jedem realen Berechtigungseintrag kontrollieren',
    intro: 'Diese Kandidatenakte definiert sechs Kontrollen vor der dokumentarischen Eröffnung einer Berechtigung. Sie erstellt keinen Inhaber, kein Konto, Recht, keinen Zugriff, kein technisches Protokoll und keine Produktionsänderung.',
    counters: [['Vorbereitete Tore', '6/6', 'Alle obligatorisch'], ['Vorgeschlagene Ergebnisse', '4', 'Getrennter menschlicher Entscheid'], ['Vorausgefüllte Einträge', '0', 'Keine realen Daten'], ['Ausgeführte Rechte', '0', 'Keine technische Aktion']],
    badge: 'BESTÄTIGT · V1.0',
    labels: { expected: 'Erwartete Kontrolle', evidence: 'Mindestspur', stop: 'Pflichtstopp' },
    gates: [
      ['1 · Bedarf und Antrag', 'Vor jeder Eröffnung einen ausdrücklichen Fachbedarf und einen referenzierten Antrag dokumentieren.', 'Opake Referenz, anfragende Funktion, Bedarf, Objekt und Begründung.', 'Mündliche, allgemeine oder Anträge ohne Fachverantwortung ablehnen.'],
      ['2 · Inhaber und Mandat', 'Inhaber durch opake Referenz, Funktion, Team und kontrolliertes Mandat qualifizieren.', 'Opake institutionelle Referenz, Funktion, Team und Mandatsnachweis ausserhalb des öffentlichen Bundles.', 'Kein Zivilname, Konto oder unkontrolliertes Namensmandat in REF-01.'],
      ['3 · Recht und Umfang', 'Aktion, Objekt, Klassifikation C1 bis C5 und minimalen Zeilen- und Datenumfang definieren.', 'Rolle, Aktion, Objekt, Stufe, Filter und Zielstand.', 'Stoppen, wenn das Recht den Bedarf übersteigt oder C3/C4/C5 nicht getrennt autorisiert ist.'],
      ['4 · Funktionstrennung', 'Antragsteller, Fachverantwortung, Genehmiger und künftigen technischen Ausführer trennen.', 'Verantwortliche Funktionen und getrennte Entscheidreferenzen.', 'Keine Selbstgenehmigung, vorgezogene Ausführung oder implizite Ausnahme.'],
      ['5 · Gültigkeit und Nachweis', 'Wirksamkeit, Ablauf oder Prüfung, erwarteten Nachweis und geschütztes Depot festlegen.', 'Kandidatendaten, Prüfauslöser, opake DMS-Referenz und Klassifikation.', 'Keine unbegrenzte Dauer, sensiblen Nachweise im öffentlichen Bundle oder Einträge ohne Frist.'],
      ['6 · Eröffnungsentscheid', 'Vor aktivem Eintrag oder Übergabe an IT ein datiertes menschliches Ergebnis dokumentieren.', 'Ergebnis, Autorität, Datum, Vorbehalte und nächste Dokumentationsaktion.', 'Zustimmung zur Akte ist weder Kontoerstellung noch Rechtezuweisung oder technische Ausführung.']
    ],
    verdictsTitle: 'Vier vorgeschlagene Dokumentationsergebnisse',
    verdicts: ['Eintrag unter Vorbehalt öffnen', 'Ablehnen', 'Angaben anfordern', 'In Wartestellung setzen'],
    status: 'BESTÄTIGT · Sechs Tore und vier Ergebnisse als V1.0 übernommen. Null aktive Einträge, Inhaber, Konten, reale Rechte oder Ausführungen.',
    next: 'Nächster vorbereiteter Schritt: Blatt 008 ist als V1.0 bestätigt; Protokoll REF-01-G1-AUT-02-02-009 V0.1 bestätigen oder ändern.',
    boundary: 'Diese Tore kontrollieren nur die dokumentarische Zulässigkeit. Der erste reale Eintrag, seine geschützte Ablage und jede technische Ausführung erfordern getrennte Entscheide.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessOpeningGates = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;

  return (
    <section data-testid="ref01-g1-least-privilege-access-opening-gates" className="mt-5 rounded-md border border-slate-700 bg-slate-950/25 p-3 sm:p-4">
      <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-cyan-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : index === 2 ? FileKey2 : LockKeyhole; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-cyan-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-007 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.gates.map(([title, expected, evidence, stop]) => <section key={title} data-testid="ref01-g1-least-privilege-access-opening-gate" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-slate-100">{title}</h6><dl className="mt-3 space-y-2 text-xs leading-5"><div><dt className="font-semibold text-cyan-200">{t.labels.expected}</dt><dd className="mt-0.5 text-slate-300">{expected}</dd></div><div><dt className="font-semibold text-emerald-200">{t.labels.evidence}</dt><dd className="mt-0.5 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-amber-200">{t.labels.stop}</dt><dd className="mt-0.5 text-slate-300">{stop}</dd></div></dl></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-violet-200">{t.verdictsTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.verdicts.map(verdict => <span key={verdict} className="rounded-md border border-violet-700/60 bg-violet-950/20 px-2 py-1 text-[11px] font-semibold text-violet-100">{verdict}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-cyan-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessOpeningGates;
