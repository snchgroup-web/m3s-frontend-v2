import React from 'react';
import { AlertTriangle, Archive, DatabaseBackup, KeyRound, LockKeyhole, RadioTower, ShieldCheck } from 'lucide-react';

const STATUS_STYLES = {
  partial: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  locked: 'border-rose-700/70 bg-rose-950/25 text-rose-100'
};

const COPY = {
  FR: {
    eyebrow: 'RÉÉVALUATION CONSOLIDÉE DE G1 · REF-01-G1-REV-002 · V0.1 · 27-08-2026',
    title: 'Réévaluer G1 avec les quatre dossiers AUT désormais instruits',
    intro: 'Cette revue rapproche les résultats préparatoires AUT-A/AUT-B et les lectures confirmées AUT-C/AUT-D. Elle mesure la documentation disponible, pas une aptitude technique ou institutionnelle.',
    counters: [['Conditions G1', '6', 'Cadre inchangé'], ['Dossiers AUT instruits', '4/4', 'A, B, C et D'], ['Conditions clôturables', '0/6', 'Preuves encore manquantes'], ['Autorisations L2', '0', 'L2 reste fermé']],
    labels: { evidence: 'Lecture consolidée', gap: 'Écart restant', next: 'Preuve ou décision suivante' },
    statuses: { partial: 'PARTIELLEMENT DOCUMENTÉ', locked: 'L2 FERMÉ' },
    items: [
      ['1 · Service PostgreSQL et restauration', 'AUT-A indexe des sources officielles et AUT-B démontre un retour arrière synthétique.', 'Aucun fournisseur, service partagé, sauvegarde réelle, restauration testée, RPO ou RTO mesuré.', 'Autoriser séparément un dossier de comparaison et de preuve technique, sans présélection de fournisseur.', 'partial'],
      ['2 · Rôles, moindre privilège et visibilité', 'REF-01-DEC-001/013 et AUT-D V1.0 cadrent propriété métier, garde technique et autorité.', 'Les rôles applicatifs, délégations nommées et contrôles de visibilité par ligne ne sont ni définis ni testés.', 'Confirmer une matrice de rôles candidate avant toute création de droit.', 'partial'],
      ['3 · Conservation C2/C3/C4 et GED', 'La GED conserve décisions, versions et références ; REF-01 ne porte qu’une référence opaque.', 'Durées, suppression, gel, déclassement et exceptions ne sont pas validés par catégorie.', 'Préparer une matrice de conservation candidate avec LEGAL, Administration, RH et GED.', 'partial'],
      ['4 · Migration et retour arrière', 'AUT-B reproduit migration montante, retour arrière, idempotence et contrôles d’intégrité sur données synthétiques.', 'Identité de déploiement, approbation à deux personnes, sauvegarde vérifiée et procédure d’urgence restent absentes.', 'Documenter l’autorité et les preuves minimales d’une migration isolée avant tout environnement partagé.', 'partial'],
      ['5 · Supervision et reprise de l’outbox', 'AUT-B confirme la cohérence synthétique de l’outbox ; AUT-D exige contrôles périodiques, escalade et arrêt.', 'Aucun worker, seuil, alerte, quarantaine, métrique, fréquence ou responsable nommé n’est actif.', 'Préparer les seuils et contrôles candidats sans activer de worker ni d’alerte réelle.', 'partial'],
      ['6 · Ouverture éventuelle de L2', 'Les quatre dossiers AUT sont documentés et confirmés dans leurs limites.', 'Aucune des cinq conditions précédentes ne dispose de toutes ses preuves et décisions de sortie.', 'Maintenir L2 fermé et soumettre cette revue à une confirmation humaine distincte.', 'locked']
    ],
    verdict: 'G1 RESTE OUVERTE · Les six conditions sont lisibles, cinq sont partiellement documentées, aucune n’est clôturable et L2 n’est pas autorisé.',
    next: 'Prochain arbitrage humain unique : confirmer ou amender REF-01-G1-REV-002 V0.1. Cette confirmation acceptera la réévaluation, sans clôturer G1 ni ouvrir L2.',
    boundary: 'Aucune preuve réelle, source maîtresse, valeur de coût, capacité, droit, fournisseur ou progression n’est créée par cette revue.'
  },
  EN: {
    eyebrow: 'CONSOLIDATED G1 REASSESSMENT · REF-01-G1-REV-002 · V0.1 · 27 AUG 2026',
    title: 'Reassess G1 with all four AUT files now documented',
    intro: 'This review aligns the AUT-A/AUT-B preparatory results with the confirmed AUT-C/AUT-D readings. It measures available documentation, not technical or institutional readiness.',
    counters: [['G1 conditions', '6', 'Unchanged framework'], ['Documented AUT files', '4/4', 'A, B, C and D'], ['Closable conditions', '0/6', 'Evidence still missing'], ['L2 authorisations', '0', 'L2 remains closed']],
    labels: { evidence: 'Consolidated reading', gap: 'Remaining gap', next: 'Next evidence or decision' },
    statuses: { partial: 'PARTIALLY DOCUMENTED', locked: 'L2 CLOSED' },
    items: [
      ['1 · PostgreSQL service and restoration', 'AUT-A indexes official sources and AUT-B demonstrates synthetic rollback.', 'No provider, shared service, real backup, tested restoration, measured RPO or RTO.', 'Separately authorise a comparison and technical-evidence file without preselecting a provider.', 'partial'],
      ['2 · Roles, least privilege and visibility', 'REF-01-DEC-001/013 and AUT-D V1.0 frame business ownership, technical stewardship and authority.', 'Application roles, named delegations and row-visibility controls are neither defined nor tested.', 'Confirm a candidate role matrix before creating any right.', 'partial'],
      ['3 · C2/C3/C4 retention and DMS', 'The DMS retains decisions, versions and references; REF-01 holds only an opaque reference.', 'Retention periods, deletion, hold, declassification and exceptions are not approved by category.', 'Prepare a candidate retention matrix with LEGAL, Administration, HR and DMS.', 'partial'],
      ['4 · Migration and rollback', 'AUT-B reproduces up migration, rollback, idempotence and integrity checks on synthetic data.', 'Deployment identity, two-person approval, verified backup and emergency procedure remain absent.', 'Document authority and minimum evidence for an isolated migration before any shared environment.', 'partial'],
      ['5 · Outbox monitoring and recovery', 'AUT-B confirms synthetic outbox consistency; AUT-D requires periodic controls, escalation and stop.', 'No worker, threshold, alert, quarantine, metric, frequency or named owner is active.', 'Prepare candidate thresholds and controls without activating a worker or real alert.', 'partial'],
      ['6 · Possible L2 opening', 'All four AUT files are documented and confirmed within their limits.', 'None of the preceding five conditions has all exit evidence and decisions.', 'Keep L2 closed and submit this review to a distinct human confirmation.', 'locked']
    ],
    verdict: 'G1 REMAINS OPEN · All six conditions are readable, five are partially documented, none is closable and L2 is not authorised.',
    next: 'Next single human decision: confirm or amend REF-01-G1-REV-002 V0.1. Confirmation will accept the reassessment without closing G1 or opening L2.',
    boundary: 'This review creates no real evidence, master source, cost value, capacity, right, provider or progress.'
  },
  DE: {
    eyebrow: 'KONSOLIDIERTE G1-NEUBEWERTUNG · REF-01-G1-REV-002 · V0.1 · 27.08.2026',
    title: 'G1 mit allen vier dokumentierten AUT-Akten neu bewerten',
    intro: 'Diese Prüfung verbindet die vorbereitenden AUT-A-/AUT-B-Ergebnisse mit den bestätigten AUT-C-/AUT-D-Lesungen. Sie misst verfügbare Dokumentation, nicht technische oder institutionelle Reife.',
    counters: [['G1-Bedingungen', '6', 'Unveränderter Rahmen'], ['Dokumentierte AUT-Akten', '4/4', 'A, B, C und D'], ['Schliessbare Bedingungen', '0/6', 'Nachweise fehlen noch'], ['L2-Autorisierungen', '0', 'L2 bleibt geschlossen']],
    labels: { evidence: 'Konsolidierte Lesung', gap: 'Verbleibende Lücke', next: 'Nächster Nachweis oder Entscheid' },
    statuses: { partial: 'TEILWEISE DOKUMENTIERT', locked: 'L2 GESCHLOSSEN' },
    items: [
      ['1 · PostgreSQL-Dienst und Wiederherstellung', 'AUT-A indexiert offizielle Quellen und AUT-B zeigt synthetischen Rollback.', 'Kein Anbieter, gemeinsamer Dienst, reale Sicherung, getestete Wiederherstellung, gemessene RPO oder RTO.', 'Vergleichs- und Techniknachweise getrennt erlauben, ohne Anbieter vorauszuwählen.', 'partial'],
      ['2 · Rollen, geringste Berechtigung und Sichtbarkeit', 'REF-01-DEC-001/013 und AUT-D V1.0 strukturieren Fachverantwortung, technische Pflege und Autorität.', 'Anwendungsrollen, benannte Delegationen und Zeilensichtbarkeit sind weder definiert noch getestet.', 'Eine Kandidaten-Rollenmatrix vor jeder Rechteerstellung bestätigen.', 'partial'],
      ['3 · Aufbewahrung C2/C3/C4 und DMS', 'Das DMS bewahrt Entscheide, Versionen und Referenzen; REF-01 trägt nur eine opake Referenz.', 'Dauer, Löschung, Sperre, Deklassifizierung und Ausnahmen sind je Kategorie nicht genehmigt.', 'Eine Kandidaten-Aufbewahrungsmatrix mit LEGAL, Verwaltung, HR und DMS vorbereiten.', 'partial'],
      ['4 · Migration und Rückkehr', 'AUT-B reproduziert Aufwärtsmigration, Rückkehr, Idempotenz und Integritätskontrollen mit synthetischen Daten.', 'Deployment-Identität, Zwei-Personen-Freigabe, geprüfte Sicherung und Notfallverfahren fehlen.', 'Autorität und Mindestnachweise einer isolierten Migration vor jeder gemeinsamen Umgebung dokumentieren.', 'partial'],
      ['5 · Outbox-Überwachung und Wiederanlauf', 'AUT-B bestätigt synthetische Outbox-Kohärenz; AUT-D verlangt periodische Kontrollen, Eskalation und Stopp.', 'Kein Worker, Schwellenwert, Alarm, Quarantäne, Messwert, Rhythmus oder benannte Verantwortung ist aktiv.', 'Kandidaten-Schwellen und Kontrollen ohne Worker- oder Realalarm-Aktivierung vorbereiten.', 'partial'],
      ['6 · Mögliche L2-Öffnung', 'Alle vier AUT-Akten sind innerhalb ihrer Grenzen dokumentiert und bestätigt.', 'Keine der fünf vorangehenden Bedingungen besitzt alle Austrittsnachweise und Entscheide.', 'L2 geschlossen halten und diese Prüfung getrennt menschlich bestätigen lassen.', 'locked']
    ],
    verdict: 'G1 BLEIBT OFFEN · Alle sechs Bedingungen sind lesbar, fünf teilweise dokumentiert, keine schliessbar und L2 nicht autorisiert.',
    next: 'Nächster einzelner menschlicher Entscheid: REF-01-G1-REV-002 V0.1 bestätigen oder ändern. Die Bestätigung nimmt die Neubewertung an, ohne G1 zu schliessen oder L2 zu öffnen.',
    boundary: 'Diese Prüfung erzeugt keine Realnachweise, Masterquelle, Kostenwerte, Kapazität, Rechte, Anbieter oder Fortschritte.'
  }
};

const ICONS = [DatabaseBackup, KeyRound, Archive, ShieldCheck, RadioTower, LockKeyhole];

const InstitutionalPeopleTeamsGateG1Reassessment = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-reassessment" className="m3s-ref01-g1-reassessment mt-5 scroll-mt-24 rounded-md border border-amber-800/70 bg-amber-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-reassessment-title">
      <div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-amber-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-reassessment-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <ShieldCheck className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">{t.items.map(([title, evidence, gap, next, state], index) => { const Icon = ICONS[index]; return <article key={title} className="m3s-raised p-4" data-testid="ref01-g1-reassessed-condition"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2"><Icon className="mt-0.5 shrink-0 text-amber-300" size={18} aria-hidden="true" /><h6 className="text-sm font-semibold text-slate-100">{title}</h6></div><span className={`w-fit rounded-md border px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[state]}`}>{t.statuses[state]}</span></div><dl className="mt-4 space-y-3 text-xs leading-5"><div><dt className="font-semibold text-sky-300">{t.labels.evidence}</dt><dd className="mt-1 text-slate-300">{evidence}</dd></div><div><dt className="font-semibold text-rose-300">{t.labels.gap}</dt><dd className="mt-1 text-slate-300">{gap}</dd></div><div><dt className="font-semibold text-violet-300">{t.labels.next}</dt><dd className="mt-1 text-slate-300">{next}</dd></div></dl></article>; })}</div>
      <p className="mt-4 rounded-md border border-amber-700/70 bg-amber-950/20 p-3 text-sm font-semibold leading-6 text-amber-100">{t.verdict}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsGateG1Reassessment;
