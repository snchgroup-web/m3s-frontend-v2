import React from 'react';
import { AlertTriangle, CheckSquare2, FileCheck2, FileLock2 } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE DE DECISION D OUVERTURE D UNE HABILITATION · V1.0 CONFIRMÉE · 29-08-2026',
    title: 'Documenter le verdict sans créer ni appliquer le droit',
    intro: 'Ce gabarit candidat rassemble la trace des six portes, le verdict humain et les réserves avant toute habilitation réelle. Il ne constitue ni une fiche active, ni une autorisation technique, ni une instruction à IT.',
    counters: [['Portes à tracer', '6/6', 'Une conclusion par porte'], ['Verdict requis', '1/1', 'Parmi quatre verdicts'], ['Décisions actives', '0', 'Aucun cas réel'], ['Droits exécutés', '0', 'Aucune action technique']],
    badge: 'CONFIRMÉE · V1.0',
    groups: [
      ['1 · Références documentaires', ['Identifiant candidat de décision', 'Référence opaque du registre', 'Référence de la demande', 'Classification C1 à C5']],
      ['2 · Résultat des six portes', ['État de chaque porte', 'Motif factuel', 'Référence de preuve opaque', 'Réserve ou élément manquant']],
      ['3 · Autorité et séparation', ['Fonction requérante', 'Propriétaire métier', 'Autorité de décision candidate', 'Fonction exécutante distincte']],
      ['4 · Verdict et suite', ['Un verdict parmi les quatre', 'Motifs et réserves', 'Prochaine action documentaire', 'Date candidate de revue ou expiration']]
    ],
    rulesTitle: 'Quatre règles de complétude confirmées',
    rules: ['Six portes renseignées', 'Un seul verdict retenu', 'Autorité et mandat contrôlés', 'Aucun secret ni donnée C3/C4/C5 dans REF-01'],
    status: 'CONFIRMÉE · Gabarit documentaire V1.0. Zéro fiche active, signature réelle, titulaire, compte, droit, accès ou exécution.',
    next: 'Étape suivante : préparer REF-01-G1-AUT-02-02-009 V0.1, le protocole candidat de première exécution.',
    boundary: 'Une décision documentaire favorable ne crée ni compte ni droit. Toute première exécution exigera une décision séparée, un stockage protégé, un périmètre minimal et une intervention IT contrôlée.'
  },
  EN: {
    eyebrow: 'ACCESS-OPENING DECISION SHEET · V1.0 CONFIRMED · 29 AUG 2026',
    title: 'Document the outcome without creating or applying the right',
    intro: 'This candidate template brings together the six-gate trace, human outcome and reservations before any real access right. It is neither an active record, technical authorisation nor instruction to IT.',
    counters: [['Gates to trace', '6/6', 'One conclusion per gate'], ['Required outcome', '1/1', 'Among four outcomes'], ['Active decisions', '0', 'No real case'], ['Executed rights', '0', 'No technical action']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Documentary references', ['Candidate decision identifier', 'Opaque register reference', 'Request reference', 'C1 to C5 classification']],
      ['2 · Six-gate result', ['State of each gate', 'Factual reason', 'Opaque evidence reference', 'Reservation or missing item']],
      ['3 · Authority and segregation', ['Requesting function', 'Business owner', 'Candidate decision authority', 'Separate executing function']],
      ['4 · Outcome and follow-up', ['One of the four outcomes', 'Reasons and reservations', 'Next documentary action', 'Candidate review or expiry date']]
    ],
    rulesTitle: 'Four confirmed completion rules',
    rules: ['Six gates recorded', 'One outcome only', 'Authority and mandate checked', 'No secret or C3/C4/C5 data in REF-01'],
    status: 'CONFIRMED · V1.0 documentary template. Zero active records, real signatures, holders, accounts, rights, access or executions.',
    next: 'Next step: prepare REF-01-G1-AUT-02-02-009 V0.1, the candidate first-execution protocol.',
    boundary: 'A favourable documentary outcome creates neither an account nor a right. Any first execution requires a separate decision, protected storage, minimum scope and controlled IT intervention.'
  },
  DE: {
    eyebrow: 'ENTSCHEIDBLATT ZUR BERECHTIGUNGSEROEFFNUNG · V1.0 BESTÄTIGT · 29.08.2026',
    title: 'Ergebnis dokumentieren, ohne das Recht zu erstellen oder anzuwenden',
    intro: 'Diese Kandidatenvorlage vereint die Spur der sechs Tore, das menschliche Ergebnis und Vorbehalte vor jeder realen Berechtigung. Sie ist weder aktiver Eintrag noch technische Autorisierung oder Anweisung an IT.',
    counters: [['Zu belegende Tore', '6/6', 'Eine Folgerung je Tor'], ['Nötiges Ergebnis', '1/1', 'Unter vier Ergebnissen'], ['Aktive Entscheide', '0', 'Kein realer Fall'], ['Ausgeführte Rechte', '0', 'Keine technische Aktion']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Dokumentarische Referenzen', ['Kandidatenkennung des Entscheids', 'Opake Registerreferenz', 'Antragsreferenz', 'Klassifikation C1 bis C5']],
      ['2 · Ergebnis der sechs Tore', ['Stand jedes Tores', 'Sachlicher Grund', 'Opake Nachweisreferenz', 'Vorbehalt oder fehlendes Element']],
      ['3 · Autorität und Trennung', ['Anfragende Funktion', 'Fachverantwortung', 'Kandidaten-Entscheidautorität', 'Getrennte Ausführungsfunktion']],
      ['4 · Ergebnis und Folge', ['Eines der vier Ergebnisse', 'Gründe und Vorbehalte', 'Nächste Dokumentationsaktion', 'Kandidaten-Prüf- oder Ablaufdatum']]
    ],
    rulesTitle: 'Vier bestätigte Vollständigkeitsregeln',
    rules: ['Sechs Tore dokumentiert', 'Nur ein Ergebnis gewählt', 'Autorität und Mandat geprüft', 'Keine Geheimnisse oder C3/C4/C5-Daten in REF-01'],
    status: 'BESTÄTIGT · Dokumentationsvorlage V1.0. Null aktive Einträge, reale Unterschriften, Inhaber, Konten, Rechte, Zugriffe oder Ausführungen.',
    next: 'Nächster Schritt: REF-01-G1-AUT-02-02-009 V0.1, das Kandidatenprotokoll zur ersten Ausführung, vorbereiten.',
    boundary: 'Ein günstiges Dokumentationsergebnis erstellt weder Konto noch Recht. Jede erste Ausführung erfordert einen getrennten Entscheid, geschützte Ablage, minimalen Umfang und kontrollierten IT-Eingriff.'
  }
};

const InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessOpeningDecisionSheet = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-least-privilege-access-opening-decision-sheet" className="mt-5 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><FileCheck2 className="mt-0.5 shrink-0 text-violet-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-violet-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-violet-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-02-008 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-least-privilege-access-opening-decision-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-violet-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-violet-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1LeastPrivilegeAccessOpeningDecisionSheet;
