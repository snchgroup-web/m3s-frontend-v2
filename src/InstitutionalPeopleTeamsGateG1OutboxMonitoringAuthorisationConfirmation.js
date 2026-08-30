import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA STRUCTURE AUT-02-05 · REF-01-DEC-064 · V1.0 · 30-08-2026',
    title: 'Confirmer le cadre Outbox, supervision et reprise sans activer de worker',
    intro: 'Cheikh confirme REF-01-G1-AUT-02-05-001 V0.1. La fiche devient V1.0 comme structure documentaire de référence ; ses huit désignations restent ouvertes ou à confirmer et aucune exécution n’est autorisée.',
    counters: [['Fiche confirmée', '1/1', 'AUT-02-05-001 V1.0'], ['Champs structurés', '11/11', 'Cadre documentaire retenu'], ['Valeurs à compléter', '8', 'Sept ouvertes · une à confirmer'], ['Workers, alertes et tests', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-064', version: 'V1.0', status: 'Structure AUT-02-05 confirmée sans autorisation d’exécution', author: 'Cheikh Ndiaye', date: '30-08-2026',
      decision: 'REF-01-G1-AUT-02-05-001 V0.1 est confirmée et promue en V1.0. Ses onze champs et ses arrêts obligatoires deviennent le cadre documentaire de référence pour préparer un éventuel essai synthétique d’outbox, supervision et reprise.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 30-08-2026 : « merci pour le retour, je les confirme et merci d’optimiser le rythme, la vitesse de travail si possible en gardant la qualité ».',
      limit: 'La décision ne désigne aucun transport, titulaire, destinataire, paquet worker, délai, tentative, métrique, seuil, dépôt GED ou environnement. Elle n’ouvre aucune file, alerte, quarantaine, rejeu, exécution, production ou niveau L2.'
    },
    status: 'CONFIRMÉ · AUT-02-05-001 V1.0 devient une structure documentaire gouvernée, pas une autorisation active.',
    next: 'Étape candidate produite ci-dessous : REF-01-G1-REV-005 V0.1 réévalue la vague technique après confirmation de ses trois structures.',
    boundary: 'Les huit valeurs à compléter devront être proposées, sourcées et confirmées par décisions distinctes avant toute instruction technique.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE AUT-02-05 STRUCTURE · REF-01-DEC-064 · V1.0 · 30 AUG 2026',
    title: 'Confirm the Outbox, monitoring and recovery framework without activating a worker',
    intro: 'Cheikh confirms REF-01-G1-AUT-02-05-001 V0.1. The sheet becomes V1.0 as the reference documentary structure; its eight designations remain open or to confirm and no execution is authorised.',
    counters: [['Confirmed sheet', '1/1', 'AUT-02-05-001 V1.0'], ['Structured fields', '11/11', 'Documentary framework retained'], ['Values to complete', '8', 'Seven open · one to confirm'], ['Workers, alerts and tests', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-064', version: 'V1.0', status: 'AUT-02-05 structure confirmed without execution authorisation', author: 'Cheikh Ndiaye', date: '30 Aug 2026',
      decision: 'REF-01-G1-AUT-02-05-001 V0.1 is confirmed and promoted to V1.0. Its eleven fields and mandatory stops become the reference documentary framework for preparing a possible synthetic outbox, monitoring and recovery rehearsal.',
      evidence: 'Explicit confirmation by Cheikh during the 30 Aug 2026 session: “merci pour le retour, je les confirme et merci d’optimiser le rythme, la vitesse de travail si possible en gardant la qualité”.',
      limit: 'The decision designates no transport, holder, recipient, worker package, delay, attempt, metric, threshold, DMS repository or environment. It opens no queue, alert, quarantine, replay, execution, production or L2 level.'
    },
    status: 'CONFIRMED · AUT-02-05-001 V1.0 becomes a governed documentary structure, not an active authorisation.',
    next: 'Candidate step produced below: REF-01-G1-REV-005 V0.1 reassesses the technical wave after confirmation of its three structures.',
    boundary: 'The eight values to complete must be proposed, sourced and confirmed through separate decisions before any technical instruction.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER AUT-02-05-STRUKTUR · REF-01-DEC-064 · V1.0 · 30.08.2026',
    title: 'Outbox-, Überwachungs- und Wiederanlaufrahmen ohne Worker-Aktivierung bestätigen',
    intro: 'Cheikh bestätigt REF-01-G1-AUT-02-05-001 V0.1. Das Blatt wird als Referenz-Dokumentstruktur zu V1.0; seine acht Bestimmungen bleiben offen oder zu bestätigen und keine Ausführung ist autorisiert.',
    counters: [['Bestätigtes Blatt', '1/1', 'AUT-02-05-001 V1.0'], ['Strukturierte Felder', '11/11', 'Dokumentrahmen übernommen'], ['Zu ergänzende Werte', '8', 'Sieben offen · einer zu bestätigen'], ['Worker, Alarme und Prüfungen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-064', version: 'V1.0', status: 'AUT-02-05-Struktur ohne Ausführungsautorisierung bestätigt', author: 'Cheikh Ndiaye', date: '30.08.2026',
      decision: 'REF-01-G1-AUT-02-05-001 V0.1 wird bestätigt und zu V1.0 hochgestuft. Seine elf Felder und Pflichtstopps bilden den Referenz-Dokumentrahmen für eine mögliche synthetische Outbox-, Überwachungs- und Wiederanlaufprobe.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 30.08.2026: « merci pour le retour, je les confirme et merci d’optimiser le rythme, la vitesse de travail si possible en gardant la qualité ».',
      limit: 'Der Entscheid bestimmt keinen Transport, Träger, Empfänger, kein Worker-Paket, keine Verzögerung, Versuche, Messwerte, Schwellen, DMS-Ablage oder Umgebung. Er öffnet keine Queue, Alarmierung, Quarantäne, Wiederholung, Ausführung, Produktion oder L2.'
    },
    status: 'BESTÄTIGT · AUT-02-05-001 V1.0 wird eine gesteuerte Dokumentstruktur, keine aktive Autorisierung.',
    next: 'Nachfolgend erstellter Kandidatenschritt: REF-01-G1-REV-005 V0.1 bewertet die technische Welle nach Bestätigung ihrer drei Strukturen neu.',
    boundary: 'Die acht zu ergänzenden Werte müssen vor jeder technischen Anweisung getrennt vorgeschlagen, belegt und bestätigt werden.'
  }
};

const InstitutionalPeopleTeamsGateG1OutboxMonitoringAuthorisationConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-02-05-confirmation" data-testid="ref01-g1-outbox-monitoring-authorisation-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-02-05-confirmation-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-02-05-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1OutboxMonitoringAuthorisationConfirmation;
