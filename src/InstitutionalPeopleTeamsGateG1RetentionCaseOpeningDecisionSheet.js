import React from 'react';
import InstitutionalPeopleTeamsHistoricalFollowUp from './InstitutionalPeopleTeamsHistoricalFollowUp';
import { AlertTriangle, CheckSquare2, FileCheck2, FileLock2 } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'FICHE DE DECISION D OUVERTURE · V1.0 CONFIRMEE · 28-08-2026',
    title: 'Documenter le verdict sans ouvrir le cas',
    intro: 'Ce gabarit vide rassemble la trace des six portes, le verdict humain et les reserves. Il ne constitue ni un formulaire actif ni une autorisation de traitement.',
    counters: [['Portes à tracer', '6/6', 'Une conclusion par porte'], ['Verdict requis', '1/1', 'Parmi quatre verdicts confirmés'], ['Signatures réelles', '0', 'Aucun mandat nominatif'], ['Cas réels', '0', 'Aucune donnée personnelle']],
    badge: 'CONFIRMÉ · V1.0',
    groups: [
      ['1 · Références documentaires', ['Identifiant candidat de décision', 'Référence opaque du registre', 'Catégorie V1.0', 'Déclencheur et date observée']],
      ['2 · Résultat des six portes', ['État de chaque porte', 'Motif factuel', 'Référence de preuve opaque', 'Réserve ou élément manquant']],
      ['3 · Autorité et séparation', ['Fonction requérante', 'Fonction de contrôle', 'Autorité de décision candidate', 'Référence du mandat à vérifier']],
      ['4 · Verdict et suite', ['Un verdict parmi les quatre', 'Motifs et réserves', 'Prochaine action documentaire', 'Date candidate de réexamen']]
    ],
    rulesTitle: 'Quatre règles de complétude confirmées',
    rules: ['Six portes renseignées', 'Un seul verdict retenu', 'Autorité et mandat contrôlés', 'Aucune donnée C3/C4 dans REF-01'],
    status: 'CONFIRMÉ · Gabarit documentaire V1.0. Zéro formulaire actif, signature, cas réel, accès ou opération GED.',
    next: 'REF-01-G1-AUT-02-03-010 et la fiche GO/NO-GO 011 sont confirmés en V1.0 par REF-01-DEC-050 et REF-01-DEC-051, sans autorisation active.',
    boundary: 'La confirmation valide uniquement la structure documentaire. Toute première utilisation réelle exige une autorisation séparée, un espace protégé et le contrôle du cas concerné.'
  },
  EN: {
    eyebrow: 'CASE-OPENING DECISION SHEET · V1.0 CONFIRMED · 28 AUG 2026',
    title: 'Document the outcome without opening the case',
    intro: 'This empty template brings together the six-gate trace, human outcome and reservations. It is neither an active form nor processing authorisation.',
    counters: [['Gates to trace', '6/6', 'One conclusion per gate'], ['Required outcome', '1/1', 'Among four confirmed outcomes'], ['Real signatures', '0', 'No named mandate'], ['Real cases', '0', 'No personal data']],
    badge: 'CONFIRMED · V1.0',
    groups: [
      ['1 · Documentary references', ['Candidate decision identifier', 'Opaque register reference', 'V1.0 category', 'Trigger and observed date']],
      ['2 · Six-gate result', ['State of each gate', 'Factual reason', 'Opaque evidence reference', 'Reservation or missing item']],
      ['3 · Authority and segregation', ['Requesting function', 'Review function', 'Candidate decision authority', 'Mandate reference to verify']],
      ['4 · Outcome and follow-up', ['One of the four outcomes', 'Reasons and reservations', 'Next documentary action', 'Candidate reassessment date']]
    ],
    rulesTitle: 'Four confirmed completion rules',
    rules: ['Six gates recorded', 'One outcome only', 'Authority and mandate checked', 'No C3/C4 data in REF-01'],
    status: 'CONFIRMED · V1.0 documentary template. Zero active forms, signatures, real cases, access or DMS operations.',
    next: 'REF-01-G1-AUT-02-03-010 and GO/NO-GO sheet 011 are confirmed as V1.0 by REF-01-DEC-050 and REF-01-DEC-051, without an active authorisation.',
    boundary: 'Confirmation validates only the documentary structure. Any first real use requires separate authorisation, a protected space and review of the relevant case.'
  },
  DE: {
    eyebrow: 'ENTSCHEIDBLATT ZUR FALLERÖFFNUNG · V1.0 BESTÄTIGT · 28.08.2026',
    title: 'Ergebnis dokumentieren, ohne den Fall zu eröffnen',
    intro: 'Diese leere Vorlage vereint die Spur der sechs Tore, das menschliche Ergebnis und die Vorbehalte. Sie ist weder aktives Formular noch Verarbeitungsautorisierung.',
    counters: [['Zu belegende Tore', '6/6', 'Eine Folgerung je Tor'], ['Nötiges Ergebnis', '1/1', 'Unter vier bestätigten Ergebnissen'], ['Reale Unterschriften', '0', 'Kein Namensmandat'], ['Reale Fälle', '0', 'Keine Personendaten']],
    badge: 'BESTÄTIGT · V1.0',
    groups: [
      ['1 · Dokumentarische Referenzen', ['Kandidatenkennung des Entscheids', 'Opake Registerreferenz', 'Kategorie V1.0', 'Auslöser und Beobachtungsdatum']],
      ['2 · Ergebnis der sechs Tore', ['Stand jedes Tores', 'Sachlicher Grund', 'Opake Nachweisreferenz', 'Vorbehalt oder fehlendes Element']],
      ['3 · Autorität und Trennung', ['Anfragende Funktion', 'Prüffunktion', 'Kandidaten-Entscheidautorität', 'Zu prüfende Mandatsreferenz']],
      ['4 · Ergebnis und Folge', ['Eines der vier Ergebnisse', 'Gründe und Vorbehalte', 'Nächste Dokumentationsaktion', 'Kandidaten-Datum der Neubeurteilung']]
    ],
    rulesTitle: 'Vier bestätigte Vollständigkeitsregeln',
    rules: ['Sechs Tore dokumentiert', 'Nur ein Ergebnis gewählt', 'Autorität und Mandat geprüft', 'Keine C3/C4-Daten in REF-01'],
    status: 'BESTÄTIGT · Dokumentationsvorlage V1.0. Null aktive Formulare, Unterschriften, reale Fälle, Zugriffe oder DMS-Operationen.',
    next: 'REF-01-G1-AUT-02-03-010 und GO/NO-GO-Blatt 011 sind durch REF-01-DEC-050 und REF-01-DEC-051 als V1.0 bestätigt, ohne aktive Autorisierung.',
    boundary: 'Die Bestätigung validiert nur die Dokumentationsstruktur. Jede erste reale Nutzung erfordert eine getrennte Autorisierung, einen geschützten Raum und die Prüfung des betreffenden Falls.'
  }
};

const InstitutionalPeopleTeamsGateG1RetentionCaseOpeningDecisionSheet = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section data-testid="ref01-g1-retention-case-opening-decision-sheet" className="mt-5 rounded-md border border-violet-800/70 bg-violet-950/10 p-3 sm:p-4">
      <div className="flex items-start gap-3"><FileCheck2 className="mt-0.5 shrink-0 text-violet-300" size={20} aria-hidden="true" /><div className="min-w-0"><p className="text-[11px] font-semibold uppercase text-violet-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-xs leading-5 text-slate-300">{t.intro}</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => { const Icon = index < 2 ? CheckSquare2 : FileLock2; return <article key={label} className="m3s-raised p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div><Icon className={index < 2 ? 'shrink-0 text-violet-300' : 'shrink-0 text-amber-300'} size={19} aria-hidden="true" /></div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>; })}</div>
      <article className="mt-4 m3s-raised p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><h6 className="break-words text-sm font-semibold text-slate-100">REF-01-G1-AUT-02-03-009 · V1.0</h6><span className="rounded-md border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[10px] font-semibold text-emerald-100">{t.badge}</span></div><div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.groups.map(([title, fields]) => <section key={title} data-testid="ref01-g1-retention-case-opening-decision-group" className="min-w-0 rounded-md border border-slate-700 bg-slate-950/20 p-3"><h6 className="break-words text-xs font-semibold text-violet-200">{title}</h6><ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">{fields.map(field => <li key={field} className="rounded-md border border-slate-700 px-3 py-2 text-xs leading-5 text-slate-300">{field}</li>)}</ul></section>)}</div><div className="mt-4"><p className="text-xs font-semibold text-cyan-200">{t.rulesTitle}</p><div className="mt-2 flex flex-wrap gap-2">{t.rules.map(rule => <span key={rule} className="rounded-md border border-cyan-800/70 bg-cyan-950/20 px-2 py-1 text-[11px] font-semibold text-cyan-100">{rule}</span>)}</div></div></article>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-xs font-semibold leading-5 text-amber-100">{t.status}</p>
      <InstitutionalPeopleTeamsHistoricalFollowUp language={language}>{t.next}</InstitutionalPeopleTeamsHistoricalFollowUp>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1RetentionCaseOpeningDecisionSheet;
