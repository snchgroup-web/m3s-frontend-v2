import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, KeyRound, LockKeyhole, RadioTower, ShieldCheck } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'REVUE CONSOLIDÉE APRÈS LES CINQ LOTS · REF-01-G1-REV-003 · V0.1 · 27-08-2026',
    title: 'Réévaluer G1 après confirmation documentaire des cinq lots',
    intro: 'Cette revue distingue l’achèvement documentaire des lots et la disponibilité des preuves réelles. Les cinq dossiers sont confirmés ; aucune condition G1 n’est pour autant clôturable.',
    counters: [['Lots documentaires', '5/5', 'Tous confirmés V1.0'], ['Axes documentés', '20', 'Quatre par lot'], ['Conditions clôturables', '0/6', 'Preuves réelles manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { support: 'Support confirmé', gap: 'Preuve réelle manquante', next: 'Suite gouvernée possible' },
    statuses: { partial: 'DOCUMENTÉ · NON PROUVÉ', locked: 'L2 FERMÉ' },
    items: [
      ['1 · PostgreSQL et restauration', 'PKG-03 V1.0 documente périmètre, continuité, sécurité et comparaison.', 'Service retenu, environnement, sauvegarde réelle, restauration testée, RPO et RTO mesurés.', 'Qualifier les preuves et décisions sans présélection ni achat.', 'partial'],
      ['2 · Rôles et moindre privilège', 'PKG-01 V1.0 documente rôles, visibilité, séparation et contrôle.', 'Titulaires nommés, droits appliqués, délégations et tests de visibilité.', 'Valider séparément chaque attribution avant création de droit.', 'partial'],
      ['3 · Conservation et GED', 'PKG-02 V1.0 documente catégories, conservation, exceptions et preuve GED.', 'Durées validées, autorités, gel, suppression, déclassement et contrôles exécutés.', 'Obtenir les décisions LEGAL, RH, Administration et GED requises.', 'partial'],
      ['4 · Migration et retour arrière', 'PKG-04 V1.0 documente prérequis, autorités, séquence isolée et rollback.', 'Source, cible, environnement, commandes, exécutants, fenêtre et essai vérifié.', 'Maintenir tout environnement fermé jusqu’à un arbitrage distinct.', 'partial'],
      ['5 · Outbox, supervision et reprise', 'PKG-05 V1.0 documente worker, métriques, alertes, quarantaine et rejeu.', 'Worker, file, planification, seuils, canaux, destinataires, rapprochement et test réel.', 'Qualifier les paramètres et responsabilités sans activation.', 'partial'],
      ['6 · Ouverture éventuelle de L2', 'Les cinq lots documentaires sont confirmés et réutilisables comme cadres.', 'Aucune des cinq conditions précédentes ne possède toutes ses preuves de sortie.', 'Maintenir G1 ouverte et soumettre cette revue à confirmation humaine.', 'locked']
    ],
    verdict: 'G1 RESTE OUVERTE · 5/5 lots documentaires sont confirmés, mais 0/6 condition est clôturable et L2 n’est pas autorisé.',
    next: 'Prochain arbitrage humain unique : confirmer ou amender REF-01-G1-REV-003 V0.1. Cette confirmation acceptera la revue sans fermer G1 ni ouvrir L2.',
    boundary: 'Cette revue ne crée aucune preuve réelle, aucun droit, environnement, service, sauvegarde, migration, worker, alerte, source maîtresse ou progression.'
  },
  EN: {
    eyebrow: 'CONSOLIDATED REVIEW AFTER FIVE PACKAGES · REF-01-G1-REV-003 · V0.1 · 27 AUG 2026',
    title: 'Reassess G1 after documentary confirmation of all five packages',
    intro: 'This review separates completion of documentary packages from availability of real evidence. All five files are confirmed; this does not make any G1 condition closable.',
    counters: [['Documentary packages', '5/5', 'All confirmed V1.0'], ['Documented areas', '20', 'Four per package'], ['Closable conditions', '0/6', 'Real evidence missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { support: 'Confirmed support', gap: 'Missing real evidence', next: 'Possible governed next step' },
    statuses: { partial: 'DOCUMENTED · NOT PROVEN', locked: 'L2 CLOSED' },
    items: [
      ['1 · PostgreSQL and restoration', 'PKG-03 V1.0 documents scope, continuity, security and comparison.', 'Selected service, environment, real backup, tested restoration and measured RPO/RTO.', 'Qualify evidence and decisions without preselection or purchase.', 'partial'],
      ['2 · Roles and least privilege', 'PKG-01 V1.0 documents roles, visibility, separation and control.', 'Named owners, applied rights, delegations and visibility tests.', 'Validate each assignment separately before creating a right.', 'partial'],
      ['3 · Retention and DMS', 'PKG-02 V1.0 documents categories, retention, exceptions and DMS evidence.', 'Approved periods, authorities, hold, deletion, declassification and executed controls.', 'Obtain required LEGAL, HR, Administration and DMS decisions.', 'partial'],
      ['4 · Migration and rollback', 'PKG-04 V1.0 documents prerequisites, authorities, isolated sequence and rollback.', 'Source, target, environment, commands, executors, window and verified rehearsal.', 'Keep every environment closed until a separate decision.', 'partial'],
      ['5 · Outbox, monitoring and recovery', 'PKG-05 V1.0 documents worker, metrics, alerts, quarantine and replay.', 'Worker, queue, scheduling, thresholds, channels, recipients, reconciliation and real test.', 'Qualify parameters and ownership without activation.', 'partial'],
      ['6 · Possible L2 opening', 'All five documentary packages are confirmed and reusable as frameworks.', 'None of the five preceding conditions has all exit evidence.', 'Keep G1 open and submit this review for human confirmation.', 'locked']
    ],
    verdict: 'G1 REMAINS OPEN · 5/5 documentary packages are confirmed, but 0/6 conditions are closable and L2 is not authorised.',
    next: 'Next single human decision: confirm or amend REF-01-G1-REV-003 V0.1. Confirmation will accept the review without closing G1 or opening L2.',
    boundary: 'This review creates no real evidence, right, environment, service, backup, migration, worker, alert, master source or progress.'
  },
  DE: {
    eyebrow: 'KONSOLIDIERTE PRÜFUNG NACH FÜNF PAKETEN · REF-01-G1-REV-003 · V0.1 · 27.08.2026',
    title: 'G1 nach dokumentarischer Bestätigung aller fünf Pakete neu bewerten',
    intro: 'Diese Prüfung trennt den Abschluss der Dokumentpakete von der Verfügbarkeit realer Nachweise. Alle fünf Akten sind bestätigt; dadurch wird keine G1-Bedingung schliessbar.',
    counters: [['Dokumentpakete', '5/5', 'Alle als V1.0 bestätigt'], ['Dokumentierte Bereiche', '20', 'Vier je Paket'], ['Schliessbare Bedingungen', '0/6', 'Realnachweise fehlen'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { support: 'Bestätigter Träger', gap: 'Fehlender Realnachweis', next: 'Möglicher gesteuerter Folgeschritt' },
    statuses: { partial: 'DOKUMENTIERT · NICHT BELEGT', locked: 'L2 GESCHLOSSEN' },
    items: [
      ['1 · PostgreSQL und Wiederherstellung', 'PKG-03 V1.0 dokumentiert Umfang, Kontinuität, Sicherheit und Vergleich.', 'Gewählter Dienst, Umgebung, reale Sicherung, getestete Wiederherstellung und gemessene RPO/RTO.', 'Nachweise und Entscheide ohne Vorauswahl oder Kauf qualifizieren.', 'partial'],
      ['2 · Rollen und geringste Berechtigung', 'PKG-01 V1.0 dokumentiert Rollen, Sichtbarkeit, Trennung und Kontrolle.', 'Benannte Träger, angewandte Rechte, Delegationen und Sichtbarkeitstests.', 'Jede Zuordnung vor Rechteerstellung getrennt validieren.', 'partial'],
      ['3 · Aufbewahrung und DMS', 'PKG-02 V1.0 dokumentiert Kategorien, Aufbewahrung, Ausnahmen und DMS-Nachweis.', 'Genehmigte Fristen, Autoritäten, Sperre, Löschung, Deklassifizierung und ausgeführte Kontrollen.', 'Erforderliche LEGAL-, HR-, Verwaltungs- und DMS-Entscheide einholen.', 'partial'],
      ['4 · Migration und Rollback', 'PKG-04 V1.0 dokumentiert Voraussetzungen, Autoritäten, isolierte Sequenz und Rollback.', 'Quelle, Ziel, Umgebung, Befehle, Ausführende, Fenster und geprüfte Probe.', 'Jede Umgebung bis zu einem getrennten Entscheid geschlossen halten.', 'partial'],
      ['5 · Outbox, Überwachung und Wiederanlauf', 'PKG-05 V1.0 dokumentiert Worker, Messwerte, Alarme, Quarantäne und Wiederholung.', 'Worker, Queue, Planung, Schwellen, Kanäle, Empfänger, Abstimmung und Realtest.', 'Parameter und Verantwortung ohne Aktivierung qualifizieren.', 'partial'],
      ['6 · Mögliche L2-Öffnung', 'Alle fünf Dokumentpakete sind bestätigt und als Rahmen wiederverwendbar.', 'Keine der fünf vorangehenden Bedingungen besitzt alle Austrittsnachweise.', 'G1 offen halten und diese Prüfung menschlich bestätigen lassen.', 'locked']
    ],
    verdict: 'G1 BLEIBT OFFEN · 5/5 Dokumentpakete sind bestätigt, aber 0/6 Bedingungen schliessbar und L2 nicht autorisiert.',
    next: 'Nächster einzelner menschlicher Entscheid: REF-01-G1-REV-003 V0.1 bestätigen oder ändern. Die Bestätigung nimmt die Prüfung an, ohne G1 zu schliessen oder L2 zu öffnen.',
    boundary: 'Diese Prüfung erzeugt keine Realnachweise, Rechte, Umgebung, Dienste, Sicherung, Migration, Worker, Alarme, Masterquelle oder Fortschritte.'
  }
};

const ICONS = [DatabaseBackup, KeyRound, Archive, ShieldCheck, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1FinalPackageReview = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-final-package-review" className="m3s-ref01-g1-final-package-review mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-final-package-review-title">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-final-package-review-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <ShieldCheck className="text-emerald-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, support, gap, next, state], index) => { const Icon = ICONS[index]; return <article key={title} data-testid="ref01-g1-final-reviewed-condition" className="m3s-raised p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{title}</h6></div><span className={`w-fit rounded-md border px-2 py-1 text-[10px] font-semibold ${state === 'locked' ? 'border-rose-700/70 bg-rose-950/25 text-rose-100' : 'border-sky-700/70 bg-sky-950/25 text-sky-100'}`}>{t.statuses[state]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-emerald-300">{t.labels.support}</dt><dd className="mt-1 text-slate-300">{support}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.gap}</dt><dd className="mt-1 text-slate-300">{gap}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.next}</dt><dd className="mt-1 text-slate-300">{next}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-sm font-semibold leading-6 text-amber-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1FinalPackageReview;
