import React from 'react';
import { AlertTriangle, Landmark, LockKeyhole, Scale } from 'lucide-react';

const COPY = {
  FR: {
    eyebrow: 'CADRAGE CORRIGÉ AUT-C/AUT-D · REF-01-G1-CD-001 · V0.1 · 27-08-2026',
    title: 'Préparer les deux dossiers restants avec leur vrai périmètre',
    intro: 'Ce support applique REF-01-DEC-024. Il sépare l’analyse économique et capacitaire de la gouvernance interne, sans réintroduire les anciens libellés erronés ni déclencher une action réelle.',
    counters: [['Dossiers cadrés', '2/2', 'AUT-C et AUT-D'], ['Axes préparés', '12', 'Six par dossier'], ['Prix ou contrats', '0', 'Aucune offre engagée'], ['Accès réels', '0', 'Aucun droit ouvert']],
    cTitle: 'AUT-C · Coûts et capacité',
    cIntro: 'Établir ce que coûterait et supporterait une solution candidate avant tout choix de fournisseur ou engagement.',
    cItems: [
      ['C-01 · Périmètre de coût', 'Séparer mise en place, exploitation, stockage, sauvegarde, restauration, supervision, support et sortie.'],
      ['C-02 · Hypothèses de charge', 'Documenter volumes, utilisateurs, fréquence, croissance et pics ; laisser indisponible toute valeur non sourcée.'],
      ['C-03 · Unités comparables', 'Comparer dans une même devise, période et assiette, avec taxes et taux de change explicitement séparés.'],
      ['C-04 · Capacité et limites', 'Identifier seuils, quotas, dépendances, modes dégradés et conditions de montée en charge.'],
      ['C-05 · Alternatives', 'Comparer au moins une option interne, une option gérée et le maintien contrôlé de l’existant, sans présélection.'],
      ['C-06 · Preuves et propriétaire', 'Relier chaque hypothèse à une source datée, un responsable et une question à arbitrer.']
    ],
    dTitle: 'AUT-D · Gouvernance interne',
    dIntro: 'Définir qui propose, contrôle, autorise, exploite et conserve les preuves avant toute ouverture de droit.',
    dItems: [
      ['D-01 · Propriété métier', 'Organisation & RH porte le sens de REF-01 et valide les règles métier.'],
      ['D-02 · Garde technique', 'IT & Support protège l’architecture, les accès, la journalisation et la continuité technique.'],
      ['D-03 · Conservation', 'La GED conserve décisions, versions et preuves autorisées avec leur classification.'],
      ['D-04 · Autorité', 'Management & Gouvernance arbitre les exceptions, le fournisseur éventuel et tout passage de porte.'],
      ['D-05 · Contrôles périodiques', 'Prévoir revue des droits, incidents, sauvegardes, restaurations, sous-traitants et écarts.'],
      ['D-06 · Escalade et arrêt', 'Nommer les conditions de suspension, retour arrière, notification et décision humaine.']
    ],
    status: 'CANDIDAT · Les douze axes sont préparés, non confirmés et non exécutés.',
    next: 'Prochain arbitrage unique : confirmer ou amender CD-001 V0.1. Une confirmation autorisera uniquement la production documentaire bornée d’AUT-C et AUT-D.',
    boundary: 'Aucun chiffre, fournisseur, contrat, compte, accès, donnée réelle, droit, RACI institutionnel, source maîtresse ou passage en L2 n’est validé par ce cadrage.'
  },
  EN: {
    eyebrow: 'CORRECTED AUT-C/AUT-D FRAMING · REF-01-G1-CD-001 · V0.1 · 27 AUG 2026',
    title: 'Prepare the two remaining files within their true scope',
    intro: 'This record applies REF-01-DEC-024. It separates economic and capacity analysis from internal governance without reintroducing the incorrect former labels or triggering a real action.',
    counters: [['Framed files', '2/2', 'AUT-C and AUT-D'], ['Prepared axes', '12', 'Six per file'], ['Prices or contracts', '0', 'No committed offer'], ['Real access', '0', 'No right opened']],
    cTitle: 'AUT-C · Costs and capacity',
    cIntro: 'Establish what a candidate solution would cost and support before selecting any provider or making a commitment.',
    cItems: [
      ['C-01 · Cost scope', 'Separate setup, operation, storage, backup, restoration, monitoring, support and exit.'],
      ['C-02 · Load assumptions', 'Document volumes, users, frequency, growth and peaks; leave every unsupported value unavailable.'],
      ['C-03 · Comparable units', 'Compare using the same currency, period and basis, with taxes and exchange rates explicitly separated.'],
      ['C-04 · Capacity and limits', 'Identify thresholds, quotas, dependencies, degraded modes and scaling conditions.'],
      ['C-05 · Alternatives', 'Compare at least one internal option, one managed option and controlled continuation of the current state, with no preselection.'],
      ['C-06 · Evidence and owner', 'Link every assumption to a dated source, owner and decision question.']
    ],
    dTitle: 'AUT-D · Internal governance',
    dIntro: 'Define who proposes, controls, authorises, operates and retains evidence before opening any right.',
    dItems: [
      ['D-01 · Business ownership', 'Organisation & HR owns REF-01 meaning and validates business rules.'],
      ['D-02 · Technical stewardship', 'IT & Support protects architecture, access, logging and technical continuity.'],
      ['D-03 · Retention', 'The DMS retains authorised decisions, versions and evidence with their classification.'],
      ['D-04 · Authority', 'Management & Governance arbitrates exceptions, any future provider and every gate transition.'],
      ['D-05 · Periodic controls', 'Plan reviews of rights, incidents, backups, restorations, subprocessors and gaps.'],
      ['D-06 · Escalation and stop', 'Name suspension, rollback, notification and human-decision conditions.']
    ],
    status: 'CANDIDATE · The twelve axes are prepared, unconfirmed and unexecuted.',
    next: 'Next single decision: confirm or amend CD-001 V0.1. Confirmation will authorise only bounded documentary production for AUT-C and AUT-D.',
    boundary: 'This framing validates no figure, provider, contract, account, access, real data, right, institutional RACI, master source or L2 transition.'
  },
  DE: {
    eyebrow: 'KORRIGIERTE AUT-C-/AUT-D-AUSGESTALTUNG · REF-01-G1-CD-001 · V0.1 · 27.08.2026',
    title: 'Die zwei verbleibenden Akten in ihrem richtigen Umfang vorbereiten',
    intro: 'Dieser Nachweis wendet REF-01-DEC-024 an. Er trennt Wirtschafts- und Kapazitätsanalyse von interner Governance, ohne die früheren falschen Bezeichnungen wieder einzuführen oder eine reale Aktion auszulösen.',
    counters: [['Strukturierte Akten', '2/2', 'AUT-C und AUT-D'], ['Vorbereitete Achsen', '12', 'Sechs je Akte'], ['Preise oder Verträge', '0', 'Kein gebundenes Angebot'], ['Realzugriffe', '0', 'Kein Recht geöffnet']],
    cTitle: 'AUT-C · Kosten und Kapazität',
    cIntro: 'Vor jeder Anbieterwahl oder Verpflichtung feststellen, was eine Kandidatenlösung kosten und tragen würde.',
    cItems: [
      ['C-01 · Kostenumfang', 'Einrichtung, Betrieb, Speicher, Sicherung, Wiederherstellung, Überwachung, Support und Ausstieg trennen.'],
      ['C-02 · Lastannahmen', 'Volumen, Benutzer, Häufigkeit, Wachstum und Spitzen dokumentieren; unbelegte Werte nicht verfügbar lassen.'],
      ['C-03 · Vergleichbare Einheiten', 'Mit gleicher Währung, Periode und Basis vergleichen; Steuern und Wechselkurse getrennt ausweisen.'],
      ['C-04 · Kapazität und Grenzen', 'Schwellen, Quoten, Abhängigkeiten, degradierte Betriebsarten und Skalierungsbedingungen benennen.'],
      ['C-05 · Alternativen', 'Mindestens eine interne, eine verwaltete und die kontrollierte Fortführung der bestehenden Option ohne Vorauswahl vergleichen.'],
      ['C-06 · Nachweis und Verantwortung', 'Jede Annahme mit datierter Quelle, Verantwortung und Entscheidungsfrage verbinden.']
    ],
    dTitle: 'AUT-D · Interne Governance',
    dIntro: 'Vor jeder Rechteöffnung bestimmen, wer vorschlägt, kontrolliert, autorisiert, betreibt und Nachweise bewahrt.',
    dItems: [
      ['D-01 · Fachverantwortung', 'Organisation & Personal trägt die REF-01-Bedeutung und validiert Fachregeln.'],
      ['D-02 · Technische Pflege', 'IT & Support schützt Architektur, Zugriffe, Protokollierung und technische Kontinuität.'],
      ['D-03 · Aufbewahrung', 'Das DMS bewahrt autorisierte Entscheide, Versionen und Nachweise mit Klassifizierung.'],
      ['D-04 · Autorität', 'Management & Governance entscheidet Ausnahmen, mögliche Anbieter und jeden Torübergang.'],
      ['D-05 · Periodische Kontrollen', 'Prüfungen von Rechten, Vorfällen, Sicherungen, Wiederherstellungen, Unterauftragnehmern und Abweichungen planen.'],
      ['D-06 · Eskalation und Stopp', 'Bedingungen für Aussetzung, Rückkehr, Meldung und menschlichen Entscheid benennen.']
    ],
    status: 'KANDIDAT · Die zwölf Achsen sind vorbereitet, unbestätigt und nicht ausgeführt.',
    next: 'Nächster gemeinsamer Entscheid: CD-001 V0.1 bestätigen oder ändern. Eine Bestätigung erlaubt nur die begrenzte Dokumentproduktion für AUT-C und AUT-D.',
    boundary: 'Diese Ausgestaltung validiert keine Zahl, Anbieter, Verträge, Konten, Zugriffe, Echtdaten, Rechte, institutionelle RACI, Masterquelle oder L2-Öffnung.'
  }
};

const ScopePanel = ({ icon: Icon, title, intro, items, tone }) => (
  <section className={`rounded-md border p-3 ${tone === 'cost' ? 'border-cyan-800/70 bg-cyan-950/10' : 'border-violet-800/70 bg-violet-950/10'}`} data-testid={`ref01-aut-${tone}-scope`}>
    <div className="flex items-start gap-2"><Icon className={tone === 'cost' ? 'text-cyan-300' : 'text-violet-300'} size={19} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">{title}</h6><p className="mt-1 text-xs leading-5 text-slate-300">{intro}</p></div></div>
    <div className="mt-3 grid grid-cols-1 gap-2">{items.map(([label, detail]) => <article key={label} className="m3s-raised p-3"><p className={`text-xs font-semibold ${tone === 'cost' ? 'text-cyan-200' : 'text-violet-200'}`}>{label}</p><p className="mt-1 text-xs leading-5 text-slate-300">{detail}</p></article>)}</div>
  </section>
);

const InstitutionalPeopleTeamsAutCorrectedScopesCandidate = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-cd-candidate" className="mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-cd-candidate-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-cd-candidate-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><Scale className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <Landmark className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2"><ScopePanel icon={Landmark} title={t.cTitle} intro={t.cIntro} items={t.cItems} tone="cost" /><ScopePanel icon={Scale} title={t.dTitle} intro={t.dIntro} items={t.dItems} tone="governance" /></div>
      <p className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutCorrectedScopesCandidate;
