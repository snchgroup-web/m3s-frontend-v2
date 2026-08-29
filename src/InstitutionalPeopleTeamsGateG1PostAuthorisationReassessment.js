import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, KeyRound, LockKeyhole, RadioTower, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'RÉÉVALUATION APRÈS LES DEUX SOUS-LOTS · REF-01-G1-REV-004 · V1.0 · 29-08-2026',
    title: 'Réévaluer G1 sans confondre supports confirmés et preuves réelles',
    intro: 'Les branches Conservation/GED et Rôles/moindre privilège ont achevé leur préparation documentaire. Cette revue candidate mesure uniquement cette maturité documentaire ; elle ne transforme aucun support en preuve d exécution et ne ferme aucune condition G1.',
    counters: [['Sous-lots documentaires', '2/2', 'Deux branches préparées'], ['Supports confirmés', '18/18', 'Dix Conservation · huit Rôles'], ['Conditions clôturables', '0/6', 'Preuves réelles manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { support: 'État documentaire', gap: 'Preuve réelle manquante', next: 'Suite gouvernée possible' },
    statuses: { prepared: 'PRÉPARÉ · NON EXÉCUTÉ', open: 'OUVERT · NON PROUVÉ', locked: 'L2 FERMÉ' },
    items: [
      ['1 · PostgreSQL et restauration', 'Le cadrage PKG-03 V1.0 reste disponible ; aucun nouveau support d exécution n est ajouté par les deux sous-lots.', 'Service et environnement retenus, sauvegarde réelle, restauration testée, RPO/RTO mesurés.', 'Conserver ce chantier dans un lot technique séparé.', 'open'],
      ['2 · Rôles et moindre privilège', 'AUT-02-02-003 à 010 sont confirmés : modèle, scénarios synthétiques, attribution/retrait, registre, portes, décision, protocole et fiche GO/NO-GO.', 'Titulaire et compte réels, mandat vérifié, droits appliqués, refus et retrait testés en environnement autorisé.', 'Préparer ultérieurement une collecte de preuves bornée, après autorisation distincte.', 'prepared'],
      ['3 · Conservation et GED', 'AUT-02-03-002 à 011 sont confirmés : matrice, cadre LEGAL, catégories, responsabilités, revues, registre, portes, décisions et première utilisation.', 'Cas réel autorisé, durée appliquée, référence GED, gel/suppression et contrôles exécutés dans l espace protégé.', 'Préparer ultérieurement une collecte de preuves bornée, après autorisation distincte.', 'prepared'],
      ['4 · Migration et retour arrière', 'La procédure PKG-04 V1.0 reste documentaire et isolée.', 'Source, cible, identité d exécution, fenêtre, sauvegarde, répétition et retour arrière vérifiés.', 'Maintenir toute migration fermée jusqu à une décision séparée.', 'open'],
      ['5 · Outbox, supervision et reprise', 'Le cadre PKG-05 V1.0 reste documentaire, sans worker ni alerte active.', 'Worker, file, seuils, canaux, destinataires, quarantaine, rejeu et rapprochement testés.', 'Maintenir toute activation fermée jusqu à une décision séparée.', 'open'],
      ['6 · Ouverture éventuelle de L2', 'Deux conditions disposent désormais de chaînes documentaires complètes, mais aucune ne possède sa preuve réelle de sortie.', 'Les cinq conditions techniques et métier doivent être prouvées et décidées séparément.', 'Maintenir G1 ouverte et préparer la vague technique sans ouvrir L2.', 'locked']
    ],
    verdict: 'G1 RESTE OUVERTE · 18 supports documentaires sont confirmés, mais 0/6 condition est clôturable et L2 n est pas autorisé.',
    next: 'Statut : REF-01-DEC-060 confirme REV-004 V1.0. Le prochain arbitrage porte sur WAV-003 V0.1, sans GO ni ouverture de L2.',
    boundary: 'Cette revue ne crée aucun titulaire, compte, droit, accès C3/C4/C5, cas GED, durée appliquée, environnement, migration, worker, alerte, test réel, source maîtresse ou progression.'
  },
  EN: {
    eyebrow: 'REASSESSMENT AFTER BOTH SUB-PACKAGES · REF-01-G1-REV-004 · V1.0 · 29 AUG 2026',
    title: 'Reassess G1 without confusing confirmed supports and real evidence',
    intro: 'The Retention/DMS and Roles/least-privilege branches have completed documentary preparation. This candidate review measures documentary maturity only; it turns no support into execution evidence and closes no G1 condition.',
    counters: [['Documentary sub-packages', '2/2', 'Both branches prepared'], ['Confirmed supports', '18/18', 'Ten Retention · eight Roles'], ['Closable conditions', '0/6', 'Real evidence missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { support: 'Documentary state', gap: 'Missing real evidence', next: 'Possible governed next step' },
    statuses: { prepared: 'PREPARED · NOT EXECUTED', open: 'OPEN · NOT PROVEN', locked: 'L2 CLOSED' },
    items: [
      ['1 · PostgreSQL and restoration', 'PKG-03 V1.0 framing remains available; neither sub-package adds execution support.', 'Selected service and environment, real backup, tested restoration and measured RPO/RTO.', 'Keep this work in a separate technical package.', 'open'],
      ['2 · Roles and least privilege', 'AUT-02-02-003 through 010 are confirmed: model, synthetic scenarios, grant/withdrawal, register, gates, decision, protocol and GO/NO-GO sheet.', 'Real holder and account, verified mandate, applied rights, denials and withdrawal tested in an authorised environment.', 'Prepare a bounded evidence collection later, after a separate authorisation.', 'prepared'],
      ['3 · Retention and DMS', 'AUT-02-03-002 through 011 are confirmed: matrix, LEGAL framework, categories, ownership, reviews, register, gates, decisions and first use.', 'Authorised real case, applied period, DMS reference, hold/deletion and controls executed in the protected space.', 'Prepare a bounded evidence collection later, after a separate authorisation.', 'prepared'],
      ['4 · Migration and rollback', 'PKG-04 V1.0 remains documentary and isolated.', 'Source, target, execution identity, window, backup, rehearsal and rollback verified.', 'Keep every migration closed until a separate decision.', 'open'],
      ['5 · Outbox, monitoring and recovery', 'PKG-05 V1.0 remains documentary, with no active worker or alert.', 'Worker, queue, thresholds, channels, recipients, quarantine, replay and reconciliation tested.', 'Keep every activation closed until a separate decision.', 'open'],
      ['6 · Possible L2 opening', 'Two conditions now have complete documentary chains, but neither has real exit evidence.', 'All five technical and business conditions must be proven and decided separately.', 'Keep G1 open and prepare the technical wave without opening L2.', 'locked']
    ],
    verdict: 'G1 REMAINS OPEN · 18 documentary supports are confirmed, but 0/6 conditions are closable and L2 is not authorised.',
    next: 'Status: REF-01-DEC-060 confirms REV-004 V1.0. The next decision concerns WAV-003 V0.1, with no GO or L2 opening.',
    boundary: 'This review creates no holder, account, right, C3/C4/C5 access, DMS case, applied period, environment, migration, worker, alert, real test, master source or progress.'
  },
  DE: {
    eyebrow: 'NEUBEWERTUNG NACH BEIDEN TEILPAKETEN · REF-01-G1-REV-004 · V1.0 · 29.08.2026',
    title: 'G1 neu bewerten, ohne bestätigte Träger mit Realnachweisen zu verwechseln',
    intro: 'Die Zweige Aufbewahrung/DMS und Rollen/geringste Berechtigung haben ihre dokumentarische Vorbereitung abgeschlossen. Diese Kandidatenprüfung misst nur die Dokumentreife; sie macht keinen Träger zum Ausführungsnachweis und schliesst keine G1-Bedingung.',
    counters: [['Dokumentarische Teilpakete', '2/2', 'Beide Zweige vorbereitet'], ['Bestätigte Träger', '18/18', 'Zehn Aufbewahrung · acht Rollen'], ['Schliessbare Bedingungen', '0/6', 'Realnachweise fehlen'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { support: 'Dokumentarischer Stand', gap: 'Fehlender Realnachweis', next: 'Möglicher gesteuerter Folgeschritt' },
    statuses: { prepared: 'VORBEREITET · NICHT AUSGEFÜHRT', open: 'OFFEN · NICHT BELEGT', locked: 'L2 GESCHLOSSEN' },
    items: [
      ['1 · PostgreSQL und Wiederherstellung', 'Der Rahmen PKG-03 V1.0 bleibt verfügbar; keines der Teilpakete ergänzt einen Ausführungsträger.', 'Gewählter Dienst und Umgebung, reale Sicherung, getestete Wiederherstellung und gemessene RPO/RTO.', 'Diese Arbeit in einem getrennten technischen Paket halten.', 'open'],
      ['2 · Rollen und geringste Berechtigung', 'AUT-02-02-003 bis 010 sind bestätigt: Modell, synthetische Szenarien, Zuweisung/Entzug, Register, Tore, Entscheid, Protokoll und GO/NO-GO-Blatt.', 'Realer Inhaber und Konto, geprüftes Mandat, angewandte Rechte, Ablehnungen und Entzug in autorisierter Umgebung getestet.', 'Später eine begrenzte Nachweissammlung nach getrennter Autorisierung vorbereiten.', 'prepared'],
      ['3 · Aufbewahrung und DMS', 'AUT-02-03-002 bis 011 sind bestätigt: Matrix, LEGAL-Rahmen, Kategorien, Verantwortung, Prüfungen, Register, Tore, Entscheide und Erstnutzung.', 'Autorisierter Realfall, angewandte Frist, DMS-Referenz, Sperre/Löschung und ausgeführte Kontrollen im geschützten Raum.', 'Später eine begrenzte Nachweissammlung nach getrennter Autorisierung vorbereiten.', 'prepared'],
      ['4 · Migration und Rollback', 'PKG-04 V1.0 bleibt dokumentarisch und isoliert.', 'Quelle, Ziel, Ausführungsidentität, Fenster, Sicherung, Probe und Rollback geprüft.', 'Jede Migration bis zu einem getrennten Entscheid geschlossen halten.', 'open'],
      ['5 · Outbox, Überwachung und Wiederanlauf', 'PKG-05 V1.0 bleibt dokumentarisch, ohne aktiven Worker oder Alarm.', 'Worker, Queue, Schwellen, Kanäle, Empfänger, Quarantäne, Wiederholung und Abstimmung getestet.', 'Jede Aktivierung bis zu einem getrennten Entscheid geschlossen halten.', 'open'],
      ['6 · Mögliche L2-Öffnung', 'Zwei Bedingungen besitzen nun vollständige Dokumentketten, aber keine reale Austrittsnachweise.', 'Alle fünf technischen und fachlichen Bedingungen müssen getrennt belegt und entschieden werden.', 'G1 offen halten und die technische Welle vorbereiten, ohne L2 zu öffnen.', 'locked']
    ],
    verdict: 'G1 BLEIBT OFFEN · 18 Dokumentträger sind bestätigt, aber 0/6 Bedingungen schliessbar und L2 nicht autorisiert.',
    next: 'Stand: REF-01-DEC-060 bestätigt REV-004 V1.0. Der nächste Entscheid betrifft WAV-003 V0.1, ohne GO oder L2-Öffnung.',
    boundary: 'Diese Prüfung erstellt keinen Inhaber, kein Konto, Recht, keinen C3/C4/C5-Zugriff, DMS-Fall, keine angewandte Frist, Umgebung, Migration, Worker, Alarm, Realtest, Masterquelle oder Fortschritte.'
  }
};

const ICONS = [DatabaseBackup, KeyRound, Archive, ShieldCheck, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1PostAuthorisationReassessment = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-rev-004" data-testid="ref01-g1-post-authorisation-reassessment" className="mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-3 sm:p-4">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h5 className="mt-1 break-words text-base font-semibold text-slate-100 sm:text-lg">{t.title}</h5><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">{value}</p></div>{index < 2 ? <ShieldCheck className="shrink-0 text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="shrink-0 text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, support, gap, next, state], index) => { const Icon = ICONS[index]; const badge = state === 'prepared' ? 'border-sky-700/70 bg-sky-950/25 text-sky-100' : state === 'locked' ? 'border-rose-700/70 bg-rose-950/25 text-rose-100' : 'border-amber-700/70 bg-amber-950/25 text-amber-100'; return <article key={title} data-testid="ref01-g1-post-authorisation-condition" className="m3s-raised min-w-0 p-3 sm:p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" /><h6 className="break-words text-sm font-semibold text-slate-100">{title}</h6></div><span className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${badge}`}>{t.statuses[state]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-emerald-300">{t.labels.support}</dt><dd className="mt-1 text-slate-300">{support}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.gap}</dt><dd className="mt-1 text-slate-300">{gap}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.next}</dt><dd className="mt-1 text-slate-300">{next}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-sm font-semibold leading-6 text-amber-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1PostAuthorisationReassessment;
