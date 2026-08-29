import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA VAGUE 2 · REF-01-DEC-061 · V1.0 · 29-08-2026',
    title: 'Ouvrir trois préparations unitaires sans autoriser un environnement',
    intro: 'Cheikh confirme REF-01-G1-WAV-003 V0.1. La vague devient V1.0 et ouvre uniquement la rédaction séparée des dossiers AUT-02-01, AUT-02-04 et AUT-02-05.',
    counters: [['Vague confirmée', '1/1', 'WAV-003 V1.0'], ['Préparations ouvertes', '3/3', 'Trois dossiers séparés'], ['Autorisations techniques', '0/3', 'Aucune fiche confirmée'], ['Tests et environnements', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-061', version: 'V1.0', status: 'Vague 2 ouverte pour préparation documentaire seulement', author: 'Cheikh Ndiaye', date: '29-08-2026',
      decision: 'REF-01-G1-WAV-003 V0.1 est confirmée et promue en V1.0. Elle ouvre la préparation documentaire séparée de AUT-02-01 PostgreSQL et restauration, AUT-02-04 Migration et retour arrière, puis AUT-02-05 Outbox, supervision et reprise.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 29-08-2026 : « merci on continue, je confirme REF-01-G1-WAV-003 V0.1 ».',
      limit: 'La décision ne désigne aucun service, fournisseur, environnement, compte, secret, titulaire, durée, RPO/RTO ou donnée. Elle ne permet aucun test, sauvegarde, restauration, migration, worker, alerte, rejeu, changement de production, fermeture de G1 ou ouverture de L2.'
    },
    status: 'CONFIRMÉ · WAV-003 V1.0 autorise uniquement la préparation documentaire des trois fiches unitaires.',
    next: 'Première fiche candidate produite ci-dessous : REF-01-G1-AUT-02-01-001 V0.1 pour PostgreSQL et restauration synthétique.',
    boundary: 'Les trois dossiers restent indépendants. Chacun exigera sa propre confirmation puis une décision d’exécution distincte avant toute action technique.'
  },
  EN: {
    eyebrow: 'HUMAN WAVE 2 CONFIRMATION · REF-01-DEC-061 · V1.0 · 29 AUG 2026',
    title: 'Open three individual preparations without authorising an environment',
    intro: 'Cheikh confirms REF-01-G1-WAV-003 V0.1. The wave becomes V1.0 and opens only the separate drafting of AUT-02-01, AUT-02-04 and AUT-02-05.',
    counters: [['Confirmed wave', '1/1', 'WAV-003 V1.0'], ['Open preparations', '3/3', 'Three separate files'], ['Technical authorisations', '0/3', 'No confirmed sheet'], ['Tests and environments', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-061', version: 'V1.0', status: 'Wave 2 opened for documentary preparation only', author: 'Cheikh Ndiaye', date: '29 Aug 2026',
      decision: 'REF-01-G1-WAV-003 V0.1 is confirmed and promoted to V1.0. It opens separate documentary preparation of AUT-02-01 PostgreSQL and restoration, AUT-02-04 Migration and rollback, then AUT-02-05 Outbox, monitoring and recovery.',
      evidence: 'Explicit confirmation by Cheikh during the 29 Aug 2026 session: “merci on continue, je confirme REF-01-G1-WAV-003 V0.1”.',
      limit: 'The decision designates no service, provider, environment, account, secret, holder, period, RPO/RTO or data. It permits no test, backup, restoration, migration, worker, alert, replay, production change, G1 closure or L2 opening.'
    },
    status: 'CONFIRMED · WAV-003 V1.0 authorises only documentary preparation of the three individual sheets.',
    next: 'First candidate sheet produced below: REF-01-G1-AUT-02-01-001 V0.1 for PostgreSQL and synthetic restoration.',
    boundary: 'The three files remain independent. Each requires its own confirmation and then a separate execution decision before any technical action.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER WELLE 2 · REF-01-DEC-061 · V1.0 · 29.08.2026',
    title: 'Drei Einzelvorbereitungen ohne Umgebungserlaubnis öffnen',
    intro: 'Cheikh bestätigt REF-01-G1-WAV-003 V0.1. Die Welle wird zu V1.0 und öffnet nur die getrennte Erstellung von AUT-02-01, AUT-02-04 und AUT-02-05.',
    counters: [['Bestätigte Welle', '1/1', 'WAV-003 V1.0'], ['Offene Vorbereitungen', '3/3', 'Drei getrennte Akten'], ['Technische Autorisierungen', '0/3', 'Kein bestätigtes Blatt'], ['Prüfungen und Umgebungen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-061', version: 'V1.0', status: 'Welle 2 nur für Dokumentvorbereitung geöffnet', author: 'Cheikh Ndiaye', date: '29.08.2026',
      decision: 'REF-01-G1-WAV-003 V0.1 ist bestätigt und wird zu V1.0. Sie öffnet die getrennte Dokumentvorbereitung von AUT-02-01 PostgreSQL und Wiederherstellung, AUT-02-04 Migration und Rollback sowie AUT-02-05 Outbox, Überwachung und Wiederanlauf.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 29.08.2026: « merci on continue, je confirme REF-01-G1-WAV-003 V0.1 ».',
      limit: 'Der Entscheid bestimmt keinen Dienst, Anbieter, keine Umgebung, kein Konto, Geheimnis, keinen Inhaber, Zeitraum, RPO/RTO oder Daten. Er erlaubt keine Prüfung, Sicherung, Wiederherstellung, Migration, Worker, Alarm, Wiederholung, Produktionsänderung, G1-Schliessung oder L2-Öffnung.'
    },
    status: 'BESTÄTIGT · WAV-003 V1.0 erlaubt nur die Dokumentvorbereitung der drei Einzelblätter.',
    next: 'Nachfolgend erstelltes erstes Kandidatenblatt: REF-01-G1-AUT-02-01-001 V0.1 für PostgreSQL und synthetische Wiederherstellung.',
    boundary: 'Die drei Akten bleiben unabhängig. Jede braucht eine eigene Bestätigung und danach einen getrennten Ausführungsentscheid vor jeder technischen Aktion.'
  }
};

const InstitutionalPeopleTeamsGateG1SyntheticWaveConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-wave-003-confirmation" data-testid="ref01-g1-synthetic-wave-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-wave-003-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-wave-003-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1SyntheticWaveConfirmation;
