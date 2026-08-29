import React from 'react';
import { AlertTriangle, BadgeCheck, LockKeyhole } from 'lucide-react';
import GovernedDecisionRecord from './GovernedDecisionRecord';

const COPY = {
  FR: {
    eyebrow: 'CONFIRMATION HUMAINE DE LA STRUCTURE AUT-02-01 · REF-01-DEC-062 · V1.0 · 29-08-2026',
    title: 'Confirmer le cadre PostgreSQL sans ouvrir de service ni de test',
    intro: 'Cheikh confirme REF-01-G1-AUT-02-01-001 V0.1. La fiche devient V1.0 comme structure documentaire de référence ; ses six désignations restent ouvertes et aucune exécution n’est autorisée.',
    counters: [['Fiche confirmée', '1/1', 'AUT-02-01-001 V1.0'], ['Champs structurés', '11/11', 'Cadre documentaire retenu'], ['Désignations ouvertes', '6', 'Aucune valeur inventée'], ['Tests et environnements', '0', 'G1 ouverte · L2 fermé']],
    labels: { eyebrow: 'Registre de décision gouverné', author: 'Auteur de la décision', date: 'Date de décision', decision: 'Décision enregistrée', evidence: 'Preuve de traçabilité', limit: 'Portée et réserve' },
    record: {
      id: 'REF-01-DEC-062', version: 'V1.0', status: 'Structure AUT-02-01 confirmée sans autorisation d’exécution', author: 'Cheikh Ndiaye', date: '29-08-2026',
      decision: 'REF-01-G1-AUT-02-01-001 V0.1 est confirmée et promue en V1.0. Ses onze champs et ses arrêts obligatoires deviennent le cadre documentaire de référence pour préparer un éventuel essai PostgreSQL et restauration synthétique.',
      evidence: 'Confirmation explicite de Cheikh dans la session du 29-08-2026 : « OK je confirme, merci de continuer ».',
      limit: 'La décision ne désigne aucun service, environnement, titulaire, durée, seuil RPO/RTO, dépôt GED ou jeu de données. Elle n’ouvre aucun compte, secret, sauvegarde, restauration, test, accès de production ou niveau L2.'
    },
    status: 'CONFIRMÉ · AUT-02-01-001 V1.0 devient une structure documentaire gouvernée, pas une autorisation active.',
    next: 'Étape candidate produite ci-dessous : REF-01-G1-AUT-02-04-001 V0.1 pour cadrer séparément la migration et le retour arrière.',
    boundary: 'Les six valeurs ouvertes devront être proposées, sourcées et confirmées par décisions distinctes avant toute instruction technique.'
  },
  EN: {
    eyebrow: 'HUMAN CONFIRMATION OF THE AUT-02-01 STRUCTURE · REF-01-DEC-062 · V1.0 · 29 AUG 2026',
    title: 'Confirm the PostgreSQL framework without opening a service or test',
    intro: 'Cheikh confirms REF-01-G1-AUT-02-01-001 V0.1. The sheet becomes V1.0 as the reference documentary structure; its six designations remain open and no execution is authorised.',
    counters: [['Confirmed sheet', '1/1', 'AUT-02-01-001 V1.0'], ['Structured fields', '11/11', 'Documentary framework retained'], ['Open designations', '6', 'No invented value'], ['Tests and environments', '0', 'G1 open · L2 closed']],
    labels: { eyebrow: 'Governed decision record', author: 'Decision author', date: 'Decision date', decision: 'Recorded decision', evidence: 'Traceability evidence', limit: 'Scope and reservation' },
    record: {
      id: 'REF-01-DEC-062', version: 'V1.0', status: 'AUT-02-01 structure confirmed without execution authorisation', author: 'Cheikh Ndiaye', date: '29 Aug 2026',
      decision: 'REF-01-G1-AUT-02-01-001 V0.1 is confirmed and promoted to V1.0. Its eleven fields and mandatory stops become the reference documentary framework for preparing a possible synthetic PostgreSQL backup and restoration test.',
      evidence: 'Explicit confirmation by Cheikh during the 29 Aug 2026 session: “OK je confirme, merci de continuer”.',
      limit: 'The decision designates no service, environment, holder, duration, RPO/RTO threshold, DMS deposit or dataset. It opens no account, secret, backup, restoration, test, production access or L2 level.'
    },
    status: 'CONFIRMED · AUT-02-01-001 V1.0 becomes a governed documentary structure, not an active authorisation.',
    next: 'Candidate step produced below: REF-01-G1-AUT-02-04-001 V0.1 to frame migration and rollback separately.',
    boundary: 'The six open values must be proposed, sourced and confirmed through separate decisions before any technical instruction.'
  },
  DE: {
    eyebrow: 'MENSCHLICHE BESTÄTIGUNG DER AUT-02-01-STRUKTUR · REF-01-DEC-062 · V1.0 · 29.08.2026',
    title: 'PostgreSQL-Rahmen bestätigen, ohne Dienst oder Prüfung zu öffnen',
    intro: 'Cheikh bestätigt REF-01-G1-AUT-02-01-001 V0.1. Das Blatt wird als Referenz-Dokumentstruktur zu V1.0; seine sechs Bestimmungen bleiben offen und keine Ausführung ist autorisiert.',
    counters: [['Bestätigtes Blatt', '1/1', 'AUT-02-01-001 V1.0'], ['Strukturierte Felder', '11/11', 'Dokumentrahmen übernommen'], ['Offene Bestimmungen', '6', 'Kein erfundener Wert'], ['Prüfungen und Umgebungen', '0', 'G1 offen · L2 geschlossen']],
    labels: { eyebrow: 'Governance-konformer Entscheidnachweis', author: 'Entscheidautor', date: 'Entscheiddatum', decision: 'Erfasster Entscheid', evidence: 'Nachweis der Rückverfolgbarkeit', limit: 'Umfang und Vorbehalt' },
    record: {
      id: 'REF-01-DEC-062', version: 'V1.0', status: 'AUT-02-01-Struktur ohne Ausführungsautorisierung bestätigt', author: 'Cheikh Ndiaye', date: '29.08.2026',
      decision: 'REF-01-G1-AUT-02-01-001 V0.1 wird bestätigt und zu V1.0 hochgestuft. Seine elf Felder und Pflichtstopps bilden den Referenz-Dokumentrahmen zur Vorbereitung einer möglichen synthetischen PostgreSQL-Sicherungs- und Wiederherstellungsprüfung.',
      evidence: 'Ausdrückliche Bestätigung durch Cheikh in der Sitzung vom 29.08.2026: « OK je confirme, merci de continuer ».',
      limit: 'Der Entscheid bestimmt keinen Dienst, keine Umgebung, keinen Träger, keine Dauer, RPO/RTO-Schwelle, DMS-Ablage oder Datensatz. Er öffnet keinen Account, kein Geheimnis, keine Sicherung, Wiederherstellung, Prüfung, keinen Produktionszugriff oder L2.'
    },
    status: 'BESTÄTIGT · AUT-02-01-001 V1.0 wird eine gesteuerte Dokumentstruktur, keine aktive Autorisierung.',
    next: 'Nachfolgend erstellter Kandidatenschritt: REF-01-G1-AUT-02-04-001 V0.1 zur getrennten Abgrenzung von Migration und Rollback.',
    boundary: 'Die sechs offenen Werte müssen vor jeder technischen Anweisung getrennt vorgeschlagen, belegt und bestätigt werden.'
  }
};

const InstitutionalPeopleTeamsGateG1PostgresRestorationAuthorisationConfirmation = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-02-01-confirmation" data-testid="ref01-g1-postgres-authorisation-confirmation" className="mt-5 scroll-mt-24 rounded-md border border-emerald-800/70 bg-emerald-950/10 p-3 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-02-01-confirmation-title">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 max-w-5xl"><p className="text-xs font-semibold uppercase text-emerald-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-02-01-confirmation-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><BadgeCheck className="shrink-0 text-emerald-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <BadgeCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <GovernedDecisionRecord labels={t.labels} record={t.record} />
      <p className="mt-4 rounded-md border border-emerald-700/70 bg-emerald-950/20 p-3 text-xs font-semibold leading-5 text-emerald-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostgresRestorationAuthorisationConfirmation;
