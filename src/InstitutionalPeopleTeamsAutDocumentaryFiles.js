import React from 'react';
import { AlertTriangle, BadgeCheck, CircleDashed, Landmark, LockKeyhole, Scale } from 'lucide-react';

const STATE_STYLES = {
  confirmed: 'border-emerald-700/70 bg-emerald-950/25 text-emerald-100',
  framed: 'border-sky-700/70 bg-sky-950/25 text-sky-100',
  candidate: 'border-amber-700/70 bg-amber-950/25 text-amber-100',
  unavailable: 'border-slate-600 bg-slate-900/50 text-slate-300'
};

const COPY = {
  FR: {
    eyebrow: 'DOSSIERS DOCUMENTAIRES BORNÉS · REF-01-G1-AUT-C-001 / AUT-D-001 · V0.1 · 27-08-2026',
    title: 'Documenter ce qui est établi, candidat ou encore indisponible',
    intro: 'Ces deux dossiers appliquent CD-001 V1.0. Ils utilisent uniquement les décisions et supports déjà contrôlés ; aucun prix, fournisseur, capacité réelle ou droit n’est inventé.',
    counters: [['Dossiers produits', '2/2', 'AUT-C et AUT-D'], ['Axes documentés', '12', 'Six par dossier'], ['Montants sourcés', '0', 'Indisponibles'], ['Changements réels', '0', 'Documentation seulement']],
    labels: { source: 'Source ou fondement', result: 'Résultat documentaire', state: 'État' },
    states: { confirmed: 'CADRE CONFIRMÉ', framed: 'RÈGLE CADRÉE', candidate: 'CANDIDAT', unavailable: 'INDISPONIBLE' },
    cTitle: 'REF-01-G1-AUT-C-001 V0.1 · Coûts et capacité',
    cIntro: 'Le dossier prépare une comparaison future sans demander de devis, choisir de fournisseur ou transformer le taux CHF/CFA courant en prix d’infrastructure.',
    cItems: [
      ['C-01 · Périmètre de coût', 'CD-001 V1.0', 'Mise en place, exploitation, stockage, sauvegarde, restauration, supervision, support et sortie sont séparés.', 'confirmed'],
      ['C-02 · Hypothèses de charge', 'Aucune mesure source reçue', 'Utilisateurs, volumes, fréquence, croissance et pics restent indisponibles.', 'unavailable'],
      ['C-03 · Unités comparables', 'Règle CHF/CFA et principe de taux historique', 'Toute comparaison devra conserver même devise, période, assiette, taxes et taux daté ; aucun montant n’est calculé.', 'framed'],
      ['C-04 · Capacité et limites', 'Aucun service PostgreSQL cible retenu', 'Quotas, seuils, modes dégradés, région, sauvegardes gérées, RPO et RTO restent indisponibles.', 'unavailable'],
      ['C-05 · Alternatives', 'CD-001 V1.0', 'Trois familles restent à comparer : option interne, option gérée et maintien contrôlé de l’existant. Aucun fournisseur n’est présélectionné.', 'candidate'],
      ['C-06 · Preuves et propriétaires', 'Frontières Administration pilote et décisions REF-01', 'IT prépare les hypothèses techniques ; Finances contrôle les bases de coût ; Gouvernance décide ; GED conserve. Répartition à confirmer pour ce dossier.', 'candidate']
    ],
    cFinding: 'Verdict AUT-C : structure exploitable, mais coût et capacité non évaluables tant que les hypothèses de charge, les offres comparables et les preuves techniques réelles ne sont pas autorisées puis reçues.',
    dTitle: 'REF-01-G1-AUT-D-001 V0.1 · Gouvernance interne',
    dIntro: 'Le dossier rassemble les responsabilités déjà cadrées et isole les contrôles qui nécessitent encore fréquence, seuils et responsables nommés.',
    dItems: [
      ['D-01 · Propriété métier', 'REF-01-DEC-001 V1.0', 'Organisation & RH porte le sens métier de REF-01 et valide les règles métier.', 'confirmed'],
      ['D-02 · Garde technique', 'REF-01-DEC-001 V1.0 et ADR-001 V1.0', 'IT & Support protège architecture, accès, journalisation et continuité technique.', 'confirmed'],
      ['D-03 · Conservation', 'REF-01-DEC-001 V1.0 et cadrage GED', 'La GED conserve décisions, versions et références de preuves selon leur classification.', 'confirmed'],
      ['D-04 · Autorité', 'Administration pilote et portes G0/G1', 'Management & Gouvernance arbitre les exceptions, tout fournisseur éventuel et chaque passage de porte.', 'framed'],
      ['D-05 · Contrôles périodiques', 'CD-001 V1.0', 'Revue des droits, incidents, sauvegardes, restaurations, sous-traitants et écarts : fréquence et propriétaire restent à confirmer.', 'candidate'],
      ['D-06 · Escalade et arrêt', 'Garde-fous REF-01 et CD-001 V1.0', 'Suspension, retour arrière, notification et décision humaine sont requis ; seuils et délais restent à définir.', 'candidate']
    ],
    dFinding: 'Verdict AUT-D : frontières principales documentées ; le dossier ne vaut pas encore RACI institutionnel et ne peut fermer G1 avant validation des contrôles périodiques, seuils d’escalade et preuves attendues.',
    status: 'PRODUIT · Deux dossiers V0.1, douze axes documentés, zéro action réelle et zéro source maîtresse promue.',
    next: 'Prochain arbitrage humain unique : confirmer ou amender ensemble AUT-C-001 V0.1 et AUT-D-001 V0.1. Une confirmation acceptera leur lecture documentaire, sans rendre disponibles les valeurs absentes ni fermer G1.',
    boundary: 'Aucun montant nul n’est utilisé pour remplacer une donnée absente. Aucun rôle candidat ne crée un droit, aucun support ne devient source maîtresse et aucun résultat ne prouve une aptitude à la production.'
  },
  EN: {
    eyebrow: 'BOUNDED DOCUMENTARY FILES · REF-01-G1-AUT-C-001 / AUT-D-001 · V0.1 · 27 AUG 2026',
    title: 'Document what is established, candidate or still unavailable',
    intro: 'These two files apply CD-001 V1.0. They use only controlled decisions and supports; no price, provider, real capacity or right is invented.',
    counters: [['Produced files', '2/2', 'AUT-C and AUT-D'], ['Documented axes', '12', 'Six per file'], ['Sourced amounts', '0', 'Unavailable'], ['Real changes', '0', 'Documentation only']],
    labels: { source: 'Source or basis', result: 'Documentary result', state: 'State' },
    states: { confirmed: 'CONFIRMED FRAME', framed: 'FRAMED RULE', candidate: 'CANDIDATE', unavailable: 'UNAVAILABLE' },
    cTitle: 'REF-01-G1-AUT-C-001 V0.1 · Costs and capacity',
    cIntro: 'The file prepares a future comparison without requesting quotes, selecting a provider or turning the current CHF/CFA rate into an infrastructure price.',
    cItems: [
      ['C-01 · Cost scope', 'CD-001 V1.0', 'Setup, operation, storage, backup, restoration, monitoring, support and exit are separated.', 'confirmed'],
      ['C-02 · Load assumptions', 'No sourced measure received', 'Users, volumes, frequency, growth and peaks remain unavailable.', 'unavailable'],
      ['C-03 · Comparable units', 'CHF/CFA rule and historical-rate principle', 'Any comparison must keep the same currency, period, basis, taxes and dated rate; no amount is calculated.', 'framed'],
      ['C-04 · Capacity and limits', 'No target PostgreSQL service selected', 'Quotas, thresholds, degraded modes, region, managed backups, RPO and RTO remain unavailable.', 'unavailable'],
      ['C-05 · Alternatives', 'CD-001 V1.0', 'Three families remain to compare: internal option, managed option and controlled continuation of the current state. No provider is preselected.', 'candidate'],
      ['C-06 · Evidence and owners', 'Administration-pilot boundaries and REF-01 decisions', 'IT prepares technical assumptions; Finance controls cost bases; Governance decides; the DMS retains evidence. Allocation remains to be confirmed for this file.', 'candidate']
    ],
    cFinding: 'AUT-C verdict: usable structure, but costs and capacity cannot be assessed until load assumptions, comparable offers and real technical evidence are authorised and received.',
    dTitle: 'REF-01-G1-AUT-D-001 V0.1 · Internal governance',
    dIntro: 'The file brings together framed responsibilities and isolates controls that still need frequency, thresholds and named owners.',
    dItems: [
      ['D-01 · Business ownership', 'REF-01-DEC-001 V1.0', 'Organisation & HR owns REF-01 business meaning and validates business rules.', 'confirmed'],
      ['D-02 · Technical stewardship', 'REF-01-DEC-001 V1.0 and ADR-001 V1.0', 'IT & Support protects architecture, access, logging and technical continuity.', 'confirmed'],
      ['D-03 · Retention', 'REF-01-DEC-001 V1.0 and DMS framing', 'The DMS retains decisions, versions and evidence references according to classification.', 'confirmed'],
      ['D-04 · Authority', 'Administration pilot and G0/G1 gates', 'Management & Governance arbitrates exceptions, any future provider and every gate transition.', 'framed'],
      ['D-05 · Periodic controls', 'CD-001 V1.0', 'Rights, incidents, backups, restorations, subprocessors and gaps must be reviewed; frequency and owner remain to confirm.', 'candidate'],
      ['D-06 · Escalation and stop', 'REF-01 guardrails and CD-001 V1.0', 'Suspension, rollback, notification and human decision are required; thresholds and time limits remain to define.', 'candidate']
    ],
    dFinding: 'AUT-D verdict: main boundaries documented; the file is not yet an institutional RACI and cannot close G1 before periodic controls, escalation thresholds and expected evidence are validated.',
    status: 'PRODUCED · Two V0.1 files, twelve documented axes, zero real action and zero promoted master source.',
    next: 'Next single human decision: confirm or amend AUT-C-001 V0.1 and AUT-D-001 V0.1 together. Confirmation will accept their documentary reading without making missing values available or closing G1.',
    boundary: 'No zero amount replaces missing data. No candidate role creates a right, no support becomes a master source and no result proves production readiness.'
  },
  DE: {
    eyebrow: 'BEGRENZTE DOKUMENTAKTEN · REF-01-G1-AUT-C-001 / AUT-D-001 · V0.1 · 27.08.2026',
    title: 'Dokumentieren, was belegt, Kandidat oder noch nicht verfügbar ist',
    intro: 'Diese zwei Akten wenden CD-001 V1.0 an. Sie nutzen nur kontrollierte Entscheide und Träger; kein Preis, Anbieter, reale Kapazität oder Recht wird erfunden.',
    counters: [['Erstellte Akten', '2/2', 'AUT-C und AUT-D'], ['Dokumentierte Achsen', '12', 'Sechs je Akte'], ['Belegte Beträge', '0', 'Nicht verfügbar'], ['Reale Änderungen', '0', 'Nur Dokumentation']],
    labels: { source: 'Quelle oder Grundlage', result: 'Dokumentergebnis', state: 'Stand' },
    states: { confirmed: 'BESTÄTIGTER RAHMEN', framed: 'STRUKTURIERTE REGEL', candidate: 'KANDIDAT', unavailable: 'NICHT VERFÜGBAR' },
    cTitle: 'REF-01-G1-AUT-C-001 V0.1 · Kosten und Kapazität',
    cIntro: 'Die Akte bereitet einen künftigen Vergleich vor, ohne Angebote anzufordern, Anbieter zu wählen oder den aktuellen CHF-/CFA-Kurs in einen Infrastrukturpreis umzuwandeln.',
    cItems: [
      ['C-01 · Kostenumfang', 'CD-001 V1.0', 'Einrichtung, Betrieb, Speicher, Sicherung, Wiederherstellung, Überwachung, Support und Ausstieg sind getrennt.', 'confirmed'],
      ['C-02 · Lastannahmen', 'Keine belegte Messung erhalten', 'Benutzer, Volumen, Häufigkeit, Wachstum und Spitzen bleiben nicht verfügbar.', 'unavailable'],
      ['C-03 · Vergleichbare Einheiten', 'CHF-/CFA-Regel und Prinzip des historischen Kurses', 'Jeder Vergleich muss gleiche Währung, Periode, Basis, Steuern und datierten Kurs behalten; kein Betrag wird berechnet.', 'framed'],
      ['C-04 · Kapazität und Grenzen', 'Kein PostgreSQL-Zieldienst gewählt', 'Quoten, Schwellen, degradierte Modi, Region, verwaltete Sicherungen, RPO und RTO bleiben nicht verfügbar.', 'unavailable'],
      ['C-05 · Alternativen', 'CD-001 V1.0', 'Drei Familien bleiben zu vergleichen: interne Option, verwaltete Option und kontrollierte Fortführung des Bestands. Kein Anbieter ist vorausgewählt.', 'candidate'],
      ['C-06 · Nachweise und Verantwortung', 'Grenzen des Verwaltungspiloten und REF-01-Entscheide', 'IT bereitet technische Annahmen vor; Finanzen kontrolliert Kostengrundlagen; Governance entscheidet; das DMS bewahrt. Die Zuordnung ist für diese Akte zu bestätigen.', 'candidate']
    ],
    cFinding: 'AUT-C-Urteil: nutzbare Struktur, aber Kosten und Kapazität sind nicht bewertbar, bevor Lastannahmen, vergleichbare Angebote und reale technische Nachweise erlaubt und erhalten sind.',
    dTitle: 'REF-01-G1-AUT-D-001 V0.1 · Interne Governance',
    dIntro: 'Die Akte bündelt strukturierte Verantwortungen und trennt Kontrollen ab, die noch Häufigkeit, Schwellen und benannte Verantwortliche benötigen.',
    dItems: [
      ['D-01 · Fachverantwortung', 'REF-01-DEC-001 V1.0', 'Organisation & Personal trägt die fachliche Bedeutung von REF-01 und validiert Fachregeln.', 'confirmed'],
      ['D-02 · Technische Pflege', 'REF-01-DEC-001 V1.0 und ADR-001 V1.0', 'IT & Support schützt Architektur, Zugriffe, Protokollierung und technische Kontinuität.', 'confirmed'],
      ['D-03 · Aufbewahrung', 'REF-01-DEC-001 V1.0 und DMS-Rahmen', 'Das DMS bewahrt Entscheide, Versionen und Nachweisreferenzen gemäss Klassifizierung.', 'confirmed'],
      ['D-04 · Autorität', 'Verwaltungspilot und Tore G0/G1', 'Management & Governance entscheidet Ausnahmen, mögliche Anbieter und jeden Torübergang.', 'framed'],
      ['D-05 · Periodische Kontrollen', 'CD-001 V1.0', 'Rechte, Vorfälle, Sicherungen, Wiederherstellungen, Unterauftragnehmer und Abweichungen sind zu prüfen; Häufigkeit und Verantwortung bleiben zu bestätigen.', 'candidate'],
      ['D-06 · Eskalation und Stopp', 'REF-01-Schutzregeln und CD-001 V1.0', 'Aussetzung, Rückkehr, Meldung und menschlicher Entscheid sind erforderlich; Schwellen und Fristen bleiben zu definieren.', 'candidate']
    ],
    dFinding: 'AUT-D-Urteil: Hauptgrenzen dokumentiert; die Akte ist noch keine institutionelle RACI und kann G1 vor Validierung periodischer Kontrollen, Eskalationsschwellen und erwarteter Nachweise nicht schliessen.',
    status: 'ERSTELLT · Zwei V0.1-Akten, zwölf dokumentierte Achsen, null reale Aktionen und null geförderte Masterquellen.',
    next: 'Nächster gemeinsamer menschlicher Entscheid: AUT-C-001 V0.1 und AUT-D-001 V0.1 gemeinsam bestätigen oder ändern. Eine Bestätigung nimmt ihre Dokumentlesung an, ohne fehlende Werte verfügbar zu machen oder G1 zu schliessen.',
    boundary: 'Kein Nullbetrag ersetzt fehlende Daten. Keine Kandidatenrolle erzeugt ein Recht, kein Träger wird Masterquelle und kein Ergebnis belegt Produktionsreife.'
  }
};

const FilePanel = ({ title, intro, items, finding, labels, states, tone }) => {
  const Icon = tone === 'cost' ? Landmark : Scale;
  return (
    <section className={`rounded-md border p-3 ${tone === 'cost' ? 'border-cyan-800/70 bg-cyan-950/10' : 'border-violet-800/70 bg-violet-950/10'}`} data-testid={`ref01-aut-${tone}-documentary-file`}>
      <div className="flex items-start gap-2"><Icon className={tone === 'cost' ? 'text-cyan-300' : 'text-violet-300'} size={19} aria-hidden="true" /><div><h6 className="text-sm font-semibold text-slate-100">{title}</h6><p className="mt-1 text-xs leading-5 text-slate-300">{intro}</p></div></div>
      <div className="mt-3 space-y-3">{items.map(([axis, source, result, state]) => <article key={axis} className="m3s-raised p-3" data-testid={`ref01-aut-${tone}-axis`}><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><p className={`text-xs font-semibold ${tone === 'cost' ? 'text-cyan-200' : 'text-violet-200'}`}>{axis}</p><span className={`w-fit rounded-md border px-2 py-1 text-[10px] font-semibold ${STATE_STYLES[state]}`}>{states[state]}</span></div><dl className="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2"><div><dt className="font-semibold text-slate-400">{labels.source}</dt><dd className="mt-1 leading-5 text-slate-300">{source}</dd></div><div><dt className="font-semibold text-slate-400">{labels.result}</dt><dd className="mt-1 leading-5 text-slate-300">{result}</dd></div></dl></article>)}</div>
      <p className={`mt-3 rounded-md border p-3 text-xs font-semibold leading-5 ${tone === 'cost' ? 'border-cyan-800/70 bg-cyan-950/20 text-cyan-100' : 'border-violet-800/70 bg-violet-950/20 text-violet-100'}`}>{finding}</p>
    </section>
  );
};

const InstitutionalPeopleTeamsAutDocumentaryFiles = ({ language = 'FR' }) => {
  const t = COPY[language] || COPY.FR;
  return (
    <section id="institutional-ref01-g1-aut-cd-documentary-files" className="m3s-ref01-g1-aut-cd-documentary-files mt-5 scroll-mt-24 rounded-md border border-sky-800/70 bg-sky-950/10 p-1 sm:p-4" aria-labelledby="institutional-ref01-g1-aut-cd-documentary-files-title">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-5xl"><p className="text-xs font-semibold uppercase text-sky-300">{t.eyebrow}</p><h6 id="institutional-ref01-g1-aut-cd-documentary-files-title" className="mt-1 text-base font-semibold text-slate-100">{t.title}</h6><p className="mt-2 text-sm leading-6 text-slate-300">{t.intro}</p></div><CircleDashed className="shrink-0 text-sky-300" size={24} aria-hidden="true" /></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.counters.map(([label, value, note], index) => <article key={label} className="m3s-raised min-h-28 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-300">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p></div>{index < 2 ? <BadgeCheck className="text-sky-300" size={19} aria-hidden="true" /> : <LockKeyhole className="text-rose-300" size={19} aria-hidden="true" />}</div><p className="mt-2 text-xs leading-5 text-slate-400">{note}</p></article>)}</div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2"><FilePanel title={t.cTitle} intro={t.cIntro} items={t.cItems} finding={t.cFinding} labels={t.labels} states={t.states} tone="cost" /><FilePanel title={t.dTitle} intro={t.dIntro} items={t.dItems} finding={t.dFinding} labels={t.labels} states={t.states} tone="governance" /></div>
      <p className="mt-4 rounded-md border border-sky-800/70 bg-sky-950/15 p-3 text-xs font-semibold leading-5 text-sky-100">{t.status}</p>
      <p className="mt-3 text-xs font-semibold leading-5 text-sky-200">{t.next}</p>
      <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-5 text-rose-200"><AlertTriangle className="mt-0.5 shrink-0" size={16} aria-hidden="true" />{t.boundary}</p>
    </section>
  );
};

export default InstitutionalPeopleTeamsAutDocumentaryFiles;
