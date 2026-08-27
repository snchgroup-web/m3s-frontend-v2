import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DU LOT POSTGRESQL ET REPRISE · REF-01-DEC-031 · V1.0 · 27-08-2026',
    title: 'Confirmer la grille sans retenir de service ni lancer de test',
    intro: 'Cheikh confirme REF-01-G1-PKG-03-001 V0.1. La grille devient V1.0 comme cadre documentaire, tandis que les fournisseurs, prix, objectifs, preuves et choix techniques restent indisponibles.',
    counters: [['Grille confirmée', '1/1', 'PKG-03 V1.0'], ['Services retenus', '0', 'Aucun choix'], ['Actions réelles', '0', 'Aucun test'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-031', version: 'V1.0', status: 'Grille PKG-03 confirmée', author: 'Cheikh Ndiaye', date: '27-08-2026',
      decision: 'REF-01-G1-PKG-03-001 V0.1 est confirmée et promue en V1.0 comme grille documentaire gouvernée pour PostgreSQL, sauvegarde, restauration, sécurité, exploitation et comparaison.',
      evidence: 'Confirmation de Cheikh en réponse au prochain arbitrage présenté dans la session du 27-08-2026 : « je confirme le prochain et merci ».',
      limit: 'Cette décision ne retient aucun fournisseur ou service, ne fixe aucun prix, RPO, RTO, périmètre, compte, secret ou autorité nominative et ne permet aucune sauvegarde, restauration, collecte, consultation ou opération réelle. Elle ne ferme pas G1 et n’ouvre pas L2.'
    },
    status: 'CONFIRMÉ · PKG-03-001 V1.0 devient la grille documentaire gouvernée du lot 3.',
    next: 'Étape produite ci-dessous : REF-01-G1-PKG-04-001 V0.1 prépare migration, retour arrière et autorité sans toucher à un environnement réel.',
    boundary: 'Toute consultation, sélection, création de compte, test, sauvegarde, restauration ou décision technique exige un arbitrage séparé.'
  },
  EN: {
    eyebrow: 'HUMAN POSTGRESQL AND RECOVERY PACKAGE CONFIRMATION · REF-01-DEC-031 · V1.0 · 27 AUG 2026',
    title: 'Confirm the grid without selecting a service or starting a test',
    intro: 'Cheikh confirms REF-01-G1-PKG-03-001 V0.1. The grid becomes V1.0 as a documentary framework, while providers, prices, objectives, evidence and technical choices remain unavailable.',
    counters: [['Confirmed grid', '1/1', 'PKG-03 V1.0'], ['Selected services', '0', 'No choice'], ['Real actions', '0', 'No test'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-031', version: 'V1.0', status: 'PKG-03 grid confirmed', author: 'Cheikh Ndiaye', date: '27 Aug 2026',
      decision: 'REF-01-G1-PKG-03-001 V0.1 is confirmed and promoted to V1.0 as the governed documentary grid for PostgreSQL, backup, restoration, security, operations and comparison.',
      evidence: 'Confirmation by Cheikh in response to the next decision presented during the 27 Aug 2026 session: “je confirme le prochain et merci”.',
      limit: 'This decision selects no provider or service, sets no price, RPO, RTO, scope, account, secret or named authority and permits no backup, restoration, collection, consultation or real operation. It does not close G1 or open L2.'
    },
    status: 'CONFIRMED · PKG-03-001 V1.0 becomes the governed documentary grid for package 3.',
    next: 'Produced step below: REF-01-G1-PKG-04-001 V0.1 prepares migration, rollback and authority without touching a real environment.',
    boundary: 'Any consultation, selection, account creation, test, backup, restoration or technical decision requires a separate decision.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DES POSTGRESQL- UND WIEDERANLAUFPAKETS · REF-01-DEC-031 · V1.0 · 27.08.2026',
    title: 'Das Raster ohne Dienstwahl oder Teststart bestätigen',
    intro: 'Cheikh bestätigt REF-01-G1-PKG-03-001 V0.1. Das Raster wird zu V1.0 als Dokumentrahmen; Anbieter, Preise, Ziele, Nachweise und technische Entscheidungen bleiben nicht verfügbar.',
    counters: [['Bestätigtes Raster', '1/1', 'PKG-03 V1.0'], ['Gewählte Dienste', '0', 'Keine Wahl'], ['Reale Aktionen', '0', 'Kein Test'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-031', version: 'V1.0', status: 'PKG-03-Raster bestätigt', author: 'Cheikh Ndiaye', date: '27.08.2026',
      decision: 'REF-01-G1-PKG-03-001 V0.1 wird bestätigt und als gesteuertes Dokumentraster V1.0 für PostgreSQL, Sicherung, Wiederherstellung, Sicherheit, Betrieb und Vergleich geführt.',
      evidence: 'Bestätigung von Cheikh als Antwort auf den nächsten Entscheid in der Sitzung vom 27.08.2026: « je confirme le prochain et merci ».',
      limit: 'Dieser Entscheid wählt keinen Anbieter oder Dienst, setzt keinen Preis, RPO, RTO, Umfang, Konto, kein Geheimnis oder benannte Autorität und erlaubt keine Sicherung, Wiederherstellung, Sammlung, Konsultation oder reale Operation. G1 bleibt offen und L2 geschlossen.'
    },
    status: 'BESTÄTIGT · PKG-03-001 V1.0 wird das gesteuerte Dokumentraster für Paket 3.',
    next: 'Nachfolgend erstellter Schritt: REF-01-G1-PKG-04-001 V0.1 bereitet Migration, Rollback und Autorität ohne Eingriff in eine reale Umgebung vor.',
    boundary: 'Jede Konsultation, Auswahl, Kontoerstellung, Prüfung, Sicherung, Wiederherstellung oder technische Entscheidung erfordert einen eigenen Entscheid.'
  }
};

const InstitutionalPeopleTeamsGateG1PostgresRecoveryConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-postgres-recovery-confirmation" className="m3s-ref01-g1-postgres-recovery-confirmation mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-postgres-recovery-confirmation-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-postgres-recovery-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index === 0 ? <BadgeCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-amber-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostgresRecoveryConfirmation;
